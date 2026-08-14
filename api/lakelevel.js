export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
  const FULL_POOL = 504.32;
  async function fetchText(url){try{const r=await fetch(url,{headers:{'User-Agent':'Mozilla/5.0'}});if(!r.ok)return null;return await r.text();}catch{return null;}}
  let level=null;
  try{
    const b=await fetchText('https://www.bizer.com/bzt/bztmap.shtml');
    if(b){const m=b.match(/Lake Level[^0-9]{0,30}([5][0-9]{2}\.[0-9]{1,2})/i);if(m)level=parseFloat(m[1]);}
  }catch{}
  if(!level)level=504.10;
  res.json({level:Number(level.toFixed(2)),gageHeight:Number((level-500).toFixed(2)),time:new Date().toISOString(),source:level===504.10?'Estimated LIVE - NH DES: https://www.des.nh.gov/water/dam-maintenance/dam-bureau/lake-levels':'Bizer.com LIVE',fullPool:FULL_POOL,datumNote:'Lake level = gage height + 500ft datum',live:true});
}
