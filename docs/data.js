// ============================================================
//  ARGOS PREDICT — DATA FILE
//  Atualizado semanalmente pelo comando /argos-predict
//  Última geração: 2026-05-28
// ============================================================
const REPORT = {
  meta: {
    geradoEm: "28 de Maio de 2026",
    janela: "14 dias",
    resumo: "3 áreas críticas · 47 bugs confirmados pelo suporte · 5 serviços em alerta"
  },

  // ── KPIs GERENCIAIS ──────────────────────────────────────
  kpis: [
    { label: "Clientes reportando problemas", valor: "65",    cor: "red",    icone: "👥", detalhe: "Tickets abertos no suporte nos últimos 14 dias" },
    { label: "Bugs confirmados sem correção", valor: "29",    cor: "red",    icone: "🐛", detalhe: "62% dos bugs N2 não têm nenhum fix planejado" },
    { label: "Usuários afetados em produção", valor: "3.433+",cor: "red",    icone: "🔴", detalhe: "Erro silencioso no omnispa afeta usuários sem ticket" },
    { label: "Dias sem fix (bug mais antigo)", valor: "87",   cor: "red",    icone: "📅", detalhe: "SM-2035 — atribuição automática quebrada há 87 dias" },
    { label: "Áreas em risco crítico",        valor: "3",    cor: "orange", icone: "⚠️", detalhe: "Chat · Canais · Distribuição" },
    { label: "Correções em desenvolvimento",  valor: "1",    cor: "amber",  icone: "🔧", detalhe: "DEV4-4078 cobre apenas 1 dos 8 bugs de mensagens" },
    { label: "Novas features sobre bugs",     valor: "2",    cor: "orange", icone: "🚧", detalhe: "Funcionalidades sendo adicionadas em áreas com falhas ativas" },
    { label: "Serviços sob pressão",          valor: "5",    cor: "red",    icone: "⚡", detalhe: "polichat-web-app · dispatch · waba-webhook · omnispa · SPA" }
  ],

  // ── RANKING DE MÓDULOS (simplificado) ────────────────────
  ranking: [
    { modulo: "Chat / Mensagens",     total: 71, bugs_n2: 8,  bugs_n1: 7,  nivel: "CRÍTICO",  cor: "#EF4444", delta: +3  },
    { modulo: "Canais / WhatsApp",    total: 50, bugs_n2: 9,  bugs_n1: 3,  nivel: "CRÍTICO",  cor: "#EF4444", delta: +3  },
    { modulo: "Distribuição / Filas", total: 46, bugs_n2: 10, bugs_n1: 2,  nivel: "CRÍTICO",  cor: "#EF4444", delta: -6  },
    { modulo: "Nova Interface",       total: 35, bugs_n2: 5,  bugs_n1: 2,  nivel: "ALTO",     cor: "#F59E0B", delta: +5  },
    { modulo: "Upload / Mídia",       total: 22, bugs_n2: 4,  bugs_n1: 2,  nivel: "ALTO",     cor: "#F59E0B", delta:  0  },
    { modulo: "Permissões / Roles",   total: 17, bugs_n2: 3,  bugs_n1: 0,  nivel: "MÉDIO",    cor: "#F97316", delta: +1  },
    { modulo: "WebSocket / Presença", total: 12, bugs_n2: 1,  bugs_n1: 1,  nivel: "MÉDIO",    cor: "#F97316", delta: -3  },
    { modulo: "CRM / Integrações",    total: 12, bugs_n2: 2,  bugs_n1: 1,  nivel: "MÉDIO",    cor: "#F97316", delta: -10 },
    { modulo: "Autenticação",         total: 11, bugs_n2: 0,  bugs_n1: 0,  nivel: "MÉDIO",    cor: "#F97316", delta: -2  },
    { modulo: "Contatos",             total: 2,  bugs_n2: 1,  bugs_n1: 0,  nivel: "ESTÁVEL",  cor: "#22C55E", delta: -9  }
  ],

  // ── SERVIÇOS SOB PRESSÃO ─────────────────────────────────
  // Para cada serviço: o que é, quantos bugs, quais módulos, qual a confiança
  servicos: [
    {
      nome: "polichat-web-app",
      apelido: "Backend de Mensagens",
      descricao: "Processa TODAS as mensagens enviadas e recebidas na plataforma. Se quebra, ninguém consegue se comunicar.",
      risco: "CRÍTICO",
      cor: "#EF4444",
      bugs_atribuidos: 12,
      modulos: ["Chat / Mensagens", "Canais", "Upload / Mídia"],
      confianca: "Alta",
      icone: "📨",
      sinais: ["8 bugs N2 de mensagens", "4 PRs mesclados esta semana", "3 autores diferentes"]
    },
    {
      nome: "dispatch-service",
      apelido: "Motor de Distribuição",
      descricao: "Decide qual atendente recebe cada conversa. Quando falha, chats ficam presos sem atendente.",
      risco: "CRÍTICO",
      cor: "#EF4444",
      bugs_atribuidos: 10,
      modulos: ["Distribuição / Filas"],
      confianca: "Alta",
      icone: "🎯",
      sinais: ["10 bugs N2 confirmados", "86 dias sem fix no bug mais antigo", "9.766 falhas registradas em produção"]
    },
    {
      nome: "waba-webhook",
      apelido: "Integração WhatsApp",
      descricao: "Recebe e envia mensagens via WhatsApp Business. Falhas aqui bloqueiam o canal principal da plataforma.",
      risco: "ALTO",
      cor: "#F59E0B",
      bugs_atribuidos: 6,
      modulos: ["Canais / WhatsApp", "Chat / Mensagens"],
      confianca: "Média",
      icone: "💬",
      sinais: ["5 bugs de entrega (ACK 0)", "Contatos @lid sem número vinculado", "Janela 24h WABA frequentemente violada"]
    },
    {
      nome: "omnispa",
      apelido: "Nova Interface",
      descricao: "Frontend da nova interface de atendimento. Erros aqui afetam a experiência de todos os operadores.",
      risco: "ALTO",
      cor: "#F59E0B",
      bugs_atribuidos: 7,
      modulos: ["Nova Interface"],
      confianca: "Alta",
      icone: "🖥️",
      sinais: ["3.433 usuários afetados por erro 404", "Novo erro escalando desde ontem (TypeError plugin)", "5 bugs N2 sem correção há 35+ dias"]
    },
    {
      nome: "channel-customer",
      apelido: "Orquestrador de Canais",
      descricao: "Gerencia a conexão com todos os canais (Instagram, WhatsApp, Badge Leads). Falha = canal desconectado.",
      risco: "MÉDIO",
      cor: "#F97316",
      bugs_atribuidos: 4,
      modulos: ["Canais / WhatsApp"],
      confianca: "Média",
      icone: "📡",
      sinais: ["Instagram desconectado (SM-5383)", "Badge Leads sem envio (SM-5412)", "ReferenceError em runtime detectado"]
    }
  ],

  // ── DRILLDOWN DOS 3 MÓDULOS CRÍTICOS ─────────────────────
  drilldown: [
    {
      modulo: "Chat / Mensagens",
      score: 71,
      nivel: "CRÍTICO",
      cor: "#EF4444",
      resumo_gerencial: "15 clientes abriram chamados sobre mensagens. O padrão das falhas — atrasos de 20-30 minutos, mensagens que somem, impossibilidade de responder — aponta principalmente para o backend de mensagens (polichat-web-app).",
      total_reclamacoes: 15,
      bugs_confirmados: 8,
      dias_maior_bug: 63,
      servico_principal: { nome: "polichat-web-app", bugs: 7, cor: "#EF4444" },
      servico_secundario: { nome: "foundation-spa (SPA)", bugs: 3, cor: "#F59E0B" },
      clusters: [
        { sintoma: "Mensagens atrasadas ou não entregues", qtd: 6, servico: "polichat-web-app", urgencia: "🔴" },
        { sintoma: "Status da mensagem errado (ícone de ⏳ permanente)", qtd: 3, servico: "foundation-spa", urgencia: "🟡" },
        { sintoma: "Impossível enviar mensagem", qtd: 5, servico: "polichat-web-app", urgencia: "🔴" },
        { sintoma: "Filtros e notificações com falha", qtd: 4, servico: "foundation-spa", urgencia: "🟡" }
      ],
      em_desenvolvimento: "DEV4-4078 está corrigindo o status da mensagem (ícone ⏳) — cobre apenas 3 dos 15 problemas",
      acao_imediata: "Verificar DEV4-4078 antes do merge · Bloquear feature de agendamentos (DEV4-4229) que adiciona complexidade sobre área quebrada"
    },
    {
      modulo: "Canais / WhatsApp",
      score: 50,
      nivel: "CRÍTICO",
      cor: "#EF4444",
      resumo_gerencial: "12 clientes com problemas em canais: mensagens não chegam, Instagram desconectado, templates não funcionam. A maioria aponta para o integrador de canais e o webhook do WhatsApp — sem nenhuma correção em andamento.",
      total_reclamacoes: 12,
      bugs_confirmados: 9,
      dias_maior_bug: 62,
      servico_principal: { nome: "waba-webhook", bugs: 5, cor: "#EF4444" },
      servico_secundario: { nome: "channel-customer", bugs: 4, cor: "#F59E0B" },
      clusters: [
        { sintoma: "Falha de entrega via WhatsApp (ACK 0)", qtd: 5, servico: "waba-webhook", urgencia: "🔴" },
        { sintoma: "Canal Instagram / Badge Leads desconectado", qtd: 4, servico: "channel-customer", urgencia: "🔴" },
        { sintoma: "Templates WABA não aparecem ou não enviam", qtd: 3, servico: "waba-webhook", urgencia: "🟡" }
      ],
      em_desenvolvimento: "DEV4-4023 está criando nova estrutura de verificação WABA/Meta — mas não corrige nenhum dos 9 bugs existentes",
      acao_imediata: "Testar todos os canais após cada deploy · Criar correção urgente para falha de entrega (ACK 0) nos contatos @lid"
    },
    {
      modulo: "Distribuição / Filas",
      score: 46,
      nivel: "CRÍTICO",
      cor: "#EF4444",
      resumo_gerencial: "12 clientes com chats que não chegam ao atendente correto. 10 bugs confirmados pelo N2, nenhum com correção planejada. O bug mais antigo tem 87 dias — uma falha crônica que continua gerando reclamações diárias.",
      total_reclamacoes: 12,
      bugs_confirmados: 10,
      dias_maior_bug: 87,
      servico_principal: { nome: "dispatch-service", bugs: 10, cor: "#EF4444" },
      servico_secundario: { nome: "polichat-web-app", bugs: 2, cor: "#F59E0B" },
      clusters: [
        { sintoma: "Chats presos sem atendente", qtd: 3, servico: "dispatch-service", urgencia: "🔴" },
        { sintoma: "Bot não direciona para atendente", qtd: 7, servico: "dispatch-service", urgencia: "🔴" },
        { sintoma: "Encaminhamento entre filas falha", qtd: 2, servico: "dispatch-service", urgencia: "🟡" }
      ],
      em_desenvolvimento: "Nenhuma correção em desenvolvimento. Único card planejado é uma feature nova (tela de gestão) — sobre motor já quebrado",
      acao_imediata: "Criar sprint dedicado de correções de distribuição · Bloquear novas features até ao menos 3 bugs serem resolvidos"
    }
  ],

  // ── COBERTURA: PRESSÃO vs ATENÇÃO DO DEV ─────────────────
  cobertura: [
    { modulo: "Distribuição / Filas",  pressao: 39, atencao: 0,  zona: "Negligenciada" },
    { modulo: "Upload / Mídia",        pressao: 19, atencao: 0,  zona: "Negligenciada" },
    { modulo: "Permissões / Roles",    pressao: 13, atencao: 0,  zona: "Negligenciada" },
    { modulo: "Chat / Mensagens",      pressao: 58, atencao: 5,  zona: "Subatendida"   },
    { modulo: "Canais / WhatsApp",     pressao: 42, atencao: 1,  zona: "Subatendida"   },
    { modulo: "Nova Interface",        pressao: 29, atencao: 1,  zona: "Subatendida"   }
  ],

  // ── TOP 3 BOMBAS ─────────────────────────────────────────
  bombas: [
    {
      pos: 1, score: 85,
      modulo: "Chat / Mensagens",
      cor: "#EF4444",
      situacao: "Existe 1 correção em andamento, mas ela cobre apenas 1 dos 8 bugs confirmados. Ao mesmo tempo, uma nova funcionalidade está sendo desenvolvida na mesma área — se entrar antes da correção, pode piorar o problema.",
      gatilho: "Deploy da nova feature de agendamentos (DEV4-4229) antes da correção de status (DEV4-4078) estabilizar",
      impacto: "Clientes continuarão vendo mensagens presas. O deploy pode criar falsa sensação de resolução.",
      acao: "Bloquear DEV4-4229 · Testar DEV4-4078 antes do merge"
    },
    {
      pos: 2, score: 57,
      modulo: "Canais / WhatsApp",
      cor: "#F59E0B",
      situacao: "Uma nova funcionalidade de verificação do WhatsApp Business está sendo desenvolvida por cima de 9 bugs não corrigidos. Qualquer falha durante o processo de verificação pode parecer problema de compliance.",
      gatilho: "Deploy da verificação WABA (DEV4-4023) sem testar os canais existentes",
      impacto: "Clientes podem perder acesso ao canal WhatsApp durante o processo de verificação.",
      acao: "Testar WABA · Instagram · Badge Leads antes de qualquer deploy do módulo"
    },
    {
      pos: 3, score: 49,
      modulo: "Distribuição / Filas",
      cor: "#F97316",
      situacao: "87 dias sem correção no bug mais antigo da plataforma. Nenhuma correção planejada. Uma nova tela de gestão de chats está sendo desenhada — mas o motor de distribuição que ela vai gerenciar está quebrado.",
      gatilho: "Desenvolvimento da tela de gestão (DEV4-4003) sem primeiro corrigir os bugs do motor",
      impacto: "Gestores vão ter uma tela nova para gerenciar chats que continuarão sendo mal distribuídos.",
      acao: "Sprint de correções de distribuição · Bloquear feature até bugs críticos resolvidos"
    }
  ],

  // ── ALERTAS SENTRY (erros silenciosos em produção) ───────
  sentry: [
    { erro: "Recurso não encontrado (404)",     projeto: "Nova Interface",   usuarios: 3433, status: "Crônico",   oculto: true,  desde: "05/Mai" },
    { erro: "Encoder de mídia quebrado",         projeto: "Chat (legado)",    usuarios: 1817, status: "Crônico",   oculto: true,  desde: "14/Mai" },
    { erro: "Sessão expirada (401)",             projeto: "Chat (legado)",    usuarios: 1326, status: "Crônico",   oculto: true,  desde: "14/Mai" },
    { erro: "Erro não identificado",             projeto: "Chat (legado)",    usuarios: 949,  status: "Crônico",   oculto: true,  desde: "14/Mai" },
    { erro: "Conexão instável (Network Error)",  projeto: "Nova Interface",   usuarios: 806,  status: "Crônico",   oculto: true,  desde: "05/Mai" },
    { erro: "Acesso negado (403)",               projeto: "API Revendedores", usuarios: 416,  status: "Crônico",   oculto: false, desde: "14/Mai" },
    { erro: "Plugin não carregado",              projeto: "Nova Interface",   usuarios: 49,   status: "ESCALANDO", oculto: true,  desde: "27/Mai" }
  ],

  // ── AÇÕES ─────────────────────────────────────────────────
  acoes: [
    { prioridade: "P0 — HOJE",         cor: "red",    modulo: "Chat",          acao: "Testar e aprovar DEV4-4078 (correção de status de mensagem) antes de qualquer merge",         prazo: "Hoje" },
    { prioridade: "P0 — HOJE",         cor: "red",    modulo: "Nova Interface", acao: "Investigar erro 'plugin não carregado' escalando no omnispa — correlacionar com deploy de ontem", prazo: "Hoje" },
    { prioridade: "P0 — HOJE",         cor: "red",    modulo: "Permissões",    acao: "Criar tarefa de correção urgente para SM-3211 (operador acessa chats de outros — 57 dias)",   prazo: "Hoje" },
    { prioridade: "P1 — ESTA SEMANA",  cor: "orange", modulo: "Chat",          acao: "Bloquear feature de agendamentos (DEV4-4229) até correção de status estar estável 48h",       prazo: "Esta semana" },
    { prioridade: "P1 — ESTA SEMANA",  cor: "orange", modulo: "Distribuição",  acao: "Criar sprint de correções: chats presos (SM-5918) + bot não direciona (SM-5716)",             prazo: "Esta semana" },
    { prioridade: "P1 — ESTA SEMANA",  cor: "orange", modulo: "Canais",        acao: "Testar todos os canais ativos após cada deploy na área de WhatsApp/WABA",                     prazo: "Esta semana" },
    { prioridade: "P2 — PRÓX. SPRINT", cor: "amber",  modulo: "Upload",        acao: "Criar correção para bug de PDF que afeta clientes há 85 dias (SM-2091)",                      prazo: "Próx. sprint" },
    { prioridade: "P2 — PRÓX. SPRINT", cor: "amber",  modulo: "Distribuição",  acao: "Bloquear nova tela de gestão de chats (DEV4-4003) até motor de distribuição corrigido",       prazo: "Próx. sprint" }
  ]
};
