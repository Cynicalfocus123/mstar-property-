import {drizzle} from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import {and,eq} from 'drizzle-orm';
import * as s from '../db/schema';
import {requiredUrl} from './db-env';
import {seedDemo} from './seed';
const id=(n:number)=>`00000000-0000-4000-8000-${String(n).padStart(12,'0')}`;
const url=requiredUrl('DATABASE_MIGRATION_URL');
await seedDemo(url); // Existing guard refuses non-local/non-development databases.
const client=postgres(url,{max:1});const db=drizzle(client);
try {
 await db.transaction(async tx=>{
  await tx.update(s.stations).set({slug:'fictional-demo-station'}).where(and(eq(s.stations.id,id(20)),eq(s.stations.isDemo,true)));
  const occupied=await tx.select({demo:s.listings.isDemo}).from(s.listings).where(eq(s.listings.id,id(114)));
  if(occupied.some(r=>!r.demo))throw new Error('Reserved demo IDs contain genuine records.');
  const [base]=await tx.select().from(s.listings).where(and(eq(s.listings.id,id(100)),eq(s.listings.isDemo,true)));
  if(!base)throw new Error('Required fictional seed is missing.');
  for(const [n,intent,visibility,price] of [[114,'rent','public','20000'],[115,'sale','contact_gated','99999999']] as const){
   const rows=await tx.select({demo:s.listings.isDemo}).from(s.listings).where(eq(s.listings.id,id(n)));if(rows.some(r=>!r.demo))throw new Error('Reserved demo ID contains genuine data.');
   await tx.insert(s.listings).values({...base,id:id(n),code:`FICTIONAL-SEARCH-${n}`,slug:`fictional-search-${n}`,intent,priceVisibility:visibility,price,previousPrice:n===114?'22000':null,pricePeriod:intent==='rent'?'month':null,featured:false,titleEn:`[FICTIONAL DEMO] Search example ${n} — not a real property`,titleTh:`ข้อมูลสมมติ — ตัวอย่างค้นหา ${n}`}).onConflictDoUpdate({target:s.listings.id,set:{floor:base.floor,buildingFloors:base.buildingFloors}});
  }
  const listingIds=Array.from({length:16},(_,i)=>id(100+i));
  // Step 4 map fixture: fictional open-water points in the Gulf of Thailand, never a real address or city.
  // Every fourth sample hides its exact location so area circles are exercised; its point is off the 0.01° grid
  // so tests can prove only the rounded area centre ever reaches the browser.
  for(const [i,listingId] of listingIds.entries()){
   const hidden=i%4===3;
   await tx.update(s.listings).set({lat:(12.25+Math.floor(i/4)*0.03+(hidden?0.0037:0)).toFixed(7),lng:(100.4+(i%4)*0.035+(hidden?0.0012:0)).toFixed(7),hideExact:hidden}).where(and(eq(s.listings.id,listingId),eq(s.listings.isDemo,true)));
  }
  await tx.update(s.listingMedia).set({url:'/demo/property-1.svg'}).where(and(eq(s.listingMedia.id,id(200)),eq(s.listingMedia.isDemo,true)));
  for(const [i,listingId] of listingIds.entries())for(let photo=0;photo<5;photo++){
   if(i===0&&photo===0)continue;
   const mediaId=id(1000+i*5+photo);const existing=await tx.select({demo:s.listingMedia.isDemo}).from(s.listingMedia).where(eq(s.listingMedia.id,mediaId));if(existing.some(r=>!r.demo))throw new Error('Reserved media ID contains genuine data.');
   await tx.insert(s.listingMedia).values({id:mediaId,listingId,kind:'photo',url:`/demo/property-${photo+1}.svg`,sort:photo,altEn:`FICTIONAL DEMO illustration ${photo+1}, not a property photograph`,altTh:`ภาพประกอบสมมติ ${photo+1} ไม่ใช่ภาพอสังหาริมทรัพย์จริง`,isDemo:true}).onConflictDoNothing();
  }
  // Activate only explicitly fictional metadata. Genuine definitions are never altered.
  await tx.update(s.filterDefinitions).set({active:true}).where(eq(s.filterDefinitions.isDemo,true));
  await tx.update(s.filterOptions).set({active:true}).where(eq(s.filterOptions.isDemo,true));
 });
 console.log('Fictional search fixture ready: 16 demo listings; five labelled illustrations each; fictional open-water map points (4 area-only); demo filters only. Public inventory remains empty.');
}finally{await client.end();}
