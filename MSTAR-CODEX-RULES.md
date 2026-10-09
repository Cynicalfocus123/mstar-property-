# Mstar Property — Codex permanent completion rules (V4)

**Mandatory for every coding task, bug fix, UI adjustment, refactor, migration and documentation change.** Every Codex task/prompt starts with `$caveman full`.

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
