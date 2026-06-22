const path = require('path');
const fs = require('fs');
const { loadJsonSafe, saveJsonSafe, todayISO, daysBetween } = require('./utils');

class CacheManager {
  constructor(cachePath) {
    this.cachePath = cachePath;
    this.cache = null;
  }

  load() {
    this.cache = loadJsonSafe(this.cachePath);
    return this.cache;
  }

  exists() {
    return fs.existsSync(this.cachePath);
  }

  get age() {
    if (!this.cache || !this.cache.ultima_execucao) return Infinity;
    return daysBetween(this.cache.ultima_execucao, todayISO());
  }

  get smLastUpdate() {
    if (!this.cache) return null;
    return this.cache.sm_ultima_atualizacao || this.cache.ultima_execucao;
  }

  get smAge() {
    if (!this.smLastUpdate) return Infinity;
    return daysBetween(this.smLastUpdate, todayISO());
  }

  isStale(maxHours = 24) {
    if (!this.cache) return true;
    return this.age > (maxHours / 24);
  }

  isSmStale(maxHours = 24) {
    if (!this.cache) return true;
    return this.smAge > (maxHours / 24);
  }

  supportsCacheOnly() {
    return this.exists() && !this.isStale(24);
  }

  determineMode(days, flags) {
    const hasCache = this.exists();

    if (flags.cacheOnly) {
      if (!hasCache || this.isStale(24)) {
        return { mode: 'ERROR', reason: 'Cache ausente ou desatualizado (>24h). Execute --force-refresh antes.' };
      }
      return { mode: 'CACHE_ONLY' };
    }

    if (flags.forceRefresh) return { mode: 'COMPLETO' };
    if (!hasCache) return { mode: 'COMPLETO' };

    const cache = this.load();
    if (cache.janela_dias !== days) return { mode: 'COMPLETO' };
    if (this.age > 7) return { mode: 'COMPLETO' };
    return { mode: 'INCREMENTAL' };
  }

  getSupportCards() {
    return this.cache?.suporte_cards || [];
  }

  getDevBacklog() {
    return this.cache?.product_backlog_cards || [];
  }

  getDevActive() {
    return this.cache?.active_dev_cards || [];
  }

  getPRs() {
    return this.cache?.github_prs || {};
  }

  getSentrySnapshot() {
    return this.cache?.sentry_snapshot_7d || {};
  }

  save(data) {
    const cache = {
      ultima_execucao: todayISO(),
      sm_ultima_atualizacao: data.sm_ultima || todayISO(),
      janela_dias: data.janela_dias || 14,
      modo_ultima: data.modo || 'COMPLETO',
      suporte_cards: data.supportCards || [],
      product_backlog_cards: data.devBacklog || [],
      active_dev_cards: data.devActive || [],
      github_prs: data.githubPRs || {},
      sentry_snapshot_7d: data.sentrySnapshot || {},
      bug_reopen_raw: data.bugReopenRaw || [],
      bugs_resolved_raw: data.bugsResolvedRaw || [],
      scores_resumo: data.scoresResumo || {},
      stats: data.stats || {},
    };
    this.cache = cache;
    return saveJsonSafe(this.cachePath, cache);
  }
}

module.exports = { CacheManager };
