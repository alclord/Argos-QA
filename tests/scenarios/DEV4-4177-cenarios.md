# Cenários de Teste — DEV4-4177
> Card: Erro no modelo llama-3.1-8b-instant — NoneType object has no attribute 'get'
> Gerado em: 2026-05-19

---

## BLOCO 1 — Estratégia de Teste

**Escopo:** Correção de bug no serviço Jarvis (sugestão de respostas por IA no PoliChat) onde o modelo `llama-3.1-8b-instant` retorna `None` ou resposta vazia, causando exceção não tratada (`'NoneType' object has no attribute 'get'`). O foco é garantir que o tratamento de resposta nula/vazia foi implementado corretamente e que o operador recebe um fallback adequado em vez de uma falha silenciosa ou stack trace exposto.

**Tipos de teste:** Funcional (fluxo normal + cenário de falha do modelo), Regressão (Jarvis continua funcionando após a correção), Segurança (stack trace não vaza para o frontend), Integração (comportamento real com o modelo llama).

**Prioridade de execução:** Alta — bug em produção confirmado por Sentry (#73422, #69939), impactando operadores ativamente com falha silenciosa no fluxo de sugestão de IA.

**Riscos principais:** Tratamento de `None` corrige o crash mas fallback inadequado ainda prejudica a UX do operador; fix não cobre outros modelos que possam retornar `None`; stack trace ainda exposto no frontend após deploy.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Tratamento de None implementado mas fallback não exibido ao operador (falha silenciosa persiste) | M | A | 🔴 Alta |
| Stack trace ou mensagem de erro interna vazando para o frontend do operador | B | A | 🔴 Alta |
| Regressão: Jarvis para de funcionar para outros modelos após o fix | B | A | 🔴 Alta |
| Bug reproduzível em produção mesmo após deploy da correção (fix incompleto) | B | A | 🔴 Alta |
| Fallback exibido, mas texto inadequado (confuso ou técnico demais para o operador) | M | M | 🟡 Média |
| None retornado intermitentemente — fix trata apenas o caso determinístico | M | M | 🟡 Média |
| Outros modelos que retornam None não cobertos pelo mesmo tratamento | M | M | 🟡 Média |
| Logs do erro não sendo emitidos após o fix (perda de observabilidade) | B | M | 🟡 Média |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade |
|---|---|---|---|---|---|
| CT-JARVIS-001 | Jarvis sugere resposta com modelo funcional | PoliChat com Jarvis habilitado; conversa ativa; modelo llama-3.1-8b-instant retornando resposta válida | 1. Abrir uma conversa no PoliChat. 2. Aguardar ou acionar a sugestão Jarvis. 3. Verificar exibição da sugestão na interface do operador. | Sugestão de resposta exibida corretamente ao operador. Sem erros no console ou na interface. Fluxo normal do Jarvis funciona. | 🔴 Alta |
| CT-JARVIS-002 | Fallback exibido quando modelo retorna None | Jarvis configurado com llama-3.1-8b-instant; ambiente que simula retorno None do modelo (staging/mock) | 1. Simular/forçar retorno None do modelo llama-3.1-8b-instant. 2. Acionar sugestão Jarvis no PoliChat. 3. Verificar comportamento na interface do operador. 4. Verificar logs do serviço. | Interface exibe fallback adequado ao operador (não exibe erro técnico). Nenhuma exceção não tratada no servidor. Logs registram o evento de None com contexto suficiente para diagnóstico. | 🔴 Alta |
| CT-JARVIS-003 | Fallback exibido quando modelo retorna string vazia | Jarvis configurado; ambiente com retorno de string vazia pelo modelo | 1. Simular retorno de string vazia (`""`) pelo modelo. 2. Acionar sugestão Jarvis. 3. Verificar comportamento na interface e nos logs. | Interface exibe fallback adequado. Serviço não lança exceção. Comportamento idêntico ao cenário de None. | 🔴 Alta |
| CT-JARVIS-004 | Stack trace não vaza para o frontend | Jarvis com retorno None; DevTools do navegador abertos | 1. Simular retorno None do modelo. 2. Acionar sugestão Jarvis. 3. Inspecionar a resposta da requisição no DevTools (Network). 4. Verificar o conteúdo exibido ao operador na UI. | Resposta da API não contém stack trace, traceback Python, ou detalhes internos da exceção. Operador vê apenas mensagem de fallback amigável. | 🔴 Alta |
| CT-JARVIS-005 | Regressão: Jarvis funciona com outros modelos | PoliChat com Jarvis; outros modelos disponíveis além do llama-3.1-8b-instant | 1. Configurar Jarvis com modelo diferente do llama-3.1-8b-instant. 2. Acionar sugestão normalmente. 3. Verificar fluxo completo. | Outros modelos continuam funcionando normalmente após o deploy da correção. Nenhuma regressão introduzida. | 🔴 Alta |
| CT-JARVIS-006 | Reprodução do cenário Sentry #73422 | Acesso ao ambiente que gerou o erro original; log de 2026-05-12 disponível para referência | 1. Reproduzir as condições do erro registrado em Sentry #73422 (modelo retornando None). 2. Verificar comportamento após o fix. | O caminho de código que gerava `'NoneType' object has no attribute 'get'` não lança mais exceção. Fix cobre o cenário exato do Sentry. | 🔴 Alta |
| CT-JARVIS-007 | Requisições concorrentes com None intermitente | Múltiplas conversas simultâneas no PoliChat; Jarvis ativo | 1. Simular várias requisições simultâneas ao Jarvis. 2. Forçar que algumas retornem None e outras retornem resposta válida. 3. Verificar o comportamento de cada requisição independentemente. | Requisições com resposta válida exibem sugestão corretamente. Requisições com None exibem fallback. Nenhuma requisição válida é afetada pelo tratamento de None das outras. | 🟡 Média |
| CT-JARVIS-008 | Texto do fallback é adequado para o operador | Interface do operador após fix; modelo retornando None | 1. Simular retorno None. 2. Verificar o texto exato exibido ao operador como fallback. | Mensagem de fallback é compreensível para o operador (não técnica). Não menciona "None", "NoneType", "AttributeError" ou termos de stack trace. | 🟡 Média |
| CT-JARVIS-009 | Logs emitidos corretamente após tratamento de None | Acesso aos logs do serviço Jarvis; modelo retornando None | 1. Simular retorno None do modelo. 2. Acionar sugestão Jarvis. 3. Verificar logs do serviço Jarvis. | Log registra o evento de None com: timestamp, ID da conversa, modelo utilizado e identificação do erro. Observabilidade mantida mesmo após tratamento do erro. | 🟡 Média |
| CT-JARVIS-010 | None retornado não afeta conversa em andamento | Conversa ativa com histórico de mensagens no PoliChat | 1. Com conversa ativa, simular retorno None do Jarvis. 2. Verificar se o operador ainda consegue enviar mensagens manualmente. 3. Tentar acionar Jarvis novamente na mesma conversa. | Conversa continua funcionando normalmente. Operador pode enviar mensagens manuais. Próxima tentativa do Jarvis funciona normalmente (se o modelo retornar resposta válida). | 🟡 Média |
| CT-JARVIS-011 | Modelo retorna estrutura inesperada não-None | Ambiente de teste com mock do modelo; Jarvis ativo | 1. Simular retorno de estrutura inesperada pelo modelo (ex: lista vazia, número, objeto sem campo esperado). 2. Acionar sugestão Jarvis. 3. Verificar comportamento. | Serviço trata a resposta inesperada sem lançar exceção não tratada. Fallback exibido ao operador. Comportamento similar ao tratamento de None. | 🟡 Média |
| CT-JARVIS-012 | Fix não introduz latência perceptível | Jarvis funcionando normalmente; modelo retornando resposta válida | 1. Medir tempo de resposta do Jarvis para chamadas com resposta válida após o deploy. 2. Comparar com baseline ou expectativa de SLA do serviço. | Latência do Jarvis para respostas válidas não aumentou de forma perceptível após o fix (tratamento de None não adiciona overhead no caminho feliz). | 🟢 Baixa |
| CT-JARVIS-013 | Sentry não registra novo evento após o fix | Acesso ao Sentry; deploy aplicado em produção | 1. Após deploy, monitorar Sentry por nova ocorrência de `'NoneType' object has no attribute 'get'`. 2. Verificar ausência de novos eventos do mesmo tipo nas primeiras 48h. | Nenhum novo evento da exceção `'NoneType' object has no attribute 'get'` registrado no Sentry após o fix. | 🟢 Baixa |

---

## BLOCO 4 — Cenários Gherkin (BDD)

### CT-JARVIS-001
```gherkin
Cenário: Jarvis exibe sugestão corretamente com modelo funcional
  Dado que o Jarvis está habilitado no PoliChat
  E o modelo llama-3.1-8b-instant está retornando respostas válidas
  Quando o operador aciona a sugestão Jarvis em uma conversa ativa
  Então a sugestão de resposta é exibida corretamente na interface do operador
  E nenhum erro é exibido no console ou na interface
```

### CT-JARVIS-002
```gherkin
Cenário: Fallback exibido ao operador quando modelo retorna None
  Dado que o Jarvis está configurado com o modelo llama-3.1-8b-instant
  E o modelo retorna None para a requisição de sugestão
  Quando o operador aciona a sugestão Jarvis
  Então a interface exibe um fallback adequado ao operador
  E nenhuma exceção não tratada é lançada no servidor
  E os logs registram o evento de None com contexto de diagnóstico
```

### CT-JARVIS-003
```gherkin
Cenário: Fallback exibido quando modelo retorna string vazia
  Dado que o Jarvis está ativo
  E o modelo retorna string vazia como resposta
  Quando o operador aciona a sugestão Jarvis
  Então a interface exibe fallback adequado
  E o serviço não lança exceção
```

### CT-JARVIS-004
```gherkin
Cenário: Stack trace não vaza para o frontend do operador
  Dado que o modelo llama-3.1-8b-instant retornou None
  E o Jarvis foi acionado pelo operador
  Quando a resposta é retornada para o frontend
  Então o corpo da resposta não contém stack trace, traceback ou detalhes internos da exceção
  E o operador visualiza apenas uma mensagem de fallback amigável
```

### CT-JARVIS-005
```gherkin
Cenário: Outros modelos não regridem após o fix
  Dado que o fix do None foi deployado em produção
  E o Jarvis está configurado com um modelo diferente do llama-3.1-8b-instant
  Quando o operador aciona sugestões normalmente
  Então as sugestões continuam sendo exibidas corretamente
  E nenhuma regressão é observada no fluxo do Jarvis
```

### CT-JARVIS-006
```gherkin
Cenário: Reprodução do cenário Sentry #73422 não lança exceção após fix
  Dado que as condições do erro Sentry #73422 são reproduzidas
  E o modelo llama-3.1-8b-instant retorna None conforme log de 2026-05-12
  Quando o caminho de código que gerava a exceção é executado
  Então nenhuma exceção 'NoneType' object has no attribute 'get' é lançada
  E o fluxo é tratado corretamente pelo handler de None implementado
```

---

## Sugestões para o QA

### Automação

| Cenário | ROI | Justificativa |
|---|---|---|
| CT-JARVIS-002 + CT-JARVIS-003 | ⭐⭐⭐⭐⭐ Muito Alto | Testes de regressão críticos — garantem que o tratamento de None/vazio não é removido em deploys futuros. Fácil de automatizar com mock do modelo. |
| CT-JARVIS-004 | ⭐⭐⭐⭐⭐ Muito Alto | Segurança: verificar que a resposta da API não contém campos de erro interno. Automatizável como teste de contrato/snapshot da resposta. |
| CT-JARVIS-013 | ⭐⭐⭐⭐ Alto | Monitor Sentry pós-deploy. Pode ser integrado como alerta automático no pipeline de CI/CD — qualquer nova ocorrência da exceção falha o smoke test. |
| CT-JARVIS-007 | ⭐⭐⭐ Médio | Concorrência com None intermitente requer setup mais elaborado, mas protege contra race conditions no tratamento. |

### Boas Práticas
- Verificar com o time de backend qual é exatamente o "fallback adequado" definido no card — o texto da mensagem exibida ao operador deve ser validado contra o critério de aceite antes de escrever CT-JARVIS-008, pois se o critério não estiver documentado o teste ficará subjetivo.
- Para reproduzir o Sentry #73422 de forma determinística, solicitar ao time de backend o contexto exato da chamada (payload, modelo, versão do Jarvis) — isso transforma CT-JARVIS-006 de um teste manual em um teste automatizável de regressão.
- Verificar se outros modelos usados no Jarvis têm o mesmo caminho de código — se sim, o risco de regressão do CT-JARVIS-005 aumenta e merece ser expandido para cobrir cada modelo individualmente.

### Monitoramento Pós-deploy
- Acompanhar o Sentry (#73422 e #69939) nas primeiras 48h após deploy — ausência de novos eventos confirma que o fix cobriu o caminho de código afetado.
- Monitorar a **taxa de fallback do Jarvis** nos logs (requisições que atingem o handler de None / total de requisições) — valor acima de 1-2% pode indicar instabilidade no modelo `llama-3.1-8b-instant` além do bug corrigido, sinalizando necessidade de investigação de infraestrutura.
- Verificar se há alertas configurados para a exceção `'NoneType' object has no attribute 'get'` — se não houver, sugerir ao time a criação de alerta de threshold no Sentry para detecção precoce de regressões similares.
