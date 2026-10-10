import 'server-only';
import type {Language} from './i18n';
import {listingSearch,localDemoEnabled} from './listing-search';
import {parseSearch,searchHref} from './search-state';
import {homeRowsConfig,sampleHomeRowsConfig} from './home-rows-config';
import type {ListingCardData} from './listing-types';
export type HomeListingRow={id:string;title:string;href:string;investment:boolean;items:ListingCardData[]};
export async function homeListings(language:Language,host:string):Promise<HomeListingRow[]>{
 const demo=localDemoEnabled(host),config=demo?sampleHomeRowsConfig:homeRowsConfig;
 const rows=await Promise.all(config.map(async row=>{
  const state=parseSearch(new URLSearchParams(row.query),row.route);
  const results=await listingSearch(state,language,demo,{featuredFirst:true});
  return {id:row.id,title:row.title[language],href:searchHref(language,state),investment:row.route==='invest',items:results.items};
 }));
 return rows.filter(row=>row.items.length>0);
}
