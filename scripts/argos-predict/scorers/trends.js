const { daysBetween, todayISO, avg } = require('../utils');

class TrendCalculator {
  calculateTrend(moduleName, recentTickets, historicTickets, days = 14) {
    const recentCutoff = new Date();
    recentCutoff.setDate(recentCutoff.getDate() - 7);
    const olderCutoff = new Date();
    olderCutoff.setDate(olderCutoff.getDate() - days);

    const recent = recentTickets.filter(t => {
      const d = new Date(t.created || t.updated);
      return d >= recentCutoff;
    });

    const older = historicTickets.filter(t => {
      const d = new Date(t.created || t.updated);
      return d >= olderCutoff && d < recentCutoff;
    });

    const rateRecent = recent.length / 7;
    const rateOlder = older.length / Math.max(days - 7, 1);

    if (rateOlder === 0 && rateRecent > 0) return { direction: '↗️', ratio: 999 };
    if (rateOlder === 0 && rateRecent === 0) return { direction: '→', ratio: 1 };

    const ratio = rateRecent / rateOlder;

    if (ratio > 1.3) return { direction: '↗️', ratio };
    if (ratio < 0.7) return { direction: '↘️', ratio };
    return { direction: '→', ratio };
  }

  calculateHeatmap(modules) {
    const results = [];

    for (const [name, data] of Object.entries(modules)) {
      const pressure = (data.scores || {}).score_usr || 0;
      const attention = this._calculateDevAttention(data.devCards || []);

      let zona;
      if (pressure >= 4 && attention === 0) {
        zona = 'Negligenciada';
      } else if (pressure - attention >= 3) {
        zona = 'Subatendida';
      } else if (attention > pressure + 3) {
        zona = 'Sobre-investida';
      } else {
        zona = 'Balanceada';
      }

      results.push({
        modulo: name,
        pressao: Math.round(pressure * 10) / 10,
        atencao: attention,
        gap: Math.round((pressure - attention) * 10) / 10,
        zona,
      });
    }

    results.sort((a, b) => b.gap - a.gap);
    return results;
  }

  _calculateDevAttention(devCards) {
    let attention = 0;
    for (const card of devCards) {
      const type = card._cardType || '';
      if (type === 'corretivo') attention += 3;
      else if (type === 'feature_instavel') attention += 1;
      else if (type === 'corretivo_backlog') attention += 1;
    }
    return attention;
  }

  projectLinear(moduleName, currentScore, historyScores) {
    if (historyScores.length < 4) return null;

    const deltas = [];
    const sorted = [...historyScores].sort((a, b) =>
      new Date(a.date || a.data) - new Date(b.date || b.data)
    );

    for (let i = 1; i < sorted.length; i++) {
      const prev = sorted[i - 1].modulos?.[moduleName]?.total ||
                   sorted[i - 1][moduleName]?.total || 0;
      const curr = sorted[i].modulos?.[moduleName]?.total ||
                   sorted[i][moduleName]?.total || 0;
      deltas.push(curr - prev);
    }

    if (deltas.length === 0) return null;

    const weeklyDelta = avg(deltas);
    const projection = currentScore + weeklyDelta;
    const alert = projection >= 20 ? '🔴 Crítico' : projection >= 10 ? '🟡 Alerta' : '🟢 Estável';

    return {
      weeklyDelta: Math.round(weeklyDelta * 10) / 10,
      projectedScore: Math.round(projection * 10) / 10,
      alert,
      weeksUsed: sorted.length,
    };
  }
}

module.exports = { TrendCalculator };
