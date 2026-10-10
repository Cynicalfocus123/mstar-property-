import {test,expect} from '@playwright/test';
import {writeFile} from 'node:fs/promises';
const production=process.env.MSTAR_TEST_MODE==='production';
const routerWarning='This library called use() to suspend in a previous render but did not call use() when it finished';
for(const language of ['en','th'] as const){
 if(!production)test(`${language}: home and results share cards, equal heights and contact behavior`,async({page},info)=>{
  await page.goto(`/${language}/buy`);await expect(page.locator('.lcard')).toHaveCount(8);
  const resultCards=await page.locator('.lcard').evaluateAll(elements=>Object.fromEntries(elements.map(el=>[el.getAttribute('data-listing-id'),{body:el.querySelector('.lbody')!.textContent,tags:el.querySelector('.listing-tags')!.textContent,photos:el.querySelectorAll('.photo-dots button').length}])));
  await page.goto(`/${language}`);await expect(page.locator('.home-listing-row')).toHaveCount(4);await page.evaluate(()=>document.fonts.ready);
  await expect(page.locator('.small-listing-card')).toHaveCount(0);
  for(const row of await page.locator('.home-listing-row').all()){
   const heights=await row.locator('.lcard').evaluateAll(elements=>elements.map(el=>el.getBoundingClientRect().height));expect(Math.max(...heights)-Math.min(...heights)).toBeLessThan(1);
   expect(await row.locator('.lcard').evaluateAll(elements=>elements.every(el=>{const card=el.getBoundingClientRect();return ['.lfoot','.contact','.address-station'].every(selector=>{const child=el.querySelector(selector);if(!child)return true;const bounds=child.getBoundingClientRect();return bounds.left>=card.left&&bounds.right<=card.right+1;});}))).toBe(true);
   expect(await row.locator('.home-rail').evaluate(el=>el.children.length===el.querySelectorAll(':scope > [role=listitem]').length)).toBe(true);
  }
  const firstRow=page.locator('.home-listing-row').first();
  for(const card of await firstRow.locator('.lcard').all()){
   const id=(await card.getAttribute('data-listing-id'))!,actual=await card.evaluate(el=>({body:el.querySelector('.lbody')!.textContent,tags:el.querySelector('.listing-tags')!.textContent,photos:el.querySelectorAll('.photo-dots button').length}));expect(actual).toEqual(resultCards[id]);
  }
  const rail=firstRow.locator('.home-rail'),card=firstRow.locator('.lcard').first(),width=page.viewportSize()!.width,count=width>1280?4:width>1000?3:width>720?2:1.15;
  const geometry=await rail.evaluate(el=>({rail:el.clientWidth,card:el.firstElementChild!.getBoundingClientRect().width,gap:parseFloat(getComputedStyle(el).columnGap)}));
  expect((geometry.rail-(width<=720?geometry.gap:(count-1)*geometry.gap))/geometry.card).toBeCloseTo(count,1);
  if(width>720){await firstRow.locator('.home-row-arrows button').last().click();await expect(rail).not.toHaveAttribute('data-motion','scrolling');expect(await rail.evaluate(el=>el.scrollLeft)).toBeCloseTo(count*(geometry.card+geometry.gap),0);await firstRow.locator('.home-row-arrows button').first().click();await expect.poll(()=>rail.evaluate(el=>el.scrollLeft)).toBe(0);}
  await card.locator('.heart').click();await expect(card.locator('.heart')).toHaveAttribute('aria-pressed','true');await expect(page).toHaveURL(`/${language}`);
  await card.locator('.nextph').evaluate(el=>(el as HTMLButtonElement).click());await expect(card.locator('.photo-dots button').nth(1)).toHaveAttribute('aria-current','true');await expect(page).toHaveURL(`/${language}`);
  if(width<=720){
   const session=await page.context().newCDPSession(page);
   const swipe=async(x:number,y:number)=>{await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});for(let n=1;n<=5;n++){await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x-n*40,y}]});await page.waitForTimeout(25);}await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});};
   const photo=card.locator('.listing-photo');await photo.scrollIntoViewIfNeeded();let bounds=(await photo.boundingBox())!;await swipe(bounds.x+bounds.width*.8,bounds.y+70);await expect(card.locator('.photo-dots button').nth(2)).toHaveAttribute('aria-current','true');expect(await rail.evaluate(el=>el.scrollLeft)).toBe(0);
   const status=card.locator('.lstat');await status.scrollIntoViewIfNeeded();bounds=(await status.boundingBox())!;await swipe(bounds.x+bounds.width*.85,bounds.y+bounds.height/2);await expect.poll(()=>rail.evaluate(el=>el.scrollLeft)).toBeGreaterThan(40);await expect(card.locator('.photo-dots button').nth(2)).toHaveAttribute('aria-current','true');await expect(page).toHaveURL(`/${language}`);await session.detach();await rail.evaluate(el=>el.scrollTo({left:0,behavior:'instant'}));await expect.poll(()=>rail.evaluate(el=>el.scrollLeft)).toBe(0);
  }
  const heightsBefore=await firstRow.locator('.lcard').evaluateAll(els=>els.map(el=>el.getBoundingClientRect().height));
  await card.locator('.contact').click();const dialog=page.locator('dialog');await expect(dialog).toBeVisible();await expect(dialog.locator('textarea')).toHaveValue(language==='en'?/I'm interested in .*FICTIONAL/:/สนใจ .*FICTIONAL/);await expect(dialog.locator('button[type=submit]')).toBeDisabled();await expect(dialog.locator('[data-initial-focus]')).toBeFocused();
  const description=await dialog.locator('button[type=submit]').getAttribute('aria-describedby');expect(await page.locator(`[id="${description}"]`).count()).toBe(1);
  await page.keyboard.press('Escape');await expect(dialog).toHaveCount(0);await expect(card.locator('.contact')).toBeFocused();expect(await firstRow.locator('.lcard').evaluateAll(els=>els.map(el=>el.getBoundingClientRect().height))).toEqual(heightsBefore);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await firstRow.scrollIntoViewIfNeeded();await page.screenshot({path:info.outputPath(`${language}-shared-home-card.png`)});
 });
 test(`${production?'production':'development'} ${language}: client navigation console audit`,async({page},info)=>{
  const errors:{text:string;location:unknown}[]=[],exceptions:string[]=[];page.on('console',message=>{if(message.type()==='error')errors.push({text:message.text(),location:message.location()});});page.on('pageerror',error=>exceptions.push(error.stack||error.message));
  await page.goto(`/${language}`);await page.evaluate(()=>document.fonts.ready);
  await page.locator('.preferences-trigger').click();await expect(page.locator('dialog')).toBeVisible();await page.keyboard.press('Escape');await expect(page.locator('dialog')).toHaveCount(0);
  const auditMarker=`${language}-client-navigation`;await page.evaluate(value=>{(window as typeof window&{mstarNavigationAudit:string}).mstarNavigationAudit=value;},auditMarker);
  for(let cycle=0;cycle<2;cycle++){
   for(const route of ['buy','rent','invest']){
    await page.locator(`.main-nav a[href="/${language}/${route}"]`).evaluate(el=>(el as HTMLAnchorElement).click());await expect(page).toHaveURL(`/${language}/${route}`);await expect(page.locator('.listing-grid,.results-empty').first()).toBeVisible();
    expect(await page.evaluate(()=>(window as typeof window&{mstarNavigationAudit:string}).mstarNavigationAudit)).toBe(auditMarker);
    await page.goBack();await expect(page).toHaveURL(`/${language}`);await page.goForward();await expect(page).toHaveURL(`/${language}/${route}`);
    await page.locator('.logo').click();await expect(page).toHaveURL(`/${language}`);
   }
  }
  const consolePath=info.outputPath('client-navigation-console.json');await writeFile(consolePath,JSON.stringify({errors,exceptions},null,2));await info.attach('client-navigation-console',{path:consolePath,contentType:'application/json'});expect(exceptions).toEqual([]);
  if(production)expect(errors).toEqual([]);
  else{expect(errors.filter(error=>!error.text.includes(routerWarning))).toEqual([]);for(const error of errors)expect(error.text).toContain('InnerLayoutRouter');}
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 });
}
