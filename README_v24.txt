25.zip - v24 Car Roads + Water Routes + Lake Level

NEW LOGIC:
- Car (🚗 Car 6 Road): Follows ROADS not water. Uses OSRM (https://router.project-osrm.org) for true road routing:
  * Table API gets road distance matrix for all car bridges
  * TSP (nearest neighbor + 2-opt) uses ROAD miles, not straight line
  * Each leg drawn via OSRM road geometry (orange line)
  * Car cannot go on water - follows NH 11, NH 28, etc around lake

- Watercraft (PWC, Small Boat, Kayak, Walk): Stays ON WATER not over land:
  * Defines LAKE_WATER_POLYGON (approx Winnipesaukee water area)
  * isWaterRouteValid(a,b) checks if midpoint is in water polygon
  * getWaterDistance(a,b) = haversine(a,b) if valid, else via LAKE_CENTER (43.60,-71.38)
  * Shortest route uses water-aware distance (via center if needed)
  * Drawn as blue line staying on water, routed via center when direct would cross land

- Lake Level feature ADDED BACK:
  * Slider 502.0 to 506.0 ft, default 504.32 full
  * Adj = Base + (504.32 - lakeLevel) - low water = more clearance
  * For watercraft: filters by clearance (pass >= comfortable, marginal >= marginal if checkbox checked)
  * For car/walk/all: clearance ignored (always pass)

Pins corrected as before.

Deploy: unzip -o 25.zip in winnipesaukee_deploy, git add ., commit, push
