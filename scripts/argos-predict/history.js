const path = require('path');
const fs = require('fs');
const { loadJsonSafe, saveJsonSafe, todayYYYYMMDD, daysBetween } = require('./utils');

class HistoryManager {
  constructor(historyDir, retentionDays = 90) {
    this.historyDir = historyDir;
    this.retentionDays = retentionDays;
  }

  _filePath(dateStr = todayYYYYMMDD()) {
    return path.join(this.historyDir, `scores-${dateStr}.json`);
  }

  saveScores(scores, meta = {}) {
    const data = {
      data: meta.date || todayYYYYMMDD(),
      janela_dias: meta.days || 14,
      modo: meta.mode || 'completo',
      ...scores,
    };
    return saveJsonSafe(this._filePath(meta.date), data);
  }

  loadHistory(days = 90) {
    if (!fs.existsSync(this.historyDir)) return [];
    const files = fs.readdirSync(this.historyDir)
      .filter(f => f.startsWith('scores-') && f.endsWith('.json'))
      .sort();

    const results = [];
    for (const file of files) {
      const data = loadJsonSafe(path.join(this.historyDir, file));
      if (data) {
        const fileDate = file.replace('scores-', '').replace('.json', '');
        const age = daysBetween(fileDate, todayYYYYMMDD());
        if (age <= this.retentionDays) {
          results.push({ ...data, _date: fileDate });
        }
      }
    }

    return results;
  }

  getLatestScores(history = null) {
    const records = history || this.loadHistory();
    if (records.length === 0) return null;
    return records[records.length - 1];
  }

  getPreviousScores(history = null) {
    const records = history || this.loadHistory();
    if (records.length < 2) return null;
    return records[records.length - 2];
  }

  calculateDelta(currentScores, previousScores) {
    const delta = {};
    if (!previousScores) return delta;

    const current = currentScores.modulos || currentScores;
    const previous = previousScores.modulos || previousScores;

    for (const [name, curr] of Object.entries(current)) {
      const prev = previous[name];
      if (curr && prev && curr.total !== undefined && prev.total !== undefined) {
        delta[name] = {
          delta: Math.round((curr.total - prev.total) * 10) / 10,
          ontem: prev.total,
          hoje: curr.total,
        };
      }
    }

    return delta;
  }

  getChurnBaseline(history = null) {
    const records = history || this.loadHistory(28);
    const last4 = records.slice(-4);

    const baseline = {};
    for (const rec of last4) {
      const modulos = rec.modulos || rec;
      for (const [name, data] of Object.entries(modulos)) {
        if (data.churn_lines) {
          if (!baseline[name]) baseline[name] = [];
          baseline[name].push(data.churn_lines);
        }
      }
    }

    const result = {};
    for (const [name, churns] of Object.entries(baseline)) {
      result[name] = churns.reduce((s, c) => s + c, 0) / churns.length;
    }

    return result;
  }
}

module.exports = { HistoryManager };
