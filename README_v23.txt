v23 FIXES from your screenshot:
- Fixed blank grey cards: now inline SVG data URI (always loads) - shows number in green circle, no external picsum
- Fixed double numbering: was #2 - 7. Whaleback, now #2 Whaleback (route order only)
- Fixed list: now shows clearance, zone, lat/lng, miles to next, vessel badge, and count badge top right
- Added routeInfo: bottom left map shows stops + miles + vessel
- Walk now correctly shows 18 stops (was showing cut off at 16 in screenshot because container height)
- Markers numbered by shortest route order (1,2,3...) not original id
- All pins corrected: 43.701741,-71.45479 etc
- Shortest routing: nearest-neighbor + 2-opt (80 iter) for true shortest distance

Deploy: unzip -o 23.zip in winnipesaukee_deploy, git add ., commit -m "v23 fix cards", push
