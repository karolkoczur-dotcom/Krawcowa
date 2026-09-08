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

// ---------- Hero parallax (image drifts slower than scroll) ----------
const heroBgImg = document.querySelector('.hero-bg-img');
const heroSection = document.querySelector('.hero');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (heroBgImg && heroSection && !prefersReducedMotion) {
  let ticking = false;
  function updateHeroParallax() {
    const heroHeight = heroSection.offsetHeight;
    const scrollY = window.scrollY;
    if (scrollY < heroHeight) {
      heroBgImg.style.transform = `translateY(${scrollY * 0.22}px)`;
    }
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeroParallax);
      ticking = true;
    }
  });
  updateHeroParallax();
}
