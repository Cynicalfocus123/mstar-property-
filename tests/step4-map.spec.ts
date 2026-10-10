import {test,expect,type Page} from '@playwright/test';
// Step 4: opt-in map on results pages. Needs the running development app with samples and network access to OpenFreeMap.
const mapReady=async(page:Page,language:string)=>{await expect(page.locator('.results-map-canvas')).toHaveAttribute('data-labels',language,{timeout:30000});};
const openMap=async(page:Page,phone:boolean)=>{await (phone?page.locator('.map-pill'):page.locator('.map-toggle')).click();await expect(page).toHaveURL(/map=1/);};

for(const language of ['en','th'] as const){
 test(`${language}: map opens on request, pins match results, highlight both ways, search as I move, hide`,async({page},info)=>{
  const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
  const width=page.viewportSize()!.width,phone=width<=720;
  await page.goto(`/${language}/buy`);await expect(page.locator('.listing-grid')).toBeVisible();await expect(page.locator('.results-map')).toHaveCount(0);
  await expect(page.locator('.map-toggle')).toBeVisible({visible:!phone});await expect(page.locator('.map-pill')).toBeVisible({visible:phone});
  await openMap(page,phone);await mapReady(page,language);
  const api=await (await page.request.get(`/api/listings?route=buy&lang=${language}&map=1`)).json();
  await expect(page.locator('.map-pin')).toHaveCount(api.pins.length);await expect(page.locator('.map-pin.area')).toHaveCount(api.pins.filter((p:{area:boolean})=>p.area).length);
  await expect(page.locator('.maplibregl-ctrl-attrib')).toContainText('OpenStreetMap');await expect(page.locator('.maplibregl-ctrl-attrib')).toContainText('OpenFreeMap');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  if(phone){
   await expect(page.locator('.results-list')).toBeHidden();await expect(page.locator('.map-pill')).toContainText(language==='th'?'รายการ':'List');
   const box=await page.locator('.results-map').boundingBox(),bar=await page.locator('.results-filter-bar').boundingBox(),tabs=await page.locator('.bottom-navigation').boundingBox();
   expect(box!.y).toBeCloseTo(bar!.y+bar!.height,0);expect(box!.y+box!.height).toBeCloseTo(tabs!.y,0);
   const pin=page.locator('.map-pin:not(.area)').first();await pin.click();await expect(page.locator('.map-preview .lcard')).toBeVisible();
   await page.locator('.map-preview-close').click();await expect(page.locator('.map-preview')).toHaveCount(0);
   await page.screenshot({path:info.outputPath(`${language}-phone-map.png`)});
   await page.locator('.map-pill').click();await expect(page).not.toHaveURL(/map=1/);await expect(page.locator('.results-list')).toBeVisible();
  }else{
   const columns=await page.locator('.listing-grid').evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length);expect(columns).toBe(width>1000?2:1);
   const map=await page.locator('.results-map').boundingBox();expect(map!.width).toBeGreaterThan(250);expect(map!.height).toBeGreaterThan(400);
   // Card → pin, pin → card, keyboard focus on a pin.
   const cell=page.locator('.listing-cell').first(),id=await cell.getAttribute('data-listing-cell');
   await cell.hover();await expect(page.locator(`.map-pin[data-pin-id="${id}"]`)).toHaveClass(/is-highlighted/);
   const other=page.locator('.listing-cell').nth(1),otherId=await other.getAttribute('data-listing-cell');
   await page.locator(`.map-pin[data-pin-id="${otherId}"]`).hover();await expect(other).toHaveAttribute('data-highlighted','true');
   await page.locator(`.map-pin[data-pin-id="${id}"]`).focus();await expect(cell).toHaveAttribute('data-highlighted','true');await page.keyboard.press('Enter');await expect(cell).toBeInViewport();
   await page.screenshot({path:info.outputPath(`${language}-split-map.png`)});
   // Search as I move: a user zoom writes bbox (history replaced); unchecked, it does not.
   await page.locator('.maplibregl-ctrl-zoom-out').click();await expect(page).toHaveURL(/bbox=/);
   const bbox=new URL(page.url()).searchParams.get('bbox');
   await page.locator('.map-search-toggle input').uncheck();await page.locator('.maplibregl-ctrl-zoom-out').click();await page.waitForTimeout(800);
   expect(new URL(page.url()).searchParams.get('bbox')).toBe(bbox);
   await page.reload();await mapReady(page,language);await expect(page.locator('.map-pin')).toHaveCount(api.pins.length);
   await page.locator('.map-toggle').click();await expect(page).not.toHaveURL(/map=1|bbox=/);await expect(page.locator('.results-map')).toHaveCount(0);
   expect(await page.locator('.listing-grid').evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length)).toBe(width>1000?3:2);
   await page.goBack();await expect(page).toHaveURL(/map=1/);await expect(page.locator('.results-map')).toBeVisible();
  }
  expect(errors).toEqual([]);
 });

 test(`${language}: reduced motion opens the map instantly and no listing card hover shadow sticks on touch`,async({page})=>{
  const phone=page.viewportSize()!.width<=720;
  await page.emulateMedia({reducedMotion:'reduce'});await page.goto(`/${language}/rent`);
  await openMap(page,phone);await expect(page.locator('.results-map-surface')).toBeVisible();
  expect(await page.locator('.results-map-surface').evaluate(e=>e.getAnimations().length)).toBe(0);
  await mapReady(page,language);
  if(phone){
   await page.locator('.map-pill').click();await page.locator('.lcard').first().hover();
   const shadow=await page.locator('.lcard').first().evaluate(e=>getComputedStyle(e).boxShadow);expect(shadow).toBe('none');
  }
 });
}

test('invalid map URL values show the existing search error, not a broken map',async({page})=>{
 await page.goto('/en/buy?map=1&bbox=10,10,5,5');await expect(page.locator('.search-error')).toBeVisible();
});
