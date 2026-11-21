/* Each Journey panel rotates through the photos in its own folder. */
const galleryImageExtension = /\.(avif|bmp|gif|jpe?g|png|svg|webp)$/i;

window.setupGallery = async function () {
    const panels = document.querySelectorAll('#journey [data-photo-folder]');
    if (!panels.length) return;

    // GitHub Pages builds the index with Jekyll. Local preview can list directories.
    const photoIndex = await fetch('assets/journey-photos.json', { cache: 'no-cache' })
        .then(response => response.ok ? response.json() : null)
        .catch(() => null);

    await Promise.all(Array.from(panels, async panel => {
        const folder = panel.dataset.photoFolder;
        const directory = new URL(`assets/${folder}/`, document.baseURI);
        const files = photoIndex?.[folder] ?? await listLocalGalleryPhotos(directory);
        const photos = files
            .filter(file => galleryImageExtension.test(file))
            .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
            .map(file => new URL(encodeURIComponent(file), directory).href);

        if (!photos.length) return;
        const image = panel.querySelector('img');
        image.alt = panel.querySelector('span').textContent;
        image.src = photos[0];

        if (photos.length < 2) return;
        let next = 1;
        setInterval(() => {
            image.src = photos[next];
            next = (next + 1) % photos.length;
        }, 5000);
    }));
};

async function listLocalGalleryPhotos(directory) {
    try {
        const response = await fetch(directory, { cache: 'no-cache' });
        if (!response.ok) return [];

        const listing = new DOMParser().parseFromString(await response.text(), 'text/html');
        const files = new Set();
        for (const link of listing.querySelectorAll('a[href]')) {
            const url = new URL(link.getAttribute('href'), directory);
            if (url.origin !== directory.origin || !url.pathname.startsWith(directory.pathname)) continue;

            const file = decodeURIComponent(url.pathname.slice(directory.pathname.length));
            if (file && !file.includes('/')) files.add(file);
        }
        return Array.from(files);
    } catch {
        return [];
    }
}
