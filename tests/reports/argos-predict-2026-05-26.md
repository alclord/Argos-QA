# Argos Predict — Mapa de Risco Preditivo
> Gerado em: 2026-05-26 19:30 BRT | Projetos: SM + DEV4 | Janela: 14 dias
> Fontes: Jira Suporte (52 Em Triagem + 100 Aberto) + Jira Produto (31 backlog + 3 em dev) + KB local (6 arquivos) + Sentry (100 issues)

---

## 📊 Sumário Executivo

| Indicador | Valor |
|---|---|
| 🔴 SM Em Triagem — N2 investigando | 50 bugs confirmados |
| 🟡 SM Aberto — N1 ativo | 100+ tickets |
| 🛠️ DEV4 em backlog/ready | 30 cards |
| ⚡ DEV4 em desenvolvimento ativo | 3 cards |
| 🔧 Cards corretivos em dev | 1 (DEV4-4078) |
| ⚠️ Features em área instável em dev | 1 (DEV4-4229) |
| ✨ Features em área estável em dev | 1 (DEV4-4023) |
| 💣 Módulos com bomba ativa | 3 (Chat/WebSocket, Interface omnispa, Auth/2FA) |
| 🚨 Sentry — maior impacto | omnispa 422 (12.800 occ, **3.306 usuários**) — sem bug N2 correspondente |

---

## 🗺️ Mapa de Risco por Módulo

---

### 🔴 ALTO — Distribuição / Filas (pontuação: 53)

**🔥 O problema atual:**
> O serviço de distribuição está quebrado em múltiplos pontos: bots não estão sendo direcionados corretamente, chats ficam presos na fila "sem atendente" sem nunca serem distribuídos, e atribuições automáticas falham silenciosamente. São **10 bugs N2 confirmados** — o módulo com mais bugs N2 confirmados em toda a plataforma.

**🧠 Fragilidade documentada na KB:**
> `dispatch-service` usa Redis lock para geração de LID — race condition em alto volume pode causar duplicação ou falha silenciosa de atribuição. Serviço separado, sem fallback documentado.

**📋 Bugs confirmados — SM Em Triagem (N2):** 10 bugs
- [SM-5716](https://poli-digital.atlassian.net/browse/SM-5716): Distribuição do bot não está coerente com o fluxo
- [SM-5911](https://poli-digital.atlassian.net/browse/SM-5911): Encaminhamento de clientes para filas não funciona corretamente
- [SM-5918](https://poli-digital.atlassian.net/browse/SM-5918): Chats ficando na aba 'sem atendente' sem distribuir para atendentes
- [SM-4668](https://poli-digital.atlassian.net/browse/SM-4668): Problema com redirecionamento de bots
- [SM-3958](https://poli-digital.atlassian.net/browse/SM-3958): Bot não direcionando
- [SM-5016](https://poli-digital.atlassian.net/browse/SM-5016): Mensagens não sendo direcionadas automaticamente após implantação
- [SM-3840](https://poli-digital.atlassian.net/browse/SM-3840): Bot funciona de forma intermitente
- [SM-3927](https://poli-digital.atlassian.net/browse/SM-3927): Falha na Ativação do Bot — Mensagem sem Geração de Chat_ID
- [SM-2099](https://poli-digital.atlassian.net/browse/SM-2099): Falha no Redirecionamento Automático
- [SM-2035](https://poli-digital.atlassian.net/browse/SM-2035): Erro na atribuição automática de atendentes

**🚨 Sentry — erros em produção:**
- `dispatch` "Distribute to department" — 2.812 occ | processo interno | último: recente
- `dispatch` "Distribute from the queue" — 2.397 occ | processo interno | último: recente
- `dispatch` "Chat created" — 4.480 occ | processo interno | último: recente

> Os erros do dispatch têm `userCount = 0` (são processos internos/background), mas a frequência de **9.000+ ocorrências em 14 dias** indica falhas sistemáticas no pipeline de distribuição que se manifestam diretamente como os 10 bugs N2 acima.

**⚡ O que está em desenvolvimento agora:**
_(Nenhum card ativo de distribuição em dev — módulo sem fix ativo)_

**🛠️ Cards em backlog/ready que vão mexer neste módulo:** 1
- [DEV4-4003](https://poli-digital.atlassian.net/browse/DEV4-4003): Tela de Gestão de Chats para Gestor e Supervisor _(⚠️ Feature em área instável | Pronto para dev | Medium | Epic)_

**💣 Cenário de risco:**
> Distribuição tem 10 bugs N2 confirmados e **nenhum card corretivo em desenvolvimento**. O único DEV4 nesse módulo é uma feature nova (tela de gestão). O Sentry confirma que o `dispatch-service` está errando sistematicamente com 9.000+ ocorrências. Cada bug N2 aqui representa um cliente sem atendimento — o chat chegou, o bot/fila deveria distribuir, e não distribuiu.

**✅ Ação recomendada:**
> Criar cards corretivos específicos para os 10 bugs N2 de distribuição. Priorizar SM-5918 (chats presos sem atendente), SM-5911 (encaminhamento não funciona) e SM-5716 (bot incoerente). Antes de validar DEV4-4003 (tela de gestão), confirmar que a distribuição funciona para os cenários dos bugs N2 — uma tela de gestão sobre uma fila quebrada não resolve o problema.

---

### 🔴 ALTO — Chat / Mensagens (pontuação: 50)

**🔥 O problema atual:**
> Mensagens chegam com 20-30 minutos de atraso (SM-5430), operadores não conseguem responder quando o contato usa dois canais (SM-5334), e o ícone ⏳ permanece mesmo após entrega/leitura (DEV4-4078 — sendo corrigido). O `spa-backend` está gerando 3.744 erros HTTP 500 afetando **1.130 usuários** no Sentry. A correção do WebSocket (DEV4-4078) está em desenvolvimento ao lado de uma feature de agendamento de mensagens (DEV4-4229) que toca a mesma camada.

**🧠 Fragilidade documentada na KB:**
> `polichat-web-app` ainda é o pipeline principal de mensageria — todo inbound/outbound passa por ele antes de chegar ao `foundation-api`. Qualquer falha nele afeta 100% do fluxo de mensagens. WebSocket/Soketi é usado para real-time mas não tem fallback documentado.

**📋 Bugs confirmados — SM Em Triagem (N2):** 9 bugs
- [SM-5910](https://poli-digital.atlassian.net/browse/SM-5910): Mensagens demoram para aparecer nos usuários após certo tempo
- [SM-5430](https://poli-digital.atlassian.net/browse/SM-5430): Mensagens chegando com atraso de 20-30 minutos na plataforma
- [SM-5334](https://poli-digital.atlassian.net/browse/SM-5334): Não é possível responder mensagens quando cliente envia para dois canais diferentes
- [SM-4820](https://poli-digital.atlassian.net/browse/SM-4820): Demora e falha na entrega de mensagens do WhatsApp
- [SM-4996](https://poli-digital.atlassian.net/browse/SM-4996): Lentidão no carregamento de mensagens/chamados
- [SM-5033](https://poli-digital.atlassian.net/browse/SM-5033): Usuários não conseguem enviar mensagens para contato específico
- [SM-2678](https://poli-digital.atlassian.net/browse/SM-2678): Canal não envia mensagem
- [SM-2581](https://poli-digital.atlassian.net/browse/SM-2581): Problema ao Enviar Mensagens e Encerrar Chats
- [SM-4761](https://poli-digital.atlassian.net/browse/SM-4761): Instabilidade no acesso e recebimento de mensagens

**🚨 Sentry — erros em produção:**
- `spa-backend` "Request failed with status code 500" — **3.744 occ | 1.130 usuários**
- `polichat-web-app` "Undefined array key 0" — **11.842 occ | 764 usuários**
- `polichat-web-app` "Attempt to read property 'id' on null" — 1.723 occ | 204 usuários

**⚡ O que está em desenvolvimento agora:**

| Card | Classificação | O que faz | Por que importa |
|---|---|---|---|
| [DEV4-4078](https://poli-digital.atlassian.net/browse/DEV4-4078) | 🔧 Corretivo | Corrige ícone ⏳ permanente via WebSocket/store | Corrige SM-5910, SM-5916 — validar cenários C06 (F5) e C12 (reconexão WS) |
| [DEV4-4229](https://poli-digital.atlassian.net/browse/DEV4-4229) | ⚠️ Feature em área instável | Filtros, edição e criação de agendamentos de mensagem | Adiciona novo fluxo de envio sobre camada com 9 bugs ativos — risco de regressão |

**🛠️ Cards em backlog/ready que vão mexer neste módulo:** 2
- [DEV4-4164](https://poli-digital.atlassian.net/browse/DEV4-4164): Sugestão de envio de template Utility quando Marketing _(⚠️ Feature em área instável | Pronto para dev | Highest)_
- [DEV4-4188](https://poli-digital.atlassian.net/browse/DEV4-4188): Criar evento "Atendimento finalizado" para API _(⚠️ Feature em área instável | Aguardando Handoff | Medium)_

**💣 Cenário de risco:**
> DEV4-4078 está corrigindo o mecanismo de atualização de status via WebSocket — exatamente o que causa SM-5910 e SM-5916. Mas o card tem 14 cenários de teste e os mais críticos são os de borda: reconexão de WS após queda (C12) e F5 após entrega (C06/C07). Se o fix entrar sem cobrir esses casos, os 9 bugs N2 continuam vivos e cria-se uma falsa sensação de resolução. Paralelamente, DEV4-4229 adiciona `POST /api/v1/scheduled-messages` sobre a mesma store de mensagens — se entrar junto com o fix, pode introduzir novo caminho quebrado enquanto o antigo está sendo corrigido. DEV4-4164 (prioridade Highest!) adiciona lógica de template sobre a mesma UI.

**✅ Ação recomendada:**
> 1. Executar `/qa-executor DEV4-4078` cobrindo obrigatoriamente: C06 (F5 pós-entrega), C07 (F5 pós-leitura), C12 (reconexão WS), C05 (múltiplas msgs em sequência) — esses são exatamente os cenários dos bugs SM-5910 e SM-5916.
> 2. Bloquear merge de DEV4-4229 até DEV4-4078 estar em produção estável por 48h.
> 3. DEV4-4164 tem prioridade Highest mas deve entrar após DEV4-4078, não antes.

---

### 🔴 ALTO — Interface / Nova Interface (omnispa) (pontuação: 47)

**🔥 O problema atual:**
> A nova interface (omnispa) está produzindo erros para **3.306 usuários simultâneos** no Sentry — 422 Unprocessable Entity (12.800 ocorrências), Network Errors (1.688 occ | 764 usuários) e CDN failures (741+374 occ | 230 usuários). Ao mesmo tempo, há 5 bugs N2 de lentidão extrema, tela em branco e loading infinito. O DEV4-4166 (Epic de alta prioridade) vai **reorganizar toda a estrutura de páginas** dessa interface.

**📋 Bugs confirmados — SM Em Triagem (N2):** 5 bugs
- [SM-5326](https://poli-digital.atlassian.net/browse/SM-5326): Nova versão do sistema está muito lenta
- [SM-5311](https://poli-digital.atlassian.net/browse/SM-5311): Cliente não consegue acessar a plataforma — tela em branco
- [SM-5308](https://poli-digital.atlassian.net/browse/SM-5308): Conversas não estão abrindo na plataforma
- [SM-2209](https://poli-digital.atlassian.net/browse/SM-2209): Bug — Loading infinito na aba de chats
- [SM-2151](https://poli-digital.atlassian.net/browse/SM-2151): Plataforma Travando

**🚨 Sentry — erros em produção (maior impacto de usuários em todo o sistema):**
- `omnispa` "AxiosError: 422" — **12.800 occ | 3.306 usuários** ← maior user impact de todas as fontes
- `omnispa` "AxiosError: Network Error" — 1.688 occ | 764 usuários
- `omnispa` "TypeError: Failed to fetch (cdn.polichat.io)" — 741 occ | 160 usuários
- `omnispa` "TypeError: Failed to fetch (cdn.polichat.io)" — 374 occ | 70 usuários (variante)
- `omnispa` "TypeError: Cannot read properties of undefined ('plugin')" — múltiplos clusters (plugin não carregado)
- `omnispa` "AxiosError: 401" × 2 clusters — 440 occ | 172 usuários (sessões expiradas)

**⚡ O que está em desenvolvimento agora:**
_(Nenhum card ativo exclusivo de omnispa em dev)_

**🛠️ Cards em backlog/ready que vão mexer neste módulo:** 4
- [DEV4-4166](https://poli-digital.atlassian.net/browse/DEV4-4166): Nova Estrutura de Páginas na Nova Interface _(⚠️ Feature em área instável | Pronto para dev | High | Epic)_
- [DEV4-4202](https://poli-digital.atlassian.net/browse/DEV4-4202): Novas contas devem ser indexadas na Nova Interface por padrão _(⚠️ Feature em área instável | Aguardando Handoff | Medium)_
- [DEV4-4003](https://poli-digital.atlassian.net/browse/DEV4-4003): Tela de Gestão de Chats para Gestor e Supervisor _(⚠️ Feature em área instável | Pronto para dev | Medium | Epic)_
- [DEV4-4227](https://poli-digital.atlassian.net/browse/DEV4-4227): Remover filtro "Cliente aguardando" de produção _(🔧 Corretivo | Pronto para dev | Medium)_

**💣 Cenário de risco:**
> O Sentry revela que a nova interface está falhando para **3.306 usuários** com 422s — e esse sinal **não existe nos tickets de suporte** (clientes reportam "plataforma lenta" mas o suporte não correlaciona com os 422s). DEV4-4166 é um Epic de alta prioridade que reorganiza toda a estrutura de rotas e páginas do omnispa. Reorganizar routing de uma aplicação que já quebra para milhares de usuários, sem entender a causa raiz dos 422s, pode amplificar cada erro existente. DEV4-4202 vai colocar mais usuários na nova interface por padrão — aumentando o universo exposto antes da causa raiz ser resolvida.

**✅ Ação recomendada:**
> 1. Criar spike: qual endpoint retorna 422 no omnispa? Checar no Sentry o campo `culprit` dos 422s. Identificar se é auth, payload validation, ou API version mismatch.
> 2. Bloquear DEV4-4166 com label "bloqueado por: investigação omnispa 422" até o spike ser concluído.
> 3. Bloquear DEV4-4202 até os 422s estarem resolvidos.
> 4. DEV4-4227 (remover filtro) pode entrar sem bloqueio — é remoção de feature com baixa adoção.

---

### 🔴 ALTO — Canais / WhatsApp / WABA (pontuação: 40)

**🔥 O problema atual:**
> 7 bugs N2 confirmados em canais: falha de entrega (ACK 0) em contatos com identificador @lid (sem número vinculado), Instagram desconectado, Badge Leads sem envio, e templates WABA desabilitados. O Sentry confirma com `polichat-web-app` gerando 15.111 erros "User consent required" afetando 747 usuários.

**📋 Bugs confirmados — SM Em Triagem (N2):** 7 bugs
- [SM-5831](https://poli-digital.atlassian.net/browse/SM-5831): CHATSHUB Falha de Envio (ACK 0) — Contatos @lid sem Número Vinculado
- [SM-5383](https://poli-digital.atlassian.net/browse/SM-5383): Instagram mostra desconectado mesmo após reconectar
- [SM-5412](https://poli-digital.atlassian.net/browse/SM-5412): Cliente não consegue enviar mensagens pelo canal Badge Leads
- [SM-5300](https://poli-digital.atlassian.net/browse/SM-5300): Falha recorrente ao criar templates de mensagem
- [SM-3017](https://poli-digital.atlassian.net/browse/SM-3017): Botão "Enviar Template" desabilitado — Interface Legada (WABA)
- [SM-2073](https://poli-digital.atlassian.net/browse/SM-2073): Solicitação de Exclusão de Número / Bloqueio de Acesso na Meta
- [SM-4820](https://poli-digital.atlassian.net/browse/SM-4820): Demora e falha na entrega de mensagens do WhatsApp

**🚨 Sentry — erros em produção:**
- `polichat-web-app` "Graph returned error: (#230) User consent required" — **15.111 occ | 747 usuários**
- `polichat-web-app` "Número de Whatsapp Inválido" — 9.861 occ | 9 usuários
- `polichat-web-app` "Client error: POST http://meta-whatsapp-c..." — 3.980 occ | 9 usuários
- `channel-customer` "WabaProviderCloudAPIError: Template não criado" — 772 occ

**🛠️ Cards em backlog/ready que vão mexer neste módulo:** 3
- [DEV4-4087](https://poli-digital.atlassian.net/browse/DEV4-4087): Detecção de mudança de categoria de template pela Meta _(⚠️ Feature em área instável | Aguardando Handoff | Medium)_
- [DEV4-4030](https://poli-digital.atlassian.net/browse/DEV4-4030): Ingestão de mensagens via Username (BSUID vs Phone Number) _(⚠️ Feature em área instável | Aguardando Handoff | High)_
- [DEV4-4198](https://poli-digital.atlassian.net/browse/DEV4-4198): Atualizar Embedded Signup para v4.0 _(⚠️ Feature em área instável | Aguardando Handoff | Medium)_

**💣 Cenário de risco:**
> O erro "User consent required" (#230) com 15.111 ocorrências em 747 usuários indica números WhatsApp sem autorização Meta corretamente vinculada — isso bloqueia envio silenciosamente. DEV4-4030 (Username/BSUID) vai alterar como o sistema processa identidade de contatos recebidos via WhatsApp. Se entrar com os 7 bugs N2 de canais em aberto, pode quebrar novos caminhos de entrega que antes funcionavam.

**✅ Ação recomendada:**
> Investigar causa do erro "User consent required" — 15.111 ocorrências em 747 usuários sugere problema sistêmico com reconsentimento de contatos WABA. Criar card de investigação antes de DEV4-4030 entrar em dev. SM-5831 (ACK 0 com @lid) merece card corretivo específico — é o caso dos usuários que migraram de número para username WhatsApp.

---

### 🟡 MÉDIO — Upload / Mídia (pontuação: 28)

**🔥 O problema atual:**
> Falhas de upload para S3 afetando centenas de usuários e erros de URL de mídia vazia — PDFs e áudios são os mais afetados.

**📋 Bugs confirmados — SM Em Triagem (N2):** 3 bugs
- [SM-5880](https://poli-digital.atlassian.net/browse/SM-5880): Áudio não reproduz ao tentar ouvir pela resposta
- [SM-2091](https://poli-digital.atlassian.net/browse/SM-2091): Cliente não consegue enviar PDF
- [SM-2229](https://poli-digital.atlassian.net/browse/SM-2229): Erro 500 ao subir planilha de contato

**🚨 Sentry — erros em produção:**
- `polichat-web-app` "S3Exception: PutObject" — 864 occ | 155 usuários
- `polichat-web-app` "S3Exception: PutObject" — 2.261 occ | 204 usuários (variante)
- `polichat-web-app` "ErrorException: rename(storage/tmp/...)" — 1.472 occ | 170 usuários

**✅ Ação recomendada:**
> Verificar credenciais AWS S3 — dois clusters de PutObject failure com ~400 usuários afetados sugerem problema de credenciais ou bucket policy. O erro de `rename()` indica race condition quando múltiplos uploads simultâneos usam o mesmo path temporário.

---

### 🟡 MÉDIO — CRM / Integrações Externas (pontuação: 15)

**🚨 Sentry — erros em produção (zero bugs N2 correspondentes — sinal oculto):**
- `polichat-web-app` "CRMException: Contato não encontrado" — **6.360 occ | 404 usuários**
- `polichat-web-app` "GuzzleHttp PATCH api.crm.poli..." — **6.255 occ | 408 usuários**
- `polichat-web-app` "GuzzleHttp POST api.crm.poli.d..." — 4.067 occ | 164 usuários

**💣 Cenário de risco:**
> 12.000+ erros de integração CRM afetando 400+ usuários **sem nenhum bug N2 correspondente** — o suporte não está rastreando. DEV4-4046 (Integração de identidade Username com CRM) está em Aguardando Handoff — vai mexer nessa integração sobre base já quebrando.

**✅ Ação recomendada:**
> Criar bug tracking para os erros CRM do Sentry — 6.360 erros em 404 usuários é crítico mas invisível ao suporte. Investigar se "Contato não encontrado" é problema de sincronização de IDs ou race condition na criação de contatos.

---

### 🟡 MÉDIO — Autenticação (pontuação: 19)

**🔥 O problema atual:**
> JWT expirando silenciosamente em produção afetando 233 usuários (Sentry). Ao mesmo tempo, 4 cards de 2FA estão prontos para entrar em desenvolvimento simultâneo.

**🚨 Sentry — erros em produção:**
- `polichat-web-app` "Firebase JWT ExpiredException: Expired token" — 384 occ | **233 usuários**
- `omnispa` "AxiosError: 401" × 2 clusters — 440 occ | 172 usuários

**🛠️ Cards em backlog/ready que vão mexer neste módulo:** 5
- [DEV4-4136](https://poli-digital.atlassian.net/browse/DEV4-4136): Autenticação de Dois Fatores (2FA) no Login _(⚠️ Feature em área instável | Aguardando Handoff | High | Epic)_
- [DEV4-4149](https://poli-digital.atlassian.net/browse/DEV4-4149): Construção do 2FA _(⚠️ Feature em área instável | Pronto para dev | Medium)_
- [DEV4-4148](https://poli-digital.atlassian.net/browse/DEV4-4148): 2FA via Aplicativo Autenticador (TOTP) _(⚠️ Feature em área instável | Pronto para dev | Medium)_
- [DEV4-4147](https://poli-digital.atlassian.net/browse/DEV4-4147): 2FA via E-mail no Login _(⚠️ Feature em área instável | Pronto para dev | Medium)_
- [DEV4-4145](https://poli-digital.atlassian.net/browse/DEV4-4145): 2FA via WhatsApp no Login _(⚠️ Feature em área instável | Pronto para dev | Medium)_

**✅ Ação recomendada:**
> Criar e resolver fix para `Firebase JWT ExpiredException` antes dos cards 2FA começarem. Implementar 2FA sobre sistema com JWTs expirando cria fluxo confuso: o usuário passa pelo 2FA mas a sessão expira logo depois sem aviso. Verificar se os 401s no omnispa são causados pelo mesmo JWT expirado.

---

## 💣 Top 3 Bombas

As 3 situações com maior probabilidade de virar incidente real nos próximos 14 dias:

---

### 💣 Bomba 1 — Fix de WebSocket ao lado de Feature de Mensagens

| Atributo | Detalhe |
|---|---|
| **Módulo** | Chat / Mensagens / WebSocket |
| **Fix ativo** | DEV4-4078 — Correção do ícone ⏳ permanente (Rafael, Highest, em dev) |
| **Feature ao lado** | DEV4-4229 — Filtros, edição e criação de agendamentos (Marina, Medium, em dev) |
| **Bugs abertos relacionados** | SM-5910, SM-5916, SM-5430, SM-4820 — 9 bugs N2 no total |
| **Sentry confirmando** | spa-backend 500 (3.744 occ, **1.130 usuários**) |

**Por que é bomba:**
DEV4-4078 está corrigindo o mecanismo de atualização de status via WebSocket e store do frontend. O fix tem 14 cenários de teste documentados, mas os mais críticos (C12: reconexão de WS após queda, C06: F5 pós-entrega) são os que mapeiam para bugs reais de clientes e frequentemente ficam fora do smoke test de aprovação. Se o fix entrar com esses casos de borda não validados, os 9 bugs N2 continuam vivos e o time assume que "foi resolvido". DEV4-4229 adiciona `POST /api/v1/scheduled-messages` e um novo componente que compartilha a mesma store de mensagens — se entrar junto com o fix, pode criar novo caminho quebrado na mesma camada que está sendo corrigida.

**Gatilho:** Merge de DEV4-4229 antes de DEV4-4078 estar estável em produção, OU deploy de DEV4-4078 sem cobertura de C06/C07/C12.

**Ação antes que estoure:**
> 1. Executar `/qa-executor DEV4-4078` com foco obrigatório em C06, C07, C12. Não aprovar sem esses cenários.
> 2. Adicionar DEV4-4229 como dependente de DEV4-4078 no Jira — merge bloqueado.
> 3. Se DEV4-4229 estiver pronto antes de DEV4-4078 ser aprovado em staging, segurar no branch — não fazer merge.

---

### 💣 Bomba 2 — Reestruturação de Páginas sobre Interface com 3.306 Usuários em Erro

| Atributo | Detalhe |
|---|---|
| **Módulo** | Interface / omnispa |
| **Feature crítica** | DEV4-4166 — Nova Estrutura de Páginas (Epic, High, Pronto para dev) |
| **Amplificador** | DEV4-4202 — Novas contas migradas para nova interface por padrão |
| **Bugs abertos** | SM-5326, SM-5311, SM-5308, SM-2209, SM-2151 (5 bugs N2) |
| **Sentry** | omnispa 422 (**12.800 occ, 3.306 usuários**) + Network Error (764 usuários) |

**Por que é bomba:**
O Sentry revela que a nova interface já está falhando para **3.306 usuários** com erro 422 — e esse sinal não existe nos tickets de suporte (clientes reportam "plataforma lenta" mas o suporte não correlaciona). DEV4-4166 vai reorganizar toda a estrutura de rotas e páginas do omnispa. Reorganizar routing de uma aplicação quebrando para milhares de usuários, sem entender a causa raiz dos 422s, é trocar a fiação com a casa em curto. DEV4-4202 vai migrar novas contas para essa interface por padrão — aumentando o universo de usuários expostos antes da causa raiz ser resolvida.

**Gatilho:** DEV4-4166 entrar em dev antes da causa raiz dos 422s ser identificada. DEV4-4202 em produção antes dos 422s estarem resolvidos.

**Ação antes que estoure:**
> 1. Criar spike: qual endpoint retorna 422 no omnispa? Verificar no Sentry o campo `culprit` dos 422s.
> 2. Bloquear DEV4-4166 com label "bloqueado por: investigação omnispa 422" até o spike ser concluído.
> 3. Bloquear DEV4-4202 até os 422s estarem resolvidos — não expandir o universo de usuários na interface quebrada.

---

### 💣 Bomba 3 — 2FA sendo Construído com JWT Expirando em Produção

| Atributo | Detalhe |
|---|---|
| **Módulo** | Autenticação |
| **Features entrando** | DEV4-4136, DEV4-4148, DEV4-4147, DEV4-4145 (4 cards 2FA prontos para dev) |
| **Bug de auth em produção** | Firebase JWT ExpiredException (384 occ, **233 usuários**) |
| **Sentry** | omnispa 401 × 2 clusters (440 occ, 172 usuários) |

**Por que é bomba:**
Implementar 2FA — que adiciona uma etapa crítica ao fluxo de login — sobre um sistema com JWTs expirando silenciosamente em produção cria o seguinte cenário: o usuário passa pelo 2FA com sucesso, mas a sessão expira logo depois sem aviso claro ("fiz o 2FA mas continuo deslogado"). Os 4 cards de 2FA via métodos diferentes (TOTP, Email, WhatsApp) multiplicam a superfície de testes — cada método tem fluxo de confirmação e estado de sessão distintos. Se os 172 usuários com 401 no omnispa são causados pelo JWT expirado, o 2FA não vai resolver o problema e pode mascarar a causa raiz.

**Gatilho:** Cards de 2FA entrarem em dev antes do JWT fix ser resolvido.

**Ação antes que estoure:**
> 1. Criar e priorizar fix para `Firebase JWT ExpiredException` antes dos cards 2FA começarem.
> 2. Ao testar os cards 2FA, incluir obrigatoriamente o cenário: "sessão expira durante o fluxo 2FA" — usuário inicia login, 2FA é enviado, sessão expira antes da confirmação.

---

## 📋 Cards que Precisam de Atenção

| Card | Módulo | Classificação | Risco | O que validar |
|---|---|---|---|---|
| [DEV4-4078](https://poli-digital.atlassian.net/browse/DEV4-4078) | Chat/WebSocket | 🔧 Corretivo | 🔴 ALTO | **Obrigatório:** C06 (F5 pós-entrega), C07 (F5 pós-leitura), C12 (reconexão WS), C05 (múltiplas msgs) |
| [DEV4-4229](https://poli-digital.atlassian.net/browse/DEV4-4229) | Chat/Mensagens | ⚠️ Feature em área instável | 🔴 ALTO | Não pode entrar antes de DEV4-4078. Validar que agendamento não interfere na store de mensagens |
| [DEV4-4166](https://poli-digital.atlassian.net/browse/DEV4-4166) | Interface/omnispa | ⚠️ Feature em área instável | 🔴 ALTO | Bloquear até causa raiz dos 422s (Sentry omnispa, 3.306 usuários) ser identificada |
| [DEV4-4164](https://poli-digital.atlassian.net/browse/DEV4-4164) | Chat/Templates | ⚠️ Feature em área instável | 🔴 ALTO | Prioridade Highest — deve entrar após DEV4-4078. Templates usam WABA (SM-5300 aberto) |
| [DEV4-4202](https://poli-digital.atlassian.net/browse/DEV4-4202) | Interface/omnispa | ⚠️ Feature em área instável | 🟡 MÉDIO | Bloquear até 422s resolvidos — não migrar usuários para interface quebrando |
| [DEV4-4136](https://poli-digital.atlassian.net/browse/DEV4-4136) | Autenticação | ⚠️ Feature em área instável | 🟡 MÉDIO | JWT fix deve preceder. Testar cenário: sessão expira durante fluxo 2FA |
| [DEV4-4030](https://poli-digital.atlassian.net/browse/DEV4-4030) | Canais/BSUID | ⚠️ Feature em área instável | 🟡 MÉDIO | Ingestão de msgs via Username afeta roteamento de canais com 7 bugs N2 ativos |
| [DEV4-4003](https://poli-digital.atlassian.net/browse/DEV4-4003) | Interface/Chat | ⚠️ Feature em área instável | 🟡 MÉDIO | Tela de gestão sobre distribuição com 10 bugs N2 — validar que filas exibidas estão corretas |
| [DEV4-4023](https://poli-digital.atlassian.net/browse/DEV4-4023) | PLBV/Meta | ✨ Feature em área estável | 🟢 BAIXO | Módulo novo, isolado. Validar que não afeta contas sem PLBV habilitado |
| [DEV4-4227](https://poli-digital.atlassian.net/browse/DEV4-4227) | Interface | 🔧 Corretivo | 🟢 BAIXO | Remoção de feature com baixa adoção — pode entrar sem bloqueios |

---

## ⚠️ Sinais Ocultos — Erros no Sentry sem Bug N2 Correspondente

Os seguintes erros têm alto volume mas **zero tickets de suporte associados** — estão quebrando silenciosamente para os usuários:

| Projeto | Erro | Volume | Usuários Afetados | Ação |
|---|---|---|---|---|
| omnispa | AxiosError 422 | 12.800 occ | **3.306** | Criar spike de investigação urgente |
| polichat-web-app | Graph error (#230) User consent | 15.111 occ | 747 | Criar bug N2 — bloqueia envio WhatsApp |
| polichat-web-app | CRMException: Contato não encontrado | 6.360 occ | 404 | Criar bug N2 — CRM não sincronizando |
| polichat-web-app | GuzzleHttp CRM PATCH/POST | 10.322 occ | 408 | Investigar junto com bug CRM acima |
| automatic-actions | TypeError null id | 1.437 occ | 0 (interno) | Criar bug — automações quebrando silenciosamente |
| jarvis | IntegrityError column channel_id | 934 occ | 0 (interno) | Investigar — Jarvis sem channel_id gera inconsistência de dados |

---

*Argos Predict v3 — gerado em 2026-05-26 | SM: 50 N2 bugs + 100+ N1 | DEV4: 30 backlog + 3 active | KB local carregada | Sentry: sentry.poli.digital (50 clusters ativos, 14 dias)*
