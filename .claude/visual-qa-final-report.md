# Visual QA Final Report — Ralph Loop Step 4

**完成日期**: 2026-04-15
**迭代次數**: 7 輪（exit 於 iter 7）
**方法**: visual-qa skill 不存在於系統，以 curl + Python HTMLParser 結構化比對替代；style-reference.json 作為精確值來源

---

## 結構對齊最終狀態（heading + section + scroll-mt-32）

| Page | h1 | h2 | h3 | h4 | h5 | section | scroll-mt-32 | Δ |
|------|----|----|----|----|----|---------|--------------|---|
| OLD / | 1 | 6 | 10 | 4 | 2 | 6 | 5 | — |
| NEW / | 1 | 6 | 10 | 4 | 2 | 6 | 5 | **0** |
| OLD /faq | 0 | 1 | 1 | 4 | 0 | 2 | 0 | — |
| NEW /faq | 0 | 1 | 1 | 4 | 0 | 2 | 0 | **0** |
| OLD /form | 0 | 0 | 1 | 4 | 0 | 1 | 0 | — |
| NEW /form | 0 | 2 | 1 | 4 | 0 | 2 | 1 | +2 h2, +1 sect (architectural) |

**/** 與 **/faq** 結構完全對齊（Δ=0）。**/form** 有 2 個 h2、1 個 section、1 個 scroll-mt-32 不匹配，均來自設計決策（MiniFAQ 為 round 1 主動加入；「聯絡方式」為 ApplicationForm 內部 section divider），非視覺回歸。

---

## Content h2 對齊（首頁）

OLD 與 NEW 首頁 h2 完全一致，連順序都相同：
1. 快速連結（TOC）
2. 國人家庭幫傭申請資格總整理
3. 外籍家庭幫傭月薪薪資及費用
4. 外籍家庭幫傭申請流程圖
5. 申請文件
6. 申請問答

---

## CSS token 編譯驗證

所有舊站精確 hex / arbitrary value 都已進入編譯後的 CSS（91KB 編譯檔）：

| Token | CSS 檔出現次數 | 用途 |
|---|---|---|
| `#ecebf7` | 6 | Section heading card 淡紫底 |
| `#3d378e` | 15 | 深靛主色（nav/footer/heading） |
| `#837ccf` | 23 | Brand 紫 |
| `#ddd8f2` | 4 | 卡片邊框 |
| `#f5c842` | 7 | Header active 金邊 |
| `1100px` | 2 | 容器寬度 |
| `260px` | 2 | TOC aside 寬度 |
| `scroll-margin-top: 8rem` | 1 | `scroll-mt-32` TOC anchor offset |

---

## 逐輪修復清單（18 項）

| Iter | # | Fix | Severity |
|---|---|---|---|
| 1 | 1 | `/` h1 移除 "(外勞)" | HIGH |
| 1 | 2 | `/faq` 雙欄重寫 + 精確 tokens | HIGH |
| 1 | 3 | TOC 對齊舊站 aside 結構 | HIGH |
| 2 | 4 | Home 5 sections 統一 heading card + scroll-mt-32 + id 改名 | HIGH |
| 2 | 5 | Policy card h5 + 金色 SVG + `border-b-2 border-[#fef08a]` | HIGH |
| 2 | 6 | Document list 扁平化單卡片 bullet | HIGH |
| 3 | 7 | CostTable 雙模式 (mobile divide-y + desktop bg-[#3d378e] table) | HIGH |
| 3 | 8 | ProcessFlow 簡化為 grid md:grid-cols-2 xl:grid-cols-3 卡片 | HIGH |
| 3 | 9 | `/form` 移除 double `<main>` 巢狀 | MEDIUM |
| 4 | 10 | HeroBanner 重排：圖在前 + h1 置中 | HIGH |
| 4 | 11 | Home layout `grid lg:grid-cols-[260px_minmax(0,1fr)]` | HIGH |
| 4 | 12 | SiteFooter 擴充為三欄佈局 | HIGH |
| 5 | 13 | 去 ServiceInfoCard 重複（後於 iter 6 還原） | HIGH |
| 5 | 14 | Header active state `border-b-[3px] border-[#f5c842] bg-white/10` | MEDIUM |
| 5 | 15 | Header logo row `py-3 justify-between` + layout pt | MEDIUM |
| 6 | 16 | ServiceInfoCard 還原到 layout（修正 iter 5） | HIGH |
| 6 | 17 | Calculator h3 → h5（舊站語意） | MEDIUM |
| 6 | 18 | ServiceInfoCard 服務時間/電話 h3 → h4 | MEDIUM |

**HIGH 修復: 13 項** · **MEDIUM 修復: 5 項**

---

## 未修項目（可追蹤技術債）

| # | 項目 | 嚴重度 | 原因 |
|---|---|---|---|
| 1 | `/form` 頁面 h2 "聯絡方式" + "申請問答"（MiniFAQ） | MEDIUM | 設計決策（ApplicationForm section divider + round 1 加 MiniFAQ 決定） |
| 2 | Hero banner 圖檔（old `requirements-banner.jpg` vs new `250326_家庭幫傭.jpg`） | LOW | 舊站圖檔未取得，per rules skip |
| 3 | Header logo 圖檔（old `logo-global.svg`） | LOW | 舊站圖檔未取得，per rules skip |
| 4 | CSS `font-family` | LOW | 字型安裝問題留待後續，per rules skip |
| 5 | Footer 快速連結少 2 項（線上挑傭 / 隱私權政策） | LOW | 對應頁面在新站不存在 |
| 6 | ServiceInfoCard 視覺風格（仍為 /domestic-helper 風格，非 /home 舊站 inline 風格） | MEDIUM | 需新增 `HomeServiceBlock` 元件，超出本輪 top-3 範圍 |

---

## 退出條件判定

**loop 退出條件**：visual-qa 回報無 high 差異且 medium 數量 ≤ 3

| 條件 | 結果 |
|---|---|
| HIGH 差異 | **0** ✓ |
| MEDIUM 差異 | **2**（項目 1 設計決策 + 項目 6 ServiceInfoCard 風格） ✓ |

**→ 符合退出條件，本輪 loop 完成。**

---

## 後續建議（Step 5）

1. 執行 `npx playwright test visual-regression --update-snapshots` 建立對齊後的 baseline 截圖
2. 目視檢查 `e2e/__screenshots__/` 與 `.claude/` 舊站截圖大方向一致
3. commit baseline 並 enable 視覺回歸守門
4. Tech debt 追蹤：新增 `HomeServiceBlock` 元件以對齊 /home 的 inline 服務區塊舊站風格（目前用 /domestic-helper 風格代替）
