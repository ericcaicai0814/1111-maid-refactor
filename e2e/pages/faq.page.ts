import { type Page, type Locator, expect } from '@playwright/test';

export class FAQPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly accordionButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator('h1').filter({ hasText: '申請問答' });
    this.accordionButtons = page.locator('main button[aria-expanded]');
  }

  async goto() {
    await this.page.goto('./faq');
  }

  async isLoaded() {
    await expect(this.heading).toBeVisible();
  }

  async toggleItem(index: number) {
    await this.accordionButtons.nth(index).click();
  }

  async isItemExpanded(index: number): Promise<boolean> {
    const value = await this.accordionButtons.nth(index).getAttribute('aria-expanded');
    return value === 'true';
  }

  async getItemCount(): Promise<number> {
    return this.accordionButtons.count();
  }
}
