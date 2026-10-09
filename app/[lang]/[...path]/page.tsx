import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { copy, isLanguage } from '@/lib/i18n';
import { ChatButtons } from '@/components/chat-buttons';

const routes=['buy','rent','projects','invest','services','saved','account','home-value','about','contact','privacy','guide/foreign-buyers'];
function pageTitle(lang:'th'|'en',path:string){
  const t=copy[lang];const titles:Record<string,string>={buy:t.sale,rent:t.renting,projects:t.projects,invest:t.investing,services:t.services,saved:t.saved,account:t.account,'home-value':t.valuation,about:t.about,contact:t.contact,privacy:t.privacy,'guide/foreign-buyers':t.guide};
  return titles[path];
}
export async function generateMetadata({params}:{params:Promise<{lang:string;path:string[]}>}):Promise<Metadata>{
  const {lang,path}=await params;const route=path.join('/');if(!isLanguage(lang)||!routes.includes(route))return {};
  return {title:pageTitle(lang,route),robots:{index:false,follow:true},alternates:{canonical:`/${lang}/${route}`,languages:{th:`/th/${route}`,en:`/en/${route}`}}};
}
export default async function PlannedPage({params}:{params:Promise<{lang:string;path:string[]}>}){
  const {lang,path}=await params;const route=path.join('/');if(!isLanguage(lang)||!routes.includes(route))notFound();
  const t=copy[lang];return <section className="page-content"><h1>{pageTitle(lang,route)}</h1><p className="muted">{route==='account'?t.authPending:t.pending}</p>{route==='contact'?<ChatButtons language={lang}/>:null}</section>;
}
