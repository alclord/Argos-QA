# Cenários de Teste — DEV4-4207
> Card: Carrinho de Compras no Chat
> Gerado em: 2026-05-22

---

## BLOCO 1 — Estratégia de Teste

**Escopo:** Drawer lateral do carrinho, gerenciamento de itens (add/remove/qty), seleção de método de pagamento, sub-tela de dados de entrega, envio do pedido via `POST /api/v1/cart/send`, bolha de pedido no histórico e atualização de status via webhook.

**Tipos de teste aplicáveis:**
- **Funcional** (prioridade máxima): fluxo completo de envio, controles de quantidade, validações de pré-envio, navegação entre telas do drawer
- **Integração:** contrato com PRD Catálogo (evento `cart_item_added`, badge), endpoint de envio, webhook de atualização de status
- **Regressão:** comportamento do histórico do chat, toolbar e troca de conversa
- **Segurança:** autenticação no endpoint de envio e integridade dos dados trafegados
- **UX/Visual:** estado vazio, loading, toasts, contraste WCAG AA, fonte Rubik

**Prioridade de execução:** Fluxo de envio (crítico — ponto de fechamento de venda) → Bolha e webhook → Controles de item → Sub-tela de entrega → Visual/edge cases.

**Riscos principais:** Falha silenciosa no envio sem feedback ao operador; dessincronia do badge ao trocar de conversa; webhook não atualizar a bolha em tempo real; perda de dados do carrinho ao fechar/reabrir o drawer.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Falha na `POST /api/v1/cart/send` sem feedback adequado ao operador (toast/banner ausentes) | M | A | Alta |
| Webhook de pagamento não atualizar a bolha em tempo real (delay ou falha silenciosa) | M | A | Alta |
| Dados do carrinho perdidos ao fechar e reabrir o drawer durante o loading | B | A | Alta |
| Chamada ao endpoint de envio sem autenticação válida aceita pela API | B | A | Alta |
| Badge desincronizado ao trocar de conversa (mostra qty do contato errado) | M | M | Média |
| Botão "Enviar" habilitado mesmo sem método de pagamento selecionado | B | M | Média |
| Drawer sobrepondo o histórico de mensagens em resoluções menores | M | M | Média |
| Total calculado incorretamente ao alterar quantidade de múltiplos itens em sequência rápida | B | M | Média |
| Sub-tela de entrega perdendo dados preenchidos ao navegar de volta | B | M | Média |
| Botão `−` não desabilitando visualmente quando qty=1 | B | B | Baixa |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade |
|---|---|---|---|---|---|
| CT-CART-001 | Envio completo do carrinho com sucesso | Operador logado; conversa ativa; ≥ 1 produto no catálogo; conta com método de pagamento ativo e padrão configurado | 1. Adicionar 1 produto via catálogo (evento `cart_item_added` emitido) 2. Clicar no ícone de carrinho na toolbar 3. Verificar item na lista com qty, valor unitário e subtotal 4. Confirmar método de pagamento padrão pré-selecionado no dropdown 5. Clicar em "Enviar carrinho" | Botão entra em loading (spinner, campos bloqueados); `POST /api/v1/cart/send` retorna HTTP 200; drawer fecha; badge zerado; toast verde "Carrinho enviado com sucesso!" exibido por ~3s; bolha de pedido injetada no histórico com status "Aguardando pagamento", exibindo lista de itens, total, método e ID do pedido | 🔴 Alta |
| CT-CART-002 | Bolha atualiza para "Pagamento confirmado" via webhook | Pedido enviado com sucesso (bolha no histórico com "Aguardando pagamento"); ambiente com webhook configurado | 1. Confirmar bolha visível com status "Aguardando pagamento" 2. Simular webhook `order.status = "paid"` para o pedido 3. Observar a bolha sem recarregar a página | Badge da bolha atualiza em tempo real para "Pagamento confirmado" em cor verde; demais dados da bolha (itens, total, ID) permanecem inalterados; nenhum reload necessário | 🔴 Alta |
| CT-CART-003 | Erro de API 500 no envio preserva dados | Operador logado; carrinho com ≥ 2 itens, método selecionado e dados de entrega preenchidos; mock ou proxy configurado para retornar HTTP 500 | 1. Montar carrinho com 2 itens distintos e selecionar método de pagamento 2. Preencher logradouro e número em dados de entrega 3. Forçar retorno HTTP 500 na `POST /api/v1/cart/send` 4. Clicar em "Enviar carrinho" | API retorna HTTP 500; drawer permanece aberto; itens, quantidades, método de pagamento e dados de entrega preservados; toast "Não foi possível enviar o carrinho. Tente novamente."; banner de erro inline visível no drawer; badge não zerado; botão "Enviar carrinho" retorna ao estado ativo | 🔴 Alta |
| CT-CART-004 | Envio sem autenticação retorna 401 | Token de autenticação ausente ou inválido (via DevTools/proxy); carrinho com ≥ 1 item e método selecionado | 1. Interceptar requisição `POST /api/v1/cart/send` via DevTools/proxy 2. Remover ou invalidar o header `Authorization: Bearer <token>` 3. Disparar a requisição de envio | API retorna HTTP 401 Unauthorized; nenhum pedido criado no backend; drawer permanece aberto com dados preservados; mensagem de erro exibida ao operador | 🔴 Alta |
| CT-CART-005 | Botão enviar desabilitado sem método selecionado | Operador logado; carrinho com ≥ 1 item; nenhum método de pagamento selecionado no dropdown | 1. Adicionar 1 produto ao carrinho 2. Abrir drawer do carrinho 3. Remover seleção do dropdown (ou acessar conta sem método padrão) 4. Tentar clicar em "Enviar carrinho" | Botão "Enviar carrinho" visualmente desabilitado (atributo `disabled`); nenhuma requisição disparada ao clicar; nenhum toast ou modal exibido | 🟡 Média |
| CT-CART-006 | Abrir drawer fecha catálogo e vice-versa | Operador logado; catálogo e carrinho disponíveis na toolbar | 1. Abrir o catálogo (painel visível) 2. Clicar no ícone de carrinho na toolbar 3. Verificar estado dos dois painéis 4. Clicar no ícone do catálogo com o drawer aberto | No passo 2: drawer abre e catálogo fecha automaticamente; histórico do chat visível sem sobreposição; no passo 4: catálogo abre e drawer fecha automaticamente; nunca ambos abertos simultaneamente | 🟡 Média |
| CT-CART-007 | Troca de conversa fecha drawer e muda carrinho | ≥ 2 conversas ativas; Conversa A com 2 itens no carrinho; Conversa B sem itens; drawer aberto na Conversa A | 1. Com drawer aberto na Conversa A (2 itens), clicar na Conversa B na lista 2. Verificar estado do drawer e do badge 3. Abrir drawer na Conversa B 4. Retornar à Conversa A e abrir drawer | No passo 2: drawer fecha; badge atualiza para 0; no passo 3: estado vazio exibido; no passo 4: 2 itens da Conversa A preservados | 🟡 Média |
| CT-CART-008 | Bolha atualiza para "Link expirado" via webhook | Pedido enviado com sucesso (bolha com "Aguardando pagamento"); ambiente com webhook configurado | 1. Confirmar bolha visível com "Aguardando pagamento" 2. Simular webhook `order.status = "expired"` para o pedido 3. Observar a bolha sem recarregar a página | Badge da bolha atualiza em tempo real para "Link expirado" em cor vermelha; demais dados permanecem inalterados; nenhum reload necessário | 🟡 Média |
| CT-CART-009 | Mesmo produto adicionado 2x incrementa qty | Operador logado; 1 produto disponível no catálogo | 1. Adicionar Produto A via catálogo → drawer mostra qty=1 2. Adicionar o mesmo Produto A novamente 3. Abrir drawer do carrinho | Produto A aparece em uma única linha com qty=2 (sem duplicatas); total recalculado: `unitPrice × 2`; badge atualizado | 🟡 Média |
| CT-CART-010 | Navegação para entrega preserva dados preenchidos | Drawer aberto com ≥ 1 item | 1. Clicar em "Dados de entrega" 2. Verificar header "Dados de entrega" com botão de voltar 3. Preencher Logradouro "Rua Exemplo", Número "42", CEP "01310-100" 4. Clicar em "Cancelar" 5. Clicar novamente em "Dados de entrega" — verificar campos 6. Preencher campos e clicar em "Salvar" 7. Reabrir "Dados de entrega" | Passo 2: sub-tela abre sem fechar drawer; passo 4 (Cancelar): retorna ao drawer preservando dados digitados; passo 5: campos preenchidos visíveis; passo 6 (Salvar): retorna salvando dados; passo 7: dados persistidos | 🟡 Média |
| CT-CART-011 | Botão "−" desabilitado quando qty é 1 | Drawer aberto com 1 item com qty=1 | 1. Verificar item no drawer com qty=1 2. Verificar estado visual do botão "−" 3. Tentar clicar no botão "−" | Botão "−" visualmente desabilitado; nenhuma ação ao clicar; qty permanece 1; lixeira permanece ativa | 🟢 Baixa |
| CT-CART-012 | Estado vazio exibido ao abrir drawer sem itens | Operador logado; carrinho sem itens para o contato ativo | 1. Garantir que não há itens no carrinho do contato ativo 2. Clicar no ícone de carrinho na toolbar | Drawer abre com estado vazio; mensagem "Nenhum produto adicionado. Busque um item no catálogo para começar." exibida; badge exibe 0 ou ausente; botão "Enviar carrinho" desabilitado | 🟢 Baixa |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Cenário: Envio completo do carrinho com sucesso
  Dado que o operador está em uma conversa ativa com um contato
  E o carrinho contém ao menos 1 item adicionado via catálogo
  E um método de pagamento está selecionado no dropdown
  Quando o operador clica em "Enviar carrinho"
  Então o botão exibe um spinner e os campos ficam bloqueados
  E a API POST /api/v1/cart/send retorna HTTP 200
  E o drawer é fechado automaticamente
  E o badge na toolbar é zerado
  E o toast "Carrinho enviado com sucesso!" é exibido
  E uma bolha de pedido com status "Aguardando pagamento" é injetada no histórico do chat
```

```gherkin
Cenário: Erro de API 500 no envio preserva todos os dados do carrinho
  Dado que o operador está com o drawer do carrinho aberto
  E o carrinho contém 2 itens com método de pagamento selecionado
  E dados de entrega foram preenchidos
  E a API POST /api/v1/cart/send está configurada para retornar HTTP 500
  Quando o operador clica em "Enviar carrinho"
  Então a API retorna HTTP 500
  E o drawer permanece aberto
  E todos os itens, quantidades, método de pagamento e dados de entrega são preservados
  E o toast "Não foi possível enviar o carrinho. Tente novamente." é exibido
  E um banner de erro inline é exibido dentro do drawer
  E o badge na toolbar não é zerado
```

---

**Resumo:** 12 cenários — 🔴 4 Alta | 🟡 6 Média | 🟢 2 Baixa
