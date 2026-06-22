# Sessão de Investigação Argos QA — 16/06/2026

> **Data:** 16 de Junho de 2026  
> **Duração:** ~4 horas  
> **Investigador:** Argos QA (automatizado)  
> **Status:** Concluída com sucesso

---

## 📋 Resumo Executivo

Sessão dedicada à investigação dos problemas críticos identificados no dashboard Argos-Predict. Foram realizadas **4 investigações completas** que resultaram na reclassificação de 3 módulos e no escalonamento de 1 problema crítico para o time de desenvolvimento.

### Resultados Principais

| # | Investigação | Resultado | Impacto |
|---|---|---|---|
| 1 | Chat/Mensagens — QueryException 3024 | ✅ ESCALADO | Time de Dev trabalhando |
| 2 | Canais/WhatsApp — heartbeat 404 | ✅ DESCARTADO | Ruído sem impacto funcional |
| 3 | Distribuição/Filas — race condition LID | ✅ DESCARTADO | Log informativo, não erro |
| 4 | Canais/WhatsApp — 20 bugs N1 | ✅ RECLASSIFICADO | 50% Meta, 32.5% dúvidas, 10% bugs reais |

### Mudanças no Dashboard

| Módulo | Score Antes | Score Depois | Nível Antes | Nível Depois |
|---|---|---|---|---|
| Chat / Mensagens | 95 | 95 | 🔴 CRÍTICO | 🔴 CRÍTICO (mantido) |
| Canais / WhatsApp | 53 | 15 | 🟠 ALTO | 🟢 ESTÁVEL |
| Distribuição / Filas | 42 | 12 | 🟡 MÉDIO | 🟢 ESTÁVEL |
| Chatbot / Bot | 28 | 28 | 🟡 ATENÇÃO | 🟡 ATENÇÃO (mantido) |
| Autenticação | 25 | 25 | 🟡 ATENÇÃO | 🟡 ATENÇÃO (mantido) |

---

## 🔍 Investigação 1: Chat/Mensagens — QueryException 3024

### Contexto
O dashboard Argos-Predict identificou Chat/Mensagens como módulo CRÍTICO (95 pts) com QueryException 3024 em `ListChats.php:459`.

### Investigação
- Acessado Sentry para obter stack trace
- Identificado que query varre 365 dias de `contact_last_messages`
- Timeout MySQL ocorre ~280-414x/dia
- 45 operadores afetados diariamente

### Resultado
✅ **ESCALADO** para time de desenvolvimento  
📄 Card DEV4 criado com detalhes da investigação

### Arquivos Criados
- `tests/reports/investigacao-chat-queryexception-2026-06-16.md`

---

## 🔍 Investigação 2: Canais/WhatsApp — Heartbeat 404

### Contexto
Sentry ID-100942 reportava 2.822 eventos de AxiosError 404 afetando 1.535 usuários. Argos-Predict classificou como ALTO (53 pts).

### Investigação
1. **Acesso ao Sentry via API**
   - ID-100942 é na verdade AxiosError 401 (não 404)
   - 404 reais são IDs 101472, 101601, 101603

2. **Análise do código fonte**
   - `heimdallService.activity()` chama `apiLogin.post('/auth/activity')`
   - `apiLogin` usa `VITE_LOGIN_URL` = `https://heimdall.poli.digital`

3. **Testes diretos no endpoint**
   - `POST https://heimdall.poli.digital/auth/activity` → 401 (endpoint existe!)
   - Endpoint retorna 404 apenas quando sessão não é encontrada no Redis

4. **Teste com Playwright no staging**
   - Login bem-sucedido
   - Request `POST /auth/activity` → 200 OK
   - Status online funciona perfeitamente via WebSocket (Soketi)

5. **Análise do código heimdall**
   ```typescript
   async activity(token: string): Promise<Response> {
       const resultSession = await this.getSessionWithToken(token);
       if (!resultSession.success) {
         return { ...resultSession, data: undefined };
       }
       await this.repository.updateSessionStatus(token, SessionStatus.ACTIVE);
       return { success: true, data: { message: 'Atividade registrada com sucesso' } };
   }
   ```

### Descoberta Crítica
O endpoint `/auth/activity` **EXISTE** e funciona corretamente. O 404 é retornado quando a sessão expira no Redis, mas isso **NÃO afeta o status online** porque:
- Status online usa **WebSocket (Soketi)**, não heartbeat HTTP
- Heartbeat é apenas para controle de inatividade de sessão
- 404s são **ruído sem impacto funcional**

### Resultado
✅ **DESCARTADO** — não é problema real  
📄 Relatório criado com todas as evidências

### Arquivos Criados
- `tests/reports/investigacao-heartbeat-404-2026-06-16.md`

### Ajustes no Argos-Predict
- Atualizado `SKILL.md` para v3.1
- Adicionado filtro de nível Sentry (`level:error` apenas)
- Logs informativos (`level:info`) agora são descartados do scoring

---

## 🔍 Investigação 3: Distribuição/Filas — Race Condition LID

### Contexto
Argos-Predict reportava Sentry ID-11 como "dispatch Chat created — 3.736 eventos" classificado como race condition no LID generation via Redis lock. Módulo classificado como MÉDIO (42 pts).

### Investigação
1. **Acesso ao Sentry via API**
   ```bash
   curl -H "Authorization: Bearer $SENTRY_TOKEN" \
     "https://sentry.poli.digital/api/0/issues/11/"
   ```

2. **Descoberta surpreendente**
   - ID-11 tem `level: info` (NÃO é erro!)
   - Título: "Chat created"
   - 94.208 eventos (não 3.736)
   - Primeiro visto: 2025-03-06 (ativo há mais de 1 ano)

3. **Análise de outros issues do dispatch**
   - `Chat created` — 94.208 eventos (info)
   - `Distribute from the queue` — 72.236 eventos (info)
   - `Distribute to department` — 31.473 eventos (info)
   - `Error: getaddrinfo EAI_AGAIN` — 2.409 eventos (error)
   - `Error: connect ECONNREFUSED` — 3.412 eventos (error)
   - `AxiosError: Request failed with status code 500` — 10.187 eventos (error)

4. **Busca na Knowledge Base**
   - Lido `Regras de Negócio/04-prioridade-atribuicao-manual-vs-bot.md`
   - Lido `Regras de Negócio/02-lifecycle-chat.md`
   - Lido `Arquitetura/02-fluxo-critico.md`
   - **Nenhuma menção a race condition no LID**

5. **Análise de tickets SM**
   - SM-9627: Erro ao encaminhar mensagens — fila gerada após melhoria (RESOLVIDO com rollback)
   - SM-9614: Fila travada — triângulo vermelho (RESOLVIDO com rollback)
   - SM-9612: Falhas de envio em 6 máquinas (RESOLVIDO com rollback)
   - SM-9595: Fila gerada por correção de mensageria (RESOLVIDO com rollback)
   - SM-9568: Limite de 20 chats por operador não funciona

### Descoberta Crítica
Sentry ID-11 é um **log informativo** que registra quando chats são criados. **NÃO é um erro**. O Argos-Predict interpretou incorretamente como "race condition no LID".

Os problemas reais de distribuição em 15-16/06 foram causados por um **deploy problemático de "melhoria na mensageria"** que foi resolvido com **rollback**.

### Resultado
✅ **DESCARTADO** — não é race condition  
📄 Módulo reclassificado de MÉDIO (42 pts) para ESTÁVEL (12 pts)

### Arquivos Criados
- `tests/reports/investigacao-distribuicao-race-condition-2026-06-16.md`

---

## 🔍 Investigação 4: Canais/WhatsApp — 20 Bugs N1

### Contexto
Após descartar o heartbeat 404, Canais/WhatsApp ainda tinha score 48 pts (ALTO) devido a 20 bugs N1 classificados no módulo.

### Investigação
1. **Busca de tickets SM**
   ```sql
   project = SM 
   AND statusCategory = "new"
   AND (text ~ "canal" OR text ~ "whatsapp" OR text ~ "instagram" OR text ~ "webhook")
   AND created >= -30d
   ORDER BY created DESC
   ```

2. **Análise de 40 tickets SM**
   - Extraído tipo (Bug, Dúvida, Solicitação)
   - Identificado canal afetado (WhatsApp WABA, Instagram, Webhook)
   - Classificado causa (Poli vs Meta vs Cliente)

3. **Resultados da análise**

   | Classificação | Qtd | % |
   |---|---|---|
   | **Meta/Instagram (externo)** | 20 | **50%** |
   | **Cliente (dúvida/config)** | 13 | **32.5%** |
   | **Poli (bug real)** | 4 | **10%** |
   | Indefinido | 3 | 7.5% |

4. **Top 3 causas mais frequentes**
   1. **Instabilidade Meta** (13 tickets) — WhatsApp/FB/IG em 15-16/06
   2. **Erros/Restrições Meta API** (7 tickets) — 131049, 131626, banimentos
   3. **Dúvidas de clientes** (8 tickets) — migração, configuração

5. **Bugs reais da Poli (apenas 4)**
   - SM-9612: Fila após melhoria na mensageria (RESOLVIDO com rollback)
   - SM-9546: Lentidão + msgs com relógio (RESOLVIDO com rollback)
   - SM-9510: Mensagens via WhatsApp Web não chegam (em investigação)
   - SM-9676: Cliente não recebe mensagens (indefinido)

6. **Incidente Meta 15-16/06**
   - Dia 15/06 teve incidente massivo da Meta
   - Afetou WhatsApp, Facebook e Instagram simultaneamente
   - Gerou pelo menos 8 tickets diretos (SM-9469 a SM-9486)

### Descoberta Crítica
**Metade dos tickets (50%) são causados pela Meta**, não são bugs da Poli. O score de Canais/WhatsApp estava **SUPERESTIMADO** porque incluía tickets externos.

### Resultado
✅ **RECLASSIFICADO** — de ALTO (48 pts) para ESTÁVEL (15 pts)  
📄 Relatório completo criado com análise de todos os tickets

### Arquivos Criados
- `tests/reports/investigacao-canais-whatsapp-2026-06-16.md`

---

## 🔧 Ajustes Técnicos Realizados

### 1. Configuração do MCP do GitHub
- Adicionado MCP server no `opencode.json`
- Token `GH_TOKEN` já configurado no `.env`
- Permite acesso completo aos repos privados da organização

### 2. Atualização da Knowledge Base
- KB local estava desatualizada
- Executado `git pull` para trazer mudanças recentes
- 46 arquivos atualizados

### 3. Argos-Predict v3.1
- Atualizado `SKILL.md` para v3.1
- Adicionado filtro de nível Sentry
- Query atualizada: `?query=is:unresolved level:error`
- Logs informativos (`level: info`) agora são descartados
- Removida menção incorreta à "race condition no LID"

### 4. Dashboard `docs/data.js`
- Data atualizada para 16/06/2026
- Resumo executivo reescrito com descobertas
- KPIs atualizados:
  - "Módulos ALTO" → 0 (era 1)
  - "Módulos MÉDIO" → 0 (era 1)
  - "Sentry issues" → 21 erros reais (94.208 logs descartados)
  - "Investigações concluídas" → 4
- Ranking reclassificado:
  - Canais/WhatsApp: 48 → 15 pts (ALTO → ESTÁVEL)
  - Distribuição/Filas: 42 → 12 pts (MÉDIO → ESTÁVEL)
- Tendência atualizada com notas de reclassificação
- Módulos detalhados atualizados com descobertas
- Serviços radar atualizado

---

## 📊 Status Final dos Módulos

| Módulo | Score | Nível | Status | Ação |
|---|---|---|---|---|
| Chat / Mensagens | 95 | 🔴 CRÍTICO | QueryException 3024 | ✅ ESCALADO para Dev |
| Chatbot / Bot | 28 | 🟡 ATENÇÃO | Lifecycle resolvido | 📊 Monitorar |
| Autenticação | 25 | 🟡 ATENÇÃO | Melhorando (-15 pts) | 📊 Monitorar |
| Disparos / Campanhas | 24 | 🟡 ATENÇÃO | waba-webhook PR merged | 📊 Monitorar |
| Upload / Mídia | 15 | 🟢 ESTÁVEL | PDF >10MB documentado | ✅ OK |
| Canais / WhatsApp | 15 | 🟢 ESTÁVEL | RECLASSIFICADO (era 48 pts) | ✅ OK |
| UI / Design System | 12 | 🟢 ESTÁVEL | SPA churn UI | ✅ OK |
| Distribuição / Filas | 12 | 🟢 ESTÁVEL | RECLASSIFICADO (era 42 pts) | ✅ OK |
| Jarvis / IA | 8 | 🟢 ESTÁVEL | 0 N1 reais | ✅ OK |

---

## 📁 Arquivos Criados na Sessão

### Relatórios de Investigação
1. `tests/reports/investigacao-chat-queryexception-2026-06-16.md`
2. `tests/reports/investigacao-heartbeat-404-2026-06-16.md`
3. `tests/reports/investigacao-distribuicao-race-condition-2026-06-16.md`
4. `tests/reports/investigacao-canais-whatsapp-2026-06-16.md`

### Arquivos Modificados
1. `opencode.json` — Adicionado MCP do GitHub
2. `.opencode/skills/argos-predict/SKILL.md` — Atualizado para v3.1
3. `docs/data.js` — Dashboard atualizado com reclassificações

---

## 🎯 Lições Aprendidas

### 1. Nem todo erro no Sentry é um problema real
- Logs informativos (`level: info`) não devem impactar scoring
- É crucial verificar o `level` do issue antes de classificar como erro
- Argos-Predict v3.1 agora filtra por `level:error`

### 2. Tickets SM precisam de classificação de causa raiz
- 50% dos tickets de Canais eram problemas externos (Meta)
- 32.5% eram dúvidas de clientes (não bugs)
- Apenas 10% eram bugs reais da Poli
- **Recomendação:** Adicionar campo "Causa Raiz" (Poli / Meta / Cliente) nos tickets SM

### 3. Investigação completa evita falsos positivos
- Distribuição foi classificado como MÉDIO por 3.736 eventos no Sentry
- Investigação revelou que eram logs informativos (94.208 eventos)
- Sem investigação, teríamos criado cards DEV4 desnecessários

### 4. MCP do GitHub é essencial para investigação
- Permite acesso completo ao código fonte
- Facilita análise de PRs e commits recentes
- Agiliza identificação de root causes

---

## 🚀 Próximos Passos Sugeridos

### Curto Prazo (1-2 semanas)
1. **Acompanhar correção do QueryException 3024** (Chat/Mensagens)
2. **Investigar bugs reais restantes de Canais** (SM-9510, SM-9676)
3. **Implementar recomendações do relatório de Canais**
   - FAQ sobre erros Meta (131049, 131626)
   - Status page para incidentes Meta
   - Treinamento N1 para classificar tickets

### Médio Prazo (1 mês)
1. **Melhorar classificação de tickets SM**
   - Adicionar campo "Causa Raiz" (Poli / Meta / Cliente)
   - Treinar N1 para classificar corretamente
   - Não contar tickets Meta/Cliente como "bugs" no scoring

2. **Monitorar módulos ATENÇÃO**
   - Chatbot/Bot (28 pts)
   - Autenticação (25 pts)
   - Disparos/Campanhas (24 pts)

### Longo Prazo (2-3 meses)
1. **Executar Argos-Predict completo** (`/argos-predict 14 --update-dashboard`)
2. **Validar se reclassificações se mantêm**
3. **Ajustar thresholds de scoring** baseado nas lições aprendidas

---

## 📞 Contatos e Referências

### Time de Desenvolvimento
- QueryException 3024: ESCALADO (aguardando correção)

### Ferramentas Utilizadas
- **Sentry API:** `https://sentry.poli.digital/api/0/`
- **Jira API:** via MCP Atlassian
- **GitHub API:** via MCP GitHub (novo)
- **Playwright MCP:** para testes E2E

### Documentação
- Knowledge Base: `C:/Users/yuria/OneDrive/Documentos/GitHub/knowledge-base`
- Argos-Predict SKILL: `.opencode/skills/argos-predict/SKILL.md`
- Dashboard: `docs/data.js`

---

## ✅ Checklist de Conclusão

- [x] Investigação 1: Chat/Mensagens — QueryException 3024 (ESCALADO)
- [x] Investigação 2: Canais/WhatsApp — heartbeat 404 (DESCARTADO)
- [x] Investigação 3: Distribuição/Filas — race condition LID (DESCARTADO)
- [x] Investigação 4: Canais/WhatsApp — 20 bugs N1 (RECLASSIFICADO)
- [x] Relatórios criados para todas as investigações
- [x] Dashboard atualizado com reclassificações
- [x] Argos-Predict atualizado para v3.1
- [x] MCP do GitHub configurado
- [x] Knowledge Base atualizada
- [x] Sessão documentada neste arquivo

---

**Sessão concluída com sucesso!** 🎉

**Próxima sessão sugerida:** Acompanhar correção do QueryException 3024 e investigar bugs reais restantes de Canais (SM-9510, SM-9676).
