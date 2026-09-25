// ---------- Monthly Station Status (per Chris, 2026-09) ----------
// A read-only check/balance view: for a chosen month/system/gear, lists
// every assigned station and whether a genuinely complete collection
// (same gearCollectionComplete() test used everywhere else for "done")
// exists for it yet. Only reflects this device's local data — there's no
// server, so a crew on separate laptops needs to merge everyone's Backup
// (JSON) files onto one device (Restore Backup is additive, not a wipe)
// before this view reflects the whole month's progress.

let statusSystem = 'WAS';

// Gear codes aren't self-describing as "Gill" vs "Trammel" to the rest of
// the app (they're just numbers), but station records and this checklist
// both need that category to know which stations are normally fished with
// which gear — derived from the gear name rather than hardcoding the codes
// so a newly-added gear type in Settings still classifies itself.
function gearCategoryForCode(gearCode) {
  const g = LOOKUPS.gear.find((x) => x.code === gearCode);
  if (!g) return null;
  if (/tram+el/i.test(g.name)) return 'TRAMMEL';
  if (/gill/i.test(g.name)) return 'GILL';
  return null;
}

// The checklist's station list: this month's imported assignment list if
// one exists (same fallback-to-full-master-list behavior as the Station
// dropdown during entry), filtered to stations normally fished with the
// selected gear category via the master list's per-station "gear" tag
// (BOTH/GILL/TRAMMEL). A station missing from the master list (assignment
// CSV typo, etc.) is kept rather than silently dropped.
async function stationsForStatus(system, period, gearCategory) {
  const master = LOOKUPS[STATION_TABLES[system]] || [];
  const masterByName = new Map(master.map((s) => [s.station, s]));

  const assignment = await DB.get('stationAssignments', period);
  const names = assignment
    ? assignment.rows.filter((r) => r.system === system).map((r) => r.station)
    : master.map((s) => s.station);

  return names
    .map((name) => masterByName.get(name) || { station: name, gear: null })
    .filter((s) => !gearCategory || !s.gear || s.gear === 'BOTH' || s.gear === gearCategory);
}

async function renderStationStatus() {
  const period = $('statusMonth').value; // 'YYYY-MM'
  const gearCode = numOrNull($('statusGear').value);
  const tbody = $('statusTbody');
  const summary = $('statusSummary');

  if (!period || gearCode == null) {
    tbody.innerHTML = '';
    summary.textContent = 'Pick a month and a gear type to see the checklist.';
    return;
  }

  const gearCategory = gearCategoryForCode(gearCode);
  const stations = await stationsForStatus(statusSystem, period, gearCategory);

  const allCollections = await DB.getAll('collections');
  const doneByStation = new Map();
  for (const c of allCollections) {
    if ((c.Date || '').slice(0, 7) !== period) continue;
    if (c.GearCode !== gearCode) continue;
    if (!gearCollectionComplete(c)) continue;
    const existing = doneByStation.get(c.Station);
    if (!existing || c.Date > existing.Date) doneByStation.set(c.Station, c);
  }

  let doneCount = 0;
  tbody.innerHTML = stations.map((s) => {
    const c = doneByStation.get(s.station);
    if (c) doneCount++;
    return `<tr>
      <td>${s.station}</td>
      <td>${c ? '<span class="statusPill listHydroPill ok">Done</span>' : ''}</td>
      <td>${c ? c.Date : ''}</td>
      <td class="mono">${c ? c.CollectionNumber : ''}</td>
    </tr>`;
  }).join('');

  summary.textContent = stations.length
    ? `${doneCount} of ${stations.length} station(s) done for ${period}.`
    : 'No stations match this month/system/gear combination.';
}

function wireStationStatusEvents() {
  document.querySelectorAll('#statusSystemToggle .toggleBtn').forEach((b) => {
    b.addEventListener('click', () => {
      statusSystem = b.dataset.system;
      document.querySelectorAll('#statusSystemToggle .toggleBtn').forEach((x) => x.classList.toggle('active', x === b));
      renderStationStatus();
    });
  });
  document.querySelector('#statusSystemToggle .toggleBtn[data-system="WAS"]').classList.add('active');

  $('statusMonth').addEventListener('change', renderStationStatus);
  $('statusGear').addEventListener('change', renderStationStatus);
}

// Called on first navigating to the Status view each session — defaults the
// month to the current one and, if nothing's picked yet, the gear to that
// month's seasonal default (same Gill/Trammel rule the Collection tab uses)
// so the checklist shows something useful without requiring two picks first.
function primeStationStatusDefaults() {
  if (!$('statusMonth').value) {
    $('statusMonth').value = new Date().toISOString().slice(0, 7);
  }
  if (!$('statusGear').value) {
    const defaultGear = defaultGearForMonth(`${$('statusMonth').value}-01`);
    if (defaultGear != null) $('statusGear').value = String(defaultGear);
  }
}
