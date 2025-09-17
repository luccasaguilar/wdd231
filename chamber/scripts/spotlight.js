const DATA_URL = "data/members.json";
const listEl = document.getElementById("spotlightList");

const membershipLabel = (n) => ({ 1: "Member", 2: "Silver", 3: "Gold" }[Number(n)] || "Member");
const displayHostname = (href) => { try { return new URL(href).hostname.replace(/^www\./, ""); } catch { return href; } };
const telHref = (phone) => "tel:" + String(phone).replace(/[^\d+]/g, "");

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function renderSpotlights(members) {
  listEl.innerHTML = "";

  members.forEach((m, idx) => {
    const card = document.createElement("article");
    card.className = "spotlight-card";

    // Title
    const h3 = document.createElement("h3");
    h3.className = "biz-name";
    h3.textContent = m.name;

    const fig = document.createElement("figure");
    fig.className = "biz-media";

    const img = document.createElement("img");
    img.src = m.image;
    img.alt = `${m.name} logo`;
    img.width = 320;                 
    img.height = 200;
    img.decoding = "async";

    const eager = idx < 1;
    img.loading = eager ? "eager" : "lazy";
    if ("fetchPriority" in img) {
      img.fetchPriority = eager ? "high" : "low";
    } else {
      img.setAttribute("fetchpriority", eager ? "high" : "low");
    }

    fig.appendChild(img);

    const ul = document.createElement("ul");
    ul.className = "biz-meta";
    ul.innerHTML = `
      <li><strong>Address:</strong> ${m.address}</li>
      <li><strong>Phone:</strong> <a href="${telHref(m.phone)}">${m.phone}</a></li>
      <li><strong>Website:</strong> <a href="${m.url}" target="_blank" rel="noopener">${displayHostname(m.url)}</a></li>
      <li><strong>Membership:</strong> ${membershipLabel(m.membership)}</li>
    `;

    card.append(h3, fig, ul);
    listEl.append(card);
  });
}

async function loadSpotlights() {
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const members = Array.isArray(data) ? data : (data.members || []);

    const eligible = members.filter(m => Number(m.membership) >= 2);

    const pick = shuffle(eligible).slice(0, 3);

    renderSpotlights(pick);
  } catch (err) {
    console.error("Spotlights load failed:", err);
    listEl.innerHTML = `<p class="error">Unable to load member spotlights.</p>`;
  }
}

loadSpotlights();