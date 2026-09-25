// Caches the app shell so it launches even with zero connectivity, including
// the very first "install" (once you've loaded it once on a device while it
// had a connection, or copied the whole PWA folder onto it directly).
const CACHE_NAME = 'msphp-field-v7';
const ASSETS = [
  './',
  './index.html',
  './MSPHS Data Entry.html',
  './manifest.json',
  './css/style.css',
  './js/vendor/xlsx.core.min.js',
  './js/lookups.js',
  './js/speciesFields.js',
  './js/db.js',
  './js/validation.js',
  './js/subsample.js',
  './js/fieldlogic.js',
  './js/export.js',
  './js/settings.js',
  './js/stationStatus.js',
  './js/app.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
