// Auto-generated from msphp data entry.mdb lookup tables -- do not hand-edit.
// Regenerate via tools/regenerate_lookups.py if the source Access lookup tables change,
// then re-apply the station-list restructuring documented below -- a raw regen alone
// will NOT reproduce this file's current shape (the .mdb still has HAM/CMB as separate
// tables and has no STA table at all).
//
// station[].location (stationsWAS/ALT/STA) was merged in from
// Desktop\Station Location Match\*_with_Descriptions.xlsx (2026-09-30) -- short
// human-written location descriptions not present in the .mdb tables this script
// reads from.
//
// Station-system restructuring (2026-09-30, per Chris):
// - stationsHAM (137 Hampton River stations) merged into stationsALT (was 220,
//   now 357). The live .mdb tracks them as separate tables/SYSTEM codes, but
//   that's a database-schema split, not a reflection of two independent
//   surveys -- "Chronology of Adjustments to MSPHP ALTHAM Survey Design.pdf"
//   (Desktop\MSPHS GLMM Standardization\) confirms Hampton River and Altamaha
//   were designed and run as ONE combined "ALTHAM" program since 2003 (shared
//   quad/pool numbering from day one; e.g. Jan 2004 "effort was reallocated
//   between Hampton and new Altamaha systems" when Doboy Sound stations were
//   added to replace dropped Altamaha ones). HAM was never dropped from the
//   survey -- only ordinary individual-station churn, same as ALT had. HAM
//   station NAMES are unchanged (still "HAM####"); only which list/button
//   they live under changed. inferSoundSystemFromStation() in fieldlogic.js
//   still maps HAM-prefixed names to SoundSystem code 11 (Hampton River) --
//   that biological classification is unaffected by the UI regrouping.
// - stationsCMB (was a single never-populated placeholder, CMB0001) retired.
// - stationsSTA added (122 real stations, St. Andrew Sound + Cumberland River
//   area) from Desktop\Station Location Match\LStationAssignmentSTA_with_
//   Descriptions.xlsx -- this table/system never existed in the .mdb at all.
// The 3 station-system buttons are now WAS / ALT / STA.
//
// physicalTagType (added 2026-09-30, per Chris) is a brand-new editable
// table (Settings > Table Data > Tag Types) for TagType1/2/3 in the
// Measured Fish "Tagged/Recaps" popup -- the physical tag type (Dart,
// Internal PIT, etc.), a different concept from the existing tagType table
// above (which is really a Not Tagged/Tagged/Recaptured STATUS, now
// surfaced on measuredFish records as TagStatus). No source data exists for
// it anywhere -- starts empty, populated by hand via Settings.
const LOOKUPS = {
 "activity": [
  {
   "code": 7,
   "name": "Carcass"
  },
  {
   "code": 13,
   "name": "YOY SO Survey WAS"
  },
  {
   "code": 14,
   "name": "MSPHP Survey WAS"
  },
  {
   "code": 3,
   "name": "Tagging"
  },
  {
   "code": 99,
   "name": "SEDAR Supplemental WAS"
  }
 ],
 "gear": [
  {
   "code": 108,
   "name": "MSPHP Gill Net - 2.5\"; 9'x300'"
  },
  {
   "code": 111,
   "name": "MSPHP Trammel Net- 2.75\" in 14\" out; 7'x300'"
  },
  {
   "code": 199,
   "name": "SEDAR SUPPLEMENTAL Tramel Net 2.5\" in 14\" out; 7x600"
  }
 ],
 "disposition": [
  {
   "code": 0,
   "name": "Sacrificed"
  },
  {
   "code": 1,
   "name": "Released with Tag"
  },
  {
   "code": 2,
   "name": "Released without Tag"
  },
  {
   "code": 3,
   "name": "Released with New Tag"
  }
 ],
 "sex": [
  {
   "code": 1,
   "name": "Male"
  },
  {
   "code": 2,
   "name": "Female"
  },
  {
   "code": 3,
   "name": "Unknown"
  }
 ],
 "tagType": [
  {
   "code": 0,
   "name": "Not Tagged"
  },
  {
   "code": 1,
   "name": "Tagged"
  },
  {
   "code": 2,
   "name": "Recaptured"
  }
 ],
 "physicalTagType": [],
 "tideStage": [
  {
   "code": 2,
   "name": "Flood 1/4"
  },
  {
   "code": 3,
   "name": "Flood  1/2"
  },
  {
   "code": 4,
   "name": "Flood  3/4"
  },
  {
   "code": 1,
   "name": "Low"
  },
  {
   "code": 5,
   "name": "High"
  },
  {
   "code": 6,
   "name": "Ebb 1/4"
  },
  {
   "code": 7,
   "name": "Ebb 1/2"
  },
  {
   "code": 8,
   "name": "Ebb 3/4"
  }
 ],
 "weather": [
  {
   "code": 1,
   "name": "Sunny"
  },
  {
   "code": 2,
   "name": "Partly Cloudy"
  },
  {
   "code": 3,
   "name": "Overcast (No Precip.)"
  },
  {
   "code": 4,
   "name": "Overcast (Precip.)"
  }
 ],
 "windDirection": [
  {
   "code": 0,
   "name": "Calm"
  },
  {
   "code": 360,
   "name": "N"
  },
  {
   "code": 22,
   "name": "NNE"
  },
  {
   "code": 45,
   "name": "NE"
  },
  {
   "code": 67,
   "name": "ENE"
  },
  {
   "code": 90,
   "name": "E"
  },
  {
   "code": 112,
   "name": "ESE"
  },
  {
   "code": 135,
   "name": "SE"
  },
  {
   "code": 157,
   "name": "SSE"
  },
  {
   "code": 180,
   "name": "S"
  },
  {
   "code": 202,
   "name": "SSW"
  },
  {
   "code": 225,
   "name": "SW"
  },
  {
   "code": 247,
   "name": "WSW"
  },
  {
   "code": 270,
   "name": "W"
  },
  {
   "code": 292,
   "name": "WNW"
  },
  {
   "code": 315,
   "name": "NW"
  },
  {
   "code": 337,
   "name": "NNW"
  }
 ],
 "windVelocity": [
  {
   "code": 1,
   "name": "1 - 5 (0-5)"
  },
  {
   "code": 2,
   "name": "6 - 10"
  },
  {
   "code": 3,
   "name": "11 - 15"
  },
  {
   "code": 4,
   "name": "16 - 20"
  },
  {
   "code": 5,
   "name": "21 - 25"
  },
  {
   "code": 6,
   "name": "26 - 30"
  },
  {
   "code": 7,
   "name": "31 - 35"
  },
  {
   "code": 8,
   "name": "FOOL!"
  },
  {
   "code": 0,
   "name": "Calm"
  }
 ],
 "moonPhase": [
  {
   "code": 10,
   "name": "New Moon"
  },
  {
   "code": 11,
   "name": "1-3 Before"
  },
  {
   "code": 12,
   "name": "1-3 After"
  },
  {
   "code": 20,
   "name": "First Quarter"
  },
  {
   "code": 21,
   "name": "1-3 Before"
  },
  {
   "code": 22,
   "name": "1-3 After"
  },
  {
   "code": 30,
   "name": "Full Moon"
  },
  {
   "code": 31,
   "name": "1-3 Before"
  },
  {
   "code": 32,
   "name": "1-3 After"
  },
  {
   "code": 40,
   "name": "Last Quarter"
  },
  {
   "code": 41,
   "name": "1-3 Before"
  },
  {
   "code": 42,
   "name": "1-3 After"
  },
  {
   "code": 50,
   "name": "Split Phase"
  }
 ],
 "gonadStage": [
  {
   "code": 1,
   "name": "Immature"
  },
  {
   "code": 2,
   "name": "Developing"
  },
  {
   "code": 3,
   "name": "Ripe (Spawning)"
  },
  {
   "code": 4,
   "name": "Spent"
  },
  {
   "code": 5,
   "name": "Resting"
  },
  {
   "code": 0,
   "name": "Unknown"
  }
 ],
 "condition": [
  {
   "code": 0,
   "name": "Unknown"
  },
  {
   "code": 1,
   "name": "Good"
  },
  {
   "code": 2,
   "name": "Fair"
  },
  {
   "code": 3,
   "name": "Poor"
  }
 ],
 "dirTide": [
  {
   "code": 0,
   "name": "N/A Stationary"
  },
  {
   "code": 1,
   "name": "Against tidal current"
  },
  {
   "code": 2,
   "name": "With tidal current"
  }
 ],
 "crew": [
  {
   "code": "AC001",
   "name": "Alex Cummins"
  },
  {
   "code": "BJ001",
   "name": "BJ Hilton"
  },
  {
   "code": "CK001",
   "name": "Chris Kalinowsky"
  },
  {
   "code": "HW001",
   "name": "Hourly Worker"
  },
  {
   "code": "XX001",
   "name": "Volunteer/Intern"
  }
 ],
 "doNotAdd": [
  2000,
  2001
 ],
 "soundSystem": [
  {
   "code": 13,
   "name": "St. Simons",
   "lat": 31.12969970703125,
   "lon": -81.42610168457031
  },
  {
   "code": 8,
   "name": "Sapelo",
   "lat": 31.54640007019043,
   "lon": -81.23300170898438
  },
  {
   "code": 10,
   "name": "Altamaha",
   "lat": 31.314300537109375,
   "lon": -81.31050109863281
  },
  {
   "code": 3,
   "name": "Wassaw",
   "lat": 31.933000564575195,
   "lon": -80.94830322265625
  },
  {
   "code": 9,
   "name": "Doboy",
   "lat": 31.38089942932129,
   "lon": -81.2916030883789
  },
  {
   "code": 2,
   "name": "Savannah River",
   "lat": null,
   "lon": null
  },
  {
   "code": 4,
   "name": "Ossabaw",
   "lat": 31.83930015563965,
   "lon": -81.0353012084961
  },
  {
   "code": 5,
   "name": "St. Catherines",
   "lat": 31.714000701904297,
   "lon": -81.16110229492188
  },
  {
   "code": 11,
   "name": "Hampton River",
   "lat": null,
   "lon": null
  },
  {
   "code": 12,
   "name": "Village Creek",
   "lat": null,
   "lon": null
  },
  {
   "code": 15,
   "name": "St. Andrew",
   "lat": 30.99449920654297,
   "lon": -81.43329620361328
  },
  {
   "code": 16,
   "name": "Cumberland",
   "lat": 30.714599609375,
   "lon": -81.47339630126953
  },
  {
   "code": 99,
   "name": "Unknown",
   "lat": null,
   "lon": null
  },
  {
   "code": 98,
   "name": "Off Shore",
   "lat": null,
   "lon": null
  },
  {
   "code": 95,
   "name": "Florida",
   "lat": null,
   "lon": null
  },
  {
   "code": 97,
   "name": "North Carolina",
   "lat": null,
   "lon": null
  },
  {
   "code": 96,
   "name": "South Carolina",
   "lat": null,
   "lon": null
  },
  {
   "code": 6,
   "name": "McQueen Inlet",
   "lat": null,
   "lon": null
  },
  {
   "code": 94,
   "name": "Georgia",
   "lat": null,
   "lon": null
  }
 ],
 "species": [
  {
   "code": 1,
   "sci": "Cynoscion nebulosus",
   "common": "Sea Trout, Spotted",
   "letter": "spotted seatrout"
  },
  {
   "code": 2,
   "sci": "Cynoscion regalis",
   "common": "Weakfish",
   "letter": "weakfish"
  },
  {
   "code": 3,
   "sci": "Sciaenops ocellatus",
   "common": "Drum, Red",
   "letter": "red drum"
  },
  {
   "code": 4,
   "sci": "Paralichthys lethostigma",
   "common": "Flounder, Southern",
   "letter": "Southern flounder"
  },
  {
   "code": 5,
   "sci": "Paralichthys dentatus",
   "common": "Flounder, Summer",
   "letter": "summer flounder"
  },
  {
   "code": 6,
   "sci": "Pogonias cromis",
   "common": "Drum, Black",
   "letter": "black drum"
  },
  {
   "code": 7,
   "sci": "Archosargus probatocephalus",
   "common": "Sheepshead",
   "letter": "sheepshead"
  },
  {
   "code": 8,
   "sci": "Micropogonias undulatus",
   "common": "Croaker, Atlantic",
   "letter": "Atlantic croaker"
  },
  {
   "code": 9,
   "sci": "Leiostomus xanthurus",
   "common": "Spot",
   "letter": "spot"
  },
  {
   "code": 10,
   "sci": "Menticirrhus americanus",
   "common": "Kingfish, Southern",
   "letter": "Southern kingfish (whiting)"
  },
  {
   "code": 11,
   "sci": "Menticirrhus littoralis",
   "common": "Kingfish, Gulf",
   "letter": ""
  },
  {
   "code": 12,
   "sci": "Menticirrhus saxatilis",
   "common": "Kingfish, Northern",
   "letter": "Northern kingfish"
  },
  {
   "code": 14,
   "sci": "Pomatomus saltatrix",
   "common": "Bluefish",
   "letter": "bluefish"
  },
  {
   "code": 15,
   "sci": "Acipenser oxyrhynchus",
   "common": "Sturgeon, Atlantic",
   "letter": ""
  },
  {
   "code": 17,
   "sci": "Centropristis philadelphica",
   "common": "Sea Bass, Rock",
   "letter": ""
  },
  {
   "code": 21,
   "sci": "Symphurus plagiusa",
   "common": "Tonguefish, Black-cheeked",
   "letter": ""
  },
  {
   "code": 23,
   "sci": "Gymnura altavela",
   "common": "Ray, Smooth Butterfly",
   "letter": ""
  },
  {
   "code": 24,
   "sci": "Chloroscombrus chysurus",
   "common": "Bumper, Atlantic",
   "letter": ""
  },
  {
   "code": 26,
   "sci": "Etropus crossotus",
   "common": "Flounder, Fringed",
   "letter": ""
  },
  {
   "code": 27,
   "sci": "Bagre marinus",
   "common": "Catfish, Gaff Top-sail",
   "letter": ""
  },
  {
   "code": 30,
   "sci": "Peprilus alepidotus",
   "common": "Harvestfish",
   "letter": ""
  },
  {
   "code": 31,
   "sci": "Trinectes maculatus",
   "common": "Hogchoker",
   "letter": ""
  },
  {
   "code": 32,
   "sci": "Caranx hippos",
   "common": "Jack Crevalle",
   "letter": ""
  },
  {
   "code": 34,
   "sci": "Elops saurus",
   "common": "Ladyfish",
   "letter": ""
  },
  {
   "code": 35,
   "sci": "Synodus foetens",
   "common": "Lizardfish, Inshore",
   "letter": ""
  },
  {
   "code": 36,
   "sci": "Selene vomer",
   "common": "Lookdown",
   "letter": ""
  },
  {
   "code": 37,
   "sci": "Brevoortia tyrannus",
   "common": "Menhaden, Atlantic",
   "letter": ""
  },
  {
   "code": 38,
   "sci": "Mugil cephalus",
   "common": "Mullet, Striped",
   "letter": "striped mullet"
  },
  {
   "code": 39,
   "sci": "Anclyopsetta quadrocellata",
   "common": "Flounder, Ocellated",
   "letter": "ocellated flounder"
  },
  {
   "code": 40,
   "sci": "Lagodon rhomboides",
   "common": "Pinfish",
   "letter": ""
  },
  {
   "code": 42,
   "sci": "Trachinotus carolinus",
   "common": "Pompano, Florida",
   "letter": ""
  },
  {
   "code": 43,
   "sci": "Prionotus alatus",
   "common": "Sea Robin, Spiney",
   "letter": ""
  },
  {
   "code": 46,
   "sci": "Lagocephalus laevigatus",
   "common": "Puffer, Smooth",
   "letter": ""
  },
  {
   "code": 48,
   "sci": "Chaetodipterus faber",
   "common": "Spadefish, Atlantic",
   "letter": ""
  },
  {
   "code": 49,
   "sci": "Urophycis regia",
   "common": "Hake, Spotted",
   "letter": ""
  },
  {
   "code": 51,
   "sci": "Astroscopus y-graecum",
   "common": "Stargazer, Southern",
   "letter": ""
  },
  {
   "code": 53,
   "sci": "Prionotus evolans",
   "common": "Sea Robin, Striped",
   "letter": ""
  },
  {
   "code": 54,
   "sci": "Opsanus tau",
   "common": "Toadfish (Oyster)",
   "letter": ""
  },
  {
   "code": 55,
   "sci": "Bairdiella chrysoura",
   "common": "Perch, Silver (Yellowtail)",
   "letter": ""
  },
  {
   "code": 57,
   "sci": "Ictalurus punctatus",
   "common": "Catfish, Channel",
   "letter": ""
  },
  {
   "code": 58,
   "sci": "Ictaluridae spp.",
   "common": "Catfish, Freshwater",
   "letter": ""
  },
  {
   "code": 59,
   "sci": "Cyprinus carpio",
   "common": "Carp (Common)",
   "letter": ""
  },
  {
   "code": 62,
   "sci": "Morone saxatilis",
   "common": "Bass, Striped (Rockfish)",
   "letter": ""
  },
  {
   "code": 63,
   "sci": "Ictalurus furcatus",
   "common": "Catfish, Blue",
   "letter": ""
  },
  {
   "code": 64,
   "sci": "Rachycentron canadum",
   "common": "Cobia",
   "letter": "cobia"
  },
  {
   "code": 65,
   "sci": "Squalidae spp.",
   "common": "Shark, Dogfish",
   "letter": ""
  },
  {
   "code": 69,
   "sci": "Scomberomorus cavalla",
   "common": "Mackerel, King",
   "letter": ""
  },
  {
   "code": 70,
   "sci": "Scomberomorus maculatus",
   "common": "Mackerel, Spanish",
   "letter": ""
  },
  {
   "code": 71,
   "sci": "Mugil curema",
   "common": "Mullet, White (Silver)",
   "letter": ""
  },
  {
   "code": 72,
   "sci": "Diplectrum formosum",
   "common": "Perch, Sand",
   "letter": ""
  },
  {
   "code": 73,
   "sci": "Orthopristis chrysoptera",
   "common": "Pigfish",
   "letter": ""
  },
  {
   "code": 76,
   "sci": "Haemulon parra",
   "common": "Sailor's Choice",
   "letter": ""
  },
  {
   "code": 77,
   "sci": "Stenotomus chrysops",
   "common": "Scup",
   "letter": ""
  },
  {
   "code": 78,
   "sci": "Prionotus carolinus",
   "common": "Sea Robin, Northern",
   "letter": ""
  },
  {
   "code": 79,
   "sci": "Carcharhinus limbatus",
   "common": "Shark, Blacktip",
   "letter": ""
  },
  {
   "code": 80,
   "sci": "Carcharhinus plumbeus",
   "common": "Shark, Sandbar",
   "letter": ""
  },
  {
   "code": 83,
   "sci": "Dasyatis americana",
   "common": "Stingray, Southern",
   "letter": ""
  },
  {
   "code": 84,
   "sci": "Megalops atlanticus",
   "common": "Tarpon, Atlantic",
   "letter": ""
  },
  {
   "code": 86,
   "sci": "Lobotes surinamensis",
   "common": "Tripletail (Eddy fish)",
   "letter": "tripletail"
  },
  {
   "code": 87,
   "sci": "Odontaspis taurus",
   "common": "Shark, Sand Tiger",
   "letter": ""
  },
  {
   "code": 88,
   "sci": "Carcharhinus obscurus",
   "common": "Shark, Dusky",
   "letter": ""
  },
  {
   "code": 89,
   "sci": "Carcharhinus leucas",
   "common": "Shark, Bull",
   "letter": ""
  },
  {
   "code": 90,
   "sci": "Carcharhinus acronotos",
   "common": "Shark, Blacknose",
   "letter": ""
  },
  {
   "code": 91,
   "sci": "Carcharhinus brevipinna",
   "common": "Shark, Spinner",
   "letter": ""
  },
  {
   "code": 92,
   "sci": "Negaprion brevirostris",
   "common": "Shark, Lemon",
   "letter": ""
  },
  {
   "code": 93,
   "sci": "Carcharhinus isodon",
   "common": "Shark, Finetooth",
   "letter": ""
  },
  {
   "code": 94,
   "sci": "Sphyrna tiburo",
   "common": "Shark, Bonnethead",
   "letter": ""
  },
  {
   "code": 95,
   "sci": "Rhinobatos lentiginosus",
   "common": "Guitarfish, Atlantic",
   "letter": ""
  },
  {
   "code": 96,
   "sci": "Dasyatis sabina",
   "common": "Stingray, Atlantic",
   "letter": ""
  },
  {
   "code": 97,
   "sci": "Rhinoptera bonasus",
   "common": "Ray, Cownose",
   "letter": ""
  },
  {
   "code": 98,
   "sci": "Acipenser brevirostrum",
   "common": "Sturgeon, Shortnose",
   "letter": ""
  },
  {
   "code": 99,
   "sci": "Lepisosteus oculatus",
   "common": "Gar, Spotted",
   "letter": ""
  },
  {
   "code": 100,
   "sci": "Alosa mediocris",
   "common": "Shad, Hickory",
   "letter": ""
  },
  {
   "code": 101,
   "sci": "Dorosoma cepedianum",
   "common": "Shad, Gizzard",
   "letter": ""
  },
  {
   "code": 102,
   "sci": "Ameiurus catus",
   "common": "Catfish, White",
   "letter": ""
  },
  {
   "code": 103,
   "sci": "Triglidae spp.",
   "common": "Sea Robins",
   "letter": ""
  },
  {
   "code": 104,
   "sci": "Centropristis striata",
   "common": "Sea Bass, Black",
   "letter": "black sea bass"
  },
  {
   "code": 105,
   "sci": "Haemulidae spp.",
   "common": "Grunts",
   "letter": ""
  },
  {
   "code": 106,
   "sci": "Peprilus triacanthus",
   "common": "Butterfish",
   "letter": ""
  },
  {
   "code": 107,
   "sci": "Paralichthys oblongus",
   "common": "Flounder, Fourspot",
   "letter": ""
  },
  {
   "code": 108,
   "sci": "Trachinotus falcatus",
   "common": "Permit",
   "letter": ""
  },
  {
   "code": 109,
   "sci": "Opisthonema oglinum",
   "common": "Herring, Atlantic Thread",
   "letter": ""
  },
  {
   "code": 110,
   "sci": "Arius felis",
   "common": "Catfish, Sea",
   "letter": ""
  },
  {
   "code": 111,
   "sci": "Scophthalmus aquosus",
   "common": "Windowpane",
   "letter": ""
  },
  {
   "code": 114,
   "sci": "Urophycis floridana",
   "common": "Hake, Southern",
   "letter": ""
  },
  {
   "code": 115,
   "sci": "Chilomycterus schoepfi",
   "common": "Burrfish, Striped",
   "letter": ""
  },
  {
   "code": 117,
   "sci": "Limulus polyphemus",
   "common": "Crab, Horseshoe",
   "letter": ""
  },
  {
   "code": 119,
   "sci": "Dasyatis sayi",
   "common": "Ray, Bluntnose",
   "letter": ""
  },
  {
   "code": 120,
   "sci": "Raja eglanteria",
   "common": "Skate, Clearnose",
   "letter": ""
  },
  {
   "code": 121,
   "sci": "Squilla empusa",
   "common": "Mantis Shrimp",
   "letter": ""
  },
  {
   "code": 122,
   "sci": "Rhizoprionodon terraenovae",
   "common": "Shark, Atlantic Sharpnose",
   "letter": ""
  },
  {
   "code": 125,
   "sci": "Trichiurus lepturus",
   "common": "Cutlassfish, Atlantic",
   "letter": ""
  },
  {
   "code": 126,
   "sci": "Sphoeroides maculatus",
   "common": "Puffer, Northern",
   "letter": ""
  },
  {
   "code": 127,
   "sci": "Gymnura micrura",
   "common": "Spiny Butterfly Ray",
   "letter": ""
  },
  {
   "code": 129,
   "sci": "Alosa aestivalis",
   "common": "Blueback Herring",
   "letter": ""
  },
  {
   "code": 131,
   "sci": "Callinectes sapidus",
   "common": "Crab, Blue",
   "letter": ""
  },
  {
   "code": 132,
   "sci": "Prionotus tribulus",
   "common": "Bighead Searobin",
   "letter": ""
  },
  {
   "code": 133,
   "sci": "Malaclemys terrapin",
   "common": "Terrapin, Diamondback",
   "letter": ""
  },
  {
   "code": 138,
   "sci": "Caretta caretta",
   "common": "Loggerhead Turtle",
   "letter": ""
  },
  {
   "code": 139,
   "sci": "Chelonia m. mydas",
   "common": "Atl. Green Turtle",
   "letter": ""
  },
  {
   "code": 147,
   "sci": "Selene setapinnis",
   "common": "Moonfish, Atlantic",
   "letter": ""
  },
  {
   "code": 148,
   "sci": "Alosa spp.",
   "common": "Alosa spp.",
   "letter": ""
  },
  {
   "code": 149,
   "sci": "Callinectes similis",
   "common": "Crab, Lesser Blue",
   "letter": ""
  },
  {
   "code": 153,
   "sci": "Alosa sapidissima",
   "common": "Shad, American",
   "letter": ""
  },
  {
   "code": 154,
   "sci": "Penaeus",
   "common": "Shrimp",
   "letter": ""
  },
  {
   "code": 155,
   "sci": "Citharichthys spilopterus",
   "common": "Whiff, Bay",
   "letter": ""
  },
  {
   "code": 156,
   "sci": "Oligoplites saurus",
   "common": "Leatherjacket",
   "letter": ""
  },
  {
   "code": 157,
   "sci": "Caranx latus",
   "common": "Jack, Horse-eye",
   "letter": ""
  },
  {
   "code": 158,
   "sci": "Monacanthus hispidus",
   "common": "Filefish, Planehead",
   "letter": ""
  },
  {
   "code": 159,
   "sci": "Prionotus scitulus",
   "common": "Sea Robin, Leopard",
   "letter": ""
  },
  {
   "code": 163,
   "sci": "Sphyrna mokarran",
   "common": "Shark, Great Hammerhead",
   "letter": ""
  },
  {
   "code": 164,
   "sci": "Sphyrna lewini",
   "common": "Shark, Scalloped Hammerhead",
   "letter": ""
  },
  {
   "code": 165,
   "sci": "Sphyrna zygaena",
   "common": "Smooth Hammerhead",
   "letter": ""
  },
  {
   "code": 175,
   "sci": "Lepisosteus osseus",
   "common": "Gar, Longnose",
   "letter": ""
  },
  {
   "code": 176,
   "sci": "Libinia sp",
   "common": "Spider crabs",
   "letter": ""
  },
  {
   "code": 177,
   "sci": "Xanthidae",
   "common": "mud crabs",
   "letter": ""
  },
  {
   "code": 178,
   "sci": "Pagurus sp",
   "common": "hermit crabs",
   "letter": ""
  },
  {
   "code": 179,
   "sci": "Menippe mercenaria",
   "common": "Crab, Stone",
   "letter": ""
  },
  {
   "code": 180,
   "sci": "Porcellana sayana",
   "common": "spotted porcelean crab",
   "letter": ""
  },
  {
   "code": 181,
   "sci": "Ogcocephalus parvus",
   "common": "Batfish, Roughback",
   "letter": ""
  },
  {
   "code": 182,
   "sci": "Caranx crysos",
   "common": "Blue Runner",
   "letter": ""
  },
  {
   "code": 185,
   "sci": "Lutjanus spp.",
   "common": "Snapper spp.",
   "letter": ""
  },
  {
   "code": 187,
   "sci": "Citharichthys macrops",
   "common": "Spotted Whiff",
   "letter": ""
  },
  {
   "code": 197,
   "sci": "Myliobatis goodei",
   "common": "Southern Eagle Ray",
   "letter": ""
  },
  {
   "code": 198,
   "sci": "Aetobatus narinari",
   "common": "Ray, Spotted Eagle",
   "letter": ""
  },
  {
   "code": 206,
   "sci": "Ovalipes ocellatus",
   "common": "Lady Crab",
   "letter": ""
  },
  {
   "code": 213,
   "sci": "Mugil spp.",
   "common": "Mullet spp.",
   "letter": ""
  },
  {
   "code": 215,
   "sci": "Urophycis earlli",
   "common": "Carolina Hake",
   "letter": ""
  },
  {
   "code": 220,
   "sci": "Galeocerdo cuvier",
   "common": "Tiger Shark",
   "letter": ""
  },
  {
   "code": 221,
   "sci": "Cynoscion spp.",
   "common": "Weakfish or Silver Seatrout",
   "letter": ""
  },
  {
   "code": 222,
   "sci": "Portunus spinimanus",
   "common": "Blotched Swimming Crab",
   "letter": ""
  },
  {
   "code": 225,
   "sci": "Squalus acanthias",
   "common": "Spiny Dogfish",
   "letter": ""
  },
  {
   "code": 228,
   "sci": "Myliobatis freminvillei",
   "common": "Ray, Bullnose",
   "letter": ""
  },
  {
   "code": 230,
   "sci": "Brevoortia smithi",
   "common": "Yellowfin Menhaden",
   "letter": ""
  },
  {
   "code": 253,
   "sci": "Manta birostris",
   "common": "Manta Ray",
   "letter": ""
  },
  {
   "code": 258,
   "sci": "Mustelus canis",
   "common": "Shark, Smooth Dogfish",
   "letter": ""
  },
  {
   "code": 262,
   "sci": "Ginglymostoma cirratum",
   "common": "Shark, Nurse",
   "letter": ""
  },
  {
   "code": 266,
   "sci": "Family Bothidae",
   "common": "Left-eye flounder family",
   "letter": ""
  },
  {
   "code": 267,
   "sci": "Family Dasyatidae",
   "common": "Stingray genus",
   "letter": ""
  },
  {
   "code": 268,
   "sci": "Unidentified crab",
   "common": "Unidentified crab",
   "letter": ""
  },
  {
   "code": 269,
   "sci": "Unidentifed flounder",
   "common": "Unidentified flounder",
   "letter": ""
  },
  {
   "code": 270,
   "sci": "Unidentified sharks",
   "common": "Unidentified sharks",
   "letter": ""
  },
  {
   "code": 271,
   "sci": "Unidentified fish",
   "common": "Unidentified fish",
   "letter": ""
  },
  {
   "code": 272,
   "sci": "Unidentified bottom fish",
   "common": "Unidentified bottom fish",
   "letter": ""
  },
  {
   "code": 273,
   "sci": "Carcharhinus falciformis",
   "common": "Shark, Silky",
   "letter": ""
  },
  {
   "code": 280,
   "sci": "Pylodictis olivaris",
   "common": "Catfish, Flathead",
   "letter": ""
  },
  {
   "code": 288,
   "sci": "Synodus poeyi",
   "common": "Lizardfish, Offshore",
   "letter": ""
  },
  {
   "code": 999,
   "sci": "Unknown",
   "common": "Unknown",
   "letter": ""
  },
  {
   "code": 141,
   "sci": "Lepidochelys kempi",
   "common": "Kemp's Ridley Turtle",
   "letter": ""
  },
  {
   "code": 134,
   "sci": "Eucinostomus argenteus",
   "common": "Mojarra, Spotfin",
   "letter": ""
  },
  {
   "code": 124,
   "sci": "Gerres cinereus",
   "common": "Mojarra, Yellowfin",
   "letter": ""
  }
 ],
 "bioParms": [
  {
   "species": 1,
   "soundSystem": 94,
   "flMin": 130,
   "flMax": 468,
   "flSLm": 0.8719596221278136,
   "flSLb": -5.60740673234487,
   "flTWa": 8.155593221658002e-06,
   "flTWb": 3.033399572406971,
   "slTWa": 8.155593221658002e-06,
   "slTWb": 3.033399572406971
  },
  {
   "species": 3,
   "soundSystem": 3,
   "flMin": 145,
   "flMax": 656,
   "flSLm": 0.9228790886338145,
   "flSLb": -28.673349443341927,
   "flTWa": 1.8786623856074425e-05,
   "flTWb": 2.9131139254240437,
   "slTWa": 0.0001633205284415749,
   "slTWb": 2.621414106100617
  },
  {
   "species": 3,
   "soundSystem": 10,
   "flMin": 233,
   "flMax": 690,
   "flSLm": 0.9030846747326121,
   "flSLb": -24.856663885988645,
   "flTWa": 4.274883173054869e-06,
   "flTWb": 3.16603947106306,
   "slTWa": 2.5064664052369115e-05,
   "slTWb": 2.957716254266182
  },
  {
   "species": 3,
   "soundSystem": 11,
   "flMin": 241,
   "flMax": 740,
   "flSLm": 0.9085904083968376,
   "flSLb": -24.052233981675172,
   "flTWa": 1.8574492071350062e-05,
   "flTWb": 2.929988852518127,
   "slTWa": 8.496577004627061e-05,
   "slTWb": 2.75333732635736
  },
  {
   "species": 3,
   "soundSystem": 94,
   "flMin": 145,
   "flMax": 740,
   "flSLm": 0.9017894609183276,
   "flSLb": -23.23469662489009,
   "flTWa": 8.156645362736915e-06,
   "flTWb": 3.0622499900206277,
   "slTWa": 8.156645362736915e-06,
   "slTWb": 3.0622499900206277
  },
  {
   "species": 4,
   "soundSystem": 3,
   "flMin": 124,
   "flMax": 475,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 4,
   "soundSystem": 10,
   "flMin": 167,
   "flMax": 610,
   "flSLm": 0.8451001282859678,
   "flSLb": -8.826933530472829,
   "flTWa": 2.166738841773558e-05,
   "flTWb": 2.9092077691204383,
   "slTWa": 2.0630558726542616e-06,
   "slTWb": 3.399142727771306
  },
  {
   "species": 4,
   "soundSystem": 11,
   "flMin": 148,
   "flMax": 518,
   "flSLm": 0.6759133964817358,
   "flSLb": 77.08953540820745,
   "flTWa": 1.241595523800831e-09,
   "flTWb": 4.48544256566301,
   "slTWa": 1.1793873304253593e-08,
   "slTWb": 4.210531747118495
  },
  {
   "species": 4,
   "soundSystem": 94,
   "flMin": 124,
   "flMax": 610,
   "flSLm": 0.8426973654036407,
   "flSLb": -7.1137246679722494,
   "flTWa": 1.8132726588558388e-05,
   "flTWb": 2.9389547514036947,
   "slTWa": 2.4098647195559314e-07,
   "slTWb": 3.640483007478958
  },
  {
   "species": 6,
   "soundSystem": 10,
   "flMin": 200,
   "flMax": 522,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 6,
   "soundSystem": 94,
   "flMin": 181,
   "flMax": 522,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 7,
   "soundSystem": 94,
   "flMin": 193,
   "flMax": 674,
   "flSLm": 1.003030303030303,
   "flSLb": -50.0,
   "flTWa": 8.005113720595834e-05,
   "flTWb": 2.8000000000000003,
   "slTWa": 8.005113720595834e-05,
   "slTWb": 2.8000000000000003
  },
  {
   "species": 8,
   "soundSystem": 3,
   "flMin": 165,
   "flMax": 280,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 8,
   "soundSystem": 10,
   "flMin": 201,
   "flMax": 301,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 8,
   "soundSystem": 11,
   "flMin": 199,
   "flMax": 291,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 8,
   "soundSystem": 94,
   "flMin": 165,
   "flMax": 301,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 9,
   "soundSystem": 3,
   "flMin": 115,
   "flMax": 257,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 9,
   "soundSystem": 10,
   "flMin": 176,
   "flMax": 259,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 9,
   "soundSystem": 11,
   "flMin": 100,
   "flMax": 231,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 9,
   "soundSystem": 94,
   "flMin": 100,
   "flMax": 259,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 10,
   "soundSystem": 3,
   "flMin": 241,
   "flMax": 380,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 10,
   "soundSystem": 11,
   "flMin": 217,
   "flMax": 366,
   "flSLm": 0.7696476964769647,
   "flSLb": 25.0,
   "flTWa": 6.681956854163505e-05,
   "flTWb": 2.7,
   "slTWa": 6.081225574908848e-05,
   "slTWb": 2.8000000000000003
  },
  {
   "species": 10,
   "soundSystem": 94,
   "flMin": 217,
   "flMax": 380,
   "flSLm": 0.7696476964769647,
   "flSLb": 25.0,
   "flTWa": 6.681956854163505e-05,
   "flTWb": 2.7,
   "slTWa": 6.681956854163505e-05,
   "slTWb": 2.7
  },
  {
   "species": 14,
   "soundSystem": 94,
   "flMin": 180,
   "flMax": 745,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 16,
   "soundSystem": 3,
   "flMin": 266,
   "flMax": 397,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 16,
   "soundSystem": 10,
   "flMin": 248,
   "flMax": 346,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 16,
   "soundSystem": 11,
   "flMin": 247,
   "flMax": 385,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 16,
   "soundSystem": 94,
   "flMin": 247,
   "flMax": 397,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 23,
   "soundSystem": 3,
   "flMin": 79,
   "flMax": 220,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 23,
   "soundSystem": 94,
   "flMin": 65,
   "flMax": 220,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 30,
   "soundSystem": 11,
   "flMin": 96,
   "flMax": 151,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 30,
   "soundSystem": 94,
   "flMin": 96,
   "flMax": 151,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 34,
   "soundSystem": 3,
   "flMin": 305,
   "flMax": 554,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 34,
   "soundSystem": 11,
   "flMin": 273,
   "flMax": 488,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 34,
   "soundSystem": 94,
   "flMin": 273,
   "flMax": 554,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 37,
   "soundSystem": 94,
   "flMin": 115,
   "flMax": 188,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 38,
   "soundSystem": 3,
   "flMin": 211,
   "flMax": 370,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 38,
   "soundSystem": 10,
   "flMin": 203,
   "flMax": 385,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 38,
   "soundSystem": 11,
   "flMin": 220,
   "flMax": 318,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 38,
   "soundSystem": 94,
   "flMin": 203,
   "flMax": 385,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 40,
   "soundSystem": 3,
   "flMin": 122,
   "flMax": 182,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 40,
   "soundSystem": 11,
   "flMin": 136,
   "flMax": 262,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 40,
   "soundSystem": 94,
   "flMin": 122,
   "flMax": 262,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 73,
   "soundSystem": 11,
   "flMin": 177,
   "flMax": 228,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 73,
   "soundSystem": 94,
   "flMin": 175,
   "flMax": 228,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 94,
   "soundSystem": 3,
   "flMin": 81,
   "flMax": 991,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 94,
   "soundSystem": 11,
   "flMin": 439,
   "flMax": 1134,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 94,
   "soundSystem": 94,
   "flMin": 81,
   "flMax": 1134,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 96,
   "soundSystem": 3,
   "flMin": 160,
   "flMax": 451,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 1,
   "soundSystem": 3,
   "flMin": 130,
   "flMax": 468,
   "flSLm": 0.9070933937175802,
   "flSLb": -16.80036486328892,
   "flTWa": 8.255150564698887e-06,
   "flTWb": 3.03381371601745,
   "slTWa": 3.5176627446692466e-05,
   "slTWb": 2.860537365133121
  },
  {
   "species": 1,
   "soundSystem": 10,
   "flMin": 270,
   "flMax": 449,
   "flSLm": 0.836540583524379,
   "flSLb": 3.9708693772821135,
   "flTWa": 3.577084000249258e-06,
   "flTWb": 3.1703784504933745,
   "slTWa": 6.8475755213445695e-06,
   "slTWb": 3.148553451170234
  },
  {
   "species": 1,
   "soundSystem": 11,
   "flMin": 284,
   "flMax": 461,
   "flSLm": 0.8547112293224693,
   "flSLb": 0.3478596797802709,
   "flTWa": 6.569184637368103e-06,
   "flTWb": 3.0667267760436654,
   "slTWa": 2.253497756938628e-05,
   "slTWb": 2.9345731698913466
  },
  {
   "species": 96,
   "soundSystem": 11,
   "flMin": 146,
   "flMax": 472,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 96,
   "soundSystem": 94,
   "flMin": 146,
   "flMax": 472,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 102,
   "soundSystem": 10,
   "flMin": 119,
   "flMax": 400,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 102,
   "soundSystem": 11,
   "flMin": 129,
   "flMax": 324,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 102,
   "soundSystem": 94,
   "flMin": 119,
   "flMax": 400,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 108,
   "soundSystem": 94,
   "flMin": 108,
   "flMax": 239,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 113,
   "soundSystem": 3,
   "flMin": 234,
   "flMax": 817,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 113,
   "soundSystem": 94,
   "flMin": 234,
   "flMax": 817,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 157,
   "soundSystem": 3,
   "flMin": 100,
   "flMax": 1170,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 157,
   "soundSystem": 10,
   "flMin": 498,
   "flMax": 1122,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 157,
   "soundSystem": 11,
   "flMin": 546,
   "flMax": 985,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 157,
   "soundSystem": 94,
   "flMin": 100,
   "flMax": 1170,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 158,
   "soundSystem": 10,
   "flMin": 149,
   "flMax": 686,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 158,
   "soundSystem": 94,
   "flMin": 149,
   "flMax": 686,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 164,
   "soundSystem": 3,
   "flMin": 185,
   "flMax": 302,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  },
  {
   "species": 164,
   "soundSystem": 94,
   "flMin": 185,
   "flMax": 302,
   "flSLm": null,
   "flSLb": null,
   "flTWa": null,
   "flTWb": null,
   "slTWa": null,
   "slTWb": null
  }
 ],
 "subSample": [
  {
   "species": 3,
   "size": 1,
   "min": 500,
   "max": 1000
  },
  {
   "species": 1,
   "size": 3,
   "min": 400,
   "max": 1000
  }
 ],
 "stationsWAS": [
  {
   "station": "WAS0001",
   "location": "New Cut, near Wassaw Island N end",
   "lat": 31.90894799,
   "lon": -80.97779528,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0002",
   "location": "New Cut, N section",
   "lat": 31.91257954,
   "lon": -80.9779501,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0003",
   "location": "New Cut, N end, E side creek",
   "lat": 31.91318035,
   "lon": -80.97653389,
   "habitat": "MUD",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0004",
   "location": "New Cut mouth, Dead Man Hammock",
   "lat": 31.91672087,
   "lon": -80.97207069,
   "habitat": "MUD",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "WAS0005",
   "location": "Old Romerly Marsh Channel, SW bend",
   "lat": 31.91223621,
   "lon": -80.98861456,
   "habitat": "MUD",
   "depth": "7",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0006",
   "location": "Old Romerly Marsh Channel, SE bend",
   "lat": 31.91236496,
   "lon": -80.98756313,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0007",
   "location": "Old Romerly Marsh Channel, S bend",
   "lat": 31.91468239,
   "lon": -80.98610401,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "WAS0008",
   "location": "Old Romerly Marsh Channel, near New Cut",
   "lat": 31.9152832,
   "lon": -80.98288536,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0009",
   "location": "Old Romerly Marsh Channel, at New Cut",
   "lat": 31.91632918,
   "lon": -80.97987492,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0010",
   "location": "Old Romerly Marsh Channel, Dead Man Hammock",
   "lat": 31.91873789,
   "lon": -80.97990274,
   "habitat": "MUD",
   "depth": "6",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0011",
   "location": "Old Romerly Marsh Channel, Dead Man Hammock",
   "lat": 31.92076924,
   "lon": -80.98213099,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0012",
   "location": "Old Romerly Marsh Channel, NE bend",
   "lat": 31.92433834,
   "lon": -80.97996712,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0013",
   "location": "Old Romerly Marsh Channel, N bend",
   "lat": 31.92369461,
   "lon": -80.9838295,
   "habitat": "SHELL",
   "depth": "0",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0014",
   "location": "Old Romerly Marsh Channel, central loop",
   "lat": 31.92058325,
   "lon": -80.98552465,
   "habitat": "SHELL",
   "depth": "7",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0015",
   "location": "Old Romerly Marsh Channel, W bend",
   "lat": 31.9171009,
   "lon": -80.99033193,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0016",
   "location": "Old Romerly Marsh Channel, W end",
   "lat": 31.91734314,
   "lon": -80.99292755,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0017",
   "location": "Old Romerly Marsh Channel, W end",
   "lat": 31.91826582,
   "lon": -80.99380732,
   "habitat": "MUD",
   "depth": "6",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0018",
   "location": "Old Romerly Marsh Channel, N end",
   "lat": 31.92368899,
   "lon": -80.98884003,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0019",
   "location": "Old Romerly Marsh Channel, N mouth",
   "lat": 31.92569026,
   "lon": -80.98710749,
   "habitat": "SHELL",
   "depth": "8",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0020",
   "location": "Old Romerly Marsh Channel side creek",
   "lat": 31.91963911,
   "lon": -80.99805593,
   "habitat": "MUD",
   "depth": "7",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0021",
   "location": "Old Romerly Marsh Channel side creek",
   "lat": 31.91882372,
   "lon": -81.00007296,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0022",
   "location": "Romerly Marsh Creek, mouth, near Joes Cut",
   "lat": 31.93178415,
   "lon": -80.9843874,
   "habitat": "MUD",
   "depth": "2",
   "gear": "GILL"
  },
  {
   "station": "WAS0023",
   "location": "Romerly Marsh Creek, Sister side, near mouth",
   "lat": 31.9316461,
   "lon": -80.98601131,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0024",
   "location": "Romerly Marsh Creek, Sister side, lower",
   "lat": 31.9314073,
   "lon": -80.98989992,
   "habitat": "SHELL",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "WAS0025",
   "location": "Romerly Marsh Creek, Sister side, mid",
   "lat": 31.93152431,
   "lon": -80.99331362,
   "habitat": "SHELL",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0026",
   "location": "Romerly Marsh Creek, Sister side, E Habersham",
   "lat": 31.93100204,
   "lon": -80.99730927,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0027",
   "location": "Romerly Marsh Creek, at side creek mouth",
   "lat": 31.93077648,
   "lon": -81.00042835,
   "habitat": "SHELL",
   "depth": "7",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0028",
   "location": "Romerly Marsh Creek, N-Bank, at Habersham Creek",
   "lat": 31.93166622,
   "lon": -81.00507502,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0029",
   "location": "Romerly Marsh Creek, N-Bank, near Habersham Creek",
   "lat": 31.93143697,
   "lon": -81.00920076,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0030",
   "location": "Habersham Creek, N end",
   "lat": 31.92764274,
   "lon": -81.00868201,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0031",
   "location": "Romerly Marsh Creek, Skidaway side, W reach",
   "lat": 31.93183922,
   "lon": -81.01267431,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0032",
   "location": "Romerly Marsh Creek S branch, lower",
   "lat": 31.92911594,
   "lon": -81.01525619,
   "habitat": "MUD",
   "depth": "7",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0033",
   "location": "Romerly Marsh Creek S branch, near Landings",
   "lat": 31.92927252,
   "lon": -81.02047635,
   "habitat": "MUD",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0034",
   "location": "Romerly Marsh Creek S branch, W end",
   "lat": 31.92965984,
   "lon": -81.02329016,
   "habitat": "MUD",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0035",
   "location": "Romerly Marsh Creek S branch, W end",
   "lat": 31.92699909,
   "lon": -81.02335453,
   "habitat": "MUD",
   "depth": "8",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0036",
   "location": "Romerly Marsh Creek S branch, near Landings",
   "lat": 31.92735507,
   "lon": -81.01935158,
   "habitat": "SHELL",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "WAS0037",
   "location": "Romerly Marsh Creek, S-Bank, near The Landings",
   "lat": 31.9341445,
   "lon": -81.02455616,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0038",
   "location": "Romerly Marsh Creek, N-Bank, near The Landings",
   "lat": 31.93433762,
   "lon": -81.02022171,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0039",
   "location": "Romerly Marsh Creek, Skidaway side, W reach",
   "lat": 31.93370294,
   "lon": -81.01607434,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0040",
   "location": "Joes Cut, W of Sister Island",
   "lat": 31.93429604,
   "lon": -80.98500992,
   "habitat": "MUD",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "WAS0041",
   "location": "Romerly Marsh Creek side creek, Joes Cut",
   "lat": 31.93359238,
   "lon": -80.99149701,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0042",
   "location": "Romerly Marsh Creek side creek, Joes Cut",
   "lat": 31.93487305,
   "lon": -80.99415047,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0043",
   "location": "Romerly Marsh Creek side creek, Joes Cut",
   "lat": 31.93456041,
   "lon": -80.99629448,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0044",
   "location": "Joes Cut, N end, at Sister Island",
   "lat": 31.93697557,
   "lon": -80.98501713,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0045",
   "location": "Romerly Marsh Creek side creek, Joes Cut",
   "lat": 31.93611374,
   "lon": -80.9903994,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0046",
   "location": "Romerly Marsh Creek side creek, Joes Cut",
   "lat": 31.93714262,
   "lon": -80.9937074,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0047",
   "location": "Romerly Marsh Creek side creek, lower",
   "lat": 31.9382,
   "lon": -81.00151062,
   "habitat": "MUD",
   "depth": "8",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0048",
   "location": "Romerly Marsh Creek side creek, E bend",
   "lat": 31.94137573,
   "lon": -81.00333452,
   "habitat": "MUD",
   "depth": "8",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0049",
   "location": "Romerly Marsh Creek side creek, W bend",
   "lat": 31.94189072,
   "lon": -81.0095787,
   "habitat": "MUD",
   "depth": "5",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0050",
   "location": "Romerly Marsh Creek side creek, W fork",
   "lat": 31.94120407,
   "lon": -81.01288319,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0051",
   "location": "Romerly Marsh Creek side creek, NW fork",
   "lat": 31.94446815,
   "lon": -81.01600612,
   "habitat": "MUD",
   "depth": "7",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0052",
   "location": "Romerly Marsh Creek side creek, N end",
   "lat": 31.94779158,
   "lon": -81.01483583,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0053",
   "location": "Romerly Marsh Creek side creek, E fork",
   "lat": 31.94524725,
   "lon": -81.00491518,
   "habitat": "MUD",
   "depth": "7",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0054",
   "location": "Romerly Marsh Creek side creek, NE fork",
   "lat": 31.9482737,
   "lon": -81.00528834,
   "habitat": "MUD",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "WAS0055",
   "location": "Wilmington River, Skidaway side, above Joes Cut",
   "lat": 31.9486581,
   "lon": -81.00104316,
   "habitat": "SHELL",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "WAS0056",
   "location": "Wilmington River, Skidaway side, above Joes Cut",
   "lat": 31.94739352,
   "lon": -80.99799341,
   "habitat": "SHELL",
   "depth": "2",
   "gear": "BOTH"
  },
  {
   "station": "WAS0057",
   "location": "Wilmington River, Skidaway side, above Joes Cut",
   "lat": 31.94556459,
   "lon": -80.9929097,
   "habitat": "SHELL",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "WAS0058",
   "location": "Wilmington River, W-Bank, above Joes Cut",
   "lat": 31.94480896,
   "lon": -80.99009514,
   "habitat": "SHELL",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "WAS0059",
   "location": "Wilmington River, W-Bank, S of Priest Landing",
   "lat": 31.95159872,
   "lon": -81.00566645,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0060",
   "location": "Wilmington River, W-Bank, S of Priest Landing",
   "lat": 31.95499884,
   "lon": -81.00937402,
   "habitat": "SHELL",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "WAS0061",
   "location": "Wilmington River, Skidaway side, at Priest Landing",
   "lat": 31.96188927,
   "lon": -81.01238371,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0062",
   "location": "Wilmington River, W-Bank, S of Groves Creek",
   "lat": 31.96664675,
   "lon": -81.01341074,
   "habitat": "SHELL",
   "depth": "2",
   "gear": "BOTH"
  },
  {
   "station": "WAS0063",
   "location": "Wilmington River, Skidaway side, at Groves Creek",
   "lat": 31.97053537,
   "lon": -81.01296122,
   "habitat": "SHELL",
   "depth": "2",
   "gear": "GILL"
  },
  {
   "station": "WAS0064",
   "location": "Groves Creek, lower, near mouth",
   "lat": 31.97375536,
   "lon": -81.01562977,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0065",
   "location": "Groves Creek, W of Wilmington River",
   "lat": 31.9728756,
   "lon": -81.01917028,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0066",
   "location": "Groves Creek, upper",
   "lat": 31.97419172,
   "lon": -81.02390061,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0067",
   "location": "Groves Creek, upper, W end",
   "lat": 31.97274685,
   "lon": -81.02715254,
   "habitat": "MUD",
   "depth": "0",
   "gear": "BOTH"
  },
  {
   "station": "WAS0068",
   "location": "Groves Creek, upper, W end",
   "lat": 31.97115898,
   "lon": -81.02683067,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0069",
   "location": "Groves Creek, upper, S bend",
   "lat": 31.96918488,
   "lon": -81.02352619,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0070",
   "location": "Groves Creek side creek, W Sister Island",
   "lat": 31.97776794,
   "lon": -81.01550102,
   "habitat": "MUD",
   "depth": "7",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0071",
   "location": "Wilmington River, back channel W Sister Island",
   "lat": 31.97796106,
   "lon": -81.01099491,
   "habitat": "MUD",
   "depth": "6",
   "gear": "GILL"
  },
  {
   "station": "WAS0072",
   "location": "Groves Creek side creek, W Sister Island",
   "lat": 31.98019266,
   "lon": -81.01462126,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "WAS0073",
   "location": "Wilmington River, back channel W Sister Island",
   "lat": 31.9801712,
   "lon": -81.01103783,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0074",
   "location": "Wilmington River, back channel, N Sister Island",
   "lat": 31.9818449,
   "lon": -81.00968599,
   "habitat": "MUD",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "WAS0075",
   "location": "Groves Creek side creek, upper",
   "lat": 31.98276758,
   "lon": -81.01575851,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0076",
   "location": "Wilmington River, Sister side",
   "lat": 31.98432226,
   "lon": -81.00809251,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0077",
   "location": "Wilmington River, E-Bank, at Cabbage Island",
   "lat": 31.94156885,
   "lon": -80.97511768,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0078",
   "location": "Wilmington River, Cabbage side",
   "lat": 31.94712639,
   "lon": -80.97988129,
   "habitat": "SHELL",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "WAS0079",
   "location": "Tybee Cut, mouth at Wilmington River",
   "lat": 31.95181137,
   "lon": -80.98553974,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "WAS0080",
   "location": "Wilmington River, E-Bank, near Tybee Cut",
   "lat": 31.95204229,
   "lon": -80.99061582,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0081",
   "location": "Wilmington River, E-Bank, near Tybee Cut",
   "lat": 31.95328474,
   "lon": -80.99292755,
   "habitat": "SHELL",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "WAS0082",
   "location": "Wilmington River, E-Bank, N of Tybee Cut",
   "lat": 31.95425034,
   "lon": -80.99494457,
   "habitat": "SHELL",
   "depth": "2",
   "gear": "GILL"
  },
  {
   "station": "WAS0083",
   "location": "Wilmington River, E-Bank, N of Tybee Cut",
   "lat": 31.95472735,
   "lon": -80.99769375,
   "habitat": "SHELL",
   "depth": "2",
   "gear": "BOTH"
  },
  {
   "station": "WAS0084",
   "location": "Wilmington River, E-Bank, across from Priest Landing",
   "lat": 31.95637465,
   "lon": -81.00121021,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0085",
   "location": "Wilmington River, E-Bank, across from Priest Landing",
   "lat": 31.96199697,
   "lon": -81.00412569,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0086",
   "location": "Wilmington River, E-Bank, N of Priest Landing",
   "lat": 31.9660306,
   "lon": -81.00485802,
   "habitat": "SHELL",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "WAS0087",
   "location": "Wilmington River, E-Bank, across from Groves Creek",
   "lat": 31.96921203,
   "lon": -81.00437924,
   "habitat": "SHELL",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "WAS0088",
   "location": "Wilmington River, Sister side",
   "lat": 31.99143874,
   "lon": -81.0040407,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0089",
   "location": "Wilmington River, W-Bank, E of Modena Island",
   "lat": 31.99517012,
   "lon": -81.00492239,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0090",
   "location": "Wilmington River, W-Bank, E of Modena Island",
   "lat": 31.99868917,
   "lon": -81.00494385,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0091",
   "location": "Wilmington River, W-Bank, E of Modena Island",
   "lat": 32.00171622,
   "lon": -81.00565966,
   "habitat": "MUD",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "WAS0092",
   "location": "Wilmington River, W side, off Modena Island",
   "lat": 32.00593038,
   "lon": -81.00747644,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0093",
   "location": "Wilmington River, E-Bank, S of Turner Creek",
   "lat": 32.00688601,
   "lon": -81.00286245,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0094",
   "location": "Turner Creek, mouth, near Turners Rock",
   "lat": 32.01079088,
   "lon": -81.00369696,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "WAS0095",
   "location": "Turner Creek, Wilmington side",
   "lat": 32.01034002,
   "lon": -81.00113461,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0096",
   "location": "Turner Creek, lower",
   "lat": 32.01012469,
   "lon": -80.99746568,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0097",
   "location": "Turner Creek, S bend",
   "lat": 32.0082593,
   "lon": -80.99226236,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0098",
   "location": "Turner Creek, Whitemarsh side, mid",
   "lat": 32.01053381,
   "lon": -80.99043846,
   "habitat": "SHELL",
   "depth": "7",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0099",
   "location": "Turner Creek, Wilmington side, mid",
   "lat": 32.01268821,
   "lon": -80.98920045,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0100",
   "location": "Turner Creek, below Johnny Mercer bridge",
   "lat": 32.01599973,
   "lon": -80.99045078,
   "habitat": "MUD",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "WAS0101",
   "location": "Turner Creek, at Johnny Mercer bridge",
   "lat": 32.01922274,
   "lon": -80.99290978,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "WAS0102",
   "location": "Turner Creek, above Johnny Mercer bridge",
   "lat": 32.02111244,
   "lon": -80.99020243,
   "habitat": "SHELL",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0103",
   "location": "Turner Creek, at Squaw Town Creek",
   "lat": 32.02093542,
   "lon": -80.98544972,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0104",
   "location": "Squaw Town Creek, lower",
   "lat": 32.0209837,
   "lon": -80.9839797,
   "habitat": "MUD",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "WAS0105",
   "location": "Turner Creek, upper, near Camoos Creek",
   "lat": 32.02317238,
   "lon": -80.9869194,
   "habitat": "MUD",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "WAS0106",
   "location": "Turner Creek, upper",
   "lat": 32.02394485,
   "lon": -80.98998785,
   "habitat": "MUD",
   "depth": "7",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0107",
   "location": "Turner Creek, upper, W of Talahi Island",
   "lat": 32.02731371,
   "lon": -80.99155426,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0108",
   "location": "Turner Creek, N side creek, lower",
   "lat": 32.0113492,
   "lon": -80.99805593,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0109",
   "location": "Turner Creek, mouth, N side",
   "lat": 32.01166218,
   "lon": -81.00161405,
   "habitat": "SHELL",
   "depth": "6",
   "gear": "GILL"
  },
  {
   "station": "WAS0110",
   "location": "Wilmington River, Whitemarsh side, at Turners Rock",
   "lat": 32.01147049,
   "lon": -81.00593962,
   "habitat": "SHELL",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "WAS0111",
   "location": "Wilmington River, off Turner Creek mouth",
   "lat": 32.00884888,
   "lon": -81.00918048,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0112",
   "location": "Wilmington River, N-Bank, W of Turners Rock",
   "lat": 32.01293707,
   "lon": -81.00914955,
   "habitat": "SHELL",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "WAS0113",
   "location": "Bradley Creek, lower",
   "lat": 32.01810837,
   "lon": -81.00955725,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0114",
   "location": "Bradley Creek, upper",
   "lat": 32.02036142,
   "lon": -81.00895643,
   "habitat": "MUD",
   "depth": "6",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0115",
   "location": "Wilmington River, Whitemarsh side, at Bradley Creek",
   "lat": 32.01539188,
   "lon": -81.01349674,
   "habitat": "SHELL",
   "depth": "2",
   "gear": "GILL"
  },
  {
   "station": "WAS0116",
   "location": "Wilmington River, N-Bank, E of Bradley Creek",
   "lat": 32.01394558,
   "lon": -81.01118803,
   "habitat": "SHELL",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "WAS0117",
   "location": "Wilmington River, S side, off Turners Rock",
   "lat": 32.0095771,
   "lon": -81.01191575,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0118",
   "location": "Wilmington River, Whitemarsh side, at Bradley Creek",
   "lat": 32.01541794,
   "lon": -81.01465403,
   "habitat": "SHELL",
   "depth": "2",
   "gear": "GILL"
  },
  {
   "station": "WAS0119",
   "location": "Wilmington River, S-Bank, at Skidaway River mouth",
   "lat": 32.01123973,
   "lon": -81.01734881,
   "habitat": "SHELL",
   "depth": "2",
   "gear": "BOTH"
  },
  {
   "station": "WAS0120",
   "location": "Skidaway River, E-Bank, near mouth",
   "lat": 32.00586844,
   "lon": -81.01459846,
   "habitat": "SHELL",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "WAS0121",
   "location": "Skidaway River, E-Bank, N of Modena Island",
   "lat": 32.00315237,
   "lon": -81.01490021,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "WAS0122",
   "location": "Skidaway River, mouth, N end Modena Island",
   "lat": 32.00315237,
   "lon": -81.01153135,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0123",
   "location": "Wilmington River side creek, W Bradley Creek",
   "lat": 32.02348108,
   "lon": -81.01538552,
   "habitat": "MUD",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "WAS0124",
   "location": "Wilmington River, N-Bank, W of Bradley Creek",
   "lat": 32.02012438,
   "lon": -81.02009841,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0125",
   "location": "Wilmington River, S-Bank, across from Bradley Creek",
   "lat": 32.01518049,
   "lon": -81.02073477,
   "habitat": "SHELL",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "WAS0126",
   "location": "Wilmington River, Dutch side, near Skidaway River",
   "lat": 32.01327645,
   "lon": -81.0192412,
   "habitat": "MUD",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "WAS0127",
   "location": "Skidaway River, mouth, E of Dutch Island",
   "lat": 32.0102334,
   "lon": -81.01871967,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0128",
   "location": "Skidaway River, Dutch side, near mouth",
   "lat": 32.00683345,
   "lon": -81.02026463,
   "habitat": "MUD",
   "depth": "2",
   "gear": "BOTH"
  },
  {
   "station": "WAS0129",
   "location": "Skidaway River, W-Bank, N of Modena Island",
   "lat": 32.00248978,
   "lon": -81.01969231,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0130",
   "location": "Skidaway River, Dutch side, near Modena Island",
   "lat": 31.99926627,
   "lon": -81.01995961,
   "habitat": "SHELL",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "WAS0131",
   "location": "Skidaway River, S-Bank, off Modena Island",
   "lat": 31.99584293,
   "lon": -81.02034375,
   "habitat": "MUD",
   "depth": "2",
   "gear": "BOTH"
  },
  {
   "station": "WAS0132",
   "location": "Skidaway River, at SKIO docks",
   "lat": 31.99123138,
   "lon": -81.0203502,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0133",
   "location": "Skidaway River, N-Bank, E of Grimball Creek",
   "lat": 31.9928723,
   "lon": -81.02348864,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0134",
   "location": "Skidaway River, N-Bank, E of Grimball Creek",
   "lat": 31.99233125,
   "lon": -81.02713284,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0135",
   "location": "Skidaway River, N-Bank, near Grimball Creek",
   "lat": 31.99137211,
   "lon": -81.0308218,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0136",
   "location": "Skidaway River, S-Bank, near SKIO",
   "lat": 31.9884889,
   "lon": -81.02673562,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0137",
   "location": "Skidaway River, S-Bank, near SKIO",
   "lat": 31.98918343,
   "lon": -81.02391243,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "WAS0138",
   "location": "Skidaway River, N-Bank, at Grimball Creek",
   "lat": 31.99033451,
   "lon": -81.03564056,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0139",
   "location": "Skidaway River, S-Bank, W of SKIO",
   "lat": 31.98716666,
   "lon": -81.03400516,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0140",
   "location": "Skidaway River, E-Bank, S of SKIO",
   "lat": 31.98420525,
   "lon": -81.03567123,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0141",
   "location": "Skidaway River, E-Bank, S bend",
   "lat": 31.98047161,
   "lon": -81.03740931,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0142",
   "location": "Skidaway River, W-Bank, S of Grimball Point",
   "lat": 31.98856115,
   "lon": -81.03828907,
   "habitat": "SHELL",
   "depth": "2",
   "gear": "BOTH"
  },
  {
   "station": "WAS0143",
   "location": "Grimball Creek, mouth at Skidaway River",
   "lat": 31.99291706,
   "lon": -81.03927612,
   "habitat": "SHELL",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "WAS0144",
   "location": "Grimball Creek, lower",
   "lat": 31.99390411,
   "lon": -81.03871822,
   "habitat": "MUD",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0145",
   "location": "Grimball Creek, E side creek",
   "lat": 31.99793816,
   "lon": -81.03869677,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0146",
   "location": "Grimball Creek, upper",
   "lat": 31.99975544,
   "lon": -81.04256242,
   "habitat": "MUD",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "WAS0147",
   "location": "Grimball Creek, mid",
   "lat": 31.99587001,
   "lon": -81.04120782,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0148",
   "location": "Grimball Creek, lower",
   "lat": 31.99250945,
   "lon": -81.04088377,
   "habitat": "MUD",
   "depth": "6",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0149",
   "location": "Skidaway River, W-Bank, S of Grimball Point",
   "lat": 31.98699474,
   "lon": -81.04013443,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0150",
   "location": "Skidaway River, W-Bank, S of Grimball Point",
   "lat": 31.9850421,
   "lon": -81.04037046,
   "habitat": "SHELL",
   "depth": "7",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0151",
   "location": "Skidaway River, N-Bank, off Isle of Hope",
   "lat": 31.98169461,
   "lon": -81.04108737,
   "habitat": "SHELL",
   "depth": "2",
   "gear": "GILL"
  },
  {
   "station": "WAS0152",
   "location": "Skidaway River, Burntpot side, near Freedom Creek",
   "lat": 31.97769628,
   "lon": -81.04183487,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0153",
   "location": "Freedom Creek, near Burntpot Island",
   "lat": 31.97368981,
   "lon": -81.04263324,
   "habitat": "MUD",
   "depth": "7",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0154",
   "location": "Skidaway River side creek, near Freedom Creek",
   "lat": 31.97508574,
   "lon": -81.03745222,
   "habitat": "MUD",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "WAS0155",
   "location": "Skidaway River side creek, near Freedom Creek",
   "lat": 31.97618569,
   "lon": -81.03850147,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0156",
   "location": "Freedom Creek, mouth",
   "lat": 31.97545052,
   "lon": -81.04440451,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0157",
   "location": "Freedom Creek, lower",
   "lat": 31.97472095,
   "lon": -81.04444742,
   "habitat": "MUD",
   "depth": "7",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0158",
   "location": "Freedom Creek, upper, at Burntpot Island",
   "lat": 31.97124481,
   "lon": -81.04491949,
   "habitat": "MUD",
   "depth": "2",
   "gear": "GILL"
  },
  {
   "station": "WAS0159",
   "location": "Skidaway River, N-Bank, off Isle of Hope",
   "lat": 31.97980558,
   "lon": -81.04795944,
   "habitat": "MUD",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "WAS0160",
   "location": "Skidaway River, Burntpot side, at Freedom Creek",
   "lat": 31.97593725,
   "lon": -81.04735041,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "WAS0161",
   "location": "Skidaway River, W-Bank, Isle of Hope Marina",
   "lat": 31.98025703,
   "lon": -81.05157137,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0162",
   "location": "Skidaway River, at Isle of Hope Marina",
   "lat": 31.98051453,
   "lon": -81.05466127,
   "habitat": "SHELL",
   "depth": "7",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0163",
   "location": "Skidaway River, E side, Isle of Hope",
   "lat": 31.97751548,
   "lon": -81.05319235,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0164",
   "location": "Skidaway River, Burntpot side",
   "lat": 31.97399626,
   "lon": -81.05159249,
   "habitat": "MUD",
   "depth": "7",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0165",
   "location": "Skidaway River, Burntpot side",
   "lat": 31.96920751,
   "lon": -81.051967,
   "habitat": "SAND",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0166",
   "location": "Skidaway River, at Skidaway Narrows junction",
   "lat": 31.96754328,
   "lon": -81.05331967,
   "habitat": "SAND",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "WAS0167",
   "location": "Skidaway River, at Skidaway Narrows junction",
   "lat": 31.96590294,
   "lon": -81.05587548,
   "habitat": "SAND",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "WAS0168",
   "location": "Skidaway River, at Isle of Hope River",
   "lat": 31.96695244,
   "lon": -81.05875835,
   "habitat": "SHELL",
   "depth": "2",
   "gear": "GILL"
  },
  {
   "station": "WAS0169",
   "location": "Isle of Hope River, N end",
   "lat": 31.96575399,
   "lon": -81.06295835,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0170",
   "location": "Isle of Hope River, near Wormsloe",
   "lat": 31.96265361,
   "lon": -81.06401799,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0171",
   "location": "Isle of Hope River, at Long Island",
   "lat": 31.95981869,
   "lon": -81.06273707,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0172",
   "location": "Skidaway Narrows, N end, W side",
   "lat": 31.9590354,
   "lon": -81.0592103,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0173",
   "location": "Skidaway Narrows, N end, E side",
   "lat": 31.95958366,
   "lon": -81.05637395,
   "habitat": "MUD",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "WAS0174",
   "location": "Skidaway Narrows, N end, at Long Island",
   "lat": 31.96251154,
   "lon": -81.05775118,
   "habitat": "SAND",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0175",
   "location": "Isle of Hope River, at Wormsloe",
   "lat": 31.96489653,
   "lon": -81.06611129,
   "habitat": "SHELL",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0176",
   "location": "Skidaway Narrows, Long side",
   "lat": 31.95496229,
   "lon": -81.06269625,
   "habitat": "SAND",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "WAS0177",
   "location": "Skidaway Narrows, Skidaway Is. side, mid",
   "lat": 31.95611715,
   "lon": -81.05944633,
   "habitat": "MUD",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "WAS0178",
   "location": "Skidaway Narrows, above Diamond Causeway",
   "lat": 31.95197582,
   "lon": -81.06463909,
   "habitat": "SAND",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0179",
   "location": "Skidaway River, at Diamond Causeway bridge",
   "lat": 31.9486146,
   "lon": -81.06384968,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0180",
   "location": "Grimball Creek, upper, near Herb River",
   "lat": 31.99867333,
   "lon": -81.0456193,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0181",
   "location": "Herb River, E-Bank, near Wylly Island",
   "lat": 32.0015645,
   "lon": -81.04912519,
   "habitat": "MUD",
   "depth": "7",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0182",
   "location": "Herb River, Wylly side",
   "lat": 32.0021224,
   "lon": -81.05257988,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0183",
   "location": "Herb River, Wylly side",
   "lat": 31.99998837,
   "lon": -81.05327097,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "WAS0184",
   "location": "Herb Creek, near Isle of Hope",
   "lat": 31.99480534,
   "lon": -81.05541229,
   "habitat": "MUD",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0185",
   "location": "Herb River, near Sylvan Island",
   "lat": 32.00649977,
   "lon": -81.04940414,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0186",
   "location": "Herb River, at Country Club Creek",
   "lat": 32.00705993,
   "lon": -81.05183288,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "WAS0187",
   "location": "Country Club Creek, mouth at Herb River",
   "lat": 32.00776862,
   "lon": -81.0547896,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "WAS0188",
   "location": "Country Club Creek, N of Wylly Island",
   "lat": 32.01231237,
   "lon": -81.05592242,
   "habitat": "MUD",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "WAS0189",
   "location": "Herb River, W-Bank, near BonaBella",
   "lat": 32.00811848,
   "lon": -81.06087863,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "WAS0190",
   "location": "Herb River, W of Wylly Island",
   "lat": 32.00615644,
   "lon": -81.06030464,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0191",
   "location": "Herb River, W-Bank, near Little Wylly Island",
   "lat": 32.00317383,
   "lon": -81.06021881,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0192",
   "location": "Herb River, Wylly side, at Sylvan Island",
   "lat": 32.00978078,
   "lon": -81.04859755,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0193",
   "location": "Herb River, W-Bank, N of Sylvan Island",
   "lat": 32.01351643,
   "lon": -81.04766607,
   "habitat": "SHELL",
   "depth": "6",
   "gear": "GILL"
  },
  {
   "station": "WAS0194",
   "location": "Herb River, Sylvan side",
   "lat": 32.01182068,
   "lon": -81.04601794,
   "habitat": "SHELL",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "WAS0195",
   "location": "Herb River, E loop, near Sylvan Island",
   "lat": 32.01659745,
   "lon": -81.04233367,
   "habitat": "MUD",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "WAS0196",
   "location": "Williamson Creek, near Thunderbolt",
   "lat": 32.02102661,
   "lon": -81.04650736,
   "habitat": "MUD",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0197",
   "location": "Williamson Creek, mouth at Wilmington River",
   "lat": 32.02252865,
   "lon": -81.04545593,
   "habitat": "MUD",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0198",
   "location": "Wilmington River, Whitemarsh side, across Williamson Creek",
   "lat": 32.02395055,
   "lon": -81.04144352,
   "habitat": "MUD",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "WAS0199",
   "location": "Wilmington River, Whitemarsh side, across from Thunderbolt",
   "lat": 32.02572584,
   "lon": -81.04562759,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0200",
   "location": "Wilmington River, W-Bank, at Thunderbolt",
   "lat": 32.02791452,
   "lon": -81.04850292,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0201",
   "location": "Wilmington River, at Grays Creek mouth",
   "lat": 32.02984571,
   "lon": -81.04747295,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "WAS0202",
   "location": "Wilmington River, Sylvan side, near Nixt's Island",
   "lat": 32.02076828,
   "lon": -81.03753738,
   "habitat": "MUD",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "WAS0203",
   "location": "Herb River, mouth",
   "lat": 32.01669216,
   "lon": -81.03251696,
   "habitat": "SHELL",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "WAS0204",
   "location": "Herb River, mouth",
   "lat": 32.01679945,
   "lon": -81.03120804,
   "habitat": "MUD",
   "depth": "9",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0205",
   "location": "Wilmington River, at Herb River mouth",
   "lat": 32.02003956,
   "lon": -81.02962017,
   "habitat": "MUD",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0206",
   "location": "Wilmington River, N-Bank, across Herb River mouth",
   "lat": 32.02435255,
   "lon": -81.03071451,
   "habitat": "MUD",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "WAS0207",
   "location": "Wilmington River, N-Bank, W of Bradley Point",
   "lat": 32.0241622,
   "lon": -81.02727508,
   "habitat": "MUD",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "WAS0208",
   "location": "Wilmington River, Whitemarsh side, near Bradley Point",
   "lat": 32.02300072,
   "lon": -81.02374077,
   "habitat": "MUD",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "WAS0209",
   "location": "Wilmington River, S-Bank, at Skidaway River mouth",
   "lat": 32.01947797,
   "lon": -81.02358478,
   "habitat": "MUD",
   "depth": "-4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0210",
   "location": "Wilmington River, S-Bank, across from Bradley Point",
   "lat": 32.01746464,
   "lon": -81.02217436,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0211",
   "location": "Wilmington River, N of Thunderbolt bridges",
   "lat": 32.03864336,
   "lon": -81.04556322,
   "habitat": "MUD",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0212",
   "location": "Wilmington River, W-Bank, N of Thunderbolt",
   "lat": 32.04160452,
   "lon": -81.04356766,
   "habitat": "SHELL",
   "depth": "6",
   "gear": "GILL"
  },
  {
   "station": "WAS0213",
   "location": "Wilmington River, Whitemarsh side, N of Thunderbolt",
   "lat": 32.04146446,
   "lon": -81.04215246,
   "habitat": "MUD",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "WAS0214",
   "location": "Wilmington River, W-Bank, near Bonaventure",
   "lat": 32.04574585,
   "lon": -81.03846073,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0215",
   "location": "Wilmington River, W-Bank, near Bonaventure",
   "lat": 32.04838229,
   "lon": -81.0336455,
   "habitat": "MUD",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0216",
   "location": "Wilmington River, Whitemarsh side, across from Bonaventure",
   "lat": 32.04810619,
   "lon": -81.03077888,
   "habitat": "MUD",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "WAS0217",
   "location": "Richardson Creek, W end, near Wilmington River",
   "lat": 32.04750538,
   "lon": -81.0263586,
   "habitat": "MUD",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "WAS0218",
   "location": "Richardson Creek, W arm, Oatland Island",
   "lat": 32.04591751,
   "lon": -81.01940632,
   "habitat": "MUD",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0219",
   "location": "Timber Landing Creek, upper",
   "lat": 32.05456495,
   "lon": -81.04459763,
   "habitat": "MUD",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "WAS0220",
   "location": "Timber Landing Creek, mid",
   "lat": 32.05374956,
   "lon": -81.04064941,
   "habitat": "MUD",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "WAS0221",
   "location": "Timber Landing Creek, lower",
   "lat": 32.05520868,
   "lon": -81.03687286,
   "habitat": "MUD",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "WAS0222",
   "location": "Wilmington River, W-Bank, S of Causton Bluff",
   "lat": 32.05591679,
   "lon": -81.03159428,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0223",
   "location": "Richardson Creek, upper, S of Oatland Island",
   "lat": 32.05505848,
   "lon": -81.00895643,
   "habitat": "MUD",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "WAS0224",
   "location": "Wilmington River, at Causton Bluff bridge",
   "lat": 32.06340551,
   "lon": -81.02629423,
   "habitat": "MUD",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "WAS0225",
   "location": "Wilmington River, N-Bank, E of Causton Bluff",
   "lat": 32.07078846,
   "lon": -81.01994234,
   "habitat": "MUD",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0226",
   "location": "Wilmington River, N-Bank, near St. Augustine Creek",
   "lat": 32.07445378,
   "lon": -81.01160637,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0227",
   "location": "Wilmington River, at St. Augustine Creek junction",
   "lat": 32.06988816,
   "lon": -81.00752916,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0228",
   "location": "St. Augustine Creek, mouth, N side",
   "lat": 32.06952095,
   "lon": -81.00556612,
   "habitat": "MUD",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0229",
   "location": "St. Augustine Creek, mouth",
   "lat": 32.06754684,
   "lon": -81.00575924,
   "habitat": "MUD",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0230",
   "location": "St. Augustine Creek, Oatland side",
   "lat": 32.06634521,
   "lon": -81.00159645,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0231",
   "location": "St. Augustine Creek, N-Bank, Elba Cut",
   "lat": 32.06544877,
   "lon": -80.99755327,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0232",
   "location": "St. Augustine Creek, Oatland side, Elba Cut",
   "lat": 32.06355572,
   "lon": -80.99715471,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0233",
   "location": "St. Augustine Creek, S-Bank, E Elba Cut",
   "lat": 32.06341867,
   "lon": -80.99277492,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0234",
   "location": "Mud Creek, W branch",
   "lat": 32.05231357,
   "lon": -80.99393506,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0235",
   "location": "Mud Creek, mid",
   "lat": 32.05179691,
   "lon": -80.98642588,
   "habitat": "MUD",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "WAS0236",
   "location": "St. Augustine Creek, S-Bank, above Mud Creek",
   "lat": 32.05999374,
   "lon": -80.98378658,
   "habitat": "MUD",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0237",
   "location": "St. Augustine Creek, W-Bank, above Bull River",
   "lat": 32.05470501,
   "lon": -80.97550903,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0238",
   "location": "St. Augustine Creek, W-Bank, above Bull River",
   "lat": 32.0518488,
   "lon": -80.97497008,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0239",
   "location": "Mud Creek, lower, near St. Augustine Creek",
   "lat": 32.04930782,
   "lon": -80.97876549,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0240",
   "location": "St. Augustine Creek, W-Bank, at Mud Creek",
   "lat": 32.04792758,
   "lon": -80.9751233,
   "habitat": "MUD",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "WAS0241",
   "location": "St. Augustine Creek, at Bull River junction",
   "lat": 32.04503775,
   "lon": -80.97215652,
   "habitat": "SHELL",
   "depth": "8",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0242",
   "location": "Turner Creek, N-Bank, near Talahi Island",
   "lat": 32.04123974,
   "lon": -80.97539663,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0243",
   "location": "Turner Creek, Oatland side, near Battery Point",
   "lat": 32.04179764,
   "lon": -80.97917318,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0244",
   "location": "Turner Creek, at Bradley Flat",
   "lat": 32.03810692,
   "lon": -80.98005295,
   "habitat": "MUD",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "WAS0245",
   "location": "Turner Creek, near Battery Point",
   "lat": 32.03684092,
   "lon": -80.98202705,
   "habitat": "MUD",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "WAS0246",
   "location": "Turner Creek, at US-80 bridge",
   "lat": 32.03366518,
   "lon": -80.98734856,
   "habitat": "MUD",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "WAS0247",
   "location": "Bull River, at US-80 bridge",
   "lat": 32.03533888,
   "lon": -80.95694304,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0248",
   "location": "Bull River, McQueens side, at US-80 bridge",
   "lat": 32.03413725,
   "lon": -80.95428228,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0249",
   "location": "Bull River, Wilmington side, below US-80 bridge",
   "lat": 32.03081131,
   "lon": -80.95252275,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "WAS0250",
   "location": "Bull River, E-Bank, at S bend",
   "lat": 32.02921246,
   "lon": -80.94488818,
   "habitat": "SHELL",
   "depth": "7",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0251",
   "location": "Bull River, Wilmington side, below US-80 bridge",
   "lat": 32.0268631,
   "lon": -80.94634295,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0252",
   "location": "Bull River, E-Bank, S bend",
   "lat": 32.02825785,
   "lon": -80.94198704,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0253",
   "location": "Bull River, Wilmington side, near Betz Creek",
   "lat": 32.02315092,
   "lon": -80.94211578,
   "habitat": "SHELL",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "WAS0254",
   "location": "Betz Creek, lower",
   "lat": 32.01991324,
   "lon": -80.95099079,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0255",
   "location": "Betz Creek, mid",
   "lat": 32.02115703,
   "lon": -80.95234447,
   "habitat": "MUD",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0256",
   "location": "Bull River, E-Bank, near Betz Creek",
   "lat": 32.02385902,
   "lon": -80.93969107,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0257",
   "location": "Bull River, E-Bank, below US-80 bridge",
   "lat": 32.02763239,
   "lon": -80.93925546,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0258",
   "location": "Bull River, E side creek, below US-80",
   "lat": 32.02967405,
   "lon": -80.93954086,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0259",
   "location": "Oyster Creek, upper W branch, near US-80",
   "lat": 32.03149988,
   "lon": -80.93492,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0260",
   "location": "Oyster Creek, upper W branch, near US-80",
   "lat": 32.03109881,
   "lon": -80.93259671,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0261",
   "location": "Oyster Creek, upper W branch",
   "lat": 32.02862263,
   "lon": -80.9299922,
   "habitat": "MUD",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "WAS0262",
   "location": "Oyster Creek, upper W branch",
   "lat": 32.02788812,
   "lon": -80.92865621,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0263",
   "location": "Oyster Creek, W branch, mid",
   "lat": 32.02441692,
   "lon": -80.92788935,
   "habitat": "MUD",
   "depth": "6",
   "gear": "GILL"
  },
  {
   "station": "WAS0264",
   "location": "Oyster Creek, W branch, lower",
   "lat": 32.02149868,
   "lon": -80.9249711,
   "habitat": "MUD",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0265",
   "location": "Oyster Creek, upper central branch",
   "lat": 32.02129425,
   "lon": -80.920912,
   "habitat": "MUD",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0266",
   "location": "Oyster Creek, upper central branch",
   "lat": 32.01741644,
   "lon": -80.92073145,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0267",
   "location": "Oyster Creek, NE branch",
   "lat": 32.01656342,
   "lon": -80.91546535,
   "habitat": "MUD",
   "depth": "7",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0268",
   "location": "Oyster Creek, NE branch, upper",
   "lat": 32.01789379,
   "lon": -80.91411352,
   "habitat": "MUD",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "WAS0269",
   "location": "Oyster Creek, E-Bank, N reach",
   "lat": 32.01225042,
   "lon": -80.91441393,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0270",
   "location": "Oyster Creek, at NE branch",
   "lat": 32.01244354,
   "lon": -80.91675282,
   "habitat": "SHELL",
   "depth": "7",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0271",
   "location": "Oyster Creek, N reach",
   "lat": 32.01293707,
   "lon": -80.91939211,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0272",
   "location": "Oyster Creek, N mouth at Bull River",
   "lat": 32.01381683,
   "lon": -80.92475653,
   "habitat": "MUD",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "WAS0273",
   "location": "Bull River, E-Bank, at Oyster Creek",
   "lat": 32.01334476,
   "lon": -80.92756748,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0274",
   "location": "Bull River, W-Bank, N of Shad River",
   "lat": 32.01229669,
   "lon": -80.93157655,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0275",
   "location": "Bull River, W-Bank, N of Shad River",
   "lat": 32.01344862,
   "lon": -80.9357825,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0276",
   "location": "Oyster Creek, E of Bull River",
   "lat": 32.00895323,
   "lon": -80.91199877,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0277",
   "location": "Bull River, E-Bank, S of Oyster Creek",
   "lat": 32.00914375,
   "lon": -80.9248271,
   "habitat": "MUD",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "WAS0278",
   "location": "Oyster Creek, E-Bank, mid",
   "lat": 32.00549277,
   "lon": -80.91312261,
   "habitat": "SHELL",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0279",
   "location": "Oyster Creek, W-Bank, mid",
   "lat": 32.00504987,
   "lon": -80.91660672,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0280",
   "location": "Bull River, E-Bank, near fish haven",
   "lat": 32.00625367,
   "lon": -80.92450356,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0281",
   "location": "Bull River, W-Bank, near Shad River",
   "lat": 32.00439692,
   "lon": -80.92673063,
   "habitat": "MUD",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "WAS0282",
   "location": "Oyster Creek, W-Bank, lower",
   "lat": 32.003304,
   "lon": -80.91743301,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0283",
   "location": "Oyster Creek, near Bull River",
   "lat": 32.00165033,
   "lon": -80.92104435,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0284",
   "location": "Bull River, E-Bank, near fish haven",
   "lat": 32.00285213,
   "lon": -80.92394818,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0285",
   "location": "Bull River, W-Bank, above Shad River",
   "lat": 32.00230203,
   "lon": -80.92867549,
   "habitat": "SHELL",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "WAS0286",
   "location": "Bull River side creek, N Shad River",
   "lat": 32.001995,
   "lon": -80.93237903,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0287",
   "location": "Oyster Creek, W-Bank, lower",
   "lat": 31.99913979,
   "lon": -80.92155933,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0288",
   "location": "Oyster Creek, W-Bank, lower",
   "lat": 31.99771964,
   "lon": -80.92345473,
   "habitat": "SHELL",
   "depth": "9",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0289",
   "location": "Bull River, E-Bank, near Oyster Creek",
   "lat": 31.99971914,
   "lon": -80.9266448,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "WAS0290",
   "location": "Bull River, W-Bank, at Shad River",
   "lat": 31.99865045,
   "lon": -80.92989832,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0291",
   "location": "Morgan Cut, N end, near Oyster Creek",
   "lat": 31.997509,
   "lon": -80.91035843,
   "habitat": "SHELL",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "WAS0292",
   "location": "Shad River, N end",
   "lat": 32.00915876,
   "lon": -80.94021888,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0293",
   "location": "Shad River, N end",
   "lat": 32.01082123,
   "lon": -80.94173868,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0294",
   "location": "Shad River, upper, E-Bank",
   "lat": 32.00549226,
   "lon": -80.94185418,
   "habitat": "SHELL",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "WAS0295",
   "location": "Shad River, E loop, N end",
   "lat": 32.00087786,
   "lon": -80.94263077,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0296",
   "location": "Shad River, E loop, W side",
   "lat": 32.00165033,
   "lon": -80.94559193,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0297",
   "location": "Shad River, upper, N end",
   "lat": 32.00341908,
   "lon": -80.95015151,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0298",
   "location": "Shad River, upper",
   "lat": 32.00096763,
   "lon": -80.95253709,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0299",
   "location": "Shad River, near Wilmington Island",
   "lat": 31.99830084,
   "lon": -80.9422338,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0300",
   "location": "Shad River, E loop, W side, lower",
   "lat": 31.99833957,
   "lon": -80.9466571,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0301",
   "location": "Shad River, upper, E-Bank",
   "lat": 31.99725151,
   "lon": -80.95136404,
   "habitat": "MUD",
   "depth": "6",
   "gear": "GILL"
  },
  {
   "station": "WAS0302",
   "location": "Shad River, upper",
   "lat": 31.9990558,
   "lon": -80.95253189,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "WAS0303",
   "location": "Beard Creek, N end, near Shad River",
   "lat": 31.9975054,
   "lon": -80.95722073,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0304",
   "location": "Oyster Creek mouth, at Lazaretto Creek",
   "lat": 31.9955349,
   "lon": -80.91368437,
   "habitat": "SHELL",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0305",
   "location": "Oyster Creek, lower, near Lazaretto Creek",
   "lat": 31.99467391,
   "lon": -80.91630698,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0306",
   "location": "Oyster Creek, S bend",
   "lat": 31.99613571,
   "lon": -80.92022896,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0307",
   "location": "Lazaretto Creek, N-Bank, near Bull River",
   "lat": 31.99501991,
   "lon": -80.92531443,
   "habitat": "SHELL",
   "depth": "8",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0308",
   "location": "Bull River, E-Bank, at Lazaretto Creek",
   "lat": 31.99488295,
   "lon": -80.93040937,
   "habitat": "SHELL",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "WAS0309",
   "location": "Shad River, N-Bank, at Bull River",
   "lat": 31.99348032,
   "lon": -80.9353883,
   "habitat": "SHELL",
   "depth": "7",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0310",
   "location": "Shad River, N-Bank, near mouth",
   "lat": 31.99360371,
   "lon": -80.93900442,
   "habitat": "SHELL",
   "depth": "7",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0311",
   "location": "Shad River, upper, S bend",
   "lat": 31.99616672,
   "lon": -80.95040767,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0312",
   "location": "Lazaretto Creek, W-Bank, near Morgan Cut",
   "lat": 31.99180562,
   "lon": -80.91435593,
   "habitat": "MUD",
   "depth": "8",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0313",
   "location": "Lazaretto Creek, S bend",
   "lat": 31.99017048,
   "lon": -80.91816902,
   "habitat": "MUD",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0314",
   "location": "Lazaretto Creek, Little Tybee side, W reach",
   "lat": 31.99272897,
   "lon": -80.92320705,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0315",
   "location": "Bull River, E-Bank, S of Lazaretto Creek",
   "lat": 31.99035346,
   "lon": -80.92725132,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0316",
   "location": "Shad River, Wilmington side, at Bull River",
   "lat": 31.99239135,
   "lon": -80.93597093,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0317",
   "location": "Shad River, Wilmington side, near mouth",
   "lat": 31.9923377,
   "lon": -80.93945503,
   "habitat": "MUD",
   "depth": "7",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0318",
   "location": "Shad River S loop, N side",
   "lat": 31.9917182,
   "lon": -80.94898014,
   "habitat": "MUD",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0319",
   "location": "Shad River S loop, NW bend",
   "lat": 31.99093642,
   "lon": -80.9534601,
   "habitat": "MUD",
   "depth": "8",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0320",
   "location": "Lazaretto Creek, Little Tybee side, S reach",
   "lat": 31.98865453,
   "lon": -80.91416281,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0321",
   "location": "Lazaretto Creek, S bend",
   "lat": 31.98787451,
   "lon": -80.91758966,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0322",
   "location": "Bull River, E-Bank, below Shad River",
   "lat": 31.98760243,
   "lon": -80.92730127,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0323",
   "location": "Bull River, W-Bank, at Shad River mouth",
   "lat": 31.98832512,
   "lon": -80.93215942,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0324",
   "location": "Shad River S loop, E side",
   "lat": 31.98725224,
   "lon": -80.94181538,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0325",
   "location": "Shad River S loop, SW side",
   "lat": 31.98621204,
   "lon": -80.95062492,
   "habitat": "MUD",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "WAS0326",
   "location": "Shad River S loop, W side",
   "lat": 31.98801641,
   "lon": -80.95448102,
   "habitat": "MUD",
   "depth": "8",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0327",
   "location": "Beard Creek E side creek",
   "lat": 31.98742817,
   "lon": -80.95837617,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0328",
   "location": "Tybee Creek S branch, W side creek",
   "lat": 31.98323965,
   "lon": -80.91374874,
   "habitat": "MUD",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "WAS0329",
   "location": "Bull River, Little Tybee side, lower",
   "lat": 31.98469877,
   "lon": -80.92730999,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0330",
   "location": "Bull River, Wilmington side, below Shad River",
   "lat": 31.9846344,
   "lon": -80.93241692,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0331",
   "location": "Shad River S loop, SE side",
   "lat": 31.98506355,
   "lon": -80.94280243,
   "habitat": "MUD",
   "depth": "7",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0332",
   "location": "Shad River S loop, S side",
   "lat": 31.98457003,
   "lon": -80.94584942,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0333",
   "location": "Shad River S loop, S side",
   "lat": 31.98558885,
   "lon": -80.94872282,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0334",
   "location": "Beard Creek E side creek, mouth",
   "lat": 31.9853425,
   "lon": -80.95750093,
   "habitat": "MUD",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "WAS0335",
   "location": "Bull River, Little Tybee side",
   "lat": 31.98049734,
   "lon": -80.92420927,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0336",
   "location": "Bull River side creek, S Shad River",
   "lat": 31.97963476,
   "lon": -80.9382534,
   "habitat": "MUD",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0337",
   "location": "Long Creek, upper",
   "lat": 31.9798863,
   "lon": -80.95593033,
   "habitat": "MUD",
   "depth": "6",
   "gear": "GILL"
  },
  {
   "station": "WAS0338",
   "location": "Bull River, Wilmington side, lower",
   "lat": 31.97717878,
   "lon": -80.93065336,
   "habitat": "SHELL",
   "depth": "8",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0339",
   "location": "Pa Cooper Creek, upper",
   "lat": 31.97739679,
   "lon": -80.94261928,
   "habitat": "MUD",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0340",
   "location": "Morgan Cut, S end, at Tybee Creek",
   "lat": 31.99572802,
   "lon": -80.9091568,
   "habitat": "SHELL",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "WAS0341",
   "location": "Tybee Creek, S branch, lower",
   "lat": 31.98459148,
   "lon": -80.9102726,
   "habitat": "MUD",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0342",
   "location": "Tybee Creek, S branch, mid",
   "lat": 31.98905468,
   "lon": -80.90698957,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0343",
   "location": "Tybee Creek, S branch, near Morgan Cut",
   "lat": 31.99199438,
   "lon": -80.90731144,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0344",
   "location": "Tybee Creek, at Morgan Cut",
   "lat": 31.99461222,
   "lon": -80.90641022,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0345",
   "location": "Tybee Creek, Tybee Is. side, W reach",
   "lat": 31.99486971,
   "lon": -80.90291262,
   "habitat": "SHELL",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "WAS0346",
   "location": "Tybee Creek S side creek, W reach",
   "lat": 31.99111462,
   "lon": -80.90076685,
   "habitat": "MUD",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0347",
   "location": "Tybee Creek S side creek, W reach",
   "lat": 31.99240208,
   "lon": -80.89780569,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0348",
   "location": "Tybee Creek, S-Bank, N of Little Tybee",
   "lat": 31.99490416,
   "lon": -80.89781399,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0349",
   "location": "Tybee Creek, N-Bank, N of Little Tybee",
   "lat": 31.99714422,
   "lon": -80.89902878,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0350",
   "location": "Tybee Creek, S-Bank, N of Little Tybee",
   "lat": 31.99377537,
   "lon": -80.89555264,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0351",
   "location": "Tybee Creek S side creek, mid",
   "lat": 31.99259302,
   "lon": -80.89445335,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0352",
   "location": "Tybee Creek S side creek, mid",
   "lat": 31.99130774,
   "lon": -80.89132547,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0353",
   "location": "Tybee Creek, N-Bank, mid",
   "lat": 31.99559039,
   "lon": -80.89105759,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0354",
   "location": "Tybee Creek, N-Bank, mid",
   "lat": 31.99828148,
   "lon": -80.88814974,
   "habitat": "SHELL",
   "depth": "7",
   "gear": "GILL"
  },
  {
   "station": "WAS0355",
   "location": "Tybee Creek, S-Bank, mid",
   "lat": 31.99576423,
   "lon": -80.88802845,
   "habitat": "SHELL",
   "depth": "7",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0356",
   "location": "Tybee Creek, N-Bank, E of Lazaretto Creek",
   "lat": 31.99913182,
   "lon": -80.88338865,
   "habitat": "SHELL",
   "depth": "7",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0357",
   "location": "Tybee Creek, S-Bank, at Carter Creek",
   "lat": 31.99622154,
   "lon": -80.88280678,
   "habitat": "SHELL",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0358",
   "location": "Tybee Creek, S-Bank, near Carter Creek",
   "lat": 31.99433327,
   "lon": -80.88160515,
   "habitat": "SHELL",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0359",
   "location": "Tybee Creek, S-Bank, E section",
   "lat": 31.99209362,
   "lon": -80.87938135,
   "habitat": "SHELL",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0360",
   "location": "Tybee Creek, S-Bank, E of Carter Creek",
   "lat": 31.99156523,
   "lon": -80.87684155,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0361",
   "location": "Carter Creek, lower",
   "lat": 31.99731588,
   "lon": -80.87694883,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0362",
   "location": "Tybee Creek, S-Bank, E reach",
   "lat": 31.99540615,
   "lon": -80.86830139,
   "habitat": "SHELL",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0363",
   "location": "Tybee Creek, E end, near Spanish Hammock",
   "lat": 31.99628592,
   "lon": -80.86669207,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "WAS0364",
   "location": "Tybee Creek, N-Bank, E reach",
   "lat": 31.99727297,
   "lon": -80.86461067,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0365",
   "location": "Tybee Creek, E end, near Tybee Island",
   "lat": 31.99757773,
   "lon": -80.85855408,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0366",
   "location": "Tybee Creek mouth, S tip Tybee Island",
   "lat": 31.98873281,
   "lon": -80.85302353,
   "habitat": "SAND",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0367",
   "location": "Beard Creek, S of Wilmington Island",
   "lat": 31.9937861,
   "lon": -80.9605553,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0368",
   "location": "Beard Creek, upper",
   "lat": 31.98806377,
   "lon": -80.96231064,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0369",
   "location": "Beard Creek, mid",
   "lat": 31.98544979,
   "lon": -80.95994711,
   "habitat": "SHELL",
   "depth": "6",
   "gear": "GILL"
  },
  {
   "station": "WAS0370",
   "location": "Beard Creek, lower",
   "lat": 31.98051453,
   "lon": -80.96022606,
   "habitat": "MUD",
   "depth": "6",
   "gear": "GILL"
  },
  {
   "station": "WAS0371",
   "location": "Beard Creek, mouth at Halfmoon River",
   "lat": 31.97920561,
   "lon": -80.96520424,
   "habitat": "SHELL",
   "depth": "2",
   "gear": "GILL"
  },
  {
   "station": "WAS0372",
   "location": "Halfmoon River, Wilmington side, near Beard Creek",
   "lat": 31.98006392,
   "lon": -80.96904516,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "WAS0373",
   "location": "Tom Creek, upper",
   "lat": 31.99008674,
   "lon": -80.9694205,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0374",
   "location": "Tom Creek, N of Halfmoon River",
   "lat": 31.98832721,
   "lon": -80.97169988,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0375",
   "location": "Tom Creek, lower",
   "lat": 31.98465586,
   "lon": -80.97174883,
   "habitat": "MUD",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0376",
   "location": "Halfmoon River, Wilmington side, at Tom Creek",
   "lat": 31.98105097,
   "lon": -80.97183466,
   "habitat": "SHELL",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "WAS0377",
   "location": "Halfmoon River, Wilmington side, upper",
   "lat": 31.98197365,
   "lon": -80.97567558,
   "habitat": "SHELL",
   "depth": "6",
   "gear": "GILL"
  },
  {
   "station": "WAS0378",
   "location": "Tom Creek, lower, W side",
   "lat": 31.98343277,
   "lon": -80.9740448,
   "habitat": "MUD",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "WAS0379",
   "location": "Halfmoon River side creek, W end",
   "lat": 31.98306405,
   "lon": -80.97825754,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "WAS0380",
   "location": "Halfmoon River, Wilmington side, upper, W end",
   "lat": 31.98049818,
   "lon": -80.97880874,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "WAS0381",
   "location": "Halfmoon River, Wilmington side, above Long Creek",
   "lat": 31.9741416,
   "lon": -80.96702814,
   "habitat": "SHELL",
   "depth": "9",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0382",
   "location": "Halfmoon River, Wilmington side, at Long Creek",
   "lat": 31.97375628,
   "lon": -80.96368225,
   "habitat": "SHELL",
   "depth": "8",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0383",
   "location": "Bull River, Wilmington side, above Halfmoon River",
   "lat": 31.97081566,
   "lon": -80.93130112,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0384",
   "location": "Halfmoon River, Wilmington side, at Mud Island",
   "lat": 31.96877182,
   "lon": -80.95823879,
   "habitat": "SHELL",
   "depth": "9",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0385",
   "location": "Tybee Cut N side creek",
   "lat": 31.97009641,
   "lon": -80.97536034,
   "habitat": "MUD",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0386",
   "location": "Tybee Cut, E reach, W Mud Island",
   "lat": 31.9671733,
   "lon": -80.96869614,
   "habitat": "MUD",
   "depth": "6",
   "gear": "GILL"
  },
  {
   "station": "WAS0387",
   "location": "Tybee Cut, E end, at Mud Island",
   "lat": 31.9674204,
   "lon": -80.96070467,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "WAS0388",
   "location": "Bull River, Wilmington side, near Halfmoon River",
   "lat": 31.96731806,
   "lon": -80.93600035,
   "habitat": "MUD",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "WAS0389",
   "location": "House Creek, upper",
   "lat": 31.96201801,
   "lon": -80.91647387,
   "habitat": "MUD",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0390",
   "location": "Bull River, lower, near Wassaw Sound",
   "lat": 31.96330547,
   "lon": -80.93160152,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "WAS0391",
   "location": "Halfmoon River, mouth at Wassaw Sound",
   "lat": 31.96129641,
   "lon": -80.94882449,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0392",
   "location": "Halfmoon River, Cabbage side, lower",
   "lat": 31.96253744,
   "lon": -80.95370318,
   "habitat": "SHELL",
   "depth": "8",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0393",
   "location": "Tybee Cut, E reach, N Cabbage Island",
   "lat": 31.96246862,
   "lon": -80.96814394,
   "habitat": "MUD",
   "depth": "7",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0394",
   "location": "Tybee Cut, W reach, N Cabbage Island",
   "lat": 31.96153807,
   "lon": -80.97984231,
   "habitat": "SHELL",
   "depth": "8",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0395",
   "location": "Tybee Cut, S reach, N Cabbage Island",
   "lat": 31.95989982,
   "lon": -80.97542966,
   "habitat": "SHELL",
   "depth": "8",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0396",
   "location": "Tybee Cut, S reach, N Cabbage Island",
   "lat": 31.96051598,
   "lon": -80.96938848,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0397",
   "location": "House Creek, mid",
   "lat": 31.95942163,
   "lon": -80.91786861,
   "habitat": "MUD",
   "depth": "7",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0398",
   "location": "House Creek, mid",
   "lat": 31.95613861,
   "lon": -80.92078686,
   "habitat": "MUD",
   "depth": "7",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0399",
   "location": "House Creek, lower",
   "lat": 31.95183266,
   "lon": -80.9229623,
   "habitat": "SHELL",
   "depth": "8",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0400",
   "location": "House Creek, mouth, near Beach Hammock",
   "lat": 31.94736242,
   "lon": -80.92681646,
   "habitat": "SAND",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "WAS0401",
   "location": "House Creek, mouth, near Beach Hammock",
   "lat": 31.94598913,
   "lon": -80.92853308,
   "habitat": "SAND",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0402",
   "location": "Halfmoon River, Wilmington side, upper, W end",
   "lat": 31.97937769,
   "lon": -80.98194667,
   "habitat": "SHELL",
   "depth": "2",
   "gear": "GILL"
  },
  {
   "station": "WAS0403",
   "location": "Halfmoon River, Wilmington side, upper, W end",
   "lat": 31.97832417,
   "lon": -80.98284328,
   "habitat": "SHELL",
   "depth": "8",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0404",
   "location": "Halfmoon River, upper, W end",
   "lat": 31.97950602,
   "lon": -80.98644733,
   "habitat": "MUD",
   "depth": "8",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0405",
   "location": "Halfmoon River, upper, S reach",
   "lat": 31.97683965,
   "lon": -80.99099091,
   "habitat": "MUD",
   "depth": "8",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0406",
   "location": "Halfmoon River, upper, at Sheepshead Creek",
   "lat": 31.97352679,
   "lon": -80.99142602,
   "habitat": "MUD",
   "depth": "8",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0407",
   "location": "Halfmoon River, upper, S reach",
   "lat": 31.97055817,
   "lon": -80.9913826,
   "habitat": "MUD",
   "depth": "4",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0408",
   "location": "Sheepshead Creek, at Halfmoon River",
   "lat": 31.97398762,
   "lon": -80.99229556,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "WAS0409",
   "location": "Tybee Cut, N reach, near Halfmoon River",
   "lat": 31.96582734,
   "lon": -80.98199948,
   "habitat": "MUD",
   "depth": "9",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0410",
   "location": "Tybee Cut, N end, at Seine Creek",
   "lat": 31.96405649,
   "lon": -80.98322868,
   "habitat": "SHELL",
   "depth": "6",
   "gear": "GILL"
  },
  {
   "station": "WAS0411",
   "location": "Tybee Cut, mid",
   "lat": 31.95909977,
   "lon": -80.98513842,
   "habitat": "MUD",
   "depth": "7",
   "gear": "TRAMMEL"
  },
  {
   "station": "WAS0412",
   "location": "Tybee Cut, S end, near Wilmington River",
   "lat": 31.95520177,
   "lon": -80.98520824,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0413",
   "location": "House Creek E side creek, Beach Hammock",
   "lat": 31.94955111,
   "lon": -80.91999292,
   "habitat": "MUD",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "WAS0414",
   "location": "Skidaway River side creek, E Dutch Island",
   "lat": 32.00458945,
   "lon": -81.02139333,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "WAS0415",
   "location": "Skidaway River side creek, E Dutch Island",
   "lat": 32.00973988,
   "lon": -81.02268934,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  }
 ],
 "stationsALT": [
  {
   "station": "ALT0001",
   "location": "Mackay River, S-Bank, near Frederica River",
   "lat": 31.25738058,
   "lon": -81.39736,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "ALT0002",
   "location": "Mackay River, N-Bank, near Frederica River",
   "lat": 31.25858389,
   "lon": -81.39706789,
   "habitat": "MUD",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "ALT0003",
   "location": "Mackay River, N-Bank, near Frederica River",
   "lat": 31.25879,
   "lon": -81.40000482,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "ALT0004",
   "location": "Mackay River, S-Bank, near St. Simons Island",
   "lat": 31.25797595,
   "lon": -81.40330712,
   "habitat": "MUD",
   "depth": "14",
   "gear": "BOTH"
  },
  {
   "station": "ALT0005",
   "location": "Mackay River, E-Bank, near Wallys Leg",
   "lat": 31.26029111,
   "lon": -81.40310571,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "ALT0006",
   "location": "Mackay River, near Wallys Leg",
   "lat": 31.2608584,
   "lon": -81.40634816,
   "habitat": "MUD",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "ALT0007",
   "location": "Wallys Leg, N-Bank, near Mackay River",
   "lat": 31.26670822,
   "lon": -81.40711536,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "ALT0008",
   "location": "Wallys Leg, W-Bank, near Mackay River",
   "lat": 31.27104811,
   "lon": -81.40843165,
   "habitat": "MUD",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "ALT0009",
   "location": "Wallys Leg, near Little St. Simons Island",
   "lat": 31.27730319,
   "lon": -81.41055395,
   "habitat": "MUD",
   "depth": "9",
   "gear": "BOTH"
  },
  {
   "station": "ALT0010",
   "location": "Wallys Leg, near Little St. Simons Island",
   "lat": 31.28167477,
   "lon": -81.41375818,
   "habitat": "MUD",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "ALT0011",
   "location": "Wallys Leg, near Little St. Simons Island",
   "lat": 31.28395557,
   "lon": -81.41508579,
   "habitat": "MUD",
   "depth": "0",
   "gear": "GILL"
  },
  {
   "station": "ALT0012",
   "location": "Wallys Leg, near Little St. Simons Island",
   "lat": 31.2852002,
   "lon": -81.41876855,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "ALT0013",
   "location": "Wallys Leg, N-Bank",
   "lat": 31.285583,
   "lon": -81.42230437,
   "habitat": "MUD",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "ALT0014",
   "location": "Wallys Leg, S-Bank, near Broughton Island",
   "lat": 31.28899771,
   "lon": -81.42891116,
   "habitat": "MUD",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "ALT0015",
   "location": "Wallys Leg, near Broughton Island",
   "lat": 31.28877928,
   "lon": -81.42692163,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "ALT0016",
   "location": "Wallys Leg, near Broughton Island",
   "lat": 31.29502798,
   "lon": -81.42713319,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "ALT0017",
   "location": "Wallys Leg, W-Bank, near Broughton Island",
   "lat": 31.29938716,
   "lon": -81.42540098,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "ALT0018",
   "location": "Mackay River, W-Bank, near Frederica River",
   "lat": 31.26344061,
   "lon": -81.3941478,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "ALT0019",
   "location": "Mackay River side creek, mouth",
   "lat": 31.26421041,
   "lon": -81.38971226,
   "habitat": "MUD",
   "depth": "7",
   "gear": "GILL"
  },
  {
   "station": "ALT0020",
   "location": "Mackay River side creek, near Frederica",
   "lat": 31.26352779,
   "lon": -81.38671087,
   "habitat": "MUD",
   "depth": "6",
   "gear": "GILL"
  },
  {
   "station": "ALT0021",
   "location": "Mackay River side creek, mid",
   "lat": 31.26260234,
   "lon": -81.38287347,
   "habitat": "MUD",
   "depth": "8",
   "gear": "GILL"
  },
  {
   "station": "ALT0022",
   "location": "Mackay River side creek, mid",
   "lat": 31.26179533,
   "lon": -81.38182045,
   "habitat": "MUD",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "ALT0023",
   "location": "Mackay River side creek, upper",
   "lat": 31.26107147,
   "lon": -81.37958374,
   "habitat": "MUD",
   "depth": "7",
   "gear": "GILL"
  },
  {
   "station": "ALT0024",
   "location": "Mackay River, E-Bank, near Frederica River",
   "lat": 31.26573189,
   "lon": -81.38941496,
   "habitat": "MUD",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "ALT0025",
   "location": "Mackay River side creek, lower, S Hampton",
   "lat": 31.27236843,
   "lon": -81.3812685,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "ALT0026",
   "location": "Mackay River side creek, lower, S Hampton",
   "lat": 31.27118952,
   "lon": -81.37777643,
   "habitat": "MUD",
   "depth": "8",
   "gear": "BOTH"
  },
  {
   "station": "ALT0027",
   "location": "Mackay River side creek, S Hampton River",
   "lat": 31.27161339,
   "lon": -81.37488367,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "ALT0028",
   "location": "Mackay River side creek, S Hampton River",
   "lat": 31.27234848,
   "lon": -81.37286665,
   "habitat": "MUD",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "ALT0029",
   "location": "Mackay River side creek, S Hampton River",
   "lat": 31.27363443,
   "lon": -81.37274981,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "ALT0030",
   "location": "Mackay River side creek, S Hampton River",
   "lat": 31.27304401,
   "lon": -81.36935388,
   "habitat": "MUD",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "ALT0031",
   "location": "Mackay River side creek, upper, S Hampton",
   "lat": 31.27220725,
   "lon": -81.36720794,
   "habitat": "MUD",
   "depth": "7",
   "gear": "GILL"
  },
  {
   "station": "ALT0032",
   "location": "Mackay River side creek, upper, S Hampton",
   "lat": 31.2721236,
   "lon": -81.36562929,
   "habitat": "MUD",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "ALT0033",
   "location": "Mackay River, E-Bank, near Hampton River",
   "lat": 31.27451956,
   "lon": -81.38353027,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "ALT0034",
   "location": "Mackay River, E-Bank, near Hampton River",
   "lat": 31.27682366,
   "lon": -81.3829018,
   "habitat": "MUD",
   "depth": "0",
   "gear": "BOTH"
  },
  {
   "station": "ALT0035",
   "location": "Mackay River, N-Bank, at Hampton River",
   "lat": 31.28070038,
   "lon": -81.38273207,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "ALT0036",
   "location": "Mackay River, E-Bank, at Hampton River",
   "lat": 31.28573715,
   "lon": -81.38515184,
   "habitat": "MUD",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "ALT0037",
   "location": "Mackay River, N-Bank, near Hampton River",
   "lat": 31.2898,
   "lon": -81.39027,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "ALT0038",
   "location": "Mackay River, E-Bank, near Buttermilk Sound",
   "lat": 31.29165511,
   "lon": -81.39326988,
   "habitat": "MUD",
   "depth": "0",
   "gear": "BOTH"
  },
  {
   "station": "ALT0039",
   "location": "Buttermilk Sound, E side, Little St. Simons",
   "lat": 31.29530014,
   "lon": -81.39621922,
   "habitat": "MUD",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "ALT0040",
   "location": "Buttermilk Sound, E side, Little St. Simons",
   "lat": 31.30377006,
   "lon": -81.39513393,
   "habitat": "SAND",
   "depth": "0",
   "gear": "BOTH"
  },
  {
   "station": "ALT0041",
   "location": "Buttermilk Sound, E side, Little St. Simons",
   "lat": 31.30601892,
   "lon": -81.39355117,
   "habitat": "MUD",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "ALT0042",
   "location": "Buttermilk Sound, N-Bank, at South Altamaha River",
   "lat": 31.30708242,
   "lon": -81.39990902,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "ALT0043",
   "location": "South Altamaha River, S-Bank, near Buttermilk Sound",
   "lat": 31.30953681,
   "lon": -81.40666776,
   "habitat": "MUD",
   "depth": "6",
   "gear": "GILL"
  },
  {
   "station": "ALT0044",
   "location": "South Altamaha River, Broughton side",
   "lat": 31.31262302,
   "lon": -81.40583754,
   "habitat": "MUD",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "ALT0045",
   "location": "South Altamaha River, NE branch",
   "lat": 31.3149221,
   "lon": -81.40837859,
   "habitat": "MUD",
   "depth": "8",
   "gear": "BOTH"
  },
  {
   "station": "ALT0046",
   "location": "South Altamaha River, NE branch",
   "lat": 31.31704465,
   "lon": -81.40705132,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "ALT0047",
   "location": "South Altamaha River, NE branch",
   "lat": 31.31853914,
   "lon": -81.40581683,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "ALT0048",
   "location": "South Altamaha River, NE branch",
   "lat": 31.32155369,
   "lon": -81.40472928,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "ALT0049",
   "location": "South Altamaha River, Broughton side",
   "lat": 31.30955525,
   "lon": -81.41377419,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "ALT0050",
   "location": "South Altamaha River, Broughton side",
   "lat": 31.31266594,
   "lon": -81.4240551,
   "habitat": "MUD",
   "depth": "7",
   "gear": "GILL"
  },
  {
   "station": "ALT0051",
   "location": "South Altamaha River, S-Bank, near Broughton Island",
   "lat": 31.30946053,
   "lon": -81.42693713,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "ALT0052",
   "location": "South Altamaha River, W branch, mouth",
   "lat": 31.31912361,
   "lon": -81.43993143,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "ALT0053",
   "location": "South Altamaha River, W branch",
   "lat": 31.31655145,
   "lon": -81.44395064,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "ALT0054",
   "location": "South Altamaha River, W-Bank, near Broughton Island",
   "lat": 31.32466078,
   "lon": -81.43695116,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "ALT0055",
   "location": "South Altamaha River, W-Bank, near Broughton Island",
   "lat": 31.32882776,
   "lon": -81.43571835,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "ALT0056",
   "location": "South Altamaha River, S-Bank, near Wood Cut",
   "lat": 31.33144023,
   "lon": -81.43798767,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "ALT0057",
   "location": "South Altamaha River, S-Bank, near Wood Cut",
   "lat": 31.33158633,
   "lon": -81.44005062,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "ALT0058",
   "location": "South Altamaha River, S-Bank, near Wood Cut",
   "lat": 31.32884276,
   "lon": -81.44424384,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "ALT0059",
   "location": "Altamaha River, at Butler River",
   "lat": 31.34140296,
   "lon": -81.43696281,
   "habitat": "MUD",
   "depth": "9",
   "gear": "BOTH"
  },
  {
   "station": "ALT0060",
   "location": "Altamaha River, Broughton side",
   "lat": 31.33298996,
   "lon": -81.42561925,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "ALT0061",
   "location": "Altamaha River, Rockdedundy side, near Broughton Island",
   "lat": 31.33606126,
   "lon": -81.42174329,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "ALT0062",
   "location": "Altamaha River, N-Bank, near Broughton Island",
   "lat": 31.33512852,
   "lon": -81.41920541,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "ALT0063",
   "location": "Altamaha River, Broughton side",
   "lat": 31.33240323,
   "lon": -81.41528419,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "ALT0064",
   "location": "Altamaha River, Rockdedundy side",
   "lat": 31.33594751,
   "lon": -81.3981986,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "ALT0065",
   "location": "Altamaha River, Rockdedundy side",
   "lat": 31.33763345,
   "lon": -81.39328337,
   "habitat": "MUD",
   "depth": "8",
   "gear": "BOTH"
  },
  {
   "station": "ALT0066",
   "location": "Altamaha River, Broughton side",
   "lat": 31.33261562,
   "lon": -81.392989,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "ALT0067",
   "location": "Altamaha River, Broughton side",
   "lat": 31.33226568,
   "lon": -81.38960958,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "ALT0068",
   "location": "Altamaha River, at Rockdedundy Island",
   "lat": 31.33798222,
   "lon": -81.38588651,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "ALT0069",
   "location": "Altamaha River, Broughton side",
   "lat": 31.33168825,
   "lon": -81.38552768,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "ALT0070",
   "location": "Altamaha River, Broughton side, near Onemile Cut",
   "lat": 31.33072651,
   "lon": -81.38231423,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "ALT0071",
   "location": "Altamaha River, Rockdedundy side",
   "lat": 31.33802044,
   "lon": -81.38230593,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "ALT0072",
   "location": "Altamaha River, Rockdedundy side",
   "lat": 31.33755047,
   "lon": -81.37841916,
   "habitat": "MUD",
   "depth": "8",
   "gear": "BOTH"
  },
  {
   "station": "ALT0073",
   "location": "Altamaha River, Rockdedundy side",
   "lat": 31.3378285,
   "lon": -81.37498132,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "ALT0074",
   "location": "Altamaha River, Rockdedundy side",
   "lat": 31.33803452,
   "lon": -81.371216,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "ALT0075",
   "location": "Altamaha River, Rockdedundy side",
   "lat": 31.3368966,
   "lon": -81.36765378,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "ALT0076",
   "location": "Altamaha River, S-Bank, near Onemile Cut",
   "lat": 31.33165598,
   "lon": -81.36736393,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "ALT0077",
   "location": "Altamaha River, Rockdedundy side",
   "lat": 31.33552616,
   "lon": -81.36412223,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "ALT0078",
   "location": "Altamaha River, S-Bank, near Rockdedundy Island",
   "lat": 31.33126974,
   "lon": -81.36403799,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "ALT0079",
   "location": "Altamaha River, Rockdedundy side",
   "lat": 31.33497815,
   "lon": -81.36020872,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "ALT0080",
   "location": "Altamaha River, S-Bank, near Rockdedundy Island",
   "lat": 31.33086205,
   "lon": -81.36023998,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "ALT0081",
   "location": "Altamaha River, Rockdedundy side",
   "lat": 31.33437783,
   "lon": -81.35687121,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "ALT0082",
   "location": "Altamaha River, Rockdedundy side",
   "lat": 31.33388372,
   "lon": -81.35233702,
   "habitat": "MUD",
   "depth": "8",
   "gear": "BOTH"
  },
  {
   "station": "ALT0083",
   "location": "Altamaha River, at Rockdedundy Island",
   "lat": 31.3338232,
   "lon": -81.34927511,
   "habitat": "MUD",
   "depth": "8",
   "gear": "BOTH"
  },
  {
   "station": "ALT0084",
   "location": "Altamaha River, Rockdedundy side, near Altamaha Sound",
   "lat": 31.32931709,
   "lon": -81.34191513,
   "habitat": "MUD",
   "depth": "8",
   "gear": "BOTH"
  },
  {
   "station": "ALT0085",
   "location": "Altamaha River, Rockdedundy side, near Altamaha Sound",
   "lat": 31.33309364,
   "lon": -81.3416791,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "ALT0086",
   "location": "Altamaha River, Rockdedundy side, near Altamaha Sound",
   "lat": 31.33268595,
   "lon": -81.33813858,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "ALT0087",
   "location": "Altamaha River, Rockdedundy side, at Altamaha Sound",
   "lat": 31.33193493,
   "lon": -81.33461952,
   "habitat": "MUD",
   "depth": "8",
   "gear": "BOTH"
  },
  {
   "station": "ALT0088",
   "location": "Little Mud River, E-Bank, at Altamaha Sound",
   "lat": 31.33507932,
   "lon": -81.32628179,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "ALT0089",
   "location": "Altamaha Sound, Wolf side, at Altamaha River",
   "lat": 31.33043281,
   "lon": -81.32259937,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "ALT0090",
   "location": "Altamaha Sound, Wolf side, at Altamaha River",
   "lat": 31.3288866,
   "lon": -81.31956093,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "ALT0091",
   "location": "Altamaha Sound, Wolf side, at Altamaha River",
   "lat": 31.32720552,
   "lon": -81.31528733,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "ALT0092",
   "location": "Altamaha Sound, Wolf side, at Altamaha River",
   "lat": 31.32455349,
   "lon": -81.30966425,
   "habitat": "SHELL",
   "depth": "0",
   "gear": "BOTH"
  },
  {
   "station": "ALT0093",
   "location": "Altamaha Sound, Wolf side, at Altamaha River",
   "lat": 31.32299379,
   "lon": -81.30454584,
   "habitat": "MUD",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "ALT0094",
   "location": "Altamaha Sound, Wolf side, at Altamaha River",
   "lat": 31.32329738,
   "lon": -81.29317512,
   "habitat": "SAND",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "ALT0095",
   "location": "Altamaha Sound, Wolf side, at Altamaha River",
   "lat": 31.3229968,
   "lon": -81.29164743,
   "habitat": "SAND",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "ALT0096",
   "location": "Altamaha River, at Altamaha Sound",
   "lat": 31.31509066,
   "lon": -81.29790545,
   "habitat": "SHELL",
   "depth": "0",
   "gear": "BOTH"
  },
  {
   "station": "ALT0097",
   "location": "Altamaha Sound, S-Bank, at Altamaha River",
   "lat": 31.31337404,
   "lon": -81.32369757,
   "habitat": "MUD",
   "depth": "0",
   "gear": "GILL"
  },
  {
   "station": "ALT0098",
   "location": "Altamaha Sound, Dolbow side, at Altamaha River",
   "lat": 31.3133955,
   "lon": -81.32725954,
   "habitat": "MUD",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "ALT0099",
   "location": "Altamaha Sound, S-Bank, at Altamaha River",
   "lat": 31.31069183,
   "lon": -81.33152962,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "ALT0100",
   "location": "Altamaha River, at Altamaha Sound",
   "lat": 31.30687237,
   "lon": -81.33075714,
   "habitat": "MUD",
   "depth": "0",
   "gear": "BOTH"
  },
  {
   "station": "ALT0101",
   "location": "Altamaha Sound, Dolbow side, at Altamaha River",
   "lat": 31.3171806,
   "lon": -81.33014518,
   "habitat": "MUD",
   "depth": "8",
   "gear": "BOTH"
  },
  {
   "station": "ALT0102",
   "location": "Altamaha Sound, N-Bank, at Altamaha River",
   "lat": 31.3180089,
   "lon": -81.33861065,
   "habitat": "MUD",
   "depth": "0",
   "gear": "BOTH"
  },
  {
   "station": "ALT0103",
   "location": "Altamaha Sound, N-Bank, at Altamaha River",
   "lat": 31.31133556,
   "lon": -81.33798838,
   "habitat": "MUD",
   "depth": "8",
   "gear": "BOTH"
  },
  {
   "station": "ALT0104",
   "location": "Altamaha River, S-Bank, near Altamaha Sound",
   "lat": 31.3115716,
   "lon": -81.3419795,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "ALT0105",
   "location": "Altamaha River, N-Bank, at Altamaha Sound",
   "lat": 31.31632875,
   "lon": -81.34093545,
   "habitat": "MUD",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "ALT0106",
   "location": "Altamaha River, near Altamaha Sound",
   "lat": 31.31511211,
   "lon": -81.34586334,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "ALT0107",
   "location": "Altamaha River, near Little St. Simons Island",
   "lat": 31.31200075,
   "lon": -81.35642052,
   "habitat": "MUD",
   "depth": "8",
   "gear": "BOTH"
  },
  {
   "station": "ALT0108",
   "location": "Altamaha River, S-Bank, at Buttermilk Sound",
   "lat": 31.31251574,
   "lon": -81.36459589,
   "habitat": "MUD",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "ALT0109",
   "location": "Buttermilk Sound, Broughton side, at Altamaha River",
   "lat": 31.32279178,
   "lon": -81.37282088,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "ALT0110",
   "location": "Onemile Cut, at Altamaha River",
   "lat": 31.32392535,
   "lon": -81.37147701,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "ALT0111",
   "location": "Onemile Cut, N-Bank, near Altamaha River",
   "lat": 31.32729923,
   "lon": -81.37146595,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "ALT0112",
   "location": "Altamaha Sound, at Altamaha River",
   "lat": 31.31169,
   "lon": -81.29542,
   "habitat": "shell",
   "depth": "3'",
   "gear": "BOTH"
  },
  {
   "station": "ALT0113",
   "location": "Altamaha Sound, E-Bank, at Altamaha River",
   "lat": 31.31256385,
   "lon": -81.29206032,
   "habitat": "SHELL",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "ALT0114",
   "location": "Altamaha Sound, W-Bank, at Altamaha River",
   "lat": 31.31017685,
   "lon": -81.31756067,
   "habitat": "SHELL",
   "depth": "6",
   "gear": "GILL"
  },
  {
   "station": "ALT0115",
   "location": "Altamaha River, at Altamaha Sound",
   "lat": 31.31049871,
   "lon": -81.31940603,
   "habitat": "SHELL",
   "depth": "6",
   "gear": "GILL"
  },
  {
   "station": "ALT0116",
   "location": "Little Mud River, E-Bank, near Altamaha Sound",
   "lat": 31.33936758,
   "lon": -81.32686484,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "ALT0117",
   "location": "Little Mud River, Wolf side",
   "lat": 31.34265195,
   "lon": -81.32651548,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "ALT0118",
   "location": "Little Mud River, E-Bank, near Crooked Creek",
   "lat": 31.34943584,
   "lon": -81.32820167,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "ALT0119",
   "location": "Little Mud River, N-Bank, near Crooked Creek",
   "lat": 31.35322094,
   "lon": -81.33159399,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "ALT0120",
   "location": "Crooked Creek, near Little Mud River",
   "lat": 31.3519085,
   "lon": -81.3349444,
   "habitat": "MUD",
   "depth": "8",
   "gear": "GILL"
  },
  {
   "station": "ALT0121",
   "location": "Crooked Creek, near Little Mud River",
   "lat": 31.35056019,
   "lon": -81.33910418,
   "habitat": "MUD",
   "depth": "7",
   "gear": "GILL"
  },
  {
   "station": "ALT0122",
   "location": "Little Mud River, N-Bank, near Crooked Creek",
   "lat": 31.35663271,
   "lon": -81.33449078,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "ALT0123",
   "location": "Little Mud River, W-Bank, near Crooked Creek",
   "lat": 31.35826349,
   "lon": -81.33743048,
   "habitat": "SHELL",
   "depth": "7",
   "gear": "GILL"
  },
  {
   "station": "ALT0124",
   "location": "Little Mud River, W-Bank, near South River",
   "lat": 31.36017323,
   "lon": -81.33816004,
   "habitat": "SHELL",
   "depth": "7",
   "gear": "GILL"
  },
  {
   "station": "ALT0125",
   "location": "Little Mud River, W-Bank, near South River",
   "lat": 31.36313438,
   "lon": -81.33717299,
   "habitat": "SHELL",
   "depth": "6",
   "gear": "GILL"
  },
  {
   "station": "ALT0126",
   "location": "South River, S-Bank, at Little Mud River",
   "lat": 31.36379957,
   "lon": -81.33080006,
   "habitat": "SHELL",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "ALT0127",
   "location": "South River, W-Bank, near Rockdedundy River",
   "lat": 31.36802673,
   "lon": -81.32663727,
   "habitat": "SHELL",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "ALT0128",
   "location": "South River, N-Bank, near Rockdedundy River",
   "lat": 31.37076778,
   "lon": -81.32375641,
   "habitat": "SHELL",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "ALT0129",
   "location": "South River, N-Bank, near Wolf Island",
   "lat": 31.37199447,
   "lon": -81.32046333,
   "habitat": "SHELL",
   "depth": "7",
   "gear": "GILL"
  },
  {
   "station": "ALT0130",
   "location": "South River, Wolf side",
   "lat": 31.36692158,
   "lon": -81.31557014,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "ALT0131",
   "location": "South River, W-Bank, near Wolf Creek",
   "lat": 31.36886358,
   "lon": -81.30292654,
   "habitat": "SHELL",
   "depth": "8",
   "gear": "GILL"
  },
  {
   "station": "ALT0132",
   "location": "Wolf Creek, W-Bank, at South River",
   "lat": 31.36493683,
   "lon": -81.30230427,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "ALT0133",
   "location": "Wolf Creek, W-Bank, near South River",
   "lat": 31.36008739,
   "lon": -81.30148888,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "ALT0134",
   "location": "Wolf Creek, Wolf Is. side",
   "lat": 31.35676146,
   "lon": -81.30196095,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "ALT0135",
   "location": "Wolf Creek, at Wolf Island",
   "lat": 31.35392904,
   "lon": -81.30067348,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "ALT0136",
   "location": "Wolf Creek, Wolf Is. side",
   "lat": 31.35371447,
   "lon": -81.30451441,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "ALT0137",
   "location": "Wolf Creek, at Wolf Island",
   "lat": 31.35641813,
   "lon": -81.30475044,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "ALT0138",
   "location": "Wolf Creek, at Wolf Island",
   "lat": 31.35725498,
   "lon": -81.30884886,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "ALT0139",
   "location": "Doboy Sound, S-Bank, near South River",
   "lat": 31.376816,
   "lon": -81.29533103,
   "habitat": "SHELL",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "ALT0140",
   "location": "Doboy Sound, S-Bank, near Commodore Island",
   "lat": 31.3779696,
   "lon": -81.29843904,
   "habitat": null,
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "ALT0141",
   "location": "Doboy Sound, S-Bank, near Back River",
   "lat": 31.378758,
   "lon": -81.30130976,
   "habitat": "SHELL",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "ALT0142",
   "location": "Doboy Sound, near Back River",
   "lat": 31.38007362,
   "lon": -81.30402474,
   "habitat": "SHELL",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "ALT0143",
   "location": "Doboy Sound, near Back River",
   "lat": 31.3806757,
   "lon": -81.30500668,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "ALT0144",
   "location": "Back River, near Doboy Sound",
   "lat": 31.38320007,
   "lon": -81.30789827,
   "habitat": "SHELL",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "ALT0145",
   "location": "Back River, Commodore side, at Doboy Sound",
   "lat": 31.38595873,
   "lon": -81.30629305,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "ALT0146",
   "location": "Back River, W-Bank, near Doboy Sound",
   "lat": 31.38573887,
   "lon": -81.3093775,
   "habitat": "SHELL",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "ALT0147",
   "location": "Back River, near Doboy Sound",
   "lat": 31.38478995,
   "lon": -81.3120168,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "ALT0148",
   "location": "Back River, Commodore side, near Doboy Sound",
   "lat": 31.38926027,
   "lon": -81.30833689,
   "habitat": "SHELL",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "ALT0149",
   "location": "Back River, S-Bank, near Doboy Sound",
   "lat": 31.38926639,
   "lon": -81.31160743,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "ALT0150",
   "location": "Back River, S-Bank, near Commodore Island",
   "lat": 31.3910934,
   "lon": -81.31387892,
   "habitat": "MUD",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "ALT0151",
   "location": "Back River, S-Bank, near Commodore Island",
   "lat": 31.39265687,
   "lon": -81.31615628,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "ALT0152",
   "location": "Back River, Doboy side",
   "lat": 31.39589271,
   "lon": -81.31725306,
   "habitat": "MUD",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "ALT0153",
   "location": "Back River, S-Bank, near Doboy Island",
   "lat": 31.3936834,
   "lon": -81.31972203,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "ALT0154",
   "location": "Back River, S-Bank, near Doboy Island",
   "lat": 31.39360394,
   "lon": -81.32252485,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "ALT0155",
   "location": "Back River, S-Bank, near North River",
   "lat": 31.39186705,
   "lon": -81.3271209,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "ALT0156",
   "location": "Back River, E-Bank, near North River",
   "lat": 31.39035193,
   "lon": -81.32878345,
   "habitat": "MUD",
   "depth": "8",
   "gear": "BOTH"
  },
  {
   "station": "ALT0157",
   "location": "Back River, E-Bank, near North River",
   "lat": 31.38844564,
   "lon": -81.32968635,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "ALT0158",
   "location": "Back River, E-Bank, near Darien River",
   "lat": 31.38569101,
   "lon": -81.33081573,
   "habitat": "MUD",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "ALT0159",
   "location": "Doboy Sound, Commodore side, near Back River",
   "lat": 31.3894202,
   "lon": -81.30455313,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "ALT0160",
   "location": "Doboy Sound, S-Bank, near Back River",
   "lat": 31.39181918,
   "lon": -81.30491607,
   "habitat": "SHELL",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "ALT0161",
   "location": "Doboy Sound, Commodore side, near Back River",
   "lat": 31.3957068,
   "lon": -81.30595299,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "ALT0162",
   "location": "Doboy Sound, Commodore side, near Back River",
   "lat": 31.39758585,
   "lon": -81.30777631,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "ALT0163",
   "location": "Doboy Sound, near Back River",
   "lat": 31.39885881,
   "lon": -81.30971362,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "ALT0164",
   "location": "Doboy Sound, near Back River",
   "lat": 31.40000554,
   "lon": -81.31146359,
   "habitat": "SHELL",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "ALT0165",
   "location": "North River mouth, N Doboy Island",
   "lat": 31.41009559,
   "lon": -81.3175973,
   "habitat": "SAND",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "ALT0166",
   "location": "North River mouth, N Doboy Island",
   "lat": 31.40969192,
   "lon": -81.31840087,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "ALT0167",
   "location": "North River mouth, N Doboy Island",
   "lat": 31.40836623,
   "lon": -81.3209012,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "ALT0168",
   "location": "North River, W of Doboy Island",
   "lat": 31.40565083,
   "lon": -81.3264278,
   "habitat": null,
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "ALT0169",
   "location": "North River, W of Doboy Island",
   "lat": 31.40324959,
   "lon": -81.32656418,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "ALT0170",
   "location": "North River, W of Doboy Island",
   "lat": 31.40312864,
   "lon": -81.32944822,
   "habitat": null,
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "ALT0171",
   "location": "North River, W of Doboy Island",
   "lat": 31.40088723,
   "lon": -81.33113123,
   "habitat": null,
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "ALT0172",
   "location": "North River, W of Doboy Island",
   "lat": 31.3978161,
   "lon": -81.33243964,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "ALT0173",
   "location": "Back River, at North River",
   "lat": 31.39568827,
   "lon": -81.33292831,
   "habitat": "MUD",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "ALT0174",
   "location": "North River, at Back River",
   "lat": 31.39252083,
   "lon": -81.33458097,
   "habitat": "MUD",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "ALT0175",
   "location": "Back River, W-Bank, near Rockdedundy River",
   "lat": 31.3793993,
   "lon": -81.3337183,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "ALT0176",
   "location": "Back River, E-Bank, near Rockdedundy River",
   "lat": 31.37804747,
   "lon": -81.3314867,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "ALT0177",
   "location": "Rockdedundy River, at Back River",
   "lat": 31.37480736,
   "lon": -81.33067131,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "ALT0178",
   "location": "Rockdedundy River, near Back River",
   "lat": 31.37538671,
   "lon": -81.32828951,
   "habitat": "MUD",
   "depth": "6",
   "gear": "GILL"
  },
  {
   "station": "ALT0179",
   "location": "Rockdedundy River, E-Bank, near Back River",
   "lat": 31.37397051,
   "lon": -81.33367538,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "ALT0180",
   "location": "Rockdedundy River, E-Bank, near South River",
   "lat": 31.37094749,
   "lon": -81.33247384,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "ALT0181",
   "location": "Rockdedundy River, E-Bank, at South River",
   "lat": 31.36813402,
   "lon": -81.33232355,
   "habitat": "SHELL",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "ALT0182",
   "location": "Rockdedundy River, at South River",
   "lat": 31.36695385,
   "lon": -81.33526325,
   "habitat": "SHELL",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "ALT0183",
   "location": "Rockdedundy River, W-Bank, near Back River",
   "lat": 31.37115955,
   "lon": -81.33633614,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "ALT0184",
   "location": "Rockdedundy River, near Back River",
   "lat": 31.37206078,
   "lon": -81.33837461,
   "habitat": "SHELL",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "ALT0185",
   "location": "Rockdedundy River, N-Bank, near Back River",
   "lat": 31.37472153,
   "lon": -81.33934021,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "ALT0186",
   "location": "Rockdedundy River, N-Bank, near Darien River",
   "lat": 31.37420654,
   "lon": -81.34227991,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "ALT0187",
   "location": "Rockdedundy River, W-Bank, near Darien River",
   "lat": 31.37150288,
   "lon": -81.35202169,
   "habitat": "MUD",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "ALT0188",
   "location": "Rockdedundy River, Rockdedundy Is. side",
   "lat": 31.36854172,
   "lon": -81.34738684,
   "habitat": "MUD",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "ALT0189",
   "location": "Rockdedundy River, near Rockdedundy Island",
   "lat": 31.36159086,
   "lon": -81.35275603,
   "habitat": "SAND",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "ALT0190",
   "location": "Rockdedundy River, N-Bank, near Darien River",
   "lat": 31.36186905,
   "lon": -81.35592682,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "ALT0191",
   "location": "Rockdedundy River, W-Bank, near Darien River",
   "lat": 31.36286055,
   "lon": -81.35873292,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "ALT0192",
   "location": "Darien River, N-Bank, at Back River",
   "lat": 31.38497259,
   "lon": -81.33578192,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "ALT0193",
   "location": "Darien River, S-Bank, at Back River",
   "lat": 31.38334064,
   "lon": -81.33566156,
   "habitat": "SHELL",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "ALT0194",
   "location": "Darien River, S-Bank, near Back River",
   "lat": 31.38342362,
   "lon": -81.33837235,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "ALT0195",
   "location": "Darien River, N-Bank, near North River",
   "lat": 31.38592654,
   "lon": -81.34201546,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "ALT0196",
   "location": "Darien River, S-Bank, near Rockdedundy Island",
   "lat": 31.38576871,
   "lon": -81.34612394,
   "habitat": "MUD",
   "depth": "8",
   "gear": "BOTH"
  },
  {
   "station": "ALT0197",
   "location": "Darien River, S-Bank, near Hird Island Creek",
   "lat": 31.38581975,
   "lon": -81.34930252,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "ALT0198",
   "location": "Darien River, near Hird Island Creek",
   "lat": 31.38684168,
   "lon": -81.3531323,
   "habitat": "MUD",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "ALT0199",
   "location": "Darien River, E-Bank, near Hird Island Creek",
   "lat": 31.38587893,
   "lon": -81.35597418,
   "habitat": "MUD",
   "depth": "8",
   "gear": "BOTH"
  },
  {
   "station": "ALT0200",
   "location": "Darien River, S-Bank, near Rockdedundy Island",
   "lat": 31.38075046,
   "lon": -81.3531178,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "ALT0201",
   "location": "Darien River, W-Bank, near Rockdedundy River",
   "lat": 31.37857854,
   "lon": -81.3495601,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "ALT0202",
   "location": "Darien River, S-Bank, near Rockdedundy River",
   "lat": 31.37520424,
   "lon": -81.35320027,
   "habitat": "MUD",
   "depth": "8",
   "gear": "BOTH"
  },
  {
   "station": "ALT0203",
   "location": "Darien River, S-Bank, near Rockdedundy River",
   "lat": 31.37094984,
   "lon": -81.35703038,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "ALT0204",
   "location": "Darien River, W-Bank, at Catfish Creek",
   "lat": 31.37000461,
   "lon": -81.36094591,
   "habitat": "MUD",
   "depth": "8",
   "gear": "BOTH"
  },
  {
   "station": "ALT0205",
   "location": "Darien River, N-Bank, near Rockdedundy River",
   "lat": 31.36783672,
   "lon": -81.3637598,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "ALT0206",
   "location": "Darien River, Rockdedundy side",
   "lat": 31.36445344,
   "lon": -81.36342544,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "ALT0207",
   "location": "Darien River, Rockdedundy side",
   "lat": 31.35796267,
   "lon": -81.37223708,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "ALT0208",
   "location": "Darien River, Rockdedundy side",
   "lat": 31.35775764,
   "lon": -81.37502759,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "ALT0209",
   "location": "Darien River, May Hall side",
   "lat": 31.36082131,
   "lon": -81.37512624,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "ALT0210",
   "location": "Darien River, Rockdedundy side",
   "lat": 31.35811782,
   "lon": -81.37732171,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "ALT0211",
   "location": "Darien River, May Hall side",
   "lat": 31.36156797,
   "lon": -81.3822341,
   "habitat": "MUD",
   "depth": "0",
   "gear": "BOTH"
  },
  {
   "station": "ALT0212",
   "location": "Darien River, at May Hall Creek",
   "lat": 31.36161089,
   "lon": -81.38543129,
   "habitat": "SAND",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "ALT0213",
   "location": "Darien River, at Long Reach",
   "lat": 31.36081696,
   "lon": -81.38895035,
   "habitat": "SAND",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "ALT0214",
   "location": "Long Reach, Black side, at Darien River",
   "lat": 31.35975547,
   "lon": -81.39362561,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "ALT0215",
   "location": "North and South Reach, at Darien River",
   "lat": 31.35770559,
   "lon": -81.41079426,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "ALT0216",
   "location": "North and South Reach, at Darien River",
   "lat": 31.35404371,
   "lon": -81.41440501,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "ALT0217",
   "location": "North and South Reach, at Darien River",
   "lat": 31.35045047,
   "lon": -81.41495629,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "ALT0218",
   "location": "Darien River, at Pico Cut",
   "lat": 31.3550663,
   "lon": -81.42021418,
   "habitat": "MUD",
   "depth": "7",
   "gear": "GILL"
  },
  {
   "station": "ALT0219",
   "location": "Darien River, N-Bank, near Pico Cut",
   "lat": 31.35581732,
   "lon": -81.42650127,
   "habitat": "MUD",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "ALT0220",
   "location": "Darien River, Rockdedundy side, near Pico Cut",
   "lat": 31.35616064,
   "lon": -81.42987013,
   "habitat": "MUD",
   "depth": "8",
   "gear": "BOTH"
  },
  {
   "station": "HAM0001",
   "location": "Wilson Creek, at Hampton River",
   "lat": 31.28396161,
   "lon": -81.37973914,
   "habitat": "MUD",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "HAM0002",
   "location": "Wilson Creek, S branch, near Hampton River",
   "lat": 31.2818497,
   "lon": -81.37787668,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "HAM0003",
   "location": "Wilson Creek, S branch, near Hampton River",
   "lat": 31.28042428,
   "lon": -81.37629384,
   "habitat": "MUD",
   "depth": "6",
   "gear": "GILL"
  },
  {
   "station": "HAM0004",
   "location": "Wilson Creek, W-Bank, near Hampton River",
   "lat": 31.28436352,
   "lon": -81.3759838,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "HAM0005",
   "location": "Wilson Creek, E-Bank, near Hampton River",
   "lat": 31.28541352,
   "lon": -81.37306798,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "HAM0006",
   "location": "Wilson Creek, St. Simons side",
   "lat": 31.28738,
   "lon": -81.3709161,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "HAM0007",
   "location": "Wilson Creek, at St. Simons Island",
   "lat": 31.28466561,
   "lon": -81.36921499,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "HAM0008",
   "location": "Wilson Creek, at St. Simons Island",
   "lat": 31.28299995,
   "lon": -81.36437528,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "HAM0009",
   "location": "Wilson Creek, at St. Simons Island",
   "lat": 31.28390419,
   "lon": -81.36287659,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "HAM0010",
   "location": "Wilson Creek, at St. Simons Island",
   "lat": 31.2848423,
   "lon": -81.36101179,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "HAM0011",
   "location": "Wilson Creek, at St. Simons Island",
   "lat": 31.28717422,
   "lon": -81.35910273,
   "habitat": "MUD",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "HAM0012",
   "location": "Wilson Creek, at St. Simons Island",
   "lat": 31.28795106,
   "lon": -81.35643862,
   "habitat": "MUD",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "HAM0013",
   "location": "Hampton River, E-Bank, near Wilson Creek",
   "lat": 31.29101054,
   "lon": -81.37893138,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "HAM0014",
   "location": "Hampton River side creek, W side",
   "lat": 31.29593315,
   "lon": -81.38205087,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "HAM0015",
   "location": "Hampton River side creek, N side",
   "lat": 31.30320436,
   "lon": -81.37539756,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "HAM0016",
   "location": "Hampton River, at Little St. Simons Island",
   "lat": 31.29625183,
   "lon": -81.3697687,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "HAM0017",
   "location": "Hampton River, at Little St. Simons Island",
   "lat": 31.29602702,
   "lon": -81.36770558,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "HAM0018",
   "location": "Hampton River side creek, S side",
   "lat": 31.29229842,
   "lon": -81.36511054,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "HAM0019",
   "location": "Hampton River, St. Simons side",
   "lat": 31.29716998,
   "lon": -81.35982466,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "HAM0020",
   "location": "Hampton River side creek, upper NW",
   "lat": 31.30533655,
   "lon": -81.3616691,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "HAM0021",
   "location": "Hampton River side creek, upper NW",
   "lat": 31.30649853,
   "lon": -81.36280241,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "HAM0022",
   "location": "Hampton River side creek, near Buttermilk Sound",
   "lat": 31.30830919,
   "lon": -81.36699814,
   "habitat": "MUD",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "HAM0023",
   "location": "Hampton River side creek, near Buttermilk Sound",
   "lat": 31.30889668,
   "lon": -81.36855986,
   "habitat": "MUD",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "HAM0024",
   "location": "Hampton River, N-Bank, at side creek",
   "lat": 31.299935,
   "lon": -81.35271111,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "HAM0025",
   "location": "Hampton River N side creek, upper",
   "lat": 31.3036108,
   "lon": -81.35238647,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "HAM0026",
   "location": "Hampton River N side creek, upper",
   "lat": 31.30535617,
   "lon": -81.35217693,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "HAM0027",
   "location": "Hampton River, N-Bank, at side creek",
   "lat": 31.29976016,
   "lon": -81.34592939,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "HAM0028",
   "location": "Hampton River N side creek, E",
   "lat": 31.30561844,
   "lon": -81.34480664,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "HAM0029",
   "location": "Hampton River N side creek, E",
   "lat": 31.30459366,
   "lon": -81.34297645,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "HAM0030",
   "location": "Hampton River, N-Bank, near Hampton River Marina",
   "lat": 31.29803684,
   "lon": -81.34238016,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "HAM0031",
   "location": "Hampton River side creek, N branch",
   "lat": 31.30165153,
   "lon": -81.33287667,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "HAM0032",
   "location": "Hampton River side creek, N branch",
   "lat": 31.30239459,
   "lon": -81.32795918,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "HAM0033",
   "location": "Hampton River side creek, E branch",
   "lat": 31.29651485,
   "lon": -81.32388465,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "HAM0034",
   "location": "Hampton River, S-Bank, near Hampton River Marina",
   "lat": 31.29401662,
   "lon": -81.34182964,
   "habitat": "SHELL",
   "depth": "6",
   "gear": "GILL"
  },
  {
   "station": "HAM0035",
   "location": "Hampton River, N-Bank, near Hampton River Marina",
   "lat": 31.29517391,
   "lon": -81.33937147,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "HAM0036",
   "location": "Jones Creek, E-Bank, at Hampton River",
   "lat": 31.29129519,
   "lon": -81.33801495,
   "habitat": "MUD",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "HAM0037",
   "location": "Jones Creek, E-Bank, near Cannons Point",
   "lat": 31.28658079,
   "lon": -81.33301036,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "HAM0038",
   "location": "Jones Creek, E-Bank, at Cannons Point",
   "lat": 31.28417535,
   "lon": -81.33267123,
   "habitat": "SHELL",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "HAM0039",
   "location": "Jones Creek, St. Simons side",
   "lat": 31.28223896,
   "lon": -81.33635759,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "HAM0040",
   "location": "Jones Creek, at St. Simons Island",
   "lat": 31.28140538,
   "lon": -81.33814956,
   "habitat": "MUD",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "HAM0041",
   "location": "Jones Creek, at St. Simons Island",
   "lat": 31.2782967,
   "lon": -81.34285206,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "HAM0042",
   "location": "Jones Creek, St. Simons side",
   "lat": 31.27460615,
   "lon": -81.3421204,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "HAM0043",
   "location": "Jones Creek, at St. Simons Island",
   "lat": 31.26761832,
   "lon": -81.34453598,
   "habitat": "MUD",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "HAM0044",
   "location": "Jones Creek, at St. Simons Island",
   "lat": 31.2687249,
   "lon": -81.34872409,
   "habitat": "MUD",
   "depth": "3",
   "gear": "GILL"
  },
  {
   "station": "HAM0045",
   "location": "Hampton River, S-Bank, near Jones Creek",
   "lat": 31.29124029,
   "lon": -81.33490124,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "HAM0046",
   "location": "Hampton River, S-Bank, near Jones Creek",
   "lat": 31.29077727,
   "lon": -81.33214661,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "HAM0047",
   "location": "Hampton River, N-Bank, near Jones Creek",
   "lat": 31.2926834,
   "lon": -81.32803688,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "HAM0048",
   "location": "Hampton River, S-Bank, near Jones Creek",
   "lat": 31.29003354,
   "lon": -81.32731838,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "HAM0049",
   "location": "Hampton River, off Cannons Point",
   "lat": 31.28860493,
   "lon": -81.32492241,
   "habitat": "SHELL",
   "depth": "3",
   "gear": "BOTH"
  },
  {
   "station": "HAM0050",
   "location": "Hampton River, N-Bank, at side creek",
   "lat": 31.28820009,
   "lon": -81.32026895,
   "habitat": "SHELL",
   "depth": "8",
   "gear": "GILL"
  },
  {
   "station": "HAM0051",
   "location": "Hampton River, at Little St. Simons Island",
   "lat": 31.28573715,
   "lon": -81.31730729,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "HAM0052",
   "location": "Old House Creek, mouth, at Hampton River",
   "lat": 31.28434718,
   "lon": -81.31431688,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "HAM0053",
   "location": "Old House Creek, N branch",
   "lat": 31.28796849,
   "lon": -81.31032784,
   "habitat": "MUD",
   "depth": "7",
   "gear": "GILL"
  },
  {
   "station": "HAM0054",
   "location": "Hampton River, St. Simons side",
   "lat": 31.28197099,
   "lon": -81.31778112,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "HAM0055",
   "location": "Hampton River, St. Simons side",
   "lat": 31.27890908,
   "lon": -81.31835251,
   "habitat": "SHELL",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "HAM0056",
   "location": "Hampton River, at Little St. Simons Island",
   "lat": 31.27712659,
   "lon": -81.31562915,
   "habitat": "MUD",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "HAM0057",
   "location": "Mosquito Creek, W-Bank, at Hampton River",
   "lat": 31.26698381,
   "lon": -81.30841451,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "HAM0058",
   "location": "Mosquito Creek, near Hampton River",
   "lat": 31.2643555,
   "lon": -81.30586264,
   "habitat": "MUD",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "HAM0059",
   "location": "Mosquito Creek, W-Bank, near Hampton River",
   "lat": 31.26162845,
   "lon": -81.30502939,
   "habitat": "MUD",
   "depth": "8",
   "gear": "BOTH"
  },
  {
   "station": "HAM0060",
   "location": "Mosquito Creek, at Little St. Simons Island",
   "lat": 31.25993103,
   "lon": -81.30335351,
   "habitat": "MUD",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "HAM0061",
   "location": "Mosquito Creek, at Little St. Simons Island",
   "lat": 31.25799724,
   "lon": -81.30132677,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "HAM0062",
   "location": "Mosquito Creek, near Pine Creek",
   "lat": 31.25461212,
   "lon": -81.30681172,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "HAM0063",
   "location": "Mosquito Creek, near Pine Creek",
   "lat": 31.25232135,
   "lon": -81.30773616,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "HAM0064",
   "location": "Mosquito Creek, near Pine Creek",
   "lat": 31.2506324,
   "lon": -81.30970138,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "HAM0065",
   "location": "Hampton River, E-Bank, near Mosquito Creek",
   "lat": 31.26370498,
   "lon": -81.31140517,
   "habitat": "SHELL",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "HAM0066",
   "location": "Hampton River, S-Bank, at Pine Creek",
   "lat": 31.26104197,
   "lon": -81.31366703,
   "habitat": "SHELL",
   "depth": "8",
   "gear": "BOTH"
  },
  {
   "station": "HAM0067",
   "location": "Pine Creek, E-Bank, near Mosquito Creek",
   "lat": 31.25357972,
   "lon": -81.31327844,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "HAM0068",
   "location": "Pine Creek, W-Bank, near Mosquito Creek",
   "lat": 31.25312065,
   "lon": -81.3147462,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "HAM0069",
   "location": "Pine Creek, N-Bank, near Mosquito Creek",
   "lat": 31.25152172,
   "lon": -81.32078997,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "HAM0070",
   "location": "Pine Creek, W-Bank, near Hampton River",
   "lat": 31.25705,
   "lon": -81.32633887,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "HAM0071",
   "location": "Hampton River, near Pine Creek",
   "lat": 31.26572485,
   "lon": -81.31961583,
   "habitat": "SHELL",
   "depth": "8",
   "gear": "BOTH"
  },
  {
   "station": "HAM0072",
   "location": "Hampton River, S-Bank, near Pine Creek",
   "lat": 31.26125227,
   "lon": -81.3212664,
   "habitat": "SHELL",
   "depth": "20",
   "gear": "BOTH"
  },
  {
   "station": "HAM0073",
   "location": "Hampton River, St. Simons side",
   "lat": 31.26610975,
   "lon": -81.32304378,
   "habitat": "SHELL",
   "depth": "9",
   "gear": "GILL"
  },
  {
   "station": "HAM0074",
   "location": "Hampton River, S-Bank, near Pine Creek",
   "lat": 31.26240444,
   "lon": -81.32500791,
   "habitat": "SHELL",
   "depth": "9",
   "gear": "BOTH"
  },
  {
   "station": "HAM0075",
   "location": "Hampton River N side creek, lower",
   "lat": 31.26598142,
   "lon": -81.32835237,
   "habitat": "MUD",
   "depth": "9",
   "gear": "GILL"
  },
  {
   "station": "HAM0076",
   "location": "Hampton River N side creek, lower",
   "lat": 31.26858157,
   "lon": -81.32988165,
   "habitat": "MUD",
   "depth": "8",
   "gear": "GILL"
  },
  {
   "station": "HAM0077",
   "location": "Hampton River, W-Bank, near Pine Creek",
   "lat": 31.26112956,
   "lon": -81.3321487,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "HAM0078",
   "location": "Hampton River, E-Bank, near Pine Creek",
   "lat": 31.25579531,
   "lon": -81.3302865,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "HAM0079",
   "location": "Hampton River, E-Bank, near Pine Creek",
   "lat": 31.2538606,
   "lon": -81.33056251,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "HAM0080",
   "location": "Hampton River, St. Simons side",
   "lat": 31.25245227,
   "lon": -81.33517122,
   "habitat": "SAND",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "HAM0081",
   "location": "Hampton River, St. Simons side",
   "lat": 31.25023861,
   "lon": -81.33614327,
   "habitat": "SHELL",
   "depth": "8",
   "gear": "BOTH"
  },
  {
   "station": "HAM0082",
   "location": "Hampton River, W-Bank, near Oatland Creek",
   "lat": 31.24622402,
   "lon": -81.33630806,
   "habitat": "SHELL",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "HAM0083",
   "location": "Hampton River, W-Bank, near Brailsford Creek",
   "lat": 31.24334542,
   "lon": -81.33423169,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "HAM0084",
   "location": "Hampton River, W-Bank, at Brailsford Creek",
   "lat": 31.24183157,
   "lon": -81.33209682,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "HAM0085",
   "location": "Brailsford Creek, near Hampton River",
   "lat": 31.23938195,
   "lon": -81.33359944,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "HAM0086",
   "location": "Brailsford Creek",
   "lat": 31.23544833,
   "lon": -81.33331832,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "HAM0087",
   "location": "Brailsford Creek, at W branch",
   "lat": 31.23253704,
   "lon": -81.3346207,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "HAM0088",
   "location": "Brailsford Creek, W branch",
   "lat": 31.23263092,
   "lon": -81.33719696,
   "habitat": "MUD",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "HAM0089",
   "location": "Brailsford Creek, W branch",
   "lat": 31.23624662,
   "lon": -81.33766131,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "HAM0090",
   "location": "Brailsford Creek, W branch, upper",
   "lat": 31.23581562,
   "lon": -81.34328138,
   "habitat": "MUD",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "HAM0091",
   "location": "Brailsford Creek, W branch, upper",
   "lat": 31.2330356,
   "lon": -81.3452627,
   "habitat": "MUD",
   "depth": "10",
   "gear": "GILL"
  },
  {
   "station": "HAM0092",
   "location": "Hampton River, E-Bank, near Eagle Nest Creek",
   "lat": 31.24528734,
   "lon": -81.32817627,
   "habitat": "SHELL",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "HAM0093",
   "location": "Hampton River, E-Bank, at Eagle Nest Creek",
   "lat": 31.24244764,
   "lon": -81.32425102,
   "habitat": "SHELL",
   "depth": "9",
   "gear": "BOTH"
  },
  {
   "station": "HAM0094",
   "location": "Hampton River, W-Bank, near Village Creek",
   "lat": 31.23888633,
   "lon": -81.32764259,
   "habitat": "SHELL",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "HAM0095",
   "location": "Eagle Nest Creek, near Hampton River",
   "lat": 31.24226114,
   "lon": -81.32071872,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "HAM0096",
   "location": "Eagle Nest Creek, upper",
   "lat": 31.24171455,
   "lon": -81.3171389,
   "habitat": "MUD",
   "depth": "5",
   "gear": "GILL"
  },
  {
   "station": "HAM0097",
   "location": "Hampton River, E-Bank, near Eagle Nest Creek",
   "lat": 31.23762636,
   "lon": -81.32079315,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "HAM0098",
   "location": "Hampton River, E-Bank, near Eagle Nest Creek",
   "lat": 31.23600648,
   "lon": -81.31977442,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "HAM0099",
   "location": "Hampton River, at Little St. Simons Island",
   "lat": 31.23223831,
   "lon": -81.31746017,
   "habitat": "MUD",
   "depth": "8",
   "gear": "BOTH"
  },
  {
   "station": "HAM0100",
   "location": "Hampton River, W-Bank, near Village Creek",
   "lat": 31.22857315,
   "lon": -81.32323463,
   "habitat": "SHELL",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "HAM0101",
   "location": "Hampton River, at Little St. Simons Island",
   "lat": 31.22486358,
   "lon": -81.31375009,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "HAM0102",
   "location": "Hampton River, near Little St. Simons Island",
   "lat": 31.22002336,
   "lon": -81.31680882,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "HAM0103",
   "location": "Hampton River, near Little St. Simons Island",
   "lat": 31.21824145,
   "lon": -81.31510729,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "GILL"
  },
  {
   "station": "HAM0104",
   "location": "Hampton River, near Little St. Simons Island",
   "lat": 31.21690295,
   "lon": -81.31294761,
   "habitat": "SHELL",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "HAM0105",
   "location": "Hampton River, at Little St. Simons Island",
   "lat": 31.21905282,
   "lon": -81.3069149,
   "habitat": "SHELL",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "HAM0106",
   "location": "Village Creek, at Hampton River",
   "lat": 31.23426137,
   "lon": -81.32746867,
   "habitat": "SHELL",
   "depth": "7",
   "gear": "GILL"
  },
  {
   "station": "HAM0107",
   "location": "Village Creek, S-Bank, at Hampton River",
   "lat": 31.23215332,
   "lon": -81.32595138,
   "habitat": "SHELL",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "HAM0108",
   "location": "Village Creek, near Hampton River",
   "lat": 31.23278799,
   "lon": -81.32980538,
   "habitat": "SHELL",
   "depth": "9",
   "gear": "BOTH"
  },
  {
   "station": "HAM0109",
   "location": "Village Creek, near Hampton River",
   "lat": 31.22875764,
   "lon": -81.3309464,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "HAM0110",
   "location": "Village Creek W side creek",
   "lat": 31.22679912,
   "lon": -81.33405156,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "HAM0111",
   "location": "Village Creek, E-Bank, near Hampton River",
   "lat": 31.22855614,
   "lon": -81.32745065,
   "habitat": "SHELL",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "HAM0112",
   "location": "Village Creek, W-Bank, near Hampton River",
   "lat": 31.22480063,
   "lon": -81.328518,
   "habitat": "SHELL",
   "depth": "8",
   "gear": "BOTH"
  },
  {
   "station": "HAM0113",
   "location": "Village Creek, E-Bank, near Hampton River",
   "lat": 31.22184316,
   "lon": -81.32482225,
   "habitat": "MUD",
   "depth": "8",
   "gear": "BOTH"
  },
  {
   "station": "HAM0114",
   "location": "Village Creek, W-Bank, near Hampton River",
   "lat": 31.22147804,
   "lon": -81.32687246,
   "habitat": "MUD",
   "depth": "0",
   "gear": "GILL"
  },
  {
   "station": "HAM0115",
   "location": "Village Creek, E-Bank, near St. Simons Island",
   "lat": 31.21877999,
   "lon": -81.32537621,
   "habitat": "MUD",
   "depth": "18",
   "gear": "BOTH"
  },
  {
   "station": "HAM0116",
   "location": "Village Creek, St. Simons side",
   "lat": 31.21730335,
   "lon": -81.33084222,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "HAM0117",
   "location": "Village Creek, S-Bank, near St. Simons Island",
   "lat": 31.21578581,
   "lon": -81.33422079,
   "habitat": "SHELL",
   "depth": "8",
   "gear": "BOTH"
  },
  {
   "station": "HAM0118",
   "location": "Village Creek, W-Bank, near St. Simons Island",
   "lat": 31.21822016,
   "lon": -81.33765067,
   "habitat": "SHELL",
   "depth": "8",
   "gear": "BOTH"
  },
  {
   "station": "HAM0119",
   "location": "Village Creek, St. Simons side",
   "lat": 31.22101067,
   "lon": -81.33783666,
   "habitat": "SHELL",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "HAM0120",
   "location": "Village Creek, S-Bank, near St. Simons Island",
   "lat": 31.22039384,
   "lon": -81.34547669,
   "habitat": "MUD",
   "depth": "5",
   "gear": "BOTH"
  },
  {
   "station": "HAM0121",
   "location": "Village Creek, St. Simons side",
   "lat": 31.21803693,
   "lon": -81.35305166,
   "habitat": "SHELL",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "HAM0122",
   "location": "Village Creek, E-Bank, near St. Simons Island",
   "lat": 31.21739429,
   "lon": -81.35029645,
   "habitat": "SHELL",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "HAM0123",
   "location": "Village Creek, E-Bank, near St. Simons Island",
   "lat": 31.21317216,
   "lon": -81.3491514,
   "habitat": "SHELL",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "HAM0124",
   "location": "Village Creek, St. Simons side",
   "lat": 31.20993247,
   "lon": -81.35054681,
   "habitat": "SHELL",
   "depth": "0",
   "gear": "BOTH"
  },
  {
   "station": "HAM0125",
   "location": "Village Creek, N-Bank, near St. Simons Island",
   "lat": 31.20961388,
   "lon": -81.34508559,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "HAM0126",
   "location": "Village Creek, S-Bank, near St. Simons Island",
   "lat": 31.20757992,
   "lon": -81.34148137,
   "habitat": "MUD",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "HAM0127",
   "location": "Village Creek, near St. Simons Island",
   "lat": 31.20756148,
   "lon": -81.3396801,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "HAM0128",
   "location": "Village Creek, near St. Simons Island",
   "lat": 31.20304146,
   "lon": -81.35040231,
   "habitat": "MUD",
   "depth": "8",
   "gear": "BOTH"
  },
  {
   "station": "HAM0129",
   "location": "Village Creek, near Blackbank River",
   "lat": 31.1993385,
   "lon": -81.35389321,
   "habitat": "MUD",
   "depth": "10",
   "gear": "BOTH"
  },
  {
   "station": "HAM0130",
   "location": "Blackbank River, N-Bank, at Village Creek",
   "lat": 31.19611608,
   "lon": -81.34869609,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "HAM0131",
   "location": "Blackbank River, at Village Creek",
   "lat": 31.19498201,
   "lon": -81.3468716,
   "habitat": "MUD",
   "depth": "4",
   "gear": "BOTH"
  },
  {
   "station": "HAM0132",
   "location": "Blackbank River, E-Bank, near Village Creek",
   "lat": 31.19260557,
   "lon": -81.34604422,
   "habitat": "SHELL",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "HAM0133",
   "location": "Blackbank River, near Sea Island Beach",
   "lat": 31.18855476,
   "lon": -81.3492322,
   "habitat": "SHELL",
   "depth": "0",
   "gear": "BOTH"
  },
  {
   "station": "HAM0134",
   "location": "Blackbank River, near Sea Island Beach",
   "lat": 31.18821278,
   "lon": -81.35281336,
   "habitat": "MUD",
   "depth": "6",
   "gear": "BOTH"
  },
  {
   "station": "HAM0135",
   "location": "Blackbank River, near Sea Island Beach",
   "lat": 31.18599887,
   "lon": -81.35573077,
   "habitat": "MUD",
   "depth": "6",
   "gear": "GILL"
  },
  {
   "station": "HAM0136",
   "location": "Blackbank River, S-Bank, near Sea Island Beach",
   "lat": 31.18576719,
   "lon": -81.34900496,
   "habitat": "SHELL",
   "depth": "7",
   "gear": "BOTH"
  },
  {
   "station": "HAM0137",
   "location": "Blackbank River, N-Bank, near Sea Island Beach",
   "lat": 31.18488994,
   "lon": -81.35237231,
   "habitat": "SHELL",
   "depth": "8",
   "gear": "BOTH"
  }
 ],
 "stationsSTA": [
  {
   "station": "STA0001",
   "location": "Umbrella Creek, near Dover Creek",
   "lat": 31.011714879,
   "lon": -81.506279558,
   "habitat": "MUD",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0002",
   "location": "Umbrella Creek, near Dover Cut",
   "lat": 31.010439992,
   "lon": -81.477059908,
   "habitat": "MUD",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0003",
   "location": "Umbrella Creek, Dover Bluff side",
   "lat": 31.014600014,
   "lon": -81.527069947,
   "habitat": "MUD",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0004",
   "location": "Umbrella Creek, near Dover Bluff",
   "lat": 31.013665097,
   "lon": -81.523593552,
   "habitat": "MUD",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0005",
   "location": "Umbrella Creek, near Dover Bluff",
   "lat": 31.013452616,
   "lon": -81.51371791,
   "habitat": "MUD",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0006",
   "location": "Umbrella Creek, E-Bank, near Dover Bluff",
   "lat": 31.013665097,
   "lon": -81.510400018,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0007",
   "location": "Umbrella Creek, near Dover Bluff",
   "lat": 31.014600014,
   "lon": -81.506229937,
   "habitat": "MUD",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0008",
   "location": "Umbrella Creek",
   "lat": 31.013325127,
   "lon": -81.468085991,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0009",
   "location": "Umbrella Creek, near St. Andrew Sound",
   "lat": 31.014600014,
   "lon": -81.464559976,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0010",
   "location": "St. Andrew Sound, near Jekyll Sound",
   "lat": 31.014249986,
   "lon": -81.454441594,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0011",
   "location": "Umbrella Creek, E-Bank, near Dover Bluff",
   "lat": 31.018770011,
   "lon": -81.506229937,
   "habitat": "MUD",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0012",
   "location": "Umbrella Creek side creek, S side",
   "lat": 31.01821756,
   "lon": -81.497107409,
   "habitat": "MUD",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0013",
   "location": "Umbrella Creek, N-Bank, near St. Andrew Sound",
   "lat": 31.018770011,
   "lon": -81.456229957,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0014",
   "location": "Umbrella Creek, near Dover Bluff",
   "lat": 31.022940008,
   "lon": -81.497899918,
   "habitat": "MUD",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0015",
   "location": "Umbrella Creek, near Little Satilla River",
   "lat": 31.024131663,
   "lon": -81.493361704,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0016",
   "location": "Umbrella Creek, near Dover Cut",
   "lat": 31.022940008,
   "lon": -81.489559924,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0017",
   "location": "Umbrella Creek, near Dover Cut",
   "lat": 31.022940008,
   "lon": -81.481229989,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0018",
   "location": "Umbrella Creek side creek, N side",
   "lat": 31.026176596,
   "lon": -81.504012672,
   "habitat": "MUD",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0019",
   "location": "Umbrella Creek, N-Bank, at Little Satilla River",
   "lat": 31.026607091,
   "lon": -81.4801504,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0020",
   "location": "Little Satilla River, at Umbrella Creek",
   "lat": 31.027110005,
   "lon": -81.477059908,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0021",
   "location": "Jekyll Creek, at Jekyll Island",
   "lat": 31.035440024,
   "lon": -81.427059928,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0022",
   "location": "Little Satilla River",
   "lat": 31.039610021,
   "lon": -81.493729921,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0023",
   "location": "Little Satilla River, W-Bank",
   "lat": 31.039127223,
   "lon": -81.491137147,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0024",
   "location": "Little Satilla River, W-Bank",
   "lat": 31.043651942,
   "lon": -81.499375133,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0025",
   "location": "Jointer Creek, at Jekyll Sound",
   "lat": 31.043769959,
   "lon": -81.464559976,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0026",
   "location": "Jointer Creek",
   "lat": 31.047939956,
   "lon": -81.468729973,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0028",
   "location": "Little Satilla River",
   "lat": 31.052116575,
   "lon": -81.500879852,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0029",
   "location": "Jointer Creek, S-Bank",
   "lat": 31.053658426,
   "lon": -81.476028515,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0030",
   "location": "Little Satilla River, S-Bank, near Kirby Creek",
   "lat": 31.057617785,
   "lon": -81.514818203,
   "habitat": "MUD",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0031",
   "location": "Little Satilla River, S-Bank",
   "lat": 31.056269975,
   "lon": -81.510399934,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0032",
   "location": "Little Satilla River",
   "lat": 31.05538887,
   "lon": -81.502060024,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0033",
   "location": "Little Satilla River",
   "lat": 31.057386613,
   "lon": -81.494455542,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0034",
   "location": "Jointer Creek, W-Bank",
   "lat": 31.056494275,
   "lon": -81.47992962,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0035",
   "location": "Little Satilla River, S-Bank, near Kirby Creek",
   "lat": 31.060439972,
   "lon": -81.52289995,
   "habitat": "MUD",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0036",
   "location": "Little Satilla River, N-Bank",
   "lat": 31.061550742,
   "lon": -81.514998749,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0038",
   "location": "Cobb Creek, W-Bank, near Jointer Creek",
   "lat": 31.062169997,
   "lon": -81.468002424,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0039",
   "location": "Jointer Creek, N-Bank, near Cobb Creek",
   "lat": 31.064609969,
   "lon": -81.477059908,
   "habitat": "MUD",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0040",
   "location": "Little Satilla River, near Maiden Creek",
   "lat": 31.068779966,
   "lon": -81.531229969,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0041",
   "location": "Jointer Creek, S-Bank",
   "lat": 31.070642592,
   "lon": -81.494012978,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0042",
   "location": "Jointer Creek, E-Bank, near Cobb Creek",
   "lat": 31.068779966,
   "lon": -81.481229989,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0043",
   "location": "Jointer Creek",
   "lat": 31.073794942,
   "lon": -81.506475862,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0044",
   "location": "Jointer Creek, N-Bank",
   "lat": 31.074163076,
   "lon": -81.492978986,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0045",
   "location": "Jointer Creek, N-Bank",
   "lat": 31.072939988,
   "lon": -81.489559924,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0046",
   "location": "Jointer Creek, S-Bank, near Colonels Island",
   "lat": 31.075758068,
   "lon": -81.520055803,
   "habitat": "MUD",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0047",
   "location": "Jointer Creek, N-Bank, near Colonels Island",
   "lat": 31.076388555,
   "lon": -81.514540426,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0048",
   "location": "Jointer Creek, E-Bank, near Colonels Island",
   "lat": 31.078296863,
   "lon": -81.506159613,
   "habitat": "MUD",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0049",
   "location": "Jointer Creek",
   "lat": 31.076176576,
   "lon": -81.502998797,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0050",
   "location": "Jointer Creek, near Colonels Island",
   "lat": 31.081226505,
   "lon": -81.509198304,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0051",
   "location": "Jointer Creek, N-Bank, near Colonels Island",
   "lat": 31.082768608,
   "lon": -81.506136144,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0052",
   "location": "Jointer Creek, S-Bank",
   "lat": 31.081827153,
   "lon": -81.502397982,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0053",
   "location": "Jointer Creek, S-Bank",
   "lat": 31.080185641,
   "lon": -81.497900002,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0054",
   "location": "Jointer Creek, near Cedar Hammock",
   "lat": 31.081279982,
   "lon": -81.493729921,
   "habitat": "MUD",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0055",
   "location": "Jointer Creek, near Cedar Hammock",
   "lat": 31.08161794,
   "lon": -81.48942858,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0056",
   "location": "Little Satilla River, N-Bank, near Colonels Island",
   "lat": 31.084147347,
   "lon": -81.547803087,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0057",
   "location": "Little Satilla River, N-Bank, near Colonels Island",
   "lat": 31.085440004,
   "lon": -81.539569963,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0058",
   "location": "Jointer Creek, near Colonels Island",
   "lat": 31.084405258,
   "lon": -81.518487297,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0059",
   "location": "Jointer Creek, near Colonels Island",
   "lat": 31.085163066,
   "lon": -81.507246327,
   "habitat": "MUD",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0060",
   "location": "Jointer Creek, N-Bank, near Colonels Island",
   "lat": 31.08570152,
   "lon": -81.501801861,
   "habitat": "MUD",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0061",
   "location": "Jointer Creek, W-Bank, near Cedar Hammock",
   "lat": 31.084957207,
   "lon": -81.498885714,
   "habitat": "MUD",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0062",
   "location": "Jointer Creek, inside bend, Cedar Creek",
   "lat": 31.089610001,
   "lon": -81.493729921,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0063",
   "location": "Jointer Creek, near Cedar Creek",
   "lat": 31.090162452,
   "lon": -81.488766074,
   "habitat": "MUD",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0064",
   "location": "Jointer Creek, S-Bank, near Colonels Island",
   "lat": 31.094616177,
   "lon": -81.516766157,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0065",
   "location": "Jointer Creek, E-Bank, near Colonels Island",
   "lat": 31.093779998,
   "lon": -81.51456004,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0066",
   "location": "Jointer Creek, near Colonels Island",
   "lat": 31.093779998,
   "lon": -81.506229937,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0067",
   "location": "Jointer Creek, E-Bank, near Cedar Hammock",
   "lat": 31.098449975,
   "lon": -81.497006826,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0068",
   "location": "Jointer Creek, N-Bank, near Colonels Island",
   "lat": 31.102110017,
   "lon": -81.518729953,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0069",
   "location": "Floyd Creek, S-Bank, near Horsepen Bluff",
   "lat": 30.939825308,
   "lon": -81.499965303,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0070",
   "location": "Floyd Creek, E branch",
   "lat": 30.945797749,
   "lon": -81.493279394,
   "habitat": "MUD",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0071",
   "location": "Floyd Cut, E side",
   "lat": 30.956269931,
   "lon": -81.506229937,
   "habitat": "SAND",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0072",
   "location": "Floyd Cut, at Satilla River",
   "lat": 30.960538667,
   "lon": -81.507821241,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0073",
   "location": "Satilla River, W-Bank, near The Bulkhead",
   "lat": 30.96459995,
   "lon": -81.510399934,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0074",
   "location": "Satilla River, N-Bank, near The Bulkhead",
   "lat": 30.973652406,
   "lon": -81.498345751,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0075",
   "location": "Satilla River, S-Bank",
   "lat": 30.980497487,
   "lon": -81.527520642,
   "habitat": "MUD",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0076",
   "location": "Satilla River, W-Bank, near Dover Creek",
   "lat": 30.982599165,
   "lon": -81.492399378,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0077",
   "location": "Satilla River, W-Bank",
   "lat": 30.98543996,
   "lon": -81.531229969,
   "habitat": "MUD",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0078",
   "location": "Dover Creek, W-Bank, near Satilla River",
   "lat": 30.989244422,
   "lon": -81.494452106,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0079",
   "location": "Dover Creek, near Dover Cut",
   "lat": 31.002135621,
   "lon": -81.488760374,
   "habitat": "MUD",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0080",
   "location": "Brickhill River, S-Bank, near Cumberland Island",
   "lat": 30.864589931,
   "lon": -81.477059908,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0081",
   "location": "Brickhill River, Cumberland side",
   "lat": 30.864153067,
   "lon": -81.470831735,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0082",
   "location": "Cumberland Dividings, W-Bank, near Cabin Bluff",
   "lat": 30.872930009,
   "lon": -81.506229937,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0083",
   "location": "Cumberland Dividings, near Brickhill River",
   "lat": 30.873662252,
   "lon": -81.501343623,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0084",
   "location": "Cumberland Dividings, S-Bank, near Cabin Bluff",
   "lat": 30.875609452,
   "lon": -81.510774689,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0085",
   "location": "Brickhill River, near Cumberland Dividings",
   "lat": 30.877089947,
   "lon": -81.497899918,
   "habitat": "MUD",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0086",
   "location": "Cumberland Dividings, W-Bank, near Cumberland River",
   "lat": 30.881259944,
   "lon": -81.514559956,
   "habitat": "MUD",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0087",
   "location": "Brickhill River, N-Bank, near Mud Creek",
   "lat": 30.881907362,
   "lon": -81.489357417,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0088",
   "location": "Brickhill River, near Mud Creek",
   "lat": 30.881259944,
   "lon": -81.485399986,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0089",
   "location": "Brickhill River, S-Bank, at Mumford Creek",
   "lat": 30.881259944,
   "lon": -81.481229989,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0090",
   "location": "Mumford Creek, near Brickhill River",
   "lat": 30.881259944,
   "lon": -81.468729973,
   "habitat": "MUD",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0091",
   "location": "Brickhill River, N-Bank, near Mud Creek",
   "lat": 30.883641494,
   "lon": -81.48535422,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0092",
   "location": "Brickhill River, at Cumberland Island",
   "lat": 30.885429941,
   "lon": -81.460389979,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0093",
   "location": "Brickhill River, Cumberland side, near Malkintooh Creek",
   "lat": 30.885429941,
   "lon": -81.45205996,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0094",
   "location": "Malkintooh Creek, near Brickhill River",
   "lat": 30.885429941,
   "lon": -81.447889963,
   "habitat": "MUD",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0095",
   "location": "Brickhill River, near Malkintooh Creek",
   "lat": 30.889065,
   "lon": -81.456228,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0096",
   "location": "Brickhill River, N-Bank, near Malkintooh Creek",
   "lat": 30.889589963,
   "lon": -81.45205996,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0097",
   "location": "Brickhill River, Cumberland side, at Malkintooh Creek",
   "lat": 30.889256615,
   "lon": -81.446221629,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0098",
   "location": "Mud Creek, near Brickhill River",
   "lat": 30.89375996,
   "lon": -81.464559976,
   "habitat": "MUD",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0099",
   "location": "Brickhill River, Cumberland side, N Malkintooh Creek",
   "lat": 30.89375996,
   "lon": -81.443729941,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0100",
   "location": "Cumberland River, W-Bank, near Cabin Bluff",
   "lat": 30.898477212,
   "lon": -81.503483774,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0101",
   "location": "Mud Creek, W-Bank, near Cumberland Island",
   "lat": 30.897929957,
   "lon": -81.472889911,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0102",
   "location": "Brickhill River, near Hawkins Creek",
   "lat": 30.897929957,
   "lon": -81.45205996,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0103",
   "location": "Cumberland River, E-Bank, near Mud Creek",
   "lat": 30.902100038,
   "lon": -81.496176515,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0104",
   "location": "Mud Creek, near Cumberland River",
   "lat": 30.902099954,
   "lon": -81.477059908,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0105",
   "location": "Mud Creek, near Brickhill River",
   "lat": 30.902099954,
   "lon": -81.472889911,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0106",
   "location": "Mud Creek, W-Bank, near Brickhill River",
   "lat": 30.901657473,
   "lon": -81.470577428,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0107",
   "location": "Brickhill River, Cumberland side, near Hawkins Creek",
   "lat": 30.903520603,
   "lon": -81.45508809,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0108",
   "location": "Cumberland River, S-Bank, near Shellbine Creek",
   "lat": 30.907064639,
   "lon": -81.486561466,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0109",
   "location": "Brickhill River, Cumberland side, near Hawkins Creek",
   "lat": 30.906259976,
   "lon": -81.460389979,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0110",
   "location": "Cumberland River, N-Bank, at Shellbine Creek",
   "lat": 30.910832305,
   "lon": -81.488811672,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0111",
   "location": "Cumberland River, N-Bank, near Abraham Point",
   "lat": 30.915179327,
   "lon": -81.477921735,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0112",
   "location": "Cumberland River, N-Bank, near Floyd Creek",
   "lat": 30.918759992,
   "lon": -81.472889911,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0113",
   "location": "Cumberland River, Cumberland Is. side",
   "lat": 30.918759992,
   "lon": -81.460389979,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0114",
   "location": "Floyd Creek, near Horsepen Bluff",
   "lat": 30.923605906,
   "lon": -81.494516814,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0115",
   "location": "Floyd Creek, Cumberland side",
   "lat": 30.922929989,
   "lon": -81.468729973,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0116",
   "location": "Floyd Creek, E-Bank, near Horsepen Bluff",
   "lat": 30.927099986,
   "lon": -81.492016744,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0117",
   "location": "Floyd Creek, S-Bank, near Cumberland River",
   "lat": 30.926037831,
   "lon": -81.47349081,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0118",
   "location": "Cumberland River, W-Bank, near Floyd Creek",
   "lat": 30.927099986,
   "lon": -81.464559976,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0119",
   "location": "Cumberland River, Cumberland Is. side",
   "lat": 30.931260008,
   "lon": -81.443729941,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0120",
   "location": "Cumberland River, Cumberland Is. side",
   "lat": 30.933030266,
   "lon": -81.43925962,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0122",
   "location": "Cumberland River, near Cumberland Island",
   "lat": 30.935430005,
   "lon": -81.435389947,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0123",
   "location": "Cumberland River, W-Bank, near Cumberland Island",
   "lat": 30.939600002,
   "lon": -81.45205996,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0124",
   "location": "Cumberland River, near Cumberland Island",
   "lat": 30.943769999,
   "lon": -81.447889963,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  },
  {
   "station": "STA0126",
   "location": "Cumberland River, W-Bank, near Cumberland Island",
   "lat": 30.952099934,
   "lon": -81.443729941,
   "habitat": "SHELL",
   "depth": null,
   "gear": null
  }
 ]
};
