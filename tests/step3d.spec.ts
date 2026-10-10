import {test,expect} from '@playwright/test';
for(const language of ['en','th'] as const){
 test(`${language}: centred hero, tabs and search at every width`,async({page},info)=>{
  await page.goto(`/${language}`);await expect(page.locator('.home-listing-row')).toHaveCount(4);await page.evaluate(()=>document.fonts.ready);
  const hero=page.locator('.foundation-hero'),search=hero.locator('.search-box'),heading=hero.locator('h1'),width=page.viewportSize()!.width;
  const center=async(locator:typeof hero)=>locator.evaluate(el=>{const rect=el.getBoundingClientRect();return rect.x+rect.width/2;});
  for(const locator of [hero,heading,search])expect(await center(locator)).toBeCloseTo(width/2,0);
  expect((await search.boundingBox())!.width).toBeLessThanOrEqual(880);expect(await hero.evaluate(el=>getComputedStyle(el).textAlign)).toBe('center');expect(await search.evaluate(el=>getComputedStyle(el).textAlign)).toBe('left');
  if(width>720){expect(await center(hero.locator('.hero-lead'))).toBeCloseTo(width/2,0);const tabs=hero.locator('[role=tab]'),first=await tabs.first().boundingBox(),last=await tabs.last().boundingBox();expect((first!.x+last!.x+last!.width)/2).toBeCloseTo(width/2,0);await expect(hero.locator('.desktop-location')).toBeVisible();}
  else{await expect(hero.locator('.phone-location')).toBeVisible();await expect(hero.locator('.desktop-location')).toBeHidden();await expect(hero.locator('[role=tab]').first()).toBeInViewport();}
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:info.outputPath(`${language}-centred-hero.png`),fullPage:true});
 });
 test(`${language}: all property facts, units and address station on results/home cards`,async({page,request},info)=>{
  const english=language==='en',response=await request.get(`/api/listings?route=buy&lang=${language}`);expect(response.status()).toBe(200);const data=await response.json();expect(data.items.length).toBe(8);
  await page.goto(`/${language}/buy`);await expect(page.locator('.lcard')).toHaveCount(8);await page.evaluate(()=>document.fonts.ready);
  for(const item of data.items){
   const card=page.locator(`.lcard[data-listing-id="${item.id}"]`),facts=card.locator('.lfacts'),expected:string[]=[];
   if(['condo','house','townhouse','pool_villa'].includes(item.type)){expected.push(english?'2 bed':'2 ห้องนอน',english?'2 bath':'2 ห้องน้ำ');}
   if(item.type==='condo')expected.push(english?'18th floor':'18 ชั้น');
   else if(item.type==='hotel')expected.push(english?'20 rooms':'20 ห้อง');
   if(item.buildingFloors!==null)expected.push(`${item.buildingFloors} ${english?(item.buildingFloors===1?'floor':'floors'):'ชั้น'}`);
   if(!['land','hotel'].includes(item.type))expected.push(english?'1,076 sq ft':'100 ตร.ม.');
   if(item.land!==null)expected.push(item.type==='hotel'?(english?'0.125 rai land':'0.125 ไร่ ที่ดิน'):item.type==='land'?(english?'50 sq. wah':'50 ตร.ว.'):(english?'50 sq. wah land':'50 ตร.ว. ที่ดิน'));
   if(item.frontage!==null)expected.push(english?'10 m road frontage':'10 ม. หน้ากว้างติดถนน');
   await expect(facts.locator('span')).toHaveText(expected);expect(await facts.textContent()).not.toMatch(/occupancy|m²|to BTS|ถึง BTS/);
   for(const fact of await facts.locator('span').all()){await expect(fact.locator('b')).toHaveCount(1);expect(await fact.evaluate(el=>getComputedStyle(el).fontWeight)).toBe('400');}
   if(item.stationDistance!==null){const address=card.locator('.laddr');await expect(address).toContainText(english?'456 m to BTS':'456 ม. ถึง BTS');expect(await address.textContent()).toMatch(english?/ · 456 m to BTS$/:/ · 456 ม. ถึง BTS$/);await expect(address.locator('br')).toHaveCount(1);const station=await address.locator('.address-station').boundingBox(),bounds=await address.boundingBox();expect(station!.x+station!.width).toBeLessThanOrEqual(bounds!.x+bounds!.width+1);expect(station!.y+station!.height).toBeLessThanOrEqual(bounds!.y+bounds!.height+1);}
  }
  const before=await page.locator('.lcard').first().boundingBox();await page.locator('.lcard').first().hover();await page.waitForTimeout(300);const after=await page.locator('.lcard').first().boundingBox();expect(after!.height).toBeCloseTo(before!.height,1);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:info.outputPath(`${language}-fuller-results.png`),fullPage:true});
  await page.goto(`/${language}`);await expect(page.locator('.home-listing-row')).toHaveCount(4);
  for(const item of data.items){const facts=page.locator('.home-listing-row').first().locator(`.lcard[data-listing-id="${item.id}"] .lfacts`);await expect(facts).toBeAttached();
   expect(await facts.textContent()).not.toContain('m²');await expect(facts.locator('b').first()).toBeAttached();
   if(item.type==='condo')await expect(facts).toContainText(english?'18th floor':'18 ชั้น');
   if(item.type==='land')await expect(facts).toContainText(english?'50 sq. wah':'50 ตร.ว.');
   if(item.type==='hotel')await expect(facts).toContainText(english?'20 rooms':'20 ห้อง');
  }
  await page.goto(`/${language}/rent`);await expect(page.locator('.lcard').first().locator('.lfacts')).toContainText(english?'18th floor':'18 ชั้น');
 });
}
