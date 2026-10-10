import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { copy, isLanguage } from '@/lib/i18n';
import { SearchField } from '@/components/search-field';
import {cookies,headers} from 'next/headers';
import {homeListings} from '@/lib/home-listings';
import {HomeListingRows} from '@/components/home-listing-rows';
import {searchCopy} from '@/lib/search-copy';

export async function generateMetadata({params}:{params:Promise<{lang:string}>}):Promise<Metadata>{
  const {lang}=await params; if(!isLanguage(lang))return {};
  return {title:copy[lang].hero,alternates:{canonical:`/${lang}`,languages:{th:'/th',en:'/en'}}};
}
export default async function Home({params}:{params:Promise<{lang:string}>}){
  const {lang}=await params; if(!isLanguage(lang))notFound(); const t=copy[lang];
  let rows:Awaited<ReturnType<typeof homeListings>>=[],unavailable=false;
  try{rows=await homeListings(lang,(await headers()).get('host')||'');}catch{unavailable=true;}
  return <><section className="foundation-hero"><h1>{t.hero}</h1><p className="hero-lead">{t.lead}</p><SearchField language={lang}/></section>
   {unavailable?<p role="alert" className="search-error home-search-error">{searchCopy[lang].failed}</p>:<HomeListingRows rows={rows} language={lang} currency={(await cookies()).get('mstar-currency')?.value||'THB'}/>}
  </>;
}
