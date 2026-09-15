/* SADEEDA & ASHIQUE */
(function () {
  const A = window.INV_ASSETS || {};
  document.querySelectorAll('.intro-seal img, .close-seal img').forEach(function (img) {
    if (A.seal) img.src = A.seal;
  });
  document.querySelectorAll('[data-full]').forEach(function (btn, i) {
    var key = ['g1', 'g2', 'g3'][i];
    if (A[key]) {
      var im = btn.querySelector('img');
      if (im) im.src = A[key];
      btn.setAttribute('data-full', A[key]);
    }
  });
  if (A.velvet) document.documentElement.style.setProperty('--velvet-img', 'url("' + A.velvet + '")');
  if (A.paper) document.documentElement.style.setProperty('--paper-img', 'url("' + A.paper + '")');

  const W = window.WEDDING || {};
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const intro = $('#intro');
  const app = $('#app');
  const audio = $('#bgm');
  const musicBtn = $('#musicBtn');
  const dock = $('#dock');
  const lightbox = $('#lightbox');
  const lightImg = $('#lightboxImg');

  const target = new Date(W.startISO || '2026-09-24T11:00:00+05:30').getTime();
  function pad(n) { return String(n).padStart(2, '0'); }
  function tick() {
    let diff = target - Date.now();
    if (diff <= 0) { const d = $('#cdDone'); if (d) d.classList.add('is-on'); return; }
    const days = Math.floor(diff / 86400000); diff -= days * 86400000;
    const h = Math.floor(diff / 3600000); diff -= h * 3600000;
    const m = Math.floor(diff / 60000); diff -= m * 60000;
    const s = Math.floor(diff / 1000);
    if ($('#cdDays')) $('#cdDays').textContent = pad(days);
    if ($('#cdHours')) $('#cdHours').textContent = pad(h);
    if ($('#cdMins')) $('#cdMins').textContent = pad(m);
    if ($('#cdSecs')) $('#cdSecs').textContent = pad(s);
  }
  tick(); setInterval(tick, 1000);

  let opened = false;
  function openInvitation() {
    if (opened || !intro) return;
    opened = true;
    intro.classList.add('is-opening');
    document.body.classList.remove('is-locked');
    document.body.classList.add('is-open');
    setTimeout(function () {
      intro.classList.add('is-open');
      if (app) app.classList.add('is-revealed');
      if (audio) { audio.volume = 0.16; audio.play && audio.play().catch(function () {}); }
    }, 720);
    setTimeout(function () { intro.style.display = 'none'; }, 1850);
  }
  if (intro) {
    intro.addEventListener('click', openInvitation);
    intro.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openInvitation(); }
    });
  }
  if (musicBtn && audio) {
    musicBtn.addEventListener('click', function () {
      if (audio.paused) audio.play().catch(function () {});
      else audio.pause();
    });
  }
  $$('[data-maps]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      window.open((W.venue && W.venue.mapsUrl) || el.href, '_blank', 'noopener');
    });
  });
  $$('[data-rsvp]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      var num = String(W.whatsappNumber || '919526677126').replace(/[^\d]/g, '');
      var msg = encodeURIComponent(W.rsvpMessage || 'Assalamu Alaikum, I would like to confirm my presence for Sadeeda & Ashique wedding.');
      window.open('https://wa.me/' + num + '?text=' + msg, '_blank', 'noopener');
    });
  });
  $$('[data-full]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!lightbox || !lightImg) return;
      lightImg.src = btn.getAttribute('data-full');
      lightbox.classList.add('is-on');
    });
  });
  if (lightbox) lightbox.addEventListener('click', function () { lightbox.classList.remove('is-on'); });
  $$('.reveal').forEach(function (el) { el.classList.add('is-in'); });
})();
