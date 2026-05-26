# Cenários de Teste — DEV4-4224
> Card: "Minha Empresa": Migração para Nova Interface
> Gerado em: 2026-05-25
> Card atualizado em: 2026-05-25T15:58:26-03:00

---

## BLOCO 1 — Estratégia de Teste

Este card migra três abas da tela "Minha Empresa" (Dados da Empresa, Dados do Plano e Ações) do legado para a nova interface Poli. O escopo é funcional e de UX — não há mudança de regras de negócio. Tipos de teste aplicáveis: funcional, regressão de acesso por perfil, e segurança (ação irreversível de exclusão). Prioridade de execução: segurança (acesso por perfil Gestor) → Exclusão de dados (irreversível, "CONFIRMAR") → Gerenciar adicionais (remoção com bloqueios de negócio) → CEP auto-fill → demais fluxos. Maior risco: exclusão de dados sem guard adequado e remoção de adicionais com canais ativos.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Exclusão de dados executada sem exigir "CONFIRMAR" | M | A | 🔴 Alta |
| Remoção de adicional com canal ativo não bloqueia | A | A | 🔴 Alta |
| Tabela de plano exibindo dados incorretos (adicionais + total) | M | A | 🔴 Alta |
| Usuário não-Gestor consegue acessar "Minha Empresa" | B | A | 🔴 Alta |
| CEP válido não dispara auto-preenchimento | M | M | 🟡 Média |
| "Solicitar upgrade" não abre WhatsApp ou monta URL errada | M | M | 🟡 Média |
| Backup disponível para download enquanto status = Processando | B | A | 🟡 Média |
| Segunda solicitação de backup no mês não é bloqueada | M | M | 🟡 Média |
| Coluna "Adicionais" não atualiza sem reload após remoção | M | M | 🟡 Média |
| Financeiro com regressão (embed quebrado) | B | M | 🟡 Média |
| Salvar dados sem toast de feedback (sucesso ou erro) | B | B | 🟢 Baixa |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade |
|---|---|---|---|---|---|
| CT-EMPRESA-001 | Gestor salva dados da empresa com sucesso | Gestor autenticado; tela "Minha Empresa > Dados da Empresa" aberta; campos carregados com dados atuais | 1. Alterar o campo "Nome da empresa". 2. Clicar em "Salvar alterações". | Toast "Dados salvos com sucesso!" exibido. Campos permanecem com os novos valores após save. (RN: Nome obrigatório; AC: toast de sucesso) | 🔴 Alta |
| CT-EMPRESA-002 | CEP válido preenche endereço automaticamente | Gestor autenticado; aba Dados da Empresa aberta | 1. Preencher campo CEP com um CEP brasileiro válido de 8 dígitos. 2. Aguardar auto-preenchimento. | Campos Logradouro, Bairro, Estado e Cidade preenchidos automaticamente via ViaCEP. Campo Número e Complemento permanecem editáveis. (RN: CEP com 8 dígitos dispara ViaCEP) | 🟡 Média |
| CT-EMPRESA-003 | Salvar sem nome da empresa exibe erro por campo | Gestor autenticado; aba Dados da Empresa aberta | 1. Limpar o campo "Nome da empresa". 2. Clicar em "Salvar alterações". | Campo "Nome da empresa" fica destacado em coral. Mensagem "Este campo é obrigatório" exibida abaixo do campo. Dados não são salvos. (RN: Nome obrigatório; AC: destaque coral + mensagem) | 🔴 Alta |
| CT-EMPRESA-004 | CEP inválido exibe erro inline | Gestor autenticado; aba Dados da Empresa aberta | 1. Digitar CEP com menos de 8 dígitos ou CEP inexistente (ex: "00000000"). 2. Aguardar resposta da API. | Mensagem de erro inline "CEP não encontrado. Verifique o número." exibida abaixo do campo CEP. Campos de endereço não são preenchidos. (AC: CEP inválido → mensagem de erro inline) | 🟡 Média |
| CT-EMPRESA-005 | Erro de servidor no save exibe toast de erro | Gestor autenticado; aba Dados da Empresa aberta; simular falha de API | 1. Preencher dados válidos. 2. Simular erro 500 na API de save. 3. Clicar em "Salvar alterações". | Toast de erro resolutivo exibido (ex: "Não foi possível salvar. Tente novamente."). Nenhuma navegação acontece. (AC: Erro de servidor → toast de erro) | 🟡 Média |
| CT-EMPRESA-006 | Toggle Documento Internacional altera máscara | Gestor autenticado; aba Dados da Empresa aberta | 1. Verificar máscara do campo Documento (CNPJ: XX.XXX.XXX/XXXX-XX). 2. Ativar o checkbox "Documento Internacional". 3. Verificar máscara. | Com toggle ativo: campo Documento aceita texto livre sem máscara. Com toggle inativo: máscara CNPJ/CPF restaurada. (RN: Toggle altera máscara) | 🟡 Média |
| CT-EMPRESA-007 | Não-Gestor não acessa "Minha Empresa" | Usuário com perfil Operador ou Supervisor autenticado | 1. Acessar a URL da tela "Minha Empresa" diretamente. | Usuário não tem acesso à tela. Redireciona ou exibe mensagem de acesso negado. (RN: Apenas Gestores têm acesso — Segurança) | 🔴 Alta |
| CT-EMPRESA-008 | Tabela de plano carrega com dados corretos | Gestor autenticado; conta com plano e adicionais cadastrados | 1. Acessar aba "Dados do Plano". | Skeleton exibido durante carregamento. Tabela renderiza com colunas: Recursos, Plano base, Adicionais, Total. Valores de cada linha somam corretamente (Plano base + Adicionais = Total). Ícones de canal exibidos corretamente. (AC: tabela com skeleton + dados corretos) | 🟡 Média |
| CT-EMPRESA-009 | Upgrade de plano redireciona para WhatsApp | Gestor autenticado; aba Dados do Plano aberta | 1. Clicar em "Aumentar meu plano". 2. Modal abre com lista de planos. 3. Selecionar um plano. 4. Clicar em "Solicitar upgrade". | Nova aba abre para `https://wa.me/[número]?text=[mensagem]` com mensagem pré-preenchida contendo o nome do plano selecionado. (RN: URL WhatsApp com mensagem do plano selecionado) | 🟡 Média |
| CT-EMPRESA-010 | Remover adicional com sucesso atualiza tabela | Gestor autenticado; conta com adicional sem canal ativo e sem usuários acima do limite | 1. Clicar em "Gerenciar adicionais". 2. Clicar em "Remover" para um adicional elegível. 3. Confirmar na tela de confirmação. 4. Clicar em "Confirmar remoção". | Modal fecha. Toast "Adicional removido com sucesso!" exibido. Coluna "Adicionais" da tabela atualizada sem reload de página. Log de auditoria registrado. (RN: remoção via API + atualização sem reload + log) | 🔴 Alta |
| CT-EMPRESA-011 | Remover adicional com canal ativo é bloqueado | Gestor autenticado; conta com adicional de canal conectado e recebendo mensagens | 1. Clicar em "Gerenciar adicionais". 2. Localizar adicional com canal ativo em uso. 3. Verificar o botão "Remover". | Botão "Remover" bloqueado (desabilitado). Aviso explicativo exibido sem botão de confirmação. Remoção não é possível. (RN: Canal ativo em uso impede remoção) | 🔴 Alta |
| CT-EMPRESA-012 | Remover adicional de usuários além do limite é bloqueado | Gestor autenticado; conta com usuários ativos em quantidade maior que o total resultante após remoção (ex: 130 ativos, plano base = 2, remover 10 adicionais = 12 total < 130) | 1. Clicar em "Gerenciar adicionais". 2. Localizar adicional de usuários. 3. Verificar o botão "Remover". | Botão "Remover" bloqueado. Aviso explicativo exibido informando que a quantidade de usuários ativos excede o total resultante. (RN: usuários ativos > total após remoção impede remoção) | 🔴 Alta |
| CT-EMPRESA-013 | "Voltar" na confirmação não executa remoção | Gestor autenticado; modal de adicionais aberto com adicional elegível | 1. Clicar em "Remover" em um adicional elegível. 2. Tela de confirmação exibida. 3. Clicar em "Voltar". | Modal retorna à listagem de adicionais sem executar nenhuma remoção. Estado da tabela de plano permanece inalterado. (AC: Voltar → retorna à listagem sem ação) | 🟡 Média |
| CT-EMPRESA-014 | Reduzir/Cancelar plano redireciona para WhatsApp | Gestor autenticado; aba Dados do Plano aberta | 1. Clicar em "Reduzir / Cancelar Plano". 2. Modal de confirmação abre com aviso de perda de recursos. 3. Clicar em "Enviar solicitação". | Nova aba abre para `https://wa.me/[número]?text=[mensagem]` com mensagem pré-preenchida sobre redução/cancelamento. (RN: Reduzir/Cancelar → WhatsApp com mensagem) | 🟡 Média |
| CT-EMPRESA-015 | Solicitar backup com sucesso exibe toast | Gestor autenticado; conta sem solicitação de backup no mês corrente | 1. Acessar aba "Ações". 2. Clicar no botão de solicitar backup. 3. Confirmar no modal. | Toast de confirmação exibido. Tabela de histórico atualizada com novo registro em status "Processando". (AC: Nova solicitação válida → modal → disparo → toast) | 🟡 Média |
| CT-EMPRESA-016 | Exclusão de dados com "CONFIRMAR" digitado | Gestor autenticado; aba Ações aberta; dados de contatos existentes no período | 1. Acessar seção "Zona de Perigo". 2. Clicar em "Excluir contatos ou conversas". 3. Definir data de referência (data de criação do contato). 4. Digitar "CONFIRMAR" no campo de confirmação. 5. Clicar no botão de confirmar. | Botão de confirmar habilitado ao digitar "CONFIRMAR". Exclusão executada. Toast "Exclusão realizada com sucesso!" exibido. Log de auditoria registrado. (RN: data de criação; AC: CONFIRMAR; log) | 🔴 Alta |
| CT-EMPRESA-017 | Segunda solicitação de backup no mês é bloqueada | Gestor autenticado; já existe 1 solicitação de backup no mês corrente | 1. Acessar aba "Ações". 2. Tentar solicitar novo backup. | Aviso de bloqueio exibido com data do próximo backup disponível (ex: "Backup já solicitado este mês. Próximo disponível em [data]."). Botão de solicitação desabilitado. (RN: máximo 1 backup/mês) | 🟡 Média |
| CT-EMPRESA-018 | Confirmação de exclusão bloqueada sem "CONFIRMAR" | Gestor autenticado; modal de exclusão aberto | 1. Acessar modal de exclusão de dados. 2. Deixar campo de confirmação vazio ou digitar texto diferente de "CONFIRMAR". 3. Verificar botão de confirmação. | Botão de confirmar permanece desabilitado enquanto o texto digitado for diferente de "CONFIRMAR". Nenhuma exclusão é disparada. (AC: Botão desabilitado até digitar "CONFIRMAR") | 🟡 Média |
| CT-EMPRESA-019 | Link de download inativo quando backup em Processando | Gestor autenticado; tabela de backups com registro em status "Processando" | 1. Acessar aba "Ações". 2. Verificar tabela de histórico de backups. 3. Localizar registro com status "Processando". 4. Observar o link "Baixar". | Link "Baixar" desabilitado/inativo para registros com status "Processando". Apenas registros com status "Disponível" exibem link de download ativo. (AC: Link ativo apenas quando status = Disponível) | 🟢 Baixa |
| CT-EMPRESA-020 | Aba Financeiro exibe embed e aviso de transição | Gestor autenticado | 1. Acessar aba "Financeiro". | Aviso contextual exibido acima do iframe (ex: "Seus dados financeiros serão integrados em breve..."). Iframe da Super Lógica carrega corretamente sem regressão. (AC: aviso + iframe sem regressão) | 🟢 Baixa |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Cenário: Adicional com canal ativo em uso não pode ser removido
  Dado que estou autenticado como Gestor na aba "Dados do Plano"
  E existe um adicional de canal com status "conectado e recebendo mensagens"
  Quando abro o modal "Gerenciar adicionais"
  E localizo o adicional com canal ativo
  Então o botão "Remover" está bloqueado (desabilitado)
  E um aviso explicativo é exibido sem botão de confirmação
  E nenhuma remoção é executada
```

```gherkin
Cenário: Exclusão de dados exige digitação de "CONFIRMAR" para habilitar o botão
  Dado que estou autenticado como Gestor na aba "Ações"
  E acesso a seção "Zona de Perigo"
  Quando abro o modal de exclusão de contatos e conversas
  E o campo de confirmação está vazio ou contém texto diferente de "CONFIRMAR"
  Então o botão de confirmar está desabilitado
  Quando digito exatamente "CONFIRMAR" no campo de confirmação
  Então o botão de confirmar é habilitado
  E ao clicar, a exclusão é executada e o toast "Exclusão realizada com sucesso!" é exibido
  E o log de auditoria é registrado
```

---

## Validação LLM
✅ 20 cenários aprovados | 0 revisados | 0 removidos
