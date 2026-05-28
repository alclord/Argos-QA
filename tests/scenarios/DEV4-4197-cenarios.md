# Cenários de Teste — DEV4-4197
> Card: Migração da tela de Créditos (Assinaturas) para a Nova Interface
> Gerado em: 2026-05-28
> Card atualizado em: 2026-05-28T08:29:31 -0300

---

## Resumo do Card

- **Tipo:** História
- **Prioridade:** Medium
- **Status:** Criando Cenários de Teste
- **Objetivo:** Migrar a tela de Assinaturas da interface legada para a Nova Interface (foundation-spa), reproduzindo todas as funcionalidades existentes (listagem, resumo de transação, pagamento via cartão, download de boleto, adição de assinaturas). Inclui nova funcionalidade: desativar a recorrência de uma assinatura diretamente pela plataforma, sem acesso ao banco de dados ou sincronização com o Superlógica.

---

## BLOCO 1 — Estratégia de Teste

O escopo cobre a migração da tela de Assinaturas da interface legada para o foundation-spa e a implementação de uma nova funcionalidade irreversível: desativação de recorrência. Tipos de teste aplicáveis: **funcional** (8 user stories da listagem ao fluxo de compra), **regressão** (behaviors existentes de pagamento e download não regridem na nova interface), **tratamento de erro** (falha no endpoint de desativação, compra inválida), **segurança** (endpoint de desativação sem auth, acesso por role não-Gestor) e **borda** (estado vazio, recálculo dinâmico, cancelamento do modal de confirmação). Prioridade de execução: CT-ASSIN-001 (lista carrega) e CT-ASSIN-007 (desativação completa) primeiro — bloqueiam toda a suite se falharem. Riscos principais: atualização indevida de status na UI após falha na API de desativação (ação irreversível) e exibição incorreta da seção "Opções de Pagamento" por status.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Falha no endpoint de desativação atualiza o status na UI mesmo assim (divergência UI × backend em ação irreversível) | M | A | 🔴 Alta |
| "Opções de Pagamento" exibida para status `Pagamento Aprovado`, induzindo pagamento duplicado | B | A | 🔴 Alta |
| Botão "Desativar recorrência" permanece visível após desativação bem-sucedida (estado desatualizado na UI) | M | M | 🟡 Média |
| Log de auditoria da desativação não gravado silenciosamente (sem feedback de falha no log) | B | A | 🟡 Média |
| Download de boleto falha sem exibir mensagem de erro (feedback ausente para o Gestor) | M | M | 🟡 Média |
| Valor total no modal de compra não recalcula ao trocar pacote ou quantidade (cálculo dinâmico quebrado) | B | M | 🟢 Baixa |
| Responsividade quebrada em telas de 1280px com overflow ou sobreposição de elementos | B | B | 🟢 Baixa |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-ASSIN-001 | Lista de assinaturas carrega em ordem correta | Gestor autenticado na Nova Interface; conta com ao menos 2 assinaturas com Datas de Solicitação distintas | 1. Logar como Gestor na Nova Interface. 2. Navegar para "Lista de Assinaturas" no menu lateral. 3. Verificar os registros na tabela. | A tabela exibe todas as assinaturas da conta. A linha com a Data Solicitação mais recente aparece primeira. Cada linha contém: Serviço, Quantidade, Data Solicitação, Valor Total, badge de Status e ícone de olho (👁). Sem tela em branco ou erro. | 🔴 Alta | UI | — |
| CT-ASSIN-002 | Modal de Detalhes abre com dados da linha | Gestor autenticado; ao menos 1 assinatura na lista | 1. Acessar a tela de Assinaturas. 2. Clicar no ícone de olho (👁) em uma assinatura. 3. Verificar os campos exibidos no modal "Detalhes do Pedido". | O modal abre. Os campos de data, valor, serviço e status exibidos no modal correspondem aos dados da linha selecionada (mesma linha clicada). | 🟡 Média | UI | CT-ASSIN-001 |
| CT-ASSIN-003 | "Opções de Pagamento" visível para 4 status | Gestor autenticado; conta com ao menos 1 assinatura em cada um dos status: `Pagamento Atrasado`, `Pagamento Pendente`, `Liberação Manual`, `Recorrente` — ⚠️ Bloqueável — garantir via ambiente de teste com assinaturas nesses status | 1. Para cada um dos 4 status: clicar no ícone de olho da linha correspondente. 2. Verificar se a seção "Opções de Pagamento" está visível no modal. 3. Verificar se os botões "Pagar via Cartão" e "Baixar boleto" estão presentes. | Para cada um dos 4 status, a seção "Opções de Pagamento" é visível no modal com ambos os botões. | 🟡 Média | UI | CT-ASSIN-001 |
| CT-ASSIN-004 | "Opções de Pagamento" oculta para Pagamento Aprovado | Gestor autenticado; ao menos 1 assinatura com status `Pagamento Aprovado` | 1. Acessar a tela de Assinaturas. 2. Clicar no ícone de olho da linha com status "Pagamento Aprovado". 3. Verificar o modal. | A seção "Opções de Pagamento" NÃO é exibida no modal. Os botões "Pagar via Cartão" e "Baixar boleto" não aparecem. | 🟡 Média | UI | CT-ASSIN-001 |
| CT-ASSIN-005 | Download de boleto inicia com sucesso | Gestor autenticado; assinatura com status que exibe "Opções de Pagamento" (ex: `Pagamento Pendente`) | 1. Acessar a tela de Assinaturas. 2. Clicar no ícone de olho de uma assinatura pendente. 3. No modal, clicar em "Baixar boleto". | O download do boleto em PDF inicia no browser. Um toast de sucesso é exibido confirmando o início do download. Nenhuma mensagem de erro é exibida na interface. | 🟡 Média | UI | CT-ASSIN-003 |
| CT-ASSIN-006 | Compra de assinatura válida fecha e recarrega lista | Gestor autenticado; ao menos 1 pacote disponível no dropdown — ⚠️ Bloqueável — verificar existência de pacotes no ambiente de staging | 1. Clicar em "Adicionar assinatura ⊕" no cabeçalho. 2. Selecionar um pacote no dropdown. 3. Inserir quantidade 1. 4. Verificar o Valor Total exibido. 5. Clicar em "Comprar". | O Valor Total corresponde ao preço unitário do pacote selecionado × quantidade. Após "Comprar": o modal fecha, um toast de sucesso é exibido, a lista de assinaturas recarrega e a nova assinatura aparece no topo da tabela. | 🟡 Média | UI | CT-ASSIN-001 |
| CT-ASSIN-007 | Desativar recorrência — fluxo completo com sucesso | Gestor autenticado; ao menos 1 assinatura com status `Recorrente` na conta — ⚠️ Bloqueável — garantir via ambiente de teste com assinatura em status Recorrente | 1. Clicar no ícone de olho de uma assinatura com status "Recorrente". 2. Verificar que o botão "Desativar recorrência" está visível. 3. Clicar em "Desativar recorrência". 4. Verificar que o modal de confirmação é exibido antes de qualquer ação. 5. Confirmar a desativação. 6. Verificar o estado da interface. | No passo 4, o modal de confirmação é exibido e nenhuma chamada de API é disparada ainda. Após confirmar: toast de sucesso é exibido, modal fecha. Na tabela, o badge da linha passa a exibir "Recorrência desativada" (fundo `#E9EAED`, texto `#636B7B`). Ao reabrir o modal da mesma assinatura, o botão "Desativar recorrência" não aparece mais. (Verificação do log de auditoria: coberta em CT-ASSIN-015.) | 🔴 Alta | UI | CT-ASSIN-001 |
| CT-ASSIN-008 | Botão "Desativar recorrência" ausente para não-Recorrente | Gestor autenticado; ao menos 1 assinatura com status diferente de `Recorrente` (ex: `Pagamento Aprovado`, `Pagamento Pendente`) | 1. Clicar no ícone de olho de uma assinatura com status "Pagamento Aprovado". 2. Verificar o modal. 3. Repetir para status "Pagamento Pendente". | O botão "Desativar recorrência" NÃO está visível no modal para nenhum status diferente de `Recorrente`. Nenhum elemento de confirmação ou desativação é exibido. | 🟡 Média | UI | CT-ASSIN-001 |
| CT-ASSIN-009 | Compra sem pacote exibe erro de validação | Gestor autenticado; modal "Adicionar Assinatura" acessível | 1. Clicar em "Adicionar assinatura ⊕". 2. Não selecionar nenhum pacote (manter "Selecione o pacote"). 3. Clicar em "Comprar". | O modal NÃO fecha. Uma mensagem de erro de validação é exibida no campo dropdown. Nenhuma requisição de compra é disparada. | 🔴 Alta | UI | CT-ASSIN-001 |
| CT-ASSIN-010 | Falha na desativação mantém status inalterado | Gestor autenticado; assinatura com status `Recorrente`; DevTools disponível para bloquear `POST /api/v1/subscriptions/{id}/deactivate` via Network → Block request URL | 1. Configurar o DevTools para bloquear a request do endpoint de desativação. 2. Clicar no ícone de olho da assinatura Recorrente. 3. Clicar em "Desativar recorrência". 4. No modal de confirmação, confirmar. 5. Verificar o comportamento. | Um toast de erro é exibido. O status da assinatura na tabela permanece "Recorrente" — não atualiza para "Recorrência desativada". Nenhuma mensagem de erro não tratada é exibida na interface. | 🔴 Alta | UI | CT-ASSIN-007 |
| CT-ASSIN-011 | "Voltar" no modal de confirmação cancela a ação | Gestor autenticado; assinatura com status `Recorrente` | 1. Clicar no ícone de olho de uma assinatura Recorrente. 2. Clicar em "Desativar recorrência". 3. No modal de confirmação, clicar em "Voltar". 4. Verificar o estado da interface. | O modal de confirmação fecha. Nenhuma chamada ao endpoint de desativação é disparada. O status da assinatura permanece "Recorrente". A interface retorna ao estado anterior sem nenhuma alteração de dados. — borda: valida que o fluxo de confirmação em 2 etapas protege a ação irreversível. | 🟡 Média | UI | CT-ASSIN-007 |
| CT-ASSIN-012 | Estado vazio exibido sem assinaturas | Gestor autenticado em conta sem nenhuma assinatura contratada — ⚠️ Bloqueável — usar conta de teste específica sem assinaturas | 1. Acessar a tela de Assinaturas com essa conta. 2. Verificar o conteúdo da tela. | Uma mensagem de estado vazio é exibida, sem erro, spinner infinito ou tela em branco. O botão "Adicionar assinatura ⊕" permanece visível no cabeçalho. — borda: valida o empty state da migração. | 🟢 Baixa | UI | — |
| CT-ASSIN-013 | Valor total recalcula dinamicamente no modal | Gestor autenticado; ao menos 2 pacotes com preços distintos disponíveis no dropdown | 1. Clicar em "Adicionar assinatura ⊕". 2. Selecionar o Pacote A. Anotar o Valor Total. 3. Alterar a quantidade para 2. Verificar o Valor Total. 4. Selecionar o Pacote B (preço diferente). Verificar o Valor Total. | Ao mudar para quantidade 2, o Valor Total é o dobro do valor com quantidade 1. Ao mudar para o Pacote B, o Valor Total é recalculado com base no preço unitário do Pacote B × quantidade. O recálculo ocorre dinamicamente sem ação adicional. — borda: valida cálculo dinâmico do comportamento esperado item 7. | 🟡 Média | UI | CT-ASSIN-001 |
| CT-ASSIN-014 | Endpoint de desativação retorna 401 sem autenticação | Acesso à documentação da API ou DevTools para obter o ID de uma assinatura recorrente | 1. Identificar o endpoint `POST /api/v1/subscriptions/{id}/deactivate` e um ID de assinatura recorrente válido (via DevTools em sessão autenticada ou documentação). 2. Disparar `POST /api/v1/subscriptions/{id}/deactivate` sem header `Authorization`. 3. Verificar a resposta. | HTTP 401 Unauthorized. O endpoint não executa a desativação. Nenhum log de desativação gerado. O status da assinatura permanece inalterado no backend. | 🔴 Alta | API | — |
| CT-ASSIN-015 | Log de auditoria gravado após desativação | Token JWT válido de Gestor; ID de assinatura com status `Recorrente`; DevTools disponível para inspecionar requests | 1. Abrir DevTools (aba Network). 2. Executar o fluxo completo de desativação (CT-ASSIN-007 aprovado). 3. Verificar no DevTools que a request `POST /api/v1/subscriptions/{id}/deactivate` foi disparada e retornou HTTP 200. 4. Verificar com a equipe de engenharia ou via ferramenta de auditoria interna que o registro foi gravado com os campos: `userId`, `subscriptionId`, `action: "deactivate_recurrence"`, `timestamp`. | A request de desativação retorna HTTP 200. O registro de log contém os campos exigidos pelo card: `userId` do Gestor autenticado, `subscriptionId` da assinatura desativada, `action: "deactivate_recurrence"` e o `timestamp` da operação. | 🟡 Média | API | CT-ASSIN-007 |
| CT-ASSIN-016 | Tela de Assinaturas inacessível para role não-Gestor | Usuário autenticado com role `agent` (Atendente) na Nova Interface | 1. Logar na Nova Interface com um usuário de role `agent`. 2. Verificar se o item "Lista de Assinaturas" está visível no menu lateral. 3. Se não aparecer, tentar acessar diretamente a URL da tela de Assinaturas. 4. Verificar a resposta da interface. | O item "Lista de Assinaturas" não está visível no menu lateral para o role `agent`. Se o URL for acessado diretamente, a interface não exibe o conteúdo da tela (redireciona para tela de acesso negado ou exibe mensagem de permissão insuficiente). O backend não retorna dados da conta para esse role. | 🔴 Alta | UI | — |

**Resumo:** 16 cenários — 🔴 6 Alta | 🟡 9 Média | 🟢 1 Baixa

---

## BLOCO 4 — Cenários Gherkin (BDD)

Os dois cenários 🔴 Alta mais diretamente relacionados à nova funcionalidade:

```gherkin
Cenário: Desativar recorrência — fluxo completo com sucesso
  Dado que o Gestor está autenticado na Nova Interface
  E que existe ao menos uma assinatura com status "Recorrente" na conta
  Quando o Gestor abre o modal de Detalhes da assinatura Recorrente
  E clica no botão "Desativar recorrência"
  E o modal de confirmação é exibido antes de qualquer ação
  E o Gestor confirma a desativação
  Então um toast de sucesso é exibido
  E o badge da assinatura na tabela é atualizado para "Recorrência desativada"
  E ao reabrir o modal da mesma assinatura, o botão "Desativar recorrência" não aparece mais
```

```gherkin
Cenário: Falha na API de desativação não altera o status na interface
  Dado que o Gestor está autenticado na Nova Interface
  E que existe ao menos uma assinatura com status "Recorrente"
  E que o endpoint de desativação está configurado para retornar erro
  Quando o Gestor abre o modal da assinatura Recorrente
  E clica em "Desativar recorrência"
  E confirma a ação no modal de confirmação
  Então um toast de erro é exibido
  E o status da assinatura na tabela permanece "Recorrente"
  E nenhuma mensagem de erro não tratada é exibida na interface
```

---

## Validação por Agente Crítico Independente

- Aprovados sem alteração: 7 (CT-ASSIN-001, CT-ASSIN-004, CT-ASSIN-008, CT-ASSIN-009, CT-ASSIN-011, CT-ASSIN-013, CT-ASSIN-014)
- Revisados: 7 (CT-ASSIN-002, CT-ASSIN-003, CT-ASSIN-005, CT-ASSIN-006, CT-ASSIN-007, CT-ASSIN-010, CT-ASSIN-012)
- Adicionados por cobertura insuficiente: 2 (CT-ASSIN-015, CT-ASSIN-016)
