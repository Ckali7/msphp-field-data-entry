// Settings screen: editable reference data (Crew, Master Stations) and the
// monthly Station Assignments import. Kept separate from app.js just to
// keep that already-large file from growing further.

// Lookup tables that can be edited in-app. Each edit overwrites the
// in-memory LOOKUPS[key] array AND persists it to IndexedDB so it survives
// reloads and travels to other devices via Backup (JSON) / Restore Backup.
const EDITABLE_LOOKUPS = ['crew', 'gear', 'activity', 'stationsWAS', 'stationsALT', 'stationsHAM', 'stationsCMB'];
const STATION_LOOKUP_KEYS = { WAS: 'stationsWAS', ALT: 'stationsALT', HAM: 'stationsHAM', CMB: 'stationsCMB' };

// Simple code/name lookup tables editable via a shared table+form pattern
// (Crew, Gear, Activity all have the same shape). codeIsNumeric matters:
// Gear/Activity codes are compared elsewhere with === against numbers
// (e.g. LOOKUPS.gear.find(g => g.code === someNumber)), so a code typed
// into the Add form has to be parsed as a number for those two, unlike
// Crew's alphanumeric codes.
const SIMPLE_LOOKUPS = {
  crew: { tbody: 'crewTbody', codeInput: 'crewCode', nameInput: 'crewName', codeIsNumeric: false, label: 'crew member' },
  gear: { tbody: 'gearTbody', codeInput: 'gearCode', nameInput: 'gearName', codeIsNumeric: true, label: 'gear type' },
  activity: { tbody: 'activityTbody', codeInput: 'activityCode', nameInput: 'activityName', codeIsNumeric: true, label: 'activity' },
};

async function hydrateLookupOverrides() {
  for (const key of EDITABLE_LOOKUPS) {
    const row = await DB.get('lookupOverrides', key);
    if (row) LOOKUPS[key] = row.value;
  }
}

async function persistLookupEdit(key) {
  await DB.put('lookupOverrides', { key, value: LOOKUPS[key] });
}

// ---------- view / tab switching ----------

function showSettingsTab(name) {
  document.querySelectorAll('.tabBtn[data-settings-tab]').forEach((b) => b.classList.toggle('active', b.dataset.settingsTab === name));
  $('settingsPanelCrew').hidden = name !== 'crew';
  $('settingsPanelGear').hidden = name !== 'gear';
  $('settingsPanelActivity').hidden = name !== 'activity';
  $('settingsPanelStations').hidden = name !== 'stations';
  $('settingsPanelAssignments').hidden = name !== 'assignments';
  if (name === 'crew') renderSimpleLookupTable('crew');
  if (name === 'gear') renderSimpleLookupTable('gear');
  if (name === 'activity') renderSimpleLookupTable('activity');
  if (name === 'stations') renderStationsTable();
  if (name === 'assignments') renderAssignmentsList();
}

// ---------- Crew / Gear / Activity (shared simple code+name editor) ----------

function renderSimpleLookupTable(key) {
  const cfg = SIMPLE_LOOKUPS[key];
  const tbody = $(cfg.tbody);
  tbody.innerHTML = LOOKUPS[key].map((row) => `
    <tr data-code="${row.code}">
      <td class="mono">${row.code}</td>
      <td><input type="text" class="simpleNameInput" value="${row.name}" /></td>
      <td><button class="smallBtn delBtn">Delete</button></td>
    </tr>`).join('');

  tbody.querySelectorAll('.simpleNameInput').forEach((inp) => {
    inp.addEventListener('change', async () => {
      const codeStr = inp.closest('tr').dataset.code;
      const code = cfg.codeIsNumeric ? Number(codeStr) : codeStr;
      const entry = LOOKUPS[key].find((r) => r.code === code);
      if (entry) { entry.name = inp.value; await persistLookupEdit(key); populateStaticDropdowns(); toast(`Updated ${cfg.label}.`); }
    });
  });
  tbody.querySelectorAll('.delBtn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const codeStr = btn.closest('tr').dataset.code;
      const code = cfg.codeIsNumeric ? Number(codeStr) : codeStr;
      if (!confirm(`Remove ${codeStr} from the ${cfg.label} list? Past records that used this code are unaffected.`)) return;
      LOOKUPS[key] = LOOKUPS[key].filter((r) => r.code !== code);
      await persistLookupEdit(key);
      populateStaticDropdowns();
      renderSimpleLookupTable(key);
    });
  });
}

async function addSimpleLookupEntry(key) {
  const cfg = SIMPLE_LOOKUPS[key];
  const rawCode = $(cfg.codeInput).value.trim();
  const name = $(cfg.nameInput).value.trim();
  if (!rawCode || !name) { toast('Both a code and a name are required.', true); return; }

  let code = rawCode;
  if (cfg.codeIsNumeric) {
    code = Number(rawCode);
    if (!Number.isFinite(code)) { toast('Code must be a number.', true); return; }
  }
  const exists = cfg.codeIsNumeric
    ? LOOKUPS[key].some((r) => r.code === code)
    : LOOKUPS[key].some((r) => r.code.toLowerCase() === code.toLowerCase());
  if (exists) { toast(`Code "${rawCode}" is already in use.`, true); return; }

  LOOKUPS[key].push({ code, name });
  await persistLookupEdit(key);
  populateStaticDropdowns();
  $(cfg.codeInput).value = '';
  $(cfg.nameInput).value = '';
  renderSimpleLookupTable(key);
  toast(`Added ${name}.`);
}

// ---------- Master Stations ----------

let settingsStationSystem = 'WAS';

function renderStationsTable() {
  const key = STATION_LOOKUP_KEYS[settingsStationSystem];
  const list = LOOKUPS[key];
  const tbody = $('stationsTbody');
  tbody.innerHTML = list.map((s, i) => `
    <tr data-idx="${i}">
      <td class="mono">${s.station}</td>
      <td><input type="number" step="0.00001" class="stEdit" data-field="lat" value="${s.lat ?? ''}" /></td>
      <td><input type="number" step="0.00001" class="stEdit" data-field="lon" value="${s.lon ?? ''}" /></td>
      <td><input type="text" class="stEdit" data-field="habitat" value="${s.habitat ?? ''}" /></td>
      <td><input type="text" class="stEdit" data-field="depth" value="${s.depth ?? ''}" /></td>
      <td><input type="text" class="stEdit" data-field="gear" value="${s.gear ?? ''}" /></td>
      <td><button class="smallBtn delBtn">Delete</button></td>
    </tr>`).join('');

  tbody.querySelectorAll('.stEdit').forEach((inp) => {
    inp.addEventListener('change', async () => {
      const idx = Number(inp.closest('tr').dataset.idx);
      const field = inp.dataset.field;
      const val = (field === 'lat' || field === 'lon') ? numOrNull(inp.value) : (inp.value || null);
      LOOKUPS[key][idx][field] = val;
      await persistLookupEdit(key);
      toast('Station updated.');
    });
  });
  tbody.querySelectorAll('.delBtn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const idx = Number(btn.closest('tr').dataset.idx);
      const name = LOOKUPS[key][idx].station;
      if (!confirm(`Remove station ${name} from the ${settingsStationSystem} list?`)) return;
      LOOKUPS[key].splice(idx, 1);
      await persistLookupEdit(key);
      renderStationsTable();
    });
  });
}

async function addStation() {
  const key = STATION_LOOKUP_KEYS[settingsStationSystem];
  const name = $('stationName').value.trim();
  if (!name) { toast('Station name is required.', true); return; }
  if (LOOKUPS[key].some((s) => s.station.toLowerCase() === name.toLowerCase())) {
    toast(`${name} already exists in the ${settingsStationSystem} list.`, true);
    return;
  }
  LOOKUPS[key].push({
    station: name,
    lat: numOrNull($('stationLat').value),
    lon: numOrNull($('stationLon').value),
    habitat: $('stationHabitat').value || null,
    depth: $('stationDepth').value || null,
    gear: $('stationGear').value || null,
  });
  await persistLookupEdit(key);
  for (const id of ['stationName','stationLat','stationLon','stationHabitat','stationDepth','stationGear']) $(id).value = '';
  renderStationsTable();
  toast(`Added ${name} to ${settingsStationSystem}.`);
}

// ---------- Monthly Station Assignments ----------

// Minimal, forgiving CSV parser: handles quoted fields with embedded commas.
// Header matching is case-insensitive; only "Station" is required.
function parseCSV(text) {
  const rows = [];
  let row = [], field = '', inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else { inQuotes = false; }
      } else field += c;
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field); field = '';
    } else if (c === '\r') {
      // skip
    } else if (c === '\n') {
      row.push(field); field = '';
      rows.push(row); row = [];
    } else {
      field += c;
    }
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((c) => c.trim() !== ''));
}

// The monthly assignment list naturally comes straight out of Excel — per
// Chris (2026-09), forcing a manual "Save As CSV" step every month before
// importing was unnecessary friction. XLSX (vendored locally in
// js/vendor/, not loaded from a CDN, so it still works with zero
// connectivity) reads the workbook client-side and this normalizes it to
// the same array-of-arrays shape parseCSV() already produces, so the
// column-detection logic below doesn't need to know which format it got.
function looksLikeExcelFile(file) {
  return /\.xlsx?$/i.test(file.name) ||
    file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    file.type === 'application/vnd.ms-excel';
}

function sheetToRows(sheet) {
  return XLSX.utils.sheet_to_json(sheet, { header: 1, blankrows: false, defval: '' })
    .map((r) => r.map((c) => (c == null ? '' : String(c))));
}

function looksLikeStationHeader(row) {
  const header = row.map((h) => h.trim().toLowerCase());
  return ['station', 'station name', 'stationid', 'station id'].some((n) => header.includes(n));
}

async function parseImportFile(file) {
  if (looksLikeExcelFile(file)) {
    const buf = await file.arrayBuffer();
    const wb = XLSX.read(buf, { type: 'array' });
    // SheetJS never throws on a file it can't really parse as a spreadsheet
    // (a corrupt/renamed/non-Excel file) — it silently falls back to
    // wrapping the raw bytes as a single "Sheet1", so this catch alone
    // can't detect that. A workbook with no sheets at all is the one clear
    // signal something is genuinely wrong, so surface it as a real error
    // rather than letting it fall through to a confusing "no data rows" or
    // "no Station column" message later.
    if (!wb.SheetNames.length) {
      throw new Error('This doesn’t look like a readable spreadsheet — it may be corrupted, password-protected, or not actually an Excel file despite its name.');
    }
    // Real workbooks often have a Notes/Instructions tab before the actual
    // data (per Chris, 2026-10) — scan every sheet for the first one whose
    // header row actually has a Station column, rather than assuming the
    // data is always on the first tab. Falls back to the first sheet
    // (previous behavior) if nothing matches, so the existing "couldn't
    // find a Station column" message still fires for a genuinely
    // Station-less file instead of this silently picking the wrong sheet.
    for (const name of wb.SheetNames) {
      const rows = sheetToRows(wb.Sheets[name]);
      if (rows.length && looksLikeStationHeader(rows[0])) return rows;
    }
    return sheetToRows(wb.Sheets[wb.SheetNames[0]]);
  }
  return parseCSV(await file.text());
}

function inferAssignmentSystem(stationName) {
  if (!stationName) return null;
  const prefix = stationName.trim().slice(0, 3).toUpperCase();
  if (['WAS', 'ALT', 'HAM', 'CMB'].includes(prefix)) return prefix;
  return null;
}

async function importAssignments() {
  const period = $('assignMonth').value; // 'YYYY-MM'
  const fileInput = $('assignFile');
  const summaryEl = $('assignImportSummary');
  if (!period) { toast('Pick the month this list applies to.', true); return; }
  if (!fileInput.files[0]) { toast('Choose a CSV or Excel file first.', true); return; }

  let rows;
  try {
    rows = await parseImportFile(fileInput.files[0]);
  } catch (e) {
    summaryEl.hidden = false;
    summaryEl.textContent = `Couldn't read that file (${e.message}). Make sure it's a CSV or a real Excel (.xlsx) file.`;
    return;
  }
  if (rows.length < 2) { toast('That file has no data rows.', true); return; }

  const header = rows[0].map((h) => h.trim().toLowerCase());
  const colIdx = (names) => names.map((n) => header.indexOf(n)).find((i) => i >= 0) ?? -1;
  const iStation = colIdx(['station', 'station name', 'stationid', 'station id']);
  const iSystem = colIdx(['system', 'group', 'area']);
  const iGear = colIdx(['gear']);
  const iQuad = colIdx(['quad', 'quadrant']);
  const iStatus = colIdx(['status']);
  const iLat = colIdx(['latitude', 'lat']);
  const iLon = colIdx(['longitude', 'lon', 'long']);

  if (iStation < 0) {
    summaryEl.hidden = false;
    summaryEl.textContent = `Couldn't find a "Station" column. Columns found: ${rows[0].join(', ')}`;
    return;
  }

  const imported = [];
  const unmatchedSystem = [];
  for (const r of rows.slice(1)) {
    const station = (r[iStation] || '').trim();
    if (!station) continue;
    let system = iSystem >= 0 ? (r[iSystem] || '').trim().toUpperCase() : null;
    if (!system || !STATION_LOOKUP_KEYS[system]) system = inferAssignmentSystem(station);
    if (!system) unmatchedSystem.push(station);
    imported.push({
      station, system,
      gear: iGear >= 0 ? r[iGear] : null,
      quad: iQuad >= 0 ? r[iQuad] : null,
      status: iStatus >= 0 ? r[iStatus] : null,
      lat: iLat >= 0 ? numOrNull(r[iLat]) : null,
      lon: iLon >= 0 ? numOrNull(r[iLon]) : null,
    });
  }

  await DB.put('stationAssignments', { period, importedAt: new Date().toISOString(), rows: imported });

  summaryEl.hidden = false;
  summaryEl.classList.remove('takeThisFish');
  summaryEl.textContent = `Imported ${imported.length} station(s) for ${period}.` +
    (unmatchedSystem.length ? ` ${unmatchedSystem.length} row(s) couldn't be matched to WAS/ALT/HAM/CMB (no System column and an unrecognized name prefix) — they were imported but won't appear in any system's filtered list: ${unmatchedSystem.slice(0, 8).join(', ')}${unmatchedSystem.length > 8 ? '…' : ''}` : '');

  fileInput.value = '';
  renderAssignmentsList();
  toast(`Station assignments for ${period} imported.`);
}

async function renderAssignmentsList() {
  const all = await DB.getAll('stationAssignments');
  all.sort((a, b) => (b.period > a.period ? 1 : -1));
  const el = $('assignmentsList');
  if (!all.length) {
    el.innerHTML = '<p class="muted">No station assignment lists imported yet — entry uses the full master station list until one is imported.</p>';
    return;
  }
  el.innerHTML = all.map((a) => `
    <div class="speciesGroup">
      <div class="speciesGroupHeader">
        <strong>${a.period}</strong>
        <span>${a.rows.length} station(s)</span>
        <span class="muted">imported ${relativeTime(a.importedAt)}</span>
        <button class="smallBtn delBtn" data-period="${a.period}" style="margin-left:auto">Delete this month's list</button>
      </div>
      <table class="dataTable">
        <thead><tr><th>Station</th><th>System</th><th>Gear</th><th>Quad</th><th>Status</th></tr></thead>
        <tbody>
          ${a.rows.map((r) => `<tr><td>${r.station}</td><td>${r.system ?? ''}</td><td>${r.gear ?? ''}</td><td>${r.quad ?? ''}</td><td>${r.status ?? ''}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>`).join('');

  el.querySelectorAll('.delBtn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (!confirm(`Delete the imported station assignment list for ${btn.dataset.period}? Entry for that month will fall back to the full master station list.`)) return;
      await DB.delete('stationAssignments', btn.dataset.period);
      renderAssignmentsList();
    });
  });
}

// Used by app.js's refreshStationList() to filter the Station datalist to
// the current collection's month, if a list has been imported for it.
async function getActiveAssignment(dateStr) {
  if (!dateStr) return null;
  const period = dateStr.slice(0, 7);
  return DB.get('stationAssignments', period);
}
