'use client';
import Image from 'next/image';
import Link from 'next/link';
import {useState} from 'react';
import type {Language} from '@/lib/i18n';
import type {ListingCardData} from '@/lib/listing-types';
import {searchCopy} from '@/lib/search-copy';
import {typeNames} from '@/lib/search-state';
import {landUnits,listingAmount} from '@/lib/listing-format';
import {useSavedHome} from '@/lib/saved-homes';
export function SmallListingCard({listing:l,language,investment=false}:{listing:ListingCardData;language:Language;investment?:boolean}){
 const t=searchCopy[language],{saved,storageError,toggle}=useSavedHome(l.id),[imageError,setImageError]=useState(false);
 const title=language==='th'?`${typeNames.th[l.type]}ใน${l.area}`:`${typeNames.en[l.type]} in ${l.area}`;
 const badge=l.demo?t.demoBadge:l.featured?t.featured:l.price!==null&&l.previousPrice!==null&&l.previousPrice>l.price?(language==='th'?'ราคาลดลง':'Price drop'):investment?t.investment:l.isNew?t.new:null;
 const facts=l.type==='land'?landUnits(l.land,language).map(([n,unit])=>`${n} ${unit}`):l.type==='hotel'?(l.rooms===null?[]:[`${l.rooms} ${t.rooms}`]):[l.beds===null?null:`${l.beds} ${language==='th'?t.bed:'bd'}`,l.size===null?null:`${l.size.toLocaleString('en-US')} m²`].filter(Boolean);
 return <article className="small-listing-card" data-listing-id={l.id} role="listitem">
  <Link className="small-card-link" href={`/${language}/property/${l.code}-${l.slug}`} aria-label={`${title}, ${l.title}`}><span className="sr-only">{l.title}</span></Link>
  <div className="small-card-photo">
   {l.photos[0]&&!imageError?<Image src={l.photos[0].url} alt={l.photos[0].alt} fill sizes="(max-width:720px) 42vw, (max-width:1080px) 23vw, (max-width:1250px) 18vw, (max-width:1440px) 15vw, 13vw" unoptimized={l.photos[0].url.endsWith('.svg')} onError={()=>setImageError(true)}/>:<span className="photo-unavailable">{t.unavailablePhoto}</span>}
   {badge?<span className={`listing-badge small-card-badge${l.demo?' sample-badge':''}`}>{badge}</span>:null}
   <button type="button" className="heart" aria-label={saved?t.unsave:t.save} aria-pressed={saved} onClick={toggle}>{saved?'♥':'♡'}</button>
  </div>
  <div className="small-card-title" title={title}>{title}</div>
  <div className="small-card-meta"><b>{l.price===null?t.gated:listingAmount(l.price,language)}{l.price!==null&&l.intent==='rent'?(l.period==='year'?t.year:language==='th'?t.month:' /mo'):null}</b>{facts.length?` · ${facts.join(' · ')}`:null}</div>
  {storageError?<p role="alert" className="small">{t.storage}</p>:null}
 </article>;
}
