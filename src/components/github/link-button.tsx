'use client'

import { useState } from "react"
import { LinkGitHubDialog } from "./link-dialog"
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
        className="w-full flex items-center gap-3 px-4 text-[#DEDEDE] hover:bg-[#1F1F1F] hover:text-white"
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