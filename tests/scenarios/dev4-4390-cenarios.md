# Cenários de Teste — DEV4-4390
> Card: Painel de Tickets e Oportunidades não lista cards do Flow vinculados ao contato no chat
> Gerado em: 2026-06-12
> Card atualizado em: 2026-06-11T09:38:14-0300
> ⚠️ KB inacessível — cenários gerados com base no conteúdo do card. gh CLI indisponível no contexto de geração.
> ✅ Validação por agente crítico independente: 3 aprovados | 4 revisados (CT-FLOW-004, CT-FLOW-006, CT-FLOW-007, CT-FLOW-008) | 1 removido (CT-FLOW-005 — fora do escopo do card)

---

## Estratégia de Teste

O escopo é funcional: o painel lateral de Tickets e Oportunidades (Flow) não exibe a listagem de cards já vinculados ao contato, exibindo área vazia mesmo quando existem registros. Testes de regressão funcional têm prioridade para garantir que os botões de criação não foram afetados. O risco principal é de isolamento de dados: a listagem deve exibir apenas registros do contato correto, nunca de outros contatos. Tipos de teste: funcional UI, regressão, borda e segurança/isolamento. Prioridade: 1º validar exibição da listagem → 2º estado vazio → 3º botões de criação → 4º navegação entre chats → 5º borda e isolamento.

---

## Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Listagem continua vazia após a correção (fix incompleto) | M | A | Alta |
| Registros de outros contatos aparecem no painel (vazamento de dados) | B | A | Alta |
| Botões de criar Ticket/Oportunidade param de funcionar após o fix | B | A | Alta |
| Painel não atualiza ao navegar entre chats diferentes | M | M | Média |
| Estado vazio não é exibido corretamente (painel quebrado sem registros) | M | M | Média |
| Comportamento inconsistente com somente um tipo de registro (só Ticket ou só Oportunidade) | M | M | Média |
| Painel trava ou quebra layout com grande volume de registros | B | B | Baixa |

---

## Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-FLOW-001 | Painel lista registros vinculados ao contato | Contato com ao menos 1 Ticket e 1 Oportunidade já criados no Flow; operador com acesso ao painel Flow na tela de chat. ⚠️ Bloqueável — registros criáveis pela interface Flow ou via API do Flow | 1. Abrir a conversa de chat do contato que possui registros no Flow. 2. Abrir o painel lateral de Tickets e Oportunidades. 3. Aguardar carregamento da listagem. 4. Verificar o conteúdo exibido abaixo dos botões de criação. | A listagem exibe os registros (Tickets e/ou Oportunidades) vinculados ao contato. Cada item apresenta ao mínimo um identificador legível (título ou número do card). A área não fica vazia. _Vínculo: CA-1_ | 🔴 Alta | UI | — |
| CT-FLOW-002 | Estado vazio para contato sem registros | Contato sem nenhum Ticket ou Oportunidade vinculado no Flow; operador com acesso ao painel Flow | 1. Abrir a conversa de um contato sem registros no Flow. 2. Abrir o painel lateral de Tickets e Oportunidades. 3. Aguardar carregamento. 4. Observar a área abaixo dos botões. | A área exibe um estado vazio (mensagem ou indicador visual de "nenhum registro"), sem itens listados e sem erro. Os botões de criação permanecem visíveis e funcionais. _Vínculo: CA-2_ | 🟡 Média | UI | — |
| CT-FLOW-003 | Botões de criação funcionam após correção | Operador com permissão para criar Tickets e Oportunidades no Flow; qualquer conversa de chat aberta | 1. Abrir o painel lateral de Tickets e Oportunidades. 2. Clicar em **Criar Ticket** → verificar abertura do formulário/modal de criação. 3. Fechar sem salvar. 4. Clicar em **Criar Oportunidade** → verificar abertura do formulário/modal de criação. 5. Fechar sem salvar. | Ambos os botões abrem o fluxo de criação corretamente. Nenhuma ação falha ou fica sem resposta ao clique. O comportamento é idêntico ao anterior à correção do bug. _Vínculo: CA-3_ | 🟡 Média | UI | CT-FLOW-001 |
| CT-FLOW-004 | Listagem atualiza ao navegar entre chats | Dois contatos distintos: contato A com registros no Flow, contato B sem registros (ou com registros diferentes). ⚠️ Bloqueável — registros criáveis via interface Flow | 1. Abrir chat do contato A → abrir painel → verificar que registros do contato A aparecem. 2. Navegar para o chat do contato B. 3. Abrir o painel lateral de Tickets e Oportunidades no chat do contato B. 4. Verificar o conteúdo exibido. | O painel exibe somente os registros vinculados ao contato B (ou estado vazio). Nenhum registro do contato A aparece. O painel é atualizado corretamente ao trocar de chat. _Vínculo: RN-1 (implícito — o painel exibe registros do contato do chat atual)_ | 🟡 Média | UI | CT-FLOW-001 |
| CT-FLOW-006 | Painel com somente um tipo de registro | Dois contatos: contato A com somente Tickets (sem Oportunidades), contato B com somente Oportunidades (sem Tickets). ⚠️ Bloqueável — registros criáveis via interface Flow | 1. Abrir chat do contato A → abrir painel → verificar listagem de Tickets e área de Oportunidades. 2. Abrir chat do contato B → abrir painel → verificar listagem de Oportunidades e área de Tickets. | Em cada caso, somente o tipo de registro existente é listado. A seção do tipo ausente exibe estado vazio graciosamente (sem erro, sem itens fantasma). _Vínculo: CA-1 — "listagem exibida corretamente" implica comportamento correto para cada tipo de registro disponível_ | 🟡 Média | UI | CT-FLOW-001 |
| CT-FLOW-007 | Painel com grande volume de registros | Contato com 10 ou mais Tickets e/ou Oportunidades vinculados no Flow. ⚠️ Bloqueável — registros criáveis via interface Flow | 1. Abrir chat do contato com muitos registros. 2. Abrir o painel de Tickets e Oportunidades. 3. Verificar que todos os registros visíveis são pertencentes ao contato correto. 4. Verificar que o layout da tela de chat não é comprometido. | Todos os registros visíveis são do contato correto, sem dados incorretos ou duplicados. O painel não quebra o layout da tela de chat. _Cobertura estendida — card não especifica limite de exibição; cenário verifica integridade da listagem com volume acima do comum_ | 🟢 Baixa | UI | CT-FLOW-001 |
| CT-FLOW-008 | Registros de outro contato não aparecem no painel | Dois contatos distintos: contato A com registros no Flow; contato B sem registros | 1. Abrir o chat do contato B. 2. Abrir o painel lateral de Tickets e Oportunidades. 3. Verificar se algum registro não pertencente ao contato B é exibido na listagem ou na área do painel. | O painel exibe apenas estado vazio para o contato B. Nenhum registro de outros contatos é visível. A correção do bug não expõe registros de outros contatos na listagem. _Vínculo: RN-1 (registros do contato do chat) — isolamento de dados é condição implícita do painel_ | 🔴 Alta | UI | CT-FLOW-001 |

---

## Cenários Gherkin (BDD)

```gherkin
Cenário: Painel exibe listagem de registros vinculados ao contato
  Dado que o contato possui ao menos um Ticket e uma Oportunidade vinculados no Flow
  E que o operador está com a conversa de chat do contato aberta
  Quando o operador abre o painel lateral de Tickets e Oportunidades
  Então a listagem de registros é exibida abaixo dos botões de criação
  E cada item apresenta ao mínimo um identificador legível (título ou número do card)
  E a área não fica vazia
```

```gherkin
Cenário: Registros de outros contatos não aparecem no painel
  Dado que o contato B não possui registros no Flow
  E que o contato A possui registros vinculados no Flow
  Quando o operador abre o painel de Tickets e Oportunidades no chat do contato B
  Então o painel exibe estado vazio para o contato B
  E nenhum registro pertencente ao contato A é exibido
```

---

**Resumo:** 7 cenários — 🔴 2 Alta | 🟡 4 Média | 🟢 1 Baixa | 2 cenários Gherkin
