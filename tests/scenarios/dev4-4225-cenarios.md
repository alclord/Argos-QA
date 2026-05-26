# Cenários de Teste — DEV4-4225
> Card: Financeiro Nativo: Substituição do Embed Super Lógica
> Gerado em: 25/05/2026
> Card atualizado em: 22/05/2026

---

## BLOCO 1 — Estratégia de Teste

Feature de alto impacto (criticidade interna 90/100) que substitui o iframe da Super Lógica por experiência financeira nativa em 3 sub-abas. Tipos de teste aplicáveis: **funcional** (fluxos de faturas, NFs e solicitações), **integração** (backend-to-backend com Super Lógica, circuit breaker, timeout), **segurança** (PCI DSS, acesso por perfil, ausência de credenciais no frontend) e **UX/acessibilidade** (WCAG AA, tokens do Design System). Prioridade de execução: segurança PCI e acesso → integração (circuit breaker/timeout) → fluxos de faturas → NFs e solicitações. Risco principal: regressão na lógica de status de fatura (Pendente/Vencida/Liquidada) e vazamento de dados de cartão pelo backend Poli.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Dados de cartão trafegando pelo backend Poli (violação PCI DSS) | B | A | Alta |
| Falha silenciosa no circuit breaker / timeout 10s | M | A | Alta |
| Lógica de status "Vencida" implementada incorretamente | M | A | Alta |
| Filtro "Pendentes" não incluir status Vencida | M | A | Alta |
| Acesso indevido à aba Financeiro por perfil não-Gestor | B | A | Alta |
| Formulário de cartão abrindo modal/nova tela em vez de inline | M | M | Média |
| Download de boleto disponível para fatura Liquidada | M | M | Média |
| Botão "Enviar" habilitado com mensagem < 10 chars | M | M | Média |
| Paginação não exibida com 21+ faturas | B | M | Média |
| Cache de NFs retornando dados com TTL expirado (> 5 min) | B | B | Baixa |
| Estado vazio exibindo mensagem genérica em vez de contextual | B | B | Baixa |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade |
|---|---|---|---|---|---|
| CT-FIN-001 | Acesso Financeiro via sessão Poli | Usuário autenticado como Gestor; sessão Poli ativa | 1. Acessar tela "Minha Empresa"<br>2. Clicar na aba "Financeiro" | Sub-tab "Faturas e forma de pagamento" ativa por padrão; lista de faturas carrega sem solicitar login Super Lógica; nenhum iframe visível no DOM _(RN1, RN2; CA: sub-tab padrão)_ | 🔴 Alta |
| CT-FIN-002 | Filtro de faturas por status | Gestor autenticado; faturas com status Pendente, Vencida e Liquidada existentes | 1. Acessar Financeiro → sub-tab Faturas<br>2. Verificar filtro ativo<br>3. Clicar em "Pendentes"<br>4. Observar lista<br>5. Clicar em "Pagas" | Filtro "Todas" ativo por padrão; "Pendentes" exibe Pendente + Vencida; "Pagas" exibe apenas Liquidadas; sem reload de página _(RN7, RN9; CA: toggle sem reload)_ | 🔴 Alta |
| CT-FIN-003 | Download de boleto fatura Pendente | Gestor autenticado; fatura com status Pendente ou Vencida existente | 1. Localizar fatura Pendente ou Vencida na lista<br>2. Clicar em "Baixar boleto" | PDF/URL abre em nova aba; botão "Baixar recibo" não exibido para este status _(RN8; CA: baixar boleto apenas Pendente/Vencida)_ | 🔴 Alta |
| CT-FIN-004 | Download de recibo fatura Liquidada | Gestor autenticado; fatura com status Liquidada existente | 1. Localizar fatura com badge verde "Liquidada"<br>2. Clicar em "Baixar recibo" | PDF abre em nova aba; botão "Baixar boleto" não exibido para este status _(RN8; CA: baixar recibo apenas Liquidada)_ | 🔴 Alta |
| CT-FIN-005 | Alteração de pagamento para cartão | Gestor autenticado; forma de pagamento atual: Boleto Bancário | 1. Acessar sub-tab "Faturas e forma de pagamento"<br>2. Clicar em "Alterar"<br>3. Preencher número, nome, validade e CVV válidos<br>4. Clicar em "Salvar alteração"<br>5. Monitorar requisições de rede | Formulário expande inline (sem modal/nova tela); toast "Forma de pagamento atualizada com sucesso!" exibido; formulário recolhe; nenhum dado de cartão enviado ao domínio Poli _(RN10, RN11; CA: inline + toast)_ | 🔴 Alta |
| CT-FIN-006 | Cancelar alteração de pagamento | Gestor autenticado; formulário de cartão aberto e parcialmente preenchido | 1. Clicar em "Alterar"<br>2. Preencher alguns campos<br>3. Clicar em "Cancelar" | Formulário recolhe sem salvar; forma de pagamento anterior inalterada _(CA: Cancelar → formulário recolhe sem salvar)_ | 🟡 Média |
| CT-FIN-007 | Download de nota fiscal em PDF | Gestor autenticado; notas fiscais emitidas na conta | 1. Acessar sub-tab "Notas Fiscais"<br>2. Localizar NF na lista<br>3. Clicar no link de download | PDF abre em nova aba via URL assinada; lista exibe número, competência e valor _(CA: download abre PDF em nova aba — NF)_ | 🟡 Média |
| CT-FIN-008 | Criar solicitação com sucesso | Gestor autenticado; sub-tab Solicitações acessada | 1. Clicar em "Nova solicitação"<br>2. Selecionar departamento "Financeiro"<br>3. Digitar mensagem com ≥ 10 caracteres<br>4. Clicar em "Enviar" | Modal abre; botão "Enviar" habilitado após preenchimento válido; modal fecha + toast de sucesso exibido; nova solicitação aparece na lista _(RN13, RN15; CA: envio com sucesso)_ | 🟡 Média |
| CT-FIN-009 | Falha na API exibe erro amigável | Gestor autenticado; API Super Lógica simulada para retornar erro 500 ou timeout > 10s | 1. Acessar aba Financeiro (qualquer sub-tab) | Banner de erro exibido: "Não foi possível carregar os dados. Tente novamente."; botão "Tentar novamente" presente e funcional; nenhuma mensagem técnica ou tela da Super Lógica exposta _(RN5; CA: falha na API → banner amigável)_ | 🔴 Alta |
| CT-FIN-010 | Número de cartão inválido — erro inline | Gestor autenticado; formulário de cartão aberto | 1. Digitar número de cartão inválido (ex.: "1234 5678 9012 3456")<br>2. Sair do campo (blur) | Mensagem "Número de cartão inválido" exibida abaixo do campo; botão "Salvar alteração" permanece desabilitado _(CA: número inválido → erro inline)_ | 🟡 Média |
| CT-FIN-011 | "Salvar" desabilitado com campos inválidos | Gestor autenticado; formulário de cartão aberto | 1. Deixar campos obrigatórios em branco ou com dados inválidos<br>2. Verificar estado do botão "Salvar alteração" | Botão "Salvar alteração" desabilitado; campos inválidos exibem mensagem de erro após blur _(CA: Salvar desabilitado com campos inválidos)_ | 🟡 Média |
| CT-FIN-012 | Solicitação com mensagem < 10 caracteres | Modal de solicitação aberto; departamento selecionado | 1. Digitar 9 caracteres no campo Mensagem<br>2. Verificar estado do botão "Enviar" | Botão "Enviar" desabilitado; contador exibe "9/1000"; nenhuma submissão possível _(RN14; CA: Enviar desabilitado com Mensagem < 10 chars)_ | 🟡 Média |
| CT-FIN-013 | Solicitação sem departamento selecionado | Modal de solicitação aberto; mensagem válida digitada | 1. Digitar mensagem com ≥ 10 caracteres<br>2. Não selecionar departamento<br>3. Verificar estado do botão "Enviar" | Botão "Enviar" permanece desabilitado _(RN15; CA: Enviar desabilitado sem Departamento)_ | 🟡 Média |
| CT-FIN-014 | Erro de API ao salvar cartão | Gestor autenticado; API do gateway simulada para retornar erro na tokenização | 1. Preencher formulário com dados válidos<br>2. Clicar em "Salvar alteração" | Mensagem de erro inline exibida; formulário não recolhe; dados digitados permanecem preservados; nenhum toast de sucesso exibido _(CA: erro de API → mensagem inline sem perder dados)_ | 🔴 Alta |
| CT-FIN-015 | Sem paginação com exatamente 20 faturas | Conta com exatamente 20 faturas | 1. Acessar sub-tab Faturas com filtro "Todas" | Todas as 20 faturas exibidas em página única; controles de paginação não exibidos _(RN16; CA: paginação apenas quando > 20)_ | 🟢 Baixa |
| CT-FIN-016 | Paginação exibida com 21 faturas | Conta com 21 faturas | 1. Acessar sub-tab Faturas com filtro "Todas"<br>2. Navegar para página 2 | Primeira página exibe 20 faturas; controles de paginação exibidos e funcionais; página 2 exibe a 21ª fatura _(RN16; CA: paginação funcional quando > 20)_ | 🟡 Média |
| CT-FIN-017 | Mensagem de solicitação com 10 caracteres | Modal de solicitação aberto; departamento selecionado | 1. Digitar exatamente 10 caracteres no campo Mensagem | Botão "Enviar" habilitado; contador exibe "10/1000" _(RN14 — limite mínimo exato)_ | 🟢 Baixa |
| CT-FIN-018 | Mensagem de solicitação com 1.000 caracteres | Modal de solicitação aberto; departamento selecionado | 1. Colar exatamente 1.000 caracteres<br>2. Tentar digitar o 1.001º caractere | Campo aceita máximo 1.000 caracteres; 1.001º caractere não inserido; contador exibe "1000/1000"; botão "Enviar" habilitado _(RN14 — limite máximo exato; CA: contador em tempo real)_ | 🟢 Baixa |
| CT-FIN-019 | Estado vazio de faturas por filtro | Conta sem faturas pagas | 1. Acessar Faturas<br>2. Aplicar filtro "Pagas" | Mensagem contextual "Nenhuma fatura paga encontrada." exibida; mensagem genérica não exibida _(CA: estado vazio contextual por filtro)_ | 🟢 Baixa |
| CT-FIN-020 | Estado vazio de notas fiscais | Conta sem notas fiscais emitidas | 1. Acessar sub-tab "Notas Fiscais" | Mensagem "Nenhuma nota fiscal emitida ainda." exibida corretamente _(CA: estado vazio NF)_ | 🟢 Baixa |
| CT-FIN-021 | Acesso bloqueado a perfil não-Gestor | Usuário autenticado com perfil não-Gestor (ex.: Agente) | 1. Tentar acessar "Minha Empresa" → aba "Financeiro" | Aba Financeiro oculta ou acesso negado; dados financeiros não exibidos ao perfil não-Gestor _(RN1: apenas Gestores têm acesso — comportamento exato de bloqueio pendente de confirmação do produto)_ | 🔴 Alta |
| CT-FIN-022 | Ausência de iframe Super Lógica no DOM | Gestor autenticado | 1. Acessar aba Financeiro<br>2. Inspecionar o DOM da página | Nenhum elemento `<iframe>` com domínio Super Lógica presente no DOM _(CA: Nenhum iframe da Super Lógica presente no frontend)_ | 🔴 Alta |
| CT-FIN-023 | Dados de cartão não trafegam pelo backend Poli | Gestor autenticado; ferramenta de monitoramento de rede ativa | 1. Abrir formulário de cartão<br>2. Preencher número, CVV e validade válidos<br>3. Clicar em "Salvar alteração"<br>4. Analisar requisições enviadas ao domínio Poli | Nenhuma requisição a `/api/v1/financial/*` contém PAN, CVV ou validade; tokenização ocorre via SDK do gateway sem passar pelos servidores Poli _(RN11 — PCI DSS obrigatório)_ | 🔴 Alta |

---

## BLOCO 4 — Cenários Gherkin (BDD)

### CT-FIN-001 — Gestor acessa aba Financeiro sem credenciais Super Lógica

```gherkin
Cenário: Gestor acessa aba Financeiro com autenticação automática via sessão Poli
  Dado que o usuário está autenticado como Gestor na plataforma Poli
  E está na tela "Minha Empresa"
  Quando clica na aba "Financeiro"
  Então a sub-aba "Faturas e forma de pagamento" é carregada automaticamente
  E nenhum prompt de login da Super Lógica é exibido
  E nenhum elemento iframe com domínio da Super Lógica está presente no DOM
  E a lista de faturas é carregada com o filtro "Todas" ativo por padrão
```

### CT-FIN-009 — Falha na API Super Lógica exibe banner de erro amigável

```gherkin
Cenário: Falha na integração Super Lógica exibe estado de erro controlado
  Dado que o usuário está autenticado como Gestor
  E a API Super Lógica está indisponível (retorna erro 500 ou timeout superior a 10 segundos)
  Quando acessa qualquer sub-aba da seção Financeiro
  Então um banner de erro é exibido com a mensagem "Não foi possível carregar os dados. Tente novamente."
  E o botão "Tentar novamente" está visível e funcional
  E nenhuma mensagem de erro técnica ou interface da Super Lógica é exposta ao usuário
```

---

## Validação LLM

```
✅ Validação LLM: 23 cenários aprovados | 1 anotado com ressalva (CT-FIN-021 — comportamento de bloqueio para não-Gestores não especificado no card) | 0 removidos
```
