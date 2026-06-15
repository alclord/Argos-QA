# Cenários de Teste — DEV4-4257
> Card: Faturas e notas fiscais (Nova interface)
> Gerado em: 2026-06-12
> Card atualizado em: 2026-06-12T10:02:54 -0300

---

## BLOCO 1 — Estratégia de Teste

Esta entrega substitui o iframe da Super Lógica por experiência nativa, eliminando a dupla autenticação e trazendo controle total da jornada financeira para dentro da Poli. **Atenção:** "Formas de Pagamento" foi removida do escopo deste card — cenários da versão anterior referentes a boleto/cartão foram descartados. Os riscos principais são: (1) regras condicionais de download — boleto exclusivo para Pendente/Vencida, recibo exclusivo para Liquidada; (2) comportamento do filtro em relação a linhas de NF — devem permanecer visíveis independente do filtro; (3) classificação de "Vencida" como subconjunto de "Pendentes"; (4) integração backend Poli → Super Lógica com timeout de 10s e fallback. Tipos de teste: UI funcional (filtro, colapso, downloads, empty states), API (acesso, URL assinada), regressão (ausência de iframe). Prioridade: 1º controle de acesso, 2º regras de download por status, 3º filtro com NF visível, 4º colapso/expansão e empty states.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade | Impacto | Prioridade |
|---|---|---|---|
| Botão "Baixar boleto" exibido para fatura Liquidada (ou vice-versa) | M | A | Alta |
| Linha de NF desaparecendo ao aplicar filtro (deveria sempre permanecer) | M | A | Alta |
| Fatura "Vencida" não incluída no filtro "Pendentes" | M | A | Alta |
| Timeout integração Super Lógica sem fallback amigável | M | M | Média |
| Estado de expansão de grupo resetando ao trocar filtro | M | M | Média |
| Grupos sem correspondência ao filtro permanecem visíveis indevidamente | M | M | Média |
| iframe Super Lógica ainda presente no frontend (regressão) | B | A | Alta |
| Cliente precisar de credenciais Super Lógica para acessar dados | B | A | Alta |
| URL assinada sem TTL ou com TTL inválido | B | M | Média |
| Acesso de Operadores à seção financeira | B | A | Alta |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-FATUR-001 | Carregamento inicial com skeleton e grupos ordenados | Usuário logado como Gestor; conta com ≥ 2 meses de faturas | 1. Navegar para Minha Empresa > Faturas e Notas Fiscais 2. Observar carregamento 3. Aguardar renderização | Skeleton exibido durante fetch; grupos renderizados ordenados do mais recente para o mais antigo; grupo do mês mais recente expandido por padrão; demais grupos colapsados; filtro "Todas" ativo por padrão | 🔴 Alta | UI | — |
| CT-FATUR-002 | Download de boleto para fatura Pendente | Conta com fatura no status "Pendente" ⚠️ Bloqueável — verificar existência no ambiente | 1. Localizar fatura com status "Pendente" 2. Clicar em "Baixar boleto" | Nova aba abre com URL assinada do boleto; download iniciado; nenhuma credencial Super Lógica solicitada | 🔴 Alta | UI | CT-FATUR-001 |
| CT-FATUR-003 | Download de boleto para fatura Vencida | Conta com fatura no status "Vencida" (vencimento < hoje, não Liquidada) ⚠️ Bloqueável — criar fatura com data de vencimento passada | 1. Localizar fatura com status "Vencida" 2. Clicar em "Baixar boleto" | Nova aba abre com URL assinada do boleto; download iniciado | 🔴 Alta | UI | CT-FATUR-001 |
| CT-FATUR-004 | Download de recibo para fatura Liquidada | Conta com fatura no status "Liquidada" | 1. Localizar fatura com status "Liquidada" 2. Clicar em "Baixar recibo" | Nova aba abre com URL assinada do recibo; download iniciado | 🔴 Alta | UI | CT-FATUR-001 |
| CT-FATUR-005 | Download de Nota Fiscal em PDF | Conta com período que possui NF associada ⚠️ Bloqueável — verificar existência de NF no ambiente | 1. Localizar linha de NF dentro de um grupo 2. Clicar em "Baixar NF" | Nova aba abre com PDF da NF via URL assinada; download iniciado | 🟡 Média | UI | CT-FATUR-001 |
| CT-FATUR-006 | Filtro "Pendentes" exibe apenas Pendente e Vencida | Conta com faturas nos 3 status: Pendente, Vencida e Liquidada | 1. Clicar em filtro "Pendentes" 2. Verificar linhas exibidas | Linhas "Liquidada" ocultadas; linhas "Pendente" e "Vencida" visíveis; grupos sem linhas correspondentes ficam ocultos; lista atualizada sem reload de página | 🔴 Alta | UI | CT-FATUR-001 |
| CT-FATUR-007 | Filtro "Pagas" exibe apenas Liquidadas | Conta com faturas nos 3 status | 1. Clicar em filtro "Pagas" 2. Verificar linhas exibidas | Apenas linhas "Liquidada" visíveis; "Pendente" e "Vencida" ocultadas; grupos sem linhas correspondentes ficam ocultos; sem reload | 🟡 Média | UI | CT-FATUR-001 |
| CT-FATUR-008 | NF permanece visível independente do filtro ativo | Conta com período que possui NF e faturas em múltiplos status | 1. Verificar linha de NF com filtro "Todas" 2. Aplicar filtro "Pendentes" — verificar NF 3. Aplicar filtro "Pagas" — verificar NF | Linha de NF visível nos 3 filtros (Todas, Pendentes, Pagas); filtro não afeta linhas de nota fiscal; NF permanece no grupo do período ao qual pertence | 🔴 Alta | UI | CT-FATUR-005 |
| CT-FATUR-009 | Colapsar e expandir grupo pelo cabeçalho | Seção carregada com grupos visíveis | 1. Clicar no cabeçalho de um grupo colapsado 2. Verificar expansão 3. Clicar novamente | Grupo expande ao clicar; chevron muda de ▶ para ▼; clicar novamente colapsa; chevron retorna a ▶; sem reload | 🟡 Média | UI | CT-FATUR-001 |
| CT-FATUR-010 | Falha na API exibe banner com "Tentar novamente" | Integração Super Lógica retornando erro (5xx ou timeout) | 1. Acessar seção Faturas com API indisponível | Skeleton desaparece; banner inline exibido: "Não foi possível carregar seus dados financeiros. Tente novamente."; botão "Tentar novamente" visível; nenhum dado parcial exibido | 🔴 Alta | UI | — |
| CT-FATUR-011 | "Tentar novamente" re-executa fetch sem reload de página | Banner de erro visível | 1. Clicar em "Tentar novamente" | Fetch re-executado; skeleton exibido durante re-tentativa; página não recarregada (sem full reload); se API responder com sucesso, dados carregados normalmente | 🟡 Média | UI | CT-FATUR-010 |
| CT-FATUR-012 | Botão "Baixar boleto" ausente para fatura Liquidada | Conta com fatura "Liquidada" | 1. Localizar fatura Liquidada 2. Verificar botões de ação disponíveis | Botão "Baixar boleto" NÃO exibido; apenas botão "Baixar recibo" visível e ativo | 🔴 Alta | UI | CT-FATUR-001 |
| CT-FATUR-013 | Botão "Baixar recibo" ausente para Pendente e Vencida | Conta com faturas "Pendente" e "Vencida" | Para cada status: 1. Localizar fatura 2. Verificar botões de ação | Botão "Baixar recibo" NÃO exibido para "Pendente"; NÃO exibido para "Vencida"; apenas "Baixar boleto" disponível nos dois casos | 🔴 Alta | UI | CT-FATUR-001 |
| CT-FATUR-014 | Empty state "Pendentes" quando nenhuma fatura pendente | Conta com apenas faturas Liquidadas | 1. Clicar em filtro "Pendentes" | Empty state exibido: "Você está em dia. Nenhuma fatura pendente ou vencida."; nenhuma linha de fatura exibida | 🟡 Média | UI | CT-FATUR-001 |
| CT-FATUR-015 | Empty state "Pagas" quando nenhuma fatura liquidada | Conta com apenas faturas Pendentes/Vencidas | 1. Clicar em filtro "Pagas" | Empty state exibido: "Nenhuma fatura paga encontrada."; nenhuma linha de fatura exibida | 🟡 Média | UI | CT-FATUR-001 |
| CT-FATUR-016 | Linha de NF omitida quando período não tem NF | Conta com pelo menos 1 período sem NF associada | 1. Expandir grupo de mês sem NF 2. Verificar ausência da linha de NF | Linha de NF não exibida dentro do grupo; apenas linhas de faturas do período; sem placeholder "sem NF" | 🟡 Média | UI | CT-FATUR-001 |
| CT-FATUR-017 | Estado de expansão persiste ao trocar filtro | Grupo expandido manualmente; filtro "Todas" ativo | 1. Expandir manualmente um grupo colapsado 2. Aplicar filtro "Pendentes" 3. Verificar estado do grupo 4. Aplicar filtro "Pagas" 5. Verificar estado | Grupo expandido manualmente permanece expandido ao trocar filtro; estado de expansão não resetado pela mudança de filtro | 🟡 Média | UI | CT-FATUR-006 |
| CT-FATUR-018 | Fatura "Vencida" incluída no filtro "Pendentes" | Conta com fatura com vencimento < hoje e status ≠ "Liquidada" ⚠️ Bloqueável — criar fatura com data passada | 1. Verificar fatura vencida no filtro "Todas" com badge "Vencida" 2. Aplicar filtro "Pendentes" 3. Verificar se fatura vencida ainda aparece | Fatura "Vencida" visível no filtro "Pendentes"; botão "Baixar boleto" disponível para ela; fatura "Liquidada" não aparece | 🔴 Alta | UI | CT-FATUR-006 |
| CT-FATUR-019 | Grupos sem correspondência ao filtro ficam ocultos | Conta com grupos com apenas Liquidadas e grupos com Pendentes | 1. Aplicar filtro "Pendentes" 2. Verificar grupos com apenas Liquidadas | Grupos que só possuem faturas Liquidadas ficam inteiramente ocultos; apenas grupos com ≥ 1 linha Pendente ou Vencida permanecem | 🟡 Média | UI | CT-FATUR-006 |
| CT-FATUR-020 | Timeout integração Super Lógica exibe fallback amigável | Integração demorando > 10s ⚠️ Bloqueável — simular via proxy/mock | 1. Acessar seção Faturas com latência > 10s na API | Após 10 segundos: skeleton desaparece; banner de erro amigável exibido com retry; nenhuma mensagem técnica ou stack trace exposta | 🟡 Média | UI | — |
| CT-FATUR-021 | Ausência de iframe Super Lógica no frontend | Usuário Gestor na seção | 1. Abrir DevTools > Elements 2. Buscar elemento `<iframe>` 3. Verificar requisições de rede para domínio superlogica | Nenhum `<iframe>` referente à Super Lógica no DOM; nenhuma requisição direta ao domínio Super Lógica iniciada pelo frontend; dados via API Poli exclusivamente | 🔴 Alta | UI | CT-FATUR-001 |
| CT-FATUR-022 | Acesso restrito a Gestores | Usuário logado como Operador | 1. Tentar navegar para Faturas via UI 2. Tentar GET /api/v1/invoices com token de Operador | UI: seção não acessível; API: HTTP 403 Forbidden para token sem permissão de Gestor | 🔴 Alta | UI | — |
| CT-FATUR-023 | Download sem credenciais Super Lógica | Usuário Gestor sem conta no portal Super Lógica | 1. Acessar seção Faturas 2. Baixar boleto de fatura Pendente | Download realizado com sucesso sem solicitar login ou credenciais externas; dados consumidos transparentemente via backend Poli | 🔴 Alta | UI | CT-FATUR-002 |
| CT-FATUR-024 | Cada clique gera nova URL assinada independente | Fatura Pendente disponível | 1. Clicar em "Baixar boleto" — anotar URL da nova aba 2. Fechar aba 3. Clicar novamente em "Baixar boleto" | Segunda URL gerada é diferente da primeira (novo token de assinatura); ambas funcionam para download | 🟡 Média | UI | CT-FATUR-002 |

---

## BLOCO 4 — Cenários Gherkin (BDD)

### CT-FATUR-008 — NF permanece visível independente do filtro

```gherkin
Cenário: Linha de nota fiscal não é afetada pelo filtro de status de faturas
  Dado que o usuário está logado como Gestor
  E a seção Faturas e Notas Fiscais está carregada
  E existe um período com NF associada e faturas nos status Pendente e Liquidada
  Quando o usuário aplica o filtro "Pendentes"
  Então a linha de Nota Fiscal do período permanece visível
  E linhas de faturas Liquidadas são ocultadas
  Quando o usuário aplica o filtro "Pagas"
  Então a linha de Nota Fiscal do período ainda permanece visível
  E linhas de faturas Pendentes são ocultadas
```

### CT-FATUR-018 — Fatura "Vencida" incluída no filtro "Pendentes"

```gherkin
Cenário: Fatura com vencimento passado aparece no filtro de pendentes
  Dado que o usuário está logado como Gestor
  E existe uma fatura com data de vencimento anterior a hoje e status diferente de "Liquidada"
  E essa fatura exibe badge "Vencida" no filtro "Todas"
  Quando o usuário aplica o filtro "Pendentes"
  Então a fatura com status "Vencida" permanece visível na lista
  E o botão "Baixar boleto" está disponível para essa fatura
  E faturas com status "Liquidada" não são exibidas
```

---

**Resumo:** 24 cenários — 🔴 12 Alta | 🟡 12 Média | 🟢 0 Baixa
