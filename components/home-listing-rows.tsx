'use client';
import Link from 'next/link';
import {useEffect,useRef,useState} from 'react';
import type {Language} from '@/lib/i18n';
import type {HomeListingRow} from '@/lib/home-listings';
import {searchCopy} from '@/lib/search-copy';
import {SmallListingCard} from './small-listing-card';
import {cancelRailMotion,moveRail,settleRail} from '@/lib/motion';
function ListingRow({row,language}:{row:HomeListingRow;language:Language}){
 const rail=useRef<HTMLDivElement>(null),[edges,setEdges]=useState({start:true,end:true});
 useEffect(()=>{const element=rail.current;if(!element)return;const update=()=>setEdges({start:element.scrollLeft<2,end:element.scrollLeft+element.clientWidth>=element.scrollWidth-2});const resize=()=>{cancelRailMotion(element);update();};const settle=()=>settleRail(element);const observer=new ResizeObserver(resize);observer.observe(element);element.addEventListener('scroll',update,{passive:true});element.addEventListener('scrollend',settle);update();return()=>{cancelRailMotion(element);observer.disconnect();element.removeEventListener('scroll',update);element.removeEventListener('scrollend',settle);};},[]);
 const move=(direction:number)=>{if(rail.current)moveRail(rail.current,direction);};
 return <section className="home-listing-row" data-row-id={row.id} aria-labelledby={`row-${row.id}`}>
  <div className="home-row-header"><Link className="home-row-heading" href={row.href}><h2 id={`row-${row.id}`}>{row.title}</h2><span className="home-row-go" aria-hidden="true">→</span></Link>
   <div className="home-row-arrows"><button type="button" disabled={edges.start} onClick={()=>move(-1)} aria-label={`${language==='th'?'ก่อนหน้า':'Previous'}: ${row.title}`}>‹</button><button type="button" disabled={edges.end} onClick={()=>move(1)} aria-label={`${language==='th'?'ถัดไป':'Next'}: ${row.title}`}>›</button></div>
  </div>
  <div className="home-rail" ref={rail} role="list" aria-label={row.title} tabIndex={0} onKeyDown={event=>{if(event.target===event.currentTarget&&(event.key==='ArrowLeft'||event.key==='ArrowRight')){event.preventDefault();move(event.key==='ArrowRight'?1:-1);}}} onWheel={()=>{if(rail.current)cancelRailMotion(rail.current);}} onTouchStart={()=>{if(rail.current)cancelRailMotion(rail.current);}} onPointerDown={()=>{if(rail.current)cancelRailMotion(rail.current);}}>{row.items.map(listing=><SmallListingCard key={listing.id} listing={listing} language={language} investment={row.investment}/>)}</div>
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
