# Cenários de Teste — DEV4-4233
> Card: Status de ACK das mensagens é perdido ao trocar de chat
> Gerado em: 2026-05-25
> Card atualizado em: 2026-05-25T12:23:33-0300
> Ambiente-alvo: canary
> Tipo: Bug | Prioridade: Highest
> Assignee: Ana Gabriella Hoffmann (gabi.hoffmann@poli.digital)

---

## Estratégia de Teste

Bug de regressão de estado frontend puro: o ACK transita entre WebSocket (tempo real), Zustand store (estado de sessão) e TanStack Query cache (persistência entre navegações). A cobertura prioriza os dois vetores da causa raiz: (1) troca de chat e reidratação via cache e (2) merge de payloads fora de ordem. Tipos aplicáveis: funcional, integração frontend (WebSocket × store × cache) e regressão. Cenários que dependem de intercepção de rede (CT-ACK-003, CT-ACK-005, CT-ACK-010) requerem MOCKS_ENABLED=true e serão BLOQUEADOS em canary puro.

---

## Mapa de Riscos

| Risco | Probabilidade | Impacto | Prioridade |
|---|---|---|---|
| `useSyncMessagesWithCache` ainda usa cache desatualizado após correção do `updateACK` | A | A | 🔴 Crítico |
| `createOrUpdateMessage` preserva `ack` mas apaga `error_code`/`error_message` | M | A | 🔴 Alto |
| Troca rápida de chat antes do ACK chegar — ACK não atualiza ao voltar | M | M | 🟡 Médio |
| Múltiplas mensagens em fila — apenas última tem ACK correto | M | M | 🟡 Médio |
| Cache `CHAT-MESSAGES:` invalidado excessivamente → refetch desnecessário | B | M | 🟡 Médio |
| Evento WebSocket de outra conta contamina sessão do operador atual | B | A | 🟡 Médio |
| Fluxo de envio normal afetado pela mudança de merge | B | A | 🟡 Médio |
| Ícone de erro deixa de atualizar após correção do merge parcial | B | M | 🟢 Baixo |

---

## Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade |
|---|---|---|---|---|---|
| CT-ACK-001 | ACK mantido após troca de chat | Operador autenticado; contato de teste com chat disponível em canary | 1. Abrir chat do contato de teste; 2. Enviar mensagem de texto; 3. Aguardar ACK atingir ✓✓ (ícone de entregue/lido visível); 4. Clicar em outro chat qualquer; 5. Retornar ao chat do contato de teste; 6. Localizar a mensagem enviada e verificar o ícone de ACK | Mensagem exibe ✓✓ — não regride para ⏳ ou ✓ simples. Rastreia: CA-01, CA-02 | 🔴 Alta |
| CT-ACK-002 | Envio normal sem troca de chat | Operador autenticado; contato de teste disponível | 1. Abrir chat do contato de teste; 2. Enviar mensagem de texto; 3. Observar sequência de ícones: ⏳ → ✓ → ✓✓; 4. Permanecer no mesmo chat por 30 segundos | Ícones atualizam em sequência correta sem regressão. Fluxo base não afetado pela correção. Rastreia: CA-06 | 🔴 Alta |
| CT-ACK-003 | Payload sem `ack` não regride status | Mensagem com ✓✓ visível; MOCKS_ENABLED=true (intercepção de rede habilitada) | 1. Enviar mensagem e aguardar ✓✓; 2. Interceptar requisição `GET /messages` e retornar payload sem campo `ack`; 3. Forçar invalidação do cache; 4. Aguardar refetch; 5. Verificar ícone da mensagem | Ícone permanece ✓✓ — `ack` existente não sobrescrito. Rastreia: CA-03, causa raiz 2 | 🔴 Alta |
| CT-ACK-004 | Mensagem com erro mantém ícone após troca | Mensagem com status de erro visível (⚠️ ou ícone vermelho) | 1. Localizar mensagem com status de erro; 2. Trocar para outro chat; 3. Voltar ao chat original; 4. Verificar o ícone da mensagem com erro | Ícone de erro mantido — não regride para ⏳. Rastreia: CA-05 | 🟡 Média |
| CT-ACK-005 | Corrida POST/GET/WS → ACK mais recente vence | MOCKS_ENABLED=true ou DevTools de throttle de rede | 1. Enviar mensagem; 2. Simular atraso no evento WebSocket (>500ms após POST); 3. Forçar `GET /messages` antes do WS chegar; 4. Aguardar evento WS; 5. Verificar ACK final | ACK final reflete o status mais recente do WebSocket (✓ ou ✓✓), não o status vazio do GET. Rastreia: CA-04 | 🟡 Média |
| CT-ACK-006 | Troca rápida antes do ACK chegar | Chat recém-aberto; mensagem enviada (somente ⏳ visível, sem aguardar ✓✓) | 1. Enviar mensagem (aguardar apenas ⏳ — não esperar ✓✓); 2. Imediatamente trocar para outro chat; 3. Aguardar 5 segundos; 4. Retornar ao chat original; 5. Verificar ACK | Mensagem exibe o ACK recebido enquanto o usuário estava em outro chat (✓ ou ✓✓) — não permanece em ⏳. Rastreia: CA-02 em borda de timing | 🔴 Alta |
| CT-ACK-007 | Múltiplas mensagens com ACKs distintos | Múltiplas mensagens enviadas em sequência rápida | 1. Enviar 3 mensagens em sequência; 2. Aguardar ACKs distintos (ex: 1ª=✓✓, 2ª=✓, 3ª=⏳); 3. Trocar para outro chat; 4. Voltar; 5. Verificar ACK individual de cada mensagem | Cada mensagem mantém seu próprio ACK — sem contaminação cruzada. Rastreia: CA-01 (múltiplos itens) | 🟡 Média |
| CT-ACK-008 | Evento WS de outro usuário não contamina sessão | Dois operadores ativos no mesmo ambiente canary; conta observadora configurada | 1. Operador A abre chat do contato X; 2. Operador B (conta observadora) envia mensagem em outro contato; 3. Verificar que ACKs da conta B não aparecem no chat do contato X do Operador A | ACKs isolados por chatUuid/conta — evento WS de outra conta não atualiza o store do operador atual. Rastreia: isolamento de sessão | 🟡 Média |
| CT-ACK-009 | ACK não regride sem troca de chat | Mensagem com ✓✓ visível; aguardar evento tardio | 1. Enviar mensagem e aguardar ✓✓; 2. Aguardar 15–30 segundos (possível chegada de evento `message-sent` tardio via WS); 3. Observar o ícone continuamente | Ícone permanece em ✓✓ — evento tardio sem `ack` não reverte status. Rastreia: causa raiz 2 (sem troca de chat) | 🟡 Média |
| CT-ACK-010 | Refetch do cache não apaga ACK atual | Mensagem com ✓✓ visível; acesso a DevTools | 1. Enviar mensagem e aguardar ✓✓; 2. Invalidar manualmente cache `CHAT-MESSAGES:` via DevTools; 3. Aguardar refetch automático do TanStack Query; 4. Verificar ACK da mensagem | Após refetch, ACK retorna a ✓✓ pois o cache foi atualizado pelo `useMessageStatusChanged`. Rastreia: causa raiz 1 (cache TanStack Query) | 🟢 Baixa |

---

## Cenários Gherkin (BDD)

### CT-ACK-001 — ACK mantido após troca de chat

```gherkin
Cenário: Status ✓✓ é preservado ao retornar ao chat após navegação
  Dado que o operador está autenticado na Nova Interface
  E está visualizando o chat do contato de teste
  Quando o operador envia uma mensagem de texto
  E aguarda o ícone de ACK atingir ✓✓ (entregue ou lido)
  E navega para um chat diferente
  E retorna ao chat original
  Então a mensagem enviada exibe o ícone ✓✓
  E o ícone não regride para ⏳ ou ✓ simples
```

### CT-ACK-003 — Payload sem `ack` não sobrescreve ACK atualizado

```gherkin
Cenário: Merge parcial preserva ACK ao receber payload incompleto
  Dado que o operador visualiza chat com mensagem já em status ✓✓
  E o campo "ack" foi recebido via evento WebSocket message-status-changed
  Quando um payload de GET /messages chega sem o campo "ack" para essa mensagem
  E o createOrUpdateMessage processa esse payload
  Então o ícone da mensagem permanece em ✓✓
  E os campos ack, error_code e error_message existentes não são sobrescritos
```

---

## Validação LLM

```
✅ Validação LLM: 10 cenários aprovados | 0 revisados | 0 removidos
Cobertura: 2 happy path | 3 negativos/erro | 2 borda | 1 segurança | 2 adicionais (regressão)
Rastreabilidade: todos os cenários vinculados a CA ou causa raiz do card
Assunções documentadas: CT-ACK-003, CT-ACK-005, CT-ACK-010 requerem MOCKS_ENABLED=true
```
