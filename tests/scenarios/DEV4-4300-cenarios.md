# Cenários de Teste — DEV4-4300
> Card: Falha na formatação de caracteres especiais (asteriscos e underlines) na Nova Interface
> Gerado em: 2026-06-03
> Card atualizado em: 2026-06-02T13:33:22.729-0300

---

## MÓDULO: COMPOSE

## RESUMO DO CARD

O card DEV4-4300 corrige um bug no editor da Nova Interface que aplica autoformatação Markdown em sequências de asteriscos (`*`) e underlines (`_`), alterando o texto antes do envio. O operador digita um texto e o destinatário recebe uma versão diferente, com caracteres substituídos ou removidos. O impacto é crítico para envio de chaves PIX, que frequentemente utilizam esses caracteres como separadores ou mascaramento, tornando a informação inválida ao chegar ao cliente.

---

## BLOCO 1 — Estratégia de Teste

**Escopo:** Editor de mensagens da Nova Interface — comportamento de envio de texto contendo `*` e `_` em sequências simples, múltiplas e mistas.
**Tipos de teste:** Funcional (validação dos três cenários descritos no bug), Regressão (garantir que formatação legítima do WhatsApp — negrito e itálico — continua funcionando), UX (verificação visual no editor antes do envio), e Fronteira (combinações extremas de caracteres especiais).
**Prioridade de execução:** Alta — os cenários de correção do bug devem ser executados primeiro, seguidos imediatamente dos testes de regressão de formatação WhatsApp, pois a correção pode quebrar o comportamento esperado de negrito/itálico.
**Riscos principais:** A correção pode desabilitar toda a formatação Markdown (quebrando negrito/itálico válidos); a alteração pode não cobrir todas as combinações de `*` e `_`; o comportamento pode variar entre canais (WhatsApp vs outros).

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Correção remove formatação legítima (*negrito* e _itálico_) no WhatsApp | A | A | 🔴 Alta |
| Chave PIX com `*` ou `_` continua sendo alterada após correção | M | A | 🔴 Alta |
| Combinações não mapeadas de `*` e `_` ainda sofrem autoformatação | M | A | 🔴 Alta |
| Comportamento diverge entre Nova Interface e interface legada | M | M | 🟡 Média |
| Editor altera texto em templates/respostas rápidas com `*` ou `_` | M | M | 🟡 Média |
| Outros caracteres especiais (`~`, `` ` ``) passam a ter comportamento inconsistente | B | M | 🟡 Média |
| Regressão em campos de texto fora do compose (ex: anotações internas) | B | B | 🟢 Baixa |

---

## BLOCO 3 — Tabela de Cenários

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-COMPOSE-001 | Envio de texto com asteriscos triplos | Conversa ativa na Nova Interface; operador logado | 1. Abrir conversa ativa. 2. Digitar `teste***teste` no campo de mensagem. 3. Verificar preview do texto no editor. 4. Enviar a mensagem. 5. Verificar no dispositivo destinatário o texto recebido. | O destinatário recebe exatamente `teste***teste` sem nenhuma alteração. O preview no editor exibe o texto sem modificação. | 🔴 Alta | UI | — |
| CT-COMPOSE-002 | Envio de texto com underlines triplos | Conversa ativa na Nova Interface; operador logado | 1. Abrir conversa ativa. 2. Digitar `teste___teste` no campo de mensagem. 3. Verificar preview do texto no editor. 4. Enviar a mensagem. 5. Verificar no dispositivo destinatário o texto recebido. | O destinatário recebe exatamente `teste___teste` sem nenhuma alteração. | 🔴 Alta | UI | — |
| CT-COMPOSE-003 | Envio de texto com asterisco-underline-asterisco | Conversa ativa na Nova Interface; operador logado | 1. Abrir conversa ativa. 2. Digitar `teste*_*teste` no campo de mensagem. 3. Verificar preview do texto no editor. 4. Enviar a mensagem. 5. Verificar no dispositivo destinatário o texto recebido. | O destinatário recebe exatamente `teste*_*teste` sem nenhuma alteração. | 🔴 Alta | UI | — |
| CT-COMPOSE-004 | Envio de chave PIX com asteriscos | Conversa ativa; operador logado; chave PIX de exemplo com `*` | 1. Abrir conversa ativa. 2. Digitar uma chave PIX no formato `00000000*1234*00` (ou similar com `*`). 3. Verificar preview no editor. 4. Enviar a mensagem. 5. Verificar o texto recebido pelo destinatário. | A chave PIX é recebida integralmente, sem remoção ou substituição de `*`. | 🔴 Alta | UI | — |
| CT-COMPOSE-005 | Envio de chave PIX com underlines | Conversa ativa; operador logado; chave PIX de exemplo com `_` | 1. Abrir conversa ativa. 2. Digitar uma chave PIX no formato `usuario_banco_001` (ou similar com `_`). 3. Verificar preview no editor. 4. Enviar a mensagem. 5. Verificar o texto recebido pelo destinatário. | A chave PIX é recebida integralmente, sem remoção ou substituição de `_`. | 🔴 Alta | UI | — |
| CT-COMPOSE-006 | Regressão — negrito WhatsApp ainda funciona | Conversa ativa; operador logado | 1. Abrir conversa ativa. 2. Digitar `*texto em negrito*` no editor. 3. Enviar a mensagem. 4. Verificar no dispositivo destinatário como o texto é renderizado. | O destinatário recebe a mensagem com `texto em negrito` renderizado em negrito no WhatsApp (formatação preservada). | 🔴 Alta | UI | — |
| CT-COMPOSE-007 | Regressão — itálico WhatsApp ainda funciona | Conversa ativa; operador logado | 1. Abrir conversa ativa. 2. Digitar `_texto em itálico_` no editor. 3. Enviar a mensagem. 4. Verificar no dispositivo destinatário como o texto é renderizado. | O destinatário recebe a mensagem com `texto em itálico` renderizado em itálico no WhatsApp (formatação preservada). | 🔴 Alta | UI | — |
| CT-COMPOSE-008 | Asterisco único não altera texto | Conversa ativa; operador logado | 1. Abrir conversa ativa. 2. Digitar `teste*teste` no editor. 3. Enviar a mensagem. 4. Verificar o texto recebido pelo destinatário. | O destinatário recebe `teste*teste` sem alteração (um asterisco isolado não dispara formatação). | 🟡 Média | UI | — |
| CT-COMPOSE-009 | Underline único não altera texto | Conversa ativa; operador logado | 1. Abrir conversa ativa. 2. Digitar `teste_teste` no editor. 3. Enviar a mensagem. 4. Verificar o texto recebido pelo destinatário. | O destinatário recebe `teste_teste` sem alteração. | 🟡 Média | UI | — |
| CT-COMPOSE-010 | Asteriscos ao início e fim de palavra | Conversa ativa; operador logado | 1. Abrir conversa ativa. 2. Digitar `**teste**` no editor (dois asteriscos em cada lado). 3. Enviar a mensagem. 4. Verificar o texto recebido. | O destinatário recebe `**teste**` sem alteração (dois asteriscos não são formatação WhatsApp válida). | 🟡 Média | UI | — |
| CT-COMPOSE-011 | Texto misto formatado e com sequências especiais | Conversa ativa; operador logado | 1. Abrir conversa ativa. 2. Digitar `*negrito* e chave PIX: 123***456` no editor. 3. Enviar a mensagem. 4. Verificar o texto recebido. | O destinatário recebe `*negrito*` renderizado em negrito E `123***456` sem alteração dos asteriscos no número. | 🟡 Média | UI | — |
| CT-COMPOSE-012 | Envio via API — texto com asteriscos não é alterado | ⚠️ Bloqueável — criável via API: `POST /api/v1/messages` | 1. Realizar chamada `POST /api/v1/messages` com corpo `{"text": "teste***teste", "conversation_id": "<id>"}`. 2. Verificar o payload enviado ao canal. 3. Verificar o texto recebido pelo destinatário. | API retorna HTTP 200/201. O texto `teste***teste` é entregue ao destinatário sem alteração. Nenhuma sanitização ocorre no backend. | 🔴 Alta | API | — |
| CT-COMPOSE-013 | Envio via API — chave PIX preservada | ⚠️ Bloqueável — criável via API: `POST /api/v1/messages` | 1. Realizar chamada `POST /api/v1/messages` com corpo contendo chave PIX com `*` e `_`. 2. Verificar resposta da API. 3. Confirmar entrega ao destinatário. | API retorna HTTP 200/201. Chave PIX é entregue integralmente, sem alteração de nenhum caractere. | 🔴 Alta | API | CT-COMPOSE-012 |
| CT-COMPOSE-014 | Segurança — injeção de Markdown via payload API | ⚠️ Bloqueável — criável via API: `POST /api/v1/messages` | 1. Realizar chamada `POST /api/v1/messages` com payload contendo sequência `*_*_*_*` repetida 50 vezes. 2. Verificar resposta da API. 3. Verificar o texto recebido pelo destinatário e logs do sistema. | API retorna HTTP 200/201 sem erro ou timeout. O texto é entregue literalmente sem processamento excessivo ou crash do parser. Nenhuma informação sensível é exposta nos logs. | 🔴 Alta | API | CT-COMPOSE-012 |
| CT-COMPOSE-015 | Texto apenas com caracteres especiais | Conversa ativa; operador logado | 1. Abrir conversa ativa. 2. Digitar apenas `***___***` no editor (sem texto alfanumérico). 3. Enviar a mensagem. 4. Verificar o texto recebido. | O destinatário recebe `***___***` exatamente como digitado. O editor não bloqueia nem modifica o envio. | 🟡 Média | UI | — |
| CT-COMPOSE-016 | Comportamento na interface legada (regressão) | Acesso à interface legada da plataforma; conversa ativa | 1. Acessar interface legada (não a Nova Interface). 2. Digitar `teste***teste` no editor. 3. Enviar a mensagem. 4. Verificar o texto recebido. | O comportamento da interface legada não é afetado pela correção. O texto é entregue como esperado no contexto da interface legada. | 🟡 Média | UI | — |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Funcionalidade: Preservação de caracteres especiais no editor de mensagens

  Cenário: Envio de sequência de asteriscos triplos sem alteração
    Dado que o operador está logado na Nova Interface
    E existe uma conversa ativa aberta no editor de mensagens
    Quando o operador digita "teste***teste" no campo de mensagem
    E visualiza o preview do texto no editor
    Então o preview exibe exatamente "teste***teste" sem modificação
    Quando o operador envia a mensagem
    Então o destinatário recebe exatamente "teste***teste"
    E nenhum asterisco é removido ou substituído por espaço

  Cenário: Envio de chave PIX com asteriscos preservada integralmente
    Dado que o operador está logado na Nova Interface
    E existe uma conversa ativa aberta no editor de mensagens
    Quando o operador digita uma chave PIX no formato "00000000*1234*00" no campo de mensagem
    E envia a mensagem
    Então o destinatário recebe a chave PIX "00000000*1234*00" sem nenhuma alteração
    E a chave PIX permanece válida e utilizável pelo destinatário

  Cenário: Regressão — formatação negrito WhatsApp continua funcionando após correção
    Dado que o operador está logado na Nova Interface
    E existe uma conversa ativa aberta no editor de mensagens
    Quando o operador digita "*texto em negrito*" no campo de mensagem
    E envia a mensagem
    Então o destinatário recebe a mensagem com "texto em negrito" renderizado em negrito no WhatsApp
    E a formatação legítima de negrito não é afetada pela correção do bug

  Cenário: Regressão — formatação itálico WhatsApp continua funcionando após correção
    Dado que o operador está logado na Nova Interface
    E existe uma conversa ativa aberta no editor de mensagens
    Quando o operador digita "_texto em itálico_" no campo de mensagem
    E envia a mensagem
    Então o destinatário recebe a mensagem com "texto em itálico" renderizado em itálico no WhatsApp
    E a formatação legítima de itálico não é afetada pela correção do bug
```

---

## ✅ Validação por Agente Crítico Independente

Vou analisar cada cenário sistematicamente contra os cinco critérios.

---

## Análise por Cenário

**CT-COMPOSE-001** — Sem problemas. Rastreável ao CA "teste***teste". Fluxo claro.

**CT-COMPOSE-002** — Sem problemas. Rastreável ao CA "teste___teste".

**CT-COMPOSE-003** — Sem problemas. Rastreável ao CA "teste*_*teste".

**CT-COMPOSE-004** — Sem problemas. Rastreável ao CA de chave PIX com *.

**CT-COMPOSE-005** — Sem problemas. Rastreável ao CA de chave PIX com _.

**CT-COMPOSE-006** — Sem problemas. Rastreável à regressão negrito.

**CT-COMPOSE-007** — Sem problemas. Rastreável à regressão itálico.

**CT-COMPOSE-008** — [CT-COMPOSE-008] | **Assunção indevida** | O card não menciona o comportamento de asterisco único. O CA cobre "teste***teste", não "teste*teste". O resultado esperado ("asterisco isolado não dispara formatação") é uma inferência sobre como o WhatsApp processa `*texto*` — mas nesse caso `teste*teste` sem par não deveria renderizar nada, o que é comportamento do WhatsApp, não da plataforma. O cenário pode ser mantido como borda, mas o resultado esperado deve ser reformulado para focar em "a plataforma não altera o texto" e não no comportamento de renderização do WhatsApp. | Manter o cenário, ajustar resultado esperado para: "O destinatário recebe `teste*teste` sem alteração pela plataforma. Renderização no WhatsApp é responsabilidade do canal e fora do escopo."

**CT-COMPOSE-009** — [CT-COMPOSE-009] | **Assunção indevida** | Mesmo problema do CT-COMPOSE-008 para underscore único. O card não cobre este caso explicitamente. | Ajustar resultado esperado com a mesma ressalva sobre escopo.

**CT-COMPOSE-010** — [CT-COMPOSE-010] | **Assunção indevida** | O resultado esperado afirma "dois asteriscos não são formatação WhatsApp válida" — isso é uma assunção sobre o protocolo WhatsApp não mencionada no card. Além disso, `**negrito**` pode ser interpretado como Markdown, não WhatsApp nativo, criando ambiguidade. | Remover a afirmação sobre validade no WhatsApp. Resultado esperado deve focar apenas em: "A plataforma não modifica `**teste**` antes do envio."

**CT-COMPOSE-011** — [CT-COMPOSE-011] | **Assunção indevida + cobertura** | O resultado esperado afirma que `*negrito*` será renderizado em negrito no destinatário. Isso combina verificação de formatação (coberta em CT-006) com verificação de não-alteração de sequência especial. Há sobreposição com CT-006. | Reformular foco: o objetivo real deste cenário é verificar que a correção do bug não afeta partes distintas do mesmo texto. Ajustar resultado para focar na coexistência, sem repetir a verificação de renderização já coberta em CT-006.

**CT-COMPOSE-012** — [CT-COMPOSE-012] | **Assunção indevida + excesso técnico** | O pré-requisito `⚠️ Bloqueável — criável via API: POST /api/v1/messages` assume que a API é acessível para QA e que o endpoint e payload estão documentados e disponíveis. O card não menciona camada de API — o bug reportado é no editor da Nova Interface (frontend). Testar a API faz sentido como borda, mas a justificativa "Nenhuma sanitização ocorre no backend" é uma assunção arquitetural não descrita no card. | Manter como cenário de borda API, mas remover a asserção sobre ausência de sanitização no backend. Resultado esperado deve ser: "Texto é entregue ao destinatário sem alteração, independente da camada."

**CT-COMPOSE-013** — [CT-COMPOSE-013] | **Rastreabilidade parcial + duplicata parcial** | Cobre o mesmo fluxo de CT-COMPOSE-004/005 mas via API. Não há problema em cobrir ambas as camadas, porém a dependência de CT-COMPOSE-012 é desnecessária — os cenários de chave PIX via API são independentes entre si. | Remover dependência de CT-012 ou justificá-la apenas por ordem de execução, não por bloqueio lógico.

**CT-COMPOSE-014** — [CT-COMPOSE-014] | **Assunção indevida** | Classificado como "Segurança", o resultado esperado inclui "Nenhuma informação sensível é exposta nos logs" — isso é uma verificação de segurança que requer acesso a logs de sistema, fora do escopo de QA funcional padrão e não mencionado no card. O cenário de stress/fuzzing do parser é válido como borda, mas o critério de logs deve ser removido ou movido para um cenário de segurança explícito com pré-requisito de acesso a logs. | Separar: manter o cenário de stress do parser sem a asserção de logs, ou criar CT separado com pré-requisito explícito de acesso a infraestrutura.

**CT-COMPOSE-015** — Sem problemas. Cenário de borda válido.

**CT-COMPOSE-016** — [CT-COMPOSE-016] | **Assunção indevida** | O resultado esperado é vago: "O comportamento da interface legada não é afetado" sem especificar qual comportamento esperado. O card foca na Nova Interface; o legado não é mencionado nos CAs. Se o legado nunca teve esse bug, o cenário não tem resultado esperado definível. | Reformular: especificar que o texto `teste***teste` deve chegar ao destinatário sem alteração também na interface legada, ou remover o cenário se não há evidência de que a correção toca o legado.

**Gherkin — CT-COMPOSE-004 (PIX)** — O Gherkin afirma "a chave PIX permanece válida e utilizável pelo destinatário" — validação de usabilidade financeira que não pode ser verificada por QA da plataforma. | Remover esse passo do Gherkin.

---

## Verificação de Cobertura Mínima

| Tipo | Mínimo | Presente |
|---|---|---|
| Happy path | 2 | CT-001, CT-002, CT-003, CT-004, CT-005 (5) |
| Negativos/erro | 3 | CT-006, CT-007 (regressão) + CT-016 = parcial; CT-008/009 são borda |
| Borda | 2 | CT-008, CT-009, CT-010, CT-015 (4) |
| Segurança | 1 | CT-014 (presente, com ressalva) |

Cobertura mínima atingida.

---

## BLOCO 3 — Tabela Revisada Completa

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-COMPOSE-001 | Envio de texto com asteriscos triplos | Conversa ativa na Nova Interface; operador logado | 1. Abrir conversa ativa. 2. Digitar `teste***teste` no campo de mensagem. 3. Verificar preview do texto no editor. 4. Enviar a mensagem. 5. Verificar no dispositivo destinatário o texto recebido. | O destinatário recebe exatamente `teste***teste` sem nenhuma alteração. O preview no editor exibe o texto sem modificação. | Alta | UI | — |
| CT-COMPOSE-002 | Envio de texto com underlines triplos | Conversa ativa na Nova Interface; operador logado | 1. Abrir conversa ativa. 2. Digitar `teste___teste` no campo de mensagem. 3. Verificar preview do texto no editor. 4. Enviar a mensagem. 5. Verificar no dispositivo destinatário o texto recebido. | O destinatário recebe exatamente `teste___teste` sem nenhuma alteração. | Alta | UI | — |
| CT-COMPOSE-003 | Envio de texto com asterisco-underline-asterisco | Conversa ativa na Nova Interface; operador logado | 1. Abrir conversa ativa. 2. Digitar `teste*_*teste` no campo de mensagem. 3. Verificar preview do texto no editor. 4. Enviar a mensagem. 5. Verificar no dispositivo destinatário o texto recebido. | O destinatário recebe exatamente `teste*_*teste` sem nenhuma alteração. | Alta | UI | — |
| CT-COMPOSE-004 | Envio de chave PIX com asteriscos | Conversa ativa; operador logado; chave PIX de exemplo com `*` | 1. Abrir conversa ativa. 2. Digitar uma chave PIX no formato `00000000*1234*00` no campo de mensagem. 3. Verificar preview no editor. 4. Enviar a mensagem. 5. Verificar o texto recebido pelo destinatário. | A chave PIX é recebida integralmente, sem remoção ou substituição de `*`. O texto recebido é idêntico ao digitado. | Alta | UI | — |
| CT-COMPOSE-005 | Envio de chave PIX com underlines | Conversa ativa; operador logado; chave PIX de exemplo com `_` | 1. Abrir conversa ativa. 2. Digitar uma chave PIX no formato `usuario_banco_001` no campo de mensagem. 3. Verificar preview no editor. 4. Enviar a mensagem. 5. Verificar o texto recebido pelo destinatário. | A chave PIX é recebida integralmente, sem remoção ou substituição de `_`. O texto recebido é idêntico ao digitado. | Alta | UI | — |
| CT-COMPOSE-006 | Regressão — negrito WhatsApp ainda funciona | Conversa ativa; operador logado | 1. Abrir conversa ativa. 2. Digitar `*texto em negrito*` no editor. 3. Enviar a mensagem. 4. Verificar no dispositivo destinatário como o texto é renderizado. | O destinatário recebe a mensagem com `texto em negrito` renderizado em negrito no WhatsApp. A formatação legítima de negrito não é afetada pela correção do bug. | Alta | UI | — |
| CT-COMPOSE-007 | Regressão — itálico WhatsApp ainda funciona | Conversa ativa; operador logado | 1. Abrir conversa ativa. 2. Digitar `_texto em itálico_` no editor. 3. Enviar a mensagem. 4. Verificar no dispositivo destinatário como o texto é renderizado. | O destinatário recebe a mensagem com `texto em itálico` renderizado em itálico no WhatsApp. A formatação legítima de itálico não é afetada pela correção do bug. | Alta | UI | — |
| CT-COMPOSE-008 | Asterisco único não altera texto | Conversa ativa; operador logado | 1. Abrir conversa ativa. 2. Digitar `teste*teste` no editor. 3. Enviar a mensagem. 4. Verificar o texto recebido pelo destinatário. | A plataforma não altera `teste*teste` antes do envio. O destinatário recebe `teste*teste` sem modificação. A renderização final no WhatsApp é responsabilidade do canal e está fora do escopo deste cenário. | Média | UI | — |
| CT-COMPOSE-009 | Underline único não altera texto | Conversa ativa; operador logado | 1. Abrir conversa ativa. 2. Digitar `teste_teste` no editor. 3. Enviar a mensagem. 4. Verificar o texto recebido pelo destinatário. | A plataforma não altera `teste_teste` antes do envio. O destinatário recebe `teste_teste` sem modificação. A renderização final no WhatsApp é responsabilidade do canal e está fora do escopo deste cenário. | Média | UI | — |
| CT-COMPOSE-010 | Asteriscos duplos ao início e fim de palavra | Conversa ativa; operador logado | 1. Abrir conversa ativa. 2. Digitar `**teste**` no editor. 3. Enviar a mensagem. 4. Verificar o texto recebido pelo destinatário. | A plataforma não modifica `**teste**` antes do envio. O destinatário recebe `**teste**` exatamente como digitado. | Média | UI | — |
| CT-COMPOSE-011 | Texto misto com formatação válida e sequência especial no mesmo campo | Conversa ativa; operador logado | 1. Abrir conversa ativa. 2. Digitar `*negrito* e chave PIX: 123***456` no editor. 3. Enviar a mensagem. 4. Verificar o texto recebido. | A parte `123***456` é recebida sem alteração dos asteriscos. A coexistência de formatação válida e sequência especial no mesmo campo não causa interferência. A verificação de renderização do trecho em negrito está coberta em CT-COMPOSE-006. | Média | UI | — |
| CT-COMPOSE-012 | Envio via API — texto com asteriscos não é alterado | ⚠️ Requer acesso à API: endpoint `POST /api/v1/messages` disponível e documentado | 1. Realizar chamada `POST /api/v1/messages` com corpo `{"text": "teste***teste", "conversation_id": "<id>"}`. 2. Verificar o payload enviado ao canal. 3. Verificar o texto recebido pelo destinatário. | API retorna HTTP 200/201. O texto `teste***teste` é entregue ao destinatário sem alteração. | Alta | API | — |
| CT-COMPOSE-013 | Envio via API — chave PIX preservada | ⚠️ Requer acesso à API: endpoint `POST /api/v1/messages` disponível e documentado | 1. Realizar chamada `POST /api/v1/messages` com corpo contendo chave PIX com `*` e `_`. 2. Verificar resposta da API. 3. Confirmar entrega ao destinatário. | API retorna HTTP 200/201. Chave PIX é entregue integralmente, sem alteração de nenhum caractere. | Alta | API | — |
| CT-COMPOSE-014 | Stress do parser — sequência longa de caracteres especiais | ⚠️ Requer acesso à API: endpoint `POST /api/v1/messages` disponível e documentado | 1. Realizar chamada `POST /api/v1/messages` com payload contendo a sequência `*_*_*_*` repetida 50 vezes. 2. Verificar resposta da API. 3. Verificar o texto recebido pelo destinatário. | API retorna HTTP 200/201 sem erro ou timeout. O texto é entregue literalmente sem processamento excessivo ou crash do parser. | Alta | API | — |
| CT-COMPOSE-015 | Texto composto apenas por caracteres especiais | Conversa ativa; operador logado | 1. Abrir conversa ativa. 2. Digitar apenas `***___***` no editor. 3. Enviar a mensagem. 4. Verificar o texto recebido pelo destinatário. | O destinatário recebe `***___***` exatamente como digitado. O editor não bloqueia nem modifica o envio. | Média | UI | — |
| CT-COMPOSE-016 | Regressão na interface legada — texto com asteriscos não é alterado | Acesso à interface legada da plataforma; conversa ativa | 1. Acessar interface legada (não a Nova Interface). 2. Digitar `teste***teste` no editor. 3. Enviar a mensagem. 4. Verificar o texto recebido pelo destinatário. | O destinatário recebe `teste***teste` sem alteração. A correção aplicada na Nova Interface não afeta o comportamento da interface legada. | Média | UI | — |

---

**Aprovados: 9 | Com problemas: 7 | Sugestões aplicadas: CT-COMPOSE-008, CT-COMPOSE-009, CT-COMPOSE-010, CT-COMPOSE-011, CT-COMPOSE-012, CT-COMPOSE-013, CT-COMPOSE-014, CT-COMPOSE-016**
