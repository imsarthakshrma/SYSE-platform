import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { PageTitleProvider } from "@/contexts/page-title-context";
import { Sidebar } from "@/components/sidebar/index";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kroskod - Developer Collaboration and Management Platform",
  description: "Modern developer collaboration platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        inter.className,
        "min-h-screen antialiased bg-[#0A0A0A]"
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="devroom-theme"
        >
          <PageTitleProvider>
            <div className="flex min-h-screen">
              <Sidebar />
              <main className="flex-1 overflow-auto">
                <div className="container mx-auto min-w-[800px]">
                  {children}
                </div>
              </main>
            </div>
          </PageTitleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
