"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Star, Settings, Bell, Github } from "lucide-react";
import Link from "next/link";

export function UserDropdown({ email }: { email: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-between items-center px-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
              <span className="text-sm font-medium">V</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">Veydh</span>
              <span className="text-xs text-muted-foreground">{email}</span>
            </div>
          </div>
          <span className="sr-only">Open user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <Link href="/upgrade">
          <DropdownMenuItem>
            <Github className="mr-2 h-4 w-4" />
            Link GitHub
          </DropdownMenuItem>
        </Link>
        <Link href="/upgrade">
          <DropdownMenuItem>
            <Star className="mr-2 h-4 w-4" />
            Upgrade to Pro
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link href="/account">
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
        </Link>
        <Link href="/billing">
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            Billing
          </DropdownMenuItem>
        </Link>
        <Link href="/notifications">
          <DropdownMenuItem>
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 