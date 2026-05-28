# Cenários de Teste — DEV4-4253
> Card: Busca de templates com atalho de teclado excede limite do per_page
> Gerado em: 2026-05-27
> Card atualizado em: 2026-05-27T12:42:02 -0300

---

## Resumo do Card

- **Tipo:** Bug
- **Prioridade:** Medium
- **Status:** Aguardando Handoff
- **Objetivo:** A tela de chats dispara `GET /templates` com `per_page=9999` para carregar templates com atalho de teclado (`keyboard_shortcut=NOT_EMPTY`). O backend rejeita a request pois o limite aceito é 999, tornando os atalhos completamente inoperantes para todos os atendentes, supervisores e gestores.

---

## BLOCO 1 — Estratégia de Teste

O escopo cobre a correção de um bug na SPA que enviava `per_page=9999` para `GET /templates?keyboard_shortcut=NOT_EMPTY`, excedendo o limite de 999 aceito pelo backend. Tipos de teste aplicáveis: **funcional** (verificar que o fix corrige o valor e que os atalhos voltam a funcionar), **regressão** (backend ainda rejeita valores inválidos), **tratamento de erro** (falha silenciosa na UI) e **segurança** (autenticação). Prioridade de execução: CT-TMPL-001 e CT-TMPL-002 primeiro (validação direta do fix), depois CT-TMPL-003 (sintoma resolvido end-to-end), por último edge cases e segurança. Riscos principais: fix sem paginação para contas com 1000+ templates, e regressão em outros includes da mesma request.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Fix corrige `per_page` mas não implementa paginação → contas com 1000+ templates continuam com atalhos incompletos | M | A | 🔴 Alta |
| Correção causa regressão em outros filtros ou `includes` da mesma request de templates | B | A | 🟡 Média |
| Múltiplas requests paginadas com race condition → templates duplicados ou ausentes no estado da SPA | B | M | 🟡 Média |
| Error handling não emite log no console → erros reais silenciados em produção | M | M | 🟡 Média |
| Template acionado por atalho envia versão desatualizada (cache stale após paginação) | B | M | 🟢 Baixa |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-TMPL-001 | GET templates com per_page=999 aceito | Token JWT válido de user autenticado em staging | 1. Fazer `GET /templates?include=key,version,status,message,variables,team,metadata&page=1&per_page=999&order=tag&keyboard_shortcut=NOT_EMPTY` com `Authorization: Bearer <token>` | HTTP 200 com `data: [...]` e `meta.per_page: 999` | 🔴 Alta | API | — |
| CT-TMPL-002 | SPA não envia per_page=9999 na tela de chat | User autenticado na SPA de staging; DevTools aberto na aba Network | 1. Logar na SPA como atendente. 2. Abrir a tela de chats. 3. Filtrar requests por "templates" no DevTools Network. | Nenhuma request ao endpoint `/templates` contém `per_page=9999`. A request que carrega atalhos usa `per_page ≤ 999`. | 🔴 Alta | UI | — |
| CT-TMPL-003 | Atalho de teclado insere template na conversa | User autenticado na SPA; ao menos 1 template com `keyboard_shortcut` configurado na conta de teste; chat ativo em estado `attending` | 1. Abrir um chat ativo na SPA. 2. No campo de digitação, pressionar o atalho de teclado configurado no template. 3. Verificar o conteúdo da caixa de texto. 4. Enviar a mensagem. | Texto do template inserido no campo de digitação. Mensagem enviada ao contato com sucesso. | 🔴 Alta | UI | CT-TMPL-002 |
| CT-TMPL-004 | Regressão — backend rejeita per_page=9999 com 422 | Token JWT válido | 1. Fazer `GET /templates?keyboard_shortcut=NOT_EMPTY&per_page=9999` com `Authorization: Bearer <token>` | HTTP 422 com body: `{"message": "O campo per_page não pode exceder 999.", "errors": {"per_page": ["O campo per_page não pode exceder 999."]}}` — valida que o contrato pré-existente do backend não foi removido pelo fix | 🟡 Média | API | — |
| CT-TMPL-005 | Falha na API de templates não quebra a UI | User autenticado na SPA; interceptação de rede configurada (DevTools → Block request URL ou Playwright `page.route`) para retornar HTTP 500 em `/templates?keyboard_shortcut=NOT_EMPTY` | 1. Configurar interceptação para retornar 500 na URL de templates com atalho. 2. Abrir a tela de chats. 3. Verificar console do browser e a interface. | Tela de chats carrega sem crash. Nenhuma mensagem de erro visível ao usuário. Console do browser exibe o erro da request logado. Atalhos de teclado ficam indisponíveis, mas sem quebra da UI. | 🔴 Alta | UI | — |
| CT-TMPL-006 | Templates sem atalho ausentes no filtro | Token JWT válido; ao menos 1 template ativo sem `keyboard_shortcut` na conta | 1. Fazer `GET /templates?keyboard_shortcut=NOT_EMPTY&per_page=999` com token válido. 2. Analisar os itens retornados em `data`. | Nenhum item em `data` possui `keyboard_shortcut` nulo ou vazio. Todos os templates retornados têm `keyboard_shortcut` preenchido. — extensão do CT-TMPL-001 que valida o contrato do filtro `NOT_EMPTY` | 🟡 Média | API | CT-TMPL-001 |
| CT-TMPL-007 | Ao menos 999 templates com atalho carregam em 1 request | Conta com ao menos 999 templates ativos com `keyboard_shortcut` configurado ⚠️ Bloqueável — criável via API: `POST /templates` — **atenção:** ambiente compartilhado pode ter templates adicionados por outros usuários durante o teste, tornando `meta.total` variável | 1. Fazer `GET /templates?keyboard_shortcut=NOT_EMPTY&per_page=999&page=1` com token da conta. 2. Verificar `meta.total` e `meta.last_page`. | HTTP 200. Se `meta.total ≤ 999`: `meta.last_page = 1` e todos os templates em `data`. Se `meta.total > 999`: aceitar que paginação foi necessária (cenário CT-TMPL-008 aplica-se). | 🟡 Média | API | CT-TMPL-001 |
| CT-TMPL-008 | 1000+ templates com atalho carregam via paginação | Conta com ao menos 1000 templates com `keyboard_shortcut` ⚠️ Bloqueável — criável via API: `POST /templates`; identificar previamente 1 template que só aparece após a 1ª página de resultados (ex: template com shortcut configurado como "T1000") | 1. Abrir a tela de chats na SPA com essa conta. 2. Observar requests para `/templates?keyboard_shortcut=NOT_EMPTY` no DevTools Network. 3. Aguardar carregamento completo. 4. Pressionar o atalho do template identificado como "T1000" (aquele que só estaria disponível após a segunda página). | Pelo menos 2 requests disparadas (page=1, page=2, …). Todos os templates ficam disponíveis após o carregamento. O atalho "T1000" insere o texto do template corretamente no campo de digitação. | 🟡 Média | UI | CT-TMPL-002 |
| CT-TMPL-009 | Request sem autenticação retorna 401 | Nenhum — cenário de segurança de regressão de autenticação; não possui rastreabilidade direta a critério de aceite do card, mas cobre cobertura mínima de segurança do endpoint | 1. Fazer `GET /templates?keyboard_shortcut=NOT_EMPTY&per_page=999` sem header de autorização. | HTTP 401 Unauthorized. | 🟡 Média | API | — |

**Resumo:** 9 cenários — 🔴 4 Alta | 🟡 5 Média | 🟢 0 Baixa

---

## BLOCO 4 — Cenários Gherkin (BDD)

Os dois cenários 🔴 Alta mais diretamente relacionados ao bug principal:

```gherkin
Cenário: GET /templates com per_page válido é aceito pelo backend
  Dado que o usuário possui um token JWT válido de staging
  E que a conta possui ao menos 1 template com keyboard_shortcut configurado
  Quando é feita uma requisição GET /templates com keyboard_shortcut=NOT_EMPTY e per_page=999
  Então a resposta deve ter status HTTP 200
  E o campo "meta.per_page" deve ser menor ou igual a 999
  E o corpo deve conter a lista de templates com atalho em "data"
```

```gherkin
Cenário: Atalho de teclado insere e envia template na conversa
  Dado que o usuário está autenticado na SPA de staging
  E que existe ao menos 1 template com keyboard_shortcut configurado na conta
  E que a tela de chats foi carregada sem erros de request de templates
  E que há um chat ativo em estado de atendimento
  Quando o usuário pressiona o atalho de teclado configurado no template
  Então o texto do template deve ser inserido no campo de digitação
  Quando o usuário envia a mensagem
  Então a mensagem deve ser entregue ao contato corretamente
```

---

## Validação por Agente Crítico Independente

- Aprovados sem alteração: 5 (CT-TMPL-001, CT-TMPL-002, CT-TMPL-003, CT-TMPL-005, CT-TMPL-009*)
- Revisados: 4 (CT-TMPL-004, CT-TMPL-006, CT-TMPL-007, CT-TMPL-008)
- Adicionados por cobertura insuficiente: 0
- *CT-TMPL-009: aprovado tecnicamente com ressalva de rastreabilidade documentada no cenário
