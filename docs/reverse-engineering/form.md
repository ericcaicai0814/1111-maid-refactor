# Form 頁逆向分析

> 原始檔案：`maid-resource/foreign-domestic-form/source.html`（1,200 行）
> 原始網址：`https://campaign.1111.com.tw/foreign-domestic-helper-under-12/foreign-domestic-form/`

## 頁面結構

### 1. SiteHeader + NavBar（共用）
### 2. HeroBanner（共用）
### 3. ApplicationFormSection
### 4. MiniFAQ（4 則，與首頁相同）
### 5. FloatingCTA + BackToTop + SiteFooter

## 表單規格

- **Form ID**: `forminator-module-62428`
- **Method**: POST
- **Action**: 空值（由 JavaScript 處理，實際提交至 `admin-ajax.php`）
- **Class**: `forminator-ui forminator-custom-form forminator-custom-form-62428`

## 12 個可見表單欄位

| # | name | type | label | required* |
|---|------|------|-------|-----------|
| 1 | `name-1` | text | 申請人大名* | ✅ |
| 2 | `radio-1` | radio | 稱謂（父/母/其他） | ✅ |
| 3 | `number-1` | number | 有幾位12歲以下小朋友？* | ✅ |
| 4 | `number-2` | number | 小朋友的年齡* | ✅ |
| 5 | `date-1` | text (datepicker) | 小朋友出生年月日* | ✅ |
| 6 | `checkbox-1[]` | checkbox | 家庭狀況（5 選項） | ✅ |
| 7 | `text-1` | text | 戶籍所在地或是聯絡地址* | ✅ |
| 8 | `checkbox-2[]` | checkbox | 幫傭國籍偏好（5 選項） | ✅ |
| 9 | `phone-1` | text | 手機號碼* | ✅ |
| 10 | `email-1` | email | Email* | ✅ |
| 11 | `text-2` | text | 服務單位* | ✅ |
| 12 | `text-3` | text | 職稱* | ✅ |
| 13 | `checkbox-3[]` | checkbox | 方便聯絡時段（4 選項） | ✅ |

> *注意：HTML 中所有欄位的 `required` 屬性均為 `False`（Forminator 爬蟲的標記方式），但 label 帶 `*` 表示實際為必填。真正的驗證由 Forminator JavaScript 端處理。

## Repeater Group（小朋友生日）

欄位 `date-1`（小朋友出生年月日）搭配 + / - 按鈕組成 repeater：
- **新增按鈕**: `<input type="button">` — 複製一組日期欄位
- **移除按鈕**: `<input type="button">` — 移除該組日期欄位
- 最少 1 組，最多數量未限制（由前端邏輯控制）

## 3 個「其他」自訂輸入觸發邏輯

| 觸發欄位 | 自訂輸入 name | 觸發條件 |
|----------|--------------|---------|
| `radio-1` 選「其他」 | `custom-radio-1` | 選中第 3 個 radio 選項時顯示文字輸入框 |
| `checkbox-2[]` 選「其他」 | `custom-checkbox-2` | 勾選第 5 個 checkbox 時顯示文字輸入框 |
| `checkbox-3[]` 選「其他」 | `custom-checkbox-3` | 勾選第 4 個 checkbox 時顯示文字輸入框 |

## Radio 選項

### radio-1（稱謂）
- 父
- 母
- 其他 → 顯示 `custom-radio-1` 文字輸入

## Checkbox 選項

### checkbox-1[]（家庭狀況）
1. 家中育有 1 名未滿 12 歲之罕見疾病兒童、身心障礙兒童、或具特殊境遇之兒童。
2. 家中育有 1 名未滿 6 歲之發展遲緩兒童。
3. 家中 1 名未滿 12 歲兒童，且家長為領有身心障礙證明或為單親家庭。
4. 2 名未滿 12 歲兒童中含 1 名未滿 6 歲者，或 3 名以上未滿 12 歲兒童。
5. 都沒有

### checkbox-2[]（幫傭國籍偏好）
1. 泰國
2. 菲律賓
3. 印尼
4. 不指定
5. 其他 → 顯示 `custom-checkbox-2` 文字輸入

### checkbox-3[]（方便聯絡時段）
1. 平日上午(09:00-12:00)
2. 平日中午(12:00-13:30)
3. 平日晚上(19:00-22:00)
4. 其他 → 顯示 `custom-checkbox-3` 文字輸入

## Hidden Fields

| name | 用途 |
|------|------|
| `referer_url` | 來源頁面 URL |
| `forminator_nonce` | WordPress CSRF 防護 token |
| `_wp_http_referer` | WordPress HTTP referer |
| `form_id` | 表單 ID（62428） |
| `page_id` | 頁面 ID |
| `form_type` | 表單類型（custom_form） |
| `current_url` | 當前頁面 URL |
| `render_id` | 渲染實例 ID |
| `action` | AJAX action（forminator_submit_form_custom-forms） |

## 表單提交端點

原站通過 Forminator AJAX 提交：
```
POST /wp-admin/admin-ajax.php
action=forminator_submit_form_custom-forms
```

Next.js 遷移後應改為 API Route 或 Server Action。

## Zod Schema 草案

```typescript
const ApplicationFormSchema = z.object({
  name: z.string().min(1),
  title: z.enum(['父', '母', '其他']),
  customTitle: z.string().optional(),
  childrenCount: z.number().int().min(1),
  childAge: z.number().int().min(0).max(12),
  childBirthdays: z.array(z.string()).min(1),
  familyStatus: z.array(z.string()).min(1),
  address: z.string().min(1),
  nationalityPreference: z.array(z.string()).min(1),
  customNationality: z.string().optional(),
  phone: z.string().regex(/^09\d{8}$/),
  email: z.string().email(),
  company: z.string().min(1),
  jobTitle: z.string().min(1),
  contactTime: z.array(z.string()).min(1),
  customContactTime: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.title === '其他' && !data.customTitle) {
    ctx.addIssue({ code: 'custom', path: ['customTitle'], message: '請輸入稱謂' });
  }
  if (data.nationalityPreference.includes('其他') && !data.customNationality) {
    ctx.addIssue({ code: 'custom', path: ['customNationality'], message: '請輸入國籍' });
  }
  if (data.contactTime.includes('其他') && !data.customContactTime) {
    ctx.addIssue({ code: 'custom', path: ['customContactTime'], message: '請輸入時段' });
  }
});
```
