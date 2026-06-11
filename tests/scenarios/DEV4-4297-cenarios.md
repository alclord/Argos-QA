# Cenários de Teste — DEV4-4297
> Card: [App] Opção "Manter conectado" — sessão persistente por 30 dias
> Gerado em: 2026-06-02
> Card atualizado em: 2026-06-01T15:34:11.360-0300

---

## Resumo do Card

- **Título:** [App] Opção "Manter conectado" — sessão persistente por 30 dias
- **Tipo:** História
- **Prioridade:** Medium
- **Status:** Aguardando Cenários de Teste
- **Épico pai:** DEV4-4104 — [App] Evolução do Aplicativo
- **Atualizado em:** 01/06/2026 às 15:34 (horário de Brasília)
- **Objetivo:** Adicionar a opção "Manter conectado" na tela de login do app mobile da Poli, permitindo que o usuário mantenha sua sessão ativa por 30 dias sem necessidade de reautenticar. A funcionalidade elimina a fricção diária de login repetido, sendo opt-in (desativada por padrão).

### Escopo — O que está incluído
- Checkbox ou toggle "Manter conectado" na tela de login
- Extensão de sessão por 30 dias quando ativado
- Compatibilidade com login tradicional (e-mail e senha) e login social (Google e Apple)

### Escopo — O que NÃO está incluído
- Alteração no comportamento de sessão da versão web

### Regras de Negócio
1. A opção deve ser **desativada por padrão** — o usuário opta ativamente
2. Ao expirar os 30 dias, o app redireciona para o login **sem perder o contexto** (deep link ou última tela)
3. Logout manual invalida o token **imediatamente**, independente do prazo
4. Troca de senha ou revogação de acesso pelo gestor invalida o token persistido
5. Desinstalar e reinstalar o app exige novo login independente da opção

### Critérios de Aceite
1. Opção "Manter conectado" exibida na tela de login, desativada por padrão
2. Com opção ativada: fechar e reabrir o app dentro de 30 dias → usuário já autenticado
3. Com opção desativada: fechar e reabrir o app → tela de login exibida
4. Após 30 dias: usuário redirecionado para login
5. Logout manual → token invalidado, login exigido no próximo acesso
6. Revogação de acesso pelo gestor → redirecionado para login mesmo com "Manter conectado" ativo
7. Compatível com login social (Google e Apple) — DEV4-4296

### Dependências
- DEV4-4296 (login social Google e Apple)

---

## BLOCO 1 — Estratégia de Teste

O escopo cobre a funcionalidade "Manter conectado" no app mobile da Poli: exibição do componente na tela de login, persistência de sessão por 30 dias, comportamento na expiração, logout manual, revogação por gestor e desinstalação. Os tipos de teste aplicáveis são: **funcional** (fluxo principal de autenticação persistente), **regressão** (login normal não deve ser afetado), **segurança** (token não pode sobreviver a logout, revogação ou reinstalação) e **compatibilidade** (Google e Apple — DEV4-4296). Prioridade de execução: segurança e logout manual primeiro (risco de token indevido), depois happy paths, depois borda. Riscos principais: token persistido não ser invalidado no logout/revogação, estado padrão incorreto do toggle, comportamento diferente entre login tradicional e login social.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Token persistido não é invalidado após logout manual | M | A | 🔴 Alta |
| Revogação de acesso pelo gestor não invalida token no app | M | A | 🔴 Alta |
| Toggle "Manter conectado" ativado por padrão em vez de desativado | M | A | 🔴 Alta |
| Troca de senha não invalida a sessão persistida | M | A | 🔴 Alta |
| Reinstalação do app não exige novo login (token sobrevive no Keychain) | B | A | 🟡 Média |
| Token persiste além dos 30 dias por erro de cálculo/armazenamento | B | A | 🟡 Média |
| Login social (Google/Apple) não respeita a opção "Manter conectado" | M | M | 🟡 Média |
| Contexto (deep link) não preservado após expiração dos 30 dias | B | M | 🟢 Baixa |
| Versão web afetada por alterações de sessão do app | B | M | 🟢 Baixa |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-APP-001 | Toggle desativado por padrão na tela de login | App instalado e na tela de login; usuário não autenticado | 1. Abrir o app. 2. Observar a tela de login. 3. Verificar estado do componente "Manter conectado". | O toggle/checkbox "Manter conectado" está **desativado** por padrão, sem qualquer interação do usuário. | 🔴 Alta | UI | — |
| CT-APP-002 | Sessão persistente: app reabre autenticado (opção ativa) | Usuário com credenciais válidas; "Manter conectado" ativado; login realizado com sucesso | 1. Na tela de login, ativar o toggle "Manter conectado". 2. Inserir e-mail e senha válidos. 3. Confirmar login. 4. Fechar completamente o app. 5. Reabrir o app (dentro de 30 dias). | O app exibe a tela principal sem exibir a tela de login. O usuário está autenticado automaticamente. | 🔴 Alta | UI | CT-APP-001 |
| CT-APP-003 | Sem persistência: app retorna à tela de login (opção inativa) | Usuário com credenciais válidas; "Manter conectado" desativado (padrão) | 1. Na tela de login, manter o toggle "Manter conectado" desativado. 2. Inserir e-mail e senha válidos. 3. Confirmar login. 4. Fechar completamente o app. 5. Reabrir o app. | A tela de login é exibida normalmente. O usuário precisa inserir as credenciais novamente. | 🔴 Alta | UI | CT-APP-001 |
| CT-APP-004 | Logout manual invalida sessão persistida | Usuário autenticado com "Manter conectado" ativo; sessão dentro do prazo de 30 dias | 1. Com sessão persistente ativa, realizar logout manual no app. 2. Fechar completamente o app. 3. Reabrir o app. | A tela de login é exibida. O token anterior é invalidado. Não é possível acessar o app sem novo login. | 🔴 Alta | UI | CT-APP-002 |
| CT-APP-005 | Revogação de acesso pelo gestor invalida sessão | Usuário autenticado com "Manter conectado" ativo; gestor com permissão para revogar acesso | 1. Autenticar o usuário com "Manter conectado" ativo. 2. No painel de gestão, revogar o acesso do usuário (via web). 3. No app, tentar realizar qualquer ação ou aguardar próximo request. | O app redireciona o usuário para a tela de login. A sessão persistida é invalidada. | 🔴 Alta | UI | CT-APP-002 |
| CT-APP-006 | Troca de senha invalida sessão persistida | Usuário autenticado com "Manter conectado" ativo; sessão dentro do prazo de 30 dias | 1. Com sessão persistente ativa no app, realizar troca de senha (via app ou web). 2. No app, tentar realizar qualquer ação ou aguardar próximo request. | O app redireciona para a tela de login. O token gerado antes da troca de senha é inválido. | 🔴 Alta | UI | CT-APP-002 |
| CT-APP-007 | Desinstalação exige novo login após reinstalação | Usuário autenticado com "Manter conectado" ativo | 1. Com sessão persistente ativa, desinstalar completamente o app. 2. Reinstalar o app. 3. Abrir o app. | A tela de login é exibida. Não há sessão armazenada. O usuário precisa autenticar novamente. | 🟡 Média | UI | CT-APP-002 |
| CT-APP-008 | Login social (Google) com opção ativa mantém sessão | Usuário com conta Google vinculada ao app Poli; "Manter conectado" ativado | 1. Na tela de login, ativar "Manter conectado". 2. Selecionar "Entrar com Google". 3. Concluir o fluxo de autenticação Google. 4. Fechar e reabrir o app. | O app abre autenticado sem exigir novo login via Google. A sessão persiste da mesma forma que o login tradicional. | 🟡 Média | UI | CT-APP-001 |
| CT-APP-009 | Login social (Apple) com opção ativa mantém sessão | Usuário com conta Apple ID vinculada; "Manter conectado" ativado; dispositivo iOS | 1. Na tela de login, ativar "Manter conectado". 2. Selecionar "Entrar com Apple". 3. Concluir o fluxo de autenticação Apple. 4. Fechar e reabrir o app. | O app abre autenticado sem exigir novo login via Apple. A sessão persiste da mesma forma que o login tradicional. | 🟡 Média | UI | CT-APP-001 |
| CT-APP-010 | Sessão expira após 30 dias e redireciona para login | Usuário autenticado com "Manter conectado" ativo; token manipulado ou ambiente com data avançada para simular expiração de 30 dias | 1. Simular expiração do token de 30 dias (ajuste de data no ambiente de teste ou via endpoint de expiração forçada). 2. Abrir o app. | O app exibe a tela de login. A sessão expirada não permite acesso sem nova autenticação. | 🟡 Média | UI | CT-APP-002 |
| CT-APP-011 | Contexto preservado após expiração dos 30 dias | Usuário autenticado com "Manter conectado" ativo; o usuário estava em uma tela específica (ex: chat) antes da expiração | 1. Simular expiração do token. 2. Abrir o app a partir de um deep link ou da última tela acessada. 3. Realizar novo login. | Após o login, o usuário é redirecionado para a tela que estava acessando antes da expiração (contexto preservado). | 🟢 Baixa | UI | CT-APP-010 |
| CT-APP-012 | Sessão web não é afetada pela opção do app | Usuário autenticado simultaneamente no app (com "Manter conectado" ativo) e na versão web | 1. Ativar "Manter conectado" no app e autenticar. 2. Autenticar na versão web normalmente. 3. Fazer logout no app. 4. Verificar a sessão web. | O logout no app não invalida a sessão web. A versão web permanece autenticada normalmente. | 🟢 Baixa | UI | CT-APP-004 |
| CT-APP-013 | Token não persiste sem ativação explícita da opção | Usuário autenticado sem "Manter conectado" (padrão); múltiplos acessos ao app | 1. Realizar login sem ativar "Manter conectado". 2. Fechar e reabrir o app N vezes (pelo menos 3). | Em nenhuma das vezes a tela de login é pulada. O comportamento é consistente: sempre exige login. | 🟡 Média | UI | CT-APP-003 |
| CT-APP-014 | Token revogado não concede acesso via API | ⚠️ Bloqueável — requer ambiente de staging com acesso à API autenticada e usuário com sessão persistente ativa | 1. Autenticar usuário com "Manter conectado" ativo e obter token de sessão via endpoint de login. 2. Revogar o acesso do usuário via painel de gestão. 3. Usar o token obtido no passo 1 para realizar uma requisição GET a um endpoint protegido da API. | A API retorna HTTP 401 Unauthorized. O token revogado não concede acesso a nenhum recurso protegido. | 🔴 Alta | API | CT-APP-005 |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Cenário: Toggle "Manter conectado" desativado por padrão na tela de login
  Dado que o app está instalado e o usuário não está autenticado
  Quando a tela de login é exibida
  Então o componente "Manter conectado" deve estar visível
  E o componente deve estar desativado por padrão, sem qualquer interação prévia do usuário

Cenário: Logout manual invalida sessão persistida imediatamente
  Dado que o usuário está autenticado no app com a opção "Manter conectado" ativada
  E a sessão está dentro do prazo de 30 dias
  Quando o usuário realiza logout manual no app
  E fecha completamente o app
  E reabre o app
  Então a tela de login deve ser exibida
  E o token de sessão persistida anterior não deve conceder acesso ao app
```

---

## Validação por Agente Crítico

- Aprovados sem alteração: 13
- Revisados: 1 (CT-APP-014 — excesso técnico corrigido)
- Adicionados por cobertura insuficiente: 0

---

## Resumo Final

| Criticidade | Cenários |
|---|---|
| 🔴 Alta | CT-APP-001, CT-APP-002, CT-APP-003, CT-APP-004, CT-APP-005, CT-APP-006, CT-APP-014 |
| 🟡 Média | CT-APP-007, CT-APP-008, CT-APP-009, CT-APP-010, CT-APP-013 |
| 🟢 Baixa | CT-APP-011, CT-APP-012 |
| **Total** | **14 cenários de teste + 2 cenários Gherkin** |
