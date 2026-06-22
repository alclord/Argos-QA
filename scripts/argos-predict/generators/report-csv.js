const path = require('path');
const fs = require('fs');

const BOM = '\uFEFF';
const SEP = ';';

function escapeValue(val) {
  if (val === null || val === undefined) return '';
  const str = String(val);
  if (str.includes(SEP) || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function toCsvLine(values) {
  return values.map(escapeValue).join(SEP);
}

function writeCSV(filePath, headers, rows) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const lines = [BOM + toCsvLine(headers), ...rows.map(toCsvLine)];
  fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
  return rows.length;
}

function generateRiscoModulosCSV(reportsDir, dateStr, modules) {
  const filePath = path.join(reportsDir, `argos-predict-${dateStr}-risco-modulos.csv`);
  const headers = ['#', 'Modulo', 'Score Total', 'Score Tecnico', 'Score Usuarios', 'Nivel', 'Tendencia', 'Sentry Delta'];
  const rows = modules.map((m, i) => [
    i + 1,
    m.name,
    m.score_total,
    m.score_tec,
    m.score_usr,
    m.nivel,
    m.trendDirection || '→',
    m.sentryDelta || 0,
  ]);
  return { path: filePath, count: writeCSV(filePath, headers, rows) };
}

function generateTicketsSMCSV(reportsDir, dateStr, tickets) {
  const filePath = path.join(reportsDir, `argos-predict-${dateStr}-tickets-sm.csv`);
  const headers = [
    'ID', 'Titulo', 'Tipo', 'Prioridade', 'Modulo', 'Classificacao',
    'Criado', 'Atualizado', 'Peso', 'Linked Dev',
  ];
  const rows = tickets.map(t => [
    t.key || t.id || '',
    escapeValue(t.summary || t.title || ''),
    t.type || t.issuetype || '',
    t.priority || '',
    t._module || 'Outros',
    t._class || '',
    t.created || '',
    t.updated || '',
    t._weight || 0,
    t.linkedDevCard || '',
  ]);
  return { path: filePath, count: writeCSV(filePath, headers, rows) };
}

function generateCardsDevCSV(reportsDir, dateStr, cards) {
  const filePath = path.join(reportsDir, `argos-predict-${dateStr}-cards-dev.csv`);
  const headers = ['ID', 'Titulo', 'Tipo', 'Status', 'Modulo', 'Assignee', 'Atualizado'];
  const rows = cards.map(c => [
    c.key || c.id || '',
    escapeValue(c.summary || c.title || ''),
    c.issuetype || c.type || '',
    c.status || '',
    c._module || 'Outros',
    c.assignee || '',
    c.updated || '',
  ]);
  return { path: filePath, count: writeCSV(filePath, headers, rows) };
}

function generateSentryCSV(reportsDir, dateStr, issuesByModule) {
  const filePath = path.join(reportsDir, `argos-predict-${dateStr}-sentry.csv`);
  const headers = ['Modulo', 'Titulo', 'Ocorrencias', 'Usuarios', 'Primeira Occur.', 'Status'];
  const rows = [];
  for (const [mod, issues] of Object.entries(issuesByModule)) {
    for (const issue of issues) {
      rows.push([
        mod,
        escapeValue(issue.title || ''),
        issue.count || 0,
        issue.userCount || 0,
        issue.firstSeen || '',
        issue.substatus || issue.status || '',
      ]);
    }
  }
  return { path: filePath, count: writeCSV(filePath, headers, rows) };
}

function generateClustersCSV(reportsDir, dateStr, clusters) {
  const filePath = path.join(reportsDir, `argos-predict-${dateStr}-clusters.csv`);
  const headers = ['Urgencia', 'Sintoma', 'Servico', 'Quantidade', 'Modulo'];
  const rows = clusters.map(c => [
    c.urgencia || '',
    escapeValue(c.sintoma || ''),
    c.servico || '',
    c.qtd || 0,
    c.module || '',
  ]);
  return { path: filePath, count: writeCSV(filePath, headers, rows) };
}

function exportAllCSVs(reportsDir, dateStr, data) {
  const results = {};

  results.riscoModulos = generateRiscoModulosCSV(reportsDir, dateStr, data.modules || []);
  results.ticketsSM = generateTicketsSMCSV(reportsDir, dateStr, data.tickets || []);
  results.cardsDev = generateCardsDevCSV(reportsDir, dateStr, data.cards || []);
  results.clusters = generateClustersCSV(reportsDir, dateStr, data.clusters || []);

  if (data.sentryIssues && Object.keys(data.sentryIssues).length > 0) {
    results.sentry = generateSentryCSV(reportsDir, dateStr, data.sentryIssues);
  }

  return results;
}

module.exports = { exportAllCSVs };
