import type {SearchRoute} from './search-state';
type HomeRowConfig={id:string;title:{en:string;th:string};route:SearchRoute;query:string};
// These saved searches can move to approved admin management in its own stage.
export const homeRowsConfig:HomeRowConfig[]=[
 {id:'bangkok-sale',title:{en:'Popular homes for sale in Bangkok',th:'บ้านและคอนโดยอดนิยมสำหรับขายในกรุงเทพฯ'},route:'buy',query:'loc=bangkok&type=condo,house,townhouse,pool_villa'},
 {id:'bangkok-rent',title:{en:'Condos for rent in Bangkok',th:'คอนโดให้เช่าในกรุงเทพฯ'},route:'rent',query:'loc=bangkok&type=condo'},
 {id:'pattaya-jomtien',title:{en:'Homes in Pattaya and Jomtien',th:'บ้านและคอนโดในพัทยาและจอมเทียน'},route:'buy',query:'loc=bang-lamung&type=condo,house,townhouse,pool_villa'},
 {id:'investment',title:{en:'Investment: hotels and land',th:'การลงทุน: โรงแรมและที่ดิน'},route:'invest',query:'type=hotel,land'},
];
// Fictional fixtures have no Bangkok/Pattaya location. Never label them as real stock there.
// This config is selected only AFTER the existing server-only local sample guard passes.
export const sampleHomeRowsConfig:HomeRowConfig[]=[
 {id:'sample-sale',title:{en:'Sample properties for sale — fictional area',th:'ตัวอย่างอสังหาริมทรัพย์ขาย — ทำเลสมมติ'},route:'buy',query:'loc=fictional-demo-area'},
 {id:'sample-rent',title:{en:'Sample condos for rent — fictional area',th:'ตัวอย่างคอนโดให้เช่า — ทำเลสมมติ'},route:'rent',query:'loc=fictional-demo-area&type=condo'},
 {id:'sample-homes',title:{en:'Sample homes — fictional area',th:'ตัวอย่างบ้านและคอนโด — ทำเลสมมติ'},route:'buy',query:'loc=fictional-demo-area&type=condo,house,townhouse,pool_villa'},
 {id:'sample-investment',title:{en:'Sample investment: hotels and land',th:'ตัวอย่างการลงทุน: โรงแรมและที่ดิน'},route:'invest',query:'loc=fictional-demo-area&type=hotel,land'},
];
