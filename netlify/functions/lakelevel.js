
export async function handler() {
  try {
    // Try USGS
    const r = await fetch('https://waterservices.usgs.gov/nwis/iv/?sites=01080000&format=json');
    if (r.ok) {
      const j = await r.json();
      const vals = j?.value?.timeSeries?.[0]?.values?.[0]?.value;
      if (vals && vals[0] && vals[0].value) {
        const level = parseFloat(vals[0].value);
        return { statusCode: 200, headers: {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}, body: JSON.stringify({ level, source: 'USGS 01080000', timestamp: new Date().toISOString() }) };
      }
    }
    return { statusCode: 200, body: JSON.stringify({ level: 504.32, source: 'fallback full lake', note: 'USGS unavailable' }) };
  } catch (e) {
    return { statusCode: 200, body: JSON.stringify({ level: 504.32, source: 'fallback', error: e.message }) };
  }
}
