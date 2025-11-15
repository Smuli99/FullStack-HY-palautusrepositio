const { test, expect, beforeEach, describe } = require('@playwright/test');
const { loginWith, createBlog } = require('./helper');

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
    await page.evaluate(() => localStorage.clear());
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

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, 'hytosama', 'salainen');
      });

      test('user can logout', async ({ page }) => {
        await page.getByRole('button', { name: 'logout' }).click();
        await expect(page.getByText('logged out successfully')).toBeVisible();
      });

      test('a new blog can be created', async ({ page }) => {
        await createBlog(page, {
            title: 'Added with playwright',
            author: 'Foo Bar',
            url: 'https://example.com'
        });

        await expect(page.getByText('Added with playwright Foo Bar')).toBeVisible();
      });

      describe('and a blog exists', () => {
        beforeEach(async ({ page }) => {
          await createBlog(page, {
            title: 'Added with playwright',
            author: 'Foo Bar',
            url: 'https://example.com'
          });
        });

        test('blog can be liked', async ({ page }) => {
          await page.getByRole('button', { name: 'view' }).click();
          await expect(page.getByText('likes 0')).toBeVisible();

          await page.getByRole('button', { name: 'like' }).click();
          await expect(page.getByText('likes 1')).toBeVisible();
        });

        test('blog can be removed by the creator', async ({ page }) => {
          await page.getByRole('button', { name: 'view' }).click();
          page.once('dialog', dialog => dialog.accept());
          await page.getByRole('button', { name: 'remove' }).click();

          await expect(page.getByText('Added with playwright Foo Bar')).not.toBeVisible();
        });
      });
    });
  });

});