# 08 — Crosscutting Concepts

> **狀態**：✅ 已確認

---

## 認證

僅管理員登入（申請表單匿名提交）。完整流程見 [06-runtime-view.md — 流程 B](./06-runtime-view.md)。

### 安全設計

- `httpOnly` — 防止 XSS 竊取 token（JavaScript 無法存取 cookie）
- `secure` — 只透過 HTTPS 傳送
- `sameSite=lax` — 防止 CSRF 攻擊
- 登入錯誤訊息不區分「帳號不存在」和「密碼錯誤」— 防止帳號列舉攻擊
- JWT 有效期 24 小時

---

## 字型

### SweiGothicCJKtc

- 載入方式：`next/font/local`
- 7 個 weights：100 (Thin)、200 (Light)、300 (DemiLight)、400 (Regular)、500 (Medium)、700 (Bold)、900 (Black)
- 格式：**WOFF2 子集化**（原始 TTF 每個 weight 約 5–15MB，子集化後約 1–3MB）
- `font-display: swap` — 先顯示 fallback 字型，WOFF2 載入後切換，避免 FOUT/FOIT
- 字型檔放在 `src/fonts/`，跟著 Docker image 走

---

## Design Tokens

原站 CSS variables → shadcn/ui CSS variables 對照：

### Colors

| 原站 Token | 值 | 用途 | shadcn/ui 對應 |
|-----------|-----|------|---------------|
| `--primary` | `#837ccf` | 主色調 | `--primary` |
| `--primary-light` | `#ecebf7` | 淺色背景 | `--primary-foreground` 或自定義 |
| `--primary-dark` | `#3d378e` | 深色背景 | `--primary` dark variant |
| `--primary-bg` | `#f5f4ff` | 區塊背景 | `--muted` |
| `--accent` | `#f5c842` | 強調色 | `--accent` |
| `--accent-dark` | `#d4a912` | 深色強調 | `--accent` dark variant |
| `--text-dark` | `#2d2a4a` | 主要文字 | `--foreground` |
| `--text-mid` | `#5a5470` | 次要文字 | `--muted-foreground` |
| `--text-light` | `#8a85a8` | 輔助文字 | 自定義 |

### Shadows

| Token | 值 |
|-------|-----|
| `--shadow` | `0 4px 20px rgba(131, 124, 207, 0.18)` |
| `--shadow-hover` | `0 8px 32px rgba(131, 124, 207, 0.32)` |

---

## 表單函式庫

**react-hook-form + @hookform/resolvers/zod**

- 已有 `ApplicationFormSchema`（Zod），直接接上 resolver
- Uncontrolled components 模式，效能優於 controlled（Formik）
- 支援 repeater（`useFieldArray`）— 處理 `childBirthdays` 動態欄位

---

## 客戶端狀態管理

**不使用全域狀態管理**（不需要 Zustand / Jotai）。

| 場景 | 方案 |
|------|------|
| 前台 4 頁（純展示） | Server Components，無客戶端狀態 |
| 表單頁 | react-hook-form 管理表單狀態 |
| EligibilityCalculator | 元件內 `useState`，邏輯在 `data/home/calculator.ts` |
| 後台篩選/分頁 | URL search params（`useSearchParams`） |

---

## Linting / Formatting

- **ESLint**：Next.js 內建 config
- **Prettier**：統一格式化

---

## 安全 Headers

Nginx 層加上基本安全 headers：

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self';" always;
```
