# Relatório de Execução — DEV4-4253
> Card: Busca de templates com atalho de teclado excede limite do per_page
> Iniciado em: 2026-05-28T14:30:00.000Z
> Gerado em: 2026-05-28T18:15:00-0300
> Ambiente: https://spa.qa.poli.digital/chat
> PRs: SPA#1500
> Mocks ativos: force-error em `/v3/accounts/9b8af98e.../templates?...keyboard_shortcut=NOT_EMPTY` (CT-TMPL-005 apenas)

---

## Resumo Geral

| Métrica | Valor |
|---|---|
| ✅ Passou | 6 |
| ❌ Falhou | 0 |
| ⏭️ Bloqueado | 3 |
| 📊 Taxa de sucesso | 100% dos executados |
| ⏱️ Tempo total | ~45 min |
| 🔧 Self-healings | 0 |

---

## Observações de Execução

### Endpoint real descoberto em execução
Os cenários referenciam `/v3/templates` mas o endpoint real é `/v3/accounts/{accountUuid}/templates`. A descoberta foi feita capturando as requisições de rede ao navegar para um chat em `CHAT_IN_PROGRESS`. Os testes de API foram adaptados automaticamente com o endpoint correto.

### PR usa per_page=200 (não per_page=999)
O PR #1500 implementou `per_page=200` (não `per_page=999` como esperado nos cenários). Com `per_page=200`, contas com 201–999 templates com atalho precisarão de múltiplas páginas para carregamento completo. O critério de aceite do card "Conta com menos de 999 templates → todos carregam em 1 request" não é mais verdadeiro para contas com 201–999 shortcuts. Recomendado: alinhar com dev sobre o valor escolhido e atualizar o critério de aceite.

### Chat de teste em CHAT_CLOSED
O contato de teste (uuid: 9bb49c4f) estava em estado `CHAT_CLOSED` durante toda a execução, impedindo os testes de UI que requerem chat em attending (CT-TMPL-003, CT-TMPL-008).

---

## Resultados por Cenário

### CT-TMPL-001 — GET templates com per_page=999 aceito
**Criticidade:** 🔴 Alta | **Prioridade:** 🔁 Regressão | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | GET /v3/accounts/{acct}/templates?per_page=999&keyboard_shortcut=NOT_EMPTY | ✅ | PowerShell direto |

**Resultado Obtido:** HTTP 200 \| `meta.per_page=999` \| `meta.total=6` \| `meta.last_page=1` \| `data.length=6`
**Resultado Esperado:** HTTP 200 com `data: [...]` e `meta.per_page: 999`
**Divergência:** Nenhuma.

---

### CT-TMPL-002 — SPA não envia per_page=9999 na tela de chat
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 Foco Primário | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | Login na SPA de staging como operador | ✅ | preflight_login.png |
| 2 | Navegar para chat em CHAT_IN_PROGRESS | ✅ | CT-TMPL-002_passo3_ok.png |
| 3 | Capturar requests de templates na aba Network | ✅ | CT-TMPL-002_passo3_ok.png |

**Resultado Obtido:** Request capturada: `GET /v3/accounts/.../templates?...&per_page=200&...&keyboard_shortcut=NOT_EMPTY` — **per_page=200**, não 9999.
**Resultado Esperado:** Nenhuma request ao endpoint `/templates` contém `per_page=9999`. A request usa `per_page ≤ 999`.
**Divergência:** Nenhuma. ✅ Fix confirmado.
**🔀 Nota:** `per_page` no fix é `200` (não `999`). Confirmado via network request #73.

---

### CT-TMPL-003 — Atalho de teclado insere template na conversa
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 Foco Primário | **Status:** ⏭️ BLOQUEADO

**Motivo:** Chat do contato de teste (uuid: 9bb49c4f) em estado `CHAT_CLOSED` — ausência de área de input. Não há botão "Iniciar atendimento" disponível na UI. Envio de mensagem em contatos reais da fila proibido pelas regras do executor.

**Causa raiz:** `test-data`
**Ação recomendada:** Colocar o contato de teste em atendimento ativo manualmente e reexecutar.

---

### CT-TMPL-004 — Regressão: backend rejeita per_page=9999 com 422
**Criticidade:** 🟡 Média | **Prioridade:** 🔁 Regressão | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | GET /v3/accounts/{acct}/templates?per_page=9999 | ✅ | PowerShell direto |

**Resultado Obtido:** HTTP 422 \| `message: "O campo per_page não pode exceder 999."` \| `errors.per_page: ["O campo per_page não pode exceder 999."]`
**Resultado Esperado:** HTTP 422 com body exato.
**Divergência:** Nenhuma. Contrato do backend preservado.

---

### CT-TMPL-005 — Falha na API de templates não quebra a UI
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 Foco Primário | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | Configurar page.route() para retornar 500 na URL de templates com atalho | ✅ | — |
| 2 | Navegar para chat em CHAT_IN_PROGRESS | ✅ | CT-TMPL-005_passo4_ok.png |
| 3 | Verificar console e interface | ✅ | CT-TMPL-005_passo4_ok.png |

**Resultado Obtido:** Tela carregou corretamente (`title="Poli | Yuri Alcantara 3"`). `body_visible=true`. `chat_input_area=true`. 4 erros de console registrados (erros da query com retry — comportamento esperado). Sem crash, sem tela em branco, sem mensagem de erro visível ao usuário.
**Resultado Esperado:** Tela de chats carrega sem crash. Console exibe erro logado. Atalhos ficam indisponíveis, mas sem quebra da UI.
**Divergência:** Nenhuma.
**🔀 page.route() aplicado:** `force-error` | motivo: simular falha da API de templates com atalho

---

### CT-TMPL-006 — Templates sem atalho ausentes no filtro
**Criticidade:** 🟡 Média | **Prioridade:** 📋 Padrão | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | GET /v3/accounts/{acct}/templates?keyboard_shortcut=NOT_EMPTY&per_page=999 | ✅ | PowerShell direto |
| 2 | Verificar keyboard_shortcut de cada item retornado | ✅ | PowerShell direto |

**Resultado Obtido:** 6 templates retornados. `sem_atalho=0`. Todos os items têm `keyboard_shortcut` preenchido.
**Resultado Esperado:** Nenhum item em `data` possui `keyboard_shortcut` nulo ou vazio.
**Divergência:** Nenhuma.

---

### CT-TMPL-007 — Ao menos 999 templates com atalho carregam em 1 request
**Criticidade:** 🟡 Média | **Prioridade:** 🎯 Foco Primário | **Status:** ⏭️ BLOQUEADO

**Motivo:** Conta possui apenas 6 templates com `keyboard_shortcut` configurado. Pré-requisito exige ≥999 templates com atalho.

**Causa raiz:** `test-data`
**Ação recomendada:** Criar templates via API (`POST /v3/accounts/{acct}/templates`) até atingir 999 e reexecutar.

**⚠️ Nota adicional:** O PR usa `per_page=200`. Com esse valor, o critério de aceite "menos de 999 templates carregam em 1 request" só é verdadeiro para contas com ≤200 templates. Recomendado alinhar o critério de aceite com o time de dev.

---

### CT-TMPL-008 — 1000+ templates com atalho carregam via paginação
**Criticidade:** 🟡 Média | **Prioridade:** 🎯 Foco Primário | **Status:** ⏭️ BLOQUEADO

**Motivo:** Conta possui apenas 6 templates com `keyboard_shortcut`. Pré-requisito exige ≥1000 templates com atalho.

**Causa raiz:** `test-data`
**Depende de:** CT-TMPL-002 ✅ (passou)

---

### CT-TMPL-009 — Request sem autenticação retorna 401
**Criticidade:** 🟡 Média | **Prioridade:** 📋 Padrão | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | GET /v3/accounts/{acct}/templates?keyboard_shortcut=NOT_EMPTY&per_page=999 sem Authorization | ✅ | PowerShell direto |

**Resultado Obtido:** HTTP 401 Unauthorized.
**Resultado Esperado:** HTTP 401 Unauthorized.
**Divergência:** Nenhuma.

---

## Bloqueios e Observações

- **CT-TMPL-003, CT-TMPL-007, CT-TMPL-008:** Bloqueados por `test-data`. Requerem: (1) contato de teste em CHAT_IN_PROGRESS e (2) ≥999 templates com keyboard_shortcut na conta de teste.
- **Endpoint real:** `/v3/accounts/{accountUuid}/templates` (não `/v3/templates`). Cenários devem ser atualizados.
- **per_page=200 vs per_page=999:** Alinhar com dev o valor final e atualizar critério de aceite do card.

---

## Bugs Encontrados

Nenhum bug encontrado nos cenários executados.
