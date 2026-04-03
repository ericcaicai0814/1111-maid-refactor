# 架構文件：1111 外籍幫傭申請專案

> **文件結構**：[arc42](https://arc42.org/) 12 章節
> **建立日期**：2026-04-03

---

## 技術棧總覽

| 層級 | 技術 | 版本/備註 |
|------|------|----------|
| 框架 | Next.js (App Router) | 14+ |
| 語言 | TypeScript | strict mode |
| 樣式 | Tailwind CSS | v4 |
| UI 元件 | shadcn/ui (Radix) | 複製至 `components/ui/` |
| 後端 | Server Components + Server Actions | API Routes 僅保留給 Webhook |
| 認證 | 自建 JWT (bcrypt + httpOnly cookie) | 管理員專用 |
| 資料庫 | PostgreSQL | VM host，與 ewill-web 共用 instance |
| ORM | Prisma | Schema-first |
| 部署 | Single Docker container | `node:22-alpine`, standalone |
| 反向代理 | Nginx | ewill-web 共用 |

---

## 章節索引

| 章節 | 檔案 | 說明 | 狀態 |
|:---:|------|------|:---:|
| 1 | [01-introduction-goals.md](./01-introduction-goals.md) | 系統願景、主要需求、利害關係人 | 📝 |
| 2 | [02-constraints.md](./02-constraints.md) | 技術限制、瀏覽器支援、效能預算 | ✅ |
| 3 | [03-context-scope.md](./03-context-scope.md) | 系統邊界、外部介面 | ✅ |
| 4 | [04-solution-strategy.md](./04-solution-strategy.md) | 技術選型理由、Prisma Schema | ✅ |
| 5 | [05-building-block-view.md](./05-building-block-view.md) | 目錄結構、元件清單 | ✅ |
| 6 | [06-runtime-view.md](./06-runtime-view.md) | 表單提交、管理員登入、狀態更新流程 | ✅ |
| 7 | [07-deployment-view.md](./07-deployment-view.md) | Docker、Nginx、環境分離 | ✅ |
| 8 | [08-crosscutting.md](./08-crosscutting.md) | Auth、字型、Design Tokens、安全 Headers | ✅ |
| 9 | [09-decisions.md](./09-decisions.md) | ADR-001 ~ ADR-011 | ✅ |
| 10 | [10-quality-scenarios.md](./10-quality-scenarios.md) | 效能、安全、可用性驗收標準 | ⏳ |
| 11 | [11-risks-tech-debt.md](./11-risks-tech-debt.md) | 已知風險、技術債、待決項 | ⏳ |
| 12 | [12-glossary.md](./12-glossary.md) | 專案術語表 | ⏳ |

> ✅ 已完成 ｜ ⏳ 上線前補 ｜ 📝 arc42 負責人主導
