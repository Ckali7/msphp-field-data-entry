// Main app wiring. No framework, no build step, no network calls — plain
// DOM + IndexedDB so this keeps running exactly the same way years from now
// regardless of what Windows/Office does, and so it stays maintainable by
// whoever inherits it without needing a dev toolchain installed.

let currentCollectionNumber = null;
let currentSystem = 'WAS';

// Updates both the in-memory selection and the toggle buttons' visual state.
// Used on init, on manual clicks, and when a new collection defaults to
// whatever system was last used (see newCollection()).
function setSystemToggle(system) {
  currentSystem = system;
  document.querySelectorAll('#systemToggle .toggleBtn').forEach((b) => b.classList.toggle('active', b.dataset.system === system));
}

// ---------- screen size (phone/tablet/laptop) ----------
// Per Chris (2026-10): a single laptop-tuned layout doesn't fit a 6.3" phone
// screen. Auto mode (default) picks a tier from the window's actual width
// and re-picks live on resize/rotation — no setup needed on any device. The
// override (Table Data) exists only for the rare case Auto guesses wrong
// (unusual Windows display scaling, etc.); once set it stays fixed and
// stops reacting to the window, same as picking a fixed tier deliberately.
// CSS reacts entirely to the single `data-device-tier` attribute this sets
// on <html> — no separate @media breakpoints duplicating this logic.
let deviceTierOverride = 'auto';

function computeAutoDeviceTier() {
  const w = window.innerWidth;
  if (w <= 480) return 'phone';
  if (w <= 1024) return 'tablet';
  return 'laptop';
}

function applyDeviceTier() {
  const tier = deviceTierOverride === 'auto' ? computeAutoDeviceTier() : deviceTierOverride;
  document.documentElement.setAttribute('data-device-tier', tier);
}

function setDeviceTierOverride(value) {
  deviceTierOverride = value;
  document.querySelectorAll('#deviceTierToggle .toggleBtn').forEach((b) => b.classList.toggle('active', b.dataset.tier === value));
  applyDeviceTier();
}

// ---------- small helpers ----------

function $(id) { return document.getElementById(id); }

function toast(msg, isWarning) {
  const el = $('toast');
  el.textContent = msg;
  el.className = 'toast show' + (isWarning ? ' warn' : '');
  el.hidden = false;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { el.hidden = true; }, isWarning ? 5000 : 2200);
}

function fillSelect(select, options, { valueKey = 'code', labelKey = 'name', blank = true } = {}) {
  select.innerHTML = '';
  if (blank) select.appendChild(new Option('', ''));
  for (const opt of options) {
    select.appendChild(new Option(`${opt[labelKey]} (${opt[valueKey]})`, opt[valueKey]));
  }
}

function numOrNull(v) {
  if (v === '' || v === null || v === undefined) return null;
  const n = Number(v);
  return isNaN(n) ? null : n;
}

// ---------- static dropdown population ----------

function populateStaticDropdowns() {
  fillSelect($('f_ActivityCode'), LOOKUPS.activity, { blank: true });
  fillSelect($('f_SoundSystem'), LOOKUPS.soundSystem, { blank: true });
  fillSelect($('f_GearCode'), LOOKUPS.gear, { blank: true });
  fillSelect($('f_DirTide'), LOOKUPS.dirTide, { blank: true });
  fillSelect($('f_WeatherConditions'), LOOKUPS.weather, { blank: true });
  fillSelect($('f_WindDirection'), LOOKUPS.windDirection, { blank: true });
  fillSelect($('f_WindVelocity'), LOOKUPS.windVelocity, { blank: true });
  fillSelect($('f_TideStage'), LOOKUPS.tideStage, { blank: true });
  fillSelect($('f_MoonPhaseCode'), LOOKUPS.moonPhase, { blank: true });
  fillSelect($('statusGear'), LOOKUPS.gear, { blank: true });

  fillSelect($('f_VesselOp'), LOOKUPS.crew, { blank: true });
  fillSelect($('f_DataRec'), LOOKUPS.crew, { blank: true });
  fillSelect($('f_FishMeas'), LOOKUPS.crew, { blank: true });

  fillSelect($('mf_SexCode'), LOOKUPS.sex, { blank: true });
  fillSelect($('sf_SexCode'), LOOKUPS.sex, { blank: true });
  fillSelect($('sf_GonadStage'), LOOKUPS.gonadStage, { blank: true });
  fillSelect($('tf_TagType'), LOOKUPS.tagType, { blank: true });
  fillSelect($('tf_DispositionCode'), LOOKUPS.disposition, { blank: true });

  // Sorted alphabetically by common name (the source data is in SpeciesCode
  // order) purely so a 151-entry dropdown is easier to scan/jump through —
  // doesn't affect anything else, LOOKUPS.species itself stays untouched.
  const speciesSorted = [...LOOKUPS.species].sort((a, b) => a.common.localeCompare(b.common));
  fillSelect($('mf_SpeciesCode'), speciesSorted, { valueKey: 'code', labelKey: 'common' });
  fillSelect($('sf_SpeciesCode'), speciesSorted, { valueKey: 'code', labelKey: 'common' });
  fillSelect($('tf_SpeciesCode'), speciesSorted, { valueKey: 'code', labelKey: 'common' });
}

// Set by refreshStationList(), read by the Station field's one-time focus
// warning below — avoids a persistent on-screen hint that was throwing off
// row alignment; a pop-up warning only when it's actually missing is enough.
let stationListHasAssignment = true;
let stationHintShownForThisCollection = false;

// Populates the Station suggestion list. If a station-assignment list has
// been imported (Settings > Monthly Station Assignments) for the collection's
// current month, this narrows to just that month's assigned stations for the
// active system — falling back to the full master list if nothing's been
// imported yet for that month, so nobody gets locked out of entry.
async function refreshStationList() {
  const key = STATION_LOOKUP_KEYS[currentSystem];
  let list = LOOKUPS[key];

  const assignment = await getActiveAssignment($('f_Date').value);
  if (assignment) {
    const assignedNames = new Set(assignment.rows.filter((r) => r.system === currentSystem).map((r) => r.station));
    list = list.filter((s) => assignedNames.has(s.station));
    stationListHasAssignment = true;
  } else {
    stationListHasAssignment = false;
  }

  const select = $('f_Station');
  const previousValue = select.value;
  select.innerHTML = '';
  select.appendChild(new Option('', ''));
  for (const s of list) {
    select.appendChild(new Option(s.station, s.station));
  }
  // Never silently drop a station that's already selected/saved just
  // because a filter refresh no longer includes it (e.g. reviewing an
  // older record, or this month's assignment list changed) — keep it
  // choosable even if it now falls outside the "official" filtered list.
  if (previousValue && !list.some((s) => s.station === previousValue)) {
    select.appendChild(new Option(previousValue, previousValue));
  }
  select.value = previousValue;
}

// ---------- view / tab switching ----------

function showView(name) {
  $('viewList').hidden = name !== 'list';
  $('viewEntry').hidden = name !== 'entry';
  $('viewStatus').hidden = name !== 'status';
  $('viewSettings').hidden = name !== 'settings';
  if (name === 'list') { renderCollectionsList(); renderBackupBanner(); }
  if (name === 'status') { primeStationStatusDefaults(); renderStationStatus(); }
  if (name === 'settings') { showSettingsTab('crew'); }
}

function relativeTime(isoString) {
  const then = new Date(isoString);
  const mins = Math.round((Date.now() - then.getTime()) / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs === 1 ? '' : 's'} ago`;
  const days = Math.round(hrs / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
}

// Daily reminder: back up at the end of each field day. If nothing's changed
// since the last backup there's nothing new to lose, so it stays green no
// matter how long ago that was — but as soon as there's new data, it should
// nudge same-day, and get more insistent if a day (or several) gets missed.
const BACKUP_OVERDUE_DAYS = 2;

async function renderBackupBanner() {
  const { lastBackupAt, dirty } = await DB.getBackupStatus();
  const el = $('backupBanner');
  let cls, text;

  if (!lastBackupAt) {
    cls = 'never';
    text = 'This device has never been backed up. If it were lost, damaged, or wiped today, everything entered so far would be gone.';
  } else if (!dirty) {
    cls = 'ok';
    text = `Backed up ${relativeTime(lastBackupAt)}. Nothing new since — you're set for today.`;
  } else {
    const daysSince = Math.floor((Date.now() - new Date(lastBackupAt).getTime()) / 86400000);
    if (daysSince >= BACKUP_OVERDUE_DAYS) {
      cls = 'never';
      text = `Your last backup was ${relativeTime(lastBackupAt)}, with new data added since. Please back up soon.`;
    } else {
      cls = 'due';
      text = `New data since your last backup (${relativeTime(lastBackupAt)}). Back up before you head out today.`;
    }
  }
  el.className = 'backupBanner ' + cls;
  el.innerHTML = `<span>${text}</span><button class="bigBtn primary" id="btnBackupFromBanner">Backup Now</button>`;
  $('btnBackupFromBanner').addEventListener('click', async () => {
    await exportFullBackup();
    toast('Backup saved to Downloads.');
    renderBackupBanner();
  });
}

function showTab(name) {
  document.querySelectorAll('[data-tab]').forEach((b) => b.classList.toggle('active', b.dataset.tab === name));
  $('panelCollection').hidden = name !== 'collection';
  $('panelMeasured').hidden = name !== 'measured';
  $('panelSacrificed').hidden = name !== 'sacrificed';
  $('panelTagged').hidden = name !== 'tagged';
  // refresh on activation, not just on open — a brand-new collection only
  // gets a CollectionNumber once Activity+Date are set on the Collection
  // tab, so sub-tabs (e.g. Sacrificed's auto Sample #) need a refresh the
  // first time they're actually shown, not just when re-opening a saved one.
  if (name === 'measured') { refreshMeasured(); updateMeasuredFieldVisibility(numOrNull($('mf_SpeciesCode').value)); }
  if (name === 'sacrificed') refreshSacrificed();
  if (name === 'tagged') refreshTagged();
}

// ---------- Collections list ----------

async function renderCollectionsList() {
  const collections = await DB.getAll('collections');
  collections.sort((a, b) => (b.CollectionNumber > a.CollectionNumber ? 1 : -1));
  const tbody = $('collectionsTbody');
  tbody.innerHTML = '';

  const [allMeasured, allSacrificed, allTagged] = await Promise.all([
    DB.getAll('measuredFish'), DB.getAll('sacrificedFish'), DB.getAll('taggedFish'),
  ]);
  const countFor = (arr, cn) => arr.filter((r) => r.CollectionNumber === cn).length;

  for (const c of collections) {
    const tr = document.createElement('tr');
    const sound = LOOKUPS.soundSystem.find((s) => s.code === c.SoundSystem);
    const activity = LOOKUPS.activity.find((a) => a.code === c.ActivityCode);
    const hydroOk = hydroComplete(c);
    tr.innerHTML = `
      <td class="mono">${c.CollectionNumber}</td>
      <td>${c.Date || ''}</td>
      <td>${activity ? activity.name : c.ActivityCode ?? ''}</td>
      <td>${c.Station || ''}</td>
      <td>${sound ? sound.name : ''}</td>
      <td><span class="statusPill listHydroPill ${hydroOk ? 'ok' : 'missing'}">${hydroOk ? 'OK' : 'MISSING'}</span></td>
      <td>${countFor(allMeasured, c.CollectionNumber)}</td>
      <td>${countFor(allSacrificed, c.CollectionNumber)}</td>
      <td>${countFor(allTagged, c.CollectionNumber)}</td>
      <td><button class="smallBtn openBtn">Open</button></td>
    `;
    tr.querySelector('.openBtn').addEventListener('click', () => openCollection(c.CollectionNumber));
    tbody.appendChild(tr);
  }
  $('listSummary').textContent = `${collections.length} collection(s) stored on this device.`;
}

async function newCollection() {
  const today = new Date().toISOString().slice(0, 10);
  const collections = await DB.getAll('collections');
  let lastVesselOp = '', lastDataRec = '', lastFishMeas = '';
  if (collections.length) {
    collections.sort((a, b) => (b.CollectionNumber > a.CollectionNumber ? 1 : -1));
    lastVesselOp = collections[0].VesselOp || '';
    lastDataRec = collections[0].DataRec || '';
    lastFishMeas = collections[0].FishMeas || '';
  }
  currentCollectionNumber = null;
  stationHintShownForThisCollection = false;
  gearWasAutoSet = false;
  openMeasuredSpecies = null;
  showView('entry');
  showTab('collection');
  clearCollectionForm();
  $('f_Date').value = today;
  $('f_VesselOp').value = lastVesselOp;
  $('f_DataRec').value = lastDataRec;
  $('f_FishMeas').value = lastFishMeas;
  setSystemToggle(await DB.getMeta('lastStationSystem', 'WAS'));
  applyGearDefault(today);
  await refreshStationList();
  updateStatusPills();
}

function clearCollectionForm() {
  for (const id of ['f_ActivityCode','f_CollectionNumber','f_Date','f_Time','f_Time2','f_Station',
    'f_SoundSystem','f_Latitude','f_Longitude','f_Location','f_GearCode','f_DirTide',
    'f_VesselOp','f_DataRec','f_FishMeas','f_Comments','f_WeatherConditions','f_WindDirection',
    'f_WindVelocity','f_TideStage','f_MoonPhaseCode','f_Depth','f_Salinity','f_WaterTemp','f_DO']) {
    $(id).value = '';
  }
  $('f_SubSampleTool') && ($('f_SubSampleTool').checked = false);
}

async function openCollection(collectionNumber) {
  const c = await DB.get('collections', collectionNumber);
  if (!c) { toast('Collection not found', true); return; }
  currentCollectionNumber = collectionNumber;
  stationHintShownForThisCollection = false;
  gearWasAutoSet = false; // treat a saved record's Gear as a deliberate value, not something to silently re-default
  openMeasuredSpecies = null;
  showView('entry');
  showTab('collection');
  loadCollectionIntoForm(c);
  await refreshStationList();
  await refreshMeasured();
  await refreshSacrificed();
  await refreshTagged();
  updateTabCounts();
}

function loadCollectionIntoForm(c) {
  $('f_ActivityCode').value = c.ActivityCode ?? '';
  $('f_CollectionNumber').value = c.CollectionNumber ?? '';
  $('f_Date').value = c.Date ?? '';
  $('f_Time').value = c.Time ?? '';
  $('f_Time2').value = c.Time2 ?? '';
  $('f_Station').value = c.Station ?? '';
  $('f_SoundSystem').value = c.SoundSystem ?? '';
  $('f_Latitude').value = c.Latitude ?? '';
  $('f_Longitude').value = c.Longitude ?? '';
  $('f_Location').value = c.Location ?? '';
  $('f_GearCode').value = c.GearCode ?? '';
  $('f_DirTide').value = c.DirTide ?? '';
  $('f_VesselOp').value = c.VesselOp ?? '';
  $('f_DataRec').value = c.DataRec ?? '';
  $('f_FishMeas').value = c.FishMeas ?? '';
  $('f_Comments').value = c.Comments ?? '';
  $('f_WeatherConditions').value = c.WeatherConditions ?? '';
  $('f_WindDirection').value = c.WindDirection ?? '';
  $('f_WindVelocity').value = c.WindVelocity ?? '';
  $('f_TideStage').value = c.TideStage ?? '';
  $('f_MoonPhaseCode').value = c.MoonPhaseCode ?? '';
  $('f_Depth').value = c.Depth ?? '';
  $('f_Salinity').value = c.Salinity ?? '';
  $('f_WaterTemp').value = c.WaterTemp ?? '';
  $('f_DO').value = c.DO ?? '';
  $('f_SubSampleTool').checked = !!c.SubSampleToolOn;
  updateStatusPills();
}

function readCollectionForm() {
  return {
    CollectionNumber: currentCollectionNumber,
    ActivityCode: numOrNull($('f_ActivityCode').value),
    Date: $('f_Date').value || null,
    Time: $('f_Time').value || null,
    Time2: $('f_Time2').value || null,
    Station: $('f_Station').value || null,
    SoundSystem: numOrNull($('f_SoundSystem').value),
    Latitude: numOrNull($('f_Latitude').value),
    Longitude: numOrNull($('f_Longitude').value),
    Location: $('f_Location').value || null,
    GearCode: numOrNull($('f_GearCode').value),
    HookNumber: null, // field removed from this app's UI — was a carryover from a different project; kept in the schema for Access-import compatibility
    DirTide: numOrNull($('f_DirTide').value),
    VesselOp: $('f_VesselOp').value || null,
    DataRec: $('f_DataRec').value || null,
    FishMeas: $('f_FishMeas').value || null,
    Comments: $('f_Comments').value || null,
    WeatherConditions: numOrNull($('f_WeatherConditions').value),
    WindDirection: $('f_WindDirection').value || null,
    WindVelocity: numOrNull($('f_WindVelocity').value),
    TideStage: $('f_TideStage').value || null,
    MoonPhaseCode: numOrNull($('f_MoonPhaseCode').value),
    Depth: numOrNull($('f_Depth').value),
    Salinity: numOrNull($('f_Salinity').value),
    WaterTemp: numOrNull($('f_WaterTemp').value),
    DO: numOrNull($('f_DO').value),
    Proofed: false,
    Latitude2: null,
    Longitude2: null,
    VesselSOG: null,
    DataSent: false,
    SubSampleToolOn: $('f_SubSampleTool').checked,
  };
}

// True only between a keystroke/edit on the Collection tab and that field's
// next 'change' (save). Used by beforeunload below — deliberately NOT based
// on which field currently has focus, since a field stays focused after
// being saved too (e.g. right after picking a date) and that's not "unsaved."
let collectionFieldDirty = false;

// True only while the current Gear value was set BY the month-based default,
// not chosen by a person — so a later Date change can keep it in sync, but
// a real user selection (its own 'change' event, wired below) locks it in
// and stops further auto-updates from overwriting that choice.
let gearWasAutoSet = false;

// Only called when it's known to be safe to touch the field (see the two
// call sites' guards) — so on a month with no rule, this clears a
// previously auto-set value back to blank rather than leaving a stale
// value from whatever month it last defaulted from.
function applyGearDefault(dateStr) {
  const def = defaultGearForMonth(dateStr);
  $('f_GearCode').value = def != null ? def : '';
  gearWasAutoSet = def != null;
}

async function saveCollectionForm() {
  const activityCode = numOrNull($('f_ActivityCode').value);
  const dateStr = $('f_Date').value;

  if (!currentCollectionNumber && activityCode != null && dateStr) {
    const existing = (await DB.getAll('collections')).map((c) => c.CollectionNumber);
    currentCollectionNumber = generateCollectionNumber(activityCode, dateStr, existing);
    $('f_CollectionNumber').value = currentCollectionNumber;
    toast(`Collection # assigned: ${currentCollectionNumber}`);
  } else if (currentCollectionNumber && activityCode != null && dateStr) {
    await handleCollectionNumberMismatch(activityCode, dateStr);
  }
  if (!currentCollectionNumber) return; // not enough info yet to create the record — nothing saved yet, stays dirty

  const record = readCollectionForm();
  await DB.put('collections', record);
  collectionFieldDirty = false;
  updateStatusPills();
}

// Collection # is built from Activity+Date at the moment it's first
// assigned and never touched again after that — so correcting Activity or
// Date later used to leave a Collection # with the wrong digits baked in,
// silently (per Chris, 2026-09). This checks for that mismatch on every
// save and, when it's safe (no fish entered yet), quietly renumbers to
// match. When fish already exist under the old number, renumbering would
// orphan them (they're linked by that exact number), so instead this shows
// a banner with two explicit choices — nothing destructive happens without
// a deliberate click on one of them.
function expectedCollectionNumberPrefix(activityCode, dateStr) {
  const [yyyy, mm, dd] = dateStr.split('-');
  const yy = yyyy.slice(2);
  return `${activityCode}${yy}${mm}${dd}`;
}

async function handleCollectionNumberMismatch(activityCode, dateStr) {
  const expectedPrefix = expectedCollectionNumberPrefix(activityCode, dateStr);
  if (currentCollectionNumber.startsWith(expectedPrefix)) {
    $('cnMismatchBanner').hidden = true;
    return;
  }

  const [measured, sacrificed, tagged] = await Promise.all([
    DB.getAllByIndex('measuredFish', 'byCollection', currentCollectionNumber),
    DB.getAllByIndex('sacrificedFish', 'byCollection', currentCollectionNumber),
    DB.getAllByIndex('taggedFish', 'byCollection', currentCollectionNumber),
  ]);
  const fishCount = measured.length + sacrificed.length + tagged.length;

  if (fishCount === 0) {
    const existing = (await DB.getAll('collections')).map((c) => c.CollectionNumber).filter((n) => n !== currentCollectionNumber);
    const newNumber = generateCollectionNumber(activityCode, dateStr, existing);
    await DB.delete('collections', currentCollectionNumber);
    currentCollectionNumber = newNumber;
    $('f_CollectionNumber').value = newNumber;
    $('cnMismatchBanner').hidden = true;
    toast(`Collection # updated to ${newNumber} to match the corrected Activity/Date.`);
    return;
  }

  const banner = $('cnMismatchBanner');
  banner.hidden = false;
  banner.innerHTML = `
    <div>Collection # ${currentCollectionNumber} no longer matches the current Activity/Date, and ${fishCount}
      fish record(s) are already entered under it — it won't auto-update and orphan them. Choose one:</div>
    <div class="cnMismatchActions">
      <button class="smallBtn" id="btnMigrateCN">Update Collection # (keep the ${fishCount} fish)</button>
      <button class="smallBtn" id="btnDeleteForMismatch">Delete This Collection &amp; Start Over</button>
    </div>
  `;
  $('btnMigrateCN').addEventListener('click', () => migrateCollectionNumber(activityCode, dateStr));
  $('btnDeleteForMismatch').addEventListener('click', () => deleteCurrentCollection());
}

// Renumbers the collection AND every fish record under it to the corrected
// Collection #, keeping all the data. sacrificedFish uses a compound key
// derived from [CollectionNumber, SampleNumber], so changing CollectionNumber
// on those requires deleting the old key explicitly — a plain put() with a
// mutated in-line key creates a second entry rather than moving the first.
async function migrateCollectionNumber(activityCode, dateStr) {
  const oldNumber = currentCollectionNumber;
  const existing = (await DB.getAll('collections')).map((c) => c.CollectionNumber).filter((n) => n !== oldNumber);
  const newNumber = generateCollectionNumber(activityCode, dateStr, existing);

  const [measured, sacrificed, tagged] = await Promise.all([
    DB.getAllByIndex('measuredFish', 'byCollection', oldNumber),
    DB.getAllByIndex('sacrificedFish', 'byCollection', oldNumber),
    DB.getAllByIndex('taggedFish', 'byCollection', oldNumber),
  ]);

  for (const r of measured) {
    r.CollectionNumber = newNumber;
    await DB.put('measuredFish', r);
  }
  for (const r of tagged) {
    r.CollectionNumber = newNumber;
    await DB.put('taggedFish', r);
  }
  for (const r of sacrificed) {
    await DB.delete('sacrificedFish', [oldNumber, r.SampleNumber]);
    r.CollectionNumber = newNumber;
    r.ID = `${newNumber}-${String(r.SampleNumber).padStart(4, '0')}`;
    await DB.put('sacrificedFish', r);
  }

  const collectionRecord = await DB.get('collections', oldNumber);
  collectionRecord.CollectionNumber = newNumber;
  await DB.put('collections', collectionRecord);
  await DB.delete('collections', oldNumber);

  currentCollectionNumber = newNumber;
  $('f_CollectionNumber').value = newNumber;
  $('cnMismatchBanner').hidden = true;
  await refreshMeasured();
  await refreshSacrificed();
  await refreshTagged();
  updateTabCounts();
  toast(`Migrated to Collection # ${newNumber} — ${measured.length + sacrificed.length + tagged.length} fish record(s) updated.`);
}

function updateStatusPills() {
  const c = readCollectionForm();
  const lgc = gearCollectionComplete(c);
  const hydro = hydroComplete(c);
  const lgcEl = $('statusLGC');
  lgcEl.textContent = lgc ? 'COMPLETE' : 'MISSING';
  lgcEl.className = 'statusPill ' + (lgc ? 'ok' : 'missing');
  const hydroEl = $('statusHydro');
  hydroEl.textContent = hydro ? 'COMPLETE' : 'MISSING';
  hydroEl.className = 'statusPill ' + (hydro ? 'ok' : 'missing');
  updateFishEntryGating(collectionMetadataComplete(c));
}

// Per Chris (2026-09): fish data can't be entered against a collection until
// its metadata (Location/Gear AND Hydrographic, both status pills) is fully
// complete — not just once a Collection Number exists. Disables each fish
// tab's entry row (not the already-entered list/Delete buttons — those stay
// usable) and shows why.
const GATED_ENTRY_ROWS = [
  ['measuredGateBanner', 'measuredEntryRow'],
  ['sacrificedGateBanner', 'sacrificedEntryRow'],
  ['taggedGateBanner', 'taggedEntryRow'],
];
const GATE_MESSAGE = "Collection metadata isn't complete yet — finish the Location/Gear and Hydrographic sections on the Collection tab before entering fish data.";

function updateFishEntryGating(complete) {
  for (const [bannerId, rowId] of GATED_ENTRY_ROWS) {
    $(bannerId).hidden = complete;
    $(bannerId).textContent = GATE_MESSAGE;
    const row = $(rowId);
    row.classList.toggle('gated', !complete);
    row.querySelectorAll('input, select, textarea, button').forEach((el) => { el.disabled = !complete; });
  }
  // The jump-to boxes at the bottom of the Collection tab show the same
  // locked look, so it's visible before even switching tabs — clicking
  // still navigates (existing fish data stays reviewable), it just won't
  // let you add anything new until that same check passes on the tab itself.
  document.querySelectorAll('.tabJumpBox').forEach((b) => b.classList.toggle('gated', !complete));
}

async function deleteCurrentCollection() {
  if (!currentCollectionNumber) { showView('list'); return; }
  const [measured, sacrificed, tagged] = await Promise.all([
    DB.getAllByIndex('measuredFish', 'byCollection', currentCollectionNumber),
    DB.getAllByIndex('sacrificedFish', 'byCollection', currentCollectionNumber),
    DB.getAllByIndex('taggedFish', 'byCollection', currentCollectionNumber),
  ]);
  const msg = `Delete collection ${currentCollectionNumber} and everything in it?\n\n` +
    `  ${measured.length} measured fish record(s)\n` +
    `  ${sacrificed.length} sacrificed sample(s)\n` +
    `  ${tagged.length} tagged fish record(s)\n\n` +
    `This cannot be undone.`;
  if (!confirm(msg)) return;
  for (const r of measured) await DB.delete('measuredFish', r.RecordNumber);
  for (const r of sacrificed) await DB.delete('sacrificedFish', [r.CollectionNumber, r.SampleNumber]);
  for (const r of tagged) await DB.delete('taggedFish', r.RecordNumber);
  await DB.delete('collections', currentCollectionNumber);
  currentCollectionNumber = null;
  showView('list');
}

// ---------- Station / SoundSystem auto-fill ----------

async function onStationChanged() {
  const stationName = $('f_Station').value.trim();
  if (!stationName) return;

  // Latitude/Longitude/SoundSystem are deterministically derived FROM the
  // Station — unlike Gear or Data Rec. (soft defaults, meant to sometimes
  // diverge), there's no legitimate reason a specific station's position
  // should differ once you've picked it, so this always syncs to match the
  // newly-picked station rather than only filling blank fields (per Chris,
  // 2026-09 — the old "only if blank" version left stale values from
  // whichever station was picked first if you changed your mind).
  const inferred = inferSoundSystemFromStation(stationName);
  if (inferred != null) $('f_SoundSystem').value = inferred;

  const st = lookupStation(currentSystem, stationName);
  if (st) {
    if (st.lat != null) $('f_Latitude').value = st.lat;
    if (st.lon != null) $('f_Longitude').value = st.lon;
  }

  const assignment = await getActiveAssignment($('f_Date').value);
  if (assignment) {
    const isAssigned = assignment.rows.some((r) => r.system === currentSystem && r.station === stationName);
    if (!isAssigned) {
      toast(`"${stationName}" is not on the ${assignment.period} assignment list for ${currentSystem} — double check this is the right station.`, true);
    }
  }

  updateStatusPills();
}

// ---------- Measured Fish ----------

// Per Chris (2026-09/10): most species are recorded as FL only in practice;
// a handful get TL and/or Sex too. SPECIES_EXTRA_FIELDS (js/speciesFields.js)
// is derived three ways — see tools/regenerate_species_fields.py for the
// full rule: (1) a name-based category override (Shark -> TL+Sex, Crab/Ray
// -> Sex) that applies regardless of how much historical data that exact
// species has, (2) ~116,000 real historical measurements for everything
// else with enough data to trust a percentage, (3) defaulting to showing
// TL+Sex (not hiding them) for anything left with no category match and no
// real data — an unneeded field costs a glance, a hidden needed one blocks
// entry outright. Every one of the app's species gets an explicit entry in
// that file; the `|| DEFAULT` below is only a defensive fallback for a
// species added via Settings since the file was last regenerated.
//
// FL, Sex-select, Comments, and Taken stay visible for every species; only
// TL is conditional on species. SL and Weight are excluded from this
// species-driven system entirely (not just deprioritized) — per Chris,
// 2026-09/10, SL appears on 3 of 115,751 historical records (0.003%, and
// even those read like stray mis-entries) and Weight isn't collected
// boat-side at all; both are available via the "+ SL / Wt" manual reveal
// button below instead (setMfRareFieldsShown()), independent of species.
const MEASURED_SPECIES_DEFAULT_FIELDS = ['TL', 'Sex'];

function updateMeasuredFieldVisibility(code) {
  const extra = (code != null && SPECIES_EXTRA_FIELDS[code]) || MEASURED_SPECIES_DEFAULT_FIELDS;
  for (const [field, inputId, wrapperId] of [
    ['TL', 'mf_TL', 'mf_TL_field'],
    ['Sex', 'mf_SexCode', 'mf_Sex_field'],
  ]) {
    const show = extra.includes(field);
    $(wrapperId).hidden = !show;
    if (!show) $(inputId).value = '';
  }
}

// The manual "+ SL / Wt" reveal, independent of species — per Chris
// (2026-09/10): in 24 years neither field has been needed in the field, so
// they shouldn't clutter the default layout, but an escape hatch is safer
// than removing the capability outright. Stays revealed across fish/species
// (not just one add-cycle) once turned on, since the rare case that needs
// it once likely needs it again soon after.
let mfRareFieldsShown = false;
function setMfRareFieldsShown(shown) {
  mfRareFieldsShown = shown;
  $('mf_SL_field').hidden = !shown;
  $('mf_TotalWeight_field').hidden = !shown;
  $('btnToggleRareFields').textContent = shown ? '− SL / Wt' : '+ SL / Wt';
  if (!shown) { $('mf_SL').value = ''; $('mf_TotalWeight').value = ''; }
}

// Per Chris (2026-10): for a species needing more than just FL, Enter used
// to submit the fish right after FL — easy to do by habit and not notice
// until later that TL/Sex got silently skipped for a species that needed
// them. Enter now walks Species -> FL -> TL -> SL -> Sex -> Wt, skipping
// whichever of those aren't currently shown for this species (TL/Sex are
// species-driven; SL/Wt only appear at all if the "+ SL / Wt" reveal is on)
// — only submitting once Enter is pressed from the last field actually
// visible in that list. For an FL-only species that's still just FL, so
// behavior there is unchanged: FL -> Enter -> next fish.
const MEASURED_ENTRY_SEQUENCE = [
  { id: 'mf_SpeciesCode' },
  { id: 'mf_FL' },
  { id: 'mf_TL', wrapperId: 'mf_TL_field' },
  { id: 'mf_SL', wrapperId: 'mf_SL_field' },
  { id: 'mf_SexCode', wrapperId: 'mf_Sex_field' },
  { id: 'mf_TotalWeight', wrapperId: 'mf_TotalWeight_field' },
];

function visibleMeasuredEntryFieldIds() {
  return MEASURED_ENTRY_SEQUENCE
    .filter((f) => !f.wrapperId || !$(f.wrapperId).hidden)
    .map((f) => f.id);
}

async function refreshMeasured() {
  if (!currentCollectionNumber) { $('measuredGroups').innerHTML = ''; return; }
  const rows = await DB.getAllByIndex('measuredFish', 'byCollection', currentCollectionNumber);
  renderMeasuredGroups(rows);
}

// Which species' detail table is currently expanded (null = none) — per
// Chris (2026-09): a wall of per-species tables got overwhelming as a
// collection fills up, so this shows one summary row per species with an
// Open button, and only the currently-opened species' individual records
// below it. Reset whenever a different collection is opened/created (see
// newCollection()/openCollection()) since it's not meaningful across records.
let openMeasuredSpecies = null;

function renderMeasuredGroups(rows) {
  const container = $('measuredGroups');
  container.innerHTML = '';
  const bySpecies = new Map();
  for (const r of rows) {
    if (!bySpecies.has(r.SpeciesCode)) bySpecies.set(r.SpeciesCode, []);
    bySpecies.get(r.SpeciesCode).push(r);
  }

  if (openMeasuredSpecies != null && !bySpecies.has(openMeasuredSpecies)) {
    openMeasuredSpecies = null; // its last row got deleted
  }

  if (bySpecies.size === 0) return;

  const summaryTable = document.createElement('table');
  summaryTable.className = 'dataTable';
  summaryTable.innerHTML = `
    <thead><tr><th>Species</th><th>Measured</th><th>Total Count</th><th></th></tr></thead>
    <tbody>
      ${[...bySpecies.entries()].map(([code, group]) => {
        const sp = LOOKUPS.species.find((s) => s.code === code);
        const canAdjust = !LOOKUPS.doNotAdd.includes(code);
        const totalCount = group[0].TotalCount ?? group.length;
        const isOpen = openMeasuredSpecies === code;
        return `
          <tr class="${isOpen ? 'openRow' : ''}">
            <td><strong>${sp ? sp.common : code}</strong></td>
            <td>${group.length}</td>
            <td>${canAdjust
                ? `<input type="number" class="totalCountInput" value="${totalCount}" data-species="${code}" />`
                : `<b>${totalCount}</b>`}
            </td>
            <td><button class="smallBtn openSpeciesBtn" data-species="${code}">${isOpen ? 'Close' : 'Open'}</button></td>
          </tr>`;
      }).join('')}
    </tbody>
  `;
  container.appendChild(summaryTable);

  summaryTable.querySelectorAll('.openSpeciesBtn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const code = Number(btn.dataset.species);
      openMeasuredSpecies = openMeasuredSpecies === code ? null : code;
      renderMeasuredGroups(rows);
    });
  });
  summaryTable.querySelectorAll('.totalCountInput').forEach((inp) => {
    inp.addEventListener('change', async () => {
      const code = Number(inp.dataset.species);
      const newVal = numOrNull(inp.value);
      if (newVal == null) return;
      if (!confirm(`Set TOTAL COUNT for this species to ${newVal} across all its measured rows in this collection?`)) {
        await refreshMeasured();
        return;
      }
      const group = bySpecies.get(code);
      for (const r of group) {
        r.TotalCount = newVal;
        await DB.put('measuredFish', r);
      }
      await refreshMeasured();
    });
  });

  if (openMeasuredSpecies == null) return;

  const group = bySpecies.get(openMeasuredSpecies);
  const sp = LOOKUPS.species.find((s) => s.code === openMeasuredSpecies);

  // SL/Wt columns only appear when a row actually has one (per Chris,
  // 2026-09/10 — both are rare-use-only, behind the "+ SL / Wt" reveal
  // button, so a permanent always-blank column would just be clutter).
  const hasSL = group.some((r) => r.SL != null);
  const hasWt = group.some((r) => r.TotalWeight != null);
  const columns = [
    { th: 'TL', td: (r) => r.TL ?? '' },
    { th: 'FL', td: (r) => r.FL ?? '' },
    ...(hasSL ? [{ th: 'SL', td: (r) => r.SL ?? '' }] : []),
    { th: 'Sex', td: (r) => (LOOKUPS.sex.find((s) => s.code === r.SexCode) || {}).name ?? '' },
    ...(hasWt ? [{ th: 'Wt', td: (r) => r.TotalWeight ?? '' }] : []),
    { th: 'Taken', td: (r) => (r.FishTaken ? 'Y' : '') },
    { th: 'Total Count', td: (r) => r.TotalCount ?? '', cls: 'bold' },
    { th: 'Comments', td: (r) => r.Comments ?? '' },
  ];

  const detail = document.createElement('div');
  detail.className = 'speciesGroup';
  detail.innerHTML = `
    <div class="speciesGroupHeader">
      <strong>${sp ? sp.common : openMeasuredSpecies} — individual measurements</strong>
      <button class="smallBtn closeDetailBtn" style="margin-left:auto">Close</button>
    </div>
    <table class="dataTable">
      <thead><tr>${columns.map((c) => `<th>${c.th}</th>`).join('')}<th></th></tr></thead>
      <tbody>
        ${group.map((r) => `
          <tr data-id="${r.RecordNumber}">
            ${columns.map((c) => `<td class="${c.cls || ''}">${c.td(r)}</td>`).join('')}
            <td><button class="smallBtn delBtn" data-store="measuredFish" data-key="${r.RecordNumber}">Del</button></td>
          </tr>`).join('')}
      </tbody>
    </table>
  `;
  container.appendChild(detail);

  detail.querySelector('.closeDetailBtn').addEventListener('click', () => {
    openMeasuredSpecies = null;
    renderMeasuredGroups(rows);
  });
  detail.querySelectorAll('.delBtn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const key = Number(btn.dataset.key);
      const r = rows.find((row) => row.RecordNumber === key);
      const sp2 = r ? LOOKUPS.species.find((s) => s.code === r.SpeciesCode) : null;
      const lengths = r ? [r.TL && `TL ${r.TL}`, r.FL && `FL ${r.FL}`, r.SL && `SL ${r.SL}`].filter(Boolean).join(', ') : '';
      const desc = r ? `${sp2 ? sp2.common : r.SpeciesCode}${lengths ? ' — ' + lengths : ''}` : 'this fish';
      if (!confirm(`Delete this measured fish record?\n\n${desc}\n\nThis cannot be undone.`)) return;
      await DB.delete(btn.dataset.store, key);
      await refreshMeasured();
      updateTabCounts();
    });
  });
}

async function addMeasuredFish() {
  if (!currentCollectionNumber) { toast('Set the Activity and Date on the Collection tab first.', true); return; }
  if (!collectionMetadataComplete(readCollectionForm())) {
    toast('Finish the Collection tab (Location/Gear and Hydrographic sections) before entering fish data.', true);
    return;
  }
  const speciesCode = numOrNull($('mf_SpeciesCode').value);
  if (speciesCode == null) { toast('Species is required', true); return; }

  const TL = numOrNull($('mf_TL').value);
  const FL = numOrNull($('mf_FL').value);
  const SL = numOrNull($('mf_SL').value);
  if (TL == null && FL == null && SL == null) {
    toast('At least one length (TL, FL, or SL) is required — no blank rows.', true);
    return;
  }

  const TotalWeight = numOrNull($('mf_TotalWeight').value); // usually blank — see the "+ SL / Wt" reveal button
  const soundSystem = numOrNull($('f_SoundSystem').value);

  const warnings = checkMeasurement(speciesCode, soundSystem, { FL, SL, TotalWeight });

  const existingRows = await DB.getAllByIndex('measuredFish', 'byCollection', currentCollectionNumber);
  let fishTaken = $('mf_FishTaken').checked;
  let subsampleNote = null;
  if ($('f_SubSampleTool').checked && FL != null) {
    const sub = checkSubsample(existingRows, speciesCode, FL);
    if (sub.take) {
      fishTaken = true;
      subsampleNote = `TAKE THIS FISH — bin ${sub.bin * 10}-${sub.bin * 10 + 9}mm needs more samples (${sub.countInBin}/${sub.target} so far).`;
    }
  }

  const record = {
    CollectionNumber: currentCollectionNumber,
    SpeciesCode: speciesCode,
    TagType: null,
    DispositionCode: null,
    TL, FL, SL, TotalWeight,
    SexCode: numOrNull($('mf_SexCode').value),
    TotalCount: 1,
    FishTaken: fishTaken,
    Comments: $('mf_Comments').value || null,
    ModalGroup: null,
    FishMeas: $('f_FishMeas').value || null,
  };
  await DB.put('measuredFish', record);

  // sync TotalCount across this species' rows in this collection (mirrors original behavior)
  const updated = await DB.getAllByIndex('measuredFish', 'byCollection', currentCollectionNumber);
  const sameSpecies = updated.filter((r) => r.SpeciesCode === speciesCode);
  for (const r of sameSpecies) {
    r.TotalCount = sameSpecies.length;
    await DB.put('measuredFish', r);
  }

  const reminder = checkMeasuredReminder(sameSpecies.length, speciesCode);

  for (const id of ['mf_TL','mf_FL','mf_SL','mf_TotalWeight','mf_Comments']) $(id).value = '';
  $('mf_FishTaken').checked = false;
  // Species is left as-is (not cleared) for rapid same-species entry, so per
  // Chris (2026-09) focus goes straight to FL rather than back to Species —
  // select species once, then it's length -> Enter -> length -> Enter... for
  // the rest of that species' fish.
  $('mf_FL').focus();
  $('mfCurrentTotal').textContent = `Current total for this species: ${sameSpecies.length}`;

  const warnBox = $('measuredWarnings');
  const allMsgs = [...warnings];
  if (subsampleNote) allMsgs.unshift(subsampleNote);
  if (reminder) allMsgs.push(reminder);
  if (allMsgs.length) {
    warnBox.hidden = false;
    warnBox.innerHTML = allMsgs.map((m) => `<div>${m}</div>`).join('');
    if (subsampleNote) { warnBox.classList.add('takeThisFish'); try { new AudioContext(); } catch (e) {} }
    else warnBox.classList.remove('takeThisFish');
  } else {
    warnBox.hidden = true;
  }

  await refreshMeasured();
  updateTabCounts();
}

// ---------- Sacrificed Fish ----------

async function refreshSacrificed() {
  if (!currentCollectionNumber) { $('sacrificedTbody').innerHTML = ''; return; }
  const rows = await DB.getAllByIndex('sacrificedFish', 'byCollection', currentCollectionNumber);
  rows.sort((a, b) => a.SampleNumber - b.SampleNumber);
  const tbody = $('sacrificedTbody');
  tbody.innerHTML = rows.map((r) => {
    const sp = LOOKUPS.species.find((s) => s.code === r.SpeciesCode);
    return `<tr>
      <td class="mono">${r.ID}</td>
      <td>${sp ? sp.common : r.SpeciesCode}</td>
      <td>${r.TL ?? ''}</td><td>${r.FL ?? ''}</td><td>${r.SL ?? ''}</td><td>${r.TotalWeight ?? ''}</td>
      <td>${(LOOKUPS.sex.find((s) => s.code === r.SexCode) || {}).name ?? ''}</td>
      <td>${r.GonadsTaken ? 'Y' : ''}</td><td>${r.OtolithTaken ? 'Y' : ''}</td>
      <td>${r.Comments ?? ''}</td>
      <td>
        <button class="smallBtn printBtn" data-cn="${r.CollectionNumber}" data-sn="${r.SampleNumber}">Label</button>
        <button class="smallBtn delBtn" data-cn="${r.CollectionNumber}" data-sn="${r.SampleNumber}">Del</button>
      </td>
    </tr>`;
  }).join('');

  tbody.querySelectorAll('.delBtn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const sn = Number(btn.dataset.sn);
      const r = rows.find((row) => row.SampleNumber === sn);
      const sp = r ? LOOKUPS.species.find((s) => s.code === r.SpeciesCode) : null;
      const desc = r ? `Sample ${r.ID} — ${sp ? sp.common : r.SpeciesCode}` : 'this sample';
      if (!confirm(`Delete this sacrificed-fish sample?\n\n${desc}\n\nThis cannot be undone.`)) return;
      await DB.delete('sacrificedFish', [btn.dataset.cn, sn]);
      await refreshSacrificed();
      updateTabCounts();
    });
  });
  tbody.querySelectorAll('.printBtn').forEach((btn) => {
    btn.addEventListener('click', () => printSampleLabel(btn.dataset.cn, Number(btn.dataset.sn)));
  });

  $('sf_SampleNumber').value = rows.length ? Math.max(...rows.map((r) => r.SampleNumber)) + 1 : 1;
}

async function addSacrificedFish() {
  if (!currentCollectionNumber) { toast('Set the Activity and Date on the Collection tab first.', true); return; }
  if (!collectionMetadataComplete(readCollectionForm())) {
    toast('Finish the Collection tab (Location/Gear and Hydrographic sections) before entering fish data.', true);
    return;
  }
  const speciesCode = numOrNull($('sf_SpeciesCode').value);
  if (speciesCode == null) { toast('Species is required', true); return; }
  const sampleNumber = numOrNull($('sf_SampleNumber').value);
  if (sampleNumber == null) { toast('Sample # required', true); return; }

  const FL = numOrNull($('sf_FL').value);
  const SL = numOrNull($('sf_SL').value);
  const TotalWeight = numOrNull($('sf_TotalWeight').value);
  const soundSystem = numOrNull($('f_SoundSystem').value);
  const warnings = checkMeasurement(speciesCode, soundSystem, { FL, SL, TotalWeight });

  const id = `${currentCollectionNumber}-${String(sampleNumber).padStart(4, '0')}`;
  const record = {
    CollectionNumber: currentCollectionNumber,
    SampleNumber: sampleNumber,
    ID: id,
    SpeciesCode: speciesCode,
    TagType: null,
    TL: numOrNull($('sf_TL').value),
    FL, SL, TotalWeight,
    SexCode: numOrNull($('sf_SexCode').value),
    GonadStage: numOrNull($('sf_GonadStage').value),
    GonadWeight: numOrNull($('sf_GonadWeight').value),
    GonadsTaken: $('sf_GonadsTaken').checked,
    OtolithTaken: $('sf_OtolithTaken').checked,
    Comments: $('sf_Comments').value || null,
  };
  await DB.put('sacrificedFish', record);

  for (const id2 of ['sf_TL','sf_FL','sf_SL','sf_TotalWeight','sf_GonadWeight','sf_Comments']) $(id2).value = '';
  $('sf_GonadsTaken').checked = false;
  $('sf_OtolithTaken').checked = false;
  $('sf_SpeciesCode').focus();

  const warnBox = $('sacrificedWarnings');
  if (warnings.length) { warnBox.hidden = false; warnBox.innerHTML = warnings.map((m) => `<div>${m}</div>`).join(''); }
  else warnBox.hidden = true;

  await refreshSacrificed();
  updateTabCounts();
}

const SPECIES_LABEL_CODES = { 1: 'CN', 2: 'CR', 3: 'SO', 4: 'PL', 5: 'PD', 6: 'PC', 7: 'AP', 8: 'MU', 10: 'MA', 86: 'LS' };

async function printSampleLabel(cn, sn) {
  const r = await DB.get('sacrificedFish', [cn, sn]);
  if (!r) return;
  const sp = LOOKUPS.species.find((s) => s.code === r.SpeciesCode);
  const speciesCode3 = SPECIES_LABEL_CODES[r.SpeciesCode] || (sp ? sp.letter.slice(0, 2).toUpperCase() : '??');
  const area = $('labelPrintArea');
  area.innerHTML = `
    <div class="labelSlip">
      <div class="labelBig">${cn}</div>
      <div class="labelBig">SAMPLE ${sn}</div>
      <div class="labelBig">${speciesCode3}</div>
      <div>${r.ID}</div>
    </div>`;
  area.hidden = false;
  window.print();
  area.hidden = true;
}

// ---------- Tagged Fish ----------

async function refreshTagged() {
  if (!currentCollectionNumber) { $('taggedTbody').innerHTML = ''; return; }
  const rows = await DB.getAllByIndex('taggedFish', 'byCollection', currentCollectionNumber);
  const tbody = $('taggedTbody');
  tbody.innerHTML = rows.map((r) => {
    const sp = LOOKUPS.species.find((s) => s.code === r.SpeciesCode);
    const tagType = LOOKUPS.tagType.find((t) => t.code === r.TagType);
    const disp = LOOKUPS.disposition.find((d) => d.code === r.DispositionCode);
    return `<tr>
      <td class="mono">${r.PrimaryID ?? ''}</td><td>${r.TagNumber ?? ''}</td><td>${r.TagNumber2 ?? ''}</td>
      <td>${sp ? sp.common : r.SpeciesCode}</td><td>${tagType ? tagType.name : ''}</td><td>${disp ? disp.name : ''}</td>
      <td>${r.TL ?? ''}</td><td>${r.FL ?? ''}</td><td>${r.SL ?? ''}</td><td>${r.Comments ?? ''}</td>
      <td><button class="smallBtn delBtn" data-key="${r.RecordNumber}">Del</button></td>
    </tr>`;
  }).join('');
  tbody.querySelectorAll('.delBtn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const key = Number(btn.dataset.key);
      const r = rows.find((row) => row.RecordNumber === key);
      const sp = r ? LOOKUPS.species.find((s) => s.code === r.SpeciesCode) : null;
      const desc = r ? `${sp ? sp.common : r.SpeciesCode} — Tag ${r.TagNumber || r.PrimaryID || '(no tag number)'}` : 'this tag record';
      if (!confirm(`Delete this tagged-fish record?\n\n${desc}\n\nThis cannot be undone.`)) return;
      await DB.delete('taggedFish', key);
      await refreshTagged();
      updateTabCounts();
    });
  });
}

async function addTaggedFish() {
  if (!currentCollectionNumber) { toast('Set the Activity and Date on the Collection tab first.', true); return; }
  if (!collectionMetadataComplete(readCollectionForm())) {
    toast('Finish the Collection tab (Location/Gear and Hydrographic sections) before entering fish data.', true);
    return;
  }
  const speciesCode = numOrNull($('tf_SpeciesCode').value);
  if (speciesCode == null) { toast('Species is required', true); return; }
  const tagNumber = $('tf_TagNumber').value || null;
  let primaryId = $('tf_PrimaryID').value || null;
  if (!primaryId && tagNumber) primaryId = tagNumber;

  const record = {
    CollectionNumber: currentCollectionNumber,
    PrimaryID: primaryId,
    TagNumber: tagNumber,
    TagNumber2: $('tf_TagNumber2').value || null,
    SpeciesCode: speciesCode,
    TagType: numOrNull($('tf_TagType').value),
    DispositionCode: numOrNull($('tf_DispositionCode').value),
    TL: numOrNull($('tf_TL').value),
    FL: numOrNull($('tf_FL').value),
    SL: numOrNull($('tf_SL').value),
    Comments: $('tf_Comments').value || null,
  };
  await DB.put('taggedFish', record);

  const warnEl = $('taggedWarning');
  const recapture = LOOKUPS.tagType.find((t) => /recap/i.test(t.name));
  if (recapture && record.TagType === recapture.code) {
    warnEl.hidden = false;
    warnEl.textContent = 'Note: this looks like a recapture. Recapture/angler tag-return entry isn\'t part of this field-entry app yet — record it here for the field log, then re-enter it in the Tag Return process back at the office.';
  } else {
    warnEl.hidden = true;
  }

  for (const id of ['tf_TagNumber','tf_TagNumber2','tf_PrimaryID','tf_TL','tf_FL','tf_SL','tf_Comments']) $(id).value = '';
  $('tf_SpeciesCode').focus();

  await refreshTagged();
  updateTabCounts();
}

// ---------- tab counts ----------

async function updateTabCounts() {
  if (!currentCollectionNumber) {
    $('tabCountMeasured').textContent = '';
    $('tabCountSacrificed').textContent = '';
    $('tabCountTagged').textContent = '';
    return;
  }
  const [m, s, t] = await Promise.all([
    DB.getAllByIndex('measuredFish', 'byCollection', currentCollectionNumber),
    DB.getAllByIndex('sacrificedFish', 'byCollection', currentCollectionNumber),
    DB.getAllByIndex('taggedFish', 'byCollection', currentCollectionNumber),
  ]);
  $('tabCountMeasured').textContent = `(${m.length})`;
  $('tabCountSacrificed').textContent = `(${s.length})`;
  $('tabCountTagged').textContent = `(${t.length})`;
}

// ---------- init / event wiring ----------

// Selects where typing the numeric code directly is a real shortcut some
// staff prefer over clicking through the list (per Chris, 2026-09) — e.g.
// typing "3" + Tab for Red Drum instead of scrolling/clicking. Station and
// the crew selects (Vessel Op./Data Rec./Fish Meas.) are deliberately left
// out — their values aren't simple numeric codes.
const CODE_ENTRY_SELECT_IDS = [
  'f_ActivityCode', 'f_SoundSystem', 'f_GearCode', 'f_DirTide',
  'f_WeatherConditions', 'f_WindDirection', 'f_WindVelocity', 'f_TideStage', 'f_MoonPhaseCode',
  'mf_SpeciesCode', 'mf_SexCode',
  'sf_SpeciesCode', 'sf_SexCode', 'sf_GonadStage',
  'tf_SpeciesCode', 'tf_TagType', 'tf_DispositionCode',
];

// Matches typed digits against option VALUES (the actual codes), not the
// visible label — so it works regardless of label wording/order, and is an
// exact match rather than relying on the browser's native "jump to first
// option whose visible text starts with this" typeahead, which can land on
// the wrong option when codes share a leading digit (e.g. species 3 vs 30).
// Confirms the final pick with a toast on blur — but only when a code was
// actually typed, not on an ordinary mouse click, so it doesn't add noise
// to the common case.
function enableCodeEntry(select) {
  let buffer = '';
  let bufferTimer = null;
  let usedKeyboardEntry = false;

  function resetBuffer() {
    buffer = '';
    clearTimeout(bufferTimer);
  }

  // Clicking a closed <select> both focuses it AND opens the native dropdown
  // in the same click — and on Windows that dropdown is a real OS popup that
  // captures all further keystrokes for its own (label-based) typeahead
  // instead of passing them to the keydown handler below. That's why typing
  // a code used to take multiple clicks (per Chris, 2026-09): the first
  // click's popup ate the first digit, and only closing it let our own
  // matching take over. So the first click on an unfocused field now just
  // focuses it, with the popup left closed — typing works immediately. A
  // second click (already focused) opens the list normally for mouse use.
  select.addEventListener('mousedown', (ev) => {
    if (document.activeElement !== select) {
      ev.preventDefault();
      select.focus();
    }
  });

  select.addEventListener('keydown', (ev) => {
    if (!/^[0-9]$/.test(ev.key)) {
      if (ev.key !== 'Tab' && !ev.key.startsWith('Shift')) resetBuffer();
      return;
    }
    ev.preventDefault(); // don't let native typeahead also act on this keystroke
    usedKeyboardEntry = true;
    clearTimeout(bufferTimer);
    bufferTimer = setTimeout(resetBuffer, 1000);

    const tryValue = buffer + ev.key;
    const exact = Array.from(select.options).find((o) => o.value === tryValue);
    if (exact) {
      buffer = tryValue;
      select.value = tryValue;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      return;
    }
    const anyPrefixed = Array.from(select.options).some((o) => o.value && o.value.startsWith(tryValue));
    if (anyPrefixed) {
      buffer = tryValue; // more digits could still complete a real code
    } else {
      // dead end — start fresh from this digit rather than getting stuck
      buffer = ev.key;
      const retry = Array.from(select.options).find((o) => o.value === buffer);
      if (retry) {
        select.value = buffer;
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  });

  select.addEventListener('blur', () => {
    if (usedKeyboardEntry) {
      usedKeyboardEntry = false;
      const opt = select.selectedOptions[0];
      if (opt && opt.value !== '') toast(`Set to: ${opt.textContent}`);
    }
    resetBuffer();
  });
}

function wireEvents() {
  for (const id of CODE_ENTRY_SELECT_IDS) enableCodeEntry($(id));

  // Backspace/Delete clears whatever's selected — selects don't support this
  // natively (per Chris, 2026-09). Applies to every select, including
  // Station and crew, not just the code-entry ones above. preventDefault()
  // also stops Backspace from triggering the browser's back-navigation when
  // focus isn't in a text field.
  document.addEventListener('keydown', (ev) => {
    if (ev.target.tagName === 'SELECT' && (ev.key === 'Backspace' || ev.key === 'Delete')) {
      ev.preventDefault();
      if (ev.target.value !== '') {
        ev.target.value = '';
        ev.target.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  });

  $('btnHome').addEventListener('click', () => {
    // Hydro isn't required to move on (per Chris — some staff prefer to
    // come back and fill it in later), but leaving it behind unnoticed is
    // easy to do, so flag it in the moment you actually leave this
    // collection. Non-blocking — just a reminder, not a gate.
    if (!$('viewEntry').hidden && currentCollectionNumber && !hydroComplete(readCollectionForm())) {
      toast(`Heads up: Collection ${currentCollectionNumber}'s Hydrographic data is still incomplete.`, true);
    }
    showView('list');
  });
  $('btnStatus').addEventListener('click', () => showView('status'));
  $('btnSettings').addEventListener('click', () => showView('settings'));
  wireStationStatusEvents();

  document.querySelectorAll('.tabBtn[data-settings-tab]').forEach((b) => {
    b.addEventListener('click', () => showSettingsTab(b.dataset.settingsTab));
  });
  $('btnAddCrew').addEventListener('click', () => addSimpleLookupEntry('crew'));
  $('btnAddGear').addEventListener('click', () => addSimpleLookupEntry('gear'));
  $('btnAddActivity').addEventListener('click', () => addSimpleLookupEntry('activity'));
  document.querySelectorAll('#settingsStationSystemToggle .toggleBtn').forEach((b) => {
    b.addEventListener('click', () => {
      settingsStationSystem = b.dataset.system;
      document.querySelectorAll('#settingsStationSystemToggle .toggleBtn').forEach((x) => x.classList.toggle('active', x === b));
      renderStationsTable();
    });
  });
  document.querySelector('#settingsStationSystemToggle .toggleBtn[data-system="WAS"]').classList.add('active');
  $('btnAddStation').addEventListener('click', addStation);
  $('btnImportAssignments').addEventListener('click', importAssignments);
  $('btnNewCollection').addEventListener('click', newCollection);
  $('btnDeleteCollection').addEventListener('click', deleteCurrentCollection);

  document.querySelectorAll('[data-tab]').forEach((b) => {
    b.addEventListener('click', () => showTab(b.dataset.tab));
  });

  document.querySelectorAll('.nowBtn').forEach((b) => {
    b.addEventListener('click', () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      $(b.dataset.target).value = `${hh}:${mm}:${ss}`;
      saveCollectionForm();
    });
  });

  document.querySelectorAll('#systemToggle .toggleBtn').forEach((b) => {
    b.addEventListener('click', () => {
      setSystemToggle(b.dataset.system);
      DB.setMeta('lastStationSystem', currentSystem); // remembered as the default for the next new collection
      refreshStationList();
    });
  });

  document.querySelectorAll('#deviceTierToggle .toggleBtn').forEach((b) => {
    b.addEventListener('click', () => {
      setDeviceTierOverride(b.dataset.tier);
      DB.setMeta('deviceTierOverride', b.dataset.tier);
    });
  });
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(applyDeviceTier, 150);
  });

  // Collection tab: auto-save on change, plus the special-case handlers
  const collectionFieldIds = ['f_ActivityCode','f_Date','f_Time','f_Time2','f_Station','f_SoundSystem',
    'f_Latitude','f_Longitude','f_Location','f_GearCode','f_DirTide','f_VesselOp',
    'f_DataRec','f_FishMeas','f_Comments','f_WeatherConditions','f_WindDirection','f_WindVelocity',
    'f_TideStage','f_MoonPhaseCode','f_Depth','f_Salinity','f_WaterTemp','f_DO','f_SubSampleTool'];
  for (const id of collectionFieldIds) {
    $(id).addEventListener('change', () => saveCollectionForm());
  }
  $('f_Station').addEventListener('change', () => { onStationChanged(); saveCollectionForm(); });
  // Per Chris: rather than a persistent on-screen hint (was throwing off row
  // alignment), only warn — once per collection — the first time the field
  // is touched, and only when there's genuinely no list for that month.
  $('f_Station').addEventListener('focus', () => {
    if (!stationListHasAssignment && !stationHintShownForThisCollection) {
      stationHintShownForThisCollection = true;
      toast('No station assignment list imported for this month — showing the full master station list.', true);
    }
  });
  // The active station-assignment period is keyed off the collection's Date,
  // so a date change can change which stations are offered/allowed. Gear's
  // month-based default lives here too now, for the same reason.
  $('f_Date').addEventListener('change', () => {
    if (!$('f_GearCode').value || gearWasAutoSet) {
      applyGearDefault($('f_Date').value);
      saveCollectionForm();
    }
    refreshStationList();
  });
  // A real user pick locks Gear in — only a genuine 'change' fires this
  // (programmatic .value assignment from applyGearDefault() above does not),
  // so this can't fire from the auto-default itself.
  $('f_GearCode').addEventListener('change', () => { gearWasAutoSet = false; });
  // Data Rec. defaults to whoever's running the boat, but stays a dropdown
  // so it can be changed when the rotation is handled differently.
  $('f_VesselOp').addEventListener('change', () => {
    if (!$('f_DataRec').value && $('f_VesselOp').value) {
      $('f_DataRec').value = $('f_VesselOp').value;
      saveCollectionForm();
    }
  });

  $('mf_SpeciesCode').addEventListener('change', async () => {
    const code = numOrNull($('mf_SpeciesCode').value);
    updateMeasuredFieldVisibility(code);
    // SL/Wt visibility is independent of species (the manual toggle stays as-is),
    // but a value typed for the previous fish shouldn't silently ride along.
    $('mf_SL').value = '';
    $('mf_TotalWeight').value = '';
    if (code == null || !currentCollectionNumber) { $('mfCurrentTotal').textContent = ''; return; }
    const rows = await DB.getAllByIndex('measuredFish', 'byCollection', currentCollectionNumber);
    const match = rows.find((r) => r.SpeciesCode === code);
    $('mfCurrentTotal').textContent = match ? `Current total for this species: ${match.TotalCount}` : '';
  });

  $('btnAddMeasured').addEventListener('click', addMeasuredFish);
  $('btnToggleRareFields').addEventListener('click', () => setMfRareFieldsShown(!mfRareFieldsShown));
  // Per Chris (2026-09): Enter anywhere in the row should act like clicking
  // Add Fish — addMeasuredFish() already validates Species/length itself, so
  // this just reuses that (a premature Enter shows the same toast the button
  // would). Disabled inputs (row gated) don't fire keydown, so no extra guard.
  $('measuredEntryRow').addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      const seq = visibleMeasuredEntryFieldIds();
      const idx = seq.indexOf(ev.target.id);
      if (idx !== -1 && idx < seq.length - 1) {
        $(seq[idx + 1]).focus();
        return;
      }
      addMeasuredFish();
    }
  });
  $('btnAddSacrificed').addEventListener('click', addSacrificedFish);
  $('btnAddTagged').addEventListener('click', addTaggedFish);

  $('btnExportAccess').addEventListener('click', async () => {
    const counts = await exportForAccess();
    toast(`Exported: ${counts.collections} collections, ${counts.measuredFish} measured, ${counts.sacrificedFish} sacrificed, ${counts.taggedFish} tagged.`);
  });
  // Catches the "lid closed / app backgrounded mid-field" case: the page
  // visibility API fires reliably when a laptop sleeps or a tab is
  // switched away from, even though no individual field's blur/change event
  // fired yet. Flushes whatever's currently on the Collection tab so a
  // half-typed field isn't the one thing at risk.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && !$('viewEntry').hidden) {
      saveCollectionForm();
    }
  });

  // A refresh (or closing the tab/browser) is different from backgrounding:
  // IndexedDB writes are async and NOT guaranteed to finish before the page
  // actually unloads, so silently "saving on the way out" isn't reliable
  // here the way visibilitychange's flush is. Instead, warn BEFORE it
  // happens (the browser's native "leave site?" prompt) whenever there's
  // something that hasn't been committed yet: a fish entry-row filled in
  // but not yet clicked Add, or a Collection field still focused/mid-edit
  // that hasn't fired its own save-on-blur yet. Already-added fish and
  // already-blurred fields don't trigger this — they're already safe.
  // Marks a real, uncommitted edit — not just "a field happens to have
  // focus" (a field stays focused after being saved too, e.g. right after
  // picking a date, which isn't "unsaved"). Cleared by saveCollectionForm()
  // once that edit is actually written to IndexedDB.
  $('panelCollection').addEventListener('input', () => { collectionFieldDirty = true; });

  window.addEventListener('beforeunload', (ev) => {
    if ($('viewEntry').hidden) return;

    const pendingMeasured = ['mf_SpeciesCode','mf_TL','mf_FL','mf_SL','mf_TotalWeight','mf_Comments'].some((id) => $(id).value);
    const pendingSacrificed = ['sf_SpeciesCode','sf_TL','sf_FL','sf_SL','sf_TotalWeight','sf_Comments'].some((id) => $(id).value);
    const pendingTagged = ['tf_TagNumber','tf_TagNumber2','tf_PrimaryID','tf_SpeciesCode','tf_TL','tf_FL','tf_SL','tf_Comments'].some((id) => $(id).value);

    if (collectionFieldDirty || pendingMeasured || pendingSacrificed || pendingTagged) {
      ev.preventDefault();
      ev.returnValue = '';
    }
  });

  $('btnBackup').addEventListener('click', async () => {
    await exportFullBackup();
    toast('Backup saved to Downloads.');
    renderBackupBanner();
  });
  $('btnRestore').addEventListener('click', () => $('fileRestore').click());
  $('fileRestore').addEventListener('change', async (ev) => {
    const file = ev.target.files[0];
    if (!file) return;
    const text = await file.text();
    const counts = await importFullBackup(text);
    toast(`Restored: ${counts.collections} collections, ${counts.measuredFish} measured, ${counts.sacrificedFish} sacrificed, ${counts.taggedFish} tagged.`);
    renderCollectionsList();
    renderBackupBanner();
    ev.target.value = '';
  });
}

async function init() {
  await hydrateLookupOverrides(); // apply any saved crew/station edits before building dropdowns
  populateStaticDropdowns();
  setSystemToggle(await DB.getMeta('lastStationSystem', 'WAS'));
  await refreshStationList();
  wireEvents();
  setDeviceTierOverride(await DB.getMeta('deviceTierOverride', 'auto'));
  showView('list');
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
  // Best-effort: ask the browser not to evict this device's local data under
  // storage pressure (relevant since this app may sit unused for days/weeks
  // between trips). Not supported everywhere, and not a substitute for
  // actually backing up — just reduces one more way data could quietly go away.
  if (navigator.storage && navigator.storage.persist) {
    navigator.storage.persist().catch(() => {});
  }
}

init();
