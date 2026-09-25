"""
Regenerates js/lookups.js from the live lookup tables in the original Access
field-entry database (..\\msphp data entry.mdb, i.e. the .mdb one folder up
from this PWA folder).

Run this again ONLY if the source lookup tables change — new species added to
LSpecies, a station added/moved in LStationCoordinatesWAS/ALT/HAM/CMB, updated
LBioParms regressions, or a changed MSPHPSubSampleList target. Everyday use of
the app does NOT need this script; it only touches the read-only reference
data bundled into the app, never your entered field data.

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

    out["bioParms"] = [
        {
            "species": r["SpeciesCode"], "soundSystem": r["SoundSystem"],
            "flMin": r["FLMin"], "flMax": r["FLMax"],
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
    out["stationsALT"] = stations(cursor, "LStationCoordinatesALT")
    out["stationsHAM"] = stations(cursor, "LStationCoordinatesHAM")
    out["stationsCMB"] = stations(cursor, "LStationCoordinatesCMB")

    js = "// Auto-generated from msphp data entry.mdb lookup tables — do not hand-edit.\n"
    js += "// Regenerate via tools/regenerate_lookups.py if the source Access lookup tables change.\n"
    js += "const LOOKUPS = " + json.dumps(out, indent=1) + ";\n"

    OUT_PATH.write_text(js, encoding="utf-8")
    print(f"Wrote {OUT_PATH} ({len(js)} bytes)")
    for k, v in out.items():
        print(" ", k, len(v) if isinstance(v, list) else "n/a")


if __name__ == "__main__":
    main()
