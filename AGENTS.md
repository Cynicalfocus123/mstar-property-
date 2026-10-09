# Mstar Property project instructions

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
- Implement only the requested step. The owner started Step 1 on 2026-10-09. Never begin Step 2 under Step 1 authorization.
- Keep localhost closed unless explicitly requested open. The owner requested port 3000 closed during Step 1. Never start a server, preview or test-managed server automatically. Provide configured local links every task and state availability. Completion gates do not authorize reopening ports.
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
