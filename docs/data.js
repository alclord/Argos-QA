// ============================================================
//  ARGOS PREDICT — DATA FILE (v4.0)
//  Atualizado: 2026-07-21
//  Gerado automaticamente por scripts/argos-predict/
// ============================================================
const REPORT = {
  "meta": {
    "geradoEm": "21/07/2026, 10:32",
    "geradoEmISO": "2026-07-21T13:32:18.155Z",
    "janela": "14 dias",
    "fontes": "Jira Suporte (1100 N1 Aberto) · DEV4 · Sentry · GitHub",
    "fontes_disponiveis": {
      "sm": true,
      "dev4": true,
      "sentry": true,
      "github": true
    }
  },
  "resumoExecutivo": "",
  "kpis": [
    {
      "label": "SM Aberto (N1)",
      "valor": 1100,
      "cor": "amber",
      "icone": "🟡",
      "detalhe": "",
      "unidade": ""
    },
    {
      "label": "Modulos Criticos",
      "valor": 7,
      "cor": "red",
      "icone": "🔴",
      "detalhe": "",
      "unidade": ""
    },
    {
      "label": "Sentry Issues",
      "valor": 78,
      "cor": "red",
      "icone": "🚨",
      "detalhe": "",
      "unidade": ""
    },
    {
      "label": "PRs no periodo",
      "valor": 21,
      "cor": "green",
      "icone": "📊",
      "detalhe": "",
      "unidade": ""
    },
    {
      "label": "Bugs reabertos",
      "valor": 0,
      "cor": "orange",
      "icone": "🔄",
      "detalhe": "",
      "unidade": ""
    },
    {
      "label": "Incidentes externos",
      "valor": 0,
      "cor": "amber",
      "icone": "🌐",
      "detalhe": "",
      "unidade": ""
    }
  ],
  "ranking": [
    {
      "modulo": "Chat / Mensagens",
      "total": 23.8,
      "tec": 10,
      "usr": 13.8,
      "bugs_n1": 301,
      "nivel": "ALTO",
      "cor": "#EF4444",
      "sentryDelta": 0,
      "delta": 0,
      "bugs_cards": [
        {
          "id": "SM-13299",
          "titulo": "Mensagens caindo para unidade errada - conflito entre lojas Americana e Campinas",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13303",
          "titulo": "Cliente bloqueado ao tentar enviar templates aprovados",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13302",
          "titulo": "Mensagens do final de semana com janelas fechadas - problema recorrente há 1 mês",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13286",
          "titulo": "Atraso no recebimento de mensagens - mensagens chegando com 20 minutos de delay",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13292",
          "titulo": "Mensagens não são enviadas sem exibir erro",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13281",
          "titulo": "Cliente final não consegue responder mensagens via QR Code do WhatsApp API",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13276",
          "titulo": "Mensagens agendadas não estão sendo enviadas para grupo desde 14/07",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13265",
          "titulo": "Mensagens não aparecem na conversa nem notificam - necessário atualizar manualmente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13256",
          "titulo": "Atualização de mensagens em tempo real não está funcionando",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13255",
          "titulo": "Mensagens não estão ficando na aba correta - indo para 'Todas as mensagens' em vez de 'Sem atendente'",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13246",
          "titulo": "Template aprovado no Meta mas não permite envio de mensagem",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13226",
          "titulo": "Mensagens não aparecem na plataforma mesmo com atendente disponível",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13240",
          "titulo": "Mensagens e imagens não chegam ou chegam com grande atraso em diferentes máquinas",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13206",
          "titulo": "Erro no app mobile ao digitar mensagens - tela de aviso aparecendo repetidamente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13188",
          "titulo": "App mobile exibe mensagem de tempo esgotado mesmo em uso",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13187",
          "titulo": "Mensagens não estão sendo enviadas pelo canal WhatsApp",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13182",
          "titulo": "Mensagens não estão chegando na plataforma",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13173",
          "titulo": "Conversas trocadas entre clientes - mensagens aparecem em chats errados",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13164",
          "titulo": "Mensagens de clientes chegando com grande atraso (até 1 hora de delay)",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13165",
          "titulo": "Não consegue enviar mensagens nem transferir atendimento para contato específico",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13146",
          "titulo": "Sincronia de chats: última mensagem exibida é sempre a do cliente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13154",
          "titulo": "Chat ficou preso na fila de atendimento após solicitação atendida",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13151",
          "titulo": "Mensagens de clientes não aparecem em tempo real, só após atualizar a página",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13143",
          "titulo": "Conversas se misturando entre clientes diferentes",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13141",
          "titulo": "Duplicidade de contatos na mesma conversa travando recebimento de mensagens",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13140",
          "titulo": "Mensagens de clientes só aparecem após atualizar a página manualmente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13137",
          "titulo": "Mensagens não sincronizam automaticamente - necessário F5 constante",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13132",
          "titulo": "Mensagens de clientes não chegam ou demoram para chegar na plataforma",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13128",
          "titulo": "Chat some/desaparece após disparo no meio da conversa",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13105",
          "titulo": "Lentidão e travamento ao enviar mensagens/áudios na plataforma",
          "tipo": "🎫 N1 Bug · Medium"
        }
      ]
    },
    {
      "modulo": "Autenticação",
      "total": 20.8,
      "tec": 16,
      "usr": 4.8,
      "bugs_n1": 12,
      "nivel": "ALTO",
      "cor": "#EF4444",
      "sentryDelta": 0,
      "delta": 0,
      "bugs_cards": [
        {
          "id": "SM-13313",
          "titulo": "Loading infinito ao tentar fazer login na plataforma",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13030",
          "titulo": "Senha da Poli não funciona - problemas recorrentes de login",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12879",
          "titulo": "Cliente não consegue acessar conta - senha inválida e recuperação não chega no e-mail",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12733",
          "titulo": "App mobile exige login frequente e mostra conversas como expiradas (24h)",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12576",
          "titulo": "Gargalo na liberação de login por parte da Meta",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12367",
          "titulo": "Mensagens aparecem em um login de atendente e não aparecem em outro",
          "tipo": "🎫 N1 Bug · Medium"
        }
      ]
    },
    {
      "modulo": "Distribuição / Filas",
      "total": 19.7,
      "tec": 11,
      "usr": 8.7,
      "bugs_n1": 57,
      "nivel": "ALTO",
      "cor": "#EF4444",
      "sentryDelta": 0,
      "delta": 0,
      "bugs_cards": [
        {
          "id": "SM-13259",
          "titulo": "Chats atribuídos não aparecem na tela do atendente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13255",
          "titulo": "Mensagens não estão ficando na aba correta - indo para 'Todas as mensagens' em vez de 'Sem atendente'",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13226",
          "titulo": "Mensagens não aparecem na plataforma mesmo com atendente disponível",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13218",
          "titulo": "Chats não são distribuídos para atendentes e ficam em 'Sem atendente'",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13154",
          "titulo": "Chat ficou preso na fila de atendimento após solicitação atendida",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13117",
          "titulo": "Chats ficam sem atribuição de atendente quando operadores estão offline",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13102",
          "titulo": "Chats atribuídos não aparecem na aba 'Atribuídos a mim' para atendente específica",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13082",
          "titulo": "Operadora deslogada recebendo distribuição de chats",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13076",
          "titulo": "Chats encerrados permanecem na fila de atendimento e reaparecem como não lidos",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13074",
          "titulo": "Bot não direcionou chat para o atendente correto mesmo com escolha do cliente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12940",
          "titulo": "Distribuição de chats desigual - alguns atendentes não recebem direcionamentos",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12914",
          "titulo": "Mensagens marcadas (reply) não aparecem para o atendente na plataforma",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12897",
          "titulo": "Mensagens sem atendente não aparecem na aba correta - ficam apenas em 'Todas as mensagens'",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12913",
          "titulo": "Mensagens não chegam para o atendente sem atualizar a página",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12823",
          "titulo": "Atendente consegue visualizar clientes de outros atendentes",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12676",
          "titulo": "Distribuição de chats não funciona - mensagens chegam apenas para um atendente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12660",
          "titulo": "Sincronização de chats não atualiza na fila lateral",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12670",
          "titulo": "Fila não mostra última mensagem enviada",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12627",
          "titulo": "Chats enviados manualmente não aparecem em nenhuma aba para o atendente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12610",
          "titulo": "Conversas acumulando sem distribuição automática para atendente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12526",
          "titulo": "Clientes caindo no broker sem atendente disponível",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12488",
          "titulo": "Fila não reflete a última mensagem enviada - gestor não vê respostas dos atendentes",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12390",
          "titulo": "Distribuição de chats não funciona corretamente - atendentes não recebem novos chats",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12367",
          "titulo": "Mensagens aparecem em um login de atendente e não aparecem em outro",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12339",
          "titulo": "Conversas antigas acumuladas na aba 'sem atendente' sem distribuição",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12338",
          "titulo": "Erro na entrega de mensagens com pico de atividade na fila da Meta",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12306",
          "titulo": "Robô não direciona mensagens automaticamente para nova atendente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12294",
          "titulo": "Atendente com acesso restrito consegue visualizar contatos e histórico de outros atendentes",
          "tipo": "🎫 N1 Bug · Medium"
        }
      ]
    },
    {
      "modulo": "Canais",
      "total": 19,
      "tec": 9,
      "usr": 10,
      "bugs_n1": 141,
      "nivel": "ALTO",
      "cor": "#EF4444",
      "sentryDelta": 0,
      "delta": 0,
      "bugs_cards": [
        {
          "id": "SM-13289",
          "titulo": "Bot do Instagram quebrado e com inconsistência",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13281",
          "titulo": "Cliente final não consegue responder mensagens via QR Code do WhatsApp API",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13223",
          "titulo": "WhatsApp do cliente com bug - possível bloqueio por comportamento de spam",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13187",
          "titulo": "Mensagens não estão sendo enviadas pelo canal WhatsApp",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13107",
          "titulo": "Lentidão no envio e recebimento de mensagens via API Oficial",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13001",
          "titulo": "Canal WhatsApp restrito não conecta mesmo após trocar para Messenger",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12892",
          "titulo": "Opção de adicionar canal WhatsApp Broker (não oficial) não aparecia para o cliente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12816",
          "titulo": "Erro 'Destinatário não alcançado' ao enviar templates de WhatsApp",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12790",
          "titulo": "Canais aparecem como desconectados na plataforma",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12773",
          "titulo": "Canais desconectam ao alterar período de teste da conta",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12730",
          "titulo": "Meta não finalizou processo de conexão do canal mesmo após conexão realizada",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12706",
          "titulo": "WhatsApp não estava recebendo mensagens dos clientes",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12512",
          "titulo": "Conta WABA bloqueada pela Meta - restrição de envio de mensagens",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12525",
          "titulo": "Canal de envio alterando automaticamente e impedindo envio de templates",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12508",
          "titulo": "Cliente não consegue migrar canais para WhatsApp Web",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12492",
          "titulo": "Canal WhatsApp QR Code com problema de conexão - relógio aparecendo",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12468",
          "titulo": "Foto do perfil do WhatsApp não aparece para alguns contatos",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12458",
          "titulo": "Número aparece como não registrado no WhatsApp para os clientes",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12395",
          "titulo": "Usuário sem permissão para acessar aba de canais",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12380",
          "titulo": "Automação do Instagram Direct não está disparando mensagens",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12321",
          "titulo": "Canal bloqueado/banido pela Meta - cliente sem uso do Polichat há 2 dias",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12295",
          "titulo": "Lentidão e mensagens ficando com relógio (pendentes) - canal WABA",
          "tipo": "🎫 N1 Bug · Medium"
        }
      ]
    },
    {
      "modulo": "Jarvis / IA",
      "total": 12.3,
      "tec": 8,
      "usr": 4.3,
      "bugs_n1": 57,
      "nivel": "ALTO",
      "cor": "#EF4444",
      "sentryDelta": 0,
      "delta": 0,
      "bugs_cards": [
        {
          "id": "SM-13289",
          "titulo": "Bot do Instagram quebrado e com inconsistência",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13089",
          "titulo": "Bot não inicia para alguns contatos/números específicos",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13101",
          "titulo": "Bot não está transferindo chats para atendentes - clientes aguardando desde o dia anterior",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13079",
          "titulo": "Conversas não exibem indicador de não lidas após transferência do bot",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13074",
          "titulo": "Bot não direcionou chat para o atendente correto mesmo com escolha do cliente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13049",
          "titulo": "Cliente reporta múltiplos erros: etiquetas, integração de pagamentos, horário e bot",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12997",
          "titulo": "Chatbot ficou fora do ar por aproximadamente 4 horas",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12981",
          "titulo": "Problema com automação/bot não funcionando corretamente para usuário específico",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12953",
          "titulo": "Chats não são distribuídos para atendentes após finalizar fluxo do bot",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12911",
          "titulo": "Bot com informações inconsistentes após edição não autorizada",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12872",
          "titulo": "Contatos não estão sendo capturados corretamente pelo bot",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12798",
          "titulo": "Bot encerrando chats fora do horário de expediente incorretamente para todos os setores",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12663",
          "titulo": "Bot encerrando conversas mesmo com cliente interagindo para atendimento humano",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12637",
          "titulo": "Bot de disparo não estava encaminhando conversas corretamente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12622",
          "titulo": "Bot não distribui chats corretamente - clientes de Campinas não direcionados",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12560",
          "titulo": "Cliente não recebeu menu do bot e não foi direcionado para nenhum setor",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12530",
          "titulo": "Opção 12 (Indaiatuba) não exibe pontos de venda no bot",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12504",
          "titulo": "Problema com bot em investigação - cliente aguardando retorno",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12380",
          "titulo": "Automação do Instagram Direct não está disparando mensagens",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12322",
          "titulo": "Bot com funcionamento intermitente - às vezes funciona, às vezes não",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12306",
          "titulo": "Robô não direciona mensagens automaticamente para nova atendente",
          "tipo": "🎫 N1 Bug · Medium"
        }
      ]
    },
    {
      "modulo": "Configurações",
      "total": 10.9,
      "tec": 1,
      "usr": 9.9,
      "bugs_n1": 152,
      "nivel": "ALTO",
      "cor": "#EF4444",
      "sentryDelta": 0,
      "delta": 0,
      "bugs_cards": [
        {
          "id": "SM-13303",
          "titulo": "Cliente bloqueado ao tentar enviar templates aprovados",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13274",
          "titulo": "Conta suspensa não libera acesso após baixa de pagamento",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13246",
          "titulo": "Template aprovado no Meta mas não permite envio de mensagem",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13081",
          "titulo": "Bug de templates e botões não aparecendo no chat",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13047",
          "titulo": "Templates enviados não aparecem nas conversas após envio",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13049",
          "titulo": "Cliente reporta múltiplos erros: etiquetas, integração de pagamentos, horário e bot",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12995",
          "titulo": "Créditos não aparecem na conta mesmo após limpeza de cache",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12947",
          "titulo": "Operações travadas ao usar template aprovado - mensagens não sendo enviadas",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12930",
          "titulo": "Template aparecendo antes das 24h mesmo com cliente respondendo recentemente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12879",
          "titulo": "Cliente não consegue acessar conta - senha inválida e recuperação não chega no e-mail",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12838",
          "titulo": "Conversas com template enviado não aparecem na lista mesmo com filtro 'todas as conversas'",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12816",
          "titulo": "Erro 'Destinatário não alcançado' ao enviar templates de WhatsApp",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12798",
          "titulo": "Bot encerrando chats fora do horário de expediente incorretamente para todos os setores",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12780",
          "titulo": "Imagem não aparece no template aprovado - exibição inconsistente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12773",
          "titulo": "Canais desconectam ao alterar período de teste da conta",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12752",
          "titulo": "Usuária gestora sem acesso às configurações e templates",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12734",
          "titulo": "Erro ao enviar template para iniciar conversa",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12724",
          "titulo": "Template não envia em conversas com mais de 24h - sem erro exibido",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12664",
          "titulo": "Variáveis sumiram dos templates após mudança de layout",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12658",
          "titulo": "Falha no envio de templates para números internacionais",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12548",
          "titulo": "Sistema exibindo horário errado e enviando mensagem de indisponibilidade incorretamente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12512",
          "titulo": "Conta WABA bloqueada pela Meta - restrição de envio de mensagens",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12525",
          "titulo": "Canal de envio alterando automaticamente e impedindo envio de templates",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12457",
          "titulo": "Erro ao enviar mensagens via template para múltiplos contatos",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12452",
          "titulo": "Créditos comprados não foram liberados na conta do cliente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12373",
          "titulo": "Não era possível selecionar item da lista de templates",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12370",
          "titulo": "Erro ao criar/salvar templates de mensagem",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12243",
          "titulo": "Template de mensagem exibindo conteúdo incompleto na visualização da Poli",
          "tipo": "🎫 N1 Bug · Medium"
        }
      ]
    },
    {
      "modulo": "Contatos",
      "total": 10.3,
      "tec": 0,
      "usr": 10.3,
      "bugs_n1": 246,
      "nivel": "ALTO",
      "cor": "#EF4444",
      "sentryDelta": 0,
      "delta": 0,
      "bugs_cards": [
        {
          "id": "SM-13306",
          "titulo": "Erro reportado pelo cliente - em análise pela equipe de desenvolvimento",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13303",
          "titulo": "Cliente bloqueado ao tentar enviar templates aprovados",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13281",
          "titulo": "Cliente final não consegue responder mensagens via QR Code do WhatsApp API",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13276",
          "titulo": "Mensagens agendadas não estão sendo enviadas para grupo desde 14/07",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13223",
          "titulo": "WhatsApp do cliente com bug - possível bloqueio por comportamento de spam",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13221",
          "titulo": "Nome do contato não aparece na plataforma",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13216",
          "titulo": "Cliente não consegue acessar a plataforma",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13172",
          "titulo": "Notificações no navegador não chegam para todos os contatos ou chegam com delay",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13165",
          "titulo": "Não consegue enviar mensagens nem transferir atendimento para contato específico",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13162",
          "titulo": "Lentidão na plataforma reportada pelo cliente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13146",
          "titulo": "Sincronia de chats: última mensagem exibida é sempre a do cliente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13141",
          "titulo": "Duplicidade de contatos na mesma conversa travando recebimento de mensagens",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13089",
          "titulo": "Bot não inicia para alguns contatos/números específicos",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13100",
          "titulo": "Problema recorrente na plataforma - cliente relata erro há vários dias",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13073",
          "titulo": "Busca de contatos retorna resultados diferentes para usuários com mesmas permissões",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13074",
          "titulo": "Bot não direcionou chat para o atendente correto mesmo com escolha do cliente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13072",
          "titulo": "Registros simples não estão chegando - dados não são recebidos pelo cliente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13063",
          "titulo": "Sincronização de chats não funciona - cliente não aparece na carteira",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13069",
          "titulo": "Etiquetas não aparecem na nova interface - cliente não encontra etiqueta 'SPAM'",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13062",
          "titulo": "Conversa de um cliente aparece na tela de outro cliente ao alternar chats",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13055",
          "titulo": "Conversa não libera campo de digitação quando cliente responde",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13049",
          "titulo": "Cliente reporta múltiplos erros: etiquetas, integração de pagamentos, horário e bot",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13023",
          "titulo": "Usuários não-gestores não conseguem consultar contatos de outros departamentos após atualização",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13009",
          "titulo": "PDF enviado por cliente aparece apenas como texto 'PDF' sem o arquivo anexado",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12976",
          "titulo": "Múltiplos problemas persistentes reportados pelo cliente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12966",
          "titulo": "Erro ao mover contatos no funil - afeta todos os contatos",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12955",
          "titulo": "Filtro de conversas não retorna todos os contatos atribuídos ao operador",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12952",
          "titulo": "Arquivos CSV enviados são convertidos para TXT ao serem recebidos pelo cliente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12950",
          "titulo": "Problema técnico não resolvido há mais de 20 dias - cliente aguardando resposta",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12956",
          "titulo": "Mensagens enviadas para um contato estão indo para outro destinatário",
          "tipo": "🎫 N1 Bug · Medium"
        }
      ]
    },
    {
      "modulo": "WebSocket / Presença",
      "total": 8.1,
      "tec": 5,
      "usr": 3.1,
      "bugs_n1": 21,
      "nivel": "MÉDIO",
      "cor": "#F59E0B",
      "sentryDelta": 0,
      "delta": 0,
      "bugs_cards": [
        {
          "id": "SM-13256",
          "titulo": "Atualização de mensagens em tempo real não está funcionando",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13151",
          "titulo": "Mensagens de clientes não aparecem em tempo real, só após atualizar a página",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13117",
          "titulo": "Chats ficam sem atribuição de atendente quando operadores estão offline",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12345",
          "titulo": "Status de usuários mostrando offline incorretamente quando estão online",
          "tipo": "🎫 N1 Bug · Medium"
        }
      ]
    },
    {
      "modulo": "Upload / Mídia",
      "total": 6.1,
      "tec": 4,
      "usr": 2.1,
      "bugs_n1": 30,
      "nivel": "MÉDIO",
      "cor": "#F59E0B",
      "sentryDelta": 0,
      "delta": 0,
      "bugs_cards": [
        {
          "id": "SM-13009",
          "titulo": "PDF enviado por cliente aparece apenas como texto 'PDF' sem o arquivo anexado",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12931",
          "titulo": "Bug visual reportado pelo cliente via vídeo",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12857",
          "titulo": "Bug visual ou funcional reportado pelo cliente (imagem enviada)",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12780",
          "titulo": "Imagem não aparece no template aprovado - exibição inconsistente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12739",
          "titulo": "Arquivos grandes (PDF/imagem) não chegam na plataforma",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12312",
          "titulo": "Áudio fica carregando e não chega para o cliente",
          "tipo": "🎫 N1 Bug · Medium"
        }
      ]
    },
    {
      "modulo": "Relatórios / SLA",
      "total": 5.7,
      "tec": 0,
      "usr": 5.7,
      "bugs_n1": 15,
      "nivel": "ATENÇÃO",
      "cor": "#F97316",
      "sentryDelta": 0,
      "delta": 0,
      "bugs_cards": [
        {
          "id": "SM-13199",
          "titulo": "Dashboard do CRM não atualiza valores preenchidos",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13052",
          "titulo": "Relatório de detalhes de consumo de mensagens não exibe informações",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12632",
          "titulo": "Dashboard do CRM não atualiza - valores permanecem zerados",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12382",
          "titulo": "Dados do dashboard estão quebrados/fragmentados",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12292",
          "titulo": "Relatório de créditos não exibe quantidade disponível - mostra 0 mesmo tendo 1250 créditos",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12251",
          "titulo": "Relatório de análise de operador instável - exibe vazio para supervisores e gestores",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12246",
          "titulo": "Divergência nos dados do relatório gerando insegurança no cliente",
          "tipo": "🎫 N1 Bug · Medium"
        }
      ]
    },
    {
      "modulo": "Permissões / Roles",
      "total": 5.2,
      "tec": 2,
      "usr": 3.2,
      "bugs_n1": 58,
      "nivel": "ATENÇÃO",
      "cor": "#F97316",
      "sentryDelta": 0,
      "delta": 0,
      "bugs_cards": [
        {
          "id": "SM-13274",
          "titulo": "Conta suspensa não libera acesso após baixa de pagamento",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12955",
          "titulo": "Filtro de conversas não retorna todos os contatos atribuídos ao operador",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12828",
          "titulo": "Supervisor não consegue pesquisar clientes enquanto operador com menos privilégios consegue",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12850",
          "titulo": "Operador de chat sem acesso a campanha mesmo após liberação",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12841",
          "titulo": "Acesso ao CRM desativado sem motivo aparente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12807",
          "titulo": "Erro de acesso para usuário gestor",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12785",
          "titulo": "Cliente sem acesso ao Flow desde 01/07",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12752",
          "titulo": "Usuária gestora sem acesso às configurações e templates",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12679",
          "titulo": "BM (Business Manager) com problema impedindo impulsionamento de marketing",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12512",
          "titulo": "Conta WABA bloqueada pela Meta - restrição de envio de mensagens",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12488",
          "titulo": "Fila não reflete a última mensagem enviada - gestor não vê respostas dos atendentes",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12468",
          "titulo": "Foto do perfil do WhatsApp não aparece para alguns contatos",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12401",
          "titulo": "Usuária gestora sem acesso ao CRM - necessário liberar acesso novamente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12395",
          "titulo": "Usuário sem permissão para acessar aba de canais",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12358",
          "titulo": "Chats encaminhados não sobem para o topo da lista do operador destino",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12308",
          "titulo": "Cliente sem acesso a recurso desde o início - problema recorrente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12294",
          "titulo": "Atendente com acesso restrito consegue visualizar contatos e histórico de outros atendentes",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12251",
          "titulo": "Relatório de análise de operador instável - exibe vazio para supervisores e gestores",
          "tipo": "🎫 N1 Bug · Medium"
        }
      ]
    },
    {
      "modulo": "Disparos / Campanhas",
      "total": 4,
      "tec": 1,
      "usr": 3,
      "bugs_n1": 41,
      "nivel": "ATENÇÃO",
      "cor": "#F97316",
      "sentryDelta": 0,
      "delta": 0,
      "bugs_cards": [
        {
          "id": "SM-13130",
          "titulo": "Lead não foi distribuído para atendimento após responder disparo",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13128",
          "titulo": "Chat some/desaparece após disparo no meio da conversa",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13127",
          "titulo": "Disparos manuais realizados sumiram - sem retorno desde 06/07",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12850",
          "titulo": "Operador de chat sem acesso a campanha mesmo após liberação",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12637",
          "titulo": "Bot de disparo não estava encaminhando conversas corretamente",
          "tipo": "🎫 N1 Bug · Medium"
        }
      ]
    },
    {
      "modulo": "Integrações Externas",
      "total": 3.3,
      "tec": 0,
      "usr": 3.3,
      "bugs_n1": 26,
      "nivel": "ATENÇÃO",
      "cor": "#F97316",
      "sentryDelta": 0,
      "delta": 0,
      "bugs_cards": [
        {
          "id": "SM-13199",
          "titulo": "Dashboard do CRM não atualiza valores preenchidos",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13049",
          "titulo": "Cliente reporta múltiplos erros: etiquetas, integração de pagamentos, horário e bot",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12841",
          "titulo": "Acesso ao CRM desativado sem motivo aparente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12655",
          "titulo": "Erro ao criar oportunidade no CRM ao mudar de funil",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12632",
          "titulo": "Dashboard do CRM não atualiza - valores permanecem zerados",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12603",
          "titulo": "CRM não abria corretamente para o cliente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12549",
          "titulo": "Integração Poli Pay/Mercado Pago não aparece no painel de conversas",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12472",
          "titulo": "CRM não funcionou por mais de 1 mês",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12401",
          "titulo": "Usuária gestora sem acesso ao CRM - necessário liberar acesso novamente",
          "tipo": "🎫 N1 Bug · Medium"
        }
      ]
    }
  ],
  "cobertura": [
    {
      "modulo": "Chat / Mensagens",
      "pressao": 0,
      "atencao": 0,
      "gap": 0,
      "zona": "Balanceada"
    },
    {
      "modulo": "Canais",
      "pressao": 0,
      "atencao": 0,
      "gap": 0,
      "zona": "Balanceada"
    },
    {
      "modulo": "Jarvis / IA",
      "pressao": 0,
      "atencao": 0,
      "gap": 0,
      "zona": "Balanceada"
    },
    {
      "modulo": "Contatos",
      "pressao": 0,
      "atencao": 0,
      "gap": 0,
      "zona": "Balanceada"
    },
    {
      "modulo": "Distribuição / Filas",
      "pressao": 0,
      "atencao": 0,
      "gap": 0,
      "zona": "Balanceada"
    },
    {
      "modulo": "Autenticação",
      "pressao": 0,
      "atencao": 0,
      "gap": 0,
      "zona": "Balanceada"
    },
    {
      "modulo": "Upload / Mídia",
      "pressao": 0,
      "atencao": 0,
      "gap": 0,
      "zona": "Balanceada"
    },
    {
      "modulo": "WebSocket / Presença",
      "pressao": 0,
      "atencao": 0,
      "gap": 0,
      "zona": "Balanceada"
    },
    {
      "modulo": "Permissões / Roles",
      "pressao": 0,
      "atencao": 0,
      "gap": 0,
      "zona": "Balanceada"
    },
    {
      "modulo": "Configurações",
      "pressao": 0,
      "atencao": 0,
      "gap": 0,
      "zona": "Balanceada"
    },
    {
      "modulo": "Relatórios / SLA",
      "pressao": 0,
      "atencao": 0,
      "gap": 0,
      "zona": "Balanceada"
    },
    {
      "modulo": "Integrações Externas",
      "pressao": 0,
      "atencao": 0,
      "gap": 0,
      "zona": "Balanceada"
    },
    {
      "modulo": "Disparos / Campanhas",
      "pressao": 0,
      "atencao": 0,
      "gap": 0,
      "zona": "Balanceada"
    }
  ],
  "tendencia": [
    {
      "modulo": "Chat / Mensagens",
      "delta": 0,
      "ontem": 0,
      "hoje": 23.8
    },
    {
      "modulo": "Autenticação",
      "delta": 0,
      "ontem": 0,
      "hoje": 20.8
    },
    {
      "modulo": "Distribuição / Filas",
      "delta": 0,
      "ontem": 0,
      "hoje": 19.7
    },
    {
      "modulo": "Canais",
      "delta": 0,
      "ontem": 0,
      "hoje": 19
    },
    {
      "modulo": "Jarvis / IA",
      "delta": 0,
      "ontem": 0,
      "hoje": 12.3
    },
    {
      "modulo": "Configurações",
      "delta": 0,
      "ontem": 0,
      "hoje": 10.9
    },
    {
      "modulo": "Contatos",
      "delta": 0,
      "ontem": 0,
      "hoje": 10.3
    },
    {
      "modulo": "WebSocket / Presença",
      "delta": 0,
      "ontem": 0,
      "hoje": 8.1
    },
    {
      "modulo": "Upload / Mídia",
      "delta": 0,
      "ontem": 0,
      "hoje": 6.1
    },
    {
      "modulo": "Relatórios / SLA",
      "delta": 0,
      "ontem": 0,
      "hoje": 5.7
    },
    {
      "modulo": "Permissões / Roles",
      "delta": 0,
      "ontem": 0,
      "hoje": 5.2
    },
    {
      "modulo": "Disparos / Campanhas",
      "delta": 0,
      "ontem": 0,
      "hoje": 4
    },
    {
      "modulo": "Integrações Externas",
      "delta": 0,
      "ontem": 0,
      "hoje": 3.3
    }
  ],
  "bugDistribuicao": [
    {
      "label": "Sem corretivo planejado",
      "valor": 5,
      "cor": "#EF4444"
    },
    {
      "label": "Com corretivo ativo",
      "valor": 8,
      "cor": "#F59E0B"
    },
    {
      "label": "Crônicos / não-técnicos",
      "valor": 0,
      "cor": "#475569"
    }
  ],
  "servicos": [
    {
      "icone": "💬",
      "nome": "Chat / Mensagens",
      "apelido": "Chat",
      "alias": "",
      "risco": "CRÍTICO",
      "confianca": "Alta",
      "bugs_atribuidos": 316,
      "descricao": "Serviço com 316 sinais de problemas (301 N1 + 15 Sentry). 9 cards em desenvolvimento.",
      "modulos": [
        "Chat"
      ],
      "sinais": [
        "→ SM · 301 bugs N1 abertos",
        "→ Sentry · 15 erros ativos",
        "→ Risco técnico · +10pts",
        "→ Dev · 9 cards em andamento"
      ]
    },
    {
      "icone": "🔐",
      "nome": "Autenticação",
      "apelido": "Autenticação",
      "alias": "",
      "risco": "CRÍTICO",
      "confianca": "Alta",
      "bugs_atribuidos": 34,
      "descricao": "Serviço com 34 sinais de problemas (12 N1 + 22 Sentry). 0 cards em desenvolvimento.",
      "modulos": [
        "Autenticação"
      ],
      "sinais": [
        "→ SM · 12 bugs N1 abertos",
        "→ Sentry · 22 erros ativos",
        "→ Risco técnico · +16pts"
      ]
    },
    {
      "icone": "⚖️",
      "nome": "Distribuição / Filas",
      "apelido": "Distribuição",
      "alias": "",
      "risco": "CRÍTICO",
      "confianca": "Alta",
      "bugs_atribuidos": 67,
      "descricao": "Serviço com 67 sinais de problemas (57 N1 + 10 Sentry). 2 cards em desenvolvimento.",
      "modulos": [
        "Distribuição"
      ],
      "sinais": [
        "→ SM · 57 bugs N1 abertos",
        "→ Sentry · 10 erros ativos",
        "→ Risco técnico · +11pts",
        "→ Dev · 2 cards em andamento"
      ]
    },
    {
      "icone": "📡",
      "nome": "Canais",
      "apelido": "Canais",
      "alias": "",
      "risco": "ALTO",
      "confianca": "Alta",
      "bugs_atribuidos": 156,
      "descricao": "Serviço com 156 sinais de problemas (141 N1 + 15 Sentry). 8 cards em desenvolvimento.",
      "modulos": [
        "Canais"
      ],
      "sinais": [
        "→ SM · 141 bugs N1 abertos",
        "→ Sentry · 15 erros ativos",
        "→ Risco técnico · +9pts",
        "→ Dev · 8 cards em andamento"
      ]
    },
    {
      "icone": "🤖",
      "nome": "Jarvis / IA",
      "apelido": "Jarvis",
      "alias": "",
      "risco": "ALTO",
      "confianca": "Alta",
      "bugs_atribuidos": 72,
      "descricao": "Serviço com 72 sinais de problemas (57 N1 + 15 Sentry). 1 cards em desenvolvimento.",
      "modulos": [
        "Jarvis"
      ],
      "sinais": [
        "→ SM · 57 bugs N1 abertos",
        "→ Sentry · 15 erros ativos",
        "→ Risco técnico · +8pts",
        "→ Dev · 1 cards em andamento"
      ]
    },
    {
      "icone": "⚙️",
      "nome": "Configurações",
      "apelido": "Configurações",
      "alias": "",
      "risco": "MÉDIO",
      "confianca": "Alta",
      "bugs_atribuidos": 152,
      "descricao": "Serviço com 152 sinais de problemas (152 N1 + 0 Sentry). 3 cards em desenvolvimento.",
      "modulos": [
        "Configurações"
      ],
      "sinais": [
        "→ SM · 152 bugs N1 abertos",
        "→ Risco técnico · +1pts",
        "→ Dev · 3 cards em andamento"
      ]
    },
    {
      "icone": "👤",
      "nome": "Contatos",
      "apelido": "Contatos",
      "alias": "",
      "risco": "MÉDIO",
      "confianca": "Alta",
      "bugs_atribuidos": 246,
      "descricao": "Serviço com 246 sinais de problemas (246 N1 + 0 Sentry). 4 cards em desenvolvimento.",
      "modulos": [
        "Contatos"
      ],
      "sinais": [
        "→ SM · 246 bugs N1 abertos",
        "→ Dev · 4 cards em andamento"
      ]
    },
    {
      "icone": "🔌",
      "nome": "WebSocket / Presença",
      "apelido": "WebSocket",
      "alias": "",
      "risco": "ALTO",
      "confianca": "Alta",
      "bugs_atribuidos": 22,
      "descricao": "Serviço com 22 sinais de problemas (21 N1 + 1 Sentry). 1 cards em desenvolvimento.",
      "modulos": [
        "WebSocket"
      ],
      "sinais": [
        "→ SM · 21 bugs N1 abertos",
        "→ Sentry · 1 erros ativos",
        "→ Risco técnico · +5pts",
        "→ Dev · 1 cards em andamento"
      ]
    }
  ],
  "servicos_radar": [
    {
      "nome": "Chat / Mensagens",
      "apelido": "Chat",
      "alias": "",
      "bugs": 316,
      "bugs_n1": 301,
      "bugs_sentry": 15,
      "dev_ativo": 9,
      "dev_planejado": 14,
      "score_tec": 10,
      "notas": {
        "bugs": "",
        "ativo": "",
        "planejado": ""
      },
      "bugs_cards": [
        {
          "id": "SM-13299",
          "titulo": "Mensagens caindo para unidade errada - conflito entre lojas Americana e Campinas",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13303",
          "titulo": "Cliente bloqueado ao tentar enviar templates aprovados",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13302",
          "titulo": "Mensagens do final de semana com janelas fechadas - problema recorrente há 1 mês",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13286",
          "titulo": "Atraso no recebimento de mensagens - mensagens chegando com 20 minutos de delay",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13292",
          "titulo": "Mensagens não são enviadas sem exibir erro",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13281",
          "titulo": "Cliente final não consegue responder mensagens via QR Code do WhatsApp API",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13276",
          "titulo": "Mensagens agendadas não estão sendo enviadas para grupo desde 14/07",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13265",
          "titulo": "Mensagens não aparecem na conversa nem notificam - necessário atualizar manualmente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13256",
          "titulo": "Atualização de mensagens em tempo real não está funcionando",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13255",
          "titulo": "Mensagens não estão ficando na aba correta - indo para 'Todas as mensagens' em vez de 'Sem atendente'",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13246",
          "titulo": "Template aprovado no Meta mas não permite envio de mensagem",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13226",
          "titulo": "Mensagens não aparecem na plataforma mesmo com atendente disponível",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13240",
          "titulo": "Mensagens e imagens não chegam ou chegam com grande atraso em diferentes máquinas",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13206",
          "titulo": "Erro no app mobile ao digitar mensagens - tela de aviso aparecendo repetidamente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13188",
          "titulo": "App mobile exibe mensagem de tempo esgotado mesmo em uso",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13187",
          "titulo": "Mensagens não estão sendo enviadas pelo canal WhatsApp",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13182",
          "titulo": "Mensagens não estão chegando na plataforma",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13173",
          "titulo": "Conversas trocadas entre clientes - mensagens aparecem em chats errados",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13164",
          "titulo": "Mensagens de clientes chegando com grande atraso (até 1 hora de delay)",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13165",
          "titulo": "Não consegue enviar mensagens nem transferir atendimento para contato específico",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13146",
          "titulo": "Sincronia de chats: última mensagem exibida é sempre a do cliente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13154",
          "titulo": "Chat ficou preso na fila de atendimento após solicitação atendida",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13151",
          "titulo": "Mensagens de clientes não aparecem em tempo real, só após atualizar a página",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13143",
          "titulo": "Conversas se misturando entre clientes diferentes",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13141",
          "titulo": "Duplicidade de contatos na mesma conversa travando recebimento de mensagens",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13140",
          "titulo": "Mensagens de clientes só aparecem após atualizar a página manualmente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13137",
          "titulo": "Mensagens não sincronizam automaticamente - necessário F5 constante",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13132",
          "titulo": "Mensagens de clientes não chegam ou demoram para chegar na plataforma",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13128",
          "titulo": "Chat some/desaparece após disparo no meio da conversa",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13105",
          "titulo": "Lentidão e travamento ao enviar mensagens/áudios na plataforma",
          "tipo": "🎫 N1 Bug · Medium"
        }
      ],
      "dev_ativo_items": [],
      "dev_planejado_items": [],
      "score_tec_itens": []
    },
    {
      "nome": "Autenticação",
      "apelido": "Autenticação",
      "alias": "",
      "bugs": 34,
      "bugs_n1": 12,
      "bugs_sentry": 22,
      "dev_ativo": 0,
      "dev_planejado": 0,
      "score_tec": 16,
      "notas": {
        "bugs": "",
        "ativo": "",
        "planejado": ""
      },
      "bugs_cards": [
        {
          "id": "SM-13313",
          "titulo": "Loading infinito ao tentar fazer login na plataforma",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13030",
          "titulo": "Senha da Poli não funciona - problemas recorrentes de login",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12879",
          "titulo": "Cliente não consegue acessar conta - senha inválida e recuperação não chega no e-mail",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12733",
          "titulo": "App mobile exige login frequente e mostra conversas como expiradas (24h)",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12576",
          "titulo": "Gargalo na liberação de login por parte da Meta",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12367",
          "titulo": "Mensagens aparecem em um login de atendente e não aparecem em outro",
          "tipo": "🎫 N1 Bug · Medium"
        }
      ],
      "dev_ativo_items": [],
      "dev_planejado_items": [],
      "score_tec_itens": []
    },
    {
      "nome": "Distribuição / Filas",
      "apelido": "Distribuição",
      "alias": "",
      "bugs": 67,
      "bugs_n1": 57,
      "bugs_sentry": 10,
      "dev_ativo": 2,
      "dev_planejado": 9,
      "score_tec": 11,
      "notas": {
        "bugs": "",
        "ativo": "",
        "planejado": ""
      },
      "bugs_cards": [
        {
          "id": "SM-13259",
          "titulo": "Chats atribuídos não aparecem na tela do atendente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13255",
          "titulo": "Mensagens não estão ficando na aba correta - indo para 'Todas as mensagens' em vez de 'Sem atendente'",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13226",
          "titulo": "Mensagens não aparecem na plataforma mesmo com atendente disponível",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13218",
          "titulo": "Chats não são distribuídos para atendentes e ficam em 'Sem atendente'",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13154",
          "titulo": "Chat ficou preso na fila de atendimento após solicitação atendida",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13117",
          "titulo": "Chats ficam sem atribuição de atendente quando operadores estão offline",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13102",
          "titulo": "Chats atribuídos não aparecem na aba 'Atribuídos a mim' para atendente específica",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13082",
          "titulo": "Operadora deslogada recebendo distribuição de chats",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13076",
          "titulo": "Chats encerrados permanecem na fila de atendimento e reaparecem como não lidos",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13074",
          "titulo": "Bot não direcionou chat para o atendente correto mesmo com escolha do cliente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12940",
          "titulo": "Distribuição de chats desigual - alguns atendentes não recebem direcionamentos",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12914",
          "titulo": "Mensagens marcadas (reply) não aparecem para o atendente na plataforma",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12897",
          "titulo": "Mensagens sem atendente não aparecem na aba correta - ficam apenas em 'Todas as mensagens'",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12913",
          "titulo": "Mensagens não chegam para o atendente sem atualizar a página",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12823",
          "titulo": "Atendente consegue visualizar clientes de outros atendentes",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12676",
          "titulo": "Distribuição de chats não funciona - mensagens chegam apenas para um atendente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12660",
          "titulo": "Sincronização de chats não atualiza na fila lateral",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12670",
          "titulo": "Fila não mostra última mensagem enviada",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12627",
          "titulo": "Chats enviados manualmente não aparecem em nenhuma aba para o atendente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12610",
          "titulo": "Conversas acumulando sem distribuição automática para atendente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12526",
          "titulo": "Clientes caindo no broker sem atendente disponível",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12488",
          "titulo": "Fila não reflete a última mensagem enviada - gestor não vê respostas dos atendentes",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12390",
          "titulo": "Distribuição de chats não funciona corretamente - atendentes não recebem novos chats",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12367",
          "titulo": "Mensagens aparecem em um login de atendente e não aparecem em outro",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12339",
          "titulo": "Conversas antigas acumuladas na aba 'sem atendente' sem distribuição",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12338",
          "titulo": "Erro na entrega de mensagens com pico de atividade na fila da Meta",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12306",
          "titulo": "Robô não direciona mensagens automaticamente para nova atendente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12294",
          "titulo": "Atendente com acesso restrito consegue visualizar contatos e histórico de outros atendentes",
          "tipo": "🎫 N1 Bug · Medium"
        }
      ],
      "dev_ativo_items": [],
      "dev_planejado_items": [],
      "score_tec_itens": []
    },
    {
      "nome": "Canais",
      "apelido": "Canais",
      "alias": "",
      "bugs": 156,
      "bugs_n1": 141,
      "bugs_sentry": 15,
      "dev_ativo": 8,
      "dev_planejado": 8,
      "score_tec": 9,
      "notas": {
        "bugs": "",
        "ativo": "",
        "planejado": ""
      },
      "bugs_cards": [
        {
          "id": "SM-13289",
          "titulo": "Bot do Instagram quebrado e com inconsistência",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13281",
          "titulo": "Cliente final não consegue responder mensagens via QR Code do WhatsApp API",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13223",
          "titulo": "WhatsApp do cliente com bug - possível bloqueio por comportamento de spam",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13187",
          "titulo": "Mensagens não estão sendo enviadas pelo canal WhatsApp",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13107",
          "titulo": "Lentidão no envio e recebimento de mensagens via API Oficial",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13001",
          "titulo": "Canal WhatsApp restrito não conecta mesmo após trocar para Messenger",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12892",
          "titulo": "Opção de adicionar canal WhatsApp Broker (não oficial) não aparecia para o cliente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12816",
          "titulo": "Erro 'Destinatário não alcançado' ao enviar templates de WhatsApp",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12790",
          "titulo": "Canais aparecem como desconectados na plataforma",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12773",
          "titulo": "Canais desconectam ao alterar período de teste da conta",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12730",
          "titulo": "Meta não finalizou processo de conexão do canal mesmo após conexão realizada",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12706",
          "titulo": "WhatsApp não estava recebendo mensagens dos clientes",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12512",
          "titulo": "Conta WABA bloqueada pela Meta - restrição de envio de mensagens",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12525",
          "titulo": "Canal de envio alterando automaticamente e impedindo envio de templates",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12508",
          "titulo": "Cliente não consegue migrar canais para WhatsApp Web",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12492",
          "titulo": "Canal WhatsApp QR Code com problema de conexão - relógio aparecendo",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12468",
          "titulo": "Foto do perfil do WhatsApp não aparece para alguns contatos",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12458",
          "titulo": "Número aparece como não registrado no WhatsApp para os clientes",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12395",
          "titulo": "Usuário sem permissão para acessar aba de canais",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12380",
          "titulo": "Automação do Instagram Direct não está disparando mensagens",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12321",
          "titulo": "Canal bloqueado/banido pela Meta - cliente sem uso do Polichat há 2 dias",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12295",
          "titulo": "Lentidão e mensagens ficando com relógio (pendentes) - canal WABA",
          "tipo": "🎫 N1 Bug · Medium"
        }
      ],
      "dev_ativo_items": [],
      "dev_planejado_items": [],
      "score_tec_itens": []
    },
    {
      "nome": "Jarvis / IA",
      "apelido": "Jarvis",
      "alias": "",
      "bugs": 72,
      "bugs_n1": 57,
      "bugs_sentry": 15,
      "dev_ativo": 1,
      "dev_planejado": 1,
      "score_tec": 8,
      "notas": {
        "bugs": "",
        "ativo": "",
        "planejado": ""
      },
      "bugs_cards": [
        {
          "id": "SM-13289",
          "titulo": "Bot do Instagram quebrado e com inconsistência",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13089",
          "titulo": "Bot não inicia para alguns contatos/números específicos",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13101",
          "titulo": "Bot não está transferindo chats para atendentes - clientes aguardando desde o dia anterior",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13079",
          "titulo": "Conversas não exibem indicador de não lidas após transferência do bot",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13074",
          "titulo": "Bot não direcionou chat para o atendente correto mesmo com escolha do cliente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13049",
          "titulo": "Cliente reporta múltiplos erros: etiquetas, integração de pagamentos, horário e bot",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12997",
          "titulo": "Chatbot ficou fora do ar por aproximadamente 4 horas",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12981",
          "titulo": "Problema com automação/bot não funcionando corretamente para usuário específico",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12953",
          "titulo": "Chats não são distribuídos para atendentes após finalizar fluxo do bot",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12911",
          "titulo": "Bot com informações inconsistentes após edição não autorizada",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12872",
          "titulo": "Contatos não estão sendo capturados corretamente pelo bot",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12798",
          "titulo": "Bot encerrando chats fora do horário de expediente incorretamente para todos os setores",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12663",
          "titulo": "Bot encerrando conversas mesmo com cliente interagindo para atendimento humano",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12637",
          "titulo": "Bot de disparo não estava encaminhando conversas corretamente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12622",
          "titulo": "Bot não distribui chats corretamente - clientes de Campinas não direcionados",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12560",
          "titulo": "Cliente não recebeu menu do bot e não foi direcionado para nenhum setor",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12530",
          "titulo": "Opção 12 (Indaiatuba) não exibe pontos de venda no bot",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12504",
          "titulo": "Problema com bot em investigação - cliente aguardando retorno",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12380",
          "titulo": "Automação do Instagram Direct não está disparando mensagens",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12322",
          "titulo": "Bot com funcionamento intermitente - às vezes funciona, às vezes não",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12306",
          "titulo": "Robô não direciona mensagens automaticamente para nova atendente",
          "tipo": "🎫 N1 Bug · Medium"
        }
      ],
      "dev_ativo_items": [],
      "dev_planejado_items": [],
      "score_tec_itens": []
    },
    {
      "nome": "Configurações",
      "apelido": "Configurações",
      "alias": "",
      "bugs": 152,
      "bugs_n1": 152,
      "bugs_sentry": 0,
      "dev_ativo": 3,
      "dev_planejado": 3,
      "score_tec": 1,
      "notas": {
        "bugs": "",
        "ativo": "",
        "planejado": ""
      },
      "bugs_cards": [
        {
          "id": "SM-13303",
          "titulo": "Cliente bloqueado ao tentar enviar templates aprovados",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13274",
          "titulo": "Conta suspensa não libera acesso após baixa de pagamento",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13246",
          "titulo": "Template aprovado no Meta mas não permite envio de mensagem",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13081",
          "titulo": "Bug de templates e botões não aparecendo no chat",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13047",
          "titulo": "Templates enviados não aparecem nas conversas após envio",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13049",
          "titulo": "Cliente reporta múltiplos erros: etiquetas, integração de pagamentos, horário e bot",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12995",
          "titulo": "Créditos não aparecem na conta mesmo após limpeza de cache",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12947",
          "titulo": "Operações travadas ao usar template aprovado - mensagens não sendo enviadas",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12930",
          "titulo": "Template aparecendo antes das 24h mesmo com cliente respondendo recentemente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12879",
          "titulo": "Cliente não consegue acessar conta - senha inválida e recuperação não chega no e-mail",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12838",
          "titulo": "Conversas com template enviado não aparecem na lista mesmo com filtro 'todas as conversas'",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12816",
          "titulo": "Erro 'Destinatário não alcançado' ao enviar templates de WhatsApp",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12798",
          "titulo": "Bot encerrando chats fora do horário de expediente incorretamente para todos os setores",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12780",
          "titulo": "Imagem não aparece no template aprovado - exibição inconsistente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12773",
          "titulo": "Canais desconectam ao alterar período de teste da conta",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12752",
          "titulo": "Usuária gestora sem acesso às configurações e templates",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12734",
          "titulo": "Erro ao enviar template para iniciar conversa",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12724",
          "titulo": "Template não envia em conversas com mais de 24h - sem erro exibido",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12664",
          "titulo": "Variáveis sumiram dos templates após mudança de layout",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12658",
          "titulo": "Falha no envio de templates para números internacionais",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12548",
          "titulo": "Sistema exibindo horário errado e enviando mensagem de indisponibilidade incorretamente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12512",
          "titulo": "Conta WABA bloqueada pela Meta - restrição de envio de mensagens",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12525",
          "titulo": "Canal de envio alterando automaticamente e impedindo envio de templates",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12457",
          "titulo": "Erro ao enviar mensagens via template para múltiplos contatos",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12452",
          "titulo": "Créditos comprados não foram liberados na conta do cliente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12373",
          "titulo": "Não era possível selecionar item da lista de templates",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12370",
          "titulo": "Erro ao criar/salvar templates de mensagem",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12243",
          "titulo": "Template de mensagem exibindo conteúdo incompleto na visualização da Poli",
          "tipo": "🎫 N1 Bug · Medium"
        }
      ],
      "dev_ativo_items": [],
      "dev_planejado_items": [],
      "score_tec_itens": []
    },
    {
      "nome": "Contatos",
      "apelido": "Contatos",
      "alias": "",
      "bugs": 246,
      "bugs_n1": 246,
      "bugs_sentry": 0,
      "dev_ativo": 4,
      "dev_planejado": 5,
      "score_tec": 0,
      "notas": {
        "bugs": "",
        "ativo": "",
        "planejado": ""
      },
      "bugs_cards": [
        {
          "id": "SM-13306",
          "titulo": "Erro reportado pelo cliente - em análise pela equipe de desenvolvimento",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13303",
          "titulo": "Cliente bloqueado ao tentar enviar templates aprovados",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13281",
          "titulo": "Cliente final não consegue responder mensagens via QR Code do WhatsApp API",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13276",
          "titulo": "Mensagens agendadas não estão sendo enviadas para grupo desde 14/07",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13223",
          "titulo": "WhatsApp do cliente com bug - possível bloqueio por comportamento de spam",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13221",
          "titulo": "Nome do contato não aparece na plataforma",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13216",
          "titulo": "Cliente não consegue acessar a plataforma",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13172",
          "titulo": "Notificações no navegador não chegam para todos os contatos ou chegam com delay",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13165",
          "titulo": "Não consegue enviar mensagens nem transferir atendimento para contato específico",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13162",
          "titulo": "Lentidão na plataforma reportada pelo cliente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13146",
          "titulo": "Sincronia de chats: última mensagem exibida é sempre a do cliente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13141",
          "titulo": "Duplicidade de contatos na mesma conversa travando recebimento de mensagens",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13089",
          "titulo": "Bot não inicia para alguns contatos/números específicos",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13100",
          "titulo": "Problema recorrente na plataforma - cliente relata erro há vários dias",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13073",
          "titulo": "Busca de contatos retorna resultados diferentes para usuários com mesmas permissões",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13074",
          "titulo": "Bot não direcionou chat para o atendente correto mesmo com escolha do cliente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13072",
          "titulo": "Registros simples não estão chegando - dados não são recebidos pelo cliente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13063",
          "titulo": "Sincronização de chats não funciona - cliente não aparece na carteira",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13069",
          "titulo": "Etiquetas não aparecem na nova interface - cliente não encontra etiqueta 'SPAM'",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13062",
          "titulo": "Conversa de um cliente aparece na tela de outro cliente ao alternar chats",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13055",
          "titulo": "Conversa não libera campo de digitação quando cliente responde",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13049",
          "titulo": "Cliente reporta múltiplos erros: etiquetas, integração de pagamentos, horário e bot",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13023",
          "titulo": "Usuários não-gestores não conseguem consultar contatos de outros departamentos após atualização",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13009",
          "titulo": "PDF enviado por cliente aparece apenas como texto 'PDF' sem o arquivo anexado",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12976",
          "titulo": "Múltiplos problemas persistentes reportados pelo cliente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12966",
          "titulo": "Erro ao mover contatos no funil - afeta todos os contatos",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12955",
          "titulo": "Filtro de conversas não retorna todos os contatos atribuídos ao operador",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12952",
          "titulo": "Arquivos CSV enviados são convertidos para TXT ao serem recebidos pelo cliente",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12950",
          "titulo": "Problema técnico não resolvido há mais de 20 dias - cliente aguardando resposta",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12956",
          "titulo": "Mensagens enviadas para um contato estão indo para outro destinatário",
          "tipo": "🎫 N1 Bug · Medium"
        }
      ],
      "dev_ativo_items": [],
      "dev_planejado_items": [],
      "score_tec_itens": []
    },
    {
      "nome": "WebSocket / Presença",
      "apelido": "WebSocket",
      "alias": "",
      "bugs": 22,
      "bugs_n1": 21,
      "bugs_sentry": 1,
      "dev_ativo": 1,
      "dev_planejado": 0,
      "score_tec": 5,
      "notas": {
        "bugs": "",
        "ativo": "",
        "planejado": ""
      },
      "bugs_cards": [
        {
          "id": "SM-13256",
          "titulo": "Atualização de mensagens em tempo real não está funcionando",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13151",
          "titulo": "Mensagens de clientes não aparecem em tempo real, só após atualizar a página",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-13117",
          "titulo": "Chats ficam sem atribuição de atendente quando operadores estão offline",
          "tipo": "🎫 N1 Bug · Medium"
        },
        {
          "id": "SM-12345",
          "titulo": "Status de usuários mostrando offline incorretamente quando estão online",
          "tipo": "🎫 N1 Bug · Medium"
        }
      ],
      "dev_ativo_items": [],
      "dev_planejado_items": [],
      "score_tec_itens": []
    }
  ],
  "bombas": [
    {
      "pos": 1,
      "modulo": "Chat / Mensagens",
      "score": 28.8,
      "situacao": "Score 23.8 (10 tecnico + 13.8 usuarios). 301 tickets SM ativos.",
      "problema": "Score 23.8 (10 tecnico + 13.8 usuarios). 301 tickets SM ativos.",
      "gatilho": "Proximo deploy pode gerar regressao",
      "impacto": "3465 usuarios impactados via Sentry. Sem correcao ativa, o volume de chamados SM tende a crescer.",
      "acao": "Investigar sinais e priorizar correcoes."
    },
    {
      "pos": 2,
      "modulo": "Autenticação",
      "score": 25.8,
      "situacao": "Score 20.8 (16 tecnico + 4.8 usuarios). 12 tickets SM ativos.",
      "problema": "Score 20.8 (16 tecnico + 4.8 usuarios). 12 tickets SM ativos.",
      "gatilho": "Proximo deploy pode gerar regressao",
      "impacto": "2623 usuarios impactados via Sentry. Sem correcao ativa, o volume de chamados SM tende a crescer.",
      "acao": "Investigar sinais e priorizar correcoes."
    },
    {
      "pos": 3,
      "modulo": "Distribuição / Filas",
      "score": 22.7,
      "situacao": "Score 19.7 (11 tecnico + 8.7 usuarios). 57 tickets SM ativos.",
      "problema": "Score 19.7 (11 tecnico + 8.7 usuarios). 57 tickets SM ativos.",
      "gatilho": "Proximo deploy pode gerar regressao",
      "impacto": "5 usuarios impactados via Sentry. Sem correcao ativa, o volume de chamados SM tende a crescer.",
      "acao": "Investigar sinais e priorizar correcoes."
    }
  ],
  "sentry": [
    {
      "erro": "Error: connect ECONNREFUSED 172.20.103.62:3000",
      "projeto": "api-gateway",
      "usuarios": 0,
      "delta": "+0%",
      "status": "unresolved",
      "oculto": true
    },
    {
      "erro": "Error: read ECONNRESET",
      "projeto": "api-gateway",
      "usuarios": 0,
      "delta": "+0%",
      "status": "unresolved",
      "oculto": true
    },
    {
      "erro": "Error: getaddrinfo EAI_AGAIN nectarcrm-integration-service.poli-core-integration-system.svc.cluster.local",
      "projeto": "api-gateway",
      "usuarios": 0,
      "delta": "+0%",
      "status": "unresolved",
      "oculto": true
    },
    {
      "erro": "Error: socket hang up",
      "projeto": "api-gateway",
      "usuarios": 0,
      "delta": "+0%",
      "status": "unresolved",
      "oculto": true
    },
    {
      "erro": "URIError: URI malformed",
      "projeto": "api-gateway",
      "usuarios": 0,
      "delta": "+0%",
      "status": "unresolved",
      "oculto": true
    },
    {
      "erro": "AxiosError: Request failed with status code 504",
      "projeto": "heimdall",
      "usuarios": 0,
      "delta": "+0%",
      "status": "unresolved",
      "oculto": true
    },
    {
      "erro": "SyntaxError: Expected property name or '}' in JSON at position 1",
      "projeto": "heimdall",
      "usuarios": 0,
      "delta": "+0%",
      "status": "unresolved",
      "oculto": true
    },
    {
      "erro": "AxiosError: Request failed with status code 401",
      "projeto": "polichat-spa",
      "usuarios": 1102,
      "delta": "+0%",
      "status": "unresolved",
      "oculto": true
    }
  ],
  "todos_dev_ativos": [
    {
      "id": "DEV4-4655",
      "titulo": "Corrigir bug de mensagens salvas sem chat_id no banco de dados",
      "assignee": "Lineu Felipe Gomes Canha",
      "modulo": "Chat / Mensagens",
      "servico_radar": "Chat",
      "dias_em_andamento": null
    },
    {
      "id": "DEV4-4404",
      "titulo": "Distribuição Listagem e Configuração Padrão",
      "assignee": "Laura Andreuccetti",
      "modulo": "Distribuição / Filas",
      "servico_radar": "Distribuição",
      "dias_em_andamento": null
    },
    {
      "id": "DEV4-4621",
      "titulo": "[foundation-spa] Front: exibição de username/estado de identidade + fluxo Request Contact",
      "assignee": "Arthur K.",
      "modulo": "Canais",
      "servico_radar": "Canais",
      "dias_em_andamento": null
    },
    {
      "id": "DEV4-4620",
      "titulo": "[meta-business-management] Webhook business_username_update (username do negócio)",
      "assignee": "Arthur K.",
      "modulo": "Canais",
      "servico_radar": "Canais",
      "dias_em_andamento": null
    },
    {
      "id": "DEV4-4055",
      "titulo": "[polichat-web-app] Ghost Contacts: contatos sem telefone e preservação de histórico",
      "assignee": "Arthur K.",
      "modulo": "Canais",
      "servico_radar": "Canais",
      "dias_em_andamento": null
    },
    {
      "id": "DEV4-4657",
      "titulo": "[waba-webhook + meta-whatsapp-cloud-api + polichat-web-app] user_id_update — remap de identidade na troca de telefone",
      "assignee": "Arthur K.",
      "modulo": "Canais",
      "servico_radar": "Canais",
      "dias_em_andamento": null
    },
    {
      "id": "DEV4-4336",
      "titulo": "Embed do bot na nova versão",
      "assignee": "Gabriel Henrique",
      "modulo": "Jarvis / IA",
      "servico_radar": "Jarvis",
      "dias_em_andamento": null
    },
    {
      "id": "DEV4-4653",
      "titulo": "Bug: preview da mensagem na listagem de chats não é preenchido para mensagens ativas",
      "assignee": "Guilherme Cruz",
      "modulo": "Chat / Mensagens",
      "servico_radar": "Chat",
      "dias_em_andamento": null
    },
    {
      "id": "DEV4-4619",
      "titulo": "[polichat-web-app] Recebimento legado: consumo de BSUID/username + resolução dual-key + backfill",
      "assignee": "Arthur K.",
      "modulo": "Canais",
      "servico_radar": "Canais",
      "dias_em_andamento": null
    },
    {
      "id": "DEV4-4045",
      "titulo": "[foundation-api] Resolução & merge de identidade (BSUID↔telefone) + Request Phone Number",
      "assignee": "Arthur K.",
      "modulo": "Canais",
      "servico_radar": "Canais",
      "dias_em_andamento": null
    },
    {
      "id": "DEV4-4032",
      "titulo": "[foundation-api] Fundação de identidade: BSUID, estados e resolução (schema Opção B)",
      "assignee": "Arthur K.",
      "modulo": "Canais",
      "servico_radar": "Canais",
      "dias_em_andamento": null
    },
    {
      "id": "DEV4-4633",
      "titulo": "Exibir mensagens do chat agrupadas por atendimento (modo lista × modo atendimento)",
      "assignee": "Gabriel Henrique",
      "modulo": "Chat / Mensagens",
      "servico_radar": "Chat",
      "dias_em_andamento": null
    },
    {
      "id": "DEV4-4454",
      "titulo": "Visualização prévia de template",
      "assignee": "Laura Andreuccetti",
      "modulo": "Configurações",
      "servico_radar": "Configurações",
      "dias_em_andamento": null
    },
    {
      "id": "DEV4-4614",
      "titulo": "Adicionar data-testid em todos os botões da right sidebar",
      "assignee": "Laura Andreuccetti",
      "modulo": null,
      "servico_radar": null,
      "dias_em_andamento": null
    },
    {
      "id": "DEV4-4442",
      "titulo": "Exibir data e horário de redirecionamento na faixa de informação do chat",
      "assignee": "Laura Andreuccetti",
      "modulo": "Chat / Mensagens",
      "servico_radar": "Chat",
      "dias_em_andamento": null
    },
    {
      "id": "DEV4-4622",
      "titulo": "Aviso no frontend quando o websocket cair com opção de recarregar a página",
      "assignee": "Gabriel Henrique",
      "modulo": "WebSocket / Presença",
      "servico_radar": "WebSocket",
      "dias_em_andamento": null
    },
    {
      "id": "DEV4-4249",
      "titulo": "[Nova Interface] Central de arquivos do contato na conversa (Mídias, Documentos e Links)",
      "assignee": "Gabriel Henrique",
      "modulo": "Chat / Mensagens",
      "servico_radar": "Chat",
      "dias_em_andamento": null
    },
    {
      "id": "DEV4-4413",
      "titulo": "Fila de atendimentos para chats sem atendente",
      "assignee": "Laura Andreuccetti",
      "modulo": "Distribuição / Filas",
      "servico_radar": "Distribuição",
      "dias_em_andamento": null
    },
    {
      "id": "DEV4-4030",
      "titulo": "[meta-whatsapp-cloud-api] Ingestão: detecção BSUID/telefone + propagação ao legado",
      "assignee": "Arthur K.",
      "modulo": "Canais",
      "servico_radar": "Canais",
      "dias_em_andamento": null
    },
    {
      "id": "DEV4-4450",
      "titulo": "Permitir seleção do texto do balão \"Resumido com IA\" no chat",
      "assignee": "Laura Andreuccetti",
      "modulo": "Chat / Mensagens",
      "servico_radar": "Chat",
      "dias_em_andamento": null
    },
    {
      "id": "DEV4-4611",
      "titulo": "[foundation-api] Sincronizar Tags da Poli com Labels da Triction em CreateTag/UpdateTag",
      "assignee": "Paulo Patrick Buzeli",
      "modulo": null,
      "servico_radar": null,
      "dias_em_andamento": null
    },
    {
      "id": "DEV4-4584",
      "titulo": "Encaminhar mensagens no chat",
      "assignee": "Gabriel Henrique",
      "modulo": "Chat / Mensagens",
      "servico_radar": "Chat",
      "dias_em_andamento": null
    },
    {
      "id": "DEV4-4560",
      "titulo": "Flag de rollout + novos planos no banco + relatório",
      "assignee": "Saulo Daniel",
      "modulo": "Relatórios / SLA",
      "servico_radar": "Relatórios",
      "dias_em_andamento": null
    },
    {
      "id": "DEV4-4577",
      "titulo": "Remover mensagem \"nova versão\" e pesquisa do UserGuiding da nova tela de chats",
      "assignee": "Laura Andreuccetti",
      "modulo": "Chat / Mensagens",
      "servico_radar": "Chat",
      "dias_em_andamento": null
    },
    {
      "id": "DEV4-4608",
      "titulo": "Corrigir marcação indevida de chat como lido ao sair da conversa",
      "assignee": "Gabriel Henrique",
      "modulo": "Chat / Mensagens",
      "servico_radar": "Chat",
      "dias_em_andamento": null
    }
  ],
  "qualidadeProcesso": {
    "bugsReabertos": {
      "total": 0,
      "modulos": []
    },
    "prsPrecipitados": {
      "total": 0,
      "modulos": []
    },
    "stalenessQA": {
      "total": null,
      "modulos": []
    },
    "envFailures": {
      "total": 0,
      "modulos": []
    }
  },
  "prs_perigosos": [
    {
      "repo": "SPA",
      "pr_number": 1596,
      "titulo": "fix(DEV4-4615): Corrigir mensagens misturadas entre chats na troca rápida de conversa",
      "merged_at": "2026-07-16T21:31:12Z",
      "author": "gabrieldesousah",
      "entropy": 4.9,
      "churn_lines": 3258,
      "arquivos": 50,
      "modulos": [
        "Chat / Mensagens",
        "Canais"
      ],
      "risco_cfr": false,
      "bugs_pos_merge": [],
      "sentry_correlacao": []
    },
    {
      "repo": "SPA",
      "pr_number": 1587,
      "titulo": "feat(DEV4-4249): Adicionar central de arquivos do contato na conversa",
      "merged_at": "2026-07-15T16:24:54Z",
      "author": "gabrieldesousah",
      "entropy": 4.9,
      "churn_lines": 3252,
      "arquivos": 50,
      "modulos": [
        "Chat / Mensagens",
        "Canais"
      ],
      "risco_cfr": false,
      "bugs_pos_merge": [],
      "sentry_correlacao": []
    },
    {
      "repo": "FoundationAPI",
      "pr_number": 1211,
      "titulo": "feat(DEV4-4556/4570/4571): motor consumo_novo + tarifário + relatório",
      "merged_at": "2026-07-17T04:03:14Z",
      "author": "allanbzrpoli",
      "entropy": 3.5,
      "churn_lines": 843,
      "arquivos": 14,
      "modulos": [
        "Configurações",
        "Jarvis / IA"
      ],
      "risco_cfr": false,
      "bugs_pos_merge": [],
      "sentry_correlacao": []
    },
    {
      "repo": "FoundationAPI",
      "pr_number": 1208,
      "titulo": "feat(DEV4-4557): Capturar eventos de mensagens em credits_count para todos os canais",
      "merged_at": "2026-07-17T04:02:23Z",
      "author": "allanbzrpoli",
      "entropy": 3.8,
      "churn_lines": 922,
      "arquivos": 32,
      "modulos": [
        "Jarvis / IA",
        "Chat / Mensagens",
        "Configurações",
        "Canais",
        "Integrações Externas",
        "Contatos",
        "Autenticação"
      ],
      "risco_cfr": false,
      "bugs_pos_merge": [],
      "sentry_correlacao": []
    },
    {
      "repo": "FoundationAPI",
      "pr_number": 1192,
      "titulo": "feat(DEV4-4560): Expor unified_billing_model do Setting no Account",
      "merged_at": "2026-07-16T21:43:33Z",
      "author": "saulodanielpoli",
      "entropy": 3.5,
      "churn_lines": 776,
      "arquivos": 27,
      "modulos": [
        "Jarvis / IA",
        "Chat / Mensagens",
        "Configurações",
        "Integrações Externas",
        "Contatos",
        "Autenticação"
      ],
      "risco_cfr": false,
      "bugs_pos_merge": [],
      "sentry_correlacao": []
    }
  ],
  "cards_resolvidos": [],
  "acoes": [
    {
      "prioridade": "P0 — HOJE",
      "modulo": "Chat / Mensagens",
      "acao": "Corrigir bugs e investigar Sinais",
      "prazo": "Hoje"
    },
    {
      "prioridade": "P1 — ESTA SEMANA",
      "modulo": "Autenticação",
      "acao": "Reforçar testes de regressão",
      "prazo": "Esta semana"
    },
    {
      "prioridade": "P2 — PRÓX. SPRINT",
      "modulo": "Distribuição / Filas",
      "acao": "Monitorar tendência e planejar correção",
      "prazo": "Próximo sprint"
    },
    {
      "prioridade": "P2 — PRÓX. SPRINT",
      "modulo": "Canais",
      "acao": "Revisar cobertura de testes",
      "prazo": "Próximo sprint"
    },
    {
      "prioridade": "P2 — PRÓX. SPRINT",
      "modulo": "Jarvis / IA",
      "acao": "Acompanhar evolução dos Sinais",
      "prazo": "Próximo sprint"
    }
  ],
  "drilldown": {
    "Chat / Mensagens": {
      "nivel": "ALTO",
      "cor": "#EF4444",
      "total_reclamacoes": 301,
      "bugs_confirmados": 301,
      "dias_sentry": 0,
      "resumo_gerencial": "Módulo Chat / Mensagens com score 23.8 (10 técnico + 13.8 usuários). 301 tickets SM ativos, 0 erros Sentry, 9 cards em desenvolvimento.",
      "servico_principal": {
        "nome": "Chat",
        "bugs": 301,
        "cor": "#EF4444"
      },
      "servico_secundario": {
        "nome": "Serviços relacionados",
        "bugs": 90,
        "cor": "#F59E0B"
      },
      "clusters": [
        {
          "urgencia": "🔴",
          "sintoma": "RedisException",
          "servico": "polichat-web-app",
          "qtd": "3780"
        },
        {
          "urgencia": "🟡",
          "sintoma": "ErrorException",
          "servico": "polichat-web-app",
          "qtd": "10614668"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Exception",
          "servico": "polichat-web-app",
          "qtd": "913257"
        },
        {
          "urgencia": "🟡",
          "sintoma": "ErrorException",
          "servico": "polichat-web-app",
          "qtd": "523603"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Exception",
          "servico": "polichat-web-app",
          "qtd": "231104"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Exception",
          "servico": "polichat-web-app",
          "qtd": "125600"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Exception",
          "servico": "polichat-web-app",
          "qtd": "83761"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Exception",
          "servico": "polichat-web-app",
          "qtd": "71648"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Illuminate\\Database\\QueryException",
          "servico": "polichat-web-app",
          "qtd": "49012"
        },
        {
          "urgencia": "🟡",
          "sintoma": "App\\Exceptions\\PoliException",
          "servico": "polichat-web-app",
          "qtd": "19928"
        },
        {
          "urgencia": "🟡",
          "sintoma": "GuzzleHttp\\Exception\\ClientException",
          "servico": "polichat-web-app",
          "qtd": "15440"
        },
        {
          "urgencia": "🟡",
          "sintoma": "App\\CRM\\Domain\\Exceptions\\CRMException",
          "servico": "polichat-web-app",
          "qtd": "15440"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Exception",
          "servico": "polichat-web-app",
          "qtd": "13622"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Exception",
          "servico": "polichat-web-app",
          "qtd": "11335"
        },
        {
          "urgencia": "🟡",
          "sintoma": "{\"message\"",
          "servico": "polichat-web-app",
          "qtd": "5580"
        }
      ],
      "em_desenvolvimento": "9 cards em desenvolvimento ativo.",
      "acao_imediata": "Investigar sinais ativos e priorizar correções nos serviços afetados."
    },
    "Autenticação": {
      "nivel": "ALTO",
      "cor": "#EF4444",
      "total_reclamacoes": 12,
      "bugs_confirmados": 12,
      "dias_sentry": 0,
      "resumo_gerencial": "Módulo Autenticação com score 20.8 (16 técnico + 4.8 usuários). 12 tickets SM ativos, 0 erros Sentry, 0 cards em desenvolvimento.",
      "servico_principal": {
        "nome": "Autenticação",
        "bugs": 12,
        "cor": "#EF4444"
      },
      "servico_secundario": {
        "nome": "Serviços relacionados",
        "bugs": 4,
        "cor": "#F59E0B"
      },
      "clusters": [
        {
          "urgencia": "🟡",
          "sintoma": "Error",
          "servico": "api-gateway",
          "qtd": "363104"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Error",
          "servico": "polichat-spa",
          "qtd": "278047"
        },
        {
          "urgencia": "🟡",
          "sintoma": "<unknown>",
          "servico": "polichat-spa",
          "qtd": "108398"
        },
        {
          "urgencia": "🟡",
          "sintoma": "AxiosError",
          "servico": "polichat-spa",
          "qtd": "77269"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Error",
          "servico": "polichat-spa",
          "qtd": "31169"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Error",
          "servico": "api-gateway",
          "qtd": "24626"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Error",
          "servico": "api-gateway",
          "qtd": "22677"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Error",
          "servico": "polichat-spa",
          "qtd": "16363"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Error",
          "servico": "polichat-spa",
          "qtd": "7366"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Error",
          "servico": "api-gateway",
          "qtd": "5693"
        },
        {
          "urgencia": "🟡",
          "sintoma": "AxiosError",
          "servico": "polichat-spa",
          "qtd": "3458"
        },
        {
          "urgencia": "🟡",
          "sintoma": "AxiosError",
          "servico": "polichat-spa",
          "qtd": "2928"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Error",
          "servico": "polichat-spa",
          "qtd": "1784"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Error",
          "servico": "polichat-spa",
          "qtd": "1594"
        },
        {
          "urgencia": "🟡",
          "sintoma": "AxiosError",
          "servico": "heimdall",
          "qtd": "1091"
        },
        {
          "urgencia": "🟡",
          "sintoma": "URIError",
          "servico": "api-gateway",
          "qtd": "1058"
        },
        {
          "urgencia": "🟡",
          "sintoma": "AxiosError",
          "servico": "polichat-spa",
          "qtd": "889"
        },
        {
          "urgencia": "🟡",
          "sintoma": "AxiosError",
          "servico": "polichat-spa",
          "qtd": "363"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Error",
          "servico": "polichat-spa",
          "qtd": "356"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Error",
          "servico": "polichat-spa",
          "qtd": "214"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Error",
          "servico": "polichat-spa",
          "qtd": "165"
        },
        {
          "urgencia": "🟡",
          "sintoma": "SyntaxError",
          "servico": "heimdall",
          "qtd": "1"
        }
      ],
      "em_desenvolvimento": "⚠️ Nenhum card em desenvolvimento — módulo negligenciado.",
      "acao_imediata": "Investigar sinais ativos e priorizar correções nos serviços afetados."
    },
    "Distribuição / Filas": {
      "nivel": "ALTO",
      "cor": "#EF4444",
      "total_reclamacoes": 57,
      "bugs_confirmados": 57,
      "dias_sentry": 0,
      "resumo_gerencial": "Módulo Distribuição / Filas com score 19.7 (11 técnico + 8.7 usuários). 57 tickets SM ativos, 0 erros Sentry, 2 cards em desenvolvimento.",
      "servico_principal": {
        "nome": "Distribuição",
        "bugs": 57,
        "cor": "#EF4444"
      },
      "servico_secundario": {
        "nome": "Serviços relacionados",
        "bugs": 17,
        "cor": "#F59E0B"
      },
      "clusters": [
        {
          "urgencia": "🟡",
          "sintoma": "Chat created",
          "servico": "dispatch",
          "qtd": "105129"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Distribute from the queue",
          "servico": "dispatch",
          "qtd": "77929"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Distribute to department",
          "servico": "dispatch",
          "qtd": "37513"
        },
        {
          "urgencia": "🟡",
          "sintoma": "AxiosError",
          "servico": "dispatch",
          "qtd": "10671"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Assign on first login",
          "servico": "dispatch",
          "qtd": "10561"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Error",
          "servico": "dispatch",
          "qtd": "7310"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Error",
          "servico": "dispatch",
          "qtd": "3235"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Error",
          "servico": "dispatch",
          "qtd": "2598"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Error",
          "servico": "dispatch",
          "qtd": "2522"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Error",
          "servico": "dispatch",
          "qtd": "1"
        }
      ],
      "em_desenvolvimento": "2 cards em desenvolvimento ativo.",
      "acao_imediata": "Investigar sinais ativos e priorizar correções nos serviços afetados."
    },
    "Canais": {
      "nivel": "ALTO",
      "cor": "#EF4444",
      "total_reclamacoes": 141,
      "bugs_confirmados": 141,
      "dias_sentry": 0,
      "resumo_gerencial": "Módulo Canais com score 19 (9 técnico + 10 usuários). 141 tickets SM ativos, 0 erros Sentry, 8 cards em desenvolvimento.",
      "servico_principal": {
        "nome": "Canais",
        "bugs": 141,
        "cor": "#EF4444"
      },
      "servico_secundario": {
        "nome": "Serviços relacionados",
        "bugs": 42,
        "cor": "#F59E0B"
      },
      "clusters": [
        {
          "urgencia": "🟡",
          "sintoma": "Error",
          "servico": "channel-customer",
          "qtd": "1166854"
        },
        {
          "urgencia": "🟡",
          "sintoma": "WabaProviderCloudAPIError",
          "servico": "channel-customer",
          "qtd": "12176"
        },
        {
          "urgencia": "🟡",
          "sintoma": "ReferenceError",
          "servico": "channel-customer",
          "qtd": "3066"
        },
        {
          "urgencia": "🟡",
          "sintoma": "ReferenceError",
          "servico": "channel-customer",
          "qtd": "1652"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Error",
          "servico": "channel-customer",
          "qtd": "827"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Error",
          "servico": "channel-customer",
          "qtd": "776"
        },
        {
          "urgencia": "🟡",
          "sintoma": "WabaProviderCloudAPIError",
          "servico": "channel-customer",
          "qtd": "475"
        },
        {
          "urgencia": "🟡",
          "sintoma": "WabaProviderCloudAPIError",
          "servico": "channel-customer",
          "qtd": "188"
        },
        {
          "urgencia": "🟡",
          "sintoma": "WabaProviderError",
          "servico": "channel-customer",
          "qtd": "184"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Error",
          "servico": "channel-customer",
          "qtd": "172"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Error",
          "servico": "channel-customer",
          "qtd": "113"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Error",
          "servico": "channel-customer",
          "qtd": "88"
        },
        {
          "urgencia": "🟡",
          "sintoma": "MongooseServerSelectionError",
          "servico": "channel-customer",
          "qtd": "13"
        },
        {
          "urgencia": "🟡",
          "sintoma": "TemplateError",
          "servico": "channel-customer",
          "qtd": "10"
        },
        {
          "urgencia": "🟡",
          "sintoma": "TemplateError",
          "servico": "channel-customer",
          "qtd": "8"
        }
      ],
      "em_desenvolvimento": "8 cards em desenvolvimento ativo.",
      "acao_imediata": "Investigar sinais ativos e priorizar correções nos serviços afetados."
    },
    "Jarvis / IA": {
      "nivel": "ALTO",
      "cor": "#EF4444",
      "total_reclamacoes": 57,
      "bugs_confirmados": 57,
      "dias_sentry": 0,
      "resumo_gerencial": "Módulo Jarvis / IA com score 12.3 (8 técnico + 4.3 usuários). 57 tickets SM ativos, 0 erros Sentry, 1 cards em desenvolvimento.",
      "servico_principal": {
        "nome": "Jarvis",
        "bugs": 57,
        "cor": "#EF4444"
      },
      "servico_secundario": {
        "nome": "Serviços relacionados",
        "bugs": 17,
        "cor": "#F59E0B"
      },
      "clusters": [
        {
          "urgencia": "🟡",
          "sintoma": "Exception",
          "servico": "jarvis",
          "qtd": "135789"
        },
        {
          "urgencia": "🟡",
          "sintoma": "AttributeError",
          "servico": "jarvis",
          "qtd": "81252"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Consecutive HTTP",
          "servico": "jarvis",
          "qtd": "40852"
        },
        {
          "urgencia": "🟡",
          "sintoma": "AttributeError",
          "servico": "jarvis",
          "qtd": "31935"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Slow DB Query",
          "servico": "jarvis",
          "qtd": "15703"
        },
        {
          "urgencia": "🟡",
          "sintoma": "IntegrityError",
          "servico": "jarvis",
          "qtd": "8877"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Erro inesperado no modelo 'llama-3.1-8b-instant'",
          "servico": "jarvis",
          "qtd": "2525"
        },
        {
          "urgencia": "🟡",
          "sintoma": "BadRequest",
          "servico": "jarvis",
          "qtd": "1202"
        },
        {
          "urgencia": "🟡",
          "sintoma": "BadRequestError",
          "servico": "jarvis",
          "qtd": "535"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Erro inesperado no modelo 'openai/gpt-oss-120b'",
          "servico": "jarvis",
          "qtd": "85"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Erro inesperado no modelo 'llama-3.1-8b-instant'",
          "servico": "jarvis",
          "qtd": "20"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Erro inesperado no modelo 'llama-3.3-70b-versatile'",
          "servico": "jarvis",
          "qtd": "19"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Failed to transcribe audio segment 0",
          "servico": "jarvis",
          "qtd": "19"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Erro da API Groq no modelo 'llama-3.1-8b-instant'",
          "servico": "jarvis",
          "qtd": "1"
        },
        {
          "urgencia": "🟡",
          "sintoma": "Erro da API Groq no modelo 'llama-3.1-8b-instant'",
          "servico": "jarvis",
          "qtd": "1"
        }
      ],
      "em_desenvolvimento": "1 cards em desenvolvimento ativo.",
      "acao_imediata": "Investigar sinais ativos e priorizar correções nos serviços afetados."
    }
  },
  "sm_tickets_raw": [
    {
      "key": "SM-13319",
      "summary": "Como conectar canal na plataforma",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T09:44:17.202-0300",
      "updated": "2026-07-21T09:44:25.296-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-13318",
      "summary": "Validação de CNPJ não funcionando na Superlogica",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T09:12:26.823-0300",
      "updated": "2026-07-21T09:12:34.556-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13317",
      "summary": "Unificação de boletos para mensal + pacote extra",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T09:06:24.015-0300",
      "updated": "2026-07-21T09:06:32.638-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13316",
      "summary": "Créditos extras não aparecem na contagem do painel",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T09:06:23.977-0300",
      "updated": "2026-07-21T09:06:31.889-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13315",
      "summary": "Possibilidade de desbloquear contato após 24h de inatividade",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:58.450-0300",
      "updated": "2026-07-21T08:53:26.443-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13314",
      "summary": "Alteração de e-mail de cadastro",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:58.431-0300",
      "updated": "2026-07-21T08:53:26.329-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13313",
      "summary": "Loading infinito ao tentar fazer login na plataforma",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:48.373-0300",
      "updated": "2026-07-21T08:53:26.016-0300",
      "module": "Autenticação",
      "classification": "poli"
    },
    {
      "key": "SM-13311",
      "summary": "Dúvida sobre divergência de número de telefone no contato",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:42.175-0300",
      "updated": "2026-07-21T08:53:21.019-0300",
      "module": "Contatos",
      "classification": "indefinido"
    },
    {
      "key": "SM-13312",
      "summary": "Validação automática de formato de número de telefone entre campos",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:42.727-0300",
      "updated": "2026-07-21T08:53:20.999-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13310",
      "summary": "Cliente questionou sobre o recebimento de duas faturas após mudança no modelo de cobrança",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:41.648-0300",
      "updated": "2026-07-21T08:53:20.885-0300",
      "module": "Contatos",
      "classification": "indefinido"
    },
    {
      "key": "SM-13299",
      "summary": "Mensagens caindo para unidade errada - conflito entre lojas Americana e Campinas",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:32.375-0300",
      "updated": "2026-07-21T08:52:54.065-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13308",
      "summary": "Como redefinir senha quando não recebe e-mail de recuperação?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:40.328-0300",
      "updated": "2026-07-21T08:52:48.570-0300",
      "module": "Autenticação",
      "classification": "indefinido"
    },
    {
      "key": "SM-13307",
      "summary": "É possível configurar bot para responder automaticamente fora do horário de atendimento?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:40.245-0300",
      "updated": "2026-07-21T08:52:47.806-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-13309",
      "summary": "Como verificar atendimentos recentes de leads do Meta e configurar quem recebe os contatos?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:40.480-0300",
      "updated": "2026-07-21T08:52:47.757-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13306",
      "summary": "Erro reportado pelo cliente - em análise pela equipe de desenvolvimento",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:39.635-0300",
      "updated": "2026-07-21T08:52:47.284-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13305",
      "summary": "Envio de boleto e nota fiscal por e-mail",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:38.827-0300",
      "updated": "2026-07-21T08:52:46.245-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13304",
      "summary": "Solicitação de pagamento parcial de boleto para reativação da plataforma",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:37.142-0300",
      "updated": "2026-07-21T08:52:44.669-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13303",
      "summary": "Cliente bloqueado ao tentar enviar templates aprovados",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:36.963-0300",
      "updated": "2026-07-21T08:52:44.453-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13302",
      "summary": "Mensagens do final de semana com janelas fechadas - problema recorrente há 1 mês",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:35.182-0300",
      "updated": "2026-07-21T08:52:42.960-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13300",
      "summary": "Agendamento de ligação/call com sócia para tratar assuntos financeiros",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:34.151-0300",
      "updated": "2026-07-21T08:52:42.097-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13301",
      "summary": "Adição de créditos adicionais e envio de boleto",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:34.500-0300",
      "updated": "2026-07-21T08:52:42.052-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13286",
      "summary": "Atraso no recebimento de mensagens - mensagens chegando com 20 minutos de delay",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:27.279-0300",
      "updated": "2026-07-21T08:52:40.347-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13298",
      "summary": "Acompanhamento de chamado técnico - problema de distribuição entre unidades",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:32.244-0300",
      "updated": "2026-07-21T08:52:39.936-0300",
      "module": "Distribuição / Filas",
      "classification": "poli"
    },
    {
      "key": "SM-13297",
      "summary": "Validação de qualidade dos templates criados",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:31.529-0300",
      "updated": "2026-07-21T08:52:39.336-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-13296",
      "summary": "Templates precisam ser reenviados após reconexão do canal?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:31.480-0300",
      "updated": "2026-07-21T08:52:39.185-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-13295",
      "summary": "Homologação de número WhatsApp após atualização da Meta",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:31.462-0300",
      "updated": "2026-07-21T08:52:39.082-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-13292",
      "summary": "Mensagens não são enviadas sem exibir erro",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:27.952-0300",
      "updated": "2026-07-21T08:52:38.443-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13279",
      "summary": "Cliente não recebe template de mensagem mesmo com status 'lida' na plataforma",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:24.506-0300",
      "updated": "2026-07-21T08:52:36.762-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13293",
      "summary": "Leads de campanha ficando presos em 'sem atendente' - distribuição para canal errado",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:28.475-0300",
      "updated": "2026-07-21T08:52:36.350-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-13289",
      "summary": "Bot do Instagram quebrado e com inconsistência",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:27.674-0300",
      "updated": "2026-07-21T08:52:35.862-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-13294",
      "summary": "Cliente solicitou boleto para créditos adquiridos que não foram refletidos na plataforma",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:28.510-0300",
      "updated": "2026-07-21T08:52:35.812-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13291",
      "summary": "Negociação de valor para compra de usuário adicional",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:27.909-0300",
      "updated": "2026-07-21T08:52:35.424-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13290",
      "summary": "Alteração de cargo do usuário para operador e gestor",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:27.852-0300",
      "updated": "2026-07-21T08:52:35.373-0300",
      "module": "Permissões / Roles",
      "classification": "poli"
    },
    {
      "key": "SM-13288",
      "summary": "Melhorar clareza do termo 'fidelidade' nos contratos e propostas comerciais",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:27.621-0300",
      "updated": "2026-07-21T08:52:35.101-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13287",
      "summary": "Diferença entre acesso gestor e operador para receber chats",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:27.593-0300",
      "updated": "2026-07-21T08:52:35.085-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13285",
      "summary": "Informativo sobre mudança no modelo de cobrança da Poli",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:27.234-0300",
      "updated": "2026-07-21T08:52:34.789-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-13284",
      "summary": "Cliente relatou possível instabilidade na plataforma",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:27.058-0300",
      "updated": "2026-07-21T08:52:34.788-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13283",
      "summary": "Como verificar créditos disponíveis para disparos",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:26.890-0300",
      "updated": "2026-07-21T08:52:34.264-0300",
      "module": "Disparos / Campanhas",
      "classification": "poli"
    },
    {
      "key": "SM-13282",
      "summary": "Erro comum da Meta ao salvar número - orientação para excluir e salvar novamente",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:24.815-0300",
      "updated": "2026-07-21T08:52:32.418-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13281",
      "summary": "Cliente final não consegue responder mensagens via QR Code do WhatsApp API",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:24.748-0300",
      "updated": "2026-07-21T08:52:32.219-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13280",
      "summary": "Tela branca no aplicativo mobile - resolvido com reinstalação",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:24.689-0300",
      "updated": "2026-07-21T08:52:32.151-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13276",
      "summary": "Mensagens agendadas não estão sendo enviadas para grupo desde 14/07",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:22.547-0300",
      "updated": "2026-07-21T08:52:31.832-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13278",
      "summary": "Solicitação de boleto para pagamento",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:23.733-0300",
      "updated": "2026-07-21T08:52:31.094-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13277",
      "summary": "Melhorar feedback de erro em mensagens agendadas não enviadas",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:22.991-0300",
      "updated": "2026-07-21T08:52:30.681-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13275",
      "summary": "Baixa de pagamento - comprovante enviado",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:18.897-0300",
      "updated": "2026-07-21T08:52:26.537-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13274",
      "summary": "Conta suspensa não libera acesso após baixa de pagamento",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:52:18.847-0300",
      "updated": "2026-07-21T08:52:26.471-0300",
      "module": "Permissões / Roles",
      "classification": "poli"
    },
    {
      "key": "SM-13273",
      "summary": "Como conectar um canal na plataforma",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-21T08:43:00.141-0300",
      "updated": "2026-07-21T08:43:26.875-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-13272",
      "summary": "Melhorar processo de onboarding para reduzir churn precoce",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-20T16:57:24.476-0300",
      "updated": "2026-07-20T16:57:31.938-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13271",
      "summary": "Erro 130472 ao enviar mensagens ativas para destinatário",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-20T10:25:31.487-0300",
      "updated": "2026-07-20T10:25:39.097-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13270",
      "summary": "Como fazer backup das conversas na plataforma",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-20T08:12:06.180-0300",
      "updated": "2026-07-20T08:12:13.715-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13269",
      "summary": "Verificação de cobrança indevida - boleto já pago",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-20T08:12:06.023-0300",
      "updated": "2026-07-20T08:12:13.662-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-13268",
      "summary": "Suporte para configuração de número no Facebook Business",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-20T08:09:13.889-0300",
      "updated": "2026-07-20T08:09:23.935-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-13261",
      "summary": "Como configurar distribuição equilibrada de mensagens entre atendentes",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:08:29.738-0300",
      "updated": "2026-07-17T18:08:45.298-0300",
      "module": "Chat / Mensagens",
      "classification": "indefinido"
    },
    {
      "key": "SM-13266",
      "summary": "Cliente solicita treinamento sobre uso da plataforma",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:08:29.874-0300",
      "updated": "2026-07-17T18:08:37.300-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13265",
      "summary": "Mensagens não aparecem na conversa nem notificam - necessário atualizar manualmente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:08:29.828-0300",
      "updated": "2026-07-17T18:08:37.135-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13262",
      "summary": "Motivos de bloqueio do WhatsApp e políticas da Meta",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:08:29.783-0300",
      "updated": "2026-07-17T18:08:37.020-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-13267",
      "summary": "Como evitar que o bot finalize o chat após disparo de mensagens",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:08:29.976-0300",
      "updated": "2026-07-17T18:08:37.008-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13263",
      "summary": "Como bloquear ou remover acesso de atendente que não faz mais parte da equipe",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:08:29.782-0300",
      "updated": "2026-07-17T18:08:36.952-0300",
      "module": "Distribuição / Filas",
      "classification": "poli"
    },
    {
      "key": "SM-13264",
      "summary": "Valores de pacotes de templates excedentes e validade dos créditos",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:08:29.831-0300",
      "updated": "2026-07-17T18:08:36.877-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-13258",
      "summary": "Qual o valor para adicionar um usuário na plataforma",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:08:22.225-0300",
      "updated": "2026-07-17T18:08:29.477-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13260",
      "summary": "Como limpar cache para exibir chats atribuídos",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:08:22.276-0300",
      "updated": "2026-07-17T18:08:29.433-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13259",
      "summary": "Chats atribuídos não aparecem na tela do atendente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:08:22.255-0300",
      "updated": "2026-07-17T18:08:29.419-0300",
      "module": "Distribuição / Filas",
      "classification": "poli"
    },
    {
      "key": "SM-13257",
      "summary": "Como migrar número da API do WhatsApp para o aplicativo WhatsApp no celular",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:08:18.605-0300",
      "updated": "2026-07-17T18:08:25.623-0300",
      "module": "Canais",
      "classification": "indefinido"
    },
    {
      "key": "SM-13256",
      "summary": "Atualização de mensagens em tempo real não está funcionando",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:08:17.249-0300",
      "updated": "2026-07-17T18:08:24.230-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13255",
      "summary": "Mensagens não estão ficando na aba correta - indo para 'Todas as mensagens' em vez de 'Sem atendente'",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:08:17.223-0300",
      "updated": "2026-07-17T18:08:24.156-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13254",
      "summary": "Como desconectar número da API Oficial do WhatsApp",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:08:14.820-0300",
      "updated": "2026-07-17T18:08:21.810-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-13253",
      "summary": "Acesso ao histórico de conversas após finalização da conta",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:08:13.394-0300",
      "updated": "2026-07-17T18:08:20.784-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13245",
      "summary": "Homologação de número WhatsApp após mudança de moeda no Meta",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:55.608-0300",
      "updated": "2026-07-17T18:08:16.095-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-13252",
      "summary": "Melhoria na entregabilidade de e-mails da Poli para evitar spam",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:08:00.486-0300",
      "updated": "2026-07-17T18:08:07.552-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13250",
      "summary": "E-mails da Poli caem na pasta de spam",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:08:00.244-0300",
      "updated": "2026-07-17T18:08:07.497-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13251",
      "summary": "Cliente não recebeu e-mail com explicação das novas cobranças",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:08:00.250-0300",
      "updated": "2026-07-17T18:08:07.479-0300",
      "module": "Contatos",
      "classification": "indefinido"
    },
    {
      "key": "SM-13243",
      "summary": "Solicitação técnica relacionada a Templates",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:52.479-0300",
      "updated": "2026-07-17T18:08:03.628-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-13249",
      "summary": "Informações sobre relatório de disparo de marketing",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:55.960-0300",
      "updated": "2026-07-17T18:08:03.069-0300",
      "module": "Relatórios / SLA",
      "classification": "poli"
    },
    {
      "key": "SM-13246",
      "summary": "Template aprovado no Meta mas não permite envio de mensagem",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:55.781-0300",
      "updated": "2026-07-17T18:08:02.978-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13247",
      "summary": "Como acessar o relatório de etiquetas na plataforma",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:55.778-0300",
      "updated": "2026-07-17T18:08:02.938-0300",
      "module": "Relatórios / SLA",
      "classification": "poli"
    },
    {
      "key": "SM-13248",
      "summary": "Aguardando próximos passos de implementação - Passageiro Compensado",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:55.822-0300",
      "updated": "2026-07-17T18:08:02.715-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13244",
      "summary": "Como acessar o histórico de ligações e localizar chamadas na plataforma",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:53.862-0300",
      "updated": "2026-07-17T18:08:01.450-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13237",
      "summary": "Cliente contesta cobrança de multa contratual e solicita histórico de conversas",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:47.149-0300",
      "updated": "2026-07-17T18:07:57.013-0300",
      "module": "Chat / Mensagens",
      "classification": "indefinido"
    },
    {
      "key": "SM-13226",
      "summary": "Mensagens não aparecem na plataforma mesmo com atendente disponível",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:41.212-0300",
      "updated": "2026-07-17T18:07:56.471-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13242",
      "summary": "Liberação de conta após pagamento de boleto em atraso",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:49.206-0300",
      "updated": "2026-07-17T18:07:56.344-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-13241",
      "summary": "Consulta sobre validade dos créditos",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:48.170-0300",
      "updated": "2026-07-17T18:07:55.456-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13240",
      "summary": "Mensagens e imagens não chegam ou chegam com grande atraso em diferentes máquinas",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:48.122-0300",
      "updated": "2026-07-17T18:07:55.249-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13239",
      "summary": "Consulta sobre pacotes de créditos disponíveis e valores",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:48.092-0300",
      "updated": "2026-07-17T18:07:55.066-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13238",
      "summary": "Cliente questionou cobrança e solicitou reembolso/estorno",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:47.811-0300",
      "updated": "2026-07-17T18:07:55.064-0300",
      "module": "Contatos",
      "classification": "indefinido"
    },
    {
      "key": "SM-13225",
      "summary": "Baixa de pagamento - comprovante recebido",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:39.965-0300",
      "updated": "2026-07-17T18:07:53.453-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13236",
      "summary": "Desbloqueio de conta/acesso - Opcao Moveis E Eletro",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:46.172-0300",
      "updated": "2026-07-17T18:07:53.129-0300",
      "module": "Permissões / Roles",
      "classification": "poli"
    },
    {
      "key": "SM-13235",
      "summary": "Como comprar pacote de créditos",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:45.486-0300",
      "updated": "2026-07-17T18:07:52.561-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13234",
      "summary": "Solicitação de boleto e NF com valores divergentes",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:45.292-0300",
      "updated": "2026-07-17T18:07:52.292-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13233",
      "summary": "Como reconectar canal desconectado após atualização da plataforma",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:45.091-0300",
      "updated": "2026-07-17T18:07:52.199-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-13217",
      "summary": "Suporte remoto via AnyDesk - Drogaria São Lucas",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:37.492-0300",
      "updated": "2026-07-17T18:07:51.925-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-13223",
      "summary": "WhatsApp do cliente com bug - possível bloqueio por comportamento de spam",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:38.847-0300",
      "updated": "2026-07-17T18:07:51.416-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-13232",
      "summary": "Envio de boleto - cliente não conseguiu visualizar pelos links anteriores",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:43.021-0300",
      "updated": "2026-07-17T18:07:50.208-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13231",
      "summary": "Configuração de mensagem automática fora do horário no bot",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:41.979-0300",
      "updated": "2026-07-17T18:07:49.207-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13230",
      "summary": "Como criar mensagem automática para fora do horário de expediente",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:41.947-0300",
      "updated": "2026-07-17T18:07:49.191-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13227",
      "summary": "Acompanhamento de homologação realizada anteriormente",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:41.241-0300",
      "updated": "2026-07-17T18:07:48.628-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13229",
      "summary": "Onde ficam salvas as fotos baixadas enviadas no chat?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:41.534-0300",
      "updated": "2026-07-17T18:07:48.492-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13228",
      "summary": "Falta de sincronização entre aplicativo mobile e web",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:41.248-0300",
      "updated": "2026-07-17T18:07:48.424-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13224",
      "summary": "Por que meu WhatsApp foi bloqueado?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:38.924-0300",
      "updated": "2026-07-17T18:07:46.145-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-13220",
      "summary": "Como criar link wa.me corretamente",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:38.266-0300",
      "updated": "2026-07-17T18:07:46.044-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13221",
      "summary": "Nome do contato não aparece na plataforma",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:38.354-0300",
      "updated": "2026-07-17T18:07:45.632-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13219",
      "summary": "Adição de novo usuário com valor negociado",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:38.130-0300",
      "updated": "2026-07-17T18:07:45.589-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13222",
      "summary": "Cliente insatisfeito com tempo de resposta do suporte",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:38.361-0300",
      "updated": "2026-07-17T18:07:45.435-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13218",
      "summary": "Chats não são distribuídos para atendentes e ficam em 'Sem atendente'",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:38.001-0300",
      "updated": "2026-07-17T18:07:45.028-0300",
      "module": "Distribuição / Filas",
      "classification": "poli"
    },
    {
      "key": "SM-13216",
      "summary": "Cliente não consegue acessar a plataforma",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:35.544-0300",
      "updated": "2026-07-17T18:07:42.678-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13215",
      "summary": "Cliente solicita informações sobre faturamento com vencimento 25/7",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:35.477-0300",
      "updated": "2026-07-17T18:07:42.484-0300",
      "module": "Contatos",
      "classification": "indefinido"
    },
    {
      "key": "SM-13214",
      "summary": "Relatório separando mensagens de operadores e mensagens do BOT",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:34.896-0300",
      "updated": "2026-07-17T18:07:42.110-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13213",
      "summary": "Como visualizar o volume de mensagens enviadas aos clientes",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:34.599-0300",
      "updated": "2026-07-17T18:07:42.097-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13212",
      "summary": "Como consultar quantidade de mensagens enviadas pelo BOT separadamente",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:07:34.575-0300",
      "updated": "2026-07-17T18:07:41.914-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13211",
      "summary": "Como saber quantas vezes cada usuário acessou o PoliChat nos últimos 30 dias",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:06:30.323-0300",
      "updated": "2026-07-17T18:06:37.564-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13209",
      "summary": "Como fazer backup das conversas na Poli",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:06:30.275-0300",
      "updated": "2026-07-17T18:06:37.471-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13210",
      "summary": "Como remover contato do portfólio",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:06:30.283-0300",
      "updated": "2026-07-17T18:06:37.438-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13208",
      "summary": "É possível visualizar mensagens da Poli no celular?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:06:30.227-0300",
      "updated": "2026-07-17T18:06:37.289-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13207",
      "summary": "Nova interface está em versão beta?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:06:28.791-0300",
      "updated": "2026-07-17T18:06:36.014-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13206",
      "summary": "Erro no app mobile ao digitar mensagens - tela de aviso aparecendo repetidamente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:06:26.994-0300",
      "updated": "2026-07-17T18:06:34.284-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13205",
      "summary": "Quando o aviso de boleto pendente vai sumir do sistema?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:06:26.971-0300",
      "updated": "2026-07-17T18:06:34.132-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13203",
      "summary": "Relatórios com erros/inconsistências",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:06:26.292-0300",
      "updated": "2026-07-17T18:06:33.737-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13204",
      "summary": "Dúvida sobre mudanças no formato de cobrança de créditos e templates da Meta",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:06:26.309-0300",
      "updated": "2026-07-17T18:06:33.720-0300",
      "module": "Configurações",
      "classification": "indefinido"
    },
    {
      "key": "SM-13202",
      "summary": "Redirecionamento para grupo de suporte Iterup/Poli",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:06:25.437-0300",
      "updated": "2026-07-17T18:06:32.479-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13201",
      "summary": "Encaminhamento de e-mail sobre mudanças na fatura para o financeiro",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:06:24.220-0300",
      "updated": "2026-07-17T18:06:31.224-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-13200",
      "summary": "Como encontrar templates com botões no construtor de templates",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:06:23.142-0300",
      "updated": "2026-07-17T18:06:30.110-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-13199",
      "summary": "Dashboard do CRM não atualiza valores preenchidos",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:06:21.913-0300",
      "updated": "2026-07-17T18:06:29.101-0300",
      "module": "Relatórios / SLA",
      "classification": "poli"
    },
    {
      "key": "SM-13198",
      "summary": "Divergência entre valor do e-mail e valor do boleto",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:06:21.510-0300",
      "updated": "2026-07-17T18:06:28.596-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13197",
      "summary": "Dúvida sobre cobrança de boleto após solicitação de cancelamento",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:06:20.538-0300",
      "updated": "2026-07-17T18:06:27.565-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-13196",
      "summary": "Agendamento de treinamento para equipe comercial",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:06:20.145-0300",
      "updated": "2026-07-17T18:06:27.356-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13195",
      "summary": "Dúvida sobre divisão de fatura em agosto",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:06:19.877-0300",
      "updated": "2026-07-17T18:06:26.921-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-13194",
      "summary": "Pagamento via PIX - Meet & Eat",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:06:19.200-0300",
      "updated": "2026-07-17T18:06:26.223-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13189",
      "summary": "Negociação de desconto no pós-pago e pacote de créditos - Mental Center Fortaleza",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:06:01.349-0300",
      "updated": "2026-07-17T18:06:19.652-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13193",
      "summary": "Guía automática de buenas prácticas para templates de WhatsApp y límites de envío",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:06:04.575-0300",
      "updated": "2026-07-17T18:06:11.854-0300",
      "module": "Canais",
      "classification": "indefinido"
    },
    {
      "key": "SM-13192",
      "summary": "Cómo evitar que Meta detecte templates como spam y cantidad recomendada de disparos",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:06:04.290-0300",
      "updated": "2026-07-17T18:06:11.339-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-13191",
      "summary": "Aumentar tempo de inatividade e desconectar usuário automaticamente ao deslogar",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:06:01.703-0300",
      "updated": "2026-07-17T18:06:08.707-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-13190",
      "summary": "Possibilidade de desativar desconexão por inatividade",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:06:01.479-0300",
      "updated": "2026-07-17T18:06:08.648-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13188",
      "summary": "App mobile exibe mensagem de tempo esgotado mesmo em uso",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:06:01.168-0300",
      "updated": "2026-07-17T18:06:08.348-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13187",
      "summary": "Mensagens não estão sendo enviadas pelo canal WhatsApp",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:58.173-0300",
      "updated": "2026-07-17T18:06:05.150-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13186",
      "summary": "Reajuste e atualização de boleto para pagamento",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:58.040-0300",
      "updated": "2026-07-17T18:06:04.993-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13171",
      "summary": "Como reduzir o tempo de delay na atribuição de chats para atendentes?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:51.328-0300",
      "updated": "2026-07-17T18:06:04.853-0300",
      "module": "Distribuição / Filas",
      "classification": "poli"
    },
    {
      "key": "SM-13185",
      "summary": "Suporte remoto via AnyDesk para verificar canal homologado",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:56.701-0300",
      "updated": "2026-07-17T18:06:03.959-0300",
      "module": "Canais",
      "classification": "indefinido"
    },
    {
      "key": "SM-13184",
      "summary": "Suporte remoto com alternativas ao AnyDesk (ex: Teams)",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:56.516-0300",
      "updated": "2026-07-17T18:06:03.432-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-13183",
      "summary": "Comunicação proativa sobre instabilidades da plataforma",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:56.136-0300",
      "updated": "2026-07-17T18:06:03.086-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13182",
      "summary": "Mensagens não estão chegando na plataforma",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:55.790-0300",
      "updated": "2026-07-17T18:06:02.916-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13181",
      "summary": "Envio de link de cobrança/boleto para cliente",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:55.758-0300",
      "updated": "2026-07-17T18:06:02.526-0300",
      "module": "Contatos",
      "classification": "indefinido"
    },
    {
      "key": "SM-13180",
      "summary": "Remoção de linha de crédito e número do Portfólio Empresarial",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:54.685-0300",
      "updated": "2026-07-17T18:06:02.126-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13179",
      "summary": "Dúvida sobre migração de conta WABA para inserir linha de crédito",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:54.630-0300",
      "updated": "2026-07-17T18:06:01.429-0300",
      "module": "Canais",
      "classification": "indefinido"
    },
    {
      "key": "SM-13178",
      "summary": "Permitir importação de contatos com tags e atribuição de carteira/atendente em uma única operação",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:52.843-0300",
      "updated": "2026-07-17T18:06:00.119-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13176",
      "summary": "Como filtrar contatos por tag e atribuir em massa para um atendente?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:52.763-0300",
      "updated": "2026-07-17T18:05:59.839-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13177",
      "summary": "Importação de contatos com tags e atribuição em massa para atendentes específicos",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:52.768-0300",
      "updated": "2026-07-17T18:05:59.633-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13174",
      "summary": "Qual navegador é recomendado para uso da plataforma Poli?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:51.479-0300",
      "updated": "2026-07-17T18:05:58.720-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13175",
      "summary": "Melhoria na consistência das notificações de navegador entre diferentes browsers",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:51.589-0300",
      "updated": "2026-07-17T18:05:58.672-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13172",
      "summary": "Notificações no navegador não chegam para todos os contatos ou chegam com delay",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:51.429-0300",
      "updated": "2026-07-17T18:05:58.668-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13173",
      "summary": "Conversas trocadas entre clientes - mensagens aparecem em chats errados",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:51.465-0300",
      "updated": "2026-07-17T18:05:58.619-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13169",
      "summary": "Configuração de mensagens automáticas e ajuste de departamento para usuária Luana",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:50.495-0300",
      "updated": "2026-07-17T18:05:58.036-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13170",
      "summary": "Por que novos usuários não conseguem acessar o sistema legado?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:50.637-0300",
      "updated": "2026-07-17T18:05:57.816-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13167",
      "summary": "Liberação de acesso ao sistema legado para novo usuário",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:50.385-0300",
      "updated": "2026-07-17T18:05:57.800-0300",
      "module": "Permissões / Roles",
      "classification": "poli"
    },
    {
      "key": "SM-13168",
      "summary": "Mudanças na fatura mensal - consumo de templates Meta",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:50.410-0300",
      "updated": "2026-07-17T18:05:57.729-0300",
      "module": "Configurações",
      "classification": "indefinido"
    },
    {
      "key": "SM-13164",
      "summary": "Mensagens de clientes chegando com grande atraso (até 1 hora de delay)",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:50.123-0300",
      "updated": "2026-07-17T18:05:57.433-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13166",
      "summary": "Cliente não está recebendo notas fiscais da Poli",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:50.356-0300",
      "updated": "2026-07-17T18:05:57.362-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13165",
      "summary": "Não consegue enviar mensagens nem transferir atendimento para contato específico",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:50.256-0300",
      "updated": "2026-07-17T18:05:57.189-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13163",
      "summary": "Alerta visual quando há mensagens pendentes de sincronização ou delay no recebimento",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:50.053-0300",
      "updated": "2026-07-17T18:05:57.041-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13162",
      "summary": "Lentidão na plataforma reportada pelo cliente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:49.604-0300",
      "updated": "2026-07-17T18:05:56.858-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13158",
      "summary": "Como evitar restrições da Meta ao fazer disparos de mensagens?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:47.181-0300",
      "updated": "2026-07-17T18:05:55.591-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13161",
      "summary": "Como criar templates que sejam aprovados pela Meta",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:48.282-0300",
      "updated": "2026-07-17T18:05:55.356-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-13160",
      "summary": "Orientação automatizada sobre boas práticas para evitar restrições da Meta",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:47.451-0300",
      "updated": "2026-07-17T18:05:54.598-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13159",
      "summary": "Solicitação de revisão junto à Meta para remoção de restrição por spam",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:47.192-0300",
      "updated": "2026-07-17T18:05:54.135-0300",
      "module": "Permissões / Roles",
      "classification": "poli"
    },
    {
      "key": "SM-13157",
      "summary": "Redução de plano - remover pacote de 1000 créditos",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:45.519-0300",
      "updated": "2026-07-17T18:05:52.884-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-13146",
      "summary": "Sincronia de chats: última mensagem exibida é sempre a do cliente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:37.902-0300",
      "updated": "2026-07-17T18:05:51.375-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13156",
      "summary": "Implementar notificação para atendentes sobre chats presos na fila",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:43.778-0300",
      "updated": "2026-07-17T18:05:50.973-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13155",
      "summary": "Liberação de plataforma suspensa após envio de comprovante de pagamento",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:43.573-0300",
      "updated": "2026-07-17T18:05:50.962-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13152",
      "summary": "Dúvida sobre mudança no modelo de cobrança e se receberão duas faturas",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:41.934-0300",
      "updated": "2026-07-17T18:05:50.927-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-13154",
      "summary": "Chat ficou preso na fila de atendimento após solicitação atendida",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:43.560-0300",
      "updated": "2026-07-17T18:05:50.665-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13153",
      "summary": "Dúvida sobre mudança na emissão de faturas (plano separado de créditos)",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:42.466-0300",
      "updated": "2026-07-17T18:05:49.377-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-13151",
      "summary": "Mensagens de clientes não aparecem em tempo real, só após atualizar a página",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:41.891-0300",
      "updated": "2026-07-17T18:05:48.976-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13150",
      "summary": "Dúvida sobre valor de canal adicional WABA",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:41.858-0300",
      "updated": "2026-07-17T18:05:48.802-0300",
      "module": "Canais",
      "classification": "indefinido"
    },
    {
      "key": "SM-13149",
      "summary": "Análise de churn - cliente migrando para outro CRM",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:40.843-0300",
      "updated": "2026-07-17T18:05:47.973-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13147",
      "summary": "Reativação do recurso de transcrição de áudios",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:37.980-0300",
      "updated": "2026-07-17T18:05:45.243-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13148",
      "summary": "Onde criar mensagens internas/anotações na nova interface",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:38.099-0300",
      "updated": "2026-07-17T18:05:45.237-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13145",
      "summary": "Áudios não são enviados para o destinatário após atualização",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:37.841-0300",
      "updated": "2026-07-17T18:05:44.888-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13144",
      "summary": "Notificação visual mais clara de novas mensagens por cliente",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:37.564-0300",
      "updated": "2026-07-17T18:05:44.698-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13143",
      "summary": "Conversas se misturando entre clientes diferentes",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:37.396-0300",
      "updated": "2026-07-17T18:05:44.540-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13142",
      "summary": "Solicitação de certidão da Receita Federal",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:05:34.531-0300",
      "updated": "2026-07-17T18:05:42.112-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13141",
      "summary": "Duplicidade de contatos na mesma conversa travando recebimento de mensagens",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:03:19.800-0300",
      "updated": "2026-07-17T18:03:26.958-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13111",
      "summary": "Imagens em formato .jfif não são exibidas na plataforma",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:03:00.074-0300",
      "updated": "2026-07-17T18:03:26.672-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13140",
      "summary": "Mensagens de clientes só aparecem após atualizar a página manualmente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:03:19.501-0300",
      "updated": "2026-07-17T18:03:26.537-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13139",
      "summary": "Solicitação de dados bancários para pagamento - erro no boleto",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:03:17.393-0300",
      "updated": "2026-07-17T18:03:24.549-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13138",
      "summary": "Mudanças na fatura e uso de créditos para templates",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:03:16.834-0300",
      "updated": "2026-07-17T18:03:23.966-0300",
      "module": "Configurações",
      "classification": "indefinido"
    },
    {
      "key": "SM-13137",
      "summary": "Mensagens não sincronizam automaticamente - necessário F5 constante",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:03:16.723-0300",
      "updated": "2026-07-17T18:03:23.824-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13136",
      "summary": "Erro 131049 ao enviar mensagem de marketing no WhatsApp",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:03:15.798-0300",
      "updated": "2026-07-17T18:03:23.024-0300",
      "module": "Chat / Mensagens",
      "classification": "externo"
    },
    {
      "key": "SM-13135",
      "summary": "Cliente perguntou se precisa criar template de utilitário",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:03:15.755-0300",
      "updated": "2026-07-17T18:03:22.937-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13134",
      "summary": "Envio de boleto em aberto e pagamento via PIX para reativação da plataforma",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:03:15.685-0300",
      "updated": "2026-07-17T18:03:22.850-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13133",
      "summary": "Algo aparece como 'bloqueado' na plataforma",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:03:14.467-0300",
      "updated": "2026-07-17T18:03:21.546-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13132",
      "summary": "Mensagens de clientes não chegam ou demoram para chegar na plataforma",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:03:13.866-0300",
      "updated": "2026-07-17T18:03:20.921-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13089",
      "summary": "Bot não inicia para alguns contatos/números específicos",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:51.488-0300",
      "updated": "2026-07-17T18:03:14.529-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-13108",
      "summary": "Cliente questiona motivo de bloqueio/restrição da Meta mesmo sem fazer disparos de spam",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:58.328-0300",
      "updated": "2026-07-17T18:03:12.198-0300",
      "module": "Contatos",
      "classification": "externo"
    },
    {
      "key": "SM-13131",
      "summary": "Melhoria na distribuição automática de leads que respondem disparos",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:03:04.356-0300",
      "updated": "2026-07-17T18:03:11.858-0300",
      "module": "Distribuição / Filas",
      "classification": "poli"
    },
    {
      "key": "SM-13130",
      "summary": "Lead não foi distribuído para atendimento após responder disparo",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:03:04.130-0300",
      "updated": "2026-07-17T18:03:11.433-0300",
      "module": "Disparos / Campanhas",
      "classification": "poli"
    },
    {
      "key": "SM-13129",
      "summary": "Como alterar campo de 'Contato' para 'Telefone' no disparo",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:03:04.090-0300",
      "updated": "2026-07-17T18:03:11.305-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13128",
      "summary": "Chat some/desaparece após disparo no meio da conversa",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:03:04.043-0300",
      "updated": "2026-07-17T18:03:11.272-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13126",
      "summary": "Permitir receber ligações de WhatsApp na API Oficial",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:03:03.872-0300",
      "updated": "2026-07-17T18:03:11.210-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13127",
      "summary": "Disparos manuais realizados sumiram - sem retorno desde 06/07",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:03:04.002-0300",
      "updated": "2026-07-17T18:03:11.024-0300",
      "module": "Disparos / Campanhas",
      "classification": "poli"
    },
    {
      "key": "SM-13125",
      "summary": "API Oficial do WhatsApp recebe ligações?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:03:03.546-0300",
      "updated": "2026-07-17T18:03:11.009-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-13122",
      "summary": "Como remover número do WhatsApp Business ao migrar para outra empresa",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:03:03.252-0300",
      "updated": "2026-07-17T18:03:10.760-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-13123",
      "summary": "Número exibido ao cliente quando a Poli faz ligação",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:03:03.461-0300",
      "updated": "2026-07-17T18:03:10.686-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13124",
      "summary": "Solicitação de reativação de créditos e remoção do modo teste",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:03:03.495-0300",
      "updated": "2026-07-17T18:03:10.656-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13105",
      "summary": "Lentidão e travamento ao enviar mensagens/áudios na plataforma",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:57.383-0300",
      "updated": "2026-07-17T18:03:10.265-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13120",
      "summary": "Como consultar e desativar autenticação de dois fatores no WhatsApp Business",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:03:03.009-0300",
      "updated": "2026-07-17T18:03:10.250-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-13121",
      "summary": "Informações sobre plano básico para consulta de conversas e proporcional de fatura",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:03:03.091-0300",
      "updated": "2026-07-17T18:03:10.165-0300",
      "module": "Chat / Mensagens",
      "classification": "indefinido"
    },
    {
      "key": "SM-13119",
      "summary": "Melhorar distribuição automática de chats quando atendentes estão offline",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:03:02.084-0300",
      "updated": "2026-07-17T18:03:09.262-0300",
      "module": "Distribuição / Filas",
      "classification": "poli"
    },
    {
      "key": "SM-13118",
      "summary": "Como receber o boleto da Meta/cobrança",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:03:01.860-0300",
      "updated": "2026-07-17T18:03:08.931-0300",
      "module": "Chat / Mensagens",
      "classification": "indefinido"
    },
    {
      "key": "SM-13117",
      "summary": "Chats ficam sem atribuição de atendente quando operadores estão offline",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:03:01.721-0300",
      "updated": "2026-07-17T18:03:08.909-0300",
      "module": "Distribuição / Filas",
      "classification": "poli"
    },
    {
      "key": "SM-13116",
      "summary": "Contestação de cobrança e solicitação de isenção de fatura",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:03:01.569-0300",
      "updated": "2026-07-17T18:03:08.883-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-13107",
      "summary": "Lentidão no envio e recebimento de mensagens via API Oficial",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:58.320-0300",
      "updated": "2026-07-17T18:03:08.620-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13115",
      "summary": "Onde fica o botão de calendário no chat",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:03:01.424-0300",
      "updated": "2026-07-17T18:03:08.575-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13102",
      "summary": "Chats atribuídos não aparecem na aba 'Atribuídos a mim' para atendente específica",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:56.794-0300",
      "updated": "2026-07-17T18:03:08.007-0300",
      "module": "Distribuição / Filas",
      "classification": "poli"
    },
    {
      "key": "SM-13114",
      "summary": "Suporte a formato de imagem .jfif na plataforma",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:03:00.697-0300",
      "updated": "2026-07-17T18:03:07.926-0300",
      "module": "Upload / Mídia",
      "classification": "poli"
    },
    {
      "key": "SM-13112",
      "summary": "Atraso na sincronização de mensagens entre dispositivos",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:03:00.226-0300",
      "updated": "2026-07-17T18:03:07.492-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13113",
      "summary": "Como converter arquivos .jfif para formatos compatíveis",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:03:00.238-0300",
      "updated": "2026-07-17T18:03:07.299-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13109",
      "summary": "Cliente solicita análise técnica para verificar se está fazendo algo errado nas configurações",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:58.353-0300",
      "updated": "2026-07-17T18:03:06.364-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13110",
      "summary": "Dúvida sobre mudança da Meta e funcionalidade incluída no pacote contratado",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:58.570-0300",
      "updated": "2026-07-17T18:03:05.625-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-13106",
      "summary": "Cliente pergunta se adicionar botões nos templates resolve o problema de restrições",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:58.319-0300",
      "updated": "2026-07-17T18:03:05.360-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13104",
      "summary": "Informações sobre mudança nas faturas e simulação de valores",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:57.377-0300",
      "updated": "2026-07-17T18:03:04.774-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-13103",
      "summary": "Como acessar e visualizar boletos na Área do Cliente",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:57.354-0300",
      "updated": "2026-07-17T18:03:04.565-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13101",
      "summary": "Bot não está transferindo chats para atendentes - clientes aguardando desde o dia anterior",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:56.711-0300",
      "updated": "2026-07-17T18:03:03.832-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-13100",
      "summary": "Problema recorrente na plataforma - cliente relata erro há vários dias",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:56.127-0300",
      "updated": "2026-07-17T18:03:02.958-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13098",
      "summary": "Dúvida sobre ciclo de cobrança de créditos",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:54.690-0300",
      "updated": "2026-07-17T18:03:01.693-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-13099",
      "summary": "Reativação de conta após pagamento de créditos",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:54.713-0300",
      "updated": "2026-07-17T18:03:01.691-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-13097",
      "summary": "Como conectar canal WhatsApp via leitura de QR Code",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:53.951-0300",
      "updated": "2026-07-17T18:03:00.932-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-13096",
      "summary": "Cliente questionou motivo do contato inicial da Poli",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:52.880-0300",
      "updated": "2026-07-17T18:03:00.381-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13094",
      "summary": "Alteração de link de pesquisa de satisfação no bot",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:51.638-0300",
      "updated": "2026-07-17T18:02:58.876-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-13092",
      "summary": "Treinamento para configuração de bot e horários de funcionamento",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:51.562-0300",
      "updated": "2026-07-17T18:02:58.642-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-13095",
      "summary": "Permitir configurar horários de funcionamento do bot com mensagem automática de indisponibilidade",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:51.715-0300",
      "updated": "2026-07-17T18:02:58.557-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13087",
      "summary": "Mensagens de chat misturando entre conversas diferentes",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:51.433-0300",
      "updated": "2026-07-17T18:02:58.504-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13091",
      "summary": "Aviso de 24 horas aparecendo incorretamente em todas as conversas",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:51.553-0300",
      "updated": "2026-07-17T18:02:58.498-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13088",
      "summary": "Chats ficando no limbo - não são direcionados para atendentes",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:51.471-0300",
      "updated": "2026-07-17T18:02:58.442-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13090",
      "summary": "Pesquisa de satisfação não é enviada ao encerrar chat manualmente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:51.495-0300",
      "updated": "2026-07-17T18:02:58.428-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13093",
      "summary": "Como alterar a foto de perfil do WhatsApp Business",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:51.599-0300",
      "updated": "2026-07-17T18:02:58.424-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-13079",
      "summary": "Conversas não exibem indicador de não lidas após transferência do bot",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:42.724-0300",
      "updated": "2026-07-17T18:02:57.043-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13073",
      "summary": "Busca de contatos retorna resultados diferentes para usuários com mesmas permissões",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:33.123-0300",
      "updated": "2026-07-17T18:02:52.246-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13086",
      "summary": "Melhoria na visibilidade de conversas não lidas após transferência do bot",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:43.336-0300",
      "updated": "2026-07-17T18:02:50.351-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13084",
      "summary": "Como funciona a cobrança no modelo pós-pago de créditos",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:42.918-0300",
      "updated": "2026-07-17T18:02:50.166-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-13081",
      "summary": "Bug de templates e botões não aparecendo no chat",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:42.831-0300",
      "updated": "2026-07-17T18:02:50.161-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13083",
      "summary": "Limite de linhas não homologadas que podem ser utilizadas",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:42.854-0300",
      "updated": "2026-07-17T18:02:50.158-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13085",
      "summary": "Alteração de plano - remoção de linha oficial WABA e redução de créditos",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:43.028-0300",
      "updated": "2026-07-17T18:02:50.129-0300",
      "module": "Canais",
      "classification": "indefinido"
    },
    {
      "key": "SM-13080",
      "summary": "Quem realiza o cancelamento da linha oficial WABA",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:42.805-0300",
      "updated": "2026-07-17T18:02:49.986-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-13082",
      "summary": "Operadora deslogada recebendo distribuição de chats",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:42.838-0300",
      "updated": "2026-07-17T18:02:49.867-0300",
      "module": "Distribuição / Filas",
      "classification": "poli"
    },
    {
      "key": "SM-13078",
      "summary": "Melhoria na busca de contatos para não restringir por departamento",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:33.371-0300",
      "updated": "2026-07-17T18:02:40.740-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13076",
      "summary": "Chats encerrados permanecem na fila de atendimento e reaparecem como não lidos",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:33.238-0300",
      "updated": "2026-07-17T18:02:40.558-0300",
      "module": "Distribuição / Filas",
      "classification": "poli"
    },
    {
      "key": "SM-13077",
      "summary": "Dúvida sobre mudanças relacionadas à Meta e faturamento",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:33.260-0300",
      "updated": "2026-07-17T18:02:40.423-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-13075",
      "summary": "Erro 131049 ao enviar template de marketing para cliente",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:33.167-0300",
      "updated": "2026-07-17T18:02:40.244-0300",
      "module": "Chat / Mensagens",
      "classification": "externo"
    },
    {
      "key": "SM-13074",
      "summary": "Bot não direcionou chat para o atendente correto mesmo com escolha do cliente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:33.138-0300",
      "updated": "2026-07-17T18:02:39.924-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13072",
      "summary": "Registros simples não estão chegando - dados não são recebidos pelo cliente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:32.187-0300",
      "updated": "2026-07-17T18:02:39.162-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13063",
      "summary": "Sincronização de chats não funciona - cliente não aparece na carteira",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:23.110-0300",
      "updated": "2026-07-17T18:02:39.041-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13071",
      "summary": "Como acessar segundo link de gravação de reunião que estava bloqueado",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:31.762-0300",
      "updated": "2026-07-17T18:02:38.916-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13069",
      "summary": "Etiquetas não aparecem na nova interface - cliente não encontra etiqueta 'SPAM'",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:31.660-0300",
      "updated": "2026-07-17T18:02:38.717-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13070",
      "summary": "Solicitação de desconto e créditos devido a instabilidades e problemas não resolvidos",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:31.725-0300",
      "updated": "2026-07-17T18:02:38.625-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13056",
      "summary": "Painel mostrando créditos zerados incorretamente (erro visual)",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:21.687-0300",
      "updated": "2026-07-17T18:02:37.407-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13068",
      "summary": "Dúvida sobre consumo de créditos e o que acontece ao atingir 100%",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:23.922-0300",
      "updated": "2026-07-17T18:02:31.447-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-13067",
      "summary": "Alteração de plano de créditos para 1000 mensais",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:23.575-0300",
      "updated": "2026-07-17T18:02:31.395-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-13064",
      "summary": "Plataforma zerou durante manutenção noturna - clientes em atendimento sumiram",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:23.110-0300",
      "updated": "2026-07-17T18:02:30.636-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13062",
      "summary": "Conversa de um cliente aparece na tela de outro cliente ao alternar chats",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:23.103-0300",
      "updated": "2026-07-17T18:02:30.512-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13065",
      "summary": "Mensagens não sobem automaticamente - necessário F5 constante para atualizar",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:23.131-0300",
      "updated": "2026-07-17T18:02:30.499-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13066",
      "summary": "Implementar notificação prévia de manutenções programadas",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:23.164-0300",
      "updated": "2026-07-17T18:02:30.353-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13055",
      "summary": "Conversa não libera campo de digitação quando cliente responde",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:21.686-0300",
      "updated": "2026-07-17T18:02:29.373-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13061",
      "summary": "Como visualizar relatórios de produtividade e leads no CRM",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:22.074-0300",
      "updated": "2026-07-17T18:02:29.291-0300",
      "module": "Integrações Externas",
      "classification": "poli"
    },
    {
      "key": "SM-13060",
      "summary": "Reunião de alinhamento para tirar dúvidas sobre relatórios e problemas técnicos",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:21.791-0300",
      "updated": "2026-07-17T18:02:29.141-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13057",
      "summary": "Variáveis não funcionam corretamente no agendamento de mensagem",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:21.694-0300",
      "updated": "2026-07-17T18:02:29.057-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13059",
      "summary": "Melhoria nos relatórios de produtividade individual no CRM",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:21.779-0300",
      "updated": "2026-07-17T18:02:28.918-0300",
      "module": "Integrações Externas",
      "classification": "poli"
    },
    {
      "key": "SM-13058",
      "summary": "Conversa sendo finalizada por um usuário e direcionada para outro incorretamente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:21.739-0300",
      "updated": "2026-07-17T18:02:28.862-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13054",
      "summary": "Melhorar transparência e controle de gastos com templates/créditos na nova cobrança Meta",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:16.260-0300",
      "updated": "2026-07-17T18:02:23.350-0300",
      "module": "Configurações",
      "classification": "indefinido"
    },
    {
      "key": "SM-13053",
      "summary": "Como funcionará a cobrança de créditos após mudança em agosto (Meta vs Poli)",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:15.848-0300",
      "updated": "2026-07-17T18:02:23.120-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-13052",
      "summary": "Relatório de detalhes de consumo de mensagens não exibe informações",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:15.737-0300",
      "updated": "2026-07-17T18:02:22.931-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13051",
      "summary": "Sincronização de mensagens não funciona há quase 1 mês",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:15.711-0300",
      "updated": "2026-07-17T18:02:22.738-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13047",
      "summary": "Templates enviados não aparecem nas conversas após envio",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:14.819-0300",
      "updated": "2026-07-17T18:02:22.141-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13049",
      "summary": "Cliente reporta múltiplos erros: etiquetas, integração de pagamentos, horário e bot",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:14.869-0300",
      "updated": "2026-07-17T18:02:22.102-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-13050",
      "summary": "Melhoria na visibilidade e rastreamento de templates enviados",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:15.023-0300",
      "updated": "2026-07-17T18:02:22.080-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-13048",
      "summary": "Comunicação sobre alterações na fatura e mudanças a partir de agosto",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:14.822-0300",
      "updated": "2026-07-17T18:02:21.789-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-13046",
      "summary": "É possível voltar para a versão antiga do Polichat?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:14.254-0300",
      "updated": "2026-07-17T18:02:21.613-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13045",
      "summary": "Última mensagem enviada não aparece na conversa e chats encaminhados não sobem para o topo",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:14.167-0300",
      "updated": "2026-07-17T18:02:21.211-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13044",
      "summary": "Simulação de valores de plano e consumo de templates",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:11.685-0300",
      "updated": "2026-07-17T18:02:18.749-0300",
      "module": "Configurações",
      "classification": "indefinido"
    },
    {
      "key": "SM-13043",
      "summary": "Melhorar processo de cancelamento e cobrança para clientes sem ativação completa",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:11.348-0300",
      "updated": "2026-07-17T18:02:18.305-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-13042",
      "summary": "Troca de atendimento misturava conversas de clientes diferentes",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:10.625-0300",
      "updated": "2026-07-17T18:02:17.930-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13041",
      "summary": "Mensagens não aparecem na plataforma, exigindo atualização constante da página",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:10.462-0300",
      "updated": "2026-07-17T18:02:17.684-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13039",
      "summary": "Dúvida sobre mudança na forma de cobrança/fatura da Poli",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:09.556-0300",
      "updated": "2026-07-17T18:02:16.658-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-13040",
      "summary": "Mensagens não chegam para clientes intermitentemente durante o dia",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:09.588-0300",
      "updated": "2026-07-17T18:02:16.654-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13038",
      "summary": "Suporte aberto junto à Meta para recuperação de conta",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:07.939-0300",
      "updated": "2026-07-17T18:02:14.995-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-13037",
      "summary": "Envio de nota fiscal após comprovante de pagamento",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:02:01.355-0300",
      "updated": "2026-07-17T18:02:08.955-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13023",
      "summary": "Usuários não-gestores não conseguem consultar contatos de outros departamentos após atualização",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:01:34.923-0300",
      "updated": "2026-07-17T18:01:55.651-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13035",
      "summary": "Segunda via de boletos em aberto",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:01:39.098-0300",
      "updated": "2026-07-17T18:01:49.569-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13026",
      "summary": "Cliente pergunta sobre envio de arquivo CDR via WhatsApp",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:01:35.311-0300",
      "updated": "2026-07-17T18:01:47.731-0300",
      "module": "Canais",
      "classification": "indefinido"
    },
    {
      "key": "SM-13033",
      "summary": "Como conectar canal que caiu no novo painel",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:01:39.066-0300",
      "updated": "2026-07-17T18:01:46.458-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-13036",
      "summary": "Nova versão tem funcionalidade de conectar canal?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:01:39.130-0300",
      "updated": "2026-07-17T18:01:46.416-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-13034",
      "summary": "Mensagens enviadas sem conhecimento do atendente",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:01:39.083-0300",
      "updated": "2026-07-17T18:01:46.394-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13031",
      "summary": "Qual o valor do Broker após o período de teste?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:01:38.438-0300",
      "updated": "2026-07-17T18:01:46.251-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13032",
      "summary": "Melhoria na documentação e onboarding sobre relatórios de gestão",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:01:38.669-0300",
      "updated": "2026-07-17T18:01:46.125-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13028",
      "summary": "Aguardando retorno sobre falhas do sistema",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:01:38.414-0300",
      "updated": "2026-07-17T18:01:45.825-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13030",
      "summary": "Senha da Poli não funciona - problemas recorrentes de login",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:01:38.433-0300",
      "updated": "2026-07-17T18:01:45.648-0300",
      "module": "Autenticação",
      "classification": "poli"
    },
    {
      "key": "SM-13029",
      "summary": "Treinamento de gestão para interpretação de relatórios",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:01:38.427-0300",
      "updated": "2026-07-17T18:01:45.641-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13027",
      "summary": "Solicitação de nota fiscal para pagamento de boleto em atraso",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:01:36.075-0300",
      "updated": "2026-07-17T18:01:44.529-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13025",
      "summary": "Agendamento de treinamento para equipe Meu Copo Porto",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:01:35.260-0300",
      "updated": "2026-07-17T18:01:42.578-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13024",
      "summary": "Permitir consulta de contatos entre departamentos para usuários não-gestores",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:01:35.069-0300",
      "updated": "2026-07-17T18:01:42.292-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13022",
      "summary": "Simulação de valores para mudança de plano - consumo por templates Meta vs Poli",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:01:34.871-0300",
      "updated": "2026-07-17T18:01:41.731-0300",
      "module": "Configurações",
      "classification": "indefinido"
    },
    {
      "key": "SM-13021",
      "summary": "Regularização de pagamento - boleto em atraso",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:01:34.169-0300",
      "updated": "2026-07-17T18:01:41.273-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-13020",
      "summary": "Cliente solicita contato direto com atendente específica (Jennifer)",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:01:33.015-0300",
      "updated": "2026-07-17T18:01:40.313-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13015",
      "summary": "Desbloqueio de conta/funcionalidade solicitado pelo cliente",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:01:28.752-0300",
      "updated": "2026-07-17T18:01:38.707-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13018",
      "summary": "Melhoria da quantidade numérica nas filas de atendimento",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:01:29.152-0300",
      "updated": "2026-07-17T18:01:36.680-0300",
      "module": "Distribuição / Filas",
      "classification": "poli"
    },
    {
      "key": "SM-13019",
      "summary": "Chatbot distribui chats recentes antes dos mais antigos",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:01:29.289-0300",
      "updated": "2026-07-17T18:01:36.470-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-13016",
      "summary": "Etiquetas não aparecem em outro momento após serem colocadas no chat",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:01:28.949-0300",
      "updated": "2026-07-17T18:01:36.429-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13014",
      "summary": "Explicação sobre valores e simulação de consumo de templates Meta e Poli",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:01:28.719-0300",
      "updated": "2026-07-17T18:01:36.385-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-13017",
      "summary": "Auditoria de relatórios de quantidade de chats por operador",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:01:29.066-0300",
      "updated": "2026-07-17T18:01:36.338-0300",
      "module": "Permissões / Roles",
      "classification": "poli"
    },
    {
      "key": "SM-13013",
      "summary": "Cliente questionou sobre mudança de contrato",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:01:28.127-0300",
      "updated": "2026-07-17T18:01:35.707-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13012",
      "summary": "Cliente direcionou questões de pagamento para o coordenador Vanderlei Mendonça",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:01:27.714-0300",
      "updated": "2026-07-17T18:01:35.120-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13010",
      "summary": "Reunião sobre questões de BM (Business Manager) e restrições da Meta",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:01:24.588-0300",
      "updated": "2026-07-17T18:01:33.366-0300",
      "module": "Permissões / Roles",
      "classification": "poli"
    },
    {
      "key": "SM-13011",
      "summary": "Cliente questionou aumento nos valores da simulação de plano",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:01:25.776-0300",
      "updated": "2026-07-17T18:01:33.298-0300",
      "module": "Contatos",
      "classification": "indefinido"
    },
    {
      "key": "SM-13009",
      "summary": "PDF enviado por cliente aparece apenas como texto 'PDF' sem o arquivo anexado",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:01:23.700-0300",
      "updated": "2026-07-17T18:01:32.457-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13008",
      "summary": "Como gerar templates para WhatsApp?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:01:22.433-0300",
      "updated": "2026-07-17T18:01:29.941-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-13007",
      "summary": "Qual o valor para adicionar usuário ao plano?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:01:22.413-0300",
      "updated": "2026-07-17T18:01:29.718-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-13006",
      "summary": "Apresentação de simulação de alteração de pagamento para cliente",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:01:19.874-0300",
      "updated": "2026-07-17T18:01:27.439-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-13005",
      "summary": "Dúvida sobre simulação de custos de templates e consumo",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:01:19.383-0300",
      "updated": "2026-07-17T18:01:27.018-0300",
      "module": "Configurações",
      "classification": "indefinido"
    },
    {
      "key": "SM-13004",
      "summary": "Simulação de custos de plano apresentada ao cliente",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:01:19.181-0300",
      "updated": "2026-07-17T18:01:26.717-0300",
      "module": "Contatos",
      "classification": "indefinido"
    },
    {
      "key": "SM-13003",
      "summary": "Simulação de custos de plano apresentada ao cliente",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T18:01:16.207-0300",
      "updated": "2026-07-17T18:01:23.775-0300",
      "module": "Contatos",
      "classification": "indefinido"
    },
    {
      "key": "SM-12998",
      "summary": "Conversa finaliza antes do tempo e aparece como bloqueada",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T17:59:21.368-0300",
      "updated": "2026-07-17T17:59:38.679-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13002",
      "summary": "Configuração de bot e fluxo de atendimento para Grupo Toys",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T17:59:21.659-0300",
      "updated": "2026-07-17T17:59:28.846-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-13000",
      "summary": "Horário de funcionamento bloqueia o cliente de enviar mensagens?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T17:59:21.470-0300",
      "updated": "2026-07-17T17:59:28.649-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-13001",
      "summary": "Canal WhatsApp restrito não conecta mesmo após trocar para Messenger",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T17:59:21.572-0300",
      "updated": "2026-07-17T17:59:28.626-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12999",
      "summary": "Como modificar o bot após criado?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T17:59:21.376-0300",
      "updated": "2026-07-17T17:59:28.382-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-12995",
      "summary": "Créditos não aparecem na conta mesmo após limpeza de cache",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T17:59:11.962-0300",
      "updated": "2026-07-17T17:59:21.303-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-12996",
      "summary": "Cliente perguntou sobre o número de WhatsApp de suporte antigo que não recebe mais mensagens",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T17:59:11.970-0300",
      "updated": "2026-07-17T17:59:20.332-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12997",
      "summary": "Chatbot ficou fora do ar por aproximadamente 4 horas",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T17:59:12.005-0300",
      "updated": "2026-07-17T17:59:19.374-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-12992",
      "summary": "Revisão de cobrança duplicada e reativação de conta suspensa",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T17:59:11.407-0300",
      "updated": "2026-07-17T17:59:19.212-0300",
      "module": "Configurações",
      "classification": "indefinido"
    },
    {
      "key": "SM-12994",
      "summary": "Reunião sobre alterações de pagamento e simulação de valores",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T17:59:11.562-0300",
      "updated": "2026-07-17T17:59:18.898-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12993",
      "summary": "Melhoria no processo de tratamento de disputas de cobrança para evitar suspensão indevida",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T17:59:11.553-0300",
      "updated": "2026-07-17T17:59:18.644-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12989",
      "summary": "Dúvida sobre mudança de cobrança e impacto nos valores do plano",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T17:59:09.105-0300",
      "updated": "2026-07-17T17:59:18.204-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12990",
      "summary": "Solicitação de envio de contrato e detalhes de créditos contratados",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T17:59:09.218-0300",
      "updated": "2026-07-17T17:59:16.486-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12991",
      "summary": "Contato sobre alterações de pagamento e novas condições de faturamento",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T17:59:09.213-0300",
      "updated": "2026-07-17T17:59:16.229-0300",
      "module": "Contatos",
      "classification": "indefinido"
    },
    {
      "key": "SM-12988",
      "summary": "Simulação de valores de plano e consumo de templates",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T17:59:08.451-0300",
      "updated": "2026-07-17T17:59:15.640-0300",
      "module": "Configurações",
      "classification": "indefinido"
    },
    {
      "key": "SM-12987",
      "summary": "Reunião sobre problema com portfólio e publicidade devido à moeda brasileira",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T17:59:03.312-0300",
      "updated": "2026-07-17T17:59:11.269-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12986",
      "summary": "Desbloqueio de conta por atraso no pagamento",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T17:54:30.969-0300",
      "updated": "2026-07-17T17:54:38.236-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-12985",
      "summary": "Solicitação de compensação de fatura",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T16:11:30.770-0300",
      "updated": "2026-07-17T16:11:37.859-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12984",
      "summary": "Comunicação sobre alterações na fatura e mudanças em conjunto com Meta",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T16:11:10.012-0300",
      "updated": "2026-07-17T16:11:17.382-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12983",
      "summary": "Dúvida sobre uso de variáveis em templates do Meta",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T16:11:09.851-0300",
      "updated": "2026-07-17T16:11:17.360-0300",
      "module": "Configurações",
      "classification": "indefinido"
    },
    {
      "key": "SM-12974",
      "summary": "Cancelamento de pacotes de créditos adicionais",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:24:31.375-0300",
      "updated": "2026-07-17T08:24:50.075-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12982",
      "summary": "Mensagens não são enviadas - ficam com relojinho em múltiplas lojas",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:24:39.425-0300",
      "updated": "2026-07-17T08:24:46.892-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12981",
      "summary": "Problema com automação/bot não funcionando corretamente para usuário específico",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:24:35.649-0300",
      "updated": "2026-07-17T08:24:45.845-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-12977",
      "summary": "É possível manter acesso à plataforma sem consumo de créditos apenas para consulta?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:24:35.191-0300",
      "updated": "2026-07-17T08:24:42.750-0300",
      "module": "Permissões / Roles",
      "classification": "poli"
    },
    {
      "key": "SM-12980",
      "summary": "Como fazer backup de contatos e histórico de conversas?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:24:35.279-0300",
      "updated": "2026-07-17T08:24:42.737-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12978",
      "summary": "Por que o serviço foi bloqueado se houve pagamento?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:24:35.218-0300",
      "updated": "2026-07-17T08:24:42.445-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12979",
      "summary": "Liberação de serviço bloqueado após pagamento",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:24:35.228-0300",
      "updated": "2026-07-17T08:24:42.436-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12976",
      "summary": "Múltiplos problemas persistentes reportados pelo cliente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:24:34.855-0300",
      "updated": "2026-07-17T08:24:42.264-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12971",
      "summary": "Cliente enviou feedbacks em vídeo sobre a plataforma",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:24:29.944-0300",
      "updated": "2026-07-17T08:24:40.313-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12975",
      "summary": "Solicitação de boleto, NF e cadastro de e-mail do financeiro",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:24:32.110-0300",
      "updated": "2026-07-17T08:24:39.501-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12973",
      "summary": "Como funciona a cobrança de créditos nas ligações pela plataforma?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:24:30.943-0300",
      "updated": "2026-07-17T08:24:38.858-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12972",
      "summary": "Como verificar e reativar conta suspensa",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:24:30.195-0300",
      "updated": "2026-07-17T08:24:37.592-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-12970",
      "summary": "Reunião sobre mudanças financeiras com cliente Siacon",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:24:25.747-0300",
      "updated": "2026-07-17T08:24:33.418-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12969",
      "summary": "Atraso de 15 minutos no envio de mensagens para clientes",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:24:22.655-0300",
      "updated": "2026-07-17T08:24:30.080-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12968",
      "summary": "Confirmação de pagamento e remoção de aviso",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:24:22.165-0300",
      "updated": "2026-07-17T08:24:29.477-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12967",
      "summary": "Como identificar de qual canal é um template e por que template não aparece para envio",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:24:21.623-0300",
      "updated": "2026-07-17T08:24:28.967-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12966",
      "summary": "Erro ao mover contatos no funil - afeta todos os contatos",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:23:54.095-0300",
      "updated": "2026-07-17T08:24:01.541-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12955",
      "summary": "Filtro de conversas não retorna todos os contatos atribuídos ao operador",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:23:40.783-0300",
      "updated": "2026-07-17T08:24:00.899-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12952",
      "summary": "Arquivos CSV enviados são convertidos para TXT ao serem recebidos pelo cliente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:23:39.888-0300",
      "updated": "2026-07-17T08:23:52.330-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12950",
      "summary": "Problema técnico não resolvido há mais de 20 dias - cliente aguardando resposta",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:23:38.735-0300",
      "updated": "2026-07-17T08:23:51.754-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12957",
      "summary": "Nome de variável/campo não aceita caractere dois pontos (:)",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:23:41.289-0300",
      "updated": "2026-07-17T08:23:50.313-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12965",
      "summary": "Permitir cadastro de produtos/SKU vinculados a tickets com relatório de defeitos no CRM",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:23:42.863-0300",
      "updated": "2026-07-17T08:23:50.311-0300",
      "module": "Relatórios / SLA",
      "classification": "poli"
    },
    {
      "key": "SM-12962",
      "summary": "Como remover o deslogamento automático de 60 minutos?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:23:42.643-0300",
      "updated": "2026-07-17T08:23:50.198-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12964",
      "summary": "Problema do produto não aparece ao criar ticket direto da Poli após atualização",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:23:42.667-0300",
      "updated": "2026-07-17T08:23:49.998-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12963",
      "summary": "Como cadastrar produtos/SKU e vincular a tickets no CRM para análise de defeitos?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:23:42.639-0300",
      "updated": "2026-07-17T08:23:49.847-0300",
      "module": "Integrações Externas",
      "classification": "poli"
    },
    {
      "key": "SM-12959",
      "summary": "Dúvida sobre notificação/mensagem recebida na plataforma",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:23:41.371-0300",
      "updated": "2026-07-17T08:23:49.261-0300",
      "module": "Chat / Mensagens",
      "classification": "indefinido"
    },
    {
      "key": "SM-12961",
      "summary": "Melhorar filtro de busca para incluir campos personalizados e nomes de contatos",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:23:41.591-0300",
      "updated": "2026-07-17T08:23:49.215-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12956",
      "summary": "Mensagens enviadas para um contato estão indo para outro destinatário",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:23:41.253-0300",
      "updated": "2026-07-17T08:23:48.826-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12958",
      "summary": "Confirmação de horário e realização de treinamento - T7 Soluções Digitais",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:23:41.294-0300",
      "updated": "2026-07-17T08:23:48.776-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-12960",
      "summary": "Liberação de créditos para disparo de mensagens - T7 Soluções Digitais",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:23:41.414-0300",
      "updated": "2026-07-17T08:23:48.698-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12954",
      "summary": "Permitir que arquivos recebidos mantenham nomenclatura original",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:23:40.249-0300",
      "updated": "2026-07-17T08:23:48.199-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12953",
      "summary": "Chats não são distribuídos para atendentes após finalizar fluxo do bot",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:23:39.931-0300",
      "updated": "2026-07-17T08:23:47.613-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-12945",
      "summary": "Conversas não atualizam automaticamente após nova atualização do sistema",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:23:37.404-0300",
      "updated": "2026-07-17T08:23:47.366-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12951",
      "summary": "Agendamento de reunião para tratar problema técnico pendente",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:23:38.928-0300",
      "updated": "2026-07-17T08:23:46.483-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12948",
      "summary": "Solicitação de link da gravação do treinamento",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:23:38.292-0300",
      "updated": "2026-07-17T08:23:46.065-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12947",
      "summary": "Operações travadas ao usar template aprovado - mensagens não sendo enviadas",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:23:38.282-0300",
      "updated": "2026-07-17T08:23:45.958-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12949",
      "summary": "Treinamento e homologação - Colégio Camminare",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:23:38.358-0300",
      "updated": "2026-07-17T08:23:45.914-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12946",
      "summary": "Melhorar sistema de atualização em tempo real das conversas",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:23:37.878-0300",
      "updated": "2026-07-17T08:23:45.596-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12944",
      "summary": "Onde verificar se a restrição da META foi liberada",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:23:37.314-0300",
      "updated": "2026-07-17T08:23:45.256-0300",
      "module": "Permissões / Roles",
      "classification": "externo"
    },
    {
      "key": "SM-12942",
      "summary": "Como fazer disparo de mensagens na plataforma",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:23:36.921-0300",
      "updated": "2026-07-17T08:23:44.579-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12943",
      "summary": "Reunião para treinamento sobre disparo de mensagens",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:23:36.983-0300",
      "updated": "2026-07-17T08:23:44.509-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12941",
      "summary": "Nome do cliente correto mas exibindo conversa de outro cliente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:23:36.910-0300",
      "updated": "2026-07-17T08:23:44.260-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12940",
      "summary": "Distribuição de chats desigual - alguns atendentes não recebem direcionamentos",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:23:36.669-0300",
      "updated": "2026-07-17T08:23:44.162-0300",
      "module": "Distribuição / Filas",
      "classification": "poli"
    },
    {
      "key": "SM-12939",
      "summary": "Mensagens não estão sendo enviadas para cliente específico",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:23:35.532-0300",
      "updated": "2026-07-17T08:23:42.888-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12938",
      "summary": "Baixa de pagamento após comprovante enviado",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:23:34.834-0300",
      "updated": "2026-07-17T08:23:42.582-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12937",
      "summary": "Confirmação de recebimento sobre situação de boletos",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:23:32.773-0300",
      "updated": "2026-07-17T08:23:40.318-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12936",
      "summary": "Mensagens chegam pelo menu mas não aparecem na conversa ou aparecem fora de ordem",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:23:32.468-0300",
      "updated": "2026-07-17T08:23:39.949-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12935",
      "summary": "Cliente verificando situação de boleto",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:23:32.182-0300",
      "updated": "2026-07-17T08:23:39.785-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12934",
      "summary": "Chats não sobem para o topo ao receber novas mensagens",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:23:31.587-0300",
      "updated": "2026-07-17T08:23:38.758-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12933",
      "summary": "QR Code não aparece ao tentar conectar canal web",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:23:30.787-0300",
      "updated": "2026-07-17T08:23:38.347-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12932",
      "summary": "Cliente com dúvida sobre acesso ao sistema",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:23:30.783-0300",
      "updated": "2026-07-17T08:23:38.334-0300",
      "module": "Contatos",
      "classification": "indefinido"
    },
    {
      "key": "SM-12931",
      "summary": "Bug visual reportado pelo cliente via vídeo",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:23:29.392-0300",
      "updated": "2026-07-17T08:23:37.115-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12918",
      "summary": "Pré-visualização de chat não acompanha última mensagem enviada",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:18.926-0300",
      "updated": "2026-07-17T08:18:49.745-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12928",
      "summary": "WhatsApp ainda fica ativo após homologação da API Oficial?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:25.897-0300",
      "updated": "2026-07-17T08:18:41.124-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12914",
      "summary": "Mensagens marcadas (reply) não aparecem para o atendente na plataforma",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:18.175-0300",
      "updated": "2026-07-17T08:18:36.308-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12930",
      "summary": "Template aparecendo antes das 24h mesmo com cliente respondendo recentemente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:26.366-0300",
      "updated": "2026-07-17T08:18:33.686-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12929",
      "summary": "Lentidão para carregar mensagens no aplicativo mobile",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:26.090-0300",
      "updated": "2026-07-17T08:18:33.557-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12926",
      "summary": "Tela travando no computador",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:25.879-0300",
      "updated": "2026-07-17T08:18:33.344-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12927",
      "summary": "Reconexão de canal API Oficial para corrigir erro de crédito Meta",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:25.886-0300",
      "updated": "2026-07-17T08:18:33.131-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12897",
      "summary": "Mensagens sem atendente não aparecem na aba correta - ficam apenas em 'Todas as mensagens'",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:14.283-0300",
      "updated": "2026-07-17T08:18:32.965-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12925",
      "summary": "Permitir separação de contatos por canal/loja",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:21.704-0300",
      "updated": "2026-07-17T08:18:29.186-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12911",
      "summary": "Bot com informações inconsistentes após edição não autorizada",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:17.373-0300",
      "updated": "2026-07-17T08:18:29.186-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-12924",
      "summary": "Mensagens rápidas precisam de aprovação da Meta e quem pode criar?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:21.361-0300",
      "updated": "2026-07-17T08:18:28.752-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12923",
      "summary": "Contatos podem ser separados por canal para não misturar entre lojas?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:21.328-0300",
      "updated": "2026-07-17T08:18:28.752-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12921",
      "summary": "Etiquetas podem ser direcionadas para canais específicos?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:21.288-0300",
      "updated": "2026-07-17T08:18:28.699-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12922",
      "summary": "Mensagens rápidas aparecem em todos os canais ou podem ser separadas?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:21.303-0300",
      "updated": "2026-07-17T08:18:28.697-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12920",
      "summary": "Templates podem ser compartilhados entre canais ou precisa ser um para cada?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:21.267-0300",
      "updated": "2026-07-17T08:18:28.501-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12917",
      "summary": "Mensagem enviada pelo chat some e não chega ao destinatário",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:19.020-0300",
      "updated": "2026-07-17T08:18:26.571-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12919",
      "summary": "Etiquetas com comportamento incorreto",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:18.969-0300",
      "updated": "2026-07-17T08:18:26.493-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12916",
      "summary": "Usuário não vinculado a nenhum canal - como configurar",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:18.875-0300",
      "updated": "2026-07-17T08:18:26.008-0300",
      "module": "Canais",
      "classification": "indefinido"
    },
    {
      "key": "SM-12915",
      "summary": "Exibir mensagens marcadas (reply/citação) na interface do atendente",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:18.350-0300",
      "updated": "2026-07-17T08:18:25.760-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12913",
      "summary": "Mensagens não chegam para o atendente sem atualizar a página",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:18.137-0300",
      "updated": "2026-07-17T08:18:25.282-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12910",
      "summary": "Revisão e correção completa do bot do cliente",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:17.375-0300",
      "updated": "2026-07-17T08:18:25.158-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-12912",
      "summary": "Implementar log de alterações do bot com identificação do responsável",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:17.559-0300",
      "updated": "2026-07-17T08:18:24.767-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-12892",
      "summary": "Opção de adicionar canal WhatsApp Broker (não oficial) não aparecia para o cliente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:08.811-0300",
      "updated": "2026-07-17T08:18:24.483-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12909",
      "summary": "Envio de boleto do mês anterior",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:16.261-0300",
      "updated": "2026-07-17T08:18:23.854-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12906",
      "summary": "Exclusão de usuário que não trabalha mais na empresa",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:16.118-0300",
      "updated": "2026-07-17T08:18:23.334-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12907",
      "summary": "Qual o valor que a Meta cobra por template?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:16.120-0300",
      "updated": "2026-07-17T08:18:23.294-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-12908",
      "summary": "Como funciona o cancelamento caso não queiram seguir no novo modelo?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:16.136-0300",
      "updated": "2026-07-17T08:18:23.263-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12905",
      "summary": "Acordo de pagamento para pendência financeira",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:15.606-0300",
      "updated": "2026-07-17T08:18:23.010-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12904",
      "summary": "Permitir cadastro de produtos e vinculação a tickets para classificação no CRM",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:15.130-0300",
      "updated": "2026-07-17T08:18:22.668-0300",
      "module": "Integrações Externas",
      "classification": "poli"
    },
    {
      "key": "SM-12903",
      "summary": "Por que a plataforma não funciona corretamente fora da aba anônima?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:14.923-0300",
      "updated": "2026-07-17T08:18:22.502-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12899",
      "summary": "Melhorar sincronização em tempo real de mensagens entre WhatsApp e Polichat",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:14.511-0300",
      "updated": "2026-07-17T08:18:21.963-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12902",
      "summary": "Mensagens não aparecem na plataforma em navegação normal - apenas em aba anônima",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:14.722-0300",
      "updated": "2026-07-17T08:18:21.874-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12900",
      "summary": "Chats não sendo distribuídos corretamente e mensagens com falha de entrega",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:14.548-0300",
      "updated": "2026-07-17T08:18:21.846-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12898",
      "summary": "Sincronização lenta de mensagens entre celular e Polichat",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:14.433-0300",
      "updated": "2026-07-17T08:18:21.749-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12901",
      "summary": "Como cadastrar produtos e vincular a tickets para classificação no CRM",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:14.554-0300",
      "updated": "2026-07-17T08:18:21.633-0300",
      "module": "Integrações Externas",
      "classification": "poli"
    },
    {
      "key": "SM-12896",
      "summary": "Mensagens não estão chegando para múltiplos contatos simultaneamente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:11.702-0300",
      "updated": "2026-07-17T08:18:19.172-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12895",
      "summary": "Polichat cai frequentemente e não atualiza mensagens sem F5",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:11.433-0300",
      "updated": "2026-07-17T08:18:18.693-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12894",
      "summary": "Conversas sendo misturadas entre clientes diferentes",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:08.939-0300",
      "updated": "2026-07-17T08:18:16.484-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12893",
      "summary": "Reenvio de e-mail para admin@wu.com.br",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:08.834-0300",
      "updated": "2026-07-17T08:18:16.123-0300",
      "module": "Permissões / Roles",
      "classification": "poli"
    },
    {
      "key": "SM-12891",
      "summary": "Solicitação de pagamento via PIX após falha no cartão de crédito",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:08.598-0300",
      "updated": "2026-07-17T08:18:15.807-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12888",
      "summary": "Quando será a próxima atualização da plataforma?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:08.202-0300",
      "updated": "2026-07-17T08:18:15.654-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12890",
      "summary": "Mensagens ficando no relógio (não enviadas) mesmo após F5 e aba anônima",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:08.479-0300",
      "updated": "2026-07-17T08:18:15.632-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12889",
      "summary": "Qual o CNPJ cadastrado na conta da empresa?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:08.408-0300",
      "updated": "2026-07-17T08:18:15.577-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-12887",
      "summary": "Dúvida sobre cobrança de transcrição de áudio",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:06.815-0300",
      "updated": "2026-07-17T08:18:14.051-0300",
      "module": "Chat / Mensagens",
      "classification": "indefinido"
    },
    {
      "key": "SM-12886",
      "summary": "Prorrogação de vencimento de boleto para 24/07",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:04.593-0300",
      "updated": "2026-07-17T08:18:11.778-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12885",
      "summary": "Envio de 2ª via de boleto e alteração de cartão de crédito",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:01.334-0300",
      "updated": "2026-07-17T08:18:08.818-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12884",
      "summary": "Plataforma inativa por pendência financeira - liberação solicitada",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:00.957-0300",
      "updated": "2026-07-17T08:18:08.477-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12883",
      "summary": "Como vincular outro cartão de crédito no sistema?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:18:00.936-0300",
      "updated": "2026-07-17T08:18:08.253-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12882",
      "summary": "Suporte remoto via AnyDesk para resolução de problema",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:17:59.483-0300",
      "updated": "2026-07-17T08:18:07.615-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12881",
      "summary": "Onde visualizar faturas mês a mês no portal",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:17:56.583-0300",
      "updated": "2026-07-17T08:18:03.778-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12880",
      "summary": "Lentidão persistente no chat - mensagens não aparecem sem atualizar página",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-17T08:17:55.606-0300",
      "updated": "2026-07-17T08:18:03.484-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12879",
      "summary": "Cliente não consegue acessar conta - senha inválida e recuperação não chega no e-mail",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-16T17:26:35.231-0300",
      "updated": "2026-07-16T17:26:54.750-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12878",
      "summary": "Treinamento agendado para Infinity Cred",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-16T17:26:34.927-0300",
      "updated": "2026-07-16T17:26:42.463-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12877",
      "summary": "Como importar vários contatos de uma vez no sistema?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-16T10:54:18.461-0300",
      "updated": "2026-07-16T10:54:25.953-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12876",
      "summary": "Cliente solicita 2ª via de boleto/faturamento",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-16T10:52:39.788-0300",
      "updated": "2026-07-16T10:52:47.501-0300",
      "module": "Contatos",
      "classification": "indefinido"
    },
    {
      "key": "SM-12875",
      "summary": "Cliente enviou comprovante de pagamento para baixa",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-16T09:53:15.501-0300",
      "updated": "2026-07-16T09:53:23.286-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12874",
      "summary": "Cliente solicitou adição de mais um canal",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-16T09:53:15.434-0300",
      "updated": "2026-07-16T09:53:23.195-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12871",
      "summary": "Configuração de departamentos por cidade e criação de novo usuário",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-16T09:35:07.946-0300",
      "updated": "2026-07-16T09:35:33.025-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-12872",
      "summary": "Contatos não estão sendo capturados corretamente pelo bot",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-16T09:35:08.034-0300",
      "updated": "2026-07-16T09:35:15.878-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-12869",
      "summary": "Instabilidade na plataforma durante manutenção noturna",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-16T09:35:07.797-0300",
      "updated": "2026-07-16T09:35:15.793-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12873",
      "summary": "Quantidade de usuários disponíveis no plano e valor de usuário adicional",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-16T09:35:08.046-0300",
      "updated": "2026-07-16T09:35:15.568-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12870",
      "summary": "Configuração de horário de funcionamento no bot",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-16T09:35:07.910-0300",
      "updated": "2026-07-16T09:35:15.190-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-12868",
      "summary": "Encarteiramento de clientes nunca funcionou",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-16T09:34:58.413-0300",
      "updated": "2026-07-16T09:35:06.016-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12867",
      "summary": "Melhoria no sistema de encarteiramento de clientes",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-16T09:34:58.330-0300",
      "updated": "2026-07-16T09:35:05.924-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12866",
      "summary": "Muitas mensagens bloqueadas",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-16T09:34:57.945-0300",
      "updated": "2026-07-16T09:35:05.543-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12865",
      "summary": "Atualização de contato - responsável não trabalha mais na empresa",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-16T08:32:33.948-0300",
      "updated": "2026-07-16T08:32:41.618-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12864",
      "summary": "Cliente perguntou se os boletos continuarão chegando por e-mail",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-16T08:22:31.821-0300",
      "updated": "2026-07-16T08:22:39.288-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12863",
      "summary": "Conversas antigas encerradas voltando na tela e não saem ao tentar finalizar",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-16T08:22:27.524-0300",
      "updated": "2026-07-16T08:22:37.186-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12862",
      "summary": "Como acessar o gerenciador de números de telefone do WhatsApp Business",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T18:04:27.191-0300",
      "updated": "2026-07-15T18:04:34.628-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12861",
      "summary": "Dúvida sobre alteração na metodologia de contagem de contatos receptivos",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T17:42:26.922-0300",
      "updated": "2026-07-15T17:42:34.760-0300",
      "module": "Contatos",
      "classification": "indefinido"
    },
    {
      "key": "SM-12859",
      "summary": "Visão geral mostra última mensagem do cliente em vez da última do chat",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:42.979-0300",
      "updated": "2026-07-15T08:15:50.894-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12858",
      "summary": "Simplificar o Funil de Vendas",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:42.794-0300",
      "updated": "2026-07-15T08:15:50.877-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12860",
      "summary": "Chats não sobem para o topo após encaminhar chamado",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:43.044-0300",
      "updated": "2026-07-15T08:15:50.763-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12857",
      "summary": "Bug visual ou funcional reportado pelo cliente (imagem enviada)",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:42.539-0300",
      "updated": "2026-07-15T08:15:50.622-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12856",
      "summary": "Áudio não envia na plataforma - fica girando e desaparece",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:39.033-0300",
      "updated": "2026-07-15T08:15:46.263-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12854",
      "summary": "App Android deslogando com frequência",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:37.658-0300",
      "updated": "2026-07-15T08:15:46.121-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12855",
      "summary": "Dificuldade ao filtrar contatos no chat como operador",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:38.419-0300",
      "updated": "2026-07-15T08:15:45.740-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12827",
      "summary": "Como corrigir contatos que não recebem mensagens na plataforma",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:18.512-0300",
      "updated": "2026-07-15T08:15:43.200-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12828",
      "summary": "Supervisor não consegue pesquisar clientes enquanto operador com menos privilégios consegue",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:18.804-0300",
      "updated": "2026-07-15T08:15:42.767-0300",
      "module": "Permissões / Roles",
      "classification": "poli"
    },
    {
      "key": "SM-12853",
      "summary": "Como reconectar número comercial desconectado no Polichat",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:33.375-0300",
      "updated": "2026-07-15T08:15:40.816-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12852",
      "summary": "Erro não identificado exibido na tela do cliente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:33.242-0300",
      "updated": "2026-07-15T08:15:40.390-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12847",
      "summary": "Como editar ou alterar informações de um contato na plataforma",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:29.383-0300",
      "updated": "2026-07-15T08:15:40.285-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12851",
      "summary": "Erro ao salvar usuário após mudança de nome do canal",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:31.713-0300",
      "updated": "2026-07-15T08:15:39.011-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12850",
      "summary": "Operador de chat sem acesso a campanha mesmo após liberação",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:30.683-0300",
      "updated": "2026-07-15T08:15:37.994-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12849",
      "summary": "Todos os chats encerrados voltam como não lidos com contador de mensagem vazio",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:29.580-0300",
      "updated": "2026-07-15T08:15:37.445-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12848",
      "summary": "Chats encerrados voltam como não lidos sem mensagem do cliente",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:29.477-0300",
      "updated": "2026-07-15T08:15:36.740-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12846",
      "summary": "Mensagens não estão sendo entregues de forma intermitente para contato específico",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:29.347-0300",
      "updated": "2026-07-15T08:15:36.702-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12824",
      "summary": "Mensagens de clientes não aparecem sem atualizar página - notificação sonora funciona mas chat não atualiza",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:15.744-0300",
      "updated": "2026-07-15T08:15:34.603-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12841",
      "summary": "Acesso ao CRM desativado sem motivo aparente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:23.246-0300",
      "updated": "2026-07-15T08:15:34.331-0300",
      "module": "Permissões / Roles",
      "classification": "poli"
    },
    {
      "key": "SM-12845",
      "summary": "Bug persistente mesmo em aba anônima - aguardando resolução",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:25.675-0300",
      "updated": "2026-07-15T08:15:33.158-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12844",
      "summary": "Liberação de conta após pagamento de fatura",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:23.823-0300",
      "updated": "2026-07-15T08:15:31.482-0300",
      "module": "Configurações",
      "classification": "indefinido"
    },
    {
      "key": "SM-12843",
      "summary": "Alertas proativos quando acessos são desativados automaticamente",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:23.398-0300",
      "updated": "2026-07-15T08:15:30.984-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12842",
      "summary": "Liberação de acesso ao CRM para equipe",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:23.319-0300",
      "updated": "2026-07-15T08:15:30.753-0300",
      "module": "Permissões / Roles",
      "classification": "poli"
    },
    {
      "key": "SM-12835",
      "summary": "Como salvar contatos corretamente na plataforma",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:19.480-0300",
      "updated": "2026-07-15T08:15:30.067-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12839",
      "summary": "Template aprovado não aparece em algumas conversas",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:20.150-0300",
      "updated": "2026-07-15T08:15:29.942-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12829",
      "summary": "Alteração de data de vencimento de fatura para dois CNPJs",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:18.915-0300",
      "updated": "2026-07-15T08:15:28.162-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12840",
      "summary": "Exibir foto do canal para o cliente durante a conversa",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:20.488-0300",
      "updated": "2026-07-15T08:15:28.017-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12837",
      "summary": "Como colocar foto/imagem para identificar os canais da empresa",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:20.082-0300",
      "updated": "2026-07-15T08:15:27.425-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12838",
      "summary": "Conversas com template enviado não aparecem na lista mesmo com filtro 'todas as conversas'",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:20.077-0300",
      "updated": "2026-07-15T08:15:27.333-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12831",
      "summary": "Revisar lógica de permissões de busca de contatos para garantir hierarquia correta",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:19.329-0300",
      "updated": "2026-07-15T08:15:26.966-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12836",
      "summary": "Alteração de permissões de usuário - excluir ex-gestora e transferir acessos",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:19.685-0300",
      "updated": "2026-07-15T08:15:26.917-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12833",
      "summary": "Mensagem mostra relógio de não enviada mas paciente recebe e responde",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:19.450-0300",
      "updated": "2026-07-15T08:15:26.877-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12832",
      "summary": "Permitir configuração de prazo maior entre emissão de NF e vencimento do boleto",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:19.387-0300",
      "updated": "2026-07-15T08:15:26.748-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-12834",
      "summary": "Mensagens de pacientes não aparecem na lista de chats, apenas ao pesquisar",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:19.459-0300",
      "updated": "2026-07-15T08:15:26.553-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12830",
      "summary": "Como acessar boletos e notas fiscais no portal do cliente",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:18.986-0300",
      "updated": "2026-07-15T08:15:26.522-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12826",
      "summary": "Reativação de conta após pagamento via Pix",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:17.677-0300",
      "updated": "2026-07-15T08:15:24.983-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-12825",
      "summary": "Melhoria na sincronização em tempo real do chat e atualização automática de status",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:16.115-0300",
      "updated": "2026-07-15T08:15:23.898-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12822",
      "summary": "Créditos de disparo não aparecem no sistema após migração de link",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:10.893-0300",
      "updated": "2026-07-15T08:15:22.027-0300",
      "module": "Disparos / Campanhas",
      "classification": "poli"
    },
    {
      "key": "SM-12823",
      "summary": "Atendente consegue visualizar clientes de outros atendentes",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:13.044-0300",
      "updated": "2026-07-15T08:15:20.201-0300",
      "module": "Distribuição / Filas",
      "classification": "poli"
    },
    {
      "key": "SM-12821",
      "summary": "Cliente solicita envio do contrato",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-15T08:15:10.876-0300",
      "updated": "2026-07-15T08:15:18.904-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12820",
      "summary": "Diferença entre templates de Utilidade e Marketing no WhatsApp",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T15:50:12.966-0300",
      "updated": "2026-07-14T15:50:21.541-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12818",
      "summary": "Foto de perfil e nome da empresa não aparecem para os clientes no WhatsApp",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T15:14:55.433-0300",
      "updated": "2026-07-14T15:15:11.804-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12819",
      "summary": "Mensagens recebidas durante período offline serão recuperadas?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T15:14:55.471-0300",
      "updated": "2026-07-14T15:15:03.243-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12817",
      "summary": "Créditos não apareceram na conta e transcrição de áudios não funcionava",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T15:14:55.415-0300",
      "updated": "2026-07-14T15:15:03.192-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12815",
      "summary": "Verificação de créditos pendentes na conta do cliente",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T15:14:55.339-0300",
      "updated": "2026-07-14T15:15:02.803-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12816",
      "summary": "Erro 'Destinatário não alcançado' ao enviar templates de WhatsApp",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T15:14:55.412-0300",
      "updated": "2026-07-14T15:15:02.742-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12814",
      "summary": "Usuários são deslogados automaticamente ao usar Poli no celular e PC simultaneamente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T15:14:55.156-0300",
      "updated": "2026-07-14T15:15:02.421-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12813",
      "summary": "Cliente não consegue adicionar informações de horário de funcionamento",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T15:14:55.046-0300",
      "updated": "2026-07-14T15:15:02.277-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12812",
      "summary": "Como acompanhar e entender o consumo de créditos na plataforma",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T13:46:03.783-0300",
      "updated": "2026-07-14T13:46:11.226-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12811",
      "summary": "Liberação de conta suspensa após pagamento de boleto",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T13:46:03.517-0300",
      "updated": "2026-07-14T13:46:11.166-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-12809",
      "summary": "Inativação de usuário e transferência de automações/chats",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T13:30:33.784-0300",
      "updated": "2026-07-14T13:30:41.610-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12810",
      "summary": "Como transferir automações de um usuário excluído para outro",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T13:30:33.788-0300",
      "updated": "2026-07-14T13:30:41.593-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12808",
      "summary": "Como marcar contatos que clicaram em 'não tenho interesse' no template",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T10:42:55.033-0300",
      "updated": "2026-07-14T10:43:03.222-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12807",
      "summary": "Erro de acesso para usuário gestor",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T10:42:54.815-0300",
      "updated": "2026-07-14T10:43:02.938-0300",
      "module": "Permissões / Roles",
      "classification": "poli"
    },
    {
      "key": "SM-12805",
      "summary": "Acesso remoto via AnyDesk para configuração de conta de anúncios",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T10:40:06.850-0300",
      "updated": "2026-07-14T10:40:16.790-0300",
      "module": "Permissões / Roles",
      "classification": "indefinido"
    },
    {
      "key": "SM-12804",
      "summary": "Solicitação de avaliação no Google",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T10:40:06.740-0300",
      "updated": "2026-07-14T10:40:14.631-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12806",
      "summary": "Problema com funcionalidade não especificada - tela travada/não carregando",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T10:40:06.990-0300",
      "updated": "2026-07-14T10:40:14.512-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12803",
      "summary": "Treinamento de equipe agendado e realizado",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T10:40:06.635-0300",
      "updated": "2026-07-14T10:40:14.408-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12800",
      "summary": "Funcionárias não conseguem enviar mensagens na plataforma",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T10:35:06.169-0300",
      "updated": "2026-07-14T10:35:26.745-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12799",
      "summary": "Reagendamento de treinamento - cliente aguardou e ninguém entrou na call",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T10:35:06.113-0300",
      "updated": "2026-07-14T10:35:14.659-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12802",
      "summary": "Solicitação de vídeo da call de treinamento",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T10:35:06.388-0300",
      "updated": "2026-07-14T10:35:14.529-0300",
      "module": "Upload / Mídia",
      "classification": "poli"
    },
    {
      "key": "SM-12801",
      "summary": "Mensagens não estão sendo enviadas - erro de período de teste grátis encerrado",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T10:35:06.349-0300",
      "updated": "2026-07-14T10:35:14.478-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12798",
      "summary": "Bot encerrando chats fora do horário de expediente incorretamente para todos os setores",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:07:27.981-0300",
      "updated": "2026-07-14T08:07:35.679-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-12795",
      "summary": "Plataforma estava lenta pela manhã - houve instabilidade?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:07:27.786-0300",
      "updated": "2026-07-14T08:07:35.513-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12794",
      "summary": "Como alterar nome de membro em departamento sem impactar atendimento ativo?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:07:27.757-0300",
      "updated": "2026-07-14T08:07:35.486-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12797",
      "summary": "Agendamento de treinamento sobre novas funcionalidades para equipe",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:07:27.895-0300",
      "updated": "2026-07-14T08:07:35.467-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12796",
      "summary": "Após editar dados do membro, precisa fazer login novamente?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:07:27.802-0300",
      "updated": "2026-07-14T08:07:35.437-0300",
      "module": "Autenticação",
      "classification": "poli"
    },
    {
      "key": "SM-12780",
      "summary": "Imagem não aparece no template aprovado - exibição inconsistente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:07:08.448-0300",
      "updated": "2026-07-14T08:07:30.752-0300",
      "module": "Upload / Mídia",
      "classification": "poli"
    },
    {
      "key": "SM-12793",
      "summary": "Inconsistência no encaminhamento de chat reportada por operadores",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:07:22.315-0300",
      "updated": "2026-07-14T08:07:29.892-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12792",
      "summary": "Melhorar feedback visual ao cancelar mensagens agendadas",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:07:19.758-0300",
      "updated": "2026-07-14T08:07:27.221-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12790",
      "summary": "Canais aparecem como desconectados na plataforma",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:07:18.946-0300",
      "updated": "2026-07-14T08:07:26.803-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12788",
      "summary": "Etiquetas com delay ao clicar e não atualizam",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:07:13.490-0300",
      "updated": "2026-07-14T08:07:26.800-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12791",
      "summary": "Cancelamento de mensagens agendadas não funciona",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:07:19.357-0300",
      "updated": "2026-07-14T08:07:26.694-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12789",
      "summary": "Problema pendente de resolução desde a semana passada",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:07:13.490-0300",
      "updated": "2026-07-14T08:07:21.323-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12787",
      "summary": "Solicitação de novo boleto/PIX sem juros após erro 'Boleto já baixado'",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:07:12.843-0300",
      "updated": "2026-07-14T08:07:20.849-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12786",
      "summary": "Melhoria no processo de acompanhamento de tickets de acesso bloqueado",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:07:11.161-0300",
      "updated": "2026-07-14T08:07:18.697-0300",
      "module": "Permissões / Roles",
      "classification": "poli"
    },
    {
      "key": "SM-12785",
      "summary": "Cliente sem acesso ao Flow desde 01/07",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:07:10.916-0300",
      "updated": "2026-07-14T08:07:18.583-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12784",
      "summary": "Verificação de erro de envio com equipe específica",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:07:10.091-0300",
      "updated": "2026-07-14T08:07:17.415-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12783",
      "summary": "Créditos descontados indevidamente - acordo de não descontar não está sendo cumprido",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:07:08.875-0300",
      "updated": "2026-07-14T08:07:16.383-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12781",
      "summary": "Permitir edição de templates aprovados",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:07:08.658-0300",
      "updated": "2026-07-14T08:07:16.202-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-12782",
      "summary": "Janelas de 24h do FNDS não estão abrindo corretamente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:07:08.691-0300",
      "updated": "2026-07-14T08:07:16.133-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12779",
      "summary": "Como enviar template para um número específico na plataforma",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:07:08.337-0300",
      "updated": "2026-07-14T08:07:15.783-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12778",
      "summary": "Mensagens recebidas não aparecem e não notificam até trocar de tela ou receber segunda mensagem",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:07:07.768-0300",
      "updated": "2026-07-14T08:07:15.762-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12763",
      "summary": "Erro ao enviar mensagem para contato - destinatário não alcançado",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:06:55.397-0300",
      "updated": "2026-07-14T08:07:15.525-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12777",
      "summary": "Plataforma com lentidão e loading infinito (relógio) mesmo após F5 e aba anônima",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:07:06.576-0300",
      "updated": "2026-07-14T08:07:14.117-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12776",
      "summary": "Continuidade de treinamento - validação de número WhatsApp pendente",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:07:04.224-0300",
      "updated": "2026-07-14T08:07:11.880-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12775",
      "summary": "Permitir adição de canais sem necessidade de alterar período de teste",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:07:03.554-0300",
      "updated": "2026-07-14T08:07:11.413-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12773",
      "summary": "Canais desconectam ao alterar período de teste da conta",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:07:03.019-0300",
      "updated": "2026-07-14T08:07:10.828-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12774",
      "summary": "Migração de usuária Barbara Souza para plataforma nova",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:07:03.163-0300",
      "updated": "2026-07-14T08:07:10.731-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12772",
      "summary": "Ativação de período de teste para adicionar novos canais",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:07:02.935-0300",
      "updated": "2026-07-14T08:07:10.416-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12771",
      "summary": "Solicitação de contato específico com Nicole para exclusão de dado",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:07:02.668-0300",
      "updated": "2026-07-14T08:07:10.040-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12765",
      "summary": "Por que o chat não foi finalizado automaticamente após 24 horas?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:06:57.239-0300",
      "updated": "2026-07-14T08:07:09.566-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12770",
      "summary": "Como criar template de mensagem com variáveis na ordem correta",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:07:00.836-0300",
      "updated": "2026-07-14T08:07:08.372-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12769",
      "summary": "Mensagens não sendo entregues em 2 de 3 números do cliente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:06:59.995-0300",
      "updated": "2026-07-14T08:07:07.364-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12762",
      "summary": "Como criar um usuário para atendente nova e qual o valor do adicional",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:06:55.345-0300",
      "updated": "2026-07-14T08:07:06.818-0300",
      "module": "Distribuição / Filas",
      "classification": "poli"
    },
    {
      "key": "SM-12768",
      "summary": "Mensagens não aparecem no chat sem atualizar F5 e lista de conversas dessincronizada",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:06:59.055-0300",
      "updated": "2026-07-14T08:07:06.466-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12767",
      "summary": "Áudio não funciona no navegador - permissão de microfone",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:06:58.143-0300",
      "updated": "2026-07-14T08:07:05.600-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12766",
      "summary": "É possível configurar fechamento automático de chat como no tempo de resposta?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:06:57.240-0300",
      "updated": "2026-07-14T08:07:05.105-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12764",
      "summary": "Configuração de fechamento automático de chats por tempo de inatividade",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:06:56.481-0300",
      "updated": "2026-07-14T08:07:04.309-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-12759",
      "summary": "Adicionar 1 usuário adicional na conta",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:06:53.830-0300",
      "updated": "2026-07-14T08:07:03.562-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-12758",
      "summary": "Onde adicionar novo usuário na plataforma?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:06:53.760-0300",
      "updated": "2026-07-14T08:07:01.620-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12761",
      "summary": "Posso cadastrar usuário depois de pagar?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:06:53.938-0300",
      "updated": "2026-07-14T08:07:01.602-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12760",
      "summary": "Ajuste de boleto para adicional de usuário",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:06:53.847-0300",
      "updated": "2026-07-14T08:07:01.416-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12757",
      "summary": "Exclusão do canal 1522 da plataforma e API oficial",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:06:53.593-0300",
      "updated": "2026-07-14T08:07:01.087-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12756",
      "summary": "Cliente questiona reajuste no boleto sem comunicação prévia",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:06:49.128-0300",
      "updated": "2026-07-14T08:06:56.920-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12754",
      "summary": "Sistema desloga sozinho durante atendimentos",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:06:47.293-0300",
      "updated": "2026-07-14T08:06:55.401-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12755",
      "summary": "Substituição de número do canal WhatsApp via AnyDesk",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-14T08:06:47.691-0300",
      "updated": "2026-07-14T08:06:55.332-0300",
      "module": "Canais",
      "classification": "indefinido"
    },
    {
      "key": "SM-12753",
      "summary": "Cliente sem créditos na plataforma",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T18:40:54.603-0300",
      "updated": "2026-07-13T18:41:01.970-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12752",
      "summary": "Usuária gestora sem acesso às configurações e templates",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T18:40:54.547-0300",
      "updated": "2026-07-13T18:41:01.925-0300",
      "module": "Permissões / Roles",
      "classification": "poli"
    },
    {
      "key": "SM-12751",
      "summary": "Impacto das novas cobranças da Meta por mensagem",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T18:40:54.540-0300",
      "updated": "2026-07-13T18:41:01.839-0300",
      "module": "Chat / Mensagens",
      "classification": "indefinido"
    },
    {
      "key": "SM-12750",
      "summary": "Reunião de treinamento/suporte com cliente",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T18:40:54.507-0300",
      "updated": "2026-07-13T18:41:01.796-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12749",
      "summary": "Envio de boleto em PDF e baixa de pagamento",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T17:35:01.755-0300",
      "updated": "2026-07-13T17:35:09.373-0300",
      "module": "Upload / Mídia",
      "classification": "poli"
    },
    {
      "key": "SM-12748",
      "summary": "Exibir vídeos de templates enviados na interface da Poli",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T17:35:01.749-0300",
      "updated": "2026-07-13T17:35:09.140-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-12747",
      "summary": "Vídeo de template não aparece na Poli após disparo",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T17:35:01.505-0300",
      "updated": "2026-07-13T17:35:08.843-0300",
      "module": "Upload / Mídia",
      "classification": "poli"
    },
    {
      "key": "SM-12746",
      "summary": "Como permitir acesso ao microfone no navegador para enviar áudio",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T16:35:35.977-0300",
      "updated": "2026-07-13T16:35:43.732-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12745",
      "summary": "Como incluir logo da empresa no WhatsApp",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T14:45:46.642-0300",
      "updated": "2026-07-13T14:45:54.150-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12744",
      "summary": "Cliente confirma que solicitação anterior já foi atendida",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T14:28:38.108-0300",
      "updated": "2026-07-13T14:28:45.935-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12741",
      "summary": "Cadastro e conexão de novos números de WhatsApp na plataforma",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T13:30:20.612-0300",
      "updated": "2026-07-13T13:30:36.505-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12743",
      "summary": "Por que o nome de exibição do número não está mudando?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T13:30:20.709-0300",
      "updated": "2026-07-13T13:30:28.214-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12742",
      "summary": "Como funciona a questão do BOT na plataforma?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T13:30:20.623-0300",
      "updated": "2026-07-13T13:30:27.994-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-12739",
      "summary": "Arquivos grandes (PDF/imagem) não chegam na plataforma",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T13:29:17.862-0300",
      "updated": "2026-07-13T13:29:25.600-0300",
      "module": "Upload / Mídia",
      "classification": "poli"
    },
    {
      "key": "SM-12740",
      "summary": "Exibir mensagem automática quando arquivo excede limite de tamanho",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T13:29:18.125-0300",
      "updated": "2026-07-13T13:29:25.524-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12738",
      "summary": "Teste de envio de documentos e limite de tamanho de arquivo",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T13:28:09.097-0300",
      "updated": "2026-07-13T13:28:28.227-0300",
      "module": "Upload / Mídia",
      "classification": "poli"
    },
    {
      "key": "SM-12737",
      "summary": "Janela de 24 horas fechada impede envio de mensagens",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T13:28:02.526-0300",
      "updated": "2026-07-13T13:28:09.871-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12736",
      "summary": "Cliente recebendo cobrança de boleto já pago",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T13:27:44.422-0300",
      "updated": "2026-07-13T13:27:51.808-0300",
      "module": "Contatos",
      "classification": "indefinido"
    },
    {
      "key": "SM-12735",
      "summary": "Ajuste de boleto com diferença de 1 centavo em relação à nota fiscal",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T13:22:29.197-0300",
      "updated": "2026-07-13T13:22:36.376-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12734",
      "summary": "Erro ao enviar template para iniciar conversa",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T13:22:26.523-0300",
      "updated": "2026-07-13T13:22:33.893-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12733",
      "summary": "App mobile exige login frequente e mostra conversas como expiradas (24h)",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T13:21:59.047-0300",
      "updated": "2026-07-13T13:22:08.701-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12732",
      "summary": "Melhoria na estabilidade de sessão do app mobile",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T13:21:58.874-0300",
      "updated": "2026-07-13T13:22:06.273-0300",
      "module": "Autenticação",
      "classification": "poli"
    },
    {
      "key": "SM-12731",
      "summary": "Cliente informa pagamento realizado mas sistema mostra pendência",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T13:21:50.556-0300",
      "updated": "2026-07-13T13:21:58.031-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12730",
      "summary": "Meta não finalizou processo de conexão do canal mesmo após conexão realizada",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T13:21:45.399-0300",
      "updated": "2026-07-13T13:21:53.091-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12729",
      "summary": "Solicitação de nota fiscal que acompanha o boleto",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T11:11:03.353-0300",
      "updated": "2026-07-13T11:11:11.062-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12728",
      "summary": "Verificação de pagamento de boleto - cliente alega ter pago mas recebeu cobrança",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T10:05:43.993-0300",
      "updated": "2026-07-13T10:05:52.379-0300",
      "module": "Contatos",
      "classification": "indefinido"
    },
    {
      "key": "SM-12727",
      "summary": "Cliente solicitou envio de informações financeiras por e-mail",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T09:50:47.126-0300",
      "updated": "2026-07-13T09:50:55.546-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12726",
      "summary": "Dúvida sobre pendência de pagamento mensal",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T09:03:12.448-0300",
      "updated": "2026-07-13T09:03:20.256-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12725",
      "summary": "Mensagens chegando sem atendentes disponíveis",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:13:23.384-0300",
      "updated": "2026-07-13T08:13:30.844-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12724",
      "summary": "Template não envia em conversas com mais de 24h - sem erro exibido",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:13:22.346-0300",
      "updated": "2026-07-13T08:13:29.536-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12721",
      "summary": "Como conectar canal WhatsApp quando está desconectado?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:13:21.068-0300",
      "updated": "2026-07-13T08:13:28.682-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12723",
      "summary": "Como configurar mensagem automática do bot para enviar link do site",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:13:21.176-0300",
      "updated": "2026-07-13T08:13:28.544-0300",
      "module": "Chat / Mensagens",
      "classification": "indefinido"
    },
    {
      "key": "SM-12722",
      "summary": "Como testar se as configurações do bot estão funcionando",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:13:21.161-0300",
      "updated": "2026-07-13T08:13:28.225-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-12719",
      "summary": "Delay na entrega de mensagens - cliente precisa dar F5 para ver mensagens",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:13:20.663-0300",
      "updated": "2026-07-13T08:13:28.197-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12720",
      "summary": "Qual usuário tem permissão para conectar canais na Poli?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:13:20.972-0300",
      "updated": "2026-07-13T08:13:28.096-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12716",
      "summary": "Atualização de link de cardápio de salgados no bot",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:13:17.797-0300",
      "updated": "2026-07-13T08:13:27.434-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-12718",
      "summary": "Cliente perguntou para qual email foi enviado um documento/comunicação",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:13:19.957-0300",
      "updated": "2026-07-13T08:13:27.071-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12717",
      "summary": "Mensagens rápidas não aparecem para primeiro contato com cliente",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:13:18.602-0300",
      "updated": "2026-07-13T08:13:25.678-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12715",
      "summary": "Solicitação de informação sobre fatura - cliente responde a contato prévio",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:13:17.060-0300",
      "updated": "2026-07-13T08:13:24.309-0300",
      "module": "Contatos",
      "classification": "indefinido"
    },
    {
      "key": "SM-12714",
      "summary": "Atualização de contato do TI da Zilfarma",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:13:04.578-0300",
      "updated": "2026-07-13T08:13:11.871-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12713",
      "summary": "Melhorar documentação/acesso às informações sobre créditos e custos",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:13:03.386-0300",
      "updated": "2026-07-13T08:13:10.896-0300",
      "module": "Permissões / Roles",
      "classification": "poli"
    },
    {
      "key": "SM-12712",
      "summary": "Dúvida sobre custo e funcionamento dos créditos",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:13:03.047-0300",
      "updated": "2026-07-13T08:13:10.371-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12711",
      "summary": "Dúvida sobre consumo de créditos por mensagem/template",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:13:02.807-0300",
      "updated": "2026-07-13T08:13:10.050-0300",
      "module": "Chat / Mensagens",
      "classification": "indefinido"
    },
    {
      "key": "SM-12710",
      "summary": "Dúvida sobre limite de templates e erro ao criar template com emoji no botão",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:13:02.589-0300",
      "updated": "2026-07-13T08:13:09.743-0300",
      "module": "Chat / Mensagens",
      "classification": "indefinido"
    },
    {
      "key": "SM-12709",
      "summary": "Problema técnico em investigação - cliente VCM Auto Sales",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:57.672-0300",
      "updated": "2026-07-13T08:13:05.015-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12708",
      "summary": "Como conectar telefone/canal na plataforma Poli",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:57.511-0300",
      "updated": "2026-07-13T08:13:04.736-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12707",
      "summary": "Problema técnico em análise pela engenharia - aguardando resolução",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:57.169-0300",
      "updated": "2026-07-13T08:13:04.523-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12706",
      "summary": "WhatsApp não estava recebendo mensagens dos clientes",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:56.165-0300",
      "updated": "2026-07-13T08:13:03.934-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12697",
      "summary": "Limite de tamanho para envio de arquivos no WhatsApp",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:49.370-0300",
      "updated": "2026-07-13T08:13:02.797-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12703",
      "summary": "Dúvida sobre cobrança de templates do WhatsApp",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:53.499-0300",
      "updated": "2026-07-13T08:13:01.204-0300",
      "module": "Canais",
      "classification": "indefinido"
    },
    {
      "key": "SM-12704",
      "summary": "Dúvida sobre quando o e-mail informativo será enviado",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:53.535-0300",
      "updated": "2026-07-13T08:13:00.940-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12705",
      "summary": "Dúvida sobre data de cobrança vs data de início da mudança de templates",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:53.581-0300",
      "updated": "2026-07-13T08:13:00.901-0300",
      "module": "Configurações",
      "classification": "indefinido"
    },
    {
      "key": "SM-12702",
      "summary": "Envio de e-mail informativo sobre mudanças na cobrança de templates",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:53.415-0300",
      "updated": "2026-07-13T08:13:00.755-0300",
      "module": "Configurações",
      "classification": "indefinido"
    },
    {
      "key": "SM-12701",
      "summary": "Cliente questionou sobre mensagem/situação não recebida",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:53.269-0300",
      "updated": "2026-07-13T08:13:00.688-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12672",
      "summary": "Reagendamento de reunião de alinhamento para segunda-feira",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:35.704-0300",
      "updated": "2026-07-13T08:12:59.653-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12692",
      "summary": "Plataforma nova com múltiplos problemas de lentidão e atualização de mensagens",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:45.640-0300",
      "updated": "2026-07-13T08:12:59.051-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12700",
      "summary": "Erro ao enviar mensagens após atualização",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:51.680-0300",
      "updated": "2026-07-13T08:12:59.011-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12699",
      "summary": "Facilitar transição de usuários para nova versão da interface",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:50.575-0300",
      "updated": "2026-07-13T08:12:58.294-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12698",
      "summary": "Cliente pergunta se pode voltar para a versão antiga da Poli",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:50.100-0300",
      "updated": "2026-07-13T08:12:57.698-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12696",
      "summary": "Acesso remoto via AnyDesk para verificação de problema",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:49.250-0300",
      "updated": "2026-07-13T08:12:56.959-0300",
      "module": "Permissões / Roles",
      "classification": "indefinido"
    },
    {
      "key": "SM-12695",
      "summary": "Solicitação de histórico de pagamento e valor da fatura atual",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:47.614-0300",
      "updated": "2026-07-13T08:12:55.071-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12694",
      "summary": "Remoção de linha de crédito após exclusão de conta WhatsApp do Meta Business",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:46.962-0300",
      "updated": "2026-07-13T08:12:54.297-0300",
      "module": "Canais",
      "classification": "externo"
    },
    {
      "key": "SM-12693",
      "summary": "Melhorar processo de rollback para versão anterior em caso de regressão crítica",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:45.694-0300",
      "updated": "2026-07-13T08:12:53.526-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12684",
      "summary": "Erro ao criar oportunidade pelo chat - tela de erro exibida",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:42.718-0300",
      "updated": "2026-07-13T08:12:52.968-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12691",
      "summary": "As conversas são perdidas ao substituir canal WhatsApp?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:44.977-0300",
      "updated": "2026-07-13T08:12:52.711-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12689",
      "summary": "Posso fazer anúncios com o novo número conectado?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:44.615-0300",
      "updated": "2026-07-13T08:12:52.702-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12690",
      "summary": "Substituição de canal WhatsApp API - número banido por novo número",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:44.652-0300",
      "updated": "2026-07-13T08:12:52.438-0300",
      "module": "Canais",
      "classification": "externo"
    },
    {
      "key": "SM-12688",
      "summary": "Relatório de volume total de mensagens enviadas por período",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:44.574-0300",
      "updated": "2026-07-13T08:12:52.167-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12685",
      "summary": "Melhorar estabilidade/funcionamento da criação de oportunidades via chat",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:43.520-0300",
      "updated": "2026-07-13T08:12:51.410-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12687",
      "summary": "Como acompanhar volume total de mensagens enviadas na Poli",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:44.127-0300",
      "updated": "2026-07-13T08:12:51.372-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12686",
      "summary": "Cobrança da Meta de R$0,03 por mensagem a partir de 01/10/2026 - esclarecimento",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:43.762-0300",
      "updated": "2026-07-13T08:12:51.089-0300",
      "module": "Chat / Mensagens",
      "classification": "indefinido"
    },
    {
      "key": "SM-12683",
      "summary": "Solicitação de envio de nota fiscal por e-mail",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:42.202-0300",
      "updated": "2026-07-13T08:12:49.817-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12682",
      "summary": "Como liberar créditos para disparo no fim de semana?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:41.961-0300",
      "updated": "2026-07-13T08:12:49.669-0300",
      "module": "Disparos / Campanhas",
      "classification": "poli"
    },
    {
      "key": "SM-12681",
      "summary": "Liberação de créditos adicionais para disparo",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:41.935-0300",
      "updated": "2026-07-13T08:12:49.558-0300",
      "module": "Disparos / Campanhas",
      "classification": "poli"
    },
    {
      "key": "SM-12680",
      "summary": "Número API não conecta à conta de anúncios",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:41.532-0300",
      "updated": "2026-07-13T08:12:49.052-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-12679",
      "summary": "BM (Business Manager) com problema impedindo impulsionamento de marketing",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:41.452-0300",
      "updated": "2026-07-13T08:12:48.949-0300",
      "module": "Permissões / Roles",
      "classification": "poli"
    },
    {
      "key": "SM-12678",
      "summary": "Solicitação de acréscimo de créditos",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:41.388-0300",
      "updated": "2026-07-13T08:12:48.478-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12677",
      "summary": "Etiquetas não aparecem para operadores de chat ao tentar vincular ao contato",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:39.149-0300",
      "updated": "2026-07-13T08:12:48.285-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12674",
      "summary": "Cliente questionou se conseguiria impulsionar sem ter WhatsApp cadastrado na plataforma",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:36.878-0300",
      "updated": "2026-07-13T08:12:47.474-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12675",
      "summary": "Cliente relata demora no retorno do suporte",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:39.118-0300",
      "updated": "2026-07-13T08:12:46.695-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12676",
      "summary": "Distribuição de chats não funciona - mensagens chegam apenas para um atendente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:39.151-0300",
      "updated": "2026-07-13T08:12:46.578-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12673",
      "summary": "Dúvida sobre recorrência dos pacotes de créditos",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:35.713-0300",
      "updated": "2026-07-13T08:12:43.556-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12671",
      "summary": "Contratação de pacote de 1000 créditos de templates",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-13T08:12:35.544-0300",
      "updated": "2026-07-13T08:12:43.524-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-12663",
      "summary": "Bot encerrando conversas mesmo com cliente interagindo para atendimento humano",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:10:05.567-0300",
      "updated": "2026-07-10T18:10:24.990-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12660",
      "summary": "Sincronização de chats não atualiza na fila lateral",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:51.785-0300",
      "updated": "2026-07-10T18:10:21.972-0300",
      "module": "Distribuição / Filas",
      "classification": "poli"
    },
    {
      "key": "SM-12669",
      "summary": "Melhoria na sincronização de chats em tempo real sem necessidade de refresh",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:10:05.848-0300",
      "updated": "2026-07-10T18:10:13.404-0300",
      "module": "WebSocket / Presença",
      "classification": "poli"
    },
    {
      "key": "SM-12670",
      "summary": "Fila não mostra última mensagem enviada",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:10:05.977-0300",
      "updated": "2026-07-10T18:10:13.291-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12662",
      "summary": "Necessidade de atualizar página constantemente para ver chats novos",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:10:05.554-0300",
      "updated": "2026-07-10T18:10:13.234-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12667",
      "summary": "Desativação da IA na transferência de conversas",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:10:05.708-0300",
      "updated": "2026-07-10T18:10:12.995-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12666",
      "summary": "Ajustar tempo de transferência por inatividade dos clientes",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:10:05.622-0300",
      "updated": "2026-07-10T18:10:12.980-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12668",
      "summary": "Melhoria no controle de handoff bot-humano para evitar invasão de conversas",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:10:05.814-0300",
      "updated": "2026-07-10T18:10:12.970-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12665",
      "summary": "Ajustar visualização de PDF e botão no template",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:10:05.619-0300",
      "updated": "2026-07-10T18:10:12.915-0300",
      "module": "Upload / Mídia",
      "classification": "poli"
    },
    {
      "key": "SM-12664",
      "summary": "Variáveis sumiram dos templates após mudança de layout",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:10:05.571-0300",
      "updated": "2026-07-10T18:10:12.798-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-12657",
      "summary": "Relógio infinito (loading) em contatos específicos",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:51.577-0300",
      "updated": "2026-07-10T18:09:58.926-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12661",
      "summary": "Melhoria na comunicação de status de tickets/correções técnicas",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:51.930-0300",
      "updated": "2026-07-10T18:09:58.879-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12659",
      "summary": "Dúvida sobre permissão de Supervisor para visualizar chats de outros atendentes",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:51.603-0300",
      "updated": "2026-07-10T18:09:58.825-0300",
      "module": "Permissões / Roles",
      "classification": "indefinido"
    },
    {
      "key": "SM-12658",
      "summary": "Falha no envio de templates para números internacionais",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:51.599-0300",
      "updated": "2026-07-10T18:09:58.806-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-12656",
      "summary": "Solicitação de reunião para alinhamento sobre problemas recorrentes",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:51.544-0300",
      "updated": "2026-07-10T18:09:58.694-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12655",
      "summary": "Erro ao criar oportunidade no CRM ao mudar de funil",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:51.505-0300",
      "updated": "2026-07-10T18:09:58.651-0300",
      "module": "Integrações Externas",
      "classification": "poli"
    },
    {
      "key": "SM-12654",
      "summary": "Dúvida sobre janela de 24 horas do WhatsApp Business API",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:51.503-0300",
      "updated": "2026-07-10T18:09:58.491-0300",
      "module": "Canais",
      "classification": "externo"
    },
    {
      "key": "SM-12653",
      "summary": "Ajuste de boleto - remoção de créditos excedentes de IA",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:44.130-0300",
      "updated": "2026-07-10T18:09:56.848-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12652",
      "summary": "Quais funcionalidades consomem créditos à parte?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:43.786-0300",
      "updated": "2026-07-10T18:09:50.947-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12651",
      "summary": "Agendamento de treinamento para equipe comercial",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:37.665-0300",
      "updated": "2026-07-10T18:09:44.582-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12643",
      "summary": "Conta WhatsApp em análise pela Meta - o que significa?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:31.311-0300",
      "updated": "2026-07-10T18:09:42.080-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12644",
      "summary": "Erro de envio de marketing para contatos em grupo de experimento da Meta",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:32.778-0300",
      "updated": "2026-07-10T18:09:40.359-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12650",
      "summary": "Precisa reconectar o canal em todos os computadores?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:32.936-0300",
      "updated": "2026-07-10T18:09:40.355-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12648",
      "summary": "As conversas ficam no WhatsApp da Poli ou no WhatsApp Web?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:32.885-0300",
      "updated": "2026-07-10T18:09:40.232-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12647",
      "summary": "Consulta de números cadastrados na plataforma",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:32.848-0300",
      "updated": "2026-07-10T18:09:40.097-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12649",
      "summary": "Reconexão de canal WhatsApp via QR Code com auxílio remoto",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:32.902-0300",
      "updated": "2026-07-10T18:09:40.027-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12646",
      "summary": "Catálogo não carrega e não envia para clientes",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:32.841-0300",
      "updated": "2026-07-10T18:09:39.954-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12645",
      "summary": "Como adicionar mais um número não oficial na plataforma",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:32.803-0300",
      "updated": "2026-07-10T18:09:39.889-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12642",
      "summary": "Reconexão de canal WhatsApp",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:31.238-0300",
      "updated": "2026-07-10T18:09:38.491-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12641",
      "summary": "Como verificar/acessar o chat de uma conversa",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:31.209-0300",
      "updated": "2026-07-10T18:09:38.373-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12640",
      "summary": "Mensagens ficam com relógio (não enviam) ao enviar pela plataforma Poli",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:31.180-0300",
      "updated": "2026-07-10T18:09:38.106-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12637",
      "summary": "Bot de disparo não estava encaminhando conversas corretamente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:26.252-0300",
      "updated": "2026-07-10T18:09:36.016-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12633",
      "summary": "Problema com ordenação de chats por última mensagem",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:25.187-0300",
      "updated": "2026-07-10T18:09:34.791-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12638",
      "summary": "Erro ao carregar relatórios - filtros não funcionam",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:27.499-0300",
      "updated": "2026-07-10T18:09:34.710-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12639",
      "summary": "Melhoria na visibilidade do campo 'role ID' para perfis de gestora nos relatórios",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:27.698-0300",
      "updated": "2026-07-10T18:09:34.643-0300",
      "module": "Permissões / Roles",
      "classification": "poli"
    },
    {
      "key": "SM-12636",
      "summary": "Verificação de status/disponibilidade de usuária na plataforma",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:26.204-0300",
      "updated": "2026-07-10T18:09:33.402-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12635",
      "summary": "Facilitar configuração em massa de notificações para todos os usuários",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:25.289-0300",
      "updated": "2026-07-10T18:09:32.456-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-12634",
      "summary": "Como configurar notificações de áudio para todos os usuários?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:25.204-0300",
      "updated": "2026-07-10T18:09:32.308-0300",
      "module": "Chat / Mensagens",
      "classification": "indefinido"
    },
    {
      "key": "SM-12632",
      "summary": "Dashboard do CRM não atualiza - valores permanecem zerados",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:21.836-0300",
      "updated": "2026-07-10T18:09:29.127-0300",
      "module": "Relatórios / SLA",
      "classification": "poli"
    },
    {
      "key": "SM-12627",
      "summary": "Chats enviados manualmente não aparecem em nenhuma aba para o atendente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:21.325-0300",
      "updated": "2026-07-10T18:09:29.105-0300",
      "module": "Distribuição / Filas",
      "classification": "poli"
    },
    {
      "key": "SM-12631",
      "summary": "Melhoria na sincronização e atualização em tempo real do Dashboard do CRM",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:21.737-0300",
      "updated": "2026-07-10T18:09:28.829-0300",
      "module": "WebSocket / Presença",
      "classification": "poli"
    },
    {
      "key": "SM-12629",
      "summary": "Melhorar visibilidade de chats enviados sem resposta do cliente",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:21.514-0300",
      "updated": "2026-07-10T18:09:28.739-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12630",
      "summary": "Oscilação na plataforma - erro ao carregar",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:21.523-0300",
      "updated": "2026-07-10T18:09:28.728-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12622",
      "summary": "Bot não distribui chats corretamente - clientes de Campinas não direcionados",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:17.113-0300",
      "updated": "2026-07-10T18:09:28.662-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-12626",
      "summary": "Lentidão ao abrir chat na plataforma",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:21.319-0300",
      "updated": "2026-07-10T18:09:28.558-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12628",
      "summary": "Erro 130472 - Destinatário faz parte de experimento da Meta e não recebe templates de marketing",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:21.374-0300",
      "updated": "2026-07-10T18:09:28.519-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-12625",
      "summary": "Dúvida sobre template de mensagem",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:18.558-0300",
      "updated": "2026-07-10T18:09:26.509-0300",
      "module": "Chat / Mensagens",
      "classification": "indefinido"
    },
    {
      "key": "SM-12624",
      "summary": "Envio de boleto do mês atual",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:18.452-0300",
      "updated": "2026-07-10T18:09:25.648-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12623",
      "summary": "Melhoria na distribuição do bot por região/localização do cliente",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:17.301-0300",
      "updated": "2026-07-10T18:09:24.674-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-12621",
      "summary": "Pagamento via PIX para isenção de juros de boleto vencido",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:16.238-0300",
      "updated": "2026-07-10T18:09:23.579-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12620",
      "summary": "Permitir atribuição de carteira em massa por filtro de tag diretamente na plataforma",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:15.818-0300",
      "updated": "2026-07-10T18:09:23.091-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12619",
      "summary": "Como migrar contatos importados para a carteira de outro atendente",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:15.556-0300",
      "updated": "2026-07-10T18:09:22.792-0300",
      "module": "Contatos",
      "classification": "indefinido"
    },
    {
      "key": "SM-12616",
      "summary": "Etiquetas não estão sendo adicionadas ou removidas corretamente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:13.856-0300",
      "updated": "2026-07-10T18:09:22.731-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12617",
      "summary": "A interface nova é obrigatória ou pode usar a antiga?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:13.954-0300",
      "updated": "2026-07-10T18:09:21.163-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12618",
      "summary": "Alteração na lista de atendentes do bot - remover Lucas e alterar horário do David",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:14.014-0300",
      "updated": "2026-07-10T18:09:21.159-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-12615",
      "summary": "Oscilação/lentidão no envio de mensagens (reloginho)",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:11.258-0300",
      "updated": "2026-07-10T18:09:18.324-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12614",
      "summary": "Contato que enviou mensagem não aparece na busca da plataforma",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:00.875-0300",
      "updated": "2026-07-10T18:09:08.183-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12613",
      "summary": "Quando os créditos são liberados após ativação do canal WhatsApp?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:00.585-0300",
      "updated": "2026-07-10T18:09:07.827-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12612",
      "summary": "Configuração de nova Multiempresa para UNASP - canal WhatsApp para disparos",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:09:00.543-0300",
      "updated": "2026-07-10T18:09:07.625-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12611",
      "summary": "Alerta proativo quando conversas ficam sem distribuição por tempo prolongado",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:55.984-0300",
      "updated": "2026-07-10T18:09:03.236-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12610",
      "summary": "Conversas acumulando sem distribuição automática para atendente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:55.735-0300",
      "updated": "2026-07-10T18:09:03.156-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12605",
      "summary": "Créditos mostrando zerado incorretamente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:52.257-0300",
      "updated": "2026-07-10T18:09:02.862-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12609",
      "summary": "Liberação de créditos de mensagem com isenção de boleto",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:54.622-0300",
      "updated": "2026-07-10T18:09:02.093-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12607",
      "summary": "Compra de créditos avulsos gera cobrança recorrente?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:54.416-0300",
      "updated": "2026-07-10T18:09:01.694-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12608",
      "summary": "Como solicitar créditos de mensagem na plataforma Poli?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:54.546-0300",
      "updated": "2026-07-10T18:09:01.619-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12606",
      "summary": "API com lentidão e falha no envio de mensagens (triângulo vermelho)",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:52.356-0300",
      "updated": "2026-07-10T18:08:59.584-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12603",
      "summary": "CRM não abria corretamente para o cliente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:52.176-0300",
      "updated": "2026-07-10T18:08:59.275-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12604",
      "summary": "Lentidão na plataforma",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:52.226-0300",
      "updated": "2026-07-10T18:08:59.203-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12602",
      "summary": "Solicitação de NF, boleto e certidões para processo de pagamento",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:50.742-0300",
      "updated": "2026-07-10T18:08:57.868-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12601",
      "summary": "Solicitação de treinamento para sanar dúvidas sobre a plataforma",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:50.710-0300",
      "updated": "2026-07-10T18:08:57.604-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12600",
      "summary": "Mensagens não sendo enviadas - ícone de relógio (instabilidade temporária)",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:48.717-0300",
      "updated": "2026-07-10T18:08:56.057-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12599",
      "summary": "Contestação de cobrança de fatura após cancelamento - RGA Gráfica",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:48.550-0300",
      "updated": "2026-07-10T18:08:55.641-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12598",
      "summary": "Cliente deseja adquirir mais um canal Broker",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:47.529-0300",
      "updated": "2026-07-10T18:08:54.462-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12596",
      "summary": "É possível criar campanha onde cliente não passa pelo chatbot e cai direto no atendente?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:46.933-0300",
      "updated": "2026-07-10T18:08:54.122-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-12597",
      "summary": "Solicitação de treinamento sobre nova interface da Poli",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:46.948-0300",
      "updated": "2026-07-10T18:08:53.918-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12595",
      "summary": "Dúvida sobre limite de usuários do plano",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:45.645-0300",
      "updated": "2026-07-10T18:08:52.691-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12593",
      "summary": "Permitir compra avulsa de pacotes de créditos sem recorrência mínima",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:45.186-0300",
      "updated": "2026-07-10T18:08:52.278-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12592",
      "summary": "Cliente pergunta sobre compra avulsa de créditos adicionais",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:45.026-0300",
      "updated": "2026-07-10T18:08:52.159-0300",
      "module": "Contatos",
      "classification": "indefinido"
    },
    {
      "key": "SM-12594",
      "summary": "Envio de nota fiscal do faturamento do mês",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:45.190-0300",
      "updated": "2026-07-10T18:08:52.067-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12591",
      "summary": "Como criar novos templates após a atualização da plataforma",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:44.829-0300",
      "updated": "2026-07-10T18:08:51.918-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-12590",
      "summary": "Solicitação de envio de NF e boleto para pagamento",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:43.831-0300",
      "updated": "2026-07-10T18:08:51.207-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12589",
      "summary": "Mensagens não sobem/atualizam na plataforma após resposta",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:39.252-0300",
      "updated": "2026-07-10T18:08:49.578-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12585",
      "summary": "Janela de 72 horas fechando em 24 horas",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:38.942-0300",
      "updated": "2026-07-10T18:08:46.420-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12587",
      "summary": "Cliente solicita suporte dedicado e reunião para resolver múltiplos problemas",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:38.999-0300",
      "updated": "2026-07-10T18:08:46.238-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12588",
      "summary": "Melhoria na visibilidade e gestão de consumo de créditos pelo cliente",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:39.024-0300",
      "updated": "2026-07-10T18:08:46.179-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12584",
      "summary": "Como funciona o consumo e renovação de créditos",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:38.916-0300",
      "updated": "2026-07-10T18:08:46.013-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12586",
      "summary": "Mensagens bloqueadas - perda de leads do tráfego",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:38.960-0300",
      "updated": "2026-07-10T18:08:46.004-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12582",
      "summary": "Dúvidas sobre integração com API V3 da Poli",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:28.292-0300",
      "updated": "2026-07-10T18:08:35.597-0300",
      "module": "Integrações Externas",
      "classification": "poli"
    },
    {
      "key": "SM-12583",
      "summary": "Possível reunião para alinhamento sobre integração com API V3",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:28.310-0300",
      "updated": "2026-07-10T18:08:35.581-0300",
      "module": "Integrações Externas",
      "classification": "poli"
    },
    {
      "key": "SM-12581",
      "summary": "Cliente solicitando desvinculação de linha de crédito para migração de plataforma",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:27.524-0300",
      "updated": "2026-07-10T18:08:34.696-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12580",
      "summary": "Linha de crédito da Meta não desvincula da Poli após remoção",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:27.200-0300",
      "updated": "2026-07-10T18:08:34.369-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12579",
      "summary": "Como criar nova conta WABA para desvincular linha de crédito",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:27.197-0300",
      "updated": "2026-07-10T18:08:34.182-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12578",
      "summary": "Implementar canal de atendimento telefônico ou chat ao vivo para urgências",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:26.637-0300",
      "updated": "2026-07-10T18:08:33.969-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12577",
      "summary": "Agendamento de treinamento para construção de fluxo de atendimento",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:26.434-0300",
      "updated": "2026-07-10T18:08:33.721-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12575",
      "summary": "Correção de NF ou emissão de recibo com período de cobrança - ChatsHub",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:25.787-0300",
      "updated": "2026-07-10T18:08:33.121-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12576",
      "summary": "Gargalo na liberação de login por parte da Meta",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:25.829-0300",
      "updated": "2026-07-10T18:08:32.967-0300",
      "module": "Autenticação",
      "classification": "poli"
    },
    {
      "key": "SM-12574",
      "summary": "Solicitação de envio de Notas Fiscais para boletos pendentes",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:24.243-0300",
      "updated": "2026-07-10T18:08:31.421-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12572",
      "summary": "Cliente quer saber se vai perder o número ao remover da API Oficial",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:23.489-0300",
      "updated": "2026-07-10T18:08:30.849-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12573",
      "summary": "Cliente recebendo bloqueios de mensagens pelo WhatsApp",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:23.500-0300",
      "updated": "2026-07-10T18:08:30.804-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12571",
      "summary": "Cliente quer inserir cartão de crédito da loja e não consegue",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:23.279-0300",
      "updated": "2026-07-10T18:08:30.480-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12570",
      "summary": "Onde visualizar relatório de templates e mensagens receptivas",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:22.510-0300",
      "updated": "2026-07-10T18:08:29.935-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12569",
      "summary": "Mensagens não estão sincronizando na plataforma",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:22.486-0300",
      "updated": "2026-07-10T18:08:29.611-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12568",
      "summary": "Solicitação de boleto de cobrança - NF 8675",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:21.441-0300",
      "updated": "2026-07-10T18:08:28.448-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12567",
      "summary": "Problema recorrente da semana passada ainda não resolvido",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:21.343-0300",
      "updated": "2026-07-10T18:08:28.371-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12566",
      "summary": "Como criar bot de boas-vindas com coleta de dados",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:20.872-0300",
      "updated": "2026-07-10T18:08:28.225-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-12565",
      "summary": "Novas mensagens não aparecem sem atualizar a página",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:19.540-0300",
      "updated": "2026-07-10T18:08:26.699-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12563",
      "summary": "Atendentes não conseguem buscar/localizar contatos que estão em outros departamentos",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:11.667-0300",
      "updated": "2026-07-10T18:08:24.046-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12564",
      "summary": "Permitir visualização/busca de contatos independente do departamento atual",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:11.709-0300",
      "updated": "2026-07-10T18:08:19.165-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12562",
      "summary": "Template de mensagem funciona para alguns clientes e outros não recebem",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:11.560-0300",
      "updated": "2026-07-10T18:08:18.812-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12561",
      "summary": "Sincronização de mensagens não está funcionando corretamente - mensagens aparecem fora de ordem",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:11.412-0300",
      "updated": "2026-07-10T18:08:18.628-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12560",
      "summary": "Cliente não recebeu menu do bot e não foi direcionado para nenhum setor",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:11.410-0300",
      "updated": "2026-07-10T18:08:18.541-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-12553",
      "summary": "Mensagens da API não chegam na plataforma - cliente perdendo vendas",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:03.499-0300",
      "updated": "2026-07-10T18:08:16.762-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12559",
      "summary": "Conversas sendo finalizadas antes da janela de 24 horas",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:04.797-0300",
      "updated": "2026-07-10T18:08:12.283-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12556",
      "summary": "Interface alternando entre versão antiga e nova de forma inconsistente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:04.420-0300",
      "updated": "2026-07-10T18:08:11.962-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12557",
      "summary": "Melhoria na estabilidade da migração de interface antiga para nova",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:04.598-0300",
      "updated": "2026-07-10T18:08:11.845-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12558",
      "summary": "Relatórios não funcionam corretamente há mais de 1 mês",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:04.604-0300",
      "updated": "2026-07-10T18:08:11.821-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12555",
      "summary": "Como alterar a senha do próprio usuário na plataforma",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:04.405-0300",
      "updated": "2026-07-10T18:08:11.765-0300",
      "module": "Autenticação",
      "classification": "poli"
    },
    {
      "key": "SM-12554",
      "summary": "Melhorar visibilidade de chats sem atendente para todos os usuários",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:03.737-0300",
      "updated": "2026-07-10T18:08:11.390-0300",
      "module": "Distribuição / Filas",
      "classification": "poli"
    },
    {
      "key": "SM-12548",
      "summary": "Sistema exibindo horário errado e enviando mensagem de indisponibilidade incorretamente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:07:57.644-0300",
      "updated": "2026-07-10T18:08:10.548-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12552",
      "summary": "Créditos não aparecem na plataforma após compra",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:00.398-0300",
      "updated": "2026-07-10T18:08:07.908-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12551",
      "summary": "Solicitação de unificação de cobrança de créditos com boleto recorrente",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:08:00.355-0300",
      "updated": "2026-07-10T18:08:07.614-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12550",
      "summary": "Etiquetas demoram para atualizar - necessário repetir processo várias vezes",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:07:57.669-0300",
      "updated": "2026-07-10T18:08:05.070-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12549",
      "summary": "Integração Poli Pay/Mercado Pago não aparece no painel de conversas",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:07:57.645-0300",
      "updated": "2026-07-10T18:08:04.750-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12547",
      "summary": "Prorrogação de pagamento de fatura para 23/07 - CA Indaiatuba 3",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:07:54.836-0300",
      "updated": "2026-07-10T18:08:02.235-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12546",
      "summary": "Solicitação de adição de 1 usuário e 1 canal WhatsApp comum",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:07:54.199-0300",
      "updated": "2026-07-10T18:08:01.689-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12545",
      "summary": "Problema na listagem de chats - correção aplicada",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:07:53.274-0300",
      "updated": "2026-07-10T18:08:00.913-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12524",
      "summary": "Conversas não atualizam e lentidão no envio de mensagens",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:53.565-0300",
      "updated": "2026-07-10T18:03:45.074-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12526",
      "summary": "Clientes caindo no broker sem atendente disponível",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:53.764-0300",
      "updated": "2026-07-10T18:03:37.565-0300",
      "module": "Distribuição / Filas",
      "classification": "poli"
    },
    {
      "key": "SM-12512",
      "summary": "Conta WABA bloqueada pela Meta - restrição de envio de mensagens",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:46.560-0300",
      "updated": "2026-07-10T18:03:31.127-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12502",
      "summary": "Qual o tamanho máximo de vídeo para templates de disparo?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:33.067-0300",
      "updated": "2026-07-10T18:03:24.120-0300",
      "module": "Upload / Mídia",
      "classification": "poli"
    },
    {
      "key": "SM-12531",
      "summary": "Alterações no fluxo do Bot - Rizzo Parking",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:54.520-0300",
      "updated": "2026-07-10T18:03:23.948-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-12544",
      "summary": "Melhoria no sistema para preservar filtros aplicados ao atualizar página",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:03:12.432-0300",
      "updated": "2026-07-10T18:03:19.787-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12543",
      "summary": "Erro de janela de 24hrs impede envio de mensagens - cliente precisa atualizar página constantemente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:03:02.724-0300",
      "updated": "2026-07-10T18:03:17.825-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12515",
      "summary": "Como editar o bot de atendimento sem interferir no atendimento ativo?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:47.748-0300",
      "updated": "2026-07-10T18:03:15.962-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-12542",
      "summary": "Melhorar visualização de conversas em formato Kanban/colunas na tela principal",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:55.031-0300",
      "updated": "2026-07-10T18:03:02.881-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12537",
      "summary": "Melhoria na visibilidade de novos chats/mensagens recebidas",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:54.825-0300",
      "updated": "2026-07-10T18:03:02.871-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12539",
      "summary": "Erro 'Destinatário não alcançado' ao enviar mensagens",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:54.882-0300",
      "updated": "2026-07-10T18:03:02.857-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12541",
      "summary": "Melhoria na comunicação de status de incidentes e prazos para clientes",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:54.994-0300",
      "updated": "2026-07-10T18:03:02.835-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12534",
      "summary": "Como funcionam as ligações na Poli e se há ligação receptiva",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:54.688-0300",
      "updated": "2026-07-10T18:03:02.634-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12538",
      "summary": "Ligação receptiva via API Oficial do WhatsApp",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:54.834-0300",
      "updated": "2026-07-10T18:03:02.504-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12507",
      "summary": "Problema com usuários na multiempresa do comercial",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:39.527-0300",
      "updated": "2026-07-10T18:03:02.328-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12532",
      "summary": "Janela de chat permanece fechada após cliente enviar mensagem - ocorre 100% das vezes",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:54.601-0300",
      "updated": "2026-07-10T18:03:02.291-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12540",
      "summary": "Como remover número da API Oficial do WhatsApp?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:54.888-0300",
      "updated": "2026-07-10T18:03:02.243-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12533",
      "summary": "Encaminhamento de conversas entre atendentes na plataforma",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:54.650-0300",
      "updated": "2026-07-10T18:03:02.108-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12529",
      "summary": "Reunião via Meet para apresentação de erros e acompanhamento técnico",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:54.348-0300",
      "updated": "2026-07-10T18:03:02.070-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12535",
      "summary": "Permitir encaminhamento de conversas entre atendentes na plataforma web",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:54.739-0300",
      "updated": "2026-07-10T18:03:01.967-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12536",
      "summary": "Como funciona o recurso multi empresas da Poli?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:54.743-0300",
      "updated": "2026-07-10T18:03:01.930-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12530",
      "summary": "Opção 12 (Indaiatuba) não exibe pontos de venda no bot",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:54.476-0300",
      "updated": "2026-07-10T18:03:01.724-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-12528",
      "summary": "Como alterar o nome dos cursos na plataforma",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:54.102-0300",
      "updated": "2026-07-10T18:03:01.557-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12521",
      "summary": "Solicitação de treinamento para funcionários da clínica",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:50.812-0300",
      "updated": "2026-07-10T18:03:01.431-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12527",
      "summary": "Mensagens não sendo recebidas na plataforma",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:53.932-0300",
      "updated": "2026-07-10T18:03:00.906-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12525",
      "summary": "Canal de envio alterando automaticamente e impedindo envio de templates",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:53.628-0300",
      "updated": "2026-07-10T18:03:00.842-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12523",
      "summary": "Dúvida sobre necessidade de solicitar pacote de créditos recorrentemente",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:51.662-0300",
      "updated": "2026-07-10T18:02:58.658-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12522",
      "summary": "Ajuste de fatura e configuração de pacote de créditos no plano",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:51.028-0300",
      "updated": "2026-07-10T18:02:58.366-0300",
      "module": "Configurações",
      "classification": "indefinido"
    },
    {
      "key": "SM-12520",
      "summary": "Permitir mensagem de boas-vindas personalizada por operador",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:49.554-0300",
      "updated": "2026-07-10T18:02:56.961-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12494",
      "summary": "Erro no app mobile ao responder mensagens",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:31.680-0300",
      "updated": "2026-07-10T18:02:56.052-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12519",
      "summary": "Criação de lista de templates para abordagem de clientes",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:48.778-0300",
      "updated": "2026-07-10T18:02:55.967-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12517",
      "summary": "Por que não consigo enviar template para alguns clientes?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:48.448-0300",
      "updated": "2026-07-10T18:02:55.959-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12518",
      "summary": "Ajustes no bot de atendimento e configuração de textos em negrito",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:48.580-0300",
      "updated": "2026-07-10T18:02:55.619-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-12516",
      "summary": "Como personalizar a abordagem de atendimento por operador?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:47.992-0300",
      "updated": "2026-07-10T18:02:55.287-0300",
      "module": "Permissões / Roles",
      "classification": "poli"
    },
    {
      "key": "SM-12514",
      "summary": "Erro ao criar oportunidade no funil de vendas",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:47.680-0300",
      "updated": "2026-07-10T18:02:55.153-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12513",
      "summary": "É possível enviar mensagens para números dos EUA?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:47.062-0300",
      "updated": "2026-07-10T18:02:54.987-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12500",
      "summary": "Erro nas etiquetas atrapalhando fluxo de trabalho",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:32.677-0300",
      "updated": "2026-07-10T18:02:47.669-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12511",
      "summary": "Melhoria na gestão de usuários em ambiente multiempresa",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:40.496-0300",
      "updated": "2026-07-10T18:02:47.379-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12509",
      "summary": "Histórico de conversa some durante atendimento ao cliente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:40.036-0300",
      "updated": "2026-07-10T18:02:47.307-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12510",
      "summary": "Comunicação sobre alteração de plano - mudança para cobrança por templates Meta",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:40.145-0300",
      "updated": "2026-07-10T18:02:47.300-0300",
      "module": "Configurações",
      "classification": "indefinido"
    },
    {
      "key": "SM-12508",
      "summary": "Cliente não consegue migrar canais para WhatsApp Web",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:39.741-0300",
      "updated": "2026-07-10T18:02:47.163-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12506",
      "summary": "Como confirmar se a remoção de número do portfólio Meta foi feita corretamente",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:39.305-0300",
      "updated": "2026-07-10T18:02:46.626-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12504",
      "summary": "Problema com bot em investigação - cliente aguardando retorno",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:35.732-0300",
      "updated": "2026-07-10T18:02:46.316-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-12505",
      "summary": "Cliente solicitou direcionamento para gestor de TI sobre simulação de custos",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:35.815-0300",
      "updated": "2026-07-10T18:02:43.092-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12503",
      "summary": "Solicitação de ajuste/adiamento de mensalidade devido a problemas técnicos",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:35.707-0300",
      "updated": "2026-07-10T18:02:42.797-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12501",
      "summary": "Redução de tamanho de arquivo de vídeo para template",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:32.807-0300",
      "updated": "2026-07-10T18:02:40.782-0300",
      "module": "Upload / Mídia",
      "classification": "poli"
    },
    {
      "key": "SM-12499",
      "summary": "Erro no PoliPay em análise",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:32.662-0300",
      "updated": "2026-07-10T18:02:39.844-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12498",
      "summary": "Problemas com bots relatados pelo cliente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:32.605-0300",
      "updated": "2026-07-10T18:02:39.805-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12497",
      "summary": "Cliente questionou se e-mail recebido de Felipe sobre mudança de fatura estava correto",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:32.415-0300",
      "updated": "2026-07-10T18:02:39.536-0300",
      "module": "Contatos",
      "classification": "indefinido"
    },
    {
      "key": "SM-12496",
      "summary": "Cliente cancelou serviço e precisa recuperar acesso ao número WhatsApp",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:32.046-0300",
      "updated": "2026-07-10T18:02:39.237-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12495",
      "summary": "Como remover número do WhatsApp Business após cancelamento da Poli",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:31.803-0300",
      "updated": "2026-07-10T18:02:39.107-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12487",
      "summary": "Busca de contatos não funciona com nome parcial",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:25.385-0300",
      "updated": "2026-07-10T18:02:36.942-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12492",
      "summary": "Canal WhatsApp QR Code com problema de conexão - relógio aparecendo",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:28.465-0300",
      "updated": "2026-07-10T18:02:35.642-0300",
      "module": "Canais",
      "classification": "externo"
    },
    {
      "key": "SM-12493",
      "summary": "Verificação de cobrança indevida de IA na fatura",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:28.472-0300",
      "updated": "2026-07-10T18:02:35.631-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12491",
      "summary": "Automação de validação de cobrança para evitar duplicidade de itens no boleto",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:26.221-0300",
      "updated": "2026-07-10T18:02:33.692-0300",
      "module": "Jarvis / IA",
      "classification": "indefinido"
    },
    {
      "key": "SM-12490",
      "summary": "Correção de boleto com cobrança duplicada de WABA",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:26.032-0300",
      "updated": "2026-07-10T18:02:33.442-0300",
      "module": "Canais",
      "classification": "indefinido"
    },
    {
      "key": "SM-12489",
      "summary": "Melhorar visibilidade do status de resposta das conversas para gestores",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:25.959-0300",
      "updated": "2026-07-10T18:02:33.175-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12488",
      "summary": "Fila não reflete a última mensagem enviada - gestor não vê respostas dos atendentes",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:25.435-0300",
      "updated": "2026-07-10T18:02:32.505-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12486",
      "summary": "Cliente solicitou boleto para pagamento",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:24.777-0300",
      "updated": "2026-07-10T18:02:32.193-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12485",
      "summary": "Simulação de custos e informações sobre plano/consumo",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:24.568-0300",
      "updated": "2026-07-10T18:02:31.805-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12484",
      "summary": "Solicitação de prorrogação de vencimento de boleto para dia 25/07",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:23.898-0300",
      "updated": "2026-07-10T18:02:31.268-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12483",
      "summary": "Problema de sincronização de chats - aguardando resolução técnica",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:02:23.478-0300",
      "updated": "2026-07-10T18:02:30.669-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12481",
      "summary": "Permitir conectar Instagram a Poli sin necesidad de desvincular de la cuenta de Facebook/Meta actual",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:01:28.232-0300",
      "updated": "2026-07-10T18:01:35.944-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12478",
      "summary": "¿Cómo conectar Instagram a la plataforma Poli cuando ya está vinculado a otra cuenta de Facebook/Meta?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:01:27.902-0300",
      "updated": "2026-07-10T18:01:35.750-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12482",
      "summary": "¿Qué hacer con plantillas de WhatsApp que llevan más de una semana pendientes de aprobación?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:01:28.251-0300",
      "updated": "2026-07-10T18:01:35.451-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12479",
      "summary": "Análisis técnico pendiente para conexión de Instagram sin afectar integraciones existentes",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:01:27.933-0300",
      "updated": "2026-07-10T18:01:35.424-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12480",
      "summary": "¿Cómo incluir una variable personalizada en campaña masiva para mostrar montos diferentes por estudiante?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:01:27.974-0300",
      "updated": "2026-07-10T18:01:35.355-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12477",
      "summary": "Melhorar documentação e boas práticas para aumentar taxa de resposta em templates",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:01:24.649-0300",
      "updated": "2026-07-10T18:01:32.238-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-12476",
      "summary": "Simulação de custos com novo modelo de cobrança por consumo",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:01:24.522-0300",
      "updated": "2026-07-10T18:01:31.996-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12475",
      "summary": "Como maximizar taxa de resposta dos templates de WhatsApp",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:01:24.514-0300",
      "updated": "2026-07-10T18:01:31.872-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12474",
      "summary": "Cliente questiona por que a fatura não reduziu se o valor dos templates baixou",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:01:21.387-0300",
      "updated": "2026-07-10T18:01:28.729-0300",
      "module": "Contatos",
      "classification": "indefinido"
    },
    {
      "key": "SM-12471",
      "summary": "Dúvida sobre novo modelo de cobrança e sistema de créditos da Poli",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:01:19.533-0300",
      "updated": "2026-07-10T18:01:28.478-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12472",
      "summary": "CRM não funcionou por mais de 1 mês",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:01:19.662-0300",
      "updated": "2026-07-10T18:01:27.565-0300",
      "module": "Integrações Externas",
      "classification": "poli"
    },
    {
      "key": "SM-12473",
      "summary": "Criar material explicativo simplificado sobre o novo modelo de cobrança",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:01:19.853-0300",
      "updated": "2026-07-10T18:01:27.476-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12470",
      "summary": "Solicitação de desconto por falha no CRM durante mais de 1 mês",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:01:19.271-0300",
      "updated": "2026-07-10T18:01:26.676-0300",
      "module": "Integrações Externas",
      "classification": "poli"
    },
    {
      "key": "SM-12469",
      "summary": "Atualização de contato responsável pelo financeiro",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:01:18.962-0300",
      "updated": "2026-07-10T18:01:26.667-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12467",
      "summary": "Como configurar foto do WhatsApp para aparecer para clientes que não salvaram o contato",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:01:14.300-0300",
      "updated": "2026-07-10T18:01:24.098-0300",
      "module": "Canais",
      "classification": "indefinido"
    },
    {
      "key": "SM-12468",
      "summary": "Foto do perfil do WhatsApp não aparece para alguns contatos",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:01:14.543-0300",
      "updated": "2026-07-10T18:01:22.222-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12466",
      "summary": "Quando pode solicitar selo de verificação do WhatsApp",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:01:14.304-0300",
      "updated": "2026-07-10T18:01:22.089-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12465",
      "summary": "Simulação de valores e consumo de templates Meta/Poli",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:01:11.090-0300",
      "updated": "2026-07-10T18:01:18.650-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-12464",
      "summary": "Simulação de custos de plano e consumo de templates",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T18:01:10.891-0300",
      "updated": "2026-07-10T18:01:18.567-0300",
      "module": "Configurações",
      "classification": "indefinido"
    },
    {
      "key": "SM-12461",
      "summary": "Agendamento e realização de reunião de homologação e conexão de número WhatsApp",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:47.330-0300",
      "updated": "2026-07-10T17:55:59.519-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12445",
      "summary": "Configuração de mensagens rápidas e conexão de número WhatsApp - Meu Copo Porto",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:32.654-0300",
      "updated": "2026-07-10T17:55:57.499-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12458",
      "summary": "Número aparece como não registrado no WhatsApp para os clientes",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:47.309-0300",
      "updated": "2026-07-10T17:55:54.765-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12463",
      "summary": "Permitir encaminhamento interno de arquivos/comprovantes entre conversas para casos de uso comercial",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:47.501-0300",
      "updated": "2026-07-10T17:55:54.732-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12462",
      "summary": "Dúvida sobre números conectados no Meta Business",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:47.399-0300",
      "updated": "2026-07-10T17:55:54.564-0300",
      "module": "Outros",
      "classification": "externo"
    },
    {
      "key": "SM-12460",
      "summary": "Como desativar o chatbot que está atrapalhando os atendimentos",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:47.326-0300",
      "updated": "2026-07-10T17:55:54.513-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-12459",
      "summary": "Como encaminhar imagem de um chat para outro chat",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:47.323-0300",
      "updated": "2026-07-10T17:55:54.442-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12457",
      "summary": "Erro ao enviar mensagens via template para múltiplos contatos",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:40.022-0300",
      "updated": "2026-07-10T17:55:47.067-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12456",
      "summary": "Como entrar em contato com a Poli pelo WhatsApp oficial",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:39.910-0300",
      "updated": "2026-07-10T17:55:47.012-0300",
      "module": "Canais",
      "classification": "externo"
    },
    {
      "key": "SM-12455",
      "summary": "Como marcar conversa como não lida na interface",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:38.821-0300",
      "updated": "2026-07-10T17:55:46.076-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12454",
      "summary": "Confirmação sobre desvinculação de dados de pagamento após cancelamento",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:38.636-0300",
      "updated": "2026-07-10T17:55:45.679-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12453",
      "summary": "Alteração de data de vencimento da fatura para dia 15",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:36.652-0300",
      "updated": "2026-07-10T17:55:43.728-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12452",
      "summary": "Créditos comprados não foram liberados na conta do cliente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:35.806-0300",
      "updated": "2026-07-10T17:55:42.861-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12451",
      "summary": "Liberação urgente de créditos para difusão",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:35.796-0300",
      "updated": "2026-07-10T17:55:42.849-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12449",
      "summary": "Receio sobre banimento e perda de histórico ao migrar para API",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:35.246-0300",
      "updated": "2026-07-10T17:55:42.404-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12450",
      "summary": "Dúvida sobre período de teste e valor sem limitação",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:35.278-0300",
      "updated": "2026-07-10T17:55:42.362-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12448",
      "summary": "Costo de número exclusivo para México",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:33.256-0300",
      "updated": "2026-07-10T17:55:40.442-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12446",
      "summary": "Chats aparecen con reloj - inestabilidad en la plataforma",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:33.231-0300",
      "updated": "2026-07-10T17:55:40.379-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12447",
      "summary": "Verificación de créditos pendiente con financiero",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:33.237-0300",
      "updated": "2026-07-10T17:55:40.312-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12443",
      "summary": "Reunião de homologação/implantação realizada",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:32.357-0300",
      "updated": "2026-07-10T17:55:39.742-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12442",
      "summary": "Dúvida sobre acesso simultâneo na plataforma",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:32.310-0300",
      "updated": "2026-07-10T17:55:39.723-0300",
      "module": "Permissões / Roles",
      "classification": "indefinido"
    },
    {
      "key": "SM-12444",
      "summary": "Importação de contatos pendente",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:32.375-0300",
      "updated": "2026-07-10T17:55:39.663-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12441",
      "summary": "Solicitação de guias e materiais de treinamento",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:32.304-0300",
      "updated": "2026-07-10T17:55:39.491-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12440",
      "summary": "Créditos não aparecendo na plataforma",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:32.261-0300",
      "updated": "2026-07-10T17:55:39.350-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12437",
      "summary": "Como autorizar templates de marketing bloqueados pela Meta",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:25.219-0300",
      "updated": "2026-07-10T17:55:37.004-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-12439",
      "summary": "Solicitação de número de identificação do BM para acesso pontual",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:27.856-0300",
      "updated": "2026-07-10T17:55:35.197-0300",
      "module": "Permissões / Roles",
      "classification": "poli"
    },
    {
      "key": "SM-12438",
      "summary": "Dúvida sobre necessidade de desativar autenticação de dois fatores para acesso ao BM",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:27.802-0300",
      "updated": "2026-07-10T17:55:35.010-0300",
      "module": "Autenticação",
      "classification": "indefinido"
    },
    {
      "key": "SM-12434",
      "summary": "Agendamento de homologação para conexão de número via API WhatsApp",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:22.158-0300",
      "updated": "2026-07-10T17:55:31.365-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12427",
      "summary": "Como criar lembretes para enviar mensagens em datas específicas?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:10.811-0300",
      "updated": "2026-07-10T17:55:30.902-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12435",
      "summary": "Cliente solicitou contato com responsável pelo gerenciador de negócios",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:22.224-0300",
      "updated": "2026-07-10T17:55:29.648-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12436",
      "summary": "Como funciona o processo de migração de número API WhatsApp entre plataformas?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:22.419-0300",
      "updated": "2026-07-10T17:55:29.595-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12432",
      "summary": "Criação de usuários e configuração inicial para VDbras",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:22.128-0300",
      "updated": "2026-07-10T17:55:29.552-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-12433",
      "summary": "Como importar uma planilha de contatos na plataforma?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:22.132-0300",
      "updated": "2026-07-10T17:55:29.484-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12431",
      "summary": "Só consigo atribuir etiqueta quando estou em atendimento?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:22.011-0300",
      "updated": "2026-07-10T17:55:29.337-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12430",
      "summary": "Dúvida sobre simulação de valores do novo modelo de cobrança",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:15.367-0300",
      "updated": "2026-07-10T17:55:22.608-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12429",
      "summary": "Melhoria no filtro de responsável no CRM - adicionar dropdown ou autocomplete",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:11.543-0300",
      "updated": "2026-07-10T17:55:18.833-0300",
      "module": "Integrações Externas",
      "classification": "poli"
    },
    {
      "key": "SM-12426",
      "summary": "É possível agendar mensagens para enviar em data específica?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:10.739-0300",
      "updated": "2026-07-10T17:55:18.592-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12428",
      "summary": "Como filtrar oportunidades por responsável no CRM?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:10.853-0300",
      "updated": "2026-07-10T17:55:18.580-0300",
      "module": "Integrações Externas",
      "classification": "poli"
    },
    {
      "key": "SM-12425",
      "summary": "Como identificar o responsável pelas oportunidades criadas?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:10.740-0300",
      "updated": "2026-07-10T17:55:18.510-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12423",
      "summary": "Cliente solicitou simulação de custos para loja de Joinville",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:10.268-0300",
      "updated": "2026-07-10T17:55:17.609-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12424",
      "summary": "Criação de novo usuário - Maria Amorim UniAraguaia",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:10.444-0300",
      "updated": "2026-07-10T17:55:17.499-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12422",
      "summary": "Cliente redirecionou contato financeiro para o contratante Wilson",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:09.466-0300",
      "updated": "2026-07-10T17:55:17.029-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12421",
      "summary": "Simulação de valores e consumo de plano",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:06.859-0300",
      "updated": "2026-07-10T17:55:14.242-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12420",
      "summary": "Cliente perguntou para qual e-mail foi enviada a simulação de valores",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:06.508-0300",
      "updated": "2026-07-10T17:55:13.694-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12419",
      "summary": "Reunião sobre alterações de pagamento - cliente em férias até agosto",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:05.753-0300",
      "updated": "2026-07-10T17:55:13.143-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12418",
      "summary": "Simulação de valores de plano e consumo de templates",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:55:03.390-0300",
      "updated": "2026-07-10T17:55:11.007-0300",
      "module": "Configurações",
      "classification": "indefinido"
    },
    {
      "key": "SM-12417",
      "summary": "Cliente solicitou contato com financeiro - link de cobrança enviado",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:49:38.304-0300",
      "updated": "2026-07-10T17:49:46.010-0300",
      "module": "Contatos",
      "classification": "indefinido"
    },
    {
      "key": "SM-12416",
      "summary": "Como acessar boleto de pagamento mensal",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T17:10:16.684-0300",
      "updated": "2026-07-10T17:10:24.588-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12411",
      "summary": "Como vincular número do WhatsApp ao anúncio do Facebook",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T15:01:10.424-0300",
      "updated": "2026-07-10T15:01:23.497-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12414",
      "summary": "Erro ao enviar template - o que pode causar e se é cobrado",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T15:01:10.679-0300",
      "updated": "2026-07-10T15:01:18.730-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12410",
      "summary": "Liberação de acesso ao CRM apenas para usuário específico",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T15:01:10.376-0300",
      "updated": "2026-07-10T15:01:18.683-0300",
      "module": "Permissões / Roles",
      "classification": "poli"
    },
    {
      "key": "SM-12415",
      "summary": "Como funciona o Poli Flow",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T15:01:10.725-0300",
      "updated": "2026-07-10T15:01:18.617-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12412",
      "summary": "Como configurar e enviar pesquisa de satisfação para o cliente",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T15:01:10.421-0300",
      "updated": "2026-07-10T15:01:18.552-0300",
      "module": "Chat / Mensagens",
      "classification": "indefinido"
    },
    {
      "key": "SM-12413",
      "summary": "Se a janela fechar e finalizar o atendimento, o cliente recebe a pesquisa?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T15:01:10.607-0300",
      "updated": "2026-07-10T15:01:18.502-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12409",
      "summary": "Arquivos e fotos enviados por clientes não são recebidos na plataforma",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T08:02:33.381-0300",
      "updated": "2026-07-10T08:02:46.400-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12407",
      "summary": "Como mudar a foto do perfil do WhatsApp",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T08:02:33.053-0300",
      "updated": "2026-07-10T08:02:41.000-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12408",
      "summary": "Possibilidade de usar @ (nome de usuário) ao invés do número no WhatsApp",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T08:02:33.090-0300",
      "updated": "2026-07-10T08:02:40.840-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12406",
      "summary": "Erro na criação de oportunidades de venda",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T08:02:30.793-0300",
      "updated": "2026-07-10T08:02:38.373-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12404",
      "summary": "Qual o valor em reais de cada crédito de disparo?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T08:02:29.282-0300",
      "updated": "2026-07-10T08:02:36.977-0300",
      "module": "Disparos / Campanhas",
      "classification": "poli"
    },
    {
      "key": "SM-12405",
      "summary": "Permitir limitar quantidade de contatos em disparo em massa",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T08:02:29.426-0300",
      "updated": "2026-07-10T08:02:36.706-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12403",
      "summary": "Como funciona o consumo de créditos no disparo em massa?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T08:02:28.810-0300",
      "updated": "2026-07-10T08:02:36.260-0300",
      "module": "Disparos / Campanhas",
      "classification": "poli"
    },
    {
      "key": "SM-12402",
      "summary": "Cliente quer verificar saúde da conta para envio em massa",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T08:02:25.776-0300",
      "updated": "2026-07-10T08:02:33.189-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12401",
      "summary": "Usuária gestora sem acesso ao CRM - necessário liberar acesso novamente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T08:02:25.325-0300",
      "updated": "2026-07-10T08:02:32.909-0300",
      "module": "Permissões / Roles",
      "classification": "poli"
    },
    {
      "key": "SM-12400",
      "summary": "Envio de nota fiscal referente ao boleto de julho",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T08:02:23.967-0300",
      "updated": "2026-07-10T08:02:32.082-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12399",
      "summary": "Agendamento de reunião para melhorar configuração do robô",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T08:02:23.445-0300",
      "updated": "2026-07-10T08:02:31.216-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-12397",
      "summary": "Cliente pergunta sobre previsão de atualização solicitada na semana anterior",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T08:02:22.580-0300",
      "updated": "2026-07-10T08:02:30.948-0300",
      "module": "Contatos",
      "classification": "indefinido"
    },
    {
      "key": "SM-12398",
      "summary": "Etiquetas exibindo mensagem 'em fase de teste' ao tentar aplicar",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-10T08:02:23.117-0300",
      "updated": "2026-07-10T08:02:30.760-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12396",
      "summary": "Adição de número de telefone para usuário Lucas",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-09T19:54:34.791-0300",
      "updated": "2026-07-09T19:54:44.156-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12395",
      "summary": "Usuário sem permissão para acessar aba de canais",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-09T18:02:18.626-0300",
      "updated": "2026-07-09T18:02:26.612-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12394",
      "summary": "Erro ao enviar template para cliente específico",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-09T18:02:18.600-0300",
      "updated": "2026-07-09T18:02:26.086-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12393",
      "summary": "Como alterar/criar um template de mensagem",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-09T18:02:18.599-0300",
      "updated": "2026-07-09T18:02:25.790-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12390",
      "summary": "Distribuição de chats não funciona corretamente - atendentes não recebem novos chats",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-09T17:24:13.307-0300",
      "updated": "2026-07-09T17:24:39.000-0300",
      "module": "Distribuição / Filas",
      "classification": "poli"
    },
    {
      "key": "SM-12392",
      "summary": "Exibir contexto da mídia/post de origem nas mensagens vindas do Instagram",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-09T17:24:13.651-0300",
      "updated": "2026-07-09T17:24:20.872-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12391",
      "summary": "Como identificar a mídia/post que o cliente está se referindo quando vem do Instagram?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-09T17:24:13.344-0300",
      "updated": "2026-07-09T17:24:20.726-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12389",
      "summary": "Reconexão do canal Instagram que desconectou",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-09T17:24:12.933-0300",
      "updated": "2026-07-09T17:24:20.393-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12388",
      "summary": "Prorrogação de vencimento de boleto para 17/07",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-09T17:14:00.057-0300",
      "updated": "2026-07-09T17:14:07.264-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12386",
      "summary": "Qual a validade dos créditos e quando solicitar renovação?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-09T17:13:48.005-0300",
      "updated": "2026-07-09T17:13:55.659-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12387",
      "summary": "Correção de boleto e esclarecimento sobre validade de créditos",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-09T17:13:48.071-0300",
      "updated": "2026-07-09T17:13:55.537-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12385",
      "summary": "Falha no envio de mensagens/mídias - cliente precisou reenviar múltiplas vezes",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-09T16:23:28.083-0300",
      "updated": "2026-07-09T16:23:40.480-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12377",
      "summary": "Como identificar contatos vindos de anúncios do Meta Ads?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-09T15:43:22.545-0300",
      "updated": "2026-07-09T15:43:38.709-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12384",
      "summary": "Adicionar filtro de chat por origem de anúncio (Meta Ads)",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-09T15:43:23.284-0300",
      "updated": "2026-07-09T15:43:30.473-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12383",
      "summary": "Visualização de chats em formato Kanban",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-09T15:43:23.174-0300",
      "updated": "2026-07-09T15:43:30.448-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12382",
      "summary": "Dados do dashboard estão quebrados/fragmentados",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-09T15:43:22.953-0300",
      "updated": "2026-07-09T15:43:30.242-0300",
      "module": "Relatórios / SLA",
      "classification": "poli"
    },
    {
      "key": "SM-12380",
      "summary": "Automação do Instagram Direct não está disparando mensagens",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-09T15:43:22.798-0300",
      "updated": "2026-07-09T15:43:30.028-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12381",
      "summary": "Agendamento de reunião para tirar dúvidas sobre Flow/CRM e automação",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-09T15:43:22.916-0300",
      "updated": "2026-07-09T15:43:30.000-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-12379",
      "summary": "É possível visualizar os chats em formato Kanban?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-09T15:43:22.550-0300",
      "updated": "2026-07-09T15:43:29.792-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12378",
      "summary": "O CRM (Flow) tem cobrança adicional?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-09T15:43:22.542-0300",
      "updated": "2026-07-09T15:43:29.792-0300",
      "module": "Integrações Externas",
      "classification": "indefinido"
    },
    {
      "key": "SM-12376",
      "summary": "É possível inserir valor de venda ao finalizar um chat?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-09T15:43:22.522-0300",
      "updated": "2026-07-09T15:43:29.788-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12375",
      "summary": "Cliente questionou demora no atendimento e cobrança",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-09T14:27:48.708-0300",
      "updated": "2026-07-09T14:27:55.873-0300",
      "module": "Contatos",
      "classification": "indefinido"
    },
    {
      "key": "SM-12374",
      "summary": "Cliente aguardando retorno sobre informação pendente",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-09T14:12:57.038-0300",
      "updated": "2026-07-09T14:13:04.561-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12372",
      "summary": "Cliente perguntou se o histórico das conversas fica salvo",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-09T14:09:54.975-0300",
      "updated": "2026-07-09T14:10:02.812-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12373",
      "summary": "Não era possível selecionar item da lista de templates",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-09T14:09:55.035-0300",
      "updated": "2026-07-09T14:10:02.626-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12371",
      "summary": "Confirmação de recebimento de solicitação e fatura",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-09T14:05:15.286-0300",
      "updated": "2026-07-09T14:05:23.435-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12369",
      "summary": "Como criar templates com variáveis para disparos e envios manuais",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-09T11:57:16.323-0300",
      "updated": "2026-07-09T11:57:29.947-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-12370",
      "summary": "Erro ao criar/salvar templates de mensagem",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-09T11:57:16.340-0300",
      "updated": "2026-07-09T11:57:23.904-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12367",
      "summary": "Mensagens aparecem em um login de atendente e não aparecem em outro",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-09T11:56:39.301-0300",
      "updated": "2026-07-09T11:56:51.105-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12368",
      "summary": "Melhoria na sincronização em tempo real das filas de atendimento entre atendentes",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-09T11:56:39.838-0300",
      "updated": "2026-07-09T11:56:47.403-0300",
      "module": "Distribuição / Filas",
      "classification": "poli"
    },
    {
      "key": "SM-12366",
      "summary": "Problema no sistema após atualização",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-09T09:23:05.429-0300",
      "updated": "2026-07-09T09:23:13.717-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12358",
      "summary": "Chats encaminhados não sobem para o topo da lista do operador destino",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:07:33.524-0300",
      "updated": "2026-07-08T18:07:55.261-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12365",
      "summary": "Falha de envio de mensagem com triângulo vermelho e pop-up de erro",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:07:37.751-0300",
      "updated": "2026-07-08T18:07:44.742-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12364",
      "summary": "Como ativar a transcrição de áudios na Poli",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:07:36.631-0300",
      "updated": "2026-07-08T18:07:43.719-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12363",
      "summary": "Cliente com erro ao enviar mensagem e dúvida sobre contatos duplicados",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:07:34.499-0300",
      "updated": "2026-07-08T18:07:42.962-0300",
      "module": "Chat / Mensagens",
      "classification": "indefinido"
    },
    {
      "key": "SM-12362",
      "summary": "Erro ao enviar mensagem e possível duplicidade de contatos",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:07:34.454-0300",
      "updated": "2026-07-08T18:07:41.619-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12360",
      "summary": "Mensagens demoram 15 minutos para chegar ao cliente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:07:33.615-0300",
      "updated": "2026-07-08T18:07:40.962-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12361",
      "summary": "Operadora não conseguia criar fluxos - erro ao salvar",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:07:33.680-0300",
      "updated": "2026-07-08T18:07:40.952-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12357",
      "summary": "Solicitação de nota fiscal com valor correto para pagamento",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:07:33.476-0300",
      "updated": "2026-07-08T18:07:40.873-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12359",
      "summary": "Como adicionar tag diretamente no chat do lead",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:07:33.548-0300",
      "updated": "2026-07-08T18:07:40.747-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12356",
      "summary": "Ajuste de créditos - disparo consumiu créditos que deveriam ser da sobra do mês anterior",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:07:32.983-0300",
      "updated": "2026-07-08T18:07:40.077-0300",
      "module": "Disparos / Campanhas",
      "classification": "poli"
    },
    {
      "key": "SM-12355",
      "summary": "Permitir visualizar conversas de disparo na aba 'Todas as conversas' mesmo sem resposta",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:07:31.982-0300",
      "updated": "2026-07-08T18:07:39.347-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12354",
      "summary": "Conversas de disparo não aparecem na aba 'Todas as conversas'",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:07:31.700-0300",
      "updated": "2026-07-08T18:07:38.806-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12353",
      "summary": "Créditos não aparecem na plataforma",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:07:30.160-0300",
      "updated": "2026-07-08T18:07:37.537-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12352",
      "summary": "Conflito gerado após atualização de planos",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:07:30.054-0300",
      "updated": "2026-07-08T18:07:37.269-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12351",
      "summary": "Cliente questiona cobrança de boleto já pago",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:07:28.369-0300",
      "updated": "2026-07-08T18:07:35.557-0300",
      "module": "Contatos",
      "classification": "indefinido"
    },
    {
      "key": "SM-12345",
      "summary": "Status de usuários mostrando offline incorretamente quando estão online",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:07:20.618-0300",
      "updated": "2026-07-08T18:07:35.521-0300",
      "module": "WebSocket / Presença",
      "classification": "poli"
    },
    {
      "key": "SM-12350",
      "summary": "Prazo para aprovação de mensagens rápidas",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:07:27.834-0300",
      "updated": "2026-07-08T18:07:35.042-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12349",
      "summary": "Solicitação de faturamento e esclarecimento sobre inadimplência - Nelson Wilians Advogados",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:07:25.292-0300",
      "updated": "2026-07-08T18:07:32.435-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12348",
      "summary": "Dúvida sobre cobrança durante período de suspensão por inadimplência",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:07:25.258-0300",
      "updated": "2026-07-08T18:07:32.200-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12346",
      "summary": "Onde atualizar a foto que os clientes visualizam no WhatsApp Business",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:07:24.403-0300",
      "updated": "2026-07-08T18:07:31.775-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12347",
      "summary": "Cliente aguardando atendimento de onboarding/implantação após contratação",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:07:24.584-0300",
      "updated": "2026-07-08T18:07:31.677-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12343",
      "summary": "Cliente solicita contato com Victor para continuidade do processo inicial",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:07:19.953-0300",
      "updated": "2026-07-08T18:07:27.122-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12344",
      "summary": "Cliente não conseguia enviar áudio na plataforma",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:07:19.958-0300",
      "updated": "2026-07-08T18:07:27.060-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12342",
      "summary": "Como verificar se mensagens de disparo foram enviadas corretamente",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:07:19.113-0300",
      "updated": "2026-07-08T18:07:26.316-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12341",
      "summary": "Liberação de créditos para utilização até final do mês",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:07:18.342-0300",
      "updated": "2026-07-08T18:07:25.786-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12340",
      "summary": "Alerta automático para chats acumulados sem atendente por período prolongado",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:42.854-0300",
      "updated": "2026-07-08T18:05:49.870-0300",
      "module": "Distribuição / Filas",
      "classification": "poli"
    },
    {
      "key": "SM-12339",
      "summary": "Conversas antigas acumuladas na aba 'sem atendente' sem distribuição",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:42.664-0300",
      "updated": "2026-07-08T18:05:49.793-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12338",
      "summary": "Erro na entrega de mensagens com pico de atividade na fila da Meta",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:42.660-0300",
      "updated": "2026-07-08T18:05:49.671-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12336",
      "summary": "Cliente deseja adicionar novo número de WhatsApp ao plano",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:41.933-0300",
      "updated": "2026-07-08T18:05:49.005-0300",
      "module": "Canais",
      "classification": "indefinido"
    },
    {
      "key": "SM-12335",
      "summary": "Quantos números estão habilitados para contato via chat na conta",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:41.921-0300",
      "updated": "2026-07-08T18:05:48.987-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12337",
      "summary": "Há alteração de valor em caso de substituição de número ao invés de adição",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:41.951-0300",
      "updated": "2026-07-08T18:05:48.891-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12334",
      "summary": "Melhoria na comunicação sobre recursos de IA disponíveis na plataforma",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:40.930-0300",
      "updated": "2026-07-08T18:05:48.174-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12333",
      "summary": "Cliente pergunta se a Poli Digital oferece atendimento com IA",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:40.614-0300",
      "updated": "2026-07-08T18:05:47.612-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12332",
      "summary": "Mensagens dos clientes não estão chegando - oscilação na entrega",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:39.684-0300",
      "updated": "2026-07-08T18:05:46.841-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12330",
      "summary": "Como fazer disparos de mensagens na plataforma",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:38.134-0300",
      "updated": "2026-07-08T18:05:45.498-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12329",
      "summary": "Como criar template de mensagem",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:38.128-0300",
      "updated": "2026-07-08T18:05:45.357-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12331",
      "summary": "Como preencher os campos do template (tag, mensagem, atalho, tipo, título e rodapé)",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:38.153-0300",
      "updated": "2026-07-08T18:05:45.286-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12328",
      "summary": "Cliente informado para ignorar boleto",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:36.171-0300",
      "updated": "2026-07-08T18:05:43.497-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12327",
      "summary": "Como configurar mensagem automática de feriado no Poli",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:35.785-0300",
      "updated": "2026-07-08T18:05:43.011-0300",
      "module": "Chat / Mensagens",
      "classification": "indefinido"
    },
    {
      "key": "SM-12326",
      "summary": "Solicitação de emissão de Nota Fiscal",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:34.749-0300",
      "updated": "2026-07-08T18:05:41.945-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12314",
      "summary": "Número de telefone editado no contato não estava funcionando para envio de mensagens",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:22.960-0300",
      "updated": "2026-07-08T18:05:35.722-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12325",
      "summary": "Onde encontrar o AnyDesk para download?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:27.405-0300",
      "updated": "2026-07-08T18:05:34.564-0300",
      "module": "Upload / Mídia",
      "classification": "indefinido"
    },
    {
      "key": "SM-12323",
      "summary": "Transcrição de áudios parou de funcionar",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:27.044-0300",
      "updated": "2026-07-08T18:05:34.246-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12324",
      "summary": "Alteração no fluxo do bot - adicionar opção de 'Conhecer mais sobre a Referência Imóveis'",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:27.137-0300",
      "updated": "2026-07-08T18:05:34.237-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-12322",
      "summary": "Bot com funcionamento intermitente - às vezes funciona, às vezes não",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:26.967-0300",
      "updated": "2026-07-08T18:05:33.949-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-12321",
      "summary": "Canal bloqueado/banido pela Meta - cliente sem uso do Polichat há 2 dias",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:26.287-0300",
      "updated": "2026-07-08T18:05:33.276-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12320",
      "summary": "Como contratar a API Oficial da Meta",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:26.213-0300",
      "updated": "2026-07-08T18:05:33.238-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12319",
      "summary": "Manter exibição do ID numérico junto com UUID na lista de contatos para usuários de API",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:26.056-0300",
      "updated": "2026-07-08T18:05:33.199-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12317",
      "summary": "Onde encontrar documentação da nova versão da API",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:25.949-0300",
      "updated": "2026-07-08T18:05:33.185-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12316",
      "summary": "O uso do ID numérico será mantido na API ou precisará migrar para UUID",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:25.883-0300",
      "updated": "2026-07-08T18:05:33.182-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12315",
      "summary": "Como acessar relatório de etiquetas e editar usuário admin no novo layout",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:25.858-0300",
      "updated": "2026-07-08T18:05:33.047-0300",
      "module": "Permissões / Roles",
      "classification": "poli"
    },
    {
      "key": "SM-12318",
      "summary": "Sistema alterna entre layout novo e antigo de forma inconsistente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:25.964-0300",
      "updated": "2026-07-08T18:05:33.026-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12313",
      "summary": "Erro no sistema reportado pelo cliente com prints de tela",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:22.897-0300",
      "updated": "2026-07-08T18:05:29.878-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12312",
      "summary": "Áudio fica carregando e não chega para o cliente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:19.931-0300",
      "updated": "2026-07-08T18:05:26.922-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12310",
      "summary": "Agendamento de acesso remoto via AnyDesk para diagnóstico de problema",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:18.361-0300",
      "updated": "2026-07-08T18:05:25.729-0300",
      "module": "Permissões / Roles",
      "classification": "indefinido"
    },
    {
      "key": "SM-12311",
      "summary": "Colaboradora não consegue salvar contatos na plataforma",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:18.506-0300",
      "updated": "2026-07-08T18:05:25.721-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12309",
      "summary": "Melhorar persistência de permissões/acessos de recursos",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:18.333-0300",
      "updated": "2026-07-08T18:05:25.664-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12308",
      "summary": "Cliente sem acesso a recurso desde o início - problema recorrente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:18.324-0300",
      "updated": "2026-07-08T18:05:25.652-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12307",
      "summary": "Cliente questiona cobrança de créditos e valor da fatura triplicado",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:14.263-0300",
      "updated": "2026-07-08T18:05:21.462-0300",
      "module": "Contatos",
      "classification": "indefinido"
    },
    {
      "key": "SM-12306",
      "summary": "Robô não direciona mensagens automaticamente para nova atendente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:13.112-0300",
      "updated": "2026-07-08T18:05:20.556-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12304",
      "summary": "Distribuição de chats funciona apenas para atendentes disponíveis?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:11.420-0300",
      "updated": "2026-07-08T18:05:19.787-0300",
      "module": "Distribuição / Filas",
      "classification": "poli"
    },
    {
      "key": "SM-12305",
      "summary": "Problema identificado via print - aguardando análise técnica",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:12.450-0300",
      "updated": "2026-07-08T18:05:19.606-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12301",
      "summary": "Cliente não consegue visualizar mensagens recebidas fora do horário de funcionamento",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:09.882-0300",
      "updated": "2026-07-08T18:05:19.512-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12303",
      "summary": "Alterações no bot/fluxo de atendimento",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:11.402-0300",
      "updated": "2026-07-08T18:05:18.420-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-12302",
      "summary": "Permitir visualização de mensagens recebidas fora do horário de atendimento",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:09.975-0300",
      "updated": "2026-07-08T18:05:17.167-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12296",
      "summary": "Mensagens recebidas não aparecem no chat sem atualização forçada da página",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:05.447-0300",
      "updated": "2026-07-08T18:05:14.193-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12299",
      "summary": "Como migrar carteira de um usuário para outro ao excluí-lo",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:06.701-0300",
      "updated": "2026-07-08T18:05:13.912-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12300",
      "summary": "Como excluir usuários da Poli e se deixa de pagar por eles",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:06.875-0300",
      "updated": "2026-07-08T18:05:13.804-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12298",
      "summary": "Erro 131049 da Meta - limite de mensagens de marketing",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:06.000-0300",
      "updated": "2026-07-08T18:05:13.273-0300",
      "module": "Chat / Mensagens",
      "classification": "externo"
    },
    {
      "key": "SM-12297",
      "summary": "Como configurar mensagem de ausência para feriado na Poli",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:05.674-0300",
      "updated": "2026-07-08T18:05:12.831-0300",
      "module": "Chat / Mensagens",
      "classification": "indefinido"
    },
    {
      "key": "SM-12295",
      "summary": "Lentidão e mensagens ficando com relógio (pendentes) - canal WABA",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:04.868-0300",
      "updated": "2026-07-08T18:05:12.003-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12294",
      "summary": "Atendente com acesso restrito consegue visualizar contatos e histórico de outros atendentes",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:04.737-0300",
      "updated": "2026-07-08T18:05:11.750-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12288",
      "summary": "Como criar mensagem rápida na nova versão do Poli",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:04:59.889-0300",
      "updated": "2026-07-08T18:05:11.081-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12285",
      "summary": "Cliente perguntou se foi corrigido o problema de visualização das últimas mensagens",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:04:58.621-0300",
      "updated": "2026-07-08T18:05:10.564-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12291",
      "summary": "Como acessar boletos e notas fiscais pela plataforma?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:02.759-0300",
      "updated": "2026-07-08T18:05:10.217-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12292",
      "summary": "Relatório de créditos não exibe quantidade disponível - mostra 0 mesmo tendo 1250 créditos",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:02.782-0300",
      "updated": "2026-07-08T18:05:10.154-0300",
      "module": "Relatórios / SLA",
      "classification": "poli"
    },
    {
      "key": "SM-12293",
      "summary": "Melhorar exibição de créditos disponíveis no painel do cliente",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:02.958-0300",
      "updated": "2026-07-08T18:05:10.032-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12290",
      "summary": "Como criar mensagem rápida com campo customizável para preenchimento",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:01.935-0300",
      "updated": "2026-07-08T18:05:09.268-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12275",
      "summary": "Tela não exibe informações de clientes",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:04:53.749-0300",
      "updated": "2026-07-08T18:05:09.259-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12282",
      "summary": "É possível fazer disparos de marketing via Instagram?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:04:58.108-0300",
      "updated": "2026-07-08T18:05:09.073-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12289",
      "summary": "Permitir que atendentes criem mensagens rápidas pessoais",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:05:00.291-0300",
      "updated": "2026-07-08T18:05:07.534-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12286",
      "summary": "Remover acesso ao disparador antigo que será descontinuado",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:04:58.729-0300",
      "updated": "2026-07-08T18:05:06.072-0300",
      "module": "Permissões / Roles",
      "classification": "poli"
    },
    {
      "key": "SM-12287",
      "summary": "Busca por nome de contato não funciona após atualização",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:04:58.749-0300",
      "updated": "2026-07-08T18:05:05.927-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12284",
      "summary": "Como configurar bot para respostas de campanhas de marketing?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:04:58.455-0300",
      "updated": "2026-07-08T18:05:05.647-0300",
      "module": "Jarvis / IA",
      "classification": "indefinido"
    },
    {
      "key": "SM-12283",
      "summary": "Remover opção de disparo via Instagram da interface de campanhas",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:04:58.343-0300",
      "updated": "2026-07-08T18:05:05.343-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12279",
      "summary": "Reenvio de boleto - boleto anterior estava baixado",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:04:56.665-0300",
      "updated": "2026-07-08T18:05:04.111-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12281",
      "summary": "Por que existem usuários com preços diferentes na fatura?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:04:56.730-0300",
      "updated": "2026-07-08T18:05:03.951-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12280",
      "summary": "Melhorar clareza e detalhamento da fatura/boleto para o cliente",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:04:56.667-0300",
      "updated": "2026-07-08T18:05:03.948-0300",
      "module": "Contatos",
      "classification": "indefinido"
    },
    {
      "key": "SM-12278",
      "summary": "Cliente questiona alteração no valor do boleto",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:04:56.525-0300",
      "updated": "2026-07-08T18:05:03.727-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12277",
      "summary": "O que são os créditos cobrados na fatura?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:04:56.442-0300",
      "updated": "2026-07-08T18:05:03.633-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12276",
      "summary": "Problema de exibição resolvido com limpeza de cache",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:04:54.744-0300",
      "updated": "2026-07-08T18:05:01.782-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12273",
      "summary": "Permitir configurar atendente apenas para contato ativo (sem receber distribuição)",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:04:53.042-0300",
      "updated": "2026-07-08T18:05:00.257-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12274",
      "summary": "Como impedir distribuição automática de chats para um atendente específico",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:04:53.107-0300",
      "updated": "2026-07-08T18:05:00.148-0300",
      "module": "Distribuição / Filas",
      "classification": "poli"
    },
    {
      "key": "SM-12272",
      "summary": "Risco de vincular anúncios à API do WhatsApp e impacto de banimento",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:04:52.579-0300",
      "updated": "2026-07-08T18:04:59.741-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12271",
      "summary": "Como a API do WhatsApp é vinculada ao Facebook/Meta?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:04:52.238-0300",
      "updated": "2026-07-08T18:04:59.455-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12270",
      "summary": "Como conectar outro número após suspensão de WhatsApp",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T18:04:50.869-0300",
      "updated": "2026-07-08T18:04:58.249-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12266",
      "summary": "Flow não estava liberado para o usuário",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T17:46:54.607-0300",
      "updated": "2026-07-08T17:47:07.739-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12269",
      "summary": "Configuração de fluxo para atendimento fora do horário",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T17:46:55.011-0300",
      "updated": "2026-07-08T17:47:02.373-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-12268",
      "summary": "Dúvida sobre usuários duplicados com o mesmo nome",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T17:46:54.802-0300",
      "updated": "2026-07-08T17:47:02.208-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12267",
      "summary": "Dúvida sobre localização de disparos no filtro",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T17:46:54.714-0300",
      "updated": "2026-07-08T17:47:02.208-0300",
      "module": "Disparos / Campanhas",
      "classification": "indefinido"
    },
    {
      "key": "SM-12265",
      "summary": "Como configurar mensagem automática para feriado específico e se consome créditos",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T17:45:37.367-0300",
      "updated": "2026-07-08T17:45:44.852-0300",
      "module": "Chat / Mensagens",
      "classification": "indefinido"
    },
    {
      "key": "SM-12263",
      "summary": "Quantos créditos tem cada pacote adicional?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T17:40:06.629-0300",
      "updated": "2026-07-08T17:40:14.796-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12264",
      "summary": "Agendamento de treinamento para tirar dúvidas sobre a plataforma",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T17:40:06.658-0300",
      "updated": "2026-07-08T17:40:14.202-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12261",
      "summary": "Prazo de análise do Meta e criação de nova conta Facebook",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T17:06:00.570-0300",
      "updated": "2026-07-08T17:06:27.118-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12262",
      "summary": "Instabilidade de conexão durante atendimento - cliente com internet caindo",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T17:06:00.942-0300",
      "updated": "2026-07-08T17:06:09.021-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12260",
      "summary": "Como cadastrar novo colaborador na plataforma META",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T16:48:50.255-0300",
      "updated": "2026-07-08T16:48:57.866-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12256",
      "summary": "Como controlar e visualizar saldo de créditos na plataforma",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T16:47:54.666-0300",
      "updated": "2026-07-08T16:48:05.116-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12259",
      "summary": "Como evitar que a conversa finalize automaticamente após disparos",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T16:47:55.154-0300",
      "updated": "2026-07-08T16:48:02.623-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12258",
      "summary": "Melhorar visualização e controle de saldo de créditos para o cliente",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T16:47:54.993-0300",
      "updated": "2026-07-08T16:48:02.533-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12257",
      "summary": "Créditos contratados não aparecem corretamente na plataforma",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T16:47:54.733-0300",
      "updated": "2026-07-08T16:48:02.145-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12249",
      "summary": "Mensagens enviadas não aparecem na barra de atendimento",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T16:32:00.077-0300",
      "updated": "2026-07-08T16:32:14.721-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12255",
      "summary": "Disponibilizar documentação completa de comandos para templates",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T16:32:00.477-0300",
      "updated": "2026-07-08T16:32:07.699-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-12254",
      "summary": "Oscilação visual no saldo de créditos e erro ao deslogar",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T16:32:00.245-0300",
      "updated": "2026-07-08T16:32:07.685-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12252",
      "summary": "Existe manual de comandos para personalizar templates?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T16:32:00.207-0300",
      "updated": "2026-07-08T16:32:07.664-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-12251",
      "summary": "Relatório de análise de operador instável - exibe vazio para supervisores e gestores",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T16:32:00.134-0300",
      "updated": "2026-07-08T16:32:07.463-0300",
      "module": "Permissões / Roles",
      "classification": "poli"
    },
    {
      "key": "SM-12250",
      "summary": "É possível apagar mensagem enviada pela plataforma?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T16:32:00.127-0300",
      "updated": "2026-07-08T16:32:07.451-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12253",
      "summary": "Comprovante de pagamento de boleto",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T16:32:00.229-0300",
      "updated": "2026-07-08T16:32:07.448-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12248",
      "summary": "Boletos enviados chegando com atraso",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T16:32:00.041-0300",
      "updated": "2026-07-08T16:32:07.256-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12247",
      "summary": "Mudanças da Meta em cobrança de créditos e disparos",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T16:31:59.703-0300",
      "updated": "2026-07-08T16:32:07.149-0300",
      "module": "Disparos / Campanhas",
      "classification": "indefinido"
    },
    {
      "key": "SM-12243",
      "summary": "Template de mensagem exibindo conteúdo incompleto na visualização da Poli",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T16:31:45.837-0300",
      "updated": "2026-07-08T16:32:06.745-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12246",
      "summary": "Divergência nos dados do relatório gerando insegurança no cliente",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T16:31:46.273-0300",
      "updated": "2026-07-08T16:31:53.597-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12245",
      "summary": "Como habilitar conversa após resposta do cliente ao template",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T16:31:46.157-0300",
      "updated": "2026-07-08T16:31:53.426-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12244",
      "summary": "Problema ao colar link na Poli após resposta do proponente",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T16:31:45.884-0300",
      "updated": "2026-07-08T16:31:53.196-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12242",
      "summary": "Solicitação de extensão de período para 01/01/26 a 10/06/26",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T14:16:25.341-0300",
      "updated": "2026-07-08T14:16:32.994-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12240",
      "summary": "Cliente perguntou se precisa incluir número na Poli ou pode usar pelo App WhatsApp",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T13:23:02.013-0300",
      "updated": "2026-07-08T13:23:09.682-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12241",
      "summary": "Cliente perguntou se existe versão mobile da Poli",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T13:23:02.304-0300",
      "updated": "2026-07-08T13:23:09.670-0300",
      "module": "Contatos",
      "classification": "poli"
    },
    {
      "key": "SM-12239",
      "summary": "Como configurar para que contatos de uma opção específica do bot caiam sempre com o mesmo atendente",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T09:47:52.214-0300",
      "updated": "2026-07-08T09:48:00.569-0300",
      "module": "Jarvis / IA",
      "classification": "indefinido"
    },
    {
      "key": "SM-12238",
      "summary": "Atualização de valor de nota fiscal e boleto conforme novo processo/apostilamento",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-08T08:07:25.355-0300",
      "updated": "2026-07-08T08:07:43.809-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12237",
      "summary": "Como saber de qual canal é o template quando não aparece para envio",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-07T17:42:17.714-0300",
      "updated": "2026-07-07T17:42:25.975-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12236",
      "summary": "Melhorar visibilidade do canal vinculado ao template na listagem",
      "type": "História",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-07T17:42:17.624-0300",
      "updated": "2026-07-07T17:42:25.503-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12235",
      "summary": "Como substituir o número de telefone do atendimento online?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-07T16:21:13.294-0300",
      "updated": "2026-07-07T16:21:20.769-0300",
      "module": "WebSocket / Presença",
      "classification": "poli"
    },
    {
      "key": "SM-12233",
      "summary": "Qual a diferença entre Broker e WABA?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-07T16:21:13.225-0300",
      "updated": "2026-07-07T16:21:20.688-0300",
      "module": "Canais",
      "classification": "poli"
    },
    {
      "key": "SM-12234",
      "summary": "O que significa BM?",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-07T16:21:13.235-0300",
      "updated": "2026-07-07T16:21:20.501-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12231",
      "summary": "Dúvida sobre templates de mensagem e aprovação na Meta",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-07T16:18:27.182-0300",
      "updated": "2026-07-07T16:18:52.656-0300",
      "module": "Chat / Mensagens",
      "classification": "indefinido"
    },
    {
      "key": "SM-12232",
      "summary": "Suporte durante implantação - alinhamento sobre templates com equipe",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-07T16:18:27.269-0300",
      "updated": "2026-07-07T16:18:34.841-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-12230",
      "summary": "Confirmação de e-mail de contato - Arca Cobranças",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-07T15:07:21.417-0300",
      "updated": "2026-07-07T15:07:28.988-0300",
      "module": "Contatos",
      "classification": "indefinido"
    },
    {
      "key": "SM-12229",
      "summary": "Cliente não conseguia enviar áudio pelo navegador",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-07T13:24:03.541-0300",
      "updated": "2026-07-07T13:24:11.471-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12228",
      "summary": "Mensagens não sendo enviadas - ficam com relógio ou sinal vermelho",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-07T10:13:31.783-0300",
      "updated": "2026-07-07T10:13:39.591-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12227",
      "summary": "Como ver detalhamento do plano atual na Poli (valores por usuário e créditos)",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-07T10:13:31.429-0300",
      "updated": "2026-07-07T10:13:39.449-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12225",
      "summary": "O que é o plano UCE na composição da mensalidade",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-07T10:13:31.341-0300",
      "updated": "2026-07-07T10:13:39.035-0300",
      "module": "Outros",
      "classification": "indefinido"
    },
    {
      "key": "SM-12226",
      "summary": "Como desativar finalização automática de chats em disparos de template",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-07T10:13:31.352-0300",
      "updated": "2026-07-07T10:13:38.816-0300",
      "module": "Configurações",
      "classification": "poli"
    },
    {
      "key": "SM-12224",
      "summary": "Boleto pago mas aviso de pendência ainda aparece no sistema",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-07T10:13:20.652-0300",
      "updated": "2026-07-07T10:13:29.234-0300",
      "module": "Outros",
      "classification": "poli"
    },
    {
      "key": "SM-12223",
      "summary": "Reloginho ao enviar mensagens - lentidão temporária no envio",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-07T10:13:20.243-0300",
      "updated": "2026-07-07T10:13:27.712-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12222",
      "summary": "Adição de novo usuário/atendente e configuração no bot",
      "type": "Solicitação ",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-07T10:13:19.929-0300",
      "updated": "2026-07-07T10:13:27.666-0300",
      "module": "Jarvis / IA",
      "classification": "poli"
    },
    {
      "key": "SM-12221",
      "summary": "Mensagens não estavam sendo enviadas/recebidas no número 554135008088",
      "type": "Bug",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-07T10:13:18.615-0300",
      "updated": "2026-07-07T10:13:27.128-0300",
      "module": "Chat / Mensagens",
      "classification": "poli"
    },
    {
      "key": "SM-12220",
      "summary": "Gestor não conseguia acessar a aba 'Canais' na plataforma",
      "type": "Dúvida",
      "priority": "Medium",
      "status": "Aberto",
      "created": "2026-07-07T10:13:16.736-0300",
      "updated": "2026-07-07T10:13:25.430-0300",
      "module": "Canais",
      "classification": "poli"
    }
  ],
  "sm_tickets_n2": [],
  "timeline": [
    {
      "data": "2026-06-05",
      "modulos": {
        "Chat / Mensagens": {
          "total": 62,
          "tec": 29,
          "usr": 33,
          "entropy": 2.8,
          "cfr": 0.5,
          "crash_free_delta": -1.2
        },
        "Distribuição / Filas": {
          "total": 38,
          "tec": 16,
          "usr": 22,
          "entropy": 1.5,
          "cfr": 0.5,
          "crash_free_delta": 0
        },
        "Canais / WhatsApp": {
          "total": 37,
          "tec": 22,
          "usr": 15,
          "entropy": 1.8,
          "cfr": 1,
          "crash_free_delta": 0
        },
        "Autenticação": {
          "total": 20,
          "tec": 15,
          "usr": 5,
          "entropy": 0,
          "cfr": 0,
          "crash_free_delta": -1.5
        },
        "Contatos / Busca": {
          "total": 19,
          "tec": 8,
          "usr": 11,
          "entropy": 1.2,
          "cfr": 0.4,
          "crash_free_delta": 0
        },
        "Upload / Mídia": {
          "total": 12,
          "tec": 7,
          "usr": 5,
          "entropy": 0.8,
          "cfr": 0,
          "crash_free_delta": 0
        },
        "WebSocket / Presença": {
          "total": 11,
          "tec": 9,
          "usr": 2,
          "entropy": 0.5,
          "cfr": 0,
          "crash_free_delta": 0
        },
        "Jarvis / IA": {
          "total": 9,
          "tec": 8,
          "usr": 1,
          "entropy": 1.5,
          "cfr": 0,
          "crash_free_delta": 0
        },
        "Integrações Externas": {
          "total": 8,
          "tec": 7,
          "usr": 1,
          "entropy": 0,
          "cfr": 0,
          "crash_free_delta": 0
        },
        "Relatórios / SLA": {
          "total": 5,
          "tec": 1,
          "usr": 4,
          "entropy": 0,
          "cfr": 0,
          "crash_free_delta": 0
        },
        "Permissões / Roles": {
          "total": 5,
          "tec": 3,
          "usr": 2,
          "entropy": 0.8,
          "cfr": 0,
          "crash_free_delta": 0
        },
        "Configurações": {
          "total": 5,
          "tec": 1,
          "usr": 4,
          "entropy": 0,
          "cfr": 0,
          "crash_free_delta": 0
        }
      }
    },
    {
      "data": "2026-06-07",
      "modulos": {
        "Chat / Mensagens": {
          "total": 64,
          "tec": 33,
          "usr": 31,
          "entropy": 3,
          "cfr": 0.07,
          "crash_free_delta": -2.8
        },
        "Canais / WhatsApp": {
          "total": 30,
          "tec": 20,
          "usr": 10,
          "entropy": 1.8,
          "cfr": 0.2,
          "crash_free_delta": 0
        },
        "Distribuição / Filas": {
          "total": 27,
          "tec": 14,
          "usr": 13,
          "entropy": 0.5,
          "cfr": 0,
          "crash_free_delta": 0
        },
        "Autenticação": {
          "total": 25,
          "tec": 22,
          "usr": 3,
          "entropy": 0.5,
          "cfr": 0.2,
          "crash_free_delta": -1.8
        },
        "WebSocket / Presença": {
          "total": 13,
          "tec": 11,
          "usr": 2,
          "entropy": 0.8,
          "cfr": 0,
          "crash_free_delta": 0
        },
        "Contatos / Busca": {
          "total": 9,
          "tec": 6,
          "usr": 3,
          "entropy": 0.8,
          "cfr": 0.2,
          "crash_free_delta": 0
        },
        "Upload / Mídia": {
          "total": 9,
          "tec": 6,
          "usr": 3,
          "entropy": 0.8,
          "cfr": 0,
          "crash_free_delta": 0
        },
        "Integrações Externas": {
          "total": 9,
          "tec": 6,
          "usr": 3,
          "entropy": 0.5,
          "cfr": 0,
          "crash_free_delta": 0
        },
        "Jarvis / IA": {
          "total": 8,
          "tec": 7,
          "usr": 1,
          "entropy": 1.5,
          "cfr": 0,
          "crash_free_delta": 0
        },
        "Permissões / Roles": {
          "total": 4,
          "tec": 3,
          "usr": 1,
          "entropy": 0,
          "cfr": 0,
          "crash_free_delta": 0
        },
        "Configurações": {
          "total": 3,
          "tec": 2,
          "usr": 1,
          "entropy": 0,
          "cfr": 0,
          "crash_free_delta": 0
        }
      }
    },
    {
      "data": "2026-06-15",
      "modulos": {
        "Chat/Mensagens": {
          "total": 100,
          "tec": 11,
          "usr": 90,
          "bugs_n1": 100,
          "nivel": "CRÍTICO"
        },
        "Canais/WhatsApp": {
          "total": 66,
          "tec": 8,
          "usr": 58,
          "bugs_n1": 30,
          "nivel": "ALTO"
        },
        "Distribuição/Filas": {
          "total": 51,
          "tec": 5,
          "usr": 46,
          "bugs_n1": 22,
          "nivel": "ALTO"
        },
        "Chatbot/Bot": {
          "total": 48,
          "tec": 3,
          "usr": 45,
          "bugs_n1": 15,
          "nivel": "MÉDIO"
        },
        "Autenticação": {
          "total": 40,
          "tec": 6,
          "usr": 34,
          "bugs_n1": 12,
          "nivel": "MÉDIO"
        },
        "Disparos/Campanhas": {
          "total": 30,
          "tec": 2,
          "usr": 28,
          "bugs_n1": 3,
          "nivel": "MÉDIO"
        },
        "UI/Design System": {
          "total": 24,
          "tec": 4,
          "usr": 20,
          "bugs_n1": 7,
          "nivel": "ATENÇÃO"
        },
        "Upload/Mídia": {
          "total": 19,
          "tec": 1,
          "usr": 18,
          "bugs_n1": 6,
          "nivel": "ATENÇÃO"
        },
        "Jarvis/IA": {
          "total": 12,
          "tec": 4,
          "usr": 8,
          "bugs_n1": 0,
          "nivel": "ATENÇÃO"
        }
      }
    },
    {
      "data": "2026-06-22",
      "modulos": {
        "Chat / Mensagens": {
          "total": 733.6,
          "tec": 22,
          "usr": 711.6,
          "bugs_n1": 795,
          "nivel": "ALTO"
        },
        "Canais": {
          "total": 269.2,
          "tec": 20,
          "usr": 249.2,
          "bugs_n1": 217,
          "nivel": "ALTO"
        },
        "Jarvis / IA": {
          "total": 500.8,
          "tec": 17,
          "usr": 483.8,
          "bugs_n1": 538,
          "nivel": "ALTO"
        },
        "Contatos": {
          "total": 420.4,
          "tec": 0,
          "usr": 420.4,
          "bugs_n1": 736,
          "nivel": "ALTO"
        },
        "Distribuição / Filas": {
          "total": 149,
          "tec": 20,
          "usr": 129,
          "bugs_n1": 92,
          "nivel": "ALTO"
        },
        "Autenticação": {
          "total": 85.8,
          "tec": 37,
          "usr": 48.8,
          "bugs_n1": 22,
          "nivel": "ALTO"
        },
        "Upload / Mídia": {
          "total": 132.4,
          "tec": 4,
          "usr": 128.4,
          "bugs_n1": 90,
          "nivel": "ALTO"
        },
        "WebSocket / Presença": {
          "total": 17.6,
          "tec": 6,
          "usr": 11.6,
          "bugs_n1": 10,
          "nivel": "ALTO"
        },
        "Permissões / Roles": {
          "total": 90.2,
          "tec": 2,
          "usr": 88.2,
          "bugs_n1": 105,
          "nivel": "ALTO"
        },
        "Configurações": {
          "total": 274.2,
          "tec": 1,
          "usr": 273.2,
          "bugs_n1": 326,
          "nivel": "ALTO"
        },
        "Relatórios / SLA": {
          "total": 73.6,
          "tec": 0,
          "usr": 73.6,
          "bugs_n1": 52,
          "nivel": "ALTO"
        },
        "Integrações Externas": {
          "total": 33.4,
          "tec": 0,
          "usr": 33.4,
          "bugs_n1": 41,
          "nivel": "ALTO"
        },
        "Disparos / Campanhas": {
          "total": 50.8,
          "tec": 1,
          "usr": 49.8,
          "bugs_n1": 51,
          "nivel": "ALTO"
        }
      }
    },
    {
      "data": "2026-07-21",
      "modulos": {
        "Chat / Mensagens": {
          "total": 35.8,
          "tec": 22,
          "usr": 13.8,
          "bugs_n1": 301,
          "nivel": "ALTO"
        },
        "Canais": {
          "total": 29,
          "tec": 19,
          "usr": 10,
          "bugs_n1": 141,
          "nivel": "ALTO"
        },
        "Jarvis / IA": {
          "total": 22.3,
          "tec": 18,
          "usr": 4.3,
          "bugs_n1": 57,
          "nivel": "ALTO"
        },
        "Contatos": {
          "total": 10.3,
          "tec": 0,
          "usr": 10.3,
          "bugs_n1": 246,
          "nivel": "ALTO"
        },
        "Distribuição / Filas": {
          "total": 25.7,
          "tec": 17,
          "usr": 8.7,
          "bugs_n1": 57,
          "nivel": "ALTO"
        },
        "Autenticação": {
          "total": 38.8,
          "tec": 34,
          "usr": 4.8,
          "bugs_n1": 12,
          "nivel": "ALTO"
        },
        "Upload / Mídia": {
          "total": 6.1,
          "tec": 4,
          "usr": 2.1,
          "bugs_n1": 30,
          "nivel": "MÉDIO"
        },
        "WebSocket / Presença": {
          "total": 8.1,
          "tec": 5,
          "usr": 3.1,
          "bugs_n1": 21,
          "nivel": "MÉDIO"
        },
        "Permissões / Roles": {
          "total": 5.2,
          "tec": 2,
          "usr": 3.2,
          "bugs_n1": 58,
          "nivel": "ATENÇÃO"
        },
        "Configurações": {
          "total": 10.9,
          "tec": 1,
          "usr": 9.9,
          "bugs_n1": 152,
          "nivel": "ALTO"
        },
        "Relatórios / SLA": {
          "total": 5.7,
          "tec": 0,
          "usr": 5.7,
          "bugs_n1": 15,
          "nivel": "ATENÇÃO"
        },
        "Integrações Externas": {
          "total": 3.3,
          "tec": 0,
          "usr": 3.3,
          "bugs_n1": 26,
          "nivel": "ATENÇÃO"
        },
        "Disparos / Campanhas": {
          "total": 4,
          "tec": 1,
          "usr": 3,
          "bugs_n1": 41,
          "nivel": "ATENÇÃO"
        }
      }
    }
  ],
  "help": [
    "Indicadores de risco em tempo real baseados em dados do Jira, Sentry e GitHub.",
    "Quanto mais alto o score, maior a urgência de ação no módulo.",
    "O radar mostra a cobertura de desenvolvimento vs. a pressão dos bugs.",
    "Cada serviço é atribuído aos módulos com base em evidências (Sentry + KB + churn).",
    "O radar de serviços cruza bugs, dev ativo, planejado e risco técnico.",
    "Bombas são cenários de alto risco que podem escalar em produção.",
    "Sinais de qualidade medem bugs reabertos, PRs precipitados e cobertura QA.",
    "PRs com alta entropia (>3.5) ou que geraram bugs pós-merge.",
    "Timeline mostra a evolução do score dos módulos nas últimas semanas.",
    "Ações priorizadas por urgência: P0 (hoje), P1 (esta semana), P2 (próximo sprint).",
    "Tabela de chamados SM com filtros por tipo e módulo.",
    "Dicas de leitura do slide atual — o que cada gráfico e métrica significa."
  ],
  "helpGlobal": [
    {
      "title": "Como os scores são calculados",
      "body": "<p>O <strong>Score Total</strong> é a soma de dois eixos independentes:</p><ul><li><strong>Score Técnico:</strong> KB (áreas frágeis), Sentry (erros em produção), churn de código, entropia, DORA CFR, PRs precipitados, bugs reabertos e padrões de falha por ambiente.</li><li><strong>Score de Usuários:</strong> Tickets SM abertos (Bug=3pts, Solicitação=2pts, Dúvida=1pt), com decay por idade (×1.0 até 7d, ×0.8 até 30d, ×0.6 até 90d).</li></ul>"
    },
    {
      "title": "Fontes de dados",
      "body": "<p>Os dados são coletados automaticamente das seguintes fontes:</p><ul><li><strong>Jira SM:</strong> tickets de suporte N1 abertos nos últimos 14 dias.</li><li><strong>Jira DEV4:</strong> cards de desenvolvimento em backlog e em andamento.</li><li><strong>Sentry:</strong> erros de produção (7d e 14d) com delta semana a semana.</li><li><strong>GitHub:</strong> PRs mesclados, churn de código e entropia de mudanças.</li></ul>"
    },
    {
      "title": "Níveis de classificação",
      "body": "<ul><li>🔴 <strong>ALTO (≥10):</strong> risco crítico — ação imediata recomendada.</li><li>🟡 <strong>MÉDIO (6-9):</strong> risco relevante — monitorar de perto.</li><li>🟠 <strong>ATENÇÃO (3-5):</strong> sinal fraco — observar evolução.</li><li>🟢 <strong>ESTÁVEL (0-2):</strong> sem sinais de risco.</li></ul>"
    },
    {
      "title": "BOMBA_SCORE",
      "body": "<p>Além do score base, bônus são aplicados para gerar o <strong>BOMBA_SCORE</strong>: corretivo em dev (+5), feature em área instável (+4), tendência de alta (+3), alto impacto de usuários (+2), bug crônico (+2), sem corretivo (+3), regressão (+2), Sentry escalando (+2), impacto cross-serviço (+2).</p>"
    }
  ]
};
