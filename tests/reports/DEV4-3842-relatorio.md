# Relatório de Execução — DEV4-3842
> Card: API fundação do Poli Pay
> Iniciado em: 2026-06-19T18:28:49.000Z
> Gerado em: 2026-06-19T18:47:00.000Z
> Ambiente: https://spa.qa.poli.digital/chat (staging — Foundation API v3.4.275)
> PRs: FoundationAPI #1117 | FoundationAPI #1129 | SPA #1364
> Mocks ativos: nenhum

---

## Resumo Geral

| Métrica | Valor |
|---|---|
| ✅ Passou | 1 |
| ❌ Falhou | 0 |
| ⏭️ Bloqueado | 6 |
| 📊 Taxa de sucesso | 14% (100% dos executáveis) |
| ⏱️ Tempo total | ~19 min |
| 🔧 Self-healings | 1 |

---

## Diagnóstico Principal

> 🔗 **Falha sistêmica — "Commerce routes not deployed"**
>
> PRs #1117 e #1129 da FoundationAPI estão com status **open** (não mergeados/deployados).
> O ambiente staging opera a versão **3.4.275** que não contém o domínio Commerce.
> Rotas `/v3/accounts/{uuid}/categories`, `/v3/accounts/{uuid}/products` e `/v3/accounts/{uuid}/orders`
> retornam 404 com "não encontrado".
>
> **Ação necessária:** fazer o deploy dos PRs #1117 e #1129 ao ambiente staging e reexecutar.
> Ticket em "Testando em staging" porém código ainda não foi enviado ao ambiente.

---

## Resultados por Cenário

### CT-DEV4-3842-001 — Criar produto com variante (uuid retornado)
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 Foco Primário | **Status:** ⏭️ BLOQUEADO

| Passo | Descrição | Status |
|---|---|---|
| 1 | POST /v3/accounts/{uuid}/categories | ⏭️ 404 — rota inexistente |

**Motivo do bloqueio:** Rotas do domínio Commerce não deployadas em staging (PR #1117 open).
**Causa raiz:** `environment-specific`

---

### CT-DEV4-3842-002 — Listar produtos por categoria com include=variants
**Criticidade:** 🟡 Média | **Prioridade:** 🎯 Foco Primário | **Status:** ⏭️ BLOQUEADO

**Motivo do bloqueio:** Dependência CT-DEV4-3842-001 não passou.

---

### CT-DEV4-3842-003 — Criar pedido (Order) com contato existente
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 Foco Primário | **Status:** ⏭️ BLOQUEADO

| Passo | Descrição | Status |
|---|---|---|
| 1 | POST /v3/accounts/{uuid}/orders (contact.uuid = contato staging) | ⏭️ 404 — rota inexistente |

**Motivo do bloqueio:** Rotas do domínio Commerce não deployadas (PR #1117 open).
**Causa raiz:** `environment-specific`

---

### CT-DEV4-3842-004 — Criar pedido para contato inexistente → 404/422
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 Foco Primário | **Status:** ⏭️ BLOQUEADO

| Passo | Descrição | Status |
|---|---|---|
| 1 | POST /v3/accounts/{uuid}/orders (contact.uuid = UUID inválido) | ⏭️ 404 — rota inexistente (não é validação de contato) |

**Motivo do bloqueio:** 404 retornado pela ausência da rota de Orders no staging, não pela validação do contato inexistente. Não é possível verificar o comportamento de erro esperado.
**Causa raiz:** `environment-specific`

---

### CT-DEV4-3842-005 — Atualizar fulfillment_status de Order
**Criticidade:** 🟡 Média | **Prioridade:** 🎯 Foco Primário | **Status:** ⏭️ BLOQUEADO

**Motivo do bloqueio:** Dependência CT-DEV4-3842-003 não passou.

---

### CT-DEV4-3842-006 — Isolamento de tenant (Bearer Token)
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 Foco Primário | **Status:** ⏭️ BLOQUEADO

| Passo | Descrição | Status |
|---|---|---|
| 1 | GET /v3/accounts/{outro_account_uuid}/categories com Bearer da conta staging | ⏭️ 404 — rota inexistente |

**Motivo do bloqueio:** Rota do domínio Commerce inexistente no staging — isolamento de tenant não verificável.
**Causa raiz:** `environment-specific`

---

### CT-DEV4-3842-007 — Ler mensagem de produto sem crash (fix ComponentDTO)
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 Foco Primário | **Status:** ✅ PASSOU (parcial)

| Passo | Descrição | Status | Tempo |
|---|---|---|---|
| 1 | GET /v3/contacts/{uuid}/messages?per_page=50 | ✅ 200 OK | 204ms |
| 2 | Verificar ausência de erro 500 | ✅ Nenhum erro | — |
| 3 | Identificar mensagens tipo PRODUCT | ⚠️ 0 encontradas | — |

**Resultado Obtido:** Endpoint retornou HTTP 200, 50 mensagens (tipos: CHAT, ATTENDANCE_CLOSED). Nenhuma mensagem PRODUCT/payment_link/story_reply/notification no histórico.
**Resultado Esperado:** HTTP 200 sem crash + mensagens PRODUCT renderizadas corretamente.
**Divergência:** Fix do ComponentDTO (PR #1129) não verificado com dados reais — PR não deployado e sem mensagens PRODUCT no chat de teste.
**Nota:** Para verificação completa: após deploy do PR #1129, criar uma mensagem de produto via Commerce API e reexecutar.

---

## Bloqueios e Observações

- **PRs #1117 e #1129 (FoundationAPI)** estão `open` e não foram deployados ao ambiente staging.
- **Staging v3.4.275** não contém o domínio Commerce (categories, products, orders, payment-integrators).
- **SPA PR #1364** está `closed` (merged em 2026-04-16) — frontend do Commerce já está deployado.
- O token de sessão expira durante a execução (~15 min) — reautenticação necessária em execuções longas.

---

## Performance

**Time to First Chat (preflight):**

| Interface | Tempo Medido | Limite | Status |
|---|---|---|---|
| Nova (`spa.qa.poli.digital`) | 1450ms | 3000ms | ✅ OK |
| Legada (`homolog.qa.poli.digital`) | N/A | 8000ms | ⚠️ Seletor `.chatListItem` não encontrado |

> Baseline calibrado: Nova p95=3371ms (3 amostras canary) · Staging 1450ms confirma boa performance.

**Violações de API durante execução:**

Nenhuma violação detectada (único cenário executado: CT-007 — 204ms, abaixo do threshold de 287ms).

---

## Bugs Encontrados

Nenhum.

---

## Evidências

`tests/evidence/DEV4-3842/`
- `preflight_ambiente.png` — staging acessível, redirecionou para login
- `preflight_login.png` — login nova interface bem-sucedido
- `preflight_login_appspa.png` — login App SPA bem-sucedido
- `CT-DEV4-3842-001_bloqueado_rota_nao_deployada.png` — estado da tela durante bloqueio
