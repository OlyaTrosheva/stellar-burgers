import { test } from '@playwright/test';

test('запись user HAR', async ({ browser }) => {
  const context = await browser.newContext({
    baseURL: 'http://localhost:4000',
    recordHar: {
      path: 'tests/hars/user.har',
      url: '**/auth/user'
    }
  });

  await context.addCookies([
    {
      name: 'accessToken',
      value:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhOTE0ZjA4NmExNzJkMDAxYjk5MzYxOCIsImlhdCI6MTc4ODQzMjEzNywiZXhwIjoxNzg4NDMzMzM3fQ.rD9IqD9gzRT9LWyqp8ed52Vs_6zJFCRIB7SyTOYq3Jk',
      domain: 'localhost',
      path: '/'
    }
  ]);

  await context.addInitScript(() => {
    localStorage.setItem(
      'refreshToken',
      '13d7deb204c12ee7886a9b38f074483ad9547b4e8deca4ab4ad82a3425ee31a1169ab60ebdb0cf8e'
    );
  });

  const page = await context.newPage();

  await page.goto('/');
  await page.waitForTimeout(3000);

  await context.close();
});
