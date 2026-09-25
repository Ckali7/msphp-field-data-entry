// Live length/weight cross-checks against LBioParms — ported field-for-field
// from Form_RFMeasuredFish / Form_RFSacrificedFish in the original Access app.
// These are per-species, per-sound-system regressions built from years of prior
// collections; SoundSystem 94 ("Georgia") is the generic fallback used when no
// system-specific row exists, exactly as the original does.

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

// Returns an array of warning strings (empty = no concerns). Call whenever
// SpeciesCode plus one or more of FL / SL / TotalWeight change.
function checkMeasurement(speciesCode, soundSystem, { FL, SL, TotalWeight } = {}) {
  const warnings = [];
  if (speciesCode == null) return warnings;
  const bp = findBioParms(speciesCode, soundSystem);
  if (!bp) return warnings;
  const name = speciesName(speciesCode);

  if (FL != null && bp.flMin != null && bp.flMax != null) {
    if (FL < bp.flMin || FL > bp.flMax) {
      warnings.push(
        `${FL} is outside of the CL range for ${name}: ${bp.flMin} - ${bp.flMax}. Check the measurement.`
      );
    }
  }

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
