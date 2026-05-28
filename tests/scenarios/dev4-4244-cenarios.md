# Cenários de Teste — DEV4-4244
> Card: Reação a mensagem em chat encerrado abre novo atendimento sem acionar o bot
> Gerado em: 2026-05-28
> Card atualizado em: 2026-05-26T14:56:31.739-0300

---

## BLOCO 1 — Estratégia de Teste

O bug impacta o pipeline de inbound do `polichat-web-app` (via `CloudApiWebHook` → `MessageReceiverController`), especificamente o parsing de payloads recebidos do webhook Meta (WABA/Cloud API). O escopo é cirúrgico: tratar corretamente o tipo de evento `reaction` no ponto de entrada do webhook, diferenciando-o de mensagens de texto antes da criação de registros em `chat_history`. Tipos de teste aplicáveis: **funcional** (tratamento correto do payload de reação), **regressão** (reabertura por mensagem de texto deve permanecer intacta), **integração** (integridade da tabela `chat_history` e status do chat) e **segurança** (bypass via payload forjado). Prioridade de execução: cenários de reabertura indevida por reação primeiro (bloqueia o bug principal), seguidos da regressão de texto e dos casos de borda. Risco principal: a correção pode inadvertidamente quebrar o fluxo legítimo de reabertura por mensagem de texto, que usa o mesmo pipeline de `MessageReceiverController`.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade | Impacto | Prioridade |
|---|---|---|---|
| Reação reabre chat encerrado sem acionar bot (bug principal) | A | A | 🔴 Alta |
| Registro inválido inserido em `chat_history` por evento de reação | A | A | 🔴 Alta |
| Mensagem de texto enviada após reação não é processada pelo bot ("envenenamento de estado") | A | A | 🔴 Alta |
| Fix quebra o fluxo de reabertura legítima por mensagem de texto (regressão) | M | A | 🔴 Alta |
| Payload forjado com `type="text"` + campo `reaction` contorna a validação | M | A | 🔴 Alta |
| Race condition entre reação e mensagem de texto simultâneas gera duplicidade em `chat_history` | B | M | 🟡 Média |
| Payload de reação com campo `type` ausente ou malformado causa erro não tratado no webhook | M | M | 🟡 Média |
| Múltiplas reações consecutivas acumulam registros indevidos em `chat_history` | M | M | 🟡 Média |

---

## BLOCO 3 — Tabela de Cenários

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-WEBHOOK-001 | Reação em chat encerrado não reabre o atendimento | Chat com status `resolved` existente para o contato de teste; acesso ao endpoint `POST /api/webhook/wabaoficial/{uid}`; payload de reação Meta no formato `{"type": "reaction", "reaction": {"emoji": "👍", "message_id": "..."}}`  ⚠️ Bloqueável — chat resolvido criável via API: `PATCH /api/spa/chats/{uuid}/resolve` | 1. Enviar payload de reação via `POST /api/webhook/wabaoficial/{uid}` para o número do contato com chat encerrado. 2. Consultar o status do chat via `GET /api/spa/chats/{uuid}`. 3. Verificar registros em `chat_history` para o contato. | Chat permanece em status `resolved`; nenhum novo registro criado em `chat_history`; webhook responde HTTP 200. | 🔴 Alta | API | — |
| CT-WEBHOOK-002 | Reabertura por mensagem de texto continua funcionando (regressão) | Chat com status `resolved` existente; payload de mensagem de texto Meta no formato `{"type": "text", "text": {"body": "Olá"}}` | 1. Enviar payload de mensagem de texto (`type: "text"`) via `POST /api/webhook/wabaoficial/{uid}`. 2. Aguardar processamento. 3. Consultar status do chat. 4. Verificar se nova mensagem com `direction: OUT` foi registrada (resposta do bot). | Chat é reaberto (novo registro em `chat_history`); status muda de `resolved` para `bot` ou `waiting`; bot é acionado e registra resposta (`direction: OUT`). | 🔴 Alta | API | — |
| CT-WEBHOOK-003 | Reação seguida de mensagem de texto — bot processa apenas o texto | Chat com status `resolved` existente. | 1. Enviar payload de reação (`type: "reaction"`) via webhook. 2. Aguardar confirmação de processamento (HTTP 200). 3. Enviar payload de mensagem de texto (`type: "text"`) via webhook. 4. Verificar status do chat, registros em `chat_history` e resposta do bot. | Nenhum registro em `chat_history` atribuído ao evento de reação; ao menos um registro criado pela mensagem de texto; chat reaberto pela mensagem de texto; bot acionado e responde (nova mensagem `direction: OUT` registrada). | 🔴 Alta | API | CT-WEBHOOK-001 |
| CT-WEBHOOK-004 | Múltiplas reações consecutivas não geram registros indevidos | Chat com status `resolved` existente. | 1. Enviar 3 payloads de reação distintos (emojis: 👍, ❤️, 😂) em sequência, com intervalo suficiente para processamento individual. 2. Consultar `chat_history` e status do chat após cada envio. | Chat permanece `resolved` após as 3 reações; nenhum registro indevido inserido em `chat_history`; webhook responde HTTP 200 em todos os envios. | 🟡 Média | API | CT-WEBHOOK-001 |
| CT-WEBHOOK-005 | Payload de reação com campo `type` ausente não gera registro indevido | Chat com status `resolved` existente; payload de reação com campo `type` omitido: `{"reaction": {"emoji": "👍", "message_id": "..."}}` — requer conhecimento do schema da Meta; consulte a [documentação de payloads da Meta Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/components) para montar o payload sem o campo `type`. | 1. Enviar payload de reação com campo `type` omitido via `POST /api/webhook/wabaoficial/{uid}`. 2. Consultar `chat_history` e status do chat. | Nenhum registro indevido inserido em `chat_history`; chat permanece `resolved`; webhook responde sem erro 500 (HTTP 200 ou 400 com mensagem de erro tratada). | 🟡 Média | API | — |
| CT-WEBHOOK-006 | Payload forjado com `type="text"` e campo `reaction` presente não reabre o chat (segurança) | Chat com status `resolved` existente; payload forjado no formato: `{"type": "text", "text": {"body": ""}, "reaction": {"emoji": "👍", "message_id": "..."}}` — consulte a documentação da Meta Cloud API para o schema correto dos campos. | 1. Construir payload com campo `reaction.emoji` preenchido e campo `type` alterado para `"text"`. 2. Enviar via `POST /api/webhook/wabaoficial/{uid}`. 3. Consultar status do chat e `chat_history`. | Chat permanece `resolved`; nenhum registro indevido em `chat_history`; webhook responde HTTP 200. O sistema não deve ser enganado pela manipulação do campo `type`. | 🔴 Alta | API | — |
| CT-WEBHOOK-007 | Reação em chat encerrado há mais de 24h não reabre (borda) | Chat com status `resolved` e `resolved_at` superior a 24 horas (borda da janela receptiva da Meta). ⚠️ Nota: o comportamento esperado é o mesmo do CT-WEBHOOK-001 — o card não define diferença de tratamento por janela de tempo para eventos de reação. Confirmar com o time se a janela receptiva de 24h afeta o processamento de `reaction`. | 1. Enviar payload de reação via webhook para contato com chat encerrado há mais de 24h. 2. Consultar status do chat e `chat_history`. | Chat permanece `resolved`; nenhum registro indevido em `chat_history`; comportamento idêntico ao CT-WEBHOOK-001. | 🟢 Baixa | API | CT-WEBHOOK-001 |
| CT-WEBHOOK-008 | Concorrência: reação e mensagem de texto enviadas simultaneamente — sem duplicidade em `chat_history` | Chat com status `resolved` existente; capacidade de enviar duas requisições HTTP com mínimo intervalo. ⚠️ Nota: verificar com o time se há mecanismo de deduplicação (ex: Redis lock) que já proteja este cenário. | 1. Enviar payload de reação e payload de mensagem de texto via webhook com o menor intervalo possível (exercitar processamento concorrente). 2. Consultar `chat_history` e status do chat após ambos os processamentos. 3. Verificar quantidade de registros criados. | Nenhum registro em `chat_history` atribuído ao evento de reação; chat reaberto apenas uma vez (pelo texto); bot responde normalmente à mensagem de texto; sem duplicidade de registros. | 🟡 Média | API | CT-WEBHOOK-002 |
| CT-WEBHOOK-009 | Reação em chat no status `attending` não altera o status (borda) | Chat com status `attending` existente (chat em atendimento ativo). ⚠️ Bloqueável — comportamento esperado não está explicitamente definido no card; confirmar com o time de produto/desenvolvimento antes de executar. | 1. Enviar payload de reação (`type: "reaction"`) via webhook para contato com chat em status `attending`. 2. Consultar status do chat e `chat_history`. | Status do chat não é alterado; chat permanece em `attending`; nenhum registro indevido criado em `chat_history`. ⚠️ Resultado esperado a confirmar com produto — o card documenta apenas o comportamento para chats `resolved`. | 🟡 Média | API | — |
| CT-WEBHOOK-010 | Reação em chat no status `waiting` não altera o status (borda) | Chat com status `waiting` existente (chat na fila de espera). ⚠️ Bloqueável — comportamento esperado não está explicitamente definido no card; confirmar com o time de produto/desenvolvimento antes de executar. | 1. Enviar payload de reação (`type: "reaction"`) via webhook para contato com chat em status `waiting`. 2. Consultar status do chat e `chat_history`. | Status do chat não é alterado; chat permanece em `waiting`; nenhum registro indevido criado em `chat_history`. ⚠️ Resultado esperado a confirmar com produto — o card documenta apenas o comportamento para chats `resolved`. | 🟢 Baixa | API | — |

---

## BLOCO 4 — Gherkin (BDD)

Os dois cenários 🔴 Alta mais relacionados ao bug/feature principal:

```gherkin
# CT-WEBHOOK-001 — Critério de Aceite 1 e 5
Funcionalidade: Tratamento de eventos de reação do WhatsApp no webhook de entrada

  Cenário: Reação a mensagem não reabre chat encerrado
    Dado que existe um chat com status "resolved" para o contato de teste
    E que o atendimento foi encerrado pela plataforma via PATCH /api/spa/chats/{uuid}/resolve
    Quando é enviado ao webhook um payload do tipo "reaction" contendo o campo "reaction.emoji"
    Então o webhook responde com HTTP 200
    E o chat permanece com status "resolved"
    E nenhum novo registro é inserido em "chat_history" para este contato
    E o bot não é acionado
```

```gherkin
# CT-WEBHOOK-006 — Segurança: bypass via payload forjado
  Cenário: Payload de reação forjado com type="text" não reabre chat encerrado
    Dado que existe um chat com status "resolved" para o contato de teste
    Quando é enviado ao webhook um payload contendo o campo "reaction.emoji" preenchido
    E o campo "type" do payload está definido como "text" (tentativa de bypass)
    Então o chat permanece com status "resolved"
    E nenhum registro indevido é inserido em "chat_history"
    E o webhook responde com HTTP 200
    E o sistema não processa o evento como mensagem de texto
```

---

## Validação por Agente Crítico Independente

- Aprovados sem alteração: 6 (CT-WEBHOOK-001, CT-WEBHOOK-002, CT-WEBHOOK-003, CT-WEBHOOK-004, CT-WEBHOOK-006, CT-WEBHOOK-008)
- Revisados: 4 (CT-WEBHOOK-005, CT-WEBHOOK-007, CT-WEBHOOK-009, CT-WEBHOOK-010)
  - CT-WEBHOOK-005: adicionada referência à doc da Meta para montagem do payload sem `type`
  - CT-WEBHOOK-007: reclassificado como borda com nota de confirmação de comportamento (janela 24h não documentada no card para reações)
  - CT-WEBHOOK-009: adicionado aviso de comportamento não definido no card; marcado como ⚠️ Bloqueável com confirmação obrigatória
  - CT-WEBHOOK-010: idem CT-WEBHOOK-009
- Adicionados por cobertura insuficiente: 0

---

**Resumo:** 10 cenários — 🔴 3 Alta | 🟡 4 Média | 🟢 3 Baixa | 2 cenários Gherkin
