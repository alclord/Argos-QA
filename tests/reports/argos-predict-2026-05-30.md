# Argos Predict — Mapa de Risco Preditivo
> Gerado em: 2026-05-30T20:30:00Z | Projetos: SM + DEV4 | Janela: 14 dias
> Fontes: Jira Suporte (100 N1 + 52 N2) + Jira Produto (36 backlog + 6 em dev) + Sentry (30 issues) + GitHub Churn (47 PRs)

## Sumário Executivo

| Indicador | Valor |
|---|---|
| SM Em Triagem (N2) | 52 tickets |
| SM Aberto (N1) | 100 tickets (54 bugs) |
| DEV4 em backlog/ready | 36 cards |
| DEV4 em desenvolvimento ativo | 6 cards |
| Corretivos em dev | 1 (DEV4-4078) |
| Features em área instável | 2 (DEV4-4044, DEV4-4229) |
| Módulos negligenciados | 6 (Distribuição, CRM, Canais, Contatos, Permissões, Upload) |
| Módulo maior churn | Chat/Mensagens (5.366 linhas, 7 autores, 188 commits) |

## Módulos em Risco

### 🔴 ALTO — Chat / Mensagens (pontuação: 47)
- SM N2: 2 bugs (atraso 20-30min, mensagens não aparecem)
- SM N1: 5 bugs (não entrega, não envia, instabilidade)
- Sentry: 401 /scheduled-messages 3270 usuários + MessageSenderException 762 usuários
- ENABLE_ACK_LOG ausente: 439.809 erros em meta-whatsapp-cloud-api
- Corretivo ativo: DEV4-4078 (ícone relógio permanente)
- ⚠️ ATENÇÃO: 401 omnispa /scheduled-messages pode ser regressão de DEV4-4229

### 🔴 ALTO — Distribuição / Filas (pontuação: 38)
- SM N2: 7 bugs confirmados (chats sem atendente, bot não distribui)
- SM N1: 4 bugs recentes (SM-7855 menciona deploy de 13/05)
- Sentry: dispatch errors 2.600+2.160
- ZERO card DEV4 corretivo ativo
- ⚠️ Backlog crônico: ~40 dias de bugs N2 sem resolução

### 🔴 ALTO — Integrações CRM (pontuação: 28)
- Sentry: 17.7K+10.9K CRM 401 + 16.4K duplicatas + 5.3K polichat-web-app
- ZERO card DEV4 corretivo

### 🔴 ALTO — Canais / WhatsApp (pontuação: 26)
- SM N2: 3 bugs (template, ACK @lid, canal específico)
- SM N1: 2 bugs (Instagram leads perdidos, template)
- Sentry: FacebookWebHook 12.120×/706 users (leads Instagram perdidos silenciosamente)
- 4 HUs PLBV em dev ativo sobre área instável

### 🟡 MÉDIO — Busca / Contatos (pontuação: 14)
### 🟡 MÉDIO — Permissões / Roles — ⚠️ SM-3211 SEGURANÇA (pontuação: 12)
### 🟠 ATENÇÃO — Upload / Mídia (pontuação: 8)
### 🟠 ATENÇÃO — WebSocket / Presença (pontuação: 7)

## Top 3 Bombas

1. Chat/Mensagens (BOMBA_SCORE 59): 401 agendamentos + DEV4-4078 incompleto
2. Distribuição/Filas (BOMBA_SCORE 44): 7 N2 sem corretivo, deploy 13/05 piorou
3. Canais/WhatsApp (BOMBA_SCORE 33): PLBV sobre webhook instável

## Ações

1. P0: Investigar 401 omnispa /scheduled-messages (3.270 usuários)
2. P0: Escalar SM-3211 (privacidade, 60 dias sem fix)
3. P0: Criar card DEV4 Distribuição/Filas — investigar deploy 13/05
4. P1: Card DEV4 CRM token refresh (44K+ erros/14dias)
5. P1: Card DEV4 FacebookWebHook (12K× + 706 usuários leads Instagram)
6. P1: Fixar ENABLE_ACK_LOG no meta-whatsapp-cloud-api (DevOps)
7. P2: Fix player áudio web (SM-5880 + SM-7816)
8. P2: Investigar reindexação Elasticsearch para busca de contatos
