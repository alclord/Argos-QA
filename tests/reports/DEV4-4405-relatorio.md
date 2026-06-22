# Relatório de Execução — DEV4-4405
> Card: Fonte Rubik não aparece corretamente
> Iniciado em: 2026-06-17T18:43:00.000Z
> Gerado em: 2026-06-17T19:05:00.000Z
> Ambiente: https://spa-canary.poli.digital/chat
> PRs: SPA#1540
> Mocks ativos: nenhum

---

## Resumo Geral

| Métrica | Valor |
|---|---|
| ✅ Passou | 2 |
| ❌ Falhou | 2 |
| ⏭️ Bloqueado | 0 |
| 📊 Taxa de sucesso | 50% |
| ⏱️ Tempo total | ~22 min |
| 🔧 Self-healings | 0 |

---

## Resultados por Cenário

### CT-4405-001 — Fonte Rubik aplicada no `body` (computed)
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 Foco Primário | **Status:** ✅ PASSOU

| Passo | Descrição | Status |
|---|---|---|
| 1 | `getComputedStyle(body).fontFamily` | ✅ |

**Resultado Obtido:** `font-family: "Rubik, helvetica, sans-serif"`
**Resultado Esperado:** Rubik como fonte primária
**⚠️ Aviso:** Passou porque Rubik está instalada como fonte de sistema no Windows. Sem a fonte no SO, este cenário falharia — o carregamento web via Google Fonts está bloqueado.

---

### CT-4405-002 — `document.fonts.check('1em Rubik')` retorna true
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 Foco Primário | **Status:** ✅ PASSOU

| Passo | Descrição | Status |
|---|---|---|
| 1 | `document.fonts.check('1em Rubik')` | ✅ |

**Resultado Obtido:** `true`
**Resultado Esperado:** `true`
**⚠️ Aviso:** Retornou `true` pela mesma razão de CT-4405-001 — fonte do sistema, não web font. `rubikFontFaces = []` confirma que nenhum `@font-face` foi carregado da web.

---

### CT-4405-003 — `<link>` da Rubik presente no `<head>`
**Criticidade:** 🟡 Média | **Prioridade:** 🎯 Foco Primário | **Status:** ❌ FALHOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | Verificar `<link>` Google Fonts no `<head>` | ❌ | CT-4405-003_passo1_falhou.png |
| 2 | Verificar `@import` no CSS bundle | ❌ | — |
| 3 | Verificar network requests para fonts.googleapis.com | ❌ | — |

**Resultado Obtido:**
- Nenhum `<link rel="stylesheet">` para Google Fonts no `<head>` (apenas bundle CSS e favicon)
- CSS bundle `index-BDHrPwMv.css` contém `@import url("https://fonts.googleapis.com/css2?family=Rubik...")` (abordagem antiga)
- 6 requisições a `fonts.googleapis.com` falhando com `ERR_BLOCKED_BY_ORB`
- `--font-sans` = `"ui-sans-serif, system-ui, sans-serif..."` (default Tailwind — não tokenizado)
- `body { font-family: Rubik, helvetica, sans-serif }` declaração direta (não usa `var(--font-sans)`)

**Resultado Esperado (per PR#1540 test plan):**
- `<link rel="stylesheet">` da Rubik no `<head>` via `index.html`
- `<link id="brand-font">` ausente
- `--font-sans` tokenizado com `Rubik` no `:root`

**Divergência:** CSS bundle do canary é o código **pré-PR**. O `@import` não foi removido de `globals.css` e o `<link>` não foi adicionado ao `index.html`. A tokenização via `--font-sans` também não está em efeito.

**Causa Raiz:** `environment-specific` — build artifact do canary não reflete as mudanças do PR SPA#1540

---

### CT-4405-004 — Whitelabels usam Helvetica (RN3)
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 Foco Primário | **Status:** ❌ FALHOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | Simular `applyBrandFont` com Helvetica via `--font-sans` | ❌ | CT-4405-004_passo1_falhou.png |

**Resultado Obtido:** `tokenWorked: false` — definir `--font-sans: 'Helvetica'` não alterou `body.fontFamily`. O body usa declaração direta `font-family: Rubik, helvetica, sans-serif` (ignorando o CSS custom property).

**Resultado Esperado:** `applyBrandFont` define `--font-sans: 'Helvetica, ...'` e o body herda a fonte correta, exibindo Helvetica em contas whitelabel.

**Divergência:** Mesmo que o JS bundle tenha o novo `applyBrandFont`, o mecanismo é inefetivo porque o CSS do body não usa `var(--font-sans)`. O PR não foi completamente deployado (CSS bundle não atualizado).

**Causa Raiz:** `environment-specific` (cascata de CT-4405-003)

---

## Bugs Encontrados

| ID | CT de Origem | Descrição | Severidade | Causa Raiz | Evidência |
|---|---|---|---|---|---|
| BUG-001 | CT-4405-003 / CT-4405-004 | CSS bundle do canary não reflete PR SPA#1540: `@import` Google Fonts ainda presente e bloqueado por ORB (6 falhas), `<link>` ausente do `index.html`, `body` com declaração direta (ignora `--font-sans`). Rubik funciona apenas via fonte de sistema. Whitelabels não conseguem aplicar fonte própria. | 🔴 Crítico | environment-specific (build/deploy) | CT-4405-003_passo1_falhou.png |

---

## Performance

**Time to First Chat (preflight):**

| Interface | Tempo Medido | Limite | Status |
|---|---|---|---|
| Nova (`spa-canary.poli.digital`) | 3371ms | 3000ms | ⚠️ +12% 🟢 |
| Legada | N/A | 8000ms | N/A |

> Baseline calibrado em produção (2026-06-10): Nova p50=2094ms p95=2631ms

> Violações de API durante execução: nenhuma (cenários não interagiram com Foundation API)
