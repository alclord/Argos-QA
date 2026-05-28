# Cenários de Teste — DEV4-4248
> Card: Sidebar Nova Versão
> Gerado em: 2026-05-28
> Card atualizado em: 2026-05-28T08:07:28.549-0300

---

## BLOCO 1 — Estratégia de Teste

O card DEV4-4248 refatora a barra de navegação lateral (`sidebar`) do `foundation-spa` (React 18 + Tailwind + Radix UI). O escopo abrange comportamento de hover/colapso com delays controlados (RN1/RN2), accordion de submenus sem sobreposição do conteúdo principal (RN3), preservação do estado ativo (RN4), conformidade com o Design System (RN5) e visibilidade de itens por permissão de usuário (RN6). Também inclui comportamento mobile via hamburger menu e dark mode com tokens específicos.

Os tipos de teste aplicáveis são: **Funcional (UI)**, **Visual/Design Token**, **Acessibilidade** e **Segurança (controle de acesso)**. A prioridade de execução é: (1) controle de permissões/segurança, (2) comportamento de hover/colapso, (3) accordion e estado ativo, (4) conformidade visual e mobile. Os principais riscos são: regressão de layout no conteúdo principal ao expandir a sidebar, falhas no controle de permissão que exponham rotas restritas diretamente via URL, e inconsistências de token de cor entre light mode e dark mode.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade | Impacto | Prioridade |
|---|---|---|---|
| Sidebar empurra conteúdo principal em vez de flutuar sobre ele | A | A | Alta |
| Rota restrita acessível via URL mesmo com item oculto no menu | B | A | Alta |
| Delay de hover não configurado, causando abertura acidental ou travada | A | M | Alta |
| Estado ativo perdido após recarregamento de página (F5) | M | M | Média |
| Tokens de cor incorretos no dark mode (background, ícone, texto) | M | M | Média |
| Ícone Home ausente no menu mas sem atalho funcional no ícone da Poli | B | M | Média |
| Template não migrado para Configurações | M | M | Média |
| Submenu accordion empurrando conteúdo principal ao invés de push vertical interno | M | A | Alta |
| Ícones externos ao DS presentes na sidebar | B | B | Baixa |
| Scroll do submenu afetando a página inteira | M | M | Média |

---

## BLOCO 3 — Tabela de Cenários

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-SIDEBAR-001 | Sidebar inicia colapsada por padrão | Usuário autenticado na foundation-spa | 1. Acessar a plataforma com qualquer role. 2. Observar a sidebar no carregamento inicial. | Sidebar exibe apenas ícones do DS (sem rótulos de texto), ocupando largura mínima. | 🔴 Alta | UI | — |
| CT-SIDEBAR-002 | Expansão da sidebar ao passar o mouse (hover) | Usuário autenticado; sidebar em estado colapsado | 1. Posicionar cursor sobre qualquer ponto da sidebar. 2. Aguardar 200ms. | Sidebar expande exibindo ícones + rótulos de texto. Conteúdo principal não se move. | 🔴 Alta | UI | CT-SIDEBAR-001 |
| CT-SIDEBAR-003 | Retração automática ao remover o mouse | Usuário autenticado; sidebar em estado expandido | 1. Passar o mouse sobre a sidebar para expandir. 2. Remover o cursor da área da sidebar. 3. Aguardar 300ms. | Sidebar retorna ao estado colapsado automaticamente após 300ms. | 🔴 Alta | UI | CT-SIDEBAR-002 |
| CT-SIDEBAR-004 | Delay de 200ms evita abertura acidental em movimento rápido | Usuário autenticado; sidebar colapsada | 1. Mover o cursor rapidamente sobre a sidebar (passagem em menos de 200ms sem parar). | Sidebar NÃO expande quando o cursor passa rapidamente sem permanecer sobre ela. | 🟡 Média | UI | CT-SIDEBAR-001 |
| CT-SIDEBAR-005 | Delay de 300ms evita fechamento ao sair brevemente da sidebar | Usuário autenticado; sidebar expandida | 1. Expandir a sidebar com hover. 2. Mover o cursor brevemente para fora da sidebar e retornar antes de 300ms. | Sidebar permanece expandida, sem colapsar durante o breve afastamento do cursor. | 🟡 Média | UI | CT-SIDEBAR-002 |
| CT-SIDEBAR-006 | Submenu accordion expande verticalmente empurrando itens abaixo | ⚠️ Bloqueável — item de menu com submenu (ex: Configurações) disponível na sidebar; usuário com permissão de acesso | 1. Passar o mouse para expandir a sidebar. 2. Clicar no chevron do item Configurações. | O submenu se expande verticalmente empurrando os itens abaixo. O conteúdo principal da tela NÃO é sobreposto nem deslocado. | 🔴 Alta | UI | CT-SIDEBAR-002 |
| CT-SIDEBAR-007 | Submenu accordion fecha ao clicar novamente no chevron | ⚠️ Bloqueável — submenu aberto via CT-SIDEBAR-006 | 1. Com submenu aberto, clicar novamente no chevron do item pai. | O submenu fecha e os itens abaixo retornam às posições originais. | 🟡 Média | UI | CT-SIDEBAR-006 |
| CT-SIDEBAR-008 | Estado visual ativo preservado no modo colapsado | Usuário autenticado; navegando em uma rota que possui item de menu correspondente | 1. Navegar para uma página que possui ícone no menu (ex: Chats). 2. Observar a sidebar no modo colapsado. | O ícone correspondente à página atual exibe destaque cromático (estado Ativo). Rótulos não são exibidos (sidebar colapsada). | 🔴 Alta | UI | CT-SIDEBAR-001 |
| CT-SIDEBAR-009 | Estado visual ativo preservado no modo expandido | Usuário autenticado; sidebar expandida via hover; navegando em rota com item de menu | 1. Navegar para uma página com item no menu. 2. Passar o mouse sobre a sidebar para expandir. | Ícone + rótulo da página atual exibem destaque cromático de estado Ativo. | 🟡 Média | UI | CT-SIDEBAR-002 |
| CT-SIDEBAR-010 | Ícone Home removido e atalho migrado para ícone da Poli | Usuário autenticado; sidebar visível | 1. Observar a sidebar em modo colapsado e expandido. 2. Clicar no ícone da Poli (logotipo). | Ícone de Home não está mais na sidebar. Clicar no ícone da Poli redireciona para a página inicial (home). | 🟡 Média | UI | CT-SIDEBAR-001 |
| CT-SIDEBAR-011 | Ícone Contatos posicionado abaixo do ícone Chat | Usuário com permissão de visualização de Contatos | 1. Observar a ordem dos ícones na sidebar. | O ícone Contatos aparece imediatamente abaixo do ícone Chat na ordem de navegação. | 🟢 Baixa | UI | CT-SIDEBAR-001 |
| CT-SIDEBAR-012 | Ícone Template removido e opção migrada para Configurações | ⚠️ Bloqueável — usuário com permissão de acesso a Templates/Configurações | 1. Verificar a sidebar. 2. Expandir o submenu de Configurações. | Ícone Template não aparece como item independente na sidebar. A opção Template está disponível dentro de Configurações. | 🟡 Média | UI | CT-SIDEBAR-006 |
| CT-SIDEBAR-013 | Ícone Configurações posicionado no rodapé da área azul | Usuário autenticado | 1. Observar a sidebar (colapsada e expandida). | O ícone Configurações está posicionado no rodapé da sidebar (área azul), afastado dos demais itens de navegação. | 🟢 Baixa | UI | CT-SIDEBAR-001 |
| CT-SIDEBAR-014 | Usuário com role atendente não visualiza opções restritas | ⚠️ Bloqueável — usuário com role agent (atendente) autenticado | 1. Autenticar com usuário de role agent. 2. Observar a sidebar. | Opções como Minha Empresa, Assinatura, Configuração de IA e Segurança NÃO são exibidas na sidebar. Apenas opções permitidas ao atendente são visíveis. | 🔴 Alta | UI | — |
| CT-SIDEBAR-015 | Usuário com role gestor visualiza mais opções que atendente | ⚠️ Bloqueável — usuário com role manager autenticado; usuário com role agent para comparação | 1. Autenticar com usuário de role manager. 2. Observar a sidebar. 3. Comparar com a sidebar do usuário agent (CT-SIDEBAR-014). | O manager visualiza ao menos um item de menu que o atendente não visualiza. A diferença de visibilidade entre os dois roles é perceptível na sidebar. | 🟡 Média | UI | CT-SIDEBAR-014 |
| CT-SIDEBAR-016 | Tokens de design corretos no estado hover (light mode) | Usuário autenticado; light mode ativo | 1. Passar o mouse sobre um item da sidebar no modo colapsado. 2. Verificar o estilo visual do item com hover. | Background com token 'hover' 30% opacidade; texto e ícone com token PrimaryForeground; border-radius 8px. | 🟡 Média | UI | CT-SIDEBAR-002 |
| CT-SIDEBAR-017 | Tokens de design corretos no estado selecionado em dark mode | ⚠️ Bloqueável — dark mode disponível e habilitado | 1. Ativar dark mode. 2. Navegar para uma rota com item no menu. 3. Observar o item ativo. | Background #1A1A2E; ícone e texto na cor #F5F6F8; border-radius 8px. | 🟡 Média | UI | CT-SIDEBAR-008 |
| CT-SIDEBAR-018 | Ícone da Poli em dark mode exibe versão branco e coral | ⚠️ Bloqueável — dark mode disponível e habilitado | 1. Ativar dark mode. 2. Observar o ícone da Poli no topo da sidebar. | Ícone da Poli exibe versão branco e coral (conforme Design System), não a versão padrão de light mode. | 🟡 Média | UI | — |
| CT-SIDEBAR-019 | Mobile — menu abre ao clicar no hamburger | Usuário autenticado; viewport mobile (< 768px) | 1. Acessar a plataforma em viewport mobile. 2. Clicar no ícone hamburger. | O menu lateral abre (comportamento de drawer/overlay). | 🔴 Alta | UI | — |
| CT-SIDEBAR-020 | Mobile — menu fecha ao clicar fora | Usuário autenticado; menu mobile aberto via CT-SIDEBAR-019 | 1. Com menu aberto no mobile, tocar/clicar fora da área do menu. | O menu fecha completamente. | 🔴 Alta | UI | CT-SIDEBAR-019 |
| CT-SIDEBAR-021 | Mobile — Configurações abre com chevron fechado e expande ao clicar | ⚠️ Bloqueável — menu mobile aberto; usuário com permissão de Configurações | 1. Abrir menu no mobile. 2. Observar o item Configurações. 3. Clicar no chevron de Configurações. | Configurações inicia fechado. Ao clicar no chevron, submenus se expandem. | 🟡 Média | UI | CT-SIDEBAR-019 |
| CT-SIDEBAR-022 | Somente ícones do Design System são utilizados na sidebar | Usuário autenticado | 1. Inspecionar visualmente todos os ícones na sidebar expandida. 2. Verificar se há ícones com estilo visual inconsistente com o padrão do DS da Poli (diferenças de traço, peso, estilo). | Todos os ícones apresentam estilo visual consistente com o Design System da Poli. Nenhum ícone com estilo divergente (traço diferente, peso incompatível) está presente. | 🔴 Alta | UI | CT-SIDEBAR-001 |
| CT-SIDEBAR-023 | Sidebar não empurra o conteúdo principal ao expandir | Usuário autenticado; sidebar colapsada; tela de atendimento com chat ativo aberta | 1. Abrir a tela de atendimento (chat ativo). 2. Observar a posição do conteúdo principal (lista de mensagens, input de resposta). 3. Passar o mouse sobre a sidebar para expandir. | O conteúdo principal da tela (chat) não se move, redimensiona nem é deslocado. A sidebar flutua sobrepondo visualmente o conteúdo sem empurrar o layout. | 🔴 Alta | UI | CT-SIDEBAR-002 |
| CT-SIDEBAR-024 | Scroll disponível dentro do submenu de Configurações quando há muitos itens | ⚠️ Bloqueável — submenu de Configurações com múltiplos itens; viewport com altura reduzida ou quantidade de itens suficiente para ultrapassar espaço visível | 1. Expandir o submenu de Configurações. 2. Verificar se há mais itens do que o espaço visível. 3. Tentar rolar dentro do submenu. | Se os itens ultrapassam o espaço visível, o scroll funciona dentro do submenu sem afetar o restante da sidebar ou página. | 🟡 Média | UI | CT-SIDEBAR-006 |
| CT-SIDEBAR-025 | Tentativa de acesso direto via URL a rota restrita por permissão | ⚠️ Bloqueável — usuário com role agent (sem permissão para Configuração de IA, Segurança etc.) | 1. Autenticar com role agent. 2. Tentar acessar diretamente via URL uma rota não permitida (ex: /settings/ai-config). | Acesso é negado. Usuário é redirecionado ou vê tela de permissão insuficiente. A rota não fica acessível apenas por ocultar o item no menu. | 🔴 Alta | UI | CT-SIDEBAR-014 |
| CT-SIDEBAR-026 | Estado ativo preservado após recarregamento da página (F5) | Usuário autenticado; navegando em rota com item de menu correspondente | 1. Navegar para página com item no menu (ex: Chats). 2. Confirmar que o ícone ativo está destacado. 3. Pressionar F5 (recarregar página). 4. Observar a sidebar após o reload. | O ícone correspondente à rota atual continua com destaque de estado Ativo após a recarga. O estado ativo não é perdido com o reload. | 🟡 Média | UI | CT-SIDEBAR-008 |
| CT-SIDEBAR-027 | Accordion — comportamento ao tentar abrir segundo submenu enquanto um está aberto | ⚠️ Bloqueável — sidebar com pelo menos 2 itens com submenu disponíveis; usuário com permissão de acesso a ambos | 1. Expandir a sidebar via hover. 2. Clicar no chevron do item Configurações para abrir o submenu. 3. Clicar no chevron de um segundo item com submenu (se disponível no layout). | O comportamento é consistente com o especificado no Figma: se accordion exclusivo, o primeiro submenu fecha ao abrir o segundo; se múltiplos permitidos, ambos permanecem abertos. O comportamento não varia entre interações. | 🟡 Média | UI | CT-SIDEBAR-006 |

---

## BLOCO 4 — Gherkin (BDD)

### Cenário 🔴 Alta — CT-SIDEBAR-023: Sidebar não empurra o conteúdo principal ao expandir

```gherkin
Feature: Sidebar Nova Versão — Comportamento de Expansão

  Background:
    Given que o usuário está autenticado na plataforma foundation-spa
    And existe um chat ativo na tela de atendimento

  Scenario: Sidebar expande flutuando sobre o conteúdo sem deslocar o layout
    Given a sidebar está no estado colapsado
    And a tela de atendimento exibe o chat ativo com o input de resposta visível
    When o usuário posiciona o cursor sobre a sidebar e aguarda 200ms
    Then a sidebar se expande exibindo ícones e rótulos de texto
    And o conteúdo principal (mensagens e input) mantém a mesma posição e dimensão
    And a sidebar está visualmente sobreposta ao conteúdo sem empurrá-lo
```

### Cenário 🔴 Alta — CT-SIDEBAR-025: Acesso direto via URL a rota restrita por permissão

```gherkin
Feature: Sidebar Nova Versão — Controle de Acesso por Permissão

  Background:
    Given que o usuário está autenticado com role "agent" (atendente)
    And o item "Configuração de IA" não está visível na sidebar (conforme RN6)

  Scenario: Rota restrita permanece inacessível mesmo via acesso direto por URL
    Given o usuário não visualiza a opção "Configuração de IA" na sidebar
    When o usuário tenta acessar diretamente a URL da rota "/settings/ai-config"
    Then o sistema nega o acesso
    And exibe uma tela de permissão insuficiente ou redireciona para uma rota permitida
    And a rota "/settings/ai-config" não é acessada sem a permissão correspondente
```

---

## Validação por Agente Crítico Independente

- Aprovados sem alteração: 21
- Revisados: 4 (CT-SIDEBAR-002, CT-SIDEBAR-015, CT-SIDEBAR-022, CT-SIDEBAR-024)
- Adicionados por cobertura insuficiente: 2 (CT-SIDEBAR-026, CT-SIDEBAR-027)

### Detalhamento das revisões aplicadas

| CT-ID | Problema identificado | Correção aplicada |
|---|---|---|
| CT-SIDEBAR-002 | Resultado esperado duplicava validação de CT-SIDEBAR-023 ("sidebar flutua por cima") | Separação de responsabilidades: CT-002 valida expansão/rótulos; CT-023 valida exclusivamente o comportamento de não-empurrão do conteúdo |
| CT-SIDEBAR-015 | Resultado esperado ambíguo com assunção de itens específicos visíveis para manager não documentados no card | Reformulado para validar diferença de visibilidade entre roles (manager vê mais que agent) sem assumir lista específica |
| CT-SIDEBAR-022 | Pré-requisito "inspeção visual/código" e resultado esperado mencionavam identificação de bibliotecas externas — excesso técnico para QA | Reformulado como verificação de consistência visual do estilo do DS, executável por QA sem acesso ao código |
| CT-SIDEBAR-024 | Assumia que o ambiente teria volume de itens suficiente para scroll sem pré-requisito explícito | Adicionado pré-requisito: "viewport com altura reduzida OU quantidade de itens suficiente para ultrapassar espaço visível" |

### Cenários adicionados por cobertura insuficiente

| CT-ID | Justificativa | RN coberta |
|---|---|---|
| CT-SIDEBAR-026 | Ausência de cenário negativo de persistência do estado ativo após F5/reload — RN4 não era coberta no cenário de reload | RN4 — Preservação do Item Ativo |
| CT-SIDEBAR-027 | Ausência de cenário de borda para accordion com múltiplos submenus — comportamento de exclusividade do accordion não estava coberto | RN3 — Lógica de Submenus (Accordion) |
