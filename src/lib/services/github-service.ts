import { octokit } from "@/lib/github";
import { prisma } from "@/lib/prisma";

export async function getUserGitHubData(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user?.githubAccessToken) {
    throw new Error("GitHub account not linked");
  }

  const octokit = new Octokit({
    auth: user.githubAccessToken,
  });

  // Fetch user's repositories
  const repos = await octokit.repos.listForAuthenticatedUser();
  
  // Fetch user's pull requests
  const prs = await octokit.search.issuesAndPullRequests({
    q: `author:${user.githubUsername} type:pr`,
  });

  // Fetch user's issues
  const issues = await octokit.search.issuesAndPullRequests({
    q: `author:${user.githubUsername} type:issue`,
  });

  return {
    repositories: repos.data,
    pullRequests: prs.data.items,
    issues: issues.data.items,
  };
} 