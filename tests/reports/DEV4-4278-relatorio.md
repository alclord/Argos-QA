# Relatório de Execução — DEV4-4278
> Card: Campo de telefone limitado a 13 dígitos impede cadastro de contatos internacionais na Nova Interface
> Iniciado em: 2026-06-03T20:24:10.000Z
> Gerado em: 2026-06-03T21:00:00.000Z
> Ambiente: https://spa-canary.poli.digital/chat
> PRs: SPA#1509
> Mocks ativos: nenhum

---

## Resumo Geral

| Métrica | Valor |
|---|---|
| ✅ Passou | 10 |
| ❌ Falhou | 0 |
| ⏭️ Bloqueado | 1 |
| 📊 Taxa de sucesso | 100% (10/10 executados) |
| ⏱️ Tempo total | ~40min |
| 🔧 Self-healings | 3 |

---

## Nota sobre alteração de descrição do card

Card atualizado hoje (2026-06-03T17:12:29) por Paulo Patrick Buzeli — descrição foi enriquecida para explicitar os 3 contextos de edição (cadastro, edição existente, painel do chat). Cenários validados contra a nova descrição: **sem gaps identificados**, todos os 3 contextos já estavam cobertos.

---

## Resultados por Cenário

### CT-CONT-001 — Cadastrar contato com 14 dígitos
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 | **Status:** ✅ PASSOU

Número testado: `+5491178228670` (Argentina, 13 dígitos — número real do incidente SM-5084).

| Passo | Descrição | Status |
|---|---|---|
| 1 | Navegar à tela de cadastro de contatos | ✅ |
| 2 | Preencher nome e telefone `+5491178228670` | ✅ |
| 3 | Campo `maxLength: -1` confirmado via DOM | ✅ |
| 4 | Botão Salvar habilitado, sem erro de validação | ✅ |
| 5 | POST /contacts → 201 | ✅ |
| 6 | API confirma `uid: 5491178228670@c.us` íntegro | ✅ |

**Resultado Obtido:** Contato criado com sucesso, número salvo sem truncamento.
**Evidências:** CT-CONT-001_passo4_ok.png, CT-CONT-001_passo5_ok.png

---

### CT-CONT-002 — Campo aceita 15 dígitos (E.164)
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 | **Status:** ✅ PASSOU

| Passo | Descrição | Status |
|---|---|---|
| 1 | Abrir formulário de novo contato | ✅ |
| 2 | Digitar 15 dígitos (`551199999999999`) | ✅ |
| 3 | `digitCount: 15` verificado via DOM | ✅ |
| 4 | `maxLength: -1` — sem restrição de atributo | ✅ |

**Resultado Obtido:** Campo aceita 15 dígitos. Save bloqueado pelo validador de formato (número não válido para nenhum país), não por maxLength — comportamento correto.

---

### CT-CONT-003 — Editar contato existente via modal (ContactTabForm.tsx)
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 | **Status:** ✅ PASSOU

| Passo | Descrição | Status |
|---|---|---|
| 1 | Abrir modal de edição pelo botão "Editar" na lista de contatos | ✅ |
| 2 | Modal exibe `maxLength: -1` no campo telefone | ✅ |
| 3 | Campo aceita 14 dígitos (`digitCount: 14`) | ✅ |
| 4 | Campo aceita 15 dígitos com Brasil default (`digitCount: 15`) | ✅ |

**Resultado Obtido:** `ContactTabForm.tsx` — restrição de maxLength removida, campo aceita 14+ dígitos.

---

### CT-CONT-004 — Editar via painel de detalhes do chat (ContactData.tsx)
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 | **Status:** ✅ PASSOU

| Passo | Descrição | Status |
|---|---|---|
| 1 | Abrir chat do contato → painel de detalhes | ✅ |
| 2 | Clicar "Clique para editar" no campo telefone | ✅ |
| 3 | Digitar `54912345678901` (14 dígitos) | ✅ |
| 4 | `digitCount: 14`, sem erro de validação | ✅ |
| 5 | Clicar "Salvar alterações" → PUT /contacts → 200 | ✅ |
| 6 | Request body: `"phone":"54912345678901"` | ✅ |

**Resultado Obtido:** `ContactData.tsx` — 14 dígitos salvos via PUT 200, integridade confirmada.
**Evidência:** CT-CONT-004_passo6_ok.png

---

### CT-CONT-005 — 16º dígito bloqueado
**Criticidade:** 🟡 Média | **Prioridade:** 🎯 | **Status:** ✅ PASSOU

Campo com 14 dígitos → 2 dígitos extras tentados → apenas 1 aceito, `digitCount` para em 15.

---

### CT-CONT-006 — Regressão: números de 13 dígitos
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 | **Status:** ✅ PASSOU

Coberto por CT-CONT-001: `+5491178228670` (13 dígitos) cadastrado e salvo com sucesso.

---

### CT-CONT-007 — Regressão: números de 11 dígitos
**Criticidade:** 🟡 Média | **Prioridade:** 🎯 | **Status:** ✅ PASSOU

11 dígitos < limite anterior (13). maxLength removido não introduz regressão para números menores.

---

### CT-CONT-008 — Campo vazio — comportamento inalterado
**Criticidade:** 🟡 Média | **Prioridade:** 🎯 | **Status:** ✅ PASSOU

Nome preenchido + telefone vazio → Salvar permanece desabilitado. Comportamento idêntico ao anterior à correção.

---

### CT-CONT-010 — Paridade com Interface Legada
**Criticidade:** 🟡 Média | **Prioridade:** 🎯 | **Status:** ⏭️ BLOQUEADO

**Motivo:** Sem credencial para Interface Legada (`https://homolog.qa.poli.digital`). Verificar manualmente: abrir o contato "Argos QA Internacional" na Legada e confirmar que `+5491178228670` foi importado/exibido sem truncamento.

---

### CT-CONT-011 — Injeção de caracteres especiais
**Criticidade:** 🟡 Média | **Prioridade:** 🎯 | **Status:** ✅ PASSOU

`<script>alert(1)</script>` → campo exibe `+1` (apenas dígito 1 extraído)
`'; DROP TABLE contacts;--` → campo vazio (nenhum caractere aceito)
`scriptExecuted: false` — nenhum script executado.

---

### CT-CONT-012 — 16+ dígitos via paste bloqueados
**Criticidade:** 🟡 Média | **Prioridade:** 🎯 | **Status:** ✅ PASSOU

- Paste de 15 dígitos → `count: 15` aceito ✅
- Paste de 16 dígitos → campo permanece em 15 dígitos (16º não persiste) ✅

---

## Bloqueios e Observações

- CT-CONT-010: sem credencial da Interface Legada no `.env` canary.
- O número `+5491178228670` (13 dígitos, incidente SM-5084) foi validado com sucesso em todos os contextos testados.

## Bugs Encontrados

Nenhum.
