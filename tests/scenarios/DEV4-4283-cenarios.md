# Cenários de Teste — DEV4-4283
> Card: Gestão de Empresas para Contatos (B2B)
> Gerado em: 2026-06-03
> Card atualizado em: 2026-06-02T16:11:34.215-0300

---

## MÓDULO: EMPRESA

## RESUMO DO CARD

O card DEV4-4283 representa a Epic de Gestão de Empresas B2B na plataforma Poli Digital, permitindo vincular empresas a contatos e gerenciar seu ciclo de vida comercial. A funcionalidade inclui operações CRUD de empresas com status obrigatório (Cliente/Lead/Prospect) e sincronização automática com o CRM Flow ao criar ou editar registros. O objetivo é oferecer uma visão unificada da conta empresarial dentro da plataforma de atendimento, integrando dados com o ecossistema de CRM.

---

## BLOCO 1 — Estratégia de Teste

**Escopo:** CRUD completo de empresas, vínculo empresa-contato, transições de status (Cliente/Lead/Prospect), sincronização automática com CRM Flow e validações de campos obrigatórios.
**Tipos de Teste:** Funcional (happy path e negativos), Integração (sync CRM Flow), Regressão (contatos existentes), Segurança (acesso entre contas), UX (fluxo de criação e edição na tela DEV4-4293).
**Prioridade de Execução:** Alta para CRUD e sync CRM; Média para status e borda; Baixa para UX isolado.
**Riscos Principais:** Falha silenciosa no sync com CRM Flow, inconsistência de status após edição, empresas visíveis entre contas distintas e ausência de validação do campo status obrigatório.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Sync com CRM Flow falha silenciosamente ao criar empresa | M | A | 🔴 Alta |
| Empresa criada sem status obrigatório é aceita pelo backend | M | A | 🔴 Alta |
| Empresa vinculada a contato de outra conta (vazamento de dados) | B | A | 🔴 Alta |
| Edição de empresa não dispara re-sync com CRM Flow | M | A | 🔴 Alta |
| Status não atualizado no CRM Flow após transição na plataforma | M | M | 🟡 Média |
| Exclusão de empresa não remove vínculo com contatos associados | M | M | 🟡 Média |
| Campos opcionais aceitos com valores inválidos (ex: CNPJ malformado) | M | M | 🟡 Média |
| Tela de Gestão (DEV4-4293) não reflete dados atualizados após sync | B | M | 🟡 Média |
| Performance degradada ao listar empresas com alto volume de contatos | B | B | 🟢 Baixa |

---

## BLOCO 3 — Tabela de Cenários

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-EMPRESA-001 | Criar empresa com dados válidos e status | Usuário autenticado com permissão de gestão; conta ativa com CRM Flow habilitado | 1. Acessar tela de Gestão de Empresas (DEV4-4293) 2. Clicar em "Nova Empresa" 3. Preencher nome, status = "Lead" e demais campos obrigatórios 4. Confirmar criação | Empresa criada com sucesso; status HTTP 201; registro visível na listagem; sync disparado ao CRM Flow | 🔴 Alta | UI | — |
| CT-EMPRESA-002 | Vincular empresa existente a contato | ⚠️ Bloqueável — criável via API: POST /companies; Contato existente na conta | 1. Acessar ficha do contato 2. Localizar seção "Empresa" 3. Buscar empresa pelo nome 4. Confirmar vínculo | Empresa associada ao contato; status HTTP 200; campo empresa exibido na ficha do contato | 🔴 Alta | UI | CT-EMPRESA-001 |
| CT-EMPRESA-003 | Editar empresa e verificar re-sync CRM | ⚠️ Bloqueável — criável via API: POST /companies; Empresa vinculada a conta | 1. Acessar listagem de empresas 2. Selecionar empresa existente 3. Editar campo "Status" para "Cliente" 4. Salvar alteração 5. Verificar payload enviado ao CRM Flow | Empresa atualizada; status HTTP 200; CRM Flow recebe evento de atualização com novo status "Cliente" | 🔴 Alta | API | CT-EMPRESA-001 |
| CT-EMPRESA-004 | Excluir empresa vinculada a contato | ⚠️ Bloqueável — criável via API: POST /companies; Empresa com pelo menos 1 contato vinculado | 1. Acessar listagem de empresas 2. Selecionar empresa com contatos 3. Acionar opção de exclusão 4. Confirmar exclusão | Empresa excluída; status HTTP 200 ou 204; vínculos com contatos removidos; empresa não mais visível na listagem | 🟡 Média | UI | CT-EMPRESA-002 |
| CT-EMPRESA-005 | Criar empresa sem campo status | Usuário autenticado; conta ativa | 1. Acessar tela de Nova Empresa 2. Preencher nome da empresa 3. Deixar campo "Status" em branco 4. Tentar confirmar criação | Criação bloqueada; mensagem de erro exibida "Status é obrigatório"; status HTTP 422 na requisição | 🔴 Alta | UI | — |
| CT-EMPRESA-006 | Criar empresa sem nome (campo obrigatório) | Usuário autenticado | 1. Acessar tela de Nova Empresa 2. Deixar campo "Nome" em branco 3. Selecionar status "Prospect" 4. Tentar confirmar criação | Criação bloqueada; validação frontend exibe erro no campo nome; requisição não enviada ao backend | 🟡 Média | UI | — |
| CT-EMPRESA-007 | Criar empresa com status inválido via API | Token de autenticação válido | 1. Enviar POST /companies com body contendo status = "Inativo" (valor fora do enum) | Requisição rejeitada; status HTTP 422; mensagem de erro indicando valores aceitos: Cliente, Lead, Prospect | 🔴 Alta | API | — |
| CT-EMPRESA-008 | Acessar empresa de outra conta (segurança) | Duas contas distintas (Conta A e Conta B); empresa criada na Conta A | 1. Autenticar com credenciais da Conta B 2. Tentar acessar via API GET /companies/{id_empresa_conta_A} | Acesso negado; status HTTP 403 ou 404; nenhum dado da empresa da Conta A retornado | 🔴 Alta | API | CT-EMPRESA-001 |
| CT-EMPRESA-009 | Criar empresa com status "Prospect" (borda) | Usuário autenticado; conta ativa com CRM Flow habilitado | 1. Criar empresa com status = "Prospect" 2. Verificar sincronização com CRM Flow 3. Confirmar que o status é mapeado corretamente no CRM | Empresa criada com status "Prospect"; CRM Flow recebe status mapeado corretamente; sem erro de conversão de enum | 🟡 Média | API | — |
| CT-EMPRESA-010 | Vincular mesma empresa a dois contatos (borda) | ⚠️ Bloqueável — criável via API: POST /companies; dois contatos existentes na conta | 1. Vincular empresa ao Contato 1 2. Vincular a mesma empresa ao Contato 2 3. Verificar ficha de ambos os contatos e listagem da empresa | Ambos os vínculos criados com sucesso; empresa exibe os dois contatos associados; não há duplicação de registros | 🟡 Média | UI | CT-EMPRESA-002 |
| CT-EMPRESA-011 | Falha de sync CRM Flow ao criar empresa | Usuário autenticado; CRM Flow simulado com falha (mock/timeout) | 1. Criar empresa com dados válidos 2. Simular indisponibilidade do CRM Flow 3. Confirmar criação | Empresa criada localmente (status HTTP 201); falha de sync registrada em log; usuário notificado ou retry agendado — empresa não é descartada | 🟡 Média | API | CT-EMPRESA-001 |
| CT-EMPRESA-012 | Listar empresas paginadas da conta | Usuário autenticado; pelo menos 1 empresa cadastrada | 1. Acessar tela de Gestão de Empresas 2. Verificar listagem exibida 3. Se houver paginação, navegar para próxima página | Apenas empresas da conta autenticada exibidas; paginação funcional; nenhuma empresa de outras contas visível | 🟢 Baixa | UI | CT-EMPRESA-001 |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Cenário: Criar empresa com status obrigatório e disparar sync com CRM Flow
  Dado que o usuário está autenticado na plataforma Poli Digital
  E a conta possui integração com CRM Flow habilitada
  Quando o usuário acessa a tela de Gestão de Empresas
  E preenche o nome "Tech Soluções Ltda" e seleciona o status "Lead"
  E confirma a criação da empresa
  Então a empresa é salva com sucesso no sistema
  E o status HTTP da resposta é 201
  E um evento de sincronização é enviado ao CRM Flow com os dados da nova empresa
  E a empresa aparece na listagem com status "Lead"
```

```gherkin
Cenário: Bloquear criação de empresa sem status e via API com status inválido
  Dado que o usuário está autenticado na plataforma Poli Digital
  Quando o usuário tenta criar uma empresa via API enviando o campo status com valor "Inativo"
  Então a requisição é rejeitada pelo backend
  E o status HTTP da resposta é 422
  E a mensagem de erro informa que os valores aceitos para status são: Cliente, Lead e Prospect
  E nenhuma empresa é criada no sistema
  E nenhum evento é disparado ao CRM Flow
```

---

## ✅ Validação por Agente Crítico Independente

O arquivo ainda não existe — vou revisar com base apenas no conteúdo fornecido no prompt.

---

## Análise por Cenário

**CT-EMPRESA-001**
Sem problemas. Rastreável ao critério de CRUD + sync. Happy path completo.

**CT-EMPRESA-002**
[CT-EMPRESA-002] | [Assunção indevida] | O card não menciona explicitamente que o vínculo empresa-contato é feito via "busca por nome" em uma seção específica da ficha do contato. O passo assume a UI de uma feature complementar (DEV4-4293) que pode ainda não estar definida. | Sugestão: generalizar o passo 3 para "localizar e selecionar a empresa pelo identificador disponível na interface" e remover a dependência de um campo de busca específico.

**CT-EMPRESA-003**
Sem problemas. Rastreável à regra "sync automático ao editar". Modo API é adequado para verificar payload enviado ao CRM.

**CT-EMPRESA-004**
[CT-EMPRESA-004] | [Assunção indevida] | O resultado esperado afirma que "vínculos com contatos são removidos" ao excluir a empresa. O card descreve CRUD de empresas, mas não especifica o comportamento em cascata na exclusão (os vínculos podem ser desfeitos, bloqueados ou o campo empresa nos contatos pode ficar nulo). Assumir remoção automática dos vínculos não está nos critérios de aceite. | Sugestão: separar em dois resultados esperados alternativos — "OR: (a) exclusão bloqueada se houver contatos vinculados, ou (b) vínculos desfeitos conforme regra definida pela equipe" — e marcar como ponto de alinhamento antes da execução.

**CT-EMPRESA-005**
Sem problemas. Rastreável ao critério "Status obrigatório". Negativo de campo obrigatório.

**CT-EMPRESA-006**
Sem problemas. Nome é campo óbvio de obrigatoriedade em qualquer entidade; o resultado esperado é defensível dentro das regras de CRUD básico.

**CT-EMPRESA-007**
Sem problemas. Rastreável à regra de negócio de enum de status (Cliente/Lead/Prospect). Negativo de API correto.

**CT-EMPRESA-008**
Sem problemas. Rastreável ao risco de vazamento de dados entre contas. Cenário de segurança bem formado.

**CT-EMPRESA-009**
[CT-EMPRESA-009] | [Duplicata parcial / Cobertura redundante] | O passo central deste cenário (criar empresa com status válido e verificar sync com CRM Flow) já está coberto em CT-EMPRESA-001. A distinção pelo valor "Prospect" não justifica um cenário separado quando o objetivo declarado é "borda de enum". O verdadeiro risco de borda seria verificar se o valor "Prospect" é mapeado corretamente no CRM Flow (campo 3 do passo), o que pode diferir semanticamente dos outros dois valores. | Sugestão: reformular o cenário para focar exclusivamente no mapeamento do enum "Prospect" no payload enviado ao CRM Flow — remover passos de criação que já são verificados em CT-EMPRESA-001 e iniciar com empresa criada via API (pré-requisito). Assim o cenário testa apenas a integração de mapeamento de enum, não a criação.

**CT-EMPRESA-010**
[CT-EMPRESA-010] | [Assunção indevida] | O resultado esperado afirma "empresa exibe os dois contatos associados", assumindo que a empresa possui uma visão reversa de contatos vinculados. O card descreve empresas vinculadas a contatos, não necessariamente que a entidade empresa liste todos os contatos a ela associados. Essa visão reversa pode não ser uma feature do card. | Sugestão: remover da verificação a afirmação "empresa exibe os dois contatos associados" e limitar o resultado esperado ao comportamento confirmado pelo card: "ambos os contatos exibem a empresa vinculada sem conflito ou duplicação de vínculo".

**CT-EMPRESA-011**
[CT-EMPRESA-011] | [Assunção indevida] | O resultado esperado define três comportamentos não especificados no card: (1) "falha registrada em log", (2) "usuário notificado", (3) "retry agendado". O card diz apenas "Sync automático com CRM Flow ao criar/editar" — não define o comportamento de resiliência. Esses detalhes são escolhas de implementação não rastreáveis aos critérios de aceite. | Sugestão: reescrever o resultado esperado como "Empresa criada localmente (status HTTP 201); falha de sync registrada de alguma forma (log, notificação ou retry — comportamento a confirmar com o time); empresa não descartada." Sinalizar como cenário dependente de alinhamento técnico antes da execução.

**CT-EMPRESA-012**
[CT-EMPRESA-012] | [Cobertura mínima / Rastreabilidade fraca] | O cenário de listagem paginada tem rastreabilidade fraca — o card não menciona paginação. O teste de isolamento entre contas (empresas de outras contas não visíveis) já está coberto via API em CT-EMPRESA-008. A parte de "nenhuma empresa de outra conta visível na listagem" é re-teste de segurança em UI. | Sugestão: manter o cenário, mas remover a afirmação de isolamento entre contas do resultado esperado (já coberta em CT-EMPRESA-008) e focar apenas em: "listagem exibe empresas da conta autenticada; navegação entre páginas funciona corretamente; dados exibidos são consistentes com os cadastrados."

---

## Cobertura Mínima

| Tipo | Quantidade | Satisfeito? |
|---|---|---|
| Happy path | CT-001, CT-002 (2) | Sim |
| Negativos/erro | CT-005, CT-006, CT-007 (3) | Sim |
| Borda | CT-009, CT-010 (2) | Sim |
| Segurança | CT-008 (1) | Sim |

Cobertura mínima atendida.

---

## Tabela BLOCO 3 — Revisada Completa

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-EMPRESA-001 | Criar empresa com dados válidos e status | Usuário autenticado com permissão de gestão; conta ativa com CRM Flow habilitado | 1. Acessar tela de Gestão de Empresas (DEV4-4293) 2. Clicar em "Nova Empresa" 3. Preencher nome, status = "Lead" e demais campos obrigatórios 4. Confirmar criação | Empresa criada com sucesso; status HTTP 201; registro visível na listagem; sync disparado ao CRM Flow | Alta | UI | — |
| CT-EMPRESA-002 | Vincular empresa existente a contato | Bloqueável — criável via API: POST /companies; contato existente na conta | 1. Acessar ficha do contato 2. Localizar seção "Empresa" 3. Selecionar a empresa pelo identificador disponível na interface 4. Confirmar vínculo | Empresa associada ao contato; status HTTP 200; campo empresa exibido na ficha do contato | Alta | UI | CT-EMPRESA-001 |
| CT-EMPRESA-003 | Editar empresa e verificar re-sync CRM | Bloqueável — criável via API: POST /companies; empresa vinculada a conta | 1. Acessar listagem de empresas 2. Selecionar empresa existente 3. Editar campo "Status" para "Cliente" 4. Salvar alteração 5. Verificar payload enviado ao CRM Flow | Empresa atualizada; status HTTP 200; CRM Flow recebe evento de atualização com novo status "Cliente" | Alta | API | CT-EMPRESA-001 |
| CT-EMPRESA-004 | Excluir empresa vinculada a contato | Bloqueável — criável via API: POST /companies; empresa com pelo menos 1 contato vinculado | 1. Acessar listagem de empresas 2. Selecionar empresa com contatos 3. Acionar opção de exclusão 4. Confirmar exclusão | Empresa excluída (status HTTP 200 ou 204); vínculos com contatos desfeitos OU exclusão bloqueada se vínculos existirem — comportamento a confirmar com o time antes da execução; empresa não mais visível na listagem | Média | UI | CT-EMPRESA-002 |
| CT-EMPRESA-005 | Criar empresa sem campo status | Usuário autenticado; conta ativa | 1. Acessar tela de Nova Empresa 2. Preencher nome da empresa 3. Deixar campo "Status" em branco 4. Tentar confirmar criação | Criação bloqueada; mensagem de erro exibida "Status é obrigatório"; status HTTP 422 na requisição | Alta | UI | — |
| CT-EMPRESA-006 | Criar empresa sem nome (campo obrigatório) | Usuário autenticado | 1. Acessar tela de Nova Empresa 2. Deixar campo "Nome" em branco 3. Selecionar status "Prospect" 4. Tentar confirmar criação | Criação bloqueada; validação frontend exibe erro no campo nome; requisição não enviada ao backend | Média | UI | — |
| CT-EMPRESA-007 | Criar empresa com status inválido via API | Token de autenticação válido | 1. Enviar POST /companies com body contendo status = "Inativo" (valor fora do enum) | Requisição rejeitada; status HTTP 422; mensagem de erro indicando valores aceitos: Cliente, Lead, Prospect | Alta | API | — |
| CT-EMPRESA-008 | Acessar empresa de outra conta (segurança) | Duas contas distintas (Conta A e Conta B); empresa criada na Conta A | 1. Autenticar com credenciais da Conta B 2. Tentar acessar via API GET /companies/{id_empresa_conta_A} | Acesso negado; status HTTP 403 ou 404; nenhum dado da empresa da Conta A retornado | Alta | API | CT-EMPRESA-001 |
| CT-EMPRESA-009 | Verificar mapeamento de enum "Prospect" no payload do CRM Flow | Empresa com status "Prospect" criada via API: POST /companies; conta ativa com CRM Flow habilitado | 1. Consultar o último evento de sync enviado ao CRM Flow para a empresa com status "Prospect" 2. Inspecionar o campo de status no payload enviado | CRM Flow recebe o campo de status com o valor "Prospect" mapeado corretamente conforme contrato de integração; sem erro de conversão de enum ou valor nulo | Média | API | — |
| CT-EMPRESA-010 | Vincular mesma empresa a dois contatos (borda) | Bloqueável — criável via API: POST /companies; dois contatos existentes na conta | 1. Vincular empresa ao Contato 1 2. Vincular a mesma empresa ao Contato 2 3. Verificar ficha de ambos os contatos | Ambos os contatos exibem a empresa vinculada sem conflito, duplicação de vínculo ou erro; o segundo vínculo não sobrescreve o primeiro | Média | UI | CT-EMPRESA-002 |
| CT-EMPRESA-011 | Comportamento ao falha de sync CRM Flow na criação | Usuário autenticado; CRM Flow simulado com falha (mock/timeout) | 1. Criar empresa com dados válidos 2. Simular indisponibilidade do CRM Flow 3. Confirmar criação | Empresa criada localmente (status HTTP 201); empresa não descartada; falha de sync registrada de alguma forma (log, notificação ou retry — comportamento a confirmar com o time antes da execução) | Média | API | CT-EMPRESA-001 |
| CT-EMPRESA-012 | Listar empresas paginadas da conta | Usuário autenticado; pelo menos 1 empresa cadastrada | 1. Acessar tela de Gestão de Empresas 2. Verificar listagem exibida 3. Se houver paginação, navegar para próxima página | Apenas empresas da conta autenticada exibidas; paginação funcional (se aplicável); dados exibidos são consistentes com os cadastrados | Baixa | UI | CT-EMPRESA-001 |

---

**Aprovados: 7 | Com problemas: 5 | Sugestões aplicadas: CT-EMPRESA-002, CT-EMPRESA-004, CT-EMPRESA-009, CT-EMPRESA-010, CT-EMPRESA-011, CT-EMPRESA-012**
