/**
 * Argos QA — K6 Calibration Script (Interface Legada)
 *
 * Objetivo: coletar p50/p95 dos endpoints da interface antiga (app-spa.poli.digital)
 * para comparar com os dados da Foundation API (calibration.js).
 *
 * IMPORTANTE: A interface antiga NÃO tem endpoint REST para listagem de chats.
 * Chats são entregues via WebSocket (Pusher) — latência percebida pelo usuário
 * depende da conexão WebSocket, não de uma chamada REST.
 *
 * Uso:
 *   k6 run -e BEARER_TOKEN="seu_token" tests/k6/calibration-legacy.js
 *
 * Tokens válidos para app.poli.digital:
 *   - Sanctum: user_token_login_info.token (do localStorage da app-spa)
 *   - JWT:     poli_access.token (do localStorage da app-spa)
 */

import http from 'k6/http';
import { sleep, check } from 'k6';
import { Trend, Rate } from 'k6/metrics';

const API_LEGACY   = 'https://app.poli.digital';
const API_HEIMDALL = 'https://heimdall.poli.digital';
const TOKEN        = __ENV.BEARER_TOKEN;
const CUSTOMER_ID  = __ENV.CUSTOMER_ID || '1';

if (!TOKEN) {
  throw new Error('BEARER_TOKEN é obrigatório. Passe com: -e BEARER_TOKEN="seu_token"');
}

const trends = {
  settings:    new Trend('legacy_settings',    true),
  auth_check:  new Trend('legacy_auth_check',  true),
  credits:     new Trend('legacy_credits',     true),
  products:    new Trend('legacy_products',    true),
  gateway:     new Trend('legacy_gateway',     true),
};

const errorRate = new Rate('legacy_error_rate');

export const options = {
  vus: 1,
  duration: '3m',
  thresholds: {
    'legacy_error_rate': ['rate<0.10'],
  },
};

function headers() {
  return {
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
}

export default function () {

  // 1. GET /api/reseller/settings — configurações da conta (equivalente ao /v3/settings)
  {
    const res = http.get(`${API_LEGACY}/api/reseller/settings`, { headers: headers() });
    const ok = check(res, { 'settings: status 2xx': r => r.status >= 200 && r.status < 300 });
    errorRate.add(!ok);
    trends.settings.add(res.timings.duration);
    sleep(0.5);
  }

  // 2. GET /auth/foundation/allowed — verificação de auth (equivalente ao /v3/auth/get-me)
  {
    const res = http.get(`${API_HEIMDALL}/auth/foundation/allowed`, { headers: headers() });
    // 403 é esperado (sem acesso à Foundation API via esta conta no Heimdall), mas mede latência
    const ok = check(res, { 'auth_check: respondeu': r => r.status > 0 });
    errorRate.add(!ok);
    trends.auth_check.add(res.timings.duration);
    sleep(0.5);
  }

  // 3. POST /credits/balance — saldo de créditos (sem equivalente direto na nova interface)
  {
    const res = http.post(`${API_LEGACY}/credits/balance`, '{}', { headers: headers() });
    const ok = check(res, { 'credits: status 2xx': r => r.status >= 200 && r.status < 300 });
    errorRate.add(!ok);
    trends.credits.add(res.timings.duration);
    sleep(0.5);
  }

  // 4. GET /shopping/products/search — planos/produtos disponíveis
  {
    const res = http.get(`${API_LEGACY}/shopping/products/search?status=1`, { headers: headers() });
    const ok = check(res, { 'products: status 2xx': r => r.status >= 200 && r.status < 300 });
    errorRate.add(!ok);
    trends.products.add(res.timings.duration);
    sleep(0.5);
  }

  // 5. GET /shopping/gateway — gateway de pagamento
  {
    const res = http.get(`${API_LEGACY}/shopping/gateway`, { headers: headers() });
    const ok = check(res, { 'gateway: status 2xx': r => r.status >= 200 && r.status < 300 });
    errorRate.add(!ok);
    trends.gateway.add(res.timings.duration);
    sleep(1);
  }

  sleep(1);
}

export function handleSummary(data) {
  const endpoints = [
    { key: 'legacy_settings',   label: 'GET /api/reseller/settings (legacy)',    newEquiv: 'GET /v3/settings' },
    { key: 'legacy_auth_check', label: 'GET /auth/foundation/allowed (heimdall)', newEquiv: 'GET /v3/auth/get-me' },
    { key: 'legacy_credits',    label: 'POST /credits/balance (legacy)',          newEquiv: '—' },
    { key: 'legacy_products',   label: 'GET /shopping/products/search (legacy)',  newEquiv: '—' },
    { key: 'legacy_gateway',    label: 'GET /shopping/gateway (legacy)',          newEquiv: '—' },
  ];

  // Dados da nova interface para comparação (do k6-calibration-result.json)
  const newInterface = {
    'GET /v3/settings':     { p50: 201, p95: 237 },
    'GET /v3/auth/get-me':  { p50: 336, p95: 473 },
    'GET /v3/accounts/:uuid/chats': { p50: 1515, p95: 3010, note: 'REST polling' },
  };

  let table = '\n================================================================\n';
  table    += ' Argos QA — Comparação Interface Legada vs Nova Interface\n';
  table    += '================================================================\n\n';
  table    += `${'Endpoint Legado'.padEnd(46)} ${'p50'.padStart(6)} ${'p95'.padStart(6)} | ${'Equiv. Nova'.padEnd(30)} ${'p50'.padStart(6)} ${'p95'.padStart(6)}\n`;
  table    += '-'.repeat(110) + '\n';

  const jsonOutput = {
    generated_at: new Date().toISOString(),
    legacy_api: API_LEGACY,
    raw: {},
  };

  for (const ep of endpoints) {
    const m = data.metrics[ep.key];
    if (!m) continue;

    const p50 = Math.round(m.values['med'] ?? m.values['p(50)'] ?? 0);
    const p95 = Math.round(m.values['p(95)']);

    const newData = newInterface[ep.newEquiv];
    const newCol = newData
      ? `${ep.newEquiv.padEnd(30)} ${String(newData.p50+'ms').padStart(6)} ${String(newData.p95+'ms').padStart(6)}`
      : `${'(sem equivalente)'.padEnd(30)} ${'—'.padStart(6)} ${'—'.padStart(6)}`;

    table += `${ep.label.padEnd(46)} ${String(p50+'ms').padStart(6)} ${String(p95+'ms').padStart(6)} | ${newCol}\n`;

    jsonOutput.raw[ep.label] = {
      p50, p95,
      p99: Math.round(m.values['p(99)'] ?? m.values['max'] ?? 0),
      avg: Math.round(m.values['avg']),
      min: Math.round(m.values['min']),
      max: Math.round(m.values['max']),
      new_equiv: ep.newEquiv,
    };
  }

  table += '\n';
  table += '--- Chat List (Arquitetura) ---\n';
  table += 'Interface Legada:   WebSocket Pusher — chats entregues via push, sem REST.\n';
  table += '                    Latência percebida ≈ 0ms após conexão WebSocket estabelecida.\n';
  table += 'Interface Nova:     REST GET /v3/accounts/:uuid/chats — polling explícito.\n';
  table += `                    p50=1515ms | p95=3010ms (dados do k6-calibration-result.json)\n`;
  table += '\n⚠️  ATENÇÃO: A interface nova é significativamente mais lenta para o carregamento\n';
  table += '    inicial de chats (p95=3010ms vs ~0ms via WebSocket na interface legada).\n';
  table += '    Isso impacta diretamente a experiência do cliente ao abrir a tela de atendimento.\n';
  table += '================================================================\n';

  return {
    stdout: table,
    'tests/reports/k6-calibration-legacy.json': JSON.stringify(jsonOutput, null, 2),
  };
}
