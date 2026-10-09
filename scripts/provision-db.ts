import { readFile, writeFile, access } from 'node:fs/promises';
import { randomBytes } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import postgres from 'postgres';

// Local development bootstrap only. Preserve all existing configuration.
try { await access('.env.local'); throw new Error('Existing .env.local preserved; provision roles manually.'); }
catch (error) { if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error; }
const adminPassword = (await readFile('.local/postgres-password', 'utf8')).trim();
const admin = postgres({ host: '127.0.0.1', port: 5432, database: 'postgres', username: 'postgres', password: adminPassword, max: 1, onnotice: () => {} });
const ownerPassword = randomBytes(32).toString('hex');
const appPassword = randomBytes(32).toString('hex');
const connection = (user: string, password: string, database: string) => `postgresql://${user}:${encodeURIComponent(password)}@127.0.0.1:5432/${database}`;
try {
  const existing = await admin`select rolname from pg_roles where rolname in ('mstar_owner','mstar_app')`;
  if (existing.length) throw new Error('Existing Mstar roles preserved; provision manually.');
  await admin.unsafe(`CREATE ROLE mstar_owner LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE PASSWORD '${ownerPassword}'`);
  await admin.unsafe(`CREATE ROLE mstar_app LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE PASSWORD '${appPassword}'`);
  for (const name of ['mstar_property_dev', 'mstar_property_step2_test']) {
    await admin.unsafe(`CREATE DATABASE ${name} OWNER mstar_owner`);
    await admin.unsafe(`REVOKE ALL ON DATABASE ${name} FROM PUBLIC`);
    await admin.unsafe(`GRANT CONNECT ON DATABASE ${name} TO mstar_app`);
    const db = postgres(connection('postgres', adminPassword, name), { max: 1, onnotice: () => {} });
    try {
      await db`REVOKE CREATE ON SCHEMA public FROM PUBLIC`;
      await db`GRANT USAGE ON SCHEMA public TO mstar_app`;
      await db`ALTER DEFAULT PRIVILEGES FOR ROLE mstar_owner IN SCHEMA public GRANT SELECT ON TABLES TO mstar_app`;
    } finally { await db.end(); }
  }
  const secrets = [
    `DATABASE_URL=${connection('mstar_app', appPassword, 'mstar_property_dev')}`,
    `DATABASE_MIGRATION_URL=${connection('mstar_owner', ownerPassword, 'mstar_property_dev')}`,
    `DATABASE_TEST_URL=${connection('mstar_owner', ownerPassword, 'mstar_property_step2_test')}`,
    `DATABASE_TEST_APP_URL=${connection('mstar_app', appPassword, 'mstar_property_step2_test')}`,
    'SITE_URL=http://127.0.0.1:3000', '',
  ].join('\n');
  await writeFile('.local/database.env', secrets, { mode: 0o600, flag: 'wx' });
  // Keep only the read-only runtime connection in Next's automatically loaded file.
  await writeFile('.env.local', secrets.split('\n')[0] + '\nSITE_URL=http://127.0.0.1:3000\n', { mode: 0o600, flag: 'wx' });
  if (process.platform === 'win32') {
    const identity = execFileSync('whoami.exe', { encoding: 'utf8', windowsHide: true }).trim();
    execFileSync('icacls.exe', ['.env.local', '/inheritance:r', '/grant:r', `${identity}:F`, 'SYSTEM:F'], { windowsHide: true, stdio: 'pipe' });
  }
  console.log('Provisioned development/test databases; read-only app role. Credentials written to ignored local files.');
} finally { await admin.end(); }
