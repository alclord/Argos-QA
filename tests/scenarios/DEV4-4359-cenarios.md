# Cenários de Teste — DEV4-4359
> Card: Mídia de template não exibida na Nova Interface após envio via Disparo
> Gerado em: 2026-06-08
> Card atualizado em: 2026-06-09T10:50:42.116-0300

---

## Estratégia de Teste

**Escopo:** Bug de renderização na Nova Interface (polichat-spa) — mensagens de Disparo (campanha/massa) com mídia (imagem, vídeo, documento) no header do template não exibem a mídia no histórico de chat; somente o texto é renderizado. Fix esperado no fluxo de Disparo (backend) para associar corretamente o vínculo de mídia ao registro da mensagem. Toda verificação requer navegação de browser e comparação visual. Tipos aplicáveis: **funcional** (exibição dos 3 tipos de mídia após fix), **regressão** (envio manual + Interface Legada não devem ser afetados), **comparativo** (Nova Interface vs Legada). Risco principal: template com mídia aprovado no canal canary pode não existir — pré-condição bloqueante para todos os CTs principais. Dados de investigação fornecidos no card: Customer 50942, Contact ID 57918452, Chat `acfac717-82b1-11f0-93ae-062ccf12487f`.

---

## Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Template com mídia não disponível ou não aprovado no canary | A | A | 🔴 Alta |
| Fix aplicado mas vínculo de mídia ainda ausente para novos disparos | M | A | 🔴 Alta |
| Envio manual de template com mídia quebrado após fix (regressão CA3) | B | A | 🔴 Alta |
| Interface Legada deixa de exibir mídia após fix (regressão CA2) | B | A | 🔴 Alta |
| Fix cobre imagem mas não vídeo ou documento (cobertura parcial do CA1) | M | M | 🟡 Média |
| Mídia exibida na Nova Interface mas com URL expirada/inacessível no Meta | M | M | 🟡 Média |
| Disparo para múltiplos contatos — inconsistência de exibição entre destinatários | B | M | 🟡 Média |

---

## Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-DISPARO-001 | Disparo com imagem → Nova Interface exibe | Template WhatsApp aprovado com header de imagem configurado na conta canary. Acesso ao módulo de Disparo/Campanha. ⚠️ Bloqueável — template precisa estar ativo no canal. | 1. Autenticar como manager no canary. 2. Criar e executar um Disparo usando template com header de imagem para o contato de teste. 3. Abrir o chat do contato de teste na Nova Interface. 4. Localizar a mensagem enviada pelo Disparo no histórico. 5. Verificar o conteúdo renderizado da mensagem. | Mensagem do Disparo exibe a imagem do header seguida do texto. A imagem é carregada e visível (não apenas ícone de erro ou placeholder). *(CA1, RN01 — happy path principal)* | 🔴 Alta | UI | — |
| CT-DISPARO-002 | Disparo com vídeo → Nova Interface exibe | Template WhatsApp aprovado com header de vídeo configurado na conta canary. ⚠️ Bloqueável — template de vídeo precisa estar ativo no canal. | 1. Autenticar como manager no canary. 2. Criar e executar Disparo com template de header vídeo para o contato de teste. 3. Abrir o chat na Nova Interface. 4. Localizar a mensagem do Disparo. 5. Verificar a renderização. | Mensagem exibe miniatura de vídeo com botão de reprodução (comportamento padrão da interface para vídeos). Conteúdo visível — não exibe apenas o texto do template. *(CA1, RN01)* | 🔴 Alta | UI | — |
| CT-DISPARO-003 | Disparo com documento → Nova Interface exibe | Template WhatsApp aprovado com header de documento (qualquer tipo suportado: PDF, DOCX, etc.) configurado na conta. ⚠️ Bloqueável — template de documento precisa estar ativo. | 1. Autenticar como manager. 2. Criar e executar Disparo com template de header documento. 3. Abrir o chat do contato na Nova Interface. 4. Localizar a mensagem do Disparo. 5. Verificar a renderização. | Mensagem exibe o documento do header (ícone de arquivo + nome do documento). Não exibe apenas o texto do template. *(CA1, RN01)* | 🔴 Alta | UI | — |
| CT-DISPARO-004 | Nova Interface vs Legada → exibição idêntica | Mesma conta com acesso à Nova Interface e à Interface Legada. Template com mídia disparado via CT-DISPARO-001. | 1. Após executar o Disparo (CT-DISPARO-001), abrir o mesmo chat na Interface Legada. 2. Capturar screenshot da mensagem na Interface Legada. 3. Capturar screenshot da mesma mensagem na Nova Interface. 4. Comparar o conteúdo exibido em ambos os screenshots. | Ambas as interfaces exibem a mesma mídia (imagem, vídeo ou documento conforme o template). Não há diferença de conteúdo entre elas. *(CA2, RN02)* | 🔴 Alta | UI | CT-DISPARO-001 |
| CT-DISPARO-005 | Envio manual com mídia continua funcionando | Template com header de imagem disponível na conta. Chat ativo no canary. | 1. Autenticar como operador no canary. 2. Abrir o chat do contato de teste. 3. Enviar manualmente um template com header de imagem pelo compose. 4. Verificar a mensagem no histórico da Nova Interface. | Mensagem enviada manualmente exibe a imagem normalmente. Fix no fluxo de Disparo não afeta o envio manual. *(CA3, RN03 — regressão)* | 🔴 Alta | UI | — |
| CT-DISPARO-006 | Template sem mídia via Disparo → apenas texto | Template WhatsApp sem header de mídia (somente texto) configurado na conta. | 1. Criar e executar Disparo com template sem header de mídia. 2. Abrir o chat do destinatário na Nova Interface. 3. Verificar a renderização da mensagem. | Mensagem exibe apenas o texto do template. Sem imagem, vídeo ou documento. Sem quebra de layout ou erro de renderização. *(RN01 — confirma que fix não altera templates sem mídia)* | 🟡 Média | UI | — |
| CT-DISPARO-007 | Interface Legada continua exibindo mídia isoladamente | Mesma conta do CT-DISPARO-001. Acesso exclusivo à Interface Legada (sem abrir a Nova Interface neste cenário). | 1. Após o fix, executar um Disparo com template de imagem. 2. Abrir o chat do destinatário diretamente na Interface Legada (sem passar pela Nova Interface). 3. Verificar a mensagem do Disparo na Interface Legada. | Interface Legada exibe a mídia normalmente. Verificação isolada — confirma que o fix no módulo de armazenamento de vínculo não interfere no fluxo de renderização exclusivo da Legada. *(RN02 — regressão isolada da Interface Legada)* | 🟡 Média | UI | CT-DISPARO-001 |
| CT-DISPARO-008 | Disparo em massa → todos os chats exibem mídia | Disparo configurado para ao menos 2 contatos distintos. Template com header de imagem. | 1. Executar Disparo para 2 contatos simultaneamente. 2. Abrir o chat do contato 1 na Nova Interface e verificar a mensagem. 3. Abrir o chat do contato 2 na Nova Interface e verificar a mensagem. | Ambos os chats exibem a mídia do template. Nenhuma inconsistência entre os destinatários do mesmo Disparo. *(CA1 — borda: fix consistente entre múltiplos registros gerados pelo mesmo Disparo)* | 🟡 Média | UI | CT-DISPARO-001 |
| CT-DISPARO-009 | Mídia permanece visível após reload do histórico | Mesmo chat do CT-DISPARO-001 com mídia já visível. | 1. Após verificar a mídia no histórico (CT-DISPARO-001), recarregar a página do chat. 2. Rolar até a mensagem do Disparo. 3. Verificar se a mídia ainda é exibida. | Mídia continua visível após reload. O vínculo de mídia foi persistido corretamente no registro da mensagem e não depende de cache de sessão. *(RN01 — borda: persistência do vínculo no banco)* | 🟡 Média | UI | CT-DISPARO-001 |
| CT-DISPARO-010 | Mídia de disparo de outra conta não aparece indevidamente | Usuário autenticado na conta X. Disparo com mídia executado da conta Y (diferente). ⚠️ Segurança — incluído porque o fix modifica a lógica de associação de mídia por registro; se o escopo de conta não for respeitado, uma conta pode acessar mídia de outra via Nova Interface. | 1. Autenticar na conta X. 2. Tentar acessar o chat de um contato que recebeu Disparo da conta Y (usar ID de chat da conta Y na URL). 3. Verificar o comportamento da aplicação e o conteúdo do histórico. | A conta X não exibe mídia ou mensagens da conta Y no histórico. Exibe estado de erro (chat não encontrado ou acesso negado). Isolamento multi-tenant mantido após o fix. *(segurança — validação do escopo de conta na associação de vínculo de mídia)* | 🟡 Média | UI | — |
| CT-DISPARO-011 | Histórico anterior ao fix não quebra o layout | Conta com mensagens de Disparo enviadas **antes** da aplicação do fix (sem vínculo de mídia associado). | 1. Autenticar no canary. 2. Abrir o chat de um contato que recebeu Disparo com template de mídia antes do fix. 3. Rolar até a(s) mensagem(s) antiga(s) do Disparo. 4. Verificar o layout da mensagem. | Mensagem antiga exibe apenas o texto (sem mídia — comportamento esperado, vínculo nunca foi salvo). Sem crash, sem erro visível na UI, sem quebra de layout. *(RN01 — negative: fix é prospectivo; registros antigos não têm vínculo e isso é aceitável)* | 🟡 Média | UI | — |
| CT-DISPARO-012 | Mídia expirada no Meta → fallback adequado na Nova Interface | Disparo com template de mídia cuja URL no Meta já expirou ou foi removida. | 1. Identificar (ou simular) uma mensagem de Disparo onde o link de mídia no Meta não está mais acessível. 2. Abrir o chat do destinatário na Nova Interface. 3. Verificar o comportamento da interface ao tentar renderizar a mídia. | Nova Interface exibe estado de fallback adequado (ícone de mídia indisponível, placeholder ou mensagem de erro amigável). Sem crash ou tela em branco. *(negative: vínculo associado mas URL expirada — robustez do fix no frontend)* | 🟡 Média | UI | CT-DISPARO-001 |

---

## Cenários Gherkin (BDD)

```gherkin
Cenário: Template com imagem no header enviado via Disparo é exibido na Nova Interface
  Dado que existe um template WhatsApp aprovado com header de imagem na conta canary
  E o usuário manager está autenticado na Nova Interface
  Quando o manager executa um Disparo usando esse template para o contato de teste
  E abre o chat do contato na Nova Interface
  E localiza a mensagem enviada pelo Disparo no histórico
  Então a mensagem exibe a imagem do header de forma visível
  E não exibe apenas o texto do template
```

```gherkin
Cenário: Envio manual de template com mídia continua funcionando após fix
  Dado que o fix de Disparo foi aplicado no ambiente canary
  E existe um template com header de imagem disponível na conta
  Quando o operador envia manualmente o template com mídia pelo compose do chat
  Então a mensagem aparece no histórico da Nova Interface com a imagem do header visível
  E o comportamento é idêntico ao anterior ao fix (sem regressão)
```

---

## Validação por Agente Crítico

```
✅ Validação por agente crítico concluída:
   Aprovados sem alteração: 5 (CT-DISPARO-001, CT-DISPARO-005, CT-DISPARO-006, CT-DISPARO-008, CT-DISPARO-009)
   Revisados: 5 (CT-DISPARO-002, CT-DISPARO-003, CT-DISPARO-004, CT-DISPARO-007, CT-DISPARO-010)
   Adicionados por cobertura insuficiente: 2 (CT-DISPARO-011, CT-DISPARO-012)
   Total: 12 cenários
```
