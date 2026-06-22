# Relatório de Execução — DEV4-4403
> Card: Migrar tela de Relatório (Metabase) do polichat-spa para o foundation-spa (/reports)
> Iniciado em: 2026-06-19T20:14:00.000Z
> Gerado em: 2026-06-19T20:22:00.000Z
> Ambiente: https://spa-canary.poli.digital/chat
> PRs: foundationAPI:#1133, SPA:#1538
> Mocks ativos: nenhum (force-error via page.route() em CT-DEV4-4403-004)

---

## Resumo Geral

| Métrica | Valor |
|---|---|
| ✅ Passou | 5 |
| ❌ Falhou | 0 |
| ⏭️ Bloqueado | 0 |
| 📊 Taxa de sucesso | 100% |
| ⏱️ Tempo total | ~480s |
| 🔧 Self-healings | 0 |

---

## Resultados por Cenário

### CT-DEV4-4403-002 — API: GET /v3/accounts/.../reports/metabase-embed-url retorna URL com JWT
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 Foco Primário | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | GET /v3/accounts/9b8af98e.../reports/metabase-embed-url com Bearer token | ✅ | rede #36 |
| 2 | Verificar HTTP 200 e campo `data.url` com JWT HS256 | ✅ | — |
| 3 | Decodificar payload JWT: dashboard=9, exp=+600s, exporting=true | ✅ | — |

**Resultado Obtido:** HTTP 200, `data.url` = URL Metabase com JWT válido. Payload: `resource.dashboard=9`, `exp`=+10min, `customer_id=1` (int), `exporting/csv/pdf=true`.
**Resultado Esperado:** HTTP 200 com URL de embed contendo JWT HS256 com exp de 10min e dashboard #9.
**Divergência:** Nenhuma. Obs: `user_ids` e `department_ids` ambos `null` — usuário `supervisorteste@poli.digital` aparenta ter papel adm/manager (visão completa). Validar com dev o papel real para confirmar mapeamento de filtro.
**Console/Rede:** 200 em 389ms / 199ms (threshold 479ms)
**Self-healings:** nenhum

---

### CT-DEV4-4403-001 — Sidebar: item "Relatório" navega para /reports (nativo, não legado)
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 Foco Primário | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | Verificar href do link "Relatório" na sidebar | ✅ | — |
| 2 | Clicar em "Relatório" a partir de /chat | ✅ | CT-DEV4-4403-001_passo1_ok.png |
| 3 | Verificar URL final = /reports e title = "Poli \| Relatório" | ✅ | — |

**Resultado Obtido:** Link com `href=/reports` (nativo), `text=Relatório`. Clique navegou para `https://spa-canary.poli.digital/reports`. Versão `3.5.359-DEV4-4403` confirmada.
**Resultado Esperado:** Item "Relatório" com `/reports` nativo (não redirect legado `app-spa.poli.digital/redirect?...`).
**Divergência:** Nenhuma.
**Console/Rede:** sem erros relevantes
**Self-healings:** nenhum

---

### CT-DEV4-4403-003 — Página /reports carrega iframe via URL gerada pelo backend
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 Foco Primário | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | Navegar para /reports e verificar requisição de rede ao endpoint de embed | ✅ | rede #76 |
| 2 | Verificar iframe presente com src = URL do Metabase | ✅ | CT-DEV4-4403-003_passo1_ok.png |
| 3 | Verificar conteúdo do iframe carregado (footer "Desenvolvido por Metabase") | ✅ | — |

**Resultado Obtido:** `GET /v3/accounts/{uuid}/reports/metabase-embed-url` → 200 em 199ms. Iframe com `src` apontando para `metabase.prod.cloud.polichat.com.br/embed/dashboard/{jwt}`. Footer do Metabase visível no snapshot do iframe.
**Resultado Esperado:** Página carrega iframe com URL gerada pelo backend (não JWT gerado no frontend).
**Divergência:** Nenhuma.
**Console/Rede:** 200 em 199ms
**Self-healings:** nenhum

---

### CT-DEV4-4403-004 — Tratamento de erro: API de embed indisponível exibe estado amigável
**Criticidade:** 🟡 Média | **Prioridade:** 🎯 Foco Primário | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | Aplicar page.route() forçando HTTP 500 no endpoint de embed | ✅ | — |
| 2 | Navegar para /reports e aguardar estado de erro | ✅ | CT-DEV4-4403-004_passo1_ok.png |
| 3 | Verificar mensagem amigável e botão "Tentar novamente" | ✅ | — |

**Resultado Obtido:** Sem iframe. Mensagem: "Ops, algo deu errado — Não foi possível carregar o relatório. Tente novamente." com botão "Tentar novamente". Sem crash.
**Resultado Esperado:** Estado de erro amigável sem crash da interface.
**Divergência:** Nenhuma.
**Console/Rede:** 500 simulado via page.route() (force-error)
**Self-healings:** nenhum

---

### CT-DEV4-4403-005 — Regressão: PoliFlow (/poli-flow) ainda carrega corretamente
**Criticidade:** 🟡 Média | **Prioridade:** 🔁 Regressão | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | Navegar para /poli-flow | ✅ | CT-DEV4-4403-005_passo1_ok.png |
| 2 | Verificar título, breadcrumb e iframe carregados | ✅ | — |

**Resultado Obtido:** Título "Poli | Flow", breadcrumb com `Page.Scaffold`, iframe ativo. `poli-flow-page.tsx` refatorado sem regressão.
**Resultado Esperado:** PoliFlow carrega normalmente após refatoração para `Page.Scaffold`.
**Divergência:** Nenhuma.
**Console/Rede:** sem erros relevantes
**Self-healings:** nenhum

---

## Bloqueios e Observações

- ⚠️ App SPA login falhou (credenciais canary não autenticam em `app-spa.qa.poli.digital`). Nenhum cenário impactado — TTFC legado não medido.
- 📝 `user_ids` e `department_ids` ambos `null` para `supervisorteste@poli.digital`. Confirmar papel real do usuário para validar mapeamento de filtro de papel.

---

## Bugs Encontrados

Nenhum.

---

## Performance

**Time to First Chat (preflight):**

| Interface | Tempo Medido | Limite | Status |
|---|---|---|---|
| Nova (`spa-canary.poli.digital`) | 2490ms | 3000ms | ✅ |
| Legada (`app-spa.qa.poli.digital`) | N/A (login falhou) | 8000ms | N/A |

> Baseline calibrado em produção (2026-06-10): Nova p50=2094ms p95=2631ms

**Violações de API durante execução:** nenhuma.

| Endpoint | Amostras | Timing |
|---|---|---|
| GET /v3/accounts/:uuid/reports/metabase-embed-url | 2 | 389ms, 199ms (threshold 479ms) ✅ |
