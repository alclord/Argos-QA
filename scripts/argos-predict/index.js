const path = require('path');

const { loadConfig, extractEnv, buildRuntimeConfig, validateConfig, displayBanner } = require('./config');
const { todayYYYYMMDD, todayISO, formatDateTimeBR, loadJsonSafe, saveJsonSafe } = require('./utils');
const { CacheManager } = require('./cache');
const { HistoryManager } = require('./history');

const { JiraFetcher } = require('./fetchers/jira');
const { GitHubFetcher } = require('./fetchers/github');
const { SentryFetcher } = require('./fetchers/sentry');

const { ModuleMapper } = require('./scorers/module-mapper');
const { NoiseFilter } = require('./scorers/noise-filter');
const { ScoringEngine } = require('./scorers/scoring');
const { TrendCalculator } = require('./scorers/trends');
const { Clusterer } = require('./scorers/clusterer');

const { exportAllCSVs } = require('./generators/report-csv');
const { generateDashboardData, writeDashboardData } = require('./generators/dashboard-data');
const { generateMarkdownReport, generateNarrative } = require('./generators/report-md');

function parseArgs(args) {
  let days = 14;
  const flags = {
    updateDashboard: false,
    cacheOnly: false,
    forceRefresh: false,
    autoEscalate: false,
  };

  for (const arg of args) {
    if (/^\d+$/.test(arg)) {
      days = parseInt(arg, 10);
    } else if (arg === '--update-dashboard') {
      flags.updateDashboard = true;
    } else if (arg === '--cache-only') {
      flags.cacheOnly = true;
    } else if (arg === '--force-refresh') {
      flags.forceRefresh = true;
    } else if (arg === '--auto-escalate') {
      flags.autoEscalate = true;
    } else if (arg.match(/^--/)) {
      throw new Error(`Argumento invalido: ${arg}. Uso: [DAYS?] [--update-dashboard?] [--cache-only?] [--force-refresh?] [--auto-escalate?]`);
    }
  }

  if (flags.cacheOnly && flags.forceRefresh) {
    throw new Error('--force-refresh e --cache-only sao incompatíveis');
  }

  return { days, flags };
}

async function fetchAllData(config, days, mode) {
  const tokens = config.tokens;
  const jiraConfig = {
    cloudId: config.jira.cloudId,
    baseUrl: config.jira.baseUrl,
    email: tokens.jiraEmail,
    apiToken: tokens.jiraApiToken,
  };

  let jiraAvailable = false;
  let sentryAvailable = false;
  let githubAvailable = false;

  const jira = new JiraFetcher(jiraConfig);

  try {
    jiraAvailable = await jira.healthCheck();
    console.log(`  ✅ Jira: conectado`);
  } catch (e) {
    console.error(`  ❌ Jira: falha na conexao — ${e.message}`);
    throw new Error('Jira indisponivel — obrigatorio para argos-predict.');
  }

  let sentry = null;
  if (tokens.sentryAuthToken) {
    sentry = new SentryFetcher(config.sentry.host, config.sentry.org, tokens.sentryAuthToken);
    try {
      sentryAvailable = await sentry.healthCheck();
      console.log(`  ✅ Sentry: conectado`);
    } catch (e) {
      console.warn(`  ⚠️ Sentry: indisponivel — ${e.message}`);
    }
  } else {
    console.warn(`  ⚠️ Sentry: nao configurado no .env`);
  }

  let github = null;
  if (tokens.ghToken) {
    github = new GitHubFetcher(tokens.ghToken);
    try {
      githubAvailable = await github.healthCheck();
      console.log(`  ✅ GitHub: conectado`);
    } catch (e) {
      console.warn(`  ⚠️ GitHub: indisponivel — ${e.message}`);
    }
  } else {
    console.warn(`  ⚠️ GitHub: nao configurado no .env`);
  }

  console.log('');

  const supportTickets = await jira.fetchSupportTickets(
    config.jira.supportProject, config.jira.supportQueue, days
  );
  console.log(`  🎫 Suporte: ${supportTickets.length} tickets N1 abertos`);

  let devBacklog = [];
  let devActive = [];
  for (const proj of config.jira.devProjects) {
    const bl = await jira.fetchDevBacklog(proj, days);
    const ac = await jira.fetchDevActive(proj);
    devBacklog.push(...bl);
    devActive.push(...ac);
  }
  console.log(`  🛠️ DEV: ${devBacklog.length} em backlog/ready | ${devActive.length} em desenvolvimento`);

  let bugReopen = [];
  let resolvedBugs = [];
  try {
    bugReopen = await jira.fetchBugReopenRate(config.jira.devProjects, days);
    resolvedBugs = await jira.fetchResolvedBugs(config.jira.devProjects, days);
    console.log(`  🔄 Bugs reabertos: ${bugReopen.length} | resolvidos: ${resolvedBugs.length}`);
  } catch (e) {
    console.warn(`  ⚠️ Analise de bugs: indisponivel`);
  }

  let prsData = {};
  let churnByModule = {};
  let riskyPRs = [];
  if (githubAvailable) {
    const primaryRepos = config.github.primaryRepos.length > 0
      ? config.github.primaryRepos
      : config.github.repos.slice(0, 8);

    let totalPRs = 0;
    for (const repo of primaryRepos) {
      try {
        const prs = await github.fetchMergedPRs(config.github.owner, repo, new Date(Date.now() - days * 86400000).toISOString());
        for (const pr of prs.slice(0, 10)) {
          try {
            const files = await github.fetchPRFiles(config.github.owner, repo, pr.number);
            const metrics = github.calculatePRMetrics(pr, files);
            prsData[repo] = prsData[repo] || [];
            prsData[repo].push(metrics);
            totalPRs++;

            if (metrics.entropy > 2.0 || metrics.is_rushed) {
              riskyPRs.push(metrics);
            }
          } catch (e) {
            // skip individual PR file fetch errors
          }
        }
      } catch (e) {
        // skip repo errors
      }
    }
    console.log(`  📊 GitHub: ${totalPRs} PRs analisados em ${primaryRepos.length} repos`);
  }

  let sentrySnapshot = {};
  if (sentryAvailable) {
    try {
      const mapper = new ModuleMapper();
      const projects = await sentry.fetchProjects();
      const mappedSlugs = new Set(
        Object.keys(mapper.getSentryProjectToModuleMap())
      );
      const relevantProjects = projects.filter(p => mappedSlugs.has(p.slug));
      const projectsToFetch = relevantProjects.length > 0
        ? relevantProjects
        : projects.slice(0, 8);

      for (const proj of projectsToFetch) {
        try {
          const issues = await sentry.fetchIssues(proj.slug, 'is:unresolved', '14d', 15);
          if (issues && issues.length > 0) {
            sentrySnapshot[proj.slug] = issues.map(i => ({
              id: i.id,
              title: i.title,
              count: i.count || i.userCount || 0,
              userCount: i.userCount || 0,
              firstSeen: i.firstSeen,
              lastSeen: i.lastSeen,
              status: i.status,
              substatus: i.substatus,
            }));
          }
        } catch (e) {
          // skip project errors
        }
      }
      const totalIssues = Object.values(sentrySnapshot).flat().length;
      console.log(`  🚨 Sentry: ${totalIssues} issues em ${Object.keys(sentrySnapshot).length} projetos`);
    } catch (e) {
      console.warn(`  ⚠️ Sentry: falha ao buscar issues — ${e.message.slice(0, 100)}`);
    }
  }

  return {
    supportTickets, devBacklog, devActive, bugReopen, resolvedBugs,
    prsData, churnByModule, riskyPRs, sentrySnapshot,
    jiraAvailable, sentryAvailable, githubAvailable,
  };
}

function processData(config, rawData, days) {
  const mapper = new ModuleMapper();
  const noiseFilter = new NoiseFilter(config.noiseFilterPath);
  const scorer = new ScoringEngine(config);
  const trendCalc = new TrendCalculator();
  const clusterer = new Clusterer();

  const sentryModMap = mapper.getSentryProjectToModuleMap();

  const allTickets = rawData.supportTickets.map(t => {
    const summary = t.fields?.summary || '';
    const labels = t.fields?.labels || [];
    const type = t.fields?.issuetype?.name || '';
    const priority = t.fields?.priority?.name || '';
    const modules = mapper.mapTicketToModules(summary, labels);
    const classification = noiseFilter.classifyTicket(summary, type);

    const issuelinks = t.fields?.issuelinks || [];
    let linkedDevCard = null;
    for (const link of issuelinks) {
      if (link.outwardIssue) {
        const key = link.outwardIssue.key || '';
        if (key.match(/^(DEV4|GPD)-\d+/)) { linkedDevCard = key; break; }
      }
      if (link.inwardIssue) {
        const key = link.inwardIssue.key || '';
        if (key.match(/^(DEV4|GPD)-\d+/)) { linkedDevCard = key; break; }
      }
    }

    return {
      key: t.key,
      summary,
      type,
      priority,
      status: t.fields?.status?.name || '',
      created: t.fields?.created,
      updated: t.fields?.updated,
      labels,
      linkedDevCard,
      _module: modules[0],
      _modules: modules,
      _class: classification.rootCause,
      _weight: classification.weight,
    };
  });

  const { tickets: classifiedTickets, incidents } = noiseFilter.classifyTicketsBatch(allTickets);

  const allDevCards = [...rawData.devBacklog, ...rawData.devActive].map(c => {
    const summary = c.fields?.summary || '';
    const labels = c.fields?.labels || [];
    const modules = mapper.mapTicketToModules(summary, labels);
    return {
      key: c.key,
      summary,
      type: c.fields?.issuetype?.name || '',
      status: c.fields?.status?.name || '',
      labels,
      assignee: c.fields?.assignee?.displayName || '',
      updated: c.fields?.updated,
      isActive: rawData.devActive.some(a => a.key === c.key),
      _module: modules[0],
      _modules: modules,
    };
  });

  const sentryByModule = {};
  const sentryIssuesFlat = [];
  for (const [project, issues] of Object.entries(rawData.sentrySnapshot)) {
    const mod = mapper.getModuleBySentryProject(project);
    if (mod) {
      if (!sentryByModule[mod]) sentryByModule[mod] = [];
      sentryByModule[mod].push(...issues.map(i => ({ ...i, project })));
    }
    sentryIssuesFlat.push(...issues.map(i => ({ ...i, project })));
  }

  const moduleData = {};
  const allModules = mapper.getAllModules();

  for (const mod of allModules) {
    const modTickets = classifiedTickets.filter(t =>
      t._modules?.includes(mod.name) || t._module === mod.name
    );
    const modDevCards = allDevCards.filter(c =>
      c._modules?.includes(mod.name) || c._module === mod.name
    );
    const modDevActive = modDevCards.filter(c => c.isActive);
    const modSentry = sentryByModule[mod.name] || [];

    const signals = {
      sentryIssues: modSentry,
      sentryDelta: modSentry.length > 0 ? 35 : 0,
      churn: { churn_lines: 0, unique_authors: 0, deploy_freq: 0 },
      crossServiceWeight: mapper.mapRepoToService(mod.primaryRepo || ''),
      rushedPRs: 0,
      bugReopenCount: 0,
      avgResolutionDays: 0,
      envFailure: false,
      qaFlakiness: 0,
      entropy: 0,
      newcomerFactor: 0,
      cfr: null,
      crashFreeDelta: null,
      suspectCommit: false,
      mutationScore: null,
      stalenessCount: 0,
      smTickets: modTickets.map(t => ({
        type: t.type,
        created: t.created,
        updated: t.updated,
        priority: t.priority,
        linkedDevCard: t.linkedDevCard,
      })),
      devBacklogCount: modDevCards.filter(c => !c.isActive).length,
      devActiveCount: modDevActive.length,
    };

    const tecResult = scorer.calculateSCORE_TEC(mod.name, signals);
    const usrResult = scorer.calculateSCORE_USR(mod.name, signals);
    const scoreTotal = tecResult.score + usrResult.score;
    const classification = scorer.classifyLevel(scoreTotal);

    const trend = trendCalc.calculateTrend(mod.name, modTickets, modTickets, days);

    moduleData[mod.name] = {
      name: mod.name,
      apelido: mod.apelido,
      score_total: Math.round(scoreTotal * 10) / 10,
      score_tec: tecResult.score,
      score_usr: usrResult.score,
      nivel: classification.level,
      color: classification.color,
      emoji: classification.emoji,
      trendDirection: trend.direction,
      sentryDelta: signals.sentryDelta,
      tickets: modTickets,
      devCards: modDevCards,
      devActive: modDevActive,
      sentryIssues: modSentry,
      breakdown: { tec: tecResult.breakdown, usr: usrResult.breakdown },
      ticketCount: usrResult.ticketCount,
    };
  }

  const rankedModules = Object.values(moduleData)
    .filter(m => m.score_total >= 3)
    .sort((a, b) => b.score_total - a.score_total);

  const heatmap = trendCalc.calculateHeatmap(moduleData);

  const allClusters = clusterer.clusterSentryIssues(sentryByModule);

  const bombas = rankedModules.slice(0, 3).map(m => {
    const signals = {
      corretivoEmDev: m.devActive.some(c => c.type === 'Bug' || c.type === 'Corretivo'),
      featureInstavel: false,
      trendUp: m.trendDirection === '↗️',
      userCount: m.sentryIssues.reduce((s, i) => s + (i.userCount || 0), 0),
      issueAge: 0,
      noCorretivo: !m.devActive.some(c => c.type === 'Bug'),
      bugReopen: rawData.bugReopen.length,
      sentryDelta: m.sentryDelta || 0,
      envSpecific: false,
      crossService: false,
    };
    const bombResult = scorer.calculateBOMBA_SCORE(m.name, m.score_total, signals);
    return {
      modulo: m.name,
      score: bombResult.score,
      problema: `Score ${m.score_total} (${m.score_tec} tecnico + ${m.score_usr} usuarios). ${m.ticketCount} tickets SM ativos.`,
      gatilho: m.trendDirection === '↗️' ? 'Tendencia de alta detectada' : 'Proximo deploy pode gerar regressao',
      acao: 'Investigar sinais e priorizar correcoes.',
      reasons: bombResult.reasons,
    };
  });

  const kpis = [
    { label: 'SM Aberto (N1)', valor: classifiedTickets.length, cor: 'amber', icone: '🟡', detalhe: '' },
    { label: 'Modulos Criticos', valor: rankedModules.filter(m => m.nivel === 'ALTO').length, cor: 'red', icone: '🔴', detalhe: '' },
    { label: 'Sentry Issues', valor: sentryIssuesFlat.length, cor: 'red', icone: '🚨', detalhe: '' },
    { label: 'PRs no periodo', valor: Object.values(rawData.prsData).flat().length, cor: 'green', icone: '📊', detalhe: '' },
    { label: 'Bugs reabertos', valor: rawData.bugReopen.length, cor: 'orange', icone: '🔄', detalhe: '' },
    { label: 'Incidentes externos', valor: incidents.length, cor: 'amber', icone: '🌐', detalhe: '' },
  ];

  const radarServices = rankedModules.slice(0, 8).map(m => ({
    nome: m.name,
    apelido: m.apelido,
    alias: '',
    bugs: Math.round((m.sentryIssues.length + m.ticketCount) * 10) / 10,
    bugs_n1: m.ticketCount,
    bugs_sentry: m.sentryIssues.length,
    dev_ativo: m.devActive.length,
    dev_planejado: m.devCards.filter(c => !c.isActive).length,
    score_tec: m.score_tec,
    notas: { bugs: '', ativo: '', planejado: '' },
    bugs_cards: [],
    dev_ativo_items: [],
    dev_planejado_items: [],
    score_tec_itens: [],
  }));

  const devAtivos = rawData.devActive.map(c => ({
    id: c.key,
    key: c.key,
    title: c.fields?.summary || '',
    assignee: c.fields?.assignee?.displayName || '',
    modulo: mapper.mapTicketToModule(c.fields?.summary || '', c.fields?.labels || []),
    servico_radar: null,
    dias_em_andamento: 0,
  }));

  const trends = rankedModules.map(m => ({
    modulo: m.name,
    delta: 0,
    ontem: 0,
    hoje: m.score_total,
  }));

  const dashboardData = {
    summary: { date: formatDateTimeBR(todayISO()), days, sources: '' },
    kpis,
    modules: rankedModules,
    heatmap,
    trends,
    bombas,
    sentry: sentryIssuesFlat.slice(0, 8).map(i => ({
      title: i.title,
      project: i.project,
      userCount: i.userCount,
      delta: '+0%',
      status: i.substatus === 'escalating' ? 'ESCALANDO' : 'Crônico',
      oculto: true,
    })),
    devAtivos,
    radarServices,
    clusters: allClusters,
    bugDistribuicao: [
      { label: 'Sem corretivo planejado', valor: rankedModules.filter(m => m.devActive.length === 0).length, cor: '#EF4444' },
      { label: 'Com corretivo ativo', valor: rankedModules.filter(m => m.devActive.length > 0).length, cor: '#F59E0B' },
      { label: 'Crônicos / não-técnicos', valor: 0, cor: '#475569' },
    ],
    qualidadeProcesso: {
      bugsReabertos: { total: rawData.bugReopen.length, modulos: [] },
      prsPrecipitados: { total: 0, modulos: [] },
      stalenessQA: { total: 0, modulos: [] },
      envFailures: { total: 0, modulos: [] },
    },
    prsPerigosos: rawData.riskyPRs.map(p => ({
      repo: p.repo,
      pr_number: p.pr_number,
      titulo: p.title,
      merged_at: p.merged_at,
      author: p.author,
      entropy: p.entropy,
      churn_lines: p.churn_lines,
      arquivos: p.files_changed,
      modulos: [],
      risco_cfr: false,
      bugs_pos_merge: [],
      sentry_correlacao: [],
    })),
    cardsResolvidos: rawData.resolvedBugs.slice(0, 10).map(b => ({
      id: b.key,
      titulo: b.fields?.summary || '',
      resolvido_em: b.fields?.resolutiondate || b.fields?.updated,
      modulo: mapper.mapTicketToModule(b.fields?.summary || '', b.fields?.labels || []),
    })),
  };

  return {
    scoredModules: moduleData,
    rankedModules,
    classifiedTickets,
    allDevCards,
    sentryByModule,
    allClusters,
    dashboardData,
    rawData,
    incidents,
  };
}

async function main() {
  const args = process.argv.slice(2);
  let days, flags;

  try {
    ({ days, flags } = parseArgs(args));
  } catch (e) {
    console.error(`\n❌ ${e.message}\n`);
    process.exit(1);
  }

  console.log('\n🔮 Argos Predict v4.0 — inicializando...\n');

  const rawConfig = loadConfig();
  const env = extractEnv();
  const config = buildRuntimeConfig(rawConfig, env);

  const errors = validateConfig(config);
  if (errors.length > 0) {
    console.error('\n❌ Erros de configuracao:');
    errors.forEach(e => console.error(`   - ${e}`));
    console.error('');
    process.exit(1);
  }

  displayBanner(config, days, flags);

  const cache = new CacheManager(config.cachePath);
  const modeResult = cache.determineMode(days, flags);

  if (modeResult.mode === 'ERROR') {
    console.error(`\n❌ ${modeResult.reason}\n`);
    process.exit(1);
  }

  let rawData;

  if (modeResult.mode === 'CACHE_ONLY') {
    cache.load();
    console.log('  🚀 Modo Cache-Only — usando dados locais...\n');
    rawData = {
      supportTickets: cache.getSupportCards().map(c => ({ key: c.key, fields: c })),
      devBacklog: cache.getDevBacklog().map(c => ({ key: c.key, fields: c })),
      devActive: cache.getDevActive().map(c => ({ key: c.key, fields: c })),
      bugReopen: cache.cache?.bug_reopen_raw || [],
      resolvedBugs: cache.cache?.bugs_resolved_raw || [],
      prsData: cache.getPRs(),
      churnByModule: {},
      riskyPRs: [],
      sentrySnapshot: cache.getSentrySnapshot(),
      jiraAvailable: true,
      sentryAvailable: Object.keys(cache.getSentrySnapshot()).length > 0,
      githubAvailable: Object.keys(cache.getPRs()).length > 0,
    };
  } else {
    console.log(`  [Modo ${modeResult.mode}] Buscando dados...\n`);
    rawData = await fetchAllData(config, days, modeResult.mode);
  }

  console.log('\n  📐 Processando dados...\n');
  const processed = processData(config, rawData, days);

  const dateStr = todayYYYYMMDD();
  console.log('\n  📄 Gerando relatorios...\n');

  const csvResults = exportAllCSVs(config.reportsDir, dateStr, {
    modules: processed.rankedModules,
    tickets: processed.classifiedTickets,
    cards: processed.allDevCards,
    clusters: processed.allClusters,
    sentryIssues: processed.sentryByModule,
  });

  console.log('  🤖 Gerando narrativa gerencial (IA)...\n');
  const narrative = await generateNarrative(processed.dashboardData);
  if (narrative) {
    console.log('  ✅ Narrativa IA gerada');
    processed.dashboardData.bombas_narrative = narrative;
  } else {
    console.log('  ⚠️ Narrativa IA indisponivel — usando template padrao');
  }

  const report = generateMarkdownReport(processed.dashboardData, processed.rankedModules, days, config, narrative);
  const reportPath = path.join(config.reportsDir, `argos-predict-${dateStr}.md`);
  const latestPath = path.join(config.reportsDir, 'argos-predict-latest.md');
  require('fs').writeFileSync(reportPath, report, 'utf-8');
  require('fs').writeFileSync(latestPath, report, 'utf-8');

  if (flags.updateDashboard) {
    console.log('  🌐 Atualizando dashboard...\n');
    const dashboardJS = generateDashboardData(processed.dashboardData, dateStr);
    writeDashboardData(config.docsDir, dashboardJS, dateStr);
  }

  cache.save({
    sm_ultima: todayISO(),
    janela_dias: days,
    modo: modeResult.mode,
    supportCards: processed.classifiedTickets,
    devBacklog: rawData.devBacklog.map(c => ({ key: c.key, ...c.fields })),
    devActive: rawData.devActive.map(c => ({ key: c.key, ...c.fields })),
    githubPRs: rawData.prsData,
    sentrySnapshot: rawData.sentrySnapshot,
    bugReopenRaw: rawData.bugReopen,
    bugsResolvedRaw: rawData.resolvedBugs,
    scoresResumo: Object.fromEntries(
      Object.entries(processed.scoredModules).map(([k, v]) => [
        k, { total: v.score_total, tec: v.score_tec, usr: v.score_usr, nivel: v.nivel }
      ])
    ),
    stats: {
      sm_tickets: processed.classifiedTickets.length,
      dev_backlog: rawData.devBacklog.length,
      dev_active: rawData.devActive.length,
      github_prs: Object.values(rawData.prsData).flat().length,
      sentry_issues: Object.values(rawData.sentrySnapshot).flat().length,
      modulos_alto: processed.rankedModules.filter(m => m.nivel === 'ALTO').length,
    },
  });

  const history = new HistoryManager(config.historyDir, config.argos.history.retentionDays);
  history.saveScores(
    Object.fromEntries(
      Object.entries(processed.scoredModules).map(([k, v]) => [
        k, { total: v.score_total, tec: v.score_tec, usr: v.score_usr, bugs_n1: v.ticketCount, nivel: v.nivel }
      ])
    ),
    { date: dateStr, days, mode: modeResult.mode }
  );

  console.log('═'.repeat(50));
  console.log('  ✅ ARGOS PREDICT v4.0 — Concluido!');
  console.log('═'.repeat(50));
  console.log(`  📄 Relatorio: tests/reports/argos-predict-${dateStr}.md`);
  console.log(`  📊 CSVs: ${Object.values(csvResults).filter(Boolean).length} arquivos exportados`);
  console.log(`  📈 Modulos: ${Object.keys(processed.scoredModules).length} analisados`);
  console.log(`  🔴 ALTO: ${processed.rankedModules.filter(m => m.nivel === 'ALTO').length}`);
  console.log(`  🟡 MEDIO: ${processed.rankedModules.filter(m => m.nivel === 'MÉDIO').length}`);
  console.log(`  🟠 ATENCAO: ${processed.rankedModules.filter(m => m.nivel === 'ATENÇÃO').length}`);

  if (flags.updateDashboard) {
    console.log(`  🌐 Dashboard: docs/data.js atualizado`);
  }
  console.log('═'.repeat(50));
  console.log('');
}

main().catch(err => {
  console.error('\n❌ Erro fatal:', err.message);
  console.error(err.stack);
  process.exit(1);
});
