# Cenários de Teste — DEV4-4256
> Card: Dados do Plano (Nova interface)
> Gerado em: 2026-06-12
> Card atualizado em: 2026-06-10T17:25:47 -0300

---

## BLOCO 1 — Estratégia de Teste

Esta entrega unifica duas telas legadas (Dados do Plano + Assinaturas) em uma única seção da nova interface, e introduz funcionalidade inédita: **desativação de recorrência de assinatura diretamente pela plataforma**, eliminando a intervenção manual no banco de dados. Tipos de teste aplicáveis: UI funcional (modais, redirecionamentos, estados condicionais), API (controle de acesso, logs de auditoria, validações de compra) e regressão (fluxo de pagamento via cartão não rompido). Prioridade de execução: 1º controle de acesso (Gestor only), 2º desativação de recorrência — irreversível e com log obrigatório, 3º regras condicionais de exibição de botões por status, 4º validações de formulário, 5º happy paths de tabela e listagem. Riscos principais: inconsistência de estado após falha no endpoint de desativação, exibição incorreta do botão "Desativar recorrência" para status indevidos, ausência de log de auditoria e validação insuficiente na compra de assinaturas.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade | Impacto | Prioridade |
|---|---|---|---|
| Endpoint de desativação falha silenciosamente — UI atualiza mas backend não persiste | M | A | Alta |
| Botão "Desativar recorrência" exibido para status diferentes de "Recorrente" | M | A | Alta |
| Log de auditoria não registrado após desativação ou remoção de adicional | B | A | Alta |
| Opções de Pagamento exibidas para status "Pagamento Aprovado" | M | A | Alta |
| Acesso de Operadores à seção sem permissão de Gestor | B | A | Alta |
| Badge não atualiza sem reload após desativação bem-sucedida | M | M | Média |
| Cálculo de valor total não reage dinamicamente a mudanças de pacote/quantidade | M | M | Média |
| Lista de assinaturas não recarrega após compra bem-sucedida | M | M | Média |
| Remoção de adicional com canal ativo não bloqueada corretamente | B | A | Alta |
| "Solicitar upgrade" habilitado sem seleção de plano | B | M | Média |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-PLAN-001 | Tabela plano e adicionais carrega | Usuário logado como Gestor | 1. Navegar para Minha Empresa > Dados do Plano 2. Observar estado de carregamento 3. Aguardar tabela renderizar | Skeleton exibido durante fetch; tabela exibe linhas para WhatsApp, WABA, Facebook Messenger, Instagram, WebChat e Usuários com colunas "Plano base \| Adicionais \| Total"; ícones de canal com identidade visual correta por plataforma | 🔴 Alta | UI | — |
| CT-PLAN-002 | Upgrade de plano abre WhatsApp em nova aba | Usuário Gestor; seção Plano e adicionais acessada | 1. Clicar em "Aumentar meu plano" 2. Selecionar um plano via radio button no modal 3. Clicar em "Solicitar upgrade" | Modal abre com radio buttons de planos disponíveis; "Solicitar upgrade" habilitado somente após seleção; nova aba abre com URL `https://wa.me/[número]?text=Olá!%20Gostaria%20de%20fazer%20upgrade%20para%20o%20[plano%20selecionado].` com mensagem pré-preenchida contendo o plano selecionado | 🔴 Alta | UI | CT-PLAN-001 |
| CT-PLAN-003 | Remover adicional com sucesso | Usuário Gestor; conta possui adicional com canal inativo e usuários dentro do limite ⚠️ Bloqueável — verificar via "Gerenciar adicionais" | 1. Clicar em "Gerenciar adicionais" 2. Clicar em "Remover" no item desejado 3. Confirmar remoção inline (2 etapas) | Modal lista adicionais; após confirmação: listagem atualizada + banner verde "Adicional removido com sucesso!" + toast externo; log de auditoria gerado com {usuario_id, adicional_tipo, quantidade, data, conta_id} | 🔴 Alta | UI | CT-PLAN-001 |
| CT-PLAN-004 | Adquirir canais redireciona sem modal | Usuário Gestor | 1. Clicar em "Adquirir canais" | Redirecionamento direto para `/channels` sem modal intermediário | 🟡 Média | UI | CT-PLAN-001 |
| CT-PLAN-005 | Adquirir usuários redireciona sem modal | Usuário Gestor | 1. Clicar em "Adquirir usuários" | Redirecionamento direto para `/users` sem modal intermediário | 🟡 Média | UI | CT-PLAN-001 |
| CT-PLAN-006 | Lista assinaturas ordenada desc com skeleton | Usuário Gestor; conta com ≥ 2 assinaturas em datas distintas ⚠️ Bloqueável — verificar existência de assinaturas no ambiente | 1. Navegar para Dados do Plano > Assinaturas 2. Verificar ordem das linhas e colunas | Skeleton exibido durante carregamento; lista ordenada por Data Solicitação decrescente (mais recente no topo); cada linha exibe: Serviço, Quantidade, Data, Valor Total, badge de Status e ícone olho | 🔴 Alta | UI | — |
| CT-PLAN-007 | Modal Resumo da transação exibe dados corretos | Conta com ≥ 1 assinatura | 1. Clicar no ícone olho de uma assinatura na lista | Modal abre exibindo corretamente: Razão Social, E-mail cadastrado, Status, Vencimento e Valor Total correspondentes à linha selecionada; nenhum campo vazio ou incorreto | 🔴 Alta | UI | CT-PLAN-006 |
| CT-PLAN-008 | Desativar recorrência com sucesso | Usuário Gestor; assinatura com status "Recorrente" ⚠️ Bloqueável — verificar existência de assinatura recorrente no ambiente | 1. Clicar no ícone olho da assinatura com status "Recorrente" 2. Clicar em "Desativar recorrência" 3. Clicar em "Confirmar" no modal de confirmação | POST executado em `/api/v1/subscriptions/:id/deactivate`; toast verde "Recorrência desativada com sucesso!" exibido; badge da linha na lista atualiza para "Recorrência desativada" sem reload de página; botão "Desativar recorrência" desaparece do modal; log registrado com {userId, subscriptionId, action: "deactivate_recurrence", timestamp} | 🔴 Alta | UI | CT-PLAN-006 |
| CT-PLAN-009 | Adicionar assinatura com dados válidos | Usuário Gestor; pacotes disponíveis no sistema ⚠️ Bloqueável — verificar via GET /api/v1/subscriptions/packages | 1. Clicar em "Adicionar assinatura ⊕" 2. Selecionar pacote no dropdown 3. Informar quantidade ≥ 1 4. Verificar valor total calculado 5. Clicar em "Comprar" | Modal fecha; toast verde "Assinatura adicionada com sucesso!" exibido; lista de assinaturas recarregada com o novo item; novo item aparece no topo ordenado por data | 🔴 Alta | UI | CT-PLAN-006 |
| CT-PLAN-010 | Baixar boleto inicia download com toast | Assinatura em status que exibe Opções de Pagamento (ex: Pagamento Pendente) | 1. Clicar no ícone olho da assinatura 2. Clicar em "Baixar boleto" | Download do PDF iniciado; toast "Download do boleto iniciado com sucesso!" exibido | 🟡 Média | UI | CT-PLAN-007 |
| CT-PLAN-011 | Solicitar upgrade bloqueado sem seleção | Usuário Gestor | 1. Clicar em "Aumentar meu plano" 2. Não selecionar nenhum plano 3. Observar botão "Solicitar upgrade" | Botão "Solicitar upgrade" permanece desabilitado; nenhum redirecionamento ou requisição executada | 🔴 Alta | UI | CT-PLAN-001 |
| CT-PLAN-012 | Remover adicional com canal ativo — bloqueado | Conta com adicional cujo canal está ativo | 1. Clicar em "Gerenciar adicionais" 2. Verificar botão "Remover" do canal ativo | Botão "Remover" desabilitado; aviso "Este canal está em uso e não pode ser removido agora." exibido; botões de adicionais elegíveis permanecem habilitados | 🔴 Alta | UI | CT-PLAN-001 |
| CT-PLAN-013 | Remover adicional de usuários acima do limite — bloqueado | Conta com usuários ativos que excedem o limite resultante da remoção | 1. Clicar em "Gerenciar adicionais" 2. Verificar botão "Remover" do adicional de usuários | Botão "Remover" desabilitado; aviso de bloqueio exibido com motivo; nenhuma remoção executada | 🟡 Média | UI | CT-PLAN-001 |
| CT-PLAN-014 | Voltar na confirmação de remoção sem executar | Modal "Gerenciar adicionais" na tela de confirmação inline | 1. Clicar em "Remover" em um item 2. Clicar em "Voltar" na confirmação inline | Tela retorna à listagem de adicionais sem executar remoção; item permanece na lista; nenhum toast ou banner exibido; nenhuma requisição de remoção disparada | 🟡 Média | UI | CT-PLAN-001 |
| CT-PLAN-015 | Desativar recorrência — erro backend preserva status | Assinatura com status "Recorrente"; endpoint de desativação retorna erro | 1. Abrir modal da assinatura recorrente 2. Clicar em "Desativar recorrência" 3. Confirmar | Toast coral resolutivo exibido; badge da linha permanece "Recorrente" sem atualização; botão "Desativar recorrência" permanece visível no modal; status local não alterado; nenhum log de auditoria registrado | 🔴 Alta | UI | CT-PLAN-008 |
| CT-PLAN-016 | Comprar assinatura sem pacote — validação | Modal "Adicionar assinatura" aberto | 1. Não selecionar pacote 2. Clicar em "Comprar" | Erro de validação no campo de pacote: "Selecione um pacote para continuar." Compra não executada; modal permanece aberto | 🟡 Média | UI | CT-PLAN-006 |
| CT-PLAN-017 | Comprar assinatura com quantidade < 1 — validação | Modal "Adicionar assinatura" aberto; pacote selecionado | 1. Selecionar pacote 2. Informar quantidade 0 3. Clicar em "Comprar" | Erro de validação no campo Qtd: "A quantidade deve ser no mínimo 1." Compra não executada | 🟡 Média | UI | CT-PLAN-006 |
| CT-PLAN-018 | Cancelar modal de adicionar assinatura sem ação | Modal "Adicionar assinatura" com campos preenchidos | 1. Selecionar pacote e quantidade 2. Clicar em "Cancelar" | Modal fecha sem executar compra; lista de assinaturas não recarregada; nenhuma cobrança registrada | 🟢 Baixa | UI | CT-PLAN-006 |
| CT-PLAN-019 | Voltar na confirmação de desativação sem ação | Modal da assinatura recorrente com modal de confirmação visível | 1. Clicar em "Desativar recorrência" 2. Clicar em "Voltar" no modal de confirmação | Modal de confirmação fecha; modal de Resumo da transação permanece aberto; status da assinatura não alterado; botão "Desativar recorrência" permanece visível | 🟡 Média | UI | CT-PLAN-008 |
| CT-PLAN-020 | Opções de Pagamento ausentes para "Pagamento Aprovado" | Conta com assinatura em status "Pagamento aprovado" | 1. Clicar no ícone olho da assinatura 2. Verificar seção "Opções de Pagamento" no modal | Seção "Opções de Pagamento" NÃO exibida; botões "Pagar via Cartão" e "Baixar boleto" ausentes | 🔴 Alta | UI | CT-PLAN-006 |
| CT-PLAN-021 | Opções de Pagamento presentes para 4 status aplicáveis | Conta com assinaturas em: Pagamento Atrasado, Pagamento Pendente, Liberação Manual e Recorrente ⚠️ Bloqueável — verificar disponibilidade de cada status no ambiente | Para cada um dos 4 status: 1. Abrir modal da assinatura correspondente 2. Verificar seção "Opções de Pagamento" | Em todos os 4 casos: seção "Opções de Pagamento" exibida com botões "Pagar via Cartão" e "Baixar boleto" visíveis | 🔴 Alta | UI | CT-PLAN-006 |
| CT-PLAN-022 | Botão desativação exclusivo para status Recorrente | Conta com assinaturas em múltiplos status: Aprovado, Pendente, Atrasado, Recorrência desativada e Recorrente | Para cada status diferente de "Recorrente": 1. Abrir modal 2. Verificar ausência do botão. Para status "Recorrente": 1. Abrir modal 2. Verificar presença do botão | Botão "Desativar recorrência" presente SOMENTE no modal da assinatura com status "Recorrente"; ausente em todos os outros status | 🔴 Alta | UI | CT-PLAN-006 |
| CT-PLAN-023 | Badge e botão atualizam sem reload após desativação | Desativação bem-sucedida em progresso (CT-PLAN-008) | Após confirmar desativação, sem recarregar a página: 1. Verificar badge na linha da lista 2. Verificar botão no modal ainda aberto | Badge atualiza de "Recorrente" para "Recorrência desativada" (bg `#E9EAED`, texto `#636B7B`) na lista sem reload; botão "Desativar recorrência" desaparece do modal sem reload; atualização via estado local | 🔴 Alta | UI | CT-PLAN-008 |
| CT-PLAN-024 | Estado vazio de assinaturas exibido | Conta sem assinaturas cadastradas | 1. Navegar para Dados do Plano > Assinaturas | Mensagem de estado vazio exibida: "Nenhum pacote contratado ainda. Adicione sua primeira assinatura."; botão "Adicionar assinatura ⊕" visível; sem erro de runtime | 🟡 Média | UI | — |
| CT-PLAN-025 | Cálculo dinâmico do valor total no modal | Modal "Adicionar assinatura" aberto; ≥ 2 pacotes com preços distintos disponíveis | 1. Selecionar pacote A com quantidade 1 2. Alterar quantidade para 3 3. Alterar pacote para B | Valor Total atualiza automaticamente a cada mudança (pacote × quantidade) sem necessidade de submit; atualização ocorre em tempo real | 🟡 Média | UI | CT-PLAN-006 |
| CT-PLAN-026 | Política de assinaturas exibida no modal | Modal "Adicionar assinatura" aberto | 1. Verificar área de política no modal | Texto exibido: "Créditos não utilizados não acumulam para o mês seguinte. Cancelamentos antes de 3 meses geram cobrança proporcional de R$ 0,89 por crédito." | 🟢 Baixa | UI | CT-PLAN-006 |
| CT-PLAN-027 | Acesso restrito a Gestores | Usuário logado como Operador (sem perfil Gestor) | 1. Tentar navegar para Dados do Plano via UI 2. Tentar chamar GET /api/v1/subscriptions com token de Operador | UI: seção não acessível ou ações desabilitadas/ocultas para Operador; API: HTTP 403 Forbidden retornado para token sem permissão de Gestor | 🔴 Alta | UI | — |
| CT-PLAN-028 | Log de auditoria registrado após remoção de adicional | Usuário Gestor; adicional removível; acesso ao sistema de logs | 1. Realizar remoção de adicional via UI (CT-PLAN-003) 2. Verificar log de auditoria no backend | Log gerado com todos os campos obrigatórios: {usuario_id, adicional_tipo, quantidade, data, conta_id}; nenhum campo ausente ou nulo | 🔴 Alta | API | CT-PLAN-003 |
| CT-PLAN-029 | Log de auditoria registrado após desativação de recorrência | Assinatura com status "Recorrente"; acesso ao sistema de logs | 1. Realizar desativação de recorrência via UI (CT-PLAN-008) 2. Verificar log de auditoria no backend | Log gerado com todos os campos obrigatórios: {userId, subscriptionId, action: "deactivate_recurrence", timestamp}; nenhum campo ausente ou nulo | 🔴 Alta | API | CT-PLAN-008 |

---

## BLOCO 4 — Cenários Gherkin (BDD)

### CT-PLAN-008 — Desativar recorrência com sucesso

```gherkin
Cenário: Gestor desativa recorrência de assinatura ativa
  Dado que o usuário está logado como Gestor
  E existe uma assinatura com status "Recorrente" na lista de assinaturas
  Quando o usuário clica no ícone olho da assinatura recorrente
  E clica em "Desativar recorrência" no modal de Resumo da transação
  E clica em "Confirmar" no modal de confirmação
  Então um toast verde "Recorrência desativada com sucesso!" é exibido
  E o badge da linha na lista atualiza para "Recorrência desativada" sem reload de página
  E o botão "Desativar recorrência" desaparece do modal
  E um log de auditoria é registrado com userId, subscriptionId, action "deactivate_recurrence" e timestamp
```

### CT-PLAN-015 — Falha na desativação preserva estado

```gherkin
Cenário: Falha no backend ao desativar recorrência não altera estado local
  Dado que o usuário está logado como Gestor
  E existe uma assinatura com status "Recorrente"
  E o endpoint POST /api/v1/subscriptions/:id/deactivate retornará erro
  Quando o usuário confirma a desativação da recorrência
  Então um toast coral resolutivo de erro é exibido
  E o badge da linha permanece como "Recorrente" sem alteração
  E o botão "Desativar recorrência" permanece visível no modal
  E nenhum log de desativação é registrado
```

---

**Resumo:** 29 cenários — 🔴 16 Alta | 🟡 10 Média | 🟢 3 Baixa
