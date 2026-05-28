# Cenários de Teste — DEV4-4269
> Card: [Poli] Chat originado de disparo permanece no filtro "Disparos" mesmo após encaminhamento manual
> Gerado em: 2026-05-28
> Card atualizado em: 2026-05-27T18:44:39.335-0300

---

## BLOCO 1 — Estratégia de Teste

Bug de alta criticidade no fluxo de atendimento operacional: chats originados por disparo não migram do filtro "Disparos" para os filtros padrão (Em Atendimento, Atribuídos a mim, Todas as Conversas) após encaminhamento manual, tornando-os invisíveis para os operadores de destino. O escopo cobre testes funcionais de UI sobre os filtros da listagem de chats e testes de API sobre o endpoint de encaminhamento manual. A prioridade de execução concentra-se primeiro nos critérios de aceite explícitos (happy paths de encaminhamento para usuário e para departamento/team), depois na regressão do fluxo existente (resposta do contato continua funcionando) e por fim nos cenários de borda e segurança. Riscos principais: regressão silenciosa no mecanismo de resposta do contato, estado inconsistente após encaminhamentos sequenciais, vazamento de dados entre accounts (multi-tenancy) e ausência de evento de broadcast que atualize a UI em tempo real.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade | Impacto | Prioridade |
|---|---|---|---|
| Encaminhamento manual não atualiza o filtro da listagem | A | A | 🔴 Crítica |
| Regressão: resposta do contato para de mover o chat para fila padrão | M | A | 🔴 Crítica |
| Evento de broadcast `chat.transferred` não emitido após encaminhamento | A | A | 🔴 Crítica |
| Chat encaminhado não aparece em "Atribuídos a mim" para o operador destino | A | A | 🔴 Crítica |
| Chat encaminhado para departamento não aparece em "Todas as Conversas" | M | A | 🔴 Crítica |
| Encaminhamentos consecutivos deixam o chat no estado errado | M | M | 🟡 Média |
| Comportamento correto para chats sem encaminhamento (permanecer em "Disparos") é alterado inadvertidamente | B | A | 🟡 Média |
| Operador sem permissão consegue encaminhar chat de disparo | B | A | 🟡 Média |
| Vazamento de chats de disparo entre accounts distintos | B | A | 🟡 Média |
| Cenário HubSpot via rota legada da API não funciona após a correção | M | M | 🟡 Média |
| Filtro "Disparos" exibe chats já encaminhados (filtragem incorreta residual) | M | B | 🟢 Baixa |

---

## BLOCO 3 — Tabela de Cenários

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-DISPATCH-001 | Encaminhamento para operador: chat sai do filtro "Disparos" e aparece em "Atribuídos a mim" | Account com disparo ativo configurado; usuário destino (role agent ou superior) cadastrado; chat originado por disparo existente sem resposta do contato ⚠️ Bloqueável | 1. Acessar a listagem de chats no filtro "Disparos". 2. Selecionar um chat originado por disparo. 3. Executar encaminhamento manual para o Usuário Destino. 4. Verificar o filtro "Disparos" (visão do usuário de origem). 5. Logar como Usuário Destino e verificar o filtro "Atribuídos a mim". | O chat não aparece mais no filtro "Disparos". O chat aparece no filtro "Atribuídos a mim" para o Usuário Destino. | 🔴 Alta | UI | — |
| CT-DISPATCH-002 | Encaminhamento para departamento: chat aparece em "Todas as Conversas" e no filtro do departamento | Account com disparo ativo; departamento (team) cadastrado; chat originado por disparo sem resposta do contato ⚠️ Bloqueável | 1. Acessar o filtro "Disparos". 2. Selecionar um chat de disparo. 3. Executar encaminhamento manual para um Departamento/Team. 4. Verificar o filtro "Disparos". 5. Verificar "Todas as Conversas". 6. Verificar o filtro do Departamento específico. | O chat sai do filtro "Disparos". O chat aparece em "Todas as Conversas" e no filtro do Departamento de destino. | 🔴 Alta | UI | — |
| CT-DISPATCH-003 | Regressão: resposta do contato ainda move chat de "Disparos" para fila padrão | Account com disparo ativo; chat originado por disparo sem encaminhamento manual ⚠️ Bloqueável | 1. Criar/identificar chat de disparo no filtro "Disparos" sem encaminhamento. 2. Simular envio de mensagem inbound pelo contato (via WhatsApp ou API). 3. Verificar o filtro "Disparos". 4. Verificar "Em Atendimento" ou "Todas as Conversas". | Após resposta do contato, o chat migra do filtro "Disparos" para os filtros padrão normalmente (comportamento existente não deve regredir). | 🔴 Alta | UI | — |
| CT-DISPATCH-004 | Chat de disparo SEM encaminhamento e SEM resposta permanece em "Disparos" | Account com disparo ativo; chat de disparo sem encaminhamento e sem resposta do contato ⚠️ Bloqueável | 1. Identificar chat de disparo sem encaminhamento manual e sem resposta do contato. 2. Verificar o filtro "Disparos". 3. Verificar "Atribuídos a mim" e "Todas as Conversas" do usuário predefinido do disparo. | O chat permanece apenas no filtro "Disparos" (comportamento atual mantido intencionalmente). Não aparece em "Atribuídos a mim" nem em "Todas as Conversas". | 🔴 Alta | UI | — |
| CT-DISPATCH-005 | API de encaminhamento retorna status correto e atualiza o campo de filtro no banco | Autenticação válida com role manager+; chat de disparo existente; usuário destino cadastrado ⚠️ Bloqueável | 1. Realizar POST/PUT para o endpoint de encaminhamento do chat (ex: `/v3/accounts/{uuid}/contacts/{id}/forward` ou equivalente). 2. Incluir `user_id` ou `team_id` de destino no payload. 3. Verificar o status code da resposta. 4. Consultar o chat via GET e verificar `assigned_user_id`, `status` e o campo que determina o filtro de origem. | Resposta HTTP 200/204. O campo que determina o filtro "Disparos" é atualizado para refletir o novo estado (não mais "disparo"). `assigned_user_id` corresponde ao usuário destino. | 🔴 Alta | API | — |
| CT-DISPATCH-006 | Usuário sem permissão não consegue encaminhar chat de disparo | Usuário com role agent (sem permissão de encaminhamento) autenticado; chat de disparo existente ⚠️ Bloqueável | 1. Autenticar como usuário com role agent. 2. Tentar executar a ação de encaminhamento do chat de disparo via UI ou API. | A ação é bloqueada. A UI exibe mensagem de permissão insuficiente ou o botão não está disponível. A API retorna HTTP 403 Forbidden. | 🔴 Alta | API | CT-DISPATCH-005 |
| CT-DISPATCH-007 | Encaminhamentos consecutivos: estado final reflete o último destino | Account com disparo ativo; dois usuários destino diferentes cadastrados ⚠️ Bloqueável | 1. Encaminhar chat de disparo para Usuário A. 2. Verificar que o chat aparece em "Atribuídos a mim" para Usuário A. 3. Encaminhar novamente o mesmo chat para Usuário B. 4. Verificar o filtro "Atribuídos a mim" para Usuário A. 5. Verificar o filtro "Atribuídos a mim" para Usuário B. | Após o segundo encaminhamento, o chat não aparece mais para Usuário A e aparece apenas para Usuário B em "Atribuídos a mim". O filtro "Disparos" não exibe o chat. | 🟡 Média | UI | CT-DISPATCH-001 |
| CT-DISPATCH-008 | Cenário HubSpot (rota legada): após encaminhamento, operadores comerciais visualizam o chat na listagem | Integração HubSpot ativa na conta; chat criado via rota legada da API como disparo; operador do comercial cadastrado ⚠️ Bloqueável | 1. Verificar que o chat criado pela HubSpot aparece no filtro "Disparos". 2. Executar encaminhamento manual para operador do time comercial. 3. Logar como operador comercial. 4. Verificar a listagem de chats sem buscar pelo número do contato. | O operador do comercial visualiza o chat na listagem padrão (em "Atribuídos a mim" ou "Todas as Conversas") sem necessidade de buscar o número do contato. | 🟡 Média | UI | CT-DISPATCH-001 |
| CT-DISPATCH-009 | Encaminhamento com payload inválido (sem usuário ou departamento destino) | Autenticação válida; chat de disparo existente | 1. Realizar chamada ao endpoint de encaminhamento sem informar `user_id` nem `team_id` no payload. | A API retorna HTTP 422 Unprocessable Entity com mensagem de erro indicando que o destino é obrigatório. O chat permanece inalterado no filtro "Disparos". | 🟡 Média | API | CT-DISPATCH-005 |
| CT-DISPATCH-010 | Encaminhamento de chat que não é de disparo (chat inbound normal) | Chat inbound normal (não originado por disparo) em atendimento ⚠️ Bloqueável | 1. Tentar encaminhar um chat inbound normal (não de disparo) para outro usuário. 2. Verificar os filtros de listagem. | O encaminhamento funciona normalmente para chats não-disparo. Nenhuma regressão no fluxo padrão de transferência. | 🟡 Média | UI | — |
| CT-DISPATCH-011 | Tentativa de encaminhar chat de disparo de outro account (isolamento multi-tenant) | Dois accounts distintos (A e B) com disparos ativos; usuário autenticado no account A ⚠️ Bloqueável | 1. Autenticar no account A. 2. Tentar encaminhar (via API) um chat de disparo pertencente ao account B usando o `chat_uuid` correto do account B. | A API retorna HTTP 403 ou 404. O chat do account B não é alterado. Nenhum dado cross-tenant é exposto. | 🔴 Alta | API | CT-DISPATCH-005 |
| CT-DISPATCH-012 | Evento de broadcast emitido após encaminhamento atualiza a UI em tempo real | Ambiente com WebSocket (Soketi) ativo; dois browsers/sessões abertas ⚠️ Bloqueável | 1. Abrir sessão do Usuário Destino com a listagem de chats visível. 2. Em outra sessão (manager), executar encaminhamento de chat de disparo para Usuário Destino. 3. Observar a listagem do Usuário Destino sem recarregar a página. | O chat aparece automaticamente na listagem do Usuário Destino (em "Atribuídos a mim") sem necessidade de recarregar a página (via evento WebSocket/broadcast). | 🟡 Média | UI | CT-DISPATCH-001 |

---

## BLOCO 4 — Gherkin (BDD)

### Cenário CT-DISPATCH-001: Encaminhamento para operador remove chat do filtro "Disparos"

```gherkin
Feature: Encaminhamento de chat originado por disparo

  Background:
    Given que existe uma account ativa com disparo configurado
    And existe um chat originado por disparo sem resposta do contato
    And o chat está visível no filtro "Disparos"
    And existe um usuário destino com role "agent" cadastrado na mesma account

  Scenario: Encaminhamento manual move o chat do filtro "Disparos" para "Atribuídos a mim"
    Given que estou autenticado como manager da account
    When executo o encaminhamento manual do chat para o "Usuário Destino"
    Then o chat não aparece mais no filtro "Disparos"
    And ao logar como "Usuário Destino"
    Then o chat aparece no filtro "Atribuídos a mim"
    And o chat exibe o nome do contato originário do disparo

  Scenario: Chat de disparo sem encaminhamento permanece no filtro "Disparos"
    Given que existe um chat de disparo sem encaminhamento manual
    And o contato não enviou nenhuma mensagem
    When verifico o filtro "Disparos"
    Then o chat está presente no filtro "Disparos"
    And o chat não aparece em "Atribuídos a mim" nem em "Todas as Conversas"
```

### Cenário CT-DISPATCH-011: Isolamento multi-tenant no encaminhamento de chat de disparo

```gherkin
Feature: Segurança e isolamento multi-tenant no encaminhamento de chats

  Background:
    Given que existem dois accounts distintos: "Account A" e "Account B"
    And cada account possui chats originados por disparo
    And estou autenticado no "Account A" com role manager

  Scenario: Tentativa de encaminhar chat de outro account é bloqueada
    Given que obtenho o UUID de um chat de disparo pertencente ao "Account B"
    When realizo uma requisição de encaminhamento via API usando o UUID do chat do "Account B"
    Then a API retorna HTTP 403 ou HTTP 404
    And o chat do "Account B" não é modificado
    And nenhum dado do "Account B" é exposto na resposta

  Scenario: Encaminhamento dentro do próprio account funciona corretamente
    Given que seleciono um chat de disparo do "Account A"
    When realizo o encaminhamento para um usuário do "Account A"
    Then a API retorna HTTP 200
    And o chat aparece em "Atribuídos a mim" para o usuário destino do "Account A"
```

---

## Validação por Agente Crítico Independente

**Avaliação aplicada aos 12 cenários iniciais:**

**Rastreabilidade:**
- CT-DISPATCH-001 → CA "encaminhado manualmente → aparece em Atribuídos a mim" ✅
- CT-DISPATCH-002 → CA "encaminhado para departamento → aparece em Todas as Conversas e filtro do departamento" ✅
- CT-DISPATCH-003 → CA "com resposta do contato → continua sendo movido corretamente (regressão)" ✅
- CT-DISPATCH-004 → CA "sem encaminhamento e sem resposta → permanece em Disparos" ✅
- CT-DISPATCH-005 → Cobertura da camada API para os CAs acima ✅
- CT-DISPATCH-006 → Regra implícita de autorização (Gate is-manager para encaminhamento) ✅
- CT-DISPATCH-007 → Borda: múltiplos encaminhamentos consecutivos ✅
- CT-DISPATCH-008 → CA "cenário HubSpot: operadores visualizam sem buscar número" ✅
- CT-DISPATCH-009 → Negativo: payload inválido na API ✅
- CT-DISPATCH-010 → Regressão: chat não-disparo não deve ser afetado ✅
- CT-DISPATCH-011 → Segurança: multi-tenant ✅
- CT-DISPATCH-012 → Borda: atualização em tempo real via broadcast ✅

**Duplicatas identificadas:** Nenhuma — cada cenário cobre um fluxo distinto.

**Cobertura mínima:**
- Happy path: CT-DISPATCH-001, CT-DISPATCH-002 ✅ (2/2)
- Negativos/erro: CT-DISPATCH-006, CT-DISPATCH-009, CT-DISPATCH-010 ✅ (3/3)
- Borda: CT-DISPATCH-007, CT-DISPATCH-012 ✅ (2/2)
- Segurança: CT-DISPATCH-011 ✅ (1/1)
- Regressão (adicional): CT-DISPATCH-003, CT-DISPATCH-004, CT-DISPATCH-008 ✅

**Assunções indevidas:** Nenhuma — todos os cenários derivam de critérios de aceite ou regras explícitas no card.

**Excesso técnico:** CT-DISPATCH-005 e CT-DISPATCH-011 referem endpoints de API mas são executáveis via Postman/curl por QA sem conhecimento de código.

**Ajustes aplicados após revisão crítica:**
- CT-DISPATCH-004: pré-requisito de "sem resposta do contato" tornado mais explícito.
- CT-DISPATCH-008: pré-requisito da integração HubSpot marcado como ⚠️ Bloqueável.
- CT-DISPATCH-012: marcado ⚠️ Bloqueável para ambiente WebSocket.
- Todos os pré-requisitos que dependem de configuração de ambiente foram revisados e marcados com ⚠️ Bloqueável quando aplicável.

- Aprovados sem alteração: 8
- Revisados: 4 (CT-DISPATCH-004, CT-DISPATCH-008, CT-DISPATCH-012, CT-DISPATCH-005)
- Adicionados por cobertura insuficiente: 0
