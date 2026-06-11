# Cenários de Teste — DEV4-4289
> Card: Bot/URA não é acionado na primeira mensagem de contatos importados via Carteira
> Gerado em: 2026-06-01
> Card atualizado em: 2026-06-01T10:24:39 BRT

---

## Estratégia de Teste

Bug de médio impacto e alto alcance: afeta todos os customers com carteiras + bot configurado. O método `useOpenChatEvent()` em `MessageReceiverController.php` não contempla o caso "contato existe no banco mas nunca teve chat". A correção adiciona a condição `contact_never_chatted`. Foco: validar o fix sem quebrar os 4 cenários existentes que já funcionavam. Tipos: funcional (fix), regressão (3 cenários), negativo (atendimento ativo não aciona bot), integração (automatic-actions) e segurança (tenant isolation). Prioridade: CT-BOT-001 → CT-BOT-005 → CT-BOT-003 → CT-BOT-004 → demais.

---

## Mapa de Riscos

| Risco | Probabilidade | Impacto | Prioridade |
|---|---|---|---|
| Fix aciona bot em contatos com atendimento ativo (falso positivo) | M | A | 🔴 Alta |
| `automatic-actions` não recebe `OPEN-CHAT-REC` mesmo após fix | M | A | 🔴 Alta |
| Regressão em contatos orgânicos (`new_contact = true`) | B | A | 🔴 Alta |
| Regressão em contatos com chat fechado (`contact_closed = true`) | B | A | 🔴 Alta |
| Isolamento de tenant comprometido pelo novo critério | B | A | 🟡 Média |
| `chat_id = NULL` na primeira mensagem causa falha em queries downstream | M | B | 🟢 Baixa |

---

## Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-BOT-001 | Contato importado aciona bot na 1ª mensagem | Canal com bot/URA configurado; contato importado via Carteira (existe no banco, nunca teve chat). Referência Alpha: canal cc 55468, bot `7735fa26-3b56-48b9-8f48-a3febc8bdb9e`, contato ID 99023017. | 1. Acessar Configurações Gerais → Carteiras → Importar Contatos e fazer upload de planilha com o contato alvo. 2. Aguardar importação concluída. 3. Enviar mensagem WhatsApp para o canal a partir do número do contato importado. 4. Observar painel de atendimento e resposta no WhatsApp. | Bot/URA aciona e resposta automática aparece no chat em até 10s; chat criado com status `bot`; mensagem de boas-vindas visível no painel. | 🔴 Alta | UI | — |
| CT-BOT-002 | `started_by_bot` persistido após acionamento | CT-BOT-001 executado com sucesso; endpoint ou mecanismo de verificação do campo `started_by_bot` a confirmar com o time de dev. | 1. Após CT-BOT-001, verificar o campo `started_by_bot` do contato via mecanismo disponível (API ou painel admin). 2. Registrar o valor retornado. | `started_by_bot = 1` persistido corretamente no banco/API. Valida CA-2 do card. | 🔴 Alta | API | CT-BOT-001 |
| CT-BOT-003 | Contato orgânico ainda aciona bot (regressão) | Canal com bot configurado; número de contato que **nunca existiu** no banco. | 1. Enviar mensagem WhatsApp para o canal a partir de um número nunca visto pelo sistema. 2. Observar resposta automática no painel. | Bot aciona normalmente; resposta automática visível; comportamento idêntico ao de antes do fix. Regressão — `new_contact = true` era coberto pela condição existente e deve continuar funcionando. | 🔴 Alta | UI | — |
| CT-BOT-004 | Contato com chat resolvido aciona bot ao reabrir (regressão) | Canal com bot configurado; contato com ao menos um chat em status `resolved` no histórico. | 1. Enviar mensagem WhatsApp para o canal a partir do contato que já teve chat resolvido. 2. Observar resposta automática no painel. | Bot aciona normalmente; novo chat criado com status `bot`; resposta automática visível. Regressão — `contact_closed = true` era coberto pela condição existente e deve continuar funcionando. | 🔴 Alta | UI | — |
| CT-BOT-005 | Contato em atendimento ativo NÃO aciona bot | Canal com bot configurado; contato com chat em status `attending` (atendente ativo respondendo). | 1. Verificar que o chat do contato está com status `attending` e atendente atribuído. 2. Enviar nova mensagem WhatsApp para o canal a partir desse contato. 3. Aguardar 15s e observar painel. | Bot NÃO aciona; mensagem chega normalmente ao chat existente do atendente; sem nova resposta automática; nenhum novo chat criado. | 🔴 Alta | UI | — |
| CT-BOT-006 | Contato importado em canal sem bot vai para fila | Conta com canal **sem** bot configurado; contato importado via Carteira. | 1. Importar contato via Carteira em conta com canal sem bot configurado. 2. Contato envia primeira mensagem para esse canal. 3. Observar painel. | Chat criado em status `waiting` (fila); sem resposta automática; contato disponível para atendimento manual. Regressão preventiva: a nova condição `contact_never_chatted` não deve alterar o comportamento em canais sem bot. | 🟡 Média | UI | — |
| CT-BOT-007 | Segunda mensagem com chat em `bot` não re-aciona bot | CT-BOT-001 executado com sucesso; chat em status `bot`. | 1. Com chat do contato em status `bot`, o contato envia segunda mensagem. 2. Observar painel. | Segunda mensagem é adicionada ao chat existente; bot não é reiniciado; nenhum novo chat criado. Regressão: `contact_never_chatted` deve ser falso após a primeira interação — a condição não deve re-acionar o bot numa segunda mensagem. | 🟡 Média | UI | CT-BOT-001 |
| CT-BOT-009 | `automatic-actions` recebe `OPEN-CHAT-REC` após fix | Canal com automação configurada via `automatic-actions` (ex: envio de tag ou mensagem de boas-vindas ao abrir chat); contato importado via Carteira. ⚠️ Bloqueável — requer automação com efeito observável configurado no canal. | 1. Importar contato via Carteira. 2. Contato envia primeira mensagem para o canal. 3. Verificar se a automação associada ao evento de abertura de chat foi executada (ex: tag aplicada ao contato, mensagem de sistema no chat). | Automação executa; efeito observável visível no painel. Justificativa: o card (seção 7) documenta explicitamente que `automatic-actions` **nunca recebe o trigger `OPEN-CHAT-REC`** devido ao bug — após o fix, este trigger deve ser entregue corretamente. | 🟡 Média | UI | CT-BOT-001 |
| CT-BOT-010 | Reprodução do cenário real (customer 51921 / SM-3934) | Staging com as seguintes configurações equivalentes ao caso de produção: canal WhatsApp com bot/URA configurado (equivalente ao cc 55468); contato criado via importação de Carteira que nunca enviou mensagem (equivalente ao contact 64719764 — "Teste Contato Encarteirado"); bot esperado configurado no canal. | 1. Criar contato com perfil equivalente ao case de produção via importação de Carteira. 2. Enviar mensagem para o canal com bot. 3. Verificar acionamento do bot e resposta automática. | Bot aciona; resposta automática visível; confirma resolução do incidente SM-3934. Referência explícita ao CA-6 do card. | 🟡 Média | UI | — |
| CT-BOT-011 | Isolamento multi-tenant preservado após fix | Dois accounts distintos (A e B) com bots configurados em canais diferentes; contato importado somente no account A. | 1. Contato importado no account A envia mensagem para o canal do account A. 2. Verificar via painel do account B se algum chat, trigger ou resposta automática foi gerada indevidamente. | Apenas o bot do account A aciona; account B não registra nenhum chat ou ação automática originada do contato do account A. Justificativa: nova condição `contact_never_chatted` deve consultar dados filtrados por `account_id` — risco de regressão de isolamento de tenant em qualquer nova query. | 🟡 Média | UI + API | — |

---

## Cenários Gherkin (BDD)

```gherkin
Cenário: Contato importado via Carteira aciona bot na primeira mensagem
  Dado que um canal está configurado com bot/URA ativo
  E que um contato foi importado via planilha em Configurações Gerais > Carteiras > Importar Contatos
  E que esse contato nunca enviou mensagem anterior para o canal
  Quando o contato envia a primeira mensagem WhatsApp para o canal
  Então o bot/URA responde automaticamente em até 10 segundos
  E o chat é criado com status "bot"
  E uma resposta automática é visível no painel de atendimento
```

```gherkin
Cenário: Contato em atendimento ativo não aciona bot ao enviar nova mensagem
  Dado que um canal está configurado com bot/URA ativo
  E que o contato possui um chat em status "attending" com atendente atribuído
  Quando o contato envia uma nova mensagem WhatsApp para o canal
  Então a mensagem é entregue ao chat existente do atendente
  E o bot não é acionado
  E nenhum novo chat é criado para o contato
```

---

## Resumo

- 🔴 Alta: 5 cenários (CT-BOT-001, CT-BOT-002, CT-BOT-003, CT-BOT-004, CT-BOT-005)
- 🟡 Média: 4 cenários (CT-BOT-006, CT-BOT-007, CT-BOT-009, CT-BOT-010, CT-BOT-011)
- 🟢 Baixa: 0 cenários
- **Total: 10 cenários | 2 cenários Gherkin**
- ✅ Validação por agente crítico: 2 aprovados sem alteração | 7 revisados | 2 removidos (CT-BOT-008, CT-BOT-012)
