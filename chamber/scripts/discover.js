const DATA_URL = 'data/places.json';
const gallery = document.getElementById('gallery');
const visitBox = document.getElementById('visitMessage');

(function handleVisits() {
  const key = 'discover-last-visit';
  const now = Date.now();
  const last = Number(localStorage.getItem(key));

  let msg = 'Welcome! Let us know if you have any questions.';
  if (last) {
    const diffDays = (now - last) / 86400000;
    if (diffDays < 1) {
      msg = 'Back so soon! Awesome!';
    } else {
      const n = Math.floor(diffDays);
      msg = `You last visited ${n} ${n === 1 ? 'day' : 'days'} ago.`;
    }
  }
  localStorage.setItem(key, String(now));

  if (visitBox) visitBox.textContent = msg;
})();

const AREAS = ['a','b','c','d','e','f','g','h'];

async function loadPlaces() {
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const items = Array.isArray(data) ? data : (data.places || []);

    gallery.innerHTML = '';

    items.slice(0, 8).forEach((p, i) => {
      const area = AREAS[i] || 'a';

      const card = document.createElement('article');
      card.className = `card area-${area}`;

      const h2 = document.createElement('h2');
      h2.textContent = p.name;

      const fig = document.createElement('figure');
      const img = document.createElement('img');
      img.src = p.image;                          
      img.alt = p.alt || p.name;
      img.loading = 'lazy';
      img.width = 560; 
      img.height = 300;
      fig.appendChild(img);

      const adr = document.createElement('address');
      adr.textContent = p.address;

      const desc = document.createElement('p');
      desc.textContent = p.description;

      const btn = document.createElement('a');
      btn.className = 'btn';
      btn.href = p.url || '#';
      btn.target = '_blank';
      btn.rel = 'noopener';
      
      btn.append(document.createTextNode('Learn more'));

      const sr = document.createElement('span');
      sr.className = 'sr-only';
      sr.textContent = ` about ${p.name}`;
      btn.append(sr);
      
      btn.setAttribute('aria-label', `${p.alt}`);
      btn.setAttribute('aria-labelledby', `${h2.id} ${btn.id}`);

      card.append(h2, fig, adr, desc, btn);
      gallery.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    gallery.innerHTML = `<p class="error">Could not load places. Please try again later.</p>`;
  }
}

loadPlaces();
