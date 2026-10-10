# Mstar Property — Claude project handoff

## Current Step 3D — R06 — 2026-10-10

Step 3D is implemented for centred hero and fuller big/small card facts. Read lib/listing-format.ts, both card components, lib/listing-search.ts and migration 0003 for the current implementation. Old Step 3C records below are dated history. The owner supplied revised BUILD-SPEC, V5 guide, approved HTML and NEW-CHAT-HANDOFF before this task; those input bytes are preserved. The next build scope requires the Step 4 prompt. Admin and real enquiry submission remain absent.

The actual Git root is D:/mstar companies/mstar property/mstar property new site; live/ is its local deployable mirror, not a deployed website. The initial 94-file implementation baseline and resumed 100-file mirror baseline were compared before writes. Final synchronization verifies 92 intended code/configuration/document SHA-256 pairs. The owner now explicitly requests exactly one physical Excel workbook: only the regenerated root Mstar-Property-Task-Tracker.xlsx remains. Its live duplicate is removed; the root workbook is separately validated and committed, and future mirror operations must exclude it. This owner instruction supersedes the earlier requirement to copy the tracker into live/. Six concurrent owner revisions (BUILD-SPEC, V5 guide, NEW-CHAT-HANDOFF, home-page.html, wireframe.html and wireframe-v3.html) and generated next-env.d.ts are preserved and excluded from this closeout commit/synchronization. Their existing live counterparts are preserved. The revised references describe future Step 3E; this workbook closeout does not implement or authorize that stage. Implementation inputs were preserved against their Step 3D baseline; subsequent owner revisions remain untouched. Prior migrations/snapshots and additive migration 0003 are unchanged during closeout. Secrets, runtime state, dependencies and caches are excluded. Safe origin/main commit/push is verified at closeout; exact hash is in the final report.

Passed: 7 unit checks; 151 development browser checks (including 24 Step 3D checks, with all 24 rerun after the final address fix), 18 MRT/ARL fixture browser checks and 12 production browser checks. Five redundant boundary cases skipped. Both languages and 390/768/1024/1280/1440/1600px covered; phone/desktop screenshots reviewed. Real PostgreSQL/app groups passed: 7 Step 3D, 12 regression, 8 fixture, 12 search, 5 development and 6 production sample guards. Production build, TypeScript and Drizzle no-schema-drift passed. HTTP 200 frontend/listings/health with database ready verified. Test servers stopped; admin and enquiry submission absent.

All nine maintained Markdown files are updated. Step 3D is Done after the owner saved and fully closed Excel: the unlocked canonical workbook matched its original 86-ID archive before replacement. The same root Mstar-Property-Task-Tracker.xlsx now preserves every original ID/status/history and includes R06 Done: 87 IDs, 22 Done, 23 Pending, 42 Not started; Frontend/Backend/Emails open views are 31/26/8. All six sheets, formulas/caches, tables, dates, validations, frozen headers, visible borders/gridlines and yellow/light-green/red statuses are verified. Earlier R06 Pending history from the Excel lock is retained, and prior test evidence remains verbatim under dated history. The owner requested deletion of both previous project workbook files and recreation of one canonical root tracker. Exactly one project Excel file remains; all IDs and dated history are retained. The regenerated root workbook is independently verified, with no live workbook copy. Implementation commit 6a269f3 is already pushed; this workbook/document closeout is committed and pushed separately, with its exact hash in the final report. No application code, configuration, migration or seed changed during resumed closeout, so the completed application/browser/PostgreSQL evidence above is reused and no server is reopened. Existing unrelated blockers remain Pending.

Verified HTTP 200 during actual testing: http://127.0.0.1:3000/en, /th, /en/buy, /th/buy, /en/rent, /en/invest, /api/listings?route=buy&lang=en and /api/health (database ready). Implementation test servers were stopped after testing. During resumed tracker closeout, newly created external Mstar preview listeners were found running on 3000/5432; they were left running because this closeout did not start or own that preview. Read-only /en, /th, /en/buy and /api/health requests returned HTTP 200 (database ready). These checks establish current availability only, not additional feature tests; no new server or migration is started by this workbook/document closeout. No admin URL exists. No new form submission, production deployment or production migration is performed. Earlier dated sections below are historical.


## Current Step 3C — F39 — 2026-10-10

Current application scope is Step 3C. Read lib/motion.ts, components/listing-photos.tsx, home-listing-rows.tsx, listing-card.tsx, ui.tsx and the shared CSS tokens before extending motion. Existing pages use smooth shared scrolling/photos/overlays and reduced-motion protection. No map, property detail, enquiry submission, authentication or admin is introduced. The preceding R05 audit remains authoritative for unrelated task statuses.

The owner supplied revised BUILD-SPEC Motion and V5 guidance before this task. Approved handoff Markdown/HTML, historical references and applied migrations are preserved byte-for-byte against the current input hashes; they are immutable exceptions to maintained-document updates. The prior R05 commit 44f405a and its workbook history are preserved. The real Git root is D:/mstar companies/mstar property/mstar property new site; live/ is its local deployable mirror, not a deployed website. All 91 baseline live files are compared before synchronizing intended code/configuration, these nine documents and the same canonical workbook; secrets, runtime state, dependencies and caches are excluded. Final matching hashes and safe origin/main commit/push are verified at closeout; the exact hash is in the final report. Older dated sections below are historical.


Final verification: 36/36 motion browser checks and 91 existing development regression checks passed; five redundant boundary runs were intentionally skipped. Twelve production browser checks passed with samples hidden despite MSTAR_DEMO_MODE=1. Real application/PostgreSQL checks passed: 12 search groups, five development sample groups and six production sample groups. Production build and TypeScript passed. Both languages and 390/768/1024/1280/1440/1600px were covered; screenshots were visually reviewed on phone and desktop. An exit test originally checked after a protocol delay longer than the sheet animation; first-frame browser inspection now verifies inert retained content, duration and eventual removal deterministically. Admin and real enquiry submission remain absent.

The same six-tab workbook retains 86 permanent IDs and all prior history. Only F39 moves from Not started to Done: 21 Done, 23 Pending, 42 Not started. Frontend/Backend/Emails open views are 31/26/8; Done/Pending/Not started contain every ID exactly once. Yellow Pending, light-green Done, red Not started, visible borders, gridlines, formulas, tables, dates, validation and frozen headers are preserved. No separate fix ID duplicates this implementation task. All nine maintained documents are updated. The 94 intended source/config/document/tracker Git/live SHA-256 pairs and origin/main push are verified at final closeout. Unrelated project blockers remain Pending.

Verified HTTP 200 during actual testing: http://127.0.0.1:3000/en, /th, /en/buy, /th/buy, /en/rent, /en/invest, /api/listings?route=buy&lang=en and /api/health (database ready). Test servers on ports 3000 and 5432 are stopped afterward; these links are not currently running. No admin URL exists. Preview remains owner-controlled; an explicitly authorized preview uses the existing local-postgres.ps1 start command and npm run dev. No deployment or migration is performed.

## Tracker status and grid correction — R05 — 2026-10-10

Use the newest tracker-audit record when interpreting statuses. Old “Not yet implemented” planning text inside dated history is not the current status. Inspect Current state and Next step first. Preserve the owner’s two divergent motion-guide revisions and existing next-env.d.ts change; they are outside this task. Step 3C remains unstarted and needs its explicit prompt.

The owner requested a truthful completion audit and visible spreadsheet grid. R05 records this workbook/document correction only. Done means the entire stated task scope is completed with relevant evidence and applicable closeout gates. Pending means work has started but a named deliverable remains, or a real decision/asset/blocker awaits action. Not started means implementation of that task has not begun; an unrequested future stage or a nonexistent wireframe draft is not an approval blocker. Completed decisions do not inherit unrelated future implementation gates.

The same root workbook preserves all 84 existing IDs and their exact prior history text. It adds R05 for this correction and F39 for the newly supplied, unstarted Step 3C motion scope: 86 IDs, 20 Done, 23 Pending and 43 Not started. Frontend/Backend/Emails contain synchronized open views of 32/26/8 records. F02 and B29 are Done owner decisions. F32/F34 are Not started because no draft exists. F21/F22/F23/F31 and B08/B11/B15/B20/B22/B31 move to Pending because they have partial implementation and specific remaining work. B28 stays Pending for the missing exchange-rate source/conversion. F01/F04/F05/F06/F07 and R01 retain their independent closeout blockers. F25 remains Pending for regional tiles.

Current evidence and next actions are refreshed. The history header and prefix explicitly identify earlier states as dated history; old text is retained rather than represented as today's status. Thin visible borders separate every task cell, including coloured rows, and worksheet gridlines are enabled on all six sheets. Yellow Pending, light-green Done and red Not started remain. Existing formulas, table names, filters, date columns and frozen headers are preserved; status validation covers all task rows.

Application code, UI, database schema, migrations and seed are unchanged. No new application, browser or PostgreSQL suite is run for this workbook-only edit. Existing externally started listeners on 3000/5432 were found running and left alone; read-only frontend /en and /api/health requests returned HTTP 200, with health database ok/ready true. These checks establish current availability only, not new feature tests. Admin and real enquiry submission remain absent. This task opens no server and authorizes no Step 3C/4 implementation, deployment or migration.

Before editing, 88 source/live pairs matched; owner-revised BUILD-SPEC and V5 guide differed from live, and next-env.d.ts was already modified. Those three files are preserved and excluded from this correction's commit/synchronization. Only the workbook and nine maintained documents are synchronized after baseline checks. Final export validation, visual review, intended-file SHA-256 pairs and safe commit/origin/main push are checked at closeout; the exact commit is in the final report. Earlier dated sections below remain historical.


## Current Step 3B — R04 — 2026-10-10

Current briefing: Step 3B is implemented and validated. Results have no empty map reserve; the home now has small Airbnb-style topic rows. Config: lib/home-rows-config.ts; server loader: lib/home-listings.ts; UI: components/home-listing-rows.tsx and small-listing-card.tsx. Both cards share lib/saved-homes.ts and listing-format.ts. Results stay in components/search-results.tsx and listing-card.tsx; safe query remains lib/listing-search.ts. No new dependency/schema is needed.

Genuine topic configuration uses Bangkok sale homes, Bangkok rental condos, Bang Lamung for Pattaya/Jomtien homes, and hotel/land investment. These rows currently hide because no genuine stock exists. Guarded local samples use honest fictional topic names and the existing fictional area. They are never reassigned to a real city. The small card’s property destination remains the explicit unfinished Step 5 page; the big card contact dialog still cannot submit until Step 6. Step 7 completes the remaining homepage sections; admin row management awaits its approved stage.

R04 is the completed scoped change; F25 is Pending only for its remaining regional tiles. Preserve prior unresolved owner choices, independent project blockers and all permanent task history. Both ports are stopped. Do not begin Step 4 from this handoff alone.

Verification: 91 development checks covered (66 existing plus 25 new/boundary checks), 18 real-DB fixture browser checks, 12 production browser checks, eight Step 3B DB groups, 12 search groups, five development/six production sample groups, build and TypeScript passed. See testing.md for initial test-harness failures and final evidence.

Step 3B is the only scope completed here. R04 records this owner change and updates F08/F09/F10/B06 without duplicating their IDs. F25 moves to Pending: home topic rows are implemented, but its regional tiles remain Step 7. The overall project and prior Step 0/1 blockers remain Pending. Stop before Step 4; no map, property detail, enquiry submission, account or admin is added.

All nine maintained documents are updated. The owner supplied revised BUILD-SPEC, V5 guide, home-page.html, wireframe.html and wireframe-v3.html before this task. Their current input hashes are preserved; CODEX-PROMPT, historical sources and applied migrations are also unchanged. The old live references match the preceding committed text, so adopting the owner revisions is an intended update, not overwriting divergent work. The 82-file live baseline is rechecked before copying intended source/config/docs/tracker; final SHA-256 pairs, commit and origin/main push are verified at closeout. Secrets, runtime state, dependencies and caches are excluded. The exact commit is in the final report.

The canonical root workbook retains all 83 prior IDs/history and adds R04: 84 IDs, 17 Done, 17 Pending, 50 Not started. Frontend/Backend/Emails remain synchronized open views (32/27/8); Done/Pending/Not started contain each ID exactly once. Pending stays yellow, Done light green and Not started red. If any final gate fails, R04 and affected changed tasks must be marked Pending.

Verified during actual tests: http://127.0.0.1:3000/en, /th, /en/buy, /th/buy, /en/rent, /en/invest, /api/listings?route=buy&lang=en and /api/health. All returned HTTP 200; health was database-ready. Ports 3000 and 5432 are now stopped. Admin and real form submission do not exist; no admin URL or submission proof is invented. No production deployment or migration is performed. Older dated sections below are historical and do not override this record.

## Historical records before Step 3B


## Development-only samples — R03 — 2026-10-10

Latest owner request: development-only fictional listings, each card visibly marked Sample; they must never appear in production or a configured live site. R03 implements this correction to existing Step 3 and links F08/B06. localDemoEnabled and both listing query/metadata boundaries require NODE_ENV=development, flag=1, loopback SITE_URL/Host and named local DB. Production ignores the flag and returns genuine-only inventory/metadata; the fixture rows are unchanged. Use npm run dev for sample review. Older npm run start examples below are production commands and cannot display samples.

Current checks: all 44 development browser checks covered after two initial cold-load retries; eight production checks passed with the flag still enabled; five development/six production actual API/PG checks and 12 search groups passed; build/TypeScript pass. The internal demo=true query/metadata attempt and configured-public-site guard are tested. No new schema or later stage is added. Tracker now has 83 IDs: 16 Done, 16 Pending, 51 Not started, including new Done R03. Servers are stopped; actual URLs remain port 3000, verified during tests. No admin exists. See testing.md/progress.md for precise evidence and current closeout rules.

This owner-requested correction is R03, linked to F08/B06; it does not start Step 4. All nine maintained Markdown and the same six-tab root tracker are updated. Approved handoff Markdown/HTML and historical files remain immutable and hash-verified. Tracker totals are 83 permanent IDs: 16 Done, 16 Pending, 51 Not started; prior IDs/history/statuses are preserved. Git/live starts from 80 matching files; intended source/config/docs/tracker are compared, safely mirrored and hash-verified at finalization, then committed/pushed. Secrets, runtime state, dependencies and caches are excluded. Final report supplies the exact commit. Ports 3000/5432 are stopped after tests; admin remains absent. Older dated records below are historical and do not override this correction.


Updated: 2026-10-10, Asia/Bangkok. Maintained briefing for Claude to review and help Codex. No credentials. Inspect current files and Git status before edits; this snapshot does not authorize additional stages.

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
