// Data di uscita di GTA VI (modificala qui se Rockstar la sposta di nuovo)
const releaseDate = new Date("2026-11-19T00:00:00+01:00");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Schermata di caricamento ---------- */

const loader = document.querySelector(".loader");
const loaderStart = loader.querySelector(".loader-start");
const loaderStatus = loader.querySelector(".loader-status");

document.body.classList.add("is-locked");

function showStartButton() {
  loaderStatus.textContent = "Vice City è pronta";
  loaderStart.hidden = false;
  loaderStart.focus();
}

function closeLoader() {
  loader.classList.add("is-done");
  loader.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-locked");
  document.querySelectorAll(".hero .reveal").forEach((element) => element.classList.add("is-visible"));
}

setTimeout(showStartButton, prefersReducedMotion ? 0 : 1900);
loaderStart.addEventListener("click", closeLoader);

/* ---------- Header ---------- */

const header = document.querySelector(".site-header");

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 40);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

/* ---------- Animazioni allo scroll ---------- */

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

document.querySelectorAll(".reveal:not(.hero .reveal)").forEach((element) => observer.observe(element));

/* ---------- Conto alla rovescia ---------- */

const countdownNodes = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds"),
};

document.querySelector("#release-label").textContent = releaseDate.toLocaleDateString("it-IT", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

let countdownTimer;

function updateCountdown() {
  const distance = releaseDate.getTime() - Date.now();

  if (distance <= 0) {
    clearInterval(countdownTimer);
    document.querySelector(".countdown").hidden = true;
    document.querySelector(".countdown-title").textContent = "È uscito. Che aspetti?";
    document.querySelector("#countdown-note").textContent = "Vice City ti sta aspettando, Dottore.";
    return;
  }

  const day = 1000 * 60 * 60 * 24;
  const hour = 1000 * 60 * 60;
  const minute = 1000 * 60;

  countdownNodes.days.textContent = Math.floor(distance / day);
  countdownNodes.hours.textContent = String(Math.floor((distance % day) / hour)).padStart(2, "0");
  countdownNodes.minutes.textContent = String(Math.floor((distance % hour) / minute)).padStart(2, "0");
  countdownNodes.seconds.textContent = String(Math.floor((distance % minute) / 1000)).padStart(2, "0");
}

updateCountdown();
countdownTimer = setInterval(updateCountdown, 1000);

/* ---------- Apertura del regalo ---------- */

const stage = document.querySelector(".gift-stage");
const crate = stage.querySelector(".crate");
const cover = stage.querySelector(".cover");
const missionPassed = document.querySelector(".mission-passed");
const moneyLayer = document.querySelector(".money-layer");

function makeItRain() {
  if (prefersReducedMotion) return;

  for (let index = 0; index < 70; index += 1) {
    const bill = document.createElement("i");
    bill.className = "bill";
    bill.textContent = "$100";
    bill.style.left = `${Math.random() * 100}%`;
    bill.style.setProperty("--duration", `${2.6 + Math.random() * 2.6}s`);
    bill.style.setProperty("--rotation", `${-540 + Math.random() * 1080}deg`);
    bill.style.setProperty("--drift", `${-140 + Math.random() * 280}px`);
    bill.style.animationDelay = `${Math.random() * 1.2}s`;
    moneyLayer.appendChild(bill);
    setTimeout(() => bill.remove(), 7000);
  }
}

function openGift() {
  if (stage.dataset.state !== "closed") return;

  stage.dataset.state = "opening";

  setTimeout(
    () => {
      crate.hidden = true;
      cover.hidden = false;
      cover.setAttribute("tabindex", "-1");
      cover.focus({ preventScroll: true });
      stage.dataset.state = "open";

      missionPassed.hidden = false;
      makeItRain();
      setTimeout(() => (missionPassed.hidden = true), 3600);
    },
    prefersReducedMotion ? 0 : 1600,
  );
}

document.querySelector(".js-open").addEventListener("click", openGift);
