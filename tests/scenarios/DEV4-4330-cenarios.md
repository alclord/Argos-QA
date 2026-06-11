# Cenários de Teste — DEV4-4330
> Card: Duplicidade de chats e falha de entrega para leads da Argentina e México — dígito regional ausente no @c.us
> Gerado em: 2026-06-03
> Card atualizado em: 2026-06-03T07:55:53.735-0300

---

## MÓDULO: CONTATO

## RESUMO DO CARD

O bug afeta leads da Argentina e México que chegam à plataforma sem o dígito regional obrigatório após o DDI (+52 para México, +54 para Argentina). O sistema cria o contato com número incompleto, dispara mensagem automática não entregue, e quando o SDR corrige o número manualmente, o @c.us continua vinculado ao número errado — causando duplicidade de contatos e fragmentação do atendimento em dois chats dessincronizados. A correção exige normalização automática do número na criação do contato, garantindo que o @c.us seja gerado já no formato correto.

---

## BLOCO 1 — Estratégia de Teste

**Escopo:** Normalização automática de números argentinos (+549) e mexicanos (+521) na criação de contatos/leads, geração correta do @c.us, entrega da mensagem inicial e continuidade do chat sem duplicatas. Não inclui outros países nem correção retroativa.

**Tipos de teste:** Funcional (fluxo de criação e edição de contato), Regressão (Brasil e outros países não afetados), Integração (@c.us gerado corretamente e mensagem entregue via WhatsApp), Borda (números já normalizados, números com DDD inválido).

**Prioridade de execução:** Happy paths de normalização ARG/MEX primeiro, seguidos dos testes de regressão Brasil, depois negativos e borda.

**Riscos principais:** Falso positivo na normalização (número já correto sendo alterado), regressão em países não mapeados, duplicidade persistente pós-edição manual, e @c.us desatualizado após correção.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Normalização não aplicada ao criar lead via integração externa (webhook/API terceiro) | A | A | 🔴 Alta |
| @c.us gerado com número incompleto mesmo após normalização do campo | M | A | 🔴 Alta |
| Número já normalizado (+521 ou +549) sofre dupla inserção do dígito regional | M | A | 🔴 Alta |
| Edição manual do número pelo SDR continua gerando duplicata de contato | A | A | 🔴 Alta |
| Regressão em leads brasileiros (+55) com normalização indevida | M | A | 🔴 Alta |
| Mensagem automática disparada para número incompleto antes da normalização | M | A | 🔴 Alta |
| Outros países com DDI similar (+52x ou +54x) afetados erroneamente | B | M | 🟡 Média |
| Lead responde pelo número correto e sistema ainda cria segundo chat | M | A | 🔴 Alta |
| Desativação da mensagem automática para ARG/MEX não funciona como medida preventiva | M | A | 🔴 Alta |
| Normalização não ocorre quando número é editado após criação do contato | M | M | 🟡 Média |

---

## BLOCO 3 — Tabela de Cenários

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-CONTATO-001 | Criação lead México sem dígito "1" normaliza automaticamente | Canal WhatsApp ativo; lead mexicano sem "1" após +52 ⚠️ Bloqueável — criável via API: POST /leads | 1. Criar lead com número +5525636073 (sem "1" após +52). 2. Verificar número salvo no contato. 3. Verificar @c.us gerado. | Número salvo como +5215525636073; @c.us gerado como 5215525636073@c.us; status 201 Created | 🔴 Alta | API | — |
| CT-CONTATO-002 | Criação lead Argentina sem dígito "9" normaliza automaticamente | Canal WhatsApp ativo; lead argentino sem "9" após +54 ⚠️ Bloqueável — criável via API: POST /leads | 1. Criar lead com número +541132456789 (sem "9" após +54). 2. Verificar número salvo. 3. Verificar @c.us gerado. | Número salvo como +5491132456789; @c.us gerado como 5491132456789@c.us; status 201 Created | 🔴 Alta | API | — |
| CT-CONTATO-003 | Mensagem inicial entregue após normalização México | CT-CONTATO-001 concluído com sucesso; template de mensagem automática configurado | 1. Criar lead mexicano sem dígito "1". 2. Aguardar disparo da mensagem automática. 3. Verificar status de entrega na conversa. | Mensagem exibe status "Entregue" ou "Lida"; nenhuma falha de entrega registrada. | 🔴 Alta | UI | CT-CONTATO-001 |
| CT-CONTATO-004 | Mensagem inicial entregue após normalização Argentina | CT-CONTATO-002 concluído com sucesso; template de mensagem automática configurado | 1. Criar lead argentino sem dígito "9". 2. Aguardar disparo da mensagem automática. 3. Verificar status de entrega na conversa. | Mensagem exibe status "Entregue" ou "Lida"; nenhuma falha de entrega registrada. | 🔴 Alta | UI | CT-CONTATO-002 |
| CT-CONTATO-005 | Lead responde após normalização — sem novo chat criado | CT-CONTATO-001 concluído; mensagem entregue | 1. Lead mexicano normalizado responde ao chat. 2. Verificar lista de contatos. 3. Verificar lista de chats. | Resposta chega no mesmo chat existente; nenhum novo contato ou chat criado; total de chats permanece 1. | 🔴 Alta | UI | CT-CONTATO-003 |
| CT-CONTATO-006 | Número México já normalizado não recebe dígito duplicado | Canal WhatsApp ativo | 1. Criar lead com número já correto +5215525636073. 2. Verificar número salvo. 3. Verificar @c.us. | Número salvo como +5215525636073 sem alteração; @c.us correto; sem duplicação do "1". | 🔴 Alta | API | — |
| CT-CONTATO-007 | Número Argentina já normalizado não recebe dígito duplicado | Canal WhatsApp ativo | 1. Criar lead com número já correto +5491132456789. 2. Verificar número salvo. 3. Verificar @c.us. | Número salvo como +5491132456789 sem alteração; sem duplicação do "9". | 🔴 Alta | API | — |
| CT-CONTATO-008 | Lead brasileiro não sofre normalização indevida | Canal WhatsApp ativo | 1. Criar lead com número brasileiro +5511987654321. 2. Verificar número salvo. 3. Verificar @c.us. | Número salvo como +5511987654321 sem modificação; @c.us como 5511987654321@c.us; regressão OK. | 🔴 Alta | API | — |
| CT-CONTATO-009 | Edição manual do número não gera duplicata de contato | Contato existente com número incompleto | 1. Acessar contato com número +5525636073. 2. Editar número para +5215525636073. 3. Salvar. 4. Verificar lista de contatos e chats. | Apenas 1 contato existe; apenas 1 chat ativo; @c.us atualizado para número correto; status 200 OK. | 🔴 Alta | UI | CT-CONTATO-001 |
| CT-CONTATO-010 | Número Mexico com DDI incorreto retorna erro de validação | Canal WhatsApp ativo | 1. Criar lead com número +52abc1234 (não numérico). 2. Verificar resposta da API. | API retorna status 400 Bad Request com mensagem de validação de formato de número. | 🟡 Média | API | — |
| CT-CONTATO-011 | Número Argentina com quantidade de dígitos inválida retorna erro | Canal WhatsApp ativo | 1. Criar lead com +54123 (dígitos insuficientes). 2. Verificar resposta. | API retorna status 400 Bad Request indicando número inválido; nenhum contato criado. | 🟡 Média | API | — |
| CT-CONTATO-012 | Medida preventiva desativa mensagem automática ARG/MEX | Configuração de medida preventiva ativa para ARG e MEX | 1. Criar lead argentino sem dígito "9". 2. Aguardar janela de disparo automático. 3. Verificar se mensagem foi disparada. | Nenhuma mensagem automática enviada para o lead; log de sistema registra supressão por regra preventiva ARG/MEX. | 🔴 Alta | UI | — |
| CT-CONTATO-013 | País não mapeado (+351 Portugal) não afetado pela normalização | Canal WhatsApp ativo | 1. Criar lead com número português +351912345678. 2. Verificar número salvo. 3. Verificar @c.us. | Número salvo sem modificação; @c.us correto; normalização não aplicada. | 🟡 Média | API | — |
| CT-CONTATO-014 | Criação de lead via webhook externo normaliza número México | Integração webhook configurada; payload com número +5525636073 | 1. Enviar payload via webhook com número mexicano sem "1". 2. Verificar contato criado no sistema. 3. Verificar @c.us. | Contato criado com número normalizado +5215525636073; @c.us correto; mensagem entregue. | 🔴 Alta | API | — |
| CT-CONTATO-015 | Endpoint de criação de lead não expõe lógica de normalização em erro | Canal WhatsApp ativo | 1. Enviar requisição POST /leads com payload malformado para lead mexicano. 2. Analisar resposta de erro. | Resposta 400 não expõe stack trace, lógica interna de normalização ou estrutura do banco de dados; mensagem genérica de erro. | 🟡 Média | API | — |
| CT-CONTATO-016 | Número +52 com 10 dígitos (sem DDD longo) normalizado corretamente | Canal WhatsApp ativo | 1. Criar lead mexicano com +5261234567 (8 dígitos após DDI, formato antigo). 2. Verificar resultado. | Sistema aplica normalização ou retorna validação clara; sem comportamento indefinido ou crash. | 🟡 Média | API | — |
| CT-CONTATO-017 | Dois leads do México criados sem dígito "1" geram contatos distintos sem mesclagem indevida | Canal WhatsApp ativo | 1. Criar lead A com +5525636073. 2. Criar lead B com +5598765432. 3. Verificar contatos criados. | Dois contatos distintos normalizados (+5215525636073 e +5215598765432); sem mesclagem; cada um com @c.us único. | 🟡 Média | API | CT-CONTATO-001 |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Funcionalidade: Normalização automática de número regional na criação de lead

  Cenário: Lead do México criado sem dígito "1" tem número normalizado automaticamente
    Dado que o canal WhatsApp está ativo e configurado
    E que existe um lead do México com número "+5525636073" (sem "1" após +52)
    Quando o sistema recebe a requisição de criação do lead via POST /leads
    Então o contato é criado com o número normalizado "+5215525636073"
    E o @c.us gerado é "5215525636073@c.us"
    E a mensagem automática inicial é disparada para o número normalizado
    E o status de entrega da mensagem é "Entregue"
    E nenhum chat duplicado é criado quando o lead responde
```

```gherkin
  Cenário: Lead da Argentina criado sem dígito "9" tem número normalizado automaticamente
    Dado que o canal WhatsApp está ativo e configurado
    E que existe um lead da Argentina com número "+541132456789" (sem "9" após +54)
    Quando o sistema recebe a requisição de criação do lead via POST /leads
    Então o contato é criado com o número normalizado "+5491132456789"
    E o @c.us gerado é "5491132456789@c.us"
    E a mensagem automática inicial é disparada para o número normalizado
    E o status de entrega da mensagem é "Entregue"
    E ao receber resposta do lead, o sistema direciona para o mesmo chat existente
    E nenhum novo contato ou chat duplicado é criado
```

---

## ✅ Validação por Agente Crítico Independente

Referência de estrutura lida. Agora avaliando os cenários do DEV4-4330.

---

## Avaliação por Cenário

**CT-CONTATO-001**
Sem problemas. Rastreável a critério "Lead México sem '1' → normaliza para +521XXXXXXXXXX" e regra "México: inserir '1' após DDI". Fluxo único, executável via API.

**CT-CONTATO-002**
Sem problemas. Rastreável ao critério Argentina e regra "+54 → +549XXXXXXXXXX". Simétrico e necessário.

**CT-CONTATO-003**
Sem problemas. Rastreável ao critério "@c.us gerado com número normalizado → mensagem inicial entregue com sucesso". Dependência correta de CT-CONTATO-001.

**CT-CONTATO-004**
Sem problemas. Simétrico ao CT-CONTATO-003 para Argentina. Rastreável ao mesmo critério de entrega.

**CT-CONTATO-005**
[CT-CONTATO-005] | [Cobertura mínima] | Cobre apenas o cenário México para "resposta sem novo chat". O card menciona explicitamente "Lead responde → resposta chega no mesmo chat" como critério de aceite, mas não há cenário equivalente para Argentina. | Adicionar CT-CONTATO-005B (ou renumerar) cobrindo o mesmo fluxo para lead argentino.

**CT-CONTATO-006**
[CT-CONTATO-006] | [Assunções indevidas] | O número de exemplo +5215525636073 tem 13 dígitos após o "+", resultando em +52 + 1 + 55 + 25636073. O "55" parece ser o DDI do Brasil embutido no número, o que não é um número mexicano válido. O cenário usa dados de teste inconsistentes que podem gerar falso negativo. | Trocar o número de exemplo para +5215512345678 (formato real mexicano: +52 + 1 + área + 8 dígitos) para evitar ambiguidade no dado de teste.

**CT-CONTATO-007**
Sem problemas. Rastreável à regra de não aplicar dupla inserção. Dado de teste coerente.

**CT-CONTATO-008**
Sem problemas. Rastreável ao critério "Contatos brasileiros não afetados pela normalização (regressão)".

**CT-CONTATO-009**
[CT-CONTATO-009] | [Rastreabilidade] | O critério de aceite menciona "edição manual do número não deve criar duplicata de contato ou chat", mas o resultado esperado diz "@c.us atualizado para número correto". O card não estabelece que a edição manual force atualização do @c.us — apenas que não crie duplicata. Assumir que o @c.us é atualizado retroativamente é uma assunção indevida não coberta pelo card. | Remover a asserção "@c.us atualizado para número correto" do resultado esperado. Manter apenas: "Apenas 1 contato existe; apenas 1 chat ativo; status 200 OK."

**CT-CONTATO-010**
[CT-CONTATO-010] | [Assunções indevidas] | O card não menciona validação de formato não numérico. A regra de negócio foca exclusivamente na inserção do dígito regional. Validação de caracteres alfa é comportamento genérico da API, não específico desta correção. | Remover o cenário ou reclassificá-lo como fora do escopo deste card. Não bloqueia a aprovação se mantido como baixa prioridade, mas não possui rastreabilidade direta.

**CT-CONTATO-011**
[CT-CONTATO-011] | [Assunções indevidas] | Mesmo problema do CT-CONTATO-010. Validação de quantidade de dígitos insuficientes não está nos critérios de aceite nem nas regras de negócio do card. | Mesma recomendação: remover ou anotar explicitamente como teste de validação genérica fora do escopo do card.

**CT-CONTATO-012**
[CT-CONTATO-012] | [Rastreabilidade] | O card não menciona "medida preventiva de desativar mensagem automática" nos critérios de aceite. Essa funcionalidade aparece no mapa de riscos como risco ("desativação não funciona"), mas não é um critério de aceite formal entregável neste card. O cenário testa algo que pode não existir no escopo da entrega. | Remover o cenário ou convertê-lo em nota de risco operacional. Se a medida preventiva for uma feature entregável deste card, ela deve estar nos critérios de aceite — não está.

**CT-CONTATO-013**
Sem problemas. Rastreável à regra "normalização aplica APENAS para Argentina (+54) e México (+52)". Dado de Portugal é representativo e suficiente.

**CT-CONTATO-014**
[CT-CONTATO-014] | [Rastreabilidade] | O card menciona o risco de "normalização não aplicada via integração externa" no mapa de riscos, mas não há critério de aceite explícito para webhook. O cenário é válido como cobertura de risco alto, mas o resultado esperado inclui "mensagem entregue" — que seria CT-CONTATO-003 já cobre para criação direta. A asserção de entrega de mensagem extrapola o escopo do cenário (que deveria ser apenas: contato criado com número normalizado via webhook). | Manter o cenário pela criticidade do risco, mas remover "mensagem entregue" do resultado esperado, focando na normalização e @c.us correto.

**CT-CONTATO-015**
[CT-CONTATO-015] | [Cobertura mínima / Execução] | O cenário de segurança é válido (não expor lógica interna em erro). Porém, a asserção "não expõe lógica interna de normalização" exige que o QA conheça o que constitui "lógica interna" — conceito subjetivo sem critério objetivo de pass/fail. | Tornar a asserção objetiva: "Resposta 400 contém apenas campos 'error' e 'message'; ausência de campos 'stack', 'trace', 'query' ou 'normalizer' no corpo da resposta."

**CT-CONTATO-016**
[CT-CONTATO-016] | [Assunções indevidas] | O card define a regra como "+52XXXXXXXXXX → +521XXXXXXXXXX" (inserir "1" após DDI para números sem ele). O cenário usa +5261234567 como "formato antigo com 8 dígitos após DDI". O card não menciona tratamento diferenciado para formatos históricos ou quantidade de dígitos variável. O resultado esperado admite "retorna validação clara ou normalização" — resultado ambíguo não é pass/fail. | Reformular: se o número tem menos de 10 dígitos após o DDI (+52), o sistema retorna 400 indicando número inválido. Ou remover se o card não define comportamento para esse formato.

**CT-CONTATO-017**
Sem problemas. Rastreável à prevenção de duplicidade e regra de que contatos distintos devem permanecer distintos após normalização. Cenário de borda válido.

---

## Problemas Consolidados

| CT-ID | Critério | Problema | Sugestão |
|---|---|---|---|
| CT-CONTATO-005 | Cobertura mínima | Ausência de cenário "resposta sem novo chat" para Argentina | Adicionar CT-CONTATO-005B para Argentina |
| CT-CONTATO-006 | Assunções indevidas | Número de exemplo +5215525636073 contém "55" (DDI Brasil) embutido — dado inconsistente | Trocar para +5215512345678 |
| CT-CONTATO-009 | Assunções indevidas | Resultado esperado asserta que @c.us é atualizado na edição manual — não coberto pelo card | Remover asserção do @c.us atualizado |
| CT-CONTATO-010 | Rastreabilidade | Validação de formato não numérico não está nos critérios de aceite | Remover ou anotar como fora de escopo |
| CT-CONTATO-011 | Rastreabilidade | Validação de dígitos insuficientes não está nos critérios de aceite | Remover ou anotar como fora de escopo |
| CT-CONTATO-012 | Rastreabilidade | Medida preventiva não é critério de aceite entregável no card | Remover ou converter em nota de risco |
| CT-CONTATO-014 | Rastreabilidade | Resultado esperado inclui entrega de mensagem — extrapola escopo do cenário webhook | Remover asserção de entrega de mensagem |
| CT-CONTATO-015 | Execução | Asserção subjetiva "não expõe lógica interna" sem critério objetivo de pass/fail | Tornar asserção objetiva com campos proibidos |
| CT-CONTATO-016 | Assunções indevidas | Resultado esperado admite dois desfechos possíveis — não é pass/fail definido | Definir comportamento único ou remover |

---

## BLOCO 3 — Tabela Revisada Completa

CT-CONTATO-010, CT-CONTATO-011 e CT-CONTATO-012 foram removidos por ausência de rastreabilidade com os critérios de aceite do card. CT-CONTATO-005B adicionado. IDs foram mantidos onde possível; novos inseridos em sequência lógica.

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-CONTATO-001 | Criação lead México sem dígito "1" normaliza automaticamente | Canal WhatsApp ativo; lead mexicano sem "1" após +52 — criável via API: POST /leads | 1. Criar lead com número +5525636073 (sem "1" após +52). 2. Verificar número salvo no contato. 3. Verificar @c.us gerado. | Número salvo como +5215525636073; @c.us gerado como 5215525636073@c.us; status 201 Created | Alta | API | — |
| CT-CONTATO-002 | Criação lead Argentina sem dígito "9" normaliza automaticamente | Canal WhatsApp ativo; lead argentino sem "9" após +54 — criável via API: POST /leads | 1. Criar lead com número +541132456789 (sem "9" após +54). 2. Verificar número salvo. 3. Verificar @c.us gerado. | Número salvo como +5491132456789; @c.us gerado como 5491132456789@c.us; status 201 Created | Alta | API | — |
| CT-CONTATO-003 | Mensagem inicial entregue após normalização México | CT-CONTATO-001 concluído com sucesso; template de mensagem automática configurado | 1. Criar lead mexicano sem dígito "1". 2. Aguardar disparo da mensagem automática. 3. Verificar status de entrega na conversa. | Mensagem exibe status "Entregue" ou "Lida"; nenhuma falha de entrega registrada. | Alta | UI | CT-CONTATO-001 |
| CT-CONTATO-004 | Mensagem inicial entregue após normalização Argentina | CT-CONTATO-002 concluído com sucesso; template de mensagem automática configurado | 1. Criar lead argentino sem dígito "9". 2. Aguardar disparo da mensagem automática. 3. Verificar status de entrega na conversa. | Mensagem exibe status "Entregue" ou "Lida"; nenhuma falha de entrega registrada. | Alta | UI | CT-CONTATO-002 |
| CT-CONTATO-005 | Lead responde após normalização México — sem novo chat criado | CT-CONTATO-001 concluído; mensagem entregue | 1. Lead mexicano normalizado responde ao chat. 2. Verificar lista de contatos. 3. Verificar lista de chats. | Resposta chega no mesmo chat existente; nenhum novo contato ou chat criado; total de chats permanece 1. | Alta | UI | CT-CONTATO-003 |
| CT-CONTATO-005B | Lead responde após normalização Argentina — sem novo chat criado | CT-CONTATO-002 concluído; mensagem entregue | 1. Lead argentino normalizado responde ao chat. 2. Verificar lista de contatos. 3. Verificar lista de chats. | Resposta chega no mesmo chat existente; nenhum novo contato ou chat criado; total de chats permanece 1. | Alta | UI | CT-CONTATO-004 |
| CT-CONTATO-006 | Número México já normalizado não recebe dígito duplicado | Canal WhatsApp ativo | 1. Criar lead com número já correto +5215512345678. 2. Verificar número salvo. 3. Verificar @c.us. | Número salvo como +5215512345678 sem alteração; @c.us correto; sem duplicação do "1". | Alta | API | — |
| CT-CONTATO-007 | Número Argentina já normalizado não recebe dígito duplicado | Canal WhatsApp ativo | 1. Criar lead com número já correto +5491132456789. 2. Verificar número salvo. 3. Verificar @c.us. | Número salvo como +5491132456789 sem alteração; sem duplicação do "9". | Alta | API | — |
| CT-CONTATO-008 | Lead brasileiro não sofre normalização indevida | Canal WhatsApp ativo | 1. Criar lead com número brasileiro +5511987654321. 2. Verificar número salvo. 3. Verificar @c.us. | Número salvo como +5511987654321 sem modificação; @c.us como 5511987654321@c.us; regressão OK. | Alta | API | — |
| CT-CONTATO-009 | Edição manual do número não gera duplicata de contato | Contato existente com número incompleto +5525636073 | 1. Acessar contato com número +5525636073. 2. Editar número para +5215525636073. 3. Salvar. 4. Verificar lista de contatos e chats. | Apenas 1 contato existe; apenas 1 chat ativo; status 200 OK. | Alta | UI | CT-CONTATO-001 |
| CT-CONTATO-010 | País não mapeado (+351 Portugal) não afetado pela normalização | Canal WhatsApp ativo | 1. Criar lead com número português +351912345678. 2. Verificar número salvo. 3. Verificar @c.us. | Número salvo sem modificação; @c.us correto; normalização não aplicada. | Média | API | — |
| CT-CONTATO-011 | Criação de lead via webhook externo normaliza número México | Integração webhook configurada; payload com número +5525636073 | 1. Enviar payload via webhook com número mexicano sem "1". 2. Verificar contato criado no sistema. 3. Verificar @c.us. | Contato criado com número normalizado +5215525636073; @c.us correto. | Alta | API | — |
| CT-CONTATO-012 | Endpoint de criação de lead não expõe lógica de normalização em erro | Canal WhatsApp ativo | 1. Enviar requisição POST /leads com payload malformado para lead mexicano. 2. Analisar corpo da resposta de erro. | Resposta 400 contém apenas campos "error" e "message"; ausência dos campos "stack", "trace", "query" ou "normalizer" no corpo da resposta. | Média | API | — |
| CT-CONTATO-013 | Dois leads do México criados sem dígito "1" geram contatos distintos sem mesclagem indevida | Canal WhatsApp ativo | 1. Criar lead A com +5525636073. 2. Criar lead B com +5598765432. 3. Verificar contatos criados. | Dois contatos distintos normalizados (+5215525636073 e +5215598765432); sem mesclagem; cada um com @c.us único. | Média | API | CT-CONTATO-001 |

---

**Aprovados: 8 | Com problemas: 9 | Sugestões aplicadas: CT-CONTATO-005B (adicionado), CT-CONTATO-006 (dado corrigido), CT-CONTATO-009 (asserção removida), CT-CONTATO-010 (removido/renumerado), CT-CONTATO-011 (removido/renumerado), CT-CONTATO-012 (removido/renumerado), CT-CONTATO-014 (asserção de entrega removida/renumerado), CT-CONTATO-015 (asserção objetivada/renumerado), CT-CONTATO-016 (removido)**
