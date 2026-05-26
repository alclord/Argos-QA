# Cenários de Teste — DEV4-4136
> Card: Autenticação de Dois Fatores (2FA) no Login
> Gerado em: 2026-05-19

---

## BLOCO 1 — Estratégia de Teste

**Escopo:** Feature de segurança que impacta 100% dos usuários em todos os logins. Cobre o wizard de 2 passos (primeiro login), tela de verificação (logins subsequentes), dispositivo confiável (cookie 30 dias), subfluxo TOTP (QR Code), e troca de canal. Entrega exclusivamente frontend/backend — sem impacto visual fora do modal.

**Tipos de teste:** Funcional (todos os fluxos por canal), Segurança (bypass de 2FA, reutilização de código, cookie httpOnly), Regressão (fluxo de login existente), UX/Acessibilidade (navegação por teclado, contraste WCAG AA — ambos em critérios de aceite do card).

**Prioridade de execução:** Muito Alta — criticidade calculada no card: 90/100. Qualquer falha de segurança aqui tem impacto direto em todos os clientes.

**Riscos principais:** Bypass do 2FA por acesso direto à URL do dashboard, reutilização de código já utilizado, modal bloqueante dispensável, cookie de dispositivo confiável não invalidado após troca de canal, e falha de entrega do código (e-mail/WhatsApp) sem feedback ao usuário.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Acesso ao Dashboard sem completar o 2FA (bypass por URL direta) | M | A | 🔴 Alta |
| Código válido reutilizável após primeiro uso | B | A | 🔴 Alta |
| Modal do wizard dispensável (Esc, clique fora, back do navegador) | B | A | 🔴 Alta |
| Bloqueio por 5 tentativas não aplicado corretamente | B | A | 🔴 Alta |
| Cookie de dispositivo confiável não invalidado ao trocar de canal | B | A | 🔴 Alta |
| Código e-mail/WhatsApp não chega ao destinatário sem feedback ao usuário | M | A | 🔴 Alta |
| Regressão no fluxo de login existente após deploy do 2FA | B | A | 🔴 Alta |
| Subfluxo TOTP com QR Code inválido ou dessincronizado | M | M | 🟡 Média |
| Subtítulo dinâmico do Passo 2 exibe dado incorreto ou não mascarado | M | M | 🟡 Média |
| Reenvio de código disponível antes do cooldown de 60s | B | B | 🟢 Baixa |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade |
|---|---|---|---|---|---|
| CT-2FA-001 | Wizard e-mail: fluxo completo → dashboard | Usuário sem 2FA configurado; credenciais válidas; acesso à caixa de e-mail | 1. Acessar login com credenciais válidas. 2. Confirmar exibição do Wizard Passo 1 em modal. 3. Selecionar "E-mail". 4. Clicar "Continuar". 5. Verificar Passo 2 com e-mail mascarado no subtítulo. 6. Confirmar que código foi enviado automaticamente. 7. Inserir código de 6 dígitos. 8. Confirmar que botão habilitou ao 6º dígito. 9. Clicar "Verificar e entrar na Poli". | Dashboard carregado. Modal exibido em 2 passos. Código enviado ao abrir Passo 2. Subtítulo exibe e-mail mascarado conforme template. _(Base: CA "Selecionar e-mail → avança para Passo 2, código enviado automaticamente")_ | 🔴 Alta |
| CT-2FA-002 | Wizard WhatsApp: fluxo completo → dashboard | Usuário sem 2FA; número de telefone cadastrado no perfil; acesso ao WhatsApp | 1. Acessar login. 2. Wizard Passo 1. 3. Selecionar "WhatsApp". 4. Clicar "Continuar". 5. Verificar Passo 2 com telefone mascarado. 6. Inserir código recebido no WhatsApp. 7. Clicar "Verificar e entrar na Poli". | Dashboard carregado. Mensagem WhatsApp recebida no template Meta (categoria Autenticação) com código válido. _(Base: CA "Selecionar WhatsApp → avança para Passo 2, código enviado automaticamente")_ | 🔴 Alta |
| CT-2FA-003 | Wizard TOTP: QR Code + verificação → dashboard | Usuário sem 2FA; app autenticador instalado (Google Auth, Authy ou compatível) | 1. Acessar login. 2. Wizard Passo 1. 3. Selecionar "Aplicativo autenticador". 4. Clicar "Continuar". 5. Verificar subfluxo QR Code. 6. Escanear QR Code no app. 7. Inserir código TOTP gerado. 8. Clicar "Confirmar". 9. Verificar Passo 2 com subtítulo TOTP. 10. Inserir código atual do app. 11. Clicar "Verificar e entrar na Poli". | Dashboard carregado. QR Code exibido antes do Passo 2. Configuração TOTP salva após validação. _(Base: CA "Selecionar Aplicativo → exibe subfluxo QR Code antes do Passo 2")_ | 🔴 Alta |
| CT-2FA-004 | Login subsequente sem dispositivo confiável | Usuário com 2FA configurado (qualquer canal); sem cookie de dispositivo confiável | 1. Acessar login com credenciais válidas. 2. Verificar que somente a tela de verificação é exibida (sem wizard). 3. Inserir código recebido/gerado pelo app. 4. Clicar "Verificar e entrar na Poli". | Dashboard carregado. Wizard não exibido — apenas tela de verificação 2FA. Subtítulo dinâmico correto para o canal configurado. _(Base: RN "dispositivo não confiável → exibir Tela de Verificação 2FA")_ | 🔴 Alta |
| CT-2FA-005 | Login com cookie válido pula verificação 2FA | Usuário com 2FA configurado; login anterior com checkbox "Lembrar dispositivo" marcado; cookie de 30 dias válido | 1. Acessar login com credenciais válidas no dispositivo confiável. 2. Observar se tela de 2FA é exibida. | Dashboard carregado diretamente. Nenhuma tela de wizard ou verificação exibida. _(Base: CA "Cookie válido → Dashboard sem 2FA")_ | 🟡 Média |
| CT-2FA-006 | Código incorreto: feedback visual + decremento | Usuário no Passo 2 do wizard ou tela de verificação; tentativas disponíveis | 1. Inserir código de 6 dígitos incorreto. 2. Clicar "Verificar e entrar na Poli". 3. Observar estado dos campos e mensagem. | Campos com borda vermelha. Campos limpos automaticamente. Mensagem: "Código incorreto. Tente novamente." Tentativa decrementada. _(Base: CA "Código incorreto → campos com borda vermelha, limpeza automática, tentativa decrementada")_ | 🟡 Média |
| CT-2FA-007 | Código expirado exibe toast de aviso | Usuário com código e-mail/WhatsApp gerado há mais de 10 min | 1. Aguardar expiração do código (10 min). 2. Inserir o código expirado. 3. Clicar verificar. | Toast amarelo: "Código expirado. Solicite um novo." _(Base: CA "Código expirado → toast de aviso amarelo" + RN "Validade: 10 min e-mail/WhatsApp")_ | 🟡 Média |
| CT-2FA-008 | 5 tentativas inválidas: bloqueio + alerta | Usuário na tela de verificação com 4 tentativas inválidas já registradas | 1. Inserir o 5º código incorreto. 2. Clicar verificar. 3. Verificar estado da interface. 4. Verificar canal configurado para o alerta. 5. Verificar log de auditoria. | Mensagem: "Muitas tentativas. Tente novamente em 15 minutos." Campos desabilitados. Alerta recebido pelo canal configurado. Registro de bloqueio no log. _(Base: CA "5 tentativas inválidas → bloqueio 15 min + alerta pelo canal + campos desabilitados")_ | 🔴 Alta |
| CT-2FA-009 | Modal bloqueante não pode ser dispensado | Usuário no primeiro login com wizard ativo (Passo 1 ou Passo 2) | 1. Clicar fora da área do modal. 2. Pressionar Esc. 3. Usar o botão "voltar" do navegador. 4. Tentar acessar outra URL diretamente. | Modal permanece visível em todas as tentativas. Os 2 passos devem ser concluídos. Nenhuma ação dispensa o wizard. _(Base: RN "Wizard é modal bloqueante — não pode ser dispensado sem concluir os 2 passos")_ | 🔴 Alta |
| CT-2FA-010 | WhatsApp sem telefone: card desabilitado | Usuário sem número de telefone no perfil; primeiro login com wizard | 1. Acessar login. 2. Wizard Passo 1. 3. Verificar estado do card WhatsApp. 4. Tentar selecioná-lo. | Card WhatsApp desabilitado. Tooltip: "Cadastre um número em Perfil > Dados". Não pode ser selecionado. _(Base: CA "WhatsApp sem número cadastrado → card desabilitado com tooltip orientativo")_ | 🟡 Média |
| CT-2FA-011 | TOTP inválido no subfluxo QR Code | Usuário no subfluxo de configuração TOTP (após selecionar app autenticador) | 1. Escanear QR Code no app. 2. Inserir código TOTP incorreto. 3. Clicar "Confirmar". | Erro inline: "Código incorreto. Verifique se o aplicativo está sincronizado e tente novamente." Campo mantido. Não avança para Passo 2. _(Base: CA "Código TOTP inválido → erro inline, campo mantido")_ | 🟡 Média |
| CT-2FA-012 | Cookie expirado retoma verificação normalmente | Usuário com cookie de dispositivo confiável expirado (após 30 dias); canal já configurado | 1. Acessar login no dispositivo com cookie expirado. 2. Inserir credenciais válidas. | Tela de verificação 2FA exibida (sem wizard, pois canal já configurado). Verificação 2FA solicitada normalmente. _(Base: CA "Cookie expirado → tela de verificação normalmente")_ | 🟡 Média |
| CT-2FA-013 | Troca de canal invalida todos os cookies confiáveis | Usuário com 2FA e ao menos um dispositivo confiável; acesso a Perfil > Segurança | 1. Ir a Perfil > Segurança. 2. Selecionar novo canal e concluir troca. 3. Fazer logout. 4. Tentar login no dispositivo anteriormente confiável. | Tela de verificação 2FA exibida — cookie anterior invalidado. Novo canal utilizado na verificação. _(Base: CA "Troca de canal → todos os cookies invalidados + verificação obrigatória no próximo login")_ | 🔴 Alta |
| CT-2FA-014 | Acesso direto ao dashboard sem 2FA completo | Usuário autenticado por credenciais mas com 2FA pendente; URL do dashboard conhecida | 1. Inserir credenciais válidas. 2. Antes de concluir o 2FA, tentar acessar a URL do dashboard diretamente. | Redirecionamento para wizard ou tela de verificação. Dashboard inacessível sem 2FA completo. _(Base: CA "Acesso direto ao Dashboard sem 2FA completo → redirecionamento correto")_ | 🔴 Alta |
| CT-2FA-015 | Código já utilizado não pode ser reutilizado | Usuário que concluiu autenticação com código e-mail/WhatsApp válido | 1. Concluir autenticação com código válido. 2. Fazer logout. 3. Iniciar nova sessão e inserir o mesmo código na tela de verificação. | Código rejeitado. Mensagem "Código incorreto. Tente novamente." Código invalidado após primeiro uso. _(Base: CA "Código já utilizado não pode ser reutilizado")_ | 🔴 Alta |
| CT-2FA-016 | Reenvio bloqueado durante cooldown de 60s | Usuário no Passo 2 ou tela de verificação com canal e-mail ou WhatsApp | 1. Clicar em "Reenviar código". 2. Tentar clicar novamente antes de 60 segundos. 3. Verificar comportamento para canal TOTP. | Link exibe "Reenviar em {tempo}" durante cooldown. Segundo reenvio indisponível antes de 60s. Para canal TOTP, o link não é exibido. _(Base: CA "Reenvio disponível somente após cooldown de 60s" + RN)_ | 🟢 Baixa |
| CT-2FA-017 | Navegação completa por teclado no wizard | Wizard ou tela de verificação visíveis; sem uso de mouse | 1. Navegar entre cards de canal com Tab. 2. Selecionar canal com Space/Enter. 3. Avançar via Tab + Enter no botão "Continuar". 4. Navegar entre campos OTP com Tab/Backspace. 5. Marcar checkbox com Space. 6. Acionar botão de verificação com Enter. | Todos os elementos focáveis e operáveis via teclado. _(Base: CA "Navegação por teclado completa no wizard e tela de verificação → Sucesso")_ | 🟢 Baixa |

---

## BLOCO 4 — Cenários Gherkin (BDD)

### CT-2FA-001
```gherkin
Cenário: Wizard e-mail concluído com sucesso no primeiro login
  Dado que o usuário não possui 2FA configurado
  E possui credenciais válidas na plataforma
  Quando o usuário insere as credenciais e seleciona "E-mail" no Wizard Passo 1
  Então o Passo 2 é exibido com o e-mail mascarado no subtítulo
  E o código de 6 dígitos é enviado automaticamente para o e-mail cadastrado
  Quando o usuário insere o código correto e clica "Verificar e entrar na Poli"
  Então o Dashboard é carregado com sucesso
```

### CT-2FA-002
```gherkin
Cenário: Wizard WhatsApp concluído com sucesso no primeiro login
  Dado que o usuário não possui 2FA configurado
  E possui número de telefone cadastrado no perfil
  Quando o usuário insere as credenciais e seleciona "WhatsApp" no Wizard Passo 1
  Então o Passo 2 é exibido com o telefone mascarado no subtítulo
  E o código é enviado via WhatsApp no template Meta de autenticação
  Quando o usuário insere o código correto e clica "Verificar e entrar na Poli"
  Então o Dashboard é carregado com sucesso
```

### CT-2FA-003
```gherkin
Cenário: Wizard TOTP com subfluxo QR Code concluído no primeiro login
  Dado que o usuário não possui 2FA configurado
  E possui um app autenticador instalado
  Quando o usuário insere as credenciais e seleciona "Aplicativo autenticador"
  Então o subfluxo de QR Code é exibido antes do Passo 2
  Quando o usuário escaneia o QR Code e confirma com código TOTP válido
  Então o Passo 2 é exibido com subtítulo para canal TOTP
  Quando o usuário insere o código TOTP atual e clica "Verificar e entrar na Poli"
  Então o Dashboard é carregado e a configuração TOTP é salva
```

### CT-2FA-004
```gherkin
Cenário: Login subsequente em dispositivo não confiável exige verificação
  Dado que o usuário possui 2FA configurado
  E o dispositivo atual não possui cookie de dispositivo confiável válido
  Quando o usuário insere as credenciais válidas
  Então somente a tela de verificação 2FA é exibida (sem wizard)
  E o subtítulo dinâmico reflete o canal configurado pelo usuário
  Quando o usuário insere o código correto
  Então o Dashboard é carregado com sucesso
```

### CT-2FA-008
```gherkin
Cenário: 5 tentativas inválidas geram bloqueio e alerta
  Dado que o usuário está na tela de verificação 2FA
  E já realizou 4 tentativas com código incorreto
  Quando o usuário insere o 5º código incorreto e confirma
  Então a interface exibe "Muitas tentativas. Tente novamente em 15 minutos."
  E os campos de código são desabilitados
  E um alerta de bloqueio é enviado pelo canal 2FA configurado
  E o evento de bloqueio é registrado no log de auditoria
```

### CT-2FA-009
```gherkin
Cenário: Wizard bloqueante não pode ser dispensado sem conclusão
  Dado que o usuário está no primeiro login com o Wizard 2FA ativo
  Quando o usuário tenta fechar o modal clicando fora da área
  Então o modal permanece visível
  Quando o usuário pressiona Esc
  Então o modal permanece visível
  Quando o usuário usa o botão "voltar" do navegador ou tenta acessar outra URL
  Então o wizard permanece obrigatório e os 2 passos devem ser concluídos
```

### CT-2FA-013
```gherkin
Cenário: Troca de canal invalida todos os cookies de dispositivos confiáveis
  Dado que o usuário possui 2FA configurado e ao menos um dispositivo confiável ativo
  Quando o usuário acessa Perfil > Segurança e conclui a troca de canal
  E faz logout da plataforma
  Quando o usuário tenta login no dispositivo anteriormente confiável
  Então a tela de verificação 2FA é exibida com o novo canal
  E o cookie anterior é considerado inválido
```

### CT-2FA-014
```gherkin
Cenário: Acesso direto ao dashboard sem 2FA completo é bloqueado
  Dado que o usuário inseriu credenciais válidas
  E o wizard ou tela de verificação 2FA ainda não foi concluído
  Quando o usuário tenta acessar a URL do Dashboard diretamente
  Então o sistema redireciona para o wizard ou tela de verificação 2FA
  E o Dashboard permanece inacessível sem a conclusão do 2FA
```

### CT-2FA-015
```gherkin
Cenário: Código já utilizado não pode ser reutilizado
  Dado que o usuário utilizou um código válido para concluir a autenticação
  Quando o usuário faz logout e inicia uma nova sessão de verificação
  E tenta inserir o mesmo código da sessão anterior
  Então o código é rejeitado com a mensagem "Código incorreto. Tente novamente."
  E uma nova solicitação de código é necessária para autenticação
```

---

## Sugestões para o QA

### Automação

| Cenário | ROI | Justificativa |
|---|---|---|
| CT-2FA-001/002/003 | ⭐⭐⭐⭐⭐ Muito Alto | Parametrizar por canal — os 3 cobrem toda a árvore do wizard. Ideais como smoke tests pós-deploy, executados a cada release. |
| CT-2FA-014 | ⭐⭐⭐⭐⭐ Muito Alto | Teste de bypass de segurança — deve rodar em toda pipeline de CI sem exceção. Simples via requisição HTTP direta. |
| CT-2FA-004 | ⭐⭐⭐⭐ Alto | Cobre o fluxo diário de 100% dos usuários recorrentes. Automação de regressão essencial. |
| CT-2FA-008 | ⭐⭐⭐⭐ Alto | Simular 5 tentativas via API e verificar bloqueio. Protege contra regressão de segurança. |
| CT-2FA-015 | ⭐⭐⭐ Alto | Reutilização de código é um vetor de ataque real. Implementar como teste de segurança recorrente. |

### Boas Práticas
- Preparar 3 contas de teste dedicadas no staging: uma por canal (e-mail com caixa acessível via API, número WhatsApp de sandbox, segredo TOTP fixo e conhecido).
- Para automação de TOTP, usar biblioteca TOTP (ex.: `pyotp` em Python ou `otplib` em JS) com o segredo da conta de teste para gerar o código correto programaticamente.
- Validar o fluxo TOTP manualmente com app real antes de automatizar — diferença de clock pode causar falhas intermitentes; verificar tolerância ±1 intervalo do RFC 6238.
- Testar os 3 idiomas (PT-BR, EN, ES) ao menos para as mensagens de erro críticas — o card define os textos exatos para cada situação.

### Monitoramento Pós-deploy
- Acompanhar `2fa_wizard_completed / 2fa_wizard_shown` nas primeiras 48h — meta ≥ 98%. Queda abaixo indica problema no fluxo.
- Monitorar `2fa_user_blocked` — meta < 0,5% dos logins. Pico pode indicar ataque ou problema de entrega dos códigos.
- Se `2fa_code_resent / 2fa_screen_shown` ultrapassar 10%, investigar entrega nos canais (e-mail em spam, WhatsApp com delay).
