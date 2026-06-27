const CACHE = "math-nexus-v4";
const ASSETS = [
  "/testgame.github.io/",
  "/testgame.github.io/index.html",
  "/testgame.github.io/splash.html",
  "/testgame.github.io/hub.html",
  "/testgame.github.io/game.html",
  "/testgame.github.io/formulas.html",
  "/testgame.github.io/profile.html",
  "/testgame.github.io/boss.html",
  "/testgame.github.io/daily.html",
  "/testgame.github.io/gate.html",
  "/testgame.github.io/log.html",
  "/testgame.github.io/algebra.html",
  "/testgame.github.io/trig.html",
  "/testgame.github.io/calc.html",
  "/testgame.github.io/geometry.html",
  "/testgame.github.io/statistics.html",
  "/testgame.github.io/versus.html",
  "/testgame.github.io/solo.html",
  "/testgame.github.io/blitz.html",
  "/testgame.github.io/mixed.html",
  "/testgame.github.io/404.html",
  "/testgame.github.io/manifest.json",
  "/testgame.github.io/assets/css/main.css",
  "/testgame.github.io/assets/js/questions.js",
  "/testgame.github.io/assets/js/engine.js",
  "/testgame.github.io/assets/js/bg.js",
  "/testgame.github.io/assets/js/redirect.js",
  "/testgame.github.io/assets/js/ui.js"
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