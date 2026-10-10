import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {spawn} from 'node:child_process';
import {writeFile} from 'node:fs/promises';
import postgres from 'postgres';
import {drizzle} from 'drizzle-orm/postgres-js';
import {and,eq,inArray} from 'drizzle-orm';
import * as schema from '../db/schema';
import {requiredUrl} from './db-env';
import {homeListings} from '../lib/home-listings';
import {getDatabase} from '../lib/db';
import {landUnits} from '../lib/listing-format';
const url=requiredUrl('DATABASE_MIGRATION_URL'),connection=new URL(url);
if(process.env.NODE_ENV!=='development'||!['127.0.0.1','localhost'].includes(connection.hostname)||!['/mstar_property_dev','/mstar_property_step2_test'].includes(connection.pathname))throw new Error('Step 3B tests require the named local development/test database and NODE_ENV=development.');
const client=postgres(url,{max:1}),db=drizzle(client),ids=Array.from({length:20},()=>randomUUID()),stationIds=[randomUUID(),randomUUID()],groups:string[]=[];
const base='http://127.0.0.1:3000';
async function request(query:string){const response=await fetch(`${base}/api/listings?lang=en&${query}`);assert.equal(response.status,200);return await response.json();}
let baseline:readonly unknown[]|null=null,completed=false;
try{
 assert.equal((await request('route=buy')).demo,true,'Actual app must be development with the existing sample guard enabled.');
 baseline=await client`select id,md5(row_to_json(l)::text) as hash from listings l order by id`;
 const [source]=await db.select().from(schema.listings).where(and(eq(schema.listings.code,'FICTIONAL-CONDO-SALE'),eq(schema.listings.isDemo,true)));
 assert(source,'Existing fictional fixture required.');const photos=await db.select().from(schema.listingMedia).where(and(eq(schema.listingMedia.listingId,source.id),eq(schema.listingMedia.isDemo,true)));
 assert.deepEqual(landUnits(50,'en'),[[50,'sq. wah']]);assert.deepEqual(landUnits(400,'en'),[[1,'rai']]);assert.deepEqual(landUnits(903,'en'),[[2,'rai'],[1,'ngan'],[3,'sq. wah']]);assert.deepEqual(landUnits(399.8,'th'),[[1,'ไร่']]);assert.deepEqual(landUnits(0,'th'),[]);groups.push('Whole land units, zero omission and carry at unit boundaries');
 await db.transaction(async tx=>{
  for(let index=0;index<ids.length;index++){
   await tx.insert(schema.listings).values({...source,id:ids[index],code:`FICTIONAL-STEP3B-${index}`,slug:`fictional-step3b-${index}`,titleEn:`[FICTIONAL DEMO] Temporary Step 3B test ${index}`,titleTh:`ข้อมูลสมมติ — ทดสอบขั้นตอน 3B ${index}`,featured:index%3===0,publishedAt:new Date(Date.now()-index*1000)});
   for(const photo of photos)await tx.insert(schema.listingMedia).values({...photo,id:randomUUID(),listingId:ids[index]});
  }
  for(const [index,line] of ['MRT','ARL'].entries()){
   await tx.insert(schema.stations).values({id:stationIds[index],slug:`fictional-step3b-${line.toLowerCase()}`,line:line as 'MRT'|'ARL',nameEn:`[FICTIONAL DEMO] Temporary ${line}`,nameTh:`ข้อมูลสมมติ — สถานีทดสอบ ${line}`,isDemo:true});
   await tx.insert(schema.listingStations).values({listingId:ids[index],stationId:stationIds[index],distanceM:index===0?321:222,source:'FICTIONAL temporary test distance, not provider data',fetchedAt:new Date(),isDemo:true});
  }
  // A farther BTS proves the displayed nearest line and Nearest BTS sort are distinct.
  await tx.insert(schema.listingStations).values({listingId:ids[0],stationId:'00000000-0000-4000-8000-000000000020',distanceM:500,source:'FICTIONAL temporary test distance',fetchedAt:new Date(),isDemo:true});
 });
 groups.push('20 temporary fictional listings and two stations inserted; original seed untouched');
 for(const [page,count] of [[1,12],[2,24],[3,28]]){const data=await request(`route=buy&page=${page}`);assert.equal(data.items.length,count);assert.equal(data.hasMore,page<3);}groups.push('Real API/PostgreSQL cumulative 12/24/28 pagination');
 const nearest=await request('route=buy&sort=nearest');assert.equal(nearest.items[0].code,'FICTIONAL-CONDO-SALE');assert.equal(nearest.items[1].code,'FICTIONAL-STEP3B-0');assert.equal(nearest.items[1].stationLine,'MRT');assert.equal(nearest.items[1].stationDistance,321);groups.push('Nearest BTS sort preserved while actual nearest station line/distance are paired');
 for(const language of ['en','th'] as const){
  const rows=await homeListings(language,'127.0.0.1:3000');assert.equal(rows.length,4);assert.equal(rows[0].items.length,12);
  const expected=await client`select l.id from listings l join locations loc on loc.id=l.location_id where l.is_demo and loc.is_demo and l.intent='sale' and l.publish_state='published' and l.status in ('active','reserved') order by l.featured desc,l.published_at desc,l.id limit 12`;
  assert.deepEqual(rows[0].items.map(item=>item.id),expected.map(item=>item.id));assert(rows.every(row=>row.items.length<=12&&row.items.every(item=>item.demo)));
  assert.deepEqual(await homeListings(language,'mstar.example'),[]);
 }groups.push('Bilingual home queries match actual featured/newest order, cap and empty-row/public-host guards');
 const [publicCount]=await client`select count(*)::int as total from public.public_listings p join listings l on l.id=p.id where l.is_demo`;assert.equal(publicCount.total,0);groups.push('Public view excludes temporary and permanent fictional data');
 const exit=await new Promise<number|null>((resolve,reject)=>{const child=spawn(process.execPath,['node_modules/@playwright/test/cli.js','test','tests/step3b-fixtures.spec.ts','--reporter=list'],{stdio:'inherit',env:{...process.env,MSTAR_STEP3B_FIXTURES:'1',PLAYWRIGHT_BROWSERS_PATH:'D:/dev/playwright'}});child.on('error',reject);child.on('exit',resolve);});assert.equal(exit,0,'Actual fixture browser tests failed.');groups.push('18 Chromium fixture checks across six widths, both languages, history and MRT/ARL');completed=true;
}finally{
 await db.transaction(async tx=>{
  await tx.delete(schema.listings).where(and(inArray(schema.listings.id,ids),eq(schema.listings.isDemo,true)));
  await tx.delete(schema.stations).where(and(inArray(schema.stations.id,stationIds),eq(schema.stations.isDemo,true)));
 });
 const restored=await client`select id,md5(row_to_json(l)::text) as hash from listings l order by id`;if(baseline!==null)assert.deepEqual(restored,baseline,'Original inventory must remain byte-equivalent after fixture cleanup.');groups.push('Temporary fixtures removed; every original listing row hash unchanged');
 await client.end();await getDatabase().$client.end({timeout:1});
 await writeFile('.local/step3b-db-results.json',JSON.stringify({passed:completed?groups.length:0,groups,temporaryFixturesRemoved:true,status:completed?'passed':'failed'},null,2));
}
console.log(`PASS: ${groups.length} actual Step 3B app/PostgreSQL groups.`);
