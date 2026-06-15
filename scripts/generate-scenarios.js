'use strict';
/**
 * Argos QA — Gerador de Cenários
 * Substitui o skill /qa-jira chamando a API Claude diretamente.
 *
 * Vantagens vs skill:
 *  - Sem overhead do Claude Code (system prompt + tool definitions: ~8-15k tokens)
 *  - Prompt caching na KB → 90% de desconto em chamadas repetidas
 *  - Sem turnos interativos de confirmação
 *  - Agente crítico como flag opt-in (--review)
 *
 * Usage:
 *   node scripts/generate-scenarios.js <CARD-ID> [--env staging|canary|production] [--review] [--no-publish] [--verbose]
 *
 * Exemplos:
 *   node scripts/generate-scenarios.js DEV4-4500
 *   node scripts/generate-scenarios.js DEV4-4500 --env canary --review
 *   node scripts/generate-scenarios.js DEV4-4500 --no-publish
 *
 * Variáveis obrigatórias no .env:
 *   ANTHROPIC_API_KEY   chave da API Anthropic (console.anthropic.com → API Keys)
 *   JIRA_TOKEN          token Atlassian (id.atlassian.com → Security → API tokens)
 *   JIRA_EMAIL          seu e-mail Atlassian (ex: yuri.castro@poli.digital)
 */

const fs   = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// ─────────────────────────────────────────────────────────────
// 1. .env loader (manual, evita problemas de versão do dotenv)
// ─────────────────────────────────────────────────────────────
function loadEnv() {
  const envPath = path.join(ROOT, '.env');
  if (!fs.existsSync(envPath)) {
    console.error('❌ Arquivo .env não encontrado.');
    process.exit(1);
  }
  for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq === -1) continue;
    const key = t.slice(0, eq).trim();
    const val = t.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

// ─────────────────────────────────────────────────────────────
// 2. Arg parsing
// ─────────────────────────────────────────────────────────────
function parseArgs(argv) {
  const args   = argv.slice(2);
  const cardId = args.find(a => !a.startsWith('-'));
  if (!cardId) {
    console.error(
      '❌ Uso: node scripts/generate-scenarios.js <CARD-ID> ' +
      '[--env staging|canary|production] [--review] [--no-publish] [--verbose]'
    );
    process.exit(1);
  }
  const envIdx = args.findIndex(a => a === '--env');
  return {
    cardId:    cardId.toUpperCase(),
    env:       envIdx !== -1 ? args[envIdx + 1] : null,
    review:    args.includes('--review'),
    noPublish: args.includes('--no-publish'),
    verbose:   args.includes('--verbose'),
  };
}

// ─────────────────────────────────────────────────────────────
// 3. Config
// ─────────────────────────────────────────────────────────────
function loadConfig() {
  const local    = path.join(ROOT, 'tests/config/qa-environment.local.json');
  const template = path.join(ROOT, 'tests/config/qa-environment.template.json');
  return JSON.parse(fs.readFileSync(fs.existsSync(local) ? local : template, 'utf-8'));
}

// ─────────────────────────────────────────────────────────────
// 4. Jira
// ─────────────────────────────────────────────────────────────
function jiraBasicAuth() {
  const email = process.env.JIRA_EMAIL;
  const token = process.env.JIRA_TOKEN;
  if (!email) throw new Error('JIRA_EMAIL não configurado no .env');
  if (!token) throw new Error('JIRA_TOKEN não configurado no .env');
  return 'Basic ' + Buffer.from(`${email}:${token}`).toString('base64');
}

async function fetchJiraCard(cardId, config) {
  const base   = config.jira.baseUrl.replace('/browse', '');
  const fields = 'summary,description,issuetype,priority,status,labels,parent,subtasks,updated';
  const resp   = await fetch(`${base}/rest/api/3/issue/${cardId}?fields=${fields}`, {
    headers: { Authorization: jiraBasicAuth(), Accept: 'application/json' },
  });
  if (!resp.ok) throw new Error(`Jira ${resp.status}: ${await resp.text()}`);
  return resp.json();
}

async function postJiraComment(cardId, markdownBody, config) {
  const base = config.jira.baseUrl.replace('/browse', '');
  const resp = await fetch(`${base}/rest/api/3/issue/${cardId}/comment`, {
    method:  'POST',
    headers: { Authorization: jiraBasicAuth(), 'Content-Type': 'application/json', Accept: 'application/json' },
    body:    JSON.stringify({ body: markdownToAdf(markdownBody) }),
  });
  if (!resp.ok) throw new Error(`Jira comment ${resp.status}: ${await resp.text()}`);
  return resp.json();
}

// ─────────────────────────────────────────────────────────────
// 5. Markdown → ADF converter (cobre os elementos usados nos cenários)
// ─────────────────────────────────────────────────────────────
function markdownToAdf(md) {
  const nodes = [];
  const lines = md.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Heading
    const hm = line.match(/^(#{1,6})\s+(.*)/);
    if (hm) {
      nodes.push({ type: 'heading', attrs: { level: hm[1].length }, content: inlineAdf(hm[2]) });
      i++; continue;
    }

    // Fenced code block
    if (line.startsWith('```')) {
      const lang  = line.slice(3).trim() || null;
      const code  = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) { code.push(lines[i]); i++; }
      i++;
      nodes.push({ type: 'codeBlock', attrs: lang ? { language: lang } : {}, content: [{ type: 'text', text: code.join('\n') }] });
      continue;
    }

    // Table (collect all consecutive table rows)
    if (line.startsWith('|')) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        // Skip separator rows (|---|---|)
        if (!/^\|[-: |]+\|$/.test(lines[i])) rows.push(lines[i]);
        i++;
      }
      if (rows.length > 0) nodes.push(buildAdfTable(rows));
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      nodes.push({ type: 'blockquote', content: [{ type: 'paragraph', content: inlineAdf(line.slice(2)) }] });
      i++; continue;
    }

    // Bullet list (collect consecutive items)
    if (/^[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push({ type: 'listItem', content: [{ type: 'paragraph', content: inlineAdf(lines[i].replace(/^[-*]\s+/, '')) }] });
        i++;
      }
      nodes.push({ type: 'bulletList', content: items });
      continue;
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) { nodes.push({ type: 'rule' }); i++; continue; }

    // Empty line
    if (!line.trim()) { i++; continue; }

    // Paragraph
    nodes.push({ type: 'paragraph', content: inlineAdf(line) });
    i++;
  }

  return { version: 1, type: 'doc', content: nodes };
}

function buildAdfTable(lines) {
  const rows = lines.map((line, rowIdx) => {
    const cells = line.split('|').slice(1, -1).map(cell => ({
      type:    rowIdx === 0 ? 'tableHeader' : 'tableCell',
      attrs:   {},
      content: [{ type: 'paragraph', content: inlineAdf(cell.trim()) }],
    }));
    return { type: 'tableRow', content: cells };
  });
  return { type: 'table', attrs: { isNumberColumnEnabled: false, layout: 'default' }, content: rows };
}

function inlineAdf(text) {
  // Handle **bold** inline
  const parts = [];
  const re    = /\*\*(.*?)\*\*/g;
  let last = 0, m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push({ type: 'text', text: text.slice(last, m.index) });
    parts.push({ type: 'text', text: m[1], marks: [{ type: 'strong' }] });
    last = re.lastIndex;
  }
  if (last < text.length) parts.push({ type: 'text', text: text.slice(last) });
  return parts.length ? parts : [{ type: 'text', text: text }];
}

// ─────────────────────────────────────────────────────────────
// 6. Knowledge Base
// ─────────────────────────────────────────────────────────────
async function loadKbFile(relPath, kbLocalPath, gh, ghToken) {
  // Local first
  if (kbLocalPath) {
    const local = path.join(kbLocalPath, ...relPath.split('/'));
    if (fs.existsSync(local)) return fs.readFileSync(local, 'utf-8');
  }
  // GitHub fallback
  if (!ghToken) return null;
  const url  = `https://raw.githubusercontent.com/${gh.owner}/${gh.repo}/${gh.branch}/${relPath}`;
  const resp = await fetch(url, { headers: { Authorization: `Bearer ${ghToken}` } });
  return resp.ok ? resp.text() : null;
}

async function loadKb(config) {
  const kbPath  = process.env.KB_PATH?.replace(/\//g, path.sep);
  const ghToken = process.env.GH_TOKEN;
  const gh      = config.knowledgeBase.github;

  const files = [
    'GUIA_RAPIDO.md',
    'Arquitetura/01-visao-geral.md',
    'Regras de Negócio/01-glossario.md',
    'Regras de Negócio/02-lifecycle-chat.md',
  ];

  const loaded = [], missing = [];
  for (const f of files) {
    const content = await loadKbFile(f, kbPath, gh, ghToken);
    content ? loaded.push({ file: f, content }) : missing.push(f);
  }
  if (missing.length) console.warn(`⚠️  KB parcial — não encontrados: ${missing.join(', ')}`);
  return loaded;
}

// ─────────────────────────────────────────────────────────────
// 7. ADF → plain text (para extrair descrição do card)
// ─────────────────────────────────────────────────────────────
function adfToText(node) {
  if (!node) return '';
  if (typeof node === 'string') return node;
  const text = (node.text || '') + (node.content || []).map(adfToText).join('');
  return ['paragraph', 'heading', 'bulletList', 'listItem', 'blockquote', 'codeBlock'].includes(node.type)
    ? text + '\n' : text;
}

// ─────────────────────────────────────────────────────────────
// 8. Prompt builders
// ─────────────────────────────────────────────────────────────
function buildSystemPrompt(kbFiles) {
  const kb = kbFiles
    .map(({ file, content }) => `### ${file}\n${content}`)
    .join('\n\n---\n\n');

  return `Você é um especialista em Quality Assurance com profundo conhecimento do sistema Poli Digital — uma plataforma de mensageria empresarial via WhatsApp e outros canais.

Use a Base de Conhecimento abaixo EXCLUSIVAMENTE como contexto de validação:
- Confirmar que uma pré-condição é possível no sistema
- Usar terminologia correta nos resultados esperados
- Evitar pré-condições impossíveis

A KB NÃO deve inspirar cenários fora do escopo do card. Toda saída deve estar em Português do Brasil.

## Base de Conhecimento do Sistema

${kb}`;
}

function buildGenerationPrompt(issue) {
  const f        = issue.fields;
  const desc     = adfToText(f.description).trim();
  const subtasks = f.subtasks?.length
    ? f.subtasks.map(s => `- ${s.key}: ${s.fields?.summary}`).join('\n')
    : 'Nenhuma';

  return `## Card: ${issue.key} — ${f.summary}
**Tipo:** ${f.issuetype?.name || 'N/A'} | **Prioridade:** ${f.priority?.name || 'Não informada'} | **Status:** ${f.status?.name || 'N/A'}
**Labels:** ${f.labels?.join(', ') || 'Nenhuma'} | **Épico:** ${f.parent?.fields?.summary || '—'}
**Atualizado em:** ${f.updated}

### Descrição
${desc || 'Sem descrição.'}

### Subtasks
${subtasks}

---

Gere a análise QA completa para este card. Retorne APENAS markdown puro, sem explicações adicionais. Comece exatamente com a linha:

# Cenários de Teste — ${issue.key}

O documento deve ter as seguintes seções na ordem abaixo:

## Cabeçalho (primeiras linhas)
\`\`\`
# Cenários de Teste — ${issue.key}
> Card: ${f.summary}
> Gerado em: [data atual em pt-BR]
> Card atualizado em: ${f.updated}
\`\`\`

## Estratégia de Teste
Até 5 linhas cobrindo: escopo, tipos de teste aplicáveis, prioridade de execução e riscos principais.

## Mapa de Riscos
Tabela: | Risco | Probabilidade (A/M/B) | Impacto (A/M/B) | Prioridade |
Apenas riscos diretamente relacionados ao card.

## Cenários de Teste
Tabela com colunas EXATAS (sem adicionar nem remover):
| ID | Nome | Pré-requisitos | Passo a Passo | Resultado Esperado | Criticidade | Modo | Depende de |

Regras:
- ID: CT-[MODULO]-[NNN] onde MODULO é inferido do card e NNN é 3 dígitos (001, 002...)
- Nome: máximo 8 palavras
- Pré-requisitos: se o dado pode não existir no ambiente, marque "⚠️ Bloqueável — criável via API: [POST /endpoint]"
- Passo a Passo: numerado, reproduzível sem conhecer o código-fonte
- Resultado Esperado: comportamento preciso; inclua status HTTP quando aplicável
- Criticidade: 🔴 Alta | 🟡 Média | 🟢 Baixa
- Modo: API (apenas chamadas REST, sem browser) | UI (requer navegação/cliques)
- Depende de: — ou CT-ID do pré-requisito
- Mínimo obrigatório: 2 happy path + 3 negativos/erro + 2 borda + 1 segurança
- Cada cenário deve estar amarrado a uma regra de negócio ou critério de aceite explícito do card

## Cenários Gherkin
Os 2 cenários de criticidade 🔴 Alta mais relevantes no formato:
\`\`\`gherkin
Cenário: [nome]
  Dado [pré-condição]
  Quando [ação do usuário]
  Então [resultado esperado]
\`\`\``;
}

function buildCriticPrompt(issue, scenariosMarkdown) {
  const f           = issue.fields;
  const descTrunc   = adfToText(f.description).slice(0, 1500);
  const cardSummary = `**${issue.key}: ${f.summary}**\nTipo: ${f.issuetype?.name} | Prioridade: ${f.priority?.name}\n\n${descTrunc}`;

  return `Você é um revisor de cenários de teste QA. Avalie os cenários abaixo com base APENAS no card fornecido. Seja objetivo.

## Card
${cardSummary}

## Cenários a revisar
${scenariosMarkdown}

Critérios de avaliação:
1. **Rastreabilidade** — cada cenário está amarrado a um critério de aceite ou regra de negócio do card?
2. **Duplicatas** — há cenários com mesmo fluxo ou resultado esperado?
3. **Cobertura** — o conjunto cobre: 2 happy path, 3 negativos/erro, 2 borda, 1 segurança?
4. **Assunções indevidas** — algum cenário assume comportamentos que o card não menciona?
5. **Excesso técnico** — os passos são executáveis sem conhecer o código-fonte?

Formato de saída para cada problema encontrado:
[CT-ID] | [critério] | [problema] | [sugestão de correção]

Cenários sem problemas: não mencionar.
Última linha obrigatória: "Aprovados: N | Com problemas: N"`;
}

function buildCorrectionPrompt(scenariosMarkdown, criticFeedback) {
  return `Aplique TODAS as correções abaixo nos cenários e retorne apenas a tabela de cenários e os Gherkins corrigidos em markdown, sem outras seções.

## Cenários originais
${scenariosMarkdown}

## Feedback do revisor
${criticFeedback}`;
}

// ─────────────────────────────────────────────────────────────
// 9. Claude API
// ─────────────────────────────────────────────────────────────
async function callClaude(client, systemPrompt, userPrompt, opts = {}) {
  // cache: true → marca o system prompt para prompt caching (90% desconto nas próximas chamadas)
  const systemContent = opts.cache
    ? [{ type: 'text', text: systemPrompt, cache_control: { type: 'ephemeral' } }]
    : systemPrompt;

  const resp = await client.messages.create({
    model:      'claude-sonnet-4-6',
    max_tokens: opts.maxTokens || 8096,
    system:     systemContent,
    messages:   [{ role: 'user', content: userPrompt }],
  });

  return { content: resp.content[0].text, usage: resp.usage };
}

function logTokens(label, usage) {
  const hit     = usage.cache_read_input_tokens    || 0;
  const created = usage.cache_creation_input_tokens || 0;
  const raw     = (usage.input_tokens || 0) - hit - created;
  const parts   = [`input ${usage.input_tokens}`];
  if (hit)     parts.push(`cache_hit ${hit}`);
  if (created) parts.push(`cache_new ${created}`);
  if (raw)     parts.push(`raw ${raw}`);
  console.log(`   ${label}: ${parts.join(' | ')} → output ${usage.output_tokens}`);
}

// ─────────────────────────────────────────────────────────────
// 10. File helpers
// ─────────────────────────────────────────────────────────────
function saveScenarios(cardId, content) {
  const dir = path.join(ROOT, 'tests', 'scenarios');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, `${cardId}-cenarios.md`);
  fs.writeFileSync(filePath, content, 'utf-8');
  return filePath;
}

// Merge: preserve header+strategy+risks from original, replace cenários+gherkin with corrected version
function mergeCorrections(original, corrections) {
  const marker = '\n## Cenários de Teste\n';
  const idx    = original.indexOf(marker);
  if (idx === -1) return corrections;
  return original.slice(0, idx + 1) + corrections;
}

// ─────────────────────────────────────────────────────────────
// 11. Main
// ─────────────────────────────────────────────────────────────
async function main() {
  loadEnv();
  const opts   = parseArgs(process.argv);
  const config = loadConfig();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) { console.error('❌ ANTHROPIC_API_KEY não configurado no .env'); process.exit(1); }

  // Lazy-load @anthropic-ai/sdk (falha com mensagem clara se não instalado)
  let Anthropic;
  try { Anthropic = require('@anthropic-ai/sdk'); }
  catch (_) {
    console.error('❌ @anthropic-ai/sdk não instalado. Execute: npm install');
    process.exit(1);
  }
  const client = new Anthropic({ apiKey });

  // ── Step 1: Jira ────────────────────────────────────────────
  console.log(`\n🔍 Buscando ${opts.cardId} no Jira...`);
  let issue;
  try { issue = await fetchJiraCard(opts.cardId, config); }
  catch (e) { console.error(`❌ ${e.message}`); process.exit(1); }
  console.log(`✅ ${issue.key}: ${issue.fields.summary}`);

  // ── Step 2: KB ──────────────────────────────────────────────
  console.log('📚 Carregando Base de Conhecimento...');
  const kbFiles = await loadKb(config);
  console.log(`✅ ${kbFiles.length} arquivo(s) KB carregado(s)`);

  // ── Step 3: Gerar cenários ──────────────────────────────────
  const systemPrompt     = buildSystemPrompt(kbFiles);
  const generationPrompt = buildGenerationPrompt(issue);

  console.log('\n🤖 Gerando cenários (isso leva ~20-40s)...');
  let result;
  try { result = await callClaude(client, systemPrompt, generationPrompt, { cache: true }); }
  catch (e) { console.error(`❌ Claude API: ${e.message}`); process.exit(1); }

  logTokens('Geração', result.usage);
  let scenarios = result.content;

  // ── Step 4: Agente crítico (opcional) ───────────────────────
  if (opts.review) {
    console.log('\n🔍 Executando agente crítico...');
    let criticResult;
    try {
      criticResult = await callClaude(
        client,
        'Você é um revisor especialista de cenários de teste QA. Seja direto e objetivo.',
        buildCriticPrompt(issue, scenarios)
      );
    } catch (e) { console.warn(`⚠️  Agente crítico falhou: ${e.message}`); }

    if (criticResult) {
      logTokens('Crítico ', criticResult.usage);
      if (opts.verbose) console.log('\n── Feedback do revisor ──\n' + criticResult.content + '\n────────────────────────');

      const hasIssues = /Com problemas:\s*[1-9]/.test(criticResult.content);
      if (hasIssues) {
        console.log('🔄 Aplicando correções...');
        try {
          const corrResult = await callClaude(
            client, systemPrompt,
            buildCorrectionPrompt(scenarios, criticResult.content),
            { cache: true }
          );
          logTokens('Correção', corrResult.usage);
          scenarios = mergeCorrections(scenarios, corrResult.content);
        } catch (e) { console.warn(`⚠️  Correção falhou: ${e.message}`); }
      } else {
        console.log('✅ Cenários aprovados sem alteração');
      }
    }
  }

  // ── Garantir cabeçalho correto ──────────────────────────────
  const now = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  if (!scenarios.trimStart().startsWith('# Cenários de Teste')) {
    scenarios = `# Cenários de Teste — ${opts.cardId}\n> Card: ${issue.fields.summary}\n> Gerado em: ${now}\n> Card atualizado em: ${issue.fields.updated}\n\n${scenarios}`;
  }

  // ── Step 5: Salvar ──────────────────────────────────────────
  const filePath = saveScenarios(opts.cardId, scenarios);
  console.log(`\n📄 Salvo em: ${filePath}`);

  // ── Step 6: Publicar no Jira ─────────────────────────────────
  if (!opts.noPublish) {
    console.log('💬 Publicando no Jira...');
    try {
      await postJiraComment(opts.cardId, scenarios, config);
      console.log(`✅ Publicado: ${config.jira.baseUrl}/${opts.cardId}`);
    } catch (e) {
      console.warn(`⚠️  Publicação falhou: ${e.message}`);
      console.warn('   Arquivo local foi salvo com sucesso.');
    }
  }

  console.log('\n✅ Concluído!\n');
}

main().catch(e => { console.error('❌ Fatal:', e.message); if (process.env.DEBUG) console.error(e.stack); process.exit(1); });
