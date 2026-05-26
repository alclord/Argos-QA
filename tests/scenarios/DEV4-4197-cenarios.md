# Cenários de Teste — DEV4-4197
> Card: Migração da tela de Créditos para a Nova Interface
> Gerado em: 2026-05-19

---

## BLOCO 1 — Estratégia de Teste

**Escopo:** Migração frontend da tela de Créditos para a Nova Interface, reproduzindo fielmente todas as funcionalidades do legado: listagem com scroll progressivo, badges de status, modal Resumo da transação com exibição condicional de opções de pagamento, modal Adicionar Créditos com cálculo dinâmico e validações, e controle de acesso exclusivo ao perfil Gestor. Backend sem alterações.

**Tipos de teste:** Funcional (listagem, modais, ações de pagamento, validações), Regressão (funcionalidades equivalentes ao legado), Segurança (Operador não acessa tela de créditos; dados exibidos somente do cliente autenticado), UX (estados de loading/erro/vazio, responsividade ≥ 1280px, Design System Poli).

**Prioridade de execução:** Alta — tela financeira com ações de compra e pagamento; falhas impactam diretamente receita e confiança do Gestor na Nova Interface.

**Riscos principais:** Exibição de Opções de Pagamento para status errado (RN01/RN02 violado); Operador com acesso indevido a dados financeiros; compra executada ao cancelar modal; scroll não mantém ordenação decrescente ao carregar novos registros; valor total calculado incorretamente.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Opções de Pagamento exibidas para status "Pagamento Aprovado" (violação RN02) | M | A | 🔴 Alta |
| Opções de Pagamento não exibidas para status com pendência (violação RN01) | M | A | 🔴 Alta |
| Operador consegue acessar tela de Créditos diretamente pela URL | B | A | 🔴 Alta |
| Compra executada ao clicar em "Cancelar" (comportamento invertido) | B | A | 🔴 Alta |
| Modal Resumo abre com dados de outra linha (cross-row data binding) | B | A | 🔴 Alta |
| Lista não mantém ordenação decrescente ao carregar mais registros via scroll | M | M | 🟡 Média |
| Valor Total não recalcula ao trocar pacote ou quantidade | M | M | 🟡 Média |
| "Baixar boleto" não gera PDF ou gera o arquivo errado | B | M | 🟡 Média |
| Toast de sucesso não exibido ou lista não recarregada após compra válida | M | M | 🟡 Média |
| Erro de validação não exibido ao comprar sem pacote selecionado | M | M | 🟡 Média |
| Política de créditos não exibida no modal (RN05 omitido) | M | B | 🟢 Baixa |
| Badges de status com cores incorretas (divergência do Figma) | M | B | 🟢 Baixa |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade |
|---|---|---|---|---|---|
| CT-CRED-001 | Lista carrega créditos em ordem decrescente | Perfil Gestor autenticado; cliente com créditos contratados na Nova Interface | 1. Logar como Gestor. 2. Acessar a tela de Créditos pelo menu lateral. 3. Verificar as colunas exibidas. 4. Verificar a ordenação das linhas por Data Solicitação. | Lista exibida com colunas: Serviço, Quantidade, Data Solicitação, Valor Total, Pagamento e Ações. Registros ordenados por Data Solicitação decrescente (mais recente no topo). Ícone de olho presente em cada linha. | 🔴 Alta |
| CT-CRED-002 | Modal Resumo abre com dados da linha correta | Lista de créditos exibida; pelo menos um registro disponível | 1. Na lista de créditos, clicar no ícone de olho (👁) de uma linha específica. 2. Verificar os dados exibidos no modal "Resumo da transação". | Modal abre com os dados exatos da linha selecionada (serviço, valor, data, status). Nenhum dado de outra linha é exibido. | 🔴 Alta |
| CT-CRED-003 | Compra válida fecha modal e atualiza lista | Modal "Adicionar créditos" aberto; pacote e quantidade válidos selecionados | 1. Clicar em "Adicionar crédito ⊕". 2. Selecionar um pacote no dropdown. 3. Informar quantidade ≥ 1. 4. Clicar em "Comprar". 5. Verificar comportamento pós-compra. | Modal fechado. Toast "✅ Créditos adicionados com sucesso!" exibido. Lista de créditos recarregada com o novo registro no topo (mais recente). | 🔴 Alta |
| CT-CRED-004 | Pagamento Aprovado não exibe Opções de Pagamento | Crédito com status "Pagamento Aprovado" disponível na lista | 1. Clicar no ícone de olho de uma linha com status "Pagamento Aprovado". 2. Verificar o conteúdo do modal Resumo. | A seção "Opções de Pagamento" NÃO é exibida no modal. Os botões "Pagar via Cartão" e "Baixar boleto" não aparecem. (RN02) | 🔴 Alta |
| CT-CRED-005 | Statuses pendentes exibem Opções de Pagamento | Créditos com status: Pagamento Atrasado, Pagamento Pendente, Liberação Manual e Recorrente | 1. Para cada um dos 4 status, clicar no ícone de olho da linha correspondente. 2. Verificar o conteúdo do modal Resumo em cada caso. | Em todos os 4 casos, a seção "Opções de Pagamento" é exibida com os botões "Pagar via Cartão" e "Baixar boleto". (RN01) | 🔴 Alta |
| CT-CRED-006 | Baixar boleto realiza download do PDF | Modal Resumo aberto; status com Opções de Pagamento visíveis | 1. Abrir modal Resumo de um crédito com status pendente. 2. Clicar em "Baixar boleto". 3. Verificar download. | Download do boleto em PDF iniciado com sucesso. Toast "Download do boleto iniciado com sucesso!" exibido. Arquivo PDF corresponde ao pedido correto. | 🔴 Alta |
| CT-CRED-007 | Operador não acessa a tela de Créditos | Usuário com perfil Operador autenticado na Nova Interface | 1. Logar como Operador. 2. Verificar se o item "Lista de Créditos" está visível no menu lateral. 3. Tentar acessar a URL da tela de créditos diretamente. | Item "Lista de Créditos" não exibido no menu lateral para Operador. Acesso direto pela URL bloqueado (redirecionamento ou 403). Dados financeiros não expostos para o perfil Operador. | 🔴 Alta |
| CT-CRED-008 | Compra sem pacote selecionado exibe validação | Modal "Adicionar créditos" aberto; dropdown de pacote sem seleção | 1. Abrir modal "Adicionar créditos". 2. Deixar o dropdown de pacote sem seleção ("Selecione o pacote"). 3. Clicar em "Comprar". | Erro de validação exibido no campo dropdown: "Selecione um pacote para continuar." Compra NÃO é processada. Modal permanece aberto. (RN03) | 🔴 Alta |
| CT-CRED-009 | Pagar via Cartão redireciona para WhatsApp | Modal Resumo aberto; status com Opções de Pagamento visíveis | 1. Abrir modal Resumo de um crédito com status pendente. 2. Clicar em "Pagar via Cartão". | Usuário redirecionado para a conversa no WhatsApp com o time de Suporte Poli. | 🟡 Média |
| CT-CRED-010 | Quantidade menor que 1 exibe erro de validação | Modal "Adicionar créditos" aberto; pacote selecionado | 1. Selecionar um pacote. 2. Inserir quantidade 0 ou valor negativo no campo Qtd. 3. Clicar em "Comprar". | Erro de validação exibido: "A quantidade deve ser no mínimo 1." Compra NÃO processada. (RN04) | 🟡 Média |
| CT-CRED-011 | Cancelar modal não executa compra | Modal "Adicionar créditos" aberto; pacote e quantidade válidos preenchidos | 1. Abrir modal "Adicionar créditos". 2. Selecionar pacote e quantidade. 3. Clicar em "Cancelar". 4. Verificar estado da lista e da conta. | Modal fechado sem realizar nenhuma compra. Lista de créditos não recarregada. Nenhuma cobrança gerada. | 🟡 Média |
| CT-CRED-012 | Valor Total recalcula dinamicamente | Modal "Adicionar créditos" aberto | 1. Selecionar um pacote e observar o Valor Total. 2. Alterar a quantidade e observar o Valor Total. 3. Trocar o pacote e observar o Valor Total. | Valor Total atualizado automaticamente a cada alteração de pacote ou quantidade. Cálculo correto: preço do pacote × quantidade. | 🟡 Média |
| CT-CRED-013 | Scroll carrega mais créditos progressivamente | Gestor com histórico extenso de créditos (mais registros do que a carga inicial) | 1. Abrir tela de Créditos. 2. Scrollar até o final da lista carregada inicialmente. 3. Verificar se novos registros são carregados. 4. Verificar a ordenação após novo carregamento. | Novos registros carregados ao scrollar. Ordenação por Data Solicitação decrescente mantida entre os lotes. Sem duplicatas ou lacunas na lista. | 🟡 Média |
| CT-CRED-014 | Estados de loading, erro e vazio implementados | Nova Interface; cenários de lista vazia, carregamento e falha de API | 1. Acessar tela com conta sem créditos → verificar estado vazio. 2. Acessar com conexão lenta → verificar skeleton. 3. Simular falha na API → verificar mensagem de erro. | Estado vazio: "Nenhum pacote contratado ainda. Adicione seu primeiro pacote de créditos." Carregamento: skeleton visível. Erro: "Não foi possível carregar seus créditos. Verifique sua conexão e tente novamente." | 🟡 Média |
| CT-CRED-015 | Política de créditos exibida no modal | Modal "Adicionar créditos" aberto | 1. Abrir modal "Adicionar créditos". 2. Localizar o aviso de política de créditos. 3. Verificar o texto exibido. | Texto exibido: "Créditos não utilizados não acumulam para o mês seguinte. Cancelamentos antes de 3 meses geram cobrança proporcional de R$ 0,89 por crédito." (RN05) | 🟢 Baixa |
| CT-CRED-016 | Badges de status com cores e labels corretos | Lista com créditos de todos os 5 status disponíveis | 1. Verificar na lista o badge de cada status: Pagamento aprovado, Recorrente, Pagamento Atrasado, Pagamento pendente, Liberação Manual. 2. Comparar cor e label com o Figma (node-id 8724-1329). | Cada badge exibe o label correto no idioma ativo e a cor correspondente ao token do Figma. Contraste WCAG AA atendido em todos os badges. | 🟢 Baixa |

---

## BLOCO 4 — Cenários Gherkin (BDD)

### CT-CRED-001
```gherkin
Cenário: Lista de créditos carrega com colunas corretas e ordenada por data decrescente
  Dado que o usuário está autenticado como Gestor
  Quando acessa a tela de Créditos pelo menu lateral
  Então a lista exibe as colunas: Serviço, Quantidade, Data Solicitação, Valor Total, Pagamento e Ações
  E os registros estão ordenados por Data Solicitação do mais recente para o mais antigo
  E o ícone de olho está presente em todas as linhas
```

### CT-CRED-002
```gherkin
Cenário: Modal Resumo abre com dados corretos da linha selecionada
  Dado que a lista de créditos está exibida com pelo menos um registro
  Quando o Gestor clica no ícone de olho de uma linha específica
  Então o modal "Resumo da transação" abre com os dados exatos daquela linha
  E nenhum dado de outra linha é exibido no modal
```

### CT-CRED-003
```gherkin
Cenário: Compra com dados válidos fecha modal e atualiza a lista
  Dado que o modal "Adicionar créditos" está aberto
  E um pacote foi selecionado no dropdown
  E a quantidade informada é maior ou igual a 1
  Quando o Gestor clica em "Comprar"
  Então o modal é fechado
  E o toast "✅ Créditos adicionados com sucesso!" é exibido
  E a lista de créditos é recarregada com o novo registro no topo
```

### CT-CRED-004
```gherkin
Cenário: Status Pagamento Aprovado não exibe seção Opções de Pagamento
  Dado que existe um crédito com status "Pagamento Aprovado" na lista
  Quando o Gestor abre o modal Resumo desse crédito
  Então a seção "Opções de Pagamento" não é exibida no modal
  E os botões "Pagar via Cartão" e "Baixar boleto" não aparecem
```

### CT-CRED-005
```gherkin
Cenário: Statuses pendentes exibem seção Opções de Pagamento com ambos os botões
  Dado que existem créditos com status "Pagamento Atrasado", "Pagamento Pendente", "Liberação Manual" e "Recorrente"
  Quando o Gestor abre o modal Resumo de cada um desses créditos
  Então em todos os casos a seção "Opções de Pagamento" é exibida
  E os botões "Pagar via Cartão" e "Baixar boleto" estão visíveis
```

### CT-CRED-006
```gherkin
Cenário: Baixar boleto realiza download do PDF correto
  Dado que o modal Resumo de um crédito com status pendente está aberto
  E a seção "Opções de Pagamento" está visível
  Quando o Gestor clica em "Baixar boleto"
  Então o download do boleto em PDF é iniciado
  E o toast "Download do boleto iniciado com sucesso!" é exibido
```

### CT-CRED-007
```gherkin
Cenário: Operador não consegue acessar a tela de Créditos
  Dado que o usuário está autenticado com perfil Operador
  Quando verifica o menu lateral
  Então o item "Lista de Créditos" não está visível
  Quando tenta acessar a URL da tela de Créditos diretamente
  Então o acesso é bloqueado e nenhum dado financeiro é exibido
```

### CT-CRED-008
```gherkin
Cenário: Compra sem pacote selecionado exibe erro de validação
  Dado que o modal "Adicionar créditos" está aberto
  E o dropdown de pacote está sem seleção
  Quando o Gestor clica em "Comprar"
  Então o erro "Selecione um pacote para continuar." é exibido no campo dropdown
  E a compra não é processada
  E o modal permanece aberto
```

---

## Sugestões para o QA

### Automação

| Cenário | ROI | Justificativa |
|---|---|---|
| CT-CRED-007 | ⭐⭐⭐⭐⭐ Muito Alto | Segurança de acesso — garantir que Operador não acessa dados financeiros é crítico e fácil de automatizar: login com perfil Operador + assert de redirecionamento na URL de créditos. |
| CT-CRED-004 + CT-CRED-005 | ⭐⭐⭐⭐⭐ Muito Alto | Regra de negócio de exibição condicional — automatizável como teste parametrizado: para cada status, abrir modal e assertar presença/ausência da seção de pagamento. |
| CT-CRED-003 | ⭐⭐⭐⭐ Alto | Happy path de compra — smoke test pós-deploy. Inclui verificação de toast + reload da lista, cobrindo o fluxo mais crítico da tela. |
| CT-CRED-008 + CT-CRED-010 | ⭐⭐⭐⭐ Alto | Validações de formulário — simples de automatizar, protegem contra regressões onde o botão "Comprar" é habilitado sem validação. |
| CT-CRED-013 | ⭐⭐⭐ Médio | Scroll progressivo — verificar ordenação entre lotes. Requer fixture com volume adequado, mas protege contra bugs de paginação. |

### Boas Práticas
- Para CT-CRED-005 (todos os 4 status com pendência), garantir que o ambiente de teste tem pelo menos um crédito em cada status — se algum status não estiver representado na base de staging, o teste precisará de fixture manual ou seed.
- Para CT-CRED-016 (badges), usar o Figma como fonte da verdade e documentar as cores esperadas por status no próprio CT antes de executar — isso torna o resultado esperado objetivo e não depende de interpretação visual do QA.
- Para CT-CRED-013 (scroll), verificar com o time frontend qual é o tamanho do lote carregado por scroll (ex: 20 registros por vez) — isso define quantos créditos a fixture precisa ter para acionar o segundo carregamento.
- CT-CRED-014 (estados de loading/erro/vazio): para o estado de erro, verificar se há uma conta de staging com zero créditos disponível, ou se é necessário mockar a resposta da API para simular falha.

### Monitoramento Pós-deploy
- Monitorar o evento `credits_page_error` — meta: 0 erros críticos conforme tabela de métricas do card.
- Acompanhar `credits_package_purchased` nas primeiras 48h e comparar com o volume médio do legado — queda indica problema no fluxo de compra que pode estar silencioso (modal fecha mas compra não é processada).
- Verificar `credits_list_load_time` (P95 < 2s) especialmente em contas com histórico extenso — o scroll progressivo pode mascarar lentidão na primeira carga.
