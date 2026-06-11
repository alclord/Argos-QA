# Cenários de Teste — DEV4-4382

> Card: Integrações Z-API
> Gerado em: 2026-06-10
> Card atualizado em: 2026-06-10T16:34:10.549-0300

---

## PASSO 0.5 — Resumo do Card

- **Título:** Integrações Z-API
- **Tipo:** História
- **Prioridade:** Medium
- **Status:** Aguardando Cenários de Teste
- **Épico:** DEV4-4205 — Integrações
- **Atualizado em:** 2026-06-10T16:34:10.549-0300
- **Objetivo:** Implementar o fluxo de conexão com a Z-API na nova Tela de Aplicativos. O usuário pode iniciar conexão, escanear QR Code e ativar canal não oficial diretamente na nova interface, sem acessar o ambiente legado.

### Escopo — O que está incluído:
- Right sheet de conexão Z-API (a partir do card na tela de Integrações)
- Botão "Conectar canal" que exibe QR Code
- Botão "Criar Canal" desabilitado até nome + telefone + QR escaneado
- Alerta de sucesso após criar canal
- Canal criado fica visível na tela Canais para edição

### Escopo — O que NÃO está incluído:
- Edição de canais Z-API existentes (continua na tela Canais — DEV4-4239)
- Criação de novos componentes fora do Design System

### Regras de Negócio identificadas:
1. **RN1 — QR Code sob demanda:** O QR Code é gerado e exibido **somente** após o usuário clicar em "Conectar canal".
2. **RN2 — Botão desabilitado:** O botão de confirmação/conclusão permanece desabilitado enquanto o QR Code não for escaneado e a sessão não for validada pela Z-API.
3. **RN3 — Reaproveitamento de componentes:** Right sheet utiliza os mesmos componentes de adição de canais existentes na plataforma.
4. **RN4 — Editar Canal:** O canal criado faz parte da lista da tela Canais e pode ser editado por lá.
5. **RN5 — Disponibilidade contínua:** A Z-API é a **única** integração sempre disponível na tela de escolha, pois é possível conectar canais ilimitados.

---

## BLOCO 1 — Estratégia de Teste

O fluxo central é: acessar right sheet Z-API → clicar "Conectar canal" → QR Code aparece → escanear → botão habilitar → criar canal → sucesso. A Z-API nunca apresenta botão "Configurar" porque canais ilimitados podem ser criados. O teste de regressão mais crítico é garantir que o canal criado aparece na tela Canais.

**Tipos de teste:**
- **Funcional:** fluxo completo de conexão, QR Code, criação de canal, alerta de sucesso
- **UX/UI:** estados dos botões, right sheet, QR Code visível
- **Segurança:** acesso restrito a Gestor
- **Regressão:** canal criado acessível na tela Canais

**Riscos principais:**
- QR Code pode não aparecer após clicar em "Conectar canal" (RN1)
- Botão pode habilitar sem QR ter sido escaneado (RN2)
- Canal pode não aparecer na tela Canais após criação (RN4)

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade | Impacto | Prioridade |
|---|---|---|---|
| QR Code não aparece após clicar em "Conectar canal" | Baixa | Alto | Alta |
| Botão "Criar Canal" habilita sem QR escaneado | Baixa | Alto | Alta |
| Canal não é criado mesmo com alerta de sucesso | Baixa | Alto | Alta |
| Canal criado não aparece na tela Canais | Baixa | Alto | Alta |
| Right sheet não abre ao clicar no card Z-API | Baixa | Alto | Alta |
| Multiple conexões Z-API não funcionam (limite oculto) | Baixa | Médio | Média |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-ZAP-001 | Acessar right sheet Z-API via card na tela | Usuário Gestor logado, tela de Integrações acessível | 1. Navegar para Configurações → Aplicativos → Integração | 2. Clicar no card da Z-API | 2. Right sheet de conexão deve abrir | 🔴 Alta | UI | — |
| CT-ZAP-002 | Botao Criar Canal desabilitado inicialmente | CT-ZAP-001 executado | 1. Right sheet aberto — observar estado do botão "Criar Canal" | 1. Botão "Criar Canal" deve estar **desabilitado** com QR Code ainda não gerado | 🔴 Alta | UI | CT-ZAP-001 |
| CT-ZAP-003 | QR Code aparece apos clicar em Conectar canal | CT-ZAP-001 executado | 1. Right sheet aberto | 2. Clicar no botão "Conectar canal" | 2. QR Code deve ser gerado e exibido na right sheet (RN1) | 🔴 Alta | UI | CT-ZAP-001 |
| CT-ZAP-004 | Botao Criar Canal continua desabilitado ate QR escanear | CT-ZAP-003 executado | 1. QR Code visível na right sheet | 2. Não escanear o QR Code | 2. Botão "Criar Canal" deve permanecer **desabilitado** (RN2) | 🔴 Alta | UI | CT-ZAP-003 |
| CT-ZAP-005 | Botao Criar Canal habilitado apos escanear QR | ⚠️ Bloqueável — depende de dispositivo físico com WhatsApp para escanear | 1. QR Code visível | 2. Escaneá-lo com um dispositivo que tenha WhatsApp | 3. Aguardar validação da sessão pela Z-API | 3. Botão "Criar Canal" deve ser **habilitado** após escaneamento e validação (RN2) | 🔴 Alta | UI | CT-ZAP-003 |
| CT-ZAP-006 | Criar Canal com sucesso exibe alerta | CT-ZAP-005 executado | 1. Botão "Criar Canal" habilitado | 2. Preencher nome do canal | 3. Clicar em "Criar Canal" | 3. Alerta de sucesso deve aparecer na tela | 🔴 Alta | UI | CT-ZAP-005 |
| CT-ZAP-007 | Canal Z-API criado aparece na tela Canais | CT-ZAP-006 executado com sucesso | 1. Navegar para a tela "Canais" | 2. Localizar o canal criado | 2. Canal deve aparecer na lista da tela Canais com opção de edição (RN4) | 🔴 Alta | UI | CT-ZAP-006 |
| CT-ZAP-008 | Botao Cancelar fecha right sheet | CT-ZAP-001 executado | 1. Right sheet de Z-API aberto | 2. Clicar em "Cancelar" | 2. Right sheet deve fechar sem criar canal | 🟡 Média | UI | CT-ZAP-001 |
| CT-ZAP-009 | Fechar right sheet durante QR cancela sessao | CT-ZAP-003 executado | 1. QR Code visível na right sheet | 2. Fechar a right sheet | 3. Reabrir right sheet da Z-API | 3. Nova sessão de QR deve ser gerada — QR anterior não deve ser mais válido | 🟡 Média | UI | CT-ZAP-003 |
| CT-ZAP-010 | Botao Criar Canal desabilitado sem nome do canal | CT-ZAP-005 executado | 1. QR Code escaneado e botão habilitado | 2. Limpar campo de nome do canal | 2. Botão "Criar Canal" deve voltar a ficar **desabilitado** | 🟡 Média | UI | CT-ZAP-005 |
| CT-ZAP-011 | Multiple conexoes Z-API funcionam | Canal Z-API já conectado | 1. Acessar right sheet da Z-API | 2. Clicar em "Conectar canal" | 3. Repetir fluxo de escaneamento e criação | 3. Novo canal deve ser criado com sucesso (RN5 — ilimitados) | 🟢 Baixa | UI | — |
| CT-ZAP-012 | Gestor acessa fluxo Z-API | Usuário com role Gestor logado | 1. Navegar para Configurações → Aplicativos → Integração → Z-API | 1. Right sheet deve abrir sem erro de permissão | 🔴 Alta | UI | — |
| CT-ZAP-013 | Atendente nao acessa fluxo Z-API | Usuário com role Atendente logado | 1. Navegar para Configurações → Aplicativos → Integração → Z-API | 1. Acesso deve ser bloqueado com mensagem de permissão ou redirecionamento | 🔴 Alta | UI | — |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Cenário: Fluxo completo de conexão Z-API via QR Code
  Dado que o usuário Gestor está na tela de Aplicativos com a Z-API disponível
  Quando clica no card da Z-API
  Então o right sheet de conexão deve abrir
  E o botão "Criar Canal" deve estar desabilitado
  Quando o usuário clica em "Conectar canal"
  Então o QR Code deve aparecer
  E o botão "Criar Canal" deve permanecer desabilitado
  Quando o QR Code é escaneado e validado pela Z-API
  Então o botão "Criar Canal" deve ser habilitado
  Quando o usuário preenche o nome e clica em "Criar Canal"
  Então o alerta de sucesso deve aparecer
  E o canal deve estar disponível na tela Canais

Cenário: Right sheet Z-API permanece consistente com o design system
  Dado que o usuário está na right sheet de conexão Z-API
  Quando avalia os componentes visuais
  Então os componentes devem seguir o padrão do design system existente
  E não devem haver novos padrões visuais ou funcionais criados especificamente para esta integração
```