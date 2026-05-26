# Cenários de Teste — DEV4-4188
> Card: Criar o evento "Atendimento finalizado" para API
> Gerado em: 2026-05-19

---

## BLOCO 1 — Estratégia de Teste

**Escopo:** Backend/API exclusivamente — criação do evento `AttendanceFinished` disparado via `CloseConversation` ao encerrar um atendimento humano. Não há impacto visual. Inclui verificação do payload, isolamento do evento em relação ao `ContactUpdated` e não-regressão do fluxo de fechamento existente.

**Tipos de teste aplicáveis:**
- **Funcional:** Validar disparo correto do evento com payload completo nos campos obrigatórios.
- **Regressão:** Garantir que o fluxo de `CloseConversation` existente e o evento `ContactUpdated` não são afetados.
- **Integração:** Verificar que consumidores de webhook recebem `AttendanceFinished` de forma independente.
- **Segurança:** Assegurar isolamento de dados entre contas no payload do evento.

**Prioridade de execução:** Alta — afeta todas as integrações via API que dependem de notificação de encerramento de atendimento.

**Riscos principais:** Falso positivo (evento disparado sem fechamento real), falso negativo (evento não disparado no fechamento), payload com campos ausentes, e regressão no fluxo de `CloseConversation` que impacta o fechamento de atendimentos em produção.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Evento `AttendanceFinished` não é disparado ao fechar atendimento humano | M | A | 🔴 Alta |
| Evento disparado erroneamente ao atualizar dados do contato sem fechar atendimento (falso positivo) | M | A | 🔴 Alta |
| Payload com campos obrigatórios ausentes ou com valores incorretos | M | A | 🔴 Alta |
| Payload do evento expõe dados de outra conta (violação de isolamento de tenant) | B | A | 🔴 Alta |
| Fluxo de fechamento via `CloseConversation` é afetado/quebrado pela mudança | B | A | 🔴 Alta |
| Evento disparado por encerramento via bot ou timeout (contra regra de negócio) | M | M | 🟡 Média |
| Evento disparado via `CloseAttendance` (ponto de disparo incorreto) | B | M | 🟡 Média |
| Fechamento de atendimento já encerrado dispara evento duplicado | B | M | 🟡 Média |
| Múltiplos fechamentos simultâneos causam perda ou duplicação de eventos | B | M | 🟡 Média |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade |
|---|---|---|---|---|---|
| CT-ATTEND-FIN-001 | Fechar atendimento dispara evento com payload completo | Atendimento humano ativo; deploy aplicado; acesso ao log de eventos ou ferramenta de inspecão de webhook | 1. Iniciar um atendimento humano ativo na plataforma. 2. Operador finaliza o atendimento via interface. 3. Inspecionar o log de eventos disparados pela `CloseConversation`. 4. Capturar o payload do evento emitido. | Evento `AttendanceFinished` é disparado exatamente uma vez. Payload contém todos os campos obrigatórios com valores corretos: `event`, `account_id`, `contact_id`, `agent_id`, `channel`, `closed_at` (formato ISO 8601). | 🔴 Alta |
| CT-ATTEND-FIN-002 | Webhook recebe evento independente do ContactUpdated | Consumidor de webhook cadastrado; atendimento humano ativo; deploy aplicado | 1. Cadastrar um endpoint de webhook para receber eventos. 2. Fechar um atendimento humano na plataforma. 3. Verificar os eventos recebidos no endpoint. | O endpoint recebe o evento `AttendanceFinished` de forma isolada. O evento `ContactUpdated` pode também ser recebido, mas `AttendanceFinished` é identificável sem depender da filtragem do `ContactUpdated`. | 🔴 Alta |
| CT-ATTEND-FIN-003 | Atualizar contato não dispara AttendanceFinished | Contato existente com atendimento ativo; deploy aplicado | 1. Atualizar dados do contato (ex.: nome, telefone, tags) sem fechar o atendimento. 2. Inspecionar o log de eventos disparados. | Evento `AttendanceFinished` **não** é disparado. Apenas `ContactUpdated` (se aplicável) pode ser emitido. Nenhum falso positivo. | 🔴 Alta |
| CT-ATTEND-FIN-004 | Encerramento por bot não dispara evento | Atendimento encerrado automaticamente por bot ou timeout; deploy aplicado | 1. Configurar ou simular um encerramento automático por bot ou por timeout de sessão. 2. Inspecionar o log de eventos disparados. | Evento `AttendanceFinished` **não** é disparado para encerramentos automáticos, conforme regra de negócio. | 🟡 Média |
| CT-ATTEND-FIN-005 | Gatilho é CloseConversation, não CloseAttendance | Deploy aplicado; acesso ao log de execução de actions | 1. Fechar um atendimento humano pela plataforma. 2. Inspecionar os logs da aplicação para identificar qual action foi executada no fluxo. | O log confirma que `CloseConversation` foi a action executada e originou o disparo do `AttendanceFinished`. A action `CloseAttendance` **não** aparece como gatilho do evento. | 🟡 Média |
| CT-ATTEND-FIN-006 | Fechar atendimento já encerrado não duplica evento | Atendimento previamente encerrado; deploy aplicado | 1. Encerrar um atendimento. 2. Tentar encerrar o mesmo atendimento novamente (via API ou interface, se permitido). 3. Inspecionar o log de eventos. | O segundo fechamento não dispara um segundo `AttendanceFinished`. O sistema trata a operação de forma idempotente (retorna erro adequado ou ignora silenciosamente). | 🟡 Média |
| CT-ATTEND-FIN-007 | Múltiplos fechamentos simultâneos geram eventos distintos | Múltiplos atendimentos humanos ativos; deploy aplicado; ferramenta de carga disponível | 1. Fechar 5 atendimentos diferentes de forma simultânea via API. 2. Aguardar processamento completo. 3. Inspecionar o log de eventos e o endpoint de webhook. | Cada atendimento gera exatamente um evento `AttendanceFinished` com seu respectivo `contact_id`. Sem eventos duplicados, perdidos ou com payload trocado. | 🟡 Média |
| CT-ATTEND-FIN-008 | Fechamento sem agente atribuído não quebra o evento | Atendimento humano sem agente atribuído; deploy aplicado | 1. Criar/localizar um atendimento sem agente (`agent_id` nulo). 2. Fechar o atendimento. 3. Inspecionar o payload do evento emitido. | Evento `AttendanceFinished` é disparado. Campo `agent_id` é `null` ou omitido — não causa erro no payload nem falha no disparo do evento. | 🟢 Baixa |
| CT-ATTEND-FIN-009 | Payload não expõe dados de outra conta | Duas contas distintas com atendimentos ativos; deploy aplicado | 1. Fechar um atendimento da Conta A. 2. Inspecionar o payload do evento `AttendanceFinished` recebido. 3. Verificar se os IDs presentes (`account_id`, `contact_id`, `agent_id`) pertencem exclusivamente à Conta A. | O payload contém apenas dados da Conta A. Nenhum identificador ou dado da Conta B (ou de qualquer outra conta) está presente. Isolamento de tenant respeitado. | 🔴 Alta |

---

## BLOCO 4 — Cenários Gherkin (BDD)

### CT-ATTEND-FIN-001

```gherkin
Cenário: Fechar atendimento humano dispara AttendanceFinished com payload completo
  Dado que existe um atendimento humano ativo na plataforma
  E que o deploy com o novo evento AttendanceFinished foi aplicado
  Quando o operador finaliza o atendimento via interface
  Então o sistema deve disparar exatamente um evento AttendanceFinished via CloseConversation
  E o payload deve conter os campos: event, account_id, contact_id, agent_id, channel, closed_at
  E o campo closed_at deve estar no formato ISO 8601
```

### CT-ATTEND-FIN-002

```gherkin
Cenário: Consumidor de webhook recebe AttendanceFinished de forma independente
  Dado que existe um endpoint de webhook cadastrado para receber eventos
  E que existe um atendimento humano ativo na plataforma
  Quando o operador finaliza o atendimento
  Então o endpoint deve receber o evento AttendanceFinished
  E o evento deve ser identificável sem necessidade de filtrar o ContactUpdated
```

### CT-ATTEND-FIN-003

```gherkin
Cenário: Atualizar dados do contato não dispara AttendanceFinished
  Dado que existe um contato com atendimento ativo na plataforma
  Quando os dados do contato são atualizados (nome, telefone ou tags) sem fechar o atendimento
  Então o evento AttendanceFinished não deve ser disparado
  E nenhum falso positivo deve ser registrado no log de eventos
```

### CT-ATTEND-FIN-009

```gherkin
Cenário: Payload do evento não expõe dados de outra conta
  Dado que existem duas contas distintas (Conta A e Conta B) com atendimentos ativos
  Quando um atendimento da Conta A é finalizado
  Então o evento AttendanceFinished deve conter apenas identificadores da Conta A
  E nenhum dado pertencente à Conta B deve estar presente no payload
```

---

## ⚠️ Observações

### Dependências Externas
- **Ferramenta de inspeção de webhook:** para os cenários CT-ATTEND-FIN-001, 002 e 007, é necessário um endpoint receptor de webhook configurado (ex.: webhook.site, servidor de staging, ou ferramenta de monitoramento interna).
- **Acesso aos logs da aplicação:** cenários CT-ATTEND-FIN-003, 004 e 005 dependem de acesso ao log de execução de actions para confirmar qual action foi acionada e quais eventos foram ou não emitidos.
- **Capacidade de simular fechamentos automáticos (bot/timeout):** CT-ATTEND-FIN-004 requer ambiente onde seja possível acionar ou simular encerramentos automáticos de forma controlada.

### Limitações Conhecidas (inferidas)
- O nome final do evento (`AttendanceFinished`) não está confirmado — o card indica "nome a confirmar com o time". Os cenários devem ser ajustados após definição do nome oficial.
- A regra sobre encerramento por bot/timeout pode ser alterada posteriormente — CT-ATTEND-FIN-004 deve ser revisado se a regra mudar.
- Não está definido o comportamento do `agent_id` quando não há agente atribuído — CT-ATTEND-FIN-008 assume que o campo é `null` ou omitido; verificar com o time.

### Premissas Assumidas
- O evento é disparado de forma síncrona ou assíncrona com entrega garantida — não há menção a retry ou dead-letter queue no card.
- "Atendimento humano" significa atendimento iniciado e conduzido por um agente, diferenciando de fluxos automatizados de bot.
- `CloseConversation` é a única action que deve disparar o evento nesta entrega — sem outras origens de fechamento contempladas.
- O sistema de webhook existente é o canal de entrega do evento para consumidores externos.

### Sugestões de Automação

| Cenário | ROI para Automação | Justificativa |
|---|---|---|
| CT-ATTEND-FIN-001 | ⭐⭐⭐⭐⭐ Muito Alto | Verifica o contrato completo do evento (disparo + payload). Ideal como teste de contrato de API executado a cada deploy. |
| CT-ATTEND-FIN-002 | ⭐⭐⭐⭐⭐ Muito Alto | Verifica a entrega end-to-end ao consumidor de webhook. Deve integrar a pipeline de CI/CD como smoke test. |
| CT-ATTEND-FIN-003 | ⭐⭐⭐⭐⭐ Muito Alto | Teste de falso positivo — crítico para evitar poluição de eventos em integrações. Simples de automatizar via API. |
| CT-ATTEND-FIN-006 | ⭐⭐⭐⭐ Alto | Idempotência do evento. Fácil de automatizar com chamada dupla à API e verificação do log de eventos. |
| CT-ATTEND-FIN-007 | ⭐⭐⭐ Alto | Concorrência. Script de carga leve (ex.: k6) integrado ao ambiente de staging, não de produção. |
| CT-ATTEND-FIN-009 | ⭐⭐⭐⭐ Alto | Segurança de tenant isolation. Automatizar como teste de segurança recorrente executado após cada deploy em staging. |
| CT-ATTEND-FIN-004 | ⭐⭐ Médio | Requer mock de encerramento por bot — depende de suporte do ambiente de testes para simular esse fluxo. |
