# CLAUDE.md — 1111 外籍幫傭申請專案

## 開發指令

```bash
npm run dev          # 啟動開發伺服器（localhost:3000/foreign-domestic-helper-under-12）
npm run build        # 正式建置
npm run lint         # ESLint 檢查
npm run format       # Prettier 格式化
npm run test         # Vitest 單元/元件測試
npm run test:e2e     # Playwright E2E 測試
```

## Prisma

```bash
npm run prisma:generate   # 產生 TypeScript client
npm run prisma:migrate    # 執行 migration（開發）
npm run prisma:studio     # 開啟 DB GUI
```

## 公開頁面路徑

- 公開頁面放在 `src/app/foreign-domestic-helper-under-12/` 目錄下，URL 自動對應
- 路徑常數集中管理於 `src/lib/paths.ts`（`publicPaths.home`、`.form`、`.faq`、`.domesticHelper`）
- 新增公開頁面的 Link 時，一律引用 `publicPaths` 常數，不要硬編碼路徑

## 目錄結構

```
src/
├── app/           # Next.js App Router（routes）
├── components/    # UI 元件（ui/ shared/ admin/ sections/）
├── data/          # 靜態資料（13 個 .ts 檔，已完成）
├── lib/           # 工具函式（prisma.ts, auth.ts, utils.ts）
├── fonts/         # SweiGothicCJKtc 字型檔
└── actions/       # Server Actions
prisma/            # Prisma schema + migrations
```

## 技術棧

Next.js 16 (App Router) · TypeScript strict · Tailwind CSS v4 · shadcn/ui · Prisma · PostgreSQL

## 多項修復流程

待修項目超過 2 個時：
1. 動手前先用 TaskCreate 建立完整 checklist（從對話歷史中彙整，不只看最新訊息）
2. 列出清單後等用戶確認才開始修復
3. 逐項修復，每完成一項立即 TaskUpdate
4. 總結時必須同時列出「已修」和「未修」，不可只列已修

## Commit 慣例

繁體中文 Conventional Commits：`feat: 新增xxx` / `fix: 修正xxx` / `docs: 更新xxx`
