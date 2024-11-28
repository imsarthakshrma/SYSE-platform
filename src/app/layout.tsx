import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/layout-wrapper";
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
      <LayoutWrapper 
        className={cn(
          inter.className,
          "min-h-screen antialiased bg-[#0A0A0A]"
        )}
      >
        {children}
      </LayoutWrapper>
    </html>
  );
}
