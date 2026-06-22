# Argos Predict — Mapa de Risco Preditivo
> Gerado em: 2026-05-27 10:45 BRT _(atualizado ~16:30 BRT)_ | Projetos: SM + DEV4 | Janela: 14 dias
> Fontes: Jira Suporte (52 Em Triagem + 100 Aberto) + Jira Produto (33 backlog + 6 em dev) + KB local (6 arquivos) + Sentry (25 issues ativos) + GitHub Churn (11 PRs: polichat-web-app 371L, heimdall deploy, polichat-spa, jarvis)

---

## ⚡ Atualização Tarde — Novos Sinais (16:30 BRT)

> Novos bugs N1 abertos após as 10:45 + Sentry #99396 em crescimento

**Novos N1 Bugs (Chat/Mensagens):**
- [SM-7511](https://poli-digital.atlassian.net/browse/SM-7511): Novas mensagens não notificam o atendente ← WebSocket / soketi
- [SM-7498](https://poli-digital.atlassian.net/browse/SM-7498): Emojis aparecem automaticamente nas mensagens enviadas sem terem sido inseridos

**Novos N1 Bugs (Interface / omnispa):**
- [SM-7496](https://poli-digital.atlassian.net/browse/SM-7496): Extensão parou de funcionar após atualização da nova interface
- [SM-7485](https://poli-digital.atlassian.net/browse/SM-7485): Atalhos de teclado pararam de funcionar após atualização de layout

**Novos N1 Bugs (outros módulos):**
- [SM-7503](https://poli-digital.atlassian.net/browse/SM-7503): PDF não aparece na plataforma — interface antiga **e** nova ← Upload/Mídia
- [SM-7482](https://poli-digital.atlassian.net/browse/SM-7482): Erro ao tentar ativar usuário — mensagem de erro ao cliente ← Permissões/Roles
- [SM-7419](https://poli-digital.atlassian.net/browse/SM-7419): Sistema não consegue enviar notas fiscais para determinados e-mails ← Relatórios

**Sentry #99396 crescendo:** `omnispa` `TypeError: Cannot read properties of undefined (reading 'plugin')` — estava em 30 occ/19 usuários às 10:45, chegou a **94 eventos** às 16:30. Erro está escalando.

---

## 📊 Sumário Executivo

| Indicador | Valor |
|---|---|
| 🔴 SM Em Triagem — N2 investigando | 52 bugs confirmados |
| 🟡 SM Aberto — N1 ativo | 100 tickets (~18 Bugs, ~28 Solicitações, ~19 Dúvidas, ~6 Histórias) |
| 🛠️ DEV4 em backlog/ready | 30 cards |
| ⚡ DEV4 em desenvolvimento ativo | 4 cards |
| 🔧 Cards corretivos em dev | 1 (DEV4-4078) |
| ⚠️ Features em área instável em dev | 2 (DEV4-4023 e DEV4-4229) |
| ✨ Features em área estável em dev | 1 (DEV4-4158) |
| 💣 Módulos com bomba ativa | 3 (Chat/Mensagens, Canais, Distribuição) |
| 🚨 Sentry — maior impacto | omnispa 404 (12.881 occ, **3.347 usuários**) — sem bug N2 correspondente |
| 📈 Módulos com risco crescente vs ontem | 3 (Chat +18, Canais +7, CRM +7) |
| 📉 Módulos com risco reduzido vs ontem | 5 (Nova Interface -17, Auth -27, Contatos -12, Upload -6, WebSocket -5) |

---

## 🗺️ Mapa de Risco por Módulo

---

#### 🔴 ALTO — Chat / Mensagens ↗️+18 vs ontem (pontuação: 68 | técnico: 15 | usuários: 53)

**🔥 O problema atual:**
> Chat é o módulo com maior risco absoluto do sistema. 8 bugs N2 confirmados com delays de mensagem (20-30 min), falhas de entrega em grupos, impossibilidade de responder com 2 canais ativos e loading de mensagens lento. O Sentry confirma: `polichat-spa` com **1.817 usuários** afetados por erro de mime encoder e `polichat-web-app` com **765 usuários** em Undefined array key 0. O corretivo DEV4-4078 está em desenvolvimento mas cobre apenas o ícone ⏳ via WebSocket — os outros 7 bugs N2 não têm DEV4 corretivo associado.

**🧠 Fragilidade documentada na KB:**
> `polichat-web-app` é o pipeline principal de mensageria — todo inbound/outbound passa por ele antes do `foundation-api`. Qualquer falha afeta 100% do fluxo. Regra de ciclo de vida: never skip `attending` — violação frequente que causa estados inconsistentes e mensagens presas.

**📋 Bugs confirmados — SM Em Triagem (N2):** 8 bugs
- [SM-5910](https://poli-digital.atlassian.net/browse/SM-5910): Mensagens demoram para aparecer nos usuários após certo tempo
- [SM-5430](https://poli-digital.atlassian.net/browse/SM-5430): Mensagens chegando com atraso de 20-30 minutos na plataforma
- [SM-5334](https://poli-digital.atlassian.net/browse/SM-5334): Não é possível responder mensagens quando cliente envia para dois canais diferentes
- [SM-5401](https://poli-digital.atlassian.net/browse/SM-5401): Filtro de não lidos não funciona corretamente
- [SM-4996](https://poli-digital.atlassian.net/browse/SM-4996): Lentidão no carregamento de mensagens/chamados
- [SM-5033](https://poli-digital.atlassian.net/browse/SM-5033): Usuários não conseguem enviar mensagens para contato específico
- [SM-2581](https://poli-digital.atlassian.net/browse/SM-2581): Problema ao Enviar Mensagens e Encerrar Chats
- [SM-5245](https://poli-digital.atlassian.net/browse/SM-5245): Grupos não recebem mensagens dos operadores há quase uma semana

**SM N1 — Bugs recentes (Aberto, últimas 24-48h):** 7 bugs
- [SM-7470](https://poli-digital.atlassian.net/browse/SM-7470): Mensagens não são enviadas em conversa específica
- [SM-7469](https://poli-digital.atlassian.net/browse/SM-7469): Mensagens não chegam no canal e não aparecem na plataforma web
- [SM-7441](https://poli-digital.atlassian.net/browse/SM-7441): Mensagens de saudação e ausência não estão sendo entregues
- [SM-7425](https://poli-digital.atlassian.net/browse/SM-7425): Atraso na entrega de mensagens — mensagens do dia anterior entregues só no dia seguinte
- [SM-7422](https://poli-digital.atlassian.net/browse/SM-7422): Mensagens não lidas não aparecem ou aparecem com atraso
- [SM-7402](https://poli-digital.atlassian.net/browse/SM-7402): Cliente não consegue responder conversas após template enviado
- [SM-7444](https://poli-digital.atlassian.net/browse/SM-7444): Atalho CTRL+1 para mensagens rápidas não funciona no construtor de templates

**🚨 Sentry — erros em produção:**
- `polichat-spa` "Error: There is already an encoder stored (mime type)" — **8.551 occ | 1.817 usuários** ← encoder quebrado
- `polichat-web-app` "ErrorException: Undefined array key 0" — **12.011 occ | 765 usuários**
- `foundationapi` "MessageSenderException: Créditos insuficientes" — **8.344 occ | 758 usuários**
- `polichat-web-app` "ErrorException: Attempt to read property 'id' on null" — 1.702 occ | 202 usuários
- `polichat-web-app` "Exception: Mensagem não encontrada" — 9.564 occ | 90 usuários

**📊 Code Churn (últimos 14 dias):**
- `polichat-web-app`: 5 PRs | 576 linhas | **4 autores** → churn>500 (+2 SCORE_TEC) + ownership difuso (+1)
- `polichat-spa`: 1 PR | 1.013 linhas | 1 autor → churn>500 (+2 SCORE_TEC)
> ⚠️ Dois repos centrais de Chat em churn simultâneo com ownership difuso em polichat-web-app — risco de integração elevado.

**🔶 QA Flakiness (histórico local):**
> Chat/Mensagens: taxa de flakiness 50% (CT-07 em DEV4-4114) → cenários de WebSocket/timing instáveis em CI. Timeout duplicado aplicado automaticamente.

**⚡ O que está em desenvolvimento agora:**

| Card | Classificação | O que faz | Por que importa |
|---|---|---|---|
| [DEV4-4078](https://poli-digital.atlassian.net/browse/DEV4-4078) | 🔧 Corretivo | Corrige ícone ⏳ permanente via WebSocket/store | Cobre SM-5910, SM-5916 — mas os 7 outros bugs N2 ficam sem fix |
| [DEV4-4229](https://poli-digital.atlassian.net/browse/DEV4-4229) | ⚠️ Feature em área instável | Filtros, edição e criação de agendamentos de mensagem | Novo fluxo de envio sobre camada com 8 bugs ativos — risco de regressão alto |

**🛠️ Cards em backlog/ready que vão mexer neste módulo:** 2
- [DEV4-4164](https://poli-digital.atlassian.net/browse/DEV4-4164): Sugestão de envio de template Utility quando Marketing falhar _(⚠️ Feature instável | Pronto para dev | **Highest**)_
- [DEV4-4188](https://poli-digital.atlassian.net/browse/DEV4-4188): Criar evento "Atendimento finalizado" para API _(⚠️ Feature instável | Aguardando Handoff | Medium)_

**💣 Cenário de risco:**
> DEV4-4078 corrige apenas o ícone ⏳ via WebSocket. Os 7 outros bugs N2 de Chat (atraso de mensagens, grupos sem receber, filtro de não lidos) **não têm DEV4 corretivo ativo**. Enquanto isso, DEV4-4229 (agendamentos) adiciona `POST /api/v1/scheduled-messages` sobre a mesma store de mensagens — se entrar junto ao fix, pode introduzir novos caminhos quebrados. DEV4-4164 (Highest!) vem logo atrás. polichat-web-app e polichat-spa estão em churn simultâneo com 4 autores — ownership difuso em área com 8 bugs ativos é a combinação clássica de regressão.

**✅ Ação recomendada:**
> 1. Executar `/qa-executor DEV4-4078` antes do merge: focar C06 (F5 pós-entrega), C07 (F5 pós-leitura), C12 (reconexão WS), C05 (múltiplas msgs em sequência).
> 2. Bloquear merge de DEV4-4229 até DEV4-4078 estar em produção estável por 48h.
> 3. Criar cards corretivos para SM-5245 (grupos), SM-5430 (delay 20-30min) e SM-5334 (dois canais) — mais impactantes sem fix ativo.

---

#### 🔴 ALTO — Distribuição / Filas ↔️-1 vs ontem (pontuação: 52 | técnico: 8 | usuários: 44)

**🔥 O problema atual:**
> O serviço de distribuição continua sistematicamente quebrado. 10 bugs N2 confirmados, zero corretivos em desenvolvimento. Bots não distribuem, chats ficam presos em "sem atendente", atribuições automáticas falham silenciosamente. O `dispatch` gerou **9.766 erros** em processos background no Sentry. Cada erro = um chat não distribuído. 4 novos bugs N1 abertos hoje.

**🧠 Fragilidade documentada na KB:**
> `dispatch-service` usa Redis lock para geração de LID — race condition documentada em alto volume pode causar duplicação ou falha silenciosa de atribuição.

**📋 Bugs confirmados — SM Em Triagem (N2):** 10 bugs
- [SM-5918](https://poli-digital.atlassian.net/browse/SM-5918): Chats ficando na aba 'sem atendente' sem distribuir para atendentes
- [SM-5911](https://poli-digital.atlassian.net/browse/SM-5911): Encaminhamento de clientes para filas não funciona corretamente
- [SM-5716](https://poli-digital.atlassian.net/browse/SM-5716): Distribuição do bot não está coerente com o fluxo
- [SM-4668](https://poli-digital.atlassian.net/browse/SM-4668): Problema com redirecionamento de bots
- [SM-3958](https://poli-digital.atlassian.net/browse/SM-3958): Bot não direcionando
- [SM-5016](https://poli-digital.atlassian.net/browse/SM-5016): Mensagens não sendo direcionadas automaticamente após implantação
- [SM-3840](https://poli-digital.atlassian.net/browse/SM-3840): Bot funciona de forma intermitente
- [SM-3927](https://poli-digital.atlassian.net/browse/SM-3927): Falha na Ativação do Bot — Mensagem sem Geração de Chat_ID
- [SM-2099](https://poli-digital.atlassian.net/browse/SM-2099): Falha no Redirecionamento Automático _(85 dias em aberto)_
- [SM-2035](https://poli-digital.atlassian.net/browse/SM-2035): Erro na atribuição automática de atendentes _(88 dias em aberto)_

**SM N1 — Bugs recentes (Aberto):** 4 bugs novos
- [SM-7461](https://poli-digital.atlassian.net/browse/SM-7461): Distribuição não segue regras configuradas em departamento específico
- [SM-7452](https://poli-digital.atlassian.net/browse/SM-7452): Chats caindo para 'sem atendente' mesmo com atendentes disponíveis
- [SM-7415](https://poli-digital.atlassian.net/browse/SM-7415): Falha no sistema de distribuição — mensagens indo para lugar errado
- [SM-7401](https://poli-digital.atlassian.net/browse/SM-7401): Chat não direciona alguns clientes mesmo com robô configurado

**🚨 Sentry — erros em produção:**
- `dispatch` "Chat created" — 4.403 occ | 0 usuários (processo background)
- `dispatch` "Distribute to department" — 2.781 occ | 0 usuários
- `dispatch` "Distribute from the queue" — 2.376 occ | 0 usuários
- `dispatch` "Assign on first login" — 206 occ | 0 usuários
> 9.766 erros de background = 9.766 chats com falha de distribuição no período.

**⚡ O que está em desenvolvimento agora:**
_(Nenhum card corretivo ativo de distribuição em dev)_

**🛠️ Cards em backlog que vão mexer neste módulo:** 1
- [DEV4-4003](https://poli-digital.atlassian.net/browse/DEV4-4003): Tela de Gestão de Chats para Gestor e Supervisor _(⚠️ Feature instável | Pronto para dev | Medium | Epic)_

**💣 Cenário de risco:**
> 10 bugs N2 + 4 novos N1 hoje = 14 bugs ativos com zero corretivos em desenvolvimento. O único DEV4 é uma feature nova (tela de gestão sobre uma fila quebrada). SM-2099 (85d) e SM-2035 (88d) são os mais antigos tickets de todo o sistema — crônicos, sem fix, confirmados como bugs.

**✅ Ação recomendada:**
> 1. Criar sprint de bugs Distribuição focando SM-5918 (chats presos), SM-5911 (encaminhamento falha) e SM-5716 (bot incoerente).
> 2. Bloquear DEV4-4003 (tela de gestão) até ao menos 3 dos 10 bugs N2 serem resolvidos.

---

#### 🟡 MÉDIO — Canais / WhatsApp / WABA ↗️+7 vs ontem (pontuação: 47 | técnico: 6 | usuários: 41)

**🔥 O problema atual:**
> 10 bugs N2 confirmados em canais: falha ACK 0 em contatos @lid, Instagram desconectado, Badge Leads sem envio, templates WABA desabilitados. O `channel-customer` está com `channelsCustomerFindIncludingDeleted is not defined` — ReferenceError em runtime que pode afetar toda consulta de canal. DEV4-4023 (PLBV — estrutura WABA/Meta) está em desenvolvimento ativo, adicionando camada de verificação sobre módulo com 10 bugs não resolvidos.

**🧠 Fragilidade documentada na KB:**
> WABA janela 24h: regra frequentemente mal compreendida por operadores — após 24h sem resposta, só templates aprovados podem ser enviados. Violação gera erros silenciosos ou bloqueios de envio.

**📋 Bugs confirmados — SM Em Triagem (N2):** 10 bugs
- [SM-5831](https://poli-digital.atlassian.net/browse/SM-5831): CHATSHUB Falha de Envio (ACK 0) — Contatos @lid sem Número Vinculado
- [SM-5412](https://poli-digital.atlassian.net/browse/SM-5412): Cliente não consegue enviar mensagens pelo canal Badge Leads
- [SM-5383](https://poli-digital.atlassian.net/browse/SM-5383): Instagram mostra desconectado mesmo após reconectar
- [SM-5300](https://poli-digital.atlassian.net/browse/SM-5300): Falha recorrente ao criar templates de mensagem
- [SM-3017](https://poli-digital.atlassian.net/browse/SM-3017): Botão "Enviar Template" desabilitado — Interface Legada (WABA)
- [SM-4761](https://poli-digital.atlassian.net/browse/SM-4761): Instabilidade no acesso e recebimento de mensagens
- [SM-5423](https://poli-digital.atlassian.net/browse/SM-5423): Chatbot parou de funcionar no feriado — não envia opções de menu
- [SM-5181](https://poli-digital.atlassian.net/browse/SM-5181): Cliente não consegue enviar número por um canal específico
- [SM-4820](https://poli-digital.atlassian.net/browse/SM-4820): Demora e falha na entrega de mensagens do WhatsApp
- [SM-2678](https://poli-digital.atlassian.net/browse/SM-2678): Canal não envia mensagem _(68 dias em aberto)_

**SM N1 — Bugs recentes (Aberto):** 3 novos bugs
- [SM-7476](https://poli-digital.atlassian.net/browse/SM-7476): Cliente não consegue enviar template para nenhum contato
- [SM-7453](https://poli-digital.atlassian.net/browse/SM-7453): Mensagens do Instagram não chegam para as atendentes
- [SM-7393](https://poli-digital.atlassian.net/browse/SM-7393): Número WABA dá erro ao enviar para identificador do chatweb

**🚨 Sentry — erros em produção:**
- `channel-customer` "ReferenceError: channelsCustomerFindIncludingDeleted is not defined" — 227 occ | 0 usuários ← código quebrado em runtime
- `foundationapi` "WebhookDeliveryException: Webhook delivery failed" — **37.794 occ** | 0 usuários ← pipeline de entrega com falha massiva

**⚡ O que está em desenvolvimento agora:**

| Card | Classificação | O que faz | Por que importa |
|---|---|---|---|
| [DEV4-4023](https://poli-digital.atlassian.net/browse/DEV4-4023) | ⚠️ Feature em área instável | Estrutura base do PLBV (verificação de negócio WABA/Meta) | Adiciona ciclo de vida WABA/Meta sobre módulo com 10 bugs ativos |

**🛠️ Cards em backlog que vão mexer neste módulo:** 3
- [DEV4-4164](https://poli-digital.atlassian.net/browse/DEV4-4164): Sugestão de template Utility quando Marketing falhar _(⚠️ Instável | Pronto para dev | **Highest**)_
- [DEV4-4087](https://poli-digital.atlassian.net/browse/DEV4-4087): Detecção de mudança de categoria de template pela Meta _(⚠️ Instável | Aguardando Handoff | Medium)_
- [DEV4-4198](https://poli-digital.atlassian.net/browse/DEV4-4198): Atualizar Embedded Signup para v4.0 _(⚠️ Instável | Aguardando Handoff | Medium)_

**💣 Cenário de risco:**
> DEV4-4023 (PLBV) define estados e transições de verificação WABA/Meta e integra com a Meta via API externa. Se entrar com 10 bugs de canais em aberto, qualquer falha de entrega durante verificação pode ser confundida com falha de compliance. O `channelsCustomerFindIncludingDeleted is not defined` pode estar silenciando erros de canal em todo o sistema.

**✅ Ação recomendada:**
> 1. Corrigir `channelsCustomerFindIncludingDeleted` no `channel-customer` antes de qualquer nova feature de canais.
> 2. Criar card corretivo para SM-5831 (ACK 0 @lid) — provavelmente correlacionado com a estrutura BSUID que DEV4-4023 vai alterar.
> 3. Executar `/qa-executor DEV4-4023` com smoke test de integridade dos canais existentes.

---

#### 🟡 MÉDIO — Nova Interface / omnispa ↘️-17 vs ontem (pontuação: 30 | técnico: 5 | usuários: 25)

**🔥 O problema atual:**
> O score caiu 17 pontos vs ontem — mas o Sentry piorou com **dois novos erros hoje** (2026-05-27): `Uncompressed Asset` (299 usuários) e `plugin undefined` (19 usuários). O `AxiosError: 404` continua com **3.347 usuários** — o maior userCount de toda a plataforma — sem nenhum card corretivo ativo.

**📋 Bugs confirmados — SM Em Triagem (N2):** 5 bugs
- [SM-5326](https://poli-digital.atlassian.net/browse/SM-5326): Nova versão do sistema está muito lenta _(34 dias)_
- [SM-5311](https://poli-digital.atlassian.net/browse/SM-5311): Cliente não consegue acessar a plataforma — tela em branco _(34 dias)_
- [SM-5308](https://poli-digital.atlassian.net/browse/SM-5308): Conversas não estão abrindo na plataforma _(34 dias)_
- [SM-2209](https://poli-digital.atlassian.net/browse/SM-2209): Loading infinito na aba de chats _(83 dias)_
- [SM-2151](https://poli-digital.atlassian.net/browse/SM-2151): Plataforma Travando _(84 dias)_

**🚨 Sentry — erros em produção:**
- `omnispa` "AxiosError: Request failed with status code 404" — **12.881 occ | 3.347 usuários** ← maior userCount da plataforma
- `omnispa` "AxiosError: Network Error" — **1.713 occ | 777 usuários**
- `omnispa` "Uncompressed Asset" — 309 occ | **299 usuários** ← 🆕 **NOVO HOJE (2026-05-27)**
- `omnispa` "AxiosError: Network Error" — 1.710 occ | 112 usuários
- `omnispa` "AxiosError: Network Error" — 1.701 occ | 119 usuários
- `omnispa` "TypeError: a.launchSurvey is not a function" — 714 occ | 232 usuários
- `omnispa` "Error: AbortError: AbortError" — 279 occ | 100 usuários
- `omnispa` "TypeError: Cannot read properties of undefined ('plugin')" — 30 occ | 19 usuários ← 🆕 **NOVO HOJE**

**⚡ O que está em desenvolvimento agora:**
_(Nenhum card ativo exclusivo de omnispa em dev)_

**🛠️ Cards em backlog que vão mexer neste módulo:** 3
- [DEV4-4166](https://poli-digital.atlassian.net/browse/DEV4-4166): Nova Estrutura de Páginas na Nova Interface _(⚠️ Instável | Pronto para dev | High | Epic)_
- [DEV4-4202](https://poli-digital.atlassian.net/browse/DEV4-4202): Novas contas indexadas na Nova Interface por padrão _(⚠️ Instável | Aguardando Handoff | Medium)_
- [DEV4-4227](https://poli-digital.atlassian.net/browse/DEV4-4227): Remover filtro "Cliente aguardando" de produção _(🔧 Remoção de feature | Pronto para dev | Medium)_

**💣 Cenário de risco:**
> `Uncompressed Asset` com 299 usuários em um único dia sugere artefato de build mal comprimido — possível rastro de deploy parcial ou configuração de CDN incorreta. DEV4-4166 (Epic de Páginas, Pronto para dev) pode entrar em qualquer momento — reorganizar rotas sobre omnispa com 404 crônico e artefatos incorretos é alto risco.

**✅ Ação recomendada:**
> 1. Investigar OMNISPA-2QCP (`Uncompressed Asset`) imediatamente: checar CDN e pipeline de build do omnispa.
> 2. Spike: qual endpoint retorna 404 no omnispa? Verificar campo `culprit` do OMNISPA-1ZWW no Sentry.
> 3. Bloquear DEV4-4166 e DEV4-4202 até o spike ser concluído.

---

#### 🟡 MÉDIO — CRM / Integrações Externas ↗️+7 vs ontem (pontuação: 22 | técnico: 7 | usuários: 15)

**🔥 O problema atual:**
> A integração CRM está falhando sistematicamente com 50.000+ erros de `CRMException: Não autenticado` em processos background — possível token de integração expirado. Além disso, 3 clusters afetam operadores reais: `polichat-web-app` com **209 usuários** em erros de CRM. O `FoundationAPI` teve **18 PRs mesclados** em 14 dias com 27.549 linhas e 5 autores — maior churn de todo o sistema.

**📋 Bugs confirmados — SM Em Triagem (N2):** 2 bugs
- [SM-5098](https://poli-digital.atlassian.net/browse/SM-5098): Contato não aparece na busca de oportunidades do CRM _(37 dias)_
- [SM-4636](https://poli-digital.atlassian.net/browse/SM-4636): Problema de duplicação de funil para outro funil _(43 dias)_

**🚨 Sentry — erros em produção:**
- `foundationapi` "CRMException: Não autenticado" — **13.545 occ** | 0 usuários (background)
- `foundationapi` "HTTP request returned status code 401" — **8.372 occ** | 0 usuários (background)
- `polichat-web-app` "GuzzleHttp: POST api.crm.poli.d..." — 3.196 occ | **209 usuários**
- `polichat-web-app` "CRMException: Já existe uma etiqueta" — 3.199 occ | **209 usuários**
- `polichat-web-app` "GuzzleHttp: POST api.crm.poli.d..." — 5.420 occ | **165 usuários**
- `foundationapi` "CRMException: Não autenticado" — **16.663 occ** | 0 usuários (background)
- `foundationapi` "HTTP request returned status code 401" — **10.327 occ** | 0 usuários (background)
- `foundationapi` "JarvisClientException: 404 Not Found" — 193 occ | **103 usuários** (Jarvis integrado)

**📊 Code Churn:** `FoundationAPI`: 18 PRs | 27.549 linhas | **5 autores** → maior churn do sistema com ownership difuso.

**✅ Ação recomendada:**
> 1. Verificar se o token de integração CRM está expirado — 50.000+ ocorrências de `Não autenticado` em background é signal claro de credencial inválida.
> 2. Auditar os 18 PRs do FoundationAPI: algum alterou a camada de autenticação CRM?

---

#### 🟡 MÉDIO — Upload / Mídia ↘️-6 vs ontem (pontuação: 22 | técnico: 7 | usuários: 15)

**🧠 Fragilidade documentada na KB:**
> `media-manager`: bug de PDF >10MB — TypeError silencioso sem feedback ao usuário. S3 como backend sem fallback documentado.

**📋 Bugs confirmados — SM N2:** 3 bugs
- [SM-5880](https://poli-digital.atlassian.net/browse/SM-5880): Áudio não reproduz ao tentar ouvir pela resposta _(27 dias)_
- [SM-2091](https://poli-digital.atlassian.net/browse/SM-2091): Cliente não consegue enviar PDF _(85 dias)_
- [SM-5438](https://poli-digital.atlassian.net/browse/SM-5438): Backup não está sendo liberado para download _(33 dias)_

**SM N1:** [SM-7434](https://poli-digital.atlassian.net/browse/SM-7434): Backup de mensagens incompleto — exportou apenas mensagens de maio

**🚨 Sentry:**
- `polichat-web-app` "S3Exception: Error executing PutObject" — 2.252 occ | **202 usuários**
- `polichat-web-app` "ErrorException: rename(/var/www/.../tmp/...)" — 1.417 occ | **168 usuários**

**✅ Ação recomendada:**
> Criar card corretivo para SM-2091 (PDF não envia, 85 dias). O S3Exception/PutObject pode ser o mesmo bug. Verificar permissões IAM do bucket S3 e espaço em `/tmp`.

---

#### 🟢 BAIXO — Permissões / Roles ↔️±0 vs ontem (pontuação: 16 | técnico: 4 | usuários: 12)

**⚠️ Bug de Privacidade crítico (57 dias sem DEV4):**
> [SM-3211](https://poli-digital.atlassian.net/browse/SM-3211): "[PRIVACIDADE] Operador acessando chats de terceiros via Pop-up" — violação de isolamento de dados entre operadores há 57 dias sem corretivo. Crítico para compliance.

**📋 Bugs confirmados — SM N2:** 3 bugs
- [SM-5905](https://poli-digital.atlassian.net/browse/SM-5905): Filtro de departamento não funciona para perfil Supervisor _(27 dias)_
- [SM-3211](https://poli-digital.atlassian.net/browse/SM-3211): **[PRIVACIDADE]** Operador acessando chats de terceiros via Pop-up _(57 dias)_ ← 🔴 Crítico
- [SM-2037](https://poli-digital.atlassian.net/browse/SM-2037): Erro 403 ao criar etiquetas _(88 dias)_

**🚨 Sentry:**
- `revendedor-api` "Exception: 403 Forbidden" — **15.642 occ | 432 usuários**
- `revendedor-api` "Exception: 403 Forbidden" — 596 occ | 124 usuários

**✅ Ação recomendada:** Criar DEV4 corretivo com prioridade Highest para SM-3211. Risco reputacional e de compliance é alto.

---

#### 🟢 BAIXO — WebSocket / Presença ↘️-5 vs ontem (pontuação: 15 | técnico: 7 | usuários: 8)

**📋 SM N2:** [SM-5916](https://poli-digital.atlassian.net/browse/SM-5916): Usuário aparece offline mesmo estando conectado — mensagens não transferidas _(27 dias)_

**🚨 Sentry:** `omnispa` + `polichat-spa` "AxiosError: Network Error" — **1.013 occ cumulativo | 777 usuários** (maior cluster). Indicativo de desconexões WebSocket em escala.

> DEV4-4078 (em dev) corrige WebSocket de status de mensagem — pode impactar SM-5916 (presença). Cobrir nos testes.

---

#### 🟢 BAIXO — Autenticação ↘️-27 vs ontem (pontuação: 13 | técnico: 5 | usuários: 8)

> ⚠️ A queda de -27 reflete realocação semântica de tickets para os módulos corretos (Nova Interface, CRM). Os sinais Sentry de 401 continuam fortes.

**📋 SM N2:** [SM-5311](https://poli-digital.atlassian.net/browse/SM-5311): Tela em branco ao acessar plataforma _(34 dias)_

**🚨 Sentry — sessões expirando em escala:**
- `polichat-spa` "AxiosError: 401" — **4.402 occ | 1.346 usuários** + variantes (251 + 77 usuários)

**📊 Churn:** `heimdall` (serviço de auth): 1 PR | 154 linhas — mudança recente.

**🛠️ Backlog:** 4 cards de 2FA aguardando (DEV4-4136 Epic + DEV4-4149, 4147, 4148) — quando entrarem, a camada de auth vai mudar completamente.

---

#### 🟢 BAIXO — Contatos ↘️-12 vs ontem (pontuação: 11 | técnico: 0 | usuários: 11)

**📋 SM N2:** [SM-5912](https://poli-digital.atlassian.net/browse/SM-5912): Pesquisa de contatos não localiza registros existentes _(27 dias)_

**SM N1:** [SM-7463](https://poli-digital.atlassian.net/browse/SM-7463): Busca de contatos não retorna resultados | [SM-7465](https://poli-digital.atlassian.net/browse/SM-7465): Melhoria na usabilidade da busca (História)

---

#### 🟢 BAIXO — Jarvis / IA 🆕 novo módulo (pontuação: 9 | técnico: 4 | usuários: 5)

**📋 SM N2:** [SM-5906](https://poli-digital.atlassian.net/browse/SM-5906): Transcrição de áudio não funciona para alguns perfis _(27 dias)_

**🚨 Sentry:** `foundationapi` "JarvisClientException: Nenhuma mensagem encontrada" — 193 occ | **103 usuários** | `jarvis` "Slow DB Query" — 928 occ

---

## 🔍 Sinais Ocultos — Erros em Produção sem SM Ticket

> Issues Sentry com alto impacto (userCount > 10) sem ticket SM ativo correspondente. Problemas que afetam usuários reais mas **não estão no radar do suporte**.

| Erro | Projeto | Ocorrências | Usuários | Primeiro visto | Módulo | Risco |
|---|---|---|---|---|---|---|
| `AxiosError: Request failed with status code 404` | omnispa | 12.881 | **3.347** | 2026-05-13 | Nova Interface | 🔴 Maior userCount da plataforma, sem ticket N2 |
| `Error: There is already an encoder stored (mime type)` | polichat-spa | 8.551 | **1.817** | 2026-05-13 | Chat/Mensagens | 🔴 Encoder mime quebrado — impacto em envio de mídia |
| `AxiosError: Request failed with status code 401` | polichat-spa | 4.402 | **1.346** | 2026-05-13 | Autenticação | 🟡 Sessões expirando em escala |
| `<unknown>` | polichat-spa | 3.402 | **958** | 2026-05-13 | ? | 🟡 Erro não capturado, 958 usuários afetados |
| `Exception: The requested URL returned error: 403` | revendedor-api | 15.642 | **432** | 2026-05-13 | Permissões | 🟡 API de revendedor com 403 crônico |
| `Uncompressed Asset` | omnispa | 309 | **299** | **2026-05-27** 🆕 | Nova Interface | 🔴 **NOVO HOJE** — artefato de build problemático |
| `TypeError: a.launchSurvey is not a function` | omnispa | 714 | **232** | 2026-05-13 | Nova Interface | 🟡 Função survey não carregada no omnispa |
| `ErrorException: rename(/var/www/.../tmp/...)` | polichat-web-app | 1.417 | **168** | 2026-05-13 | Upload/Mídia | 🟡 Falha de rename em upload temporário |
| `AxiosError: Network Error` | omnispa | 1.713 | **777** | 2026-05-13 | WebSocket | 🟡 Desconexões em escala |

> **⚠️ Alerta hoje:** OMNISPA-2QCP ("Uncompressed Asset", 299 usuários) e OMNISPA-2QCN (plugin undefined, 19 usuários) são novos de 2026-05-27 — possível rastro de deploy recente no omnispa.

---

## 💣 Top 3 — Módulos Bomba (Maior Risco Imediato)

> BOMBA_SCORE = SCORE_TOTAL + corretivo_ativo(+5) + feature_instável(+4) + trend_↗️(+3) + userCount>100(+2) + crônico>60d(+2) + bugs_N2_sem_DEV4(+3)

---

### 💣 #1 — Chat / Mensagens (BOMBA_SCORE: 85)

**68 + 5 (DEV4-4078 corretivo ativo) + 4 (DEV4-4229 feature instável) + 3 (TREND ↗️ +18) + 2 (Sentry userCount 1.817 > 100) + 3 (7 bugs N2 sem DEV4 corretivo)**

Chat é o epicentro do risco atual. Um corretivo em dev que cobre apenas 1 dos 8 bugs, uma feature sendo adicionada sobre a mesma camada quebrada, churn duplo em repos centrais com 4 autores, 1.817 usuários afetados por mime encoder sem ticket no suporte, e 7 novos bugs N1 abertos hoje. É o módulo com mais variáveis de risco simultâneas do sistema.

**Ação imediata:** `/qa-executor DEV4-4078` antes do merge. Bloquear DEV4-4229 até DEV4-4078 estável em produção 48h.

---

### 💣 #2 — Canais / WhatsApp / WABA (BOMBA_SCORE: 57)

**47 + 4 (DEV4-4023 feature instável ativo) + 3 (TREND ↗️ +7) + 3 (10 bugs N2 sem DEV4 corretivo)**

10 bugs N2 com DEV4-4023 (PLBV/Meta) sendo construído por cima. O `channelsCustomerFindIncludingDeleted is not defined` é código quebrado em runtime silenciando erros de canal. Com DEV4-4164 (Highest!) chegando no backlog e DEV4-4023 em dev, o risco de amplificar bugs existentes é alto.

**Ação imediata:** Corrigir ReferenceError em `channel-customer`. Executar `/qa-executor DEV4-4023` com smoke test de canais.

---

### 💣 #3 — Distribuição / Filas (BOMBA_SCORE: 55)

**52 + 3 (10 bugs N2 sem DEV4 corretivo)**

Zero corretivos para 10 bugs N2 + 4 novos N1 hoje. O dispatch falhou 9.766 vezes em 14 dias. SM-2099 (85 dias) e SM-2035 (88 dias) são os tickets mais antigos de todo o sistema — confirmados, crônicos, sem fix. Distribuição não vai melhorar sozinha: sem sprint de bugs específico, esse módulo vai continuar produzindo novos N1 diariamente.

**Ação imediata:** Criar sprint de bugs Distribuição (SM-5918, SM-5911, SM-5716). Bloquear DEV4-4003 até bugs críticos resolvidos.

---

## 📊 Tabela Consolidada de Risco

| Módulo | Nível | Score Total | Técnico | Usuários | Tendência | BOMBA |
|---|---|---|---|---|---|---|
| Chat / Mensagens | 🔴 ALTO | 68 | 15 | 53 | ↗️ +18 | **85** |
| Distribuição / Filas | 🔴 ALTO | 52 | 8 | 44 | ↔️ -1 | 55 |
| Canais / WhatsApp | 🟡 MÉDIO | 47 | 6 | 41 | ↗️ +7 | **57** |
| Nova Interface | 🟡 MÉDIO | 30 | 5 | 25 | ↘️ -17 | 35 |
| CRM / Integrações | 🟡 MÉDIO | 22 | 7 | 15 | ↗️ +7 | 27 |
| Upload / Mídia | 🟡 MÉDIO | 22 | 7 | 15 | ↘️ -6 | 27 |
| Permissões / Roles | 🟢 BAIXO | 16 | 4 | 12 | ↔️ ±0 | 23 |
| WebSocket / Presença | 🟢 BAIXO | 15 | 7 | 8 | ↘️ -5 | 20 |
| Autenticação | 🟢 BAIXO | 13 | 5 | 8 | ↘️ -27 | 15 |
| Contatos | 🟢 BAIXO | 11 | 0 | 11 | ↘️ -12 | 14 |
| Jarvis / IA | 🟢 BAIXO | 9 | 4 | 5 | 🆕 novo | 12 |

---

## 🔎 Recomendações Prioritárias

| Prioridade | Ação | Módulo | Urgência |
|---|---|---|---|
| P0 | Executar `/qa-executor DEV4-4078` antes do merge | Chat | Hoje |
| P0 | Investigar `Uncompressed Asset` omnispa (OMNISPA-2QCP, novo hoje, 299 usuários) | Nova Interface | Hoje |
| P0 | Criar DEV4 corretivo Highest para SM-3211 (furo de privacidade, 57 dias) | Permissões | Hoje |
| P1 | Bloquear DEV4-4229 até DEV4-4078 em produção estável 48h | Chat | Esta semana |
| P1 | Criar sprint de bugs Distribuição (SM-5918, SM-5911, SM-5716) | Distribuição | Esta semana |
| P1 | Corrigir `channelsCustomerFindIncludingDeleted` ReferenceError em runtime | Canais | Esta semana |
| P1 | Spike: qual endpoint retorna 404 no omnispa? Verificar `culprit` OMNISPA-1ZWW | Nova Interface | Esta semana |
| P2 | Verificar token de integração CRM expirado (50.000+ erros 401 em background) | CRM | Esta semana |
| P2 | Criar corretivo SM-2091 (PDF não envia, 85 dias) + investigar S3Exception | Upload | Próxima sprint |
| P2 | Bloquear DEV4-4166 (Epic Páginas) e DEV4-4202 até spike omnispa concluído | Nova Interface | Próxima sprint |
| P2 | Investigar mime encoder error (POLICHAT-SPA-CZ, 1.817 usuários) — criar SM ticket | Chat | Próxima sprint |

---

*Argos Predict — gerado por Claude Code (Sonnet 4.6) em 2026-05-27*
*Base: SM (Jira Service Management) + DEV4 (Jira Software) + Sentry (self-hosted) + GitHub (4 repos) + KB local*
