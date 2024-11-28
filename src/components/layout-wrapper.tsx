'use client'

import { Sidebar } from "@/components/sidebar/index";
import { Providers } from "@/components/providers/providers";
import { cn } from "@/lib/utils";

export function LayoutWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <body className={className}>
      <Providers>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto min-w-[800px] p-4 mt-12 flex flex-col gap-8">
              {children}
            </div>
          </main>
        </div>
      </Providers>
    </body>
  );
} 