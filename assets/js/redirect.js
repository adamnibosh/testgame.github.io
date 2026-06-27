/* Smart redirect helper with prefetch */
window.MATH_REDIRECT = {
  go(url, delay) {
    if (delay > 0) {
      setTimeout(() => { location.replace(url); }, delay);
    } else {
      location.replace(url);
    }
  },

  chain(steps) {
    let i = 0;
    const el = document.getElementById("redirect-status");
    const bar = document.getElementById("redirect-bar");

    function next() {
      if (i >= steps.length) return;
      const step = steps[i++];
      if (el) el.textContent = step.msg || "Loading...";
      if (bar) bar.style.width = ((i / steps.length) * 100) + "%";
      if (step.prefetch) {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.href = step.url;
        document.head.appendChild(link);
      }
      setTimeout(() => {
        if (i < steps.length) next();
        else location.replace(step.url);
      }, step.delay || 400);
    }
    next();
  },

  withParams(base, obj) {
    const p = new URLSearchParams(obj);
    return base + "?" + p.toString();
  }
};