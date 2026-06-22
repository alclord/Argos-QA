const path = require('path');
const fs = require('fs');

function generateDashboardData(data, dateStr) {
  const REPORT = {
    meta: {
      geradoEm: data.summary?.date || dateStr,
      janela: `${data.summary?.days || 14} dias`,
      fontes: data.summary?.sources || '',
    },

    kpis: (data.kpis || []).map(k => ({
      label: k.label,
      valor: k.valor,
      cor: k.cor || 'amber',
      icone: k.icone || '',
      detalhe: k.detalhe || '',
    })),

    ranking: (data.modules || []).map(m => ({
      modulo: m.name,
      total: m.score_total,
      tec: m.score_tec,
      usr: m.score_usr,
      nivel: m.nivel || 'ESTÁVEL',
      cor: m.color || '#22C55E',
      sentryDelta: m.sentryDelta || 0,
    })),

    mapaCalor: (data.heatmap || []).map(h => ({
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

    servicos_radar: (data.radarServices || []).map(s => ({
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

    sentry: (data.sentry || []).map(s => ({
      erro: s.title || s.erro,
      projeto: s.project || s.projeto,
      usuarios: s.userCount || s.usuarios,
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

    drilldown: data.drilldown || {},
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
    'const ARGOS_DATA = ' + JSON.stringify(reportData, null, 2) + ';',
    '',
  ].join('\n');

  fs.writeFileSync(filePath, content, 'utf-8');
  return filePath;
}

module.exports = { generateDashboardData, writeDashboardData };
