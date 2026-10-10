'use client';
import {useEffect,useRef,useState,useTransition,type CSSProperties} from 'react';
import {useRouter} from 'next/navigation';
import dynamic from 'next/dynamic';
import type {Language} from '@/lib/i18n';
import type {Choice,MapPin,SearchResults} from '@/lib/listing-types';
import {parseSearch,propertyTypes,searchHref,searchParams,sorts,typeNames,type SearchState,type SearchRoute} from '@/lib/search-state';
import {searchCopy} from '@/lib/search-copy';
import {reducedMotion} from '@/lib/motion';
import {Button,Input,Modal} from './ui';
import {ListingCard} from './listing-card';

// The map library loads only when a visitor opens the map.
const ResultsMap=dynamic(()=>import('./results-map'),{ssr:false,loading:()=><div className="results-map-surface" aria-hidden="true"/>});
type FilterPanel='location'|'intent'|'price'|'beds'|'type'|'more';
export function SearchResultsView({data,language,currency}:{data:SearchResults;language:Language;currency:string}){
 const t=searchCopy[language],router=useRouter(),[pending,startTransition]=useTransition();
 const [open,setOpen]=useState<FilterPanel|null>(null),[draft,setDraft]=useState(()=>searchParams(data.state)),[draftRoute,setDraftRoute]=useState(data.state.route),[error,setError]=useState(''),[liveCount,setLiveCount]=useState<number|null>(null),[position,setPosition]=useState<CSSProperties>({});
 const mapOn=data.state.values.map==='1',pins=data.pins||[],page=useRef<HTMLElement>(null);
 const [highlighted,setHighlighted]=useState<string|null>(null),[searchAsMove,setSearchAsMove]=useState(true),[preview,setPreview]=useState<string|null>(null);
 // The sticky/full-screen map sits below the header and filter bar and above the phone tab bar.
 useEffect(()=>{
  const section=page.current,bar=section?.querySelector<HTMLElement>('.results-filter-bar'),tabs=document.querySelector<HTMLElement>('.bottom-navigation');
  if(!section||!bar)return;
  const measure=()=>{section.style.setProperty('--filter-bar-h',`${bar.offsetHeight}px`);section.style.setProperty('--tabbar-h',`${tabs&&getComputedStyle(tabs).display!=='none'?tabs.offsetHeight:0}px`);};
  measure();const observer=new ResizeObserver(measure);observer.observe(bar);if(tabs)observer.observe(tabs);
  return()=>observer.disconnect();
 },[]);
 function toggleMap(){const params=searchParams(data.state);params.delete('page');if(mapOn){params.delete('map');params.delete('bbox');}else params.set('map','1');setPreview(null);setHighlighted(null);navigate(parseSearch(params,data.state.route));}
 // Map moves replace the history entry so Back leaves the map search instead of replaying every drag.
 function moved(bbox:string){try{const params=searchParams(data.state);params.delete('page');params.set('bbox',bbox);const href=searchHref(language,parseSearch(params,data.state.route));startTransition(()=>router.replace(href,{scroll:false}));}catch{/* ignore out-of-range bounds */}}
 function selectPin(pin:MapPin){
  const cell=document.querySelector<HTMLElement>(`[data-listing-cell="${pin.id}"]`);
  if(!cell){router.push(`/${language}/property/${pin.code}-${pin.slug}`);return;}
  if(matchMedia('(max-width:720px)').matches){setPreview(pin.id);return;}
  setHighlighted(pin.id);cell.scrollIntoView({behavior:reducedMotion()?'auto':'smooth',block:'nearest'});
 }
 const previewItem=preview?data.items.find(item=>item.id===preview):undefined;
 const label=(c:Choice)=>language==='th'?c.nameTh||c.nameEn:c.nameEn||c.nameTh;
 function show(panel:FilterPanel,event:React.MouseEvent<HTMLButtonElement>){const rect=event.currentTarget.getBoundingClientRect();setPosition({'--filter-left':`${Math.max(16,Math.min(rect.left,innerWidth-416))}px`,'--filter-top':`${Math.min(rect.bottom+6,innerHeight-300)}px`} as CSSProperties);setDraft(searchParams(data.state));setDraftRoute(data.state.route);setError('');setLiveCount(data.total);setOpen(panel);}
 function set(key:string,value:string){setDraft(previous=>{const next=new URLSearchParams(previous);next.delete('page');if(value)next.set(key,value);else next.delete(key);return next;});setError('');}
 function navigate(state:SearchState){startTransition(()=>router.push(searchHref(language,state),{scroll:false}));}
 function apply(){try{navigate(parseSearch(draft,draftRoute));setOpen(null);}catch{setError(t.invalid);}}
 function change(key:string,value:string){const params=searchParams(data.state);params.delete('page');if(value)params.set(key,value);else params.delete(key);navigate(parseSearch(params,data.state.route));}
 function clear(){navigate(parseSearch(new URLSearchParams(),data.state.route));}
 const active=[...searchParams(data.state).entries()].filter(([key])=>!['page','sort','bbox','map'].includes(key));
 function chipLabel(key:string,value:string){
   if(key==='loc')return data.locationName||value;
   if(key==='type')return value.split(',').map(type=>typeNames[language][type as typeof propertyTypes[number]]).join(', ');
   if(key.startsWith('filter.')){const d=data.metadata.filters.find(f=>f.value===key.slice(7));return `${d?label(d):key}: ${d?.options.find(o=>o.value===value)?label(d.options.find(o=>o.value===value)!):value}`;}
   const names:Record<string,string>={min:t.min,max:t.max,beds:t.beds,baths:t.baths,size:t.minSize,land:t.minLand,distance:t.distance,year:t.built,near:t.near,fq:t.fq,pet:t.pet,furnished:t.furnished,video:t.video,project:t.project};
   return `${names[key]||key}${['fq','pet','furnished','video'].includes(key)?'':`: ${value}`}`;
 }
 function remove(key:string,value:string){const params=searchParams(data.state);if(key.startsWith('filter.')){const remaining=params.getAll(key).filter(v=>v!==value);params.delete(key);for(const v of remaining)params.append(key,v);}else params.delete(key);params.delete('page');navigate(parseSearch(params,data.state.route));}
 useEffect(()=>{
   if(open!=='price')return;
   const abort=new AbortController();setLiveCount(null);
   const timer=setTimeout(async()=>{try{parseSearch(draft,draftRoute);const params=new URLSearchParams(draft);params.set('route',draftRoute);params.set('lang',language);const response=await fetch(`/api/listings?${params}`,{signal:abort.signal});if(!response.ok)throw new Error();setLiveCount((await response.json()).total);}catch{if(!abort.signal.aborted)setError(t.invalid);}},250);
   return()=>{clearTimeout(timer);abort.abort();};
 },[draft,draftRoute,open,language,t.invalid]);
 const value=(key:string)=>draft.get(key)||'';
 const numberInput=(key:string,text:string)=><Input key={key} label={text} type="number" min="0" step={['beds','baths','year'].includes(key)?'1':'any'} value={value(key)} onChange={e=>set(key,e.target.value)}/>;
 const check=(key:string,text:string)=><label key={key} className="check-field"><input type="checkbox" checked={value(key)==='1'} onChange={e=>set(key,e.target.checked?'1':'')}/>{text}</label>;
 const select=(key:string,text:string,choices:Choice[])=><label key={key} className="field"><span>{text}</span><select value={value(key)} onChange={e=>set(key,e.target.value)}><option value="">{t.any}</option>{choices.map(c=><option key={c.value} value={c.value}>{label(c)}</option>)}</select></label>;
 let heading=data.state.route==='rent'?`${t.homes} ${t.forRent}`:data.state.route==='invest'?t.investment:`${t.homes} ${t.forSale}`;
 if(data.state.types.length===1){const name=typeNames[language][data.state.types[0]];heading=language==='en'?`${name}${['land','commercial'].includes(data.state.types[0])?'':'s'} ${data.state.route==='rent'?t.forRent:t.forSale}`:`${name}${data.state.route==='rent'?t.forRent:t.forSale}`;}
 if(data.locationName)heading+=language==='th'?`ใน${data.locationName}`:` in ${data.locationName}`;
 const panelTitle=open?({location:t.location,intent:t.intent,price:t.price,beds:t.beds,type:t.type,more:t.more})[open]:'';
 return <section ref={page} className={`results-page${mapOn?' with-map':''}`} aria-busy={pending}>
  <div className="results-filter-bar">
   <button type="button" className="results-location" aria-haspopup="dialog" onClick={e=>show('location',e)}>⌕ {data.locationName||data.state.loc||t.selectLocation}</button>
   {(['intent','price','beds','type','more'] as FilterPanel[]).map(panel=><button type="button" className="filter-button" key={panel} aria-haspopup="dialog" aria-expanded={open===panel} onClick={e=>show(panel,e)}>{panel==='intent'?(data.state.route==='rent'?t.rent:t.sale):panel==='price'?t.price:panel==='beds'?t.beds:panel==='type'?t.type:t.more} {panel!=='more'?'▾':''}</button>)}
   <button type="button" className="filter-button save-search" disabled title={t.saveLater}>♡ {t.saveSearch}</button>
   <button type="button" className="filter-button map-toggle" aria-pressed={mapOn} onClick={toggleMap}>{mapOn?t.hideMap:t.showMap}</button>
  </div>
  {data.demo?<p className="demo-notice" role="note">{t.demo}</p>:null}
  {currency==='USD'?<p className="currency-notice">{t.currency}</p>:null}
  <div className="results-body">
  <div className="results-list">
   <div className="results-heading"><div><h1>{heading}</h1><span className="small muted" aria-live="polite">{data.total} {t.results}</span></div>
    <label className="sort-control"><span>{t.sort}</span><select aria-label={t.sort} value={data.state.sort} onChange={e=>change('sort',e.target.value)}>{sorts.map(s=><option value={s} key={s}>{t[s]}</option>)}</select></label>
   </div>
   <div className="active-filters" aria-label={t.active}>{active.map(([key,v],i)=><button type="button" key={`${key}-${v}-${i}`} className="chip on" aria-label={`${t.remove}: ${chipLabel(key,v)}`} onClick={()=>remove(key,v)}>{chipLabel(key,v)} ×</button>)}{active.length?<button type="button" className="clear-filters" onClick={clear}>{t.clear}</button>:null}
    {[['near',t.near,'bts'],['fq',t.fq,'1'],['pet',t.pet,'1'],['video',t.video,'1']].filter(([key])=>!data.state.values[key]).map(([key,text,v])=><button type="button" className="chip" key={key} onClick={()=>change(key,v)}>{text}</button>)}
   </div>
   <p className="results-progress sr-only" role="status">{pending?t.loading:''}</p>
   {data.error?<p className="search-error" role="alert">{data.error==='input'?t.invalid:t.failed}</p>:null}
   {!data.items.length?<div className="results-empty"><h2>{t.empty}</h2><Button onClick={()=>active.length?remove(...active[active.length-1]):clear()}>{active.length?t.clearLast:t.clear}</Button><Button disabled title={t.saveLater}>{t.saveSearch}</Button></div>:<div className="listing-grid">{data.items.map(listing=><div key={listing.id} className="listing-cell" data-listing-cell={listing.id} data-highlighted={mapOn&&highlighted===listing.id?'true':undefined} {...(mapOn?{onMouseEnter:()=>setHighlighted(listing.id),onMouseLeave:()=>setHighlighted(null),onFocus:()=>setHighlighted(listing.id),onBlur:()=>setHighlighted(null)}:{})}><ListingCard listing={listing} language={language} investment={data.state.route==='invest'}/></div>)}</div>}
   {data.hasMore?<div className="show-more"><Button disabled={pending} onClick={()=>navigate({...data.state,page:data.state.page+1})}>{t.showMore}</Button></div>:null}
  </div>
  {mapOn?<aside className="results-map" aria-label={t.mapLabel}>
   <ResultsMap pins={pins} language={language} bbox={data.state.values.bbox} highlighted={highlighted} searchAsMove={searchAsMove} labels={{map:t.mapLabel,area:t.areaOnly,failed:t.mapFailed}} onHighlight={setHighlighted} onSelect={selectPin} onMove={moved}/>
   <label className="map-search-toggle check-field"><input type="checkbox" checked={searchAsMove} onChange={e=>setSearchAsMove(e.target.checked)}/>{t.searchAsMove}</label>
   {!pins.length?<p className="map-note" role="status">{t.mapNone}</p>:pins.length>=500?<p className="map-note" role="status">{t.mapMore}</p>:null}
   {previewItem?<div className="map-preview"><button type="button" className="icon-button map-preview-close" aria-label={t.close} onClick={()=>setPreview(null)}>×</button><ListingCard listing={previewItem} language={language} investment={data.state.route==='invest'}/></div>:null}
  </aside>:null}
  </div>
  <button type="button" className="map-pill" aria-pressed={mapOn} onClick={toggleMap}>{mapOn?`${t.listPill} ☰`:`${t.mapPill} ⌖`}</button>
  <Modal open={open!==null} title={panelTitle} closeLabel={t.close} onClose={()=>setOpen(null)} sheet className="search-filter-modal" style={position}>
   <form className="filter-form" onSubmit={e=>{e.preventDefault();apply();}}>
   {open==='location'?<><Input label={t.location} list="search-locations" value={value('loc')} onChange={e=>set('loc',e.target.value)} autoFocus/><datalist id="search-locations">{data.metadata.locations.concat(data.metadata.stations).map(c=><option key={c.value} value={c.value}>{label(c)}</option>)}</datalist></>:null}
   {open==='intent'?<label className="field"><span>{t.intent}</span><select value={draftRoute} onChange={e=>setDraftRoute(e.target.value as SearchRoute)}><option value="buy">{t.sale}</option><option value="rent">{t.rent}</option><option value="invest">{t.investment}</option></select></label>:null}
   {open==='price'?<><div className="price-histogram" role="img" aria-label={t.histogram}>{data.histogram.map((bin,i)=><span key={i} title={`฿${Math.round(bin.min)}–${Math.round(bin.max)}: ${bin.count}`} style={{height:`${Math.max(8,bin.count/Math.max(...data.histogram.map(b=>b.count),1)*100)}%`}}/>)}</div><div className="filter-pair">{numberInput('min',t.min)}{numberInput('max',t.max)}</div><span className="small" aria-live="polite">{liveCount===null?t.loading:`${liveCount} ${t.results}`}</span></>:null}
   {open==='beds'?<label className="field"><span>{t.beds}</span><select value={value('beds')} onChange={e=>set('beds',e.target.value)}><option value="">{t.any}</option>{[0,1,2,3,4,5].map(n=><option value={String(n)} key={n}>{n}+</option>)}</select></label>:null}
   {open==='type'?<fieldset className="type-options"><legend>{t.type}</legend>{propertyTypes.filter(type=>draftRoute!=='invest'||['land','hotel','commercial'].includes(type)).map(type=><label className="check-field" key={type}><input type="checkbox" checked={value('type').split(',').includes(type)} onChange={e=>{const types=value('type').split(',').filter(Boolean).filter(v=>v!==type);if(e.target.checked)types.push(type);set('type',types.join(','));}}/>{typeNames[language][type]}</label>)}</fieldset>:null}
   {open==='more'?<><div className="filter-pair">{numberInput('baths',t.baths)}{numberInput('size',t.minSize)}{numberInput('land',t.minLand)}{numberInput('distance',t.distance)}{numberInput('year',t.built)}{select('near',t.station,['BTS','MRT','ARL','SRT'].map(line=>({value:line.toLowerCase(),nameTh:line,nameEn:line})))}{select('project',t.project,data.metadata.projects)}</div><div className="filter-checks">{check('fq',t.fq)}{check('pet',t.pet)}{check('furnished',t.furnished)}{check('video',t.video)}</div>
    {data.metadata.filters.filter(d=>!value('type')||value('type').split(',').every(type=>d.types.includes(type as typeof propertyTypes[number]))).map(d=>{
     const key=`filter.${d.value}`;
     if(d.kind==='number')return numberInput(key,`${label(d)} (${t.minimum})`);
     if(d.kind==='boolean')return select(key,label(d),[{value:'true',nameTh:'ใช่',nameEn:'Yes'},{value:'false',nameTh:'ไม่',nameEn:'No'}]);
     if(d.kind==='single')return select(key,label(d),d.options);
     return <fieldset className="type-options" key={key}><legend>{label(d)}</legend>{d.options.map(option=><label className="check-field" key={option.value}><input type="checkbox" checked={draft.getAll(key).includes(option.value)} onChange={e=>setDraft(previous=>{const next=new URLSearchParams(previous);const options=next.getAll(key).filter(v=>v!==option.value);next.delete(key);if(e.target.checked)options.push(option.value);for(const option of options)next.append(key,option);next.delete('page');return next;})}/>{label(option)}</label>)}</fieldset>;
    })}</>:null}
   {error?<p role="alert">{error}</p>:null}
   <div className="filter-actions"><Button onClick={()=>setDraft(new URLSearchParams())}>{t.clear}</Button><Button type="submit" variant="acc">{t.apply}</Button></div>
   </form>
  </Modal>
 </section>;
}
