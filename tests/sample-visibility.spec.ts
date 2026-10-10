import {test,expect} from '@playwright/test';

// Set only in the test process; the actual app runs next dev or next start separately.
const production=process.env.MSTAR_TEST_MODE==='production';
for(const language of ['en','th'] as const){
 test(`${production?'production excludes':'development labels'} samples on public results (${language})`,async({page,request},info)=>{
  const health=await request.get('/api/health');expect(health.status()).toBe(200);expect((await health.json()).ready).toBe(true);
  for(const route of ['buy','rent','invest']){
   const response=await request.get(`/api/listings?route=${route}&lang=${language}&page=2&demo=1`);expect(response.status()).toBe(200);
   const data=await response.json();expect(data.demo).toBe(!production);
   if(production){
    expect(data.items.every((item:{demo:boolean})=>!item.demo)).toBe(true);
    expect(JSON.stringify(data)).not.toMatch(/FICTIONAL|fictional-demo|fictional_option|fictional_multi/);
   }else{
    expect(data.items.length).toBe(route==='invest'?3:8);
    expect(data.items.every((item:{demo:boolean})=>item.demo)).toBe(true);
   }
   await page.goto(`/${language}/${route}?demo=1`);
   if(production){
    await expect(page.locator('.demo-notice')).toHaveCount(0);
    await expect(page.locator('.sample-badge')).toHaveCount(0);
    await expect(page.locator('.lcard-link[aria-label*="FICTIONAL"]')).toHaveCount(0);
   }else{
    await expect(page.locator('.demo-notice')).toBeVisible();
    const cards=page.locator('.lcard');await expect(cards).toHaveCount(route==='invest'?3:6);
    for(const card of await cards.all())await expect(card.locator('.sample-badge')).toHaveText('Sample');
    await expect(cards.first().locator('.sample-badge')).toBeVisible();
   }
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
  const untrusted=await request.get('/api/listings?route=buy&demo=1',{headers:{Host:'mstar.example'}});
  expect(untrusted.status()).toBe(200);const live=await untrusted.json();expect(live.demo).toBe(false);expect(live.items.every((item:{demo:boolean})=>!item.demo)).toBe(true);
  if(production)expect((await request.get('/api/listings?route=buy&filter.fictional_multi=fictional_option_0')).status()).toBe(400);
  await page.screenshot({path:info.outputPath(`${production?'production':'development'}-samples-${language}.png`),fullPage:true});
 });
}
