# Mstar Property — Claude project handoff

Updated: 2026-10-09, Asia/Bangkok. This is a maintained project briefing for Claude to review and help Codex. It contains no credentials. Verify current files and Git status before making changes; this is a snapshot, not authorization to implement additional stages.

## Current request and scope

The owner asked for this Markdown project handoff after receiving the recreated Excel tracker. Step 3 was explicitly authorized earlier, but no Step 3 implementation has begun. This handoff task changes documentation and tracking only. Help with the authorized stage when requested; do not advance to Step 4 or redesign approved screens.

## Real project locations

| Item | Actual location |
| --- | --- |
| Git working directory | `D:/mstar companies/mstar property/mstar property new site` |
| Local source mirror | `D:/mstar companies/mstar property/mstar property new site/live` |
| Git remote | `https://github.com/Cynicalfocus123/mstar-property-.git` |
| Branch | `main` |
| Canonical tracker | `Mstar-Property-Task-Tracker.xlsx` in the Git root |
| Approved source folder | `codex-handoff/` in the Git root |

`live/` is an ignored local source mirror, not a production deployment. Do not initialize another repository or create another canonical tracker. Before this handoff, the latest pushed commit is `899a97c` (tracker colours); database implementation is `7015d73`. Run `git log -3 --oneline` for the current head after this document is committed.

## Read these sources first

Read all maintained project Markdown before each task: `AGENTS.md`, `MSTAR-CODEX-RULES.md`, `README.md`, `design.md`, `architecture.md`, `database.md`, `testing.md`, `progress.md`, and this file.

Read these approved handoff sources completely before implementation:

1. `codex-handoff/MSTAR-CODEX-PROMPTS-v5.md`: active numbered stage guide. V5 stage numbers take precedence over the older build-order numbering in BUILD-SPEC §16.
2. `codex-handoff/BUILD-SPEC.md`: functionality, design tokens, data and testing requirements.
3. `codex-handoff/CODEX-PROMPT.md`: companion build instructions.
4. `codex-handoff/wireframe.html`: approved Claude V3 desktop/phone design and interactions.
5. `codex-handoff/home-page.html`: full homepage reference, including the Homes for you carousel.

Preserve these approved source files unchanged. Preserve `WIREFRAME.md` and historical `wireframe-v*.html` as history; their forest-green design is superseded. Existing maintained documents contain older dated sections about absent databases, failed tests, or open ports. Their newest dated sections and verified source state take precedence; do not treat historical statements as current.

The original local HTML browser review was blocked by browser policy. Source review and real application screenshots are separate evidence. Do not claim a completed rendered-prototype comparison or bypass the browser restriction.

## Implemented status

| Stage | Honest status |
| --- | --- |
| Step 0 preparation | Pending: V5 tracker-update utility is not in the project; original rendered-reference review remains unverified. |
| Step 1 foundation | Implemented partial shell; closure remains Pending. The latest 16 foundation browser/API checks passed during Step 2. Final logo/contact details and original visual-reference comparison remain unresolved. |
| Step 2 database | Done: B01, B02, B03, B04 and B34; implementation, real tests, documentation, tracker, safe mirror and push verified. |
| Step 3 cards/results/URL filters | Authorized, not implemented. |
| Step 4 and later | Not implemented; do not start under Step 3 authorization. |

The homepage currently has the header, hero/search foundation, and footer. Missing listing sections are expected at this stage. The reusable listing card/results belong to V5 Step 3; the homepage Homes for you carousel belongs to V5 Step 7. Do not claim the full homepage is complete.

No production authentication, admin UI, working enquiry submission, notifications, maps, property details, saved-item workflows or project bookings exist. Navigation destinations currently use explicit unfinished pages.

## Existing application and source map

Use the existing Next.js App Router, TypeScript, PostgreSQL and Drizzle project. Frontend and API share one application; there is no separate backend server.

- Node: `D:/codex system/tools/nodejs/node.exe`, version 24.19.0; npm 11.17.0.
- Exact locked dependencies: Next.js 16.4.0, React 19.3.0, TypeScript 7.0.2, Drizzle ORM 0.45.4, postgres 3.4.9, drizzle-kit 0.31.11, tsx 4.23.15 and Playwright 1.64.0.
- `app/[lang]/layout.tsx`: bilingual shell; `app/[lang]/page.tsx`: partial homepage.
- `app/[lang]/[...path]/page.tsx`: explicit unfinished destinations including buy/rent/invest; no data-backed results yet.
- `components/site-shell.tsx`, `footer.tsx`, `search-field.tsx`, `chat-buttons.tsx`, `ui.tsx`: foundation components.
- `app/globals.css`: approved tokens and responsive styling; `lib/i18n.ts`: Thai/English copy.
- `proxy.ts` and `app/api/preferences/route.ts`: locale/preferences routing and cookies.
- `app/api/health/route.ts`, `lib/db.ts`: real database readiness and server-only access.
- `db/schema.ts`, `db/migrations/`, `db/rollback-initial.sql`: database schema and migrations.
- `scripts/migrate.ts`, `seed.ts`, `test-db.ts`, `db-env.ts`, `local-postgres.ps1`, `provision-db.ts`: guarded database tooling.
- `tests/foundation.spec.ts`, `playwright.config.ts`: existing real-app foundation checks.

Reuse `package.json`, `package-lock.json`, interpreter and configuration. Use focused scans and small changes; never launch the Serena dashboard. Run `.mjs` files with Node, never through Windows file associations.

## Database and security contracts

PostgreSQL 18.6 uses an isolated cluster at `.local/postgres-data`. Portable binaries are at `D:/dev/tmp/mstar-step2/runtime/pgsql/bin`. Databases are `mstar_property_dev` and the separate destructive-test database `mstar_property_step2_test`.

The 18 application tables are agents, locations, stations, projects, unit_types, plots, listings, listing_media, listing_nearby, listing_stations, enquiries, chat_clicks, users, saved_listings, saved_searches, filter_definitions, filter_options and listing_filter_values. There are two migrations: `0000_foundation.sql` and `0001_integrity.sql`. Type-specific constraints, publication states, bilingual content, keys/indexes, hierarchy and typed filter constraints exist.

`mstar_owner` runs migrations; `mstar_app` is a non-superuser, read-only runtime role. The app role currently has SELECT on application tables: server-only access and safe projections remain essential. Do not expose raw table data or privileged credentials to browsers. Future writes need narrow grants and server authorization in their approved stage.

Ignored `.env.local` holds runtime settings; ignored `.local/database.env` holds migration/test settings. Read variable names from `.env.example` and setup details from `database.md`. Never print, include in this handoff, commit or mirror secret values. Do not change a shared main `postgres` administrator password. Only change `mstar_owner`/`mstar_app` passwords if required and authorized within the task.

The repeatable development seed contains 14 CLEARLY FICTIONAL listings, seven property types and both sale/rent intents. Names, prices, distances and agents are examples, not real inventory. The `public.public_listings` view excludes demo records and hides gated prices and hidden exact addresses/coordinates. Consequently the existing seed does not yield genuine public inventory. Step 3 must explicitly solve demo preview/testing without silently making demo stock public or weakening visibility rules. Existing demo media includes an invalid example domain; do not represent it as a working property photo. Seed filter definitions/options are inactive demo metadata, not a published real filter catalogue.

Never rewrite applied migrations. Use reviewed additive migrations, appropriate backups and isolated rollback testing. Do not touch unrelated projects or run destructive tests against the development database.

## Next authorized development work: Step 3

Implement only `/[locale]/buy`, `/rent`, `/invest`, one reusable listing card, and database-backed search/filter URL behavior. Follow BUILD-SPEC §4.3, §5.2 and §7, plus approved card markup/CSS in both HTML references.

The approved card has a white bordered body, 3:2 photo, up to five photos with arrow/swipe/dots, top-left pill badges and a white save-heart circle at the bottom-right of the photo. Saving must not open the card. Show a status dot and property type/intent, large price, rent `/month`, honest price-drop amount, bold type-specific facts, two-line address and Contact agent pill. The contact dialog opens in Step 3; real validated/persisted submission belongs to Step 6. Do not show a fake successful submission.

Results need two listing columns on desktop and one on phone. Reserve the map column without fake map content; mapping is Step 4. Add real database location/type/intent/price/beds/amenities search, safe metadata-managed filters, sorting, query-derived price histogram, popovers/phone sheets, active chips, Clear all, readable headings, empty state and Show more homes. Buy must not use rent-only prices. Preserve refresh, back and forward, shareable URL state and accessibility.

Use shared parameter names from §7 (`loc`, `type`, `min`, `max`, `beds`, `near`, `fq`, `pet`, `sort`, `page`, `bbox` where applicable). Validate all inputs and parameterize queries. Never turn filter metadata into executable SQL. Keep gated prices and hidden exact locations private in result payloads, filters, sorting and histograms. Do not fabricate exchange rates, provider distances, property photographs or agent contacts.

## Design and owner decisions

Use Claude's approved V3 design; do not redesign it. Use BUILD-SPEC §2 CSS variables, white surfaces, Prompt and Noto Sans Thai, a sticky 64px header, rectangular single-line Sign in, and the 720px/1000px breakpoints. New UI without an approved reference needs a wireframe and owner approval first, including authentication/admin screens.

| BUILD-SPEC §12 item | Current owner direction / remaining decision |
| --- | --- |
| 1. Accent (F02) | Use approved wireframe colours/default gold. |
| 2. Logo (F03) | Final header logo supplied later; approved temporary crest exists. |
| 3. Enquiry routing (B17) | Shared inbox versus listing agent remains unresolved. |
| 4. Chat routing (B18) | Build LINE/WhatsApp buttons first; real IDs/numbers and company/per-agent routing remain unresolved. Existing buttons are disabled. |
| 5. Sign-in providers (B23) | LINE only versus LINE + Google + email remains unresolved. |
| 6. Currencies (B28) | USD and THB; store THB. Exchange-rate source/conversion is not implemented. |
| 7. Price visibility (B29) | Admin chooses public versus contact-gated per listing/project; schema supports both. |
| 8. Mapping (B09) | Free/open-source for now; concrete library, tile/nearby provider and usage policy remain unresolved. |

Do not guess unresolved choices. `design.md` is the maintained decision register. Do not confuse the owner's earlier informal answer numbering with the actual eight questions in BUILD-SPEC §12.

## Tests, server policy and actual URLs

Previously verified in Step 2: production build and TypeScript; 16/16 real Playwright browser/API checks in Thai/English at 390, 768, 1024 and 1440px; 12/12 real PostgreSQL groups including migration/seed reruns, inserts/readback, joins, constraints, indexes, privacy/permissions and actual dump/rollback/restore. Health returned 200/ready true, 503 with the database stopped, then 200 after recovery. These are prior test results, not new runs for this documentation task.

No listeners on ports 3000 or 5432 were found during this handoff inspection. Do not open localhost for a documentation task. Start servers only under owner preview authorization or the explicit test permission in the authorized development prompt; stop them after tests unless the owner requests otherwise.

- English frontend: `http://127.0.0.1:3000/en` — configured, currently stopped.
- Thai frontend: `http://127.0.0.1:3000/th` — configured, currently stopped.
- Backend health: `http://127.0.0.1:3000/api/health` — same application, currently stopped.
- Admin: absent; no admin URL.

From the project root, only when server opening/testing is authorized:

```powershell
$env:MSTAR_PG_BIN = 'D:/dev/tmp/mstar-step2/runtime/pgsql/bin'
./scripts/local-postgres.ps1 -Action start
npm run typecheck
npm run build
npm run start
# Run app tests in a second terminal after the app is ready:
$env:PLAYWRIGHT_BROWSERS_PATH = 'D:/dev/playwright'
npm test
# Stop the app process, then stop this isolated database:
./scripts/local-postgres.ps1 -Action stop
```

`npm test` never starts a server automatically. Database migration/seed/test commands are documented in `database.md`; `npm run db:test` uses the dedicated test database. Do not claim a form works until its actual submitted row is verified in PostgreSQL.

## Tracker and completion requirements

The same root workbook has six tabs: Frontend, Backend, Emails, Done, Pending, Not started. There are 81 permanent task IDs: F01–F38, B01–B34, E01–E08 and R01. Totals are 5 Done, 16 Pending, 60 Not started. The Done IDs are B01–B04 and B34. Preserve descriptions, dates, tests, blockers, next actions and append-only history; update existing IDs rather than creating duplicates.

Each ID must appear exactly once among the three status sheets. Category sheets are synchronized open-task views; completed tasks appear only in Done. Preserve yellow Pending (#FFF2CC), light green Done (#C6EFCE), red Not started (#FF6666), tables, formulas, validation and frozen headers. R01 tracks preparation/documentation history and remains Pending for its separate Step 0 blockers.

Before claiming a development task Done:

1. Update every maintained Markdown file accurately, including this handoff; preserve approved immutable sources.
2. Update and verify the same six-tab workbook and permanent task history.
3. Compare Git/live baseline hashes before copying; refuse divergent work. Sync intended source/config/docs/tracker only, excluding `.git`, secrets, dependencies and caches. Verify matching hashes, commit and push the configured remote without force.
4. Run relevant tests against the real app/PostgreSQL, including applicable desktop/phone checks and persisted form proof.
5. Report actual verified frontend/API links and admin only when implemented, including whether test servers were stopped.

If a required gate fails, mark the affected task Pending with the exact blocker and next action. For this documentation-only handoff, runtime/browser/DB retests are not applicable and no new runtime pass is claimed. Do not upgrade the overall project or unresolved task statuses merely because this file exists.

## How Claude can help

Review the approved sources and current code, then identify concrete corrections or implementation guidance for the requested stage. Cite repository-relative files and relevant BUILD-SPEC sections. Distinguish verified behavior, prior test evidence, recommendations and unresolved owner choices. If editing the shared checkout, coordinate file ownership with Codex before overlapping edits and inspect `git diff` to preserve existing work. Do not publish, deploy, message others, or implement later stages from this briefing alone.
