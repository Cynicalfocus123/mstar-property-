// Step 4 actual app + PostgreSQL checks: map pins, bounds search, hidden-location privacy, geo indexes and nearby data.
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {request as httpRequest} from 'node:http';
import {writeFile} from 'node:fs/promises';
import postgres from 'postgres';
import {requiredUrl} from './db-env';
const url=requiredUrl('DATABASE_MIGRATION_URL'),connection=new URL(url);
if(!['127.0.0.1','localhost'].includes(connection.hostname)||connection.pathname!=='/mstar_property_dev')throw new Error('Step 4 tests require the named local development database.');
const sql=postgres(url,{max:1,onnotice:()=>{}}),base='http://127.0.0.1:3000',groups:string[]=[],temporary:string[]=[];
type Pin={id:string;code:string;area:boolean;lat:number;lng:number};
async function api(path:string,status=200){const response=await fetch(`${base}${path}`);assert.equal(response.status,status,`${path} returned ${response.status}`);return {text:await response.clone().text(),json:await response.json()};}
// Raw request so an untrusted Host header reaches the app unchanged.
const rawGet=(path:string,host:string)=>new Promise<string>((resolve,reject)=>{const req=httpRequest({host:'127.0.0.1',port:3000,path,headers:{Host:host}},res=>{let body='';res.on('data',c=>body+=c);res.on('end',()=>resolve(body));});req.on('error',reject);req.end();});
let completed=false;
try {
 for(const route of ['buy','rent','invest'] as const){
  const {json}=await api(`/api/listings?route=${route}&lang=en&map=1`);assert.equal(json.demo,true,'The actual app must run in development with samples enabled.');
  const intent=route==='rent'?'rent':'sale',typeFilter=route==='invest'?sql`and l.type in ('hotel','land','commercial')`:sql``;
  const [expected]=await sql<{n:number}[]>`select count(*)::int as n from listings l join locations loc on loc.id=l.location_id where l.is_demo and loc.is_demo and l.publish_state='published' and l.status in ('active','reserved') and l.intent=${intent} and l.lat is not null ${typeFilter}`;
  assert.equal(json.pins.length,expected.n,`${route}: one pin per mapped match`);
  const plain=await api(`/api/listings?route=${route}&lang=en`);assert.equal(plain.json.pins,undefined,`${route}: no pins without map=1`);
 }
 groups.push('map=1 returns one pin per mapped match on buy/rent/invest; list view returns none');
 const hidden=await sql<{id:string;lat:string;lng:string}[]>`select id,lat::text,lng::text from listings where is_demo and hide_exact and lat is not null`;
 assert(hidden.length>=2,'Fixture needs hidden-location samples.');
 for(const route of ['buy','rent','invest']){
  const {text,json}=await api(`/api/listings?route=${route}&lang=en&map=1`);
  for(const row of hidden){
   for(const value of [row.lat,row.lng,String(Number(row.lat)),String(Number(row.lng))])assert(!text.includes(value),`${route}: exact hidden coordinate ${value} leaked`);
   const pin=(json.pins as Pin[]).find(p=>p.id===row.id);
   if(pin){assert.equal(pin.area,true);assert.equal(pin.lat,Math.round(Number(row.lat)*100)/100);assert.equal(pin.lng,Math.round(Number(row.lng)*100)/100);}
  }
 }
 groups.push('Hidden-location listings send only a 0.01° area centre; exact coordinates absent from every API response');
 // Bounds: a box around one exact pin; a box containing a hidden exact point but not its rounded centre (and the reverse).
 const [exact]=await sql<{id:string;lat:number;lng:number}[]>`select id,lat::float8 as lat,lng::float8 as lng from listings where is_demo and not hide_exact and intent='sale' and lat is not null order by code limit 1`;
 const one=await api(`/api/listings?route=buy&lang=en&map=1&bbox=${exact.lng-0.001},${exact.lat-0.001},${exact.lng+0.001},${exact.lat+0.001}`);
 assert.deepEqual(one.json.items.map((i:{id:string})=>i.id),[exact.id]);assert.deepEqual(one.json.pins.map((p:Pin)=>p.id),[exact.id]);assert.equal(one.json.total,1);
 const [h]=await sql<{id:string;intent:string;lat:number;lng:number}[]>`select id,intent::text,lat::float8 as lat,lng::float8 as lng from listings where is_demo and hide_exact and lat is not null order by code limit 1`;
 const route=h.intent==='rent'?'rent':'buy',centre={lat:Math.round(h.lat*100)/100,lng:Math.round(h.lng*100)/100};
 const aroundExact=await api(`/api/listings?route=${route}&lang=en&map=1&bbox=${h.lng-0.0004},${h.lat-0.0004},${h.lng+0.0004},${h.lat+0.0004}`);
 assert(!aroundExact.json.items.some((i:{id:string})=>i.id===h.id),'A box around the hidden exact point must not reveal it');
 const aroundCentre=await api(`/api/listings?route=${route}&lang=en&map=1&bbox=${centre.lng-0.0004},${centre.lat-0.0004},${centre.lng+0.0004},${centre.lat+0.0004}`);
 assert(aroundCentre.json.items.some((i:{id:string})=>i.id===h.id),'Hidden listing matches by its area centre');
 const empty=await api('/api/listings?route=buy&lang=en&map=1&bbox=100.5,13.7,100.51,13.71');assert.equal(empty.json.total,0);assert.deepEqual(empty.json.pins,[]);
 groups.push('Real bbox search: exact pins by point, hidden listings only by area centre, empty box returns nothing');
 for(const bad of ['bbox=1,2,3','bbox=10,10,5,20','bbox=200,0,210,10','map=2','map=yes'])await api(`/api/listings?route=buy&lang=en&${bad}`,400);
 groups.push('Invalid bbox/map values rejected with HTTP 400');
 const plan=await sql.begin(async tx=>{await tx`set local enable_seqscan=off`;return (await tx.unsafe(`explain select l.id from listings l where (l.lat is not null and not l.hide_exact and point(l.lng::float8,l.lat::float8) <@ box(point(100,12),point(101,13))) or (l.lat is not null and l.hide_exact and point(round(l.lng,2)::float8,round(l.lat,2)::float8) <@ box(point(100,12),point(101,13)))`)).map(r=>Object.values(r)[0]).join('\n');});
 assert.match(plan,/listings_point_gist_idx/);assert.match(plan,/listings_area_gist_idx/);
 groups.push('Bounds query can use both GiST indexes (exact points and hidden area centres)');
 const outside=JSON.parse(await rawGet('/api/listings?route=buy&lang=en&map=1','mstar.example'));
 assert.equal(outside.demo,false);assert(outside.pins.every((p:Pin)=>!p.code.startsWith('FICTIONAL')),'Samples never reach a non-local host');
 groups.push('Untrusted Host: no sample pins (development-only guard holds for the map)');
 // Nearby from imported OpenStreetMap places, through the real refresh script and API.
 const [places]=await sql<{n:number}[]>`select count(*)::int as n from osm_places`;
 assert(places.n>0,'osm_places is empty: run npm run nearby:download and npm run nearby:import first.');
 const [template]=await sql<Record<string,unknown>[]>`select * from listings where code='FICTIONAL-CONDO-SALE' and is_demo`;
 for(const [index,hide] of [[0,false],[1,true]] as const){
  const id=randomUUID();temporary.push(id);
  // Temporary test-only sample near Siam (Bangkok) so real nearby data exists; removed in finally.
  await sql`insert into listings ${sql({...template,id,code:`FICTIONAL-STEP4-NEARBY-${index}`,slug:`fictional-step4-nearby-${index}`,title_en:`[FICTIONAL DEMO] Temporary Step 4 nearby test ${index}`,title_th:`ข้อมูลสมมติ — ทดสอบสถานที่ใกล้เคียง ${index}`,lat:'13.7456700',lng:'100.5347800',hide_exact:hide,featured:false})}`;
 }
 const run=spawnSync(process.execPath,['--import','tsx','scripts/osm-nearby.ts','--refresh'],{stdio:'inherit'});assert.equal(run.status,0,'nearby refresh failed');
 for(const [index,id] of temporary.entries()){
  const rows=await sql<{category:string;distance_m:number;source:string;fetched_at:Date}[]>`select category,distance_m,source,fetched_at from listing_nearby where listing_id=${id}`;
  assert(new Set(rows.map(r=>r.category)).size>=3,'Central Bangkok has transit, schools, shopping and/or hospitals nearby');
  assert(rows.every(r=>r.source.startsWith('OpenStreetMap via Geofabrik')&&Date.now()-r.fetched_at.getTime()<600000&&r.distance_m<=3000));
  if(index===1)assert(rows.every(r=>r.distance_m%100===0),'Hidden listing distances are rounded to 100 m');
  const {json}=await api(`/api/nearby?listing=FICTIONAL-STEP4-NEARBY-${index}&lang=th`);
  assert.equal(json.note,'ระยะทางเป็นค่าประมาณ');assert.equal(json.attribution,'© OpenStreetMap contributors');assert(json.categories.transit.length>0);
 }
 const english=await api('/api/nearby?listing=FICTIONAL-STEP4-NEARBY-0&lang=en');assert.equal(english.json.note,'Distances are approximate');
 await api('/api/nearby?listing=FICTIONAL-STEP4-NEARBY-0&lang=xx',400);await api('/api/nearby?listing=NOT-A-LISTING&lang=en',404);
 assert.equal(JSON.parse(await rawGet('/api/nearby?listing=FICTIONAL-STEP4-NEARBY-0&lang=en','mstar.example')).error,'Listing not found.');
 groups.push('Nearby refresh writes OpenStreetMap rows (source, fetch date, ≤3 km); hidden listing rounded to 100 m; bilingual API note; sample hidden from untrusted Host');
 completed=true;
}finally{
 if(temporary.length)await sql`delete from listings where id in ${sql(temporary)} and is_demo`;
 await sql.end();
 await writeFile('.local/step4-results.json',JSON.stringify({status:completed?'passed':'failed',groups,temporaryFixturesRemoved:true},null,2));
}
console.log(`PASS: ${groups.length} actual Step 4 app/PostgreSQL groups.`);
