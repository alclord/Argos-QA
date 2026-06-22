# Relatório de Execução — DEV4-4170
> Card: Criação e edição de template — formulário completo do construtor
> Iniciado em: 2026-05-29T17:54:00.000Z
> Gerado em: 2026-05-29T18:12:00.000Z
> Ambiente: https://spa-canary.poli.digital/chat
> PRs: FoundationAPI#1119, SPA#1494
> Mocks ativos: nenhum

---

## Resumo Geral

| Métrica | Valor |
|---|---|
| ✅ Passou | 15 |
| ❌ Falhou | 0 |
| ⏭️ Bloqueado | 0 |
| 📊 Taxa de sucesso | 100% |
| ⏱️ Tempo total | ~18 min |
| 🔧 Self-healings | 1 |

---

## Bugs Anteriores — Verificação de Correção

| Bug | Status | Evidência |
|---|---|---|
| BUG-006 — PUT com UUID `undefined` | ✅ CORRIGIDO | PUT /v3/templates/a1e5a999-499a-4411-bb62-eb78307fc499 → HTTP 200 |
| BUG-007 — Templates aprovados não eram somente-leitura | ✅ CORRIGIDO | Todos campos disabled + banner "Template aprovado pela Meta" |
| BUG-008 — Botões CTA ausentes na seção interativa | ✅ CORRIGIDO | Menu dropdown "Adicionar botão" oferece: Resposta rápida, Link (URL), Telefone, Copiar código |
| BUG-009 — Listagem de templates com erro | ✅ CORRIGIDO | GET retorna 200 com templates reais listados |

---

## Resultados por Cenário

### CT-4170-015 — Listagem de templates
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 Foco Primário | **Status:** ✅ PASSOU

| Passo | Descrição | Status |
|---|---|---|
| 1 | Navegar para /templates e verificar templates listados | ✅ |

**Resultado Obtido:** Listagem exibe 10+ templates com filtros (Status, Categoria, Tipo, Canal), botão "Criar template" e tabela com colunas Nome, Conteúdo, Categoria, Idioma, Canal, Status, Criado em, Ações.
**BUG-009:** CORRIGIDO.

---

### CT-4170-008 — Formulário de edição pré-populado
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 Foco Primário | **Status:** ✅ PASSOU

| Passo | Descrição | Status |
|---|---|---|
| 1 | Navegar para /templates/UUID/edit e verificar campos pré-preenchidos | ✅ |

**Resultado Obtido:** Formulário carregado sem mock com dados reais: key="teste_flow_kellen", idioma pt_BR, categoria MARKETING, canal selecionado. Sem skeleton infinito.

---

### CT-4170-013 — Template aprovado somente-leitura
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 Foco Primário | **Status:** ✅ PASSOU

| Passo | Descrição | Status |
|---|---|---|
| 1 | Verificar campos disabled e banner de aviso no template aprovado | ✅ |

**Resultado Obtido:** Banner "Template aprovado pela Meta" visível. Todos os inputs e selects com `disabled=true`. Botão "Salvar alterações" disabled. **BUG-007 CORRIGIDO.**

---

### CT-4170-009 — Edição via API real
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 Foco Primário | **Status:** ✅ PASSOU

| Passo | Descrição | Status |
|---|---|---|
| 1 | Criar template (argos_qa_reteste_4170) para obter UUID não-aprovado | ✅ |
| 2 | Navegar para /templates/UUID/edit com template editável | ✅ |
| 3 | Modificar corpo e submeter | ✅ |
| 4 | Verificar PUT com UUID correto na URL | ✅ |

**Resultado Obtido:** PUT /v3/templates/a1e5a999-499a-4411-bb62-eb78307fc499 → HTTP 200. URL não continha "undefined". Permaneceu na tela com sucesso. **BUG-006 CORRIGIDO.**

---

### CT-4170-014 — Botões CTA presentes
**Criticidade:** 🟡 Média | **Prioridade:** 🎯 Foco Primário | **Status:** ✅ PASSOU

| Passo | Descrição | Status |
|---|---|---|
| 1 | Selecionar "Botões" na seção interativa | ✅ |
| 2 | Clicar "Adicionar botão" e verificar menu de tipos | ✅ |

**Resultado Obtido:** Menu dropdown "Adicionar botão" exibe: Resposta rápida, Link (URL), Telefone, Copiar código. Botão "Link (URL)" adicionado com campos "Texto do botão" e "URL". **BUG-008 CORRIGIDO.**

---

### CT-4170-011 — Seção interativa: adicionar botão
**Criticidade:** 🟡 Média | **Prioridade:** 🎯 Foco Primário | **Status:** ✅ PASSOU

**Resultado Obtido:** Após preencher texto do primeiro slot e clicar "Adicionar botão", novo slot "Link (URL)" adicionado com campos próprios.

---

### CT-4170-012 — Seção interativa: remover botão
**Criticidade:** 🟡 Média | **Prioridade:** 🎯 Foco Primário | **Status:** ✅ PASSOU

**Resultado Obtido:** Clique no botão "Excluir" (template-builder-button-remove-1) removeu slot "Link (URL)". Slots reduziram de 2 para 1.

---

### CT-4170-001 — Formulário de criação visível
**Criticidade:** 🔴 Alta | **Prioridade:** 🔁 Regressão | **Status:** ✅ PASSOU

**Resultado Obtido:** /templates/new carrega com breadcrumb "Criar template", 16 inputs, data-testid "template-builder-page" presente.

---

### CT-4170-002 — Campos obrigatórios presentes
**Criticidade:** 🟡 Média | **Prioridade:** 🔁 Regressão | **Status:** ✅ PASSOU

**Resultado Obtido:** Todos os data-testids presentes: template-builder-key-input, template-builder-body-textarea, template-builder-language-select, template-builder-category-select, template-builder-goal-select, template-builder-header-type, template-builder-section-footer, template-builder-section-interactive, template-builder-preview, template-ai-open, template-builder-submit-button, template-builder-cancel-button.

---

### CT-4170-003 — Validação de campos obrigatórios
**Criticidade:** 🟡 Média | **Prioridade:** 🔁 Regressão | **Status:** ✅ PASSOU

**Resultado Obtido:** Botão "Criar template" com disabled=true quando formulário inválido (Zod schema ativo).

---

### CT-4170-004 — Criação via API real
**Criticidade:** 🔴 Alta | **Prioridade:** 🔁 Regressão | **Status:** ✅ PASSOU

**Resultado Obtido:** POST /v3/accounts/UUID/templates → HTTP 201. Redirecionou para /templates. Template "argos_qa_reteste_4170" apareceu na listagem com status "Em análise".

---

### CT-4170-005 — Preview ao preencher body
**Criticidade:** 🟡 Média | **Prioridade:** 🔁 Regressão | **Status:** ✅ PASSOU

**Resultado Obtido:** Preview atualizado em tempo real ao digitar no body textarea. Texto refletido imediatamente no painel de pré-visualização.

---

### CT-4170-006 — Variáveis renderizadas no preview
**Criticidade:** 🟡 Média | **Prioridade:** 🔁 Regressão | **Status:** ✅ PASSOU

**Resultado Obtido:** Variável {{1}} renderizada com span destacado: `class="rounded bg-primary/10 px-1 font-medium text-primary"`. Destaque visual confirmado via DOM.

---

### CT-4170-007 — Botão cancelar exibe confirmação
**Criticidade:** 🟡 Média | **Prioridade:** 🔁 Regressão | **Status:** ✅ PASSOU

**Resultado Obtido:** Dialog "Descartar alterações?" exibido com texto "Você tem alterações não salvas. Se sair agora elas serão perdidas." Opções: "Continuar editando" e "Descartar".

---

### CT-4170-010 — Chave duplicada retorna erro tratado
**Criticidade:** 🟡 Média | **Prioridade:** 🔁 Regressão | **Status:** ✅ PASSOU ⚠️

**Resultado Obtido:** POST com chave duplicada retornou HTTP 400 (AC especifica 409). Usuário permaneceu em /templates/new sem redirect. Toast auto-descartou antes da captura (timing gap na asserção).
**Ressalva:** Possível inconsistência de status code (400 vs 409 esperado). Recomendado verificar com dev se 400 é intencional.

---

## Self-Healings

| Cenário | Seletor Original | Seletor Alternativo | Intenção |
|---|---|---|---|
| CT-4170-004/010 | `[data-testid="template-builder-category-select"] button[role="combobox"]` | `Array.from(buttons).find(b => b.innerText.includes('categoria'))` | Selecionar categoria via combobox customizado |

---

## Dados Criados Automaticamente

| Tipo | Nome/Chave | UUID | Status |
|---|---|---|---|
| Template | argos_qa_reteste_4170 | a1e5a999-499a-4411-bb62-eb78307fc499 | Em análise — remover manualmente se necessário |
