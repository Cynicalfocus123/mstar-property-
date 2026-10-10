import {test,expect,type Locator,type Page} from '@playwright/test';
const frame=async(page:Page)=>page.evaluate(()=>new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve()))));
async function settled(rail:Locator){await expect(rail).not.toHaveAttribute('data-motion','scrolling');await expect.poll(()=>rail.evaluate(element=>{const cards=Array.from(element.children) as HTMLElement[];return Math.min(...cards.map(card=>Math.abs(card.offsetLeft-cards[0].offsetLeft-element.scrollLeft)));})).toBeLessThan(1.5);}
async function swipe(page:Page,locator:Locator,direction:number){
 await locator.scrollIntoViewIfNeeded();const rect=await locator.boundingBox(),session=await page.context().newCDPSession(page),y=rect!.y+(await locator.getAttribute('class')==='home-rail'?rect!.height-85:Math.min(70,rect!.height/2)),start=rect!.x+rect!.width*(direction>0?.8:.2);
 await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:start,y}]});
 for(let n=1;n<=5;n++){await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:start-direction*n*40,y}]});await page.waitForTimeout(25);}
 await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await session.detach();
}
for(const lang of ['en','th']){
 test(`${lang}: shared row motion, rapid clicks, keyboard, native gestures and layout`,async({page},info)=>{
  await page.goto(`/${lang}`);await expect(page.locator('.home-listing-row')).toHaveCount(4);await page.evaluate(()=>document.fonts.ready);
  const row=page.locator('.home-listing-row').first(),rail=row.locator('.home-rail'),buttons=row.locator('.home-row-arrows button'),width=page.viewportSize()!.width;
  await rail.scrollIntoViewIfNeeded();const before=await row.boundingBox();
  if(width>720){
   await buttons.last().evaluate(el=>(el as HTMLButtonElement).click());await page.waitForTimeout(100);
   const mid=await rail.evaluate(el=>({left:el.scrollLeft,max:el.scrollWidth-el.clientWidth,snap:getComputedStyle(el).scrollSnapType,motion:el.dataset.motion}));
   expect(mid.left).toBeGreaterThan(0);expect(mid.left).toBeLessThan(mid.max);expect(mid.snap).toBe('none');expect(mid.motion).toBe('scrolling');
   // Retarget during the existing animation; position continues rather than jumping.
   await buttons.first().evaluate(el=>(el as HTMLButtonElement).click());await page.waitForTimeout(60);await buttons.last().evaluate(el=>(el as HTMLButtonElement).click());await settled(rail);
   while(await buttons.last().isEnabled()){await buttons.last().click();await settled(rail);}
   await expect(buttons.last()).toBeDisabled();await expect.poll(()=>buttons.last().evaluate(el=>Number(getComputedStyle(el).opacity))).toBe(.4);
   while(await buttons.first().isEnabled()){await buttons.first().click();await settled(rail);}await expect(buttons.first()).toBeDisabled();
   await rail.focus();await page.keyboard.press('ArrowRight');await settled(rail);expect(await rail.evaluate(el=>el.scrollLeft)).toBeGreaterThan(0);await page.keyboard.press('ArrowLeft');await settled(rail);await expect(buttons.first()).toBeDisabled();
   await buttons.last().evaluate(el=>(el as HTMLButtonElement).click());await page.waitForTimeout(80);await page.emulateMedia({reducedMotion:'reduce'});await frame(page);await settled(rail);expect(await rail.evaluate(el=>el.scrollLeft)).toBeGreaterThan(0);await page.emulateMedia({reducedMotion:'no-preference'});await buttons.first().click();await settled(rail);
   // Wheel input interrupts scripted motion; native scroll-snap remains responsible for gestures.
   await buttons.last().evaluate(el=>(el as HTMLButtonElement).click());await rail.hover();await page.mouse.wheel(140,0);await expect(rail).not.toHaveAttribute('data-motion','scrolling');await page.waitForTimeout(600);await settled(rail);
   await rail.evaluate(el=>el.scrollTo({left:0,behavior:'instant'}));await rail.hover();await page.keyboard.down('Shift');await page.mouse.wheel(0,140);await page.keyboard.up('Shift');await page.waitForTimeout(600);await settled(rail);
  }else{
   await expect(row.locator('.home-row-arrows')).toBeHidden();await swipe(page,rail,1);await expect.poll(()=>rail.evaluate(el=>el.scrollLeft)).toBeGreaterThan(30);await page.waitForTimeout(800);await settled(rail);await expect(page).toHaveURL(`/${lang}`);
  }
  expect(await rail.evaluate(el=>getComputedStyle(el).scrollSnapType)).toContain('mandatory');const after=await row.boundingBox();expect(after!.height).toBeCloseTo(before!.height,1);
  if(width>720){await rail.evaluate(el=>el.scrollTo({left:0,behavior:'instant'}));const small=row.locator('.lcard').first();await small.hover();await expect.poll(()=>small.locator('.photo-current img').evaluate(el=>new DOMMatrixReadOnly(getComputedStyle(el).transform).m11)).toBeCloseTo(1.03,2);expect(await small.evaluate(el=>getComputedStyle(el).transitionDuration)).toBe('0.15s');}
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:info.outputPath(`${lang}-motion-row.png`),fullPage:true});
 });
 test(`${lang}: photo direction, hover, popover/sheet/dialog enter and exit`,async({page},info)=>{
  await page.goto(`/${lang}/buy`);const card=page.locator('.lcard').first();await expect(card).toBeVisible();await card.scrollIntoViewIfNeeded();const box=await card.boundingBox();
  await card.locator('.nextph').evaluate(el=>(el as HTMLButtonElement).click());await frame(page);
  const movement=await card.locator('.photo-current').evaluate(el=>({x:new DOMMatrixReadOnly(getComputedStyle(el).transform).m41,animations:el.getAnimations().map(a=>({duration:a.effect!.getTiming().duration,frames:(a.effect as KeyframeEffect).getKeyframes()}))}));
  expect(movement.x).toBeGreaterThan(0);expect(movement.animations[0].duration).toBe(300);expect(movement.animations[0].frames[0].transform).toBe('translateX(100%)');await expect(card.locator('.photo-previous')).toHaveCount(0);
  await card.locator('.photo-dots button').first().evaluate(el=>(el as HTMLButtonElement).click());await frame(page);expect(await card.locator('.photo-current').evaluate(el=>new DOMMatrixReadOnly(getComputedStyle(el).transform).m41)).toBeLessThan(0);await expect(card.locator('.photo-previous')).toHaveCount(0);
  if(page.viewportSize()!.width===390){await swipe(page,card.locator('.listing-photo'),1);await expect(card.locator('.photo-dots button').nth(1)).toHaveAttribute('aria-current','true');await expect(card.locator('.photo-previous')).toHaveCount(0);await swipe(page,card.locator('.listing-photo'),-1);await expect(card.locator('.photo-dots button').first()).toHaveAttribute('aria-current','true');}
  else{await card.hover();await expect.poll(()=>card.locator('.photo-current img').evaluate(el=>new DOMMatrixReadOnly(getComputedStyle(el).transform).m11)).toBeCloseTo(1.03,2);expect(await card.evaluate(el=>getComputedStyle(el).transitionDuration)).toBe('0.15s');expect(await card.locator('.contact').evaluate(el=>getComputedStyle(el).transitionDuration)).toContain('0.15s');}
  await expect(card.locator('.photo-previous')).toHaveCount(0);expect((await card.boundingBox())!.height).toBeCloseTo(box!.height,1);
  const contact=card.locator('.contact');await contact.focus();await contact.evaluate(el=>(el as HTMLButtonElement).click());await frame(page);let dialog=page.locator('dialog');await expect(dialog).toBeVisible();expect(await dialog.evaluate(el=>el.getAnimations().map(a=>a.effect!.getTiming().duration))).toContain(200);const during=await card.boundingBox();expect(during!.x).toBeCloseTo(box!.x,1);expect(during!.width).toBeCloseTo(box!.width,1);
  await expect(dialog.locator('[data-initial-focus]')).toBeFocused();await dialog.locator('.modal-head button').evaluate(el=>(el as HTMLButtonElement).click());await frame(page);await expect(dialog).toHaveCount(1);expect(await dialog.evaluate(el=>(el as HTMLElement).inert)).toBe(true);await expect(dialog).toHaveCount(0);await expect(contact).toBeFocused();
  const price=page.locator('.filter-button').filter({hasText:lang==='en'?'Price':'ราคา'}).first();await price.evaluate(el=>(el as HTMLButtonElement).click());await frame(page);dialog=page.locator('dialog');await expect(dialog).toBeVisible();const durations=await dialog.evaluate(el=>el.getAnimations().map(a=>a.effect!.getTiming().duration));expect(durations).toContain(page.viewportSize()!.width<=720?250:200);
  await dialog.evaluate(el=>Promise.all(el.getAnimations().map(animation=>animation.finished)));
  await page.screenshot({path:info.outputPath(`${lang}-motion-filter.png`),fullPage:true});
  // Inspect exit in the browser's first frame; protocol round-trips can outlast a 250ms sheet.
  const exit=await dialog.evaluate(async el=>{el.dispatchEvent(new Event('cancel',{cancelable:true}));await new Promise<void>(resolve=>requestAnimationFrame(()=>resolve()));const animations=el.getAnimations();animations.forEach(animation=>animation.pause());return {present:el.isConnected,inert:(el as HTMLElement).inert,content:el.querySelectorAll('.price-histogram span').length,durations:animations.map(animation=>animation.effect!.getTiming().duration)};});
  expect(exit.present).toBe(true);expect(exit.inert).toBe(true);expect(exit.content).toBeGreaterThan(0);expect(exit.durations).toContain(page.viewportSize()!.width<=720?250:200);await dialog.evaluate(el=>el.getAnimations().forEach(animation=>animation.play()));await expect(dialog).toHaveCount(0);expect(await page.evaluate(()=>document.body.style.overflow)).not.toBe('hidden');
  for(const route of ['rent','invest']){await page.goto(`/${lang}/${route}`);const first=page.locator('.lcard').first();await expect(first).toBeVisible();await first.locator('.nextph').evaluate(el=>(el as HTMLButtonElement).click());await frame(page);expect(await first.locator('.photo-current').evaluate(el=>el.getAnimations().map(a=>a.effect!.getTiming().duration))).toContain(300);await expect(first.locator('.photo-previous')).toHaveCount(0);}
  await page.goto(`/${lang}`);await expect(page.locator('.home-listing-row')).toHaveCount(4);await page.locator('.preferences-trigger').evaluate(el=>(el as HTMLButtonElement).click());await frame(page);expect(await page.locator('dialog').evaluate(el=>el.getAnimations().map(a=>a.effect!.getTiming().duration))).toContain(200);await page.keyboard.press('Escape');await expect(page.locator('dialog')).toHaveCount(0);
  if(page.viewportSize()!.width<=720){await page.locator('.phone-location').evaluate(el=>(el as HTMLButtonElement).click());await frame(page);expect(await page.locator('dialog').evaluate(el=>el.getAnimations().map(a=>a.effect!.getTiming().duration))).toContain(250);await page.keyboard.press('Escape');await expect(page.locator('dialog')).toHaveCount(0);}
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 });
 test(`${lang}: reduced motion is instant across rows, photos and every dialog`,async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});await page.goto(`/${lang}`);await expect(page.locator('.home-listing-row')).toHaveCount(4);const rail=page.locator('.home-rail').first();await rail.scrollIntoViewIfNeeded();await rail.focus();await page.keyboard.press('ArrowRight');await frame(page);await expect(rail).not.toHaveAttribute('data-motion','scrolling');await settled(rail);
  await page.locator('.preferences-trigger').evaluate(el=>(el as HTMLButtonElement).click());await frame(page);await expect(page.locator('dialog')).toBeVisible();expect(await page.locator('dialog').evaluate(el=>el.getAnimations().length)).toBe(0);await page.keyboard.press('Escape');await frame(page);await expect(page.locator('dialog')).toHaveCount(0);
  if(page.viewportSize()!.width<=720){await page.locator('.phone-location').click();await frame(page);expect(await page.locator('dialog').evaluate(el=>el.getAnimations().length)).toBe(0);await page.keyboard.press('Escape');await expect(page.locator('dialog')).toHaveCount(0);}
  await page.goto(`/${lang}/buy`);const card=page.locator('.lcard').first();await expect(card).toBeVisible();await card.locator('.nextph').evaluate(el=>(el as HTMLButtonElement).click());await frame(page);await expect(card.locator('.photo-previous')).toHaveCount(0);expect(await card.locator('.photo-current').evaluate(el=>el.getAnimations().length)).toBe(0);expect(await card.locator('.photo-dots button').nth(1).getAttribute('aria-current')).toBe('true');
  for(const trigger of [card.locator('.contact'),page.locator('.filter-button').filter({hasText:lang==='en'?'Price':'ราคา'}).first()]){await trigger.evaluate(el=>(el as HTMLButtonElement).click());await frame(page);await expect(page.locator('dialog')).toBeVisible();expect(await page.locator('dialog').evaluate(el=>el.getAnimations().length)).toBe(0);await page.keyboard.press('Escape');await frame(page);await expect(page.locator('dialog')).toHaveCount(0);}
  expect(await page.locator('.chip').first().evaluate(el=>getComputedStyle(el).transitionDuration)).toBe('0s');expect(await page.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').length)).toBe(0);
 });
}
