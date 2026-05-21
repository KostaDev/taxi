// ── Navbar: scroll state + fixed CTA visibility ──────────────────────────────
const navbar = document.getElementById('navbar');
const fixedCta = document.getElementById('fixedCta');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 80;
  navbar.classList.toggle('scrolled', scrolled);
  fixedCta.classList.toggle('visible', window.scrollY > 600);
});

// ── Hamburger menu ────────────────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('active');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ── Scroll reveal (IntersectionObserver) ─────────────────────────────────────
const animatedEls = document.querySelectorAll(
  '.service-card, .philosophy-item, .testimonial, .contact-item, .section-header, .philosophy-quote, .hero-stats'
);

animatedEls.forEach(el => el.classList.add('fade-in'));

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

animatedEls.forEach(el => revealObserver.observe(el));

// Stagger delay for grid children
['services-grid', 'philosophy-grid', 'testimonials', 'contact-grid'].forEach(gridClass => {
  const grid = document.querySelector('.' + gridClass);
  if (!grid) return;
  grid.querySelectorAll('.fade-in').forEach((el, index) => {
    el.style.transitionDelay = 0.1 * index + 's';
  });
});

// ── Active nav link highlight on scroll ──────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let activeId = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      activeId = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${activeId}`) {
      link.style.color = '#c9a84c';
    }
  });
});

// ── Stat counter animation ────────────────────────────────────────────────────
function animateCounter(el, target, suffix = '') {
  let startTime = 0;
  const tick = timestamp => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / 2200, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const statsObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-num').forEach(el => {
          const text = el.textContent.trim();
          if (text === '24/7') return;
          if (text.includes('k')) {
            animateCounter(el, 50, 'k');
          } else if (/^\d+$/.test(text)) {
            animateCounter(el, parseInt(text));
          }
        });
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);