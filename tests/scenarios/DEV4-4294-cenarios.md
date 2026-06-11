# Cenários de Teste — DEV4-4294
> Card: Campo Empresa nos Detalhes do Contato
> Gerado em: 2026-06-02
> Card atualizado em: 2026-06-02T08:32:49.420-0300

---

## Resumo do Card

- **Título:** Campo Empresa nos Detalhes do Contato
- **Tipo:** História
- **Prioridade:** Medium
- **Status:** Criando Cenários de Teste
- **Épico pai:** DEV4-4283 — Gestão de Empresas para Contatos (B2B)
- **Objetivo:** Adicionar uma seção na tela de detalhes do contato que exibe e permite editar a empresa vinculada ao contato. Inclui visualização com status, link de navegação para a empresa e modal de edição com busca/autocompletar. É uma integração visual da relação contato ↔ empresa no contexto B2B.

---

## BLOCO 1 — Estratégia de Teste

O card DEV4-4294 adiciona uma seção de empresa na tela de detalhes do contato, com modal de edição, busca/autocompletar e sincronização com o CRM Flow. Os tipos de teste aplicáveis são: **funcional (UI)** — cobrindo exibição, edição, desatribuição e navegação; **integração (API)** — validando o PUT `api/v1/contacts/:id` e a sincronização com Flow; **regressão** — garantindo que a visualização de contatos sem empresa não quebre; e **segurança** — verificando que usuários sem permissão não consigam editar vínculos. Prioridade de execução: sincronização com Flow e persistência de `company_id` primeiro (maior risco), seguido de UI. Riscos principais: falha silenciosa na sincronização com Flow (sem feedback ao usuário), estado inconsistente entre UI e DB após erro de rede, e falta de controle de permissão por perfil (apenas Gestor deve editar).

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Sincronização com Flow falhar silenciosamente (sem toast de erro) | M | A | Alta |
| company_id salvo no DB mas Flow não notificado (dessincronia) | M | A | Alta |
| Contato ficar com company_id de empresa deletada (ausência de cascata) | B | A | Alta |
| Modal fechar sem salvar após erro de rede (perda de ação do usuário) | M | M | Média |
| UI não atualizar após salvar (cache TanStack Query não invalidado) | M | M | Média |
| Usuário com role agent conseguir editar empresa (sem controle de permissão) | B | A | Alta |
| Busca retornar empresas de outros accounts (vazamento multi-tenant) | B | A | Alta |
| Estado "Sem empresa atribuída" não exibido para contatos sem empresa | M | M | Média |
| Responsividade quebrada em mobile no modal de busca | M | B | Baixa |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-EMPRESA-001 | Exibir empresa vinculada no detalhe do contato | Contato existente com empresa vinculada (company_id preenchido). Usuário autenticado com qualquer role. | 1. Acesse a tela de detalhes do contato. 2. Localize a seção "Empresa". 3. Verifique os dados exibidos. | Seção "Empresa" exibe: nome da empresa, badge de status com cor correspondente (ex: Cliente=verde, Lead=amarelo), número de contatos na empresa e data da última interação. | 🔴 Alta | UI | — |
| CT-EMPRESA-002 | Trocar empresa do contato com sucesso | Contato com empresa A vinculada. Empresa B existente no account. Usuário autenticado com role manager ou superior. | 1. Abra os detalhes do contato. 2. Clique em "Editar" na seção Empresa. 3. No modal, busque pelo nome da empresa B. 4. Selecione a empresa B na lista. 5. Clique em "Salvar". | Toast "Atualizando..." exibido durante a operação. Após sucesso: toast "✓ Contato atualizado com sucesso". Seção Empresa exibe a empresa B. Modal fecha sem erros. `updated_at` do contato é atualizado. PUT `/api/v1/contacts/:id` enviado com novo `company_id`. Sincronização com Flow realizada. | 🔴 Alta | UI | CT-EMPRESA-001 |
| CT-EMPRESA-003 | Desatribuir empresa do contato com sucesso | Contato com empresa vinculada. Usuário com role manager ou superior. | 1. Abra detalhes do contato. 2. Clique em "Editar" na seção Empresa. 3. No modal, selecione "Desatribuir empresa". 4. Confirme na tela de confirmação ("Desatribuir empresa deste contato?"). 5. Confirme a ação. | Toast "Atualizando..." exibido. Após sucesso: toast "✓ Empresa removida". Seção exibe "Sem empresa atribuída". `company_id` = null no banco. Sincronização com Flow da empresa anterior realizada. | 🔴 Alta | UI | CT-EMPRESA-001 |
| CT-EMPRESA-004 | Contato sem empresa exibe estado vazio correto | Contato existente sem empresa vinculada (company_id = null). | 1. Acesse os detalhes do contato sem empresa. 2. Localize a seção "Empresa". | Seção exibe o texto "Sem empresa atribuída" (sem erro, sem quebra de layout). Botão "Editar" disponível para atribuir uma empresa. | 🟡 Média | UI | — |
| CT-EMPRESA-005 | Busca por nome de empresa no modal exibe badge de status | Pelo menos 3 empresas cadastradas no account com status distintos (ex: Cliente, Lead, Prospect). Modal de edição de empresa aberto. | 1. Com o modal aberto, digite parte do nome de uma empresa no campo de busca. 2. Aguarde resultados. 3. Observe os itens retornados. | Lista filtra e exibe apenas empresas cujo nome corresponde ao texto digitado. Resultado aparece sem necessidade de pressionar Enter (autocompletar enquanto digita). Cada resultado exibe nome e badge de status com cor correspondente ao tipo (Cliente, Lead, Prospect). | 🟡 Média | UI | CT-EMPRESA-002 |
| CT-EMPRESA-006 | Erro ao salvar troca de empresa exibe retry | Contato com empresa. Simular falha de rede ou erro HTTP 500 no endpoint PUT /api/v1/contacts/:id. | 1. Abra detalhes do contato. 2. Clique em "Editar". 3. Selecione nova empresa. 4. Clique "Salvar" (com rede bloqueada ou endpoint retornando erro). | Toast "⚠ Erro ao atualizar" exibido. Botão "Tentar Novamente" disponível e funcional. Modal permanece aberto para nova tentativa. `company_id` no DB não alterado. | 🔴 Alta | UI | CT-EMPRESA-002 |
| CT-EMPRESA-007 | Erro ao desatribuir empresa exibe retry | Contato com empresa. Simular erro HTTP 500 no PUT /api/v1/contacts/:id. | 1. Abra detalhes do contato. 2. Clique "Editar". 3. Selecione "Desatribuir empresa". 4. Confirme. 5. Requisição falha. | Toast "⚠ Erro ao remover" exibido. Botão "Tentar Novamente" disponível. `company_id` permanece inalterado. Seção ainda exibe a empresa anterior. | 🔴 Alta | UI | CT-EMPRESA-003 |
| CT-EMPRESA-008 | Loading state visível durante sincronização com Flow | Contato com empresa. Usuário com role manager. | 1. Troque a empresa do contato (clique "Editar", selecione nova empresa, clique "Salvar"). 2. Observe o comportamento da UI logo após clicar "Salvar" e antes do retorno da API. | Loading state visível (spinner ou toast "Atualizando...") exibido entre o clique em "Salvar" e o retorno da operação. UI não congela; outros elementos da página permanecem responsivos. Após conclusão: toast de sucesso ou erro exibido corretamente. | 🟡 Média | UI | CT-EMPRESA-002 |
| CT-EMPRESA-009 | Link "Ver empresa" navega para tela da empresa | Contato com empresa vinculada. | 1. Abra detalhes do contato. 2. Localize e clique no link/botão "Ver empresa". | Navegação para a tela de detalhes da empresa vinculada. URL muda para a tela de empresa correta. | 🟡 Média | UI | CT-EMPRESA-001 |
| CT-EMPRESA-010 | Busca retorna vazio quando empresa não existe | Modal de edição aberto. | 1. Digite no campo de busca um nome de empresa inexistente (ex: "XYZZZZ123"). | Mensagem "Nenhuma empresa encontrada" (ou equivalente) exibida. Nenhum resultado listado. Nenhum erro de interface. | 🟢 Baixa | UI | CT-EMPRESA-005 |
| CT-EMPRESA-011 | Cancelar modal não altera empresa do contato | Contato com empresa A. Modal de edição aberto. | 1. Abra modal de edição. 2. Selecione empresa B. 3. Clique em "Cancelar" (sem salvar). 4. Verifique a seção Empresa nos detalhes. | Modal fecha. Seção Empresa continua exibindo empresa A (sem alteração). Nenhuma chamada PUT realizada. | 🟡 Média | UI | CT-EMPRESA-001 |
| CT-EMPRESA-012 | Usuário com role agent não pode editar empresa | Usuário autenticado com role agent (sem permissão de gestor). Contato com empresa vinculada. ⚠️ Assunção: card menciona Gestor como quem edita empresa — restrição de agent é inferida das user stories, não explicitada. | 1. Autentique-se com usuário de role agent. 2. Acesse detalhes do contato. 3. Verifique a seção Empresa. | Botão "Editar" não exibido ou desabilitado para role agent. Nenhuma ação de edição disponível. Empresa exibida apenas em modo leitura. | 🔴 Alta | UI | — |
| CT-EMPRESA-013 | Busca de empresa não vaza dados de outro account | Dois accounts distintos cadastrados. Cada um com empresas próprias. Usuário do account A logado. ⚠️ Bloqueável — requer acesso a um segundo account no ambiente de staging. | 1. Abra modal de edição de empresa. 2. Busque por nome de empresa exclusiva do account B. | Apenas empresas do account A são retornadas. Nenhum dado do account B é exibido. API responde com escopo filtrado por `account_id`. | 🔴 Alta | API | — |
| CT-EMPRESA-014 | Empresa deletada: contato fica sem empresa (cascata) | Empresa vinculada ao contato. ⚠️ Bloqueável — requer que a empresa seja deletada no sistema; escopo de exclusão de empresa pertence ao épico pai DEV4-4283. | 1. Vincule empresa ao contato. 2. Delete a empresa no sistema (via funcionalidade do épico pai). 3. Acesse detalhes do contato. | Seção exibe "Sem empresa atribuída". `company_id` do contato = null (cascata aplicada). Nenhum erro de referência quebrada exibido. | 🔴 Alta | API | CT-EMPRESA-001 |
| CT-EMPRESA-015 | Tela responsiva em mobile (modal de edição) | Dispositivo ou viewport mobile (≤ 375px de largura). | 1. Acesse detalhes do contato em viewport mobile. 2. Clique "Editar" na seção Empresa. 3. Interaja com o modal: busca e seleção. | Seção Empresa renderiza corretamente. Modal abre e ocupa tela adequada para mobile. Campo de busca e lista de resultados utilizáveis. Botões "Salvar" e "Cancelar" acessíveis sem scroll horizontal. | 🟢 Baixa | UI | CT-EMPRESA-002 |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Cenário: Trocar empresa do contato com sucesso e sincronizar com Flow
  Dado que estou autenticado com role "manager" ou superior
  E existe um contato com empresa "Tech Corp" vinculada
  E existe uma empresa "Sales Inc" cadastrada no mesmo account
  Quando acesso os detalhes do contato
  E clico em "Editar" na seção de Empresa
  E busco por "Sales" no campo de busca do modal
  E seleciono "Sales Inc" na lista de resultados
  E clico em "Salvar"
  Então vejo o toast "Atualizando..." durante o processamento
  E vejo o toast "✓ Contato atualizado com sucesso" após a conclusão
  E a seção Empresa exibe "Sales Inc" com seu status e última interação
  E uma requisição PUT é enviada para "/api/v1/contacts/:id" com o novo company_id
  E a sincronização com o Flow é realizada para a empresa anterior e a nova
```

```gherkin
Cenário: Falha ao salvar troca de empresa exibe toast de erro com retry
  Dado que estou autenticado com role "manager" ou superior
  E existe um contato com empresa vinculada
  E o endpoint PUT "/api/v1/contacts/:id" retornará erro HTTP 500
  Quando acesso os detalhes do contato
  E clico em "Editar" na seção de Empresa
  E seleciono uma nova empresa no modal
  E clico em "Salvar"
  Então vejo o toast "⚠ Erro ao atualizar"
  E o botão "Tentar Novamente" está disponível e funcional
  E o modal permanece aberto
  E o company_id do contato não é alterado no banco de dados
  E a seção Empresa continua exibindo a empresa anterior
```

---

## Validação por Agente Crítico

```
✅ Validação por agente crítico concluída:
   Aprovados sem alteração: 11
   Revisados: 4 (CT-EMPRESA-005, CT-EMPRESA-008, CT-EMPRESA-012, CT-EMPRESA-014)
   Adicionados por cobertura insuficiente: 0
```

**Ajustes aplicados:**
- CT-EMPRESA-005: adicionado verificação de badge de status nos resultados da busca
- CT-EMPRESA-008: reformulado para não depender de latência simulada artificialmente
- CT-EMPRESA-012: adicionada nota de assunção inferida das user stories do card
- CT-EMPRESA-014: pré-requisito reformulado como bloqueável com dependência do épico pai

---

## Resumo Final

| Criticidade | Cenários |
|---|---|
| 🔴 Alta | CT-EMPRESA-001, CT-EMPRESA-002, CT-EMPRESA-003, CT-EMPRESA-006, CT-EMPRESA-007, CT-EMPRESA-012, CT-EMPRESA-013, CT-EMPRESA-014 |
| 🟡 Média | CT-EMPRESA-004, CT-EMPRESA-005, CT-EMPRESA-008, CT-EMPRESA-009, CT-EMPRESA-011 |
| 🟢 Baixa | CT-EMPRESA-010, CT-EMPRESA-015 |

**Total: 15 cenários de teste | 2 cenários Gherkin**
- 🔴 Alta: 8
- 🟡 Média: 5
- 🟢 Baixa: 2
