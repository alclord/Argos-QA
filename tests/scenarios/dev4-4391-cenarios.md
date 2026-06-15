# Cenários de Teste — DEV4-4391
> Card: Tela Congela Após Encaminhamento de Chat
> Gerado em: 2026-06-12
> Card atualizado em: 2026-06-11T10:16:50.294-0300

---

## BLOCO 1 — Estratégia de Teste

O bug afeta um fluxo de alta frequência operacional (encaminhamento de chat) que impacta todos os perfis de acesso e pode gerar duplicidade de ações e queda de SLA. A estratégia prioriza testes **funcionais de UI** focados na atualização automática do painel após o encaminhamento e testes de **regressão** para confirmar que o loading não persiste indefinidamente. Testes de **segurança** validam o isolamento de tenant. O risco principal é um bug de state management no frontend (cache não invalidado após mutation). Prioridade de execução: CT-ENCAM-001 e CT-ENCAM-005 primeiro (fluxos diretamente quebrados); CT-ENCAM-002 e CT-ENCAM-006 em seguida; demais em paralelo.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade | Impacto | Prioridade |
|---|---|---|---|
| Fix não atualiza o cache do frontend após mutation de encaminhamento | M | A | 🔴 Alta |
| Loading permanente em cenário específico (auto-encaminhamento ou perfil diferente) | M | A | 🔴 Alta |
| Encaminhamento para si mesmo não posiciona chat no topo da fila | M | M | 🟡 Média |
| Falha no backend (HTTP 500) mantém loading permanente mesmo após erro | M | A | 🟡 Média |
| Chat não some do painel do atendente de origem após encaminhamento bem-sucedido | M | M | 🟡 Média |
| Double-click dispara duplicação de encaminhamento com estado inconsistente | B | A | 🟡 Média |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-ENCAM-001 | Encaminhar para outro atendente | Chat com status `attending` atribuído ao Operador A; Atendente B disponível na plataforma; Operador A logado como `agent` | 1. Acessar o painel de chat do Operador A<br>2. Abrir um chat com status `attending` atribuído a si mesmo<br>3. Acionar a opção "Encaminhar" no painel do chat<br>4. Selecionar o Atendente B como destinatário<br>5. Confirmar o encaminhamento | Toast de sucesso exibido; chat some do painel do Operador A automaticamente (sem F5); painel retorna ao estado de lista/neutro; HTTP 200 na requisição de encaminhamento | 🔴 Alta | UI | — |
| CT-ENCAM-002 | Encaminhar para si mesmo (auto) | Chat com status `attending` atribuído ao Operador A; Operador A logado | 1. Acessar o painel de chat do Operador A<br>2. Abrir um chat com status `attending` atribuído a si mesmo<br>3. Acionar a opção "Encaminhar"<br>4. Selecionar o próprio Operador A como destinatário<br>5. Confirmar o encaminhamento | Toast de sucesso exibido; chat aparece no **topo** da fila do Operador A automaticamente (sem F5); painel exibe o chat sem estado de loading permanente | 🔴 Alta | UI | — |
| CT-ENCAM-003 | Encaminhar como Gestor | Chat com status `attending` disponível; usuário com role `manager` logado; Atendente B disponível | 1. Logar como Gestor (`manager`)<br>2. Abrir um chat em atendimento<br>3. Acionar "Encaminhar", selecionar Atendente B<br>4. Confirmar o encaminhamento | Toast de sucesso exibido; painel atualiza automaticamente conforme comportamento do perfil Gestor na plataforma (sem F5); sem estado de loading permanente | 🟡 Média | UI | — |
| CT-ENCAM-004 | Encaminhar como Supervisor | Chat com status `attending` disponível; usuário com role `supervisor` logado; Atendente B disponível | 1. Logar como Supervisor (`supervisor`)<br>2. Abrir um chat em atendimento<br>3. Acionar "Encaminhar", selecionar Atendente B<br>4. Confirmar o encaminhamento | Toast de sucesso exibido; painel atualiza automaticamente conforme comportamento do perfil Supervisor na plataforma (sem F5); sem estado de loading permanente | 🟡 Média | UI | — |
| CT-ENCAM-005 | Falha no encaminhamento — HTTP 500 | Chat com status `attending`; Operador logado; DevTools disponível para interceptar requisição de rede | 1. Abrir um chat em atendimento<br>2. Acionar "Encaminhar" e selecionar destinatário<br>3. No DevTools (aba Network), configurar intercept para retornar HTTP 500 no endpoint de encaminhamento **antes** de confirmar<br>4. Confirmar o encaminhamento<br>5. Observar o comportamento do painel | Loading encerra imediatamente após a resposta do backend; toast de erro exibido; painel permanece responsivo e interativo; chat permanece na fila do atendente original (não foi encaminhado) | 🔴 Alta | UI | — |
| CT-ENCAM-006 | Loading não persiste após confirmação — regressão do bug | Chat com status `attending`; Operador logado | 1. Abrir um chat em atendimento<br>2. Acionar "Encaminhar" e confirmar para qualquer destinatário<br>3. Aguardar o toast de sucesso<br>4. Observar o painel por 5 segundos após o toast | Após o toast de sucesso, nenhum estado de loading ou tela branca permanece visível; painel totalmente responsivo para qualquer nova interação. _Validação direta do bug relatado: em nenhum cenário o loading deve persistir após confirmação do backend._ | 🔴 Alta | UI | — |
| CT-ENCAM-007 | Encaminhar chat em estado não-`attending` | Chat com status `waiting` ou `resolved`; Operador logado. ⚠️ Borda extracard — testa a guarda implícita de estado (encaminhamento só é permitido em chats `attending`) | 1. Identificar um chat com status `waiting` ou `resolved`<br>2. Verificar se a opção "Encaminhar" está disponível na UI<br>3. Caso disponível, tentar confirmar o encaminhamento | Opção "Encaminhar" está desabilitada ou indisponível na UI; caso a requisição chegue ao backend, a operação é recusada com mensagem de erro clara; painel não congela | 🟡 Média | UI | — |
| CT-ENCAM-008 | Double-click no confirmar encaminhar | Chat com status `attending`; Operador logado. _Derivado do bug: double-click pode disparar requisição duplicada causando estado inconsistente de loading_ | 1. Abrir um chat em atendimento<br>2. Acionar "Encaminhar" e selecionar destinatário<br>3. Clicar duas vezes rapidamente no botão de confirmar encaminhamento | Apenas uma requisição enviada ao backend; chat encaminhado uma única vez; sem duplicação de encaminhamento; sem tela congelada | 🟡 Média | UI | CT-ENCAM-001 |
| CT-ENCAM-009 | Navegar para outro chat durante encaminhamento | Ao menos 2 chats com status `attending`; Operador logado. _Derivado do bug: navegar rapidamente entre chats antes do estado ser atualizado pode causar loading permanente_ | 1. Abrir o Chat A e acionar "Encaminhar"<br>2. Confirmar o encaminhamento<br>3. Clicar no Chat B na lista em menos de 1 segundo após confirmar (sem aguardar o toast) | Chat B abre normalmente sem estado de loading permanente; encaminhamento do Chat A é processado corretamente em background; nenhum dos dois chats congela a tela | 🟡 Média | UI | CT-ENCAM-001 |
| CT-ENCAM-010 | Cross-tenant: encaminhar chat de outra conta | Token de autenticação do Account A válido; UUID de um chat pertencente ao Account B (obtido via ambiente de teste) | 1. Com o token do Account A, enviar `POST /v3/chats/{uuid_do_account_B}/transfer` via cliente REST (Postman ou DevTools)<br>2. Verificar o código de resposta e o payload retornado | API retorna HTTP 403 (Forbidden) ou 404 (Not Found); chat do Account B não é encaminhado; nenhum dado do Account B exposto na resposta | 🔴 Alta | API | — |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Cenário: Encaminhar chat para outro atendente atualiza o painel automaticamente
  Dado que estou logado como Operador de chat
  E tenho um chat com status "attending" atribuído a mim
  Quando aciono a opção "Encaminhar" no painel do chat
  E seleciono outro atendente como destinatário
  E confirmo o encaminhamento
  Então um toast de sucesso é exibido
  E o chat some do meu painel imediatamente, sem necessidade de recarregar a página
  E o painel retorna ao estado de lista sem estado de loading permanente
```

```gherkin
Cenário: Falha no encaminhamento encerra o loading sem congelar a tela
  Dado que estou logado como Operador de chat
  E tenho um chat com status "attending" atribuído a mim
  E há um intercept de rede configurado para retornar HTTP 500 no endpoint de encaminhamento
  Quando aciono "Encaminhar", seleciono um destinatário e confirmo
  Então o estado de loading encerra imediatamente após a resposta do backend
  E um toast de erro é exibido
  E o painel permanece responsivo e interativo
  E o chat permanece na minha fila sem ter sido encaminhado
```
