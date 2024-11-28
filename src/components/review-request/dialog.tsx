'use client'

import * as React from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { GitPullRequest, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface ReviewRequestDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function ReviewRequestDialog({ isOpen, onClose }: ReviewRequestDialogProps) {
  const [pullRequests, setPullRequests] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")

  React.useEffect(() => {
    if (isOpen) {
      // Fetch open PRs that need review
      fetchPullRequests()
    }
  }, [isOpen])

  const fetchPullRequests = async () => {
    setIsLoading(true)
    try {
      // Fetch PRs that need review
      const response = await fetch('/api/github/review-requests')
      const data = await response.json()
      setPullRequests(data)
    } catch (error) {
      console.error('Failed to fetch PRs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredPRs = pullRequests.filter(pr => 
    pr.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pr.repository.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-[#0C0C0C] border-[#2D2D2D] text-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold flex items-center gap-2">
            <GitPullRequest className="h-5 w-5" />
            Review Requests
          </DialogTitle>
          <DialogDescription className="text-[#888888]">
            Pull requests waiting for your review
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
              No pull requests need your review
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
                      {pr.repository.name} #{pr.number}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => window.open(pr.html_url, '_blank')}
                    className="bg-[#9467FF] hover:bg-[#7C4DFF] text-white"
                  >
                    Review
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
} 