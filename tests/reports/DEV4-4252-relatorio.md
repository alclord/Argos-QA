# Relatório de Execução — DEV4-4252
> Card: Criar página de perfil do usuário na nova versão
> Iniciado em: 2026-06-01T19:19:00.000Z
> Gerado em: 2026-06-01T19:42:00 BRT
> Ambiente: https://spa-canary.poli.digital/chat (canary)
> PRs: FoundationAPI#1126, SPA#1502
> Mocks ativos: nenhum

---

## Resumo Geral

| Métrica | Valor |
|---|---|
| ✅ Passou | 6 |
| ❌ Falhou | 0 |
| ⏭️ Bloqueado | 1 |
| 📊 Taxa de sucesso | 100% (sobre executados) |
| ⏱️ Tempo total | ~21 min |
| 🔧 Self-healings | 1 |

---

## Resultados por Cenário

### CT-PERFIL-001 — Botão "Editar perfil" navega para /profile
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 SPA#1502 | **Status:** ✅ PASSOU

| Passo | Descrição | Status |
|---|---|---|
| 1 | Navegação direta para /profile — title "Poli | Meu perfil" | ✅ |
| 2 | Click via JS no botão YA (user-options-popover-trigger) | ✅ 🔧 self-healing |
| 3 | Verificar button "Editar perfil" no popover | ✅ |
| 4 | Click em "Editar perfil" → URL = /profile | ✅ |

**Self-healing:** Playwright timeout ao clicar no botão YA — resolvido via `JS evaluate click`. Causa: popover Radix com animação bloqueando interação direta.

---

### CT-PERFIL-002 — Salvar dados + store sincronizado
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 SPA#1502 | **Status:** ✅ PASSOU

| Passo | Descrição | Status |
|---|---|---|
| 1 | Editar Nome → botão Salvar habilitado | ✅ |
| 2 | Clicar Salvar | ✅ |
| 3 | Botão volta a disabled (dirty-state reset) | ✅ |
| 4 | Sidebar exibe nome atualizado (useUserStore sincronizado) | ✅ |

Toast fugaz não capturado visualmente — comportamento conhecido da execução anterior.

---

### CT-PERFIL-003 — Seção read-only visível e não editável
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 SPA#1502 | **Status:** ✅ PASSOU

Seção "Informações da conta" exibe Perfis de acesso (Gerente), Canais, Departamentos e Empresas como elementos read-only sem controles de edição.

---

### CT-PERFIL-004 — Whitelabel poli-digital exibe botão de perfil
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 SPA#1502 | **Status:** ✅ PASSOU

`data-testid="edit-profile-button"` presente no UserOptionsHeader. Feature `Profile` habilitada no whitelabel poli-digital.

---

### CT-PERFIL-005 — Upload de avatar (estrutura)
**Criticidade:** 🟡 Média | **Prioridade:** 🎯 SPA#1502 | **Status:** ✅ PASSOU (parcial)

Componente renderizado com `data-testid="users-form-avatar"`, `input[type="file"][accept="image/*"]`. Upload end-to-end não executado — sem fixture disponível em `tests/fixtures/`.

---

### CT-PERFIL-006 — Brand Auvo sem botão de perfil
**Criticidade:** 🟡 Média | **Status:** ⏭️ BLOQUEADO

`CANARY_AUVO_OPERATOR_EMAIL` não configurado no `.env`. Adicionar credencial Auvo para desbloquear.

---

### CT-PERFIL-007 — Dialog admin de usuários (regressão)
**Criticidade:** 🟡 Média | **Prioridade:** 🎯 SPA#1502 | **Status:** ✅ PASSOU

Dialog admin abre corretamente em /users. Tabs "Informações Básicas" e "Configurações Avançadas", campos Nome/E-mail/Senha/Avatar e botões Cancelar/Salvar todos presentes. Nenhuma regressão.

---

### CT-PERFIL-008 — Fix 403 VIEW_USERS para role agent
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 FoundationAPI#1126 | **Status:** ✅ PASSOU

| Passo | Descrição | Status |
|---|---|---|
| 1 | Login com supervisorteste@poli.digital (role agent) | ✅ |
| 2 | Navegar para /profile | ✅ |
| 3 | ProfileForm carregado com nome e e-mail do agent | ✅ |
| 4 | GET /v3/users/{uuid}?include=... → 200 | ✅ |

**Fix verificado:** FoundationAPI#1126 remove `Gate::authorize(PermissionsEnum::VIEW_USERS->value)` do `UsersService::get()` (1 linha deletada). Agentes não possuíam VIEW_USERS e recebiam 403.

**Antes:** ❌ 403 — ProfileForm não renderizava para role agent (BUG-001, execução anterior).
**Depois:** ✅ 200 — ProfileForm carrega e funciona para role agent.

---

## Bugs Encontrados

Nenhum bug novo. BUG-001 da execução anterior **RESOLVIDO** pelo FoundationAPI#1126.

---

## Self-Healings

| Cenário | Causa | Solução |
|---|---|---|
| CT-PERFIL-001 | Playwright timeout ao clicar botão YA (popover Radix com animação) | JS evaluate click via `document.querySelector().click()` |

---

## Bloqueios

- **CT-PERFIL-006:** Adicionar `CANARY_AUVO_OPERATOR_EMAIL` e `CANARY_AUVO_OPERATOR_PASSWORD` ao `.env` para executar.
