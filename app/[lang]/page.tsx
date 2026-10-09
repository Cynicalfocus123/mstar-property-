import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { copy, isLanguage } from '@/lib/i18n';
import { SearchField } from '@/components/search-field';

export async function generateMetadata({params}:{params:Promise<{lang:string}>}):Promise<Metadata>{
  const {lang}=await params; if(!isLanguage(lang))return {};
  return {title:copy[lang].hero,alternates:{canonical:`/${lang}`,languages:{th:'/th',en:'/en'}}};
}
export default async function Home({params}:{params:Promise<{lang:string}>}){
  const {lang}=await params; if(!isLanguage(lang))notFound(); const t=copy[lang];
  return <section className="foundation-hero"><h1>{t.hero}</h1><p className="hero-lead">{t.lead}</p><SearchField language={lang}/></section>;
}
