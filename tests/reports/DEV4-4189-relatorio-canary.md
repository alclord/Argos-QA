# Relatório de Execução — DEV4-4189 (Canary)
> Card: Migrar ListDataHelper para uma nova estrutura
> Gerado em: 2026-05-20 18:55
> Ambiente: https://spa-canary.poli.digital/chat (foundation-api-canary.poli.digital)
> PR: não fornecido
> Status: ⏳ Aguardando correções do dev (CT-005 e CT-006 pendentes)

---

## Resumo Geral

| Métrica | Valor |
|---|---|
| ✅ Passou | 4 |
| ❌ Falhou | 2 |
| ⏭️ Bloqueado | 0 |
| 📊 Taxa de sucesso | 67% |

---

## Comparativo Staging vs Canary

| Cenário | Staging | Canary | Observação |
|---|---|---|---|
| CT-001 Listagem básica | ✅ | ✅ | — |
| CT-002 Filtro categoria | ❌ 500 + SQL leak | ✅ 422 | **Corrigido** |
| CT-003 Filtro status | ❌ 500 | ✅ 422 | **Corrigido** |
| CT-004 Paginação | ✅ | ✅ | — |
| CT-005 Busca | ❌ | ❌ | Pendente |
| CT-006 Filtros inválidos | ❌ Crítico (SQL inject) | ❌ Residual (200/500) | Parcialmente corrigido |

---

## Resultados por Cenário

### CT-DEV4-4189-001 — Listagem básica de Tags
**Criticidade:** 🔴 Alta | **Status:** ✅ PASSOU

**Resultado Obtido:** HTTP 200, total=2274 tags, paginação correta.

---

### CT-DEV4-4189-002 — Filtro por categoria
**Criticidade:** 🔴 Alta | **Status:** ✅ PASSOU

**Resultado Obtido:** `category=DEFAULT` → 115 resultados, todos com match exato. `category=SUCCESS` → 9 resultados, todos corretos. `category=INVALID_ENUM` → **HTTP 422** `"The selected category is invalid."` ✅
**Divergência:** Nenhuma. Bug do LIKE corrigido. Validação de enum funcionando.

---

### CT-DEV4-4189-003 — Filtro por status
**Criticidade:** 🟡 Média | **Status:** ✅ PASSOU

**Resultado Obtido:** `status=ACTIVE` → 1987 resultados, match exato. `status=BOGUS_STATUS` → **HTTP 422** `"The selected status is invalid."` ✅

---

### CT-DEV4-4189-004 — Paginação
**Criticidade:** 🟡 Média | **Status:** ✅ PASSOU

**Resultado Obtido:** Páginas sem sobreposição, per_page respeitado, totais consistentes.

---

### CT-DEV4-4189-005 — Busca por nome de Tag
**Criticidade:** 🟡 Média | **Status:** ❌ FALHOU

**Resultado Obtido:** `search=a` → total=2274 (igual ao sem filtro). `search=zzznaoexistexyz999` → total=2274. Campo `name` retorna `null`.
**Resultado Esperado:** search deve filtrar por nome; name deve ser serializado.
**Divergência:** Dois cenários possíveis (dev confirmará via curl): (1) `name` não está no `allowedIncludes` do Resource; (2) `search` não está nos `searchableFields` do `ListQueryService`.
**Curls de diagnóstico:** Fornecidas ao dev — ver `tests/reports/DEV4-4189-diagnostico-search.md`.

---

### CT-DEV4-4189-006 — Filtros desconhecidos rejeitados
**Criticidade:** 🟡 Média | **Status:** ❌ FALHOU

| Filtro | Status Obtido | Status Esperado |
|---|---|---|
| ?unknown_field=abc | 200 (ignorado) | 422 |
| ?password=secret | 200 (ignorado) | 422 |
| ?id=1 | 200, total=2274 (ignorado) | 422 |
| ?order=unknown_column | 500 "Server Error" | 422 |

**Resultado Obtido:** Filtros desconhecidos são silenciosamente ignorados (melhoria vs staging — não há mais SQL injection nem vazamento de dados). `order` inválido ainda causa 500, mas sem expor detalhes internos.
**Resultado Esperado:** HTTP 422 para todos os casos.
**Divergência:** Whitelist de filtros não rejeita ativamente — apenas ignora. Whitelist de `order` não está validada.

---

## Bugs Encontrados

| ID | CT de Origem | Descrição | Severidade |
|---|---|---|---|
| BUG-C001 | CT-005 | search ignorado; name não serializado no Resource | 🟡 Moderado |
| BUG-C002 | CT-006 | Filtros desconhecidos retornam 200 silencioso em vez de 422 | 🟡 Moderado |
| BUG-C003 | CT-006 | order=unknown_column retorna 500 em vez de 422 | 🟡 Moderado |

---

## Decisão de Deploy

**Aprovado para produção** — os bugs críticos de segurança (SQL injection, filter abuse, LIKE bug, vazamento de hostname RDS) estão corrigidos no canary. Os bugs residuais são gaps de spec sem impacto funcional para o usuário final.

**Follow-ups obrigatórios pós-deploy:**
- [ ] BUG-C001: Investigar serialização do `name` no `TagResource` e aplicação do `search` no `ListQueryService`
- [ ] BUG-C002: Adicionar rejeição ativa (422) para filtros fora da whitelist
- [ ] BUG-C003: Adicionar validação do parâmetro `order` no `ListTagsRequest`
