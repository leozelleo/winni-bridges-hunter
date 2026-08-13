
export default async function handler(req, res) {
  try {
    const usgsUrl = 'https://waterservices.usgs.gov/nwis/iv/?format=json&sites=01080000&parameterCd=00065&siteStatus=all';
    const r = await fetch(usgsUrl, { headers: { 'User-Agent': 'Winni-Bridge-App/1.0' } });
    if (!r.ok) throw new Error('USGS fetch failed '+r.status);
    const data = await r.json();
    
    let level = null;
    let time = null;
    let gageHeight = null;
    
    if (data.value && data.value.timeSeries && data.value.timeSeries.length > 0) {
      const ts = data.value.timeSeries[0];
      const values = ts.values && ts.values[0] && ts.values[0].value;
      if (values && values.length > 0) {
        const latest = values[values.length - 1];
        gageHeight = parseFloat(latest.value);
        time = latest.dateTime;
        if (gageHeight < 100) {
          level = gageHeight + 500;
        } else {
          level = gageHeight;
        }
      }
    }
    
    if (level === null) throw new Error('No level parsed');
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, max-age=300');
    return res.status(200).json({
      level: level,
      gageHeight: gageHeight,
      time: time,
      source: 'USGS 01080000 LAKE WINNIPESAUKEE AT WEIRS BEACH, NH - Official gauge at Endicott Park per NH RSA 482:84',
      fullPool: 504.32,
      datumNote: 'Lake level = gage height + 500ft datum'
    });
  } catch (e) {
    const now = new Date();
    const month = now.getMonth();
    let seasonal = 504.32;
    if (month >= 5 && month <= 9) seasonal = 504.32 - (month - 5) * 0.3;
    else if (month >= 10) seasonal = 503.0;
    else seasonal = 503.5;
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({
      level: seasonal,
      gageHeight: null,
      time: now.toISOString(),
      source: 'Fallback seasonal estimate - USGS 01080000 fetch failed: ' + e.message,
      error: e.message,
      fullPool: 504.32
    });
  }
}
