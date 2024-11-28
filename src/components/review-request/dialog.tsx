'use client'

import * as React from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { GitPullRequest, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useSession } from "next-auth/react"

interface ReviewRequestDialogProps {
  isOpen: boolean
  onClose: () => void
  owner: string
  repo: string
}

interface PullRequest {
  id: number
  number: number
  title: string
  html_url: string
  head: { ref: string }
  user: { login: string }
  mergeable: boolean
  mergeable_state: string
}

export function ReviewRequestDialog({ isOpen, onClose, owner, repo }: ReviewRequestDialogProps) {
  const { data: session } = useSession()
  const [pullRequests, setPullRequests] = React.useState<PullRequest[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [mergingPRs, setMergingPRs] = React.useState<Set<number>>(new Set())

  const fetchPullRequests = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/github/review-requests?owner=${owner}&repo=${repo}`)
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setPullRequests(data)
    } catch (error) {
      console.error('Failed to fetch PRs')
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    if (isOpen) fetchPullRequests()
  }, [isOpen])

  const filteredPRs = pullRequests.filter(pr => 
    pr.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pr.head.ref.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleMerge = async (pr: PullRequest) => {
    try {
      setMergingPRs(prev => new Set(prev).add(pr.number))
      
      const response = await fetch('/api/github/merge-pr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          owner,
          repo,
          pull_number: pr.number
        })
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(error)
      }

      // Refresh the PR list after successful merge
      await fetchPullRequests()
    } catch (error) {
      console.error('Failed to merge:', error)
    } finally {
      setMergingPRs(prev => {
        const next = new Set(prev)
        next.delete(pr.number)
        return next
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-[#0C0C0C] border-[#2D2D2D] text-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold flex items-center gap-2">
            <GitPullRequest className="h-5 w-5" />
            Pull Requests
          </DialogTitle>
          <DialogDescription className="text-[#888888]">
            Open pull requests in {owner}/{repo}
          </DialogDescription>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666666]" />
          <Input
            placeholder="Search pull requests..."
            className="pl-9 bg-[#1F1F1F] border-[#2D2D2D] text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-4 mt-4 max-h-[400px] overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin h-6 w-6 border-2 border-[#9467FF] border-t-transparent rounded-full" />
            </div>
          ) : filteredPRs.length === 0 ? (
            <div className="text-center py-8 text-[#666666]">
              No open pull requests
            </div>
          ) : (
            filteredPRs.map((pr) => (
              <div
                key={pr.id}
                className="p-4 rounded-lg bg-[#1F1F1F] border border-[#2D2D2D] hover:border-[#9467FF] transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-white">{pr.title}</h4>
                    <p className="text-sm text-[#888888] mt-1">
                      #{pr.number} by {pr.user.login}
                    </p>
                    <p className="text-xs text-[#666666] mt-0.5">
                      {pr.head.ref}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => window.open(pr.html_url + '/files', '_blank')}
                      className="bg-[#9467FF] hover:bg-[#7C4DFF] text-white"
                    >
                      Review
                    </Button>
                    {pr.mergeable && (
                      <Button
                        size="sm"
                        onClick={() => handleMerge(pr)}
                        disabled={mergingPRs.has(pr.number)}
                        className="bg-[#4ADE80] hover:bg-[#22C55E] text-white disabled:opacity-50"
                      >
                        {mergingPRs.has(pr.number) ? (
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Merging...
                          </div>
                        ) : (
                          'Merge'
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
} 