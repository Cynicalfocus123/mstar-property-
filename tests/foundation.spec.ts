import { test, expect } from '@playwright/test';

for (const language of ['th', 'en']) {
  test(`${language}: responsive shell, navigation and modal keyboard access`, async ({ page }, info) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`/${language}`);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('html')).toHaveAttribute('lang', language);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.logo img')).toHaveJSProperty('naturalWidth', 40);
    const geometry = await page.evaluate(() => ({
      headerHeight: document.querySelector('header')!.getBoundingClientRect().height,
      overflow: document.documentElement.scrollWidth > innerWidth,
      background: getComputedStyle(document.body).backgroundColor,
      accent: getComputedStyle(document.documentElement).getPropertyValue('--acc').trim(),
      prompt: document.fonts.check('600 16px Prompt'),
      thai: document.fonts.check('400 16px "Noto Sans Thai"'),
    }));
    expect(geometry).toEqual({ headerHeight: 64, overflow: false, background: 'rgb(255, 255, 255)', accent: '#f2a91a', prompt: true, thai: true });
    const mobile = page.viewportSize()!.width <= 720;
    if (mobile) {
      await expect(page.locator('.main-nav')).toBeHidden();
      await expect(page.locator('.bottom-navigation a')).toHaveCount(5);
      await expect(page.locator('.bottom-navigation')).toBeVisible();
    } else {
      await expect(page.locator('.main-nav a')).toHaveCount(5);
      await expect(page.locator('.main-nav')).toBeVisible();
      await expect(page.locator('.bottom-navigation')).toBeHidden();
    }
    await page.screenshot({ path: info.outputPath(`${language}-${info.project.name}.png`), fullPage: true });
    await page.locator('.preferences-trigger').click();
    await expect(page.getByRole('dialog')).toBeVisible();
    // Native dialog traps keyboard focus and restores it on Escape.
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press('Tab');
      expect(await page.evaluate(() => !!document.activeElement?.closest('dialog'))).toBe(true);
    }
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(page.locator('.preferences-trigger')).toBeFocused();
    await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
    expect(await page.locator('header').evaluate(el => el.getBoundingClientRect().top)).toBe(0);
    await page.goto(`/${language}/contact`);
    await expect(page.locator('.chat-buttons button')).toHaveCount(2);
    for (const button of await page.locator('.chat-buttons button').all()) await expect(button).toBeDisabled();
    await expect(page.locator('h1')).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test('preferences persist and retain route/query; search works on phone and desktop', async ({ page, context }) => {
  await page.goto('/en/contact?source=test');
  await page.locator('.preferences-trigger').click();
  await page.getByRole('combobox', { name: 'Language', exact: true }).selectOption('th');
  await page.getByRole('combobox', { name: 'Currency', exact: true }).selectOption('USD');
  await page.getByRole('button', { name: 'Apply', exact: true }).click();
  await expect(page).toHaveURL('/th/contact?source=test');
  await expect(page.locator('.preferences-trigger')).toHaveText('TH · USD');
  const cookies = await context.cookies();
  expect(cookies.find(cookie => cookie.name === 'mstar-language')?.value).toBe('th');
  expect(cookies.find(cookie => cookie.name === 'mstar-currency')?.value).toBe('USD');
  await page.goto('/');
  await expect(page).toHaveURL('/th');
  await page.goto('/en');
  const tabs = page.getByRole('tab');
  await tabs.first().focus();
  await page.keyboard.press('ArrowRight');
  await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
  if (page.viewportSize()!.width <= 720) {
    await page.locator('.phone-location').click();
    await page.getByRole('dialog').getByLabel('Location', { exact: true }).fill('Sukhumvit');
    await page.getByRole('dialog').getByRole('button', { name: 'Search', exact: true }).click();
  } else {
    await page.getByLabel('Location', { exact: true }).fill('Sukhumvit');
    await page.getByRole('button', { name: 'Search', exact: true }).click();
  }
  await expect(page).toHaveURL('/en/rent?loc=Sukhumvit');
  await expect(page.locator('h1')).toHaveText('Homes for rent');
});

test('health reports actual DB state; language fallback and input validation', async ({ request }) => {
  const health = await request.get('/api/health');
  expect(health.status()).toBe(200);
  expect(await health.json()).toMatchObject({ status: 'ok', database: 'ok', ready: true });
  const firstVisit = await request.get('/', { headers: { 'Accept-Language': 'en-US;q=0.8,th;q=0.9' }, maxRedirects: 0 });
  expect(firstVisit.headers().location).toContain('/th');
  const english = await request.get('/buy?loc=Bangkok', { headers: { 'Accept-Language': 'en-US' }, maxRedirects: 0 });
  expect(english.headers().location).toContain('/en/buy?loc=Bangkok');
  expect((await request.post('/api/preferences', { data: { language: 'fr', currency: 'EUR' } })).status()).toBe(400);
  expect((await request.post('/api/preferences', { headers: { Origin: 'https://other.example' }, data: { language: 'en', currency: 'USD' } })).status()).toBe(403);
  // Next.js streamed responses can retain HTTP 200; the not-found page must
  // still identify the error and exclude the URL from search indexing.
  const missing = await request.get('/en/unknown-page');
  expect(await missing.text()).toContain('404');
  expect(await missing.text()).toContain('noindex');
});
