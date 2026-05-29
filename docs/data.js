// ============================================================
//  ARGOS PREDICT — DATA FILE
//  Atualizado semanalmente pelo comando /argos-predict
//  Última geração: 2026-05-28
//  Nota: tickets "Em Triagem" (N2) excluídos — nenhum foi
//  atualizado nos últimos 24+ dias. Análise baseada apenas em
//  sinais ativos: N1 (bugs abertos), Sentry e Code Churn.
// ============================================================
const REPORT = {
  meta: {
    geradoEm: "28 de Maio de 2026",
    janela: "14 dias",
    resumo: "4 módulos com sinais ativos · 18 bugs N1 abertos · 7 erros silenciosos em produção"
  },

  // ── KPIs ────────────────────────────────────────────────
  kpis: [
    { label: "Bugs ativos (clientes)",       valor: "18",    cor: "red",    icone: "🐛", detalhe: "Bugs abertos no suporte nos últimos 14 dias — sinais frescos" },
    { label: "Usuários afetados em produção", valor: "3.433+",cor: "red",    icone: "🔴", detalhe: "Erro 404 no omnispa — sem ticket correspondente no suporte" },
    { label: "Erros sem ticket de suporte",   valor: "7",     cor: "red",    icone: "⚠️", detalhe: "Sentry mostra erros reais que o suporte ainda não escalou" },
    { label: "Módulos com sinais ativos",     valor: "4",     cor: "orange", icone: "📍", detalhe: "Chat · Nova Interface · Canais · Distribuição" },
    { label: "Correções em desenvolvimento",  valor: "1",     cor: "amber",  icone: "🔧", detalhe: "DEV4-4078 — status de mensagem (⏳ permanente)" },
    { label: "Features sobre áreas com bugs", valor: "2",     cor: "orange", icone: "🚧", detalhe: "Funcionalidades em dev tocando áreas com bugs ativos" },
    { label: "Serviços em alerta",            valor: "5",     cor: "red",    icone: "⚡", detalhe: "polichat-web-app · omnispa · dispatch · waba-webhook · channel-customer" },
    { label: "Erro escalando agora",          valor: "1",     cor: "red",    icone: "📈", detalhe: "OMNISPA-2QCV — TypeError plugin, nasceu ontem, 49 usuários e subindo" }
  ],

  // ── RANKING (apenas sinais ativos — N2 excluído) ────────
  ranking: [
    {
      modulo: "Chat / Mensagens", total: 42, bugs_n1: 7, nivel: "ALTO", cor: "#EF4444", delta: +3,
      bugs_cards: [
        { id:"SM-7544", titulo:"Erro no envio de mensagens na Polichat",                tipo:"N1 Bug" },
        { id:"SM-7518", titulo:"Mensagens não aparecem no chat — atualização manual",   tipo:"N1 Bug" },
        { id:"SM-7519", titulo:"Atendente não consegue enviar após resposta a template",tipo:"N1 Bug" },
        { id:"SM-7574", titulo:"Mensagens não chegam no tablet — dois números",         tipo:"N1 Bug" },
        { id:"SM-7539", titulo:"Não consegue responder — possível restrição Meta",     tipo:"N1 Bug" },
        { id:"SM-7528", titulo:"Cliente sem atendimento — problema recorrente",         tipo:"N1 Bug" },
        { id:"SM-7498", titulo:"Emojis aparecem automaticamente nas mensagens enviadas",tipo:"N1 Bug" },
        { id:"SM-7582", titulo:"Erro 500 na rota GET /accounts/{uuid}/messages",        tipo:"N1 Bug" }
      ]
    },
    {
      modulo: "Nova Interface", total: 22, bugs_n1: 2, nivel: "MÉDIO", cor: "#F59E0B", delta: +5,
      bugs_cards: [
        { id:"SM-7496", titulo:"Extensão parou de funcionar após atualização da nova interface", tipo:"N1 Bug" },
        { id:"SM-7527", titulo:"Atalhos utilizando Ctrl não estão funcionando na plataforma",    tipo:"N1 Bug" }
      ]
    },
    {
      modulo: "Canais / WhatsApp", total: 22, bugs_n1: 2, nivel: "MÉDIO", cor: "#F59E0B", delta: +3,
      bugs_cards: [
        { id:"SM-7588", titulo:"Erro ao configurar canal do Instagram",              tipo:"N1 Bug" },
        { id:"SM-7532", titulo:"Template aprovado e vinculado ao canal não aparece", tipo:"N1 Bug" }
      ]
    },
    {
      modulo: "Distribuição / Filas", total: 13, bugs_n1: 2, nivel: "ATENÇÃO", cor: "#F97316", delta: -6,
      bugs_cards: [
        { id:"SM-7592", titulo:"Bot não fez direcionamento para atendente",        tipo:"N1 Bug" },
        { id:"SM-7569", titulo:"Chat preso — mensagens não distribuídas após bot", tipo:"N1 Bug" }
      ]
    },
    {
      modulo: "Upload / Mídia", total: 11, bugs_n1: 2, nivel: "ATENÇÃO", cor: "#F97316", delta: 0,
      bugs_cards: [
        { id:"SM-7520", titulo:"Envio de arquivos instável na plataforma",           tipo:"N1 Bug" },
        { id:"SM-7503", titulo:"PDF não aparece na plataforma (interface antiga e nova)", tipo:"N1 Bug" }
      ]
    },
    {
      modulo: "Autenticação", total: 11, bugs_n1: 0, nivel: "ATENÇÃO", cor: "#F97316", delta: -2,
      bugs_cards: []
    },
    {
      modulo: "Permissões / Roles", total: 8, bugs_n1: 0, nivel: "ATENÇÃO", cor: "#F97316", delta: +1,
      bugs_cards: []
    },
    {
      modulo: "CRM / Integrações", total: 8, bugs_n1: 1, nivel: "ATENÇÃO", cor: "#F97316", delta: -10,
      bugs_cards: [
        { id:"SM-7567", titulo:"Webhook não recebe eventos mesmo com configuração correta", tipo:"N1 Bug" }
      ]
    },
    {
      modulo: "WebSocket / Presença", total: 8, bugs_n1: 1, nivel: "ATENÇÃO", cor: "#F97316", delta: -3,
      bugs_cards: [
        { id:"SM-7511", titulo:"Novas mensagens não notificam o atendente", tipo:"N1 Bug" }
      ]
    },
    {
      modulo: "Jarvis / IA", total: 2, bugs_n1: 0, nivel: "ESTÁVEL", cor: "#22C55E", delta: -5,
      bugs_cards: []
    },
    {
      modulo: "Contatos", total: 0, bugs_n1: 0, nivel: "ESTÁVEL", cor: "#22C55E", delta: -9,
      bugs_cards: []
    }
  ],

  // ── DRILLDOWN DOS 3 MÓDULOS COM MAIS SINAIS ──────────────
  drilldown: [
    {
      modulo: "Chat / Mensagens",
      score: 42,
      nivel: "ALTO",
      cor: "#EF4444",
      resumo_gerencial: "7 bugs abertos hoje por clientes e 2 erros sérios em produção — encoder de mídia quebrando para 1.817 usuários e erros não capturados afetando 949. O padrão de falhas (atraso, mensagens que somem, impossibilidade de responder) aponta para o backend principal (polichat-web-app) e a nova interface (foundation-spa).",
      total_reclamacoes: 7,
      bugs_confirmados: 7,
      dias_sentry: 14,
      servico_principal: { nome: "polichat-web-app", bugs: 6, cor: "#EF4444" },
      servico_secundario: { nome: "foundation-spa", bugs: 2, cor: "#F59E0B" },
      clusters: [
        { sintoma: "Mensagens atrasadas ou não entregues",             qtd: 3, servico: "polichat-web-app", urgencia: "🔴" },
        { sintoma: "Impossível enviar mensagem",                       qtd: 3, servico: "polichat-web-app", urgencia: "🔴" },
        { sintoma: "Status da mensagem errado (ícone ⏳ permanente)", qtd: 2, servico: "foundation-spa",   urgencia: "🟡" },
        { sintoma: "Notificações e filtros com falha",                 qtd: 2, servico: "foundation-spa",   urgencia: "🟡" }
      ],
      em_desenvolvimento: "DEV4-4078 corrige o status da mensagem (⏳ permanente) — cobre parte dos problemas do foundation-spa",
      acao_imediata: "Validar DEV4-4078 antes do merge · Bloquear DEV4-4229 (agendamentos) até DEV4-4078 estável"
    },
    {
      modulo: "Nova Interface",
      score: 22,
      nivel: "MÉDIO",
      cor: "#F59E0B",
      resumo_gerencial: "2 bugs abertos por clientes hoje, mas o Sentry conta uma história muito maior: 3.433 usuários afetados por um erro 404 crônico e um novo erro de plugin que nasceu ontem e está escalando. São problemas que os clientes ainda não escalaram formalmente, mas que já impactam em escala.",
      total_reclamacoes: 2,
      bugs_confirmados: 2,
      dias_sentry: 23,
      servico_principal: { nome: "foundation-spa", bugs: 7, cor: "#EF4444" },
      servico_secundario: null,
      clusters: [
        { sintoma: "Erro 404 crônico (sem ticket no suporte)",            qtd: 1, servico: "omnispa", urgencia: "🔴" },
        { sintoma: "TypeError plugin escalando (surgiu ontem)",           qtd: 1, servico: "omnispa", urgencia: "🔴" },
        { sintoma: "Extensões e atalhos quebrados após atualização",      qtd: 2, servico: "omnispa", urgencia: "🟡" }
      ],
      em_desenvolvimento: "DEV4-4158 (showcase Design System) e PR1493 (migração Iterup) — PR1493 pode ter causado o TypeError plugin",
      acao_imediata: "Investigar se PR1493 causou o TypeError plugin escalando · Bloquear DEV4-4166 (Nova Estrutura de Páginas) até spike concluído"
    },
    {
      modulo: "Canais / WhatsApp",
      score: 22,
      nivel: "MÉDIO",
      cor: "#F59E0B",
      resumo_gerencial: "2 bugs abertos hoje — erro ao configurar Instagram e template aprovado que não aparece. O mais preocupante é o que está sendo desenvolvido por cima: DEV4-4023 (estrutura de verificação WABA/Meta) está ativo sobre uma área que ainda tem problemas de entrega não resolvidos.",
      total_reclamacoes: 2,
      bugs_confirmados: 2,
      dias_sentry: 14,
      servico_principal: { nome: "channel-customer", bugs: 1, cor: "#F59E0B" },
      servico_secundario: { nome: "waba-webhook", bugs: 1, cor: "#F97316" },
      clusters: [
        { sintoma: "Canal Instagram com erro de configuração",     qtd: 1, servico: "channel-customer", urgencia: "🟡" },
        { sintoma: "Template aprovado não aparece para uso",        qtd: 1, servico: "waba-webhook",     urgencia: "🟡" }
      ],
      em_desenvolvimento: "DEV4-4023 (PLBV — ciclo de vida da verificação Meta) em desenvolvimento ativo",
      acao_imediata: "Testar todos os canais após qualquer merge em Canais · Criar correção para Instagram antes de DEV4-4023 entrar"
    }
  ],

  // ── COBERTURA (pressão vs atenção do dev) ────────────────
  cobertura: [
    {
      modulo: "Upload / Mídia", pressao: 8, atencao: 0, zona: "Negligenciada",
      bugs_cards: [
        { id:"SM-7520", titulo:"Envio de arquivos instável na plataforma",                    tipo:"N1 Bug" },
        { id:"SM-7503", titulo:"PDF não aparece na plataforma (interface antiga e nova)",      tipo:"N1 Bug" }
      ],
      dev_cards: []
    },
    {
      modulo: "Permissões / Roles", pressao: 4, atencao: 0, zona: "Negligenciada",
      bugs_cards: [
        { id:"REVENDEDOR-API-Y", titulo:"Exception 403 Forbidden — 416 usuários | Sentry crônico", tipo:"🚨 Sentry" }
      ],
      dev_cards: []
    },
    {
      modulo: "Chat / Mensagens", pressao: 29, atencao: 5, zona: "Subatendida",
      bugs_cards: [
        { id:"SM-7544", titulo:"Erro no envio de mensagens na Polichat",                tipo:"N1 Bug" },
        { id:"SM-7518", titulo:"Mensagens não aparecem no chat — atualização manual",   tipo:"N1 Bug" },
        { id:"SM-7519", titulo:"Atendente não consegue enviar após resposta a template",tipo:"N1 Bug" },
        { id:"SM-7574", titulo:"Mensagens não chegam no tablet — dois números",         tipo:"N1 Bug" },
        { id:"SM-7539", titulo:"Não consegue responder — possível restrição Meta",     tipo:"N1 Bug" },
        { id:"SM-7528", titulo:"Cliente sem atendimento — problema recorrente",         tipo:"N1 Bug" },
        { id:"SM-7498", titulo:"Emojis aparecem automaticamente nas mensagens",         tipo:"N1 Bug" },
        { id:"SM-7582", titulo:"Erro 500 na rota GET /accounts/{uuid}/messages",        tipo:"N1 Bug" },
        { id:"POLICHAT-SPA-CZ", titulo:"Mime encoder quebrado — 1.817 usuários | Sentry crônico", tipo:"🚨 Sentry" }
      ],
      dev_cards: [
        { id:"DEV4-4078", titulo:"[Corretivo] Status de envio não atualiza — ícone ⏳ permanente", tipo:"Em Dev (Highest!)" },
        { id:"DEV4-4229", titulo:"Mensagens agendadas — Filtros, edição e criação",               tipo:"Em Dev ⚠️ área instável" },
        { id:"PR#1495",   titulo:"fix: Atualiza ACK das mensagens no cache (DEV4-4233)", tipo:"PR", repo:"SPA" },
        { id:"PR#1488",   titulo:"feat: Lista global de mensagens front (DEV4-4114)",    tipo:"PR", repo:"SPA" },
        { id:"PR#1492",   titulo:"fix: Enter envia mensagem em template com variável",   tipo:"PR", repo:"SPA" },
        { id:"PR#304",    titulo:"feat: template flow API",                               tipo:"PR", repo:"polichat-web-app" },
        { id:"PR#299",    titulo:"fix: normalizar JID de grupos WhatsApp",                tipo:"PR", repo:"polichat-web-app" }
      ]
    },
    {
      modulo: "Nova Interface", pressao: 16, atencao: 1, zona: "Subatendida",
      bugs_cards: [
        { id:"SM-7496",      titulo:"Extensão parou de funcionar após atualização",         tipo:"N1 Bug"  },
        { id:"SM-7527",      titulo:"Atalhos Ctrl não estão funcionando",                   tipo:"N1 Bug"  },
        { id:"OMNISPA-1ZWW", titulo:"AxiosError 404 — 3.433 usuários | crônico 05/Mai",    tipo:"🚨 Sentry"},
        { id:"OMNISPA-2QCV", titulo:"TypeError: plugin undefined — ESCALANDO | 49 usuários",tipo:"🚨 Sentry"},
        { id:"OMNISPA-20VC", titulo:"Network Error — 806 usuários",                         tipo:"🚨 Sentry"},
        { id:"OMNISPA-2NFQ", titulo:"AxiosError 401 refreshToken — 133 usuários",           tipo:"🚨 Sentry"}
      ],
      dev_cards: [
        { id:"PR#1493",   titulo:"feat: Migração da Iterup para nova interface",         tipo:"PR ⚠️ suspeito do TypeError plugin", repo:"SPA" },
        { id:"DEV4-4158", titulo:"Showcase — Galeria de componentes do Design System",  tipo:"Card em Dev"       },
        { id:"DEV4-4166", titulo:"Nova Estrutura de Páginas (Epic) — BLOQUEADO até spike",tipo:"Pronto para Dev" },
        { id:"DEV4-4202", titulo:"Novas contas indexadas na Nova Interface por padrão", tipo:"Aguardando Handoff"}
      ]
    },
    {
      modulo: "Canais / WhatsApp", pressao: 14, atencao: 1, zona: "Subatendida",
      bugs_cards: [
        { id:"SM-7588", titulo:"Erro ao configurar canal do Instagram",             tipo:"N1 Bug" },
        { id:"SM-7532", titulo:"Template aprovado e vinculado não aparece para uso",tipo:"N1 Bug" }
      ],
      dev_cards: [
        { id:"DEV4-4023", titulo:"Estrutura base do PLBV — ciclo de vida da verificação Meta", tipo:"Em Dev ⚠️ área com bugs" },
        { id:"DEV4-4040", titulo:"Sincronização de status via webhooks da Meta",               tipo:"Aguardando Handoff" },
        { id:"DEV4-4044", titulo:"Integração PLBV com a Meta (self-certify API)",             tipo:"Aguardando Handoff" },
        { id:"PR#304",    titulo:"feat: template flow API",                                    tipo:"PR", repo:"polichat-web-app" },
        { id:"PR#299",    titulo:"fix: normalizar JID de grupos WhatsApp",                     tipo:"PR", repo:"polichat-web-app" }
      ]
    },
    {
      modulo: "Distribuição / Filas", pressao: 6, atencao: 1, zona: "Subatendida",
      bugs_cards: [
        { id:"SM-7592", titulo:"Bot não fez direcionamento para atendente",        tipo:"N1 Bug" },
        { id:"SM-7569", titulo:"Chat preso — mensagens não distribuídas após bot", tipo:"N1 Bug" }
      ],
      dev_cards: [
        { id:"PR#1123",   titulo:"fix: DistributeChatAction — impacto nos bugs incerto", tipo:"PR", repo:"foundation-api" },
        { id:"DEV4-4003", titulo:"Tela de Gestão de Chats (feature — não corretivo)",   tipo:"Pronto para Dev ⚠️" },
        { id:"DEV4-3446", titulo:"Fechamento automático de chats por inatividade",       tipo:"Aguardando Handoff" }
      ]
    }
  ],

  // ── SERVIÇOS SOB PRESSÃO ─────────────────────────────────
  // Nomes canônicos validados na KB (Arquitetura/01-visao-geral.md)
  servicos: [
    {
      nome: "polichat-web-app",
      apelido: "Backend Legado (mensageria)",
      descricao: "Pipeline principal de toda mensageria: webhooks, inbound/outbound, ACKs, automações. AINDA é o coração operacional — foundation-api não substitui este fluxo.",
      risco: "CRÍTICO", cor: "#EF4444", bugs_atribuidos: 6, icone: "📨",
      modulos: ["Chat / Mensagens", "Upload / Mídia"],
      confianca: "Alta",
      sinais: ["6 bugs N1 abertos hoje", "4 PRs mesclados esta semana (3 autores)", "Sentry: mime encoder (1.817 usuários)"],
      alias: ["backend-legado"]
    },
    {
      nome: "foundation-spa",
      apelido: "Interface Moderna (SPA)",
      descricao: "Frontend moderno de atendimento (React 18 + Vite). Repo: poli-digital/SPA. Sentry registra erros como projeto 'omnispa'.",
      risco: "CRÍTICO", cor: "#EF4444", bugs_atribuidos: 8, icone: "🖥️",
      modulos: ["Nova Interface", "Chat / Mensagens"],
      confianca: "Alta",
      sinais: ["Sentry (omnispa): 3.433 usuários no erro 404 crônico", "TypeError plugin escalando desde ontem (49 usuários)", "2 bugs N1 de extensão e atalhos", "2 bugs N1 de Chat (status mensagem)"],
      alias: ["omnispa", "SPA"]
    },
    {
      nome: "dispatch-service",
      apelido: "Motor de Distribuição",
      descricao: "Algoritmo de distribuição de chats (NestJS). Decide qual User/Team atende cada Chat. Usa Redis lock para geração de LID.",
      risco: "ALTO", cor: "#F59E0B", bugs_atribuidos: 2, icone: "🎯",
      modulos: ["Distribuição / Filas"],
      confianca: "Alta",
      sinais: ["2 bugs N1 abertos hoje", "PR1123 (fix DistributeChatAction) mesclado — impacto incerto"],
      alias: []
    },
    {
      nome: "waba-webhook",
      apelido: "Integração WhatsApp (legado → hermes)",
      descricao: "Webhook legado da Meta WhatsApp Cloud API. Em transição para o 'hermes' (NestJS/TypeScript) que será o novo gateway WABA.",
      risco: "MÉDIO", cor: "#F97316", bugs_atribuidos: 2, icone: "💬",
      modulos: ["Canais / WhatsApp"],
      confianca: "Média",
      sinais: ["Template aprovado não aparece (SM-7532)", "DEV4-4023 (PLBV) em dev tocando esta camada", "hermes em construção para substituir este serviço"],
      alias: []
    },
    {
      nome: "channel-customer",
      apelido: "Orquestrador de Canais",
      descricao: "Orquestra envio em múltiplos canais (WhatsApp, Instagram, Webchat). Quando falha, canal fica desconectado.",
      risco: "MÉDIO", cor: "#F97316", bugs_atribuidos: 1, icone: "📡",
      modulos: ["Canais / WhatsApp"],
      confianca: "Média",
      sinais: ["Erro ao configurar Instagram (SM-7588)", "Sem card corretivo ativo ou planejado"],
      alias: []
    }
  ],

  // ── RADAR DE SERVIÇOS ────────────────────────────────────
  // ── RADAR DE SERVIÇOS ────────────────────────────────────
  // Campo "bugs" = score ponderado: N1 ticket = 1pt | Sentry >1000 usuários = 3pts |
  //   Sentry 100-1000 = 2pts | Sentry 10-100 = 1pt | Sentry <10 = 0pt
  // Nomes canônicos conforme KB (Arquitetura/01-visao-geral.md)
  servicos_radar: [
    {
      // Legado central de mensageria — Laravel 8
      nome: "polichat-web-app", apelido: "Backend Legado",
      alias: "legado",
      // N1(6×1=6) + Sentry: mime encoder 1817u(+3) + erro não capturado 949u(+2) = 11
      bugs: 11, bugs_n1: 6, bugs_sentry: 5,
      dev_ativo: 5, dev_planejado: 3,
      notas: {
        bugs: "6 N1 + Sentry: mime encoder (1.817u → +3pts) + erro não capturado (949u → +2pts) = 11",
        ativo: "4 PRs mesclados (JID, flows, template API) + DEV4-4229 (agendamentos)",
        planejado: "DEV4-4188, DEV4-4154, DEV4-4227"
      },
      bugs_cards: [
        { id:"SM-7544",           titulo:"Erro no envio de mensagens na Polichat",               tipo:"N1 Bug · 1pt"    },
        { id:"SM-7518",           titulo:"Mensagens não aparecem no chat — atualização manual",   tipo:"N1 Bug · 1pt"    },
        { id:"SM-7519",           titulo:"Atendente não consegue enviar após resposta a template",tipo:"N1 Bug · 1pt"    },
        { id:"SM-7574",           titulo:"Mensagens não chegam no tablet — dois números",         tipo:"N1 Bug · 1pt"    },
        { id:"SM-7539",           titulo:"Não consegue responder — possível restrição Meta",     tipo:"N1 Bug · 1pt"    },
        { id:"SM-7528",           titulo:"Cliente sem atendimento — problema recorrente",         tipo:"N1 Bug · 1pt"    },
        { id:"POLICHAT-SPA-CZ",   titulo:"Mime encoder quebrado — 1.817 usuários afetados",      tipo:"🚨 Sentry · 3pts" },
        { id:"POLICHAT-SPA-E2",   titulo:"Erro não capturado (isCanceled) — 949 usuários",       tipo:"🚨 Sentry · 2pts" }
      ],
      dev_ativo_items: [
        { id:"PR#304",   titulo:"feat: template flow API",                          tipo:"PR", repo:"polichat-web-app" },
        { id:"PR#301",   titulo:"feat: rota v1 para listar flows",                  tipo:"PR", repo:"polichat-web-app" },
        { id:"PR#299",   titulo:"fix: normalizar JID de grupos WhatsApp",           tipo:"PR", repo:"polichat-web-app" },
        { id:"PR#305",   titulo:"fix: verificação de status no banner",             tipo:"PR", repo:"polichat-web-app" },
        { id:"DEV4-4229",titulo:"Mensagens agendadas — Filtros, edição e criação",  tipo:"Card em Dev"                }
      ],
      dev_planejado_items: [
        { id:"DEV4-4188", titulo:"Criar evento 'Atendimento finalizado' para API",  tipo:"Aguardando Handoff" },
        { id:"DEV4-4154", titulo:"Corrigir placeholder de anotações",               tipo:"Pronto para Dev"    },
        { id:"DEV4-4227", titulo:"Remover filtro 'Cliente aguardando'",             tipo:"Pronto para Dev"    }
      ]
    },
    {
      // Frontend moderno — React 18 + Vite — repo: poli-digital/SPA
      // Sentry registra erros deste serviço no projeto "omnispa"
      nome: "foundation-spa", apelido: "Interface Moderna",
      alias: "omnispa · repo: SPA",
      // N1(4×1=4) + Sentry: 404 3433u(+3) + Network 806u(+2) + 401 133u(+2) + plugin 49u(+1) = 12
      bugs: 12, bugs_n1: 4, bugs_sentry: 8,
      dev_ativo: 8, dev_planejado: 6,
      notas: {
        bugs: "4 N1 + Sentry: 404 (3.433u→+3) + Network Error (806u→+2) + 401 (133u→+2) + plugin (49u→+1) = 12",
        ativo: "6 PRs no repo SPA (ACK fix, lista msgs, template, etiquetas, cache) + PR1493 + DEV4-4158",
        planejado: "DEV4-4078 (corretivo), DEV4-4229, DEV4-4166, DEV4-4202, DEV4-4267, DEV4-4225"
      },
      bugs_cards: [
        { id:"SM-7498",      titulo:"Emojis aparecem automaticamente nas mensagens",        tipo:"N1 Bug · 1pt"    },
        { id:"SM-7582",      titulo:"Erro 500 na rota GET /accounts/{uuid}/messages",        tipo:"N1 Bug · 1pt"    },
        { id:"SM-7496",      titulo:"Extensão parou de funcionar após atualização",          tipo:"N1 Bug · 1pt"    },
        { id:"SM-7527",      titulo:"Atalhos Ctrl não estão funcionando",                    tipo:"N1 Bug · 1pt"    },
        { id:"OMNISPA-1ZWW", titulo:"AxiosError 404 — 3.433 usuários afetados",             tipo:"🚨 Sentry · 3pts" },
        { id:"OMNISPA-20VC", titulo:"Network Error — 806 usuários afetados",                 tipo:"🚨 Sentry · 2pts" },
        { id:"OMNISPA-2NFQ", titulo:"AxiosError 401 refreshToken — 133 usuários",            tipo:"🚨 Sentry · 2pts" },
        { id:"OMNISPA-2QCV", titulo:"TypeError: plugin undefined — ESCALANDO | 49 usuários", tipo:"🚨 Sentry · 1pt"  }
      ],
      dev_ativo_items: [
        { id:"PR#1495", titulo:"fix: Atualiza ACK das mensagens no cache (DEV4-4233)", tipo:"PR", repo:"SPA" },
        { id:"PR#1488", titulo:"feat: Lista global de mensagens front (DEV4-4114)",    tipo:"PR", repo:"SPA" },
        { id:"PR#1492", titulo:"fix: Enter envia mensagem em template com variável",   tipo:"PR", repo:"SPA" },
        { id:"PR#1480", titulo:"feat: Construtor de Etiquetas (DEV4-4178)",            tipo:"PR", repo:"SPA" },
        { id:"PR#1476", titulo:"feat: Listagem de templates com bulk delete",          tipo:"PR", repo:"SPA" },
        { id:"PR#1482", titulo:"fix: Restaurar cache compartilhado de contato",        tipo:"PR", repo:"SPA" },
        { id:"PR#1493", titulo:"feat: Migração da Iterup para nova interface",         tipo:"PR", repo:"SPA" },
        { id:"DEV4-4158",titulo:"Showcase — Galeria de componentes do Design System",  tipo:"Card em Dev"    }
      ],
      dev_planejado_items: [
        { id:"DEV4-4078", titulo:"[Corretivo] Status de envio não atualiza — ícone ⏳",tipo:"Em Dev (Highest!)"    },
        { id:"DEV4-4229", titulo:"Mensagens agendadas — Filtros, edição e criação",    tipo:"Em Dev"              },
        { id:"DEV4-4166", titulo:"Nova Estrutura de Páginas na Nova Interface (Epic)", tipo:"Pronto para Dev"     },
        { id:"DEV4-4202", titulo:"Novas contas indexadas na Nova Interface por padrão",tipo:"Aguardando Handoff"  },
        { id:"DEV4-4267", titulo:"Exportação de Conversas (Nova interface)",           tipo:"Aguardando Cenários" },
        { id:"DEV4-4225", titulo:"Configurações: Ações críticas (Nova interface)",     tipo:"Aguardando Cenários" }
      ]
    },
    {
      // Distribuição de chats — NestJS — usa Redis lock para LID
      nome: "dispatch-service", apelido: "Distribuição",
      alias: "dispatch",
      // N1(2×1=2) + Sentry erros de background (0 usuários → 0pts) = 2
      bugs: 2, bugs_n1: 2, bugs_sentry: 0,
      dev_ativo: 1, dev_planejado: 2,
      notas: {
        bugs: "2 N1 + Sentry erros de background (0 usuários → 0pts) = 2",
        ativo: "PR1123 (fix DistributeChatAction no foundation-api) — impacto incerto",
        planejado: "DEV4-4003 (tela gestão — feature), DEV4-3446 (inatividade — feature)"
      },
      bugs_cards: [
        { id:"SM-7592", titulo:"Bot não fez direcionamento para atendente",        tipo:"N1 Bug" },
        { id:"SM-7569", titulo:"Chat preso — mensagens não distribuídas após bot", tipo:"N1 Bug" }
      ],
      dev_ativo_items: [
        { id:"PR#1123", titulo:"fix: DistributeChatAction", tipo:"PR", repo:"FoundationAPI (foundation-api)" }
      ],
      dev_planejado_items: [
        { id:"DEV4-4003", titulo:"Tela de Gestão de Chats para Gestor e Supervisor", tipo:"Pronto para Dev"    },
        { id:"DEV4-3446", titulo:"Fechamento automático de chats por inatividade",   tipo:"Aguardando Handoff" }
      ]
    },
    {
      // Webhook legado WABA — em transição para o "hermes" (NestJS/TypeScript)
      nome: "waba-webhook", apelido: "WhatsApp API (→ hermes)",
      alias: "legado WABA · sendo substituído por hermes",
      // N1(2×1=2) + sem Sentry confirmado = 2
      bugs: 2, bugs_n1: 2, bugs_sentry: 0,
      dev_ativo: 1, dev_planejado: 5,
      notas: {
        bugs: "2 bugs N1: template não aparece, restrição Meta",
        ativo: "DEV4-4023 (PLBV — estrutura de verificação Meta)",
        planejado: "DEV4-4040, DEV4-4044, DEV4-4031, DEV4-4043, DEV4-4198 (todos tocam waba-webhook ou hermes)"
      },
      bugs_cards: [
        { id:"SM-7532", titulo:"Template aprovado e vinculado não aparece para uso", tipo:"N1 Bug" },
        { id:"SM-7539", titulo:"Não consegue responder — possível restrição Meta",  tipo:"N1 Bug" }
      ],
      dev_ativo_items: [
        { id:"DEV4-4023", titulo:"Estrutura base do PLBV — estados e ciclo de vida da verificação", tipo:"Card em Dev" }
      ],
      dev_planejado_items: [
        { id:"DEV4-4040", titulo:"Sincronização de status via webhooks da Meta",            tipo:"Aguardando Handoff" },
        { id:"DEV4-4044", titulo:"Integração PLBV com a Meta (self-certify API)",           tipo:"Aguardando Handoff" },
        { id:"DEV4-4031", titulo:"Desbloqueio/bloqueio automático com base no status PLBV", tipo:"Aguardando Handoff" },
        { id:"DEV4-4043", titulo:"Fluxo interno de compliance — análise e aprovação",       tipo:"Aguardando Handoff" },
        { id:"DEV4-4198", titulo:"Atualizar Embedded Signup para v4.0",                     tipo:"Aguardando Handoff" }
      ]
    },
    {
      // Orquestrador de canais (WhatsApp, Instagram, Webchat)
      nome: "channel-customer", apelido: "Orquestrador de Canais",
      alias: "",
      // N1(1×1=1) + sem Sentry confirmado = 1
      bugs: 1, bugs_n1: 1, bugs_sentry: 0,
      dev_ativo: 0, dev_planejado: 0,
      notas: {
        bugs: "1 bug N1: erro ao configurar Instagram",
        ativo: "Nenhum PR ou card ativo",
        planejado: "Nenhum card no backlog — área negligenciada"
      },
      bugs_cards: [
        { id:"SM-7588", titulo:"Erro ao configurar canal do Instagram", tipo:"N1 Bug" }
      ],
      dev_ativo_items:    [],
      dev_planejado_items: []
    }
  ],

  // ── TOP 3 BOMBAS ─────────────────────────────────────────
  bombas: [
    {
      pos: 1, score: 53, modulo: "Chat / Mensagens", cor: "#EF4444",
      situacao: "1 correção em andamento (DEV4-4078) e 1 feature nova sobre a mesma camada (DEV4-4229). Sentry confirma: 1.817 usuários já afetados pelo encoder de mídia quebrado — sem ticket no suporte ainda.",
      gatilho: "Merge de DEV4-4229 antes de DEV4-4078 estabilizar em produção",
      impacto: "Regressão silenciosa — clientes continuam sem receber mensagens e o dev não vai saber.",
      acao: "Bloquear DEV4-4229 · Testar DEV4-4078 focando em reconexão WebSocket e F5 pós-entrega"
    },
    {
      pos: 2, score: 28, modulo: "Nova Interface", cor: "#F59E0B",
      situacao: "OMNISPA-2QCV (TypeError plugin) surgiu ontem e está escalando — provavelmente causado pelo PR1493 (migração Iterup). Com DEV4-4166 (Nova Estrutura de Páginas) pronto para entrar, o risco de amplificar o problema é alto.",
      gatilho: "Deploy de DEV4-4166 sem investigar o TypeError plugin que está escalando",
      impacto: "Erro de plugin pode afetar todos os usuários da nova interface se escalar mais.",
      acao: "Investigar OMNISPA-2QCV agora · Bloquear DEV4-4166 até conclusão"
    },
    {
      pos: 3, score: 26, modulo: "Canais / WhatsApp", cor: "#F97316",
      situacao: "DEV4-4023 (verificação WABA/Meta) em desenvolvimento sobre uma área com bugs ativos de canal. Qualquer falha durante o fluxo de verificação pode parecer problema de compliance.",
      gatilho: "Deploy de DEV4-4023 sem testar os canais existentes (Instagram, templates)",
      impacto: "Clientes podem perder acesso ao canal WhatsApp durante processo de verificação.",
      acao: "Testar WABA, Instagram e templates antes de qualquer merge do módulo"
    }
  ],

  // ── ALERTAS SENTRY ───────────────────────────────────────
  sentry: [
    { erro: "Recurso não encontrado (404)",    projeto: "Nova Interface",   usuarios: 3433, status: "Crônico",   oculto: true,  desde: "05/Mai" },
    { erro: "Encoder de mídia quebrado",        projeto: "Chat (legado)",    usuarios: 1817, status: "Crônico",   oculto: true,  desde: "14/Mai" },
    { erro: "Sessão expirada (401)",            projeto: "Chat (legado)",    usuarios: 1326, status: "Crônico",   oculto: true,  desde: "14/Mai" },
    { erro: "Erro não identificado",            projeto: "Chat (legado)",    usuarios: 949,  status: "Crônico",   oculto: true,  desde: "14/Mai" },
    { erro: "Conexão instável (Network Error)", projeto: "Nova Interface",   usuarios: 806,  status: "Crônico",   oculto: true,  desde: "05/Mai" },
    { erro: "Acesso negado (403)",              projeto: "API Revendedores", usuarios: 416,  status: "Crônico",   oculto: false, desde: "14/Mai" },
    { erro: "Plugin não carregado",             projeto: "Nova Interface",   usuarios: 49,   status: "ESCALANDO", oculto: true,  desde: "27/Mai" }
  ],

  // ── AJUDA CONTEXTUAL (botão ? por slide) ────────────────
  help: [
    {
      slide: "Visão Geral",
      intro: "Este relatório é gerado automaticamente toda semana cruzando 3 fontes de dados reais.",
      termos: [
        { termo: "Suporte (N1)", def: "Ticket aberto por um cliente diretamente no suporte. Sinal direto de problema percebido." },
        { termo: "Sentry", def: "Sistema que detecta erros em produção automaticamente — mesmo antes do cliente ligar. Como uma câmera de segurança do código." },
        { termo: "Dev / Development", def: "Time de desenvolvimento. Cards = tarefas que eles estão fazendo ou planejando." },
        { termo: "Serviço", def: "Um sistema de software responsável por uma parte da plataforma (ex: o sistema que entrega mensagens, o que autentica usuários, etc.)." }
      ]
    },
    {
      slide: "Indicadores Executivos",
      intro: "Oito números que resumem o estado atual da plataforma.",
      termos: [
        { termo: "Reclamação ativa (N1)", def: "Cliente abriu chamado no suporte nos últimos 14 dias — problema confirmado por quem usa." },
        { termo: "Usuários afetados em produção", def: "Pessoas que encontraram um erro no sistema mas não necessariamente ligaram para o suporte. Detectado automaticamente pelo Sentry." },
        { termo: "Sinal oculto", def: "Erro que o sistema detectou em produção mas o suporte ainda não recebeu como chamado — é uma bomba-relógio." },
        { termo: "Feature sobre área instável", def: "O dev está adicionando funcionalidade nova em uma área que já tem bugs ativos. Risco de piorar." }
      ]
    },
    {
      slide: "Mapa de Risco",
      intro: "Cada barra é uma área da plataforma. Quanto maior, mais urgente. Clique em qualquer barra para ver os chamados abertos.",
      termos: [
        { termo: "Reclamações de clientes (âmbar)", def: "Proporção do score que vem de chamados abertos no suporte." },
        { termo: "Erros em produção + análise técnica (roxo)", def: "Proporção que vem de erros detectados automaticamente (Sentry), fragilidades documentadas e atividade de código." },
        { termo: "Score", def: "Número que representa a urgência: N1 ticket = 1pt · Sentry >1.000 usuários = 3pts · Sentry 100-1.000 = 2pts." },
        { termo: "ALTO / MÉDIO / ATENÇÃO", def: "ALTO = score ≥ 30, precisa de ação esta semana. MÉDIO = score 15-29, monitorar. ATENÇÃO = score < 15, acompanhar." }
      ]
    },
    {
      slide: "Causa Raiz",
      intro: "Para cada área com problemas, tentamos identificar qual sistema específico está causando.",
      termos: [
        { termo: "Confiança da atribuição", def: "Alta = temos prova (erro no Sentry + documentação). Média = evidências parciais. Especulativa = apenas por sintoma." },
        { termo: "Score de problemas", def: "Soma de reclamações de clientes + erros em produção (ponderados por usuários afetados) para aquele serviço." },
        { termo: "Alias / Sentry", def: "O mesmo serviço pode ter nomes diferentes: o nome canônico (técnico), o nome no repositório de código e o nome no sistema de monitoramento." }
      ]
    },
    {
      slide: "Análise Detalhada",
      intro: "Zoom em um módulo específico: qual o problema, qual sistema provavelmente causa, e o que o dev está fazendo.",
      termos: [
        { termo: "Reclamações ativas agora", def: "Chamados abertos pelo suporte nos últimos 14 dias para esta área." },
        { termo: "Serviços suspeitos", def: "Os sistemas mais prováveis de serem a causa raiz. A barra indica a quantidade de sinais apontando para cada um." },
        { termo: "Padrão dos problemas", def: "Os chamados agrupados por tipo de sintoma — para identificar se é um problema pontual ou sistêmico." },
        { termo: "Dev ativo / Planejado", def: "O que o time de desenvolvimento está fazendo agora e o que está na fila para breve." }
      ]
    },
    {
      slide: "Análise Detalhada",
      intro: "Zoom nos canais de comunicação (WhatsApp, Instagram, etc.).",
      termos: [
        { termo: "Canal", def: "Meio pelo qual o cliente se comunica com a empresa (WhatsApp, Instagram, webchat, etc.)." },
        { termo: "waba-webhook", def: "Sistema que processa as mensagens do WhatsApp Business (API oficial da Meta). Falhas aqui impedem envio/recebimento via WhatsApp." },
        { termo: "PLBV / WABA", def: "Verificação de negócio junto à Meta (WhatsApp). Processo necessário para usar recursos avançados do WhatsApp Business." }
      ]
    },
    {
      slide: "Análise Detalhada",
      intro: "Zoom no sistema que decide qual atendente recebe cada conversa.",
      termos: [
        { termo: "Distribuição / Fila", def: "Quando um cliente inicia uma conversa, o sistema decide automaticamente qual atendente vai recebê-la. Falha = conversa sem atendente." },
        { termo: "dispatch-service", def: "Sistema responsável por esta distribuição automática. Usa um mecanismo de bloqueio no Redis para evitar duas pessoas pegando o mesmo cliente." },
        { termo: "Bot / URA", def: "Sistema automático que atende o cliente antes de um humano. Frequentemente o ponto de falha inicial na distribuição." }
      ]
    },
    {
      slide: "Radar de Serviços",
      intro: "Cada ponta do gráfico é um sistema. Quanto maior a área colorida, mais sinais naquele sistema. Clique nos pontos para ver os chamados.",
      termos: [
        { termo: "Score de problemas (vermelho)", def: "Reclamações de clientes + erros em produção ponderados por usuários afetados. Maior = mais urgente." },
        { termo: "Dev trabalhando agora (verde)", def: "Quantidade de atividade do time de desenvolvimento neste sistema esta semana (PRs de código + cards ativos)." },
        { termo: "Dev planejado (azul tracejado)", def: "O que está na fila para ser desenvolvido em breve — indica atenção futura ao serviço." },
        { termo: "Gap grande (vermelho > verde)", def: "O sistema tem muitos problemas mas pouca atenção do dev. Zona de risco." }
      ]
    },
    {
      slide: "Riscos Imediatos",
      intro: "Os 3 cenários onde uma decisão errada de deploy pode transformar um problema controlado em crise visível para os clientes.",
      termos: [
        { termo: "Bomba ativa", def: "Combinação de: bug confirmado + correção em andamento + nova feature sobre a mesma área. Se o deploy errar, o problema piora." },
        { termo: "Gatilho", def: "O evento específico que pode detonar o problema — geralmente um deploy ou merge de código sem os devidos testes." },
        { termo: "Score da bomba", def: "Quanto maior, mais fatores de risco combinados. Não é o score de risco do módulo — é uma medida de urgência para ação imediata." }
      ]
    },
    {
      slide: "Próximos Passos",
      intro: "Ações priorizadas com base em todos os sinais coletados. Ordenadas por impacto e urgência.",
      termos: [
        { termo: "P0 — HOJE", def: "Ação que deve ser tomada antes do fim do dia. Ignorar aumenta significativamente o risco de crise." },
        { termo: "P1 — ESTA SEMANA", def: "Ação importante para esta sprint. Ignorar pode gerar problemas no próximo deploy." },
        { termo: "P2 — PRÓXIMA SPRINT", def: "Relevante mas não emergencial. Priorizar no próximo planejamento." }
      ]
    }
  ],

  // ── AÇÕES ─────────────────────────────────────────────────
  acoes: [
    { prioridade: "P0 — HOJE",         cor: "red",    modulo: "Chat",          acao: "Testar e aprovar DEV4-4078 (fix status de mensagem) antes de qualquer merge",                      prazo: "Hoje" },
    { prioridade: "P0 — HOJE",         cor: "red",    modulo: "Nova Interface", acao: "Investigar OMNISPA-2QCV (TypeError plugin escalando) — verificar se foi causado pelo PR1493",     prazo: "Hoje" },
    { prioridade: "P0 — HOJE",         cor: "red",    modulo: "Permissões",    acao: "Criar card corretivo Highest para SM-3211 (operador acessa chats alheios — 57 dias sem fix)",      prazo: "Hoje" },
    { prioridade: "P1 — ESTA SEMANA",  cor: "orange", modulo: "Chat",          acao: "Bloquear DEV4-4229 (agendamentos) até DEV4-4078 estável 48h em produção",                         prazo: "Esta semana" },
    { prioridade: "P1 — ESTA SEMANA",  cor: "orange", modulo: "Nova Interface", acao: "Bloquear DEV4-4166 (Nova Estrutura de Páginas) até investigação do TypeError plugin concluída",  prazo: "Esta semana" },
    { prioridade: "P1 — ESTA SEMANA",  cor: "orange", modulo: "Canais",        acao: "Testar Instagram e templates após qualquer merge na área de canais",                              prazo: "Esta semana" },
    { prioridade: "P2 — PRÓX. SPRINT", cor: "amber",  modulo: "Upload",        acao: "Criar correção para bug de PDF (SM-7503 aberto hoje + SM-2091 histórico)",                       prazo: "Próx. sprint" },
    { prioridade: "P2 — PRÓX. SPRINT", cor: "amber",  modulo: "Distribuição",  acao: "Validar se PR1123 (FoundationAPI) resolveu os bugs de distribuição ou introduziu regressão",     prazo: "Próx. sprint" }
  ]
};
