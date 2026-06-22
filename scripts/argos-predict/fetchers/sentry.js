class SentryFetcher {
  constructor(host, org, authToken) {
    this.host = host.replace(/\/+$/, '');
    this.org = org;
    this.authToken = authToken;
    this.base = `${this.host}/api/0`;
  }

  async _get(path) {
    const url = `${this.base}${path}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.authToken}`,
        Accept: 'application/json',
      },
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Sentry ${res.status}: ${text.slice(0, 200)}`);
    }
    return res.json();
  }

  async healthCheck() {
    try {
      await this._get('/auth/');
      return true;
    } catch {
      return false;
    }
  }

  async fetchProjects() {
    return this._get(`/organizations/${this.org}/projects/`);
  }

  async fetchIssues(projectSlug, query = 'is:unresolved', statsPeriod = '14d', limit = 100) {
    const params = new URLSearchParams({
      query,
      limit: String(limit),
      sort: 'freq',
    });
    if (statsPeriod) params.set('statsPeriod', statsPeriod);
    return this._get(
      `/projects/${this.org}/${projectSlug}/issues/?${params.toString()}`
    );
  }

  async fetchIssueStats(issueId) {
    const [issue] = await this._get(`/issues/${issueId}/`);
    return {
      id: issue?.id,
      title: issue?.title,
      count: issue?.count || issue?.userCount || 0,
      userCount: issue?.userCount || 0,
      firstSeen: issue?.firstSeen || null,
      lastSeen: issue?.lastSeen || null,
      status: issue?.status || 'unresolved',
      substatus: issue?.substatus || null,
    };
  }

  async fetchIssueStatsSimple(issueId) {
    try {
      const data = await this._get(`/issues/${issueId}/`);
      return {
        id: data.id,
        title: data.title,
        count: data.count || data.annotatedCount || 0,
        userCount: data.userCount || 0,
        firstSeen: data.firstSeen || null,
        lastSeen: data.lastSeen || null,
        status: data.status || 'unresolved',
        substatus: data.substatus || null,
      };
    } catch {
      return { id: issueId, title: '', count: 0, userCount: 0, firstSeen: null, lastSeen: null, status: 'unknown', substatus: null };
    }
  }

  calculateDelta(issues7d, issues14d) {
    const count7d = issues7d.reduce((s, i) => s + (i.count || 0), 0);
    const count14d = issues14d.reduce((s, i) => s + (i.count || 0), 0);
    const prevCount = count14d - count7d;
    if (prevCount === 0) return count7d > 0 ? 100 : 0;
    return Math.round(((count7d - prevCount) / prevCount) * 100);
  }

  mapIssuesToModules(issues, projectToModuleMap) {
    const result = {};
    for (const issue of issues) {
      const project = issue.project?.slug || issue.project?.name || '';
      const moduleName = projectToModuleMap[project];
      if (moduleName) {
        if (!result[moduleName]) result[moduleName] = [];
        result[moduleName].push({
          id: issue.id,
          title: issue.title,
          count: issue.count || 0,
          userCount: issue.userCount || 0,
          firstSeen: issue.firstSeen || null,
          lastSeen: issue.lastSeen || null,
          status: issue.status || 'unresolved',
          substatus: issue.substatus || null,
        });
      }
    }
    return result;
  }
}

module.exports = { SentryFetcher };
