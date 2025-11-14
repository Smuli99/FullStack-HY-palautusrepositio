const { test, describe, expect, beforeEach } = require('@playwright/test');
const { loginWith, createNote } = require('./helper');

describe('Note app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset');
    await request.post('/api/users', { 
      data: {
        name: 'Samu Hytönen',
        username: 'hytosama',
        password: 'sekret',
      }
    });

    await page.goto('/');
  });

  test('front page can be opened', async ({ page }) => {
    const locator = page.getByText('Notes');
    await expect(locator).toBeVisible();
  });

  test('login fails with wrong password', async ({ page }) => {
    await loginWith(page, 'hytosama', 'wrong');

    await expect(page.getByText('wrong credentials')).toBeVisible();
    await expect(page.getByText('Samu Hytönen logged in')).not.toBeVisible();
  });

  test('user can login', async ({ page }) => {
    await loginWith(page, 'hytosama', 'sekret');
    await expect(page.getByText('Samu Hytönen logged in')).toBeVisible();
  });

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'hytosama', 'sekret');
    });

    test('a new note can be created', async ({ page }) => {
      await createNote(page, 'a note created by playwright');
      await expect(page.getByText('a note created by playwright')).toBeVisible();
    });

    describe('and a note exists', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'a note created by playwright');
      });

      test('importance can be changed', async ({ page }) => {
        await page.getByRole('button', { name: 'make not important' }).click();
        await expect(page.getByText('make important')).toBeVisible();
      });
    });
  });
});