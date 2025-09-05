// main.js — WDD131 Home
// 1) Responsive menu (hamburger)
// 2) Footer dynamic year and last modified
// 3) Course list rendering + filters + dynamic credits total

// Why defer? Ensures the DOM is parsed before this script runs, avoids blocking HTML parsing.

// Responsive Menu
const menuBtn = document.getElementById('menu');
const nav = document.getElementById('primaryNav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });
}

// Footer dynamic values
const yearEl = document.getElementById('currentyear');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const lastModEl = document.getElementById('lastModified');
if (lastModEl) {
  // document.lastModified returns a simple, human-readable string
  lastModEl.textContent = `Last Modified: ${document.lastModified}`;
}

// ===== Course List Array (Web & Computer Programming Certificate) =====
// NOTE: Update 'completed' to true for courses you've completed.
const courses = [
  { code: 'WDD 130', name: 'Web Fundamentals',          credits: 1, type: 'WDD', completed: false },
  { code: 'WDD 131', name: 'Dynamic Web Fundamentals',  credits: 2, type: 'WDD', completed: false },
  { code: 'WDD 231', name: 'Frontend Web Dev I',        credits: 2, type: 'WDD', completed: false },
  { code: 'CSE 110', name: 'Intro to Programming',      credits: 2, type: 'CSE', completed: false },
  { code: 'CSE 111', name: 'Programming with Functions',credits: 2, type: 'CSE', completed: false },
  { code: 'CSE 210', name: 'Programming with Classes',  credits: 3, type: 'CSE', completed: false },
];

// ===== Render helpers =====
const grid = document.getElementById('courses');
const creditsCount = document.getElementById('creditsCount');
const filterButtons = document.querySelectorAll('.filter-btn');

function renderCourses(list){
  if (!grid) return;
  grid.innerHTML = '';
  list.forEach(c => {
    const card = document.createElement('article');
    card.className = 'course' + (c.completed ? ' completed' : '');

    const title = document.createElement('h3');
    title.textContent = `${c.code} — ${c.name}`;

    const meta = document.createElement('p');
    meta.className = 'meta';
    meta.textContent = `${c.type} • ${c.credits} credit${c.credits>1?'s':''}`;

    card.appendChild(title);
    card.appendChild(meta);
    grid.appendChild(card);
  });

  // Update total credits using reduce
  const total = list.reduce((sum, c) => sum + (Number(c.credits)||0), 0);
  if (creditsCount) creditsCount.textContent = total;
}

function applyFilter(filter){
  let list = courses;
  if (filter === 'WDD') list = courses.filter(c => c.type === 'WDD');
  if (filter === 'CSE') list = courses.filter(c => c.type === 'CSE');

  renderCourses(list);
}

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter || 'ALL';
    applyFilter(filter);
  });
});

// Initial render
applyFilter('ALL');
