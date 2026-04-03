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

## basePath 注意事項

- `next.config.ts` 設定 `basePath: '/foreign-domestic-helper-under-12'`
- `<Link>` 和 `<Image>` 會自動處理 basePath，不需手動加前綴
- `fetch('/api/...')` 和 `window.location` 不會自動處理，需用完整路徑

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

Next.js 15 (App Router) · TypeScript strict · Tailwind CSS v4 · shadcn/ui · Prisma · PostgreSQL

## Commit 慣例

繁體中文 Conventional Commits：`feat: 新增xxx` / `fix: 修正xxx` / `docs: 更新xxx`
