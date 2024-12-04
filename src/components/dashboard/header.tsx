"use client";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ReviewRequestDialog } from "@/components/review-request/dialog";
import { SearchBar } from "@/components/dashboard/search-bar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { usePageTitle } from "@/contexts/page-title-context";

export function DashboardHeader() {
  const { title } = usePageTitle();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      
      <div className="flex items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="w-[240px] justify-start text-left font-normal border-[#2D2D2D] bg-[#1F1F1F] text-[#DEDEDE] hover:bg-[#2D2D2D]"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className="bg-[#1F1F1F] border-[#2D2D2D] text-white"
            />
          </PopoverContent>
        </Popover>
        
        <Button
          onClick={() => setIsDialogOpen(true)}

          className="bg-[#5921DD] hover:bg-[#4517B3] text-white font-medium px-4 py-2"

        >
          Review Requests
        </Button>
      </div>

      <ReviewRequestDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}

        owner="imsarthakshrma"
        repo="kroskod-platform"
      />
    </div>
  );
} 