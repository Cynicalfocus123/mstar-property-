# Database

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
