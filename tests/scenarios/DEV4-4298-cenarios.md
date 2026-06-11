# Cenários de Teste — DEV4-4298
> Card: [App] Respeitar Safe Area em todas as telas do app
> Gerado em: 2026-06-02
> Card atualizado em: 2026-06-01T15:39:39-03:00

---

## Resumo do Card

- **Título:** [App] Respeitar Safe Area em todas as telas do app
- **Tipo:** História
- **Prioridade:** Medium
- **Status:** Aguardando Cenários de Teste
- **Épico Pai:** DEV4-4104 — [App] Evolução do Aplicativo
- **Objetivo:** Garantir que todos os elementos de interface do app Poli (PoliAPP) sejam renderizados exclusivamente dentro da área segura do dispositivo. O problema atual é que em dispositivos com notch, Dynamic Island, barra de status e barra de navegação, elementos ficam ocultos ou inacessíveis por sobreposição com elementos do sistema operacional.

---

## BLOCO 1 — Estratégia de Teste

O escopo desta entrega é garantir que a Safe Area seja respeitada em 100% das telas do app Poli (PoliAPP) em iOS e Android, cobrindo notch, Dynamic Island, barra de status e barra de navegação. Os tipos de teste aplicáveis são: **funcional visual** (verificação de layout em cada tela/dispositivo), **regressão** (garantir que dispositivos sem notch não regrediram) e **compatibilidade** (múltiplos modelos de dispositivo definidos nos critérios de aceite). A prioridade de execução deve começar pelos dispositivos explicitamente listados nos critérios (iPhone SE, iPhone 14 Pro, iPhone 16, Android gestual e Android com barra física), cobrindo as telas de maior uso. Risco principal: ausência de inventário completo de telas pode deixar telas secundárias sem cobertura; segundo risco é regressão em dispositivos sem notch onde o SafeAreaView pode introduzir padding desnecessário.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Tela secundária (configurações, onboarding, etc.) não coberta pelo SafeAreaView | M | A | 🔴 Alta |
| Dynamic Island (iPhone 14 Pro+) sobrepondo elementos no topo da tela | A | A | 🔴 Alta |
| Barra de navegação Android (gestual) sobrepondo botões na parte inferior | A | A | 🔴 Alta |
| Regressão visual em iPhone SE (tela pequena) — padding excessivo reduz área útil | M | M | 🟡 Média |
| Comportamento incorreto em orientação landscape (se suportada) | B | M | 🟡 Média |
| SafeAreaView aplicado via padding fixo em vez de mecanismo nativo | M | M | 🟡 Média |
| Regressão em dispositivos sem notch — padding adicional inesperado nas bordas | M | B | 🟢 Baixa |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-APP-001 | Safe area no iPhone 14 Pro com Dynamic Island | Dispositivo iPhone 14 Pro (físico ou simulador) com app instalado na build de teste; conta de atendente válida | 1. Abrir o app no iPhone 14 Pro. 2. Fazer login com conta de atendente. 3. Navegar pela tela principal (lista de chats). 4. Verificar visualmente se algum elemento do topo (cabeçalho, ícones, títulos) está sobreposto ou cortado pela Dynamic Island. | Todos os elementos do cabeçalho da tela ficam completamente abaixo da Dynamic Island, sem sobreposição ou corte. Nenhum botão ou campo de texto fica inacessível. | 🔴 Alta | UI | — |
| CT-APP-002 | Safe area na barra de navegação Android gestual | Dispositivo Android com barra de navegação por gestos (físico ou emulador); app instalado; conta de atendente válida | 1. Abrir o app em dispositivo Android com navegação por gestos. 2. Fazer login. 3. Navegar pela tela principal. 4. Verificar se botões ou elementos na parte inferior da tela estão acessíveis e não sobrepostos pela barra de gestos do sistema. | Todos os botões e elementos interativos na parte inferior da tela ficam acima da área de gestos do sistema. Nenhum elemento fica inacessível. | 🔴 Alta | UI | — |
| CT-APP-003 | Cobertura de todas as telas no iPhone 14 Pro | iPhone 14 Pro com app instalado; conta de atendente válida; acesso a todas as telas do app disponíveis | 1. Abrir o app. 2. Fazer login. 3. Navegar por cada tela do app (lista de chats, tela de conversa, configurações, perfil, notificações — todas as telas disponíveis). 4. Em cada tela, verificar se algum elemento fica atrás da Dynamic Island, barra de status ou cantos arredondados. | Em todas as telas, nenhum elemento de interface fica oculto, cortado ou inacessível por elementos do sistema operacional iOS. | 🔴 Alta | UI | CT-APP-001 |
| CT-APP-004 | Cobertura de todas as telas no Android com barra física | Dispositivo Android com barra de navegação física (botões visíveis); app instalado; conta de atendente válida | 1. Abrir o app. 2. Fazer login. 3. Navegar por cada tela do app. 4. Em cada tela, verificar se algum elemento fica atrás ou sobreposto pela barra de navegação inferior. | Em todas as telas, nenhum elemento de interface fica oculto ou inacessível pela barra de navegação inferior do Android. | 🔴 Alta | UI | CT-APP-002 |
| CT-APP-005 | Ausência de regressão no iPhone SE | Dispositivo iPhone SE (tela 4,7") com app instalado; conta de atendente válida | 1. Abrir o app no iPhone SE. 2. Fazer login. 3. Navegar pelas telas principais do app. 4. Verificar se há padding excessivo nas bordas reduzindo a área útil em comparação ao comportamento anterior. 5. Verificar se todos os elementos estão visíveis e acessíveis. | Nenhum padding inesperado ou excessivo é inserido nas telas. A área útil não é reduzida de forma perceptível. Todos os elementos permanecem visíveis e acessíveis, sem regressão visual. | 🟡 Média | UI | — |
| CT-APP-006 | Ausência de regressão em Android sem notch | Dispositivo Android sem notch (tela plana, sem recortes) com app instalado; conta de atendente válida | 1. Abrir o app em dispositivo Android sem notch. 2. Fazer login. 3. Navegar pelas telas principais. 4. Verificar se a aparência visual das telas se mantém idêntica ao comportamento anterior (sem padding extra nas bordas). | Nenhuma regressão visual. A interface não apresenta padding adicional nas bordas nem alteração de layout em relação ao estado anterior. | 🟢 Baixa | UI | — |
| CT-APP-007 | Campo de compose acessível na tela de conversa | iPhone 14 Pro com Dynamic Island; app instalado; chat ativo disponível na conta de teste | 1. Abrir o app no iPhone 14 Pro. 2. Fazer login. 3. Entrar em um chat ativo. 4. Verificar se o campo de digitação de mensagem e o botão de enviar estão completamente visíveis e acessíveis. 5. Tentar digitar uma mensagem e enviá-la. | O campo de texto e o botão de envio ficam completamente visíveis, sem sobreposição pela Dynamic Island ou pela barra de status. É possível digitar e enviar mensagem sem impedimento. | 🔴 Alta | UI | CT-APP-001 |
| CT-APP-008 | Safe area na tela de login (iOS com notch) | Dispositivo iPhone X ou superior (com notch) com app instalado; sem sessão ativa | 1. Abrir o app sem estar logado. 2. Verificar a tela de login: campos de e-mail, senha e botão de entrar. 3. Verificar se algum elemento está cortado pela notch ou barra de status. | Todos os elementos da tela de login (campos de e-mail, senha, botão de entrar) estão completamente visíveis e interagíveis, sem sobreposição por notch ou barra de status. | 🔴 Alta | UI | — |
| CT-APP-009 | Comportamento em orientação landscape | Dispositivo iPhone ou Android com app instalado; **confirmar com o time de desenvolvimento se landscape é suportado antes de executar este cenário** | 1. Confirmar com o time se o app suporta landscape. Se não suportar, registrar como "N/A — landscape não suportado" e encerrar. 2. Abrir o app. 3. Rotacionar o dispositivo para landscape. 4. Navegar pelas telas disponíveis. 5. Verificar se os elementos se adaptam à safe area lateral (notch lateral no iPhone X+). | Se landscape for suportado: a safe area lateral é respeitada e nenhum elemento fica oculto pela notch lateral ou pelas barras do sistema. Se landscape não for suportado: o app bloqueia a rotação ou exibe comportamento adequado sem quebra de layout. | 🟡 Média | UI | — |
| CT-APP-010 | Safe area na tela de configurações/perfil | iPhone 14 Pro com app instalado; conta de gestor válida | 1. Fazer login como gestor. 2. Navegar até a tela de configurações ou perfil. 3. Verificar se todos os elementos da tela ficam dentro da safe area. 4. Verificar especialmente o topo (Dynamic Island) e o rodapé. | Todos os elementos da tela de configurações/perfil ficam visíveis dentro da safe area. Nenhum elemento de formulário ou botão fica inacessível. | 🟡 Média | UI | CT-APP-001 |
| CT-APP-011 | Padding dinâmico vs. padding fixo (comportamento nativo) | Dois dispositivos: um com notch (ex: iPhone 14 Pro) e um sem notch (ex: Android sem recorte); app instalado em ambos | 1. Abrir o app no dispositivo com notch e observar o espaçamento entre o topo da tela e o primeiro elemento de interface. 2. Abrir o app no dispositivo sem notch. 3. Comparar visualmente o espaçamento entre os dois dispositivos. | No dispositivo com notch, o espaçamento no topo é maior (correspondendo ao inset da notch). No dispositivo sem notch, o espaçamento é mínimo (apenas margem de design, sem inset extra). O padding se ajusta dinamicamente ao hardware — não é um valor fixo igual em ambos os dispositivos. | 🟡 Média | UI | — |
| CT-APP-012 | Acesso não autenticado não expõe tela de atendimento | Qualquer dispositivo iOS ou Android com app instalado; sem sessão ativa | 1. Abrir o app sem estar logado. 2. Tentar navegar diretamente para a tela de atendimento (ex: via deep link ou botão de voltar após logout). | O app redireciona para a tela de login. Nenhuma tela de atendimento é exibida sem autenticação. A tela de login respeita corretamente a safe area do dispositivo. | 🔴 Alta | UI | — |
| CT-APP-013 | Safe area no iPhone 16 | Dispositivo iPhone 16 (físico ou simulador) com app instalado; conta de atendente válida | 1. Abrir o app no iPhone 16. 2. Fazer login com conta de atendente. 3. Navegar pela tela principal (lista de chats) e pela tela de conversa. 4. Verificar se algum elemento fica oculto ou cortado pela barra de status, notch ou bordas arredondadas. | Todos os elementos de interface ficam completamente visíveis e acessíveis dentro da safe area. Nenhum elemento fica oculto ou inacessível por elementos do sistema iOS no iPhone 16. | 🔴 Alta | UI | — |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Cenário: Dynamic Island não sobrepõe elementos na tela principal do app
  Dado que o app Poli está instalado em um iPhone 14 Pro com Dynamic Island
  E o usuário está autenticado como atendente
  Quando o usuário abre a tela principal (lista de chats)
  Então todos os elementos do cabeçalho devem estar completamente abaixo da Dynamic Island
  E nenhum botão, ícone ou título deve estar oculto ou parcialmente cortado
  E todos os elementos interativos devem ser acessíveis por toque

Cenário: Barra de navegação Android não sobrepõe botões na parte inferior
  Dado que o app Poli está instalado em um dispositivo Android com barra de navegação por gestos
  E o usuário está autenticado como atendente
  Quando o usuário abre a tela principal e navega até a tela de conversa ativa
  Então o campo de digitação de mensagem e o botão de envio devem estar completamente acima da área de gestos do sistema
  E o usuário deve conseguir digitar e enviar uma mensagem sem que nenhum elemento fique inacessível
```

---

## Observações

- **KB:** Serviço PoliAPP não documentado na KB local. Cenários baseados no card e em conhecimento de safe area em React Native / apps mobile.
- **Validação por agente crítico:** 9 aprovados sem alteração | 2 revisados (CT-APP-009, CT-APP-011) | 1 adicionado por cobertura insuficiente (CT-APP-013)
- **Dispositivos obrigatórios (critérios de aceite):** iPhone SE, iPhone 14 Pro, iPhone 16, Android com navegação gestual, Android com barra física

---

## Resumo Final

| Criticidade | Cenários |
|---|---|
| 🔴 Alta | CT-APP-001, CT-APP-002, CT-APP-003, CT-APP-004, CT-APP-007, CT-APP-008, CT-APP-012, CT-APP-013 |
| 🟡 Média | CT-APP-005, CT-APP-009, CT-APP-010, CT-APP-011 |
| 🟢 Baixa | CT-APP-006 |
| **Total** | **13 cenários** |
