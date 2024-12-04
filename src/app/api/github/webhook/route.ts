import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { Webhook } from '@octokit/webhooks';
import { prisma } from '@/lib/prisma';

const webhook = new Webhook({
  secret: process.env.GITHUB_WEBHOOK_SECRET!,
});

export async function POST(req: Request) {
  const body = await req.json();
  const headersList = headers();
  const signature = headersList.get('x-hub-signature-256');

  try {
    const verified = await webhook.verify(JSON.stringify(body), signature!);
    if (!verified) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // Handle different webhook events
    switch (body.event) {
      case 'push':
        await handlePushEvent(body);
        break;
      case 'pull_request':
        await handlePullRequestEvent(body);
        break;
      // Add more event handlers as needed
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

async function handlePushEvent(payload: any) {
  // Update repository metrics in database
  await prisma.repository.update({
    where: { id: payload.repository.id.toString() },
    data: {
      // Update relevant metrics
    }
  });
}

async function handlePullRequestEvent(payload: any) {
  // Handle PR events
} 