#!/usr/bin/env node
// Argos Radar — Refresh de Cache (GitHub + Jira via Agile Board API)
// Coleta PRs do GitHub e bugs do Jira, salva em tests/reports/argos-cache.json.
//
// NOTA sobre Jira: a instância deste tenant bloqueia /rest/api/3/issue/search
// via Basic Auth. Usamos /rest/agile/1.0/board/{id}/issue (Agile Board API)
// que funciona normalmente. SM (Service Management) não tem board Agile e é
// preservado do último run completo de /argos-predict.
//
// Boards ativos (descobertos via GET /rest/agile/1.0/board?projectKeyOrId=DEV4):
//   213 = Engenharia (kanban)  |  811 = QA (kanban)  |  777 = Produto (kanban)
//
// Uso: node scripts/refresh-radar.mjs [DAYS=14]
// Requer no .env: GH_TOKEN=<github token>
//                 JIRA_EMAIL=<email>  JIRA_API_TOKEN=<token>

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const CACHE_PATH = resolve(ROOT, 'tests/reports/argos-cache.json');

// ── Log helpers ──────────────────────────────────────────────────
const c = { reset: '\x1b[0m', cyan: '\x1b[36m', green: '\x1b[32m', yellow: '\x1b[33m', gray: '\x1b[90m' };
function step(n, msg) { console.log(`\n${c.cyan}[${n}/4]${c.reset} ${msg}`); }
function ok(msg)   { console.log(`  ${c.green}✅${c.reset} ${msg}`); }
function warn(msg) { console.log(`  ${c.yellow}⚠️ ${c.reset} ${msg}`); }
function info(msg) { console.log(`  ${c.gray}   ${msg}${c.reset}`); }

// ── Carregar .env ─────────────────────────────────────────────────
const ENV = {};
const envPath = resolve(ROOT, '.env');
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (m) ENV[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
  }
}

// ── Carregar config ───────────────────────────────────────────────
let config = null;
for (const p of [
  resolve(ROOT, 'tests/config/qa-environment.local.json'),
  resolve(ROOT, 'tests/config/qa-environment.template.json'),
]) {
  if (existsSync(p)) { config = JSON.parse(readFileSync(p, 'utf8')); break; }
}
if (!config) { console.error('❌ Config não encontrado (qa-environment.local.json).'); process.exit(1); }

// ── Parâmetros ────────────────────────────────────────────────────
const DAYS           = parseInt(process.argv[2] ?? '14');
const GH_TOKEN       = ENV.GH_TOKEN;
const JIRA_EMAIL     = ENV.JIRA_EMAIL;
const JIRA_API_TOKEN = ENV.JIRA_API_TOKEN;
const GH_OWNER       = config.github?.owner;
const GH_REPOS       = config.github?.primaryRepos ?? config.github?.repos?.slice(0, 8) ?? [];
const JIRA_BASE      = 'https://poli-digital.atlassian.net';
const SUPPORT_PROJECT = config.jira?.supportProject ?? 'SM';
const DEV_PROJECTS   = config.jira?.devProjects ?? ['DEV4'];
const BOARD_ENG      = 213; // Engenharia kanban — acessa todos os issues DEV4

// ── Mapeamento de módulos ─────────────────────────────────────────
const MODULE_MAP = [
  { patterns: ['chat', 'message', 'mensagem', 'conversa', 'schedule', 'agendamento', 'notif', 'template', 'mensag', 'quick reply', 'mensagens rápidas', 'envio de mensag'], module: 'Chat/Mensagens' },
  { patterns: ['auth', 'login', 'session', 'heimdall', 'token', 'senha', 'password', 'acesso bloqueado', 'autenticac'], module: 'Autenticação' },
  { patterns: ['contact', 'contato'], module: 'Contatos' },
  { patterns: ['dispatch', 'queue', 'fila', 'assign', 'distribu', 'encaminh', 'atribui', 'transferen'], module: 'Distribuição/Filas' },
  { patterns: ['channel', 'canal', 'waba', 'whatsapp', 'webhook', 'sms', 'integrac'], module: 'Canais/WhatsApp' },
  { patterns: ['upload', 'media', 'file', 'attachment', 'arquivo', 'imagem', 'pdf', 'video', 'midia', 'mídia'], module: 'Upload/Mídia' },
  { patterns: ['websocket', 'socket', 'presence', 'presenca', 'soketi', 'realtime', 'online', 'offline'], module: 'WebSocket/Presença' },
  { patterns: ['report', 'analytics', 'sla', 'metric', 'dashboard', 'relatorio', 'relatório'], module: 'Relatórios/SLA' },
  { patterns: ['permission', 'role', 'gate', 'permissao', 'permissão', 'acesso'], module: 'Permissões/Roles' },
  { patterns: ['campaign', 'campanha', 'disparo', 'broadcast'], module: 'Disparos/Campanhas' },
  { patterns: ['billing', 'payment', 'financ', 'pagamento', 'fatura', 'cobranca', 'cobrança'], module: 'Financeiro' },
  { patterns: ['bot', 'chatbot', 'jarvis', ' ia ', 'llm', 'transcri', 'intelig', 'automate'], module: 'Chatbot/Bot' },
  { patterns: ['config', 'setting', 'configurac', 'configuração', 'ui ', 'interface', 'tela', 'painel'], module: 'UI/Config' },
];

function mapModule(text) {
  const t = (' ' + (text ?? '') + ' ').toLowerCase();
  for (const { patterns, module } of MODULE_MAP) {
    if (patterns.some(p => t.includes(p))) return module;
  }
  return 'Outros';
}

// ── Jira REST helpers ─────────────────────────────────────────────
function jiraAuth() {
  if (!JIRA_EMAIL || !JIRA_API_TOKEN) return null;
  return 'Basic ' + Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString('base64');
}

// Leitura individual de issue — funciona mesmo quando search está bloqueado
async function jiraGetIssue(key, fields = ['summary', 'created', 'status']) {
  const auth = jiraAuth();
  if (!auth) return null;
  try {
    const res = await fetch(`${JIRA_BASE}/rest/api/3/issue/${key}?fields=${fields.join(',')}`, {
      headers: { 'Authorization': auth, 'Accept': 'application/json' },
    });
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

// Binary search para achar o ID mais alto existente no projeto SM.
// Assume SM-minKnown existe. Faz log2(range) chamadas sequenciais.
async function findLatestSmId(minKnown = 9000, maxSearch = 30000) {
  let lo = minKnown, hi = maxSearch;
  while (lo < hi) {
    const mid = Math.floor((lo + hi + 1) / 2);
    const res = await jiraGetIssue(`SM-${mid}`, ['created']);
    if (res) lo = mid; else hi = mid - 1;
  }
  return lo;
}

// Lê range de SM issues em batches paralelos de 20, retorna os que existem
async function readSmRange(from, to) {
  const keys = [];
  for (let i = to; i >= from; i--) keys.push(`SM-${i}`);
  const results = [];
  for (let i = 0; i < keys.length; i += 20) {
    const batch = keys.slice(i, i + 20);
    const batchResults = await Promise.all(
      batch.map(k => jiraGetIssue(k, ['summary', 'created', 'status']))
    );
    results.push(...batchResults.filter(Boolean));
  }
  return results;
}

// Usa /rest/agile/1.0/board/{id}/issue — funciona quando /rest/api/3/issue/search está bloqueado.
// Suporta JQL completo, paginação automática e expand=changelog para detectar reopens.
async function agileSearch(boardId, jql, fields = [], expand = '', maxResults = 100) {
  const auth = jiraAuth();
  if (!auth) return [];
  const base = `${JIRA_BASE}/rest/agile/1.0/board/${boardId}/issue`;
  const all = [];
  let startAt = 0;
  while (all.length < 500) {
    const params = new URLSearchParams({ jql, maxResults, startAt });
    if (fields.length) params.set('fields', fields.join(','));
    if (expand) params.set('expand', expand);
    let res;
    try {
      res = await fetch(`${base}?${params}`, {
        headers: { 'Authorization': auth, 'Accept': 'application/json' },
      });
    } catch (e) {
      warn(`Agile API fetch error: ${e.message}`);
      break;
    }
    if (!res.ok) {
      warn(`Agile API ${res.status} em board ${boardId}`);
      break;
    }
    const data = await res.json();
    const issues = data.issues ?? [];
    all.push(...issues);
    if (all.length >= (data.total ?? 0) || issues.length < maxResults) break;
    startAt += issues.length;
  }
  return all;
}

// Detecta reopen via changelog: transição FROM (done/resolvido/fechado) TO (qualquer aberto)
const CLOSED_STATUSES = ['resolvido', 'done', 'fechado', 'closed', 'concluído', 'concluido'];
function isReopened(issue) {
  for (const h of (issue.changelog?.histories ?? [])) {
    for (const item of (h.items ?? [])) {
      if (item.field === 'status') {
        const from = (item.fromString ?? '').toLowerCase();
        const to   = (item.toString  ?? '').toLowerCase();
        if (CLOSED_STATUSES.some(s => from.includes(s)) && !CLOSED_STATUSES.some(s => to.includes(s))) {
          return true;
        }
      }
    }
  }
  return false;
}

// ── GitHub REST API ───────────────────────────────────────────────
async function ghFetch(path) {
  if (!GH_TOKEN) return null;
  try {
    const res = await fetch(`https://api.github.com${path}`, {
      headers: {
        'Authorization': `Bearer ${GH_TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

async function ghGetMergedPRs(repo, cutoff, limit = 80) {
  const all = [];
  for (let page = 1; page <= 4 && all.length < limit; page++) {
    const batch = await ghFetch(`/repos/${GH_OWNER}/${repo}/pulls?state=closed&sort=updated&direction=desc&per_page=50&page=${page}`);
    if (!batch?.length) break;
    const merged = batch.filter(pr => pr.merged_at && pr.merged_at >= cutoff);
    all.push(...merged);
    const oldest = batch[batch.length - 1];
    if (oldest.updated_at < cutoff) break;
  }
  return all.slice(0, limit);
}

// ─────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────
const cutoff     = new Date(Date.now() - DAYS * 24 * 60 * 60 * 1000).toISOString();
const cutoffDate = cutoff.slice(0, 10);
const hasJira    = !!(JIRA_EMAIL && JIRA_API_TOKEN && !JIRA_EMAIL.includes('SEU'));
const hasGH      = !!(GH_TOKEN && GH_OWNER && !GH_OWNER.includes('sua-org'));

console.log('\n' + '═'.repeat(52));
console.log(`  ${c.cyan}Argos Radar${c.reset} — Refresh de Cache`);
console.log(`  Janela : últimos ${DAYS} dias (desde ${cutoffDate})`);
console.log(`  GitHub : ${hasGH ? c.green + '✅ configurado' : c.yellow + '⚠️  GH_TOKEN/github.owner ausentes'}${c.reset}`);
console.log(`  Jira   : ${hasJira ? c.green + '✅ DEV4 via Agile Board API' : c.yellow + '⚠️  JIRA_EMAIL/JIRA_API_TOKEN ausentes'}${c.reset}`);
console.log(`  SM     : ${hasJira ? c.green + '✅ leitura por range de IDs (sem search API)' : c.yellow + '⚠️  JIRA_EMAIL/JIRA_API_TOKEN ausentes'}${c.reset}`);
console.log(`  Sentry : ${c.gray}preservado do último run de /argos-predict${c.reset}`);
console.log('═'.repeat(52));

const existing = existsSync(CACHE_PATH)
  ? JSON.parse(readFileSync(CACHE_PATH, 'utf8'))
  : {};

const cache = {
  ultima_execucao: new Date().toISOString(),
  janela_dias: DAYS,
  modo_ultima: 'REFRESH_SCRIPT',
  sentry_snapshot_7d: existing.sentry_snapshot_7d ?? {},
};

// ─── PASSO 1 — Tickets SM ───────────────────────────────────────
step(1, `Tickets de suporte (${SUPPORT_PROJECT})`);
// SM não tem board Agile e /rest/api/3/issue/search está bloqueado neste tenant.
// Workaround: leitura individual por range de IDs (funciona sem restrição).
// Usa binary search para achar o ID mais recente, depois lê em batches paralelos.

if (hasJira) {
  // Âncora incremental: parte do último ID visto (se disponível no cache)
  const lastKnownId = existing.suporte?._ultimo_id_sm ?? 8000;
  const avgPerDay   = existing.suporte?._avg_por_dia  ?? 100;

  info(`Descobrindo range SM (último conhecido: SM-${lastKnownId})...`);
  const latestId = await findLatestSmId(lastKnownId, lastKnownId + avgPerDay * 60);
  info(`SM mais recente: SM-${latestId}`);

  // Quantos IDs cobrir para o período (avgPerDay * DAYS, com margem de 20%)
  const estimatedCount = Math.ceil(avgPerDay * DAYS * 1.2);
  const fromId = Math.max(1, latestId - estimatedCount);
  info(`Lendo SM-${fromId} até SM-${latestId} (${latestId - fromId + 1} IDs em batches de 20)...`);

  const issues = await readSmRange(fromId, latestId);
  const inWindow = issues.filter(i => (i.fields?.created ?? '') >= cutoff);

  // Atualiza estimativa de tickets por dia para próxima execução
  const daysCovered = (latestId - lastKnownId) / Math.max(avgPerDay, 1);
  const newAvg = daysCovered > 1
    ? Math.round((latestId - lastKnownId) / daysCovered)
    : avgPerDay;

  const byModule = {};
  for (const t of inWindow) {
    const mod = mapModule(t.fields?.summary ?? '');
    byModule[mod] = (byModule[mod] ?? 0) + 1;
  }
  const sorted = Object.fromEntries(Object.entries(byModule).sort((a, b) => b[1] - a[1]));

  ok(`${inWindow.length} tickets em ${DAYS} dias (de ${issues.length} lidos) | top módulos:`);
  Object.entries(sorted).slice(0, 5).forEach(([m, n]) => info(`${m}: ${n}`));

  cache.suporte = {
    total_estimado: inWindow.length,
    bugs_analisados: inWindow.length,
    distribuicao_modulos: sorted,
    incidentes: existing.suporte?.incidentes ?? [],
    bug_lifecycle_recorrente: existing.suporte?.bug_lifecycle_recorrente ?? {},
    _ultimo_id_sm: latestId,
    _avg_por_dia: newAvg,
    _refreshed_at: new Date().toISOString(),
  };
} else {
  warn('Jira não configurado — preservando cache anterior de suporte');
  cache.suporte = existing.suporte ?? { total_estimado: 0, distribuicao_modulos: {}, incidentes: [] };
}
if (cache.suporte.total_estimado) {
  info(`Cache: ${cache.suporte.total_estimado} tickets | top: ${Object.entries(cache.suporte.distribuicao_modulos ?? {}).slice(0, 3).map(([m, n]) => `${m}: ${n}`).join(', ')}`);
}

// ─── PASSO 2 — Cards DEV + Bugs ─────────────────────────────────
step(2, `Cards DEV + bugs (${DEV_PROJECTS.join(', ')}) via Agile Board API`);

if (hasJira) {
  const devFilter = DEV_PROJECTS.map(p => `"${p}"`).join(', ');
  // Statuses reais do DEV4 (descobertos via /rest/api/3/project/DEV4/statuses)
  const backlogStatuses = `"Novo", "Discovery", "Aguardando Design", "Pronto para desenvolvimento", "Aguardando Cenários de Teste", "Criando Cenários de Teste", "Aguardando Handoff"`;
  const activeStatuses  = `"Desenvolvimento", "Code Review", "Correção", "Deploy", "Testando em staging", "Testando em Canário", "Em Revisão Final", "Aguardando Revisão Final", "Aguardando QA", "Preparação para Testes"`;

  // Bugs: busca com changelog para detectar reopen client-side
  const bugJql = `project in (${devFilter}) AND issuetype = Bug AND updated >= "${cutoffDate}" ORDER BY updated DESC`;
  const bugs = await agileSearch(BOARD_ENG, bugJql, ['summary', 'status', 'updated'], 'changelog', 200);

  const reopened = bugs.filter(isReopened);
  const resolved = bugs.filter(b => {
    const status = (b.fields?.status?.name ?? '').toLowerCase();
    return CLOSED_STATUSES.some(s => status.includes(s));
  });

  ok(`${bugs.length} bugs | ${reopened.length} reabertos | ${resolved.length} resolvidos`);
  reopened.slice(0, 5).forEach(b => info(`reopen: ${b.key} — ${(b.fields?.summary ?? '').slice(0, 55)}`));

  cache.bug_reopen_raw = reopened.map(t => ({
    id: t.key,
    modulo: mapModule(t.fields?.summary ?? ''),
    updated: t.fields?.updated,
  }));
  cache.bugs_resolved_raw = resolved.map(t => ({
    id: t.key,
    modulo: mapModule(t.fields?.summary ?? ''),
    resolutiondate: t.fields?.updated,
  }));

  // Backlog e desenvolvimento ativo
  const [backlog, active] = await Promise.all([
    agileSearch(BOARD_ENG, `project in (${devFilter}) AND issuetype in (Story, Task, Epic) AND status in (${backlogStatuses}) AND updated >= "${cutoffDate}" ORDER BY updated DESC`, ['summary', 'status', 'issuetype'], '', 100),
    agileSearch(BOARD_ENG, `project in (${devFilter}) AND issuetype in (Story, Task) AND status in (${activeStatuses}) AND updated >= "${cutoffDate}" ORDER BY updated DESC`, ['summary', 'status', 'issuetype'], '', 100),
  ]);

  ok(`Backlog/ready: ${backlog.length} | Em desenvolvimento: ${active.length}`);
  cache.product_backlog_cards = {
    total: backlog.length,
    dev_ativo: active.length,
    _refreshed_at: new Date().toISOString(),
  };
} else {
  warn('Jira não configurado — preservando cache anterior de DEV');
  cache.product_backlog_cards = existing.product_backlog_cards ?? { total: 0, dev_ativo: 0 };
  cache.bug_reopen_raw = existing.bug_reopen_raw ?? [];
  cache.bugs_resolved_raw = existing.bugs_resolved_raw ?? [];
}

// ─── PASSO 3 — GitHub PRs ───────────────────────────────────────
step(3, `PRs do GitHub (${GH_REPOS.length} repos)`);

const github_prs = {};

if (hasGH) {
  for (const repo of GH_REPOS) {
    const merged = await ghGetMergedPRs(repo, cutoff);
    if (!merged.length) {
      info(`${repo}: 0 PRs merged em ${DAYS} dias`);
      continue;
    }

    const filesByModule = {};
    for (let i = 0; i < merged.length; i += 5) {
      const batch = merged.slice(i, i + 5);
      const results = await Promise.all(
        batch.map(pr => ghFetch(`/repos/${GH_OWNER}/${repo}/pulls/${pr.number}/files`))
      );
      for (let j = 0; j < batch.length; j++) {
        const files = results[j] ?? [];
        for (const f of files) {
          const mod = mapModule(f.filename);
          if (!filesByModule[mod]) filesByModule[mod] = new Set();
          filesByModule[mod].add(String(batch[j].number));
        }
      }
    }

    const porModulo = Object.fromEntries(
      Object.entries(filesByModule)
        .map(([m, s]) => [m, [...s]])
        .sort((a, b) => b[1].length - a[1].length)
    );

    github_prs[repo] = {
      total_merged_14d: merged.length,
      por_modulo: porModulo,
      _refreshed_at: new Date().toISOString(),
    };
    ok(`${repo}: ${merged.length} PRs merged`);
    info(`Top: ${Object.entries(porModulo).slice(0, 3).map(([m, v]) => `${m} (${v.length})`).join(', ')}`);
  }
} else {
  warn('GitHub não configurado — preservando cache anterior de PRs');
  Object.assign(github_prs, existing.github_prs ?? {});
}

cache.github_prs = github_prs;

// ─── PASSO 4 — Salvar ───────────────────────────────────────────
step(4, 'Salvando cache');
mkdirSync(resolve(ROOT, 'tests/reports'), { recursive: true });
writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2), 'utf8');

const smCount  = cache.suporte.total_estimado ?? 0;
const devCount = (cache.product_backlog_cards?.total ?? 0) + (cache.product_backlog_cards?.dev_ativo ?? 0);
const prCount  = Object.values(cache.github_prs).reduce((s, r) => s + (r.total_merged_14d ?? 0), 0);
const bugCount = (cache.bug_reopen_raw?.length ?? 0);

console.log('\n' + '═'.repeat(52));
console.log(`  ${c.green}✅ Cache salvo${c.reset} — tests/reports/argos-cache.json`);
console.log(`     ${smCount} tickets SM · ${devCount} cards DEV · ${prCount} PRs GitHub · ${bugCount} bugs reabertos`);
console.log(`  ${c.gray}ℹ️  Execute /argos-predict para análise (MODO_INCREMENTAL)${c.reset}`);
console.log('═'.repeat(52) + '\n');
