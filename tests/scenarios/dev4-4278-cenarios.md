# Cenários de Teste — DEV4-4278
> Card: Campo de telefone limitado a 13 dígitos impede cadastro de contatos internacionais na Nova Interface
> Gerado em: 2026-05-29
> Card atualizado em: 2026-05-29T10:25:27-03:00

> ⚠️ KB inacessível — KB_PATH ausente e GH CLI não disponível neste ambiente. Cenários gerados com base exclusiva no card; pré-condições podem precisar de ajuste fino com o ambiente de staging.

---

## Estratégia de Teste

Bug de prioridade Média no módulo de Contatos da Nova Interface. O escopo cobre três contextos de edição do campo de telefone: cadastro de novo contato, edição de contato existente e painel de detalhes do chat. Tipos de teste aplicáveis: funcional (limite de dígitos aceitos), regressão (números nacionais ≤13 dígitos não devem ser afetados), borda (exatos 15 e tentativa de 16+) e segurança (injeção via campo de input que sofreu alteração de validação). Execução sugerida: priorizar os três contextos com números de 14 dígitos (CA2/CA3), depois regressão nacional, depois borda e segurança. Risco principal: a correção pode ter sido aplicada em apenas um dos três componentes de UI, deixando os demais ainda limitados a 13 dígitos.

---

## Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Correção aplicada em apenas um dos três contextos (cadastro, edição, painel de chat) | A | A | Alta |
| Regressão em números nacionais ≤13 dígitos após ajuste do maxLength | M | A | Alta |
| Campo sem teto superior — aceita 16+ dígitos sem restrição após a correção | A | M | Alta |
| Número salvo com formatação diferente do digitado (normalização inesperada) | M | M | Média |
| Caracteres não numéricos passam pela validação de frontend após alteração de maxLength | B | M | Baixa |

---

## Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-CONT-001 | Cadastrar contato com 14 dígitos | Usuário autenticado na Nova Interface com permissão para criar contatos | 1. Navegar até a tela de cadastro de novo contato na Nova Interface. 2. Preencher os campos obrigatórios (nome). 3. No campo de telefone, digitar 14 dígitos (ex: `55119999999999`). 4. Verificar que todos os 14 caracteres foram inseridos. 5. Salvar o contato. | Contato salvo com sucesso. Número de 14 dígitos exibido integralmente no perfil, sem truncamento. | 🔴 Alta | UI | — |
| CT-CONT-002 | Cadastrar contato com 15 dígitos (máximo E.164) | Usuário autenticado na Nova Interface com permissão para criar contatos | 1. Navegar até a tela de cadastro de novo contato. 2. No campo de telefone, digitar 15 dígitos (ex: `551199999999999`). 3. Verificar que todos os 15 caracteres foram inseridos. 4. Salvar o contato. | Contato salvo com sucesso. Número de 15 dígitos exibido integralmente no perfil. | 🔴 Alta | UI | — |
| CT-CONT-003 | Editar contato existente com 14 dígitos | Contato existente na Nova Interface com número ≤13 dígitos. ⚠️ Bloqueável — se não existir: criar via CT-CONT-001. | 1. Na lista de contatos da Nova Interface, abrir o contato de teste para edição. 2. Limpar o campo de telefone. 3. Digitar 14 dígitos. 4. Confirmar que todos os 14 dígitos foram aceitos. 5. Salvar as alterações. | Contato atualizado com sucesso. Número de 14 dígitos exibido corretamente. Sem mensagem de erro. | 🔴 Alta | UI | — |
| CT-CONT-004 | Editar telefone pelo painel de detalhes do chat | Chat ativo na Nova Interface vinculado a um contato; painel de detalhes visível. ⚠️ Bloqueável — requer chat ativo no ambiente. | 1. Abrir um chat ativo na Nova Interface. 2. Acessar o painel de detalhes do chat (sidebar do contato). 3. Localizar o campo de telefone. 4. Editar o campo com 14 dígitos. 5. Confirmar que todos os 14 dígitos foram aceitos. 6. Salvar. | Telefone atualizado com sucesso no painel de detalhes. Número de 14 dígitos exibido integralmente. | 🔴 Alta | UI | — |
| CT-CONT-005 | 16º dígito bloqueado na digitação | Usuário autenticado na Nova Interface. | 1. Abrir a tela de cadastro de novo contato. 2. No campo de telefone, digitar 15 dígitos. 3. Tentar inserir um 16º dígito manualmente. 4. Observar o comportamento do campo. | O 16º dígito não é inserido. O campo permanece com exatamente 15 dígitos. | 🟡 Média | UI | CT-CONT-002 |
| CT-CONT-006 | Regressão: número nacional de 13 dígitos | Usuário autenticado na Nova Interface. | 1. Abrir a tela de cadastro de novo contato. 2. Digitar 13 dígitos no campo de telefone (ex: `5511999999999`). 3. Confirmar que todos os 13 dígitos foram aceitos. 4. Salvar o contato. | Contato salvo com sucesso. Número de 13 dígitos exibido corretamente. Nenhuma regressão introduzida pela correção. | 🔴 Alta | UI | — |
| CT-CONT-007 | Regressão: número nacional de 11 dígitos | Usuário autenticado na Nova Interface. | 1. Abrir a tela de cadastro de novo contato. 2. Digitar 11 dígitos (ex: `11999999999`). 3. Salvar o contato. | Contato salvo com sucesso. Número de 11 dígitos exibido corretamente. | 🟡 Média | UI | — |
| CT-CONT-008 | Campo vazio — verificar comportamento inalterado | Usuário autenticado na Nova Interface. | 1. Abrir a tela de cadastro de novo contato. 2. Preencher o campo de nome. 3. Deixar o campo de telefone em branco. 4. Tentar salvar. | O comportamento com campo vazio é idêntico ao anterior à correção (a correção não alterou a lógica de validação de campo vazio, apenas o limite de dígitos). | 🟡 Média | UI | — |
| CT-CONT-010 | Paridade com Interface Legada para 14 dígitos | Acesso à Interface Legada. CT-CONT-001 já executado com sucesso na Nova Interface. | 1. Na Interface Legada, cadastrar contato com o mesmo número de 14 dígitos utilizado em CT-CONT-001. 2. Confirmar que o contato é salvo com sucesso na Legada. 3. Comparar: ambas as interfaces aceitaram o número sem diferença de comportamento observável. | Comportamento equivalente nas duas interfaces. O número de 14 dígitos é aceito e salvo na Legada da mesma forma que na Nova Interface já verificada em CT-CONT-001. | 🟡 Média | UI | CT-CONT-001 |
| CT-CONT-011 | Injeção de caracteres especiais no campo de telefone | Usuário autenticado na Nova Interface. | 1. Abrir o cadastro de novo contato. 2. No campo de telefone, colar `<script>alert(1)</script>` e depois `'; DROP TABLE contacts;--`. 3. Tentar salvar. 4. Verificar o valor exibido no perfil após salvar. | Sistema sanitiza ou rejeita a entrada; nenhum script é executado no browser; valor exibido é escapado corretamente; nenhuma alteração inesperada no banco. | 🟡 Média | UI | — |
| CT-CONT-012 | 16+ dígitos bloqueados via colagem (paste) | Usuário autenticado na Nova Interface. | 1. Abrir a tela de cadastro de novo contato. 2. No campo de telefone, colar uma string de 16 dígitos via Ctrl+V (ex: `5511999999999999`). 3. Observar o comportamento do campo após a colagem. | O campo não aceita mais do que 15 dígitos mesmo via paste. O conteúdo exibido é truncado em 15 ou a colagem é bloqueada integralmente. Nenhum dígito além do 15º é persistido. | 🟡 Média | UI | CT-CONT-002 |

---

## Cenários Gherkin (BDD)

### CT-CONT-001 — Cadastrar contato internacional com 14 dígitos

```gherkin
Cenário: Cadastrar contato internacional com número de 14 dígitos na Nova Interface
  Dado que estou autenticado na Nova Interface com permissão para criar contatos
  Quando acesso a tela de cadastro de novo contato
  E preencho o campo de telefone com "55119999999999"
  Então o campo de telefone exibe todos os 14 dígitos sem truncamento
  Quando salvo o contato
  Então o contato é criado com sucesso
  E o número "55119999999999" é exibido integralmente no perfil do contato
```

### CT-CONT-006 — Regressão: número nacional de 13 dígitos ainda aceito

```gherkin
Cenário: Regressão — número nacional de 13 dígitos continua aceito após a correção
  Dado que estou autenticado na Nova Interface com permissão para criar contatos
  Quando acesso a tela de cadastro de novo contato
  E preencho o campo de telefone com "5511999999999"
  Então o campo de telefone exibe todos os 13 dígitos sem truncamento
  Quando salvo o contato
  Então o contato é criado com sucesso
  E o número "5511999999999" é exibido integralmente no perfil do contato
```

---

## Resumo

**Total: 11 cenários de teste | 2 cenários Gherkin**

- 🔴 Alta: 5 cenários (CT-CONT-001, 002, 003, 004, 006)
- 🟡 Média: 6 cenários (CT-CONT-005, 007, 008, 010, 011, 012)
- 🟢 Baixa: 0

**Cobertura:**
- Happy path: CT-CONT-001, 002, 003, 004
- Negativos/erro: CT-CONT-005, 008, 012
- Borda: CT-CONT-005, CT-CONT-006
- Segurança: CT-CONT-011
- Regressão: CT-CONT-006, 007

**Validação por agente crítico independente:** ✅ 6 aprovados | 4 revisados | 1 removido | 1 adicionado
