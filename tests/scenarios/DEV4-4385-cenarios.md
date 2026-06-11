# Cenários de Teste — DEV4-4385

> Card: Integrações RD Station
> Gerado em: 2026-06-10
> Card atualizado em: 2026-06-10T16:36:13.735-0300

---

## PASSO 0.5 — Resumo do Card

- **Título:** Integrações RD Station
- **Tipo:** História
- **Prioridade:** Medium
- **Status:** Aguardando Cenários de Teste
- **Épico:** DEV4-4205 — Integrações
- **Atualizado em:** 2026-06-10T16:36:13.735-0300
- **Objetivo:** Implementar o fluxo de conexão e configuração com o RD Station na Tela de Aplicativos. O fluxo tem duas etapas: Conectar (OAuth) e Criar links (geração de URLs para templates de WhatsApp para automação no RD Station).

### Escopo — O que está incluído:
- Right sheet com stepper de 2 etapas: 1. Conectar → 2. Criar links
- Etapa 1: conexão OAuth via pop-up, checkboxes de eventos de saída, checkbox + chips de eventos de entrada
- Configurações desabilitadas (50% opacidade) até OAuth concluído
- Banner "Sua conta está conectada" após OAuth
- Etapa 2: dropdown de templates, botão "Criar link", lista de links com copiar e excluir
- Copiar link exibe alerta de sucesso
- Fluxo de edição: right sheet com abas "Automações do WhatsApp" e "Configurações avançadas"
- Dialog de confirmação para desconectar, alerta de sucesso, sheet fecha automaticamente
- Botão "Sair e configurar depois" fecha sheet mantendo configuração

### Escopo — O que NÃO está incluído:
- Validação de tokens ou credenciais (usa OAuth)
- Criação de templates de WhatsApp (usa templates já existentes)

### Regras de Negócio identificadas:
1. **RN1 — Conexão obrigatória antes da configuração:** Seções de configuração ficam desabilitadas (50% opacidade) até OAuth concluído.
2. **RN2 — Autenticação via OAuth:** Conexão via pop-up OAuth nos servidores da RD. Poli não armazena senha.
3. **RN3 — Banner de confirmação:** Após OAuth, banner "Sua conta está conectada" aparece e configurações são habilitadas.
4. **RN4 — Geração de link por template:** Botão "Criar link" só funciona com template selecionado. Link adicionado à lista sem recarregar.
5. **RN5 — Cópia do link:** Clicar na URL ou no ícone de copiar copia URL completa e exibe alerta de sucesso.
6. **RN6 — Remoção de link gerado:** Ícone de exclusão remove link da lista permanentemente.
7. **RN7 — Sair e configurar depois:** Fecha sheet sem desfazer conexão ou configurações já salvas.

---

## BLOCO 1 — Estratégia de Teste

Fluxo em 2 etapas com OAuth. A Etapa 1 habilita a Etapa 2 após conexão. O teste mais complexo é a geração e manipulação de links na Etapa 2. Como é OAuth, não há como testar localmente sem conta RD Station — cenários devem sinalizar dependência externa. O fluxo de edição com abas também precisa de cobertura.

**Tipos de teste:**
- **Funcional:** OAuth, checkboxes, dropdown, links, copiar, excluir, editar, desconectar
- **UX/UI:** stepper, opacidade das seções, banners, alertas
- **Segurança:** acesso restrito a Gestor, OAuth vs senha
- **Borda:** stepper, dropdown vazio, lista de links vazia

**Riscos principais:**
- OAuth pode falhar ou ser cancelado pelo usuário
- Seções de configuração podem não ficar desabilitadas antes do OAuth (RN1)
- Banner pode não aparecer após OAuth (RN3)
- Link pode não ser gerado sem template selecionado (RN4)
- Cópia de link pode não funcionar (RN5)

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade | Impacto | Prioridade |
|---|---|---|---|
| Seções de configuração ficam habilitadas antes do OAuth | Baixa | Alto | Alta |
| Banner "conta conectada" não aparece após OAuth | Baixa | Alto | Alta |
| Botão "Próximo" não avança para Etapa 2 após OAuth | Baixa | Alto | Alta |
| Link gerado sem template selecionado | Baixa | Alto | Alta |
| Cópia de link não funciona (clipeboard) | Média | Médio | Média |
| Remoção de link não persiste após fechar sheet | Baixa | Alto | Alta |
| "Sair e configurar depois" desfaz conexão OAuth | Baixa | Alto | Alta |
| Dropdown de templates não carrega opções | Média | Médio | Média |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-RDS-001 | Acessar right sheet RD Station via card | Usuário Gestor logado | 1. Navegar para Configurações → Aplicativos → Integração | 2. Clicar no card do RD Station | 2. Right sheet abre com stepper: Etapa 1 ativa, Etapa 2 desabilitada | 🔴 Alta | UI | — |
| CT-RDS-002 | Configuracoes desabilitadas antes do OAuth | CT-RDS-001 executado | 1. Right sheet aberto — Etapa 1 | 2. Verificar seções de configuração de eventos | 2. Seções devem estar com 50% de opacidade e não interativas (RN1) | 🔴 Alta | UI | CT-RDS-001 |
| CT-RDS-003 | Botao Proximo desabilitado antes do OAuth | CT-RDS-001 executado | 1. Right sheet aberto | 2. Não conectar via OAuth | 2. Botão "Próximo" deve estar **desabilitado** (RN1) | 🔴 Alta | UI | CT-RDS-001 |
| CT-RDS-004 | Conexao OAuth abre pop-up e exibe banner | ⚠️ Bloqueável — requer conta RD Station real | 1. Right sheet aberto | 2. Clicar em "Conectar ao RD Station" | 3. Realizar autenticação OAuth no pop-up | 3. Pop-up fecha | 4. Banner "Sua conta está conectada" aparece (RN3) | 5. Seções de configuração são habilitadas | 🔴 Alta | UI | CT-RDS-001 |
| CT-RDS-005 | Checkboxes de eventos de saida selecionaveis apos OAuth | CT-RDS-004 executado | 1. Etapa 1 com configurações habilitadas | 2. Marcar checkboxes: "Ao Iniciar Chat", "Ao Finalizar Chat", etc. | 2. Checkboxes devem ser selecionáveis e reter estado marcado | 🟡 Média | UI | CT-RDS-004 |
| CT-RDS-006 | Eventos de entrada (chips) funcionais apos OAuth | CT-RDS-004 executado | 1. Etapa 1 com configurações habilitadas | 2. Adicionar evento de conversão via chips | 2. Chips devem ser adicionados e removidos individualmente (RN3/RN2) | 🟡 Média | UI | CT-RDS-004 |
| CT-RDS-007 | Avancar para Etapa 2 apos OAuth | CT-RDS-004 executado | 1. Etapa 1 com OAuth conectado | 2. Clicar em "Próximo" | 2. Stepper avança: Etapa 1 concluída, Etapa 2 ativa (RN1) | 🔴 Alta | UI | CT-RDS-004 |
| CT-RDS-008 | Dropdown de templates na Etapa 2 | CT-RDS-007 executado | 1. Etapa 2 ativa | 2. Abrir dropdown "Escolha um template" | 2. Dropdown deve listar templates disponíveis de WhatsApp | 🟡 Média | UI | CT-RDS-007 |
| CT-RDS-009 | Botao Criar link desabilitado sem template | CT-RDS-007 executado | 1. Etapa 2 ativa | 2. Não selecionar template no dropdown | 2. Botão "Criar link" deve estar **desabilitado** (RN4) | 🟡 Média | UI | CT-RDS-007 |
| CT-RDS-010 | Gerar link com template selecionado | CT-RDS-008 executado | 1. Etapa 2 ativa | 2. Selecionar um template no dropdown | 3. Clicar em "Criar link" | 3. Link deve ser gerado e adicionado à lista sem recarregar página (RN4) | 🔴 Alta | UI | CT-RDS-008 |
| CT-RDS-011 | Copiar link exibe alerta de sucesso | CT-RDS-010 executado | 1. Lista de links visível | 2. Clicar na URL ou no ícone de copiar de um link | 2. URL completa deve ser copiada para área de transferência | 3. Alerta de sucesso deve aparecer (RN5) | 🔴 Alta | UI | CT-RDS-010 |
| CT-RDS-012 | Remover link da lista | CT-RDS-010 executado | 1. Lista de links visível | 2. Clicar no ícone de excluir de um link | 2. Link deve ser removido permanentemente da lista (RN6) | 🟡 Média | UI | CT-RDS-010 |
| CT-RDS-013 | Finalizar exibe animacao de sucesso | CT-RDS-010 executado (pelo menos 1 link) | 1. Etapa 2 ativa com links gerados | 2. Clicar em "Finalizar" | 2. Animação "Integração concluída com sucesso!" deve aparecer | 🔴 Alta | UI | CT-RDS-012 |
| CT-RDS-014 | Sair e configurar depois fecha sheet sem perder estado | CT-RDS-004 executado | 1. Etapa 1 conectada com configurações salvas | 2. Clicar em "Sair e configurar depois" | 2. Sheet fecha | 3. Reabrir sheet | 3. Configurações já salvas devem permanecer (RN7) | 🟡 Média | UI | CT-RDS-004 |
| CT-RDS-015 | Right sheet de edicao com abas | RD Station já conectado | 1. Acessar right sheet do RD Station (já conectado) | 1. Right sheet de edição deve abrir com 2 abas: "Automações do WhatsApp" e "Configurações avançadas" | 🟡 Média | UI | — |
| CT-RDS-016 | Aba Automações exibe links gerados | CT-RDS-015 executado | 1. Right sheet de edição | 2. Clicar na aba "Automações do WhatsApp" | 2. Lista de links gerados deve aparecer | 🟡 Média | UI | CT-RDS-015 |
| CT-RDS-017 | Aba Configuracoes avançadas exibe config setadas | CT-RDS-015 executado | 1. Right sheet de edição | 2. Clicar na aba "Configurações avançadas" | 2. Configurações definidas na Etapa 1 devem aparecer | 🟡 Média | UI | CT-RDS-015 |
| CT-RDS-018 | Botao Salvar desabilitado ate alteracao na edicao | CT-RDS-015 executado | 1. Right sheet de edição aberto — sem alterações | 1. Botão "Salvar" deve estar **desabilitado** | 🟡 Média | UI | CT-RDS-015 |
| CT-RDS-019 | Dialog de confirmacao ao desconectar | CT-RDS-015 executado | 1. Right sheet de edição | 2. Clicar em "Desconectar" | 2. Dialog de confirmação deve aparecer | 🟡 Média | UI | CT-RDS-015 |
| CT-RDS-020 | Desconectar fecha sheet automaticamente | CT-RDS-019 executado | 1. Dialog de confirmação aberto | 2. Confirmar desconexão | 2. Dialog fecha | 3. Alerta de sucesso aparece | 4. Right sheet fecha automaticamente | 🟡 Média | UI | CT-RDS-019 |
| CT-RDS-021 | Reabrir sheet apos desconectar mostra etapa 1 | CT-RDS-020 executado | 1. Sheet fechado após desconexão | 2. Reabrir sheet do RD Station | 2. Right sheet deve abrir na Etapa 1 (conexão), não na tela de edição | 🟡 Média | UI | CT-RDS-020 |
| CT-RDS-022 | Gestor acessa fluxo RD Station | Usuário com role Gestor logado | 1. Navegar para Configurações → Aplicativos → Integração → RD Station | 1. Right sheet deve abrir sem erro de permissão | 🔴 Alta | UI | — |
| CT-RDS-023 | Atendente nao acessa fluxo RD Station | Usuário com role Atendente logado | 1. Navegar para Configurações → Aplicativos → Integração → RD Station | 1. Acesso deve ser bloqueado | 🔴 Alta | UI | — |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Cenário: Fluxo completo de conexão RD Station com geração de links
  Dado que o usuário Gestor está na right sheet do RD Station (Etapa 1)
  E as seções de configuração estão desabilitadas
  Quando conecta via OAuth
  Então o banner "Sua conta está conectada" deve aparecer
  E as seções de configuração devem ser habilitadas
  Quando seleciona eventos de saída e entrada
  E clica em "Próximo"
  Então o stepper avança para Etapa 2
  Quando seleciona um template no dropdown
  E clica em "Criar link"
  Então o link deve ser gerado e adicionado à lista
  E quando o usuário clica no ícone de copiar
  Então a URL deve ser copiada e o alerta de sucesso deve aparecer
  Quando clica em "Finalizar"
  Então a animação de sucesso deve aparecer

Cenário: Etapas bloqueadas até conexão OAuth
  Dado que o usuário está na right sheet do RD Station sem conexão
  Então as seções de configuração devem estar desabilitadas com 50% de opacidade
  E o botão "Próximo" deve estar desabilitado
  E o stepper deve mostrar Etapa 2 como não concluída
  Quando a conexão OAuth é realizada com sucesso
  Então o banner de confirmação deve aparecer
  E as seções de configuração devem ser habilitadas
  E o botão "Próximo" deve ser habilitado
```