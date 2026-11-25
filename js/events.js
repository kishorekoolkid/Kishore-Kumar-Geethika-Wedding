/* Event photo panels and schedule details. */
window.setupEvents = function () {
    const { events, reception } = WEDDING_CONFIG;
    const cards = [
        { folder: 'mehandi', ...events.mehendi },
        { folder: 'sangeeth', ...events.sangeet },
        {
            folder: 'reception',
            name: events.reception.name,
            when: `${reception.dateLabel} · ${reception.time}`,
            venue: `${reception.venue}, ${reception.address}`
        }
    ];

    document.getElementById('eventGallery').innerHTML = cards.map(({ folder, name, when, venue }) => `
        <article class="event-card">
            <h3>${escapeHTML(name)}</h3>
            <div class="photo-slot" data-photo-folder="${folder}" data-photo-alt="${escapeHTML(name)}">
                <img alt="" />
                <div class="event-photo-placeholder">Photos coming soon</div>
            </div>
            <p><strong>When</strong><br />${escapeHTML(when)}</p>
            <p><strong>Venue</strong><br />${escapeHTML(venue)}</p>
        </article>
    `).join('');
};
