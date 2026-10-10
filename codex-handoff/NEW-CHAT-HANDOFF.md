# Mstar Property new site: handoff for a new chat

**Updated:** 10 Oct 2026
**Owner:** the user (Mstar Property Development, Thailand). Claude designs and reviews; Codex writes the code, one step at a time.

Start a new Claude chat **in the project folder** (`D:\mstar companies\mstar property\mstar property new site`) so Claude also loads the Codex-maintained `CLAUDE.md` automatically. Then say: "Read codex-handoff/NEW-CHAT-HANDOFF.md and CLAUDE.md, then check progress.md."

---

## 1. Where everything is

| What | Where |
|---|---|
| Project (Git root) | `D:\mstar companies\mstar property\mstar property new site` |
| GitHub | `https://github.com/Cynicalfocus123/mstar-property-.git`, branch `main` |
| Local mirror (not a live site) | `live/` inside the project |
| Design source files (Claude's) | `codex-handoff/` |
| Build spec | `codex-handoff/BUILD-SPEC.md` |
| All Codex step prompts | `codex-handoff/MSTAR-CODEX-PROMPTS-v5.md` (copy prompts from this file, not from old chats) |
| Clickable wireframe | `codex-handoff/wireframe.html` (local) · https://claude.ai/artifact/VTFt1fFnM2Wnz4AKGzRbaU |
| Home page wireframe | `codex-handoff/home-page.html` (local) · https://claude.ai/artifact/B4Xvb1Wq8B8Wk6FuiXKCH1 |
| Codex's briefing for Claude | `CLAUDE.md` (project root, updated by Codex every step) |
| Latest status | `progress.md` (newest section at the top) |
| Task tracker | `Mstar-Property-Task-Tracker.xlsx` (project root, 6 tabs) |
| Old, replaced designs (history only) | `WIREFRAME.md` (Codex v1, green), `wireframe-v2.html` (black and gold) |

Tech: Next.js + TypeScript, PostgreSQL 18 + Drizzle, one app on port 3000. The database runs from the project folder (`.local/postgres-data`, port 5432), separate from any other PostgreSQL on the computer.

---

## 2. Design decisions so far (all approved by the owner)

1. **Bright and white.** No black sections. Brand gold `#f2a91a` as the accent (blue, teal and coral were offered; gold chosen). Fonts: Prompt (headings), Noto Sans Thai (body).
2. **Header:** logo only (MP crest, no text), menu on one line, rectangular Sign in button (not a circle). Final logo file still to come from the designer: needs a version for white backgrounds.
3. **Property page contact:** email form like Realtor.com (name, email, phone, message, Email agent) plus **Chat on LINE** and **Chat on WhatsApp**. No calendar on property pages. Date booking only for new-project site visits.
4. **Results pages (Buy / Rent / Investment):** big Realtor-style card, **3 per row** on desktop, 2 tablet, 1 phone. No empty map column; the map opens with a **"Show map"** button (Step 4).
5. **Home page under the search box:** rows by topic ("Popular homes for sale in Bangkok", "Condos for rent in Bangkok", "Homes in Pattaya and Jomtien", "Investment: hotels and land") using the **same big card as the results pages** (4 per row on a wide screen, 3 laptop, 2 tablet, about 1.15 on phone). One card component everywhere. Admin will manage the rows later.
6. **Hero centred and fuller card facts (Step 3D):** the hero heading, tabs and search box are centred. Results cards show bed, bath, floor and sq ft like Realtor.com (land: rai / ngan / sq. wah; hotel: rooms, floors, land). English uses sq ft, Thai uses ตร.ม.
7. **Smooth motion on every page:** one shared motion system (BUILD-SPEC §2 "Motion"): rows slide smoothly by whole cards, card photos slide, hover zoom 1.03, popovers and sheets fade or slide; turned off for people who choose reduced motion.
8. **Sample listings:** 16 fake listings with "Sample" / "ตัวอย่าง" badges show only in development on the owner's computer, never on a real site.

---

## 3. Step status

| Step | What | Status |
|---|---|---|
| 0 | Project setup, rules, tracker | Done enough to build; small leftovers Pending |
| 1 | Colours, fonts, header, footer, phone tab bar, Thai/English | Built; a few items Pending (final logo) |
| 2 | PostgreSQL database + sample data | **Done** |
| 3 | Results pages, listing cards, filters, URL search | **Done** |
| R03 | Sample listings locked to local development | **Done** |
| 3B | Results 3 per row, card fixes, home Airbnb rows | **Done** (commit `77d268a`) |
| R05 | Tracker audit and grid fix | **Done** (commit `44f405a`) |
| 3C | Smooth motion on every page | **Done** (commit `c526206`) |
| 3D | Centred hero search, card facts with floor and sq ft | **Done** (commit `6a269f3`) |
| 3E | One listing card for home rows and results | **Next** |
| 4 | Map + nearby places | Not started |
| 5 | Property page | Not started |
| 6 | Contact form sending, LINE, WhatsApp | Not started |
| 7 | Rest of the home page | Not started |
| 8 | New projects, site plan, site visit booking | Not started |
| 9 | Saved homes, searches, viewings | Not started |
| 10A / 10B | Sign-in: wireframe first, then build | Not started |
| 11A / 11B | Admin: wireframe first, then build | Not started |
| 12 | Final testing, speed, launch preparation | Not started |

Tracker after 3C: 86 task IDs, 21 Done, 23 Pending, 42 Not started.

---

## 4. The remaining steps (full prompts are in `MSTAR-CODEX-PROMPTS-v5.md`)

**Step 4 — Map and nearby places.** Codex first lists 2–3 **free** map options with their limits and **stops** for the owner to choose (send the list to Claude to help decide). Then: "Show map" button on Buy/Rent/Investment opens list (2 per row) + map with price pins; card ↔ pin highlight; "Search as I move the map"; phone Map/List button; hidden-address listings show only an area circle; nearby schools, transit, shopping, hospitals from the chosen provider (never typed in by hand).

**Step 5 — Property page.** Back to results, Share, Save; photo grid with full-screen gallery; facts by type (condo, house, land, hotel); tabs that follow the scroll; price check only with real data; floor plan, video, 360°; nearby + map; mortgage calculator; "More units" and "Similar homes" with the small card; contact box laid out but sending switched on in Step 6.

**Step 6 — Contact form for real.** One form used everywhere (property page, phone bar, gallery, Contact agent on result cards). Saved to the database first, then emailed to the agent, with an acknowledgement to the buyer. Spam protection. LINE/WhatsApp use the owner's chosen contacts.

**Step 7 — Rest of the home page.** Category icon row, Continue your search, Explore by location, New projects by Mstar, Tools (mortgage calculator, "What is my home worth?" lead form, foreign buyer guide), Services for owners. Hero photo when the owner supplies one.

**Step 8 — New projects.** Project pages (e.g. Emperor Grand View): info card, home types with availability, clickable site plan (green available / amber reserved / grey sold), progress, brochure request, 3-step site visit booking for available plots.

**Step 9 — Saved.** Saved homes (from all hearts), saved searches with "N new", viewings and enquiries; works without an account, moves to the account after sign-in.

**Step 10A / 10B — Sign-in.** Codex makes a sign-in wireframe and the owner chooses LINE only or LINE + Google + email; only then build it.

**Step 11A / 11B — Admin.** Codex makes an admin wireframe (listings, photos, home rows, featured, filters, agents, locations, projects and plots, enquiries, users, audit); only after approval build it.

**Step 12 — Final checks.** Full testing on desktop and phone, speed (mobile page load under 2.5 s), SEO, PDPA, security, backups, deployment plan. No going live without the owner's OK.

---

## 5. Decisions still open (the owner must answer; never guess)

1. Logo file for white backgrounds (crest alone or wide version).
2. Where enquiry emails go: one Mstar inbox or each listing's agent.
3. LINE / WhatsApp: one company contact or one per agent (IDs and numbers not given yet).
4. Sign-in: LINE only, or LINE + Google + email.
5. Map provider: free / open-source, exact one chosen in Step 4.
6. Exchange-rate source for showing USD (THB is stored).
7. Real hero photo and real listing photos.

Already decided: gold accent; THB + USD; admin chooses per listing whether the price is public or "contact for price"; free mapping.

---

## 6. Owner's working rules (from the owner's global instructions)

- Never start a server unless the owner asks, and only after coding is done. Give localhost links. Stop it when asked, and before Codex runs tests (both use port 3000).
- Test on desktop **and** phone; any skipped test is named with its reason.
- Backend work is tested on the real running app, and saved values are checked in the database, not just status codes.
- Never delete files or folders without asking the owner first and getting a yes for that exact deletion.
- Installs, caches and big files go on the D: drive, never C:.
- No multiple-choice question cards; ask in plain text. No suggested next prompts.

---

## 7. How Claude opens the site for the owner

Only when asked:

```powershell
cd "D:\mstar companies\mstar property\mstar property new site"
$env:MSTAR_PG_BIN = 'D:/dev/tmp/mstar-step2/runtime/pgsql/bin'
./scripts/local-postgres.ps1 -Action start
$env:MSTAR_DEMO_MODE = '1'
npm run dev
```

Links: http://127.0.0.1:3000/en (home), /en/buy, /en/rent, /en/invest, /th (Thai), /api/health. The first page load in dev mode takes a minute while it compiles.

To stop: stop the dev server, then `./scripts/local-postgres.ps1 -Action stop`.

`.claude/launch.json` in the project (excluded from Git) holds the same start command for Claude's preview tool.

---

## 8. How to continue

1. The owner checks the 3C motion on the running site.
2. Stop the server.
3. Paste **Step 3E**, then **Step 4**, from `MSTAR-CODEX-PROMPTS-v5.md` into Codex.
4. When Codex lists the free map options, bring them to Claude to choose.
5. After each step, ask Claude to "check CLAUDE.md and progress.md" to review what Codex did.
