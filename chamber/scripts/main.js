const toggleBtn = document.querySelector('.menu-toggle');
const nav = document.getElementById('primaryNav');

if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', () => {
        const isActive = nav.classList.toggle('active');
        toggleBtn.textContent = isActive ? '✖' : '☰';
        toggleBtn.setAttribute('aria-expanded', String(isActive));
        toggleBtn.setAttribute('aria-label', isActive ? 'Close menu' : 'Open menu');
    });

    const mq = window.matchMedia('(min-width: 900px)');
    const resetMenu = (e) => {
        if (e.matches) {
            nav.classList.remove('active');
            toggleBtn.textContent = '☰';
            toggleBtn.setAttribute('aria-expanded', 'false');
            toggleBtn.setAttribute('aria-label', 'Open menu');
        }
    };
    mq.addEventListener ? mq.addEventListener('change', resetMenu) : mq.addListener(resetMenu);
}

const DATA_URL = "data/members.json";

const mainEl = document.getElementById("main") || document.body;

const toolbar = document.querySelector(".directory-toolbar");
const container = document.getElementById("memberList");

const state = {
  members: [],
  view: "grid",
};

const membershipLabel = (n) =>
  ({ 1: "Member", 2: "Silver", 3: "Gold" }[Number(n)] || "Member");

const displayHostname = (href) => {
  try { return new URL(href).hostname.replace(/^www\./, ""); }
  catch { return href; }
};

function render() {
  container.innerHTML = "";
  container.classList.toggle("grid", state.view === "grid");
  container.classList.toggle("list", state.view === "list");

  state.members.forEach((m) => {
    if (state.view === "grid") {
      // Card (grid)
      const card = document.createElement("article");
      card.className = "member-card";

      const img = document.createElement("img");
      img.src = m.image;
      img.alt = `${m.name} logo`;
      img.loading = "lazy";
      img.width = 320;
      img.height = 200;

      const h3 = document.createElement("h3");
      h3.textContent = m.name;

      const meta = document.createElement("p");
      meta.className = "meta";
      meta.innerHTML = `
        <strong>${membershipLabel(m.membership)}</strong><br>
        ${m.address}<br>
        ${m.phone}
      `;

      const link = document.createElement("a");
      link.href = m.url;
      link.target = "_blank";
      link.rel = "noopener";
      link.className = "website";
      link.textContent = displayHostname(m.url);

      card.append(h3, meta, img, link);
      container.append(card);
    } else {
      // Line (list)
      const row = document.createElement("div");
      row.className = "member-row";
      row.innerHTML = `
        <span class="col name">${m.name}</span>
        <span class="col kind">${membershipLabel(m.membership)}</span>
        <span class="col address">${m.address}</span>
        <span class="col phone">${m.phone}</span>
        <a class="col site" href="${m.url}" target="_blank" rel="noopener">${displayHostname(m.url)}</a>
      `;
      container.append(row);
    }
  });

  document.querySelectorAll(".view-btn").forEach((btn) => {
    const active = btn.dataset.view === state.view;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", String(active));
  });
}

toolbar.addEventListener("click", (e) => {
  const btn = e.target.closest(".view-btn");
  if (!btn) return;
  const view = btn.dataset.view;
  if (view && view !== state.view) {
    state.view = view;
    render();
  }
});

async function loadMembers() {
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    state.members = Array.isArray(data) ? data : (data.members || []);
    render();
  } catch (err) {
    console.error("Failed to load members:", err);
    container.innerHTML = `<p class="error">Unable to load members. Please try again later.</p>`;
  }
}

loadMembers();

const yearEl = document.getElementById('currentyear');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const lastModEl = document.getElementById('lastModified');
if (lastModEl) lastModEl.textContent = 'Last Modification: ' + document.lastModified;
