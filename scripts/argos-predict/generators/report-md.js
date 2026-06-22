const { todayYYYYMMDD, formatDateTimeBR } = require('../utils');

function generateSection(modName, data, ranking) {
  const className = modName.replace(/[^a-zA-Z0-9]/g, '');
  const total = data.total_reclamacoes || data.tickets || 0;
  const clusters = (data.clusters || []);
  const acao = data.acao_imediata || 'Investigar sinais e priorizar correcoes.';

  const clusterList = clusters.map(c =>
    `   | ${c.urgencia || '🟡'} | ${c.sintoma || c.descricao || ''} | ${c.servico || ''} | ${c.qtd || 0} |`
  ).join('\n');

  return `### ${modName}

| Atributo | Valor |
|---|---|
| Tickets SM ativos | ${total} |
| Sentry issues | ${data.sentry_issues || 0} |
| Desenvolvedores ativos | ${data.dev_count || 0} |
| Repo principal | ${data.primary_repo || '—'} |

${clusterList ? `**Clusters de problema:**\n\n| Urgencia | Sintoma | Servico | Qtd |\n|---|---|---|---|\n${clusterList}\n` : ''}

**Acao recomendada:** ${acao}
`;
}

function generateMarkdownReport(dashboardData, rankedModules, days, config, narrative = null) {
  const dateStr = formatDateTimeBR(new Date().toISOString());
  const totalSMTickets = dashboardData.kpis.find(k => k.label.includes('SM'))?.valor || 0;
  const totalDevBacklog = config?.devBacklogCount || 0;
  const totalDevActive = dashboardData.devAtivos?.length || 0;
  const totalPRs = dashboardData.kpis.find(k => k.label.includes('PR'))?.valor || 0;
  const totalSentry = dashboardData.kpis.find(k => k.label.includes('Sentry'))?.valor || 0;

  const sections = [];

  sections.push(`# Argos Predict — Mapa de Risco Preditivo`);
  sections.push(`> Gerado em: ${dateStr} | Projetos: ${config?.jira?.supportProject || 'SM'}, ${(config?.jira?.devProjects || []).join(', ')} | Janela: ${days} dias`);
  sections.push(`> Fontes: Jira Suporte (${totalSMTickets} N1 Aberto) · DEV4 (${totalDevBacklog} backlog + ${totalDevActive} em dev) · Sentry (${totalSentry} issues) · GitHub (${totalPRs} PRs merged)`);
  sections.push('');

  sections.push('## 📊 Sumário Executivo\n');
  sections.push('| Indicador | Valor |');
  sections.push('|---|---|');
  for (const kpi of dashboardData.kpis) {
    sections.push(`| ${kpi.icone || ''} ${kpi.label} | ${kpi.valor} ${kpi.detalhe || ''} |`);
  }

  if (dashboardData.bugDistribuicao && dashboardData.bugDistribuicao.length > 0) {
    sections.push(`| 🐛 Bugs sem corretivo | ${dashboardData.bugDistribuicao[0]?.valor || 0} modulos |`);
  }
  sections.push('');

  sections.push('## 🗺️ Ranking de Risco\n');
  sections.push('| # | Módulo | Score | Técnico | Usuários | Tendência | Zona | Δ Sentry |');
  sections.push('|---|---|---|---|---|---|---|---|');
  rankedModules.forEach((m, i) => {
    const zone = dashboardData.mapaCalor?.find(h => h.modulo === m.name)?.zona || '—';
    const sentryDelta = m.sentryDelta || 0;
    const deltaStr = sentryDelta > 0 ? `+${sentryDelta}%` : '—';
    sections.push(`| ${i + 1} | ${m.name} | ${m.score_total} | ${m.score_tec} | ${m.score_usr} | ${m.trendDirection || '→'} | ${m.emoji || '🔴'} | ${deltaStr} |`);
  });
  sections.push('');

  sections.push('## 💣 Top 3 Bombas\n');
  if (narrative) {
    sections.push(narrative);
    sections.push('');
  } else if (dashboardData.bombas && dashboardData.bombas.length > 0) {
    dashboardData.bombas.forEach((b, i) => {
      sections.push(`### ${i + 1}. ${b.modulo} (BOMBA_SCORE: ${b.score})`);
      sections.push(`**Por que é bomba:** ${b.problema}`);
      sections.push(`**Gatilho:** ${b.gatilho}`);
      sections.push(`**Ação:** ${b.acao}`);
      if (b.reasons && b.reasons.length > 0) {
        sections.push(`**Sinais:** ${b.reasons.join(' · ')}`);
      }
      sections.push('');
    });
  } else {
    sections.push('Nenhum módulo atinge critério de bomba nesta execução.\n');
  }

  if (!narrative) {
    sections.push('## ✅ Ações Prioritárias\n');
    const topModules = rankedModules.slice(0, 3);
    topModules.forEach((m, i) => {
      const priority = i === 0 ? 'P0 — HOJE' : i === 1 ? 'P1 — ESTA SEMANA' : 'P2 — PRÓX. SPRINT';
      const zone = dashboardData.mapaCalor?.find(h => h.modulo === m.name);
      const neglected = zone?.zona === 'Negligenciada' ? ' (NEGLIGENCIADO)' : '';
      sections.push(`${i + 1}. **${priority}** — ${m.emoji} **${m.name}**${neglected} — Investigar ${m.ticketCount || 0} tickets SM ativos e corrigir bugs pendentes. Consequência: degradação da experiência do usuário.`);
    });
    sections.push('');
  }

  sections.push('## 📋 Detalhamento por Módulo\n');
  for (const mod of rankedModules.slice(0, 5)) {
    const detail = dashboardData.drilldown?.[mod.name] || {};
    sections.push(generateSection(mod.name, {
      total_reclamacoes: mod.ticketCount,
      sentry_issues: mod.sentryIssues?.length || 0,
      dev_count: mod.devActive?.length || 0,
      primary_repo: mod.apelido || '',
      clusters: dashboardData.clusters?.filter(c => c.module === mod.name) || [],
      acao_imediata: 'Investigar sinais e priorizar correcoes.',
    }, rankedModules));
  }

  if (dashboardData.prsPerigosos && dashboardData.prsPerigosos.length > 0) {
    sections.push('## ⚡ PRs com Maior Risco de Regressão\n');
    sections.push('| Repo | PR | Entropia | Churn | Arquivos |');
    sections.push('|---|---|---|---|---|');
    for (const pr of dashboardData.prsPerigosos.slice(0, 5)) {
      sections.push(`| ${pr.repo} | #${pr.pr_number} | ${pr.entropy} | ${pr.churn_lines} | ${pr.arquivos} |`);
    }
    sections.push('');
  }

  sections.push('---');
  sections.push(`📄 Relatório completo: tests/reports/argos-predict-${todayYYYYMMDD()}.md`);

  return sections.join('\n');
}

async function generateNarrative(dashboardData) {
  const token = process.env.OPENCODE_API_KEY;
  const base = process.env.OPENCODE_API_BASE || 'https://api.opencode.com/v1';
  const model = process.env.QA_DEFAULT_MODEL || 'qwen3.7-plus';

  if (!token) return null;

  const compactData = {
    data: dashboardData.meta?.geradoEm || '',
    janela: dashboardData.meta?.janela || '',
    kpis: (dashboardData.kpis || []).map(k => ({ l: k.label, v: k.valor })),
    ranking: (dashboardData.ranking || []).map(r => ({
      m: r.modulo, t: r.total, te: r.tec, us: r.usr, n: r.nivel
    })),
    bombas: (dashboardData.bombas || []).map(b => ({
      m: b.modulo, s: b.score, p: b.problema?.slice(0, 200)
    })),
    sentry_escalando: (dashboardData.sentry || []).filter(s => s.status === 'ESCALANDO').length,
    modulos_negligenciados: (dashboardData.mapaCalor || []).filter(h => h.zona === 'Negligenciada').map(h => h.modulo),
  };

  const prompt = `Voce e um redator tecnico de QA. Com base nos dados abaixo, gere APENAS estas 2 secoes em markdown:

## 💣 Top 3 Bombas
(Para cada bomba: 1 frase explicando por que, 1 frase de gatilho, 1 acao concreta. Tom direto.)

## ✅ Acoes Prioritarias
(3-5 acoes com prioridade P0/P1/P2, modulo e consequencia. Tom executivo.)

DADOS:
${JSON.stringify(compactData, null, 2)}

REGRAS:
- Nao invente dados. Use APENAS o que esta no JSON.
- Portugues do Brasil, tom executivo.
- Maximo 800 tokens.`;

  try {
    const res = await fetch(`${base}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 800,
        temperature: 0.3,
      }),
    });

    if (!res.ok) {
      console.warn(`  ⚠️ Narrativa IA indisponivel (${res.status}) — relatorio sem narrativa gerencial.`);
      return null;
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content || null;
  } catch (e) {
    console.warn(`  ⚠️ Narrativa IA falhou: ${e.message}`);
    return null;
  }
}

module.exports = { generateMarkdownReport, generateNarrative };
