import { Octokit } from '@octokit/rest';
import { createNodeMiddleware } from '@octokit/webhooks';
import { WebhookEvent } from '@octokit/webhooks-types';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET;

if (!GITHUB_TOKEN) {
  throw new Error('GITHUB_TOKEN is required');
}

export const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

export type RepoMetrics = {
  pullRequests: number;
  openIssues: number;
  mergedPRs: number;
  commits: number;
  contributors: number;
};

export async function getRepositoryMetrics(owner: string, repo: string): Promise<RepoMetrics> {
  const [pulls, issues, commits] = await Promise.all([
    octokit.pulls.list({ owner, repo, state: 'all' }),
    octokit.issues.listForRepo({ owner, repo, state: 'open' }),
    octokit.repos.getCommitActivityStats({ owner, repo }),
  ]);

  const mergedPRs = pulls.data.filter(pr => pr.merged_at).length;

  return {
    pullRequests: pulls.data.length,
    openIssues: issues.data.length,
    mergedPRs,
    commits: commits.data?.reduce((acc, week) => acc + week.total, 0) || 0,
    contributors: (await octokit.repos.getContributorsStats({ owner, repo })).data?.length || 0,
  };
}

export async function getProductivityMetrics(owner: string, timeframe: 'day' | 'week' | 'month') {
  // Implementation for productivity metrics
  const repos = await octokit.repos.listForUser({ username: owner });
  
  const metrics = {
    commits: 0,
    pullRequests: 0,
    merges: 0,
    issues: 0,
  };

  // Aggregate data across repos
  // ... implementation details

  return metrics;
} 