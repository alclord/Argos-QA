# Relatório de Execução — DEV4-4169
> Card: Listagem de templates — tabela com busca, filtros e dados básicos
> Gerado em: 2026-05-20 14:45
> Ambiente: https://spa-canary.poli.digital/templates
> Build canary: v3.5.327 (deploy 2026-05-20 11:15 — pós-correções do review de Pedro Vieira)

---

## Resumo Geral

| Métrica | Valor |
|---|---|
| ✅ Passou | 11 |
| ❌ Falhou | 0 |
| ⚠️ Inconsistente | 1 |
| ⏭️ Bloqueado | 1 |
| 📊 Taxa de sucesso | 85% (cenários executáveis: 11/13) |

> **Nota sobre o build testado:** O canary atual (v3.5.327) é o segundo deploy após a reprovação de Pedro Vieira (pedro.vieira@poli.digital) em 2026-05-19. As correções do review anterior estão incluídas neste build. Os cenários extras (CT-TMPL-002-EX, CT-TMPL-003-EX, CT-TMPL-004-EX) foram adicionados especificamente para cobrir os itens reportados e corrigidos.

---

## Resultados por Cenário

### CT-TMPL-001 — Rota `/templates` acessível
**Criticidade:** 🔴 Alta | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | Navegar para `/templates` com usuário autenticado | ✅ | CT-TMPL-001_passo1_ok.png |

**Resultado Obtido:** Rota acessível, página renderizada com título "Templates", `data-testid="templates-page"` presente no elemento raiz.
**Resultado Esperado:** Rota acessível para usuários com permissão `VIEW_TEMPLATES`.

---

### CT-TMPL-002 — Tabela renderiza com colunas corretas
**Criticidade:** 🔴 Alta | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | Verificar headers da tabela | ✅ | CT-TMPL-003_passo1_ok.png |

**Resultado Obtido:** Colunas presentes: Nome, Conteúdo, Categoria, Idioma, Canal, Status, Criado em, Ações. Todas as 8 colunas visíveis.
**Resultado Esperado:** Tabela com colunas: nome, categoria, idioma, canal, status Meta, data de criação, ações.

---

### CT-TMPL-002-EX — Colunas Categoria e Idioma exibem dados nas células (extra — gap do review)
**Criticidade:** 🔴 Alta | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | Verificar dados nas células de Categoria e Idioma | ✅ | CT-TMPL-002EX_colunas_categoria_idioma.png |

**Resultado Obtido:** Templates com dados preenchidos exibem os valores corretamente nas células:
- `mvanteciparretornosexta` → Categoria: "Marketing", Idioma: "pt_BR"
- `#testemaster` → Categoria: "Utility", Idioma: "pt_BR"
- `t-retorno` → Categoria: "Marketing", Idioma: "pt_BR"
- `Retomar contacto` → Categoria: "Marketing", Idioma: "es_MX"

Templates sem dados cadastrados exibem "—" como fallback correto (ex: "COMO PESQUISAR" — template incompleto na API).

**Resultado Esperado:** Células de Categoria e Idioma exibem os dados quando disponíveis.
**Contexto:** Bug reportado por Pedro Vieira em 2026-05-19 — colunas exibiam "—" para todos os registros. Corrigido no build 2026-05-20.

---

### CT-TMPL-003 — Busca com debounce e persistência na URL
**Criticidade:** 🔴 Alta | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | Digitar "testemaster" e aguardar debounce | ✅ | CT-TMPL-003_passo1_ok.png |
| 2 | Verificar URL `?search=testemaster` e resultado filtrado | ✅ | CT-TMPL-003_passo1_ok.png |

**Resultado Obtido:** Busca funcionando com debounce. URL atualizada para `?search=testemaster` após 300ms. Resultado filtrado exibido.
**Resultado Esperado:** Busca debounced com estado persistido na URL.

---

### CT-TMPL-003-EX — Busca não dispara com 1 caractere (mínimo 2 chars) (extra — gap do review)
**Criticidade:** 🔴 Alta | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | Digitar "A" (1 char) e aguardar 800ms (> debounce) | ✅ | CT-TMPL-003EX_busca_1char_sem_request.png |
| 2 | Verificar que URL permanece `/templates` sem `?search=A` | ✅ | CT-TMPL-003EX_busca_1char_sem_request.png |
| 3 | Digitar "AB" (2 chars) e aguardar 800ms | ✅ | CT-TMPL-003EX_busca_2chars_dispara.png |
| 4 | Verificar que URL atualiza para `?search=AB` e requisição é disparada | ✅ | CT-TMPL-003EX_busca_2chars_dispara.png |

**Resultado Obtido:**
- Com 1 caractere ("A"): URL permaneceu `https://spa-canary.poli.digital/templates`. Nenhuma requisição com `search=A` registrada no log de rede. Regra de mínimo 2 chars respeitada.
- Com 2 caracteres ("AB"): URL atualizou para `?search=AB`. Requisição `GET /templates?...&search=AB` disparada (req #65, 200 OK).

**Resultado Esperado:** Busca executada somente com mínimo de 2 caracteres.
**Contexto:** Bug reportado por Pedro Vieira em 2026-05-19 — busca disparava com 1 caractere. Corrigido no build 2026-05-20.

---

### CT-TMPL-004 — Filtros funcionam isoladamente e em combinação
**Criticidade:** 🟡 Média | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | Aplicar filtro `status=VALIDATED` | ✅ | CT-TMPL-004_passo1_status_ok.png |
| 2 | Combinar com `category=MARKETING` | ✅ | CT-TMPL-004_passo2_combinado_ok.png |

**Resultado Obtido:** Filtros por status e categoria aplicados isoladamente e em combinação. URL persistiu `?status=VALIDATED&category=MARKETING`. Resultados filtrados corretamente.
**Resultado Esperado:** Filtros funcionam isoladamente e em combinação, persistindo na URL.

---

### CT-TMPL-004-EX — Filtros possuem label descritivo (extra — gap do review)
**Criticidade:** 🟡 Média | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | Verificar presença de labels nos filtros | ✅ | CT-TMPL-004EX_filtros_com_labels.png |

**Resultado Obtido:** Todos os 4 filtros possuem label descritivo visível acima do select:
- "Status" acima do combobox de status
- "Categoria" acima do combobox de categoria
- "Tipo" acima do combobox de tipo
- "Canal" acima do combobox de canal

**Resultado Esperado:** Cada filtro deve ter legenda identificando o que ele filtra.
**Contexto:** Bug reportado por Pedro Vieira em 2026-05-19 — filtros sem legenda. Corrigido no build 2026-05-20.

---

### CT-TMPL-005 — Ordenação por coluna alterna asc/desc
**Criticidade:** 🟡 Média | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | Clicar em "Nome" para ordenar asc, verificar `?order=key` | ✅ | CT-TMPL-005_passo1_ordenacao_ok.png |
| 2 | Clicar novamente para desc, verificar `?order=-key` | ✅ | CT-TMPL-005_passo1_ordenacao_ok.png |
| 3 | Ordenar por "Criado em" asc e desc | ✅ | CT-TMPL-005_passo1_ordenacao_ok.png |

**Resultado Obtido:** Ordenação por Nome (`?order=key` / `?order=-key`) e por Criado em (`?order=created_at` / `?order=-created_at`) funcionando corretamente.
**Resultado Esperado:** Ordenação por nome e data de criação alterna asc/desc ao clicar no header.

---

### CT-TMPL-006 — Paginação mantém filtros e busca
**Criticidade:** 🟡 Média | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | Com filtro ativo, navegar para página 2 | ✅ | CT-TMPL-006_passo1_paginacao_ok.png |
| 2 | Verificar URL `?page=2` com filtros preservados | ✅ | CT-TMPL-006_passo1_paginacao_ok.png |

**Resultado Obtido:** Navegação para página 2 preservou filtros e busca na URL. Página exibiu o conjunto correto de resultados.
**Resultado Esperado:** Paginação navega corretamente e mantém filtros/busca/ordenação.

---

### CT-TMPL-007 — Estados de UI: loading, empty e error com `data-testid`
**Criticidade:** 🟡 Média | **Status:** ⚠️ INCONSISTENTE

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | Busca sem resultado exibe empty state | ✅ | CT-TMPL-007_passo1_empty_ok.png |
| 2 | Container do empty state tem `data-testid` | ❌ | CT-TMPL-007_passo1_empty_ok.png |

**Resultado Obtido:** O empty state renderiza visualmente com o texto "Nenhum template encontrado". Porém o container do empty state (`<div class="flex items-center justify-center p-8 text-center">`) não possui atributo `data-testid`. A estrutura do DOM confirmada:
```
section[data-testid="templates-page"]
  └── div (genérico, sem testid)
        └── div.flex.items-center.justify-center.p-8.text-center  ← SEM data-testid
              └── "Nenhum template encontrado"
```
Estados de loading (skeleton) e error não foram verificados por limitações de ambiente (não foi possível forçar esses estados no canary).

**Resultado Esperado:** Todos os estados de UI (loading, empty, error) têm `data-testid` para automação de testes.
**Divergência — BUG-001 🟢 Menor:** Container do empty state sem `data-testid`. Impacto: testes Vitest que buscam por `screen.getByTestId('templates-empty-state')` falharão. Sem impacto para o usuário final.

---

### CT-TMPL-008 — Reload com filtros na URL preserva estado
**Criticidade:** 🟡 Média | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | Recarregar com `?status=VALIDATED&search=teste` na URL | ✅ | CT-TMPL-008_passo1_reload_ok.png |

**Resultado Obtido:** Após reload com parâmetros na URL, a tabela re-aplicou os filtros e exibiu os resultados corretos. Estado totalmente restaurado via URL.
**Resultado Esperado:** Reload preserva estado completo da tabela.

---

### CT-TMPL-009 — Item no Sidebar presente
**Criticidade:** 🟢 Baixa | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | Verificar link `/templates` no sidebar | ✅ | CT-TMPL-009_passo1_sidebar_ok.png |

**Resultado Obtido:** Link `/templates` visível e funcional no sidebar para o usuário com permissão. Navegação para a página funcionou via sidebar.
**Resultado Esperado:** Item no sidebar aparece com feature flag e permissão satisfeitas.

---

### CT-TMPL-010 — Usuário sem `VIEW_TEMPLATES` não acessa a rota
**Criticidade:** 🔴 Alta | **Status:** ⏭️ BLOQUEADO

**Motivo:** Não há usuário de teste sem a permissão `VIEW_TEMPLATES` configurado no ambiente canary. Não é possível validar o comportamento de acesso negado sem esse pré-requisito.

---

## Bugs Encontrados

| ID | CT de Origem | Descrição | Severidade | Evidência |
|---|---|---|---|---|
| BUG-001 | CT-TMPL-007 | Container do empty state sem `data-testid` — visível para usuário, mas quebrará testes Vitest que busquem por testId | 🟢 Menor | CT-TMPL-007_passo1_empty_ok.png |

---

## Cobertura dos Itens Reportados por Pedro Vieira (review 2026-05-19)

| Bug relatado | Cenário | Resultado no build atual |
|---|---|---|
| Busca dispara com 1 caractere | CT-TMPL-003-EX | ✅ CORRIGIDO — 1 char não dispara, 2 chars dispara |
| Coluna Categoria sem dados nas células | CT-TMPL-002-EX | ✅ CORRIGIDO — dados exibidos corretamente |
| Coluna Idioma sem dados nas células | CT-TMPL-002-EX | ✅ CORRIGIDO — dados exibidos corretamente |
| Filtros sem legenda | CT-TMPL-004-EX | ✅ CORRIGIDO — labels Status, Categoria, Tipo, Canal presentes |
| Ordenação por nome (screenshot sem descrição clara) | CT-TMPL-005 | ✅ PASSOU — asc/desc funcionando |

---

## Observações

- O build testado (v3.5.327, deploy 11:15) é pós-correção do review do Pedro Vieira. Todos os 4 bugs descritos no comentário de 2026-05-19 foram corrigidos e validados.
- Templates que não possuem Categoria/Idioma cadastrados na API exibem "—" como fallback — comportamento correto, não é bug.
- CT-TMPL-010 (permissão CASL) permanece bloqueado por falta de usuário de teste adequado no ambiente.
- BUG-001 (empty state sem `data-testid`) não existia no review anterior do Pedro — é uma observação nova desta execução, severidade menor.

---

## Evidências

Todas as evidências salvas em: `tests/evidence/DEV4-4169/`

| Arquivo | Descrição |
|---|---|
| preflight_ambiente.png | Tela inicial após login |
| CT-TMPL-001_passo1_ok.png | Rota `/templates` acessível |
| CT-TMPL-003_passo1_ok.png | Tabela com colunas e busca |
| CT-TMPL-002EX_colunas_categoria_idioma.png | Colunas Categoria e Idioma com dados |
| CT-TMPL-003EX_busca_1char_sem_request.png | 1 char digitado — URL sem `?search=`, sem requisição |
| CT-TMPL-003EX_busca_2chars_dispara.png | 2 chars digitados — URL `?search=AB`, requisição disparada |
| CT-TMPL-004EX_filtros_com_labels.png | Labels dos filtros: Status, Categoria, Tipo, Canal |
| CT-TMPL-004_passo1_status_ok.png | Filtro por status aplicado |
| CT-TMPL-004_passo2_combinado_ok.png | Filtros combinados |
| CT-TMPL-005_passo1_ordenacao_ok.png | Ordenação asc/desc |
| CT-TMPL-006_passo1_paginacao_ok.png | Paginação com filtros preservados |
| CT-TMPL-007_passo1_empty_ok.png | Empty state visível (sem data-testid no container) |
| CT-TMPL-008_passo1_reload_ok.png | Reload preserva estado da URL |
| CT-TMPL-009_passo1_sidebar_ok.png | Sidebar com link `/templates` |
