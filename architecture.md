# Architecture

## Tracker colours — 2026-10-09

The owner requested the recreated Excel before Step 3 implementation. The canonical root workbook now uses yellow Pending (#FFF2CC), light green Done (#C6EFCE), and red Not started (#FF6666), including full task rows, status tabs, and conditional rules. All six sheets, 81 permanent IDs, prior task records/history, formulas, tables, validations, and frozen headers are preserved. Status totals remain 5 Done, 16 Pending, and 60 Not started; R01 receives an append-only formatting history entry.

Workbook export checks and visual review of all six sheets passed. This changes workbook formatting and documentation only; application code, schema, migrations, seed, and approved UI are unchanged. Approved handoff and historical sources remain immutable. Git/live files are compared against the 58-file matching baseline before safe synchronization, then hashes and commit/push are verified during finalization. Step 3 is authorized and remains unimplemented; this Excel delivery does not claim Step 3 completion. Application/browser/PostgreSQL retests are not applicable to this formatting-only delivery and were not rerun. Frontend http://127.0.0.1:3000/en and health http://127.0.0.1:3000/api/health remain stopped, as previously requested; no admin exists.

## Current Step 2 architecture — 2026-10-09

One existing Next.js App Router service on 127.0.0.1:3000 still hosts frontend and API. No separate backend/admin server is introduced. Existing system Node 24.19.0 and npm run the project; package.json now uses ES modules for TypeScript CLI scripts. Drizzle schema is `db/schema.ts`. Generated migration `0000_foundation.sql` defines 18 tables and 19 enums; custom `0001_integrity.sql` adds relational triggers, updated-at handling and a privacy-safe public listing projection. Committed snapshots/journal keep future generation repeatable.

The dependency direction is UI/server route to `lib/db.ts` to schema/PostgreSQL. `lib/db.ts` is fenced by `server-only`, exports a lazy bounded runtime pool and a short-lived health probe. Database URLs are never NEXT_PUBLIC values. The app role is read-only and cannot create objects or access Drizzle's ledger; migration scripts use a separate non-superuser owner. Future authenticated writes require narrow grants and server authorization in their own steps. No customer/admin endpoints expose PII, credentials or raw database errors now.

Typed filter definitions/options/values use safe metadata keys, enums, composite foreign keys, kind checks, scope checks and single-selection enforcement. Definitions contain no SQL expressions. Public listing projection excludes fictional/unpublished inventory, hides gated current/previous prices and exact coordinates/addresses when requested. Public project queries in later steps must also enforce demo/publish/price visibility; no project API is implemented here.

CLI migration and seed scripts share environment loading, URL validation and explicit failure for missing configuration. Seed is restricted to named local development/test databases and never overwrites genuine rows. Real test DB backup/rollback/restore is isolated from the development database. Migrations never run automatically during web requests or app startup.

The test cluster is isolated at `.local/postgres-data`; runtime/tool binaries, credentials, backups, dependencies and build/test caches are excluded from Git/live. Existing UI/design and source references are unchanged. Build/TypeScript, 16 real app tests and 12 PostgreSQL groups pass; servers stop after this task. Older sections below are historical.

## Active V5 guide — 2026-10-09

V5 is the active stage guide. Existing Next.js, routes, dependencies and application source are unchanged. Reuse one listing card and one contact form/action when their stages are authorized. The current preview stays open on port 3000 because the owner explicitly requested viewing. Tests are deferred; no automatic test server is started.

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
