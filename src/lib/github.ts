import { Octokit } from "@octokit/rest";

export class GitHubAPI {
  private octokit: Octokit;

  constructor(accessToken: string) {
    this.octokit = new Octokit({
      auth: accessToken,
    });
  }

  async getRepositories() {
    const { data } = await this.octokit.repos.listForAuthenticatedUser({
      sort: 'updated',
      per_page: 100,
    });
    return data;
  }

  async getPullRequests() {
    const { data } = await this.octokit.search.issuesAndPullRequests({
      q: 'is:pr author:@me',
      sort: 'updated',
      order: 'desc',
    });
    return data.items;
  }

  async getIssues() {
    const { data } = await this.octokit.search.issuesAndPullRequests({
      q: 'is:issue author:@me',
      sort: 'updated',
      order: 'desc',
    });
    return data.items;
  }
} 