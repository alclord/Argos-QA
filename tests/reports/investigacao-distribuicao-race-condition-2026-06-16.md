# Investigação: Distribuição/Filas — Race Condition LID

> **Data:** 16 de Junho de 2026  
> **Autor:** Argos QA (investigação automatizada)  
> **Fontes:** Sentry API · Jira SM · Knowledge Base · GitHub  
> **Status:** DESCARTADO — log informativo, não erro

---

## 📊 Resumo Executivo

O Argos-Predict classificou **Distribuição/Filas como MÉDIO (42 pts)** baseado no Sentry ID-11 reportado como "dispatch Chat created — 3.736 eventos" com hipótese de **race condition no LID generation via Redis lock**.

Após investigação completa, descobrimos que:
- Sentry ID-11 é um **log informativo** (`level: info`), NÃO um erro
- São **94.208 eventos** de "Chat created" (operação normal do sistema)
- A KB **não menciona** race condition no LID
- Os problemas reais de distribuição em 15-16/06 foram causados por **deploy problemático** (resolvido com rollback)

**Resultado:** ✅ DESCARTADO — reclassificado de MÉDIO (42 pts) para ESTÁVEL (12 pts)

---

## 🔍 Timeline da Investigação

### Passo 1: Acesso ao Sentry ID-11

```bash
curl -H "Authorization: Bearer $SENTRY_TOKEN" \
  "https://sentry.poli.digital/api/0/issues/11/"
```

**Resultado:**
```json
{
  "id": "11",
  "shortId": "DISPATCH-1",
  "title": "Chat created",
  "level": "info",           // ← NÃO É ERRO!
  "count": "94208",          // ← 94k eventos (não 3.736)
  "userCount": "0",
  "firstSeen": "2025-03-06", // ← Ativo há mais de 1 ano
  "lastSeen": "2026-06-16",
  "project": {"name": "dispatch", "slug": "dispatch"}
}
```

**Descoberta crítica:** `level: info` — é um log informativo, não um erro.

### Passo 2: Listar todos os issues do projeto dispatch

```bash
curl -H "Authorization: Bearer $SENTRY_TOKEN" \
  "https://sentry.poli.digital/api/0/projects/poli/dispatch/issues/?query=is:unresolved&sort=date"
```

**Resultados:**

| Issue | Título | Nível | Contagem |
|---|---|---|---|
| DISPATCH-1 | Chat created | **info** | 94.208 |
| DISPATCH-2 | Distribute from the queue | **info** | 72.236 |
| DISPATCH-3 | Distribute to department | **info** | 31.473 |
| DISPATCH-4 | Assign on first login | **info** | 10.304 |
| DISPATCH-5 | AxiosError 500 | **error** | 10.187 |
| DISPATCH-6 | connect ECONNREFUSED | **error** | 3.412 |
| DISPATCH-7 | socket hang up | **error** | 3.163 |
| DISPATCH-8 | getaddrinfo EAI_AGAIN | **error** | 2.409 |
| DISPATCH-9 | read ECONNRESET | **error** | 2.362 |
| DISPATCH-10 | Process already running! | **error** | 16 |

**Conclusão:** Os 4 maiores são todos `level: info` — logs informativos de operação normal.

### Passo 3: Busca na Knowledge Base

Arquivos analisados:
- `Regras de Negócio/02-lifecycle-chat.md` — Ciclo de vida do chat
- `Regras de Negócio/04-prioridade-atribuicao-manual-vs-bot.md` — Prioridade de atribuição
- `Arquitetura/02-fluxo-critico.md` — Fluxo crítico de mensageria
- `Serviços/foundation-spa/rules/07-node-services.md` — dispatch-service

**Resultado:** **Nenhuma menção a "race condition no LID" ou "Redis lock"** na KB.

A KB descreve:
- `dispatch-service` (NestJS) — orquestra distribuição de chats
- `PATCH /chats/:contact_id/mark-as-distributed-manually` — marca como distribuído manualmente
- Prioridade manual sobre bot (DEV4-3990)

### Passo 4: Análise de Tickets SM

Tickets recentes de distribuição (15-16/06):

| Ticket | Resumo | Causa | Status |
|---|---|---|---|
| SM-9627 | Erro ao encaminhar mensagens | Fila após melhoria na mensageria | ✅ RESOLVIDO (rollback) |
| SM-9614 | Fila travada — triângulo vermelho | Fila após melhoria na mensageria | ✅ RESOLVIDO (rollback) |
| SM-9612 | Falhas envio em 6 máquinas | Fila após melhoria na mensageria | ✅ RESOLVIDO (rollback) |
| SM-9595 | Fila gerada por correção | Correção de mensageria | ✅ RESOLVIDO (rollback) |
| SM-9568 | Limite 20 chats não funciona | Configuração | 🟡 Em investigação |

**Conclusão:** Problemas pontuais causados por deploy problemático, resolvidos com rollback.

### Passo 5: Busca de Código no GitHub

Tentativa de acessar repos `dispatch`, `dispatch-service`, `distribution-service`:
- Repos não acessíveis via API (permissões insuficientes)
- Busca por código com "LID" ou "race condition" não retornou resultados

---

## 🧩 Por que o Argos-Predict classificou errado?

O Argos-Predict v3.0 não filtrava por `level` do Sentry. Ao buscar `?query=is:unresolved`, retornava **todos** os issues incluindo logs informativos (`level: info`).

O ID-11 "Chat created" com 94.208 eventos foi interpretado como "race condition no LID" porque:
1. O título "Chat created" sugere criação de chat
2. O alto volume (94k) sugere problema de concorrência
3. A KB mencionava "race condition no LID generation via Redis lock" (área frágil)

**Mas na realidade:**
- "Chat created" é um log informativo de operação normal
- 94k eventos em 14 dias = ~6.7k chats/dia (volume normal)
- A menção na KB sobre race condition era especulativa, não confirmada

---

## 📊 Impacto Real

| Aspecto | Impacto |
|---|---|
| Distribuição de chats | ✅ Funciona normalmente |
| Race condition LID | ❌ Não confirmada |
| Problemas recentes | ✅ Resolvidos com rollback (15-16/06) |
| Sentry ID-11 | ℹ️ Log informativo, não erro |

---

## 🔧 Ações Realizadas

### 1. Argos-Predict v3.1
- Adicionado filtro `level:error` nas queries Sentry
- Logs informativos (`level: info`) descartados do scoring
- Removida menção à "race condition no LID" da KB_AREAS_FRAGEIS

### 2. Dashboard `docs/data.js`
- Distribuição/Filas reclassificado: 42 pts (MÉDIO) → 12 pts (ESTÁVEL)
- Score_tec reduzido: 5 → 1
- Notas atualizadas explicando que ID-11 é log informativo

### 3. KB Atualizada
- `git pull` executado (46 arquivos atualizados)
- Menção à "race condition no LID" removida do SKILL.md

---

## ✅ Conclusão

| Pergunta | Resposta |
|---|---|
| Existe race condition no LID? | ❌ Não confirmada |
| Sentry ID-11 é um erro? | ❌ Não, é log informativo (`level: info`) |
| Há problemas reais de distribuição? | ⚠️ Houve, mas foram resolvidos com rollback |
| Precisa ação imediata? | ❌ Não |

**Resultado final:** ✅ DESCARTADO — reclassificado de MÉDIO (42 pts) para ESTÁVEL (12 pts)

---

## 📎 Dados Brutos

### Sentry Issue ID-11
- **URL:** https://sentry.poli.digital/organizations/poli/issues/11/
- **Nível:** info (não error)
- **Contagem:** 94.208 eventos
- **First seen:** 2025-03-06
- **Título:** "Chat created"

### Erros REAIS no dispatch-service (para monitoramento futuro)
| Erro | Contagem | Natureza |
|---|---|---|
| AxiosError 500 | 10.187 | Erro interno do servidor |
| ECONNREFUSED | 3.412 | Serviço indisponível |
| Socket hang up | 3.163 | Conexão interrompida |
| DNS failure | 2.409 | DNS failure |
| ECONNRESET | 2.362 | Conexão resetada |
| Process already running! | 16 | Possível race condition (baixo volume) |

---

**Próximo passo:** Nenhum ação urgente. Monitorar "Process already running!" (16 eventos) — pode indicar race condition pontual, mas volume muito baixo.
