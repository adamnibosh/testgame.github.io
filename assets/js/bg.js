/* Aurora particle field */
(function () {
  "use strict";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  let w, h, particles = [], raf = 0, visible = true;

  const SYMBOLS = "∫∑π√∞θαβΔλμσφΩ±×÷≈≠≤≥".split("");
  const COLORS = ["#00e8ff", "#a855f7", "#ec4899", "#fbbf24"];

  function resize() {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
  }

  function init() {
    resize();
    const count = Math.min(50, (w * h) / 22000 | 0);
    particles = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      s: SYMBOLS[i % SYMBOLS.length],
      color: COLORS[i % COLORS.length],
      a: Math.random() * 0.22 + 0.04,
      size: Math.random() * 12 + 11,
      pulse: Math.random() * Math.PI * 2
    }));
  }

  function draw() {
    if (!visible) return;
    ctx.clearRect(0, 0, w, h);
    const t = Date.now() * 0.001;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += 0.02;
      if (p.x < -30) p.x = w + 30;
      if (p.x > w + 30) p.x = -30;
      if (p.y < -30) p.y = h + 30;
      if (p.y > h + 30) p.y = -30;
      ctx.globalAlpha = p.a * (0.7 + 0.3 * Math.sin(p.pulse));
      ctx.fillStyle = p.color;
      ctx.font = "600 " + p.size + "px JetBrains Mono, monospace";
      ctx.fillText(p.s, p.x, p.y);
    });

    raf = requestAnimationFrame(draw);
  }

  document.addEventListener("visibilitychange", () => {
    visible = !document.hidden;
    if (visible && !raf) raf = requestAnimationFrame(draw);
  }, { passive: true });

  window.addEventListener("resize", () => { resize(); init(); }, { passive: true });
  init();
  raf = requestAnimationFrame(draw);
})();