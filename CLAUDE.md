# Mstar Property — Claude project handoff

Updated: 2026-10-09, Asia/Bangkok. Maintained briefing for Claude to review and help Codex. No credentials. Inspect current files and Git status before edits; this snapshot does not authorize additional stages.

## Current scope and verified status

Step 3 is complete for F08–F13, B05–B07 and R02 only. R02 records contact-dialog autofocus and swipe/keyboard regression fixes linked to F01/F08. The overall project and the independent Step 0/1 blockers remain Pending. Stop before Step 4.

Final validation: production build and TypeScript passed; 36/36 real Chromium browser tests passed in Thai/English at 390, 768, 1024 and 1440px; 12/12 real application/PostgreSQL search groups and 12/12 isolated PostgreSQL regression groups passed. Backup, all three migration apply/rerun, repeatable seed, joins, constraints, indexes, permissions and actual dump/rollback/restore were tested. Frontend, listings API and health returned HTTP 200 with the database ready. After stopping PostgreSQL, health and listings returned HTTP 503 without database details. Ports 3000 and 5432 are stopped after testing. Admin and real enquiry submission do not exist.

All nine maintained Markdown files are updated: AGENTS.md, README.md, design.md, architecture.md, database.md, testing.md, progress.md, MSTAR-CODEX-RULES.md and CLAUDE.md. Approved codex-handoff Markdown/HTML and historical sources remain immutable; their baseline hashes are verified instead. The same root workbook retains all prior IDs/history and adds R02: 82 IDs, 15 Done, 16 Pending, 51 Not started. All six views are regenerated and checked; Pending is yellow, Done light green and Not started red. The 59-file Git/live baseline is compared before copying intended source/config/docs/tracker, excluding secrets, dependencies, cluster, backups and caches. Final matching hashes and commit/push to origin/main are checked at closeout; the final report supplies the exact commit. If a final gate fails, affected tasks must revert to Pending.

Verified during testing, now stopped: http://127.0.0.1:3000/en/buy, http://127.0.0.1:3000/th/buy, /en/rent, /en/invest, /api/listings?route=buy&lang=en and /api/health on the same host/port. No admin URL. Existing owner choices remain unchanged. Older dated sections below are historical and do not override this section.

Step 0 preparation and Step 1 foundation remain Pending for their independent prior blockers. Step 2 is Done (B01–B04/B34). Step 3 is Done after its completion gates. Step 4 and later are not implemented. Homepage currently contains the foundation header/hero/search/footer; Homes for you is V5 Step 7. Card detail links lead to an explicit unfinished Step 5 destination. Device save hearts work; authenticated Saved/search workflows are Step 9. Contact dialogs open; real submission is Step 6. No production auth, admin, maps, notifications or bookings exist.

## Real locations and required reading

Git root: D:/mstar companies/mstar property/mstar property new site. Local mirror: the live/ directory inside that root, not deployment. Remote: https://github.com/Cynicalfocus123/mstar-property-.git, branch main. Canonical workbook: root Mstar-Property-Task-Tracker.xlsx. Preceding pushed handoff commit: 9327797; use git log for current Step 3 head.

Read all nine maintained Markdown listed above. Read the complete codex-handoff/MSTAR-CODEX-PROMPTS-v5.md (active stage numbering), BUILD-SPEC.md, CODEX-PROMPT.md, wireframe.html and home-page.html. Approved Claude V3 is the visual source of truth; preserve these sources and historical WIREFRAME.md/wireframe-v* files. Forest-green V1 is superseded. Original HTML browser review remains policy-blocked; do not claim a rendered-prototype comparison or bypass that restriction. Persisted docs/code/commits use normal English; chat uses $caveman full.

## Source map and runtime

- Existing Next.js App Router/TypeScript/PostgreSQL/Drizzle stack; one application serves frontend/API. Node D:/codex system/tools/nodejs/node.exe 24.19.0, npm 11.17.0. Locked packages remain unchanged: Next 16.4.0, React 19.3.0, TypeScript 7.0.2, Drizzle 0.45.4, postgres 3.4.9, drizzle-kit 0.31.11, tsx 4.23.15, Playwright 1.64.0.
- app/[lang]/buy, rent, invest/page.tsx and components/results-page.tsx provide localized server-rendered results; app/api/listings/route.ts provides safe GET search.
- lib/search-state.ts validates/serializes shared URL state; lib/listing-search.ts is server-only and parameterized; listing-types.ts/search-copy.ts provide safe DTOs and bilingual copy.
- components/listing-card.tsx and search-results.tsx implement approved cards, local saves, native swipe, dialogs and URL filters. components/search-field.tsx reuses shared homepage search serialization. components/ui.tsx preserves native dialog focus.
- app/globals.css uses approved white surfaces/tokens/fonts and 720/1000px breakpoints. Existing shell/preferences/locale files remain the foundation.
- db/schema.ts and db/migrations/ contain 18 tables and three migrations; latest is additive 0002_station_search_slug.sql. Prior applied migrations/snapshots are unchanged.
- scripts/seed-search.ts adds guarded fictional preview; scripts/test-search.ts tests actual app/DB; scripts/test-db.ts performs isolated regression/rollback/restore; tests/search.spec.ts and foundation.spec.ts test real browser behavior.

Reuse package configuration and interpreter. Keep scans focused. Never launch Serena dashboard. Run .mjs with Node, never Windows file associations. Do not start unrelated repositories or overwrite divergent live work.

## Database and search security

PostgreSQL 18.6 is isolated in ignored .local/postgres-data; binaries are D:/dev/tmp/mstar-step2/runtime/pgsql/bin. Named development database is mstar_property_dev; destructive regression uses mstar_property_step2_test only. mstar_owner handles migrations; mstar_app is non-superuser and read-only. Ignored .env.local/.local/database.env hold secrets; never print, commit or mirror them. Never change the shared postgres admin password. .env.example documents variable names.

The original seed remains 14 fictional listings in regression; development search fixtures contain 16 listings with five local SVG illustrations each. Agents, prices, locations and distances are visibly fictional. public.public_listings excludes all demo stock. Local preview requires MSTAR_DEMO_MODE=1, trusted localhost/127 Host and a named local database; default is 0. Demo metadata is activated only in this partition, never as genuine public configuration. Real stock is not seeded.

Queries validate active typed filter definitions/options and property scope. No metadata SQL interpolation. DTOs omit gated prices, hidden exact address/coordinates, contacts and hotel revenue. Price predicates/sort/histogram do not reveal gated prices. Bbox excludes hidden positions. Five photos maximum; six homes per cumulative page, capped at 50 pages/300 homes. Applied changes use router.push to retain back/forward; popup drafts do not alter URLs. New station slugs are unique/non-null; validated legacy station:UUID remains supported. No exchange rate or map provider is invented.

Before the new migration, a development dump was taken at ignored .local/backups/step3-before-station.dump. Three-migration rerun and isolated dump/committed initial rollback/restore passed. Never rewrite migration history or run destructive tests against development. Production recovery requires the verified pre-change backup and post-restore validation. Future writes require narrow grants, validation and stage authorization.

## Owner decisions and design

Use approved wireframe gold/colours. Final header logo arrives later. Enquiry inbox-versus-agent routing remains unresolved. LINE/WhatsApp buttons precede integration; contacts/company-versus-agent routing are unresolved. Sign-in providers remain unresolved. Support USD and THB, storing THB; conversion is unavailable until a source is chosen. Admin chooses public/contact-gated prices. Mapping must be free/open-source; concrete provider/library is unresolved. See design.md for the eight BUILD-SPEC §12 questions and permanent IDs. New UI without an approved wireframe needs owner approval first.

## Tests and server commands

Final build/TypeScript and schema-drift checks passed. 36/36 Chromium tests cover both languages, all four widths, card/save/photos/native phone swipe, contact focus/keyboard, real filter option Apply, counts/histogram, sorting, pagination and URL refresh/back/forward. 12/12 actual app/PG search groups verify counts, privacy, input rejection, typed metadata and raw untrusted-Host rejection. 12/12 PostgreSQL groups verify migrations/seed/constraints/joins/indexes/permissions/rollback/restore. Evidence is ignored .local/step3-search-results.json and .local/step2-db-results.json. No frontend form submission is claimed.

Servers are stopped. Only open them under the owner's preview or explicit stage-test authorization:

```powershell
$env:MSTAR_PG_BIN = 'D:/dev/tmp/mstar-step2/runtime/pgsql/bin'
./scripts/local-postgres.ps1 -Action start
npm run db:migrate
npm run db:seed:search
npm run typecheck
npm run build
npm run start
# Second terminal, with app ready:
$env:PLAYWRIGHT_BROWSERS_PATH = 'D:/dev/playwright'
npm test
npm run test:search
# Stop app process, then isolated database:
./scripts/local-postgres.ps1 -Action stop
```

npm test does not start a server. Backend shares port 3000; admin is absent. Clearly label provided links as verified during tests and stopped afterward.

## Tracker and collaboration

The same six-tab workbook has 82 permanent IDs: F01–F38, B01–B34, E01–E08, R01/R02. Totals: 15 Done, 16 Pending, 51 Not started. Done IDs: B01–B07/B34, F08–F13, R02. Each ID belongs to exactly one status sheet; category sheets show synchronized open tasks. Preserve yellow Pending, light green Done, red Not started, dates, tables, validation, formulas, frozen headers and append-only history. R01 remains Pending for its separate tracker-utility/rendered-reference blockers.

Review only the authorized stage. Cite concrete files and BUILD-SPEC sections when proposing corrections. Inspect shared changes before edits and coordinate file ownership. Do not publish, deploy, message others or begin later stages from this briefing alone. Every development task requires all maintained Markdown, verified Excel, safe Git/live hashes, relevant actual tests, verified URLs and commit/push. Failure of any gate means Pending. Stop after Step 3; await the next owner prompt.
