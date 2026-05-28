# Cenários de Teste — DEV4-4267
> Card: Configurações: Exportação de Conversas (Nova interface)
> Gerado em: 2026-05-28
> Card atualizado em: 2026-05-27T17:25:34.395-0300

---

## BLOCO 1 — Estratégia de Teste

A história DEV-4267 introduz uma **nova interface de Exportação de Conversas** na seção de Configurações, separando semanticamente esta funcionalidade das ações destrutivas. O escopo cobre: carregamento assíncrono do histórico, solicitação de nova exportação com modal de confirmação, bloqueio mensal, download via URL assinada e os quatro estados de status (Processando, Disponível, Expirado, Erro). Os tipos de teste prioritários são: **UI funcional** (fluxo de solicitação e estados da tabela), **API** (criação de solicitação, busca de URL assinada, log de auditoria), **controle de acesso** (somente Gestor — `is-manager`) e **validação de regras de negócio** (limite mensal, expiração de 24h, TTL de URL). Os principais riscos são: falha no bloqueio de solicitação duplicada no mês, download disponível para status ≠ Disponível, ausência de log de auditoria e expiração de URL não regenerada.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade | Impacto | Prioridade |
|---|---|---|---|
| Solicitação duplicada no mesmo mês (bypasse do limite) | M | A | Alta |
| Botão "Baixar" ativo em status Expirado ou Erro | M | A | Alta |
| URL assinada expirada sem regeneração ao clicar | M | A | Alta |
| Log de auditoria não registrado para solicitação ou download | M | A | Alta |
| Banner de bloqueio exibe data de liberação incorreta | M | M | Média |
| Usuário sem role Gestor acessa e solicita exportação | B | A | Alta |
| Skeleton screen ausente durante carregamento | B | M | Média |
| Empty state não exibido quando histórico está vazio | B | M | Média |
| Modal fecha sem ação ao confirmar (erro silencioso) | B | A | Alta |
| Arquivo ZIP/CSV corrompido ou vazio | B | A | Alta |
| Tokens do Design System Poli não aplicados | B | B | Baixa |
| Traduções faltando em PT-BR / EN / ES | B | M | Média |
| Regressão no fluxo existente de backup/exportação legado | B | A | Alta |
| Evento analytics não disparado | M | M | Média |

---

## BLOCO 3 — Tabela de Cenários

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-EXPORT-001 | Solicitação de exportação com sucesso (sem exportação no mês) | Usuário autenticado com role Gestor (`is-manager`). Conta sem exportação no mês corrente. API de exportação disponível. | 1. Acessar Configurações > Exportação de Conversas. 2. Verificar que botão "Solicitar exportação" está visível e ativo. 3. Clicar em "Solicitar exportação". 4. Verificar que modal abre com: descrição do que exporta, prazo de processamento, limite mensal, próxima data de liberação. 5. Clicar em "Confirmar solicitação". 6. Observar loading no botão durante envio. 7. Aguardar resposta de sucesso. | Modal fecha. Toast "Exportação solicitada com sucesso!" exibido. Nova linha adicionada ao topo da tabela com status "Processando" (badge amarelo). Botão "Solicitar exportação" substituído por banner de bloqueio com data de liberação. | 🔴 Alta | UI | — |
| CT-EXPORT-002 | Download de arquivo disponível (status = Disponível) | Usuário autenticado com role Gestor. Conta com exportação no histórico com status "Disponível". | 1. Acessar Configurações > Exportação de Conversas. 2. Verificar que linha com status "Disponível" exibe botão "Baixar" ativo. 3. Clicar em "Baixar". 4. Observar chamada à API para buscar URL assinada. 5. Verificar que URL é aberta em nova aba. | URL assinada gerada via API. Arquivo ZIP abre/baixa em nova aba. Linha permanece com status "Disponível" (download não altera status). | 🔴 Alta | UI | CT-EXPORT-001 |
| CT-EXPORT-003 | Bloqueio de nova solicitação quando já existe exportação no mês corrente | Usuário autenticado com role Gestor. Conta com exportação já solicitada no mês corrente. | 1. Acessar Configurações > Exportação de Conversas. 2. Verificar estado da interface. | Botão "Solicitar exportação" está oculto. Banner de bloqueio exibe mensagem informando a data de liberação da próxima exportação (ex.: "01/06/2026"). | 🔴 Alta | UI | CT-EXPORT-001 |
| CT-EXPORT-004 | Tentativa de solicitação duplicada via API (bypass do limite mensal) | ⚠️ Bloqueável — requer acesso à API de exportação com token Gestor válido. Conta já com exportação no mês corrente. | 1. Obter token JWT de um Gestor via heimdall. 2. Realizar `POST /v3/accounts/{account_uuid}/exports` diretamente via API. 3. Verificar resposta. | API retorna HTTP 422 ou 409 com mensagem de erro indicando limite mensal atingido. Nenhuma nova solicitação registrada. | 🔴 Alta | API | CT-EXPORT-001 |
| CT-EXPORT-005 | Erro de API ao confirmar solicitação (modal permanece aberto) | Usuário autenticado com role Gestor. Conta sem exportação no mês corrente. Simular falha na API de exportação (ex.: retorno 500). | 1. Acessar Configurações > Exportação de Conversas. 2. Clicar em "Solicitar exportação". 3. No modal, clicar em "Confirmar solicitação" com API mockada para retornar erro. 4. Observar comportamento. | Botão sai do estado de loading. Mensagem inline exibida no modal: "Não foi possível solicitar a exportação. Tente novamente." Modal permanece aberto. Nenhuma nova linha inserida na tabela. Banner de bloqueio não exibido. | 🔴 Alta | UI | — |
| CT-EXPORT-006 | Atendente (role agent) não pode acessar ou solicitar exportação | Usuário autenticado com role `agent` (não é Gestor). | 1. Acessar Configurações > Exportação de Conversas com usuário agente. 2. Tentar solicitar exportação via UI. 3. Tentar `POST /v3/accounts/{account_uuid}/exports` via API com token de agente. | UI: seção de exportação oculta ou botão desabilitado/inexistente para role agent. API: retorno HTTP 403 Forbidden para token de agente. | 🔴 Alta | UI + API | — |
| CT-EXPORT-007 | Histórico exibido em ordem decrescente (mais recente primeiro) | Usuário autenticado com role Gestor. Conta com múltiplas exportações no histórico (diferentes datas e status). | 1. Acessar Configurações > Exportação de Conversas. 2. Aguardar carregamento do histórico. 3. Verificar a ordem das linhas na tabela. | Linhas ordenadas da mais recente para a mais antiga. A exportação com data mais recente aparece no topo. | 🟡 Média | UI | — |
| CT-EXPORT-008 | Empty state exibido quando não há nenhuma exportação no histórico | Usuário autenticado com role Gestor. Conta sem nenhuma exportação solicitada até o momento. | 1. Acessar Configurações > Exportação de Conversas. 2. Aguardar carregamento. | Empty state exibido com texto "Nenhuma exportação solicitada ainda" (ou equivalente i18n). Tabela de histórico não exibida. Botão "Solicitar exportação" visível e ativo. | 🟡 Média | UI | — |
| CT-EXPORT-009 | Skeleton screen exibido durante carregamento do histórico | Usuário autenticado com role Gestor. Simular latência na chamada de API do histórico. | 1. Acessar Configurações > Exportação de Conversas com latência de rede simulada. 2. Observar interface antes de receber resposta. | Skeleton screen exibido enquanto o histórico é carregado. Conteúdo real substitui skeleton após resposta da API. | 🟡 Média | UI | — |
| CT-EXPORT-010 | Botão "Baixar" ausente em linhas com status Expirado e Erro | Usuário autenticado com role Gestor. Conta com exportações nos status "Expirado" e "Erro no processamento" no histórico. | 1. Acessar Configurações > Exportação de Conversas. 2. Localizar linhas com status "Expirado". 3. Localizar linhas com status "Erro no processamento". 4. Verificar ações disponíveis em cada linha. | Linhas "Expirado": nenhuma ação exibida (sem botão "Baixar"). Linhas "Erro no processamento": somente botão "Contatar suporte" exibido, sem botão "Baixar". Badge das linhas "Expirado" é cinza e "Erro" é coral. | 🔴 Alta | UI | CT-EXPORT-001 |
| CT-EXPORT-011 | URL assinada regenerada ao clicar "Baixar" após TTL expirado | ⚠️ Bloqueável — requer acesso a exportação com status Disponível e URL assinada expirada (TTL > 15 min). | 1. Ter uma linha com status "Disponível" cuja URL assinada foi gerada há mais de 15 minutos. 2. Clicar em "Baixar". 3. Observar chamada à API. | Nova chamada à API para gerar nova URL assinada é realizada. Nova URL aberta em nova aba com sucesso (não retorna erro 403/404 de URL expirada). | 🔴 Alta | UI + API | CT-EXPORT-002 |
| CT-EXPORT-012 | Log de auditoria registrado para solicitação de exportação | ⚠️ Bloqueável — requer acesso a logs de auditoria ou endpoint de auditoria. Usuário autenticado com role Gestor. | 1. Solicitar exportação com sucesso (CT-EXPORT-001). 2. Consultar log de auditoria para a conta. | Registro de auditoria criado com: `gestor_id`, `acao: "export_requested"`, `data` (timestamp da solicitação), `conta_id`. | 🔴 Alta | API | CT-EXPORT-001 |
| CT-EXPORT-013 | Log de auditoria registrado para download de exportação | ⚠️ Bloqueável — requer acesso a logs de auditoria. Usuário autenticado com role Gestor. Exportação com status Disponível. | 1. Clicar em "Baixar" em uma exportação disponível (CT-EXPORT-002). 2. Consultar log de auditoria para a conta. | Registro de auditoria criado com: `gestor_id`, `acao: "export_downloaded"`, `data` (timestamp do download), `conta_id`. | 🔴 Alta | API | CT-EXPORT-002 |
| CT-EXPORT-014 | Cancelar no modal fecha sem executar ação | Usuário autenticado com role Gestor. Conta sem exportação no mês corrente. | 1. Acessar Configurações > Exportação de Conversas. 2. Clicar em "Solicitar exportação". 3. No modal aberto, clicar em "Cancelar". 4. Verificar estado da interface. | Modal fecha sem nenhuma ação. Nenhuma chamada à API de exportação realizada. Botão "Solicitar exportação" continua visível e ativo. Histórico inalterado. | 🟡 Média | UI | — |
| CT-EXPORT-015 | Gestor diferente do solicitante pode baixar exportação disponível | ⚠️ Bloqueável — requer dois usuários com role Gestor na mesma conta. | 1. Gestor A solicita exportação e aguarda status "Disponível". 2. Gestor B (diferente de A) acessa Configurações > Exportação de Conversas. 3. Gestor B clica em "Baixar" na exportação disponível. | Gestor B consegue baixar o arquivo com sucesso. URL assinada é gerada sem restrição ao gestor solicitante original. | 🟡 Média | UI + API | CT-EXPORT-001 |
| CT-EXPORT-016 | Acesso não autenticado à API de exportação é bloqueado | Sem autenticação (sem token JWT). | 1. Realizar `GET /v3/accounts/{account_uuid}/exports` sem token de autorização. 2. Realizar `POST /v3/accounts/{account_uuid}/exports` sem token. | API retorna HTTP 401 Unauthorized para ambas as requisições. Nenhum dado de exportação exposto. | 🔴 Alta | API | — |
| CT-EXPORT-017 | Exportação com account_uuid de outra conta é bloqueada (isolamento multi-tenant) | ⚠️ Bloqueável — requer dois accounts distintos com tokens Gestor válidos. | 1. Obter token JWT de Gestor da Conta A. 2. Realizar `GET /v3/accounts/{uuid_conta_B}/exports` usando token da Conta A. | API retorna HTTP 403 Forbidden. Dados de exportação da Conta B não são expostos para o token da Conta A. | 🔴 Alta | API | — |

---

## BLOCO 4 — Gherkin (BDD)

### Cenário 1 — CT-EXPORT-001: Solicitação de exportação com sucesso

```gherkin
Feature: Exportação de Conversas — Configurações

  Background:
    Given que estou autenticado como Gestor da conta "Poli Demo"
    And a conta não possui exportação solicitada no mês corrente
    And a API de exportação está disponível e operacional

  Scenario: Solicitação de exportação com sucesso
    When acesso "Configurações > Exportação de Conversas"
    Then o botão "Solicitar exportação" deve estar visível e ativo
    And o banner de bloqueio mensal não deve ser exibido

    When clico em "Solicitar exportação"
    Then o modal de confirmação deve abrir
    And o modal deve exibir a descrição do conteúdo a ser exportado
    And o modal deve exibir o prazo de processamento ("disponível no dia seguinte")
    And o modal deve exibir o limite de "1 exportação por mês"
    And o modal deve exibir a data da próxima liberação após confirmação

    When clico em "Confirmar solicitação"
    Then o botão deve exibir estado de loading durante o envio
    And o modal deve fechar após sucesso
    And o toast "Exportação solicitada com sucesso!" deve ser exibido
    And uma nova linha deve aparecer no topo da tabela com status "Processando"
    And o badge de status da nova linha deve ter cor amarela
    And o botão "Solicitar exportação" deve ser substituído pelo banner de bloqueio
    And o banner deve exibir a data de liberação da próxima exportação
```

### Cenário 2 — CT-EXPORT-004: Tentativa de bypass do limite mensal via API

```gherkin
Feature: Exportação de Conversas — Limite Mensal

  Background:
    Given que estou autenticado como Gestor da conta "Poli Demo"
    And a conta já possui uma exportação solicitada no mês corrente

  Scenario: Bloqueio de solicitação duplicada via API no mesmo mês
    When realizo uma requisição POST para "/v3/accounts/{account_uuid}/exports"
    With um token JWT válido de Gestor
    Then a resposta HTTP deve ser 422 ou 409
    And o corpo da resposta deve conter mensagem indicando limite mensal atingido
    And nenhuma nova exportação deve ser registrada no histórico da conta
    And o log de auditoria não deve registrar nova solicitação
```

---

## Validação por Agente Crítico Independente

> Avaliação realizada com base nos critérios de aceite do card DEV4-4267, regras de negócio declaradas e cobertura mínima requerida.

### Resultado da Revisão

| CT-ID | Critério | Avaliação | Ação |
|---|---|---|---|
| CT-EXPORT-001 | Rastreabilidade | Amarrado ao CA "Sucesso → modal fecha + toast + nova linha Processando + banner bloqueio" | Aprovado |
| CT-EXPORT-002 | Rastreabilidade | Amarrado ao CA "Clicar em Baixar → fetch URL assinada → abre URL em nova aba" | Aprovado |
| CT-EXPORT-003 | Rastreabilidade | Amarrado ao CA "Solicitação no mês corrente → botão substituído por banner de bloqueio" | Aprovado |
| CT-EXPORT-004 | Cobertura negativa | Cobre bypass de limite via API — essencial para segurança de regra de negócio | Aprovado |
| CT-EXPORT-005 | Rastreabilidade | Amarrado ao CA "Erro de API → mensagem inline no modal + modal permanece aberto" | Aprovado |
| CT-EXPORT-006 | Segurança | Cobre controle de acesso por role — alinhado com regra "qualquer Gestor" (exclusão de outros roles) | Aprovado — marcado como UI+API |
| CT-EXPORT-007 | Rastreabilidade | Amarrado ao CA "Histórico ordenado da solicitação mais recente para a mais antiga" | Aprovado |
| CT-EXPORT-008 | Rastreabilidade | Amarrado ao CA "Empty state exibido quando não há nenhuma solicitação no histórico" | Aprovado |
| CT-EXPORT-009 | Rastreabilidade | Amarrado ao CA "Skeleton screen exibido durante carregamento do histórico" | Aprovado |
| CT-EXPORT-010 | Rastreabilidade | Amarrado ao CA "Botão Baixar visível e ativo apenas em linhas com status Disponível" e "Linhas Expirado não exibem ação" e "Erro exibe Contatar suporte" | Aprovado |
| CT-EXPORT-011 | Rastreabilidade | Amarrado ao CA "URL expirada (> TTL) → nova URL gerada ao clicar" | Aprovado |
| CT-EXPORT-012 | Rastreabilidade | Amarrado ao CA "Log de auditoria registrado para solicitação" | Aprovado |
| CT-EXPORT-013 | Rastreabilidade | Amarrado ao CA "Log de auditoria registrado para download" | Aprovado |
| CT-EXPORT-014 | Rastreabilidade | Amarrado ao CA "Cancelar fecha modal sem ação" | Aprovado |
| CT-EXPORT-015 | Rastreabilidade | Amarrado à regra "Gestor que solicita não é necessariamente o mesmo que vai baixar" | Aprovado |
| CT-EXPORT-016 | Segurança | Cobre acesso não autenticado — isolamento de dados | Aprovado |
| CT-EXPORT-017 | Segurança | Cobre isolamento multi-tenant (account_id scoping) — regra crítica da KB | Adicionado por cobertura de segurança |

### Cobertura Verificada

| Tipo | Mínimo | Gerados |
|---|---|---|
| Happy Path | 2 | 3 (CT-001, CT-002, CT-015) |
| Negativos/Erro | 3 | 4 (CT-004, CT-005, CT-006, CT-016) |
| Borda | 2 | 3 (CT-003, CT-011, CT-010) |
| Segurança | 1 | 3 (CT-006, CT-016, CT-017) |

- Aprovados sem alteração: 16
- Revisados: 1 (CT-EXPORT-006 — modo atualizado de UI para UI+API)
- Adicionados por cobertura insuficiente: 0 (CT-EXPORT-017 adicionado por cobertura de segurança multi-tenant, identificada no card como regra crítica)
