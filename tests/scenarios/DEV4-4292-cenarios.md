# Cenários de Teste — DEV4-4292
> Card: Ocultar toggle "Usar Janela de atendimento" da tela admin de clientes
> Gerado em: 2026-06-01
> Card atualizado em: 2026-06-01T11:05:12-03:00

> ⚠️ KB inacessível — KB_PATH definido mas sem permissão de leitura do disco, e repositório GitHub privado sem acesso autenticado disponível. Cenários gerados com base exclusivamente no conteúdo do card.

---

## Resumo do Card

- **Título:** Ocultar toggle "Usar Janela de atendimento" da tela admin de clientes
- **Tipo:** Tarefa
- **Prioridade:** Medium
- **Status:** Aguardando Cenários de Teste
- **Objetivo:** Remover a visibilidade do toggle "Usar Janela de atendimento" na tela administrativa de clientes, pois esse modelo de cobrança passa a ser gerenciado pelo novo seletor único (DEV4-4208). A mudança é apenas visual — o valor do campo no banco de dados não deve ser alterado.
- **Relacionado a:** DEV4-4208 (novo seletor único de modelo de cobrança)

---

## BLOCO 1 — Estratégia de Teste

O escopo desta tarefa é estritamente de **supressão de UI**: o toggle "Usar Janela de atendimento" deve ser removido da tela de admin de clientes sem alterar o valor persistido no banco. Os testes devem cobrir: (1) **funcional** — confirmar ausência do elemento na tela; (2) **regressão** — os demais toggles de cobrança continuam funcionando normalmente; (3) **integridade de dados** — o valor do campo no banco não é modificado pela ocultação. A prioridade de execução é Regressão > Funcional > Integridade de Dados. O risco principal é uma regressão silenciosa nos demais toggles de cobrança ou alteração inadvertida do valor do campo no banco por um script de migração não declarado.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Toggle oculto mas valor no banco alterado inadvertidamente (ex: migração ou default) | M | A | 🔴 Alta |
| Demais toggles de cobrança afetados por regressão CSS/JS | M | A | 🔴 Alta |
| Toggle oculto mas ainda submetido no payload do formulário, podendo sobrescrever o valor | M | A | 🔴 Alta |
| Toggle ainda visível em algum perfil de usuário (ex: superadmin) | M | M | 🟡 Média |
| Layout quebrado na área de cobrança após remoção do toggle | B | B | 🟢 Baixa |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-ADMIN-001 | Toggle oculto na tela admin de clientes | Usuário com acesso à tela de admin de clientes logado; cliente cadastrado existente | 1. Acessar a tela de administração de clientes. 2. Abrir o cadastro de qualquer cliente. 3. Navegar até a seção de cobrança/configurações financeiras. 4. Inspecionar visualmente os campos exibidos. | O campo/toggle "Usar Janela de atendimento" não é exibido em nenhuma parte da tela de admin do cliente. | 🔴 Alta | UI | — |
| CT-ADMIN-002 | Demais toggles de cobrança permanecem visíveis | Usuário com acesso à tela de admin de clientes logado; cliente com toggles de cobrança configurados | 1. Acessar a tela de administração de clientes. 2. Abrir o cadastro de um cliente que possua outros toggles de cobrança ativos. 3. Verificar a listagem de todos os toggles da área de cobrança. | Todos os demais toggles de cobrança (exceto "Usar Janela de atendimento") estão visíveis e funcionando normalmente, sem alteração de layout ou estado. | 🔴 Alta | UI | CT-ADMIN-001 |
| CT-ADMIN-003 | Valor do campo no banco não alterado pela ocultação | Acesso ao banco de dados (ou endpoint de leitura) para verificar o valor atual do campo; cliente com valor definido (true ou false) para "Usar Janela de atendimento". ⚠️ Bloqueável — verificável via API: `GET /api/clients/{id}` | 1. Registrar o valor atual do campo "Usar Janela de atendimento" para o cliente X (via API ou banco). 2. Realizar o deploy da mudança de ocultação. 3. Consultar novamente o valor do campo via API/banco. | O valor do campo permanece idêntico ao registrado antes do deploy — não há alteração automática (nem para true, nem para false). | 🔴 Alta | API | — |
| CT-ADMIN-004 | Toggle oculto não enviado no payload ao salvar | Usuário logado na tela de admin de clientes; ferramentas de rede do browser abertas (DevTools) | 1. Acessar a tela de admin de um cliente. 2. Abrir as ferramentas de rede do browser (aba Network). 3. Realizar qualquer alteração em outro campo e salvar o formulário. 4. Inspecionar o payload da requisição de atualização. | O campo "Usar Janela de atendimento" não aparece no payload enviado ao servidor ou, se aparecer, contém o valor original sem modificação. | 🔴 Alta | UI | CT-ADMIN-001 |
| CT-ADMIN-005 | Toggle ausente para perfil admin padrão | Usuário com perfil de administrador padrão (não superadmin) logado | 1. Fazer login com credenciais de administrador padrão. 2. Acessar a tela de admin de clientes. 3. Verificar a seção de cobrança. | O toggle "Usar Janela de atendimento" não é exibido para o perfil admin padrão. | 🟢 Baixa | UI | CT-ADMIN-001 |
| CT-ADMIN-006 | Toggle ausente para perfil superadmin | Usuário com perfil superadmin logado | 1. Fazer login com credenciais de superadmin. 2. Acessar a tela de admin de clientes. 3. Verificar a seção de cobrança. | O toggle "Usar Janela de atendimento" não é exibido nem para o perfil superadmin. | 🟢 Baixa | UI | CT-ADMIN-001 |
| CT-ADMIN-007 | Layout da área de cobrança íntegro após remoção | Usuário com acesso à tela de admin de clientes logado | 1. Acessar a tela de admin de um cliente. 2. Navegar até a área de cobrança. 3. Avaliar visualmente o layout: espaçamentos, alinhamentos, ausência de elementos "flutuantes" ou espaços em branco anômalos. | A área de cobrança apresenta layout visualmente coerente, sem quebras, espaços em branco inesperados ou elementos desalinhados após a remoção do toggle. | 🟢 Baixa | UI | CT-ADMIN-001 |
| CT-ADMIN-008 | Toggle ausente no formulário de criação de cliente | Usuário com acesso à criação de clientes na tela admin | 1. Acessar a tela de administração. 2. Iniciar o fluxo de criação de um novo cliente. 3. Navegar até a seção de cobrança no formulário de criação. | O toggle "Usar Janela de atendimento" não é exibido no formulário de criação de novo cliente. | 🟡 Média | UI | CT-ADMIN-001 |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Cenário: Toggle "Usar Janela de atendimento" não é exibido na tela admin de clientes
  Dado que estou autenticado como administrador na plataforma Poli Digital
  E acesso a tela de administração de clientes
  Quando abro o cadastro de um cliente existente
  E navego até a seção de cobrança
  Então o campo "Usar Janela de atendimento" não deve estar visível na tela
  E os demais campos e toggles da seção de cobrança devem permanecer exibidos normalmente
```

```gherkin
Cenário: Valor do campo "Usar Janela de atendimento" no banco não é alterado pela ocultação
  Dado que o cliente X possui o campo "Usar Janela de atendimento" configurado com um valor definido no banco de dados
  Quando a atualização de ocultação do toggle é aplicada na tela admin
  E consulto o valor do campo via API de leitura do cliente
  Então o valor retornado deve ser idêntico ao valor registrado antes da atualização
  E nenhuma alteração automática deve ter sido aplicada ao campo
```

---

## Validação por Agente Crítico

```
✅ Validação por agente crítico concluída:
   Aprovados sem alteração: 6 (CT-ADMIN-001, CT-ADMIN-002, CT-ADMIN-003, CT-ADMIN-004, CT-ADMIN-007, CT-ADMIN-008)
   Revisados: 2 (CT-ADMIN-005, CT-ADMIN-006 — criticidade rebaixada para 🟢 Baixa)
   Removidos por assunção indevida: 1 (CT-ADMIN-009)
   Fundidos: 1 (CT-ADMIN-010 incorporado ao CT-ADMIN-003)
   Adicionados por cobertura insuficiente: 0
```
