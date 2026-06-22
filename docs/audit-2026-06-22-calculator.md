# Transfer Calculator — Deep Test & Bug Audit (2026-06-22)

**Trigger:** A client (on a **mobile phone**) told the owner "the calculator doesn't work" — no further detail. Separate known bug: the WhatsApp dispatch message shows `�` instead of emoji on **desktop**.

**Method (repeatable harness):**

1. **Live probe** — drove the _production_ site (`sprinter.hr/hr/luksuzni-transferi`) in a mobile-emulated iPhone via Chrome DevTools MCP (read-only: no submits).
2. **Code audit** — a 9-dimension adversarial bug-hunt workflow: 26 agents, code-grounded findings each independently _refuted_ before being confirmed. Result: 31 raw → **28 confirmed/likely, 3 refuted**.
3. **Baseline** — `npm run test:unit` (15/15 pass) + existing Playwright suite reviewed.

> Re-run instructions are at the bottom.

---

## TL;DR — most likely cause of "doesn't work" on mobile

No single hard crash. Several **mobile dead-ends that all end in "I can't get a price / nothing happens"** — any one reads as "broken" to a non-technical phone user. Ranked by likelihood:

1. **"Send location" GPS button silently fails on prod** (the one feature a phone user _without an address_ would tap) — uses the Geocoding API the project key doesn't have, so it always falls back to a "manually attach your location" WhatsApp message, discarding the GPS just granted. **No price ever appears.**
2. **Type an address without tapping a dropdown suggestion → no price**, then an error that says "pick from the list" (which is hard on a phone: small dropdown, keyboard covers it, type-and-Enter habit).
3. **Cookie-consent bar can hide the autocomplete dropdown** (both `z-index:1000`), so the suggestions a user needs to tap are covered.
4. **Tapping the form before choosing "now/later" does nothing** (locked panel swallows the tap with no nudge).

Good news (verified **working** on prod right now): Google Maps + Places **loads fine**, autocomplete returns real suggestions, pricing math is sound, i18n is complete (hr/en/de), no horizontal overflow, the now/later buttons are discoverable above the fold.

---

## Findings

Severity = adversarially-adjusted real-user impact. `affects` = mobile / desktop / both.

| #   | Severity    | Affects | Issue                                                                                                                                                                                                                                                                         | Dimension    |
| --- | ----------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| 1   | **HIGH**    | both\*  | Type address without selecting a suggestion → no price, opaque "select from list" error. No geocode-on-blur fallback.                                                                                                                                                         | autocomplete |
| 2   | **HIGH**    | both    | If Maps ever fails to load (key/quota/referrer/billing/Places-off), **no price is ever possible** and the send button shows the same misleading "select from list" error — and the banner _promises_ a fallback the button blocks. **Zero test coverage** (suite stubs Maps). | maps-fail    |
| 3   | **MED**     | both\*  | "Send location" reverse-geocode uses the **Geocoding API the key lacks** → always fails on prod → dumps user to a manual-WhatsApp instruction, discarding their coords. Button never delivers a price.                                                                        | gps          |
| 4   | **MED**     | mobile  | Locked calculator gives **zero feedback** when you tap a field before choosing now/later (panel `pointer-events:none`, only 65% opacity as a cue).                                                                                                                            | gate-ux      |
| 5   | **MED**     | mobile  | The prominent "Send location" button is **dead until** a mode is chosen (same lock).                                                                                                                                                                                          | gps          |
| 6   | **MED**     | both    | `place_changed` with no geometry (Enter/blur on a partial query) **silently no-ops** — no spinner, no error, no price until you try to send.                                                                                                                                  | autocomplete |
| 7   | **MED**     | both    | Maps-load failure is **silent to the owner** (only `console.warn`, no telemetry) — an outage could run for days. GTM/`dataLayer` is already on the site, so a beacon is trivial.                                                                                              | maps-fail    |
| 8   | **MED→LOW** | both    | In the maps-failed state, WhatsApp/Call/Email CTAs degrade to **bare links that lose the typed addresses**.                                                                                                                                                                   | maps-fail    |
| 9   | LOW         | mobile  | Inputs are **15px** → iOS Safari auto-zooms on focus (layout jump, can push dropdown off-screen). Fix: ≥16px.                                                                                                                                                                 | gate-ux      |
| 10  | LOW         | mobile  | Cookie-consent bar (`fixed`, `z-index:1000`) = **same z as Google's `.pac-container`** → low suggestions get covered. _(live-probe finding; matches agent's "pac-container unstyled/z-index risk")_                                                                           | autocomplete |
| 11  | LOW         | both    | HR-only `componentRestrictions` hides valid foreign pickups (foreign-indexed hotels, cross-border drop-offs).                                                                                                                                                                 | autocomplete |
| 12  | LOW         | both    | `paxCount` can be blanked to NaN → `Putnika: ` (empty) in the dispatch message.                                                                                                                                                                                               | validation   |
| 13  | LOW         | both    | `errorBook` is **sticky** — only clears on the next Send, not when the user fixes the field.                                                                                                                                                                                  | validation   |
| 14  | LOW         | both    | Time `<select>` emits a non-standard **`24:00`** option.                                                                                                                                                                                                                      | datepicker   |
| 15  | LOW         | both    | Dispatch message hardcodes English **`From:` / `To:`** nav labels regardless of locale (dispatcher-facing).                                                                                                                                                                   | i18n         |
| 16  | LOW         | both    | Booking message embeds 3 full Google Maps URLs (~2.4 KB) — clutter / truncation risk on long addresses.                                                                                                                                                                       | message      |
| 17  | LOW         | both    | Geolocation **denial/timeout** discards intent and gives an unhelpful next step.                                                                                                                                                                                              | gps          |
| 18  | LOW         | desktop | **Emoji `�`** — see dedicated section below.                                                                                                                                                                                                                                  | message      |
| 19  | LOW         | both    | Content drift: marketing section still says _"Dva vozila"_ + lists only E/V; **Ford karavan** missing. _(live-probe finding)_                                                                                                                                                 | content      |

\* _disproportionately mobile in practice._

**Refuted (checked, not real):** now/later buttons "below the fold" (they're discoverable); valid booking lost via `target=_blank` (the anchor-navigation pattern is popup-safe); `later`-mode readonly date "dead end if flatpickr fails" (flatpickr is a static import in the same chunk — can't fail independently).

---

## The desktop emoji `�` bug

**Root cause (proven, two ways):** Our code is **correct**. `encodeURIComponent` produces byte-perfect UTF-8 for every emoji (`🔴` → `%F0%9F%94%B4`) and round-trips cleanly — verified live in the prod page _and_ in Node by the audit. Source files are clean UTF-8; the `\u{...}` escapes work. **The `�` is introduced by the WhatsApp _Desktop_ app mis-decoding the `wa.me` `text=` payload** — nothing we encode differently can fix that.

**Severity is genuinely low** (cosmetic): the dispatcher still receives a fully readable, correctly-encoded message; only the emoji render as boxes in the WhatsApp Desktop composer. Mobile (`wa.me` → native app) is unaffected.

**Emoji-preserving fix:** on **desktop only**, send through `https://web.whatsapp.com/send?phone=…&text=…` (WhatsApp Web renders the emoji correctly) instead of `wa.me` (which hands off to the mangling desktop app). Mobile keeps `wa.me`.
**Tradeoff to weigh:** `web.whatsapp.com` requires the sender to be logged into WhatsApp Web in the browser; `wa.me` opens the installed desktop app directly. So this trades "emoji correct" for "needs web login" on desktop. _Cannot be fully reproduced headlessly (native app) — confirm with one real desktop send after deploy._

---

## Recommended fix plan (by value ÷ effort)

**✅ Implemented this session (branch `fix/calculator-mobile-gps-ux`, not yet committed):**

- **F1 — "Send location" now works** — on geocode failure (the prod reality) the pickup resolves from raw `pos.coords` (field shows "Moja lokacija"; dispatch message + nav links carry exact coords). _Fixes #3, the top "doesn't work" suspect._ + e2e regression test.
- **F2 — iOS zoom** — `.tr-calc__input` bumped to `font-size:16px`. _Fixes #9._
- **F3 — Immediate autocomplete feedback** — a geometry-less `place_changed` or a typed-but-unselected field now shows an inline "odaberite iz popisa" hint right away (not only on Send). _Mitigates #1, #6._ + 2 e2e regression tests.
- **F4 — Dropdown z-index** — `.pac-container` raised to `z-index:10000` so the cookie-consent bar can't hide suggestions. _Fixes #10._

_Verification: `npm run check` clean (0 errors); `npm run test:e2e` → 52/52 pass._

**Decided — not doing:**

- **F6 — Desktop emoji:** **leave as-is.** Cosmetic only, and the only emoji-preserving fix (`web.whatsapp.com/send` on desktop) trades the boxes for a WhatsApp-Web login requirement — not worth it.

**Deferred (need owner input / content):**

- **F5 — Content drift:** the "VOZILA" marketing section still says _"Dva vozila"_ + lists only E/V — needs a Ford photo + copy to add it. _(#19)_

**Do soon (robustness):**

- **F7 — Maps-failure path:** in `sendBooking`, when `mapsError`, skip the fare gate and build a degraded inquiry from the typed text so the button honors the banner's promise. _Fixes #2, #8._
- **F8 — Outage beacon:** `dataLayer.push({event:'maps_unavailable'})` at both `mapsError` sites. _Fixes #7._
- **F9 — Locked-panel nudge** (#4/#5), **paxCount guard** (#12), **sticky error reset** (#13), **localized nav labels** (#15).

**Test debt:** add Playwright coverage for the **un-stubbed Maps-failure** path and the **geometry-less `place_changed`** path — both are real and currently untested.

---

## How to re-run this harness

1. **Unit:** `npm run test:unit` · **e2e:** `npm run test:e2e` (starts / reuses dev server, Maps stubbed).
2. **Live mobile probe:** dev server (`npm run dev`) or prod; Chrome DevTools MCP → `emulate` iPhone viewport → walk gate → autocomplete → inspect console/network/hrefs (read-only on prod).
3. **Code bug-hunt workflow (re-runnable):**
   `Workflow({scriptPath: ".../workflows/scripts/calculator-bug-hunt-wf_a8dbe30b-20c.js"})`
   — 9 dimensions, adversarial verification, loop again for fresh rounds.
