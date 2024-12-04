'use client'

import { useState } from "react"
import { LinkGitHubDialog } from "./LinkGitHubDialog"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import { cn } from "@/lib/utils"

export function GitHubLinkButton() {
  const [isGitHubDialogOpen, setIsGitHubDialogOpen] = useState(false)

  const handleGitHubLink = () => {
    window.location.href = '/api/auth/github'
  }

  return (
    <>
      <Button 
        variant="ghost" 
        onClick={() => setIsGitHubDialogOpen(true)}
        className={cn(
          "w-full justify-start text-[#DEDEDE] hover:bg-[#1F1F1F] hover:text-white",
          "flex items-center gap-2"
        )}
      >
        <Github className="h-4 w-4" />
        <span className="text-sm">Link GitHub</span>
      </Button>

      <LinkGitHubDialog 
        isOpen={isGitHubDialogOpen}
        onClose={() => setIsGitHubDialogOpen(false)}
        onContinue={handleGitHubLink}
      />
    </>
  )
} 