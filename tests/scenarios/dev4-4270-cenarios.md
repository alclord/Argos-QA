# Cenários de Teste — DEV4-4270
> Card: Anexos em anotações internas não são exibidos no fluxo do chat
> Gerado em: 2026-05-28
> Card atualizado em: 2026-05-27T18:48:33 -0300

---

## Resumo do Card

- **Tipo:** Bug
- **Prioridade:** Medium
- **Status:** Aguardando Cenários de Teste
- **Objetivo:** Ao criar uma anotação interna com arquivo anexado na Nova Interface, o anexo é salvo corretamente, mas não é renderizado no fluxo de mensagens do chat. A correção deve exibir o arquivo no fluxo do chat junto com a label "Anotação interna", sem alterar a exibição no painel lateral de Anotações nem expor o arquivo ao contato.

---

## BLOCO 1 — Estratégia de Teste

O escopo cobre a correção de um bug de renderização na Nova Interface (foundation-spa): anexos de anotações internas já eram salvos corretamente, mas não apareciam no fluxo do chat. Tipos de teste aplicáveis: **funcional** (anexo aparece no chat), **regressão** (texto-only ainda funciona; painel lateral não regride), **persistência** (reload e navegação), **borda** (múltiplos anexos, documentos), **negativo** (falha de upload, acesso não autenticado, arquivo corrompido) e **segurança** (arquivo não enviado ao contato). Prioridade: CT-ANOT-001 e CT-ANOT-002 primeiro (validação direta do fix), seguidos de CT-ANOT-009 (privacidade). Risco principal: o fix pode inadvertidamente enviar o arquivo ao contato ou regredir o painel lateral de Anotações.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Fix renderiza o anexo no chat mas o envia acidentalmente ao contato | B | A | 🔴 Alta |
| Fix quebra a exibição do anexo no painel lateral de Anotações (regressão) | B | A | 🟡 Média |
| Diferentes tipos de arquivo (PDF, DOCX) causam crash no componente de renderização | M | M | 🟡 Média |
| Reload da página perde o estado de exibição do anexo (renderização não reidratada) | M | M | 🟡 Média |
| Múltiplas anotações com anexos no mesmo chat geram layout quebrado | B | B | 🟢 Baixa |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-ANOT-001 | Anotação com apenas anexo exibida no chat | User autenticado na Nova Interface; chat ativo em estado `attending`; arquivo de imagem disponível (ex: PNG ou JPG) | 1. Abrir um chat na Nova Interface. 2. Clicar em "Criar anotação" no painel lateral. 3. Anexar uma imagem sem adicionar texto. 4. Salvar a anotação. 5. Verificar o fluxo de mensagens do chat. | A anotação aparece no fluxo do chat com a label "Anotação interna" e o arquivo está visível. Sem tela em branco ou mensagem de erro no lugar do arquivo. | 🔴 Alta | UI | — |
| CT-ANOT-002 | Anotação com texto + anexo exibe ambos no chat | User autenticado; chat ativo; arquivo para upload | 1. Abrir um chat na Nova Interface. 2. Criar anotação. 3. Digitar um texto. 4. Anexar um arquivo. 5. Salvar. 6. Verificar o fluxo do chat. | Anotação aparece no chat com o texto E o arquivo visível, ambos sob a label "Anotação interna". | 🔴 Alta | UI | — |
| CT-ANOT-003 | Anotação apenas com texto continua funcionando | User autenticado; chat ativo | 1. Abrir um chat na Nova Interface. 2. Criar anotação. 3. Digitar apenas texto, sem anexar arquivo. 4. Salvar. 5. Verificar o fluxo do chat. | Anotação com texto aparece no chat com label "Anotação interna". Sem erro. Comportamento idêntico ao anterior ao fix. | 🟡 Média | UI | — |
| CT-ANOT-004 | Painel lateral ainda exibe o anexo após o fix | Anotação com anexo criada (CT-ANOT-001) | 1. Após criar anotação com anexo. 2. Abrir o painel lateral de Anotações. 3. Verificar se o anexo aparece no painel. | O anexo está visível no painel lateral E no fluxo do chat. O fix não regrediu a exibição no painel lateral. | 🟡 Média | UI | CT-ANOT-001 |
| CT-ANOT-005 | Reload da página mantém anexo visível no chat | Anotação com anexo criada (CT-ANOT-001) — borda: testa que a renderização não depende de estado efêmero que se perde ao remontar o componente | 1. Criar anotação com anexo e verificar exibição no chat. 2. Recarregar a página (F5). 3. Reabrir o mesmo chat. 4. Verificar o fluxo. | O anexo continua visível no fluxo do chat após o reload. Não desaparece nem exibe erro de renderização. | 🟡 Média | UI | CT-ANOT-001 |
| CT-ANOT-006 | Navegação entre chats mantém exibição do anexo | Anotação com anexo criada no chat A (CT-ANOT-001) — borda: testa que a desmontagem e remontagem do componente de chat não perde o estado de renderização do anexo | 1. Criar anotação com anexo no chat A. 2. Verificar exibição. 3. Clicar em outro chat. 4. Retornar ao chat A. 5. Verificar o fluxo. | O anexo continua visível no fluxo do chat A após navegação de ida e volta. | 🟡 Média | UI | CT-ANOT-001 |
| CT-ANOT-007 | Múltiplas anotações com anexos renderizadas no mesmo chat | Ao menos 2 arquivos distintos disponíveis para upload; chat ativo | 1. Criar primeira anotação com anexo no chat. 2. Criar segunda anotação com outro arquivo no mesmo chat. 3. Verificar o fluxo do chat. | Ambas as anotações aparecem no fluxo com seus respectivos arquivos. Sem sobreposição visual ou perda de renderização de nenhuma delas. | 🟡 Média | UI | CT-ANOT-001 |
| CT-ANOT-008 | Documento (não-imagem) exibe adequadamente no chat | User autenticado; arquivo de documento disponível (ex: PDF) | 1. Criar anotação com um arquivo PDF. 2. Salvar. 3. Verificar o fluxo do chat. | O documento aparece no fluxo do chat com a label "Anotação interna", de forma não vazia e sem erro. O modo de exibição (ícone, thumbnail ou link) deve ser visualmente validado conforme o padrão da interface — qualquer exibição não vazia é considerada aprovada. | 🟢 Baixa | UI | — |
| CT-ANOT-009 | Arquivo da anotação não é entregue ao contato | User autenticado como agente; chat ativo; anotação com anexo criada (CT-ANOT-001) | 1. Criar anotação com anexo no chat. 2. Verificar que aparece no chat do agente com label "Anotação interna". 3. Verificar no canal do contato (ex: WhatsApp ou Webchat) se alguma mensagem ou arquivo foi recebido após a criação da anotação. | O contato NÃO recebe nenhuma mensagem nem arquivo relacionado à anotação interna. Apenas o time operacional visualiza o conteúdo. | 🔴 Alta | UI | CT-ANOT-001 |
| CT-ANOT-010 | Falha no upload do arquivo exibe erro adequado | User autenticado; DevTools disponível para simular falha de rede (Network → Block request URL ou throttle para offline durante o upload) | 1. Criar anotação e selecionar arquivo para upload. 2. Antes de salvar, configurar DevTools para bloquear a request de upload. 3. Tentar salvar a anotação. 4. Verificar comportamento da interface. | Interface exibe mensagem de erro informando falha no upload. A anotação NÃO é salva com campo de anexo vazio. O usuário tem ciência de que o upload falhou e pode tentar novamente. | 🟡 Média | UI | — |
| CT-ANOT-011 | URL direta do arquivo inacessível sem autenticação | Anotação com anexo criada (CT-ANOT-001); DevTools para obter a URL do arquivo armazenado | 1. Criar anotação com anexo. 2. No DevTools (aba Network), identificar a URL do arquivo armazenado. 3. Copiar a URL e abrí-la em uma aba anônima sem sessão autenticada. | HTTP 401 ou 403. O arquivo não é acessível sem credenciais válidas. | 🟡 Média | UI | CT-ANOT-001 |
| CT-ANOT-012 | Arquivo corrompido não quebra o fluxo do chat | User autenticado; arquivo corrompido ou com extensão incomum disponível para upload | 1. Criar anotação e tentar anexar um arquivo corrompido (ex: arquivo renomeado com extensão de imagem mas conteúdo inválido). 2. Salvar. 3. Verificar o fluxo do chat. | O fluxo do chat não quebra nem exibe tela em branco. A interface exibe mensagem de erro adequada durante o upload ou um placeholder de erro no lugar do arquivo corrompido. | 🟡 Média | UI | — |

**Resumo:** 12 cenários — 🔴 3 Alta | 🟡 8 Média | 🟢 1 Baixa

---

## BLOCO 4 — Cenários Gherkin (BDD)

Os dois cenários 🔴 Alta mais diretamente relacionados ao bug:

```gherkin
Cenário: Anotação com apenas anexo é exibida no fluxo do chat
  Dado que o agente está autenticado na Nova Interface
  E que há um chat ativo em estado de atendimento
  Quando o agente cria uma anotação interna anexando uma imagem sem texto
  E salva a anotação
  Então a anotação deve aparecer no fluxo do chat com a label "Anotação interna"
  E o arquivo deve estar visível no fluxo do chat
```

```gherkin
Cenário: Anotação com texto e anexo exibe ambos no fluxo do chat
  Dado que o agente está autenticado na Nova Interface
  E que há um chat ativo em estado de atendimento
  Quando o agente cria uma anotação interna com texto e um arquivo anexado
  E salva a anotação
  Então o texto da anotação deve aparecer no fluxo do chat com a label "Anotação interna"
  E o arquivo deve estar visível junto ao texto no mesmo bloco da anotação
```

---

## Validação por Agente Crítico Independente

- Aprovados sem alteração: 4 (CT-ANOT-001, CT-ANOT-002, CT-ANOT-003, CT-ANOT-004)
- Revisados: 5 (CT-ANOT-005, CT-ANOT-006, CT-ANOT-007, CT-ANOT-008, CT-ANOT-009)
- Adicionados por cobertura insuficiente: 3 (CT-ANOT-010, CT-ANOT-011, CT-ANOT-012)
