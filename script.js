/* ==============================================
   SCRIPT.JS — Portfolio v3 (Dark Theme)
   ============================================== */
document.addEventListener('DOMContentLoaded', () => {

  // Header scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('header--scrolled', window.scrollY > 40);
  }, { passive: true });

  // Mobile menu
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
  });
  nav.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => {
    hamburger.classList.remove('active');
    nav.classList.remove('open');
  }));

  // Skills carousel
  const track = document.getElementById('skillsTrack');
  document.getElementById('skillsLeft').addEventListener('click', () => {
    track.scrollBy({ left: -200, behavior: 'smooth' });
  });
  document.getElementById('skillsRight').addEventListener('click', () => {
    track.scrollBy({ left: 200, behavior: 'smooth' });
  });

  // Scroll reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

  // Counter animation
  const cObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        cObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.counter__number').forEach(el => cObserver.observe(el));

  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const dur = 1200, start = performance.now();
    const isFloat = target % 1 !== 0;
    (function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = isFloat ? (eased * target).toFixed(1) : Math.floor(eased * target);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = isFloat ? target.toFixed(1) : target;
    })(performance.now());
  }

  // Active nav
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.toggle('nav-link--active',
          l.getAttribute('href') === `#${e.target.id}`));
      }
    });
  }, { threshold: 0.3, rootMargin: '-68px 0px 0px 0px' });
  sections.forEach(s => navObserver.observe(s));

  // Contact form
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const phoneNumber = '5534992264329';
    const text = `Olá, meu nome é *${name}*.\nMeu e-mail é *${email}*.\n\n${message}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

    window.open(whatsappUrl, '_blank');

    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = '✓ Redirecionando...';
    btn.style.pointerEvents = 'none'; btn.style.opacity = '0.7';
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.pointerEvents = ''; btn.style.opacity = '';
      form.reset();
    }, 2500);
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); window.scrollTo({ top: t.offsetTop - 68, behavior: 'smooth' }); }
    });
  });
});
