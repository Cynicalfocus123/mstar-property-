# Architecture

## Current state — 2026-10-09

There is no application source, package.json, lockfile, Next.js configuration, TypeScript configuration, environment configuration, Drizzle configuration or application server in this workspace. The original files consist of handoff/prototypes, permanent rules and the supplied tracker. No existing MVP was found in the Mstar Property parent tree.

The supplied GitHub repository returned no refs and no history. Git has been initialized in the existing project root with origin set to that repository. Existing files were preserved. The owner authorized creation of missing project folders.

## Required future stack

Use one deployable Next.js App Router application with TypeScript, PostgreSQL and Drizzle ORM. Thai/English routes use /th and /en. Accept-Language selects the first-visit language; a preference cookie remembers the explicit choice. Store THB values and bilingual content as BUILD-SPEC describes.

Do not create a second backend application merely for /api/health. That endpoint belongs to the Next.js application and must distinguish application availability from database readiness. B34 records this future task.

No package versions, application ports or database credentials are selected in Step 0. Use established configuration if one is supplied before building. No production service has been changed.

## File synchronization

The project root is the Git working folder. `live/` is the local preparation/deployment mirror and is excluded from Git to avoid duplicate source history. Explicit allowlisting and SHA-256 checks prevent copying secrets, dependencies, .git or build caches. No deployable code exists yet; matching preparation files do not prove an operational deployment.

The canonical tracker remains at the project root under the latest user instruction. Its copy in live is a mirror, not a second editable source.

## Decision update — 2026-10-09

The future application supports THB and approximate USD display, per-record admin price visibility and free open-source mapping. Specific exchange-rate and mapping providers remain undecided. LINE/WhatsApp buttons precede integration. No dependencies, package versions, code, ports or services changed in this documentation task.
