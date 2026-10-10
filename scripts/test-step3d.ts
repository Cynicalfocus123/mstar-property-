import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {mkdir,stat,writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import postgres from 'postgres';
import {requiredUrl} from './db-env';
import {applyMigrations} from './migrate';
import {seedDemo,demoId} from './seed';
const devUrl=requiredUrl('DATABASE_MIGRATION_URL'),testUrl=requiredUrl('DATABASE_TEST_URL'),bin=process.env.MSTAR_PG_BIN;
if(!bin||process.env.NODE_ENV!=='development')throw new Error('Step 3D requires the existing PostgreSQL binaries and development mode.');
for(const [url,name] of [[devUrl,'mstar_property_dev'],[testUrl,'mstar_property_step2_test']]){const target=new URL(url);if(!['127.0.0.1','localhost'].includes(target.hostname)||target.pathname!==`/${name}`)throw new Error('Only the dedicated local Mstar databases are allowed.');}
const dev=postgres(devUrl,{max:1,onnotice:()=>{}}),test=postgres(testUrl,{max:1,onnotice:()=>{}}),passed:string[]=[];
const rollback=new Error('Intentional test transaction rollback');
try{
 await mkdir('.local/backups',{recursive:true});
 for(const [url,name] of [[devUrl,'dev'],[testUrl,'test']]){
  const target=new URL(url),file=`.local/backups/step3d-before-${name}.dump`,args=['-h',target.hostname,'-p',target.port||'5432','-U',decodeURIComponent(target.username),'-d',target.pathname.slice(1)],options={env:{...process.env,PGPASSWORD:decodeURIComponent(target.password)},stdio:'pipe' as const};
  // Preserve the first pre-change archive when a test is rerun.
  try{await stat(file);}catch(error){if((error as NodeJS.ErrnoException).code!=='ENOENT')throw error;execFileSync(join(bin,'pg_dump.exe'),[...args,'-Fc','-f',file],options);}assert((await stat(file)).size>1000);
  assert.match(execFileSync(join(bin,'pg_restore.exe'),['--list',file],options).toString(),/TABLE public listings/);
 }
 passed.push('Development/test custom-format backups created and archive catalogs verified before migration');
 const before=await dev`select id,to_jsonb(l)-'updated_at'-'floor'-'building_floors' as row from listings l order by id`;
 for(const url of [testUrl,devUrl]){await applyMigrations(url);await applyMigrations(url);}
 for(const client of [test,dev]){assert.equal((await client`select count(*)::int as n from drizzle.__drizzle_migrations`)[0].n,4);assert.equal((await client`select count(*)::int as n from information_schema.columns where table_name='public_listings' and column_name='building_floors'`)[0].n,1);}
 passed.push('New additive migration applied/rerun on actual test and development PostgreSQL; four ledger rows and safe view column');
 await seedDemo(testUrl);await seedDemo(devUrl);await seedDemo(devUrl);
 const after=await dev`select id,to_jsonb(l)-'updated_at'-'floor'-'building_floors' as row from listings l order by id`;assert.deepEqual(after,before);
 assert.equal((await dev`select count(*)::int as n from listings where is_demo`)[0].n,16);
 const rows=await dev`select type,intent,floor,building_floors,size_sqm from listings where is_demo order by id`;
 assert(rows.filter(r=>r.type==='condo').slice(0,2).every(r=>r.floor===18));
 assert(rows.filter(r=>r.type==='house').every(r=>r.building_floors===2));assert(rows.filter(r=>r.type==='hotel').every(r=>r.building_floors===8));
 passed.push('Repeatable fictional seed adds unit/building floors; all 16 prior listing IDs and unrelated values including stored m² preserved');
 for(const [type,floors] of [['land',1],['condo',2],['house',0],['hotel',-1]])await assert.rejects(test`update listings set building_floors=${floors} where type=${type}::property_type`,(error:unknown)=>(error as {code:string}).code==='23514');
 await assert.rejects(test.begin(async tx=>{await tx`update listings set building_floors=null where type='house'`;assert.equal((await tx`select building_floors from listings where type='house' limit 1`)[0].building_floors,null);throw rollback;}),error=>error===rollback);
 passed.push('Building floors reject zero, negative, condo and land values; nullable existing building records remain valid');
 await assert.rejects(test.begin(async tx=>{
  await tx`update locations set is_demo=false where id=${demoId(12)}`;
  await tx`update listings set is_demo=false,price_visibility='contact_gated',hide_exact=true,address_en='PRIVATE ADDRESS',lat=13,lng=100 where id=${demoId(102)}`;
  const [row]=await tx`select * from public_listings where id=${demoId(102)}`;assert.equal(row.building_floors,2);assert.equal(row.price,null);assert.equal(row.address_en,null);assert.equal(row.lat,null);assert.equal(row.lng,null);assert(!('hotel_annual_revenue' in row));throw rollback;
 }),error=>error===rollback);
 assert.equal((await dev`select count(*)::int as n from public_listings`)[0].n,0);
 const runtime=postgres(requiredUrl('DATABASE_TEST_APP_URL'),{max:1});try{await assert.rejects(runtime`update listings set building_floors=4 where type='house'`,(error:unknown)=>(error as {code:string}).code==='42501');}finally{await runtime.end();}
 passed.push('Public view and runtime role preserve sample exclusion, gated-price/hidden-location privacy and denied writes');
 await assert.rejects(test.begin(async tx=>{await tx`drop view public_listings`;await tx`alter table listings drop column building_floors`;assert.equal((await tx`select count(*)::int as n from information_schema.columns where table_name='listings' and column_name='building_floors'`)[0].n,0);throw rollback;}),error=>error===rollback);
 assert.equal((await test`select count(*)::int as n from information_schema.columns where table_name='listings' and column_name='building_floors'`)[0].n,1);await applyMigrations(testUrl);
 passed.push('Test-only reverse DDL transaction rolls back; current schema and migration ledger stay intact');
 const health=await fetch('http://127.0.0.1:3000/api/health');assert.equal(health.status,200);assert.equal((await health.json()).ready,true);
 const response=await fetch('http://127.0.0.1:3000/api/listings?route=buy&lang=en');assert.equal(response.status,200);const data=await response.json();assert.equal(data.demo,true);
 for(const item of data.items){const [row]=await dev`select floor,building_floors,size_sqm,hide_exact,price_visibility from listings where id=${item.id}`;assert.equal(item.floor,row.floor);assert.equal(item.buildingFloors,row.building_floors);assert.equal(item.size,row.size_sqm===null?null:Number(row.size_sqm));if(row.hide_exact)assert.equal(item.address,'');if(row.price_visibility==='contact_gated')assert.equal(item.price,null);}
 passed.push('Actual backend health ready; safe listings API floor/building fields and unchanged m² match stored rows');
 await writeFile('.local/step3d-db-results.json',JSON.stringify({passed:passed.length,groups:passed},null,2));console.log(`PASS: ${passed.length} Step 3D real app/PostgreSQL groups`);
}finally{await dev.end();await test.end();}
