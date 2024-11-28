import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import { Octokit } from "@octokit/rest"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.accessToken) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const octokit = new Octokit({
      auth: session.accessToken
    })

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

    // Process pull requests
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

    // Process issues
    issues.forEach(issue => {
      if (!issue.pull_request) { // Skip issues that are actually PRs
        const createdDate = new Date(issue.created_at)
        const monthIndex = createdDate.getMonth() + (12 - currentMonth)
        if (monthIndex >= 0 && monthIndex < 12) {
          monthlyData[monthIndex].issues++
        }
      }
    })

    return NextResponse.json(monthlyData)
  } catch (error: any) {
    console.error('Productivity data fetch error:', error)
    return new NextResponse(error.message || 'Failed to fetch productivity data', { status: 500 })
  }
} 