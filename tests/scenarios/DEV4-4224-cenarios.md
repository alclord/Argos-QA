# Cenários de Teste — DEV4-4224
> Card: Dados Cadastrais (Nova interface)
> Gerado em: 2026-05-28
> Card atualizado em: 2026-05-27T12:56:03.438-0300

---

## BLOCO 1 — Estratégia de Teste

**Escopo:** Migração da aba "Dados da Empresa" do legado para nova interface autônoma em Configurações > Dados cadastrais, cobrindo leitura/edição de dados cadastrais via foundation-spa + foundation-api.

**Tipos de teste aplicáveis:** UI (formulário, feedbacks visuais, acessibilidade WCAG AA), API (endpoints GET/PATCH de dados da conta), integração com API externa ViaCEP (auto-preenchimento de endereço), controle de acesso por role.

**Prioridade de execução:** (1) Campos obrigatórios + fluxo de salvar → (2) Toggle Documento Internacional → (3) Auto-preenchimento CEP → (4) Acesso por role → (5) Acessibilidade e Design System.

**Riscos principais:**
- Regressão no toggle de máscara (ativar/desativar Documento Internacional sem limpar campo corretamente)
- Falha silenciosa no auto-fill de CEP por timeout ou indisponibilidade da API ViaCEP
- Acesso não autorizado por roles abaixo de Gestor (controle de acesso ausente ou mal configurado)
- Estado de loading não exibido no botão Salvar em conexões lentas

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Toggle Documento Internacional não limpa campo ao ativar | A | A | 🔴 Alta |
| CEP inválido não exibe mensagem inline (erro silencioso) | M | A | 🔴 Alta |
| Campos não carregam pré-preenchidos (GET falha silenciosamente) | B | A | 🔴 Alta |
| Role não-Gestor consegue acessar seção (falha de controle de acesso) | B | A | 🔴 Alta |
| Erro de servidor não exibe toast de erro (feedback ausente) | B | A | 🔴 Alta |
| XSS via campos de texto livre (segurança) | B | A | 🔴 Alta |
| CEP válido não dispara auto-preenchimento (timeout ViaCEP) | M | M | 🟡 Média |
| Botão Salvar não exibe estado de loading (feedback visual ausente) | M | M | 🟡 Média |

---

## BLOCO 3 — Tabela de Cenários

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|----|----------------|----------------|---------------|--------------------|-------------|------|------------|
| CT-CADAST-001 | Carregar formulário pré-preenchido | Conta com dados cadastrais existentes (nome, documento, telefone, email, endereço, área, site); usuário autenticado com role Gestor. ⚠️ Bloqueável — criável via API: POST /v3/accounts | 1. Fazer login com usuário Gestor; 2. Navegar até Configurações > Dados cadastrais | Todos os campos (nome, documento, telefone, email, logradouro, número, complemento, bairro, estado, cidade, área de atuação, site) exibem os valores atuais da conta sem interação adicional | 🔴 Alta | UI | — |
| CT-CADAST-002 | Salvar alterações com dados válidos | Formulário carregado (CT-CADAST-001); campo Nome da empresa preenchido | 1. Alterar o campo "Nome da empresa" para um novo valor válido (ex: "Empresa Teste Atualizada"); 2. Clicar no botão "Salvar alterações" | Botão entra em estado de loading durante a requisição; ao concluir, exibe toast "Dados salvos com sucesso!"; campos permanecem preenchidos com os novos valores | 🔴 Alta | UI | CT-CADAST-001 |
| CT-CADAST-003 | Toggle Documento Internacional — ativar | Formulário carregado; campo Documento preenchido com valor no formato CNPJ ou CPF | 1. Marcar o checkbox "Documento Internacional"; 2. Observar o campo Documento | Máscara do campo Documento muda para texto livre (sem formatação CNPJ/CPF) e o valor anterior é limpo (campo fica vazio) | 🔴 Alta | UI | CT-CADAST-001 |
| CT-CADAST-004 | Toggle Documento Internacional — desativar | Toggle "Documento Internacional" ativado (CT-CADAST-003); campo Documento vazio ou com texto livre | 1. Desmarcar o checkbox "Documento Internacional"; 2. Observar o campo Documento | Máscara CNPJ/CPF é restaurada no campo Documento; campo permanece vazio aguardando novo valor formatado | 🟡 Média | UI | CT-CADAST-003 |
| CT-CADAST-005 | Auto-preenchimento com CEP válido | Formulário carregado; campos de endereço vazios ou com valores anteriores | 1. Preencher o campo CEP com 8 dígitos numéricos válidos (ex: 01310100); 2. Sair do campo (blur/Tab) | Campos Logradouro, Bairro, Estado e Cidade são preenchidos automaticamente com os dados retornados pela API ViaCEP; campo Número e Complemento permanecem para preenchimento manual | 🔴 Alta | UI | CT-CADAST-001 |
| CT-CADAST-006 | CEP inválido — mensagem de erro inline | Formulário carregado | 1. Preencher o campo CEP com valor inexistente (ex: 00000000); 2. Sair do campo (blur/Tab) | Mensagem de erro inline "CEP não encontrado. Verifique o número." é exibida abaixo do campo CEP; campos de endereço (Logradouro, Bairro, Estado, Cidade) não são alterados | 🔴 Alta | UI | CT-CADAST-001 |
| CT-CADAST-007 | Salvar com "Nome da empresa" vazio | Formulário carregado | 1. Limpar completamente o campo "Nome da empresa"; 2. Clicar no botão "Salvar alterações" | Campo "Nome da empresa" é destacado com borda/fundo coral + mensagem "Este campo é obrigatório" abaixo; foco é movido automaticamente para o campo inválido; nenhuma requisição é enviada ao servidor (dados não são submetidos) | 🔴 Alta | UI | CT-CADAST-001 |
| CT-CADAST-008 | Erro de servidor ao salvar | Formulário carregado; servidor configurado para retornar HTTP 500 | 1. Alterar qualquer campo válido (ex: telefone); 2. Clicar em "Salvar alterações" | Toast de erro "Não foi possível salvar. Tente novamente." é exibido; dados do formulário permanecem preenchidos com os valores editados (não revertem) | 🔴 Alta | UI | CT-CADAST-001 |
| CT-CADAST-009 | Acesso negado para role não-Gestor | Usuário autenticado com role Atendente (agent) na mesma conta | 1. Fazer login com usuário de role Atendente; 2. Tentar acessar Configurações > Dados cadastrais (via menu ou URL direta) | Seção "Dados cadastrais" não é exibida no menu de Configurações; acesso por URL direta resulta em redirecionamento ou exibição de página de erro de permissão (não exibe o formulário) | 🔴 Alta | UI | — |
| CT-CADAST-010 | CEP com menos de 8 dígitos — não dispara auto-preenchimento | Formulário carregado | 1. Preencher o campo CEP com apenas 7 dígitos numéricos (ex: 0131010); 2. Sair do campo (blur/Tab) | Auto-preenchimento NÃO é disparado; campos de endereço permanecem com os valores anteriores; nenhuma chamada à API ViaCEP é realizada | 🟡 Média | UI | CT-CADAST-001 |
| CT-CADAST-011 | CEP alfanumérico — não dispara auto-preenchimento | Formulário carregado | 1. Tentar preencher o campo CEP com entrada alfanumérica (ex: "0131010A"); 2. Sair do campo (blur/Tab) | Auto-preenchimento NÃO é disparado após o blur; campos de endereço não são alterados. Comportamento mínimo aceitável: o campo não dispara preenchimento com entrada que não satisfaz os 8 dígitos numéricos (o campo pode rejeitar letras via máscara ou aceitar e ignorar para o disparo do auto-fill — ambos são válidos) | 🟡 Média | UI | CT-CADAST-001 |
| CT-CADAST-012 | Injeção XSS em campo Nome da empresa | Formulário carregado | 1. Preencher "Nome da empresa" com `<script>alert('xss')</script>`; 2. Clicar em "Salvar alterações" | O valor é tratado como texto simples (sanitizado pelo frontend/backend ou rejeitado por validação); nenhum script é executado na interface; se salvo, o valor exibido de volta é o texto literal sem interpretação HTML | 🔴 Alta | UI | CT-CADAST-001 |

---

## BLOCO 4 — Gherkin (BDD)

### Cenário de Alta Criticidade #1 — Salvar alterações com dados válidos (CT-CADAST-002)

```gherkin
Funcionalidade: Dados Cadastrais — Salvar alterações

  Cenário: Gestor salva alterações com dados válidos
    Dado que o usuário está autenticado com role Gestor
    E está na página Configurações > Dados cadastrais
    E o formulário está pré-preenchido com os dados atuais da conta
    Quando o usuário altera o campo "Nome da empresa" para "Empresa Teste Atualizada"
    E clica no botão "Salvar alterações"
    Então o botão exibe estado de loading durante a requisição
    E ao concluir é exibido o toast "Dados salvos com sucesso!"
    E os campos do formulário permanecem preenchidos com os novos valores
```

### Cenário de Alta Criticidade #2 — Toggle Documento Internacional (CT-CADAST-003)

```gherkin
Funcionalidade: Dados Cadastrais — Toggle Documento Internacional

  Cenário: Ativar toggle Documento Internacional limpa campo e remove máscara
    Dado que o usuário está autenticado com role Gestor
    E está na página Configurações > Dados cadastrais
    E o campo "Documento" está preenchido com valor no formato CNPJ ou CPF
    E o checkbox "Documento Internacional" está desmarcado
    Quando o usuário marca o checkbox "Documento Internacional"
    Então a máscara de formatação CNPJ/CPF é removida do campo "Documento"
    E o campo "Documento" é limpo (fica vazio)
    E o campo passa a aceitar texto livre sem formatação

  Cenário: Desativar toggle Documento Internacional restaura máscara
    Dado que o usuário está autenticado com role Gestor
    E o checkbox "Documento Internacional" está marcado
    E o campo "Documento" está no modo texto livre
    Quando o usuário desmarca o checkbox "Documento Internacional"
    Então a máscara CNPJ/CPF é restaurada no campo "Documento"
    E o campo permanece vazio aguardando novo valor formatado
```

---

## Validação por Agente Crítico Independente

- Aprovados sem alteração: 11
- Revisados: 1 (CT-CADAST-011)
- Adicionados por cobertura insuficiente: 0

**Detalhes da revisão:**

| CT-ID | Critério | Problema identificado | Correção aplicada |
|---|---|---|---|
| CT-CADAST-011 | Assunção indevida / Resultado ambíguo | Resultado esperado original usava "OU" de forma ambígua — tornava o cenário não determinístico para execução manual | Resultado esperado reescrito para especificar o comportamento mínimo aceitável: auto-preenchimento não disparado após blur com entrada alfanumérica, com nota explicativa dos dois comportamentos válidos |
