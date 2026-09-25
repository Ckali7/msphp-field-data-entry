// Auto-generated from LSpecies (..\msphp data entry.mdb) and historical
// RFMeasuredFish records (Desktop/Recreational Fisheries 2008 (1).accdb) —
// do not hand-edit. Regenerate via tools/regenerate_species_fields.py.
//
// Per species: which of TL / Sex to show on Measured Fish beyond FL
// (always shown). Determined by, in order: (1) a Shark/Crab/Ray name
// category override, (2) real historical usage rates where there's
// enough data to trust them, (3) defaulting to showing both when
// neither of the above applies. See tools/regenerate_species_fields.py
// for the full rule and reasoning. SL and Weight are handled separately
// (a manual reveal button, not species-driven) — never in this file.
const SPECIES_EXTRA_FIELDS = {
 "1": [],
 "2": [
  "Sex"
 ],
 "3": [
  "TL"
 ],
 "4": [],
 "5": [],
 "6": [
  "TL"
 ],
 "7": [],
 "8": [],
 "9": [],
 "10": [
  "TL"
 ],
 "11": [
  "TL",
  "Sex"
 ],
 "12": [
  "TL",
  "Sex"
 ],
 "14": [],
 "15": [
  "TL",
  "Sex"
 ],
 "17": [
  "Sex"
 ],
 "21": [
  "TL",
  "Sex"
 ],
 "23": [
  "Sex"
 ],
 "24": [],
 "26": [
  "Sex"
 ],
 "27": [],
 "30": [],
 "31": [
  "Sex"
 ],
 "32": [],
 "34": [],
 "35": [
  "Sex"
 ],
 "36": [
  "Sex"
 ],
 "37": [],
 "38": [],
 "39": [
  "Sex"
 ],
 "40": [],
 "42": [
  "Sex"
 ],
 "43": [
  "TL",
  "Sex"
 ],
 "46": [
  "TL",
  "Sex"
 ],
 "48": [],
 "49": [
  "TL",
  "Sex"
 ],
 "51": [
  "TL",
  "Sex"
 ],
 "53": [
  "TL",
  "Sex"
 ],
 "54": [
  "Sex"
 ],
 "55": [],
 "57": [
  "TL",
  "Sex"
 ],
 "58": [
  "TL",
  "Sex"
 ],
 "59": [
  "TL",
  "Sex"
 ],
 "62": [
  "TL",
  "Sex"
 ],
 "63": [
  "TL",
  "Sex"
 ],
 "64": [
  "TL",
  "Sex"
 ],
 "65": [
  "TL",
  "Sex"
 ],
 "69": [
  "TL",
  "Sex"
 ],
 "70": [],
 "71": [
  "TL",
  "Sex"
 ],
 "72": [
  "TL",
  "Sex"
 ],
 "73": [],
 "76": [
  "TL",
  "Sex"
 ],
 "77": [
  "TL",
  "Sex"
 ],
 "78": [
  "Sex"
 ],
 "79": [
  "TL",
  "Sex"
 ],
 "80": [
  "TL",
  "Sex"
 ],
 "83": [
  "Sex"
 ],
 "84": [],
 "86": [
  "TL"
 ],
 "87": [
  "TL",
  "Sex"
 ],
 "88": [
  "TL",
  "Sex"
 ],
 "89": [
  "TL",
  "Sex"
 ],
 "90": [
  "TL",
  "Sex"
 ],
 "91": [
  "TL",
  "Sex"
 ],
 "92": [
  "TL",
  "Sex"
 ],
 "93": [
  "TL",
  "Sex"
 ],
 "94": [
  "TL",
  "Sex"
 ],
 "95": [
  "TL",
  "Sex"
 ],
 "96": [
  "Sex"
 ],
 "97": [
  "Sex"
 ],
 "98": [],
 "99": [
  "TL",
  "Sex"
 ],
 "100": [
  "TL",
  "Sex"
 ],
 "101": [],
 "102": [],
 "103": [
  "TL",
  "Sex"
 ],
 "104": [
  "TL",
  "Sex"
 ],
 "105": [
  "TL",
  "Sex"
 ],
 "106": [
  "Sex"
 ],
 "107": [],
 "108": [
  "TL",
  "Sex"
 ],
 "109": [
  "TL",
  "Sex"
 ],
 "110": [],
 "111": [
  "TL",
  "Sex"
 ],
 "114": [
  "Sex"
 ],
 "115": [],
 "117": [
  "Sex"
 ],
 "119": [
  "Sex"
 ],
 "120": [
  "Sex"
 ],
 "121": [
  "TL",
  "Sex"
 ],
 "122": [
  "TL",
  "Sex"
 ],
 "124": [
  "TL",
  "Sex"
 ],
 "125": [
  "TL",
  "Sex"
 ],
 "126": [],
 "127": [
  "Sex"
 ],
 "129": [
  "TL",
  "Sex"
 ],
 "131": [
  "Sex"
 ],
 "132": [
  "TL",
  "Sex"
 ],
 "133": [],
 "134": [
  "TL",
  "Sex"
 ],
 "138": [
  "TL",
  "Sex"
 ],
 "139": [
  "TL",
  "Sex"
 ],
 "141": [
  "TL",
  "Sex"
 ],
 "147": [
  "TL",
  "Sex"
 ],
 "148": [
  "TL",
  "Sex"
 ],
 "149": [
  "Sex"
 ],
 "153": [],
 "154": [
  "TL",
  "Sex"
 ],
 "155": [
  "Sex"
 ],
 "156": [
  "TL",
  "Sex"
 ],
 "157": [],
 "158": [
  "TL",
  "Sex"
 ],
 "159": [
  "TL",
  "Sex"
 ],
 "163": [
  "TL",
  "Sex"
 ],
 "164": [
  "TL",
  "Sex"
 ],
 "165": [
  "TL",
  "Sex"
 ],
 "175": [],
 "176": [
  "Sex"
 ],
 "177": [
  "Sex"
 ],
 "178": [
  "Sex"
 ],
 "179": [
  "Sex"
 ],
 "180": [
  "Sex"
 ],
 "181": [
  "TL",
  "Sex"
 ],
 "182": [
  "TL",
  "Sex"
 ],
 "185": [
  "TL",
  "Sex"
 ],
 "187": [
  "TL",
  "Sex"
 ],
 "197": [
  "Sex"
 ],
 "198": [
  "Sex"
 ],
 "206": [
  "Sex"
 ],
 "213": [],
 "215": [
  "TL",
  "Sex"
 ],
 "220": [
  "TL",
  "Sex"
 ],
 "221": [
  "TL",
  "Sex"
 ],
 "222": [
  "Sex"
 ],
 "225": [
  "TL",
  "Sex"
 ],
 "228": [
  "Sex"
 ],
 "230": [],
 "253": [
  "Sex"
 ],
 "258": [
  "TL",
  "Sex"
 ],
 "262": [
  "TL",
  "Sex"
 ],
 "266": [
  "TL",
  "Sex"
 ],
 "267": [
  "TL",
  "Sex"
 ],
 "268": [
  "Sex"
 ],
 "269": [
  "TL",
  "Sex"
 ],
 "270": [
  "TL",
  "Sex"
 ],
 "271": [
  "TL",
  "Sex"
 ],
 "272": [
  "TL",
  "Sex"
 ],
 "273": [
  "TL",
  "Sex"
 ],
 "280": [
  "TL",
  "Sex"
 ],
 "288": [
  "TL",
  "Sex"
 ],
 "999": [
  "TL",
  "Sex"
 ]
};
