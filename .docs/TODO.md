# 企業級設計系統升級 — 進度與待辦

> 完整計畫（含每階段細節）：`C:\Users\Administrator\.claude\plans\storybook-tidy-book.md`
> 最後更新：2026-07-19

## 進度總覽

| Phase | 狀態 | 內容 |
|---|---|---|
| 0 | ✅ 完成 | 清理樣板與基準線（commit `c567710`） |
| 1a | ✅ 完成 | TypeScript 基礎設施（commit `02561e0`） |
| 1b | ✅ 完成 | TS 批次 A：Badge/Tag/Space/Empty/Alert/Card/Button（commit `eb3e922`） |
| 1c | ✅ 完成 | TS 批次 B：Input/Textarea/Checkbox/Switch/Select（commit `d321118`） |
| 1d | ✅ 完成 | TS 批次 C：Tooltip/Dropdown/Tabs/Pagination/Table（commit `0bab142`） |
| 1e | ✅ 完成 | TS 批次 D 收尾，全庫 100% TS（commit `601e463`） |
| 1f | ✅ 完成 | 可共用門檻：打包保險 + forwardRef + `mds-` 前綴 + ThemeProvider global |
| 2 | ✅ 完成 | Dark mode token 架構 |
| 3 | ✅ 完成 | Storybook toolbar 全域化（theme + product-line） |
| 4 | ⬜ 待辦 | a11y 真正啟用 |
| 5 | ⬜ 待辦 | Interaction tests（play functions） |
| 6 | ⬜ 待辦 | MDX 使用指南 |
| 7 | ⬜ 待辦 | CI/CD（GitHub Actions + Chromatic + Pages） |

## 待辦細節

### Phase 1f — 可共用門檻（已完成）

目標與 Phase 2–7 正交：讓 library 能安全被私人 / 內部 MVP 專案安裝，而非提升設計系統成熟度。

- package.json：scoped name `@seanhong1215/my-design-system`、version 0.1.0、
  `prepublishOnly`（dist 未進 git，缺這行會出貨空包）、`sideEffects: ["**/*.css"]`、
  `publishConfig` 指向 GitHub Packages、`test` script
- 全部 20 個元件支援 `forwardRef`；Table 用 cast 保留泛型，Form 保留 compound 靜態屬性
- 所有 class 加 `mds-` 前綴（170 個 class，改動前後集合一致）
- ThemeProvider 新增 `global` prop，把主題屬性寫到 `documentElement`，解決 Modal portal 吃不到 token
- 已用臨時消費端專案（vite react-ts + tgz + react-hook-form）實測 7 項通過

散布方式：GitHub Packages 私有 registry 為主，本機 `.tgz` 為 fallback。
**發布前需使用者操作**：建立 classic PAT（`write:packages`），然後
`npm config set //npm.pkg.github.com/:_authToken <PAT>`。
不要用 `npm login` —— npm 11 預設走瀏覽器 OAuth，GitHub Packages 不支援，會卡在
`Username:` 提示。

### Phase 2 — Dark mode token 架構（已完成）

實作結果與原規劃的差異，以及過程中踩到的坑：

- token 分三層（不是兩層）：尺度層 / 品牌層 `[data-product-line]` / 表面層 `[data-theme]`
- 元件 CSS 的寫死顏色全部清空（原本 31 處）
- **`--color-white` 有兩種語意，不能一律替換**：Card/Input/Modal 等是表面背景（→ `--color-surface`），
  但 Button 文字、Checkbox 勾勾、Switch 把手是疊在品牌色上的前景（→ 新增 `--color-on-brand`，維持白色）。
  一律換成 surface 的話暗色下 primary 按鈕會變深字配藍底
- **Tooltip 原本是 `background: --color-text` + `color: white`**，暗色下會變成淺底白字（看不見）。
  新增 `--color-inverse-surface` / `--color-inverse-text`
- Alert/Tag/Badge 的彩色淺底改用 `color-mix()` 由品牌色 + 表面色即時混出，
  4 產品線 × 2 主題不需要手工維護 8 組色票
- **踩到的最大的坑**：`--tone-*` 一開始只宣告在 `:root`，但 CSS 自訂屬性在宣告處就完成
  var() 代換，算出的顏色以固定值往下繼承 —— 巢狀 `[data-theme="dark"]` 完全不會重算。
  選擇器必須改成 `:root, [data-theme], [data-product-line]`。`--shadow-focus` 同理
- 順帶補上 `[data-product-line="core"]` 區塊，並在各產品線明確重設 radius，
  否則巢狀切換產品線時品牌色/圓角會殘留上一層的值
- Table 實際上沒有斑馬紋也沒有 row hover，原規劃的檢查項不適用
- 已用 Playwright 對 4 產品線 × 2 主題 = 8 組、每組 11 個顏色對，
  計算 WCAG 對比度，全部通過 AA（腳本邏輯可在 Phase 4 重用）

留給 Phase 4 的 a11y 問題（**非** dark mode 造成，改動前就存在）：
`--color-border` 對 `--color-surface` 在淺色下只有 1.24:1，WCAG 1.4.11 對
「識別控制項所需的邊界」要求 3:1。修它要把所有邊框大幅加深，會動到整體視覺設計，
需要先與使用者確認。

### Phase 3 — Toolbar 全域化（已完成）

- `.storybook/preview.tsx`：`globalTypes`（theme + productLine）+ `initialGlobals` + decorator
- 原本擔心的 portal 坑不需要另外處理 —— decorator 直接用 Phase 1f 做好的
  `<ThemeProvider global>`，它已經會把屬性寫在 `documentElement`
- `storybook-docs.css`：`.sb-show-main` / `.docs-story` 跟著 token 走。
  **只改故事預覽區，不要改整個 `.sbdocs` 包裝層** —— autodocs 的 props table
  是 Storybook 自己的淺色 chrome，外層一起改暗會變成深字配深底
- `.storybook/manager.js`：移除 `bottomPanelHeight: 0` / `rightPanelWidth: 0`
  與 `api.togglePanel(false)`

補做的驗證（腳本可在 Phase 4 重用）：掃過 90 個 story × 2 主題，對每個
有文字的葉節點沿祖先找出實際生效的背景色並計算對比度。找到並修正一項
暗色專屬缺陷：**品牌色被直接當文字用**（Tabs 選中、Pagination 當前頁、
link 按鈕、docs kicker），`#0066FF` 對暗色頁面底只有 3.97:1。
新增 `--color-primary-text`（淺色維持原色，暗色往白色混到 60%）。

### Phase 4 — a11y 啟用
- `.storybook/main.ts` addons 加 `'@storybook/addon-a11y'`（已在 devDeps）
- 跑 `npx vitest --project=storybook run` 收集違規 → 修完 → preview 改 `a11y: { test: 'error' }`
- 重點：Modal focus 管理、Select/Dropdown aria、表單 label 關聯
- 文字對比已在 Phase 2/3 用腳本掃過（8 組 token 組合 + 90 個 story × 2 主題）並修正

**Phase 3 掃描後仍未解決的對比問題（明暗兩色數值完全相同，皆為既有問題，
與 dark mode 無關；改動涉及品牌色定義，需先與使用者確認）：**

| 項目 | 對比 | 說明 |
|---|---|---|
| `.mds-btn--success` 白字 on `--color-success` `#10B981` | **2.54** | 最嚴重 |
| `.mds-btn--danger` 白字 on `--color-danger` `#EF4444` | 3.76 | |
| `--color-border` on `--color-surface`（淺色） | 1.24 | WCAG 1.4.11 要求 3:1 |
| `.mds-tabs__tab` disabled | 1.18 / 1.53 | WCAG 1.4.3 明文豁免停用中的元件，可不修 |

前兩項的可能作法：(a) 直接加深 `--color-success` / `--color-danger`（會影響
tone token 混出來的所有淺底）；(b) 另立 `--color-success-solid` 之類只給填底用的
加深變體，不動品牌色本身。(b) 影響面較小但多一組 token。
- 無法立即修的個別 story 用 story-level `parameters: { a11y: { test: 'todo' } }` 註記原因

### Phase 5 — Interaction tests
- package.json 加 `"test-storybook": "vitest --project=storybook run"`
- 統一從 `storybook/test` import `expect/fn/userEvent/within/waitFor`；callback args 用 `fn()` spy
- P0：Modal（portal 用 `within(document.body)`！）、Dropdown、Form、Tabs、Pagination、Select
- P1：Checkbox/Switch、Input/Textarea、Tooltip（hover+focus）、Button（disabled/loading 不觸發）
- 坑：React 19 + browser mode 斷言用 `waitFor`/`findBy*` 避免 flaky

### Phase 6 — MDX 使用指南
- main.ts glob 加 `'../src/docs/**/*.mdx'`、`'../src/components/**/*.mdx'`
- 共通頁：Introduction / GettingStarted / Theming / Contributing
- Do/Don't 六個：Button、Modal、Form、Select vs Dropdown、Table、Alert
- 文件專用 `DoDont` 元件（`src/docs/components/DoDont.tsx`，不進 library export）
- 更新 `storySort` 把 docs 頁排最前

### Phase 7 — CI/CD
- repo：`github.com/seanhong1215/StoryBook_Demo`（branch: feature）
- `ci.yml`：node 22 → lint → typecheck → build → `npx playwright install chromium --with-deps` → test-storybook → build-storybook
- `chromatic.yml`：`chromaui/action@latest` + `fetch-depth: 0` + `onlyChanged: true`；**需先到 chromatic.com 建專案，token 存 repo secret `CHROMATIC_PROJECT_TOKEN`**（要使用者操作）
- Chromatic 額度：只對 Showcase + 6 個重點元件 default story 加 dark `modes`，其餘 light-only
- `deploy-pages.yml`：`upload-pages-artifact` + `deploy-pages`；repo Settings > Pages source 改 "GitHub Actions"；之後刪 `scripts/deploy-storybook.ps1` 與 `deploy` script
- **Chromatic baseline 務必等 Phase 2/4 視覺定型後才建立**

## 由消費端範例 `../product-a-demo` 實測發現的缺陷

- ~~**`Select` 的 placeholder 無效**~~ — 已修正。
  原因：placeholder option 帶 `disabled`，瀏覽器會跳過它自動選第一個真實選項。
  後果不只是 placeholder 不顯示 —— 非受控用法下 value 永遠非空，
  **`required` 驗證（原生與 react-hook-form）永遠不會觸發**。
  修法：非受控且有 placeholder 時給 select `defaultValue=""`，
  placeholder option 加 `hidden`；受控與非受控分開展開，避免同時傳
  `value` 與 `defaultValue` 觸發 React 警告。
  已加 `Select / Placeholder 預設值` story 釘住此行為。

  > 這類「元件單看正常、組成真實表單才會爆」的缺陷，靠 Storybook 看不出來。
  > 保留 `../product-a-demo` 當作真實消費端的迴歸驗證場。

## 收尾雜項
- [x] 更新 `AGENTS.md` 與 `README.md`（原本仍寫 src/index.js、.jsx、src/stories 等舊狀態）— Phase 1f 已處理
- [ ] `vite.config.ts` 的 `storybookNonAsciiPathFix` workaround：上游修復（storybookjs/storybook#33700）後可移除

## 已知環境注意事項
- 本機路徑含中文會踩 addon-vitest 的 "No test suite found" bug，`vite.config.ts` 已有 workaround（CI 不受影響）
- 首次在新環境跑測試需 `npx playwright install chromium`
- git identity 已設在 repo local（bennyhong / seanhong1215@gmail.com）
