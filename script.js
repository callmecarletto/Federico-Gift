const targetDate = new Date("2027-12-31T23:59:59+01:00");

const countdownNodes = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds"),
};

function updateCountdown() {
  const distance = Math.max(0, targetDate.getTime() - Date.now());
  const day = 1000 * 60 * 60 * 24;
  const hour = 1000 * 60 * 60;
  const minute = 1000 * 60;

  countdownNodes.days.textContent = Math.floor(distance / day);
  countdownNodes.hours.textContent = String(Math.floor((distance % day) / hour)).padStart(2, "0");
  countdownNodes.minutes.textContent = String(Math.floor((distance % hour) / minute)).padStart(2, "0");
  countdownNodes.seconds.textContent = String(Math.floor((distance % minute) / 1000)).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const modal = document.querySelector("#surprise-modal");
const confettiLayer = document.querySelector(".confetti-layer");
let lastFocusedElement;

function launchConfetti() {
  const colors = ["#f1c933", "#ffffff", "#0e62ce", "#ffdf56", "#f06a72"];

  for (let index = 0; index < 90; index += 1) {
    const piece = document.createElement("i");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty("--duration", `${2.5 + Math.random() * 2.8}s`);
    piece.style.setProperty("--rotation", `${Math.random() * 360}deg`);
    piece.style.setProperty("--drift", `${-120 + Math.random() * 240}px`);
    piece.style.animationDelay = `${Math.random() * 0.7}s`;
    confettiLayer.appendChild(piece);
    setTimeout(() => piece.remove(), 6000);
  }
}

function openModal(event) {
  lastFocusedElement = event.currentTarget;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  modal.querySelector(".modal-close").focus();
  launchConfetti();
}

function closeModal() {
  modal.hidden = true;
  document.body.classList.remove("modal-open");
  lastFocusedElement?.focus();
}

document.querySelectorAll(".js-redeem").forEach((button) => button.addEventListener("click", openModal));
document.querySelectorAll(".js-close").forEach((button) => button.addEventListener("click", closeModal));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) closeModal();
});
