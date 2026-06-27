/* Lightweight particle background — rAF, no deps */
(function () {
  "use strict";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  let w, h, particles = [], raf = 0, visible = true;

  const SYMBOLS = "∫∑π√∞θαβΔλμσφΩ±×÷≈≠≤≥log".split("");

  function resize() {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
  }

  function init() {
    resize();
    particles = Array.from({ length: Math.min(40, (w * h) / 25000 | 0) }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      s: SYMBOLS[(Math.random() * SYMBOLS.length) | 0],
      a: Math.random() * 0.3 + 0.05,
      size: Math.random() * 14 + 10
    }));
  }

  function draw() {
    if (!visible) return;
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -20) p.x = w + 20;
      if (p.x > w + 20) p.x = -20;
      if (p.y < -20) p.y = h + 20;
      if (p.y > h + 20) p.y = -20;
      ctx.globalAlpha = p.a;
      ctx.fillStyle = "#00f5ff";
      ctx.font = p.size + "px system-ui";
      ctx.fillText(p.s, p.x, p.y);
    });
    raf = requestAnimationFrame(draw);
  }

  document.addEventListener("visibilitychange", () => {
    visible = !document.hidden;
    if (visible && !raf) raf = requestAnimationFrame(draw);
  }, { passive: true });

  window.addEventListener("resize", resize, { passive: true });
  init();
  raf = requestAnimationFrame(draw);
})();