# Cenários de Teste — DEV4-4206
> Card: Catálogo de Produtos no Chat
> Gerado em: 2026-05-20

---

## Estratégia de Teste

**Escopo:** Redesign do componente de catálogo de produtos no chat — grid de produtos, filtro por categoria (client-side), dois botões de ação por card ("Adicionar ao carrinho" e "Enviar"), quatro estados de interface (loading/skeleton, vazio, erro, bloqueado), badge de carrinho na toolbar e comportamento de exclusividade catálogo↔carrinho. Parte do épico DEV4-4201 (Poli Pay).

**Tipos de teste:** Funcional (happy path, negativos, estados), Borda (múltiplas adições, retry com filtro, troca de conversa), Regressão (badge e toolbar após interações) e Segurança (XSS via dados de produto).

**Prioridade de execução:** 1) Abertura do painel + grid; 2) Adição ao carrinho com pagamento ativo; 3) Estado bloqueado + CTA; 4) Retry e filtro; 5) Segurança.

**Riscos principais:** Banner de bloqueio não exibido ao abrir o painel (requer estado, não clique); badge não atualizar corretamente ao adicionar múltiplas vezes o mesmo produto; retry recarregar com "Todas as categorias" ao invés de manter filtro ativo.

**Informações confirmadas pelo time:**
- CTA "Configurar agora" → redireciona para tela de criação de método de pagamento
- Botão "Enviar" → envia o carrinho no chat (em escopo nesta entrega)
- Retry após erro → sempre mantém a categoria previamente selecionada
- Banner de bloqueio → exibido por estado da página ao abrir (não por clique); pseudocódigo desconsiderado para este comportamento

---

## Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Banner de bloqueio não exibido automaticamente ao abrir o painel sem pagamento | M | A | 🔴 Alta |
| Badge não incrementar corretamente ao adicionar o mesmo produto múltiplas vezes | M | A | 🔴 Alta |
| XSS via nome ou descrição de produto renderizado como HTML no card | B | A | 🔴 Alta |
| CTA "Configurar agora" redirecionar para rota errada ou não funcionar | M | M | 🟡 Média |
| Retry após erro carregar com filtro resetado para "Todas as categorias" | M | M | 🟡 Média |
| Abrir o catálogo não fechar o drawer do carrinho (ou vice-versa) | M | M | 🟡 Média |
| Toast não desaparecer automaticamente após 2s | B | M | 🟡 Média |
| Estado vazio ou de erro exibindo mensagem com texto errado (diferente da tabela de traduções) | B | B | 🟢 Baixa |
| Badge não atualizar ao trocar de conversa ativa | B | B | 🟢 Baixa |

---

## Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade |
|---|---|---|---|---|---|
| CT-CAT-001 | Abrir catálogo exibe skeleton e grid | Operador logado; chat ativo aberto; ao menos 1 produto cadastrado no catálogo; método de pagamento ativo | 1. No chat ativo, clicar no ícone de sacola na toolbar. 2. Observar estado de carregamento. 3. Aguardar carregamento completo. | Painel abre como modal lateral. Durante carregamento: skeleton de 10 cards exibido. Após carga: grid com todos os produtos exibidos, filtro "Todas as categorias" ativo por padrão. Nome completo visível em cada card sem truncamento. *(CA: abertura, skeleton, grid, filtro padrão)* | 🔴 Alta |
| CT-CAT-002 | Adicionar produto com pagamento ativo | Operador logado; catálogo aberto; método de pagamento ativo configurado | 1. No catálogo aberto, localizar um produto. 2. Clicar em "Adicionar ao carrinho". 3. Observar feedback visual. 4. Observar badge no ícone de carrinho. | Toast "Produto adicionado ao carrinho!" exibido no canto superior direito. Toast some após 2s. Botão do produto animado para "Adicionado ✓" por 2s. Badge do ícone de carrinho incrementa em +1. *(CA: toast, animação, badge; RN3)* | 🔴 Alta |
| CT-CAT-003 | Filtrar produtos por categoria sem reload | Catálogo aberto com múltiplas categorias e produtos | 1. No catálogo, clicar em uma categoria específica (ex.: "Eletrônicos"). 2. Observar o grid. 3. Clicar em outra categoria. 4. Clicar em "Todas as categorias". | A cada seleção: grid refiltra instantaneamente sem reload de página, exibindo apenas produtos da categoria selecionada. Ao selecionar "Todas as categorias": todos os produtos voltam a ser exibidos. *(CA: filtro; RN2 — filtro client-side)* | 🟡 Média |
| CT-CAT-004 | Enviar carrinho no chat via botão "Enviar" | Operador logado; catálogo aberto; método de pagamento ativo; carrinho com ao menos 1 item | 1. No catálogo, localizar um produto. 2. Clicar no botão "Enviar" do produto. 3. Observar o chat ativo. | O carrinho é enviado ao contato no chat ativo sem erros. *(CA: botão "Enviar" funcional com pagamento ativo)* | 🟡 Média |
| CT-CAT-005 | Banner de bloqueio exibido ao abrir sem pagamento | Operador logado; conta sem método de pagamento configurado; chat ativo aberto | 1. Clicar no ícone de sacola na toolbar para abrir o catálogo. 2. Observar o estado do painel ao carregar. | Banner "Configure um método de pagamento para começar a vender pelo chat." exibido automaticamente, sem necessidade de clicar em nenhum botão. Todos os cards exibem overlay. Botões "Adicionar ao carrinho" e "Enviar" aparecem desabilitados (não clicáveis). Badge não é alterado. *(CA: estado bloqueado; Comportamento 6)* | 🔴 Alta |
| CT-CAT-006 | CTA "Configurar agora" redireciona corretamente | Catálogo aberto no estado bloqueado (sem método de pagamento) | 1. Com banner de bloqueio visível, clicar no CTA "Configurar agora". | Usuário é redirecionado para a tela de criação de método de pagamento. Navegação ocorre sem erros. *(CA: "Banner de bloqueio exibe CTA 'Configurar aqui' funcional")* | 🟡 Média |
| CT-CAT-007 | Catálogo vazio exibe estado correto com CTA | Operador logado; catálogo da conta sem produtos cadastrados | 1. Abrir o catálogo pelo ícone de sacola na toolbar. 2. Aguardar carregamento. | Estado vazio exibido com mensagem: "Seu catálogo está vazio. Adicione produtos em Configurações > Poli Pay." CTA funcional visível. Nenhum produto ou skeleton persistente exibido. *(CA: estado vazio)* | 🟡 Média |
| CT-CAT-008 | Erro de carregamento com retry mantém filtro | Operador logado; simular falha na API de catálogo; categoria "Roupas" selecionada antes da falha | 1. Abrir catálogo. 2. Selecionar a categoria "Roupas". 3. Simular queda de rede ou erro de API. 4. Verificar estado exibido. 5. Clicar em "Tentar novamente". | Passo 4: estado de erro com mensagem "Não foi possível carregar o catálogo." e botão "Tentar novamente" exibidos. Passo 5: catálogo recarrega mantendo o filtro "Roupas" selecionado (não reseta para "Todas as categorias"). *(CA: estado de erro; regra de retry confirmada)* | 🟡 Média |
| CT-CAT-009 | Mesmo produto adicionado múltiplas vezes | Catálogo aberto; método de pagamento ativo | 1. Localizar um produto no catálogo. 2. Clicar em "Adicionar ao carrinho" 3 vezes no mesmo produto. 3. Observar o badge do carrinho. | A cada clique: toast exibido, botão anima para "Adicionado ✓". Após 3 cliques: badge do carrinho exibe 3 (soma de quantidades), não 1 (produtos distintos). Nenhuma linha duplicada criada no carrinho. *(RN3 — múltiplas adições; RN5 — badge por quantidade)* | 🟡 Média |
| CT-CAT-010 | Fechar painel não altera estado do carrinho | Catálogo aberto; ao menos 1 produto adicionado ao carrinho (badge = 2) | 1. Com badge mostrando 2 itens, clicar no botão × para fechar o catálogo. 2. Observar o badge após fechar. 3. Reabrir o catálogo. | Painel fecha. Badge permanece em 2 (estado do carrinho preservado). Ao reabrir, catálogo carrega normalmente. *(CA: fechar painel não afeta estado do carrinho)* | 🟡 Média |
| CT-CAT-011 | Catálogo e carrinho não abertos simultaneamente | Catálogo aberto | 1. Com o catálogo aberto, clicar no ícone do carrinho na toolbar. 2. Observar o catálogo. 3. Com o carrinho aberto, clicar no ícone de sacola (catálogo). 4. Observar o carrinho. | Passo 1: drawer do carrinho abre e painel do catálogo fecha automaticamente. Passo 3: painel do catálogo abre e drawer do carrinho fecha automaticamente. *(CA: "Abrir o catálogo fecha o drawer do carrinho e vice-versa")* | 🟡 Média |
| CT-CAT-012 | Trocar conversa fecha painel e atualiza badge | Catálogo aberto na conversa A (badge = 3); conversa B com carrinho vazio | 1. Com catálogo aberto na conversa A, clicar em uma conversa diferente (conversa B) na lista de chats. | Painel do catálogo fecha. Badge do ícone de carrinho atualiza para refletir o estado do carrinho da conversa B (ex.: 0). *(CA: trocar conversa fecha painel e badge atualiza)* | 🟢 Baixa |
| CT-CAT-013 | XSS via nome de produto no card | Operador logado; produto cadastrado com nome contendo payload XSS: `<script>alert('xss')</script>` | 1. Abrir o catálogo. 2. Localizar o card do produto com nome de payload. 3. Observar como o nome é renderizado. | O nome do produto é exibido como texto literal `<script>alert('xss')</script>` — nenhum script executado, nenhum alert disparado, DOM não alterado. HTTP 200 sem efeitos colaterais. *(Segurança)* | 🔴 Alta |

---

## Cenários Gherkin (BDD)

```gherkin
Cenário: Adicionar produto ao carrinho com método de pagamento ativo
  Dado que o operador está em um chat ativo com método de pagamento configurado
  E o painel do catálogo está aberto com produtos visíveis na grid
  Quando o operador clica em "Adicionar ao carrinho" em um produto
  Então o toast "Produto adicionado ao carrinho!" é exibido no canto superior direito
  E o toast desaparece automaticamente após 2 segundos
  E o botão do produto exibe "Adicionado ✓" por 2 segundos
  E o badge do ícone de carrinho na toolbar incrementa em 1
```

```gherkin
Cenário: Banner de bloqueio exibido automaticamente ao abrir catálogo sem método de pagamento
  Dado que o operador está em um chat ativo
  E a conta não possui método de pagamento configurado
  Quando o operador clica no ícone de sacola para abrir o catálogo
  Então o banner "Configure um método de pagamento para começar a vender pelo chat." é exibido automaticamente
  E os botões "Adicionar ao carrinho" e "Enviar" aparecem desabilitados em todos os cards
  E o badge do carrinho não é alterado
```

---

**Resumo:** 13 cenários — 🔴 4 Alta | 🟡 8 Média | 🟢 1 Baixa
