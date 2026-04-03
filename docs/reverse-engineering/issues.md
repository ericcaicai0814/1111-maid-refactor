# 已知問題與差異記錄

## 1. FAQ 第 19 則遺漏

- **來源**: `maid-resource/faq/index.yml` 的 `headings` 區段
- **問題**: 僅列出 18 則 FAQ 標題，遺漏第 19 則「萬一幫傭逃跑了怎麼辦？雇主會有責任嗎？」
- **實際**: HTML 原始碼確認有 19 則完整問答
- **影響**: 資料層應以 HTML 原始碼為準，收錄完整 19 則

## 2. `--shadow-hover` 未定義 Bug

- **來源**: `domestic-helper/source.html` 的 `:root` 區段
- **問題**: `domestic-helper` 頁面的 `:root` 未定義 `--shadow-hover` 變數，但 CSS 中有引用（按鈕 hover 效果）
- **影響**: 在 domestic-helper 頁面，按鈕 hover 的 box-shadow 會是空值（fallback 為無陰影）
- **修正建議**: 在全域 CSS 中統一定義 `--shadow-hover`

## 3. 圖片 alt 全空（無障礙缺陷）

- **來源**: 全部 4 頁的 `<img>` 標籤
- **問題**: 所有圖片的 `alt` 屬性均為空字串 `alt=""`
- **影響**: 螢幕閱讀器無法識別圖片內容，不符合 WCAG 2.1 Level A
- **修正建議**: 為每張圖片添加有意義的替代文字

## 4. index.md 表單 `required` 誤判

- **來源**: `maid-resource/foreign-domestic-form/index.md` 的表單欄位表格
- **問題**: 所有欄位的 `required` 列均標記為 `False`
- **實際**: Label 帶有 `*` 號的欄位應為必填，Forminator 的必填驗證由 JavaScript 端處理，HTML `required` 屬性確實為空
- **影響**: 若僅依照 index.md 建立表單，會遺漏必填驗證

## 5. index.md 表單 action 空值

- **來源**: `maid-resource/foreign-domestic-form/index.md` 第 14 行
- **問題**: `action` 欄位為空字串
- **實際**: 表單透過 Forminator JavaScript AJAX 提交至 `wp-admin/admin-ajax.php`
- **影響**: 需自行建立 API endpoint 或 Server Action 取代

## 6. FAQ #11 原站答案不對題

- **來源**: `content/pages/faq/index.md:334` 確認
- **問題**: 問題為「外籍幫傭跟外籍看護有什麼不同？她真的能幫我煮飯、打掃家裡嗎？」，但答案回的是監護人資格說明（「只要您是小孩的法定監護人…」），與問題無關
- **影響**: `src/data/faq.ts` id:11 如實反映原站內容，不修改資料，標記為原站內容問題

## 7. `content/pages/` 為權威資料來源

- **來源**: 交叉比對 `content/pages/` 與 `maid-resource/`
- **問題**: `maid-resource/` 存在資料遺漏（如缺少 a11y 標記、字型、完整 assets），`content/pages/` 含 5 種斷點截圖、完整 assets + fonts
- **影響**: 後續所有交叉比對應以 `content/pages/` 為準，`maid-resource/` 不再作為新資料來源

## 8. README 字型名稱有誤

- **來源**: `docs/reverse-engineering/README.md` Fonts 區段
- **問題**: 文件寫 `Noto Sans TC`，實際字型為 `SweiGothicCJKtc`（7 個 weight）
- **影響**: 開發者可能使用錯誤的字型名稱
