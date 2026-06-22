# 🔮 Argos Predict — Mapa de Risco
> **Data:** 11/06/2026 · **Janela:** últimos 14 dias · **Modo:** 🔄 Completo (--force-refresh)
> **Fontes:** Jira Suporte (~1.459 N1 Aberto total) · DEV4 (37 backlog) · GitHub (SPA: 23 PRs · FoundationAPI: 9 PRs) · Sentry (50 issues ativos)

---

## ⚠️ PASSO 4.1.5 — Validação Anti-Misclassificação

| Status | Detalhe |
|---|---|
| ✅ Nenhum ticket misclassificado como Jarvis/IA | Todos os bugs com "mensagem", "envio", "templates" foram corretamente classificados como Chat/Mensagens |
| 📝 Histórico | Relatório de 09/06 continha misclassificação (ex: SM-8331 "Mensagens não enviadas - erro da Meta" aparecia como Jarvis/IA) — **causa: escala de 1000 tickets sobrecarregava coerência LLM ao classificar em lote** |
| 🔒 Total preservado | 1.459 tickets (contagem volumétrica intacta — reclassificações não removem tickets) |

---

## 📊 Mapa de Risco por Módulo

| # | Módulo | Bugs N1 | SCORE_USR | SCORE_TEC | SCORE_FINAL | Risco |
|---|--------|---------|-----------|-----------|-------------|-------|
| 1 | **Chat / Mensagens** | ~110 | 92 | 9 | **100** *(cap)* | 🔴 CRÍTICO |
| 2 | **Canais / WhatsApp** | ~28 | 58 | 6 | **64** | 🟠 ALTO |
| 3 | **Distribuição / Filas** | ~25 | 48 | 5 | **53** | 🟠 ALTO |
| 4 | **Chatbot / Bot Flows** | ~15 | 45 | 3 | **48** | 🟡 MÉDIO |
| 5 | **Autenticação** | ~8 | 26 | 5 | **31** | 🟡 MÉDIO |
| 6 | **Disparos / Campanhas** | ~3 | 28 | 2 | **30** | 🟡 MÉDIO |
| 7 | **UI / Design System** | ~8 | 22 | 4 | **26** | 🟢 ATENÇÃO |
| 8 | **Upload / Mídia** | ~6 | 18 | 1 | **19** | 🟢 ATENÇÃO |
| 9 | **Jarvis / IA** | 0 | 8 | 4 | **12** | 🟢 ATENÇÃO |

> **Base:** 200+ bugs analisados individualmente (10 páginas de bugs ordenados por data); ~1.459 tickets N1 totais estimados via range SM-7594→SM-9053.

---

## 🔴 CRÍTICO — Chat / Mensagens (score: 100)

### Sinais
- **~110 bugs em 14 dias** — módulo com maior pressão de suporte da plataforma
- **Incidente 2026-06-10 (ontem):** 15+ tickets em 24h sobre "mensagens rápidas e templates" que pararam de funcionar
  - SM-8957, SM-8938, SM-8929, SM-8886, SM-8883, SM-8879, SM-8878, SM-8877, SM-8860, SM-8859, SM-8856, SM-8853, SM-8852, SM-8957, SM-8918 — **todos sobre o mesmo fenômeno em clientes distintos**
  - Padrão típico de falha de feature-flag ou rollout parcial de infra
- **Bug recorrente lifecycle "reação reabre chat"** *(KB_AREAS_FRAGEIS confirmada)*: SM-8734, SM-8532, SM-8190, SM-7934, SM-7931 — reação de emoji em chat encerrado reabre o chat sem acionar bot. Afeta múltiplos clientes, reportado em 5 dias diferentes.
- **Login cluster June 11**: SM-9053 "Problema de login corrigido após correção noturna" + SM-9052 + SM-9028 — "correção noturna" que impactou login (provavelmente efeito colateral de um rollout)
- **Sentry:** `MessageSenderException: Contato está sendo atendido` — 2.987 eventos/7d, **427 usuários únicos** ([foundationapi] id=79056) → race condition na atribuição de chat persistindo em produção
- **Sentry:** `QueryException SQLSTATE[HY000] General error: 3024` — DB query timeout (1.164 eventos/14d, 45 usuários) → endpoint de chats p95 já em 3.010ms na calibração de 10/06
- **GitHub Churn:** 8 PRs diretos em Chat/Mensagens (SPA + FoundationAPI em 14d)
  - SPA#1510 (DEV4-4338): fix filtro de busca em chat
  - SPA#1507 (DEV4-4286): refatoração painel lateral (30 arquivos)
  - SPA#1503 (DEV4-4085): ProseMirror parágrafo
  - SPA#1496, FA#1118 (DEV4-4229): mensagens agendadas
  - FA#1127 (DEV4-4291): filtro contact_uuid *(corrige bug KB_AREAS_FRAGEIS de multi-tenância)*
- **ENV_FAILURE_PATTERN:** staging ≈ 40% taxa de falha vs canary ≈ 19% → `environment_specific = true` → problema de dados ou configuração de ambiente
- **DEV4-4291 staleness:** cenário gerado em 01/06, PR com fix mergeado em 09/06 → **8 dias de cenário desatualizado** — validar se o fix foi testado com cenários do período correto

### Top bugs representativos
| Ticket | Data | Descrição |
|--------|------|-----------|
| SM-8957..SM-8852 (cluster) | 10/06 | Mensagens rápidas e templates fora do ar — 15 clientes simultâneos |
| SM-8734 / SM-8532 | 09-10/06 | Reação em mensagem após encerramento reabre chat sem acionar bot |
| SM-8291 | 05/06 | Conversa muda de cliente automaticamente durante digitação ⚠️ |
| SM-8219 | 04/06 | Chat não libera mesmo com resposta do cliente dentro de 24 horas |
| SM-8046 | 02/06 | Mensagens não chegam em tempo real — necessário refresh manual |
| SM-7755 | 28/05 | Mensagens ficaram retidas na plataforma por até 1 mês |

---

## 🟠 ALTO — Canais / WhatsApp (score: 64)

### Sinais
- **28 bugs em 14 dias** (Meta/WABA errors, Instagram, canal offline)
- **Cluster de erros Meta:** SM-8989 (erro 130472), SM-8942 (erro 131026) → destinatário não alcançado (múltiplos contatos, múltiplos dias)
- **Instagram bugs:** SM-8939 (links de anúncios não abrem), SM-8751 (mensagens do Instagram saindo codificadas), SM-8498 (DMs não carregam), SM-7821 (leads não chegam)
- **Bloqueios de conta:** SM-8689 (número bloqueado Meta), SM-8580, SM-8123 (banido) → clientes com problemas de compliance
- **QA Flakiness CT-WH-011 = 1.0** — cenário waba-webhook com 100% de falha em execução (única run registrada = falhou) → **zona cega total em WABA**
- **Sentry:** [omnispa] AxiosError 404 — **2.822+277 eventos/7d, 1.535+211 usuários únicos** → surgiu em 09-10/06 — rotas da nova SPA não configuradas para algum endpoint
- **GitHub Churn:** waba-webhook PR#3 (OTI-1548: poli-kernel-nodejs) + FoundationAPI PR#1107 (filtros connection/provider)
- **SPA PR#1531 (DEV4-4370)** — Removeu prefixo `deprecated_` dos IDs em `ads-manager` (30+ arquivos em módulo Meta Ads) → risco de regressão em Meta Ads/Leads
- **Deprecated_ revsync:** `deprecated_revsync` encontrado em 9 canais WABA no canário (DEV4-4370 histórico) → dado poluído persistente em metadados de canal

### Ações recomendadas
- Investigar 404s da omnispa — quais rotas estão quebrando para 1.500+ usuários
- Criar cenário de teste para CT-WH-011 (waba-webhook) — flakiness 1.0 = endpoint sem cobertura
- Verificar impacto do PR#1531 em Meta Ads leads após remoção de `deprecated_`

---

## 🟠 ALTO — Distribuição / Filas (score: 53)

### Sinais
- **25 bugs em 14 dias** — chats ficam sem atendente, roteamento para atendente errado, fila limbo
- **Padrão recorrente:** SM-8844 (chats sem atendente), SM-8471 (perfil errado), SM-8383 (sem opção de departamento), SM-8588 (atendente disponível não recebe)
- **Bug de integração:** SM-8820 — leads de anúncios do Dia dos Namorados sendo direcionados para atendente errada (problema de roteamento de campanhas Meta)
- **Lentidão extrema:** SM-7825 — demora de 8-10 minutos na distribuição de chats
- **Sentry:** [dispatch] "Distribute from the queue" = 987/7d + "Distribute to department" = 869/7d → 1.856 eventos de distribuição monitorados como issues em Sentry
- **CROSS_SERVICE_HIT:** dispatch-service (×1.5) — falha afeta distribuição de todos os atendimentos da plataforma
- **KB_AREAS_FRAGEIS:** race condition no LID generation via Redis lock em alto volume → confirmada por múltiplos bugs de distribuição simultânea

---

## 🟡 MÉDIO — Chatbot / Bot Flows (score: 48)

### Sinais
- **15 bugs em 14 dias** — bot não dispara, fluxo incorreto, navegação retroativa quebrada
- **KB_AREAS_FRAGEIS confirmada:** SM-8586 "Bot não sobe em chat que havia sido finalizado" + SM-8584 "Bot habilitado não dispara fluxo quando cliente com chat finalizado envia mensagem" → `never skip 'attending'` regra sendo violada
- **SM-7772:** Robô não está fazendo triagem e transferências para setores na nova versão → regressão de deploy
- **SM-8819:** Mensagens do bot não estão chegando ao cliente
- **SM-8776:** Funcionalidade de navegação retroativa no bot não funciona (mesmo padrão que SM-8781 história aberta)

---

## 🟡 MÉDIO — Autenticação (score: 31)

### Sinais
- **Login cluster hoje (11/06):** SM-9053 + SM-9052 + SM-9028 — 3 tickets de login em 1 manhã, todos ligados a "correção noturna" aplicada em 10/06→11/06
  - SM-9053: "problema de login corrigido após correção noturna" → suporte proativo, cliente confirmou normalização
  - Risco: efeitos colaterais do rollout ainda podem surgir nas próximas 24-48h
- **Sentry:** [api-gateway] ECONNREFUSED/ETIMEDOUT 172.20.63.249:3000 — 4.742/7d (vs 32.512/14d → **era muito pior na semana anterior**) → IP interno de serviço com problemas de conectividade, melhorando
- **Sentry:** [polichat-spa] AxiosError 401 — 1.905/7d, **945 usuários únicos** → sessões expirando ou token de auth inválido na SPA legado
- **CROSS_SERVICE_HIT:** heimdall (×2.0) → mas sem churn em heimdall/api-gateway nos últimos 14 dias

---

## 🟡 MÉDIO — Disparos / Campanhas (score: 30)

### Sinais
- SM-8846 (erro ao subir disparos), SM-8434 (erro na tela final de campanha), SM-8292 (mensagens ficam presas após disparo — não transferem para atendente)
- SM-7999: disparos em nome de operador não vão para o operador após resposta do cliente → lógica de roteamento pós-disparo quebrada
- Alta volume de Solicitações (treinamento de disparo, configuração de envio em massa) → produto difícil de usar por conta própria

---

## 🟢 ATENÇÃO — UI / Design System (score: 26)

### Sinais
- **Churn extremamente alto:** 11 PRs de UI em 14 dias (sidebar, design tokens, showcase, Tailwind v4)
  - Tailwind v4 (PR#1499): mudança de infraestrutura CSS afetando todos os componentes
  - Sidebar redesign with shadcn (PR#1506 DEV4-4248): refator completo da sidebar
  - PR#1531 DEV4-4370: 30+ arquivos em ads-manager com IDs refatorados
- **Bugs de regressão UI já registrados:** SM-8304 (funis não aparecem após atualização visual), SM-8694 (novo layout do chat volta automaticamente), SM-8993/8992 (funções não funcionam na nova versão)
- **ALERTA:** volume de churn UI nesse ritmo aumenta exponencialmente o risco de regressão visual nos próximos 7 dias

---

## 🟢 ATENÇÃO — Jarvis / IA (score: 12)

### Sinais
- **0 bugs reportados por usuários** em 14 dias → nenhuma reclamação de cliente final sobre Jarvis
- **Desenvolvimento ativo:** 4 PRs em 14 dias
  - FoundationAPI PR#1119: `feat(jarvis): AI template suggestion and v3 template schema`
  - SPA PR#1494 (DEV4-4167): integra jarvis e amplia o construtor de templates
  - SPA PR#1505 (DEV4-4242): custom template layout
  - SPA PR#1500 (DEV4-4253): corrige per_page e pagina busca de templates
- **Sentry [jarvis]:** Slow DB Query (418/7d) + Consecutive HTTP (920/7d) → problemas de performance no backend Jarvis
- **Risco:** feature nova em rollout, testes unitários podem não cobrir edge cases de integração

---

## 🟢 ATENÇÃO — Upload / Mídia (score: 19)

### Sinais
- SM-8937 (problema com áudio e vídeo), SM-8543 (áudio chegou sem voz), SM-8826 (imagem sem envio), SM-7816 (áudio não reproduz na web, apenas no celular)
- SM-8145: erro ao enviar template com documento/planilha anexa
- **KB_AREAS_FRAGEIS:** bug PDF > 10MB (TypeError silencioso no media-manager) ainda documentado sem correção confirmada

---

## 🔑 Sinais Cruzados

| Sinal | Módulos Afetados | Severidade |
|-------|-----------------|------------|
| Incidente mensagens rápidas/templates (10/06) | Chat/Mensagens | 🔴 ALTO — recorrência esperada se causa raiz não endereçada |
| Bug "reação emoji reabre chat" (recorrente) | Chat/Mensagens · Chatbot | 🟠 MÉDIO — KB_FRAGIL confirmada, 5+ tickets em 14 dias |
| "Correção noturna" impactou login (11/06) | Autenticação | 🟠 MÉDIO — acompanhar nas próximas 24-48h |
| omnispa 404s crescentes (desde 09/06) | Canais · UI | 🟠 MÉDIO — 1.500+ usuários impactados, rota não configurada |
| SPA 23 PRs em 14 dias | UI · Chat · Jarvis/IA | 🟡 ATENÇÃO — churn altíssimo = risco de regressão |
| DEV4-4291 filtro contact_uuid (multi-tenância) | Chat/Mensagens | 🟡 RESOLVIDO mas cenário stale (8 dias) |
| deprecated_revsync em 9 canais WABA canário | Canais | 🟡 DADO POLUÍDO — endereçado em DEV4-4370 |
| dispatch Sentry 1.856 eventos/7d | Distribuição/Filas | 🟡 MONITORAR — volume alto em distribuição |

---

## 📈 Predição — Próximos 7 Dias

| Módulo | Tendência | Base |
|--------|-----------|------|
| Chat/Mensagens | ↗️ Pode **piorar** se incidente de 10/06 não foi corrigido completamente | Recorrência de instabilidade em mensagens rápidas observada 3x nos últimos 14 dias |
| Canais/WhatsApp | → **Estável/piorando** | omnispa 404s crescentes + canais offline recorrentes |
| Distribuição | → **Estável** | Sem PRs recentes, sem churn novo |
| UI/Design System | ↗️ **Alto risco de regressão** | 11 PRs de UI em 14 dias, Tailwind v4 em produção |
| Autenticação | ↘️ **Melhorando** | api-gateway ECONNREFUSED caindo (32k→5k/semana); acompanhar "correção noturna" |
| Jarvis/IA | → **Risco futuro** | 4 PRs de feature em desenvolvimento, sem testes E2E validados |

---

## ✅ Ações Recomendadas por Prioridade

| Prioridade | Ação | Módulo | Evidência |
|-----------|------|--------|-----------|
| 🔴 P0 | Investigar causa raiz do incidente de "mensagens rápidas/templates" de 10/06 | Chat/Mensagens | 15+ tickets SM em 1 dia |
| 🔴 P0 | Corrigir bug lifecycle "emoji reaction reabre chat encerrado" | Chat/Mensagens · Chatbot | SM-8734, SM-8532, SM-8190, SM-7934, SM-7931 |
| 🟠 P1 | Investigar 404s da omnispa (2.822 eventos/7d, 1.535 usuários) | Canais · UI | Sentry [omnispa] id=100942 |
| 🟠 P1 | Acompanhar efeitos colaterais da "correção noturna" de login (11/06) | Autenticação | SM-9053, SM-9052 |
| 🟠 P1 | Atualizar cenário DEV4-4291 (staleness 10 dias, fix de contact_uuid mergeado em 09/06) | Chat/Mensagens | tests/scenarios/DEV4-4291-cenarios.md |
| 🟡 P2 | Criar/corrigir cenário CT-WH-011 no waba-webhook (flakiness = 1.0) | Canais | tests/memory/Canais-historico.json |
| 🟡 P2 | Revisar regressão após PR#1531 em ads-manager (deprecated_ IDs) | Canais · Meta Ads | SPA PR#1531, 30+ arquivos |
| 🟡 P2 | Validar comportamento de bot após lifecycle "chat encerrado" na nova interface | Chatbot | SM-8586, SM-8584 |
| 🟢 P3 | Investigar Sentry [jarvis] Slow DB Query antes de escalar feature Jarvis | Jarvis/IA | Sentry id=66796 |
| 🟢 P3 | Criar smoke test de regressão para sidebar redesign (shadcn) | UI/Design System | SPA PR#1506, 23 PRs em 14d |

---

## 📋 Resumo Executivo

**Hoje, 11/06/2026, a plataforma está sob pressão crítica em Chat/Mensagens**, com evidências de um incidente ontem (10/06) que gerou 15+ tickets simultâneos de "mensagens rápidas e templates fora do ar" — padrão característico de feature-flag ou rollout parcial.

Três sinais de qualidade preocupam:
1. O bug de "reação de emoji reabre chat encerrado" persiste há mais de 14 dias sem correção confirmada — 5 tickets distintos, área documentada como frágil na KB
2. A nova SPA (omnispa) gerou 404s para 1.500 usuários na semana passada — rotas não configuradas
3. A "correção noturna" de login (10→11/06) gerou 3 tickets hoje de manhã — efeitos colaterais em monitoramento

**Pontos positivos:** Jarvis/IA sem nenhuma reclamação de usuário final; api-gateway ECONNREFUSED melhorando dramaticamente (32k→5k eventos/semana).

**Recomendação QA:** Priorizar cobertura de teste para o fluxo de mensagens rápidas (smoke test pós-deploy) e para o comportamento de chat lifecycle após reações de emoji.

---

## 📐 Metodologia

| Sinal | Fonte | Peso |
|-------|-------|------|
| SCORE_USR | N1 tickets SM abertos — Bugs (×3), Sol (×2), Dúv (×1), decay por semana | 70% |
| SCORE_TEC | Churn GitHub + Sentry + Flakiness + ENV_FAILURE + KB_AREAS_FRAGEIS | 30% |
| Anti-misclassificação | PASSO 4.1.5 — validação por keywords obrigatórias, sanity check > 30% | Correção automática |
| Cross-service weight | heimdall ×2.0, api-gateway ×1.8, dispatch ×1.5, foundation-api ×1.3 | Multiplicador |

*Gerado por Argos Predict v2.1 — 2026-06-11 às 11:30*
*Bugs analisados: 200 (todas páginas de bugs N1 Aberto da janela de 14d)*
*Próxima execução recomendada: 14/06/2026 (modo incremental)*
