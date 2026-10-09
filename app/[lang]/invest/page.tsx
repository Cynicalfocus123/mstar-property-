import type {Metadata} from 'next';
import {ResultsPage} from '@/components/results-page';
export const dynamic='force-dynamic';
export async function generateMetadata({params}:{params:Promise<{lang:string}>}):Promise<Metadata>{const {lang}=await params;return {title:lang==='th'?'อสังหาริมทรัพย์เพื่อการลงทุน':'Investment properties',alternates:{canonical:`/${lang}/invest`,languages:{th:'/th/invest',en:'/en/invest'}}};}
export default function Page(props:{params:Promise<{lang:string}>;searchParams:Promise<Record<string,string|string[]|undefined>>}){return <ResultsPage {...props} route="invest"/>;}
