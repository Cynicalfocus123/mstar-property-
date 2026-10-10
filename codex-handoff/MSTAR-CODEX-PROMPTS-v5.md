# Mstar Property — Codex V5 prompt pack

**How to use:** Put this entire package in your actual project folder. Paste ONE stage prompt at a time into Codex. Each stage contains the complete mandatory rules: update `.md`, update the six-tab Excel workbook, sync Git/live, test, and show real localhost URLs. Do not use the old green wireframe.

**Source of truth:** `codex-handoff/BUILD-SPEC.md`, `codex-handoff/wireframe.html` and `codex-handoff/home-page.html` (approved V3; updated 9 Oct 2026 with Realtor-style results cards, and 10 Oct 2026 with 3 cards per row on results and Airbnb-style listing rows on the home page); companion `MSTAR-CODEX-RULES.md` in the project root.
**Tracker:** `Mstar-Property-Task-Tracker.xlsx` in the project root (the one Codex already uses; don't create a second copy).

**10 Oct 2026:** added Step 3D (centred hero search, Realtor-style card facts with floor and sq ft), Step 3C (one smooth motion system for every page) and Step 3B (results 3 per row, card fixes, Airbnb-style home listing rows) before Step 4, and rewrote Steps 4–12 to match: map is opt-in (Show map), small cards reused on the property and project pages, one shared contact form for every Contact agent button, home rows managed in admin.

**Changes from V4:** fixed file paths; Step 3 uses the new Realtor-style listing card (BUILD-SPEC §4.3); Step 4 follows the owner's choice of free open-source mapping; Step 6 adds the Contact agent dialog on cards; Step 7 adds the "Homes for you" carousel directly under the search box and removes "no invented carousel"; footer is light grey; dev servers are not left running.

**Important:** Do not falsely claim Git push, `live/` synchronization, runnable localhost preview, or completed database tests if Codex does not have access. A blocked task is Pending.

---

## Step 0 — Project inspection, rules and tracking automation

Copy the entire block below into Codex:

```text
$caveman full — Mstar Property | Step 0: Project inspection, rules and tracking automation

PRE-FLIGHT: Read all maintained project .md files including CLAUDE.md, and the complete codex-handoff/BUILD-SPEC.md, codex-handoff/CODEX-PROMPT.md, MSTAR-CODEX-RULES.md (project root), codex-handoff/wireframe.html and codex-handoff/home-page.html. Inspect the actual Git and live/ directories. Follow the approved V3 design, no invented UI. Token saving: small diffs, capped logs, no Serena dashboard, reuse existing project config. Do only this step.

Inspect existing project, handoff files, directory structure, Git repository, live folder, existing code and all maintained Markdown. Preserve existing work. Keep the six-tab Excel workbook at the root `Mstar-Property-Task-Tracker.xlsx` and do not discard a newer existing tracker. Create/update root `AGENTS.md` using `MSTAR-CODEX-RULES.md`, and maintain `README.md`, `design.md`, `architecture.md`, `database.md`, `testing.md`, `progress.md`.
Build a small reliable tracker-update utility (in the project's existing language/tooling) that can move one stable ID between the three status sheets, regenerate frontend/backend/emails open views and counts, preserve formatting, and validate duplicate/missing IDs. Test that utility on a copy without changing genuine task history. Inspect and list all eight owner decisions in BUILD-SPEC §12. Make no application UI changes. Do not initialize a new Git repository without explicit consent.

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

## Step 1 — Design tokens, responsive shell and locale routing

Copy the entire block below into Codex:

```text
$caveman full — Mstar Property | Step 1: Design tokens, responsive shell and locale routing

PRE-FLIGHT: Read all maintained project .md files including CLAUDE.md, and the complete codex-handoff/BUILD-SPEC.md, codex-handoff/CODEX-PROMPT.md, MSTAR-CODEX-RULES.md (project root), codex-handoff/wireframe.html and codex-handoff/home-page.html. Inspect the actual Git and live/ directories. Follow the approved V3 design, no invented UI. Token saving: small diffs, capped logs, no Serena dashboard, reuse existing project config. Do only this step.

Implement Next.js App Router + TypeScript global foundation. Match BUILD-SPEC §§1–4, 9 and the approved v3 `wireframe.html`: light-only tokens, Prompt/Noto Sans Thai, 64px sticky header, rectangular single-line Sign in, desktop navigation, phone tab bar, light grey (`--soft`) footer, reusable accessible UI elements. Add `/th` and `/en` locale routing, preference cookie and localized text. Use placeholder crest ONLY as permitted; do not decide final color/logo. Responsive breakpoints ≤720, 721–1000, >1000. Test 390/768/1024/1440 widths, focus, navigation, overflow, Thai/English. Stop at shell; no fake functional pages.

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

## Step 2 — PostgreSQL/Drizzle schema and seed

Copy the entire block below into Codex:

```text
$caveman full — Mstar Property | Step 2: PostgreSQL/Drizzle schema and seed

PRE-FLIGHT: Read all maintained project .md files including CLAUDE.md, and the complete codex-handoff/BUILD-SPEC.md, codex-handoff/CODEX-PROMPT.md, MSTAR-CODEX-RULES.md (project root), codex-handoff/wireframe.html and codex-handoff/home-page.html. Inspect the actual Git and live/ directories. Follow the approved V3 design, no invented UI. Token saving: small diffs, capped logs, no Serena dashboard, reuse existing project config. Do only this step.

Implement schema/migrations for agents, locations, stations, projects, unit types, plots, listings, listing media, nearby, enquiries, chat clicks, users, saved homes/searches and future admin-managed filter definitions/options. Enforce type-specific constraints, proper keys/indexes, status/publish states, locale content, secure server access. Seed CLEARLY FICTIONAL data; never present as real properties, agents or prices. Test migrations, rollback, inserts, joins, indexes and seed on real development PostgreSQL. Document migrations and DB connection setup.

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

## Step 3 — Property cards, results and URL filters

Copy the entire block below into Codex:

```text
$caveman full — Mstar Property | Step 3: Property cards, results and URL filters

PRE-FLIGHT: Read all maintained project .md files including CLAUDE.md, and the complete codex-handoff/BUILD-SPEC.md, codex-handoff/CODEX-PROMPT.md, MSTAR-CODEX-RULES.md (project root), codex-handoff/wireframe.html and codex-handoff/home-page.html. Inspect the actual Git and live/ directories. Follow the approved V3 design, no invented UI. Token saving: small diffs, capped logs, no Serena dashboard, reuse existing project config. Do only this step.

Requires Step 2 Done (PostgreSQL running and seeded). Build `/[locale]/buy`, `/rent`, `/invest` and ONE reusable listing card exactly as BUILD-SPEC §4.3 and the cards in wireframe.html / home-page.html (Realtor.com style): white bordered card, 3:2 photo with up to 5 photos, next-photo arrow + swipe, dots, pill badges top-left, white heart circle bottom-right of the photo (saves without opening the card), status dot + "Condo for sale"/"Land for sale"/"Hotel for sale"/"Condo for rent", large price with "/month" for rent and green "↓ ฿200k" price drop, bold type-specific facts row (residential bed/bath/m²/distance to BTS; land rai/ngan/m²/road; hotel rooms/occupancy/land), two-line address, and a Contact agent pill button (opens the contact dialog; the dialog's submit is wired in Step 6). Results list uses this card in 2 columns on desktop, 1 on phone. Keep space for the map column but don't show fake map content (map is Step 4). Add real DB-backed location/type/intent/price/beds/amenities search, sorting (Newest, Price low–high, Price high–low, Size, Nearest BTS), safe filters managed by database definitions, responsive filter popovers/full-screen sheet, histogram generated from actual query, active chips and Clear all, readable results heading (e.g. "Condos for sale in Sukhumvit"), empty state, Show more homes. Use BUILD-SPEC §7 shared URL state, preserve refresh/back/forward, accessible controls. Buy must not show rent-only prices. Test real DB search and URL interactions on desktop/phone.

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

## Step 3B — Results grid 3 per row, card fixes, home listing rows (owner change 10 Oct 2026)

Run after Step 3 and before Step 4.

Copy the entire block below into Codex:

```text
$caveman full — Mstar Property | Step 3B: Results grid 3 per row, card fixes, home listing rows

PRE-FLIGHT: Read all maintained project .md files including CLAUDE.md, and the complete codex-handoff/BUILD-SPEC.md (updated §5.2, owner change 10 Oct 2026), codex-handoff/CODEX-PROMPT.md, MSTAR-CODEX-RULES.md (project root), codex-handoff/wireframe.html and codex-handoff/home-page.html. Inspect the actual Git and live/ directories. Follow the approved V3 design, no invented UI. Token saving: small diffs, capped logs, no Serena dashboard, reuse existing project config. Do only this step.

PART 1 — Results pages /buy, /rent, /invest (BUILD-SPEC §5.2):
Remove the reserved empty map column. The card grid uses the full page width with equal columns: 3 cards per row above 1000px, 2 at 721–1000px, 1 on phone; the last row keeps the same card width. "Show more homes" loads 12 homes at a time. Don't build the map: Step 4 adds a "Show map" button that opens list + map split view (map=1 in the URL).

PART 2 — Listing card fixes (BUILD-SPEC §4.3):
Land and hotel land sizes hide zero units (no "0 rai 0 ngan") and show rai / ngan / sq. wah as whole numbers (no "0.125 rai"). The station label shows the real line (BTS / MRT / ARL), not always "to BTS". Thai sample badge text is "ตัวอย่าง".

PART 3 — Home page listing rows, Airbnb style (BUILD-SPEC §5.1 item 3, owner change 10 Oct 2026; see codex-handoff/home-page.html):
Add only this section, directly under the home search box: several rows, one topic each ("Popular homes for sale in Bangkok", "Condos for rent in Bangkok", "Homes in Pattaya and Jomtien", "Investment: hotels and land"), defined in config for now (title + search query) so admin can manage them later. Row header: title with a small round → button that opens the matching results page, plus ‹ › arrows on desktop. Build a new SMALL card for these rows (not the big results card): photo 20:19 with 16px radius, one pill badge top-left, heart top-right that saves without opening, one-line title like "Condo in Watthana", one line "price · key facts" (rent /mo, land rai/ngan, hotel rooms), no Contact agent button; whole card opens the property page. Cards per row: 7 above 1440px, 6 at 1251–1440px, 5 at 1081–1250px, 4 at 721–1080px, about 2.3 visible on phone with swipe and scroll-snap (arrows hidden on phone). Up to 12 per row; featured first, then newest; hide a row with no homes. Reuse the existing safe listings search; no new data or privacy rules. Samples show only under the existing development-only rules. Category row, locations, projects, tools and services stay for Step 7.

Tests: results show 3 cards per row at 1600/1440/1024px, 2 at 768px, 1 at 390px; card fixes for land, hotel, MRT and Thai badge; home rows: cards per row at 1600/1440/1280/1024px, about 2.3 on phone with swipe, arrows, → link opens the right results, heart does not open the card, keyboard access; both languages.

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

## Step 3C — Site-wide smooth motion (owner change 10 Oct 2026)

Run after Step 3B and before Step 4.

Copy the entire block below into Codex:

```text
$caveman full — Mstar Property | Step 3C: Site-wide smooth motion

PRE-FLIGHT: Read all maintained project .md files including CLAUDE.md, the new "Motion" section in codex-handoff/BUILD-SPEC.md §2, §5.1 item 3 and §5.2, and codex-handoff/home-page.html. Inspect the actual Git and live/ directories. Small diffs, capped logs, no Serena dashboard. Do only this step.

Build ONE shared motion system (helper + CSS tokens from BUILD-SPEC §2 Motion) and apply it to everything that exists today, so every page moves the same way. Future steps must reuse it.
1. Home listing rows ‹ › arrows (components/home-listing-rows.tsx): smooth requestAnimationFrame scroll over about 450 ms with ease-out; move by whole visible cards so rows always land on a card edge, never a half card at the left; scroll-snap off during the animation and back on after; repeated clicks continue smoothly; arrows fade and disable at the ends; Left/Right keys when the row has focus; trackpad, shift + wheel and touch swipe stay natural and snap to card edges. The current code uses behavior:'auto' (instant jump) and scrolls by clientWidth — replace both.
2. Results pages /buy, /rent, /invest — big listing cards (components/listing-card.tsx): the › photo arrow, dots and touch swipe slide the photo over about 300 ms ease-out in the swipe direction instead of swapping instantly. Hover: photo scale 1.03 over 250 ms, card shadow rises over 150 ms, Contact agent button colour change over 150 ms.
3. Small home cards: same hover motion.
4. Filter popovers, phone filter sheet and the contact dialog: fade + small rise over 200 ms; phone sheets slide up over 250 ms.
5. Chips, buttons, tabs: colour transitions over 150 ms.
6. prefers-reduced-motion: no animation anywhere, instant changes.
Write the motion rule into design.md and MSTAR-CODEX-RULES.md so Steps 4–12 (map split view, property gallery, project rows, saved page) use the same helper.

Tests: at 1600/1440/1280/1024px click next/previous quickly on home rows → land on card edges, no half card, arrows fade at the ends; keyboard arrows; results card photo arrow and dots slide; phone 390px swipe on rows and card photos; popover/sheet/dialog open and close; reduced-motion makes all of it instant; no layout shift or sideways page scroll; both languages.

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

## Step 3D — Centred hero search and fuller card facts (owner change 10 Oct 2026)

Run after Step 3C and before Step 4.

Copy the entire block below into Codex:

```text
$caveman full — Mstar Property | Step 3D: Centred hero search and fuller card facts

PRE-FLIGHT: Read all maintained project .md files including CLAUDE.md, the updated codex-handoff/BUILD-SPEC.md §4.3 (Facts row, Address) and §5.1 items 1 and 3, and codex-handoff/home-page.html and wireframe.html. Inspect the actual Git and live/ directories. Small diffs, capped logs, no Serena dashboard. Do only this step.

PART 1 — Home hero centred (BUILD-SPEC §5.1 item 1):
Centre everything in the hero: heading "Find your place in Thailand", the supporting line, the Buy / Rent / New projects / Investment tabs and the search box. Search box width 100% up to about 880px, centred on the page; its fields stay left-aligned inside. Same on Thai. Phone: hero centred, search collapses as now.

PART 2 — Big results card facts like Realtor.com (BUILD-SPEC §4.3):
Facts row, bold numbers and normal words, in this order, hiding any fact without a value:
- Condo: bed, bath, floor ("18th floor"), size.
- House / townhouse / pool villa: bed, bath, number of floors ("2 floors"), size, land (rai / ngan / sq. wah, zero units hidden).
- Land: rai, ngan, sq. wah, road frontage.
- Hotel: rooms, floors, land in rai.
- Commercial: floors, size, land.
Size unit: English shows sq ft (m² × 10.7639, whole numbers, thousands separator); Thai shows ตร.ม. Sizes stay stored in m². The nearest station moves to the end of address line 2 ("Watthana, Bangkok 10110 · 650 m to BTS", real line name).
If the database has no field for a building's number of floors, add it with a reviewed additive migration (never rewrite applied migrations), add it to the sample data, and keep the public projection safe. Use the existing floor field for the condo unit's floor.

PART 3 — Small home cards (BUILD-SPEC §5.1 item 3):
One line "price · bed · bath · size" (e.g. "฿6,450,000 · 2 bd · 2 ba · 732 sq ft"; Thai ตร.ม.); land shows rai / ngan; hotel shows rooms.

Tests: hero centred at 1600/1440/1024/768/390 in both languages; every property type's facts on big and small cards with the right order, units and hidden empty values; sq ft conversion unit test; station at the end of the address; migration apply/rerun on the test database; no layout shift or sideways scroll.

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

## Step 4 — Interactive map and nearby data integration

Copy the entire block below into Codex:

```text
$caveman full — Mstar Property | Step 4: Interactive map and nearby data integration

PRE-FLIGHT: Read all maintained project .md files including CLAUDE.md, and the complete codex-handoff/BUILD-SPEC.md, codex-handoff/CODEX-PROMPT.md, MSTAR-CODEX-RULES.md (project root), codex-handoff/wireframe.html and codex-handoff/home-page.html. Inspect the actual Git and live/ directories. Follow the approved V3 design, no invented UI. Token saving: small diffs, capped logs, no Serena dashboard, reuse existing project config. Do only this step.

Requires Step 3D Done. Use the shared motion system from Step 3C for the map split view and Map/List toggle. The owner chose free, open-source mapping (design.md B09). FIRST propose 2–3 concrete free options (for example a MapLibre-based map with an OpenStreetMap-based tile source, and a free source for nearby places) with each one's usage limits, cost risk and attribution rules, then STOP and wait for the owner to pick one. No paid provider and no invented provider.

After the owner picks: add the map as an opt-in view on /buy, /rent and /invest (BUILD-SPEC §5.2). A "Show map" button at the right end of the filter bar opens a split view: listing cards 2 per row on the left, sticky map with price pins on the right; the button then reads "Hide map". Store it in the URL as map=1. The default view stays the full-width 3-per-row card grid from Step 3B. In map view: hover/focus card↔pin highlight both ways, map bounds in the URL (bbox), "Search as I move the map" (on by default) and "Draw area" when the library supports it. Phone: a floating Map / List pill switches between a full-screen map and the list. Build the geo-indexed bounds query. Listings with hide_exact_location show an area circle, never an exact pin, and their exact point is never sent to the browser. Nearby places (Transit / Schools / Shopping / Hospitals) come only from the chosen provider, stored in listing_nearby with source and fetch date and refreshed every 90 days; show "Distances are approximate". If the provider needs keys that aren't available, build the database/API contract, report the exact blocker and show no map — never fake maps, pins or distances. Sample listings stay development-only.

Tests: map on/off and URL state, card↔pin highlight, bbox search and "search as I move", hidden-location privacy in the API response, phone Map/List toggle, real database, desktop and phone, both languages.

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

## Step 5 — Property details, gallery, facts and mortgage

Copy the entire block below into Codex:

```text
$caveman full — Mstar Property | Step 5: Property details, gallery, facts and mortgage

PRE-FLIGHT: Read all maintained project .md files including CLAUDE.md, and the complete codex-handoff/BUILD-SPEC.md, codex-handoff/CODEX-PROMPT.md, MSTAR-CODEX-RULES.md (project root), codex-handoff/wireframe.html and codex-handoff/home-page.html. Inspect the actual Git and live/ directories. Follow the approved V3 design, no invented UI. Token saving: small diffs, capped logs, no Serena dashboard, reuse existing project config. Do only this step.

Requires Step 4 Done. Use the shared motion system from Step 3C for the gallery, lightbox, photo swipe and tabs. Build /[locale]/property/[id]-[slug] per BUILD-SPEC §5.3 and the Property screen in wireframe.html:
- Top row: ← Back to results (returns to the same search URL), Share (LINE, Facebook, WhatsApp, copy link), Save (same device storage as the card hearts).
- Desktop photo grid: 1 large + 4 small, "Show all N photos" opens a full-screen gallery (grid + lightbox with arrows and counter, "Email agent" button in its header). Phone: one swipeable photo with a counter.
- Badges, title, full address (unless hidden), listing ID and the key-facts row by type (condo / house / land / hotel as in §5.3 item 3).
- Section tabs that stay at the top and follow the scroll: Overview, Facts, Floor plan, Nearby, Costs, Project.
- Description clamped to 5 lines with Read more; Thai and English stored separately.
- Price check only when enough real comparable listings exist (minimum sample in config); otherwise hide the block. Never invent averages or yields.
- Facts and features table; Floor plan / Video tour / 360° tabs only when that content exists.
- Nearby with the Step 4 provider data and map.
- Monthly cost sliders with the exact §10 formula plus the common fee line.
- "More units in this project" and "Similar homes nearby" (same area, type and sale/rent, price within ±25%, fall back to the same city if fewer than 3) using the SMALL card from Step 3B.
- Contact box on desktop (right column, sticky) and phone bottom bar (price + monthly estimate, LINE, WhatsApp, Email agent) laid out exactly as §5.3 item 13, but sending stays disabled with a clear note until Step 6. No calendar on listing pages.
Gated prices and hidden locations stay private everywhere on the page and in its data.

Tests: layout at 390/768/1024/1440/1600, each property type's facts, mortgage formula unit test, gallery keyboard and swipe, tabs scroll, back-to-results keeps filters, both languages.

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

## Step 6 — Agent enquiries, LINE and WhatsApp

Copy the entire block below into Codex:

```text
$caveman full — Mstar Property | Step 6: Agent enquiries, LINE and WhatsApp

PRE-FLIGHT: Read all maintained project .md files including CLAUDE.md, and the complete codex-handoff/BUILD-SPEC.md, codex-handoff/CODEX-PROMPT.md, MSTAR-CODEX-RULES.md (project root), codex-handoff/wireframe.html and codex-handoff/home-page.html. Inspect the actual Git and live/ directories. Follow the approved V3 design, no invented UI. Token saving: small diffs, capped logs, no Serena dashboard, reuse existing project config. Do only this step.

Requires Step 5 Done. Make enquiries real (BUILD-SPEC §6). Build ONE shared contact form component and ONE server action, used by: the property page contact box, the phone bottom bar "Email agent", the gallery "Email agent" button, and the "Contact agent" dialog on every results card (built in Step 3 with sending disabled — enable it now). The small home-row cards have no contact button.
Fields: Full name*, Email*, Phone* (Thai and international formats), message prefilled with title and listing ID, "I'd like help with a bank loan", PDPA consent text with privacy link.
Server: validate, honeypot, rate limit per IP and per email, save the enquiry row FIRST (listing, agent, all fields, consent version and time, source page, UTM, language, user agent), then queue the agent notification with retry and send the buyer an acknowledgement in their language. Give the database app role only the narrow INSERT rights this needs. Success shows "✓ Message sent"; failure shows a clear retry message, never a fake success.
LINE and WhatsApp buttons use the owner's chosen contacts (one company contact or per agent). If not chosen yet, keep them visibly unavailable and report the blocker — never invent IDs, numbers or inboxes. Log chat_click events (listing, channel); a click is not a sent message.

Tests: submit from each of the four places → the row really exists in PostgreSQL with the right values → notification queued; validation errors; rate limit; honeypot; acknowledgement email content; desktop and phone; both languages.

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

## Step 7 — Complete the home page

Copy the entire block below into Codex:

```text
$caveman full — Mstar Property | Step 7: Complete the home page

PRE-FLIGHT: Read all maintained project .md files including CLAUDE.md, and the complete codex-handoff/BUILD-SPEC.md, codex-handoff/CODEX-PROMPT.md, MSTAR-CODEX-RULES.md (project root), codex-handoff/wireframe.html and codex-handoff/home-page.html. Inspect the actual Git and live/ directories. Follow the approved V3 design, no invented UI. Token saving: small diffs, capped logs, no Serena dashboard, reuse existing project config. Do only this step.

Requires Step 6 Done. Use the shared motion system from Step 3C for the category row and any new rows. Complete the home page (BUILD-SPEC §5.1 and codex-handoff/home-page.html). Keep the hero, search box and the Airbnb-style listing rows from Step 3B as they are. Add the remaining sections in this order under the listing rows:
1. Category icon row that scrolls sideways (Condo, House, Townhouse, Pool villa, Land, Hotel, Beachfront, Near BTS/MRT, New build, Pet friendly, Commercial); each opens results with that filter.
2. "Continue your search": only when this device has a recent search, saved search or viewed listing.
3. "Explore by location" tiles (Bangkok, Pattaya, Phuket, Rayong) with real listing counts.
4. "New projects by Mstar": 3 project cards with status badge, linking to project pages (if Step 8 isn't built yet, link to an explicit unfinished page).
5. Tools: mortgage calculator, "What is my home worth?" owner lead form, buying guide for foreigners.
6. Services for owners: property management, cleaning, contractor, home decor.
7. Footer (already built).
The location field in the search box shows grouped suggestions: recent searches (this device), areas & stations, projects. Search uses the exact same URL parameters as the results pages. Phone: the search collapses to "Where?" which opens a full-screen sheet. Hero uses one real photo when the owner supplies it; until then a light placeholder — no dark hero, no slider. The "What is my home worth?" form saves to enquiries (type=home_value) through the Step 6 server action. Optimize images and LCP.

Tests: home → results → property on desktop and phone, every section at all widths, suggestions keyboard access, owner lead row really in PostgreSQL, both languages.

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

## Step 8 — Projects, clickable SVG site plan, site visit

Copy the entire block below into Codex:

```text
$caveman full — Mstar Property | Step 8: Projects, clickable SVG site plan, site visit

PRE-FLIGHT: Read all maintained project .md files including CLAUDE.md, and the complete codex-handoff/BUILD-SPEC.md, codex-handoff/CODEX-PROMPT.md, MSTAR-CODEX-RULES.md (project root), codex-handoff/wireframe.html and codex-handoff/home-page.html. Inspect the actual Git and live/ directories. Follow the approved V3 design, no invented UI. Token saving: small diffs, capped logs, no Serena dashboard, reuse existing project config. Do only this step.

Requires Step 7 Done. Use the shared motion system from Step 3C for rows, galleries and the site plan. Build /[locale]/projects and /[locale]/projects/[slug] plus plot booking (BUILD-SPEC §§5.4–5.5, New project and Book site visit screens in wireframe.html):
- Rounded hero (drone video or render) with an overlapping white info card: status badge, name, location, "from ฿" (respect the owner's per-project price visibility), number of homes, completion year, LINE and "Get price list" buttons. No black sections.
- Section tabs that stay at the top: Overview, Home types, Site plan, Facilities, Progress, Location.
- Home types with plan image, beds, m², price from and an availability bar ("4 of 12 available"); sold-out types stay visible, faded, with "Join waitlist".
- Clickable site plan drawn as SVG from stored plot polygons: green available, amber reserved, grey sold. Clicking a plot shows code, type, land size, price and status; only available plots show "Book a site visit".
- Facilities chips, construction progress (4 stages, % for the current one, "Updated {month}", optional dated photos), brochure / price-list request (phone or LINE ID) saved as an enquiry (type=brochure).
- Listings that belong to the project use the small card from Step 3B.
- Site visit: /projects/[slug]/visit?plot=… with 3 steps (date and time → your details → confirmed), "Fill in with LINE" only if the owner approved LINE login, saved as an enquiry with type=site_visit and the plot_id through the Step 6 server action. A sold or reserved plot cannot be booked; handle booking conflicts.
- /projects list page: project cards filterable by status and province.

Tests: plot click and info, booking an available plot → row in PostgreSQL with type=site_visit and correct plot_id, refusal for sold/reserved plots, brochure request row, desktop and phone, both languages.

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

## Step 9 — Saved homes, searches and viewings

Copy the entire block below into Codex:

```text
$caveman full — Mstar Property | Step 9: Saved homes, searches and viewings

PRE-FLIGHT: Read all maintained project .md files including CLAUDE.md, and the complete codex-handoff/BUILD-SPEC.md, codex-handoff/CODEX-PROMPT.md, MSTAR-CODEX-RULES.md (project root), codex-handoff/wireframe.html and codex-handoff/home-page.html. Inspect the actual Git and live/ directories. Follow the approved V3 design, no invented UI. Token saving: small diffs, capped logs, no Serena dashboard, reuse existing project config. Do only this step.

Requires Step 8 Done. Build /[locale]/saved per BUILD-SPEC §5.6 with tabs Homes · Searches · Viewings.
- Homes: shows every home saved with the heart on the big results cards, the small home-row cards and the property page (one shared device storage), using the big results card 3 per row (2 tablet, 1 phone). Removing works from here too.
- Searches: "Save search" on the results pages saves the current URL, a name, the live result count and "N new" since last visit. Alert options Instant / Daily / Off only when signed in; when not signed in, switching alerts on asks the person to sign in (sign-in itself is Step 10).
- Viewings: the person's own site visits and enquiries with status (Waiting for agent / Confirmed / Done), Reschedule and Chat. Never show anyone else's.
- Without an account everything stays on this device; signing in later moves it to the account safely (merge without duplicates) once Step 10 exists.

Tests: save / reload / remove / restore on desktop and phone, saved search count and "N new", privacy (no other person's data), both languages.

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

## Step 10A — Authentication wireframe (approval gate)

Copy the entire block below into Codex:

```text
$caveman full — Mstar Property | Step 10A: Authentication wireframe (approval gate)

PRE-FLIGHT: Read all maintained project .md files including CLAUDE.md, and the complete codex-handoff/BUILD-SPEC.md, codex-handoff/CODEX-PROMPT.md, MSTAR-CODEX-RULES.md (project root), codex-handoff/wireframe.html and codex-handoff/home-page.html. Inspect the actual Git and live/ directories. Follow the approved V3 design, no invented UI. Token saving: small diffs, capped logs, no Serena dashboard, reuse existing project config. Do only this step.

V3 does NOT approve auth screen visuals. Create a clickable design-only wireframe for login/register/account/recovery where applicable, using the exact V3 tokens, global header and responsive patterns. Ask owner to resolve LINE only vs LINE+Google+email providers. Show phone and desktop; do NOT implement production authentication UI/backend before explicit design and provider approval. Update docs, tracker (Pending if approval outstanding), and stop.

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

## Step 10B — Approved secure authentication implementation

Copy the entire block below into Codex:

```text
$caveman full — Mstar Property | Step 10B: Approved secure authentication implementation

PRE-FLIGHT: Read all maintained project .md files including CLAUDE.md, and the complete codex-handoff/BUILD-SPEC.md, codex-handoff/CODEX-PROMPT.md, MSTAR-CODEX-RULES.md (project root), codex-handoff/wireframe.html and codex-handoff/home-page.html. Inspect the actual Git and live/ directories. Follow the approved V3 design, no invented UI. Token saving: small diffs, capped logs, no Serena dashboard, reuse existing project config. Do only this step.

Proceed ONLY after authentication wireframe and provider selection are approved. Implement secure sessions, selected provider integrations, user profile, logout, appropriate signup/verification/recovery, RBAC separation between admin/customer, rate limiting, account privacy, saved-item merge. Use standard maintained auth library rather than inventing auth cryptography. Test real sign-in/out/expiry/privacy/merge flows on mobile and desktop. Record approval source in design.md.

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

## Step 11A — Admin wireframe (approval gate)

Copy the entire block below into Codex:

```text
$caveman full — Mstar Property | Step 11A: Admin wireframe (approval gate)

PRE-FLIGHT: Read all maintained project .md files including CLAUDE.md, and the complete codex-handoff/BUILD-SPEC.md, codex-handoff/CODEX-PROMPT.md, MSTAR-CODEX-RULES.md (project root), codex-handoff/wireframe.html and codex-handoff/home-page.html. Inspect the actual Git and live/ directories. Follow the approved V3 design, no invented UI. Token saving: small diffs, capped logs, no Serena dashboard, reuse existing project config. Do only this step.

Create a clickable admin wireframe FIRST — V3 has no approved admin screens. Use the V3 tokens, white surfaces, simple side navigation, tables, tabs and minimal cards. Include: listings (create/edit, photos upload and reorder, publish/unpublish, price visibility, hide exact location), home page listing rows (title, saved search, order, on/off) and featured listings, filter definitions and options (add/edit/enable/order/translate), agents, locations and stations, projects with unit types, plots and site plan, enquiries and site visits (status, assign agent), users and roles, audit trail. Demonstrate an admin adding a listing that then appears in search and in a home row, and adding a filter. Show desktop and phone. Do not write admin production code until the owner explicitly approves. Stop and record Pending until approved.

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

## Step 11B — Approved backend/admin management implementation

Copy the entire block below into Codex:

```text
$caveman full — Mstar Property | Step 11B: Approved backend/admin management implementation

PRE-FLIGHT: Read all maintained project .md files including CLAUDE.md, and the complete codex-handoff/BUILD-SPEC.md, codex-handoff/CODEX-PROMPT.md, MSTAR-CODEX-RULES.md (project root), codex-handoff/wireframe.html and codex-handoff/home-page.html. Inspect the actual Git and live/ directories. Follow the approved V3 design, no invented UI. Token saving: small diffs, capped logs, no Serena dashboard, reuse existing project config. Do only this step.

Proceed only after 11A is approved. Build the secure, role-restricted admin from the approved 11A wireframe with PostgreSQL CRUD for listings and media (safe upload, reorder, publish/unpublish, price visibility, hide exact location), home page listing rows and featured listings, filter definitions and options (add/edit/remove/enable/order/translate without any executable SQL), agents, locations and stations, projects, unit types, plots and site plans, enquiries and site visits, users, roles and audit trail. Changes show on the home rows, results and property pages. Deleting follows safe rules (no orphaned data, archive instead of hard delete where history matters).

Tests: create → publish → appears in public search and home row on the real database; filter changes appear on home and results; regular users are denied every admin route and API; audit entries written; deletes; migrations; desktop and phone; lead records visible to the right roles only.

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

## Step 12 — End-to-end quality, performance, deployment preparation

Copy the entire block below into Codex:

```text
$caveman full — Mstar Property | Step 12: End-to-end quality, performance, deployment preparation

PRE-FLIGHT: Read all maintained project .md files including CLAUDE.md, and the complete codex-handoff/BUILD-SPEC.md, codex-handoff/CODEX-PROMPT.md, MSTAR-CODEX-RULES.md (project root), codex-handoff/wireframe.html and codex-handoff/home-page.html. Inspect the actual Git and live/ directories. Follow the approved V3 design, no invented UI. Token saving: small diffs, capped logs, no Serena dashboard, reuse existing project config. Do only this step.

Complete BUILD-SPEC §§14–15 QA across the whole site: lint, typecheck, build; unit tests; Playwright desktop + phone against the real app and database; screenshots at 390 / 768 / 1024 / 1440 / 1600 checking the results grid (3 / 2 / 1 per row), home listing rows (7 / 6 / 5 / 4 per row, about 2.3 on phone), single-line header and buttons, no sideways page scroll; every form verified by its saved database row; map, search, back/forward, gallery and project bookings; accessibility (keyboard, focus, labels, contrast, reduced motion), SEO (titles, descriptions, JSON-LD, hreflang, canonicals, sitemap), PDPA (consent records, privacy page, deletion requests), secrets, security headers, backups and restore. Profile slow queries and indexes; measure mobile LCP (target under 2.5 s) and optimize images and JavaScript. Confirm sample listings never appear in a production build. Document a single-VPS deployment plan. No production deploy or migration without explicit owner approval. Deliver a complete test and blocker report.

### Mandatory completion contract — do this at the end of THIS prompt
- **All maintained `.md` files:** read first, then update `AGENTS.md`, `README.md`, `design.md`, `architecture.md`, `database.md`, `testing.md`, `progress.md`, `MSTAR-CODEX-RULES.md`, `CLAUDE.md` and any other maintained project Markdown. Leave approved immutable handoff source unchanged, but document that exception. **No MD verification = NOT DONE.**
- **Six-tab Excel:** update the SAME root `Mstar-Property-Task-Tracker.xlsx`; update permanent task IDs, new fix IDs if needed, work/test evidence and blockers; regenerate `Frontend`, `Backend`, `Emails`, `Done`, `Pending`, `Not started` with accurate counts, each ID exactly once among status sheets. **No Excel update = NOT DONE.**
- **Git and live:** synchronize all relevant code, configs, docs and tracker between the real Git working tree and `live/` without overwriting conflicts or copying secrets; verify diffs/hashes. Commit and push via existing remote when possible. **No verified sync/push = Pending, not Done.**
- **Tests:** test this step on actual running frontend/backend and PostgreSQL, desktop + phone when applicable. Record exact outcomes and DB proof for forms. **Untested = NOT DONE.**
- **Dev server:** start it only to run this step's tests and stop it afterwards. Don't leave it running unless I ask.
- **Localhost URLs:** provide the **verified working** frontend URL, backend API/health URL and admin URL only if admin really exists. Use actual configured ports, no invented links. If inaccessible from this environment, explain the blocker and reproducible command, and mark the gate Pending.
- Finish with task IDs, modifications, all MD files, all six Excel sheets/status changes, tests, Git commit/push/sync, URLs, and one explicit status: `Done` only if EVERY gate passed, otherwise `Pending` with next action. Stop—do not begin the next step.
```
