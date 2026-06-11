# QA Scenarios — DEV4-4362

## Card Info
- **Título:** Exportação de relatório de etiquetas em CSV
- **Tipo:** História
- **Prioridade:** Medium
- **Status:** Criando Cenários de Teste
- **Responsável QA:** Yuri Alcantara (conta logada)
- **Card atualizado em:** 09/06/2026 17:57

## Critérios de Aceite
1. Ao clicar em "Exportar CSV" → sistema gera arquivo CSV
2. Com etiquetas cadastradas → arquivo contém todas as etiquetas
3. Sem etiquetas cadastradas → sistema trata o cenário sem erro
4. Em caso de falha na geração → usuário visualiza mensagem de erro
5. O arquivo baixado abre corretamente em planilhas compatíveis

## Regras de Negócio
1. O CSV deve conter todas as etiquetas cadastradas na plataforma
2. A exportação deve respeitar a ordenação padrão definida pelo sistema
3. Caso não existam etiquetas, o arquivo pode ser gerado vazio ou com cabeçalho
4. Campos com caracteres especiais devem ser corretamente tratados no CSV

## Escopo
**Inclui:**
- Botão "Exportar CSV" na tela de etiquetas
- Geração de CSV com colunas: data criação, hora criação, nome contato, canal contato, etiqueta, categoria etiqueta, descrição etiqueta
- Download automático no navegador

**Não inclui:**
- Exportação em outros formatos além de CSV
- Filtros avançados na exportação
- Agendamento de exportações

---

## Tabela de Cenários de Teste

| ID | Nome do Cenário | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |
|---|---|---|---|---|---|---|---|
| CT-ETQ-001 | Exportar CSV com etiquetas existentes | Etiquetas cadastradas na plataforma | 1. Acessar tela de etiquetas; 2. Clicar em "Exportar CSV" | 1. Download iniciado automaticamente; 2. Arquivo CSV contém todas as etiquetas com as colunas: data criação, hora criação, nome contato, canal contato, etiqueta, categoria etiqueta, descrição etiqueta | 🔴 Alta | UI | — |
| CT-ETQ-002 | Exportar CSV sem etiquetas cadastradas | Nenhuma etiqueta cadastrada | 1. Acessar tela de etiquetas; 2. Clicar em "Exportar CSV" | 1. Download iniciado OU mensagem informativa exibida; 2. Sistema não retorna erro; 3. Arquivo gerado (vazio ou com cabeçalho) | 🔴 Alta | UI | — |
| CT-ETQ-003 | Validar tratamento de caracteres especiais no CSV | Etiquetas contendo acentos, vírgulas, quebras de linha e aspas em qualquer campo | 1. Acessar tela de etiquetas; 2. Clicar em "Exportar CSV"; 3. Abrir arquivo em planilha | 1. CSV gerado com encoding correto (UTF-8); 2. Caracteres especiais preservados; 3. Colunas não se corrompem; 4. Campos com vírgula/quebra de linha tratados corretamente (citação) | 🔴 Alta | UI | — |
| CT-ETQ-004 | Exportar CSV com etiqueta sem contato vinculado | Etiqueta criada sem contato associado | 1. Acessar tela de etiquetas; 2. Clicar em "Exportar CSV" | 1. CSV gerado sem erro; 2. Campo "nome do contato" vazio ou preenchido com indicador padrão | 🟡 Média | UI | — |
| CT-ETQ-005 | Validar ordenação padrão das etiquetas no CSV | Múltiplas etiquetas existentes | 1. Acessar tela de etiquetas; 2. Clicar em "Exportar CSV" | 1. CSV gerado; 2. Etiquetas em ordem definida pelo sistema (conforme ordenação da tela de etiquetas) | 🟡 Média | UI | — |
| CT-ETQ-006 | Exportar CSV quando há falha na geração | — | 1. Acessar tela de etiquetas; 2. Forçar condição de falha na geração do arquivo; 3. Clicar em "Exportar CSV" | 1. Mensagem de erro exibida ao usuário com orientação clara; 2. Tela não trava; 3. Usuário consegue tentar novamente | 🟡 Média | UI | — |
| CT-ETQ-007 | Exportar CSV com etiquetas de múltiplos canais | Etiquetas vinculadas a contatos de canais diferentes (WhatsApp, Webchat, Instagram) | 1. Acessar tela de etiquetas; 2. Clicar em "Exportar CSV" | 1. CSV contém etiquetas de todos os canais; 2. Coluna "canal do contato" preenchida corretamente para cada linha | 🟡 Média | UI | — |
| CT-ETQ-008 | Validar arquivo CSV gerado em planilhas compatíveis | CSV exportado com sucesso | 1. Abrir arquivo em Excel ou Google Sheets; 2. Verificar formatação e alinhamento das colunas | 1. Arquivo abre sem erro de formatação; 2. Colunas corretamente separadas; 3. Encoding UTF-8 ou compatível com Latin-1 | 🔴 Alta | UI | — |
| CT-ETQ-009 | Exportar CSV com usuário sem permissão de admin | Usuário logado com role de atendente (sem permissão de admin/gestor) | 1. Logar com usuário sem permissão; 2. Acessar tela de etiquetas; 3. Verificar presença do botão "Exportar CSV" | 1. Botão "Exportar CSV" não está visível OU acesso negado ao clicar | 🟡 Média | UI | — |
| CT-ETQ-010 | Exportar CSV com grande volume de etiquetas | Milhares de etiquetas cadastradas | 1. Acessar tela de etiquetas; 2. Clicar em "Exportar CSV" | 1. Geração não dá timeout; 2. Download iniciado; 3. Arquivo contém todas as etiquetas | 🟢 Baixa | UI | — |
| CT-ETQ-011 | Validar isolamento multi-tenant na exportação | Sistema com etiquetas de múltiplos accounts | 1. Logar em account A; 2. Acessar tela de etiquetas; 3. Clicar em "Exportar CSV" | 1. CSV contém APENAS etiquetas do account logado; 2. Etiquetas de outros accounts não aparecem | 🔴 Alta | UI | — |

---

## Cenários Gherkin (BDD)

```gherkin
Cenário: Exportar CSV com etiquetas existentes
  Dado que existem etiquetas cadastradas na plataforma com dados completos
  E o usuário acessa a tela de etiquetas
  Quando clico em "Exportar CSV"
  Então o download do arquivo é iniciado automaticamente
  E o arquivo CSV contém todas as etiquetas com as colunas corretas

Cenário: Exportar CSV com caracteres especiais
  Dado que existem etiquetas contendo acentos, vírgulas, quebras de linha e aspas
  Quando o usuário exporta o CSV
  Então o arquivo é gerado com encoding correto (UTF-8)
  E os caracteres especiais são preservados ao abrir em planilhas
  E as colunas não se corrompem
```

---

## Resumo de Cobertura

| Categoria | Quantidade |
|---|---|
| Total de cenários | 11 |
| 🔴 Alta criticidade | 5 (CT-ETQ-001, CT-ETQ-002, CT-ETQ-003, CT-ETQ-008, CT-ETQ-011) |
| 🟡 Média criticidade | 5 |
| 🟢 Baixa criticidade | 1 |
| Modo UI | 11 |

---

*Gerado por Argos-QA em 09/06/2026*
*Validação por agente crítico: 6 aprovados | 5 revisados*