# Domestic Helper 頁逆向分析

> 原始檔案：`maid-resource/domestic-helper/source.html`（335 行）
> 原始網址：`https://campaign.1111.com.tw/foreign-domestic-helper-under-12/domestic-helper/`

## 頁面結構（8 Sections）

### 1. SiteHeader（共用）
- 同 home 頁固定 header + NavBar

### 2. HeroSection（雙欄佈局）
- **DOM**: `<section>` 含 hero 區塊
- **React 元件**: `HeroSection`
- **Props**:
  ```typescript
  {
    eyebrow: string;        // "給孩子一個英語環境的"
    title: string;          // "育兒神隊友"
    description: string;    // 2026政府新制放寬...
    highlight: string;      // "只要1名12歲以下子女"
    primaryCTA: CTAButton;  // 查看申請資格
    secondaryCTA: CTAButton; // 立即報名
    image: ResponsiveImage;  // 家庭幫傭做菜圖
  }
  ```
- **佈局**: 左文右圖，手機版堆疊

### 3. AllianceSection（跨海嚴選）
- **DOM**: 3 個 feature row 區塊
- **React 元件**: `AllianceSection`
- **Props**: `{ title, description, features: AllianceFeature[] }`
- **子元件**: `FeatureRow` × 3

| # | 標題 | 說明 | 圖示 |
|---|------|------|------|
| 1 | 菲律賓官方認證仲介 | 直接對接菲律賓政府認證之大型仲介... | 官方認證.png |
| 2 | 雙重安全審核 | 嚴格要求每一位幫傭具備「無犯罪紀錄證明」... | 雙重審核.png |
| 3 | 1111 實地考察把關 | 專案團隊親赴菲律賓實地考察培訓設施... | 1111實地.png |

### 4. WhyPhilippinesSection（為什麼選擇菲律賓幫傭）
- **DOM**: 4 個 feature card 區塊
- **React 元件**: `WhyPhilippinesSection`
- **Props**: `{ title, subtitle, features: FeatureCardItem[] }`
- **子元件**: `FeatureCard` × 4

| # | 標題 | 說明（摘要） | 圖片 |
|---|------|-------------|------|
| 1 | 全天候英語啟蒙環境 | 菲律賓為英語系國家，幫傭具備流利口說能力... | 全天英文2.png |
| 2 | 高比例醫護教保資歷 | 許多菲籍人才擁有護理或教保相關學歷... | 家庭幫傭_顧小孩.png |
| 3 | 溝通高效 品質感一致 | 菲籍人才普遍受過良好教育... | 家庭幫傭_老人對話.png |
| 4 | 熱情耐心 融入家庭 | 菲律賓文化極度重視家庭... | 融入家庭2.png |

### 5. QuoteCTASection（引言 + CTA）
- **DOM**: 引言文字 + CTA 按鈕
- **React 元件**: `QuoteCTASection`
- **Props**:
  ```typescript
  {
    quote: string;  // "讓家務回歸專業，讓陪伴回歸高品質..."
    cta: CTAButton; // 點我立即報名
  }
  ```

### 6. FloatingCTA（固定右下）
- 同 home 頁「申請表單」浮動按鈕

### 7. BackToTop（回到頂端）
- 同 home 頁

### 8. SiteFooter（頁尾）
- `© 2026 1111人力銀行`

## 資料結構化

### HeroData
```typescript
interface HeroData {
  eyebrow: string;
  title: string;
  description: string;
  highlight: string;
  primaryCTA: CTAButton;
  secondaryCTA: CTAButton;
  image: ResponsiveImage;
}
```

### AllianceFeature
```typescript
interface AllianceFeature {
  title: string;
  description: string;
  image: string;
}
```

### FeatureCardItem
```typescript
interface FeatureCardItem {
  title: string;
  description: string;
  image: string;
}
```

### QuoteCTAData
```typescript
interface QuoteCTAData {
  quote: string;
  cta: CTAButton;
}
```

## 樣式特點

- Hero 區塊使用 `linear-gradient(135deg, var(--primary), var(--primary-dark))` 作為背景
- FeatureCard 尺寸：圖片 `468×456`，hover 時有 `translateY(-4px)` + `box-shadow` 效果
- AllianceSection 的圖示尺寸約 `287×250`
- 整體色調延續 home 頁的 `--primary` 體系
