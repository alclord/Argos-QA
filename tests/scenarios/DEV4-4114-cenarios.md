# Cenários de Teste — DEV4-4114 — Lista Global de Mensagens Agendadas

> Card atualizado em: 2026-05-22
> Gerado em: 2026-05-25
> Ambiente-alvo: canary
> PRs: FoundationAPI:1111, SPA:1488
> Escopo real (Marina Santos, 2026-05-22): **Apenas listagem + cancelamento**. Filtros, agendamento e edição ficam para próximo card.
> URL de acesso: `/scheduleMessages` (não `/agendamentos` conforme card original)

---

## CT-01 — Acesso à página via URL /scheduleMessages
**Criticidade:** 🔴 Alta
**Prioridade PR:** 🎯 Foco Primário (SPA:1488 — router.tsx, ScheduledMessagesPage.tsx)

**Pré-requisitos:** Usuário autenticado como Gestor no canary

**Passos:**
1. Navegar para `https://spa-canary.poli.digital/scheduleMessages`
2. Aguardar carregamento da página

**Resultado esperado:**
- Página carrega sem erro 404 ou redirect
- Título ou heading "Mensagens Agendadas" visível
- Tabela ou estado vazio exibido
- Cards de resumo no topo visíveis

---

## CT-02 — Lista carrega respeitando visibilidade por perfil (Gestor)
**Criticidade:** 🔴 Alta
**Prioridade PR:** 🎯 Foco Primário (FoundationAPI:1111 — ListScheduledMessages, AccountScheduledMessagesService)

**Pré-requisitos:** Usuário autenticado como Gestor

**Passos:**
1. Acessar `/scheduleMessages`
2. Verificar que a tabela lista agendamentos de múltiplos operadores
3. Conferir colunas: Contato, Canal, Mensagem (prévia), Data/Hora, Responsável, Status, Ações

**Resultado esperado:**
- Gestor visualiza agendamentos de TODOS os operadores da conta
- Colunas exibidas corretamente
- Dados carregam sem erro

---

## CT-03 — Cards de resumo exibem totais corretos
**Criticidade:** 🟡 Média
**Prioridade PR:** 🎯 Foco Primário (FoundationAPI:1111 — GetScheduledMessagesSummary; SPA:1488 — SummaryCards.tsx)

**Pré-requisitos:** Usuário autenticado, ao menos um agendamento de cada status existente

**Passos:**
1. Acessar `/scheduleMessages`
2. Verificar 4 cards no topo: Total, Agendados, Enviados, Cancelados

**Resultado esperado:**
- Cada card exibe número correto correspondente ao status
- Total = Agendados + Enviados + Cancelados

---

## CT-04 — "Ver Mensagem" exibe conteúdo completo em modal
**Criticidade:** 🟡 Média
**Prioridade PR:** 🎯 Foco Primário (SPA:1488 — ViewMessageModal.tsx)

**Pré-requisitos:** Ao menos um agendamento com mensagem longa (>2 linhas) na lista

**Passos:**
1. Acessar `/scheduleMessages`
2. Localizar linha com mensagem truncada
3. Clicar nos três pontos (⋯) da linha
4. Clicar em "Ver mensagem"

**Resultado esperado:**
- Modal abre com conteúdo completo da mensagem
- Texto não está truncado
- Modal pode ser fechado (X ou clique fora)

---

## CT-05 — Cancelar agendamento exibe modal de confirmação e atualiza status
**Criticidade:** 🔴 Alta
**Prioridade PR:** 🎯 Foco Primário (FoundationAPI:1111 — BulkCancelScheduledMessages; SPA:1488 — CancelMessageModal.tsx, useCancelScheduledMessage.ts)

**Pré-requisitos:** Ao menos um agendamento com status "Agendado" na lista

**Passos:**
1. Acessar `/scheduleMessages`
2. Localizar uma linha com status "Agendado"
3. Clicar nos três pontos (⋯) da linha
4. Clicar em "Cancelar envio"
5. Verificar que modal de confirmação aparece
6. Confirmar o cancelamento no modal

**Resultado esperado:**
- Modal de confirmação aparece antes de executar
- Após confirmação: status da linha muda para "Cancelado" sem reload da página
- Toast verde: "Agendamento cancelado com sucesso!" exibido

---

## CT-06 — Status "Enviado" não exibe opção de cancelar
**Criticidade:** 🔴 Alta
**Prioridade PR:** 🎯 Foco Primário (SPA:1488 — ScheduledMessagesTableColumns.tsx, StatusBadge.tsx)

**Pré-requisitos:** Ao menos um agendamento com status "Enviado" na lista

**Passos:**
1. Acessar `/scheduleMessages`
2. Localizar linha com status "Enviado"
3. Clicar nos três pontos (⋯) da linha
4. Verificar opções disponíveis

**Resultado esperado:**
- Opção "Cancelar envio" NÃO aparece para status "Enviado"
- Apenas "Ver mensagem" disponível (ou menu de ações vazio/só visualização)

---

## CT-07 — Seleção múltipla ativa barra de cancelamento em lote
**Criticidade:** 🟡 Média
**Prioridade PR:** 🎯 Foco Primário (FoundationAPI:1111 — BulkCancelScheduledMessages; SPA:1488 — useBulkCancelScheduledMessages.ts)

**Pré-requisitos:** Ao menos 2 agendamentos com status "Agendado" visíveis

**Passos:**
1. Acessar `/scheduleMessages`
2. Selecionar checkbox de 2+ linhas com status "Agendado"
3. Verificar que barra de ação em lote aparece
4. Clicar em "Cancelar selecionados"
5. Confirmar no modal

**Resultado esperado:**
- Barra de ação em lote aparece após seleção múltipla
- Botão "Cancelar selecionados" disponível na barra
- Após confirmação: todos os selecionados mudam para "Cancelado"
- Toast de sucesso exibido

---

## CT-08 — Estado vazio quando não há agendamentos
**Criticidade:** 🟢 Baixa
**Prioridade PR:** 🎯 Foco Primário (SPA:1488 — ScheduledMessagesPage.tsx)

**Pré-requisitos:** Conta/perfil sem agendamentos criados (ou usar filtro que resulte em zero itens)

**Passos:**
1. Acessar `/scheduleMessages` com conta sem agendamentos

**Resultado esperado:**
- Ilustração de estado vazio exibida
- Texto: "Nenhum agendamento encontrado"
- Orientação sobre como criar agendamentos visível

---

## CT-09 — Paginação funciona (15 itens por página)
**Criticidade:** 🟢 Baixa
**Prioridade PR:** 🎯 Foco Primário (FoundationAPI:1111 — ListScheduledMessages; SPA:1488 — useScheduledMessagesTableQuery.ts)

**Pré-requisitos:** Mais de 15 agendamentos na conta

**Passos:**
1. Acessar `/scheduleMessages`
2. Verificar que primeira página exibe no máximo 15 itens
3. Navegar para próxima página

**Resultado esperado:**
- Primeira página exibe até 15 itens
- Controles de paginação visíveis
- Navegação entre páginas funciona sem erro

---

## CT-10 — Erro de carregamento exibe toast vermelho
**Criticidade:** 🟢 Baixa
**Prioridade PR:** 🔁 Regressão (comportamento de erro definido no card)

**Pré-requisitos:** Cenário de simulação de erro de rede (a ser tentado se possível)

**Passos:**
1. Simular erro na API (throttle de rede ou endpoint indisponível)
2. Acessar `/scheduleMessages`

**Resultado esperado:**
- Toast vermelho: "Não foi possível carregar os agendamentos. Tente novamente."
- Página não trava em estado de loading infinito

> Nota: Este cenário pode ser marcado como BLOQUEADO se não for possível simular erro de rede no ambiente canary.
