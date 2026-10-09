'use client';
import Image from 'next/image';
import Link from 'next/link';
import {useEffect,useRef,useState} from 'react';
import type {Language} from '@/lib/i18n';
import type {ListingCardData} from '@/lib/listing-types';
import {typeNames} from '@/lib/search-state';
import {searchCopy} from '@/lib/search-copy';
import {Button,Input,Modal} from './ui';
import {ChatButtons} from './chat-buttons';

const storageKey='mstar-saved-homes';
function readSaved():string[]{try{const value=JSON.parse(localStorage.getItem(storageKey)||'[]');return Array.isArray(value)?value.filter(v=>typeof v==='string').slice(0,500):[];}catch{return [];}}
export function ListingCard({listing:l,language,investment=false}:{listing:ListingCardData;language:Language;investment?:boolean}){
 const t=searchCopy[language],[photo,setPhoto]=useState(0),[saved,setSaved]=useState(false),[contact,setContact]=useState(false),[storageError,setStorageError]=useState(false),[imageError,setImageError]=useState(false);
 const start=useRef<number|null>(null),swiped=useRef(0);
 useEffect(()=>{const sync=()=>setSaved(readSaved().includes(l.id));sync();window.addEventListener('storage',sync);window.addEventListener('mstar-saved-homes',sync);return()=>{window.removeEventListener('storage',sync);window.removeEventListener('mstar-saved-homes',sync);};},[l.id]);
 const amount=(v:number)=>language==='th'?`${v.toLocaleString('en-US')} บาท`:`฿${v.toLocaleString('en-US')}`;
 const next=()=>{setPhoto(p=>(p+1)%l.photos.length);setImageError(false);};
 function toggle(){try{const ids=readSaved();localStorage.setItem(storageKey,JSON.stringify(saved?ids.filter(id=>id!==l.id):[...new Set([...ids,l.id])].slice(-500)));setStorageError(false);window.dispatchEvent(new Event('mstar-saved-homes'));}catch{setStorageError(true);}}
 const facts:Array<[number|string,string]>=[];
 if(l.type==='land'){const wah=l.land||0;facts.push([Math.floor(wah/400),language==='th'?'ไร่':'rai'],[Math.floor(wah%400/100),language==='th'?'งาน':'ngan'],[wah*4,'m²']);if(l.frontage!==null)facts.push([`${l.frontage} m`,t.road]);}
 else if(l.type==='hotel'){if(l.rooms!==null)facts.push([l.rooms,t.rooms]);if(l.occupancy!==null)facts.push([`${l.occupancy}%`,t.occupancy]);if(l.land!==null)facts.push([l.land/400,`${language==='th'?'ไร่':'rai'} ${t.land}`]);}
 else {if(l.beds!==null)facts.push([l.beds,t.bed]);if(l.baths!==null)facts.push([l.baths,t.bath]);if(l.size!==null)facts.push([l.size,'m²']);if(l.type!=='condo'&&l.land!==null)facts.push([l.land,language==='th'?'ตร.ว. ที่ดิน':'sq. wah land']);if(l.stationDistance!==null)facts.push([`${l.stationDistance} m`,language==='th'?'ถึง BTS':'to BTS']);}
 const status=`${typeNames[language][l.type]} ${l.intent==='rent'?t.forRent:t.forSale}`;
 return <>
 <article className="lcard" data-listing-id={l.id} data-intent={l.intent} onTouchStart={e=>{if((e.target as HTMLElement).closest('button'))return;start.current=e.touches[0].clientX;swiped.current=0;}} onTouchEnd={e=>{if(start.current!==null&&l.photos.length>1){const delta=e.changedTouches[0].clientX-start.current;if(Math.abs(delta)>40){swiped.current=Date.now()+400;setPhoto(p=>(p+(delta<0?1:l.photos.length-1))%l.photos.length);setImageError(false);}}start.current=null;}}>
  <Link className="lcard-link" href={`/${language}/property/${l.code}-${l.slug}`} aria-label={`${status}, ${l.title}`} onClick={e=>{if(e.detail>0&&Date.now()<swiped.current)e.preventDefault();swiped.current=0;}}><span className="sr-only">{l.title}</span></Link>
  <div className="listing-photo">
   {l.photos[photo]&&!imageError?<Image src={l.photos[photo].url} alt={l.photos[photo].alt} fill sizes="(max-width:720px) calc(100vw - 32px), (max-width:1000px) 46vw, 27vw" unoptimized={l.photos[photo].url.endsWith('.svg')} onError={()=>setImageError(true)}/>:<span className="photo-unavailable">{t.unavailablePhoto}</span>}
   <div className="listing-tags">{l.demo?<span className="listing-badge">{t.demoBadge}</span>:null}{l.featured?<span className="listing-badge">{t.featured}</span>:null}{l.isNew?<span className="listing-badge">{t.new}</span>:null}{l.video?<span className="listing-badge">{t.video}</span>:null}{l.mstar?<span className="listing-badge accent-badge">{t.mstar}</span>:null}{investment?<span className="listing-badge accent-badge">{t.investment}</span>:null}</div>
   {l.photos.length>1?<button type="button" className="nextph" aria-label={t.nextPhoto} onClick={next}>›</button>:null}
   <button type="button" className="heart" aria-label={saved?t.unsave:t.save} aria-pressed={saved} onClick={toggle}>{saved?'♥':'♡'}</button>
   {l.photos.length>1?<div className="photo-dots" aria-label={`${t.photo} ${photo+1} / ${l.photos.length}`}>{l.photos.map((_,i)=><button type="button" key={i} aria-label={`${t.photo} ${i+1}`} aria-current={photo===i?'true':undefined} onClick={()=>{setPhoto(i);setImageError(false);}}><span className={i===photo?'on':''}/></button>)}</div>:null}
  </div>
  <div className="lbody"><div className="lstat"><i className={investment?'inv':l.intent==='rent'?'rent':''}/>{status}</div>
   <div className="lprice">{l.price===null?t.gated:amount(l.price)}{l.intent==='rent'&&l.price!==null?<small>{l.period==='year'?t.year:t.month}</small>:null}{l.price!==null&&l.previousPrice!==null&&l.previousPrice>l.price?<span className="price-drop">↓ {amount(l.previousPrice-l.price)}</span>:null}</div>
   <div className="lfacts">{facts.map(([n,label],i)=><span key={i}><b>{typeof n==='number'?n.toLocaleString('en-US'):n}</b> {label}</span>)}</div>
   <div className="lfoot"><div className="laddr">{l.address||l.title}<br/>{l.area}</div><button type="button" className="contact" onClick={()=>setContact(true)}>{t.contact}</button></div>
   {storageError?<p role="alert" className="small">{t.storage}</p>:null}
  </div>
 </article>
 <Modal open={contact} title={t.contactTitle} closeLabel={t.close} onClose={()=>setContact(false)} className="contact-modal">
  <div className="contact-summary"><strong>{status} · {l.price===null?t.gated:amount(l.price)}</strong><span className="small">{l.title}<br/>{l.area}</span></div>
  <form className="contact-fields" onSubmit={e=>e.preventDefault()}>
   <Input label={`${t.fullName} *`} required autoComplete="name" autoFocus/>
   <Input label={`${t.email} *`} type="email" required autoComplete="email"/>
   <Input label={`${t.phone} *`} type="tel" required autoComplete="tel"/>
   <label className="field"><span>{t.message}</span><textarea rows={3} maxLength={2000} defaultValue={language==='th'?`สนใจ ${l.title} (${l.code})`:`I'm interested in ${l.title} (${l.code}).`}/></label>
   <label className="check-field"><input type="checkbox"/>{t.loan}</label>
   <Button type="submit" variant="acc" disabled aria-describedby={`submit-${l.id}`}>{t.emailAgent}</Button>
   <p id={`submit-${l.id}`} className="small muted">{t.submitLater}</p><p className="small muted">{t.consent} <Link href={`/${language}/privacy`}>{t.privacy}</Link></p>
   <ChatButtons language={language}/>
  </form>
 </Modal>
 </>;
}
