/* Wedding countdown and YouTube Live player. */
window.setupLivestream = function () {
    const c = WEDDING_CONFIG, date = new Date(c.livestream.startISO || c.wedding.dateISO);
    const countdown = document.getElementById('countdown');
    function tick() {
        const ms = date - Date.now(); if (ms <= 0) { countdown.textContent = 'Our wedding day is here!'; return; }
        const units = [[Math.floor(ms / 86400000), 'Days'], [Math.floor(ms / 3600000) % 24, 'Hours'], [Math.floor(ms / 60000) % 60, 'Minutes'], [Math.floor(ms / 1000) % 60, 'Seconds']];
        countdown.innerHTML = units.map(([v, label]) => `<span><b>${String(v).padStart(2, '0')}</b><small>${label}</small></span>`).join('');
    }
    tick(); setInterval(tick, 1000);
    const { youtubeURL } = c.livestream;
    if (!youtubeURL) return;

    const videoId = youtubeURL.match(/^https?:\/\/(?:(?:www\.|m\.)?youtube\.com\/(?:live\/|embed\/|watch\?(?:[^#]*&)?v=)|youtu\.be\/)([\w-]{11})(?=[?&#/]|$)/i)?.[1];
    if (videoId) {
        const player = document.createElement('iframe');
        player.className = 'live-player';
        player.title = 'Wedding livestream on YouTube';
        player.src = `https://www.youtube.com/embed/${videoId}?playsinline=1`;
        player.loading = 'lazy';
        player.referrerPolicy = 'strict-origin-when-cross-origin';
        player.allow = 'encrypted-media; picture-in-picture; fullscreen';
        player.allowFullscreen = true;
        document.getElementById('liveIllustration').replaceWith(player);
    }

    const link = document.createElement('a');
    link.className = 'btn';
    link.href = youtubeURL;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = '▶ Watch on YouTube';
    document.getElementById('liveAction').append(link);
    document.getElementById('liveStatus').textContent = 'Watch our wedding ceremony on YouTube.';
};
