# Cenários de Teste — DEV4-4243
> Card: Atualização de Ícones da Nova Versão
> Gerado em: 2026-05-28
> Card atualizado em: 2026-05-28T08:10:54.683-0300

---

## BLOCO 1 — Estratégia de Teste

O escopo cobre a substituição de ícones legados/Lucide pelos ícones oficiais do Design System (DS) na tela de chats da `foundation-spa`, com regras de mapeamento específicas: `list-filter` substitui `funnel` em contextos de filtro; `funnel` permanece em sidebars de flow; `arrow-down-up` substitui `arrow-down-wide-narrow`; `arrow-up-down` substitui `arrow-up-narrow-wide`; `circle-ellipsis` substitui `circle-plus` apenas na caixa de texto; whitelabels mantêm o fallback Lucide intocado. Os tipos aplicáveis são: testes de UI (inspecção visual e DOM), testes de acessibilidade (aria-labels, leitores de tela), testes de regressão visual e testes de isolamento de tenants (Poli vs whitelabels). Prioridade de execução: 1º ícones de ordenação (impacto direto no fluxo de UX), 2º ícones de filtro, 3º caixa de texto, 4º sidebars, 5º whitelabels. Riscos principais: substituição acidental do `circle-plus` fora da caixa de texto, remoção de tracking tags em botões de ícone, e hardcode de cor/tamanho quebrando o tema da plataforma.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade | Impacto | Prioridade |
|---|---|---|---|
| `circle-plus` substituído por `circle-ellipsis` fora da caixa de texto | A | A | 🔴 Crítica |
| `funnel` substituído por `list-filter` nas sidebars de flow (deve permanecer `funnel`) | A | M | 🔴 Crítica |
| Tracking tags (analytics) removidas ou alteradas durante refatoração | M | A | 🔴 Crítica |
| Ícones de ordenação invertidos (`arrow-down-up` vs `arrow-up-down`) aplicados errados | M | A | 🔴 Crítica |
| Hardcode de cor ou tamanho nos novos ícones quebrando o Design Token | M | M | 🟡 Média |
| Ausência de `aria-label` em ícones que funcionam como botão interativo | M | M | 🟡 Média |
| Whitelabel exibindo ícones do DS em vez de fallback Lucide | B | A | 🟡 Média |
| Alinhamento visual quebrado (bounding box / viewBox incorreto) | B | M | 🟢 Baixa |
| `bounding box` do ícone novo quebrando layout em resolução mobile | B | B | 🟢 Baixa |

---

## BLOCO 3 — Tabela de Cenários

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-ICON-001 | Ícone `list-filter` exibido no botão de filtro da tela de chats | Usuário autenticado na plataforma Poli; tela de chats carregada | 1. Acessar a tela de chats na foundation-spa (Poli). 2. Localizar o botão de filtro. 3. Inspecionar o ícone exibido. | O ícone exibido é `list-filter` (DS), não `funnel` | 🔴 Alta | UI | — |
| CT-ICON-002 | Ícone `funnel` mantido nas sidebars de flow (direita e esquerda) | Usuário autenticado; tela de chats com sidebars visíveis | 1. Acessar a tela de chats. 2. Localizar os ícones das sidebars direita e esquerda. 3. Inspecionar os ícones. | As sidebars de flow exibem `funnel`, não `list-filter` | 🔴 Alta | UI | CT-ICON-001 |
| CT-ICON-003 | Ícone `arrow-down-up` exibido no botão de ordenação padrão (mais recentes primeiro) | Usuário autenticado; tela de chats carregada sem ordenação alterada pelo usuário | 1. Acessar a tela de chats. 2. Localizar o botão de ordenação no estado padrão. 3. Inspecionar o ícone. | O ícone exibido é `arrow-down-up` (ordenação decrescente — mais recentes primeiro) | 🔴 Alta | UI | — |
| CT-ICON-004 | Ícone `arrow-up-down` exibido após o usuário alternar a ordenação para mais antigos primeiro | Usuário autenticado; tela de chats com botão de ordenação no estado padrão | 1. Acessar a tela de chats. 2. Clicar no botão de ordenação para inverter a ordem. 3. Inspecionar o ícone exibido após o clique. | O ícone muda para `arrow-up-down` (ordenação crescente — mais antigos primeiro) | 🔴 Alta | UI | CT-ICON-003 |
| CT-ICON-005 | Ícone `circle-ellipsis` exibido na caixa de texto do chat | Usuário autenticado; chat em atendimento aberto | 1. Abrir um chat em atendimento. 2. Localizar a caixa de texto de resposta. 3. Inspecionar o ícone dentro da caixa de texto. | O ícone exibido na caixa de texto é `circle-ellipsis`, não `circle-plus` | 🔴 Alta | UI | — |
| CT-ICON-006 | Ícone `circle-plus` mantido em outros locais da plataforma (fora da caixa de texto) | Usuário autenticado; tela com elementos que usavam `circle-plus` para adicionar informações | 1. Navegar para qualquer tela com botão de adição de informações (ex: adicionar contato, adicionar tag). 2. Inspecionar o ícone exibido. | O ícone exibido é `circle-plus`, não `circle-ellipsis` | 🔴 Alta | UI | CT-ICON-005 |
| CT-ICON-007 | Ícones do DS não aparecem em conta whitelabel | ⚠️ Bloqueável: ambiente whitelabel configurado e acessível | 1. Acessar a plataforma via conta whitelabel (não Poli). 2. Navegar para a tela de chats. 3. Inspecionar todos os ícones substituídos (filtro, ordenação, caixa de texto). | Os ícones exibidos são os fallbacks Lucide, não os ícones do DS | 🔴 Alta | UI | — |
| CT-ICON-008 | Ícones do DS aparecem corretamente em conta Poli | Usuário autenticado em conta Poli (não whitelabel) | 1. Acessar a plataforma Poli. 2. Navegar para a tela de chats. 3. Inspecionar os ícones: filtro, ordenação, sidebars e caixa de texto. | Todos os ícones seguem o mapeamento do card (DS aplicado) | 🟡 Média | UI | — |
| CT-ICON-009 | Ícone de filtro não aplicado em local que não seja botão de filtro | Usuário autenticado; tela de chats carregada | 1. Inspecionar todos os elementos que usavam `funnel` na tela de chats. 2. Verificar quais receberam `list-filter` e quais mantiveram `funnel`. | Apenas o botão explícito de filtro recebeu `list-filter`; demais permanecem com `funnel` | 🔴 Alta | UI | CT-ICON-001, CT-ICON-002 |
| CT-ICON-010 | Tags de tracking não removidas dos botões com ícones | ⚠️ Bloqueável: acesso ao painel de analytics (ex: Amplitude/GTM) ou inspeção de DOM | 1. Abrir a tela de chats. 2. Clicar nos botões de filtro, ordenação e caixa de texto. 3. Verificar no painel de analytics ou no DOM que os atributos de tracking (data-analytics, data-event, etc.) permanecem intactos. | Todos os eventos de clique são registrados corretamente; nenhum atributo de tracking foi removido | 🔴 Alta | UI | CT-ICON-001, CT-ICON-003, CT-ICON-005 |
| CT-ICON-011 | Novos ícones sem hardcode de cor (herdam cor via Design Token) | Usuário autenticado; tela de chats com tema padrão | 1. Inspecionar o CSS dos novos ícones via DevTools. 2. Verificar que a propriedade `color` ou `fill` não está definida inline ou como valor fixo. 3. Alternar para tema escuro (se disponível). | Os ícones herdam cor via CSS variable/Design Token; não há valor hardcoded de cor | 🟡 Média | UI | — |
| CT-ICON-012 | Novos ícones sem hardcode de tamanho (herdam tamanho via Design Token) | Usuário autenticado; tela de chats carregada | 1. Inspecionar o CSS dos novos ícones via DevTools. 2. Verificar que `width`, `height` e `font-size` não estão definidos inline como valores fixos (ex: `width: 24px`). | Os ícones herdam tamanho via Design Token; nenhum valor de dimensão está hardcoded no componente | 🟡 Média | UI | — |
| CT-ICON-013 | `aria-label` presente em todos os ícones que funcionam como botão interativo | Usuário autenticado; tela de chats com novos ícones | 1. Inspecionar os elementos de botão de filtro, ordenação e caixa de texto no DOM. 2. Verificar a presença de `aria-label` ou `title` em cada elemento interativo com ícone. | Todos os botões com ícone possuem `aria-label` ou `title` descritivo e não vazio | 🟡 Média | UI | — |
| CT-ICON-014 | Ícones decorativos (não-botão) não possuem `aria-label` desnecessário | Usuário autenticado; tela de chats carregada | 1. Inspecionar ícones que são meramente decorativos (não clicáveis) no DOM. 2. Verificar que possuem `aria-hidden="true"` ou `alt=""` | Ícones decorativos têm `aria-hidden="true"`, não poluindo leitores de tela | 🟢 Baixa | UI | — |
| CT-ICON-015 | Alinhamento visual dos ícones não quebra layout de botões e menus | Usuário autenticado; tela de chats carregada em diferentes resoluções | 1. Acessar a tela de chats em resolução 1920x1080, 1366x768 e 375x812 (mobile). 2. Observar se os ícones de filtro, ordenação e caixa de texto estão alinhados vertical e horizontalmente nos seus containers. | Nenhum ícone ultrapassa o bounding box do botão/menu; sem desalinhamento visual em nenhuma resolução testada | 🟡 Média | UI | — |

---

## BLOCO 4 — Gherkin (BDD)

### Cenário 1 — CT-ICON-001: Ícone list-filter no botão de filtro da tela de chats

```gherkin
# language: pt

Funcionalidade: Atualização de Ícones da Nova Versão — Filtro
  Como usuário da plataforma Poli
  Quero visualizar ícones padronizados do Design System
  Para que eu possa associar ações de forma intuitiva

  Contexto:
    Dado que estou autenticado como agente na plataforma Poli (não whitelabel)
    E estou na tela de chats da foundation-spa

  Cenário: Ícone de filtro exibe list-filter no botão de filtro
    Quando localizo o botão de filtro da lista de chats
    Então o ícone exibido deve ser "list-filter" do Design System
    E o ícone antigo "funnel" não deve estar presente no botão de filtro

  Cenário: Ícone funnel mantido nas sidebars de flow
    Quando localizo os ícones das sidebars direita e esquerda de flow
    Então o ícone exibido deve ser "funnel"
    E o ícone "list-filter" não deve estar presente nas sidebars de flow
```

### Cenário 2 — CT-ICON-006: circle-plus mantido fora da caixa de texto / circle-ellipsis apenas na caixa

```gherkin
# language: pt

Funcionalidade: Atualização de Ícones da Nova Versão — Caixa de Texto e Adição
  Como usuário da plataforma Poli
  Quero que os ícones de adicionar e de opções extras sejam distintos e contextuais
  Para não confundir ações de adição com ações de opções extras

  Contexto:
    Dado que estou autenticado como agente na plataforma Poli (não whitelabel)
    E tenho um chat em atendimento aberto

  Cenário: Ícone circle-ellipsis exibido dentro da caixa de texto
    Quando localizo a caixa de texto de resposta do chat
    Então o ícone dentro da caixa de texto deve ser "circle-ellipsis"
    E o ícone "circle-plus" não deve estar presente na caixa de texto

  Cenário: Ícone circle-plus mantido em botões de adição fora da caixa de texto
    Quando navego para uma área de adição de informações (ex: adicionar tag, adicionar contato)
    Então o ícone exibido no botão de adição deve ser "circle-plus"
    E o ícone "circle-ellipsis" não deve estar presente em botões de adição fora da caixa de texto
```

---

## Validação por Agente Crítico Independente

> Revisão aplicada internamente com base no card DEV4-4243 e nos cenários gerados.

**Rastreabilidade:** Todos os cenários estão amarrados a pelo menos uma das 5 regras de mapeamento de ícone (RN1/Layout) ou às regras de negócio RN2 (tokens), RN3 (alinhamento), RN4 (acessibilidade) e à regra de tracking (seção 7).

**Duplicatas:** CT-ICON-001 e CT-ICON-009 cobriam parcialmente o mesmo fluxo. CT-ICON-009 foi mantido como cenário de borda que valida o lado negativo (não aplicar list-filter onde não deve), diferenciado por intenção.

**Cobertura mínima verificada:**
- Happy path (2): CT-ICON-001 (filtro correto), CT-ICON-003 (ordenação padrão correta)
- Negativos/erro (3): CT-ICON-006 (circle-plus não substituído fora da caixa), CT-ICON-002 (funnel mantido em sidebars), CT-ICON-009 (list-filter não aplicado onde não deve)
- Borda (2): CT-ICON-007 (whitelabel com fallback Lucide), CT-ICON-010 (tracking tags intactas)
- Segurança/acessibilidade (1): CT-ICON-013 (aria-labels em botões interativos)

**Correções e adições aplicadas:**
- CT-ICON-008 adicionado para cobrir o happy path explícito da conta Poli como tenant
- CT-ICON-014 adicionado para cobrir o lado negativo de acessibilidade (ícones decorativos com aria-hidden)
- CT-ICON-015 adicionado para cobrir o RN3 (bounding box / alinhamento visual) que não estava coberto
- CT-ICON-010 refinado para marcar como ⚠️ Bloqueável o pré-requisito de acesso ao painel de analytics

- Aprovados sem alteração: 7
- Revisados: 3 (CT-ICON-009, CT-ICON-010, CT-ICON-013)
- Adicionados por cobertura insuficiente: 5 (CT-ICON-008, CT-ICON-011, CT-ICON-012, CT-ICON-014, CT-ICON-015)
