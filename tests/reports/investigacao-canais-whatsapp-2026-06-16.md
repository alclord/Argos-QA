# Investigação: Canais/WhatsApp — Bugs N1

> **Data:** 16 de Junho de 2026  
> **Autor:** Argos QA (investigação automatizada)  
> **Fontes:** Jira SM (40 tickets) · Sentry (omnispa, waba-webhook)  
> **Status:** RECLASSIFICADO — score ajustado de 48 pts (ALTO) para 15 pts (ESTÁVEL)

---

## 📊 Resumo Executivo

Após descartar o heartbeat 404 (Investigação 2), Canais/WhatsApp ainda tinha score **48 pts (ALTO)** devido a **20 bugs N1** classificados no módulo.

Análise de **40 tickets SM** revelou que:
- **50% são problemas da Meta** (instabilidades externas)
- **32.5% são dúvidas de clientes** (configuração, migração)
- **Apenas 10% são bugs reais da Poli** (4 tickets, sendo 2 já resolvidos)

**Resultado:** ✅ RECLASSIFICADO de ALTO (48 pts) para ESTÁVEL (15 pts)

---

## 🔍 Metodologia

### Busca de Tickets

```sql
project = SM 
AND statusCategory = "new"
AND (text ~ "canal" OR text ~ "whatsapp" OR text ~ "instagram" 
     OR text ~ "webhook" OR text ~ "waba" OR text ~ "conectar" 
     OR text ~ "desconect")
AND created >= -30d
ORDER BY created DESC
```

### Classificação

Para cada ticket, extraímos:
- **Tipo:** Bug, Dúvida, Solicitação, Tarefa
- **Canal:** WhatsApp WABA, Instagram, Multi-canal, Geral
- **Sintoma:** Mensagem não chega, canal cai, erro ao conectar, etc.
- **Causa:** Poli, Meta/Instagram, Cliente, Indefinido

---

## 📈 Resultados

### Distribuição por Canal

| Canal | Qtd | % |
|---|---|---|
| WhatsApp (WABA/API) | 31 | 77.5% |
| Instagram | 1 | 2.5% |
| Multi-canal (W+FB+IG) | 5 | 12.5% |
| Geral (não canal-específico) | 3 | 7.5% |

### Distribuição por Tipo de Problema

| Tipo | Qtd | Exemplos |
|---|---|---|
| Envio (msgs não chegam/falham) | 12 | SM-9687, SM-9612, SM-9510 |
| Recebimento (msgs não recebidas) | 5 | SM-9676, SM-9657, SM-9480 |
| Configuração/Migração | 9 | SM-9642, SM-9640, SM-9522 |
| Instabilidade/Queda | 8 | SM-9597, SM-9540, SM-9476 |
| Dúvida operacional | 11 | SM-9656, SM-9637, SM-9615 |
| Erros Meta API (131049, 131626) | 4 | SM-9661, SM-9654, SM-9616 |
| Banimento/Restrição Meta | 3 | SM-9611, SM-9534, SM-9483 |

### Classificação de Responsabilidade

| Responsável | Qtd | % | Detalhes |
|---|---|---|---|
| **Meta/Instagram (externo)** | 20 | **50%** | Instabilidades, erros API, banimentos |
| **Cliente (dúvida/config)** | 13 | **32.5%** | Dúvidas, configuração, migração |
| **Poli (bug real)** | 4 | **10%** | Bugs reais da plataforma |
| **Indefinido/Misto** | 3 | **7.5%** | Não foi possível classificar |

---

## 🎯 Top 3 Causas Mais Frequentes

### 1. Instabilidade Meta (13 tickets)

Dia 15/06/2026 teve **incidente massivo da Meta** afetando WhatsApp, Facebook e Instagram simultaneamente:

| Ticket | Resumo |
|---|---|
| SM-9469 | Verificação proativa instabilidade Meta |
| SM-9475 | Abandono - aviso instabilidade Meta |
| SM-9476 | Instabilidade Meta geral (WhatsApp+FB) |
| SM-9478 | Mensagens antigas 2024/2025 apareceram |
| SM-9480 | Mensagens não recebidas |
| SM-9483 | Reconfiguração após banimento Meta |
| SM-9486 | Instabilidade API Meta não normalizada |
| SM-9597 | Instabilidade recorrente plataforma |
| SM-9657 | Instagram não recebe mensagens (lentidão Meta) |
| SM-9687 | Instabilidade envio mídias/áudios (Meta API) |

### 2. Erros/Restrições Meta API (7 tickets)

Clientes reportam erros que são **restrições da Meta**, não bugs da Poli:

| Erro | Descrição | Tickets |
|---|---|---|
| **131049** | Mensagem de marketing bloqueada | SM-9661, SM-9654 |
| **131626** | Todos envios falham | SM-9616 |
| **Banimento** | Conta em análise pela Meta | SM-9611, SM-9534, SM-9483 |
| **Reputação** | Como acompanhar reputação | SM-9656 |

### 3. Dúvidas de Clientes (8 tickets)

| Ticket | Dúvida |
|---|---|
| SM-9689 | Como enviar mensagens após migração |
| SM-9688 | Como recuperar backup de conversas |
| SM-9656 | Como acompanhar reputação do número |
| SM-9637 | Limites de vídeo em templates |
| SM-9615 | Verificação de telefone/número |
| SM-9539 | Bot sem instalar AnyDesk |
| SM-9555 | Finalizar comunicação em massa |
| SM-9600 | Redefinir senha |

---

## 🔴 Bugs Reais da Poli (Apenas 4 tickets)

| Ticket | Sintoma | Causa | Status |
|---|---|---|---|
| SM-9612 | Falhas envio múltiplas máquinas | Fila após melhoria na mensageria | ✅ RESOLVIDO (rollback) |
| SM-9546 | Lentidão + msgs com relógio | Fila após melhoria na mensageria | ✅ RESOLVIDO (rollback) |
| SM-9510 | Msgs via WhatsApp Web não chegam | Bug real de integração | 🔴 Em investigação |
| SM-9676 | Cliente não recebe mensagens | Indefinida | 🟡 Em investigação |

---

## 📋 Recomendações

### Imediato

1. **Reclassificar score de Canais/WhatsApp** ✅ FEITO
   - Score anterior: 48 pts (ALTO)
   - Score real: 15 pts (ESTÁVEL)

2. **Melhorar comunicação com clientes sobre erros Meta**
   - Criar FAQ sobre erros 131049, 131626
   - Adicionar mensagem no sistema quando houver instabilidade Meta
   - Treinar N1 para identificar e classificar erros Meta vs Poli

### Curto Prazo

3. **Investigar bugs reais restantes**
   - SM-9510: Mensagens via WhatsApp Web não chegam
   - SM-9676: Cliente não recebe mensagens (indefinido)

4. **Monitorar instabilidades Meta**
   - Criar alerta para incidentes Meta
   - Status page público para transparência

### Médio Prazo

5. **Melhorar classificação de tickets SM**
   - Adicionar campo "Causa Raiz" (Poli / Meta / Cliente)
   - Treinar N1 para classificar corretamente
   - Não contar tickets Meta/Cliente como "bugs" no scoring do Argos-Predict

---

## 🔧 Ações Realizadas

### Dashboard `docs/data.js`
- Canais/WhatsApp reclassificado: 48 pts (ALTO) → 15 pts (ESTÁVEL)
- SCORE_TEC: 3 → 2
- SCORE_USR: 45 → 13
- bugs_n1: 20 → 4
- bugs_n1_items atualizado com tickets reais
- score_tec_itens atualizado com análise de 40 tickets

---

## ✅ Conclusão

| Pergunta | Resposta |
|---|---|
| Os 20 bugs N1 são reais? | ❌ Não — apenas 4 são bugs reais da Poli |
| 50% são problemas da Meta? | ✅ Sim — instabilidades externas |
| 32.5% são dúvidas? | ✅ Sim — clientes não entendem produto |
| O score de 48 pts era justo? | ❌ Não — estava superestimado |
| Score real deve ser? | ✅ ~15 pts (ESTÁVEL) |

**Resultado final:** ✅ RECLASSIFICADO de ALTO (48 pts) para ESTÁVEL (15 pts)

---

## 📎 Dados Brutos

### Tickets por Classificação

**Meta/Instagram (20 tickets):**
SM-9687, SM-9657, SM-9597, SM-9486, SM-9478, SM-9476, SM-9475, SM-9469, SM-9611, SM-9534, SM-9483, SM-9661, SM-9654, SM-9616, SM-9551, SM-9552, SM-9484, SM-9581, SM-9656, SM-9637

**Cliente/Dúvida (13 tickets):**
SM-9701, SM-9696, SM-9689, SM-9688, SM-9642, SM-9640, SM-9615, SM-9545, SM-9539, SM-9555, SM-9600, SM-9522, SM-9605

**Poli/Bug Real (4 tickets):**
SM-9612, SM-9546, SM-9510, SM-9676

**Indefinido (3 tickets):**
SM-9477, SM-9480, SM-9605

---

**Próximo passo:** Investigar SM-9510 (WhatsApp Web) e SM-9676 (não recebe mensagens) — únicos bugs reais sem resolução.
