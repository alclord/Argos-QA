# Cenários de Teste — DEV4-4288
> Card: Automações
> Gerado em: 2026-06-01
> Card atualizado em: 2026-06-01T11:07:07.787-0300

---

## PASSO 0.5 — Resumo do Card

- **Título:** Automações
- **Tipo:** História
- **Prioridade:** Medium
- **Status:** Aguardando Cenários de Teste
- **Atualizado em:** 2026-06-01T11:07:07.787-0300
- **Épico pai:** DEV4-4166 — Nova Estrutura de Páginas na Nova Interface da Poli
- **Objetivo:** Atualizar visualmente a tela principal de Automações (página de listagem/index) para o novo Design System, substituindo a interface legada. O usuário pode visualizar, buscar, filtrar, ativar/desativar, duplicar e excluir automações de forma padronizada e mais legível.
- **Escopo — O que está incluído:**
  - Tabela de listagem com colunas: Nome da Automação, Tipo/Categoria, Data de Modificação, Status
  - Badges de status puramente informativos: Ativo (verde/success) e Inativo (cinza/neutral)
  - Campo de busca por texto que filtra pelo Nome da Automação em tempo real
  - Seletor de filtros com componente combobox (pesquisa dentro das opções)
  - Empty State com botão "Criar primeira automação"
  - Funcionalidade de duplicar automação (mesmo canal ou outro canal, com renaming)
  - Funcionalidade de excluir/desativar com diálogo de confirmação (AlertDialog destrutivo)
  - Botão "Editar" que redireciona para o construtor de fluxos correspondente
  - Ordenação padrão: editadas mais recentemente no topo
  - Bots excluídos exibem badge "Inativo" e não podem ser reativados
- **Escopo — O que NÃO está incluído:**
  - Atualização visual do construtor de fluxos (builder)
- **Regras de Negócio identificadas:**
  1. RN1 — A listagem consolida todos os tipos de automação da conta em uma única visualização
  2. RN2 — Campo de busca por texto filtra pelo Nome da Automação conforme o usuário digita (tempo real)
  3. RN3 — Excluir automação exige confirmação via `<AlertDialog>` com variante destrutiva
  4. RN4 — Botão "Editar" redireciona para o construtor de fluxos correspondente
  5. RN5 — Ordenação padrão: automações editadas mais recentemente ficam no topo
  6. RN6 — Badge de status é puramente informativo (sem ação de clique); Ativo = success (verde); Inativo = neutral (cinza)
  7. RN7 — Bots excluídos exibem badge "Inativo" e não podem ser reativados enquanto estiverem excluídos
  8. RN8 — Duplicar: por padrão seleciona "duplicar nesse canal" com nome "cópia" no final; campo editável; opção alternativa "Duplicar para outro canal" exibe seletor de canal
  9. RN9 — Empty State: conta sem automações exibe componente ilustrado com botão "Criar primeira automação"
- **Critérios de Aceite identificados:** A ser preenchido pelo time de QA (seção 6 do card)
- **Subtasks / dependências:** Nenhuma

### Perguntas para o Produto

> ❓ **Filtro por tipo/categoria:** O seletor de filtros (combobox) filtra apenas por tipo/categoria ou também por status? Quais são as opções disponíveis?
> _Por que importa:_ Define quantos cenários de filtragem precisam ser cobertos e quais combinações são válidas.

> ❓ **Desativar vs. Excluir:** Desativar apenas altera o status para "Inativo" (reversível) ou é equivalente a excluir? Qual o comportamento exato de cada ação?
> _Por que importa:_ Impacta se é necessário cobrir reativação após desativação e se há distinção de fluxo entre as duas ações.

> ❓ **Duplicar para outro canal:** Ao duplicar para outro canal, a automação fica com status "Ativo" ou "Inativo" por padrão no canal destino?
> _Por que importa:_ Define o resultado esperado do cenário de duplicação cruzada de canal.

> ❓ **Paginação:** A listagem tem paginação ou scroll infinito?
> _Por que importa:_ Cria requisito de teste para contas com volume elevado de automações.

---

## BLOCO 1 — Estratégia de Teste

Feature de migração visual do sistema legado para o novo Design System, com impacto direto na gestão diária de automações por gestores e administradores. Tipos de teste aplicáveis: **funcional** (listagem, busca, filtro, ações CRUD), **regressão** (substituição da tela legada não quebra funcionalidades existentes de ativação/desativação), **UX** (empty state, ordenação, badges informativos, confirmação antes de exclusão) e **segurança** (XSS no campo de busca, acesso a ações destrutivas). Prioridade de execução: fluxo de exclusão com AlertDialog (RN3 — irreversível), busca em tempo real (RN2) e regra de bots excluídos não reativáveis (RN7). Risco principal: exclusão sem confirmação ou bot excluído sendo reativado constituem perda de configuração crítica de atendimento.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Exclusão de automação sem exibir AlertDialog de confirmação | M | A | Alta |
| Bot excluído exibe opção de reativação indevidamente | M | A | Alta |
| Busca em tempo real não filtra ou filtra com delay excessivo | M | M | Alta |
| Duplicar para outro canal não exibe seletor de canal | B | A | Alta |
| Regressão: desativar automação ativa no legado não refletido na nova tela | M | A | Alta |
| XSS injetado no campo de busca executado na listagem | B | A | Alta |
| Ordenação padrão por última edição invertida ou ausente | M | M | Média |
| Badge clicável dispara ação indevida (violação RN6) | B | M | Média |
| Duplicar automação cria cópia com nome incorreto ou sem sufixo | M | M | Média |
| Empty state ausente para conta sem automações | B | M | Média |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-AUTO-001 | Listagem exibe todas as automações da conta | Conta com ao menos 3 automações de tipos distintos cadastradas | 1. Autenticar como gestor. 2. Navegar para a tela de Automações. 3. Verificar as colunas exibidas na tabela. | Tabela exibida com colunas: Nome da Automação, Tipo/Categoria, Data de Modificação e Status. Todas as automações da conta aparecem na listagem, independente do tipo. (RN1) | 🔴 Alta | UI | — |
| CT-AUTO-002 | Ordenação padrão: editada mais recente no topo | Conta com ao menos 2 automações com datas de modificação distintas | 1. Navegar para a tela de Automações. 2. Verificar a posição das automações na lista sem aplicar ordenação manual. | A automação modificada mais recentemente aparece na primeira posição da lista. Demais automações ordenadas por Data de Modificação decrescente. (RN5) | 🟡 Média | UI | CT-AUTO-001 |
| CT-AUTO-003 | Busca em tempo real filtra por nome | Conta com ao menos 3 automações com nomes distintos | 1. Navegar para tela de Automações. 2. No campo de busca, digitar parte do nome de uma automação específica (ex: "Boas-vindas"). 3. Observar a listagem conforme digitação. | Lista filtrada em tempo real (sem necessidade de pressionar Enter), exibindo apenas automações cujo nome contenha o texto digitado. Automações não correspondentes desaparecem da lista. (RN2) | 🔴 Alta | UI | CT-AUTO-001 |
| CT-AUTO-004 | Busca sem resultado exibe feedback adequado | Conta com automações cadastradas | 1. Navegar para tela de Automações. 2. No campo de busca, digitar texto que não corresponde a nenhuma automação (ex: "zzzzautomacaoinexistente"). | Lista vazia ou feedback visual de "sem resultados" exibido. Sem exibição do empty state padrão de "Criar primeira automação". (RN2) | 🟡 Média | UI | CT-AUTO-001 |
| CT-AUTO-005 | Empty state exibido para conta sem automações | Conta autenticada sem nenhuma automação cadastrada | 1. Autenticar como gestor em conta sem automações. 2. Navegar para tela de Automações. | Componente de empty state ilustrado exibido. Botão "Criar primeira automação" visível e centralizado. Sem tabela ou mensagem de erro. (RN9) | 🟡 Média | UI | — |
| CT-AUTO-006 | Excluir automação exige confirmação via AlertDialog | Conta com ao menos 1 automação cadastrada | 1. Navegar para tela de Automações. 2. Na automação desejada, acionar a opção "Excluir". | AlertDialog com variante destrutiva exibido, solicitando confirmação do usuário antes de excluir. Automação NÃO é excluída antes da confirmação. (RN3) | 🔴 Alta | UI | CT-AUTO-001 |
| CT-AUTO-007 | Confirmar exclusão remove automação permanentemente | Conta com ao menos 1 automação cadastrada | 1. Acionar "Excluir" em uma automação. 2. No AlertDialog, confirmar a exclusão. | Automação removida da listagem imediatamente após confirmação. Não retorna ao recarregar a página. (RN3) | 🔴 Alta | UI | CT-AUTO-006 |
| CT-AUTO-008 | Cancelar exclusão mantém automação na listagem | Conta com ao menos 1 automação cadastrada | 1. Acionar "Excluir" em uma automação. 2. No AlertDialog, clicar em "Cancelar" ou fechar o diálogo. | AlertDialog fecha. Automação permanece na listagem sem alteração. (RN3) | 🟡 Média | UI | CT-AUTO-006 |
| CT-AUTO-009 | Bot excluído exibe badge Inativo e não pode ser reativado | Conta com ao menos 1 automação no estado "excluído" | 1. Navegar para tela de Automações. 2. Localizar automação excluída. 3. Verificar badge exibido. 4. Tentar ativar/reativar a automação. | Badge "Inativo" (cinza/neutral) exibido. Opção de reativar ausente ou desabilitada para bots excluídos. Não é possível alterar o status de volta para "Ativo". (RN7) | 🔴 Alta | UI | CT-AUTO-001 |
| CT-AUTO-010 | Badge de status é puramente informativo | Conta com automações ativas e inativas na listagem | 1. Localizar badge "Ativo". 2. Clicar sobre o badge. 3. Localizar badge "Inativo". 4. Clicar sobre o badge. | Nenhuma ação disparada em nenhum dos cliques (sem modal, sem navegação, sem alteração de status). Badges são apenas indicadores visuais. (RN6) | 🟡 Média | UI | CT-AUTO-001 |
| CT-AUTO-011 | Botão Editar redireciona para o construtor de fluxos | Conta com ao menos 1 automação cadastrada | 1. Na listagem, localizar uma automação. 2. Clicar em "Editar". | Usuário redirecionado para o construtor de fluxos (builder) correspondente à automação clicada. URL muda para a rota do builder. (RN4) | 🔴 Alta | UI | CT-AUTO-001 |
| CT-AUTO-012 | Duplicar automação no mesmo canal com nome padrão | Conta com ao menos 1 automação cadastrada | 1. Na listagem, acionar "Duplicar" em uma automação. 2. Verificar opção selecionada e nome preenchido no modal. 3. Não alterar nada. 4. Confirmar duplicação. | Modal abre com "duplicar nesse canal" selecionado por padrão. Campo de nome preenchido com "[nome original] cópia". Ao confirmar: nova automação aparece na listagem com o nome padrão. (RN8) | 🔴 Alta | UI | CT-AUTO-001 |
| CT-AUTO-013 | Duplicar para outro canal exibe seletor e conclui duplicação | Conta com mais de 1 canal configurado; automação cadastrada | 1. Acionar "Duplicar" em uma automação. 2. No modal, selecionar "Duplicar para outro canal". 3. Verificar que o seletor de canal é exibido. 4. Selecionar um canal destino. 5. Confirmar a duplicação. | Seletor de canal exibido ao selecionar "Duplicar para outro canal". Após confirmação: nova automação criada no canal destino selecionado. (RN8) | 🟡 Média | UI | CT-AUTO-012 |
| CT-AUTO-014 | Duplicar automação com nome personalizado | Conta com ao menos 1 automação cadastrada | 1. Acionar "Duplicar" em uma automação. 2. Alterar o nome no campo de título para "Automação Verão 2026". 3. Confirmar duplicação. | Nova automação criada com o nome personalizado informado, não com o nome padrão "cópia". Aparece na listagem após confirmação. (RN8) | 🟢 Baixa | UI | CT-AUTO-012 |
| CT-AUTO-015 | XSS no campo de busca não é executado | Conta com automações cadastradas | 1. No campo de busca, digitar `<script>alert('xss')</script>`. 2. Aguardar filtragem em tempo real. | Script não executado. Nenhum alerta pop-up exibido. Texto tratado como literal na busca. Lista exibe resultado vazio ou feedback adequado. | 🔴 Alta | UI | CT-AUTO-001 |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Cenário: Excluir automação requer confirmação obrigatória via AlertDialog destrutivo
  Dado que sou gestor autenticado na tela de Automações
  E existe ao menos uma automação na listagem
  Quando aciono a opção "Excluir" em uma automação
  Então um AlertDialog com variante destrutiva é exibido solicitando confirmação
  E a automação NÃO é removida antes de o usuário confirmar a ação
  E ao confirmar, a automação desaparece permanentemente da listagem
```

```gherkin
Cenário: Bot excluído exibe badge Inativo e não pode ser reativado
  Dado que sou gestor autenticado na tela de Automações
  E existe uma automação no estado "excluído" na listagem
  Quando visualizo a automação excluída
  Então o badge "Inativo" (cinza/neutral) é exibido para essa automação
  E a opção de reativar/ativar está ausente ou desabilitada
  E não é possível alterar o status da automação excluída para "Ativo"
```

---

## Validação por Agente Crítico

```
✅ Validação concluída:
   Aprovados sem alteração: 13
   Revisados: 2 (CT-AUTO-004 — resultado esperado generalizado; CT-AUTO-013 — expandido para incluir confirmação da duplicação)
   Adicionados por cobertura insuficiente: 0
   Total final: 15 cenários
```
