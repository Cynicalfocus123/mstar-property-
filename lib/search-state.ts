export const propertyTypes = ['condo','house','townhouse','land','hotel','commercial','pool_villa'] as const;
export type PropertyType = typeof propertyTypes[number];
export type SearchRoute = 'buy'|'rent'|'invest';
export const sorts = ['newest','price_asc','price_desc','size','nearest'] as const;
export type SearchState = {route:SearchRoute;loc:string;types:PropertyType[];sort:typeof sorts[number];page:number;custom:Record<string,string[]>;values:Record<string,string>};
export class SearchInputError extends Error {}
const numericLimits:Record<string,number> = {min:1e12,max:1e12,beds:100,baths:100,size:1e8,land:1e6,distance:100000,year:2200};
const flags=['fq','pet','furnished','video'];
export function parseSearch(params:URLSearchParams,route:SearchRoute):SearchState {
  if(params.toString().length>4000)throw new SearchInputError('Search is too long.');
  const values:Record<string,string>={},custom:Record<string,string[]>={};
  const loc=(params.get('loc')||'').trim();
  if(loc.length>120||/[\u0000-\u001f]/.test(loc))throw new SearchInputError('Invalid location.');
  const types=(params.get('type')||'').split(',').filter(Boolean);
  if(types.some(t=>!propertyTypes.includes(t as PropertyType)))throw new SearchInputError('Invalid property type.');
  const sort=params.get('sort')||'newest';
  if(!sorts.includes(sort as typeof sorts[number]))throw new SearchInputError('Invalid sort.');
  const rawPage=params.get('page')||'1';
  if(!/^\d+$/.test(rawPage)||+rawPage<1||+rawPage>50)throw new SearchInputError('Invalid page.');
  for(const [key,limit] of Object.entries(numericLimits)){
    const raw=params.get(key);if(raw===null||raw==='')continue;
    if(!/^\d+(\.\d{1,2})?$/.test(raw)||+raw>limit||((key==='beds'||key==='baths'||key==='year')&&!Number.isInteger(+raw)))throw new SearchInputError(`Invalid ${key}.`);
    values[key]=String(+raw);
  }
  if(values.min&&values.max&&+values.min>+values.max)throw new SearchInputError('Minimum price exceeds maximum price.');
  for(const key of flags){const v=params.get(key);if(v&&v!=='1')throw new SearchInputError(`Invalid ${key}.`);if(v)values[key]='1';}
  const near=params.get('near');if(near){if(!['bts','mrt','arl','srt'].includes(near))throw new SearchInputError('Invalid station line.');values.near=near;}
  const project=params.get('project');if(project){if(!/^[a-z0-9_-]{1,120}$/.test(project))throw new SearchInputError('Invalid project.');values.project=project;}
  const bbox=params.get('bbox');if(bbox){const b=bbox.split(',').map(Number);if(b.length!==4||b.some(n=>!Number.isFinite(n))||b[0]<-180||b[2]>180||b[1]<-90||b[3]>90||b[0]>=b[2]||b[1]>=b[3])throw new SearchInputError('Invalid map bounds.');values.bbox=b.join(',');}
  for(const key of new Set(params.keys()))if(key.startsWith('filter.')){
    if(!/^filter\.[a-z][a-z0-9_]{0,63}$/.test(key))throw new SearchInputError('Invalid filter key.');
    const selected=params.getAll(key).flatMap(v=>v.split(','));
    if(Object.keys(custom).length>=20||selected.length>20||selected.some(v=>v.length>100||!v))throw new SearchInputError('Invalid filter value.');
    custom[key.slice(7)]=[...new Set(selected)];
  }
  return {route,loc,types:[...new Set(types)] as PropertyType[],sort:sort as typeof sorts[number],page:+rawPage,values,custom};
}
export function searchParams(state:SearchState):URLSearchParams {
  const p=new URLSearchParams();if(state.loc)p.set('loc',state.loc);if(state.types.length)p.set('type',state.types.join(','));
  for(const [k,v] of Object.entries(state.values))if(v)p.set(k,v);
  for(const [k,vs] of Object.entries(state.custom))for(const v of vs)p.append(`filter.${k}`,v);
  if(state.sort!=='newest')p.set('sort',state.sort);if(state.page>1)p.set('page',String(state.page));return p;
}
export function searchHref(language:string,state:SearchState){const p=searchParams(state);return `/${language}/${state.route}${p.size?'?'+p:''}`;}
export const typeNames = {
  en:{condo:'Condo',house:'House',townhouse:'Townhouse',land:'Land',hotel:'Hotel',commercial:'Commercial property',pool_villa:'Pool villa'},
  th:{condo:'คอนโด',house:'บ้าน',townhouse:'ทาวน์เฮาส์',land:'ที่ดิน',hotel:'โรงแรม',commercial:'อาคารพาณิชย์',pool_villa:'พูลวิลล่า'},
};
