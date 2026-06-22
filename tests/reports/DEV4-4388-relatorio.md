# Relatório de Execução — DEV4-4388
> Card: [Nova Interface] Adicionar autenticação via token na URL (/auth-token)
> Iniciado em: 2026-06-16T11:21:00.000Z
> Gerado em: 2026-06-16T12:00:00.000Z
> Ambiente: https://spa-canary.poli.digital/chat (canary)
> PRs: SPA#1534
> Versão canary: 3.5.359-DEV4-4388
> Mocks ativos: nenhum

---

## Resumo Geral

| Métrica | Valor |
|---|---|
| ✅ Passou | 5 |
| ❌ Falhou | 0 |
| ⏭️ Bloqueado | 3 |
| 📊 Taxa de sucesso | 100% dos executáveis (5/5) |
| 🔧 Self-healings | 0 |
| 🐛 Bugs encontrados | 0 |

---

## Resultados por Cenário

### CT-AUTH-001 — Autenticação com params válidos → /chat
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 Foco Primário | **Status:** ⏭️ BLOQUEADO

**Motivo do bloqueio:** Token JWT válido não disponível neste ambiente — pré-condição exige token fornecido pelo time de desenvolvimento para `POST /auth/loginWithToken`.

**Observações durante tentativa:**
- Rota `/auth-token` existe e renderiza ✅
- `data-testid="auth-token-loading"` (spinner) aparece e é visível durante chamada ao endpoint ✅ *(confirmado via page.route() com delay manual)*
- `POST https://heimdall.poli.digital/auth/loginWithToken` é chamado corretamente ✅
- Com token inválido → 401 → redirect para `/login` ✅

**O que falta validar:** redirect para `/chat` após autenticação bem-sucedida — requer token válido do time de dev.

**Evidências:** `CT-AUTH-001_loading_state.png`, `CT-AUTH-001_passo1_falhou.png`

---

### CT-AUTH-003 — Acesso sem `token` → redireciona para /login
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 Foco Primário | **Status:** ✅ PASSOU

| Passo | Descrição | Status |
|---|---|---|
| 1 | Navegar para `/auth-token?customer_id=123` (sem `token`) | ✅ |
| 2 | Verificar redirect para `/login` | ✅ |
| 3 | Confirmar ausência de chamada a `loginWithToken` | ✅ |

**Resultado Obtido:** Redirect imediato para `/login`. Nenhuma requisição a `loginWithToken` disparada — validação ocorre no frontend antes de qualquer API call.

---

### CT-AUTH-004 — Acesso sem `customer_id` → redireciona para /login
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 Foco Primário | **Status:** ✅ PASSOU

| Passo | Descrição | Status |
|---|---|---|
| 1 | Navegar para `/auth-token?token=abc123` (sem `customer_id`) | ✅ |
| 2 | Verificar redirect para `/login` | ✅ |
| 3 | Confirmar ausência de chamada a `loginWithToken` | ✅ |

**Resultado Obtido:** Redirect imediato para `/login`. Validação de parâmetro obrigatório no frontend funcionando corretamente.

---

### CT-AUTH-005 — Erro no endpoint → redireciona para /login
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 Foco Primário | **Status:** ⏭️ BLOQUEADO

**Motivo do bloqueio:** Depende de CT-AUTH-001 (não passou por falta de token válido).

**Observação:** O comportamento esperado deste cenário foi observado indiretamente durante a tentativa de CT-AUTH-001: `POST /auth/loginWithToken` retornou 401 → redirect para `/login` ✅. O error handling está implementado e funcional.

---

### CT-AUTH-008 — Token da URL não persiste no armazenamento do browser
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 Foco Primário | **Status:** ⏭️ BLOQUEADO

**Motivo do bloqueio:** Depende de CT-AUTH-001 (autenticação bem-sucedida necessária para inspecionar o localStorage após redirect para `/chat`).

---

### CT-AUTH-006 — customer_id não-numérico → redireciona para /login
**Criticidade:** 🟡 Média | **Prioridade:** 🎯 Foco Primário | **Status:** ✅ PASSOU

| Passo | Descrição | Status |
|---|---|---|
| 1 | Navegar para `/auth-token?token=abc123&customer_id=nao_numerico` | ✅ |
| 2 | Verificar redirect para `/login` | ✅ |
| 3 | Confirmar ausência de chamada a `loginWithToken` | ✅ |

**Resultado Obtido:** Validação de `customer_id` numérico ocorre no frontend — `loginWithToken` não é chamado desnecessariamente.

---

### CT-AUTH-007 — URL sem query params → redireciona para /login
**Criticidade:** 🟢 Baixa | **Prioridade:** 🎯 Foco Primário | **Status:** ✅ PASSOU

**Resultado Obtido:** Acesso direto a `/auth-token` (sem params) redireciona para `/login` imediatamente.

---

### CT-AUTH-002 — Regressão: fluxo /auth WL inalterado
**Criticidade:** 🔴 Alta | **Prioridade:** 🔁 Regressão | **Status:** ✅ PASSOU

| Passo | Descrição | Status |
|---|---|---|
| 1 | Navegar para `/auth` | ✅ |
| 2 | Verificar que rota ainda existe e renderiza | ✅ |
| 3 | Verificar 0 erros de console | ✅ |

**Resultado Obtido:** Rota `/auth` permanece acessível, exibe formulário de login normalmente, 0 erros de console. Nenhuma regressão introduzida pelo PR.

**Evidência:** `CT-AUTH-002_passo1_ok.png`

---

## Bugs Encontrados

Nenhum bug encontrado. BUG-001 (ausência de loading state) investigado e descartado — spinner `data-testid="auth-token-loading"` está implementado e visível durante a chamada ao endpoint, mas desaparece em ~300ms (tempo de resposta 401 do Heimdall).

---

## Performance

Sem violações de threshold registradas nesta execução.

---

## Cenários Bloqueados — Plano de Continuidade

| CT | Motivo | Como desbloquear |
|---|---|---|
| CT-AUTH-001 | Token JWT válido necessário | Solicitar ao time de dev um token válido para `POST /auth/loginWithToken` no canary |
| CT-AUTH-005 | Depende de CT-AUTH-001 | Idem — com token válido + token inválido para provocar erro 401/500 |
| CT-AUTH-008 | Depende de CT-AUTH-001 | Idem — executar após CT-AUTH-001 passar |

**Evidências:** `tests/evidence/DEV4-4388/`
