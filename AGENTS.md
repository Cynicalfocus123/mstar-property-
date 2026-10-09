# Mstar Property project instructions

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
