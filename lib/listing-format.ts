import type {Language} from './i18n';

// Round the total first so unit boundaries carry correctly; omit empty units.
export function landUnits(squareWah:number|null,language:Language):Array<[number,string]>{
 if(squareWah===null||!Number.isFinite(squareWah)||squareWah<=0)return [];
 const wah=Math.round(squareWah);
 return [[Math.floor(wah/400),language==='th'?'ไร่':'rai'],[Math.floor(wah%400/100),language==='th'?'งาน':'ngan'],[wah%100,language==='th'?'ตร.ว.':'sq. wah']].filter(([value])=>Number(value)>0) as Array<[number,string]>;
}
export function listingAmount(value:number,language:Language){return language==='th'?`${value.toLocaleString('en-US')} บาท`:`฿${value.toLocaleString('en-US')}`;}
