import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Repo Vault',
  description: 'Repository management page',
}

export default async function RepoVault() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div>
        {/* Your component content */}
      </div>
    </main>
  )
} 