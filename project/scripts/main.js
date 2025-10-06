document.getElementById('guidanceForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const submissions = JSON.parse(localStorage.getItem('submissions')) || [];
    submissions.push({ name, email, message });
    localStorage.setItem('submissions', JSON.stringify(submissions));

    document.getElementById('formMessage').innerText = 'Thank you for your question!';
});

const toggleBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

toggleBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    toggleBtn.textContent = nav.classList.contains('active') ? '✖' : '☰';
});
