const { test, expect, beforeEach, describe } = require('@playwright/test');
const { loginWith } = require('./helper');

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
    await expect(page.getByText('log in to application')).toBeVisible();
    await expect(page.getByLabel('username')).toBeVisible();
    await expect(page.getByLabel('password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible();
  });

  describe('Login', () => {
    test('login fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'hytosama', 'wrong');
      await expect(page.getByText('wrong username or password')).toBeVisible();
    });
    
    test('login succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'hytosama', 'salainen');
      await expect(page.getByText('blogs')).toBeVisible();
      await expect(page.getByText('Samu Hytönen logged in')).toBeVisible();
    });
  });

});