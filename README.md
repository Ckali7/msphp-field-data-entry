# MSPHP Field Data Entry (offline web app)

A replacement for the `Station -> Catch -> Sacrificed/Tagged` data-entry flow in
`..\msphp data entry.mdb`. Runs entirely in a browser, entirely offline, with
**zero installation, zero subscription, and zero server** — it's just files.

## Running it

Double-click `MSPHS Data Entry.html`. It opens in your default browser (Edge is fine —
it ships with Windows) and works with no internet connection at all, forever.
All data you enter is stored locally on that device only, in the browser's
IndexedDB storage.

**Important:** don't run it in an InPrivate/Incognito window — that storage
gets wiped when the window closes. A normal browser window is what keeps your
data between trips.

Each Toughbook/tablet that enters field data needs its own copy of this whole
`PWA` folder (or you open the same folder from a shared/synced location) —
data does not travel between devices on its own. Use **Backup (JSON)** /
**Restore Backup** (see below) to move data between devices, or to get a new
device started from an existing one.

## What's implemented

- **Collection** (station/environmental metadata) — same fields as
  `RFCollection`. Collection Number is auto-assigned as
  `ActivityCode + YY + MM + DD + counter`, same format as the original, minus
  the old NORMAL/ODD/EVEN multi-crew split (removed per Chris, Sept 2026 —
  no longer needed since only one crew works a system per day now).
- **Station** and **Species** (on all 3 fish tabs) are plain dropdowns, same
  as every other field — not free-text-with-suggestions. Picking a Station
  auto-fills Latitude/Longitude from the real station coordinate tables
  (WAS/ALT/HAM/CMB, same as the WAS/ALT/HAM/CMB toggle buttons in the
  original) and infers **Sound System** from the station name prefix, same
  rule as the original (`ALT#### >= 0116` -> Doboy, else Altamaha; `HAM` ->
  Hampton River; `WAS` -> Wassaw; `SSI` -> St. Simons; `CMB` -> Cumberland).
  If a Monthly Station Assignment list is active (see Table Data below), the
  Station dropdown is restricted to that month's assigned stations for the
  active system — a station already saved on an existing record stays
  selectable even if a later assignment import would otherwise exclude it,
  so reviewing an older collection never silently loses its saved value.
  Changing Station **always** re-syncs Latitude/Longitude/Sound System to
  match the newly-picked station (fixed 2026-09 — it used to only fill
  those fields if they were still blank, so picking a different station
  after the first one left stale coordinates behind).
- **Populated field values are legible enough to actually confirm** (per
  Chris, 2026-09). The Station/Sound System/Latitude/Longitude row was
  deliberately built tight (see `.fieldGridCompact` in `css/style.css`) on
  the assumption nobody needed to read those auto-filled values closely —
  in practice that clipped exactly the values that section exists to let
  you double-check (e.g. Latitude showing `31.908` instead of the full
  `31.90894799`). That row's fields are now wide enough to show the full
  value, and every other small field/select (Sex, Gonad Stage, Tag Type,
  Disposition, etc.) got a smaller bump too, alongside a slightly smaller
  font in form fields generally (buttons unchanged) — small, deliberately
  not a redesign, and entry rows still line up neatly.
- **Collection # stays correct if you fix Activity/Date after the fact**
  (2026-09). Collection # is built from Activity+Date at the moment it's
  first assigned; if you change either one later, it's checked again on
  every save: if no fish have been entered yet under the old number, it
  quietly renumbers to match. If fish already exist (they're linked to a
  collection by that exact number, so silently renumbering would orphan
  them), a banner appears instead with two explicit choices — **Update
  Collection # (keep the fish)**, which renumbers the collection and moves
  every linked measured/sacrificed/tagged record over (sacrificedFish
  needed special handling here — its ID is a compound key derived from
  Collection #, so a plain update would leave a stale duplicate behind
  instead of moving it), or **Delete This Collection & Start Over**, which
  reuses the same delete-with-confirmation flow as the Delete Collection
  button. Nothing happens automatically once fish exist — both paths need
  a deliberate click.
- **Gear** auto-defaults from the collection's **Date** (Gill net for
  Jun/Jul/Aug, Trammel net for Sep/Oct/Nov, per Chris Sept 2026 — replaces
  the original's ActivityCode-based default). Only touches the field while
  it's still holding an auto-set value — a real manual pick sticks, even
  across later Date changes. Other months are left blank for manual choice.
- **Station System** (WAS/ALT/HAM/CMB) defaults to whichever one was last
  used, for a new collection — not always WAS.
- **Measured Fish** — species/length/weight tally, with the same live
  cross-checks against `LBioParms` the original had (implausible length for
  the species/sound system, SL-vs-FL mismatch, weight inconsistent with
  length), falling back to the generic "Georgia" bioparm row exactly like the
  original does when there's no system-specific one. Entered fish show as
  one summary row per species (species, measured count, editable Total
  Count) rather than a full table per species — per Chris (2026-09), a wall
  of per-species tables got overwhelming as a collection fills up. An "Open"
  button per row expands that species' individual measurements (edit/delete
  included) below the summary table; only one species' detail is shown at a
  time, closing automatically if its last record gets deleted. Length boxes
  are ordered FL, TL, SL (per Chris, 2026-09 — FL first since it's what's
  actually recorded for nearly every species). The entry row itself is
  ordered Species -> lengths -> Sex -> Taken -> **Add Fish** ->
  Comments (2026-09) — matching the real workflow (lengths, sex if shown,
  Add, move on) with Comments, rarely filled in per-fish, out of the way at
  the end rather than sitting before the Add button. Neither SL nor Weight
  show by default (per Chris, 2026-09/10) — in 24 years of the survey,
  neither has ever really been used boat-side (SL: 3 of 115,751 historical
  records, 0.003%, and even those read like stray mis-entries; Weight: not
  collected at all). Rather than remove the capability outright, a small
  **"+ SL / Wt"** button reveals both inline for the rare case one actually
  is needed — click it again ("− SL / Wt") to hide and clear them. Once
  revealed they stay visible across fish and species changes (only their
  *values* clear on species change, same as TL) until explicitly hidden
  again, since the rare case that needs them once likely needs them again
  soon after. The Measured Fish detail table only shows an SL or Wt column
  when at least one row in that species' group actually has a value, so the
  normal (empty) case stays uncluttered.
  The "Current total for this species" hint under Species is positioned
  absolutely (not in normal flow) with reserved bottom padding on the row,
  per Chris (2026-09) — it used to make the Species box taller than its
  siblings and throw the row out of vertical alignment whenever a total was
  showing.

  Pressing **Enter** walks forward through whichever of Species -> FL -> TL
  -> SL -> Sex -> Wt are actually visible for the current species (SL/Wt
  only count if the "+ SL / Wt" reveal is on), only adding the fish once
  Enter is pressed from the *last* visible one in that list — **changed
  2026-10, per Chris**: it used to submit immediately after any Enter
  press, which for a species needing TL or Sex too risked the recorder
  hitting Enter out of habit right after FL and not noticing until later
  that the rest got silently skipped. For an FL-only species (most of them)
  this is no different than before: FL -> Enter -> next fish. For Red Drum
  (FL+TL) it's FL -> Enter -> TL -> Enter -> next fish; for a shark
  (FL+TL+Sex) it's FL -> Enter -> TL -> Enter -> Sex -> Enter -> next fish.
  Enter reuses `addMeasuredFish()`'s own validation for the actual submit
  step, so a premature Enter (e.g. from Species, or from the last field
  with nothing filled in) shows the same rejection toast the Add Fish
  button would rather than adding a blank row. On success, focus goes to
  **FL** (changed 2026-09, per Chris) — Species itself is left as-is (not
  cleared) for rapid same-species entry, so the fast path for several fish
  of one species is: pick Species once, then run the length/Sex sequence
  per fish, only touching Species again when it's time to switch species.
- **Species-specific fields** — FL is always shown; TL and Sex show up per
  species via a three-tier rule worked out with Chris over a few rounds
  (2026-09/10; full reasoning and exact logic in
  `tools/regenerate_species_fields.py`, output in `js/speciesFields.js`,
  applied in `updateMeasuredFieldVisibility()`):
  1. **Category override, by common name** — any species with "Shark" in
     the name gets TL+Sex, "Crab" or "Ray" gets Sex, regardless of how much
     (or how little) historical data exists for that exact species.
     Confirmed against ~116,000 historical `Recreational Fisheries 2008
     (1).accdb` records: every shark with real data shows TL+Sex 74-100% of
     the time; crabs/rays show Sex as the only real secondary field. This
     also fixes species the old data-only approach missed by bad luck of
     sample size — e.g. Great Hammerhead, Tiger Shark, Nurse Shark, and Bull
     Shark (19 historical records, one short of the cutoff) all now
     correctly get TL+Sex despite little or no history, since they're
     obviously the same kind of animal as their well-sampled relatives.
  2. **Real historical usage rates** — for anything not in a category, if a
     field was actually recorded on a meaningful share of that species'
     records (and there's enough history to trust the percentage), show it.
     This is what gives Red Drum -> TL and most other finfish -> FL only.
  3. **Default to showing TL+Sex** for anything left over with no category
     match and not enough data (changed 2026-09/10, per Chris) — the
     opposite of the original version's implicit "not enough data -> hide
     it" behavior. An unneeded field costs a glance; a hidden needed one
     blocks data entry outright, so an unknown species should default to
     the more permissive layout, not the more restrictive one.

  Every species gets an explicit entry in `js/speciesFields.js` — including
  a deliberate empty array for species tier 2 confirms are genuinely
  FL-only — so nothing is left to an implicit/ambiguous "not listed"
  fallback. Switching to a species that hides TL clears whatever was typed
  there too, so a value can't silently ride along unnoticed.

  **SL is excluded from this system entirely**, not just deprioritized —
  see "Neither SL nor Weight show by default" above; both are behind the
  manual "+ SL / Wt" button instead, independent of species.

  **Skate** (Clearnose, the only one in the list) is folded into the Ray
  rule (Sex only, no TL — 2026-10, per Chris) rather than left to tier 3's
  default, despite having no historical data of its own to confirm it
  against — close enough relative to a Ray that the category makes sense
  either way.
- **Subsample tool** — the `MSPHPSubSampleList`-driven "TAKE THIS FISH" prompt
  for under-sampled 10mm length bins, same trigger logic as the original
  (including its exact `<=` boundary behavior).
- **Sacrificed Fish** — sample ID, gonad stage/weight, otolith-taken, same
  live length/weight cross-checks. "Label" button opens the browser's print
  dialog with a label-sized slip (Collection #, Sample #, 2-letter species
  code) instead of driving a dedicated label printer — the original's
  hardcoded species letter-codes (CN/CR/SO/PL/PD/PC/AP/MU/MA/LS) are
  preserved for the same species, with everything else falling back to the
  first two letters of the species' common name.
- **Tagged Fish** — dual tag numbers, Primary ID auto-fills from Tag # like
  the original.
- **Collection metadata must be complete before any fish data can be
  entered** (per Chris, Sept 2026) — specifically the **Location/Gear**
  section: Latitude/Longitude/Gear/Vessel Op./Data Rec./Fish Meas. (**not**
  Dir. of Tide, which is a real field but excluded from the check since
  crews never actually fill it in — same treatment Moon Phase already had
  in Hydrographic). **Hydrographic/Weather is deliberately NOT required**
  to unlock fish entry (changed 2026-09, was originally required alongside
  Location/Gear) — some staff prefer to come back and fill weather/water
  conditions in later; the Hydro status pill still tracks it, it just
  doesn't gate anything. Since it's easy to genuinely forget to circle back,
  there are two reminders instead: leaving a collection (the "Collections"
  button) with Hydro still incomplete shows a one-time toast, and the
  Collections list has its own **Hydro** column showing MISSING/OK for
  every collection at a glance — so an incomplete one doesn't need to be
  caught in the moment, it's still visible whenever you're scanning the
  list later. Until Location/Gear shows COMPLETE, each fish
  tab's entry row is disabled with a banner explaining why; already-entered
  fish and their Delete buttons stay usable regardless, so you can still
  review/clean up existing data. This is enforced twice — the entry row is
  visibly disabled, and the Add action itself refuses even if called
  directly, so there's no way to bypass it from the UI.
- **Type a code directly instead of using the dropdown** (per Chris,
  Sept 2026) — on Activity, Sound System, Gear, Weather, Wind Direction,
  Wind Velocity, Tide Stage, Moon Phase, Species (all 3 fish tabs), Sex,
  Tag Type, and Disposition: focus the field and type the numeric code
  (e.g. "3" + Tab for Red Drum) instead of clicking through the list. This
  matches against the actual code, not the visible label, so it can't land
  on the wrong option the way relying on the browser's own built-in
  typeahead can when codes share a leading digit (e.g. species 3 vs. 30).
  Tabbing/clicking away after typing a code shows a brief confirmation
  ("Set to: Drum, Red (3)") so a mistyped code doesn't go unnoticed — this
  only fires after actually typing a code, not after an ordinary mouse
  click, so it doesn't add noise to the common case. Station and the crew
  dropdowns (Vessel Op./Data Rec./Fish Meas.) are deliberately left out —
  their values aren't simple numeric codes. A single click on any of these
  fields focuses it without opening the native dropdown (per Chris, 2026-09
  — on Windows, clicking a closed `<select>` opens an OS-level popup that
  captures every keystroke for its own typeahead, so typing a code right
  after that first click used to go nowhere until a second click closed the
  popup). The field is fully usable with one click either way: type a code
  immediately, or click a second time (now that it's focused) to open the
  list and pick with the mouse as usual.
- **Backspace/Delete clears a dropdown** back to blank — same as it would
  in a text field. Applies to every dropdown in the app, not just the
  code-entry ones above.
- **Crew dropdowns** (Vessel Op. / Data Rec. / Fish Meas.) — pulled from the
  real crew list, not free text. Data Rec. defaults to match Vessel Op. once
  picked, but stays changeable. Starting a *new* collection carries these 3
  forward from the most recently entered collection; *reopening* an existing
  one to review it always shows exactly what was saved for that record —
  carry-forward never overwrites a saved collection.
- **Table Data screen** (gear icon, top of the Collections list) — lets you
  edit the reference data yourself, no developer needed:
  - **Crew** — add/rename/remove crew members. Takes effect immediately and
    feeds the 3 dropdowns above.
  - **Gear** — add/rename/remove gear types (the Gear dropdown on the
    Collection tab).
  - **Activity** — add/rename/remove activity types (the Activity dropdown,
    and the leading digit(s) of every generated Collection Number).
  - **Stations** — add/edit/remove entries in the master station list (per
    WAS/ALT/HAM/CMB), the same list that drives the Station field's
    Lat/Long auto-fill.
  - **Monthly Station Assignments** — import the month's randomly-generated
    station list (save it as CSV first). Once imported, the Station field
    during entry is restricted to that month's assigned stations for the
    active system — typing something off that list gets a warning. If no
    list has been imported yet for a given month, entry falls back to the
    full master list rather than blocking anyone. See "CSV format" below.
  All edits here (crew, stations, and each month's assignment import) are
  stored on-device and travel to other devices the same way field data
  does — via **Backup (JSON)** / **Restore Backup**.
- **Export CSVs for Access** — writes `RFCollection`, `RFMeasuredFish`,
  `RFSacrificedFish`, `RFTaggedFish` as four CSVs with the *same column names
  and order* as the source tables, so your regional intermediate database can
  import them the same way it already imports from the field .mdb (File >
  Get External Data > Import in Access). This is the "thumb drive" step —
  copy the CSVs from your Downloads folder to the thumb drive same as today.
- **Backup (JSON)** / **Restore Backup** — a full-fidelity dump/restore of
  everything in the app's local storage, independent of the Access-shaped
  CSVs above. Use this to move data to a new/replacement device, or as a
  safety copy before doing anything you're unsure about. Restoring is
  additive/overwrite-by-key, so it's safe to run more than once.
- **Backup reminder banner** — the Collections screen shows when this device
  was last backed up. Meant as a daily end-of-day habit: as soon as there's
  new data since the last backup it turns amber ("back up before you head
  out today"), and if that gets missed for 2+ days it turns red/urgent. If
  nothing's changed since the last backup it stays green no matter how long
  ago that was, since there's nothing new to lose. One-click "Backup Now"
  right on the banner.
- **Adapts to phone/tablet/laptop screens** (2026-10, per Chris) — see
  "Screen size" below for the full explanation. Auto-detects by default and
  reacts live to the window resizing; a small override in Table Data lets
  you pin a specific one on a device where Auto ever guesses wrong.

## Data durability — what's protected automatically vs. what needs a click

- **Every record you've already added is safe the moment it's added** — it's
  written straight to the device's local storage (IndexedDB), not held in
  memory. An accidental app/tab close, or even the device losing power
  abruptly, only risks whatever was still typed into the one field you hadn't
  tabbed away from yet — never previously-added records.
- **Closing the laptop lid while underway is fine, no special handling
  needed** — that's a sleep, not a shutdown; the page stays alive exactly as
  you left it and resumes instantly. As extra insurance, the app also
  force-saves the current Collection tab the instant the page is backgrounded
  (lid closing, switching apps) even if you were mid-field and hadn't tabbed
  away yet — see the `visibilitychange` handler in `js/app.js`.
- **A browser refresh (F5, or an accidental reload) is guarded, not
  silently auto-saved.** IndexedDB writes are async and not guaranteed to
  finish before a page actually unloads, so silently "saving on the way out"
  isn't reliable the way the lid-close flush above is. Instead, if there's
  a fish entry-row filled in but not yet clicked Add, or a Collection field
  mid-edit that hasn't been saved yet, the browser's native "leave this
  page? changes may not be saved" prompt appears first — giving you the
  chance to cancel the refresh and finish (or click Add) before it happens.
  Already-added fish and already-saved fields never trigger this — see the
  `beforeunload` handler in `js/app.js`.
- **Phones specifically — backgrounding is handled differently than on a
  laptop** (built 2026-10, per Chris, after being asked directly whether
  mobile was really as safe as laptop use). A laptop's backgrounded tab
  just sits there in memory untouched; a phone OS is much more likely to
  fully discard a backgrounded tab under memory pressure and reload it
  fresh when you switch back — and that reload doesn't reliably fire
  `beforeunload` the way an in-app refresh does, so that safety net alone
  isn't enough on mobile. Two things cover this:
  - The same `visibilitychange` flush above also saves whatever's
    currently typed into **any** fish tab's entry row — not just the one
    you're looking at — as a recoverable draft (not a real record yet),
    even if you haven't clicked Add.
  - If the app reloads while a collection was open (rather than you
    deliberately going Home), it **reopens that same collection
    automatically** instead of dropping you at the Collections list — and
    if a draft was saved for it, restores it into the entry row with a
    toast confirming it happened, exactly as you left it. Already-added
    fish were never at risk either way (see the point above) — this
    specifically closes the "typed but not yet Added" gap that's a real
    risk on mobile and a much smaller one on a laptop. Explicitly going
    Home (or deleting the collection) clears both the auto-resume and any
    leftover draft, so a normal end-of-session doesn't drag stale
    half-typed data into the next one. See `saveEntryRowDraft()` /
    `restoreEntryRowDraft()` and the `lastOpenCollection` meta key in
    `js/app.js`.
- **What none of the above protects against:** the device itself being lost,
  dropped overboard, stolen, wiped/reimaged, or having its browser data
  cleared by someone "cleaning up." Local storage is still just local — it
  offers no protection if the device itself goes away.
- **Important: clicking "Backup (JSON)" does NOT get data off the device by
  itself.** It writes a second, independent copy of everything into that
  same device's Downloads folder — same as the CSV export does. That
  protects against the browser's own storage getting cleared or corrupted,
  but if the device itself is lost or destroyed, both copies (IndexedDB
  *and* the JSON file sitting in Downloads) go with it. The backup file
  still has to be physically moved off the device — thumb drive, or the
  shared network folder below — to actually protect against device loss.
  In practice, do this alongside your end-of-day CSV export: pull both
  the CSVs *and* the JSON backup out of Downloads together.
- The app also asks the browser (via the `navigator.storage.persist()` API)
  not to evict its local data for space. This is best-effort and not
  supported by every browser, so treat it as a reduced risk, not a
  guarantee.

## Getting data off the device

The path is: **Export CSVs for Access** (plus the **Backup (JSON)** file,
see above) -> both land in Downloads -> moved off the device -> regional
intermediate database, same as the original .mdb's process. This never
depends on having any connectivity at all, which matters since the office
wifi/shared-folder connection isn't always reliable:

- **When the office wifi/shared folder is up:** drag the files from
  Downloads into the shared folder like normal.
- **When that connection drops (it does sometimes):** fall back to a thumb
  drive, exactly like the original .mdb's process — the export step itself
  doesn't care which one you use, it just writes to Downloads either way.

A further upgrade worth considering later, only if it'd actually help: the
Export button could use the browser's File System Access API to let you pick
a target folder once (the shared drive, or a thumb drive) and then write
straight into it every time, skipping the Downloads-folder middle step
entirely. Didn't build this yet since it doesn't fix the "connection drops"
problem on its own (you'd still fall back to a thumb drive on those days) —
happy to add it if the extra convenience on the days wifi *does* work is
worth it to you.

## Monthly station assignment CSV/Excel format

Settings > Monthly Station Assignments accepts either a CSV or a real Excel
file (`.xlsx`/`.xls`) directly — no need to Save As CSV first (per Chris,
2026-09; the list naturally comes straight out of Excel). Excel files are
read client-side via SheetJS, vendored locally at `js/vendor/xlsx.core.min.js`
(not loaded from a CDN, so this still works with zero connectivity). Every
sheet in the workbook is checked for one with a Station column (not just
the first) — real workbooks often have a Notes/Instructions tab before the
actual data — falling back to the first sheet if none match. **Fixed
2026-10**: the library was originally vendored as the smaller "mini" build,
which silently doesn't support legacy binary `.xls` files at all (throws an
internal `parse_xlscfb is not defined` error) — a real problem for a
24-year-old survey where old `.xls` templates are common. Switched to the
"core" build (437KB vs. mini's 250KB, still far lighter than the 881KB
"full" build) after confirming it correctly reads a real legacy `.xls` file
end to end. Either format needs at minimum a **Station** column —
header matching is case-insensitive and forgiving of common variants
(`Station`, `Station Name`, `StationID`). Optional columns, if present, are
read and carried through: `System` (WAS/ALT/HAM/CMB — if missing, inferred
from the station name's prefix), `Gear`, `Quad`, `Status`, `Latitude`,
`Longitude`. You pick the month it applies to at import time (a plain
month picker), independent of anything in the file itself. Re-importing the
same month replaces that month's list rather than duplicating it. Rows whose
system can't be determined (no System column and an unrecognized name
prefix) still get imported and listed, but won't show up in any system's
filtered Station list — the import summary tells you if that happened.

## Screen size (phone/tablet/laptop)

Built 2026-10, per Chris — this app started laptop/Toughbook-only, but field
staff also carry 10" tablets and phones, and one fixed layout doesn't fit a
6.3" screen. **Auto** (the default) picks a layout from the actual window
width and keeps reacting live as it changes (resizing a window, rotating a
tablet) — nothing to set up on any device. A small **Screen Size** control
at the top of Table Data (Auto / Phone / Tablet / Laptop) exists only for
the rare case Auto guesses wrong (e.g. unusual Windows display-scaling) —
picking one pins it on that device and stops it reacting to the window,
the same deliberate way the WAS/ALT/HAM/CMB station-system toggle works;
picking Auto again restores the live behavior. The choice is remembered
per device (`DB.setMeta('deviceTierOverride', ...)`, same mechanism as
`lastStationSystem`).

Technically: `computeAutoDeviceTier()`/`applyDeviceTier()` in `js/app.js`
set a single `data-device-tier="phone"|"tablet"|"laptop"` attribute on
`<html>` — width ≤480px is Phone, ≤1024px Tablet, above that Laptop — and
`css/style.css` reacts entirely to that one attribute (no separate
`@media` breakpoints duplicating the same thresholds). Tablet and Laptop
currently share the same unscoped rules — `.fieldGrid`/`.fieldGridCompact`'s
`auto-fill` grid and `.entryRow`'s `flex-wrap` already reflow reasonably
well from tablet width up — so only `[data-device-tier="phone"]` has real
overrides: one field per row instead of a multi-column grid, entry rows
(fish tabs, and every Table Data add-form, which reuses the same
`.entryRow` class) stacked full-width instead of wrapping several narrow
boxes per line, bigger tap targets, and the header collapsing (see below)
instead of eating a large share of a small screen. The Tablet/Laptop
buttons exist for symmetry and as a future hook, not because they differ
from each other today. Every `.dataTable` scrolls horizontally instead of
overflowing the page at any width — wide tables (the 10-column Collections
list, 11-column Sacrificed/Tagged Fish detail) genuinely need it on a
phone, and it's a no-op elsewhere.

**Fixed 2026-10, per Chris**: Auto wasn't reliably detecting Phone on a
real device, even though picking Phone manually worked fine (confirming
the CSS/attribute side was never the problem — just the detection).
Switched from a raw `window.innerWidth` comparison to `matchMedia`, added
`orientationchange` alongside `resize`, and — since the actual root cause
couldn't be fully confirmed without the real device — added a live
diagnostic line under the Screen Size control ("Detected width: 412px →
phone") so a future mismatch is immediately visible and reportable instead
of a guessing game. Also hardened the service worker: it now forces an
update check on every load and, when safe to (`hasUnsavedChanges()`),
auto-reloads once a genuinely new version installs — a stale cached
version was a real possibility given how this bug was investigated.

### Header — active-tab highlight and phone collapse

Two related fixes, both 2026-10 per Chris. First, the three header buttons
(Collections / Station Status / Table Data) never showed which one you were
actually in — `showView()` now toggles `.active` on whichever one matches,
same accent-fill visual language as `.toggleBtn.active` elsewhere.

Second, on phone that header (nav row + title + badge) was eating real
height while staying sticky/visible the whole time, worst inside a
collection where the space is needed most. On phone it's now compact
(icon-only buttons — `.navBtnLabel` text hidden, title/badge hidden
entirely) and **auto-collapses to a thin "▼ Menu" pull-tab** the moment a
collection is opened (`showView()` toggling `.collapsed` on `#appHeader`),
expanding back via a tap on that tab (`#btnHeaderToggle`). No effect on
tablet/laptop — entirely `[data-device-tier="phone"]`-scoped CSS.

### Collection sub-tabs — Collection / Measured / Sacrificed / Tagged, and Delete moved off them

Changed 2026-10, per Chris, from real mobile use. `#tabStrip` (inside a
collection) used to hold just "Collection" and "Delete Collection" — on
phone those two wrapped onto separate lines, off-center and stacked, and
Delete sat right there at full tab size on every sub-tab including
Measured Fish, an easy target for an accidental tap. Now:

- The tab strip is **Collection / Measured Fish / Sacrificed Fish / Tagged
  Fish** — a clean 4-up row (wraps to 2×2 on phone) that lets you jump
  directly between any of them, not just back to Collection first. Same
  gated/locked look as the existing jump-to boxes when Collection metadata
  isn't complete yet (`.tabBtn.gated`, toggled in `updateFishEntryGating()`
  alongside the jump boxes) — clicking still navigates either way, since
  the actual block is the entry row itself, disabled regardless of how you
  got there.
- **Delete Collection moved off the tab strip entirely** — it only exists
  on the Collection tab now (`.deleteCollectionRow`, at the very bottom,
  past the fish-tab jump boxes), and is deliberately smaller/quieter than
  everything above it rather than tab-sized. Still needs the same
  `confirm()` it always has ("Delete collection X and everything in
  it?... This cannot be undone.") — nothing changed about the actual
  deletion, just where the button lives and how much it stands out.
- The existing Measured/Sacrificed/Tagged Fish jump boxes further down the
  Collection tab (the ones with fish counts) are unchanged and still
  there — the top tab strip is an additional, faster way to switch between
  tabs once you're already in one, not a replacement for that first
  "what's next" prompt.

### Subsample tool — one-time prompt instead of a persistent checkbox

Changed 2026-10, per Chris — the checkbox + full sentence on Measured Fish
ate a whole line for something decided once per collection and rarely
touched again. The first time Measured Fish is opened for a collection, a
prompt asks Yes/No once (`askSubsampleChoice()`/`maybeAskSubsampleChoice()`
in `js/app.js`, tracked per-session in `subsampleAskedFor`, not asked again
for a collection that already has measured fish on reopen); the checkbox
itself (`#f_SubSampleTool`) still exists and still drives the exact same
"TAKE THIS FISH" logic, just hidden — replaced on screen by a compact
tappable **Subsample: ON/OFF** pill that re-shows the same prompt if you
need to change it later.

### Android back button / swipe-back

Built 2026-10, per Chris, who asked specifically what the back gesture
should do. Without handling it, Android's back gesture falls through to
the browser's real session history — often nothing meaningful for a PWA
opened fresh from the home screen (drops straight out, no warning) — so
this traps it with the History API (`js/app.js`, the "Android back
button" section, `popstate` handler + `pushState` calls in `showView()`
and at boot in `init()`):

- From anywhere other than the Collections list, one back press returns to
  the list — the same as tapping the Home button (Chris: *"most useful
  would be to go back to the home screen"*), including the same
  incomplete-Hydro reminder and draft cleanup.
- From the list itself — nowhere further back to go within the app — a
  back press is treated as trying to exit. If there's data that hasn't
  been backed up yet (the same "dirty" signal the backup banner already
  tracks — checking for an unsaved *field*, specifically, isn't
  meaningful by this point, since leaving a collection already flushes
  it), a confirmation offers to cancel and go back to tap **Backup Now**
  first; with nothing unbacked-up, the exit proceeds with no interruption.
  Canceling re-arms the trap, so a second or third back press in a row
  gets the same protection, not just the first.
- The backup check is async but `popstate` needs a synchronous answer (the
  real back navigation has already happened by the time it fires) — the
  handler always re-plants a history entry immediately, then decides
  afterward whether to actually let the exit through via a real
  `history.back()` call, with a suppression flag so that programmatic call
  doesn't re-trigger itself.

## Monthly Station Status (check/balance)

A read-only checklist (per Chris, 2026-09) at the header's **✓ Station Status**
button — pick a month, sound system (WAS/ALT/HAM/CMB), and gear type, and it
lists every station assigned to that combination with a **Done** pill next to
any that already has a fully complete collection (same `gearCollectionComplete()`
check used to gate fish entry elsewhere — Lat/Long/Gear plus all three crew
fields), or blank if not yet worked. The station list itself comes from that
month's imported assignment list if one exists (same fallback-to-full-master-
list behavior as the Station dropdown during entry), filtered down to
stations whose master-list Gear tag (Settings > Stations — Both/Gill/Trammel)
matches the gear you picked. Opening the tab defaults the month to the
current one and the gear to that month's seasonal default (Gill Jun-Aug,
Trammel Sep-Nov) so it's useful without any picks first.

This only reflects whatever collections exist on the device you're viewing
it on — there's no server. If the crew works from separate laptops, Restore
Backup merges rather than overwrites (`DB.put` per record, by key), so
restoring everyone's Backup (JSON) file onto one device first gives an
accurate combined checklist there.

## What's deliberately NOT in this version

These exist in the original .mdb but are back-office/administrative rather
than boat-side field entry, or were already unused in the original:

- **RFTagReturn / SAnglerInfo** (angler tag-return & rewards program) — a
  separate back-office workflow, not part of boat-side collection. If a
  recapture gets entered on the Tagged Fish tab, the app just flags it with a
  note to also record it in the office Tag Return process.
- **MSPHPStationAssignments** (monthly station assignment admin tool).
- **DepthTemp** (depth/temperature profile logging) — this had a defined
  relationship to `RFCollection` in the original .mdb but was never actually
  wired into any form or code there either, so nothing is lost by leaving it
  out here.
- Physical label-printer integration — uses the browser's print dialog
  instead (see Sacrificed Fish above).

## Maintaining it

No build step, no framework, no npm/node needed — it's plain HTML/CSS/JS you
can open and edit directly:

**Gotcha found 2026-09/10, worth knowing before touching CSS**: the
`hidden` attribute/property only actually hides an element if nothing else
sets that element's `display`. Any class with its own `display` (`.field`'s
`display: flex`, for example) silently wins over the browser's built-in
`[hidden] { display: none }` — normal author CSS beats a normal user-agent
rule regardless of selector specificity. This was root cause of a real bug:
the species-conditional TL/SL/Sex fields on Measured Fish were toggling
`hidden` correctly in JS the whole time, but never actually disappearing
visually. Fixed with one global rule near the top of `css/style.css`:
`[hidden] { display: none !important; }`. Toggle visibility via `el.hidden`
everywhere in this app (never inline `style.display`), and that one rule
stays the single source of truth — don't remove it, and don't fight it with
a more specific `display` override elsewhere.

- `MSPHS Data Entry.html` — page structure
- `css/style.css` — all styling (large fonts / high contrast for sunlight,
  matches the font sizing the original forms used)
- `js/lookups.js` — **auto-generated**, read-only reference data (species,
  stations, bio-parameters, etc.) pulled from the original .mdb's lookup
  tables. Don't hand-edit this file.
- `js/speciesFields.js` — **auto-generated**, which extra fields (TL/SL/Sex)
  to show per species on Measured Fish, derived from historical
  `Recreational Fisheries 2008 (1).accdb` data — see
  `tools/regenerate_species_fields.py`. Don't hand-edit this file.
- `js/db.js` — local storage (IndexedDB) layer
- `js/validation.js` — the LBioParms length/weight cross-checks
- `js/subsample.js` — the "TAKE THIS FISH" stratified-subsampling logic
- `js/fieldlogic.js` — Collection Number generation, station/gear/sound-system
  auto-fill rules
- `js/export.js` — CSV export + JSON backup/restore
- `js/settings.js` — the Settings screen: editable Crew/Stations (persisted
  as overrides layered on top of `js/lookups.js`'s factory defaults) and the
  monthly Station Assignments import/filter
- `js/stationStatus.js` — the Station Status checklist view (month/system/
  gear -> assigned stations -> Done/blank)
- `js/vendor/xlsx.core.min.js` — third-party (SheetJS), vendored locally so
  Excel-file import (including legacy `.xls`) works with zero connectivity.
  Don't hand-edit; replace the whole file to update it.
- `js/app.js` — screen wiring / everything else

### If the source lookup tables change

If someone adds a species to `LSpecies`, moves/adds a station, updates
`LBioParms` regressions, or changes `MSPHPSubSampleList` targets in the
**original** `msphp data entry.mdb`, re-run:

```
python "tools\regenerate_lookups.py"
```

(from a machine with Python + `pyodbc` + the Microsoft Access driver — the
same machine this was built on already has both.) It reads straight from the
.mdb one folder up and rewrites `js/lookups.js`. It never touches any field
data you've entered — only the reference/lookup data bundled into the app.

If a species was added/renamed, also re-run
`python "tools\regenerate_species_fields.py"` to refresh which of TL/Sex
show for it on Measured Fish — it reads `LSpecies` from the same `msphp data
entry.mdb` (for the code -> name the category rules match against) **and**
`Desktop/Recreational Fisheries 2008 (1).accdb` (for the historical usage
rates), and rewrites `js/speciesFields.js`.

## Status

Built and tested (Sept 2026) against the real lookup data and schema pulled
from `msphp data entry.mdb`. Tested end-to-end with Playwright: collection
creation/numbering, station auto-fill, bio-parameter warnings, subsampling
flag logic, sacrificed-sample ID generation, tagged-fish entry, IndexedDB
persistence across reload, and CSV export column-matching — all passing as of
this build. Not yet tested on an actual Toughbook/tablet in the field —
that's the natural next step before relying on it for a real trip.
