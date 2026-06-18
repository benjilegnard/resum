import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Benjamin Legrand/);
});

test('changes the language to French', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('link', { name: 'French' }).click();

  await expect(
    page.getByRole('heading', {
      name: "Bonjour, je m'appelle Benjamin Legrand",
    }),
  ).toBeVisible();
});
