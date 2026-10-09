# Database

## Current state — 2026-10-09

The foundation includes postgres.js, Drizzle ORM and a server-only health probe in lib/db.ts. .env.example lists an empty DATABASE_URL. No credentials, database name or connection configuration were invented. Earlier inventory detected no local PostgreSQL service/executable.

Without DATABASE_URL, health returns database not_configured, ready false and HTTP 200 for the available app. With configuration, it runs select 1 through Drizzle and closes the connection; failure returns HTTP 503. Real PostgreSQL integration is not tested. Localhost is closed on owner request.

There are no schemas, migrations, seed records or persisted submissions. B01–B04 remain Not started. No production/user data was read or changed. R01 and B34 remain Pending for real database verification.

## Later authorized database step

Follow BUILD-SPEC section 13 for the schema, bilingual content, type-specific fields, constraints and indexes. Save enquiries before sending notifications. Verify backups and rollback procedures before production migrations.

Use THB as stored base, approximate daily USD conversion after a rate source is chosen, and admin-selected public/contact-gated prices per listing/project. Mapping is free/open-source in direction, with concrete providers unresolved. Step 1 does not authorize Step 2 schema/seed work.
