/* Wedding countdown and optional YouTube Live button. */
window.setupLivestream = function () {
 const c=WEDDING_CONFIG, date=new Date(c.livestream.startISO || c.wedding.dateISO);
 const countdown=document.getElementById('countdown');
 function tick(){const ms=date-Date.now();if(ms<=0){countdown.textContent='Our wedding day is here!';return;}
 const units=[[Math.floor(ms/86400000),'Days'],[Math.floor(ms/3600000)%24,'Hours'],[Math.floor(ms/60000)%60,'Minutes'],[Math.floor(ms/1000)%60,'Seconds']];
 countdown.innerHTML=units.map(([v,label])=>`<span><b>${String(v).padStart(2,'0')}</b><small>${label}</small></span>`).join('');}
 tick();setInterval(tick,1000);
 if(c.livestream.youtubeURL){const a=document.createElement('a');a.className='btn';a.href=c.livestream.youtubeURL;a.target='_blank';a.rel='noopener noreferrer';a.textContent='▶ Watch on YouTube';document.getElementById('liveAction').append(a);document.getElementById('liveStatus').textContent='Watch our wedding ceremony on YouTube.';}
};
