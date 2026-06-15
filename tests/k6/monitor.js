/**
 * Argos QA — Monitor de Performance Contínuo
 *
 * 1 VU · bate nos 7 endpoints principais a cada ~30s · roda o dia todo
 * Abra o dashboard em: http://localhost:5665
 *
 * Inicie via: .\tests\k6\run-monitor.ps1
 * Ou manualmente:
 *   k6 run --web-dashboard -e BEARER_TOKEN="<token>" tests/k6/monitor.js
 */

import http from 'k6/http';
import { sleep, check } from 'k6';
import { Trend, Rate } from 'k6/metrics';

const API_URL      = __ENV.API_URL      || 'https://foundation-api.poli.digital';
const TOKEN        = __ENV.BEARER_TOKEN;
const ACCOUNT_UUID = __ENV.ACCOUNT_UUID || '9b8af98e-73f4-4fe9-b33b-7aa47b0369bf';
const CHAT_UUID    = __ENV.CHAT_UUID    || '5c12ea50-1bdd-11f1-a609-021f6d257969';

if (!TOKEN) throw new Error('BEARER_TOKEN é obrigatório. Use run-monitor.ps1 ou passe -e BEARER_TOKEN="..."');

const trends = {
  auth_me:        new Trend('dur_auth_me',        true),
  chats_list:     new Trend('dur_chats_list',     true),
  settings:       new Trend('dur_settings',       true),
  accounts:       new Trend('dur_accounts',       true),
  contacts_list:  new Trend('dur_contacts_list',  true),
  contact_detail: new Trend('dur_contact_detail', true),
  messages_list:  new Trend('dur_messages_list',  true),
};
const errorRate = new Rate('error_rate');

// Thresholds baseados no baseline de 10/06 + 30% de margem
export const options = {
  vus: 1,
  duration: '8h',
  thresholds: {
    'error_rate':        ['rate<0.05'],
    'dur_auth_me':       ['p(95)<615'],   // baseline p95=473ms
    'dur_chats_list':    ['p(95)<3900'],  // baseline p95=3010ms
    'dur_settings':      ['p(95)<310'],   // baseline p95=237ms
    'dur_accounts':      ['p(95)<520'],   // baseline p95=399ms
    'dur_contacts_list': ['p(95)<345'],   // baseline p95=264ms
    'dur_contact_detail':['p(95)<330'],   // baseline p95=254ms
    'dur_messages_list': ['p(95)<290'],   // baseline p95=223ms
  },
};

function headers() {
  return {
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Type':  'application/json',
    'Accept':        'application/json',
  };
}

export default function () {
  const probes = [
    {
      key: 'auth_me',
      url: `${API_URL}/v3/auth/get-me`,
    },
    {
      key: 'chats_list',
      url: `${API_URL}/v3/accounts/${ACCOUNT_UUID}/chats?include=type,chat_status,read_status,attributes,attendant,team,last_message,tags,unread_messages&status=OPEN&assigned_status=ASSIGNED&order=-date_last_message`,
    },
    {
      key: 'settings',
      url: `${API_URL}/v3/settings`,
    },
    {
      key: 'accounts',
      url: `${API_URL}/v3/accounts`,
    },
    {
      key: 'contacts_list',
      url: `${API_URL}/v3/contacts?per_page=20&page=1`,
    },
    {
      key: 'contact_detail',
      url: `${API_URL}/v3/contacts/${CHAT_UUID}`,
    },
    {
      key: 'messages_list',
      url: `${API_URL}/v3/contacts/${CHAT_UUID}/messages?per_page=20&page=1`,
    },
  ];

  for (const probe of probes) {
    const res = http.get(probe.url, { headers: headers(), tags: { endpoint: probe.key } });
    // 4xx = endpoint respondeu mas sem permissão/not found (não é erro de infra)
    const ok  = check(res, { [`${probe.key} ok`]: r => r.status >= 200 && r.status < 500 });
    errorRate.add(!ok);
    trends[probe.key].add(res.timings.duration);
    sleep(0.5);
  }

  // Pausa entre ciclos — total ~14s por iteração → ~257 amostras/hora por endpoint
  sleep(10);
}
