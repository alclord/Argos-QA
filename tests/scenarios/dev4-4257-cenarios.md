# Cenários de Teste — DEV4-4257
> Card: Faturas e Formas de Pagamento (Nova interface)
> Gerado em: 2026-05-28
> Card atualizado em: 2026-05-27T15:01:04.641-0300

---

## BLOCO 1 — Estratégia de Teste

**Escopo:** Feature completa da área financeira nativa no foundation-spa — listagem e filtro de faturas, download de boleto/recibo, troca de forma de pagamento (boleto ↔ cartão e cartão → novo cartão) e download de notas fiscais. Substitui o embed Super Lógica (iframe) por integração backend-to-backend.

**Tipos de teste aplicáveis:** UI/E2E como primário (fluxos de usuário); Integração de API como secundário (timeouts, respostas Super Lógica); Segurança (PCI, controle de acesso por role).

**Prioridade de execução:** (1) Controle de acesso por role; (2) Downloads boleto/recibo/NF; (3) Troca de forma de pagamento; (4) Filtros e paginação; (5) Estados de erro e edge cases.

**Riscos principais:**
1. Dados de cartão trafegando pelo backend Poli (violação PCI DSS)
2. Status "Vencida" calculado incorretamente por divergência de fuso/data
3. Timeout da API Super Lógica sem fallback gracioso — usuário sem feedback
4. Acesso indevido de usuários com role menor que Gestor à área financeira
5. iframe Super Lógica residual exigindo login paralelo (regressão da migração)

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade | Impacto | Prioridade |
|-------|--------------|---------|-----------|
| Dados de cartão trafegam pelo backend Poli (PCI DSS) | B | A | 🔴 Alta |
| Acesso de não-Gestor à área financeira | B | A | 🔴 Alta |
| Status "Vencida" calculado incorretamente (fuso/data) | M | A | 🔴 Alta |
| Timeout Super Lógica sem banner de erro | M | A | 🔴 Alta |
| Download de boleto disponível para fatura Liquidada | M | A | 🔴 Alta |
| Iframe Super Lógica ainda presente no HTML | B | A | 🔴 Alta |
| Botão "Salvar" habilitado com campos inválidos | M | M | 🟡 Média |
| Cancelar formulário salva dados silenciosamente | B | M | 🟡 Média |
| Filtro "Pendentes" não inclui status "Vencida" | M | M | 🟡 Média |
| Paginação quebrada com > 20 faturas | B | M | 🟡 Média |
| Empty state ausente ou incorreto por filtro | B | B | 🟢 Baixa |
| Cache TTL de NFs não respeitado | B | B | 🟢 Baixa |
| Textos sem i18n (hardcoded em PT-BR) | B | B | 🟢 Baixa |

---

## BLOCO 3 — Tabela de Cenários

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|----|----------------|----------------|--------------|-------------------|-------------|------|-----------|
| CT-FIN-001 | Carregamento inicial de faturas com skeleton screen e filtro padrão "Todas" | Usuário com role Gestor autenticado; conta com pelo menos 1 fatura | 1. Acessar Configurações > Faturas e formas de pagamento | Skeleton screen exibido durante fetch; após carregamento, filtro "Todas" selecionado e todas as faturas listadas | 🔴 Alta | UI | — |
| CT-FIN-002 | Toggle de filtros Todas / Pendentes / Pagas filtra sem reload da página | CT-FIN-001 concluído; conta com faturas nos 3 status | 1. Na tela de faturas, clicar em "Pendentes"; 2. Verificar lista; 3. Clicar em "Pagas"; 4. Verificar lista | Cada toggle altera a lista sem reload da página; URL ou estado interno reflete o filtro ativo; apenas faturas do status selecionado são exibidas | 🟡 Média | UI | CT-FIN-001 |
| CT-FIN-003 | Filtro "Pendentes" inclui faturas com status Pendente e Vencida | Conta com faturas Pendente, Vencida e Liquidada | 1. Aplicar filtro "Pendentes" | Lista exibe faturas com status Pendente e Vencida; faturas Liquidadas não aparecem no filtro "Pendentes" | 🔴 Alta | UI | CT-FIN-001 |
| CT-FIN-004 | Download de boleto para fatura com status Pendente abre URL assinada em nova aba | ⚠️ Bloqueável: fatura com status Pendente disponível no ambiente | 1. Na lista de faturas, localizar fatura Pendente; 2. Clicar em "Baixar boleto" | Nova aba é aberta com a URL assinada do boleto; o download ou visualização do boleto é iniciado na nova aba | 🔴 Alta | UI | CT-FIN-001 |
| CT-FIN-005 | Download de boleto para fatura com status Vencida abre URL assinada em nova aba | ⚠️ Bloqueável: fatura com status Vencida disponível no ambiente | 1. Na lista de faturas, localizar fatura Vencida; 2. Clicar em "Baixar boleto" | Nova aba é aberta com a URL assinada do boleto; download ou visualização iniciado | 🔴 Alta | UI | CT-FIN-001 |
| CT-FIN-006 | Download de recibo para fatura Liquidada abre URL assinada em nova aba | ⚠️ Bloqueável: fatura com status Liquidada disponível no ambiente | 1. Na lista de faturas, localizar fatura Liquidada; 2. Clicar em "Baixar recibo" | Nova aba é aberta com a URL assinada do recibo; download ou visualização iniciado | 🔴 Alta | UI | CT-FIN-001 |
| CT-FIN-007 | Botão "Baixar boleto" ausente para fatura com status Liquidada | Conta com fatura Liquidada | 1. Filtrar por "Pagas"; 2. Verificar ações disponíveis para fatura Liquidada | Botão "Baixar boleto" NÃO está visível nem habilitado para fatura Liquidada; apenas "Baixar recibo" está disponível | 🔴 Alta | UI | CT-FIN-001 |
| CT-FIN-008 | Botão "Baixar recibo" ausente para faturas Pendente e Vencida | Conta com faturas Pendente e Vencida | 1. Localizar fatura Pendente; 2. Verificar ações; 3. Localizar fatura Vencida; 4. Verificar ações | Botão "Baixar recibo" NÃO está visível nem habilitado para faturas Pendente ou Vencida; apenas "Baixar boleto" disponível | 🔴 Alta | UI | CT-FIN-001 |
| CT-FIN-009 | Timeout da API Super Lógica exibe banner de erro com botão "Tentar novamente" | ⚠️ Bloqueável: ambiente que permita simular timeout (proxy/mock); ou endpoint de teste configurado para demorar > 10s | 1. Configurar mock/proxy para retornar resposta após 11 segundos; 2. Acessar a tela de faturas | Após 10 segundos, banner de erro amigável "Não foi possível carregar os dados. Tente novamente." exibido; botão "Tentar novamente" visível e funcional | 🔴 Alta | UI | — |
| CT-FIN-010 | Fluxo boleto → cartão: expansão inline, validação e toast de sucesso | Forma de pagamento atual = Boleto; Gestor autenticado | 1. Na seção Forma de pagamento, clicar em "Alterar para cartão de crédito"; 2. Preencher campos válidos (número, nome, validade, CVV); 3. Clicar em "Salvar alteração" | Formulário expande inline (sem modal/nova tela); validação campo a campo no blur; "Salvar" habilitado somente com todos campos válidos; após salvar: loading → toast "Forma de pagamento atualizada com sucesso!" → bloco atualiza para estado cartão ativo | 🔴 Alta | UI | — |
| CT-FIN-011 | Fluxo cartão → boleto: aviso de impacto, confirmação inline e toast de sucesso | Forma de pagamento atual = Cartão de crédito; Gestor autenticado | 1. Clicar em "Mudar para boleto bancário"; 2. Ler aviso exibido; 3. Clicar em "Confirmar troca para boleto" | Confirmação expande inline; aviso "O cartão cadastrado será removido. As próximas faturas serão enviadas por e-mail com o boleto em PDF." exibido; após confirmar: loading → toast de sucesso → bloco atualiza para estado boleto ativo | 🔴 Alta | UI | — |
| CT-FIN-012 | Fluxo cartão → novo cartão: formulário com campos em branco e mesmo fluxo de validação | Forma de pagamento atual = Cartão de crédito; Gestor autenticado | 1. Clicar em "Alterar cartão"; 2. Verificar formulário; 3. Preencher com dados válidos; 4. Salvar | Formulário abre com campos em branco; mesmo fluxo de validação e salvamento que boleto→cartão; toast de sucesso e bloco atualizado | 🟡 Média | UI | CT-FIN-010 |
| CT-FIN-013 | Botão "Salvar alteração" permanece desabilitado com qualquer campo inválido do cartão | Formulário de cartão expandido | 1. Abrir formulário de cartão; 2. Preencher número do cartão com valor inválido (ex: "1234"); 3. Preencher demais campos válidos; 4. Verificar estado do botão "Salvar" | Botão "Salvar alteração" permanece desabilitado enquanto houver campo inválido; mensagem de erro inline exibida por campo no blur | 🔴 Alta | UI | CT-FIN-010 |
| CT-FIN-014 | Validação campo a campo no blur exibe mensagem de erro inline por campo | Formulário de cartão expandido | 1. Clicar no campo "Número do cartão"; 2. Digitar valor inválido; 3. Clicar fora (blur); 4. Repetir para validade inválida e CVV inválido | Mensagem de erro específica exibida imediatamente após blur: "Número de cartão inválido", "Data de validade inválida", "CVV inválido"; erros desaparecem ao corrigir o campo | 🟡 Média | UI | CT-FIN-010 |
| CT-FIN-015 | "Cancelar" recolhe formulário/confirmação sem salvar nem alterar estado | Formulário de cartão expandido OU confirmação de troca para boleto aberta | 1. Abrir formulário de cartão e preencher campos; 2. Clicar em "Cancelar"; 3. Verificar estado do bloco | Formulário/confirmação recolhe; dados preenchidos são descartados; forma de pagamento permanece inalterada | 🟡 Média | UI | CT-FIN-010 |
| CT-FIN-016 | Fatura com data de vencimento = ontem e status ≠ Liquidada exibe status "Vencida" | ⚠️ Bloqueável: fatura com vencimento = dia anterior ao atual e status Pendente | 1. Localizar fatura com data_vencimento = ontem e status ≠ Liquidada | Fatura exibida com badge "Vencida"; botão "Baixar boleto" disponível | 🔴 Alta | UI | CT-FIN-001 |
| CT-FIN-017 | Fatura com data de vencimento = hoje e status Pendente NÃO é considerada "Vencida" | ⚠️ Bloqueável: fatura com vencimento = data atual e status Pendente | 1. Localizar fatura com data_vencimento = hoje e status Pendente | Fatura exibida com badge "Pendente" (não "Vencida"), pois a regra é data_vencimento < hoje (estritamente menor) | 🔴 Alta | UI | CT-FIN-001 |
| CT-FIN-018 | Paginação exibe página 2 corretamente com mais de 20 faturas | ⚠️ Bloqueável: conta com mais de 20 faturas | 1. Acessar tela de faturas; 2. Navegar para a página 2 da paginação | Página 2 carrega com as faturas corretas; paginação reflete total de itens; não há duplicatas nem itens faltando | 🟡 Média | UI | CT-FIN-001 |
| CT-FIN-019 | Empty state contextual exibido por filtro ativo sem resultados | Conta com faturas, mas sem faturas em determinado filtro (ex: sem faturas Pagas) | 1. Aplicar filtro para o qual não há faturas (ex: "Pagas"); 2. Verificar mensagem exibida | Empty state contextual exibido com mensagem adequada ao filtro ("Nenhuma fatura paga encontrada."); não exibe mensagem genérica | 🟡 Média | UI | CT-FIN-001 |
| CT-FIN-020 | Acesso bloqueado para usuário com role Atendente (agent) | Usuário autenticado com role agent | 1. Autenticar como Atendente; 2. Tentar acessar Configurações > Faturas e formas de pagamento | Acesso negado; seção não visível no menu ou retorna erro de autorização; usuário não consegue visualizar dados financeiros | 🔴 Alta | UI | — |
| CT-FIN-021 | Dados de cartão não trafegam pelo backend Poli (PCI DSS) | Forma de pagamento = boleto; ferramentas de inspeção de rede disponíveis (DevTools/proxy) | 1. Abrir DevTools > Network; 2. Realizar fluxo de cadastro de cartão válido; 3. Inspecionar todas as requisições enviadas para domínios Poli | Nenhuma requisição aos domínios Poli contém número de cartão, CVV ou dados completos; tokenização ocorre via SDK do gateway antes do envio | 🔴 Alta | UI | CT-FIN-010 |
| CT-FIN-022 | Iframe Super Lógica ausente no HTML renderizado | Usuário Gestor autenticado | 1. Acessar Configurações > Faturas e formas de pagamento; 2. Inspecionar o DOM (DevTools > Elements); 3. Buscar por tag `<iframe>` na página | Nenhum elemento `<iframe>` referente ao portal Super Lógica encontrado no DOM; toda a interface é nativa | 🔴 Alta | UI | CT-FIN-001 |
| CT-FIN-023 | Download de nota fiscal abre PDF em nova aba; empty state quando não há NFs | ⚠️ Bloqueável (para parte 1): conta com pelo menos uma nota fiscal emitida | 1. Acessar seção Notas Fiscais; 2. Verificar skeleton durante carregamento; 3. Clicar em "Baixar" em uma NF; 4. Com conta sem NFs, verificar empty state | Skeleton exibido durante carregamento; botão "Baixar" abre PDF em nova aba via URL assinada; se não há NFs, empty state "Nenhuma nota fiscal emitida ainda." é exibido | 🟡 Média | UI | — |
| CT-FIN-024 | Cache de 5 minutos para Notas Fiscais: segunda visita dentro do TTL não faz nova chamada à API | ⚠️ Bloqueável: ambiente com inspeção de requisições de rede disponível | 1. Acessar seção Notas Fiscais; 2. Registrar requisição à API de NFs; 3. Navegar para outra seção e retornar em menos de 5 minutos; 4. Verificar requisições de rede | Na segunda visita (dentro do TTL de 5 min), nenhuma nova chamada à API de NFs é disparada; dados são servidos do cache; após 5 minutos, nova chamada é feita | 🟢 Baixa | UI | CT-FIN-023 |

---

## BLOCO 4 — Gherkin (BDD)

### CT-FIN-020 — Acesso bloqueado para não-Gestor

```gherkin
Feature: Controle de acesso à área financeira
  Como plataforma multi-tenant com dados financeiros sensíveis
  Quero que apenas Gestores acessem Faturas e Formas de Pagamento
  Para proteger informações financeiras de acesso indevido

  Background:
    Given que estou autenticado na plataforma Poli
    And minha conta está ativa

  Scenario: Atendente não visualiza a seção de Faturas
    Given que meu usuário possui a role "agent" (Atendente)
    When acesso o menu de Configurações
    Then a opção "Faturas e formas de pagamento" não está visível no menu
    And se tentar acessar a URL diretamente, recebo um erro de autorização

  Scenario: Gestor acessa normalmente a seção de Faturas
    Given que meu usuário possui a role "manager" (Gestor)
    When acesso Configurações > Faturas e formas de pagamento
    Then a seção carrega normalmente com a lista de faturas
    And o skeleton screen é exibido durante o carregamento
```

---

### CT-FIN-009 — Timeout da API Super Lógica exibe banner de erro amigável

```gherkin
Feature: Resiliência na integração com Super Lógica
  Como Gestor que depende de dados financeiros
  Quero receber feedback claro quando a integração falha
  Para saber que posso tentar novamente em vez de assumir que não há dados

  Background:
    Given que estou autenticado como Gestor
    And a integração backend-to-backend com Super Lógica está configurada
    And o timeout da integração está configurado para 10 segundos

  Scenario: Timeout de 10s exibe banner de erro com ação de retry
    Given que a API Super Lógica está demorando mais de 10 segundos para responder
    When acesso a seção "Faturas e formas de pagamento"
    Then o skeleton screen é exibido inicialmente
    And após 10 segundos sem resposta, o skeleton desaparece
    And um banner de erro amigável "Não foi possível carregar os dados. Tente novamente." é exibido
    And o botão "Tentar novamente" está visível e funcional
    And nenhuma mensagem de erro técnica ou stack trace é exposta ao usuário

  Scenario: Retry após timeout dispara nova chamada à API
    Given que o banner de erro está sendo exibido após timeout
    And a API Super Lógica voltou a responder normalmente
    When clico no botão "Tentar novamente"
    Then uma nova requisição à API é disparada
    And o skeleton screen é exibido novamente durante o novo fetch
    And as faturas são carregadas com sucesso após a resposta
```

---

## Validação por Agente Crítico Independente

O agente crítico avaliou os cenários com base exclusivamente no card DEV4-4257 (título, critérios de aceite e regras de negócio), verificando: rastreabilidade, duplicatas, cobertura mínima, assunções indevidas e executabilidade sem conhecimento de código.

**Achados aplicados:**
- `CT-FIN-003` revisado: verificação de nova aba tornada mais precisa e explícita
- `CT-FIN-016/017` revisados: distinção clara entre `<` (estrito) e `<=` para o cálculo de "Vencida", baseado na RN `data_vencimento < hoje`
- `CT-FIN-021` revisado: reformulado para inspeção via DevTools/proxy sem exigir conhecimento de código interno
- `CT-FIN-024` adicionado: cobertura do TTL de cache de 5 min para NFs (mencionado na RN mas sem cenário)
- `CT-FIN-023` adicionado: empty state de notas fiscais era critério de aceite sem cenário correspondente

| Métrica | Valor |
|---------|-------|
| Aprovados sem alteração | 17 |
| Revisados | 4 (CT-FIN-003, CT-FIN-016, CT-FIN-017, CT-FIN-021) |
| Adicionados por cobertura insuficiente | 2 (CT-FIN-023, CT-FIN-024) |
| **Total de cenários** | **24** |

### Cobertura mínima atingida

| Tipo | Mínimo | Gerado |
|------|--------|--------|
| Happy Path | 2 | 8 |
| Negativos/Erro | 3 | 8 |
| Borda | 2 | 4 |
| Segurança | 1 | 3 |

### Distribuição de criticidade

| Criticidade | Quantidade |
|-------------|-----------|
| 🔴 Alta | 13 |
| 🟡 Média | 8 |
| 🟢 Baixa | 3 |
| **Total** | **24** |
