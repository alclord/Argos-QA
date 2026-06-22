# Relatório de Execução — DEV4-4370
> Card: Remover prefixo deprecated_ dos IDs no metadata
> Iniciado em: 2026-06-10T18:30:00.000Z
> Gerado em: 2026-06-10T20:30:00.000Z
> Ambiente: https://spa-canary.poli.digital/chat
> PRs: FoundationAPI#1130, SPA#1531
> Mocks ativos: nenhum
> Versão implantada: 3.5.358-DEV4-4370

---

## Resumo Geral

| Métrica | Valor |
|---|---|
| ✅ Passou | 5 |
| ❌ Falhou | 0 |
| ⏭️ Bloqueado | 1 |
| 📊 Taxa de sucesso | 100% dos executados (5/5) |
| 🔧 Self-healings | 2 |
| 🐛 Observações | 1 (deprecated_revsync em AccountChannelData) |

---

## Resultados por Cenário

### CT-DEV4-4370-001 — Campos deprecated_* removidos do metadata do contato
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 Foco Primário | **Status:** ✅ PASSOU

| Passo | Descrição | Status |
|---|---|---|
| 1 | GET /v3/contacts/{uuid}?include=metadata,attributes,tags,channel | ✅ |
| 2 | Verificar ausência de campos deprecated_ no response | ✅ |
| 3 | Verificar campos padronizados (id, account_id) presentes | ✅ |

**Resultado Obtido:**
```json
{
  "uuid": "a1fe0016-1b37-4590-b579-d60ea92ed3d1",
  "attributes": { "name": "Argos QA DEV4-4370" },
  "metadata": {
    "id": 67414766,
    "account_id": 46667,
    "created_at": "2026-06-10T20:22:32.000000Z",
    "updated_at": "2026-06-10T20:22:32.000000Z"
  },
  "deprecated_keys_found": []
}
```
**Resultado Esperado:** metadata com campos id e account_id (não deprecated_id / deprecated_customer_id), sem chaves deprecated_ em nenhum nível  
**Divergência:** nenhuma — comportamento conforme esperado ✅  
**Nota:** RoleData em /v3/auth/get-me também usa metadata.id corretamente (confirmado)

---

### CT-DEV4-4370-002 — Contato existente resolvível com novos campos
**Criticidade:** 🔴 Alta | **Prioridade:** 🎯 Foco Primário | **Status:** ✅ PASSOU

| Passo | Descrição | Status |
|---|---|---|
| 1 | GET /v3/contacts/{uuid} | ✅ |
| 2 | Verificar uuid, attributes, name presentes | ✅ |

**Resultado Obtido:** HTTP 200, uuid presente, attributes.name = "Argos QA DEV4-4370"  
**Resultado Esperado:** Contact resolvível com campos essenciais intactos  
**Divergência:** nenhuma ✅

---

### CT-DEV4-4370-003 — UI: ContactMetaData renderiza sem erros de JS
**Criticidade:** 🟡 Média | **Prioridade:** 🎯 Foco Primário | **Status:** ⏭️ BLOQUEADO

**Motivo:** Operador canário sem chats ativos — o componente ContactMetaData.tsx está embutido no painel direito do chat. Contato criado via API não aparece na tela de contatos do SPA (sistemas legacy e foundation-api têm repositórios de contatos separados). Recomenda-se reexecutar com um operador que tenha chats ativos.  
**Causa Raiz:** test-data  
**Evidência:** CT-DEV4-4370-003_bloqueado.png

---

### CT-DEV4-4370-004 — Regressão: listagem de chats não impactada
**Criticidade:** 🟡 Média | **Prioridade:** 🔁 Regressão | **Status:** ✅ PASSOU

| Passo | Descrição | Status |
|---|---|---|
| 1 | GET /v3/accounts/:uuid/chats?status=OPEN | ✅ |
| 2 | Verificar HTTP 200 e ausência de campos deprecated_ | ✅ |

**Resultado Obtido:** HTTP 200, 0 chats, nenhum campo deprecated_ detectado  
**Resultado Esperado:** endpoint funcional e response sem campos deprecated_  
**Divergência:** nenhuma ✅

---

### CT-DEV4-4370-005 — Regressão: histórico de mensagens acessível
**Criticidade:** 🟡 Média | **Prioridade:** 🔁 Regressão | **Status:** ✅ PASSOU

| Passo | Descrição | Status |
|---|---|---|
| 1 | GET /v3/contacts/:uuid/messages | ✅ |
| 2 | Verificar HTTP 200 e ausência de campos deprecated_ | ✅ |

**Resultado Obtido:** HTTP 200, 0 mensagens, nenhum campo deprecated_ detectado  
**Resultado Esperado:** endpoint funcional e response sem campos deprecated_  
**Divergência:** nenhuma ✅

---

### CT-DEV4-4370-006 — Regressão: AccountData sem campos deprecated_
**Criticidade:** 🟢 Baixa | **Prioridade:** 🔁 Regressão | **Status:** ✅ PASSOU

| Passo | Descrição | Status |
|---|---|---|
| 1 | GET /v3/accounts?per_page=3 | ✅ |
| 2 | Verificar HTTP 200 e ausência de campos deprecated_ | ✅ |

**Resultado Obtido:** HTTP 200, 1 account, nenhum campo deprecated_ detectado no AccountData  
**Resultado Esperado:** AccountData serializado sem campos deprecated_  
**Divergência:** nenhuma ✅

---

## Bloqueios e Observações

- CT-DEV4-4370-003: Bloqueado por falta de chats ativos no operador canário. Reexecutar com operador que tenha chats em andamento.
- Contato de teste `a1fe0016-1b37-4590-b579-d60ea92ed3d1` criado no canário — teardown retornou 403 (operador sem permissão de exclusão). **Remoção manual necessária.**
- TTFC não medido — operador sem chats atribuídos, lista vazia no momento da medição.

---

## Observações de Campo

### BUG-001 — deprecated_revsync persistente em AccountChannelData (fora do escopo dos IDs, porém campo deprecated_ remanescente)

| Campo | Valor |
|---|---|
| CT de Origem | CT-DEV4-4370-001 |
| Severidade | 🟡 Moderado |
| Endpoint | GET /v3/accounts/:uuid/account-channels e GET /v3/auth/get-me |
| Canais afetados | 9 canais WABA |

**Descrição:** O campo `deprecated_revsync` continua presente no `metadata` de `AccountChannelData`, apesar de `AccountChannelData.php` estar incluído no escopo do PR #1130. Exemplo de metadata de canal afetado:

```json
{
  "name": "Canal Waba Testes",
  "provider": "WABA",
  "metadata_keys": ["id", "account_id", "external_connection_status", "deprecated_revsync", "display_on_webchat", "created_at", "updated_at"]
}
```

Os campos de ID (`id`, `account_id`) foram corretamente padronizados. O `deprecated_revsync` não é um campo de ID — pode ser um campo de sincronização interna com sistema legado (revision sync). **Ponto de atenção:** verificar se a remoção deste campo está no escopo do card ou se deve ser tratada em um card separado. @gabrielhenrique @paulobuzzeli

---

## Self-Healings

| N | Cenário | Seletor Original | Seletor Alternativo | Intenção |
|---|---|---|---|---|
| 1 | Preflight Login | `button[ref=e35]` | `button:has-text("Login")` | Clicar no botão de login |
| 2 | CT-DEV4-4370-003 | `textbox[ref=e93]` | `input[placeholder='Buscar contatos...']` | Buscar contato na lista |

---

## Dados de Teste Não Removidos

⚠️ Os seguintes recursos criados pelo Argos não foram removidos no teardown (operador sem permissão de DELETE):

| Tipo | UUID | Endpoint | Ação necessária |
|---|---|---|---|
| contact | a1fe0016-1b37-4590-b579-d60ea92ed3d1 | /v3/contacts/:uuid | Remoção manual no canário |

**PRs analisados:** FoundationAPI#1130 (31 arquivos), SPA#1531 (80 arquivos)  
**Evidências:** tests/evidence/DEV4-4370/
