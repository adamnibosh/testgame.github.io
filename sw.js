const CACHE = "math-nexus-v3";
const ASSETS = [
  "/",
  "/index.html",
  "/splash.html",
  "/hub.html",
  "/game.html",
  "/formulas.html",
  "/stats.html",
  "/boss.html",
  "/daily.html",
  "/gate.html",
  "/log.html",
  "/algebra.html",
  "/trig.html",
  "/calc.html",
  "/geometry.html",
  "/statistics.html",
  "/versus.html",
  "/solo.html",
  "/blitz.html",
  "/mixed.html",
  "/profile.html",
  "/404.html",
  "/manifest.json",
  "/assets/css/main.css",
  "/assets/js/questions.js",
  "/assets/js/engine.js",
  "/assets/js/bg.js",
  "/assets/js/redirect.js"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      const fetched = fetch(e.request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => cached);
      return cached || fetched;
    })
  );
});