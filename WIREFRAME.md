# Mstar Property — design wireframe v1

**Date:** 2026-10-08
**Status:** Awaiting approval; demonstration only; do not mistake for deployed functionality.

## Design principles
- Company real estate site, not a marketplace or vacation booking platform. Clean white backgrounds, forest-green accent, reserved headings, lightweight header; no excessive cards or boxed content.
- Inspiration only: Airbnb compact search and listing imagery; Zillow five-image photo gallery, facts & features and inquiry; realtor-style search filter chips. Use original branding/design, no competitor assets.
- Primary flow: Homepage search → Listing grid with identical filters → Property detail → Contact agent.
- Account flow: Public Log in / Register → (planned) Saved homes / inquiry tracking. Admin accounts are separate and permission-checked.
- Secondary flow: Admin manage filter values → Home and Listings search lists reflect published active values.

## Wireframe interactions
1. **Home**: Location search, Buy/Rent selector, dynamic property-type selector, search, filters; featured and browse-by-type lists.
2. **Listings**: The same search interface, active type chips, min/max price, minimum bedrooms, sorting, empty state. Sale and rent datasets shown separately in this prototype.
3. **Property detail**: Photo mosaic, full gallery next/previous, price and summary, description, fact rows, amenity grid, approximate map placeholder, nearby schools/transit/grocery/parks examples, contact agent form and similar homes.
4. **Account dialog**: Log in and Register tabs, example form fields. No actual login or data transfer.
5. **Admin search filters**: Add/edit/delete *property-type choices* interactively in local memory. Additional planned groups shown but not implemented; changes are not persisted. Production must enforce schema constraints, role authorization, audit logging and safe migrations / option deletion rules.
6. **Responsive**: Desktop/mobile preview switch plus CSS breakpoints.

## Production backend requirements after UI approval
- Next.js + TypeScript, PostgreSQL + Drizzle, image optimization, high-quality galleries.
- Buyer accounts: secure server-managed sessions, password hashing, email verification/recovery, anti-abuse controls, authorization for saved properties/inquiry history, Thailand PDPA privacy design.
- Admin permissions: server-side RBAC and audit logging for properties, filter groups/options, agents and inquiries.
- Filter system: typed filter definitions, configured options, per-property filter values, searchable query indexes, shared URL query state for homepage/listings, no arbitrary executable user-defined filters.
- Nearby/schools/maps: use trustworthy third-party/location sources when connected. Distances/school ratings must not be invented or misrepresented. Budget API costs and comply with data-use restrictions.
- Similar homes: city/area, property type, sale/rent intent, price proximity; indexed database search and deterministic fallbacks.
- Admin updates invalidate relevant search caches and revalidate listing SEO metadata.
- Keep front/backend on same deployable codebase/server if operationally practical.

## Source and mirroring
- `live/index.html` and `github/index.html` are byte-identical exported *wireframe previews*. They are not connected to an actual production deployment or GitHub repository; those paths were not present in the user attachments.
- Existing `README.md` and `RESEARCH-AND-DESIGN.md` updated to record wireframe scope and status.
- Do not modify existing MVP code or publish accounts/features without UI sign-off.

## Verification
- The inline JavaScript parses under Node.js 22 (`node --check`).
- Live and GitHub-folder preview copies are synchronized using file comparison.
- No real authentication, database migrations, web server or browser end-to-end tests are represented as complete.
