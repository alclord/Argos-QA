# Cenários de Teste — DEV4-4383
> Card: Encaminhar e Apagar Arquivos — Central de Arquivos do Contato
> Gerado em: 2026-06-12
> Card atualizado em: 2026-06-10T12:49:01 -0300

---

## BLOCO 1 — Estratégia de Teste

Esta entrega implementa duas ações na Central de Arquivos: **Encaminhar** (individual e em lote, mantendo arquivo na origem) e **Apagar** (individual e em lote, exclusão permanente e irreversível com audit log). As regras mais críticas são: (1) controle de permissão por role — operadores só podem apagar/encaminhar seus próprios arquivos; (2) exclusão permanente sem recuperação; (3) links encaminhados como texto, não como arquivo; (4) arquivo deletado deve desaparecer da central E do histórico de conversa. Tipos de teste: UI funcional (fluxos modal, toast, barra de ações), API (bypass de permissão, audit log, eventos analytics), regressão (central de arquivos continua exibindo corretamente após operações). Prioridade: 1º permissões de exclusão, 2º fluxo completo de exclusão, 3º encaminhamento, 4º lote, 5º mobile.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade | Impacto | Prioridade |
|---|---|---|---|
| Operador consegue apagar arquivo de outro operador (violação de permissão) | M | A | Alta |
| Arquivo deletado permanece visível no histórico de conversa | M | A | Alta |
| Encaminhamento remove arquivo da origem (deveria manter) | M | A | Alta |
| Link encaminhado como arquivo em vez de texto + URL | M | M | Média |
| Exclusão sem confirmar no modal (delete sem confirmação) | B | A | Alta |
| Audit log não registrado após exclusão | B | A | Alta |
| Bypass de permissão via chamada direta à API (sem UI) | B | A | Alta |
| Toast de sucesso exibido mesmo quando API retornou erro | M | M | Média |
| Central não atualiza após exclusão (arquivo ainda aparece na lista) | M | M | Média |
| Eventos analytics file_forwarded / file_deleted não disparados | B | M | Média |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-ARQV-001 | Encaminhar arquivo individual com sucesso | Contato com arquivo na central; contato destino ativo ⚠️ Bloqueável — verificar existência de arquivo na central | 1. Abrir Central de Arquivos do contato 2. Selecionar 1 arquivo 3. Clicar em "Encaminhar" 4. Buscar e selecionar contato destino no modal GP-647 5. Confirmar encaminhamento | Modal de seleção de contato abre; arquivo enviado como nova mensagem no chat do contato destino com metadados preservados (nome, data); modal fecha; toast verde "Arquivo encaminhado com sucesso!"; arquivo permanece visível na central de origem (não removido) | 🔴 Alta | UI | — |
| CT-ARQV-002 | Apagar arquivo individual com confirmação | Arquivo na central enviado pelo próprio operador logado | 1. Selecionar 1 arquivo na central 2. Clicar em "Apagar" (ícone lixeira) 3. Verificar modal de confirmação 4. Clicar em "Apagar" no modal | Modal exibe título "Apagar arquivo?" e mensagem "...Esta ação não pode ser desfeita."; ao confirmar: arquivo removido da central; arquivo não aparece mais no histórico de conversa (ou exibe "[Arquivo removido]"); toast verde "Arquivo apagado com sucesso!"; operação irreversível | 🔴 Alta | UI | — |
| CT-ARQV-003 | Encaminhar múltiplos arquivos em lote | Contato com ≥ 2 arquivos na central; contato destino ativo | 1. Selecionar múltiplos arquivos 2. Clicar em "Encaminhar" 3. Selecionar contato destino 4. Confirmar | Modal exibe "[X arquivos selecionados]"; todos os arquivos encaminhados ao contato destino; toast "[X] arquivo(s) encaminhado(s) com sucesso!"; arquivos originais permanecem na central | 🟡 Média | UI | CT-ARQV-001 |
| CT-ARQV-004 | Apagar múltiplos arquivos em lote | ≥ 2 arquivos na central enviados pelo próprio operador | 1. Selecionar múltiplos arquivos 2. Clicar em "Apagar" 3. Verificar modal de confirmação 4. Confirmar exclusão | Modal exibe "Apagar [X] arquivo(s)?" com quantidade correta; ao confirmar: todos removidos da central; central atualiza sem nenhum dos arquivos; toast "[X] arquivo(s) apagado(s) com sucesso!" | 🟡 Média | UI | CT-ARQV-002 |
| CT-ARQV-005 | Encaminhar link como texto com URL | Aba "Links" da central com ao menos 1 link ⚠️ Bloqueável — verificar existência de link na central | 1. Acessar aba Links da central 2. Selecionar 1 link 3. Clicar em "Encaminhar" 4. Selecionar contato destino 5. Confirmar | Link enviado como mensagem de texto com a URL ao contato destino (não como arquivo/attachment); toast de sucesso exibido; comportamento distinto do encaminhamento de mídias/documentos | 🟡 Média | UI | CT-ARQV-001 |
| CT-ARQV-006 | Supervisor apaga arquivo de outro operador | Usuário logado como Supervisor; arquivo na central enviado por operador diferente | 1. Acessar central de arquivos 2. Selecionar arquivo de outro operador 3. Clicar em "Apagar" 4. Confirmar | Exclusão bem-sucedida; toast "Arquivo apagado com sucesso!"; arquivo removido da central e do histórico; log de auditoria registrado com supervisor como responsável | 🔴 Alta | UI | — |
| CT-ARQV-007 | Encaminhar para contato bloqueado | Arquivo selecionado; contato bloqueado no sistema ⚠️ Bloqueável — verificar existência de contato bloqueado | 1. Selecionar arquivo 2. Clicar em "Encaminhar" 3. Buscar e selecionar contato bloqueado 4. Confirmar | Mensagem de erro exibida: "Não é possível encaminhar para este contato"; encaminhamento não executado; arquivo permanece na central | 🔴 Alta | UI | — |
| CT-ARQV-008 | Operador tenta apagar arquivo de outro operador | Usuário logado como Operador comum; arquivo na central enviado por outro operador | 1. Selecionar arquivo enviado por outro operador 2. Clicar em "Apagar" | Mensagem de erro: "Você não tem permissão para apagar este arquivo"; exclusão não executada; arquivo permanece na central | 🔴 Alta | UI | — |
| CT-ARQV-009 | Cancelar confirmação de exclusão — arquivo permanece | Arquivo selecionado; modal de confirmação visível | 1. Selecionar arquivo e clicar em "Apagar" 2. No modal de confirmação, clicar em "Cancelar" | Modal fecha; arquivo permanece na central e no histórico; nenhuma requisição de exclusão executada; nenhum toast exibido | 🟡 Média | UI | — |
| CT-ARQV-010 | Timeout no encaminhamento — toast de erro com retry | Encaminhamento iniciado; backend demorando > 30s ⚠️ Bloqueável — simular via mock/proxy | 1. Iniciar encaminhamento 2. Aguardar timeout de 30 segundos | Toast de erro vermelho com mensagem "Não foi possível encaminhar o arquivo. Tente novamente." e botão "Tentar novamente"; operação falhou sem alterar estado da central | 🟡 Média | UI | — |
| CT-ARQV-011 | Tentar apagar arquivo já deletado | Arquivo excluído em outra sessão/aba; operador tenta apagar o mesmo | 1. Selecionar referência de arquivo já deletado 2. Confirmar exclusão | Mensagem de erro: "Este arquivo já foi removido"; central atualiza removendo a referência pendente; nenhum crash ou loop de loading | 🟡 Média | UI | — |
| CT-ARQV-012 | Barra de ações exibida corretamente na seleção | Central aberta; arquivos disponíveis | 1. Selecionar 1 arquivo 2. Verificar barra de ações flutuante | Barra flutuante exibe botões "Encaminhar" e "Apagar" ativos; ao desmarcar todos os arquivos, barra desaparece | 🟢 Baixa | UI | — |
| CT-ARQV-013 | Arquivo deletado ausente em buscas e listagem | Arquivo deletado com sucesso (CT-ARQV-002) | 1. Abrir central de arquivos 2. Verificar se arquivo deletado aparece 3. Realizar busca pelo nome do arquivo deletado | Arquivo não aparece na listagem da central; não retornado em buscas; referência no histórico de conversa exibe "[Arquivo removido]" ou está ausente | 🔴 Alta | UI | CT-ARQV-002 |
| CT-ARQV-014 | Encaminhar 50 arquivos (limite máximo) | Central com ≥ 50 arquivos ⚠️ Bloqueável — pode não existir no ambiente de teste | 1. Selecionar exatamente 50 arquivos 2. Clicar em "Encaminhar" 3. Selecionar contato 4. Confirmar | Todos os 50 arquivos encaminhados com sucesso; toast "[50] arquivo(s) encaminhado(s) com sucesso!" | 🟡 Média | UI | CT-ARQV-003 |
| CT-ARQV-015 | Bypass de permissão de exclusão via API | Usuário logado como Operador; arquivo_id de outro operador | 1. Obter token de autenticação do Operador 2. Chamar diretamente DELETE /api/v1/files/:id (arquivo de outro operador) com o token | HTTP 403 Forbidden; arquivo não excluído; resposta com mensagem de permissão negada | 🔴 Alta | API | — |
| CT-ARQV-016 | Audit log registrado após exclusão de arquivo | Arquivo excluído com sucesso; acesso a logs de auditoria | 1. Executar exclusão de arquivo (CT-ARQV-002) 2. Verificar registro no log de auditoria | Log registrado contendo: quem deletou (user_id, role), quando (timestamp), qual arquivo (file_id, nome); nenhum campo ausente | 🔴 Alta | API | CT-ARQV-002 |
| CT-ARQV-017 | Eventos analytics disparados corretamente | Arquivo encaminhado e arquivo excluído com sucesso | 1. Encaminhar arquivo → verificar evento `file_forwarded` 2. Excluir arquivo → verificar evento `file_deleted` | `file_forwarded` disparado com propriedades: file_id, contact_id, quantity; `file_deleted` disparado com: file_id, deleted_by, quantity; ambos com valores corretos | 🟡 Média | API | CT-ARQV-001 |

---

## BLOCO 4 — Cenários Gherkin (BDD)

### CT-ARQV-001 — Encaminhar arquivo individual com sucesso

```gherkin
Cenário: Operador encaminha arquivo da central para outro contato
  Dado que o operador está logado e a Central de Arquivos do contato está aberta
  E existe ao menos um arquivo (mídia ou documento) na central
  E existe um contato destino ativo no sistema
  Quando o operador seleciona 1 arquivo e clica em "Encaminhar"
  E busca e seleciona o contato destino no modal
  E clica em "Encaminhar" para confirmar
  Então o arquivo é enviado como nova mensagem no chat do contato destino
  E os metadados originais (nome, data) são preservados
  E o arquivo permanece visível na central de origem
  E o toast verde "Arquivo encaminhado com sucesso!" é exibido
```

### CT-ARQV-008 — Operador sem permissão para apagar arquivo alheio

```gherkin
Cenário: Operador comum não pode apagar arquivo enviado por outro operador
  Dado que o usuário está logado como Operador (não supervisor)
  E a Central de Arquivos contém um arquivo enviado por outro operador
  Quando o operador seleciona esse arquivo e clica em "Apagar"
  Então a mensagem de erro "Você não tem permissão para apagar este arquivo" é exibida
  E o arquivo não é removido da central
  E nenhuma requisição de exclusão é enviada para a API
```

---

**Resumo:** 17 cenários — 🔴 8 Alta | 🟡 7 Média | 🟢 2 Baixa
