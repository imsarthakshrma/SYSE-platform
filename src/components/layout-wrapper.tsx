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
            {children}
          </main>
        </div>
      </Providers>
    </body>
  );
} 