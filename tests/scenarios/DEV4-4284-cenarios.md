# Cenários de Teste — DEV4-4284
> Card: Criação de Mensagens Rápidas no chat
> Gerado em: 2026-06-01
> Card atualizado em: 2026-05-29T17:52:07.078-0300

---

## PASSO 0.5 — Resumo do Card

- **Título:** Criação de Mensagens Rápidas no chat
- **Tipo:** História
- **Prioridade:** Medium
- **Status:** Aguardando Cenários de Teste
- **Atualizado em:** 2026-05-29T17:52:07.078-0300
- **Épico pai:** Não informado
- **Objetivo:** Permitir que operadores criem e editem mensagens rápidas diretamente do editor de mensagens do chat, sem sair da conversa — resolvendo lacuna crítica da migração do Legado (criticidade calculada 90/100).
- **Escopo — O que está incluído:** Botão "+ Msg. Rápida" no editor; modal de criação/edição (nome, categoria, conteúdo); validação nome (3-100 chars, único case-insensitive); validação conteúdo (10-5000 chars); estados de loading/sucesso/erro; sincronização com seletor em até 5s; permissão "criar_mensagens_rapidas".
- **Escopo — O que NÃO está incluído:** Exclusão de mensagens rápidas; controle de permissões avançado; versionamento de histórico; integração com IA; compartilhamento entre equipes.
- **Regras de Negócio identificadas:**
  1. Nome: obrigatório, 3-100 chars, único por account+perfil (case-insensitive), chars: a-z, A-Z, 0-9, hífen, underscore, espaço
  2. Conteúdo: obrigatório, 10-5000 chars
  3. Categoria vazia → salva como "Sem categoria"
  4. Apenas operadores com permissão "criar_mensagens_rapidas" acessam o botão
  5. Operador edita apenas suas próprias mensagens (supervisor: time; gestor: qualquer)
  6. Sincronização: nova mensagem aparece no seletor em até 5 segundos
  7. API: POST /api/v1/quick-messages (criação → 201); PUT /api/v1/quick-messages/:id (edição → 200)
  8. Modal fecha com alerta "Descartar alterações?" se houver mudanças não salvas
- **Critérios de Aceite identificados:** Funcionalidade Base, Validação, Criação & Sincronização, Edição, Backend, UX (seção 8 do card)
- **Subtasks / dependências:** Nenhuma

✅ Card suficientemente detalhado para cobertura de testes.

---

## BLOCO 1 — Estratégia de Teste

Feature crítica da migração do Legado com criticidade 90/100. Testes aplicáveis: **funcional** (criação/edição, validação, sincronização), **API** (POST/PUT, validação backend), **UX** (responsividade, foco, alerta de descarte) e **segurança** (acesso por perfil sem permissão, XSS). Execução prioritária: criação com sucesso e sincronização (<5s), validações de nome curto/duplicado e controle de permissão. Risco principal: ausência de validação no backend permite dados inválidos bypassando o frontend.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Nova mensagem não aparece no seletor em até 5 segundos | M | A | Alta |
| Backend aceita campos inválidos (validação apenas frontend) | M | A | Alta |
| Operador sem permissão acessa o botão "+ Msg. Rápida" | B | A | Alta |
| Nome duplicado não detectado (case-insensitive falha) | M | M | Alta |
| XSS injetado no campo "Conteúdo" executado no preview | B | A | Alta |
| Modal fecha sem alerta ao ter alterações não salvas | M | M | Média |
| Edição salva dados de outra mensagem (ID incorreto no PUT) | B | A | Alta |
| Teclado mobile cobre botões de ação do modal | M | M | Média |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-MSG-001 | Criar mensagem rápida com dados válidos | Operador com permissão "criar_mensagens_rapidas"; conversa ativa | 1. No editor de mensagens, clicar em "+ Msg. Rápida". 2. Verificar foco automático no campo "Nome". 3. Preencher "Nome" (ex: "Saudação padrão") e "Conteúdo" com ao menos 10 chars. 4. Clicar em "Salvar". | Modal abre com foco no campo "Nome". Ao salvar: spinner exibido, POST /api/v1/quick-messages retorna 201, toast "Mensagem criada com sucesso" por 2s, modal fecha automaticamente. (CA: Funcionalidade Base + Criação) | 🔴 Alta | UI | — |
| CT-MSG-002 | Nova mensagem aparece no seletor em até 5 segundos | CT-MSG-001 concluído | 1. Imediatamente após salvar (modal fechar), abrir o seletor de mensagens rápidas no editor. 2. Aguardar até 5 segundos cronometrados a partir do salvamento. | A mensagem criada em CT-MSG-001 aparece na lista do seletor em até 5 segundos sem recarregar a página. (RN-6; CA: Seletor atualiza em tempo real) | 🔴 Alta | UI | CT-MSG-001 |
| CT-MSG-003 | Editar mensagem rápida existente com sucesso | Operador com permissão; ao menos 1 mensagem rápida própria existente no account | 1. Abrir modal de edição da mensagem rápida. 2. Verificar que dados estão preenchidos corretamente. 3. Alterar o campo "Conteúdo". 4. Clicar em "Salvar". | Dados preenchidos corretamente no formulário. PUT /api/v1/quick-messages/:id retorna 200. Toast "Mensagem atualizada com sucesso" exibido. (CA: Edição + RN-7) | 🔴 Alta | UI | CT-MSG-001 |
| CT-MSG-004 | Nome com menos de 3 chars exibe erro de validação | Operador com permissão; modal de criação aberto | 1. No campo "Nome", digitar "AB" (2 chars). 2. Clicar em "Salvar". 3. Limpar o campo. 4. Deixar "Nome" vazio. 5. Clicar em "Salvar". | Passo 2: campo destacado em vermelho, mensagem de erro exibida. Nenhuma chamada API disparada. Passo 5: mesmo comportamento para campo vazio. (RN-1; CA: Validação) | 🔴 Alta | UI | — |
| CT-MSG-005 | Conteúdo com menos de 10 chars exibe erro | Operador com permissão; nome válido preenchido no modal | 1. Preencher "Nome" com valor válido (ex: "Teste"). 2. No campo "Conteúdo", digitar "Olá" (3 chars). 3. Clicar em "Salvar". 4. Limpar e deixar "Conteúdo" vazio. 5. Clicar em "Salvar". | Passo 3 e 5: campo "Conteúdo" destacado com mensagem de erro. Formulário não submetido. Nenhuma chamada API. (RN-2; CA: Validação) | 🔴 Alta | UI | — |
| CT-MSG-006 | Conteúdo no limite máximo (5000 chars) é aceito; 5001 chars é rejeitado | Operador com permissão; modal de criação aberto | 1. Preencher "Conteúdo" com exatamente 5000 chars. 2. Clicar em "Salvar". 3. Retornar e adicionar 1 char (5001 total). 4. Clicar em "Salvar". | Passo 2: salvo com sucesso (RN-2 — borda válida). Passo 4: erro de validação exibido (5001 chars excede o limite). | 🟡 Média | UI | — |
| CT-MSG-007 | Nome duplicado exibe aviso (case-insensitive) | Operador com permissão; mensagem "Saudação padrão" existente no mesmo account e perfil | 1. Abrir modal de criação. 2. Preencher "Nome" com "saudação padrão" (minúsculas). 3. Preencher "Conteúdo" válido. 4. Clicar em "Salvar". | Aviso de duplicata exibido (em tempo real ou ao tentar salvar). Formulário não submetido com nome duplicado. (RN-1 — case-insensitive) | 🟡 Média | UI | CT-MSG-001 |
| CT-MSG-008 | Fechar modal com alterações não salvas exibe alerta | Operador com permissão; modal com texto digitado mas não salvo | 1. Abrir modal de criação. 2. Digitar algo no campo "Nome". 3. Clicar no "X" para fechar. 4. Clicar em "Cancelar". 5. Abrir modal novamente e digitar. 6. Pressionar ESC. | Passos 3, 4 e 6: alerta "Descartar alterações?" exibido. Ao confirmar "Sim": modal fecha sem salvar. Ao responder "Não": modal permanece aberto com dados preservados. (RN-8; CA: UX) | 🟡 Média | UI | — |
| CT-MSG-009 | Operador sem permissão não vê o botão | Operador autenticado SEM permissão "criar_mensagens_rapidas" | 1. Navegar para uma conversa ativa. 2. Verificar o editor de mensagens. | Botão "+ Msg. Rápida" ausente no editor. Funcionalidade inacessível ao perfil. (RN-4) | 🔴 Alta | UI | — |
| CT-MSG-010 | Backend rejeita campos inválidos independentemente do frontend | Operador com permissão; ferramenta de API (Postman) | 1. Enviar POST /api/v1/quick-messages com body: `{"name": "AB", "content": ""}`. | API retorna erro (conforme especificação da API, ex: 422 ou 400) com detalhes de validação. Mensagem não criada no banco. (CA: Validação backend) | 🔴 Alta | API | — |
| CT-MSG-011 | XSS no conteúdo não é executado | Operador com permissão; modal de criação | 1. Preencher "Nome" válido. 2. No campo "Conteúdo", inserir `<script>alert('xss')</script>`. 3. Salvar. 4. Abrir o seletor e localizar a mensagem. | Script não executado em nenhum momento (criação, listagem, uso). Conteúdo exibido de forma inofensiva no seletor (sem alert pop-up). | 🔴 Alta | UI | CT-MSG-001 |
| CT-MSG-012 | Operador não consegue editar mensagem de outro operador | Operador A autenticado; mensagem rápida criada pelo Operador B no mesmo account | 1. Operador A tenta localizar e editar a mensagem do Operador B. | Opção de edição ausente na listagem ou, se acessada, bloqueada com mensagem de permissão. Mensagem do Operador B não é alterada. (RN-5) | 🟡 Média | UI | CT-MSG-001 |
| CT-MSG-013 | Salvar sem categoria usa "Sem categoria" como padrão | Operador com permissão; modal de criação com nome e conteúdo válidos | 1. Preencher "Nome" e "Conteúdo" válidos. 2. Deixar campo "Categoria" vazio. 3. Clicar em "Salvar". | Mensagem criada com sucesso. Categoria exibida como "Sem categoria" no seletor. (RN-3) | 🟢 Baixa | UI | CT-MSG-001 |
| CT-MSG-014 | Nome com chars inválidos é rejeitado | Operador com permissão; modal de criação | 1. No campo "Nome", digitar "Teste@#!" (chars especiais não permitidos). 2. Verificar comportamento em tempo real ou ao salvar. | Chars inválidos são prevenidos ou exibem erro de validação. Formulário não submetido. (RN-1 — chars permitidos) | 🟡 Média | UI | — |
| CT-MSG-015 | Nome com exatamente 3 chars é aceito (borda válida) | Operador com permissão; modal de criação | 1. No campo "Nome", digitar "abc" (3 chars). 2. Preencher "Conteúdo" válido. 3. Salvar. | Nenhum erro de validação para o nome. Mensagem criada com sucesso. (RN-1 — borda mínima) | 🟢 Baixa | UI | — |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Cenário: Criar mensagem rápida com sucesso e sincronizar no seletor
  Dado que sou operador com permissão "criar_mensagens_rapidas" em conversa ativa
  Quando clico em "+ Msg. Rápida" no editor
  E preencho "Nome" com "Saudação padrão" e "Conteúdo" com ao menos 10 caracteres
  E clico em "Salvar"
  Então a API POST /api/v1/quick-messages retorna 201
  E o toast "Mensagem criada com sucesso" é exibido por 2 segundos
  E o modal fecha automaticamente
  E em até 5 segundos a mensagem aparece no seletor de mensagens rápidas
```

```gherkin
Cenário: Backend rejeita nome duplicado independentemente do frontend
  Dado que sou operador com permissão "criar_mensagens_rapidas"
  E existe mensagem "Saudação padrão" no meu account e perfil
  Quando envio POST /api/v1/quick-messages com nome "saudação padrão" (minúsculas)
  Então a API retorna erro de validação
  E a mensagem não é criada no banco de dados
```

---

## Validação por Agente Crítico

```
✅ Validação concluída:
   Aprovados sem alteração: 1 (CT-MSG-009)
   Revisados: 9 (CT-001, CT-002, CT-003, CT-004, CT-005, CT-006→limite máximo, CT-007, CT-008, CT-011)
   Removidos (fora de escopo): 2 (CT-MSG-008 variáveis — não rastreável ao card; CT-MSG-012 auditoria — não rastreável)
   Adicionados por cobertura insuficiente: 5 (CT-006 borda 5000/5001, CT-012 edição alheia, CT-013 categoria, CT-014 chars inválidos, CT-015 borda mín nome)
   Total final: 15 cenários
```
