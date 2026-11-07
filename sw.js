// Habitus by VIRTUS ARS · service worker. Sube V cuando cambies archivos para forzar la actualización.
const V = "habitus-v1";
const CORE = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "apple-touch-icon.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(V).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== V).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const r = e.request;
  if (r.method !== "GET") return;
  const u = new URL(r.url);

  if (u.origin === location.origin) {
    if (r.mode === "navigate") {
      // Red primero (versión nueva) y respaldo sin conexión
      e.respondWith(
        fetch(r)
          .then((res) => { const cp = res.clone(); caches.open(V).then((c) => c.put("index.html", cp)); return res; })
          .catch(() => caches.match("index.html"))
      );
      return;
    }
    // Archivos propios: caché primero
    e.respondWith(
      caches.match(r).then((h) => h || fetch(r).then((res) => {
        const cp = res.clone(); caches.open(V).then((c) => c.put(r, cp)); return res;
      }))
    );
    return;
  }

  // Tipografías de Google: usar la guardada y actualizar en segundo plano
  if (u.hostname === "fonts.googleapis.com" || u.hostname === "fonts.gstatic.com") {
    e.respondWith(
      caches.open(V).then((c) => c.match(r).then((h) => {
        const n = fetch(r).then((res) => { c.put(r, res.clone()); return res; }).catch(() => h);
        return h || n;
      }))
    );
  }
});
