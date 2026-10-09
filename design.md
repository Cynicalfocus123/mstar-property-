# Design direction

## Approved reference — 2026-10-09

Use `codex-handoff/wireframe.html` for visuals/interactions and BUILD-SPEC for requirements. The complete CSS, markup and JavaScript were reviewed. The source contains six screens: Home, Search results, Property, New project, Book site visit and Saved.

Use a white site, dark slate text, exact CSS variables, Prompt headings and Noto Sans Thai body text. The owner selected the wireframe colours on 2026-10-09: retain its default gold accent (#f2a91a) and associated section 2 tokens. The header is 64px, its crest is about 44px, Sign in is rectangular with an 8px radius, and navigation/button labels must not wrap. Phone behavior begins at 720px; narrow desktop behavior applies through 1000px.

Desktop results pair a two-column list with a map. Phone results use a Map/List toggle. Individual properties use the enquiry form and LINE/WhatsApp contact actions, with no calendar. Only projects use site visits and plot availability. Saved homes/searches work on the device before account sign-in.

Prototype photo gradients, stock examples, agent names, distances, prices, yields and crest are placeholders. Review toolbar/pins must not enter the product. Real nearby data and area averages require verified sources.

Browser visual/interaction review remains unverified: browser policy rejects local file navigation. This source review does not establish rendered behavior at any viewport. See `testing.md`.

## Owner decision register — updated 2026-10-09

1. F02: use the approved wireframe colours and its default gold accent. Decision recorded; implementation has not started.
2. F03: header logo will be supplied later. Final asset/version remains deferred; use the approved temporary crest only when the foundation build starts.
3. B17: enquiry email — shared inbox or listing agent.
4. B18: create the approved LINE/WhatsApp buttons before integration. Company versus per-agent routing and actual contacts remain unresolved. Do not invent phone numbers or chat destinations.
5. B23: sign-in providers — LINE only or LINE + Google + email.
6. B28: support USD (US dollars) and THB for now. THB remains the stored base currency; converted USD is approximate. The rate source is not selected yet.
7. B29: support both public prices and contact-gated prices. An admin selects the visibility when adding a listing/product or project. Admin production UI still requires its approved wireframe.
8. B09: use free, open-source mapping for now. The specific library, tile/nearby provider and usage policy are not yet selected. Do not select a paid map provider or promise unlimited free tiles.

The owner has answered colour, supported currencies and price-visibility policy, and set the chat-button priority and map-cost direction. Enquiry routing, chat contacts/routing and sign-in providers remain unresolved; the logo is deferred. Decision rows remain Pending under the project's completion gates, with the resolved choices stated explicitly rather than treated as unanswered. Account/admin UI require separate wireframe approval (F32/F34).

## Upcoming foundation

The owner's advance Step 1 scope covers global tokens/fonts, header, footer, phone tabs, reusable controls, /th and /en routing with preference cookies, and /api/health. Implement it only after the build starts. No Step 2 schema or seed work is authorized in Step 1.
