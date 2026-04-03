# 11 — Risks & Technical Debt

> **狀態**：⏳ Placeholder — 上線前補

---

## 待決項

以下議題已識別但尚未決定，開發過程中視情況處理：

| 項目 | 選項 | 決定時機 |
|------|------|---------|
| **測試策略** | Vitest（unit/component）+ Playwright（E2E）— scaffolding 就設定 or 開發完再加 | scaffolding 階段 |
| **圖片策略** | `public/images/`（跟 Docker image 走）vs 外部 CDN（S3 + CloudFront） | 開發時 |
| **DB 備份** | 確認 ewill-web 現有 PostgreSQL 備份機制是否自動涵蓋新 database | 部署前 |

## 已知風險

<!-- 上線前盤點：
- CJK 字型檔案大小對首屏效能的影響
- JWT 單一 secret 被洩漏的影響範圍
- PostgreSQL 與 ewill-web 共用 instance 的資源競爭
-->

## 有意識的折衷

<!-- 記錄明確的取捨：
- 不做自動通知（管理員自行查看後台）
- 不做防機器人（初期流量低）
- 不做欄位加密（非金融等級）
-->
