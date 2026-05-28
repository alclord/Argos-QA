# Cenários de Teste — DEV4-4256
> Card: Dados do Plano (Nova Interface)
> Gerado em: 2026-05-28
> Card atualizado em: 2026-05-27T13:19:41.339-0300

---

## BLOCO 1 — Estratégia de Teste

A feature migra a aba "Dados do Plano" do legado para a nova interface (foundation-spa), introduzindo tabela de recursos contratados, quatro ações principais (Aumentar plano, Reduzir/Cancelar, Adquirir canais, Adquirir usuários) e o modal "Gerenciar adicionais" com remoção individual. Os tipos de teste aplicáveis são: UI funcional (fluxos de modal e redirecionamento), controle de acesso (apenas Gestor acessa), API (remoção de adicional, log de auditoria, bloqueio de remoção), borda (limites de usuários ativos) e segurança (escalada de privilégio, manipulação direta de endpoint). Prioridade de execução: 1º controle de acesso, 2º fluxo de remoção de adicional (com bloqueio, erro e sucesso), 3º redirecionamentos WhatsApp, 4º tabela/skeleton, 5º internacionalização. Riscos principais: remoção de adicional sem confirmação, abertura de nova aba bloqueada por pop-up blocker, botão "Solicitar upgrade" habilitado sem seleção e ausência de log de auditoria após remoção.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade | Impacto | Prioridade |
|-------|:---:|:---:|:---:|
| Botão "Solicitar upgrade" habilitado sem seleção de plano | M | A | 🔴 Alta |
| Remoção de adicional sem exibir confirmação (pula tela) | B | A | 🔴 Alta |
| Log de auditoria não registrado após remoção bem-sucedida | M | A | 🔴 Alta |
| Adicional com canal ativo não bloqueia botão "Remover" | M | A | 🔴 Alta |
| Adicional de usuários acima do limite não bloqueia remoção | M | A | 🔴 Alta |
| Tabela não atualiza coluna "Adicionais" após remoção sem reload | M | M | 🟡 Média |
| Redirecionamento WhatsApp sem mensagem pré-preenchida | M | M | 🟡 Média |
| Usuário não-Gestor consegue acessar Configurações > Dados do Plano | B | A | 🔴 Alta |
| Pop-up blocker impede abertura do WhatsApp em nova aba | A | M | 🟡 Média |
| Modal "Gerenciar adicionais" fecha ao clicar "Voltar" sem executar remoção | B | M | 🟡 Média |
| Skeleton não exibido durante fetch da tabela | M | B | 🟢 Baixa |
| Textos não traduzidos em EN/ES | M | B | 🟢 Baixa |
| Erro de remoção fecha o modal indevidamente | B | M | 🟡 Média |

---

## BLOCO 3 — Tabela de Cenários

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|----|----------------|----------------|---------------|-------------------|:-----------:|:----:|-----------|
| CT-PLANO-001 | Tabela carrega com skeleton e exibe dados do plano | Usuário autenticado como Gestor; account com plano base + adicionais configurados | 1. Acessar Configurações > Dados do plano | Skeleton exibido durante fetch; tabela renderizada com colunas Recurso / Plano base / Adicionais / Total; linhas para WhatsApp, WABA, Facebook Messenger, Instagram, WebChat, Usuários; ícones de canal corretos | 🔴 Alta | UI | — |
| CT-PLANO-002 | Fluxo completo de upgrade: selecionar plano e redirecionar para WhatsApp | Usuário autenticado como Gestor; modal de upgrade disponível com planos do site embedados | 1. Clicar em "Aumentar meu plano" 2. Verificar que botão "Solicitar upgrade" está desabilitado 3. Selecionar um plano no modal 4. Verificar que botão "Solicitar upgrade" está habilitado 5. Clicar em "Solicitar upgrade" | Modal abre com planos disponíveis; botão "Solicitar upgrade" desabilitado antes da seleção; após seleção botão habilita; clicar redireciona para `https://wa.me/[número]?text=Olá!+Gostaria+de+fazer+upgrade+para+o+[plano+selecionado].` em nova aba; evento `plan_upgrade_whatsapp_redirected` disparado | 🔴 Alta | UI | CT-PLANO-001 |
| CT-PLANO-003 | Fluxo completo de remoção de adicional: sucesso | ⚠️ Bloqueável: account com pelo menos um adicional removível (sem canal ativo e sem exceder limite de usuários) | 1. Clicar em "Gerenciar adicionais" 2. Verificar listagem com botões "Remover" 3. Clicar em "Remover" em um adicional elegível 4. Verificar tela de confirmação inline (breadcrumb + destaque do item + aviso de impacto) 5. Clicar em "Confirmar remoção" | Modal exibe listagem; ao clicar "Remover" modal muda para tela de confirmação sem abrir segundo modal; breadcrumb visível; clicar "Confirmar remoção" executa remoção via API; modal retorna à listagem atualizada + banner de sucesso no topo; coluna "Adicionais" da tabela atualiza sem reload da página; log de auditoria registrado via API | 🔴 Alta | UI | CT-PLANO-001 |
| CT-PLANO-004 | Acesso negado para usuário não-Gestor | Usuário autenticado com role `agent` (atendente) | 1. Tentar acessar Configurações > Dados do plano diretamente via URL | Item "Dados do plano" não visível no menu de Configurações; acesso direto via URL retorna tela de erro de permissão ou redireciona; nenhuma informação de plano exposta | 🔴 Alta | UI | — |
| CT-PLANO-005 | Botão "Solicitar upgrade" permanece desabilitado sem seleção de plano | Usuário autenticado como Gestor | 1. Clicar em "Aumentar meu plano" 2. NÃO selecionar nenhum plano 3. Tentar clicar em "Solicitar upgrade" | Botão "Solicitar upgrade" permanece desabilitado (não clicável); nenhum redirecionamento ocorre; nenhuma requisição disparada | 🔴 Alta | UI | CT-PLANO-001 |
| CT-PLANO-006 | Adicional com canal ativo: botão "Remover" desabilitado + aviso inline | ⚠️ Bloqueável: account com adicional de canal cujo canal está com status ativo na plataforma | 1. Clicar em "Gerenciar adicionais" 2. Localizar adicional com canal ativo | Botão "Remover" do adicional bloqueado está desabilitado; aviso explicativo exibido inline ("Este canal está em uso e não pode ser removido agora."); botões de adicionais elegíveis permanecem habilitados | 🔴 Alta | UI | CT-PLANO-001 |
| CT-PLANO-007 | Adicional de usuários bloqueado quando ativos excedem limite pós-remoção | ⚠️ Bloqueável: account com usuários_ativos > (plano_base.usuarios + adicional.quantidade - quantidade_remover) | 1. Clicar em "Gerenciar adicionais" 2. Localizar adicional de usuários que, se removido, deixaria ativos acima do limite | Botão "Remover" do adicional de usuários bloqueado está desabilitado; aviso inline exibido ("Existem usuários ativos que excedem o limite resultante.") | 🔴 Alta | UI | CT-PLANO-001 |
| CT-PLANO-008 | Erro na remoção de adicional: modal não fecha + banner de erro + botão "Tentar novamente" | ⚠️ Bloqueável: ambiente com capacidade de simular falha na API de remoção (ex: mock de 500) | 1. Clicar em "Gerenciar adicionais" 2. Clicar em "Remover" em adicional elegível 3. Clicar em "Confirmar remoção" 4. API retorna erro (500 ou 422) | Modal permanece aberto na tela de confirmação; banner de erro exibido com mensagem "Não foi possível remover o adicional. Tente novamente."; botão "Tentar novamente" visível e funcional; coluna "Adicionais" da tabela não alterada; log de auditoria NÃO registrado | 🔴 Alta | UI | CT-PLANO-003 |
| CT-PLANO-009 | "Voltar" na confirmação de remoção retorna à listagem sem ação | Usuário autenticado como Gestor; modal "Gerenciar adicionais" aberto | 1. Clicar em "Gerenciar adicionais" 2. Clicar em "Remover" em adicional elegível 3. Na tela de confirmação, clicar em "Voltar" | Modal retorna à listagem de adicionais; nenhuma remoção executada; nenhuma requisição de remoção disparada; dados da tabela inalterados | 🟡 Média | UI | CT-PLANO-003 |
| CT-PLANO-010 | Fluxo "Reduzir / Cancelar Plano" abre modal de confirmação e redireciona WhatsApp | Usuário autenticado como Gestor | 1. Clicar em "Reduzir / Cancelar Plano" 2. Verificar modal de confirmação com aviso de perda de recursos 3. Verificar que "Enviar solicitação" está desabilitado sem seleção/preenchimento 4. Preencher campos obrigatórios 5. Clicar em "Enviar solicitação" | Modal de confirmação abre com aviso claro de perda de recursos; botão "Enviar solicitação" desabilitado antes do preenchimento; após preenchimento habilita; clicar redireciona para WhatsApp em nova aba com mensagem resumindo a solicitação | 🟡 Média | UI | CT-PLANO-001 |
| CT-PLANO-011 | "Adquirir canais" redireciona para /channels sem modal | Usuário autenticado como Gestor | 1. Clicar em "Adquirir canais" | Usuário redirecionado para `/channels` da plataforma; nenhum modal intermediário exibido; evento `plan_acquire_channels_clicked` disparado | 🟡 Média | UI | CT-PLANO-001 |
| CT-PLANO-012 | "Adquirir usuários" redireciona para /users sem modal | Usuário autenticado como Gestor | 1. Clicar em "Adquirir usuários" | Usuário redirecionado para `/users` da plataforma; nenhum modal intermediário exibido; evento `plan_acquire_users_clicked` disparado | 🟡 Média | UI | CT-PLANO-001 |
| CT-PLANO-013 | Log de auditoria registrado após remoção bem-sucedida | ⚠️ Bloqueável: acesso a logs de auditoria ou endpoint de verificação do log | 1. Executar fluxo de remoção de adicional com sucesso (CT-PLANO-003) 2. Consultar log de auditoria via API ou banco | Log registrado contendo: `usuario_id`, `adicional_tipo`, `quantidade`, `data`, `conta_id` | 🔴 Alta | API | CT-PLANO-003 |
| CT-PLANO-014 | Tentativa de remoção de adicional por usuário não-Gestor via API | Usuário autenticado com role `agent` | 1. Disparar requisição de remoção de adicional via API (DELETE/POST no endpoint de remoção) autenticado como `agent` | API retorna 403 Forbidden; nenhuma remoção executada; nenhum log de auditoria registrado | 🔴 Alta | API | — |
| CT-PLANO-015 | Tabela exibe estado de erro com opção de retry ao falhar o fetch | ⚠️ Bloqueável: ambiente com capacidade de simular falha na API de dados do plano | 1. Acessar Configurações > Dados do plano com API de dados retornando erro (503) | Skeleton exibido durante tentativa; componente de erro exibido após falha; botão de retry disponível | 🟢 Baixa | UI | — |
| CT-PLANO-016 | Interface exibe textos corretos em inglês (EN) | Usuário autenticado como Gestor com idioma configurado para EN | 1. Acessar Configurações > Dados do plano com interface em inglês | Todos os textos exibidos em inglês conforme tabela de traduções: "Plan details", "Base plan", "Add-ons", "Total", "Upgrade my plan", "Manage add-ons", "Remove", etc. | 🟢 Baixa | UI | CT-PLANO-001 |
| CT-PLANO-017 | Coluna "Adicionais" atualiza sem reload após remoção bem-sucedida | ⚠️ Bloqueável: account com adicional removível | 1. Anotar valor da coluna "Adicionais" de um recurso 2. Realizar remoção bem-sucedida (CT-PLANO-003) 3. Verificar coluna "Adicionais" sem recarregar a página | Valor da coluna "Adicionais" e "Total" atualizados imediatamente após remoção; sem reload de página | 🔴 Alta | UI | CT-PLANO-003 |

---

## BLOCO 4 — Gherkin (BDD)

### Cenário 1 — CT-PLANO-003: Remoção bem-sucedida de adicional

```gherkin
# language: pt

Funcionalidade: Gerenciar adicionais do plano
  Como Gestor
  Quero remover adicionais que não preciso mais
  Para reduzir custos diretamente na plataforma

  Contexto:
    Dado que estou autenticado como Gestor
    E acesso "Configurações > Dados do plano"
    E a tabela de recursos é exibida com skeleton e depois com dados

  Cenário: Remoção bem-sucedida de adicional elegível
    Quando clico em "Gerenciar adicionais"
    Então um modal é aberto com a listagem de adicionais
    E cada adicional elegível exibe o botão "Remover" habilitado
    Quando clico em "Remover" no adicional "WhatsApp adicional"
    Então o modal exibe a tela de confirmação inline
    E um breadcrumb é exibido indicando o passo atual
    E o item selecionado está destacado com aviso de impacto
    E o botão "Confirmar remoção" está visível
    Quando clico em "Confirmar remoção"
    Então a API de remoção é chamada com os dados corretos
    E o modal retorna à listagem de adicionais atualizada
    E um banner de sucesso "Adicional removido com sucesso!" é exibido no topo
    E a coluna "Adicionais" da tabela principal é atualizada sem recarregar a página
    E um log de auditoria é registrado com usuario_id, adicional_tipo, quantidade, data e conta_id
```

### Cenário 2 — CT-PLANO-004 / CT-PLANO-014: Controle de acesso — não-Gestor

```gherkin
# language: pt

Funcionalidade: Controle de acesso à seção Dados do Plano
  Como plataforma
  Quero garantir que apenas Gestores acessem Dados do Plano
  Para proteger informações e ações críticas de plano

  Cenário: Atendente não visualiza "Dados do plano" no menu
    Dado que estou autenticado como Atendente (role agent)
    Quando acesso o menu "Configurações"
    Então o item "Dados do plano" não está visível no menu

  Cenário: Atendente não consegue acessar a página via URL direta
    Dado que estou autenticado como Atendente (role agent)
    Quando acesso diretamente a URL de "Dados do plano"
    Então sou redirecionado ou recebo tela de erro de permissão
    E nenhuma informação de plano é exibida

  Cenário: Atendente não consegue remover adicional via API
    Dado que estou autenticado como Atendente (role agent)
    Quando envio uma requisição de remoção de adicional diretamente pela API
    Então a API retorna status 403 Forbidden
    E nenhuma remoção é executada
    E nenhum log de auditoria é registrado
```

---

## Validação por Agente Crítico Independente

- Aprovados sem alteração: 12
- Revisados: 3 (CT-PLANO-002, CT-PLANO-010, CT-PLANO-013)
- Adicionados por cobertura insuficiente: 2 (CT-PLANO-016, CT-PLANO-017)
