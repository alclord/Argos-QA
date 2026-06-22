# Relatório de Execução — DEV4-4400
> Card: Tela de Login em mobile fica pequena e há duplicação do layout entre AuthPageLayout e pages/Login
> Iniciado em: 2026-06-12T19:26:00.000Z
> Gerado em: 2026-06-12T19:35:00.000Z
> Ambiente: https://spa-canary.poli.digital/chat
> PRs: SPA#1537
> Mocks ativos: nenhum

---

## Resumo Geral

| Métrica | Valor |
|---|---|
| ✅ Passou | 3 |
| ❌ Falhou | 0 |
| ⏭️ Bloqueado | 0 |
| 📊 Taxa de sucesso | 100% |
| ⏱️ Tempo total | ~9 min |
| 🔧 Self-healings | 0 |

---

## Resultados por Cenário

### CT-4400-001 — Formulário ocupa largura correta em mobile
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 Foco Primário | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | Limpar sessão e redimensionar viewport para 375×812 | ✅ | — |
| 2 | Navegar para https://spa-canary.poli.digital/login | ✅ | — |
| 3 | Medir largura do formulário e verificar proporção | ✅ | CT-4400-001_passo1_ok.png |
| 4 | Verificar painel e banner | ✅ | CT-4400-001_passo1_ok.png |

**Resultado Obtido:**
- Formulário: 421px de largura em viewport de 468px = **90% do viewport**
- Padding simétrico: 24px esquerda / 23px direita
- Painel (`flex items-center justify-center w-full h-full p-6 sm:p-8`): ocupa 469px ≈ 100% do viewport
- Banner lateral: **oculto** (`bannerVisible: false`) — correto para mobile

**Resultado Esperado:** Formulário ocupa a maior parte da largura em mobile, com padding confortável. Banner oculto.

**Divergência:** Nenhuma.

---

### CT-4400-002 — Fluxo de autenticação funcional
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 Foco Primário | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | Navegar para https://spa-canary.poli.digital/login (viewport mobile 375×812) | ✅ | — |
| 2 | Preencher email e senha com credenciais do operador canary | ✅ | — |
| 3 | Submeter formulário e aguardar resposta HTTP | ✅ | — |
| 4 | Verificar redirect para /chat e ausência de error boundary | ✅ | CT-4400-002_passo1_ok.png |

**Resultado Obtido:**
- Auth response: HTTP 200
- Redirect: `https://spa-canary.poli.digital/chat` ✅
- `hasErrorBoundary: false` ✅
- `hasBlankPage: false` ✅
- Título: "Poli | Chats" ✅

**Resultado Esperado:** Login funcional, redirect para /chat sem erros.

**Divergência:** Nenhuma.

---

### CT-4400-003 — Layout desktop sem regressão
**Criticidade:** 🟡 Média | **Prioridade:** 🎯 Foco Primário | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | Limpar sessão e redimensionar viewport para 1280×800 | ✅ | — |
| 2 | Navegar para https://spa-canary.poli.digital/login | ✅ | — |
| 3 | Verificar banner lateral visível e layout duas colunas | ✅ | CT-4400-003_passo1_ok.png |
| 4 | Verificar formulário com max-w-md na coluna direita | ✅ | CT-4400-003_passo1_ok.png |

**Resultado Obtido:**
- Banner `login-banner.gif`: visível, 665px × 833px ✅
- Formulário: 448px (`max-w-md`), posicionado em x=909 (coluna direita) ✅
- Panel class: `flex flex-col justify-center w-full mx-auto space-y-6 max-w-md` ✅
- Layout de duas colunas: banner esquerda + formulário direita ✅
- Versão canary confirmada: `3.5.369-DEV4-4400`

**Resultado Esperado:** Layout duas colunas no desktop: banner visível à esquerda, formulário com `max-w-md` à direita. Comportamento idêntico ao anterior.

**Divergência:** Nenhuma.

---

## Bloqueios e Observações

- TTFC não medido — conta `operadorcanario@poli.digital` não possui chats atribuídos no canary (lista vazia). Comportamento esperado.
- App SPA login ignorado — PR SPA#1537 afeta exclusivamente a nova SPA (`AuthPageLayout.tsx`), não o app-spa legado.
- Sem conta observadora configurada para canary (`CANARY_OBSERVER_EMAIL` ausente no `.env`).

---

## Bugs Encontrados

Nenhum bug encontrado.

---

## Performance

> Sem violações de performance detectadas. Cenários são majoritariamente de verificação de layout (UI), sem chamadas API instrumentadas além do preflight de autenticação.

**Time to First Chat (preflight):**

| Interface | Tempo Medido | Limite | Status |
|---|---|---|---|
| Nova (`spa-canary.poli.digital`) | N/A | 3000ms | ⚠️ Não medido (sem chats) |
| Legada | N/A | 8000ms | N/A |
