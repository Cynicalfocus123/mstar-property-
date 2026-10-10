# Architecture

## Development-only samples — R03 — 2026-10-10

localDemoEnabled now requires NODE_ENV exactly development plus the existing explicit flag/local DB checks, a strictly loopback Host and loopback HTTP(S) SITE_URL. listingSearch and searchMetadata enforce the guard again so internal demo=true cannot bypass production. Public routes/API use the same server-only policy; no client query parameter can enable samples. Production selects genuine inventory and metadata. A configured public SITE_URL is denied even in development. No data projection, price/location privacy or SQL filter semantics is weakened.

This owner-requested correction is R03, linked to F08/B06; it does not start Step 4. All nine maintained Markdown and the same six-tab root tracker are updated. Approved handoff Markdown/HTML and historical files remain immutable and hash-verified. Tracker totals are 83 permanent IDs: 16 Done, 16 Pending, 51 Not started; prior IDs/history/statuses are preserved. Git/live starts from 80 matching files; intended source/config/docs/tracker are compared, safely mirrored and hash-verified at finalization, then committed/pushed. Secrets, runtime state, dependencies and caches are excluded. Final report supplies the exact commit. Ports 3000/5432 are stopped after tests; admin remains absent. Older dated records below are historical and do not override this correction.


## Current Step 3 — 2026-10-09

New listing-search.ts is server-only and executes bounded, parameterized Drizzle SQL. Results-page renders shared route data; search-results manages accessible filter drafts and applies shared validated URL state through Next navigation. listing-card handles local device saves and photo gestures. search-state provides the common parser/serializer for homepage, results and API. The listings API returns generic 400/503 errors and private, no-store responses.

Metadata is limited to active definitions/options in the selected genuine/demo partition. Single/multi/number/boolean filters and property scope are validated before SQL; metadata never becomes executable SQL. Price predicates, sorting and histogram exclude gated values. Hidden exact addresses/coordinates, agent contacts and hotel revenue are omitted from DTOs; bbox filtering excludes hidden exact positions. Queries return up to six homes per cumulative page, bounded to 50 pages/300 homes; media is capped at five per listing. Demo requires MSTAR_DEMO_MODE=1 plus trusted localhost Host and a named local database. Saved-page/auth and real forms remain later stages.

Step 3 is complete for F08–F13, B05–B07 and R02 only. R02 records contact-dialog autofocus and swipe/keyboard regression fixes linked to F01/F08. The overall project and the independent Step 0/1 blockers remain Pending. Stop before Step 4.

Final validation: production build and TypeScript passed; 36/36 real Chromium browser tests passed in Thai/English at 390, 768, 1024 and 1440px; 12/12 real application/PostgreSQL search groups and 12/12 isolated PostgreSQL regression groups passed. Backup, all three migration apply/rerun, repeatable seed, joins, constraints, indexes, permissions and actual dump/rollback/restore were tested. Frontend, listings API and health returned HTTP 200 with the database ready. After stopping PostgreSQL, health and listings returned HTTP 503 without database details. Ports 3000 and 5432 are stopped after testing. Admin and real enquiry submission do not exist.

All nine maintained Markdown files are updated: AGENTS.md, README.md, design.md, architecture.md, database.md, testing.md, progress.md, MSTAR-CODEX-RULES.md and CLAUDE.md. Approved codex-handoff Markdown/HTML and historical sources remain immutable; their baseline hashes are verified instead. The same root workbook retains all prior IDs/history and adds R02: 82 IDs, 15 Done, 16 Pending, 51 Not started. All six views are regenerated and checked; Pending is yellow, Done light green and Not started red. The 59-file Git/live baseline is compared before copying intended source/config/docs/tracker, excluding secrets, dependencies, cluster, backups and caches. Final matching hashes and commit/push to origin/main are checked at closeout; the final report supplies the exact commit. If a final gate fails, affected tasks must revert to Pending.

Verified during testing, now stopped: http://127.0.0.1:3000/en/buy, http://127.0.0.1:3000/th/buy, /en/rent, /en/invest, /api/listings?route=buy&lang=en and /api/health on the same host/port. No admin URL. Existing owner choices remain unchanged. Older dated sections below are historical and do not override this section.


## Claude project handoff — 2026-10-09

Read [CLAUDE.md](CLAUDE.md) for the consolidated current project briefing: actual Git/live paths, approved V3/V5 references, implemented source, Step 2 proof, unimplemented Step 3, owner decisions, database/security contracts, server policy, tracker and completion gates. The owner requested this document so Claude can read and help Codex. This documentation-only task does not change application code, UI, migrations, seed or owner choices. Older dated sections below remain historical; this briefing identifies their current replacements. R01 receives an append-only tracker history entry, with all 81 IDs and statuses retained. Only documentation/workbook/mirror checks apply; no new app/browser/database test or working localhost claim is made. Ports 3000 and 5432 were found stopped during inspection; no admin exists. Approved handoff and historical files remain unchanged. Git/live synchronization and commit/push are verified at finalization.

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
