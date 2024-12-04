'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { getGitHubData } from "@/app/actions"
import { cn } from "@/lib/utils"
import { GitPullRequest, GitMerge, AlertCircle } from "lucide-react"
import { ProductivityChart } from "./productivity-chart"
import { Urgents } from "@/components/dashboard/urgents"

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

type MonthlyStats = {
  month: string
  prs: number
  merges: number
  issues: number
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
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats[]>([])

  useEffect(() => {
    if (session?.accessToken) {
      getGitHubData(session).then(data => {
        if (data) {
          const prs = data.pullRequests as unknown as GitHubPullRequest[]
          const issues = data.issues

          // Get all merged PRs (only declare once)
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

          // Calculate monthly stats
          const today = new Date()
          const monthlyData = Array.from({ length: 12 }, (_, i) => {
            const date = new Date(today)
            date.setMonth(today.getMonth() - (11 - i))
            return {
              month: date.toLocaleString('default', { month: 'short' }),
              year: date.getFullYear(),
              prs: 0,
              merges: 0,
              issues: 0
            }
          })

          // Helper function to find the correct month index
          const findMonthIndex = (date: Date) => {
            const targetMonth = date.getMonth()
            const targetYear = date.getFullYear()
            return monthlyData.findIndex(data => {
              const monthDate = new Date()
              monthDate.setMonth(today.getMonth() - (11 - monthlyData.indexOf(data)))
              return monthDate.getMonth() === targetMonth && 
                     monthDate.getFullYear() === targetYear
            })
          }

          // Process PRs and merges
          prs.forEach(pr => {
            const createdDate = new Date(pr.created_at)
            const monthIndex = findMonthIndex(createdDate)
            
            if (monthIndex >= 0) {
              monthlyData[monthIndex].prs++
              if (pr.merged_at) {
                const mergedDate = new Date(pr.merged_at)
                const mergeMonthIndex = findMonthIndex(mergedDate)
                if (mergeMonthIndex >= 0) {
                  monthlyData[mergeMonthIndex].merges++
                }
              }
            }
          })

          // Process issues
          issues.forEach((issue: any) => {
            const createdDate = new Date(issue.created_at)
            const monthIndex = findMonthIndex(createdDate)
            if (monthIndex >= 0) {
              monthlyData[monthIndex].issues++
            }
          })

          setMonthlyStats(monthlyData)
        }
      })
    }
  }, [session])

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card 
          title="Pull Requests" 
          value={stats.pullRequests}
          trend={stats.pullRequestsTrend}
          icon={<GitPullRequest className="h-12 w-4 text-[#9467FF]" />}
          trendLabel="this week"
        />
        <Card 
          title="Merges" 
          value={stats.merges}
          trend={stats.mergesTrend}
          icon={<GitMerge className="h-12 w-4 text-[#4ADE80]" />}
          trendLabel="this week"
        />
        <Card 
          title="Issues" 
          value={stats.issues}
          trend={stats.issuesTrend}
          icon={<AlertCircle className="h-12 w-4 text-[#F87171]" />}
          trendLabel="this week"
        />
      </div>

      {/* Charts Section */}
      <div className="flex gap-8">
        <ProductivityChart data={monthlyStats} />
        <div className="flex-1">
          <Urgents />
        </div>
      </div>
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