"use client";

import { Search } from "lucide-react";
import { Bell } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBar() {
  return (
    <div className="border-b border-[#1F1F1F] bg-[#0A0A0A] w-full">
      <div className="flex items-center justify-between h-14 px-6 max-w-full">
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search here..." 
              className="pl-10 bg-[#1F1F1F] border-[#2D2D2D] text-[#DEDEDE]"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-[#2D2D2D] rounded-full">
            <Bell className="h-5 w-5 text-[#DEDEDE]" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
          </button>
        </div>
      </div>
    </div>
  );
}