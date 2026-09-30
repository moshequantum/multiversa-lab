import { expect, test } from '@playwright/test';

test('public landing exposes its honest product boundary and roadmap', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Multiversa Lab/);
  await expect(
    page.getByRole('heading', { name: /Memoria y estructura/i, level: 1 })
  ).toBeVisible();
  await expect(page.locator('main')).toContainText(
    'la integración completa todavía no está lista para uso general'
  );
  await expect(page.getByRole('link', { name: /Ver roadmap público/i })).toHaveAttribute(
    'href',
    '#roadmap'
  );
});
