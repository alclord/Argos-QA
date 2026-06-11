# Cenários de Teste — DEV4-4239
> Card: Edição de canais
> Gerado em: 2026-06-02
> Card atualizado em: 2026-06-01T14:50:21.311-0300

---

## Resumo do Card

- **Título:** Edição de canais
- **Tipo:** História
- **Prioridade:** Medium
- **Status:** Aguardando Cenários de Teste
- **Épico pai:** DEV4-4191 — Canais
- **Atualizado em:** 01/06/2026 às 14:50 (BRT)

**Objetivo:** Implementar o fluxo de edição de canais de atendimento já configurados na plataforma (WhatsApp WABA, WhatsApp Broker, Instagram, Messenger e WebChat), utilizando uma gaveta lateral (right sheet) que reutiliza componentes do fluxo de criação. A edição permite alterar nomes internos, distribuição de equipes e parametrizações específicas por tipo de canal, sem expor configurações críticas de infraestrutura que poderiam quebrar a conexão com a Meta.

---

## BLOCO 1 — Estratégia de Teste

O card cobre o fluxo de **edição de canais de atendimento** na foundation-spa, impactando diretamente a gestão de canais (WhatsApp WABA, WhatsApp Broker, Instagram, Messenger e WebChat). Os tipos de teste aplicáveis são: **funcional** (fluxo completo de abertura, edição e salvamento), **regressão** (garantir que componentes reutilizados do fluxo de criação não foram quebrados), **segurança/permissão** (acesso indevido à edição por roles sem privilégio) e **UX/comportamento** (botão Salvar desabilitado, contador em tempo real, estado da faixa de qualidade). A prioridade de execução é **alta para WABA** (integração externa com Meta) e **média para os demais canais**. Os riscos principais são: falha na sincronização de foto com a Meta, campo de número indevidamente habilitado para edição e estado incorreto do botão Salvar.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Campo de número do WABA habilitado para edição indevidamente | M | A | 🔴 Alta |
| Falha na sincronização da foto com o gerenciador Meta | M | A | 🔴 Alta |
| Botão "Salvar" habilitado sem nenhuma alteração feita | M | A | 🔴 Alta |
| Right sheet abre com dados desatualizados (não carregados do backend) | M | A | 🔴 Alta |
| Contador de usuários não reflete a seleção em tempo real | M | M | 🟡 Média |
| "Limpar tudo" não zera a seleção imediatamente | B | M | 🟡 Média |
| Faixa de qualidade WABA não exibe estado "desconectado" quando canal está desativado | M | M | 🟡 Média |
| Ações "Configurar"/"Ativar-Desativar" visíveis para roles sem permissão | B | A | 🟡 Média |
| Right sheet de edição não reutiliza componentes globais do fluxo de criação (regressão visual) | B | M | 🟢 Baixa |
| Dados do canal Broker não exibidos corretamente (status de conexão ausente) | B | M | 🟢 Baixa |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-CANAIS-001 | Abrir edição carrega dados do canal | Usuário com permissão de admin logado; pelo menos um canal de qualquer tipo configurado e ativo | 1. Acessar a lista de canais na plataforma. 2. Localizar um canal ativo. 3. Clicar na ação "Editar" do canal. | A right sheet abre com todos os campos preenchidos com os dados atuais do canal (nome, usuários vinculados, etc.). Nenhum campo aparece vazio ou com valor padrão incorreto. O botão "Salvar" está desabilitado. (RN1) | 🔴 Alta | UI | — |
| CT-CANAIS-002 | Salvar alteração de nome do canal | Canal ativo de qualquer tipo; right sheet aberta | 1. Abrir a right sheet de edição de um canal. 2. Localizar o campo "Nome". 3. Apagar o nome atual e digitar um novo nome válido. 4. Verificar o estado do botão "Salvar". 5. Clicar em "Salvar". | Após alterar o nome, o botão "Salvar" fica habilitado. Ao clicar em "Salvar", a alteração é persistida e o novo nome aparece na listagem de canais. (RN-Implícita Salvar) | 🔴 Alta | UI | CT-CANAIS-001 |
| CT-CANAIS-003 | Botão Salvar desabilitado sem alterações | Canal ativo de qualquer tipo; right sheet aberta | 1. Abrir a right sheet de edição de qualquer canal. 2. Não alterar nenhum campo. 3. Verificar o estado do botão "Salvar". | O botão "Salvar" permanece desabilitado (visualmente e funcionalmente não clicável). (RN-Implícita Salvar) | 🔴 Alta | UI | CT-CANAIS-001 |
| CT-CANAIS-004 | Campo de número WABA somente leitura | Canal WhatsApp WABA configurado e ativo; right sheet aberta | 1. Abrir a right sheet de edição de um canal WhatsApp WABA. 2. Localizar o campo de número de telefone. 3. Tentar clicar e digitar no campo. | O campo de número está desabilitado para edição — não aceita input do teclado e exibe indicador visual de campo somente leitura. (RN-Implícita número WABA) | 🔴 Alta | UI | CT-CANAIS-001 |
| CT-CANAIS-005 | Faixa de qualidade WABA exibe status correto | Canal WhatsApp WABA ativo com saúde conhecida (boa, média ou ruim) | 1. Abrir a right sheet de edição de um canal WhatsApp WABA. 2. Localizar a faixa de qualidade do canal. | A faixa exibe corretamente o status atual do canal: "Boa" (verde #BBEA54 light / #667E37 dark), "Média" (amarelo #FFCA5D light / #896E3B dark) ou "Ruim" (vermelho #FF675F light / #893C9C dark), com as cores em 20–30% de opacidade conforme o status. O ícone de barras de conexão usa as cores em 100% de opacidade. (RN6) | 🔴 Alta | UI | CT-CANAIS-001 |
| CT-CANAIS-006 | Upload de foto sincroniza com Meta (WABA) | Canal WhatsApp WABA ativo; arquivo de imagem válido (JPG/PNG) disponível localmente | 1. Abrir a right sheet de edição de um canal WhatsApp WABA. 2. Clicar em "Adicione uma foto". 3. Selecionar uma imagem válida. 4. Clicar em "Salvar". | A imagem é exibida na plataforma após salvar. A mesma imagem é refletida no gerenciador Meta (https://business.facebook.com/wa/manage/phone-numbers/). | 🔴 Alta | UI | CT-CANAIS-001 |
| CT-CANAIS-007 | Contador de usuários atualiza em tempo real | Canal ativo; right sheet aberta; mais de 1 usuário disponível para vincular | 1. Abrir a right sheet de edição de um canal. 2. Anotar o contador numérico de usuários atual. 3. Selecionar um novo usuário na lista. 4. Observar o contador. 5. Desmarcar o usuário selecionado. 6. Observar o contador novamente. | O contador atualiza imediatamente ao selecionar (+1) e ao desmarcar (-1), sem necessidade de salvar ou recarregar a página. (RN2) | 🟡 Média | UI | CT-CANAIS-001 |
| CT-CANAIS-008 | Botão "Limpar tudo" zera seleção de usuários | Canal ativo com pelo menos 2 usuários vinculados; right sheet aberta | 1. Abrir a right sheet de edição de um canal. 2. Verificar que há usuários vinculados (contador > 0). 3. Clicar no ghost button "Limpar tudo". | Todos os usuários são desmarcados instantaneamente. O contador zera para 0 sem delay. O botão "Salvar" fica habilitado (pois houve alteração). (RN2) | 🟡 Média | UI | CT-CANAIS-001 |
| CT-CANAIS-009 | Faixa de qualidade WABA exibe "desconectado" | Canal WhatsApp WABA desativado | 1. Localizar na listagem um canal WhatsApp WABA que esteja desativado. 2. Abrir a right sheet de edição desse canal. 3. Verificar a faixa de qualidade. | A faixa exibe o status "Desconectado" com a cor cinza (#E2E8F0 light / #262F3D dark em 100% de opacidade). (RN6, RN5) | 🟡 Média | UI | — |
| CT-CANAIS-010 | WhatsApp Broker exibe status de conexão | Canal WhatsApp Broker ativo e conectado | 1. Abrir a right sheet de edição de um canal WhatsApp Broker. 2. Verificar os dados exibidos. | A sheet exibe nome do canal, informações do provedor (conforme layout do Figma) e indicação visual de que o canal está conectado. | 🟡 Média | UI | CT-CANAIS-001 |
| CT-CANAIS-011 | Cancelar edição não persiste alterações | Canal ativo; right sheet aberta com alteração feita no nome | 1. Abrir a right sheet de edição de um canal. 2. Alterar o nome do canal. 3. Clicar em "Cancelar" ou fechar a right sheet (X). | A right sheet fecha sem salvar. O canal mantém o nome original na listagem. Nenhuma alteração é persistida. | 🟡 Média | UI | CT-CANAIS-001 |
| CT-CANAIS-012 | Salvar com nome em branco exibe validação | Canal ativo; right sheet aberta | 1. Abrir a right sheet de edição de um canal. 2. Apagar o nome do canal (deixar campo vazio). 3. Verificar o estado do botão "Salvar". | O botão "Salvar" permanece desabilitado enquanto o campo de nome estiver vazio, OU uma mensagem de validação é exibida indicando que o nome é obrigatório. A alteração não é persistida. | 🟡 Média | UI | CT-CANAIS-001 |
| CT-CANAIS-013 | Editar canal sem permissão adequada | Usuário logado sem permissão de administrador de canais (ex: atendente) | 1. Logar com usuário sem permissão de administração de canais. 2. Acessar a lista de canais. 3. Verificar se a opção "Editar" está visível ou tentar acessar a edição diretamente. | A opção "Editar" não está disponível para o usuário sem permissão, ou ao tentar acessar, o sistema exibe mensagem de acesso negado. (RN4) | 🔴 Alta | UI | — |
| CT-CANAIS-014 | Upload de foto com formato inválido (WABA) | Canal WhatsApp WABA ativo; arquivo de formato inválido disponível (ex: PDF, GIF animado) | 1. Abrir a right sheet de edição de um canal WhatsApp WABA. 2. Clicar em "Adicione uma foto". 3. Selecionar um arquivo de formato inválido. | O sistema rejeita o arquivo e exibe uma mensagem de erro informando os formatos aceitos. Nenhuma imagem é carregada ou enviada para a Meta. | 🟡 Média | UI | CT-CANAIS-001 |
| CT-CANAIS-015 | Right sheet abre para todos os tipos de canal | Pelo menos um canal de cada tipo configurado: WhatsApp WABA, WhatsApp Broker, Instagram, Messenger, WebChat | 1. Para cada tipo de canal, clicar em "Editar". 2. Verificar que a right sheet abre e exibe campos adequados para cada tipo. | A right sheet abre corretamente para todos os 5 tipos de canal, exibindo campos relevantes para cada um sem erros. (RN1) | 🟡 Média | UI | CT-CANAIS-001 |
| CT-CANAIS-016 | Injeção de script no campo nome do canal | Canal ativo; right sheet aberta | 1. Abrir a right sheet de edição de um canal. 2. Inserir no campo "Nome" o texto: `<script>alert('xss')</script>`. 3. Se o botão "Salvar" estiver habilitado, clicar em "Salvar". | O valor é sanitizado — o script não é executado no navegador. O nome é salvo como texto literal ou a validação rejeita o input com mensagem de erro. Nenhum alert JavaScript é disparado. | 🔴 Alta | UI | CT-CANAIS-001 |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Cenário: Abrir edição de canal carrega dados atuais na right sheet
  Dado que o usuário está logado com permissão de administrador
  E existe um canal WhatsApp WABA ativo configurado na plataforma
  Quando o usuário clica na ação "Editar" do canal
  Então a right sheet é exibida
  E todos os campos estão preenchidos com os dados atuais do canal
  E o botão "Salvar" está desabilitado

Cenário: Botão Salvar é habilitado somente após alteração no formulário
  Dado que o usuário está logado com permissão de administrador
  E a right sheet de edição de um canal está aberta
  E o botão "Salvar" está desabilitado
  Quando o usuário altera o nome do canal
  Então o botão "Salvar" fica habilitado
  E quando o usuário clica em "Salvar"
  Então a alteração é persistida e o canal exibe o novo nome na listagem
```

---

## Validação por Agente Crítico

✅ Validação concluída:
- Aprovados sem alteração: 14
- Revisados: 2 (CT-CANAIS-010, CT-CANAIS-013)
- Adicionados por cobertura insuficiente: 0

---

**Resumo:** 16 cenários — 🔴 7 Alta | 🟡 7 Média | 🟢 0 Baixa | 2 cenários Gherkin
