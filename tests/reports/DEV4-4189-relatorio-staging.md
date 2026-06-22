# Relatório de Execução — DEV4-4189 (Staging)
> Card: Migrar ListDataHelper para uma nova estrutura
> Gerado em: 2026-05-20 18:30
> Ambiente: https://spa.qa.poli.digital/chat (foundation-api.qa.poli.digital)
> PR: não fornecido

---

## Resumo Geral

| Métrica | Valor |
|---|---|
| ✅ Passou | 2 |
| ❌ Falhou | 4 |
| ⏭️ Bloqueado | 0 |
| 📊 Taxa de sucesso | 33% |

---

## Resultados por Cenário

### CT-DEV4-4189-001 — Listagem básica de Tags
**Criticidade:** 🔴 Alta | **Prioridade:** 📋 Padrão | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | GET /v3/accounts/{uuid}/tags?per_page=10&page=1 | ✅ | CT-DEV4-4189-001_passo1_ok.png |

**Resultado Obtido:** HTTP 200, total=1099 tags, paginação correta (110 páginas, 10/página), meta consistente.
**Resultado Esperado:** Endpoint retorna lista paginada com HTTP 200.
**Divergência:** Nenhuma.

---

### CT-DEV4-4189-002 — Filtro por categoria (correção do bug LIKE→exact)
**Criticidade:** 🔴 Alta | **Prioridade:** 📋 Padrão | **Status:** ❌ FALHOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | GET ...?category=DEFAULT → verificar exact match | ✅ | — |
| 2 | GET ...?category=INVALID_ENUM → esperado 422 | ❌ | CT-DEV4-4189-002_passo2_falhou.png |

**Resultado Obtido:** `category=DEFAULT` retorna 135 resultados com match exato. `category=INVALID_ENUM` retorna **HTTP 500** com erro interno do enum.
**Resultado Esperado:** `category=INVALID_ENUM` deve retornar HTTP 422 com mensagem de validação.
**Divergência:** Enum inválido não é interceptado pelo FormRequest — chega ao model e lança exceção não tratada.
**Console/Rede:** `"D is not a valid backing value for enum Domains\Contacts\Data\Enums\Tag\TagCategory"` — HTTP 500.

> ⚠️ Diagnóstico adicional: O SQL exposto nas mensagens de erro revela que o **helper antigo (ListDataHelper) ainda está ativo em staging**. Query usa `LIKE 'abc%'` em vez de comparação exata, e filtros desconhecidos chegam ao banco de dados.

---

### CT-DEV4-4189-003 — Filtro por status
**Criticidade:** 🟡 Média | **Prioridade:** 📋 Padrão | **Status:** ❌ FALHOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | GET ...?status=ACTIVE → exact match | ✅ | — |
| 2 | GET ...?status=BOGUS_STATUS → esperado 422 | ❌ | — |

**Resultado Obtido:** `status=ACTIVE` retorna 1099 resultados, todos com status ACTIVE. `status=BOGUS_STATUS` retorna **HTTP 500**.
**Resultado Esperado:** Enum inválido deve retornar HTTP 422.
**Divergência:** Mesmo bug do CT-002 — enum inválido não validado pelo FormRequest.

---

### CT-DEV4-4189-004 — Paginação
**Criticidade:** 🟡 Média | **Prioridade:** 📋 Padrão | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | Página 1 e página 2 sem sobreposição | ✅ | — |
| 2 | per_page=25 respeitado | ✅ | — |
| 3 | meta.total consistente entre requests | ✅ | — |

**Resultado Obtido:** Paginação funciona corretamente. Páginas distintas, per_page respeitado, totais consistentes.

---

### CT-DEV4-4189-005 — Busca por nome de Tag
**Criticidade:** 🟡 Média | **Prioridade:** 📋 Padrão | **Status:** ❌ FALHOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | GET ...?search=teste → total deve ser menor que sem filtro | ❌ | — |
| 2 | GET ...?search=xyzabc123naoexiste → total deve ser 0 | ❌ | — |

**Resultado Obtido:** Qualquer valor de `search` retorna total=1099 (mesmo que o termo seja inexistente).
**Resultado Esperado:** `search` deve filtrar por nome parcial.
**Divergência:** Parâmetro `search` ignorado silenciosamente. Campo `name` retorna `null` em todos os objetos — pode ser dado de teste sem nome preenchido ou campo não serializado no Resource.

---

### CT-DEV4-4189-006 — Filtros desconhecidos rejeitados
**Criticidade:** 🟡 Média | **Prioridade:** 📋 Padrão | **Status:** ❌ FALHOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | GET ...?unknown_field=abc → esperado 422 | ❌ | CT-DEV4-4189-006_passo1_falhou.png |
| 2 | GET ...?password=secret → esperado 422 | ❌ | CT-DEV4-4189-006_passo1_falhou.png |
| 3 | GET ...?id=1 → esperado 422 | ❌ | — |
| 4 | GET ...?order=unknown_column → esperado 422 | ❌ | — |

**Resultado Obtido:** Todos os filtros desconhecidos chegam ao SQL e causam HTTP 500. Exceção: `?id=1` retorna HTTP 200 com 10 resultados (filter abuse ativo).
**Resultado Esperado:** HTTP 422 para qualquer filtro não permitido.
**Divergência:** Helper antigo ainda ativo — não há whitelist de filtros. SQL usa `LIKE` em vez de comparação exata. Mensagens de erro **expõem hostname completo do banco RDS** (`aurora-polichat-staging-cluster.cluster-ro-cdpuewtlkfjp.us-east-2.rds.amazonaws.com`).

---

## Bloqueios e Observações

- O ambiente staging ainda usa o `ListDataHelper` antigo — a nova infraestrutura de listagem não está deployada neste ambiente.
- Testes foram executados via fetch autenticado no browser (mesma sessão da SPA), pois o endpoint de Tags não possui UI dedicada na foundation-spa.
- O campo `name` da tag existe na tabela (`name` visível no SQL exposto), mas não é retornado pela API.

---

## Bugs Encontrados

| ID | CT de Origem | Descrição | Severidade | Evidência |
|---|---|---|---|---|
| BUG-001 | CT-006 | Helper antigo ativo: filtros desconhecidos chegam ao SQL (filter abuse + LIKE bug) | 🔴 Crítico | CT-DEV4-4189-006_passo1_falhou.png |
| BUG-002 | CT-006 | Mensagens de erro 500 expõem hostname completo do banco RDS | 🔴 Crítico | CT-DEV4-4189-006_passo1_falhou.png |
| BUG-003 | CT-002/003 | Enum inválido em category/status retorna HTTP 500 em vez de 422 | 🟡 Moderado | CT-DEV4-4189-002_passo2_falhou.png |
| BUG-004 | CT-005 | Parâmetro search ignorado; campo name não serializado no Resource | 🟡 Moderado | — |
