import assert from 'node:assert/strict';
import postgres from 'postgres';
import {writeFile} from 'node:fs/promises';
import {requiredUrl} from './db-env';

const mode=process.env.MSTAR_TEST_MODE;
assert(['development','production'].includes(mode||''),'Set MSTAR_TEST_MODE=development or production in the test process.');
const production=mode==='production',base='http://127.0.0.1:3000';
const client=postgres(requiredUrl('DATABASE_MIGRATION_URL'),{max:1});
try{
 const [fixture]=await client`select count(*)::int as total from listings where is_demo and publish_state='published' and status in ('active','reserved')`;
 assert.equal(fixture.total,16,'The real development database must contain the existing 16 published samples.');
 const health=await fetch(`${base}/api/health`);assert.equal(health.status,200);assert.equal((await health.json()).ready,true);
 for(const route of ['buy','rent','invest']){
  const [expected]=await client`select count(*)::int as total from listings where is_demo=${!production} and publish_state='published' and status in ('active','reserved') and intent=${route==='rent'?'rent':'sale'} and (${route!=='invest'} or type in ('hotel','land','commercial'))`;
  const response=await fetch(`${base}/api/listings?route=${route}&lang=en&page=2&demo=1`);assert.equal(response.status,200);
  const data=await response.json();assert.equal(data.demo,!production);assert.equal(data.total,expected.total);
  assert(data.items.every((item:{demo:boolean})=>item.demo===!production));
  if(production){assert(!JSON.stringify(data).match(/FICTIONAL|fictional-demo|fictional_option|fictional_multi/));assert.equal(data.metadata.filters.some((f:{value:string})=>f.value.startsWith('fictional_')),false);}
 }
 const [view]=await client`select count(*)::int as total from public.public_listings p join listings l on l.id=p.id where l.is_demo`;
 assert.equal(view.total,0);
 if(production){
  assert.equal(process.env.NODE_ENV,'production');assert.equal(process.env.MSTAR_DEMO_MODE,'1');
  const [{listingSearch,searchMetadata,localDemoEnabled},{parseSearch},{getDatabase}]=await Promise.all([import('../lib/listing-search'),import('../lib/search-state'),import('../lib/db')]);
  try{
   assert.equal(localDemoEnabled('localhost'),false);
   const forced=await listingSearch(parseSearch(new URLSearchParams(),'buy'),'en',true);
   assert.equal(forced.demo,false);assert(forced.items.every(item=>!item.demo));
   assert((await searchMetadata(true)).filters.every(filter=>!filter.value.startsWith('fictional_')));
   const site=process.env.SITE_URL;
   try{
    Object.assign(process.env,{NODE_ENV:'development',SITE_URL:'https://mstar.example'});
    assert.equal(localDemoEnabled('localhost'),false,'A configured live site must deny samples even in development.');
   }finally{Object.assign(process.env,{NODE_ENV:'production',SITE_URL:site});}
  }finally{await getDatabase().$client.end({timeout:1});}
 }
 const passed=production?6:5;
 await writeFile(`.local/sample-${mode}-results.json`,JSON.stringify({date:new Date().toISOString(),mode,seededSamples:fixture.total,passed,proof:'Actual PostgreSQL contains 16 published samples; buy/rent/invest counts match the correct partition; public view contains no samples; health is ready.',sampleFlagEnabled:true,forcedInternalQueryDenied:production},null,2));
 console.log(`PASS: ${passed} ${mode} sample-visibility checks against actual app/PostgreSQL (16 samples remain seeded).`);
}finally{await client.end();}
