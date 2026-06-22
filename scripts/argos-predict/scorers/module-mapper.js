const MODULES = [
  {
    name: 'Chat / Mensagens',
    apelido: 'Chat',
    keywords: [
      'chat', 'mensagem', 'mensagens', 'conversa', 'conversas', 'enviar', 'receber',
      'notificação', 'notificacao', 'agendamento', 'audio', 'áudio', 'emoji',
      'transcrição', 'transcricao', 'schedule', 'message', 'notification',
      'transferir', 'transferência', 'transferencia',
    ],
    pathPatterns: ['chat', 'message', 'mensagem', 'conversa', 'schedule', 'agendamento', 'notification'],
    sentryProjects: ['polichat-web-app', 'message-process', 'foundation-api'],
    primaryRepo: 'polichat-web-app',
    repos: ['polichat-web-app', 'message-process', 'SPA'],
  },
  {
    name: 'Canais',
    apelido: 'Canais',
    keywords: [
      'canal', 'canais', 'whatsapp', 'instagram', 'facebook', 'messenger',
      'waba', 'webhook', 'z-api', 'zapi', 'oficial', 'conexão', 'conexao',
      'desconectar', 'desconectou', 'reconectar', 'qr code', 'channel',
      'cloud api', 'número banido', 'número suspenso',
    ],
    pathPatterns: ['channel', 'canal', 'waba', 'whatsapp', 'webhook'],
    sentryProjects: ['channel-customer', 'waba-webhook', 'zapi-consumer', 'zapi-producer'],
    primaryRepo: 'channel-customer',
    repos: ['channel-customer', 'waba-webhook', 'zapi-consumer', 'zapi-producer'],
  },
  {
    name: 'Jarvis / IA',
    apelido: 'Jarvis',
    keywords: [
      'jarvis', 'ia', 'inteligência', 'inteligencia', 'llm', 'openai', 'gpt',
      'chatgpt', 'transcri', 'bot', 'chatbot', 'robô', 'automação',
      'automatização', 'resposta automática', 'resposta automatica',
    ],
    pathPatterns: ['jarvis', 'ai', 'llm', 'transcri'],
    sentryProjects: ['jarvis', 'chatbot'],
    primaryRepo: 'jarvis',
    repos: ['jarvis', 'chatbot', 'poli-brain'],
  },
  {
    name: 'Contatos',
    apelido: 'Contatos',
    keywords: [
      'contato', 'contatos', 'contact', 'cliente', 'cliente', 'importação',
      'importacao', 'import', 'csv', 'tag', 'segmentação', 'segmentacao',
      'grupo', 'grupos', 'lista', 'listas',
    ],
    pathPatterns: ['contact', 'contato'],
    sentryProjects: ['contacts-service'],
    primaryRepo: 'contacts-service',
    repos: ['contacts-service', 'import-service', 'tag-service'],
  },
  {
    name: 'Distribuição / Filas',
    apelido: 'Distribuição',
    keywords: [
      'dispatch', 'distribuição', 'distribuicao', 'fila', 'filas', 'atribuição',
      'atribuicao', 'assign', 'roteamento', 'roteamento', 'atendente',
      'queue', 'balanceamento',
    ],
    pathPatterns: ['dispatch', 'queue', 'fila', 'assign'],
    sentryProjects: ['dispatch', 'dispatch-service', 'distribution-service'],
    primaryRepo: 'dispatch',
    repos: ['dispatch', 'distribution-service'],
  },
  {
    name: 'Autenticação',
    apelido: 'Autenticação',
    keywords: [
      'login', 'logout', 'senha', 'senha', 'password', 'autenticação',
      'autenticacao', 'auth', 'sessão', 'sessao', 'session', 'token',
      'heimdall', 'keycloak', '2fa', 'mfa', 'acesso negado',
    ],
    pathPatterns: ['auth', 'login', 'session', 'heimdall', 'token'],
    sentryProjects: ['api-gateway', 'heimdall', 'polichat-spa'],
    primaryRepo: 'heimdall',
    repos: ['heimdall', 'api-gateway'],
  },
  {
    name: 'Upload / Mídia',
    apelido: 'Upload',
    keywords: [
      'upload', 'mídia', 'midia', 'media', 'arquivo', 'arquivo', 'anexo',
      'attachment', 'imagem', 'imagem', 'video', 'vídeo', 'audio', 'pdf',
      'documento', 'documento', 'download',
    ],
    pathPatterns: ['upload', 'media', 'file', 'attachment'],
    sentryProjects: [],
    primaryRepo: 'polichat-web-app',
    repos: [],
  },
  {
    name: 'WebSocket / Presença',
    apelido: 'WebSocket',
    keywords: [
      'websocket', 'socket', 'presença', 'presenca', 'presence', 'online',
      'offline', 'desconectou', 'desconectado', 'reconexão', 'reconexao',
      'soketi', 'tempo real', 'real-time',
    ],
    pathPatterns: ['websocket', 'socket', 'presence', 'presenca', 'soketi'],
    sentryProjects: ['dispatch-websocket'],
    primaryRepo: 'dispatch-websocket',
    repos: ['dispatch-websocket'],
  },
  {
    name: 'Permissões / Roles',
    apelido: 'Permissões',
    keywords: [
      'permissão', 'permissao', 'permission', 'role', 'perfil', 'acesso',
      'restrição', 'restricao', 'gate', 'admin', 'supervisor', 'operador',
      'gestor', 'manager',
    ],
    pathPatterns: ['permission', 'role', 'gate'],
    sentryProjects: ['heimdall'],
    primaryRepo: 'heimdall',
    repos: ['heimdall'],
  },
  {
    name: 'Configurações',
    apelido: 'Configurações',
    keywords: [
      'configuração', 'configuracao', 'config', 'settings', 'conta', 'account',
      'multi-tenancy', 'tenant', 'feature flag', 'flags', 'horário',
      'horario', 'expediente', 'template', 'templates',
    ],
    pathPatterns: ['config', 'settings', 'account'],
    sentryProjects: ['foundation-api'],
    primaryRepo: 'FoundationAPI',
    repos: ['FoundationAPI', 'SPA'],
  },
  {
    name: 'Relatórios / SLA',
    apelido: 'Relatórios',
    keywords: [
      'relatório', 'relatorio', 'report', 'sla', 'métrica', 'metrica',
      'metric', 'dashboard', 'analytics', 'gráfico', 'grafico',
      'exportação', 'exportacao',
    ],
    pathPatterns: ['report', 'analytics', 'sla', 'metric'],
    sentryProjects: ['data-plataform-api'],
    primaryRepo: 'data-plataform-api',
    repos: ['data-plataform-api', 'PoliMetrics'],
  },
  {
    name: 'Integrações Externas',
    apelido: 'Integrações',
    keywords: [
      'integração', 'integracao', 'integration', 'crm', 'api externa',
      'webhook externo', 'terceiro', 'terceiros', 'zapier', 'n8n',
    ],
    pathPatterns: ['integration', 'crm'],
    sentryProjects: ['integration-service', 'CRM-Bridge'],
    primaryRepo: 'integration-service',
    repos: ['integration-service', 'CRM-Bridge', 'n8n-nodes-poli'],
  },
  {
    name: 'Disparos / Campanhas',
    apelido: 'Campanhas',
    keywords: [
      'disparo', 'disparos', 'campanha', 'campanhas', 'blasts', 'envio em massa',
      'broadcast', 'lista de envio', 'listas de envio',
    ],
    pathPatterns: ['disparo', 'campaign', 'broadcast'],
    sentryProjects: [],
    primaryRepo: 'polichat-web-app',
    repos: [],
  },
];

const CROSS_SERVICE_WEIGHTS = {
  heimdall: 2.0,
  'api-gateway': 1.8,
  dispatch: 1.5,
  'dispatch-service': 1.5,
  FoundationAPI: 1.3,
  'foundation-api': 1.3,
  'polichat-web-app': 1.3,
};

function normalize(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s\/\-_]/g, ' ')
    .trim();
}

function matchKeywords(text, keywords) {
  const norm = normalize(text);
  for (const kw of keywords) {
    if (norm.includes(kw.toLowerCase())) return true;
  }
  return false;
}

class ModuleMapper {
  constructor() {
    this.modules = MODULES;
  }

  getModule(name) {
    return this.modules.find(m => m.name === name);
  }

  getAllModules() {
    return this.modules;
  }

  mapTicketToModule(summary, labels = []) {
    const text = [summary, ...labels].join(' ');
    for (const mod of this.modules) {
      if (matchKeywords(text, mod.keywords)) {
        return mod.name;
      }
    }
    return null;
  }

  mapTicketToModules(summary, labels = []) {
    const text = [summary, ...labels].join(' ');
    const results = [];
    for (const mod of this.modules) {
      if (matchKeywords(text, mod.keywords)) {
        results.push(mod.name);
      }
    }
    return results.length > 0 ? results : ['Outros'];
  }

  mapFilePathToModule(filePath) {
    const norm = normalize(filePath);
    for (const mod of this.modules) {
      if (mod.pathPatterns.length === 0) continue;
      for (const pattern of mod.pathPatterns) {
        if (norm.includes(pattern.toLowerCase())) {
          return mod.name;
        }
      }
    }
    return null;
  }

  mapRepoToService(repoName) {
    return CROSS_SERVICE_WEIGHTS[repoName] || 1.0;
  }

  getModulesByRepo(repoName) {
    return this.modules.filter(m => m.repos.includes(repoName)).map(m => m.name);
  }

  getSentryProjectToModuleMap() {
    const map = {};
    for (const mod of this.modules) {
      for (const proj of mod.sentryProjects) {
        map[proj] = mod.name;
      }
    }
    return map;
  }

  getModuleBySentryProject(projectSlug) {
    for (const mod of this.modules) {
      if (mod.sentryProjects.includes(projectSlug)) return mod.name;
    }
    return null;
  }
}

module.exports = { ModuleMapper, MODULES, CROSS_SERVICE_WEIGHTS };
