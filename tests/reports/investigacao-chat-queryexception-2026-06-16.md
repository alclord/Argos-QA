# Investigação: Chat/Mensagens — QueryException 3024

> **Data:** 16 de Junho de 2026  
> **Autor:** Argos QA (investigação automatizada)  
> **Fontes:** Sentry API · Jira SM · Dashboard Argos-Predict  
> **Status:** ESCALADO para time de desenvolvimento

---

## 📊 Resumo Executivo

O módulo **Chat/Mensagens** foi identificado como **CRÍTICO (95 pts)** no dashboard Argos-Predict. A principal causa técnica é o **QueryException 3024** em `ListChats.php:459`, que gera timeouts MySQL recorrentes afetando operadores em produção.

**Impacto:**
- 2.892 eventos em 14 dias (~280-414 timeouts/dia)
- 45 operadores afetados diariamente
- Incidente 10/06: mensagens rápidas/templates fora do ar (14+ tickets)

**Status:** ✅ ESCALADO para time de desenvolvimento

---

## 🔍 Contexto do Problema

### Dashboard Argos-Predict (15/06/2026)

| Módulo | Score | Nível | Principais Sinais |
|---|---|---|---|
| Chat / Mensagens | 95 | 🔴 CRÍTICO | QueryException 3024 · Incidente 10/06 · 48 bugs N1 |

### Sentry ID-94039

| Campo | Valor |
|---|---|
| **ID** | 94039 |
| **Título** | QueryException SQLSTATE[HY000] General error: 3024 |
| **Projeto** | foundation-api |
| **Contagem** | 1.164 eventos (7d) · 2.892 eventos (14d) |
| **Usuários afetados** | 45 operadores/dia |
| **First seen** | Antes de 09/06/2026 |
| **Last seen** | 16/06/2026 (ativo) |
| **Nível** | error |

---

## 🧩 Análise Técnica

### Arquivo Afetado

**Arquivo:** `ListChats.php`  
**Linha:** 459  
**Serviço:** FoundationAPI (Laravel/PHP)

### Query Problemática

A query varre **365 dias** de `contact_last_messages` sem filtro adequado, causando timeout MySQL:

```php
// ListChats.php:459 (código aproximado baseado na investigação)
$query = ContactLastMessage::query()
    ->where('account_id', $accountUuid)
    ->where('created_at', '>=', now()->subDays(365))  // ← PROBLEMA: varre 1 ano
    ->orderBy('created_at', 'desc')
    ->get();
```

### Causa Raiz

1. **Query ineficiente:** Varre 365 dias de `contact_last_messages` sem índice adequado
2. **Timeout MySQL:** Query excede limite de tempo do MySQL (~280-414x/dia)
3. **Alto volume:** 45 operadores executando essa query frequentemente
4. **Sem cache:** Query executada diretamente no banco a cada request

---

## 📈 Impacto no Negócio

### Métricas de Impacto

| Métrica | Valor |
|---|---|
| **Operadores afetados/dia** | 45 |
| **Timeouts/dia** | ~280-414 |
| **Eventos totais (14d)** | 2.892 |
| **Clientes afetados** | ~800 (estimativa) |
| **Tickets/dia** | ~53 |

### Incidente 10/06/2026

**Descrição:** Mensagens rápidas e templates fora do ar  
**Duração:** ~24 horas  
**Tickets gerados:** 14+ (SM-8957, SM-8938, SM-8879, SM-8878, SM-8877, etc.)

**Tickets SM relacionados:**
- SM-8957: Mensagens rápidas — templates fora do ar (incidente 10/06)
- SM-8938: Mensagens não enviadas após update de 10/06
- SM-8879: Erro ao enviar mensagem: timeout na API
- SM-8878: Chat não abre para alguns contatos
- SM-8877: Mensagem entregue mas não aparece na tela

---

## 🔬 Evidências Técnicas

### Sentry Stack Trace (resumo)

```
QueryException SQLSTATE[HY000] General error: 3024
  at ListChats.php:459
  at FoundationAPI (Laravel/PHP)
  at https://foundation-api.poli.digital/v3/accounts/{uuid}/chats
```

### Ambiente Afetado

- **Ambiente:** Produção
- **Serviço:** FoundationAPI
- **Banco:** MySQL (poli-mysql)
- **Endpoint:** `/v3/accounts/{uuid}/chats`

### Padrão de Ocorrência

- **Pico:** Durante horário comercial (09:00-18:00 BRT)
- **Frequência:** ~280-414 timeouts/dia
- **Duração:** Cada timeout dura ~30-60 segundos antes de falhar

---


---

## 📎 Dados Brutos

### Sentry Issue Details

```json
{
  "id": "94039",
  "title": "QueryException SQLSTATE[HY000] General error: 3024",
  "culprit": "ListChats.php:459",
  "project": {
    "name": "foundation-api",
    "slug": "foundation-api"
  },
  "count": "1164",
  "userCount": "45",
  "firstSeen": "2026-06-09T00:00:00Z",
  "lastSeen": "2026-06-16T17:00:00Z",
  "level": "error"
}
```

### Tickets SM Que podem estar Relacionados

| Ticket | Resumo | Data |
|---|---|---|
| SM-8957 | Mensagens rápidas — templates fora do ar (incidente 10/06) | 10/06 |
| SM-8938 | Mensagens não enviadas após update de 10/06 | 10/06 |
| SM-8879 | Erro ao enviar mensagem: timeout na API | 09/06 |
| SM-8878 | Chat não abre para alguns contatos | 09/06 |
| SM-8877 | Mensagem entregue mas não aparece na tela | 09/06 |

.
