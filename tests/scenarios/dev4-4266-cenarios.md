# Cenários de Teste — DEV4-4266
> Card: Notas Fiscais (Nova interface)
> Gerado em: 2026-05-28
> Card atualizado em: 2026-05-27T16:33:42.110-0300

---

## BLOCO 1 — Estratégia de Teste

A funcionalidade migra a seção de Notas Fiscais do embed externo da Super Lógica para uma página nativa na `foundation-spa`, consumindo dados via integração backend-to-backend. O escopo cobre testes de UI (4 estados obrigatórios: loading, error, empty, success), controle de acesso por role (Gestor), comportamento de download via URL assinada, cache de 5 minutos no backend, timeout de 10 s com fallback de erro, conformidade com Design System Poli e acessibilidade WCAG AA. Prioridade de execução: controle de acesso → estados de UI → download → erro/retry → empty state → acessibilidade. Principal risco: vazamento de NFs entre contas (multi-tenancy), expiração de URL assinada e falha silenciosa no retry.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade | Impacto | Prioridade |
|---|---|---|---|
| Usuário não-Gestor acessa a seção de NFs (falha de controle de acesso) | M | A | 🔴 Alta |
| NFs de outra account visíveis (vazamento multi-tenant) | B | A | 🔴 Alta |
| URL de download assinada expirada ao clicar em "Baixar" | M | A | 🔴 Alta |
| Banner de erro não exibido quando API Super Lógica timeout >10 s | M | A | 🔴 Alta |
| "Tentar novamente" recarrega a página inteira em vez de re-executar o fetch | M | M | 🟡 Média |
| Iframe da Super Lógica ainda presente (regressão de remoção) | B | A | 🔴 Alta |
| Skeleton não exibido durante carregamento (flash de empty state) | M | M | 🟡 Média |
| Lista não ordenada da NF mais recente para a mais antiga | M | M | 🟡 Média |
| Tokens de Design System Poli não aplicados (identidade visual incorreta) | M | M | 🟡 Média |
| Textos sem i18n hardcoded em PT-BR (quebra en/es) | M | M | 🟡 Média |
| Evento analytics `fiscal_notes_api_error` não disparado em falha | B | B | 🟢 Baixa |
| WCAG AA não respeitado (botão "Baixar" sem aria-label) | M | M | 🟡 Média |

---

## BLOCO 3 — Tabela de Cenários

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-NF-001 | Happy path — Gestor visualiza lista de NFs com sucesso | Usuário autenticado com role Gestor; conta com ≥1 NF emitida; API Super Lógica disponível | 1. Autenticar como Gestor. 2. Navegar para a seção "Notas Fiscais". 3. Aguardar carregamento. | Skeleton exibido durante fetch; lista renderiza com número da NF, competência (mês/ano), valor e botão "Baixar"; NFs ordenadas da mais recente para a mais antiga; nenhum iframe da Super Lógica presente. | 🔴 Alta | UI | — |
| CT-NF-002 | Happy path — Gestor baixa NF em PDF em nova aba | Usuário autenticado com role Gestor; conta com ≥1 NF; API disponível; URL assinada válida | 1. Carregar a seção de NFs (CT-NF-001 bem-sucedido). 2. Clicar no botão "Baixar" de qualquer NF. | PDF abre em nova aba do navegador; tab original permanece aberta; evento `fiscal_note_downloaded` disparado. | 🔴 Alta | UI | CT-NF-001 |
| CT-NF-003 | Negativo — Atendente (agent) não acessa seção de NFs | Usuário autenticado com role `agent` | 1. Autenticar como Atendente. 2. Tentar navegar diretamente para a rota `/notas-fiscais`. | Acesso negado: rota redireciona ou exibe tela de erro 403/Not Found; seção não aparece no menu de navegação do Atendente. | 🔴 Alta | UI | — |
| CT-NF-004 | Negativo — Acesso sem autenticação retorna erro 401 | Nenhuma sessão ativa | 1. Realizar requisição GET à rota de NFs sem token JWT. | Resposta HTTP 401; usuário redirecionado para login; nenhuma NF exibida. | 🔴 Alta | API | — |
| CT-NF-005 | Negativo — Timeout da integração exibe banner de erro com retry | ⚠️ Bloqueável: ambiente com possibilidade de simular timeout >10 s na integração Super Lógica | 1. Autenticar como Gestor. 2. Configurar mock/stub para atrasar resposta da API de NFs por >10 s. 3. Navegar para a seção. | Banner de erro exibido: "Não foi possível carregar as notas fiscais. Tente novamente."; botão "Tentar novamente" presente; evento `fiscal_notes_api_error` disparado; nenhum crash ou tela branca. | 🔴 Alta | UI | — |
| CT-NF-006 | Negativo — Erro 500 da API exibe banner e permite retry | ⚠️ Bloqueável: ambiente com possibilidade de simular erro 5xx | 1. Autenticar como Gestor. 2. Simular retorno 500 da API de NFs. 3. Navegar para a seção. 4. Clicar em "Tentar novamente". | Banner de erro exibido na primeira tentativa; ao clicar "Tentar novamente" o fetch é re-executado sem reload da página; se API recuperar, lista é exibida. | 🔴 Alta | UI | — |
| CT-NF-007 | Negativo — "Tentar novamente" re-executa fetch sem reload da página | ⚠️ Bloqueável: ambiente com mock de erro recuperável | 1. Simular erro de API (CT-NF-006). 2. Observar estado da página. 3. Clicar "Tentar novamente". | URL do navegador não muda; não há refresh completo da página (estado de outros componentes preservado); novo request é disparado à API de NFs. | 🔴 Alta | UI | CT-NF-006 |
| CT-NF-008 | Borda — Empty state quando conta não tem NFs emitidas | Usuário autenticado com role Gestor; conta sem nenhuma NF emitida; API disponível | 1. Autenticar como Gestor de conta sem NFs. 2. Navegar para a seção. | Empty state exibido com ícone, título e subtítulo conforme especificação ("Nenhuma nota fiscal emitida ainda" / "As notas fiscais das suas faturas aparecerão aqui assim que forem emitidas."); nenhum item de lista visível. | 🟡 Média | UI | — |
| CT-NF-009 | Borda — URL de download assinada expirada não abre PDF | ⚠️ Bloqueável: ambiente onde TTL da URL assinada possa ser reduzido para teste | 1. Carregar lista de NFs. 2. Aguardar expiração da URL assinada (TTL ~15 min ou TTL reduzido em teste). 3. Clicar em "Baixar". | Comportamento tratado: erro exibido ao usuário (ex: toast ou mensagem informando que o link expirou); nova tentativa de download deve gerar nova URL assinada ou orientar re-carregamento da lista. | 🟡 Média | UI | CT-NF-001 |
| CT-NF-010 | Segurança — Gestor de conta A não visualiza NFs da conta B | Dois Gestores em contas distintas; ambas com NFs | 1. Autenticar como Gestor da conta A. 2. Carregar seção de NFs. 3. Inspecionar response da API e NFs exibidas. 4. Tentar manipular parâmetro de account na request para ID da conta B. | API retorna apenas NFs da conta A; requisição com account_id da conta B retorna 403 ou lista vazia; nenhuma NF da conta B visível. | 🔴 Alta | API | — |
| CT-NF-011 | Acessibilidade — Botão "Baixar" acessível via teclado e leitor de tela | Usuário autenticado como Gestor; ≥1 NF carregada | 1. Carregar a seção de NFs. 2. Navegar pelos elementos usando Tab. 3. Focar o botão "Baixar" e ativar com Enter/Space. 4. Verificar atributos ARIA. | Botão "Baixar" recebe foco via Tab; ativação por teclado inicia download; botão possui texto acessível ou aria-label descritivo (ex: "Baixar NF 001/2026"); WCAG AA validado. | 🟡 Média | UI | CT-NF-001 |
| CT-NF-012 | i18n — Textos exibidos corretamente nos 3 idiomas | Usuário autenticado como Gestor; ambiente com seleção de idioma | 1. Alternar idioma para EN. Navegar para NFs. 2. Alternar para ES. Navegar para NFs. 3. Verificar todos os textos estáticos. | EN: "Tax invoices", "Number", "Period", "Amount", "Download", "No tax invoices issued yet", "Unable to load tax invoices...". ES: "Facturas fiscales", "Número", "Período", "Monto", "Descargar", etc.; nenhum texto em PT-BR hardcoded aparece nos outros idiomas. | 🟡 Média | UI | CT-NF-001 |
| CT-NF-013 | Borda — Skeleton exibido durante todo o período de carregamento | ⚠️ Bloqueável: ambiente com throttling de rede ou mock de latência | 1. Autenticar como Gestor. 2. Simular latência de rede de 3 s na chamada de NFs. 3. Navegar para a seção. | Skeleton screen exibido imediatamente ao entrar na seção; permanece visível durante toda a espera; nunca exibe flash de empty state antes dos dados chegarem. | 🟡 Média | UI | — |
| CT-NF-014 | Borda — Nenhum iframe da Super Lógica presente na nova interface | Usuário autenticado como Gestor | 1. Autenticar como Gestor. 2. Navegar para a seção de NFs. 3. Inspecionar DOM da página. | Nenhum elemento `<iframe>` com referência ao domínio da Super Lógica presente no DOM; ausência de qualquer chamada de rede para `superlogica.com` iniciada pelo frontend. | 🔴 Alta | UI | — |
| CT-NF-015 | Segurança — Requisição direta à API de NFs com token de Atendente retorna 403 | ⚠️ Bloqueável: acesso à API via ferramenta de teste (Postman/curl) | 1. Autenticar como Atendente e obter JWT. 2. Fazer GET na rota de NFs usando o JWT do Atendente. | API retorna 403 Forbidden; corpo da resposta não contém dados de NFs. | 🔴 Alta | API | CT-NF-003 |

---

## BLOCO 4 — Gherkin (BDD)

### CT-NF-001 — Happy path: Gestor visualiza lista de NFs

```gherkin
# language: pt

Funcionalidade: Visualização de Notas Fiscais
  Como Gestor da conta
  Quero visualizar as notas fiscais emitidas pela Poli
  Para ter controle contábil sem depender de sistemas externos

  Contexto:
    Dado que estou autenticado como Gestor
    E a minha conta possui notas fiscais emitidas

  Cenário: Gestor visualiza lista de notas fiscais ordenada
    Quando navego para a seção "Notas Fiscais"
    Então o skeleton screen é exibido imediatamente durante o carregamento
    E quando o carregamento é concluído a lista de NFs é exibida
    E cada linha da lista contém número da NF, competência, valor e botão "Baixar"
    E as NFs estão ordenadas da mais recente para a mais antiga
    E nenhum iframe da Super Lógica está presente na página
    E o evento "fiscal_notes_viewed" é disparado
```

### CT-NF-005 — Timeout da integração exibe banner com retry

```gherkin
# language: pt

Funcionalidade: Tratamento de erro na integração com Super Lógica
  Como Gestor da conta
  Quero ser informado quando as NFs não puderem ser carregadas
  Para poder tentar novamente sem precisar recarregar a página

  Contexto:
    Dado que estou autenticado como Gestor
    E a integração com a Super Lógica está com timeout acima de 10 segundos

  Cenário: API timeout exibe banner de erro com botão de retry
    Quando navego para a seção "Notas Fiscais"
    Então o banner de erro "Não foi possível carregar as notas fiscais. Tente novamente." é exibido
    E o botão "Tentar novamente" está visível e acessível
    E o evento "fiscal_notes_api_error" é disparado
    E nenhuma nota fiscal é exibida na lista

  Cenário: Clicar em "Tentar novamente" re-executa o fetch sem reload
    Dado que o banner de erro está sendo exibido
    Quando clico no botão "Tentar novamente"
    Então um novo request é enviado à API de NFs
    E a URL da página não muda
    E o estado dos demais componentes da página é preservado
```

---

## Validação por Agente Crítico Independente

> Resultado da revisão aplicada sobre os 15 cenários gerados:

**Problemas identificados e correções aplicadas:**

| CT-ID | Critério | Problema | Sugestão Aplicada |
|---|---|---|---|
| CT-NF-009 | Cobertura de borda — URL assinada expirada | Resultado esperado original omitia o comportamento após expiração (nova URL ou orientação ao usuário) | Resultado esperado expandido para cobrir o comportamento pós-expiração |
| CT-NF-007 | Duplicidade parcial com CT-NF-006 | Cenário de retry estava embutido em CT-NF-006; separado para garantir rastreabilidade independente do critério de aceite "Tentar novamente re-executa o fetch sem reload" | Mantido como cenário independente com referência explícita |
| CT-NF-013 | Assunção indevida — skeleton durante loading | Cenário original não sinalizava necessidade de bloqueio por ambiente com latência simulável | Adicionado ⚠️ Bloqueável |
| CT-NF-011 | Cobertura WCAG AA | Faltava verificação de ativação por teclado (Enter/Space) além do foco | Passo a passo atualizado para incluir ativação via teclado |

**Cobertura verificada:**
- ✅ Happy path: 2 (CT-NF-001, CT-NF-002)
- ✅ Negativos/erro: 5 (CT-NF-003, CT-NF-004, CT-NF-005, CT-NF-006, CT-NF-007)
- ✅ Borda: 4 (CT-NF-008, CT-NF-009, CT-NF-013, CT-NF-014)
- ✅ Segurança: 2 (CT-NF-010, CT-NF-015)
- ✅ Acessibilidade/i18n: 2 (CT-NF-011, CT-NF-012)

- Aprovados sem alteração: 10
- Revisados: 4 (CT-NF-006, CT-NF-007, CT-NF-009, CT-NF-011, CT-NF-013)
- Adicionados por cobertura insuficiente: 0
