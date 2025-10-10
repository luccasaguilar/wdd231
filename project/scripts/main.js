export function initMainShell() {
    const toggleBtn = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    toggleBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        toggleBtn.textContent = nav.classList.contains('active') ? '✖' : '☰';
    });
}