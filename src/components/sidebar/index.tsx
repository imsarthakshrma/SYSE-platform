"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  LayoutDashboard,
  History,
  Star,
  Settings,
  Box,
  FileText,
  Wrench,
  ChevronDown,
  Plus,
  Building2,
  ChevronUp,
  LogOut,
  Bell,
  Github
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LinkGitHubDialog } from "@/components/github/link-dialog";
import { signInWithGitHub } from "@/app/actions";
import { useSession, signOut } from "next-auth/react"
import { Session } from "next-auth"

type GitHubProfile = {
  login: string;
  avatar_url: string;
  name: string;
} | null;

const teams = [
  { name: 'Acme Inc', id: '1' },
  { name: 'Acme Corp.', id: '2' },
  { name: 'Evil Corp.', id: '3' },
];

const navigation = [
  {
    name: 'Overview',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    name: 'RepoSpace',
    href: '/repo-vault',
    icon: Box,
  },
  {
    name: 'Project Tasks',
    icon: Wrench,
    children: [
      { name: 'Project Analytics', href: '/project-tasks/analytics' },
      { name: 'Issues', href: '/project-tasks/issues' },
      { name: 'Milestones', href: '/project-tasks/milestones' },
    ]
  },
  {
    name: 'Inboxes',
    href: '/inboxes',
    icon: FileText,
  },
  {
    name: 'Messages',
    href: '/messages',
    icon: Bell,
  },
  {
    name: 'Documentation',
    href: '/documentation',
    icon: FileText,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [openSection, setOpenSection] = React.useState<string | null>("Project Tasks");
  const [isGitHubDialogOpen, setIsGitHubDialogOpen] = React.useState(false);
  const { data: session } = useSession()
  const [isGitHubLinked, setIsGitHubLinked] = React.useState(false)
  const [githubProfile, setGithubProfile] = React.useState<GitHubProfile>(null);

  React.useEffect(() => {
    setIsGitHubLinked(!!session?.accessToken)
  }, [session])

  React.useEffect(() => {
    if (session?.accessToken) {
      fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
        .then(res => res.json())
        .then(setGithubProfile)
        .catch(console.error);
    }
  }, [session]);

  const isProjectTasksPath = React.useMemo(() => {
    return pathname.startsWith('/project-tasks');
  }, [pathname]);

  React.useEffect(() => {
    if (isProjectTasksPath) {
      setOpenSection("Project Tasks");
    }
  }, [isProjectTasksPath]);

  const handleGitHubAuth = async () => {
    try {
      const success = await signInWithGitHub();
      if (success) {
        setIsGitHubLinked(true);
      }
    } catch (error) {
      console.error('GitHub authentication failed:', error);
    } finally {
      setIsGitHubDialogOpen(false);
    }
  };

  const handleSignOut = async () => {
    await signOut()
    setIsGitHubLinked(false)
  }

  const handleGitHubClick = () => {
    if (isGitHubLinked) {
      return;
    }
    
    setIsGitHubDialogOpen(true);
  };

  return (
    <div className="flex h-screen w-64 flex-col bg-[#0A0A0A] text-white border-r border-[#1F1F1F]">
      {/* Organization Selector */}
      <div className="p-4 border-b border-[#1F1F1F]">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-between text-white hover:bg-[#1F1F1F]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center">
                  <Building2 className="h-4 w-4" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">GRANULAR.LLC</span>
                  <span className="text-xs text-gray-400">Enterprise</span>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80" align="start">
            <DropdownMenuLabel>Teams</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {teams.map((team) => (
              <DropdownMenuItem key={team.id} className="flex items-center gap-2">
                <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center">
                  <Building2 className="h-3 w-3" />
                </div>
                <span>{team.name}</span>
                <span className="ml-auto text-xs text-muted-foreground">⌘{team.id}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Plus className="mr-2 h-4 w-4" />
              Add team
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {navigation.map((item) => (
            <div key={item.name}>
              {!item.children ? (
                <Link href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-white hover:bg-[#1F1F1F]",
                      pathname === item.href && "bg-[#1F1F1F] text-[#9467FF]"
                    )}
                  >
                    <item.icon 
                      className={cn(
                        "mr-2 h-4 w-4",
                        pathname === item.href && "text-[#9467FF]"
                      )}
                    />
                    {item.name}
                  </Button>
                </Link>
              ) : (
                <Collapsible
                  open={openSection === item.name}
                  onOpenChange={() => 
                    setOpenSection(openSection === item.name ? null : item.name)
                  }
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-between text-white hover:bg-[#1F1F1F] group",
                        isProjectTasksPath && "text-[#9467FF]"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <item.icon className={cn(
                          "h-4 w-4",
                          isProjectTasksPath && "text-[#9467FF]"
                        )} />
                        <span>{item.name}</span>
                      </span>
                      <ChevronDown 
                        className={cn(
                          "h-4 w-4 opacity-50 transition-transform duration-200",
                          "transform group-data-[state=open]:rotate-180",
                          isProjectTasksPath && "text-[#9467FF]"
                        )}
                      />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1">
                    {item.children.map((child) => (
                      <Link key={child.name} href={child.href}>
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-start pl-8 text-[#DEDEDE] hover:bg-[#1F1F1F] font-normal",
                            pathname === child.href && "bg-[#1F1F1F]"
                          )}
                        >
                          {child.name}
                        </Button>
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto border-t border-[#1F1F1F]">
        <div className="p-2 py-4">
          {/* Link GitHub Status Button */}
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-between px-3.5 py-2 hover:bg-[#1F1F1F] hover:text-white mb-1 group"
            onClick={handleGitHubClick}
            title={isGitHubLinked ? "GitHub Connected" : "Connect GitHub"}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-1 rounded transition-colors",
                isGitHubLinked 
                  ? "bg-[#1A4726] group-hover:bg-[#206F33]" 
                  : "bg-[#1F1F1F] group-hover:bg-[#2D2D2D]"
              )}>
                <Github className={cn(
                  "h-4 w-4 transition-colors",
                  isGitHubLinked 
                    ? "text-[#4ADE80] group-hover:text-[#4ADE80]" 
                    : "text-[#9467FF] group-hover:text-white"
                )} />
              </div>
              <span className={cn(
                "text-md font-bold transition-colors",
                isGitHubLinked 
                  ? "text-[#4ADE80] group-hover:text-[#4ADE80]" 
                  : "text-[#DEDEDE] group-hover:text-white"
              )}>
                {isGitHubLinked 
                  ? `Linked as ${githubProfile?.login}` 
                  : 'Link GitHub'}
              </span>
            </div>
          </Button>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full flex items-center justify-between px-4 py-2 hover:bg-[#1F1F1F] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-6 w-6 border border-[#2D2D2D]">
                    <AvatarImage src="/avatar.png" />
                    <AvatarFallback className="bg-[#1F1F1F] text-[#9467FF]">V</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start -space-y-0.5">
                    <span className="text-sm font-medium text-[#DEDEDE] group-hover:text-white">Sarthak</span>
                    <span className="text-[11px] text-[#4D4D4D]">sarthak@kroskod.com</span>
                  </div>
                </div>
                <ChevronUp className="h-4 w-4 text-[#4D4D4D] group-hover:text-white transition-colors" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-56 bg-[#1F1F1F] border-[#2D2D2D] text-[#DEDEDE]" 
              align="end"
              side="top"
            >
              <DropdownMenuItem className="hover:bg-[#2D2D2D] hover:text-white focus:bg-[#2D2D2D] focus:text-white">
                <Star className="mr-2 h-4 w-4" />
                <span>Upgrade to Pro</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#2D2D2D] hover:text-white focus:bg-[#2D2D2D] focus:text-white">
                <Settings className="mr-2 h-4 w-4" />
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#2D2D2D] hover:text-white focus:bg-[#2D2D2D] focus:text-white">
                <FileText className="mr-2 h-4 w-4" />
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#2D2D2D] hover:text-white focus:bg-[#2D2D2D] focus:text-white">
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#2D2D2D]" />
              <DropdownMenuItem className="hover:bg-[#2D2D2D] hover:text-white focus:bg-[#2D2D2D] focus:text-white">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Only render dialog if not linked */}
      {!isGitHubLinked && (
        <LinkGitHubDialog 
          isOpen={isGitHubDialogOpen}
          onClose={() => setIsGitHubDialogOpen(false)}
          onContinue={handleGitHubAuth}
        />
      )}
    </div>
  );
} 