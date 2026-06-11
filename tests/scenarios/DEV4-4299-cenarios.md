# Cenários de Teste — DEV4-4299
> Card: [App] iOS — Implementar gesto de swipe back para navegação entre telas
> Gerado em: 2026-06-02
> Card atualizado em: 2026-06-01T15:42:12.203-0300

---

## Resumo do Card

- **Título:** [App] iOS — Implementar gesto de swipe back para navegação entre telas
- **Tipo:** História
- **Prioridade:** Medium
- **Status:** Aguardando Cenários de Teste
- **Épico pai:** DEV4-4104 — Evolução do Aplicativo
- **Objetivo:** Implementar o gesto nativo de swipe back do iOS (arrastar da borda esquerda para a direita) no aplicativo Poli, de forma que ele navegue entre telas do app — sem acionar o "voltar" do webview interno. Atualmente o gesto não funciona corretamente porque o app usa webview, criando experiência inconsistente com o padrão iOS.

---

## BLOCO 1 — Estratégia de Teste

O escopo é restrito ao comportamento de navegação por gesto no aplicativo iOS da Poli (PoliAPP). Os tipos de teste aplicáveis são: **funcional** (verificar o gesto em diferentes contextos de stack de navegação), **regressão** (garantir que os botões explícitos continuam funcionando), **UX/interação** (animação nativa e sensação do gesto) e **borda** (tela raiz, gestos parciais, gestos em telas com webview). A prioridade de execução é média, alinhada ao card. O principal risco é o app utilizar webview para a maioria das telas — o gesto pode silenciosamente acionar o histórico do browser interno sem navegação aparente. Todos os testes requerem dispositivos físicos iOS — simuladores podem não reproduzir fielmente o comportamento do gesto nativo de borda.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Gesto aciona "voltar" do webview interno em vez do stack do app | A | A | Alta |
| Gesto na tela raiz produz ação indesejada (ex: fechar app ou navegar no webview) | M | A | Alta |
| Animação de transição não segue padrão nativo do iOS | M | M | Média |
| Gesto não detectado corretamente no iPhone SE (tela menor, área de borda reduzida) | M | M | Média |
| Navegação por botão explícito quebra após implementação do swipe | B | A | Média |
| Swipe back interrompe interação com elementos próximos à borda esquerda | M | M | Média |
| Comportamento inconsistente entre iPhone SE, iPhone 14 Pro e iPhone 16 | B | M | Baixa |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-IOSAPP-001 | Swipe back navega à tela anterior | App instalado no iPhone 14 Pro; usuário autenticado; estar em uma tela de segundo nível (ex: tela de chat aberto) com pelo menos 1 tela anterior no stack | 1. Abrir o app e navegar para uma tela de segundo nível (ex: abrir um chat a partir da listagem). 2. Posicionar o dedo na borda esquerda da tela. 3. Arrastar da esquerda para a direita com velocidade moderada até pelo menos metade da tela. | A tela atual é descartada e a tela anterior é exibida. Animação nativa do iOS ocorre (tela atual sai para a direita, tela anterior entra da esquerda). Nenhum comportamento de "voltar" do webview é acionado. | 🔴 Alta | UI | — |
| CT-IOSAPP-002 | Swipe back exibe animação nativa iOS | App instalado no iPhone 14 Pro; usuário autenticado; estar em tela de segundo nível | 1. Navegar para uma tela de segundo nível. 2. Iniciar gesto de swipe back da borda esquerda lentamente. 3. Observar a animação de transição durante o gesto. | A animação é fluida e segue o padrão nativo do iOS: a tela atual desliza para a direita enquanto a tela anterior aparece pela esquerda. A transição é visualmente consistente com outros apps iOS que usam navegação nativa. | 🔴 Alta | UI | CT-IOSAPP-001 |
| CT-IOSAPP-003 | Gesto na tela raiz não produz ação | App instalado no iPhone 14 Pro; usuário autenticado; estar na tela raiz (listagem de chats — primeira tela após login, sem telas anteriores no stack) | 1. Estar na tela raiz (listagem de chats). 2. Posicionar o dedo na borda esquerda. 3. Arrastar da esquerda para a direita. | Nenhuma ação ocorre: a tela permanece estável, sem animação, sem navegação, sem fechar o app, sem acionar histórico do webview. | 🔴 Alta | UI | — |
| CT-IOSAPP-004 | Gesto não aciona webview interno | App instalado no iPhone 14 Pro; usuário autenticado; estar em tela que contenha webview interno (ex: tela de atendimento com conteúdo web) | 1. Navegar até uma tela que contenha webview embutido. 2. Realizar swipe back da borda esquerda. | O app navega de volta à tela anterior do stack nativo. O webview não executa "voltar" em seu próprio histórico de navegação. O estado e o conteúdo do webview não mudam durante o gesto. | 🔴 Alta | UI | CT-IOSAPP-001 |
| CT-IOSAPP-005 | Botão de voltar explícito continua funcionando | App instalado no iPhone 14 Pro; usuário autenticado; estar em tela de segundo nível com botão "Voltar" visível no header | 1. Navegar para uma tela de segundo nível. 2. Tocar no botão "Voltar" (seta/chevron) no header da tela. | A tela atual é descartada e a tela anterior é exibida corretamente. O comportamento é idêntico ao esperado antes da implementação do swipe back. | 🟡 Média | UI | — |
| CT-IOSAPP-006 | Swipe back em múltiplos níveis de stack | App instalado no iPhone 14 Pro; usuário autenticado; navegar 3 níveis de profundidade | 1. A partir da listagem de chats, navegar para uma tela de segundo nível. 2. A partir desta, navegar para uma tela de terceiro nível. 3. Realizar swipe back na tela de terceiro nível. 4. Realizar swipe back novamente na tela de segundo nível. | Cada swipe back retorna exatamente um nível: do terceiro para o segundo, e do segundo para o primeiro (listagem). O stack é consumido na ordem correta (o mais recente primeiro). | 🟡 Média | UI | CT-IOSAPP-001 |
| CT-IOSAPP-007 | Swipe back cancelado não navega | App instalado no iPhone 14 Pro; usuário autenticado; estar em tela de segundo nível | 1. Iniciar o gesto de swipe back da borda esquerda. 2. Arrastar apenas até 20% da largura da tela. 3. Soltar o dedo sem completar o gesto. | O gesto é cancelado: a tela atual retorna à posição original com animação de retorno. Nenhuma navegação ocorre. O estado da tela permanece inalterado. | 🟡 Média | UI | CT-IOSAPP-001 |
| CT-IOSAPP-008 | Swipe back funciona no iPhone SE | App instalado no iPhone SE; usuário autenticado; estar em tela de segundo nível | 1. Abrir o app no iPhone SE e navegar para tela de segundo nível. 2. Posicionar o dedo na borda esquerda (área de toque pode ser mais restrita neste modelo). 3. Realizar o gesto de swipe back. | O gesto é reconhecido corretamente e a navegação ocorre como esperado, mesmo com a área de borda menor do iPhone SE. | 🟡 Média | UI | — |
| CT-IOSAPP-009 | Swipe back funciona no iPhone 16 | App instalado no iPhone 16; usuário autenticado; estar em tela de segundo nível | 1. Navegar para tela de segundo nível no iPhone 16. 2. Realizar swipe back da borda esquerda. | O gesto funciona corretamente no iPhone 16. Animação nativa é respeitada. Não há conflito com gestos do sistema operacional (ex: gestos da Dynamic Island ou gestos do sistema). | 🟡 Média | UI | — |
| CT-IOSAPP-010 | Swipe iniciado no centro não navega | App instalado no iPhone 14 Pro; usuário autenticado; estar em tela de segundo nível | 1. Navegar para tela de segundo nível. 2. Posicionar o dedo no centro horizontal da tela (não na borda esquerda). 3. Arrastar da esquerda para a direita. | O gesto não é interpretado como swipe back — nenhuma navegação ocorre. O gesto pode rolar o conteúdo da tela (se aplicável) mas não retorna ao nível anterior do stack. | 🟡 Média | UI | — |
| CT-IOSAPP-011 | Elemento na borda esquerda não conflita com swipe | App instalado no iPhone 14 Pro; usuário autenticado; estar em tela com elemento interativo (botão, campo de texto ou item de lista) próximo à borda esquerda | 1. Navegar para uma tela com elemento interativo próximo à borda esquerda. 2. Tocar no elemento interativo para interagir normalmente com ele. 3. Em seguida, realizar swipe back partindo da borda extrema da tela. | A interação com o elemento (passo 2) funciona normalmente sem acionar navegação. O swipe back iniciado na borda extrema (passo 3) navega corretamente para a tela anterior, sem conflito com o elemento. | 🟡 Média | UI | CT-IOSAPP-001 |
| CT-IOSAPP-012 | Stack de navegação limpo após logout e novo login | App instalado no iPhone 14 Pro; dois usuários disponíveis para teste | 1. Fazer login com Usuário A e navegar 2 níveis no stack. 2. Fazer logout do Usuário A. 3. Fazer login com Usuário B. 4. Observar o estado da navegação após o login do Usuário B. 5. Tentar realizar swipe back na tela inicial do Usuário B. | Ao fazer login com o Usuário B, o stack de navegação está limpo — não há telas do Usuário A no histórico. O swipe back na tela raiz do Usuário B não produz nenhuma ação. Não são exibidos dados ou telas pertencentes ao Usuário A. | 🔴 Alta | UI | — |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Cenário: Swipe back navega à tela anterior com animação nativa iOS
  Dado que o usuário está autenticado no app iOS da Poli no iPhone 14 Pro
  E o usuário está em uma tela de segundo nível (ex: tela de um chat aberto)
  Quando o usuário posiciona o dedo na borda esquerda da tela
  E arrasta da esquerda para a direita até completar o gesto
  Então a tela atual é descartada com animação nativa do iOS
  E a tela anterior é exibida corretamente
  E nenhum comportamento de "voltar" do webview interno é acionado
```

```gherkin
Cenário: Gesto de swipe back na tela raiz não produz nenhuma ação
  Dado que o usuário está autenticado no app iOS da Poli no iPhone 14 Pro
  E o usuário está na tela raiz da aplicação (listagem de chats, sem telas anteriores no stack)
  Quando o usuário posiciona o dedo na borda esquerda da tela
  E arrasta da esquerda para a direita
  Então nenhuma navegação ocorre
  E a tela permanece estável sem animação ou mudança de estado
  E o app não é fechado nem minimizado
```

---

## Validação por Agente Crítico

- Aprovados sem alteração: 8
- Revisados: 4 (CT-IOSAPP-002, CT-IOSAPP-006, CT-IOSAPP-007, CT-IOSAPP-011)
- Adicionados por cobertura insuficiente: 0

**Ajustes aplicados:**
- CT-IOSAPP-002: Removida referência a `UINavigationController` (implementação interna); verificação simplificada para comportamento observável
- CT-IOSAPP-006: Generalizado nomes de telas específicas não confirmadas pelo card ("perfil do contato" → "tela de terceiro nível")
- CT-IOSAPP-007: Removida referência ao framework iOS; mantido apenas comportamento observável
- CT-IOSAPP-011: Generalizado para "elemento interativo" em vez de campo de texto específico

---

## Resumo Final

- 🔴 Alta: 4 cenários (CT-IOSAPP-001, CT-IOSAPP-003, CT-IOSAPP-004, CT-IOSAPP-012)
- 🟡 Média: 7 cenários (CT-IOSAPP-002, CT-IOSAPP-005, CT-IOSAPP-006, CT-IOSAPP-007, CT-IOSAPP-008, CT-IOSAPP-009, CT-IOSAPP-010, CT-IOSAPP-011)
- 🟢 Baixa: 0 cenários
- **Total: 12 cenários de teste | 2 cenários Gherkin**

> ⚠️ KB parcial — Serviços/PoliAPP não encontrado na base de conhecimento. Cenários gerados exclusivamente com base nos critérios de aceite e regras de negócio do card.
