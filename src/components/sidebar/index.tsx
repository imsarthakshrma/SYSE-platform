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
  Bell
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

  // Check if current path is under Project Tasks
  const isProjectTasksPath = React.useMemo(() => {
    return pathname.startsWith('/project-tasks');
  }, [pathname]);

  // Update openSection when pathname changes
  React.useEffect(() => {
    if (isProjectTasksPath) {
      setOpenSection("Project Tasks");
    }
  }, [isProjectTasksPath]);

  return (
    <div className="flex h-screen w-64 flex-col justify-between bg-[#0A0A0A] text-white border-r border-[#1F1F1F]">
      <div className="flex flex-col">
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
      </div>

      {/* User Profile - Now will stay at bottom */}
      <div className="mt-auto border-t border-[#1F1F1F] p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-between text-white hover:bg-[#1F1F1F] p-2">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src="/avatar.png" />
                  <AvatarFallback>V</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">Veydh</span>
                  <span className="text-xs text-gray-400">m@example.com</span>
                </div>
              </div>
              <ChevronUp className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuItem>
              <Star className="mr-2 h-4 w-4" />
              Upgrade to Pro
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileText className="mr-2 h-4 w-4" />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
} 