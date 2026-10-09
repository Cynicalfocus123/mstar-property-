'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { copy, type Language } from '@/lib/i18n';
import { Button, Modal } from './ui';

function Icon({ kind }: {kind:'home'|'search'|'heart'|'chat'|'account'}) {
  const paths={home:'M3 10 12 3l9 7v11h-6v-7H9v7H3Z',search:'M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',heart:'M12 21 3 12C-3 5 6-1 12 6c6-7 15-1 9 6Z',chat:'M3 3h18v14H9l-6 4Z',account:'M20 21v-2a8 8 0 0 0-16 0v2M16 6a4 4 0 1 1-8 0 4 4 0 0 1 8 0'};
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[kind]}/></svg>;
}
export function Header({ language, currency }: {language:Language;currency:'THB'|'USD'}) {
  const t=copy[language]; const pathname=usePathname(); const router=useRouter(); const query=useSearchParams();
  const [open,setOpen]=useState(false); const [nextLanguage,setNextLanguage]=useState<Language>(language);
  const [nextCurrency,setNextCurrency]=useState(currency); const [saving,setSaving]=useState(false); const [error,setError]=useState('');
  const links=[['buy',t.buy],['rent',t.rent],['projects',t.projects],['invest',t.invest],['services',t.services]];
  async function apply(){
    setSaving(true);setError('');
    try{
      const response=await fetch('/api/preferences',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({language:nextLanguage,currency:nextCurrency})});
      if(!response.ok)throw new Error('Preference request failed');
      const nextPath=pathname.replace(/^\/(th|en)(?=\/|$)/,`/${nextLanguage}`);
      setOpen(false);router.push(`${nextPath}${query.size?'?'+query.toString():''}`);router.refresh();
    }catch{setError(language==='th'?'บันทึกไม่สำเร็จ กรุณาลองอีกครั้ง':'Could not save. Please try again.');}finally{setSaving(false);}
  }
  return <>
    <a className="skip-link" href="#main">{t.skip}</a>
    <header className="header">
      <Link href={`/${language}`} className="logo" aria-label="Mstar Property"><img src="/crest.svg" width="40" height="44" alt="Mstar Property" /></Link>
      <nav className="main-nav" aria-label={language==='th'?'เมนูหลัก':'Main navigation'}>{links.map(([path,label])=><Link key={path} href={`/${language}/${path}`} aria-current={pathname===`/${language}/${path}`?'page':undefined}>{label}</Link>)}</nav>
      <div className="header-right">
        <button className="ghost preferences-trigger" onClick={()=>{setNextLanguage(language);setNextCurrency(currency);setOpen(true);}} aria-label={t.preferences}>{language.toUpperCase()} · {currency==='THB'?'฿':'USD'}</button>
        <Link className="ghost hide-phone" href={`/${language}/saved`}>♡ {t.saved}</Link>
        <Link className="ghost list-property" href={`/${language}/home-value`}>{t.list}</Link>
        <Link className="signin" href={`/${language}/account`}>{t.signin}</Link>
      </div>
    </header>
    <Modal open={open} title={t.preferences} closeLabel={t.close} onClose={()=>setOpen(false)}>
      <div className="preference-fields"><label>{t.language}<select value={nextLanguage} onChange={event=>setNextLanguage(event.target.value as Language)}><option value="th">ไทย</option><option value="en">English</option></select></label>
      <label>{t.currency}<select value={nextCurrency} onChange={event=>setNextCurrency(event.target.value as 'THB'|'USD')}><option value="THB">THB — ฿</option><option value="USD">USD — US$</option></select></label>
      {error?<p role="alert">{error}</p>:null}<Button variant="acc" onClick={apply} disabled={saving}>{t.apply}</Button></div>
    </Modal>
  </>;
}
export function BottomNavigation({language}:{language:Language}){
  const t=copy[language]; const pathname=usePathname();
  const tabs=[['',t.explore,'home'],['buy',t.search,'search'],['saved',t.saved,'heart'],['contact',t.line,'chat'],['account',t.account,'account']] as const;
  if(pathname.includes('/property/'))return null;
  return <nav className="bottom-navigation" aria-label={language==='th'?'เมนูมือถือ':'Mobile navigation'}>{tabs.map(([path,label,kind])=>{
    const href=`/${language}${path?'/'+path:''}`;
    return <Link key={kind} href={href} aria-current={pathname===href?'page':undefined}><Icon kind={kind}/><span>{label}</span></Link>;
  })}</nav>;
}
