# 06 — Runtime View

> **狀態**：✅ 已確認

---

系統有 3 條核心資料流。

## 流程 A：申請人提交表單

### 前置

- 申請人進入 `/form` 頁面
- Server Component 渲染表單（react-hook-form + Zod schema 綁定）

### 填寫

- 使用者填寫 16 個欄位（含 3 個條件必填欄位）
- react-hook-form 即時執行客戶端 Zod 驗證（onChange / onBlur）
- 若 `childrenCount` 改變，動態增減 `childBirthdays` repeater 欄位

### 送出

- 使用者點擊送出按鈕
- 呼叫 Server Action `actions/application.ts`
- Server Action 用同一份 Zod schema **再次驗證**（防止繞過前端）

### 驗證失敗

- 回傳欄位錯誤訊息
- 表單顯示對應欄位的錯誤提示，不清除已填內容

### 驗證通過

- `prisma.application.create()` 寫入 DB，狀態預設 `PENDING`
- 回傳成功
- 前端顯示 **Snackbar 成功訊息**（如「已送出申請，專員將與您聯繫」）
- 表單重置為空白

---

## 流程 B：管理員登入

### 進入登入頁

- 管理員進入 `/admin/login`
- 若 cookie 中已有有效 JWT → 直接 redirect 到 `/admin`

### 登入

- 管理員輸入 email + password，點擊登入
- 呼叫 Server Action `actions/admin.ts` (login)
- 查詢 `prisma.admin.findUnique({ where: { email } })`

### 帳號不存在 or 密碼錯誤

- `bcrypt.compare()` 失敗（或查無帳號）
- 回傳「帳號或密碼錯誤」（**不區分哪個錯，防止帳號列舉攻擊**）

### 驗證通過

- `jwt.sign({ adminId, role }, secret, { expiresIn: '24h' })`
- 將 token 寫入 **httpOnly**、**secure**、**sameSite=lax** 的 cookie
- redirect 到 `/admin`

### 登出

- 清除 cookie
- redirect 到 `/admin/login`

---

## 流程 C：管理員查看與更新申請

### 進入後台

- 管理員進入 `/admin/applications`
- `admin/layout.tsx`（Server Component）讀取 cookie → `jwt.verify()`
- JWT 無效或過期 → redirect 到 `/admin/login`
- JWT 有效 → render admin layout（sidebar + 主內容區）

### 載入申請列表

- `applications/page.tsx` 讀取 URL search params（狀態篩選、日期區間、頁碼）
- `prisma.application.findMany({ where, orderBy, skip, take })`
- 渲染表格：姓名、手機、email、狀態、提交時間
- Sidebar badge 顯示 `prisma.application.count({ where: { status: 'PENDING' } })`

### 更新狀態

- 管理員在表格中點擊狀態欄的下拉選單（如 `PENDING` → `CONTACTED`）
- 呼叫 Server Action `actions/admin.ts` (updateStatus)
- `prisma.application.update({ where: { id }, data: { status } })`
- `revalidatePath('/admin/applications')` → 頁面自動刷新，badge 數字更新

### CSV 匯出

- 管理員點擊「匯出 CSV」按鈕
- Server Action 根據當前篩選條件查詢所有符合的資料
- 產生 CSV 字串，回傳為檔案下載
