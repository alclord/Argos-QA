# Cenários de Teste — DEV4-4205

> Card: Integrações
> Gerado em: 2026-06-10
> Card atualizado em: 2026-06-10T16:34:04.955-0300

---

## PASSO 0.5 — Resumo do Card

- **Título:** Integrações
- **Tipo:** Epic
- **Prioridade:** Medium
- **Status:** Aguardando Cenários de Teste
- **Atualizado em:** 2026-06-10T16:34:04.955-0300
- **Objetivo:** Migrar todas as integrações do ambiente legado para a nova Tela de Aplicativos, com visual de marketplace centralizado. Cada integração é representada por um card com status de conexão, abrindo right sheet para conexão e configuração sem redirecionamento.

### Escopo — O que está incluído:
- Tela de Aplicativos acessível via **Configurações → Aplicativos** → botão "Integração"
- Cards de integração com logo, nome, descrição curta e status (Disponível / Conectado)
- Badge "Disponível" (default) e Badge "Conectado" (sucess 50%, texto foreground)
- Right sheets para conexão, configuração e edição de cada integração
- Integrações desta entrega: **Z-API**, **NectarCRM**, **RD Station**, **Meta (CAPI/MAPI)**
- Animação "Integração concluída com sucesso!" ao finalizar conexão + configuração completas
- Alerta de sucesso "Integração conectada" ao sair antes de configurar

### Escopo — O que NÃO está incluído:
- Novas integrações fora do pacote Z-API, NectarCRM, RD Station, Meta
- Criação de novos componentes fora do Design System
- Edição de canais Z-API (continua na tela Canais — DEV4-4239)

### Regras de Negócio identificadas:
1. **RN1 — Renderização por entrega:** Apenas integrações homologadas aparecem como cards ativos. Integrações futuras aparecem desabilitadas com badge "Em breve" ou são omitidas.
2. **RN2 — Status de conexão em tempo real:** Cada card reflete o estado real da integração (conectado ou não), atualizando após qualquer ação de conexão ou desconexão.
3. **RN3 — Fluxo em right sheet:** Toda ação de conexão, configuração ou edição ocorre dentro de um right sheet — sem redirecionamento.
4. **RN4 — Reaproveitamento de componentes:** Right sheets reutilizam componentes existentes do design system.
5. **RN5 — Acesso restrito por perfil:** Apenas usuários com perfil **Gestor** acessam a Tela de Aplicativos e configurações de integração.
6. **RN6 — Animação de conclusão:** Animação de sucesso aparece apenas quando o usuário realiza conexão + configuração completas de uma só vez. Se sair antes de configurar, exibe apenas o alerta de sucesso de conexão.

### Subtasks / dependências:
- DEV4-4382 — Z-API
- DEV4-4384 — NectarCRM
- DEV4-4385 — RD Station
- DEV4-4386 — Meta (CAPI/MAPI)
- DEV4-4238 — Animação de sucesso (comum a todos)

---

## BLOCO 1 — Estratégia de Teste

O épico valida a estrutura geral da Tela de Aplicativos como marketplace de integrações. O foco é no layout, navegação, badges de status e comportamento da animação de conclusão. Cada integração específica é coberta pelo card filho correspondente. Cenários aqui cobrem a **casca** do épico: acesso, listagem de cards, badges, right sheet genérico e animação de sucesso.

**Tipos de teste:**
- **Funcional:** navegação na tela de Aplicativos, abertura de right sheets, badges de status, animação de sucesso
- **UX/UI:** layout de cards, badges visuais, padrão de right sheets, stepper
- **Segurança:** acesso restrito a Gestor (RN5)
- **Regressão:** garantir que a transição do legado para a nova tela não quebra funcionalidades existentes

**Riscos principais:**
- Cards de integrações futuras podem aparecer antes da homologação (RN1)
- Status de conexão pode não atualizar em tempo real após ação (RN2)
- Animação de sucesso pode aparecer mesmo quando o usuário saiu antes de configurar (RN6)
- Acesso pode vazar para roles menores que Gestor (RN5)

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade | Impacto | Prioridade |
|---|---|---|---|
| Integrações não homologadas aparecem como cards ativos | Baixa | Alto | Alta |
| Status de conexão não atualiza em tempo real após ação | Média | Alto | Alta |
| Animação de sucesso aparece com conexão parcial (sem configuração) | Baixa | Alto | Alta |
| Right sheet abre em outra página em vez de gaveta lateral | Baixa | Médio | Média |
| Usuário sem role Gestor acessa a Tela de Aplicativos | Baixa | Alto | Alta |
| Badge "Conectado" não usa cor sucess 50% / texto foreground | Baixa | Baixo | Baixa |
| Animação de DEV4-4238 não exibe texto correto para integrações | Baixa | Médio | Média |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-EPI-001 | Acessar tela de Aplicativos via menu Configurações | Usuário logado com role Gestor | 1. Navegar para Configurações → Aplicativos | 1. Tela de Aplicativos deve carregar com layout de marketplace | 🔴 Alta | UI | — |
| CT-EPI-002 | Botão Integração abre listagem de integrações | CT-EPI-001 executado | 1. Localizar botão "Integração" ao lado de "Novo Aplicativo" | 2. Clicar no botão "Integração" | 2. Listagem de cards de integração deve aparecer | 🔴 Alta | UI | CT-EPI-001 |
| CT-EPI-003 | Cards de integração exibem informações corretas | CT-EPI-002 executado | 1. Visualizar cards de integração | 1. Cada card deve exibir: logo da ferramenta, nome, descrição curta e status (Disponível/Conectado) | 🔴 Alta | UI | CT-EPI-002 |
| CT-EPI-004 | Integração Z-API aparece com badge Disponivel e botao Conectar | CT-EPI-002 executado | 1. Localizar card da Z-API | 1. Card da Z-API deve exibir badge "Disponível" e botão "Conectar" | 🔴 Alta | UI | CT-EPI-002 |
| CT-EPI-005 | Integração Nectar aparece com badge e botao correto | CT-EPI-002 executado | 1. Localizar card do NectarCRM | 1. Card deve exibir badge e botão conforme status (Conectar se não conectado / Configurar se conectado) | 🔴 Alta | UI | CT-EPI-002 |
| CT-EPI-006 | Integração RD Station aparece com badge e botao correto | CT-EPI-002 executado | 1. Localizar card do RD Station | 1. Card deve exibir badge e botão conforme status | 🔴 Alta | UI | CT-EPI-002 |
| CT-EPI-007 | Integração Meta aparece com badge e botao correto | CT-EPI-002 executado | 1. Localizar card da Meta (CAPI/MAPI) | 1. Card deve exibir badge e botão conforme status | 🔴 Alta | UI | CT-EPI-002 |
| CT-EPI-008 | Badge Conectado usa visual correto (sucess 50%) | Pelo menos uma integração conectada | 1. Verificar card com status "Conectado" | 1. Badge deve usar cor de fundo sucess 50% com texto em cor foreground | 🟡 Média | UI | — |
| CT-EPI-009 | Clicar no card abre right sheet da integração | CT-EPI-002 executado | 1. Clicar no card de qualquer integração | 1. Right sheet deve abrir sem redirecionamento para outra página (RN3) | 🔴 Alta | UI | CT-EPI-002 |
| CT-EPI-010 | Right sheet segue padrão visual da plataforma | CT-EPI-009 executado | 1. Avaliar componentes do right sheet aberto | 1. Componentes devem seguir o design system existente (RN4) — sem novos padrões visuais | 🟢 Baixa | UI | CT-EPI-009 |
| CT-EPI-011 | Animacao de sucesso aparece apos conclusao completa | Integração sem conexão prévia | 1. Realizar conexão + configuração completas de uma integração | 2. Clicar em ação de finalizar | 2. Animação "Integração concluída com sucesso!" deve aparecer (RN6, texto específico do épico) | 🔴 Alta | UI | — |
| CT-EPI-012 | Alerta de sucesso aparece ao sair antes de configurar | Integração conectada sem configuração | 1. Realizar apenas a conexão de uma integração | 2. Sair antes de configurar | 2. Alerta de sucesso "Integração conectada" deve aparecer (não a animação completa) | 🔴 Alta | UI | — |
| CT-EPI-013 | Status de conexao atualiza em tempo real | CT-EPI-002 executado | 1. Realizar conexão de uma integração | 2. Observar card imediatamente após ação | 2. Badge do card deve mudar para "Conectado" sem recarregar a página (RN2) | 🔴 Alta | UI | — |
| CT-EPI-014 | Gestor acessa tela de Aplicativos | Usuário com role Gestor logado | 1. Navegar para Configurações → Aplicativos | 1. Tela deve ser acessível sem erro de permissão (RN5) | 🔴 Alta | UI | — |
| CT-EPI-015 | Atendente nao acessa tela de Aplicativos | Usuário com role Atendente logado | 1. Navegar para Configurações → Aplicativos | 1. Acesso deve ser bloqueado com mensagem de permissão ou redirecionamento (RN5) | 🔴 Alta | UI | — |
| CT-EPI-016 | Integrações futuras aparecem com badge "Em breve" ou sao omitidas | Sem pré-requisito específico | 1. Verificar se existem integrações planejadas que ainda não foram homologadas | 1. Integrações não homologadas devem aparecer desabilitadas com badge "Em breve" ou não aparecer na listagem (RN1) | 🟡 Média | UI | CT-EPI-002 |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Cenário: Tela de Aplicativos exibe cards de integração com status correto
  Dado que o usuário Gestor está logado na Nova Interface
  Quando acessa Configurações → Aplicativos → Integração
  Então a listagem de cards deve exibir as integrações Z-API, NectarCRM, RD Station e Meta
  E cada card deve mostrar logo, nome, descrição curta e badge de status
  E botão "Conectar" para integrações disponíveis ou "Configurar" para conectadas

Cenário: Animação de sucesso aparece apenas na conclusão completa
  Dado que o usuário está realizando uma integração
  Quando conclui conexão + configuração em um único fluxo
  Então a animação "Integração concluída com sucesso!" deve aparecer
  Quando o usuário sai antes de configurar
  Então apenas o alerta "Integração conectada" deve aparecer
```

---

## PASSO 1.5 — Validação por Agente Crítico

> ⚠️ Agente crítico não executado nesta geração. Cenários baseados exclusivamente no card e nas regras de negócio do épico. Recomenda-se revisão manual antes da publicação.