# Cenários de Teste — DEV4-4389
> Card: Bug - Botões do anexo em tela cheia com contraste inadequado
> Gerado em: 2026-06-11
> Card atualizado em: 2026-06-11T09:44:52-0300
> ⚠️ KB inacessível — cenários gerados com base no conteúdo do card. gh CLI indisponível no contexto de geração.
> ✅ Validação por agente crítico independente: 7 aprovados | 2 revisados (CT-ANEXO-007, CT-ANEXO-009)

---

## Estratégia de Teste

O escopo é exclusivamente visual/UX: correção do token de cor dos botões de encaminhar, responder e baixar na visualização de anexo em tela cheia, restrita ao light mode (estado default). O tipo principal de teste é **funcional/regressão UI** com ênfase em inspeção visual de contraste. Testes de regressão são prioritários para garantir que o dark mode e os estados de hover/tooltip do light mode não foram alterados. O risco principal é que a correção de token vaze para contextos não pretendidos (dark mode, visualização inline) ou quebre a funcionalidade dos botões. Prioridade: 1º validar legibilidade no light mode → 2º confirmar que ações funcionam → 3º verificar dark mode e hover/tooltip intactos → 4º validar cobertura cross-type e mobile.

---

## Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Botões permanecem com baixo contraste no light mode após a correção | M | A | Alta |
| Correção de token afeta inadvertidamente o dark mode | M | A | Alta |
| Botões perdem funcionalidade (clique não dispara ação) após ajuste de token | B | A | Alta |
| Hover/tooltip do light mode muda de aparência junto com o fix | M | M | Média |
| Correção vaza para a visualização inline (fora da tela cheia) | B | M | Média |
| Comportamento inconsistente entre tipos de anexo (imagem vs PDF vs vídeo vs documento) | M | M | Média |
| Botões ilegíveis em viewport mobile no light mode | M | M | Média |
| Token aplicado apenas na tela cheia não respeita breakpoints responsivos | B | B | Baixa |

---

## Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-ANEXO-001 | Botões legíveis no light mode em tela cheia | Sistema operando no light mode; chat com ao menos um anexo (imagem) disponível na conversa | 1. Acessar uma conversa que contenha uma imagem enviada. 2. Clicar na imagem para abrir a visualização em tela cheia. 3. Observar os botões de encaminhar, responder e baixar exibidos na tela cheia. 4. Inspecionar visualmente a cor dos ícones/texto dos botões em relação ao fundo escuro da tela cheia. | Os três botões (encaminhar, responder, baixar) são exibidos com cor branca, ficando claramente visíveis sobre o fundo da tela cheia. Contraste mínimo de 3:1 (WCAG 2.1 AA, critério 1.4.11) — conferir valor de referência na imagem anexada ao card DEV4-4389. | 🔴 Alta | UI | — |
| CT-ANEXO-002 | Ações dos botões funcionam após correção | Light mode ativo; chat com ao menos um anexo disponível; outro operador ou contato de teste disponível para encaminhamento | 1. Abrir um anexo em tela cheia. 2. Clicar no botão **Baixar** → verificar que o download do arquivo é iniciado. 3. Fechar e reabrir a tela cheia. 4. Clicar no botão **Responder** → verificar que o modo de resposta ao anexo é ativado no chat. 5. Fechar e reabrir a tela cheia. 6. Clicar no botão **Encaminhar** → verificar que o modal/fluxo de encaminhamento é aberto. | Cada ação é executada corretamente: download iniciado, resposta ao anexo ativada e encaminhamento aberto. Nenhuma ação falha ou fica sem resposta ao clique. | 🔴 Alta | UI | CT-ANEXO-001 |
| CT-ANEXO-003 | Dark mode não é afetado pela correção | Sistema operando no **dark mode**; chat com ao menos um anexo disponível | 1. Alternar a interface para o dark mode. 2. Abrir um anexo em tela cheia. 3. Observar os botões de encaminhar, responder e baixar. 4. Comparar visualmente com o comportamento original documentado (ou screenshot de referência tirado antes da correção). | Os botões apresentam a mesma aparência que tinham antes da correção no dark mode (cor inalterada). A correção não afeta nenhum estado do dark mode (default, hover, tooltip). | 🟡 Média | UI | — |
| CT-ANEXO-004 | Hover no light mode permanece inalterado | Light mode ativo; chat com ao menos um anexo disponível | 1. Abrir um anexo em tela cheia no light mode. 2. Posicionar o cursor sobre o botão **Baixar** e observar o efeito de hover. 3. Repetir para os botões **Encaminhar** e **Responder**. | O estilo de hover (cor de fundo, cor do ícone, animação) dos três botões é idêntico ao estado anterior à correção. Somente o estado default foi alterado. | 🟡 Média | UI | CT-ANEXO-001 |
| CT-ANEXO-005 | Tooltip no light mode permanece inalterado | Light mode ativo; chat com ao menos um anexo disponível | 1. Abrir um anexo em tela cheia no light mode. 2. Manter o cursor sobre cada botão por ~1s para acionar o tooltip. 3. Observar o texto e a aparência do tooltip de cada botão. | Os tooltips dos três botões são exibidos com o mesmo texto, cor e posicionamento que tinham antes da correção. | 🟢 Baixa | UI | CT-ANEXO-001 |
| CT-ANEXO-006 | Correção não vaza para visualização inline | Light mode ativo; chat com ao menos um anexo (imagem) visível na timeline do chat sem abrir tela cheia | 1. Abrir uma conversa com uma imagem enviada. 2. Observar os botões de ação que aparecem sobre a imagem na timeline (sem clicar para tela cheia). 3. Comparar a cor dos botões com o estado anterior à correção. | Os botões exibidos na timeline do chat (fora da tela cheia) não tiveram sua cor alterada. A correção é aplicada somente no modo de visualização em tela cheia. | 🟡 Média | UI | — |
| CT-ANEXO-007 | Todos os tipos de anexo exibem botões corrigidos | Light mode ativo; chat com ao menos um anexo de cada tipo disponível: imagem (JPG/PNG), vídeo (MP4), documento PDF e documento de escritório (.docx ou .xlsx) | 1. Abrir uma **imagem** em tela cheia → verificar visibilidade e cor dos botões. 2. Fechar. Abrir um **vídeo** em tela cheia → verificar visibilidade e cor dos botões. 3. Fechar. Abrir um **PDF** em tela cheia → verificar visibilidade e cor dos botões. 4. Fechar. Abrir um **documento** (.docx ou .xlsx) em tela cheia → verificar visibilidade e cor dos botões. | Para todos os tipos de anexo, os botões de encaminhar, responder e baixar apresentam a cor corrigida com contraste adequado no light mode. Não há inconsistência entre tipos de mídia. | 🟡 Média | UI | CT-ANEXO-001 |
| CT-ANEXO-008 | Botões legíveis em viewport mobile no light mode | Light mode ativo; viewport mobile (375×812px ou dispositivo físico/emulado); chat com ao menos um anexo disponível | 1. Acessar a interface em viewport mobile (375×812px). 2. Abrir uma conversa com um anexo. 3. Tocar no anexo para abrir a visualização em tela cheia. 4. Verificar a visibilidade e contraste dos botões de ação na tela cheia. | Os botões de encaminhar, responder e baixar estão visíveis e com contraste adequado também no viewport mobile, no light mode. Layout e posicionamento dos botões estão preservados. | 🟡 Média | UI | CT-ANEXO-001 |
| CT-ANEXO-009 | Download não expõe URL de mídia sem autenticação | Usuário com sessão válida; chat com ao menos um anexo disponível | 1. Abrir um anexo em tela cheia. 2. Abrir DevTools (F12) → aba Network → filtrar por Media ou Fetch/XHR. 3. Clicar no botão **Baixar** e observar a Request URL da requisição gerada. 4. Copiar a URL de download. 5. Abrir a URL em sessão anônima (sem login). | A URL de download exige autenticação ou é de uso único (token expirado/assinada). Acesso direto sem sessão válida resulta em HTTP 401 ou 403, ou redirecionamento para login, sem expor o conteúdo do arquivo. | 🟢 Baixa | UI | CT-ANEXO-002 |

> **Nota CT-ANEXO-009:** rastreabilidade como regressão de segurança obrigatória para qualquer toque no componente de visualização de anexo — não deriva diretamente dos critérios de aceite do card, mas é um controle padrão do domínio de mídia protegida. Pode ser movido para suíte de regressão de segurança independente se preferido.

---

## Cenários Gherkin (BDD)

```gherkin
Cenário: Botões de ação ficam legíveis ao abrir anexo em tela cheia no light mode
  Dado que o sistema está operando no light mode
  E que existe uma conversa com ao menos um anexo disponível
  Quando o usuário clica no anexo para abrir a visualização em tela cheia
  Então os botões de encaminhar, responder e baixar são exibidos com cor branca
  E o contraste dos botões sobre o fundo da tela cheia atende ao mínimo de 3:1 (WCAG 2.1 AA)
  E os três botões estão claramente identificáveis sem dificuldade visual
```

```gherkin
Cenário: Ações dos botões continuam funcionando após a correção de cor
  Dado que o usuário abriu um anexo na visualização em tela cheia
  E que os botões estão exibidos com a cor corrigida
  Quando o usuário clica no botão Baixar
  Então o download do arquivo é iniciado com sucesso
  Quando o usuário clica no botão Responder
  Então o modo de resposta ao anexo é ativado na conversa
  Quando o usuário clica no botão Encaminhar
  Então o fluxo de encaminhamento do anexo é aberto corretamente
```

---

**Resumo:** 9 cenários — 🔴 2 Alta | 🟡 5 Média | 🟢 2 Baixa | 2 cenários Gherkin
