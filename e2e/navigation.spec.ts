import { test, expect } from '@playwright/test';
import { HeaderPage } from './pages/header.page';

test.describe('Navigation', () => {
  test('Logo 點擊返回首頁', async ({ page }) => {
    await page.goto('./form');
    const header = new HeaderPage(page);
    await header.logo.click();
    await expect(page).toHaveURL(/foreign-domestic-helper-under-12\/?$/);
  });

  test('桌面導覽列 - 幫傭專案連結', async ({ page }) => {
    await page.goto('./');
    const header = new HeaderPage(page);
    await header.clickNavLink('幫傭專案');
    await expect(page).toHaveURL(/\/domestic-helper/);
  });

  test('桌面導覽列 - 報名表單連結', async ({ page }) => {
    await page.goto('./');
    const header = new HeaderPage(page);
    await header.clickNavLink('報名表單');
    await expect(page).toHaveURL(/\/form/);
  });

  test('桌面導覽列 - 常見問題連結', async ({ page }) => {
    await page.goto('./');
    const header = new HeaderPage(page);
    await header.clickNavLink('常見問題');
    await expect(page).toHaveURL(/\/faq/);
  });

  test('桌面導覽列 - 申請資格連結返回首頁', async ({ page }) => {
    await page.goto('./faq');
    const header = new HeaderPage(page);
    await header.clickNavLink('申請資格');
    await expect(page).toHaveURL(/foreign-domestic-helper-under-12\/?$/);
  });

  test('桌面導覽列 active 頁面標示正確', async ({ page }) => {
    await page.goto('./faq');
    const header = new HeaderPage(page);
    const activeLink = header.desktopNav.locator('a[aria-current="page"]');
    await expect(activeLink).toHaveText('常見問題');
  });

  test('手機選單開關正常', async ({ page }) => {
    const header = new HeaderPage(page);
    await page.goto('./');
    await header.openMobileMenu();

    const closeBtn = page.locator('button[aria-label="關閉選單"]');
    await expect(closeBtn).toBeVisible();

    await closeBtn.click();
    await expect(page.locator('button[aria-label="開啟選單"]')).toBeVisible();
  });

  test('手機選單 - 點擊連結後選單關閉', async ({ page }) => {
    const header = new HeaderPage(page);
    await page.goto('./');
    await header.openMobileMenu();
    await header.clickMobileNavLink('常見問題');

    await expect(page).toHaveURL(/\/faq/);
    await expect(page.locator('button[aria-label="關閉選單"]')).not.toBeVisible();
  });
});
