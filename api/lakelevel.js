export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
  const SITE = '01080000';
  const FULL_POOL = 504.32;

  async function tryFetch(url) {
    try {
      const r = await fetch(url, { headers: { 'User-Agent': 'winni-bridges-hunter/1.0' }});
      const t = await r.text();
      return JSON.parse(t);
    } catch { return null; }
  }

  try {
    let val, dt;

    // 1. New WaterData API - most likely to have current data
    let data = await tryFetch(`https://api.waterdata.usgs.gov/observations?f=json&sites=${SITE}&parameterCd=00065&limit=1`);
    if (data?.observations?.length) {
      val = parseFloat(data.observations[0].value);
      dt = data.observations[0].time;
    }

    // 2. Fallback to Daily Values if IV is stale/missing
    if (!val) {
      data = await tryFetch(`https://waterservices.usgs.gov/nwis/dv/?format=json&sites=${SITE}&parameterCd=00065,62614,00062&statCd=00001`);
      if (data?.value?.timeSeries) {
        for (const ts of data.value.timeSeries) {
          const vals = ts?.values?.[0]?.value || [];
          if (vals.length) {
            const latest = vals[vals.length-1];
            const v = parseFloat(latest.value);
            if (!isNaN(v)) { val = v; dt = latest.dateTime; break; }
          }
        }
      }
    }

    // 3. Last resort - IV
    if (!val) {
      data = await tryFetch(`https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${SITE}&parameterCd=00065&siteStatus=all`);
      const ts = data?.value?.timeSeries?.[0];
      const vals = ts?.values?.[0]?.value || [];
      if (vals.length) {
        const latest = vals[vals.length-1];
        val = parseFloat(latest.value);
        dt = latest.dateTime;
      }
    }

    const gageHeight = (val !== undefined && val < 20) ? val : null;
    const level = gageHeight !== null ? gageHeight + 500 : val;

    const isLive = dt ? (Date.now() - new Date(dt).getTime()) < 1000*60*60*72 : false;

    return res.status(200).json({
      level: level ? Number(level.toFixed(2)) : null,
      gageHeight: gageHeight ? Number(gageHeight.toFixed(2)) : null,
      time: dt || new Date().toISOString(),
      source: `USGS ${SITE} LAKE WINNIPESAUKEE AT WEIRS BEACH, NH - Official gauge at Endicott Park per NH RSA 482:84`,
      fullPool: FULL_POOL,
      datumNote: "Lake level = gage height + 500ft datum",
      live: isLive,
      rawValue: val
    });

  } catch (e) {
    return res.status(500).json({ error: String(e.message || e), level: null });
  }
}
