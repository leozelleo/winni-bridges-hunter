# Winni-Bridges-Hunter

Live Bizer route planner for Lake Winnipesaukee.

**Stable URL:** https://winni-bridges-hunter.vercel.app

## Features
- Map of Winnipesaukee bridges (Weirs Channel, Governor's Island, Long Island, etc.)
- Live lake level from USGS 01080000 LAKE WINNIPESAUKEE AT WEIRS BEACH, NH
  - Official gauge at Endicott Park per NH RSA 482:84
  - Lake level = gage height + 500ft datum
  - Full Pool = 504.32 ft
- Bizer clearance: Clearance = BaseClearance - (CurrentLevel - FullPool)
- Bizer route check for your boat air draft

## API
GET /api/lakelevel
Returns:
{
  "level": 503.38,
  "gageHeight": 3.38,
  "time": "2026-... ",
  "source": "USGS 01080000...",
  "fullPool": 504.32,
  "datumNote": "Lake level = gage height + 500ft datum",
  "live": true
}

## Deploy
git push origin main -> Vercel auto-deploys to https://winni-bridges-hunter.vercel.app
