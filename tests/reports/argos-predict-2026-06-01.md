# Argos Predict — Mapa de Risco Preditivo
> Gerado em: 2026-06-01T15:00:00Z | Projetos: SM + DEV4 | Janela: 14 dias
> Fontes: Jira Suporte (N1 Aberto) + Jira Produto + KB + Sentry (+ Δ semana a semana) + GitHub (29 PRs)
> Sinais: Bug Reopen Rate · Review Cycle Time · Deploy Frequency · Cross-Service Impact · Sentry Δ · Env Failure Pattern
> ⚠️ Tickets "Em Triagem" excluídos do scoring — dados não atualizados desde início de maio

---

## Sumário Executivo

| Indicador | Valor |
|---|---|
| SM Aberto (N1) | 100 tickets (17 Bugs · 18 Sol. · 15 Dúvidas · 50 Tarefas) |
| DEV4 em desenvolvimento ativo | 5 cards |
| Corretivos em dev | 0 |
| Features em área instável | 2 (DEV4-4044, DEV4-4024) |
| Módulos com tendência crescente | 1 (Chat/Mensagens — 7 N1 novos em 2 dias) |
| Maior churn | SPA (13 merges) + FoundationAPI (12 merges) |
| Bugs reabertos | 0 |
| Sentry Δ > 50% | 2 módulos (Chat +211K%, Distribuição +549%) |
| PRs Precipitados | 1 potencial (heimdall #58) |
| Falha ambiente-específica | 1 módulo (Chat: staging 0.45 vs canary 0.12) |

---

## 🔴 ALTO — Chat / Mensagens (Score: 41)

**Score TEC: 15 | Score USR: 26** | Tendência: ↗️ crescendo

**TEC:** KB(+3) + Sentry cluster(+5) + Sentry Δ(+2) + Churn(+2) + Cross-serviço(+1) + Env Failure(+1) + Deploy(+1)

**USR:** 7 N1 Bugs × 3 × ×1.0 = 21 + Sentry users(+4) + Sentry Δ USR(+1)

**N1 Bugs ativos (todos ≤ 3 dias):**
- SM-7910: Clientes sem atendimento não aparecem na nova interface (0d)
- SM-7900: Erro na plataforma sem resolução após quase 2 semanas (0d)
- SM-7887: Mensagens sumindo na fila de chats (2d)
- SM-7867: Mensagem não chega na plataforma (2d)
- SM-7859: Instabilidade no envio de mensagens (2d)
- SM-7848: Mensagens não são enviadas para alguns usuários (2d)
- SM-7849: Poli fecha abas automaticamente ao abrir múltiplas (2d)

**Sentry:** AxiosError 404 (1.278 usuários, +211K%), TypeError hoje (41 usuários), Error No message (86 usuários)

**Env Failure:** staging 0.45 vs canary 0.12 (Δ = 0.33 — environment_specific = TRUE)

**Ação:** Investigar AxiosError 404 omnispa (P0). Investigar 4 TypeError novos hoje (P0).

---

## 🔴 ALTO — Distribuição / Filas (Score: 28)

**Score TEC: 9 | Score USR: 19** | Tendência: → estável

**N1 Bugs ativos (todos 0-2 dias):**
- SM-7923: Conversas WhatsApp ficando sem resposta e sem direcionamento (0d)
- SM-7917: Mensagens não sendo distribuídas para alguns contatos (0d)
- SM-7890: Mensagens de disparo presas com atendente mesmo offline (2d)
- SM-7872: Mensagens não entram na Poli ao ativar novo bot (2d)
- SM-7856: Bot não redirecionando chats automaticamente (2d)
- SM-7855: Mensagens ficando sem atendente atribuído (2d)

**Sentry:** automatic-actions +549%, dispatch 3 clusters ativos

**Ação:** Criar card DEV4 para o cluster de bots que parou de distribuir. Investigar automatic-actions escalando (sinal oculto).

---

## 🟡 MÉDIO — Canais / WhatsApp (Score: 18)

**Score TEC: 9 | Score USR: 9** | Tendência: → estável

**N1 Bugs:**
- SM-7912: Erro de connection channel no chat-hub (0d)
- SM-7841: Colaboradora não consegue enviar template (2d)

**Risco principal:** DEV4-4044 (PLBV Meta) em dev sobre área com erros de canal ativos.

---

## 🟡 MÉDIO — Contatos / Busca (Score: 10)

**Score TEC: 4 | Score USR: 6** | Tendência: → estável

**N1 Bugs:**
- SM-7846: Dificuldade em localizar contatos na plataforma (2d)
- SM-7833: Busca de contatos não retorna resultados (2d)

---

## 🟡 MÉDIO — WebSocket / Presença (Score: 8)

**Score TEC: 6 | Score USR: 2** | Tendência: → estável

Sentry: Maximum update depth exceeded (6 usuários, NOVO 30/05)

---

## 🟡 MÉDIO — Integrações Externas (Score: 6)

**Score TEC: 4 | Score USR: 2** | Tendência: ↘️ melhorando

Sentry: revendedor-api 403 (180 usuários, -18% semana a semana)

---

## 🟠 ATENÇÃO — Jarvis / IA (Score: 4)

Sentry: jarvis errors (0 usuários). Nenhum N1 ativo.

---

## 🟠 ATENÇÃO — Upload / Mídia (Score: 5)

KB: bug PDF > 10MB documentado. Sentry: tempstorage 404 (12 usuários, NOVO).

---

## 💣 Top 3 Bombas

### 1. Chat / Mensagens (BOMBA_SCORE: 52)
41 + TREND↗️(+3) + Sentry>100u(+2) + erros sem corretivo(+3) + SentryΔ>50%(+2) + env_failure(+1)

**Por que é bomba:** AxiosError 404 impacta 1.278 usuários no Sentry e 7 novos tickets N1 abriram em 2 dias — tendência crescente sem nenhum card corretivo. O ambiente staging tem 3,75× mais falhas que canary.

**Gatilho:** Qualquer deploy no omnispa/foundation-spa sem investigar o AxiosError 404.

**Ação:** Criar DEV4 corretivo P0 para o AxiosError 404. Investigar 4 TypeError novos de hoje.

### 2. Distribuição / Filas (BOMBA_SCORE: 33)
28 + SentryΔ>50%(+2) + erros sem corretivo(+3)

**Por que é bomba:** 6 N1 bugs frescos de bots e distribuição sem nenhum corretivo. automatic-actions escalando +549% silenciosamente.

**Gatilho:** Volume de atendimento acima do normal expõe os 6 bugs simultaneamente.

**Ação:** Criar card DEV4 para o cluster de bots. Investigar automatic-actions +549%.

### 3. Canais / WhatsApp (BOMBA_SCORE: 25)
18 + feature instável(+4) + erros sem corretivo(+3)

**Por que é bomba:** DEV4-4044 (PLBV Meta) em dev sobre área com erros de canal/entrega.

**Gatilho:** Merge de DEV4-4044 sem resolver SM-7912 (connection channel).

**Ação:** Bloquear merge de DEV4-4044 até investigar SM-7912.

---

## Mapa de Calor

| Módulo | Pressão Clientes | Atenção Dev | Gap | Zona |
|---|---|---|---|---|
| Chat / Mensagens | 26 | 0 | -26 | 🔴 Negligenciada |
| Distribuição / Filas | 19 | 0 | -19 | 🔴 Negligenciada |
| Canais / WhatsApp | 9 | 2 | -7 | 🔴 Negligenciada |
| Contatos / Busca | 6 | 0 | -6 | 🔴 Negligenciada |
| WebSocket / Presença | 2 | 0 | -2 | 🟢 Balanceada |
| PLBV / Meta | 0 | 4 | +4 | 🔵 Sobre-investida |

---

## Qualidade do Processo

| Sinal | Valor |
|---|---|
| 🔄 Bugs Reabertos | 0 |
| 🏃 PRs Precipitados | 1 (heimdall #58, 0.3h) |
| 📈 Sentry Escalando (Δ>50%) | 2 módulos |
| 🌐 Falha Env-Específica | 1 (Chat: staging 0.45 vs canary 0.12) |
| ⏱️ Resolução Lenta | 0 |

---

## Ações Prioritárias

1. 🔴 **P0 — HOJE:** Investigar AxiosError 404 omnispa (1.278 usuários) — criar DEV4 corretivo.
2. 🔴 **P0 — HOJE:** Investigar 4 TypeError 'plugin' novos hoje (01/06) — possível regressão.
3. 🔴 **P0 — HOJE:** Bloquear merge de DEV4-4044 (PLBV) até investigar SM-7912 (connection channel).
4. 🔴 **P1 — ESTA SEMANA:** Criar card DEV4 para 6 N1 bugs de bots/distribuição. Investigar automatic-actions +549%.
5. 🟡 **P2 — PRÓX. SPRINT:** Investigar divergência de falhas staging vs canary em Chat/Mensagens.

---

## Delta vs Relatório Anterior

| Módulo | Ontem | Hoje | Delta | Motivo |
|---|---|---|---|---|
| Chat / Mensagens | 69 | 41 | -28 | Remoção de 15 N2 stale — dado mais preciso |
| Distribuição / Filas | 52 | 28 | -24 | Remoção de 13 N2 stale |
| Canais / WhatsApp | 33 | 18 | -15 | Remoção de 7 N2 stale |
| Contatos / Busca | 13 | 10 | -3 | Sem N2 |
| Integrações Externas | 9 | 6 | -3 | Melhora Sentry (-18%) |

**Nota:** A queda nos scores reflete a pureza do dado — não piora real. N1 ativos são mais confiáveis que N2 parados há meses.

---

## Módulos Estáveis

Autenticação · Relatórios/SLA · Configurações · Multi-tenância · Permissões/Roles
