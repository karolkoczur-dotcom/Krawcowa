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

// ---------- Hero parallax (wrapper drifts slower than scroll; image itself has its own CSS animation) ----------
const heroBgWrap = document.querySelector('.hero-bg-wrap');
const heroSection = document.querySelector('.hero');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (heroBgWrap && heroSection && !prefersReducedMotion) {
  let ticking = false;
  function updateHeroParallax() {
    const heroHeight = heroSection.offsetHeight;
    const scrollY = window.scrollY;
    if (scrollY < heroHeight) {
      heroBgWrap.style.transform = `translateY(${scrollY * 0.22}px)`;
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

// ---------- Hero background slider (rotating set of transition effects) ----------
const heroSlides = document.querySelectorAll('.hero-slide');
if (heroSlides.length > 1 && !prefersReducedMotion) {
  const effects = ['fade', 'slide', 'zoomblur'];
  let effectIndex = 0;
  let currentSlide = 0;

  // stan "startowy" kazdego efektu (przed wjazdem) - bez tranzycji
  function setRestingState(el, effect) {
    el.style.transition = 'none';
    if (effect === 'slide') {
      el.style.transform = 'translateX(6%)';
      el.style.filter = 'none';
    } else if (effect === 'zoomblur') {
      el.style.transform = 'scale(1.12)';
      el.style.filter = 'blur(18px)';
    } else {
      el.style.transform = 'none';
      el.style.filter = 'none';
    }
    void el.offsetHeight; // wymuszenie reflow
    el.style.transition = '';
  }

  function setActiveState(el) {
    el.style.transform = 'translateX(0) scale(1)';
    el.style.filter = 'blur(0)';
  }

  setInterval(() => {
    const outgoing = heroSlides[currentSlide];
    const nextIndex = (currentSlide + 1) % heroSlides.length;
    const incoming = heroSlides[nextIndex];
    const effect = effects[effectIndex % effects.length];
    effectIndex++;

    setRestingState(incoming, effect);
    requestAnimationFrame(() => {
      outgoing.classList.remove('is-active');
      incoming.classList.add('is-active');
      setActiveState(incoming);
    });

    currentSlide = nextIndex;
  }, 6000);
}
