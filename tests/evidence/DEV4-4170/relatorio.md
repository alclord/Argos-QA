# Relatório de QA — DEV4-4170

**Veredicto: ❌ REPROVADO**
**Ambiente:** Canary (`https://spa-canary.poli.digital`)
**PRs analisados:** FoundationAPI#1119 | SPA#1494
**Executado em:** 2026-05-27
**Taxa de sucesso:** 80% (12/15 cenários)

---

## Resumo

| Status | Quantidade |
|--------|-----------|
| ✅ PASSOU | 12 |
| ❌ FALHOU | 3 |
| ⏭️ BLOQUEADO | 0 |

---

## Bugs Encontrados

### 🔴 BUG-006 — PUT envia UUID `undefined`
- Endpoint: `PUT /v3/accounts/{uuid}/templates/undefined`
- Comportamento: Ao editar template existente, a SPA monta a URL com `undefined` no lugar do UUID do template
- Impacto: Edição de templates completamente inoperante sem mock

### 🔴 BUG-009 — Listagem de templates retorna erro
- Endpoint: `GET /v3/accounts/{uuid}/templates` (ou equivalente)
- Comportamento: Tela "Modelos de Mensagens para App" carrega mas exibe "Erro ao carregar templates" e "Tentar novamente" — nenhum template listado
- Impacto: Fluxo de listagem completamente inoperante; usuário não consegue ver templates criados
- Evidência: `tests/evidence/dev4-4170/BUG-009_listagem_erro.png`

### 🟡 BUG-007 — Templates aprovados não são somente-leitura
- AC especifica que templates com status `APPROVED` devem ter campos desabilitados
- Comportamento: Campos permanecem editáveis independente do status
- Impacto: Usuário pode modificar templates que já passaram por aprovação

### 🟡 BUG-008 — Botões CTA ausentes na seção interativa
- AC especifica botões de call-to-action na seção interativa do template
- Comportamento: Botões CTA não são renderizados ou não funcionam conforme esperado
- Impacto: Funcionalidade de seção interativa incompleta

---

## Cenários

| ID | Nome | Resultado | Observação |
|----|------|-----------|-----------|
| CT-4170-001 | Formulário de criação visível | ✅ PASSOU | |
| CT-4170-002 | Campos obrigatórios presentes | ✅ PASSOU | |
| CT-4170-003 | Validação de campos obrigatórios | ✅ PASSOU | |
| CT-4170-004 | Criação via API real | ✅ PASSOU | |
| CT-4170-005 | Preview ao preencher body | ✅ PASSOU | |
| CT-4170-006 | Variáveis renderizadas no preview | ✅ PASSOU | |
| CT-4170-007 | Botão cancelar exibe confirmação | ✅ PASSOU | |
| CT-4170-008 | Formulário de edição pré-populado | ✅ PASSOU | via mock |
| CT-4170-009 | Edição via API real | ❌ FALHOU | BUG-006 |
| CT-4170-010 | Chave duplicada retorna erro 409 | ✅ PASSOU | |
| CT-4170-011 | Seção interativa — adicionar botão | ✅ PASSOU | |
| CT-4170-012 | Seção interativa — remover botão | ✅ PASSOU | |
| CT-4170-013 | Template aprovado somente-leitura | ❌ FALHOU | BUG-007 |
| CT-4170-014 | Botões CTA presentes | ❌ FALHOU | BUG-008 |
| CT-4170-015 | Listagem de templates | ❌ FALHOU | BUG-009 |

---

## Critério de Aprovação

Para reaprovação:
1. **Obrigatório:** BUG-006 (PUT com UUID undefined) e BUG-009 (listagem com erro)
2. **Recomendado:** BUG-007 (read-only para aprovados) e BUG-008 (botões CTA)

---

*Gerado pelo Argos QA em 2026-05-27*
