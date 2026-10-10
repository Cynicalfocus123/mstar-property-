import {test,expect} from '@playwright/test';
test('real temporary PostgreSQL fixtures: 12-home batches, browser history and equal incomplete rows',async({page})=>{
 for(const language of ['en','th']){
  await page.goto(`/${language}/buy`);const show=page.getByRole('button',{name:language==='th'?'แสดงเพิ่มเติม':'Show more homes',exact:true});await expect(page.locator('.lcard')).toHaveCount(12);
  await show.click();await expect(page).toHaveURL(/page=2/);await expect(page.locator('.lcard')).toHaveCount(24);await page.reload();await expect(page.locator('.lcard')).toHaveCount(24);await page.goBack();await expect(page.locator('.lcard')).toHaveCount(12);await page.goForward();await expect(page.locator('.lcard')).toHaveCount(24);
  await show.click();await expect(page).toHaveURL(/page=3/);await expect(page.locator('.lcard')).toHaveCount(28);await expect(show).toHaveCount(0);
  const widths=await page.locator('.lcard').evaluateAll(elements=>elements.map(element=>element.getBoundingClientRect().width));expect(Math.max(...widths)-Math.min(...widths)).toBeLessThan(1);
 }
});
for(const language of ['en','th'])test(`${language}: nearest actual MRT/ARL line and capped featured home rows`,async({page,request})=>{
 for(const [line,distance] of [['MRT',321],['ARL',222]] as const){
  const loc=`fictional-step3b-${line.toLowerCase()}`,response=await request.get(`/api/listings?route=buy&loc=${loc}&lang=${language}`);expect(response.status()).toBe(200);const data=await response.json();expect(data.items).toHaveLength(1);expect(data.items[0].stationLine).toBe(line);expect(data.items[0].stationDistance).toBe(distance);
  await page.goto(`/${language}/buy?loc=${loc}`);await expect(page.locator('.laddr')).toContainText(`${distance} ${language==='th'?'ม. ถึง':'m to'} ${line}`);expect(await page.locator('.laddr').textContent()).not.toContain(`${distance} ${language==='th'?'ม. ถึง':'m to'} BTS`);
 }
 await page.goto(`/${language}`);await expect(page.locator('.home-listing-row')).toHaveCount(4);await expect(page.locator('.home-listing-row').first().locator('.lcard')).toHaveCount(12);await expect(page.locator('.home-listing-row').first().locator('.contact')).toHaveCount(12);
 for(const rail of await page.locator('.home-rail').all())expect(await rail.locator('.lcard').count()).toBeLessThanOrEqual(12);
});
