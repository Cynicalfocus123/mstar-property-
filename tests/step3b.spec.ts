import {test,expect} from '@playwright/test';
for(const language of ['en','th'] as const){
 test(`${language}: home topic rows, responsive shared cards, navigation, saves and keyboard`,async({page},info)=>{
  const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));await page.goto(`/${language}`);await page.evaluate(()=>document.fonts.ready);
  const rows=page.locator('.home-listing-row');await expect(rows).toHaveCount(4);
  const row=rows.first(),rail=row.locator('.home-rail'),cards=row.locator('.lcard');await expect(cards).toHaveCount(8);
  expect(await page.locator('main').evaluate(element=>element.firstElementChild?.classList.contains('foundation-hero')&&element.children[1]?.classList.contains('home-listing-rows'))).toBe(true);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  const width=page.viewportSize()!.width,columns=width>1280?4:width>1000?3:width>720?2:1.15;
  const layout=await rail.evaluate(element=>{const card=element.firstElementChild!,photo=card.querySelector('.listing-photo')!;return {rail:element.clientWidth,card:card.getBoundingClientRect().width,gap:parseFloat(getComputedStyle(element).columnGap),photo:photo.getBoundingClientRect().width/photo.getBoundingClientRect().height,radius:getComputedStyle(card.querySelector('.lcard')!).borderRadius,snap:getComputedStyle(element).scrollSnapType};});
  expect((layout.rail-(width<=720?12:(columns-1)*layout.gap))/layout.card).toBeCloseTo(columns,1);expect(layout.photo).toBeCloseTo(3/2,2);expect(layout.radius).toBe('16px');expect(layout.snap).toContain('mandatory');
  await expect(row.locator('.contact')).toHaveCount(8);
  for(const card of await cards.all()){await expect(card.locator('.sample-badge')).toHaveText(language==='th'?'ตัวอย่าง':'Sample');}
  await rail.scrollIntoViewIfNeeded();
  if(width<=720){
   await expect(row.locator('.home-row-arrows')).toBeHidden();const rect=await rail.boundingBox(),session=await page.context().newCDPSession(page);
   const y=rect!.y+rect!.height-85;await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:rect!.x+300,y}]});for(const x of [260,210,160,110])await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:rect!.x+x,y}]});await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await expect.poll(()=>rail.evaluate(element=>element.scrollLeft)).toBeGreaterThan(40);await expect(page).toHaveURL(`/${language}`);await session.detach();
  }else{
   const buttons=row.locator('.home-row-arrows button');await expect(buttons.last()).toBeEnabled();await buttons.last().focus();await page.keyboard.press('Enter');await expect.poll(()=>rail.evaluate(element=>element.scrollLeft)).toBeGreaterThan(0);await expect(buttons.first()).toBeEnabled();await buttons.first().click();await expect.poll(()=>rail.evaluate(element=>element.scrollLeft)).toBe(0);
  }
  await rail.evaluate(element=>element.scrollTo({left:0,behavior:'instant'}));const first=cards.first(),id=await first.getAttribute('data-listing-id');await first.locator('.heart').click();await expect(first.locator('.heart')).toHaveAttribute('aria-pressed','true');await expect(page).toHaveURL(`/${language}`);
  await page.reload();await expect(page.locator(`.lcard[data-listing-id="${id}"]`).first().locator('.heart')).toHaveAttribute('aria-pressed','true');
  await page.goto(`/${language}/buy`);await expect(page.locator(`.lcard[data-listing-id="${id}"] .heart`)).toHaveAttribute('aria-pressed','true');await page.locator(`.lcard[data-listing-id="${id}"] .heart`).click();await page.goto(`/${language}`);await expect(page.locator(`.lcard[data-listing-id="${id}"]`).first().locator('.heart')).toHaveAttribute('aria-pressed','false');
  for(const item of await page.locator('.home-listing-row').all()){
   const href=await item.locator('.home-row-heading').getAttribute('href');expect(href).toContain(`/${language}/`);const api=new URL(href!,'http://127.0.0.1:3000');api.searchParams.set('route',api.pathname.split('/')[2]);api.searchParams.set('lang',language);const response=await page.request.get(`/api/listings?${api.searchParams}`);expect(response.status()).toBe(200);
   const data=await response.json(),rowIds=await item.locator('.lcard').evaluateAll(elements=>elements.map(element=>element.getAttribute('data-listing-id')));expect(rowIds.every(id=>data.items.some((listing:{id:string})=>listing.id===id))).toBe(true);
  }
  const topic=page.locator('.home-row-heading').nth(1),href=await topic.getAttribute('href');await topic.focus();await page.keyboard.press('Enter');await expect(page).toHaveURL(href!);await expect(page.locator('.lcard')).toHaveCount(2);await expect(page.locator('.lcard[data-intent=sale]')).toHaveCount(0);
  await page.goto(`/${language}`);const property=page.locator('.lcard-link').first();await expect(property).toBeVisible();await property.focus();await expect(property).toBeFocused();await page.keyboard.press('Enter');await expect(page).toHaveURL(new RegExp(`/${language}/property/`));await expect(page.getByRole('heading',{name:language==='th'?'รายละเอียดอสังหาริมทรัพย์':'Property details'})).toBeVisible();
  await page.goto(`/${language}`);await expect(page.locator('.home-listing-row')).toHaveCount(4);for(const item of await page.locator('.home-listing-row').all()){await item.scrollIntoViewIfNeeded();await expect(item.locator('img').first()).toHaveJSProperty('complete',true);}await page.evaluate(async()=>{await document.fonts.ready;(document.activeElement as HTMLElement)?.blur();scrollTo(0,0);});await page.screenshot({path:info.outputPath(`${language}-home-rows.png`),fullPage:true});expect(errors).toEqual([]);
 });
 test(`${language}: full-width results keep equal last-row widths and current land/hotel units`,async({page},info)=>{
  for(const route of ['buy','rent','invest']){
   await page.goto(`/${language}/${route}`);await expect(page.locator('.listing-grid')).toBeVisible();await expect(page.locator('.lcard').first()).toBeVisible();await expect(page.locator('.reserved-map-column')).toHaveCount(0);const width=page.viewportSize()!.width,expected=width>1000?3:width>720?2:1;
   expect(await page.locator('.listing-grid').evaluate(element=>getComputedStyle(element).gridTemplateColumns.split(' ').length)).toBe(expected);
   const dimensions=await page.locator('.lcard').evaluateAll(elements=>elements.map(element=>element.getBoundingClientRect().width));expect(Math.max(...dimensions)-Math.min(...dimensions)).toBeLessThan(1);
   expect(await page.locator('.listing-grid').evaluate(element=>element.getBoundingClientRect().width)).toBeCloseTo(width-(width<=720?32:56),0);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
  await page.goto(`/${language}/invest`);const response=await page.request.get(`/api/listings?route=invest&lang=${language}`),data=await response.json();
  for(const type of ['land','hotel']){const listing=data.items.find((item:{type:string})=>item.type===type),facts=page.locator(`.lcard[data-listing-id="${listing.id}"] .lfacts`);await expect(facts).toContainText(type==='hotel'?(language==='th'?'0.125 ไร่ ที่ดิน':'0.125 rai land'):(language==='th'?'50 ตร.ว.':'50 sq. wah'));expect(await facts.textContent()).not.toMatch(/\b0 (rai|ngan)|(?:^|\s)0 (ไร่|งาน)/);}
  await page.goto(`/${language}/buy?loc=fictional-demo-station`);await expect(page.locator('.laddr')).toContainText(language==='th'?'456 ม. ถึง BTS':'456 m to BTS');await expect(page.locator('.sample-badge')).toHaveText(language==='th'?'ตัวอย่าง':'Sample');
  await page.goto(`/${language}/buy`);await expect(page.locator('.lcard')).toHaveCount(8);await expect(page.locator('.listing-grid')).toBeVisible();await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:info.outputPath(`${language}-full-grid.png`),fullPage:true});
 });
}
test('approved breakpoint boundaries include 4/3/2 shared-card home rows and 3/2/1 results',async({page})=>{
 test.skip(page.viewportSize()!.width!==1600,'Boundary checks run once; the main tests cover both locales at all six widths.');
 await page.goto('/en');await expect(page.locator('.home-listing-row')).toHaveCount(4);
 for(const [width,count] of [[721,2],[1000,2],[1001,3],[1280,3],[1281,4],[1440,4],[1600,4]]){
  await page.setViewportSize({width,height:900});const ratio=await page.locator('.home-rail').first().evaluate(element=>{const card=element.firstElementChild!.getBoundingClientRect().width,gap=parseFloat(getComputedStyle(element).columnGap);return (element.clientWidth+gap)/(card+gap);});expect(ratio).toBeCloseTo(count,1);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }
 await page.goto('/en/buy');await expect(page.locator('.listing-grid')).toBeVisible();for(const [width,count] of [[720,1],[721,2],[1000,2],[1001,3]]){await page.setViewportSize({width,height:900});expect(await page.locator('.listing-grid').evaluate(element=>getComputedStyle(element).gridTemplateColumns.split(' ').length)).toBe(count);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
});
