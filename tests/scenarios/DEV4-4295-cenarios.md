# Cenários de Teste — DEV4-4295
> Card: Campo Empresa no Formulário de Cadastro de Contato
> Gerado em: 2026-06-02
> Card atualizado em: 2026-06-01T15:19:46.879-0300

---

## BLOCO 1 — Estratégia de Teste

O card envolve uma nova feature de formulário com integração a sistema externo (Flow/CRM). O escopo principal é o **campo empresa no formulário de criação de contato** no foundation-spa. Os tipos de teste aplicáveis são: **funcional** (interação com o campo, dropdown, modal), **integração** (sincronização com Flow), **negativo/erro** (falhas de rede, duplicatas, campos obrigatórios vazios), **UX/responsividade** e **segurança** (isolamento multi-tenant). Prioridade de execução: fluxo de criação de empresa inline com sync Flow (maior risco, integração externa) → criação de contato com empresa existente → campos de erro e fallback. Riscos principais: falha silenciosa de sincronização com Flow sem notificação ao usuário, e ausência de fallback expondo o contato sem company_id.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Sincronização com Flow falhar silenciosamente (sem toast de erro) | M | A | 🔴 Alta |
| Contato criado sem company_id quando empresa foi selecionada | B | A | 🔴 Alta |
| Validação de nome duplicado não bloquear a criação inline | M | A | 🔴 Alta |
| Campo empresa não enviado na payload do POST de contato | B | A | 🔴 Alta |
| Isolamento multi-tenant: empresa de outra account sendo listada | B | A | 🔴 Alta |
| Debounce não funcionando — múltiplos requests disparados ao digitar | M | M | 🟡 Média |
| Retry após 3 falhas não exibir opção "continuar sem sync" | M | M | 🟡 Média |
| Empresa criada inline não aparecer imediatamente no dropdown | M | M | 🟡 Média |
| Responsividade quebrada em mobile ao abrir modal inline | B | M | 🟡 Média |
| Ordenação de sugestões ignorando relevância (mais contatos primeiro) | B | B | 🟢 Baixa |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-EMPRESA-001 | Selecionar empresa existente e criar contato | Usuário autenticado como Gestor; ao menos 1 empresa cadastrada na account | 1. Acessar formulário de criação de novo contato. 2. Verificar que o campo "Empresa" está exibido após o campo de telefone e antes de tags. 3. Clicar no campo "Empresa". 4. Verificar abertura do dropdown com sugestões. 5. Selecionar uma empresa existente. 6. Preencher os demais campos obrigatórios. 7. Clicar em "Salvar". | Campo "Empresa" exibido na posição correta (após telefone, antes de tags). Dropdown abre ao focar. Empresa selecionada preenche o campo com nome e badge de status. Requisição POST para criação de contato inclui `company_id` com o ID da empresa selecionada. Contato criado com sucesso e empresa vinculada. | 🔴 Alta | UI | — |
| CT-EMPRESA-002 | Criar contato sem selecionar empresa | Usuário autenticado como Gestor ou Supervisor | 1. Acessar formulário de criação de novo contato. 2. Preencher nome, telefone e demais campos obrigatórios. 3. Deixar o campo "Empresa" vazio (placeholder "Selecione uma empresa ou deixe vazio"). 4. Clicar em "Salvar". | Contato criado com sucesso. Requisição POST para criação de contato enviada sem `company_id` (ou com `company_id: null`). Nenhum erro relacionado à empresa exibido. | 🔴 Alta | UI | — |
| CT-EMPRESA-003 | Criar empresa inline e vincular ao contato | Usuário autenticado como Gestor; ⚠️ Bloqueável — necessário ambiente com Flow ativo e endpoint POST /api/v1/companies acessível | 1. Acessar formulário de criação de novo contato. 2. Clicar no campo "Empresa". 3. Digitar um nome que não exista na account. 4. Clicar no botão "+ Adicionar empresa" no rodapé do dropdown. 5. No modal, preencher "Nome" e "Status". 6. Clicar em "Criar". 7. Aguardar feedback. 8. Verificar que o modal fechou e a empresa foi selecionada automaticamente. 9. Preencher demais campos e salvar o contato. | Toast "Criando empresa..." exibido durante processo. Toast "✓ Empresa criada" exibido após sucesso. Modal fechado automaticamente. Campo empresa preenchido com a nova empresa. POST /api/v1/companies disparado e sincronização com Flow executada. Contato salvo com `company_id` da nova empresa. | 🔴 Alta | UI | — |
| CT-EMPRESA-004 | Busca com debounce filtra empresas corretamente | Usuário autenticado; ao menos 3 empresas cadastradas com nomes distintos | 1. Abrir formulário de criação de contato. 2. Clicar no campo "Empresa". 3. Digitar rapidamente parte do nome de uma empresa. 4. Aguardar o debounce ser acionado. 5. Verificar os resultados do dropdown. | Dropdown exibe apenas empresas cujo nome contém o texto digitado (case-insensitive). Máximo de 10 sugestões exibidas. Requests para busca não são disparados a cada tecla pressionada — somente após pausa na digitação. | 🟡 Média | UI | — |
| CT-EMPRESA-005 | Criação de empresa inline com nome duplicado | Usuário autenticado como Gestor; empresa com nome "Acme" já cadastrada na account | 1. Abrir formulário de criação de contato. 2. Clicar no campo "Empresa". 3. Clicar em "+ Adicionar empresa". 4. No modal, preencher "Nome" com "acme" (variação de case) e preencher Status. 5. Clicar em "Criar". | Erro exibido no modal indicando nome duplicado. Sincronização com Flow bloqueada. Empresa não criada. Modal permanece aberto com a mensagem de erro visível. | 🔴 Alta | UI | — |
| CT-EMPRESA-006 | Falha na sincronização com Flow — fallback local | Usuário autenticado; endpoint do Flow retornando erro 500 | 1. Abrir formulário de criação de contato. 2. Clicar no campo "Empresa". 3. Clicar em "+ Adicionar empresa". 4. Preencher nome único e status no modal. 5. Clicar em "Criar". 6. Aguardar resposta. | Toast "⚠ Erro ao sincronizar com CRM" exibido. Botão "Tentar Novamente" disponível. Empresa armazenada localmente em Poli (fallback). Campo empresa permanece preenchido com a nova empresa. Usuário consegue continuar o cadastro do contato. | 🔴 Alta | UI | — |
| CT-EMPRESA-007 | Retry de sincronização com Flow após erro | Usuário autenticado; Flow retornando erro na 1ª tentativa e sucesso na 2ª | 1. Reproduzir falha de sincronização com Flow conforme CT-EMPRESA-006. 2. Clicar em "Tentar Novamente". | Retry disparado. Flow retornando sucesso: toast "✓ Empresa criada" exibido. Empresa atualizada com flow_id. Campo empresa permanece preenchido. | 🟡 Média | UI | CT-EMPRESA-006 |
| CT-EMPRESA-008 | 3 retries falhados — opção de continuar sem sync | Usuário autenticado; Flow retornando erro nas 3 tentativas | 1. Criar empresa inline com Flow falhando. 2. Clicar "Tentar Novamente" 3 vezes consecutivas. | Após 3 falhas, opção de "continuar sem sincronização" disponível na interface. Contato pode ser salvo com company_id (empresa local sem flow_id). Toast informativo exibido sobre pendência de sincronização. | 🟡 Média | UI | CT-EMPRESA-006 |
| CT-EMPRESA-009 | Contato criado com sync pendente preserva company_id | Usuário autenticado; Flow retornando erro 500 | 1. Criar empresa inline com falha de sincronização no Flow. 2. Sem realizar retry, salvar o contato. | Contato criado com sucesso. Requisição POST de criação do contato inclui `company_id` preenchido mesmo com sync pendente. Toast "⚠ Contato criado, mas sincronização de empresa pendente" exibido. | 🔴 Alta | UI | CT-EMPRESA-006 |
| CT-EMPRESA-010 | Modal não fecha automaticamente após falha no Flow | Usuário autenticado; Flow retornando erro 500 | 1. Abrir modal de criação de empresa inline. 2. Preencher dados válidos e clicar "Criar". 3. Aguardar resposta com erro de sincronização. | Modal não fecha automaticamente após erro. Mensagem de erro visível no modal ou toast. Botão "Tentar Novamente" disponível. | 🟡 Média | UI | — |
| CT-EMPRESA-011 | Dropdown exibe até 10 sugestões com scroll para excedente | Usuário autenticado; account com mais de 10 empresas cadastradas; ⚠️ Bloqueável — criável via API: POST /api/v1/companies (repetido 11+ vezes) | 1. Abrir formulário de criação de contato. 2. Clicar no campo "Empresa" sem digitar nada. | Dropdown exibe exatamente 10 sugestões. Barra de scroll visível quando o conteúdo excede a área visível. | 🟢 Baixa | UI | — |
| CT-EMPRESA-012 | Isolamento multi-tenant no dropdown de empresas | 2 accounts distintas (A e B) cada uma com empresas cadastradas | 1. Autenticar como usuário da account A. 2. Abrir formulário de criação de contato. 3. Clicar no campo "Empresa". 4. Verificar as sugestões do dropdown. | Dropdown exibe apenas empresas pertencentes à account A. Empresas da account B não aparecem em nenhuma circunstância. | 🔴 Alta | UI | — |
| CT-EMPRESA-013 | Campo empresa não acessível sem autenticação | Nenhuma sessão ativa | 1. Tentar acessar diretamente a URL do formulário de criação de contato sem estar autenticado. | Redirecionamento para a página de login. Formulário de criação de contato não carregado. | 🟡 Média | UI | — |
| CT-EMPRESA-014 | Formulário responsivo em mobile | Dispositivo mobile ou viewport 360px | 1. Acessar o formulário de criação de contato em viewport mobile (360px de largura). 2. Clicar no campo "Empresa". 3. Selecionar empresa existente no dropdown. 4. Abrir modal de criação inline via "+ Adicionar empresa". | Campo empresa visível e utilizável em mobile. Dropdown abre corretamente sem overflow. Modal de criação inline exibido sem corte de conteúdo. Interações de touch respondem corretamente. | 🟢 Baixa | UI | — |
| CT-EMPRESA-015 | Loading state visível durante sincronização com Flow | Usuário autenticado; Flow com latência simulada (resposta > 1s) | 1. Abrir formulário de criação de contato. 2. Criar empresa inline. 3. Observar interface durante o processo de criação/sincronização. | Loading state visível enquanto sincronização está em progresso. Interface não bloqueia interações. Toast "Criando empresa..." exibido enquanto aguarda resposta. | 🟡 Média | UI | — |
| CT-EMPRESA-016 | POST de contato com company_id via API | Usuário autenticado como Gestor; empresa com ID conhecido cadastrada na account | 1. Enviar requisição POST para criação de contato incluindo `company_id` com o ID de uma empresa existente da account. | HTTP 201 retornado. Corpo da resposta inclui o contato criado com `company_id` igual ao enviado. Contato persistido com vínculo à empresa. | 🔴 Alta | API | — |
| CT-EMPRESA-017 | POST de contato sem company_id aceito via API | Usuário autenticado como Gestor | 1. Enviar requisição POST para criação de contato sem o campo `company_id` (ou com `company_id: null`). | HTTP 201 retornado. Contato criado com `company_id: null`. Nenhum erro de validação retornado. | 🟡 Média | API | — |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Cenário: Criar empresa inline e vincular ao contato com sincronização bem-sucedida com Flow
  Dado que estou autenticado como Gestor
  E que estou no formulário de criação de novo contato
  E que não existe empresa com o nome "Nova Empresa Teste" cadastrada na minha account
  Quando clico no campo "Empresa"
  E clico no botão "+ Adicionar empresa"
  E preencho o campo "Nome" com "Nova Empresa Teste"
  E seleciono um "Status" válido
  E clico em "Criar"
  Então o toast "Criando empresa..." é exibido durante o processo
  E o toast "✓ Empresa criada" é exibido após o sucesso
  E o modal de criação de empresa é fechado automaticamente
  E o campo "Empresa" no formulário é preenchido com "Nova Empresa Teste"
  E ao salvar o contato, a requisição POST inclui o company_id da nova empresa
```

```gherkin
Cenário: Sincronização com Flow falha mas contato é criado com fallback local
  Dado que estou autenticado como Gestor
  E que estou no formulário de criação de novo contato
  E que o serviço Flow está retornando erro 500
  Quando clico no campo "Empresa"
  E clico no botão "+ Adicionar empresa"
  E preencho os dados da empresa com nome único
  E clico em "Criar"
  Então o toast "⚠ Erro ao sincronizar com CRM" é exibido
  E o botão "Tentar Novamente" está visível
  E a empresa fica armazenada localmente no sistema Poli
  E o campo "Empresa" permanece preenchido com a nova empresa
  Quando salvo o contato sem realizar o retry
  Então o contato é criado com sucesso com o company_id preenchido
  E o toast "⚠ Contato criado, mas sincronização de empresa pendente" é exibido
```

---

## Resumo

- 🔴 Alta: 8 cenários (CT-EMPRESA-001, 002, 003, 005, 006, 009, 012, 016)
- 🟡 Média: 7 cenários (CT-EMPRESA-004, 007, 008, 010, 013, 015, 017)
- 🟢 Baixa: 2 cenários (CT-EMPRESA-011, 014)
- **Total: 17 cenários de teste | 2 cenários Gherkin**
- ✅ Validação por agente crítico: 2 revisados antes da publicação (CT-EMPRESA-004, CT-EMPRESA-011)
