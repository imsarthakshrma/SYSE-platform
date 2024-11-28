'use client'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

interface LinkGitHubDialogProps {
  isOpen: boolean
  onClose: () => void
  onContinue: () => void
}

export function LinkGitHubDialog({ isOpen, onClose, onContinue }: LinkGitHubDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[474px] bg-[#0C0C0C] border-[#2D2D2D] text-white p-6">
        <DialogHeader className="space-y-2">
          <div className="mx-auto bg-[#1F1F1F] p-3.5 rounded-full w-fit border border-[#2D2D2D]">
            <Github className="h-7 w-7 text-[#DEDEDE]" aria-label="GitHub Icon" />
          </div>
          <div className="space-y-1.5">
            <DialogTitle className="text-xs font-medium text-center text-[#9467FF] uppercase tracking-wider">
              GitHub Integration
            </DialogTitle>
            <DialogTitle className="text-lg font-semibold text-center text-white">
              Connect Your GitHub to Kroskod
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm text-[#888888] text-center leading-normal">
            By connecting your GitHub account, we can access your repositories, pull requests, and issues to seamlessly enhance your Kroskod experience. You'll be redirected to GitHub to authorize this integration.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 sm:space-x-3">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="w-full sm:w-auto border-[#2D2D2D] text-gray-300 hover:bg-[#2D2D2D] hover:text-white transition-colors"
            aria-label="Cancel GitHub Connection"
          >
            Cancel
          </Button>
          <Button 
            onClick={onContinue}
            className="w-full sm:w-auto bg-[#6018B9]/70 hover:bg-[#855ABB]/85 text-white transition-colors"
            aria-label="Continue with GitHub"
          >
            Continue with GitHub
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
