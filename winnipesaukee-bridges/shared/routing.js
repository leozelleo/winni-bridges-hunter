// Shared routing math — used by index.html, route.html, live.html
// Nearest-neighbor construction + 2-opt refinement gives a short (not provably
// optimal, but consistently good) path through the selected bridges.

function haversineMiles(a, b) {
  const R = 3958.8; // earth radius, miles
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const la1 = a.lat * Math.PI / 180, la2 = b.lat * Math.PI / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function totalRouteDist(route) {
  let d = 0;
  for (let i = 1; i < route.length; i++) d += haversineMiles(route[i - 1], route[i]);
  return d;
}

function nearestNeighborOrder(bridges) {
  if (bridges.length <= 1) return bridges.slice();
  let idx = bridges.findIndex(b => b.id === 1);
  if (idx === -1) idx = 0;
  const unvisited = bridges.slice();
  const start = unvisited.splice(idx, 1)[0];
  const ordered = [start];
  while (unvisited.length > 0) {
    const last = ordered[ordered.length - 1];
    let best = 0, bestD = haversineMiles(last, unvisited[0]);
    for (let i = 1; i < unvisited.length; i++) {
      const d = haversineMiles(last, unvisited[i]);
      if (d < bestD) { bestD = d; best = i; }
    }
    ordered.push(unvisited.splice(best, 1)[0]);
  }
  return ordered;
}

function twoOptSwap(route, i, k) {
  return route.slice(0, i).concat(route.slice(i, k + 1).reverse()).concat(route.slice(k + 1));
}

function twoOpt(route) {
  if (route.length < 4) return route;
  let best = route.slice();
  let bestDist = totalRouteDist(best);
  let improved = true;
  let iter = 0;
  while (improved && iter < 50) {
    improved = false;
    for (let i = 1; i < best.length - 2; i++) {
      for (let k = i + 1; k < best.length - 1; k++) {
        const candidate = twoOptSwap(best, i, k);
        const d = totalRouteDist(candidate);
        if (d < bestDist - 0.001) {
          best = candidate;
          bestDist = d;
          improved = true;
        }
      }
    }
    iter++;
  }
  return best;
}

function shortestRoute(bridges) {
  if (bridges.length <= 2) return bridges;
  return twoOpt(nearestNeighborOrder(bridges));
}
