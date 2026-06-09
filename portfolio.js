/* ── CURSOR ── */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animateCursor(){
  cursor.style.left     = mx + 'px';
  cursor.style.top      = my + 'px';
  rx += (mx - rx) * .12;
  ry += (my - ry) * .12;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top  = ry + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.borderBottomColor = window.scrollY > 50
    ? 'rgba(42,45,56,.8)'
    : 'var(--border)';
});

/* ── MOBILE MENU ── */
function toggleMenu(){
  document.getElementById('mobileMenu').classList.toggle('open');
}

/* ── REVEAL ON SCROLL ── */
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) { e.target.classList.add('visible'); }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

/* ── TIMELINE REVEAL ── */
const timelineItems = document.querySelectorAll('.timeline-item');
const tlObserver = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if(e.isIntersecting){
      setTimeout(() => e.target.classList.add('visible'), i * 120);
    }
  });
}, { threshold: 0.15 });
timelineItems.forEach(el => tlObserver.observe(el));

/* ── ACTIVE NAV LINK ── */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if(window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? 'var(--green)' : '';
  });
});

/* ── FORM ── */
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  const btn = this.querySelector('.form-submit');
  btn.textContent = 'Message envoyé ✓';
  btn.style.background = 'var(--green2)';
  setTimeout(() => {
    btn.textContent = 'Envoyer le message →';
    btn.style.background = 'var(--green)';
    this.reset();
  }, 3000);
});

/* ── TYPED EFFECT hero-role ── */
const roles  = ['Développeur Full Stack','Génie Logiciel & SI','Passionné de Tech'];
let ri = 0, ci = 0, del = false;
const roleEl = document.querySelector('.hero-role');
function typeRole(){
  const r = roles[ri];
  if(!del){
    roleEl.textContent = r.slice(0, ++ci);
    if(ci === r.length){ del = true; setTimeout(typeRole, 1800); return; }
  } else {
    roleEl.textContent = r.slice(0, --ci);
    if(ci === 0){ del = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(typeRole, del ? 45 : 80);
}
setTimeout(typeRole, 1200);

/* ── SKILL TAG HOVER ── */
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', () => {
    tag.style.transform = 'translateY(-2px) scale(1.05)';
  });
  tag.addEventListener('mouseleave', () => {
    tag.style.transform = '';
  });
});

/* ── COUNTER ANIMATION ── */
function animateCounter(el, target){
  let current = 0;
  const step  = target / 40;
  const timer = setInterval(() => {
    current += step;
    if(current >= target){
      el.textContent = target + '+';
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current) + '+';
    }
  }, 40);
}
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      document.querySelectorAll('.stat-num').forEach(el => {
        const v = parseInt(el.textContent);
        if(!isNaN(v)) animateCounter(el, v);
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: .5 });
const heroStats = document.querySelector('.hero-stats');
if(heroStats) statsObserver.observe(heroStats);