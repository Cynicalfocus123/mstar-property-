import type {Metadata} from 'next';
import {ResultsPage} from '@/components/results-page';
export const dynamic='force-dynamic';
export async function generateMetadata({params}:{params:Promise<{lang:string}>}):Promise<Metadata>{const {lang}=await params;return {title:lang==='th'?'อสังหาริมทรัพย์ให้เช่า':'Homes for rent',alternates:{canonical:`/${lang}/rent`,languages:{th:'/th/rent',en:'/en/rent'}}};}
export default function Page(props:{params:Promise<{lang:string}>;searchParams:Promise<Record<string,string|string[]|undefined>>}){return <ResultsPage {...props} route="rent"/>;}
