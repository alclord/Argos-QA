# Cenários de Teste — DEV4-4276
> Card: Widget para Site
> Gerado em: 2026-06-01
> Card atualizado em: 2026-06-01T08:23:44.361-0300

---

## Resumo do Card

- **Título:** Widget para Site
- **Tipo:** História
- **Prioridade:** Medium
- **Status:** Aguardando Revisão Final
- **Épico pai:** DEV4-4166 — Nova Estrutura de Páginas na Nova Interface da Poli
- **Objetivo:** Reestruturar a tela de configuração do Widget para Site na Nova Interface, permitindo que o administrador configure um botão flutuante para instalar em seu site externo, selecionando canais WhatsApp ativos, configurando um CTA e copiando o embed script gerado.
- **Regras de Negócio:**
  1. RN1: Apenas canais WhatsApp com status "Ativo" aparecem no seletor. Canais inativos não podem ser selecionados.
  2. RN2: Script embed gerado dinamicamente pelo token da conta. Campo de código é somente leitura — nenhum caractere pode ser digitado ou adicionado.
  3. RN3: Botão "Copiar" usa Clipboard API e exibe feedback visual de sucesso ao clicar.
  4. RN4: Em ambiente já configurado, botão "Salvar" inicia desabilitado e só habilita após alteração de CTA ou canal.
  5. RN5: Campos do right sheet são obrigatórios.

---

## BLOCO 1 — Estratégia de Teste

A feature reestrutura a configuração do Widget para Site na Nova Interface, cobrindo acesso via dropdown na tela de Canais, seleção de canal WhatsApp ativo, configuração de CTA, geração de embed script read-only e cópia via Clipboard API. Testes aplicáveis: **funcional** (fluxo completo de configuração e cópia), **regressão** (filtro de canais ativos, proteção do campo de código), **UX** (estado do botão Salvar em ambiente configurado, feedback de cópia, mobile) e **segurança** (imutabilidade do script embed via DOM). Execução prioritária: RN1 (filtro de canais), RN2 (read-only do código) e RN3 (cópia com feedback). Risco principal: canal inativo aparecer no seletor ou campo de código aceitar edição, comprometendo a integridade do script gerado.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Canal WhatsApp inativo aparece no seletor (RN1 violada) | M | A | Alta |
| Campo de código embed aceita digitação (RN2 violada) | B | A | Alta |
| Botão "Copiar" não usa Clipboard API — cópia falha silenciosamente | M | A | Alta |
| Botão "Salvar" habilitado em ambiente configurado sem alteração (RN4 violada) | M | M | Alta |
| Alerta de sucesso da cópia não exibido ou exibido incorretamente | B | M | Média |
| Campos obrigatórios não validados — salva sem CTA ou sem canal | M | A | Alta |
| Script embed gerado com token incorreto da conta | B | A | Alta |
| Layout mobile quebrado (right sheet fora da tela ou campos inacessíveis) | B | M | Baixa |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-WIDGET-001 | Acesso ao right sheet via Canais → atalhos | Administrador autenticado; tela de Canais acessível na Nova Interface | 1. Navegar para a tela de Canais na Nova Interface. 2. Localizar e clicar no botão "atalhos". 3. No dropdown, clicar em "botão flutuante". | Right sheet abre com subtítulo "botão flutuante do whatsapp" e texto explicativo sobre a funcionalidade. Campos de canal e CTA são exibidos. (RN1, RN5; UX do card) | 🔴 Alta | UI | — |
| CT-WIDGET-002 | Configurar widget e copiar código com sucesso | CT-WIDGET-001 concluído; ao menos 1 canal WhatsApp ativo na conta | 1. No right sheet, selecionar um canal WhatsApp ativo no seletor. 2. Preencher o campo CTA. 3. Verificar que o campo de código está preenchido e read-only. 4. Clicar em "Copiar". | Campo de código exibe o embed script. Ao clicar em "Copiar": alerta de sucesso exibido e o código completo é copiado para a área de transferência (Clipboard API). (RN2, RN3) | 🔴 Alta | UI | CT-WIDGET-001 |
| CT-WIDGET-003 | Salvar desabilitado com campos obrigatórios vazios | CT-WIDGET-001 concluído; right sheet aberta sem configuração prévia (first-time setup) | 1. Não preencher o campo CTA. 2. Não selecionar canal. 3. Verificar estado do botão "Salvar". | Botão "Salvar" exibido como desabilitado (não clicável) enquanto campos obrigatórios estiverem vazios. (RN5 — não confundir com RN4 que se aplica a ambiente já configurado) | 🔴 Alta | UI | CT-WIDGET-001 |
| CT-WIDGET-004 | Campo de código embed é read-only | CT-WIDGET-002 concluído; right sheet com código exibido | 1. Clicar dentro do campo de código embed. 2. Tentar digitar qualquer caractere (ex: "teste"). 3. Tentar deletar parte do código. | Nenhum caractere é inserido ou removido. O campo rejeita todas as tentativas de edição. A seleção manual do texto é permitida. (RN2) | 🔴 Alta | UI | CT-WIDGET-001 |
| CT-WIDGET-005 | Conta sem canais WhatsApp ativos exibe seletor sem opções | Administrador autenticado; conta sem canais WhatsApp com status "Ativo" (pode conter canais de outros tipos — apenas ausência de WhatsApp ativo é o critério) | 1. Abrir right sheet do Widget para Site. 2. Expandir o seletor de canal. 3. Verificar a lista de opções disponíveis. | O seletor não exibe nenhum canal WhatsApp disponível. Canais inativos não aparecem como opção selecionável. O comportamento de estado vazio (placeholder ou lista vazia) deve ser verificado conforme o layout. (RN1) | 🔴 Alta | UI | CT-WIDGET-001 |
| CT-WIDGET-006 | Salvar desabilitado em ambiente já configurado | Administrador autenticado; widget já configurado anteriormente (canal e CTA definidos e salvos) | 1. Abrir right sheet do Widget para Site com configuração existente. 2. Verificar estado inicial do botão "Salvar" sem realizar nenhuma alteração. | Botão "Salvar" aparece desabilitado ao entrar na tela com configuração existente e sem alterações pendentes. (RN4) | 🟡 Média | UI | CT-WIDGET-001 |
| CT-WIDGET-007 | Alterar CTA habilita botão Salvar | CT-WIDGET-006 concluído (ambiente configurado, botão desabilitado) | 1. Com o botão "Salvar" desabilitado, alterar o campo CTA para um valor diferente do salvo. 2. Verificar estado do botão "Salvar". | Botão "Salvar" habilita após a alteração do CTA. **Nota:** o comportamento de re-desabilitar ao reverter para o valor original deve ser verificado com o time de desenvolvimento antes de ser tratado como critério de falha. (RN4) | 🟡 Média | UI | CT-WIDGET-006 |
| CT-WIDGET-008 | Canal inativo não aparece no seletor | Administrador autenticado; conta com ao menos 1 canal WhatsApp inativo e 1 canal WhatsApp ativo | 1. Abrir right sheet do Widget para Site. 2. Expandir o seletor de canal. 3. Verificar a lista de opções. | Apenas o canal WhatsApp com status "Ativo" é listado. O canal inativo não aparece como opção selecionável. (RN1) | 🔴 Alta | UI | CT-WIDGET-001 |
| CT-WIDGET-009 | Script embed não pode ser adulterado via manipulação DOM | Administrador autenticado com conhecimento de DevTools; right sheet com código embed exibido | 1. Abrir DevTools (F12) do browser. 2. Inspecionar o campo de código embed e verificar que o atributo `readonly` está presente. 3. Remover o atributo `readonly` via painel de inspeção do DOM. 4. Tentar digitar no campo. 5. Fechar e reabrir o right sheet. | O campo possui atributo `readonly` na inspeção. Ao reabrir o right sheet, o script exibido é o gerado pelo token da conta (RN2) — qualquer adulteração via DOM é descartada ao recarregar o componente. (RN2 — cenário de segurança; requer QA com conhecimento de DevTools ou delegação ao time de segurança) | 🔴 Alta | UI | CT-WIDGET-001 |
| CT-WIDGET-010 | Botão Copiar sem canal selecionado não copia conteúdo inválido | CT-WIDGET-001 concluído; campos não preenchidos; foco específico no comportamento do botão "Copiar" (diferente de CT-WIDGET-003 que foca no botão "Salvar") | 1. Abrir right sheet sem selecionar canal ou preencher CTA. 2. Verificar o estado do botão "Copiar" (habilitado ou desabilitado). 3. Se habilitado, clicar e verificar o conteúdo copiado. | O botão "Copiar" deve estar desabilitado, oculto ou ao menos não copiar conteúdo inválido/string vazia sem configuração. **Nota:** o comportamento exato deve ser alinhado com o time de produto — o resultado esperado definitivo depende da especificação de quando o botão "Copiar" é habilitado. (RN2, RN3) | 🟢 Baixa | UI | CT-WIDGET-001 |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Cenário: Campo de código embed não aceita edição manual
  Dado que sou um administrador autenticado na Nova Interface
  E o right sheet do Widget para Site está aberto com um canal ativo selecionado
  E o campo de código embed exibe o script gerado
  Quando clico dentro do campo de código e tento digitar qualquer caractere
  Então nenhum caractere é inserido no campo
  E ao tentar deletar parte do código, o texto permanece inalterado
  E a seleção manual do texto ainda é permitida
```

```gherkin
Cenário: Copiar código exibe alerta de sucesso e copia para área de transferência
  Dado que sou um administrador autenticado na Nova Interface
  E o right sheet do Widget para Site está aberto
  E selecionei um canal WhatsApp ativo e preenchi o campo CTA
  E o campo de código embed exibe o script gerado
  Quando clico no botão "Copiar"
  Então um alerta de sucesso é exibido na tela
  E o código completo do script embed é copiado para a área de transferência do meu sistema operacional
```

---

## Validação por Agente Crítico

```
✅ Validação concluída:
   Aprovados sem alteração: 5 (CT-001, CT-002, CT-004, CT-006, CT-008)
   Revisados: 5 (CT-003, CT-005, CT-007, CT-009, CT-010)
   Adicionados por cobertura insuficiente: 0
   Total final: 10 cenários
```
