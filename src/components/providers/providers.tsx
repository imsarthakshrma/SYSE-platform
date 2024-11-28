'use client'

import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { PageTitleProvider } from "@/contexts/page-title-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        storageKey="devroom-theme"
      >
        <PageTitleProvider>
          {children}
        </PageTitleProvider>
      </ThemeProvider>
    </SessionProvider>
  )
} 