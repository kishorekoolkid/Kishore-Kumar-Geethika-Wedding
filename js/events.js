/* Event navigation, dynamic subpages, and the horizontal event menu. */
window.setupEvents = function () {
  const c = WEDDING_CONFIG, detail = document.getElementById('detail'), content = document.getElementById('detailContent'), nav = document.getElementById('eventNav');
  function showEvent(key) {
    const e = c.events[key]; if (!e) return;
    detail.hidden = false;
    nav.innerHTML = Object.entries(c.events).map(([id, item]) => `<button type="button" data-switch="${id}" class="${id === key ? 'active' : ''}">${escapeHTML(item.name)}</button>`).join('');
    const when = key === 'wedding' || key === 'live' ? `${c.wedding.dateLabel} · ${c.wedding.time}` : e.when;
    const where = key === 'wedding' ? `${c.wedding.venue}, ${c.wedding.address}` : key === 'live' ? 'YouTube Live' : e.venue;
    let extra = '';
    if (key === 'wedding') extra = `<p>Lunch: ${escapeHTML(c.wedding.lunch)}</p><a class="btn" target="_blank" rel="noopener noreferrer" href="${escapeHTML(c.wedding.mapsURL)}">View Venue on Map ↗</a>`;
    /*if (key === 'live') extra = c.livestream.youtubeURL ? `<a class="btn" href="${escapeHTML(c.livestream.youtubeURL)}" target="_blank" rel="noopener noreferrer">Open YouTube Live ↗</a>` : '<p class="note">The livestream link will appear when you add it in js/config.js.</p>';*/
    if (['mehendi', 'sangeet', 'reception'].includes(key) && /to be announced/i.test(when)) extra = '<p class="note">Event details will be announced soon.</p>';
    content.innerHTML = `<div class="detail-icon">${escapeHTML(e.icon)}</div><h2>${escapeHTML(e.name)}</h2><div class="divider">──── ✦ ────</div><p>${escapeHTML(e.description)}</p><p><strong>When:</strong> ${escapeHTML(when)}</p><p><strong>Where:</strong> ${escapeHTML(where)}</p>${extra}`;
    detail.scrollIntoView({ behavior: 'smooth' });
  }
  document.getElementById('eventList').addEventListener('click', e => { const button = e.target.closest('[data-event]'); if (button) showEvent(button.dataset.event) });
  nav.addEventListener('click', e => { const button = e.target.closest('[data-switch]'); if (button) showEvent(button.dataset.switch) });
  document.getElementById('backToEvents').addEventListener('click', () => { detail.hidden = true; document.getElementById('events').scrollIntoView({ behavior: 'smooth' }) });
};
