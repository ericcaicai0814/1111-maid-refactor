import { test, expect } from '@playwright/test';
import { FAQPage } from './pages/faq.page';

test.describe('FAQ 常見問題頁面', () => {
  let faqPage: FAQPage;

  test.beforeEach(async ({ page }) => {
    faqPage = new FAQPage(page);
    await faqPage.goto();
    await faqPage.isLoaded();
  });

  test('顯示 FAQ 頁面標題', async () => {
    await expect(faqPage.heading).toBeVisible();
  });

  test('FAQ 列表至少有一項', async () => {
    const count = await faqPage.getItemCount();
    expect(count).toBeGreaterThan(0);
  });

  test('點擊 FAQ 項目展開答案', async () => {
    await faqPage.toggleItem(0);
    expect(await faqPage.isItemExpanded(0)).toBe(true);
  });

  test('點擊已展開 FAQ 項目可收合', async () => {
    await faqPage.toggleItem(0);
    expect(await faqPage.isItemExpanded(0)).toBe(true);

    await faqPage.toggleItem(0);
    expect(await faqPage.isItemExpanded(0)).toBe(false);
  });

  test('多個 FAQ 可同時展開（不互斥）', async () => {
    const count = await faqPage.getItemCount();
    test.skip(count < 2, 'FAQ 項目少於 2 項，無法測試同時展開');

    await faqPage.toggleItem(0);
    await faqPage.toggleItem(1);

    expect(await faqPage.isItemExpanded(0)).toBe(true);
    expect(await faqPage.isItemExpanded(1)).toBe(true);
  });

  test('展開 FAQ 後顯示答案內容', async () => {
    await faqPage.toggleItem(0);
    expect(await faqPage.isItemExpanded(0)).toBe(true);
  });

  test('FAQ 頁面截圖', async ({ page }, testInfo) => {
    const screenshot = await page.screenshot({ fullPage: false });
    await testInfo.attach('faq-page', { body: screenshot, contentType: 'image/png' });
  });
});
