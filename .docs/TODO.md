# 企業級設計系統升級 — 進度與待辦

> 完整計畫（含每階段細節）：`C:\Users\Administrator\.claude\plans\storybook-tidy-book.md`
> 最後更新：2026-07-17

## 進度總覽

| Phase | 狀態 | 內容 |
|---|---|---|
| 0 | ✅ 完成 | 清理樣板與基準線（commit `c567710`） |
| 1a | ✅ 完成 | TypeScript 基礎設施（commit `02561e0`） |
| 1b | ✅ 完成 | TS 批次 A：Badge/Tag/Space/Empty/Alert/Card/Button（commit `eb3e922`） |
| 1c | ✅ 完成 | TS 批次 B：Input/Textarea/Checkbox/Switch/Select（commit `d321118`） |
| 1d | ✅ 完成 | TS 批次 C：Tooltip/Dropdown/Tabs/Pagination/Table（commit `0bab142`） |
| 1e | ✅ 完成 | TS 批次 D 收尾，全庫 100% TS（commit `601e463`） |
| 2 | ⬜ 待辦 | Dark mode token 架構 |
| 3 | ⬜ 待辦 | Storybook toolbar 全域化（theme + product-line） |
| 4 | ⬜ 待辦 | a11y 真正啟用 |
| 5 | ⬜ 待辦 | Interaction tests（play functions） |
| 6 | ⬜ 待辦 | MDX 使用指南 |
| 7 | ⬜ 待辦 | CI/CD（GitHub Actions + Chromatic + Pages） |

## 待辦細節

### Phase 2 — Dark mode token 架構
- `src/tokens/tokens.css` 重組兩層：品牌層（primary/success/danger/warning）只由 `[data-product-line]` 控制；表面層（bg/border/text/text-muted/shadow）只由 `[data-theme]` 控制
- 新增語意 token：`--color-surface`、`--color-surface-hover`、`--color-bg-subtle`；grep 元件 CSS 把寫死 `#fff` / `--color-white` 當背景的地方換掉
- `[data-theme="dark"]` 區塊：`color-scheme: dark` + 深色表面值 + shadow 補償
- ThemeProvider 的 `theme` prop 已在 Phase 1e 先做好（`src/theme/ThemeProvider.tsx`）
- 更新 Foundation/Tokens story 顯示 dark 對照
- 重點檢查：Table（斑馬紋/hover）、Modal（mask/surface）、Tooltip（深底反轉）、Input/Select（對比）、Tag/Badge（淺色底變體）

### Phase 3 — Toolbar 全域化
- `.storybook/preview.tsx` 加 `globalTypes`（theme: light/dark + productLine: core/commerce/finance/internal）+ `initialGlobals` + decorator
- **關鍵坑**：Modal/Tooltip/Dropdown 用 portal，decorator 必須用 `useEffect` 把 attribute 設在 `document.documentElement`，不能只包 div
- `storybook-docs.css` 處理 autodocs 白底：`[data-theme="dark"] .docs-story { background: var(--color-bg) }`
- `.storybook/manager.js` 移除 `bottomPanelHeight: 0, rightPanelWidth: 0`（Phase 4/5 要看面板）

### Phase 4 — a11y 啟用
- `.storybook/main.ts` addons 加 `'@storybook/addon-a11y'`（已在 devDeps）
- 跑 `npx vitest --project=storybook run` 收集違規 → 修完 → preview 改 `a11y: { test: 'error' }`
- 重點：dark 下 color-contrast（`--color-text-muted` 最常 fail AA）、Modal focus 管理、Select/Dropdown aria、表單 label 關聯
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

## 收尾雜項
- [ ] 全部完成後更新 `AGENTS.md`（目前仍寫 src/index.js、prop-types、src/stories 等舊狀態）
- [ ] `vite.config.ts` 的 `storybookNonAsciiPathFix` workaround：上游修復（storybookjs/storybook#33700）後可移除

## 已知環境注意事項
- 本機路徑含中文會踩 addon-vitest 的 "No test suite found" bug，`vite.config.ts` 已有 workaround（CI 不受影響）
- 首次在新環境跑測試需 `npx playwright install chromium`
- git identity 已設在 repo local（bennyhong / seanhong1215@gmail.com）
