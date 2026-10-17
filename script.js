// Data di uscita di GTA VI: allo scadere del timer compare il codice
const releaseDate = new Date("2026-11-19T00:00:00+01:00");

// Il codice vero va inserito qui SOLO il giorno dello sblocco: la repository è pubblica
const redeemCode = "XXXXX-XXXXX-XXXXX";
const placeholderCode = "XXXXX-XXXXX-XXXXX";

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

/* ---------- Timer e codice ---------- */

const countdownNodes = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds"),
};
const countdown = document.querySelector(".countdown");
const vault = document.querySelector(".vault");
const redeem = document.querySelector(".redeem");
const redeemOutput = document.querySelector("#redeem-code");
const copyButton = document.querySelector(".js-copy");
// ?anteprima nell'indirizzo simula il timer scaduto
const isPreview = new URLSearchParams(window.location.search).has("anteprima");

document.querySelector("#release-label").textContent = releaseDate.toLocaleString("it-IT", {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Rome",
});

let countdownTimer;
let pageOpenedBeforeUnlock = false;

function unlockCode() {
  clearInterval(countdownTimer);
  countdown.hidden = true;
  vault.hidden = true;
  redeem.hidden = false;
  document.querySelector(".countdown-title").textContent = "Timer scaduto";

  if (redeemCode === placeholderCode) {
    redeemOutput.textContent = "In consegna…";
    copyButton.hidden = true;
    document.querySelector(".redeem-hint").textContent = "Il codice sta arrivando: ricarica la pagina tra qualche minuto.";
  } else {
    redeemOutput.textContent = redeemCode;
  }

  if (pageOpenedBeforeUnlock) {
    missionPassed.hidden = false;
    makeItRain();
    setTimeout(() => (missionPassed.hidden = true), 3600);
  }
}

function updateCountdown() {
  const distance = isPreview ? 0 : releaseDate.getTime() - Date.now();

  if (distance <= 0) {
    unlockCode();
    return;
  }

  pageOpenedBeforeUnlock = true;

  const day = 1000 * 60 * 60 * 24;
  const hour = 1000 * 60 * 60;
  const minute = 1000 * 60;

  countdownNodes.days.textContent = Math.floor(distance / day);
  countdownNodes.hours.textContent = String(Math.floor((distance % day) / hour)).padStart(2, "0");
  countdownNodes.minutes.textContent = String(Math.floor((distance % hour) / minute)).padStart(2, "0");
  countdownNodes.seconds.textContent = String(Math.floor((distance % minute) / 1000)).padStart(2, "0");
}

updateCountdown();
if (redeem.hidden) countdownTimer = setInterval(updateCountdown, 1000);

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(redeemCode);
    copyButton.textContent = "Copiato!";
  } catch {
    window.getSelection().selectAllChildren(redeemOutput);
    copyButton.textContent = "Selezionato: premi Ctrl+C";
  }
  setTimeout(() => (copyButton.textContent = "Copia il codice"), 2500);
});
