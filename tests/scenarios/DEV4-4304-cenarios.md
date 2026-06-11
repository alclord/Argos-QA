# Cenários de Teste — DEV4-4304
> Card: Integrar Foto com a Meta
> Gerado em: 2026-06-03
> Card atualizado em: 2026-06-02T17:39:51.165-0300

---

## MÓDULO: CANAL

## RESUMO DO CARD

O card DEV4-4304 implementa a integração da foto de perfil de canais WABA com a API Graph da Meta, permitindo que operadores adicionem ou alterem a imagem diretamente na tela de edição do canal. A funcionalidade inclui validação local de arquivo antes do envio, feedback visual durante o upload e rollback automático em caso de falha na API da Meta. O objetivo é manter a foto sincronizada entre a plataforma Poli Digital e o painel da Meta.

---

## BLOCO 1 — Estratégia de Teste

**Escopo:** Tela de edição de canal WABA — componente de foto de perfil, integração com API Graph da Meta (endpoint `/{phone-number-id}/profile_photo`), persistência local de URL e comportamento visual (spinner, tooltip, toast).

**Tipos de teste aplicáveis:** Funcional (fluxo de upload, validações, feedback visual), Regressão (salvar canal sem foto não deve disparar chamada à Meta), Integração (mock de resposta da Meta com sucesso e erro), Segurança (upload de arquivos maliciosos, tamanho excessivo, bypass de validação local).

**Prioridade de execução:** Alta — fluxo de sucesso e rollback em falha da Meta primeiro; validações locais em seguida; testes de borda e segurança por último.

**Riscos principais:** Rollback falho deixando foto inconsistente entre plataforma e Meta; validação local bypassada enviando arquivos inválidos; chamada desnecessária à API ao salvar canal sem alterar foto; estado de loading não sendo desbloqueado após erro.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Rollback visual não executado após falha na Meta, exibindo foto incorreta | M | A | Alta |
| URL da foto persistida localmente mesmo quando Meta retorna erro | M | A | Alta |
| Validação local de formato/tamanho bypassada (ex: renomear PDF para .jpg) | M | A | Alta |
| Chamada à API da Meta disparada ao salvar canal sem alterar foto (RN2) | M | M | Média |
| Spinner de loading não desbloqueado após timeout ou erro de rede | M | M | Média |
| Token expirado da Meta tratado como sucesso por parsing incorreto da resposta | B | A | Média |
| Arquivo com tamanho exatamente igual a 5MB rejeitado incorretamente | M | B | Média |
| Tooltip não exibido ou exibido antes dos 500ms configurados | B | B | Baixa |
| Upload de arquivo com extensão válida mas conteúdo corrompido/binário inválido | B | M | Média |
| Área de clique/hover inconsistente com área visual do componente | B | B | Baixa |

---

## BLOCO 3 — Tabela de Cenários

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-CANAL-001 | Upload JPG válido com sucesso | Canal WABA ativo com token Meta válido ⚠️ Bloqueável — criável via API: `POST /api/channels` | 1. Acessar tela de edição do canal WABA. 2. Clicar em "Adicione uma foto" ou "Alterar foto". 3. Selecionar arquivo JPG válido com tamanho inferior a 5MB. 4. Clicar em "Salvar". | Spinner exibido durante upload; após retorno HTTP 200 da Meta, foto atualizada no componente visual e URL persistida no banco local. | 🔴 Alta | UI | — |
| CT-CANAL-002 | Upload PNG válido com sucesso | Canal WABA ativo com token Meta válido ⚠️ Bloqueável — criável via API: `POST /api/channels` | 1. Acessar tela de edição do canal WABA. 2. Clicar na área de hover/ícone câmera. 3. Selecionar arquivo PNG válido inferior a 5MB. 4. Clicar em "Salvar". | Foto atualizada na plataforma e no painel Meta; POST realizado para `/{phone-number-id}/profile_photo` com status 200. | 🔴 Alta | UI | — |
| CT-CANAL-003 | Arquivo acima de 5MB bloqueado localmente | Canal WABA ativo | 1. Acessar tela de edição do canal WABA. 2. Tentar selecionar arquivo JPG de 6MB. | Alerta de erro exibido imediatamente na UI sem nenhuma chamada disparada à API Graph da Meta. | 🔴 Alta | UI | — |
| CT-CANAL-004 | Formato inválido bloqueado localmente | Canal WABA ativo | 1. Acessar tela de edição do canal WABA. 2. Tentar selecionar arquivo PDF. 3. Tentar selecionar arquivo GIF. 4. Tentar selecionar arquivo BMP. | Para cada formato inválido, erro de validação exibido antes de qualquer requisição externa; nenhuma chamada à Meta. | 🔴 Alta | UI | — |
| CT-CANAL-005 | Rollback ao receber erro da Meta | Canal WABA com foto já cadastrada; endpoint Meta mockado para retornar erro (ex: 400 ou 500) | 1. Acessar tela de edição do canal WABA (foto anterior visível). 2. Selecionar nova foto JPG válida. 3. Clicar em "Salvar". 4. API da Meta retorna erro. | Foto anterior restaurada no componente visual (rollback); URL não persistida localmente; Toast de erro exibido com mensagem amigável (ex: "Não foi possível atualizar sua foto na Meta"). | 🔴 Alta | UI | CT-CANAL-001 |
| CT-CANAL-006 | Token Meta expirado gera rollback | Canal WABA com token expirado ⚠️ Bloqueável — criável via API: `PATCH /api/channels/:id` (invalidar token) | 1. Acessar tela de edição com token expirado. 2. Selecionar nova foto JPG válida. 3. Clicar em "Salvar". | Meta retorna erro de autenticação; rollback visual executado; toast de erro amigável exibido; URL não salva localmente. | 🔴 Alta | UI | CT-CANAL-005 |
| CT-CANAL-007 | Salvar canal sem alterar foto | Canal WABA ativo com foto já cadastrada | 1. Acessar tela de edição do canal WABA. 2. Alterar apenas outro campo (ex: nome do canal). 3. Clicar em "Salvar". | Nenhuma chamada realizada ao endpoint `/{phone-number-id}/profile_photo` da Meta; canal salvo com sucesso. | 🔴 Alta | UI | — |
| CT-CANAL-008 | Spinner desabilitando novos cliques | Canal WABA ativo; upload em andamento (latência simulada) | 1. Acessar tela de edição do canal WABA. 2. Selecionar foto válida e clicar em "Salvar". 3. Enquanto spinner estiver visível, clicar novamente na área de foto. | Skeleton spinner visível sobre o componente de foto; novos cliques ignorados até conclusão do upload (sucesso ou erro). | 🟡 Média | UI | CT-CANAL-001 |
| CT-CANAL-009 | Tooltip exibido após hover 500ms | Canal WABA ativo | 1. Posicionar mouse sobre o círculo de foto e aguardar menos de 500ms. 2. Posicionar mouse e aguardar mais de 500ms. | Antes de 500ms: tooltip não exibido. Após 500ms: tooltip exibido. Mesmo comportamento sobre o ícone câmera. | 🟢 Baixa | UI | — |
| CT-CANAL-010 | Arquivo exatamente em 5MB aceito | Canal WABA ativo | 1. Acessar tela de edição do canal WABA. 2. Selecionar arquivo JPG de exatamente 5MB (5.000.000 bytes). 3. Clicar em "Salvar". | Arquivo aceito pela validação local; upload disparado normalmente para a Meta. | 🟡 Média | UI | — |
| CT-CANAL-011 | Arquivo com 5MB + 1 byte rejeitado | Canal WABA ativo | 1. Acessar tela de edição do canal WABA. 2. Selecionar arquivo JPG de 5.000.001 bytes. | Erro de validação local exibido; nenhuma requisição à Meta disparada. | 🟡 Média | UI | CT-CANAL-010 |
| CT-CANAL-012 | Upload sem foto prévia — canal novo | Canal WABA recém-criado sem foto ⚠️ Bloqueável — criável via API: `POST /api/channels` | 1. Acessar tela de edição de canal sem foto. 2. Clicar em "Adicione uma foto". 3. Selecionar JPG válido. 4. Clicar em "Salvar". | Componente exibe imagem selecionada após sucesso; POST enviado à Meta; URL persistida localmente. | 🟡 Média | UI | — |
| CT-CANAL-013 | Upload de arquivo com extensão forjada | Canal WABA ativo | 1. Renomear arquivo PDF para `foto.jpg`. 2. Tentar selecionar esse arquivo na tela de edição. | Validação local deve rejeitar o arquivo com base no conteúdo/MIME type e não apenas na extensão; nenhuma chamada à Meta. | 🔴 Alta | UI | — |
| CT-CANAL-014 | Resposta 200 com body de erro da Meta | Canal WABA ativo; endpoint Meta mockado para retornar HTTP 200 com body contendo campo `error` | 1. Acessar tela de edição do canal WABA. 2. Selecionar foto válida e clicar em "Salvar". 3. Meta retorna HTTP 200 com `{"error": {"code": 190, "message": "Invalid OAuth access token"}}`. | Sistema interpreta body da resposta corretamente como erro; rollback executado; toast de erro exibido; URL não persistida. | 🔴 Alta | API | CT-CANAL-005 |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Cenário: Upload de foto válida com sucesso e sincronização com Meta
  Dado que estou na tela de edição de um canal WABA ativo
  E o token de autenticação da Meta está válido
  E não há upload em andamento
  Quando clico na área de foto e seleciono um arquivo JPG de 2MB
  E clico no botão "Salvar"
  Então o skeleton spinner é exibido sobre o componente de foto
  E novos cliques na área de foto são desabilitados durante o upload
  E um POST é realizado para "/{phone-number-id}/profile_photo" na API Graph da Meta
  E ao receber HTTP 200, a nova foto é exibida no componente visual
  E a URL da imagem é persistida no banco de dados local
```

```gherkin
Cenário: Rollback visual e toast de erro quando Meta rejeita o upload
  Dado que estou na tela de edição de um canal WABA com foto de perfil previamente cadastrada
  E a API da Meta está configurada para retornar erro na próxima requisição
  Quando clico na área de foto e seleciono um arquivo JPG válido de 3MB
  E clico no botão "Salvar"
  Então um POST é enviado para "/{phone-number-id}/profile_photo" na API Graph da Meta
  E ao receber a resposta de erro, a foto anterior é restaurada no componente visual
  E a URL da nova imagem NÃO é persistida no banco de dados local
  E um toast de erro é exibido com mensagem "Não foi possível atualizar sua foto na Meta"
  E nenhum jargão técnico ou código de erro é exibido ao usuário
```

---

## ✅ Validação por Agente Crítico Independente

Apenas estava verificando o padrão de formatação. Agora vou realizar a análise completa.

---

## Análise por Cenário

**CT-CANAL-001 — Upload JPG válido com sucesso**
Sem problemas. Rastreável ao CA1/RN2/RN3. Fluxo claro e executável.

**CT-CANAL-002 — Upload PNG válido com sucesso**
- [CT-CANAL-002] | Duplicatas | O fluxo é idêntico ao CT-CANAL-001 (selecionar imagem valida <5MB, salvar, verificar sucesso), diferindo apenas no formato do arquivo. O resultado esperado é o mesmo — spinner, HTTP 200, foto atualizada, URL persistida. O CA cita "JPG/PNG" como um único critério de aceite, não dois cenários separados. | Fundir com CT-CANAL-001 adicionando uma linha "E o teste se repete com arquivo PNG" ou cobrir PNG como passo alternativo no mesmo cenário, liberando slot para cenário mais relevante.

**CT-CANAL-003 — Arquivo acima de 5MB bloqueado localmente**
Sem problemas. Rastreável ao CA2/RN1. Executável.

**CT-CANAL-004 — Formato inválido bloqueado localmente**
- [CT-CANAL-004] | Excesso técnico | O passo 2 exige que o QA execute três seleções distintas (PDF, GIF, BMP) numa única execução, sem verificação intermediária de resultado entre cada uma. Em ferramentas de automação e até em testes manuais isso gera ambiguidade: a falha de qual formato é reportada? | Separar em sub-passos com verificação explícita após cada seleção, ou dividir em cenários CT-CANAL-004a/b/c se a granularidade for necessária para bug reports.

**CT-CANAL-005 — Rollback ao receber erro da Meta**
Sem problemas. Rastreável ao CA5/RN4/RN5. Resultado esperado cobre os três comportamentos obrigatórios do CA.

**CT-CANAL-006 — Token Meta expirado gera rollback**
- [CT-CANAL-006] | Assunções indevidas | O card não menciona o caso específico de token expirado como critério de aceite; o CA5 diz apenas "Meta retorna erro (qualquer)". CT-CANAL-005 já cobre esse comportamento genericamente. O pré-requisito "PATCH /api/channels/:id (invalidar token)" é conhecimento de implementação interna que o card não expõe. | Absorver dentro de CT-CANAL-005 como variação de tipo de erro, ou manter como cenário separado apenas se o CA citasse explicitamente tratamento de token expirado. Como o mapa de riscos lista "Token expirado tratado como sucesso por parsing incorreto", há valor de risco — manter, mas requalificar como derivado do mapa de riscos, não do CA.

**CT-CANAL-007 — Salvar canal sem alterar foto**
Sem problemas. Rastreável diretamente ao CA6/RN2. Crítico e bem descrito.

**CT-CANAL-008 — Spinner desabilitando novos cliques**
- [CT-CANAL-008] | Rastreabilidade | O CA cita "spinner visível, novos cliques desabilitados" como um único critério (CA4). Este cenário cobre apenas a parte dos cliques desabilitados; a visibilidade do spinner é testada como efeito colateral em CT-CANAL-001/002. Não é problema grave, mas a dependência declarada em CT-CANAL-001 é correta. Sem problemas adicionais.

**CT-CANAL-009 — Tooltip exibido após hover 500ms**
- [CT-CANAL-009] | Assunções indevidas | O card não menciona tooltip nem o delay de 500ms em nenhum critério de aceite ou regra de negócio. O valor "500ms" é detalhe de implementação não rastreável ao card. | Remover ou mover para um card de especificação de UI que contenha esse comportamento. Se o comportamento existir na tela mas não no card, não pertence a este conjunto de cenários.

**CT-CANAL-010 — Arquivo exatamente em 5MB aceito**
Sem problemas. Cenário de borda rastreável ao CA1 ("≤5MB"). Cobre a fronteira inclusiva corretamente.

**CT-CANAL-011 — Arquivo com 5MB + 1 byte rejeitado**
Sem problemas. Complementa CT-CANAL-010 cobrindo a fronteira exclusiva. Par de borda bem formado.

**CT-CANAL-012 — Upload sem foto prévia — canal novo**
- [CT-CANAL-012] | Rastreabilidade | O CA1 não distingue entre canal com foto existente e canal sem foto. O comportamento esperado (POST à Meta, URL persistida) é idêntico ao CT-CANAL-001. A diferença é ausência de foto prévia, o que não altera o fluxo de sucesso descrito no card. | O cenário tem valor de regressão (estado inicial diferente), mas é redundante com CT-CANAL-001 em termos de critério coberto. Manter apenas se o componente visual tiver lógica condicional documentada para o estado "sem foto". Sem elemento do card que justifique, sugere-se fundir com CT-CANAL-001 como variação de pré-condição.

**CT-CANAL-013 — Upload de arquivo com extensão forjada**
Sem problemas. Rastreável ao CA3/RN1. Cenário de segurança obrigatório e bem descrito. Cobre o risco "Validação local de formato bypassada".

**CT-CANAL-014 — Resposta 200 com body de erro da Meta**
Sem problemas. Rastreável ao risco "Token expirado tratado como sucesso por parsing incorreto" e ao RN4. Cenário crítico de integração que cobre edge case real da API Graph.

---

## Problemas Consolidados

| CT-ID | Critério | Problema | Sugestão |
|---|---|---|---|
| CT-CANAL-002 | Duplicatas | Fluxo idêntico a CT-CANAL-001, diferindo apenas no formato (PNG vs JPG), que o CA trata como único critério | Fundir com CT-CANAL-001 como variação de arquivo; reutilizar o slot para outro cenário |
| CT-CANAL-004 | Excesso técnico | Três formatos testados em sequência sem verificação intermediária gera ambiguidade em relatórios de falha | Adicionar verificação explícita após cada seleção ou separar em sub-cenários |
| CT-CANAL-006 | Assunções indevidas | Token expirado não é critério de aceite do card; pré-requisito via PATCH é conhecimento de implementação | Manter apenas como cenário derivado do mapa de riscos, sem dependência de CT-CANAL-005 |
| CT-CANAL-009 | Assunções indevidas | Tooltip e delay de 500ms não constam em nenhum CA nem RN do card | Remover do conjunto ou mover para card de spec de UI correspondente |
| CT-CANAL-012 | Rastreabilidade | Diferença de pré-condição (sem foto prévia) não altera o fluxo coberto pelo CA1; redundante com CT-CANAL-001 | Fundir com CT-CANAL-001 como variação de estado inicial, ou manter apenas se houver lógica condicional documentada |

---

## Tabela BLOCO 3 Revisada

Alterações aplicadas:
- CT-CANAL-002: fundido com CT-CANAL-001 (agora cobre JPG e PNG no mesmo cenário)
- CT-CANAL-004: verificações intermediárias adicionadas entre os formatos
- CT-CANAL-006: mantido, requalificado como derivado do mapa de riscos (sem assunção de CA)
- CT-CANAL-009: removido (não rastreável ao card)
- CT-CANAL-012: removido (redundante com CT-CANAL-001); slot reutilizado para CT-CANAL-015 cobrindo lacuna de cobertura: estado de loading não desbloqueado após erro de rede (risco Médio no mapa de riscos, sem cenário dedicado)
- Renumeração dos IDs para manter sequência sem gaps

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-CANAL-001 | Upload de foto válida (JPG e PNG) com sucesso | Canal WABA ativo com token Meta válido. Preparar dois arquivos: um JPG e um PNG, ambos abaixo de 5MB. ⚠️ Bloqueável — criável via API: `POST /api/channels` | 1. Acessar tela de edição do canal WABA. 2. Clicar em "Adicione uma foto" ou "Alterar foto". 3. Selecionar arquivo JPG válido com tamanho inferior a 5MB. 4. Clicar em "Salvar". 5. Verificar resultado. 6. Repetir os passos 2–5 com arquivo PNG válido inferior a 5MB. | Para cada formato: spinner exibido durante upload; após retorno HTTP 200 da Meta, foto atualizada no componente visual e URL persistida no banco local. POST realizado para `/{phone-number-id}/profile_photo` com status 200. | 🔴 Alta | UI | — |
| CT-CANAL-002 | Arquivo acima de 5MB bloqueado localmente | Canal WABA ativo | 1. Acessar tela de edição do canal WABA. 2. Tentar selecionar arquivo JPG de 6MB. | Alerta de erro exibido imediatamente na UI sem nenhuma chamada disparada à API Graph da Meta. | 🔴 Alta | UI | — |
| CT-CANAL-003 | Formatos inválidos bloqueados localmente | Canal WABA ativo. Preparar arquivos: um PDF, um GIF e um BMP. | 1. Acessar tela de edição do canal WABA. 2. Tentar selecionar arquivo PDF. 3. Verificar: erro de validação exibido, nenhuma chamada à Meta. 4. Tentar selecionar arquivo GIF. 5. Verificar: erro de validação exibido, nenhuma chamada à Meta. 6. Tentar selecionar arquivo BMP. 7. Verificar: erro de validação exibido, nenhuma chamada à Meta. | Para cada formato inválido: erro de validação exibido antes de qualquer requisição externa; nenhuma chamada ao endpoint da Meta; resultado verificado individualmente por formato. | 🔴 Alta | UI | — |
| CT-CANAL-004 | Rollback ao receber erro da Meta | Canal WABA com foto já cadastrada; endpoint Meta mockado para retornar erro (ex: 400 ou 500) | 1. Acessar tela de edição do canal WABA (foto anterior visível). 2. Selecionar nova foto JPG válida. 3. Clicar em "Salvar". 4. API da Meta retorna erro. | Foto anterior restaurada no componente visual (rollback); URL não persistida localmente; toast de erro exibido com mensagem amigável (ex: "Não foi possível atualizar sua foto na Meta"). | 🔴 Alta | UI | CT-CANAL-001 |
| CT-CANAL-005 | Token Meta expirado — rollback e toast | Canal WABA com token expirado. Derivado do mapa de riscos (risco: token expirado tratado como sucesso por parsing incorreto). ⚠️ Bloqueável — invalidar token via `PATCH /api/channels/:id` | 1. Acessar tela de edição com token expirado. 2. Selecionar nova foto JPG válida. 3. Clicar em "Salvar". | Meta retorna erro de autenticação; rollback visual executado; toast de erro amigável exibido; URL não salva localmente. Verificar que a resposta de erro da Meta NÃO é interpretada como sucesso (parsing correto do body). | 🔴 Alta | UI | CT-CANAL-004 |
| CT-CANAL-006 | Salvar canal sem alterar foto | Canal WABA ativo com foto já cadastrada | 1. Acessar tela de edição do canal WABA. 2. Alterar apenas outro campo (ex: nome do canal). 3. Clicar em "Salvar". | Nenhuma chamada realizada ao endpoint `/{phone-number-id}/profile_photo` da Meta; canal salvo com sucesso. | 🔴 Alta | UI | — |
| CT-CANAL-007 | Spinner desabilitando novos cliques durante upload | Canal WABA ativo; upload em andamento (latência simulada) | 1. Acessar tela de edição do canal WABA. 2. Selecionar foto válida e clicar em "Salvar". 3. Enquanto spinner estiver visível, clicar novamente na área de foto. | Skeleton spinner visível sobre o componente de foto; novos cliques ignorados até conclusão do upload (sucesso ou erro). | 🟡 Média | UI | CT-CANAL-001 |
| CT-CANAL-008 | Arquivo exatamente em 5MB aceito | Canal WABA ativo | 1. Acessar tela de edição do canal WABA. 2. Selecionar arquivo JPG de exatamente 5MB (5.000.000 bytes). 3. Clicar em "Salvar". | Arquivo aceito pela validação local; upload disparado normalmente para a Meta. | 🟡 Média | UI | — |
| CT-CANAL-009 | Arquivo com 5MB + 1 byte rejeitado | Canal WABA ativo | 1. Acessar tela de edição do canal WABA. 2. Selecionar arquivo JPG de 5.000.001 bytes. | Erro de validação local exibido; nenhuma requisição à Meta disparada. | 🟡 Média | UI | CT-CANAL-008 |
| CT-CANAL-010 | Upload de arquivo com extensão forjada | Canal WABA ativo | 1. Renomear arquivo PDF para `foto.jpg`. 2. Tentar selecionar esse arquivo na tela de edição. | Validação local deve rejeitar o arquivo com base no conteúdo/MIME type e não apenas na extensão; nenhuma chamada à Meta. | 🔴 Alta | UI | — |
| CT-CANAL-011 | Resposta HTTP 200 com body de erro da Meta | Canal WABA ativo; endpoint Meta mockado para retornar HTTP 200 com body contendo campo `error` | 1. Acessar tela de edição do canal WABA. 2. Selecionar foto válida e clicar em "Salvar". 3. Meta retorna HTTP 200 com `{"error": {"code": 190, "message": "Invalid OAuth access token"}}`. | Sistema interpreta body da resposta corretamente como erro; rollback executado; toast de erro exibido; URL não persistida. | 🔴 Alta | API | CT-CANAL-004 |
| CT-CANAL-012 | Estado de loading não persiste após erro de rede | Canal WABA ativo; rede simulada com timeout ou falha de conectividade durante o upload | 1. Acessar tela de edição do canal WABA. 2. Selecionar foto válida. 3. Simular queda de rede (ex: throttling para offline) antes de clicar "Salvar". 4. Clicar em "Salvar". 5. Aguardar timeout ou retorno de erro de rede. | Spinner encerrado após o erro; botão "Salvar" e área de foto desbloqueados; toast de erro exibido; URL não persistida. Estado de loading NÃO permanece indefinidamente. | 🟡 Média | UI | CT-CANAL-004 |

---

**Aprovados: 9 | Com problemas: 5 | Sugestões aplicadas: CT-CANAL-001 (fusão com CT-CANAL-002), CT-CANAL-003 (CT-CANAL-004 original), CT-CANAL-004 (CT-CANAL-005 original), CT-CANAL-005 (CT-CANAL-006 original), CT-CANAL-006 (CT-CANAL-007 original), CT-CANAL-007 (CT-CANAL-008 original), CT-CANAL-008/009 (CT-CANAL-010/011 originais), CT-CANAL-010 (CT-CANAL-013 original), CT-CANAL-011 (CT-CANAL-014 original), CT-CANAL-012 (novo — risco de loading não desbloqueado); removidos: CT-CANAL-002 original (fundido), CT-CANAL-009 original (não rastreável), CT-CANAL-012 original (redundante)**
