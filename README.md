# Argos

Sistema de QA automatizado para a plataforma **Poli Digital**. Combina agentes de IA via Claude Code com Cypress e Playwright para geração e execução de testes end-to-end, com integração direta ao Jira.

---

## Como funciona

O Argos opera em dois fluxos principais, acionados por comandos no Claude Code:

```
/qa-jira [CARD-ID]                        → gera cenários de teste a partir do card
/qa-executor [CARD-ID] [ENV?] [PR-NUMBER?] → executa os cenários e publica o resultado no Jira
```

Além disso, há testes Cypress estáveis para fluxos críticos que podem ser rodados independentemente.

---

## Pré-requisitos

- [Claude Code](https://claude.ai/code) instalado
- Node.js 18+
- Conta Jira com acesso à organização
- Token GitHub com acesso aos repositórios da organização (para análise de PR)

---

## Instalação

```bash
# Clone o repositório
git clone https://github.com/sua-org/argos.git
cd argos

# Instale as dependências
npm install

# Configure as credenciais
cp .env.example .env
# Edite .env com suas credenciais (veja seção Configuração abaixo)
```

---

## Configuração

Copie `.env.example` para `.env` e preencha:

```env
# Credenciais de Staging
STAGING_OPERATOR_EMAIL=seu@email.com
STAGING_OPERATOR_PASSWORD=sua_senha

# Credenciais de Canary
CANARY_OPERATOR_EMAIL=seu@email.com
CANARY_OPERATOR_PASSWORD=sua_senha

# GitHub — necessário para análise de PR no /qa-executor
GH_TOKEN=ghp_...

# Base de conhecimento local (opcional — se vazio, busca do GitHub com GH_TOKEN)
KB_PATH=
```

> As URLs de ambiente, configurações do Jira e contatos de teste estão em `tests/config/qa-environment.template.json` — esse arquivo é versionado e não precisa ser editado.

---

## Comandos

### `/qa-jira [CARD-ID]`

Lê um card do Jira e gera cenários de teste estruturados.

**O que faz:**
- Busca o card e extrai requisitos e critérios de aceite
- Gera cenários `CT-[MÓDULO]-[N]` com pré-condições, passos e resultado esperado
- Classifica por criticidade (🔴 Alta / 🟡 Média / 🟢 Baixa)
- Gera cenários Gherkin para testes de alta criticidade
- Salva em `tests/scenarios/[CARD-ID]-cenarios.md`
- Publica os cenários como comentário no card do Jira

```bash
/qa-jira DEV4-4203
```

---

### `/qa-executor [CARD-ID] [ENV?] [PR-NUMBER?]`

Executa os cenários de teste de forma autônoma via Playwright e publica o relatório no Jira.

**Argumentos:**
- `CARD-ID` — obrigatório (ex: `DEV4-4203`)
- `ENV` — opcional: `staging` | `canary` | `production` (padrão: `staging`)
- `PR-NUMBER` — opcional: número do PR no GitHub para análise de impacto

**Exemplos:**
```bash
/qa-executor DEV4-4203
/qa-executor DEV4-4203 canary
/qa-executor DEV4-4203 canary 421
/qa-executor DEV4-4203 421
```

**O que faz:**
1. Carrega configurações do `.env` e `qa-environment.template.json`
2. Lê a base de conhecimento (local ou direto do GitHub)
3. Se PR informado, analisa arquivos alterados e prioriza cenários por impacto
4. Verifica acessibilidade do ambiente e valida credenciais
5. Executa cada cenário com screenshots por passo
6. Aguarda confirmação antes de publicar
7. Salva relatório em `tests/reports/[CARD-ID]-relatorio.md`
8. Publica resultado como comentário no Jira

**Evidências geradas em** `tests/evidence/[CARD-ID]/`:
- `preflight_ambiente.png` / `preflight_login.png`
- `[CT-ID]_passo[N]_ok.png` ou `_falhou.png`

---

## Testes Cypress

Testes estáveis para o fluxo de envio de mensagens no ambiente canary.

```bash
# Abre o runner interativo
npm run cy:open

# Roda todos os testes headless
npm run cy:run

# Roda apenas os testes de envio de mensagem
npm run cy:run:chat
```

> Requer `CANARY_OPERATOR_EMAIL` e `CANARY_OPERATOR_PASSWORD` configurados no `.env`.

---

## Estrutura do projeto

```
argos/
├── .claude/
│   └── commands/
│       ├── qa-jira.md          # Agente de geração de cenários
│       └── qa-executor.md      # Agente de execução de testes
├── cypress/
│   ├── e2e/chat/
│   │   └── envio-mensagem.cy.js
│   └── support/
│       ├── commands.js         # cy.login(), cy.typeMessage(), cy.sendMessage()
│       └── e2e.js
├── tests/
│   ├── config/
│   │   └── qa-environment.template.json  # URLs e config (versionado)
│   ├── scenarios/              # Cenários gerados pelo /qa-jira
│   ├── evidence/               # Screenshots por execução
│   └── reports/                # Relatórios em markdown
├── .env.example                # Template de credenciais
├── .mcp.json                   # Config do Playwright MCP
└── cypress.config.js
```

---

## Ambientes suportados

| Ambiente | Variável de configuração |
|---|---|
| Staging | `environments.staging.url` em `qa-environment.local.json` |
| Canary | `environments.canary.url` em `qa-environment.local.json` |
| Production | `environments.production.url` em `qa-environment.local.json` |

Configure as URLs no arquivo `tests/config/qa-environment.local.json` (criado a partir do template).

---

## Base de conhecimento

O `/qa-executor` usa uma base de conhecimento configurada via `knowledgeBase.github` em `qa-environment.local.json` para entender o domínio e as regras de negócio durante a execução dos testes.

- Se `KB_PATH` estiver configurado no `.env`, lê os arquivos localmente
- Caso contrário, busca direto do GitHub usando o `GH_TOKEN`

---

## Contato de teste

Para testes que envolvem envio de mensagens outbound, configure um contato dedicado em `tests/config/qa-environment.local.json` no campo `testContacts.default`.

> Configure `TEST_CONTACT_CHAT_UUID` no `.env` para os testes Cypress.

**Nunca** usar contatos reais da lista de atendimento — risco de enviar mensagens para clientes reais.
