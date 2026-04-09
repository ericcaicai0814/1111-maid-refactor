import { type Page, type Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly heading: Locator;
  readonly heroBannerLink: Locator;
  readonly quickLinksNav: Locator;
  readonly quickLinks: Locator;
  readonly faqSection: Locator;
  readonly faqButtons: Locator;
  readonly faqMoreLink: Locator;
  readonly tableOfContents: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator('h1').first();
    this.heroBannerLink = page.locator('a[aria-label="立即申請"]');
    this.quickLinksNav = page.locator('nav[aria-label="快速連結"]');
    this.quickLinks = this.quickLinksNav.locator('a');
    this.faqSection = page.locator('#faq');
    this.faqButtons = this.faqSection.locator('button[aria-expanded]');
    this.faqMoreLink = page.locator('a[href*="/faq"]').filter({ hasText: '查看更多常見問題' });
    this.tableOfContents = page.locator('aside');
  }

  async goto() {
    await this.page.goto('./');
  }

  async isLoaded() {
    await expect(this.heading).toBeVisible();
  }

  async clickHeroBanner() {
    await this.heroBannerLink.click();
  }

  async clickQuickLink(index: number) {
    await this.quickLinks.nth(index).click();
  }

  async scrollToFAQ() {
    await this.faqSection.scrollIntoViewIfNeeded();
  }

  async expandFAQItem(index: number) {
    await this.faqButtons.nth(index).click();
  }

  async isFAQItemExpanded(index: number): Promise<boolean> {
    const value = await this.faqButtons.nth(index).getAttribute('aria-expanded');
    return value === 'true';
  }
}
