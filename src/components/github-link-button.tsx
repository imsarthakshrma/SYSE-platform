"use client";

import { Button } from "@/components/ui/button";
import { GithubIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export function GitHubLinkButton() {
  const { toast } = useToast();
  const [isLinked, setIsLinked] = useState(false);

  const handleGitHubLink = async () => {
    try {
      // GitHub OAuth URL - replace with your actual GitHub OAuth App credentials
      const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
      const redirectUri = `${window.location.origin}/api/auth/github/callback`;
      const scope = "repo user"; // Permissions we need
      
      const githubUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${redirectUri}&scope=${scope}`;
      
      window.location.href = githubUrl;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to connect to GitHub. Please try again.",
      });
    }
  };

  return (
    <Button
      variant={isLinked ? "secondary" : "default"}
      className="w-full justify-start gap-2"
      onClick={handleGitHubLink}
    >
      <GithubIcon className="h-4 w-4" />
      {isLinked ? "GitHub Connected" : "Link GitHub"}
    </Button>
  );
} 