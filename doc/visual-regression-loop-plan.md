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

### Step 4：Ralph Loop 指令

```bash
/ralph-loop "
你的任務是修正視覺差異，讓所有頁面通過視覺回歸測試（像素 + DOM 結構）。

參考資料：
- .claude/style-reference.json — 色彩/間距/字級的正確值
- .claude/style-alignment-status.md — 各頁面目前的對齊狀態
- .claude/old-domestic-helper.png 等參考截圖 — 首頁/幫傭頁的視覺參考

每輪迭代：
1. 執行 npm run test:e2e -- visual-regression
2. 若像素測試失敗：讀取 test-results/ 中的 diff 截圖，判斷差異位置
3. 若結構測試失敗：比對 snapshot 差異，修正 DOM 結構（tag/class/巢狀）
4. 第一輪額外執行 visual-qa 產出完整差異清單作為修正指引
5. 修改對應的 CSS / JSX（一輪最多修 3 項），參照 style-reference.json 確認正確值
6. 重新執行測試驗證

測試全部通過時，輸出 <promise>VISUAL QA PASS</promise>
" --max-iterations 15 --completion-promise "VISUAL QA PASS"
```

### Step 5：Ralph Loop 失敗處理

若達到 max-iterations 15 仍未全過：

1. 檢查 `test-results/` 中的 diff 截圖，分類剩餘差異：
   - **字型差異** — 可能是字型安裝問題，非程式碼問題
   - **動態內容** — 需加 `mask` 參數遮蔽
   - **真實 CSS 差異** — 記錄為手動修復項目
2. 考慮放寬 `maxDiffPixelRatio`（例如 0.2 → 0.25），重跑迴圈
3. 若特定測試持續失敗，可暫時加 `test.skip()` 並建立追蹤 issue
4. 產出剩餘差異報告，作為下一輪手動修正的輸入

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
