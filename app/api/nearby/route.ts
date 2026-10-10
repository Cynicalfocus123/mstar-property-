import {NextRequest,NextResponse} from 'next/server';
import {listingNearby} from '@/lib/nearby';
import {localDemoEnabled} from '@/lib/listing-search';
import {isLanguage} from '@/lib/i18n';
export const dynamic='force-dynamic';
// GET /api/nearby?listing=<code>&lang=th|en — straight-line distances from imported OpenStreetMap places.
export async function GET(request:NextRequest){
 const code=request.nextUrl.searchParams.get('listing')||'',language=request.nextUrl.searchParams.get('lang')||'th';
 if(!/^[A-Za-z0-9_-]{1,80}$/.test(code)||!isLanguage(language))return NextResponse.json({error:'Invalid request.'},{status:400});
 try {
  const data=await listingNearby(code,language,localDemoEnabled(request.headers.get('host')||''));
  return data?NextResponse.json(data,{headers:{'Cache-Control':'private, no-store'}}):NextResponse.json({error:'Listing not found.'},{status:404});
 }catch{return NextResponse.json({error:'Nearby places unavailable.'},{status:503,headers:{'Cache-Control':'no-store'}});}
}
