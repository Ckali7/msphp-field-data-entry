// IndexedDB wrapper — all field data is stored locally on this device only.
// Nothing here ever calls a network. Export (js/export.js) is the only way
// data leaves the device, same as pulling the thumb drive today.

const DB_NAME = 'MSPHPFieldData';
const DB_VERSION = 2;

let _dbPromise = null;

function openDB() {
  if (_dbPromise) return _dbPromise;
  _dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (ev) => {
      const db = req.result;
      if (!db.objectStoreNames.contains('collections')) {
        db.createObjectStore('collections', { keyPath: 'CollectionNumber' });
      }
      if (!db.objectStoreNames.contains('measuredFish')) {
        const s = db.createObjectStore('measuredFish', { keyPath: 'RecordNumber', autoIncrement: true });
        s.createIndex('byCollection', 'CollectionNumber');
      }
      if (!db.objectStoreNames.contains('sacrificedFish')) {
        const s = db.createObjectStore('sacrificedFish', { keyPath: ['CollectionNumber', 'SampleNumber'] });
        s.createIndex('byCollection', 'CollectionNumber');
      }
      if (!db.objectStoreNames.contains('taggedFish')) {
        const s = db.createObjectStore('taggedFish', { keyPath: 'RecordNumber', autoIncrement: true });
        s.createIndex('byCollection', 'CollectionNumber');
      }
      if (!db.objectStoreNames.contains('meta')) {
        db.createObjectStore('meta', { keyPath: 'key' });
      }
      // v2: editable reference data. 'lookupOverrides' holds a full
      // replacement array per editable lookup table (crew, station lists —
      // see js/app.js's EDITABLE_LOOKUPS), so edits survive reloads and
      // travel with Backup/Restore. 'stationAssignments' holds one record
      // per imported month ({period: 'YYYY-MM', rows: [...]}), wholesale
      // replaced on each monthly re-import.
      if (!db.objectStoreNames.contains('lookupOverrides')) {
        db.createObjectStore('lookupOverrides', { keyPath: 'key' });
      }
      if (!db.objectStoreNames.contains('stationAssignments')) {
        db.createObjectStore('stationAssignments', { keyPath: 'period' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return _dbPromise;
}

function tx(storeNames, mode) {
  return openDB().then((db) => db.transaction(storeNames, mode));
}

function promisifyRequest(req) {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

// Stores that hold actual field data (as opposed to 'meta', which holds
// app bookkeeping like the backup-reminder state below) — writes to these
// mark the "changes since last backup" flag.
const DATA_STORES = ['collections', 'measuredFish', 'sacrificedFish', 'taggedFish', 'lookupOverrides', 'stationAssignments'];

const DB = {
  async put(storeName, value) {
    const t = await tx(storeName, 'readwrite');
    const store = t.objectStore(storeName);
    const result = await promisifyRequest(store.put(value));
    if (DATA_STORES.includes(storeName)) await DB._markDirty();
    return result;
  },

  async get(storeName, key) {
    const t = await tx(storeName, 'readonly');
    return promisifyRequest(t.objectStore(storeName).get(key));
  },

  async delete(storeName, key) {
    const t = await tx(storeName, 'readwrite');
    const result = await promisifyRequest(t.objectStore(storeName).delete(key));
    if (DATA_STORES.includes(storeName)) await DB._markDirty();
    return result;
  },

  async getAll(storeName) {
    const t = await tx(storeName, 'readonly');
    return promisifyRequest(t.objectStore(storeName).getAll());
  },

  async getAllByIndex(storeName, indexName, key) {
    const t = await tx(storeName, 'readonly');
    const idx = t.objectStore(storeName).index(indexName);
    return promisifyRequest(idx.getAll(key));
  },

  async getMeta(key, fallback) {
    const row = await DB.get('meta', key);
    return row ? row.value : fallback;
  },

  async setMeta(key, value) {
    const t = await tx('meta', 'readwrite');
    return promisifyRequest(t.objectStore('meta').put({ key, value }));
  },

  // internal — not routed through put() to avoid marking dirty on its own writes
  async _markDirty() {
    const t = await tx('meta', 'readwrite');
    return promisifyRequest(t.objectStore('meta').put({ key: 'dirtySinceBackup', value: true }));
  },

  async getBackupStatus() {
    const [lastBackupAt, dirty] = await Promise.all([
      DB.getMeta('lastBackupAt', null),
      DB.getMeta('dirtySinceBackup', false),
    ]);
    return { lastBackupAt, dirty };
  },

  async markBackedUp() {
    await DB.setMeta('lastBackupAt', new Date().toISOString());
    await DB.setMeta('dirtySinceBackup', false);
  },
};
