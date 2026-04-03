# 04 — Solution Strategy

> **狀態**：✅ 已確認
> **替代方案比較**：見 [09-decisions.md](./09-decisions.md)

---

本章只放「選了什麼、為什麼選」的結論。完整的替代方案比較表在 Ch.9 ADR。

## Next.js App Router

1. **Server Components** — 前台 4 頁都是內容展示型，SC 在伺服器端直接 render，零 JS bundle 送到瀏覽器，首屏效能最佳
2. **Server Actions** — 表單提交直接呼叫伺服器函式存 DB，不需要額外建 API endpoint
3. **basePath** — 內建支援，一行設定即可沿用原站 URL 結構（`/foreign-domestic-helper-under-12`）
4. **與 ewill-web 統一技術棧** — 團隊維護成本最低

## TypeScript strict

1. Zod schema → `z.infer` 自動產出型別 → Prisma client 也有型別 → 全鏈路型別安全
2. 專案已有 `tsconfig.json` 和 13 個 `.ts` 資料檔，切 JS 反而是退步
3. shadcn/ui 元件全部是 TypeScript

## Tailwind CSS v4

1. **shadcn/ui 的硬性要求** — shadcn/ui 建構在 Tailwind 之上，必須搭配使用
2. **Design tokens 映射** — 原站的 `--primary`, `--accent` 等直接對應 Tailwind CSS variables
3. **響應式** — 2 個斷點（480px / 768px），需自訂 Tailwind `--breakpoint-sm: 480px`（預設 640px）

## shadcn/ui

1. **複製而非安裝** — 元件原始碼直接放進 `components/ui/`，完全可控，不需要 theme override
2. **原站設計對應** — Accordion（FAQ）、Table（費用表）、Form（申請表單）、Badge（sidebar 通知）都有現成元件
3. **Tailwind 原生** — 不需要額外的 theme system，直接用 CSS variables 套色
4. **前後台共用** — Table + Pagination + Select + Badge 等元件前後台共用

## Server Components + Server Actions

1. 前台 4 頁以讀取為主 → Server Components 直接 `import` 靜態資料或 `prisma.find()`（表單頁的寫入由 Server Action 處理）
2. 寫入只有 2 個場景：表單提交（`actions/application.ts`）、後台狀態更新（`actions/admin.ts`）
3. API Routes 只保留給未來可能的第三方 Webhook，目前不建

### 表單提交策略

- 客戶端：react-hook-form + @hookform/resolvers/zod — 即時驗證（onChange / onBlur）
- 伺服端：Server Action 用同一份 Zod schema 再次驗證（防止繞過前端）
- 寫入後前端顯示 Snackbar 成功訊息，表單重置為空白

## JWT 自建認證

1. 只有管理員登入（預計 < 10 人），不需要 OAuth、社群登入、多因子認證
2. 自建 JWT 程式碼量約 100 行（`lib/auth.ts`），邏輯透明可控
3. `httpOnly cookie` 防止 XSS 竊取 token，`bcrypt` 防止密碼明文洩漏

## PostgreSQL

1. **已有 instance** — ewill-web 同 VM 同 PostgreSQL，只需 `CREATE DATABASE maid_production`
2. **原生陣列** — `String[]` 直接對應 PostgreSQL array，`familyStatus`、`nationalityPreference` 等多選欄位不需要額外的關聯表
3. **Prisma 支援最佳** — PostgreSQL 是 Prisma 的第一級支援對象

## Prisma

1. **Schema-first** — `schema.prisma` 定義後自動產出 TypeScript client + migration SQL
2. **與 Zod 對應** — `Application` model 的欄位與 `ApplicationFormSchema`（Zod）一一對應
3. **Migration 管理** — `prisma migrate dev/deploy` 一條指令處理 schema 變更
4. **用戶指定** — 這是用戶明確選擇的技術

## Single Docker container

1. 前台 4 頁 + 後台 3 頁，合計 7 頁 — 分離部署的管理成本遠大於合一的耦合風險
2. 共用 Prisma client、型別、Server Actions — 分離後這些都需要額外同步機制
3. 安全性不受影響 — `admin/layout.tsx` 的 JWT auth guard 在 Server Component 層攔截

**什麼時候才需要分離**：前台需要獨立 scale（CDN/Edge）、後台用不同框架、或團隊 > 5 人需要獨立 CI/CD

---

## Prisma Schema

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum ApplicationStatus {
  PENDING     // 待處理
  CONTACTED   // 已聯繫
  PROCESSING  // 處理中
  COMPLETED   // 已完成
  CANCELLED   // 已取消
}

model Application {
  id                    String              @id @default(cuid())
  name                  String              // 申請人大名
  title                 String              // 稱謂（父/母/其他）
  customTitle           String?             // 自訂稱謂
  childrenCount         Int                 // 12 歲以下小朋友人數
  childAge              Int                 // 小朋友年齡
  childBirthdays        String[]            // 出生年月日（PostgreSQL array）
  familyStatus          String[]            // 家庭狀況（多選）
  address               String              // 戶籍所在地或聯絡地址
  nationalityPreference String[]            // 幫傭國籍偏好（多選）
  customNationality     String?             // 自訂國籍
  phone                 String              // 手機號碼
  email                 String              // Email
  company               String              // 服務單位
  jobTitle              String              // 職稱
  contactTime           String[]            // 方便聯絡時段（多選）
  customContactTime     String?             // 自訂聯絡時段
  status                ApplicationStatus   @default(PENDING)
  createdAt             DateTime            @default(now())
  updatedAt             DateTime            @updatedAt
}

model Admin {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String   // bcrypt hashed
  name      String
  role      String   @default("admin")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

> Schema 欄位與 `src/data/form/schema.ts`（Zod `ApplicationFormSchema`）一一對應。
