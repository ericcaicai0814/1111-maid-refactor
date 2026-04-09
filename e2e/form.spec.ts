import { test, expect } from '@playwright/test';
import { FormPage } from './pages/form.page';
import { validFormData, minimalFormData } from './fixtures/form-data';

test.describe('申請表單 (Application Form)', () => {
  let formPage: FormPage;

  test.beforeEach(async ({ page }) => {
    formPage = new FormPage(page);
    await formPage.goto();
    await formPage.isLoaded();
  });

  test.describe('Happy Path', () => {
    test('完整填寫並成功送出表單', async ({ page }, testInfo) => {
      await formPage.fillRequiredFields(validFormData);
      await formPage.submit();
      await formPage.isSubmitSuccessful();

      const screenshot = await page.screenshot();
      await testInfo.attach('after-submit', { body: screenshot, contentType: 'image/png' });
    });

    test('填寫第二組有效資料並成功送出', async () => {
      await formPage.fillRequiredFields(minimalFormData);
      await formPage.submit();
      await formPage.isSubmitSuccessful();
    });

    test('選「其他」稱謂後填寫自訂稱謂並送出', async () => {
      await formPage.fillRequiredFields({ ...validFormData, title: '其他' });
      await formPage.fillCustomTitle('阿公');
      await formPage.submit();
      await formPage.isSubmitSuccessful();
    });
  });

  test.describe('Validation', () => {
    test('空表單送出顯示必填錯誤', async ({ page }, testInfo) => {
      await formPage.submit();

      const screenshot = await page.screenshot({ fullPage: true });
      await testInfo.attach('validation-errors', { body: screenshot, contentType: 'image/png' });

      const errors = await formPage.getVisibleErrors();
      expect(errors.length).toBeGreaterThan(0);
    });

    test('手機號碼格式錯誤顯示提示', async ({ page }) => {
      await formPage.fillRequiredFields({ ...validFormData, phone: '1234567890' });
      await formPage.submit();

      await expect(page.locator('text=請輸入有效的手機號碼')).toBeVisible();
    });

    test('Email 格式錯誤顯示提示', async ({ page }) => {
      await formPage.fillRequiredFields({ ...validFormData, email: 'not-an-email' });
      await formPage.submit();

      await expect(page.locator('text=請輸入有效的 Email')).toBeVisible();
    });

    test('未選稱謂顯示錯誤', async ({ page }) => {
      await formPage.nameInput.fill(validFormData.name);
      await formPage.submit();

      await expect(page.locator('text=請選擇稱謂')).toBeVisible();
    });

    test('選「其他」稱謂但不填自訂欄位顯示錯誤', async ({ page }) => {
      await formPage.fillRequiredFields({ ...validFormData, title: '其他' });
      // do NOT fill custom title
      await formPage.submit();

      await expect(page.locator('text=請輸入稱謂')).toBeVisible();
    });

    test('未勾選家庭狀況顯示錯誤', async ({ page }) => {
      await formPage.nameInput.fill(validFormData.name);
      await formPage.selectTitle(validFormData.title);
      await formPage.submit();

      await expect(page.locator('text=請至少勾選一項家庭狀況')).toBeVisible();
    });

    test('未勾選國籍偏好顯示錯誤', async ({ page }) => {
      await formPage.nameInput.fill(validFormData.name);
      await formPage.selectTitle(validFormData.title);
      await formPage.checkFamilyStatus(validFormData.familyStatus);
      await formPage.submit();

      await expect(page.locator('text=請至少勾選一項國籍偏好')).toBeVisible();
    });

    test('未勾選聯絡時段顯示錯誤', async ({ page }) => {
      // fill everything except contactTime
      await formPage.nameInput.fill(validFormData.name);
      await formPage.selectTitle(validFormData.title);
      await formPage.setChildrenCount(validFormData.childrenCount);
      await formPage.childAgeInput.fill(String(validFormData.childAge));
      await formPage.fillChildBirthday(0, validFormData.childBirthday);
      await formPage.checkFamilyStatus(validFormData.familyStatus);
      await formPage.addressInput.fill(validFormData.address);
      await formPage.checkNationality(validFormData.nationality);
      await formPage.phoneInput.fill(validFormData.phone);
      await formPage.emailInput.fill(validFormData.email);
      await formPage.companyInput.fill(validFormData.company);
      await formPage.jobTitleInput.fill(validFormData.jobTitle);
      await formPage.submit();

      await expect(page.locator('text=請至少勾選一項聯絡時段')).toBeVisible();
    });

    test('小朋友年齡超過 12 歲顯示錯誤', async ({ page }) => {
      await formPage.fillRequiredFields({ ...validFormData, childAge: 13 });
      await formPage.submit();

      await expect(page.locator('text=須為 12 歲以下')).toBeVisible();
    });
  });

  test.describe('Dynamic Fields', () => {
    test('選「其他」國籍後顯示自訂欄位', async ({ page }) => {
      await formPage.checkNationality('其他');
      await expect(page.locator('input[placeholder="請輸入國籍"]')).toBeVisible();
    });

    test('取消勾選「其他」國籍後隱藏自訂欄位', async ({ page }) => {
      await formPage.checkNationality('其他');
      await expect(page.locator('input[placeholder="請輸入國籍"]')).toBeVisible();
      // uncheck
      await formPage.checkNationality('其他');
      await expect(page.locator('input[placeholder="請輸入國籍"]')).not.toBeVisible();
    });

    test('選「其他」聯絡時段後顯示自訂欄位', async ({ page }) => {
      await formPage.checkContactTime('其他');
      await expect(page.locator('input[placeholder="請輸入聯絡時段"]')).toBeVisible();
    });

    test('選「其他」稱謂後顯示自訂稱謂欄位', async ({ page }) => {
      await formPage.selectTitle('其他');
      await expect(page.locator('input[placeholder="請輸入稱謂"]')).toBeVisible();
    });

    test('小朋友人數增加後出現對應出生日期欄位', async ({ page }) => {
      await formPage.setChildrenCount(3);
      // Wait for repeater to re-render
      await expect(page.locator('label:text("第 3 位小朋友出生年月日")')).toBeVisible();
    });

    test('勾選「都沒有」後其他家庭狀況選項被禁用', async ({ page }) => {
      await formPage.checkFamilyStatus('none');
      // other options should be disabled
      const rareDisease = page.locator('#familyStatus-rare-disease');
      await expect(rareDisease).toBeDisabled();
    });

    test('已勾選其他選項後勾選「都沒有」清除其他勾選', async ({ page }) => {
      await formPage.checkFamilyStatus('rare-disease');
      await expect(page.locator('#familyStatus-rare-disease')).toBeChecked();

      await formPage.checkFamilyStatus('none');
      await expect(page.locator('#familyStatus-rare-disease')).not.toBeChecked();
      await expect(page.locator('#familyStatus-none')).toBeChecked();
    });
  });

  test.describe('Multi-child Validation', () => {
    test('小朋友人數為 2 時第 2 個生日未填顯示必填錯誤', async ({ page }) => {
      await formPage.fillRequiredFields(validFormData);
      // Change count to 2 — repeater adds a 2nd empty birthday field
      await formPage.setChildrenCount(2);
      await formPage.submit();

      // The 2nd birthday is empty, so per-field validation fires
      await expect(page.locator('text=請選擇出生年月日')).toBeVisible();
    });

    test('小朋友人數為 2 且 2 個生日都填寫後可成功送出', async () => {
      await formPage.fillRequiredFields(validFormData);
      await formPage.setChildrenCount(2);
      await formPage.fillChildBirthday(1, '2021-08-10');
      // Also update childAge to be valid (for child 1, age 5 is fine)
      await formPage.submit();
      await formPage.isSubmitSuccessful();
    });
  });
});
