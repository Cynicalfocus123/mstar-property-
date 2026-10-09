'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { copy, type Language } from '@/lib/i18n';
import { Button, Input, Modal, Tabs } from './ui';
import { parseSearch, searchHref, type SearchRoute } from '@/lib/search-state';

export function SearchField({language}:{language:Language}){
  const t=copy[language]; const router=useRouter();
  const [intent,setIntent]=useState('buy'); const [location,setLocation]=useState(''); const [sheet,setSheet]=useState(false);
  const items=[{value:'buy',label:t.buy},{value:'rent',label:t.rent},{value:'projects',label:t.projects},{value:'invest',label:t.invest}];
  function search(){const params=new URLSearchParams();if(location.trim())params.set('loc',location.trim());router.push(intent==='projects'?`/${language}/projects${params.size?'?'+params.toString():''}`:searchHref(language,parseSearch(params,intent as SearchRoute)));setSheet(false);}
  return <div className="search-box">
    <Tabs items={items} value={intent} onChange={setIntent} label={t.search}/>
    <form className="search-fields" onSubmit={event=>{event.preventDefault();search();}}>
      <Input className="desktop-location" label={t.location} placeholder={t.locationHint} value={location} onChange={event=>setLocation(event.target.value)} />
      <button type="button" className="phone-location" onClick={()=>setSheet(true)}>{location||t.where}</button>
      <div className="search-detail"><strong>{t.type}</strong><span>{t.anyType}</span></div>
      <div className="search-detail"><strong>{intent==='invest'?t.budget:t.price}</strong><span>{t.anyPrice}</span></div>
      <div className="search-detail"><strong>{t.beds}</strong><span>{t.anyBeds}</span></div>
      <Button type="submit" variant="acc" className="search-go" aria-label={t.search}>⌕</Button>
    </form>
    <Modal open={sheet} title={t.search} closeLabel={t.close} onClose={()=>setSheet(false)} sheet>
      <form className="preference-fields" onSubmit={event=>{event.preventDefault();search();}}><Input label={t.location} placeholder={t.locationHint} value={location} onChange={event=>setLocation(event.target.value)} autoFocus/><Button type="submit" variant="acc">{t.search}</Button></form>
    </Modal>
  </div>;
}
