# Cenários de Teste — DEV4-4254
> Card: Remoção de feature flags liberadas para todos os usuários
> Gerado em: 2026-05-27
> Card atualizado em: 2026-05-27T12:52:24 -0300

---

## Resumo do Card

- **Tipo:** História
- **Prioridade:** Medium
- **Status:** Aguardando Handoff
- **Objetivo:** Quatro feature flags (`language_selector`, `tab_campaign`, `pinned_chats_list`, `forward_multiples_contacts`) já estão 100% liberadas para todos os usuários. O objetivo é removê-las do código-fonte e do painel do Flagsmith, mantendo o comportamento atual como padrão sem nenhuma mudança visível ao usuário final.

---

## BLOCO 1 — Estratégia de Teste

O escopo cobre a validação de que as 4 features anteriormente protegidas pelas flags continuam funcionando como comportamento padrão após remoção do código e do Flagsmith. Tipos de teste aplicáveis: **regressão funcional** (as 4 features), **estática de código** (zero referências às flags em produção), **observabilidade** (zero erros no Sentry e no console), **borda** (cache de sessão e estado vazio) e **segurança** (RBAC não delegado à flag). Prioridade de execução: iniciar pelos 4 cenários de regressão de UI (CT-FLAG-001 a CT-FLAG-004) — uma quebra neles bloqueia toda a suite. O risco principal é a remoção da flag no Flagsmith antes do código estar deployado, o que pode desabilitar as features para todos os usuários.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Flag removida do Flagsmith antes do código deployado → feature desaparece para todos | M | A | 🔴 Alta |
| Uma das 4 features quebra silenciosamente após remoção (sem erro visível) | B | A | 🔴 Alta |
| Flag consumida por backend ou mobile não mapeada → remoção do Flagsmith quebra outro serviço | B | A | 🟡 Média |
| Testes que mockavam as flags passam a falhar e bloqueiam a pipeline de CI | M | M | 🟡 Média |
| Chamadas residuais ao Flagsmith permanecem em código não identificado pelo PR | M | B | 🟢 Baixa |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-FLAG-001 | Seletor de idiomas funciona após remoção | User autenticado na SPA; build com a flag `language_selector` removida deployada em staging | 1. Acessar a SPA de staging. 2. Localizar o seletor de idiomas na interface. 3. Selecionar um idioma diferente do atual. 4. Verificar se a interface muda para o idioma selecionado. | Interface muda para o idioma selecionado corretamente. Sem erro ou ausência do componente de seleção. | 🔴 Alta | UI | — |
| CT-FLAG-002 | Aba de campanhas acessível após remoção | User autenticado na SPA; build com a flag `tab_campaign` removida — nota: se a aba requer permissão específica de role, usar o role com menor acesso que deveria vê-la | 1. Acessar a SPA de staging. 2. Localizar a aba de campanhas na navegação. 3. Clicar na aba. 4. Verificar se o conteúdo carrega. | Aba de campanhas visível na navegação e conteúdo carregado sem erros ou tela em branco. | 🔴 Alta | UI | — |
| CT-FLAG-003 | Chats fixados exibidos corretamente após remoção | User autenticado na SPA; ao menos 1 chat fixado na conta de teste ⚠️ Bloqueável — fixar um chat manualmente na SPA antes da execução | 1. Acessar a SPA de staging. 2. Ir para a lista de chats. 3. Verificar se o(s) chat(s) fixado(s) aparecem na seção de fixados. | Chats fixados exibidos na posição correta. Seção de fixados visível sem erros. | 🔴 Alta | UI | — |
| CT-FLAG-004 | Encaminhamento de múltiplos contatos funcional | User autenticado na SPA; ao menos 2 contatos existentes na conta; chat ativo | 1. Abrir um chat ativo na SPA. 2. Acionar a opção de encaminhar para múltiplos contatos. 3. Selecionar 2 ou mais contatos. 4. Confirmar o encaminhamento. | Mensagem encaminhada com sucesso para todos os contatos selecionados. Sem erro na operação. | 🔴 Alta | UI | — |
| CT-FLAG-005 | SPA não consulta as 4 flags no Flagsmith | User autenticado na SPA; DevTools aberto na aba Network; build com flags removidas — rastreável à RN-2 (remoção do código antes do Flagsmith) | 1. Abrir a SPA e logar. 2. Filtrar requests no DevTools pelo domínio do Flagsmith. 3. Navegar pelas telas de chats, campanhas e contatos. 4. Verificar se alguma request avalia as 4 flags. 5. Verificar que outras flags ainda estão sendo avaliadas normalmente (confirma que o SDK Flagsmith continua operacional — ausência intencional, não falha de conectividade). | Nenhuma request ao Flagsmith avalia `language_selector`, `tab_campaign`, `pinned_chats_list` ou `forward_multiples_contacts`. O SDK continua avaliando outras flags ativas da conta. | 🟡 Média | UI | CT-FLAG-001 |
| CT-FLAG-006 | Arquivos de produção sem referências às 4 flags | Acesso ao repositório com o PR mergeado; ferramenta de busca global (grep, IDE ou GitHub search) — escopo: apenas arquivos de produção (src/, app/, lib/), excluindo test/, spec/ e mock/ | 1. Fazer busca global por `language_selector` nos arquivos de produção do repositório. 2. Repetir para `tab_campaign`. 3. Repetir para `pinned_chats_list`. 4. Repetir para `forward_multiples_contacts`. | Zero resultados para cada uma das 4 buscas em arquivos de produção. | 🟡 Média | API | — |
| CT-FLAG-007 | Nenhum erro "flag not found" no Sentry após deploy | Build deployada em staging; acesso ao Sentry ou ferramenta de logs de erro | 1. Após o deploy em staging, monitorar os logs de erro no Sentry por ao menos 10 minutos com navegação ativa na SPA. 2. Filtrar por erros contendo "flag", "language_selector", "tab_campaign", "pinned_chats_list" ou "forward_multiples_contacts". | Nenhum log de erro do tipo "flag not found" ou similar gerado durante o período de monitoramento. | 🟡 Média | API | CT-FLAG-001 |
| CT-FLAG-008 | CI passa sem mocks das 4 flags em arquivos de teste | Acesso ao repositório e à pipeline de CI após o PR | 1. Verificar o resultado da pipeline de CI para o PR. 2. Confirmar que não há mocks das 4 flags nos arquivos de teste (busca global por `language_selector`, `tab_campaign`, `pinned_chats_list`, `forward_multiples_contacts` em diretórios test/, spec/ e mock/). | Todos os testes passam na pipeline. Nenhum arquivo de teste contém mock das 4 flags. | 🟡 Média | API | CT-FLAG-006 |
| CT-FLAG-009 | Flags ausentes no painel do Flagsmith | Acesso ao painel do Flagsmith; CT-FLAG-001 a CT-FLAG-004 já executados e aprovados — nota: o critério de aceite do card exige validação em produção antes da exclusão; este cenário deve ser executado após validação em produção, não apenas em staging | 1. Acessar o painel do Flagsmith. 2. Buscar por `language_selector`. 3. Repetir para as outras 3 flags. | Nenhuma das 4 flags aparece listada no painel do Flagsmith. | 🟡 Média | UI | CT-FLAG-001 |
| CT-FLAG-010 | Remoção da flag não elimina controle de acesso | User autenticado com role `agent` na SPA; build com flags removidas | 1. Logar na SPA com um user de role `agent`. 2. Tentar acessar diretamente a URL da aba de campanhas. 3. Verificar a resposta da SPA e do backend para o acesso. | Se a aba de campanhas é restrita por permissão de role (não apenas por flag), o backend retorna 403 ou a SPA não exibe a aba para esse role. Confirma que a flag não era a única barreira de controle de acesso. | 🟡 Média | UI | CT-FLAG-002 |
| CT-FLAG-011 | Console sem erros JavaScript após remoção das flags | User autenticado na SPA; DevTools aberto na aba Console; build com flags removidas | 1. Abrir a SPA com DevTools → Console aberto. 2. Navegar pelas telas de chats, campanhas e contatos. 3. Realizar as ações das 4 features (trocar idioma, fixar chat, encaminhar contato). 4. Monitorar o console por erros. | Nenhum erro JavaScript do tipo "undefined", "cannot read property" ou "flag not found" causado pela remoção das flags. | 🟡 Média | UI | CT-FLAG-001 |
| CT-FLAG-012 | Features funcionam em sessão ativa antes do deploy | User com sessão ativa na SPA no momento do deploy (sem logout); build com flags removidas deployada enquanto a sessão está ativa | 1. Manter sessão ativa na SPA antes do deploy. 2. Após o deploy ser concluído em staging, sem fazer logout, acessar as telas de chats, campanhas e contatos. 3. Verificar o comportamento das 4 features. | As 4 features funcionam normalmente para o usuário com sessão pré-deploy. Sem crash, mensagem de erro ou rollback para comportamento antigo. | 🟡 Média | UI | CT-FLAG-001 |
| CT-FLAG-013 | Lista de chats fixados vazia não quebra a UI | User autenticado em conta sem nenhum chat fixado | 1. Acessar a SPA com uma conta sem chats fixados. 2. Ir para a lista de chats. 3. Verificar a área onde os chats fixados seriam exibidos. | A seção de chats fixados não exibe conteúdo (está oculta ou vazia) sem gerar erro, tela em branco ou crash. | 🟢 Baixa | UI | — |

**Resumo:** 13 cenários — 🔴 4 Alta | 🟡 8 Média | 🟢 1 Baixa

---

## BLOCO 4 — Cenários Gherkin (BDD)

Os dois cenários 🔴 Alta mais diretamente relacionados à feature principal:

```gherkin
Cenário: Seletor de idiomas funciona após remoção da flag language_selector
  Dado que o usuário está autenticado na SPA de staging
  E que a build com a flag "language_selector" removida está deployada
  Quando o usuário localiza o seletor de idiomas e seleciona um idioma diferente do atual
  Então a interface deve mudar para o idioma selecionado
  E nenhum erro deve ser exibido na tela ou no console
```

```gherkin
Cenário: Chats fixados exibidos corretamente após remoção da flag pinned_chats_list
  Dado que o usuário está autenticado na SPA de staging
  E que a build com a flag "pinned_chats_list" removida está deployada
  E que existe ao menos 1 chat fixado na conta de teste
  Quando o usuário acessa a lista de chats
  Então o(s) chat(s) fixado(s) devem ser exibidos na seção de fixados
  E a seção de fixados deve estar visível sem erros ou tela em branco
```

---

## Validação por Agente Crítico Independente

- Aprovados sem alteração: 4 (CT-FLAG-001, CT-FLAG-003, CT-FLAG-004, CT-FLAG-007)
- Revisados: 6 (CT-FLAG-002, CT-FLAG-005, CT-FLAG-006, CT-FLAG-008, CT-FLAG-009, CT-FLAG-010)
- Adicionados por cobertura insuficiente: 3 (CT-FLAG-011, CT-FLAG-012, CT-FLAG-013)
