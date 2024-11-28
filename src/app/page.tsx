'use client';

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { getGitHubData } from "./actions"
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardCards } from "@/components/dashboard/cards";
import { usePageTitle } from "@/contexts/page-title-context";
import { Loader2 } from "lucide-react"

type GitHubData = {
  repositories: any[]
  pullRequests: any[]
  issues: any[]
} | null

export default function WorkspaceOverview() {
  const { data: session } = useSession()
  const [githubData, setGithubData] = useState<GitHubData>(null)
  const { setTitle } = usePageTitle();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTitle("Dashboard");
  }, [setTitle]);

  useEffect(() => {
    if (session?.accessToken) {
      setIsLoading(true);
      getGitHubData(session)
        .then(setGithubData)
        .finally(() => setIsLoading(false));
    }
  }, [session]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
        <div className="relative">
          <div className="absolute -inset-2 rounded-lg bg-[#9467FF] opacity-20 blur-lg"></div>
          <div className="relative bg-[#0C0C0C] rounded-lg border border-[#2D2D2D] p-8">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-[#1F1F1F] rounded-lg">
                <Loader2 className="h-6 w-6 animate-spin text-[#9467FF]" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-white">
                  Syncing with GitHub
                </h3>
                <p className="text-sm text-[#888888]">
                  Fetching your latest development activity...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container space-y-8 p-8">
      <DashboardHeader />
      <DashboardCards />
    </div>
  );
}
