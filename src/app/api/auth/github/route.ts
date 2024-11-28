import { redirect } from 'next/navigation'

export async function GET() {
  const clientId = process.env.GITHUB_CLIENT_ID
  const redirectUri = `${process.env.NEXTAUTH_URL}/api/auth/callback/github`

  const params = new URLSearchParams({
    client_id: clientId!,
    redirect_uri: redirectUri,
    scope: 'read:user user:email repo',
  })

  redirect(`https://github.com/login/oauth/authorize?${params.toString()}`)
} 