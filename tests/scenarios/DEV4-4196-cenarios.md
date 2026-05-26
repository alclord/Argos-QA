# Cenários de Teste — DEV4-4196
> Card: Ordenação incorreta na renderização de mensagens dentro do chat (Nova Interface)
> Gerado em: 2026-05-19

---

## BLOCO 1 — Estratégia de Teste

**Escopo:** Bug de renderização exclusivo da Nova Interface onde mensagens chegando em burst (sequência rápida) são exibidas fora da ordem cronológica. O banco de dados e a API estão corretos — a falha está no componente/store frontend que acumula mensagens sem garantir ordenação por timestamp antes de renderizar. Testes cobrem: paridade entre Nova Interface e Legado, cenários de burst (cliente, operador, misto), carregamento inicial de histórico e comportamento pós-reconexão WebSocket.

**Tipos de teste:** Funcional (ordenação pós-fix nos cenários de burst), Regressão (chats com volume normal + Interface Legada inalterada), Comparativo (Legado vs Nova Interface no mesmo chat), UX (experiência do operador lendo conversa em ordem correta).

**Prioridade de execução:** Alta — bug visível e reproduzível que compromete diretamente a qualidade do atendimento e a confiança na Nova Interface, impactando o processo de migração dos clientes do legado.

**Riscos principais:** Fix corrige burst mas introduz regressão em chats de volume normal; mensagens com timestamps idênticos causam ordenação instável; fix atua apenas no carregamento inicial mas não no stream de eventos WebSocket em tempo real (ou vice-versa); Legado é afetado indevidamente pela mudança.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Fix corrige burst mas introduz regressão em chats com volume normal de mensagens | M | A | 🔴 Alta |
| Ordenação corrigida no carregamento inicial mas não no stream WebSocket em tempo real (fix incompleto) | M | A | 🔴 Alta |
| Ordenação corrigida no stream WebSocket mas não no carregamento inicial do histórico (fix incompleto) | M | A | 🔴 Alta |
| Bug original ainda reproduzível após deploy em algum subconjunto do cenário de burst | B | A | 🔴 Alta |
| Interface Legada afetada indevidamente pela mudança no frontend | B | A | 🔴 Alta |
| Mensagens com timestamps idênticos geram ordenação instável (sort não-estável) | M | M | 🟡 Média |
| Reconexão WebSocket re-renderiza mensagens fora de ordem | M | M | 🟡 Média |
| Ordenação baseada em timestamp do cliente (não do banco) — vulnerável a clock skew | B | M | 🟡 Média |
| Histórico extenso de mensagens com performance degradada após inserção de sort | B | M | 🟡 Média |
| Regressão em cenário de mensagem única (sem burst) | B | B | 🟢 Baixa |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade |
|---|---|---|---|---|---|
| CT-MSG-001 | Burst de cliente exibe mensagens em ordem correta | Nova Interface; conversa ativa; cliente externo envia 5+ mensagens em sequência rápida | 1. Abrir uma conversa na Nova Interface como operador. 2. Solicitar ao cliente (ou simular) o envio de 5 mensagens em sequência rápida. 3. Observar a ordem de exibição das mensagens na tela. | Mensagens exibidas na ordem cronológica correta (1, 2, 3, 4, 5). Nenhuma inversão ou troca de posição observada. (CA01) | 🔴 Alta |
| CT-MSG-002 | Paridade de ordem entre Legado e Nova Interface | Mesma conversa com mensagens em burst; acesso simultâneo a Legado e Nova Interface | 1. Abrir o mesmo chat pelo Legado e pela Nova Interface (duas abas/dispositivos). 2. Enviar ou ter enviadas 5+ mensagens em burst. 3. Comparar a ordem de exibição em ambas as interfaces. | Ordem de exibição idêntica em Legado e Nova Interface. Nenhuma divergência de sequência entre as duas versões. (CA02, RN03) | 🔴 Alta |
| CT-MSG-003 | Bug original não reproduzível após fix | Nova Interface pós-fix; condições do bug original (burst de mensagens) | 1. Reproduzir o cenário exato do bug: enviar 5 mensagens em sequência rápida. 2. Verificar se a ordem exibida corresponde à ordem de envio (1, 2, 3, 4, 5). 3. Repetir 3 vezes para confirmar consistência. | Sequência incorreta (ex: 1, 2, 4, 3, 5) NÃO ocorre. Bug original não reproduzível após o fix. | 🔴 Alta |
| CT-MSG-004 | Chat com volume normal não regride | Nova Interface pós-fix; conversa com mensagens enviadas em intervalos normais | 1. Abrir uma conversa com mensagens enviadas com intervalos normais (não burst). 2. Verificar a ordem de exibição das mensagens. 3. Enviar novas mensagens normalmente e verificar posição na lista. | Mensagens exibidas na ordem cronológica correta. Nenhuma regressão introduzida pelo fix em chats de uso normal. (CA06) | 🔴 Alta |
| CT-MSG-005 | Operador envia burst e ordem é preservada | Nova Interface; operador envia 5+ mensagens em sequência rápida na mesma conversa | 1. Como operador, digitar e enviar 5 mensagens em sequência rápida na Nova Interface. 2. Observar a ordem de exibição após envio. | Mensagens do operador exibidas na ordem de envio. Sem inversão de posição entre mensagens do operador em burst. (CA04) | 🔴 Alta |
| CT-MSG-006 | Mensagens mistas em burst preservam ordem cronológica | Conversa ativa; cliente e operador enviam mensagens intercaladas em sequência rápida | 1. Simular envio intercalado de mensagens entre cliente e operador em sequência rápida (ex: cliente M1, operador M2, cliente M3, operador M4). 2. Verificar a ordem de exibição na Nova Interface. | Mensagens exibidas em ordem cronológica rigorosa, respeitando os timestamps independentemente de quem enviou. (CA05, RN01) | 🔴 Alta |
| CT-MSG-007 | Ordem de exibição bate com timestamps no banco | Nova Interface pós-fix; acesso ao banco de dados (tabela `messages`) | 1. Enviar 5 mensagens em burst. 2. Verificar a ordem de exibição na Nova Interface. 3. Consultar a tabela `messages` no banco e comparar timestamps com a ordem exibida. | A sequência de exibição na tela é idêntica à sequência de timestamps na tabela `messages`. Nenhuma divergência entre DB e UI. (CA03, RN01) | 🔴 Alta |
| CT-MSG-008 | Reconexão WebSocket re-renderiza mensagens em ordem | Nova Interface com WebSocket ativo; simular queda e reconexão | 1. Abrir conversa na Nova Interface. 2. Forçar reconexão do WebSocket (ex: desconectar e reconectar rede). 3. Verificar a ordem das mensagens após re-renderização. | Mensagens re-renderizadas após reconexão mantêm a ordem cronológica correta. Sem inversões introduzidas pelo processo de reconexão. | 🟡 Média |
| CT-MSG-009 | Mensagens com timestamps idênticos têm ordenação estável | Ambiente de teste; injetar mensagens com timestamps exatamente iguais | 1. Simular chegada de 2 ou mais mensagens com timestamps idênticos na Nova Interface. 2. Verificar a ordem de exibição. 3. Atualizar a tela e verificar se a ordem se mantém. | Ordenação estável — mensagens com timestamps iguais mantêm sempre a mesma posição relativa entre si (sem alternância ou instabilidade a cada render). | 🟡 Média |
| CT-MSG-010 | Ordenação usa timestamp do servidor, não do cliente | DevTools abertos; inspecionar payload dos eventos WebSocket | 1. Abrir conversa na Nova Interface. 2. Enviar mensagens e inspecionar os eventos WebSocket no DevTools. 3. Verificar qual campo de timestamp é usado para ordenação no componente de estado. | O campo de ordenação é o timestamp fornecido pelo servidor/banco (não gerado pelo cliente). Clock skew do dispositivo do cliente não afeta a posição das mensagens. (RN01) | 🟡 Média |
| CT-MSG-011 | Carregamento inicial de histórico extenso exibe em ordem | Conversa com histórico de 100+ mensagens na Nova Interface | 1. Abrir uma conversa com histórico extenso de mensagens. 2. Verificar a ordem de exibição do histórico carregado. 3. Scrollar pela conversa completa. | Histórico exibido em ordem cronológica ascendente (mais antiga → mais recente) do início ao fim. Sem inversões em nenhum trecho da conversa. | 🟡 Média |
| CT-MSG-012 | Interface Legada não é afetada pelo fix | Interface Legada pós-deploy do fix; mesma conversa com burst | 1. Acessar a mesma conversa pela Interface Legada após o deploy. 2. Verificar ordem de exibição das mensagens. 3. Enviar novas mensagens e verificar posição. | Interface Legada continua exibindo mensagens na ordem correta. Nenhuma alteração de comportamento introduzida pelo fix na versão legada. | 🟡 Média |
| CT-MSG-013 | Mensagem única sem burst exibe corretamente | Nova Interface; envio de mensagem isolada | 1. Abrir conversa na Nova Interface. 2. Enviar uma única mensagem. 3. Verificar posição na lista. | Mensagem única exibida na posição correta (mais recente, ao final da lista). Sem regressão no caso simples de mensagem individual. | 🟢 Baixa |

---

## BLOCO 4 — Cenários Gherkin (BDD)

### CT-MSG-001
```gherkin
Cenário: Burst de mensagens do cliente exibido em ordem cronológica na Nova Interface
  Dado que o operador está com uma conversa aberta na Nova Interface
  Quando o cliente envia 5 mensagens em sequência rápida
  Então as mensagens são exibidas na ordem cronológica correta (1, 2, 3, 4, 5)
  E nenhuma inversão de posição é observada entre as mensagens
```

### CT-MSG-002
```gherkin
Cenário: Nova Interface exibe mesma ordem que Interface Legada
  Dado que o mesmo chat está aberto no Legado e na Nova Interface
  Quando mensagens em burst são enviadas na conversa
  Então a ordem de exibição é idêntica em ambas as interfaces
  E nenhuma divergência de sequência é observada entre as versões
```

### CT-MSG-003
```gherkin
Cenário: Bug original de ordenação não reproduzível após o fix
  Dado que o fix de ordenação foi deployado na Nova Interface
  Quando 5 mensagens são enviadas em sequência rápida
  Então a sequência exibida corresponde à ordem de envio (1, 2, 3, 4, 5)
  E a sequência incorreta (ex: 1, 2, 4, 3, 5) não ocorre em nenhuma repetição do teste
```

### CT-MSG-004
```gherkin
Cenário: Chat com volume normal de mensagens não regride após o fix
  Dado que o fix de ordenação foi deployado
  E a conversa possui mensagens enviadas com intervalos normais entre si
  Quando o operador abre a conversa na Nova Interface
  Então as mensagens são exibidas na ordem cronológica correta
  E o comportamento é idêntico ao esperado antes do fix
```

### CT-MSG-005
```gherkin
Cenário: Burst de mensagens do operador é exibido em ordem correta
  Dado que o operador está com uma conversa aberta na Nova Interface
  Quando o operador envia 5 mensagens em sequência rápida
  Então as mensagens do operador são exibidas na ordem de envio
  E nenhuma inversão de posição é observada entre elas
```

### CT-MSG-006
```gherkin
Cenário: Mensagens mistas em burst preservam ordem cronológica
  Dado que cliente e operador estão enviando mensagens intercaladas em sequência rápida
  Quando as mensagens chegam na Nova Interface
  Então a ordem de exibição segue rigorosamente os timestamps das mensagens
  E a posição de cada mensagem independe de quem a enviou
```

### CT-MSG-007
```gherkin
Cenário: Ordem de exibição na tela bate com timestamps no banco
  Dado que mensagens em burst foram enviadas e exibidas na Nova Interface
  Quando o QA consulta a tabela messages no banco de dados
  Então a sequência de timestamps no banco é idêntica à ordem de exibição na tela
  E nenhuma divergência é encontrada entre a UI e o banco de dados
```

---

## Sugestões para o QA

### Automação

| Cenário | ROI | Justificativa |
|---|---|---|
| CT-MSG-001 + CT-MSG-003 | ⭐⭐⭐⭐⭐ Muito Alto | Regressão crítica — reproduzir o bug de burst e verificar ordenação é simples de automatizar: injetar N mensagens com timestamps definidos e assertar a sequência de renderização. Deve rodar a cada deploy da Nova Interface. |
| CT-MSG-002 | ⭐⭐⭐⭐⭐ Muito Alto | Teste de paridade Legado vs Nova Interface. Pode ser automatizado como snapshot de ordenação: comparar o array de IDs de mensagens renderizados em ambas as interfaces para o mesmo chat. |
| CT-MSG-007 | ⭐⭐⭐⭐ Alto | Teste de contrato entre UI e banco — assertar que a sequência de `message_id` exibida bate com a sequência ordenada por timestamp na tabela `messages`. |
| CT-MSG-008 | ⭐⭐⭐ Médio | Reconexão WebSocket requer simulação de queda de rede, mas protege contra um vetor de regressão frequente em componentes reativos. |

### Boas Práticas
- Para garantir que o cenário de burst seja reproduzível, definir com o time de frontend o intervalo de tempo exato entre mensagens que dispara o bug (threshold de latência variável entre eventos WebSocket). Isso permite criar fixtures determinísticas em vez de depender de timing manual.
- Ao executar CT-MSG-002 (paridade Legado vs Nova Interface), fazer a comparação pelo array de IDs de mensagens em ordem — não apenas pela leitura visual — para garantir precisão em conversas longas.
- Para CT-MSG-009 (timestamps idênticos), verificar com o time de backend se o banco garante unicidade de timestamps ou se colisões são possíveis. Se forem possíveis, o critério de desempate (ex: `id` crescente) deve ser documentado e testado.

### Monitoramento Pós-deploy
- Acompanhar tickets de suporte com tema de "ordem de mensagens" ou "mensagem fora de lugar" nas primeiras 48h após o deploy — meta: 0 ocorrências novas (conforme tabela de métricas do card).
- Monitorar o processo de migração de clientes do Legado para a Nova Interface — a correção deste bug é um desbloqueador para a migração, portanto a taxa de adoção da Nova Interface deve aumentar após o fix.
- Se houver tracking de eventos no frontend (ex: Amplitude), verificar se o evento de "abertura de chat" na Nova Interface passa a ter a mesma taxa de engajamento que o Legado — discrepâncias podem indicar que operadores ainda estão evitando a Nova Interface por desconfiança na ordenação.
