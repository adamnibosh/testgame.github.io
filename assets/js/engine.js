/* MATH NEXUS — Ultra Performance Game Engine */
(function () {
  "use strict";

  const STORE_KEY = "math_nexus_v3";
  const params = new URLSearchParams(location.search);
  const mode = params.get("mode") || "solo";
  const topic = params.get("topic") || "logarithms";
  const count = parseInt(params.get("count") || "10", 10);

  const PLAYERS = [
    { name: "Player 1", icon: "⚡", team: "Cyan · Team Blue" },
    { name: "Player 2", icon: "🔥", team: "Purple · Team Violet" }
  ];

  let state = {
    scores: [0, 0],
    xp: 0,
    combo: 0,
    maxCombo: 0,
    currentPlayer: 0,
    qIndex: 0,
    questions: [],
    powerups: { fifty: 1, skip: 1, hint: 2 },
    timer: null,
    timeLeft: 0,
    streak: 0,
    answered: false
  };

  let profile = loadProfile();
  let audioCtx = null;

  function loadProfile() {
    try {
      return JSON.parse(localStorage.getItem(STORE_KEY)) || defaultProfile();
    } catch {
      return defaultProfile();
    }
  }

  function defaultProfile() {
    return {
      totalXP: 0,
      level: 1,
      gamesPlayed: 0,
      bestCombo: 0,
      achievements: [],
      dailyDate: "",
      dailyScore: 0
    };
  }

  function saveProfile() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(profile));
    } catch (_) {}
  }

  function $(id) { return document.getElementById(id); }

  function initAudio() {
    if (!audioCtx) {
      try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (_) {}
    }
    return audioCtx;
  }

  function beep(freq, dur, type) {
    const ctx = initAudio();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type || "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + dur);
  }

  function playCorrect() { beep(523, 0.12); setTimeout(() => beep(659, 0.12), 80); }
  function playWrong() { beep(200, 0.25, "sawtooth"); }
  function playCombo() { beep(880, 0.1); beep(1100, 0.15); }

  function haptic(ms) {
    if (navigator.vibrate) navigator.vibrate(ms || 30);
  }

  function flashCombo(text) {
    const el = document.createElement("div");
    el.className = "combo-flash";
    el.textContent = text;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 600);
  }

  function spawnParticles(x, y) {
    const canvas = $("fx-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const particles = [];
    for (let i = 0; i < 24; i++) {
      particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8 - 2,
        life: 1,
        color: ["#00f5ff", "#a855f7", "#fbbf24"][i % 3]
      });
    }
    let frame = 0;
    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach(p => {
        if (p.life <= 0) return;
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15;
        p.life -= 0.03;
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4 * p.life, 0, Math.PI * 2);
        ctx.fill();
      });
      frame++;
      if (alive && frame < 40) requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    requestAnimationFrame(tick);
  }

  function buildQuestions() {
    let pool = MATH_NEXUS.getPool(topic);
    if (mode === "boss") pool = MATH_NEXUS.getPool("boss");
    if (mode === "daily") {
      const seed = new Date().toDateString();
      pool = MATH_NEXUS.shuffle(MATH_NEXUS.getPool("all")).slice(0, count);
      pool._daily = seed;
    } else {
      pool = MATH_NEXUS.shuffle(pool).slice(0, Math.min(count, pool.length));
    }
    return pool;
  }

  function updateVersusHUD() {
    const active = state.currentPlayer;
    const p = PLAYERS[active];

    const p1 = $("p1-score");
    const p2 = $("p2-score");
    if (p1) p1.textContent = state.scores[0];
    if (p2) p2.textContent = state.scores[1];

    [0, 1].forEach(i => {
      const card = $("player-card-" + i);
      if (card) card.classList.toggle("active", i === active);
    });

    const banner = $("versus-turn-banner");
    if (banner) banner.className = "versus-turn-banner player-" + active + "-active";

    const turnText = $("versus-turn-text");
    if (turnText) turnText.textContent = `${p.icon} ${p.name} — YOUR TURN`;

    const panel = $("game-panel");
    if (panel) panel.dataset.versusActive = String(active);
  }

  function updatePowerupCounts() {
    const map = { fifty: "count-fifty", skip: "count-skip", hint: "count-hint" };
    Object.keys(map).forEach(k => {
      const el = $(map[k]);
      if (el) el.textContent = state.powerups[k];
    });
  }

  function updateHUD() {
    const q = state.questions[state.qIndex];
    if (!q) return;

    const qBox = $("question-box");
    if (qBox) {
      qBox.classList.remove("q-enter");
      void qBox.offsetWidth;
      qBox.classList.add("q-enter");
    }

    $("question-text").textContent = q.q;
    const hintEl = $("hint-text");
    if (hintEl) {
      hintEl.textContent = "";
      hintEl.classList.remove("has-hint");
    }
    $("q-num").textContent = `${state.qIndex + 1}/${state.questions.length}`;
    $("xp-display").textContent = state.xp;

    const comboEl = $("combo-display");
    const comboPill = $("combo-pill");
    if (comboEl) comboEl.textContent = state.combo > 1 ? `×${state.combo}` : "—";
    if (comboPill) comboPill.classList.toggle("combo-active", state.combo > 1);

    const pct = Math.round((state.qIndex / state.questions.length) * 100);
    $("progress-fill").style.width = pct + "%";
    const pctLabel = $("progress-pct");
    if (pctLabel) pctLabel.textContent = pct + "%";

    if (mode === "versus") {
      updateVersusHUD();
    } else {
      $("turn-display").textContent = mode === "blitz" ? "BLITZ" : mode === "boss" ? "BOSS" : "SOLO";
    }

    const grid = $("options-grid");
    grid.innerHTML = "";
    state.answered = false;

    const opts = mode === "boss" ? q.o : MATH_NEXUS.shuffle(q.o);
    const keys = ["1", "2", "3", "4"];
    opts.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.className = "opt-btn";
      btn.type = "button";
      btn.innerHTML = `<span class="opt-key">${keys[i]}</span><span class="opt-val">${opt}</span>`;
      btn.addEventListener("click", () => selectAnswer(opt, btn), { passive: true });
      grid.appendChild(btn);
    });

    $("btn-fifty").disabled = state.powerups.fifty <= 0;
    $("btn-skip").disabled = state.powerups.skip <= 0;
    $("btn-hint").disabled = state.powerups.hint <= 0;
    updatePowerupCounts();
  }

  function selectAnswer(option, btn) {
    if (state.answered) return;
    state.answered = true;

    const q = state.questions[state.qIndex];
    const correct = option === q.a;
    const buttons = $("options-grid").querySelectorAll(".opt-btn");
    buttons.forEach(b => {
      b.disabled = true;
      const val = b.querySelector(".opt-val");
      const text = val ? val.textContent : b.textContent;
      if (text === q.a) b.classList.add("correct");
      else if (b === btn && !correct) b.classList.add("wrong");
    });

    if (correct) {
      state.combo++;
      state.maxCombo = Math.max(state.maxCombo, state.combo);
      const mult = Math.min(state.combo, 5);
      const gained = (q.xp || 10) * mult;
      state.xp += gained;
      state.scores[state.currentPlayer]++;
      state.streak++;
      if (mode === "versus") {
        const card = $("player-card-" + state.currentPlayer);
        if (card) {
          card.classList.add("score-flash");
          setTimeout(() => card.classList.remove("score-flash"), 500);
        }
      }
      playCorrect();
      haptic(20);
      if (state.combo >= 3) {
        playCombo();
        flashCombo(`${state.combo}x COMBO! +${gained} XP`);
      }
      const rect = btn.getBoundingClientRect();
      spawnParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);
    } else {
      state.combo = 0;
      state.streak = 0;
      playWrong();
      haptic([50, 30, 50]);
      const hintEl = $("hint-text");
      if (hintEl) {
        hintEl.textContent = "💡 " + q.hint;
        hintEl.classList.add("has-hint");
      }
    }

    clearTimer();

    setTimeout(() => {
      state.currentPlayer = (state.currentPlayer + 1) % (mode === "versus" ? 2 : 1);
      state.qIndex++;
      if (state.qIndex >= state.questions.length) endGame();
      else updateHUD();
    }, correct ? 600 : 1200);
  }

  function useFifty() {
    if (state.powerups.fifty <= 0 || state.answered) return;
    state.powerups.fifty--;
    const q = state.questions[state.qIndex];
    const btns = [...$("options-grid").querySelectorAll(".opt-btn")];
    const wrong = btns.filter(b => {
      const v = b.querySelector(".opt-val");
      return (v ? v.textContent : b.textContent) !== q.a;
    });
    MATH_NEXUS.shuffle(wrong).slice(0, 2).forEach(b => {
      b.style.visibility = "hidden";
      b.disabled = true;
    });
    $("btn-fifty").disabled = true;
    updatePowerupCounts();
  }

  function useSkip() {
    if (state.powerups.skip <= 0 || state.answered) return;
    state.powerups.skip--;
    updatePowerupCounts();
    state.combo = 0;
    state.qIndex++;
    if (state.qIndex >= state.questions.length) endGame();
    else updateHUD();
  }

  function useHint() {
    if (state.powerups.hint <= 0 || state.answered) return;
    state.powerups.hint--;
    const hintEl = $("hint-text");
    if (hintEl) {
      hintEl.textContent = "💡 " + state.questions[state.qIndex].hint;
      hintEl.classList.add("has-hint");
    }
    $("btn-hint").disabled = state.powerups.hint <= 0;
    updatePowerupCounts();
  }

  function startTimer(seconds) {
    state.timeLeft = seconds;
    const ring = $("timer-fg");
    const num = $("timer-num");
    const circumference = 2 * Math.PI * 28;
    if (ring) {
      ring.style.strokeDasharray = circumference;
      ring.style.strokeDashoffset = "0";
    }
    clearTimer();
    state.timer = setInterval(() => {
      state.timeLeft -= 0.1;
      const wrap = $("timer-wrap");
      if (num) num.textContent = Math.ceil(state.timeLeft);
      if (ring) {
        const offset = circumference * (1 - state.timeLeft / seconds);
        ring.style.strokeDashoffset = offset;
      }
      if (wrap) {
        wrap.classList.remove("warn", "danger");
        if (state.timeLeft <= 3) wrap.classList.add("danger");
        else if (state.timeLeft <= 6) wrap.classList.add("warn");
      }
      if (state.timeLeft <= 0) {
        clearTimer();
        if (!state.answered) {
          state.answered = true;
          state.combo = 0;
          playWrong();
          $("hint-text").textContent = "⏱ Time's up!";
          setTimeout(() => {
            state.qIndex++;
            if (state.qIndex >= state.questions.length) endGame();
            else updateHUD();
          }, 800);
        }
      }
    }, 100);
  }

  function clearTimer() {
    if (state.timer) { clearInterval(state.timer); state.timer = null; }
  }

  function checkAchievements() {
    const earned = [];
    if (state.xp >= 100 && !profile.achievements.includes("century")) earned.push("century");
    if (state.maxCombo >= 5 && !profile.achievements.includes("combo5")) earned.push("combo5");
    if (state.questions.length === state.scores.reduce((a, b) => a + b, 0) && state.questions.length >= 5)
      earned.push("perfect");
    if (mode === "boss" && state.scores[0] >= 3) earned.push("boss_slayer");
    earned.forEach(a => profile.achievements.push(a));
    return earned;
  }

  function endGame() {
    clearTimer();
    profile.totalXP += state.xp;
    profile.gamesPlayed++;
    profile.bestCombo = Math.max(profile.bestCombo, state.maxCombo);
    profile.level = Math.floor(profile.totalXP / 250) + 1;

    if (mode === "daily") {
      const today = new Date().toDateString();
      if (profile.dailyDate !== today || state.xp > profile.dailyScore) {
        profile.dailyDate = today;
        profile.dailyScore = state.xp;
      }
    }

    const newAch = checkAchievements();
    saveProfile();

    const total = state.scores[0] + (state.scores[1] || 0);
    const pct = Math.round((total / state.questions.length) * 100);

    $("game-panel").hidden = true;
    $("results-panel").hidden = false;
    $("final-score").textContent = state.xp;
    $("final-pct").textContent = pct + "%";
    $("final-combo").textContent = state.maxCombo;

    let msg = "";
    if (mode === "versus") {
      const tie = state.scores[0] === state.scores[1];
      const winner = tie ? -1 : state.scores[0] > state.scores[1] ? 0 : 1;
      msg = tie ? "🤝 TIE GAME!" :
        `${PLAYERS[winner].icon} ${PLAYERS[winner].name.toUpperCase()} WINS!`;

      const vr = $("versus-results");
      if (vr) {
        vr.hidden = false;
        vr.innerHTML = PLAYERS.map((pl, i) => {
          const isWinner = !tie && i === winner;
          return `<div class="versus-result-card player-${i}${isWinner ? " result-winner" : ""}">
            <div class="vr-icon">${pl.icon}</div>
            <div class="vr-name">${pl.name}</div>
            <div class="vr-score">${state.scores[i]}</div>
            ${isWinner ? '<div class="vr-win">WINNER</div>' : ""}
          </div>`;
        }).join("");
      }

      $("final-score").textContent = `${state.scores[0]} – ${state.scores[1]}`;
      const scoreLabel = $("final-score-label");
      if (scoreLabel) scoreLabel.textContent = "Final Score · P1 vs P2";
      const statsRow = $("results-stats");
      if (statsRow) statsRow.hidden = true;
    } else if (pct === 100) msg = "FLAWLESS VICTORY!";
    else if (pct >= 80) msg = "OUTSTANDING!";
    else if (pct >= 60) msg = "SOLID WORK!";
    else msg = "KEEP PRACTICING!";
    $("result-msg").textContent = msg;

    if (newAch.length) {
      $("achievements-earned").textContent = "🏆 Unlocked: " + newAch.join(", ");
    }

    const next = getNextRedirect();
    if (next) {
      $("next-module").href = next.url;
      $("next-module").textContent = next.label;
      $("next-module").hidden = false;
    }
  }

  function getNextRedirect() {
    const chain = {
      logarithms: { url: "/testgame.github.io/algebra.html", label: "→ Module 2: Algebra" },
      algebra: { url: "/testgame.github.io/trig.html", label: "→ Module 3: Trigonometry" },
      trigonometry: { url: "/testgame.github.io/calc.html", label: "→ Module 4: Calculus" },
      calculus: { url: "/testgame.github.io/geometry.html", label: "→ Module 5: Geometry" },
      geometry: { url: "/testgame.github.io/statistics.html", label: "→ Module 6: Statistics" },
      statistics: { url: "/testgame.github.io/boss.html", label: "→ FINAL BOSS" },
      boss: { url: "/testgame.github.io/hub.html", label: "→ Return to Hub" },
      all: { url: "/testgame.github.io/hub.html", label: "→ Return to Hub" }
    };
    return chain[topic] || chain.all;
  }

  function init() {
    state.questions = buildQuestions();
    if (!state.questions.length) {
      $("question-text").textContent = "No questions loaded!";
      return;
    }

    const title = formatTitle(mode, topic);
    $("mode-title").textContent = title;
    const tag = $("mode-tag");
    if (tag) tag.textContent = (mode || "solo").toUpperCase();
    $("game-panel").hidden = false;
    $("results-panel").hidden = true;

    if (mode === "versus") {
      const arena = $("versus-arena");
      if (arena) arena.hidden = false;
      const turnPill = $("turn-display");
      if (turnPill) turnPill.hidden = true;
    }

    $("btn-fifty").addEventListener("click", useFifty, { passive: true });
    $("btn-skip").addEventListener("click", useSkip, { passive: true });
    $("btn-hint").addEventListener("click", useHint, { passive: true });

    document.addEventListener("keydown", e => {
      const btns = [...$("options-grid").querySelectorAll(".opt-btn:not(:disabled)")];
      const map = { "1": 0, "2": 1, "3": 2, "4": 3 };
      if (map[e.key] !== undefined && btns[map[e.key]]) btns[map[e.key]].click();
      if (e.key === "h") useHint();
      if (e.key === "s") useSkip();
    }, { passive: true });

    updateHUD();

    if (mode === "blitz" || mode === "boss") startTimer(mode === "boss" ? 20 : 12);

    const fx = $("fx-canvas");
    if (fx) {
      fx.width = innerWidth;
      fx.height = innerHeight;
    }
  }

  function formatTitle(m, t) {
    const modes = { solo: "Solo", versus: "Versus", blitz: "Blitz", boss: "Boss Rush", daily: "Daily" };
    const topics = {
      logarithms: "Logarithms", algebra: "Algebra", trigonometry: "Trig",
      calculus: "Calculus", geometry: "Geometry", statistics: "Statistics", all: "Mixed", boss: "Boss"
    };
    return `${modes[m] || m} — ${topics[t] || t}`;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();