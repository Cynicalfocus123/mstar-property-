import 'server-only';
import {sql} from 'drizzle-orm';
import {getDatabase} from './db';
import {localDemoEnabled} from './listing-search';
import type {Language} from './i18n';

export const nearbyCategories=['transit','school','shopping','hospital'] as const;
export type NearbyPlace={name:string;distanceM:number};
export type Nearby={code:string;categories:Record<typeof nearbyCategories[number],NearbyPlace[]>;source:string|null;fetchedAt:string|null;note:string;attribution:string};

// Provider data only (listing_nearby written by scripts/osm-nearby.ts). Fictional seed rows are never mixed into genuine output.
export async function listingNearby(code:string,language:Language,demo:boolean):Promise<Nearby|null>{
 demo=demo&&localDemoEnabled('localhost');
 const db=getDatabase();
 const listing=await db.execute(sql`select l.id from listings l join locations loc on loc.id=l.location_id where l.code=${code} and l.publish_state='published' and l.status in ('active','reserved') and l.is_demo=${demo} and loc.is_demo=${demo} limit 1`) as unknown as {id:string}[];
 if(!listing.length)return null;
 const rows=await db.execute(sql`select category,name_th,name_en,distance_m,source,fetched_at from listing_nearby where listing_id=${listing[0].id} and is_demo=${demo} and source like 'OpenStreetMap%' order by category,distance_m limit 100`) as unknown as {category:string;name_th:string;name_en:string;distance_m:number;source:string;fetched_at:Date}[];
 const categories=Object.fromEntries(nearbyCategories.map(c=>[c,rows.filter(r=>r.category===c).map(r=>({name:language==='th'?r.name_th:r.name_en,distanceM:r.distance_m}))])) as Nearby['categories'];
 return {code,categories,source:rows[0]?.source??null,fetchedAt:rows[0]?new Date(rows[0].fetched_at).toISOString():null,
  note:language==='th'?'ระยะทางเป็นค่าประมาณ':'Distances are approximate',attribution:'© OpenStreetMap contributors'};
}
