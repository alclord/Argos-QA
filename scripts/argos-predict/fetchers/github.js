const { shuffleEntropy } = require('../utils');

class GitHubFetcher {
  constructor(token) {
    this.token = token;
    this.base = 'https://api.github.com';
    this.headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    };
  }

  async _get(path) {
    const res = await fetch(`${this.base}${path}`, { headers: this.headers });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`GitHub ${res.status}: ${text.slice(0, 200)}`);
    }
    return res.json();
  }

  async healthCheck() {
    try {
      await this._get('/user');
      return true;
    } catch {
      return false;
    }
  }

  async fetchMergedPRs(owner, repo, sinceISO) {
    const prs = await this._get(
      `/repos/${owner}/${repo}/pulls?state=closed&per_page=15&sort=updated&direction=desc`
    );
    return prs.filter(p => p.merged_at && p.merged_at >= sinceISO);
  }

  async fetchPRFiles(owner, repo, prNumber) {
    return this._get(`/repos/${owner}/${repo}/pulls/${prNumber}/files?per_page=50`);
  }

  async fetchCommits(owner, repo, sinceISO) {
    return this._get(
      `/repos/${owner}/${repo}/commits?since=${encodeURIComponent(sinceISO)}&per_page=15`
    );
  }

  async fetchCommitDetail(owner, repo, sha) {
    const commit = await this._get(`/repos/${owner}/${repo}/commits/${sha}`);
    const files = commit.files || [];
    const additions = files.reduce((s, f) => s + (f.additions || 0), 0);
    const deletions = files.reduce((s, f) => s + (f.deletions || 0), 0);
    return {
      sha,
      author: commit.commit?.author?.name || 'unknown',
      login: commit.author?.login || commit.commit?.author?.name || 'unknown',
      files: files.map(f => ({
        filename: f.filename,
        additions: f.additions || 0,
        deletions: f.deletions || 0,
        changes: (f.additions || 0) + (f.deletions || 0),
      })),
      additions,
      deletions,
      totalChanges: additions + deletions,
    };
  }

  calculatePRMetrics(pr, files) {
    const reviewTimeHours = pr.merged_at && pr.created_at
      ? (new Date(pr.merged_at) - new Date(pr.created_at)) / 3600000
      : 0;
    const churnLines = files.reduce((s, f) => s + (f.additions || 0) + (f.deletions || 0), 0);
    const entropy = shuffleEntropy(files);
    const isRushed = reviewTimeHours < 2 && files.length > 10;

    return {
      repo: pr.base?.repo?.name || '',
      pr_number: pr.number,
      title: pr.title,
      merged_at: pr.merged_at,
      created_at: pr.created_at,
      author: pr.user?.login || 'unknown',
      review_time_hours: Math.round(reviewTimeHours * 10) / 10,
      files_changed: files.length,
      churn_lines: churnLines,
      entropy,
      is_rushed: isRushed,
      files: files.map(f => ({
        filename: f.filename,
        additions: f.additions || 0,
        deletions: f.deletions || 0,
        changes: (f.additions || 0) + (f.deletions || 0),
      })),
    };
  }

  calculateRepoMetrics(prs) {
    if (!prs || prs.length === 0) {
      return { deploy_freq: 0, avg_review_time: 0, total_churn: 0, pr_count: 0 };
    }
    const reviewTimes = prs.map(p => p.review_time_hours || 0).filter(t => t > 0);
    return {
      deploy_freq: prs.length,
      avg_review_time: reviewTimes.length > 0
        ? Math.round((reviewTimes.reduce((a, b) => a + b, 0) / reviewTimes.length) * 10) / 10
        : 0,
      total_churn: prs.reduce((s, p) => s + (p.churn_lines || 0), 0),
      pr_count: prs.length,
    };
  }
}

module.exports = { GitHubFetcher };
