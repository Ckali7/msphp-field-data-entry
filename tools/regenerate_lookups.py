"""
Regenerates js/lookups.js from the live lookup tables in the original Access
field-entry database (..\\msphp data entry.mdb, i.e. the .mdb one folder up
from this PWA folder).

Run this again ONLY if the source lookup tables change — new species added to
LSpecies, a station added/moved in LStationCoordinatesWAS/ALT/HAM, updated
LBioParms regressions, or a changed MSPHPSubSampleList target. Everyday use of
the app does NOT need this script; it only touches the read-only reference
data bundled into the app, never your entered field data.

IMPORTANT (2026-09-30): a raw run of this script will NOT reproduce the
current shape of js/lookups.js. Two things layered on top of a plain regen,
neither sourced from this .mdb:
  1. Every WAS/ALT/STA station's "location" field (a short human-written
     description) — merged in from Desktop\\Station Location Match\\
     *_with_Descriptions.xlsx, not present in these tables.
  2. The 3-system restructuring: LStationCoordinatesHAM's 137 stations are
     merged into stationsALT (the .mdb still tracks them as a separate table
     — this script's stations() calls below combine them), LStationCoordinatesCMB
     (always just one never-populated placeholder) is skipped entirely, and
     stationsSTA (122 real stations, no .mdb table exists for it at all) has
     to be rebuilt from LStationAssignmentSTA_with_Descriptions.xlsx.
If you add real stations to LStationCoordinatesHAM going forward, they'll
show up correctly (merged into ALT) on the next regen — but a NEW WAS/ALT
station added this way won't have a "location" value, and nothing here can
regenerate stationsSTA at all since its source isn't in the .mdb.

Requires: Python 3 with pyodbc installed, and the Microsoft Access Database
Engine (ACE OLEDB / ODBC) driver, both already present on the machine this
was built on. Run from anywhere:

    python "tools\\regenerate_lookups.py"
"""
import json
import pathlib
import pyodbc

THIS_DIR = pathlib.Path(__file__).resolve().parent
PWA_DIR = THIS_DIR.parent
MDB_PATH = PWA_DIR.parent / "msphp data entry.mdb"
OUT_PATH = PWA_DIR / "js" / "lookups.js"

conn_str = (
    r"DRIVER={Microsoft Access Driver (*.mdb, *.accdb)};"
    f"DBQ={MDB_PATH};"
)


def rows(cursor, table):
    cursor.execute(f"SELECT * FROM [{table}]")
    colnames = [c[0] for c in cursor.description]
    out = []
    for row in cursor.fetchall():
        out.append(dict(zip(colnames, [(v if not hasattr(v, "isoformat") else v.isoformat()) for v in row])))
    return out


def simple(cursor, table, code_key, name_key):
    return [{"code": r[code_key], "name": (r[name_key] or "").strip()} for r in rows(cursor, table)]


def stations(cursor, table):
    result = []
    for r in rows(cursor, table):
        if not r.get("STATION"):
            continue
        result.append({
            "station": r["STATION"].strip(),
            "lat": r["Latitude"], "lon": r["Longitude"],
            "habitat": (r.get("Habitat") or "").strip() if r.get("Habitat") else None,
            "depth": (r.get("Depth") or "").strip() if r.get("Depth") else None,
            "gear": (r.get("Gear") or "").strip() if r.get("Gear") else None,
        })
    return result


def main():
    cnxn = pyodbc.connect(conn_str)
    cursor = cnxn.cursor()

    out = {}
    out["activity"] = simple(cursor, "LActivity", "ActivityCode", "Activity")
    out["gear"] = simple(cursor, "LGearType", "GearCode", "GearType")
    out["disposition"] = simple(cursor, "LDisposition", "DispositionCode", "Disposition")
    out["sex"] = simple(cursor, "LSex", "Sex", "SexText")
    out["tagType"] = simple(cursor, "LTagType", "TagType", "TagTypeText")
    out["tideStage"] = simple(cursor, "LTideStage", "TideStageCode", "TideStage")
    out["weather"] = simple(cursor, "LWeatherConditions", "WeatherCode", "WeatherConditions")
    out["windDirection"] = simple(cursor, "LWindDirection", "WindDirection", "DirectionName")
    out["windVelocity"] = simple(cursor, "LWindVelocity", "WindVelocity", "WindVelocityRange")
    out["moonPhase"] = simple(cursor, "LMoonPhase", "MoonPhaseCode", "MoonPhaseName")
    out["gonadStage"] = simple(cursor, "LMacroGonadStage", "MacroscopicGonadStage", "MacroscopicGonadStageText")
    out["condition"] = simple(cursor, "LCondition", "ConditionCode", "FishCondition")
    out["dirTide"] = simple(cursor, "LDirTide", "DirTide", "DirTideText")
    out["crew"] = simple(cursor, "LCrew", "CrewCode", "CrewName")
    out["doNotAdd"] = [r["SpeciesCode"] for r in rows(cursor, "LDoNotAdd")]

    out["soundSystem"] = [
        {"code": r["SoundSystem"], "name": r["SoundSystemName"], "lat": r["Latitude"], "lon": r["Longitude"]}
        for r in rows(cursor, "LSoundSystem")
    ]

    out["species"] = [
        {
            "code": r["SpeciesCode"],
            "sci": (r["Species"] or "").strip(),
            "common": (r["CommonName"] or "").strip(),
            "letter": (r["LetterText"] or "").strip(),
        }
        for r in rows(cursor, "LSpecies")
    ]

    # flCount=9999 / tlMin,tlMax=None / tlCount=0 (2026-10-01, per Chris): the
    # FL/TL reasonable-range check (checkLengthRange()/recordLengthObservation()
    # in validation.js) needs these on every row. flCount=9999 marks these as
    # already-established real survey data (skips the 5-real-entry warmup new
    # species/TL combos go through); LBioParms itself has no TL columns at all,
    # so tlMin/tlMax always start null here regardless of what's in the .mdb.
    # NOTE: this only affects the baseline a brand-new device starts from —
    # each device's own IndexedDB (lookupOverrides) holds whatever it's
    # learned since, and that always wins over this file on load, so a regen
    # does NOT erase live-learned TL ranges already sitting on a real device.
    out["bioParms"] = [
        {
            "species": r["SpeciesCode"], "soundSystem": r["SoundSystem"],
            "flMin": r["FLMin"], "flMax": r["FLMax"], "flCount": 9999,
            "tlMin": None, "tlMax": None, "tlCount": 0,
            "flSLm": r["FLSLm"], "flSLb": r["FLSLb"],
            "flTWa": r["FLTWa"], "flTWb": r["FLTWb"],
            "slTWa": r["SLTWa"], "slTWb": r["SLTWb"],
        }
        for r in rows(cursor, "LBioParms")
    ]

    out["subSample"] = [
        {"species": r["SpeciesCode"], "size": r["SubSampleSize"], "min": r["MinimumSize"], "max": r["MaximumSize"]}
        for r in rows(cursor, "MSPHPSubSampleList")
    ]

    out["stationsWAS"] = stations(cursor, "LStationCoordinatesWAS")
    # HAM merged into the ALT button/list (per Chris, 2026-09-30) — the .mdb
    # itself still keeps them as separate tables, so this combines them here
    # rather than relying on a change to the source data. LStationCoordinatesCMB
    # is skipped entirely (always just one never-populated placeholder row).
    out["stationsALT"] = stations(cursor, "LStationCoordinatesALT") + stations(cursor, "LStationCoordinatesHAM")
    # stationsSTA has NO source table in this .mdb — it came from
    # LStationAssignmentSTA_with_Descriptions.xlsx (see module docstring
    # above) and can't be regenerated from here. A raw run of this script
    # will silently drop it — re-add it by hand from that source afterward.

    js = "// Auto-generated from msphp data entry.mdb lookup tables — do not hand-edit.\n"
    js += "// Regenerate via tools/regenerate_lookups.py if the source Access lookup tables change.\n"
    js += "// NOTE: this run did not add station[].location descriptions or stationsSTA —\n"
    js += "// see this script's module docstring for what still needs to be re-applied by hand.\n"
    js += "const LOOKUPS = " + json.dumps(out, indent=1) + ";\n"

    OUT_PATH.write_text(js, encoding="utf-8")
    print(f"Wrote {OUT_PATH} ({len(js)} bytes)")
    for k, v in out.items():
        print(" ", k, len(v) if isinstance(v, list) else "n/a")


if __name__ == "__main__":
    main()
