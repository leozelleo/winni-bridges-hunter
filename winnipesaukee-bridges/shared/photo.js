// Photo handling.
//
// IMPORTANT: this deliberately never embeds photos as base64 in the page.
// A single base64 photo can be 1-5MB of text; twenty of them inline in the
// HTML is what made the browser hang on load. Instead:
//
//   1. Real photos, if you have them, go in /images/bridge-<id>.jpg
//      (any of .jpg/.jpeg/.png/.webp — see images/README.md).
//   2. The <img> lazy-loads that file like a normal web image.
//   3. If the file doesn't exist (404), onerror swaps in a tiny (~300 byte)
//      generated SVG icon — no network cost, no giant string in the page.

const ZONE_COLORS = {
  'Center Harbor': '#2563eb',
  'Suissevale': '#7c3aed',
  'Moultonborough': '#059669',
  'Broads': '#0891b2',
  'Alton Bay': '#dc2626',
};

function fallbackIconDataUrl(bridge) {
  const color = ZONE_COLORS[bridge.zone] || '#334155';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
    <rect width="100" height="100" fill="${color}"/>
    <path d="M0 62 Q25 48 50 62 T100 62 V100 H0 Z" fill="rgba(255,255,255,.18)"/>
    <text x="50" y="46" font-family="system-ui,sans-serif" font-size="22" font-weight="800"
      fill="white" text-anchor="middle">#${bridge.id}</text>
  </svg>`;
  return 'data:image/svg+xml;base64,' + btoa(svg);
}

function photoImgTag(bridge, className) {
  const real = `images/bridge-${bridge.id}.jpg`;
  const fallback = fallbackIconDataUrl(bridge);
  return `<img src="${real}" loading="lazy" decoding="async" class="${className}"
    onerror="this.onerror=null;this.src='${fallback}'" alt="${bridge.name}">`;
}
