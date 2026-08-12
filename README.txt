Winnipesaukee 20 Bridges - FIXED - Shortest Route

Files included:
- FINAL_20_Shortest_Fixed.html - All 20 with vessel filters, shortest distance routing
- ROUTE_Vessel_LakeLevel_Shortest_Fixed.html - Route by vessel + lake level slider (shortest)
- LIVE_LakeLevel_Shortest_Fixed.html - Live lake level version

Fixes:
- All 20 pins corrected:
  1: 43.701741,-71.45479 Half Mile
  2: 43.63454,-71.3745 Birch/Steamboat
  3: 43.72306,-71.36889 Suissevale
  5: 43.683968,-71.421184 Black Cat
  6: 43.67367,-71.43716 Beaver
  7: 43.72255,-71.3856 Whaleback
  8: 43.67234,-71.42253 Three Mile/Hawks Nest
  9: 43.636744,-71.319237 Hole in Wall
  12: 43.602066,-71.430694 Governors
  19: 43.476389,-71.24 Back Bay
  etc

- Routing: nearestNeighborOrder + 2-opt = shortest distance, not clockwise
- filteredRoute() now returns shortestRoute(filtered) for every vessel
- Clicking PWC/Small Boat/Kayak/All 20 now shows blue polyline with #1, #2... in shortest order + miles to next + total miles

Lightweight versions (15KB) - no huge base64 photos, loads instantly, shows results.
