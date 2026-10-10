import type {Language} from './i18n';
import type {ListingCardData} from './listing-types';

export type ListingFact=[number|string,string];
export function squareFeet(squareMetres:number){return Math.round(squareMetres*10.7639);}
export function sizeFact(size:number|null,language:Language):ListingFact|null{
 return size===null||!Number.isFinite(size)||size<=0?null:[language==='en'?squareFeet(size):size,language==='en'?'sq ft':'ตร.ม.'];
}
function ordinal(value:number){const last=value%100;return `${value}${last>=11&&last<=13?'th':value%10===1?'st':value%10===2?'nd':value%10===3?'rd':'th'}`;}
export function listingFacts(l:ListingCardData,language:Language):ListingFact[]{
 const thai=language==='th',facts:ListingFact[]=[],add=(value:number|null,label:string)=>{if(value!==null&&Number.isFinite(value)&&value>=0)facts.push([value,label]);};
 if(['condo','house','townhouse','pool_villa'].includes(l.type)){add(l.beds,thai?'ห้องนอน':'bed');add(l.baths,thai?'ห้องน้ำ':'bath');}
 if(l.type==='condo'){if(l.floor!==null&&Number.isFinite(l.floor)&&l.floor>=0)facts.push([thai?l.floor:ordinal(l.floor),thai?'ชั้น':'floor']);}
 else if(l.type==='land'){facts.push(...landUnits(l.land,language));if(l.frontage!==null&&l.frontage>0)facts.push([l.frontage,thai?'ม. หน้ากว้างติดถนน':'m road frontage']);return facts;}
 else{
  if(l.type==='hotel')add(l.rooms,thai?'ห้อง':'rooms');
  if(l.buildingFloors!==null&&l.buildingFloors>0)add(l.buildingFloors,thai?'ชั้น':l.buildingFloors===1?'floor':'floors');
 }
 if(l.type==='hotel'){if(l.land!==null&&l.land>0)facts.push([l.land/400,thai?'ไร่ ที่ดิน':'rai land']);}
 else{
  const size=sizeFact(l.size,language);if(size)facts.push(size);
  if(l.type!=='condo')facts.push(...landUnits(l.land,language).map(([n,unit]):ListingFact=>[n,`${unit} ${thai?'ที่ดิน':'land'}`]));
 }
 return facts;
}
export function smallListingFacts(l:ListingCardData,language:Language):string[]{
 if(l.type==='land')return landUnits(l.land,language).map(([n,unit])=>`${n.toLocaleString('en-US')} ${unit}`);
 if(l.type==='hotel')return l.rooms===null||l.rooms<=0?[]:[`${l.rooms.toLocaleString('en-US')} ${language==='th'?'ห้อง':'rooms'}`];
 const facts:ListingFact[]=[];
 if(l.beds!==null&&l.beds>=0)facts.push([l.beds,language==='th'?'ห้องนอน':'bd']);
 if(l.baths!==null&&l.baths>0)facts.push([l.baths,language==='th'?'ห้องน้ำ':'ba']);
 const size=sizeFact(l.size,language);if(size)facts.push(size);
 return facts.map(([value,unit])=>`${typeof value==='number'?value.toLocaleString('en-US'):value} ${unit}`);
}
export function stationLabel(l:ListingCardData,language:Language){
 return l.stationDistance===null||!l.stationLine?'':`${l.stationDistance.toLocaleString('en-US')} ${language==='th'?'ม. ถึง':'m to'} ${l.stationLine}`;
}

// Round the total first so unit boundaries carry correctly; omit empty units.
export function landUnits(squareWah:number|null,language:Language):Array<[number,string]>{
 if(squareWah===null||!Number.isFinite(squareWah)||squareWah<=0)return [];
 const wah=Math.round(squareWah);
 return [[Math.floor(wah/400),language==='th'?'ไร่':'rai'],[Math.floor(wah%400/100),language==='th'?'งาน':'ngan'],[wah%100,language==='th'?'ตร.ว.':'sq. wah']].filter(([value])=>Number(value)>0) as Array<[number,string]>;
}
export function listingAmount(value:number,language:Language){return language==='th'?`${value.toLocaleString('en-US')} บาท`:`฿${value.toLocaleString('en-US')}`;}
