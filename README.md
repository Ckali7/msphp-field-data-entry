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
  (WAS/ALT/STA, same as the WAS/ALT/STA toggle buttons — see "Station-system
  restructuring" below) and infers **Sound System** from the station name
  prefix, same rule as the original (`ALT#### >= 0116` -> Doboy, else
  Altamaha; `HAM` -> Hampton River; `WAS` -> Wassaw; `SSI` -> St. Simons)
  plus a new one for `STA` (St. Andrew Sound vs. Cumberland River, split by
  latitude — see below). If a Monthly Station Assignment list is active (see
  Table Data below), the Station dropdown is restricted to that month's
  assigned stations for the active system — a station already saved on an
  existing record stays selectable even if a later assignment import would
  otherwise exclude it, so reviewing an older collection never silently
  loses its saved value. Changing Station **always** re-syncs
  Latitude/Longitude/Sound System to match the newly-picked station (fixed
  2026-09 — it used to only fill those fields if they were still blank, so
  picking a different station after the first one left stale coordinates
  behind).
- **Location auto-fill (added 2026-09-30).** Every WAS/ALT/STA station in
  the master list now also carries a short human-written location
  description (e.g. "New Cut, near Wassaw Island N end") sourced from
  Desktop\Station Location Match\*_with_Descriptions.xlsx. Picking a Station
  seeds the Collection tab's free-text **Location** field with that
  description, same "always re-sync on station change" behavior as
  Latitude/Longitude — but unlike those, Location stays a normal editable
  text field afterward, so a specific collection can still add detail or
  override it by hand without affecting the master station list.
- **Station-system restructuring (2026-09-30, per Chris).** The app now has
  3 station-system buttons instead of 4:
  - **HAM merged into ALT.** The live Access `.mdb` tracks Hampton River as
    its own table/SYSTEM code separate from Altamaha, but that's a
    database-schema split, not two independent surveys — "Chronology of
    Adjustments to MSPHP ALTHAM Survey Design.pdf" (`Desktop\MSPHS GLMM
    Standardization\`) confirms Hampton River and Altamaha were designed and
    run as **one combined "ALTHAM" program since 2003** (shared quad/pool
    numbering from day one; e.g. Jan 2004 "effort was reallocated between
    Hampton and new Altamaha systems" when Doboy Sound stations were added
    to replace dropped Altamaha ones). HAM was never dropped from the survey
    — only ordinary individual-station churn over the years, same as ALT
    had. So merging them in the app (357 stations: 220 ALT + 137 HAM) is
    arguably a return to how the survey was always conceived, not just a UI
    simplification. HAM station *names* are unchanged (still `HAM####`) —
    only which button/list they live under changed. An imported Monthly
    Station Assignment row still tagged `HAM` (by an explicit System column
    or inferred from the name) is normalized to `ALT` on import so it still
    shows as assigned once the ALT system is selected. Sound System
    inference still returns Hampton River (code 11) for `HAM`-prefixed
    stations — that biological classification wasn't touched, only the UI
    grouping.
  - **CMB retired, replaced by STA.** CMB was always a single
    never-populated placeholder station (`CMB0001`) — never real data.
    Chris provided a real 122-station list (`LStationAssignmentSTA_with_
    Descriptions.xlsx`) covering St. Andrew Sound and the Cumberland River
    area, which never existed in the `.mdb` at all. That's the new **STA**
    button. Because it spans two real Sound System entries (St. Andrew =
    15, Cumberland = 16) the same way ALT already spans two (Altamaha/
    Doboy), `inferSoundSystemFromStation()` splits STA by each station's
    real latitude (>= 30.9565 -> St. Andrew, else Cumberland — that cutoff
    sits in a clean gap between the northernmost Cumberland-named station
    and the southernmost St. Andrew-named one in the source file) rather
    than a station-number rule like ALT's, since there's no historical
    precedent to port for a system this new.
  - `tools/regenerate_lookups.py` cannot fully reproduce this from the
    `.mdb` alone (no `LStationCoordinatesSTA` table exists, and the `.mdb`'s
    own HAM/ALT tables are still separate) — see that script's module
    docstring for exactly what has to be re-applied by hand after a regen.
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
- **Station System** (WAS/ALT/STA) defaults to whichever one was last
  used, for a new collection — not always WAS.
- **Measured Fish** — species/length/weight tally, with the same live
  cross-checks against `LBioParms` the original had (SL-vs-FL mismatch,
  weight inconsistent with length — unrelated, unchanged), falling back to
  the generic "Georgia" bioparm row exactly like the original does when
  there's no system-specific one. The implausible-length check itself (FL,
  and now TL too) was rebuilt into a full Bio Parameters system 2026-10-01 —
  see "Bio Parameters — FL/TL reasonable-range checks" below. Entered fish show as
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
- **Species-required lengths, strictly enforced (2026-09-30, per Chris).**
  FL is required for every species; TL is *also* required whenever the
  current species shows it (the same `SPECIES_EXTRA_FIELDS` list that
  controls whether TL is shown at all) — not just "any one length" the way
  it briefly worked before. Applies identically to Add Fish and Enter, since
  Enter already just calls `addMeasuredFish()` (see above) — a TL-bearing
  species can no longer slip through on FL alone, and an FL-only species
  can't be added with only TL/SL filled in either.
- **Taken checkbox hidden unless Subsample is ON (2026-09-30, per Chris).**
  In the original Access app, `FishTaken` was only ever set by the
  subsample "TAKE THIS FISH" logic — there was no manual checkbox concept
  when subsample was off. This restores that: the Taken checkbox disappears
  (and unchecks itself) whenever Subsample is OFF, and reappears the moment
  it's turned on. Wired into `updateSubsampleIndicator()`, so it reacts to
  every way Subsample's state changes (the one-time prompt, the compact
  indicator's re-toggle).
- **Add Counts** (2026-09-30, per Chris) — a small, low-key "Add Counts"
  button at the top of the Measured Fish tab, for fish that were seen/caught
  but never individually measured, ported from the legacy Access
  "RFMeasuredFishAdd" form. Opens a popup listing every species already
  measured in the collection (same `doNotAdd` exclusion as the existing
  per-species Total Count editor) with **Current / Add / = / Final Count**
  columns — type a number in Add and press **=** to fold it into Current
  (repeatable, so several adds can stack before committing). Nothing is
  written to the real records until **Update Counts** is clicked, behind
  the same "cannot be undone" confirm the original used; **Exit (no
  changes)** discards everything typed. Used once, typically at the end of
  a collection's data-entry stream, not as a running total kept live
  alongside individual measurements.
- **Tagged/Recaps popup** (2026-09-30, per Chris) — a "Tagged/Recaps"
  button next to Add Fish opens a small overlay for tag/recapture info on
  the fish currently being entered: **Tag Status** / **Disposition** on one
  row, then three **Tag Type / Tag Number** pairs below (Tag Number is
  free-text). Its own **Add Fish** button in the bottom-right just calls the
  same `addMeasuredFish()` the main button and Enter both use — nothing
  special about the save, only which fields are populated — and returns to
  the main Measured Fish area afterward. These fields are cleared after
  every add (whether or not the popup was opened for that particular fish)
  so nothing carries over to the next one, and they participate in the same
  mid-typing draft-recovery system as the rest of the row (see "Data
  durability" below).
  - **Tag Status** reuses the existing `LTagType` lookup (Not Tagged /
    Tagged / Recaptured) — this is the measuredFish field that used to be
    called `TagType`, **renamed to `TagStatus`** in the schema and the
    Access-shaped export, since the real lookup behind it is a status, not
    a tag type. (`DispositionCode` already existed in the schema too, just
    never surfaced in the UI until now — same `LOOKUPS.disposition` list
    already used on the Tagged Fish tab.)
  - **Tag Type 1/2/3** are a genuinely different concept — the physical tag
    type (Dart, Internal PIT, etc.), since one fish can carry up to 3. No
    such list existed anywhere (not in the `.mdb`, not in this app), so
    there's a brand-new editable table for it: Settings > Table Data >
    **Tag Types**, same simple code+name pattern as Crew/Gear/Activity.
    Starts empty — populate real tag-type names there before this field is
    useful.
  - `TagType1`/`TagNumber1`/`TagType2`/`TagNumber2`/`TagType3`/`TagNumber3`
    are new fields on measuredFish records, in that order, inserted right
    after TagStatus/DispositionCode in the Access-shaped export.
- **Bio Parameters — FL/TL reasonable-range checks (2026-10-01, per Chris).**
  Rebuilt from scratch, replacing the old passive post-save FL warning
  entirely (not layered on top of it). The old `LBioParms` table only ever
  had FL ranges (no TL columns at all, and only 25 of ~150 species even had
  an FL row) — this extends the same idea to TL, and makes gaps fill
  themselves in from real survey data instead of staying empty forever.
  - **The check itself**: when Add Fish is clicked (or Enter triggers it),
    FL — and TL too, for species that show it — is checked against that
    species+sound-system's known range (falling back to the generic
    "Georgia" row the same way the length/weight regressions already did).
    A value outside an *established* range blocks the save with a real
    confirm: "FL/TL _ is outside the current range for _: min - max. Is
    this measurement correct?" — **Yes** saves the fish and widens the
    range to include it (permanently — this isn't just a one-time bootstrap
    window, a genuinely larger/smaller confirmed fish keeps the range
    honest forever); **No** does *not* save, and bounces focus back to the
    specific field that triggered it with its value still there to fix,
    since it's most likely a keystroke error, not a real measurement.
  - **The warmup problem, solved**: a species+length combo with no
    established range yet (which is *every* TL range to start, plus FL for
    the ~125 species the old table never had data for) would otherwise nag
    on almost every entry for weeks before a legitimate range existed. So a
    range doesn't start enforcing (i.e. stop silently accepting everything)
    until it has **5 real measurements** behind it — before that, every
    value just widens the range with no popup at all. The 68 original FL
    ranges are exempt from this entirely (seeded with a count of 9999 on
    migration) since they're already real, decades-old survey data.
  - **Settings > Table Data > Bio Parameters** — fully editable: Species,
    Sound System, FL Min/Max/Count, TL Min/Max/Count, add/edit/delete rows
    by hand. Typing a large number directly into Count marks a manually-
    entered range as already-trusted (skips the 5-entry warmup); leaving it
    low/at 0 lets it warm up from real entries like everything else does.
    The existing FL-to-SL and FL/SL-to-Weight regression coefficients
    aren't shown in this table — unrelated to this feature, untouched by
    anything edited here.
  - Implementation: `checkLengthRange()` / `recordLengthObservation()` in
    `js/validation.js`, called from `addMeasuredFish()` in `js/app.js`.
    `LOOKUPS.bioParms` rows gained `flCount`/`tlMin`/`tlMax`/`tlCount`
    alongside the existing `flMin`/`flMax`; a brand-new species+system
    combo (first real measurement ever, or added by hand in Settings) gets
    a row created on the fly. A regen of `js/lookups.js` from the `.mdb`
    (`tools/regenerate_lookups.py`) only affects a brand-new device's
    starting baseline — it does NOT erase ranges a real device has already
    learned, since those live in that device's own IndexedDB
    (`lookupOverrides`), which always wins over the shipped file on load.
- **"Tuning round" (2026-10-01, per Chris) — six small fixes/additions:**
  - **TL/FL/SL length-relationship rule.** TL can never be shorter than FL,
    and SL must always be less than whichever of FL/TL is present — true by
    definition of how the three lengths are measured, so (unlike the Bio
    Parameters range check above) a violation can only be a data-entry
    error. Add Fish is hard-blocked with an `alert()` and focus bounces to
    the offending field (TL or SL) with its value intact — there's no
    "are you sure, save anyway" override, since this can never legitimately
    be correct. Applies identically to **both** Measured Fish and
    Sacrificed Fish. Implementation: `checkLengthRelationships()` in
    `js/validation.js`, called from `addMeasuredFish()` and
    `addSacrificedFish()` in `js/app.js`, checked before the Bio Parameters
    range check.
  - **"Fish added" feedback.** A brief background flash on the entry row
    (`.addFlash`, 0.4s) plus a short synthesized beep (Web Audio
    `OscillatorNode`, no audio file shipped/cached) on every successful Add
    Fish/Enter across Measured, Sacrificed, and Tagged Fish —
    `signalFishAdded()` in `js/app.js`. On by default; toggle at
    **Settings > Table Data**, in the bar just below the Screen Size
    override (`#addFeedbackToggle`), persisted via `DB.setMeta()` the same
    way `deviceTierOverride` is (a device preference, not shared/editable
    reference data, so it doesn't live in `lookupOverrides`).
  - **Tag Status / Disposition gating.** In the Tagged/Recaps popup,
    picking **Tag Status = Not Tagged** or **Disposition = Released
    without Tag** disables and clears the three Tag Type/Tag Number pairs
    (there's nothing to record) — re-enabled the moment neither condition
    holds. `syncTagFieldsGating()` in `js/app.js`, wired to both selects'
    `change` and re-run after every fish is added (which already clears
    both fields back to blank) and when the popup opens.
  - **Collection-tab change-confirmation gate.** Changing a Collection-tab
    field that already holds a real, deliberately-chosen value — not a
    first-time fill, and not one of this app's own auto-fills (Station's
    Lat/Long/Location/SoundSystem cascade, Gear's month default, VesselOp's
    DataRec default) — now asks "This field already has a value entered.
    Do you want to change it?" before applying it. **Cancel** reverts the
    field to its prior value and skips whatever cascade it would have
    triggered; **OK** applies the change and lets the cascade run
    normally. Scoped to the Collection tab only — the fast per-fish entry
    rows are unaffected. "Already set" is tracked per open collection, not
    per field in the abstract: reopening a saved collection treats every
    populated field (including one that only ever came from an auto-fill
    at creation time) as already-set, while a brand-new collection starts
    every field's baseline blank even though several show carried-over/
    defaulted values on screen — the first genuine edit in a new collection
    just commits that baseline (no confirm), and only a second, later
    change to the same field warns. Implementation:
    `guardedCollectionChange()` / `collectionFieldBaseline` /
    `resetCollectionFieldBaselineBlank()` /
    `resetCollectionFieldBaselineFromForm()` in `js/app.js`. Left
    deliberately out of this: the `SubSampleTool` checkbox (a toggle, not a
    "did you mean to change this" concern) and native dialogs' button
    labels (see below).
  - **Yes/No vs. OK/Cancel — no change made.** Chris asked for Yes/No
    buttons on warning/confirm popups; this app's own overlay pattern
    (`.modalOverlay`/`.modalBox`, used by Add Counts and Tagged/Recaps)
    already uses real buttons it could label anything, but every other
    prompt in the app (including everything new in this round) is a native
    `confirm()`/`alert()`, and browsers do not allow relabeling those
    buttons — the only way to get "Yes/No" text would be a full custom
    modal rebuild for every such prompt. Chris confirmed native
    OK/Cancel is fine; no code changed for this item.
  - **Add Counts mobile layout.** The table's default `table-layout: auto`
    let the "Final Count" header dictate an oversized column, squeezing
    the Add-count input against the edge and forcing the whole table into
    horizontal scroll on phone widths. Fixed, proportioned column widths
    (`.addCountsTable` in `css/style.css`) plus a shorter "Final" header
    keep all 5 columns visible without scrolling even at ~360px.
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

  **Manual override (2026-09-30, per Chris):** Sheepshead (species 7) gets
  TL even though tier 2's historical usage rate came in below threshold — a
  deliberate prescriptive choice, not data-driven. Tracked in
  `MANUAL_TL_OVERRIDES` in `tools/regenerate_species_fields.py` (applied
  after the normal 3-tier computation) so a future regen doesn't silently
  drop it.

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
- **Touch-friendly code entry (added 2026-09-30, per Chris).** The
  typing-a-code trick above relies on `keydown` events from a real physical
  keyboard — it does nothing on phone/tablet, where tapping a `<select>`
  just opens the OS's own picker wheel with no way to type into it at all.
  On phone/tablet only (laptop is completely unaffected — see below), each
  of those same fields now has two separate tap zones: tapping the small
  arrow on the right still opens the real native dropdown list, exactly as
  before, while tapping anywhere else in the box brings up a real numeric
  keypad to type the code, which commits back into the field (with the same
  "Set to: ..." confirmation) on Tab/Enter/tapping away. Tapping the box a
  second time while the keypad is showing bails back out to a normal,
  immediately-tappable dropdown — a fallback for a tap that lands in the box
  again instead of the arrow, since browsers don't let a script force a
  native dropdown open (only a genuine tap on the field itself can).
  Mechanically, this overlays an invisible text input on top of the select's
  left portion (`wireTouchCodeEntry()` in `app.js`, `.codeEntryWrap`/
  `.codeEntryOverlay`/`.codeEntrySelect` in `css/style.css`) — on laptop that
  overlay is `pointer-events: none`, so every click passes straight through
  to the select exactly as it always has; nothing changed there.
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
    WAS/ALT/STA), the same list that drives the Station field's
    Lat/Long/Location auto-fill.
  - **Monthly Station Assignments** — import the month's randomly-generated
    station list (save it as CSV first). Once imported, the Station field
    during entry is restricted to that month's assigned stations for the
    active system — typing something off that list gets a warning. If no
    list has been imported yet for a given month, entry falls back to the
    full master list rather than blocking anyone. See "CSV format" below.
  - **Tag Types** (added 2026-09-30) — the physical tag type options (Dart,
    Internal PIT, etc.) for TagType1/2/3 in the Measured Fish "Tagged/Recaps"
    popup. A brand-new table, unlike everything else here — starts empty,
    populate it with real tag-type names before that popup's Tag Type
    dropdowns are useful. Same add/rename/remove pattern as Crew/Gear/Activity.
  - **Bio Parameters** (added 2026-10-01) — the FL/TL reasonable-range table
    behind the Measured Fish length confirm (see "Bio Parameters — FL/TL
    reasonable-range checks" above for the full behavior). Species, Sound
    System, FL/TL Min/Max/Count per row, add/edit/delete by hand.
  All edits here (crew, stations, tag types, bio parameters, and each
  month's assignment import) are stored on-device and travel to other
  devices the same way field data does — via **Backup (JSON)** /
  **Restore Backup**.

  **Bug found and fixed alongside this (2026-09-30):** every edit here used
  to rebuild *every* dropdown app-wide (`populateStaticDropdowns()`), not
  just the one lookup actually being edited — and rebuilding a `<select>`'s
  options via `innerHTML` resets its value to blank. Since Settings is
  reachable without leaving an open collection, adding so much as one Crew
  member while a collection sat open in the background silently wiped that
  collection's Gear/Activity/Sound System/etc. back to blank the next time
  it saved — a real, quiet data-loss risk, not hypothetical (caught while
  testing the new Tag Types table). `fillSelect()` now preserves each
  dropdown's previous value across a rebuild, falling back to blank only if
  that exact value no longer exists among the new options.
- **Export CSVs for Access** — writes `RFCollection`, `RFMeasuredFish`,
  `RFSacrificedFish`, `RFTaggedFish` as ONE `.xlsx` workbook with a sheet tab
  per table (changed 2026-09-30, per Chris — previously four separate CSV
  downloads), same column names/order as the source tables, so your regional
  intermediate database can import it the same way it already imports from
  the field .mdb (File > Get External Data > Import in Access — Access reads
  a specific sheet from a workbook the same as it reads a CSV). This is the
  "thumb drive" step — copy the file from your Downloads folder to the thumb
  drive same as today. Built with the already-vendored SheetJS library
  (`js/vendor/xlsx.core.min.js`), no new dependency.

  **Clear all data after exporting (added 2026-09-30, per Chris).**
  Immediately after a successful export, two confirms in sequence offer to
  wipe the device clean for the next month: "Clear all collection and fish
  data from the app now?", then "Are you sure? This will delete all data
  for this month. This cannot be undone." Saying **No** to *either* one
  leaves every record exactly as it was — exporting is always safe to do
  "just in case" without risking what's still in the app. Saying **Yes**
  to both clears all 4 field-data stores (collections/measured/sacrificed/
  tagged — not just collections, since a collection's fish would otherwise
  be orphaned) plus the current calendar month's imported Monthly Station
  Assignment list, since that's month-scoped data too.
- **Backup (JSON)** / **Restore Backup** — a full-fidelity dump/restore of
  everything in the app's local storage (not just the 4 field-data tables —
  also Crew/Gear/Activity/Stations/Tag Types edits and the monthly Station
  Assignment imports), independent of the Access-shaped workbook above.
  Use this to move data to a new/replacement device, or as a safety copy
  before doing anything you're unsure about — it's what actually protects
  against a browser "clear site data" action, since a downloaded file lives
  outside the browser's own storage entirely. Restoring is
  additive/overwrite-by-key, so it's safe to run more than once. Filename is
  `MSPHP_Backup_YYYY-MM-DD.json` (date-only, changed 2026-10-01 per Chris —
  was a full to-the-millisecond timestamp before, which buried the one part
  that actually matters for keeping Downloads organized; matches
  `MSPHP_Export_YYYY-MM-DD.xlsx`'s naming so the two sort/scan together).
  Backing up twice in one day collides on the name — the browser
  auto-suffixes the second as `(1).json` rather than overwriting, which is
  fine for a deliberate same-day re-backup. A website can't make a browser
  silently overwrite an existing file (blocked for security reasons), and
  the newer API that can isn't reliably supported on mobile Chrome, which
  ruled it out here.
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
read and carried through: `System` (WAS/ALT/STA — if missing, inferred
from the station name's prefix; a `HAM` prefix or System value normalizes to
`ALT`, per the 2026-09-30 station-system restructuring above), `Gear`, `Quad`, `Status`, `Latitude`,
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
the same deliberate way the WAS/ALT/STA station-system toggle works;
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
button — pick a month, sound system (WAS/ALT/STA), and gear type, and it
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
