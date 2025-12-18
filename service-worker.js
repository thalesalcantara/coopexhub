/* service-worker.js */
const CACHE = "kratos-hub-v3"; // MUDE para v4, v5... sempre que atualizar no GitHub

const ASSETS = [
  "./",
  "./index.html",
  "./kratos-logo.png",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-512-maskable.png",
  "./manifest.webmanifest",
  "./offline.html"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k === CACHE ? null : caches.delete(k))))
    ).then(() => self.clients.claim())
  );
});

/* Permite ativar SW novo imediatamente */
self.addEventListener("message", (e) => {
  if (e.data && e.data.type === "SKIP_WAITING") self.skipWaiting();
});

/* Cache-first só para mesmo domínio (Hub). Cross-origin (Render) não cacheia aqui. */
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);

  if (url.origin !== self.location.origin) return;

  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;

      return fetch(e.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
          return res;
        })
        .catch(() => caches.match("./offline.html"));
    })
  );
});
