# Cenários de Teste — DEV4-4388
> Card: Adicionar autenticação via token na URL (/auth-token)
> Gerado em: 2026-06-10
> Card atualizado em: 2026-06-10T16:41:01-03:00

---

## BLOCO 1 — Estratégia de Teste

Feature nova de autenticação via token JWT na URL no **foundation-spa** (React/Vite). Escopo: rota `/auth-token`, validação de query params (`token` e `customer_id`), chamada a `POST /auth/loginWithToken`, persistência de sessão e redirecionamentos para `/chat` ou `/login`. O endpoint backend está fora do escopo deste card — testar exclusivamente o comportamento do frontend.

**Tipos aplicáveis:** funcional (fluxo de entrada via URL), regressão (fluxo `/auth` WL existente), segurança (exposição de token JWT em URL/storage) e UX (loading state e responsividade).

**Prioridade de execução:** CT-AUTH-001 → CT-AUTH-003 → CT-AUTH-004 → CT-AUTH-002 → CT-AUTH-005 → CT-AUTH-006 → CT-AUTH-008 → CT-AUTH-007.

**Riscos principais:** (1) redirecionamento para `/login` não ocorre após erro de endpoint, deixando o usuário no loading; (2) regressão silenciosa no fluxo `/auth` existente; (3) token JWT exposto via histórico do browser/logs de servidor.

> ⚠️ **Pré-condição crítica de ambiente:** Endpoint backend `POST /auth/loginWithToken` deve estar disponível no ambiente de teste. Confirmar com o time de desenvolvimento antes da execução.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Redirecionamento para `/login` não ocorre após erro no endpoint | M | A | Alta |
| Regressão no fluxo `/auth` (whitelabel existente) | B | A | Alta |
| Dados de sessão não persistidos corretamente após autenticação bem-sucedida | M | A | Alta |
| Token JWT exposto via histórico do browser ou logs de servidor | B | A | Alta |
| `customer_id` não-numérico aceito — API chamada desnecessariamente | M | M | Média |
| Ausência de parâmetros não detectada — usuário não redirecionado para `/login` | B | A | Alta |
| Loading state ausente — usuário sem feedback durante autenticação | M | B | Baixa |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-AUTH-001 | Autenticação com params válidos → /chat | Endpoint `POST /auth/loginWithToken` disponível no ambiente; token JWT válido e customer_id numérico fornecidos previamente pelo time de desenvolvimento | 1. Abrir o browser na URL `/auth-token?token={token_válido}&customer_id=123`; 2. Observar que a página exibe indicador visual de carregamento durante o processamento; 3. Aguardar o redirecionamento completar | URL muda para `/chat`; usuário autenticado consegue navegar e interagir normalmente com a interface — **Vínculo:** CA1 | 🔴 Alta | UI | — |
| CT-AUTH-002 | Regressão — fluxo /auth WL inalterado | Credenciais de autenticação WL válidas disponíveis ⚠️ Consultar documentação do fluxo `/auth` existente ou solicitar parâmetros corretos ao time de dev antes da execução | 1. Navegar para `/auth` com os parâmetros de autenticação WL corretos; 2. Verificar comportamento completo do fluxo até o redirecionamento final | Fluxo `/auth` conclui normalmente; redirecionamento ocorre conforme comportamento pré-deploy; nenhuma regressão observada — **Vínculo:** CA4, RN3 | 🔴 Alta | UI | — |
| CT-AUTH-003 | Acesso sem `token` → redireciona para /login | Ambiente acessível | 1. Navegar para `/auth-token?customer_id=123` (sem o parâmetro `token`); 2. Observar comportamento da página | Página redireciona para `/login`. _(Verificação adicional via DevTools > Network: confirmar que nenhuma requisição para `/auth/loginWithToken` foi disparada)_ — **Vínculo:** CA2, RN2 | 🔴 Alta | UI | — |
| CT-AUTH-004 | Acesso sem `customer_id` → redireciona para /login | Ambiente acessível | 1. Navegar para `/auth-token?token=abc123` (sem o parâmetro `customer_id`); 2. Observar comportamento da página | Página redireciona para `/login`. _(Verificação adicional via DevTools > Network: confirmar que nenhuma requisição para `/auth/loginWithToken` foi disparada)_ — **Vínculo:** CA2, RN2 | 🔴 Alta | UI | — |
| CT-AUTH-005 | Erro no endpoint → redireciona para /login | Endpoint disponível; token inválido ou expirado para provocar erro (ex: HTTP 401 ou 500) ⚠️ Bloqueável — necessita token específico para provocar erro no ambiente; criável via acordo com time de dev | 1. Navegar para `/auth-token?token={token_inválido}&customer_id=123`; 2. Aguardar processamento (a página pode exibir indicador de carregamento durante a chamada); 3. Aguardar o redirecionamento completar | Após resposta de erro do endpoint, página redireciona para `/login`; usuário não está autenticado e não consegue acessar áreas restritas — **Vínculo:** CA3 | 🔴 Alta | UI | CT-AUTH-001 |
| CT-AUTH-006 | customer_id não-numérico → redireciona para /login | Ambiente acessível | 1. Navegar para `/auth-token?token=abc123&customer_id=nao_numerico`; 2. Observar comportamento da página | Página redireciona para `/login`. _(Verificação adicional via DevTools > Network: confirmar que nenhuma requisição para `/auth/loginWithToken` foi disparada — a validação deve ocorrer no frontend antes da API call)_ — **Vínculo:** RN1 | 🟡 Média | UI | — |
| CT-AUTH-007 | URL sem query params → redireciona para /login | Ambiente acessível | 1. Navegar para `/auth-token` (sem nenhum query param na URL); 2. Observar comportamento da página | Página redireciona para `/login` — **Vínculo:** RN2. _(Nota: variação de CT-AUTH-003/004; mantida como smoke test de primeiro acesso à rota)_ | 🟢 Baixa | UI | — |
| CT-AUTH-008 | Token da URL não persiste no armazenamento do browser | Ambiente com autenticação funcional; token válido disponível | 1. Navegar para `/auth-token?token={token_válido}&customer_id=123`; 2. Após redirecionamento para `/chat`, abrir DevTools > Application > localStorage e sessionStorage; 3. Verificar o conteúdo do armazenamento | O valor do `token` passado como query param na URL NÃO está presente em localStorage nem sessionStorage; quaisquer dados de sessão presentes são os padrão de autenticação da plataforma — **Vínculo:** Boa prática de segurança ⚠️ Pendente validação com PO/Security — o card não documenta explicitamente esta restrição | 🔴 Alta | UI | CT-AUTH-001 |

**Legenda de vínculos:** CA = Critério de Aceite | RN = Regra de Negócio

---

## BLOCO 4 — Cenários Gherkin (BDD)

> Os 2 cenários de criticidade 🔴 Alta mais diretamente relacionados à feature principal.

```gherkin
Cenário: Autenticação bem-sucedida via token na URL redireciona para /chat
  Dado que o endpoint POST /auth/loginWithToken está disponível no ambiente
  E que um token JWT válido e um customer_id numérico estão disponíveis
  Quando o usuário navega para "/auth-token?token={token_válido}&customer_id=123"
  Então a página exibe indicador visual de carregamento durante o processamento
  E a chamada POST /auth/loginWithToken é executada com token e customer_id corretos
  E o usuário é redirecionado para "/chat"
  E o usuário consegue navegar e interagir normalmente com a interface
```

```gherkin
Cenário: Erro no endpoint de autenticação redireciona para /login
  Dado que o endpoint POST /auth/loginWithToken retorna erro (ex: HTTP 401 ou 500)
  E que um token inválido e um customer_id numérico estão presentes na URL
  Quando o usuário navega para "/auth-token?token={token_inválido}&customer_id=123"
  Então a página pode exibir indicador de carregamento durante a chamada ao endpoint
  E após a resposta de erro, o usuário é redirecionado para "/login"
  E o usuário não está autenticado e não consegue acessar áreas restritas
```

---

## Validação por Agente Crítico Independente

✅ **Validação concluída:**
- Aprovados sem alteração: 0
- Revisados: 8 (CT-AUTH-001, CT-AUTH-002, CT-AUTH-003, CT-AUTH-004, CT-AUTH-005, CT-AUTH-006, CT-AUTH-007, CT-AUTH-008)
- Adicionados por cobertura insuficiente: 0

**Principais correções aplicadas:**
- Referências a `data-testid`, `user_token_login_info` e nomes de funções internas removidas dos passos/resultados principais → movidas para notas de automação
- Verificações de chamadas de rede via DevTools tornadas notas adicionais opcionais (não passos obrigatórios)
- CT-AUTH-007: criticidade reduzida para 🟢 Baixa (subconjunto lógico de CT-AUTH-003/004)
- CT-AUTH-008: adicionada flag ⚠️ pendente validação com PO/Security (sem âncora no card)
- CT-AUTH-002: adicionada nota de referência ao fluxo WL existente
