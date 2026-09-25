// Length-stratified subsampling prompt — ported from Form_RFMeasuredFish's
// CNSOSubSampleTool logic. When the subsample tool is switched on for a
// collection, this flags whether a freshly-measured fish is still needed to
// hit the target sample count for its species' 10mm length bin (this is the
// field-side mechanism behind the MSPHS stratified abundance-index sampling
// design — see MSPHPSubSampleList).

// existingRows: all measuredFish rows already entered for this CollectionNumber
// (the caller queries these from IndexedDB before calling this).
function checkSubsample(existingRows, speciesCode, FL) {
  if (FL == null || speciesCode == null) return { take: false };

  const target = LOOKUPS.subSample.find((r) => r.species === speciesCode);
  if (!target) return { take: false };

  if (target.min != null && FL < target.min) return { take: false };
  if (target.max != null && FL > target.max) return { take: false };

  const bin = Math.floor(FL / 10);
  const countInBin = existingRows.filter(
    (r) => r.SpeciesCode === speciesCode && Math.floor(r.FL / 10) === bin
  ).length;

  if (countInBin <= target.size) {
    return { take: true, bin, target: target.size, countInBin };
  }
  return { take: false };
}

// The "25 measured, any more may be counted" reminder — ported as-is, but
// only fires for species that AREN'T under active length-stratified
// subsampling (those use the TAKE THIS FISH rule above instead).
function checkMeasuredReminder(totalCount, speciesCode) {
  const hasSubsampleRule = LOOKUPS.subSample.some((r) => r.species === speciesCode);
  if (!hasSubsampleRule && totalCount === 25) {
    return `25 ${speciesName(speciesCode)} have been measured. Any more may be counted.`;
  }
  return null;
}
