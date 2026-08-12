# Adding real bridge photos

Drop image files in this folder named:

```
images/bridge-1.jpg
images/bridge-2.jpg
...
images/bridge-20.jpg
```

(`.jpg`, `.jpeg`, `.png`, or `.webp` all work — just match the filename to the bridge `id` in `shared/data.js`.)

The site will pick them up automatically — no code changes needed. If a
file is missing for a given bridge, the site falls back to a small
generated icon, so it's fine to add photos gradually.

## Why not embed photos directly in the page (base64)?

That's what caused the earlier version of this site to hang the browser.
Embedding a photo as base64 text inline in the HTML makes it 30-40% larger
than the original file, and the browser has to parse the *entire* multi-MB
HTML document before it can render anything — with 20 photos that's easily
10-50MB of text before the page can even paint.

Keeping photos as normal separate files (as done here) means the browser
renders the page instantly and loads each photo in the background,
only as it scrolls into view (`loading="lazy"`).

## Recommended photo prep

Keep the site fast — for each photo:

- Resize to ~800px on the long edge (they're only ever shown as a small thumbnail)
- Export as JPEG at ~75% quality
- Aim for under 150KB per photo

Any free tool works for this (Preview on Mac, Photos on Windows, or
squoosh.app in a browser).
