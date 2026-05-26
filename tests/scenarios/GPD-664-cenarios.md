# Cenários de Teste — GPD-664
> Card: Enter não envia mensagem quando contém template variável — campo de variável intercepta o evento
> Gerado em: 2026-05-19

---

## BLOCO 1 — Estratégia de Teste

**Escopo:** Bug de interação de teclado no envio de mensagens via atalhos com variáveis. O handler de Enter é interceptado pelo componente de variável ativo, impedindo o envio. A correção deve garantir que Enter envie a mensagem imediatamente (com placeholder como está se não preenchido), Tab navegue entre variáveis e Shift+Enter mantenha o comportamento de quebra de linha. Testes cobrem o cenário do bug, regressão de atalhos sem variáveis, múltiplas variáveis e comportamento dos atalhos de teclado relacionados.

**Tipos de teste:** Funcional (Enter envia após fix), Regressão (botão de envio, Enter sem variável, Shift+Enter), UX (Tab navega entre variáveis, placeholder enviado como texto literal).

**Prioridade de execução:** Alta — afeta todos os atalhos de mensagem rápida com variáveis, interrompendo o fluxo natural dos operadores em produção.

**Riscos principais:** Fix resolve o Enter mas quebra o Tab (variáveis não navegáveis); Shift+Enter passa a enviar em vez de quebrar linha; botão de envio regride; Enter envia mensagem vazia quando campo está sem atalho.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Bug original ainda reproduzível após o fix (Enter não envia com variável ativa) | B | A | 🔴 Alta |
| Regressão: Enter para de enviar mensagens sem variável após o fix | M | A | 🔴 Alta |
| Regressão: Shift+Enter passa a enviar em vez de inserir quebra de linha | M | A | 🔴 Alta |
| Regressão: botão de envio para de funcionar com variável ativa | B | A | 🔴 Alta |
| Tab deixa de navegar entre variáveis (fix quebra esse comportamento) | M | M | 🟡 Média |
| Mensagem enviada com conteúdo incorreto (placeholder duplicado ou variável corrompida) | B | M | 🟡 Média |
| Enter envia mensagem vazia quando não há conteúdo no campo | B | M | 🟡 Média |
| Fix cobre apenas variável de "nome do cliente" mas não outras variáveis do sistema | M | M | 🟡 Média |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade |
|---|---|---|---|---|---|
| CT-ATALHO-001 | Enter envia com variável não preenchida | Atalho com variável disponível (ex: "Bom dia, [nome do cliente]"); fix deployado | 1. Selecionar atalho com variável na caixa de mensagem. 2. Observar campo de variável destacado. 3. Sem editar a variável, pressionar Enter. 4. Verificar se a mensagem foi enviada. | Mensagem enviada com o placeholder como texto literal (ex: "Bom dia, [nome do cliente]"). Enter não fica preso no componente de variável. (RN01) | 🔴 Alta |
| CT-ATALHO-002 | Enter envia com variável preenchida pelo operador | Atalho com variável; operador preenche o campo de variável antes de pressionar Enter | 1. Selecionar atalho com variável. 2. Digitar o valor desejado no campo de variável (ex: "João"). 3. Pressionar Enter. 4. Verificar mensagem enviada. | Mensagem enviada com o valor preenchido (ex: "Bom dia, João"). Enter envia corretamente após preenchimento da variável. | 🔴 Alta |
| CT-ATALHO-003 | Bug original não reproduzível após fix | Atalhos com variável de nome do cliente e nome do atendente disponíveis | 1. Selecionar atalho com variável (ex: "[nome do cliente]"). 2. Sem preencher a variável, pressionar Enter. 3. Repetir para atalho com "[nome do atendente]". | Em ambos os casos, a mensagem é enviada ao pressionar Enter. O campo de variável NÃO intercepta o evento. Bug original não reproduzível. | 🔴 Alta |
| CT-ATALHO-004 | Enter envia atalho sem variáveis (regressão) | Atalho sem variável disponível | 1. Selecionar atalho sem variável na caixa de mensagem. 2. Pressionar Enter. 3. Verificar se a mensagem foi enviada. | Mensagem enviada normalmente. Nenhuma regressão introduzida para atalhos sem variáveis. | 🔴 Alta |
| CT-ATALHO-005 | Botão de envio funciona com variável ativa (regressão) | Atalho com variável na caixa; variável destacada | 1. Selecionar atalho com variável. 2. Sem pressionar Enter, clicar no botão de envio. 3. Verificar envio. | Mensagem enviada pelo botão normalmente. Fix não introduz regressão no botão de envio. | 🔴 Alta |
| CT-ATALHO-006 | Enter com múltiplas variáveis envia imediatamente | Atalho com 2+ variáveis (ex: "Olá, [nome do cliente], sou [nome do atendente]") | 1. Selecionar atalho com múltiplas variáveis. 2. Preencher apenas a primeira variável. 3. Pressionar Enter sem preencher as demais. 4. Verificar mensagem enviada. | Mensagem enviada imediatamente ao pressionar Enter. Variáveis não preenchidas enviadas como placeholder literal. Enter não aguarda preenchimento de todas as variáveis. | 🔴 Alta |
| CT-ATALHO-007 | Tab navega entre variáveis sem enviar | Atalho com 2+ variáveis na caixa de mensagem | 1. Selecionar atalho com múltiplas variáveis. 2. Pressionar Tab. 3. Verificar qual campo recebe foco. 4. Pressionar Tab novamente. | Tab move o foco para a próxima variável sem enviar a mensagem. Comportamento de navegação entre variáveis funcional após o fix. | 🟡 Média |
| CT-ATALHO-008 | Shift+Enter insere quebra de linha e não envia | Caixa de mensagem com ou sem atalho ativo | 1. Digitar ou selecionar um atalho na caixa de mensagem. 2. Pressionar Shift+Enter. 3. Verificar comportamento. | Quebra de linha inserida na caixa de texto. Mensagem NÃO enviada. Comportamento de Shift+Enter inalterado pelo fix. | 🟡 Média |
| CT-ATALHO-009 | Placeholder não preenchido enviado como texto literal | Atalho com variável; variável não editada pelo operador | 1. Selecionar atalho com variável (ex: "[nome do cliente]"). 2. Não editar a variável. 3. Pressionar Enter ou clicar em enviar. 4. Verificar o conteúdo da mensagem recebida pelo destinatário. | Mensagem recebida contém o texto literal do placeholder (ex: "[nome do cliente]") ou espaço vazio, conforme definido no template. Nenhum dado de outro cliente é preenchido automaticamente. | 🟡 Média |
| CT-ATALHO-010 | Variável parcialmente preenchida: Enter envia restante como placeholder | Atalho com 2 variáveis; operador preenche apenas a primeira | 1. Selecionar atalho com 2 variáveis. 2. Preencher apenas a primeira variável. 3. Pressionar Enter. 4. Verificar conteúdo enviado. | Mensagem enviada com: primeira variável com valor preenchido + segunda variável como placeholder literal. Enter não aguarda preenchimento de todas as variáveis. | 🟡 Média |
| CT-ATALHO-011 | Placeholder não expõe dados sensíveis ao ser enviado | Atalho com variável não preenchida; acesso à mensagem enviada | 1. Enviar atalho com variável não preenchida. 2. Verificar o conteúdo exato da mensagem recebida pelo cliente. | Mensagem contém apenas o placeholder do template (ex: "[nome do cliente]"). Nenhum dado de outro cliente, ID de sessão ou informação interna do sistema é exposto. | 🟡 Média |
| CT-ATALHO-012 | Enter não envia mensagem completamente vazia | Caixa de mensagem vazia (sem atalho e sem texto) | 1. Deixar a caixa de mensagem vazia. 2. Pressionar Enter. 3. Verificar se alguma mensagem é enviada. | Nenhuma mensagem enviada. Fix não interfere com a validação de campo vazio existente. | 🟢 Baixa |

---

## BLOCO 4 — Cenários Gherkin (BDD)

### CT-ATALHO-001
```gherkin
Cenário: Enter envia mensagem com variável não preenchida
  Dado que o operador selecionou um atalho com variável na caixa de mensagem
  E o campo de variável está destacado mas não foi editado
  Quando o operador pressiona Enter
  Então a mensagem é enviada com o placeholder como texto literal
  E o Enter não fica preso no componente de variável
```

### CT-ATALHO-002
```gherkin
Cenário: Enter envia mensagem com variável preenchida pelo operador
  Dado que o operador selecionou um atalho com variável
  E preencheu o campo de variável com um valor (ex: "João")
  Quando o operador pressiona Enter
  Então a mensagem é enviada com o valor preenchido no lugar da variável
```

### CT-ATALHO-003
```gherkin
Cenário: Bug original não reproduzível após o fix
  Dado que o fix foi deployado
  E o operador selecionou um atalho com variável de "nome do cliente" ou "nome do atendente"
  Quando o operador pressiona Enter sem preencher a variável
  Então a mensagem é enviada normalmente
  E o campo de variável não intercepta o evento de Enter
```

### CT-ATALHO-004
```gherkin
Cenário: Enter envia atalho sem variáveis normalmente (regressão)
  Dado que o operador selecionou um atalho sem variável na caixa de mensagem
  Quando o operador pressiona Enter
  Então a mensagem é enviada normalmente
  E nenhuma regressão é observada para atalhos sem variáveis
```

### CT-ATALHO-005
```gherkin
Cenário: Botão de envio funciona com variável ativa após o fix
  Dado que o operador selecionou um atalho com variável e o campo está destacado
  Quando o operador clica no botão de envio
  Então a mensagem é enviada normalmente pelo botão
  E o fix não introduz regressão no envio via botão
```

### CT-ATALHO-006
```gherkin
Cenário: Enter envia imediatamente com múltiplas variáveis pendentes
  Dado que o operador selecionou um atalho com duas ou mais variáveis
  E preencheu apenas a primeira variável
  Quando o operador pressiona Enter
  Então a mensagem é enviada com a primeira variável preenchida
  E as variáveis não preenchidas são enviadas como placeholder literal
  E o Enter não aguarda o preenchimento de todas as variáveis
```

---

## Sugestões para o QA

### Automação

| Cenário | ROI | Justificativa |
|---|---|---|
| CT-ATALHO-003 | ⭐⭐⭐⭐⭐ Muito Alto | Regressão do bug — simular keydown Enter com componente de variável ativo e assertar que o evento de envio dispara. Deve rodar a cada deploy. |
| CT-ATALHO-004 + CT-ATALHO-005 | ⭐⭐⭐⭐ Alto | Regressão de fluxos existentes — atalhos sem variável e botão de envio são caminhos críticos com custo baixo de automação. |
| CT-ATALHO-008 | ⭐⭐⭐⭐ Alto | Shift+Enter: simular o evento com `shiftKey: true` e assertar que nenhum envio é disparado. Protege contra regressão silenciosa do comportamento de quebra de linha. |
| CT-ATALHO-007 | ⭐⭐⭐ Médio | Tab entre variáveis: simular Tab e assertar mudança de foco entre campos de variável. Requer acesso ao estado interno do componente. |

### Boas Práticas
- Para CT-ATALHO-001, confirmar com o time de desenvolvimento qual é o texto exato enviado quando a variável não é preenchida — se é o token literal `[nome do cliente]` ou um espaço vazio — para que o resultado esperado seja assertado objetivamente no teste automatizado.
- Para CT-ATALHO-006 (múltiplas variáveis), garantir que o ambiente de staging tem pelo menos um atalho configurado com 2+ variáveis. Se não houver, criar um atalho de teste antes de executar.
- Testar em diferentes navegadores (Chrome, Firefox, Edge) — eventos de teclado têm comportamentos sutilmente diferentes entre engines, e o bug de interceptação de Enter pode se manifestar de forma distinta.

### Monitoramento Pós-deploy
- Monitorar tickets de suporte com tema "Enter não envia" ou "mensagem presa na caixa de texto" nas 48h após o deploy — ausência de novos relatos confirma que o fix cobriu o universo de atalhos afetados.
- Se houver analytics de eventos de envio (`message_sent`), comparar a proporção de envios via Enter vs. botão antes e após o fix — espera-se aumento na proporção de Enter, indicando que operadores voltaram a usar o atalho de teclado.
