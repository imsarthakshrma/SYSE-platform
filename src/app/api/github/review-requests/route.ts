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

    // Fetch PRs where the user is requested for review
    const { data: pullRequests } = await octokit.search.issuesAndPullRequests({
      q: 'is:open is:pr review-requested:@me',
      sort: 'updated',
      order: 'desc',
      per_page: 100
    })

    return NextResponse.json(pullRequests.items)
  } catch (error) {
    console.error('Failed to fetch review requests:', error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
} 