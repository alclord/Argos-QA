# Cenários de Teste — dev4-4244
> Card: Reação a mensagem em chat encerrado abre novo atendimento sem acionar o bot
> Gerado em: 2026-05-26
> Card atualizado em: 2026-05-26T11:30:25-03:00

---

## Estratégia de Teste

O bug impacta o pipeline de inbound do `polichat-web-app`, especificamente o parsing de payloads do webhook Meta (WABA/Cloud API). O escopo é cirúrgico: tratar corretamente o tipo de evento `reaction` no ponto de entrada do webhook. Tipos de teste aplicáveis: **funcional** (tratamento do payload), **regressão** (reabertura por texto deve permanecer intacta), **integração** (integridade da tabela `chat_history`) e **segurança** (tentativa de bypass via payload forjado). Prioridade de execução: testes de reabertura indevida por reação primeiro, seguidos da regressão de texto e dos casos de borda. Risco principal: a correção pode inadvertidamente quebrar o fluxo legítimo de reabertura por mensagem de texto, que usa o mesmo pipeline.

---

## Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Reação reabre chat encerrado sem acionar bot (bug principal) | A | A | 🔴 Alta |
| Registro inválido inserido em `chat_history` por evento de reação | A | A | 🔴 Alta |
| Mensagem de texto após reação não é processada pelo bot ("envenenamento") | A | A | 🔴 Alta |
| Fix quebra o fluxo de reabertura legítima por mensagem de texto | M | A | 🔴 Alta |
| Reação em chat ativo (`attending`/`waiting`) cria comportamento inesperado | M | M | 🟡 Média |
| Race condition entre reação e mensagem de texto simultâneas gera duplicidade em `chat_history` | B | M | 🟡 Média |
| Payload de reação com campo `type` ausente/malformado causa erro não tratado no webhook | M | M | 🟡 Média |

---

## Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-WEBHOOK-001 | Reação em chat encerrado não reabre | Chat com status `resolved` existente no ambiente; número de teste com histórico de mensagem enviada pela plataforma. ⚠️ Bloqueável — criável via API: `PATCH /api/spa/chats/{uuid}/resolve` | 1. Enviar payload de reação (`type: "reaction"`, campo `reaction.emoji` preenchido) via `POST /api/webhook/wabaoficial/{uid}` para o número do chat encerrado. 2. Consultar o status do chat via `GET /api/spa/chats/{uuid}`. 3. Verificar registros em `chat_history` para o contato. | Chat permanece em status `resolved`; nenhum novo registro criado em `chat_history`; webhook responde HTTP 200. | 🔴 Alta | API | — |
| CT-WEBHOOK-002 | Reabertura por texto continua funcionando | Chat com status `resolved` existente. | 1. Enviar payload de mensagem de texto (`type: "text"`) via `POST /api/webhook/wabaoficial/{uid}`. 2. Consultar status do chat. 3. Verificar se o bot respondeu (nova mensagem `direction: OUT` registrada). | Chat reabre (novo registro em `chat_history`); status muda de `resolved` para `bot` ou `waiting`; bot é acionado e responde. | 🔴 Alta | API | — |
| CT-WEBHOOK-003 | Reação seguida de texto — bot processa texto | Chat com status `resolved` existente. | 1. Enviar payload de reação via webhook. 2. Aguardar processamento do webhook antes de enviar o próximo payload. 3. Enviar payload de mensagem de texto (`type: "text"`) via webhook. 4. Verificar status do chat e resposta do bot. | Nenhum registro em `chat_history` atribuído ao evento de reação; ao menos um registro gerado pela mensagem de texto; bot acionado após o texto e responde (nova mensagem `direction: OUT` registrada). | 🔴 Alta | API | CT-WEBHOOK-001 |
| CT-WEBHOOK-004 | Múltiplas reações não reabrem o chat | Chat com status `resolved` existente. | 1. Enviar 3 payloads de reação distintos (emojis diferentes: 👍, ❤️, 😂) em sequência, com intervalo suficiente para processamento individual de cada payload. 2. Consultar `chat_history` e status do chat após cada envio. | Chat permanece `resolved` após as 3 reações; nenhum registro indevido inserido em `chat_history`; webhook responde HTTP 200 em todos. | 🟡 Média | API | CT-WEBHOOK-001 |
| CT-WEBHOOK-005 | Payload com `type` ausente — sem registro indevido | Acesso ao endpoint de webhook; chat `resolved` existente. | 1. Enviar payload de reação com campo `type` omitido do JSON via `POST /api/webhook/wabaoficial/{uid}`. 2. Consultar `chat_history` e status do chat. | Nenhum registro inserido em `chat_history`; chat permanece `resolved`. | 🟡 Média | API | — |
| CT-WEBHOOK-005b | Payload com `type: null` — sem registro indevido | Acesso ao endpoint de webhook; chat `resolved` existente. | 1. Enviar payload de reação com campo `type` definido como `null` via `POST /api/webhook/wabaoficial/{uid}`. 2. Consultar `chat_history` e status do chat. | Nenhum registro inserido em `chat_history`; chat permanece `resolved`. | 🟡 Média | API | — |
| CT-WEBHOOK-006 | Reação em chat encerrado há mais de 24h | Chat com status `resolved` e `resolved_at` superior a 24 horas. | 1. Enviar payload de reação via webhook para contato com chat encerrado há mais de 24h. 2. Consultar status do chat e `chat_history`. | Chat permanece `resolved`; nenhum registro indevido em `chat_history`; comportamento idêntico ao CT-WEBHOOK-001. | 🟢 Baixa | API | CT-WEBHOOK-001 |
| CT-WEBHOOK-007 | Reação e texto simultâneos — sem duplicidade | Chat `resolved` existente. | 1. Enviar payload de reação e payload de mensagem de texto via webhook com o menor intervalo possível, para exercitar processamento concorrente. 2. Consultar `chat_history`. 3. Verificar quantidade de registros e status do chat. | Nenhum registro em `chat_history` atribuído ao evento de reação; chat não é reaberto mais de uma vez; bot responde normalmente à mensagem de texto. | 🟡 Média | API | CT-WEBHOOK-002 |
| CT-WEBHOOK-008 | Payload forjado com `type="text"` para bypass | Acesso ao endpoint de webhook; chat `resolved`. | 1. Construir payload de reação (campo `reaction.emoji` presente) mas com campo `type` alterado para `"text"`. 2. Enviar via `POST /api/webhook/wabaoficial/{uid}`. 3. Consultar status do chat e `chat_history`. | Chat permanece `resolved`; nenhum registro indevido em `chat_history`; webhook responde HTTP 200. | 🔴 Alta | API | — |
| CT-WEBHOOK-009 | Reabertura por reação aciona bot (estratégia configurada) | Configuração da conta definida para reabrir chat ao receber reação (verificar com o time de desenvolvimento se esta flag existe no ambiente); chat `resolved` existente. ⚠️ Bloqueável — dependente de configuração de estratégia a ser validada com o time. | 1. Verificar que a configuração de reabertura por reação está ativa para a conta de teste. 2. Enviar payload de reação via `POST /api/webhook/wabaoficial/{uid}` para número com chat encerrado. 3. Consultar status do chat. 4. Verificar se o bot respondeu. | Chat reabre (novo registro em `chat_history`); bot é acionado e responde (nova mensagem `direction: OUT` registrada). | 🟡 Média | API | — |

---

## Cenários Gherkin (BDD)

```gherkin
Cenário: Reação a mensagem não reabre chat encerrado
  Dado que existe um chat com status "resolved" para o contato de teste
  E que o atendimento foi encerrado pela plataforma
  Quando o cliente reage a uma mensagem no WhatsApp (envia payload tipo "reaction")
  Então o webhook responde com HTTP 200
  E o chat permanece com status "resolved"
  E nenhum novo registro é inserido em "chat_history" para este contato
```

```gherkin
Cenário: Payload de reação forjado com type="text" não reabre chat encerrado
  Dado que existe um chat com status "resolved" para o contato de teste
  Quando é enviado ao webhook um payload contendo o campo "reaction.emoji"
  E o campo "type" do payload está definido como "text"
  Então o chat permanece com status "resolved"
  E nenhum registro indevido é inserido em "chat_history"
  E o webhook responde com HTTP 200
```

---

## Validação por Agente Crítico

✅ Validação por agente crítico concluída:
- Aprovados sem alteração: 2 (CT-WEBHOOK-001, CT-WEBHOOK-002)
- Revisados: 6 (CT-WEBHOOK-003, CT-WEBHOOK-004, CT-WEBHOOK-005, CT-WEBHOOK-006, CT-WEBHOOK-007, CT-WEBHOOK-008)
- Adicionados por cobertura insuficiente: 2 (CT-WEBHOOK-005b, CT-WEBHOOK-009)

---

**Resumo:** 10 cenários — 🔴 4 Alta | 🟡 5 Média | 🟢 1 Baixa | 2 cenários Gherkin
