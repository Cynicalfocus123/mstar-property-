import { loadEnvFile } from 'node:process';

for (const file of ['.env.local', '.local/database.env']) {
  try { loadEnvFile(file); } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
  }
}
export function requiredUrl(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Set ${name} in your environment or ignored local configuration.`);
  try {
    const parsed = new URL(value);
    if (!['postgres:', 'postgresql:'].includes(parsed.protocol)) throw new Error('protocol');
  } catch { throw new Error(`${name} must be a valid PostgreSQL URL. URL omitted to protect credentials.`); }
  return value;
}
