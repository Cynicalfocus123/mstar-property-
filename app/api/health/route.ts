import { NextResponse } from 'next/server';
import { databaseHealth } from '@/lib/db';

export const dynamic = 'force-dynamic';
export async function GET() {
  const database = await databaseHealth();
  return NextResponse.json({ status: database === 'unavailable' ? 'degraded' : 'ok', service: 'mstar-property', database, ready: database === 'ok' },
    { status: database === 'unavailable' ? 503 : 200, headers: { 'Cache-Control': 'no-store' } });
}
