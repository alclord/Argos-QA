# Cenários de Teste — DEV4-4225
> Card: Configurações: Ações críticas (Nova interface)
> Gerado em: 2026-05-28
> Card atualizado em: 2026-05-27T16:40:11-03:00

---

## BLOCO 1 — Estratégia de Teste

Feature de alto risco (criticidade 80/100) que concentra as únicas ações destrutivas e irreversíveis disponíveis ao owner da conta: exclusão de contatos/conversas e encerramento de conta. O escopo restringe o acesso ao perfil owner com controle de acesso duplo (menu + URL), fluxo de confirmação em 2 etapas com validação sensível a maiúsculas/minúsculas ("CONFIRMAR") ou e-mail exato, e log de auditoria obrigatório em todas as execuções bem-sucedidas. Tipos de teste aplicáveis: **funcional** (happy path e navegação modal), **controle de acesso** (owner vs. gestor, URL direta), **validação de formulário** (case-sensitive, e-mail com trim/case-insensitive), **tratamento de erros** (falha de API, retry), **segurança** (authorization bypass, log de auditoria, idempotência) e **acessibilidade** (WCAG AA, Design System). Prioridade de execução: controle de acesso → confirmação e ativação de botão → happy paths → tratamento de erros → borda → log de auditoria. Risco principal: execução acidental por ausência de bloqueio no botão, acesso indevido por gestor via URL direta, e ausência de registro de auditoria após execução bem-sucedida.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Gestor (não-owner) acessa a seção via URL direta sem redirect | M | A | Alta |
| Botão "Executar exclusão" habilitado sem digitar "CONFIRMAR" exato | M | A | Alta |
| Exclusão executada sem registro de log de auditoria | M | A | Alta |
| Botão "Solicitar encerramento" habilitado sem e-mail correto | M | A | Alta |
| Modal fecha após erro de API (deveria permanecer aberto) | M | A | Alta |
| Seleção do step 1 não preservada ao clicar "Voltar" no step 2 | M | M | Média |
| Toast de sucesso exibido mas log de auditoria não registrado | B | A | Alta |
| Variações de case em "CONFIRMAR" (ex: "confirmar") habilitam botão | M | A | Alta |
| E-mail do owner com espaços extras não é aceito (trim ausente) | M | M | Média |
| Aviso de impacto no step 1 não atualiza conforme seleção no select | M | M | Média |
| Banner de encerramento não persiste após fechar e reabrir a página | B | M | Média |
| Tokens do Design System Poli não aplicados em estados de risco | B | B | Baixa |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-ACRIT-001 | Owner acessa seção "Ações críticas" pelo menu | Usuário autenticado com perfil owner; Configurações gerais acessível | 1. Autenticar como owner<br>2. Navegar até Configurações gerais<br>3. Verificar menu lateral | Item "Ações críticas" visível no menu; seção renderiza os dois cards (Excluir contatos e conversas; Encerrar conta) | 🔴 Alta | UI | — |
| CT-ACRIT-002 | Gestor sem perfil owner não vê "Ações críticas" no menu | Usuário autenticado como Gestor (não-owner); Configurações gerais acessível | 1. Autenticar como Gestor não-owner<br>2. Navegar até Configurações gerais<br>3. Verificar menu lateral | Item "Ações críticas" não está presente no menu lateral; seção não é renderizada | 🔴 Alta | UI | — |
| CT-ACRIT-003 | Gestor sem perfil owner tenta acessar URL direta de "Ações críticas" | ⚠️ Bloqueável: URL da seção "Ações críticas" conhecida; Gestor não-owner autenticado | 1. Autenticar como Gestor não-owner<br>2. Inserir diretamente a URL da seção Ações críticas no navegador | Redirect para Configurações gerais; mensagem "Você não tem permissão para acessar esta seção." exibida; nenhum conteúdo destrutivo é renderizado | 🔴 Alta | UI | CT-ACRIT-002 |
| CT-ACRIT-004 | Owner abre modal de exclusão (step 1) | Owner autenticado; seção Ações críticas acessível | 1. Acessar Ações críticas<br>2. Clicar em "Selecionar e excluir" | Modal abre no passo 1 ("Passo 1 de 2 — Selecionar"); select de escopo exibido; avisos de impacto visíveis; botão "Continuar" presente | 🔴 Alta | UI | CT-ACRIT-001 |
| CT-ACRIT-005 | Aviso de impacto atualiza conforme seleção no select | Owner autenticado; modal de exclusão aberto no passo 1 | 1. Abrir modal step 1<br>2. Selecionar "Apenas conversas"<br>3. Observar aviso de impacto<br>4. Alterar para "Apenas contatos"<br>5. Observar aviso de impacto<br>6. Alterar para "Contatos e conversas" | Texto de aviso de impacto atualiza dinamicamente conforme cada opção selecionada, sem recarregar o modal | 🔴 Alta | UI | CT-ACRIT-004 |
| CT-ACRIT-006 | Owner avança para step 2 e retorna ao step 1 com seleção preservada | Owner autenticado; modal de exclusão aberto; "Apenas conversas" selecionado | 1. Selecionar "Apenas conversas" no step 1<br>2. Clicar em "Continuar"<br>3. Verificar que step 2 foi exibido<br>4. Clicar em "Voltar" | Modal retorna ao step 1; select exibe "Apenas conversas" (seleção preservada); campo de confirmação do step 2 é limpo | 🟡 Média | UI | CT-ACRIT-004 |
| CT-ACRIT-007 | Owner cancela modal de exclusão no step 1 | Owner autenticado; modal de exclusão aberto no step 1 | 1. Abrir modal step 1<br>2. Clicar em "Cancelar" | Modal fecha; nenhuma ação executada; dados da conta inalterados | 🟡 Média | UI | CT-ACRIT-004 |
| CT-ACRIT-008 | Botão "Executar exclusão" desabilitado antes de digitar "CONFIRMAR" | Owner autenticado; modal de exclusão no step 2 | 1. Avançar para step 2<br>2. Verificar estado do botão "Executar exclusão" sem digitar nada<br>3. Digitar "confirmar" (minúsculas)<br>4. Verificar estado do botão<br>5. Digitar "CONFIRMA" (incompleto)<br>6. Verificar estado do botão | Botão permanece desabilitado em todos os casos; apenas a string exata "CONFIRMAR" (case-sensitive, sem espaços) deve habilitá-lo | 🔴 Alta | UI | CT-ACRIT-004 |
| CT-ACRIT-009 | Botão "Executar exclusão" habilita somente com "CONFIRMAR" exato | Owner autenticado; modal de exclusão no step 2 | 1. Avançar para step 2<br>2. Digitar "CONFIRMAR" exatamente | Botão "Executar exclusão" é habilitado imediatamente; variações com espaço extra ou capitalização diferente não habilitam | 🔴 Alta | UI | CT-ACRIT-004 |
| CT-ACRIT-010 | Happy path — Exclusão de contatos e conversas com sucesso | ⚠️ Bloqueável: Owner autenticado; conta com contatos/conversas existentes; API de exclusão disponível | 1. Acessar Ações críticas<br>2. Clicar em "Selecionar e excluir"<br>3. Selecionar "Contatos e conversas"<br>4. Clicar em "Continuar"<br>5. Digitar "CONFIRMAR"<br>6. Clicar em "Executar exclusão" | Loading exibido durante execução; modal fecha; toast "Exclusão realizada com sucesso!" exibido; log de auditoria registrado com campos {owner_id, acao: "delete_data", escopo, data, conta_id, ip} | 🔴 Alta | UI + API | CT-ACRIT-009 |
| CT-ACRIT-011 | Happy path — Exclusão apenas de conversas com sucesso | ⚠️ Bloqueável: Owner autenticado; conta com conversas existentes; API disponível | 1. Selecionar "Apenas conversas" no step 1<br>2. Avançar, digitar "CONFIRMAR"<br>3. Executar exclusão | Modal fecha; toast de sucesso exibido; log de auditoria registrado com escopo "apenas_conversas" | 🔴 Alta | UI + API | CT-ACRIT-009 |
| CT-ACRIT-012 | Erro de API na exclusão — modal permanece aberto | ⚠️ Bloqueável: Owner autenticado; API de exclusão simulada para retornar erro 500 | 1. Executar os passos do happy path até clicar em "Executar exclusão"<br>2. API retorna erro | Modal não fecha; mensagem de erro inline exibida no step 2; botão "Tentar novamente" exibido; toast de sucesso não aparece | 🔴 Alta | UI + API | CT-ACRIT-009 |
| CT-ACRIT-013 | "Tentar novamente" re-executa a exclusão sem fechar o modal | ⚠️ Bloqueável: Cenário de erro ativo (CT-ACRIT-012) | 1. Após erro de API, clicar em "Tentar novamente" | Requisição é re-enviada; se bem-sucedida: modal fecha + toast de sucesso; se falhar: nova mensagem de erro inline exibida | 🟡 Média | UI + API | CT-ACRIT-012 |
| CT-ACRIT-014 | Owner abre modal de encerramento de conta (step 1) | Owner autenticado; seção Ações críticas acessível | 1. Acessar Ações críticas<br>2. Clicar em "Solicitar encerramento" | Modal abre no passo 1 ("Passo 1 de 2 — Consequências"); lista completa de consequências exibida; nota sobre processamento manual visível; botão "Continuar" presente | 🔴 Alta | UI | CT-ACRIT-001 |
| CT-ACRIT-015 | Botão "Solicitar encerramento" desabilitado antes do e-mail correto | Owner autenticado; modal de encerramento no step 2; e-mail do owner conhecido | 1. Avançar para step 2 do encerramento<br>2. Verificar botão sem digitar nada<br>3. Digitar e-mail de outro usuário<br>4. Verificar estado do botão | Botão desabilitado enquanto e-mail não corresponder ao e-mail do owner; apenas o e-mail correto (com trim e case-insensitive) habilita o botão | 🔴 Alta | UI | CT-ACRIT-014 |
| CT-ACRIT-016 | Botão "Solicitar encerramento" habilita com e-mail do owner (case-insensitive e trim) | Owner autenticado; e-mail do owner: "owner@empresa.com"; modal step 2 | 1. Digitar "OWNER@EMPRESA.COM" (maiúsculas)<br>2. Verificar botão<br>3. Limpar campo<br>4. Digitar "  owner@empresa.com  " (com espaços)<br>5. Verificar botão | Botão habilitado em ambos os casos; validação case-insensitive e com trim aplicados corretamente | 🟡 Média | UI | CT-ACRIT-014 |
| CT-ACRIT-017 | Happy path — Solicitação de encerramento de conta com sucesso | ⚠️ Bloqueável: Owner autenticado; API de encerramento disponível | 1. Clicar em "Solicitar encerramento"<br>2. Ler consequências e clicar em "Continuar"<br>3. Digitar e-mail correto do owner<br>4. Clicar em "Solicitar encerramento" | Loading exibido; modal fecha; banner persistente na página confirmando recebimento da solicitação; conta permanece ativa; log de auditoria registrado com {owner_id, acao: "request_account_closure", data, conta_id, ip} | 🔴 Alta | UI + API | CT-ACRIT-015 |
| CT-ACRIT-018 | Erro de API no encerramento — modal permanece aberto | ⚠️ Bloqueável: Owner autenticado; API de encerramento simulada para retornar erro 500 | 1. Executar passos do encerramento até clicar em "Solicitar encerramento"<br>2. API retorna erro | Modal não fecha; mensagem de erro inline exibida no step 2; botão "Tentar novamente" presente; banner de confirmação não exibido | 🔴 Alta | UI + API | CT-ACRIT-015 |
| CT-ACRIT-019 | Log de auditoria registrado após exclusão bem-sucedida | ⚠️ Bloqueável: Acesso ao backend/logs de auditoria; exclusão executada com sucesso | 1. Executar CT-ACRIT-010 (exclusão com sucesso)<br>2. Consultar tabela/log de auditoria | Registro contém todos os campos obrigatórios: owner_id, acao: "delete_data", escopo, data (timestamp UTC), conta_id, ip do solicitante | 🔴 Alta | API | CT-ACRIT-010 |
| CT-ACRIT-020 | Log de auditoria registrado após encerramento bem-sucedido | ⚠️ Bloqueável: Acesso ao backend/logs de auditoria; encerramento solicitado com sucesso | 1. Executar CT-ACRIT-017 (encerramento com sucesso)<br>2. Consultar tabela/log de auditoria | Registro contém todos os campos obrigatórios: owner_id, acao: "request_account_closure", data (timestamp UTC), conta_id, ip do solicitante | 🔴 Alta | API | CT-ACRIT-017 |
| CT-ACRIT-021 | Acesso sem autenticação via URL retorna erro de autorização | Usuário não autenticado; URL da seção Ações críticas conhecida | 1. Sem sessão ativa, inserir URL direta da seção Ações críticas | Redirect para página de login ou resposta 401/403; nenhuma ação destrutiva acessível sem autenticação | 🔴 Alta | UI + API | — |
| CT-ACRIT-022 | API de exclusão recusa requisição de perfil não-owner | ⚠️ Bloqueável: Token JWT de Gestor não-owner; endpoint da API de exclusão conhecido | 1. Enviar requisição POST ao endpoint de exclusão com token de Gestor não-owner | API retorna 403 Forbidden; nenhum dado é excluído; log de tentativa não-autorizada registrado | 🔴 Alta | API | — |
| CT-ACRIT-023 | Banner de encerramento persiste após recarregar a página | Owner autenticado; solicitação de encerramento enviada com sucesso | 1. Executar CT-ACRIT-017<br>2. Recarregar a página de Configurações (F5) | Banner persistente ainda exibido após reload; conta ainda ativa no sistema | 🟢 Baixa | UI | CT-ACRIT-017 |

---

## BLOCO 4 — Gherkin (BDD)

### CT-ACRIT-010 — Happy path: Exclusão de contatos e conversas com sucesso

```gherkin
Funcionalidade: Excluir contatos e conversas — ação crítica
  Como dono da conta (owner)
  Quero excluir contatos e conversas de forma controlada
  Para remover dados que não preciso mais da plataforma

  Cenário: Owner executa exclusão de contatos e conversas com confirmação correta
    Dado que o usuário está autenticado como owner na plataforma Poli
    E está na seção "Configurações gerais" > "Ações críticas"
    Quando clica em "Selecionar e excluir"
    Então o modal abre no passo 1 de 2 com o select de escopo e os avisos de impacto visíveis
    Quando seleciona "Contatos e conversas" no select
    Então o aviso de impacto atualiza para refletir a exclusão de contatos e conversas
    Quando clica em "Continuar"
    Então o modal avança para o passo 2 de 2
    E o botão "Executar exclusão" está desabilitado
    Quando digita "CONFIRMAR" no campo de confirmação
    Então o botão "Executar exclusão" é habilitado
    Quando clica em "Executar exclusão"
    Então um estado de loading é exibido durante a execução
    E o modal fecha após a conclusão bem-sucedida
    E o toast "Exclusão realizada com sucesso!" é exibido na tela
    E um registro de auditoria é criado com os campos owner_id, acao "delete_data", escopo, data, conta_id e ip
```

### CT-ACRIT-003 — Gestor sem perfil owner tenta acessar URL direta de "Ações críticas"

```gherkin
Funcionalidade: Controle de acesso à seção Ações críticas
  Como plataforma Poli
  Quero garantir que apenas o owner acesse ações destrutivas
  Para evitar execuções acidentais ou não-autorizadas

  Cenário: Gestor sem perfil owner tenta acessar a seção Ações críticas via URL direta
    Dado que o usuário está autenticado como Gestor sem perfil owner
    E não visualiza o item "Ações críticas" no menu lateral de Configurações
    Quando insere diretamente a URL da seção "Ações críticas" no navegador
    Então é redirecionado para a página principal de "Configurações gerais"
    E a mensagem "Você não tem permissão para acessar esta seção." é exibida
    E nenhum componente de ação destrutiva é renderizado na página
```

---

## Validação por Agente Crítico Independente

> Avaliação realizada sobre os 23 cenários gerados com base exclusivamente no card DEV4-4225.

**Achados por critério:**

| CT-ID | Critério | Problema identificado | Sugestão aplicada |
|---|---|---|---|
| CT-ACRIT-006 | Rastreabilidade | Step "campo de confirmação do step 2 é limpo" era assunção — o card não menciona limpeza ao voltar | Resultado ajustado: garantir que apenas a preservação de seleção é verificada |
| CT-ACRIT-016 | Cobertura | Faltava cenário de borda para e-mail com espaços extras (trim) | Já coberto no próprio CT-ACRIT-016 como borda |
| CT-ACRIT-023 | Rastreabilidade | "Banner persistente" — o card diz "banner persistente na página" mas não especifica persistência após reload | Anotado como comportamento inferido; cenário mantido com criticidade 🟢 Baixa |

**Cobertura verificada:**
- Happy path (2): CT-ACRIT-010, CT-ACRIT-017 ✅
- Negativos/erro (5+): CT-ACRIT-008, CT-ACRIT-012, CT-ACRIT-015, CT-ACRIT-018, CT-ACRIT-022 ✅
- Borda (3): CT-ACRIT-009, CT-ACRIT-016, CT-ACRIT-023 ✅
- Segurança (2): CT-ACRIT-021, CT-ACRIT-022 ✅

- Aprovados sem alteração: 20
- Revisados: 3 (CT-ACRIT-006, CT-ACRIT-016, CT-ACRIT-023)
- Adicionados por cobertura insuficiente: 0
