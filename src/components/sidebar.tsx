import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessagesSquare,
  FolderGit2,
  Inbox,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserDropdown } from "@/components/user-dropdown";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12 flex flex-col h-screen", className)}>
      <div className="space-y-4 py-4 flex-1">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Overview
          </h2>
          <div className="space-y-1">
            <Link href="/">
              <Button variant="ghost" className="w-full justify-start">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/repo-vault">
              <Button variant="ghost" className="w-full justify-start">
                <FolderGit2 className="mr-2 h-4 w-4" />
                RepoSpace
              </Button>
            </Link>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Communication
          </h2>
          <div className="space-y-1">
            <Link href="/messages">
              <Button variant="ghost" className="w-full justify-start">
                <MessagesSquare className="mr-2 h-4 w-4" />
                Messages
              </Button>
            </Link>
            <Link href="/inboxes">
              <Button variant="ghost" className="w-full justify-start">
                <Inbox className="mr-2 h-4 w-4" />
                Inboxes
              </Button>
            </Link>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Resources
          </h2>
          <div className="space-y-1">
            <Link href="/documentation">
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Documentation
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-auto px-3">
        <UserDropdown email="m@example.com" />
      </div>
    </div>
  );
} 