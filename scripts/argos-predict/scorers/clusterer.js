class Clusterer {
  clusterSimilarProblems(tickets) {
    const groups = {};

    for (const ticket of tickets) {
      const summary = (ticket.summary || ticket.title || '').toLowerCase();
      const module = ticket._module || 'Outros';
      const key = `${module}::${this._extractSignature(summary)}`;

      if (!groups[key]) {
        groups[key] = { signature: key, module, tickets: [], summary: '' };
      }
      groups[key].tickets.push(ticket);
      if (!groups[key].summary) groups[key].summary = ticket.summary || ticket.title || '';
    }

    const clusters = Object.values(groups)
      .filter(g => g.tickets.length >= 2)
      .sort((a, b) => b.tickets.length - a.tickets.length);

    return clusters;
  }

  clusterSentryIssues(issuesByModule) {
    const clusters = [];

    for (const [moduleName, issues] of Object.entries(issuesByModule)) {
      for (const issue of issues) {
        const isEscalating = issue.substatus === 'escalating';
        const hasActiveSM = issue._hasActiveSM || false;
        const daysSinceFirst = issue.firstSeen
          ? Math.round((Date.now() - new Date(issue.firstSeen).getTime()) / 86400000)
          : 0;

        clusters.push({
          urgencia: isEscalating ? '🔴' : '🟡',
          sintoma: this._truncate((issue.title || '').replace(/:.*$/, ''), 60),
          servico: issue.project || moduleName,
          qtd: issue.count || 0,
          users: issue.userCount || 0,
          module: moduleName,
          status: isEscalating ? 'ESCALANDO' : 'Crônico',
          days: daysSinceFirst,
        });
      }
    }

    clusters.sort((a, b) => {
      if (a.urgencia === '🔴' && b.urgencia !== '🔴') return -1;
      if (a.urgencia !== '🔴' && b.urgencia === '🔴') return 1;
      return b.qtd - a.qtd;
    });

    return clusters;
  }

  buildClustersForDrilldown(moduleName, tickets, sentryIssues) {
    const clusters = [];

    if (tickets && tickets.length > 0) {
      const ticketClusters = this.clusterSimilarProblems(tickets);
      for (const tc of ticketClusters.slice(0, 3)) {
        clusters.push({
          urgencia: '🔴',
          sintoma: this._truncate(tc.summary, 60),
          servico: tc.module,
          qtd: tc.tickets.length,
        });
      }
    }

    if (sentryIssues && sentryIssues.length > 0) {
      for (const issue of sentryIssues.slice(0, 2)) {
        if (!clusters.some(c => c.sintoma.includes(issue.title?.slice(0, 20) || ''))) {
          clusters.push({
            urgencia: issue.substatus === 'escalating' ? '🔴' : '🟡',
            sintoma: this._truncate(issue.title || '', 60),
            servico: issue.project || moduleName,
            qtd: issue.count || 0,
          });
        }
      }
    }

    return clusters.slice(0, 5);
  }

  _extractSignature(summary) {
    return summary
      .replace(/[0-9a-f]{8,}/gi, '') // remove UUIDs/hashes
      .replace(/\d{4,}/g, '')         // remove large numbers
      .replace(/[^\w\s]/g, ' ')       // remove punctuation
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 40);
  }

  _truncate(text, maxLen) {
    if (!text) return '';
    return text.length > maxLen ? text.slice(0, maxLen - 3) + '...' : text;
  }
}

module.exports = { Clusterer };
