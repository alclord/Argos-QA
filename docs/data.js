// ============================================================
//  ARGOS PREDICT — DATA FILE
//  Atualizado semanalmente pelo comando /argos-predict
//  Última geração: 2026-05-30
//  Fontes: Jira Suporte (100 N1 + 52 N2) · DEV4 (36 backlog + 6 em dev)
//          Sentry (30 issues) · GitHub Churn (47 PRs, 15 repos)
// ============================================================
const REPORT = {
  meta: {
    geradoEm: "30 de Maio de 2026",
    janela: "14 dias",
    fontes: "Jira Suporte (52 N2 + 100 N1) · DEV4 (36 backlog + 6 em dev) · Sentry · GitHub Churn (47 PRs)"
  },

  // ── KPIs ────────────────────────────────────────────────
  kpis: [
    { label: "Bugs confirmados N2",      valor: "52",    cor: "red",    icone: "🔴", detalhe: "N2 investigando — prestes a virar DEV4. Inclui SM-3211 (privacidade) com 60 dias sem fix." },
    { label: "Bugs ativos N1",           valor: "54",    cor: "amber",  icone: "🟡", detalhe: "54 bugs abertos pelo suporte nos últimos 14 dias — envio falha, bot não distribui, busca quebrada." },
    { label: "Módulos críticos",         valor: "4",     cor: "red",    icone: "🔴", detalhe: "Chat/Mensagens · Distribuição/Filas · Integrações CRM · Canais/WhatsApp" },
    { label: "Usuários afetados (prod)", valor: "11K+",  cor: "red",    icone: "🔴", detalhe: "omnispa 401 agendamentos (3.270) + encoder (1.819) + spa-backend 500 (1.261) + outros." },
    { label: "Features instáveis em dev","valor": "2",   cor: "orange", icone: "🟠", detalhe: "DEV4-4229 (agendamentos) + DEV4-4044 (PLBV) sobre áreas com bugs ativos." },
    { label: "Corretivos em dev",        valor: "1",     cor: "amber",  icone: "🟡", detalhe: "DEV4-4078 — fix ícone de relógio permanente (ACK). Único corretivo ativo." },
    { label: "Módulos negligenciados",   valor: "6",     cor: "red",    icone: "🔴", detalhe: "Distribuição, CRM, Canais, Contatos, Permissões, Upload — pressão de clientes sem DEV4 corretivo." },
    { label: "Bugs N2 sem corretivo",    valor: "40+",   cor: "red",    icone: "🔴", detalhe: "Mais de 40 bugs confirmados pelo N2 sem card DEV4 corretivo associado." }
  ],

  // ── RANKING ──────────────────────────────────────────────
  ranking: [
    { modulo: "Chat / Mensagens",     total: 47, tec: 22, usr: 25, nivel: "ALTO",    cor: "#EF4444" },
    { modulo: "Distribuição / Filas", total: 38, tec: 14, usr: 24, nivel: "ALTO",    cor: "#EF4444" },
    { modulo: "Integrações CRM",      total: 28, tec: 15, usr: 13, nivel: "ALTO",    cor: "#EF4444" },
    { modulo: "Canais / WhatsApp",    total: 26, tec: 11, usr: 15, nivel: "ALTO",    cor: "#EF4444" },
    { modulo: "Busca / Contatos",     total: 14, tec: 4,  usr: 10, nivel: "MÉDIO",   cor: "#F59E0B" },
    { modulo: "Permissões / Roles",   total: 12, tec: 5,  usr: 7,  nivel: "MÉDIO",   cor: "#F59E0B" },
    { modulo: "Upload / Mídia",       total: 8,  tec: 4,  usr: 4,  nivel: "ATENÇÃO", cor: "#F97316" },
    { modulo: "WebSocket / Presença", total: 7,  tec: 4,  usr: 3,  nivel: "ATENÇÃO", cor: "#F97316" }
  ],

  // ── MAPA DE CALOR ────────────────────────────────────────
  mapaCalor: [
    { modulo: "Distribuição / Filas", pressao: 24, atencao: 2,  gap: -22, zona: "Negligenciada" },
    { modulo: "Integrações CRM",      pressao: 13, atencao: 0,  gap: -13, zona: "Negligenciada" },
    { modulo: "Canais / WhatsApp",    pressao: 15, atencao: 2,  gap: -13, zona: "Negligenciada" },
    { modulo: "Busca / Contatos",     pressao: 10, atencao: 0,  gap: -10, zona: "Negligenciada" },
    { modulo: "Permissões / Roles",   pressao: 7,  atencao: 0,  gap: -7,  zona: "Negligenciada" },
    { modulo: "Upload / Mídia",       pressao: 4,  atencao: 0,  gap: -4,  zona: "Negligenciada" },
    { modulo: "Chat / Mensagens",     pressao: 25, atencao: 6,  gap: -19, zona: "Subatendida"   },
    { modulo: "WebSocket / Presença", pressao: 3,  atencao: 2,  gap: -1,  zona: "Balanceada"    },
    { modulo: "PLBV / Meta",          pressao: 0,  atencao: 8,  gap: +8,  zona: "Sobre-investida" },
    { modulo: "Autenticação / 2FA",   pressao: 0,  atencao: 6,  gap: +6,  zona: "Sobre-investida" }
  ],

  // ── TENDÊNCIA ────────────────────────────────────────────
  tendencia: [
    { modulo: "Chat / Mensagens",     delta: 0, ontem: 47, hoje: 47 },
    { modulo: "Distribuição / Filas", delta: 0, ontem: 38, hoje: 38 },
    { modulo: "Integrações CRM",      delta: 0, ontem: 28, hoje: 28 },
    { modulo: "Canais / WhatsApp",    delta: 0, ontem: 26, hoje: 26 },
    { modulo: "Busca / Contatos",     delta: 0, ontem: 14, hoje: 14 },
    { modulo: "Permissões / Roles",   delta: 0, ontem: 12, hoje: 12 }
  ],

  // ── DISTRIBUIÇÃO DE BUGS N2 ──────────────────────────────
  bugDistribuicao: [
    { label: "Sem corretivo planejado", valor: 40, cor: "#EF4444" },
    { label: "Com corretivo ativo",     valor: 4,  cor: "#F59E0B" },
    { label: "Crônicos / não-técnicos", valor: 8,  cor: "#475569" }
  ],

  // ── BOMBAS ───────────────────────────────────────────────
  bombas: [
    {
      pos: 1, modulo: "Chat / Mensagens", score: 59, cor: "#EF4444",
      problema: "DEV4-4078 corrige o ícone de relógio permanente — o corretivo certo, mas pode ser incompleto. Ao mesmo tempo, o Sentry mostra 3.270 usuários com erro 401 em /scheduled-messages (omnispa), potencialmente introduzido por DEV4-4229 que está em canary.",
      gatilho: "Merge de DEV4-4078 para produção sem investigar o 401 em /scheduled-messages. Deploy que resolve o ícone mas quebra agendamentos para 3K+ usuários.",
      acao: "Investigar HOJE o omnispa 401 /scheduled-messages (Sentry). Confirmar se é regressão de DEV4-4229. Só fazer merge de DEV4-4078 após esclarecer."
    },
    {
      pos: 2, modulo: "Distribuição / Filas", score: 44, cor: "#EF4444",
      problema: "7 bugs N2 confirmados + 4 N1 recentes sem nenhum card corretivo ativo. SM-7855 menciona 'após atualização de 13/05' — deploy recente piorou distribuição há 17 dias sem que um card corretivo fosse criado.",
      gatilho: "Entrada em produção de DEV4-3446 (fechamento automático por inatividade) antes de corrigir o dispatch. Nova lógica de redistribuição sobre motor já quebrado.",
      acao: "Criar card DEV4 urgente investigando deploy de 13/05. Bloquear DEV4-3446. Monitorar Sentry dispatch diariamente."
    },
    {
      pos: 3, modulo: "Canais / WhatsApp", score: 33, cor: "#F97316",
      problema: "4 HUs do programa PLBV em desenvolvimento ativo sobre waba-webhook que já registra 1M+ erros ZAPI e 12K erros de Facebook webhook perdendo leads do Instagram silenciosamente.",
      gatilho: "Merge de DEV4-4044 (PLBV self-certify) com webhook instável. Qualquer regressão no waba-webhook afeta WhatsApp, ZAPI e Instagram simultaneamente.",
      acao: "Criar card DEV4 para FacebookWebHook array key 0 (SM-7821 + Sentry 12K×). Executar /qa-jira DEV4-4044 com cenários de fallback antes do merge."
    }
  ],

  // ── SENTRY ───────────────────────────────────────────────
  sentry: [
    { erro: "401 em /scheduled-messages",          projeto: "omnispa",           usuarios: 3270, status: "Crônico",   oculto: false },
    { erro: "Encoder de mídia quebrado",            projeto: "polichat-spa",      usuarios: 1819, status: "Crônico",   oculto: true  },
    { erro: "401 AxiosError (geral)",               projeto: "polichat-spa",      usuarios: 1316, status: "Crônico",   oculto: true  },
    { erro: "Request failed 500 (spa-backend)",     projeto: "spa-backend",       usuarios: 1261, status: "Crônico",   oculto: true  },
    { erro: "Erro não capturado",                   projeto: "polichat-spa",      usuarios: 963,  status: "Crônico",   oculto: true  },
    { erro: "MessageSenderException Internal Error","projeto": "foundationapi",   usuarios: 762,  status: "Crônico",   oculto: false },
    { erro: "Graph session invalidated",            projeto: "polichat-web-app",  usuarios: 752,  status: "Crônico",   oculto: true  },
    { erro: "GuzzleHTTP CRM 401",                   projeto: "polichat-web-app",  usuarios: 450,  status: "Crônico",   oculto: true  }
  ],

  // ── AÇÕES ─────────────────────────────────────────────────
  acoes: [
    { prioridade: "P0 — HOJE",         modulo: "Chat / Mensagens",   acao: "Investigar 401 omnispa /scheduled-messages (3.270 usuários) — confirmar se é regressão de DEV4-4229. Não fazer merge de DEV4-4078 até esclarecer.", prazo: "Hoje" },
    { prioridade: "P0 — HOJE",         modulo: "Permissões / Roles",  acao: "Escalar SM-3211 para produto — furo de privacidade (operador acessa chats de terceiros), 60 dias sem resolução. Risco de compliance.", prazo: "Hoje" },
    { prioridade: "P0 — HOJE",         modulo: "Distribuição / Filas","acao": "Criar card DEV4 investigando deploy de 13/05 e seu impacto em SM-7855 (mensagens sem atendente). Bloquear DEV4-3446 (Sentinela).", prazo: "Hoje" },
    { prioridade: "P1 — ESTA SEMANA",  modulo: "Integrações CRM",     acao: "Criar card DEV4 para token refresh do CrmHttpClient — 44K+ erros 401 em 14 dias sem ação. Risco de duplicatas de contato crescente.", prazo: "Esta semana" },
    { prioridade: "P1 — ESTA SEMANA",  modulo: "Canais / WhatsApp",   acao: "Criar card DEV4 para FacebookWebHook array key 0 (Sentry 12K× + 706 users). Executar /qa-jira DEV4-4044 antes do merge PLBV.", prazo: "Esta semana" },
    { prioridade: "P1 — ESTA SEMANA",  modulo: "Chat / Mensagens",    acao: "Fixar ENABLE_ACK_LOG ausente no meta-whatsapp-cloud-api (439K erros, config deployment quebrado). Tarefa de DevOps.", prazo: "Esta semana" },
    { prioridade: "P2 — PRÓX. SPRINT", modulo: "Upload / Mídia",      acao: "Criar fix para player de áudio web (SM-5880 + SM-7816) — consistente em N2 e N1.", prazo: "Próx. sprint" },
    { prioridade: "P2 — PRÓX. SPRINT", modulo: "Busca / Contatos",    acao: "Investigar reindexação Elasticsearch — SM-5912 N2 + SM-7833/7846 N1 relatam busca quebrada. Verificar filtro account_id.", prazo: "Próx. sprint" }
  ],

  // ── RADAR DE SERVIÇOS ─────────────────────────────────────
  servicos_radar: [
    {
      nome: "polichat-web-app", apelido: "Backend Legado",
      alias: "legado",
      bugs: 14, bugs_n1: 5, bugs_sentry: 9,
      dev_ativo: 4, dev_planejado: 3,
      notas: {
        bugs: "5 N1 + Sentry: GraphSession 752u(+2) + FacebookWebhook 706u(+2) + CRM 422u(+2) + CRM Guzzle 450u(+2) + Template 9u(+1) = 14",
        ativo: "4 PRs mesclados (JID, flows, template) + DEV4-4229 (agendamentos)",
        planejado: "DEV4-4188, DEV4-4154, DEV4-4227"
      },
      bugs_cards: [
        { id:"SM-7872", titulo:"Mensagens não entram ao ativar bot",                   tipo:"N1 Bug"     },
        { id:"SM-7867", titulo:"Mensagem não chega na plataforma",                     tipo:"N1 Bug"     },
        { id:"SM-7859", titulo:"Instabilidade no envio de mensagens",                  tipo:"N1 Bug"     },
        { id:"SM-7848", titulo:"Mensagens não são enviadas para alguns usuários",       tipo:"N1 Bug"     },
        { id:"SM-7797", titulo:"Cliente não consegue enviar mensagens",                tipo:"N1 Bug"     },
        { id:"Sentry",  titulo:"Graph session invalidated — 752 usuários",             tipo:"🚨 Sentry +2"},
        { id:"Sentry",  titulo:"FacebookWebHook array key 0 — 706 usuários",           tipo:"🚨 Sentry +2"},
        { id:"Sentry",  titulo:"CRM não autenticado — 422 usuários",                   tipo:"🚨 Sentry +2"},
        { id:"Sentry",  titulo:"GuzzleHTTP CRM 401 — 450 usuários",                   tipo:"🚨 Sentry +2"},
        { id:"Sentry",  titulo:"Template não enviado — 10.991 ocorrências",            tipo:"🚨 Sentry +1"}
      ],
      dev_ativo_items: [
        { id:"PR#304",    titulo:"feat: template flow API",                 tipo:"PR", repo:"polichat-web-app" },
        { id:"PR#299",    titulo:"fix: normalizar JID grupos WhatsApp",     tipo:"PR", repo:"polichat-web-app" },
        { id:"DEV4-4229", titulo:"Mensagens agendadas — filtros e criação", tipo:"Card em Dev"              }
      ],
      dev_planejado_items: [
        { id:"DEV4-4188", titulo:"Evento 'Atendimento finalizado' para API", tipo:"Aguardando Handoff" },
        { id:"DEV4-4154", titulo:"Corrigir placeholder de anotações",        tipo:"Pronto para Dev"   },
        { id:"DEV4-4227", titulo:"Remover filtro 'Cliente aguardando'",      tipo:"Pronto para Dev"   }
      ]
    },
    {
      nome: "foundation-spa", apelido: "Interface Moderna",
      alias: "omnispa · repo: SPA",
      bugs: 11, bugs_n1: 2, bugs_sentry: 9,
      dev_ativo: 6, dev_planejado: 5,
      notas: {
        bugs: "2 N1 + Sentry: /scheduled-messages 401 3270u(+3) + spa-backend 500 1261u(+3) + MessageSender 762u(+2) + AbortError 263u(+1) = 11",
        ativo: "21 PRs no SPA em 14 dias (maior churn) + DEV4-4078 + DEV4-4158",
        planejado: "DEV4-4166, DEV4-4202, DEV4-4267, DEV4-4225, backlog"
      },
      bugs_cards: [
        { id:"SM-7846",  titulo:"Dificuldade em localizar contatos",                     tipo:"N1 Bug"     },
        { id:"SM-7805",  titulo:"Atraso na alteração de ícones — bug visual (ACK)",       tipo:"N1 Bug"     },
        { id:"Sentry",   titulo:"401 /scheduled-messages — 3.270 usuários",               tipo:"🚨 Sentry +3"},
        { id:"Sentry",   titulo:"spa-backend Request failed 500 — 1.261 usuários",        tipo:"🚨 Sentry +3"},
        { id:"Sentry",   titulo:"MessageSenderException — 762 usuários",                  tipo:"🚨 Sentry +2"},
        { id:"Sentry",   titulo:"AbortError request abortado — 263 usuários",             tipo:"🚨 Sentry +1"}
      ],
      dev_ativo_items: [
        { id:"DEV4-4078",  titulo:"[Corretivo] Fix ícone relógio permanente (ACK)",         tipo:"Em Dev (Highest!)" },
        { id:"DEV4-4158",  titulo:"Showcase — Galeria Design System",                        tipo:"Card em Dev"       },
        { id:"PR#1496",    titulo:"DEV4-4229 mensagens agendadas front",                    tipo:"PR", repo:"SPA"     },
        { id:"PR#1118(API)","titulo":"DEV4-4229 mensagens agendadas back",                  tipo:"PR", repo:"FoundationAPI" }
      ],
      dev_planejado_items: [
        { id:"DEV4-4166", titulo:"Nova Estrutura de Páginas (Epic)",             tipo:"Pronto para Dev"    },
        { id:"DEV4-4202", titulo:"Novas contas na Nova Interface por padrão",    tipo:"Aguardando Handoff" },
        { id:"DEV4-4267", titulo:"Exportação de Conversas",                      tipo:"Aguardando Cenários"},
        { id:"DEV4-4284", titulo:"Mensagens Rápidas no chat",                    tipo:"Aguardando Cenários"},
        { id:"DEV4-4249", titulo:"Central de arquivos do contato (Mídias)",      tipo:"Aguardando Cenários"}
      ]
    },
    {
      nome: "dispatch-service", apelido: "Distribuição",
      alias: "dispatch",
      bugs: 7, bugs_n1: 4, bugs_sentry: 3,
      dev_ativo: 0, dev_planejado: 2,
      notas: {
        bugs: "4 N1 + Sentry dispatch erros background (0 usuários diretos mas 2 issues × +1 = 2) + automatic-actions TypeError +1 = 7",
        ativo: "Nenhum PR ou card ativo de correção — 🔴 NEGLIGENCIADO",
        planejado: "DEV4-3446 (Sentinela — BLOQUEADO), DEV4-4003 (gestão — feature)"
      },
      bugs_cards: [
        { id:"SM-7856",  titulo:"Bot não redirecionando chats automaticamente",       tipo:"N1 Bug"     },
        { id:"SM-7855",  titulo:"Sem atendente após atualização de 13/05",            tipo:"N1 Bug"     },
        { id:"SM-7825",  titulo:"Lentidão de 8–10 minutos na distribuição",           tipo:"N1 Bug"     },
        { id:"SM-7806",  titulo:"Status 'sem atendente' com atendentes disponíveis",  tipo:"N1 Bug"     },
        { id:"Sentry",   titulo:"Distribute to department — 2.600 ocorrências",       tipo:"🚨 Sentry +1"},
        { id:"Sentry",   titulo:"Distribute from the queue — 2.160 ocorrências",      tipo:"🚨 Sentry +1"},
        { id:"Sentry",   titulo:"automatic-actions TypeError null.id — 1.489×",       tipo:"🚨 Sentry +1"}
      ],
      dev_ativo_items: [],
      dev_planejado_items: [
        { id:"DEV4-3446", titulo:"[BLOQUEADO] Fechamento automático por inatividade", tipo:"Aguardando Handoff" },
        { id:"DEV4-4003", titulo:"Tela de Gestão de Chats (feature)",                 tipo:"Pronto para Dev"   }
      ]
    },
    {
      nome: "waba-webhook", apelido: "WhatsApp API",
      alias: "channel-customer",
      bugs: 5, bugs_n1: 3, bugs_sentry: 2,
      dev_ativo: 4, dev_planejado: 5,
      notas: {
        bugs: "3 N1 + Sentry: FacebookWebHook 706u(+2) — já contado em polichat-web-app. ACK@lid (SM-5831) + template erros = 5",
        ativo: "4 HUs PLBV em dev (DEV4-4023/4024/4043/4044)",
        planejado: "DEV4-4040, DEV4-4031, DEV4-4198, DEV4-4087, DEV4-4164"
      },
      bugs_cards: [
        { id:"SM-7821",  titulo:"Leads de Instagram não chegando na plataforma",     tipo:"N1 Bug"     },
        { id:"SM-7841",  titulo:"Colaboradora não consegue enviar template",          tipo:"N1 Bug"     },
        { id:"SM-5831",  titulo:"ACK=0 em contatos com identificador @lid (N2)",      tipo:"N2 Bug"     },
        { id:"Sentry",   titulo:"ZAPI: property 'customer' null — 1.034.081 erros",  tipo:"🚨 Sentry +1"},
        { id:"Sentry",   titulo:"Template não enviado — 10.991 erros",               tipo:"🚨 Sentry +1"}
      ],
      dev_ativo_items: [
        { id:"DEV4-4044", titulo:"PLBV — Integração self-certify API Meta",     tipo:"Em Dev ⚠️" },
        { id:"DEV4-4024", titulo:"PLBV — Fluxo submissão verificação cliente",  tipo:"Em Dev"    },
        { id:"DEV4-4043", titulo:"PLBV — Compliance interno análise/aprovação", tipo:"Em Dev"    },
        { id:"DEV4-4023", titulo:"PLBV — Estrutura base e ciclo de vida",       tipo:"Em Dev"    }
      ],
      dev_planejado_items: [
        { id:"DEV4-4040", titulo:"Sincronização status via webhooks Meta",        tipo:"Aguardando Handoff" },
        { id:"DEV4-4031", titulo:"Desbloqueio automático por status PLBV",        tipo:"Aguardando Handoff" },
        { id:"DEV4-4198", titulo:"Embedded Signup v4.0",                          tipo:"Aguardando Handoff" },
        { id:"DEV4-4087", titulo:"Detecção mudança categoria template Meta",      tipo:"Aguardando Handoff" },
        { id:"DEV4-4164", titulo:"Sugestão template Utility quando Marketing",    tipo:"Aguardando Handoff" }
      ]
    },
    {
      nome: "foundation-api", apelido: "Backend Moderno",
      alias: "foundationapi",
      bugs: 8, bugs_n1: 0, bugs_sentry: 8,
      dev_ativo: 2, dev_planejado: 4,
      notas: {
        bugs: "0 N1 diretos + Sentry: CRM Não autenticado (17.7K×) + CRM 401 (10.9K×) + Duplicata contato (16.5K×) + MessageSender (7.7K×, 762u) = 8",
        ativo: "PR1118 (DEV4-4229 back), FoundationAPI em churn ativo",
        planejado: "DEV4-4279 reindexação, DEV4-4055 Ghost Contacts, DEV4-4030 BSUID, DEV4-4032 identidade"
      },
      bugs_cards: [
        { id:"Sentry",  titulo:"CRMException: Não autenticado — 17.739×",               tipo:"🚨 Sentry +2"},
        { id:"Sentry",  titulo:"RequestException 401 CrmHttpClient — 10.913×",          tipo:"🚨 Sentry +2"},
        { id:"Sentry",  titulo:"CRMException: Já existe contato com tel — 16.473×",     tipo:"🚨 Sentry +2"},
        { id:"Sentry",  titulo:"MessageSenderException — 7.745× | 762 usuários",        tipo:"🚨 Sentry +2"}
      ],
      dev_ativo_items: [
        { id:"PR#1118", titulo:"DEV4-4229 agendamentos back (filtros + criação)", tipo:"PR", repo:"FoundationAPI" }
      ],
      dev_planejado_items: [
        { id:"DEV4-4279", titulo:"Reindexar base ativa (migração em massa)",   tipo:"Aguardando Handoff" },
        { id:"DEV4-4055", titulo:"Suporte a contatos sem telefone (Ghost)",     tipo:"Aguardando Handoff" },
        { id:"DEV4-4030", titulo:"Ingestão via Username (BSUID vs Phone)",      tipo:"Aguardando Handoff" },
        { id:"DEV4-4032", titulo:"Estrutura de identidade baseada em BSUID",    tipo:"Aguardando Handoff" }
      ]
    }
  ],

  // ── AJUDA CONTEXTUAL ────────────────────────────────────
  help: [
    {
      slide: "Visão Geral",
      intro: "Relatório gerado automaticamente cruzando 4 fontes de dados reais: Jira Suporte (N1+N2), Jira Dev, Sentry e GitHub Churn.",
      termos: [
        { termo: "N1 / N2", def: "N1 = cliente abriu chamado no suporte (sinal direto). N2 = equipe de segundo nível investigando — problema confirmado, prestes a virar card DEV4." },
        { termo: "Sentry", def: "Monitor automático de erros em produção. Detecta problemas mesmo antes do cliente ligar." },
        { termo: "Code Churn", def: "Quantidade de linhas de código alteradas em um módulo. Mais churn = mais risco de regressão." },
        { termo: "Módulo Negligenciado", def: "Tem pressão ativa de clientes mas ZERO card DEV4 corretivo planejado." }
      ]
    },
    {
      slide: "Indicadores Executivos",
      intro: "8 números que resumem o estado atual da plataforma.",
      termos: [
        { termo: "Bugs N2 confirmados", def: "N2 investigou e confirmou o problema — está a 1 passo de virar card DEV4. Mais grave que N1." },
        { termo: "Usuários afetados (prod)", def: "Pessoas com erro real detectado pelo Sentry — podem não ter ligado para o suporte ainda." },
        { termo: "Módulo negligenciado", def: "Clientes reclamam, N2 confirma, mas o dev não tem nenhum card corretivo. Tempo até crise = semanas." },
        { termo: "Feature instável", def: "Nova funcionalidade sendo desenvolvida sobre área que já tem bugs ativos — risco de regressão." }
      ]
    },
    {
      slide: "Mapa de Risco",
      intro: "Barras = módulos da plataforma ordenados por urgência. Score técnico (roxo) + Score usuários (âmbar) = total.",
      termos: [
        { termo: "Score Técnico", def: "Vem de: KB fragilidades (+3), Sentry clusters (+3), code churn alto (+2), QA flakiness (+1)." },
        { termo: "Score Usuários", def: "Vem de: bugs N2 × decay de idade, bugs N1, prioridade do ticket, cards DEV4 ativos." },
        { termo: "Decay de idade", def: "Bugs antigos perdem peso: <7d = ×1.0 | 7-30d = ×0.8 | 30-90d = ×0.6 | >90d = ×0.4." },
        { termo: "ALTO / MÉDIO / ATENÇÃO", def: "ALTO ≥ 10 pts. MÉDIO 6-9. ATENÇÃO 3-5. ESTÁVEL 0-2." }
      ]
    },
    {
      slide: "Mapa de Calor",
      intro: "Pressão de clientes vs atenção do dev. Gap grande = risco crescendo sem resposta.",
      termos: [
        { termo: "Pressão Clientes", def: "Score baseado em tickets N1+N2 do suporte para aquele módulo." },
        { termo: "Atenção Dev", def: "Peso dos cards DEV4 mapeados: corretivo ativo=3 | feature instável=1 | corretivo em backlog=1." },
        { termo: "Negligenciada", def: "Pressão ≥ 4 e atenção dev = 0. Bugs crescendo sem nenhuma ação planejada." },
        { termo: "Sobre-investida", def: "Dev trabalhando muito em área com pouca pressão de clientes — pode ser refactor preventivo (ok) ou repriorização necessária." }
      ]
    },
    {
      slide: "Serviços Sob Pressão",
      intro: "Quais sistemas estão no centro dos problemas. Cada ponto do radar = um serviço.",
      termos: [
        { termo: "Score de bugs (vermelho)", def: "N1 tickets (×1) + Sentry por faixa de usuários (>1K=+3, 100-1K=+2, 10-100=+1)." },
        { termo: "Dev ativo (verde)", def: "PRs e cards de desenvolvimento atual neste serviço." },
        { termo: "Dev planejado (azul)", def: "Cards em backlog/ready que vão tocar este serviço em breve." },
        { termo: "Gap vermelho > verde", def: "Muitos bugs, pouco dev. Zona de risco crescente." }
      ]
    },
    {
      slide: "Bombas",
      intro: "Os 3 cenários onde um deploy errado transforma problema controlado em crise visível.",
      termos: [
        { termo: "Bomba", def: "Combinação de: bug confirmado + correção em andamento + feature nova sobre a mesma área." },
        { termo: "Gatilho", def: "O evento específico que pode detonar — geralmente um merge/deploy sem os devidos testes." },
        { termo: "Score da bomba", def: "Score_total + 5 (corretivo ativo) + 4 (feature instável) + 3 (tendência ↗️) + 2 (Sentry escala)." }
      ]
    },
    {
      slide: "Próximos Passos",
      intro: "Ações priorizadas. P0 = hoje. P1 = esta semana. P2 = próxima sprint.",
      termos: [
        { termo: "P0 — HOJE", def: "Ignorar aumenta significativamente o risco de crise visível para clientes." },
        { termo: "P1 — ESTA SEMANA", def: "Pode gerar problemas no próximo deploy se ignorado." },
        { termo: "P2 — PRÓX. SPRINT", def: "Relevante mas não emergencial. Incluir no próximo planejamento." }
      ]
    }
  ]
};
