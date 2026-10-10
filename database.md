# Database

## Current Step 3B — R04 — 2026-10-10

No migration, schema, role, password or permanent seed change is made. Read-only runtime access and original public-price/location protections remain. Home rows call the same guarded DB search; featured/date/id ordering is server-controlled and bounded. Station distance and line now come from the same nearest relation; Nearest BTS sort remains BTS-specific.

npm run test:step3b requires NODE_ENV=development, the existing named loopback development/test database, migration credentials in ignored configuration and an actual guarded development app. It creates random-ID fictional test records only, clones existing safe media, inserts fictional MRT/ARL distances, tests the real app, and deletes its own IDs in finally. Listing/media/station joins and original row hashes prove cleanup. No genuine record or original seed is changed; the persistent development fixture remains 16. Do not run this harness against production or a shared database. Existing backups/rollback procedures are unchanged and were not rerun because no schema changed.

Verification: 91 development checks covered (66 existing plus 25 new/boundary checks), 18 real-DB fixture browser checks, 12 production browser checks, eight Step 3B DB groups, 12 search groups, five development/six production sample groups, build and TypeScript passed. See testing.md for initial test-harness failures and final evidence.

Step 3B is the only scope completed here. R04 records this owner change and updates F08/F09/F10/B06 without duplicating their IDs. F25 moves to Pending: home topic rows are implemented, but its regional tiles remain Step 7. The overall project and prior Step 0/1 blockers remain Pending. Stop before Step 4; no map, property detail, enquiry submission, account or admin is added.

All nine maintained documents are updated. The owner supplied revised BUILD-SPEC, V5 guide, home-page.html, wireframe.html and wireframe-v3.html before this task. Their current input hashes are preserved; CODEX-PROMPT, historical sources and applied migrations are also unchanged. The old live references match the preceding committed text, so adopting the owner revisions is an intended update, not overwriting divergent work. The 82-file live baseline is rechecked before copying intended source/config/docs/tracker; final SHA-256 pairs, commit and origin/main push are verified at closeout. Secrets, runtime state, dependencies and caches are excluded. The exact commit is in the final report.

The canonical root workbook retains all 83 prior IDs/history and adds R04: 84 IDs, 17 Done, 17 Pending, 50 Not started. Frontend/Backend/Emails remain synchronized open views (32/27/8); Done/Pending/Not started contain each ID exactly once. Pending stays yellow, Done light green and Not started red. If any final gate fails, R04 and affected changed tasks must be marked Pending.

Verified during actual tests: http://127.0.0.1:3000/en, /th, /en/buy, /th/buy, /en/rent, /en/invest, /api/listings?route=buy&lang=en and /api/health. All returned HTTP 200; health was database-ready. Ports 3000 and 5432 are now stopped. Admin and real form submission do not exist; no admin URL or submission proof is invented. No production deployment or migration is performed. Older dated sections below are historical and do not override this record.

## Historical records before Step 3B


## Development-only samples — R03 — 2026-10-10

No schema/migration/seed/password changes are made. All 16 published fictional development listings remain is_demo=true. The public_listings view still excludes them. Actual API counts match the appropriate demo/genuine PostgreSQL partition in both app modes; the current genuine result count is zero. The production test forces internal demo=true and still receives genuine-only results/metadata. Existing ignored settings and the isolated cluster are preserved; no shared postgres account is changed. No form submission is implemented.

Use the existing setup below, then npm run dev for authorized sample review. Production next start cannot show samples. New npm run test:samples uses the existing Node/tsx runtime with the react-server export condition so the server-only query probe runs without weakening its module fence. Set MSTAR_TEST_MODE to the actual app mode; production proof also requires NODE_ENV=production and the sample flag set to 1 in the test terminal.

This owner-requested correction is R03, linked to F08/B06; it does not start Step 4. All nine maintained Markdown and the same six-tab root tracker are updated. Approved handoff Markdown/HTML and historical files remain immutable and hash-verified. Tracker totals are 83 permanent IDs: 16 Done, 16 Pending, 51 Not started; prior IDs/history/statuses are preserved. Git/live starts from 80 matching files; intended source/config/docs/tracker are compared, safely mirrored and hash-verified at finalization, then committed/pushed. Secrets, runtime state, dependencies and caches are excluded. Final report supplies the exact commit. Ports 3000/5432 are stopped after tests; admin remains absent. Older dated records below are historical and do not override this correction.


## Current Step 3 — 2026-10-09

Added reviewed additive migration 0002_station_search_slug.sql: stations.slug is non-null and unique with a safe generated default. The journal now has three migrations; previously applied 0000/0001 and their snapshots are unchanged. Health checks both public_listings and the current station slug column. A development pg_dump backup was taken before migration at ignored .local/backups/step3-before-station.dump. Never rewrite applied migrations or rotate the shared postgres admin password.

Use npm run db:migrate, then npm run db:seed:search only with the existing named local development/test connection setup below. Search seed is idempotent and guards against overwriting genuine IDs. Development search fixtures total 16 fictional listings with five local illustration media per listing; the original db:seed test fixture remains 14. Demo station slug is fictional-demo-station; legacy station:UUID URLs remain validated. Only demo filter metadata is activated for this fixture. MSTAR_DEMO_MODE defaults to 0 in .env.example; setting it to 1 in ignored local runtime config enables clearly labeled preview only on the named local DB and trusted Host. Production public_listings still excludes all demo records.

The isolated regression database exercises all three migrations, committed initial rollback, dump/restore and migration rerun. Production rollback means stopping writes and restoring a verified pre-change backup using the migration owner, then validating schema/data/app readiness; do not delete migration ledger rows or run destructive test rollback against development/production. The app remains read-only. Enquiry/contact persistence is not implemented and no frontend submission proof is claimed.

Step 3 is complete for F08–F13, B05–B07 and R02 only. R02 records contact-dialog autofocus and swipe/keyboard regression fixes linked to F01/F08. The overall project and the independent Step 0/1 blockers remain Pending. Stop before Step 4.

Final validation: production build and TypeScript passed; 36/36 real Chromium browser tests passed in Thai/English at 390, 768, 1024 and 1440px; 12/12 real application/PostgreSQL search groups and 12/12 isolated PostgreSQL regression groups passed. Backup, all three migration apply/rerun, repeatable seed, joins, constraints, indexes, permissions and actual dump/rollback/restore were tested. Frontend, listings API and health returned HTTP 200 with the database ready. After stopping PostgreSQL, health and listings returned HTTP 503 without database details. Ports 3000 and 5432 are stopped after testing. Admin and real enquiry submission do not exist.

All nine maintained Markdown files are updated: AGENTS.md, README.md, design.md, architecture.md, database.md, testing.md, progress.md, MSTAR-CODEX-RULES.md and CLAUDE.md. Approved codex-handoff Markdown/HTML and historical sources remain immutable; their baseline hashes are verified instead. The same root workbook retains all prior IDs/history and adds R02: 82 IDs, 15 Done, 16 Pending, 51 Not started. All six views are regenerated and checked; Pending is yellow, Done light green and Not started red. The 59-file Git/live baseline is compared before copying intended source/config/docs/tracker, excluding secrets, dependencies, cluster, backups and caches. Final matching hashes and commit/push to origin/main are checked at closeout; the final report supplies the exact commit. If a final gate fails, affected tasks must revert to Pending.

Verified during testing, now stopped: http://127.0.0.1:3000/en/buy, http://127.0.0.1:3000/th/buy, /en/rent, /en/invest, /api/listings?route=buy&lang=en and /api/health on the same host/port. No admin URL. Existing owner choices remain unchanged. Older dated sections below are historical and do not override this section.


## Claude project handoff — 2026-10-09

Read [CLAUDE.md](CLAUDE.md) for the consolidated current project briefing: actual Git/live paths, approved V3/V5 references, implemented source, Step 2 proof, unimplemented Step 3, owner decisions, database/security contracts, server policy, tracker and completion gates. The owner requested this document so Claude can read and help Codex. This documentation-only task does not change application code, UI, migrations, seed or owner choices. Older dated sections below remain historical; this briefing identifies their current replacements. R01 receives an append-only tracker history entry, with all 81 IDs and statuses retained. Only documentation/workbook/mirror checks apply; no new app/browser/database test or working localhost claim is made. Ports 3000 and 5432 were found stopped during inspection; no admin exists. Approved handoff and historical files remain unchanged. Git/live synchronization and commit/push are verified at finalization.

## Tracker colours — 2026-10-09

The owner requested the recreated Excel before Step 3 implementation. The canonical root workbook now uses yellow Pending (#FFF2CC), light green Done (#C6EFCE), and red Not started (#FF6666), including full task rows, status tabs, and conditional rules. All six sheets, 81 permanent IDs, prior task records/history, formulas, tables, validations, and frozen headers are preserved. Status totals remain 5 Done, 16 Pending, and 60 Not started; R01 receives an append-only formatting history entry.

Workbook export checks and visual review of all six sheets passed. This changes workbook formatting and documentation only; application code, schema, migrations, seed, and approved UI are unchanged. Approved handoff and historical sources remain immutable. Git/live files are compared against the 58-file matching baseline before safe synchronization, then hashes and commit/push are verified during finalization. Step 3 is authorized and remains unimplemented; this Excel delivery does not claim Step 3 completion. Application/browser/PostgreSQL retests are not applicable to this formatting-only delivery and were not rerun. Frontend http://127.0.0.1:3000/en and health http://127.0.0.1:3000/api/health remain stopped, as previously requested; no admin exists.

## Implemented Step 2 — 2026-10-09

PostgreSQL 18.6 uses a newly created isolated local cluster at `.local/postgres-data`, listening only on 127.0.0.1:5432 with SCRAM authentication. No existing/shared PostgreSQL service is modified. Portable binaries are at `D:/dev/tmp/mstar-step2/runtime/pgsql/bin`; they are outside Git/live and may be replaced with an existing compatible PostgreSQL installation. The cluster and ignored credential files belong only to this project. Do not alter a shared postgres admin password. Run `.mjs` files through Node.

The 18 application tables are agents, locations, stations, projects, unit_types, plots, listings, listing_media, listing_nearby, listing_stations, enquiries, chat_clicks, users, saved_listings, saved_searches, filter_definitions, filter_options and listing_filter_values. Drizzle's separate migration ledger is not an application table. UUID keys, composite parent keys, foreign-key indexes, unique slugs/codes/provider identities/saved queries, numeric bounds, paired coordinates and bilingual fields are enforced. Residential, land, hotel and commercial requirements differ; invalid combinations are rejected. Sale/rent periods and sold/rented states must agree. Published records require publication/content fields; price visibility is an explicit admin-selected field without a guessed default. Prices are stored in THB, with numeric precision rather than floats; USD conversion is a later stage.

Locations enforce province/district/area parent levels. Plots cannot reference another project's unit type, and enquiries cannot reference another project's plot. Enquiries capture versioned consent, locale, source and UTM; contact requirements differ by type. No production enquiry form, notification queue, booking conflict workflow or authentication is implemented yet. Those stages must validate/rate-limit server submissions and authorize access before adding runtime write grants.

Filter metadata supports single/multiple options, numbers and booleans with translated labels, allowed property types, ordering and active states. Values must match the definition and option ownership; populated definition kind/scope changes are blocked until dependent data is removed. No arbitrary SQL is stored. Published UI filter/query implementation is Step 3/admin work, not Step 2.

Search indexes cover intent/type/status/price, location/status, bounding coordinates, publication/demo/featured/date, project, agent and bilingual simple-config full-text content. Nearby/station distances record source and fetched_at; all seed distances explicitly say fictional rather than claiming map-provider provenance. Simple text tokenization is not a Thai linguistic segmentation implementation.

### Local setup and commands

Install compatible PostgreSQL or use the existing portable binaries above. Official references: [Windows downloads](https://www.postgresql.org/download/windows/), [initdb](https://www.postgresql.org/docs/current/app-initdb.html), [pg_ctl](https://www.postgresql.org/docs/current/app-pg-ctl.html), and [Drizzle migrations](https://orm.drizzle.team/docs/migrations).

```powershell
$env:MSTAR_PG_BIN = 'D:/dev/tmp/mstar-step2/runtime/pgsql/bin'
# Existing cluster: start only when the owner requests localhost or authorizes tests.
./scripts/local-postgres.ps1 -Action start
npm run db:migrate
npm run db:seed
npm run db:test
npm run build
npm run start
# Stop the application process after tests, then stop this isolated cluster:
./scripts/local-postgres.ps1 -Action stop
```

For a fresh installation only, `local-postgres.ps1 -Action init` refuses an existing cluster, generates a protected local admin password, sets local-only binding and starts the cluster. `npx tsx scripts/provision-db.ts` creates new Mstar roles/databases, refuses existing roles/configuration and never changes the postgres password. Partial bootstrap failure requires manual inspection; it never drops/recreates existing databases to recover. Do not run init/provision against a shared installation.

`mstar_property_dev` holds the fictional development seed. `mstar_property_step2_test` is dedicated to destructive schema/restore tests. `mstar_owner` owns migrations and cannot create roles/databases or act as superuser. `mstar_app` has public-schema usage and SELECT through default privileges, but no DDL/writes or ledger access. It remains server-only; add narrower authenticated write privileges only in future authorized stages.

Copy variable names from `.env.example`; supply actual secrets through ignored `.env.local` or environment. `DATABASE_URL` is the runtime read-only connection. `DATABASE_MIGRATION_URL`, `DATABASE_TEST_URL` and `DATABASE_TEST_APP_URL` are separate privileged/test connections in ignored access-restricted `.local/database.env` or environment. URLs must percent-encode special characters in credentials; errors from configuration validation omit URLs. The app file is access-restricted on Windows. Git/live exclude all credential and runtime state.

### Migrations, rollback and demo safety

Run `npm run db:generate` for schema diffs, inspect generated SQL, then `npm run db:migrate` as the migration owner. Never rewrite an applied migration or run automatic migrations inside a request. The two current migrations apply transactionally through Drizzle and rerun without duplication. Generator detects no schema drift. Git pins SQL files to LF so migration checksums stay stable across checkouts.

`db/rollback-initial.sql` destructively removes only the initial known schema and ledger without CASCADE. It is test-only and has no production CLI. The test runner refuses non-local/non-test URLs and genuine records before rollback. It makes a real custom-format pg_dump, commits the initial rollback, proves listings are absent, restores with pg_restore and verifies both migration rows and all 14 demo listings. Backup: `.local/backups/step2-test.dump`. Production rollback requires explicit owner authorization, a verified pre-change backup and restore into a separate recovery database before switching; never run this initial down script on genuine data.

`npm run db:seed` writes 14 clearly labelled fictional listings for seven types and both intents, plus fictional agents/places/project/units/plots/media/nearby/user/saved/enquiry/chat/filter examples. Deterministic demo IDs and on-conflict handling make reruns repeatable; occupied genuine demo IDs abort the transaction. Seeds are local-only, use invalid example domains, disabled demo agents/users, closed enquiries and off alerts, and send no notifications. Public listings view excludes demonstration inventory and hides gated prices/exact location. No real property, agent, price, distance or media is claimed.

PASS: 12 real PostgreSQL groups, insert/readback/joins/constraints/index plans, non-superuser permissions and backup/rollback/restore. PASS: health 200/ready true with the schema, 503/unavailable when PostgreSQL stops, then recovery to 200. Frontend forms/admin are absent; no actual form persistence claim is made. Servers stop after task verification. Earlier unconfigured-database paragraphs below are historical.

## Active V5 guide — 2026-10-09

V5 Step 2 remains unstarted. PostgreSQL configuration, schema and persistence remain absent. Step 3 explicitly requires Step 2 Done before DB-backed cards/search. Step 4 follows free/open-source mapping after a concrete owner choice. No database or provider is created by this guide adoption. The preview is open at owner request; that does not establish database readiness.

## Current state — 2026-10-09

The foundation includes postgres.js, Drizzle ORM and a server-only health probe in lib/db.ts. .env.example lists an empty DATABASE_URL. No credentials, database name or connection configuration were invented. Earlier inventory detected no local PostgreSQL service/executable.

Without DATABASE_URL, health returns database not_configured, ready false and HTTP 200 for the available app. With configuration, it runs select 1 through Drizzle and closes the connection; failure returns HTTP 503. Real PostgreSQL integration is not tested. Localhost is closed on owner request.

There are no schemas, migrations, seed records or persisted submissions. B01–B04 remain Not started. No production/user data was read or changed. R01 and B34 remain Pending for real database verification.

## Later authorized database step

Follow BUILD-SPEC section 13 for the schema, bilingual content, type-specific fields, constraints and indexes. Save enquiries before sending notifications. Verify backups and rollback procedures before production migrations.

Use THB as stored base, approximate daily USD conversion after a rate source is chosen, and admin-selected public/contact-gated prices per listing/project. Mapping is free/open-source in direction, with concrete providers unresolved. Step 1 does not authorize Step 2 schema/seed work.
