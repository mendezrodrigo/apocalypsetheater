// scripts/main.js – shared site behavior

/* ---------- Cursor light‑bringer ---------- */
document.addEventListener('mousemove', (e) => {
  document.body.style.setProperty('--cursor-x', `${e.clientX}px`);
  document.body.style.setProperty('--cursor-y', `${e.clientY}px`);
});

/* ---------- Unique visitor counter ---------- */
const VISITED_KEY = 'apocalypse_visited';
const COUNT_KEY = 'apocalypse_unique_visits';
let visits = parseInt(localStorage.getItem(COUNT_KEY) || '0', 10);
if (!sessionStorage.getItem(VISITED_KEY)) {
  sessionStorage.setItem(VISITED_KEY, '1');
  visits += 1;
  localStorage.setItem(COUNT_KEY, visits);
}
const counter = document.getElementById('visit-counter');
let current = 0;
const tick = setInterval(() => {
  current++;
  if (counter) counter.textContent = current;
  if (current >= visits) clearInterval(tick);
}, 35);

/* ---------- Scroll‑reveal ---------- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ---------- Card cursor‑glow ---------- */
document.querySelectorAll('.card').forEach(card => {
  const glow = card.querySelector('.card-glow');
  if (!glow) return;
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    glow.style.left = `${e.clientX - rect.left}px`;
    glow.style.top = `${e.clientY - rect.top}px`;
  });
});
