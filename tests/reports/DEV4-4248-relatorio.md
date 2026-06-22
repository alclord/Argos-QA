# Relatório de Execução — DEV4-4248
> Card: Sidebar Nova Versão
> Ambiente: canary (https://spa-canary.poli.digital/chat)
> Executor: yuri.castro@poli.digital (Yuri Alcantara Gestor)
> Iniciado em: 2026-06-05T14:00:00.000Z
> Concluído em: 2026-06-05T17:26:00.000Z
> PRs analisados: nenhum (SURFACE_IMPACT = true por padrão)

---

## Resumo Executivo

| Total | ✅ Passou | ❌ Falhou | ⏭️ Bloqueado |
|-------|----------|----------|-------------|
| 27    | 21       | 1        | 5           |

**Taxa de aprovação:** 21/22 executados = **95,5%** ✅
**Bugs críticos encontrados:** 1 (BUG-001 — RN5 violação de Design System)

---

## Resultado por Cenário

| CT-ID | Nome | Resultado | Observação |
|---|---|---|---|
| CT-SIDEBAR-001 | Sidebar inicia colapsada por padrão | ✅ PASSOU | `data-collapsible="icon"`, `data-state="collapsed"` confirmados |
| CT-SIDEBAR-002 | Expansão da sidebar ao passar o mouse (hover) | ✅ PASSOU | Sidebar expande com ícones + rótulos ao hover em `[data-sidebar="sidebar"]` |
| CT-SIDEBAR-003 | Retração automática ao remover o mouse | ✅ PASSOU | `data-state="collapsed"` restaurado após remover hover |
| CT-SIDEBAR-004 | Delay de 200ms evita abertura acidental | ✅ PASSOU | Hover rápido não expande — CSS transition-delay confirmado |
| CT-SIDEBAR-005 | Delay de 300ms evita fechamento ao sair brevemente | ✅ PASSOU | Sidebar permanece expandida durante breve saída do cursor |
| CT-SIDEBAR-006 | Submenu accordion expande verticalmente | ✅ PASSOU | Submenu empurra itens abaixo; conteúdo principal não deslocado |
| CT-SIDEBAR-007 | Submenu accordion fecha ao clicar novamente | ✅ PASSOU | `data-state="closed"` após segundo clique no chevron |
| CT-SIDEBAR-008 | Estado visual ativo no modo colapsado | ✅ PASSOU | `data-active="true"` + bg `oklch(0.905 0.03 283.375)` em Chats |
| CT-SIDEBAR-009 | Estado visual ativo no modo expandido | ✅ PASSOU | Ícone + rótulo com destaque no modo hover |
| CT-SIDEBAR-010 | Ícone Home removido, atalho migrado para logo | ✅ PASSOU | Nenhum item Home na sidebar; logo Poli redireciona para /chat |
| CT-SIDEBAR-011 | Contatos posicionado abaixo de Chats | ✅ PASSOU | idx Chats=0, Contatos=1 — ordem correta confirmada |
| CT-SIDEBAR-012 | Ícone Template removido, migrado para Configurações | ✅ PASSOU | Template não aparece como item independente; presente em submenu |
| CT-SIDEBAR-013 | Configurações no rodapé da área azul | ✅ PASSOU | Grupo com `mt-auto` — top=704px, afastado do grupo principal (top=72px) |
| CT-SIDEBAR-014 | Atendente não visualiza opções restritas | ✅ PASSOU | `supervisorteste@poli.digital` não vê Empresa/Assinatura/IA/Segurança |
| CT-SIDEBAR-015 | Gestor visualiza mais que atendente | ⏭️ BLOQUEADO | `CANARY_AGENT_EMAIL` possui role "Poli" elevado — não é atendente padrão para comparação |
| CT-SIDEBAR-016 | Tokens corretos no hover (light mode) | ✅ PASSOU | `oklch(0.928 0.006 264.531)` no hover; border-radius 8px confirmado |
| CT-SIDEBAR-017 | Tokens corretos no selecionado em dark mode | ⏭️ BLOQUEADO | App não responde à classe `dark` no `html` — dark mode não implementado no canary |
| CT-SIDEBAR-018 | Logo Poli em dark mode exibe versão branco+coral | ⏭️ BLOQUEADO | Dependência de dark mode ativo — mesmo motivo do CT-SIDEBAR-017 |
| CT-SIDEBAR-019 | Mobile — menu abre ao clicar no hamburger | ✅ PASSOU | Drawer abre em viewport 375×812 via `button "Expandir menu"` |
| CT-SIDEBAR-020 | Mobile — menu fecha ao clicar fora | ✅ PASSOU | Overlay fecha ao Escape/click externo; `role="dialog"` removido do DOM |
| CT-SIDEBAR-021 | Mobile — Configurações inicia fechado e expande | ✅ PASSOU | `data-state="closed"` inicial; expande com submenus após clique no chevron |
| CT-SIDEBAR-022 | Somente ícones do Design System na sidebar | ❌ FALHOU | **BUG-001**: `lucide-users` (Lucide lib) em Departamentos — viola RN5 |
| CT-SIDEBAR-023 | Sidebar não empurra conteúdo principal | ✅ PASSOU | `gapWidth=63.98px` constante; sidebar width=254.7px não afeta layout |
| CT-SIDEBAR-024 | Scroll disponível dentro do submenu de Configurações | ⏭️ BLOQUEADO | Submenu tem apenas 2 itens — sem overflow para testar scroll |
| CT-SIDEBAR-025 | Acesso direto via URL a rota restrita | ✅ PASSOU | `/settings/ai-config` redireciona para `/chat` com role agent |
| CT-SIDEBAR-026 | Estado ativo preservado após F5 | ✅ PASSOU | `data-active="true"` e bg `oklch(0.905 0.03 283.375)` preservados após reload |
| CT-SIDEBAR-027 | Accordion — comportamento com dois submenus abertos | ⏭️ BLOQUEADO | Apenas 1 item com submenu na sidebar canary — pré-condição não atendida |

---

## Bugs Encontrados

### BUG-001 — Ícone externo ao Design System: `lucide-users` em Departamentos
- **Cenário:** CT-SIDEBAR-022
- **Criticidade:** 🔴 Alta (viola RN5 — todos os ícones devem ser do DS Poli)
- **Componente:** Item de menu "Departamentos" (`/teams`)
- **Evidência:** `tests/evidence/DEV4-4248/CT-SIDEBAR-022_passo2_falhou.png`
- **Detalhe técnico:** O ícone do item Departamentos usa classe `lucide lucide-users` (biblioteca Lucide externa), enquanto todos os demais itens de navegação utilizam `poli-icon` (DS interno). Esta inconsistência viola a regra RN5 de conformidade com o Design System.
- **Impacto:** Visual inconsistência — traço/peso do ícone Lucide diverge dos ícones DS Poli.
- **Reprodução:** Inspecionar `<svg>` do item Departamentos na sidebar expandida — classe `lucide lucide-users` presente.

---

## Itens Bloqueados — Análise

| CT-ID | Motivo do Bloqueio | Recomendação |
|---|---|---|
| CT-SIDEBAR-015 | `CANARY_AGENT_EMAIL` tem role "Poli" (elevado), não "agent" padrão | Configurar conta com role manager puro para comparação; testar quando disponível |
| CT-SIDEBAR-017 | Dark mode não implementado no canary (sem resposta à classe `dark` no HTML) | Re-testar quando dark mode for implementado |
| CT-SIDEBAR-018 | Mesmo motivo do CT-SIDEBAR-017 | Re-testar com dark mode disponível |
| CT-SIDEBAR-024 | Submenu de Configurações tem apenas 2 itens (Configurações + Templates) — sem overflow | Testar com viewport menor (≤400px altura) ou com mais itens no submenu |
| CT-SIDEBAR-027 | Apenas 1 grupo com submenu no canary | Testar quando houver 2+ grupos accordion no layout |

---

## Evidências Coletadas

```
tests/evidence/DEV4-4248/
├── preflight_ambiente.png
├── preflight_login.png
├── CT-SIDEBAR-001_passo1_ok.png
├── CT-SIDEBAR-002_passo2_ok.png
├── CT-SIDEBAR-006_passo2_ok.png
├── CT-SIDEBAR-008_passo2_ok.png
├── CT-SIDEBAR-011-013_passo2_ok.png
├── CT-SIDEBAR-014_passo2_ok.png
├── CT-SIDEBAR-016_passo2_ok.png
├── CT-SIDEBAR-019_passo2_ok.png
├── CT-SIDEBAR-020_passo2_ok.png
├── CT-SIDEBAR-021_passo3_ok.png
├── CT-SIDEBAR-022_passo2_falhou.png      ← BUG-001
├── CT-SIDEBAR-023_passo3_ok.png
├── CT-SIDEBAR-025_passo2_ok.png
└── CT-SIDEBAR-026_passo4_ok.png
```

---

## Análise de Risco

Com base no mapa de riscos do BLOCO 2:

| Risco | Status |
|---|---|
| Sidebar empurra conteúdo principal | ✅ Mitigado — floating confirmado (CT-SIDEBAR-023) |
| Rota restrita acessível via URL | ✅ Mitigado — redirecionamento confirmado (CT-SIDEBAR-025) |
| Delay de hover não configurado | ✅ Mitigado — delays 200ms/300ms funcionando (CT-SIDEBAR-004/005) |
| Estado ativo perdido após F5 | ✅ Mitigado — persistido via rota (CT-SIDEBAR-026) |
| Tokens de cor incorretos no dark mode | ⏭️ Não verificável — dark mode não disponível no canary |
| Template não migrado para Configurações | ✅ Mitigado — Templates em submenu (CT-SIDEBAR-012) |
| Submenu accordion empurrando conteúdo | ✅ Mitigado — empurra internamente na sidebar (CT-SIDEBAR-006) |
| Ícones externos ao DS | ❌ Confirmado — BUG-001 (Lucide em Departamentos) |
| Scroll do submenu afetando página inteira | ⏭️ Não verificável — itens insuficientes (CT-SIDEBAR-024) |

---

## Conclusão

A nova sidebar do `foundation-spa` está **aprovada para canary com ressalva**:

- **21 de 22 cenários executados passaram** (95,5%)
- **1 bug identificado** (BUG-001 — ícone Lucide em Departamentos, criticidade alta por violar RN5)
- **5 cenários bloqueados** por limitações do ambiente (dark mode ausente, contas de teste e volume de dados insuficientes)

**Recomendação:** Corrigir BUG-001 (substituir `lucide-users` por ícone DS Poli em Departamentos) antes de promover para produção. Os demais bloqueados podem ser re-executados em janela separada após disponibilidade de dark mode e conta manager pura.
