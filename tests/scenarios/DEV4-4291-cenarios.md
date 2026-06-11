# Cenários de Teste — DEV4-4291
> Card: Rota de mensagens agendadas ignora filtro de contato e retorna dados globais da conta
> Gerado em: 2026-06-01
> Card atualizado em: 2026-06-01T11:06:20-03:00

⚠️ **KB inacessível** — `KB_PATH` ausente e `gh` CLI não encontrado no PATH. Cenários gerados com base no card e nos padrões do projeto.

---

## Estratégia de Teste

**Escopo:** Bug na rota `GET /v3/accounts/{account_uuid}/users/{user_uuid}/scheduled-messages?contact_uuid={contact_uuid}` — o filtro `contact_uuid` é ignorado pelo backend, retornando mensagens agendadas globais da conta. O foco é validar que, após a correção: (1) o filtro funciona corretamente, (2) dados de outros contatos são isolados, (3) a listagem sem filtro (contexto geral) permanece funcional.

**Tipos de teste:** Funcional (happy path, filtro, isolamento de dados), Regressão (listagem global sem filtro), Segurança (vazamento de dados entre contatos, acesso com `contact_uuid` de outra conta) e Borda (contato sem agendamentos, UUID inválido, conta com volume elevado).

**Prioridade de execução:** 1) Filtro por `contact_uuid` retorna apenas dados do contato; 2) Dados de outros contatos não vazam; 3) Listagem global funciona; 4) UUIDs inválidos e casos de borda.

**Riscos principais:** Vazamento de dados entre operadores/contatos (privacidade); sobrecarga de requisições por retorno não filtrado; regressão na listagem global ao aplicar o filtro em contexto indevido; filtro silenciosamente ignorado sem erro (bug difícil de detectar visualmente se o contato tiver poucos agendamentos).

---

## Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Filtro `contact_uuid` ainda ignorado após correção (bug persiste) | M | A | 🔴 Alta |
| Dados de outros contatos visíveis ao abrir histórico de agendamentos de um contato específico | A | A | 🔴 Alta |
| Regressão: listagem global (sem `contact_uuid`) deixa de funcionar | M | A | 🔴 Alta |
| UUID de contato de outra conta retorna dados (bypass de isolamento por conta) | B | A | 🔴 Alta |
| Contato com 0 agendamentos retorna lista não vazia (dados de outro contato vazando) | M | A | 🔴 Alta |
| Volume de resposta proporcional não verificado — retorno global ainda ocorre mas com menos itens | M | M | 🟡 Média |
| `contact_uuid` inválido/malformado causa erro 500 em vez de 400 | M | M | 🟡 Média |
| Lentidão progressiva na UI persiste mesmo após correção (cache ou bug secundário) | B | M | 🟡 Média |

---

## Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-SCHED-001 | Filtro retorna somente agendamentos do contato | Conta com ao menos 2 contatos (A e B), cada um com ao menos 1 mensagem agendada cadastrada. ⚠️ Bloqueável — criável via API: `POST /v3/accounts/{account_uuid}/scheduled-messages` | 1. Autenticar como operador da conta. 2. Chamar `GET /v3/accounts/{account_uuid}/users/{user_uuid}/scheduled-messages?contact_uuid={uuid_contato_A}`. 3. Verificar os registros retornados. | HTTP 200. Todos os registros retornados possuem `contact_uuid` igual ao `{uuid_contato_A}` informado. Nenhum registro de outros contatos está presente. *(CA1 e CA2)* | 🔴 Alta | API | — |
| CT-SCHED-002 | Listagem global sem filtro retorna todos os agendamentos | Conta com ao menos 2 contatos com mensagens agendadas. | 1. Autenticar como operador. 2. Chamar `GET /v3/accounts/{account_uuid}/users/{user_uuid}/scheduled-messages` sem parâmetro `contact_uuid`. 3. Verificar a resposta. | HTTP 200. A resposta contém agendamentos de múltiplos contatos da conta. Todos os agendamentos da conta são retornados normalmente. *(CA4 — regressão da listagem global)* | 🔴 Alta | API | — |
| CT-SCHED-003 | Dados de outro contato não aparecem no filtro | Conta com contatos A e B, cada um com mensagens agendadas conhecidas. ⚠️ Bloqueável — criável via API: `POST /v3/accounts/{account_uuid}/scheduled-messages` | 1. Autenticar como operador. 2. Chamar `GET /v3/accounts/{account_uuid}/users/{user_uuid}/scheduled-messages?contact_uuid={uuid_contato_B}`. 3. Verificar se registros do contato A aparecem na resposta. | HTTP 200. Nenhum registro do contato A está presente na resposta. Apenas registros do contato B são retornados. *(CA2 — isolamento de dados entre contatos)* | 🔴 Alta | API | CT-SCHED-001 |
| CT-SCHED-004 | Contato sem agendamentos retorna lista vazia | Conta com contato C sem nenhuma mensagem agendada. | 1. Autenticar como operador. 2. Chamar `GET /v3/accounts/{account_uuid}/users/{user_uuid}/scheduled-messages?contact_uuid={uuid_contato_C}`. 3. Verificar a resposta. | HTTP 200. Corpo da resposta contém lista vazia (`[]` ou equivalente). Nenhum agendamento de outros contatos é retornado no lugar da lista vazia. *(CA1 + RN1 — borda)* | 🔴 Alta | API | — |
| CT-SCHED-005 | UI exibe somente agendamentos do contato selecionado | Operador logado na plataforma; contatos A e B com agendamentos distintos. | 1. Acessar o chat do contato A na plataforma. 2. Abrir o histórico/painel de mensagens agendadas do contato A. 3. Anotar os agendamentos exibidos. 4. Acessar o chat do contato B. 5. Abrir o histórico de mensagens agendadas do contato B. | Passo 3: somente agendamentos vinculados ao contato A são listados. Passo 5: somente agendamentos vinculados ao contato B são listados. Nenhuma mistura entre os dois contatos. *(CA1 e CA2 via UI)* | 🔴 Alta | UI | CT-SCHED-001 |
| CT-SCHED-006 | `contact_uuid` inválido retorna erro adequado | Operador autenticado. | 1. Chamar `GET /v3/accounts/{account_uuid}/users/{user_uuid}/scheduled-messages?contact_uuid=uuid-invalido-123`. | HTTP 400 ou 422. Corpo da resposta contém mensagem de erro indicando parâmetro inválido. Nenhum dado de agendamento é retornado. Servidor não retorna HTTP 500. *(Borda — parâmetro malformado)* | 🟡 Média | API | — |
| CT-SCHED-007 | `contact_uuid` de outra conta não expõe dados | Conta X e Conta Y, cada uma com mensagens agendadas. `contact_uuid` pertence à Conta Y. | 1. Autenticar como operador da Conta X. 2. Chamar `GET /v3/accounts/{account_uuid_X}/users/{user_uuid}/scheduled-messages?contact_uuid={uuid_contato_conta_Y}`. 3. Verificar a resposta. | HTTP 200 com lista vazia, ou HTTP 403/404. Nenhum dado da Conta Y é retornado para o operador da Conta X. *(Segurança — isolamento entre contas)* | 🔴 Alta | API | — |
| CT-SCHED-008 | Volume de resposta proporcional ao contato | Conta com contato A (3 agendamentos) e contato B (50 agendamentos). | 1. Autenticar como operador. 2. Chamar `GET /v3/accounts/{account_uuid}/users/{user_uuid}/scheduled-messages?contact_uuid={uuid_contato_A}`. 3. Contar os registros retornados. | HTTP 200. Exatamente 3 registros retornados (número igual aos agendamentos do contato A). Não retorna os 50 do contato B nem a soma total da conta. *(CA3 — volume proporcional ao contato)* | 🟡 Média | API | CT-SCHED-001 |
| CT-SCHED-009 | `contact_uuid` como string vazia não expõe dados | Operador autenticado. | 1. Chamar `GET /v3/accounts/{account_uuid}/users/{user_uuid}/scheduled-messages?contact_uuid=`. | A resposta não deve retornar HTTP 500. Não deve expor dados de forma inesperada — se retornar dados, deve ser equivalente à listagem global sem filtro; se retornar erro, deve ser HTTP 400 com mensagem clara. *(Borda — parâmetro vazio)* | 🟡 Média | API | — |
| CT-SCHED-010 | Requisição sem autenticação é rejeitada | Nenhum token de autenticação. | 1. Chamar `GET /v3/accounts/{account_uuid}/users/{user_uuid}/scheduled-messages?contact_uuid={uuid_contato_A}` sem header `Authorization`. | HTTP 401. Nenhum dado de agendamento retornado. *(Segurança — autenticação obrigatória)* | 🔴 Alta | API | — |

---

## Cenários Gherkin (BDD)

```gherkin
Cenário: Filtro por contact_uuid retorna somente agendamentos do contato informado
  Dado que existe uma conta com dois contatos (A e B), cada um com mensagens agendadas distintas
  E o operador está autenticado na API
  Quando o operador faz GET /v3/accounts/{account_uuid}/users/{user_uuid}/scheduled-messages?contact_uuid={uuid_contato_A}
  Então a resposta HTTP é 200
  E todos os registros retornados possuem contact_uuid igual ao uuid_contato_A
  E nenhum registro do contato B está presente na resposta
```

```gherkin
Cenário: contact_uuid de outra conta não expõe dados alheios
  Dado que existem duas contas distintas (X e Y), cada uma com mensagens agendadas
  E o operador está autenticado como usuário da Conta X
  Quando o operador faz GET com account_uuid da Conta X e contact_uuid pertencente à Conta Y
  Então a resposta HTTP é 200 com lista vazia ou HTTP 403
  E nenhum dado da Conta Y é retornado para o operador da Conta X
```

---

## Validação por Agente Crítico

```
✅ Validação por agente crítico concluída:
   Aprovados sem alteração: 9
   Revisados: 1 (CT-SCHED-009 — resultado esperado ajustado para não ser prescritivo quanto ao código HTTP)
   Adicionados por cobertura insuficiente: 0
```
