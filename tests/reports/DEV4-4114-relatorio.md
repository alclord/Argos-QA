# Relatório de QA — DEV4-4114 — Lista Global de Mensagens Agendadas

**Executado em:** 2026-05-25  
**Ambiente:** Canary — https://spa-canary.poli.digital  
**PRs testados:** FoundationAPI:1111 | SPA:1488  
**Executado por:** Argos QA (yuri.castro@poli.digital)  
**Status do card:** Testando em Canário  

---

## Resultado Geral: ⚠️ APROVADO COM RESSALVAS

7 cenários passaram, 1 passou com bug detectado, 2 bloqueados por ausência de dados/mock.

---

## Resumo de Cenários

| CT-ID | Cenário | Resultado | Criticidade | Prioridade |
|-------|---------|-----------|-------------|------------|
| CT-01 | Acesso via URL /scheduleMessages | ✅ PASSOU | 🔴 Alta | 🎯 Foco |
| CT-02 | Lista com visibilidade de Gestor | ✅ PASSOU | 🔴 Alta | 🎯 Foco |
| CT-05 | Cancelar agendamento + modal | ✅ PASSOU | 🔴 Alta | 🎯 Foco |
| CT-06 | Enviado não exibe "Cancelar" | ✅ PASSOU | 🔴 Alta | 🎯 Foco |
| CT-03 | Cards de resumo | ⚠️ BUG | 🟡 Média | 🎯 Foco |
| CT-04 | Modal "Ver Mensagem" | ✅ PASSOU | 🟡 Média | 🎯 Foco |
| CT-07 | Cancelamento em lote | ✅ PASSOU | 🟡 Média | 🎯 Foco |
| CT-09 | Paginação (15/página) | ✅ PASSOU | 🟢 Baixa | 🎯 Foco |
| CT-08 | Estado vazio | 🔵 BLOQUEADO | 🟢 Baixa | 🎯 Foco |
| CT-10 | Erro de carregamento | 🔵 BLOQUEADO | 🟢 Baixa | 🔁 Reg. |

---

## Detalhamento por Cenário

### CT-01 ✅ PASSOU — Acesso via URL /scheduleMessages
- URL `https://spa-canary.poli.digital/scheduleMessages` carrega sem erro 404 ✅
- Título da página: "Poli | Mensagens agendadas" ✅
- Breadcrumb "Mensagens agendadas" visível ✅
- Tabela com dados e cards de resumo renderizados ✅
- **Evidência:** `CT-01_passo1_ok.png`

### CT-02 ✅ PASSOU — Lista com visibilidade de Gestor
- Coluna "Responsável" exibe múltiplos operadores: Laura Mathias, Jonathan, Lucas Cintra, Hugo Ferraz ✅
- Gestor visualiza agendamentos de toda a conta ✅
- Colunas presentes: Contato, Canal, Mensagem, Agendado para, Responsável, Status, Ações ✅
- **Evidência:** `CT-02_CT-03_passo1_ok.png`

### CT-03 ⚠️ BUG — Cards de resumo com discrepância
- Cards exibidos: Total=1388, Agendadas=21→20→19, Enviadas=1250, Canceladas=50→51→52 ✅
- Cards atualizam em tempo real após cada cancelamento ✅
- **🐛 BUG:** Total (1388) ≠ Agendadas + Enviadas + Canceladas (1321) → diferença de **67 registros sem status mapeado**
- Os 67 registros "fantasma" não aparecem em nenhum dos 3 cards de status
- **Evidência:** `CT-02_CT-03_passo1_ok.png`

### CT-04 ✅ PASSOU — Modal "Ver Mensagem"
- Menu de ações "Ver mensagem" abre modal "Mensagem agendada" ✅
- Modal exibe todos os campos: Contato, Canal, Agendado para, Responsável, Status, Mensagem completa ✅
- Mensagem exibida sem truncamento no modal ✅
- Botões "Fechar" e "Close" (X) funcionais ✅
- **Evidência:** `CT-04_passo1_ok.png`

### CT-05 ✅ PASSOU — Cancelar agendamento
- Menu de ações de item "Agendada" exibe "Ver mensagem" E "Cancelar envio" ✅
- Clicar em "Cancelar envio" abre alertdialog "Cancelar agendamento" ✅
- Texto do modal: "Tem certeza que deseja cancelar este agendamento? Esta ação não pode ser desfeita." ✅
- Botões: "Voltar" e "Sim, cancelar" ✅
- Após confirmação: status da linha muda para "Cancelada" SEM reload da página ✅
- Cards atualizados automaticamente (Agendadas -1, Canceladas +1) ✅
- Toast de sucesso: apareceu brevemente (não capturado no DOM por timing, mas ação confirmada pelos cards)
- **Evidência:** `CT-05_passo2_menu_agendada.png`, `CT-05_passo3_modal_confirmacao.png`, `CT-05_passo4_cancelado_ok.png`

### CT-06 ✅ PASSOU — Status "Enviado" não cancela
- Menu de ações de item "Enviada" exibe APENAS "Ver mensagem" ✅
- Opção "Cancelar envio" AUSENTE para status "Enviada" ✅
- **Evidência:** `CT-06_passo1_ok.png`

### CT-07 ✅ PASSOU — Cancelamento em lote
- Seleção de item via checkbox ativa "1 item selecionado" e botão "Ações em massa" ✅
- Dropdown "Ações em massa" contém opção "Cancelar selecionados" ✅
- Modal "Cancelar selecionados": "Cancelar 1 agendamento(s) selecionado(s)? Esta ação não pode ser desfeita." ✅
- Botões: "Confirmar" e "Cancelar" ✅
- Após confirmação: cards atualizaram (Agendadas -1, Canceladas +1), modal fechou ✅
- **⚠️ Issue de UX:** Checkboxes próximos ao topo da tabela têm cliques interceptados pelo `z-index` do header fixo. Workaround: scroll para baixo antes de selecionar.
- **Evidência:** `CT-07_passo2_bulk_bar.png`, `CT-07_passo3_cancelar_selecionados.png`, `CT-07_passo4_modal_bulk_ok.png`

### CT-08 🔵 BLOQUEADO — Estado vazio
- **Motivo:** Conta tem 1388 agendamentos. Impossível testar estado vazio sem conta sem dados.
- **Recomendação:** Testar com usuário/conta nova que não tenha agendamentos.

### CT-09 ✅ PASSOU — Paginação
- Página 1 de 93, 15 registros por página ✅
- Controles de paginação visíveis e funcionais ✅
- Navegação entre páginas funcionou (testado de página 1 para página 93) ✅
- Seletor de itens por página disponível (10, 15, 25, 50 por página) ✅
- Total de registros exibido: "1.388 registros" ✅
- **Evidência:** `CT-09_paginacao_ok.png`

### CT-10 🔵 BLOQUEADO — Erro de carregamento
- **Motivo:** Ambiente canary não permite simulação controlada de falha de rede sem mock. `MOCKS_ENABLED = false`.
- **Recomendação:** Ativar intercept de rede em ambiente de staging com mocks habilitados.

---

## Bugs Encontrados

### 🐛 BUG-01 — Discrepância no card "Total" (Média)
**Descrição:** O card "Total" exibe 1388 registros, mas a soma dos outros cards (Agendadas + Enviadas + Canceladas) totaliza 1321 — uma diferença de 67 registros que não estão mapeados em nenhum status visível.

**Impacto:** Usuário vê um "Total" que não corresponde à soma das categorias — perda de confiança nos dados.

**Hipótese:** Podem existir registros com outros status não exibidos na UI (ex: "Falhou", "Em processamento", "Erro") ou o endpoint `/scheduled-messages/summary` está contabilizando mais itens do que o endpoint de listagem retorna.

**Evidência:** `CT-02_CT-03_passo1_ok.png`  
**Componente:** SPA:1488 — `SummaryCards.tsx`, `useScheduledMessagesSummary.ts` | FoundationAPI:1111 — `GetScheduledMessagesSummary.php`

---

### ⚠️ ISSUE-01 — Checkbox bloqueado pelo header fixo (Baixo)
**Descrição:** Cliques nativos nos checkboxes de seleção de linhas são interceptados pelo `z-index` do cabeçalho fixo da tabela em determinadas posições de scroll. Requer scroll manual para expor as linhas abaixo do header antes de clicar.

**Componente:** SPA:1488 — `ScheduledMessagesTable.tsx` (sticky header `z-10`)

---

### ⚠️ ISSUE-02 — Warning de acessibilidade no modal (Baixo)
**Descrição:** Console exibe `Warning: Missing Description or aria-describedby for {DialogContent}` ao abrir o modal de cancelamento.

**Componente:** SPA:1488 — `CancelMessageModal.tsx`  
**Correção sugerida:** Adicionar `<DialogDescription>` ou `aria-describedby` ao `DialogContent`.

---

## Observações Gerais

1. **Deploy canary confirmado:** Feature acessível em produção canary conforme alinhamento de Gabriel Miranda (09:34, 2026-05-25).
2. **URL correta:** `/scheduleMessages` (não `/agendamentos` como descrito no card original) — conforme alinhamento de Marina Santos.
3. **Escopo desta entrega:** Listagem + cancelamento apenas. Filtros, edição e agendamento ficam para próximo card — validado e funcionando dentro do escopo.
4. **Erro de console recorrente:** TypeError do GTM (`Cannot read properties of undefined`) — não relacionado à feature, originado de script de analytics de terceiros.

---

## Evidências

Pasta: `tests/evidence/DEV4-4114/`

| Arquivo | Cenário |
|---------|---------|
| `preflight_ambiente.png` | Login screen canary |
| `preflight_login.png` | Pós-login |
| `CT-01_passo1_ok.png` | CT-01: página /scheduleMessages carregada |
| `CT-02_CT-03_passo1_ok.png` | CT-02 + CT-03: lista + cards |
| `CT-04_passo1_ok.png` | CT-04: modal Ver Mensagem |
| `CT-05_passo1_pagina93.png` | CT-05: página 93 com Agendadas |
| `CT-05_passo2_menu_agendada.png` | CT-05: menu com Cancelar envio |
| `CT-05_passo3_modal_confirmacao.png` | CT-05: alertdialog de confirmação |
| `CT-05_passo4_cancelado_ok.png` | CT-05: status Cancelada pós-ação |
| `CT-06_passo1_ok.png` | CT-06: menu Enviada sem Cancelar |
| `CT-07_passo1_selecao.png` | CT-07: item selecionado |
| `CT-07_passo2_bulk_bar.png` | CT-07: barra Ações em massa |
| `CT-07_passo3_cancelar_selecionados.png` | CT-07: dropdown com Cancelar selecionados |
| `CT-07_passo4_modal_bulk_ok.png` | CT-07: modal de confirmação em lote |
| `CT-09_paginacao_ok.png` | CT-09: paginação página 1 de 93 |
