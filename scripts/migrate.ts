import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { requiredUrl } from './db-env';

export async function applyMigrations(url: string) {
  const client = postgres(url, { max: 1, onnotice: () => {} });
  try {
    await migrate(drizzle(client), { migrationsFolder: 'db/migrations' });
  } finally { await client.end(); }
}
if (process.argv[1]?.endsWith('migrate.ts')) {
  await applyMigrations(requiredUrl('DATABASE_MIGRATION_URL'));
  console.log('Development migrations applied.');
}
