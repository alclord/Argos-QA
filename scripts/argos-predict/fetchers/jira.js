class JiraFetcher {
  constructor({ cloudId, baseUrl, email, apiToken }) {
    this.cloudId = cloudId;
    const domain = baseUrl.replace('https://', '').replace('http://', '').split('/')[0];
    this.apiBase = `https://${domain}/rest/api/3`;
    this.auth = Buffer.from(`${email}:${apiToken}`).toString('base64');
    this.headers = {
      Authorization: `Basic ${this.auth}`,
      Accept: 'application/json',
    };
  }

  async _get(path) {
    const res = await fetch(path, { headers: this.headers });
    const contentType = res.headers.get('content-type') || '';
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Jira ${res.status}: ${text.slice(0, 200)}`);
    }
    if (contentType.includes('application/json')) {
      return res.json();
    }
    const text = await res.text();
    throw new Error(`Jira retornou ${contentType}: ${text.slice(0, 200)}`);
  }

  async _post(path, body) {
    const res = await fetch(path, {
      method: 'POST',
      headers: { ...this.headers, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const contentType = res.headers.get('content-type') || '';
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Jira POST ${res.status}: ${text.slice(0, 200)}`);
    }
    if (contentType.includes('application/json')) {
      return res.json();
    }
    const text = await res.text();
    throw new Error(`Jira POST retornou ${contentType}: ${text.slice(0, 200)}`);
  }

  async _search(jql, maxResults = 100, fields = []) {
    const body = { jql, maxResults };
    if (fields.length > 0) body.fields = fields.map(f => f.trim());
    const data = await this._post(`${this.apiBase}/search/jql`, body);
    return { issues: data.issues || [], isLast: data.isLast !== false, nextPageToken: data.nextPageToken || null };
  }

  async _searchAll(jql, maxPages = 10, pageSize = 100, fields = []) {
    const allIssues = [];
    let nextPageToken = null;
    let pages = 0;

    do {
      const body = { jql, maxResults: pageSize };
      if (fields.length > 0) body.fields = fields.map(f => f.trim());
      if (nextPageToken) body.nextPageToken = nextPageToken;

      const data = await this._post(`${this.apiBase}/search/jql`, body);
      const issues = data.issues || [];
      allIssues.push(...issues);
      pages++;

      nextPageToken = data.nextPageToken || null;
      const isLast = data.isLast !== false;

      if (isLast) break;
      if (pages >= maxPages) {
        console.warn(`  ⚠️ Paginacao atingiu limite de ${maxPages} paginas (${allIssues.length} tickets). Ajuste maxPages se necessario.`);
        break;
      }
    } while (nextPageToken);

    if (pages > 1) {
      console.log(`  📄 SM paginacao: ${pages} paginas, ${allIssues.length} tickets`);
    }
    return allIssues;
  }

  async healthCheck() {
    try {
      await this._get(`${this.apiBase}/myself`);
      return true;
    } catch {
      return false;
    }
  }

  async fetchSupportTickets(project, queue, days) {
    const jql = `project = ${project} AND resolution = Unresolved AND updated >= -${days}d ORDER BY priority DESC, updated DESC`;
    return this._searchAll(jql, 30, 100, [
      'summary', 'priority', 'status', 'issuetype', 'labels',
      'created', 'updated', 'reporter', 'issuelinks',
    ]);
  }

  async fetchDevBacklog(project, days) {
    const jql = `project = ${project} AND issuetype in (Story, Task, "História", "Tarefa", Feature, Epic, Sub-task) AND statuscategory = "To Do" AND updated >= -${days}d ORDER BY priority DESC, updated DESC`;
    const result = await this._search(jql, 100, [
      'summary', 'priority', 'status', 'labels', 'updated', 'issuetype', 'assignee',
    ]);
    return result.issues;
  }

  async fetchDevActive(project) {
    const jql = `project = ${project} AND issuetype in (Story, Task, "História", "Tarefa", Feature, Sub-task) AND statuscategory = "In Progress" AND updated >= -7d ORDER BY updated DESC`;
    const result = await this._search(jql, 100, [
      'summary', 'priority', 'status', 'labels', 'updated', 'issuetype', 'assignee',
    ]);
    return result.issues;
  }

  async fetchDevChangedSince(projects, sinceISO) {
    const projStr = projects.map(p => `"${p}"`).join(',');
    const jql = `project in (${projStr}) AND issuetype in (Story, Task, "História", "Tarefa", Feature, Epic, Sub-task) AND updated >= "${sinceISO.replace('+0000', '+0000')}" ORDER BY updated DESC`;
    const result = await this._search(jql, 200, [
      'summary', 'priority', 'status', 'labels', 'updated', 'issuetype', 'assignee',
    ]);
    return result.issues;
  }

  async fetchBugReopenRate(projects, days) {
    const projStr = projects.map(p => `"${p}"`).join(',');
    const jql = `project in (${projStr}) AND issuetype = Bug AND status changed FROM 10167 AFTER startOfDay(-${days}d) ORDER BY updated DESC`;
    const result = await this._search(jql, 100, [
      'summary', 'updated', 'assignee',
    ]);
    return result.issues;
  }

  async fetchResolvedBugs(projects, days) {
    const projStr = projects.map(p => `"${p}"`).join(',');
    const jql = `project in (${projStr}) AND issuetype = Bug AND status changed TO 10167 AFTER startOfDay(-${days}d) ORDER BY updated DESC`;
    const result = await this._search(jql, 100, [
      'summary', 'created', 'resolutiondate', 'updated',
    ]);
    return result.issues;
  }

  async getIssue(issueKey) {
    return this._get(`${this.apiBase}/issue/${issueKey}`);
  }

  async getTransitions(issueKey) {
    const data = await this._get(`${this.apiBase}/issue/${issueKey}/transitions`);
    return data.transitions || [];
  }

  async transitionIssue(issueKey, transitionId) {
    return this._post(`${this.apiBase}/issue/${issueKey}/transitions`, {
      transition: { id: transitionId },
    });
  }

  async addComment(issueKey, body) {
    const adfBody = {
      type: 'doc',
      version: 1,
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: body }],
        },
      ],
    };
    return this._post(`${this.apiBase}/issue/${issueKey}/comment`, { body: adfBody });
  }

  async createIssue(project, issueType, summary, description, labels = [], priority = 'High') {
    const body = {
      fields: {
        project: { key: project },
        issuetype: { name: issueType },
        summary,
        description: {
          type: 'doc',
          version: 1,
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: description }],
            },
          ],
        },
        labels,
        priority: { name: priority },
      },
    };
    return this._post(`${this.apiBase}/issue`, body);
  }
}

module.exports = { JiraFetcher };
