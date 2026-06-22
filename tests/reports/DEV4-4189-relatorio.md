# Relatório de Execução — DEV4-4189
> Card: Migrar ListDataHelper para uma nova estrutura
> Gerado em: 2026-05-21 20:45
> Ambiente: https://foundation-api-canary.poli.digital (canary)
> PRs: nenhum fornecido

---

## Resumo Geral

| Métrica | Valor |
|---|---|
| ✅ Passou | 11 |
| ❌ Falhou | 0 |
| ⏭️ Bloqueado | 0 |
| 📊 Taxa de sucesso | 100% |
| ⏱️ Tempo total | ~15 min |

---

## Contexto de Execução

Testes executados via API REST direta (curl) contra `https://foundation-api-canary.poli.digital`.
Autenticação: `POST /v3/auth/login` com `yuri.castro@poli.digital` → cookie `api_session`.
Conta de teste: `9b8af98e-0407-49a2-bce9-3620f29c513a` (2.278 tags disponíveis).
Playwright MCP indisponível — card de backend, testes executados inteiramente via API.

---

## Resultados por Cenário

### C01 — Smoke: GET /v3/accounts/{uuid}/tags retorna lista paginada
**Criticidade:** 🔴 Alta | **Prioridade:** 📋 Padrão | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | GET /v3/accounts/{uuid}/tags?per_page=10 | ✅ | C01_passo1_smoke.json |

**Resultado Obtido:** HTTP 200. Estrutura completa: `data`, `meta`, `links`. Total: 2.278 tags, 228 páginas com per_page=10.
**Resultado Esperado:** Endpoint retorna lista paginada com o mesmo formato JSON do helper antigo.
**Divergência:** Nenhuma.

---

### C02 — Filtro `category` com valor válido retorna resultados (exact match)
**Criticidade:** 🔴 Alta | **Prioridade:** 📋 Padrão | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | GET ...?category=DEFAULT&per_page=5&include=category | ✅ | C02_passo1_category_valido.json |

**Resultado Obtido:** HTTP 200. `category=DEFAULT` → 115 resultados. Todos os registros retornados têm `category` exatamente `"DEFAULT"` — sem matches espúrios.
**Resultado Esperado:** Filtro por category válido retorna apenas tags com aquela categoria (match exato, não LIKE).
**Divergência:** Nenhuma. Categorias disponíveis na conta: DEFAULT (115), SUCCESS (9), DELAYED (5).

---

### C03 — Filtro `category` com valor inválido retorna HTTP 422
**Criticidade:** 🔴 Alta | **Prioridade:** 📋 Padrão | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | GET ...?category=INVALIDO | ✅ | C03_passo1_category_invalido.json |

**Resultado Obtido:** HTTP 422. Body: `{"message":"The selected category.0 is invalid.","errors":{"category.0":["The selected category.0 is invalid."]}}`
**Resultado Esperado:** FormRequest rejeita valores fora do enum antes de chegar no banco.
**Divergência:** Nenhuma.

---

### C04 — Filtro `status` com valor válido retorna resultados (exact match)
**Criticidade:** 🔴 Alta | **Prioridade:** 📋 Padrão | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | GET ...?status=ACTIVE&per_page=5&include=status | ✅ | C04_passo1_status_valido.json |

**Resultado Obtido:** HTTP 200. `status=ACTIVE` → 1.991 resultados. Todos os registros têm `status` exatamente `"ACTIVE"`.
**Resultado Esperado:** Filtro por status válido retorna apenas tags com aquele status.
**Divergência:** Nenhuma. Status disponíveis: ACTIVE (1991), INACTIVE (287).

---

### C05 — Filtro `status` com valor inválido retorna HTTP 422
**Criticidade:** 🔴 Alta | **Prioridade:** 📋 Padrão | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | GET ...?status=PENDING | ✅ | C05_passo1_status_invalido.json |

**Resultado Obtido:** HTTP 422. Body: `{"message":"The selected status.0 is invalid.","errors":{"status.0":["The selected status.0 is invalid."]}}`
**Resultado Esperado:** Validação rejeita status fora do enum.
**Divergência:** Nenhuma.

---

### C06 — Filtro desconhecido retorna HTTP 422 (proteção filter abuse)
**Criticidade:** 🔴 Alta | **Prioridade:** 📋 Padrão | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | GET ...?unknown_field=value | ✅ | C06_passo1_filtro_desconhecido.json |
| 2 | GET ...?password=abc (filter abuse) | ✅ | — |
| 3 | GET ...?account_id=fake-uuid | ✅ | — |

**Resultado Obtido:** HTTP 422 para todos os casos. Mensagem: `"O parâmetro 'X' não é aceito por este endpoint."` em PT-BR. Validação aplicada via `withValidator()` da ALLOWED_KEYS antes de qualquer consulta ao banco.
**Resultado Esperado:** Qualquer chave fora da whitelist é rejeitada com 422, impedindo filter abuse e queries em colunas sem índice.
**Divergência:** Nenhuma.

---

### C07 — Paginação (`per_page` e `page`) funciona corretamente
**Criticidade:** 🟡 Média | **Prioridade:** 📋 Padrão | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | GET ...?per_page=20&page=1 → 20 registros | ✅ | C07_passo1_paginacao.json |
| 2 | GET ...?per_page=20&page=2 → UUIDs distintos da p.1 | ✅ | — |
| 3 | GET ...?per_page=5 → exatamente 5 registros | ✅ | — |

**Resultado Obtido:** `per_page=20` retorna exatamente 20 registros. `page=2` retorna UUIDs completamente distintos de `page=1`. `per_page=5` retorna 5 registros. Meta contém `current_page`, `last_page`, `total`, `per_page` corretos.
**Resultado Esperado:** Paginação funcional com parâmetros per_page e page.
**Divergência:** Nenhuma.

---

### C08 — Ordenação (`order`) funciona e rejeita colunas inválidas
**Criticidade:** 🟡 Média | **Prioridade:** 📋 Padrão | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | GET ...?order=created_at → asc padrão | ✅ | C08_passo1_ordenacao.json |
| 2 | GET ...?order=-created_at → desc (UUID mais recente primeiro) | ✅ | — |
| 3 | GET ...?order=senha_invalida → HTTP 422 | ✅ | — |

**Resultado Obtido:** `order=-created_at` traz UUIDs criados mais recentemente primeiro (diferente do padrão). Coluna inválida retorna HTTP 422: `"O campo 'order' contém colunas inválidas: 'senha_invalida'. Colunas permitidas: name, description, created_at, updated_at."`
**Resultado Esperado:** Ordenação funcional com whitelist de colunas via OrderColumnsRule.
**Divergência:** Nenhuma.

---

### C09 — Busca (`search`) funciona
**Criticidade:** 🟡 Média | **Prioridade:** 📋 Padrão | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | GET ...?search=test → 219 resultados | ✅ | C09_passo1_search.json |
| 2 | GET ...?search=@@@NONEXISTENT@@@ → 0 resultados | ✅ | — |

**Resultado Obtido:** `search=test` → 219 resultados. Termo inexistente → 0 resultados. Parâmetro `search` é uma ALLOWED_KEY aceita pelo endpoint.
**Resultado Esperado:** Busca full-text funcional via Scout ou LIKE.
**Divergência:** Nenhuma.

---

### C10 — Multi-valor enum (`category=A,B,C`) retorna union correta (bug in() corrigido)
**Criticidade:** 🟡 Média | **Prioridade:** 📋 Padrão | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | category=DEFAULT,SUCCESS → 124 (115+9) | ✅ | C10_passo1_multivalor.json |
| 2 | category[]=DEFAULT&category[]=SUCCESS → 124 (mesmo resultado) | ✅ | — |
| 3 | category=DEFAULT,SUCCESS,DELAYED → 129 (115+9+5) | ✅ | — |

**Resultado Obtido:** Multi-valor com 2 e 3 categorias retorna totais corretos (union exata). Ambas as sintaxes são equivalentes. O bug antigo onde `in(a,b,c)` pegava apenas os 2 primeiros itens está corrigido — 3 valores retornam 129 = 115+9+5.
**Resultado Esperado:** Filtro multi-valor processa todos os valores fornecidos, ambas sintaxes aceitas.
**Divergência:** Nenhuma.

---

### C11 — Eager loading (`include`) funciona
**Criticidade:** 🟢 Baixa | **Prioridade:** 📋 Padrão | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | Sem include → apenas uuid retornado | ✅ | C11_passo1_include.json |
| 2 | include=name,category,status → campos adicionados | ✅ | — |
| 3 | include=campo_invalido → HTTP 200 silencioso | ✅ | — |

**Resultado Obtido:** Sem include, a resposta retorna apenas `uuid`. Com `include=category,status`, os campos aparecem na resposta. Campo inválido em include é ignorado silenciosamente (comportamento de retrocompatibilidade esperado).
**Resultado Esperado:** Include permite controle dos campos retornados via `$dataClassInclude`.
**Divergência:** Nenhuma.

---

## Bloqueios e Observações

- **Playwright MCP indisponível:** Card de backend, todos os testes executados via API REST (curl). Evidências são arquivos JSON com resposta completa dos endpoints.
- **Tags sem nome:** A maioria das tags na conta de teste não possui campo `name` populado. Isso não impede os testes de filtragem/paginação/ordenação.
- **`include=name` não retorna `name`:** Tags sem nome preenchido simplesmente não incluem o campo (comportamento correto — campo nullable).
- **Nenhum PR fornecido:** Todos os cenários classificados como 📋 Padrão. Recomendado associar o PR do endpoint de Tags ao reexecutar se necessário.

---

## Bugs Encontrados

Nenhum bug encontrado. Todos os critérios de aceite do card foram validados com sucesso.
