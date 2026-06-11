# Cenários de Teste — DEV4-4356
> Card: Redirecionar URLs de chat legadas para novo identificador UUID
> Gerado em: 2026-06-09
> Card atualizado em: 2026-06-09T09:23:34.896-0300

---

## Estratégia de Teste

**Escopo:** Feature de roteamento no SPA — toda verificação requer navegação de browser. O núcleo é o mapeamento ID numérico → UUID no backend e o redirecionamento transparente no frontend. Tipos aplicáveis: **funcional** (happy path e error path), **regressão** (URL canônica direta não quebra), **segurança** (ID de outra conta), **UX** (automático, sem hash na URL final). Prioridade de execução: redirecionamento válido → erro para ID inexistente → formato hash → borda. Risco principal: mapeamento backend ausente no canary (pré-condição bloqueante), pois o card ainda está "Pronto para desenvolvimento" sem PR vinculado.

---

## Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Redirecionamento não implementado no canary (card ainda em dev) | A | A | 🔴 Alta |
| Mapeamento ID→UUID ausente ou inconsistente para alguns chats | M | A | 🔴 Alta |
| URL final ainda contém hash ou ID numérico após redirecionamento | M | A | 🔴 Alta |
| Erro genérico em vez de estado "chat não encontrado" para ID inexistente | M | M | 🟡 Média |
| Redirecionamento para chat de outra conta (ausência de validação de escopo) | B | A | 🟡 Média |
| ID numérico inválido/malformado gera comportamento indefinido | B | M | 🟡 Média |
| Hash format (`/chat#ID`) não testável por pendência de configuração externa | A | B | 🟢 Baixa |

---

## Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-CHATURL-001 | URL legada path numérico → redireciona para UUID | Chat com ID numérico conhecido e UUID correspondente no canary. ⚠️ Bloqueável — verificar via backend se mapeamento existe. Exemplo (CA1): ID `15281766` → UUID `e087be2f-a7ad-4e51-96b4-9562369ff671` | 1. Autenticar no canary. 2. Acessar `https://spa-canary.poli.digital/chat/15281766`. 3. Aguardar resolução completa da URL. 4. Verificar URL final na barra de endereços. 5. Verificar que nenhum prompt, modal ou botão de confirmação foi exibido durante o redirecionamento. 6. Verificar que o chat carregou corretamente. | Redirecionamento automático. URL final é `https://spa-canary.poli.digital/chat/e087be2f-a7ad-4e51-96b4-9562369ff671`. Nenhuma interação manual foi solicitada. Chat visível e funcional. *(CA1, CA2, CA5, RN01, RN05)* | 🔴 Alta | UI | — |
| CT-CHATURL-002 | URL canônica UUID carrega sem redirecionamento | UUID de chat válido existente no canary. | 1. Autenticar no canary. 2. Acessar `https://spa-canary.poli.digital/chat/e087be2f-a7ad-4e51-96b4-9562369ff671` diretamente. 3. Verificar URL na barra de endereços após carregamento completo. | URL permanece idêntica à acessada. Chat exibido normalmente. *(RN01 — regressão da rota canônica)* | 🔴 Alta | UI | — |
| CT-CHATURL-003 | ID numérico inexistente → erro chat não encontrado | Nenhum chat com o ID numérico informado existente no sistema. | 1. Autenticar no canary. 2. Acessar `https://spa-canary.poli.digital/chat/99999999`. 3. Aguardar resposta da aplicação. 4. Verificar mensagem exibida na tela. | Exibe estado de erro "chat não encontrado" (ou equivalente na UI). Nenhum redirecionamento incorreto ocorre. *(CA3, RN04)* | 🔴 Alta | UI | — |
| CT-CHATURL-004 | URL final não contém hash após redirecionamento | Mesmo pré-req do CT-CHATURL-001. | 1. Acessar `https://spa-canary.poli.digital/chat/15281766`. 2. Aguardar carregamento completo. 3. Inspecionar a URL exibida na barra de endereços. | URL final não contém o caractere `#`. Formato é `/chat/{uuid}` puro. *(CA4, RN03)* | 🔴 Alta | UI | CT-CHATURL-001 |
| CT-CHATURL-005 | URL legada com hash `/chat#ID` → redireciona | Chat com ID numérico conhecido mapeado para UUID válido no backend. ⚠️ Bloqueável — dependência de configuração externa para suporte ao formato de hash no domínio legado. | 1. Autenticar. 2. Acessar `https://app-spa.poli.digital/chat#15281766`. 3. Aguardar resolução. 4. Verificar URL final. | Redireciona para `https://spa.poli.digital/chat/{uuid}` correspondente. URL final sem hash. *(RN02, RN03 — formato hash legado)* | 🔴 Alta | UI | — |
| CT-CHATURL-006 | ID inválido (não numérico) não gera crash *(borda — sem âncora explícita no card; adicionado por robustez)* | — | 1. Autenticar no canary. 2. Acessar `https://spa-canary.poli.digital/chat/abc123`. 3. Verificar URL final na barra de endereços e mensagem exibida na tela. | Exibe erro adequado (rota inválida ou não encontrada). Sem crash ou comportamento indefinido na aplicação. *(borda de entrada inválida)* | 🟡 Média | UI | — |
| CT-CHATURL-008 | ID de outra conta não expõe chat alheio *(segurança — sem âncora explícita no card; adicionado por iniciativa de QA)* | Usuário autenticado na conta X. ID numérico pertencente à conta Y (diferente). | 1. Autenticar na conta X. 2. Acessar `https://spa-canary.poli.digital/chat/{id-da-conta-Y}`. 3. Verificar comportamento da aplicação e URL final. | Não redireciona para o chat da conta Y. Exibe estado de erro (chat não encontrado ou acesso negado). Nenhum dado de outra conta é exposto. *(segurança multi-tenant)* | 🔴 Alta | UI | — |

---

## Cenários Gherkin (BDD)

```gherkin
Cenário: URL legada com ID numérico é redirecionada para UUID correto
  Dado que existe um chat com ID numérico "15281766" mapeado para UUID "e087be2f-a7ad-4e51-96b4-9562369ff671"
  E o usuário está autenticado no sistema
  Quando o usuário acessa "https://spa-canary.poli.digital/chat/15281766"
  Então o sistema redireciona automaticamente para "https://spa-canary.poli.digital/chat/e087be2f-a7ad-4e51-96b4-9562369ff671"
  E nenhuma interação manual é necessária
  E a URL final não contém hash nem o ID numérico original
```

```gherkin
Cenário: ID numérico sem correspondência UUID exibe erro adequado
  Dado que não existe nenhum chat com ID numérico "99999999" no sistema
  E o usuário está autenticado
  Quando o usuário acessa "https://spa-canary.poli.digital/chat/99999999"
  Então o sistema exibe o estado de erro "chat não encontrado" (ou equivalente)
  E nenhum redirecionamento incorreto ocorre
```

---

## Validação por Agente Crítico

```
✅ Validação por agente crítico concluída:
   Aprovados sem alteração: 2 (CT-CHATURL-001, CT-CHATURL-004)
   Revisados: 5 (CT-CHATURL-002, CT-CHATURL-003, CT-CHATURL-005, CT-CHATURL-006, CT-CHATURL-008)
   Fundidos: CT-CHATURL-007 → incorporado como passo 5 em CT-CHATURL-001
   Adicionados por cobertura insuficiente: 0
   Total: 7 cenários
```
