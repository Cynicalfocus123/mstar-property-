import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testIgnore: process.env.MSTAR_STEP3B_FIXTURES==='1'?[]:['**/step3b-fixtures.spec.ts'],
  fullyParallel: true,
  workers: 2,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: 'http://127.0.0.1:3000', trace: 'retain-on-failure' },
  // Use an already running app. The owner controls opening localhost;
  // tests must never start a server automatically.
  projects: [390, 768, 1024, 1280, 1440, 1600].map(width => ({ name: `${width}px`, use: { viewport: { width, height: 900 }, browserName: 'chromium' as const, hasTouch: width === 390, isMobile: width === 390 } })),
});
