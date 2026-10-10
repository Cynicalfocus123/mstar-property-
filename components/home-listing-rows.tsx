'use client';
import Link from 'next/link';
import {useEffect,useRef,useState} from 'react';
import type {Language} from '@/lib/i18n';
import type {HomeListingRow} from '@/lib/home-listings';
import {searchCopy} from '@/lib/search-copy';
import {SmallListingCard} from './small-listing-card';
function ListingRow({row,language}:{row:HomeListingRow;language:Language}){
 const rail=useRef<HTMLDivElement>(null),[edges,setEdges]=useState({start:true,end:true});
 useEffect(()=>{const element=rail.current;if(!element)return;const update=()=>setEdges({start:element.scrollLeft<2,end:element.scrollLeft+element.clientWidth>=element.scrollWidth-2});const observer=new ResizeObserver(update);observer.observe(element);element.addEventListener('scroll',update,{passive:true});update();return()=>{observer.disconnect();element.removeEventListener('scroll',update);};},[]);
 const move=(direction:number)=>rail.current?.scrollBy({left:direction*rail.current.clientWidth,behavior:'auto'});
 return <section className="home-listing-row" data-row-id={row.id} aria-labelledby={`row-${row.id}`}>
  <div className="home-row-header"><Link className="home-row-heading" href={row.href}><h2 id={`row-${row.id}`}>{row.title}</h2><span className="home-row-go" aria-hidden="true">→</span></Link>
   <div className="home-row-arrows"><button type="button" disabled={edges.start} onClick={()=>move(-1)} aria-label={`${language==='th'?'ก่อนหน้า':'Previous'}: ${row.title}`}>‹</button><button type="button" disabled={edges.end} onClick={()=>move(1)} aria-label={`${language==='th'?'ถัดไป':'Next'}: ${row.title}`}>›</button></div>
  </div>
  <div className="home-rail" ref={rail} role="list" aria-label={row.title} tabIndex={0}>{row.items.map(listing=><SmallListingCard key={listing.id} listing={listing} language={language} investment={row.investment}/>)}</div>
 </section>;
}
export function HomeListingRows({rows,language,currency}:{rows:HomeListingRow[];language:Language;currency:string}){
 if(!rows.length)return null;
 return <div className="home-listing-rows">
  {rows.some(row=>row.items.some(item=>item.demo))?<p className="demo-notice">{searchCopy[language].demo}</p>:null}
  {currency==='USD'?<p className="currency-notice">{searchCopy[language].currency}</p>:null}
  {rows.map(row=><ListingRow key={row.id} row={row} language={language}/>)}
 </div>;
}
