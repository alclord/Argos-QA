# Cenários de Teste — DEV4-4212
> Card: Atualização da tela Usuários
> Gerado em: 2026-05-25
> Card atualizado em: 2026-05-22T10:10:19-03:00

---

## BLOCO 1 — Estratégia de Teste

O card é uma melhoria de design de prioridade média na tela de Usuários. O escopo envolve três regras de negócio visuais independentes (RN1: headers/avatar, RN2: canais, RN3: departamentos) e um controle de acesso por perfil. Prioridade de execução: segurança (acesso por perfil) → RN2 (canais, mais complexa) → RN3 (departamentos com overflow) → RN1 (visual/headers). O maior risco está na lógica de consolidação de ícones por tipo de canal (RN2) e no truncamento correto de departamentos com tooltip (RN3). Testes funcionais e de UX são os tipos aplicáveis; regressão de acesso por perfil é obrigatória.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| Operador visualizar dados de outros usuários (brecha de acesso) | M | A | 🔴 Alta |
| Ícones de canal duplicados quando usuário tem múltiplos canais do mesmo tipo | A | A | 🔴 Alta |
| Contador "+N" exibindo valor incorreto ou aparecendo quando não deveria | M | M | 🟡 Média |
| Tooltip de canais não abrir ou exibir lista incompleta | M | M | 🟡 Média |
| Cabeçalhos antigos ("Papéis", "Times") ainda visíveis após deploy | B | M | 🟡 Média |
| Avatar ainda sendo renderizado após a remoção | B | B | 🟢 Baixa |
| Quebra de layout em nomes/emails muito longos | B | B | 🟢 Baixa |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade |
|---|---|---|---|---|---|
| CT-USUARIOS-001 | Gestor visualiza tabela com novos cabeçalhos | Usuário com perfil Gestor autenticado; tela de Usuários acessível | 1. Acessar a tela de Usuários. 2. Observar os cabeçalhos da tabela. 3. Observar a primeira coluna de cada linha. | Cabeçalhos exibem "Perfil" e "Departamento" (não "Papéis" e "Times"). Nenhum avatar é renderizado na primeira coluna — apenas nome em negrito e e-mail abaixo em fonte menor/cor suavizada. (RN1) | 🟡 Média |
| CT-USUARIOS-002 | Canais exibem total e ícones por tipo corretamente | Gestor autenticado; existir usuário com canais de tipos variados (ex: 10 WhatsApp, 2 Instagram, 1 Messenger = 13 total) | 1. Acessar tela de Usuários. 2. Localizar o usuário com múltiplos tipos de canal. 3. Observar a célula da coluna Canais. | Célula exibe "13" seguido de 3 ícones distintos: 1 ícone de WhatsApp, 1 de Instagram, 1 de Messenger. Não exibe 10 ícones de WhatsApp — apenas 1 por tipo. (RN2) | 🔴 Alta |
| CT-USUARIOS-003 | Departamentos truncam em 3 com contador de excesso | Gestor autenticado; existir usuário com 5 ou mais departamentos | 1. Acessar tela de Usuários. 2. Localizar usuário com mais de 3 departamentos. 3. Observar a célula da coluna Departamento. | Célula exibe exatamente 3 badges e um contador com o saldo restante (ex: "+2" para 5 departamentos). Os excedentes não são renderizados como badges. (RN3) | 🔴 Alta |
| CT-USUARIOS-004 | Usuário sem canais exibe estado textual correto | Gestor autenticado; existir usuário sem nenhum canal vinculado | 1. Acessar tela de Usuários. 2. Localizar usuário sem canais. 3. Observar a célula da coluna Canais. | Célula exibe "Sem canais conectados" — não exibe "0", não quebra layout, não exibe ícone algum. (RN2 — estado nulo) | 🟡 Média |
| CT-USUARIOS-005 | Operador acessa tela e vê apenas o próprio registro | Usuário com perfil Operador autenticado | 1. Acessar a tela de Usuários como Operador. | Operador visualiza apenas seus próprios dados. Não tem acesso à lista completa de outros usuários. (Segurança — perfil de acesso) | 🔴 Alta |
| CT-USUARIOS-006 | Supervisor visualiza lista completa de usuários | Usuário com perfil Supervisor autenticado | 1. Acessar a tela de Usuários como Supervisor. 2. Observar se a lista completa de usuários é exibida. | Supervisor visualiza a lista completa de usuários com todas as colunas atualizadas (RN1, RN2, RN3). | 🟡 Média |
| CT-USUARIOS-007 | Exatamente 3 departamentos não exibe contador | Gestor autenticado; existir usuário com exatamente 3 departamentos | 1. Acessar tela de Usuários. 2. Localizar usuário com exatamente 3 departamentos. 3. Observar a célula da coluna Departamento. | Célula exibe 3 badges sem nenhum contador "+N". O contador só aparece quando há mais de 3. (RN3 — borda exata) | 🟡 Média |
| CT-USUARIOS-008 | Canal com 1 único tipo não duplica ícone | Gestor autenticado; existir usuário com 5 canais todos do mesmo tipo (ex: 5 WhatsApp) | 1. Acessar tela de Usuários. 2. Localizar o usuário com múltiplos canais do mesmo tipo. 3. Observar a célula da coluna Canais. | Célula exibe "5" seguido de apenas 1 ícone de WhatsApp — não exibe 5 ícones. (RN2 — borda: 1 tipo único) | 🟡 Média |
| CT-USUARIOS-009 | Tooltip de canais exibe lista completa ao hover | Gestor autenticado; usuário com múltiplos canais visível na tabela | 1. Acessar tela de Usuários. 2. Passar o mouse sobre o número e ícones na célula Canais. | Tooltip aparece exibindo todos os canais vinculados. Tooltip desaparece ao remover o mouse. (RN2) | 🟡 Média |
| CT-USUARIOS-010 | Tooltip de departamentos exibe excedentes ao hover | Gestor autenticado; usuário com mais de 3 departamentos | 1. Acessar tela de Usuários. 2. Passar o mouse sobre o contador "+N" na célula Departamento. | Tooltip aparece exibindo os nomes dos departamentos que não couberam nos 3 badges. Tooltip desaparece ao remover o mouse. (RN3) | 🟡 Média |
| CT-USUARIOS-011 | Usuário sem departamentos não quebra layout | Gestor autenticado; existir usuário sem departamentos vinculados | 1. Acessar tela de Usuários. 2. Localizar usuário sem departamentos. 3. Observar a célula da coluna Departamento. | Célula exibe estado vazio sem quebrar o layout da linha. | 🟢 Baixa |
| CT-USUARIOS-012 | Nome em negrito e e-mail em estilo secundário | Gestor autenticado | 1. Acessar tela de Usuários. 2. Observar a primeira coluna de qualquer usuário. | Nome em **negrito**. E-mail logo abaixo em fonte menor e cor suavizada. (RN1) | 🟢 Baixa |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Cenário: Usuário com múltiplos tipos de canal exibe contagem e ícones corretos
  Dado que estou autenticado como Gestor na tela de Usuários
  E existe um usuário com 10 canais WhatsApp, 2 canais Instagram e 1 canal Messenger
  Quando visualizo a célula da coluna "Canais" desse usuário
  Então o número total exibido é "13"
  E são exibidos exatamente 3 ícones distintos: 1 de WhatsApp, 1 de Instagram, 1 de Messenger
  E nenhum ícone aparece duplicado
```

```gherkin
Cenário: Operador não tem acesso à lista completa de usuários
  Dado que estou autenticado como Operador na plataforma
  Quando acesso a tela de Usuários
  Então visualizo apenas os meus próprios dados
  E não tenho acesso à lista de outros usuários do sistema
```

---

## Validação LLM
✅ 12 cenários aprovados | 0 revisados | 0 removidos
