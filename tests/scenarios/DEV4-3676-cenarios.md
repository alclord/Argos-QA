# QA Scenarios — DEV4-3676

## Card Info
- **Título:** Habilitar URL dinâmica em botões de Template (WhatsApp) via API
- **Tipo:** História
- **Prioridade:** Highest
- **Épico:** GPD-513
- **Escopo:** Apenas API/backend. Front-end em card separado.
- **Responsável QA:** Yuri Alcantara (conta logada)

## Critérios de Aceite
1. No envio do template, o serviço consegue substituir o valor do placeholder por um parâmetro fornecido no payload de envio
2. O template enviado mantém o botão clicável e o destino final é a URL já resolvida
3. Retrocompatibilidade: templates antigos com URL fixa continuam funcionando sem mudança

## Regras de Negócio
- **Placeholder dinâmico:** URL pode conter `{{{{1}}}}` que será substituído no envio
- **Exemplo de URL:** `{{example}}/{{sample_url}}` para validação e submissão
- **Retrocompatibilidade:** templates antigos com URL fixa continuam funcionando

---

## Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-TMP-001 | Enviar template com URL dinâmica e placeholder substituído | Template com botão URL com `{{{{1}}}}` criado; conta com canal WABA ativo | 1. POST em `/v3/contacts/{uuid}/messages` com payload contendo `header.buttons[0].url={{{{1}}}}` e valor de substituição fornecido | 1. Response HTTP 201 com `ack: CREATED` e URL do botão resolved (placeholder `{{{{1}}}}` substituído) | 🔴 Alta | API | — |
| CT-TMP-002 | Enviar template com URL fixa (retrocompatibilidade) | Template com botão URL fixa (sem placeholder) existente | 1. POST em `/v3/contacts/{uuid}/messages` com payload de template de URL fixa | 1. Response HTTP 201 com `ack: CREATED` e botão URL funciona normalmente | 🔴 Alta | API | — |
| CT-TMP-003 | Enviar template sem fornecer parâmetro de substituição | Template com botão URL com `{{{{1}}}}`; payload não contém parâmetro | 1. POST em `/v3/contacts/{uuid}/messages` com payload onde placeholder existe mas valor não é fornecido | 1. Response HTTP 400 com erro indicando parâmetro de substituição ausente | 🟡 Média | API | — |
| CT-TMP-004 | Validar criação de template com URL dinâmica via API | Permissão de Gestor/Admin | 1. POST em `/v3/templates` com `components[buttons][type=url][url={{{{1}}}}]` e `example={{https://app.poli.digital/setup?user=14}}` | 1. Response HTTP 201 com template criado e URL placeholder persistida | 🔴 Alta | API | — |
| CT-TMP-005 | Atualizar template existente com URL dinâmica | Template de URL fixa já existente | 1. PUT em `/v3/templates/{uuid}` com nova URL contendo placeholder | 1. Response HTTP 200 com template atualizado e placeholder persistido | 🔴 Alta | API | — |
| CT-TMP-006 | Validar URL com placeholder mal formatado | — | 1. POST em `/v3/templates` com URL `{{{1}}` (3 chaves de cada lado) | 1. Response HTTP 400 com erro de validação indicando formato inválido | 🟡 Média | API | — |
| CT-TMP-007 | Enviar template com múltiplos placeholders | Template com URL contendo `{{{{1}}}}` e `{{{{2}}}}` | 1. POST com payload fornecendo valores para ambos placeholders | 1. Response HTTP 201 com ambos substituídos OU HTTP 400 indicando formato não suportado | 🟡 Média | API | — |
| CT-TMP-008 | Enviar template para contato inexistente | Template com URL dinâmica criado | 1. POST em `/v3/contacts/{uuid-inexistente}/messages` | 1. Response HTTP 404 com erro de contato não encontrado | 🟡 Média | API | — |
| CT-TMP-009 | Validar example_url para submissão à Meta | Template com URL dinâmica | 1. POST em `/v3/templates` com `example_urls=[{url: "https://example.com?user=123"}]` | 1. Response HTTP 201 confirmando example válido para submissão | 🟡 Média | API | — |
| CT-TMP-010 | Atualizar template com URL dinâmica para URL fixa | Template com URL dinâmica já existente | 1. PUT em `/v3/templates/{uuid}` alterando URL de `{{{{1}}}}` para URL fixa | 1. Response HTTP 200 com template atualizado — URL fixa funciona em envio | 🟢 Baixa | API | — |
| CT-TMP-011 | Validar segurança: URL com protocolo inválido ou malicious | — | 1. POST em `/v3/templates` com URL `javascript:alert(1)` ou placeholder com valor resolvido para domínio não permitido | 1. Response HTTP 400 com erro de validação de protocolo/segurança | 🔴 Alta | API | — |

---

## Cenários Gherkin (BDD)

```gherkin
Cenário: Envio de template WhatsApp com URL dinâmica e placeholder substituído
  Dado que existe um template com botão de URL contendo placeholder "{{1}}"
  E o contato possui canal WABA ativo
  Quando envio o template via API com payload fornecendo valor para o placeholder
  Então a resposta deve ter status HTTP 201
  E o ack deve ser "CREATED"
  E o botão URL no template enviado deve conter a URL com o valor substituído

Cenário: Retrocompatibilidade — template com URL fixa continua funcionando
  Dado que existe um template com botão de URL fixa (sem placeholder)
  Quando envio o template via API
  Então a resposta deve ter status HTTP 201
  E o botão URL deve funcionar normalmente com a URL original
```

---

## Resumo de Cobertura

| Categoria | Quantidade |
|---|---|
| Total de cenários | 11 |
| 🔴 Alta criticidade | 5 |
| 🟡 Média criticidade | 5 |
| 🟢 Baixa criticidade | 1 |
| Modo API | 11 |

---

*Gerado por Argos-QA em 09/06/2026*