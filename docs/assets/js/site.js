/* Прицел — сценарий страницы: вау-сцена первого экрана, счётчик цены замера, липкая кнопка. */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Живая строка отчёта ---------- */
  var live = document.getElementById("live");
  var reticle = document.getElementById("reticle");
  var promise = document.getElementById("promise");
  var replay = document.getElementById("replay");
  var timers = [];

  function aimReticle(atTarget) {
    if (!live || !reticle || !promise) return;
    var card = reticle.parentElement.getBoundingClientRect();
    var size = reticle.getBoundingClientRect().width || 44;
    var x, y;
    if (atTarget) {
      var r = promise.getBoundingClientRect();
      x = r.left - card.left + r.width / 2 - size / 2;
      y = r.top - card.top + r.height / 2 - size / 2;
    } else {
      x = card.width - size - 14;
      y = 14;
    }
    reticle.style.setProperty("--rx", Math.round(x) + "px");
    reticle.style.setProperty("--ry", Math.round(y) + "px");
  }

  function play() {
    if (!live) return;
    timers.forEach(clearTimeout);
    timers = [];
    var steps = live.querySelectorAll(".step");
    var marks = live.querySelectorAll("[data-hl]");
    live.classList.add("stage");
    steps.forEach(function (s) { s.classList.remove("on"); });
    marks.forEach(function (m) { m.classList.remove("on"); });
    reticle.classList.remove("on", "lock");
    reticle.style.transition = "none";
    aimReticle(false);
    void reticle.offsetWidth;
    reticle.style.transition = "";

    var at = function (ms, fn) { timers.push(setTimeout(fn, ms)); };
    at(80, function () { steps[0].classList.add("on"); steps[1].classList.add("on"); });
    at(450, function () { steps[2].classList.add("on"); });
    at(800, function () { marks[0].classList.add("on"); });
    at(1050, function () { steps[3].classList.add("on"); reticle.classList.add("on"); });
    at(1350, function () { marks[1].classList.add("on"); aimReticle(true); });
    at(2050, function () { reticle.classList.add("lock"); steps[4].classList.add("on"); });
    at(2450, function () { steps[5].classList.add("on"); replay.hidden = false; });
  }

  if (live && reticle) {
    if (reduce) {
      aimReticle(true);
      reticle.classList.add("lock");
    } else {
      play();
      replay.addEventListener("click", play);
    }
    var rt;
    window.addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(function () { aimReticle(reticle.classList.contains("lock") || reduce); }, 120);
    });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        if (reticle.classList.contains("lock") || reduce) aimReticle(true);
      });
    }
  }

  /* ---------- Счётчик: цена одного замера ---------- */
  var roll = document.getElementById("roll");
  var formula = document.getElementById("formula");

  function fmt(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " "); }

  function buildRoll(value) {
    var text = fmt(value);
    roll.setAttribute("aria-label", text + " рублей");
    roll.innerHTML = "";
    text.split("").forEach(function (ch) {
      if (ch === " ") {
        var sp = document.createElement("span");
        sp.className = "sp";
        roll.appendChild(sp);
        return;
      }
      var d = document.createElement("span");
      d.className = "d";
      d.setAttribute("aria-hidden", "true");
      var col = document.createElement("i");
      for (var k = 0; k <= 9; k++) {
        var c = document.createElement("span");
        c.textContent = k;
        col.appendChild(c);
      }
      d.appendChild(col);
      d.dataset.digit = ch;
      roll.appendChild(d);
    });
  }

  function spin(fromZero) {
    var cols = roll.querySelectorAll(".d");
    cols.forEach(function (d, i) {
      var col = d.firstChild;
      if (fromZero) {
        col.style.transition = "none";
        col.style.transform = "translateY(0)";
        void col.offsetWidth;
        col.style.transition = "";
      }
      col.style.transitionDelay = reduce ? "0ms" : (i * 45) + "ms";
      col.style.transform = "translateY(-" + d.dataset.digit + "em)";
    });
  }

  if (roll) {
    var current = parseInt(roll.dataset.value, 10);
    buildRoll(current);
    spin(false);

    if ("IntersectionObserver" in window && !reduce) {
      var seen = false;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting && !seen) { seen = true; spin(true); io.disconnect(); }
        });
      }, { threshold: 0.6 });
      io.observe(roll);
    }

    document.querySelectorAll(".seg button").forEach(function (b) {
      b.addEventListener("click", function () {
        document.querySelectorAll(".seg button").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true");
        var v = parseInt(b.dataset.v, 10);
        if (fmt(v).length !== fmt(current).length) { buildRoll(v); spin(true); }
        else {
          var digits = fmt(v).replace(/ /g, "").split("");
          roll.querySelectorAll(".d").forEach(function (d, i) { d.dataset.digit = digits[i]; });
          roll.setAttribute("aria-label", fmt(v) + " рублей");
          spin(false);
        }
        current = v;
        formula.innerHTML = b.dataset.f;
      });
    });
  }

  /* ---------- Липкая кнопка на телефоне ---------- */
  var dock = document.getElementById("dock");
  var hero = document.querySelector(".hero");
  var finalSec = document.getElementById("contact");
  if (dock && hero && "IntersectionObserver" in window) {
    var heroVisible = true, finalVisible = false;
    var sync = function () { dock.classList.toggle("show", !heroVisible && !finalVisible); };
    new IntersectionObserver(function (e) { heroVisible = e[0].isIntersecting; sync(); }, { threshold: 0.05 }).observe(hero);
    if (finalSec) new IntersectionObserver(function (e) { finalVisible = e[0].isIntersecting; sync(); }, { threshold: 0.2 }).observe(finalSec);
  }
})();
