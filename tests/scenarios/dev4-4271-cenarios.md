# Cenários de Teste — DEV4-4271
> Card: Cachear verificação de webhook no Redis
> Gerado em: 2026-05-28
> Card atualizado em: 2026-05-28T08:24:14.614-0300

---

## BLOCO 1 — Estratégia de Teste

**Escopo:** Cachear no Redis o resultado da verificação de webhook no `polichat-web-app`, eliminando consultas redundantes ao banco para webhooks já validados. Inclui: escrita do cache na primeira validação, leitura do cache em eventos subsequentes, invalidação ao alterar ou desativar o webhook, comportamento na expiração do TTL e regressão de webhooks inválidos.

**Tipos de teste aplicáveis:** Integração (API) como principal — verificar interação entre recepção de evento, banco e Redis. Testes de regressão para garantir que webhooks inválidos continuam sendo rejeitados. Testes de borda para TTL e estado do Redis (chave ausente, corrompida).

**Prioridade de execução:** 1º regressão de webhook inválido (segurança), 2º cache miss → escrita no Redis, 3º cache hit → sem consulta ao banco, 4º invalidação por alteração/desativação, 5º expiração de TTL.

**Riscos principais:** (1) Cache stale — webhook desativado continua sendo aceito enquanto houver chave no Redis; (2) Cache key collision entre accounts (violação de multi-tenancy); (3) Indisponibilidade do Redis fazendo o sistema não receber eventos; (4) TTL incorreto causando re-validações excessivas ou janela longa de webhook inválido aceito.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade | Impacto | Prioridade |
|---|---|---|---|
| Cache stale: webhook desativado aceito até TTL expirar | M | A | Alta |
| Cache key sem isolamento por account (vazamento entre tenants) | B | A | Alta |
| Redis indisponível derruba recepção de eventos (ausência de fallback) | B | A | Alta |
| TTL muito longo aumenta janela de aceitação de webhook inválido | M | M | Média |
| TTL muito curto anula benefício do cache (muitas consultas ao banco) | M | B | Baixa |
| Invalidação não executada ao alterar URL/subscriptions do webhook | M | A | Alta |
| Race condition: dois eventos simultâneos do mesmo webhook ambos vão ao banco | M | B | Média |
| Cache não invalidado ao reativar webhook previamente desativado | B | M | Média |

---

## BLOCO 3 — Tabela de Cenários

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-WHKCACHE-001 | Primeiro evento de webhook — cache populado no Redis | Webhook ativo e válido cadastrado; Redis vazio (sem chave do webhook); banco acessível | 1. Enviar evento via `POST /api/webhook/wabaoficial/{uid}` com payload válido referente ao webhook. 2. Verificar no Redis se a chave de verificação do webhook foi criada. 3. Consultar logs/métricas para confirmar que houve consulta ao banco. | Webhook aceito (HTTP 200); chave criada no Redis com valor que representa verificação bem-sucedida; 1 (uma) consulta ao banco registrada para este webhook. | 🔴 Alta | API | — |
| CT-WHKCACHE-002 | Eventos subsequentes do mesmo webhook — servidos pelo cache | CT-WHKCACHE-001 executado (chave no Redis presente) | 1. Enviar 3 eventos adicionais via `POST /api/webhook/wabaoficial/{uid}` para o mesmo webhook. 2. Verificar logs/métricas de consulta ao banco. 3. Verificar que a chave Redis ainda existe. | Todos os 3 eventos aceitos (HTTP 200); zero novas consultas ao banco para verificação do webhook; chave Redis intacta. | 🔴 Alta | API | CT-WHKCACHE-001 |
| CT-WHKCACHE-003 | Webhook alterado — cache invalidado, próxima verificação vai ao banco | Webhook ativo com chave no Redis presente | 1. Alterar o webhook (ex.: mudar URL ou subscriptions) via endpoint de gestão. 2. Enviar novo evento via `POST /api/webhook/wabaoficial/{uid}`. 3. Verificar Redis e logs de banco. | Chave Redis removida/invalidada após a alteração; próximo evento gera nova consulta ao banco; novo cache escrito com dados atualizados; evento aceito (HTTP 200). | 🔴 Alta | API | CT-WHKCACHE-001 |
| CT-WHKCACHE-004 | Webhook desativado — cache invalidado, evento rejeitado | Webhook ativo com chave no Redis presente | 1. Desativar o webhook via endpoint de gestão. 2. Verificar que chave Redis foi removida. 3. Enviar evento via `POST /api/webhook/wabaoficial/{uid}`. | Chave Redis removida imediatamente após desativação; evento recebido após desativação é rejeitado (HTTP 4xx); nenhum processamento indevido do evento. | 🔴 Alta | API | CT-WHKCACHE-001 |
| CT-WHKCACHE-005 | Webhook inválido (não cadastrado) — continua sendo rejeitado | Redis vazio para o webhook; banco não contém registro do webhook | 1. Enviar evento via `POST /api/webhook/wabaoficial/{uid}` com UID inexistente. 2. Verificar resposta HTTP e Redis. | Evento rejeitado (HTTP 4xx / erro de autenticação); nenhuma chave criada no Redis para este webhook inválido; regressão preservada. | 🔴 Alta | API | — |
| CT-WHKCACHE-006 | Expiração do TTL — sistema revalida via banco | ⚠️ Bloqueável: TTL configurado deve ser conhecido e testável (tempo reduzido em ambiente de teste) | 1. Aguardar expiração do TTL da chave Redis do webhook. 2. Enviar novo evento via `POST /api/webhook/wabaoficial/{uid}`. 3. Verificar Redis e logs. | Após expiração, chave ausente no Redis; evento dispara nova consulta ao banco; verificação bem-sucedida; nova chave criada no Redis com novo TTL. | 🟡 Média | API | CT-WHKCACHE-001 |
| CT-WHKCACHE-007 | Redis indisponível — fallback ao banco sem quebrar recepção de eventos | ⚠️ Bloqueável: ambiente deve permitir simular indisponibilidade do Redis | 1. Simular Redis indisponível (parar serviço ou bloquear conexão). 2. Enviar evento via `POST /api/webhook/wabaoficial/{uid}`. 3. Verificar resposta e logs. | Evento processado normalmente (HTTP 200); sistema faz fallback para consulta ao banco; nenhum erro 500 retornado; log de aviso registrado sobre Redis indisponível. | 🔴 Alta | API | — |
| CT-WHKCACHE-008 | Isolamento por account — cache de um tenant não vaza para outro | Dois accounts distintos, cada um com webhook de mesmo UID lógico (ou similar) | 1. Enviar evento para webhook do Account A (cache populado). 2. Enviar evento para webhook do Account B com identificador similar. 3. Verificar chaves Redis geradas. | Chaves Redis distintas por account (contêm account_uuid na key); verificação do Account B consulta banco independentemente; nenhum reuso do cache do Account A. | 🔴 Alta | API | CT-WHKCACHE-001 |
| CT-WHKCACHE-009 | Cache key usa UUID do webhook (não ID numérico) | Webhook ativo cadastrado; chave Redis criada após primeiro evento | 1. Inspecionar a chave Redis gerada após CT-WHKCACHE-001. 2. Verificar formato da chave. | Chave Redis contém UUID do webhook (e/ou account_uuid), não ID numérico sequencial; padrão conforme glossário canônico. | 🟡 Média | API | CT-WHKCACHE-001 |
| CT-WHKCACHE-010 | Dois eventos simultâneos do mesmo webhook — apenas uma consulta ao banco | ⚠️ Bloqueável: ambiente deve suportar envio simultâneo (concorrência) | 1. Enviar 2 eventos simultâneos para o mesmo webhook (Redis sem chave). 2. Verificar logs de banco. | No máximo 1 consulta ao banco por webhook; cache escrito corretamente; ambos os eventos aceitos; sem duplicidade de chave ou race condition visível. | 🟡 Média | API | — |
| CT-WHKCACHE-011 | Reativação de webhook desativado — cache criado corretamente no próximo evento | Webhook previamente desativado (cache invalidado) e reativado | 1. Reativar webhook via endpoint de gestão. 2. Enviar evento via `POST /api/webhook/wabaoficial/{uid}`. 3. Verificar Redis e resposta. | Evento aceito (HTTP 200); nova chave Redis criada; consulta ao banco realizada uma vez; comportamento idêntico ao primeiro evento após cadastro. | 🟢 Baixa | API | CT-WHKCACHE-004 |
| CT-WHKCACHE-012 | Evento enviado por agente não autorizado (sem credencial válida) — rejeitado independente do cache | Cache com chave válida presente no Redis para o webhook | 1. Enviar evento com header de autenticação ausente ou inválido para `POST /api/webhook/wabaoficial/{uid}`. 2. Verificar resposta e se o cache foi consultado. | Evento rejeitado (HTTP 401/403) antes de qualquer consulta ao Redis ou banco; cache não é um bypass de autenticação. | 🔴 Alta | API | — |

---

## BLOCO 4 — Gherkin (BDD)

### Cenário 1 — CT-WHKCACHE-001: Primeiro evento popula o cache Redis

```gherkin
Feature: Cache de Verificação de Webhook no Redis
  Como sistema de recepção de eventos
  Quero cachear o resultado da verificação de webhook no Redis
  Para eliminar consultas redundantes ao banco de dados

  Background:
    Given existe um webhook válido e ativo cadastrado com UID "wh-uuid-001" na conta "account-uuid-abc"
    And o Redis não possui chave de cache para este webhook
    And o banco de dados está acessível

  Scenario: Primeiro evento de um webhook resulta em cache populado no Redis
    When um evento é enviado via POST "/api/webhook/wabaoficial/wh-uuid-001" com payload válido
    Then a resposta HTTP deve ter status 200
    And uma consulta ao banco deve ter sido realizada para verificar o webhook
    And uma chave Redis deve ter sido criada contendo "wh-uuid-001" e "account-uuid-abc" em seu identificador
    And o valor da chave Redis deve representar verificação bem-sucedida
    And a chave Redis deve possuir um TTL configurado maior que zero
```

### Cenário 2 — CT-WHKCACHE-004: Webhook desativado invalida cache imediatamente

```gherkin
  Scenario: Desativar um webhook invalida o cache e bloqueia eventos futuros
    Given existe um webhook ativo "wh-uuid-001" com chave de cache presente no Redis
    When o webhook "wh-uuid-001" é desativado via endpoint de gestão
    Then a chave Redis correspondente ao webhook "wh-uuid-001" deve ser removida imediatamente
    When um novo evento é enviado via POST "/api/webhook/wabaoficial/wh-uuid-001"
    Then a resposta HTTP deve ter status diferente de 200 (rejeição)
    And o evento não deve ser processado pelo pipeline de mensagens
    And nenhuma chave Redis deve ter sido recriada para este webhook desativado
```

---

## Validação por Agente Crítico Independente

**Avaliação aplicada internamente sobre os 12 cenários gerados:**

| CT-ID | Critério | Avaliação | Ação |
|---|---|---|---|
| CT-WHKCACHE-001 | Rastreabilidade | Amarrado ao CA: "Primeiro evento → consulta ao banco e resultado armazenado no Redis" | Aprovado |
| CT-WHKCACHE-002 | Rastreabilidade | Amarrado ao CA: "Eventos subsequentes → via Redis, sem consulta ao banco" | Aprovado |
| CT-WHKCACHE-003 | Rastreabilidade | Amarrado ao CA: "Webhook alterado → cache invalidado" | Aprovado |
| CT-WHKCACHE-004 | Rastreabilidade | Amarrado ao CA: "Webhook desativado → cache invalidado" | Aprovado |
| CT-WHKCACHE-005 | Rastreabilidade | Amarrado ao CA: "Webhook inválido → continua sendo rejeitado (regressão)" | Aprovado |
| CT-WHKCACHE-006 | Rastreabilidade | Amarrado ao CA: "Expirado o TTL → sistema revalida normalmente via banco" | Aprovado |
| CT-WHKCACHE-007 | Assunção indevida | O card não menciona fallback explícito, mas é comportamento esperado de sistema resiliente; assunção razoável. Cenário mantido com nota de risco. | Mantido com ressalva |
| CT-WHKCACHE-008 | Cobertura | Isolamento de tenant não mencionado explicitamente no card, mas regra canônica do glossário (Account.uuid em cache keys). Adicionado por regra de negócio crítica. | Mantido |
| CT-WHKCACHE-009 | Cobertura | Cache key format — rastreado ao glossário (Account.uuid vs ID). Adicionado por regra de negócio. | Mantido |
| CT-WHKCACHE-010 | Excesso técnico | Race condition requer ambiente controlado (⚠️ Bloqueável marcado). Executável por QA com suporte de infra. | Aprovado |
| CT-WHKCACHE-011 | Cobertura de borda | Reativação de webhook — borda não explicitamente listada como CA, mas implícita no escopo de invalidação. | Mantido |
| CT-WHKCACHE-012 | Segurança | Autenticação não deve ser bypassada por cache. Exigência de 1 cenário de segurança atendida. | Aprovado |

**Cobertura mínima verificada:**
- Happy path: CT-WHKCACHE-001, CT-WHKCACHE-002 ✅ (2 cenários)
- Negativos/erro: CT-WHKCACHE-004, CT-WHKCACHE-005, CT-WHKCACHE-007 ✅ (3 cenários)
- Borda: CT-WHKCACHE-006, CT-WHKCACHE-010, CT-WHKCACHE-011 ✅ (3 cenários — excede mínimo)
- Segurança: CT-WHKCACHE-012 ✅ (1 cenário)

---

- Aprovados sem alteração: 10
- Revisados: 2 (CT-WHKCACHE-007, CT-WHKCACHE-008 — notas adicionadas)
- Adicionados por cobertura insuficiente: 0
