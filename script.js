/* EDIT THESE SETTINGS BEFORE PUBLISHING. Never put a stream key here. */
const SETTINGS = {
  youtubeWatchUrl: "", // Paste public scheduled livestream URL: https://youtube.com/live/VIDEO_ID
  eventStatus: "waiting", // "waiting" | "live" | "replay" (manual; no automatic detection)
  weddingDateTime: "2026-12-21T09:00:00+05:30"
};

const countdown = document.getElementById("countdown");
const status = document.getElementById("status");
const watchButton = document.getElementById("watch-button");
const target = new Date(SETTINGS.weddingDateTime).getTime();
const validWatchUrl = (() => {
  try {
    const url = new URL(SETTINGS.youtubeWatchUrl);
    return url.protocol === "https:" && ["youtube.com", "www.youtube.com", "youtu.be", "www.youtu.be", "m.youtube.com"].includes(url.hostname);
  } catch { return false; }
})();

function updateCountdown() {
  const left = Math.max(0, target - Date.now());
  const values = [Math.floor(left / 86400000), Math.floor(left / 3600000) % 24, Math.floor(left / 60000) % 60, Math.floor(left / 1000) % 60];
  ["days", "hours", "minutes", "seconds"].forEach((id, i) => {
    document.getElementById(id).textContent = String(values[i]).padStart(2, "0");
  });
  const state = SETTINGS.eventStatus;
  const isLive = state === "live";
  const isReplay = state === "replay";
  countdown.hidden = isLive || isReplay || left === 0;
  watchButton.hidden = !(validWatchUrl && (isLive || isReplay));
  if (validWatchUrl) watchButton.href = SETTINGS.youtubeWatchUrl;
  if (isLive) {
    status.textContent = "🔴 We are LIVE! Join our celebration.";
    watchButton.textContent = "▶ Watch Wedding LIVE";
  } else if (isReplay) {
    status.textContent = "Thank you for celebrating with us! ❤️";
    watchButton.textContent = "▶ Watch Wedding Recording";
  } else if (left === 0) {
    status.textContent = "Our wedding ceremony will begin shortly. Stay tuned!";
  } else {
    status.textContent = "Counting down to our special day";
  }
}
updateCountdown();
setInterval(updateCountdown, 1000);
