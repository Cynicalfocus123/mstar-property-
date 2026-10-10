// Owner decision B09 (2026-10-10): free open-source mapping. MapLibre GL JS renders OpenFreeMap vector tiles (no key).
// To move to a self-hosted Protomaps PMTiles file later, change only NEXT_PUBLIC_MAP_STYLE_URL.
export const mapStyleUrl=process.env.NEXT_PUBLIC_MAP_STYLE_URL||'https://tiles.openfreemap.org/styles/positron';
// Attribution ("OpenFreeMap © OpenMapTiles Data from OpenStreetMap") comes from the tile source and stays expanded on the map.
// Thailand overview when a search has no mapped homes.
export const thailandView={center:[100.99,13.4] as [number,number],zoom:5};
// Radius shown around a hidden listing's rounded (0.01°) centre; always contains the true point.
export const areaRadiusM=1000;
