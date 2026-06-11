# Cenários de Teste — DEV4-4282
> Card: Novos Badges para Tabelas
> Gerado em: 2026-06-01
> Card atualizado em: 2026-05-29T15:31:33.026-0300

---

## PASSO 0.5 — Resumo do Card

- **Título:** Novos Badges para Tabelas
- **Tipo:** Melhoria de Design
- **Prioridade:** Medium
- **Status:** Aguardando Cenários de Teste
- **Atualizado em:** 2026-05-29T15:31:33.026-0300
- **Épico pai:** DEV4-4166 — Nova Estrutura de Páginas na Nova Interface da Poli
- **Objetivo:** Padronizar o componente visual de status (Ativo, Inativo, Conectado, Desconectado) em todas as telas usando tokens oficiais do Design System, eliminando CSS hardcoded.
- **Escopo — O que está incluído:** Componente `<Badge>` global para 4 estados; tokens por estado (success, disabled, box com elipse colorida); padronização de texto Sentence case; proibição de CSS hardcoded; preservação de `data-testid` existentes; badges sem eventos de clique.
- **Regras de Negócio identificadas:**
  1. RN1: Toda menção de status usa obrigatoriamente o componente global `<Badge>` — CSS hardcoded proibido
  2. RN2: Textos em Sentence case: "Ativo", "Inativo", "Conectado", "Desconectado"
  3. RN3: Badges são puramente informativos — sem onClick nativo
  4. RN4: Seletores de teste (`data-testid="status-badge"`) devem ser preservados após substituição
  5. Tokens: Ativo = success (#BBEA54 light, 40% opacidade); Inativo = disabled (#E2E8F0 light, 100%); Conectado = box + elipse success; Desconectado = box + elipse error (#FF675F light)
- **Critérios de Aceite identificados:** A ser preenchido pelo time de QA
- **Subtasks / dependências:** Nenhuma

✅ Card suficientemente detalhado para cobertura de testes.

---

## BLOCO 1 — Estratégia de Teste

Melhoria de design system com impacto em todas as telas da plataforma. Risco de regressão global — qualquer tela com status pode ser afetada. Testes aplicáveis: **funcional** (renderização de cada variante), **regressão** (CSS hardcoded removido), **UX** (acessibilidade visual, ausência de eventos de clique) e **segurança** (ausência de CSS hardcoded). Execução prioritária: preservação de `data-testid` (impacto direto em automação) e ausência de CSS hardcoded (RN1). Risco principal: quebra de automação existente se `data-testid` for renomeado.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| data-testid renomeado ou removido — quebra automação existente | M | A | Alta |
| CSS hardcoded remanescente em alguma tela não refatorada | M | M | Alta |
| Badge "Ativo" com token de cor incorreto | B | M | Média |
| Badge exibindo onClick não desejado | B | M | Média |
| Texto fora do padrão Sentence case | B | M | Média |
| Badge de um estado renderiza como badge de outro estado | B | A | Alta |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-BADGE-001 | Badge Ativo renderiza com token success | Ambiente em light mode; tela com entidade ativa (ex: canal ativo) | 1. Navegar para tela com badge "Ativo". 2. Inspecionar cor de fundo via DevTools. | Badge exibe texto "Ativo" (Sentence case). Cor de fundo usa token success (#BBEA54) com 40% de opacidade. (RN1, RN2, tokens DS) | 🔴 Alta | UI | — |
| CT-BADGE-002 | Badge Inativo renderiza com token disabled | Ambiente em light mode; tela com entidade inativa | 1. Navegar para tela com badge "Inativo". 2. Inspecionar cor de fundo. | Badge exibe texto "Inativo" (Sentence case). Cor de fundo usa token disabled (#E2E8F0) com 100% de opacidade. (RN1, RN2, tokens DS) | 🔴 Alta | UI | — |
| CT-BADGE-003 | Badge Conectado exibe elipse colorida | Ambiente em light mode; canal com status conectado | 1. Navegar para tela com badge "Conectado". 2. Verificar elementos internos do badge. | Badge exibe texto "Conectado" (Sentence case). Elipse colorida na cor success (#BBEA54) visível dentro do badge. Fundo usa token box. (RN2, tokens DS) | 🔴 Alta | UI | — |
| CT-BADGE-004 | Badge Desconectado exibe elipse vermelha | Ambiente em light mode; canal com status desconectado | 1. Navegar para tela com badge "Desconectado". 2. Verificar elementos internos. | Badge exibe texto "Desconectado" (Sentence case). Elipse na cor error (#FF675F) visível dentro do badge. Fundo usa token box. (RN2, tokens DS) | 🔴 Alta | UI | — |
| CT-BADGE-005 | Badge não dispara ação ao ser clicado (todos os estados) | Telas com badges dos 4 estados visíveis | 1. Clicar sobre badge "Ativo". 2. Clicar sobre badge "Inativo". 3. Clicar sobre badge "Conectado". 4. Clicar sobre badge "Desconectado". | Nenhuma ação disparada em nenhum dos cliques. Sem navegação, modal ou efeito colateral. Badges permanecem apenas como indicadores visuais. (RN3) | 🟡 Média | UI | — |
| CT-BADGE-006 | Nenhum CSS hardcoded nos badges de status | Ferramentas de inspeção do browser; telas refatoradas | 1. Navegar por ao menos 3 telas com badges de status. 2. Inspecionar o DOM de cada badge via DevTools. | Nenhum atributo `style` inline ou classe CSS de cor hardcoded nos elementos badge. Estilos vêm exclusivamente de tokens do Design System. (RN1) | 🔴 Alta | UI | — |
| CT-BADGE-007 | data-testid preservado após substituição do componente | Ferramentas de inspeção do browser; tela com badge substituído | 1. Inspecionar o DOM do badge de status em tela refatorada. 2. Verificar atributo data-testid. | Atributo `data-testid="status-badge"` presente com exatamente esse valor. Testes automatizados que usam esse seletor não falham. (RN4) | 🔴 Alta | UI | — |
| CT-BADGE-008 | Texto de todos os badges em Sentence case em múltiplas telas | Ao menos 3 telas diferentes com badges de status | 1. Navegar pelas telas: Listagem de Canais, Listagem de Usuários, Listagem de Departamentos (ou equivalentes). 2. Verificar o texto de cada badge. | Todos os badges exibem exatamente: "Ativo", "Inativo", "Conectado", "Desconectado" — primeira letra maiúscula, demais minúsculas, sem variações de caixa. (RN2) | 🟡 Média | UI | — |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Cenário: data-testid dos badges de status é preservado após refatoração
  Dado que a plataforma foi atualizada com o novo componente global Badge
  Quando inspeciono o DOM de uma tela com badge de status via DevTools
  Então o atributo data-testid com valor "status-badge" está presente no componente
  E os testes automatizados existentes que usam esse seletor continuam passando
```

```gherkin
Cenário: Badge não executa ação ao ser clicado em nenhum dos quatro estados
  Dado que estou em uma tela da plataforma com badges de status visíveis
  Quando clico sobre os badges "Ativo", "Inativo", "Conectado" e "Desconectado"
  Então nenhuma navegação, modal ou efeito colateral é disparado em nenhum dos cliques
  E os badges permanecem apenas como indicadores visuais
```

---

## Validação por Agente Crítico

```
✅ Validação concluída:
   Aprovados sem alteração: 1 (CT-BADGE-002)
   Revisados: 6 (CT-001, CT-003, CT-004, CT-005, CT-006→CSS check, CT-007)
   Removidos (fora de escopo): 2 (CT-BADGE-008 dark mode — não documentado no card; CT-BADGE-009 XSS — vetor inválido para badge com valores fixos)
   Adicionado: 1 (CT-BADGE-008 → agora Texto Sentence case em múltiplas telas, substituindo o CT de dark mode)
   Total final: 8 cenários
```
