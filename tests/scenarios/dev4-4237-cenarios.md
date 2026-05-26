# Cenários de Teste — DEV4-4237
> Card: ListDataHelper — 7 endpoints prioritários (permissions, roles, notes, teams, account-channels, organizations, accounts)
> Gerado em: 2026-05-26
> Card atualizado em: 2026-05-25T14:03:29.719-0300

---

## Resumo do Card

- **Tipo:** Débito Técnico
- **Prioridade:** Medium
- **Status:** Pronto para desenvolvimento
- **Objetivo:** Expandir a migração do `ListDataHelper` legado (iniciada no DEV4-4189 com Tags) para 7 endpoints prioritários, corrigindo: vulnerabilidade de Filter Abuse, bug de filtro enum via LIKE, bug de truncamento no filtro IN, e falta de padronização entre endpoints.
- **Endpoints:** GET /permissions | GET /roles | GET /accounts/{account}/contacts/{contact}/notes | GET /accounts/{account}/teams | GET /accounts/{account}/account-channels | GET /organizations (admin — requer Gestor) | GET /accounts (admin — requer Gestor)

---

## BLOCO 1 — Estratégia de Teste

Débito técnico de migração de infraestrutura com impacto funcional direto em 7 endpoints. Prioridade: regressão de comportamento existente (mesma URL, parâmetros, formato de resposta) + verificação dos três bugfixes (filter abuse → 422, LIKE enum → comparação exata, truncamento do IN). Os endpoints admin (GET /organizations e GET /accounts) exigem papel Gestor — adicionar cenário de autorização específico. O risco principal é regressão silenciosa em endpoints que funcionavam com o helper legado. Execução na ordem: happy path por endpoint → bugfixes (LIKE + IN) → validações de 422 → segurança admin. Tipo de teste: funcional + regressão + segurança.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Breaking bugfix de enum causa regressão em UI/consumidor que dependia do comportamento LIKE | A | A | Alta |
| Um dos 7 endpoints migrado parcialmente — retorna formato JSON diferente do legado | M | A | Alta |
| Filtro `IN` com >2 valores ainda trunca após migração (bug não corrigido completamente) | M | A | Alta |
| Endpoint admin (organizations/accounts) acessível por usuário sem papel Gestor após migração | B | A | Alta |
| Filtro de ordem inválido gera HTTP 500 (QueryException) em vez de 422 | M | A | Alta |
| Helper legado `App\Helpers\ListDataHelper` deletado prematuramente, quebrando callers não migrados | B | A | Alta |
| `per_page` > 200 não retorna 422 — middleware LimitPerPage não ativado nos novos endpoints | B | M | Média |
| Sintaxe multi-valor via vírgula (`?status=A,B`) não normalizada corretamente pelo `prepareForValidation` | M | M | Média |
| Cache ou estado residual do legado interfere no comportamento pós-migração em canary | B | M | Média |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade |
|---|---|---|---|---|---|
| CT-LISTING-001 | GET /permissions lista com paginação correta | Usuário autenticado com acesso ao endpoint; registros existentes | 1. Autenticar<br>2. `GET /permissions?per_page=5&page=1`<br>3. Verificar estrutura da resposta | HTTP 200; JSON com `data`, `current_page`, `per_page=5`, `total`, `last_page`; formato idêntico ao legado | 🔴 Alta |
| CT-LISTING-002 | GET /roles lista com paginação correta | Usuário autenticado com acesso ao endpoint; registros existentes | 1. Autenticar<br>2. `GET /roles?per_page=10&page=1`<br>3. Verificar estrutura | HTTP 200; paginação correta; mesmo formato JSON do legado | 🔴 Alta |
| CT-LISTING-003 | GET /notes lista com paginação correta | Usuário autenticado; account e contact válidos; notas existentes | 1. Autenticar<br>2. `GET /accounts/{account}/contacts/{contact}/notes?per_page=5`<br>3. Verificar retorno | HTTP 200; lista de notas paginada; mesmo formato JSON do legado | 🔴 Alta |
| CT-LISTING-004 | GET /teams lista com paginação correta | Usuário autenticado com acesso ao account | 1. Autenticar<br>2. `GET /accounts/{account}/teams?per_page=5`<br>3. Verificar retorno | HTTP 200; lista de times paginada; mesmo formato JSON do legado | 🔴 Alta |
| CT-LISTING-005 | GET /account-channels lista com paginação correta | Usuário autenticado com acesso ao account; canais existentes | 1. Autenticar<br>2. `GET /accounts/{account}/account-channels?per_page=5`<br>3. Verificar retorno | HTTP 200; lista de canais paginada; mesmo formato JSON do legado | 🔴 Alta |
| CT-LISTING-006 | GET /organizations lista com Gestor | Usuário com papel Gestor; organizações existentes | 1. Autenticar como Gestor<br>2. `GET /organizations?per_page=5`<br>3. Verificar retorno | HTTP 200; lista de organizações paginada; mesmo formato JSON do legado | 🔴 Alta |
| CT-LISTING-007 | GET /accounts (admin) lista com Gestor | Usuário com papel Gestor; accounts existentes | 1. Autenticar como Gestor<br>2. `GET /accounts?per_page=5`<br>3. Verificar retorno | HTTP 200; lista de accounts paginada; mesmo formato JSON do legado | 🔴 Alta |
| CT-LISTING-008 | Filtro desconhecido retorna 422 em endpoint migrado | Qualquer endpoint migrado; usuário autenticado | 1. Autenticar<br>2. `GET /permissions?cor=vermelho` (parâmetro inexistente no ALLOWED_KEYS)<br>3. Verificar resposta | HTTP 422; body JSON com erro: `"O parâmetro 'cor' não é aceito por este endpoint."` | 🔴 Alta |
| CT-LISTING-009 | Coluna de ordenação inválida retorna 422 | Qualquer endpoint migrado; usuário autenticado | 1. Autenticar<br>2. `GET /roles?order=coluna_inexistente`<br>3. Verificar resposta | HTTP 422; mensagem citando a coluna inválida e listando as colunas permitidas (formato: `"O campo 'order' contém colunas inválidas: 'coluna_inexistente'. Colunas permitidas: ..."`) | 🔴 Alta |
| CT-LISTING-010 | per_page acima do limite retorna 422 | Qualquer endpoint migrado; usuário autenticado | 1. Autenticar<br>2. `GET /permissions?per_page=201`<br>3. Verificar resposta | HTTP 422; erro de validação para o campo `per_page` — middleware LimitPerPage ativo | 🟡 Média |
| CT-LISTING-011 | Usuário sem papel Gestor não acessa /organizations | Usuário autenticado sem papel Gestor (ex: operador comum) | 1. Autenticar como operador sem papel Gestor<br>2. `GET /organizations`<br>3. Verificar resposta | HTTP 403; acesso negado — o endpoint exige papel Gestor | 🔴 Alta |
| CT-LISTING-012 | Filtro enum com valor parcial não retorna extras (fix LIKE) | Endpoint migrado com campo enum; registros com valores de enum que começam com o mesmo prefixo numérico ou textual (ex: `status=1` e `status=10`) | 1. Autenticar<br>2. Requisitar com filtro enum de valor exato (ex: `?status=active` ou equivalente de um enum do endpoint)<br>3. Verificar que somente registros com valor exatamente igual ao filtrado são retornados | HTTP 200; apenas registros com valor de enum exatamente igual ao filtrado; nenhum registro com valor prefixado incluído — bug anterior do `LIKE 'value%'` não reincide | 🔴 Alta |
| CT-LISTING-013 | Filtro IN com 3+ valores processa todos sem truncar | Endpoint migrado com suporte a filtro IN; ao menos 3 registros com valores distintos no campo filtrado | 1. Autenticar<br>2. Requisitar com `?status[]=A&status[]=B&status[]=C` (ou via vírgula `?status=A,B,C`)<br>3. Verificar que os 3 grupos de registros aparecem no resultado | HTTP 200; resultado contém registros dos 3 valores informados; nenhum truncamento após o 2º item — bug anterior do `IN` não reincide | 🔴 Alta |
| CT-LISTING-014 | Multi-valor enum via vírgula equivale à sintaxe array | Endpoint migrado com filtro enum; registros com dois valores distintos | 1. Autenticar<br>2. `GET /roles?status=A,B`<br>3. Repetir com `GET /roles?status[]=A&status[]=B`<br>4. Comparar os dois resultados | Ambas as sintaxes retornam HTTP 200 com o mesmo conjunto de registros; `prepareForValidation` normaliza corretamente ambas as formas | 🟡 Média |
| CT-LISTING-015 | Tentativa de filter abuse com parâmetros sensíveis retorna 422 | Qualquer endpoint migrado; usuário autenticado | 1. Autenticar<br>2. `GET /permissions?password=123&deleted_at=2024-01-01` (colunas sensíveis não declaradas no ALLOWED_KEYS)<br>3. Verificar resposta | HTTP 422; erros para cada parâmetro não permitido com mensagem `"O parâmetro 'X' não é aceito por este endpoint."` — nenhum dado é retornado junto ao erro | 🔴 Alta |
| CT-LISTING-016 | Helper legado ListDataHelper não foi deletado | Acesso ao código-fonte ou artefato pós-deploy | 1. Verificar existência de `app/Helpers/ListDataHelper.php` no repositório/deploy após merge dos PRs de migração | Arquivo `App\Helpers\ListDataHelper` presente e intacto no repositório — não deletado durante a migração; callers não migrados continuam funcionando | 🟡 Média |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Cenário: Filtro enum com valor parcial retorna somente registros com valor exato após migração
  Dado que o endpoint GET /permissions (ou outro endpoint migrado com campo enum) está na nova infraestrutura
  E existem registros com campo enum contendo valores como "active" e "active_pending" (valores com prefixo em comum)
  Quando um usuário autenticado faz GET /permissions?status=active
  Então a resposta tem HTTP 200
  E o body contém apenas registros cujo campo "status" é exatamente "active"
  E nenhum registro com valor "active_pending" (ou qualquer variação prefixada) é incluído no resultado
```

```gherkin
Cenário: Parâmetro não declarado no ALLOWED_KEYS retorna 422 com mensagem descritiva
  Dado que o endpoint GET /roles está migrado para a nova infraestrutura com strict-input ativo
  E o parâmetro "cor" não está declarado no ALLOWED_KEYS do ListRolesRequest
  Quando um usuário autenticado faz GET /roles?cor=vermelho
  Então a resposta tem HTTP 422
  E o body JSON contém um erro para a chave "cor" com a mensagem "O parâmetro 'cor' não é aceito por este endpoint."
  E nenhum dado de listagem é retornado junto ao erro
```

---

## Validação LLM

```
✅ Validação LLM: 16 cenários aprovados | 0 revisados | 0 removidos
```
