# 02 — Constraints

> **狀態**：✅ 已確認

---

## 技術限制

| 限制類型 | 值 | 說明 |
|---------|-----|------|
| **瀏覽器支援** | 最近 2 個主要版本（Chrome、Safari、Edge、Firefox）+ iOS Safari | 不支援 IE。Next.js 14+ 預設即是 |
| **行動裝置** | Mobile-first 響應式，2 個斷點：480px / 768px | 原站 3 個斷點（478px / 767px / 768px）有 1px 不一致，合併為 2 個斷點 |
| **效能預算** | LCP < 2.5s、FCP < 1.8s、CLS < 0.1 | Google Core Web Vitals 標準 |
| **個資處理** | HTTPS 傳輸、DB 不額外加密 | 表單含手機 + Email + 地址 + 姓名。非金融等級，不需要欄位加密 |
| **無障礙** | WCAG 2.1 AA 基本 | shadcn/ui（Radix）內建 aria 屬性已覆蓋大部分 |
| **SEO** | 全部前台頁 SSR | 已有完整 SEO metadata（`data/seo.ts`） |
| **Node.js 版本** | 22 LTS | Docker image 固定版本，支援到 2027-04 |
| **PostgreSQL 版本** | 12+ | 依 VM 上現有版本，Prisma 支援 12 以上 |

## 組織限制

| 限制 | 影響 |
|------|------|
| 與 ewill-web 共用 VM 和 Runner | 部署流程需依循現有 GitLab CI/CD 慣例 |
| 與 ewill-web 共用 PostgreSQL instance | 各自獨立 database，不互通資料 |
| 與 ewill-web 共用 Nginx | 以 `location` block 分流，不可影響其他服務 |
