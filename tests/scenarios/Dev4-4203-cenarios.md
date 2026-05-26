# Cenários de Teste — Dev4-4203
> Card: Busca de templates e mensagens rápidas na Nova Interface filtra apenas pela primeira palavra
> Gerado em: 2026-05-19

---

## BLOCO 1 — Estratégia de Teste

**Escopo:** Frontend da Nova Interface — componente de busca de templates, mensagens rápidas e demais tipos de itens que compartilham a mesma lógica de filtragem. A correção substitui a lógica atual (provavelmente `startsWith`) por busca de substring (`includes`), com suporte a case-insensitive e normalização de acentos.

**Tipos de teste aplicáveis:** Funcional (happy path + negativos), Regressão (paridade com Legado e garantia de que a primeira palavra continua funcionando), Borda (acentuação, case, itens de outros tipos), Segurança (XSS no campo de busca).

**Prioridade de execução:** 1) Core bug fix (CT-001, CT-002) → 2) Regressão e paridade com Legado (CT-003, CT-011) → 3) Borda e case-insensitive/acentos (CT-007, CT-008, CT-009) → 4) Negativos (CT-004, CT-005) → 5) Segurança (CT-010) → 6) UX/estado inicial (CT-006).

**Riscos principais:** Regressão na busca pela primeira palavra; divergência residual entre Legado e Nova Interface; fix não propagado para todos os tipos de itens que usam o mesmo componente; normalização de acentos inconsistente.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Regressão: busca pela primeira palavra quebra após o fix | M | A | **Alta** |
| Comportamento divergente entre Legado e Nova Interface após a correção | M | A | **Alta** |
| Fix não aplicado em todos os tipos de itens que usam o mesmo componente de busca | M | M | **Média** |
| Normalização de acentos implementada de forma inconsistente entre campos | M | M | **Média** |
| Vulnerabilidade XSS no campo de busca (input não sanitizado) | B | A | **Média** |
| Performance degradada com substring search em listas grandes de templates | B | M | **Baixa** |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade |
|---|---|---|---|---|---|
| CT-BUSCA-001 | Substring no meio do título retorna template | Operador logado na Nova Interface; template com título composto cadastrado (ex: "#Dados Preenchimento") | 1. Acessar o chat na Nova Interface<br>2. Clicar no campo de mensagem<br>3. Digitar `/preenc`<br>4. Observar o painel de templates/mensagens rápidas | O template "#Dados Preenchimento" é exibido nos resultados. A busca encontra "preenc" em qualquer posição do título. _(Regra de negócio 1 e 2; CA 2)_ | 🔴 Alta |
| CT-BUSCA-002 | Palavra exclusiva do conteúdo retorna template | Template cadastrado cuja palavra buscada aparece apenas no corpo (não no título/atalho) | 1. Acessar o chat na Nova Interface<br>2. Digitar `/[palavra presente apenas no corpo do template]`<br>3. Observar os resultados no painel | O template é listado nos resultados, pois a busca cobre o conteúdo além do título. _(Regra de negócio 2; CA 3)_ | 🔴 Alta |
| CT-BUSCA-003 | Regressão — primeira palavra ainda retorna resultado | Template cujo título inicia com "dad" (ex: "/dad…") cadastrado na Nova Interface | 1. Acessar o chat na Nova Interface<br>2. Digitar `/dad`<br>3. Observar os resultados | Templates com início "dad" são exibidos normalmente. Comportamento anterior preservado após o fix. _(CA 1 — regressão)_ | 🔴 Alta |
| CT-BUSCA-004 | Termo inexistente exibe estado vazio | Operador logado na Nova Interface | 1. Acessar o chat na Nova Interface<br>2. Digitar `/xyzxyzxyz` (termo sem correspondência em nenhum template ou mensagem rápida)<br>3. Observar o painel | Estado vazio é exibido corretamente — sem loading infinito, sem erro, sem conteúdo residual. _(CA 5)_ | 🟡 Média |
| CT-BUSCA-005 | Caractere especial sem correspondência exibe estado vazio | Operador logado na Nova Interface | 1. Digitar `/###!!!` no campo de mensagem<br>2. Observar o painel | Estado vazio exibido corretamente. Nenhum template retornado. Aplicação não quebra. _(CA 5 — variação com caracteres especiais)_ | 🟡 Média |
| CT-BUSCA-006 | Campo vazio exibe lista completa | Painel de templates/mensagens rápidas aberto | 1. Abrir o painel de templates (ex: digitar `/` sem texto adicional)<br>2. Apagar qualquer texto no campo de busca<br>3. Observar os resultados | A lista completa de templates e mensagens rápidas é exibida sem filtro aplicado. _(Comportamento padrão esperado do componente)_ | 🟢 Baixa |
| CT-BUSCA-007 | Busca case-insensitive retorna mesmos resultados | Template com letras maiúsculas e minúsculas no título (ex: "#Dados Preenchimento") | 1. Digitar `/DADOS` (maiúsculas) e anotar resultados<br>2. Limpar o campo<br>3. Digitar `/dados` (minúsculas) e anotar resultados<br>4. Comparar os dois conjuntos de resultados | Ambas as buscas retornam exatamente os mesmos templates. _(Regra de negócio 1; CA 4)_ | 🟡 Média |
| CT-BUSCA-008 | Busca normaliza acentos corretamente | Template cujo título contém palavra acentuada (ex: "Preenchimento") | 1. Digitar `/preenchimento` (sem variação de acento) e anotar resultados<br>2. Limpar o campo<br>3. Digitar `/preenchiménto` (acento errado) e comparar | A normalização de acentos equipara todas as variações. O template "Preenchimento" é encontrado em todos os casos. _(Regra complementar confirmada pelo produto)_ | 🟡 Média |
| CT-BUSCA-009 | Outros itens do componente filtram por substring | Outros tipos de itens cadastrados que usam o mesmo componente de busca na Nova Interface | 1. Identificar os demais tipos de itens que usam o mesmo componente de busca<br>2. Para cada tipo, buscar por uma substring que **não** seja a primeira palavra do item<br>3. Observar os resultados | Todos os tipos de itens retornam resultado ao buscar por substring em qualquer posição — o fix é abrangente ao componente compartilhado. _(Escopo ampliado confirmado pelo produto)_ | 🟡 Média |
| CT-BUSCA-010 | XSS no campo de busca não é executado | Operador logado na Nova Interface | 1. No campo de mensagem, digitar `/<script>alert('xss')</script>`<br>2. Observar o painel e o console do browser<br>3. Verificar se algum alert ou execução de script ocorre | O script **não é executado**. O texto é tratado como string literal ou o painel exibe estado vazio. Nenhum alerta JavaScript é disparado. _(Segurança — campo de input de usuário)_ | 🔴 Alta |
| CT-BUSCA-011 | Paridade de resultados Legado vs Nova Interface | Acesso simultâneo (ou sequencial) à Interface Legada e à Nova Interface; mesmos templates cadastrados nas duas | 1. Na Interface **Legada**, digitar `/preenc` e anotar os templates retornados<br>2. Na **Nova Interface**, digitar o mesmo termo `/preenc`<br>3. Comparar os dois conjuntos de resultados item a item | Ambas as interfaces retornam exatamente os mesmos templates para o mesmo termo de busca. _(Regra de negócio 3; CA 6)_ | 🔴 Alta |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Cenário: Busca por substring no meio do título retorna o template correspondente
  Dado que o operador está logado na Nova Interface
  E existe um template com título "#Dados Preenchimento" cadastrado no sistema
  Quando o operador digita "/preenc" no campo de mensagem
  Então o painel de templates exibe o template "#Dados Preenchimento"
  E nenhum erro ou estado vazio é apresentado
```

```gherkin
Cenário: Busca por palavra exclusiva do conteúdo retorna o template correspondente
  Dado que o operador está logado na Nova Interface
  E existe um template cujo corpo contém a palavra "confirmacao" mas o título não
  Quando o operador digita "/confirmacao" no campo de mensagem
  Então o painel de templates exibe esse template nos resultados
```

```gherkin
Cenário: Regressão — busca pela primeira palavra continua retornando resultado após o fix
  Dado que o operador está logado na Nova Interface
  E existe um template com título iniciado por "dad"
  Quando o operador digita "/dad" no campo de mensagem
  Então o template é exibido nos resultados
  E nenhuma regressão é observada no comportamento original
```

```gherkin
Cenário: XSS no campo de busca não é executado
  Dado que o operador está logado na Nova Interface
  Quando o operador digita "/<script>alert('xss')</script>" no campo de mensagem
  Então nenhum alerta JavaScript é disparado no browser
  E o painel exibe estado vazio ou trata o input como texto literal
```

```gherkin
Cenário: Resultados da busca são idênticos entre Interface Legada e Nova Interface
  Dado que o operador tem acesso à Interface Legada e à Nova Interface
  E os mesmos templates estão cadastrados nas duas interfaces
  Quando o operador busca por "/preenc" na Interface Legada
  E o operador busca por "/preenc" na Nova Interface
  Então os dois conjuntos de resultados são idênticos em conteúdo e quantidade
```

---

## Sugestões para o QA

**Automação:** Os cenários CT-BUSCA-001, CT-BUSCA-003 e CT-BUSCA-007 têm alto ROI para automação — são determinísticos, independem de estado visual e validam a lógica de filtragem que é o núcleo do fix. Um teste unitário/componente no próprio frontend (ex: Vitest/Jest + Testing Library) cobrindo a função de filtro seria mais rápido e estável do que testes E2E para esses casos.

**Boas práticas:** Antes de executar os cenários, alinhar com o dev a lista exata de tipos de itens que compartilham o componente de busca (CT-BUSCA-009) — sem esse mapeamento, o escopo do teste fica aberto. Criar uma massa de dados dedicada com templates de nomes compostos (mínimo 3–4 exemplos variados) para evitar dependência de dados de produção.

**Monitoramento pós-deploy:** Acompanhar o volume de tickets de suporte com tema "busca" por 5–7 dias após o deploy. Conforme a métrica definida no card, a meta é 0 relatos de busca incorreta na Nova Interface. Um spike no volume indicaria regressão ou edge case não coberto.

**Ponto em aberto — tamanho mínimo da query:** Como não há definição de mínimo de caracteres, recomendo validar com o dev o comportamento para queries de 1 e 2 caracteres (ex: `/d`) antes de definir se esse caso entra na cobertura de testes ou se é risco aceito para uma iteração futura.
