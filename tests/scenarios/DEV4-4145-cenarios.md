# Cenários de Teste — DEV4-4145
> Card: 2FA via WhatsApp no Login
> Gerado em: 2026-05-19

---

## BLOCO 1 — Estratégia de Teste

**Escopo:** Feature de segurança que afeta 100% dos usuários com número de telefone cadastrado. Cobre o wizard de 2 passos (primeiro login), tela de verificação (logins subsequentes), dispositivo confiável (cookie 30 dias), reenvio com cooldown de 60s e bloqueio após 5 tentativas inválidas. Entrega exclusivamente via WhatsApp — sem outros canais neste card.

**Tipos de teste:** Funcional (wizard, OTP, reenvio, cookie), Segurança (bypass do modal, reutilização de código, acesso direto ao dashboard), Regressão (fluxo de login existente não impactado), UX (estados visuais: borda vermelha, toasts, contador de cooldown).

**Prioridade de execução:** Muito Alta — qualquer falha de segurança afeta diretamente 100% dos usuários em todos os logins.

**Riscos principais:** Bypass do modal bloqueante via URL direta, reutilização de código já utilizado, falha silenciosa na entrega do código WhatsApp sem feedback ao usuário, cookie de dispositivo confiável não respeitado, e regressão no fluxo de login existente.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Acesso ao Dashboard sem concluir 2FA (bypass por URL direta) | M | A | 🔴 Alta |
| Código válido reutilizável após primeiro uso | B | A | 🔴 Alta |
| Bloqueio por 5 tentativas inválidas não aplicado corretamente | B | A | 🔴 Alta |
| Modal bloqueante dispensável (ESC, clique fora, back do navegador) | B | A | 🔴 Alta |
| Código WhatsApp não entregue sem feedback ao usuário | M | A | 🔴 Alta |
| Login sem número cadastrado exibe wizard indevidamente | B | A | 🔴 Alta |
| Regressão no fluxo de login existente após deploy | B | A | 🔴 Alta |
| Cookie de dispositivo confiável não criado ou não respeitado | M | M | 🟡 Média |
| Reenvio disponível antes dos 60s de cooldown | B | M | 🟡 Média |
| Novo código não invalida o código anterior | B | M | 🟡 Média |
| Subtítulo exibe número não mascarado ou incorreto | B | M | 🟡 Média |
| Template WhatsApp não usa categoria "Autenticação" no Meta | B | B | 🟢 Baixa |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade |
|---|---|---|---|---|---|
| CT-WA-001 | Wizard WhatsApp: primeiro login → Dashboard | Usuário sem 2FA configurado; número de telefone cadastrado no perfil; 2FA ativo para a conta (CARD-05 ativo); acesso ao WhatsApp cadastrado | 1. Acessar a tela de login. 2. Inserir credenciais válidas e confirmar. 3. Verificar exibição do modal bloqueante (Wizard Passo 1) com card WhatsApp e número mascarado. 4. Selecionar o card WhatsApp. 5. Verificar que botão "Continuar" habilita após seleção. 6. Clicar "Continuar". 7. Verificar Passo 2: subtítulo com número mascarado e 6 campos OTP. 8. Confirmar que código foi enviado automaticamente ao número cadastrado. 9. Inserir o código de 6 dígitos recebido no WhatsApp. 10. Clicar "Verificar e entrar na Poli". | Modal exibido em 2 passos. Código de 6 dígitos enviado automaticamente ao abrir Passo 2. Subtítulo exibe número mascarado corretamente. Após código válido: acesso ao Dashboard (ou tela de Chats — confirmar com Produto). | 🔴 Alta |
| CT-WA-002 | Login subsequente sem cookie confiável → verificação | Usuário com 2FA configurado (WhatsApp); sem cookie de dispositivo confiável válido no navegador | 1. Acessar login com credenciais válidas. 2. Verificar que apenas a tela de verificação é exibida (sem wizard). 3. Confirmar que código foi enviado automaticamente. 4. Inserir código correto. 5. Clicar "Verificar e entrar na Poli". | Tela de verificação exibida sem wizard. Código enviado automaticamente. Após código válido: acesso ao Dashboard. | 🔴 Alta |
| CT-WA-003 | Código incorreto: feedback visual + decremento | Usuário no Passo 2 ou tela de verificação; tentativas disponíveis | 1. Inserir 6 dígitos incorretos nos campos OTP. 2. Clicar "Verificar e entrar na Poli". 3. Observar estado visual dos campos e mensagem exibida. | Campos com borda `#FF675F` (vermelha). Toast: "Código incorreto. Tente novamente." Campos limpos automaticamente. Tentativa decrementada. | 🟡 Média |
| CT-WA-004 | Código expirado exibe toast amarelo | Usuário com código gerado há mais de 10 minutos; no Passo 2 ou tela de verificação | 1. Aguardar expiração do código (> 10 min após envio). 2. Inserir o código expirado nos campos OTP. 3. Clicar verificar. | Toast amarelo (`#FFCA5D`): "Código expirado. Solicite um novo." Acesso negado. | 🟡 Média |
| CT-WA-005 | 5 tentativas inválidas: bloqueio + alerta WhatsApp | Usuário na tela de verificação com 4 tentativas inválidas já registradas na sessão | 1. Inserir o 5º código incorreto. 2. Clicar verificar. 3. Observar estado da interface. 4. Verificar WhatsApp do número cadastrado para alerta de bloqueio. 5. Verificar log de auditoria. | Campos desabilitados. Mensagem inline com timer de 15 minutos. Alerta enviado via WhatsApp ao número cadastrado. Evento de bloqueio registrado em log. | 🔴 Alta |
| CT-WA-006 | Usuário sem número: login normal sem wizard | Usuário sem número de telefone cadastrado no perfil; 2FA ativo para a conta | 1. Acessar login com credenciais válidas. 2. Observar se o Wizard 2FA é exibido. | Wizard NÃO é exibido. Login normal sem 2FA concluído diretamente. | 🟡 Média |
| CT-WA-007 | Reenvio durante cooldown: link com contador | Usuário no Passo 2 ou tela de verificação; código enviado há menos de 60 segundos | 1. Observar estado do link "Reenviar código" imediatamente após recebimento do código. 2. Tentar clicar no link antes de 60 segundos. | Link exibido como desabilitado com contador regressivo: "Reenviar em 0:5X". Clique não dispara novo envio. | 🟢 Baixa |
| CT-WA-008 | Reenvio após cooldown: novo código, anterior inválido | Usuário no Passo 2 ou tela de verificação; código enviado há mais de 60 segundos | 1. Aguardar ≥ 60 segundos após o envio inicial. 2. Clicar "Reenviar código". 3. Tentar usar o código anterior (recebido antes do reenvio). 4. Tentar usar o novo código recebido. | Novo código enviado ao WhatsApp. Código anterior rejeitado como inválido. Novo código válido para autenticação. | 🟡 Média |
| CT-WA-009 | Cookie expirado retoma verificação | Usuário com cookie de dispositivo confiável expirado (> 30 dias); 2FA configurado (WhatsApp) | 1. Acessar login no dispositivo com cookie expirado. 2. Inserir credenciais válidas. 3. Observar se 2FA é solicitado. | Tela de verificação 2FA exibida (sem wizard, pois canal já configurado). Verificação solicitada normalmente. | 🟡 Média |
| CT-WA-010 | Código já utilizado não pode ser reutilizado | Usuário que concluiu autenticação com código válido; acesso ao código utilizado | 1. Concluir autenticação com código válido. 2. Fazer logout. 3. Iniciar nova sessão de verificação. 4. Inserir o mesmo código já utilizado na sessão anterior. 5. Clicar verificar. | Código rejeitado. Toast/mensagem: "Código incorreto. Tente novamente." Código não reutilizável após primeiro uso. | 🔴 Alta |
| CT-WA-011 | Acesso direto ao Dashboard sem 2FA completo | Usuário com credenciais válidas inseridas; Passo 2 do wizard ainda não concluído; URL do Dashboard conhecida | 1. Inserir credenciais válidas na tela de login. 2. Antes de concluir o wizard ou a verificação 2FA, tentar acessar a URL do Dashboard diretamente no navegador. | Redirecionamento para o wizard ou tela de verificação 2FA. Dashboard inacessível sem 2FA completo. | 🔴 Alta |
| CT-WA-012 | Modal bloqueante não pode ser dispensado | Usuário no Wizard Passo 1 ou Passo 2 ativo | 1. Clicar fora da área do modal (sobre o overlay). 2. Pressionar ESC. 3. Clicar no botão "voltar" do navegador. | Modal permanece visível em todas as tentativas. Os 2 passos devem ser concluídos. Overlay `rgba(35,44,61,0.55)` não fecha o modal. | 🔴 Alta |
| CT-WA-013 | Login com cookie válido vai direto ao Dashboard | Usuário com 2FA configurado; login anterior com checkbox marcado; cookie de 30 dias válido | 1. Acessar login no dispositivo com cookie válido. 2. Inserir credenciais válidas. 3. Observar se 2FA é solicitado. | Dashboard acessado diretamente. Nenhuma tela de wizard ou verificação exibida. | 🟡 Média |
| CT-WA-014 | Botão "Continuar" desabilitado sem seleção | Wizard Passo 1 aberto; nenhum canal selecionado | 1. Acessar Wizard Passo 1. 2. Observar estado do botão "Continuar" antes de qualquer seleção. 3. Tentar clicar no botão no estado desabilitado. | Botão "Continuar" desabilitado (não clicável) até que o card WhatsApp seja selecionado. | 🟢 Baixa |
| CT-WA-015 | Botão "Verificar" desabilitado com < 6 dígitos | Usuário no Passo 2 ou tela de verificação | 1. Inserir 1 a 5 dígitos nos campos OTP. 2. Observar estado do botão "Verificar e entrar na Poli". 3. Inserir o 6º dígito e rever o estado. | Botão permanece desabilitado com menos de 6 dígitos. Habilita apenas após preenchimento completo dos 6 campos. | 🟢 Baixa |

---

## BLOCO 4 — Cenários Gherkin (BDD)

### CT-WA-001
```gherkin
Cenário: Wizard WhatsApp concluído com sucesso no primeiro login
  Dado que o usuário não possui 2FA configurado
  E possui número de telefone cadastrado no perfil
  E o 2FA está ativo para a conta
  Quando o usuário insere credenciais válidas na tela de login
  Então o Wizard modal bloqueante é exibido no Passo 1 com o card WhatsApp
  Quando o usuário seleciona WhatsApp e clica em "Continuar"
  Então o Passo 2 é exibido com o número mascarado no subtítulo
  E o código de 6 dígitos é enviado automaticamente para o WhatsApp cadastrado
  Quando o usuário insere o código correto e clica "Verificar e entrar na Poli"
  Então o acesso ao Dashboard é concluído com sucesso
```

### CT-WA-002
```gherkin
Cenário: Login subsequente em dispositivo não confiável exige verificação WhatsApp
  Dado que o usuário possui 2FA configurado via WhatsApp
  E o dispositivo atual não possui cookie de dispositivo confiável válido
  Quando o usuário insere credenciais válidas
  Então apenas a tela de verificação 2FA é exibida (sem wizard)
  E o código é enviado automaticamente para o WhatsApp cadastrado
  Quando o usuário insere o código correto e confirma
  Então o acesso ao Dashboard é concluído com sucesso
```

### CT-WA-005
```gherkin
Cenário: 5 tentativas inválidas geram bloqueio de 15 minutos e alerta WhatsApp
  Dado que o usuário está na tela de verificação 2FA
  E já realizou 4 tentativas com código incorreto
  Quando o usuário insere o 5º código incorreto e confirma
  Então os campos OTP são desabilitados
  E uma mensagem inline com timer de 15 minutos é exibida
  E um alerta de bloqueio é enviado via WhatsApp ao número cadastrado
  E o evento de bloqueio é registrado no log de auditoria
```

### CT-WA-010
```gherkin
Cenário: Código já utilizado não pode ser reutilizado em nova sessão
  Dado que o usuário concluiu a autenticação com um código válido
  Quando o usuário faz logout e inicia uma nova sessão de verificação
  E tenta inserir o mesmo código já utilizado anteriormente
  Então o código é rejeitado com mensagem de código incorreto
  E uma nova solicitação de código é necessária para autenticar
```

### CT-WA-011
```gherkin
Cenário: Acesso direto ao Dashboard sem 2FA completo é bloqueado
  Dado que o usuário inseriu credenciais válidas
  E o wizard ou tela de verificação 2FA ainda não foi concluído
  Quando o usuário tenta acessar a URL do Dashboard diretamente no navegador
  Então o sistema redireciona para o wizard ou tela de verificação 2FA
  E o Dashboard permanece inacessível sem a conclusão do 2FA
```

### CT-WA-012
```gherkin
Cenário: Wizard modal bloqueante não pode ser dispensado sem conclusão
  Dado que o usuário está no Wizard 2FA (Passo 1 ou Passo 2)
  Quando o usuário clica fora da área do modal (sobre o overlay)
  Então o modal permanece visível
  Quando o usuário pressiona ESC
  Então o modal permanece visível
  Quando o usuário clica no botão "voltar" do navegador
  Então o wizard permanece obrigatório e os 2 passos devem ser concluídos
```

---

## Sugestões para o QA

### Automação

| Cenário | ROI | Justificativa |
|---|---|---|
| CT-WA-001 + CT-WA-002 | ⭐⭐⭐⭐⭐ Muito Alto | Cobrem os dois fluxos principais de todos os usuários. Ideais como smoke tests pós-deploy executados a cada release. |
| CT-WA-011 | ⭐⭐⭐⭐⭐ Muito Alto | Teste de bypass de segurança via requisição HTTP direta — simples de automatizar e deve rodar em toda pipeline CI. |
| CT-WA-010 | ⭐⭐⭐⭐ Alto | Reutilização de código é vetor de ataque real. Automatizar como teste de segurança recorrente. |
| CT-WA-005 | ⭐⭐⭐⭐ Alto | Simular 5 tentativas via API e verificar bloqueio. Protege contra regressão de segurança a cada deploy. |
| CT-WA-008 | ⭐⭐⭐ Alto | Idempotência do reenvio. Fácil de automatizar com two-call test (envio + reenvio + validação de invalidação do anterior). |

### Boas Práticas
- Preparar uma conta de teste com número WhatsApp de sandbox (Meta Test Number ou número dedicado de staging) — sem isso, CT-WA-001, 002, 005 e 008 são impraticáveis em CI.
- Para testes de bloqueio (CT-WA-005), ter uma forma de resetar o contador de tentativas entre execuções no ambiente de staging (via API de administração ou diretamente no banco) para não acumular estado entre runs.
- Validar os 3 idiomas (PT-BR, EN, ES) ao menos para as mensagens do template WhatsApp — o card define os textos exatos e o Meta exige aprovação prévia do template; uma discrepância pode bloquear a aprovação.
- Para CT-WA-013 (cookie válido), garantir que o ambiente de teste permita manipular o TTL do cookie para simular os 30 dias sem ter que esperar o prazo real.

### Monitoramento Pós-deploy
- Acompanhar `2fa_wizard_completed / 2fa_wizard_shown` nas primeiras 48h — meta ≥ 98%. Queda indica problema no fluxo do wizard.
- Monitorar `2fa_code_resent / 2fa_screen_shown` — se ultrapassar 10%, investigar falha na entrega do WhatsApp (canal de envio com problema, mensagem em fila, template não aprovado).
- Monitorar `2fa_user_blocked` — meta < 0,5% dos logins. Pico pode indicar ataque de força bruta ou problema de entrega dos códigos.
- Verificar se o template Meta está aprovado na categoria "Autenticação" ANTES do deploy — templates não aprovados bloqueiam todos os envios silenciosamente.
