import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: 'http://127.0.0.1:3000', trace: 'retain-on-failure' },
  // Use an already running app. The owner controls opening localhost;
  // tests must never start a server automatically.
  projects: [390, 768, 1024, 1440].map(width => ({ name: `${width}px`, use: { viewport: { width, height: 900 }, browserName: 'chromium' as const } })),
});
