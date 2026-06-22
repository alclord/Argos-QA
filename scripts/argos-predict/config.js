const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') });

const { ROOT_DIR, loadJsonSafe } = require('./utils');

function loadConfig() {
  let config = null;

  const localPath = path.join(ROOT_DIR, 'tests', 'config', 'qa-environment.local.json');
  config = loadJsonSafe(localPath);

  if (!config) {
    const templatePath = path.join(ROOT_DIR, 'tests', 'config', 'qa-environment.template.json');
    config = loadJsonSafe(templatePath);
    if (!config) {
      throw new Error('Nenhum arquivo de configuracao encontrado (local nem template).');
    }
    console.warn('⚠️ Usando template.json como fallback. Preencha qa-environment.local.json.');
  }

  return config;
}

function extractEnv() {
  return {
    GH_TOKEN: process.env.GH_TOKEN || '',
    JIRA_EMAIL: process.env.JIRA_EMAIL || '',
    JIRA_API_TOKEN: process.env.JIRA_API_TOKEN || '',
    SENTRY_HOST: process.env.SENTRY_HOST || '',
    SENTRY_ORG: process.env.SENTRY_ORG || '',
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN || '',
    KB_PATH: process.env.KB_PATH || '',
    OPENCODE_API_KEY: process.env.OPENCODE_API_KEY || '',
    OPENCODE_API_BASE: process.env.OPENCODE_API_BASE || 'https://api.opencode.com/v1',
    QA_DEFAULT_MODEL: process.env.QA_DEFAULT_MODEL || 'qwen3.7-plus',
    K6_MONITOR_TOKEN: process.env.K6_MONITOR_TOKEN || '',
    K6_ACCOUNT_UUID: process.env.K6_ACCOUNT_UUID || '',
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || '',
  };
}

function buildRuntimeConfig(rawConfig, env) {
  const c = {};

  c.github = {
    owner: rawConfig.github?.owner || '',
    primaryRepos: rawConfig.github?.primaryRepos || [],
    repos: rawConfig.github?.repos || [],
  };

  c.jira = {
    cloudId: rawConfig.jira?.cloudId || '',
    baseUrl: rawConfig.jira?.baseUrl || '',
    supportProject: rawConfig.jira?.supportProject || '',
    supportQueue: rawConfig.jira?.supportQueue || 'Fila Nível 1',
    devProjects: rawConfig.jira?.devProjects || [],
  };

  c.knowledgeBase = {
    owner: rawConfig.knowledgeBase?.github?.owner || '',
    repo: rawConfig.knowledgeBase?.github?.repo || '',
    branch: rawConfig.knowledgeBase?.github?.branch || 'main',
  };

  c.argos = rawConfig.argos || {};
  c.argos.scoring = c.argos.scoring || {
    decayFactors: [1.0, 0.8, 0.6, 0.4],
    supportWeights: { Bug: 3, Solicitação: 2, Dúvida: 1, História: 1, Tarefa: 0 },
    crossServiceWeights: {
      heimdall: 2.0,
      'api-gateway': 1.8,
      'dispatch-service': 1.5,
      'foundation-api': 1.3,
      'polichat-web-app': 1.3,
    },
    churnThresholds: { high: 500, medium: 100 },
    entropyThresholds: { high: 3.5, medium: 2.0 },
    newcomerFactorThreshold: 0.50,
    doraThresholds: { cfr_instavel: 0.30, cfr_atencao: 0.15 },
    releaseHealthThresholds: { critico: -2.0, atencao: -0.5 },
  };
  c.argos.alerts = c.argos.alerts || {
    webhook: { url: '', enabled: false },
    thresholds: {
      modulo_alto_para_alerta: 10,
      delta_critico_para_alerta: 5,
      novos_modulos_alto_para_alerta: 2,
    },
  };
  c.argos.history = c.argos.history || {
    retentionDays: 90,
    historyPath: 'tests/reports/history',
  };
  c.argos.autoEscalate = c.argos.autoEscalate || {
    enabled: false,
    scoreMinimo: 10,
    somentesNegligenciados: true,
    label: 'argos-predict-auto',
  };

  c.kbFragileAreas = {
    'Upload / Mídia': { pts: 3, reason: 'Processamento de mídia com histórico de corrupção' },
    'Distribuição / Filas': { pts: 3, reason: 'Race conditions em filas de distribuição' },
    'Canais': { pts: 2, reason: 'Integração com APIs externas (Meta, WhatsApp, Instagram)' },
    'Chat / Mensagens': { pts: 2, reason: 'Alto acoplamento com múltiplos serviços (foundation-api, SPA, message-process)' },
    'Autenticação': { pts: 2, reason: 'Dependência de Heimdall + Keycloak para sessões' },
    'WebSocket / Presença': { pts: 1, reason: 'Conexões persistentes com risk de perda de estado' },
  };

  c.tokens = {
    ghToken: env.GH_TOKEN,
    jiraEmail: env.JIRA_EMAIL,
    jiraApiToken: env.JIRA_API_TOKEN,
    sentryAuthToken: env.SENTRY_AUTH_TOKEN,
    opencodeKey: env.OPENCODE_API_KEY,
    opencodeBase: env.OPENCODE_API_BASE,
    qaModel: env.QA_DEFAULT_MODEL,
  };

  c.sentry = {
    host: rawConfig.sentry?.host || env.SENTRY_HOST || '',
    org: rawConfig.sentry?.org || env.SENTRY_ORG || '',
    authToken: env.SENTRY_AUTH_TOKEN,
  };

  c.noiseFilterPath = path.join(ROOT_DIR, 'tests', 'config', 'noise-filter.json');
  c.cachePath = path.join(ROOT_DIR, 'tests', 'reports', 'argos-cache.json');
  c.historyDir = path.join(ROOT_DIR, c.argos.history.historyPath || 'tests/reports/history');
  c.reportsDir = path.join(ROOT_DIR, 'tests', 'reports');
  c.scenariosDir = path.join(ROOT_DIR, 'tests', 'scenarios');
  c.memoryDir = path.join(ROOT_DIR, 'tests', 'memory');
  c.docsDir = path.join(ROOT_DIR, 'docs');

  return c;
}

function validateConfig(config) {
  const errors = [];

  if (!config.jira.cloudId || config.jira.cloudId.includes('SEU_')) {
    errors.push('JIRA_CLOUD_ID nao configurado em qa-environment.local.json');
  }
  if (!config.jira.supportProject) {
    errors.push('jira.supportProject e obrigatorio em qa-environment.local.json');
  }
  if (config.jira.devProjects.length === 0) {
    errors.push('jira.devProjects esta vazio em qa-environment.local.json');
  }

  const tokens = config.tokens;
  if (!tokens.jiraEmail || !tokens.jiraApiToken) {
    errors.push('JIRA_EMAIL ou JIRA_API_TOKEN nao configurados no .env');
  }

  return errors;
}

function displayBanner(config, days, flags) {
  const tokens = config.tokens;
  const argos = config.argos;

  console.log('');
  console.log('═'.repeat(50));
  console.log('  🔮 ARGOS PREDICT v4.0');
  console.log('═'.repeat(50));

  if (flags.cacheOnly) {
    console.log('  🚀 Modo:         Cache-Only (zero consultas externas)');
  } else if (flags.forceRefresh) {
    console.log('  🔄 Modo:         Force Refresh (busca completa)');
  } else {
    console.log('  ⚡ Modo:         Completo (incremental se cache disponivel)');
  }

  console.log(`  📅 Janela:       ultimos ${days} dias`);
  console.log(`  🎫 Suporte:      ${config.jira.supportProject}`);
  console.log(`  🛠️ Dev:          ${config.jira.devProjects.join(', ')}`);
  console.log(`  🧠 Sentry:       ${tokens.sentryAuthToken ? 'configurado' : '⚠️ nao configurado'}`);
  console.log(`  📊 Churn:        ${tokens.ghToken ? 'configurado' : '⚠️ nao configurado'}`);
  console.log(`  📈 Dashboard:    ${flags.updateDashboard ? 'SIM' : 'NAO'}`);
  console.log(`  ⚡ Auto-escalate: ${flags.autoEscalate ? 'SIM' : 'NAO'}`);
  console.log('═'.repeat(50));
  console.log('');
}

module.exports = { loadConfig, extractEnv, buildRuntimeConfig, validateConfig, displayBanner };
