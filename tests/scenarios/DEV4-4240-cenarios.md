# Cenários de Teste — DEV4-4240
> Card: Exclusão e Desativação de canais
> Gerado em: 2026-06-01
> Card atualizado em: 2026-05-29T18:44:59.069-0300

---

## PASSO 0.5 — Resumo do Card

- **Título:** Exclusão e Desativação de canais
- **Tipo:** História
- **Prioridade:** Medium
- **Status:** Aguardando Cenários de Teste
- **Atualizado em:** 2026-05-29T18:44:59.069-0300
- **Épico pai:** DEV4-4191 — Canais
- **Objetivo:** Implementar fluxos de exclusão definitiva (AlertDialog destrutivo), desativação/reativação com comportamentos distintos por tipo de canal, e reconexão do WhatsApp Broker via QR Code.
- **Escopo — O que está incluído:** AlertDialog de confirmação de exclusão; reconexão Broker via QR Code; desativação automática de conexão ao desativar Instagram/Messenger/WABA/WebChat; reativação via pop-up Meta para canais sociais; reativação simples para WebChat; matriz de status.
- **Regras de Negócio identificadas:**
  1. RN1: Exclusão somente após confirmação no AlertDialog destrutivo
  2. RN2: Reconexão do Broker inicia diretamente na tela de QR Code atualizado
  3. RN3: Apenas WhatsApp Broker pode ter "Desconectado + Ativo" simultaneamente
  4. RN4: "Inativo + Conectado" NÃO existe para Instagram, Messenger, WABA e WebChat
  5. RN5: Reativação de WABA/Instagram/Messenger obrigatoriamente abre pop-up de autenticação Meta
  6. RN6: Reativação de WebChat → status direto para "Conectado" sem pop-ups externos
- **Critérios de Aceite identificados:** A ser preenchido pelo time de QA (derivados das RNs)
- **Subtasks / dependências:** Nenhuma

✅ Card suficientemente detalhado para cobertura de testes.

---

## BLOCO 1 — Estratégia de Teste

A feature cobre ações destrutivas (exclusão) e reversíveis (desativação/reativação) com comportamento diferenciado por tipo de canal. Alto impacto operacional — perda de canal paralisa atendimento. Testes aplicáveis: **funcional** (fluxo de exclusão, desativação e reativação por tipo), **regressão** (matriz de status na tabela), **UX** (AlertDialog, faixa de reconexão) e **segurança** (exclusão por perfil sem permissão). Execução prioritária: AlertDialog (RN1), impossibilidade de "Inativo+Conectado" (RN4) e reativação Meta sem autenticação (RN5).

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Exclusão executada sem AlertDialog | B | A | Alta |
| Canal Meta reativado sem exigir autenticação (RN5 violada) | M | A | Alta |
| Combinação "Inativo + Conectado" possível para WABA/Instagram (RN4 violada) | M | A | Alta |
| Broker desconectado sem exibir indicação de reconexão | M | A | Alta |
| QR Code de reconexão desatualizado ou não gerado | M | A | Alta |
| WebChat reativação abre pop-up desnecessário (RN6 violada) | B | M | Média |
| Status na tabela não atualiza após desativar/reativar | M | M | Média |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-CANAL-DEL-001 | Excluir canal com confirmação no AlertDialog | Administrador autenticado; ao menos 1 canal na listagem | 1. Na listagem, clicar em "Excluir" no canal desejado. 2. Verificar exibição do AlertDialog. 3. Clicar no botão destrutivo de confirmação. | AlertDialog abre com aviso de exclusão. Após confirmação, canal é removido da listagem do usuário. (RN1) | 🔴 Alta | UI | — |
| CT-CANAL-DEL-002 | Cancelar exclusão mantém canal na listagem | CT-CANAL-DEL-001 iniciado (AlertDialog aberto) | 1. No AlertDialog de exclusão, clicar em "Cancelar". | AlertDialog fecha. Canal permanece na listagem com status inalterado. Nenhuma ação destrutiva executada. (RN1 — fluxo de cancelamento) | 🔴 Alta | UI | — |
| CT-CANAL-DEL-003 | Desativar WABA não gera estado Inativo+Conectado | Administrador; canal WABA ativo e conectado | 1. Abrir right sheet do canal WABA. 2. Acionar desativação do canal. 3. Verificar status na tabela. | Status na tabela exibe "Inativo". A coluna de conexão não exibe "Conectado" simultaneamente com "Inativo". (RN4) | 🔴 Alta | UI | — |
| CT-CANAL-DEL-004 | Reativar WABA exige autenticação Meta | Administrador; canal WABA previamente inativado | 1. Na right sheet do canal WABA inativo, clicar em "Ativar". | Pop-up de autenticação/autorização da Meta abre obrigatoriamente. Sem completar autenticação, canal permanece inativo. (RN5) | 🔴 Alta | UI | — |
| CT-CANAL-DEL-005 | Reativar WebChat atualiza status direto para Conectado | Administrador; canal WebChat inativo | 1. Na right sheet do canal WebChat inativo, clicar em "Ativar". | Status do canal muda diretamente para "Conectado" na tabela. Nenhum pop-up externo é aberto. (RN6) | 🔴 Alta | UI | — |
| CT-CANAL-DEL-006 | Desativar Instagram e Messenger não gera Inativo+Conectado | Administrador; canal Instagram ativo e canal Messenger ativo | 1. Desativar canal Instagram via toggle. 2. Verificar status. 3. Desativar canal Messenger. 4. Verificar status. | Em ambos os casos: status na tabela exibe "Inativo" sem "Conectado" concomitante. Combinação "Inativo + Conectado" é impossível para esses canais. (RN4) | 🔴 Alta | UI | — |
| CT-CANAL-DEL-007 | Broker desconectado exibe indicação e QR Code para reconexão | Ambiente com WhatsApp Broker em sessão encerrada | 1. Abrir right sheet do canal Broker desconectado. 2. Verificar indicação visual de desconexão. 3. Clicar em "Conectar". | Indicação visual de desconexão exibida no right sheet. Ao clicar "Conectar": tela com QR Code atualizado exibida para reescaneamento imediato. (RN2) | 🔴 Alta | UI | — |
| CT-CANAL-DEL-008 | Broker pode ter Desconectado+Ativo simultaneamente na tabela | Broker com sessão encerrada sem ter sido desativado pelo usuário | 1. Verificar linha do canal Broker na tabela durante desconexão de sessão. | Tabela exibe "Ativo" e indicador "Desconectado" para o Broker ao mesmo tempo. Esta é a única combinação possível com esses dois estados. (RN3) | 🟡 Média | UI | — |
| CT-CANAL-DEL-009 | Perfil não-administrador não consegue excluir canal | Usuário autenticado com perfil Operador | 1. Na listagem de canais, verificar disponibilidade da opção "Excluir". | Opção "Excluir" não exibida na interface para perfil Operador. Funcionalidade inacessível ao perfil. | 🔴 Alta | UI | — |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Cenário: Excluir canal requer confirmação destrutiva no AlertDialog
  Dado que sou um administrador autenticado na tela de Canais
  E existe ao menos um canal na listagem
  Quando clico em "Excluir" no canal desejado
  Então um AlertDialog de confirmação é exibido
  E ao clicar em "Cancelar" o canal permanece na listagem inalterado
  E ao clicar no botão destrutivo de confirmação o canal é removido da listagem
```

```gherkin
Cenário: Desativar WABA não gera estado Inativo+Conectado
  Dado que sou um administrador com um canal WABA ativo e conectado
  Quando aciono a desativação do canal na right sheet
  Então o status na tabela exibe "Inativo"
  E a coluna de conexão não exibe "Conectado" simultaneamente
  E o estado "Inativo + Conectado" não existe para o canal WABA
```

---

## Validação por Agente Crítico

```
✅ Validação concluída:
   Aprovados sem alteração: 3 (CT-002, CT-005, CT-008)
   Revisados: 6 (CT-001, CT-003, CT-004, CT-006, CT-007, CT-009)
   Adicionados por cobertura insuficiente: 0 (CT-006 expandido para cobrir Messenger + Instagram)
   Total final: 9 cenários
```
