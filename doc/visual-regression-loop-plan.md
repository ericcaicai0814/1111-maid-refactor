# Visual Regression Loop 計畫

## 目標

建立自動化視覺回歸迴圈，結合兩層偵測：
- **visual-qa**（診斷層）— DOM 結構 + 語意 HTML + 視覺差異分析
- **Playwright `toHaveScreenshot()`**（評分層）— 像素級量化閘門

使用 **Ralph Loop 模式**（Autonomous Loops 的一種，透過 `/ralph-loop` plugin 執行）
迭代修正差異，**Playwright 測試全過即停止**。

---

## 現況盤點

### 已有資源

| 項目 | 狀態 |
|------|------|
| Playwright 設定 | `playwright.config.ts` — chromium + mobile-chrome |
| E2E 測試 | 5 個 spec（home / faq / navigation / form / domestic-helper） |
| POM 架構 | `e2e/pages/` — home / faq / form / header |
| 參考截圖 | `.claude/old-domestic-helper.png` 等 7 張（僅覆蓋首頁/幫傭頁） |
| 樣式參考 | `.claude/style-reference.json` — 結構化色彩/間距規格 |
| 樣式對齊狀態 | `.claude/style-alignment-status.md` — 各頁面樣式對齊進度 |
| visual-qa skill | 可產出結構化差異報告 |

### 缺少的部分

| 項目 | 需要做 |
|------|--------|
| Visual regression spec | 新增 `e2e/visual-regression.spec.ts` |
| Baseline 截圖 | 首次執行 `--update-snapshots` 產生（不可手動複製參考截圖） |
| Playwright snapshot 設定 | `playwright.config.ts` 加入 `snapshotPathTemplate` |
| `/faq` `/form` 頁面參考截圖 | 目前只有首頁/幫傭頁截圖，其餘頁面以 `style-reference.json` 色彩/間距規格 + visual-qa 比對為準 |

---

## 架構設計

### 雙層偵測模型

| 層級 | 工具 | 偵測能力 | 角色 |
|------|------|---------|------|
| 像素差異 | Playwright `toHaveScreenshot()` | 顏色、間距、字級、佈局 | **評分閘門**（量化 pass/fail） |
| DOM 結構 | visual-qa + `page.content()` | 缺少 class、錯誤巢狀、語意標籤 | **診斷**（告訴 Claude 修什麼） |
| 語意 HTML | visual-qa | a11y 屬性、SEO 標籤、ARIA | **診斷**（結構正確性） |

**為什麼需要兩層：**
像素比對會漏掉「看起來對但結構錯」的問題（例如用 `<div>` 代替 `<nav>`、class 名稱錯誤、
巢狀層級不符原站）。visual-qa 負責抓這些，Playwright 負責量化分數。

### 迭代流程

```
┌──────────────────────────────────────────────────────┐
│  Ralph Loop 迭代（/ralph-loop plugin）                │
│                                                      │
│  第 1 輪（初始診斷）：                                 │
│  1. visual-qa 比對參考截圖 + 解析 page.content() HTML │
│  2. 產出結構化差異清單（像素 + DOM + 語意三層）        │
│  3. 依嚴重度排序，修正前 3 項                         │
│  4. 執行 Playwright visual-regression 測試            │
│                                                      │
│  第 2~N 輪（迭代修正）：                               │
│  1. 讀取 test-results/ 的 diff 截圖（像素層）         │
│  2. 讀取 page.content() 比對 DOM 結構（結構層）        │
│  3. 修正差異（一輪最多 3 項）                         │
│  4. 執行 Playwright visual-regression 測試            │
│  5. 測試全過 → <promise>DONE</promise> → 停止         │
│     測試失敗 → 下一輪迭代                             │
│                                                      │
│  退出條件：測試全過 OR max-iterations 15               │
└──────────────────────────────────────────────────────┘
```

### 像素評分機制

Playwright `toHaveScreenshot()` 內建 `pixelmatch`，支援三個維度：

| 參數 | 用途 | 建議值 |
|------|------|--------|
| `maxDiffPixelRatio` | 容許的差異像素佔比 | `0.2`（= 要求 80% 一致） |
| `threshold` | 單一像素色差容忍度（0~1） | `0.3`（容忍 anti-aliasing） |
| `animations` | 動畫處理 | `"disabled"` |

失敗時 Playwright 自動產出三張圖供 Claude 判斷：

```
test-results/
├── visual-regression-申請資格-chromium/
│   ├── visual-regression-申請資格-1-expected.png   ← baseline
│   ├── visual-regression-申請資格-1-actual.png     ← 目前截圖
│   └── visual-regression-申請資格-1-diff.png       ← 差異標紅
```

### DOM 結構評分

在 visual-regression spec 中加入 HTML 結構快照比對：

```typescript
// e2e/visual-regression.spec.ts（結構層）
for (const { name, path } of pages) {
  test(`${name} DOM 結構`, async ({ page }) => {
    await page.goto(path);

    // 擷取關鍵結構（去除動態屬性）
    const structure = await page.evaluate(() => {
      const selectors = ['nav', 'main', 'footer', 'section', 'h1', 'h2'];
      return selectors.map(s => ({
        tag: s,
        count: document.querySelectorAll(s).length,
        classes: [...document.querySelectorAll(s)].map(el =>
          [...el.classList].sort().join(' ')
        ),
      }));
    });

    expect(structure).toMatchSnapshot(`${name}-structure.json`);
  });
}
```

這讓 Playwright 同時檢查像素和 DOM 結構，兩者都過才算通過。

---

## 實作步驟

### Step 0a：路由目錄移動 + 路徑常數更新

1. 移動目錄：`src/app/foreign-domestic-helper-under-12/form/` → `src/app/foreign-domestic-helper-under-12/foreign-domestic-form/`
2. 更新 `src/lib/paths.ts`：`form: \`${PUBLIC_BASE}/foreign-domestic-form\``
3. 驗證：`git diff` 確認只有目錄移動和 `paths.ts` 變更

### Step 0b：更新所有引用路徑

1. 搜尋所有引用 `publicPaths.form` 的元件，確認 Link href 自動對應新路徑
2. 搜尋 E2E 測試中硬編碼的 `/form` 路徑（`e2e/` 目錄），更新為 `/foreign-domestic-form`
3. 搜尋 `e2e/pages/form.page.ts` 的 URL 常數，更新路徑

### Step 0c：重命名後驗證

1. `npm run build` — 確認無 broken import
2. `npm run test:e2e` — 確認所有現有 E2E 測試通過
3. 若失敗，修正後重跑直到全過再進入 Step 1

### Step 1：更新 Playwright 設定

在 `playwright.config.ts` 加入 snapshot 相關設定：

```typescript
// playwright.config.ts
export default defineConfig({
  // ...existing config
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.2,
      threshold: 0.3,
      animations: 'disabled',
    },
  },
  snapshotPathTemplate: '{testDir}/__screenshots__/{projectName}/{testFilePath}/{arg}{ext}',
});
```

### Step 2：建立 visual regression spec

```typescript
// e2e/visual-regression.spec.ts
import { test, expect } from '@playwright/test';

// ── 靜態快照 ──────────────────────────────────

const pages = [
  { name: '申請資格', path: '/' },
  { name: '報名表單', path: '/foreign-domestic-form' },
  { name: '常見問題', path: '/faq' },
] as const;

for (const { name, path } of pages) {
  test(`${name} — 靜態`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot(`${name}-static.png`);
  });
}

// ── DOM 結構快照 ──────────────────────────────

for (const { name, path } of pages) {
  test(`${name} DOM 結構`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState('networkidle');

    const structure = await page.evaluate(() => {
      const selectors = ['nav', 'main', 'footer', 'section', 'h1', 'h2'];
      return selectors.map(s => ({
        tag: s,
        count: document.querySelectorAll(s).length,
        classes: [...document.querySelectorAll(s)].map(el =>
          [...el.classList].sort().join(' ')
        ),
      }));
    });

    expect(structure).toMatchSnapshot(`${name}-structure.json`);
  });
}

// ── 互動狀態快照 ──────────────────────────────

test.describe('申請資格 — 互動', () => {
  test('MiniFAQ 展開', async ({ page }) => {
    await page.goto('/');
    await page.locator('#faq button').first().click();
    await expect(page.locator('#faq')).toHaveScreenshot('申請資格-faq-expanded.png');
  });

  test('TOC 側邊欄 hover（桌面）', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');
    const tocLink = page.locator('aside a').first();
    await tocLink.hover();
    await expect(tocLink).toHaveScreenshot('申請資格-toc-hover.png');
  });
});

test.describe('常見問題 — 互動', () => {
  test('Accordion 展開單項', async ({ page }) => {
    await page.goto('/faq');
    await page.locator('button[aria-expanded]').first().click();
    await expect(page.locator('section')).toHaveScreenshot('faq-accordion-expanded.png');
  });

  test('Accordion 展開多項', async ({ page }) => {
    await page.goto('/faq');
    await page.locator('button[aria-expanded]').nth(0).click();
    await page.locator('button[aria-expanded]').nth(1).click();
    await expect(page.locator('section')).toHaveScreenshot('faq-accordion-multi.png');
  });
});

test.describe('報名表單 — 互動', () => {
  test('欄位 focus 狀態', async ({ page }) => {
    await page.goto('/foreign-domestic-form');
    await page.locator('input[name="name"]').focus();
    await expect(page.locator('form')).toHaveScreenshot('form-input-focus.png');
  });

  test('Radio 選取（稱謂）', async ({ page }) => {
    await page.goto('/foreign-domestic-form');
    await page.locator('input[id="title-other"]').click();
    await expect(page.locator('form')).toHaveScreenshot('form-radio-other.png');
  });

  test('Checkbox 選取（家庭狀況）', async ({ page }) => {
    await page.goto('/foreign-domestic-form');
    const checkbox = page.locator('[id^="familyStatus-"]').first();
    await checkbox.click();
    await expect(page.locator('form')).toHaveScreenshot('form-checkbox-checked.png');
  });

  test('表單驗證錯誤', async ({ page }) => {
    await page.goto('/foreign-domestic-form');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('form')).toHaveScreenshot('form-validation-errors.png');
  });

  test('MiniFAQ 展開（表單頁）', async ({ page }) => {
    await page.goto('/foreign-domestic-form');
    await page.locator('#faq button').first().click();
    await expect(page.locator('#faq')).toHaveScreenshot('form-faq-expanded.png');
  });
});
```

### Step 2.5：確認開發伺服器與字型

1. 確認 `npm run dev` 正在運行且可存取 `localhost:3000/foreign-domestic-helper-under-12/`
2. 確認系統已安裝 SweiGothicCJKtc 字型（`fc-list | grep Swei` 或 macOS Font Book 確認）
   - 若未安裝：從 `src/fonts/` 安裝字型檔，避免 fallback 字型造成大量假差異

### Step 3：建立 baseline 截圖

> **策略決定：使用 `--update-snapshots` 自動產生**
> 不可手動複製 `.claude/` 參考截圖 — 那些截圖的 viewport、DPI、字型渲染與 Playwright 截圖不一致，會產生大量假失敗。

```bash
# 首次執行 — 自動產生 baseline 到 e2e/__screenshots__/
npx playwright test visual-regression --update-snapshots
```

產生後：
1. 目視檢查 `e2e/__screenshots__/` 中的 baseline 截圖，確認無明顯錯誤
2. 與 `.claude/old-domestic-helper.png` 等參考截圖做大方向比對（非像素級）
3. `git add e2e/__screenshots__/` + commit：`test: 新增 visual regression baseline 截圖`

### Step 4：Ralph Loop 指令（visual-qa driven）

> **Driver 修正**：原版用 Playwright `toHaveScreenshot()` 當 gate 有概念漏洞 — baseline 是從當前站拍的，第 1 輪會全過，loop 空轉。
> 修正後以 **visual-qa skill** 為 diff driver（比對當前站 vs `.claude/` 舊站參考），Playwright baseline 降為事後 regression guard（loop 運行期間不跑，避免假 fail）。

```bash
/ralph-loop "
你的任務：讓三個公開頁面（/、/foreign-domestic-form、/faq）在桌面與手機斷點上視覺對齊舊站。

參考資料（皆位於 .claude/）：
- old-domestic-helper.png、current-domestic-helper.png 等 — 舊站參考截圖
- style-reference.json — 從舊站 computed style 抽取的色彩/間距/字級正確值
- style-alignment-status.md — 過去三輪對齊進度（第三輪已完成幫傭專案頁精確對齊）
- dom-structure-domestic-helper.json — DOM 結構對照

每輪迭代：
1. 呼叫 visual-qa skill 比對舊站與當前實作，產出 L1/L2/L3 三層差異清單
2. 依嚴重度排序，修正前 3 項 high/medium 差異
3. 修改範圍：src/components/**、src/app/**、src/data/**、src/app/**/layout.tsx
4. 參照 style-reference.json 確認精確數值（禁止猜測）
5. 下輪再跑 visual-qa 驗證修正並找新差異

退出條件：
- visual-qa 報告無 high 差異、且 medium 差異 ≤ 3 項 → 輸出 <promise>VISUAL QA PASS</promise>
- 或達到 max-iterations 15

注意事項：
- 禁止改 CSS font-family（字型安裝問題非程式碼，列 .claude/style-alignment-status.md 待處理）
- Logo 檔案「外傭專區_LOGO.png」未取得，不必修
- 幫傭專案頁 /domestic-helper 不在本輪範圍（已完成第三輪精確對齊）
- loop 期間不要跑 Playwright visual-regression（CSS 變動會造成假 fail），留到 Step 5 再跑
" --max-iterations 15 --completion-promise "VISUAL QA PASS"
```

### Step 5：對齊完成後鎖住 baseline

**Ralph Loop 輸出 VISUAL QA PASS 後：**
1. 跑 `npx playwright test visual-regression --update-snapshots` 產出對齊後的新 baseline
2. 目視檢查新 baseline 與舊站參考截圖大方向一致
3. `git add e2e/__screenshots__/ src/ && git commit -m "refactor: 視覺對齊舊站（Ralph Loop 迭代）"`

**若達到 max-iterations 15 仍未輸出 PASS：**
1. 將當前 visual-qa 最後一份差異報告儲存為 `.claude/remaining-diffs.md`
2. 分類剩餘差異：
   - **字型差異** — 非程式碼問題（字型安裝或 fallback 渲染）
   - **Logo 缺檔** — 阻塞項目
   - **真實 CSS 差異** — 手動修復追蹤項
3. 跑 `--update-snapshots` 鎖住部分進度，建立追蹤 issue 供下次 session 處理

---

## 門檻調整指南

根據修正階段逐步收緊門檻：

| 階段 | maxDiffPixelRatio | 說明 |
|------|------------------|------|
| 初始開發 | `0.2`（80%） | 快速收斂大方向 |
| 細節調整 | `0.1`（90%） | 間距、字級、顏色 |
| 最終驗收 | `0.05`（95%） | 接近像素完美 |

修改方式：調整 `playwright.config.ts` 中的 `maxDiffPixelRatio` 值即可。

---

## 涵蓋頁面與裝置

| 頁面 | Desktop (1280px) | Mobile (393px) | 狀態 |
|------|:-:|:-:|------|
| 申請資格 `/` | ✓ | ✓ | 待修正 |
| 報名表單 `/foreign-domestic-form` | ✓ | ✓ | 待修正 |
| 常見問題 `/faq` | ✓ | ✓ | 待修正 |
| 幫傭專案 `/domestic-helper` | — | — | 已通過初步 review，不納入此輪 |

Playwright config 已有 `chromium` + `mobile-chrome` 兩個 project，
每個頁面會產生兩組 baseline，自動涵蓋桌面和手機版。

---

## 注意事項

1. **字型一致性** — 截圖環境需安裝 SweiGothicCJKtc 字型，否則 fallback 字型會造成大量假差異
2. **動態內容** — 如有日期、計數器等動態元素，用 `mask` 參數遮蔽：
   ```typescript
   await expect(page).toHaveScreenshot('home.png', {
     mask: [page.locator('.dynamic-date')],
   });
   ```
3. **fullPage 截圖** — sticky header 會在每個 viewport 重複出現，建議用 viewport 截圖（非 fullPage）或先隱藏 sticky 元素
4. **CI 環境** — Linux 字型渲染與 macOS 不同，baseline 需按 OS 分開或統一在 CI 產生
