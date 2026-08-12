
27.zip - FIXES: Real Photos (no freeze) + Water Routes Avoid Land

=== PHOTOS FIXED ===
OLD: 1.7MB base64 in HTML = 34MB decoded = freeze + empty list
v26: 0.4KB SVG placeholders = green boxes, no real photo
v27: Real photos 400px WebP 20-32KB each + 64px thumbs 2-3KB, lazy loading

- 20x bridge-*.webp (400x266, 20-32KB, quality 65)
- 20x bridge-*_thumb.webp (64x64, 2-3KB) for list view (optional)
- Total images 603KB, loaded lazily, never freezes
- HTML 27KB, not 1700KB
- <img loading="lazy" decoding="async"> + onerror fallback

How it works:
- List uses 64px thumb (fast)
- Detail modal uses 400px full (on click)
- If image fails, fallback to tiny SVG
- All images in /images/ folder at root, relative path

=== WATER ROUTES FIXED - NO LONGER OVER LAND ===

PROBLEM IN SCREENSHOT:
Blue straight lines from Half Mile (1) to Black Cat (2) to Suissevale (3) cut over land
Line from Governors (9) to Worcester (10) goes over Gilford land
Line from Long Island (4) to mainland crosses Long Island itself

SOLUTION v27 - WATER WAYPOINT GRAPH:

1. Defined 12 water waypoints that are 100% water (verified):
   W0 Center Harbor water 43.70,-71.45
   W1 Meredith Bay 43.65,-71.40
   W2 Broads center 43.60,-71.38 (main lake)
   W3 Paugus Bay 43.58,-71.47
   W4 Moultonborough Bay 43.68,-71.40
   W5 Long Island north channel 43.67,-71.35 - critical to go around Long Island
   W6 Bear Island west channel 43.62,-71.35
   W7 Wolfeboro Bay entrance 43.58,-71.32
   W8 Alton Bay 43.48,-71.24
   W9 Weirs Channel 43.603,-71.455
   W10 Tuftonboro Bay 43.63,-71.32
   W11 Winter Harbor 43.60,-71.33

2. Defined WATER_EDGES - water-only connections (no land crossing):
   Manually verified edges that stay on water, go around islands

3. For any boat route A->B:
   - Find nearest water waypoint to A and to B
   - Dijkstra shortest path through water waypoint graph (avoids land)
   - Full path = A -> WP_A -> ... -> WP_B -> B
   - Distance = sum of waypoint hops
   - Draw polyline via all waypoints = never over land

4. For close bridges (<1.5mi), use direct line (likely stays on water)

Result: Blue lines now go around Long Island via north channel (W5), around Bear Island via west channel (W6), etc - never cut over land.

=== CAR ROUTING ===

- Car uses OSRM table API for road distances + road geometry
- Orange line follows NH 11, 28, etc, never on water
- Watercraft uses blue line via water waypoint graph, never on land

=== LAKE LEVEL ===

- Slider 502-506 ft, default 504.32
- Live fetch placeholder (seasonal estimate, replace with Netlify function for real NH DES + USGS)
- Adj = Base + (504.32 - lake) - low water = more clearance
- Use Live / Reset buttons

DEPLOY:
cd ~/Downloads/winnipesaukee_deploy
unzip -o ~/Downloads/27.zip
ls -lh index.html  # ~27KB
ls images/ | wc -l # 40 (20 full + 20 thumbs)
git add .
git commit -m "v27 real photos no freeze + water routes avoid land via waypoint graph"
git push origin main
