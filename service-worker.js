/* service-worker.js */
const CACHE = "kratos-hub-v4"; // MUDE para v5, v6... a cada atualização no GitHub

const ASSETS = [
  "./",
  "./index.html",
  "./script.js",
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

/* permite ativar a versão nova imediatamente */
self.addEventListener("message", (e) => {
  if (e.data && e.data.type === "SKIP_WAITING") self.skipWaiting();
});

/* Cache-first somente do mesmo domínio (Hub). Render/onrender é cross-origin e não é cacheado aqui. */
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);

  // Só intercepta requests do próprio Hub (GitHub Pages / domínio do Hub)
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
