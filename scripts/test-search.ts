import assert from 'node:assert/strict';
import postgres from 'postgres';
import http from 'node:http';
import {writeFile} from 'node:fs/promises';
import {requiredUrl} from './db-env';
import {parseSearch,searchParams,SearchInputError} from '../lib/search-state';
const client=postgres(requiredUrl('DATABASE_MIGRATION_URL'),{max:1});
const base='http://127.0.0.1:3000/api/listings';
const groups:string[]=[];
async function request(query:string){const response=await fetch(`${base}?lang=en&${query}`);const body=await response.text();assert.equal(response.status,200,body.slice(0,200));return JSON.parse(body);}
try{
 const [actual]=await client`select count(*)::int as total from listings where is_demo and publish_state='published' and status in ('active','reserved') and intent='sale'`;
 const buy=await request('route=buy');assert.equal(buy.total,actual.total);assert(buy.items.every((l:{intent:string;demo:boolean})=>l.intent==='sale'&&l.demo));assert.equal(buy.items.length,6);assert.equal(buy.hasMore,true);
 const all=await request('route=buy&page=2');assert.equal(all.items.length,actual.total);assert.equal(all.hasMore,false);groups.push('Real PostgreSQL row count, sale intent and cumulative pagination');
 const rent=await request('route=rent&page=2');assert(rent.items.every((l:{intent:string})=>l.intent==='rent'));assert(rent.items.some((l:{price:number|null;period:string})=>l.price===20000&&l.period==='month'));groups.push('Separate rent intent and genuine fixture price period');
 const investment=await request('route=invest');assert(investment.items.every((l:{type:string;intent:string})=>['land','hotel','commercial'].includes(l.type)&&l.intent==='sale'));groups.push('Investment type scope');
 for(const loc of ['fictional-demo-area','fictional-demo-district','fictional-demo-province'])assert.equal((await request(`route=buy&loc=${loc}`)).total,actual.total);
 assert.equal((await request('route=buy&loc=station:00000000-0000-4000-8000-000000000020')).total,1);assert.equal((await request('route=buy&loc=fictional-demo-station')).total,1);groups.push('Location hierarchy, station slug and legacy station selector');
 const filtered=await request('route=buy&type=condo&beds=2&baths=2&near=bts&distance=500&fq=1&pet=1');assert.equal(filtered.total,1);assert.equal(filtered.items[0].code,'FICTIONAL-CONDO-SALE');assert.equal(filtered.items[0].stationDistance,456);
 assert.equal((await request('route=buy&near=bts&distance=400')).total,0);assert.equal((await request('route=buy&video=1')).total,0);groups.push('Real beds/baths/amenities/transit filters and empty results');
 const bounded=await request('route=buy&min=50000&max=150000&page=2');const [expected]=await client`select count(*)::int as total from listings where is_demo and intent='sale' and publish_state='published' and status in ('active','reserved') and price_visibility='public' and price between 50000 and 150000`;
 assert.equal(bounded.total,expected.total);assert(bounded.items.every((l:{price:number})=>l.price>=50000&&l.price<=150000));groups.push('Price query matches actual PostgreSQL');
 const asc=await request('route=buy&sort=price_asc&page=2'),desc=await request('route=buy&sort=price_desc&page=2');
 const prices=(data:{items:{price:number|null}[]})=>data.items.map(l=>l.price).filter((p):p is number=>p!==null);
 assert.deepEqual(prices(asc),[...prices(asc)].sort((a,b)=>a-b));assert.deepEqual(prices(desc),[...prices(desc)].sort((a,b)=>b-a));assert.equal(asc.items.at(-1).price,null);assert.equal(desc.items.at(-1).price,null);
 const nearest=await request('route=buy&sort=nearest');assert.equal(nearest.items[0].stationDistance,456);groups.push('Stable price/nearest sorting with gated prices last');
 const gated=all.items.find((l:{code:string})=>l.code==='FICTIONAL-SEARCH-115');assert(gated);assert.equal(gated.price,null);assert.equal(gated.previousPrice,null);assert(!('lat' in gated)&&!('agentId' in gated)&&!('email' in gated)&&!('hotelAnnualRevenue' in gated));assert.equal(gated.address,'');
 assert.equal((await request('route=buy&min=99999999')).total,0);assert(buy.histogram.every((b:{max:number})=>b.max<99999999));assert.equal(buy.histogram.reduce((n:number,b:{count:number})=>n+b.count,0),7);assert.deepEqual(bounded.histogram,buy.histogram);groups.push('Gated price, hidden location and PII exclusion; real histogram');
 for(const [key,value] of [['multi','fictional_option_0'],['single','fictional_option_1'],['number','100'],['boolean','true']])assert.equal((await request(`route=buy&type=condo&filter.fictional_${key}=${value}`)).total,1);
 for(const query of ['filter.unknown=1','filter.fictional_single=unknown','type=land&filter.fictional_boolean=true','filter.fictional_boolean=bad','min=-1','max=oops','min=200&max=100','page=999','type=invalid','bbox=180,90,-180,-90'])assert.equal((await fetch(`${base}?route=buy&${query}`)).status,400);groups.push('Typed DB-managed options/scalars and malformed/inactive/scope rejection');
 assert.equal((await request(`route=buy&loc=${encodeURIComponent("x' OR 1=1 --")}`)).total,0);assert.equal((await client`select count(*)::int as total from public.public_listings`)[0].total,0);
 // Node fetch normalizes Host; use a real HTTP request to exercise an untrusted Host.
 const publicData=await new Promise<{demo:boolean;total:number;metadata:{filters:unknown[]}}>((resolve,reject)=>{http.get({hostname:'127.0.0.1',port:3000,path:'/api/listings?route=buy&demo=1',headers:{Host:'untrusted.example'}},response=>{assert.equal(response.statusCode,200);let body='';response.on('data',chunk=>body+=chunk);response.on('end',()=>{try{resolve(JSON.parse(body));}catch(error){reject(error);}});}).on('error',reject);});assert.equal(publicData.demo,false);assert.equal(publicData.total,0);assert.equal(publicData.metadata.filters.length,0);groups.push('Parameterization, public demo exclusion and no query/Host demo bypass');
 const state=parseSearch(new URLSearchParams('loc=fictional-demo-area&type=condo&min=1000&beds=2&fq=1&sort=price_desc&page=2&filter.fictional_multi=fictional_option_0'),'buy');assert.deepEqual(parseSearch(searchParams(state),'buy'),state);
 assert.throws(()=>parseSearch(new URLSearchParams('filter.bad-key=value'),'buy'),SearchInputError);groups.push('Shared URL parser round-trip and invalid-key denial');
 const [station]=await client`select slug from stations where id='00000000-0000-4000-8000-000000000020'`;
 assert.equal(station.slug,'fictional-demo-station');
 await assert.rejects(()=>client.begin(async tx=>{await tx`insert into stations(slug,line,name_th,name_en,is_demo) values(${station.slug},'BTS','ข้อมูลสมมติ uniqueness','[FICTIONAL DEMO] unique slug probe',true)`;}),(error:unknown)=>(error as {code:string;constraint_name:string}).code==='23505'&&(error as {constraint_name:string}).constraint_name==='stations_slug_unique');
 assert.equal((await client`select count(*)::int as total from drizzle.__drizzle_migrations`)[0].total,3);groups.push('Applied third migration, real unique station slug constraint and fixture transaction rollback');
 await writeFile('.local/step3-search-results.json',JSON.stringify({passed:groups.length,groups,frontend:'http://127.0.0.1:3000/en/buy',api:base,fictional:true},null,2));
 console.log(`PASS: ${groups.length} real app/PostgreSQL search groups\n${groups.map(g=>`- ${g}`).join('\n')}`);
}finally{await client.end();}
