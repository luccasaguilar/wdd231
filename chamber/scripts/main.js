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

const yearEl = document.getElementById('currentyear');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const lastModEl = document.getElementById('lastModified');
if (lastModEl) lastModEl.textContent = 'Last Modification: ' + document.lastModified;
