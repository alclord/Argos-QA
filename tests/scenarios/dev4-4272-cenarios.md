# Cenários de Teste — DEV4-4272
> Card: Adicionar retry no consumo de eventos de ack do legado
> Gerado em: 2026-05-28
> Card atualizado em: 2026-05-27T00:00:00 -0300

---

## Resumo do Card

- **Tipo:** História
- **Prioridade:** Medium
- **Status:** Aguardando Cenários de Teste
- **Objetivo:** Atualmente, quando o consumer do polichat-web-app (Laravel 8) falha ao processar um evento de ack da fila, o evento é descartado sem retentativa e o status do ACK nunca é atualizado. A correção deve adicionar mecanismo de retry com requeue, limite máximo de tentativas configurável, roteamento para DLQ ao exceder o limite e log por tentativa para rastreabilidade.

---

## BLOCO 1 — Estratégia de Teste

O escopo cobre o mecanismo de retry no consumer de eventos de ack do polichat-web-app (Laravel 8): requeue após falha, limite máximo de tentativas, roteamento para DLQ ao exceder o limite e logging por tentativa. Tipos de teste aplicáveis: **funcional** (retry recupera processamento, DLQ ao esgotar tentativas), **regressão** (proteção de ordem do ack: RN8), **observabilidade** (logs por tentativa), **borda** (payload inválido, sucesso sem requeue acidental) e **segurança** (dados sensíveis fora dos logs). Prioridade de execução: CT-RETRY-001, CT-RETRY-002 e CT-RETRY-003 primeiro — validam o fluxo completo do retry. CT-RETRY-006 é crítico por risco de regressão na RN8 (proteção de ordem de ack). Risco principal: a proteção de ordem (ack=N só atualiza se N > ack_salvo) pode ser contornada se um evento reenfileirado com ack inferior for reprocessado após requeue; e a configuração de N max retries não ter sido validada com o time antes da execução.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Evento de ack atrasado (requeue) sobrescreve ack mais recente já persistido — quebra RN8 | M | A | 🔴 Alta |
| Payload inválido causa loop infinito de retries sem atingir o limite máximo | B | A | 🔴 Alta |
| Consumer não roteia para DLQ ao esgotar tentativas — evento é descartado silenciosamente | B | A | 🔴 Alta |
| Log de retry expõe conteúdo sensível do payload (tokens, dados de contato) | B | A | 🟡 Média |
| Sucesso na primeira tentativa ainda dispara requeue acidental | B | M | 🟡 Média |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-RETRY-001 | Evento processado com sucesso sem retry | Consumer do polichat-web-app ativo em staging; evento de ack válido publicado na fila (via script de teste ou ferramenta de publicação de mensagens); banco de dados acessível | 1. Publicar um evento de ack válido na fila de processamento. 2. Aguardar o consumer processar o evento. 3. Verificar o status do ack no banco de dados. 4. Verificar os logs do consumer. | O evento é processado na primeira tentativa. O ack é atualizado corretamente no banco. Nenhuma tentativa de requeue é registrada. O log indica processamento bem-sucedido sem retry. | 🔴 Alta | API | — |
| CT-RETRY-002 | Retry após falha transitória recupera processamento | Consumer ativo em staging; dependência do consumer configurada para falhar apenas na primeira tentativa e recuperar nas seguintes — ⚠️ Bloqueável — mecanismo de indução de falha a confirmar com o time de dev (opções: mock da dependência via variável de ambiente em staging, ou handler de teste que lança exceção controlada na primeira invocação e retorna sucesso nas subsequentes) | 1. Configurar a dependência para falhar apenas na primeira tentativa. 2. Publicar um evento de ack válido na fila. 3. Aguardar o consumer processar (primeira tentativa falha). 4. Verificar se o evento retornou à fila (requeue). 5. Aguardar o consumer processar novamente (segunda tentativa). 6. Verificar o banco de dados e os logs. | Na primeira tentativa: falha, evento reenfileirado (nack com requeue), log registra falha com número da tentativa e motivo. Na segunda tentativa: sucesso, ack atualizado corretamente no banco, nenhuma terceira tentativa disparada. | 🔴 Alta | API | CT-RETRY-001 |
| CT-RETRY-003 | Esgotamento de tentativas envia para DLQ | Consumer ativo; dependência configurada para falhar em todas as tentativas até o limite máximo — ⚠️ Bloqueável — (1) confirmar com time de dev o mecanismo de indução de falha persistente (ex: mock que sempre lança exceção); (2) confirmar se DLQ é uma fila separada ou registro em log/tabela — o resultado esperado varia conforme implementação; (3) confirmar o valor de N (limite máximo de tentativas) antes da execução | 1. Configurar a dependência para falhar em 100% das tentativas. 2. Publicar um evento de ack válido na fila. 3. Aguardar o consumer tentar N vezes (N = limite máximo configurado). 4. Verificar o destino do evento após o esgotamento das tentativas. 5. Verificar os logs. | Após N tentativas malsucedidas, o evento não é mais reenfileirado. O evento é roteado para a DLQ (ou registrado conforme implementação confirmada com o dev). O log registra todas as N tentativas com os motivos de falha. Nenhuma N+1ª tentativa ocorre. | 🔴 Alta | API | CT-RETRY-001 |
| CT-RETRY-004 | Payload inválido não cria loop infinito | Consumer ativo; evento com payload malformado (ex: JSON inválido, campos obrigatórios ausentes) publicado na fila | 1. Publicar um evento com payload inválido na fila. 2. Aguardar o consumer processar. 3. Monitorar o comportamento do consumer por um período igual a N tentativas × intervalo de polling. 4. Verificar logs e destino final do evento. | O consumer não entra em loop infinito. Após N tentativas (ou imediatamente, se o payload inválido for detectado como erro não-retriável), o evento é roteado para a DLQ sem mais retries. O ack no banco de dados permanece inalterado. | 🔴 Alta | API | CT-RETRY-001 |
| CT-RETRY-005 | Sucesso não aciona requeue acidental | Consumer ativo em staging; evento de ack válido publicado na fila | 1. Publicar um evento de ack válido na fila. 2. Aguardar o consumer processar com sucesso na primeira tentativa. 3. Monitorar a fila por um período igual a 2× o intervalo de polling do consumer (confirmar valor exato com o time de dev). 4. Verificar se algum requeue foi disparado. | O evento é processado com sucesso e removido da fila definitivamente. Nenhum requeue é disparado após o processamento bem-sucedido. A fila não recebe o mesmo evento novamente. | 🟡 Média | API | CT-RETRY-001 |
| CT-RETRY-006 | Ack inferior não sobrescreve ack superior | Banco de dados com mensagem X registrada com ack_salvo = 3; consumer ativo em staging | 1. Confirmar que a mensagem X possui ack_salvo = 3 no banco de dados. 2. Publicar um evento de ack = 2 para a mensagem X na fila (simulando evento atrasado ou reenfileirado). 3. Aguardar o consumer processar o evento. 4. Verificar o valor de ack_salvo no banco após o processamento. | O ack_salvo da mensagem X permanece igual a 3. O evento de ack = 2 não atualiza nenhum registro. O consumer não retorna erro — o descarte silencioso do ack inferior é o comportamento esperado (RN8). | 🔴 Alta | API | CT-RETRY-001 |
| CT-RETRY-007 | Ack superior atualiza corretamente | Banco de dados com mensagem Y registrada com ack_salvo = 1; consumer ativo em staging | 1. Confirmar que a mensagem Y possui ack_salvo = 1 no banco de dados. 2. Publicar um evento de ack = 4 para a mensagem Y na fila. 3. Aguardar o consumer processar o evento. 4. Verificar o valor de ack_salvo no banco após o processamento. | O ack_salvo da mensagem Y é atualizado para 4. O processamento é concluído sem erro. (RN8: atualiza porque 4 > 1.) | 🟡 Média | API | CT-RETRY-001 |
| CT-RETRY-008 | Log registra tentativa e motivo de cada retry | Consumer ativo; dependência configurada para falhar nas primeiras tentativas — ⚠️ Bloqueável — confirmar mecanismo de indução de falha com o time de dev (mesmo mecanismo do CT-RETRY-002); acesso ao sistema de logs (ex: arquivo de log, Kibana ou equivalente) | 1. Configurar a dependência para falhar nas primeiras tentativas. 2. Publicar um evento de ack válido na fila. 3. Aguardar o consumer executar ao menos 2 tentativas com falha. 4. Consultar o sistema de logs. | O log contém ao menos 2 entradas de falha. Cada entrada identifica o mesmo evento (por ID ou correlationId) e registra o número da tentativa e o motivo da falha. Não é necessário que as entradas apareçam em ordem cronológica — o critério de aprovação é que todas as tentativas estejam registradas e identificáveis pelo ID/correlationId do evento. | 🟡 Média | API | CT-RETRY-002 |
| CT-RETRY-009 | Logs de retry não expõem dados sensíveis | Consumer ativo; acesso ao sistema de logs; evento processado com retry (CT-RETRY-002 aprovado) — nota: valida política de segurança transversal da plataforma — não diretamente rastreável ao critério de aceite deste card | 1. Após execução do CT-RETRY-002, acessar o sistema de logs. 2. Localizar as entradas de log geradas pelas tentativas de retry. 3. Inspecionar o conteúdo de cada entrada. | As entradas de log não contêm: tokens de autenticação, números de telefone completos, conteúdo de mensagens, dados pessoais de contatos, ou credenciais de serviços. O log registra apenas metadados do evento (ex: ID, timestamp, tipo, número da tentativa, motivo da falha). | 🔴 Alta | API | CT-RETRY-002 |
| CT-RETRY-010 | Contagem exata de tentativas: N-1 requeues e DLQ na tentativa N | Consumer ativo; dependência configurada para falhar em 100% das tentativas; N = [valor configurado — confirmar com time de dev antes da execução] — ⚠️ Bloqueável — (1) confirmar o valor exato de N com o time de dev; (2) confirmar mecanismo de indução de falha persistente | 1. Confirmar o valor de N (limite máximo de tentativas) com o time de dev. 2. Configurar a dependência para falhar em todas as tentativas. 3. Publicar um evento de ack válido na fila. 4. Monitorar e contar o número de tentativas executadas pelo consumer. 5. Verificar o destino do evento após as N tentativas. | O consumer executa exatamente N tentativas: as primeiras N-1 resultam em requeue, e a tentativa N roteia o evento para a DLQ sem requeue adicional. O log contém exatamente N entradas de falha para o mesmo evento. Nenhuma N+1ª tentativa é disparada. — valida a contagem exata, diferente do CT-RETRY-003 que valida o fluxo geral de esgotamento. | 🟡 Média | API | CT-RETRY-003 |

**Resumo:** 10 cenários — 🔴 5 Alta | 🟡 5 Média | 🟢 0 Baixa

---

## BLOCO 4 — Cenários Gherkin (BDD)

Os dois cenários 🔴 Alta mais diretamente relacionados ao bug/feature principal:

```gherkin
Cenário: Evento de ack falha na primeira tentativa e é processado com sucesso no retry
  Dado que o consumer do polichat-web-app está ativo
  E que existe um evento de ack válido aguardando na fila
  E que a dependência está configurada para falhar apenas na primeira tentativa
  Quando o consumer tenta processar o evento pela primeira vez
  Então o evento retorna à fila para nova tentativa (nack com requeue)
  E o log registra a falha com o número da tentativa e o motivo
  Quando o consumer processa o evento na segunda tentativa
  Então o ack é atualizado corretamente no banco de dados
  E nenhuma terceira tentativa é disparada
```

```gherkin
Cenário: Evento de ack atrasado pelo retry não sobrescreve ack mais recente no banco
  Dado que o consumer do polichat-web-app está ativo
  E que a mensagem X possui ack igual a 3 já persistido no banco de dados
  Quando um evento de ack igual a 2 para a mensagem X é publicado na fila
  E o consumer processa esse evento
  Então o ack da mensagem X permanece igual a 3 no banco de dados
  E o evento de ack=2 não atualiza nenhum registro
```

---

## Validação por Agente Crítico Independente

- Aprovados sem alteração: 4 (CT-RETRY-001, CT-RETRY-004, CT-RETRY-006, CT-RETRY-007)
- Revisados: 6 (CT-RETRY-002, CT-RETRY-003, CT-RETRY-005, CT-RETRY-008, CT-RETRY-009, CT-RETRY-010)
- Adicionados por cobertura insuficiente: 0
