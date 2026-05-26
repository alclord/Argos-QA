# Cenários de Teste — DEV4-4147
> Card: 2FA via E-mail no Login
> Gerado em: 2026-05-19

---

## BLOCO 1 — Estratégia de Teste

**Escopo:** Adição do canal e-mail como segunda opção de 2FA, complementando o WhatsApp (DEV4-4145). Cobre o wizard de configuração (Passo 1 com dois cards), o fluxo completo de verificação via e-mail, as regras de segurança (expiração, bloqueio por tentativas, reuso de código) e a funcionalidade de troca de canal em Perfil > Segurança com invalidação de cookies. Foco especial na paridade de comportamento com o canal WhatsApp e nas garantias de segurança do segundo fator.

**Tipos de teste:** Funcional (wizard, verificação, troca de canal), Segurança (bloqueio por tentativas, reuso de código, invalidação de cookies, mascaramento de e-mail), Regressão (fluxo WhatsApp não impactado), UX (estados desabilitados, cooldown de reenvio, template de e-mail).

**Prioridade de execução:** Alta — funcionalidade de segurança crítica que protege acesso à plataforma; erros podem bloquear usuários legítimos ou deixar contas desprotegidas.

**Riscos principais:** Troca de canal não invalida cookies de dispositivos confiáveis (RN05 violado); código expirado aceito como válido; bloqueio por 5 tentativas não disparado; reenvio não invalida código anterior; WhatsApp habilitado para usuários sem telefone; regressão no fluxo 2FA via WhatsApp.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Troca de canal não invalida cookies de dispositivos confiáveis (violação RN05) | M | A | 🔴 Alta |
| Código expirado (> 10 min) aceito como válido (violação RN01) | B | A | 🔴 Alta |
| Bloqueio após 5 tentativas não disparado (violação RN03) | B | A | 🔴 Alta |
| Código já utilizado aceito novamente (violação RN07) | B | A | 🔴 Alta |
| Reenvio não invalida código anterior — dois códigos válidos simultâneos (violação RN02) | M | A | 🔴 Alta |
| Regressão: fluxo 2FA via WhatsApp (DEV4-4145) quebrado após esta entrega | B | A | 🔴 Alta |
| WhatsApp card habilitado para usuário sem número cadastrado | M | M | 🟡 Média |
| E-mail de verificação não entregue em 30s (violação RN06) | M | M | 🟡 Média |
| E-mail mascarado exibe endereço completo (exposição de dado) | B | M | 🟡 Média |
| Template de e-mail quebrado em Outlook ou Apple Mail | M | B | 🟢 Baixa |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade |
|---|---|---|---|---|---|
| CT-2FA-EM-001 | Wizard: seleciona E-mail e recebe código | Usuário sem 2FA configurado; e-mail cadastrado | 1. Logar na plataforma (primeiro acesso sem 2FA). 2. No Passo 1, verificar os dois cards exibidos. 3. Selecionar o card E-mail. 4. Clicar em "Continuar". 5. Verificar Passo 2 e caixa de e-mail. | Dois cards exibidos (E-mail e WhatsApp). Card E-mail selecionável. Passo 2 exibido com subtítulo contendo e-mail mascarado. Código de 6 dígitos recebido no e-mail cadastrado. | 🔴 Alta |
| CT-2FA-EM-002 | Código correto no prazo libera acesso ao Dashboard | Código enviado há menos de 10 min; Passo 2 aberto | 1. Inserir o código correto nos 6 campos OTP. 2. Clicar em "Verificar e entrar na Poli". | Acesso concedido. Usuário redirecionado ao Dashboard. Nenhuma mensagem de erro exibida. | 🔴 Alta |
| CT-2FA-EM-003 | Código incorreto exibe erro e limpa campos | Código inválido disponível para inserção | 1. No Passo 2, inserir código incorreto. 2. Clicar em "Verificar e entrar na Poli". | Campos OTP com borda vermelha. Toast de erro exibido. Campos limpos para nova tentativa. Acesso negado. | 🔴 Alta |
| CT-2FA-EM-004 | 5 tentativas incorretas bloqueiam por 15 min | Passo 2 aberto; usuário com 2FA via e-mail | 1. Inserir código incorreto 5 vezes consecutivas. 2. Verificar comportamento na tela. 3. Verificar caixa de e-mail do usuário. | Bloqueio de 15 minutos aplicado após a 5ª tentativa. Alerta de segurança enviado ao e-mail cadastrado. Acesso impedido durante o período de bloqueio. (RN03) | 🔴 Alta |
| CT-2FA-EM-005 | Código expirado gera toast amarelo | Código enviado há mais de 10 minutos | 1. Aguardar mais de 10 minutos após o envio do código. 2. Inserir o código no Passo 2. 3. Clicar em "Verificar e entrar na Poli". | Toast amarelo de expiração exibido. Acesso negado. Usuário orientado a solicitar reenvio. (RN01) | 🔴 Alta |
| CT-2FA-EM-006 | Reenvio invalida código anterior e respeita cooldown | Passo 2 aberto; cooldown de 60s encerrado | 1. Clicar em "Reenviar código" após os 60 segundos de cooldown. 2. Tentar usar o código anterior no campo OTP. 3. Usar o novo código recebido. | Novo código enviado ao e-mail. Código anterior rejeitado como inválido. Novo código válido concede acesso. (RN02) | 🔴 Alta |
| CT-2FA-EM-007 | Código já utilizado não é aceito novamente | Código já validado com sucesso anteriormente | 1. Anotar o código utilizado em um login anterior. 2. Tentar utilizá-lo em um novo login. | Código rejeitado com mensagem de erro. Acesso negado. Reuso de código não permitido. (RN07) | 🔴 Alta |
| CT-2FA-EM-008 | WhatsApp desabilitado sem número cadastrado | Usuário sem telefone no perfil; Passo 1 do wizard | 1. Acessar o wizard de 2FA sem número de telefone cadastrado. 2. Verificar o estado do card WhatsApp. 3. Tentar clicar no card WhatsApp. | Card WhatsApp exibido com opacidade 50% e não clicável. Tooltip "Cadastre um número em Perfil > Dados" exibido ao passar o mouse. Card E-mail selecionável normalmente. | 🔴 Alta |
| CT-2FA-EM-009 | Troca de canal WhatsApp → E-mail invalida cookies | Usuário com 2FA via WhatsApp configurado; acesso a Perfil > Segurança | 1. Acessar Perfil > Segurança > Verificação em dois passos. 2. Clicar em "Trocar canal". 3. Selecionar E-mail. 4. Confirmar a troca. 5. Verificar cookies de dispositivos confiáveis. | Toast "Canal atualizado com sucesso!" exibido. Todos os cookies de dispositivos confiáveis invalidados imediatamente. Canal ativo atualizado para E-mail. (RN05) | 🔴 Alta |
| CT-2FA-EM-010 | Próximo login após troca usa e-mail | Troca de canal para E-mail realizada; novo login iniciado | 1. Após a troca, fazer logout. 2. Logar novamente com as credenciais. 3. Verificar qual canal é solicitado para o 2FA. | Tela de verificação exibida com canal e-mail (não WhatsApp). Código enviado ao e-mail cadastrado. | 🔴 Alta |
| CT-2FA-EM-011 | Regressão: fluxo WhatsApp não impactado | Usuário com 2FA via WhatsApp configurado; sem troca de canal | 1. Logar com usuário que usa 2FA via WhatsApp. 2. Completar a verificação via WhatsApp normalmente. | Fluxo de verificação via WhatsApp funciona sem alterações. Nenhuma regressão introduzida pelo DEV4-4147. | 🔴 Alta |
| CT-2FA-EM-012 | E-mail mascarado exibido corretamente | Passo 2 do wizard aberto; e-mail cadastrado com formato padrão | 1. Avançar para o Passo 2 com canal E-mail. 2. Verificar o subtítulo da tela de verificação. | Subtítulo exibe e-mail mascarado (ex: `poli*******@seusite.com`). Endereço completo não exposto. | 🟡 Média |
| CT-2FA-EM-013 | Template de e-mail com identidade visual Poli | E-mail de verificação recebido na caixa de entrada | 1. Acionar envio de código. 2. Abrir o e-mail recebido. 3. Verificar remetente, código, aviso de segurança e visual. | Remetente "Poli Digital". Código de 6 dígitos em destaque com validade de 10 min. Bloco de aviso de segurança presente. Identidade visual Poli aplicada corretamente. | 🟡 Média |
| CT-2FA-EM-014 | E-mail entregue em até 30 segundos | Solicitação de código realizada; acesso a ferramenta de timestamp do e-mail | 1. Acionar o envio do código. 2. Registrar o horário da solicitação. 3. Verificar o timestamp de recebimento do e-mail. | E-mail recebido em até 30 segundos após a solicitação. (RN06) | 🟡 Média |
| CT-2FA-EM-015 | Canais independentes por usuário da equipe | Dois usuários da mesma conta com canais diferentes | 1. Usuário A configura 2FA via E-mail. 2. Usuário B configura 2FA via WhatsApp. 3. Ambos fazem login. | Cada usuário verifica pelo canal configurado individualmente. Canal de um não afeta o canal do outro. (RN04) | 🟡 Média |

---

## BLOCO 4 — Cenários Gherkin (BDD)

### CT-2FA-EM-001
```gherkin
Cenário: Wizard exibe dois cards e envia código ao selecionar E-mail
  Dado que o usuário não tem 2FA configurado e possui e-mail cadastrado
  Quando acessa o Passo 1 do wizard de 2FA
  Então dois cards são exibidos: E-mail e WhatsApp
  Quando seleciona o card E-mail e clica em "Continuar"
  Então o Passo 2 é exibido com e-mail mascarado no subtítulo
  E um código de 6 dígitos é enviado ao e-mail cadastrado
```

### CT-2FA-EM-002
```gherkin
Cenário: Código correto no prazo libera acesso ao Dashboard
  Dado que o usuário está no Passo 2 com código válido recebido há menos de 10 minutos
  Quando insere o código correto e clica em "Verificar e entrar na Poli"
  Então o acesso é concedido
  E o usuário é redirecionado ao Dashboard
```

### CT-2FA-EM-003
```gherkin
Cenário: Código incorreto exibe erro e limpa os campos OTP
  Dado que o usuário está no Passo 2 de verificação via e-mail
  Quando insere um código incorreto e clica em "Verificar e entrar na Poli"
  Então os campos OTP exibem borda vermelha
  E um toast de erro é exibido
  E os campos são limpos para nova tentativa
  E o acesso é negado
```

### CT-2FA-EM-004
```gherkin
Cenário: 5 tentativas incorretas bloqueiam o acesso por 15 minutos
  Dado que o usuário está no Passo 2 de verificação via e-mail
  Quando insere código incorreto 5 vezes consecutivas
  Então o acesso é bloqueado por 15 minutos
  E um alerta de segurança é enviado ao e-mail cadastrado
```

### CT-2FA-EM-005
```gherkin
Cenário: Código expirado gera toast amarelo
  Dado que o código de verificação foi enviado há mais de 10 minutos
  Quando o usuário insere o código expirado
  Então um toast amarelo de expiração é exibido
  E o acesso é negado
  E o usuário é orientado a solicitar um novo código
```

### CT-2FA-EM-006
```gherkin
Cenário: Reenvio de código invalida o anterior e respeita cooldown de 60s
  Dado que o usuário está no Passo 2 e o cooldown de 60 segundos expirou
  Quando clica em "Reenviar código"
  Então um novo código é enviado ao e-mail
  E o código anterior é inválido
  Quando usa o novo código para verificar
  Então o acesso é concedido
```

### CT-2FA-EM-007
```gherkin
Cenário: Código já utilizado não é aceito em novo login
  Dado que o usuário utilizou um código de verificação em um login anterior
  Quando tenta reutilizar o mesmo código em um novo login
  Então o código é rejeitado com mensagem de erro
  E o acesso é negado
```

### CT-2FA-EM-008
```gherkin
Cenário: Card WhatsApp desabilitado para usuário sem número cadastrado
  Dado que o usuário não possui número de telefone cadastrado no perfil
  Quando acessa o Passo 1 do wizard de 2FA
  Então o card WhatsApp é exibido com opacidade reduzida e não é clicável
  E ao passar o mouse exibe o tooltip "Cadastre um número em Perfil > Dados"
  E o card E-mail está disponível para seleção
```

### CT-2FA-EM-009
```gherkin
Cenário: Troca de canal invalida todos os cookies de dispositivos confiáveis
  Dado que o usuário tem 2FA configurado via WhatsApp
  Quando acessa Perfil > Segurança e troca o canal para E-mail
  Então o toast "Canal atualizado com sucesso!" é exibido
  E todos os cookies de dispositivos confiáveis são invalidados imediatamente
  E o canal ativo passa a ser E-mail
```

### CT-2FA-EM-010
```gherkin
Cenário: Login após troca de canal usa e-mail como verificação
  Dado que o usuário trocou o canal de 2FA para E-mail
  Quando faz logout e realiza novo login
  Então a tela de verificação solicita o código via e-mail
  E nenhuma solicitação é feita via WhatsApp
```

### CT-2FA-EM-011
```gherkin
Cenário: Fluxo 2FA via WhatsApp não regride após a entrega
  Dado que o usuário tem 2FA configurado via WhatsApp
  E o DEV4-4147 foi deployado
  Quando realiza o login normalmente
  Então a verificação via WhatsApp funciona sem alterações
  E nenhuma regressão é observada no fluxo do DEV4-4145
```

---

## Sugestões para o QA

### Automação

| Cenário | ROI | Justificativa |
|---|---|---|
| CT-2FA-EM-004 | ⭐⭐⭐⭐⭐ Muito Alto | Bloqueio por tentativas — crítico para segurança. Automatizar como: 5 chamadas consecutivas com código inválido + assert de status de bloqueio. Deve rodar a cada deploy. |
| CT-2FA-EM-007 | ⭐⭐⭐⭐⭐ Muito Alto | Reuso de código — simples de automatizar: validar código + tentar reutilizá-lo + assertar rejeição. Protege contra regressão silenciosa que abre brecha de segurança. |
| CT-2FA-EM-006 | ⭐⭐⭐⭐ Alto | Invalidação do código anterior no reenvio — automatizar: enviar código A, solicitar reenvio (código B), tentar código A + assertar rejeição. |
| CT-2FA-EM-009 | ⭐⭐⭐⭐ Alto | Invalidação de cookies na troca de canal — automatizar verificando presença/ausência dos cookies antes e após a troca. |
| CT-2FA-EM-011 | ⭐⭐⭐⭐ Alto | Regressão WhatsApp — deve fazer parte do smoke test do DEV4-4145 que já deve existir. Reaproveitar sem custo adicional. |

### Boas Práticas
- Para CT-2FA-EM-014 (entrega em 30s), usar um provedor de e-mail de teste com timestamp preciso (ex: Mailtrap, Mailhog) — clientes de e-mail reais como Gmail podem atrasar por filtros de spam e comprometer a medição.
- Para CT-2FA-EM-004 (bloqueio), verificar se o ambiente de staging tem um mecanismo de reset do contador de tentativas — sem isso, o QA precisará de uma conta de teste dedicada por execução, ou o teste seguinte irá falhar por conta do bloqueio ativo.
- CT-2FA-EM-013 (template de e-mail) deve ser testado em Gmail, Outlook e Apple Mail conforme checklist do card — usar uma ferramenta como Litmus ou Email on Acid para garantir renderização cross-client antes do deploy.
- Para CT-2FA-EM-015 (canais independentes por usuário), garantir que o ambiente de staging tem pelo menos dois usuários distintos na mesma conta para validar o isolamento de configuração.

### Monitoramento Pós-deploy
- Acompanhar `2fa_verified{channel=email}` / `2fa_screen_shown{channel=email}` — meta ≥ 95% de taxa de verificação conforme tabela de métricas do card.
- Monitorar `2fa_channel_changed` — pico logo após o deploy é esperado (usuários migrando para e-mail); pico contínuo pode indicar atrito com o canal WhatsApp que merece investigação.
- Verificar tempo de entrega do e-mail via provedor (SendGrid/SES) — alertar se P95 ultrapassar 30s em produção, pois afeta a experiência de login diretamente.
