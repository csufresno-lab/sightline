/* Sightline service worker: keeps the app available offline.
   To publish an update, change VERSION below and upload the new files. */
const VERSION = '1.7.4-2026-11-12';
const CACHE = 'sightline-' + VERSION;
const FILES = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png", "icons/apple-touch-icon.png"];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('sightline-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
/* Serve from the cache first so the app opens instantly with no connection,
   then refresh the cached copy in the background when online. */
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(caches.open(CACHE).then(async cache => {
    const key = req.mode === 'navigate' ? 'index.html' : req;
    const cached = await cache.match(key, {ignoreSearch: true});
    const network = fetch(req).then(res => { if (res && res.ok) cache.put(key, res.clone()); return res; }).catch(() => null);
    if (cached) { event.waitUntil(network); return cached; }
    const res = await network;
    return res || new Response('Sightline is offline and this file is not cached yet.', {status: 503, headers: {'Content-Type': 'text/plain'}});
  }));
});
