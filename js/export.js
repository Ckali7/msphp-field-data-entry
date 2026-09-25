// Export functions. Nothing in here ever calls a network — a CSV/JSON file
// is written to the browser's Downloads folder, exactly the same handoff
// point as pulling data off the Toughbook today, just swapping "thumb drive"
// for "Downloads folder you copy to a thumb drive."

function csvEscape(v) {
  if (v == null) return '';
  const s = v instanceof Date ? v.toISOString() : String(v);
  if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}

function toCSV(columns, rows) {
  const lines = [columns.join(',')];
  for (const row of rows) {
    lines.push(columns.map((c) => csvEscape(row[c])).join(','));
  }
  return lines.join('\r\n');
}

function downloadFile(filename, content, mime) {
  const blob = new Blob([content], { type: mime || 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const EXPORT_COLUMNS = {
  RFCollection: [
    'CollectionNumber', 'ActivityCode', 'Date', 'Time', 'Time2', 'Latitude', 'Longitude',
    'Location', 'Station', 'SoundSystem', 'GearCode', 'HookNumber', 'Salinity', 'WaterTemp',
    'DO', 'WindDirection', 'WindVelocity', 'TideStage', 'MoonPhaseCode', 'WeatherConditions',
    'Depth', 'Comments', 'VesselOp', 'DataRec', 'FishMeas', 'Proofed', 'Latitude2',
    'Longitude2', 'DirTide', 'VesselSOG', 'DataSent',
  ],
  RFMeasuredFish: [
    'RecordNumber', 'CollectionNumber', 'SpeciesCode', 'TagType', 'DispositionCode', 'TL',
    'FL', 'SL', 'TotalWeight', 'SexCode', 'TotalCount', 'FishTaken', 'Comments', 'ModalGroup',
    'FishMeas',
  ],
  RFSacrificedFish: [
    'CollectionNumber', 'SampleNumber', 'ID', 'SpeciesCode', 'TagType', 'TL', 'FL', 'SL',
    'TotalWeight', 'SexCode', 'GonadStage', 'GonadWeight', 'GonadsTaken', 'OtolithTaken',
    'Comments',
  ],
  RFTaggedFish: [
    'RecordNumber', 'PrimaryID', 'CollectionNumber', 'TagNumber', 'TagNumber2', 'SpeciesCode',
    'TagType', 'DispositionCode', 'TL', 'FL', 'SL', 'Comments',
  ],
};

// Produces the 4 tables your regional intermediate DB already knows how to
// import (File > Get External Data > Import in Access, same as always) —
// same table names, same column names/order as the field .mdb.
async function exportForAccess() {
  const [collections, measuredFish, sacrificedFish, taggedFish] = await Promise.all([
    DB.getAll('collections'),
    DB.getAll('measuredFish'),
    DB.getAll('sacrificedFish'),
    DB.getAll('taggedFish'),
  ]);

  // Downloads are spaced out on purpose: browsers silently block/throttle
  // several automatic downloads fired back-to-back in the same tick (looks
  // like download spam to them), which was dropping everything after the
  // first CSV. A short gap between each keeps all 4 landing reliably.
  const stamp = new Date().toISOString().slice(0, 10);
  downloadFile(`RFCollection_${stamp}.csv`, toCSV(EXPORT_COLUMNS.RFCollection, collections), 'text/csv');
  await delay(400);
  downloadFile(`RFMeasuredFish_${stamp}.csv`, toCSV(EXPORT_COLUMNS.RFMeasuredFish, measuredFish), 'text/csv');
  await delay(400);
  downloadFile(`RFSacrificedFish_${stamp}.csv`, toCSV(EXPORT_COLUMNS.RFSacrificedFish, sacrificedFish), 'text/csv');
  await delay(400);
  downloadFile(`RFTaggedFish_${stamp}.csv`, toCSV(EXPORT_COLUMNS.RFTaggedFish, taggedFish), 'text/csv');

  return {
    collections: collections.length,
    measuredFish: measuredFish.length,
    sacrificedFish: sacrificedFish.length,
    taggedFish: taggedFish.length,
  };
}

// Full-fidelity backup/restore, independent of the Access-shaped CSVs above.
// Use this to move data to a new device, or as a safety copy before clearing
// a device's storage — IndexedDB data lives ONLY on the device it was
// entered on until you export it.
const BACKUP_STORES = ['collections', 'measuredFish', 'sacrificedFish', 'taggedFish', 'lookupOverrides', 'stationAssignments'];

async function exportFullBackup() {
  const results = await Promise.all(BACKUP_STORES.map((s) => DB.getAll(s)));
  const backup = { exportedAt: new Date().toISOString() };
  BACKUP_STORES.forEach((s, i) => { backup[s] = results[i]; });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  downloadFile(`MSPHP_backup_${stamp}.json`, JSON.stringify(backup, null, 1), 'application/json');
  await DB.markBackedUp();
}

// Merges a backup file back in — existing records with matching keys are
// overwritten, everything else is added. Safe to run more than once. This
// is also how crew/station edits and a month's station-assignment import
// get carried from one device to another — same mechanism, no separate sync.
async function importFullBackup(jsonText) {
  const backup = JSON.parse(jsonText);
  let counts = {};
  for (const store of BACKUP_STORES) {
    counts[store] = 0;
    for (const row of backup[store] || []) {
      await DB.put(store, row);
      counts[store]++;
    }
  }
  return counts;
}
