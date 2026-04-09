import { type Page, type Locator, expect } from '@playwright/test';

export class FormPage {
  readonly page: Page;
  readonly formCard: Locator;
  readonly nameInput: Locator;
  readonly childrenCountInput: Locator;
  readonly childAgeInput: Locator;
  readonly addressInput: Locator;
  readonly phoneInput: Locator;
  readonly emailInput: Locator;
  readonly companyInput: Locator;
  readonly jobTitleInput: Locator;
  readonly submitButton: Locator;
  readonly successCard: Locator;

  constructor(page: Page) {
    this.page = page;
    this.formCard = page.locator('form');
    this.nameInput = page.locator('#name');
    this.childrenCountInput = page.locator('#childrenCount');
    this.childAgeInput = page.locator('#childAge');
    this.addressInput = page.locator('#address');
    this.phoneInput = page.locator('#phone');
    this.emailInput = page.locator('#email');
    this.companyInput = page.locator('#company');
    this.jobTitleInput = page.locator('#jobTitle');
    this.submitButton = page.locator('button[type="submit"]');
    this.successCard = page.locator('text=表單送出成功');
  }

  async goto() {
    await this.page.goto('./form');
  }

  async isLoaded() {
    await expect(this.formCard).toBeVisible();
  }

  async selectTitle(title: '父' | '母' | '其他') {
    // Shadcn RadioGroupItem hides the native input; click the visible label instead
    await this.page.locator(`label[for="title-${title}"]`).click();
  }

  async fillCustomTitle(value: string) {
    await this.page.locator('input[placeholder="請輸入稱謂"]').fill(value);
  }

  async setChildrenCount(count: number) {
    await this.childrenCountInput.fill(String(count));
    await this.childrenCountInput.blur();
  }

  async fillChildBirthday(index: number, date: string) {
    // date format: YYYY-MM-DD
    await this.page.locator(`#childBirthdays\\.${index}`).fill(date);
  }

  async checkFamilyStatus(value: string) {
    // Shadcn Checkbox hides native input; click label to toggle
    await this.page.locator(`label[for="familyStatus-${value}"]`).click();
  }

  async checkNationality(value: string) {
    await this.page.locator(`label[for="nationalityPreference-${value}"]`).click();
  }

  async fillCustomNationality(value: string) {
    await this.page.locator('input[placeholder="請輸入國籍"]').fill(value);
  }

  async checkContactTime(value: string) {
    await this.page.locator(`label[for="contactTime-${value}"]`).click();
  }

  async fillCustomContactTime(value: string) {
    await this.page.locator('input[placeholder="請輸入聯絡時段"]').fill(value);
  }

  async fillRequiredFields(data: {
    name: string;
    title: '父' | '母' | '其他';
    childrenCount: number;
    childAge: number;
    childBirthday: string;
    familyStatus: string;
    address: string;
    nationality: string;
    phone: string;
    email: string;
    company: string;
    jobTitle: string;
    contactTime: string;
  }) {
    await this.nameInput.fill(data.name);
    await this.selectTitle(data.title);
    await this.setChildrenCount(data.childrenCount);
    await this.childAgeInput.fill(String(data.childAge));
    await this.fillChildBirthday(0, data.childBirthday);
    await this.checkFamilyStatus(data.familyStatus);
    await this.addressInput.fill(data.address);
    await this.checkNationality(data.nationality);
    await this.phoneInput.fill(data.phone);
    await this.emailInput.fill(data.email);
    await this.companyInput.fill(data.company);
    await this.jobTitleInput.fill(data.jobTitle);
    await this.checkContactTime(data.contactTime);
  }

  async submit() {
    await this.submitButton.click();
  }

  async isSubmitSuccessful() {
    await expect(this.successCard).toBeVisible();
  }

  async getVisibleErrors(): Promise<string[]> {
    const errorElements = this.page.locator('p.text-red-500');
    return errorElements.allTextContents();
  }
}
