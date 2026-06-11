# Cenários de Teste — DEV4-4293
> Card: Tela de Gestão de Empresas
> Gerado em: 2026-06-03
> Card atualizado em: 2026-06-02T16:10:01.877-0300

---

## MÓDULO: EMPRESA

## RESUMO DO CARD

A feature cria uma tela dedicada de Gestão de Empresas para que gestores possam listar, criar, editar, deletar e visualizar detalhes de empresas cadastradas. Inclui sincronização bidirecional com o Flow CRM via API, com retry automático em caso de falha. O escopo não abrange importação em massa, automações por status nem relatórios gráficos.

---

## BLOCO 1 — Estratégia de Teste

**Escopo:** Tela de listagem com filtros/busca/paginação, modais de criação e edição, fluxo de deleção com desatribuição de contatos, visualização de detalhes e integração com Flow CRM (POST/PUT, retry, logs).
**Tipos de teste:** Funcional (fluxos principais e negativos), Integração (sync com Flow CRM), Regressão (impacto em contatos vinculados), UX/Responsividade (card view mobile), Segurança (autorização por account).
**Prioridade de execução:** Sincronização Flow CRM > Criar/Editar/Deletar empresa > Listagem/Filtros > Visualização de detalhes > Responsividade mobile.
**Riscos principais:** Falha silenciosa no sync com Flow sem notificação ao usuário; deleção acidental de vínculo com contatos; validação de nome duplicado case-insensitive inconsistente entre frontend e backend; retry automático criando registros duplicados no Flow.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Sync com Flow falha silenciosamente sem toast de erro | M | A | 🔴 Alta |
| Retry automático cria empresa duplicada no Flow após recuperação | M | A | 🔴 Alta |
| Validação de nome duplicado ignora diferença de caixa (case-sensitive no backend) | M | A | 🔴 Alta |
| Deleção remove contatos ao invés de apenas desatribuir | B | A | 🔴 Alta |
| flow_id não salvo no DB após POST bem-sucedido no Flow | M | A | 🔴 Alta |
| Debounce de 300ms não aplicado — requisições em excesso ao digitar | M | M | 🟡 Média |
| Mapeamento de status para Flow incorreto (ex: lead→prospect em vez de prospect→opportunity) | M | A | 🔴 Alta |
| Paginação não recarrega corretamente após criar/deletar empresa | M | M | 🟡 Média |
| Modal não reseta campos após fechar sem salvar | B | M | 🟡 Média |
| Visualização de detalhes exibe contatos de outra account | B | A | 🔴 Alta |
| Card view mobile quebra layout em telas abaixo de 375px | B | B | 🟢 Baixa |
| Log em company_sync_logs não salvo após 3 retries falhos | M | M | 🟡 Média |

---

## BLOCO 3 — Tabela de Cenários

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-EMPRESA-001 | Listar empresas com paginação | Account com 25+ empresas cadastradas | 1. Acessar tela de Gestão de Empresas. 2. Verificar tabela carregada. 3. Verificar rodapé de paginação. 4. Clicar em "Próxima página". | Página 1 exibe 20 registros; página 2 exibe o restante. Colunas Nome, Status, Qtd Contatos, Última Interação e Ações visíveis. | 🟡 Média | UI | — |
| CT-EMPRESA-002 | Criar empresa com dados válidos e sync Flow | ⚠️ Bloqueável — criável via API: `POST /v1/companies` com account ativa e Flow CRM acessível | 1. Clicar em "Nova Empresa". 2. Preencher Nome único. 3. Selecionar Status. 4. Clicar em "Salvar". | Modal fecha; lista atualiza com nova empresa; toast "✓ Sincronizado com CRM" exibido; flow_id visível no card da empresa. HTTP 201 retornado pelo backend. | 🔴 Alta | UI | — |
| CT-EMPRESA-003 | Criar empresa com nome duplicado | ⚠️ Bloqueável — criável via API: `POST /v1/companies` — empresa com mesmo nome já cadastrada na account | 1. Clicar em "Nova Empresa". 2. Preencher Nome igual ao já existente (testar variações de caixa: "Empresa A" vs "empresa a"). 3. Clicar em "Salvar". | Mensagem de erro de validação exibida: "Nome já cadastrado". Empresa não criada. POST ao Flow não enviado. | 🔴 Alta | UI | CT-EMPRESA-002 |
| CT-EMPRESA-004 | Editar empresa e sincronizar com Flow | ⚠️ Bloqueável — criável via API: `POST /v1/companies` — empresa com flow_id válido | 1. Localizar empresa na lista. 2. Clicar em "Editar" (Ações). 3. Modal pré-preenchido com dados atuais. 4. Alterar Status de Lead para Cliente. 5. Clicar em "Salvar". | Alterações salvas; modal fecha; lista atualiza; PUT enviado para `/v1/companies/{flow_id}` com `status: "customer"`; toast de sucesso exibido. | 🔴 Alta | UI | CT-EMPRESA-002 |
| CT-EMPRESA-005 | Mapeamento de status no PUT para Flow | ⚠️ Bloqueável — criável via API: `POST /v1/companies` — empresa com flow_id | 1. Editar empresa e alterar status para cada valor (Cliente, Lead, Prospect). 2. Verificar payload enviado ao Flow a cada alteração via Network tab. | cliente → `customer`; lead → `prospect`; prospect → `opportunity`. Nenhum outro valor aceito. | 🔴 Alta | API | CT-EMPRESA-004 |
| CT-EMPRESA-006 | Deletar empresa com contatos vinculados | ⚠️ Bloqueável — criável via API: `POST /v1/companies` + `POST /v1/contacts` com vínculo criado | 1. Localizar empresa com contatos. 2. Clicar em "Deletar" (Ações). 3. Verificar modal de confirmação. | Modal exibe alerta com quantidade exata de contatos vinculados; botões "Desatribuir de todos" e "Cancelar" presentes. | 🔴 Alta | UI | CT-EMPRESA-002 |
| CT-EMPRESA-007 | Desatribuir contatos ao deletar empresa | ⚠️ Bloqueável — criável via API: `POST /v1/companies` + `POST /v1/contacts` com vínculo | 1. Seguir CT-EMPRESA-006. 2. Clicar em "Desatribuir de todos". | Empresa removida da lista. Contatos continuam existindo (verificar via `GET /v1/contacts`). Vínculo com empresa removido; contatos NÃO deletados. | 🔴 Alta | UI | CT-EMPRESA-006 |
| CT-EMPRESA-008 | Falha sync Flow — toast e retry manual | ⚠️ Bloqueável — Mock/stub do endpoint Flow retornando HTTP 500 | 1. Clicar em "Nova Empresa". 2. Preencher dados válidos. 3. Clicar em "Salvar" com Flow indisponível. | Toast de erro exibido com botão "Tentar Novamente". Empresa salva localmente; flow_id ausente; status sync "⚠ Erro" visível no card. | 🔴 Alta | UI | — |
| CT-EMPRESA-009 | Retry automático 3x com backoff exponencial | ⚠️ Bloqueável — Mock do Flow retornando 500 por 3 tentativas consecutivas | 1. Criar empresa com Flow falhando. 2. Observar tentativas automáticas via Network tab (timestamps). 3. Aguardar esgotamento das tentativas. | 3 tentativas realizadas com intervalos aproximados de 1s, 2s e 4s. Após falha final: log salvo em `company_sync_logs`; status "⚠ Erro" exibido; sem nova tentativa automática. | 🔴 Alta | API | CT-EMPRESA-008 |
| CT-EMPRESA-010 | Busca por nome com debounce 300ms | Account com 10+ empresas | 1. Focar no campo de busca. 2. Digitar "Empresa T" caractere a caractere rapidamente. 3. Monitorar requisições de rede. | Somente 1 requisição enviada após 300ms de inatividade. Resultado filtra empresas contendo "Empresa T" no nome. | 🟡 Média | UI | CT-EMPRESA-001 |
| CT-EMPRESA-011 | Filtrar empresas por status Cliente | Account com empresas de status variado | 1. Acessar tela de listagem. 2. Selecionar filtro "Cliente". | Apenas empresas com status "Cliente" exibidas na tabela. Empresas Lead e Prospect não aparecem. | 🟡 Média | UI | CT-EMPRESA-001 |
| CT-EMPRESA-012 | Ordenar lista por Última Interação | Account com 5+ empresas com datas distintas | 1. Clicar no cabeçalho "Última Interação" uma vez. 2. Clicar novamente. | Primeira clique: ordem crescente. Segunda clique: ordem decrescente por data de última interação. | 🟡 Média | UI | CT-EMPRESA-001 |
| CT-EMPRESA-013 | Visualizar detalhes — top 5 contatos | ⚠️ Bloqueável — criável via API: `POST /v1/companies` + 6+ contatos vinculados | 1. Clicar em empresa para expandir card de detalhes. | Card expandido exibe exatamente 5 contatos (os mais relevantes). Histórico de interações recentes listado. | 🟡 Média | UI | CT-EMPRESA-007 |
| CT-EMPRESA-014 | Modal fecha e reseta ao cancelar criação | — | 1. Clicar em "Nova Empresa". 2. Preencher parcialmente os campos. 3. Clicar em "Cancelar" ou "X". 4. Reabrir modal. | Modal fecha sem salvar. Ao reabrir, todos os campos estão em branco/estado inicial. | 🟢 Baixa | UI | — |
| CT-EMPRESA-015 | Criar empresa sem status — campo obrigatório | — | 1. Clicar em "Nova Empresa". 2. Preencher Nome. 3. Deixar Status em branco. 4. Clicar em "Salvar". | Mensagem de validação "Status é obrigatório" exibida. Empresa não criada. POST não enviado ao Flow. | 🔴 Alta | UI | — |
| CT-EMPRESA-016 | Criar empresa sem nome — campo obrigatório | — | 1. Clicar em "Nova Empresa". 2. Deixar Nome em branco. 3. Selecionar Status. 4. Clicar em "Salvar". | Mensagem de validação "Nome é obrigatório" exibida. Empresa não criada. | 🔴 Alta | UI | — |
| CT-EMPRESA-017 | Empresa sem contatos permitida (lead pipeline) | — | 1. Criar empresa válida sem vincular contatos. 2. Verificar lista. | Empresa aparece na lista com Qtd Contatos = 0. Nenhum erro ou bloqueio exibido. | 🟢 Baixa | UI | CT-EMPRESA-002 |
| CT-EMPRESA-018 | Acesso isolado por account — segurança | ⚠️ Bloqueável — criável via API: duas accounts distintas com empresas cadastradas | 1. Autenticar com usuário da Account A. 2. Acessar `GET /v1/companies`. 3. Verificar IDs retornados. 4. Tentar acessar `GET /v1/companies/{id}` de empresa da Account B diretamente. | Listagem retorna somente empresas da Account A. Acesso a empresa da Account B retorna HTTP 403 ou 404. Nenhum dado de outra account exposto. | 🔴 Alta | API | — |
| CT-EMPRESA-019 | Responsividade mobile — card view | Dispositivo ou viewport ≤ 375px | 1. Acessar tela de Gestão de Empresas em viewport 375px. 2. Verificar layout da listagem. | Tabela substituída por card view responsivo. Todas as informações principais visíveis sem scroll horizontal. Botões de ação acessíveis. | 🟢 Baixa | UI | CT-EMPRESA-001 |
| CT-EMPRESA-020 | flow_id salvo e exibido após criação | ⚠️ Bloqueável — criável via API: `POST /v1/companies` com Flow retornando flow_id válido | 1. Criar empresa com Flow disponível. 2. Abrir card de detalhes da empresa criada. | flow_id retornado pelo Flow visível no card de detalhes. Valor persistido no banco (verificar via `GET /v1/companies/{id}`). | 🔴 Alta | UI | CT-EMPRESA-002 |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Cenário: Criar empresa com dados válidos sincroniza com Flow CRM
  Dado que o gestor está autenticado na plataforma Poli Digital
  E o Flow CRM está acessível e operacional
  E não existe empresa com o nome "Tech Solutions" na account
  Quando o gestor clica em "Nova Empresa"
  E preenche o campo Nome com "Tech Solutions"
  E seleciona o Status "Lead"
  E clica em "Salvar"
  Então a empresa "Tech Solutions" é exibida na lista de empresas
  E um POST é enviado para o Flow CRM com os dados da empresa
  E o flow_id retornado pelo Flow é salvo no banco de dados
  E o flow_id é visível no card de detalhes da empresa
  E o toast "✓ Sincronizado com CRM" é exibido ao gestor
```

```gherkin
Cenário: Retry automático após falha de sync esgota tentativas e registra log
  Dado que o gestor está autenticado na plataforma Poli Digital
  E o endpoint do Flow CRM está retornando HTTP 500
  E os dados da empresa "Beta Corp" são válidos e únicos na account
  Quando o gestor cria a empresa "Beta Corp" clicando em "Salvar"
  Então o sistema realiza a primeira tentativa de sync com o Flow CRM
  E aguarda aproximadamente 1 segundo antes da segunda tentativa
  E aguarda aproximadamente 2 segundos antes da terceira tentativa
  E após 3 tentativas falhas o sistema não realiza nova tentativa automática
  E um registro de falha é salvo na tabela "company_sync_logs"
  E o status de sync "⚠ Erro" é exibido no card da empresa
  E o toast de erro com o botão "Tentar Novamente" é exibido ao gestor
```

```gherkin
Cenário: Deletar empresa desatribui contatos sem removê-los
  Dado que o gestor está autenticado na plataforma Poli Digital
  E existe a empresa "Alpha Ltda" com 3 contatos vinculados
  Quando o gestor clica em "Deletar" na empresa "Alpha Ltda"
  Então um modal de confirmação é exibido informando "3 contatos vinculados"
  E as opções "Desatribuir de todos" e "Cancelar" estão disponíveis
  Quando o gestor clica em "Desatribuir de todos"
  Então a empresa "Alpha Ltda" é removida da lista
  E os 3 contatos continuam existindo na plataforma
  E nenhum dos 3 contatos possui vínculo com a empresa "Alpha Ltda"
```

---

## ✅ Validação por Agente Crítico Independente

O arquivo ainda não existe — a avaliação será feita com base nos cenários fornecidos diretamente na mensagem.

---

## Análise por Cenário

**CT-EMPRESA-001** — Nenhum problema identificado.

**CT-EMPRESA-002** — Nenhum problema identificado.

**CT-EMPRESA-003**
- [CT-EMPRESA-003] | Assunções indevidas | O passo instrui testar variação de caixa ("Empresa A" vs "empresa a") mas o resultado esperado diz apenas "Nome já cadastrado" — não valida explicitamente que a comparação case-insensitive funcionou, tornando o critério de aprovação ambíguo. | Adicionar ao Resultado Esperado: "Erro exibido inclusive quando a variação de caixa é diferente do nome existente (ex: 'empresa a' bloqueia quando 'Empresa A' já existe)."

**CT-EMPRESA-004** — Nenhum problema identificado.

**CT-EMPRESA-005**
- [CT-EMPRESA-005] | Assunções indevidas | O card define apenas os mapeamentos cliente→customer, lead e prospect, mas não especifica qual valor Flow corresponde a "lead" — o cenário assume `lead → prospect` e `prospect → opportunity` sem base explícita no card. Isso pode ser correto mas é uma assunção. | Sinalizar como "a confirmar com dev/PO" e adicionar pré-requisito: "mapeamento confirmado via documentação da API do Flow CRM."

**CT-EMPRESA-006** — Nenhum problema identificado.

**CT-EMPRESA-007** — Nenhum problema identificado.

**CT-EMPRESA-008**
- [CT-EMPRESA-008] | Rastreabilidade | O resultado esperado inclui "status sync '⚠ Erro' visível no card" — o card menciona toast com "Tentar Novamente" mas não descreve um indicador visual permanente de erro no card. É uma assunção de UX não rastreável ao critério. | Remover "status sync '⚠ Erro' visível no card" do resultado ou marcar como "comportamento a confirmar com design."

**CT-EMPRESA-009**
- [CT-EMPRESA-009] | Assunções indevidas | O resultado esperado inclui "sem nova tentativa automática" após as 3 tentativas, o que é correto, mas também menciona "status '⚠ Erro' exibido" — mesmo problema do CT-EMPRESA-008: indicador visual permanente não está no card. | Alinhar resultado esperado ao que o card define: toast + log em company_sync_logs. Remover referência ao status visual permanente se não confirmado.

**CT-EMPRESA-010** — Nenhum problema identificado.

**CT-EMPRESA-011** — Nenhum problema identificado.

**CT-EMPRESA-012**
- [CT-EMPRESA-012] | Rastreabilidade | Ordenação por "Última Interação" clicando no cabeçalho não está nos critérios de aceite nem nas regras de negócio do card. O card menciona apenas que "Última Interação = máximo das datas dos contatos vinculados" como regra de cálculo, não como funcionalidade de ordenação interativa. | Remover CT-EMPRESA-012 ou reposicionar como "cenário extra-escopo sujeito a validação com PO." Não deve compor cobertura obrigatória.

**CT-EMPRESA-013**
- [CT-EMPRESA-013] | Assunções indevidas | "Top 5 contatos mais relevantes" e "histórico de interações recentes" não constam nos critérios de aceite nem nas regras de negócio. O card não especifica limite de contatos exibidos no card de detalhes nem a existência de histórico. | Ajustar resultado esperado para o que o card garante: contatos vinculados listados, sem assumir limite de 5 ou presença de histórico.

**CT-EMPRESA-014** — Nenhum problema identificado.

**CT-EMPRESA-015** — Nenhum problema identificado.

**CT-EMPRESA-016** — Nenhum problema identificado.

**CT-EMPRESA-017** — Nenhum problema identificado.

**CT-EMPRESA-018** — Nenhum problema identificado.

**CT-EMPRESA-019** — Nenhum problema identificado.

**CT-EMPRESA-020** — Nenhum problema identificado.

---

## Problemas encontrados: 7 ocorrências em 6 cenários

| CT-ID | Critério | Problema | Sugestão |
|---|---|---|---|
| CT-EMPRESA-003 | Assunções indevidas | Resultado esperado não valida explicitamente que a comparação case-insensitive funcionou | Adicionar ao resultado: "erro exibido quando variação de caixa coincide com nome existente" |
| CT-EMPRESA-005 | Assunções indevidas | Mapeamento lead→prospect e prospect→opportunity não está no card | Marcar como "a confirmar via doc da API Flow" e adicionar pré-requisito correspondente |
| CT-EMPRESA-008 | Rastreabilidade | Indicador visual permanente "⚠ Erro" no card não rastreável ao card | Remover ou marcar como comportamento a confirmar com design |
| CT-EMPRESA-009 | Rastreabilidade | Mesmo problema: "status '⚠ Erro' exibido" não rastreável ao card | Alinhar resultado ao que o card define: toast + log em company_sync_logs |
| CT-EMPRESA-012 | Rastreabilidade | Ordenação interativa por cabeçalho não está nos critérios de aceite | Remover ou reposicionar como extra-escopo |
| CT-EMPRESA-013 | Assunções indevidas | "Top 5 contatos" e "histórico de interações" não constam no card | Remover limite e histórico do resultado esperado |

---

## Cobertura Mínima

- Happy path: CT-EMPRESA-002 (criar+sync), CT-EMPRESA-004 (editar+sync) — aprovado
- Negativos/erro: CT-EMPRESA-003 (nome duplicado), CT-EMPRESA-008 (falha sync), CT-EMPRESA-009 (retry esgotado), CT-EMPRESA-015 (status obrigatório), CT-EMPRESA-016 (nome obrigatório) — aprovado (5 negativos)
- Borda: CT-EMPRESA-017 (empresa sem contatos), CT-EMPRESA-001 (paginação 20+) — aprovado
- Segurança: CT-EMPRESA-018 — aprovado

---

## BLOCO 3 Revisado (cenários com correções aplicadas)

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-EMPRESA-001 | Listar empresas com paginação | Account com 25+ empresas cadastradas | 1. Acessar tela de Gestão de Empresas. 2. Verificar tabela carregada. 3. Verificar rodapé de paginação. 4. Clicar em "Próxima página". | Página 1 exibe 20 registros; página 2 exibe o restante. Colunas Nome, Status, Qtd Contatos, Última Interação e Ações visíveis. | Média | UI | — |
| CT-EMPRESA-002 | Criar empresa com dados válidos e sync Flow | Account ativa e Flow CRM acessível. Criável via API: `POST /v1/companies`. | 1. Clicar em "Nova Empresa". 2. Preencher Nome único. 3. Selecionar Status. 4. Clicar em "Salvar". | Modal fecha; lista atualiza com nova empresa; toast "Sincronizado com CRM" exibido; flow_id visível no card da empresa. HTTP 201 retornado pelo backend. | Alta | UI | — |
| CT-EMPRESA-003 | Criar empresa com nome duplicado (case-insensitive) | Empresa com mesmo nome já cadastrada na account. Criável via API: `POST /v1/companies`. | 1. Clicar em "Nova Empresa". 2. Preencher Nome idêntico ao existente. 3. Clicar em "Salvar". 4. Repetir com variação de caixa (ex: "Empresa A" → "empresa a"). | Mensagem de erro "Nome já cadastrado" exibida em ambos os casos (nome exato e variação de caixa). Empresa não criada. POST ao Flow não enviado. | Alta | UI | CT-EMPRESA-002 |
| CT-EMPRESA-004 | Editar empresa e sincronizar com Flow | Empresa com flow_id válido. Criável via API: `POST /v1/companies`. | 1. Localizar empresa na lista. 2. Clicar em "Editar" (Ações). 3. Verificar que modal está pré-preenchido com dados atuais. 4. Alterar Status de Lead para Cliente. 5. Clicar em "Salvar". | Alterações salvas; modal fecha; lista atualiza; PUT enviado para `/v1/companies/{flow_id}` com `status: "customer"`; toast de sucesso exibido. | Alta | UI | CT-EMPRESA-002 |
| CT-EMPRESA-005 | Mapeamento de status no PUT para Flow | Empresa com flow_id. Mapeamento de valores confirmado com dev/PO ou documentação da API Flow CRM. Criável via API: `POST /v1/companies`. | 1. Editar empresa e alterar status para cada valor (Cliente, Lead, Prospect). 2. Verificar payload enviado ao Flow a cada alteração via Network tab. | cliente → `customer`. Valores de Lead e Prospect mapeados conforme documentação confirmada da API Flow. Nenhum outro valor aceito. | Alta | API | CT-EMPRESA-004 |
| CT-EMPRESA-006 | Deletar empresa com contatos vinculados | Empresa com contatos vinculados. Criável via API: `POST /v1/companies` + `POST /v1/contacts` com vínculo. | 1. Localizar empresa com contatos. 2. Clicar em "Deletar" (Ações). 3. Verificar modal de confirmação. | Modal exibe alerta com quantidade exata de contatos vinculados; botões "Desatribuir de todos" e "Cancelar" presentes. | Alta | UI | CT-EMPRESA-002 |
| CT-EMPRESA-007 | Desatribuir contatos ao deletar empresa | Empresa com contatos vinculados. Criável via API: `POST /v1/companies` + `POST /v1/contacts` com vínculo. | 1. Seguir CT-EMPRESA-006. 2. Clicar em "Desatribuir de todos". | Empresa removida da lista. Contatos continuam existindo (verificar via `GET /v1/contacts`). Vínculo com empresa removido; contatos NÃO deletados. | Alta | UI | CT-EMPRESA-006 |
| CT-EMPRESA-008 | Falha sync Flow — toast e retry manual | Mock/stub do endpoint Flow retornando HTTP 500. | 1. Clicar em "Nova Empresa". 2. Preencher dados válidos. 3. Clicar em "Salvar" com Flow indisponível. | Toast de erro exibido com botão "Tentar Novamente". Empresa salva localmente; flow_id ausente no registro. | Alta | UI | — |
| CT-EMPRESA-009 | Retry automático 3x com backoff exponencial | Mock do Flow retornando 500 por 3 tentativas consecutivas. | 1. Criar empresa com Flow falhando. 2. Observar tentativas automáticas via Network tab (timestamps). 3. Aguardar esgotamento das tentativas. | 3 tentativas realizadas com intervalos aproximados de 1s, 2s e 4s. Após falha final: log salvo em `company_sync_logs`; toast de erro com botão "Tentar Novamente" exibido; nenhuma nova tentativa automática realizada. | Alta | API | CT-EMPRESA-008 |
| CT-EMPRESA-010 | Busca por nome com debounce 300ms | Account com 10+ empresas. | 1. Focar no campo de busca. 2. Digitar "Empresa T" caractere a caractere rapidamente. 3. Monitorar requisições de rede. | Somente 1 requisição enviada após 300ms de inatividade. Resultado filtra empresas contendo "Empresa T" no nome. | Média | UI | CT-EMPRESA-001 |
| CT-EMPRESA-011 | Filtrar empresas por status Cliente | Account com empresas de status variado. | 1. Acessar tela de listagem. 2. Selecionar filtro "Cliente". | Apenas empresas com status "Cliente" exibidas na tabela. Empresas Lead e Prospect não aparecem. | Média | UI | CT-EMPRESA-001 |
| CT-EMPRESA-012 | Visualizar contatos vinculados no card de detalhes | Empresa com 3+ contatos vinculados. Criável via API: `POST /v1/companies` + `POST /v1/contacts`. | 1. Clicar em empresa para expandir card de detalhes. | Card expandido exibe contatos vinculados à empresa. Informações dos contatos visíveis sem erro. | Média | UI | CT-EMPRESA-007 |
| CT-EMPRESA-013 | Modal fecha e reseta ao cancelar criação | — | 1. Clicar em "Nova Empresa". 2. Preencher parcialmente os campos. 3. Clicar em "Cancelar" ou "X". 4. Reabrir modal. | Modal fecha sem salvar. Ao reabrir, todos os campos estão em branco/estado inicial. | Baixa | UI | — |
| CT-EMPRESA-014 | Criar empresa sem status — campo obrigatório | — | 1. Clicar em "Nova Empresa". 2. Preencher Nome. 3. Deixar Status em branco. 4. Clicar em "Salvar". | Mensagem de validação "Status é obrigatório" exibida. Empresa não criada. POST não enviado ao Flow. | Alta | UI | — |
| CT-EMPRESA-015 | Criar empresa sem nome — campo obrigatório | — | 1. Clicar em "Nova Empresa". 2. Deixar Nome em branco. 3. Selecionar Status. 4. Clicar em "Salvar". | Mensagem de validação "Nome é obrigatório" exibida. Empresa não criada. | Alta | UI | — |
| CT-EMPRESA-016 | Empresa sem contatos permitida (lead pipeline) | — | 1. Criar empresa válida sem vincular contatos. 2. Verificar lista. | Empresa aparece na lista com Qtd Contatos = 0. Nenhum erro ou bloqueio exibido. | Baixa | UI | CT-EMPRESA-002 |
| CT-EMPRESA-017 | Acesso isolado por account — segurança | Duas accounts distintas com empresas cadastradas. Criável via API. | 1. Autenticar com usuário da Account A. 2. Acessar `GET /v1/companies`. 3. Verificar IDs retornados. 4. Tentar acessar `GET /v1/companies/{id}` de empresa da Account B diretamente. | Listagem retorna somente empresas da Account A. Acesso a empresa da Account B retorna HTTP 403 ou 404. Nenhum dado de outra account exposto. | Alta | API | — |
| CT-EMPRESA-018 | Responsividade mobile — card view | Dispositivo ou viewport de 375px. | 1. Acessar tela de Gestão de Empresas em viewport 375px. 2. Verificar layout da listagem. | Tabela substituída por card view responsivo. Todas as informações principais visíveis sem scroll horizontal. Botões de ação acessíveis. | Baixa | UI | CT-EMPRESA-001 |
| CT-EMPRESA-019 | flow_id salvo e exibido após criação | Flow retornando flow_id válido. Criável via API: `POST /v1/companies`. | 1. Criar empresa com Flow disponível. 2. Abrir card de detalhes da empresa criada. | flow_id retornado pelo Flow visível no card de detalhes. Valor persistido no banco (verificar via `GET /v1/companies/{id}`). | Alta | UI | CT-EMPRESA-002 |

---

**Observações sobre a renumeração:**
- CT-EMPRESA-012 original (ordenação por cabeçalho) foi removido por ausência de rastreabilidade ao card.
- CT-EMPRESA-013 original (visualizar detalhes — top 5 contatos) foi corrigido e renumerado como CT-EMPRESA-012, removendo as assunções de limite 5 e histórico de interações.
- Os cenários CT-EMPRESA-013 a CT-EMPRESA-019 foram renumerados sequencialmente para preencher a lacuna.
- Total: 19 cenários (era 20, 1 removido por extra-escopo).

---

**Aprovados: 14 | Com problemas: 6 | Sugestões aplicadas: CT-EMPRESA-003, CT-EMPRESA-005, CT-EMPRESA-008, CT-EMPRESA-009, CT-EMPRESA-012 (removido), CT-EMPRESA-013 (corrigido)**
