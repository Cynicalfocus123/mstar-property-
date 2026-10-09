# Design direction

## Tracker colours — 2026-10-09

The owner requested the recreated Excel before Step 3 implementation. The canonical root workbook now uses yellow Pending (#FFF2CC), light green Done (#C6EFCE), and red Not started (#FF6666), including full task rows, status tabs, and conditional rules. All six sheets, 81 permanent IDs, prior task records/history, formulas, tables, validations, and frozen headers are preserved. Status totals remain 5 Done, 16 Pending, and 60 Not started; R01 receives an append-only formatting history entry.

Workbook export checks and visual review of all six sheets passed. This changes workbook formatting and documentation only; application code, schema, migrations, seed, and approved UI are unchanged. Approved handoff and historical sources remain immutable. Git/live files are compared against the 58-file matching baseline before safe synchronization, then hashes and commit/push are verified during finalization. Step 3 is authorized and remains unimplemented; this Excel delivery does not claim Step 3 completion. Application/browser/PostgreSQL retests are not applicable to this formatting-only delivery and were not rerun. Frontend http://127.0.0.1:3000/en and health http://127.0.0.1:3000/api/health remain stopped, as previously requested; no admin exists.

## Current Step 2 design review — 2026-10-09

The complete updated approved V3 wireframe and home-page.html CSS, desktop/phone markup and JavaScript are reviewed for this database task. No UI changes are made. Production screenshots from both locales at 390/768/1024/1440px confirm the existing shell; they are not a rendered comparison with the policy-blocked original local HTML.

Database content supports both Thai and English, seven property types, THB base prices and an explicit required public/contact-gated choice per listing/project. No default price-visibility policy or authentication provider is guessed. Demo titles/names are marked `[FICTIONAL DEMO]` and Thai equivalents. Invented prices, availability, agents and nearby distances are test data only; the public view excludes demo stock. Real mapping/rates/contacts remain unresolved. The header logo remains deferred.

All 16 existing browser/API checks now pass. Step 2 adds schema/seed only; cards remain Step 3, the shared enquiry submit remains Step 6, and Homes for you remains Step 7. Local test servers stop after this task. Previous implementation/status paragraphs below describe historical state.

## Active V5 guide — 2026-10-09

V5 replaces V4 for numbered stages. Owner-supplied updated V3 references introduce Realtor-style 3:2 listing cards, a Contact agent dialog, and Homes for you immediately below homepage search. Follow BUILD-SPEC section 4.3 and home-page.html; reuse one card across home/results/Saved. Step 3 builds cards, Step 6 wires contact, Step 7 builds the homepage carousel. No UI is changed in this adoption. Updated HTML still requires thorough source/rendered review during affected implementation; no new rendered-design check is claimed.

## Approved reference — 2026-10-09

Use `codex-handoff/wireframe.html` for visuals/interactions and BUILD-SPEC for requirements. The complete CSS, markup and JavaScript were reviewed. The source contains six screens: Home, Search results, Property, New project, Book site visit and Saved.

Use a white site, dark slate text, exact CSS variables, Prompt headings and Noto Sans Thai body text. The owner selected the wireframe colours on 2026-10-09: retain its default gold accent (#f2a91a) and associated section 2 tokens. The header is 64px, its crest is about 44px, Sign in is rectangular with an 8px radius, and navigation/button labels must not wrap. Phone behavior begins at 720px; narrow desktop behavior applies through 1000px.

Desktop results pair a two-column list with a map. Phone results use a Map/List toggle. Individual properties use the enquiry form and LINE/WhatsApp contact actions, with no calendar. Only projects use site visits and plot availability. Saved homes/searches work on the device before account sign-in.

Prototype photo gradients, stock examples, agent names, distances, prices, yields and crest are placeholders. Review toolbar/pins must not enter the product. Real nearby data and area averages require verified sources.

Browser visual/interaction review remains unverified: browser policy rejects local file navigation. This source review does not establish rendered behavior at any viewport. See `testing.md`.

## Owner decision register — updated 2026-10-09

1. F02: use the approved wireframe colours and its default gold accent. Exact section 2 tokens are implemented in the foundation.
2. F03: header logo will be supplied later. Final asset/version remains deferred; the foundation uses the approved temporary SVG crest extracted from the handoff.
3. B17: enquiry email — shared inbox or listing agent.
4. B18: create the approved LINE/WhatsApp buttons before integration. Company versus per-agent routing and actual contacts remain unresolved. Do not invent phone numbers or chat destinations.
5. B23: sign-in providers — LINE only or LINE + Google + email.
6. B28: support USD (US dollars) and THB for now. THB remains the stored base currency; converted USD is approximate. The rate source is not selected yet.
7. B29: support both public prices and contact-gated prices. An admin selects the visibility when adding a listing/product or project. Admin production UI still requires its approved wireframe.
8. B09: use free, open-source mapping for now. The specific library, tile/nearby provider and usage policy are not yet selected. Do not select a paid map provider or promise unlimited free tiles.

The owner has answered colour, supported currencies and price-visibility policy, and set the chat-button priority and map-cost direction. Enquiry routing, chat contacts/routing and sign-in providers remain unresolved; the logo is deferred. Decision rows remain Pending under the project's completion gates, with the resolved choices stated explicitly rather than treated as unanswered. Account/admin UI require separate wireframe approval (F32/F34).

## Foundation implementation — 2026-10-09

The owner started Step 1. Global tokens/fonts, header, footer, five phone tabs, shared controls, /th and /en preference routing and health are implemented. The preview is a partial shell, not the full approved homepage. Content, listings and data-backed filters await later steps. No Step 2 work is included.

Eight Thai/English shell tests passed at 390px, 768px, 1024px and 1440px. Screenshots were captured and reviewed. Phone search containment was tightened after review and requires retesting. Chat buttons use approved green/white styling and remain disabled until real contacts arrive; active contact-button contrast needs review before integration. No admin/account UI or paid provider was selected.

The owner requested port 3000 closed. Four preference/search flows need retesting after the compiled origin-validation fix. Original wireframe browser review remains unverified; application screenshots are separate evidence.
