// ---------- Intro ----------
window.addEventListener('load', () => {
  setTimeout(() => {
    const intro = document.getElementById('intro');
    if (intro) intro.classList.add('hide');
  }, 2600);
});

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
document.querySelectorAll('.reveal').forEach(el => revealIO.observe(el));

// ---------- Gallery: build from GALLERY_IMAGES + real lazy loading ----------
const gallery = document.getElementById('gallery');
if (gallery && typeof GALLERY_IMAGES !== 'undefined') {
  const IMG_BASE = 'images/';

  // Build markup with data-src (nothing is fetched yet)
  GALLERY_IMAGES.forEach((filename, i) => {
    const fig = document.createElement('figure');

    const frame = document.createElement('div');
    frame.className = 'frame';

    const img = document.createElement('img');
    img.dataset.src = IMG_BASE + filename;
    img.alt = 'Realizacja pracowni krawieckiej Maria Sysło-Mrówka, projekt ' + (i + 1);
    img.width = 480;
    img.height = 600;

    frame.appendChild(img);
    fig.appendChild(frame);

    const cap = document.createElement('figcaption');
    cap.textContent = 'Model ' + String(i + 1).padStart(2, '0');
    fig.appendChild(cap);

    fig.addEventListener('click', () => {
      if (img.src) openLightbox(img.src, img.alt);
    });

    gallery.appendChild(fig);
  });

  // Only fetch the actual image file once the figure is near the viewport
  const lazyIO = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const frame = entry.target;
      const img = frame.querySelector('img');
      if (img && img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        img.addEventListener('load', () => {
          img.classList.add('loaded');
          frame.classList.add('loaded');
        }, { once: true });
      }
      obs.unobserve(frame);
    });
  }, { rootMargin: '300px 0px', threshold: 0.01 });

  gallery.querySelectorAll('.frame').forEach(frame => lazyIO.observe(frame));
}

// ---------- Lightbox ----------
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
function openLightbox(src, alt) {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightbox.classList.add('open');
}
if (lightbox) {
  const closeBtn = document.getElementById('lightboxClose');
  if (closeBtn) closeBtn.addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.classList.remove('open'); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') lightbox.classList.remove('open'); });
}
