import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import { Octokit } from "@octokit/rest"
import { REVIEWER_CONFIG, isReviewer } from "@/config/reviewer"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.accessToken) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Get the repository from the request URL
    const { searchParams } = new URL(request.url)
    const repo = searchParams.get('repo')
    const owner = searchParams.get('owner')

    if (!repo || !owner) {
      return new NextResponse("Repository info required", { status: 400 })
    }

    const octokit = new Octokit({
      auth: session.accessToken
    })

    // Only fetch PRs for the current repository
    const { data: pullRequests } = await octokit.pulls.list({
      owner,
      repo,
      state: 'open',
      sort: 'updated',
      direction: 'desc'
    })

    // Get merge status for each PR
    const prsWithMergeInfo = await Promise.all(
      pullRequests.map(async pr => {
        const { data: prDetails } = await octokit.pulls.get({
          owner,
          repo,
          pull_number: pr.number
        })
        return {
          ...pr,
          mergeable: prDetails.mergeable,
          mergeable_state: prDetails.mergeable_state
        }
      })
    )

    return NextResponse.json(prsWithMergeInfo)
  } catch (error: any) {
    return new NextResponse(error.message || 'Failed to fetch PRs', { status: 500 })
  }
} 