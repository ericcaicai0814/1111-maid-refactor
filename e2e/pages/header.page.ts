import { type Page, type Locator } from '@playwright/test';

export class HeaderPage {
  readonly page: Page;
  readonly logo: Locator;
  readonly desktopNav: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('header img[alt="1111外傭專區"]');
    this.desktopNav = page.locator('header nav.hidden');
  }

  async clickNavLink(label: string) {
    await this.desktopNav.getByRole('link', { name: label }).click();
  }

  async openMobileMenu() {
    await this.page.setViewportSize({ width: 375, height: 812 });
    await this.page.locator('button[aria-label="開啟選單"]').click();
  }

  async clickMobileNavLink(label: string) {
    await this.page.locator('header ul.flex-col').getByRole('link', { name: label }).click();
  }
}
