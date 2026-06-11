# Cenários de Teste — DEV4-4281
> Card: Dessincronização na exibição da última mensagem na sidebar (Listagem de Chats)
> Gerado em: 2026-06-02
> Card atualizado em: 2026-06-02T08:23:48.609-0300

---

## Resumo do Card

- **Título:** Dessincronização na exibição da última mensagem na sidebar (Listagem de Chats)
- **Tipo:** Bug
- **Prioridade:** Highest
- **Status:** Aguardando Cenários de Teste
- **Atualizado em:** 2026-06-02T08:23:48 (-03:00)
- **Objetivo:** O componente da sidebar (listagem de chats) não atualiza corretamente a prévia da última mensagem quando eventos de mensagem chegam em burst (rápida sucessão via WebSocket). O banco de dados e o chat aberto refletem a mensagem correta, mas a prévia exibida na sidebar permanece presa em uma mensagem anterior, comprometendo o contexto do atendente.

### Regras de Negócio
1. A prévia na sidebar deve sempre refletir a mensagem com timestamp mais recente, independentemente da ordem de chegada dos eventos WebSocket
2. Em burst de recebimento: contato envia "Teste 1" → "Teste 2" → sidebar deve exibir "Teste 2"
3. Em burst de envio: atendente envia "Mensagem A" → "Mensagem B" → sidebar deve exibir "Mensagem B"
4. A prévia na sidebar deve ser idêntica à última mensagem visível no chat aberto
5. Nenhuma regressão para o fluxo de mensagem única (uma de cada vez)

### Critérios de Aceite
1. Contato envia duas mensagens em rápida sucessão → sidebar exibe a segunda mensagem como prévia
2. Atendente envia duas mensagens em rápida sucessão → sidebar exibe a segunda mensagem como prévia
3. A prévia exibida na sidebar bate com a última mensagem visível dentro do chat aberto
4. Nenhuma regressão em chats com volume normal de mensagens (uma por vez)

---

## BLOCO 1 — Estratégia de Teste

O escopo cobre o componente de listagem de chats na sidebar do foundation-spa, especificamente a atualização da prévia da última mensagem via eventos WebSocket em situação de burst. Dado que o banco e o chat aberto estão corretos, o defeito é exclusivamente de sincronização de estado na UI (TanStack Query + handler de WebSocket). Os tipos de teste aplicáveis são: **funcional** (comportamento da sidebar em burst), **regressão** (fluxo normal de mensagem única) e **UX** (consistência visual sidebar × chat aberto). A prioridade de execução é máxima — card está como Highest e o bug compromete diretamente o monitoramento operacional do atendente. Risco principal: comportamento intermitente dependente de timing, o que torna o teste manual suscetível a falsos negativos; automação com controle de tempo é recomendada. A referência ao DEV4-4233 indica risco de regressão em fluxos de ACK, que devem ser verificados como parte do smoke pós-correção.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Sidebar exibir mensagem errada após burst de recebimento — bug principal | A | A | 🔴 Crítica |
| Sidebar exibir mensagem errada após burst de envio — segundo cenário do bug | A | A | 🔴 Crítica |
| Inconsistência entre prévia da sidebar e conteúdo do chat aberto | A | A | 🔴 Crítica |
| Correção introduzir regressão no fluxo de mensagem única | M | A | 🔴 Crítica |
| Bug não reproduzível em ambiente de teste por diferença de latência de rede | A | M | 🟡 Média |
| Correção introduzir regressão nos ACKs (referência ao DEV4-4233) | M | A | 🔴 Crítica |
| Prévia correta na sidebar mas desatualizada após refresh de página | M | M | 🟡 Média |
| Comportamento inconsistente entre SPAs (foundation-spa vs polichat-spa) | B | M | 🟢 Baixa |
| Sidebar atualizar com texto truncado incorreto (preview muito longo) | B | B | 🟢 Baixa |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-SIDEBAR-001 | Sidebar atualiza após burst de recebimento | - Conta de staging ativa com pelo menos 1 chat no status `attending` ou `waiting`<br>- Contato de teste configurado (⚠️ Bloqueável — use o contato `9bb49c4f` definido em qa-environment.local.json)<br>- Atendente logado na foundation-spa em `https://spa.qa.poli.digital/chat` | 1. Atendente abre a foundation-spa e observa a sidebar com a listagem de chats<br>2. Identifica na sidebar o card do contato de teste<br>3. Mantém outro chat selecionado (não o chat do contato de teste) ou nenhum chat aberto<br>4. O contato de teste envia a mensagem "Teste 1" via WhatsApp<br>5. Imediatamente (< 2s), o mesmo contato envia a mensagem "Teste 2"<br>6. Aguardar até 5 segundos após o segundo envio<br>7. Observar a prévia exibida no card do contato na sidebar | A prévia exibida no card do contato na sidebar mostra "Teste 2" (a segunda mensagem) | 🔴 Alta | UI | — |
| CT-SIDEBAR-002 | Sidebar atualiza após burst de envio | - Conta de staging ativa com chat em status `attending` atribuído ao atendente logado<br>- Chat do contato de teste aberto<br>- Atendente logado na foundation-spa | 1. Atendente abre o chat do contato de teste no painel principal<br>2. Observa a sidebar com o card do contato visível<br>3. No campo de composição de mensagem, digita "Mensagem A" e envia<br>4. Imediatamente (< 2s), digita "Mensagem B" e envia<br>5. Aguardar até 5 segundos após o segundo envio<br>6. Observar a prévia exibida no card do contato na sidebar | A prévia exibida no card do contato na sidebar mostra "Mensagem B" (a segunda mensagem enviada) | 🔴 Alta | UI | — |
| CT-SIDEBAR-003 | Consistência sidebar × chat aberto (estado imediato) | - Conta de staging ativa<br>- Chat do contato de teste com mensagem recente<br>_Nota: cobre o estado imediato após atualização. CT-SIDEBAR-006 cobre o estado após abrir/fechar o chat._ | 1. Atendente abre a foundation-spa<br>2. Observa a prévia da última mensagem exibida no card do contato na sidebar<br>3. Clica no card do contato para abrir o chat<br>4. Identifica a última mensagem visível no histórico do chat | O texto da prévia exibida na sidebar é idêntico ao texto da última mensagem visível no histórico do chat aberto | 🔴 Alta | UI | CT-SIDEBAR-001 |
| CT-SIDEBAR-004 | Regressão: mensagem única atualiza sidebar | - Conta de staging ativa<br>- Contato de teste com chat ativo | 1. Atendente abre a foundation-spa e localiza o card do contato na sidebar<br>2. O contato envia uma única mensagem "Mensagem Regressão"<br>3. Aguardar até 5 segundos | A prévia no card do contato na sidebar é atualizada para "Mensagem Regressão" sem necessidade de recarregar a página | 🔴 Alta | UI | — |
| CT-SIDEBAR-005 | Sidebar não atualiza card de outro contato | - Conta de staging ativa com ao menos 2 contatos com chats ativos | 1. Atendente abre a foundation-spa<br>2. Observa a prévia da última mensagem do Contato A na sidebar<br>3. O Contato B envia uma nova mensagem<br>4. Aguardar até 5 segundos | A prévia do Contato A na sidebar permanece inalterada; somente a prévia do Contato B é atualizada com a nova mensagem | 🟡 Média | UI | — |
| CT-SIDEBAR-006 | Sidebar mantém prévia correta após abrir/fechar chat | - Conta de staging ativa<br>- Contato de teste com 2 mensagens recentes em burst<br>_Nota: cobre o estado após interação com o chat. CT-SIDEBAR-003 cobre o estado imediato._ | 1. Reproduzir o cenário de burst de recebimento (duas mensagens rápidas do contato)<br>2. Aguardar a sidebar atualizar para a segunda mensagem<br>3. Clicar no card do contato para abrir o chat<br>4. Fechar o chat (selecionar outro ou fechar painel)<br>5. Observar novamente a prévia na sidebar | A prévia na sidebar continua exibindo a segunda mensagem (a mais recente) após abrir e fechar o chat | 🟡 Média | UI | CT-SIDEBAR-001 |
| CT-SIDEBAR-007 | Burst com 3 mensagens em sequência | - Conta de staging ativa<br>- Contato de teste configurado | 1. Atendente observa a sidebar<br>2. O contato de teste envia "Msg 1", "Msg 2" e "Msg 3" em sequência rápida (< 2s entre cada uma)<br>3. Aguardar até 5 segundos após o terceiro envio | A prévia na sidebar exibe "Msg 3" (a mensagem mais recente das três) | 🟡 Média | UI | — |
| CT-SIDEBAR-008 | Sidebar após refresh de página pós-burst | - Conta de staging ativa<br>- Burst de recebimento executado (CT-SIDEBAR-001) | 1. Executar o cenário CT-SIDEBAR-001 (burst de recebimento)<br>2. Pressionar F5 para recarregar a foundation-spa<br>3. Aguardar o carregamento completo da sidebar<br>4. Observar a prévia do card do contato de teste | A prévia exibida após o reload é a segunda mensagem ("Teste 2") — confirma que o banco de dados registrou corretamente | 🟡 Média | UI | CT-SIDEBAR-001 |
| CT-SIDEBAR-009 | Burst não afeta outros campos do card na sidebar | - Conta de staging ativa<br>- Contato de teste com chat ativo | 1. Observar o card do contato na sidebar: nome, foto, status, horário e prévia<br>2. Executar burst de recebimento (duas mensagens rápidas)<br>3. Aguardar a atualização da prévia | Somente o campo de prévia da mensagem é atualizado; nome do contato, foto, status do chat e outros atributos do card permanecem inalterados | 🟡 Média | UI | — |
| CT-SIDEBAR-010 | Sidebar não vaza dados entre contas diferentes | - Duas contas de staging distintas com atendentes diferentes<br>- ⚠️ Bloqueável — requer segundo usuário de testes com acesso a conta separada | 1. Atendente A (conta X) está logado e observa a sidebar<br>2. Um contato da conta Y envia mensagem<br>3. Observar se o card de qualquer contato na conta X é afetado | Nenhuma atualização é exibida na sidebar do Atendente A (conta X) em decorrência de evento da conta Y | 🟡 Média | UI | — |
| CT-SIDEBAR-011 | Sidebar reconecta e exibe prévia correta após queda de conexão | - Conta de staging ativa<br>- Capacidade de simular perda de rede (ex: modo Avião ou desligar/religar o Wi-Fi) | 1. Atendente abre a foundation-spa<br>2. Ativa o modo Avião (ou desconecta o Wi-Fi)<br>3. O contato envia duas mensagens em burst (elas ficarão enfileiradas no servidor)<br>4. Desativa o modo Avião (ou reconecta o Wi-Fi)<br>5. Aguardar a reconexão do aplicativo (até 15s)<br>6. Observar a prévia na sidebar | Após a reconexão, a sidebar exibe a mensagem mais recente enviada durante a desconexão; não trava em uma mensagem anterior | 🟡 Média | UI | — |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Cenário: Sidebar exibe segunda mensagem após burst de recebimento
  Dado que o atendente está logado na foundation-spa
  E existe um chat ativo do contato de teste na sidebar
  E o atendente não está com o chat do contato de teste aberto
  Quando o contato de teste envia a mensagem "Teste 1"
  E imediatamente envia a mensagem "Teste 2" em menos de 2 segundos
  Então a prévia exibida no card do contato na sidebar deve mostrar "Teste 2"
  E não deve mostrar "Teste 1"
```

```gherkin
Cenário: Sidebar exibe segunda mensagem após burst de envio do atendente
  Dado que o atendente está logado na foundation-spa
  E o chat do contato de teste está aberto no painel principal
  Quando o atendente envia a mensagem "Mensagem A"
  E imediatamente envia a mensagem "Mensagem B" em menos de 2 segundos
  Então a prévia exibida no card do contato na sidebar deve mostrar "Mensagem B"
  E não deve mostrar "Mensagem A"
```

---

## Validação por Agente Crítico Independente

✅ Validação por agente crítico concluída:
- Aprovados sem alteração: 8
- Revisados: 3 (CT-SIDEBAR-010 — criticidade ajustada para 🟡 Média; CT-SIDEBAR-011 — passo de desconexão reescrito sem linguagem técnica de protocolo; CT-SIDEBAR-003/006 — nota diferenciadora adicionada)
- Adicionados por cobertura insuficiente: 0

---

**Resumo:** 11 cenários — 🔴 4 Alta | 🟡 7 Média | 🟢 0 Baixa | 2 cenários Gherkin
