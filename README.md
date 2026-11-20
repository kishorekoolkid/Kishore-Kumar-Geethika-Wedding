# Geethika & Kishore Kumar — Modular Wedding Website

## Edit without touching index.html

| What to change | Edit this file |
|---|---|
| Names, dates, wedding venue, Google Maps URL, event schedules | `js/config.js` |
| YouTube Live watch URL and countdown start | `js/config.js` |
| Gallery photos and captions | `js/config.js` and `assets/gallery/` |
| Welcome design/text | `pages/welcome.html` |
| Invitation design/text | `pages/invitation.html` |
| Event list layout | `pages/events.html` |
| Event subpage layout | `pages/detail.html` and `js/events.js` |
| Our Journey layout | `pages/journey.html` |
| Venue layout | `pages/venue.html` |
| Livestream layout | `pages/live.html` |
| Colors, fonts, spacing | `css/style.css` |
| Animations | `css/animations.css` |
| Mobile overrides | `css/responsive.css` |

### Local preview — important

This modular website loads HTML fragments using `fetch()`. **Do not double-click `index.html`**; browsers usually block local `file://` fetch requests.

In VS Code, install the **Live Server** extension, right-click `index.html` and choose **Open with Live Server**.

Or, with Python installed, open a terminal in this project folder and run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000/`.

### Deploy to GitHub Pages

Copy the *contents* of this folder (including `pages`, `js`, `css`, and `assets`) to the root of your existing GitHub Pages repository. Back up the old site first. The relative paths work with a GitHub Pages project URL. GitHub Pages serves the fragments without a build step.

### Updating gallery

Copy your photos to `assets/gallery/`. In `js/config.js` replace the example gallery entries, e.g.:

```js
{image:'assets/gallery/our-photo.jpg', caption:'Our first adventure'}
```

### Important

- Mehendi, Sangeet, and Reception details are intentionally unconfirmed placeholders.
- Add the actual public YouTube watch URL to `livestream.youtubeURL` when known.
- Do not place private credentials or stream keys in the website.
- The Google Maps link is a search link, not a verified venue pin.
- External Google Fonts require internet access; fallback fonts are provided.
