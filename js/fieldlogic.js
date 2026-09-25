// Collection-level helper logic ported from Form_RFTabletEntry:
// CollectionNumber assembly, ActivityCode -> default gear, station lookup
// (auto-fill lat/lon), and station-prefix -> SoundSystem inference.
//
// NOTE: the original's NORMAL/ODD/EVEN counter split existed to let multiple
// crews work the same sound system on the same day without colliding on
// CollectionNumber. Per Chris (2026-09), that no longer happens — one crew
// per system per day — so this just increments a single per-day counter.

function pad2(n) {
  return String(n).padStart(2, '0');
}

// dateStr: 'YYYY-MM-DD'. existingNumbers: CollectionNumbers already used today
// (as strings), so a fresh device / a synced-in set of records both avoid collisions.
function generateCollectionNumber(activityCode, dateStr, existingNumbers) {
  const [yyyy, mm, dd] = dateStr.split('-');
  const yy = yyyy.slice(2);
  const prefix = `${activityCode}${yy}${mm}${dd}`;

  let maxCounter = 0;
  for (const num of existingNumbers) {
    if (num.startsWith(prefix) && num.length === prefix.length + 3) {
      const suffix = parseInt(num.slice(prefix.length), 10);
      if (!isNaN(suffix) && suffix > maxCounter) maxCounter = suffix;
    }
  }
  const counter = String(maxCounter + 1).padStart(3, '0');
  return `${prefix}${counter}`;
}

// Date's month -> default GearCode, only applied when GearCode is still
// blank. Per Chris (2026-09): Gill net for the summer YOY window (Jun/Jul/
// Aug), Trammel net for the fall MSPHP window (Sep/Oct/Nov) — replaces the
// old ActivityCode-based default, which risked disagreeing with this when
// Activity and Date didn't line up. Other months are left for manual choice.
function defaultGearForMonth(dateStr) {
  if (!dateStr) return null;
  const month = Number(dateStr.slice(5, 7));
  if ([6, 7, 8].includes(month)) return 108; // MSPHP Gill Net
  if ([9, 10, 11].includes(month)) return 111; // MSPHP Trammel Net
  return null;
}

const STATION_TABLES = {
  WAS: 'stationsWAS',
  ALT: 'stationsALT',
  HAM: 'stationsHAM',
  CMB: 'stationsCMB',
};

function lookupStation(system, stationName) {
  const key = STATION_TABLES[system];
  if (!key) return null;
  const list = LOOKUPS[key];
  return list.find((s) => s.station === stationName) || null;
}

// Station-name-prefix -> SoundSystem code, ported as-is from Station_LostFocus.
function inferSoundSystemFromStation(stationName) {
  if (!stationName) return null;
  const prefix = stationName.slice(0, 3).toUpperCase();
  const suffix4 = stationName.slice(-4);
  if (prefix === 'ALT') return suffix4 >= '0116' ? 9 : 10; // Doboy vs Altamaha
  if (prefix === 'HAM') return 11; // Hampton River
  if (prefix === 'WAS') return 3; // Wassaw
  if (prefix === 'SSI') return 13; // St. Simons
  if (prefix === 'CMB') return 16; // Cumberland
  return null;
}

// Mirrors Command165_Click's LGCStatus completeness check — except DirTide,
// which the original required but Chris's crews never actually fill in
// (2026-09) — left out here the same way MoonPhaseCode was already left out
// of hydroComplete() below: still a real field, just not gating "complete".
function gearCollectionComplete(c) {
  return (
    c.Latitude != null &&
    c.Longitude != null &&
    c.GearCode != null &&
    !!c.VesselOp &&
    !!c.DataRec &&
    !!c.FishMeas
  );
}

// Mirrors Command116_Click's WWStatus (hydro) completeness check.
function hydroComplete(c) {
  return (
    c.WeatherConditions != null &&
    c.WindDirection != null &&
    c.WindVelocity != null &&
    c.Depth != null &&
    c.TideStage != null &&
    c.Salinity != null &&
    c.WaterTemp != null &&
    c.DO != null
  );
}

// "Full collection metadata" per Chris (2026-09): Location/Gear has to be
// complete before any fish data can be entered — not just having a
// Collection Number. Hydrographic is deliberately NOT required here (per
// Chris, 2026-09) — some staff prefer to come back and fill weather/water
// conditions in later, so it stays informational (the Hydro status pill
// still tracks it) without gating fish entry.
function collectionMetadataComplete(c) {
  return gearCollectionComplete(c);
}
