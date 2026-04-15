# 新舊站樣式對齊 — 進度追蹤

## 已完成的內容對齊（第一輪）

| # | 項目 | 狀態 |
|---|------|------|
| 1 | SiteFooter 加服務時間 & 電話 | ✅ → 已改為 ServiceInfoCard 獨立元件 |
| 2 | Redirect /foreign-domestic-form → /form | ✅ next.config.ts |
| 3 | 表單頁加回 MiniFAQ | ✅ form/page.tsx |
| 4 | 費用金額 $2 差異 | ✅ hardcode 29152/29819 |
| 5 | 表單 Label 回復舊站 | ✅ fields.ts + application-form.tsx |
| 6 | FAQ 頁面標題 常見問題→申請問答 | ✅ faq-accordion-section.tsx |
| 7 | dev script --open flag 移除 | ✅ package.json |

## 已完成的樣式對齊（第二輪 — 初步）

| # | 問題 | 修改內容 | 狀態 |
|---|------|---------|------|
| 1 | Logo 不一致 | 改用 1111LOGO-300x80.png | ⚠️ 舊站用 外傭專區_LOGO.png，我們沒有此檔 |
| 2 | Menu 位置 | 改為兩列式 header（白底logo + 深靛nav） | ✅ |
| 3 | Banner 底圖 | 改用漸層 gradient，文字改深色 | ✅ |
| 4 | Font-family | 移除 SweiGothicCJKtc，改用 Geist+系統字型 | ✅ |
| 5 | 服務時間/電話 | 建立 ServiceInfoCard，放在 content 與 footer 之間 | ✅ |
| 6 | Footer bg | 改為 bg-brand-dark (#3d378e) | ✅ |
| 7 | Back to top | rounded-full → rounded-md | ✅ |
| 8 | Side btn | 右下固定 + gradient bg + rounded-2xl | ✅ |
| 9 | Article bg | 移除 WhyPhilippines 的 bg-brand-bg | ✅ |

## 已完成的精確 CSS 對齊（第三輪 — getComputedStyle 抽取後）

| # | 問題 | 修改前 | 修改後（以舊站為準） |
|---|------|-------|---------------------|
| 1 | ServiceInfoCard 時間值顏色 | text-brand-accent (金色) | text-red-600 (紅色 rgb(220,38,38)) |
| 2 | ServiceInfoCard 標籤尺寸 | text-sm text-text-mid | text-[16.5px] font-bold text-text-dark |
| 3 | ServiceInfoCard 標題尺寸 | text-lg | text-[19.5px] |
| 4 | ServiceInfoCard 佈局 | grid sm:grid-cols-2 | flex gap-10 |
| 5 | Hero subtitle 樣式 | text-sm tracking-widest | text-2xl font-bold text-brand-dark |
| 6 | Hero 「育兒神隊友」| 白色文字無背景 | 白色文字 + 金色漸層背景色塊 |
| 7 | Hero 按鈕樣式 | rounded-full + outlined/accent | rounded-2xl + solid brand/gradient |
| 8 | Hero 描述文字 | 「新制放寬」「只要1名12歲以下」 | 「全面放寬」「只要12歲以下」 |
| 9 | Alliance/WhyPH 副標題顏色 | text-text-mid | text-brand (rgb(131,124,207)) |
| 10 | Alliance/WhyPH 標題字重 | font-bold (700) | font-semibold (600) |
| 11 | Alliance cards 樣式 | 無卡片包裝, shadow-md | 獨立卡片 p-5 rounded-2xl + 精確 boxShadow |
| 12 | WhyPH card 標題顏色 | text-brand-dark | text-brand (較淺紫色) |
| 13 | WhyPH cards 佈局 | text-center p-6 | text-start p-5 gap-12px |
| 14 | Header nav 字體 | text-lg (18px) | text-xl (20px) |
| 15 | Header nav 高度 | py-3 (自適應) | h-[52px] (固定) |
| 16 | Footer CTA 排列 | flex row (水平) | flex-col (垂直，icon上text下) |
| 17 | Back to top shadow | shadow-lg | 精確 boxShadow |
| 18 | QuoteCTA gradient | linear-gradient | -webkit-linear-gradient (精確匹配) |
| 19 | Layout padding-top | pt-[104px] | pt-[108px] (配合 nav 52px) |

## 舊站精確色彩對照（已確認）

| Token | Hex | RGB | 用途 |
|-------|-----|-----|------|
| brand | #837ccf | rgb(131,124,207) | Header bg, back-to-top |
| brand-dark | #3d378e | rgb(61,55,142) | Nav bar, footer, section headings |
| brand-accent | #f5c842 | rgb(245,200,66) | CTA buttons |
| text-dark | #2d2a4a | rgb(45,42,74) | Body text |
| brand-light-gradient | — | rgb(177,172,230) | Hero gradient start |
| brand-light-gradient-mid | — | rgb(236,235,247) | Hero gradient mid |
| steel-blue | — | rgb(124,164,207) | Phone button bg |
| red | — | rgb(220,38,38) | 服務時間值顏色 |
| gold-gradient-start | — | rgb(171,135,9) | 育兒神隊友 badge start |
| gold-gradient-end | — | rgb(245,200,66) | 育兒神隊友 badge end |

## 待處理

| 項目 | 說明 |
|------|------|
| Logo | 舊站用「外傭專區_LOGO.png」，需取得此圖檔 |
| Hero 描述換行 | 舊站在「即可申請。」後有 `\n` 換行，新站目前為空格 |
| 其他頁面精確對齊 | 首頁、表單頁、FAQ 頁的精確樣式對齊尚未執行 |

## 精確 CSS 參考檔

已從舊站抽取所有 computed styles，存於 `.claude/style-reference.json`

## 關鍵檔案路徑

### 第三輪已修改
- `src/components/shared/service-info-card.tsx` — 時間紅色/標籤尺寸/佈局
- `src/components/shared/site-header.tsx` — nav 20px/52px
- `src/components/shared/back-to-top.tsx` — 精確 boxShadow
- `src/components/shared/footer-cta.tsx` — 垂直排列
- `src/components/sections/domestic-helper/hero-section.tsx` — 副標題/按鈕/badge
- `src/components/sections/domestic-helper/alliance-section.tsx` — 標題/副標題/卡片
- `src/components/sections/domestic-helper/why-philippines-section.tsx` — 顏色/佈局
- `src/components/sections/domestic-helper/quote-cta-section.tsx` — gradient 精確匹配
- `src/data/domestic-helper.ts` — 描述文字修正
- `src/app/foreign-domestic-helper-under-12/layout.tsx` — padding-top 調整
