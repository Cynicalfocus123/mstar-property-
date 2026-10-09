# Database

## Current state — 2026-10-09

No project PostgreSQL connection configuration, Drizzle schema, migrations, seed data or database client exists. The service inventory found no Windows service named for PostgreSQL; this does not exclude PostgreSQL on another machine or in a container. No database connection was attempted without project configuration.

No production/user data was read or changed. Database integration and form-persistence tests were not run. R01 remains Pending; B01–B04 remain Not started.

## Later database step

Follow BUILD-SPEC section 13 for agents, locations, stations, projects, unit types, plots, listings, media, nearby places, enquiries, chat clicks, users and saved data. Keep type-specific listing fields, bilingual content, constraints and search indexes. Enquiries must save before notifications are sent.

Step 2 creates schema and clearly fictional seed data only when authorized. Before migrations touch production, verify backups and document/test rollback procedures. No database name, port or credentials have been invented.
