# 05 — Building Block View

> **狀態**：✅ 已確認
> **元件詳細逆向分析**：見 [`docs/reverse-engineering/README.md`](../reverse-engineering/README.md)

---

## 目錄結構

```
src/
├── app/
│   ├── layout.tsx                 # Root Layout（字型、全域樣式）
│   ├── (public)/                  # 前台 route group
│   │   ├── page.tsx               # 首頁
│   │   ├── domestic-helper/
│   │   │   └── page.tsx
│   │   ├── faq/
│   │   │   └── page.tsx
│   │   └── form/
│   │       └── page.tsx
│   ├── admin/                     # 後台（JWT auth guard）
│   │   ├── layout.tsx             # Admin layout（sidebar + auth）
│   │   ├── page.tsx               # Dashboard
│   │   ├── applications/
│   │   │   └── page.tsx           # 申請列表
│   │   └── login/
│   │       └── page.tsx
│   └── api/                       # 僅 Webhook 用
│       └── webhook/
│           └── route.ts
├── components/
│   ├── ui/                        # shadcn/ui 元件
│   ├── shared/                    # 共用元件（7 個）
│   ├── admin/                     # 後台專用元件
│   └── sections/                  # 前台區塊元件（13 個）
│       ├── home/
│       ├── domestic-helper/
│       ├── faq/
│       └── form/
├── data/                          # ✅ 已完成（13 個 .ts 檔）
├── lib/                           # 工具函式
│   ├── prisma.ts
│   ├── auth.ts
│   └── utils.ts
├── fonts/                         # SweiGothicCJKtc 字型檔
└── actions/                       # Server Actions
    ├── application.ts
    └── admin.ts
prisma/
└── schema.prisma
```

## 元件清單

### 共用元件（7 個）

| 元件 | 用途 | 出現頁面 |
|------|------|---------|
| `SiteHeader` | 固定頂部 header，含 logo + 導覽列 | 全部 |
| `NavBar` | 4 項水平導覽 | 全部 |
| `HeroBanner` | 主視覺 banner 圖片 | home, faq, form |
| `FooterCTA` | 底部固定「申請表單」按鈕 | 全部 |
| `BackToTop` | 右下角回到頂端按鈕 | 全部 |
| `SiteFooter` | 頁尾版權宣告 | 全部 |
| `MiniFAQ` | 迷你 FAQ（4 則 accordion） | home, form |

### 頁面專屬元件（13 個）

| 元件 | 所屬頁面 | 用途 |
|------|---------|------|
| `PolicyHighlightSection` | home | 2026 新制政策亮點 |
| `EligibilityCalculator` | home | 資格與點數試算器 |
| `CostTableSection` | home | 雇主月付、幫傭自付、備註 3 張表格 |
| `ProcessFlowSection` | home | 6 步驟申請流程圖 |
| `DocumentListSection` | home | 申請文件清單 |
| `TableOfContents` | home | 快速連結目錄（sticky sidebar） |
| `HeroSection` | domestic-helper | 雙欄佈局（文案 + 圖片） |
| `AllianceSection` | domestic-helper | 跨海嚴選：3 張 FeatureRow 卡片 |
| `WhyPhilippinesSection` | domestic-helper | 為何選菲律賓：4 張 FeatureCard |
| `QuoteCTASection` | domestic-helper | 引言 + CTA 按鈕 |
| `FAQAccordionSection` | faq | 完整 19 則 FAQ accordion |
| `ApplicationFormSection` | form | 16 欄位表單 + repeater |
| `ContactInfoSection` | form | 聯絡方式標題區塊 |

> **合計**：20 個元件（7 共用 + 13 頁面專屬）
> 詳細逆向分析見 [`docs/reverse-engineering/`](../reverse-engineering/)
