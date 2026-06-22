# Relatório de Execução — DEV4-4119
> Card: Corrigir cacheamento no useHandleNewMessage.tsx — múltiplas requisições idênticas no frontend
> Gerado em: 2026-05-20 12:52
> Ambiente: https://spa-canary.poli.digital/chat
> Contato de teste: "Yuri" (999210609) — chatUuid: 9bb49c4f-2c88-4a7f-84bb-38074c239b4b

---

## Resumo Geral

| Métrica | Valor |
|---|---|
| ✅ Passou | 4 |
| ⚠️ Inconsistente | 1 |
| ❌ Falhou | 0 |
| ⏭️ Bloqueado | 0 |
| 📊 Taxa de sucesso | 80% |

---

## Resultados por Cenário

### CT-CACHE-001 — GETs duplicados ao abrir chat
**Criticidade:** 🔴 Alta | **Status:** ⚠️ INCONSISTENTE

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | Abrir chat via URL direta | ✅ | CT-CACHE-001_passo1_ok.png |
| 2 | Verificar requisições GET /v3/contacts/{uuid} | ⚠️ | CT-CACHE-001_network_contacts.txt |

**Resultado Obtido:**
- Acesso via URL (`/chat/9bb49c4f...`): **1 GET** disparado — sem duplicata ✅
- Acesso via clique na lista (sessões anteriores, contatos diferentes): **2 GETs idênticos** simultâneos detectados ❌
  - Sessão 1 (Juliana `d49fd5dc`): req #63 e #79 — delta de 16 requests
  - Sessão 2 (Natália `9bac495b`): req #258 e #262 — delta de 4 requests

**Resultado Esperado:** Apenas 1 GET por abertura de chat, independente do método de acesso.

**Divergência:** O fix parece corrigir o caminho do WebSocket (useHandleNewMessage), mas duplicatas ainda foram observadas ao abrir chat via clique na lista com WebSocket ativo. Comportamento pode estar relacionado ao hook de abertura de chat, não ao useHandleNewMessage especificamente.

---

### CT-CACHE-002 — Cache persiste ao navegar entre chats
**Criticidade:** 🔴 Alta | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | Abrir chat do Yuri | ✅ | CT-CACHE-002_passo1_ok.png |
| 2 | Navegar para outro chat | ✅ | — |
| 3 | Retornar ao chat do Yuri | ✅ | CT-CACHE-002_passo2_ok.png |

**Resultado Obtido:** Retorno imediato via SPA não disparou novo GET para o contato — cache in-memory do TanStack Query funcionou corretamente.

**Resultado Esperado:** Cache evita re-fetch desnecessário em navegações rápidas.

---

### CT-MSG-001 — Envio de mensagem pelo SPA
**Criticidade:** 🟡 Média | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | Digitar mensagem no editor | ✅ | CT-MSG-001_passo1_ok.png |
| 2 | Enviar com Enter e verificar | ✅ | CT-MSG-001_passo2_ok.png |

**Resultado Obtido:** Mensagem "Argos QA DEV4-4119 — teste de envio automatizado" enviada com sucesso (POST 201). Nenhum GET duplicado disparado pelo envio.

---

### CT-MSG-002 — Recebimento de mensagem via WebSocket
**Criticidade:** 🟡 Média | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | Aguardar mensagem do contato real (999210609) | ✅ | CT-MSG-002_passo1_ok.png |
| 2 | Verificar exibição em tempo real | ✅ | CT-MSG-002_passo1_ok.png |
| 3 | Verificar ausência de GET duplicado | ✅ | CT-MSG-002_network_contacts.txt |

**Resultado Obtido:** Mensagem "Teste" recebida via WebSocket, exibida corretamente na tela. O hook `useHandleNewMessage` processou o evento **sem disparar GET adicional** para o contato — fix funcionando para este fluxo.

---

### CT-CACHE-003 — Cache após receber mensagem e navegar
**Criticidade:** 🟢 Baixa | **Status:** ✅ PASSOU

| Passo | Descrição | Status | Evidência |
|---|---|---|---|
| 1 | Após receber mensagem, navegar para outro chat | ✅ | — |
| 2 | Retornar via busca na lista | ✅ | CT-CACHE-003_passo1_ok.png |
| 3 | Verificar requisições | ✅ | CT-CACHE-003_network_contacts.txt |

**Resultado Obtido:** Retorno ao chat após navegação disparou 1 GET (req #167) — comportamento de stale-revalidate esperado do TanStack Query. Sem duplicatas.

---

## Observações e Hipótese

O fix aplicado em `useHandleNewMessage.tsx` corrigiu o caminho de recebimento de mensagens via WebSocket — nenhuma duplicata foi detectada ao receber eventos. Contudo, GETs duplicados foram reproduzidos em sessões onde o chat foi aberto via **clique na lista** com WebSocket já ativo, sugerindo que o problema pode ter um segundo ponto de origem relacionado ao hook de abertura de chat (possivelmente `useEffect` que carrega dados ao montar o componente de chat).

**Recomendação:** Investigar se o hook de inicialização do chat (`useChatDetail` ou similar) também precisa verificar o cache antes de disparar o GET, além do `useHandleNewMessage`.

---

## Evidências

Todas as evidências salvas em: `tests/evidence/DEV4-4119/`

| Arquivo | Descrição |
|---|---|
| preflight_ambiente.png | Tela inicial após login |
| CT-CACHE-001_passo1_ok.png | Chat Yuri aberto, 1 GET baseline |
| CT-CACHE-001_network_contacts.txt | Log de rede — abertura do chat |
| CT-MSG-001_passo1_ok.png | Mensagem digitada no editor |
| CT-MSG-001_passo2_ok.png | Mensagem enviada, visível no chat |
| CT-MSG-002_passo1_ok.png | Mensagem "Teste" recebida do celular |
| CT-MSG-002_network_contacts.txt | Log de rede — recebimento sem GET extra |
| CT-CACHE-002_passo1_ok.png | Retorno ao chat, sem re-fetch |
| CT-CACHE-003_passo1_ok.png | Chat após navegação, 1 GET stale-revalidate |
| CT-CACHE-003_network_contacts.txt | Log de rede — retorno via busca na lista |
