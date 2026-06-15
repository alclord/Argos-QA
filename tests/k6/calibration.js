/**
 * Argos QA — K6 Calibration Script
 *
 * Objetivo: coletar p50/p95/p99 reais dos endpoints principais da Foundation API
 * para calibrar os thresholds do qa-executor (performanceThresholds no local.json).
 *
 * Uso:
 *   k6 run -e BEARER_TOKEN="seu_token" -e API_URL="https://foundation-api.qa.poli.digital" \
 *          -e CHAT_UUID="5c12ea50-1bdd-11f1-a609-021f6d257969" \
 *          -e ACCOUNT_UUID="9b8af98e-73f4-4fe9-b33b-7aa47b0369bf" \
 *          tests/k6/calibration.js
 *
 * Como obter o BEARER_TOKEN:
 *   1. Abra https://spa.qa.poli.digital/chat no browser
 *   2. Faça login
 *   3. Abra DevTools > Network > filtre por "/v3/"
 *   4. Copie o header "Authorization: Bearer <token>" de qualquer requisição
 *
 * O script roda com 1 VU por 3 minutos (~20 iterações por endpoint).
 * Ao final, exibe uma tabela de sugestões de threshold (avg + 30%).
 */

import http from 'k6/http';
import { sleep, check } from 'k6';
import { Trend, Rate } from 'k6/metrics';

// --- Config ---
const API_URL   = __ENV.API_URL   || 'https://foundation-api.qa.poli.digital';
const TOKEN     = __ENV.BEARER_TOKEN;
const CHAT_UUID = __ENV.CHAT_UUID    || '5c12ea50-1bdd-11f1-a609-021f6d257969';
const ACCOUNT_UUID = __ENV.ACCOUNT_UUID || '9b8af98e-73f4-4fe9-b33b-7aa47b0369bf';

if (!TOKEN) {
  throw new Error('BEARER_TOKEN é obrigatório. Passe com: -e BEARER_TOKEN="seu_token"');
}

// --- Métricas por endpoint ---
const trends = {
  auth_me:         new Trend('duration_auth_me',         true),
  settings:        new Trend('duration_settings',        true),
  chats_list:      new Trend('duration_chats_list',      true),
  contacts_list:   new Trend('duration_contacts_list',   true),
  messages_list:   new Trend('duration_messages_list',   true),
  accounts:        new Trend('duration_accounts',        true),
  contact_detail:  new Trend('duration_contact_detail',  true),
};

const errorRate = new Rate('error_rate');

// --- Opções de execução ---
export const options = {
  vus: 1,
  duration: '3m',
  thresholds: {
    // Apenas para coleta — não falha o run mesmo se lento
    'error_rate': ['rate<0.10'],
  },
};

// --- Headers padrão ---
function headers() {
  return {
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
}

// --- Cenários de teste ---
export default function () {

  // 1. GET /v3/auth/get-me — valida o Bearer token, exercita o stack de autenticação completo
  {
    const res = http.get(`${API_URL}/v3/auth/get-me`, { headers: headers(), tags: { endpoint: 'auth_me' } });
    const ok = check(res, { 'auth_me: status 2xx': r => r.status >= 200 && r.status < 300 });
    errorRate.add(!ok);
    trends.auth_me.add(res.timings.duration);
    sleep(0.5);
  }

  // 2. GET /v3/accounts/:uuid/chats — listagem de conversas (principal para o cliente)
  {
    const res = http.get(
      `${API_URL}/v3/accounts/${ACCOUNT_UUID}/chats?include=type,chat_status,read_status,attributes,attendant,team,last_message,tags,unread_messages&status=OPEN&assigned_status=ASSIGNED&order=-date_last_message`,
      { headers: headers(), tags: { endpoint: 'chats_list' } }
    );
    const ok = check(res, { 'chats_list: status 2xx': r => r.status >= 200 && r.status < 300 });
    errorRate.add(!ok);
    trends.chats_list.add(res.timings.duration);
    sleep(0.5);
  }

  // 3. GET /v3/settings — config da conta (deve ser rápido, geralmente cacheado)
  {
    const res = http.get(`${API_URL}/v3/settings`, { headers: headers(), tags: { endpoint: 'settings' } });
    const ok = check(res, { 'settings: status 2xx': r => r.status >= 200 && r.status < 300 });
    errorRate.add(!ok);
    trends.settings.add(res.timings.duration);
    sleep(0.5);
  }

  // 2. GET /v3/accounts — info da conta logada
  {
    const res = http.get(`${API_URL}/v3/accounts`, { headers: headers(), tags: { endpoint: 'accounts' } });
    const ok = check(res, { 'accounts: status 2xx': r => r.status >= 200 && r.status < 300 });
    errorRate.add(!ok);
    trends.accounts.add(res.timings.duration);
    sleep(0.5);
  }

  // 3. GET /v3/contacts?per_page=20 — listagem de contatos (paginada, carga real)
  {
    const res = http.get(`${API_URL}/v3/contacts?per_page=20&page=1`, { headers: headers(), tags: { endpoint: 'contacts_list' } });
    const ok = check(res, { 'contacts_list: status 2xx': r => r.status >= 200 && r.status < 300 });
    errorRate.add(!ok);
    trends.contacts_list.add(res.timings.duration);
    sleep(0.5);
  }

  // 4. GET /v3/contacts/:uuid — detalhe do contato de teste
  {
    const res = http.get(`${API_URL}/v3/contacts/${CHAT_UUID}`, { headers: headers(), tags: { endpoint: 'contact_detail' } });
    const ok = check(res, { 'contact_detail: status 2xx': r => r.status >= 200 && r.status < 300 });
    errorRate.add(!ok);
    trends.contact_detail.add(res.timings.duration);
    sleep(0.5);
  }

  // 5. GET /v3/contacts/:uuid/messages?per_page=20 — histórico de mensagens (maior payload)
  {
    const res = http.get(`${API_URL}/v3/contacts/${CHAT_UUID}/messages?per_page=20&page=1`, { headers: headers(), tags: { endpoint: 'messages_list' } });
    const ok = check(res, { 'messages_list: status 2xx': r => r.status >= 200 && r.status < 300 });
    errorRate.add(!ok);
    trends.messages_list.add(res.timings.duration);
    sleep(1);
  }

  sleep(1); // pausa entre iterações — não é stress test
}

// --- Sumário customizado ---
export function handleSummary(data) {
  const endpoints = [
    { key: 'duration_auth_me',        label: 'GET /v3/auth/get-me',                 pattern: '**/v3/auth**' },
    { key: 'duration_chats_list',     label: 'GET /v3/accounts/:uuid/chats',        pattern: '**/v3/accounts/**/chats**' },
    { key: 'duration_settings',       label: 'GET /v3/settings',                    pattern: '**/v3/settings**' },
    { key: 'duration_accounts',       label: 'GET /v3/accounts',                    pattern: '**/v3/accounts**' },
    { key: 'duration_contacts_list',  label: 'GET /v3/contacts (lista)',             pattern: '**/v3/contacts**' },
    { key: 'duration_contact_detail', label: 'GET /v3/contacts/:uuid',              pattern: '**/v3/contacts**' },
    { key: 'duration_messages_list',  label: 'GET /v3/contacts/:uuid/messages',     pattern: '**/v3/messages**' },
  ];

  let table = '\n========================================================\n';
  table    += ' Argos QA — Resultado de Calibração de Performance\n';
  table    += '========================================================\n\n';
  table    += `${'Endpoint'.padEnd(42)} ${'p50'.padStart(6)} ${'p95'.padStart(6)} ${'p99'.padStart(6)} ${'Sugerido (p95+20%)'.padStart(20)}\n`;
  table    += '-'.repeat(82) + '\n';

  const suggestions = {};

  for (const ep of endpoints) {
    const m = data.metrics[ep.key];
    if (!m) continue;

    // K6 v2 usa 'med' para mediana; v1 usava 'p(50)'
    const p50 = Math.round(m.values['med'] ?? m.values['p(50)'] ?? 0);
    const p95 = Math.round(m.values['p(95)']);
    const p99 = Math.round(m.values['p(99)'] ?? m.values['max'] ?? 0);
    const suggested = Math.round(p95 * 1.20); // p95 + 20% de margem

    table += `${ep.label.padEnd(42)} ${String(p50+'ms').padStart(6)} ${String(p95+'ms').padStart(6)} ${String(p99+'ms').padStart(6)} ${String(suggested+'ms').padStart(20)}\n`;
    suggestions[ep.pattern] = suggested;
  }

  table += '\n========================================================\n';
  table += ' Copie o bloco abaixo para performanceThresholds no local.json:\n';
  table += '========================================================\n\n';
  table += '"performanceThresholds": {\n';
  table += `  "defaultMs": 1000,\n`;
  table += '  "endpoints": {\n';

  const entries = Object.entries(suggestions);
  // Deduplica patterns iguais, mantendo o maior threshold (mais conservador)
  const deduped = {};
  for (const ep of endpoints) {
    const m = data.metrics[ep.key];
    if (!m) continue;
    const p95 = Math.round(m.values['p(95)']);
    const suggested = Math.round(p95 * 1.20);
    if (!deduped[ep.pattern] || suggested > deduped[ep.pattern]) {
      deduped[ep.pattern] = suggested;
    }
  }

  const dedupedEntries = Object.entries(deduped);
  dedupedEntries.forEach(([pattern, ms], i) => {
    const comma = i < dedupedEntries.length - 1 ? ',' : '';
    table += `    "${pattern}": ${ms}${comma}\n`;
  });

  table += '  }\n}\n';
  table += '\n⚠️  Nota: threshold = p95 + 20% de margem. Ajuste se necessário.\n';

  // Salva também em JSON para consumo programático
  const jsonOutput = {
    generated_at: new Date().toISOString(),
    api_url: API_URL,
    suggestions: deduped,
    raw: {},
  };

  for (const ep of endpoints) {
    const m = data.metrics[ep.key];
    if (!m) continue;
    jsonOutput.raw[ep.label] = {
      p50: Math.round(m.values['med'] ?? m.values['p(50)'] ?? 0),
      p95: Math.round(m.values['p(95)']),
      p99: Math.round(m.values['p(99)'] ?? m.values['max'] ?? 0),
      avg: Math.round(m.values['avg']),
      min: Math.round(m.values['min']),
      max: Math.round(m.values['max']),
    };
  }

  return {
    stdout: table,
    'tests/reports/k6-calibration-result.json': JSON.stringify(jsonOutput, null, 2),
  };
}
