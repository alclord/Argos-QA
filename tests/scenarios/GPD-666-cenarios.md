# Cenários de Teste — GPD-666
> Card: Novas contas e usuários devem ser indexados na Nova Interface por padrão
> Gerado em: 2026-05-19

---

## BLOCO 1 — Estratégia de Teste

**Escopo:** Fluxo de criação de contas e usuários na plataforma Poli Digital, com foco na indexação automática na Nova Interface após o deploy. Inclui verificação de não-regressão para contas legadas existentes.

**Tipos de teste aplicáveis:**
- **Funcional:** Validar que toda nova conta/usuário é automaticamente indexado na Nova Interface, sem intervenção manual via formulários n8n.
- **Regressão:** Garantir que contas existentes no Legado permanecem intactas e não sofrem migração involuntária.
- **Integração:** Verificar a comunicação entre o serviço de criação de contas e o serviço de indexação da Nova Interface.
- **Segurança:** Assegurar que o mecanismo de indexação não expõe dados entre contas distintas.

**Prioridade de execução:** Alta — a mudança afeta diretamente o fluxo de onboarding de 100% dos novos clientes.

**Riscos principais:** Indexação silenciosa com falha (sem feedback de erro), regressão em contas legadas, condição de corrida durante criação simultânea de contas, e estado inconsistente em caso de falha parcial no processo de indexação.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Nova conta criada após deploy não é indexada automaticamente na Nova Interface | M | A | 🔴 Alta |
| Conta legada existente é migrada/reindexada involuntariamente após deploy | M | A | 🔴 Alta |
| Falha silenciosa na indexação: conta criada sem erro mas sem indexação | M | A | 🔴 Alta |
| Novo usuário criado em conta legada existente não é indexado na Nova Interface | M | A | 🔴 Alta |
| Conta criada em estado inconsistente (parcialmente indexada em Legado e Nova Interface) | B | A | 🟡 Média |
| Degradação de performance no fluxo de criação de conta devido à indexação adicional | B | M | 🟡 Média |
| Formulários n8n continuam sendo utilizados para novas contas após o deploy | B | B | 🟢 Baixa |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade |
|---|---|---|---|---|---|
| CT-NOVA-UI-001 | Nova conta indexada automaticamente | Ambiente com deploy aplicado; acesso ao painel administrativo e ao serviço de indexação | 1. Acessar o fluxo padrão de criação de conta na plataforma. 2. Preencher todos os dados obrigatórios. 3. Confirmar a criação. 4. Consultar o registro da conta no serviço de indexação da Nova Interface. 5. Realizar o primeiro login com as credenciais criadas. | A conta está indexada na Nova Interface sem qualquer ação manual. O login redireciona para a Nova Interface. Nenhuma submissão nos formulários n8n é necessária. | 🔴 Alta |
| CT-NOVA-UI-002 | Novo usuário acessa Nova Interface no primeiro login | Conta existente ativa; deploy aplicado | 1. Acessar o painel de administração da conta. 2. Criar um novo usuário com perfil e permissões padrão. 3. Realizar o primeiro login com as credenciais do novo usuário. 4. Verificar a interface carregada. | O usuário é redirecionado para a Nova Interface no primeiro login, sem etapa intermediária de migração. | 🔴 Alta |
| CT-NOVA-UI-003 | Contas legadas não são afetadas pelo deploy | Contas legadas existentes antes do deploy; deploy aplicado | 1. Catalogar 3–5 contas legadas ativas antes do deploy. 2. Aplicar o deploy. 3. Verificar no serviço de indexação se essas contas foram alteradas. 4. Realizar login com um usuário de conta legada e verificar a interface. | As contas legadas permanecem no Legado. O índice delas no serviço de indexação não é alterado. O login do usuário legado ainda carrega a interface Legada. | 🔴 Alta |
| CT-NOVA-UI-004 | Dados inválidos não geram indexação parcial | Deploy aplicado; endpoint de criação de conta acessível | 1. Tentar criar uma conta com campos obrigatórios em branco (ex.: e-mail ausente). 2. Tentar criar uma conta com e-mail duplicado. 3. Verificar no serviço de indexação se algum registro foi criado. | A criação falha com erro de validação (HTTP 400 ou 422). Nenhum registro de indexação é criado no serviço da Nova Interface. O sistema permanece em estado consistente. | 🟡 Média |
| CT-NOVA-UI-005 | Falha na indexação retorna erro sem estado inconsistente | Deploy aplicado; capacidade de simular falha no serviço de indexação (mock ou chaos flag) | 1. Configurar o serviço de indexação para retornar erro (HTTP 500 ou timeout). 2. Criar uma nova conta via fluxo padrão. 3. Observar o comportamento do sistema e verificar logs. | O sistema não conclui a criação com sucesso silencioso. Retorna um erro claro (HTTP 500 ou mensagem legível). A conta não fica em estado parcial — nem criada sem indexação, nem indexada sem conta. Logs registram a falha com detalhes para diagnóstico. | 🔴 Alta |
| CT-NOVA-UI-006 | Criação simultânea de múltiplas contas | Deploy aplicado; ferramenta de carga/concorrência disponível (ex.: k6, JMeter) | 1. Disparar criação de 10 contas simultâneas via API ou script de carga. 2. Aguardar conclusão de todas as requisições. 3. Verificar o serviço de indexação para cada conta criada. | Todas as contas criadas com sucesso estão indexadas na Nova Interface. Não há duplicatas, contas sem indexação ou estados inconsistentes. | 🟡 Média |
| CT-NOVA-UI-007 | Login imediatamente após criação sem delay | Deploy aplicado; conta criada em ambiente de staging | 1. Criar uma nova conta. 2. Imediatamente (< 5 segundos) realizar o primeiro login. 3. Verificar qual interface é carregada. | O usuário é direcionado para a Nova Interface sem mensagem de erro, timeout ou redirecionamento para o Legado. A indexação já está disponível no momento do primeiro login. | 🟢 Baixa |
| CT-NOVA-UI-008 | Indexação não expõe dados de outras contas | Deploy aplicado; duas contas distintas criadas (conta A e conta B) | 1. Criar conta A e conta B via fluxo padrão. 2. Realizar login como usuário da conta A. 3. Inspecionar os dados carregados na Nova Interface (conversas, contatos, configurações). 4. Verificar se há qualquer dado pertencente à conta B visível. | Os dados da conta A são exclusivamente os seus próprios. Nenhum dado da conta B (ou de qualquer outra conta) é retornado ou exibido. A indexação respeita o isolamento de dados por tenant. | 🔴 Alta |

---

## BLOCO 4 — Cenários Gherkin (BDD)

### CT-NOVA-UI-001

```gherkin
Cenário: Nova conta criada é indexada automaticamente na Nova Interface
  Dado que o deploy com a mudança de indexação padrão foi aplicado
  E que nenhuma ação manual via formulários n8n foi realizada
  Quando um novo cliente completa o fluxo de criação de conta na plataforma
  Então a conta deve estar indexada na Nova Interface no serviço de indexação
  E o primeiro login do cliente deve carregar a Nova Interface diretamente
```

### CT-NOVA-UI-002

```gherkin
Cenário: Novo usuário criado em conta existente acessa Nova Interface no primeiro login
  Dado que o deploy com a mudança de indexação padrão foi aplicado
  E que existe uma conta ativa na plataforma
  Quando um administrador cria um novo usuário nessa conta
  E o novo usuário realiza o primeiro login
  Então o sistema deve redirecionar o usuário para a Nova Interface
  E nenhuma etapa de migração manual deve ser necessária
```

### CT-NOVA-UI-003

```gherkin
Cenário: Contas legadas existentes não são afetadas pelo deploy
  Dado que existem contas cadastradas no Legado antes do deploy
  Quando o deploy com a mudança de indexação padrão é aplicado
  Então as contas legadas existentes devem permanecer indexadas no Legado
  E o login de usuários dessas contas deve continuar carregando a interface Legada
  E nenhuma alteração deve ser registrada no serviço de indexação para essas contas
```

### CT-NOVA-UI-005

```gherkin
Cenário: Falha no serviço de indexação impede criação de conta em estado inconsistente
  Dado que o deploy com a mudança de indexação padrão foi aplicado
  E que o serviço de indexação da Nova Interface está indisponível ou retornando erro
  Quando um novo cliente tenta completar o fluxo de criação de conta
  Então o sistema não deve concluir a criação com sucesso silencioso
  E deve retornar uma mensagem de erro clara ao usuário ou sistema chamador
  E nenhum registro parcial deve existir (conta sem indexação ou indexação sem conta)
```

### CT-NOVA-UI-008

```gherkin
Cenário: Indexação de nova conta não expõe dados de outras contas
  Dado que o deploy com a mudança de indexação padrão foi aplicado
  E que as contas "Empresa A" e "Empresa B" foram criadas via fluxo padrão
  Quando o usuário da "Empresa A" realiza login na Nova Interface
  Então apenas os dados pertencentes à "Empresa A" devem ser carregados
  E nenhum dado da "Empresa B" deve estar visível ou acessível na sessão
```

---

## ⚠️ Observações

### Dependências Externas
- **Serviço de indexação da Nova Interface:** a mudança depende diretamente de um serviço ou mecanismo responsável por indexar contas/usuários. Sem acesso ou documentação desse serviço, alguns cenários precisarão ser adaptados.
- **Formulários n8n:** os formulários `d67a7cb5` e `838c8d5b` devem continuar funcionando para migração de contas legadas existentes, mas não devem ser acionados para contas novas. Validar que o trigger desses formulários não interfere no novo fluxo.
- **Mecanismo de seleção de interface:** a lógica que determina qual interface um usuário vê (Nova vs. Legado) precisa ser identificada — pode ser uma flag na conta, uma tabela de indexação, ou um campo no cadastro.

### Limitações Conhecidas (inferidas)
- A seção "Cenários de Teste" do card está marcada como "a ser preenchido pelo time de QA" — sem critérios de aceite formais definidos.
- A descrição não especifica o comportamento esperado em caso de rollback do deploy.
- Não está definido o comportamento para usuários com sessão ativa no momento do deploy (ex.: usuário logado em conta legada durante a virada).

### Premissas Assumidas
- "Indexado na Nova Interface" significa que existe um registro ou flag no sistema que aponta a conta/usuário para a Nova Interface, e que o login redireciona para ela corretamente.
- "Nova Interface" e "Legado" são ambientes ou modos distintos dentro da mesma plataforma, controlados por um mecanismo interno.
- O fluxo de criação de conta/usuário é o mesmo para todos os canais (painel admin, API, onboarding web).
- Contas criadas antes do deploy continuam inalteradas — não há retroatividade.

### Sugestões de Automação

| Cenário | ROI para Automação | Justificativa |
|---|---|---|
| CT-NOVA-UI-001 | ⭐⭐⭐⭐⭐ Muito Alto | Verifica o comportamento central da feature. Deve rodar em toda pipeline de CI/CD pós-deploy. |
| CT-NOVA-UI-002 | ⭐⭐⭐⭐⭐ Muito Alto | Complementa o CT-001, cobre o segundo fluxo principal. Ideal para smoke test pós-deploy. |
| CT-NOVA-UI-003 | ⭐⭐⭐⭐⭐ Muito Alto | Teste de regressão crítico. Com fixtures de contas legadas, garante que nenhum deploy futuro quebre o Legado acidentalmente. |
| CT-NOVA-UI-004 | ⭐⭐⭐ Alto | Validação de contrato de API. Fácil de automatizar com testes de contrato (ex.: Pact, RestAssured). |
| CT-NOVA-UI-006 | ⭐⭐⭐ Alto | Teste de concorrência via script de carga leve (ex.: k6) integrado à pipeline de staging. |
| CT-NOVA-UI-008 | ⭐⭐⭐⭐ Alto | Segurança de tenant isolation. Automatizar como teste de segurança recorrente (ex.: OWASP ZAP ou teste customizado de API). |
| CT-NOVA-UI-005 | ⭐⭐ Médio | Requer injeção de falha (chaos engineering). Valiosa, mas exige infraestrutura adicional — implementar em segunda fase. |
