# Cenários de Teste — DEV4-4360
> Card: Falha no limite de distribuição de chats no primeiro login após o horário de início
> Gerado em: 2026-06-09
> Card atualizado em: 2026-06-09T10:37:45.252-0300

---

## Estratégia de Teste

**Escopo:** Bug no algoritmo do `dispatch-service` — a regra de limite de chats no primeiro login não é validada quando o gatilho de disponibilidade do user ocorre após o horário de início da distribuição. Toda verificação requer interação com a UI de configuração (manager) e UI de atendimento (user/operador). Tipos aplicáveis: **funcional** (CA1 — limite respeitado), **regressão** (CA3 — distribuição normal não quebrada), **borda** (fila exata, fila vazia, múltiplos users), **segurança** (isolamento multi-tenant). Prioridade de execução: CT-001 (core fix) → CT-002 (excedente) → CT-003 (regressão) → borda/negativo. Risco principal: reprodução exige configuração de horário agendado + user offline + fila ativa simultaneamente no canary — setup complexo e dependente de timing.

---

## Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Fix não aplicado no canary — bug ainda reproduzível | M | A | 🔴 Alta |
| Cenário de reprodução não replicável no canary (fila + horário + user offline simultâneos) | A | A | 🔴 Alta |
| Fix resolve o bug mas quebra distribuição para users disponíveis antes do horário de início (regressão CA3) | B | A | 🔴 Alta |
| Múltiplos users ficando disponíveis simultaneamente → race condition no dispatch | M | M | 🟡 Média |
| Ambiente canary sem suporte a configuração de horário de início | M | M | 🟡 Média |
| Configurações de distribuição de uma account interferindo em outra | B | A | 🟡 Média |

---

## Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-DISTRIB-001 | Primeiro login pós-horário de início → limite respeitado | Team com 1 user no canary. Configuração de distribuição com horário de início e limite de primeiro login. ⚠️ Bloqueável — funcionalidade de horário de início precisa estar ativa no canary. | 1. Autenticar como manager. 2. Em configurações de distribuição, definir horário de início para daqui a 5 minutos e limite de primeiro login para 5 chats. 3. Garantir que o user do team esteja com status Indisponível. 4. Adicionar 10 chats à fila do team. 5. Confirmar que os 10 chats estão em `waiting`. 6. Aguardar o horário de início ser atingido e ultrapassado. 7. Autenticar como user e alterar status para Disponível. 8. Verificar a contagem de chats atribuídos ao user. | Exatamente 5 chats (o limite configurado) são atribuídos ao user. Os 5 excedentes permanecem na fila. O sistema não despeja toda a fila. *(CA1, RN01, RN02 — cenário exato do bug)* | 🔴 Alta | UI | — |
| CT-DISTRIB-002 | Excedente da fila permanece em `waiting` | CT-DISTRIB-001 executado com sucesso. | 1. Após CT-DISTRIB-001, autenticar como manager e acessar a listagem de chats do team. 2. Filtrar por status `waiting`. 3. Verificar o número de chats ainda na fila. | Exatamente 5 chats permanecem em `waiting` (10 inicial − 5 distribuídos). Nenhum chat excedente foi atribuído ao user automaticamente. *(CA2, RN03)* | 🔴 Alta | UI | CT-DISTRIB-001 |
| CT-DISTRIB-003 | User disponível antes do horário → fila intacta | Horário de início configurado para 30 minutos no futuro. Chats em fila. ⚠️ Resultado baseado em inferência de comportamento existente (pré-fix) — validar com o time se antes do horário a distribuição é suspensa ou opera normalmente. | 1. Configurar horário de início para 30 minutos no futuro e limite para 5 chats. 2. Adicionar 10 chats à fila do team. 3. Alterar user para Disponível antes do horário de início. 4. Verificar imediatamente chats atribuídos ao user. | Nenhum chat distribuído ao user — horário de início ainda não foi atingido. Fila com 10 chats em `waiting`. Fix não afeta cenários fora da janela da condição do bug. *(CA3, RN02 — regressão)* | 🔴 Alta | UI | — |
| CT-DISTRIB-004 | Fila menor que o limite → todos distribuídos | Limite configurado para 10 chats. Apenas 3 chats em fila. Horário de início atingido. User Indisponível. | 1. Configurar limite de primeiro login para 10 chats. 2. Adicionar apenas 3 chats à fila. 3. Aguardar horário de início e alterar user para Disponível. 4. Verificar chats atribuídos e estado da fila. | 3 chats atribuídos ao user. Fila zerada. Fix não restringe indevidamente quando a fila tem menos chats que o limite. *(RN01 — negative: fix não deve sobre-restringir)* | 🟡 Média | UI | — |
| CT-DISTRIB-005 | Fila vazia quando user fica disponível | Horário de início atingido. User Indisponível. Fila do team vazia (0 chats em `waiting`). | 1. Configurar distribuição com horário de início e limite. 2. Garantir fila vazia. 3. Aguardar horário de início e alterar user para Disponível. 4. Verificar estado do sistema. | 0 chats distribuídos ao user. Nenhum erro ou comportamento indefinido. User permanece Disponível aguardando novos chats. *(negative: fila vazia não causa crash)* | 🟡 Média | UI | — |
| CT-DISTRIB-006 | Após limite preenchido, novos chats chegam e são distribuídos *(regressão geral — fora do escopo direto do fix, adicionado para garantir ausência de regressão no ciclo subsequente)* | CT-DISTRIB-001 executado (user com 5 chats — limite preenchido). | 1. Com o user já com 5 chats atribuídos, simular novo chat entrando para o team. 2. Aguardar 30–60 segundos para o sistema processar. 3. Verificar se o novo chat foi atribuído ao user. | Novo chat é atribuído ao user ou permanece em `waiting` para o próximo ciclo. A regra de primeiro login não cria uma restrição permanente sobre o user. Sem crash ou bloqueio de distribuição. *(RN03 — "próximo ciclo"; negative: limite é pontual ao primeiro login)* | 🟡 Média | UI | CT-DISTRIB-001 |
| CT-DISTRIB-007 | Fila exatamente igual ao limite → todos distribuídos | Limite configurado para 5 chats. Exatamente 5 chats em fila. Horário de início atingido. User Indisponível. | 1. Configurar limite de primeiro login para 5 chats. 2. Adicionar exatamente 5 chats à fila. 3. Aguardar horário de início e alterar user para Disponível. 4. Verificar chats atribuídos e estado da fila. | 5 chats atribuídos ao user. Fila zerada (0 em `waiting`). Sem restrição indevida no limite exato. *(borda: correspondência exata fila = limite)* | 🟡 Média | UI | — |
| CT-DISTRIB-008 | Múltiplos users disponíveis pós-horário → primeiro user recebe limite | Team com 2 users. 8 chats em fila. Limite = 3 chats. Ambos Indisponíveis. Horário de início atingido. | 1. Configurar limite de primeiro login para 3. Adicionar 8 chats à fila. 2. Aguardar horário de início. 3. Alterar user 1 para Disponível. 4. Verificar chats atribuídos ao user 1. 5. Alterar user 2 para Disponível. 6. Verificar chats do user 2 e estado da fila. | User 1 recebe até 3 chats (limite do primeiro login). Chats restantes permanecem em `waiting`. ⚠️ O comportamento exato do user 2 (quantidade recebida) é inferido de RN03 e não está explicitamente definido no card — verificar se recebe o excedente respeitando o limite individualmente. *(RN03 — borda: múltiplos users; "entrada de outros operadores")* | 🟡 Média | UI | — |
| CT-DISTRIB-009 | Configurações de distribuição de contas distintas não interferem *(segurança geral — fora do escopo direto do fix, adicionado por iniciativa de QA para validar isolamento multi-tenant)* | Duas contas (A e B) com limites de primeiro login distintos. Acesso de manager a ambas as contas. | 1. Autenticar na conta A, configurar limite = 5 e adicionar 20 chats à fila. 2. Fazer logout da conta A e autenticar na conta B, configurar limite = 10 e adicionar 20 chats à fila. 3. Ativar o user da conta A (alterar para Disponível) e verificar chats recebidos. 4. Ativar o user da conta B e verificar chats recebidos. | Conta A: user recebe 5 chats (conforme seu limite). Conta B: user recebe 10 chats (conforme seu limite). Configurações não se interferem. Isolamento multi-tenant garantido após o fix. *(segurança — RN01 com escopos de account distintos)* | 🟡 Média | UI | — |

---

## Cenários Gherkin (BDD)

```gherkin
Cenário: Limite de primeiro login respeitado quando user fica disponível após horário de início
  Dado que a distribuição está configurada com horário de início em 5 minutos e limite de primeiro login de 5 chats
  E o team possui 1 user com status Indisponível
  E existem 10 chats em `waiting` na fila do team
  Quando o horário de início da distribuição é atingido e ultrapassado
  E o user altera o status para Disponível
  Então somente 5 chats (o limite configurado) são atribuídos ao user
  E os 5 chats excedentes permanecem em `waiting` na fila do team
```

```gherkin
Cenário: Chats excedentes permanecem em waiting após distribuição do limite
  Dado que o CT-DISTRIB-001 foi executado com sucesso
  E o user recebeu exatamente 5 chats (limite do primeiro login)
  Quando o manager acessa a listagem de chats do team filtrada por status "waiting"
  Então a fila exibe exatamente 5 chats restantes
  E nenhum desses chats foi atribuído ao user automaticamente
```

---

## Validação por Agente Crítico

```
✅ Validação por agente crítico concluída:
   Aprovados sem alteração: 4 (CT-DISTRIB-001, CT-DISTRIB-004, CT-DISTRIB-005, CT-DISTRIB-007)
   Revisados: 5 (CT-DISTRIB-002, CT-DISTRIB-003, CT-DISTRIB-006, CT-DISTRIB-008, CT-DISTRIB-009)
   Adicionados por cobertura insuficiente: 0
   Total: 9 cenários
```
