import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import { Octokit } from "@octokit/rest"
import { PrismaClient } from "@prisma/client"

const REFRESH_INTERVAL = 15 * 60 * 1000; // 15 minutes in milliseconds

const prisma = new PrismaClient()

async function fetchGitHubData(octokit: Octokit) {
  // Get current date info
  const today = new Date()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth()

  // Initialize monthly data
  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(currentYear, currentMonth - 11 + i, 1)
    return {
      month: date.toLocaleString('default', { month: 'short' }),
      prs: 0,
      merges: 0,
      issues: 0
    }
  })

  // Get repository activity
  const { data: repoData } = await octokit.rest.repos.getParticipationStats({
    owner: "imsarthakshrma",
    repo: "kroskod-platform"
  })

  // Get recent PRs
  const { data: pullRequests } = await octokit.rest.pulls.list({
    owner: "imsarthakshrma",
    repo: "kroskod-platform",
    state: "all",
    sort: "updated",
    direction: "desc",
    per_page: 100
  })

  // Get recent issues
  const { data: issues } = await octokit.rest.issues.listForRepo({
    owner: "imsarthakshrma",
    repo: "kroskod-platform",
    state: "all",
    sort: "updated",
    direction: "desc",
    per_page: 100
  })

  // Process pull requests and issues
  pullRequests.forEach(pr => {
    const createdDate = new Date(pr.created_at)
    const monthIndex = createdDate.getMonth() + (12 - currentMonth)
    if (monthIndex >= 0 && monthIndex < 12) {
      monthlyData[monthIndex].prs++
      if (pr.merged_at) {
        monthlyData[monthIndex].merges++
      }
    }
  })

  issues.forEach(issue => {
    if (!issue.pull_request) {
      const createdDate = new Date(issue.created_at)
      const monthIndex = createdDate.getMonth() + (12 - currentMonth)
      if (monthIndex >= 0 && monthIndex < 12) {
        monthlyData[monthIndex].issues++
      }
    }
  })

  return monthlyData
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.accessToken) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const octokit = new Octokit({
      auth: session.accessToken
    })

    // Get the last refresh time from the database
    const lastRefresh = await prisma.githubCache.findFirst({
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Check if we need to refresh the data
    const shouldRefresh = !lastRefresh || 
      Date.now() - lastRefresh.createdAt.getTime() > REFRESH_INTERVAL;

    if (shouldRefresh) {
      // Fetch new data from GitHub and update cache
      const data = await fetchGitHubData(octokit);
      await prisma.githubCache.create({
        data: {
          content: JSON.stringify(data)
        }
      });
      return NextResponse.json(data);
    }

    // Return cached data if refresh is not needed
    return NextResponse.json(JSON.parse(lastRefresh.content));

  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return NextResponse.json({ error: 'Failed to fetch GitHub data' }, { status: 500 });
  }
} 