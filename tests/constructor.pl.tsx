import { test, expect } from '@playwright/test';

test.describe('Конструктор бургера', () => {
  test.beforeEach(async ({ context, page }) => {
    await context.addCookies([
      {
        name: 'accessToken',
        value:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhOTE0ZjA4NmExNzJkMDAxYjk5MzYxOCIsImlhdCI6MTc4ODQ0OTM3NCwiZXhwIjoxNzg4NDUwNTc0fQ.2MbZhxyVcxm17nHgR6fZpDgaMRLWO3XIMc06xkpUzY0',
        domain: 'localhost',
        path: '/'
      }
    ]);

    await page.addInitScript(() => {
      localStorage.setItem(
        'refreshToken',
        'eb26647bd465817ff9207e56357ba75ef2960b15db516deecec623225e4bbd5a43b5cd3570916a7e'
      );
    });

    await page.routeFromHAR('tests/hars/ingredients.har', {
      url: '*/**/api/ingredients'
    });

    await page.routeFromHAR('tests/hars/user.har', {
      url: '*/**/api/auth/user'
    });

    await page.routeFromHAR('tests/hars/order.har', {
      url: '*/**/api/orders',
    });
  });

  // Тест 1
  test('добавление ингредиента в конструктор', async ({ page }) => {
    await page.goto('/');

    const ingredient = page
      .locator('h3')
      .filter({ hasText: 'Булки' })
      .locator('xpath=following-sibling::ul[1]')
      .locator('li')
      .filter({ hasText: 'Флюоресцентная булка R2-D3' });

    await ingredient.getByRole('button', { name: 'Добавить' }).click();

    const constructorSection = page.getByTestId('burger-constructor');

    await expect(
      constructorSection.getByText('Флюоресцентная булка R2-D3 (верх)')
    ).toBeVisible();

    await expect(
      constructorSection.getByText('Флюоресцентная булка R2-D3 (низ)')
    ).toBeVisible();
  });

  // Тест 2
  test('открытие и закрытие модального окна ингредиента', async ({ page }) => {
    await page.goto('/');

    const ingredient = page.getByText('Флюоресцентная булка R2-D3').first();

    await ingredient.click();

    const modal = page.locator('[id="modals"]');

    await expect(modal.getByText('Детали ингредиента')).toBeVisible();

    await expect(modal.getByText('Флюоресцентная булка R2-D3')).toBeVisible();

    await modal.locator('button').click();

    await expect(page.getByText('Детали ингредиента')).not.toBeVisible();
  });

  // Тест 3
  test('создание заказа', async ({ page }) => {
    await page.goto('/');

    const bun = page
      .locator('li')
      .filter({ hasText: 'Краторная булка N-200i' });

    const filling = page
      .locator('li')
      .filter({ hasText: 'Биокотлета из марсианской Магнолии' });

    await bun.getByRole('button', { name: 'Добавить' }).click();

    await filling.getByRole('button', { name: 'Добавить' }).click();

    await page.getByRole('button', { name: 'Оформить заказ' }).click();

    const orderModal = page.locator('[id="modals"]');

    await expect(orderModal.getByText(/^\d+$/)).toBeVisible({ timeout: 30000 });

    const constructorSection = page.getByTestId('burger-constructor');

    await expect(
      constructorSection.getByText('Выберите булки').first()
    ).toBeVisible();

    await expect(
      constructorSection.getByText('Выберите начинку')
    ).toBeVisible();

    await orderModal.locator('button:has(svg)').click();

    await expect(orderModal.getByText(/^\d+$/)).not.toBeVisible();
  });
});
