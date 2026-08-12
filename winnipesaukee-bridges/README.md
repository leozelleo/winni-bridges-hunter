# Winnipesaukee 20 Bridges

Three pages, one shared dataset:

- **index.html** — All 20 bridges, filter by vessel, shortest route + GPX export.
- **route.html** — Same, plus a manual lake-level slider (now actually wired up).
- **live.html** — Same, plus a live lake-level reading pulled from the USGS
  gauge at Weirs Beach (site 01080000), with the slider as a manual override
  if the live fetch fails or you want to test a different level.

```
index.html
route.html
live.html
shared/
  data.js      – the 20 bridges (id, lat/lng, clearance, zone, per-vessel pass/fail)
  routing.js   – haversine distance + nearest-neighbor/2-opt shortest-route solver
  status.js    – vessel clearance vs. lake-level pass/marginal/fail logic
  photo.js     – lazy-loaded photo <img> with a generated fallback icon
images/
  README.md    – how to add real bridge photos
```

## What changed from the version you sent

**Bugs fixed:**
- The "LIVE" page was a byte-for-byte copy of the route page — it never
  actually fetched live data. It now pulls from USGS gauge 01080000 on load
  and on demand (Refresh button), with a visible timestamp and a clear
  fallback message if the fetch fails.
- The lake-level slider on the route/live pages rendered but had no event
  listener — moving it did nothing. It's wired up now and drives the
  pass/marginal/fail status live.
- Selecting "Car" or "Walk" on the route/live pages threw a JS error (the
  clearance-vs-level math only had rules for pwc/smallboat/kayak) and broke
  the whole list. Car and pedestrian crossings are correctly treated as
  level-independent now.
- A hardcoded special case colored bridge #7 purple for no documented
  reason; removed.

**Photos:** real photos are supported (see `images/README.md`) via normal
external image files, lazy-loaded, with a small generated fallback icon —
not inlined as base64, which is what made the browser hang before.

**Design & mobile:** shared navy/lake-blue palette across all three pages
with a nav bar between them, larger touch targets, a bottom-sheet detail
panel on mobile instead of a centered popup, sticky search bar, safe-area
padding for notched phones.

**Code:** the ~500-line bridge dataset and routing math were duplicated
three times across the original files; they're now shared modules included
via `<script src>`, so a data fix or bug fix only needs to happen once.

## Deploying

This is still a static, build-free site — same as before. Push the whole
folder to your GitHub repo and Netlify will serve it as-is; `index.html` is
the entry point.
