import { test, expect } from '@playwright/test';
import { HomePage } from './pages/home.page';

test.describe('首頁 (Home Page)', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
    await homePage.isLoaded();
  });

  test('顯示主要標題', async () => {
    await expect(homePage.heading).toContainText('2026政府放寬新制');
  });

  test('顯示快速連結區塊', async () => {
    await expect(homePage.quickLinksNav).toBeVisible();
    const count = await homePage.quickLinks.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('快速連結 - 申請資格錨點連結', async ({ page }) => {
    await homePage.clickQuickLink(0);
    // anchor link stays on same page, section should scroll into view
    await expect(page).toHaveURL(/#policy/);
  });

  test('Hero Banner 圖片連結點擊跳轉至表單', async ({ page }) => {
    await homePage.clickHeroBanner();
    await expect(page).toHaveURL(/\/foreign-domestic-form/);
  });

  test('FAQ 區塊顯示並可展開', async () => {
    await homePage.scrollToFAQ();
    await expect(homePage.faqSection).toBeVisible();

    await homePage.expandFAQItem(0);
    expect(await homePage.isFAQItemExpanded(0)).toBe(true);
  });

  test('FAQ 摺疊後再展開正確切換', async () => {
    await homePage.scrollToFAQ();

    // open
    await homePage.expandFAQItem(0);
    expect(await homePage.isFAQItemExpanded(0)).toBe(true);

    // close
    await homePage.expandFAQItem(0);
    expect(await homePage.isFAQItemExpanded(0)).toBe(false);
  });

  test('常見問題查看更多連結', async ({ page }) => {
    await homePage.faqMoreLink.scrollIntoViewIfNeeded();
    await expect(homePage.faqMoreLink).toBeVisible();
    await homePage.faqMoreLink.click();
    await expect(page).toHaveURL(/\/faq/);
  });

  test('桌面版目錄側邊欄顯示', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.reload();
    await expect(homePage.tableOfContents).toBeVisible();
  });

  test('頁面包含各主要 section', async ({ page }) => {
    for (const id of ['policy', 'cost', 'process', 'documents', 'faq']) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
  });

  test('失敗截圖 - 頁面截圖', async ({ page }, testInfo) => {
    // capture a baseline screenshot
    const screenshot = await page.screenshot({ fullPage: false });
    await testInfo.attach('home-page', { body: screenshot, contentType: 'image/png' });
  });
});
