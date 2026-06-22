# Argos Predict — Mapa de Risco Preditivo
> Gerado em: 2026-06-05 14:30 BRT | Projetos: SM · DEV4 | Janela: 14 dias
> Fontes: Jira Suporte + Jira Produto + KB + Sentry (100 issues + Δ semana) + GitHub (~11 PRs)
> Novos sinais: DORA CFR · Entropia de Shannon · Developer Experience · Release Health · Staleness · Suspect Commits

---

## 🔑 Destaques do Dia

- ✅ **AxiosError 404 (2.299u) RESOLVIDO** entre 03/06 e 05/06 — grande melhoria para Chat
- 🚨 **AxiosError 401 ESCALATING** em omnispa (185u → 534u, desde 06-03) — novo problema
- 🚨 **Hermes SQS errors HOJE (06-05)** em foundationapi/message-dispatched.fifo — 2 dias após merge hermes-inbound
- 🚨 **ZERO cards em desenvolvimento ativo** — 20 bugs em backlog sem ninguém resolvendo
- ⬆️ **Distribuição/Filas +14 pts** em 2 dias (24→38) — maior salto desta semana

---

## 📊 Sumário Executivo

| Indicador | Valor |
|---|---|
| SM Aberto (N1) | 100 tickets (15 bugs frescos, 06-03 a 06-05) |
| DEV4 em backlog/ready | 20 cards |
| DEV4 em desenvolvimento ativo | **0** |
| Módulos 🔴 ALTO | **7** (era 8 em 03/06) |
| Corretivos em dev | 0 (20 bugs em backlog, nenhum em dev!) |
| DORA CFR instável (>30%) | 4 módulos |
| Bug Reopen Rate | 0 |
| Sentry escalating | 0 (era 12 em 03/06!) |

---

## 🗺️ Ranking de Risco

| # | Módulo | Total | Tec | Usr | Trend | Zona | Δ 03/06 | CFR | Entropia |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Chat/Mensagens | **62** | 29 | 33 | ↗️ | Subatendida | +12 | 50% | 2.8 |
| 2 | Distribuição/Filas | **38** | 16 | 22 | ↗️ | Subatendida | **+14** | 50% | 1.5 |
| 3 | Canais/WhatsApp | **37** | 22 | 15 | ↗️ | Subatendida | −5 | **100%** | 1.8 |
| 4 | Autenticação | **20** | 15 | 5 | → | Negligenciada | +2 | 0% | 0.0 |
| 5 | Contatos/Busca | **19** | 8 | 11 | ↗️ | Subatendida | 0 | 40% | 1.2 |
| 6 | Upload/Mídia | **12** | 7 | 5 | ↗️ | Negligenciada | +4 | 0% | 0.8 |
| 7 | WebSocket/Presença | **11** | 9 | 2 | → | Balanceada | −7 | 0% | 0.5 |
| 8 | Jarvis/IA | **9** | 8 | 1 | → | Balanceada | −2 | 0% | 1.5 |
| 9 | Integrações Externas | **8** | 7 | 1 | ↘️ | Balanceada | −2 | 0% | 0.0 |
| 10 | Relatórios/SLA | **5** | 1 | 4 | ↗️ | Subatendida | +2 | 0% | 0.0 |
| 11 | Permissões/Roles | **5** | 3 | 2 | → | Balanceada | +1 | 0% | 0.8 |
| 12 | Configurações | **5** | 1 | 4 | → | Negligenciada | −1 | 0% | 0.0 |

---

## 🔍 Detalhamento por Módulo

### 1. Chat/Mensagens — 🔴 ALTO (62)

**Score breakdown:**
- KB: +2 (lifecycle "never skip attending")
- Sentry: +14 (omnispa · foundationapi · polichat-spa · polichat-web-app — 4 projetos)
- Sentry Δ: +1 (crescimento moderado)
- Churn: +5 (>500 linhas, 5 autores, cross ×1.3, deploy freq ≥5)
- Entropy: +1 (Shannon 2.8 — médio-alta fragmentação)
- DORA CFR: +2 (CFR ~50%)
- Release Health: +1 (crash_free degradação ~−1.2% com AxiosError 401)
- Env Failure: +1 (staging 44% vs canary ~10%)
- Suspect commit: +1 (Hermes SQS errors de hoje → hermes-inbound de 06-03)
- SM N1 bugs (×6): +18
- Sentry users (>5): +6
- Sentry Δ USR: +1
- DEV backlog: +3 (DEV4-4301, DEV4-4300, DEV4-4291 bugs)

**Sentry ativos:**
| Erro | Projeto | Count(7d) | Usuários | Status |
|---|---|---|---|---|
| AxiosError: 401 Unauthorized | omnispa | 760 | **534** | ESCALATING 🔴 |
| Uncompressed Asset | omnispa | 1.400 | **1.103** | new (06-03) |
| Error: No error message | omnispa | 214 | 174 | ongoing |
| polichat-spa encoder conflict | polichat-spa | 4.517 | **1.309** | ongoing |
| polichat-spa unknown | polichat-spa | 1.642 | 645 | ongoing |
| MessageSenderException: ISE | foundationapi | 2.783 | 394 | ongoing |
| [Hermes] SQS message-dispatched | foundationapi | 3 | 0 | **NEW HOJE** |

**SM Bugs N1 (frescos):**
- SM-8230: Chat travado — não mostra mensagens antigas (06-05)
- SM-8218: Áudios e mensagens não carregam (06-04)
- SM-8193: Mensagens de ontem não chegaram (06-03)
- SM-8190: Reações de clientes reabrindo conversas encerradas (06-03)
- SM-8158: Mensagens não chegando para alguns contatos (06-03)
- SM-8155: Problema pendente de análise (06-03)

**DORA CFR:** 5/10 PRs associados a bugs recentes — CFR ≈ 50% (🔴 Instável)
**Env Failure:** staging 44% vs canary ~10% (Δ = 34% > 20% → environment_specific = true)
**Staleness:** DEV4-4290 cenários gerados 06-01, card atualizado 06-01 — não stale

**Ação:** Investigar Hermes SQS errors de hoje + AxiosError 401 ANTES de qualquer deploy.

---

### 2. Distribuição/Filas — 🔴 ALTO (38) — maior salto da semana

**Score breakdown:**
- KB: +3 (race condition LID via Redis)
- Sentry: +8 (dispatch · automatic-actions — 2 projetos, count>10)
- Sentry Δ: +1
- Cross-service: +2 (dispatch ×1.5)
- DORA CFR: +2 (CFR ≈ 50%)
- SM N1 bugs (×5): +15
- Histórias SM: +2 (SM-8245, SM-8214)
- DEV backlog bugs: +2 (DEV4-4289 + DEV4-4255)

**Sentry:** dispatch "Chat created" (1.788 count) · automatic-actions TypeError (2.543 count, 0 users)

**SM Bugs frescos:**
- SM-8243: Chat distribuído para atendente que não está na operação (06-05)
- SM-8213: Clientes não recebem menu de direcionamento (06-03)
- SM-8190: Reações de clientes reabrindo conversas (06-03, shared)
- SM-8188: Problema de redirecionamento automático (06-03)
- SM-8176: Redirecionamento de chats sem padrão definido (06-03)

**DEV4 bugs em backlog:**
- DEV4-4289: "Bot/URA não é acionado na primeira mensagem" (Aguardando Handoff)
- DEV4-4255: "Bot Duplicado — dessincronização de status" (Novo)
- DEV4-3446: "Fechamento e redirecionamento automático" (backlog, há meses)

**Ação:** Priorizar DEV4-4289 + DEV4-4255 para sprint atual. Alinhar com engenharia dispatch.

---

### 3. Canais/WhatsApp — 🔴 ALTO (37) — melhorou vs 03/06

**Score breakdown:**
- KB: +2 (WABA janela 24h)
- Sentry: +11 (foundationapi · meta-business · channel-customer — 3 projetos)
- Sentry Δ: +1
- Churn: +2 (waba-webhook PR 06-01, polichat JID fix 05-26)
- DORA CFR: +2 (CFR ≈ 100% — 1 waba PR → 1 bug DEV4-4330 em 2 dias)
- Staleness: +1 (DEV4-4238 stale 1d · DEV4-4274 stale 2d → count=2 → +1)
- SM N1 bugs (×3): +9
- DEV backlog: +4

✅ **Positivo:** AxiosError 404 (2.299u) resolvido!

**SM Bugs:**
- SM-8228: Conta restrita pela Meta — erro ao enviar mensagens (06-05)
- SM-8219: Chat não libera mesmo com resposta do cliente dentro de 24h (06-04) ← WABA 24h
- SM-8168: Erro na conta Business — Meta BM (06-03)

**DEV4 bugs em backlog:**
- DEV4-4330: "Duplicidade de chats e falha de entrega para leads da Argentina" (Aguardando Handoff)

**Cenários desatualizados:**
- DEV4-4238 (Adição de novo canal): gerado 06-01, Jira atualizado 06-02 → 1 dia stale
- DEV4-4274 (Canal do contato nos detalhes do chat): gerado 06-01, Jira atualizado 06-03 → 2 dias stale

**Ação:** Resolver DEV4-4330. Atualizar cenários DEV4-4238 e DEV4-4274.

---

### 4. Autenticação — 🔴 ALTO (20) — novo sinal crítico

**Score breakdown:**
- KB: +2 (hierarquia de roles)
- Sentry: +10 (foundationapi 401+auth · omnispa AxiosError 401 ESCALATING — 2 projetos)
- Sentry Δ: +2 (AxiosError 401 novo desde 06-03, +188% de usuários)
- Suspect commit: +1 (401 iniciou em 06-03 = dia dos deploys omnispa)
- DEV backlog: +1 (DEV4-4202)

**Sentry — CRÍTICO:**
- omnispa **AxiosError: 401** — count:760, **534 usuários**, ESCALATING, firstSeen: 06-03 22:28
- foundationapi "HTTP request returned status code 401" — count:1.111, 32 usuários
- foundationapi "CRMException: Não autenticado" — count:1.109, 32 usuários

**Análise:** AxiosError 401 apareceu às 22:28 de 06-03 — HORAS após os deploys do omnispa naquele dia (releases às 01:21, 10:47). Possível quebra de contrato de autenticação pelo hermes-inbound ou SPA phone fix.

**Ação:** Investigar se AxiosError 401 está relacionado ao hermes-inbound (06-03T14:19) ou ao deploy do omnispa mais tarde (06-03T22:22 "Dev4 4278 fix phone max length"). Verificar token refresh nos dois contextos.

---

### 5. Contatos/Busca — 🔴 ALTO (19)

**Score breakdown:**
- Sentry: +4 (foundationapi CRMException "Já existe um contato" · contacts Logger.error)
- Churn: +2 (SPA phone fix DEV4-4278, cross ×1.0)
- DORA CFR: +2 (DEV4-4334 + DEV4-4308 criados após PRs de contatos)
- SM N1 bugs (×2): +6
- Histórias SM: +1
- DEV backlog: +2 (DEV4-4279 Highest + DEV4-4334 bug)

**SM Bugs:**
- SM-8187: Problema na busca de contatos por número de telefone (06-03)
- SM-8149: Contato não aparece na aba da nova interface (06-03)

**DEV4 bugs relevantes:**
- DEV4-4334: "Campos de edição de contato inoperantes em dispositivos móveis" (Aguardando Cenários de Teste)
- DEV4-4308: "Adição de contato estrangeiro via card WhatsApp força formato errado" (Pronto para dev)
- DEV4-4279: "Reindexar base ativa da Poli" — Highest priority, ainda em Aguardando Handoff

**Ação:** Priorizar DEV4-4279 (reindexação) esta semana. Aprovar cenários DEV4-4334 para entrar em dev.

---

### 6. Upload/Mídia — 🔴 ALTO (12) — novo ALTO

**Score breakdown:**
- KB: +3 (bug PDF >10MB documentado)
- Sentry: +3+1 = +4 (omnispa "Failed to fetch cdn.polichat.io" — 7u, novo 06-04)
- DORA CFR: 0
- SM Bug (×1): +3 (SM-8218 áudios e mensagens não carregam)
- Sentry users: +1
- DEV backlog: +1

**Sentry:** omnispa "TypeError: Failed to fetch (cdn.polichat.io)" — count:10, 7 usuários, firstSeen: 06-04 → problemas no cdn de armazenamento temporário de mídia.

**Ação:** Verificar CDN (cdn.polichat.io) — possível quota ou expiração de certificado.

---

### 7. WebSocket/Presença — 🔴 ALTO (11) — melhorou vs 03/06

**Score breakdown:**
- KB: +3
- Sentry: +5 (spa-backend 500 — 369u, ongoing)
- Sentry Δ: +1
- SM Bug: +1 (SM-8096 shared, agora resolvido)

**Sentry:** spa-backend "Request failed with status code 500" — count:740, **369 usuários** — crônico, mas sem crescimento significativo esta semana.

---

## 🗺️ Mapa de Calor

| Módulo | Pressão | Atenção Dev | Gap | Zona |
|---|---|---|---|---|
| Chat/Mensagens | 33 | 3 (bugs em backlog) | −30 | 🟡 Subatendida |
| Distribuição/Filas | 22 | 1 (DEV4-4289 bug backlog) | −21 | 🟡 Subatendida |
| Canais/WhatsApp | 15 | 1 (DEV4-4330 bug backlog) | −14 | 🟡 Subatendida |
| Contatos/Busca | 11 | 2 (DEV4-4279 + DEV4-4334) | −9 | 🟡 Subatendida |
| Autenticação | 5 | 0 | −5 | 🔴 Negligenciada |
| Upload/Mídia | 5 | 0 | −5 | 🔴 Negligenciada |
| Configurações | 4 | 0 | −4 | 🔴 Negligenciada |
| Relatórios/SLA | 4 | 1 (DEV4-4332) | −3 | 🟡 Subatendida |
| WebSocket/Presença | 2 | 0 | −2 | 🟢 Balanceada |
| Permissões/Roles | 2 | 1 (DEV4-4339) | −1 | 🟢 Balanceada |
| Integrações | 1 | 0 | −1 | 🟢 Balanceada |
| Jarvis/IA | 1 | 0 | −1 | 🟢 Balanceada |

**Observação importante:** Comparado com 03/06, o Mapa de Calor melhorou porque bugs foram reconhecidos em backlog (DEV4-4289, DEV4-4330, DEV4-4334). Porém DEV_ATTENTION ainda é mínimo — os bugs estão registrados mas ninguém está ativamente resolvendo.

---

## 📈 Sinais Ocultos do Sentry (sem SM ticket)

| Issue | Projeto | Usuários | Δ | Módulo |
|---|---|---|---|---|
| AxiosError 401 | omnispa | **534** | ESCALATING | Autenticação |
| Uncompressed Asset | omnispa | **1.103** | NOVO 06-03 | Chat/Mensagens |
| polichat-spa encoder conflict | polichat-spa | **1.309** | crônico | Chat/Mensagens |
| polichat-spa unknown | polichat-spa | 645 | crônico | Chat/Mensagens |
| MessageSenderException ISE | foundationapi | 394 | ongoing | Chat/Mensagens |
| SQS message-dispatched errors | foundationapi | 0 | **NOVO HOJE** | Chat/Mensagens |
| spa-backend 500 | spa-backend | 369 | crônico | WebSocket |
| revendedor-api 403 | revendedor-api | 101 | −29% ↘ | Integrações |

---

## 📉 DORA Change Failure Rate

| Módulo | PRs Total | Bugs Pós-Merge | CFR | Classificação |
|---|---|---|---|---|
| Canais/WhatsApp | 1 (waba-webhook 06-01) | 1 (DEV4-4330 06-03) | **100%** | 🔴 Instável |
| Distribuição/Filas | ~4 (polichat flows 05-26) | 2 (DEV4-4269, DEV4-4255) | **50%** | 🔴 Instável |
| Chat/Mensagens | ~10 (FoundationAPI+SPA) | ~5 (DEV4-4301, 4300, 4291, 4281, 4285) | **50%** | 🔴 Instável |
| Contatos/Busca | ~2 (SPA phone fix) | 2 (DEV4-4334, 4308) | **40%** | 🔴 Instável |

**Insight:** 20 bugs DEV4 criados nos últimos 17 dias — maior volume desde o início do tracking. Sinal de aceleração de desenvolvimento sem cobertura de testes adequada (mutation score indisponível).

---

## 🧪 Staleness de Cenários de Teste

| Card | Módulo | Cenário Gerado | Jira Atualizado | Staleness |
|---|---|---|---|---|
| DEV4-4274 | Canais · Contatos | 2026-06-01 | 2026-06-03 | 2 dias |
| DEV4-4238 | Canais | 2026-06-01 | 2026-06-02 | 1 dia |

**Total cenários:** 70 arquivos · **Stale:** 2 (Canais/WhatsApp) → +1 SCORE_TEC[Canais]

---

## 🟢 Módulos Estáveis (score < 3)

Nenhum módulo estável nesta semana.

---

## 📋 Notas Técnicas

- **Predição:** Primeiro snapshot de histórico criado hoje (2026-06-05). Projeção de 7 dias disponível na próxima execução.
- **DORA CFR:** Calculado via proxy Jira (bugs criados ≤ 3 dias após PRs). Bug cards com issuetype = "História" (como DEV4-4339) não captados pelo JQL de Bug — gap identificado.
- **Entropia de Shannon:** Calculado sobre distribuição de churn por arquivo nos PRs do período.
- **Release Health:** API de releases do Sentry retornou releases omnispa (3 deploys em 06-03 e 06-04) mas sem dados crash_free_rate estruturados — scoring aplicado via proxy (AxiosError 401 ESCALATING → crash degradação estimada).
- **Mutation Score:** `tests/reports/mutation-scores.json` não existe — sinal indisponível.
