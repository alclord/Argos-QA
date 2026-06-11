# Cenários de Teste — DEV4-4274
> Card: Criação do canal do contato diretamente nos detalhes do chat
> Gerado em: 2026-06-01
> Card atualizado em: 2026-05-29T15:46:05.966-0300

---

## PASSO 0.5 — Resumo do Card

- **Título:** Criação do canal do contato diretamente nos detalhes do chat
- **Tipo:** História
- **Prioridade:** Medium
- **Status:** Aguardando Cenários de Teste
- **Atualizado em:** 2026-05-29T15:46:05.966-0300
- **Épico pai:** Não informado
- **Objetivo:** Disponibilizar o campo "Canais do Contato" no painel de edição dentro da Nova Interface, permitindo que o operador visualize e edite/crie o canal vinculado ao contato sem sair da tela de atendimento, replicando o comportamento do Legado.
- **Escopo — O que está incluído:** Campo "Canais do Contato" no painel de detalhes do chat; visualização do canal atual; edição/criação diretamente no painel; toast de sucesso sem reload de página; equivalência funcional com o Legado.
- **Regras de Negócio identificadas:**
  1. Campo "Canais do Contato" exibe o canal atualmente vinculado ao contato
  2. Operador pode criar/editar o canal sem redirecionamento
  3. Ao salvar: toast de sucesso exibido e dado atualiza sem recarregar a página
  4. Comportamento equivalente ao da Interface Legada
- **Critérios de Aceite identificados:**
  - Campo "Canais do Contato" exibe canal atual no painel de edição
  - Operador consegue criar canal diretamente no painel de detalhes do chat
  - Salvar exibe toast de sucesso e atualiza sem recarregar a página
  - Comportamento equivalente ao da Interface Legada
- **Subtasks / dependências:** Nenhuma

> ❓ **Criação vs. edição de canal:** O card usa os termos "criar" e "editar/corrigir" de forma intercambiável. A criação de um canal implica fluxo de right sheet (como no DEV4-4238) ou é um seletor de canais já existentes para vinculação?
> _Por que importa:_ Os passos e pré-requisitos diferem significativamente.

---

## BLOCO 1 — Estratégia de Teste

A feature resolve lacuna crítica reportada por clientes migrados do Legado. Testes aplicáveis: **funcional** (visualização, edição e salvamento do campo), **regressão** (equivalência com Interface Legada), **UX** (toast, ausência de reload, persistência após navegação) e **segurança** (acesso sem autenticação). Execução prioritária: toast sem reload (critério de aceite explícito). Risco principal: reload da página ao salvar quebra o fluxo de atendimento em andamento.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Página recarrega ao salvar (viola critério de aceite) | M | A | Alta |
| Toast de sucesso não aparece após salvar | M | M | Alta |
| Campo não exibe canal atual — vazio ou dado incorreto | M | A | Alta |
| Campo ausente na Nova Interface | B | A | Alta |
| Edição não persiste após navegar e voltar | B | M | Média |
| Comportamento divergente do Legado | M | M | Média |
| Operador sem permissão consegue alterar canal | B | A | Alta |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-CHAT-CANAL-001 | Campo exibe canal atual do contato | Operador autenticado; conversa com contato que possui canal vinculado | 1. Abrir painel de edição de detalhes do contato dentro do chat. 2. Localizar o campo "Canais do Contato". | Campo "Canais do Contato" exibido no painel. Canal atualmente vinculado ao contato mostrado corretamente. (CA: Campo exibe canal atual) | 🔴 Alta | UI | — |
| CT-CHAT-CANAL-002 | Editar canal exibe toast e não recarrega a página | CT-CHAT-CANAL-001 concluído; canal alterável disponível | 1. Alterar o canal no campo "Canais do Contato". 2. Clicar em salvar. 3. Verificar toast. 4. Verificar se a página recarregou. | Toast de sucesso exibido. Página NÃO recarrega — conversa permanece aberta. Dado atualizado reflete a alteração imediatamente. (CA: toast + sem reload) | 🔴 Alta | UI | CT-CHAT-CANAL-001 |
| CT-CHAT-CANAL-003 | Criar canal para contato sem canal vinculado | Operador autenticado; conversa com contato SEM canal vinculado | 1. Abrir painel de edição de detalhes do contato. 2. Localizar campo "Canais do Contato". 3. Criar/vincular um canal pelo campo. 4. Salvar. | Campo exibido com indicação de criação disponível. Após salvar: toast de sucesso exibido e canal vinculado ao contato. (CA: Operador consegue criar canal) | 🔴 Alta | UI | — |
| CT-CHAT-CANAL-004 | Salvar com erro de API exibe feedback de falha | CT-CHAT-CANAL-001 concluído; ambiente com interceptação de request disponível (DevTools ou proxy) | 1. Alterar canal. 2. Bloquear a requisição de salvamento para simular falha. 3. Clicar em salvar. | Toast de erro exibido (não sucesso). Dado não alterado no backend. Painel de edição permanece aberto e disponível para nova tentativa. | 🟡 Média | UI | CT-CHAT-CANAL-001 |
| CT-CHAT-CANAL-005 | Alteração persiste após navegar e voltar | CT-CHAT-CANAL-002 concluído | 1. Após salvar, navegar para outra conversa. 2. Voltar para a conversa original. 3. Abrir painel de edição. | Campo "Canais do Contato" exibe o valor salvo anteriormente. Alteração persistiu corretamente. | 🟡 Média | UI | CT-CHAT-CANAL-002 |
| CT-CHAT-CANAL-006 | Equivalência funcional com Interface Legada | Operador com acesso às duas interfaces; mesmo contato acessível em ambas | 1. Na Interface Legada, visualizar e editar o canal do contato no painel de detalhes. 2. Na Nova Interface, realizar a mesma operação para o mesmo contato. 3. Comparar comportamento de criação e edição. | Ambas as interfaces exibem o mesmo canal vinculado. O fluxo de criação/edição é equivalente entre as duas interfaces. (CA: equivalência com Legado) | 🟡 Média | UI | CT-CHAT-CANAL-001 |
| CT-CHAT-CANAL-007 | Operador sem permissão não altera canal | Usuário autenticado com perfil sem permissão de edição de canal do contato | 1. Acessar painel de detalhes do contato. 2. Tentar editar o campo "Canais do Contato". | Campo não editável para o perfil (somente leitura ou campo ausente). Dado não é alterado. | 🔴 Alta | UI | — |
| CT-CHAT-CANAL-008 | Requisição de atualização sem autenticação retorna erro | Sem sessão ativa; ferramenta de API (Postman) | 1. Enviar requisição de atualização de canal do contato sem header de autenticação. | API retorna HTTP 401 ou 403. Canal do contato não é alterado. | 🔴 Alta | API | — |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Cenário: Salvar canal do contato exibe toast e mantém conversa aberta
  Dado que sou operador autenticado em uma conversa ativa
  E o painel de detalhes do contato está aberto
  E o campo "Canais do Contato" exibe o canal atual
  Quando altero o canal e clico em salvar
  Então um toast de sucesso é exibido
  E a página NÃO é recarregada
  E o campo "Canais do Contato" reflete o novo valor imediatamente
```

```gherkin
Cenário: Campo Canais do Contato exibe canal atual na Nova Interface
  Dado que sou operador autenticado na Nova Interface
  E estou em uma conversa com contato que possui canal vinculado
  Quando abro o painel de edição de detalhes do contato
  Então o campo "Canais do Contato" é exibido no painel
  E o canal atualmente vinculado ao contato é mostrado corretamente
```

---

## Validação por Agente Crítico

```
✅ Validação concluída:
   Aprovados sem alteração: 2 (CT-001, CT-005)
   Revisados: 6 (CT-002, CT-003, CT-004, CT-006, CT-007, CT-008)
   Adicionados por cobertura insuficiente: 0 (CT-003 reescrito como criação independente)
   Total final: 8 cenários
```
