# Architecture

## Current Step 3C — F39 — 2026-10-10

The shared client helper reads CSS tokens, uses RAF for rails and Web Animations for photos/dialogs, and cleans up cancelled frames, animations and media listeners. moveRail/cancelRailMotion/settleRail are the reusable rail boundary. Only the previous and current listing photos mount during movement. Modal presence retains content through exit, makes closing content inert, restores focus and compensates the scrollbar gap before locking background scroll. No library, API route or schema is added.

The owner supplied revised BUILD-SPEC Motion and V5 guidance before this task. Approved handoff Markdown/HTML, historical references and applied migrations are preserved byte-for-byte against the current input hashes; they are immutable exceptions to maintained-document updates. The prior R05 commit 44f405a and its workbook history are preserved. The real Git root is D:/mstar companies/mstar property/mstar property new site; live/ is its local deployable mirror, not a deployed website. All 91 baseline live files are compared before synchronizing intended code/configuration, these nine documents and the same canonical workbook; secrets, runtime state, dependencies and caches are excluded. Final matching hashes and safe origin/main commit/push are verified at closeout; the exact hash is in the final report. Older dated sections below are historical.


Final verification: 36/36 motion browser checks and 91 existing development regression checks passed; five redundant boundary runs were intentionally skipped. Twelve production browser checks passed with samples hidden despite MSTAR_DEMO_MODE=1. Real application/PostgreSQL checks passed: 12 search groups, five development sample groups and six production sample groups. Production build and TypeScript passed. Both languages and 390/768/1024/1280/1440/1600px were covered; screenshots were visually reviewed on phone and desktop. An exit test originally checked after a protocol delay longer than the sheet animation; first-frame browser inspection now verifies inert retained content, duration and eventual removal deterministically. Admin and real enquiry submission remain absent.

The same six-tab workbook retains 86 permanent IDs and all prior history. Only F39 moves from Not started to Done: 21 Done, 23 Pending, 42 Not started. Frontend/Backend/Emails open views are 31/26/8; Done/Pending/Not started contain every ID exactly once. Yellow Pending, light-green Done, red Not started, visible borders, gridlines, formulas, tables, dates, validation and frozen headers are preserved. No separate fix ID duplicates this implementation task. All nine maintained documents are updated. The 94 intended source/config/document/tracker Git/live SHA-256 pairs and origin/main push are verified at final closeout. Unrelated project blockers remain Pending.

Verified HTTP 200 during actual testing: http://127.0.0.1:3000/en, /th, /en/buy, /th/buy, /en/rent, /en/invest, /api/listings?route=buy&lang=en and /api/health (database ready). Test servers on ports 3000 and 5432 are stopped afterward; these links are not currently running. No admin URL exists. Preview remains owner-controlled; an explicitly authorized preview uses the existing local-postgres.ps1 start command and npm run dev. No deployment or migration is performed.

## Tracker status and grid correction — R05 — 2026-10-10

Existing source provides partial contact-dialog, hero/search, device-save and bounding-box behavior. Their broader tasks retain unfinished portions as Pending. No runtime component, dependency, route or configuration is changed by this correction.

The owner requested a truthful completion audit and visible spreadsheet grid. R05 records this workbook/document correction only. Done means the entire stated task scope is completed with relevant evidence and applicable closeout gates. Pending means work has started but a named deliverable remains, or a real decision/asset/blocker awaits action. Not started means implementation of that task has not begun; an unrequested future stage or a nonexistent wireframe draft is not an approval blocker. Completed decisions do not inherit unrelated future implementation gates.

The same root workbook preserves all 84 existing IDs and their exact prior history text. It adds R05 for this correction and F39 for the newly supplied, unstarted Step 3C motion scope: 86 IDs, 20 Done, 23 Pending and 43 Not started. Frontend/Backend/Emails contain synchronized open views of 32/26/8 records. F02 and B29 are Done owner decisions. F32/F34 are Not started because no draft exists. F21/F22/F23/F31 and B08/B11/B15/B20/B22/B31 move to Pending because they have partial implementation and specific remaining work. B28 stays Pending for the missing exchange-rate source/conversion. F01/F04/F05/F06/F07 and R01 retain their independent closeout blockers. F25 remains Pending for regional tiles.

Current evidence and next actions are refreshed. The history header and prefix explicitly identify earlier states as dated history; old text is retained rather than represented as today's status. Thin visible borders separate every task cell, including coloured rows, and worksheet gridlines are enabled on all six sheets. Yellow Pending, light-green Done and red Not started remain. Existing formulas, table names, filters, date columns and frozen headers are preserved; status validation covers all task rows.

Application code, UI, database schema, migrations and seed are unchanged. No new application, browser or PostgreSQL suite is run for this workbook-only edit. Existing externally started listeners on 3000/5432 were found running and left alone; read-only frontend /en and /api/health requests returned HTTP 200, with health database ok/ready true. These checks establish current availability only, not new feature tests. Admin and real enquiry submission remain absent. This task opens no server and authorizes no Step 3C/4 implementation, deployment or migration.

Before editing, 88 source/live pairs matched; owner-revised BUILD-SPEC and V5 guide differed from live, and next-env.d.ts was already modified. Those three files are preserved and excluded from this correction's commit/synchronization. Only the workbook and nine maintained documents are synchronized after baseline checks. Final export validation, visual review, intended-file SHA-256 pairs and safe commit/origin/main push are checked at closeout; the exact commit is in the final report. Earlier dated sections below remain historical.


## Current Step 3B — R04 — 2026-10-10

lib/home-rows-config.ts holds bilingual topic titles and validated query strings; lib/home-listings.ts is server-only and selects genuine or explicitly guarded fictional configuration. It calls the existing parameterized listingSearch with an internal featuredFirst option. HomeListingRows provides native horizontal rails and accessible controls; SmallListingCard renders the distinct home layout. lib/saved-homes.ts shares the existing 500-ID localStorage contract between both cards; lib/listing-format.ts shares whole land units and price formatting.

Search keeps 12 homes per cumulative page, bounded by the existing 50-page parser (600 homes maximum). A lateral station query pairs nearest distance and line deterministically across actual station types; the separate BTS minimum still controls Nearest BTS sorting. Public-price predicates, histograms, hidden exact location and demo guards are unchanged. Homepage errors use the existing generic unavailable copy, and empty rows render nothing. No schema, dependency, map or public home API is added.

Verification: 91 development checks covered (66 existing plus 25 new/boundary checks), 18 real-DB fixture browser checks, 12 production browser checks, eight Step 3B DB groups, 12 search groups, five development/six production sample groups, build and TypeScript passed. See testing.md for initial test-harness failures and final evidence.

Step 3B is the only scope completed here. R04 records this owner change and updates F08/F09/F10/B06 without duplicating their IDs. F25 moves to Pending: home topic rows are implemented, but its regional tiles remain Step 7. The overall project and prior Step 0/1 blockers remain Pending. Stop before Step 4; no map, property detail, enquiry submission, account or admin is added.

All nine maintained documents are updated. The owner supplied revised BUILD-SPEC, V5 guide, home-page.html, wireframe.html and wireframe-v3.html before this task. Their current input hashes are preserved; CODEX-PROMPT, historical sources and applied migrations are also unchanged. The old live references match the preceding committed text, so adopting the owner revisions is an intended update, not overwriting divergent work. The 82-file live baseline is rechecked before copying intended source/config/docs/tracker; final SHA-256 pairs, commit and origin/main push are verified at closeout. Secrets, runtime state, dependencies and caches are excluded. The exact commit is in the final report.

The canonical root workbook retains all 83 prior IDs/history and adds R04: 84 IDs, 17 Done, 17 Pending, 50 Not started. Frontend/Backend/Emails remain synchronized open views (32/27/8); Done/Pending/Not started contain each ID exactly once. Pending stays yellow, Done light green and Not started red. If any final gate fails, R04 and affected changed tasks must be marked Pending.

Verified during actual tests: http://127.0.0.1:3000/en, /th, /en/buy, /th/buy, /en/rent, /en/invest, /api/listings?route=buy&lang=en and /api/health. All returned HTTP 200; health was database-ready. Ports 3000 and 5432 are now stopped. Admin and real form submission do not exist; no admin URL or submission proof is invented. No production deployment or migration is performed. Older dated sections below are historical and do not override this record.

## Historical records before Step 3B


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
