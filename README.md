# Argos

Sistema de QA automatizado para a plataforma **Poli Digital**. Combina agentes de IA via Claude Code com Cypress e Playwright para geração, execução e previsão de riscos em testes end-to-end, com integração direta ao Jira.

---

## Comandos disponíveis

| Comando | O que faz |
|---|---|
| `/qa-jira [CARD-ID]` | Gera cenários de teste a partir de um card Jira |
| `/qa-executor [CARD-ID] [ENV?] [PR?]` | Executa os cenários e publica o resultado no Jira |
| `/qa-pr-impact [PR-NUMBERS] [ENV?]` | Analisa o risco de um ou mais PRs sem executar testes |
| `/argos-predict [DAYS?] [--update-dashboard?]` | Mapa preditivo de risco cruzando Jira, Sentry e GitHub |

---

## Pré-requisitos

- [Claude Code](https://claude.ai/code) instalado
- Node.js 18+
- Conta Jira com acesso à organização
- Token GitHub com acesso aos repositórios da organização

---

## Instalação

```bash
git clone https://github.com/sua-org/argos.git
cd argos
npm install
cp .env.example .env
# edite .env com suas credenciais
```

---

## Configuração

### `.env`

```env
# Credenciais de Staging
STAGING_OPERATOR_EMAIL=seu@email.com
STAGING_OPERATOR_PASSWORD=sua_senha

# Credenciais de Canary
CANARY_OPERATOR_EMAIL=seu@email.com
CANARY_OPERATOR_PASSWORD=sua_senha

# GitHub — necessário para /qa-executor, /qa-pr-impact e /argos-predict
GH_TOKEN=ghp_...

# Base de conhecimento local (opcional — se vazio, busca do GitHub via GH_TOKEN)
KB_PATH=

# Sentry — opcional, habilita análise de erros em produção no /argos-predict
SENTRY_HOST=https://sentry.suaempresa.com
SENTRY_ORG=sua-org
SENTRY_AUTH_TOKEN=sntrys_...

# Cypress — contato dedicado para testes de envio de mensagem
TEST_CONTACT_CHAT_UUID=
```

### `tests/config/qa-environment.local.json`

Criado a partir do `qa-environment.template.json` (versionado). Configure:
- URLs de cada ambiente (`staging`, `canary`, `production`)
- Cloud ID e projetos Jira (`jira.cloudId`, `jira.supportProject`, `jira.devProjects`)
- Repositórios GitHub (`github.owner`, `github.repos`, `github.primaryRepos`)
- Localização da base de conhecimento (`knowledgeBase.github.*`)
- Contatos de teste (`testContacts.default`)

---

## Comandos

### `/qa-jira [CARD-ID]`

Lê um card do Jira e gera cenários de teste estruturados.

- Extrai requisitos e critérios de aceite do card
- Gera cenários `CT-[MÓDULO]-[N]` com pré-condições, passos e resultado esperado
- Classifica por criticidade (🔴 Alta / 🟡 Média / 🟢 Baixa)
- Gera Gherkin para cenários de alta criticidade
- Salva em `tests/scenarios/[CARD-ID]-cenarios.md`
- Publica os cenários como comentário no card Jira

```bash
/qa-jira DEV4-4203
```

---

### `/qa-executor [CARD-ID] [ENV?] [PR-NUMBER?]`

Executa os cenários gerados pelo `/qa-jira` de forma autônoma via Playwright e publica o relatório no Jira.

**Argumentos:**
- `CARD-ID` — obrigatório (ex: `DEV4-4203`)
- `ENV` — opcional: `staging` | `canary` | `production` (padrão: `staging`)
- `PR-NUMBER` — opcional: número do PR para priorizar cenários por impacto

```bash
/qa-executor DEV4-4203
/qa-executor DEV4-4203 canary
/qa-executor DEV4-4203 canary 421
```

**Saídas:**
- Relatório: `tests/reports/[CARD-ID]-relatorio.md`
- Evidências: `tests/evidence/[CARD-ID]/` (screenshots por passo)
- Comentário publicado no card Jira

---

### `/qa-pr-impact [PR-NUMBERS] [ENV?]`

Analisa o risco de um ou mais PRs com base nos arquivos alterados — sem executar testes. Útil para triagem rápida antes de um deploy.

```bash
/qa-pr-impact 421
/qa-pr-impact 421,422,423 canary
```

**O que entrega:**
- Classificação de impacto por módulo (🔴 Alto / 🟡 Médio / 🟢 Baixo)
- Lista de cenários de teste prioritários para cada módulo afetado
- Status de CI e reviews dos PRs
- Recomendação de go/no-go

---

### `/argos-predict [DAYS?] [--update-dashboard?]`

Cruza sinais de suporte (Jira SM), produto (DEV4/GPD), base de conhecimento, Sentry e GitHub para identificar onde a próxima falha vai acontecer.

**Argumentos:**
- `DAYS` — janela de análise em dias (padrão: `14`)
- `--update-dashboard` — regenera `docs/data.js` para o GitHub Pages (omitir no dia a dia para economizar tokens)

```bash
/argos-predict
/argos-predict 30
/argos-predict 14 --update-dashboard
```

**O que entrega (no chat):**
- Sumário executivo com contadores de tickets N1/N2 e cards DEV4
- Ranking de módulos por score de risco (técnico + impacto ao usuário)
- Top 3 bombas: cenários com maior probabilidade de quebrar no próximo ciclo
- Ações prioritárias com consequências de inação

**Saídas em arquivo:**
- `tests/reports/argos-predict-[YYYY-MM-DD].md` — relatório completo com breakdown por módulo
- `tests/reports/argos-predict-latest.md` — cópia do relatório mais recente
- `tests/reports/argos-predict-[YYYY-MM-DD]-risco-modulos.csv`
- `tests/reports/argos-predict-[YYYY-MM-DD]-tickets-sm.csv`
- `tests/reports/argos-predict-[YYYY-MM-DD]-cards-dev.csv`
- `tests/reports/argos-predict-[YYYY-MM-DD]-sentry.csv` (se Sentry configurado)
- `tests/reports/argos-predict-[YYYY-MM-DD]-clusters.csv`

> Requer `JIRA_CLOUD_ID`, `jira.supportProject` e `jira.devProjects` configurados. Sentry e GitHub são opcionais mas aumentam a precisão.

---

## Testes Cypress

Testes estáveis para o fluxo de envio de mensagens no ambiente canary.

```bash
npm run cy:open        # runner interativo
npm run cy:run         # headless completo
npm run cy:run:chat    # apenas testes de chat
```

> Requer `CANARY_OPERATOR_EMAIL` e `CANARY_OPERATOR_PASSWORD` no `.env`.

---

## Estrutura do projeto

```
argos/
├── .claude/
│   └── commands/
│       ├── qa-jira.md            # Agente de geração de cenários
│       ├── qa-executor.md        # Agente de execução de testes
│       ├── qa-pr-impact.md       # Agente de análise de risco de PRs
│       └── argos-predict.md      # Agente de previsão de risco
├── cypress/
│   ├── e2e/chat/
│   │   └── envio-mensagem.cy.js
│   └── support/
│       ├── commands.js           # cy.login(), cy.typeMessage(), cy.sendMessage()
│       └── e2e.js
├── docs/
│   └── data.js                   # Dados para o dashboard GitHub Pages
├── tests/
│   ├── config/
│   │   ├── qa-environment.template.json  # Config versionada (não editar)
│   │   └── qa-environment.local.json     # Config local (não versionar)
│   ├── memory/                   # Histórico de flakiness por módulo
│   ├── scenarios/                # Cenários gerados pelo /qa-jira
│   ├── evidence/                 # Screenshots por execução
│   └── reports/                  # Relatórios e CSVs gerados
├── .env.example                  # Template de credenciais
├── .env                          # Credenciais locais (não versionar)
├── .mcp.json                     # Config do Playwright MCP
└── cypress.config.js
```

---

## Base de conhecimento

Todos os agentes usam uma base de conhecimento para entender o domínio e as regras de negócio da plataforma.

- Se `KB_PATH` estiver configurado no `.env`, lê os arquivos localmente
- Caso contrário, busca direto do GitHub usando o `GH_TOKEN`

Configurada em `qa-environment.local.json` nos campos `knowledgeBase.github.*`.

---

## Aviso sobre contatos de teste

Para testes que envolvem envio de mensagens outbound, configure um contato dedicado em `testContacts.default` no `qa-environment.local.json` e em `TEST_CONTACT_CHAT_UUID` no `.env`.

**Nunca usar contatos reais** — risco de enviar mensagens para clientes em produção.
