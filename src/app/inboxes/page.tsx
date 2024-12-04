'use client'

import { Card, CardContent } from "@/components/ui/card"

export default function InboxPage() {
  return (
    <div className="container py-8">
      <div className="grid gap-4">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Inbox</h2>
            {/* Add your inbox content here */}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 