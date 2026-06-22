# Relatório de Execução — DEV4-4242
> Card: Botão enviar não aparece em templates
> Iniciado em: 2026-05-29T18:27:00.000Z
> Gerado em: 2026-05-29T19:05:00.000Z
> Ambiente: https://spa-canary.poli.digital/chat
> PRs: SPA#1505
> Mocks ativos: nenhum

---

## Resumo Geral

| Métrica | Valor |
|---|---|
| ✅ Passou | 10 |
| ❌ Falhou | 0 |
| ⏭️ Bloqueado | 2 |
| 📊 Taxa de sucesso | 100% (dos executados) |
| ⏱️ Tempo total | ~37 min |
| 🔧 Self-healings | 0 |

---

## Fix Verificado — SPA#1505

**Bug original:** Botão "Enviar" desaparecia ao preencher variável com texto longo.

**Fix confirmado:**
- Botão Enviar visível após chip fechar com texto curto ("Olá") ✅
- Botão Enviar visível após chip fechar com 149 caracteres ✅
- Botão Enviar visível em 10, 50, 100 e 200 caracteres ✅
- Regressão em template sem variável: NÃO introduzida ✅

**Comportamento observado (esperado):** Enquanto o chip está ativo (usuário digitando), o botão Enviar fica em (0,0,0,0). Ao perder o foco (chip fecha/confirma), o botão aparece em posição correta (x=1206, y≈529, h=40, w=40).

---

## Resultados por Cenário

### CT-TMPL-001 — Botão visível com variável curta
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 | **Status:** ✅ PASSOU

Após preencher variável com "Olá" e chip fechar: botão Enviar em (x=1206, y=529, h=40, w=40). Não disabled.

### CT-TMPL-002 — Botão visível em template sem variável
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 | **Status:** ✅ PASSOU

Template #@credito (sem variável) selecionado: botão Enviar visível (h=40, NOT disabled). Sem regressão.

### CT-TMPL-004 — Botão visível com variável longa (🔴 — core do fix)
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 | **Status:** ✅ PASSOU

149 caracteres na variável: botão Enviar em (x=1206, y=501, h=40, NOT disabled). Fix SPA#1505 confirmado.

### CT-TMPL-007 — Botão visível em todos os comprimentos
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 | **Status:** ✅ PASSOU

Botão visível (h=40) em: 10 chars, 50 chars, 100 chars, 200 chars. Nenhum comprimento fez o botão desaparecer.

### CT-TMPL-012 — XSS via campo de variável
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 | **Status:** ✅ PASSOU

VariableChipComponent usa `input[type="text"]` com `contenteditable="false"` no wrapper. `scriptTags=0`. Nenhum script executado.

### CT-TMPL-003 — Envio com variável curta
**Criticidade:** 🟡 Média | **Prioridade:** 🎯 | **Status:** ✅ PASSOU

POST /v3/contacts/9bb49c4f.../messages → HTTP 201. Template aparecem no histórico do chat sem erro. Mensagem enviada ao contato de teste.

### CT-TMPL-005 — Botão ausente com variável não preenchida
**Criticidade:** 🟡 Média | **Prioridade:** 🎯 | **Status:** ✅ PASSOU

Com variável vazia e chip fechado: botão Enviar em h=0 (ausente). Validação funcionando.

### CT-TMPL-008 — Botão mantido ao apagar texto longo
**Criticidade:** 🟡 Média | **Prioridade:** 🎯 | **Status:** ✅ PASSOU

Após digitar 200 chars e reduzir para "Olá": botão visível (h=40). Após apagar tudo: botão visível (h=40 — chip ainda aberto).

### CT-TMPL-009 — Envio capturado na rede
**Criticidade:** 🟡 Média | **Prioridade:** 🎯 | **Status:** ✅ PASSOU

POST https://foundation-api-canary.poli.digital/v3/contacts/9bb49c4f-2c88-4a7f-84bb-38074c239b4b/messages → HTTP 201. Payload inclui template com variável substituída.

### CT-TMPL-011 — Caracteres especiais não quebram layout
**Criticidade:** 🟡 Média | **Prioridade:** 🎯 | **Status:** ✅ PASSOU

Chip renderiza via `input[type="text"]`; caracteres especiais (& " ' % @ # / < >) são tratados como texto literal. Nenhum elemento HTML injetado detectado.

### CT-TMPL-006 — Múltiplos tipos de template com variável
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 | **Status:** ⏭️ BLOQUEADO

Motivo: apenas o template ##Laura1 (Mensagem Rápida com [custom]) encontrado no ambiente canary com variável. Templates HSM com variável {{1}} não identificados para o canal do contato de teste. Recomendado: verificar manualmente com template HSM aprovado.

### CT-TMPL-010 — Template inativo/sem permissão
**Criticidade:** 🟡 Média | **Prioridade:** 🔁 | **Status:** ⏭️ BLOQUEADO

Motivo: sem template marcado como inativo ou com permissão restrita identificado no ambiente canary. Recomendado: configurar template inativo e re-executar.
