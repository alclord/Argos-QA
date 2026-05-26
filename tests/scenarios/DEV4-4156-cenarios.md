# Cenários de Teste — DEV4-4156
> Card: Confirmação Ações em Massa
> Gerado em: 2026-05-19

---

## BLOCO 1 — Estratégia de Teste

**Escopo:** Melhoria de UX que afeta todas as ações em massa da plataforma. Cobre dois padrões distintos: (1) AlertDialog de confirmação com contador e opção "não mostrar novamente" para "finalizar conversas" e "marcar como lidas"; (2) faixa informativa amarela com contador para modais de "etiquetas" e "encaminhar". Foco em garantir que nenhuma ação em massa seja executada sem a camada de confirmação e que o contador exibido reflita exatamente os itens que serão afetados.

**Tipos de teste:** Funcional (exibição dos modais, contadores, botões dinâmicos), Regressão (garantir que ações em massa existentes não regrediram), UX (overlay bloqueando background, "não mostrar novamente", estados visuais).

**Prioridade de execução:** Alta — erros irreversíveis como finalizar/alterar 50 conversas acidentalmente têm impacto operacional direto para o cliente.

**Riscos principais:** Modal não exibido em alguma das ações cobertas (violação RN01), contador exibido diferente do total real afetado, ação executada ao cancelar o modal, e overlay não impedindo cliques acidentais no background.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Ação em massa executada sem exibição do modal de confirmação (violação RN01) | M | A | 🔴 Alta |
| Cancelar dialog executa a ação em massa (comportamento invertido) | B | A | 🔴 Alta |
| Contador exibido no modal diferente do total real de itens afetados (violação RN03) | M | A | 🔴 Alta |
| Overlay não bloqueia cliques no background durante modal aberto (violação RN04) | M | A | 🔴 Alta |
| Regressão: ações em massa existentes param de funcionar após a mudança | B | A | 🔴 Alta |
| Backend processa quantidade diferente da exibida no modal | B | A | 🔴 Alta |
| Botão de confirmação com texto incorreto ou genérico (violação RN02) | M | M | 🟡 Média |
| "Não mostrar novamente" não persiste entre sessões | M | M | 🟡 Média |
| Faixa amarela não exibida nos modais de etiquetas/encaminhar | M | M | 🟡 Média |
| Contador desatualizado ao abrir modal (reflete estado anterior à seleção) | B | M | 🟡 Média |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade |
|---|---|---|---|---|---|
| CT-MASSA-001 | Dialog finalizar: confirmação executa ação | Lista de conversas com itens; selecionar 3 ou mais conversas | 1. Selecionar 3 conversas na lista. 2. Acionar "Finalizar conversas" (ação em massa). 3. Verificar exibição da dialog AlertDialog. 4. Confirmar o número exibido no título. 5. Clicar no botão de confirmação. 6. Verificar estado das conversas após ação. | Dialog AlertDialog exibida com título contendo o número exato de conversas selecionadas (ex: "Finalizar 3 conversas?"). Botão de ação com texto dinâmico refletindo a ação ("Finalizar"). Após confirmação: as 3 conversas são finalizadas. | 🔴 Alta |
| CT-MASSA-002 | Dialog marcar como lidas: confirmação executa ação | Lista com conversas não lidas; selecionar 5 conversas | 1. Selecionar 5 conversas na lista. 2. Acionar "Marcar todas como lidas". 3. Verificar exibição da dialog AlertDialog. 4. Confirmar número exibido. 5. Clicar no botão de confirmação. 6. Verificar estado das conversas. | Dialog exibida com contador correto (5). Botão dinâmico com texto da ação. Após confirmação: as 5 conversas aparecem como lidas. | 🔴 Alta |
| CT-MASSA-003 | Faixa informativa em modal de etiquetas | Conversas selecionadas; modal de etiquetas disponível | 1. Selecionar 4 conversas. 2. Acionar ação de "Etiquetas" em massa. 3. Verificar exibição do modal de etiquetas. 4. Localizar a faixa amarela de informe dentro do modal. 5. Verificar o número exibido na faixa. | Modal de etiquetas exibido com faixa amarela de informe visível contendo o número de chats afetados (4) dentro do [x]. Sem dialog AlertDialog separada. | 🟡 Média |
| CT-MASSA-004 | Faixa informativa em modal de encaminhar | Conversas selecionadas; modal de encaminhar disponível | 1. Selecionar 2 conversas. 2. Acionar "Encaminhar" em massa. 3. Verificar exibição do modal de encaminhar. 4. Localizar a faixa amarela de informe. 5. Verificar o número exibido. | Modal de encaminhar exibido com faixa amarela visível contendo o número exato de chats (2) próximo ao botão de confirmação. | 🟡 Média |
| CT-MASSA-005 | Cancelar dialog não executa ação em massa | Conversas selecionadas; dialog de confirmação aberta (finalizar ou marcar como lidas) | 1. Selecionar 5 conversas. 2. Acionar "Finalizar conversas". 3. Dialog AlertDialog exibida. 4. Clicar no botão "Cancelar" ou fechar a dialog pelo X. 5. Verificar estado das conversas na lista. | Ação em massa NÃO é executada. As 5 conversas permanecem no estado original. Dialog fechada sem efeito colateral. | 🔴 Alta |
| CT-MASSA-006 | Fechar modal etiquetas/encaminhar não executa ação | Modal de etiquetas ou encaminhar aberto; conversas selecionadas | 1. Selecionar 3 conversas. 2. Abrir modal de etiquetas. 3. Fechar o modal sem confirmar (X ou clique fora se permitido). 4. Verificar estado das conversas. | Nenhuma etiqueta adicionada/removida. As conversas permanecem no estado original. Modal fechado sem efeito colateral. | 🟡 Média |
| CT-MASSA-007 | Ação em massa executa sem exibição do modal (regressão RN01) | Qualquer ação em massa coberta; deploy aplicado | 1. Selecionar conversas (quantidade qualquer ≥ 1). 2. Acionar cada ação coberta: finalizar, marcar como lidas, etiquetas, encaminhar. 3. Verificar se modal/dialog é exibido ANTES da execução em cada caso. | Modal ou dialog exibido ANTES da execução em todos os casos. Nenhuma ação é executada diretamente sem confirmação. | 🔴 Alta |
| CT-MASSA-008 | "Não mostrar novamente" suprime dialog futura | Dialog AlertDialog exibida pela primeira vez; opção "não mostrar novamente" visível | 1. Acionar "Finalizar conversas" com conversas selecionadas. 2. Na dialog, marcar a opção "não mostrar novamente". 3. Confirmar a ação. 4. Realizar uma segunda ação "Finalizar conversas" com novas conversas selecionadas. | Na segunda execução, a dialog AlertDialog NÃO é exibida. A ação é executada diretamente. A preferência persiste conforme escopo definido pelo Produto. | 🟡 Média |
| CT-MASSA-009 | Contador reflete seleção total real do filtro | Filtro ativo com mais itens do que a página exibe; opção "selecionar todos" utilizada | 1. Aplicar filtro que retorne 120 conversas (mais do que uma página). 2. Usar "selecionar todos" (todos do filtro). 3. Acionar "Finalizar conversas". 4. Verificar o número exibido no título da dialog. | Dialog exibida com contador refletindo o total real (ex: 120), não apenas os da página visível. | 🔴 Alta |
| CT-MASSA-010 | Botão dinâmico reflete ação específica | Dialog de confirmação aberta para diferentes ações | 1. Abrir dialog para "Finalizar conversas" → verificar texto do botão. 2. Abrir dialog para "Marcar como lidas" → verificar texto do botão. 3. Verificar faixa informativa nos modais de etiquetas e encaminhar. | Cada dialog/modal exibe botão com texto correspondente à ação específica. Não usa texto genérico como "Confirmar" em todos os casos. | 🟡 Média |
| CT-MASSA-011 | Overlay bloqueia interações com lista ao fundo | Dialog ou modal aberto; lista de conversas visível ao fundo | 1. Abrir a dialog AlertDialog (ex: finalizar conversas). 2. Tentar clicar em uma conversa na lista ao fundo. 3. Tentar selecionar/deselecionar itens enquanto dialog está aberta. 4. Tentar acionar qualquer controle da lista. | Todos os cliques no background são bloqueados. Nenhuma interação com a lista ao fundo é registrada enquanto o modal estiver aberto. | 🔴 Alta |
| CT-MASSA-012 | Backend processa exatamente o que o modal exibiu | Dialog exibida com N conversas; acesso a DevTools/Network | 1. Selecionar exatamente 7 conversas. 2. Acionar "Finalizar conversas". 3. Verificar que dialog exibe "7". 4. Confirmar. 5. Monitorar a requisição ao backend. 6. Verificar conversas finalizadas na lista. | Backend recebe e processa exatamente 7 conversas. Número de itens processados no backend = número exibido no modal. Sem discrepância entre UI e backend. | 🟡 Média |
| CT-MASSA-013 | Dialog não exibida sem itens selecionados | Nenhuma conversa selecionada na lista | 1. Sem selecionar conversas, verificar estado dos botões de ação em massa. 2. Tentar acionar botão de ação em massa (se disponível sem seleção). | Botão de ação em massa desabilitado ou ação não acionável sem seleção. Dialog não é exibida com contador "0". | 🟢 Baixa |

---

## BLOCO 4 — Cenários Gherkin (BDD)

### CT-MASSA-001
```gherkin
Cenário: Confirmar finalização de conversas via dialog exibe contador correto e executa ação
  Dado que existem conversas na lista
  E o usuário selecionou 3 conversas
  Quando o usuário aciona "Finalizar conversas"
  Então a dialog AlertDialog é exibida com o título contendo o número 3
  E o botão de confirmação exibe o texto dinâmico da ação ("Finalizar")
  Quando o usuário clica no botão de confirmação
  Então as 3 conversas são finalizadas
```

### CT-MASSA-002
```gherkin
Cenário: Confirmar marcar como lidas via dialog executa ação com contador correto
  Dado que existem conversas não lidas na lista
  E o usuário selecionou 5 conversas
  Quando o usuário aciona "Marcar todas como lidas"
  Então a dialog AlertDialog é exibida com contador igual a 5
  E o botão de confirmação reflete o texto da ação específica
  Quando o usuário confirma
  Então as 5 conversas são marcadas como lidas
```

### CT-MASSA-005
```gherkin
Cenário: Cancelar dialog não executa a ação em massa
  Dado que o usuário selecionou 5 conversas
  E a dialog AlertDialog de "Finalizar conversas" está aberta
  Quando o usuário clica em "Cancelar" ou fecha a dialog
  Então nenhuma conversa é finalizada
  E as 5 conversas permanecem no estado original
```

### CT-MASSA-007
```gherkin
Cenário: Nenhuma ação em massa é executada sem exibição prévia de modal
  Dado que o usuário selecionou conversas na lista
  Quando o usuário aciona qualquer ação em massa coberta pela entrega
  Então o modal ou dialog de confirmação é exibido antes da execução
  E a ação só é executada após confirmação explícita do usuário
```

### CT-MASSA-009
```gherkin
Cenário: Contador do modal reflete total real ao usar "selecionar todos do filtro"
  Dado que há um filtro ativo retornando 120 conversas
  E o usuário usa a opção "selecionar todos" (filtro completo)
  Quando o usuário aciona "Finalizar conversas"
  Então a dialog exibe o contador com o total real (120)
  E não apenas o número de itens visíveis na página atual
```

### CT-MASSA-011
```gherkin
Cenário: Overlay bloqueia interações com a lista enquanto dialog está aberta
  Dado que a dialog AlertDialog de confirmação está aberta
  E a lista de conversas está visível ao fundo com overlay
  Quando o usuário tenta clicar em qualquer item da lista ao fundo
  Então nenhuma interação é registrada na lista
  E o foco permanece no modal de confirmação
```

---

## Sugestões para o QA

### Automação

| Cenário | ROI | Justificativa |
|---|---|---|
| CT-MASSA-007 | ⭐⭐⭐⭐⭐ Muito Alto | Teste de regressão crítico — garante que nenhum deploy futuro remove a camada de confirmação. Simples: acionar ação em massa e verificar se modal foi exibido antes da execução. |
| CT-MASSA-001 + CT-MASSA-002 | ⭐⭐⭐⭐⭐ Muito Alto | Happy paths do fluxo principal. Automatizar como smoke tests pós-deploy. |
| CT-MASSA-005 | ⭐⭐⭐⭐ Alto | Cancelar sem executar é comportamento crítico. Fácil de automatizar: acionar, cancelar, verificar estado das conversas via API. |
| CT-MASSA-012 | ⭐⭐⭐⭐ Alto | Validar que backend processa exatamente o que o modal exibiu — ideal como teste de contrato. |
| CT-MASSA-009 | ⭐⭐⭐ Alto | Requer fixture com filtro de grande volume, mas protege contra o bug principal descrito no card. |

### Boas Práticas
- Criar fixtures com volumes variados: 1, 5, 50 e "selecionar todos" (filtro amplo) — cobrir o contador em diferentes escalas garante que o RN03 não falha somente em volumes grandes.
- Para CT-MASSA-008 ("não mostrar novamente"), verificar onde a preferência é persistida (localStorage, backend, sessão) antes de escrever o cenário de automação — isso determina se o teste precisa limpar estado entre runs.
- Testar com o componente AlertDialog em diferentes navegadores e resoluções, pois é um componente reutilizado de produção e pode ter comportamentos distintos em mobile/tablet.

### Monitoramento Pós-deploy
- Acompanhar a **Taxa de Abandono no Modal** (`modal_closed_without_confirm / modal_shown`) — se for alta (> 20%), indica que usuários estão sendo "salvos" de erros ou que o modal está sendo exibido de forma invasiva.
- Monitorar discrepâncias entre o contador exibido e o total processado pelo backend nos logs — qualquer diferença indica bug no RN03 com potencial de impacto operacional.
