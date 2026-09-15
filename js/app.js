/* SADEEDA & ASHIQUE */
(function () {
  const W = window.WEDDING || {};
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const intro = $('#intro');
  const app = $('#app');
  const audio = $('#bgm');
  const musicBtn = $('#musicBtn');
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
      window.open((W.venue && W.venue.mapsUrl) || el.getAttribute('href'), '_blank', 'noopener');
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
  $$('[data-cal]').forEach(function (el) {
    el.addEventListener('click', function () {
      var ics = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Sadeeda Ashique Wedding//EN',
        'BEGIN:VEVENT',
        'DTSTART;TZID=Asia/Kolkata:20260924T110000',
        'DTEND;TZID=Asia/Kolkata:20260924T150000',
        'SUMMARY:Sadeeda & Ashique Wedding',
        'LOCATION:Crystal Plaza, Melangadi, Kalpakanchery',
        'DESCRIPTION:Wedding ceremony of Sadeeda and Ashique',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');
      var blob = new Blob([ics], { type: 'text/calendar' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'sadeeda-ashique-wedding.ics';
      a.click();
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
})();
