/* Each photo panel rotates through the photos in its own folder. */
const galleryImageExtension = /\.(avif|bmp|gif|jpe?g|png|svg|webp)$/i;

window.setupGallery = async function () {
    const panels = document.querySelectorAll('[data-photo-folder]');
    if (!panels.length) return;

    // GitHub Pages builds the index with Jekyll. Local preview can list directories.
    const photoIndex = await fetch('assets/journey-photos.json', { cache: 'no-cache' })
        .then(response => response.ok ? response.json() : null)
        .catch(() => null);

    const galleries = await Promise.all(Array.from(panels, async panel => {
        const folder = panel.dataset.photoFolder;
        const directory = new URL(`assets/${folder}/`, document.baseURI);
        const files = photoIndex?.[folder] ?? await listLocalGalleryPhotos(directory);
        const photos = files
            .filter(file => galleryImageExtension.test(file))
            .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
            .map(file => new URL(encodeURIComponent(file), directory).href);

        return { panel, photos, image: panel.querySelector('img'), index: 0 };
    }));

    await showGalleryPhotos(galleries.filter(gallery => gallery.photos.length));
    const rotating = galleries.filter(gallery => gallery.photos.length > 1);
    if (!rotating.length) return;

    while (true) {
        for (const gallery of rotating) {
            gallery.index = (gallery.index + 1) % gallery.photos.length;
        }
        await showGalleryPhotos(rotating, 5000);
    }
};

async function showGalleryPhotos(galleries, delay = 0) {
    const nextPhotos = galleries.map(async ({ panel, photos, image, index }) => {
        const next = image.cloneNode(false);
        next.alt = panel.dataset.photoAlt ?? panel.querySelector('span').textContent;
        next.src = photos[index];
        return next.decode().then(() => next, () => null);
    });
    const [, ...ready] = await Promise.all([
        delay && new Promise(resolve => setTimeout(resolve, delay)),
        ...nextPhotos
    ]);
    galleries.forEach((gallery, index) => {
        const image = ready[index];
        if (!image) return;
        gallery.image.replaceWith(image);
        gallery.image = image;
    });
}

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
