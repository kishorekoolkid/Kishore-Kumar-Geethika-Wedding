/* Loads each page from its own HTML file. Serve using a local HTTP server or GitHub Pages. */
window.weddingReady = (async function () {
  const names = ['welcome', 'invitation', 'events', 'journey', 'venue', 'live'];
  const main = document.getElementById('main');
  try {
    const sections = await Promise.all(names.map(async name => {
      const response = await fetch(`pages/${name}.html`);
      if (!response.ok) throw new Error(`${name}.html: HTTP ${response.status}`);
      return response.text();
    }));
    main.innerHTML = sections.join('\n');
    applyWeddingDetails();
    window.setupEvents(); window.setupGallery(); window.setupLivestream();
    setupSectionTransitions(main);
    document.addEventListener('click', showGoldenGlitter);
    if (location.hash) requestAnimationFrame(() => document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView());
  } catch (error) {
    main.innerHTML = '<div class="loading-message"><h2>Unable to load invitation pages</h2><p>Run the included preview server (see README.md) or deploy to GitHub Pages. Opening index.html directly with file:// does not support HTML fragments in most browsers.</p></div>';
    console.error('Website load failed:', error);
  }
})();
function showGoldenGlitter() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const shower = document.createElement('div');
  shower.className = 'glitter-shower';
  shower.setAttribute('aria-hidden', 'true');
  if (typeof shower.showPopover === 'function') shower.popover = 'manual';
  for (let index = 0; index < 96; index++) {
    const sparkle = document.createElement('span');
    sparkle.className = 'glitter-sparkle';
    sparkle.style.setProperty('--left', `${Math.random() * 100}%`);
    sparkle.style.setProperty('--size', `${5 + Math.random() * 8}px`);
    sparkle.style.setProperty('--drift', `${Math.random() * 100 - 50}px`);
    sparkle.style.setProperty('--duration', `${1500 + Math.random() * 700}ms`);
    sparkle.style.setProperty('--delay', `${Math.random() * 300}ms`);
    shower.append(sparkle);
  }
  document.body.append(shower);
  shower.showPopover?.();
  setTimeout(() => shower.remove(), 2550);
}

function setupSectionTransitions(main) {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      entry.target.classList.toggle('section-entering', entry.isIntersecting);
    }
  }, { rootMargin: '-24px 0px' });

  main.querySelectorAll('.section').forEach(section => observer.observe(section));
}

function applyWeddingDetails() {
  const c = window.WEDDING_CONFIG, w = c.wedding;
  const text = (selector, value) => { document.querySelectorAll(selector).forEach(el => el.textContent = value) };
  text('.brand b', `${c.couple.bride} & ${c.couple.groom}`);
  text('#welcomeBride', c.couple.bride);
  text('#welcomeGroom', c.couple.groom);
  text('#invitation .couple', `${c.couple.bride} & ${c.couple.groom}`);
  text('#welcome .date', w.dateLabel.toUpperCase());
  const ceremony = document.querySelector('#invitation .ceremony');
  if (ceremony) ceremony.innerHTML = `${escapeHTML(w.dateLabel)}<br><strong>${escapeHTML(w.time)}</strong>`;
  const ceremonyVenue = document.querySelectorAll('#invitation .ceremony')[1];
  if (ceremonyVenue) ceremonyVenue.textContent = `${w.venue} · Rajahmundry`;
  const venue = document.querySelector('#venue h3'); if (venue) venue.textContent = w.venue;
  const venueParas = document.querySelectorAll('#venue .extra-frame > p');
  if (venueParas[1]) venueParas[1].textContent = w.address;
  if (venueParas[2]) venueParas[2].innerHTML = `<strong>${escapeHTML(w.dateLabel)}</strong><br>Wedding ceremony · ${escapeHTML(w.time)}<br>Lunch · ${escapeHTML(w.lunch)}`;
  const maps = document.querySelector('#venue a[target="_blank"]'); if (maps) maps.href = w.mapsURL;
  const liveDate = document.querySelector('#live .extra-frame > p strong'); if (liveDate) liveDate.textContent = `${w.dateLabel} · ${w.time}`;
  const liveCouple = document.querySelector('#live .extra-frame > p:not(.section-kicker):not(.note)'); if (liveCouple) liveCouple.textContent = `${c.couple.bride} & ${c.couple.groom}`;
}
function escapeHTML(value) { return String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
