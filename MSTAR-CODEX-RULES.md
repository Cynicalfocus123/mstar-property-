# Mstar Property — Codex permanent completion rules (V4)

## Current Step 3 — 2026-10-09

The owner's current Step 3 prompt takes precedence over older rules/path recommendations. The canonical tracker remains at the Git root, not project-management/. Applied filter history is preserved with router.push; drafts stay local. Demo records and metadata must remain explicitly fictional and local-only. Use the existing project runtime and configuration; run .mjs through Node. This task authorizes running only the required tests, then stopping both servers. No new authorization is inferred for maps, forms, admin, deployment or external messages.

Step 3 is complete for F08–F13, B05–B07 and R02 only. R02 records contact-dialog autofocus and swipe/keyboard regression fixes linked to F01/F08. The overall project and the independent Step 0/1 blockers remain Pending. Stop before Step 4.

Final validation: production build and TypeScript passed; 36/36 real Chromium browser tests passed in Thai/English at 390, 768, 1024 and 1440px; 12/12 real application/PostgreSQL search groups and 12/12 isolated PostgreSQL regression groups passed. Backup, all three migration apply/rerun, repeatable seed, joins, constraints, indexes, permissions and actual dump/rollback/restore were tested. Frontend, listings API and health returned HTTP 200 with the database ready. After stopping PostgreSQL, health and listings returned HTTP 503 without database details. Ports 3000 and 5432 are stopped after testing. Admin and real enquiry submission do not exist.

All nine maintained Markdown files are updated: AGENTS.md, README.md, design.md, architecture.md, database.md, testing.md, progress.md, MSTAR-CODEX-RULES.md and CLAUDE.md. Approved codex-handoff Markdown/HTML and historical sources remain immutable; their baseline hashes are verified instead. The same root workbook retains all prior IDs/history and adds R02: 82 IDs, 15 Done, 16 Pending, 51 Not started. All six views are regenerated and checked; Pending is yellow, Done light green and Not started red. The 59-file Git/live baseline is compared before copying intended source/config/docs/tracker, excluding secrets, dependencies, cluster, backups and caches. Final matching hashes and commit/push to origin/main are checked at closeout; the final report supplies the exact commit. If a final gate fails, affected tasks must revert to Pending.

Verified during testing, now stopped: http://127.0.0.1:3000/en/buy, http://127.0.0.1:3000/th/buy, /en/rent, /en/invest, /api/listings?route=buy&lang=en and /api/health on the same host/port. No admin URL. Existing owner choices remain unchanged. Older dated sections below are historical and do not override this section.


## Claude project handoff — 2026-10-09

Read [CLAUDE.md](CLAUDE.md) for the consolidated current project briefing: actual Git/live paths, approved V3/V5 references, implemented source, Step 2 proof, unimplemented Step 3, owner decisions, database/security contracts, server policy, tracker and completion gates. The owner requested this document so Claude can read and help Codex. This documentation-only task does not change application code, UI, migrations, seed or owner choices. Older dated sections below remain historical; this briefing identifies their current replacements. R01 receives an append-only tracker history entry, with all 81 IDs and statuses retained. Only documentation/workbook/mirror checks apply; no new app/browser/database test or working localhost claim is made. Ports 3000 and 5432 were found stopped during inspection; no admin exists. Approved handoff and historical files remain unchanged. Git/live synchronization and commit/push are verified at finalization.

## Tracker colours — 2026-10-09

The owner requested the recreated Excel before Step 3 implementation. The canonical root workbook now uses yellow Pending (#FFF2CC), light green Done (#C6EFCE), and red Not started (#FF6666), including full task rows, status tabs, and conditional rules. All six sheets, 81 permanent IDs, prior task records/history, formulas, tables, validations, and frozen headers are preserved. Status totals remain 5 Done, 16 Pending, and 60 Not started; R01 receives an append-only formatting history entry.

Workbook export checks and visual review of all six sheets passed. This changes workbook formatting and documentation only; application code, schema, migrations, seed, and approved UI are unchanged. Approved handoff and historical sources remain immutable. Git/live files are compared against the 58-file matching baseline before safe synchronization, then hashes and commit/push are verified during finalization. Step 3 is authorized and remains unimplemented; this Excel delivery does not claim Step 3 completion. Application/browser/PostgreSQL retests are not applicable to this formatting-only delivery and were not rerun. Frontend http://127.0.0.1:3000/en and health http://127.0.0.1:3000/api/health remain stopped, as previously requested; no admin exists.

## Current owner overrides and Step 2 — 2026-10-09

V5 is the active numbered guide. The latest Step 2 request authorizes real PostgreSQL/application tests and requires test servers to stop afterward. It supersedes older test-deferral/open-preview records below for this task. Run `.mjs` through Node; never open them directly in Windows. Preserve shared PostgreSQL admin accounts. This task created an isolated local Mstar cluster, with separate non-superuser migration and read-only application roles.

B01–B04 implement/test the 18-table schema, two migrations, rollback/backup/restore, fictional seed and indexes. B34 now verifies actual schema readiness; HTTP 503 on a stopped DB and HTTP 200 after restoration were tested. No UI redesign, real inventory, account provider, contact destination, map provider or admin implementation is introduced. Stop before Step 3.

The canonical root workbook and its six required tabs remain unchanged in identity. Update all eight maintained Markdown files and all tracker views, preserve historical task evidence, verify intended Git/live hashes and push safely. Approved handoff/historical files are immutable exceptions and must retain baseline hashes. Earlier current-state paragraphs below are historical; permanent rules continue except explicit owner overrides.

## Active V5 guide — 2026-10-09

Use `codex-handoff/MSTAR-CODEX-PROMPTS-v5.md` for future numbered steps. It supersedes V4 stage prompts, retains the canonical root workbook, adds home-page.html to approved references, and follows the owner's mapping direction. Existing rules below remain applicable except where overridden by newer owner instructions. Tests are deferred for now. The owner explicitly requested the currently open port 3000 preview; do not close that authorized preview merely because V5 says test servers should stop afterward. No new build stage is authorized by guide adoption.

**Mandatory for every coding task, bug fix, UI adjustment, refactor, migration and documentation change.** Every Codex task/prompt starts with `$caveman full`.


## Owner overrides and current state — 2026-10-09

The canonical tracker is in the project root, per the owner's latest instruction; this overrides the older project-management/ path below. Step 1 foundation compiles but remains Pending for browser preference/search retesting and PostgreSQL. Step 2 is unstarted. See testing.md.

The owner requested port 3000 closed and controls reopening. Keep servers/previews closed until asked. Provide configured local links every task with availability and identify missing admin components. Do not automatically open a server to satisfy completion gates; leave those gates Pending. This overrides the server-start requirement below. Other permanent rules remain applicable.

## Before any work
1. Read all maintained project `.md` files, plus `codex-handoff/BUILD-SPEC.md`, `codex-handoff/CODEX-PROMPT.md`, the complete `codex-handoff/wireframe.html`, and this rules file. Inspect the actual project tree and Git/live layout. Follow the **approved V3** UI (not the old forest-green V1). Review desktop and phone behavior before implementing changed UI.
2. Confirm the existing Git working folder, configured remote and `live/` folder. Do not invent paths, create a new repository, overwrite divergent work, move production files, or change live services without the user's approval.
3. Only implement the requested step. Approved source-of-truth handoff files remain unchanged unless the owner explicitly revises the spec. Do not create a new UI without a wireframe and owner approval.
4. Conserve tokens: small diffs, focused tests, capped logs. No Serena dashboard unless explicitly required. Use the existing interpreter/project configuration and do not repeatedly ask.

## Six-tab Excel tracker (required EVERY task)
- Canonical project workbook: `project-management/Mstar-Property-Task-Tracker.xlsx` in the actual Git working folder. If it does not exist, install the supplied starter workbook at this path. Update the **same workbook** every task; do not create a separate dated workbook for every fix.
- Required worksheets: `Frontend`, `Backend`, `Emails`, `Done`, `Pending`, `Not started`. Preserve their current headings, formatting, stable IDs and status categories. `Emails` is included because it exists in the supplied CoreCart reference.
- Use stable IDs: `F##` frontend, `B##` backend, `E##` emails, `R##` newly discovered cross-component fixes. Never renumber/reuse IDs or silently delete a task. Create a new `R##` for a newly discovered bug and link it to the original task in the explanation.
- The **status worksheets** are the canonical task states: a task appears in exactly one of `Done`, `Pending`, or `Not started`. `Frontend`, `Backend`, `Emails` are synchronized open-task views, with no duplicate entries inside one tab. Changing status must rebuild/synchronize ALL affected worksheets, counts, and category views, not just a status cell in isolation.
- On every task, record the exact work implemented or fixed, test results, reason for blocking, Git commit/push status, verified live/Git sync state, and who acts next. Keep blockers in `Pending`, untouched planned work in `Not started`.
- Never mark a task `Done` until every completion gate below succeeds. If one gate cannot be satisfied, mark `Pending` and state the real reason. The tracker must stay readable and valid in Microsoft Excel; use a reliable workbook update library/script and verify no task IDs disappear or duplicate.

## Completion gates — ALL FIVE mandatory
**G1. Markdown:** Update **every maintained project `.md` file** (at minimum `AGENTS.md`, `README.md`, `design.md`, `architecture.md`, `database.md`, `testing.md`, `progress.md`, plus any other live maintained project Markdown). Each should reflect the latest applicable state, with an explicit unchanged/not-applicable record where appropriate. Do not alter approved immutable `codex-handoff/BUILD-SPEC.md` just to create a timestamp. A task without the documentation check is not complete.

**G2. Excel:** Update `project-management/Mstar-Property-Task-Tracker.xlsx` in the same task. Update rows, statuses, evidence and the `Frontend`, `Backend`, `Emails`, `Done`, `Pending`, `Not started` views. Verify all six sheets and stable IDs after saving.

**G3. Git + live:** Make code, configs, maintained docs and Excel consistent in the **actual** Git folder and `live/` folder. Diff and synchronize deployable and project-management files; verify matching hashes/diffs. Never copy `.git`, `.env`, credentials, node_modules, temporary caches or build artifacts into the live tree blindly. Preserve runtime-only config, never force-push, and never overwrite a diverged live tree without approval. Commit and push safely if the configured remote/auth permits; if not, report the exact Git blocker and keep status Pending.

**G4. Testing:** Run appropriate automated tests against the **real running development app and PostgreSQL**, not just mocks, including Playwright desktop/phone where affected. Verify DB data after real form submissions. Record pass/fail and meaningful visual regression results. Do not claim an unrun test passed.

**G5. Localhost previews:** Start or verify real servers and provide **actual URLs that resolve on the user's machine**, for frontend and backend health/API, plus admin URL once implemented. Use existing configured ports rather than inventing URLs. Distinguish backend API from admin UI. If the environment cannot expose localhost to the user, report the precise limitation and the reproducible start command, leave the verification gate Pending, and never fabricate a working link.

## Per-task final report (required, concise)
1. Task ID(s) + summary of actual changes.
2. Tests run with results (desktop + phone as applicable, DB proof for submissions).
3. Markdown files updated (or unchanged/immutable justification).
4. Excel workbook updated, affected rows/tabs, status + any blockers.
5. Git commit hash/push state and Git/live synchronization result.
6. Actual frontend URL, backend/API URL, admin URL if present, and whether each was verified.
7. Explicit overall status: `Done` ONLY if all five gates passed; otherwise `Pending` with concrete next action.

## Source-of-truth conflict handling
- V3 BUILD-SPEC and wireframe define approved UI. The old `WIREFRAME.md` green theme is superseded. Do not mix palettes.
- Do not guess any of BUILD-SPEC §12's eight unresolved owner choices.
- No admin production implementation until its admin wireframe is approved. No account production UI until its auth wireframe is approved.
- Test before touching real user or production data; migrations must have rollback plans and verified backups.

## Owner clarification and Step 0 record — 9 Oct 2026

- The latest explicit owner instruction places the canonical workbook at the project root: `Mstar-Property-Task-Tracker.xlsx`. This overrides the older `project-management/` path above. Keep one editable canonical workbook and a matching live mirror.
- The owner authorized Codex to create missing Git/live folders. The existing project root is `D:/mstar companies/mstar property/mstar property new site`; origin is `https://github.com/Cynicalfocus123/mstar-property-.git`. The remote was empty on initial inspection.
- Step 1 instructions are advance instructions for the later build. This preparation step does not implement the frontend foundation or Step 2 database.
- R01 remains Pending because application/DB tests and localhost verification cannot pass before those components exist. Maintained documentation, the tracker and preparation mirror record the exact state. The approved handoff remains immutable.
- `WIREFRAME.md` and the older prototype copies are historical, not maintained implementation documentation. Preserve them unchanged; the approved V3 handoff governs current work.

## Owner decision update — 9 Oct 2026

The owner selected wireframe colours/default gold, USD and THB, per-record admin price visibility, chat buttons before integration, and free open-source mapping. The header logo will be supplied later. `design.md` records these choices and the remaining details. Preserve the original handoff while applying the owner's later choices. No application code is built in this decision-recording update; runtime completion gates remain Pending.
