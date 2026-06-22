# Relatório de Execução — DEV4-4189 (Reteste Canary)
> Card: Migrar ListDataHelper para uma nova estrutura
> Gerado em: 2026-05-20 20:30
> Ambiente: https://spa-canary.poli.digital/chat (foundation-api-canary.poli.digital)
> Execução: Reteste após correções do dev (build 17:12)
> PR: não fornecido

---

## Resumo Geral

| Métrica | Valor |
|---|---|
| ✅ Passou | 8 |
| ❌ Falhou | 5 |
| ⚠️ Inconsistente | 1 |
| ⏭️ Bloqueado | 1 |
| 📊 Taxa de sucesso | 57% (8/14 executáveis) |

**Comparativo com execução anterior (18:15):** 7 → 8 passou (+1). CT-TAGS-004 corrigido.

---

## Resultados por Cenário

### CT-TAGS-001 — Listagem básica de Tags
**Criticidade:** 🔴 Alta | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | `GET /v3/accounts/{uuid}/tags?per_page=10&page=1` | ✅ | via API |

**Resultado Obtido:** HTTP 200, total=2275 (+1 desde execução anterior), paginação correta.

---

### CT-TAGS-002 — Filtrar por category válido
**Criticidade:** 🔴 Alta | **Status:** ✅ PASSOU

**Resultado Obtido:** `category=SUCCESS` com `include=category` → HTTP 200, 9 resultados, todos com `category=SUCCESS`. Filtro exato funcionando.
**Observação:** Campos `category`/`status` requerem `include=campo` para serem serializados na resposta.

---

### CT-TAGS-003 — Filtrar por status válido
**Criticidade:** 🔴 Alta | **Status:** ✅ PASSOU

**Resultado Obtido:** `status=ACTIVE` com `include=status` → HTTP 200, 1988 resultados, todos com `status=ACTIVE`.

---

### CT-TAGS-004 — Busca por nome com search
**Criticidade:** 🟡 Média | **Status:** ✅ PASSOU *(era ❌ FALHOU na execução anterior)*

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | `GET .../tags?search=zzznaoexistexyz999` → total deve ser 0 | ✅ | via API |
| 2 | `GET .../tags?search=combo` → total deve ser menor que baseline | ✅ | via API |
| 3 | `GET .../tags?search=a` → total deve ser menor que 2275 | ✅ | via API |

**Resultado Obtido:**
- `search=zzznaoexistexyz999` → total=**0** ✅ (antes retornava 2274 — inoperante)
- `search=combo` → total=**4** ✅
- `search=a` → total=**1967** vs baseline 2275 ✅

**BUG-C003 parcialmente corrigido:** parâmetro `search=` agora filtra corretamente.

**Divergência residual:** Campo `name` ainda não é serializado na resposta mesmo com `include=name`. Itens retornam apenas `uuid` por padrão — `name` não aparece nos dados da API mesmo após include.

---

### CT-TAGS-005 — Paginação e ordenação
**Criticidade:** 🟡 Média | **Status:** ✅ PASSOU

**Resultado Obtido:** `per_page=10&page=2&order=-created_at` → HTTP 200, página 2 sem sobreposição com página 1. Ordenação válida funcionando.

---

### CT-TAGS-006 — Enum category inválido → 422
**Criticidade:** 🔴 Alta | **Status:** ✅ PASSOU

**Resultado Obtido:** `category=INVALIDO` → HTTP 422 `{"errors":{"category":["The selected category is invalid."]}}`.

---

### CT-TAGS-007 — Enum status inválido → 422
**Criticidade:** 🔴 Alta | **Status:** ✅ PASSOU

**Resultado Obtido:** `status=XPTO` → HTTP 422 `{"errors":{"status":["The selected status is invalid."]}}`.

---

### CT-TAGS-008 — Filtro desconhecido rejeitado com 422
**Criticidade:** 🔴 Alta | **Status:** ❌ FALHOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | `GET .../tags?coluna_inexistente=valor` → esperado 422 | ❌ | via API |
| 2 | `GET .../tags?password=secret` → esperado 422 | ❌ | via API |
| 3 | `GET .../tags?id=1` → esperado 422 | ❌ | via API |

**Resultado Obtido:** Todos retornaram HTTP 200 com total=2275 — filtros desconhecidos silenciosamente ignorados.
**Resultado Esperado:** HTTP 422 — FormRequest deve rejeitar parâmetros não permitidos.
**Divergência — BUG-C002 🔴 Alta:** FormRequest não rejeita filtros com chaves desconhecidas. AC explicitamente violado. **NÃO CORRIGIDO.**

---

### CT-TAGS-009 — Filter abuse com coluna sensível → 422
**Criticidade:** 🔴 Alta | **Status:** ❌ FALHOU

**Resultado Obtido:** `?account_uuid=outro-uuid` e `?password=secret` → HTTP 200, total=2275 em ambos.
**Divergência — BUG-C002 🔴 Alta:** Mesma raiz que CT-TAGS-008. **NÃO CORRIGIDO.**

---

### CT-TAGS-010 — Bug LIKE corrigido — comparação exata
**Criticidade:** 🔴 Alta | **Status:** ⏭️ BLOQUEADO

**Motivo:** Sem dados de teste com valores de `category` que compartilhem prefixo no ambiente canary. Validação indireta via CT-TAGS-002 (comparação exata funcionando).

---

### CT-TAGS-011 — Filtro in() retorna múltiplos valores
**Criticidade:** 🟡 Média | **Status:** ❌ FALHOU

**Resultado Obtido:**
- `category[]=DEFAULT&category[]=SUCCESS` → HTTP 422
- `category=DEFAULT,SUCCESS` → HTTP 422

**Divergência — BUG-C004 🟡 Moderado:** Filtro `in()` multi-valor não suportado em nenhuma sintaxe. **NÃO CORRIGIDO.**

---

### CT-TAGS-012 — per_page no limite máximo e mínimo
**Criticidade:** 🟢 Baixa | **Status:** ⚠️ INCONSISTENTE

**Resultado Obtido:**
- `per_page=100` → HTTP 200, 100 itens ✅
- `per_page=0` → HTTP 422 "O campo per page deve ter pelo menos 1." ✅
- `per_page=99999` → HTTP 200, 200 itens (cap silencioso) ❌

**Divergência — BUG-C005 🟢 Menor:** `per_page=99999` aceito sem validação de limite máximo. **NÃO CORRIGIDO.**

---

### CT-TAGS-013 — Endpoints vizinhos sem regressão
**Criticidade:** 🟡 Média | **Status:** ✅ PASSOU

**Resultado Obtido:** `/contacts` HTTP 200 (299.829 contatos), `/chats` HTTP 200. Sem regressão.

---

### EX-API-001 — Ordenação por campo inválido → 422
**Tipo:** Exploratório | **Status:** ❌ FALHOU

**Resultado Obtido:** `order=campo_invalido_xyz` → HTTP 500 `{"message":"Server Error"}`.
**Resultado Esperado:** HTTP 422 com mensagem de validação.
**Divergência — BUG-C001 🔴 Crítico:** Campo `order` sem validação — valor inválido quebra o servidor. **NÃO CORRIGIDO.**

---

### EX-UI-003 — Dialog "Adicionar etiqueta" filtra por nome
**Tipo:** Exploratório UI | **Status:** ❌ FALHOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | Abrir dialog "Adicionar etiqueta" | ✅ | EX-UI-003_passo2_dialog_aberto.png |
| 2 | Digitar "venda" no campo Pesquisar | ✅ | — |
| 3 | Verificar se lista filtra tags com "venda" no nome | ❌ | EX-UI-003_passo3_busca_nao_filtra.png |

**Resultado Obtido:**
- Requisição gerada pela UI: `GET .../tags?per_page=100&page=1&name=venda&include=attributes,metadata&status=ACTIVE` → HTTP 200
- Lista exibiu **todas as tags sem filtrar** — tags como "Em negociação", "Cliente Atendido", "Turismo" visíveis junto com as "Venda realizada"

**Causa raiz identificada:** A SPA usa o parâmetro `name=SEARCH_TERM` ao buscar etiquetas. O dev corrigiu `search=` mas a UI usa `name=` — são parâmetros distintos. `name=` ainda é ignorado pelo backend.

**Impacto para o usuário:** Em contas com 1988+ etiquetas ativas, o usuário não consegue localizar etiqueta por nome no dialog — precisa rolar toda a lista. **BUG-C003 NÃO CORRIGIDO para o fluxo de UI.**

**Ação necessária:** Dev deve escolher uma de duas opções:
1. Adicionar `name` como parâmetro filtro no `ListTagsRequest` / `ListQueryService`
2. Atualizar a SPA para usar `search=` em vez de `name=` na chamada da API de etiquetas

---

## Bugs Encontrados

| ID | CT de Origem | Descrição | Severidade | Status |
|---|---|---|---|---|
| BUG-C001 | EX-API-001 | `order=campo_invalido` → HTTP 500 (deveria ser 422) | 🔴 Crítico | ❌ Persiste |
| BUG-C002 | CT-TAGS-008, 009 | Filtros desconhecidos/sensíveis aceitos com 200 silencioso (deveria ser 422) | 🔴 Alta | ❌ Persiste |
| BUG-C003 | EX-UI-003 | `name=` (parâmetro da UI) ignorado — `search=` foi corrigido mas UI usa `name=` | 🔴 Alta | ⚠️ Parcial |
| BUG-C004 | CT-TAGS-011 | Filtro `in()` multi-valor não suportado (`category[]=` e `category=A,B` → 422) | 🟡 Moderado | ❌ Persiste |
| BUG-C005 | CT-TAGS-012 | `per_page=99999` aceito com cap silencioso em 200 itens | 🟢 Menor | ❌ Persiste |

---

## O que foi corrigido nesta execução

| BUG | Descrição | Status |
|---|---|---|
| BUG-C003 (search=) | Parâmetro `search=` agora filtra corretamente — `search=combo` → 4, `search=zzzz` → 0 | ✅ Corrigido |

---

## Observações

- Build testado: v3.5.327 (deploy canary 17:12 de 20/05)
- `search=` foi corrigido e filtra corretamente. Contudo, a SPA usa `name=` — o dev precisa corrigir também o `name=` ou atualizar a SPA.
- BUG-C001 (order → 500) e BUG-C002 (unknown filters → 200) são os bugs de maior impacto ainda em aberto.
- CT-TAGS-002/003 requerem `include=category,status` para verificar match — comportamento esperado do Resource.

---

## Evidências

Salvas em: `tests/evidence/DEV4-4189/reteste/`

| Arquivo | Descrição |
|---|---|
| preflight_ambiente.png | Tela de login canary |
| preflight_login.png | Login bem-sucedido |
| EX-UI-003_passo1_chat_aberto.png | Chat do contato Yuri aberto |
| EX-UI-003_passo2_dialog_aberto.png | Dialog "Adicionar etiqueta" aberto |
| EX-UI-003_passo3_busca_nao_filtra.png | Busca "venda" — lista não filtrada (BUG-C003) |
