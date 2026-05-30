# Cenários de Teste — DEV4-4180
> Card: Tela de Configurações Gerais
> Gerado em: 2026-05-29
> Card atualizado em: 2026-05-29T11:01:28-03:00

> ⚠️ KB inacessível — KB_PATH ausente e GH CLI não disponível neste ambiente. Cenários gerados com base exclusiva no card; pré-condições envolvendo perfis de permissão podem precisar de ajuste fino com o ambiente de staging.
> ⚠️ Critérios de Aceite não preenchidos no card — cenários derivados de Regras de Negócio e User Stories. Validar com o time de produto antes da execução.

---

## Estratégia de Teste

Melhoria de Design de prioridade Média para a tela de Configurações da Nova Interface (épico DEV4-4166). O escopo central é a renderização correta do grid de cards em dois grupos (Atendimento e Empresa), o comportamento de navegação dos cards e o controle dinâmico de visibilidade por permissão. Tipos de teste aplicáveis: funcional (estrutura, navegação, RN1/RN2), controle de acesso (RN3), UX (RN4, layout do grid) e segurança (acesso direto a URL restrita). Maior risco: RN3 — cards omitidos do DOM versus apenas ocultados via CSS, e proteção de rota nas subtelas.

---

## Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Card restrito oculto via CSS em vez de omitido do DOM (RN3 violado) | A | A | Alta |
| Perfil não autorizado acessa subtela restrita via URL direta | M | A | Alta |
| Área clicável do card restrita ao título/ícone em vez de cobrir o box inteiro (RN2 violado) | M | A | Alta |
| Seção sem nenhum card visível (todos omitidos por permissão) — cabeçalho orfão renderizado | M | M | Média |
| Grid quebrado (overflow, sobreposição) com número reduzido de cards por permissão | M | M | Média |
| Ícone fallback Lucide ausente ou errado em Whitelabel (RN5) | B | M | Baixa |

---

## Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-CONF-001 | Tela de configurações exibe duas seções completas | Usuário com perfil **Administrador com permissão irrestrita a todos os módulos** autenticado na Nova Interface | 1. Fazer login como Administrador com permissão irrestrita. 2. Clicar no ícone ou texto "Configurações" no menu lateral. 3. Inspecionar a tela carregada. | Tela exibe exatamente duas seções: **"Configurações do Atendimento"** com 6 cards (Templates, Etiquetas, Gestão de Contatos, Departamentos, Canais e Logs, Distribuição) e **"Configurações da Empresa"** com 9 cards (Minha Empresa, Gestão de Usuários, Market Place, Configurações de IA, Assinatura, Segurança, Permissões, Ações Críticas, Exportar Conversas). Total de 15 cards visíveis — pois o perfil possui acesso irrestrito (RN1 + RN3). | 🔴 Alta | UI | — |
| CT-CONF-002 | Card da seção Atendimento navega para subtela | Administrador com permissão irrestrita autenticado; tela de Configurações aberta (CT-CONF-001 passou). | 1. Na seção "Configurações do Atendimento", clicar em qualquer ponto interno do card "Templates". 2. Observar a URL atual e o conteúdo exibido. | Redirecionamento imediato para a subtela de Templates. URL do browser atualizada para a rota correspondente. Vínculo: RN2 — "clique em qualquer área interna do box dispara redirecionamento imediato para a rota da subtela correspondente". | 🔴 Alta | UI | CT-CONF-001 |
| CT-CONF-003 | Card da seção Empresa navega para subtela | Administrador com permissão irrestrita autenticado; tela de Configurações aberta. | 1. Na seção "Configurações da Empresa", clicar em qualquer ponto interno do card "Minha Empresa". 2. Observar a URL atual e o conteúdo. | Redirecionamento imediato para a subtela de Minha Empresa. URL atualizada para a rota correspondente. Vínculo: RN2. | 🔴 Alta | UI | CT-CONF-001 |
| CT-CONF-004 | Área inteira do card é clicável (RN2) | Administrador com permissão irrestrita autenticado; tela de Configurações aberta. | 1. Clicar em um ponto do card "Etiquetas" que não seja o ícone nem o texto do título (ex: canto inferior do card). 2. Voltar para a tela de Configurações. 3. Repetir clicando em um ponto equivalente do card "Departamentos". | Redirecionamento para a subtela correspondente ocorre nos dois cliques. A área clicável cobre o box inteiro do card — não apenas ícone ou título. Vínculo: RN2 — "qualquer área interna do box". | 🔴 Alta | UI | CT-CONF-001 |
| CT-CONF-005 | Cards renderizam ícone, título e subtexto (RN4) | Administrador com permissão irrestrita autenticado; tela de Configurações aberta. | 1. Percorrer visualmente todos os 15 cards da tela. 2. Verificar que cada card exibe: 1 ícone, 1 título em negrito, 1 subtexto descritivo curto. | Todos os 15 cards exibem os três elementos obrigatórios (ícone, título, subtexto). Nenhum card com ícone quebrado (placeholder ou 404), sem título ou sem subtexto. Vínculo: RN4. | 🟡 Média | UI | CT-CONF-001 |
| CT-CONF-006 | Breadcrumb correto na subtela acessada via card | Administrador com permissão irrestrita autenticado; tela de Configurações aberta. | 1. Clicar no card "Departamentos". 2. Verificar o breadcrumb exibido no topo da subtela carregada. | Breadcrumb exibe: `Configurações > Departamentos`. Vínculo: especificação de UX do card — "Todas as telas presentes nesses atalhos terão breadcrumb Configurações > [nome da tela]". | 🟡 Média | UI | CT-CONF-002 |
| CT-CONF-007 | Operador não visualiza cards restritos | Usuário com perfil Operador sem permissão para cards administrativos (ex: Assinatura, Ações Críticas, Segurança, Permissões) autenticado na Nova Interface. ⚠️ Bloqueável — requer perfil Operador configurado no ambiente. Nota: os 4 cards escolhidos representam módulos tipicamente restritos a perfis operacionais — confirmar mapeamento de permissões com o time antes da execução. | 1. Fazer login com perfil Operador. 2. Navegar para a tela de Configurações. 3. Verificar os cards exibidos na seção "Configurações da Empresa". | Cards restritos ao perfil Operador (ex: Assinatura, Ações Críticas, Segurança, Permissões) **não aparecem na tela**. Os cards são completamente ausentes — não aparecem desabilitados, esmaecidos ou com ícone de cadeado. Vínculo: RN3. | 🔴 Alta | UI | — |
| CT-CONF-008 | Card restrito ausente do DOM, não apenas oculto | Perfil Operador autenticado; DevTools do browser disponível. | 1. Login com perfil Operador. 2. Navegar para a tela de Configurações. 3. Abrir DevTools > Inspecionar o DOM. 4. Buscar o elemento do card "Assinatura" (por texto ou classe identificadora). | O elemento do card "Assinatura" **não existe no DOM**. Não deve ser encontrado com `display:none` ou `visibility:hidden`. A árvore de renderização não contém o card. Vínculo: RN3 — "ocultado do grid" = removido da árvore de renderização, não apenas invisível. | 🔴 Alta | UI | CT-CONF-007 |
| CT-CONF-009 | Acesso direto via URL a subtela restrita (segurança) | Perfil Operador autenticado. URL da subtela "Assinatura" obtida previamente com login Admin. **Nota:** este cenário cobre defesa em profundidade além da tela de Configurações — valida que a proteção de permissão não é exclusivamente client-side (card omitido na UI). | 1. Com sessão de Operador ativa, colar a URL direta da subtela "Assinatura" no browser. 2. Pressionar Enter. | Sistema bloqueia o acesso: redireciona para página de "Sem permissão" ou para a home da Nova Interface. A subtela de Assinatura **não é exibida** ao Operador, mesmo via URL direta. | 🔴 Alta | UI | CT-CONF-007 |
| CT-CONF-010 | Perfil parcial — grid sem erros de layout | Usuário com permissão para alguns cards (ex: 3 do Atendimento e 2 da Empresa) autenticado. ⚠️ Bloqueável — requer perfil de permissão intermediária configurado no ambiente. | 1. Login com perfil de permissão parcial. 2. Navegar para Configurações. 3. Verificar layout do grid e console do browser. | Apenas os cards autorizados são exibidos. O grid alinha corretamente os cards restantes sem lacunas anômalas, overflow ou sobreposição. Sem erros de JavaScript no console. Vínculo: RN3 (visibilidade dinâmica). | 🟡 Média | UI | — |
| CT-CONF-011 | Grid não quebra com 1 card por seção (borda mínima) | Usuário com acesso a exatamente 1 card na seção Atendimento e 1 na seção Empresa. ⚠️ Bloqueável — requer perfil de acesso mínimo configurado. | 1. Login com perfil de acesso mínimo. 2. Navegar para Configurações. 3. Verificar cada seção individualmente. | Ambas as seções renderizam com seus cabeçalhos e 1 card cada. Layout sem overflow, sobreposição ou espaço em branco anômalo. Seções exibem o título da seção mesmo com apenas 1 card. Vínculo: RN1 (estrutura estática de cabeçalhos) + RN3. | 🟡 Média | UI | — |
| CT-CONF-012 | Ícones Lucide corretos em Whitelabel | Acesso a ambiente Whitelabel configurado em staging (se disponível). ⚠️ Bloqueável — requer ambiente Whitelabel disponível. | 1. Acessar a Nova Interface em ambiente Whitelabel. 2. Navegar para a tela de Configurações. 3. Verificar os ícones de cada card. | Ícones exibidos são os fallbacks Lucide conforme **tabela de mapeamento definida no card** (ex: Templates → `rocket`; Etiquetas → `tags`; Distribuição → `split`; Assinatura → `credit-card`). Nenhum ícone do DS Poli exibido. Vínculo: RN5 + tabela de ícones fallback do card. | 🟢 Baixa | UI | CT-CONF-001 |

---

## Cenários Gherkin (BDD)

### CT-CONF-001 — Administrador visualiza tela com as duas seções completas

```gherkin
Cenário: Administrador visualiza tela de Configurações com as duas seções e todos os cards
  Dado que estou autenticado na Nova Interface com perfil Administrador com permissão irrestrita
  Quando clico em "Configurações" no menu lateral
  Então a tela exibe a seção "Configurações do Atendimento" com 6 cards
  E a seção "Configurações da Empresa" com 9 cards
  E todos os 15 cards estão visíveis e organizados em suas respectivas seções
```

### CT-CONF-007 — Operador não visualiza cards restritos à sua permissão

```gherkin
Cenário: Operador não visualiza cards restritos à sua permissão na tela de Configurações
  Dado que estou autenticado na Nova Interface com perfil Operador
  Quando navego para a tela de Configurações
  Então a seção "Configurações da Empresa" não exibe os cards restritos ao perfil Operador
  E esses cards não estão presentes na árvore de renderização da página
  E os demais cards autorizados para o perfil Operador são exibidos normalmente
```

---

## Resumo

**Total: 12 cenários de teste | 2 cenários Gherkin**

- 🔴 Alta: 6 cenários (CT-CONF-001, 002, 003, 004, 007, 008, 009) — nota: CT-CONF-009 cobre segurança
- 🟡 Média: 4 cenários (CT-CONF-005, 006, 010, 011)
- 🟢 Baixa: 1 cenário (CT-CONF-012)

**Cobertura:**
- Happy path: CT-CONF-001, 002, 003
- Negativos/erro: CT-CONF-007, CT-CONF-008, CT-CONF-010
- Borda: CT-CONF-004, CT-CONF-011
- Segurança: CT-CONF-009

**Validação por agente crítico independente:** ✅ 5 aprovados | 7 revisados | 0 adicionados
