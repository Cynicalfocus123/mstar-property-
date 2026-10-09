import type {Metadata} from 'next';
import {ResultsPage} from '@/components/results-page';
export const dynamic='force-dynamic';
export async function generateMetadata({params}:{params:Promise<{lang:string}>}):Promise<Metadata>{const {lang}=await params;return {title:lang==='th'?'อสังหาริมทรัพย์ขาย':'Homes for sale',alternates:{canonical:`/${lang}/buy`,languages:{th:'/th/buy',en:'/en/buy'}}};}
export default function Page(props:{params:Promise<{lang:string}>;searchParams:Promise<Record<string,string|string[]|undefined>>}){return <ResultsPage {...props} route="buy"/>;}
