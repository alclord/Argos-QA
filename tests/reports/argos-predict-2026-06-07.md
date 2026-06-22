# 🔮 Argos Predict — Relatório de Risco
**Gerado em:** 07 de Junho de 2026 · Janela: 14 dias (24/05 a 07/06)
**Fontes:** Jira Suporte (100 N1 Aberto) · DEV4 (22 backlog + 0 em dev) · Sentry (100 issues · 4 ESCALATING/NEW) · GitHub (28+ PRs) · KB (5 arquivos) · execucoes.jsonl

---

## 🚨 Resumo Executivo

**5 módulos em zona ALTO** · omnispa AxiosError 401 ESCALANDO (496 usuários) · Hermes SQS errors NOVO (pós-merge DEV4-4262) · ZERO cards em desenvolvimento ativo · Release omnispa 06-06 gerou 16 novos grupos de erro Sentry

**Alerta de processo:** Suspect commit confirmado. SPA:1509 (Dev4-4278 "fix phone max length", merged 06-03 22:22) correlaciona temporalmente com omnispa AxiosError 401 ESCALATING (iniciou 06-03 22:28 — 6 minutos após merge). Rollback ou hotfix urgente.

**Módulos Negligenciados:** Distribuição/Filas (HEAT=13, DEV_ATTENTION=0) e Autenticação (HEAT=3, DEV_ATTENTION=0) — nenhum corretivo em backlog ou dev ativo para os problemas ativos.

---

## 📊 Ranking de Risco

| # | Módulo | TOTAL | TEC | USR | Nível | Δ semana |
|---|--------|------:|----:|----:|-------|:--------:|
| 1 | Chat / Mensagens | **64** | 33 | 31 | 🔴 ALTO | +2 ↑ |
| 2 | Canais / WhatsApp | **30** | 20 | 10 | 🔴 ALTO | -7 ↓ |
| 3 | Distribuição / Filas | **27** | 14 | 13 | 🔴 ALTO | -11 ↓ |
| 4 | Autenticação | **25** | 22 | 3 | 🔴 ALTO | +5 ↑ |
| 5 | WebSocket / Presença | **13** | 11 | 2 | 🔴 ALTO | +2 ↑ |
| 6 | Contatos / Busca | **9** | 6 | 3 | 🟡 MÉDIO | -10 ↓ |
| 6 | Upload / Mídia | **9** | 6 | 3 | 🟡 MÉDIO | -3 ↓ |
| 6 | Integrações Externas | **9** | 6 | 3 | 🟡 MÉDIO | +1 ↑ |
| 9 | Jarvis / IA | **8** | 7 | 1 | 🟡 MÉDIO | -1 → |
| 10 | Permissões / Roles | **4** | 3 | 1 | 🟠 ATENÇÃO | → |
| 11 | Configurações | **3** | 2 | 1 | 🟠 ATENÇÃO | → |

> **Zonas:** 🔴 ALTO ≥ 10 · 🟡 MÉDIO 6-9 · 🟠 ATENÇÃO 3-5 · 🟢 ESTÁVEL 0-2

---

## 🔴 Módulos ALTO — Análise Detalhada

### 1. Chat / Mensagens — Score 64 (↑+2 vs semana anterior)

**SCORE_TEC = 33**

| Sinal | Pontuação | Detalhe |
|-------|:---------:|---------|
| Sentry (3 projetos ativos) | +9 | omnispa · polichat-spa · foundationapi |
| Sentry delta/escalating | +5 | omnispa NEW (AxiosError 401 +100%, Uncompressed Asset +100%) |
| KB: áreas frágeis documentadas | +5 | Encoder conflict (polichat-spa) · Race condition chat lifecycle |
| Code churn (SPA 15 PRs + FoundationAPI 13 PRs) | +3 | >500 linhas, 5 autores distintos, entropia Shannon = 3.0 |
| Release Health degradada | +2 | omnispa release 06-06 → 16 novos grupos (anterior: 1) |
| Sentry usuários > 100 (polichat-spa encoder 1.312u) | +1 | Crônico não resolvido |
| Env failure (staging 43% vs canary 14%) | +1 | DEV4-4261 staging=0.43, canary=0.14 → environment_specific=true |
| Suspect commit confirmado (SPA:1509) | +1 | 6 min entre merge e primeiro Sentry 401 |
| Cross-service (foundation-api ×1.3) | +1 | SPA depende de FoundationAPI |
| Entropy > 2.5 | +1 | FoundationAPI PR#1102 (EventBus, 454h review, 45 arquivos) |
| Deploy freq ≥ 5 PRs | +1 | SPA=15, FoundationAPI=13 |
| Deploy freq ≥ 10 PRs | +2 | Ambos acima do threshold |
| Staleness cenários | +1 | DEV4-4290 (mensagens não lidas) |

**SCORE_USR = 31** · 9 Bugs N1 ativos · Pressão USER acima da semana anterior

**Top Bugs:**
- `SM-8315` · Bug · Mensagens de clientes não aparecem até atendente enviar algo (06-06)
- `SM-8313` · Bug · Mensagens não estão sendo recebidas nem enviadas (06-06)
- `SM-8291` · Bug · Conversa muda de cliente automaticamente durante digitação (06-05)
- `SM-8277` · Bug · Plataforma travou — usuários não conseguiam acessar (06-05)
- `SM-8230` · Bug · Chat travado, não mostra mensagens antigas (06-05)

**Sentry Escalating:**
- `100474` omnispa AxiosError 401 · 496 usuários · **ESCALATING** (iniciou 06-03 22:28, suspect: SPA:1509)
- `100483` omnispa Uncompressed Asset · 629 usuários · **NEW** (iniciou 06-05)
- `100502/100501` omnispa Network Error ×2 · 47 usuários · **NEW** (iniciou 06-06)
- `67500` polichat-spa encoder conflict · 1.312 usuários · crônico não resolvido

**Ação imediata:** Rollback SPA:1509 (Dev4-4278) ou hotfix urgente. Investigar Hermes SQS (DEV4-4262). Criar DEV4 corretivo para encoder conflict crônico.

---

### 2. Canais / WhatsApp — Score 30 (↓-7 vs semana anterior)

**SCORE_TEC = 20**

| Sinal | Pontuação | Detalhe |
|-------|:---------:|---------|
| KB: WABA 24h rule (área frágil documentada) | +5 | Janela 24h — regra frequentemente violada |
| Sentry (meta-whatsapp-cloud-api + polichat-web-app) | +5 | ENABLE_ACK_LOG 449k oc. · CRM errors novos 06-07 |
| Code churn (waba-webhook 2 PRs + meta-biz) | +3 | Entropia 1.8 |
| DORA CFR 15-30% | +1 | Canais: 1 bug pós-merge / ~5 PRs no período |
| Staleness cenários (DEV4-4274, 2 dias stale) | +1 | Jira updated 06-05, cenário gerado 06-03 |

**SCORE_USR = 10** · 2 Bugs N1 ativos · Pressão USR menor (tickets antigos saíram da janela 14d)

**Top Bugs:**
- `SM-8228` · Bug · Conta restrita pela Meta — erro ao enviar mensagens (06-05)
- `SM-8219` · Bug · Chat não libera mesmo com resposta do cliente dentro de 24h (06-04)

**Ação:** Resolver conta Meta restrita (SM-8228). Investigar WABA 24h rule violation. Configurar ENABLE_ACK_LOG no meta-whatsapp-cloud-api.

---

### 3. Distribuição / Filas — Score 27 (↓-11 vs semana anterior)

> **Nota:** Queda no score total (-11) reflete tickets antigos saindo da janela de 14 dias, NÃO uma melhoria real. O padrão de bugs (3 N1 ativos) e ZERO atenção dev torna este módulo **Negligenciado** e candidato a bomba latente.

**SCORE_TEC = 14**

| Sinal | Pontuação | Detalhe |
|-------|:---------:|---------|
| KB: race condition LID generation Redis lock | +5 | Documentado como área frágil crítica |
| Sentry: dispatch "Chat created" 1.935 oc. (ongoing) | +4 | 1 projeto, count > 10 |
| Cross-service (dispatch-service ×1.5) | +2 | Centraliza toda distribuição de chats |
| Code churn (polichat-web-app PR#299 toca dispatch) | +1 | Fix JID grupos toca lógica de distribuição |
| HEAT=13, DEV=0 → Negligenciado | +2 | Módulo crítico sem nenhum corretivo planejado |

**SCORE_USR = 13** · 3 Bugs N1 ativos — todos abertos em 06-05

**Top Bugs:**
- `SM-8292` · Bug · Mensagens de clientes ficam presas após disparo
- `SM-8288` · Bug · Chat ficou preso na fila e não distribuído
- `SM-8243` · Bug · Chat distribuído para atendente que não está na operação

**Ação:** Criar DEV4 corretivo para lógica de verificação de presença do atendente. Investigar Redis lock pattern no dispatch-service para os 3 bugs ativos.

---

### 4. Autenticação — Score 25 (↑+5 vs semana anterior)

> **Principal driver da alta:** omnispa AxiosError 401 ESCALATING. Heimdall (×2.0 cross-service) amplifica o impacto.

**SCORE_TEC = 22**

| Sinal | Pontuação | Detalhe |
|-------|:---------:|---------|
| Sentry (3 projetos: omnispa ESCALATING + polichat-spa + foundationapi) | +9 | 3 projetos independentes com erros 401 |
| Sentry delta > 50% (omnispa NEW +100%) | +2 | Issue novo, vetor de escalada |
| Sentry firstSeen < 7d (omnispa 401) | +1 | Sinal novo confirmado |
| Sentry count > 100 (polichat-spa 863u + omnispa 496u) | +2 | 2 issues com >100 usuários afetados |
| KB: heimdall = ponto único (×2.0) | +3 | Falha aqui = 100% usuários afetados |
| Cross-service (heimdall ×2.0) | +2 | Maior peso no sistema |
| DORA CFR: SPA:1509 → AxiosError 401 | +1 | CFR hit confirmado |
| Suspect commit (SPA:1509) | +1 | 6 min entre merge e Sentry 401 |
| DEV_ATTENTION = 0 | +1 | Nenhum card de correção planejado |

**SCORE_USR = 3** · 0 Bugs N1 de autenticação (dúvidas de senha contabilizadas) · Pressão USR baixa mas TEC crítico

**Ação:** HOJE — Rollback SPA:1509 ou hotfix. Criar card DEV4 de corretivo. Monitorar heimdall para rejeição de tokens.

---

### 5. WebSocket / Presença — Score 13 (↑+2 vs semana anterior)

> **Principal driver:** FoundationAPI PR#1102 (DEV4-4262 Hermes-inbound EventBus, merged 06-03) → SQS connection errors apareceram em 06-05.

**SCORE_TEC = 11**

| Sinal | Pontuação | Detalhe |
|-------|:---------:|---------|
| Sentry: foundationapi SQS event-bus-sqs NEW (06-05) | +4 | NOVO pós-merge DEV4-4262, 1.160 oc. |
| Sentry: foundationapi MaxAttemptsExceededException | +3 | Ongoing — queue legacy ainda com problemas |
| Code churn: FoundationAPI PR#1102 (45 arquivos, 454h review) | +3 | PR de alto risco, entropia 3.5 |
| DORA CFR: PR#1102 → SQS errors (2 dias de latência) | +1 | Regressão confirmada com 48h latência |

**SCORE_USR = 2** · Pressão USR baixa (sem tickets N1 diretos) · Risco técnico oculto (perda silenciosa de mensagens)

**Ação:** Verificar se mensagens estão sendo perdidas com SQS errors. Rollback DEV4-4262 se confirmado. Configurar DLQ (Dead Letter Queue) para capturar mensagens perdidas.

---

## 💣 Top 3 Bombas

### 💣 #1 — Chat / Mensagens (BOMBA_SCORE: 75)
**Problema:** 9 bugs N1 + omnispa ESCALATING (3 issues novos) + 28 PRs no período com suspect commit confirmado. Release 06-06 criou 16 novos grupos de erro. Zero corretivos em dev.
**Gatilho:** Novo deploy SPA/FoundationAPI sem resolver AxiosError 401 e Hermes SQS → clientes perdem acesso ao chat.
**Ação P0:** Rollback SPA:1509 ou hotfix. Investigar Hermes SQS. Criar DEV4 corretivo para bugs N1.

### 💣 #2 — Distribuição / Filas (BOMBA_SCORE: 33)
**Problema:** 3 bugs N1 (chats presos, distribuição incorreta) com ZERO atenção dev. Race condition Redis lock documentado na KB, sem nenhum card de correção.
**Gatilho:** Pico de volume ou deploy no dispatch-service sem fix → paralisia de atendimento.
**Ação P0:** Criar DEV4 corretivo para lógica de verificação de presença. Prioridade: Alta.

### 💣 #3 — Autenticação (BOMBA_SCORE: 32)
**Problema:** omnispa AxiosError 401 ESCALATING (496u), suspect commit identificado, heimdall ×2.0. Zero corretivo planejado.
**Gatilho:** Continuação do ESCALATING sem rollback → mais usuários perdem acesso.
**Ação P0:** HOJE: Rollback SPA:1509 ou hotfix urgente. Criar DEV4 corretivo.

---

## 🔥 PRs de Alto Risco

| PR | Repo | Título | Merged | Entropy | CFR | Status |
|----|------|--------|--------|:-------:|:---:|--------|
| #1509 | SPA | Dev4-4278 fix phone max length | 06-03 | 1.5 | ✅ SIM | **SUSPECT** → omnispa 401 |
| #1102 | FoundationAPI | DEV4-4262 Hermes-inbound EventBus | 06-03 | 3.5 | ✅ SIM | **SUSPECT** → SQS errors |
| #1506 | SPA | DEV4-4248 Reformular sidebar shadcn | 06-05 | 3.2 | - | Alto risco (3.5k linhas, 60 arquivos) |
| #1112 | FoundationAPI | DEV4-4190 Laravel upgrade | 05-25 | 2.8 | - | Monitorar |

---

## 🗓️ Cards Resolvidos no Período (✅ Vitórias)

| Card | Módulo | Resolução | Observação |
|------|--------|-----------|------------|
| DEV4-4338 | Contatos / Busca | 2026-06-05 | Pesquisa contato no chat — filtro corrigido |
| DEV4-4286 | Chat / Mensagens | 2026-06-05 | Refatoração painel lateral (casca responsiva) |
| DEV4-4248 | Chat / Mensagens | 2026-06-05 | Nova sidebar shadcn — aprovado em QA |
| DEV4-4180 | Configurações | 2026-06-06 | Tela de Configurações Gerais (nova interface) |

---

## 🌡️ Mapa de Calor (Pressão USR × Atenção Dev)

| Módulo | HEAT (USR) | DEV_ATTENTION | GAP | Classificação |
|--------|:----------:|:-------------:|:---:|---------------|
| Chat / Mensagens | 31 | 6 | 25 | ⚠️ **Subatendida** |
| Distribuição / Filas | 13 | 0 | 13 | 🔴 **Negligenciada** |
| Canais / WhatsApp | 10 | 7 | 3 | ⚠️ **Subatendida** |
| Autenticação | 3 | 0 | 3 | ⚠️ **Subatendida** |
| Contatos / Busca | 3 | 0 | 3 | ⚠️ **Subatendida** |
| Upload / Mídia | 3 | 1 | 2 | ✅ Balanceada |
| WebSocket / Presença | 2 | 0 | 2 | ✅ Balanceada |
| Permissões / Roles | 1 | 1 | 0 | ✅ Balanceada |

> Negligenciada = HEAT ≥ 4 e DEV_ATTENTION = 0. Subatendida = GAP ≥ 3.

---

## ⚙️ Qualidade de Processo

### DORA CFR — Change Failure Rate
| Módulo | PRs Total | CFR Hits | CFR % | Status |
|--------|:---------:|:--------:|:-----:|--------|
| Chat/Autenticação | 28 | 2 | 7% | ✅ < 15% — mas hits confirmados requerem ação |

CFR hits confirmados:
- **SPA:1509** (Dev4-4278, 06-03) → omnispa AxiosError 401 ESCALATING
- **FoundationAPI:1102** (DEV4-4262, 06-03) → foundationapi SQS queue errors

### Cenários de Teste Desatualizados (Staleness)
| Módulo | Card | Staleness | Ação |
|--------|------|:---------:|------|
| Upload / Mídia | DEV4-4249 | 4 dias | Atualizar cenário antes do handoff |
| Canais / WhatsApp | DEV4-4274 | 2 dias | Atualizar cenário |

### Padrão de Falha por Ambiente
| Módulo | Staging | Canary | Env-specific? |
|--------|:-------:|:------:|:-------------:|
| Chat / Mensagens | 43% | 14% | ✅ SIM (+1 SCORE_TEC) |
| Canais / WhatsApp | 45% | N/A | ⚠️ Parcial (canary ausente) |

### Release Health
- **omnispa release 2026-06-06:** 16 novos grupos de erro Sentry (vs 1 na release anterior 06-05)
- **Sinal de degradação confirmado** — a sidebar reform (SPA:1506) introduzida neste período é candidata à causa

---

## 📋 Ações Prioritárias

| Prioridade | Módulo | Ação | Prazo |
|------------|--------|------|-------|
| **P0 — HOJE** | Autenticação / Chat | Rollback ou hotfix SPA:1509 (Dev4-4278) — omnispa 401 ESCALATING, 496 usuários | Hoje |
| **P0 — HOJE** | WebSocket / Presença | Investigar Hermes SQS event-bus-sqs errors pós DEV4-4262 (perda silenciosa de mensagens) | Hoje |
| **P0 — HOJE** | Distribuição / Filas | Criar DEV4 corretivo para chats presos na fila (SM-8288, SM-8292, SM-8243) | Hoje |
| **P1 — ESTA SEMANA** | Chat / Mensagens | Investigar omnispa Uncompressed Asset (629u) + por que release 06-06 criou 16 novos grupos | Esta semana |
| **P1 — ESTA SEMANA** | Canais / WhatsApp | Resolver conta Meta restrita (SM-8228) + WABA 24h rule violation (SM-8219) | Esta semana |
| **P1 — ESTA SEMANA** | Integrações Externas | Investigar novos CRM errors (polichat-web-app 06-07 HOJE + foundationapi 06-06) | Esta semana |
| **P2 — PRÓX. SPRINT** | Upload / Mídia | Investigar SM-8218 (áudios) + configurar ENABLE_ACK_LOG no meta-whatsapp-cloud-api | Próx. sprint |
| **P2 — PRÓX. SPRINT** | QA / Staleness | Atualizar cenários DEV4-4274 (2d stale) e DEV4-4249 (4d stale) antes de fechar handoff | Próx. sprint |

---

## 📈 Tendência (vs 2026-06-05)

**Piorando:** Autenticação (+5) · Chat (+2) · WebSocket (+2) · Integrações (+1)
**Estável:** Jarvis (-1 → estável) · Permissões (→) · Configurações (→)
**Melhorando (tickets antigos saindo da janela):** Contatos (-10) · Distribuição (-11) · Canais (-7) · Upload (-3)

> ⚠️ **Importante:** A queda em Distribuição, Canais e Contatos reflete tickets antigos saindo da janela de 14 dias, NÃO resolução dos problemas. Os 3 bugs N1 de Distribuição são NOVOS (todos de 06-05).

---

## 🧪 KB — Áreas Frágeis Monitoradas

| Área | Risco | Status | Módulos afetados |
|------|-------|--------|-----------------|
| Upload / Mídia PDF >10MB | TypeError silencioso no media-manager | 🟡 Monitorar | Upload / Mídia |
| Distribuição Redis lock race condition | LID generation em alto volume | 🔴 Ativo (3 bugs N1) | Distribuição / Filas |
| WABA 24h rule | Janela frequentemente mal implementada | 🔴 Ativo (SM-8219) | Canais / WhatsApp |
| Chat lifecycle (never skip `attending`) | Transição incorreta paralisa chat | 🟡 Monitorar | Chat / Mensagens |
| Multi-tenância account_id filter | Queries sem filtro de tenant | 🟢 Sem sinal atual | Cross-módulo |

---

*Relatório gerado por Argos Predict v2.0 · Argos-QA · yuri.castro@poli.digital*
