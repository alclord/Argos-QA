// ============================================================
//  ARGOS PREDICT — DATA FILE
//  Atualizado semanalmente pelo comando /argos-predict
//  Última geração: 2026-05-28
// ============================================================
const REPORT = {
  meta: {
    geradoEm: "28 de Maio de 2026",
    janela: "14 dias",
    fontes: "Jira Suporte (52 N2 + 100 N1) · DEV4 (37 backlog + 4 em dev) · Sentry · GitHub Churn (33 PRs)"
  },

  kpis: [
    { label: "Bugs confirmados N2",    valor: "47",    cor: "red",    icone: "🔴", detalhe: "Investigados pelo N2 — problema confirmado" },
    { label: "Bugs ativos N1",         valor: "18",    cor: "amber",  icone: "🟡", detalhe: "Abertos por clientes nos últimos 14 dias" },
    { label: "Módulos críticos",       valor: "3",     cor: "red",    icone: "🔴", detalhe: "Chat · Canais · Distribuição" },
    { label: "Usuários afetados (prod)",valor: "3.433+",cor: "red",   icone: "🔴", detalhe: "Só no maior erro do omnispa (404)" },
    { label: "Features instáveis em dev","valor": "2", cor: "orange", icone: "🟠", detalhe: "Adicionando complexidade sobre bugs abertos" },
    { label: "Corretivos em dev",      valor: "1",     cor: "amber",  icone: "🟡", detalhe: "DEV4-4078 — cobre 1 de 8 bugs N2 de Chat" },
    { label: "Módulos negligenciados", valor: "5",     cor: "red",    icone: "🔴", detalhe: "Sem nenhum card corretivo planejado" },
    { label: "Bugs N2 sem corretivo",  valor: "29",    cor: "red",    icone: "🔴", detalhe: "62% dos bugs confirmados sem fix" }
  ],

  ranking: [
    { modulo: "Chat / Mensagens",      total: 71, tec: 13, usr: 58, nivel: "ALTO",    cor: "#EF4444" },
    { modulo: "Canais / WhatsApp",     total: 50, tec: 8,  usr: 42, nivel: "ALTO",    cor: "#EF4444" },
    { modulo: "Distribuição / Filas",  total: 46, tec: 7,  usr: 39, nivel: "ALTO",    cor: "#EF4444" },
    { modulo: "Nova Interface",        total: 35, tec: 6,  usr: 29, nivel: "MÉDIO",   cor: "#F59E0B" },
    { modulo: "Upload / Mídia",        total: 22, tec: 3,  usr: 19, nivel: "MÉDIO",   cor: "#F59E0B" },
    { modulo: "Permissões / Roles",    total: 17, tec: 4,  usr: 13, nivel: "MÉDIO",   cor: "#F59E0B" },
    { modulo: "WebSocket / Presença",  total: 12, tec: 4,  usr: 8,  nivel: "ATENÇÃO", cor: "#F97316" },
    { modulo: "CRM / Integrações",     total: 12, tec: 5,  usr: 7,  nivel: "ATENÇÃO", cor: "#F97316" },
    { modulo: "Autenticação",          total: 11, tec: 4,  usr: 7,  nivel: "ATENÇÃO", cor: "#F97316" },
    { modulo: "Automação",             total: 5,  tec: 4,  usr: 1,  nivel: "ATENÇÃO", cor: "#F97316" },
    { modulo: "Jarvis / IA",           total: 4,  tec: 1,  usr: 3,  nivel: "ATENÇÃO", cor: "#F97316" },
    { modulo: "Contatos",              total: 2,  tec: 0,  usr: 2,  nivel: "ESTÁVEL", cor: "#22C55E" }
  ],

  mapaCalor: [
    { modulo: "Distribuição / Filas",  pressao: 39, atencao: 0,  gap: 39, zona: "Negligenciada" },
    { modulo: "Upload / Mídia",        pressao: 19, atencao: 0,  gap: 19, zona: "Negligenciada" },
    { modulo: "Permissões / Roles",    pressao: 13, atencao: 0,  gap: 13, zona: "Negligenciada" },
    { modulo: "CRM / Integrações",     pressao: 7,  atencao: 0,  gap: 7,  zona: "Negligenciada" },
    { modulo: "Autenticação",          pressao: 7,  atencao: 0,  gap: 7,  zona: "Negligenciada" },
    { modulo: "Chat / Mensagens",      pressao: 58, atencao: 5,  gap: 53, zona: "Subatendida" },
    { modulo: "Canais / WhatsApp",     pressao: 42, atencao: 1,  gap: 41, zona: "Subatendida" },
    { modulo: "Nova Interface",        pressao: 29, atencao: 1,  gap: 28, zona: "Subatendida" },
    { modulo: "WebSocket / Presença",  pressao: 8,  atencao: 3,  gap: 5,  zona: "Subatendida" }
  ],

  tendencia: [
    { modulo: "Nova Interface",       delta: +5,  ontem: 30, hoje: 35 },
    { modulo: "Chat / Mensagens",     delta: +3,  ontem: 68, hoje: 71 },
    { modulo: "Canais / WhatsApp",    delta: +3,  ontem: 47, hoje: 50 },
    { modulo: "Permissões / Roles",   delta: +1,  ontem: 16, hoje: 17 },
    { modulo: "Upload / Mídia",       delta:  0,  ontem: 22, hoje: 22 },
    { modulo: "Autenticação",         delta: -2,  ontem: 13, hoje: 11 },
    { modulo: "WebSocket / Presença", delta: -3,  ontem: 15, hoje: 12 },
    { modulo: "Distribuição / Filas", delta: -6,  ontem: 52, hoje: 46 },
    { modulo: "Jarvis / IA",          delta: -5,  ontem: 9,  hoje: 4  },
    { modulo: "CRM / Integrações",    delta: -10, ontem: 22, hoje: 12 },
    { modulo: "Contatos",             delta: -9,  ontem: 11, hoje: 2  }
  ],

  bugDistribuicao: [
    { label: "Sem corretivo planejado", valor: 29, cor: "#EF4444" },
    { label: "Com corretivo ativo",     valor: 2,  cor: "#F59E0B" },
    { label: "Crônicos / não-técnicos", valor: 16, cor: "#475569" }
  ],

  bombas: [
    {
      pos: 1, modulo: "Chat / Mensagens", score: 85,
      problema: "Fix ativo (DEV4-4078) cobre apenas 1 de 8 bugs N2. Feature de agendamentos (DEV4-4229) sendo desenvolvida sobre a mesma camada — risco de regressão silenciosa pós-deploy.",
      gatilho: "Merge de DEV4-4229 antes de DEV4-4078 estável em produção",
      acao: "Bloquear DEV4-4229 · Executar QA de DEV4-4078 (foco: reconexão WebSocket, F5 pós-entrega)"
    },
    {
      pos: 2, modulo: "Canais / WhatsApp", score: 57,
      problema: "DEV4-4023 (verificação WABA/Meta) em desenvolvimento sobre módulo com 9 bugs N2 sem corretivo. 3 PRs de canal mesclados esta semana sem regressivo.",
      gatilho: "Deploy do PLBV sem smoke test de canais existentes",
      acao: "Smoke test de WABA · Instagram · Badge Leads antes de qualquer merge"
    },
    {
      pos: 3, modulo: "Distribuição / Filas", score: 49,
      problema: "86–87 dias sem fix nos bugs mais antigos do sistema. Zero corretivos em desenvolvimento. Nova feature (tela de gestão) planejada sobre motor de distribuição quebrado.",
      gatilho: "DEV4-4003 (tela de gestão) entrar em dev antes dos bugs serem endereçados",
      acao: "Sprint dedicado de bugs de Distribuição · Bloquear DEV4-4003"
    }
  ],

  sentry: [
    { erro: "AxiosError 404",             projeto: "omnispa",        usuarios: 3433, status: "Crônico",   oculto: true  },
    { erro: "Mime encoder quebrado",       projeto: "polichat-spa",   usuarios: 1817, status: "Crônico",   oculto: true  },
    { erro: "AxiosError 401 (sessão)",     projeto: "polichat-spa",   usuarios: 1326, status: "Crônico",   oculto: true  },
    { erro: "Erro não capturado",          projeto: "polichat-spa",   usuarios: 949,  status: "Crônico",   oculto: true  },
    { erro: "Network Error (WebSocket)",   projeto: "omnispa",        usuarios: 806,  status: "Crônico",   oculto: true  },
    { erro: "Exception 403 Forbidden",     projeto: "revendedor-api", usuarios: 416,  status: "Crônico",   oculto: false },
    { erro: "AxiosError 401 (refresh)",    projeto: "omnispa",        usuarios: 133,  status: "Crônico",   oculto: true  },
    { erro: "TypeError: plugin undefined", projeto: "omnispa",        usuarios: 49,   status: "ESCALANDO", oculto: true  }
  ],

  acoes: [
    { prioridade: "P0 — HOJE",          modulo: "Chat",        acao: "Executar QA de DEV4-4078 (fix status de mensagem) antes do merge",                          prazo: "Hoje" },
    { prioridade: "P0 — HOJE",          modulo: "Nova Interface", acao: "Investigar OMNISPA-2QCV (TypeError plugin) — correlacionar com PR1493 de ontem",         prazo: "Hoje" },
    { prioridade: "P0 — HOJE",          modulo: "Permissões",  acao: "Criar card Highest para SM-3211 (operador vê chats alheios — 57 dias sem fix)",             prazo: "Hoje" },
    { prioridade: "P1 — ESTA SEMANA",   modulo: "Chat",        acao: "Bloquear DEV4-4229 (agendamentos) até DEV4-4078 estável 48h em produção",                   prazo: "Esta semana" },
    { prioridade: "P1 — ESTA SEMANA",   modulo: "Nova Interface", acao: "Bloquear DEV4-4166 (Nova Estrutura de Páginas) até spike do 404 omnispa",               prazo: "Esta semana" },
    { prioridade: "P1 — ESTA SEMANA",   modulo: "Distribuição", acao: "Sprint de bugs: SM-5918 (chats presos) + SM-5911 (encaminhamento) + SM-5716 (bot)",       prazo: "Esta semana" },
    { prioridade: "P1 — ESTA SEMANA",   modulo: "Canais",      acao: "Smoke test de canais após PR1123 (fix DistributeChatAction mesclado ontem)",                prazo: "Esta semana" },
    { prioridade: "P2 — PRÓX. SPRINT",  modulo: "Upload",      acao: "Criar corretivo para SM-2091 (PDF não envia — 85 dias) + SM-7503",                         prazo: "Próx. sprint" },
    { prioridade: "P2 — PRÓX. SPRINT",  modulo: "Distribuição", acao: "Bloquear DEV4-4003 (Tela de Gestão) até 3 bugs N2 terem corretivo ativo",                 prazo: "Próx. sprint" }
  ]
};
