# Cenários de Teste — DEV4-4182
> Card: Protocolos
> Gerado em: 2026-05-20

---

## Estratégia de Teste

**Escopo:** Tela de listagem de Protocolos redesenhada — campo de busca unificado em tempo real (por número, cliente e atendente), ordenação padrão decrescente por data de abertura e paginação dinâmica (10–50 itens/página, padrão 15). Inclui botão "Tipos de Protocolo" e right sheet de edição (detalhes funcionais ainda pendentes de especificação).

**Tipos de teste aplicáveis:** Funcional, Borda, Regressão e Segurança.

**Prioridade de execução:** Ordenação padrão e busca em tempo real primeiro → Paginação → Segurança antes de qualquer deploy.

**Riscos principais:** Debounce mal configurado pode gerar sobrecarga de requisições; limpeza do campo pode não restaurar a ordenação original; valores extremos de paginação (10 e 50) podem revelar problemas de performance ou layout.

**Informações confirmadas pelo time:**
- Busca: em tempo real (debounce), correspondência parcial
- Paginação: 15 itens por padrão, configurável entre 10 e 50

---

## Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Busca em tempo real dispara requisições excessivas sem debounce adequado | M | A | 🔴 Alta |
| Ordenação padrão não aplicada ao recarregar a página após filtro | M | A | 🔴 Alta |
| Injeção de XSS/SQL via campo de busca unificado | B | A | 🔴 Alta |
| Limpar o campo de busca não restaura a listagem completa | M | M | 🟡 Média |
| Configuração de paginação aceita valores fora do intervalo 10–50 | M | M | 🟡 Média |
| Última página com itens residuais exibe layout quebrado | B | M | 🟡 Média |
| Busca com acentuação/caracteres especiais retorna zero resultados incorretamente | M | M | 🟡 Média |
| Right sheet de edição não abre ou fecha sem salvar dados | B | B | 🟢 Baixa |

---

## Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade |
|---|---|---|---|---|---|
| CT-PROTO-001 | Listagem ordenada por data decrescente | Usuário logado com acesso à tela de Protocolos; ao menos 3 protocolos cadastrados em datas distintas | 1. Navegar para a tela de Protocolos. 2. Observar a ordem dos registros na tabela sem aplicar nenhum filtro. | Tabela exibe protocolos com o mais recente no topo, em ordem decrescente de data de abertura. Paginação exibe 15 itens por padrão. *(RN2, RN3)* | 🔴 Alta |
| CT-PROTO-002 | Busca em tempo real por número de protocolo | Usuário logado; protocolo com número conhecido cadastrado (ex.: #2024001) | 1. Navegar para Protocolos. 2. No campo de busca, digitar os 3 primeiros dígitos do número do protocolo. 3. Aguardar sem pressionar Enter. | Tabela filtra automaticamente em tempo real (sem ação manual) exibindo apenas protocolos cujo número contenha o trecho digitado. *(RN1)* | 🔴 Alta |
| CT-PROTO-003 | Busca parcial por nome do cliente | Usuário logado; ao menos um protocolo com cliente de nome conhecido (ex.: "Maria Silva") | 1. Navegar para Protocolos. 2. Digitar "mar" no campo de busca. 3. Aguardar resposta. | Tabela exibe em tempo real todos os protocolos cujo nome do cliente contenha "mar" (case insensitive). *(RN1)* | 🟡 Média |
| CT-PROTO-004 | Busca parcial por nome do atendente | Usuário logado; protocolos com atendentes de nomes variados cadastrados | 1. Navegar para Protocolos. 2. Digitar parte do nome de um atendente conhecido (ex.: "joa") no campo de busca. | Tabela filtra em tempo real exibindo somente protocolos atribuídos a atendentes cujo nome contenha "joa". *(RN1)* | 🟡 Média |
| CT-PROTO-005 | Busca sem resultados exibe estado vazio | Usuário logado | 1. Navegar para Protocolos. 2. Digitar no campo de busca uma string que não corresponde a nenhum protocolo, cliente ou atendente (ex.: "xyzxyz999"). | Tabela exibe estado vazio com mensagem informativa (ex.: "Nenhum resultado encontrado"). Sem erros de JavaScript ou quebra de layout. *(RN1)* | 🟡 Média |
| CT-PROTO-006 | Limpar busca restaura listagem original | Busca ativa exibindo resultados filtrados | 1. Com filtro ativo na busca, selecionar todo o texto do campo e deletar. | Tabela retorna a exibir todos os protocolos com a ordenação padrão decrescente por data de abertura e paginação de 15 itens. *(RN1, RN2)* | 🟡 Média |
| CT-PROTO-007 | Configuração de paginação dentro do intervalo válido | Tela de Protocolos carregada com ao menos 50 protocolos | 1. Localizar o seletor de itens por página. 2. Configurar para 10 itens. 3. Verificar. 4. Configurar para 50 itens. 5. Verificar. | Para 10: tabela exibe 10 registros, paginação recalculada. Para 50: tabela exibe até 50 registros, paginação recalculada. Em ambos os casos sem erros. *(RN3)* | 🟡 Média |
| CT-PROTO-008 | Rejeição de paginação fora do intervalo | Tela de Protocolos carregada | 1. Tentar inserir manualmente o valor "5" no seletor de itens por página. 2. Tentar inserir "100". 3. Tentar inserir texto (ex.: "abc"). | Sistema não aceita os valores — exibe aviso, reverte para valor anterior ou limita ao intervalo 10–50. Nenhuma quebra de interface ou erro crítico. *(RN3)* | 🟡 Média |
| CT-PROTO-009 | Última página com registros residuais | Total de protocolos não múltiplo de 15 (ex.: 17 protocolos com paginação padrão) | 1. Navegar para Protocolos. 2. Ir para a última página usando o controle de paginação. | A última página exibe apenas os registros restantes sem dados fantasma, sem erro de layout e com controle "próxima página" desabilitado. *(RN3)* | 🟢 Baixa |
| CT-PROTO-010 | Busca com um único caractere | Usuário logado; protocolos com clientes/atendentes variados | 1. Navegar para Protocolos. 2. Digitar apenas "a" no campo de busca. | Tabela filtra em tempo real exibindo todos os protocolos que contenham "a" no número, nome do cliente ou nome do atendente. *(RN1)* | 🟢 Baixa |
| CT-PROTO-011 | Busca com caracteres especiais não quebra interface | Usuário logado | 1. Navegar para Protocolos. 2. Inserir no campo de busca: `!@#$%^&*()`. | Interface permanece estável. Tabela exibe zero resultados ou resultados válidos. Sem crash, erro 500 ou quebra de layout. *(RN1)* | 🟢 Baixa |
| CT-PROTO-012 | Injeção de XSS e SQL via campo de busca | Usuário logado | 1. Navegar para Protocolos. 2. Inserir no campo de busca: `' OR '1'='1`. 3. Aguardar. 4. Limpar e inserir: `<script>alert('xss')</script>`. 5. Aguardar. | Nenhum dado inesperado é retornado no passo 2. Nenhum script é executado no passo 4. Resposta HTTP 200 com resultado vazio ou sanitizado. Sem alert popup ou alteração no DOM. *(Segurança / RN1)* | 🔴 Alta |

---

## Cenários Gherkin (BDD)

```gherkin
Cenário: Listagem de protocolos carregada com ordenação padrão decrescente
  Dado que o usuário está autenticado e acessa a tela de Protocolos
  E existem ao menos 3 protocolos com datas de abertura distintas cadastrados
  Quando a tela é carregada sem nenhum filtro aplicado
  Então a tabela exibe os protocolos com o mais recente no topo
  E a paginação exibe 15 itens por padrão
```

```gherkin
Cenário: Busca em tempo real por número de protocolo retorna resultados parciais
  Dado que o usuário está autenticado e acessa a tela de Protocolos
  E existe um protocolo com número "2024001" cadastrado
  Quando o usuário digita "202" no campo de busca sem pressionar Enter
  Então a tabela filtra automaticamente exibindo apenas protocolos cujo número contém "202"
  E nenhuma ação manual adicional é necessária para acionar o filtro
```

---

**Resumo:** 12 cenários — 🔴 3 Alta | 🟡 6 Média | 🟢 3 Baixa
