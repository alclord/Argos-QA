# Cenários de Teste — dev4-4179
> Card: Carteiras (Configurações de Atendimento)
> Gerado em: 2026-05-19

---

## BLOCO 1 — Estratégia de Teste

**Escopo:** Tela de Carteiras na Nova Interface — tabela principal, busca, ordenação, filtros, badges de setores e quatro fluxos de ação (criar usuário, editar carteira, importar contatos, migrar carteira, excluir). Card de Melhoria de Design com prioridade Medium, parte do épico DEV4-4166.

**Tipos de teste:** Funcional (interações da tabela, filtros, busca, botões de ação), Regressão (right sheet de `/users` reutilizado deve continuar funcional), Segurança (controle de acesso por perfil), UX (conformidade visual com o novo guia de estilos).

**Prioridade de execução:** 1) Carregamento e dados da tabela → 2) Busca e ordenação → 3) Fluxos de ação (Criar, Editar, Importar, Migrar) → 4) Exclusão com confirmação → 5) Segurança → 6) Bordas (badge wrap, zero contatos).

**Riscos principais:** "Qtd. de Contatos" não refletir mudanças em tempo real; right sheet de `/users` quebrando ao ser reaproveitado; exclusão sem modal de confirmação; filtros não carregando dinamicamente.

---

## BLOCO 2 — Mapa de Riscos

| Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
|---|---|---|---|
| "Qtd. de Contatos" não atualiza em tempo real após importação ou migração | M | A | **Alta** |
| Right sheet de criação de usuário (/users) quebra ao ser reutilizado na tela Carteiras | M | A | **Alta** |
| Exclusão executada sem abrir modal de confirmação | B | A | **Alta** |
| Filtros de Cargo e Setor não alimentados dinamicamente pelo sistema | M | M | **Média** |
| Ordenação de colunas com valores nulos/vazios causa erro visual ou crash | M | M | **Média** |
| Busca com debounce de 300ms dispara requisições excessivas por falha na implementação | B | M | **Média** |
| Badge wrap de setores quebra o layout da célula em resoluções menores | B | B | **Baixa** |

---

## BLOCO 3 — Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade |
|---|---|---|---|---|---|
| CT-CARTEIRAS-001 | Tabela carrega dados corretamente | Usuário gestor/admin logado; ao menos 3 usuários cadastrados com cargos, setores e contatos distintos | 1. Acessar Configurações de Atendimento → Carteiras<br>2. Aguardar carregamento da tabela<br>3. Verificar colunas: Usuário, Cargo, Setores (badges), Qtd. de Contatos | Tabela exibe todos os usuários com os dados corretos. Badges de setores visíveis. Coluna "Qtd. de Contatos" com valores reais. Layout segue novo guia de estilos. _(RN01, RN04; CA 1)_ | 🔴 Alta |
| CT-CARTEIRAS-002 | Busca dinâmica filtra em tempo real | Tabela carregada com múltiplos usuários | 1. Clicar no campo de busca<br>2. Digitar o nome parcial de um usuário (ex: "ana")<br>3. Aguardar 300ms<br>4. Observar os resultados | Tabela filtra e exibe apenas usuários cujo nome contém "ana". O filtro ocorre após o debounce de 300ms sem recarregar a página. _(RN03)_ | 🟡 Média |
| CT-CARTEIRAS-003 | Ordenação asc/desc em coluna funciona | Tabela carregada com ao menos 5 usuários | 1. Clicar no header da coluna "Qtd. de Contatos"<br>2. Verificar ordenação crescente<br>3. Clicar novamente no mesmo header<br>4. Verificar ordenação decrescente<br>5. Repetir para colunas "Usuário" e "Cargo" | Cada clique alterna entre ordenação ascendente e descendente. Dados reorganizados corretamente nas 3 colunas. _(RN02)_ | 🟡 Média |
| CT-CARTEIRAS-004 | Busca sem correspondência exibe estado vazio | Tabela carregada | 1. Digitar no campo de busca um nome inexistente (ex: "xyzxyz")<br>2. Aguardar 300ms | Estado vazio exibido corretamente — sem crash, sem loading infinito, sem dados residuais. _(RN03)_ | 🟡 Média |
| CT-CARTEIRAS-005 | Excluir usuário abre modal de confirmação | Usuário admin logado; ao menos 1 usuário listado na tabela | 1. Localizar um usuário na tabela<br>2. Clicar no botão "Excluir" do usuário<br>3. Observar o comportamento | Modal de confirmação é exibido antes de qualquer exclusão. O usuário não é removido sem confirmação explícita. _(CA 3)_ | 🔴 Alta |
| CT-CARTEIRAS-006 | Filtro aplicado sem resultados exibe vazio | Filtros de Cargo e Setor carregados | 1. Selecionar um Cargo que nenhum usuário possui<br>2. Observar a tabela | Estado vazio exibido corretamente. Tabela não exibe dados inconsistentes. _(CA 2)_ | 🟢 Baixa |
| CT-CARTEIRAS-007 | Badges de setores fazem wrap com muitos setores | Usuário cadastrado em 5 ou mais setores | 1. Localizar na tabela o usuário com muitos setores<br>2. Verificar a célula de setores | Todos os badges são exibidos com quebra de linha dentro da célula. Nenhum badge cortado ou oculto. Layout da linha não quebra. _(RN01)_ | 🟢 Baixa |
| CT-CARTEIRAS-008 | Usuário com zero contatos exibe valor correto | Usuário sem contatos atribuídos cadastrado | 1. Localizar na tabela o usuário sem contatos<br>2. Verificar coluna "Qtd. de Contatos" | Coluna exibe "0" (ou equivalente definido pelo design). Não exibe vazio, null ou erro. _(RN04)_ | 🟢 Baixa |
| CT-CARTEIRAS-009 | Acesso negado para perfil sem permissão | Usuário com perfil `agent` logado | 1. Tentar acessar diretamente a rota de Configurações de Atendimento → Carteiras<br>2. Observar o comportamento | Acesso negado — usuário redirecionado ou vê mensagem de permissão insuficiente. A tela não é exibida para perfis não autorizados. _(Segurança)_ | 🔴 Alta |
| CT-CARTEIRAS-010 | Botão "Criar novo usuário" abre right sheet correto | Admin logado na tela Carteiras | 1. Clicar no botão "Criar novo usuário"<br>2. Observar o componente aberto | Right sheet de criação de usuário (o mesmo existente em `/users`) abre corretamente. Funcionalidades do sheet não foram quebradas pelo reaproveitamento. | 🟡 Média |
| CT-CARTEIRAS-011 | Botão "Editar" abre right sheet da carteira | Admin logado; usuário com contatos na carteira | 1. Clicar em "Editar" em um usuário da tabela<br>2. Verificar o right sheet aberto | Right sheet exibe tabela com os contatos da carteira daquele usuário específico. | 🟡 Média |
| CT-CARTEIRAS-012 | "Importar contatos" abre modal centralizado | Right sheet de edição aberto | 1. No right sheet de edição da carteira, clicar em "Importar contatos"<br>2. Observar o componente aberto | Modal centralizado é exibido com a lista de opções para importação de contatos. | 🟡 Média |
| CT-CARTEIRAS-013 | "Migrar carteira" abre seletor de usuário | Right sheet de edição aberto | 1. No right sheet de edição da carteira, clicar em "Migrar carteira"<br>2. Observar o componente aberto | Seletor de usuário é exibido para escolha do atendente destino. Nenhuma migração ocorre antes da confirmação. | 🔴 Alta |

---

## BLOCO 4 — Cenários Gherkin (BDD)

```gherkin
Cenário: Tabela de Carteiras carrega dados corretamente na Nova Interface
  Dado que o usuário está logado com perfil de gestor ou administrador
  E existem ao menos 3 usuários cadastrados com cargos, setores e contatos distintos
  Quando o usuário acessa Configurações de Atendimento → Carteiras
  Então a tabela é exibida com as colunas Usuário, Cargo, Setores e Qtd. de Contatos
  E os badges de setores são visíveis para cada usuário
  E a coluna "Qtd. de Contatos" reflete os valores reais do sistema
```

```gherkin
Cenário: Usuário sem permissão não consegue acessar a tela de Carteiras
  Dado que o usuário está logado com perfil "agent"
  Quando o usuário tenta acessar diretamente a rota de Configurações de Atendimento → Carteiras
  Então o acesso é negado
  E o usuário é redirecionado ou vê mensagem de permissão insuficiente
  E nenhum dado da tela é exibido
```
