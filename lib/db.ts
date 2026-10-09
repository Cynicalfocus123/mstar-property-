import 'server-only';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { sql } from 'drizzle-orm';

export async function databaseHealth(): Promise<'ok' | 'unavailable' | 'not_configured'> {
  const url = process.env.DATABASE_URL;
  if (!url) return 'not_configured';
  const client = postgres(url, { max: 1, connect_timeout: 2, idle_timeout: 2 });
  try {
    await drizzle(client).execute(sql`select 1`);
    return 'ok';
  } catch {
    return 'unavailable';
  } finally {
    await client.end({ timeout: 1 });
  }
}
