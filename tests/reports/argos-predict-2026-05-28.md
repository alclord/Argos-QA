# Argos Predict — Mapa de Risco Preditivo
> Gerado em: 2026-05-28 11:30 BRT | Projetos: SM + DEV4 | Janela: 14 dias
> Fontes: Jira Suporte (52 Em Triagem + 100 Aberto) + Jira Produto (37 backlog + 4 em dev) + KB local (7 arquivos) + Sentry (self-hosted, 20+ issues ativos) + GitHub Churn (33 PRs: FoundationAPI 16, SPA 11, polichat-web-app 4)

---

## 📊 Sumário Executivo

| Indicador | Valor |
|---|---|
| 🔴 SM Em Triagem — N2 investigando | 52 tickets (47 Bugs) |
| 🟡 SM Aberto — N1 ativo | 100 tickets (~18 Bugs, ~30 Solicitações, ~20 Dúvidas/Histórias) |
| 🛠️ DEV4 em backlog/ready | 37 cards |
| ⚡ DEV4 em desenvolvimento ativo | 4 cards |
| 🔧 Cards corretivos em dev | 1 (DEV4-4078) |
| ⚠️ Features em área instável em dev | 2 (DEV4-4023, DEV4-4229) |
| ✨ Features em área estável em dev | 1 (DEV4-4158) |
| 💣 Módulos com bomba ativa (fix + bugs abertos) | 3 (Chat, Canais, Distribuição) |
| ↗️ Módulos com tendência crescente | 0 |
| 📊 Módulo maior code churn | Chat/Mensagens (~1.200 linhas — FoundationAPI + SPA) |
| 📈 Módulos com risco crescente vs ontem | 3 (Nova Interface +5, Chat +3, Canais +3) |
| 📉 Módulos com risco reduzido vs ontem | 6 (Distribuição -6, CRM -10, Contatos -9, Jarvis -5, WebSocket -3, Auth -2) |

---

## 🗺️ Mapa de Risco por Módulo

---

#### 🔴 ALTO — Chat / Mensagens → (pontuação: 71 | técnico: 13 | usuários: 58, ↑+3 vs ontem)

**🔥 O problema atual:**
> 8 bugs N2 confirmados persistem sem corretivos para 6 deles: delays de 20-30 minutos (SM-5430), impossibilidade de responder com dois canais (SM-5334), grupos sem receber mensagens (SM-5245), mensagens não aparecendo (SM-5033). Hoje surgiram 7 novos bugs N1, incluindo mensagens que não aparecem sem F5 manual (SM-7518), emojis sendo inseridos automaticamente (SM-7498) e atendente incapaz de enviar após resposta a template (SM-7519). DEV4-4078 corrige apenas o ícone ⏳ via WebSocket — os outros 6 bugs N2 não têm DEV4 corretivo.

**📊 Breakdown do score:** `KB +5 | SM N2 +29 (×decay) | SM N1 +21 (×decay) | Sentry +4 | Churn +3 | DEV +6 | QA +1`
`→ tendência estável — 1,14 bugs/dia (hoje) vs 1,0 bugs/dia (período anterior)`

**🧠 Fragilidade documentada na KB:**
> `polichat-web-app` é o pipeline principal de mensageria — todo inbound/outbound passa por ele. Regra crítica: "never skip `attending`" — violação frequente causa estados inconsistentes e mensagens presas. O `foundation-spa` + `polichat-spa` dependem de WebSocket (Soketi) para atualização em tempo real — qualquer desconexão causa estados obsoletos na UI.

**🔬 Problemas identificados — Chat / Mensagens**

| Problema | Cards SM | Serviço(s) suspeito(s) | Confiança | Evidência principal |
|---|---|---|---|---|
| Delay e falha de entrega | SM-5430, SM-5245, SM-4820, SM-4996, SM-7544, SM-7518 (6 cards) | polichat-web-app > waba-webhook | 🟢 Alta | KB: polichat-web-app é pipeline central; Sentry: 8.508 occ mime encoder polichat-spa |
| Mensagem presa em ⏳ / ícone errado | SM-5910, SM-7518, SM-7519 (3 cards) | foundation-spa (SPA) > foundation-api | 🟢 Alta | DEV4-4078 confirma causa via WebSocket store; já testado em DEV4-4233 |
| Impossibilidade de enviar | SM-5033, SM-5334, SM-7574, SM-7539, SM-7544 (5 cards) | polichat-web-app | 🟡 Média | KB: responsabilidade de outbound; sem Sentry específico |
| Filtro, notificação e API | SM-5401, SM-7498, SM-7511, SM-7582 (4 cards) | foundation-spa / Soketi | 🔴 Especulativa | Sintoma misto — SM-7582 aponta API 500 em GET /messages |
| Encerramento de chats | SM-2581 (1 card) | polichat-web-app | 🔴 Especulativa | Apenas sintoma sem Sentry corroborado |

> ⚠️ `polichat-web-app` aparece como suspeito em 3 clusters deste módulo — candidato prioritário de investigação.

**📋 SM Em Triagem (N2):** 8 bugs — 8 corroborados (critério 2: N1 ativo no módulo nos últimos 7 dias)
  • [SM-5910](https://poli-digital.atlassian.net/browse/SM-5910): Mensagens demoram para aparecer nos usuários após certo tempo `Delay e falha de entrega`
  • [SM-5430](https://poli-digital.atlassian.net/browse/SM-5430): Mensagens chegando com atraso de 20-30 minutos `Delay e falha de entrega`
  • [SM-5334](https://poli-digital.atlassian.net/browse/SM-5334): Não é possível responder quando cliente envia para dois canais `Impossibilidade de enviar`
  • [SM-5401](https://poli-digital.atlassian.net/browse/SM-5401): Filtro de não lidos não funciona corretamente `Filtro e notificação`
  • [SM-4996](https://poli-digital.atlassian.net/browse/SM-4996): Lentidão no carregamento de mensagens/chamados `Delay e falha de entrega`
  • [SM-5033](https://poli-digital.atlassian.net/browse/SM-5033): Usuários não conseguem enviar mensagens para contato específico `Impossibilidade de enviar`
  • [SM-2581](https://poli-digital.atlassian.net/browse/SM-2581): Problema ao Enviar Mensagens e Encerrar Chats _(63 dias)_ `Encerramento`
  • [SM-5245](https://poli-digital.atlassian.net/browse/SM-5245): Grupos não recebem mensagens dos operadores `Delay e falha de entrega`

**🚨 Reclamações ativas — SM Aberto (N1):** 7 bugs
  • [SM-7574](https://poli-digital.atlassian.net/browse/SM-7574): Mensagens não chegam no tablet — cliente com dois números `Impossibilidade de enviar`
  • [SM-7544](https://poli-digital.atlassian.net/browse/SM-7544): Erro no envio de mensagens na Polichat `Impossibilidade de enviar`
  • [SM-7519](https://poli-digital.atlassian.net/browse/SM-7519): Atendente não consegue enviar mensagem após resposta de cliente a template `Impossibilidade de enviar`
  • [SM-7518](https://poli-digital.atlassian.net/browse/SM-7518): Mensagens não aparecem no chat — atualização manual necessária `Delay e falha`
  • [SM-7498](https://poli-digital.atlassian.net/browse/SM-7498): Emojis aparecem automaticamente nas mensagens `Filtro e notificação`
  • [SM-7582](https://poli-digital.atlassian.net/browse/SM-7582): Erro 500 na rota GET /accounts/{account_uuid}/messages `Filtro e notificação`
  • [SM-7539](https://poli-digital.atlassian.net/browse/SM-7539): Não consegue responder mensagens dos pacientes — possível restrição Meta `Impossibilidade de enviar`

**🚨 Sentry — erros em produção:**
  • `polichat-spa` "Error: There is already an encoder stored (mime type)" — **8.508 occ | 1.817 usuários** | lastSeen: 2026-05-28
  • `polichat-spa` "<unknown>" (isCanceled) — **3.403 occ | 949 usuários** | lastSeen: 2026-05-28

**📊 Code Churn (últimos 14 dias):**
- `FoundationAPI`: 16 PRs | 4 autores (akappes, Buzeli, gabriel0miranda, MarinaSantosPoli) → PRs de agendamentos (DEV4-4114/4229), lista global de msgs, fix DistributeChatAction ⚠️ ownership difuso
- `SPA` (foundation-spa): 11 PRs | 6 autores → ACK fix (DEV4-4233), lista global msgs, fix Enter template, markdown protect ⚠️ ownership difuso
- Estimativa: **>1.200 linhas** em Chat/Mensagens nos dois repos centrais

**⚡ O que está em desenvolvimento agora:**

| Card | Classificação | O que faz | Por que importa |
|---|---|---|---|
| [DEV4-4078](https://poli-digital.atlassian.net/browse/DEV4-4078) | 🔧 Corretivo | Corrige ícone ⏳ via WebSocket/store | Cobre SM-5910, mas os 6 outros bugs N2 ficam sem fix |
| [DEV4-4229](https://poli-digital.atlassian.net/browse/DEV4-4229) | ⚠️ Feature em área instável | Filtros, edição e criação de agendamentos | Novo fluxo POST /scheduled-messages sobre camada com 7 bugs ativos |

**🛠️ Cards em backlog/ready que vão mexer neste módulo:** 2
  • [DEV4-4164](https://poli-digital.atlassian.net/browse/DEV4-4164): Sugestão de template Utility quando Marketing falhar _(⚠️ Instável | Aguardando Handoff | **Highest**)_
  • [DEV4-4188](https://poli-digital.atlassian.net/browse/DEV4-4188): Criar evento "Atendimento finalizado" para API _(⚠️ Instável | Aguardando Handoff | Medium)_

**💣 Cenário de risco:**
> DEV4-4078 corrige o ícone ⏳ via WebSocket — mas os 6 outros bugs N2 de Chat (atraso de mensagens, grupos sem receber, filtro de não lidos, impossibilidade de envio) não têm DEV4 corretivo. Enquanto isso, DEV4-4229 (agendamentos) adiciona `POST /api/v1/scheduled-messages` e endpoints de edição sobre a mesma store de mensagens — se entrar antes de DEV4-4078 estabilizar, cria novos caminhos sobre código já quebrado. FoundationAPI e SPA estão em churn simultâneo com 6 autores — combinação clássica de regressão silenciosa.

**✅ Ação recomendada:**
> 1. Executar `/qa-executor DEV4-4078` cobrindo: reconexão WebSocket (C12), F5 pós-entrega (C06), F5 pós-leitura (C07), múltiplas mensagens em sequência (C05). Bloquear merge até APROVADO.
> 2. Bloquear merge de DEV4-4229 até DEV4-4078 estar em produção estável por 48h.
> 3. Criar cards corretivos urgentes para: SM-7518 (mensagens não aparecem sem F5 — pode ser regressão de DEV4-4233), SM-7519 (não consegue enviar após template — possível falha WABA janela 24h).

---

#### 🔴 ALTO — Canais / WhatsApp / WABA → (pontuação: 50 | técnico: 8 | usuários: 42, ↑+3 vs ontem)

**🔥 O problema atual:**
> 9 bugs N2 confirmados: falha ACK 0 em contatos @lid (SM-5831), Instagram desconectado (SM-5383), Badge Leads sem envio (SM-5412), chatbot parou no feriado (SM-5423), templates WABA desabilitados (SM-3017). Hoje: SM-7588 (erro ao configurar Instagram), SM-7532 (template aprovado não aparece), SM-7539 (não consegue enviar após template). DEV4-4023 (PLBV — verificação Meta) está em desenvolvimento ativo sobre um módulo com 9 bugs sem corretivo, e há 10+ cards de backlog BSUID/Username chegando na fila.

**🧠 Fragilidade documentada na KB:**
> WABA janela 24h: regra frequentemente mal compreendida — após 24h sem resposta, só templates aprovados podem ser enviados. Violação gera erros silenciosos. O `channel-customer` teve ReferenceError em runtime (presente no relatório anterior) que pode estar silenciando erros de canal.

**🔬 Problemas identificados — Canais**

| Problema | Cards SM | Serviço(s) suspeito(s) | Confiança | Evidência principal |
|---|---|---|---|---|
| ACK 0 / falha entrega WhatsApp | SM-5831, SM-4820, SM-5181, SM-2678, SM-7539 (5 cards) | waba-webhook > channel-customer | 🟡 Média | KB: WABA janela 24h + estrutura @lid |
| Canal Instagram desconectado / Badge Leads | SM-5383, SM-5412, SM-7588, SM-5423 (4 cards) | channel-customer | 🟡 Média | KB: channel-customer orquestra todos os canais |
| Templates WABA falham / não aparecem | SM-5300, SM-3017, SM-7532 (3 cards) | foundation-api (templates) > waba-webhook | 🟡 Média | polichat-web-app PR304 (flow template API) recém mesclado |

**📋 SM Em Triagem (N2):** 9 bugs — 9 corroborados (N1 ativo no módulo)
  • [SM-5831](https://poli-digital.atlassian.net/browse/SM-5831): CHATSHUB Falha de Envio (ACK 0) — Contatos @lid `ACK 0`
  • [SM-5412](https://poli-digital.atlassian.net/browse/SM-5412): Cliente não consegue enviar mensagens pelo canal Badge Leads `Canal`
  • [SM-5383](https://poli-digital.atlassian.net/browse/SM-5383): Instagram mostra desconectado mesmo após reconectar `Canal`
  • [SM-5300](https://poli-digital.atlassian.net/browse/SM-5300): Falha recorrente ao criar templates de mensagem `Templates`
  • [SM-3017](https://poli-digital.atlassian.net/browse/SM-3017): Botão "Enviar Template" desabilitado — Interface Legada (WABA) `Templates`
  • [SM-5423](https://poli-digital.atlassian.net/browse/SM-5423): Chatbot parou de funcionar no feriado — não envia opções `Canal`
  • [SM-5181](https://poli-digital.atlassian.net/browse/SM-5181): Cliente não consegue enviar número por canal específico `ACK 0`
  • [SM-4820](https://poli-digital.atlassian.net/browse/SM-4820): Demora e falha na entrega de mensagens do WhatsApp `ACK 0`
  • [SM-2678](https://poli-digital.atlassian.net/browse/SM-2678): Canal não envia mensagem _(62 dias)_ `ACK 0` ⚠️ crônico

**🚨 Reclamações ativas — SM Aberto (N1):** 3 bugs
  • [SM-7588](https://poli-digital.atlassian.net/browse/SM-7588): Erro ao configurar canal do Instagram `Canal`
  • [SM-7532](https://poli-digital.atlassian.net/browse/SM-7532): Template aprovado e vinculado ao canal não aparece para uso `Templates`
  • [SM-7539](https://poli-digital.atlassian.net/browse/SM-7539): Não consegue responder mensagens dos pacientes — possível restrição Meta `ACK 0`

**📊 Code Churn (últimos 14 dias):** ~700 linhas estimadas | 4 autores únicos ⚠️ ownership difuso
- `polichat-web-app`: PR299 (normalizar JID grupos WhatsApp), PR301 (rota flows), PR304 (template flow API) — 3 PRs de Canais mesclados
- `polichat-spa`: PR111 (Meta MMLite implementation)

**⚡ O que está em desenvolvimento agora:**

| Card | Classificação | O que faz | Por que importa |
|---|---|---|---|
| [DEV4-4023](https://poli-digital.atlassian.net/browse/DEV4-4023) | ⚠️ Feature em área instável | Estrutura base do PLBV (estados/ciclo de vida da verificação Meta) | Adiciona modelo de estados WABA/Meta sobre módulo com 9 bugs ativos |

**🛠️ Cards em backlog que vão mexer neste módulo:** 3 corretivos/instáveis + 10 BSUID cards
  • [DEV4-4164](https://poli-digital.atlassian.net/browse/DEV4-4164): Sugestão template Utility quando Marketing falhar _(⚠️ Instável | **Highest**)_
  • [DEV4-4087](https://poli-digital.atlassian.net/browse/DEV4-4087): Detecção de mudança de categoria de template pela Meta _(⚠️ Instável)_
  • [DEV4-4198](https://poli-digital.atlassian.net/browse/DEV4-4198): Atualizar Embedded Signup para v4.0 _(⚠️ Instável)_
  • DEV4-4030, 4032, 4045, 4046, 4053, 4055 — BSUID/Username (6 cards High) — todos ⚠️ Instável, chegando na fila

**💣 Cenário de risco:**
> DEV4-4023 (PLBV) define estados e transições para verificação WABA/Meta e toca a camada de `waba-webhook` e `channel-customer` — exatamente os serviços com 5 dos 9 bugs N2 abertos. Pior: DEV4-4030/4032 (BSUID — estrutura de identidade por Username) estão em Aguardando Handoff com prioridade High, e vão mudar como o sistema resolve identidades de contatos. polichat-web-app mesclou 3 PRs de canal esta semana (JID normalization, flows API) — se algum introduziu regressão, os 9 bugs N2 ficam ainda mais difíceis de isolar.

**✅ Ação recomendada:**
> 1. Executar smoke test de integridade dos canais existentes após merge de DEV4-4023: testar WABA, Instagram e Badge Leads.
> 2. Criar card corretivo para SM-5831 (ACK 0 @lid) — provavelmente correlacionado com estrutura BSUID que DEV4-4023/4032 vão alterar.
> 3. Bloquear DEV4-4030 e DEV4-4032 até DEV4-4023 estar em produção estável — os três tocam a mesma camada de identidade.

---

#### 🔴 ALTO — Distribuição / Filas ↘️ (pontuação: 46 | técnico: 7 | usuários: 39, ↓-6 vs ontem)

**🔥 O problema atual:**
> 10 bugs N2 confirmados + zero corretivos em desenvolvimento. Bots não distribuem (SM-5716, SM-4668, SM-3958, SM-3840, SM-3927), chats ficam presos sem atendente (SM-5918), encaminhamentos falham (SM-5911), atribuição automática quebrada (SM-2099, SM-2035 — crônicos há 86–87 dias). Hoje: SM-7592 (bot não direcionou) e SM-7569 (chat preso após bot). O score caiu 6 vs ontem — não porque o problema foi resolvido, mas porque o volume de novos N1 caiu (apenas 2 hoje vs 4 ontem).

**🧠 Fragilidade documentada na KB:**
> `dispatch-service` usa Redis lock para geração de LID — race condition documentada em alto volume pode causar duplicação ou falha silenciosa de atribuição de chat.

**📋 SM Em Triagem (N2):** 10 bugs — 10 corroborados
  • [SM-5918](https://poli-digital.atlassian.net/browse/SM-5918): Chats ficando na aba 'sem atendente' sem distribuir
  • [SM-5911](https://poli-digital.atlassian.net/browse/SM-5911): Encaminhamento de clientes para filas não funciona
  • [SM-5716](https://poli-digital.atlassian.net/browse/SM-5716): Distribuição do bot não está coerente com o fluxo
  • [SM-4668](https://poli-digital.atlassian.net/browse/SM-4668): Problema com redirecionamento de bots
  • [SM-3958](https://poli-digital.atlassian.net/browse/SM-3958): Bot não direcionando
  • [SM-5016](https://poli-digital.atlassian.net/browse/SM-5016): Mensagens não sendo direcionadas automaticamente após implantação
  • [SM-3840](https://poli-digital.atlassian.net/browse/SM-3840): Bot funciona de forma intermitente
  • [SM-3927](https://poli-digital.atlassian.net/browse/SM-3927): Falha na Ativação do Bot — Mensagem sem Geração de Chat_ID
  • [SM-2099](https://poli-digital.atlassian.net/browse/SM-2099): Falha no Redirecionamento Automático _(86 dias)_ ⚠️ crônico
  • [SM-2035](https://poli-digital.atlassian.net/browse/SM-2035): Erro na atribuição automática de atendentes _(87 dias)_ ⚠️ crônico

**🚨 Reclamações ativas — SM Aberto (N1):** 2 bugs
  • [SM-7592](https://poli-digital.atlassian.net/browse/SM-7592): Bot não fez direcionamento para atendente
  • [SM-7569](https://poli-digital.atlassian.net/browse/SM-7569): Chat preso — mensagens não distribuídas corretamente após bot

**⚡ O que está em desenvolvimento agora:** _(Nenhum card corretivo ativo de distribuição)_

**🛠️ Backlog para este módulo:** 2 cards ⚠️
  • [DEV4-4003](https://poli-digital.atlassian.net/browse/DEV4-4003): Tela de Gestão de Chats para Gestor e Supervisor _(⚠️ Feature instável | Pronto para dev | Medium)_
  • [DEV4-3446](https://poli-digital.atlassian.net/browse/DEV4-3446): Fechamento/redirecionamento automático de chats por inatividade _(⚠️ Feature instável)_

**💣 Cenário de risco:**
> 10 bugs N2 + 2 novos N1 hoje com zero corretivos em dev. SM-2099 (86d) e SM-2035 (87d) são os tickets mais antigos de todo o sistema — confirmados como bugs crônicos sem nenhum fix planejado. O único card de Distribuição no backlog é uma feature nova (tela de gestão sobre fila quebrada). FoundationAPI mesclou PR1123 (`fix DistributeChatAction`) esta semana — validar se essa correção resolveu algum dos N2 ou introduziu regressão.

**✅ Ação recomendada:**
> 1. Verificar o impacto do PR1123 (FoundationAPI fix DistributeChatAction) nos bugs N2 de distribuição: testar SM-5918 (chats presos) e SM-5016 (direcionamento automático após implantação).
> 2. Criar sprint de bugs Distribuição focando SM-5918 + SM-5911 + SM-5716.
> 3. Bloquear DEV4-4003 (tela de gestão) até ao menos 3 dos 10 bugs N2 terem corretivo ativo.

---

#### 🟡 MÉDIO — Nova Interface / omnispa ↗️ (pontuação: 35 | técnico: 6 | usuários: 29, ↑+5 vs ontem)

**🔥 O problema atual:**
> Score subiu 5 vs ontem — puxado por 2 novos erros Sentry no omnispa nascidos hoje (OMNISPA-2QEB e OMNISPA-2QEA: TypeError 'plugin'). O erro OMNISPA-2QCV (`TypeError: Cannot read properties of undefined (reading 'plugin')`) está com status **ESCALATING** no Sentry, nascido em 2026-05-27, hoje já em 257 ocorrências e 49 usuários. O OMNISPA-1ZWW (AxiosError 404) continua com **3.433 usuários** — o maior userCount de toda a plataforma — sem nenhum corretivo ativo.

**📋 SM Em Triagem (N2):** 5 bugs — 5 corroborados
  • [SM-5326](https://poli-digital.atlassian.net/browse/SM-5326): Nova versão do sistema está muito lenta _(35 dias)_
  • [SM-5311](https://poli-digital.atlassian.net/browse/SM-5311): Cliente não consegue acessar a plataforma — tela em branco _(35 dias)_
  • [SM-5308](https://poli-digital.atlassian.net/browse/SM-5308): Conversas não estão abrindo na plataforma _(35 dias)_
  • [SM-2209](https://poli-digital.atlassian.net/browse/SM-2209): Loading infinito na aba de chats _(83 dias)_ ⚠️ crônico
  • [SM-2151](https://poli-digital.atlassian.net/browse/SM-2151): Plataforma Travando _(84 dias)_ ⚠️ crônico

**🚨 Reclamações ativas — SM Aberto (N1):** 2 bugs
  • [SM-7496](https://poli-digital.atlassian.net/browse/SM-7496): Extensão parou de funcionar após atualização da nova interface
  • [SM-7527](https://poli-digital.atlassian.net/browse/SM-7527): Atalhos utilizando Ctrl não estão funcionando na plataforma

**🚨 Sentry — erros em produção:**
  • `omnispa` "AxiosError 404" (OMNISPA-1ZWW) — **13.210 occ | 3.433 usuários** | lastSeen: 2026-05-28
  • `omnispa` "Network Error" (OMNISPA-20VC) — **1.812 occ | 806 usuários** | lastSeen: 2026-05-28
  • `omnispa` "TypeError: plugin undefined" (OMNISPA-2QCV) — 257 occ | 49 usuários | firstSeen: 2026-05-27 ← 🔴 **ESCALATING** novo
  • `omnispa` "AxiosError 401 refreshToken" (OMNISPA-2NFQ) — 321 occ | 133 usuários
  • `omnispa` "TypeError: plugin undefined" (OMNISPA-2QEB/2QEA) — 10 occ | 7 usuários | firstSeen: 2026-05-28 ← 🆕 NOVO HOJE

**📊 Code Churn:** SPA PR1493 (migração Iterup nova interface) mesclado 2026-05-27 — possível gatilho dos erros plugin (GTM) novos.

**💣 Cenário de risco:**
> OMNISPA-2QCV (`plugin undefined`) surgiu em 2026-05-27 e está escalando — coincide exatamente com a data do PR1493 (migração Iterup). O GTM.js como culprit sugere que um script de analytics não está carregando corretamente após a migração. Com DEV4-4166 (Nova Estrutura de Páginas, High, pronto para dev) na fila, reorganizar rotas do omnispa sobre um app com 404 crônico e novo erro escalando é alto risco.

**✅ Ação recomendada:**
> 1. Investigar imediatamente se PR1493 (migração Iterup, 2026-05-27) causou OMNISPA-2QCV (`plugin undefined`). Verificar se o GTM foi afetado.
> 2. Bloquear DEV4-4166 (Epic Nova Estrutura de Páginas) até investigação concluída.
> 3. Spike: identificar o endpoint que retorna 404 em OMNISPA-1ZWW (campo `culprit` do Sentry).

---

#### 🟡 MÉDIO — Upload / Mídia → (pontuação: 22 | técnico: 3 | usuários: 19, ↔️ 0 vs ontem)

**🔥 O problema atual:**
> 4 bugs N2 (áudio não reproduz, backup não download, PDF não envia há 85 dias) + 2 novos N1 hoje: SM-7520 (envio de arquivos instável) e SM-7503 (PDF não aparece em nenhuma interface). Score estável — a fragilidade é crônica e sem atenção do time de dev.

**📋 SM Em Triagem (N2):** 4 bugs
  • [SM-5880](https://poli-digital.atlassian.net/browse/SM-5880): Áudio não reproduz ao tentar ouvir pela resposta _(28 dias)_
  • [SM-5438](https://poli-digital.atlassian.net/browse/SM-5438): Backup não está sendo liberado para download _(34 dias)_
  • [SM-2091](https://poli-digital.atlassian.net/browse/SM-2091): Cliente não consegue enviar PDF _(85 dias)_ ⚠️ crônico
  • [SM-2229](https://poli-digital.atlassian.net/browse/SM-2229): Erro 500 ao subir planilha de contato _(63 dias)_ ⚠️ crônico

**🚨 Reclamações ativas — SM Aberto (N1):** 2 bugs
  • [SM-7520](https://poli-digital.atlassian.net/browse/SM-7520): Envio de arquivos instável na plataforma
  • [SM-7503](https://poli-digital.atlassian.net/browse/SM-7503): PDF não aparece na plataforma (interface antiga e nova)

**🧠 Fragilidade documentada na KB:** Bug PDF > 10MB — TypeError silencioso no media-manager sem feedback ao usuário.

**⚡ Desenvolvimento:** _(Nenhum card de upload em dev ou backlog)_ — zona 🔴 Negligenciada.

**✅ Ação recomendada:** Criar card corretivo Highest para SM-2091 (PDF não envia, 85 dias) + SM-7503 (PDF não aparece hoje). Investigar S3Exception PutObject.

---

#### 🟡 MÉDIO — Permissões / Roles ↗️ (pontuação: 17 | técnico: 4 | usuários: 13, ↑+1 vs ontem)

**🔥 O problema atual:**
> SM-3211 (`[PRIVACIDADE] Operador acessando chats de terceiros via Pop-up`) continua há 57 dias sem DEV4 corretivo — violação de isolamento de dados entre operadores. Sentry `revendedor-api` com **15.438 occ e 416 usuários** (403 Forbidden) permanece crônico.

**📋 SM Em Triagem (N2):** 3 bugs — 3 corroborados (Sentry ativo)
  • [SM-5905](https://poli-digital.atlassian.net/browse/SM-5905): Filtro de departamento não funciona para perfil Supervisor
  • [SM-3211](https://poli-digital.atlassian.net/browse/SM-3211): **[PRIVACIDADE]** Operador acessando chats de terceiros via Pop-up _(57 dias)_ ← 🔴 Crítico
  • [SM-2037](https://poli-digital.atlassian.net/browse/SM-2037): Erro 403 ao criar etiquetas _(87 dias)_ ⚠️ crônico

**🚨 Sentry:** `revendedor-api` "Exception: 403 Forbidden" — **15.438 occ | 416 usuários** | lastSeen: 2026-05-28

**✅ Ação recomendada:** Criar DEV4 corretivo com prioridade **Highest** para SM-3211. Risco reputacional e de compliance é crítico — 57 dias sem fix é inaceitável.

---

#### 🟠 ATENÇÃO — WebSocket / Presença → (pontuação: 12 | técnico: 4 | usuários: 8, ↓-3 vs ontem)

**📋 SM Em Triagem (N2):** 1 bug — corroborado
  • [SM-5916](https://poli-digital.atlassian.net/browse/SM-5916): Usuário aparece offline mesmo estando conectado _(28 dias)_

**🚨 Reclamações (N1):** [SM-7511](https://poli-digital.atlassian.net/browse/SM-7511): Novas mensagens não notificam o atendente

**🚨 Sentry:** `omnispa` + `polichat-spa` Network Error — **1.812 occ | 806 usuários** (desconexões WebSocket em escala)

> DEV4-4078 (em dev) corrige WebSocket de status de mensagem — pode impactar SM-5916. Cobrir reconexão WebSocket nos testes.

---

#### 🟠 ATENÇÃO — CRM / Integrações ↘️ (pontuação: 12 | técnico: 5 | usuários: 7, ↓-10 vs ontem)

**📋 SM Em Triagem (N2):** 2 bugs — corroborados via Sentry
  • [SM-5098](https://poli-digital.atlassian.net/browse/SM-5098): Contato não aparece na busca de oportunidades para incluir no CRM _(31 dias)_
  • [SM-4636](https://poli-digital.atlassian.net/browse/SM-4636): Problema de duplicação de funil para outro funil _(36 dias)_

**🚨 Reclamações (N1):** [SM-7567](https://poli-digital.atlassian.net/browse/SM-7567): Webhook não recebe eventos mesmo com configuração correta

**📊 Code Churn:** FoundationAPI PR1106 (move SyncContactCrmJob para fila dedicada) + PR1088 (sync contacts to Triction CRM) — ambos mesclados esta semana. Risco de regressão se a migração de fila introduziu edge cases.

> Score caiu 10 vs ontem — menos N1 bugs CRM visíveis. Sentry CRM errors não confirmados no fetch de hoje (podem estar fora do top 100). Monitorar.

---

#### 🟠 ATENÇÃO — Autenticação → (pontuação: 11 | técnico: 4 | usuários: 7, ↓-2 vs ontem)

**🚨 Sentry:**
  • `polichat-spa` "AxiosError: 401" — **4.393 occ | 1.326 usuários** — sessões expirando em escala
  • `omnispa` "AxiosError: 401 refreshToken" — 321 occ | 133 usuários

**🛠️ Backlog:** DEV4-4136 (Epic 2FA, High) + DEV4-4145, 4147, 4148, 4149 — quando entrarem, a camada de auth vai mudar completamente. Atenção especial aos testes de sessão.

---

#### 🟠 ATENÇÃO — Automação 🆕 novo módulo (pontuação: 5 | técnico: 4 | usuários: 1)

**🚨 Sentry:** `api-gateway` "Error: connect ECONNREFUSED 172.20.63.249:3000" em `/automatic-action/...` — **16.958 occ** | lastSeen: 2026-05-28. O `automatic-actions` service está inacessível intermitentemente — cada erro = uma automação que não dispara. Nenhum card corretivo visível.

**SM Em Triagem (N2):** [SM-3114](https://poli-digital.atlassian.net/browse/SM-3114): Bug na automação _(35 dias)_

---

#### 🟠 ATENÇÃO — Jarvis / IA ↘️ (pontuação: 4 | técnico: 1 | usuários: 3, ↓-5 vs ontem)

**📋 SM Em Triagem (N2):** [SM-5906](https://poli-digital.atlassian.net/browse/SM-5906): Transcrição de áudio não funciona para alguns perfis _(28 dias)_

**📊 QA Flakiness:** DEV4-4167 (Gerador de templates IA) taxa_flakiness 0,33 na execução 1 (corrigido na exec 2). Módulo sensível a variações de ambiente.

---

## 🌡️ Mapa de Calor — Clientes vs Dev

```
| Módulo             | Pressão Clientes | Atenção Dev | Gap  | Zona            |
|--------------------|------------------|-------------|------|-----------------|
| Chat/Mensagens     | ████████ 58      | █████ 5     | −53  | 🟡 Subatendida  |
| Canais             | ████████ 42      | █ 1         | −41  | 🟡 Subatendida  |
| Distribuição/Filas | ████████ 39      | 0           | −39  | 🔴 Negligenciada|
| Nova Interface     | █████ 29         | █ 1         | −28  | 🟡 Subatendida  |
| Upload/Mídia       | ███ 19           | 0           | −19  | 🔴 Negligenciada|
| Permissões/Roles   | ██ 13            | 0           | −13  | 🔴 Negligenciada|
| WebSocket/Presença | █ 8              | ███ 3       | −5   | 🟡 Subatendida  |
| CRM/Integrações    | █ 7              | 0           | −7   | 🔴 Negligenciada|
| Autenticação       | █ 7              | 0           | −7   | 🔴 Negligenciada|
```

> ⚠️ **Zonas negligenciadas (5 módulos):** Distribuição/Filas, Upload/Mídia, Permissões/Roles, CRM/Integrações, Autenticação
> Clientes reportam problemas ativos mas nenhum card corretivo está em andamento ou planejado.

> 🔵 **Sobre-investida:** nenhum módulo. O investimento de dev está concentrado em features (BSUID, PLBV, agendamentos, 2FA) enquanto os módulos com maior pressão de clientes carecem de corretivos.

---

## 🔧 Serviços Sob Pressão

| Serviço | Módulos afetados | Clusters de problema | Confiança média |
|---|---|---|---|
| `polichat-web-app` | Chat/Mensagens, Canais, Distribuição | Delay entrega, Impossibilidade envio, Flows API, JID grupos (4 clusters) | 🟡 Média |
| `dispatch-service` | Distribuição/Filas | Chats presos, Bot não direciona, Encaminhamento, Atribuição automática (4 clusters) | 🟢 Alta |
| `waba-webhook` | Canais, Chat | ACK 0 @lid, Grupos WhatsApp (2 clusters) | 🟡 Média |
| `foundation-spa (SPA)` | Chat/Mensagens, Nova Interface | Mensagem presa ⏳, Lentidão/404 (2 clusters) | 🟢 Alta |

---

## 🔍 Sinais Ocultos — Erros em Produção sem SM Ticket

| Erro | Projeto | Ocorrências | Usuários | Primeiro visto | Risco oculto |
|---|---|---|---|---|---|
| `AxiosError: 404` (OMNISPA-1ZWW) | omnispa | 13.210 | **3.433** | 2026-05-05 | 🔴 Maior userCount da plataforma — sem ticket N2 correspondente |
| `mime encoder` (POLICHAT-SPA-CZ) | polichat-spa | 8.508 | **1.817** | 2026-05-14 | 🔴 Encoder quebrado — afeta envio de mídia em larga escala |
| `AxiosError: 401` (POLICHAT-SPA-D0) | polichat-spa | 4.393 | **1.326** | 2026-05-14 | 🟡 Sessões expirando em escala |
| `<unknown>` isCanceled (POLICHAT-SPA-E2) | polichat-spa | 3.403 | **949** | 2026-05-14 | 🟡 Erro não capturado, sem diagnóstico |
| `Network Error` (OMNISPA-20VC) | omnispa | 1.812 | **806** | 2026-05-05 | 🟡 Desconexões WebSocket em escala |
| `Exception: 403` (REVENDEDOR-API-Y) | revendedor-api | 15.438 | **416** | 2026-05-14 | 🟡 API revendedor com 403 crônico |
| `TypeError: plugin` (OMNISPA-2QCV) | omnispa | 257 | 49 | **2026-05-27** | 🔴 ESCALATING — surgiu ontem, GTM quebrado, cresce hoje |
| `ECONNREFUSED automatic-action` (API-GATEWAY-1) | api-gateway | 16.958 | 0 (bg) | 2026-05-14 | 🟡 Automações não disparam — invisível ao suporte |

---

## 💣 Top 3 Bombas

> BOMBA_SCORE = SCORE_TOTAL + corretivo_ativo(+5) + feature_instável_ativo(+4) + TREND_↗️(+3) + Sentry_userCount>100(+2) + crônico>60d(+2) + N2_sem_DEV4(+3)

### 💣 #1 — Chat / Mensagens (BOMBA_SCORE: 85)

**71 + 5 (DEV4-4078 corretivo ativo) + 4 (DEV4-4229 feature instável ativa) + 2 (Sentry 1.817 usuários) + 3 (6 de 8 bugs N2 sem DEV4 corretivo)**

**Módulo:** Chat/Mensagens
**Por que é bomba:** Um fix em andamento que cobre apenas 1 dos 7 bugs N2 principais, enquanto uma feature nova (agendamentos) adiciona novos endpoints de mensagem sobre a mesma camada quebrada. 1.817 usuários já são afetados pelo mime encoder silencioso e outros 949 por erro não capturado — sem ticket de suporte para nenhum dos dois.
**Gatilho:** Merge de DEV4-4229 (agendamentos) enquanto DEV4-4078 (fix WebSocket) ainda não está em produção estável — os dois tocam a mesma store de mensagens.
**Ação antes que estoure:** Bloquear DEV4-4229 até DEV4-4078 aprovado e estável em produção por 48h. Executar `/qa-executor DEV4-4078` com foco em C05, C06, C07, C12.

---

### 💣 #2 — Canais / WhatsApp / WABA (BOMBA_SCORE: 57)

**50 + 4 (DEV4-4023 feature instável ativa) + 3 (9 de 9 bugs N2 sem corretivo)**

**Módulo:** Canais
**Por que é bomba:** DEV4-4023 (PLBV) define estados e transições WABA/Meta — se entrar com 9 bugs de canal abertos, qualquer falha de entrega durante o fluxo de verificação pode ser confundida com falha de compliance. Além disso, polichat-web-app mesclou 3 PRs de canal esta semana (JID, flows, template API) — sem testes de regressão, podem ter introduzido novas quebras.
**Gatilho:** Deploy de DEV4-4023 sem smoke test de canais existentes — WABA, Instagram e Badge Leads devem ser testados antes.
**Ação antes que estoure:** Executar smoke test completo de canais após qualquer merge no módulo. Criar card corretivo para SM-5831 (ACK 0 @lid).

---

### 💣 #3 — Distribuição / Filas (BOMBA_SCORE: 49)

**46 + 3 (10 bugs N2 sem nenhum corretivo)**

**Módulo:** Distribuição/Filas
**Por que é bomba:** 10 bugs N2 + 2 novos N1 hoje com zero corretivos. SM-2099 (86d) e SM-2035 (87d) são os tickets mais antigos de todo o sistema — o dispatch-service está silenciosamente quebrando a distribuição diariamente. FoundationAPI mesclou PR1123 (fix DistributeChatAction) sem validação pública de impacto nos N2.
**Gatilho:** DEV4-4003 (tela de gestão de chats) entrar em dev ativo sem que os 10 bugs N2 sejam endereçados — a feature será construída sobre um motor de distribuição quebrado.
**Ação antes que estoure:** Verificar se PR1123 resolveu algum dos N2. Criar sprint de bugs Distribuição (SM-5918, SM-5911, SM-5716). Bloquear DEV4-4003 até bugs críticos com corretivo.

---

## 📋 Cards que precisam de atenção antes do próximo deploy

| Card | Módulo | Classificação | Risco | O que validar |
|---|---|---|---|---|
| [DEV4-4078](https://poli-digital.atlassian.net/browse/DEV4-4078) | Chat/Mensagens | 🔧 Corretivo | 🔴 | C05 (múltiplas msgs), C06 (F5 pós-entrega), C07 (F5 pós-leitura), C12 (reconexão WS), C08 (logout/login) |
| [DEV4-4023](https://poli-digital.atlassian.net/browse/DEV4-4023) | Canais | ⚠️ Feature instável | 🔴 | Smoke test WABA + Instagram + Badge Leads antes do merge |
| [DEV4-4229](https://poli-digital.atlassian.net/browse/DEV4-4229) | Chat/Mensagens | ⚠️ Feature instável | 🔴 | Bloquear até DEV4-4078 em produção estável 48h |
| [DEV4-4164](https://poli-digital.atlassian.net/browse/DEV4-4164) | Canais | ⚠️ Feature instável | 🟡 | Testar fallback Utility quando Marketing falhar — cobrir cenário WABA janela 24h |
| [DEV4-4166](https://poli-digital.atlassian.net/browse/DEV4-4166) | Nova Interface | ⚠️ Feature instável | 🟡 | Bloquear até investigação OMNISPA-2QCV (plugin undefined) concluída |
| [DEV4-4227](https://poli-digital.atlassian.net/browse/DEV4-4227) | Chat/Interface | 🔧 Corretivo | 🟡 | Validar remoção do filtro não afeta filtros adjacentes |

---

## 🟢 Módulos Estáveis

Contatos (2), Configurações (features em área sem bugs), Relatórios/SLA (sem sinais ativos)

---

## ✅ Ações Recomendadas

1. 🔴 **[HOJE] Executar `/qa-executor DEV4-4078`** antes do merge — cobrir C05, C06, C07, C12. Bloquear merge até APROVADO. Se reprovado, bloquear DEV4-4229 por tempo indeterminado. _Consequência se ignorar: fix com falsa sensação de resolução, bugs persistem pós-deploy._

2. 🔴 **[HOJE] Investigar OMNISPA-2QCV (`TypeError: plugin`)** — verificar se PR1493 (migração Iterup, 2026-05-27) causou o erro escalando. Checar GTM e scripts de analytics. _Consequência: erro escalando hoje, potencial impacto em todos os usuários do omnispa._

3. 🔴 **[HOJE] Criar DEV4 corretivo Highest para SM-3211** (furo de privacidade, 57 dias — operador acessa chats de terceiros). _Consequência: risco legal e de compliance crescente a cada dia._

4. 🔴 **[ESTA SEMANA] Bloquear DEV4-4229** até DEV4-4078 em produção estável por 48h. _Consequência: feature de agendamento pode introduzir regressão sobre camada com 7 bugs N2 ativos._

5. 🔴 **[ESTA SEMANA] Bloquear DEV4-4166** (Nova Estrutura de Páginas) até spike do 404 omnispa concluído. _Consequência: reorganizar rotas com 404 crônico e erro escalando = amplificação do problema._

6. 🟡 **[ESTA SEMANA] Sprint de bugs Distribuição** (SM-5918, SM-5911, SM-5716) — criar cards corretivos. _Consequência: 86 dias sem fix em SM-2099, crescimento diário de N1 sem correção estrutural._

7. 🟡 **[ESTA SEMANA] Smoke test de canais após PR1123** (fix DistributeChatAction no FoundationAPI) — validar se SM-5918 e SM-5016 foram impactados. _Consequência: correção pode ter sido silenciosa — ou pode ter introduzido regressão._

8. 🟡 **[ESTA SEMANA] Criar card corretivo para SM-5831** (ACK 0 @lid) antes de DEV4-4023 ou DEV4-4032 (BSUID) entrarem em produção. _Consequência: a mudança de identidade BSUID pode mascarar ou amplificar o bug de @lid._

9. 🟡 **[PRÓXIMA SPRINT] Criar corretivo para SM-2091** (PDF não envia, 85 dias) + SM-7503 (PDF hoje). _Consequência: bug crônico sem fix, crescendo com novos N1._

10. 🟡 **[PRÓXIMA SPRINT] Bloquear DEV4-4003** (tela de gestão) até ao menos 3 dos 10 bugs N2 de Distribuição terem corretivo ativo. _Consequência: feature construída sobre motor de distribuição quebrado._

---

⚠️ **Sentry** — análise baseada em ~20 dos 100+ issues ativos (primeiros por data). Erros de fundo (CRM, S3, foundation-api) podem não estar no topo da fila mas são crônicos. Verificar página 2+ do Sentry para confirmação completa de módulos CRM e Upload.

---

*Argos Predict — gerado por Claude Code (Sonnet 4.6) em 2026-05-28*
*Base: SM (Jira Service Management) + DEV4 (Jira Software) + Sentry (self-hosted) + GitHub (5 repos) + KB local (7 arquivos)*
