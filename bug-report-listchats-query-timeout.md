# Bug Report — ListChats Query Timeout em Produção

**Data da investigação:** 15/06/2026  
**Investigador:** Yuri Castro (QA)  
**Fonte:** Sentry #94039 — `QueryException SQLSTATE[HY000] General error: 3024`  
**Severidade:** 🔴 Alta — afeta operadores todos os dias úteis  

---

## Resumo Executivo

A listagem de chats do operador (`GET /v3/accounts/{account}/chats`) executa uma query SQL que o MySQL interrompe por timeout em customers de alto volume. O problema acontece **todo dia útil** de forma crônica — não é relacionado ao incidente de 10/06. Em 14 dias foram registradas **2.892 falhas** afetando **45 operadores únicos**.

---

## Evidência — Distribuição de Eventos (Sentry #94039)

```
01/06  Seg      99   ██████
02/06  Ter     290   ███████████████████
03/06  Qua     130   ████████
04/06  Qui       3   ← anomalia (investigar deploy)
05/06  Sex     169   ███████████
06/06  Sab       5
07/06  Dom      14
08/06  Seg     414   ███████████████████████████  ← pico
09/06  Ter     277   ██████████████████
10/06  Qua     275   ██████████████████  ← incidente (sem relação)
11/06  Qui     286   ███████████████████
12/06  Sex     292   ███████████████████
13/06  Sab     214   ██████████████  ← anômalo p/ fim de semana
14/06  Dom      17   █
15/06  Seg     407   ███████████████████████████  ← hoje

Total 14d: 2.892 eventos
```

**Padrão:** o erro é crônico e proporcional ao volume de usuários ativos. Segundas-feiras são o pico (operadores logando simultaneamente). O incidente de 10/06 não gerou spike — a linha do incidente é normal na série.

---

## Localização

| Campo | Valor |
|-------|-------|
| **Arquivo** | `/src/Domains/Chats/Actions/Message/ListChats.php:459` |
| **Endpoint** | `GET /v3/accounts/{account}/chats` |
| **Serviço** | FoundationAPI |
| **Ambiente** | production |
| **Database** | Aurora MySQL (`aurora-poli-digital-clustr-update-cluster.cluster-ro-...`) |
| **Sentry ID** | #94039 |

---

## Root Cause

O método `ListChats::execute` chama `ListDataHelper::listSimplePaginate` (linha 459), que executa a query abaixo toda vez que um operador **abre ou pagina** a lista de chats:

```sql
SELECT contacts.id, contacts.uuid, ..., clm_max.date_last_message_id, clm_max.message_dir
FROM contacts
RIGHT JOIN (
    SELECT clm.contact_id, clm.message_id AS date_last_message_id, clm.message_dir
    FROM contact_last_messages AS clm
    INNER JOIN (
        SELECT contact_id, customer_id, MAX(message_id) AS max_msg_id
        FROM contact_last_messages
        WHERE customer_id = :customer_id
          AND date_last_message > NOW() - INTERVAL 8760 HOUR  -- ← 365 DIAS
        GROUP BY contact_id, customer_id
    ) AS clm_inner
      ON clm.contact_id = clm_inner.contact_id
     AND clm.message_id = clm_inner.max_msg_id
     AND clm.customer_id = clm_inner.customer_id
    WHERE clm.customer_id = :customer_id
) AS clm_max ON contacts.id = clm_max.contact_id
WHERE contacts.customer_id = :customer_id
  AND contacts.deleted_at IS NULL
  AND contacts.user_id IS NOT NULL
  AND (contacts.from_campaign = 0 OR contacts.from_campaign IS NULL)
  AND contacts.status = 1
ORDER BY date_last_message_id ASC
LIMIT 16 OFFSET 0
```

**O problema:** a subquery interna faz `MAX(message_id) GROUP BY contact_id` varrendo **365 dias** de `contact_last_messages`. Para customers com alto volume de contatos e histórico longo, o MySQL não finaliza dentro do `max_execution_time` configurado e retorna o erro 3024.

**Por que é grave:** toda vez que o operador abre a lista de chats, a query dispara. Com muitos operadores logados ao mesmo tempo (pico de segunda-feira), há dezenas de execuções simultâneas dessa query lenta, sobrecarregando o Aurora read replica.

---

## Impacto para o Operador

Quando a query estoura o timeout, o operador vê um erro ao carregar ou paginar a lista de chats. A conversa não some — o problema é na **visualização da lista**, não no envio/recebimento de mensagens em si. Mesmo assim, o operador não consegue navegar entre os atendimentos.

---

## Reprodução

1. Logar como operador de um customer com alto volume histórico (ex: customer_id `47769`)
2. Acessar a lista de chats ativos
3. Tentar paginar (passar da primeira página)
4. O erro ocorre quando o banco excede o timeout na query acima

> Clientes menores podem não reproduzir — o timeout depende do volume de dados do `customer_id`.

---

## Anomalias a investigar

**04/06 (quinta) → 3 eventos** — anomalamente baixo para um dia útil. Verificar se houve:
- Deploy no FoundationAPI que tocou `ListChats.php` ou a query
- Manutenção programada no Aurora
- Customer afetado estava offline

**13/06 (sábado) → 214 eventos** — volume 15x acima do normal para fim de semana. Verificar:
- Job batch ou script de importação que consultou a lista de chats
- Cliente rodando relatórios ou campanha manual nesse dia

---

## Opções de Fix

### Opção 1 — Índice composto (menor esforço, ganho imediato)
Adicionar índice na tabela `contact_last_messages`:

```sql
CREATE INDEX idx_clm_customer_date_msg
ON contact_last_messages (customer_id, date_last_message, message_id);
```

Permite que o `GROUP BY` e o filtro de data usem o índice em vez de full scan. Não requer mudança de código.

### Opção 2 — Reduzir janela de 365 para 90 dias (baixo risco)
Em `ListChats.php`, trocar:
```php
// antes
INTERVAL 8760 HOUR   // 365 dias

// depois
INTERVAL 2160 HOUR   // 90 dias
```

A lista de chats "ativos" raramente precisa de histórico de um ano inteiro. 90 dias cobre a grande maioria dos casos de uso e reduz drasticamente o volume de linhas na aggregation.

### Opção 3 — Tabela materializada / covering index (maior ganho, mais esforço)
Pré-computar a última mensagem por contato em uma tabela dedicada, atualizada via evento/trigger ao invés de calcular em tempo real no SELECT. Elimina o `MAX() GROUP BY` da query de listagem.

---

## Próximos Passos Sugeridos

- [ ] Confirmar reprodução em staging com customer de alto volume
- [ ] Verificar se existe índice em `contact_last_messages(customer_id, date_last_message)` — se não existir, a Opção 1 é quick win
- [ ] Investigar o que aconteceu em 04/06 (quase zero eventos)
- [ ] Decidir entre Opção 1 (índice) ou Opção 2 (reduzir janela) como fix imediato
- [ ] Abrir DEV4 corretivo com owner definido

---

*Investigação conduzida via Sentry API + Argos Predict (cache-only 7d · 15/06/2026)*
