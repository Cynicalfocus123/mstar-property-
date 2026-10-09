# Mstar Property — Codex V5 prompt pack

**How to use:** Put this entire package in your actual project folder. Paste ONE stage prompt at a time into Codex. Each stage contains the complete mandatory rules: update `.md`, update the six-tab Excel workbook, sync Git/live, test, and show real localhost URLs. Do not use the old green wireframe.

**Source of truth:** `codex-handoff/BUILD-SPEC.md`, `codex-handoff/wireframe.html` and `codex-handoff/home-page.html` (approved V3, updated 9 Oct 2026 with Realtor-style listing cards and the "Homes for you" carousel under the home search box); companion `MSTAR-CODEX-RULES.md` in the project root.
**Tracker:** `Mstar-Property-Task-Tracker.xlsx` in the project root (the one Codex already uses; don't create a second copy).

**Changes from V4:** fixed file paths; Step 3 uses the new Realtor-style listing card (BUILD-SPEC §4.3); Step 4 follows the owner's choice of free open-source mapping; Step 6 adds the Contact agent dialog on cards; Step 7 adds the "Homes for you" carousel directly under the search box and removes "no invented carousel"; footer is light grey; dev servers are not left running.

**Important:** Do not falsely claim Git push, `live/` synchronization, runnable localhost preview, or completed database tests if Codex does not have access. A blocked task is Pending.

---

## Step 0 — Project inspection, rules and tracking automation

Copy the entire block below into Codex:

```text
$caveman full — Mstar Property | Step 0: Project inspection, rules and tracking automation

PRE-FLIGHT: Read all maintained project .md files and the complete codex-handoff/BUILD-SPEC.md, codex-handoff/CODEX-PROMPT.md, MSTAR-CODEX-RULES.md (project root), codex-handoff/wireframe.html and codex-handoff/home-page.html. Inspect the actual Git and live/ directories. Follow the approved V3 design, no invented UI. Token saving: small diffs, capped logs, no Serena dashboard, reuse existing project config. Do only this step.

Inspect existing project, handoff files, directory structure, Git repository, live folder, existing code and all maintained Markdown. Preserve existing work. Keep the six-tab Excel workbook at the root `Mstar-Property-Task-Tracker.xlsx` and do not discard a newer existing tracker. Create/update root `AGENTS.md` using `MSTAR-CODEX-RULES.md`, and maintain `README.md`, `design.md`, `architecture.md`, `database.md`, `testing.md`, `progress.md`.
Build a small reliable tracker-update utility (in the project's existing language/tooling) that can move one stable ID between the three status sheets, regenerate frontend/backend/emails open views and counts, preserve formatting, and validate duplicate/missing IDs. Test that utility on a copy without changing genuine task history. Inspect and list all eight owner decisions in BUILD-SPEC §12. Make no application UI changes. Do not initialize a new Git repository without explicit consent.

### Mandatory completion contract — do this at the end of THIS prompt
- **All maintained `.md` files:** read first, then update `AGENTS.md`, `README.md`, `design.md`, `architecture.md`, `database.md`, `testing.md`, `progress.md` and any other maintained project Markdown. Leave approved immutable handoff source unchanged, but document that exception. **No MD verification = NOT DONE.**
- **Six-tab Excel:** update the SAME root `Mstar-Property-Task-Tracker.xlsx`; update permanent task IDs, new fix IDs if needed, work/test evidence and blockers; regenerate `Frontend`, `Backend`, `Emails`, `Done`, `Pending`, `Not started` with accurate counts, each ID exactly once among status sheets. **No Excel update = NOT DONE.**
- **Git and live:** synchronize all relevant code, configs, docs and tracker between the real Git working tree and `live/` without overwriting conflicts or copying secrets; verify diffs/hashes. Commit and push via existing remote when possible. **No verified sync/push = Pending, not Done.**
- **Tests:** test this step on actual running frontend/backend and PostgreSQL, desktop + phone when applicable. Record exact outcomes and DB proof for forms. **Untested = NOT DONE.**
- **Dev server:** start it only to run this step's tests and stop it afterwards. Don't leave it running unless I ask.
- **Localhost URLs:** provide the **verified working** frontend URL, backend API/health URL and admin URL only if admin really exists. Use actual configured ports, no invented links. If inaccessible from this environment, explain the blocker and reproducible command, and mark the gate Pending.
- Finish with task IDs, modifications, all MD files, all six Excel sheets/status changes, tests, Git commit/push/sync, URLs, and one explicit status: `Done` only if EVERY gate passed, otherwise `Pending` with next action. Stop—do not begin the next step.
```

---

## Step 1 — Design tokens, responsive shell and locale routing

Copy the entire block below into Codex:

```text
$caveman full — Mstar Property | Step 1: Design tokens, responsive shell and locale routing

PRE-FLIGHT: Read all maintained project .md files and the complete codex-handoff/BUILD-SPEC.md, codex-handoff/CODEX-PROMPT.md, MSTAR-CODEX-RULES.md (project root), codex-handoff/wireframe.html and codex-handoff/home-page.html. Inspect the actual Git and live/ directories. Follow the approved V3 design, no invented UI. Token saving: small diffs, capped logs, no Serena dashboard, reuse existing project config. Do only this step.

Implement Next.js App Router + TypeScript global foundation. Match BUILD-SPEC §§1–4, 9 and the approved v3 `wireframe.html`: light-only tokens, Prompt/Noto Sans Thai, 64px sticky header, rectangular single-line Sign in, desktop navigation, phone tab bar, light grey (`--soft`) footer, reusable accessible UI elements. Add `/th` and `/en` locale routing, preference cookie and localized text. Use placeholder crest ONLY as permitted; do not decide final color/logo. Responsive breakpoints ≤720, 721–1000, >1000. Test 390/768/1024/1440 widths, focus, navigation, overflow, Thai/English. Stop at shell; no fake functional pages.

### Mandatory completion contract — do this at the end of THIS prompt
- **All maintained `.md` files:** read first, then update `AGENTS.md`, `README.md`, `design.md`, `architecture.md`, `database.md`, `testing.md`, `progress.md` and any other maintained project Markdown. Leave approved immutable handoff source unchanged, but document that exception. **No MD verification = NOT DONE.**
- **Six-tab Excel:** update the SAME root `Mstar-Property-Task-Tracker.xlsx`; update permanent task IDs, new fix IDs if needed, work/test evidence and blockers; regenerate `Frontend`, `Backend`, `Emails`, `Done`, `Pending`, `Not started` with accurate counts, each ID exactly once among status sheets. **No Excel update = NOT DONE.**
- **Git and live:** synchronize all relevant code, configs, docs and tracker between the real Git working tree and `live/` without overwriting conflicts or copying secrets; verify diffs/hashes. Commit and push via existing remote when possible. **No verified sync/push = Pending, not Done.**
- **Tests:** test this step on actual running frontend/backend and PostgreSQL, desktop + phone when applicable. Record exact outcomes and DB proof for forms. **Untested = NOT DONE.**
- **Dev server:** start it only to run this step's tests and stop it afterwards. Don't leave it running unless I ask.
- **Localhost URLs:** provide the **verified working** frontend URL, backend API/health URL and admin URL only if admin really exists. Use actual configured ports, no invented links. If inaccessible from this environment, explain the blocker and reproducible command, and mark the gate Pending.
- Finish with task IDs, modifications, all MD files, all six Excel sheets/status changes, tests, Git commit/push/sync, URLs, and one explicit status: `Done` only if EVERY gate passed, otherwise `Pending` with next action. Stop—do not begin the next step.
```

---

## Step 2 — PostgreSQL/Drizzle schema and seed

Copy the entire block below into Codex:

```text
$caveman full — Mstar Property | Step 2: PostgreSQL/Drizzle schema and seed

PRE-FLIGHT: Read all maintained project .md files and the complete codex-handoff/BUILD-SPEC.md, codex-handoff/CODEX-PROMPT.md, MSTAR-CODEX-RULES.md (project root), codex-handoff/wireframe.html and codex-handoff/home-page.html. Inspect the actual Git and live/ directories. Follow the approved V3 design, no invented UI. Token saving: small diffs, capped logs, no Serena dashboard, reuse existing project config. Do only this step.

Implement schema/migrations for agents, locations, stations, projects, unit types, plots, listings, listing media, nearby, enquiries, chat clicks, users, saved homes/searches and future admin-managed filter definitions/options. Enforce type-specific constraints, proper keys/indexes, status/publish states, locale content, secure server access. Seed CLEARLY FICTIONAL data; never present as real properties, agents or prices. Test migrations, rollback, inserts, joins, indexes and seed on real development PostgreSQL. Document migrations and DB connection setup.

### Mandatory completion contract — do this at the end of THIS prompt
- **All maintained `.md` files:** read first, then update `AGENTS.md`, `README.md`, `design.md`, `architecture.md`, `database.md`, `testing.md`, `progress.md` and any other maintained project Markdown. Leave approved immutable handoff source unchanged, but document that exception. **No MD verification = NOT DONE.**
- **Six-tab Excel:** update the SAME root `Mstar-Property-Task-Tracker.xlsx`; update permanent task IDs, new fix IDs if needed, work/test evidence and blockers; regenerate `Frontend`, `Backend`, `Emails`, `Done`, `Pending`, `Not started` with accurate counts, each ID exactly once among status sheets. **No Excel update = NOT DONE.**
- **Git and live:** synchronize all relevant code, configs, docs and tracker between the real Git working tree and `live/` without overwriting conflicts or copying secrets; verify diffs/hashes. Commit and push via existing remote when possible. **No verified sync/push = Pending, not Done.**
- **Tests:** test this step on actual running frontend/backend and PostgreSQL, desktop + phone when applicable. Record exact outcomes and DB proof for forms. **Untested = NOT DONE.**
- **Dev server:** start it only to run this step's tests and stop it afterwards. Don't leave it running unless I ask.
- **Localhost URLs:** provide the **verified working** frontend URL, backend API/health URL and admin URL only if admin really exists. Use actual configured ports, no invented links. If inaccessible from this environment, explain the blocker and reproducible command, and mark the gate Pending.
- Finish with task IDs, modifications, all MD files, all six Excel sheets/status changes, tests, Git commit/push/sync, URLs, and one explicit status: `Done` only if EVERY gate passed, otherwise `Pending` with next action. Stop—do not begin the next step.
```

---

## Step 3 — Property cards, results and URL filters

Copy the entire block below into Codex:

```text
$caveman full — Mstar Property | Step 3: Property cards, results and URL filters

PRE-FLIGHT: Read all maintained project .md files and the complete codex-handoff/BUILD-SPEC.md, codex-handoff/CODEX-PROMPT.md, MSTAR-CODEX-RULES.md (project root), codex-handoff/wireframe.html and codex-handoff/home-page.html. Inspect the actual Git and live/ directories. Follow the approved V3 design, no invented UI. Token saving: small diffs, capped logs, no Serena dashboard, reuse existing project config. Do only this step.

Requires Step 2 Done (PostgreSQL running and seeded). Build `/[locale]/buy`, `/rent`, `/invest` and ONE reusable listing card exactly as BUILD-SPEC §4.3 and the cards in wireframe.html / home-page.html (Realtor.com style): white bordered card, 3:2 photo with up to 5 photos, next-photo arrow + swipe, dots, pill badges top-left, white heart circle bottom-right of the photo (saves without opening the card), status dot + "Condo for sale"/"Land for sale"/"Hotel for sale"/"Condo for rent", large price with "/month" for rent and green "↓ ฿200k" price drop, bold type-specific facts row (residential bed/bath/m²/distance to BTS; land rai/ngan/m²/road; hotel rooms/occupancy/land), two-line address, and a Contact agent pill button (opens the contact dialog; the dialog's submit is wired in Step 6). Results list uses this card in 2 columns on desktop, 1 on phone. Keep space for the map column but don't show fake map content (map is Step 4). Add real DB-backed location/type/intent/price/beds/amenities search, sorting (Newest, Price low–high, Price high–low, Size, Nearest BTS), safe filters managed by database definitions, responsive filter popovers/full-screen sheet, histogram generated from actual query, active chips and Clear all, readable results heading (e.g. "Condos for sale in Sukhumvit"), empty state, Show more homes. Use BUILD-SPEC §7 shared URL state, preserve refresh/back/forward, accessible controls. Buy must not show rent-only prices. Test real DB search and URL interactions on desktop/phone.

### Mandatory completion contract — do this at the end of THIS prompt
- **All maintained `.md` files:** read first, then update `AGENTS.md`, `README.md`, `design.md`, `architecture.md`, `database.md`, `testing.md`, `progress.md` and any other maintained project Markdown. Leave approved immutable handoff source unchanged, but document that exception. **No MD verification = NOT DONE.**
- **Six-tab Excel:** update the SAME root `Mstar-Property-Task-Tracker.xlsx`; update permanent task IDs, new fix IDs if needed, work/test evidence and blockers; regenerate `Frontend`, `Backend`, `Emails`, `Done`, `Pending`, `Not started` with accurate counts, each ID exactly once among status sheets. **No Excel update = NOT DONE.**
- **Git and live:** synchronize all relevant code, configs, docs and tracker between the real Git working tree and `live/` without overwriting conflicts or copying secrets; verify diffs/hashes. Commit and push via existing remote when possible. **No verified sync/push = Pending, not Done.**
- **Tests:** test this step on actual running frontend/backend and PostgreSQL, desktop + phone when applicable. Record exact outcomes and DB proof for forms. **Untested = NOT DONE.**
- **Dev server:** start it only to run this step's tests and stop it afterwards. Don't leave it running unless I ask.
- **Localhost URLs:** provide the **verified working** frontend URL, backend API/health URL and admin URL only if admin really exists. Use actual configured ports, no invented links. If inaccessible from this environment, explain the blocker and reproducible command, and mark the gate Pending.
- Finish with task IDs, modifications, all MD files, all six Excel sheets/status changes, tests, Git commit/push/sync, URLs, and one explicit status: `Done` only if EVERY gate passed, otherwise `Pending` with next action. Stop—do not begin the next step.
```

---

## Step 4 — Interactive map and nearby data integration

Copy the entire block below into Codex:

```text
$caveman full — Mstar Property | Step 4: Interactive map and nearby data integration

PRE-FLIGHT: Read all maintained project .md files and the complete codex-handoff/BUILD-SPEC.md, codex-handoff/CODEX-PROMPT.md, MSTAR-CODEX-RULES.md (project root), codex-handoff/wireframe.html and codex-handoff/home-page.html. Inspect the actual Git and live/ directories. Follow the approved V3 design, no invented UI. Token saving: small diffs, capped logs, no Serena dashboard, reuse existing project config. Do only this step.

The owner chose free, open-source mapping (design.md B09). Propose 2–3 concrete free options (e.g. a MapLibre-based map with an OpenStreetMap-based tile source, and a free source for nearby places), with each one's usage limits and policy, and wait for the owner to pick one. No paid provider and no invented provider. Create list+map desktop results view with hover/focus card↔pin synchronization, bounds in URL, Search as I move map, draw area when supported, and mobile Map/List toggle. Implement geo-indexed bounds query and `hide_exact_location` safe public handling. Nearby Transit/Schools/Shopping/Hospitals from provider, provenance, cache and 90-day refresh. If provider keys aren't available, implement independent database/API contract and report precise blocker; never label fake maps or distances as real. Test on real devices and database.

### Mandatory completion contract — do this at the end of THIS prompt
- **All maintained `.md` files:** read first, then update `AGENTS.md`, `README.md`, `design.md`, `architecture.md`, `database.md`, `testing.md`, `progress.md` and any other maintained project Markdown. Leave approved immutable handoff source unchanged, but document that exception. **No MD verification = NOT DONE.**
- **Six-tab Excel:** update the SAME root `Mstar-Property-Task-Tracker.xlsx`; update permanent task IDs, new fix IDs if needed, work/test evidence and blockers; regenerate `Frontend`, `Backend`, `Emails`, `Done`, `Pending`, `Not started` with accurate counts, each ID exactly once among status sheets. **No Excel update = NOT DONE.**
- **Git and live:** synchronize all relevant code, configs, docs and tracker between the real Git working tree and `live/` without overwriting conflicts or copying secrets; verify diffs/hashes. Commit and push via existing remote when possible. **No verified sync/push = Pending, not Done.**
- **Tests:** test this step on actual running frontend/backend and PostgreSQL, desktop + phone when applicable. Record exact outcomes and DB proof for forms. **Untested = NOT DONE.**
- **Dev server:** start it only to run this step's tests and stop it afterwards. Don't leave it running unless I ask.
- **Localhost URLs:** provide the **verified working** frontend URL, backend API/health URL and admin URL only if admin really exists. Use actual configured ports, no invented links. If inaccessible from this environment, explain the blocker and reproducible command, and mark the gate Pending.
- Finish with task IDs, modifications, all MD files, all six Excel sheets/status changes, tests, Git commit/push/sync, URLs, and one explicit status: `Done` only if EVERY gate passed, otherwise `Pending` with next action. Stop—do not begin the next step.
```

---

## Step 5 — Property details, gallery, facts and mortgage

Copy the entire block below into Codex:

```text
$caveman full — Mstar Property | Step 5: Property details, gallery, facts and mortgage

PRE-FLIGHT: Read all maintained project .md files and the complete codex-handoff/BUILD-SPEC.md, codex-handoff/CODEX-PROMPT.md, MSTAR-CODEX-RULES.md (project root), codex-handoff/wireframe.html and codex-handoff/home-page.html. Inspect the actual Git and live/ directories. Follow the approved V3 design, no invented UI. Token saving: small diffs, capped logs, no Serena dashboard, reuse existing project config. Do only this step.

Build `/[locale]/property/[id]-[slug]` matching BUILD-SPEC §5.3: back to previous results, Share/Save, desktop 1+4 photo grid, phone swipe, full-screen image viewer/counter, listing title/address/ID, conditional facts for condo/house/land/hotel, sticky scroll-tracked tabs, bilingual description, price comparisons ONLY with sufficient verified comps, facts, floorplan/video/360 only when present, real nearby provider data, mortgage sliders and exact §10 formula, more project units, similar homes within ±25% and location fallback. No calendar on listing pages. Leave enquiry submit wiring for Step 6. Test visual breakpoints, data correctness and calculator formula.

### Mandatory completion contract — do this at the end of THIS prompt
- **All maintained `.md` files:** read first, then update `AGENTS.md`, `README.md`, `design.md`, `architecture.md`, `database.md`, `testing.md`, `progress.md` and any other maintained project Markdown. Leave approved immutable handoff source unchanged, but document that exception. **No MD verification = NOT DONE.**
- **Six-tab Excel:** update the SAME root `Mstar-Property-Task-Tracker.xlsx`; update permanent task IDs, new fix IDs if needed, work/test evidence and blockers; regenerate `Frontend`, `Backend`, `Emails`, `Done`, `Pending`, `Not started` with accurate counts, each ID exactly once among status sheets. **No Excel update = NOT DONE.**
- **Git and live:** synchronize all relevant code, configs, docs and tracker between the real Git working tree and `live/` without overwriting conflicts or copying secrets; verify diffs/hashes. Commit and push via existing remote when possible. **No verified sync/push = Pending, not Done.**
- **Tests:** test this step on actual running frontend/backend and PostgreSQL, desktop + phone when applicable. Record exact outcomes and DB proof for forms. **Untested = NOT DONE.**
- **Dev server:** start it only to run this step's tests and stop it afterwards. Don't leave it running unless I ask.
- **Localhost URLs:** provide the **verified working** frontend URL, backend API/health URL and admin URL only if admin really exists. Use actual configured ports, no invented links. If inaccessible from this environment, explain the blocker and reproducible command, and mark the gate Pending.
- Finish with task IDs, modifications, all MD files, all six Excel sheets/status changes, tests, Git commit/push/sync, URLs, and one explicit status: `Done` only if EVERY gate passed, otherwise `Pending` with next action. Stop—do not begin the next step.
```

---

## Step 6 — Agent enquiries, LINE and WhatsApp

Copy the entire block below into Codex:

```text
$caveman full — Mstar Property | Step 6: Agent enquiries, LINE and WhatsApp

PRE-FLIGHT: Read all maintained project .md files and the complete codex-handoff/BUILD-SPEC.md, codex-handoff/CODEX-PROMPT.md, MSTAR-CODEX-RULES.md (project root), codex-handoff/wireframe.html and codex-handoff/home-page.html. Inspect the actual Git and live/ directories. Follow the approved V3 design, no invented UI. Token saving: small diffs, capped logs, no Serena dashboard, reuse existing project config. Do only this step.

Build actual sticky desktop agent form, phone bottom contact bar (price, LINE, WhatsApp, Email agent), and the Contact agent dialog opened from every listing card. The card dialog and the property-page form use the same component and the same server action. Name/email/phone/message (prefilled property title/ID), loan-help checkbox and PDPA text. Server validates, rate-limits, honeypot, persists enquiry FIRST, then queues agent notification with retry, sends localized buyer acknowledgment, records consent version/source/UTM/lang and chat_click events. LINE/WhatsApp URLs reflect owner's approved per-company or per-agent routing. Do not invent destination IDs/inboxes. End-to-end test real PostgreSQL row AND notification queue before reporting success. Test desktop/phone and rate limits.

### Mandatory completion contract — do this at the end of THIS prompt
- **All maintained `.md` files:** read first, then update `AGENTS.md`, `README.md`, `design.md`, `architecture.md`, `database.md`, `testing.md`, `progress.md` and any other maintained project Markdown. Leave approved immutable handoff source unchanged, but document that exception. **No MD verification = NOT DONE.**
- **Six-tab Excel:** update the SAME root `Mstar-Property-Task-Tracker.xlsx`; update permanent task IDs, new fix IDs if needed, work/test evidence and blockers; regenerate `Frontend`, `Backend`, `Emails`, `Done`, `Pending`, `Not started` with accurate counts, each ID exactly once among status sheets. **No Excel update = NOT DONE.**
- **Git and live:** synchronize all relevant code, configs, docs and tracker between the real Git working tree and `live/` without overwriting conflicts or copying secrets; verify diffs/hashes. Commit and push via existing remote when possible. **No verified sync/push = Pending, not Done.**
- **Tests:** test this step on actual running frontend/backend and PostgreSQL, desktop + phone when applicable. Record exact outcomes and DB proof for forms. **Untested = NOT DONE.**
- **Dev server:** start it only to run this step's tests and stop it afterwards. Don't leave it running unless I ask.
- **Localhost URLs:** provide the **verified working** frontend URL, backend API/health URL and admin URL only if admin really exists. Use actual configured ports, no invented links. If inaccessible from this environment, explain the blocker and reproducible command, and mark the gate Pending.
- Finish with task IDs, modifications, all MD files, all six Excel sheets/status changes, tests, Git commit/push/sync, URLs, and one explicit status: `Done` only if EVERY gate passed, otherwise `Pending` with next action. Stop—do not begin the next step.
```

---

## Step 7 — Photography-first homepage and shared search

Copy the entire block below into Codex:

```text
$caveman full — Mstar Property | Step 7: Photography-first homepage and shared search

PRE-FLIGHT: Read all maintained project .md files and the complete codex-handoff/BUILD-SPEC.md, codex-handoff/CODEX-PROMPT.md, MSTAR-CODEX-RULES.md (project root), codex-handoff/wireframe.html and codex-handoff/home-page.html. Inspect the actual Git and live/ directories. Follow the approved V3 design, no invented UI. Token saving: small diffs, capped logs, no Serena dashboard, reuse existing project config. Do only this step.

Build exactly the V3 homepage per BUILD-SPEC §5.1 and codex-handoff/home-page.html, in this order: one photo hero; four-tab Buy/Rent/New Projects/Investment search with grouped location suggestions; **"Homes for you" listing carousel DIRECTLY under the search box** (tabs For sale/For rent/New listings/Price reduced/Investment, ‹ › arrows, See all, the Step 3 listing card, 3 visible on desktop, 2 on narrow desktop, about 1.1 on phone with swipe and scroll-snap, admin-featured first then newest, up to 12 per tab); category icon rail; conditional Continue your search; area tiles with real listing counts; Mstar projects; tools; owner services; footer. Reuse the EXACT same typed filter definitions/URL query semantics as results. Phone collapses search to Where? and full-screen sheet; no dark hero, no hero slider. Optimize images/LCP. Test home→search results→listing across desktop/phone.

### Mandatory completion contract — do this at the end of THIS prompt
- **All maintained `.md` files:** read first, then update `AGENTS.md`, `README.md`, `design.md`, `architecture.md`, `database.md`, `testing.md`, `progress.md` and any other maintained project Markdown. Leave approved immutable handoff source unchanged, but document that exception. **No MD verification = NOT DONE.**
- **Six-tab Excel:** update the SAME root `Mstar-Property-Task-Tracker.xlsx`; update permanent task IDs, new fix IDs if needed, work/test evidence and blockers; regenerate `Frontend`, `Backend`, `Emails`, `Done`, `Pending`, `Not started` with accurate counts, each ID exactly once among status sheets. **No Excel update = NOT DONE.**
- **Git and live:** synchronize all relevant code, configs, docs and tracker between the real Git working tree and `live/` without overwriting conflicts or copying secrets; verify diffs/hashes. Commit and push via existing remote when possible. **No verified sync/push = Pending, not Done.**
- **Tests:** test this step on actual running frontend/backend and PostgreSQL, desktop + phone when applicable. Record exact outcomes and DB proof for forms. **Untested = NOT DONE.**
- **Dev server:** start it only to run this step's tests and stop it afterwards. Don't leave it running unless I ask.
- **Localhost URLs:** provide the **verified working** frontend URL, backend API/health URL and admin URL only if admin really exists. Use actual configured ports, no invented links. If inaccessible from this environment, explain the blocker and reproducible command, and mark the gate Pending.
- Finish with task IDs, modifications, all MD files, all six Excel sheets/status changes, tests, Git commit/push/sync, URLs, and one explicit status: `Done` only if EVERY gate passed, otherwise `Pending` with next action. Stop—do not begin the next step.
```

---

## Step 8 — Projects, clickable SVG site plan, site visit

Copy the entire block below into Codex:

```text
$caveman full — Mstar Property | Step 8: Projects, clickable SVG site plan, site visit

PRE-FLIGHT: Read all maintained project .md files and the complete codex-handoff/BUILD-SPEC.md, codex-handoff/CODEX-PROMPT.md, MSTAR-CODEX-RULES.md (project root), codex-handoff/wireframe.html and codex-handoff/home-page.html. Inspect the actual Git and live/ directories. Follow the approved V3 design, no invented UI. Token saving: small diffs, capped logs, no Serena dashboard, reuse existing project config. Do only this step.

Build project index/detail and plot-specific booking (§§5.4–5.5). Hero/render with overlapping light info card, unit types and inventory, clickable plot SVG from polygon data (available/reserved/sold), progress, site plans, facilities, brochure requests, real availability states. A sold/reserved plot cannot be booked. Three-step project-only site visit includes selected plot, date/time, details and persisted enquiry. Use approved price visibility and LINE-login policy. Add buyer/agent notifications when configured. Test plot selection, DB row type=site_visit with correct plot_id, booking conflicts and phone/desktop.

### Mandatory completion contract — do this at the end of THIS prompt
- **All maintained `.md` files:** read first, then update `AGENTS.md`, `README.md`, `design.md`, `architecture.md`, `database.md`, `testing.md`, `progress.md` and any other maintained project Markdown. Leave approved immutable handoff source unchanged, but document that exception. **No MD verification = NOT DONE.**
- **Six-tab Excel:** update the SAME root `Mstar-Property-Task-Tracker.xlsx`; update permanent task IDs, new fix IDs if needed, work/test evidence and blockers; regenerate `Frontend`, `Backend`, `Emails`, `Done`, `Pending`, `Not started` with accurate counts, each ID exactly once among status sheets. **No Excel update = NOT DONE.**
- **Git and live:** synchronize all relevant code, configs, docs and tracker between the real Git working tree and `live/` without overwriting conflicts or copying secrets; verify diffs/hashes. Commit and push via existing remote when possible. **No verified sync/push = Pending, not Done.**
- **Tests:** test this step on actual running frontend/backend and PostgreSQL, desktop + phone when applicable. Record exact outcomes and DB proof for forms. **Untested = NOT DONE.**
- **Dev server:** start it only to run this step's tests and stop it afterwards. Don't leave it running unless I ask.
- **Localhost URLs:** provide the **verified working** frontend URL, backend API/health URL and admin URL only if admin really exists. Use actual configured ports, no invented links. If inaccessible from this environment, explain the blocker and reproducible command, and mark the gate Pending.
- Finish with task IDs, modifications, all MD files, all six Excel sheets/status changes, tests, Git commit/push/sync, URLs, and one explicit status: `Done` only if EVERY gate passed, otherwise `Pending` with next action. Stop—do not begin the next step.
```

---

## Step 9 — Saved homes, searches and viewings

Copy the entire block below into Codex:

```text
$caveman full — Mstar Property | Step 9: Saved homes, searches and viewings

PRE-FLIGHT: Read all maintained project .md files and the complete codex-handoff/BUILD-SPEC.md, codex-handoff/CODEX-PROMPT.md, MSTAR-CODEX-RULES.md (project root), codex-handoff/wireframe.html and codex-handoff/home-page.html. Inspect the actual Git and live/ directories. Follow the approved V3 design, no invented UI. Token saving: small diffs, capped logs, no Serena dashboard, reuse existing project config. Do only this step.

Build Saved tabs per §5.6. Anonymous saved homes/searches persist in device localStorage; signing in later transfers safely. Save-heart doesn't open card. Save URLs with filter state and real counts; signed-in alert options Instant/Daily/Off, no alerts while anonymous. Viewings show authorized enquiry/booking statuses only. No leakage of other users' visits. Test save/reload/remove/restore/privacy, desktop and phone.

### Mandatory completion contract — do this at the end of THIS prompt
- **All maintained `.md` files:** read first, then update `AGENTS.md`, `README.md`, `design.md`, `architecture.md`, `database.md`, `testing.md`, `progress.md` and any other maintained project Markdown. Leave approved immutable handoff source unchanged, but document that exception. **No MD verification = NOT DONE.**
- **Six-tab Excel:** update the SAME root `Mstar-Property-Task-Tracker.xlsx`; update permanent task IDs, new fix IDs if needed, work/test evidence and blockers; regenerate `Frontend`, `Backend`, `Emails`, `Done`, `Pending`, `Not started` with accurate counts, each ID exactly once among status sheets. **No Excel update = NOT DONE.**
- **Git and live:** synchronize all relevant code, configs, docs and tracker between the real Git working tree and `live/` without overwriting conflicts or copying secrets; verify diffs/hashes. Commit and push via existing remote when possible. **No verified sync/push = Pending, not Done.**
- **Tests:** test this step on actual running frontend/backend and PostgreSQL, desktop + phone when applicable. Record exact outcomes and DB proof for forms. **Untested = NOT DONE.**
- **Dev server:** start it only to run this step's tests and stop it afterwards. Don't leave it running unless I ask.
- **Localhost URLs:** provide the **verified working** frontend URL, backend API/health URL and admin URL only if admin really exists. Use actual configured ports, no invented links. If inaccessible from this environment, explain the blocker and reproducible command, and mark the gate Pending.
- Finish with task IDs, modifications, all MD files, all six Excel sheets/status changes, tests, Git commit/push/sync, URLs, and one explicit status: `Done` only if EVERY gate passed, otherwise `Pending` with next action. Stop—do not begin the next step.
```

---

## Step 10A — Authentication wireframe (approval gate)

Copy the entire block below into Codex:

```text
$caveman full — Mstar Property | Step 10A: Authentication wireframe (approval gate)

PRE-FLIGHT: Read all maintained project .md files and the complete codex-handoff/BUILD-SPEC.md, codex-handoff/CODEX-PROMPT.md, MSTAR-CODEX-RULES.md (project root), codex-handoff/wireframe.html and codex-handoff/home-page.html. Inspect the actual Git and live/ directories. Follow the approved V3 design, no invented UI. Token saving: small diffs, capped logs, no Serena dashboard, reuse existing project config. Do only this step.

V3 does NOT approve auth screen visuals. Create a clickable design-only wireframe for login/register/account/recovery where applicable, using the exact V3 tokens, global header and responsive patterns. Ask owner to resolve LINE only vs LINE+Google+email providers. Show phone and desktop; do NOT implement production authentication UI/backend before explicit design and provider approval. Update docs, tracker (Pending if approval outstanding), and stop.

### Mandatory completion contract — do this at the end of THIS prompt
- **All maintained `.md` files:** read first, then update `AGENTS.md`, `README.md`, `design.md`, `architecture.md`, `database.md`, `testing.md`, `progress.md` and any other maintained project Markdown. Leave approved immutable handoff source unchanged, but document that exception. **No MD verification = NOT DONE.**
- **Six-tab Excel:** update the SAME root `Mstar-Property-Task-Tracker.xlsx`; update permanent task IDs, new fix IDs if needed, work/test evidence and blockers; regenerate `Frontend`, `Backend`, `Emails`, `Done`, `Pending`, `Not started` with accurate counts, each ID exactly once among status sheets. **No Excel update = NOT DONE.**
- **Git and live:** synchronize all relevant code, configs, docs and tracker between the real Git working tree and `live/` without overwriting conflicts or copying secrets; verify diffs/hashes. Commit and push via existing remote when possible. **No verified sync/push = Pending, not Done.**
- **Tests:** test this step on actual running frontend/backend and PostgreSQL, desktop + phone when applicable. Record exact outcomes and DB proof for forms. **Untested = NOT DONE.**
- **Dev server:** start it only to run this step's tests and stop it afterwards. Don't leave it running unless I ask.
- **Localhost URLs:** provide the **verified working** frontend URL, backend API/health URL and admin URL only if admin really exists. Use actual configured ports, no invented links. If inaccessible from this environment, explain the blocker and reproducible command, and mark the gate Pending.
- Finish with task IDs, modifications, all MD files, all six Excel sheets/status changes, tests, Git commit/push/sync, URLs, and one explicit status: `Done` only if EVERY gate passed, otherwise `Pending` with next action. Stop—do not begin the next step.
```

---

## Step 10B — Approved secure authentication implementation

Copy the entire block below into Codex:

```text
$caveman full — Mstar Property | Step 10B: Approved secure authentication implementation

PRE-FLIGHT: Read all maintained project .md files and the complete codex-handoff/BUILD-SPEC.md, codex-handoff/CODEX-PROMPT.md, MSTAR-CODEX-RULES.md (project root), codex-handoff/wireframe.html and codex-handoff/home-page.html. Inspect the actual Git and live/ directories. Follow the approved V3 design, no invented UI. Token saving: small diffs, capped logs, no Serena dashboard, reuse existing project config. Do only this step.

Proceed ONLY after authentication wireframe and provider selection are approved. Implement secure sessions, selected provider integrations, user profile, logout, appropriate signup/verification/recovery, RBAC separation between admin/customer, rate limiting, account privacy, saved-item merge. Use standard maintained auth library rather than inventing auth cryptography. Test real sign-in/out/expiry/privacy/merge flows on mobile and desktop. Record approval source in design.md.

### Mandatory completion contract — do this at the end of THIS prompt
- **All maintained `.md` files:** read first, then update `AGENTS.md`, `README.md`, `design.md`, `architecture.md`, `database.md`, `testing.md`, `progress.md` and any other maintained project Markdown. Leave approved immutable handoff source unchanged, but document that exception. **No MD verification = NOT DONE.**
- **Six-tab Excel:** update the SAME root `Mstar-Property-Task-Tracker.xlsx`; update permanent task IDs, new fix IDs if needed, work/test evidence and blockers; regenerate `Frontend`, `Backend`, `Emails`, `Done`, `Pending`, `Not started` with accurate counts, each ID exactly once among status sheets. **No Excel update = NOT DONE.**
- **Git and live:** synchronize all relevant code, configs, docs and tracker between the real Git working tree and `live/` without overwriting conflicts or copying secrets; verify diffs/hashes. Commit and push via existing remote when possible. **No verified sync/push = Pending, not Done.**
- **Tests:** test this step on actual running frontend/backend and PostgreSQL, desktop + phone when applicable. Record exact outcomes and DB proof for forms. **Untested = NOT DONE.**
- **Dev server:** start it only to run this step's tests and stop it afterwards. Don't leave it running unless I ask.
- **Localhost URLs:** provide the **verified working** frontend URL, backend API/health URL and admin URL only if admin really exists. Use actual configured ports, no invented links. If inaccessible from this environment, explain the blocker and reproducible command, and mark the gate Pending.
- Finish with task IDs, modifications, all MD files, all six Excel sheets/status changes, tests, Git commit/push/sync, URLs, and one explicit status: `Done` only if EVERY gate passed, otherwise `Pending` with next action. Stop—do not begin the next step.
```

---

## Step 11A — Admin wireframe (approval gate)

Copy the entire block below into Codex:

```text
$caveman full — Mstar Property | Step 11A: Admin wireframe (approval gate)

PRE-FLIGHT: Read all maintained project .md files and the complete codex-handoff/BUILD-SPEC.md, codex-handoff/CODEX-PROMPT.md, MSTAR-CODEX-RULES.md (project root), codex-handoff/wireframe.html and codex-handoff/home-page.html. Inspect the actual Git and live/ directories. Follow the approved V3 design, no invented UI. Token saving: small diffs, capped logs, no Serena dashboard, reuse existing project config. Do only this step.

Create a clickable admin wireframe FIRST—V3 has no approved admin screens. Include simple side navigation, tables/tabs and minimal cards for listing/photo CRUD, dynamic filter CRUD, agents, locations, projects/plots, enquiries, featured selections, users/roles, audit trail. Demonstrate an admin adding a searchable listing and a filter. Show desktop and phone. Do not implement admin production code until explicit owner approval. Stop and record Pending until approved.

### Mandatory completion contract — do this at the end of THIS prompt
- **All maintained `.md` files:** read first, then update `AGENTS.md`, `README.md`, `design.md`, `architecture.md`, `database.md`, `testing.md`, `progress.md` and any other maintained project Markdown. Leave approved immutable handoff source unchanged, but document that exception. **No MD verification = NOT DONE.**
- **Six-tab Excel:** update the SAME root `Mstar-Property-Task-Tracker.xlsx`; update permanent task IDs, new fix IDs if needed, work/test evidence and blockers; regenerate `Frontend`, `Backend`, `Emails`, `Done`, `Pending`, `Not started` with accurate counts, each ID exactly once among status sheets. **No Excel update = NOT DONE.**
- **Git and live:** synchronize all relevant code, configs, docs and tracker between the real Git working tree and `live/` without overwriting conflicts or copying secrets; verify diffs/hashes. Commit and push via existing remote when possible. **No verified sync/push = Pending, not Done.**
- **Tests:** test this step on actual running frontend/backend and PostgreSQL, desktop + phone when applicable. Record exact outcomes and DB proof for forms. **Untested = NOT DONE.**
- **Dev server:** start it only to run this step's tests and stop it afterwards. Don't leave it running unless I ask.
- **Localhost URLs:** provide the **verified working** frontend URL, backend API/health URL and admin URL only if admin really exists. Use actual configured ports, no invented links. If inaccessible from this environment, explain the blocker and reproducible command, and mark the gate Pending.
- Finish with task IDs, modifications, all MD files, all six Excel sheets/status changes, tests, Git commit/push/sync, URLs, and one explicit status: `Done` only if EVERY gate passed, otherwise `Pending` with next action. Stop—do not begin the next step.
```

---

## Step 11B — Approved backend/admin management implementation

Copy the entire block below into Codex:

```text
$caveman full — Mstar Property | Step 11B: Approved backend/admin management implementation

PRE-FLIGHT: Read all maintained project .md files and the complete codex-handoff/BUILD-SPEC.md, codex-handoff/CODEX-PROMPT.md, MSTAR-CODEX-RULES.md (project root), codex-handoff/wireframe.html and codex-handoff/home-page.html. Inspect the actual Git and live/ directories. Follow the approved V3 design, no invented UI. Token saving: small diffs, capped logs, no Serena dashboard, reuse existing project config. Do only this step.

Proceed only after 11A approval. Build secure role-restricted admin UI and PostgreSQL CRUD for listings/media/agents/locations/projects/plots/enquiries/filter metadata and allowed options, homepage feature selections, user roles/audit trail. Filters add/edit/remove/enable/order/translate without arbitrary SQL; changes appear on home and results. Include publish/unpublish, safe image upload/reordering and visibility controls. Test real DB creation→publish→public search; security denial for regular users; deletes, migrations, desktop/phone and lead records.

### Mandatory completion contract — do this at the end of THIS prompt
- **All maintained `.md` files:** read first, then update `AGENTS.md`, `README.md`, `design.md`, `architecture.md`, `database.md`, `testing.md`, `progress.md` and any other maintained project Markdown. Leave approved immutable handoff source unchanged, but document that exception. **No MD verification = NOT DONE.**
- **Six-tab Excel:** update the SAME root `Mstar-Property-Task-Tracker.xlsx`; update permanent task IDs, new fix IDs if needed, work/test evidence and blockers; regenerate `Frontend`, `Backend`, `Emails`, `Done`, `Pending`, `Not started` with accurate counts, each ID exactly once among status sheets. **No Excel update = NOT DONE.**
- **Git and live:** synchronize all relevant code, configs, docs and tracker between the real Git working tree and `live/` without overwriting conflicts or copying secrets; verify diffs/hashes. Commit and push via existing remote when possible. **No verified sync/push = Pending, not Done.**
- **Tests:** test this step on actual running frontend/backend and PostgreSQL, desktop + phone when applicable. Record exact outcomes and DB proof for forms. **Untested = NOT DONE.**
- **Dev server:** start it only to run this step's tests and stop it afterwards. Don't leave it running unless I ask.
- **Localhost URLs:** provide the **verified working** frontend URL, backend API/health URL and admin URL only if admin really exists. Use actual configured ports, no invented links. If inaccessible from this environment, explain the blocker and reproducible command, and mark the gate Pending.
- Finish with task IDs, modifications, all MD files, all six Excel sheets/status changes, tests, Git commit/push/sync, URLs, and one explicit status: `Done` only if EVERY gate passed, otherwise `Pending` with next action. Stop—do not begin the next step.
```

---

## Step 12 — End-to-end quality, performance, deployment preparation

Copy the entire block below into Codex:

```text
$caveman full — Mstar Property | Step 12: End-to-end quality, performance, deployment preparation

PRE-FLIGHT: Read all maintained project .md files and the complete codex-handoff/BUILD-SPEC.md, codex-handoff/CODEX-PROMPT.md, MSTAR-CODEX-RULES.md (project root), codex-handoff/wireframe.html and codex-handoff/home-page.html. Inspect the actual Git and live/ directories. Follow the approved V3 design, no invented UI. Token saving: small diffs, capped logs, no Serena dashboard, reuse existing project config. Do only this step.

Complete BUILD-SPEC §§14–15 QA: lint/typecheck/build; unit tests; Playwright desktop+phone real app & DB; responsive 390/768/1024/1440 screenshots; forms verified by persisted DB rows; correct maps, search/back/forward, media and project bookings; a11y, SEO JSON-LD, hreflang, canonicals, sitemap, PDPA, secrets, headers, backups. Profile slow queries, indexes and measured mobile LCP (<2.5s target); optimize images and JS. Document single-VPS plan. No production deploy/migration without explicit owner approval. Supply complete test and blocker report.

### Mandatory completion contract — do this at the end of THIS prompt
- **All maintained `.md` files:** read first, then update `AGENTS.md`, `README.md`, `design.md`, `architecture.md`, `database.md`, `testing.md`, `progress.md` and any other maintained project Markdown. Leave approved immutable handoff source unchanged, but document that exception. **No MD verification = NOT DONE.**
- **Six-tab Excel:** update the SAME root `Mstar-Property-Task-Tracker.xlsx`; update permanent task IDs, new fix IDs if needed, work/test evidence and blockers; regenerate `Frontend`, `Backend`, `Emails`, `Done`, `Pending`, `Not started` with accurate counts, each ID exactly once among status sheets. **No Excel update = NOT DONE.**
- **Git and live:** synchronize all relevant code, configs, docs and tracker between the real Git working tree and `live/` without overwriting conflicts or copying secrets; verify diffs/hashes. Commit and push via existing remote when possible. **No verified sync/push = Pending, not Done.**
- **Tests:** test this step on actual running frontend/backend and PostgreSQL, desktop + phone when applicable. Record exact outcomes and DB proof for forms. **Untested = NOT DONE.**
- **Dev server:** start it only to run this step's tests and stop it afterwards. Don't leave it running unless I ask.
- **Localhost URLs:** provide the **verified working** frontend URL, backend API/health URL and admin URL only if admin really exists. Use actual configured ports, no invented links. If inaccessible from this environment, explain the blocker and reproducible command, and mark the gate Pending.
- Finish with task IDs, modifications, all MD files, all six Excel sheets/status changes, tests, Git commit/push/sync, URLs, and one explicit status: `Done` only if EVERY gate passed, otherwise `Pending` with next action. Stop—do not begin the next step.
```
