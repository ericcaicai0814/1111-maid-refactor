import { test, expect } from '@playwright/test';

test.describe('幫傭專案頁面 (Domestic Helper)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./domestic-helper');
  });

  test('顯示幫傭專案標題', async ({ page }) => {
    await expect(page.locator('span.text-\\[52px\\]').filter({ hasText: '幫傭專案' })).toBeVisible();
  });

  test('Hero 區塊顯示主要 CTA 按鈕', async ({ page }) => {
    const ctaLinks = page.locator('section').first().locator('a');
    await expect(ctaLinks).not.toHaveCount(0);
  });

  test('CTA 按鈕連結至表單頁', async ({ page }) => {
    const formLink = page.locator('a[href*="/form"]').first();
    await expect(formLink).toBeVisible();
    await formLink.click();
    await expect(page).toHaveURL(/\/form/);
  });

  test('頁面包含主要 section', async ({ page }) => {
    const sections = page.locator('section');
    await expect(sections).not.toHaveCount(0);
  });
});
