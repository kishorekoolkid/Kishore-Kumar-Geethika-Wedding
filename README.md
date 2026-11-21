# Geethika & Kishore Kumar — Modular Wedding Website

## Edit without touching index.html

| What to change | Edit this file |
|---|---|
| Names, dates, wedding venue, Google Maps URL, event schedules | `js/config.js` |
| YouTube Live watch URL and countdown start | `js/config.js` |
| Journey photos | `assets/ourMemories/`, `assets/newBeginning/`, and `assets/foreverTogether/` |
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

Then visit `http://localhost:8000/`. Use the Python server or `preview.bat` to preview the photo loops, which need directory listings when running locally.

### Deploy to GitHub Pages

Copy the *contents* of this folder (including `pages`, `js`, `css`, and `assets`) to the root of your existing GitHub Pages repository. Back up the old site first. Publish from a branch with Jekyll enabled so GitHub Pages generates the gallery photo index on each publish. The relative paths work with a GitHub Pages project URL.

### Updating gallery

Place photos directly in the folder for the panel you want to update.

| Folder | Journey panel |
|---|---|
| `assets/ourMemories/` | Our favourite memories |
| `assets/newBeginning/` | Our beautiful beginning |
| `assets/foreverTogether/` | Forever starts here |

The panels advance together every five seconds. Each panel follows its own filename order and loops back to its first photo. An empty folder shows the original illustration. Supported formats are AVIF, BMP, GIF, JPEG, PNG, SVG, and WebP.

Refresh the local preview to see newly added photos. For the live site, push the photos to the GitHub Pages publishing branch and refresh after GitHub Pages finishes publishing. No code or photo list edits are needed.

### Important

- Mehendi, Sangeet, and Reception details are intentionally unconfirmed placeholders.
- Add the actual public YouTube watch URL to `livestream.youtubeURL` when known.
- Do not place private credentials or stream keys in the website.
- The Google Maps link is a search link, not a verified venue pin.
- External Google Fonts require internet access; fallback fonts are provided.
