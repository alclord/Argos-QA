# Cenários de Teste — DEV4-4386

> Card: Integrações Meta (MAPI/CAPI)
> Gerado em: 2026-06-10
> Card atualizado em: 2026-06-10T16:36:38.874-0300

---

## PASSO 0.5 — Resumo do Card

- **Título:** Integrações Meta (MAPI/CAPI)
- **Tipo:** História
- **Prioridade:** Medium
- **Status:** Aguardando Cenários de Teste
- **Épico:** DEV4-4205 — Integrações
- **Atualizado em:** 2026-06-10T16:36:38.874-0300
- **Objetivo:** Melhorar a adoção da integração Meta (CAPI/MAPI) através de uma jornada guiada na nova Tela de Aplicativos. O fluxo tem linguagem acessível ao perfil PME, autenticação via OAuth e preenchimento automático de pixels e contas de anúncios.

### Escopo — O que está incluído:
- Right sheet com stepper de 2 etapas: 1. Conectar → 2. Configurar
- Etapa 1: seleção de modalidade (CAPI, MAPI ou ambos — "Os dois" destacado como recomendado)
- Botão "Entrar com Facebook" para OAuth com Business Manager
- Etapa 2: dropdowns de Pixel (CAPI) e Conta de anúncios (MAPI), preenchidos via OAuth
- Accordion de ajuda ("Não estou vendo minha conta — o que pode ser?") com link para Gerenciador de Eventos
- Dropdown vazio expande accordion automaticamente
- Right sheet de edição (sem etapas) após conexão
- Dialog de confirmação para desconectar, alerta de sucesso
- "Conectar a outra conta" desconecta e volta para Etapa 1

### Escopo — O que NÃO está incluído:
- Criação de pixels ou contas de anúncios dentro do fluxo
- Validação manual de IDs (tudo via OAuth)

### Regras de Negócio identificadas:
1. **RN1 — Seleção de modalidade obrigatória:** Usuário deve selecionar ao menos uma modalidade (CAPI, MAPI ou ambas) antes de avançar.
2. **RN2 — Conexão OAuth obrigatória antes da configuração:** Etapa 2 permanece desabilitada até OAuth concluído.
3. **RN3 — Preenchimento automático dos dropdowns:** Após OAuth, Poli busca e lista automaticamente pixels e contas disponíveis. Usuário não insere IDs manualmente.
4. **RN4 — Dropdown vazio expande accordion:** Se nenhum pixel/conta encontrado, dropdown fica vazio e accordion de ajuda expande por padrão.
5. **RN5 — Link externo de ajuda:** Link para Gerenciador de Eventos abre em nova aba (https://business.facebook.com/events_manager).
6. **RN6 — Sair e configurar depois:** Fecha sheet sem desfazer OAuth estabelecido.

---

## BLOCO 1 — Estratégia de Teste

Fluxo em 2 etapas com OAuth Meta. A diferença crucial em relação ao RD Station é a seleção obrigatória de modalidade (CAPI/MAPI/Ambos) antes do OAuth. Outro diferencial é o accordion de ajuda que expande automaticamente quando dropdown está vazio. A Etapa 2 é mais simples que RD Station (apenas dropdowns de seleção). Fluxo de edição não tem etapas.

**Tipos de teste:**
- **Funcional:** seleção de modalidade, OAuth, dropdowns, accordion, edição
- **UX/UI:** stepper, linguagem acessível, accordion, link externo
- **Segurança:** acesso restrito a Gestor, OAuth vs senha
- **Borda:** dropdown vazio, accordion expandido por padrão

**Riscos principais:**
- Usuário pode avançar sem selecionar modalidade (RN1)
- Etapa 2 pode habilitar antes do OAuth (RN2)
- Dropdown pode não preencher automaticamente (RN3)
- Accordion pode não expandir com dropdown vazio (RN4)
- Link do accordion pode não abrir em nova aba (RN5)

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade | Impacto | Prioridade |
|---|---|---|---|
| Avançar para Etapa 2 sem selecionar modalidade | Baixa | Alto | Alta |
| Etapa 2 habilitada antes de OAuth (RN2 violada) | Baixa | Alto | Alta |
| Dropdowns não são preenchidos via OAuth | Média | Alto | Alta |
| Accordion não expande quando dropdown vazio | Média | Médio | Média |
| Link do accordion não abre em nova aba | Baixa | Médio | Média |
| "Conectar a outra conta" não desconecta corretamente | Baixa | Médio | Média |
| Botão "Finalizar" não salva configuração | Baixa | Alto | Alta |
| Etapa 2 não avança sem pixel/conta selecionado | Média | Médio | Média |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-MET-001 | Acessar right sheet Meta via card | Usuário Gestor logado | 1. Navegar para Configurações → Aplicativos → Integração | 2. Clicar no card da Meta (CAPI/MAPI) | 2. Right sheet abre com stepper: Etapa 1 ativa, Etapa 2 desabilitada | 🔴 Alta | UI | — |
| CT-MET-002 | Etapa 1 exibe opcoes de modalidade com linguagem acessivel | CT-MET-001 executado | 1. Right sheet aberto — Etapa 1 | 2. Verificar opções apresentadas | 2. Deve haver 3 opções: "Melhore o rastreamento de conversões" (CAPI), "Automatize e leia dados das suas campanhas" (MAPI), "Os dois" (destacado como recomendado) | 🔴 Alta | UI | CT-MET-001 |
| CT-MET-003 | Botao Entrar com Facebook desabilitado sem modalidade | CT-MET-001 executado | 1. Right sheet aberto | 2. Não selecionar nenhuma modalidade | 2. Botão "Entrar com Facebook" deve estar **desabilitado** (RN1) | 🔴 Alta | UI | CT-MET-001 |
| CT-MET-004 | Botao Entrar com Facebook habilitado apos selecionar modalidade | CT-MET-001 executado | 1. Right sheet aberto | 2. Selecionar modalidade (CAPI, MAPI ou ambos) | 2. Botão "Entrar com Facebook" deve ser **habilitado** (RN1) | 🔴 Alta | UI | CT-MET-001 |
| CT-MET-005 | OAuth abre pop-up e avanca para Etapa 2 | ⚠️ Bloqueável — requer conta Meta Business Manager real | 1. Modalidade selecionada | 2. Clicar em "Entrar com Facebook" | 3. Realizar autenticação OAuth no pop-up | 3. Pop-up fecha | 4. Banner de confirmação aparece | 5. Etapa 2 é habilitada e ativa | 🔴 Alta | UI | CT-MET-004 |
| CT-MET-006 | Dropdown de Pixel preenchido apos OAuth | CT-MET-005 executado | 1. Etapa 2 ativa | 2. Abrir dropdown de Pixel (CAPI) | 2. Dropdown deve listar pixels disponíveis na conta conectada (RN3) | 🔴 Alta | UI | CT-MET-005 |
| CT-MET-007 | Dropdown de Conta de anuncios preenchido apos OAuth | CT-MET-005 executado | 1. Etapa 2 ativa | 2. Abrir dropdown de Conta de anúncios (MAPI) | 2. Dropdown deve listar contas de anúncios disponíveis (RN3) | 🔴 Alta | UI | CT-MET-005 |
| CT-MET-008 | Accordion expande quando dropdown vazio | ⚠️ Bloqueável — requer conta Meta sem pixels/contas | 1. Etapa 2 ativa | 2. Verificar dropdown | 2. Se dropdown está vazio, accordion "Não estou vendo minha conta" deve estar expandido por padrão (RN4) | 🟡 Média | UI | CT-MET-005 |
| CT-MET-009 | Accordion exibe motivos comuns e link para Gerenciador | CT-MET-008 executado | 1. Accordion expandido | 2. Verificar conteúdo | 2. Accordion deve conter lista curta dos motivos mais comuns | 3. Link "Abra o Gerenciador de Eventos" presente | 🟡 Média | UI | CT-MET-008 |
| CT-MET-010 | Link do accordion abre em nova aba | CT-MET-009 executado | 1. Accordion expandido | 2. Clicar em link "Acesse o Gerenciador de Eventos" | 2. Link https://business.facebook.com/events_manager deve abrir em nova aba (RN5) | 🔴 Alta | UI | CT-MET-009 |
| CT-MET-011 | Finalizar com pixel e conta selecionados | CT-MET-006 executado (dropdowns preenchidos) | 1. Etapa 2 ativa | 2. Selecionar pixel no dropdown | 3. Selecionar conta de anúncios no dropdown | 4. Clicar em "Finalizar" | 4. Animação "Integração concluída com sucesso!" deve aparecer | 🔴 Alta | UI | CT-MET-007 |
| CT-MET-012 | Sair e configurar depois fecha sheet sem perder OAuth | CT-MET-005 executado | 1. Etapa 2 ativa | 2. Clicar em "Sair e configurar depois" | 2. Sheet fecha | 3. Reabrir sheet | 3. OAuth deve permanecer — Etapa 2 ativa | 🟡 Média | UI | CT-MET-005 |
| CT-MET-013 | Conectar a outra conta desconecta e volta para Etapa 1 | CT-MET-005 executado | 1. Etapa 2 ativa | 2. Clicar em "Conectar a outra conta" | 2. Usuário deve ser desconectado do OAuth | 3. Sheet retorna para Etapa 1 | 🟡 Média | UI | CT-MET-005 |
| CT-MET-014 | Right sheet de edicao sem etapas | Meta já conectada | 1. Acessar right sheet da Meta (já conectada) | 1. Right sheet de edição deve abrir **sem** stepper de etapas | 🟡 Média | UI | — |
| CT-MET-015 | Dropdowns preenchidos na edicao | CT-MET-014 executado | 1. Right sheet de edição | 2. Verificar dropdowns de Pixel e Conta de anúncios | 2. Dropdowns devem exibir as opções já configuradas previamente | 🟡 Média | UI | CT-MET-014 |
| CT-MET-016 | Botao Salvar desabilitado ate alteracao na edicao | CT-MET-014 executado | 1. Right sheet de edição aberto — sem alterações | 1. Botão "Salvar" deve estar **desabilitado** | 🟡 Média | UI | CT-MET-014 |
| CT-MET-017 | Dialog de confirmacao ao desconectar | CT-MET-014 executado | 1. Right sheet de edição | 2. Clicar em "Desconectar" | 2. Dialog de confirmação deve aparecer | 🟡 Média | UI | CT-MET-014 |
| CT-MET-018 | Desconectar remove conexao com sucesso | CT-MET-017 executado | 1. Dialog de confirmação aberto | 2. Confirmar desconexão | 2. Dialog fecha | 3. Alerta de sucesso aparece | 3. Card da Meta volta para badge "Disponível" | 🔴 Alta | UI | CT-MET-017 |
| CT-MET-019 | Gestor acessa fluxo Meta | Usuário com role Gestor logado | 1. Navegar para Configurações → Aplicativos → Integração → Meta | 1. Right sheet deve abrir sem erro de permissão | 🔴 Alta | UI | — |
| CT-MET-020 | Atendente nao acessa fluxo Meta | Usuário com role Atendente logado | 1. Navegar para Configurações → Aplicativos → Integração → Meta | 1. Acesso deve ser bloqueado | 🔴 Alta | UI | — |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Cenário: Fluxo completo de conexão Meta com configuração CAPI + MAPI
  Dado que o usuário Gestor está na right sheet da Meta (Etapa 1)
  Quando seleciona a opção "Os dois" (CAPI + MAPI)
  Então o botão "Entrar com Facebook" deve ser habilitado
  Quando conecta via OAuth com Business Manager
  Então o banner de confirmação deve aparecer
  E a Etapa 2 deve ser habilitada
  Quando abre o dropdown de Pixel
  Então a lista de pixels deve aparecer automaticamente
  Quando abre o dropdown de Conta de anúncios
  Então a lista de contas de anúncios deve aparecer automaticamente
  Quando seleciona pixel e conta de anúncios
  E clica em "Finalizar"
  Então a animação de sucesso deve aparecer
  E o card da Meta deve exibir badge "Conectado"

Cenário: Accordion de ajuda expandido quando dropdown vazio
  Dado que o usuário está na Etapa 2 da integração Meta
  Quando o dropdown de Pixel ou Conta de anúncios está vazio (sem dados na conta)
  Então o accordion "Não estou vendo minha conta — o que pode ser?" deve estar expandido por padrão
  E o link para o Gerenciador de Eventos deve estar visível
  E ao clicar no link
  Então https://business.facebook.com/events_manager deve abrir em nova aba
```