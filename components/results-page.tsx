import {cookies,headers} from 'next/headers';
import {notFound} from 'next/navigation';
import {isLanguage} from '@/lib/i18n';
import {listingSearch,localDemoEnabled} from '@/lib/listing-search';
import {parseSearch,SearchInputError,type SearchRoute} from '@/lib/search-state';
import type {SearchResults} from '@/lib/listing-types';
import {SearchResultsView} from './search-results';

export async function ResultsPage({params,searchParams,route}:{params:Promise<{lang:string}>;searchParams:Promise<Record<string,string|string[]|undefined>>;route:SearchRoute}){
 const {lang}=await params;if(!isLanguage(lang))notFound();
 const query=new URLSearchParams();for(const [k,v] of Object.entries(await searchParams))if(Array.isArray(v))for(const x of v)query.append(k,x);else if(v!==undefined)query.set(k,v);
 const demo=localDemoEnabled((await headers()).get('host')||'');
 let data:SearchResults;
 try {data=await listingSearch(parseSearch(query,route),lang,demo);}catch(error){data={state:parseSearch(new URLSearchParams(),route),items:[],total:0,hasMore:false,histogram:[],metadata:{locations:[],stations:[],projects:[],filters:[]},demo,locationName:null,error:error instanceof SearchInputError?'input':'database'};}
 return <SearchResultsView data={data} language={lang} currency={(await cookies()).get('mstar-currency')?.value||'THB'}/>;
}
