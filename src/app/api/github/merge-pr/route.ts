import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import { Octokit } from "@octokit/rest"
import { isReviewer } from "@/config/reviewer"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.accessToken) {
      console.log('No access token found')
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await request.json()
    const { owner, repo, pull_number } = body
    console.log('Merge request:', { owner, repo, pull_number }) // Debug log

    const octokit = new Octokit({
      auth: session.accessToken
    })

    // Get the authenticated user's username
    const { data: user } = await octokit.users.getAuthenticated()
    console.log('Authenticated as:', user.login)

    // Check if user has permission to merge
    if (!isReviewer(user.login)) {
      console.log('User not authorized to merge:', user.login)
      return new NextResponse("Not authorized to merge", { status: 403 })
    }

    // Check PR status before merging
    const { data: pr } = await octokit.pulls.get({
      owner,
      repo,
      pull_number
    })
    console.log('PR status:', pr.mergeable_state)

    if (!pr.mergeable) {
      return new NextResponse("PR is not mergeable", { status: 400 })
    }

    // Merge the PR
    const { data: mergeResult } = await octokit.pulls.merge({
      owner,
      repo,
      pull_number,
      merge_method: 'squash'
    })
    console.log('Merge result:', mergeResult)

    return NextResponse.json(mergeResult)
  } catch (error: any) {
    console.error('Merge failed:', error)
    return new NextResponse(error.message || 'Failed to merge PR', { status: 500 })
  }
} 