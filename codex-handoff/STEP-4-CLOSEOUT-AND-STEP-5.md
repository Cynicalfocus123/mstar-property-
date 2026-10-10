# Step 4 closeout + Step 5 — Codex handoff (Claude, 11 Oct 2026)

Paste **Prompt A** first. Paste **Prompt B** only after Codex reports Step 4 `Done`.

## What Claude already did (uncommitted in the working tree)

Step 4 was implemented and tested by Claude on 10–11 Oct 2026; it is **not closed out** (docs, production checks, tracker statuses, live/ sync, commit/push remain).

- Owner decisions: B09 map = MapLibre GL JS 6.11.2 + OpenFreeMap tiles (no key); nearby places = OpenStreetMap Thailand extract (Geofabrik) imported into our PostgreSQL, **refreshed monthly** (owner 2026-10-11), new download replaces the old file, one copy at `D:/dev/data/osm/`. B23 customer sign-in = LINE + Google + email. Admin = separate backend with its own login and dashboard (recorded on F34/B26; wireframe first).
- New/changed files: `db/schema.ts` + `db/migrations/0004_map_geo_nearby.sql` (+ snapshot/journal: GiST indexes on listing point and hidden-listing 0.01° area centre, new `osm_places` table), `db/rollback-initial.sql` (drops `osm_places`), `lib/map-config.ts`, `lib/nearby.ts`, `lib/listing-search.ts` (bbox via GiST; `mapPins`), `lib/listing-types.ts` (`MapPin`), `lib/search-state.ts` (`map=1`, bbox rounding), `lib/listing-format.ts` (`compactPrice`), `lib/search-copy.ts`, `components/results-map.tsx`, `components/search-results.tsx`, `app/globals.css` (map styles; `.lcard:hover` shadow moved into the hover/fine-pointer block), `app/api/nearby/route.ts`, `scripts/copy-map-worker.mjs` (predev/prebuild copy of the MapLibre worker to ignored `public/vendor/`), `scripts/osm-pbf.ts`, `scripts/osm-nearby.ts`, `scripts/seed-search.ts` (samples get fictional open-water Gulf of Thailand points; every 4th hidden), `scripts/test-step4.ts`, `tests/step4-map.spec.ts`, updated counts in `scripts/test-search.ts` (5 migrations) and `scripts/test-db.ts` (19 tables), `package.json` (maplibre-gl 6.11.2 pinned; scripts `nearby:download|import|refresh`, `test:step4`), `.gitignore` (`/public/vendor/`).
- Dev database: backup `.local/backups/step4-before-map.dump`, then migration 0004 applied, `db:seed:search` re-run, `nearby:import` run (19,757 places, data date 2026-10-09).
- Tracker: B09 Done, B23 Done; F34/B10/B26 notes updated. F14/F15/B08/B10 statuses still need the closeout update. 88 IDs: 25 Done, 21 Pending, 42 Not started.
- Tests passed (development app + real PostgreSQL): `tests/step4-map.spec.ts` 30/30; full Playwright 205 passed, 5 skipped (the existing Step 3B test "approved breakpoint boundaries include 4/3/2 shared-card home rows and 3/2/1 results" at 390/768/1024/1280/1440px — it runs once at 1600px by design); `test:step4` 7/7 groups; `test:search` 12/12; `db:test` 12/12; `test:step3b` 8/8.
- Not built: "Draw area" (MapLibre has no built-in draw tool; V5 says only when the library supports it). Map pins are not clustered (overlap when zoomed far out).
- Do **not** commit the four debug files in the project root: `dbg-pbf.ts`, `dbg-reader.ts`, `dbg2.ts`, `dbg3.ts` (owner decides on deleting them).

---

## Prompt A — Step 4 closeout

```text
$caveman full — Mstar Property | Step 4 closeout (implemented by Claude, close it out)

PRE-FLIGHT: Read all maintained project .md files including CLAUDE.md, codex-handoff/STEP-4-CLOSEOUT-AND-STEP-5.md (what Claude built and tested), BUILD-SPEC.md §5.2 and §8, and MSTAR-CODEX-PROMPTS-v5.md Step 4. Inspect git status and git diff. Small diffs, capped logs, no Serena dashboard. Do only this step. Do not rewrite Claude's Step 4 implementation; fix only real defects you find and report them.

1. Review the Step 4 diff against BUILD-SPEC §5.2/§8 and the V5 Step 4 prompt. Report anything that does not match.
2. Production checks: npm run build (prebuild copies the MapLibre worker), npm run start, then verify on the production app: results pages with map=1 load the map (worker served from /vendor/maplibre/6.11.2/), genuine inventory shows the "no map location" note, samples never appear even with MSTAR_DEMO_MODE=1, /api/nearby returns 404 for sample codes, health OK. Run the existing production sample checks (npm run test:samples and the production Playwright subset used in earlier steps).
3. Re-run on the development app: tests/step4-map.spec.ts, npm run test:step4, npm run test:search, npm run db:test. List every skipped test by name with its reason — never only a count.
4. Tracker (same root workbook, exactly one copy): F14 desktop split/highlight and F15 phone Map/List → Done if all gates pass; B08 geospatial index/bbox/hidden privacy → Done; B10 nearby ingest + monthly refresh → Done (note: automatic monthly task on the PC and delete-after-import are owner decisions still open — record them, do not create a scheduled task); add F39 history line for the .lcard:hover fix. Keep B09/B23 Done as recorded by Claude.
5. Record owner decisions in design.md and every maintained .md: B09 (MapLibre + OpenFreeMap + OSM import), B23 (LINE + Google + email), monthly nearby refresh replacing the previous file, separate admin backend with its own login/dashboard and map-based address entry (future Steps 10/11, wireframe first), "Draw area" not built (library has no built-in draw).
6. Do not commit dbg-pbf.ts, dbg-reader.ts, dbg2.ts, dbg3.ts and do not delete them (owner decides).

### Mandatory completion contract — do this at the end of THIS prompt
- **All maintained `.md` files:** read first, then update `AGENTS.md`, `README.md`, `design.md`, `architecture.md`, `database.md`, `testing.md`, `progress.md`, `MSTAR-CODEX-RULES.md`, `CLAUDE.md` and any other maintained project Markdown. Leave approved immutable handoff source unchanged, but document that exception. **No MD verification = NOT DONE.**
- **Six-tab Excel:** update the SAME root `Mstar-Property-Task-Tracker.xlsx`; update permanent task IDs, new fix IDs if needed, work/test evidence and blockers; regenerate `Frontend`, `Backend`, `Emails`, `Done`, `Pending`, `Not started` with accurate counts, each ID exactly once among status sheets. **No Excel update = NOT DONE.**
- **Git and live:** synchronize all relevant code, configs, docs and tracker between the real Git working tree and `live/` without overwriting conflicts or copying secrets; verify diffs/hashes. Commit and push via existing remote when possible. **No verified sync/push = Pending, not Done.**
- **Tests:** test this step on actual running frontend/backend and PostgreSQL, desktop + phone when applicable. Record exact outcomes and DB proof for forms. **Untested = NOT DONE.**
- **Dev server:** start it only to run this step's tests and stop it afterwards. Don't leave it running unless I ask.
- **Localhost URLs:** provide the **verified working** frontend URL, backend API/health URL and admin URL only if admin really exists. Use actual configured ports, no invented links. If inaccessible from this environment, explain the blocker and reproducible command, and mark the gate Pending.
- Finish with task IDs, modifications, all MD files, all six Excel sheets/status changes, tests, Git commit/push/sync, URLs, and one explicit status: `Done` only if EVERY gate passed, otherwise `Pending` with next action. Stop—do not begin the next step.
```

---

## Prompt B — Step 5 property page

```text
$caveman full — Mstar Property | Step 5: Property details, gallery, facts and mortgage

PRE-FLIGHT: Read all maintained project .md files including CLAUDE.md, codex-handoff/STEP-4-CLOSEOUT-AND-STEP-5.md, the complete codex-handoff/BUILD-SPEC.md (§5.3, §8, §10), codex-handoff/CODEX-PROMPT.md, MSTAR-CODEX-RULES.md, codex-handoff/wireframe.html (Property screen) and codex-handoff/home-page.html. Inspect the actual Git and live/ directories. Follow the approved V3 design, no invented UI. Token saving: small diffs, capped logs, no Serena dashboard, reuse existing project config. Do only this step.

Requires Step 4 Done (closeout committed). Use the shared motion system (lib/motion.ts + CSS tokens) for the gallery, lightbox, photo swipe and tabs. Build /[locale]/property/[id]-[slug] (the current card link /[lang]/property/[code]-[slug] leads to the unfinished placeholder — replace it) per BUILD-SPEC §5.3 and the Property screen in wireframe.html:
- Top row: ← Back to results (returns to the same search URL, including map=1/bbox), Share (LINE, Facebook, WhatsApp, copy link), Save (same device storage as the card hearts, lib/saved-homes.ts).
- Desktop photo grid: 1 large + 4 small, "Show all N photos" opens a full-screen gallery (grid + lightbox with arrows and counter, "Email agent" button in its header). Phone: one swipeable photo with a counter.
- Badges, title, full address (unless hidden), listing ID and the key-facts row by type, reusing lib/listing-format.ts (condo / house / land / hotel as in §5.3 item 3).
- Section tabs that stay at the top and follow the scroll: Overview, Facts, Floor plan, Nearby, Costs, Project.
- Description clamped to 5 lines with Read more; Thai and English stored separately.
- Price check only when enough real comparable listings exist (minimum sample in config); otherwise hide the block. Never invent averages or yields.
- Facts and features table; Floor plan / Video tour / 360° tabs only when that content exists.
- Nearby: tabs Transit / Schools / Shopping / Hospitals from the Step 4 data — lib/nearby.ts / GET /api/nearby?listing=<code>&lang=th|en (imported OpenStreetMap places, monthly refresh). Show "Distances are approximate" and "© OpenStreetMap contributors"; hide a tab with no places; never type places in by hand. Small map: reuse the Step 4 MapLibre setup (lib/map-config.ts, worker copy, Thai/English label localisation, attribution) by extracting a shared helper from components/results-map.tsx rather than duplicating it. Hidden-location listings: area circle from the 0.01° rounded centre only — the exact point and exact address never reach the browser, page HTML or JSON.
- Monthly cost sliders with the exact §10 formula plus the common fee line.
- "More units in this project" and "Similar homes nearby" (same area, type and sale/rent, price within ±25%, fall back to the same city if fewer than 3) — use the shared ListingCard (Step 3E one-card rule; SmallListingCard stays unused) in the shared home-rail layout.
- Contact box on desktop (right column, sticky) and phone bottom bar (price + monthly estimate, LINE, WhatsApp, Email agent) laid out exactly as §5.3 item 13, but sending stays disabled with a clear note until Step 6. No calendar on listing pages.
Gated prices and hidden locations stay private everywhere on the page and in its data. Sample listings stay development-only (existing guard) and keep their Sample badge.
SEO basics for this page: unique title/description, canonical, hreflang th/en (JSON-LD can follow in Step 12).

Tests: layout at 390/768/1024/1280/1440/1600, each property type's facts, mortgage formula unit test, gallery keyboard and swipe, tabs scroll, back-to-results keeps filters and map state, nearby tabs from real PostgreSQL data (use a temporary test-only sample near a real place like scripts/test-step4.ts does, removed afterwards), hidden-location privacy in page HTML and data, production hides samples, both languages. List every skipped test by name with its reason — never only a count.

### Mandatory completion contract — do this at the end of THIS prompt
- **All maintained `.md` files:** read first, then update `AGENTS.md`, `README.md`, `design.md`, `architecture.md`, `database.md`, `testing.md`, `progress.md`, `MSTAR-CODEX-RULES.md`, `CLAUDE.md` and any other maintained project Markdown. Leave approved immutable handoff source unchanged, but document that exception. **No MD verification = NOT DONE.**
- **Six-tab Excel:** update the SAME root `Mstar-Property-Task-Tracker.xlsx`; update permanent task IDs, new fix IDs if needed, work/test evidence and blockers; regenerate `Frontend`, `Backend`, `Emails`, `Done`, `Pending`, `Not started` with accurate counts, each ID exactly once among status sheets. **No Excel update = NOT DONE.**
- **Git and live:** synchronize all relevant code, configs, docs and tracker between the real Git working tree and `live/` without overwriting conflicts or copying secrets; verify diffs/hashes. Commit and push via existing remote when possible. **No verified sync/push = Pending, not Done.**
- **Tests:** test this step on actual running frontend/backend and PostgreSQL, desktop + phone when applicable. Record exact outcomes and DB proof for forms. **Untested = NOT DONE.**
- **Dev server:** start it only to run this step's tests and stop it afterwards. Don't leave it running unless I ask.
- **Localhost URLs:** provide the **verified working** frontend URL, backend API/health URL and admin URL only if admin really exists. Use actual configured ports, no invented links. If inaccessible from this environment, explain the blocker and reproducible command, and mark the gate Pending.
- Finish with task IDs, modifications, all MD files, all six Excel sheets/status changes, tests, Git commit/push/sync, URLs, and one explicit status: `Done` only if EVERY gate passed, otherwise `Pending` with next action. Stop—do not begin the next step.
```
