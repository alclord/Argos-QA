# Cenários de Teste — DEV4-4228
> Card: Variaveis Agendamento de Template
> Gerado em: 2026-05-25
> Card atualizado em: 2026-05-22T11:45:59.178-0300

---

## Resumo do Card

- **Título:** Variaveis Agendamento de Template
- **Tipo:** Melhoria de Design
- **Prioridade:** Média
- **Status:** Aguardando Cenários de Teste
- **Objetivo:** Implementar a edição de variáveis dinâmicas (`{{1}}`, `{{2}}`) diretamente no modal de agendamento de templates (pós-24h), permitindo que o usuário preencha valores personalizados no mesmo fluxo de programação do disparo automático.

---

## BLOCO 1 — Estratégia de Teste

O escopo abrange a nova funcionalidade de preenchimento de variáveis dinâmicas no modal de agendamento de templates, exclusivamente no fluxo pós-janela de 24h. Tipos de teste: **funcional** (renderização dos campos, persistência), **regressão** (modal 24h e fluxo sem variáveis) e **segurança** (validação de input). Prioridade de execução: regressão do modal 24h > happy path com variáveis > persistência > borda. O principal risco é a regressão silenciosa no fluxo 24h, explicitamente protegido pelo card.

**Informação confirmada pelo produto:** O preenchimento das variáveis **não é obrigatório** — mantém a regra existente, apenas habilitando o preenchimento no fluxo de agendamento.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Valores das variáveis não persistidos no banco ao salvar agendamento | M | A | **Alta** |
| Nome do modal alterado indevidamente no cenário dentro da janela 24h | M | A | **Alta** |
| Motor de disparos não consumir os valores salvos corretamente no envio | B | A | **Alta** |
| Campos de variável não renderizados para template que contém variáveis | B | A | **Alta** |
| Injeção de conteúdo malicioso nos campos de variável (XSS) | B | A | **Alta** |
| Template sem variáveis exibir campos de input extras desnecessariamente | B | M | **Média** |
| Layout do modal quebrar ao renderizar templates com muitas variáveis | B | M | **Média** |
| Fechar modal sem salvar gerar agendamento parcial | B | M | **Média** |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade |
|---|---|---|---|---|---|
| CT-AGEND-001 | Agendar template com variáveis preenchidas | (1) Usuário logado; (2) Contato fora da janela de 24h; (3) Template com variáveis `{{1}}` e `{{2}}` disponível | 1. Acessar conversa com contato fora da janela 24h; 2. Iniciar fluxo de agendamento de template; 3. Avançar para o segundo passo do modal; 4. Verificar que inputs são exibidos para cada variável; 5. Preencher os campos com valores válidos (ex: "João", "Plano Premium"); 6. Definir data e hora do agendamento; 7. Salvar o agendamento | Modal exibe título "agendar template"; inputs renderizados para cada variável do template; agendamento criado com sucesso; valores preenchidos salvos vinculados ao registro de agendamento (RN1, RN2) | 🔴 Alta |
| CT-AGEND-002 | Agendar template com variáveis em branco | (1) Usuário logado; (2) Contato fora da janela de 24h; (3) Template com variáveis disponível | 1. Acessar conversa com contato fora da janela 24h; 2. Iniciar fluxo de agendamento de template; 3. Avançar para o segundo passo sem preencher nenhuma variável; 4. Definir data e hora; 5. Salvar o agendamento | Agendamento criado com sucesso sem bloqueio de validação; variáveis permanecem em branco conforme comportamento existente (preenchimento não obrigatório) | 🟡 Média |
| CT-AGEND-003 | Modal pós-24h exibe nome correto | (1) Usuário logado; (2) Contato fora da janela de 24h | 1. Acessar conversa com contato fora da janela 24h; 2. Abrir o modal de agendamento de template | Título do modal exibido como **"agendar template"** (alteração de nome exclusiva para pós-24h) | 🔴 Alta |
| CT-AGEND-004 | Modal dentro da 24h não tem nome alterado | (1) Usuário logado; (2) Contato dentro da janela de 24h (conversa ativa) | 1. Acessar conversa com contato dentro da janela 24h; 2. Abrir o modal de agendamento de mensagem | Título do modal permanece com o **nome original** (não "agendar template"); fluxo e layout sem nenhuma alteração em relação ao comportamento atual | 🔴 Alta |
| CT-AGEND-005 | Template sem variáveis não exibe campos extras | (1) Usuário logado; (2) Contato fora da janela de 24h; (3) Template sem variáveis disponível | 1. Acessar conversa com contato fora da janela 24h; 2. Selecionar template que não contém variáveis; 3. Avançar para o segundo passo do modal | Nenhum campo de input de variável é renderizado; o fluxo de agendamento segue o comportamento normal sem exibição de campos extras (RN1 — injeção dinâmica somente quando há variáveis) | 🟡 Média |
| CT-AGEND-006 | Fechar modal sem salvar não gera agendamento | (1) Usuário logado; (2) Contato fora da janela de 24h; (3) Template com variáveis | 1. Abrir modal de agendamento pós-24h; 2. Selecionar template com variáveis; 3. Preencher os campos de variável com valores; 4. Fechar/cancelar o modal sem clicar em salvar | Nenhum agendamento criado; nenhum valor parcialmente persistido; estado do sistema inalterado (RN2 — persistência só ocorre ao salvar) | 🟡 Média |
| CT-AGEND-007 | Template com múltiplas variáveis renderiza todos os campos | (1) Usuário logado; (2) Template com 5 ou mais variáveis (ex: `{{1}}` a `{{5}}`) disponível; (3) Contato fora da janela 24h | 1. Selecionar template com 5+ variáveis; 2. Avançar para o segundo passo do modal | Todos os campos de variável são renderizados corretamente; layout do modal permanece utilizável e sem sobreposição de elementos (RN1 — injeção para cada variável encontrada) | 🟢 Baixa |
| CT-AGEND-008 | Variável preenchida com caracteres especiais e emojis | (1) Usuário logado; (2) Template com variável; (3) Contato fora da janela 24h | 1. Abrir modal pós-24h com template contendo variável; 2. Preencher o campo com valor contendo: acentos, emojis (ex: "Olá João! 😊") e símbolos (@, #, &); 3. Salvar agendamento | Agendamento salvo com sucesso; valor armazenado exatamente como digitado, sem corrupção de encoding; caracteres exibidos corretamente (RN2) | 🟡 Média |
| CT-AGEND-009 | Tentativa de injeção de código nos campos de variável | (1) Usuário logado; (2) Template com variável; (3) Contato fora da janela 24h | 1. Abrir modal pós-24h com template contendo variável; 2. Inserir no campo de variável: `<script>alert('xss')</script>`; 3. Salvar agendamento; 4. Verificar o valor salvo e o comportamento da UI | Valor tratado como texto puro; nenhum script executado; sem vulnerabilidade XSS; dado salvo como string literal sem interpretação de HTML/JS | 🔴 Alta |

---

## BLOCO 4 — Cenários Gherkin (BDD)

### CT-AGEND-001 — Agendar template com variáveis preenchidas

```gherkin
Cenário: Agendamento de template com variáveis preenchidas pelo usuário
  Dado que o usuário está logado na plataforma Poli Digital
  E está em uma conversa com um contato fora da janela de 24h
  E existe um template disponível com variáveis "{{1}}" e "{{2}}"
  Quando o usuário abre o modal de agendamento de template
  Então o título do modal deve ser "agendar template"
  E o segundo passo do modal deve exibir um campo de input para cada variável encontrada no template
  Quando o usuário preenche o campo "{{1}}" com "João"
  E preenche o campo "{{2}}" com "Plano Premium"
  E define a data e hora do agendamento
  E clica em salvar
  Então o agendamento deve ser criado com sucesso
  E os valores "João" e "Plano Premium" devem estar persistidos vinculados ao registro daquele agendamento
```

### CT-AGEND-004 — Modal dentro da 24h não tem nome alterado

```gherkin
Cenário: Modal de agendamento dentro da janela 24h não deve ter o nome alterado
  Dado que o usuário está logado na plataforma Poli Digital
  E está em uma conversa com um contato dentro da janela de 24h
  Quando o usuário abre o modal de agendamento de mensagem
  Então o título do modal deve ser o nome original, diferente de "agendar template"
  E o layout e o fluxo do modal devem permanecer sem nenhuma alteração
```

---

## Validação LLM

```
✅ Validação LLM: 9 cenários aprovados | 0 revisados | 0 removidos
```

---

**Resumo:** 9 cenários — 🔴 4 Alta | 🟡 4 Média | 🟢 1 Baixa
