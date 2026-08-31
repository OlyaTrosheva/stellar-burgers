import { test, expect } from '@playwright/test';

test.describe('Конструктор бургера', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('tests/hars/ingredients.har', {
      url: '**/ingredients'
    });

    await page.routeFromHAR('tests/hars/user.har', {
      url: '**/auth/user'
    });

    await page.route('**/auth/user', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          user: {
            email: 'ariev@gmail.com',
            name: 'аааа'
          }
        })
      });
    });

    await page.routeFromHAR('tests/hars/order.har', {
      url: '**/orders'
    });
  });

  test('добавление ингредиента в конструктор', async ({ page }) => {
    await page.goto('/');

    const ingredient = page.getByText('Флюоресцентная булка R2-D3').first();

    await ingredient.click();

    await expect(
      page.getByText('Флюоресцентная булка R2-D3').last()
    ).toBeVisible();
  });

  test('открытие и закрытие модального окна ингредиента', async ({ page }) => {
    await page.goto('/');

    const ingredient = page.getByText('Флюоресцентная булка R2-D3').first();

    await ingredient.click();

    await expect(page.getByText('Детали ингредиента')).toBeVisible();
    await expect(
      page.getByText('Флюоресцентная булка R2-D3').last()
    ).toBeVisible();

    await page
      .locator('button')
      .filter({ has: page.locator('svg') })
      .last()
      .click();

    await expect(page.getByText('Детали ингредиента')).not.toBeVisible();
  });

  test('создание заказа', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Добавить' }).first().click();

    await page.getByRole('button', { name: 'Оформить заказ' }).click();

    await expect(page.getByText('109548')).toBeVisible();

    await expect(page.getByText('Выберите булки').first()).toBeVisible();

    await expect(page.getByText('Выберите начинку')).toBeVisible();

    await page
      .locator('button')
      .filter({ has: page.locator('svg') })
      .last()
      .click();

    await expect(page.getByText('109548')).not.toBeVisible();
  });
});
