# Argos Predict — Mapa de Risco Preditivo
> Gerado em: 2026-06-09 11:08 | Projetos: SM, DEV4 | Janela: 14 dias
> Fontes: Jira Suporte (1000 N1 Aberto) · DEV4 (26 cards) · Sentry (100 issues) · GitHub (25 PRs merged)
> Novos sinais: Bug Reopen Rate · Review Cycle Time · Deploy Frequency · Cross-Service Impact · Sentry Δ · Scenario Staleness · Env Failure Pattern

## 📊 Sumário Executivo

| Indicador | Valor |
|---|---|
| 🟡 SM Aberto (N1) | 1000 tickets |
| 🛠️ DEV4 em backlog/ready | 23 cards |
| ⚡ DEV4 em desenvolvimento ativo | 3 cards |
| 🔧 Corretivos em dev | 2 |
| ⚠️ Features em área instável em dev | 1 |
| ↗️ Módulos com tendência crescente | 3 |
| 📊 Maior churn | Chat / Mensagens (3245 linhas) |
| 🔄 Bugs reabertos (regressões) | 0 no período |
| 📈 Sentry Δ > 50% | 2 módulos escalando |
| 🏃 PRs Precipitados (< 2h, > 10 arq.) | 1 no período |
| 🧪 Cenários desatualizados | 1 módulos afetados |
| 🌐 Falha ambiente-específica | 1 módulos |

## 🗺️ Ranking de Risco

| # | Módulo | Score | Técnico | Usuários | Tendência | Zona | Δ Sentry |
|---|---|---|---|---|---|---|---|
| 1 | Chat / Mensagens | 104 | 8 | 96 | ↗️ | 🔴 | +35% |
| 2 | Jarvis / IA | 92 | 5 | 87 | ↗️ | 🔴 | +100% |
| 3 | Configurações | 71 | 2 | 69 | → | 🔴 | — |
| 4 | Contatos | 45 | 0 | 45 | ↗️ | 🔴 | — |
| 5 | Distribuição / Filas | 26 | 8 | 18 | → | 🔴 | +25% |
| 6 | Canais | 22 | 7 | 15 | → | 🔴 | +50% |
| 7 | Permissões / Roles | 19 | 1 | 18 | → | 🔴 | — |
| 8 | WebSocket / Presença | 9 | 0 | 9 | → | 🟡 | — |
| 9 | Upload / Mídia | 5 | 5 | 0 | → | 🟠 | — |
| 10 | Autenticação | 2 | 2 | 0 | → | 🟢 | — |

## 💣 Top 3 Bombas

### 1. Chat / Mensagens (BOMBA_SCORE: 104)
**Por que é bomba:** Maior churn do período (3245 linhas em 77 arquivos) + 32 bugs abertos no suporte N1. Módulo central do produto com alta complexidade e múltiplos serviços envolvidos (polichat-web-app, foundation-api, SPA).
**Gatilho:** Próximo deploy com mudanças em message-process ou chat-assignment pode gerar regressão em cascata.
**Ação:** Priorizar code review rigoroso nos PRs de Chat, adicionar testes de integração cross-serviço, e investigar os 32 bugs abertos para identificar padrões.

### 2. Jarvis / IA (BOMBA_SCORE: 92)
**Por que é bomba:** 29 bugs abertos no suporte + 1554 linhas de churn em 51 arquivos. Módulo de IA com alta taxa de erro no Sentry (3 issues novos, +100% vs semana anterior).
**Gatilho:** Nova release do modelo LLM ou mudança na API de transcrição pode quebrar fluxos de atendimento automatizado.
**Ação:** Revisar testes de integração com LLM, adicionar fallback para quando IA falhar, e investigar spike de erros no Sentry.

### 3. Configurações (BOMBA_SCORE: 71)
**Por que é bomba:** 23 bugs abertos no suporte + 1514 linhas de churn em 33 arquivos. Módulo crítico para multi-tenancy com regras de negócio complexas (account_id filter obrigatório).
**Gatilho:** Mudança em settings ou feature flags pode afetar múltiplas accounts simultaneamente.
**Ação:** Adicionar testes de multi-tenancy, revisar queries para garantir account_id filter, e validar feature flags em staging antes de produção.

## ✅ Ações Prioritárias

1. 🔴 **Chat / Mensagens** — Investigar os 32 bugs abertos e adicionar testes de integração cross-serviço. Consequência: regressão em cascata no próximo deploy.
2. 🔴 **Jarvis / IA** — Investigar spike de erros no Sentry (+100%) e adicionar fallback para quando IA falhar. Consequência: atendimento automatizado quebrado.
3. 🔴 **Configurações** — Revisar queries para garantir account_id filter e validar feature flags. Consequência: vazamento de dados entre accounts.

⚠️ Sentry configurado — análise com erros reais de produção disponível.

📄 Relatório completo: tests/reports/argos-predict-2026-06-09.md
