# Cenários de Teste — DEV4-4183
> Card: Falha ao adicionar canal - Erro na validação de plano
> Gerado em: 2026-05-19

---

## BLOCO 1 — Estratégia de Teste

**Escopo:** Bug no endpoint `POST /verifyLimitSpa` que impede clientes com plano pago ativo de adicionar canais na plataforma. A falha ocorre na leitura de `additional_quantity` para determinados planos do Superlógica (nulo, ausente ou formato inesperado), lançando exceção em vez de tratar o caso graciosamente. Testes cobrem: correção do cliente afetado (`52179`), regressão do cliente controle (`13721`), manutenção do bypass Free Trial e tratamento de edge cases na propriedade `additional_quantity`.

**Tipos de teste:** Funcional (fluxo de adição de canal pós-fix), Regressão (clientes funcionando antes do bug), Integração (endpoint `/verifyLimitSpa` vs. Superlógica), Segurança (dados internos não expostos na resposta de erro).

**Prioridade de execução:** Alta — bug em produção com impacto direto em receita: clientes pagam pelo canal mas não conseguem ativá-lo, gerando atrito em onboarding e exigindo intervenção manual do Suporte como workaround.

**Riscos principais:** Fix corrige customer `52179` mas introduz regressão para `13721`; tratamento de `additional_quantity` nulo libera erroneamente clientes sem cota; workaround Free Trial é removido sem o fix estar completo; mensagem de erro interna ainda exposta no response após deploy.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Customer 52179 continua bloqueado após deploy (fix incompleto) | B | A | 🔴 Alta |
| Regressão: customer 13721 para de conseguir adicionar canal após o fix | B | A | 🔴 Alta |
| Fix libera clientes com cota esgotada (falso positivo — trata null como "sem restrição") | M | A | 🔴 Alta |
| Free Trial passa a ser bloqueado indevidamente após a mudança no tratamento | B | A | 🔴 Alta |
| Endpoint `/verifyLimitSpa` continua retornando `"sucess": false` para planos ativos | B | A | 🔴 Alta |
| Mensagem de erro interna (`additional_quantity`) ainda exposta no response após fix | M | M | 🟡 Média |
| additional_quantity nulo/ausente tratado mas payload de retorno incompleto (campos null no plan) | M | M | 🟡 Média |
| Outros clientes com mesmo padrão de plano do 52179 não cobertos pelo fix | M | M | 🟡 Média |
| Superlógica indisponível — erro não tratado graciosamente (retorna 500 genérico) | B | M | 🟡 Média |
| Workaround Free Trial removido pelo Suporte antes do fix estar em produção | B | B | 🟢 Baixa |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade |
|---|---|---|---|---|---|
| CT-CANAL-001 | Customer 52179 adiciona canal após fix | Customer `52179` com plano ativo no Superlógica; status NÃO alterado para Free Trial; fix deployado | 1. Logar como gestor do customer `52179`. 2. Acessar tela de canais. 3. Clicar em adicionar novo canal. 4. Prosseguir com o fluxo de adição. 5. Verificar conclusão. | Canal adicionado com sucesso. Nenhuma mensagem de erro exibida. Fluxo concluído sem intervenção do Suporte ou alteração para Free Trial. | 🔴 Alta |
| CT-CANAL-002 | `/verifyLimitSpa` retorna payload válido para customer 52179 | Customer `52179` com plano ativo; DevTools abertos na aba Network | 1. Logar como customer `52179`. 2. Acionar adição de canal. 3. Inspecionar requisição `POST /verifyLimitSpa` no DevTools. 4. Verificar corpo da resposta. | Resposta contém `"blocked": false` e objeto `plan` com campos preenchidos (`name`, `additional_price`, `max_quantity_plan`, `current_total`). Sem `"sucess": false` ou `"msg": "Erro ao buscar additional_quantity"`. | 🔴 Alta |
| CT-CANAL-003 | Customer 13721 continua adicionando canal (regressão) | Customer `13721` funcionando antes do fix; fix deployado | 1. Logar como gestor do customer `13721`. 2. Acessar tela de canais. 3. Clicar em adicionar novo canal. 4. Prosseguir com o fluxo. | Canal adicionado com sucesso. Comportamento idêntico ao observado antes do fix. Nenhuma regressão introduzida. | 🔴 Alta |
| CT-CANAL-004 | Endpoint não retorna erro de additional_quantity para plano ativo | Customer com plano pago ativo; acesso à API via DevTools ou Postman | 1. Autenticar como customer com plano ativo. 2. Realizar chamada `POST /verifyLimitSpa`. 3. Verificar o corpo da resposta. | Resposta NÃO contém `{"msg": "Erro ao buscar additional_quantity", "sucess": false}`. Resposta retorna payload válido com dados do plano. | 🔴 Alta |
| CT-CANAL-005 | Free Trial mantém bypass da validação após fix | Customer em status Free Trial; fix deployado | 1. Logar como gestor de customer em Free Trial. 2. Acessar tela de canais. 3. Tentar adicionar canal. 4. Inspecionar resposta do `/verifyLimitSpa`. | Validação bypassada conforme comportamento atual. Resposta retorna `"blocked": false` com campos `plan` nulos (conforme payload documentado no card). Adição de canal prossegue normalmente. | 🔴 Alta |
| CT-CANAL-006 | additional_quantity nulo não bloqueia cliente com plano válido | Ambiente de staging; plano configurado com `additional_quantity: null` no Superlógica | 1. Simular retorno de `additional_quantity: null` para customer com plano ativo. 2. Acionar `/verifyLimitSpa`. 3. Verificar resposta e comportamento na UI. | Sistema não lança exceção. Resposta retornada sem erro. Comportamento de liberação/bloqueio conforme regra de negócio definida pelo Produto (RN03). | 🔴 Alta |
| CT-CANAL-007 | Cliente com cota esgotada ainda é bloqueado corretamente | Customer com plano ativo mas sem cota disponível para novos canais | 1. Logar como gestor de customer com plano ativo e cota de canais esgotada. 2. Tentar adicionar novo canal. 3. Verificar comportamento na UI. | Sistema bloqueia a adição com mensagem adequada. Fix não cria falso positivo liberando clientes sem cota. `"blocked": true` no response. | 🟡 Média |
| CT-CANAL-008 | additional_quantity ausente no payload do Superlógica tratado graciosamente | Staging com mock do Superlógica retornando payload sem o campo `additional_quantity` | 1. Simular resposta do Superlógica sem o campo `additional_quantity`. 2. Acionar `/verifyLimitSpa` para customer com plano ativo. 3. Verificar resposta e logs. | Serviço não lança exceção não tratada. Resposta retornada sem erro. Logs registram o caso para diagnóstico. | 🟡 Média |
| CT-CANAL-009 | Mensagem de erro genérica não exibida para plano válido | Customer com plano ativo pós-fix | 1. Logar como customer com plano ativo. 2. Acionar adição de canal. 3. Verificar se a mensagem "Erro ao buscar informações sobre o seu plano, tente novamente" é exibida. | Mensagem de erro NÃO exibida para clientes com plano válido. UI apresenta fluxo normal de adição de canal. | 🟡 Média |
| CT-CANAL-010 | additional_quantity em formato inesperado não causa exceção | Staging com mock retornando `additional_quantity` como string ou objeto | 1. Simular retorno de `additional_quantity` em formato inesperado (ex: `"sim"`, `{}`, `[]`). 2. Acionar `/verifyLimitSpa`. 3. Verificar comportamento. | Serviço trata o formato inesperado sem lançar exceção não tratada. Fallback aplicado conforme RN03. | 🟡 Média |
| CT-CANAL-011 | Resposta de erro não expõe detalhes internos ao frontend | Qualquer cenário onde `/verifyLimitSpa` encontra erro (ex: Superlógica indisponível); DevTools abertos | 1. Simular erro na chamada ao Superlógica. 2. Acionar `/verifyLimitSpa`. 3. Inspecionar corpo completo da resposta no DevTools. | Response não contém stack trace, nome de propriedades internas (`additional_quantity`), queries ou detalhes de implementação. Mensagem de erro ao usuário é genérica e acionável. | 🟡 Média |
| CT-CANAL-012 | Superlógica indisponível retorna erro tratado | Superlógica simulado como indisponível (timeout ou 500); customer com plano ativo | 1. Simular indisponibilidade do Superlógica. 2. Acionar `/verifyLimitSpa`. 3. Verificar resposta da API e mensagem exibida na UI. | API retorna erro tratado (não 500 sem corpo). UI exibe mensagem de retry acionável. Nenhum crash no serviço. | 🟢 Baixa |
| CT-CANAL-013 | Fluxo completo sem intervenção do Suporte | Customer `52179` pós-fix; nenhuma alteração manual de flag Free Trial | 1. Sem nenhuma alteração manual prévia, logar como customer `52179`. 2. Executar fluxo completo de adição de canal do início ao fim. 3. Confirmar canal ativo na plataforma. | Canal adicionado e ativo sem necessidade de workaround ou contato com o Suporte. Elimina o atrito de onboarding descrito no card. | 🟢 Baixa |

---

## BLOCO 4 — Cenários Gherkin (BDD)

### CT-CANAL-001
```gherkin
Cenário: Customer 52179 adiciona canal após correção do endpoint
  Dado que o customer "52179" possui plano pago ativo e licença válida no Superlógica
  E o status do customer NÃO foi alterado para Free Trial
  E o fix do verifyLimitSpa foi deployado
  Quando o gestor acessa a tela de canais e aciona "adicionar novo canal"
  Então o fluxo de adição é concluído com sucesso
  E nenhuma mensagem de erro é exibida ao usuário
```

### CT-CANAL-002
```gherkin
Cenário: /verifyLimitSpa retorna payload válido para customer 52179
  Dado que o customer "52179" possui plano pago ativo
  Quando a requisição POST /verifyLimitSpa é realizada para este customer
  Então a resposta contém "blocked": false
  E o objeto "plan" contém os campos name, additional_price, max_quantity_plan e current_total preenchidos
  E a resposta NÃO contém "sucess": false ou "msg": "Erro ao buscar additional_quantity"
```

### CT-CANAL-003
```gherkin
Cenário: Customer 13721 não regride após o fix
  Dado que o customer "13721" conseguia adicionar canais antes do fix
  E o fix do verifyLimitSpa foi deployado
  Quando o gestor do customer "13721" aciona a adição de novo canal
  Então o canal é adicionado com sucesso
  E o comportamento é idêntico ao observado antes do fix
```

### CT-CANAL-004
```gherkin
Cenário: Endpoint não retorna erro de additional_quantity para plano ativo
  Dado que o customer possui plano pago ativo no Superlógica
  Quando a chamada POST /verifyLimitSpa é executada
  Então a resposta não contém o campo "msg" com valor "Erro ao buscar additional_quantity"
  E a resposta não contém "sucess": false
```

### CT-CANAL-005
```gherkin
Cenário: Free Trial mantém bypass da validação após o fix
  Dado que o customer está com status Free Trial
  Quando o gestor aciona a adição de canal
  Então a validação de plano é bypassada
  E o campo "blocked" retorna false
  E os campos de "plan" retornam null conforme comportamento atual
  E o canal pode ser adicionado normalmente
```

### CT-CANAL-006
```gherkin
Cenário: additional_quantity nulo não bloqueia customer com plano válido
  Dado que o Superlógica retorna "additional_quantity": null para o plano do customer
  E o customer possui plano pago ativo
  Quando o /verifyLimitSpa é chamado para este customer
  Então nenhuma exceção é lançada pelo serviço
  E a resposta não contém "sucess": false
  E o fluxo de adição de canal não é bloqueado por erro de validação
```

---

## Sugestões para o QA

### Automação

| Cenário | ROI | Justificativa |
|---|---|---|
| CT-CANAL-001 + CT-CANAL-002 | ⭐⭐⭐⭐⭐ Muito Alto | Happy path crítico com customer ID específico — ideal como smoke test pós-deploy. Automatizar com chamada direta ao `/verifyLimitSpa` + validação do payload de resposta. |
| CT-CANAL-003 | ⭐⭐⭐⭐⭐ Muito Alto | Regressão com customer `13721` como controle. Custo baixo: já tem o payload esperado documentado no card. Deve rodar a cada deploy. |
| CT-CANAL-004 | ⭐⭐⭐⭐ Alto | Verificação de contrato: garantir que a resposta nunca contém `"sucess": false` para plano ativo. Automatizável como assertion sobre o schema da resposta. |
| CT-CANAL-006 + CT-CANAL-008 | ⭐⭐⭐ Médio | Edge cases de null/ausente requerem mock do Superlógica, mas protegem contra regressões futuras se o Superlógica mudar o schema de resposta. |

### Boas Práticas
- Executar CT-CANAL-001 e CT-CANAL-003 **juntos e na mesma rodada de teste** — a diferença entre os dois customers é a chave para isolar se o fix é específico ou genérico. Se apenas `52179` for corrigido sem `13721` regredir, o fix está correto.
- Para os cenários de `additional_quantity` nulo/ausente (CT-CANAL-006, CT-CANAL-008), confirmar com o time de backend qual é o comportamento esperado (liberar ou bloquear) antes de escrever a assertion do resultado esperado — o card menciona o tratamento mas não define explicitamente o resultado de negócio para esses casos.
- Verificar no Superlógica se há outros customers com o mesmo padrão de plano do `52179` — se houver um grupo, criar uma fixture parametrizada para validar que todos foram corrigidos, não apenas o customer de referência.
- Para CT-CANAL-011 (exposição de dados internos), inspecionar o campo `message` ou `msg` em todos os cenários de erro — o campo `"msg": "Erro ao buscar additional_quantity"` do bug original revela nome de propriedade interna, o que é um leak de implementação.

### Monitoramento Pós-deploy
- Monitorar a taxa de retornos `"sucess": false` no `/verifyLimitSpa` — meta: **0 após o fix** (conforme tabela de métricas do card).
- Acompanhar o volume de tickets de suporte com workaround Free Trial nas primeiras 48h — redução a zero confirma que o fix cobriu o universo de clientes afetados.
- Criar alerta no monitoramento para qualquer resposta `"msg": "Erro ao buscar additional_quantity"` que apareça em produção — indica regressão imediata se surgir após o deploy.
