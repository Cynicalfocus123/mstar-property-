# Architecture

## Current implementation — 2026-10-09

One Next.js 16.4.0 App Router application uses React 19.3.0 and TypeScript 7.0.2. Existing system Node.js/npm run the project. Exact dependency versions and lockfile are committed. There is no separate backend service.

app/[lang]/layout.tsx supplies the shell, correct document language and self-hosted fonts. Pages have localized metadata/canonical/hreflang links. Future navigation pages are explicitly unfinished and noindex. proxy.ts uses explicit language cookies, then weighted Accept-Language, then Thai. Explicit routes remain authoritative; query strings survive switching.

POST /api/preferences validates th/en and THB/USD, checks Origin against the request Host including port, and sets year-long HTTP-only SameSite=Lax cookies. HTTPS cookies are Secure. Currency conversion and a rate provider are not implemented.

GET /api/health distinguishes application availability from database readiness. lib/db.ts uses postgres.js and Drizzle ORM 0.45.4 for real select 1 when DATABASE_URL exists, then closes the connection. Missing configuration does not claim readiness. No database schema, migrations, seed or admin UI exists.

Client components provide dialogs, keyboard tabs, phone search sheets, buttons, inputs, chips and skeletons. Dialogs lock background scrolling, explicitly wrap Tab focus and restore focus. No animation library exists. Search currently navigates to preparation pages, without fabricated results.

## Runtime and synchronization

Configured localhost is 127.0.0.1:3000. The owner requested closure during Step 1. Opening requires explicit owner instruction. Tests do not automatically start a server.

The existing workspace is Git root. live/ is an ignored source mirror. Compare baseline hashes before copying source/configuration/docs/tracker. Never mirror secrets, .git, dependencies, caches or build output. Runtime configuration and installation remain separate; matching source does not establish deployment.

## Remaining scope

Four preference/search flows require retesting after compiled origin and phone-containment fixes. PostgreSQL is unconfigured. Step 2, functional search, accounts, saved data and admin remain unstarted. Account/admin UI requires approved separate wireframes.
