# Cenários de Teste — DEV4-4247
> Card: Descompasso de estado ao remover etiquetas de contatos na Nova Interface
> Gerado em: 2026-05-28
> Card atualizado em: 2026-05-26T14:18:56 -0300

---

## Resumo do Card

- **Tipo:** Bug
- **Prioridade:** Medium
- **Status:** Aguardando Cenários de Teste
- **Objetivo:** Ao remover uma etiqueta de um contato na Nova Interface, o painel lateral de Definições exibe um "efeito bumerangue": a etiqueta some por milissegundos e reaparece. A operação é processada corretamente no backend (listagem de chats atualiza corretamente), mas o componente lateral realiza um re-fetch prematuro que sobrescreve o estado local correto com dados desatualizados. A correção deve sincronizar o estado do painel lateral com o da listagem, eliminando a necessidade de recarregar a página ou repetir a ação.

---

## BLOCO 1 — Estratégia de Teste

O escopo cobre a correção do "efeito bumerangue" no painel lateral de Definições da Nova Interface: após remoção de etiqueta, o componente realiza re-fetch prematuro que sobrescreve o estado local correto. Tipos de teste aplicáveis: **funcional** (remoção definitiva sem bumerangue), **regressão** (adição de etiquetas e toast intactos), **consistência de estado** (listagem × painel lateral), **tratamento de erro** (API failure não remove UI, latência alta não dispara remoção prematura) e **segurança** (endpoint sem auth). Prioridade de execução: CT-ETIQ-001 (remoção sem bumerangue) e CT-ETIQ-002 (consistência entre componentes) primeiro — são os critérios de aceite diretos do bug. Risco principal: fix que resolve o painel mas cria nova inconsistência com a listagem, ou que remove a etiqueta da UI mesmo quando a API falha ou retorna dados antes da propagação.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Fix corrige o painel lateral mas cria nova inconsistência com a listagem de chats | M | A | 🔴 Alta |
| Re-fetch após remoção ainda sobrescreve estado em condições de latência alta | M | A | 🔴 Alta |
| Falha na API de remoção remove a etiqueta da UI mesmo sem confirmação do backend | B | A | 🟡 Média |
| Fix introduz regressão no fluxo de adição de etiquetas | B | M | 🟡 Média |
| Bumerangue reaparece ao navegar entre chats e retornar ao mesmo contato | M | M | 🟡 Média |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-ETIQ-001 | Etiqueta some definitivamente na 1ª tentativa | Usuário autenticado na Nova Interface; chat ativo com contato que possui ao menos 1 etiqueta vinculada — ⚠️ Bloqueável — vincular etiqueta via UI antes da execução | 1. Abrir um chat na Nova Interface. 2. Verificar que a etiqueta está visível no painel lateral de Definições. 3. Clicar para remover a etiqueta. 4. Aguardar o toast de conclusão. 5. Observar o painel lateral por ao menos 3 segundos. | A etiqueta desaparece imediatamente do painel lateral e não reaparece (sem efeito bumerangue). O toast "Contato atualizado com sucesso" é exibido. A remoção é concluída na primeira tentativa, sem necessidade de repetir a ação ou recarregar a página. | 🔴 Alta | UI | — |
| CT-ETIQ-002 | Listagem e painel lateral consistentes após remoção | Usuário autenticado; chat com contato que possui ao menos 1 etiqueta vinculada; ícone da etiqueta visível na listagem de chats | 1. Verificar que a etiqueta está visível tanto no painel lateral de Definições quanto como ícone na listagem de chats. 2. Clicar para remover a etiqueta no painel lateral. 3. Verificar o estado do painel lateral. 4. Verificar o estado da listagem de chats. | Tanto o painel lateral quanto a listagem exibem o mesmo estado: sem a etiqueta removida. Não há discrepância entre os dois componentes — ambos refletem a remoção definitivamente. | 🔴 Alta | UI | CT-ETIQ-001 |
| CT-ETIQ-003 | Adição de etiquetas não regride após o fix | Usuário autenticado; chat com contato sem etiquetas vinculadas; ao menos 1 etiqueta disponível para vincular na conta | 1. Abrir o chat na Nova Interface. 2. No painel lateral de Definições, clicar para adicionar uma etiqueta. 3. Selecionar uma etiqueta disponível. 4. Verificar o painel lateral de Definições. | A etiqueta aparece imediatamente no painel lateral de Definições. O toast de sucesso é exibido. O fluxo de adição funciona normalmente, sem regressão causada pelo fix. | 🟡 Média | UI | — |
| CT-ETIQ-004 | Falha na API mantém etiqueta no painel | Usuário autenticado; chat com contato que possui etiqueta vinculada; DevTools disponível para bloquear a request de remoção (Network → Block request URL, identificada ao executar a remoção uma vez antes) — alternativa: solicitar ao time de backend que simule retorno de erro no ambiente de homologação | 1. Identificar a URL da request de remoção de etiqueta via DevTools → Network. 2. Configurar o DevTools para bloquear essa URL. 3. Clicar para remover a etiqueta no painel lateral. 4. Observar o comportamento. | A etiqueta permanece visível no painel lateral — não é removida da UI mesmo que temporariamente. O painel não exibe estado inconsistente. A interface indica falha ao usuário de alguma forma (mensagem ou ausência de toast de sucesso). O comportamento exato da mensagem de erro deve ser confirmado com o time de desenvolvimento antes da execução. | 🔴 Alta | UI | — |
| CT-ETIQ-005 | Reabrir painel lateral mantém estado pós-remoção | Usuário autenticado; chat com contato que possui etiqueta vinculada | 1. Remover a etiqueta no painel lateral (CT-ETIQ-001 aprovado). 2. Fechar o painel lateral de Definições ou navegar para outra seção dentro do mesmo chat. 3. Reabrir o painel lateral de Definições do mesmo contato. 4. Verificar o estado da etiqueta. | A etiqueta continua ausente ao reabrir o painel. O estado correto persiste mesmo após fechar e reabrir o componente. O bumerangue não ocorre ao remontar o painel. | 🟡 Média | UI | CT-ETIQ-001 |
| CT-ETIQ-006 | Bumerangue ausente ao navegar entre chats e retornar | Usuário autenticado; ao menos 2 chats ativos; contato do Chat A com etiqueta vinculada | 1. Abrir o Chat A na Nova Interface. 2. Remover a etiqueta do contato no painel lateral. 3. Confirmar que a etiqueta sumiu sem bumerangue. 4. Clicar em outro chat (Chat B). 5. Retornar ao Chat A. 6. Verificar o painel lateral de Definições do Chat A. | Ao retornar ao Chat A, a etiqueta permanece ausente. A navegação entre chats não reaciona o bug. O estado é consistente com a operação realizada antes da navegação. | 🟡 Média | UI | CT-ETIQ-001 |
| CT-ETIQ-007 | Remoção da última etiqueta deixa painel funcional | Usuário autenticado; contato com exatamente 1 etiqueta vinculada — ⚠️ Bloqueável — garantir que apenas 1 etiqueta está vinculada antes da execução | 1. Abrir o chat cujo contato tem exatamente 1 etiqueta vinculada. 2. Verificar o painel lateral: apenas 1 etiqueta visível. 3. Remover essa única etiqueta. 4. Verificar o painel lateral após a remoção. | A etiqueta desaparece imediatamente. O painel lateral não exibe erro e permanece funcional. Toast de sucesso exibido. — borda: testa o comportamento do componente após remover o único item vinculado. | 🟡 Média | UI | CT-ETIQ-001 |
| CT-ETIQ-008 | Remover uma etiqueta não afeta as demais | Usuário autenticado; contato com ao menos 2 etiquetas distintas vinculadas — ⚠️ Bloqueável — vincular 2 etiquetas antes da execução | 1. Abrir o chat cujo contato tem 2 ou mais etiquetas. 2. Confirmar que ambas as etiquetas são visíveis no painel lateral. 3. Remover apenas a Etiqueta A. 4. Verificar o painel lateral após a remoção. | Apenas a Etiqueta A desaparece. A Etiqueta B permanece visível e intacta. Nenhuma etiqueta exibe bumerangue. — borda: valida que o fix não afeta etiquetas não-removidas no mesmo componente. | 🟡 Média | UI | CT-ETIQ-001 |
| CT-ETIQ-009 | Endpoint de remoção retorna 401 sem autenticação | DevTools disponível para identificar a URL e método HTTP da request de remoção (via Network em sessão autenticada) — executável apenas por QA com perfil técnico ou acesso a ferramentas de API (Postman ou similar) — nota: cenário de segurança transversal, não derivado diretamente do card | 1. Em sessão autenticada, via DevTools → Network, identificar a request disparada ao remover uma etiqueta (método HTTP, URL e payload). 2. Disparar a mesma request sem o header `Authorization` (ex: Postman ou fetch no console do browser). 3. Verificar a resposta. | HTTP 401 Unauthorized. A remoção não é executada no backend. A etiqueta permanece vinculada ao contato. | 🔴 Alta | API | — |
| CT-ETIQ-010 | Remoção sem permissão de edição de contato é bloqueada | Usuário autenticado com perfil sem permissão de edição de contatos (verificar com o time de produto qual role ou permissão se aplica) — ⚠️ Bloqueável — confirmar existência de perfil restrito no ambiente de staging | 1. Logar na Nova Interface com o usuário sem permissão de edição de contatos. 2. Abrir um chat cujo contato possui uma etiqueta vinculada. 3. Verificar o painel lateral de Definições. 4. Tentar remover a etiqueta (se o controle estiver visível). | O botão ou controle de remoção de etiqueta não está disponível para esse perfil, ou a tentativa exibe mensagem de permissão insuficiente. A etiqueta permanece vinculada. Nenhuma remoção é processada no backend. — negativo: valida controle de acesso ao fluxo de remoção. | 🟡 Média | UI | — |
| CT-ETIQ-011 | Latência alta não dispara remoção prematura na UI | Usuário autenticado; chat com contato que possui etiqueta vinculada; DevTools disponível para simular rede lenta (Network → Throttle → Slow 3G ou similar) | 1. Abrir DevTools → Network e ativar throttle para conexão lenta (ex: Slow 3G). 2. Clicar para remover a etiqueta no painel lateral. 3. Observar o painel lateral durante o período de loading (antes da resposta da API chegar). 4. Aguardar a conclusão da request. 5. Verificar o estado final do painel. | Durante o período de carregamento, a etiqueta NÃO é removida prematuramente da UI antes da confirmação do backend. Após a resposta de sucesso, a etiqueta desaparece definitivamente. Nenhum bumerangue ocorre. — negativo: diretamente relacionado à causa raiz (re-fetch prematuro); valida que o fix é robusto a condições de latência. | 🟡 Média | UI | — |

**Resumo:** 11 cenários — 🔴 4 Alta | 🟡 7 Média | 🟢 0 Baixa

---

## BLOCO 4 — Cenários Gherkin (BDD)

Os dois cenários 🔴 Alta mais diretamente relacionados ao bug:

```gherkin
Cenário: Etiqueta removida desaparece definitivamente do painel lateral na primeira tentativa
  Dado que o usuário está autenticado na Nova Interface
  E que o contato do chat possui ao menos uma etiqueta vinculada visível no painel lateral de Definições
  Quando o usuário clica para remover a etiqueta
  Então a etiqueta desaparece imediatamente do painel lateral
  E o toast "Contato atualizado com sucesso" é exibido
  E a etiqueta não reaparece após a ação
  E não é necessário recarregar a página ou repetir a ação
```

```gherkin
Cenário: Falha na API de remoção mantém a etiqueta visível no painel lateral
  Dado que o usuário está autenticado na Nova Interface
  E que o contato do chat possui ao menos uma etiqueta vinculada
  E que o endpoint de remoção de etiqueta está bloqueado para retornar erro
  Quando o usuário clica para remover a etiqueta
  Então a etiqueta permanece visível no painel lateral de Definições
  E o painel não remove a etiqueta temporariamente nem exibe estado inconsistente
  E a interface indica ao usuário que a operação não foi concluída
```

---

## Validação por Agente Crítico Independente

- Aprovados sem alteração: 5 (CT-ETIQ-001, CT-ETIQ-002, CT-ETIQ-005, CT-ETIQ-006, CT-ETIQ-008)
- Revisados: 4 (CT-ETIQ-003, CT-ETIQ-004, CT-ETIQ-007, CT-ETIQ-009)
- Adicionados por cobertura insuficiente: 2 (CT-ETIQ-010, CT-ETIQ-011)
