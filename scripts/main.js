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
  (mq.addEventListener ? mq.addEventListener('change', handler) : mq.addListener(handler));
  function handler(e) {
    if (e.matches) {
      nav.classList.remove('active');
      toggleBtn.textContent = '☰';
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.setAttribute('aria-label', 'Open menu');
    }
  }
}

const yearEl = document.getElementById("currentyear");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const lastModEl = document.getElementById("lastModified");
if (lastModEl) lastModEl.textContent = "Last Modification: " + document.lastModified;

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 3,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 3,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

const listEl = document.getElementById("courses");
const creditsEl = document.getElementById("creditsCount");
const filterButtons = document.querySelectorAll(".filter-btn");

function render(list) {
  if (!listEl) return;
  listEl.innerHTML = "";

  list.forEach((c) => {
    const div = document.createElement("div");
    div.className = "course-item" + (c.completed ? " completed" : "");
    div.textContent = `${c.subject} ${c.number}`;

    div.addEventListener('click', () => {
      displayCourseDetails(c);
    });
    
    listEl.appendChild(div);
  });

  const total = list.reduce((sum, c) => sum + (Number(c.credits) || 0), 0);
  if (creditsEl) creditsEl.textContent = total;
}

function applyFilter(filter) {
  let list = courses;
  if (filter === "CSE") list = courses.filter((c) => c.subject === "CSE");
  if (filter === "WDD") list = courses.filter((c) => c.subject === "WDD");
  render(list);
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    applyFilter(btn.dataset.filter || "ALL");
  });
});

applyFilter("ALL");

function displayCourseDetails(course) {
  const courseDetails = document.getElementById("course-details");
  courseDetails.innerHTML = '';
  courseDetails.innerHTML = `
    <button id="closeModal">❌</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p><strong>Certificate</strong>: ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
  `;
  courseDetails.showModal();
  
  closeModal.addEventListener("click", () => {
    courseDetails.close();
  });
}