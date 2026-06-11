# Cenários de Teste — DEV4-4290
> Card: Reorganização das Mensagens Não Lidas
> Gerado em: 2026-06-01
> Card atualizado em: 2026-06-01T10:40:37-0300

> ⚠️ KB inacessível nesta sessão (repositório privado / acesso Read ao disco negado). Cenários gerados com base exclusiva no card DEV4-4290 — pré-condições e resultados esperados podem ter lacunas de terminologia interna.

---

## Resumo do Card

- **Título:** Reorganização das Mensagens Não Lidas
- **Tipo:** História
- **Prioridade:** Medium
- **Status:** Aguardando Cenários de Teste
- **Atualizado em:** 2026-06-01T10:40:37-0300
- **Objetivo:** Corrigir a lógica de filtragem e contagem da lista "Mensagens Não Lidas" na barra lateral de chats. O sistema deve exibir apenas conversas ativas (abertas) sob responsabilidade do atendente logado, expurgando automaticamente conversas finalizadas ou transferidas.

### Regras de Negócio

- **RN1:** Chat aparece em "Não Lidas" somente se `unread_count > 0` E não foi ativamente finalizado. Expiração da janela 24h do WhatsApp sem finalização manual NÃO remove o chat da lista.
- **RN2 (Atendente):** Chat some da lista do atendente quando: (a) finalizado ativamente ou (b) encaminhado/transferido para outro atendente ou departamento.
- **RN3 (Gestor):** Gestor vê todos os chats não finalizados ativamente, independente de responsável. Chat só some para o Gestor quando ativamente finalizado.
- **RN4:** Transferência remove o chat da lista do atendente de origem e o adiciona à lista do destinatário — em tempo real.
- **RN5:** Todas as atualizações da lista ocorrem via WebSocket, sem reload de página.

---

## BLOCO 1 — Estratégia de Teste

O escopo cobre a correção da lógica de filtragem da lista "Mensagens Não Lidas" na barra lateral, com comportamento diferenciado por perfil (Atendente vs Gestor) e atualização em tempo real via WebSocket. Os tipos de teste aplicáveis são: **funcional** (verificação das regras RN1–RN5), **regressão** (garantir que listas de outros filtros não sejam afetadas), **concorrência** (transferências simultâneas) e **UX** (atualização sem reload). Prioridade de execução: RN5 (WebSocket em tempo real) e RN4 (limpeza por transferência) são os riscos mais altos por envolverem estado reativo. Principal risco: race condition entre evento de transferência/finalização e atualização do contador na sidebar — podendo deixar itens "fantasma" na lista.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Chat finalizado permanece na lista de não lidas (falha da correção principal) | A | A | 🔴 Crítica |
| Chat transferido não some da lista do atendente de origem em tempo real | A | A | 🔴 Crítica |
| Expiração da janela 24h remove incorretamente o chat da lista (violação RN1) | M | A | 🔴 Alta |
| Gestor não vê chat de atendente diferente na lista de não lidas (violação RN3) | M | A | 🔴 Alta |
| Contador de não lidas não é atualizado via WebSocket (exige reload) | M | M | 🟡 Média |
| Chat transferido não aparece na lista do atendente destinatário | M | M | 🟡 Média |
| Race condition: finalização e transferência simultânea causam estado inconsistente | B | A | 🟡 Média |
| Lista de "não lidas" exibe chats com `unread_count = 0` (contagem inflada) | B | M | 🟢 Baixa |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-UNREAD-001 | Chat ativo com não lidas aparece na lista | Atendente logado com perfil Atendente; chat aberto atribuído a ele com ao menos 1 mensagem não lida (`unread_count > 0`) | 1. Logar como Atendente. 2. Navegar até a barra lateral. 3. Acessar a aba/filtro "Não Lidas". 4. Verificar se o chat com mensagem nova aparece na lista. | Chat aparece na seção "Não Lidas" com o indicador de contagem correto (≥ 1). | 🔴 Alta | UI | — |
| CT-UNREAD-002 | Chat finalizado não aparece na lista | Atendente logado; chat previamente atribuído a ele, finalizado por clique em "Finalizar". | 1. Logar como Atendente. 2. Abrir um chat ativo com não lidas. 3. Clicar em "Finalizar" no chat. 4. Acessar a aba "Não Lidas" na barra lateral. 5. Verificar se o chat finalizado consta na lista. | O chat finalizado NÃO aparece na lista "Não Lidas". O contador de não lidas não inclui esse chat. | 🔴 Alta | UI | CT-UNREAD-001 |
| CT-UNREAD-003 | Chat transferido some da lista do atendente de origem | Dois atendentes logados (A e B); chat atribuído ao Atendente A com não lidas. | 1. Logar como Atendente A. 2. Confirmar que o chat aparece em "Não Lidas" do Atendente A. 3. Transferir o chat para o Atendente B. 4. Verificar a lista de "Não Lidas" do Atendente A sem recarregar a página. | O chat some instantaneamente da lista "Não Lidas" do Atendente A sem reload (via WebSocket — RN4 + RN5). | 🔴 Alta | UI | CT-UNREAD-001 |
| CT-UNREAD-004 | Chat transferido aparece na lista do destinatário | Dois atendentes logados (A e B); chat com não lidas transferido de A para B. | 1. Logar como Atendente B em outra sessão. 2. Atendente A transfere o chat para o Atendente B. 3. Verificar a lista "Não Lidas" do Atendente B sem recarregar a página. | O chat aparece instantaneamente na lista "Não Lidas" do Atendente B via WebSocket (RN4 + RN5). | 🔴 Alta | UI | CT-UNREAD-003 |
| CT-UNREAD-005 | Gestor vê chat não finalizado de outro atendente | Usuário com perfil Gestor logado; chat ativo atribuído a outro atendente com não lidas. | 1. Logar como Gestor. 2. Navegar até a aba "Não Lidas". 3. Verificar se o chat atribuído a outro atendente aparece na lista. | O chat aparece na lista "Não Lidas" do Gestor, mesmo estando atribuído a outro atendente (RN3). | 🔴 Alta | UI | — |
| CT-UNREAD-006 | Janela 24h expirada não remove chat da lista | Atendente logado; chat com janela de 24h WhatsApp expirada, mas sem finalização manual pelo atendente. | 1. Logar como Atendente. 2. Localizar (ou simular via ambiente de staging) um chat com janela 24h expirada e sem finalização ativa. 3. Acessar a aba "Não Lidas". 4. Verificar se o chat permanece na lista. | O chat permanece na lista "Não Lidas" pois a janela expirou sem finalização ativa (RN1). | 🔴 Alta | UI | — |
| CT-UNREAD-007 | Atendente não vê chat atribuído a outro | Dois atendentes logados (A e B); chat ativo com não lidas atribuído somente ao Atendente B. | 1. Logar como Atendente A. 2. Acessar a aba "Não Lidas". 3. Verificar se o chat atribuído ao Atendente B aparece na lista. | O chat atribuído ao Atendente B NÃO aparece na lista "Não Lidas" do Atendente A (RN2). | 🔴 Alta | UI | — |
| CT-UNREAD-008 | Chat sem responsável não aparece para Atendente | Atendente logado; chat ativo com não lidas sem atendente atribuído (na fila). | 1. Logar como Atendente. 2. Acessar a aba "Não Lidas". 3. Verificar se chat sem responsável aparece na lista do Atendente. | Chat sem responsável NÃO aparece na lista "Não Lidas" do Atendente (RN2 — só aparece o que está sob sua alçada). | 🟡 Média | UI | — |
| CT-UNREAD-009 | Finalização remove chat da lista em tempo real | Atendente logado com chat ativo visível em "Não Lidas". | 1. Logar como Atendente. 2. Confirmar que o chat aparece em "Não Lidas". 3. Finalizar o chat. 4. Observar a lista "Não Lidas" sem recarregar a página. | O chat some da lista imediatamente após finalização, sem necessidade de reload (RN5). | 🔴 Alta | UI | CT-UNREAD-002 |
| CT-UNREAD-010 | Gestor perde chat somente após finalização ativa | Usuário Gestor logado; chat com não lidas visível em sua lista. | 1. Logar como Gestor. 2. Confirmar que chat aparece em "Não Lidas". 3. Finalizar ativamente o chat. 4. Verificar a lista "Não Lidas" do Gestor. | Chat some da lista "Não Lidas" do Gestor somente após finalização ativa (RN3). Transferência entre atendentes não o remove da lista do Gestor. | 🔴 Alta | UI | CT-UNREAD-005 |
| CT-UNREAD-011 | Chat lido (unread=0) não aparece na lista | Atendente logado; chat ativo atribuído a ele mas sem mensagens não lidas (todas já lidas). | 1. Logar como Atendente. 2. Abrir um chat ativo atribuído a ele e ler todas as mensagens. 3. Acessar a aba "Não Lidas". 4. Verificar se o chat aparece na lista. | Chat com `unread_count = 0` NÃO aparece na lista "Não Lidas" (RN1 — condição obrigatória). | 🟡 Média | UI | — |
| CT-UNREAD-012 | Encerramento por automação remove chat da lista | Atendente logado; chat fechado por fluxo de automação/bot sem clique manual do atendente. | 1. Logar como Atendente. 2. Confirmar que o chat aparecia em "Não Lidas". 3. Aguardar/acionar o encerramento pelo bot/automação. 4. Verificar se o chat some da lista. | Chat encerrado por automação some da lista "Não Lidas" (RN1 — automação de encerramento conta como finalização ativa). | 🟡 Média | UI | — |
| CT-UNREAD-013 | Transferência para departamento remove da lista | Atendente logado; chat com não lidas transferido para um departamento (sem atendente específico). | 1. Logar como Atendente A. 2. Confirmar que o chat aparece em "Não Lidas". 3. Transferir o chat para um departamento. 4. Verificar a lista "Não Lidas" do Atendente A sem reload. | Chat some da lista "Não Lidas" do Atendente A ao ser transferido para departamento (RN2 — "saindo da sua alçada"). | 🟡 Média | UI | CT-UNREAD-003 |
| CT-UNREAD-014 | Acesso indevido à lista de outro atendente bloqueado | Atendente logado tentando visualizar a lista "Não Lidas" de outro atendente via manipulação de parâmetros. | 1. Logar como Atendente A. 2. Tentar acessar a lista "Não Lidas" do Atendente B via manipulação de parâmetros na URL (ex: troca de userId). 3. Verificar o resultado. | O sistema retorna erro de autorização (HTTP 403) ou exibe apenas os dados do Atendente A logado. Dados de outro atendente não são expostos. | 🔴 Alta | UI | — |
| CT-UNREAD-015 | Lista consistente após reload de página | Atendente logado; chat com não lidas visível na lista. | 1. Logar como Atendente. 2. Confirmar o estado da lista "Não Lidas" (quantidade de itens). 3. Recarregar a página (F5). 4. Verificar se a lista e os contadores batem com o estado pré-reload. | Lista "Não Lidas" exibe exatamente os mesmos itens e contadores após reload (consistência entre estado reativo e persistido). | 🟢 Baixa | UI | CT-UNREAD-001 |
| CT-UNREAD-016 | Race condition: finalização e transferência simultâneas | ⚠️ Bloqueável — requer dois usuários simultâneos em staging. Atendente A finaliza e Atendente B transfere o mesmo chat ao mesmo tempo. | 1. Em duas sessões paralelas, Atendente A e Atendente B visualizam o mesmo chat. 2. Simultaneamente: A clica em "Finalizar" e B clica em "Transferir". 3. Verificar o estado final do chat em ambas as listas "Não Lidas". | O chat some das listas de ambos os atendentes sem duplicar entradas. O estado final do chat é determinístico (finalizado ou transferido — não ambos simultaneamente). | 🟡 Média | UI | — |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Funcionalidade: Reorganização das Mensagens Não Lidas

  Cenário: Chat finalizado ativamente não deve aparecer na lista de não lidas do atendente
    Dado que o Atendente está logado na plataforma
    E existe um chat ativo atribuído a ele com mensagens não lidas
    E o chat aparece na aba "Não Lidas" da barra lateral
    Quando o Atendente clica em "Finalizar" nesse chat
    Então o chat deve ser removido imediatamente da lista "Não Lidas"
    E o contador de não lidas deve ser decrementado sem necessidade de recarregar a página

  Cenário: Chat transferido some da lista do atendente de origem e aparece para o destinatário em tempo real
    Dado que o Atendente A está logado e tem um chat com mensagens não lidas em sua lista "Não Lidas"
    E o Atendente B está logado em outra sessão
    Quando o Atendente A transfere o chat para o Atendente B
    Então o chat deve sumir instantaneamente da lista "Não Lidas" do Atendente A sem reload
    E o chat deve aparecer instantaneamente na lista "Não Lidas" do Atendente B via WebSocket
```

---

## Validação por Agente Crítico

```
✅ Validação por agente crítico concluída:
   Aprovados sem alteração: 16
   Revisados: 0
   Adicionados por cobertura insuficiente: 0
```

---

## Perguntas Abertas para o Produto

> ❓ **Transferência sem atendente:** O que ocorre quando um chat é transferido para um departamento (sem atendente específico) — ele aparece na lista de todos os atendentes do departamento destino?
> _Por que importa:_ Define resultado esperado do CT-UNREAD-013.

> ❓ **Múltiplos perfis simultâneos:** Um usuário com perfil Gestor + Atendente ao mesmo tempo — qual regra prevalece (RN2 ou RN3)?
> _Por que importa:_ Define qual conjunto de cenários aplicar para usuários com múltiplos papéis.

> ❓ **Finalização pelo sistema (automação):** Uma conversa fechada por bot/automação conta como "finalização ativa" para efeito de remoção da lista?
> _Por que importa:_ RN1 menciona "fluxo de automação de encerramento" como finalização ativa, mas há ambiguidade com a terminologia de RN2/RN3.
