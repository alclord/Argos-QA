# Argos Predict — Mapa de Risco Preditivo
> Gerado em: 22/06/2026, 13:45 | Projetos: SM, DEV4 | Janela: 14 dias
> Fontes: Jira Suporte (1743 N1 Aberto) · DEV4 (0 backlog + 17 em dev) · Sentry (81 issues) · GitHub (22 PRs merged)

## 📊 Sumário Executivo

| Indicador | Valor |
|---|---|
| 🟡 SM Aberto (N1) | 1743  |
| 🔴 Modulos Criticos | 13  |
| 🚨 Sentry Issues | 81  |
| 📊 PRs no periodo | 22  |
| 🔄 Bugs reabertos | 0  |
| 🌐 Incidentes externos | 0  |
| 🐛 Bugs sem corretivo | 4 modulos |

## 🗺️ Ranking de Risco

| # | Módulo | Score | Técnico | Usuários | Tendência | Zona | Δ Sentry |
|---|---|---|---|---|---|---|---|
| 1 | Chat / Mensagens | 733.6 | 22 | 711.6 | ↘️ | 🔴 | +35% |
| 2 | Jarvis / IA | 500.8 | 17 | 483.8 | ↘️ | 🔴 | +35% |
| 3 | Contatos | 420.4 | 0 | 420.4 | ↘️ | 🔴 | — |
| 4 | Configurações | 274.2 | 1 | 273.2 | ↘️ | 🔴 | — |
| 5 | Canais | 269.2 | 20 | 249.2 | ↘️ | 🔴 | +35% |
| 6 | Distribuição / Filas | 149 | 20 | 129 | → | 🔴 | +35% |
| 7 | Upload / Mídia | 132.4 | 4 | 128.4 | → | 🔴 | — |
| 8 | Permissões / Roles | 90.2 | 2 | 88.2 | → | 🔴 | — |
| 9 | Autenticação | 85.8 | 37 | 48.8 | → | 🔴 | +35% |
| 10 | Relatórios / SLA | 73.6 | 0 | 73.6 | ↘️ | 🔴 | — |
| 11 | Disparos / Campanhas | 50.8 | 1 | 49.8 | ↘️ | 🔴 | — |
| 12 | Integrações Externas | 33.4 | 0 | 33.4 | ↘️ | 🔴 | — |
| 13 | WebSocket / Presença | 17.6 | 6 | 11.6 | ↘️ | 🔴 | +35% |

## 💣 Top 3 Bombas

### 1. Chat / Mensagens (BOMBA_SCORE: 738.6)
**Por que é bomba:** Score 733.6 (22 tecnico + 711.6 usuarios). 795 tickets SM ativos.
**Gatilho:** Proximo deploy pode gerar regressao
**Ação:** Investigar sinais e priorizar correcoes.
**Sinais:** Alto impacto (3424 usuarios) · Sem corretivo planejado

### 2. Jarvis / IA (BOMBA_SCORE: 503.8)
**Por que é bomba:** Score 500.8 (17 tecnico + 483.8 usuarios). 538 tickets SM ativos.
**Gatilho:** Proximo deploy pode gerar regressao
**Ação:** Investigar sinais e priorizar correcoes.
**Sinais:** Sem corretivo planejado

### 3. Contatos (BOMBA_SCORE: 423.4)
**Por que é bomba:** Score 420.4 (0 tecnico + 420.4 usuarios). 736 tickets SM ativos.
**Gatilho:** Proximo deploy pode gerar regressao
**Ação:** Investigar sinais e priorizar correcoes.
**Sinais:** Sem corretivo planejado

## ✅ Ações Prioritárias

1. **P0 — HOJE** — 🔴 **Chat / Mensagens** — Investigar 795 tickets SM ativos e corrigir bugs pendentes. Consequência: degradação da experiência do usuário.
2. **P1 — ESTA SEMANA** — 🔴 **Jarvis / IA** — Investigar 538 tickets SM ativos e corrigir bugs pendentes. Consequência: degradação da experiência do usuário.
3. **P2 — PRÓX. SPRINT** — 🔴 **Contatos** — Investigar 736 tickets SM ativos e corrigir bugs pendentes. Consequência: degradação da experiência do usuário.

## 📋 Detalhamento por Módulo

### Chat / Mensagens

| Atributo | Valor |
|---|---|
| Tickets SM ativos | 795 |
| Sentry issues | 15 |
| Desenvolvedores ativos | 4 |
| Repo principal | Chat |

**Clusters de problema:**

| Urgencia | Sintoma | Servico | Qtd |
|---|---|---|---|
   | 🟡 | ErrorException | polichat-web-app | 8605990 |
   | 🟡 | Exception | polichat-web-app | 795454 |
   | 🟡 | ErrorException | polichat-web-app | 513705 |
   | 🟡 | Exception | polichat-web-app | 213571 |
   | 🟡 | GuzzleHttp\Exception\ClientException | polichat-web-app | 213532 |
   | 🟡 | App\CRM\Domain\Exceptions\CRMException | polichat-web-app | 84032 |
   | 🟡 | GuzzleHttp\Exception\ClientException | polichat-web-app | 82931 |
   | 🟡 | Exception | polichat-web-app | 61139 |
   | 🟡 | Illuminate\Database\QueryException | polichat-web-app | 41346 |
   | 🟡 | App\CRM\Domain\Exceptions\CRMException | polichat-web-app | 28727 |
   | 🟡 | GuzzleHttp\Exception\ClientException | polichat-web-app | 28240 |
   | 🟡 | Exception | polichat-web-app | 17578 |
   | 🟡 | Exception | polichat-web-app | 16254 |
   | 🟡 | GuzzleHttp\Exception\ClientException | polichat-web-app | 8465 |
   | 🟡 | App\CRM\Domain\Exceptions\CRMException | polichat-web-app | 8465 |


**Acao recomendada:** Investigar sinais e priorizar correcoes.

### Jarvis / IA

| Atributo | Valor |
|---|---|
| Tickets SM ativos | 538 |
| Sentry issues | 15 |
| Desenvolvedores ativos | 2 |
| Repo principal | Jarvis |

**Clusters de problema:**

| Urgencia | Sintoma | Servico | Qtd |
|---|---|---|---|
   | 🟡 | AttributeError | jarvis | 80400 |
   | 🟡 | Consecutive HTTP | jarvis | 39669 |
   | 🟡 | AttributeError | jarvis | 31072 |
   | 🟡 | Slow DB Query | jarvis | 14981 |
   | 🟡 | IntegrityError | jarvis | 6885 |
   | 🟡 | Exception | jarvis | 2945 |
   | 🟡 | Erro inesperado no modelo 'llama-3.1-8b-instant' | jarvis | 1699 |
   | 🟡 | BadRequest | jarvis | 1110 |
   | 🟡 | Failed to transcribe audio segment 0 | jarvis | 395 |
   | 🟡 | BadRequestError | jarvis | 368 |
   | 🟡 | TimeoutError | jarvis | 145 |
   | 🟡 | Erro inesperado no modelo 'openai/gpt-oss-120b' | jarvis | 77 |
   | 🟡 | ValueError | jarvis | 17 |
   | 🟡 | Erro inesperado no modelo 'llama-3.1-8b-instant' | jarvis | 9 |
   | 🟡 | Failed to transcribe audio segment 0 | jarvis | 5 |


**Acao recomendada:** Investigar sinais e priorizar correcoes.

### Contatos

| Atributo | Valor |
|---|---|
| Tickets SM ativos | 736 |
| Sentry issues | 0 |
| Desenvolvedores ativos | 1 |
| Repo principal | Contatos |



**Acao recomendada:** Investigar sinais e priorizar correcoes.

### Configurações

| Atributo | Valor |
|---|---|
| Tickets SM ativos | 326 |
| Sentry issues | 0 |
| Desenvolvedores ativos | 3 |
| Repo principal | Configurações |



**Acao recomendada:** Investigar sinais e priorizar correcoes.

### Canais

| Atributo | Valor |
|---|---|
| Tickets SM ativos | 217 |
| Sentry issues | 15 |
| Desenvolvedores ativos | 3 |
| Repo principal | Canais |

**Clusters de problema:**

| Urgencia | Sintoma | Servico | Qtd |
|---|---|---|---|
   | 🟡 | Error | channel-customer | 1131563 |
   | 🟡 | WabaProviderCloudAPIError | channel-customer | 10915 |
   | 🟡 | ReferenceError | channel-customer | 2729 |
   | 🟡 | ReferenceError | channel-customer | 1630 |
   | 🟡 | Error | channel-customer | 741 |
   | 🟡 | Error | channel-customer | 709 |
   | 🟡 | WabaProviderCloudAPIError | channel-customer | 435 |
   | 🟡 | WabaProviderError | channel-customer | 148 |
   | 🟡 | Error | channel-customer | 122 |
   | 🟡 | WabaProviderCloudAPIError | channel-customer | 120 |
   | 🟡 | TypeError | channel-customer | 102 |
   | 🟡 | Error | channel-customer | 84 |
   | 🟡 | Error | channel-customer | 62 |
   | 🟡 | MongoError | channel-customer | 7 |
   | 🟡 | TemplateError | channel-customer | 4 |


**Acao recomendada:** Investigar sinais e priorizar correcoes.

## ⚡ PRs com Maior Risco de Regressão

| Repo | PR | Entropia | Churn | Arquivos |
|---|---|---|---|---|
| SPA | #1542 | 5 | 4125 | 50 |
| SPA | #1536 | 4.3 | 521 | 50 |
| SPA | #1543 | 4.6 | 3094 | 34 |
| SPA | #1544 | 4.7 | 3156 | 41 |
| SPA | #1533 | 2.5 | 489 | 14 |

---
📄 Relatório completo: tests/reports/argos-predict-2026-06-22.md