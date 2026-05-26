# Cenários de Teste — DEV4-4242
> Card: Botão enviar não aparece em templates com variável de texto longo
> Gerado em: 2026-05-26
> Card atualizado em: 2026-05-26T00:00:00.000Z

---

## BLOCO 1 — Estratégia de Teste

**Escopo:** Bug de renderização que impede o envio de templates com variável preenchida com texto longo — o botão Enviar some ou não é exibido. Afeta todos os tipos de template que possuem variável. A causa raiz (CSS overflow ou remoção do elemento do DOM) não está confirmada.

**Tipos de teste:** Funcional (presença e clicabilidade do botão), Borda (limites de texto curto/longo/vazio), Segurança (XSS via campo de variável), Regressão (fluxo normal de envio sem variável).

**Prioridade de execução:** Cenários 🔴 Alta primeiro — bloqueiam completamente o envio de templates. Em seguida 🟡 Média e 🟢 Baixa.

**Riscos principais:** O bug pode ser intermitente (depende do comprimento exato do texto) e o comportamento "desaparece" não está caracterizado (CSS oculto vs DOM removido vs scroll fora da viewport), o que pode dificultar asserções automatizadas. Templates sem variável devem permanecer íntegros (regressão crítica).

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Botão permanece oculto ou ausente com variável longa em qualquer tipo de template | A | A | 🔴 Crítico |
| Regressão: botão some também em templates sem variável após correção | M | A | 🔴 Crítico |
| Bug intermitente — botão some apenas a partir de determinado comprimento não documentado | A | A | 🔴 Crítico |
| Botão visível mas não clicável (pointer-events: none / disabled) | M | A | 🔴 Alto |
| Texto injetado na variável sobrevive ao envio e é exibido no chat com XSS ativo | B | A | 🔴 Alto |
| Variável com caracteres especiais ou HTML causando layout quebrado | M | M | 🟡 Médio |
| UX degradada para variáveis próximas ao limite (botão parcialmente visível) | M | B | 🟢 Baixo |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-TMPL-001 | Botão visível com variável curta | Acesso ao chat; template com variável disponível para o canal (⚠️ Bloqueável — criável via painel de templates) | 1. Abrir chat com contato de teste. 2. Clicar no ícone de templates. 3. Selecionar template com variável. 4. Preencher a variável com texto curto (ex: "Olá"). 5. Verificar visibilidade do botão Enviar. | Botão Enviar está visível e clicável na tela, sem precisar rolar a página. | 🔴 Alta | UI | — |
| CT-TMPL-002 | Botão visível em template sem variável | Acesso ao chat; template sem variável disponível para o canal | 1. Abrir chat com contato de teste. 2. Clicar no ícone de templates. 3. Selecionar template sem variável. 4. Verificar visibilidade do botão Enviar. | Botão Enviar está visível e clicável. Nenhuma regressão introduzida pela correção do bug. | 🔴 Alta | UI | — |
| CT-TMPL-003 | Envio bem-sucedido com variável curta | Botão Enviar visível (CT-TMPL-001 passou) | 1. Preencher variável com texto curto (ex: "Olá"). 2. Clicar em Enviar. 3. Verificar o chat após envio. | Template aparece no histórico do chat sem mensagem de erro. | 🟡 Média | UI | CT-TMPL-001 |
| CT-TMPL-004 | Botão visível com variável de texto longo | Acesso ao chat; template com variável disponível | 1. Abrir chat com contato de teste. 2. Selecionar template com variável. 3. Preencher a variável com texto longo (ex: 100+ caracteres, uma frase completa). 4. Verificar visibilidade do botão Enviar sem rolar a página. | Botão Enviar está visível e clicável após preenchimento com texto longo. (Valida a correção da causa raiz do bug.) | 🔴 Alta | UI | — |
| CT-TMPL-005 | Botão ausente com variável não preenchida | Acesso ao chat; template com variável disponível | 1. Abrir chat com contato de teste. 2. Selecionar template com variável. 3. Deixar o campo de variável vazio. 4. Verificar estado do botão Enviar. | Botão Enviar está desabilitado ou ausente enquanto variável obrigatória não for preenchida — comportamento de validação esperado pelo produto. | 🟡 Média | UI | — |
| CT-TMPL-006 | Botão visível em todos os tipos de template com variável | Acesso ao chat; pelo menos 2 tipos de template diferentes com variável disponíveis | 1. Repetir o fluxo do CT-TMPL-004 (variável longa) para cada tipo de template disponível com variável (ex: texto simples, com botão de resposta rápida, com imagem). 2. Verificar visibilidade do botão Enviar em cada caso. | Botão Enviar está visível e clicável em todos os tipos de template testados com variável longa. | 🔴 Alta | UI | — |
| CT-TMPL-007 | Botão some ao aumentar progressivamente o texto | Acesso ao chat; template com variável disponível | 1. Selecionar template com variável. 2. Digitar 10 caracteres → verificar botão. 3. Digitar 50 caracteres → verificar botão. 4. Digitar 100 caracteres → verificar botão. 5. Digitar 200 caracteres → verificar botão. | Botão Enviar permanece visível e clicável em todos os comprimentos testados. Caso o botão desapareça em algum ponto, registrar o comprimento exato como evidência. | 🔴 Alta | UI | — |
| CT-TMPL-008 | Botão não muda ao apagar texto longo | Acesso ao chat; template com variável; variável preenchida com texto longo | 1. Preencher variável com 150 caracteres. 2. Verificar botão Enviar. 3. Selecionar tudo e apagar o conteúdo. 4. Digitar texto curto (ex: "Olá"). 5. Verificar botão Enviar novamente. | Botão Enviar retorna à visibilidade normal após redução do texto. Se o botão estava oculto com texto longo, deve reaparecer ao encurtar. | 🟡 Média | UI | — |
| CT-TMPL-009 | Envio de template capturado na rede | Acesso ao chat; template com variável disponível; DevTools aberto na aba Network antes da execução | 1. Abrir DevTools → aba Network. 2. Selecionar template com variável. 3. Preencher variável com texto curto. 4. Clicar em Enviar. 5. Verificar na aba Network a requisição POST para `/v3/contacts/{chat_uuid}/messages`. | A requisição POST é disparada com HTTP 201. O campo `components.body.text` (ou equivalente com a variável substituída) está presente no payload. | 🟡 Média | UI | CT-TMPL-001 |
| CT-TMPL-010 | Seleção de template sem permissão ou indisponível | Acesso ao chat; template HSM desativado ou sem permissão no canal de teste (⚠️ Bloqueável — requer configuração prévia no painel de templates) | 1. Abrir chat com contato de teste. 2. Clicar no ícone de templates. 3. Verificar a lista de templates disponíveis. 4. Tentar selecionar um template marcado como inativo ou sem permissão. | Template inativo não aparece na lista ou exibe aviso de indisponibilidade. Botão Enviar não é exibido para templates inativos. | 🟡 Média | UI | — |
| CT-TMPL-011 | Variável com caracteres especiais não quebra layout | Acesso ao chat; template com variável disponível | 1. Selecionar template com variável. 2. Preencher variável com: `<b>Teste</b> & "aspas" 'simples' % @ #`. 3. Verificar visibilidade do botão Enviar. 4. Verificar layout da pré-visualização do template (se houver). | Botão Enviar permanece visível e clicável. O layout da tela não é quebrado. Os caracteres especiais são exibidos como texto literal na pré-visualização, sem interpretação de HTML. | 🟡 Média | UI | — |
| CT-TMPL-012 | XSS via campo de variável | Acesso ao chat; template com variável disponível | 1. Selecionar template com variável. 2. Preencher variável com payload XSS: `<script>alert('xss')</script>`. 3. Verificar se algum alert é disparado na tela. 4. Caso o botão Enviar esteja visível, clicar em Enviar. 5. Verificar a mensagem enviada no histórico do chat. | Nenhum alert ou execução de script é acionada em nenhuma etapa. O conteúdo da variável é tratado como texto puro e exibido literalmente no chat (ex: `<script>alert('xss')</script>`), sem execução. | 🔴 Alta | UI | — |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Cenário: Botão Enviar permanece visível com variável de texto longo
  Dado que estou na tela de chat com o contato de teste
  E existe um template com variável disponível para o canal
  Quando abro o seletor de templates e escolho um template com variável
  E preencho o campo de variável com um texto de 100 ou mais caracteres
  Então o botão Enviar está visível na tela sem necessidade de rolagem
  E o botão está clicável (não desabilitado)
```

```gherkin
Cenário: Botão Enviar permanece visível ao aumentar progressivamente o texto
  Dado que estou na tela de chat com o contato de teste
  E selecionei um template com variável
  Quando digito 10 caracteres no campo de variável
  Então o botão Enviar está visível
  Quando adiciono caracteres até atingir 50, depois 100, depois 200 caracteres
  Então o botão Enviar permanece visível e clicável em todos os comprimentos
  E caso o botão desapareça, o comprimento exato é registrado como evidência de bug
```

---

## Validação por Agente Crítico Independente

✅ Validação por agente crítico concluída:
   Aprovados sem alteração: 4 (CT-TMPL-002, CT-TMPL-005, CT-TMPL-007, CT-TMPL-008)
   Revisados: 5 (CT-TMPL-001, CT-TMPL-003, CT-TMPL-004, CT-TMPL-006, CT-TMPL-009)
   Adicionados por cobertura insuficiente: 3 (CT-TMPL-010, CT-TMPL-011, CT-TMPL-012)

**Correções aplicadas:**
- CT-TMPL-001: Removido passo "clicar em Enviar" — cenário foca apenas na visibilidade do botão (separação de responsabilidade com CT-TMPL-003)
- CT-TMPL-003: Resultado esperado corrigido para "aparece no histórico do chat sem mensagem de erro" — sem assumir status de envio
- CT-TMPL-004: Resultado esperado reescrito em comportamento observável ("visível e clicável") em vez de intenção de correção
- CT-TMPL-006: Reformulado com pré-requisito explícito de múltiplos tipos; mantido pois RN indica "todos os tipos de template com variável"
- CT-TMPL-009: Detalhado o que verificar na Network (endpoint POST + campo de payload) para ser executável sem conhecimento do código
