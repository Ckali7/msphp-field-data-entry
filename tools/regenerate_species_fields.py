"""
Regenerates js/speciesFields.js — which extra measurement fields (beyond FL,
which is always shown) to display per species on the Measured Fish tab.

Three-tier rule (per Chris, 2026-09/10, refined after reviewing the data
together over a few rounds):

  1. Category override, by common name, regardless of how much historical
     data exists for that exact species — Shark -> TL+Sex, Crab -> Sex,
     Ray/Skate -> Sex. Confirmed against history: every shark with real
     data shows TL+Sex 74-100% of the time (SL: 0%); crabs/rays show 0%
     TL/SL and Sex as the only real secondary field. This also fixes
     species with zero/sparse historical records (e.g. Great Hammerhead,
     Tiger Shark, Bull Shark at n=19) that tier 2 alone would otherwise
     default to FL-only despite obviously being the same kind of animal as
     their well-sampled relatives. Skate (Clearnose, the only one in the
     list) has no historical data of its own to confirm this against, but
     Chris folded it into the Ray rule (2026-10) as a close-enough relative
     rather than leaving it to tier 3's default.
  2. Empirical per-species data — for anything not in a category, if a
     field was actually recorded on a meaningful share (PCT_THRESHOLD) of
     that species' historical records, and there's enough history
     (N_THRESHOLD) to trust the percentage, show it.
  3. Default to showing TL+Sex (not hiding them) for anything left with no
     category match and not enough data — per Chris (2026-09): a species
     we have no real information about should default to the MORE
     permissive layout. Showing an unneeded field costs a glance; hiding a
     needed one blocks data entry outright.

SL is excluded from this system entirely, not just deprioritized (per
Chris, 2026-09/10) — it appears on 3 of 115,751 historical records
(0.003%, and even those read like stray mis-entries, not a real pattern),
consistent with 24 years of the survey never using it. It's still
available in the Measured Fish entry row, just behind a manual "+ SL / Wt"
reveal button (see setMfRareFieldsShown() in js/app.js) rather than shown
or hidden per species — same treatment as Weight, which was dropped from
per-species consideration even earlier for the same reason.

Two source databases:
  - ..\\msphp data entry.mdb (one folder up from this PWA folder) — the
    live field app's own LSpecies table, for the code -> common-name
    mapping the category rules match against. Same source
    tools/regenerate_lookups.py uses, kept independent of js/lookups.js
    (a generated file) so this script doesn't depend on that one having
    been regenerated first.
  - Desktop/Recreational Fisheries 2008 (1).accdb — ~116,000 historical
    RFMeasuredFish records, for the empirical per-species field-usage
    percentages (tier 2).

Every species in the live app's LSpecies gets an explicit entry in the
output — including a deliberate empty array for a species tier 2 confirms
is genuinely FL-only — so nothing is left to an implicit/ambiguous
"not listed" fallback the way the old version worked.

    python "tools\\regenerate_species_fields.py"
"""
import json
import pathlib
import pyodbc

THIS_DIR = pathlib.Path(__file__).resolve().parent
PWA_DIR = THIS_DIR.parent
MDB_PATH = PWA_DIR.parent / "msphp data entry.mdb"
HISTORICAL_DB = pathlib.Path.home() / "Desktop" / "Recreational Fisheries 2008 (1).accdb"
OUT_PATH = PWA_DIR / "js" / "speciesFields.js"

# Tier 2: a field only counts as "typically taken" for a species if it was
# recorded on at least this fraction of that species' historical records...
PCT_THRESHOLD = 15.0
# ...and only if there's enough history to trust the percentage at all.
N_THRESHOLD = 20
# Tier 3 fallback — see module docstring.
DEFAULT_FIELDS = ["TL", "Sex"]


def category_fields(common_name):
    name = (common_name or "").lower()
    if "shark" in name:
        return ["TL", "Sex"]
    if "crab" in name:
        return ["Sex"]
    if ("ray" in name and "gray" not in name) or "skate" in name:
        return ["Sex"]  # per Chris (2026-10): Skate folded into the Ray rule (FL + Sex only)
    return None


def main():
    app_cnxn = pyodbc.connect(f"DRIVER={{Microsoft Access Driver (*.mdb, *.accdb)}};DBQ={MDB_PATH};")
    app_cursor = app_cnxn.cursor()
    app_cursor.execute("SELECT SpeciesCode, CommonName FROM LSpecies")
    species = [(r.SpeciesCode, (r.CommonName or "").strip()) for r in app_cursor.fetchall()]

    hist_cnxn = pyodbc.connect(f"DRIVER={{Microsoft Access Driver (*.mdb, *.accdb)}};DBQ={HISTORICAL_DB};")
    hist_cursor = hist_cnxn.cursor()
    hist_cursor.execute(
        """
        SELECT SpeciesCode,
            COUNT(*) AS total,
            SUM(IIF(TL IS NOT NULL, 1, 0)) AS tl_n,
            SUM(IIF(SexCode IS NOT NULL, 1, 0)) AS sex_n
        FROM RFMeasuredFish
        WHERE SpeciesCode IS NOT NULL
        GROUP BY SpeciesCode
        """
    )
    hist_by_code = {r.SpeciesCode: r for r in hist_cursor.fetchall()}

    config = {}
    tier_counts = {"category": 0, "data": 0, "default": 0}
    for code, name in species:
        cat = category_fields(name)
        if cat is not None:
            config[str(code)] = cat
            tier_counts["category"] += 1
            continue

        r = hist_by_code.get(code)
        if r is not None and r.total >= N_THRESHOLD:
            extra = []
            if 100 * r.tl_n / r.total >= PCT_THRESHOLD:
                extra.append("TL")
            if 100 * r.sex_n / r.total >= PCT_THRESHOLD:
                extra.append("Sex")
            config[str(code)] = extra
            tier_counts["data"] += 1
            continue

        config[str(code)] = list(DEFAULT_FIELDS)
        tier_counts["default"] += 1

    ordered = {str(code): config[str(code)] for code, _ in sorted(species, key=lambda x: x[0])}

    js = (
        "// Auto-generated from LSpecies (..\\msphp data entry.mdb) and historical\n"
        "// RFMeasuredFish records (Desktop/Recreational Fisheries 2008 (1).accdb) —\n"
        "// do not hand-edit. Regenerate via tools/regenerate_species_fields.py.\n"
        "//\n"
        "// Per species: which of TL / Sex to show on Measured Fish beyond FL\n"
        "// (always shown). Determined by, in order: (1) a Shark/Crab/Ray name\n"
        "// category override, (2) real historical usage rates where there's\n"
        "// enough data to trust them, (3) defaulting to showing both when\n"
        "// neither of the above applies. See tools/regenerate_species_fields.py\n"
        "// for the full rule and reasoning. SL and Weight are handled separately\n"
        "// (a manual reveal button, not species-driven) — never in this file.\n"
        "const SPECIES_EXTRA_FIELDS = " + json.dumps(ordered, indent=1) + ";\n"
    )
    OUT_PATH.write_text(js, encoding="utf-8")
    print(
        f"Wrote {OUT_PATH} — {len(ordered)} species "
        f"({tier_counts['category']} by category, {tier_counts['data']} by historical data, "
        f"{tier_counts['default']} default fallback)"
    )


if __name__ == "__main__":
    main()
