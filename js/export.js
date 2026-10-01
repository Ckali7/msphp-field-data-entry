// Export functions. Nothing in here ever calls a network — a CSV/JSON file
// is written to the browser's Downloads folder, exactly the same handoff
// point as pulling data off the Toughbook today, just swapping "thumb drive"
// for "Downloads folder you copy to a thumb drive."

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

const EXPORT_COLUMNS = {
  RFCollection: [
    'CollectionNumber', 'ActivityCode', 'Date', 'Time', 'Time2', 'Latitude', 'Longitude',
    'Location', 'Station', 'SoundSystem', 'GearCode', 'HookNumber', 'Salinity', 'WaterTemp',
    'DO', 'WindDirection', 'WindVelocity', 'TideStage', 'MoonPhaseCode', 'WeatherConditions',
    'Depth', 'Comments', 'VesselOp', 'DataRec', 'FishMeas', 'Proofed', 'Latitude2',
    'Longitude2', 'DirTide', 'VesselSOG', 'DataSent',
  ],
  // TagType renamed to TagStatus (2026-09-30, per Chris) -- the underlying
  // value is unchanged (LTagType: Not Tagged/Tagged/Recaptured), just a
  // clearer name now that TagType1/2/3 exist as a genuinely different
  // concept (physical tag type) right next to it. Order below matches what
  // Chris specified: TagStatus, Disposition, then TagType1/TagNumber1,
  // TagType2/TagNumber2, TagType3/TagNumber3 as pairs.
  RFMeasuredFish: [
    'RecordNumber', 'CollectionNumber', 'SpeciesCode', 'TagStatus', 'DispositionCode',
    'TagType1', 'TagNumber1', 'TagType2', 'TagNumber2', 'TagType3', 'TagNumber3', 'TL',
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
// import, as ONE workbook with a sheet tab per table (per Chris, 2026-09-30
// — previously 4 separate CSV downloads, spaced 400ms apart since browsers
// silently throttle several rapid-fire downloads in the same tick; a single
// file sidesteps that entirely). Same table names, same column names/order
// as the field .mdb, now as sheet tab names instead of filenames.
async function exportForAccess() {
  const [collections, measuredFish, sacrificedFish, taggedFish] = await Promise.all([
    DB.getAll('collections'),
    DB.getAll('measuredFish'),
    DB.getAll('sacrificedFish'),
    DB.getAll('taggedFish'),
  ]);

  const wb = XLSX.utils.book_new();
  const sheet = (name, columns, rows) => {
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rows, { header: columns }), name);
  };
  sheet('RFCollection', EXPORT_COLUMNS.RFCollection, collections);
  sheet('RFMeasuredFish', EXPORT_COLUMNS.RFMeasuredFish, measuredFish);
  sheet('RFSacrificedFish', EXPORT_COLUMNS.RFSacrificedFish, sacrificedFish);
  sheet('RFTaggedFish', EXPORT_COLUMNS.RFTaggedFish, taggedFish);

  const stamp = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(wb, `MSPHP_Export_${stamp}.xlsx`);

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
  // Date-only filename (2026-10-01, per Chris) -- matches exportForAccess()'s
  // naming exactly, so the two files sort/scan together in Downloads. Was a
  // full to-the-millisecond timestamp before, which buried the date that
  // actually matters for keeping Downloads organized. Backing up twice in
  // one day collides on the name -- the browser auto-suffixes the second
  // (" (1).json") rather than overwriting, which is fine for an intentional
  // same-day re-backup.
  const stamp = new Date().toISOString().slice(0, 10);
  downloadFile(`MSPHP_Backup_${stamp}.json`, JSON.stringify(backup, null, 1), 'application/json');
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
