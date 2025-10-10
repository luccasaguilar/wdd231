const PROV_DATA_URL = 'data/provinces.json';

const modal = document.getElementById('mapModal');
const modalImg = document.getElementById('mapImg');
const modalTitle = document.getElementById('mapTitle');

let lastFocus = null;

export async function initProvinces() {
    const grid = document.getElementById('provinceGrid');

    function hostFrom(url) {
    try { return new URL(url).hostname.replace(/^www\./,''); }
    catch { return url; }
    }

    function render(provinces) {
    grid.innerHTML = '';
    provinces.forEach((p, idx) => {
        const card = document.createElement('article');
        card.className = 'province-card';

        const h3 = document.createElement('h3');
        h3.textContent = p.name;

        const list = document.createElement('ul');
        list.innerHTML = `
        <li><strong>Capital:</strong> ${p.capital}</li>
        <li><strong>Population:</strong> ${p.population}</li>
        <li><strong>Official language(s):</strong> ${p.officialLanguages}</li>
        <li><strong>Region:</strong> ${p.region}</li>
        <li><strong>Fact:</strong> ${p.fact}</li>
        <li><strong>Website:</strong> <a href="${p.site}" target="_blank" rel="noopener">${hostFrom(p.site)}</a></li>
        `;

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn';
        btn.textContent = 'View map';
        btn.addEventListener('click', () => {
        openModal(p.map, `${p.name} map`, `${p.name} — map`);
        });

        card.append(h3, list, btn);
        grid.append(card);
    });
    }

    (async function init() {
    try {
        const res = await fetch(PROV_DATA_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        render(Array.isArray(data) ? data : (data.provinces || []));
    } catch (err) {
        console.error(err);
        grid.innerHTML = `<p class="error">Unable to load province data right now. Please try again later.</p>`;
    }
    })();    

}

export function openModal(src, alt, title) {
        lastFocus = document.activeElement;
        modalImg.src = src;
        modalImg.alt = alt || title || 'Province map';
        modalTitle.textContent = title || 'Province map';
        modal.hidden = false;
        modal.querySelector('.modal__close').focus();
    }

export function closeModal() {
        modal.hidden = true;
        modalImg.src = '';
        if (lastFocus) lastFocus.focus();
    }

export function setupMapModalWiring() {    
    modal.addEventListener('click', (e) => {
        if (e.target.hasAttribute('data-close')) closeModal();
    });
    window.addEventListener('keydown', (e) => {
        if (!modal.hidden && e.key === 'Escape') closeModal();
    });
}
