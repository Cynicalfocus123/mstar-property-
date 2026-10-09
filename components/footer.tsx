import Link from 'next/link';
import { copy, type Language } from '@/lib/i18n';

export function Footer({language}:{language:Language}){
  const t=copy[language];
  const line=process.env.NEXT_PUBLIC_LINE_ID;
  return <footer className="footer">
    <div><strong>Mstar Property Development</strong><p>{t.hours}</p>{line?<p>LINE: {line}</p>:null}</div>
    <div><strong>{t.buy} &amp; {t.rent}</strong>{[['bangkok','Bangkok','กรุงเทพฯ'],['pattaya','Pattaya','พัทยา'],['phuket','Phuket','ภูเก็ต'],['rayong','Rayong','ระยอง']].map(([slug,en,th])=><Link key={slug} href={`/${language}/buy?loc=${slug}`}>{language==='th'?th:en}</Link>)}</div>
    <div><strong>{t.company}</strong><Link href={`/${language}/about`}>{t.about}</Link><Link href={`/${language}/services`}>{t.services}</Link></div>
    <div><strong>{t.help}</strong><Link href={`/${language}/guide/foreign-buyers`}>{t.guide}</Link><Link href={`/${language}/contact`}>{t.contact}</Link><Link href={`/${language}/privacy`}>{t.privacy}</Link></div>
  </footer>;
}
