import 'server-only';
import {sql,type SQL} from 'drizzle-orm';
import {getDatabase} from './db';
import {SearchInputError,type SearchState,type PropertyType} from './search-state';
import type {Choice,FilterDefinition,SearchMetadata,SearchResults,ListingCardData,ListingPhoto} from './listing-types';
import type {Language} from './i18n';

export function localDemoEnabled(host:string):boolean {
  if(process.env.MSTAR_DEMO_MODE!=='1')return false;
  try {const database=new URL(process.env.DATABASE_URL||'');return ['127.0.0.1','localhost'].includes(host.split(':')[0])&&['127.0.0.1','localhost'].includes(database.hostname)&&['/mstar_property_dev','/mstar_property_step2_test'].includes(database.pathname);}catch{return false;}
}
async function query<T>(statement:SQL):Promise<T[]> {return await getDatabase().execute(statement) as unknown as T[];}
const name=(row:Choice,language:Language)=>language==='th'?row.nameTh||row.nameEn:row.nameEn||row.nameTh;
const number=(value:unknown)=>value===null||value===undefined?null:Number(value);
function safePhoto(url:string):boolean {return /^\/(?!\/)[a-zA-Z0-9_./-]+$/.test(url)||/^https:\/\//.test(url)&&!url.includes('.invalid');}
export async function searchMetadata(demo:boolean):Promise<SearchMetadata>{
  const [locations,stations,projects,definitions,options]=await Promise.all([
    query<Choice>(sql`select slug as value,name_th as "nameTh",name_en as "nameEn" from locations where is_demo=${demo} order by level,slug limit 500`),
    query<Choice>(sql`select slug as value,name_th as "nameTh",name_en as "nameEn" from stations where is_demo=${demo} order by line,name_en limit 500`),
    query<Choice>(sql`select slug as value,name_th as "nameTh",name_en as "nameEn" from projects where is_demo=${demo} and publish_state='published' order by name_en limit 200`),
    query<Choice&{id:string;kind:FilterDefinition['kind'];types:PropertyType[]}>(sql`select id,key as value,name_th as "nameTh",name_en as "nameEn",kind,property_types as types from filter_definitions where active and is_demo=${demo} order by sort,key limit 100`),
    query<Choice&{definitionId:string}>(sql`select o.definition_id as "definitionId",o.value,o.name_th as "nameTh",o.name_en as "nameEn" from filter_options o join filter_definitions d on d.id=o.definition_id where o.active and d.active and o.is_demo=${demo} and d.is_demo=${demo} order by o.sort,o.value limit 1000`),
  ]);
  return {locations,stations,projects,filters:definitions.map(d=>({...d,options:options.filter(o=>o.definitionId===d.id)}))};
}
function conditions(state:SearchState,demo:boolean,metadata:SearchMetadata,omitPrice=false):SQL {
  const parts:SQL[]=[sql`l.publish_state='published'`,sql`l.status in ('active','reserved')`,sql`l.is_demo=${demo}`,sql`loc.is_demo=${demo}`,sql`l.intent=${state.route==='rent'?'rent':'sale'}`];
  if(state.route==='invest')parts.push(sql`l.type in ('hotel','land','commercial')`);
  if(state.types.length)parts.push(sql`l.type::text in (${sql.join(state.types.map(t=>sql`${t}`),sql`, `)})`);
  if(state.loc){
    if(state.loc.startsWith('station:')||metadata.stations.some(station=>station.value===state.loc)){
      const id=state.loc.slice(8);if(state.loc.startsWith('station:')&&!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id))throw new SearchInputError('Invalid station.');
      parts.push(sql`exists(select 1 from listing_stations ls join stations s on s.id=ls.station_id where ls.listing_id=l.id and ${state.loc.startsWith('station:')?sql`s.id::text=${id}`:sql`s.slug=${state.loc}`} and ls.is_demo=${demo} and s.is_demo=${demo})`);
    }else parts.push(sql`l.location_id in (select child.id from locations child left join locations parent on parent.id=child.parent_id left join locations grandparent on grandparent.id=parent.parent_id where child.is_demo=${demo} and (lower(child.slug)=lower(${state.loc}) or lower(child.name_en)=lower(${state.loc}) or child.name_th=${state.loc} or lower(parent.slug)=lower(${state.loc}) or lower(parent.name_en)=lower(${state.loc}) or parent.name_th=${state.loc} or lower(grandparent.slug)=lower(${state.loc}) or lower(grandparent.name_en)=lower(${state.loc}) or grandparent.name_th=${state.loc}))`);
  }
  const v=state.values;
  if(!omitPrice){if(v.min)parts.push(sql`l.price_visibility='public' and l.price>=${+v.min}`);if(v.max)parts.push(sql`l.price_visibility='public' and l.price<=${+v.max}`);}
  if(v.beds)parts.push(sql`l.beds>=${+v.beds}`);if(v.baths)parts.push(sql`l.baths>=${+v.baths}`);
  if(v.size)parts.push(sql`l.size_sqm>=${+v.size}`);if(v.land)parts.push(sql`l.land_sqwah>=${+v.land*400}`);
  if(v.year)parts.push(sql`l.built_year>=${+v.year}`);
  for(const [key,column] of [['fq',sql`l.foreign_quota`],['pet',sql`l.pet_friendly`],['furnished',sql`l.furnished`]] as const)if(v[key])parts.push(sql`${column}=true`);
  if(v.video)parts.push(sql`exists(select 1 from listing_media m where m.listing_id=l.id and m.kind='video' and m.is_demo=${demo})`);
  if(v.project)parts.push(sql`exists(select 1 from projects p where p.id=l.project_id and p.slug=${v.project} and p.publish_state='published' and p.is_demo=${demo})`);
  if(v.near||v.distance)parts.push(sql`exists(select 1 from listing_stations ls join stations s on s.id=ls.station_id where ls.listing_id=l.id and ls.is_demo=${demo} and s.is_demo=${demo} and ${v.near?sql`lower(s.line::text)=${v.near}`:sql`true`} and ls.distance_m<=${+(v.distance||'1000')})`);
  if(v.bbox){const [west,south,east,north]=v.bbox.split(',').map(Number);parts.push(sql`not l.hide_exact and l.lng between ${west} and ${east} and l.lat between ${south} and ${north}`);}
  for(const [key,selected] of Object.entries(state.custom)){
    const definition=metadata.filters.find(d=>d.value===key);
    if(!definition||state.types.length&&state.types.some(t=>!definition.types.includes(t)))throw new SearchInputError('Filter is inactive or outside its property scope.');
    let match:SQL;
    if(definition.kind==='boolean'){
      if(selected.length!==1||!['true','false'].includes(selected[0]))throw new SearchInputError('Invalid boolean filter.');
      match=sql`fv.boolean_value=${selected[0]==='true'}`;
    }else if(definition.kind==='number'){
      if(selected.length!==1||!/^\d+(\.\d{1,2})?$/.test(selected[0])||+selected[0]>1e12)throw new SearchInputError('Invalid numeric filter.');
      match=sql`fv.number_value>=${+selected[0]}`;
    }else{
      if(definition.kind==='single'&&selected.length!==1||selected.some(value=>!definition.options.some(o=>o.value===value)))throw new SearchInputError('Invalid filter option.');
      match=sql`exists(select 1 from filter_options fo where fo.id=fv.option_id and fo.definition_id=d.id and fo.active and fo.is_demo=${demo} and fo.value in (${sql.join(selected.map(value=>sql`${value}`),sql`, `)}))`;
    }
    parts.push(sql`exists(select 1 from listing_filter_values fv join filter_definitions d on d.id=fv.definition_id where fv.listing_id=l.id and d.key=${key} and d.active and d.is_demo=${demo} and l.type=any(d.property_types) and ${match})`);
  }
  return sql.join(parts,sql` and `);
}
export async function listingSearch(state:SearchState,language:Language,demo:boolean):Promise<SearchResults>{
  const metadata=await searchMetadata(demo),where=conditions(state,demo,metadata);
  const nearest=sql`(select min(ls.distance_m) from listing_stations ls join stations st on st.id=ls.station_id where ls.listing_id=l.id and ls.is_demo=${demo} and st.is_demo=${demo} and st.line='BTS')`;
  const visiblePrice=sql`case when l.price_visibility='public' then l.price else null end`;
  const order={newest:sql`l.published_at desc`,price_asc:sql`${visiblePrice} asc nulls last`,price_desc:sql`${visiblePrice} desc nulls last`,size:sql`coalesce(l.size_sqm,l.land_sqwah*4) desc nulls last`,nearest:sql`${nearest} asc nulls last`}[state.sort];
  const [counts,raw,prices]=await Promise.all([
    query<{total:number}>(sql`select count(*)::int as total from listings l join locations loc on loc.id=l.location_id where ${where}`),
    query<Record<string,unknown>>(sql`select l.id,l.code,l.slug,l.type,l.intent,l.title_th,l.title_en,case when not l.hide_exact then l.address_th end as address_th,case when not l.hide_exact then l.address_en end as address_en,loc.name_th as area_th,loc.name_en as area_en,${visiblePrice} as price,case when l.price_visibility='public' then l.previous_price end as previous_price,l.price_period,l.beds,l.baths,l.size_sqm,l.land_sqwah,l.road_frontage_m,l.hotel_rooms,l.hotel_occupancy,${nearest} as station_distance,l.featured,l.published_at,l.is_demo,exists(select 1 from listing_media m where m.listing_id=l.id and m.kind='video' and m.is_demo=${demo}) as video,exists(select 1 from projects p where p.id=l.project_id and p.publish_state='published' and p.is_mstar and p.is_demo=${demo}) as mstar from listings l join locations loc on loc.id=l.location_id where ${where} order by ${order},l.id limit ${state.page*6}`),
    // Histogram ignores only the price range; other query constraints remain identical.
    query<{min:string;max:string;count:number}>(sql`with matched as (select l.price from listings l join locations loc on loc.id=l.location_id where ${conditions(state,demo,metadata,true)} and l.price_visibility='public' and l.price is not null), bounds as (select min(price) as lo,max(price) as hi from matched), buckets as (select least(9,floor((price-lo)/greatest(hi-lo,1)*10))::int as bucket,price,lo,hi from matched cross join bounds) select min(lo+(hi-lo)*bucket/10)::text as min,max(lo+(hi-lo)*(bucket+1)/10)::text as max,count(*)::int as count from buckets group by bucket order by bucket`),
  ]);
  const media=raw.length?await query<{listingId:string;url:string;altTh:string;altEn:string}>(sql`select listing_id as "listingId",url,alt_th as "altTh",alt_en as "altEn" from (select listing_id,url,alt_th,alt_en,sort,row_number() over(partition by listing_id order by sort) as photo_number from listing_media where kind='photo' and is_demo=${demo} and listing_id::text in (${sql.join(raw.map(r=>sql`${r.id}`),sql`, `)})) photos where photo_number<=5 order by listing_id,sort`):[];
  const items=raw.map(r=>({id:String(r.id),code:String(r.code),slug:String(r.slug),type:r.type as PropertyType,intent:r.intent as 'sale'|'rent',title:String(language==='th'?r.title_th||r.title_en:r.title_en||r.title_th),address:String((language==='th'?r.address_th:r.address_en)||''),area:String(language==='th'?r.area_th||r.area_en:r.area_en||r.area_th),price:number(r.price),previousPrice:number(r.previous_price),period:r.price_period as ListingCardData['period'],beds:number(r.beds),baths:number(r.baths),size:number(r.size_sqm),land:number(r.land_sqwah),frontage:number(r.road_frontage_m),rooms:number(r.hotel_rooms),occupancy:number(r.hotel_occupancy),stationDistance:number(r.station_distance),stationLine:r.station_distance===null?null:'BTS',featured:Boolean(r.featured),video:Boolean(r.video),mstar:Boolean(r.mstar),isNew:Date.now()-new Date(String(r.published_at)).getTime()<7*86400000,demo:Boolean(r.is_demo),photos:media.filter(m=>m.listingId===r.id&&safePhoto(m.url)).slice(0,5).map(m=>({url:m.url,alt:(language==='th'?m.altTh||m.altEn:m.altEn||m.altTh)||'Property photo'})) as ListingPhoto[]}));
  const location=metadata.locations.concat(metadata.stations).find(c=>c.value===state.loc||c.nameEn.toLowerCase()===state.loc.toLowerCase()||c.nameTh===state.loc);
  return {state,items,total:counts[0].total,hasMore:counts[0].total>items.length,histogram:prices.map(p=>({min:+p.min,max:+p.max,count:p.count})),metadata,demo,locationName:location?name(location,language):null};
}
