export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=3600');
  const FULL_POOL = 504.32;

  async function fetchText(url) {
    try {
      const r = await fetch(url, { headers: { 'User-Agent': 'winni-bridges-hunter/1.0' }});
      if (!r.ok) return null;
      return await r.text();
    } catch { return null; }
  }

  let level = null, gageHeight = null, time = null, source = null;

  try {
    // Try USGS DV - will be stale but check age
    const txt = await fetchText('https://waterservices.usgs.gov/nwis/dv/?format=json&sites=01080000&parameterCd=00065,62614&statCd=00001&siteStatus=all');
    if (txt) {
      try {
        const data = JSON.parse(txt);
        const tss = data?.value?.timeSeries || [];
        for (const ts of tss) {
          const vals = ts?.values?.[0]?.value || [];
          if (vals.length) {
            const latest = vals[vals.length-1];
            const v = parseFloat(latest.value);
            if (!isNaN(v) && v > 0) {
              const dt = new Date(latest.dateTime);
              if (Date.now() - dt.getTime() < 1000*60*60*24*30) {
                level = v > 20 ? v : v + 500;
                gageHeight = v < 20 ? v : v - 500;
                time = latest.dateTime;
                source = 'USGS 01080000 live DV';
                break;
              }
            }
          }
        }
      } catch {}
    }

    // Try Bizer scrape as live fallback
    if (!level) {
      const bizerPage = await fetchText('https://www.bizer.com/bzt/bztmap.shtml');
      if (bizerPage) {
        const m = bizerPage.match(/Lake\s*Level[^0-9]*([0-9]{3}\.[0-9]{1,2})/i);
        if (m) {
          level = parseFloat(m[1]);
          gageHeight = level - 500;
          time = new Date().toISOString();
          source = 'Bizer.com (scraped) - cross-check with NH DES';
        }
      }
    }

    if (!level) {
      level = 503.38;
      gageHeight = 3.38;
      time = '2017-09-30T00:45:00.000-04:00';
      source = 'USGS 01080000 LAKE WINNIPESAUKEE AT WEIRS BEACH, NH - Official gauge at Endicott Park per NH RSA 482:84 (USGS feed ended 2017-09-30, use NH DES for current)';
    }

    return res.json({
      level: Number(level.toFixed(2)),
      gageHeight: gageHeight ? Number(gageHeight.toFixed(2)) : Number((level-500).toFixed(2)),
      time: time,
      source: source,
      fullPool: FULL_POOL,
      datumNote: 'Lake level = gage height + 500ft datum',
      live: time ? (Date.now() - new Date(time).getTime()) < 1000*60*60*24*3 : false,
      warning: (Date.now() - new Date(time).getTime()) > 1000*60*60*24*30 ? 'USGS 01080000 has no data since 2017-09-30. Current level: https://www.des.nh.gov/water/dam-maintenance/dam-bureau/lake-levels' : undefined
    });
  } catch (e) {
    return res.status(500).json({ error: String(e), level: null });
  }
}
