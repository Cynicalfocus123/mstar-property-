import type { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { copy, isLanguage } from '@/lib/i18n';
import { Header, BottomNavigation } from '@/components/site-shell';
import { Footer } from '@/components/footer';
import '@fontsource/prompt/400.css';
import '@fontsource/prompt/500.css';
import '@fontsource/prompt/600.css';
import '@fontsource/noto-sans-thai/400.css';
import '@fontsource/noto-sans-thai/500.css';
import '@fontsource/noto-sans-thai/600.css';
import '../globals.css';

export const viewport: Viewport={width:'device-width',initialScale:1,viewportFit:'cover',themeColor:'#ffffff'};
export async function generateMetadata({params}:{params:Promise<{lang:string}>}):Promise<Metadata>{
  const {lang}=await params; if(!isLanguage(lang))return {};
  return {title:{default:'Mstar Property',template:'%s | Mstar Property'},description:copy[lang].lead,
    metadataBase:new URL(process.env.SITE_URL || 'http://localhost:3000'),icons:{icon:'/crest.svg'}};
}
export default async function Layout({children,params}:{children:React.ReactNode;params:Promise<{lang:string}>}){
  const {lang}=await params; if(!isLanguage(lang))notFound();
  const preference=(await cookies()).get('mstar-currency')?.value;
  const currency=preference==='USD'?'USD':'THB';
  return <html lang={lang}><body><Suspense><Header language={lang} currency={currency}/></Suspense>
    <main id="main" tabIndex={-1}>{children}</main><Footer language={lang}/><BottomNavigation language={lang}/>
  </body></html>;
}
