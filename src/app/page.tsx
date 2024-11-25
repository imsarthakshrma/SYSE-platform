'use client';

import { useEffect } from 'react';
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardCards } from "@/components/dashboard/cards";
import { ProductivityChart } from "@/components/dashboard/productivity-chart";
import { Urgents } from "@/components/dashboard/urgents";
import { usePageTitle } from "@/contexts/page-title-context";
import { getData } from "@/app/actions";

export default function WorkspaceOverview() {
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle("Dashboard");
  }, [setTitle]);

  return (
    <div className="container space-y-8 p-8">
      <DashboardHeader />
      
      <div className="space-y-8">
        <DashboardCards />
        
        <div className="flex gap-8">
          <ProductivityChart />
          <Urgents />
        </div>
      </div>
    </div>
  );
}
