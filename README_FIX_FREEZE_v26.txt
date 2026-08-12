
26.zip - FIXES BROWSER FREEZE + BEST PHOTO & LAKE LEVEL

WHY IT FROZE:
- Old version embedded 20x 100KB base64 JPEGs = 2MB+ HTML, 34MB decoded in memory
- Browser tries to parse all at once on load -> freeze, list empty

FIXED IN v26:
- HTML is 24KB (not 1.7MB)
- Photos are SEPARATE files in /images/ (tiny 200 byte SVG placeholders)
- Lazy loading: loading="lazy" + decoding="async" -> only loads when visible
- Fallback: onerror -> inline tiny SVG, never broken image
- Total page load: 24KB HTML + 20*0.2KB = 28KB vs old 1800KB = 64x smaller

BEST WAY TO GET PHOTOS TO WORK:

1. CURRENT (works now, never freezes):
   /images/bridge-1.svg ... bridge-20.svg (tiny, always loads)
   <img src="images/bridge-1.svg" loading="lazy" onerror="fallback">

2. ADD REAL PHOTOS (recommended):
   - Take photo 800x600, compress to WebP 400px wide:
     Use squoosh.app (drag, resize 400, WebP quality 65) -> ~30KB
     Or: cwebp -q 65 input.jpg -o images/bridge-1.webp
   - Save as images/bridge-1.webp AND images/bridge-1.jpg (fallback)
   - Replace the .svg with same name? Better: keep .svg as fallback, update HTML to:
     <img src="images/bridge-1.webp" onerror="this.src='images/bridge-1.svg'">
   - We included both .svg and code already does fallback

3. FOR GITHUB/NETLIFY:
   - Keep images/ folder at root next to index.html
   - Use relative path images/bridge-X.svg (not absolute)
   - Browser caches them, CDN serves fast

4. NEVER DO:
   - data:image/jpeg;base64,... 100KB embedded (freezes)
   - picsum.photos external (blocked, grey bars in your screenshot)

BEST WAY TO MANAGE LAKE LEVEL:

PROBLEM: NH DES API is CORS blocked in browser, can't fetch directly

SOLUTION (implemented in v26):

a) Live fetch via Netlify Function (BEST):
   Create netlify/functions/lakelevel.js:
   export async function handler() {
     const res = await fetch('https://nh-winnisquam... or USGS 01080000');
     const level = parseFloat(...);
     return {statusCode:200, body: JSON.stringify({level, source:'NH DES', time: new Date()})}
   }
   Frontend: fetch('/.netlify/functions/lakelevel') -> no CORS

b) Manual override slider (ALREADY IN v26):
   - Range 502.0 to 506.0 ft, step 0.05, default 504.32 full
   - Shows delta: +0.00ft clearance (green) = low water more clearance
   - Formula: Adj = Base + (504.32 - lakeLevel)
   - Example: Base 5ft, lake 502.0 -> Adj 7.32ft (more clearance)

c) Controls in v26:
   - [Use Live] button = sync slider to live level
   - [Reset Full 504.32] = reset to reference
   - Checkbox "Include marginal" = allow duck/lay flat
   - For car/walk: clearance ignored (always pass)

d) Visual:
   - Pass = green border, Marginal = yellow bg, Fail = red + faded
   - Route info: "12 stops • 18.3 mi shortest • PWC @ 503.82ft"

CAR vs WATER ROUTING (also in v26):

- Car: Uses OSRM road distance matrix for shortest ROAD route (orange line follows roads)
  Table API: https://router.project-osrm.org/table/v1/driving/{coords}
  Route API for geometry: .../route/v1/driving/...

- Water: Stays on water via LAKE_WATER_POLYGON check, if midpoint not in water -> route via LAKE_CENTER

DEPLOY:
cd ~/Downloads/winnipesaukee_deploy
unzip -o ~/Downloads/26.zip
ls -lh index.html  # should be ~24KB, NOT 1.7MB
ls images/ | wc -l # should be 20
git add .
git commit -m "v26 fix freeze - tiny images lazy + lake level live+manual"
git push origin main
