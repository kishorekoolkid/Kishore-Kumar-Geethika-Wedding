/* Loads each page from its own HTML file. Serve using a local HTTP server or GitHub Pages. */
window.weddingReady = (async function () {
  const names = ['welcome', 'invitation', 'events', 'detail', 'journey', 'venue', 'live'];
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
    if (location.hash) requestAnimationFrame(() => document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView());
  } catch (error) {
    main.innerHTML = '<div class="loading-message"><h2>Unable to load invitation pages</h2><p>Run the included preview server (see README.md) or deploy to GitHub Pages. Opening index.html directly with file:// does not support HTML fragments in most browsers.</p></div>';
    console.error('Website load failed:', error);
  }
})();
function applyWeddingDetails() {
  const c = window.WEDDING_CONFIG, w = c.wedding;
  const text = (selector, value) => { document.querySelectorAll(selector).forEach(el => el.textContent = value) };
  text('.brand b', `${c.couple.bride} & ${c.couple.groom}`);
  text('#welcome h1', `${c.couple.bride} & ${c.couple.groom}`);
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
  const eventList = document.getElementById('eventList');
  if (eventList) eventList.innerHTML = Object.entries(c.events).map(([key, e]) => `<button type="button" data-event="${key}"><span class="event-icon">${escapeHTML(e.icon)}</span><span><b>${escapeHTML(e.name)}</b><small>${escapeHTML(key === 'wedding' || key === 'live' ? `${w.dateLabel} · ${w.time}` : e.when)}</small></span><span class="arrow">›</span></button>`).join('');
}
function escapeHTML(value) { return String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
