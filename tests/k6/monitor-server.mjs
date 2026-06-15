/**
 * Argos QA — Monitor Dashboard Server
 * Serve o dashboard de performance em http://localhost:8080
 * Consome a REST API do k6 em http://localhost:6565
 * e lê live.jsonl para métricas em janela deslizante (30s / 60s)
 *
 * Iniciado automaticamente pelo run-monitor.ps1
 */

import http from 'http';
import { readSync, openSync, closeSync, statSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LIVE_FILE = path.join(__dirname, 'live.jsonl');

const K6_API = 'http://127.0.0.1:6565';
const PORT   = 8080;

const THRESHOLDS = {
  dur_auth_me:        615,
  dur_chats_list:     3900,
  dur_settings:       310,
  dur_accounts:       520,
  dur_contacts_list:  345,
  dur_contact_detail: 330,
  dur_messages_list:  290,
};

const LABELS = {
  dur_auth_me:        'GET /v3/auth/get-me',
  dur_chats_list:     'GET /v3/accounts/:uuid/chats',
  dur_settings:       'GET /v3/settings',
  dur_accounts:       'GET /v3/accounts',
  dur_contacts_list:  'GET /v3/contacts',
  dur_contact_detail: 'GET /v3/contacts/:uuid',
  dur_messages_list:  'GET /v3/contacts/:uuid/messages',
};

const SCREENS = {
  dur_auth_me:        'Login / Autenticação',
  dur_chats_list:     'Lista de Conversas',
  dur_settings:       'Configurações',
  dur_accounts:       'Seleção de Conta',
  dur_contacts_list:  'Lista de Contatos',
  dur_contact_detail: 'Detalhe do Contato',
  dur_messages_list:  'Carregar Mensagens',
};

// --- Live buffer (sliding window de até 2 minutos) ---
const BUFFER_MAX_MS = 2 * 60 * 1000;
const METRIC_KEYS   = new Set(Object.keys(THRESHOLDS));
const liveBuffer    = {};
for (const k of METRIC_KEYS) liveBuffer[k] = [];
let fileOffset = 0;

function readNewLines() {
  if (!existsSync(LIVE_FILE)) return;
  try {
    const stat = statSync(LIVE_FILE);
    if (stat.size <= fileOffset) return;
    const fd  = openSync(LIVE_FILE, 'r');
    const buf = Buffer.alloc(stat.size - fileOffset);
    readSync(fd, buf, 0, buf.length, fileOffset);
    closeSync(fd);
    fileOffset  = stat.size;
    const now    = Date.now();
    const cutoff = now - BUFFER_MAX_MS;
    const lines  = buf.toString('utf8').split('\n');
    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const entry = JSON.parse(line);
        if (entry.type === 'Point' && METRIC_KEYS.has(entry.metric)) {
          liveBuffer[entry.metric].push({
            t: new Date(entry.data.time).getTime(),
            v: entry.data.value,
          });
        }
      } catch {}
    }
    for (const k of METRIC_KEYS) {
      liveBuffer[k] = liveBuffer[k].filter(p => p.t >= cutoff);
    }
  } catch {}
}

setInterval(readNewLines, 2000);
readNewLines();

function pct(sorted, p) {
  if (!sorted.length) return null;
  const idx = Math.ceil(p / 100 * sorted.length) - 1;
  return Math.round(sorted[Math.max(0, idx)]);
}

function windowedStats(key, windowMs) {
  const cutoff = Date.now() - windowMs;
  const pts    = (liveBuffer[key] || []).filter(p => p.t >= cutoff);
  if (!pts.length) return null;
  const vals = pts.map(p => p.v).sort((a, b) => a - b);
  return {
    count: vals.length,
    p50:   pct(vals, 50),
    p95:   pct(vals, 95),
    max:   Math.round(vals[vals.length - 1]),
    avg:   Math.round(vals.reduce((s, v) => s + v, 0) / vals.length),
  };
}

// --- HTML ---
const HTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Argos QA — Performance Monitor</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', sans-serif; background: #0f1117; color: #e2e8f0; padding: 24px; }
    h1 { font-size: 1.1rem; font-weight: 600; color: #94a3b8; letter-spacing: .05em; margin-bottom: 6px; }
    #status { font-size: .75rem; color: #64748b; margin-bottom: 16px; }
    #status.ok  { color: #22c55e; }
    #status.err { color: #ef4444; }
    .tabs { display: flex; gap: 4px; margin-bottom: 14px; }
    .tab { padding: 6px 18px; background: #1e2330; border: 1px solid #2d3748; border-radius: 6px;
           color: #64748b; cursor: pointer; font-size: .8rem; font-family: 'Segoe UI', sans-serif; transition: background .15s; }
    .tab.active { background: #1d4ed8; border-color: #2563eb; color: #fff; }
    .win-btns { display: flex; gap: 4px; margin-bottom: 12px; }
    .win-btn { padding: 4px 14px; background: #1e2330; border: 1px solid #2d3748; border-radius: 4px;
               color: #64748b; cursor: pointer; font-size: .75rem; font-family: 'Segoe UI', sans-serif; transition: background .15s; }
    .win-btn.active { background: #064e3b; border-color: #059669; color: #34d399; }
    #section-live { display: none; }
    table { width: 100%; border-collapse: collapse; font-size: .85rem; }
    th { text-align: left; padding: 8px 12px; background: #1e2330; color: #64748b;
         font-weight: 500; border-bottom: 1px solid #2d3748; }
    td { padding: 9px 12px; border-bottom: 1px solid #1a202c; }
    tr:last-child td { border-bottom: none; }
    .endpoint { font-family: 'Consolas', monospace; font-size: .8rem; color: #93c5fd; }
    .screen   { font-size: .8rem; color: #a78bfa; }
    .val { text-align: right; font-variant-numeric: tabular-nums; }
    .ok   { color: #4ade80; }
    .warn { color: #facc15; }
    .crit { color: #f87171; }
    .na   { color: #4b5563; }
    .cnt  { color: #64748b; font-size: .75rem; text-align: right; }
    #updated { font-size: .7rem; color: #374151; margin-top: 16px; text-align: right; }
    .live-hint { font-size: .7rem; color: #374151; margin-bottom: 10px; }
  </style>
</head>
<body>
  <h1>ARGOS QA &mdash; PERFORMANCE MONITOR &mdash; PRODUCAO</h1>
  <div id="status">Aguardando k6...</div>

  <div class="tabs">
    <button class="tab active" data-tab="cumul">Acumulado (sessão toda)</button>
    <button class="tab" data-tab="live">Ao Vivo</button>
  </div>

  <div id="section-live">
    <div class="win-btns">
      <button class="win-btn active" data-ms="30000">últimos 30s</button>
      <button class="win-btn" data-ms="60000">último 60s</button>
    </div>
    <p class="live-hint">Cada ciclo do k6 bate nos endpoints a cada ~30s — na janela de 30s haverá 1 amostra por endpoint (ou 0 se o ciclo ainda não completou).</p>
  </div>

  <table>
    <thead>
      <tr>
        <th>Tela</th>
        <th>Endpoint</th>
        <th class="val">p50 (ms)</th>
        <th class="val">p95 (ms)</th>
        <th class="val" id="col-extra">p99 (ms)</th>
        <th class="val">avg (ms)</th>
        <th class="val">Threshold</th>
        <th class="val" id="col-cnt">Requests</th>
        <th class="val">Erros</th>
      </tr>
    </thead>
    <tbody id="tbody"></tbody>
  </table>
  <div id="updated"></div>

<script>
const THRESHOLDS = ${JSON.stringify(THRESHOLDS)};
const LABELS     = ${JSON.stringify(LABELS)};
const SCREENS    = ${JSON.stringify(SCREENS)};

let activeTab  = 'cumul';
let liveWindow = 30000;

document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeTab = btn.dataset.tab;
    document.getElementById('section-live').style.display = activeTab === 'live' ? 'block' : 'none';
    document.getElementById('col-extra').textContent = activeTab === 'live' ? 'max (ms)' : 'p99 (ms)';
    document.getElementById('col-cnt').textContent   = activeTab === 'live' ? 'Amostras' : 'Requests';
    refresh();
  });
});

document.querySelectorAll('.win-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.win-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    liveWindow = Number(btn.dataset.ms);
    refresh();
  });
});

function cls(val, thr) {
  if (val == null) return 'na';
  if (val > thr)        return 'crit';
  if (val > thr * 0.80) return 'warn';
  return 'ok';
}

async function refresh() {
  const statusEl = document.getElementById('status');
  const tbody    = document.getElementById('tbody');
  const updated  = document.getElementById('updated');
  try {
    if (activeTab === 'cumul') {
      await refreshCumul(statusEl, tbody, updated);
    } else {
      await refreshLive(statusEl, tbody, updated);
    }
  } catch (e) {
    statusEl.textContent = 'k6 ainda nao iniciado ou parado — ' + e.message;
    statusEl.className   = 'err';
  }
}

async function refreshCumul(statusEl, tbody, updated) {
  const r    = await fetch('/api/metrics');
  const data = await r.json();
  if (data.error) throw new Error(data.error);

  statusEl.textContent = 'Ao vivo';
  statusEl.className   = 'ok';

  const metrics   = data.data || [];
  const byName    = {};
  metrics.forEach(m => { byName[m.id] = m.attributes?.sample ?? {}; });

  const errRate   = byName['error_rate']?.rate ?? null;
  const errPct    = errRate != null ? (errRate * 100).toFixed(1) + '%' : '—';
  const totalReqs = byName['http_reqs']?.count ?? '—';

  let rows = '';
  for (const [key, label] of Object.entries(LABELS)) {
    const s   = byName[key] ?? null;
    const thr = THRESHOLDS[key];
    const p50 = s ? Math.round(s.med      ?? 0) : null;
    const p95 = s ? Math.round(s['p(95)'] ?? 0) : null;
    const p99 = s ? Math.round(s.max      ?? 0) : null;
    const avg = s ? Math.round(s.avg      ?? 0) : null;
    const c95 = cls(p95, thr);
    rows += \`<tr>
      <td class="screen">\${SCREENS[key] ?? '—'}</td>
      <td class="endpoint">\${label}</td>
      <td class="val \${cls(p50, thr * 0.8)}">\${p50 ?? '—'}</td>
      <td class="val \${c95}">\${p95 ?? '—'}</td>
      <td class="val \${cls(p99, thr * 1.3)}">\${p99 ?? '—'}</td>
      <td class="val">\${avg ?? '—'}</td>
      <td class="val \${c95}">\${thr}</td>
      <td class="val">—</td>
      <td class="val \${errRate > 0.05 ? 'crit' : errRate > 0 ? 'warn' : 'ok'}">\${errPct}</td>
    </tr>\`;
  }
  tbody.innerHTML = rows;
  updated.textContent = \`Atualizado em \${new Date().toLocaleTimeString('pt-BR')} · Total requests: \${totalReqs}\`;
}

async function refreshLive(statusEl, tbody, updated) {
  const r    = await fetch(\`/api/live-metrics?window=\${liveWindow}\`);
  const data = await r.json();
  if (data.error) throw new Error(data.error);

  const label = liveWindow === 30000 ? 'últimos 30s' : 'último 60s';
  statusEl.textContent = \`Ao vivo · janela: \${label}\`;
  statusEl.className   = 'ok';

  let rows = '';
  let totalSamples = 0;
  for (const [key, lbl] of Object.entries(LABELS)) {
    const s   = data[key];
    const thr = THRESHOLDS[key];
    const p50 = s?.p50 ?? null;
    const p95 = s?.p95 ?? null;
    const mx  = s?.max ?? null;
    const avg = s?.avg ?? null;
    const cnt = s?.count ?? 0;
    totalSamples += cnt;
    const c95 = cls(p95, thr);
    rows += \`<tr>
      <td class="screen">\${SCREENS[key] ?? '—'}</td>
      <td class="endpoint">\${lbl}</td>
      <td class="val \${cls(p50, thr * 0.8)}">\${p50 ?? '—'}</td>
      <td class="val \${c95}">\${p95 ?? '—'}</td>
      <td class="val \${cls(mx, thr * 1.3)}">\${mx ?? '—'}</td>
      <td class="val">\${avg ?? '—'}</td>
      <td class="val \${c95}">\${thr}</td>
      <td class="cnt">\${cnt || '—'}</td>
      <td class="val na">—</td>
    </tr>\`;
  }
  tbody.innerHTML = rows;
  updated.textContent = \`Atualizado em \${new Date().toLocaleTimeString('pt-BR')} · Amostras na janela: \${totalSamples}\`;
}

refresh();
setInterval(refresh, 5000);
</script>
</body>
</html>`;

// --- HTTP Server ---
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');

  if (url.pathname === '/api/metrics') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    try {
      const r    = await fetch(`${K6_API}/v1/metrics`);
      const body = await r.text();
      res.writeHead(200);
      res.end(body);
    } catch (e) {
      res.writeHead(200);
      res.end(JSON.stringify({ error: e.message }));
    }

  } else if (url.pathname === '/api/live-metrics') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    const windowMs = Number(url.searchParams.get('window') || 30000);
    const result   = {};
    for (const key of METRIC_KEYS) {
      result[key] = windowedStats(key, windowMs);
    }
    res.writeHead(200);
    res.end(JSON.stringify(result));

  } else {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(HTML);
  }
});

server.listen(PORT, () => {
  process.stdout.write(`Dashboard: http://localhost:${PORT}\n`);
});
