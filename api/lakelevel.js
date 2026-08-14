export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=3600');
  const FULL_POOL = 504.32;
  async function fetchText(url) {
    try { const r = await fetch(url, {headers:{'User-Agent':'winni-bridges-hunter'}}); if(!r.ok) return null; return await r.text(); } catch { return null; }
  }
  let level=null,time=null,source=null,live=false;
  try {
    const txt = await fetchText('https://waterservices.usgs.gov/nwis/dv/?format=json&sites=01080000&parameterCd=00065&siteStatus=all');
    if (txt) { try { const data=JSON.parse(txt); const vals=data?.value?.timeSeries?.[0]?.values?.[0]?.value||[]; if(vals.length){const latest=vals[vals.length-1]; const v=parseFloat(latest.value); const dt=new Date(latest.dateTime); if(Date.now()-dt.getTime()<2592000000){level=v<20?v+500:v; time=latest.dateTime; live=true; source='USGS live';}}}catch{}}
    if(!live){ try{const b=await fetchText('https://www.bizer.com/bzt/bztmap.shtml'); const m=b.match(/Lake\s*Level[^0-9]*([0-9]{3}\.[0-9]{1,2})/i); if(m){level=parseFloat(m[1]); time=new Date().toISOString(); live=true; source='Bizer.com - verify with NH DES';}}catch{}}
    if(!level){level=503.38; time='2017-09-30T00:45:00.000-04:00'; source='USGS 01080000 ended 2017-09-30 - see NH DES';}
    return res.json({level:Number(level.toFixed(2)),gageHeight:Number((level-500).toFixed(2)),time,source,fullPool:FULL_POOL,datumNote:'Lake level = gage height + 500ft datum',live,warning:!live?'USGS 01080000 has no data since 2017-09-30. Current: https://www.des.nh.gov/water/dam-maintenance/dam-bureau/lake-levels':undefined});
  } catch(e){ return res.status(500).json({error:String(e)}); }
}
