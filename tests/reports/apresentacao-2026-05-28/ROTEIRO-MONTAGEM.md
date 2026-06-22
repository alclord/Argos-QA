# Roteiro de Montagem — Apresentação Gerencial QA Risk
> Data: 28/05/2026 | Ferramenta: Canva ou Google Slides

---

## Estrutura de Slides (9 slides)

| Slide | Arquivo | Tipo visual | Tempo estimado |
|---|---|---|---|
| 1 | SLIDE-01-capa.txt | Layout de capa | 30s |
| 2 | SLIDE-02-kpis.csv | 4 blocos KPI + 4 blocos KPI | 1 min |
| 3 | SLIDE-03-ranking-risco.csv | Gráfico de barras horizontal | 2 min |
| 4 | SLIDE-04-mapa-calor.csv | Gráfico bolhas ou matriz 2x2 | 2 min |
| 5 | SLIDE-05-tendencia.csv | Gráfico de barras com seta | 1 min |
| 6 | SLIDE-06-distribuicao-bugs.csv | Gráfico de pizza (donut) | 1 min |
| 7 | SLIDE-07-top3-bombas.csv | 3 cards lado a lado | 2 min |
| 8 | SLIDE-08-sentry-usuarios.csv | Gráfico de barras horizontal | 1 min |
| 9 | SLIDE-09-acoes.csv | Tabela priorizada | 2 min |

**Tempo total de apresentação: ~12 minutos**

---

## Como montar no Canva

### Passo 1 — Escolha o template
- Abra o Canva → "Apresentações" → busque "Business Report Dark" ou "Tech Presentation"
- Paleta recomendada: fundo escuro (#0F172A), texto branco, vermelho (#EF4444), amarelo (#F59E0B), verde (#22C55E)

### Passo 2 — Slide 1: Capa
Use o conteúdo do arquivo `SLIDE-01-capa.txt`:
- Título grande: **"QA Risk Intelligence"**
- Subtítulo: *"Mapa de Risco Preditivo — 28 de Maio de 2026"*
- Badge vermelho no canto superior: **"3 módulos em risco crítico"**

### Passo 3 — Slide 2: KPIs (SLIDE-02-kpis.csv)
Crie 8 blocos de destaque (4 em cima, 4 embaixo):

```
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  🔴 47          │ │  🟡 18          │ │  🔴 3           │ │  🔴 3.433+      │
│  Bugs N2        │ │  Bugs N1 ativos │ │  Módulos críticos│ │  Usuários afetados│
│  confirmados    │ │                 │ │                  │ │  (só no omnispa) │
└─────────────────┘ └─────────────────┘ └─────────────────┘ └─────────────────┘

┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  🟠 2           │ │  🟡 1           │ │  🔴 5           │ │  🔴 29          │
│  Features sobre │ │  Corretivo ativo│ │  Módulos sem    │ │  Bugs N2 sem    │
│  área instável  │ │  em dev         │ │  atenção do dev │ │  corretivo       │
└─────────────────┘ └─────────────────┘ └─────────────────┘ └─────────────────┘
```

> **Dica Canva:** Use elemento "Destaque estatística" com número grande acima e label pequeno abaixo. Colora o número conforme a coluna "Cor" do CSV.

### Passo 4 — Slide 3: Ranking de Risco (SLIDE-03-ranking-risco.csv)
Crie um **gráfico de barras horizontal** no Google Sheets primeiro:
1. Abra Google Sheets → importe o CSV (`SLIDE-03-ranking-risco.csv`)
2. Selecione colunas "Módulo" e "Score Total"
3. Inserir → Gráfico → Gráfico de barras horizontal
4. Configure as cores manualmente (vermelho/amarelo/laranja/verde conforme "Cor HEX")
5. Copie o gráfico → Cole no Canva/Google Slides

**Visual esperado:**
```
Chat/Mensagens   ████████████████████████████████████ 71 🔴
Canais/WhatsApp  ██████████████████████████████       50 🔴
Distribuição     █████████████████████████████        46 🔴
Nova Interface   ██████████████████████               35 🟡
Upload/Mídia     █████████████                        22 🟡
...
```

### Passo 5 — Slide 4: Mapa de Calor (SLIDE-04-mapa-calor.csv)
Opção A — **Matriz visual no Canva:**
Crie uma grade 3x3 onde o eixo X = Atenção do Dev (Baixa/Média/Alta) e o eixo Y = Pressão de Clientes (Baixa/Média/Alta). Posicione cada módulo como um bloco colorido:

```
                  Atenção do Dev
                  BAIXA    MÉDIA    ALTA
                ┌────────┬────────┬────────┐
ALTA pressão    │Distrib.│Chat    │        │  
                │Upload  │Canais  │        │
                │Perm.   │Nova UI │        │
                ├────────┼────────┼────────┤
MÉDIA pressão   │CRM     │WebSocket│       │
                │Auth    │        │        │
                ├────────┼────────┼────────┤
BAIXA pressão   │        │        │        │
                └────────┴────────┴────────┘
```

Opção B — **Gráfico bolhas no Google Sheets:**
1. Importe o CSV
2. Gráfico → Gráfico de bolhas
3. X = "Atenção do Dev", Y = "Pressão de Clientes", tamanho = "Gap"
4. Cole no slide

> **Mensagem para a gestão:** "Módulos no quadrante superior-esquerdo são os mais críticos: muita pressão de clientes, pouca ação do time de dev."

### Passo 6 — Slide 5: Tendência (SLIDE-05-tendencia.csv)
Crie um **gráfico de barras divergentes** (barras positivas em vermelho, negativas em verde):
1. Google Sheets → importe o CSV
2. Use colunas "Módulo" e "Delta"
3. Barras para cima (positivas) = vermelho = risco subindo
4. Barras para baixo (negativas) = verde = risco caindo

**Alternativa mais simples no Canva:**
Duas colunas de texto com ícones:
```
📈 RISCO SUBINDO          📉 RISCO CAINDO
Nova Interface  +5         Contatos        -9
Chat            +3         CRM             -10
Canais          +3         Distribuição    -6
```

### Passo 7 — Slide 6: Distribuição de Bugs (SLIDE-06-distribuicao-bugs.csv)
**Gráfico donut** com 3 fatias:
- 🔴 62% — Bugs N2 sem corretivo (29 bugs)
- 🟡 4% — Bugs N2 com corretivo (2 bugs)
- ⚫ 34% — Bugs crônicos/não-técnicos (16 tickets)

> **Mensagem:** "62% dos bugs confirmados pelo time de N2 estão sem nenhum fix planejado."

### Passo 8 — Slide 7: Top 3 Bombas (SLIDE-07-top3-bombas.csv)
**3 cards lado a lado**, cada um com:
- Cabeçalho: 💣 #1, #2, #3
- Módulo em destaque
- Bomba Score grande
- 1 linha do problema
- 1 linha da ação

```
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│ 💣 #1            │ │ 💣 #2            │ │ 💣 #3            │
│ Chat/Mensagens   │ │ Canais/WhatsApp   │ │ Distribuição     │
│                  │ │                  │ │                  │
│ Score: 85        │ │ Score: 57        │ │ Score: 49        │
│                  │ │                  │ │                  │
│ Fix cobre 1 de 8 │ │ PLBV sobre 9     │ │ 86 dias sem fix  │
│ bugs. Feature    │ │ bugs sem         │ │ no bug mais      │
│ nova sobre       │ │ corretivo        │ │ antigo do        │
│ camada quebrada  │ │                  │ │ sistema          │
│                  │ │                  │ │                  │
│ ⚡ Bloquear      │ │ ⚡ Smoke test    │ │ ⚡ Sprint de     │
│ DEV4-4229        │ │ antes do merge   │ │ bugs urgente     │
└──────────────────┘ └──────────────────┘ └──────────────────┘
```

### Passo 9 — Slide 8: Sentry — Usuários Afetados (SLIDE-08-sentry-usuarios.csv)
**Gráfico de barras horizontal** ordenado por "Usuários Afetados" (maior → menor):
- Destaque especial para "TypeError plugin undefined" com label "ESCALANDO" em vermelho
- Coluna "Ticket Suporte?" vira uma badge colorida: "Sim" (verde), "Não — sinal oculto" (vermelho)

> **Mensagem:** "Estes erros afetam usuários reais em produção mas a maioria nunca chegou como chamado no suporte — são sinais que o time precisa investigar proativamente."

### Passo 10 — Slide 9: Ações (SLIDE-09-acoes.csv)
**Tabela formatada** com linhas coloridas por prioridade:
- P0 HOJE → fundo vermelho
- P1 ESTA SEMANA → fundo laranja
- P2 PRÓX. SPRINT → fundo cinza

Colunas a mostrar: Prioridade | Ação | Módulo | Prazo
*(Omita "Consequência" no slide — use como notas do apresentador)*

---

## Notas para o Apresentador

### Mensagens-chave por slide:
- **Slide 2 (KPIs):** "Temos 47 problemas confirmados pelo suporte — e 62% deles não têm nenhuma correção planejada."
- **Slide 3 (Ranking):** "Chat, Canais e Distribuição — os 3 pilares do produto — estão todos em risco alto simultâneo."
- **Slide 4 (Mapa Calor):** "O dev está investindo em features novas enquanto os módulos com mais reclamações de clientes estão negligenciados."
- **Slide 7 (Bombas):** "Temos 3 cenários onde um deploy mal planejado pode criar uma crise visível aos clientes esta semana."
- **Slide 9 (Ações):** "As 3 ações de hoje custam horas de trabalho. Ignorá-las pode custar dias de crise pós-deploy."

---

## Paleta de cores sugerida

| Uso | Cor | HEX |
|---|---|---|
| Fundo principal | Azul escuro | #0F172A |
| Texto principal | Branco | #FFFFFF |
| Risco ALTO | Vermelho | #EF4444 |
| Risco MÉDIO | Âmbar | #F59E0B |
| Risco ATENÇÃO | Laranja | #F97316 |
| Risco ESTÁVEL | Verde | #22C55E |
| Acento / destaque | Índigo | #6366F1 |
| Texto secundário | Cinza | #94A3B8 |

---

## Templates prontos para usar (buscar no Canva)

- "Tech Risk Report Dark" → mais próximo do visual técnico
- "Business Dashboard Presentation" → mais executivo
- "KPI Report Blue Dark" → boa base para os blocos de KPI do slide 2

---

*Gerado por Argos Predict · 2026-05-28*
