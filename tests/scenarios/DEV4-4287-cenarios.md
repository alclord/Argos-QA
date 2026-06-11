# Cenários de Teste — DEV4-4287
> Card: Falha na troca de multiempresa na Nova Interface
> Gerado em: 2026-06-01
> Card atualizado em: 2026-06-01T10:19:24-03:00

⚠️ **Aviso:** KB inacessível durante a geração — permissão de leitura negada para KB_PATH local e repositório GitHub privado sem acesso autenticado via WebFetch. Cenários gerados com base exclusivamente no card Jira. Pode haver lacunas de terminologia interna.

---

## Resumo do Card

- **Título:** Falha na troca de multiempresa na Nova Interface
- **Tipo:** Bug
- **Prioridade:** Medium
- **Status:** Aguardando Cenários de Teste
- **Atualizado em:** 2026-06-01T10:19:24-03:00
- **Objetivo:** Usuários vinculados a múltiplas empresas não conseguem realizar a troca de conta (multiempresa) na Nova Interface. O sistema retorna `Account not found for this user or user not have multi-account` e bloqueia a transição, mesmo com os vínculos corretos no banco. A Interface Legada realiza a mesma operação com sucesso para os mesmos usuários.

### Critérios de Aceite
1. Usuário com multiempresa consegue trocar de conta na Nova Interface sem erro
2. Validar com o cenário Martins Cavalcante (ID 1851 → ID 50048)
3. Erro `Account not found for this user or user not have multi-account` não ocorre após a correção
4. Comportamento idêntico ao da Interface Legada
5. Usuários com apenas uma empresa não são afetados (regressão)

### Regras de Negócio
1. Usuário com vínculo correto no banco deve conseguir trocar de empresa (multiempresa)
2. A Nova Interface deve ter comportamento idêntico à Interface Legada para troca de multiempresa
3. Usuários com apenas uma empresa não devem ser impactados

---

## BLOCO 1 — Estratégia de Teste

O foco é validar a correção do fluxo de troca de multiempresa na **Nova Interface**, que retornava erroneamente `Account not found for this user or user not have multi-account` mesmo com vínculos válidos no banco. Os tipos de teste aplicáveis são: **funcional** (happy path e fluxo de erro), **regressão** (usuários com empresa única não devem ser impactados) e **paridade de interfaces** (Nova Interface vs Legada). Prioridade de execução: primeiro os cenários críticos de happy path e regressão, depois os de borda. Principal risco: a correção pode introduzir regressão em usuários com empresa única ou alterar o comportamento do fluxo de autenticação compartilhado entre as interfaces.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Correção quebra o login de usuários com empresa única | M | A | 🔴 Alta |
| Erro persiste para outros usuários multiempresa não testados | M | A | 🔴 Alta |
| Nova Interface troca para empresa errada (destino incorreto) | B | A | 🟡 Média |
| Sessão corrompida após troca (dados da empresa anterior persistem) | M | M | 🟡 Média |
| Interface Legada deixa de funcionar após a correção (regressão) | B | A | 🟡 Média |
| Usuário sem permissão de multiempresa consegue trocar via manipulação de payload | M | A | 🔴 Alta |
| Troca repetida em loop causa instabilidade de sessão | B | M | 🟢 Baixa |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-MULTIEMPRESA-001 | Troca de empresa com sucesso na Nova Interface | Usuário com vínculo ativo em 2+ empresas (ex: Martins Cavalcante ID 1851 → ID 50048); sessão ativa na Nova Interface | 1. Acessar Nova Interface (https://spa.qa.poli.digital/chat) 2. Localizar o seletor de empresa/multiempresa (menu de perfil ou header) 3. Selecionar a empresa de destino "Martins Cavalcante Monitoramento" 4. Confirmar a troca | A empresa de destino é carregada com sucesso; a sessão reflete os dados da nova empresa; nenhum erro é exibido | 🔴 Alta | UI | — |
| CT-MULTIEMPRESA-002 | Troca de empresa — paridade Nova Interface x Legada | Mesmo usuário multiempresa com vínculo ativo; acesso a ambas as interfaces | 1. Na Interface Legada (https://homolog.qa.poli.digital), trocar para a empresa de destino e observar o comportamento 2. Na Nova Interface (https://spa.qa.poli.digital/chat), repetir o mesmo fluxo com o mesmo usuário 3. Comparar o resultado | Ambas as interfaces completam a troca com sucesso; o comportamento pós-troca (redirecionamento, dados carregados) é equivalente | 🔴 Alta | UI | CT-MULTIEMPRESA-001 |
| CT-MULTIEMPRESA-003 | Erro "Account not found" não ocorre mais | Usuário multiempresa (ID 1851 → ID 50048) na Nova Interface | 1. Acessar Nova Interface 2. Tentar trocar de empresa 3. Verificar se a mensagem `Account not found for this user or user not have multi-account` aparece | A mensagem de erro **não** deve aparecer; a troca deve ser concluída com sucesso | 🔴 Alta | UI | CT-MULTIEMPRESA-001 |
| CT-MULTIEMPRESA-004 | Usuário com empresa única não é afetado | Usuário com vínculo em apenas uma empresa; sessão ativa na Nova Interface | 1. Acessar Nova Interface com usuário de empresa única 2. Verificar se o seletor de multiempresa está disponível ou oculto 3. Caso disponível, verificar se o comportamento é adequado (sem opções de troca ou mensagem informativa) | Usuário com empresa única não vê opção de troca de empresa, ou se visualizar, ao tentar trocar recebe mensagem adequada sem quebrar a sessão atual | 🔴 Alta | UI | — |
| CT-MULTIEMPRESA-005 | Dados da sessão refletem empresa de destino | Usuário multiempresa com troca bem-sucedida (CT-001) | 1. Após a troca de empresa, verificar o nome/logo da empresa exibido na interface 2. Verificar se as filas, chats e configurações exibidas pertencem à empresa de destino 3. Verificar se dados da empresa de origem não aparecem misturados | Interface exibe exclusivamente dados da empresa de destino; nome da empresa no header/perfil é atualizado; dados da empresa de origem não aparecem | 🟡 Média | UI | CT-MULTIEMPRESA-001 |
| CT-MULTIEMPRESA-006 | Troca reversa (destino → origem) funciona | Usuário multiempresa que completou CT-001 (agora na empresa de destino) | 1. A partir da empresa de destino (ID 50048), localizar o seletor de empresa 2. Selecionar a empresa de origem (ID 1851) e confirmar | Retorno à empresa de origem é bem-sucedido; sessão reflete dados da empresa de origem; nenhum erro | 🟡 Média | UI | CT-MULTIEMPRESA-001 |
| CT-MULTIEMPRESA-007 | Usuário sem vínculo não consegue trocar | Usuário com apenas uma empresa; Nova Interface | 1. Acessar Nova Interface 2. Tentar acessar diretamente a rota/endpoint de troca de empresa (via URL ou API) com um accountId de empresa à qual o usuário não pertence 3. Observar a resposta | Sistema retorna erro de validação apropriado (ex: `Account not found for this user or user not have multi-account` ou equivalente com HTTP 403/404); a sessão atual não é comprometida | 🟡 Média | API | — |
| CT-MULTIEMPRESA-008 | Troca com token inválido/expirado bloqueada | Token de sessão expirado ou inválido | 1. Com sessão expirada ou token manipulado, tentar realizar a troca de empresa via API (endpoint de multiempresa) 2. Observar a resposta | Sistema retorna HTTP 401 Unauthorized; usuário é redirecionado para login; sessão não é alterada | 🔴 Alta | API | — |
| CT-MULTIEMPRESA-009 | Troca para empresa inexistente retorna erro | Usuário multiempresa autenticado na Nova Interface | 1. Via chamada direta à API de troca de empresa, enviar um `accountId` que não existe no sistema (ex: ID 99999) 2. Observar a resposta | API retorna erro adequado (HTTP 404 ou 422); mensagem de erro informativa; sessão atual permanece inalterada | 🟡 Média | API | — |
| CT-MULTIEMPRESA-010 | Payload malformado na requisição de troca | Usuário autenticado na Nova Interface | 1. Via chamada direta à API de troca de empresa, enviar uma requisição sem os dados obrigatórios (body vazio ou com campos ausentes) 2. Observar a resposta da API | API retorna HTTP 400 Bad Request com mensagem descritiva; sessão não é comprometida | 🟢 Baixa | API | — |
| CT-MULTIEMPRESA-011 | IDOR — troca para empresa de outro tenant bloqueada | Usuário autenticado na Nova Interface | 1. Via chamada direta à API de troca de empresa, enviar o `accountId` de uma empresa à qual o usuário autenticado **não** pertence (empresa de outro cliente) 2. Observar a resposta | API retorna HTTP 403 Forbidden; o usuário **não** consegue acessar dados de empresa alheia; nenhuma informação sensível é exposta | 🔴 Alta | API | — |
| CT-MULTIEMPRESA-012 | Interface Legada não regride após a correção | Usuário multiempresa; acesso à Interface Legada | 1. Acessar Interface Legada (https://homolog.qa.poli.digital) 2. Realizar troca de empresa normalmente 3. Verificar que o fluxo continua funcionando como antes | Troca de empresa na Interface Legada continua funcionando sem regressão; nenhum erro novo é introduzido | 🟡 Média | UI | — |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Funcionalidade: Troca de empresa multiempresa na Nova Interface

  Cenário: Usuário multiempresa troca de conta com sucesso na Nova Interface
    Dado que o usuário está autenticado na Nova Interface como operador da empresa "Martins Cavalcante" (ID 1851)
    E o usuário possui vínculo ativo com a empresa "Martins Cavalcante Monitoramento" (ID 50048)
    Quando o usuário acessa o seletor de empresa e seleciona "Martins Cavalcante Monitoramento"
    E confirma a troca de empresa
    Então a sessão é atualizada para a empresa "Martins Cavalcante Monitoramento"
    E a interface exibe os dados e filas da empresa de destino
    E nenhuma mensagem de erro é exibida

  Cenário: Erro "Account not found" não ocorre mais após a correção
    Dado que o usuário está autenticado na Nova Interface como operador da empresa "Martins Cavalcante" (ID 1851)
    E o usuário possui vínculo ativo com a empresa "Martins Cavalcante Monitoramento" (ID 50048)
    Quando o usuário tenta realizar a troca de empresa para "Martins Cavalcante Monitoramento"
    Então a mensagem "Account not found for this user or user not have multi-account" não é exibida
    E a troca é concluída sem erros de validação
```

---

## Validação por Agente Crítico

```
✅ Validação por agente crítico concluída:
   Aprovados sem alteração: 11
   Revisados: 1 (CT-MULTIEMPRESA-010 — linguagem técnica simplificada)
   Adicionados por cobertura insuficiente: 0
```

---

**Resumo:** 12 cenários — 🔴 6 Alta | 🟡 4 Média | 🟢 2 Baixa
