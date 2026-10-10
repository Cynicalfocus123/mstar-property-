// MapLibre GL JS 6 loads its web worker as a separate module file. The bundler cannot see that file,
// so copy it (and the shared module it imports) from the locked package into public/ before dev/build.
import {copyFileSync,mkdirSync,readFileSync} from 'node:fs';

const {version}=JSON.parse(readFileSync('node_modules/maplibre-gl/package.json','utf8'));
const target=`public/vendor/maplibre/${version}`;
mkdirSync(target,{recursive:true});
for(const file of ['maplibre-gl-worker.mjs','maplibre-gl-shared.mjs'])copyFileSync(`node_modules/maplibre-gl/dist/${file}`,`${target}/${file}`);
console.log(`MapLibre ${version} worker copied to ${target}.`);
