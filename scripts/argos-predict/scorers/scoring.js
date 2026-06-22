const { decayFactor, daysBetween, todayISO } = require('../utils');

class ScoringEngine {
  constructor(config) {
    this.decayFactors = config.argos.scoring.decayFactors;
    this.supportWeights = config.argos.scoring.supportWeights;
    this.crossServiceWeights = config.argos.scoring.crossServiceWeights;
    this.churnThresholds = config.argos.scoring.churnThresholds;
    this.entropyThresholds = config.argos.scoring.entropyThresholds;
    this.newcomerFactorThreshold = config.argos.scoring.newcomerFactorThreshold;
    this.doraThresholds = config.argos.scoring.doraThresholds;
    this.releaseHealthThresholds = config.argos.scoring.releaseHealthThresholds;
    this.kbFragileAreas = config.kbFragileAreas || {};
  }

  getSupportWeight(issueType) {
    const w = this.supportWeights[issueType];
    return w !== undefined ? w : 0;
  }

  classifyLevel(scoreTotal) {
    if (scoreTotal >= 10) return { level: 'ALTO', color: '#EF4444', emoji: '🔴' };
    if (scoreTotal >= 6) return { level: 'MÉDIO', color: '#F59E0B', emoji: '🟡' };
    if (scoreTotal >= 3) return { level: 'ATENÇÃO', color: '#F97316', emoji: '🟠' };
    return { level: 'ESTÁVEL', color: '#22C55E', emoji: '🟢' };
  }

  calculateSCORE_TEC(moduleName, signals) {
    let score = 0;
    const b = {};

    const kb = this.kbFragileAreas[moduleName];
    if (kb) {
      b.kb = kb.pts;
      score += kb.pts;
    } else {
      b.kb = 0;
    }

    const sentryIssues = signals.sentryIssues || [];
    const sentryProjectCount = new Set(sentryIssues.map(i => i.project || i.id)).size;
    b.sentry_projects = Math.min(sentryProjectCount, 4) * 3;
    score += b.sentry_projects;

    const highCountIssues = sentryIssues.filter(i => i.count > 10).length;
    b.sentry_high_count = highCountIssues;
    score += highCountIssues;

    const refDate = new Date();
    refDate.setDate(refDate.getDate() - 7);
    const newIssues = sentryIssues.filter(i => i.firstSeen && new Date(i.firstSeen) >= refDate).length;
    b.sentry_new = newIssues;
    score += newIssues;

    const sentryDelta = signals.sentryDelta || 0;
    b.sentry_delta = 0;
    if (sentryDelta > 50) {
      b.sentry_delta = 2;
      score += 2;
    } else if (sentryDelta >= 20) {
      b.sentry_delta = 1;
      score += 1;
    }

    const churn = signals.churn || {};
    const churnLines = churn.churn_lines || 0;
    b.churn = 0;
    if (churnLines > this.churnThresholds.high) {
      b.churn = 2;
      score += 2;
    } else if (churnLines > this.churnThresholds.medium) {
      b.churn = 1;
      score += 1;
    }

    const uniqueAuthors = (churn.unique_authors || 0);
    b.churn_authors = 0;
    if (uniqueAuthors > 3) {
      b.churn_authors = 1;
      score += 1;
    }

    const crossWeight = signals.crossServiceWeight || 1.0;
    b.cross_service = 0;
    if (crossWeight >= 1.5) {
      b.cross_service = 2;
      score += 2;
    } else if (crossWeight >= 1.3) {
      b.cross_service = 1;
      score += 1;
    }

    const deployFreq = churn.deploy_freq || 0;
    b.deploy_freq = 0;
    if (deployFreq >= 5) {
      b.deploy_freq = 1;
      score += 1;
    }

    const rushedPRs = signals.rushedPRs || 0;
    b.rushed_prs = 0;
    if (rushedPRs >= 2) {
      b.rushed_prs = 1;
      score += 1;
    }

    const bugReopenCount = signals.bugReopenCount || 0;
    b.bug_reopen = 0;
    if (bugReopenCount >= 1) {
      b.bug_reopen = 2;
      score += 2;
    }
    if (bugReopenCount >= 3) {
      b.bug_reopen += 1;
      score += 1;
    }

    const avgResolutionDays = signals.avgResolutionDays || 0;
    b.resolution_time = 0;
    if (avgResolutionDays > 14) {
      b.resolution_time = 1;
      score += 1;
    }

    b.env_failure = signals.envFailure ? 1 : 0;
    score += b.env_failure;

    const flakiness = signals.qaFlakiness || 0;
    b.flakiness = 0;
    if (flakiness > 0.15) {
      b.flakiness = 1;
      score += 1;
    }

    const entropy = signals.entropy || 0;
    b.entropy = 0;
    if (entropy > this.entropyThresholds.high) {
      b.entropy = 2;
      score += 2;
    } else if (entropy > this.entropyThresholds.medium) {
      b.entropy = 1;
      score += 1;
    }

    const newcomerFactor = signals.newcomerFactor || 0;
    b.newcomer = 0;
    if (newcomerFactor > this.newcomerFactorThreshold) {
      b.newcomer = 1;
      score += 1;
    }

    const cfr = signals.cfr;
    b.cfr = 0;
    if (cfr !== undefined && cfr !== null) {
      if (cfr > this.doraThresholds.cfr_instavel) {
        b.cfr = 2;
        score += 2;
      } else if (cfr > this.doraThresholds.cfr_atencao) {
        b.cfr = 1;
        score += 1;
      }
    }

    const crashFreeDelta = signals.crashFreeDelta;
    b.release_health = 0;
    if (crashFreeDelta !== undefined && crashFreeDelta !== null) {
      if (crashFreeDelta < this.releaseHealthThresholds.critico) {
        b.release_health = 2;
        score += 2;
      } else if (crashFreeDelta < this.releaseHealthThresholds.atencao) {
        b.release_health = 1;
        score += 1;
      }
    }

    b.suspect_commit = signals.suspectCommit ? 1 : 0;
    score += b.suspect_commit;

    const mutationScore = signals.mutationScore;
    b.mutation_score = 0;
    if (mutationScore !== undefined && mutationScore !== null) {
      if (mutationScore < 0.40) {
        b.mutation_score = 2;
        score += 2;
      } else if (mutationScore < 0.60) {
        b.mutation_score = 1;
        score += 1;
      }
    }

    const stalenessCount = signals.stalenessCount || 0;
    b.staleness = 0;
    if (stalenessCount >= 2) {
      b.staleness = 1;
      score += 1;
    }

    return { score, breakdown: b };
  }

  calculateSCORE_USR(moduleName, signals) {
    let score = 0;
    const b = {};

    const smTickets = signals.smTickets || [];
    let smScore = 0;
    let ticketCount = 0;
    for (const t of smTickets) {
      const age = daysBetween(t.created || t.updated || todayISO(), todayISO());
      const df = decayFactor(age, this.decayFactors);
      const wt = this.getSupportWeight(t.type) * df;
      smScore += wt;
      ticketCount++;
      if (t.priority === 'High' || t.priority === 'Highest' || t.priority === 'Crítica') {
        smScore += 2 * df;
      }
      if (t.linkedDevCard) {
        smScore += 1 * df;
      }
    }
    b.sm_n1 = Math.round(smScore * 10) / 10;
    score += b.sm_n1;

    const sentryIssues = signals.sentryIssues || [];
    const highUserIssues = sentryIssues.filter(i => i.userCount > 5).length;
    b.sentry_users = highUserIssues;
    score += highUserIssues;

    const sentryDelta = signals.sentryDelta || 0;
    b.sentry_delta_usr = 0;
    if (sentryDelta > 50) {
      b.sentry_delta_usr = 1;
      score += 1;
    }

    const devBacklogCount = signals.devBacklogCount || 0;
    b.dev_backlog = devBacklogCount;
    score += devBacklogCount;

    const devActiveCount = signals.devActiveCount || 0;
    b.dev_active = devActiveCount * 2;
    score += b.dev_active;

    return { score: Math.round(score * 10) / 10, breakdown: b, ticketCount };
  }

  calculateBOMBA_SCORE(moduleName, scoreTotal, bombSignals) {
    let bonus = 0;
    const reasons = [];

    if (bombSignals.corretivoEmDev) { bonus += 5; reasons.push('Corretivo em dev'); }
    if (bombSignals.featureInstavel) { bonus += 4; reasons.push('Feature em area instavel'); }
    if (bombSignals.trendUp) { bonus += 3; reasons.push('Tendencia de alta'); }
    if (bombSignals.userCount > 100) { bonus += 2; reasons.push(`Alto impacto (${bombSignals.userCount} usuarios)`); }
    if (bombSignals.issueAge > 60) { bonus += 2; reasons.push('Problema cronico (>60 dias)'); }
    if (bombSignals.noCorretivo) { bonus += 3; reasons.push('Sem corretivo planejado'); }
    if (bombSignals.bugReopen >= 2) { bonus += 2; reasons.push('Bugs reabertos (regressao)'); }
    if (bombSignals.sentryDelta > 50) { bonus += 2; reasons.push(`Sentry escalando +${bombSignals.sentryDelta}%`); }
    if (bombSignals.envSpecific) { bonus += 1; reasons.push('Falha ambiente-especifica'); }
    if (bombSignals.crossService) { bonus += 2; reasons.push('Impacto cross-servico'); }

    return { score: scoreTotal + bonus, bonus, reasons };
  }
}

module.exports = { ScoringEngine };
