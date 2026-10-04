const spotlight = document.getElementById("spotlight");

if (spotlight) {
  window.addEventListener("pointermove", (event) => {
    spotlight.style.setProperty("--x", event.clientX + "px");
    spotlight.style.setProperty("--y", event.clientY + "px");
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
