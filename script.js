// ---------- Header scroll state ----------
const header = document.getElementById('siteHeader');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// ---------- Mobile nav ----------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

// ---------- Reveal on scroll ----------
const revealIO = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal, .reveal-section').forEach(el => revealIO.observe(el));
