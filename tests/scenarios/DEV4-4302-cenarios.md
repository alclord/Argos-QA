# Cenários de Teste — DEV4-4302
> Card: Persistir eventos de webhook da Meta Business API no MongoDB
> Gerado em: 2026-06-03
> Card atualizado em: 2026-06-03T10:08:30 (GMT-3)

---

## Resumo do Card

- **Título:** Persistir eventos de webhook da Meta Business API no MongoDB
- **Tipo:** Tarefa
- **Prioridade:** Medium
- **Status:** Preparação para Testes
- **Objetivo:** Garantir que os eventos recebidos via webhooks da Meta Business API que ainda não são armazenados passem a ser persistidos no MongoDB com payload completo, indexados e com proteção contra duplicatas.

**Escopo — Incluído:**
- Receber e persistir payload completo dos 10 eventos listados no MongoDB
- Indexar por: tipo de evento, WABA ID / Business ID, timestamp de recebimento
- Idempotência (mesmo evento recebido duas vezes não gera duplicata)

**Escopo — Não incluído:**
- Processamento ou ações automáticas a partir dos eventos
- Interface ou dashboard para visualização dos eventos persistidos

**Regras de Negócio:**
1. Cada evento deve ser salvo no MongoDB com payload completo
2. O documento deve conter: tipo do evento, payload original, WABA ID / Business ID, timestamp de recebimento
3. Idempotência: evento duplicado não gera segundo registro
4. Resiliência: falha no processamento retorna HTTP 200 para a Meta e loga a falha internamente (nunca 500)

**Critérios de Aceite:**
- Cada um dos 10 eventos é recebido e salvo com payload completo
- Documento inclui: tipo do evento, payload original, WABA ID / Business ID, timestamp de recebimento
- Evento duplicado não gera segundo registro
- Falha no processamento responde 200 para a Meta e loga internamente

**Eventos cobertos:**
`account_update`, `business_capability_update`, `business_status_update`, `flows`, `message_template_components_update`, `message_template_quality_update`, `message_template_status_update`, `phone_number_quality_update`, `template_category_update`, `template_correct_category_detection`

---

## Estratégia de Teste

Card de persistência de eventos de webhook da Meta Business API no MongoDB. O escopo é **exclusivamente backend/API** — não há UI envolvida nesta entrega. Os testes devem cobrir: (1) **funcional** — verificar que cada um dos 10 tipos de evento é salvo com todos os campos obrigatórios; (2) **idempotência** — garantia de não duplicação; (3) **resiliência** — comportamento de retorno HTTP em caso de falha interna; (4) **segurança** — validação de assinatura HMAC da Meta. Prioridade de execução: segurança e happy path primeiro, edge cases por último. Principal risco operacional: uma falha no retorno `200` pode fazer a Meta desativar o webhook da conta.

---

## Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Serviço retorna HTTP 500 em falha interna → Meta desativa o webhook da conta | B | A | 🔴 Alta |
| Idempotência falha por race condition em envios simultâneos | M | A | 🔴 Alta |
| Campos obrigatórios ausentes no documento MongoDB | M | A | 🔴 Alta |
| Um ou mais dos 10 tipos de evento não são capturados pelo handler | M | A | 🔴 Alta |
| Chave de idempotência não documentada impede validação correta | A | M | 🟡 Média |
| Ambiente de staging sem simulador de eventos Meta bloqueia execução | A | M | 🟡 Média |
| Payload com campos opcionais ausentes causa exception não tratada | B | M | 🟡 Média |

---

## Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-WEBHOOK-001 | Persistir `account_update` com payload completo | Endpoint do webhook acessível em staging; WABA ID de teste disponível; secret HMAC configurado | 1. Construir payload `account_update` com `wabaId` e `businessId` válidos<br>2. Assinar com HMAC-SHA256 usando o secret configurado<br>3. Enviar `POST /webhooks/meta` com header `X-Hub-Signature-256`<br>4. Consultar MongoDB pelo identificador do evento | HTTP 200; documento criado contendo: `eventType: "account_update"`, `payload` original completo, `wabaId`, `businessId`, `receivedAt` (timestamp de recebimento) | 🔴 Alta | API | — |
| CT-WEBHOOK-002 | Persistir os demais 9 tipos de evento | CT-WEBHOOK-001 passou; endpoint acessível | Para cada um dos 9 tipos abaixo, executar individualmente:<br>`business_capability_update`, `business_status_update`, `flows`, `message_template_components_update`, `message_template_quality_update`, `message_template_status_update`, `phone_number_quality_update`, `template_category_update`, `template_correct_category_detection`<br><br>Para cada tipo:<br>1. Construir payload válido com `wabaId` e `businessId`<br>2. Assinar e enviar `POST /webhooks/meta`<br>3. Consultar MongoDB e verificar: `eventType` correto, `payload` completo, `wabaId`, `businessId` e `receivedAt` presentes | HTTP 200 para cada envio; documento criado com `eventType` correto e todos os 4 campos obrigatórios preenchidos para cada um dos 9 tipos individualmente | 🔴 Alta | API | CT-WEBHOOK-001 |
| CT-WEBHOOK-003 | Evento duplicado não cria segundo registro | CT-WEBHOOK-001 passou; documento do evento já persistido no MongoDB | 1. Reutilizar exatamente o mesmo payload do CT-WEBHOOK-001 (payload idêntico)<br>2. Enviar novamente `POST /webhooks/meta` com a mesma assinatura<br>3. Contar documentos no MongoDB com a chave identificadora desse evento | HTTP 200 retornado; MongoDB contém exatamente **1** documento para esse evento — não 2 | 🔴 Alta | API | CT-WEBHOOK-001 |
| CT-WEBHOOK-004 | Falha interna responde 200 e loga o erro | Endpoint acessível; ⚠️ Bloqueável — requer acordo com o time de dev para disponibilizar mecanismo de simulação de falha controlada no ambiente (ex: variável de ambiente `FORCE_PROCESSING_ERROR=true` ou rota dedicada de injeção de falha) | 1. Ativar o mecanismo de simulação de falha acordado com o time de dev<br>2. Enviar `POST /webhooks/meta` com payload e assinatura válidos<br>3. Verificar código HTTP de resposta<br>4. Verificar logs do serviço | HTTP **200** retornado para a Meta (nunca 500 ou 4xx); log de erro com detalhes da exceção registrado internamente | 🔴 Alta | API | — |
| CT-WEBHOOK-005 | Payload JSON malformado não retorna HTTP 500 | Endpoint acessível | 1. Enviar `POST /webhooks/meta` com body inválido (ex: `{"broken":}`)<br>2. Verificar código HTTP de resposta | ⚠️ Resultado esperado a alinhar com o time — o card especifica que nunca deve retornar 500; o código exato para JSON inválido (400 ou 200) não está definido no card. **Critério mínimo:** nunca HTTP 500; serviço permanece estável para requisições subsequentes | 🟡 Média | API | — |
| CT-WEBHOOK-006 | Payload sem WABA ID não derruba o serviço | Endpoint acessível | 1. Construir payload `account_update` omitindo `wabaId` e `businessId`<br>2. Assinar e enviar `POST /webhooks/meta`<br>3. Verificar resposta HTTP | ⚠️ Resultado esperado a definir — o card exige que o documento contenha WABA ID / Business ID; o comportamento para payload sem esse campo não está especificado (pode ser rejeição HTTP 400 ou persistência parcial). **Critério mínimo:** serviço não retorna HTTP 500 nem lança exceção não tratada | 🟢 Baixa | API | — |
| CT-WEBHOOK-007 | Dois envios simultâneos não geram duplicata | Endpoint acessível; payload de teste preparado com identificador único | 1. Preparar payload `account_update` com identificador único<br>2. Disparar duas requisições simultâneas (`POST /webhooks/meta`) com o mesmo payload<br>3. Aguardar ambas resolverem<br>4. Contar documentos no MongoDB com o identificador do evento | Ambas retornam HTTP 200; MongoDB contém exatamente **1** documento — idempotência resistente a race condition | 🔴 Alta | API | CT-WEBHOOK-001 |
| CT-WEBHOOK-008 | Requisição sem assinatura HMAC válida é rejeitada | Endpoint acessível | 1. Construir payload válido `account_update`<br>2. Enviar `POST /webhooks/meta` **sem** o header `X-Hub-Signature-256` (ou com assinatura incorreta)<br>3. Verificar resposta HTTP e MongoDB | HTTP 401 ou 403 retornado; **nenhum** documento criado no MongoDB | 🔴 Alta | API | — |

> **Rastreabilidade CT-WEBHOOK-008:** validação de assinatura HMAC-SHA256 via header `X-Hub-Signature-256` é requisito mandatório da Meta para todos os endpoints de webhook (Meta Business API Webhooks — Security / Validating Payloads). Não está explícita no card, mas é um requisito não-negociável da integração.

---

## Cenários Gherkin (BDD)

```gherkin
Cenário: Persistir evento account_update com todos os campos obrigatórios
  Dado que o endpoint de webhook da Meta está acessível no ambiente de staging
  E que existe um WABA ID de teste configurado
  Quando a Meta envia um evento do tipo "account_update" com payload completo e assinatura HMAC válida
  Então o serviço responde HTTP 200
  E o documento é criado no MongoDB contendo: tipo do evento "account_update", payload original, WABA ID, Business ID e timestamp de recebimento
```

```gherkin
Cenário: Falha interna no processamento retorna 200 e não expõe erro para a Meta
  Dado que o endpoint de webhook da Meta está acessível
  E que o mecanismo de simulação de falha interna está ativado no ambiente de staging
  Quando a Meta envia um evento com payload e assinatura válidos
  Então o serviço responde HTTP 200 (nunca 500)
  E o erro é registrado nos logs internos do serviço
  E a Meta não recebe nenhuma indicação de falha
```

---

## Validação por Agente Crítico Independente

✅ Validação por agente crítico concluída:
- Aprovados sem alteração: 3 (CT-WEBHOOK-001, CT-WEBHOOK-003, CT-WEBHOOK-007)
- Revisados: 5 (CT-WEBHOOK-002, CT-WEBHOOK-004, CT-WEBHOOK-005, CT-WEBHOOK-006, CT-WEBHOOK-008)
- Adicionados por cobertura insuficiente: 0

---

**Resumo:** 8 cenários — 🔴 5 Alta | 🟡 1 Média | 🟢 1 Baixa + 2 cenários Gherkin
