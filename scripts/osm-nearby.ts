// Nearby places from OpenStreetMap (owner decision B09, 2026-10-10).
//   npm run nearby:download  fetch Geofabrik's Thailand extract to OSM_DATA_DIR (default D:/dev/data/osm), verified by MD5
//   npm run nearby:import    load named transit/school/shopping/hospital places into osm_places, then refresh listings
//   npm run nearby:refresh   recompute listing_nearby for listings that are missing it or older than 30 days (--all: every listing)
// Owner decision 2026-10-11: refresh monthly with a fresh extract; the new download replaces the previous file (one copy only).
// Distances are straight lines from the listing point. Hidden-location listings use their rounded area centre and
// distances rounded to 100 m, so nearby data cannot reveal the exact address. The public Overpass API is never used.
import {createHash} from 'node:crypto';
import {createReadStream,createWriteStream,existsSync,mkdirSync,renameSync,statSync} from 'node:fs';
import {Readable} from 'node:stream';
import {pipeline} from 'node:stream/promises';
import postgres from 'postgres';
import {readPbf,type Tags} from './osm-pbf';
import {requiredUrl} from './db-env';

const extractUrl='https://download.geofabrik.de/asia/thailand-latest.osm.pbf';
const dataDir=process.env.OSM_DATA_DIR||'D:/dev/data/osm';
const args=process.argv.slice(2),file=args.includes('--file')?args[args.indexOf('--file')+1]:`${dataDir}/thailand-latest.osm.pbf`;
export const refreshDays=30,maxPerCategory=5,radiusM=3000;
type Category='transit'|'school'|'shopping'|'hospital';
type Place={id:string;category:Category;kind:string;nameTh:string;nameEn:string;lat:number;lng:number};

export function classify(tags:Tags):[Category,string]|null{
 const amenity=tags.amenity,shop=tags.shop,railway=tags.railway;
 if(amenity==='hospital'||tags.healthcare==='hospital')return ['hospital','hospital'];
 if(['school','university','college','kindergarten'].includes(amenity))return ['school',amenity];
 if(['mall','department_store','supermarket'].includes(shop))return ['shopping',shop];
 if(amenity==='marketplace')return ['shopping','marketplace'];
 if(railway==='station'||railway==='halt')return ['transit',tags.station||railway];
 if(tags.public_transport==='station'&&['train','subway','light_rail','monorail'].some(mode=>tags[mode]==='yes'))return ['transit',tags.station||'station'];
 if(amenity==='bus_station'||amenity==='ferry_terminal')return ['transit',amenity];
 return null;
}
export function names(tags:Tags){
 const local=tags.name?.trim(),th=tags['name:th']?.trim()||local,en=tags['name:en']?.trim()||local||th;
 return th&&en?{nameTh:th,nameEn:en}:null;
}

async function download(){
 mkdirSync(dataDir,{recursive:true});
 const headers={'User-Agent':'MstarProperty-nearby-import/1.0 (monthly refresh)'};
 const expected=(await (await fetch(`${extractUrl}.md5`,{headers})).text()).trim().split(/\s+/)[0];
 const response=await fetch(extractUrl,{headers});
 if(!response.ok||!response.body)throw new Error(`Download failed: HTTP ${response.status}.`);
 const part=`${file}.part`;await pipeline(Readable.fromWeb(response.body as import('node:stream/web').ReadableStream),createWriteStream(part));
 const hash=createHash('md5');await pipeline(createReadStream(part),hash);
 if(hash.digest('hex')!==expected)throw new Error('Downloaded extract failed its MD5 check; the previous file is unchanged.');
 renameSync(part,file);console.log(`Downloaded ${Math.round(statSync(file).size/1048576)} MB to ${file} (MD5 verified).`);
}

function parse(){
 if(!existsSync(file))throw new Error(`No extract at ${file}. Run npm run nearby:download first.`);
 const places:Place[]=[],ways:{id:number;refs:number[];category:Category;kind:string;nameTh:string;nameEn:string}[]=[],needed=new Set<number>();
 let dataDate:Date|null=null;
 console.log('Pass 1/2: tagged places…');
 readPbf(file,{
  header:timestamp=>{if(timestamp)dataDate=new Date(timestamp*1000);},
  node:(id,lat,lng,tags)=>{if(!tags)return;const kind=classify(tags),label=kind&&names(tags);if(kind&&label)places.push({id:`node/${id}`,category:kind[0],kind:kind[1],...label,lat,lng});},
  way:(id,refs,tags)=>{const kind=classify(tags),label=kind&&names(tags);if(!kind||!label||!refs.length)return;ways.push({id,refs,category:kind[0],kind:kind[1],...label});for(const ref of refs)needed.add(ref);},
 });
 console.log(`Pass 2/2: coordinates for ${ways.length} mapped areas…`);
 const points=new Map<number,[number,number]>();
 readPbf(file,{node:(id,lat,lng)=>{if(needed.has(id))points.set(id,[lat,lng]);}});
 for(const way of ways){
  // Average of the outline's distinct vertices: a good-enough centre for "distance to" purposes.
  const coords=[...new Set(way.refs)].map(ref=>points.get(ref)).filter((p):p is [number,number]=>Boolean(p));
  if(!coords.length)continue;
  places.push({id:`way/${way.id}`,category:way.category,kind:way.kind,nameTh:way.nameTh,nameEn:way.nameEn,lat:coords.reduce((s,p)=>s+p[0],0)/coords.length,lng:coords.reduce((s,p)=>s+p[1],0)/coords.length});
 }
 return {places,dataDate:dataDate as Date|null};
}

async function importPlaces(sql:postgres.Sql){
 const started=Date.now(),{places,dataDate}=parse(),importedAt=new Date();
 const rows=places.filter(p=>Math.abs(p.lat)<=90&&Math.abs(p.lng)<=180).map(p=>({id:p.id,category:p.category,kind:p.kind,name_th:p.nameTh.slice(0,300),name_en:p.nameEn.slice(0,300),lat:p.lat.toFixed(7),lng:p.lng.toFixed(7),data_date:dataDate,imported_at:importedAt}));
 await sql.begin(async tx=>{
  // osm_places is a replaceable cache of provider data; listing_nearby keeps its own copies until refreshed.
  await tx`delete from osm_places`;
  for(let i=0;i<rows.length;i+=2000)await tx`insert into osm_places ${tx(rows.slice(i,i+2000))}`;
 });
 const counts=await sql<{category:string;n:number}[]>`select category,count(*)::int as n from osm_places group by category order by category`;
 console.log(`Imported ${rows.length} places (${counts.map(c=>`${c.category} ${c.n}`).join(', ')}); data date ${dataDate?.toISOString().slice(0,10)??'unknown'}; ${Math.round((Date.now()-started)/1000)} s.`);
}

async function refresh(sql:postgres.Sql,all:boolean){
 const [latest]=await sql<{imported:Date|null;data:Date|null}[]>`select max(imported_at) as imported,max(data_date) as data from osm_places`;
 if(!latest.imported)throw new Error('osm_places is empty. Run npm run nearby:import first.');
 if(Date.now()-latest.imported.getTime()>refreshDays*86400000)console.warn(`Warning: the OpenStreetMap import is older than ${refreshDays} days. Run nearby:download and nearby:import.`);
 const source=`OpenStreetMap via Geofabrik thailand-latest (data ${latest.data?.toISOString().slice(0,10)??'unknown'})`;
 const listings=await sql<{id:string;demo:boolean;lat:string;lng:string}[]>`
  select l.id,l.is_demo as demo,case when l.hide_exact then round(l.lat,2) else l.lat end as lat,case when l.hide_exact then round(l.lng,2) else l.lng end as lng
  from listings l where l.lat is not null and l.lng is not null
  and (${all} or not exists(select 1 from listing_nearby n where n.listing_id=l.id and n.source like 'OpenStreetMap%' and n.fetched_at>now()-make_interval(days=>${refreshDays})))`;
 const hidden=new Set((await sql<{id:string}[]>`select id from listings where hide_exact`).map(r=>r.id));
 let total=0;
 for(const listing of listings){
  const lat=Number(listing.lat),lng=Number(listing.lng),dLat=radiusM/111320,dLng=radiusM/(111320*Math.cos(lat*Math.PI/180));
  const nearby=await sql<{category:string;name_th:string;name_en:string;distance:number}[]>`
   with candidates as (
    select category,name_th,name_en,6371000*2*asin(sqrt(power(sin(radians(lat::float8-${lat})/2),2)+cos(radians(${lat}::float8))*cos(radians(lat::float8))*power(sin(radians(lng::float8-${lng})/2),2))) as distance
    from osm_places where point(lng::float8,lat::float8) <@ box(point(${lng-dLng}::float8,${lat-dLat}::float8),point(${lng+dLng}::float8,${lat+dLat}::float8))),
   unique_names as (select distinct on (category,name_en) * from candidates where distance<=${radiusM} order by category,name_en,distance),
   ranked as (select *,row_number() over(partition by category order by distance) as rank from unique_names)
   select category,name_th,name_en,distance from ranked where rank<=${maxPerCategory} order by category,distance`;
  const step=hidden.has(listing.id)?100:10,fetchedAt=new Date();
  await sql.begin(async tx=>{
   await tx`delete from listing_nearby where listing_id=${listing.id} and source like 'OpenStreetMap%'`;
   if(nearby.length)await tx`insert into listing_nearby ${tx(nearby.map(n=>({listing_id:listing.id,category:n.category,name_th:n.name_th,name_en:n.name_en,distance_m:Math.max(step,Math.round(n.distance/step)*step),source,fetched_at:fetchedAt,is_demo:listing.demo})))}`;
  });
  total+=nearby.length;
 }
 console.log(`Refreshed ${listings.length} listing(s); ${total} nearby place row(s) written. Source: ${source}.`);
}

if(process.argv[1]?.endsWith('osm-nearby.ts')){
 if(args.includes('--download'))await download();
 if(args.includes('--import')||args.includes('--refresh')){
  const sql=postgres(requiredUrl('DATABASE_MIGRATION_URL'),{max:1,onnotice:()=>{}});
  try {
   if(args.includes('--import'))await importPlaces(sql);
   await refresh(sql,args.includes('--all')||args.includes('--import'));
  }finally{await sql.end();}
 }
}
