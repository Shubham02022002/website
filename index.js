const spotlight = document.getElementById('spotlight');

if (spotlight) {
  window.addEventListener('pointermove', (event) => {
    spotlight.style.setProperty('--x', event.clientX + 'px');
    spotlight.style.setProperty('--y', event.clientY + 'px');
  });
}

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

