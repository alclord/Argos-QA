# Relatório de Execução — DEV4-4201
> Card: Poli Pay: Migração do Catálogo e Carrinho no Chat para Nova Interface
> Iniciado em: 2026-06-12T19:55:00.000Z
> Gerado em: 2026-06-12T20:08:00.000Z
> Ambiente: https://spa-canary.poli.digital/chat
> PRs: SPA#1530, SPA#1528, SPA#1527, SPA#1526
> Mocks ativos: nenhum

---

## Resumo Geral

| Métrica | Valor |
|---|---|
| ✅ Passou | 0 |
| ❌ Falhou | 0 |
| ⏭️ Bloqueado | 14 |
| 📊 Taxa de sucesso | N/A (100% bloqueado) |
| ⏱️ Tempo total | ~13 min |
| 🔧 Self-healings | 0 |

---

## Causa-Raiz dos Bloqueios

### BLOQUEIO 1 — Feature Flag desabilitada

**Flag:** `can_use_chatcommerce = false` (Flagsmith, identity hash `f264c12b...`)  
**Conta afetada:** `operadorcanario@poli.digital` (canary)  
**Evidência:** `window.flagsmith.hasFeature('can_use_chatcommerce')` → `false`; nenhum elemento de ChatCommerce presente no DOM (nem oculto).  
**Impacto:** Todos os 13 cenários de UI (CT-PP-001 a CT-PP-013) bloqueados — ícones sacola (🛍) e carrinho (🛒) não renderizados na toolbar do chat.

### BLOQUEIO 2 — Backend não deployado na foundation-api canary

**Endpoint testado:** `POST /api/v1/cart/send` (e variações v3, /commerce, /polipay)  
**Resposta:** HTTP 404 em todos os paths, mesmo com Bearer token válido.  
**Evidência:** Varredura de 8 paths candidatos, todos HTTP 404.  
**Impacto:** CT-PP-014 (segurança — envio sem auth) bloqueado — endpoint inexistente impossibilita validar status 401.

### BLOQUEIO 3 — Contato de teste não acessível ao operador canary

**chatUuid:** `9bb49c4f-2c88-4a7f-84bb-38074c239b4b`  
**Resultado:** "Contato não encontrado" ao navegar para `/chat/[chatUuid]`  
**Evidência:** `bloqueio_chatcommerce_flag.png`  
**Impacto:** Contribui para bloqueio dos cenários que requerem chat ativo.

---

## Resultados por Cenário

### CT-PP-001 — Fluxo completo de venda no chat
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 Foco Primário | **Status:** ⏭️ BLOQUEADO

**Motivo:** Feature flag `can_use_chatcommerce = false` — ícone sacola (🛍) ausente na toolbar. Contato de teste não acessível.

---

### CT-PP-002 — Catálogo bloqueado sem pagamento
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 Foco Primário | **Status:** ⏭️ BLOQUEADO

**Motivo:** Feature flag `can_use_chatcommerce = false` — painel de chatcommerce não renderizado para este operador.

---

### CT-PP-003 — Enviar pedido com carrinho vazio
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 Foco Primário | **Status:** ⏭️ BLOQUEADO

**Motivo:** Feature flag `can_use_chatcommerce = false` — sem acesso ao carrinho.

---

### CT-PP-004 — Falha de rede no envio do pedido
**Criticidade:** 🔴 Alta | **Prioridade:** 🔁 Regressão | **Status:** ⏭️ BLOQUEADO

**Motivo:** Feature flag `can_use_chatcommerce = false`. Depende de CT-PP-001.

---

### CT-PP-005 — Trocar conversa com carrinho populado
**Criticidade:** 🟡 Média | **Prioridade:** 🔁 Regressão | **Status:** ⏭️ BLOQUEADO

**Motivo:** Feature flag `can_use_chatcommerce = false`. Depende de CT-PP-001.

---

### CT-PP-006 — Exclusividade catálogo ↔ carrinho
**Criticidade:** 🟡 Média | **Prioridade:** 🔁 Regressão | **Status:** ⏭️ BLOQUEADO

**Motivo:** Feature flag `can_use_chatcommerce = false`.

---

### CT-PP-007 — Fechar e reabrir carrinho preserva dados
**Criticidade:** 🟡 Média | **Prioridade:** 🔁 Regressão | **Status:** ⏭️ BLOQUEADO

**Motivo:** Feature flag `can_use_chatcommerce = false`. Depende de CT-PP-001.

---

### CT-PP-008 — Catálogo vazio com CTA funcional
**Criticidade:** 🟡 Média | **Prioridade:** 📋 Padrão | **Status:** ⏭️ BLOQUEADO

**Motivo:** Feature flag `can_use_chatcommerce = false`.

---

### CT-PP-009 — Erro de carregamento com retry mantendo filtro
**Criticidade:** 🟡 Média | **Prioridade:** 📋 Padrão | **Status:** ⏭️ BLOQUEADO

**Motivo:** Feature flag `can_use_chatcommerce = false`.

---

### CT-PP-010 — Remover item do carrinho
**Criticidade:** 🟡 Média | **Prioridade:** 🔁 Regressão | **Status:** ⏭️ BLOQUEADO

**Motivo:** Feature flag `can_use_chatcommerce = false`. Depende de CT-PP-001.

---

### CT-PP-011 — Múltiplas adições do mesmo produto
**Criticidade:** 🟡 Média | **Prioridade:** 🔁 Regressão | **Status:** ⏭️ BLOQUEADO

**Motivo:** Feature flag `can_use_chatcommerce = false`. Depende de CT-PP-001.

---

### CT-PP-012 — Webhook atualiza bolha em tempo real
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 Foco Primário | **Status:** ⏭️ BLOQUEADO

**Motivo:** Depende de CT-PP-001 (pedido enviado); feature flag desabilitada impede geração de bolha. Backend não deployado.

---

### CT-PP-013 — XSS via dados de produto no catálogo
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 Foco Primário | **Status:** ⏭️ BLOQUEADO

**Motivo:** Feature flag `can_use_chatcommerce = false` — catálogo não renderizado.

---

### CT-PP-014 — Envio de pedido sem autenticação (API direta)
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 Foco Primário | **Status:** ⏭️ BLOQUEADO

**Tentativa de execução:**
- Testados 8 paths candidatos no foundation-api-canary: `/api/v1/cart/send`, `/v3/cart/send`, `/api/v3/cart/send`, `/api/v1/orders`, `/v3/orders`, `/api/v1/commerce/orders`, `/api/v1/polipay/orders`, `/v3/chat-commerce/orders`
- **Todos retornaram HTTP 404** — endpoint de envio de pedido não existe na foundation-api canary

**Motivo:** Backend do ChatCommerce não deployado na foundation-api-canary. Impossível validar comportamento de autenticação (401 esperado) em endpoint inexistente.

**Observação:** O deploy registrado no Jira (2026-06-12T16:53, jiranek) afetou apenas `poli-digital/SPA @ feat/DEV4-4201-commerce-product-images` — somente o frontend SPA foi deployado. O serviço de backend (foundation-api) não recebeu deploy nesta janela.

---

## Descoberta Importante — Painel "Pedidos" Legado Acessível

Durante a investigação com a conta gestora (`yuri.castro@poli.digital`), foi identificado que o painel **"Pedidos"** legado está acessível via ícone de carrinho no painel de tabs lateral direito do chat (`?panel=orders`). Este painel pré-existe ao escopo do DEV4-4201 e é **diferente** da nova interface descrita nos cenários.

| Item | Status | Detalhe |
|---|---|---|
| Painel "Pedidos" (legado) | ✅ Acessível | Via ícone no painel direito → `?panel=orders` |
| "Criar pedido" (legado) | ✅ Funcional | Abre modal com campos: Título, Valor, Status, Pagamento, Responsável |
| Nova interface — catálogo de produtos | ❌ Inacessível | Requer `can_use_chatcommerce = true` |
| Ícones sacola (🛍) / carrinho (🛒) na toolbar | ❌ Ausentes | Feature flag bloqueia o render |

**O que DEV4-4201 entrega** é uma **nova** UX de catálogo+carrinho baseada em produtos cadastrados, com ícones na toolbar inferior do chat, grid de produtos, filtros por categoria e bolha de pedido. Isso é distinto do formulário manual legado.

**Evidências:**
- `painel_pedidos_legado.png` — painel "Pedidos" legado aberto, sem interface de catálogo
- `criar_pedido_modal_legado.png` — modal "Criar pedido" (legado): campos manuais, sem seleção de produtos

---

## Bloqueios e Observações

### Estado do Ambiente Canary

| Componente | Estado | Detalhe |
|---|---|---|
| SPA frontend | ✅ Deployado | Versão `3.5.352-DEV4-4201` confirmada no DOM |
| Feature flag `can_use_chatcommerce` | ❌ Desabilitada | `enabled: false` para `operadorcanario@poli.digital` |
| Backend foundation-api | ❌ Não deployado | HTTP 404 em todos os endpoints de cart/orders |
| Contato de teste | ⚠️ Não acessível | UUID `9bb49c4f-...` exibe "Contato não encontrado" |

### Recomendações para próxima execução

1. **Habilitar `can_use_chatcommerce`** para a conta do operador canary de teste no Flagsmith (ou adicionar ao `value` da flag, que atualmente contém apenas `[1]`)
2. **Deployar o backend** do ChatCommerce na foundation-api-canary
3. **Configurar método de pagamento** para a conta do operador canary (pré-requisito de CT-PP-001)
4. **Verificar contato de teste** — o chatUuid `9bb49c4f-2c88-4a7f-84bb-38074c239b4b` precisa estar acessível para `operadorcanario@poli.digital`
5. **Executar `/qa-executor DEV4-4201 canary`** após as correções acima

---

## Bugs Encontrados

Nenhum bug de comportamento encontrado (cenários bloqueados antes de execução).

**⚠️ Observação de segurança (CT-PP-014):** O endpoint de envio de pedido retorna HTTP 404 (não HTTP 401) quando não existe. Isso não é um bug — o endpoint simplesmente não está deployado. Porém, ao deployar, o padrão esperado é HTTP 401 para requests sem Authorization header, não 404 ou 422.

---

## Performance

> Sem violações de performance — nenhuma chamada de API instrumentada executada. Cenários 100% bloqueados por feature flag.

---

## Evidências

| Arquivo | Descrição |
|---|---|
| `tests/evidence/DEV4-4201/preflight_ambiente.png` | Preflight — ambiente carregado |
| `tests/evidence/DEV4-4201/preflight_login.png` | Preflight — login OK, versão `3.5.352-DEV4-4201` |
| `tests/evidence/DEV4-4201/bloqueio_chatcommerce_flag.png` | Feature flag desabilitada — "Contato não encontrado", sem ícones ChatCommerce |
| `tests/evidence/DEV4-4201/painel_pedidos_legado.png` | Painel "Pedidos" legado acessível (gestor) — interface pré-existente, distinta do escopo do card |
| `tests/evidence/DEV4-4201/criar_pedido_modal_legado.png` | Modal "Criar pedido" legado — formulário manual, sem catálogo de produtos |
