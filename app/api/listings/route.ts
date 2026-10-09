import {NextRequest,NextResponse} from 'next/server';
import {listingSearch,localDemoEnabled} from '@/lib/listing-search';
import {parseSearch,SearchInputError} from '@/lib/search-state';
import {isLanguage} from '@/lib/i18n';
export const dynamic='force-dynamic';
export async function GET(request:NextRequest){
 const query=request.nextUrl.searchParams,route=query.get('route')||'buy',language=query.get('lang')||'th';
 if(!['buy','rent','invest'].includes(route)||!isLanguage(language))return NextResponse.json({error:'Invalid search.'},{status:400});
 try {const data=await listingSearch(parseSearch(query,route as 'buy'|'rent'|'invest'),language,localDemoEnabled(request.headers.get('host')||''));return NextResponse.json(data,{headers:{'Cache-Control':'private, no-store'}});}catch(error){return NextResponse.json({error:error instanceof SearchInputError?'Invalid search filters.':'Search unavailable.'},{status:error instanceof SearchInputError?400:503,headers:{'Cache-Control':'no-store'}});}
}
