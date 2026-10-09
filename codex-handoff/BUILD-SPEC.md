# Mstar Property — build spec (wireframe v3)

**Date:** 9 Oct 2026
**Status:** Approved layout. Build from this.
**Replaces:** `../WIREFRAME.md` (Codex v1). Ignore v1's forest-green palette, layout and page list. Its backend notes are covered again below where they still apply.

## 0. Files in this folder

| File | What it is |
|---|---|
| `wireframe.html` | Clickable wireframe. **This is the visual and interaction reference.** Open it in a browser and click through every screen on Desktop and Phone (toolbar at the top). The numbered purple dots match the notes panel on the right. |
| `home-page.html` | The home page alone, full length, desktop and phone side by side. Same design as `wireframe.html`, easier to read. |
| `BUILD-SPEC.md` | This file: what to build, how it behaves, and what counts as done. |

What the wireframe is **not**:
- The pastel gradient boxes are photo placeholders. Use real photos.
- The MP crest in the header is an SVG stand-in. Use the real logo file (see §11).
- Listings, prices, agent names, distances and yields are **examples**. Never ship them as real data.
- The toolbar (screen tabs, device toggle, colour swatches, "Show notes") and the purple pins are review tools. Don't build them into the site.
- The wireframe uses CSS container queries so it can show a phone inside a desktop page. The real site uses normal viewport media queries (§3).

---

## 1. Stack

- Next.js (App Router) + TypeScript
- PostgreSQL + Drizzle ORM
- Styling: CSS variables from §2 as the single source of colour and type. Tailwind is fine if it is mapped to these variables. No hard-coded hex values in components.
- `next/image` for all photos (responsive sizes, lazy-load below the fold, blur placeholder)
- Front end and back end in one deployable app
- Thai and English from day one (§9)

---

## 2. Design tokens

Copy these exactly. They come from the `:root` block in `wireframe.html`.

```css
:root{
  /* surfaces */
  --bg:#ffffff;        /* site background, white */
  --soft:#f6f7f9;      /* quiet panels, footer, hover */
  --soft2:#eef1f5;     /* skeletons, inactive bars */
  --line:#e3e6eb;      /* borders, dividers */
  /* text */
  --ink:#1f2633;       /* main text, dark slate (not black) */
  --muted:#667085;     /* secondary text */
  /* brand accent: gold from the logo (pending final pick, see §12) */
  --acc:#f2a91a;
  --on-acc:#1f2633;    /* text on accent buttons */
  --acc-soft:#fff4dc;  /* accent tint backgrounds, badges */
  --acc-ink:#9a6400;   /* accent used as text on white (links, "2 new") */
  /* chat brands */
  --line-green:#06c755;
  --whatsapp:#25d366;
  /* status */
  --ok:#12a150; --warn:#e59a00; --sold:#c3c8d1;
  /* type */
  --f-head:"Prompt","Segoe UI",system-ui,sans-serif;
  --f-body:"Noto Sans Thai","Segoe UI",system-ui,sans-serif;
  --r:12px;            /* card / photo radius */
}
```

Other accent options the owner can still choose (swap the four `--acc*` values only):

| Option | --acc | --on-acc | --acc-soft | --acc-ink |
|---|---|---|---|---|
| Gold (default) | #f2a91a | #1f2633 | #fff4dc | #9a6400 |
| Ocean blue | #1a73e8 | #ffffff | #e8f1fd | #1557b0 |
| Teal | #0fa3a3 | #ffffff | #e2f6f5 | #0b7777 |
| Coral | #f2545b | #ffffff | #feeceb | #c0353b |

**Rules**
- The site is light only. White background, no black bands or black hero sections. Owner request.
- Fonts: Google Fonts `Prompt` 400/500/600 (headings) and `Noto Sans Thai` 400/500/600 (body). Both cover Thai and Latin.
- Prices use `--ink` in `font-family: var(--f-head)`, weight 600. Don't put prices in gold (poor contrast on white).
- Radius: cards and photos 12px, buttons 10px, inputs 10px, chips and the search bar 999px (pill). **The Sign in button is a rectangle with 8px radius and must never wrap to two lines.**
- Shadows only on floating things: search box, popovers, sticky contact box, project info card.

---

## 3. Breakpoints and layout

| Name | Width | Behaviour |
|---|---|---|
| Phone | ≤ 720px | Bottom tab bar, single column, sticky bottom action bars, filters in full-screen sheets |
| Narrow desktop | 721–1000px | Header hides "List your property"; nav item padding shrinks so the header stays on **one line** |
| Desktop | > 1000px | Full layout as in the wireframe |

- Content side padding: 28px desktop, 16px phone.
- No horizontal page scroll at any width. Rows that scroll sideways on phone (category icons, featured cards, filter bar) scroll inside their own container.
- **No nav or button text may wrap.** Every nav item, chip and button uses `white-space:nowrap`.

---

## 4. Global components

### 4.1 Header (H)
- Sticky, 64px tall, white with 96% opacity and a light blur, bottom border `--line`.
- Left: **logo image only**, no text next to it, about 44px tall. Links to home.
- Nav: Buy · Rent · New projects · Investment · Services, one line.
- Right: language and currency switch (`TH · ฿`), ♡ Saved, List your property (hidden ≤1000px), **Sign in** (outlined rectangle).
- Phone: logo, language switch and Sign in only. The nav moves to the bottom tab bar.

### 4.2 Bottom tab bar (T, phone only)
- Sticky at the bottom with safe-area padding: Explore · Search · Saved · LINE chat · Account.
- Hidden on the property page, where the property action bar takes its place.

### 4.3 Listing card (Realtor.com style)
Used on the home page carousel, search results and Saved. One component everywhere.
- White card, 1px `--line` border, 16px radius, light shadow on hover. The whole card links to the property page; keyboard-focusable, Enter opens it.
- **Photo** 3:2, up to 5 photos: next-photo arrow appears on hover (swipe on touch), dot indicator at the bottom.
- **Badges** top-left on the photo, pill-shaped: `Featured`, `New`, `Video tour`, `Mstar project`, `Investment`.
- **Heart** (save): white 42px circle at the **bottom-right of the photo**. Toggles without opening the listing.
- **Status line:** coloured dot + type and intent, e.g. "● Condo for sale", "● Land for sale", "● Hotel for sale", "● Condo for rent". Dot: green for sale, blue for rent, accent for investment.
- **Price:** large (about 1.45rem, `--f-head` 600). Rent shows `฿35,000 /month`. If the price dropped, show a green `↓ ฿200k` next to it.
- **Facts row**, numbers in bold, depends on type:
  - Condo / house / townhouse: **2** bed **2** bath **68** m² **650 m** to BTS (house adds **52** sq. wah land)
  - Land: **2** rai **1** ngan **3,600** m² **40 m** road
  - Hotel: **156** rooms **72%** occupancy **4** rai land
- **Address:** two lines (project/street, then district, province, postcode).
- **Contact agent** button bottom-right: pill with border; turns accent-filled when the card is hovered. It opens the **contact dialog** (same fields as the property page form, §5.3 item 13), with the message prefilled for that listing. It must not open the listing.
- Smaller "compact" cards (photo, price, one-line title, one-line facts, no Contact button) are used only inside the property page for "More units" and "Similar homes".

### 4.4 Buttons
`acc` (filled accent) · `out` (white with border) · `line` (LINE green, white text) · `wa` (WhatsApp green, white text). 40px tall.

### 4.5 Chips
Pill, 32px tall. The active chip is filled `--ink` with white text.

### 4.6 Footer
`--soft` background (not black): company name, opening hours (open every day 09:00–18:00), LINE ID, area links, company links, help links, PDPA privacy link.

---

## 5. Pages

Routes are shown without the language prefix (see §9).

### 5.1 Home `/`
In order:
1. **Hero:** one large photo (no slider) with the heading "Find your place in Thailand" and one line of supporting text.
2. **Search box:** tabs Buy / Rent / New projects / Investment. Fields: Location · Type · Price · Beds · search button. On phone it collapses to one "Where?" field plus the button; tapping it opens a full-screen search sheet.
   - Location suggestions (dropdown) are grouped as Recent searches (from this device), Areas & stations (areas and BTS/MRT/ARL stations), and Projects (with an "Mstar" badge for Mstar developments).
   - The Investment tab switches the types to Hotel / Land / Commercial and shows budget instead of price.
3. **Homes for you: listing carousel, directly under the search box.** This is the first thing after the hero.
   - Heading "Homes for you", "See all" link, and ‹ › arrows on the right.
   - Tabs under the heading: For sale / For rent / New listings / Price reduced / Investment. Switching a tab reloads the carousel.
   - Uses the listing card from §4.3. 3 cards visible on desktop (narrow desktop: 2), about 1.1 on phone so the next card peeks in. Scroll-snap, swipe on touch.
   - Content: admin-picked featured listings first, then newest active listings, up to 12 per tab.
4. **Category row:** icons that scroll sideways: Condo, House, Townhouse, Pool villa, Land, Hotel, Beachfront, Near BTS/MRT, New build, Pet friendly, Commercial. Each one opens results with that filter on.
5. **Continue your search:** only shown when this device has a recent or saved search or a viewed listing. Saved searches show the count of new matches.
6. **Explore by location:** Bangkok, Pattaya, Phuket, Rayong with live listing counts. Locations are managed by admin.
7. **New projects by Mstar:** 3 project cards with a status badge (Selling now / Coming soon / Ready to move in).
8. **Tools:** Mortgage calculator, What is my home worth? (owner lead form), Buying guide for foreigners.
9. **Services for owners:** Property management, Cleaning, Contractor, Home decor.
10. Footer.

### 5.2 Search results `/buy`, `/rent`, `/invest`
- **Filter bar** stays under the header: search field, For sale/rent ▾, Price ▾, Beds ▾, Type ▾, More filters, ♡ Save search.
  - Each filter opens a popover on desktop and a full-screen bottom sheet on phone.
  - The price popover has a histogram of listing prices in the current search, min and max inputs, a live result count and Apply.
  - More filters: baths, size m², land size (rai), distance to BTS/MRT, foreign quota, furnished, pet friendly, has video tour, project, built year.
  - **All filter state is in the URL** (§7), so a search can be shared on LINE.
- **Heading:** a readable title such as "Condos for sale in Sukhumvit", the result count and sort (Newest, Price low–high, Price high–low, Size, Nearest BTS).
- **Quick chips:** active filters with ✕, plus suggestions (Near BTS, Foreign quota, Pet friendly, Video tour).
- **List + map** on desktop: list on the left (2-column listing cards from §4.3), map on the right (sticky) with price pins.
  - Hovering a card highlights its pin, and hovering a pin highlights its card.
  - "Search as I move the map" (on by default) and "Draw area".
  - "Show more homes" button (load more), not page numbers. Keep the URL in sync for back/forward.
- **Phone:** list first, single column. A floating `Map` pill switches to a full-screen map; it then reads `List`.
- Empty state: "No homes match these filters", with buttons to clear the last filter and to save the search to be alerted.

### 5.3 Property page `/property/[id]-[slug]`
Example ID format from existing stock: `BK-CD-0142` (area code - type code - number).
1. Top row: ← Back to results (keeps the previous search), Share (LINE, Facebook, WhatsApp, copy link), ♡ Save.
2. **Photo grid:** 1 large photo + 4 small ones, and a "Show all N photos" button that opens a full-screen gallery (grid plus a lightbox with arrows and a counter). The gallery header has an "Email agent" button. Phone: a single swipeable photo with a counter.
3. **Title block:** badges, title, full address, listing ID, and a key-facts row. Facts depend on the type:
   - Condo: price, bedrooms, bathrooms, size m², floor, distance to nearest station
   - House / townhouse: price, beds, baths, usable m², land sq. wah, parking
   - Land: price, rai-ngan-sq. wah, price per sq. wah, zoning colour, road frontage, title deed type (Chanote / Nor Sor 3 Gor)
   - Hotel: price, rooms, occupancy %, yearly revenue, land size, licence status
4. **Section tabs** that stay at the top: Overview · Facts · Floor plan · Nearby · Costs · Project. Clicking scrolls to the section, and the active tab follows the scroll.
5. **About this home:** description clamped to 5 lines with "Read more". Thai and English text are stored separately.
6. **Price check:** price per m² compared with the area average on a bar, and a rental yield estimate. Show only when there is enough comparable data (minimum sample size set in config). Otherwise hide the block. Never invent averages.
7. **Facts and features:** two-column key/value table: type, ownership (freehold / leasehold / foreign quota), built, furnished, parking, common fee, facilities, last updated.
8. **Floor plan and tours:** tabs for Floor plan / Video tour / 360°. Only show the tabs that have content.
9. **What's nearby:** tabs for Transit / Schools / Shopping / Hospitals, the name and distance of each place, and a map. **Data comes from a map provider (§8), never typed in by hand.** Admin can hide the exact pin and show only the area.
10. **Monthly cost:** sliders for down payment (0–50%, step 5), interest rate (2–7%, step 0.25) and term (10–35 years, step 5). Shows the monthly payment plus the common fee and an "Ask about a bank loan" button. Formula in §10.
11. **More units in this project** (when the listing belongs to a project).
12. **Similar homes nearby:** same area, same type and sale/rent, price within ±25%. Fall back to the same city if there are fewer than 3.
13. **Contact box** (desktop: right column, stays in view while scrolling). Copy the wireframe:
    - Heading "More about this property".
    - Floating-label inputs: **Full name \***, **Email \***, **Phone \***, **How can an agent help?** (textarea, prefilled with "I'm interested in {title} ({listing ID}).").
    - Tick box: "I'd like help with a bank loan".
    - **Email agent** button (accent, full width).
    - Consent text under the button (PDPA): "By sending, you agree that Mstar Property may contact you by phone, email, LINE or WhatsApp about this enquiry…" with a link to the privacy policy.
    - After sending, the form is replaced by "✓ Message sent — An agent will reply by email or phone, usually within 1 hour (09:00–18:00)."
    - Divider "or chat now", then two buttons side by side: **Chat on LINE** and **Chat on WhatsApp** (§6.2).
    - Agent row: photo, name, "Usually replies in 15 min".
    - **No calendar or date picker on the property page.**
14. **Phone:** the contact box moves to the end of the page (same form). A sticky bottom bar shows the price and estimated monthly payment, then **LINE**, **WhatsApp** and **Email agent**. Email agent scrolls to the form and focuses Full name.

### 5.4 New projects `/projects` and `/projects/[slug]`
Example: Emperor Grand View.
1. **Hero:** drone video or render (rounded, not full black). Under it, a white info card that overlaps the hero: status badge, project name, location, "from ฿", number of homes, completion year, then LINE and **Get price list** buttons.
2. **Section tabs** that stay at the top: Overview · Home types · Site plan · Facilities · Progress · Location.
3. **Home types:** cards with plan image, beds, m², "from ฿", and an availability bar ("4 of 12 available"). Sold-out types stay visible at 55% opacity with "Join waitlist".
4. **Site plan:** a clickable plot map. Green = available, amber = reserved, grey = sold. Clicking a plot shows its number, type, land size, price and status; available plots show **Book a site visit**. Build the plot map as SVG drawn from data (plot polygons stored per project), not a static image.
5. **Facilities:** chips.
6. **Construction progress:** 4 stages (Land prep, Structure, Finishing, Handover) with % for the current stage, "Updated {month}", and optional dated photos.
7. **Brochure and price list:** a "Phone or LINE ID" field and "Send it to me". This saves a lead and sends the brochure by LINE or email.
8. `/projects` list page: project cards, filterable by status and province.

### 5.5 Book a site visit `/projects/[slug]/visit?plot=A-07`
Only for projects. Not linked from single listings.
- Stepper: 1 Date and time → 2 Your details → 3 Confirmed.
- Summary card of the project, plot, date and time, with a Change link.
- "Fill in with LINE" button (LINE Login) first, then the form: Name\*, Phone\*, LINE ID, Message, "I'd like help with a bank loan", Confirm site visit, and a PDPA line.
- The confirmation screen says what happens next and links to Saved › Viewings.

### 5.6 Saved `/saved`
- Tabs: Homes · Searches · Viewings.
- Works **without an account**: saved homes and searches are kept on the device (localStorage). When the person signs in, they move to the account.
- Searches: name, summary, result count, "N new", and an alert option per search: Instant / Daily / Off (alerts only when signed in; ask to sign in when they switch alerts on).
- Viewings: site visits and enquiries with status (Waiting for agent / Confirmed / Done), Reschedule, Chat.

### 5.7 Other pages (no wireframe; use the same components)
`/services` and `/services/[slug]`, `/about`, `/contact` (LINE QR code, phone, office map, contact form), `/guide/foreign-buyers`, `/home-value` (owner lead form), `/privacy`.

---

## 6. Contact, leads and chat

### 6.1 Enquiry ("Email agent")
- `POST` a server action or API route → validate → **save to the `enquiries` table first** → then send the email notification. The email failing must not lose the lead.
- Validation: name 2–80 characters, email format, Thai or international phone (accept `08X-XXX-XXXX` and `+66…`), message ≤ 2000 characters.
- Spam: honeypot field + rate limit per IP and per email (e.g. 5 per hour). No CAPTCHA on first view.
- Save: listing ID, agent ID, name, email, phone, message, loan help, consent text version, consent time, source page, UTM tags, user agent, language.
- Send to: **pending decision** (§12), either one Mstar inbox or the listing's agent. Build it so either works (config + `agents.email`).
- Auto-reply email to the buyer in their language.

### 6.2 LINE and WhatsApp buttons
- LINE: `https://line.me/R/ti/p/@{lineId}` (official account) and, where supported, a prefilled message with the listing ID.
- WhatsApp: `https://wa.me/{number}?text={encoded "Hi, I'm interested in {title} ({listing ID}) {url}"}`
- Number and ID come from config or the agent record (pending decision §12).
- Log a `chat_click` event (listing ID, channel) for reporting. Don't treat a click as a sent message.

### 6.3 Other lead forms
Brochure request, site visit, home value and service enquiries all write to the same `enquiries` table with a `type` column.

---

## 7. URL state for search

`/buy?loc=sukhumvit&type=condo&min=3000000&max=10000000&beds=2&near=bts&fq=1&pet=1&sort=newest&page=2&bbox=lng1,lat1,lng2,lat2`

- The home search and the results page use the same parameter names.
- The URL updates as filters change (`router.replace`, no full reload). Back and forward restore the state.
- Location slugs come from the `locations` table (province › district › area) and `stations`.

---

## 8. Maps and nearby places

- Provider: decide before building (Google Maps Platform or Longdo Map for Thai data). Budget the API cost and cache results.
- Nearby places: fetch once when a listing is published or its location changes, store them in `listing_nearby`, and refresh every 90 days. Show "Distances are approximate."
- Never show school ratings or distances that did not come from the provider.
- "Hide exact location": show a circle around the area and no pin.

---

## 9. Language and currency

- Routes: `/th/...` and `/en/...`. The default for a first visit comes from the browser's Accept-Language; the choice is remembered in a cookie.
- Every text field that buyers see (title, description, facilities, project copy) has Thai and English columns. If one is missing, the site shows the other language, and admin shows a "Missing translation" flag on that record.
- Currency: THB is the base and the only stored currency. Showing other currencies is **pending decision** (§12). If added, use a daily rate table and label the price "approx.".
- Numbers: `฿6,450,000` (en) and `6,450,000 บาท` (th). Thai land units: rai, ngan, square wah (1 rai = 4 ngan = 400 sq. wah = 1,600 m²).

---

## 10. Mortgage formula

```
loan = price × (1 − downPct/100)
r    = annualRate / 100 / 12
n    = years × 12
monthly = r === 0 ? loan / n : loan × r / (1 − (1 + r)^−n)
```
Round to whole baht. Defaults: 20% down, 3.5%, 30 years. Show the common fee (`commonFeePerSqm × size`) as a separate line.

---

## 11. Logo

The current logo files (`../../logo/`) have white and silver lettering made for black backgrounds, so they disappear on a white header. Before launch, get from the designer (source: `1720-Mstar-Property-Logo-01.ai`):
1. The MP crest alone (black hexagon, gold house outline) as SVG and transparent PNG. Use this in the header and as the favicon.
2. A horizontal version for white backgrounds: crest + "MSTAR PROPERTY" in dark text (footer, emails).

Until then, use the SVG crest from `wireframe.html` (search for `<svg viewBox="0 0 40 44"`).

---

## 12. Open decisions (ask the owner, don't guess)

1. Final accent colour: gold, blue, teal or coral (§2).
2. Logo version for the header: crest only or horizontal (§11).
3. Enquiry emails: one shared inbox or the listing's agent?
4. WhatsApp and LINE: one company number/ID or one per agent?
5. Sign in: LINE only, or LINE + Google + email?
6. Currencies other than THB?
7. Project prices: shown openly, or only in the price list after leaving a contact?
8. Map provider.

---

## 13. Data model (Drizzle, starting point)

- `agents` (id, name_th, name_en, photo, email, phone, line_id, whatsapp, active)
- `locations` (id, parent_id, level: province|district|area, slug, name_th, name_en, lat, lng)
- `stations` (id, line: BTS|MRT|ARL|SRT, name_th, name_en, lat, lng)
- `projects` (id, slug, status, name_th/en, description_th/en, province, location_id, price_from, total_units, completion_year, hero_media, brochure_file, progress_stage, progress_pct, progress_updated_at, is_mstar)
- `unit_types` (id, project_id, name, beds, baths, size_sqm, price_from, total, available, plan_image)
- `plots` (id, project_id, code, unit_type_id, land_sqwah, price, status: available|reserved|sold, polygon)
- `listings` (id, code e.g. BK-CD-0142, slug, intent: sale|rent, type: condo|house|townhouse|land|hotel|commercial|pool_villa, status: draft|active|reserved|sold|rented, price, price_period, title_th/en, description_th/en, address, location_id, lat, lng, hide_exact_location, project_id, agent_id, beds, baths, size_sqm, land_sqwah, floor, built_year, furnished, ownership, foreign_quota, pet_friendly, common_fee_per_sqm, parking, **type_fields jsonb** (land: zoning, frontage_m, deed_type; hotel: rooms, occupancy_pct, revenue_year, licence), featured, badges, published_at, updated_at)
- `listing_media` (id, listing_id, kind: photo|floorplan|video|tour360, url, caption_th/en, sort)
- `listing_nearby` (listing_id, category, name, distance_m, source, fetched_at)
- `enquiries` (id, type: listing|brochure|site_visit|home_value|service|contact, listing_id, project_id, plot_id, agent_id, name, email, phone, line_id, message, loan_help, preferred_at, consent_version, consent_at, source_url, utm, lang, status, created_at)
- `chat_clicks` (id, listing_id, channel: line|whatsapp, created_at)
- `users`, `saved_listings`, `saved_searches` (query string, alert: instant|daily|off, last_notified_at)
- Indexes: `listings(intent, type, status, price)`, `listings(location_id)`, a geo index on lat/lng (PostGIS or a bounding-box index), and full-text on titles.

Admin screens (listings, projects, plots, agents, enquiries, locations, featured) are needed but are **not in this wireframe**. Build the public site first, then wireframe the admin before building it.

---

## 14. Quality bar

- **Performance:** LCP < 2.5 s on 4G phone for home and property pages. The hero image is preloaded and other images are lazy-loaded.
- **Accessibility:** every control reachable by keyboard with a visible focus ring, labels on all inputs, contrast AA, alt text on photos (caption or "Photo N of {title}"), `prefers-reduced-motion` respected.
- **SEO:** server-rendered pages, unique title and description per listing and project, schema.org JSON-LD (`RealEstateListing` / `Offer` / `Place`), canonical URLs, `hreflang` th/en, sitemap.xml. Sold listings stay online with a "Sold" badge (no 404).
- **PDPA:** consent text versioned and stored with each lead, privacy policy page, a way to request deletion, cookie banner only if non-essential cookies are used (decline is the default).

---

## 15. Testing (required for every page)

- Test on **desktop and phone** for every page and flow. Skip a device only when the feature doesn't exist there, and write the reason in the test report next to the test name.
- Playwright end-to-end tests, at least:
  - Home search → results with the correct URL params → open a card → property page
  - Filters change the URL; back and forward restore them; reloading keeps them
  - Results: map pin ↔ card highlight (desktop), Map/List toggle (phone)
  - Property page: section tabs scroll to the right section; mortgage sliders give the right payment (unit-test the formula)
  - **Email agent:** submit → success message → **the row really exists in `enquiries` with the right values** (check the database, not just the HTTP status) → notification email queued
  - LINE and WhatsApp buttons have the correct links with the listing ID
  - Save home without an account → it appears in Saved after reload
  - Project site plan: click a plot → info updates → Book a site visit → confirm → `enquiries` row with `type=site_visit` and `plot_id`
- Run the tests against the real running app and a real database, not mocks. A passing typecheck is not a test.
- Visual check against `wireframe.html` at 390px, 768px, 1024px and 1440px: no horizontal scroll, no wrapped nav or button text.

---

## 16. Build order

1. Tokens, fonts, layout shell (header, phone tab bar, footer), i18n routing
2. Database schema + seed with clearly fake sample data
3. Listing card + results page (filters, URL state, list + map)
4. Property page + enquiry form + LINE/WhatsApp
5. Home page
6. Projects + site plan + site visit booking
7. Saved (device storage), then accounts
8. Admin (after its wireframe is approved)
