# Investigação: Canais/WhatsApp — Heartbeat 404

> **Data:** 16 de Junho de 2026  
> **Autor:** Argos QA (investigação automatizada)  
> **Fontes:** Sentry API · GitHub API · Playwright MCP · curl (live tests)  
> **Status:** DESCARTADO — ruído sem impacto funcional

---

## 📊 Resumo Executivo

Sentry ID-100942 reportava **2.822 eventos de AxiosError 404** afetando **1.535 usuários** desde 09/06/2026. O Argos-Predict classificou Canais/WhatsApp como ALTO (53 pts) com esse erro como principal sinal técnico.

Após investigação completa, confirmamos que:
- O endpoint `/auth/activity` **EXISTE** e funciona corretamente
- O 404 é retornado apenas quando a sessão expira no Redis
- O status online/offline usa **WebSocket (Soketi)**, NÃO o heartbeat HTTP
- Os 404s são **ruído sem impacto funcional** para os usuários

**Resultado:** ✅ DESCARTADO — não é problema real

---

## 🔍 Timeline da Investigação

### Passo 1: Acesso ao Sentry via API

O argos-cache.json reportava ID-100942 como "omnispa AxiosError 404". Ao acessar o Sentry:

```bash
curl -H "Authorization: Bearer $SENTRY_TOKEN" \
  "https://sentry.poli.digital/api/0/issues/100942/"
```

**Descoberta:** O ID-100942 é na verdade **AxiosError 401** (não 404). Os 404 reais são issues diferentes:

| Sentry ID | Título | Eventos | Usuários | First Seen |
|---|---|---|---|---|
| **101472** | AxiosError 404 | 2.342 | 1.491 | 12/06/2026 |
| **101601** | AxiosError 404 | 1.246 | 700 | 15/06/2026 |
| **101603** | AxiosError 404 | 34 | 27 | 15/06/2026 |

### Passo 2: Breadcrumbs do Sentry

Extraído do evento mais recente do ID-101472:

```json
{
  "type": "http",
  "category": "xhr",
  "data": {
    "method": "POST",
    "status_code": 404,
    "url": "[Filtered]"
  }
}
```

Console log:
```
"Erro ao enviar heartbeat: AxiosError: Request failed with status code 404"
```

**Conclusão:** O 404 vem do endpoint de heartbeat.

### Passo 3: Análise do Código Fonte (GitHub)

**Arquivo:** `SPA/src/shared/service/heimdallService.ts`
```typescript
import { apiLogin } from '@/config/api';

export const heimdallService = {
    async inactivity() {
        const { data } = await apiLogin.post(`/auth/inactivity`);
        return data;
    },
    async activity() {
        const { data } = await apiLogin.post(`/auth/activity`);
        return data;
    },
};
```

**Arquivo:** `SPA/src/config/api.ts`
```typescript
export const apiLogin = axios.create({
    baseURL: env.VITE_LOGIN_URL,
});
```

**Bundle de produção:**
```
VITE_LOGIN_URL:"https://heimdall.poli.digital"
```

**Conclusão:** O `heimdallService.activity()` chama `POST https://heimdall.poli.digital/auth/activity`.

### Passo 4: Testes Diretos no Endpoint

| Endpoint | Método | Status | Interpretação |
|---|---|---|---|
| `heimdall.poli.digital/auth/activity` | POST (sem token) | **401** | Endpoint existe, requer auth |
| `heimdall.qa.poli.digital/auth/activity` | POST (sem token) | **401** | Endpoint existe, requer auth |
| `heimdall.qa.poli.digital/auth/activity` | POST (com token) | **200** | Funciona com sessão válida |
| `heimdall.poli.digital/health` | GET | **200** | Heimdall produção up (~4.8d) |
| `heimdall.qa.poli.digital/health` | GET | **200** | Heimdall staging up (~4.6d) |

### Passo 5: Código do heimdall (authService.ts)

```typescript
async activity(token: string): Promise<Response> {
    const resultSession = await this.getSessionWithToken(token);
    if (!resultSession.success) {
      return { ...resultSession, data: undefined };
    }
    await this.repository.updateSessionStatus(token, SessionStatus.ACTIVE);
    return { success: true, data: { message: 'Atividade registrada com sucesso' } };
}

private async getSessionWithToken(token: string): Promise<Response<AuthDTO>> {
    const session = await this.repository.getByToken(token);
    if (!session) {
      return { success: false, status: 404, error: 'Sessão não encontrada' };
    }
    return { success: true, data: session };
}
```

**🎯 ROOT CAUSE:** O endpoint retorna **404 quando a sessão não é encontrada no Redis**.

### Passo 6: Teste E2E com Playwright (Staging)

1. Login realizado com sucesso em `spa.qa.poli.digital`
2. Request `POST https://heimdall.qa.poli.digital/auth/activity` → **200 OK** ✅
3. Status online funciona perfeitamente via WebSocket

### Passo 7: Confirmação com o Time

O time confirmou que:
- Status online/offline funciona perfeitamente na OmniSPA
- Não há relatos de clientes com problema de status na nova interface
- O heartbeat é apenas para controle de inatividade de sessão
- Status online usa WebSocket (Soketi), não heartbeat HTTP

---

## 🧩 Por que o 404 acontece?

O heartbeat é enviado a cada 5 minutos pelo hook `useUserInactivity.ts`:

```typescript
const sendHeartbeat = () => {
    if (isLoggedIn && !isInactive) {
        heimdallService.activity().catch((error) => {
            console.warn('Erro ao enviar heartbeat:', error);  // ← 404 aparece aqui
        });
        lastHeartbeat.current = Date.now();
    }
};
```

O 404 acontece quando:
1. A sessão do usuário expira no Redis (TTL atingido)
2. O Redis faz eviction por memory pressure
3. O token ainda está no localStorage, mas a sessão foi removida do Redis

**Mas isso NÃO afeta o usuário** porque:
- O status online é mantido via WebSocket (Soketi)
- O 404 do heartbeat é capturado pelo `.catch()` e apenas gera um warning no console
- O usuário continua logado e operando normalmente

---

## 📊 Impacto Real

| Aspecto | Impacto |
|---|---|
| Status online/offline | ✅ Nenhum (usa WebSocket) |
| Distribuição de chats | ✅ Nenhum (usa status WebSocket) |
| Experiência do usuário | ✅ Nenhum (404 é capturado silenciosamente) |
| Sentry | ⚠️ 3.622+ eventos de ruído |

---

## 🔧 Ações Realizadas

### 1. Argos-Predict v3.1
- Adicionado filtro de nível Sentry (`level:error` apenas)
- Logs informativos (`level: info`) agora são descartados
- Query atualizada: `?query=is:unresolved level:error`

### 2. Dashboard `docs/data.js`
- Score_tec de Canais reduzido (heartbeat 404 → peso 0)
- Notas atualizadas explicando que é ruído

---

## ✅ Conclusão

| Pergunta | Resposta |
|---|---|
| O endpoint existe? | ✅ Sim, `POST /auth/activity` no heimdall |
| O endpoint funciona? | ✅ Sim, retorna 200 com sessão válida |
| O 404 afeta o usuário? | ❌ Não, status online usa WebSocket |
| É um bug da Poli? | ❌ Não, é comportamento esperado (sessão expirada) |
| Precisa correção? | ⚠️ Baixa prioridade — poderia retornar 200 ao invés de 404 |

**Resultado final:** ✅ DESCARTADO — ruído sem impacto funcional

---

## 📎 Dados Brutos

### Sentry Issues (404 reais)
- **ID 101472:** https://sentry.poli.digital/organizations/poli/issues/101472/
- **ID 101601:** https://sentry.poli.digital/organizations/poli/issues/101601/
- **ID 101603:** https://sentry.poli.digital/organizations/poli/issues/101603/

### Código Fonte
- `heimdallService.ts`: https://github.com/poli-digital/SPA/blob/main/src/shared/service/heimdallService.ts
- `useUserInactivity.ts`: https://github.com/poli-digital/SPA/blob/main/src/hooks/useUserInactivity.ts
- `authService.ts` (heimdall): https://github.com/poli-digital/heimdall/blob/main/src/services/authService.ts

---

**Próximo passo:** Nenhum ação urgente. Se desejado, time de Dev pode ajustar heimdall para retornar 200 ao invés de 404 quando sessão expira (cosmético).
