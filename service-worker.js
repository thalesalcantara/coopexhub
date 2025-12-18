const CACHE = "kratos-hub-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./kratos-logo.png",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-512-maskable.png",
  "./manifest.webmanifest"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k === CACHE ? null : caches.delete(k))))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  e.respondWith(caches.match(e.request).then((cached) => cached || fetch(e.request)));
});
