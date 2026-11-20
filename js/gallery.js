/* Change photo entries in js/config.js; add files under assets/gallery/. */
window.setupGallery = function () {
 const gallery=document.querySelector('#journey .journey-gallery'); if(!gallery) return;
 gallery.innerHTML=WEDDING_CONFIG.gallery.map(item=>`<div class="photo-slot"><img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.caption)}" loading="lazy"><span>${escapeHTML(item.caption)}</span></div>`).join('');
 const note=document.querySelector('#journey .note'); if(note) note.textContent='Add your own photographs in assets/gallery and update the gallery list in js/config.js.';
};
