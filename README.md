# Mstar Property

Next.js App Router and TypeScript foundation following Claude's approved V3 wireframe and BUILD-SPEC. Read AGENTS.md before each task.

## Current state — 2026-10-09

Step 0 preparation is recorded. Step 1 implements design tokens, self-hosted Prompt/Noto Sans Thai fonts, sticky 64px header, temporary approved crest, bilingual navigation, phone tabs, footer, reusable controls, language/currency preferences and PostgreSQL-aware health. Future navigation destinations show explicit preparation messages. Listings, functional filters, saved storage, authentication and admin are not implemented. No Step 2 work has started.

Overall status remains Pending. Production build and TypeScript pass. Before localhost closure, 12 of 16 Playwright tests passed; four preference/search flows failed. Their origin-validation fix and a phone search-container fix compile but need browser retesting. PostgreSQL remains unconfigured. See testing.md.

## Paths and commands

- Git root: `D:/mstar companies/mstar property/mstar property new site`.
- Origin: `https://github.com/Cynicalfocus123/mstar-property-.git`, branch `main`.
- Local mirror: `live/` inside this root. This is not a production deployment.
- Canonical tracker: root `Mstar-Property-Task-Tracker.xlsx`.
- Immutable handoff and historical prototypes remain unchanged.

Existing Node.js 24.19.0/npm 11.17.0 run the project. Use `npm ci`, `npm run build`, and `npm run typecheck`. Exact dependencies are locked in package-lock.json. Actual secrets stay outside Git/live synchronization; .env.example lists optional settings.

## Local links — currently closed

The owner requested port 3000 closed. Do not start a server, preview or test-managed server until explicitly asked to open localhost.

- Thai frontend: `http://127.0.0.1:3000/th`.
- English frontend: `http://127.0.0.1:3000/en`.
- Health API: `http://127.0.0.1:3000/api/health`.
- Admin: absent; no admin URL.

Only after an opening instruction, run `npm run dev` or `npm run build` followed by `npm run start`. `npm test` uses an already running app and never starts a server. This machine's browser cache is `D:/dev/playwright`; set PLAYWRIGHT_BROWSERS_PATH accordingly.

Before closure, health returned HTTP 200 with `database: "not_configured"` and `ready: false`. Configured PostgreSQL uses a real Drizzle probe; failure returns HTTP 503. No schema, migrations, seed or submission persistence is implemented in Step 1.
