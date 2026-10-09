Paste this into Codex, with the `codex-handoff` folder in the project.

---

Build the new Mstar Property website from the files in `codex-handoff/`.

1. Open `codex-handoff/wireframe.html` in a browser and click through every screen on both Desktop and Phone (toolbar at the top). It is the visual and interaction reference: match its layout, spacing, colours, fonts, components and behaviour.
2. Read `codex-handoff/BUILD-SPEC.md` in full. It is the source of truth for pages, routes, data, forms, testing and build order. It replaces the old `WIREFRAME.md`; ignore that file's green design.
3. Follow the build order in section 16 and finish one step at a time. After each step, show me what changed and how you tested it.
4. Use the design tokens in section 2 exactly. No new colours, no black page sections, no text wrapping in the header nav or buttons. The Sign in button is a rectangle.
5. Everything in the wireframe that is sample content (listings, prices, agent names, distances, yields, the SVG logo) is a placeholder. Seed data must be clearly marked as fake.
6. For anything listed under section 12 "Open decisions", ask me. Don't pick one yourself.
7. Testing rules in section 15 are required: desktop and phone for every flow, the real running app and database, and check that form data is really saved in the database.
