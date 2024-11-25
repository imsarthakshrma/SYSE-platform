 'use client'

import { Metadata } from 'next'
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: 'Inbox',
  description: 'Inbox page',
}

export default function Inbox() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <Card className="w-[350px]">
        <CardContent className="pt-6 text-center text-muted-foreground">
          This feature will be available soon
        </CardContent>
      </Card>
    </main>
  )
} 