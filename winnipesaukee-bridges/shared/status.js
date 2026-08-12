// Shared clearance/status logic — used by route.html and live.html.
// FULL_LEVEL is the reference "full lake" elevation (NGVD29 feet) that the
// printed bridge clearances (BRIDGES[].base) were measured against.
const FULL_LEVEL = 504.32;

// Comfort/marginal thresholds only apply to vessels whose clearance need
// actually changes with water level. Car and pedestrian crossings don't
// change with lake level, so they're handled separately below.
const REQ = {
  pwc:        { comfortable: 6, marginal: 4.5, label: 'PWC' },
  smallboat:  { comfortable: 6, marginal: 4,   label: 'Small Boat' },
  kayak:      { comfortable: 3, marginal: 1.5, label: 'Kayak' },
};

// Clearance goes UP as lake level goes DOWN, and vice versa.
function adjClearance(baseClearanceFt, lakeLevel) {
  return baseClearanceFt + (FULL_LEVEL - lakeLevel);
}

// Returns 'pass' | 'marginal' | 'fail' | 'na' for a bridge + vessel + lake level.
function statusFor(bridge, vessel, lakeLevel) {
  if (vessel === 'all') return 'na';
  if (!bridge.vessels[vessel]) return 'fail';
  if (vessel === 'car' || vessel === 'pedestrian') return 'pass'; // not water-level dependent
  const req = REQ[vessel];
  if (!req) return 'pass';
  const adj = adjClearance(bridge.base, lakeLevel);
  if (adj >= req.comfortable) return 'pass';
  if (adj >= req.marginal) return 'marginal';
  return 'fail';
}

const STATUS_COLOR = { pass: '#22c55e', marginal: '#eab308', fail: '#ef4444', na: '#18181b' };

function statusLabel(status, vessel) {
  if (status === 'na') return '—';
  if (status === 'fail') return '✕ No';
  if (status === 'marginal') {
    if (vessel === 'pwc') return '⚠ Duck under';
    if (vessel === 'smallboat') return '⚠ Bimini down';
    if (vessel === 'kayak') return '⚠ Portage may be needed';
    return '⚠ Marginal';
  }
  return '✓ Yes';
}
