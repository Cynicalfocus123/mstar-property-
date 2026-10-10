# Mstar Property

## Current Step 3D — R06 — 2026-10-10

Home hero content and search are centred. Both card sizes have fuller bilingual facts; big cards reserve address line 2 for location and the actual nearest station line. Additive migration 0003 adds nullable building floors. No new dependencies, admin or enquiry submission are introduced. Reproduce unit checks with node --import tsx --test tests/listing-format.unit.ts. With the existing dedicated PostgreSQL and app already running, NODE_ENV=development and MSTAR_PG_BIN set, run node --conditions=react-server --import tsx scripts/test-step3d.ts and npm test. Use existing npm run db:migrate / db:seed / db:seed:search commands for development setup. Start the local cluster with scripts/local-postgres.ps1 -Action start -Bin D:/dev/tmp/mstar-step2/runtime/pgsql/bin, then npm run dev only for an authorized preview/test.

The actual Git root is D:/mstar companies/mstar property/mstar property new site; live/ is its local deployable mirror, not a deployed website. The initial 94-file implementation baseline and resumed 100-file mirror baseline were compared before writes. Final synchronization verifies 92 intended code/configuration/document SHA-256 pairs. The owner now explicitly requests exactly one physical Excel workbook: only the regenerated root Mstar-Property-Task-Tracker.xlsx remains. Its live duplicate is removed; the root workbook is separately validated and committed, and future mirror operations must exclude it. This owner instruction supersedes the earlier requirement to copy the tracker into live/. Six concurrent owner revisions (BUILD-SPEC, V5 guide, NEW-CHAT-HANDOFF, home-page.html, wireframe.html and wireframe-v3.html) and generated next-env.d.ts are preserved and excluded from this closeout commit/synchronization. Their existing live counterparts are preserved. The revised references describe future Step 3E; this workbook closeout does not implement or authorize that stage. Implementation inputs were preserved against their Step 3D baseline; subsequent owner revisions remain untouched. Prior migrations/snapshots and additive migration 0003 are unchanged during closeout. Secrets, runtime state, dependencies and caches are excluded. Safe origin/main commit/push is verified at closeout; exact hash is in the final report.

Passed: 7 unit checks; 151 development browser checks (including 24 Step 3D checks, with all 24 rerun after the final address fix), 18 MRT/ARL fixture browser checks and 12 production browser checks. Five redundant boundary cases skipped. Both languages and 390/768/1024/1280/1440/1600px covered; phone/desktop screenshots reviewed. Real PostgreSQL/app groups passed: 7 Step 3D, 12 regression, 8 fixture, 12 search, 5 development and 6 production sample guards. Production build, TypeScript and Drizzle no-schema-drift passed. HTTP 200 frontend/listings/health with database ready verified. Test servers stopped; admin and enquiry submission absent.

All nine maintained Markdown files are updated. Step 3D is Done after the owner saved and fully closed Excel: the unlocked canonical workbook matched its original 86-ID archive before replacement. The same root Mstar-Property-Task-Tracker.xlsx now preserves every original ID/status/history and includes R06 Done: 87 IDs, 22 Done, 23 Pending, 42 Not started; Frontend/Backend/Emails open views are 31/26/8. All six sheets, formulas/caches, tables, dates, validations, frozen headers, visible borders/gridlines and yellow/light-green/red statuses are verified. Earlier R06 Pending history from the Excel lock is retained, and prior test evidence remains verbatim under dated history. The owner requested deletion of both previous project workbook files and recreation of one canonical root tracker. Exactly one project Excel file remains; all IDs and dated history are retained. The regenerated root workbook is independently verified, with no live workbook copy. Implementation commit 6a269f3 is already pushed; this workbook/document closeout is committed and pushed separately, with its exact hash in the final report. No application code, configuration, migration or seed changed during resumed closeout, so the completed application/browser/PostgreSQL evidence above is reused and no server is reopened. Existing unrelated blockers remain Pending.

Verified HTTP 200 during actual testing: http://127.0.0.1:3000/en, /th, /en/buy, /th/buy, /en/rent, /en/invest, /api/listings?route=buy&lang=en and /api/health (database ready). Implementation test servers were stopped after testing. During resumed tracker closeout, newly created external Mstar preview listeners were found running on 3000/5432; they were left running because this closeout did not start or own that preview. Read-only /en, /th, /en/buy and /api/health requests returned HTTP 200 (database ready). These checks establish current availability only, not additional feature tests; no new server or migration is started by this workbook/document closeout. No admin URL exists. No new form submission, production deployment or production migration is performed. Earlier dated sections below are historical.


## Current Step 3C — F39 — 2026-10-10

Existing pages now use a shared motion system without additional dependencies. lib/motion.ts provides RAF rail movement and token-based surface animation; components/listing-photos.tsx provides directional photo layers. Run an explicitly authorized development server and then npm test -- tests/motion.spec.ts. Tests do not start servers automatically.

The owner supplied revised BUILD-SPEC Motion and V5 guidance before this task. Approved handoff Markdown/HTML, historical references and applied migrations are preserved byte-for-byte against the current input hashes; they are immutable exceptions to maintained-document updates. The prior R05 commit 44f405a and its workbook history are preserved. The real Git root is D:/mstar companies/mstar property/mstar property new site; live/ is its local deployable mirror, not a deployed website. All 91 baseline live files are compared before synchronizing intended code/configuration, these nine documents and the same canonical workbook; secrets, runtime state, dependencies and caches are excluded. Final matching hashes and safe origin/main commit/push are verified at closeout; the exact hash is in the final report. Older dated sections below are historical.


Final verification: 36/36 motion browser checks and 91 existing development regression checks passed; five redundant boundary runs were intentionally skipped. Twelve production browser checks passed with samples hidden despite MSTAR_DEMO_MODE=1. Real application/PostgreSQL checks passed: 12 search groups, five development sample groups and six production sample groups. Production build and TypeScript passed. Both languages and 390/768/1024/1280/1440/1600px were covered; screenshots were visually reviewed on phone and desktop. An exit test originally checked after a protocol delay longer than the sheet animation; first-frame browser inspection now verifies inert retained content, duration and eventual removal deterministically. Admin and real enquiry submission remain absent.

The same six-tab workbook retains 86 permanent IDs and all prior history. Only F39 moves from Not started to Done: 21 Done, 23 Pending, 42 Not started. Frontend/Backend/Emails open views are 31/26/8; Done/Pending/Not started contain every ID exactly once. Yellow Pending, light-green Done, red Not started, visible borders, gridlines, formulas, tables, dates, validation and frozen headers are preserved. No separate fix ID duplicates this implementation task. All nine maintained documents are updated. The 94 intended source/config/document/tracker Git/live SHA-256 pairs and origin/main push are verified at final closeout. Unrelated project blockers remain Pending.

Verified HTTP 200 during actual testing: http://127.0.0.1:3000/en, /th, /en/buy, /th/buy, /en/rent, /en/invest, /api/listings?route=buy&lang=en and /api/health (database ready). Test servers on ports 3000 and 5432 are stopped afterward; these links are not currently running. No admin URL exists. Preview remains owner-controlled; an explicitly authorized preview uses the existing local-postgres.ps1 start command and npm run dev. No deployment or migration is performed.

## Tracker status and grid correction — R05 — 2026-10-10

This change improves project tracking only. The current feature implementation remains Step 3B. Step 3C is listed as F39 Not started from the newly revised owner guide; its text does not authorize implementation.

The owner requested a truthful completion audit and visible spreadsheet grid. R05 records this workbook/document correction only. Done means the entire stated task scope is completed with relevant evidence and applicable closeout gates. Pending means work has started but a named deliverable remains, or a real decision/asset/blocker awaits action. Not started means implementation of that task has not begun; an unrequested future stage or a nonexistent wireframe draft is not an approval blocker. Completed decisions do not inherit unrelated future implementation gates.

The same root workbook preserves all 84 existing IDs and their exact prior history text. It adds R05 for this correction and F39 for the newly supplied, unstarted Step 3C motion scope: 86 IDs, 20 Done, 23 Pending and 43 Not started. Frontend/Backend/Emails contain synchronized open views of 32/26/8 records. F02 and B29 are Done owner decisions. F32/F34 are Not started because no draft exists. F21/F22/F23/F31 and B08/B11/B15/B20/B22/B31 move to Pending because they have partial implementation and specific remaining work. B28 stays Pending for the missing exchange-rate source/conversion. F01/F04/F05/F06/F07 and R01 retain their independent closeout blockers. F25 remains Pending for regional tiles.

Current evidence and next actions are refreshed. The history header and prefix explicitly identify earlier states as dated history; old text is retained rather than represented as today's status. Thin visible borders separate every task cell, including coloured rows, and worksheet gridlines are enabled on all six sheets. Yellow Pending, light-green Done and red Not started remain. Existing formulas, table names, filters, date columns and frozen headers are preserved; status validation covers all task rows.

Application code, UI, database schema, migrations and seed are unchanged. No new application, browser or PostgreSQL suite is run for this workbook-only edit. Existing externally started listeners on 3000/5432 were found running and left alone; read-only frontend /en and /api/health requests returned HTTP 200, with health database ok/ready true. These checks establish current availability only, not new feature tests. Admin and real enquiry submission remain absent. This task opens no server and authorizes no Step 3C/4 implementation, deployment or migration.

Before editing, 88 source/live pairs matched; owner-revised BUILD-SPEC and V5 guide differed from live, and next-env.d.ts was already modified. Those three files are preserved and excluded from this correction's commit/synchronization. Only the workbook and nine maintained documents are synchronized after baseline checks. Final export validation, visual review, intended-file SHA-256 pairs and safe commit/origin/main push are checked at closeout; the exact commit is in the final report. Earlier dated sections below remain historical.


## Current Step 3B — R04 — 2026-10-10

Implemented the owner’s full-width results grid, 12-home batches, whole land-unit facts, actual station line labels and Thai sample badges. The home now has approved small-card topic rows directly after the hero/search. Rows come from lib/home-rows-config.ts, reuse safe server search, show featured before newest, cap at 12 and disappear when empty. No other Step 7 sections are built.

For an explicitly authorized sample preview, start the existing isolated PostgreSQL cluster as documented in database.md, then run npm run dev. Production npm run build / npm run start never show samples. Keep genuine regional searches separate from clearly titled local sample rows. The sample flag defaults off in .env.example; ignored local settings are not mirrored.

Tests require an already running app: npm test covers regular development checks; NODE_ENV=development npm run test:step3b runs controlled real-DB fixtures and their browser tests. In PowerShell set the environment variable separately. npm run test:search and npm run test:samples retain their existing roles. tests/step3b-fixtures.spec.ts is excluded from normal runs and is enabled only by its fixture harness. Stop servers afterward.

Verification: 91 development checks covered (66 existing plus 25 new/boundary checks), 18 real-DB fixture browser checks, 12 production browser checks, eight Step 3B DB groups, 12 search groups, five development/six production sample groups, build and TypeScript passed. See testing.md for initial test-harness failures and final evidence.

Step 3B is the only scope completed here. R04 records this owner change and updates F08/F09/F10/B06 without duplicating their IDs. F25 moves to Pending: home topic rows are implemented, but its regional tiles remain Step 7. The overall project and prior Step 0/1 blockers remain Pending. Stop before Step 4; no map, property detail, enquiry submission, account or admin is added.

All nine maintained documents are updated. The owner supplied revised BUILD-SPEC, V5 guide, home-page.html, wireframe.html and wireframe-v3.html before this task. Their current input hashes are preserved; CODEX-PROMPT, historical sources and applied migrations are also unchanged. The old live references match the preceding committed text, so adopting the owner revisions is an intended update, not overwriting divergent work. The 82-file live baseline is rechecked before copying intended source/config/docs/tracker; final SHA-256 pairs, commit and origin/main push are verified at closeout. Secrets, runtime state, dependencies and caches are excluded. The exact commit is in the final report.

The canonical root workbook retains all 83 prior IDs/history and adds R04: 84 IDs, 17 Done, 17 Pending, 50 Not started. Frontend/Backend/Emails remain synchronized open views (32/27/8); Done/Pending/Not started contain each ID exactly once. Pending stays yellow, Done light green and Not started red. If any final gate fails, R04 and affected changed tasks must be marked Pending.

Verified during actual tests: http://127.0.0.1:3000/en, /th, /en/buy, /th/buy, /en/rent, /en/invest, /api/listings?route=buy&lang=en and /api/health. All returned HTTP 200; health was database-ready. Ports 3000 and 5432 are now stopped. Admin and real form submission do not exist; no admin URL or submission proof is invented. No production deployment or migration is performed. Older dated sections below are historical and do not override this record.

## Historical records before Step 3B


## Development-only samples — R03 — 2026-10-10

Review seeded fictional cards with npm run dev only, when opening localhost is authorized. Ignored local config already opts in with MSTAR_DEMO_MODE=1 and a loopback SITE_URL. Every sample card has a Sample badge and the page explains that inventory, prices, agents, photos and distances are fictional. npm run build / npm run start are production commands: samples and their filter metadata are always excluded, even with the flag still enabled. A configured public SITE_URL or public Host also denies samples. Homepage carousel remains Step 7.

New reproducible check: with the appropriate app mode already running, set MSTAR_TEST_MODE=development (or production) in the test terminal and run npm run test:samples. For production also set NODE_ENV=production and MSTAR_DEMO_MODE=1 in that terminal; the script tests actual API/DB state and attempts a forced internal sample query. Production browser proof: MSTAR_TEST_MODE=production and npm test -- tests/sample-visibility.spec.ts. Commands do not start servers. See testing.md for exact outcomes.

This owner-requested correction is R03, linked to F08/B06; it does not start Step 4. All nine maintained Markdown and the same six-tab root tracker are updated. Approved handoff Markdown/HTML and historical files remain immutable and hash-verified. Tracker totals are 83 permanent IDs: 16 Done, 16 Pending, 51 Not started; prior IDs/history/statuses are preserved. Git/live starts from 80 matching files; intended source/config/docs/tracker are compared, safely mirrored and hash-verified at finalization, then committed/pushed. Secrets, runtime state, dependencies and caches are excluded. Final report supplies the exact commit. Ports 3000/5432 are stopped after tests; admin remains absent. Older dated records below are historical and do not override this correction.


## Current Step 3 — 2026-10-09

Implemented: /[lang]/buy, rent and invest; GET /api/listings; V3 cards, native phone swipe, five-photo controls, persistent device hearts, contact dialog, typed database filters, actual price histogram, sorting, chips, empty state and Show more homes. Desktop reserves an empty map column. Contact submission is Step 6, detail page Step 5, homepage carousel Step 7 and authenticated Saved/search flows Step 9. No later stage is implemented.

For authorized local preview, use the existing Node/npm interpreter, start the isolated database with scripts/local-postgres.ps1, run npm run db:migrate and npm run db:seed:search, then npm run dev (or npm run build and npm run start). Set MSTAR_PG_BIN as documented in database.md. MSTAR_DEMO_MODE defaults to 0; the ignored local environment uses 1 solely for clearly marked fictional preview. npm test requires an already running app. npm run test:search requires the app and PostgreSQL. Stop both processes afterward.

Step 3 is complete for F08–F13, B05–B07 and R02 only. R02 records contact-dialog autofocus and swipe/keyboard regression fixes linked to F01/F08. The overall project and the independent Step 0/1 blockers remain Pending. Stop before Step 4.

Final validation: production build and TypeScript passed; 36/36 real Chromium browser tests passed in Thai/English at 390, 768, 1024 and 1440px; 12/12 real application/PostgreSQL search groups and 12/12 isolated PostgreSQL regression groups passed. Backup, all three migration apply/rerun, repeatable seed, joins, constraints, indexes, permissions and actual dump/rollback/restore were tested. Frontend, listings API and health returned HTTP 200 with the database ready. After stopping PostgreSQL, health and listings returned HTTP 503 without database details. Ports 3000 and 5432 are stopped after testing. Admin and real enquiry submission do not exist.

All nine maintained Markdown files are updated: AGENTS.md, README.md, design.md, architecture.md, database.md, testing.md, progress.md, MSTAR-CODEX-RULES.md and CLAUDE.md. Approved codex-handoff Markdown/HTML and historical sources remain immutable; their baseline hashes are verified instead. The same root workbook retains all prior IDs/history and adds R02: 82 IDs, 15 Done, 16 Pending, 51 Not started. All six views are regenerated and checked; Pending is yellow, Done light green and Not started red. The 59-file Git/live baseline is compared before copying intended source/config/docs/tracker, excluding secrets, dependencies, cluster, backups and caches. Final matching hashes and commit/push to origin/main are checked at closeout; the final report supplies the exact commit. If a final gate fails, affected tasks must revert to Pending.

Verified during testing, now stopped: http://127.0.0.1:3000/en/buy, http://127.0.0.1:3000/th/buy, /en/rent, /en/invest, /api/listings?route=buy&lang=en and /api/health on the same host/port. No admin URL. Existing owner choices remain unchanged. Older dated sections below are historical and do not override this section.


## Claude project handoff — 2026-10-09

Read [CLAUDE.md](CLAUDE.md) for the consolidated current project briefing: actual Git/live paths, approved V3/V5 references, implemented source, Step 2 proof, unimplemented Step 3, owner decisions, database/security contracts, server policy, tracker and completion gates. The owner requested this document so Claude can read and help Codex. This documentation-only task does not change application code, UI, migrations, seed or owner choices. Older dated sections below remain historical; this briefing identifies their current replacements. R01 receives an append-only tracker history entry, with all 81 IDs and statuses retained. Only documentation/workbook/mirror checks apply; no new app/browser/database test or working localhost claim is made. Ports 3000 and 5432 were found stopped during inspection; no admin exists. Approved handoff and historical files remain unchanged. Git/live synchronization and commit/push are verified at finalization.

## Tracker colours — 2026-10-09

The owner requested the recreated Excel before Step 3 implementation. The canonical root workbook now uses yellow Pending (#FFF2CC), light green Done (#C6EFCE), and red Not started (#FF6666), including full task rows, status tabs, and conditional rules. All six sheets, 81 permanent IDs, prior task records/history, formulas, tables, validations, and frozen headers are preserved. Status totals remain 5 Done, 16 Pending, and 60 Not started; R01 receives an append-only formatting history entry.

Workbook export checks and visual review of all six sheets passed. This changes workbook formatting and documentation only; application code, schema, migrations, seed, and approved UI are unchanged. Approved handoff and historical sources remain immutable. Git/live files are compared against the 58-file matching baseline before safe synchronization, then hashes and commit/push are verified during finalization. Step 3 is authorized and remains unimplemented; this Excel delivery does not claim Step 3 completion. Application/browser/PostgreSQL retests are not applicable to this formatting-only delivery and were not rerun. Frontend http://127.0.0.1:3000/en and health http://127.0.0.1:3000/api/health remain stopped, as previously requested; no admin exists.

## Current state — Step 2 — 2026-10-09

The Next.js/TypeScript frontend foundation now connects to real PostgreSQL 18.6 through server-only Drizzle access. Step 2 adds 18 tables, two migrations, type/publish/locale constraints, typed future admin filter metadata, search indexes and 14 clearly fictional seed listings. Public stock excludes demo data. UI remains the approved partial foundation; listing cards are Step 3 and Homes for you is Step 7. Forms, account login and admin are absent.

Use the existing Git root `D:/mstar companies/mstar property/mstar property new site`, branch main, origin `https://github.com/Cynicalfocus123/mstar-property-.git`. `live/` is the safely hash-verified local source mirror. The canonical six-tab workbook stays at root. Approved handoff files and historical prototypes are preserved unchanged; all eight maintained documents are updated.

Commands: `npm ci`, `npm run db:migrate`, `npm run db:seed`, `npm run db:test`, `npm run typecheck`, `npm run build`. The DB scripts use ignored local settings or explicit environment variables; see database.md for setup, permissions and rollback. New tools drizzle-kit 0.31.11 and tsx 4.23.15 are exact-pinned. `.mjs` files must be run with Node, never opened directly through Windows.

Verification passes: build/TypeScript, 16 browser/API tests at 390/768/1024/1440px, 12 real PostgreSQL test groups, rollback/backup/restore and zero dependency audit findings. B01–B04 and B34 close only after final docs/workbook/Git/live/push verification. Other stages and unresolved owner choices are not claimed complete.

Verified during this run: [English](http://127.0.0.1:3000/en), [Thai](http://127.0.0.1:3000/th), and [health](http://127.0.0.1:3000/api/health). Health returns database ok/ready true while PostgreSQL runs. Test servers stop afterward under the current request; these links are then stopped, not left open. Admin has no URL because it does not exist. To reopen when the owner requests it, start the local cluster as documented, then `npm run start` after a successful build. `npm test` expects an already running app and never starts one automatically.

Earlier state/port/test paragraphs below are historical. This task stops after Step 2.

## Active V5 guide — 2026-10-09

Active stage guide: `codex-handoff/MSTAR-CODEX-PROMPTS-v5.md`. Revised V3 BUILD-SPEC, wireframe.html and new home-page.html govern visuals. The Homes for you carousel belongs to Step 7; reusable 3:2 cards belong to Step 3. No new application step is started by adopting the guide.

The owner subsequently requested frontend viewing: port 3000 is open at http://127.0.0.1:3000/en and /th. Tests remain deferred; Step 1 remains Pending. Admin and PostgreSQL configuration remain absent. Earlier closure records describe historical state.

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
