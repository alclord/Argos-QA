# Relatório de QA — DEV4-4167

**Veredicto: ❌ REPROVADO**
**Ambiente:** Canary (`https://spa-canary.poli.digital`)
**PRs analisados:** FoundationAPI#1119 | SPA#1494
**Executado em:** 2026-05-27
**Taxa de sucesso:** 60% (9/15 cenários)

---

## Resumo

| Status | Quantidade |
|--------|-----------|
| ✅ PASSOU | 9 |
| ❌ FALHOU | 5 |
| ⏭️ BLOQUEADO | 1 |

---

## Bugs Encontrados

### 🔴 BUG-001 — API retorna HTTP 500
- Endpoint: `POST /v3/accounts/{uuid}/jarvis/suggest-template`
- Comportamento: `500 Internal Server Error` para qualquer payload válido
- Impacto: Funcionalidade principal inoperante sem mock

### 🔴 BUG-005 — Mensagem de guardrail de IA ausente
- Comportamento: Nenhum aviso de uso de IA no fluxo
- Impacto: Requisito de compliance não atendido

### 🟡 BUG-002 — Validação de mínimo de caracteres incorreta
- AC especifica 50 chars mínimo; campo aceita 10

### 🟡 BUG-003 — Sem confirmação ao fechar dialog com dados preenchidos
- Dialog fecha silenciosamente descartando os dados

### 🟡 BUG-004 — Estado não preservado ao reabrir dialog
- Campos voltam vazios ao reabrir

---

## Cenários

| ID | Nome | Resultado | Observação |
|----|------|-----------|-----------|
| CT-4167-001 | Botão "Sugerir com IA" visível | ✅ PASSOU | |
| CT-4167-002 | Dialog abre ao clicar | ✅ PASSOU | |
| CT-4167-003 | Validação: mínimo 50 chars | ❌ FALHOU | BUG-002 |
| CT-4167-004 | Campos obrigatórios presentes | ✅ PASSOU | |
| CT-4167-005 | Sugestão exibida após API | ✅ PASSOU | via mock |
| CT-4167-006 | Sugestão com campos corretos | ✅ PASSOU | via mock |
| CT-4167-007 | Botão "Aplicar" funciona | ✅ PASSOU | via mock |
| CT-4167-008 | Botão "Tentar novamente" funciona | ✅ PASSOU | via mock |
| CT-4167-009 | Loading state correto | ✅ PASSOU | via mock |
| CT-4167-010 | Botão "Cancelar" funciona | ✅ PASSOU | |
| CT-4167-011 | Guardrail de IA presente | ❌ FALHOU | BUG-005 |
| CT-4167-012 | Confirmação ao fechar | ❌ FALHOU | BUG-003 |
| CT-4167-013 | Estado preservado ao reabrir | ❌ FALHOU | BUG-004 |
| CT-4167-014 | Fluxo completo ponta-a-ponta | ⏭️ BLOQUEADO | Depende CT-015 |
| CT-4167-015 | API real sem mock | ❌ FALHOU | BUG-001 |

---

## Critério de Aprovação

Para reaprovação:
1. **Obrigatório:** BUG-001 (API 500) e BUG-005 (guardrail)
2. **Recomendado:** BUG-002 (validação chars) e BUG-003 (confirmação fechar)

---

*Gerado pelo Argos QA em 2026-05-27*
