# Cenários de Teste — DEV4-4226
> Card: Edição/Vínculo de template corrompe coluna "Texto do template" para string e remove componentes de botões
> Gerado em: 2026-05-25
> Card atualizado em: 2026-05-25T09:40:34.041-0300

---

## Resumo do Card

- **Tipo:** Bug
- **Prioridade:** Medium
- **Status:** Aguardando Cenários de Teste
- **Objetivo:** Quando um operador edita um template com botões para vinculá-lo a um departamento ou usuário, o backend corrompe o campo `Texto do template` — serializa o objeto JSON como string pura, destruindo o array de botões. Operadores perdem a visualização dos botões nas interfaces, embora o cliente final continue recebendo-os pelo WhatsApp via Meta API.

---

## BLOCO 1 — Estratégia de Teste

O bug afeta a camada de persistência do módulo de Templates: a operação de vínculo (departamento/usuário) serializa incorretamente o campo `Texto do template` como string pura, destruindo o JSON estruturado com `buttons`. Testes funcionais são prioritários, com foco em integridade de dados no banco após o save. Ambas as interfaces (Legada e Nova) seguem a mesma lógica de renderização, então a validação visual cobre as duas simultaneamente. Prioridade de execução: Cenário 1 replicável (template `550360`, customer `47638`) → vínculos com botões em geral → regressão sem botões → segurança. Risco principal: o fix corrige a serialização para novas operações, mas templates já corrompidos em produção continuarão com dado inválido enquanto não houver script de correção.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Fix corrige Cenário 1 mas não previne `buttons: []` do Cenário 2 | M | A | Alta |
| Regressão: templates sem botões têm o campo `Texto do template` corrompido após vínculo | B | A | Alta |
| Templates já corrompidos (string) causam comportamento indefinido em novas operações de vínculo | A | M | Alta |
| Fix serializa corretamente no save mas cache de interface não reflete o dado atualizado | B | M | Média |
| Múltiplas operações de vínculo sequenciais re-introduzem o bug | B | M | Média |
| Injeção de payload malicioso via campo de vínculo altera estrutura do `Texto do template` | B | A | Alta |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade |
|---|---|---|---|---|---|
| CT-TEMPLATE-001 | Vincular template com botões a departamento preserva JSON | Template ativo com botões cadastrados; departamento válido existente; acesso ao banco para validação pós-operação | 1. Acessar Configurações → Templates<br>2. Localizar template com botões<br>3. Clicar em Editar/Vincular<br>4. Selecionar um departamento válido<br>5. Salvar<br>6. Consultar coluna `Texto do template` no banco para o template editado | Campo `Texto do template` permanece como objeto JSON válido contendo a chave `buttons` populada com ao menos um item; botões visíveis na interface ao abrir o template | 🔴 Alta |
| CT-TEMPLATE-002 | Vincular template com botões a usuário preserva JSON | Template ativo com botões cadastrados; usuário válido existente na plataforma | 1. Acessar Configurações → Templates<br>2. Localizar template com botões<br>3. Clicar em Editar/Vincular<br>4. Selecionar vínculo por usuário<br>5. Salvar<br>6. Consultar `Texto do template` no banco | Campo `Texto do template` permanece como JSON com `buttons` populado; operador visualiza botões normalmente nas interfaces Legada e Nova | 🔴 Alta |
| CT-TEMPLATE-003 | Reprodução do bug original sem corrupção pós-fix | Acesso ao customer `47638`; template `550360` com JSON válido e `buttons` populado antes do teste; acesso ao banco | 1. Confirmar estado do banco: `Texto do template` do template `550360` é JSON com `buttons`<br>2. Acessar o template via interface<br>3. Realizar operação de vínculo (departamento ou usuário)<br>4. Salvar<br>5. Consultar `Texto do template` no banco imediatamente após | Campo `Texto do template` do template `550360` permanece como JSON com `buttons` populado — não vira string pura; critério de aceite explícito do card | 🔴 Alta |
| CT-TEMPLATE-004 | Vínculo não gera `buttons: []` em template com botões | Template com botões cadastrados e JSON válido no banco | 1. Confirmar `buttons` populado no banco antes da edição<br>2. Realizar operação de vínculo a departamento<br>3. Salvar<br>4. Consultar banco | Campo `buttons` não é substituído por array vazio `[]`; deve conter os mesmos botões de antes da edição | 🔴 Alta |
| CT-TEMPLATE-005 | Vínculo com entidade inválida não corrompe template | Template com botões; ID de departamento inexistente | 1. Tentar vincular template a um departamento com ID inválido/inexistente<br>2. Submeter o formulário | Operação retorna erro (ex: `400 Bad Request` ou mensagem de validação); campo `Texto do template` no banco permanece intacto, sem alteração | 🟡 Média |
| CT-TEMPLATE-006 | Template corrompido não piora em nova operação | Template cujo `Texto do template` já está como string pura no banco (dado corrompido pré-fix) | 1. Localizar template com dado já corrompido<br>2. Realizar nova operação de vínculo<br>3. Salvar<br>4. Consultar banco | Campo não piora; permanece no mesmo estado que estava antes da operação | 🟡 Média |
| CT-TEMPLATE-007 | Múltiplos vínculos sequenciais preservam JSON | Template com botões; dois ou mais departamentos válidos | 1. Vincular template ao Departamento A → salvar<br>2. Consultar banco (verificar JSON intacto)<br>3. Vincular o mesmo template ao Departamento B → salvar<br>4. Consultar banco novamente | Após cada operação, `Texto do template` permanece como JSON com `buttons` populado | 🟡 Média |
| CT-TEMPLATE-008 | Regressão: vínculo em template sem botões não afeta campo | Template ativo sem botões (apenas texto); departamento válido | 1. Acessar template sem botões<br>2. Realizar vínculo a departamento<br>3. Salvar<br>4. Consultar `Texto do template` no banco | Campo `Texto do template` permanece exatamente como estava antes; sem alteração estrutural | 🟢 Baixa |
| CT-TEMPLATE-009 | Injeção de payload no vínculo para alterar `Texto do template` | Acesso à requisição HTTP de vínculo (via proxy/DevTools); template com botões | 1. Interceptar a requisição POST/PUT de vínculo do template<br>2. Adicionar ao payload o campo `texto_template` (ou equivalente) com valor de string pura<br>3. Enviar a requisição modificada<br>4. Consultar banco | Backend ignora ou rejeita campos não permitidos; `Texto do template` permanece intacto; resposta não expõe dados de outros registros | 🔴 Alta |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Cenário: Vincular template com botões a departamento preserva estrutura JSON
  Dado que existe um template ativo com botões cujo campo "Texto do template" é um JSON válido com "buttons" populado
  E existe um departamento válido cadastrado na plataforma
  Quando o operador realiza a operação de vínculo do template ao departamento e salva
  Então o campo "Texto do template" no banco permanece como objeto JSON contendo a chave "buttons" com ao menos um item
  E os botões são exibidos corretamente nas interfaces Legada e Nova ao abrir o template
```

```gherkin
Cenário: Template 550360 do customer 47638 não tem JSON corrompido após vínculo
  Dado que o campo "Texto do template" do template "550360" do customer "47638" está armazenado como JSON válido com "buttons" populado
  Quando um usuário realiza a operação de vínculo desse template a um departamento ou usuário e salva
  Então o campo "Texto do template" do template "550360" permanece como JSON estruturado com "buttons" populado
  E o campo não é convertido para string pura no banco de dados
```

---

## Validação LLM

```
✅ Validação LLM: 9 cenários aprovados | 0 revisados | 0 removidos
```
