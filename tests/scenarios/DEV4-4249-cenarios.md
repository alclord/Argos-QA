# Cenários de Teste — DEV4-4249
> Card: [Nova Interface] Central de arquivos do contato na conversa (Mídias, Documentos e Links)
> Gerado em: 2026-06-01
> Card atualizado em: 2026-05-29T13:07:36.871-0300

---

## PASSO 0.5 — Resumo do Card

- **Título:** [Nova Interface] Central de arquivos do contato na conversa (Mídias, Documentos e Links)
- **Tipo:** História
- **Prioridade:** Medium
- **Status:** Aguardando Cenários de Teste
- **Atualizado em:** 2026-05-29T13:07:36.871-0300
- **Épico pai:** GPD-61 — Melhorias e Implementações da Nova Interface
- **Objetivo:** Criar uma Central de Arquivos dentro dos detalhes do contato com 3 abas (Mídias, Documentos, Links), agrupamento cronológico por mês, seleção em lote com ações contextuais (encaminhar, responder, baixar) e empty state por categoria.
- **Escopo — O que está incluído:** Botão "Arquivos" nos detalhes do contato; abas navegáveis (Mídias, Documentos, Links); agrupamento por mês; visualização expandida para imagens/vídeos; download automático de documentos; abertura de links em nova aba; seleção em lote com barra de ações; modal de encaminhamento; empty state; Desktop e Mobile.
- **Escopo — O que NÃO está incluído:** Edição, upload direto, exclusão, compartilhamento social, metadados avançados.
- **Regras de Negócio identificadas:**
  1. Indexação automática de todos os arquivos da conversa (histórico completo)
  2. Categorização por extensão: Vídeos (avi,mp4,mpeg,mov,rmvb,mkv,webm), Áudios (ogg,mp3,wav,wma,flac,pcm), Imagens (png,jpeg,jpg,gif,svg,tiff,psd), Documentos (pdf,txt,doc,xlsx,xls,exe,sql,csv,zip,html,odt), Links (URLs no texto)
  3. Ação "Responder" desabilitada com 2 ou mais itens selecionados
  4. "Selecionar tudo" opera apenas na aba ativa
  5. Ação "Baixar" sempre oculta na aba Links
  6. Contador reflete apenas itens da aba ativa
- **Critérios de Aceite identificados:** CT-01 a CT-23 (seção 8 do card)
- **Subtasks / dependências:** Nenhuma

✅ Card suficientemente detalhado para cobertura de testes.

---

## BLOCO 1 — Estratégia de Teste

A feature implementa uma Central de Arquivos com 3 abas, agrupamento por mês e seleção em lote. Criticidade calculada ALTA (75/100). Testes aplicáveis: **funcional** (acesso, categorização e interação com cada tipo de arquivo), **regressão** (seleção em lote e comportamento da barra de ações), **UX** (empty state, hover, mobile) e **segurança** (acesso sem autenticação). Execução prioritária: seleção em lote com regras críticas (Responder desabilitado; Baixar oculto em Links; Selecionar tudo scoped à aba ativa). Riscos principais: categorização incorreta por extensão e comportamento divergente da barra de ações ao trocar de aba.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Arquivo categorizado na aba errada por erro de mapeamento de extensão | M | A | Alta |
| Botão "Responder" não desabilita com múltiplas seleções | M | A | Alta |
| Ação "Baixar" visível na aba Links (violação de RN) | M | A | Alta |
| Modal de encaminhamento não abre ou não envia corretamente | M | A | Alta |
| Agrupamento por mês incorreto | M | M | Média |
| Empty state não exibido ao trocar de aba sem arquivos | B | M | Média |
| Seleção de uma aba persiste ao trocar de aba (viola RN-4) | B | M | Média |
| Visualização expandida com proporção distorcida | B | M | Média |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-ARQUIVO-001 | Botão Arquivos abre central com 3 abas | Operador autenticado; conversa com ao menos 1 arquivo | 1. Acessar detalhes do contato na conversa. 2. Verificar presença do botão "Arquivos". 3. Clicar em "Arquivos". 4. Verificar abas exibidas. | Botão "Arquivos" visível. Central abre com abas Mídias, Documentos e Links. (CA: CT-01, CT-02) | 🔴 Alta | UI | — |
| CT-ARQUIVO-002 | Itens aparecem na aba correta por extensão | CT-ARQUIVO-001 concluído; conversa com 1 imagem JPG, 1 PDF, 1 URL compartilhados | 1. Na central, verificar aba Mídias. 2. Verificar aba Documentos. 3. Verificar aba Links. | Imagem JPG aparece apenas em Mídias. PDF aparece apenas em Documentos. URL aparece apenas em Links. Nenhum item duplicado entre abas. (CA: CT-03; RN-2) | 🔴 Alta | UI | CT-ARQUIVO-001 |
| CT-ARQUIVO-003 | Download automático ao clicar em documento | CT-ARQUIVO-001; aba Documentos com ao menos 1 PDF | 1. Na aba Documentos, clicar sobre um arquivo PDF. | Download iniciado automaticamente no browser com extensão correta (.pdf). Nenhuma interação adicional é necessária. (CA: CT-08) | 🔴 Alta | UI | CT-ARQUIVO-001 |
| CT-ARQUIVO-004 | Encaminhar arquivo via modal de encaminhamento | CT-ARQUIVO-001; ao menos 1 mídia disponível | 1. Selecionar 1 mídia (hover exibe checkbox; clicar para marcar). 2. Clicar em "Encaminhar" na barra de ações. 3. Selecionar contato destinatário. 4. Confirmar encaminhamento. | Modal de encaminhamento abre com campo de seleção de destinatário. Arquivo é encaminhado ao contato escolhido. Barra de ações desaparece após confirmação. (CA: CT-14) | 🔴 Alta | UI | CT-ARQUIVO-001 |
| CT-ARQUIVO-005 | Empty state em aba sem arquivos | Operador autenticado; conversa com apenas mídias | 1. Abrir central de arquivos. 2. Clicar na aba "Documentos". | Mensagem: "Este contato ainda não tem arquivos compartilhados. Envie documentos e informações com segurança agora mesmo." Ícone da categoria vazia exibido. Nenhum item listado. (CA: CT-05) | 🟡 Média | UI | CT-ARQUIVO-001 |
| CT-ARQUIVO-006 | Responder desabilitado com múltiplas seleções | CT-ARQUIVO-001; aba Mídias com ao menos 2 itens | 1. Passar o mouse sobre 1 mídia e verificar que checkbox aparece. 2. Clicar para selecionar 1a mídia (barra de ações aparece). 3. Selecionar 2a mídia. 4. Verificar botão "Responder". | Passo 1: checkbox visível no hover (CA: CT-10). Passo 3: contador exibe "X mídias selecionadas". Passo 4: botão "Responder" desabilitado e não clicável. (CA: CT-12, CT-16; RN-3) | 🔴 Alta | UI | CT-ARQUIVO-001 |
| CT-ARQUIVO-007 | Baixar sempre oculto na aba Links | CT-ARQUIVO-001; aba Links com ao menos 1 URL | 1. Selecionar 1 link. 2. Verificar barra de ações. 3. Clicar "Selecionar tudo". 4. Verificar barra novamente. | Em ambas as verificações o botão "Baixar" está ausente da barra de ações. Botões Encaminhar, Responder e Fechar exibidos normalmente. (CA: CT-19; RN-5) | 🔴 Alta | UI | CT-ARQUIVO-001 |
| CT-ARQUIVO-008 | Agrupamento correto por meses com ordenação interna | Conversa com arquivos enviados em ao menos 2 meses distintos, com 2+ arquivos no mesmo mês | 1. Abrir central na aba Mídias. 2. Verificar agrupamento por mês. 3. Dentro do mesmo mês, verificar ordem dos arquivos. | Arquivos agrupados com cabeçalho de mês (ex: "Maio", "Abril"). Arquivos de meses distintos não aparecem misturados. Dentro do mesmo mês, ordenados cronologicamente por data/hora de envio. (CA: CT-04; RN de Ordenação) | 🟡 Média | UI | CT-ARQUIVO-001 |
| CT-ARQUIVO-009 | Selecionar tudo é scoped à aba ativa | CT-ARQUIVO-001; abas Documentos e Mídias com itens | 1. Na aba Documentos, selecionar 1 item (barra aparece). 2. Clicar "Selecionar tudo". 3. Verificar contador. 4. Clicar "Fechar". 5. Trocar para aba Mídias. 6. Verificar seleção. | Passo 2: todos os documentos marcados. Passo 3: contador reflete total de documentos da aba. Passo 4: itens desmarcados, barra desaparece. Passo 6: nenhum item em Mídias está selecionado. (CA: CT-13, CT-18; RN-4) | 🟡 Média | UI | CT-ARQUIVO-001 |
| CT-ARQUIVO-010 | Acesso sem autenticação é bloqueado | Usuário sem sessão ativa | 1. Tentar acessar a tela de detalhes do contato sem estar autenticado. | Usuário é redirecionado para tela de login. Nenhum dado ou arquivo é exposto. | 🔴 Alta | UI | — |
| CT-ARQUIVO-011 | Requisição de arquivos sem token retorna 401 | Sem sessão; ferramenta de API (Postman ou DevTools) | 1. Enviar requisição GET ao endpoint de listagem de arquivos sem header de autenticação. | API retorna HTTP 401. Nenhum dado de arquivo é retornado. | 🔴 Alta | API | — |
| CT-ARQUIVO-012 | Baixar itens via barra de ações em lote | CT-ARQUIVO-001; aba Documentos com ao menos 2 itens | 1. Selecionar 2 documentos. 2. Clicar "Baixar" na barra de ações. | Downloads iniciados com nome e extensão corretos para cada arquivo selecionado. (CA: CT-17) | 🟡 Média | UI | CT-ARQUIVO-001 |
| CT-ARQUIVO-013 | Visualização expandida de vídeo com controles | CT-ARQUIVO-001; aba Mídias com ao menos 1 vídeo (MP4, MOV etc.) | 1. Clicar sobre um vídeo na aba Mídias. | Visualização expandida abre com o vídeo em proporção preservada. Opções de interação (reprodução, fechar, download) visíveis. Nenhum corte ou distorção visual. (CA: CT-07, CT-22) | 🟡 Média | UI | CT-ARQUIVO-001 |
| CT-ARQUIVO-014 | Central responsiva no Mobile | Operador autenticado em dispositivo mobile ou viewport reduzida; conversa com arquivos | 1. Acessar central de arquivos no Mobile. 2. Selecionar 2 itens. 3. Verificar barra de ações. | Layout responsivo adapta-se à tela. Barra de ações em lote permanece visível no topo com contador. (CA: CT-20, CT-21) | 🟡 Média | UI | CT-ARQUIVO-001 |
| CT-ARQUIVO-015 | Extensão incomum categorizada em Documentos | Operador autenticado; conversa com arquivo .exe ou .sql compartilhado | 1. Abrir central de arquivos. 2. Navegar pela aba Documentos. 3. Verificar aba Mídias. | Arquivo .exe ou .sql aparece apenas na aba Documentos. Aba Mídias não exibe o arquivo. (RN-2 — extensões incomuns) | 🟢 Baixa | UI | CT-ARQUIVO-001 |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Cenário: Central de arquivos categoriza itens corretamente por aba
  Dado que sou operador autenticado em uma conversa ativa
  E a conversa possui ao menos 1 imagem JPG, 1 documento PDF e 1 URL compartilhados
  Quando acesso os detalhes do contato e clico em "Arquivos"
  Então a central abre com as abas "Mídias", "Documentos" e "Links"
  E a aba "Mídias" exibe apenas a imagem compartilhada
  E a aba "Documentos" exibe apenas o PDF compartilhado
  E a aba "Links" exibe apenas a URL compartilhada
```

```gherkin
Cenário: Botão Baixar nunca aparece na aba Links
  Dado que sou operador autenticado com a central de arquivos aberta
  E estou na aba "Links" com ao menos 1 URL listada
  Quando seleciono 1 link
  Então a barra de ações exibe Encaminhar, Responder e Fechar
  E o botão "Baixar" NÃO está presente na barra
  Quando clico em "Selecionar tudo"
  Então o botão "Baixar" continua ausente para qualquer quantidade de links selecionados
```

---

## Validação por Agente Crítico

```
✅ Validação concluída:
   Aprovados sem alteração: 4 (CT-ARQUIVO-004, CT-ARQUIVO-005, CT-ARQUIVO-007, CT-ARQUIVO-011 original)
   Revisados: 8 (CT-001→split, CT-002, CT-003, CT-005→006, CT-007→008, CT-008→009, CT-009→010/011, CT-010→013)
   Adicionados por cobertura insuficiente: 3 (CT-013, CT-014, CT-015)
   Total final: 15 cenários
```
