# Cenários de Teste — DEV4-4384

> Card: Integrações Nectar
> Gerado em: 2026-06-10
> Card atualizado em: 2026-06-10T16:35:46.998-0300

---

## PASSO 0.5 — Resumo do Card

- **Título:** Integrações Nectar
- **Tipo:** História
- **Prioridade:** Medium
- **Status:** Aguardando Cenários de Teste
- **Épico:** DEV4-4205 — Integrações
- **Atualizado em:** 2026-06-10T16:35:46.998-0300
- **Objetivo:** Implementar o fluxo de conexão do NectarCRM na Tela de Aplicativos. O gestor conecta a conta Poli ao Nectar informando token de API e define e-mails destinatários para notificações, tudo dentro da nova interface.

### Escopo — O que está incluído:
- Right sheet de conexão com campo de Token API do Nectar
- Banner informativo com link "Onde encontro meu token?"
- Campo de adição múltipla de e-mails (chips removíveis + "Limpar tudo")
- E-mails em texto livre (sem seletor da base)
- Botão "Conectar" (habilitado com token preenchido)
- Animação de sucesso após conexão completa
- Fluxo de edição (botão "Salvar", habilitado após alteração)
- Dialog de confirmação para desconectar
- Alerta de sucesso pós-desconexão

### Escopo — O que NÃO está incluído:
- Autenticação OAuth — usa token de API diretamente
- Validação ativa do token contra a API do Nectar (apenas formato)

### Regras de Negócio identificadas:
1. **RN1 — Token obrigatório:** O campo de Token API é obrigatório. Botão "Conectar" permanece desabilitado enquanto vazio.
2. **RN2 — E-mails opcionais com validação de formato:** E-mails não são obrigatórios, mas cada entrada é validada como formato válido antes de gerar chip.
3. **RN3 — Remoção individual de e-mails:** Cada chip possui ícone (×) que exclui apenas aquele endereço.
4. **RN4 — Limpar tudo:** "Limpar tudo" remove todos os e-mails de uma vez, sem confirmação.
5. **RN5 — Link externo de ajuda:** Banner abre link do Nectar em nova aba.

---

## BLOCO 1 — Estratégia de Teste

O fluxo principal é conexão via token + e-mails opcionais. Diferente da Z-API, o Nectar usa token (não OAuth), tem e-mails com chips e apresenta fluxo de edição/salvamento. A conexão é única (não ilimitada como Z-API), então o card muda para "Configurar" após conectar. Testes de validação de formato de e-mail e comportamento dos chips são críticos.

**Tipos de teste:**
- **Funcional:** conexão com token, e-mails,chips, salvar, desconectar
- **Negativo:** token vazio, e-mail com formato inválido, desconexão
- **UX/UI:** chips, banner de ajuda, dialog de confirmação
- **Segurança:** acesso restrito a Gestor

**Riscos principais:**
- Botão "Conectar" pode habilitar com token vazio (RN1)
- E-mail com formato inválido pode gerar chip (RN2)
- "Limpar tudo" pode não funcionar corretamente (RN4)
- Link do banner pode não abrir em nova aba (RN5)

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade | Impacto | Prioridade |
|---|---|---|---|
| Botão "Conectar" habilita com token vazio | Baixa | Alto | Alta |
| E-mail com formato inválido gera chip | Média | Alto | Alta |
| Chips de e-mail não são removidos individualmente | Baixa | Médio | Média |
| "Limpar tudo" não remove todos os e-mails | Baixa | Médio | Média |
| Link do banner não abre em nova aba | Baixa | Médio | Média |
| Animação de sucesso não aparece após conexão | Baixa | Médio | Média |
| Dialog de confirmação não aparece ao desconectar | Baixa | Médio | Média |
| Botão "Salvar" não habilita após alteração na edição | Baixa | Médio | Média |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-NEC-001 | Acessar right sheet Nectar via card | Usuário Gestor logado | 1. Navegar para Configurações → Aplicativos → Integração | 2. Clicar no card do NectarCRM | 2. Right sheet deve abrir com campo de Token API | 🔴 Alta | UI | — |
| CT-NEC-002 | Botao Conectar desabilitado com token vazio | CT-NEC-001 executado | 1. Right sheet aberto com campo de token vazio | 1. Botão "Conectar" deve estar **desabilitado** (RN1) | 🔴 Alta | UI | CT-NEC-001 |
| CT-NEC-003 | Botao Conectar habilitado com token preenchido | CT-NEC-001 executado | 1. Preencher campo de Token API com valor válido | 1. Botão "Conectar" deve ser **habilitado** (RN1) | 🔴 Alta | UI | CT-NEC-001 |
| CT-NEC-004 | Conectar Nectar com token valido | CT-NEC-003 executado | 1. Preencher token | 2. Opcional: adicionar e-mails | 3. Clicar em "Conectar" | 3. Animação de sucesso deve aparecer | 4. Right sheet fecha | 4. Card do Nectar deve exibir badge "Conectado" | 🔴 Alta | UI | CT-NEC-003 |
| CT-NEC-005 | E-mail invalido nao gera chip | CT-NEC-001 executado | 1. Tentar digitar e-mail com formato inválido (ex: "teste", "teste@", "@dominio.com") | 1. Chip não deve ser gerado — campo deve permanecer em branco ou exibir erro de validação (RN2) | 🔴 Alta | UI | CT-NEC-001 |
| CT-NEC-006 | E-mail valido gera chip | CT-NEC-001 executado | 1. Digitar e-mail com formato válido (ex: teste@dominio.com) | 2. Confirmar entrada | 2. Chip com o e-mail deve ser criado (RN2) | 🔴 Alta | UI | CT-NEC-001 |
| CT-NEC-007 | Chip de e-mail removido individualmente | CT-NEC-006 executado | 1. Chip de e-mail visível | 2. Clicar no ícone (×) do chip | 2. Apenas aquele chip deve ser removido — outros e-mails permanecem (RN3) | 🔴 Alta | UI | CT-NEC-006 |
| CT-NEC-008 | Limpar tudo remove todos os e-mails | CT-NEC-006 executado (múltiplos chips) | 1. Múltiplos chips de e-mail visíveis | 2. Clicar em "Limpar tudo" | 2. Todos os chips devem ser removidos de uma vez, sem confirmação (RN4) | 🔴 Alta | UI | CT-NEC-007 |
| CT-NEC-009 | Banner link externo abre em nova aba | CT-NEC-001 executado | 1. Localizar banner informativo "Onde encontro meu token?" | 2. Clicar no banner ou link | 2. Link https://ajuda.nectarcrm.com.br/hc/pt-br/articles/20569656854035-Como-criar-um-token-do-Nectar deve abrir em nova aba do navegador (RN5) | 🔴 Alta | UI | CT-NEC-001 |
| CT-NEC-010 | Botao Cancelar fecha right sheet sem conectar | CT-NEC-001 executado | 1. Right sheet aberto com ou sem token preenchido | 2. Clicar em "Cancelar" | 2. Right sheet deve fechar — nenhum dado deve ser salvo | 🟢 Baixa | UI | CT-NEC-001 |
| CT-NEC-011 | Right sheet de edicao exibe botao Salvar | Nectar já conectado | 1. Acessar right sheet do NectarCRM (já conectado) | 1. Right sheet deve abrir com botão "Salvar" (não "Conectar") | 🟡 Média | UI | — |
| CT-NEC-012 | Botao Salvar desabilitado ate alteracao | CT-NEC-011 executado | 1. Right sheet de edição aberto — sem alterações | 1. Botão "Salvar" deve estar **desabilitado** | 🟡 Média | UI | CT-NEC-011 |
| CT-NEC-013 | Botao Salvar habilitado apos alteracao | CT-NEC-012 executado | 1. Right sheet de edição — alterar token ou e-mails | 1. Botão "Salvar" deve ser **habilitado** após alteração | 🟡 Média | UI | CT-NEC-012 |
| CT-NEC-014 | Dialog de confirmacao ao desconectar | CT-NEC-011 executado | 1. Right sheet de edição | 2. Clicar em "Desconectar" | 2. Dialog de confirmação deve aparecer | 🟡 Média | UI | CT-NEC-011 |
| CT-NEC-015 | Desconectar cancela dialog | CT-NEC-014 executado | 1. Dialog de confirmação aberto | 2. Clicar em "Cancelar" no dialog | 2. Dialog fecha — integração permanece conectada | 🟢 Baixa | UI | CT-NEC-014 |
| CT-NEC-016 | Desconectar remove conexao com sucesso | CT-NEC-014 executado | 1. Dialog de confirmação aberto | 2. Confirmar desconexão | 2. Dialog fecha | 3. Alerta de sucesso "Integração desconectada" aparece | 3. Card do Nectar volta para badge "Disponível" | 🔴 Alta | UI | CT-NEC-014 |
| CT-NEC-017 | Gestor acessa fluxo Nectar | Usuário com role Gestor logado | 1. Navegar para Configurações → Aplicativos → Integração → Nectar | 1. Right sheet deve abrir sem erro de permissão | 🔴 Alta | UI | — |
| CT-NEC-018 | Atendente nao acessa fluxo Nectar | Usuário com role Atendente logado | 1. Navegar para Configurações → Aplicativos → Integração → Nectar | 1. Acesso deve ser bloqueado | 🔴 Alta | UI | — |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Cenário: Conexão do NectarCRM via token de API
  Dado que o usuário Gestor está na right sheet de conexão do NectarCRM
  E o campo de Token API está vazio
  Quando preenche o campo de Token API com um token válido
  Então o botão "Conectar" deve ser habilitado
  Quando adiciona e-mails de comunicação (opcional)
  E clica em "Conectar"
  Então a animação de sucesso deve aparecer
  E o card do Nectar deve exibir badge "Conectado"

Cenário: Gerenciamento de e-mails com chips
  Dado que o usuário está na right sheet de conexão do NectarCRM
  Quando digita um e-mail com formato inválido
  Então nenhum chip deve ser criado
  Quando digita um e-mail com formato válido
  Então um chip deve ser criado
  Quando clica no ícone de remoção do chip
  Então apenas aquele chip deve ser removido
  Quando clica em "Limpar tudo"
  Então todos os chips devem ser removidos
```