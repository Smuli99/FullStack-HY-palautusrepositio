const { test, expect, beforeEach, describe } = require('@playwright/test');

describe('Blog App', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset');
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Samu Hytönen',
        username: 'hytosama',
        password: 'salainen',
      },
    });

    await page.goto('http://localhost:5173');
  });

  test('front page can be opended and login form is shown', async ({ page }) => {
    expect(page.getByText('log in to application')).toBeVisible();
    expect(page.getByLabel('username')).toBeVisible();
    expect(page.getByLabel('password')).toBeVisible();
    expect(page.getByRole('button', { name: 'login' })).toBeVisible();
  });
});