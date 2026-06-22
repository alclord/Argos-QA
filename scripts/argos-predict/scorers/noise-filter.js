const { loadJsonSafe } = require('../utils');

const DEFAULT_NOISE_CONFIG = {
  external_keywords: {
    meta: [
      'meta api', 'meta business', 'meta business suite',
      'erro 131049', 'erro 131626', 'erro 136003', 'erro 136004', 'erro 136005',
      'banimento meta', 'conta em análise pela meta', 'conta em análise',
      'restrição meta', 'restrição da meta', 'instabilidade meta',
      'instabilidade da meta', 'meta fora do ar', 'meta caiu',
      'reputação do número', 'quality rating', 'level down',
    ],
    instagram: [
      'instagram caiu', 'instagram fora do ar', 'instagram não recebe',
      'instagram da meta', 'lentidão instagram', 'instagram instável',
      'instagram instabilidade', 'direct instagram', 'dm instagram',
      'leads de anúncios do instagram', 'instagram não envia',
      'instagram desconectou', 'canal do instagram caindo',
    ],
    facebook: [
      'facebook caiu', 'facebook fora do ar', 'facebook da meta',
      'messenger caiu', 'messenger fora do ar', 'facebook instável',
      'facebook instabilidade', 'página do facebook', 'fanpage',
    ],
    whatsapp_api: [
      'whatsapp business api', 'waba api', 'cloud api', 'whatsapp cloud',
      'número banido', 'número em análise', 'número suspenso',
      'whatsapp suspenso', 'whatsapp banido', 'restrição whatsapp',
      'whatsapp oficial', 'api oficial whatsapp', 'whatsapp temporariamente indisponível',
    ],
    z_api: [
      'z-api', 'zapi', 'z api', 'qr code whatsapp', 'whatsapp não oficial',
      'whatsapp qr code', 'conexão whatsapp',
    ],
    provedor_ia: [
      'openai', 'gpt', 'chatgpt', 'llm fora do ar', 'ia fora do ar', 'ia instável',
    ],
  },
  customer_issue_keywords: [
    'como faço para', 'como configurar', 'como migrar', 'como recuperar',
    'backup de conversas', 'dúvida sobre', 'pergunta sobre', 'não entendi',
    'não sei como', 'preciso de ajuda para', 'qual o procedimento',
    'redefinir senha', 'alterar senha', 'trocar senha', 'acesso remoto',
    'anydesk', 'qual o limite', 'limites de', 'créditos consumidos',
    'cobrança', 'fatura', 'plano',
  ],
  incident_detection: {
    min_tickets: 5,
    time_window_hours: 24,
    min_external_ratio: 0.6,
  },
  root_cause_classification: {
    poli: { weight: 1.0, description: 'Bug técnico da plataforma Poli' },
    externo: { weight: 0.0, description: 'Problema causado por serviço externo' },
    cliente: { weight: 0.0, description: 'Dúvida ou problema operacional do cliente' },
    indefinido: { weight: 0.5, description: 'Não foi possível classificar' },
  },
};

function normalize(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .trim();
}

function matchAny(text, keywords) {
  const norm = normalize(text);
  return keywords.some(kw => norm.includes(normalize(kw)));
}

class NoiseFilter {
  constructor(configPath = null) {
    this.config = DEFAULT_NOISE_CONFIG;
    if (configPath) {
      const loaded = loadJsonSafe(configPath);
      if (loaded) this.config = { ...DEFAULT_NOISE_CONFIG, ...loaded };
    }
  }

  _getAllExternalKeywords() {
    const all = [];
    const ext = this.config.external_keywords || {};
    for (const group of Object.values(ext)) {
      all.push(...group);
    }
    return all;
  }

  classifyTicket(summary, issueType) {
    const text = summary || '';
    const extKw = this.config.external_keywords || {};
    const customerKw = this.config.customer_issue_keywords || [];

    let hitExternal = false;
    let externalProvider = null;
    for (const [provider, keywords] of Object.entries(extKw)) {
      if (matchAny(text, keywords)) {
        hitExternal = true;
        externalProvider = provider;
        break;
      }
    }

    const isCustomerIssue = matchAny(text, customerKw);
    const isDuvida = issueType === 'Dúvida' || issueType === 'História';

    if (hitExternal) {
      return { rootCause: 'externo', weight: 0.0, provider: externalProvider };
    }
    if (isCustomerIssue && isDuvida) {
      return { rootCause: 'cliente', weight: 0.0 };
    }
    if (!isCustomerIssue && !hitExternal && (text.length > 0)) {
      return { rootCause: 'poli', weight: 1.0 };
    }

    return { rootCause: 'indefinido', weight: 0.5 };
  }

  classifyTicketsBatch(tickets) {
    const results = [];
    const byModule = {};
    const externalTickets = [];
    const now = new Date();

    for (const ticket of tickets) {
      const summary = ticket.summary || '';
      const issueType = ticket.issuetype || 'Bug';
      const classification = this.classifyTicket(summary, issueType);
      const module = ticket._module || 'Outros';
      const created = ticket.created ? new Date(ticket.created) : null;

      results.push({ ...ticket, _class: classification.rootCause, _weight: classification.weight });

      if (classification.rootCause === 'externo') {
        externalTickets.push({ ...ticket, _class: 'externo', _module: module, _created: created });
      }
    }

    const incidents = this._detectIncidents(externalTickets, now);

    return { tickets: results, incidents };
  }

  _detectIncidents(externalTickets, now) {
    const { min_tickets, time_window_hours, min_external_ratio } =
      this.config.incident_detection || DEFAULT_NOISE_CONFIG.incident_detection;

    const byModule = {};
    for (const t of externalTickets) {
      const mod = t._module;
      if (!byModule[mod]) byModule[mod] = [];
      byModule[mod].push(t);
    }

    const incidents = [];
    for (const [mod, tickets] of Object.entries(byModule)) {
      if (tickets.length < min_tickets) continue;
      const hoursAgo = time_window_hours / 24;
      const recentCount = tickets.filter(t => {
        if (!t._created) return false;
        return (now - t._created) / 3600000 <= time_window_hours;
      }).length;

      if (recentCount >= min_tickets) {
        incidents.push({
          module: mod,
          ticketCount: recentCount,
          confirmed: true,
          description: `${recentCount} tickets externos em <= ${time_window_hours}h — Incidente Externo Confirmado`,
        });
      }
    }

    return incidents;
  }
}

module.exports = { NoiseFilter };
