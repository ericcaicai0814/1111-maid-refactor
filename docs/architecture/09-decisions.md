# 09 — Architecture Decisions

> **狀態**：✅ 已確認
> **日期**：2026-04-03
> **所有 ADR 狀態皆為「已接受」，日期皆為 2026-04-03，以下各 ADR 省略此二欄位。**

---

## ADR-001: 前端框架選擇 Next.js App Router

- **背景**：需要一個全端框架處理 4 頁前台 + 管理後台 + 表單存 DB + JWT 驗證
- **決定**：Next.js App Router
- **考量過的替代方案**：

| 方案 | 優勢 | 不選的原因 |
|------|------|-----------|
| Next.js Pages Router | 生態成熟、文件多 | App Router 是官方未來方向，Pages Router 不再有新功能 |
| Nuxt (Vue) | Vue 生態 | 團隊以 React/Next.js 為主（ewill-web 同），統一降低維護成本 |
| React + Express 分離 | 前後端各自部署 | 4 頁前台 + 管理後台規模不需分離，多一個服務 = 多一個部署單位 |
| 純靜態站（Astro） | 效能極佳 | 需要 Server Actions、JWT 驗證、後台管理，純靜態不夠用 |

- **理由**：Server Components 零 JS bundle、Server Actions 省去 API 層、basePath 內建支援、與 ewill-web 統一技術棧

---

## ADR-002: TypeScript strict mode

- **背景**：專案已有 13 個 `.ts` 資料檔和 Zod schema
- **決定**：TypeScript strict mode
- **理由**：Zod → `z.infer` → Prisma client 全鏈路型別安全。切 JS 反而是退步

---

## ADR-003: 樣式方案選擇 Tailwind CSS v4

- **背景**：需要與 shadcn/ui 整合、支援原站 design tokens 映射、響應式斷點
- **決定**：Tailwind CSS v4
- **考量過的替代方案**：

| 方案 | 不選的原因 |
|------|-----------|
| CSS Modules | 需為每個元件寫獨立 `.module.css`，開發速度慢 |
| Styled Components | Runtime CSS-in-JS，與 Server Components 不相容 |
| 原生 CSS + CSS Variables | 可行但缺乏 utility-first 的開發效率，不與 shadcn/ui 整合 |

- **理由**：shadcn/ui 硬性要求、design tokens 直接映射、響應式處理最簡潔

---

## ADR-004: UI 元件庫選擇 shadcn/ui

- **背景**：20 個元件（含 Accordion、Table、Form），需要無障礙支援
- **決定**：shadcn/ui
- **考量過的替代方案**：

| 方案 | 不選的原因 |
|------|-----------|
| MUI (Material UI) | Material Design 風格太強烈，需大量覆寫。bundle size 較大 |
| Ant Design | 偏企業風，CJK 字型整合需額外 ConfigProvider |
| Chakra UI | 生態較小，v3 改用 Panda CSS 而非 Tailwind |
| 不用元件庫 | 20 個元件從頭寫太慢，且需自行處理無障礙 |

- **理由**：複製而非安裝（完全可控）、原站設計有對應元件、Tailwind 原生、前後台共用

---

## ADR-005: 後端策略選擇 Server Actions

- **背景**：只有 2 個寫入場景（表單提交 + 後台狀態更新），4 頁全讀取
- **決定**：Server Components（讀取）+ Server Actions（寫入），API Routes 僅保留 Webhook
- **考量過的替代方案**：

| 方案 | 不選的原因 |
|------|-----------|
| 全部用 API Routes | 每個操作需寫 `route.ts`，多一層 HTTP，程式碼量 +30% |
| 獨立後端（Express/NestJS）| 多一個 Docker container + CI pipeline，此規模不需要 |
| tRPC | Server Actions 已提供端對端型別安全，tRPC 多一層抽象無實質收益 |

- **理由**：程式碼量最少、型別安全、無需額外 HTTP 層

---

## ADR-006: 認證方案選擇自建 JWT

- **背景**：只有管理員登入（< 10 人），email/password 方式，不需要 OAuth
- **決定**：自建 JWT（bcrypt + httpOnly cookie）
- **考量過的替代方案**：

| 方案 | 不選的原因 |
|------|-----------|
| NextAuth (Auth.js) | 偏重 OAuth 社群登入，Credentials provider 是其最弱部分 |
| Clerk / Auth0 | SaaS 認證，需外部 API。VM 有網路限制，< 10 人不值得付費 |
| Lucia Auth | 輕量好用，但 2024 年作者已宣布停止維護（deprecated） |

- **理由**：約 100 行程式碼、邏輯透明可控、httpOnly cookie + bcrypt 安全性足夠

---

## ADR-007: 資料庫選擇 PostgreSQL

- **背景**：VM 上已有 PostgreSQL（ewill-web 在用），需要陣列欄位
- **決定**：PostgreSQL（VM host，與 ewill-web 同 instance）
- **考量過的替代方案**：

| 方案 | 不選的原因 |
|------|-----------|
| MySQL | VM 已有 PostgreSQL，不需多裝 DB engine |
| SQLite | 不支援多連線、Docker container 外部無法連接、Prisma 不支援 `String[]` |
| MongoDB | 資料結構明確（表單欄位固定），關聯式更合適。VM 無 MongoDB |

- **理由**：已有 instance、原生陣列支援、Prisma 第一級支援

---

## ADR-008: ORM 選擇 Prisma

- **背景**：2 張 table，需要 migration 管理和 TypeScript 型別
- **決定**：Prisma
- **考量過的替代方案**：

| 方案 | 優勢 | 不選的原因 |
|------|------|-----------|
| Drizzle ORM | 更輕量、SQL-like 語法 | 生態較新，migration 工具不如 Prisma 成熟。2 張 table 效能差異可忽略 |
| TypeORM | Java/C# 風格 decorator | 與 Server Components 整合不如 Prisma 文件完善 |
| Raw SQL (pg) | 最輕量 | 加欄位需手寫 migration，易出錯 |

- **理由**：Schema-first 自動產出 client + migration、與 Zod 一一對應、用戶明確選擇

---

## ADR-009: 部署策略選擇 Single Docker Container

- **背景**：前台 4 頁 + 後台 3 頁，合計 7 頁
- **決定**：前台 + 後台同一個 Next.js App，一個 Docker image
- **理由**：
  - 分離部署的管理成本遠大於合一的耦合風險
  - 共用 Prisma client、型別、Server Actions
  - `admin/layout.tsx` JWT auth guard 在 Server Component 層攔截
- **什麼時候需要分離**：前台需獨立 scale、後台用不同框架、團隊 > 5 人

---

## ADR-010: 反向代理選擇 Nginx

- **背景**：ewill-web 已有 Nginx，同一台 VM
- **決定**：Nginx
- **考量過的替代方案**：

| 方案 | 不選的原因 |
|------|-----------|
| Traefik | 適合多容器自動服務發現，此專案只有 1 個 container |
| Caddy | 自動 HTTPS 方便，但 ewill-web 已用 Nginx，統一管理 |
| 直接暴露 Next.js | 缺少 SSL termination、gzip、rate limiting、靜態快取 |

- **理由**：ewill-web 已有 Nginx，只需加一段 `location` block。提供 SSL + gzip/brotli + 安全 headers

---

## ADR-011: URL 策略選擇 basePath 沿用原路徑

- **背景**：原站 URL 已被 Google 收錄
- **決定**：`basePath: '/foreign-domestic-helper-under-12'`
- **考量過的替代方案**：

| 方案 | 不選的原因 |
|------|-----------|
| Subdomain (`maid.1111.com.tw`) | Google 視 subdomain 為獨立網站，SEO 權重不繼承，需數週～數月重新爬取 |
| 新路徑 (`/maid`) | URL 變更需 301 redirect，有過渡期 |

- **理由**：SEO 權重保留、無需 301 redirect、Nginx 層只需改 `location` 指向
