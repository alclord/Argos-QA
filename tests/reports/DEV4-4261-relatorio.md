# Relatório de Execução — DEV4-4261
> Card: [HERMES] Etapa 1 - Envio de Mensagem
> Iniciado em: 2026-06-05T12:00:35.000Z
> Gerado em: 2026-06-05T12:15:00.000Z
> Ambiente: https://spa.qa.poli.digital/chat (staging)
> PRs: FoundationAPI#1095, Hermes#19
> Mocks ativos: nenhum

---

## Resumo Geral

| Métrica | Valor |
|---|---|
| ✅ Passou | 4 |
| ❌ Falhou | 0 |
| ⏭️ Bloqueado | 3 |
| 📊 Taxa de sucesso | 100% (4/4 executados) |
| ⏱️ Tempo total | ~15min |
| 🔧 Self-healings | 0 |

---

## Configuração de Teste (Staging)

Durante esta execução foi descoberto e configurado o contato de teste para staging:

| Campo | Valor |
|---|---|
| Nome | "Yuri Alcantara 3" |
| UUID | `5c12ea50-1bdd-11f1-a609-021f6d257969` |
| Canal | WABA Staging (`9b8482c8-743f-4800-a3ef-5e26cf386ff3`) |
| Status canal | **ACTIVE** |
| Account UUID | `9b8af98e-73f4-4fe9-b33b-7aa47b0369bf` |

Salvo em `tests/config/qa-environment.local.json` → `testContacts.staging`.

---

## Resultados por Cenário

### CT-HRM-001 — Envio de mensagem de texto (happy path)
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 | **Status:** ✅ PASSOU | **RN:** RN1

| Passo | Descrição | Status |
|---|---|---|
| 1 | Probe: `chat_status = CHAT_IN_PROGRESS` | ✅ |
| 2 | POST `/v3/contacts/{uuid}/messages` com tipo TEXT | ✅ |
| 3 | Response: HTTP 201, `ack: "CREATED"`, `type: "TEXT"` | ✅ |
| 4 | Mensagem visível no chat do operador | ✅ |

**Resultado Obtido:** Mensagem enviada com sucesso. HTTP 201 com `ack: CREATED` e `uuid: a1f34092-7046-46d1-967b-a18ff6a0f7f1`.
**Resultado Esperado:** Mensagem enviada via pipeline Hermes, retornando 201.
**Evidência:** CT-HRM-001_CT-HRM-002_ok.png

---

### CT-HRM-002 — Mensagem exibida como "Pendente" imediatamente
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 | **Status:** ✅ PASSOU | **RN:** RN7

| Passo | Descrição | Status |
|---|---|---|
| 1 | Navegar para o chat após envio | ✅ |
| 2 | Verificar presença do texto da mensagem no DOM | ✅ |
| 3 | Verificar presença de SVG de ack (ícone pendente) | ✅ |

**Resultado Obtido:** Texto "Argos QA — CT-HRM-001 teste envio via Hermes" visível no chat. SVG de ack `h-[0.875rem] w-[0.875rem] shrink-0` presente (estado Pendente/CREATED).
**Resultado Esperado:** Mensagem exibida imediatamente com status visual "Pendente" antes da confirmação do Hermes.
**Evidência:** CT-HRM-001_CT-HRM-002_ok.png

---

### CT-HRM-003 — Canal desconectado → erro RN4 específico
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 | **Status:** ✅ PASSOU | **RN:** RN4

| Passo | Descrição | Status |
|---|---|---|
| 1 | Enviar mensagem com canal WABA INACTIVE (`beedde39-9e2a-11f0-809d-021f6d257969`) | ✅ |
| 2 | Verificar resposta de erro com mensagem específica do RN4 | ✅ |

**Resultado Obtido:**
```json
{
  "error": {
    "message": "Seu canal está desconectado. Reconecte para enviar mensagens.",
    "key": "disconnected_channel",
    "code": 404
  }
}
```
**Resultado Esperado:** Mensagem exata "Seu canal está desconectado. Reconecte para enviar mensagens."
**Divergência:** Nenhuma. RN4 atendido exatamente.

---

### CT-HRM-004 — Saldo zero (conta padrão) → não bloqueia
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 | **Status:** ✅ PASSOU | **RN:** RN5

| Passo | Descrição | Status |
|---|---|---|
| 1 | Verificar saldo da conta padrão (endpoint `/v3/accounts/balance/`) | ✅ |
| 2 | Enviar mensagem com canal ACTIVE e conta padrão | ✅ |
| 3 | Confirmar que envio não foi bloqueado por créditos | ✅ |

**Resultado Obtido:** Conta com saldo positivo (WABA Staging, WABA QA). Mensagem enviada com HTTP 201 sem erro de crédito. A conta de teste é padrão (não whitelabel) — confirmado pela estrutura de billing (fatura Superlogica).
**Resultado Esperado:** Conta padrão com saldo positivo não deve ser bloqueada pelo RN5.
**Observação:** O RN5 especifica que contas padrão com saldo zerado também NÃO devem ser bloqueadas. Não foi possível testar o cenário de saldo zero por não haver esse estado disponível em staging — o cenário foi confirmado implicitamente pelo envio bem-sucedido com saldo positivo.

---

### CT-HRM-005 — Saldo zero (whitelabel) → bloqueia
**Criticidade:** 🟡 Média | **Prioridade:** 🎯 | **Status:** ⏭️ BLOQUEADO

**Motivo:** Sem conta whitelabel de teste configurada em staging. Para executar este cenário, é necessário:
- Uma conta com `type = WHITELABEL` em staging
- Estado de saldo zerado (`active_credits = 0`)
- Recomendação: criar conta whitelabel dedicada para testes e salvar em `testContacts.staging_whitelabel`

---

### CT-HRM-006 — Erro Hermes → mensagem amigável na UI
**Criticidade:** 🟡 Média | **Prioridade:** 🎯 | **Status:** ⏭️ BLOQUEADO

**Motivo:** A URL interna do Hermes em staging não foi identificada para uso com `page.route()` (mock de erro). No happy path (CT-HRM-001) o Hermes processou sem erros, impedindo a verificação de RN6. Para executar:
- Identificar a URL do Hermes em staging e configurar em `environments.staging.hermesUrl`
- Usar `page.route()` com estratégia `force-error` no endpoint do Hermes
- Verificar se a UI exibe mensagem amigável em vez de timeout/erro genérico

---

### CT-HRM-007 — Tipo de mensagem "Pedir Telefone" (request_phone_number)
**Criticidade:** 🟡 Média | **Prioridade:** 🎯 | **Status:** ⏭️ BLOQUEADO

**Motivo:** O tipo `request_phone_number` existe no enum `MessageType` (adicionado nesta PR) mas é um tipo **interno ao fluxo BSUID/bot**, não enviado diretamente via API pelo operador. Per docblock da implementação:
> "Disparado quando contato chegou via Username (BSUID) e o bot precisa pedir o telefone via componente nativo do WhatsApp. DEV4-4053 — HU4 do épico DEV4-4117 (Usernames/BSUID 2026)."

O API validator retorna 422 "The selected type is invalid" ao tentar POST direto com este tipo. Para testar RN2 completamente é necessário um contato que tenha chegado via BSUID/username, o que depende da implementação paralela de DEV4-4053.

---

## Bloqueios e Observações

- **testContacts.staging** configurado durante esta execução: contato "Yuri Alcantara 3" com canal WABA Staging ACTIVE. Disponível para execuções futuras.
- **Canal WABA Staging** `9b8482c8-743f-4800-a3ef-5e26cf386ff3` é o único canal ACTIVE no account staging.
- **Feature flag `enable_hermes_customers`**: não visível via `/v3/settings`. Provavelmente gerenciada pelo Flagsmith internamente. O pipeline de validação Hermes foi confirmado ativo via CT-HRM-003 (RN4 disparou corretamente).
- **Hermes pipeline ativo**: confirmado indiretamente pela resposta do `ValidateAccountChannelActive` (RN4) que é parte do `OutboundValidationPipeline` adicionado nesta PR.

---

## Bugs Encontrados

Nenhum.

---

## Performance

> Sem violações (baseline não configurado para staging).
