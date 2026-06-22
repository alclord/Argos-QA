# Relatório de Execução — DEV4-4243
> Card: Atualização de Ícones da Nova Versão
> Iniciado em: 2026-06-03T17:18:44.000Z
> Gerado em: 2026-06-03T17:36:00.000Z
> Ambiente: https://spa-canary.poli.digital/chat
> PRs: SPA:#1504
> Mocks ativos: nenhum

---

## Resumo Geral

| Métrica | Valor |
|---|---|
| ✅ Passou | 11 |
| ❌ Falhou | 3 |
| ⏭️ Bloqueado | 1 |
| 📊 Taxa de sucesso | 78.6% (11/14 executados) |
| ⏱️ Tempo total | ~17min |
| 🔧 Self-healings | 0 |

---

## Resultados por Cenário

### CT-ICON-001 — Ícone `list-filter` no botão de filtro da tela de chats
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 | **Status:** ✅ PASSOU

| Passo | Descrição | Status |
|---|---|---|
| 1 | Acessar tela de chats em canary | ✅ |
| 2 | Localizar botão de filtro (`data-testid="contacts-panel-header-filter-dropdown"`) | ✅ |
| 3 | Inspecionar SVG do ícone via DOM | ✅ |

**Resultado Obtido:** SVG com `class="poli-icon scale-115 origin-center size-5"` e 3 paths com padrão de barras horizontais decrescentes (y≈8.9 → y=16 → y≈23.1) — inequivocamente `list-filter`.
**Resultado Esperado:** Ícone `list-filter` do DS.
**Evidência:** CT-ICON-001_passo3_ok.png

---

### CT-ICON-002 — Ícone `funnel` mantido nas sidebars de flow
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 | **Status:** ✅ PASSOU

| Passo | Descrição | Status |
|---|---|---|
| 1 | Abrir chat do contato de teste | ✅ |
| 2 | Inspecionar ícones da sidebar direita | ✅ |

**Resultado Obtido:** Sidebar direita (`?panel=details`) contém `class="lucide lucide-filter"` (funnel Lucide) com polygon — mantido corretamente.
**Resultado Esperado:** `funnel` nas sidebars de flow.

---

### CT-ICON-003 — Ícone `arrow-down-up` no botão de ordenação padrão
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 | **Status:** ✅ PASSOU

| Passo | Descrição | Status |
|---|---|---|
| 1 | Localizar botão `data-testid="chat-sort-button"` | ✅ |
| 2 | Inspecionar SVG — poli-icon com 2 setas verticais | ✅ |

**Resultado Obtido:** 2 paths: seta descendo a x≈9 (top→bottom) + seta subindo a x≈21 (bottom→top) = `arrow-down-up`. Computed size: 20×20px via `size-5`.
**Resultado Esperado:** `arrow-down-up` no estado padrão.
**Evidência:** CT-ICON-003_passo3_ok.png

---

### CT-ICON-004 — Ícone `arrow-up-down` após toggle de ordenação
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 | **Status:** ❌ FALHOU

| Passo | Descrição | Status |
|---|---|---|
| 1 | Clicar no botão de ordenação | ✅ |
| 2 | Selecionar "Mais antigos primeiro" e confirmar | ✅ |
| 3 | Inspecionar ícone após fechar dialog | ❌ |

**Resultado Obtido:** SVG permanece com as mesmas 2 paths do `arrow-down-up`. Sem CSS transform (`transform: none`). Ícone não troca para `arrow-up-down`.
**Resultado Esperado:** Ícone muda para `arrow-up-down` (↑↓) após seleção de "Mais antigos primeiro".
**Divergência:** BUG-001 — lógica de troca de ícone não está conectada ao estado da ordenação. Os arquivos `ArrowDownUp.tsx` e `ArrowUpDown.tsx` foram criados no PR, mas o componente `OrdenationButton.tsx` não alterna entre eles.
**Causa Raiz:** unknown (implementação incompleta)
**Evidência:** CT-ICON-004_passo3_falhou.png

---

### CT-ICON-005 — Ícone `circle-ellipsis` na caixa de texto do chat
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 | **Status:** ✅ PASSOU

| Passo | Descrição | Status |
|---|---|---|
| 1 | Abrir chat do contato de teste | ✅ |
| 2 | Localizar área de composição | ⚠️ Janela 24h expirada |
| 3 | Verificar ícone circle-ellipsis na toolbar | ✅ |

**Resultado Obtido:** Botão "Mais opções" (`data-testid="dropdown-button"`) com poli-icon de 4 paths: outer ellipse + 3 pontos a x=9, x=16, x=23 y=16 = `circle-ellipsis`. ✅
**Nota:** Janela 24h do WhatsApp expirada no contato de teste — text box completa não disponível. Ícone confirmado na toolbar de ação adjacente.

---

### CT-ICON-006 — Ícone `circle-plus` mantido fora da caixa de texto
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 | **Status:** ✅ PASSOU

| Passo | Descrição | Status |
|---|---|---|
| 1 | Abrir painel de detalhes do contato | ✅ |
| 2 | Localizar botão "Adicionar etiqueta" | ✅ |
| 3 | Verificar ícone | ✅ |

**Resultado Obtido:** Botão "Adicionar etiqueta" usa `class="lucide lucide-circle-plus"` — Lucide original mantido corretamente fora da caixa de texto.
**Evidência:** CT-ICON-006_passo3_ok.png

---

### CT-ICON-007 — Ícones DS não aparecem em conta whitelabel
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 | **Status:** ⏭️ BLOQUEADO

**Motivo:** Sem credencial whitelabel configurada no `.env` canary. Adicionar `CANARY_WHITELABEL_EMAIL` / `CANARY_WHITELABEL_PASSWORD` e reexecutar.

---

### CT-ICON-008 — Ícones DS corretos na conta Poli
**Criticidade:** 🟡 Média | **Prioridade:** 🎯 | **Status:** ✅ PASSOU

**Resultado Obtido:** Todos os ícones mapeados no card (list-filter, arrow-down-up, circle-ellipsis, funnel nas sidebars) presentes com classe `poli-icon` — DS aplicado corretamente na conta Poli.

---

### CT-ICON-009 — `list-filter` não aplicado fora do botão de filtro
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 | **Status:** ✅ PASSOU

**Resultado Obtido:** `listFilterBtns: 1` — exatamente 1 botão com o padrão de 3 paths (list-filter). Os demais poli-icons são `arrow-down-up` (2 paths) e outros ícones. Sidebars mantêm `funnel`.

---

### CT-ICON-010 — Tags de tracking preservadas nos botões com ícones
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 | **Status:** ✅ PASSOU

**Resultado Obtido:** Atributos `data-testid` preservados em todos os botões críticos:
- `tab-filter-trigger`, `contacts-panel-header-contacts-button`, `contacts-panel-header-filter-dropdown`, `search-input-clear-button`, `chat-sort-button`, `contact-menu-chevron`, `dropdown-button`, `channel-selector-button-trigger`.

---

### CT-ICON-011 — Sem hardcode de cor nos novos ícones
**Criticidade:** 🟡 Média | **Prioridade:** 🎯 | **Status:** ✅ PASSOU

**Resultado Obtido:** `hardcodedColor: []` — todos os poli-icons usam `fill="currentColor"`. Zero cores fixas encontradas.

---

### CT-ICON-012 — Sem hardcode de tamanho nos novos ícones
**Criticidade:** 🟡 Média | **Prioridade:** 🎯 | **Status:** ❌ FALHOU

| Passo | Descrição | Status |
|---|---|---|
| 1 | Inspecionar CSS dos poli-icons via computed style | ✅ |
| 2 | Verificar se width/height são controlados por token | ❌ |

**Resultado Obtido:**
- `poli-icon scale-115 origin-center` (sem `size-*`): computed = `24×24px` via atributo `width="24"` do SVG — hardcoded.
- `poli-icon scale-115 origin-center w-4`: computed = `16×24px` — aspect ratio quebrado (width controlado por `w-4`, height ainda pelo atributo SVG `24`).
**Resultado Esperado:** Todos os ícones com tamanho via Design Token (`size-*`).
**Divergência:** BUG-002 — SVGs sem classe de tamanho CSS herdam `width="24"` do atributo SVG intrínseco. O `w-4` sem `h-4` correspondente cria proporção incorreta.
**Causa Raiz:** unknown

---

### CT-ICON-013 — `aria-label` em botões interativos com ícone
**Criticidade:** 🟡 Média | **Prioridade:** 🎯 | **Status:** ❌ FALHOU

| Passo | Descrição | Status |
|---|---|---|
| 1 | Inspecionar botões com SVG na tela de chats | ✅ |
| 2 | Verificar presença de aria-label ou title | ❌ |

**Resultado Obtido:** 3 botões interativos com ícone sem `aria-label` ou `title`:
- `data-testid="contacts-panel-header-contacts-button"` (ícone `lucide-contact`)
- `data-testid="contacts-panel-header-filter-dropdown"` (ícone `list-filter`)
- `data-testid="search-input-clear-button"` (ícone poli-icon)
**Resultado Esperado:** Todos os botões com ícone possuem `aria-label` ou `title` descritivo.
**Divergência:** BUG-003 — leitores de tela não conseguem descrever esses botões.
**Causa Raiz:** unknown

---

### CT-ICON-014 — Ícones decorativos com `aria-hidden`
**Criticidade:** 🟢 Baixa | **Prioridade:** 🎯 | **Status:** ✅ PASSOU

**Resultado Obtido:** Nenhum SVG fora de elemento interativo encontrado sem `aria-hidden`. Todos os ícones estão dentro de `button` ou `a`.

---

### CT-ICON-015 — Alinhamento visual em múltiplas resoluções
**Criticidade:** 🟡 Média | **Prioridade:** 🎯 | **Status:** ✅ PASSOU

| Resolução | Botão filtro | Botão ordenação | Overflow |
|---|---|---|---|
| 1366×768 | btn 40×40, svg 23×23 | btn 35×40, svg 23×23 | ✅ Nenhum |
| 375×812 (mobile) | btn 40×40, svg 23×23 | btn 36×40, svg 23×23 | ✅ Nenhum |

**Nota:** 23px = 20px (`size-5`) × `scale-115` — comportamento esperado.
**Evidências:** CT-ICON-015_1366x768.png, CT-ICON-015_375x812.png

---

## Bloqueios e Observações

- CT-ICON-007: sem credencial whitelabel no `.env` — requer `CANARY_WHITELABEL_EMAIL` / `CANARY_WHITELABEL_PASSWORD`
- CT-ICON-005: janela 24h do WhatsApp expirada no contato de teste — ícone confirmado na toolbar mas não diretamente dentro da text box

---

## Bugs Encontrados

| ID | CT de Origem | Descrição | Severidade | Causa Raiz | Evidência |
|---|---|---|---|---|---|
| BUG-001 | CT-ICON-004 | Ícone `arrow-up-down` não exibido após selecionar "Mais antigos primeiro" — permanece `arrow-down-up` | 🟡 Moderado | unknown | CT-ICON-004_passo3_falhou.png |
| BUG-002 | CT-ICON-012 | SVGs `poli-icon` sem `size-*` renderizam em 24×24px hardcoded; SVGs com `w-4` sem `h-4` resultam em aspect ratio 16×24 quebrado | 🟢 Menor | unknown | — |
| BUG-003 | CT-ICON-013 | 3 botões interativos sem `aria-label`: `contacts-panel-header-contacts-button`, `contacts-panel-header-filter-dropdown`, `search-input-clear-button` | 🟡 Moderado | unknown | — |

## Performance

> Sem violações — baseline não configurado. Execute com `--baseline` para calibrar thresholds.
