import 'server-only';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { sql } from 'drizzle-orm';
import * as schema from '@/db/schema';

let client: ReturnType<typeof postgres> | undefined;

export function getDatabase() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is not configured.');
  client ??= postgres(url, { max: 5, connect_timeout: 3, idle_timeout: 20, onnotice: () => {} });
  return drizzle(client, { schema });
}

export async function databaseHealth(): Promise<'ok' | 'unavailable' | 'not_configured'> {
  const url = process.env.DATABASE_URL;
  if (!url) return 'not_configured';
  const client = postgres(url, { max: 1, connect_timeout: 2, idle_timeout: 2 });
  try {
    // A reachable empty database is not application-ready.
    await drizzle(client).execute(sql`select id from public.public_listings limit 0`);
    return 'ok';
  } catch {
    return 'unavailable';
  } finally {
    await client.end({ timeout: 1 });
  }
}
