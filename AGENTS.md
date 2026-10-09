# Mstar Property project instructions

## Current Step 3 — 2026-10-09

Use the active V5 stage guide. Step 3 now implements approved reusable cards, results and safe shared URL state. Applied filters use router.push to preserve meaningful browser history; popup drafts do not change URLs. Preserve the public-price and hidden-location protections in lib/listing-search.ts. Demo preview requires an explicit local flag, trusted local Host and named local development/test database; never expose fictional stock as genuine inventory. Server opening is permitted only for explicit owner preview or tests expressly authorized in the current task. Stop test servers afterward.

Step 3 is complete for F08–F13, B05–B07 and R02 only. R02 records contact-dialog autofocus and swipe/keyboard regression fixes linked to F01/F08. The overall project and the independent Step 0/1 blockers remain Pending. Stop before Step 4.

Final validation: production build and TypeScript passed; 36/36 real Chromium browser tests passed in Thai/English at 390, 768, 1024 and 1440px; 12/12 real application/PostgreSQL search groups and 12/12 isolated PostgreSQL regression groups passed. Backup, all three migration apply/rerun, repeatable seed, joins, constraints, indexes, permissions and actual dump/rollback/restore were tested. Frontend, listings API and health returned HTTP 200 with the database ready. After stopping PostgreSQL, health and listings returned HTTP 503 without database details. Ports 3000 and 5432 are stopped after testing. Admin and real enquiry submission do not exist.

All nine maintained Markdown files are updated: AGENTS.md, README.md, design.md, architecture.md, database.md, testing.md, progress.md, MSTAR-CODEX-RULES.md and CLAUDE.md. Approved codex-handoff Markdown/HTML and historical sources remain immutable; their baseline hashes are verified instead. The same root workbook retains all prior IDs/history and adds R02: 82 IDs, 15 Done, 16 Pending, 51 Not started. All six views are regenerated and checked; Pending is yellow, Done light green and Not started red. The 59-file Git/live baseline is compared before copying intended source/config/docs/tracker, excluding secrets, dependencies, cluster, backups and caches. Final matching hashes and commit/push to origin/main are checked at closeout; the final report supplies the exact commit. If a final gate fails, affected tasks must revert to Pending.

Verified during testing, now stopped: http://127.0.0.1:3000/en/buy, http://127.0.0.1:3000/th/buy, /en/rent, /en/invest, /api/listings?route=buy&lang=en and /api/health on the same host/port. No admin URL. Existing owner choices remain unchanged. Older dated sections below are historical and do not override this section.


## Claude project handoff — 2026-10-09

Read [CLAUDE.md](CLAUDE.md) for the consolidated current project briefing: actual Git/live paths, approved V3/V5 references, implemented source, Step 2 proof, unimplemented Step 3, owner decisions, database/security contracts, server policy, tracker and completion gates. The owner requested this document so Claude can read and help Codex. This documentation-only task does not change application code, UI, migrations, seed or owner choices. Older dated sections below remain historical; this briefing identifies their current replacements. R01 receives an append-only tracker history entry, with all 81 IDs and statuses retained. Only documentation/workbook/mirror checks apply; no new app/browser/database test or working localhost claim is made. Ports 3000 and 5432 were found stopped during inspection; no admin exists. Approved handoff and historical files remain unchanged. Git/live synchronization and commit/push are verified at finalization.

## Tracker colours — 2026-10-09

The owner requested the recreated Excel before Step 3 implementation. The canonical root workbook now uses yellow Pending (#FFF2CC), light green Done (#C6EFCE), and red Not started (#FF6666), including full task rows, status tabs, and conditional rules. All six sheets, 81 permanent IDs, prior task records/history, formulas, tables, validations, and frozen headers are preserved. Status totals remain 5 Done, 16 Pending, and 60 Not started; R01 receives an append-only formatting history entry.

Workbook export checks and visual review of all six sheets passed. This changes workbook formatting and documentation only; application code, schema, migrations, seed, and approved UI are unchanged. Approved handoff and historical sources remain immutable. Git/live files are compared against the 58-file matching baseline before safe synchronization, then hashes and commit/push are verified during finalization. Step 3 is authorized and remains unimplemented; this Excel delivery does not claim Step 3 completion. Application/browser/PostgreSQL retests are not applicable to this formatting-only delivery and were not rerun. Frontend http://127.0.0.1:3000/en and health http://127.0.0.1:3000/api/health remain stopped, as previously requested; no admin exists.

## Current Step 2 workflow and state — 2026-10-09

The owner explicitly authorized Step 2 and its real application/PostgreSQL tests. That authorization supersedes earlier test deferral for this task. Implement only Step 2; do not start Step 3. Run `.mjs` files through Node, never through Windows file associations. Do not rotate a shared PostgreSQL admin password; change only Mstar roles when required. The cluster created for this task is isolated at `.local/postgres-data` and does not belong to other projects.

Step 2 now has 18 Drizzle tables, two committed migrations, an initial test-only rollback, and 14 clearly fictional listings. B01–B04 and B34 have passed implementation tests; the final Git/tracker/synchronization report closes their gates. Preserve server-only access and read-only runtime credentials. Use a separate migration role and dedicated test database. Seed only the named local development/test databases; demo data must never become genuine inventory. Public listing projection excludes demo records, gated prices and hidden exact location data. Future forms/auth/admin require their authorized stages and least-privilege write grants.

Stop servers used for this task after verification, as the current Step 2 prompt requests. Local URLs remain the configured port 3000 links; label them verified during testing and stopped afterward. Earlier preview/open-port and test-deferral paragraphs below are historical. No admin exists.

All eight maintained Markdown files are updated for this task. Immutable exceptions are `codex-handoff/BUILD-SPEC.md`, `CODEX-PROMPT.md`, `MSTAR-CODEX-PROMPTS-v5.md`, approved HTML files and historical `WIREFRAME.md`/prototype copies. Verify their baseline hashes rather than rewriting them.

## Active V5 guide — 2026-10-09

Use `codex-handoff/MSTAR-CODEX-PROMPTS-v5.md` as the active numbered stage guide from now on, replacing V4. Its stage numbering takes precedence over BUILD-SPEC section 16 when referring to steps. Read the updated BUILD-SPEC, wireframe.html and home-page.html before implementing affected UI. Step 3 uses one Realtor-style 3:2 listing card; Step 6 wires its Contact agent dialog; Step 7 adds Homes for you directly below search. Mapping choices follow the owner's free/open-source direction and V5 Step 4. This adoption does not authorize any build step.

Keep the root workbook. The owner deferred tests for now. Port 3000 is currently open for viewing at the owner's explicit request; keep that authorized preview until asked to close it. Future test servers stop afterward unless the owner requests otherwise. Other completion gates and existing Pending tasks remain applicable.

## Permanent workflow

- Start every Codex task with `$caveman full`. Keep persisted documentation, comments and commits in normal clear English.
- Read all existing project Markdown before every task, including this file, the rules file, and all maintained documents. Exclude generated dependency/cache contents and the duplicate live mirror from repeated reading.
- Read `codex-handoff/BUILD-SPEC.md`, `codex-handoff/CODEX-PROMPT.md` and the complete `codex-handoff/wireframe.html`. Review affected desktop and phone interactions before changing UI.
- Claude's approved V3 wireframe is the visual source of truth. BUILD-SPEC defines functionality and requirements. The old forest-green V1 is superseded.
- Do not redesign approved UI. For new UI without an approved wireframe, create the wireframe and wait for owner approval. Admin and account production UI require separate approval.
- Preserve approved handoff sources. Never alter those files merely to record progress. Keep V1/V2 historical references unchanged.
- Use Next.js App Router, TypeScript, PostgreSQL and Drizzle ORM. Prioritize lightweight code, performance, responsive layouts, SEO and accessibility.
- Use exact V3 design tokens and Prompt/Noto Sans Thai fonts. Use 720px and 1000px breakpoints and validate 390px, 768px, 1024px and 1440px.
- Keep scans, diffs, logs and tests focused. Avoid unrelated work and redundant scans. Never launch Serena dashboard unless explicitly required.
- Use existing project configuration and interpreter. At Step 0 there is no application configuration or package manifest to reuse; document chosen settings when the build is authorized.
- Implement only the currently authorized step. Step 3 is the latest authorized stage; never begin Step 4 without its prompt.
- Keep localhost closed unless explicitly requested open. The owner requested port 3000 closed during Step 1. Start servers only under explicit owner preview or test authorization in the current task; the Step 3 prompt authorizes its tests and requires shutdown afterward. Provide configured local links every task and state availability. Completion gates alone do not authorize reopening ports.
- Do not guess any of BUILD-SPEC section 12's eight owner decisions. See `design.md` for existing tracker IDs.

## Repository and live mirror

- Git working directory: `D:/mstar companies/mstar property/mstar property new site`.
- Remote: `https://github.com/Cynicalfocus123/mstar-property-.git`; branch: `main`.
- Live mirror: `live/` inside that Git working directory. It is a local mirror, not proof of a running or deployed site.
- The owner authorized creating missing Git/live folders on 2026-10-09. Do not create unrelated repositories or change production services.
- Compare before synchronizing. Never overwrite divergent work. Never mirror `.git`, `.env`, credentials, dependencies or build caches. Preserve runtime-only configuration.
- Commit and push requested changes safely. Never force-push. Record any authentication or remote divergence blocker accurately.

## Canonical tracker

- Use the existing root `Mstar-Property-Task-Tracker.xlsx`. The owner's latest explicit root-path instruction overrides the older `project-management/` path in MSTAR-CODEX-RULES.md. Do not create a second canonical workbook.
- Preserve the six tabs: Frontend, Backend, Emails, Done, Pending, Not started. CoreCart is a structural reference; never import CoreCart task content.
- Preserve permanent IDs. Frontend uses F##, backend B##, email E##, cross-component work/fixes R##. Never renumber, reuse or delete a task ID.
- Status sheets are canonical: each task belongs to exactly one of Done, Pending, Not started. Category tabs are synchronized open-task views. Completed tasks appear only in Done.
- Every task records description, category, status, dates, tests, blockers, next actor/action, Git/push state, live synchronization and append-only history. Preserve existing history when updating an ID.
- Update the same workbook each task and verify all six sheets, formulas, tables, synchronized records and IDs after saving.

## Mandatory completion gates

A task is Done only after all five gates pass:

1. Update every maintained Markdown file with accurate applicable state; record unchanged/not-applicable sections. Preserve immutable handoff and historical files.
2. Update the canonical Excel tracker, including all category/status views and evidence.
3. Compare and synchronize intended code/configuration/documentation/tracker in Git and live safely; verify matching hashes. Commit and push if available.
4. Run relevant automated tests against the real app and PostgreSQL. Test desktop/phone where affected, and verify database rows after real submissions. Never report unrun tests as passed.
5. Verify and report actual frontend and backend health/API URLs, plus admin once implemented. Report absent components explicitly. Never invent ports or working URLs.

If any gate fails, retain Pending with the exact reason and next action. Report IDs, actual changes, tests, documents, tracker state, commit/push state, synchronization and verified URLs concisely. Migrations require verified backups and rollback plans before production changes.

## Step 0 record — 2026-10-09

R01 records preparation as Pending because no application, project PostgreSQL configuration or localhost endpoints exist. No application code or approved UI was changed. See `progress.md` and `testing.md`.

## Owner choices — 2026-10-09

Use the approved wireframe colours/default gold. The header logo is deferred. Support USD and THB, with THB as the stored base. Allow an admin to choose public or contact-gated prices per listing/project. Prioritize approved LINE/WhatsApp buttons before integration; do not invent contacts. Mapping must be free and open-source for now; the concrete provider/library is still undecided. These choices update `design.md` without rewriting the immutable handoff. That decision-recording task preceded the authorized foundation build.

## Current implementation — 2026-10-09

Step 1 foundation compiles. F01/F04/F05/F06/F07/B34 and R01 remain Pending for browser preference/search retesting, real PostgreSQL and closed localhost. No Step 2 schema, seed, admin or authentication exists. See testing.md. Earlier Step 0 descriptions are historical.
