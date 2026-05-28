# Cenários de Teste — dev4-4245
> Card: Listagem de chats exibe departamento incorreto no card do chat
> Gerado em: 2026-05-27
> Card atualizado em: 2026-05-26T11:26:32-03:00

---

## Estratégia de Teste

O bug está na exibição do campo de departamento no card de chat da listagem de atendimentos — o dado mostrado não reflete o departamento real do atendimento. Tipos de teste: **funcional** (verificação do dado correto pós-fix), **regressão** (outros usuários e departamentos não afetados pela correção), **integridade de dados** (campo não exibe departamento de outro atendimento por contaminação). Prioridade: validação direta do caso Anna Teixeira primeiro, depois cobertura de outros usuários e departamentos. Risco principal: a correção pode resolver o caso específico relatado mas introduzir regressão para usuários com múltiplos departamentos ou chats transferidos.

---

## Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Fix corrige Anna Teixeira mas introduz regressão em outros usuários | M | A | 🔴 Alta |
| Departamento "Suporte técnico" persiste em cards de outros usuários sem esse vínculo | A | M | 🟡 Média |
| Chat transferido entre departamentos exibe departamento desatualizado após fix | M | M | 🟡 Média |
| Departamento de um chat contamina o card de outro chat na mesma listagem | M | M | 🟡 Média |
| Usuário com múltiplos departamentos exibe departamento padrão em vez do departamento do atendimento | M | M | 🟡 Média |
| Chat sem departamento atribuído exibe dado inválido ou de outro atendimento | B | B | 🟢 Baixa |

---

## Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-LISTAGEM-001 | Departamento correto para Anna Teixeira | Usuário autenticado; Anna Teixeira cadastrada com departamento "Pré Venda" (RN3); pelo menos um chat ativo atribuído a ela visível na listagem. | 1. Acessar a listagem de chats. 2. Localizar um chat atribuído à Anna Teixeira. 3. Verificar o departamento exibido no card do chat. | O card exibe "Pré Venda" como departamento (RN1, RN3); "Suporte técnico" não aparece. | 🔴 Alta | UI | — |
| CT-LISTAGEM-002 | Múltiplos usuários exibem departamentos corretos | Pelo menos 2 usuários cadastrados em departamentos distintos (ex: "Pré Venda" e "Financeiro"); chats atribuídos a cada um visíveis na listagem. Valida RN1 e RN2 para além do caso pontual da Anna Teixeira. | 1. Acessar a listagem de chats. 2. Localizar chat atribuído ao usuário do departamento A; verificar departamento no card. 3. Localizar chat atribuído ao usuário do departamento B; verificar departamento no card. | Cada card exibe o departamento correto do seu atendimento (RN1); nenhum departamento cruzado entre os dois cards (RN2). | 🟡 Média | UI | — |
| CT-LISTAGEM-003 | "Suporte técnico" ausente para usuário não vinculado | Usuário autenticado; atendente cadastrado em departamento diferente de "Suporte técnico"; chat ativo atribuído a esse atendente visível na listagem. | 1. Acessar a listagem de chats. 2. Localizar um chat atribuído a um atendente cujo departamento não é "Suporte técnico". 3. Verificar o departamento exibido no card. | O departamento exibido não é "Suporte técnico" (RN2); é o departamento correto do atendimento (RN1). | 🔴 Alta | UI | — |
| CT-LISTAGEM-004 | Departamento de um chat não contamina outro card | Dois chats distintos na listagem, cada um atribuído a atendentes de departamentos diferentes. | 1. Acessar a listagem de chats. 2. Verificar o departamento exibido no card do chat A (atendente do departamento X). 3. Verificar o departamento exibido no card do chat B (atendente do departamento Y). 4. Confirmar que os valores são independentes entre si. | O card do chat A exibe o departamento X; o card do chat B exibe o departamento Y; nenhum valor de um card aparece no outro (RN1 — sem cross-contamination). | 🟡 Média | UI | — |
| CT-LISTAGEM-005 | Após transferência, card exibe departamento atualizado | Chat ativo na listagem com departamento X visível. Justificativa de escopo: valida que o fix de RN1 persiste após mudança de atribuição — regressão crítica do bug descrito. | 1. Verificar o departamento exibido no card de um chat específico. 2. Transferir o chat para o departamento Y. 3. Atualizar a listagem. 4. Verificar o departamento exibido no card do mesmo chat. | Card exibe o departamento Y (novo); departamento X não aparece mais para esse chat (RN1). | 🟡 Média | UI | — |
| CT-LISTAGEM-006 | Reload não regride para departamento errado | Chat de Anna Teixeira (ou outro usuário) exibindo o departamento correto após o fix. Valida estabilidade do fix de RN1 após recarregamento. | 1. Verificar o departamento correto no card do chat (RN1). 2. Recarregar a página (F5). 3. Verificar o departamento exibido no card após o reload. | Departamento correto mantido após recarregamento (RN1); nenhum dado incorreto retorna. | 🟡 Média | UI | CT-LISTAGEM-001 |
| CT-LISTAGEM-007 | Atendente sem histórico em "Suporte técnico" nunca vê esse departamento | Atendente cadastrado exclusivamente em departamento "Pré Venda" ou similar, sem qualquer vínculo histórico com "Suporte técnico"; chats atribuídos a ele visíveis na listagem. | 1. Acessar a listagem de chats com usuário autenticado. 2. Localizar todos os cards de chats atribuídos ao atendente em questão. 3. Verificar o departamento exibido em cada card. | Nenhum card exibe "Suporte técnico" para esse atendente, independentemente do histórico de atendimentos anteriores (RN2). | 🟡 Média | UI | — |
| CT-LISTAGEM-008 | Departamento de atendentes diferentes não se mistura | Dois atendentes de departamentos distintos com chats ativos na mesma listagem visível para um gestor. | 1. Autenticar como gestor com visibilidade de múltiplos atendentes. 2. Verificar o departamento exibido no card de um chat do atendente A. 3. Verificar o departamento exibido no card de um chat do atendente B. 4. Confirmar que os dados de departamento não se misturam entre os dois atendentes. | O card do atendente A exibe apenas o departamento de A; o card do atendente B exibe apenas o departamento de B; nenhum dado de um atendente aparece no card do outro (RN1 — integridade dos dados por atendente). | 🟡 Média | UI | — |

---

## Cenários Gherkin (BDD)

```gherkin
Cenário: Departamento correto exibido no card de chat da Anna Teixeira
  Dado que Anna Teixeira está cadastrada com o departamento "Pré Venda"
  E que existe pelo menos um chat ativo atribuído a ela na listagem
  Quando o usuário acessa a listagem de chats e localiza um chat de Anna Teixeira
  Então o card do chat exibe "Pré Venda" como departamento
  E o departamento "Suporte técnico" não aparece no card
```

```gherkin
Cenário: Departamento "Suporte técnico" ausente para usuário não vinculado a ele
  Dado que existe um atendente cadastrado em departamento diferente de "Suporte técnico"
  E que há um chat ativo atribuído a esse atendente na listagem
  Quando o usuário acessa a listagem de chats e localiza o card desse chat
  Então o departamento exibido no card não é "Suporte técnico"
  E o departamento exibido corresponde ao departamento real do atendimento
```

---

## Validação por Agente Crítico

✅ Validação por agente crítico concluída:
- Aprovados sem alteração: 2 (CT-LISTAGEM-001, CT-LISTAGEM-003)
- Revisados: 3 (CT-LISTAGEM-002, CT-LISTAGEM-005, CT-LISTAGEM-006)
- Adicionados/substituídos por cobertura insuficiente: 3 (CT-LISTAGEM-004, CT-LISTAGEM-007, CT-LISTAGEM-008)

---

**Resumo:** 8 cenários — 🔴 2 Alta | 🟡 6 Média | 🟢 0 Baixa | 2 cenários Gherkin
