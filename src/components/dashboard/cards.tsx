'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { getGitHubData } from "@/app/actions"
import { cn } from "@/lib/utils"
import { GitPullRequest, GitMerge, AlertCircle } from "lucide-react"

type GitHubPullRequest = {
  id: number
  number: number
  state: string
  title: string
  created_at: string
  merged_at: string | null
  closed_at: string | null
  repository: {
    name: string
    full_name: string
  }
  head: {
    repo: {
      name: string
    }
  }
  base: {
    repo: {
      name: string
      full_name: string
    }
  }
  user: {
    login: string
    avatar_url: string
  }
}

type GitHubStats = {
  pullRequests: number
  merges: number
  issues: number
  pullRequestsTrend: number
  mergesTrend: number
  issuesTrend: number
}

export function DashboardCards() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<GitHubStats>({
    pullRequests: 0,
    merges: 0,
    issues: 0,
    pullRequestsTrend: 0,
    mergesTrend: 0,
    issuesTrend: 0
  })

  useEffect(() => {
    if (session?.accessToken) {
      getGitHubData(session).then(data => {
        if (data) {
          const prs = data.pullRequests as unknown as GitHubPullRequest[]
          
          // Get all merged PRs
          const mergedPRs = prs.filter(pr => pr.merged_at !== null)
          
          // Calculate the start of this week (Sunday)
          const startOfWeek = new Date()
          startOfWeek.setHours(0, 0, 0, 0)
          startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())

          // Count merges done this week
          const thisWeekMerges = mergedPRs.filter(pr => 
            new Date(pr.merged_at!) >= startOfWeek
          ).length

          setStats({
            pullRequests: prs.length,
            merges: mergedPRs.length,
            issues: data.issues.length,
            pullRequestsTrend: prs.filter(pr => 
              new Date(pr.created_at) >= startOfWeek
            ).length,
            mergesTrend: thisWeekMerges,
            issuesTrend: (data.issues as any[]).filter(issue => 
              new Date(issue.created_at) >= startOfWeek
            ).length
          })
        }
      })
    }
  }, [session])

  return (
    <div className="grid grid-cols-3 gap-4">
      <Card
        title="Pull Requests"
        value={stats.pullRequests}
        trend={stats.pullRequestsTrend}
        icon={<GitPullRequest className="h-4 w-4" />}
        trendLabel="this week"
      />
      <Card
        title="Merges"
        value={stats.merges}
        trend={stats.mergesTrend}
        icon={<GitMerge className="h-4 w-4" />}
        trendLabel="this week"
      />
      <Card
        title="Issues"
        value={stats.issues}
        trend={stats.issuesTrend}
        icon={<AlertCircle className="h-4 w-4" />}
        trendLabel="this week"
      />
    </div>
  )
}

function Card({ 
  title, 
  value, 
  trend, 
  icon, 
  trendLabel 
}: { 
  title: string
  value: number
  trend: number
  icon: React.ReactNode
  trendLabel: string
}) {
  return (
    <div className="rounded-lg bg-[#0C0C0C] border border-[#1F1F1F] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-sm font-medium text-[#DEDEDE]">{title}</h3>
        </div>
        <span className={cn(
          "text-xs",
          trend > 0 ? "text-[#4ADE80]" : "text-[#F87171]"
        )}>
          {trend > 0 ? '+' : ''}{trend} {trendLabel}
        </span>
      </div>
      <p className="mt-4 text-2xl font-bold text-white">{value}</p>
    </div>
  )
} 