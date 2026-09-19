/* ───────────────────────────────────────────────
   main.js  —  Sewmahal Portfolio
─────────────────────────────────────────────── */

/* ── Navbar scroll shadow ─────────────────────── */
const navbar = document.getElementById('navbar');
if (navbar) {
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── Mobile hamburger ─────────────────────────── */
const burger    = document.getElementById('burger');
const navLinks  = document.getElementById('navLinks');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    const [s1, s2, s3] = burger.querySelectorAll('span');
    if (open) {
      s1.style.transform = 'translateY(7px) rotate(45deg)';
      s2.style.opacity   = '0';
      s3.style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      [s1, s2, s3].forEach(s => s.style = '');
    }
  });
  // Close on nav link click
  navLinks.querySelectorAll('.nav-link').forEach(l => {
    l.addEventListener('click', () => {
      navLinks.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      burger.querySelectorAll('span').forEach(s => s.style = '');
    });
  });
}

/* ── Active nav link ──────────────────────────── */
(function markActive() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* ── IntersectionObserver – fade-up ──────────── */
const fadeObserver = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

/* ── Typewriter effect ────────────────────────── */
function Typewriter(el, words, typeSpeed = 75, deleteSpeed = 45, pause = 2200) {
  let wi = 0, ci = 0, deleting = false;
  function tick() {
    const word  = words[wi];
    const shown = deleting ? word.slice(0, ci - 1) : word.slice(0, ci + 1);
    el.textContent = shown;
    if (!deleting && shown === word) {
      deleting = true;
      return setTimeout(tick, pause);
    }
    if (deleting && shown === '') {
      deleting = false;
      wi = (wi + 1) % words.length;
      ci = 0;
      return setTimeout(tick, 350);
    }
    ci = deleting ? ci - 1 : ci + 1;
    setTimeout(tick, deleting ? deleteSpeed : typeSpeed);
  }
  tick();
}

const twEl = document.querySelector('.typewriter');
if (twEl) {
  Typewriter(twEl, [
    'AI Undergraduate Student',
    'Aspiring AI Developer',
    'Software Developer',
    'Arduino Enthusiast',
    'Creative Problem Solver'
  ]);
}

/* ── Animated counter ─────────────────────────── */
function animateCount(el, target, suffix = '', duration = 1400) {
  let start = null;
  function step(ts) {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const val = Math.round(progress * target);
    el.textContent = val + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('[data-count]').forEach(el => {
      animateCount(el, +el.dataset.count, el.dataset.suffix || '');
    });
    statsObserver.unobserve(entry.target);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stats-section').forEach(el => statsObserver.observe(el));

/* ── Skill bar animation ──────────────────────── */
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
      bar.style.transform = `scaleX(${bar.dataset.width || 1})`;
      bar.classList.add('animate');
    });
    barObserver.unobserve(entry.target);
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-bars-section').forEach(el => barObserver.observe(el));

/* ── Contact form ─────────────────────────────── */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn  = form.querySelector('.form-submit');
    const orig = btn.innerHTML;
    btn.innerHTML  = '✓ Message Sent!';
    btn.style.background = 'linear-gradient(135deg,#16a34a,#22c55e)';
    btn.disabled   = true;
    setTimeout(() => {
      btn.innerHTML  = orig;
      btn.style.background = '';
      btn.disabled   = false;
      form.reset();
    }, 3500);
  });
}

/* ── Smooth scroll for anchor links ───────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
