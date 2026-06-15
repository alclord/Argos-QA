# Cenários de Teste — DEV4-4347
> Card: Edição de Contatos - Layout Atualizado e Observações
> Gerado em: 2026-06-12
> Card atualizado em: 2026-06-12T10:13:26 -0300

---

## BLOCO 1 — Estratégia de Teste

Esta entrega cobre dois eixos: (1) reestruturação do layout dos campos de edição de contato — labels fixos/flutuantes e mensagens de erro integradas abaixo dos inputs — aplicada tanto ao componente de edição quanto ao de adição de novo contato; (2) novo campo "Observações" (textarea, 300 chars, texto livre) que também deve ser exibível e editável inline no card "Dados" da Tela de Chat. A regra mais crítica é o **timeout de 3 segundos** do modal de confirmação de salvamento (RN3) — qualquer desvio interrompe o fluxo do atendente. Riscos principais: campo Observações aceitar mais de 300 chars, modal não fechar no tempo exato, observações não aparecerem no card de dados do chat e ausência de sanitização de input (XSS). Tipos de teste: UI funcional, borda de caracteres, regressão (campos existentes após refatoração de layout) e segurança.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade | Impacto | Prioridade |
|---|---|---|---|
| Modal de sucesso não fechar automaticamente após 3 segundos (RN3) | M | A | Alta |
| Campo Observações aceitar mais de 300 caracteres | M | A | Alta |
| Observações não exibidas no card "Dados" da Tela de Chat abaixo do CPF | M | M | Média |
| Campos existentes (Nome, Telefone, E-mail, etc.) com regressão de validação após refatoração de layout | M | A | Alta |
| Mensagens de erro de validação não exibidas inline abaixo do input (RN1) | M | M | Média |
| Observação com conteúdo HTML/script executado (XSS) | B | A | Alta |
| Componente de adição de novo contato não receber o campo Observações | B | A | Alta |
| Empty state de Observações não exibido no card do chat quando campo vazio | B | M | Média |
| Quebra de linha em Observações não preservada ao exibir no card do chat | B | M | Média |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-CONT-001 | Editar contato com observação — modal fecha em 3s | Contato existente; usuário logado como Atendente/Gestor | 1. Abrir tela de edição de contato 2. Preencher campo "Observações" com texto livre (≤ 300 chars) 3. Clicar em "Salvar" | API persiste dados; modal centralizado "Contato atualizado com sucesso" exibido; modal fecha automaticamente após exatamente 3 segundos sem interação do usuário; tela retorna ao estado inicial (RN2 + RN3) | 🔴 Alta | UI | — |
| CT-CONT-002 | Adicionar novo contato com observação preenchida | Nenhum contato pré-existente necessário | 1. Abrir componente de adição de novo contato 2. Preencher campos obrigatórios + campo "Observações" 3. Salvar | Contato criado com sucesso; campo Observações persistido; modal de confirmação exibido e fecha em 3s — componente de adição recebe a mesma alteração do de edição | 🟡 Média | UI | — |
| CT-CONT-003 | Observação exibida no card Dados do chat abaixo do CPF | Contato com campo Observações preenchido; chat aberto com esse contato | 1. Abrir tela de chat de atendimento 2. Localizar card "Dados" no painel lateral 3. Verificar posição do campo Observações | Campo "Observações" exibido abaixo do campo CPF no card Dados; conteúdo corresponde ao valor salvo no cadastro do contato | 🟡 Média | UI | CT-CONT-001 |
| CT-CONT-004 | Empty state de Observações no card do chat | Contato sem campo Observações preenchido; chat aberto | 1. Abrir tela de chat com contato sem observação 2. Verificar card "Dados" | Estado vazio exibido na área de Observações conforme protótipo (indicação visual de "sem observação"); sem erro ou ausência completa do campo | 🟢 Baixa | UI | — |
| CT-CONT-005 | Observação excede 300 chars — entrada bloqueada | Tela de edição aberta | 1. Clicar no campo "Observações" 2. Digitar ou colar texto com mais de 300 caracteres | Campo não aceita entrada além de 300 caracteres; digitação bloqueada ao atingir o limite; contador de caracteres (se presente) reflete o limite; texto colado é truncado ou bloqueado em 300 chars (RN2) | 🔴 Alta | UI | — |
| CT-CONT-006 | Falha da API ao salvar — modal de sucesso não exibe | Ambiente com endpoint de salvamento retornando erro (5xx/timeout) | 1. Abrir edição de contato 2. Preencher campos válidos 3. Clicar em "Salvar" com API retornando erro | Modal "Contato atualizado com sucesso" NÃO exibido; mensagem de erro ou feedback de falha exibido ao usuário; dados do formulário preservados (sem reset) | 🔴 Alta | UI | — |
| CT-CONT-007 | Campo obrigatório inválido — erro inline abaixo do input | Tela de edição aberta | 1. Limpar campo "Nome" (obrigatório) 2. Tentar salvar ou sair do campo (blur) | Mensagem de erro exibida inline diretamente abaixo do input correspondente; sem alert ou toast separado; layout de erro integrado conforme RN1 | 🟡 Média | UI | — |
| CT-CONT-008 | Salvar contato sem preencher Observações (opcional) | Tela de edição aberta; demais campos válidos | 1. Deixar campo "Observações" vazio 2. Clicar em "Salvar" | Salvamento realizado com sucesso; modal de confirmação exibido e fecha em 3s; campo Observações não é tratado como obrigatório | 🟡 Média | UI | — |
| CT-CONT-009 | Observação com exatamente 300 chars salva com sucesso | Tela de edição aberta | 1. Digitar texto com exatamente 300 caracteres no campo Observações 2. Clicar em "Salvar" | Salvamento bem-sucedido; todos os 300 caracteres persistidos; modal de confirmação exibido | 🟡 Média | UI | — |
| CT-CONT-010 | Modal fecha automaticamente após exatamente 3 segundos | Salvamento bem-sucedido em andamento (CT-CONT-001) | 1. Após clicar "Salvar" com sucesso 2. Cronometrar tempo até o modal fechar automaticamente sem qualquer interação | Modal fecha após 3 segundos (±0,5s de tolerância); nenhuma ação do usuário necessária; tela retorna ao estado esperado pós-salvamento (RN3) | 🔴 Alta | UI | CT-CONT-001 |
| CT-CONT-011 | Observação com quebra de linha preservada no chat | Contato com Observações contendo quebras de linha (\n) salvas | 1. Salvar observação com múltiplos parágrafos 2. Abrir card Dados no chat | Quebras de linha preservadas na exibição do card Dados; texto renderizado com formatação correta, não colapsado em uma única linha | 🟢 Baixa | UI | CT-CONT-003 |
| CT-CONT-012 | Edição inline de Observações no card Dados do chat | Contato com Observações exibida no card Dados do chat | 1. Passar o mouse sobre o campo Observações no card Dados 2. Verificar estado de hover 3. Clicar para editar | Estado de hover exibido conforme protótipo; campo torna-se editável ao clicar (estado "Editando"); alteração pode ser confirmada ou cancelada sem precisar abrir a tela de edição completa | 🟡 Média | UI | CT-CONT-003 |
| CT-CONT-013 | XSS no campo Observações — conteúdo sanitizado | Tela de edição aberta | 1. Inserir no campo Observações: `<script>alert('xss')</script>` 2. Salvar 3. Verificar exibição no card Dados do chat e na tela de edição | Conteúdo exibido como texto literal, sem execução de script; nenhum alert disparado; dado armazenado e exibido de forma segura (escapado/sanitizado) | 🔴 Alta | UI | — |

---

## BLOCO 4 — Cenários Gherkin (BDD)

### CT-CONT-001 — Editar contato com observação e modal fecha em 3 segundos

```gherkin
Cenário: Salvar contato com observação exibe modal que fecha automaticamente
  Dado que o usuário está logado como Atendente
  E a tela de edição de contato está aberta
  Quando o usuário preenche o campo "Observações" com texto livre de até 300 caracteres
  E clica em "Salvar"
  Então o modal centralizado "Contato atualizado com sucesso" é exibido
  E o modal fecha automaticamente após 3 segundos sem nenhuma interação
  E o campo Observações é persistido com o conteúdo informado
```

### CT-CONT-005 — Campo Observações bloqueia entrada acima de 300 caracteres

```gherkin
Cenário: Campo Observações não aceita texto além do limite de 300 caracteres
  Dado que a tela de edição de contato está aberta
  E o campo "Observações" está vazio
  Quando o usuário digita ou cola um texto com mais de 300 caracteres no campo
  Então o campo não aceita caracteres além do 300º
  E o texto é truncado ou a digitação é bloqueada ao atingir o limite
  E nenhum dado além de 300 caracteres é enviado para a API ao salvar
```

---

**Resumo:** 13 cenários — 🔴 5 Alta | 🟡 6 Média | 🟢 2 Baixa
