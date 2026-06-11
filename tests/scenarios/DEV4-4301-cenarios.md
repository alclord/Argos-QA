# Cenários de Teste — DEV4-4301
> Card: Falha no processamento de variáveis para Mensagens Rápidas e Templates via Agendamento
> Gerado em: 2026-06-03
> Card atualizado em: 2026-06-02T13:37:22.513-0300

---

## MÓDULO: AGENDAMENTO

## RESUMO DO CARD

O worker de agendamento falha ao interpolar variáveis dinâmicas (ex: `[contact_first_name]`, `[operator_name]`) antes do disparo de mensagens, enviando os placeholders literalmente aos destinatários. A falha afeta Templates de Mensagem (exibição incorreta na plataforma, mas entrega parcialmente correta pela Meta) e Mensagens Rápidas (falha total: cliente recebe o placeholder bruto). A correção consiste em adicionar a etapa de interpolação no worker, tornando seu comportamento equivalente ao do fluxo de envio direto.

---

## BLOCO 1 — Estratégia de Teste

**Escopo:** Worker de agendamento — interpolação de variáveis para Templates e Mensagens Rápidas. O fluxo de envio direto (caixa de texto) deve ser coberto como regressão.
**Tipos de teste:** Funcional (happy path e falhas), Regressão (fluxo direto intacto), Borda (variáveis ausentes/nulas, múltiplas variáveis) e Segurança (injeção via campo de variável).
**Prioridade de execução:** Alta — impacto direto na comunicação com o cliente final.
**Riscos principais:** Interpolação parcial deixando placeholders residuais; regressão no fluxo direto após a correção; dados de contato nulos causando crash no worker; campo `message_body_html` persistido com conteúdo incorreto.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Worker não interpolar variáveis em Mensagens Rápidas agendadas | A | A | 🔴 Alta |
| Plataforma exibir tags brutas no chat para Templates agendados | A | M | 🔴 Alta |
| `message_body_html` gravado com placeholders não substituídos | A | A | 🔴 Alta |
| Regressão no fluxo de envio direto após a correção no worker | M | A | 🔴 Alta |
| Variável com valor nulo/vazio causar crash ou envio em branco | M | A | 🔴 Alta |
| Interpolação parcial (apenas algumas variáveis substituídas) | M | M | 🟡 Média |
| Injeção de conteúdo malicioso via campo de variável | B | A | 🟡 Média |
| Agendamento com múltiplas variáveis interpolar na ordem errada | B | M | 🟡 Média |
| Template sem variáveis quebrar com a nova etapa de interpolação | B | M | 🟡 Média |

---

## BLOCO 3 — Tabela de Cenários

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-AGENDAMENTO-001 | Agendar Template com variável — entrega correta | Contato com `first_name` preenchido; Template ativo com variável `[contact_first_name]`; operador logado com nome preenchido | 1. Abrir conversa do contato. 2. Selecionar "Agendar mensagem". 3. Escolher Template com `[contact_first_name]`. 4. Definir data/hora futura. 5. Confirmar agendamento. 6. Aguardar o disparo. 7. Verificar mensagem recebida no WhatsApp do contato. | Contato recebe mensagem com nome real (ex: "Olá, Rodrigo") — sem placeholder literal `[contact_first_name]` | 🔴 Alta | UI | — |
| CT-AGENDAMENTO-002 | Agendar Mensagem Rápida com variável — entrega correta | Contato com `first_name` preenchido; Mensagem Rápida cadastrada com `[contact_first_name]` e `[operator_name]`; operador logado | 1. Abrir conversa. 2. Selecionar "Agendar mensagem". 3. Escolher Mensagem Rápida com variáveis. 4. Definir data/hora futura. 5. Confirmar. 6. Aguardar disparo. 7. Verificar mensagem no WhatsApp do contato. | Contato recebe texto com nome do contato e do operador interpolados corretamente. Nenhum placeholder literal visível. | 🔴 Alta | UI | — |
| CT-AGENDAMENTO-003 | Plataforma exibe texto interpolado após disparo de Template | Mesmo pré-requisito de CT-AGENDAMENTO-001 | 1. Executar CT-AGENDAMENTO-001. 2. Após disparo, abrir o chat na plataforma Poli. 3. Localizar a mensagem enviada pelo agendamento. | A mensagem exibida no chat da plataforma contém o texto final ("Olá, Rodrigo"), sem tags brutas. Campo `message_body_html` não contém `[contact_first_name]`. | 🔴 Alta | UI | CT-AGENDAMENTO-001 |
| CT-AGENDAMENTO-004 | Plataforma exibe texto interpolado após disparo de Mensagem Rápida | Mesmo pré-requisito de CT-AGENDAMENTO-002 | 1. Executar CT-AGENDAMENTO-002. 2. Após disparo, abrir o chat na plataforma Poli. 3. Localizar a mensagem enviada pelo agendamento. | Mensagem no chat exibe texto final interpolado. `message_body_html` gravado sem placeholders. | 🔴 Alta | UI | CT-AGENDAMENTO-002 |
| CT-AGENDAMENTO-005 | Envio direto pela caixa de texto não regride | Contato e operador com dados completos; Mensagem Rápida com variáveis | 1. Abrir conversa. 2. Usar caixa de texto para selecionar Mensagem Rápida com variáveis. 3. Enviar imediatamente (sem agendar). 4. Verificar mensagem no WhatsApp e no chat da plataforma. | Mensagem enviada diretamente continua sendo interpolada corretamente. Nenhuma regressão no fluxo direto. | 🔴 Alta | UI | — |
| CT-AGENDAMENTO-006 | Agendar Template com contato sem `first_name` preenchido | Contato com campo `first_name` vazio/nulo; Template com `[contact_first_name]` | 1. Abrir conversa do contato sem nome. 2. Agendar Template com `[contact_first_name]`. 3. Aguardar disparo. | Worker não crasha. Mensagem é enviada com fallback (ex: campo em branco ou valor padrão definido), sem placeholder literal e sem erro 500 no worker. | 🔴 Alta | UI | — |
| CT-AGENDAMENTO-007 | Agendar Mensagem Rápida com operador sem nome preenchido | Operador logado com campo `name` vazio; Mensagem Rápida com `[operator_name]` | 1. Logar como operador sem nome configurado. 2. Agendar Mensagem Rápida com `[operator_name]`. 3. Aguardar disparo. | Worker não crasha. Variável `[operator_name]` é substituída por fallback ou vazio. Nenhum placeholder literal entregue ao cliente. | 🟡 Média | UI | — |
| CT-AGENDAMENTO-008 | Agendar Template sem variáveis — compatibilidade | Template sem nenhuma variável dinâmica; contato ativo | 1. Agendar Template estático (sem `[...]`). 2. Aguardar disparo. 3. Verificar entrega. | Template enviado corretamente. A nova etapa de interpolação não quebra templates sem variáveis. | 🟡 Média | UI | — |
| CT-AGENDAMENTO-009 | Agendar Mensagem Rápida com múltiplas variáveis | Contato e operador com todos os campos preenchidos; Mensagem Rápida com `[contact_first_name]`, `[operator_name]` e outra variável suportada | 1. Agendar Mensagem Rápida com 3+ variáveis distintas. 2. Aguardar disparo. 3. Verificar texto recebido. | Todas as variáveis substituídas corretamente e na posição certa. Nenhum placeholder residual. | 🟡 Média | UI | — |
| CT-AGENDAMENTO-010 | Injeção de conteúdo via campo de variável | ⚠️ Bloqueável — criável via API: `POST /contacts` com `first_name` contendo payload malicioso | 1. Criar contato com `first_name = "<script>alert(1)</script>"`. 2. Agendar Mensagem Rápida com `[contact_first_name]`. 3. Aguardar disparo. 4. Verificar chat na plataforma. | Conteúdo é sanitizado antes da gravação em `message_body_html`. Nenhum script executado na UI. Mensagem enviada com texto escapado ou sanitizado. | 🟡 Média | API + UI | — |
| CT-AGENDAMENTO-011 | Verificar `message_body_html` via API após disparo | ⚠️ Bloqueável — criável via API: acesso ao endpoint de mensagens `GET /messages/{id}` | 1. Executar CT-AGENDAMENTO-002. 2. Após disparo, consultar `GET /messages/{id}` da mensagem gerada. 3. Inspecionar campo `message_body_html` na resposta. | `message_body_html` retorna texto completamente interpolado. Nenhum placeholder (`[contact_first_name]`, `[operator_name]` etc.) presente no valor do campo. HTTP 200. | 🔴 Alta | API | CT-AGENDAMENTO-002 |
| CT-AGENDAMENTO-012 | Agendamento para data/hora exata — interpolação no momento certo | Contato com dados completos; agendamento para daqui a 2 minutos | 1. Agendar Mensagem Rápida com variáveis para daqui a 2 minutos. 2. Aguardar disparo na hora exata. 3. Verificar entrega e `message_body_html`. | Interpolação ocorre no momento do disparo (não no momento do agendamento). Dados do contato e operador refletem valores vigentes no disparo. | 🟡 Média | UI | — |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Cenário: Agendar Mensagem Rápida com variáveis e cliente recebe texto interpolado
  Dado que existe um contato com first_name "Rodrigo" cadastrado na plataforma
  E existe uma Mensagem Rápida com o texto "Olá, [contact_first_name], aqui é [operator_name]."
  E o operador logado tem o nome "Rodrigo Thomás" configurado em seu perfil
  Quando o operador agendar essa Mensagem Rápida para o contato com data futura de 2 minutos
  E o worker de agendamento disparar a mensagem no horário programado
  Então o contato recebe no WhatsApp a mensagem "Olá, Rodrigo, aqui é Rodrigo Thomás."
  E o chat na plataforma Poli exibe "Olá, Rodrigo, aqui é Rodrigo Thomás."
  E o campo message_body_html da mensagem não contém nenhum placeholder entre colchetes
```

```gherkin
Cenário: Envio direto pela caixa de texto não é afetado pela correção do worker
  Dado que existe um contato com first_name "Ana" cadastrado na plataforma
  E existe uma Mensagem Rápida com o texto "Olá, [contact_first_name], tudo bem?"
  E o operador logado tem o nome "Carlos" configurado em seu perfil
  Quando o operador selecionar a Mensagem Rápida pela caixa de texto e enviar imediatamente (sem agendar)
  Então o contato recebe no WhatsApp a mensagem "Olá, Ana, tudo bem?"
  E o chat na plataforma Poli exibe "Olá, Ana, tudo bem?"
  E o campo message_body_html não contém o placeholder "[contact_first_name]"
```

---

## ✅ Validação por Agente Crítico Independente

Vou analisar cada cenário contra os 5 critérios definidos.

---

## Análise por Critério

**CT-AGENDAMENTO-001**
Rastreabilidade: OK — cobre critério "Agendar Template com variáveis → cliente recebe texto interpolado no WhatsApp".
Duplicatas: OK.
Cobertura: Happy path 1/2.
Assunções: OK.
Excesso técnico: OK.

**CT-AGENDAMENTO-002**
Rastreabilidade: OK — cobre critério "Agendar Mensagem Rápida com variáveis → cliente recebe texto interpolado no WhatsApp".
Duplicatas: OK.
Cobertura: Happy path 2/2.
Assunções: OK.
Excesso técnico: OK.

**CT-AGENDAMENTO-003**
Rastreabilidade: OK — cobre critério "plataforma exibe texto interpolado no chat" para Template. Também cobre implicitamente "message_body_html gravado com texto final interpolado".
Duplicatas: Parcial — depende de CT-001 e reutiliza o fluxo, mas o resultado esperado é diferente (plataforma vs. WhatsApp). Aceitável como cenário separado.
Assunções: O resultado esperado menciona verificar `message_body_html` diretamente na UI ("Campo `message_body_html` não contém..."). Isso é verificação de banco/API, não de UI. O modo está marcado como "UI", o que é inconsistente com a verificação do campo interno.

[CT-AGENDAMENTO-003] | [Excesso técnico / Assunção indevida] | Resultado esperado menciona verificar `message_body_html` diretamente, mas o modo é "UI" — QA não consegue inspecionar esse campo pela interface. A verificação do campo é responsabilidade de CT-011. | Remover a linha sobre `message_body_html` do resultado esperado de CT-003, mantendo apenas a verificação visual no chat.

**CT-AGENDAMENTO-004**
Rastreabilidade: OK — cobre "Agendar Mensagem Rápida com variáveis → plataforma exibe texto interpolado no chat" e "message_body_html gravado com texto final interpolado".
Assunções: Mesmo problema de CT-003 — menciona `message_body_html` em cenário de modo "UI".

[CT-AGENDAMENTO-004] | [Excesso técnico / Assunção indevida] | Resultado esperado mistura verificação de UI com verificação direta de campo interno (`message_body_html`) em cenário modo "UI". | Remover referência a `message_body_html` do resultado esperado. A cobertura desse campo está em CT-011.

**CT-AGENDAMENTO-005**
Rastreabilidade: OK — cobre critério de regressão "Envio direto pela caixa de texto continua funcionando normalmente".
Assunções: OK.
Excesso técnico: OK.

**CT-AGENDAMENTO-006**
Rastreabilidade: OK — cobre regra de negócio implícita de dados nulos (risco mapeado no Bloco 2) e critério de ausência de crash.
Assunções: O resultado esperado menciona "fallback (ex: campo em branco ou valor padrão definido)". O card não especifica comportamento de fallback para variáveis nulas — apenas que `message_body_html` não pode conter placeholders brutos. Assumir "valor padrão" é indevido.

[CT-AGENDAMENTO-006] | [Assunção indevida] | Resultado esperado assume comportamento de fallback ("valor padrão definido") que o card não especifica. O card só garante que não deve haver placeholder literal e não deve haver crash. | Alterar resultado esperado para: "Worker não crasha. Mensagem é enviada sem placeholder literal. O comportamento exato para valor nulo (em branco ou omissão) deve ser confirmado com o time de desenvolvimento antes da execução."

**CT-AGENDAMENTO-007**
Rastreabilidade: OK — deriva do risco de variável nula, consistente com a regra de negócio "[operator_name] deve ser substituído antes do envio".
Assunções: Mesmo problema de CT-006 — menciona "fallback ou vazio" sem base no card.

[CT-AGENDAMENTO-007] | [Assunção indevida] | Resultado esperado menciona "substituída por fallback ou vazio" sem definição no card. | Alterar para: "Worker não crasha. `[operator_name]` não é entregue como placeholder literal ao cliente. Comportamento de fallback deve ser confirmado com desenvolvimento."

**CT-AGENDAMENTO-008**
Rastreabilidade: OK — cobre risco "Template sem variáveis quebrar com a nova etapa de interpolação" do Bloco 2. Não está explicitamente nos critérios de aceite, mas é borda de compatibilidade diretamente relacionada à correção descrita.
Cobertura: Cenário de borda válido.
Assunções: OK.

**CT-AGENDAMENTO-009**
Rastreabilidade: OK — cobre regra de negócio (múltiplas variáveis devem ser substituídas) e risco mapeado.
Assunções: Menciona "outra variável suportada" sem especificar qual — pré-requisito ambíguo.

[CT-AGENDAMENTO-009] | [Assunção indevida] | Pré-requisito "outra variável suportada" não especifica qual variável usar. QA não sabe quais variáveis além de `[contact_first_name]` e `[operator_name]` são suportadas pelo worker. | Alterar pré-requisito para listar apenas as variáveis confirmadas no card: `[contact_first_name]` e `[operator_name]`. Se uma terceira variável for necessária, especificá-la por nome ou removê-la do escopo.

**CT-AGENDAMENTO-010**
Rastreabilidade: OK — cobre o risco de segurança mapeado no Bloco 2. Cobertura de segurança cumprida.
Assunções: O resultado esperado menciona "Mensagem enviada com texto escapado ou sanitizado". O card não especifica como a sanitização deve funcionar (escape vs. remoção). A expectativa é razoável como requisito de segurança implícito, mas o comportamento exato não está definido.

[CT-AGENDAMENTO-010] | [Assunção indevida] | Resultado esperado assume que o sistema sanitizará/escapará o conteúdo, mas o card não descreve esse comportamento — apenas que variáveis devem ser interpoladas. Sanitização pode ser comportamento esperado de outra camada. | Alterar resultado esperado para: "Conteúdo não executa como script na UI. `message_body_html` não contém payload ativo. O comportamento de sanitização (escape, remoção ou rejeição) deve ser confirmado com desenvolvimento."

**CT-AGENDAMENTO-011**
Rastreabilidade: OK — cobre diretamente o critério "Coluna message_body_html gravada com texto final interpolado, sem placeholders".
Modo: Marcado como "API" — correto.
Assunções: Assume existência de endpoint `GET /messages/{id}`. O card não menciona esse endpoint. Porém, a verificação do campo é um critério de aceite explícito, e a única forma viável sem acesso direto ao banco é via API. Aceitável, mas deve sinalizar que o endpoint precisa ser confirmado.

[CT-AGENDAMENTO-011] | [Assunção indevida] | Assume existência e formato do endpoint `GET /messages/{id}` sem base no card. | Adicionar ao pré-requisito: "Confirmar com desenvolvimento o endpoint disponível para consulta da mensagem gerada e o nome exato do campo na resposta."

**CT-AGENDAMENTO-012**
Rastreabilidade: O card não menciona "momento de interpolação" (no agendamento vs. no disparo). O cenário assume que a interpolação deve ocorrer no momento do disparo — isso é um comportamento técnico não descrito nos critérios de aceite.

[CT-AGENDAMENTO-012] | [Assunção indevida] | O card não especifica se a interpolação deve ocorrer no momento do agendamento ou no momento do disparo. O cenário assume o disparo, o que pode ou não ser o comportamento implementado. | Reformular o resultado esperado removendo a asserção sobre "momento da interpolação", ou marcar como cenário exploratório a ser confirmado com desenvolvimento antes da execução. Alternativamente, mesclar com CT-AGENDAMENTO-002 se o fluxo for idêntico.

---

## Análise de Cobertura Global

- Happy path: CT-001 (Template/WhatsApp), CT-002 (MR/WhatsApp), CT-003 (Template/plataforma), CT-004 (MR/plataforma) — 4 happy paths, cobrindo todos os 4 critérios de entrega. OK.
- Regressão: CT-005. OK.
- Negativos/Borda: CT-006, CT-007, CT-008, CT-009 — 4 cenários. Supera o mínimo de 5 (negativos+borda). OK.
- Segurança: CT-010. OK.
- API/campo: CT-011. OK.
- Cobertura mínima: cumprida e superada.

**Lacuna identificada:** nenhum cenário verifica o comportamento quando o agendamento é criado para um contato cujos dados são alterados entre o agendamento e o disparo (ex: nome do contato atualizado após o agendamento). Isso é relevante para CT-012, mas o cenário atual assume comportamento não definido. Sugestão de adição como cenário exploratório.

---

## BLOCO 3 — Tabela Revisada (com correções aplicadas)

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-AGENDAMENTO-001 | Agendar Template com variável — entrega correta ao cliente | Contato com `first_name` preenchido; Template ativo com variável `[contact_first_name]`; operador logado com nome preenchido | 1. Abrir conversa do contato. 2. Selecionar "Agendar mensagem". 3. Escolher Template com `[contact_first_name]`. 4. Definir data/hora futura. 5. Confirmar agendamento. 6. Aguardar o disparo. 7. Verificar mensagem recebida no WhatsApp do contato. | Contato recebe mensagem com nome real (ex: "Olá, Rodrigo") — sem placeholder literal `[contact_first_name]`. | Alta | UI | — |
| CT-AGENDAMENTO-002 | Agendar Mensagem Rápida com variáveis — entrega correta ao cliente | Contato com `first_name` preenchido; Mensagem Rápida cadastrada com `[contact_first_name]` e `[operator_name]`; operador logado com nome preenchido | 1. Abrir conversa. 2. Selecionar "Agendar mensagem". 3. Escolher Mensagem Rápida com variáveis. 4. Definir data/hora futura. 5. Confirmar. 6. Aguardar disparo. 7. Verificar mensagem no WhatsApp do contato. | Contato recebe texto com nome do contato e do operador interpolados corretamente. Nenhum placeholder literal visível. | Alta | UI | — |
| CT-AGENDAMENTO-003 | Plataforma exibe texto interpolado no chat após disparo de Template | Mesmo pré-requisito de CT-AGENDAMENTO-001 | 1. Executar CT-AGENDAMENTO-001. 2. Após disparo, abrir o chat na plataforma Poli. 3. Localizar a mensagem enviada pelo agendamento. | A mensagem exibida no chat da plataforma contém o texto final (ex: "Olá, Rodrigo"), sem tags brutas. Nenhum placeholder entre colchetes visível na interface. | Alta | UI | CT-AGENDAMENTO-001 |
| CT-AGENDAMENTO-004 | Plataforma exibe texto interpolado no chat após disparo de Mensagem Rápida | Mesmo pré-requisito de CT-AGENDAMENTO-002 | 1. Executar CT-AGENDAMENTO-002. 2. Após disparo, abrir o chat na plataforma Poli. 3. Localizar a mensagem enviada pelo agendamento. | Mensagem no chat exibe texto final interpolado, sem nenhum placeholder visível entre colchetes. | Alta | UI | CT-AGENDAMENTO-002 |
| CT-AGENDAMENTO-005 | Envio direto pela caixa de texto não regride | Contato e operador com dados completos; Mensagem Rápida com variáveis `[contact_first_name]` e `[operator_name]` | 1. Abrir conversa. 2. Usar caixa de texto para selecionar Mensagem Rápida com variáveis. 3. Enviar imediatamente (sem agendar). 4. Verificar mensagem no WhatsApp e no chat da plataforma. | Mensagem enviada diretamente continua sendo interpolada corretamente. Nenhuma regressão no fluxo direto. | Alta | UI | — |
| CT-AGENDAMENTO-006 | Agendar Template com contato sem `first_name` preenchido | Contato com campo `first_name` vazio/nulo; Template com `[contact_first_name]` | 1. Abrir conversa do contato sem nome. 2. Agendar Template com `[contact_first_name]`. 3. Aguardar disparo. | Worker não crasha. Mensagem é enviada sem placeholder literal `[contact_first_name]`. O comportamento exato para valor nulo (campo em branco, omissão ou valor padrão) deve ser confirmado com desenvolvimento antes da execução. | Alta | UI | — |
| CT-AGENDAMENTO-007 | Agendar Mensagem Rápida com operador sem nome preenchido | Operador logado com campo `name` vazio/nulo; Mensagem Rápida com `[operator_name]` | 1. Logar como operador sem nome configurado. 2. Agendar Mensagem Rápida com `[operator_name]`. 3. Aguardar disparo. | Worker não crasha. `[operator_name]` não é entregue como placeholder literal ao cliente. Comportamento de fallback (em branco, omissão ou padrão) deve ser confirmado com desenvolvimento antes da execução. | Média | UI | — |
| CT-AGENDAMENTO-008 | Agendar Template sem variáveis — compatibilidade com nova etapa de interpolação | Template sem nenhuma variável dinâmica; contato ativo | 1. Agendar Template estático (sem `[...]`). 2. Aguardar disparo. 3. Verificar entrega no WhatsApp e no chat da plataforma. | Template enviado corretamente. A nova etapa de interpolação no worker não quebra templates sem variáveis. | Média | UI | — |
| CT-AGENDAMENTO-009 | Agendar Mensagem Rápida com múltiplas variáveis — todas interpoladas | Contato e operador com todos os campos preenchidos; Mensagem Rápida contendo `[contact_first_name]` e `[operator_name]` em posições distintas no mesmo texto | 1. Agendar Mensagem Rápida com `[contact_first_name]` e `[operator_name]` no corpo da mensagem. 2. Aguardar disparo. 3. Verificar texto recebido no WhatsApp e no chat da plataforma. | Ambas as variáveis substituídas corretamente e nas posições corretas no texto. Nenhum placeholder residual. | Média | UI | — |
| CT-AGENDAMENTO-010 | Injeção de conteúdo via campo de variável do contato | Acesso à API para criar contato com `first_name` contendo payload malicioso; Mensagem Rápida com `[contact_first_name]` | 1. Criar contato com `first_name = "<script>alert(1)</script>"` via `POST /contacts`. 2. Agendar Mensagem Rápida com `[contact_first_name]` para esse contato. 3. Aguardar disparo. 4. Verificar chat na plataforma. | Conteúdo não executa como script na UI da plataforma. `message_body_html` não contém payload ativo. O comportamento exato de sanitização (escape, remoção ou rejeição) deve ser confirmado com desenvolvimento. | Média | API + UI | — |
| CT-AGENDAMENTO-011 | Verificar campo `message_body_html` via API após disparo de Mensagem Rápida agendada | Acesso ao endpoint de consulta de mensagens (confirmar endpoint e formato com desenvolvimento); CT-AGENDAMENTO-002 executado com sucesso | 1. Executar CT-AGENDAMENTO-002. 2. Após disparo, consultar o endpoint de mensagens para obter a mensagem gerada. 3. Inspecionar campo `message_body_html` na resposta. | `message_body_html` retorna texto completamente interpolado. Nenhum placeholder (`[contact_first_name]`, `[operator_name]` etc.) presente no valor do campo. HTTP 200. | Alta | API | CT-AGENDAMENTO-002 |
| CT-AGENDAMENTO-012 | Agendar Mensagem Rápida — verificar interpolação no momento do disparo (exploratório) | Contato com dados completos; agendamento para daqui a 2 minutos; acesso para alterar `first_name` do contato entre o agendamento e o disparo | 1. Anotar `first_name` atual do contato. 2. Agendar Mensagem Rápida com `[contact_first_name]`. 3. Antes do disparo, alterar o `first_name` do contato para um valor diferente. 4. Aguardar disparo. 5. Verificar qual nome foi entregue no WhatsApp. | **Cenário exploratório** — resultado a ser documentado conforme comportamento observado e confirmado com desenvolvimento. Permite identificar se a interpolação usa dados do momento do agendamento ou do momento do disparo. | Média | UI | — |

---

**Problemas encontrados:**

| CT-ID | Critério violado | Problema | Sugestão aplicada |
|---|---|---|---|
| CT-AGENDAMENTO-003 | Excesso técnico / Assunção indevida | Resultado esperado menciona verificação de `message_body_html` em cenário modo UI | Removida a referência ao campo interno; mantida apenas verificação visual no chat |
| CT-AGENDAMENTO-004 | Excesso técnico / Assunção indevida | Mesmo problema de CT-003 | Idem — referência ao campo removida do resultado esperado |
| CT-AGENDAMENTO-006 | Assunção indevida | Resultado assumia comportamento de fallback não definido no card | Resultado reformulado para indicar que o comportamento deve ser confirmado com desenvolvimento |
| CT-AGENDAMENTO-007 | Assunção indevida | Idem CT-006 | Idem |
| CT-AGENDAMENTO-009 | Assunção indevida | Pré-requisito mencionava "outra variável suportada" sem especificar qual | Escopo limitado às variáveis confirmadas no card |
| CT-AGENDAMENTO-010 | Assunção indevida | Resultado assumia sanitização como comportamento definido | Resultado reformulado para observação + confirmação com desenvolvimento |
| CT-AGENDAMENTO-011 | Assunção indevida | Assumia endpoint `GET /messages/{id}` sem base no card | Adicionado pré-requisito de confirmação do endpoint com desenvolvimento |
| CT-AGENDAMENTO-012 | Assunção indevida | Assumia que interpolação ocorre no disparo — comportamento não descrito no card | Reformulado como cenário exploratório com instrução para documentar resultado observado |

---

Aprovados: 4 | Com problemas: 8 | Sugestões aplicadas: CT-AGENDAMENTO-003, CT-AGENDAMENTO-004, CT-AGENDAMENTO-006, CT-AGENDAMENTO-007, CT-AGENDAMENTO-009, CT-AGENDAMENTO-010, CT-AGENDAMENTO-011, CT-AGENDAMENTO-012
