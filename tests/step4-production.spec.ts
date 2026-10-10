import {test,expect} from '@playwright/test';

// Run only against npm run start, with MSTAR_TEST_MODE=production and MSTAR_DEMO_MODE=1.
if(process.env.MSTAR_TEST_MODE==='production')for(const language of ['en','th'] as const){
 test(`${language}: production maps load local workers, exclude samples and expose no fictional nearby data`,async({page},info)=>{
  test.setTimeout(120000);
  const errors:string[]=[],workers=new Set<string>();
  page.on('pageerror',error=>errors.push(error.message));
  page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
  page.on('response',response=>{if(response.url().includes('/vendor/maplibre/6.11.2/')){expect(response.status()).toBe(200);workers.add(new URL(response.url()).pathname);}});
  for(const route of ['buy','rent','invest']){
   await page.goto(`/${language}/${route}?map=1`);
   await expect(page.locator('.results-map-canvas')).toHaveAttribute('data-labels',language,{timeout:45000});
   await expect(page.locator('.maplibregl-ctrl-attrib')).toContainText('OpenStreetMap');
   await expect(page.locator('.demo-notice,.listing-badge.demo-badge')).toHaveCount(0);
   const response=await page.request.get(`/api/listings?route=${route}&lang=${language}&map=1&demo=1`),data=await response.json();
   expect(response.status()).toBe(200);expect(data.demo).toBe(false);
   expect(data.items.every((item:{demo:boolean;code:string})=>!item.demo&&!item.code.startsWith('FICTIONAL'))).toBe(true);
   expect(data.pins.every((pin:{code:string})=>!pin.code.startsWith('FICTIONAL'))).toBe(true);
   await expect(page.locator('.map-pin')).toHaveCount(data.pins.length);
   if(!data.pins.length)await expect(page.locator('.map-note')).toContainText(language==='en'?'map location':'ตำแหน่งบนแผนที่');
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
  expect(workers.has('/vendor/maplibre/6.11.2/maplibre-gl-worker.mjs')).toBe(true);
  expect(workers.has('/vendor/maplibre/6.11.2/maplibre-gl-shared.mjs')).toBe(true);
  await page.screenshot({path:info.outputPath(`${language}-production-map.png`)});
  for(const code of ['FICTIONAL-CONDO-SALE','FICTIONAL-STEP4-NEARBY-0'])expect((await page.request.get(`/api/nearby?listing=${code}&lang=${language}`)).status()).toBe(404);
  const health=await page.request.get('/api/health');expect(health.status()).toBe(200);expect((await health.json()).ready).toBe(true);
  expect(errors).toEqual([]);
 });
}
