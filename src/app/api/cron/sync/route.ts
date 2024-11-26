import { NextResponse } from 'next/server';
import { syncRepositoryMetrics, syncProductivityMetrics } from '@/lib/services/github-sync';

export async function GET(req: Request) {
  try {
    await Promise.all([
      syncRepositoryMetrics(),
      syncProductivityMetrics(),
    ]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Sync failed:', error);
    return NextResponse.json({ error: 'Sync failed' }, { status: 500 });
  }
} 