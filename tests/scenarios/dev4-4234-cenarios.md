# Cenários de Teste — dev4-4234
> Card: Logs
> Gerado em: 2026-05-27
> Card atualizado em: 2026-05-27T08:46:24-03:00

---

## Estratégia de Teste

O card reformula a tela de Logs de Canais para o novo padrão visual da plataforma (Nova Interface — foundation-spa), sem alterar a lógica de negócio subjacente. Tipos de teste: **funcional** (verificação dos novos comportamentos de filtragem, paginação e exibição da coluna 'Alteração'), **regressão** (eventos legados devem continuar sendo exibidos corretamente; controle de acesso pré-existente não deve ser impactado) e **UX** (filtros em tempo real, ausência de badges na coluna 'Alteração', nova coluna 'Canal'). Prioridade: validação da paginação (RN2) e da exibição textual da coluna 'Alteração' primeiro, seguido dos filtros cumulativos (RN1) e dos novos tipos de evento (RN3). Risco principal: filtros em tempo real podem introduzir regressões de performance em contas com alto volume de logs; o comportamento de eventos legados na nova interface precisa de validação explícita.

---

## Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Paginação quebra em contas com alto volume de logs (mais de 1.000 registros) | M | A | 🔴 Alta |
| Coluna 'Alteração' exibe badges em vez de texto para algum tipo de evento | M | A | 🔴 Alta |
| Filtros em tempo real causam sobrecarga ou travamento da UI em contas com muitos canais | M | M | 🟡 Média |
| Eventos legados (pré-nova interface) não aparecem ou aparecem com formatação incorreta | M | M | 🟡 Média |
| Novos tipos de evento (foto, nome, adição/exclusão de usuários) ausentes da tabela | M | M | 🟡 Média |
| Filtros cumulativos retornam conjunto incorreto (união em vez de interseção) | B | M | 🟡 Média |
| Data picker com comportamento inconsistente ao selecionar período sem registros | B | B | 🟢 Baixa |

---

## Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-LOGS-001 | Listagem inicial carrega 15 registros | Canal ativo com pelo menos 16 registros de log na conta de teste. | 1. Autenticar como administrador. 2. Acessar a tela de Logs de Canais. 3. Verificar a quantidade de registros exibidos na primeira carga. 4. Verificar a presença dos controles de paginação. | Exatamente 15 registros são exibidos na primeira página (RN2); controles de paginação estão visíveis e indicam que há mais páginas. | 🔴 Alta | UI | — |
| CT-LOGS-002 | Coluna 'Alteração' exibe texto, não badges | Canal com registros de log de tipos variados visíveis na tela (incluindo pelo menos um dos novos tipos de RN3). | 1. Acessar a tela de Logs. 2. Observar a coluna 'Alteração' em diferentes registros. 3. Verificar o componente visual utilizado para os valores dessa coluna. | Todos os valores da coluna 'Alteração' são exibidos como texto comum (RN3 e UX); nenhum componente de badge, tag ou pill é utilizado nessa coluna. | 🔴 Alta | UI | — |
| CT-LOGS-003 | Filtro sem resultados exibe estado vazio | Acesso à tela de Logs com filtro por Canal disponível. | 1. Acessar a tela de Logs. 2. Aplicar o filtro por um canal que não possui registros no período padrão. 3. Observar o estado da tabela. | A tabela exibe um estado vazio, sem registros (RN1 — filtro aplicado corretamente); a interface permanece responsiva; nenhum estado de carregamento indefinido é exibido. | 🟡 Média | UI | — |
| CT-LOGS-004 | Eventos legados exibem texto na coluna 'Alteração' | Canal com registros de eventos que existiam antes da nova interface (ex: mudanças de status de conexão, erros de webhook) visíveis na tela. | 1. Acessar a tela de Logs. 2. Localizar registros de tipos de evento legados (anteriores à nova interface). 3. Verificar a coluna 'Alteração' nesses registros. | Registros de eventos legados também exibem os valores como texto comum na coluna 'Alteração' (RN3 — consistência com novos tipos); nenhum badge é utilizado, independentemente da origem do evento. | 🟡 Média | UI | CT-LOGS-002 |
| CT-LOGS-005 | Data picker com período sem registros | Acesso à tela de Logs; componente de data range disponível. | 1. Acessar a tela de Logs. 2. Selecionar no date picker um intervalo de datas em que não há registros de log para os canais visíveis. 3. Verificar o comportamento da tabela e da interface. | A tabela reflete o período selecionado (RN1 — filtro por período); nenhum erro de aplicação é exibido; a interface permanece funcional e o estado da tabela é consistente com a ausência de dados no período. | 🟡 Média | UI | — |
| CT-LOGS-006 | Paginação com volume reduzido de registros | Canal com menos de 15 registros de log. ⚠️ Bloqueável — utilizar conta nova ou canal recém-conectado com poucos eventos; confirmar com time de desenvolvimento se há ambiente com volume controlado. | 1. Acessar a tela de Logs de um canal com menos de 15 registros. 2. Verificar a quantidade de registros exibidos. 3. Verificar o estado dos controles de paginação. | Todos os registros disponíveis são exibidos em uma única página (RN2); os controles de paginação refletem o volume real (ex: botão de próxima página desabilitado ou ausente quando não há mais registros). | 🟢 Baixa | UI | — |
| CT-LOGS-007 | Filtros cumulativos reduzem resultados corretamente | Canal com registros de tipos distintos e em períodos diferentes. | 1. Acessar a tela de Logs sem filtros ativos. 2. Aplicar filtro por Canal; verificar resultados. 3. Adicionar filtro por Tipo de Evento; verificar que o conjunto de resultados é uma interseção (RN1). 4. Adicionar filtro por Período; verificar resultado final. | Cada filtro adicional reduz ou mantém o conjunto de resultados; os registros exibidos satisfazem simultaneamente todos os critérios combinados (RN1 — filtros cumulativos); nenhum registro fora da interseção dos critérios é exibido. | 🟡 Média | UI | — |
| CT-LOGS-008 | Operador não acessa a tela de Logs | Usuário autenticado com perfil de operador (sem permissão de administrador). ⚠️ Nota: valida controle de acesso pré-existente que a nova tela deve herdar do Legado. Confirmar com time de desenvolvimento se a regra de acesso é a mesma. | 1. Autenticar como operador. 2. Tentar acessar a tela de Logs via menu de navegação ou URL direta. 3. Verificar o comportamento da interface. | O acesso à tela de Logs é negado ou o menu não é exibido para o operador; nenhum dado de log é exposto; comportamento consistente com a tela equivalente no Legado (regressão de controle de acesso). | 🟡 Média | UI | — |
| CT-LOGS-009 | Filtro por tipo de evento exibe apenas registros do tipo selecionado | Canal com registros de pelo menos dois tipos distintos de evento (ex: alteração de nome e adição de usuário — RN3). | 1. Acessar a tela de Logs sem filtros. 2. Aplicar filtro por um tipo de evento específico (ex: "Alteração de Nome"). 3. Verificar os registros exibidos. | Apenas registros do tipo selecionado são exibidos (RN1 — filtragem por tipo); registros de outros tipos não aparecem na listagem. | 🟡 Média | UI | — |
| CT-LOGS-010 | Coluna 'Canal' exibe a plataforma correta | Canais de plataformas distintas (ex: WhatsApp, Instagram) com registros visíveis na tela. ⚠️ Nota: os valores exatos exibidos na coluna 'Canal' devem ser confirmados com o time de desenvolvimento antes da execução. | 1. Acessar a tela de Logs com registros de canais de plataformas diferentes. 2. Verificar o valor exibido na coluna 'Canal' para cada registro. | A coluna 'Canal' exibe a plataforma correspondente a cada registro (UX — nova coluna); registros de canais distintos exibem valores distintos e identificáveis por plataforma. | 🟡 Média | UI | — |
| CT-LOGS-011 | Limpar filtros restaura listagem completa | Filtros por Canal e Tipo de Evento ativos; listagem exibindo subconjunto reduzido de registros. | 1. Verificar o número de registros exibidos com filtros ativos. 2. Remover todos os filtros ativos. 3. Verificar a listagem resultante. | Após remover os filtros, a listagem exibe todos os registros disponíveis para o período padrão (RN1 — filtros reversíveis); o conjunto de resultados retorna ao estado inicial sem filtros; nenhum filtro residual permanece aplicado. | 🟡 Média | UI | CT-LOGS-007 |

---

## Cenários Gherkin (BDD)

```gherkin
Cenário: Listagem inicial de logs carrega no máximo 15 registros por página
  Dado que existe um canal com mais de 15 registros de log
  E que o usuário está autenticado como administrador
  Quando o usuário acessa a tela de Logs de Canais
  Então no máximo 15 registros são exibidos na primeira página
  E os controles de paginação estão visíveis indicando que há mais páginas
```

```gherkin
Cenário: Coluna 'Alteração' exibe valores em texto comum, sem badges
  Dado que existe um canal com registros de log de tipos variados visíveis na tela
  E que o usuário está autenticado como administrador
  Quando o usuário acessa a tela de Logs de Canais
  Então a coluna 'Alteração' exibe os valores como texto simples
  E nenhum componente de badge, tag ou pill é utilizado nessa coluna
```

---

## Validação por Agente Crítico

✅ Validação por agente crítico concluída:
- Aprovados sem alteração: 4 (CT-LOGS-001, CT-LOGS-002, CT-LOGS-007, CT-LOGS-009)
- Revisados: 6 (CT-LOGS-003, CT-LOGS-004, CT-LOGS-005, CT-LOGS-006, CT-LOGS-008, CT-LOGS-010)
- Adicionados por cobertura insuficiente: 1 (CT-LOGS-011)

---

**Resumo:** 11 cenários — 🔴 2 Alta | 🟡 8 Média | 🟢 1 Baixa | 2 cenários Gherkin
