/**
 * Argos QA — Token Fetcher
 * Busca um Bearer token fresco via heimdall.poli.digital usando as
 * credenciais do canário definidas no .env da raiz do projeto.
 *
 * Uso (chamado pelo run-monitor.ps1, mas pode rodar direto):
 *   node tests/k6/get-token.mjs
 *
 * Saída: imprime só o token em stdout (sem quebra de linha).
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Lê .env da raiz do projeto
function loadEnv() {
  const env = {};
  try {
    const content = readFileSync(resolve(__dirname, '../../.env'), 'utf-8');
    for (const line of content.split(/\r?\n/)) {
      const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
      if (m) env[m[1]] = m[2].trim();
    }
  } catch { /* .env ausente — usa process.env */ }
  return env;
}

const env   = loadEnv();
const email    = env.CANARY_OPERATOR_EMAIL    || process.env.CANARY_OPERATOR_EMAIL;
const password = env.CANARY_OPERATOR_PASSWORD || process.env.CANARY_OPERATOR_PASSWORD;

if (!email || !password) {
  process.stderr.write('Erro: CANARY_OPERATOR_EMAIL / CANARY_OPERATOR_PASSWORD ausentes no .env\n');
  process.exit(1);
}

const res = await fetch('https://heimdall.poli.digital/auth/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password, device_name: 'desktop', device_token: '' }),
});

if (!res.ok) {
  process.stderr.write(`Erro: heimdall retornou HTTP ${res.status}\n`);
  process.exit(1);
}

const data = await res.json();
if (!data.token) {
  process.stderr.write('Erro: resposta sem campo "token"\n');
  process.exit(1);
}

process.stdout.write(data.token);
