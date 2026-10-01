// Live length/weight cross-checks against LBioParms — ported field-for-field
// from Form_RFMeasuredFish / Form_RFSacrificedFish in the original Access app.
// These are per-species, per-sound-system regressions built from years of prior
// collections; SoundSystem 94 ("Georgia") is the generic fallback used when no
// system-specific row exists, exactly as the original does.
//
// The FL-range check that used to live here (a passive warning after the fish
// was already saved) was replaced 2026-10-01, per Chris, with a blocking
// confirm-before-save version covering both FL and TL — see
// checkLengthRange() / recordLengthObservation() below and their use in
// addMeasuredFish() in app.js. The SL-vs-FL and Weight-vs-length checks below
// are unrelated/unchanged — different kind of check (a regression-predicted
// mismatch, not an absolute reasonable-range), out of scope for that change.

function findBioParms(speciesCode, soundSystem) {
  let row = LOOKUPS.bioParms.find(
    (r) => r.species === speciesCode && r.soundSystem === soundSystem
  );
  if (!row) {
    row = LOOKUPS.bioParms.find((r) => r.species === speciesCode && r.soundSystem === 94);
  }
  return row || null;
}

function speciesName(speciesCode) {
  const sp = LOOKUPS.species.find((s) => s.code === speciesCode);
  return sp ? sp.common : `species ${speciesCode}`;
}

// A species+length's range doesn't start enforcing (triggering the confirm
// popup below) until this many real measurements have been recorded for it
// (per Chris, 2026-10-01) — otherwise every species/TL combo starting from
// nothing would nag on nearly every entry for the first few weeks, before
// there's anywhere near a legitimate range built up. The 68 original FL
// ranges (real, decades-old survey data, migrated from the old LBioParms
// table) are seeded with flCount=9999 so they're always enforced immediately
// — this warmup only applies to genuinely new species+length combos.
const LENGTH_RANGE_WARMUP_COUNT = 5;

// Checks one length value against its species+soundSystem range (falling
// back to the generic "Georgia" row the same way findBioParms always has).
// Returns { status: 'ok' } if there's no range yet, the range hasn't
// finished warming up, or the value is within range; { status: 'violation',
// min, max } if an enforced range exists and this value falls outside it.
function checkLengthRange(speciesCode, soundSystem, lengthType, value) {
  if (speciesCode == null || value == null) return { status: 'ok' };
  const bp = findBioParms(speciesCode, soundSystem);
  const minKey = lengthType === 'FL' ? 'flMin' : 'tlMin';
  const maxKey = lengthType === 'FL' ? 'flMax' : 'tlMax';
  const countKey = lengthType === 'FL' ? 'flCount' : 'tlCount';
  if (!bp || bp[minKey] == null || bp[maxKey] == null) return { status: 'ok' };
  if ((bp[countKey] ?? 0) < LENGTH_RANGE_WARMUP_COUNT) return { status: 'ok' };
  if (value < bp[minKey] || value > bp[maxKey]) {
    return { status: 'violation', min: bp[minKey], max: bp[maxKey] };
  }
  return { status: 'ok' };
}

// Widens (or creates) the species+soundSystem-SPECIFIC range after a real,
// accepted measurement — called for every accepted FL/TL (not just confirmed
// violations), so a still-warming-up range keeps learning silently too. The
// comparison/fallback-to-94 logic above is untouched by this — new data
// always grows the specific system's own row, same as a real new
// system-specific range would historically have been built up for FL.
// LOOKUPS.bioParms is mutated directly; the caller is responsible for
// persisting it (see app.js, which calls persistLookupEdit('bioParms')).
function recordLengthObservation(speciesCode, soundSystem, lengthType, value) {
  if (speciesCode == null || soundSystem == null || value == null) return;
  const minKey = lengthType === 'FL' ? 'flMin' : 'tlMin';
  const maxKey = lengthType === 'FL' ? 'flMax' : 'tlMax';
  const countKey = lengthType === 'FL' ? 'flCount' : 'tlCount';

  let row = LOOKUPS.bioParms.find((r) => r.species === speciesCode && r.soundSystem === soundSystem);
  if (!row) {
    row = {
      species: speciesCode, soundSystem,
      flMin: null, flMax: null, flCount: 0,
      tlMin: null, tlMax: null, tlCount: 0,
      flSLm: null, flSLb: null, flTWa: null, flTWb: null, slTWa: null, slTWb: null,
    };
    LOOKUPS.bioParms.push(row);
  }
  if (row[minKey] == null || value < row[minKey]) row[minKey] = value;
  if (row[maxKey] == null || value > row[maxKey]) row[maxKey] = value;
  row[countKey] = (row[countKey] ?? 0) + 1;
}

// Returns an array of warning strings (empty = no concerns). Call whenever
// SpeciesCode plus one or more of FL / SL / TotalWeight change.
function checkMeasurement(speciesCode, soundSystem, { FL, SL, TotalWeight } = {}) {
  const warnings = [];
  if (speciesCode == null) return warnings;
  const bp = findBioParms(speciesCode, soundSystem);
  if (!bp) return warnings;
  const name = speciesName(speciesCode);

  if (SL != null && FL != null && bp.flSLm != null && bp.flSLb != null) {
    const predicted = bp.flSLm * FL + bp.flSLb;
    const tolerance = Math.abs(FL - predicted) * 0.25;
    if (SL < predicted - tolerance) {
      warnings.push(`Check Standard and Centerline Lengths (${name}): SL may be short or CL may be long.`);
    } else if (SL > predicted + tolerance) {
      warnings.push(`Check Standard and Centerline Lengths (${name}): SL may be long or CL may be short.`);
    }
  }

  if (TotalWeight != null) {
    let predictedTW = null;
    let basis = null;
    if (FL != null && bp.flTWa != null && bp.flTWb != null) {
      predictedTW = bp.flTWa * Math.pow(FL, bp.flTWb);
      basis = 'Centerline Length';
    } else if (SL != null && bp.slTWa != null && bp.slTWb != null) {
      predictedTW = bp.slTWa * Math.pow(SL, bp.slTWb);
      basis = 'Standard Length';
    }
    if (predictedTW != null) {
      const tolerance = predictedTW * 0.15;
      if (TotalWeight < predictedTW - tolerance) {
        warnings.push(`Check ${basis} and Total Weight (${name}): length may be long or weight may be small.`);
      } else if (TotalWeight > predictedTW + tolerance) {
        warnings.push(`Check ${basis} and Total Weight (${name}): length may be short or weight may be large.`);
      }
    }
  }

  return warnings;
}
