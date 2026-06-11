# Cenários de Teste — DEV4-4238
> Card: Adição de novo canal
> Gerado em: 2026-06-01
> Card atualizado em: 2026-05-29T18:28:43.147-0300

---

## PASSO 0.5 — Resumo do Card

- **Título:** Adição de novo canal
- **Tipo:** História
- **Prioridade:** Medium
- **Status:** Aguardando Cenários de Teste
- **Atualizado em:** 2026-05-29T18:28:43.147-0300
- **Épico pai:** DEV4-4191 — Canais
- **Objetivo:** Implementar o fluxo de criação e vinculação de canais (WhatsApp WABA, Instagram, Messenger, WebChat) via botão com dropdown que abre uma gaveta lateral (right sheet) guiada por etapas, substituindo o fluxo do Legado.
- **Escopo — O que está incluído:** Dropdown com 4 opções; right sheet com 3 passos para WhatsApp; trava no passo 2 (botão Próximo desabilitado até confirmação Meta); seletor de usuários com contador e "Limpar tudo" no passo 3; Instagram/Messenger com mesma estrutura (textos adaptados); WebChat com seletor de canais; modal de sucesso por 3 segundos.
- **Regras de Negócio identificadas:**
  1. RN1: Dropdown com 4 opções fixas (WhatsApp, Instagram, Messenger, WebChat)
  2. RN2: Passo 2 do WhatsApp — botão "Próximo" desabilitado até confirmação da API da Meta
  3. RN3: Passo 3 — contador numérico de usuários atualiza em tempo real; "Limpar tudo" reseta a lista
  4. RN4: Instagram e Messenger herdam estrutura do WhatsApp com títulos e alertas contextuais distintos
  5. RN5: Modal de sucesso permanece exatamente 3 segundos antes de fechar e redirecionar para listagem
- **Critérios de Aceite identificados:** A ser preenchido pelo time de QA (derivados das RNs e do layout)
- **Subtasks / dependências:** Nenhuma

> ❓ **Passo 2 — Falha ou timeout da API Meta:** O que acontece se a API da Meta não responder? Usuário fica bloqueado indefinidamente ou há feedback de erro?
> _Por que importa:_ Define se há cenário negativo de "falha de vinculação" no fluxo.

---

## BLOCO 1 — Estratégia de Teste

A feature implementa o fluxo de adição de canais via dropdown + right sheet guiado. Testes aplicáveis: **funcional** (fluxo completo de cada tipo de canal), **regressão** (componentes globais reutilizados — seletor de usuários, modal de sucesso), **UX** (trava no passo 2, contador em tempo real, timeout do modal) e **segurança** (acesso por perfil não-administrador). Execução prioritária: trava do passo 2 (RN2 — crítica) e modal de sucesso com 3s (RN5). Risco principal: botão "Próximo" não bloquear no passo 2 permitindo vinculação incompleta.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Botão "Próximo" não bloqueado no passo 2 sem confirmação Meta | M | A | Alta |
| Modal de sucesso fecha antes ou depois dos 3 segundos | M | M | Alta |
| WebChat não associa canais corretamente ao site | M | A | Alta |
| Dropdown não exibe as 4 opções esperadas | B | A | Média |
| Contador de usuários não atualiza em tempo real | M | M | Média |
| Instagram/Messenger exibe título incorreto no right sheet | B | M | Média |
| Right sheet não fecha ao cancelar o fluxo | B | M | Baixa |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-CANAL-ADD-001 | Dropdown exibe exatamente 4 opções | Administrador autenticado; tela de Canais aberta | 1. Clicar no botão "+ Adicionar canal". | Dropdown abre com as opções: WhatsApp, Instagram, Messenger e WebChat. Nenhuma outra opção presente. (RN1) | 🔴 Alta | UI | — |
| CT-CANAL-ADD-002 | Fluxo completo WhatsApp WABA — passos 1 e 3 | CT-CANAL-ADD-001 concluído; credenciais Meta disponíveis | 1. Selecionar "WhatsApp" no dropdown. 2. Verificar passo 1. 3. Completar vinculação Meta no passo 2. 4. No passo 3, selecionar usuários e salvar. | Passo 1: right sheet abre com título "Adicionar canal WhatsApp" e bloco de informações visível. Passo 2: após confirmação Meta, botão "Próximo" habilita. Passo 4: canal criado com sucesso. (RN2, RN3) | 🔴 Alta | UI | CT-CANAL-ADD-001 |
| CT-CANAL-ADD-003 | Modal de sucesso fecha automaticamente em 3 segundos | CT-CANAL-ADD-002 concluído | 1. Após salvar o canal, observar o modal de conclusão. 2. Cronometrar duração. | Modal é exibido por aproximadamente 3 segundos. Fecha automaticamente sem ação do usuário. Redireciona para listagem de canais. (RN5) | 🔴 Alta | UI | CT-CANAL-ADD-002 |
| CT-CANAL-ADD-004 | Botão Próximo bloqueado sem autenticação Meta | CT-CANAL-ADD-001; passo 2 ativo sem autenticar com Meta | 1. Selecionar "WhatsApp" e avançar ao passo 2. 2. Sem completar vinculação Meta, tentar clicar "Próximo". | Botão "Próximo" permanece desabilitado. Não é possível avançar ao passo 3. (RN2) | 🔴 Alta | UI | CT-CANAL-ADD-001 |
| CT-CANAL-ADD-005 | Falha na autenticação Meta mantém usuário bloqueado | CT-CANAL-ADD-001; simulação de erro da API Meta no passo 2 | 1. Selecionar "WhatsApp" e ir ao passo 2. 2. Simular falha de resposta da Meta (ex.: conexão recusada). | Feedback de erro é exibido ao usuário. Botão "Próximo" permanece desabilitado. Usuário pode tentar novamente. (RN2 — fluxo de erro) | 🟡 Média | UI | CT-CANAL-ADD-001 |
| CT-CANAL-ADD-006 | Cancelar right sheet não cria canal | Administrador; right sheet de WhatsApp aberta no passo 1 | 1. Abrir right sheet de adição de WhatsApp. 2. Fechar a gaveta sem completar o fluxo (X ou clique fora). | Right sheet fecha. Nenhum canal é criado. Listagem de canais permanece inalterada. | 🟡 Média | UI | CT-CANAL-ADD-001 |
| CT-CANAL-ADD-007 | Instagram exibe estrutura com título e alerta corretos | CT-CANAL-ADD-001 concluído | 1. Selecionar "Instagram" no dropdown. | Right sheet abre com título "Adicionar canal Instagram". Alerta contextual referente ao Facebook/Instagram é exibido (conforme RN4). Estrutura de passos idêntica ao WhatsApp. | 🟡 Média | UI | CT-CANAL-ADD-001 |
| CT-CANAL-ADD-008 | Messenger exibe estrutura com título correto | CT-CANAL-ADD-001 concluído | 1. Selecionar "Messenger" no dropdown. | Right sheet abre com título "Adicionar canal Messenger". Alerta contextual exibido. Estrutura de passos idêntica ao WhatsApp com textos adaptados. (RN4) | 🟡 Média | UI | CT-CANAL-ADD-001 |
| CT-CANAL-ADD-009 | Contador de usuários atualiza em tempo real | CT-CANAL-ADD-002 ativo; passo 3 aberto | 1. Selecionar 1 usuário. 2. Selecionar 2º usuário. 3. Remover 1 usuário. | Contador atualiza imediatamente: +1 ao incluir, -1 ao remover. (RN3) | 🟡 Média | UI | CT-CANAL-ADD-002 |
| CT-CANAL-ADD-010 | Limpar tudo reseta lista de usuários | Passo 3 com ao menos 2 usuários selecionados | 1. Com usuários selecionados, clicar em "Limpar tudo". | Todos os usuários removidos instantaneamente. Contador retorna a 0. (RN3) | 🟡 Média | UI | CT-CANAL-ADD-009 |
| CT-CANAL-ADD-011 | Perfil não-administrador não acessa fluxo | Usuário com perfil Operador autenticado | 1. Na tela de Canais, verificar presença do botão "+ Adicionar canal". | Botão "+ Adicionar canal" não exibido para o perfil Operador. Funcionalidade inacessível ao perfil. | 🔴 Alta | UI | — |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Cenário: Botão Próximo bloqueado no passo 2 do WhatsApp sem autenticação Meta
  Dado que sou um administrador autenticado na tela de Canais
  E cliquei em "+ Adicionar canal" e selecionei "WhatsApp"
  E estou no passo 2 (Vinculação)
  Quando NÃO completo a autenticação com a Meta
  Então o botão "Próximo" permanece desabilitado e não pode ser clicado
  E não consigo avançar para o passo 3
```

```gherkin
Cenário: Modal de sucesso fecha automaticamente após 3 segundos
  Dado que completei o fluxo de criação de um canal WhatsApp com sucesso
  Quando o sistema exibe o modal de conclusão
  Então o modal permanece visível por aproximadamente 3 segundos
  E fecha automaticamente sem ação do usuário
  E sou redirecionado para a listagem geral de canais
```

---

## Validação por Agente Crítico

```
✅ Validação concluída:
   Aprovados sem alteração: 3 (CT-001, CT-004, CT-009 original)
   Revisados: 7 (CT-002, CT-003, CT-005→006, CT-006→007, CT-008→009, CT-009→010, CT-010→011)
   Adicionados por cobertura insuficiente: 2 (CT-005 falha Meta, CT-008 Messenger)
   Total final: 11 cenários
```
