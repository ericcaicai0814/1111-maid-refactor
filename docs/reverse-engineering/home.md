# Home 頁逆向分析

> 原始檔案：`maid-resource/home/source.html`（1,245 行）
> 原始網址：`https://campaign.1111.com.tw/foreign-domestic-helper-under-12/`

## 頁面結構（11 Sections）

### 1. SiteHeader（固定頂部）
- **DOM**: `<header id="brx-header">` → `<section id="brxe-eqzgrp">`
- **React 元件**: `SiteHeader`
- **行為**: `position: fixed; z-index: 99`，含 logo + NavBar
- **Props**: 無（靜態）

### 2. NavBar
- **DOM**: `<div id="brxe-tfvafj">` → 4 個 `<h3>` 連結
- **React 元件**: `NavBar`
- **Props**: `navItems: NavItem[]`
- **互動**: `aria-current="page"` 標記當前頁面

### 3. HeroBanner
- **DOM**: `<section id="brxe-jawspg">` → `<a>` 包裹 `<img>`
- **React 元件**: `HeroBanner`
- **Props**: `{ imageUrl, alt, linkUrl }`
- **行為**: 整張圖可點擊，連結至表單頁

### 4. PolicyHighlightSection（2026 新制政策亮點）
- **DOM**: `<div id="brxe-agtwsf">` 內的 `premium-compare-section`
- **React 元件**: `PolicyHighlightSection`
- **Props**: `{ title, subtitle, items: PolicyHighlight[] }`
- **內容**: 4 項政策亮點（checkmark list），每項含 icon + 文字 + 高亮數字

### 5. EligibilityCalculator（資格與點數試算器）
- **DOM**: `<div id="job-calc-container">`
- **React 元件**: `EligibilityCalculator`
- **Props**: `{ childItems: CalculatorItem[], extraItems: CalculatorItem[] }`
- **互動行為**:
  - 「小朋友相關項目」有輸入 > 0 時，才顯示「其他加分項目」區塊
  - 「清除重置」按鈕歸零所有輸入並隱藏結果
  - 「計算總點數」按鈕觸發 3 層判定邏輯

#### 計算器商業邏輯

**輸入項目與權重：**

| 項目 | 類別 | data-weight |
|------|------|-------------|
| 滿 6 歲，未滿 12 歲 | child-item | 4 |
| 未滿 6 歲 | child-item | 6 |
| 未滿 6 歲遲緩/12 歲以下身障/罕病/特境 | child-item | 10 |
| 單親/無親/父母一方身障 | extra-item | 3 |
| 長者滿 75，未滿 80 歲 | extra-item | 1 |
| 長者滿 80 歲以上 | extra-item | 2 |

**3 層判定規則：**
1. **基礎門檻**：至少一項 child-item 的值 > 0，否則「不符合申請資格」
2. **特境或 ≥10 分**：若「單親/無親/父母一方身障」> 0 或總分 ≥ 10 → 就業安定費 $2,000
3. **≥4 分**：總分 ≥ 4 但不滿足條件 2 → 就業安定費 $5,000
4. **< 4 分**：有小朋友但點數不足 → 不符合申請資格

### 6. CostTableSection（費用表格）
- **DOM**: `<div id="brxe-kumcuy">`
- **React 元件**: `CostTableSection`
- **子區塊**:
  - 雇主需支付（每月）：自訂 HTML 表格 `matrix-table`
  - 外籍幫傭自付額：TablePress #11（8 列）
  - 備註事項：TablePress #12（6 列）

### 7. ProcessFlowSection（申請流程圖）
- **DOM**: `<div id="brxe-jdtsdh">` → `.flow-track` → 6 個 `.step`
- **React 元件**: `ProcessFlowSection`
- **Props**: `{ steps: ProcessStep[] }`
- **RWD 行為**: 桌面 = 水平交錯排列（奇上偶下）；手機 ≤ 768px = 垂直堆疊

### 8. DocumentListSection（申請文件）
- **DOM**: `<div id="brxe-kfftyg">`
- **React 元件**: `DocumentListSection`
- **Props**: `{ documents: DocumentItem[] }`
- **內容**: 4 大類文件（基本身分、求才證明、特殊身分、審查費）

### 9. MiniFAQ（迷你問答 — 4 則）
- **DOM**: `<div id="brxe-hwlehr">` accordion-nested
- **React 元件**: `MiniFAQ`（共用元件）
- **Props**: `{ items: FAQItem[] }`
- **互動**: 點擊展開/收合，展開時標題變 `--primary` 色，icon 旋轉

### 10. BottomCTA
- **DOM**: `<a id="brxe-yeuyxx">` 「點我立即報名」
- **React 元件**: `CTAButton`

### 11. FloatingCTA + BackToTop
- **DOM**: `<a id="brxe-jptejd">` 固定右下「申請表單」+ `<a id="brxe-jiaock">` 回到頂端
- **行為**: `position: fixed; right: 20px`

## 樣式提取

### `:root` 變數
```css
:root {
  --primary: #837ccf;
  --primary-light: #ecebf7;
  --primary-dark: #3d378e;
  --primary-bg: #f5f4ff;
  --accent: #f5c842;
  --accent-dark: #d4a912;
  --text-dark: #2d2a4a;
  --text-mid: #5a5470;
  --text-light: #8a85a8;
  --white: #ffffff;
  --shadow: 0 4px 20px rgba(131, 124, 207, 0.18);
  --shadow-hover: 0 8px 32px rgba(131, 124, 207, 0.32);
}
```

### `brxe-*` class 用途
- `brxe-section`: 最外層 section
- `brxe-container`: 限寬容器（1100px）
- `brxe-block`: 通用 div 包裝
- `brxe-heading`: 標題元素
- `brxe-text-basic`: 內文段落
- `brxe-accordion-nested`: FAQ accordion 容器
- `brxe-button`: CTA 按鈕

### 斷點
- `max-width: 478px` — 手機
- `max-width: 767px` — 平板（字體縮放、排版調整）
- `max-width: 768px` — 流程圖垂直切換

### 動畫
- `.animate-up`: `opacity: 0; transform: translateY(40px)` → `.visible` 時過渡
- 按鈕 hover: `transform: translateY(-4px); box-shadow: var(--shadow-hover)`
- Accordion: icon 旋轉 + 標題變色

## 資料結構化

### NavItem
```typescript
{ label: string; href: string; isActive?: boolean }
```

### PolicyHighlight
```typescript
{ icon: 'check' | 'clock'; text: string; highlight: string }
```

### CalculatorItem
```typescript
{ label: string; weight: number; category: 'child' | 'extra'; min: number }
```

### EmployerMonthlyCost（雇主月付表）
```typescript
{ baseSalary: number; healthInsurance: number; occupationalInsurance: number;
  employmentStabilizationFee: number; basicBurden: number;
  overtime: { fourDays: number; fiveDays: number };
  totalSalary: { fourDays: number; fiveDays: number } }
```

### MaidSelfPayItem（幫傭自付表，8 列）
```typescript
{ item: string; cost: string; description: string }
```

### RemarksItem（備註表，6 列）
```typescript
{ item: string; amount: string; description: string }
```

### ProcessStep（流程步驟，6 步）
```typescript
{ step: number; title: string; description: string; emphasis?: string }
```

### DocumentItem
```typescript
{ category: string; content: string; subItems?: string[] }
```

### FAQItem
```typescript
{ id: number; question: string; answer: string }
```
