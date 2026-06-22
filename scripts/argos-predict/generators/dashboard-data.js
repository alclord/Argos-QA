const path = require('path');
const fs = require('fs');
const { todayISO, formatDateTimeBR } = require('../utils');

function buildServicos(radarServices, modules, tickets) {
  return (radarServices || []).map(s => {
    const mod = modules.find(m => m.name === s.nome || m.apelido === s.apelido);
    const modTickets = (tickets || []).filter(t =>
      t._modules?.includes(s.nome) || t._module === s.nome
    );
    const icones = {
      'Chat / Mensagens': '💬', 'Canais': '📡', 'Jarvis / IA': '🤖',
      'Contatos': '👤', 'Distribuição / Filas': '⚖️', 'Autenticação': '🔐',
      'Upload / Mídia': '📎', 'WebSocket / Presença': '🔌',
      'Permissões / Roles': '🛡️', 'Configurações': '⚙️',
      'Relatórios / SLA': '📊', 'Integrações Externas': '🔗',
      'Disparos / Campanhas': '📢',
    };

    const sinais = [];
    if (s.bugs_n1 > 0) sinais.push(`→ SM · ${s.bugs_n1} bugs N1 abertos`);
    if (s.bugs_sentry > 0) sinais.push(`→ Sentry · ${s.bugs_sentry} erros ativos`);
    if (s.score_tec > 0) sinais.push(`→ Risco técnico · +${s.score_tec}pts`);
    if (s.dev_ativo > 0) sinais.push(`→ Dev · ${s.dev_ativo} cards em andamento`);
    if (sinais.length === 0) sinais.push('→ Sem sinais detectados no período');

    return {
      icone: icones[s.nome] || '🔧',
      nome: s.nome,
      apelido: s.apelido,
      alias: s.alias || '',
      risco: s.score_tec >= 10 ? 'CRÍTICO' : s.score_tec >= 5 ? 'ALTO' : 'MÉDIO',
      confianca: modTickets.length > 5 ? 'Alta' : modTickets.length > 2 ? 'Média' : 'Baixa',
      bugs_atribuidos: s.bugs || 0,
      descricao: `Serviço com ${s.bugs || 0} sinais de problemas (${s.bugs_n1} N1 + ${s.bugs_sentry} Sentry). ${s.dev_ativo} cards em desenvolvimento.`,
      modulos: [s.apelido || s.nome],
      sinais,
    };
  });
}

function buildDrilldown(mod, sentryIssues, clusters) {
  const modClusters = (clusters || []).filter(c => c.module === mod.name);
  const modSentry = (sentryIssues || []).filter(i => i.module === mod.name);
  const sentryDays = modSentry.length > 0
    ? Math.round((Date.now() - new Date(modSentry[0].firstSeen || Date.now()).getTime()) / 86400000)
    : 0;

  // Build service attribution
  const primaryRepo = mod.apelido || mod.name;
  const primaryBugs = mod.ticketCount || 0;
  const secondaryBugs = Math.round(primaryBugs * 0.3);

  return {
    nivel: mod.nivel || 'MÉDIO',
    cor: mod.color || '#F59E0B',
    total_reclamacoes: mod.ticketCount || 0,
    bugs_confirmados: mod.ticketCount || 0,
    dias_sentry: sentryDays,
    resumo_gerencial: `Módulo ${mod.name} com score ${mod.score_total} (${mod.score_tec} técnico + ${mod.score_usr} usuários). ${mod.ticketCount || 0} tickets SM ativos, ${modSentry.length} erros Sentry, ${mod.devActive?.length || 0} cards em desenvolvimento.`,
    servico_principal: {
      nome: primaryRepo,
      bugs: primaryBugs,
      cor: mod.color || '#EF4444',
    },
    servico_secundario: secondaryBugs > 0 ? {
      nome: 'Serviços relacionados',
      bugs: secondaryBugs,
      cor: '#F59E0B',
    } : null,
    clusters: modClusters.map(c => ({
      urgencia: c.urgencia || '🟡',
      sintoma: c.sintoma || '',
      servico: c.servico || primaryRepo,
      qtd: c.qtd || 0,
    })),
    em_desenvolvimento: mod.devActive?.length > 0
      ? `${mod.devActive?.length} cards em desenvolvimento ativo.`
      : '⚠️ Nenhum card em desenvolvimento — módulo negligenciado.',
    acao_imediata: 'Investigar sinais ativos e priorizar correções nos serviços afetados.',
  };
}

function buildHelp() {
  return [
    'Indicadores de risco em tempo real baseados em dados do Jira, Sentry e GitHub.',
    'Quanto mais alto o score, maior a urgência de ação no módulo.',
    'O radar mostra a cobertura de desenvolvimento vs. a pressão dos bugs.',
    'Cada serviço é atribuído aos módulos com base em evidências (Sentry + KB + churn).',
    'O radar de serviços cruza bugs, dev ativo, planejado e risco técnico.',
    'Bombas são cenários de alto risco que podem escalar em produção.',
    'Sinais de qualidade medem bugs reabertos, PRs precipitados e cobertura QA.',
    'PRs com alta entropia (>3.5) ou que geraram bugs pós-merge.',
    'Timeline mostra a evolução do score dos módulos nas últimas semanas.',
    'Ações priorizadas por urgência: P0 (hoje), P1 (esta semana), P2 (próximo sprint).',
    'Tabela de chamados SM com filtros por tipo e módulo.',
    'Dicas de leitura do slide atual — o que cada gráfico e métrica significa.',
  ];
}

function buildHelpGlobal() {
  return [
    {
      title: 'Como os scores são calculados',
      body: '<p>O <strong>Score Total</strong> é a soma de dois eixos independentes:</p><ul><li><strong>Score Técnico:</strong> KB (áreas frágeis), Sentry (erros em produção), churn de código, entropia, DORA CFR, PRs precipitados, bugs reabertos e padrões de falha por ambiente.</li><li><strong>Score de Usuários:</strong> Tickets SM abertos (Bug=3pts, Solicitação=2pts, Dúvida=1pt), com decay por idade (×1.0 até 7d, ×0.8 até 30d, ×0.6 até 90d).</li></ul>',
    },
    {
      title: 'Fontes de dados',
      body: '<p>Os dados são coletados automaticamente das seguintes fontes:</p><ul><li><strong>Jira SM:</strong> tickets de suporte N1 abertos nos últimos 14 dias.</li><li><strong>Jira DEV4:</strong> cards de desenvolvimento em backlog e em andamento.</li><li><strong>Sentry:</strong> erros de produção (7d e 14d) com delta semana a semana.</li><li><strong>GitHub:</strong> PRs mesclados, churn de código e entropia de mudanças.</li></ul>',
    },
    {
      title: 'Níveis de classificação',
      body: '<ul><li>🔴 <strong>ALTO (≥10):</strong> risco crítico — ação imediata recomendada.</li><li>🟡 <strong>MÉDIO (6-9):</strong> risco relevante — monitorar de perto.</li><li>🟠 <strong>ATENÇÃO (3-5):</strong> sinal fraco — observar evolução.</li><li>🟢 <strong>ESTÁVEL (0-2):</strong> sem sinais de risco.</li></ul>',
    },
    {
      title: 'BOMBA_SCORE',
      body: '<p>Além do score base, bônus são aplicados para gerar o <strong>BOMBA_SCORE</strong>: corretivo em dev (+5), feature em área instável (+4), tendência de alta (+3), alto impacto de usuários (+2), bug crônico (+2), sem corretivo (+3), regressão (+2), Sentry escalando (+2), impacto cross-serviço (+2).</p>',
    },
  ];
}

function generateDashboardData(data, dateStr) {
  const now = new Date();
  const modules = data.modules || [];
  const tickets = data.tickets || [];
  const radarServices = data.radarServices || [];
  const sentryByModule = data.sentryByModule || {};
  const allSentryIssues = Object.values(sentryByModule).flat();
  const clusters = data.clusters || [];

  const servicos = buildServicos(radarServices, modules, tickets);

  const drilldown = {};
  for (const mod of modules.slice(0, 5)) {
    const modSentry = allSentryIssues.filter(i => i.module === mod.name);
    drilldown[mod.name] = buildDrilldown(mod, modSentry, clusters);
  }

  const REPORT = {
    meta: {
      geradoEm: data.summary?.date || dateStr,
      geradoEmISO: todayISO(),
      janela: `${data.summary?.days || 14} dias`,
      fontes: data.summary?.sources || `Jira Suporte (${tickets.length} N1 Aberto) · DEV4 · Sentry · GitHub`,
      fontes_disponiveis: {
        sm: true,
        dev4: true,
        sentry: true,
        github: true,
      },
    },

    resumoExecutivo: data.resumoExecutivo || '',

    kpis: (data.kpis || []).map(k => ({
      label: k.label,
      valor: k.valor,
      cor: k.cor || 'amber',
      icone: k.icone || '',
      detalhe: k.detalhe || '',
      unidade: k.unidade || '',
    })),

    ranking: modules.map(m => ({
      modulo: m.name,
      total: m.score_total,
      tec: m.score_tec,
      usr: m.score_usr,
      bugs_n1: m.ticketCount || 0,
      nivel: m.nivel || 'ESTÁVEL',
      cor: m.color || '#22C55E',
      sentryDelta: m.sentryDelta || 0,
      delta: 0,
    })),

    cobertura: (data.heatmap || []).map(h => ({
      modulo: h.modulo,
      pressao: h.pressao,
      atencao: h.atencao,
      gap: h.gap,
      zona: h.zona,
    })),

    tendencia: (data.trends || []).map(t => ({
      modulo: t.modulo,
      delta: t.delta || 0,
      ontem: t.ontem || 0,
      hoje: t.hoje || 0,
    })),

    bugDistribuicao: data.bugDistribuicao || [
      { label: 'Sem corretivo planejado', valor: 0, cor: '#EF4444' },
      { label: 'Com corretivo ativo', valor: 0, cor: '#F59E0B' },
      { label: 'Crônicos / não-técnicos', valor: 0, cor: '#475569' },
    ],

    servicos,
    servicos_radar: radarServices.map(s => ({
      nome: s.nome,
      apelido: s.apelido,
      alias: s.alias || '',
      bugs: s.bugs || 0,
      bugs_n1: s.bugs_n1 || 0,
      bugs_sentry: s.bugs_sentry || 0,
      dev_ativo: s.dev_ativo || 0,
      dev_planejado: s.dev_planejado || 0,
      score_tec: s.score_tec || 0,
      notas: s.notas || { bugs: '', ativo: '', planejado: '' },
      bugs_cards: s.bugs_cards || [],
      dev_ativo_items: s.dev_ativo_items || [],
      dev_planejado_items: s.dev_planejado_items || [],
      score_tec_itens: s.score_tec_itens || [],
    })),

    bombas: (data.bombas || []).map((b, i) => ({
      pos: i + 1,
      modulo: b.modulo,
      score: b.score,
      problema: b.problema || '',
      gatilho: b.gatilho || '',
      acao: b.acao || '',
    })),

    sentry: allSentryIssues.slice(0, 8).map(s => ({
      erro: s.title || s.erro || '',
      projeto: s.project || s.projeto || '',
      usuarios: s.userCount || s.usuarios || 0,
      delta: s.delta || '+0%',
      status: s.status || 'Crônico',
      oculto: s.oculto !== undefined ? s.oculto : true,
    })),

    todos_dev_ativos: (data.devAtivos || []).map(d => ({
      id: d.id || d.key,
      titulo: d.title || d.titulo,
      assignee: d.assignee || '',
      modulo: d.modulo || null,
      servico_radar: d.servico_radar || null,
      dias_em_andamento: d.dias_em_andamento || 0,
    })),

    qualidadeProcesso: {
      bugsReabertos: {
        total: (data.qualidadeProcesso?.bugsReabertos?.total || 0),
        modulos: (data.qualidadeProcesso?.bugsReabertos?.modulos || []),
      },
      prsPrecipitados: {
        total: (data.qualidadeProcesso?.prsPrecipitados?.total || 0),
        modulos: (data.qualidadeProcesso?.prsPrecipitados?.modulos || []),
      },
      stalenessQA: {
        total: (data.qualidadeProcesso?.stalenessQA?.total || 0),
        modulos: (data.qualidadeProcesso?.stalenessQA?.modulos || []),
      },
      envFailures: {
        total: (data.qualidadeProcesso?.envFailures?.total || 0),
        modulos: (data.qualidadeProcesso?.envFailures?.modulos || []),
      },
    },

    prs_perigosos: (data.prsPerigosos || []).map(p => ({
      repo: p.repo || '',
      pr_number: p.pr_number || 0,
      titulo: p.titulo || '',
      merged_at: p.merged_at || '',
      author: p.author || '',
      entropy: p.entropy || 0,
      churn_lines: p.churn_lines || 0,
      arquivos: p.arquivos || 0,
      modulos: p.modulos || [],
      risco_cfr: p.risco_cfr || false,
      bugs_pos_merge: p.bugs_pos_merge || [],
      sentry_correlacao: p.sentry_correlacao || [],
    })),

    cards_resolvidos: (data.cardsResolvidos || []).map(c => ({
      id: c.id || c.key,
      titulo: c.titulo || c.title,
      resolvido_em: c.resolvido_em || c.resolved,
      modulo: c.modulo || 'Outros',
    })),

    acoes: (data.acoes || []).map(a => ({
      prioridade: a.prioridade || '',
      modulo: a.modulo || '',
      acao: a.acao || '',
      prazo: a.prazo || '',
    })),

    drilldown,

    sm_tickets_raw: (data.ticketsRaw || tickets).map(t => ({
      key: t.key || '',
      summary: t.summary || '',
      type: t.type || '',
      priority: t.priority || '',
      status: t.status || '',
      created: t.created || '',
      updated: t.updated || '',
      module: t._module || 'Outros',
      classification: t._class || '',
    })),

    sm_tickets_n2: data.ticketsN2 || [],

    timeline: data.timeline || [],

    help: buildHelp(),
    helpGlobal: buildHelpGlobal(),
  };

  return REPORT;
}

function writeDashboardData(docsDir, reportData, dateStr) {
  if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true });

  const filePath = path.join(docsDir, 'data.js');
  const content = [
    '// ============================================================',
    '//  ARGOS PREDICT — DATA FILE (v4.0)',
    `//  Atualizado: ${dateStr}`,
    `//  Gerado automaticamente por scripts/argos-predict/`,
    '// ============================================================',
    'const REPORT = ' + JSON.stringify(reportData, null, 2) + ';',
    '',
  ].join('\n');

  fs.writeFileSync(filePath, content, 'utf-8');
  return filePath;
}

module.exports = { generateDashboardData, writeDashboardData };
