# Design direction

## Approved reference — 2026-10-09

Use `codex-handoff/wireframe.html` for visuals/interactions and BUILD-SPEC for requirements. The complete CSS, markup and JavaScript were reviewed. The source contains six screens: Home, Search results, Property, New project, Book site visit and Saved.

Use a white site, dark slate text, exact CSS variables, Prompt headings and Noto Sans Thai body text. Gold is the reference default, not a final owner choice. The header is 64px, its crest is about 44px, Sign in is rectangular with an 8px radius, and navigation/button labels must not wrap. Phone behavior begins at 720px; narrow desktop behavior applies through 1000px.

Desktop results pair a two-column list with a map. Phone results use a Map/List toggle. Individual properties use the enquiry form and LINE/WhatsApp contact actions, with no calendar. Only projects use site visits and plot availability. Saved homes/searches work on the device before account sign-in.

Prototype photo gradients, stock examples, agent names, distances, prices, yields and crest are placeholders. Review toolbar/pins must not enter the product. Real nearby data and area averages require verified sources.

Browser visual/interaction review remains unverified: browser policy rejects local file navigation. This source review does not establish rendered behavior at any viewport. See `testing.md`.

## Eight unresolved owner choices

1. F02: final accent — gold, blue, teal or coral.
2. F03: header logo — crest only or horizontal; final white-background asset.
3. B17: enquiry email — shared inbox or listing agent.
4. B18: LINE/WhatsApp — company contacts or per-agent contacts.
5. B23: sign-in providers — LINE only or LINE + Google + email.
6. B28: currency — THB only or additional approximate currencies.
7. B29: project prices — public or contact-gated price list.
8. B09: map provider — Google Maps Platform or Longdo Map.

All eight remain Pending. No answers were inferred. Account/admin UI require separate wireframe approval (F32/F34).

## Upcoming foundation

The owner's advance Step 1 scope covers global tokens/fonts, header, footer, phone tabs, reusable controls, /th and /en routing with preference cookies, and /api/health. Implement it only after the build starts. No Step 2 schema or seed work is authorized in Step 1.
