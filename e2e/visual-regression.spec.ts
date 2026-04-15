import { test, expect } from '@playwright/test';

// ── 頁面清單 ──────────────────────────────────

const pages = [
  { name: '申請資格', path: './' },
  { name: '報名表單', path: './foreign-domestic-form' },
  { name: '常見問題', path: './faq' },
] as const;

// ── 靜態快照 ──────────────────────────────────

for (const { name, path } of pages) {
  test(`${name} — 靜態截圖`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot(`${name}-static.png`);
  });
}

// ── DOM 結構快照 ──────────────────────────────

for (const { name, path } of pages) {
  test(`${name} — DOM 結構`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState('networkidle');

    const structure = await page.evaluate(() => {
      const selectors = ['nav', 'main', 'footer', 'section', 'h1', 'h2'];
      return selectors.map((s) => ({
        tag: s,
        count: document.querySelectorAll(s).length,
        classes: [...document.querySelectorAll(s)].map((el) =>
          [...el.classList].sort().join(' '),
        ),
      }));
    });

    expect(JSON.stringify(structure, null, 2)).toMatchSnapshot(
      `${name}-structure.json`,
    );
  });
}

// ── 互動狀態快照 ──────────────────────────────

test.describe('申請資格 — 互動', () => {
  test('MiniFAQ 展開', async ({ page }) => {
    await page.goto('./');
    await page.locator('#faq button').first().click();
    await expect(page.locator('#faq')).toHaveScreenshot(
      '申請資格-faq-expanded.png',
    );
  });

  test('TOC 側邊欄 hover（桌面）', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('./');
    const tocLink = page.locator('aside a').first();
    await tocLink.hover();
    await expect(tocLink).toHaveScreenshot('申請資格-toc-hover.png');
  });
});

test.describe('常見問題 — 互動', () => {
  test('Accordion 展開單項', async ({ page }) => {
    await page.goto('./faq');
    await page.waitForLoadState('networkidle');
    await page.locator('main button[aria-expanded]').first().click();
    await expect(page.locator('main')).toHaveScreenshot(
      'faq-accordion-expanded.png',
    );
  });

  test('Accordion 展開多項', async ({ page }) => {
    await page.goto('./faq');
    await page.waitForLoadState('networkidle');
    await page.locator('main button[aria-expanded]').nth(0).click();
    await page.locator('main button[aria-expanded]').nth(1).click();
    await expect(page.locator('main')).toHaveScreenshot(
      'faq-accordion-multi.png',
    );
  });
});

test.describe('報名表單 — 互動', () => {
  test('欄位 focus 狀態', async ({ page }) => {
    await page.goto('./foreign-domestic-form');
    await page.waitForLoadState('networkidle');
    await page.locator('input[name="name"]').focus();
    await expect(page.locator('form')).toHaveScreenshot('form-input-focus.png');
  });

  test('Radio 選取（稱謂）', async ({ page }) => {
    await page.goto('./foreign-domestic-form');
    await page.waitForLoadState('networkidle');
    await page.locator('label[for="title-其他"]').click();
    await expect(page.locator('form')).toHaveScreenshot('form-radio-other.png');
  });

  test('Checkbox 選取（家庭狀況）', async ({ page }) => {
    await page.goto('./foreign-domestic-form');
    await page.waitForLoadState('networkidle');
    const checkbox = page.locator('label[for^="familyStatus-"]').first();
    await checkbox.click();
    await expect(page.locator('form')).toHaveScreenshot(
      'form-checkbox-checked.png',
    );
  });

  test('表單驗證錯誤', async ({ page }) => {
    await page.goto('./foreign-domestic-form');
    await page.waitForLoadState('networkidle');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('form')).toHaveScreenshot(
      'form-validation-errors.png',
    );
  });

  test('MiniFAQ 展開（表單頁）', async ({ page }) => {
    await page.goto('./foreign-domestic-form');
    await page.waitForLoadState('networkidle');
    await page.locator('#faq button').first().click();
    await expect(page.locator('#faq')).toHaveScreenshot(
      'form-faq-expanded.png',
    );
  });
});
