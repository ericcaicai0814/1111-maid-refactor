# 逆向分析報告：1111 外籍幫傭申請專案

## 專案背景

原站使用 **WordPress + Bricks Builder** 搭建，目標遷移至 **Next.js (App Router)** 全端應用。
本報告涵蓋 4 個 HTML 頁面的深度逆向分析，包含元件拆分、樣式提取、資料結構化。

## 頁面總覽

| 頁面 | 用途 | 行數 | 複雜度 | 分析文件 |
|------|------|------|--------|---------|
| home | 首頁 — 申請資格、積分計算器、費用表、流程圖、迷你 FAQ | 1,245 | 高 | [home.md](./home.md) |
| domestic-helper | 服務介紹頁 — 為何選菲律賓幫傭、1111 篩選流程 | 335 | 低 | [domestic-helper.md](./domestic-helper.md) |
| faq | 完整 FAQ 頁 — 19 則問答 | 295 | 低 | [faq.md](./faq.md) |
| foreign-domestic-form | 報名表單頁 — 12 欄位 + repeater + 迷你 FAQ | 1,200 | 中 | [form.md](./form.md) |

## 共用元件清單（7 個）

| 元件名稱 | 用途 | 出現頁面 |
|----------|------|---------|
| `SiteHeader` | 固定頂部 header，含 logo + 導覽列 | 全部 |
| `NavBar` | 4 項水平導覽（幫傭專案/申請資格/報名表單/常見問題） | 全部 |
| `HeroBanner` | 主視覺 banner 圖片（可點擊連結至表單） | home, faq, form |
| `FooterCTA` | 底部固定「申請表單」按鈕 | 全部 |
| `BackToTop` | 右下角回到頂端按鈕 | 全部 |
| `SiteFooter` | 頁尾版權宣告 | 全部 |
| `MiniFAQ` | 迷你 FAQ（4 則 accordion），出現於首頁與表單頁 | home, form |

## 頁面專屬元件清單（13 個）

| 元件名稱 | 所屬頁面 | 用途 |
|----------|---------|------|
| `PolicyHighlightSection` | home | 2026 新制政策亮點（4 項 checkmark list） |
| `EligibilityCalculator` | home | 資格與點數試算器（6 項輸入 + 3 層判定邏輯） |
| `CostTableSection` | home | 雇主月付、幫傭自付、備註 3 張表格 |
| `ProcessFlowSection` | home | 6 步驟申請流程圖（桌面水平/手機垂直） |
| `DocumentListSection` | home | 申請文件清單 |
| `HeroSection` | domestic-helper | 雙欄佈局（文案 + 圖片） |
| `AllianceSection` | domestic-helper | 跨海嚴選：3 張 FeatureRow 卡片 |
| `WhyPhilippinesSection` | domestic-helper | 為何選菲律賓：4 張 FeatureCard |
| `QuoteCTASection` | domestic-helper | 引言 + CTA 按鈕 |
| `FAQAccordionSection` | faq | 完整 19 則 FAQ accordion |
| `ApplicationFormSection` | form | 12 欄位表單 + repeater + hidden fields |
| `ContactInfoSection` | form | 聯絡方式標題區塊 |
| `TableOfContents` | home | 快速連結目錄（sticky sidebar） |

## Design Tokens

### Colors

| Token | 值 | 用途 |
|-------|-----|------|
| `--primary` | `#837ccf` | 主色調（按鈕、標題、連結） |
| `--primary-light` | `#ecebf7` | 淺色背景、表格邊框 |
| `--primary-dark` | `#3d378e` | 深色背景（header, nav, 表頭） |
| `--primary-bg` | `#f5f4ff` | 區塊背景色 |
| `--accent` | `#f5c842` | 強調色（漸層裝飾線） |
| `--accent-dark` | `#d4a912` | 深色強調 |
| `--text-dark` | `#2d2a4a` | 主要文字 |
| `--text-mid` | `#5a5470` | 次要文字 |
| `--text-light` | `#8a85a8` | 輔助文字 |
| `--white` | `#ffffff` | 白色 |

### Shadows

| Token | 值 |
|-------|-----|
| `--shadow` | `0 4px 20px rgba(131, 124, 207, 0.18)` |
| `--shadow-hover` | `0 8px 32px rgba(131, 124, 207, 0.32)` |

> **Bug**: `--shadow-hover` 在 `:root` 中有定義，但在 `domestic-helper` 頁面的 `:root` 未定義（僅 home 有）。

### Breakpoints

| 名稱 | 值 | 用途 |
|------|-----|------|
| mobile | `max-width: 478px` | 手機版 |
| tablet | `max-width: 767px` | 平板 / 小螢幕 |
| desktop | `max-width: 768px` | 流程圖切換斷點 |

### Fonts

| 字型 | Weight | 檔名 |
|------|--------|------|
| `SweiGothicCJKtc` | 100 (Thin) | `SweiGothicCJKtc-Thin.ttf` |
| `SweiGothicCJKtc` | 200 (Light) | `SweiGothicCJKtc-Light.ttf` |
| `SweiGothicCJKtc` | 300 (DemiLight) | `SweiGothicCJKtc-DemiLight.ttf` |
| `SweiGothicCJKtc` | 400 (Regular) | `SweiGothicCJKtc-Regular.ttf` |
| `SweiGothicCJKtc` | 500 (Medium) | `SweiGothicCJKtc-Medium.ttf` |
| `SweiGothicCJKtc` | 700 (Bold) | `SweiGothicCJKtc-Bold.ttf` |
| `SweiGothicCJKtc` | 900 (Black) | `SweiGothicCJKtc-Black.ttf` |

## 元件總數統計

| 分類 | 數量 |
|------|------|
| 共用元件 | 7 |
| 頁面專屬元件 | 13 |
| **合計** | **20** |

## 已知問題

詳見 [issues.md](./issues.md)
