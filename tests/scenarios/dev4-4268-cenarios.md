# Cenários de Teste — DEV4-4268
> Card: Exibir comentários de Status do WhatsApp de forma diferenciada no chat
> Gerado em: 2026-05-28
> Card atualizado em: 2026-05-27T18:32:04.390-0300

---

## BLOCO 1 — Estratégia de Teste

O card trata da identificação e exibição diferenciada de comentários de Status do WhatsApp (canal `whatsapp_waba` / Meta Cloud API) na plataforma Poli. O escopo abrange duas camadas: (1) **backend** — processamento do webhook Meta no `waba-webhook`/`polichat-web-app` para detectar o tipo de evento de comentário de Status e persistir o contexto do Status como referência; (2) **frontend** — renderização do bloco de referência na Nova Interface (foundation-spa) e no Legado (polichat-spa). Tipos de teste aplicáveis: **API** (webhook inbound com payload real/simulado da Meta), **UI** (renderização do componente de mensagem diferenciada). Prioridade de execução: críticos de regressão primeiro (CT-WSTATUS-004, CT-WSTATUS-005), depois happy path (CT-WSTATUS-001, CT-WSTATUS-002), depois borda e segurança. Riscos principais: mensagens comuns de WhatsApp serem incorretamente identificadas como comentários de Status (regressão de alto impacto); ausência de cobertura no legado (polichat-spa); conteúdo de mídia do Status não renderizando no bloco de referência.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade | Impacto | Prioridade |
|---|---|---|---|
| Mensagem comum de WhatsApp processada como comentário de Status (falso positivo) | M | A | Alta |
| Comentário de Status processado como mensagem comum (falso negativo — feature não funciona) | M | A | Alta |
| Bloco de referência de Status não renderiza na interface legada (polichat-spa) | A | M | Alta |
| Conteúdo de mídia do Status (imagem/vídeo) não exibido no bloco de referência | M | M | Alta |
| Campo de Status forjado em payload arbitrário (injeção de conteúdo) | B | A | Alta |
| Inconsistência visual entre tratamento de Status do WhatsApp e Stories do Instagram | M | M | Média |
| Payload malformado da Meta causando erro não tratado no webhook | B | A | Média |
| Status com conteúdo vazio/nulo causando crash no componente de UI | B | M | Média |
| Múltiplos comentários de Status consecutivos gerando layout quebrado | B | B | Baixa |

---

## BLOCO 3 — Tabela de Cenários

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-WSTATUS-001 | Comentário de Status com texto chega com indicação visual no chat | Número de WhatsApp WABA conectado à plataforma; contato existente; chat ativo ou novo; ⚠️ Bloqueável: webhook da Meta configurado e ativo para o número | 1. Simular envio de webhook da Meta com payload de comentário de Status do WhatsApp (campo `statuses` ou estrutura específica de `referral` com `type: status`). 2. Acessar o chat do contato na plataforma. 3. Verificar a mensagem recebida. | A mensagem é exibida com indicação visual clara de que é um comentário de Status (ex.: label "Comentário de Status" ou ícone equivalente). O texto do comentário do contato é exibido abaixo do bloco de referência. | 🔴 Alta | API + UI | — |
| CT-WSTATUS-002 | Status com imagem exibido como bloco de referência acima do comentário | Número de WhatsApp WABA conectado; ⚠️ Bloqueável: Status publicado com imagem no WhatsApp do número conectado; contato que comentou no Status | 1. Simular webhook da Meta com payload de comentário de Status contendo `referral` com `type: status` e `media_type: image` e URL de imagem. 2. Acessar o chat do contato. 3. Verificar o bloco de referência. | O conteúdo do Status (imagem) é exibido como bloco de referência acima do texto do comentário do contato. O bloco indica claramente que é uma resposta a um Status. | 🔴 Alta | API + UI | CT-WSTATUS-001 |
| CT-WSTATUS-003 | Status com vídeo exibido como bloco de referência acima do comentário | Número de WhatsApp WABA conectado; ⚠️ Bloqueável: Status publicado com vídeo no WhatsApp do número conectado | 1. Simular webhook da Meta com payload de comentário de Status contendo `referral` com `type: status` e `media_type: video` e URL de vídeo. 2. Acessar o chat do contato. 3. Verificar o bloco de referência. | O conteúdo do Status (vídeo ou thumbnail do vídeo) é exibido como bloco de referência. O bloco indica claramente que é uma resposta a um Status. | 🟡 Média | API + UI | CT-WSTATUS-001 |
| CT-WSTATUS-004 | Mensagem comum de WhatsApp não é afetada pela feature (regressão) | Número de WhatsApp WABA conectado; contato enviando mensagem de texto comum | 1. Simular webhook da Meta com payload padrão de mensagem de texto comum (sem campo de comentário de Status). 2. Acessar o chat do contato. 3. Verificar a mensagem recebida. | A mensagem é exibida normalmente como mensagem de texto, sem indicação visual de comentário de Status, sem bloco de referência. Nenhuma alteração de layout. | 🔴 Alta | API + UI | — |
| CT-WSTATUS-005 | Webhook sem campo de Status não gera bloco de referência | Número de WhatsApp WABA conectado; payload de webhook sem campo `referral` ou `referral.type != status` | 1. Simular envio de webhook com payload de mensagem de mídia (imagem) comum, sem campo de comentário de Status. 2. Acessar o chat do contato. 3. Verificar a mensagem. | A mensagem de mídia é exibida normalmente sem bloco de referência e sem indicação de Status. Comportamento idêntico ao de antes da feature. | 🔴 Alta | API | CT-WSTATUS-004 |
| CT-WSTATUS-006 | Payload malformado de webhook (campo de Status com estrutura inválida) | Número de WhatsApp WABA conectado | 1. Simular envio de webhook com campo `referral` presente mas com estrutura inválida/incompleta (ex.: sem `type`, sem `url`). 2. Verificar o comportamento do backend (logs, resposta HTTP). 3. Verificar se alguma mensagem foi criada no chat. | O backend retorna status 2xx (não rejeita o webhook com 5xx). A mensagem é processada como mensagem comum ou descartada com log de erro. A plataforma não apresenta crash ou comportamento indefinido. | 🔴 Alta | API | — |
| CT-WSTATUS-007 | Status com conteúdo textual vazio ou nulo no bloco de referência | Número de WhatsApp WABA conectado; ⚠️ Bloqueável: Status de texto publicado com conteúdo vazio | 1. Simular webhook com payload de comentário de Status onde o campo de conteúdo do Status (`text` ou equivalente) é vazio ou nulo. 2. Acessar o chat. 3. Verificar o bloco de referência. | O bloco de referência é exibido sem crash, com placeholder adequado (ex.: "Status indisponível" ou equivalente). O comentário do contato é exibido normalmente. | 🟡 Média | API + UI | CT-WSTATUS-001 |
| CT-WSTATUS-008 | Comportamento visual consistente com tratamento de Stories do Instagram | Conta com canal Instagram configurado com Stories já funcionando; conta com canal WhatsApp WABA conectado | 1. Abrir no chat um comentário de Story do Instagram (já existente). 2. Abrir no chat um comentário de Status do WhatsApp (criado via CT-WSTATUS-001). 3. Comparar o padrão visual dos dois blocos de referência. | O padrão visual (estrutura do bloco de referência, indicação de origem, posicionamento do comentário abaixo) é equivalente entre Stories do Instagram e Status do WhatsApp. Não há inconsistência de layout. | 🔴 Alta | UI | CT-WSTATUS-001 |
| CT-WSTATUS-009 | Payload com campo de Status forjado em mensagem comum (segurança — injeção de contexto) | Número de WhatsApp WABA conectado; capacidade de enviar payload personalizado ao endpoint de webhook | 1. Enviar ao endpoint de webhook um payload de mensagem comum de WhatsApp com campo `referral` artificialmente inserido (simulando tentativa de forjar um comentário de Status). 2. Verificar como a plataforma processa o evento. 3. Verificar se o bloco de referência é exibido indevidamente. | O backend valida a autenticidade/origem do campo de Status (assinatura do webhook Meta ou validação do `referral`). Mensagens sem origem legítima de Status não devem exibir o bloco de referência diferenciado. Nenhum dado de Status é exibido a partir de payload não autenticado. | 🔴 Alta | API | — |
| CT-WSTATUS-010 | Status com texto muito longo no bloco de referência (borda de layout) | Número de WhatsApp WABA conectado | 1. Simular webhook com payload de comentário de Status onde o texto do Status tem conteúdo muito longo (ex.: 500+ caracteres). 2. Acessar o chat. 3. Verificar o layout do bloco de referência. | O bloco de referência trunca o texto com reticências ou usa scroll, sem quebrar o layout da conversa. O comentário do contato continua visível abaixo do bloco. | 🟢 Baixa | UI | CT-WSTATUS-001 |
| CT-WSTATUS-011 | Múltiplos comentários de Status consecutivos no mesmo chat (borda de volume) | Número de WhatsApp WABA conectado; contato que faz múltiplos comentários em Status diferentes | 1. Simular envio de 3 webhooks consecutivos de comentários de Status distintos do mesmo contato. 2. Acessar o chat do contato. 3. Verificar a exibição de todas as mensagens. | Todos os comentários de Status são exibidos individualmente com seu respectivo bloco de referência. Não há mistura de conteúdo entre blocos. O layout da conversa permanece correto. | 🟢 Baixa | API + UI | CT-WSTATUS-001 |
| CT-WSTATUS-012 | Comentário de Status exibido de forma diferenciada na interface legada (polichat-spa) | Número de WhatsApp WABA conectado; acesso à interface legada `polichat-spa`; ⚠️ Bloqueável: feature implementada ou documentada para o Legado | 1. Realizar CT-WSTATUS-001 com acesso à interface legada `polichat-spa`. 2. Acessar o chat do contato na polichat-spa. 3. Verificar a exibição da mensagem de comentário de Status. | A mensagem de comentário de Status é exibida de forma diferenciada na polichat-spa (ou, caso o escopo seja apenas Nova Interface, há documentação explícita no card/PR indicando que o Legado não está no escopo desta entrega). | 🟡 Média | UI | CT-WSTATUS-001 |

---

## BLOCO 4 — Gherkin (BDD)

### CT-WSTATUS-001 — Comentário de Status com texto chega com indicação visual no chat

```gherkin
Feature: Exibição diferenciada de comentários de Status do WhatsApp

  Background:
    Given um número de WhatsApp WABA está conectado à plataforma
    And o contato "João Silva" existe na conta

  Scenario: Comentário de Status com texto é exibido com indicação visual
    Given o webhook da Meta está configurado para o número conectado
    When a plataforma recebe um webhook da Meta com payload de comentário de Status do WhatsApp
      """
      {
        "entry": [{
          "changes": [{
            "value": {
              "messages": [{
                "from": "5511999990000",
                "type": "text",
                "text": { "body": "Que incrível esse produto!" },
                "referral": {
                  "source_url": "https://status.whatsapp.com/...",
                  "source_type": "status",
                  "source_id": "status-id-123",
                  "headline": "Status do WhatsApp",
                  "body": "Confira nossa promoção!",
                  "media_type": "text"
                }
              }]
            }
          }]
        }]
      }
      """
    Then o chat de "João Silva" deve conter uma mensagem com indicação visual de "Comentário de Status"
    And o bloco de referência deve exibir o conteúdo do Status acima do comentário
    And o texto do comentário "Que incrível esse produto!" deve estar visível abaixo do bloco de referência
    And nenhuma outra mensagem no chat deve ter indicação indevida de "Comentário de Status"
```

### CT-WSTATUS-004 — Mensagem comum de WhatsApp não é afetada (regressão)

```gherkin
Feature: Regressão — mensagens comuns de WhatsApp não são afetadas

  Background:
    Given um número de WhatsApp WABA está conectado à plataforma
    And o contato "Maria Souza" existe na conta

  Scenario: Mensagem de texto comum não exibe bloco de referência de Status
    Given o webhook da Meta está configurado para o número conectado
    When a plataforma recebe um webhook da Meta com payload de mensagem de texto comum
      """
      {
        "entry": [{
          "changes": [{
            "value": {
              "messages": [{
                "from": "5511988880000",
                "type": "text",
                "text": { "body": "Olá, preciso de ajuda!" }
              }]
            }
          }]
        }]
      }
      """
    Then o chat de "Maria Souza" deve conter a mensagem "Olá, preciso de ajuda!"
    And a mensagem NÃO deve ter indicação visual de "Comentário de Status"
    And a mensagem NÃO deve ter bloco de referência de Status
    And o layout da mensagem deve ser idêntico ao comportamento anterior à feature
```

---

## Validação por Agente Crítico Independente

**Resumo da revisão aplicada:**

| CT-ID | Critério | Avaliação | Ação |
|---|---|---|---|
| CT-WSTATUS-001 | Rastreabilidade → CA1 | Diretamente amarrado ao critério de aceite 1 | Aprovado |
| CT-WSTATUS-002 | Rastreabilidade → CA2 (imagem) | Diretamente amarrado ao critério de aceite 2 | Aprovado |
| CT-WSTATUS-003 | Rastreabilidade → CA2 (vídeo) | Card menciona explicitamente vídeo como tipo de mídia | Aprovado |
| CT-WSTATUS-004 | Rastreabilidade → CA3 | Critério de regressão explícito no card | Aprovado |
| CT-WSTATUS-005 | Rastreabilidade → CA3 | Extensão do critério de regressão | Aprovado |
| CT-WSTATUS-006 | Negativo — não explícito no CA, mas necessário para robustez | Aprovado |
| CT-WSTATUS-007 | Borda — conteúdo nulo, não explícito mas derivado do CA2 | Aprovado |
| CT-WSTATUS-008 | Rastreabilidade → CA4 | Critério de aceite 4 explícito | Aprovado |
| CT-WSTATUS-009 | Segurança — cobertura mínima obrigatória | Aprovado |
| CT-WSTATUS-010 | Borda — layout com texto longo | Aprovado |
| CT-WSTATUS-011 | Borda — volume de mensagens | Aprovado |
| CT-WSTATUS-012 | Cobertura legado — card menciona "cobrir tanto a Nova Interface quanto o Legado" | **Adicionado** por cobertura insuficiente |

- Aprovados sem alteração: 11
- Revisados: 0
- Adicionados por cobertura insuficiente: 1 (CT-WSTATUS-012)

**Cobertura final:** 🔴 Alta: 6 | 🟡 Média: 3 | 🟢 Baixa: 3 = **Total: 12 cenários**
