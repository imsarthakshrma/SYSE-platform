import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Inbox',
  description: 'Inbox page',
}

export default function InboxLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 