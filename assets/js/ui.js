/* MATH NEXUS — UI polish */
(function () {
  "use strict";

  document.body.classList.add("page-enter");

  const cards = document.querySelectorAll(".grid .card");
  cards.forEach((card, i) => {
    card.classList.add("stagger");
    card.style.animationDelay = (i * 0.05) + "s";
  });

  window.addEventListener("resize", () => {
    const fx = document.getElementById("fx-canvas");
    if (fx) {
      fx.width = innerWidth;
      fx.height = innerHeight;
    }
  }, { passive: true });
})();