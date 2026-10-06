const navToggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav");

if (navToggle && nav) {
  const setNavOpen = (open) => {
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("is-open", open);
  };

  navToggle.addEventListener("click", () => {
    setNavOpen(navToggle.getAttribute("aria-expanded") !== "true");
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setNavOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setNavOpen(false);
  });

  const wide = window.matchMedia("(min-width: 640px)");
  wide.addEventListener("change", (event) => {
    if (event.matches) setNavOpen(false);
  });
}

const deck = document.querySelector(".deck");
const deckTabs = deck ? Array.from(deck.querySelectorAll(".deck-card")) : [];

function selectProject(tab, focus = false) {
  for (const other of deckTabs) {
    const panel = document.getElementById(other.getAttribute("aria-controls"));
    const selected = other === tab;

    other.setAttribute("aria-selected", String(selected));
    other.tabIndex = selected ? 0 : -1;
    if (panel) panel.hidden = !selected;
  }

  if (focus) tab.focus();
}

for (const [index, tab] of deckTabs.entries()) {
  tab.addEventListener("click", () => selectProject(tab));

  tab.addEventListener("keydown", (event) => {
    const last = deckTabs.length - 1;
    let next;

    switch (event.key) {
      case "ArrowRight":
        next = (index + 1) % deckTabs.length;
        break;
      case "ArrowLeft":
        next = (index + last) % deckTabs.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = last;
        break;
      default:
        return;
    }

    event.preventDefault();
    selectProject(deckTabs[next], true);
  });
}

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const GITHUB_USER = "Shubham02022002";
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function chunkIntoWeeks(days) {
  const leading = new Date(days[0].date + "T00:00:00Z").getUTCDay();
  const cells = Array(leading).fill(null).concat(days);
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

function formatDay(date) {
  const [year, month, day] = date.split("-");
  return `${MONTHS[Number(month) - 1]} ${Number(day)}, ${year}`;
}

function renderGraph(weeks) {
  const monthsEl = document.getElementById("graph-months");
  const gridEl = document.getElementById("graph-grid");

  let previousMonth = null;
  for (const week of weeks) {
    const firstDay = week.find(Boolean);
    const month = firstDay ? new Date(firstDay.date + "T00:00:00Z").getUTCMonth() : previousMonth;

    const label = document.createElement("span");
    label.className = "graph-month";
    if (month !== previousMonth) {
      label.textContent = MONTHS[month];
      previousMonth = month;
    }
    monthsEl.append(label);

    for (const day of week) {
      const cell = document.createElement("span");
      cell.className = "graph-day";
      if (day) {
        cell.dataset.level = day.level;
        cell.title = `${day.count} contribution${day.count === 1 ? "" : "s"} on ${formatDay(day.date)}`;
      }
      gridEl.append(cell);
    }
  }
}

async function loadActivity() {
  const gridEl = document.getElementById("graph-grid");
  const totalEl = document.getElementById("graph-total");
  const statusEl = document.getElementById("graph-status");
  if (!gridEl) return;

  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`
    );
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);

    const data = await response.json();
    renderGraph(chunkIntoWeeks(data.contributions));

    const total = data.total.lastYear;
    totalEl.textContent = `${total} contribution${total === 1 ? "" : "s"} in the last year.`;
  } catch {
    totalEl.textContent = "GitHub activity";
    statusEl.textContent = "Couldn't load contributions right now — ";
    const link = document.createElement("a");
    link.href = `https://github.com/${GITHUB_USER}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "view the profile on GitHub ↗";
    statusEl.append(link);
  }
}

loadActivity();
