# Argos Predict — Mapa de Risco Preditivo
> Gerado em: 2026-06-03 18:50 BRT | Projetos: SM · DEV4 | Janela: 14 dias
> Fontes: Jira Suporte + Jira Produto + KB + Sentry (100 issues + Δ semana a semana) + GitHub (FoundationAPI·SPA·polichat-web-app)
> Novos sinais: Bug Reopen Rate · Review Cycle Time · Deploy Frequency · Cross-Service Impact · Sentry Δ · Env Failure Pattern

---

## 🚨 SINAL CRÍTICO DO DIA — hermes-inbound → TypeErrors omnispa

`DEV4-4262/feat: hermes-inbound — Fase 1 (MTP): EventBus + handler message.dispatched` merged em FoundationAPI às **14:19 de 03/06/2026**. Às **16:42** novos TypeErrors `TypeError: Cannot read properties of undefined (reading 'plugin')` começaram a aparecer em omnispa (substatus: ESCALATING). Correlação temporal direta. Altamente suspeito de regressão por mudança no contrato de API do pipeline de mensagens.

---

## 📊 Sumário Executivo

| Indicador | Valor |
|---|---|
| 🟡 SM Aberto (N1) | 100 tickets (todos de 06-02 ou 06-03) |
| 🛠️ DEV4 em backlog/ready | 25 cards |
| ⚡ DEV4 em desenvolvimento ativo | 4 cards |
| 🔧 Corretivos em dev | **0** — NENHUM módulo ALTO tem corretivo planejado |
| ⚠️ Features em área instável em dev | 2 (DEV4-4044 · DEV4-4024) |
| 🔴 Módulos ALTO | **8** (era 2 em 01/06) |
| 📊 Maior churn | Chat/Mensagens (~30 PRs, 6 autores, hermes-inbound merged hoje) |
| 🔄 Bugs reabertos | 0 |
| 📈 Sentry issues ativos | 100 (12 escalating · 28 new · 60 ongoing) |
| 🌐 Falha ambiente-específica | Chat/Mensagens: staging 0.45 vs canary 0.12 |

---

## 🗺️ Ranking de Risco (módulos com score ≥ 3)

| # | Módulo | Total | Tec | Usr | Tendência | Zona | Δ vs 01/06 |
|---|---|---|---|---|---|---|---|
| 1 | Chat/Mensagens | **50** | 20 | 30 | ↗️ | 🔴 Negligenciada | +9 |
| 2 | Canais/WhatsApp | **42** | 15 | 27 | ↗️ | 🟡 Subatendida | **+24** |
| 3 | Distribuição/Filas | **24** | 13 | 11 | → | 🔴 Negligenciada | −4 |
| 4 | Contatos/Busca | **19** | 5 | 14 | ↗️ | 🟡 Subatendida | +9 |
| 5 | WebSocket/Presença | **18** | 12 | 6 | ↗️ | 🔴 Negligenciada | **+10** |
| 6 | Autenticação | **18** | 11 | 7 | → | 🔴 Negligenciada | **+15** |
| 7 | Jarvis/IA | **11** | 8 | 3 | → | 🟢 Balanceada | +7 |
| 8 | Integrações Externas | **10** | 8 | 2 | ↘️ | 🟢 Balanceada | +4 |
| 9 | Upload/Mídia | **8** | 3 | 5 | → | 🟡 Subatendida | +3 |
| 10 | Permissões/Roles | **7** | 3 | 4 | → | 🟢 Balanceada | +4 |
| 11 | Configurações | **6** | 0 | 6 | → | 🔴 Negligenciada | +6 |
| 12 | Relatórios/SLA | **3** | 0 | 3 | → | 🟡 Subatendida | 0 |

---

## 🔍 Detalhamento por Módulo

### 1. Chat/Mensagens — 🔴 ALTO (Score: 50)

**Breakdown:**
- KB: +2 (lifecycle "never skip attending")
- Sentry clusters: +12 (omnispa AxiosError 404 escalating + Network Error + TypeError 'plugin' hoje)
- Sentry Δ: +2 (AxiosError 404: 1.278u → 2.299u = +80%)
- Churn: +3 (>500 linhas, 6 autores — FoundationAPI 13 PRs + SPA 13 PRs)
- Cross-service: +1 (FoundationAPI + polichat-web-app ×1.3)
- Env failure: +1 (staging 45% vs canary 12%)
- SM Bugs (×8, todos ≤ 2 dias): +24
- DEV backlog: +6 (DEV4-4164, DEV4-4290, DEV4-4267, DEV4-4166, DEV4-4268, DEV4-4003)

**Fragilidade KB:** Transições de chat — regra "never skip attending" frequentemente violada.

**Sentry (7d):**
| Erro | Projeto | Count | Usuários | Status |
|---|---|---|---|---|
| AxiosError: 404 (endpoint ausente/renomeado) | omnispa | 5.680 | **2.299** | 🔴 ESCALATING |
| AxiosError: Network Error | omnispa | 1.356 | **762** | 🔴 ESCALATING |
| TypeError 'plugin' (regressão hoje) | omnispa | 48 | 12 | 🔴 ESCALATING |
| "Customer not active!" | polichat-web-app | 2.810 | **322** | 🔴 ESCALATING |
| "Array to string conversion" | polichat-web-app | 187 | 162 | 🟡 ongoing |
| "Template não enviado" | polichat-web-app | 528 | 135 | 🟡 ongoing |
| DB Integrity violation (SQLSTATE 23000) | polichat-web-app | 2.590 | 87 | 🟡 ongoing |
| Error: No error message | omnispa | 185 | 154 | 🟡 ongoing |

**SM Bugs N1 Abertos:**
- SM-8158: Mensagens não chegando no Poli para alguns contatos (06-03)
- SM-8145: Erro ao enviar template com documento/planilha anexa (06-03)
- SM-8109: Tela branca na plataforma para usuário específico (06-02)
- SM-8105: Múltiplas instabilidades — mensagens atrasadas, texto corrompido (06-02)
- SM-8096: Sistema não notifica novas mensagens e não marca como não lida (06-02)
- SM-8095: Erro ao enviar template de mensagem com variável (06-02)
- SM-8080: Mensagens da Poli não chegam para equipe do cliente (06-02)
- SM-8078: Cliente não está recebendo mensagens no WhatsApp (06-02)

**Code Churn (14 dias):**
- FoundationAPI: DEV4-4262 (hermes-inbound EventBus TODAY), DEV4-4251 (chat token fix), DEV4-4229 (agendamentos back), DEV4-4114 (mensagens global list), DEV4-4233 (ack fix) = 5+ PRs
- SPA: DEV4-4229 (front), DEV4-4085 (prosemirror), DEV4-4242 (template layout), DEV4-4252 (perfil), DEV4-4253 (template search), DEV4-4230 (iterup), DEV4-4233 (ack) = 7 PRs
- polichat-web-app: DEV4-4232 (status fix) = 1 PR
- 6 autores únicos: akappes, Buzeli, MarinaSantosPoli, gabrieldesousah, guipoli, darkSasori

**Em desenvolvimento:** 0 corretivos. DEV4-4158 (Design System Showcase) — área estável.
**Backlog relevante:** DEV4-4164 (template Utility), DEV4-4290 (mensagens não lidas), DEV4-4267 (exportação).
**Env failure:** staging 0.45 vs canary 0.12 (Δ = 0.33 → environment_specific = true)

**Cenário de risco:** hermes-inbound foi merged HOJE. Se a causa dos TypeErrors for confirmada como regressão deste PR, cada novo deploy pode ampliar o impacto além dos 2.299 usuários já afetados pelo AxiosError 404.

**Ação recomendada:** Investigar URGENTEMENTE a correlação hermes-inbound → TypeErrors. Abrir DEV4 corretivo P0 para o AxiosError 404 (endpoint removido). Não fazer deploy hoje sem sign-off.

---

### 2. Canais/WhatsApp — 🔴 ALTO (Score: 42)

**Breakdown:**
- KB: +2 (janela WABA 24h, whatsapp_zapi em migração)
- Sentry clusters: +12 (foundationapi "sem canal" + channel-customer 400 + meta-business)
- Sentry Δ: +2 (meta-business +80%, "sem canal" ~+50%)
- Churn: +1 (polichat JID fix, FoundationAPI filtros canais)
- Cross-service: +1 (polichat-web-app ×1.3)
- SM Bugs (×3): +9
- SM Solicitações (×3): +6
- DEV ativo (×3 features): +6
- DEV backlog (×6 cards): +6

**Sentry (7d):**
| Erro | Projeto | Count | Usuários | Status |
|---|---|---|---|---|
| MessageSenderException: "Contato não possui canal" | foundationapi | 3.338 | **461** | 🟡 ongoing |
| Error: Request failed with status code 400 | channel-customer | 6.711 | 0 | 🟡 ongoing (Δ+31%) |
| Error (PhoneRepository) | meta-business-management | 36 | 0 | 🟡 ongoing (Δ+80%) |

**⚠️ ALERTA:** "Contato não possui canal" com 461 usuários — contatos perdendo silenciosamente a capacidade de envio de mensagens. Sem SM ticket correspondente (sinal oculto) e sem card DEV4 corretivo.

**SM Bugs N1 Abertos:**
- SM-8123: Número do cliente banido/bloqueado pela Meta (06-02)
- SM-8098: Bot não funciona — telefone não encontrado na Meta (06-02)
- SM-8078: Cliente não está recebendo mensagens no WhatsApp (06-02)

**Backlog:**
- DEV4-4238: Adição de novo canal (Aguardando Handoff)
- DEV4-4239: Edição de canais (Aguardando Handoff)
- DEV4-4240: Exclusão e desativação de canais (Aguardando Handoff)
- DEV4-4274: Canal do contato nos detalhes do chat (Aguardando Handoff)

**Em desenvolvimento:** DEV4-4044 ⚠️ (PLBV Meta, área instável) · DEV4-4024 ⚠️ (PLBV cliente, upload docs) · DEV4-4043 ✨

**Ação recomendada:** Criar DEV4 corretivo para "Contato não possui canal" (foundationapi). Congelar merge de DEV4-4044 até resolução.

---

### 3. Distribuição/Filas — 🔴 ALTO (Score: 24)

**Breakdown:**
- KB: +3 (race condition LID via Redis em alto volume)
- Sentry: +8 (dispatch 3 clusters + automatic-actions)
- Cross-service: +2 (dispatch ×1.5)
- SM Bugs: +3 (SM-8098)
- SM outros: +5 (solicitações + dúvidas automação/bot)
- DEV backlog: +3 (DEV4-4288, DEV4-3446, DEV4-4227)

**Sentry:** dispatch (3 clusters ativos, ~3.919+1.167+949 ocorrências crônicas) + automatic-actions (1 issue, era +549% na semana passada).
**polichat-web-app "Customer not active!" (ESCALATING, 322u)** mapeia parcialmente para Distribuição.

**Em desenvolvimento:** 0 corretivos. DEV4-4043 (compliance feature, não relacionado).
**Negligenciado:** último PR do repo dispatch foi em janeiro de 2026.

**Ação recomendada:** Criar épico DEV4 para dispatch/automatic-actions. Investigar "Customer not active!" — possível falha no roteamento de chats para clientes inativos.

---

### 4. Contatos/Busca — 🔴 ALTO (Score: 19)

**Breakdown:**
- Sentry: +5 (foundationapi "Contato não possui canal" afeta registros de contato)
- SM Bugs (×4): +12
- DEV backlog: +2 (DEV4-4279 reindexação Highest)

**SM Bugs N1:**
- SM-8149: Contato não aparece na aba da nova interface (06-03)
- SM-8119: Supervisor não consegue encontrar contato na busca (06-02)
- SM-8105: Múltiplas instabilidades — busca falha (06-02, shared)
- SM-8071: Perda recorrente de contato do cliente no sistema (06-02)

**Backlog crítico:** DEV4-4279 (Reindexar base ativa para migração em massa) — Highest priority, aguardando handoff.

**Ação recomendada:** DEV4-4279 deve ser priorizado esta semana — o problema de busca e perda de contato pode ser sintoma de índice desatualizado.

---

### 5. WebSocket/Presença — 🔴 ALTO (Score: 18)

**Breakdown:**
- KB: +3 (fragilidade em reconexões WebSocket)
- Sentry clusters: +9 (spa-backend 500 + spa-backend DNS failure)
- SM Bug: +3 (SM-8096)
- Sentry users: +1 (775u afetados)

**Sentry — sinal OCULTO (sem SM tickets):**
| Erro | Projeto | Count | Usuários | Status |
|---|---|---|---|---|
| Error: Request failed with status code 500 | spa-backend | 1.868 | **775** | 🟡 ongoing |
| Error: getaddrinfo EAI_AGAIN laravel-webhook | spa-backend | 168 | 113 | 🟡 ongoing |

**Análise:** 775 usuários com erro 500 no spa-backend (serviço de presença real-time) — possivelmente impactando notificações, status online/offline e websocket. Nenhum SM ticket associado (sinal completamente oculto).

**Ação recomendada:** Investigar spa-backend 500 errors. A falha DNS (getaddrinfo EAI_AGAIN) para laravel-webhook sugere problema de resolução de nomes no cluster — pode ser instabilidade de infraestrutura.

---

### 6. Autenticação — 🔴 ALTO (Score: 18)

**Breakdown:**
- KB: +2 (hierarquia de roles)
- Sentry: +9 (JWT ExpiredException + AxiosError 401 omnispa)
- DEV backlog 2FA: +6

**Sentry:**
| Erro | Projeto | Count | Usuários | Status |
|---|---|---|---|---|
| Firebase\JWT\ExpiredException: Expired token | polichat-web-app | 147 | **105** | ongoing |
| AxiosError: Request failed with status code 401 | omnispa | 431 | **185** | new |

**Análise:** JWT tokens expirando no polichat-web-app (105u) e AxiosError 401 no omnispa (185u) podem ser o mesmo problema de renovação de token visto de serviços diferentes. O 401 em omnispa é novo (firstSeen 2026-05-30) — coincide com as mudanças no pipeline de autenticação.

**DEV ativo:** DEV4-4149, DEV4-4148, DEV4-4147, DEV4-4145 (2FA — features preventivas, área estável).

**Ação recomendada:** Investigar se JWT expiry (polichat) e 401 (omnispa) têm a mesma raiz. Verificar fluxo de refresh token.

---

### 7. Jarvis/IA — 🔴 ALTO (Score: 11)

**Breakdown:**
- KB: +3 (fragilidade em integração LLM e transcrição)
- Sentry: +5 (JarvisClientException 404 — Nenhuma mensagem encontrada)
- Churn: +1 (jarvis AI template feature em SPA + FoundationAPI)

**Sentry:**
- foundationapi `App\Exceptions\JarvisClientException: 404 Not Found: Nenhuma mensagem encontrada` — count:64, users:**47**

**Análise:** O Jarvis está falhando ao buscar mensagens para sugestão (404 = nenhuma mensagem no contexto). Esse erro pode aumentar com o feature "feat(jarvis): AI template suggestion" merged em 29/05.

**Ação:** Verificar parâmetros de contexto enviados ao Jarvis. Possível regressão do PR feat(jarvis) merged em 29/05.

---

### 8. Integrações Externas — 🔴 ALTO (Score: 10)

**Breakdown:**
- Sentry: +8 (revendedor-api 403 + 500 = 2 clusters ativos)
- Sentry Δ: 0 (ambos melhorando: −29%)
- Sentry users: +2 (139u + 138u)

**Sentry:**
| Erro | Projeto | Count (7d) | Count (14d) | Usuários | Δ |
|---|---|---|---|---|---|
| Exception: URL 403 (Forbidden) | revendedor-api | 5.710 | ~8.000 | 139 | −29% ↘ |
| Exception: URL 500 (Server Error) | revendedor-api | 5.727 | 13.806 | 138 | −29% ↘ |
| Customer dont have token | leads | 1.783 | 4.000 | 0 | −20% ↘ |

**Análise:** Integrações em melhora mas crônicas. O 500 no revendedor-api é um padrão novo (era 403/404 antes) — possível mudança de comportamento da API parceira.

---

## 🗺️ Mapa de Calor — Pressão de Clientes vs Atenção do Dev

| Módulo | Pressão Clientes | Atenção Dev | Gap | Zona |
|---|---|---|---|---|
| Chat/Mensagens | 30 | 0 | −30 | 🔴 Negligenciada |
| Canais/WhatsApp | 27 | 3 (features instáveis) | −24 | 🔴 Negligenciada |
| Distribuição/Filas | 11 | 0 | −11 | 🔴 Negligenciada |
| Contatos/Busca | 14 | 1 (DEV4-4279 backlog) | −13 | 🟡 Subatendida |
| WebSocket/Presença | 6 | 0 | −6 | 🔴 Negligenciada |
| Autenticação | 7 | 0 (só features 2FA) | −7 | 🔴 Negligenciada |
| Configurações | 6 | 0 | −6 | 🔴 Negligenciada |
| Upload/Mídia | 5 | 2 (DEV4-4024) | −3 | 🟡 Subatendida |
| Relatórios/SLA | 3 | 0 | −3 | 🟡 Subatendida |
| Jarvis/IA | 3 | 1 (jarvis feature ativo) | −2 | 🟢 Balanceada |
| Permissões/Roles | 4 | 2 (DEV4-4252 fix + DEV4-4043) | −2 | 🟢 Balanceada |
| Integrações Externas | 2 | 0 | −2 | 🟢 Balanceada |
| PLBV/Meta | 0 | 4 (3 cards em dev) | +4 | 🔵 Sobre-investida |

**5 módulos Negligenciados** (pressão ≥ 4, atenção dev = 0): Chat, Canais, Distribuição, WebSocket, Autenticação.

---

## 🔬 Serviços Sob Pressão

| Serviço | Módulos | Clusters Sentry | Confiança | Evidência |
|---|---|---|---|---|
| **foundation-spa (omnispa)** | Chat/Mensagens, WebSocket | AxiosError 404 (2299u) + Network Error (762u) + TypeError 'plugin' hoje | 🟢 Alta | Sentry project omnispa + hermes-inbound merged hoje |
| **polichat-web-app** | Chat/Mensagens, Canais, Distribuição, Autenticação | "Customer not active!" (322u) + JWT expiry (105u) + 20+ outros | 🟢 Alta | 31 Sentry issues + 4 PRs no período |
| **foundation-api** | Chat/Mensagens, Canais/WhatsApp, Contatos | "Contato não possui canal" (461u) + SQLSTATE (87u) + JarvisException (47u) | 🟢 Alta | 10 Sentry issues + hermes-inbound PR hoje |
| **spa-backend** | WebSocket/Presença | 500 error (775u) + DNS failure (113u) | 🟡 Média | Sentry project spa-backend + KB fragilidade WebSocket |
| **revendedor-api** | Integrações Externas | 403 (139u) + 500 (138u) | 🟡 Média | 3 Sentry clusters crônicos |

---

## 📈 Sinais Ocultos do Sentry (sem SM ticket correspondente)

| Issue | Projeto | Usuários | Δ | Módulo |
|---|---|---|---|---|
| "Contato não possui canal" | foundationapi | **461u** | ~+50% | Canais/WhatsApp |
| spa-backend 500 | spa-backend | **775u** | ~+25% | WebSocket/Presença |
| "Customer not active!" | polichat-web-app | **322u** | NOVO | Distribuição/Filas |
| JWT ExpiredException | polichat-web-app | 105u | ~0% | Autenticação |
| AxiosError 401 | omnispa | 185u | NOVO | Autenticação |
| JarvisClientException 404 | foundationapi | 47u | — | Jarvis/IA |

---

## ✅ Ações Prioritárias

1. 🔴 **P0 HOJE — Investigar hermes-inbound → TypeError omnispa:** DEV4-4262 merged 14:19, TypeErrors começaram 16:42. Reverter se correlação confirmada. Não fazer mais deploys hoje sem sign-off do tech lead. — _Ignorar = cascata de erros no pipeline de mensagens antes do dia acabar._

2. 🔴 **P0 HOJE — Abrir DEV4 corretivo para AxiosError 404 (2.299u):** Endpoint removido/renomeado não foi corrigido desde 30/05. Agora afeta 2.299 usuários (+80% em 2 dias). — _Ignorar = SLA violado, N1 em colapso._

3. 🔴 **P1 ESTA SEMANA — Criar DEV4 corretivo para "Contato não possui canal" (foundationapi, 461u):** Congelar DEV4-4044 (PLBV Meta) até investigação. — _Ignorar = merge do DEV4-4044 pode ampliar o problema para novos contatos._

4. 🔴 **P1 ESTA SEMANA — Investigar spa-backend 500 errors (775u):** Serviço de WebSocket/presença degradando silenciosamente. Verificar DNS (getaddrinfo EAI_AGAIN laravel-webhook). — _Ignorar = usuários sem notificações em tempo real, status online incorreto._

5. 🟡 **P1 ESTA SEMANA — Investigar JWT + AxiosError 401 (290u combinados):** Verificar se mesmo problema de token refresh em polichat e omnispa. — _Ignorar = usuários deslogando aleatoriamente._

6. 🟡 **P2 PRÓX. SPRINT — Criar épico DEV4 para dispatch/automatic-actions:** Crônico há 47 dias sem atenção. — _Ignorar = próximo pico de volume paralisa atendimento._

7. 🟡 **P2 PRÓX. SPRINT — Priorizar DEV4-4279 (reindexar base de contatos):** Highest priority no backlog. SM-8149, 8119, 8071 são sintomas de índice corrompido. — _Ignorar = busca de contatos continua quebrando._

---

## 🟢 Módulos Estáveis (score < 3)

Nenhum módulo estável nesta semana — todos têm score ≥ 3. Esta é a situação mais crítica registrada desde o início do Argos Predict.

---

## 📋 Notas Técnicas

- **BUG_REOPEN_BY_MODULE:** 0 bugs reabertos no período. Nenhum bug foi formalmente marcado como "Resolvido" no DEV4 nos últimos 14 dias (JQL retornou 0 resultados) — sinal preocupante: os bugs não estão sendo fechados formalmente.
- **AVG_RESOLUTION_TIME:** Indisponível (0 bugs resolvidos no período).
- **ENV_FAILURE_PATTERN:** Chat/Mensagens confirmado como environment_specific (staging 0.45 vs canary 0.12, Δ=0.33).
- **QA_FLAKINESS:** DEV4-4252 (CT-PERFIL-008) tinha flakiness 0.5 — resolvido pelo FoundationAPI#1126 em 01/06. Flakiness atual = 0 para todos os módulos com histórico.
- **STALENESS_BY_MODULE:** 26 novos arquivos de cenário não commitados (DEV4-4238 a DEV4-4330). Auditoria de staleness não foi executada por volume.
- **GH_PRIMARY_REPOS:** Não configurado — usados FoundationAPI, SPA, polichat-web-app por relevância de produto (não por ordem alphabética da config).
