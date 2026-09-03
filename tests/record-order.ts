import { test } from '@playwright/test';

test.setTimeout(120000);

test('запись order HAR', async ({ browser }) => {
  const context = await browser.newContext({
    baseURL: 'http://localhost:4000',
    headless: false,
    recordHar: {
      path: 'tests/hars/order.har',
      url: '**/orders'
    }
  });

  await context.routeFromHAR('tests/hars/ingredients.har', {
    url: '**/ingredients'
  });

  const page = await context.newPage();

  await page.goto('/login');

  console.log('Войди в аккаунт в открывшемся браузере.');

  await page.waitForURL('http://localhost:4000/', {
    timeout: 120000
  });

  const bun = page.locator('li').filter({ hasText: 'Краторная булка N-200i' });

  const filling = page
    .locator('li')
    .filter({ hasText: 'Биокотлета из марсианской Магнолии' });

  await bun.getByRole('button', { name: 'Добавить' }).click();
  await filling.getByRole('button', { name: 'Добавить' }).click();

  await page.getByRole('button', { name: 'Оформить заказ' }).click();

  await page.waitForTimeout(30000);

  await context.close();
});
