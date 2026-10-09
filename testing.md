# Verification record

## Step 2 verification — 2026-10-09

The latest task explicitly authorizes tests. PASS: production build and TypeScript. PASS: 16/16 Playwright checks against the real app at 390, 768, 1024 and 1440px in Thai/English. The previously deferred preference/search fixes now pass. Eight shell screenshots are captured; representative phone/desktop screenshots are reviewed. No UI is changed, and no pixel comparison with the original policy-blocked local prototype is claimed.

PASS: 12/12 groups against actual PostgreSQL 18.6 in the dedicated `mstar_property_step2_test` database: restricted migration role; migration application/rerun; seed/rerun and demo exclusion; multi-table joins; invalid field/status/locale/FK/unique rejection; location/plot hierarchy; typed admin filters and scope; parameterized enquiry insertion/readback with consent; fixture transaction rollback; public price/location privacy; index catalog and EXPLAIN plans; read-only runtime permissions; real pg_dump, committed initial rollback, pg_restore and migration rerun. The index plan checks disable sequential scans for tiny seed data; they prove usable indexes, not production speed.

The fixture enquiry is read back from PostgreSQL with its listing join, consent version, language and safely stored injection-shaped message, then rolled back. There are no implemented frontend enquiry forms in Step 2, so no form submission or notification-delivery claim is made. The 14-listing development seed remains fictional. Test evidence is in ignored `.local/step2-db-results.json`; the test backup is `.local/backups/step2-test.dump`.

PASS: real frontend `/en` and `/th` return HTTP 200 at `http://127.0.0.1:3000`. `/api/health` returns HTTP 200, database `ok`, ready true. Stopping PostgreSQL changes health to HTTP 503, database `unavailable`, ready false; restarting restores HTTP 200. Admin/auth/submission endpoints are absent. Both test servers stop after verification, per the current prompt; links are verified during the test run, not left running.

PASS: `npm run db:generate` detects no schema drift. Full dependency audit reports zero vulnerabilities after overriding the newly added tooling's old esbuild dependency. New dependencies are exact-pinned. Credentials are ignored, locally access-restricted, and excluded from Git/live; no shared PostgreSQL admin account is changed. An initial local bootstrap URL-encoding error is fixed, and the isolated cluster's generated credentials were rotated before successful tests.

Final completion checks cover all eight maintained documents, immutable baseline hashes, all six tracker sheets, 81 permanent IDs, synchronized category/status records, preserved history, cached counts, tables/freeze panes and intended Git/live SHA-256. Commit/push and final hash counts are recorded in progress.md and the final response. Older results below are historical.

## Active V5 guide — 2026-10-09

V5 adopted as the active stage guide. Application tests are deferred at owner request; no Playwright, build or PostgreSQL retest is run in this documentation task. Port 3000 is open for the explicitly requested preview; the frontend was verified HTTP 200 when reopened. No new runtime/DB pass is claimed. Documentation, workbook and safe mirror checks are separate from application testing. Original revised handoff files are preserved byte-for-byte during adoption; earlier hashes describe the preceding revision.

## Latest foundation evidence — 2026-10-09 — Pending

- PASS: final npm run build compiles production routes and checks TypeScript. Separate typecheck also passed.
- PASS before closure: eight real Chromium shell tests in Thai/English at 390px, 768px, 1024px and 1440px. Checked white background/exact gold, loaded fonts/crest, 64px sticky header, page overflow, mobile tabs, modal focus/Escape and disabled chat buttons. Screenshots were captured in ignored test-results/ and reviewed.
- PASS before closure: four real HTTP API/routing checks: health, Accept-Language priority, query-preserving redirects, invalid preferences, cross-origin rejection and noindex not-found content. Next's streamed not-found content can return HTTP 200; the test checks error content and noindex.
- FAILED before closure: four preference/search flows. Origin comparison rejected 127.0.0.1 because Next's internal address was localhost. Host-based validation is fixed and compiled; browser retesting has not run.
- NOT RETESTED: final phone search containment adjustment and approved green/white chat styling. Contact routing and active contact-button accessibility remain pending.
- VERIFIED before closure: /th, /en and /api/health at 127.0.0.1:3000. Health returned HTTP 200, status ok, database not_configured, ready false.
- CLOSED: owner requested port 3000 closed. Listening-port inventory confirmed closure. Tests no longer start a server automatically. Do not reopen without an explicit opening instruction.
- NOT RUN: real PostgreSQL, persisted submissions, authentication and admin. Configuration/components do not exist. No DB readiness is claimed.

PASS: all six tracker sheets rendered/reviewed; 81 stable IDs, complete category/status synchronization, preserved prior histories and untouched records, count caches, tables and freeze panes independently verified. PASS: 42 intended source/configuration/doc/tracker files match live by SHA-256 after baseline divergence checks. Three original handoff hashes remain unchanged. Application screenshots are review evidence, not a pixel regression baseline against the policy-blocked original HTML. Records below are historical.

## Step 0 — 2026-10-09 — R01 Pending

- PASS: inventory and full review of all original project Markdown plus approved wireframe CSS/markup/JavaScript.
- PASS: the approved wireframe's single inline script parses using Node.js VM syntax validation. This is a syntax check only.
- PASS: remote inspection returned successfully with no refs. There was no existing history to merge or overwrite.
- PASS: original handoff hashes recorded before changes and verified unchanged afterward.
- PASS: canonical tracker preserves existing IDs, uses six required sheets and keeps category/status records synchronized. Dates/test/Git/live/history columns extend the existing headings.
- PASS: intended preparation files are mirrored to live and compared with SHA-256. There is no deployable application yet.
- PASS: all 79 original tracker IDs remain; 81 total IDs have 0 Done, 11 Pending and 70 Not started. Exported XLSX records, count caches, tables, headings and freeze panes were checked independently after rendering all six sheets.
- PASS: preparation commit `cd897da` was pushed to origin/main. Approved sources preserve their original line endings and file hashes.
- NOT RUN: real application tests, PostgreSQL integration or persisted form submissions. No application/database configuration exists.
- NOT RUN: rendered frontend tests at 390px, 768px, 1024px and 1440px. No frontend exists in Step 0.
- BLOCKED: browser inspection of local wireframe was rejected because the browser permits only HTTP/HTTPS navigation. No alternate surface or workaround was used.
- NOT AVAILABLE: frontend URL, /api/health URL and admin URL. No application ports/start commands exist yet.

## Required before completing later steps

Test the actual Next.js application at all four required widths in Thai and English. Check overflow, nonwrapping navigation/buttons, keyboard focus and responsive behavior. Run affected flows on desktop and phone, against real PostgreSQL where relevant. Verify stored rows after submissions and report actual working frontend/API/admin URLs.

Do not count static prototype parsing, tracker validation or mirrored hashes as a replacement for application/DB tests. G4 and G5 remain Pending for this preparation task under the owner's rules.

## Owner decision update — 2026-10-09

This change updates documentation and existing tracker IDs only. Recheck six-tab/full-record synchronization, immutable handoff hashes and Git/live hashes after saving. No UI or backend tests are applicable to implemented code because no application code changed; no desktop/phone, PostgreSQL or localhost result is claimed. Runtime gates remain Pending until the application exists.
