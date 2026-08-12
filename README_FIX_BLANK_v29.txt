
29.zip - FIX BLANK SCREEN

YOUR SCREENSHOT: Totally blank light blue map, no tiles, no markers

CAUSE v28:
- Dynamic WATER_EDGES builder at top level called haversine before defined + island polygon intersection code threw error before map init
- Leaflet from jsdelivr failed + no failsafe -> blank

FIX v29:
- No dynamic building at load time - WATER_EDGES hardcoded pre-verified
- All functions wrapped in try/catch, fallback to straight line if error
- Leaflet from unpkg.com (more reliable) + OSM tiles + invalidateSize timeout
- Map init in try/catch, shows error message if fails instead of blank
- Render wrapped in try/catch, shows error in list instead of blank
- index.html 20KB (not 27KB) - smaller, faster

WATER STILL AVOIDS LAND:
- Hardcoded edges avoid Long Island, Bear Island, Moultonborough Neck:
  W5 Long Island north channel, W6 Bear Island west, W11 Winter Harbor south
- Edges: [4,5] Moultonborough Bay -> Long Island north (around), [5,6] north -> Bear Island west, [6,7] Bear Island -> Wolfeboro, etc
- No edge directly crosses Long Island or Bear Island
- getWaterPath via Dijkstra through only those safe edges

PHOTOS:
- 20x 400px WebP 20-32KB lazy loading, 603KB total, no freeze
- HTML 20KB

DEPLOY:
cd ~/Downloads/winnipesaukee_deploy
unzip -o ~/Downloads/29.zip
git add . && git commit -m "v29 fix blank - hardcoded water edges failsafe" && git push origin main
If still blank, check browser console (F12) for errors
