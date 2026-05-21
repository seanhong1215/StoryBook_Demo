# AGENTS.md

## 專案概況

這個專案是 React + Vite + Storybook 的 design system / component library，不是完整路由型網站應用。目前定位是面試作品用的 Ant Design-inspired 輕量 React UI library，目標是讓小型內部產品可以透過本機 npm pack/file dependency 或 UMD build 導入使用。

- Package name: `my-design-system`
- Library entry: `src/index.js`
- Build output: `dist/my-design-system.js`, `dist/my-design-system.umd.cjs`, `dist/my-design-system.css`
- Main preview/documentation surface: Storybook
- Local demo app: `src/App.jsx`，目前保留 Vite template demo，非核心產品功能

## 核心技術

- React 19
- Vite 8
- Storybook 10 with `@storybook/react-vite`
- ESLint flat config
- Vitest browser mode via Storybook addon and Playwright
- CSS custom properties as design tokens

## 目錄與責任

- `.storybook/`
  - `main.js`: Storybook story discovery 與 addon 設定
  - `preview.jsx`: 全域 Storybook 參數、tokens/docs CSS 載入、排序與 a11y 測試設定
- `src/index.js`
  - library public API
  - 匯入全域 token 與元件 CSS
  - 匯出 `ThemeProvider`, `Button`, `Badge`, `Tag`, `Card`, `Table`, `Form`, `FormItem`, `Input`, `Textarea`, `Select`, `Checkbox`, `Switch`, `Alert`, `Modal`, `Empty`, `Tooltip`, `Space`, `Tabs`, `Dropdown`, `Pagination`
- `src/theme/`
  - `ThemeProvider.jsx`: 透過 `data-product-line` 包住 children，讓 CSS variables 切換 product line theme
- `src/tokens/`
  - `tokens.css`: 顏色、間距、圓角、字級、字重、陰影與 product line token overrides
  - `Tokens.stories.jsx`: token 文件展示
- `src/components/`
  - 每個元件維持同資料夾結構：`Component.jsx`, `Component.css`, `Component.stories.jsx`
  - 目前元件：`Button`, `Badge`, `Tag`, `Card`, `Table`, `Form`, `FormItem`, `Input`, `Textarea`, `Select`, `Checkbox`, `Switch`, `Alert`, `Modal`, `Empty`, `Tooltip`, `Space`, `Tabs`, `Dropdown`, `Pagination`
- `src/docs/`
  - `Showcase.stories.jsx`: 面試展示入口，用既有元件組出小型後台管理頁
  - `Overview.stories.jsx`: Storybook component overview
  - `Usage.stories.jsx`: 本機 npm pack/file dependency、匯入與 product line theme 使用說明
  - `storybook-docs.css`: docs/stories 共用版面樣式
- `src/stories/`
  - Storybook 初始化範例檔案
  - 目前不在 `.storybook/main.js` stories glob 中，也被 ESLint 忽略
  - 除非使用者明確要求，不應作為新功能基礎

## 現有功能與邏輯架構

### Public API

目前公開 API 由 `src/index.js` 控制。新增可被外部套件使用的元件時，必須在這裡匯入對應 CSS 並 export 元件。

目前 public API：

- `ThemeProvider`
- `Button`
- `Badge`
- `Tag`
- `Card`
- `Table`
- `Form`
- `FormItem`
- `Input`
- `Textarea`
- `Select`
- `Checkbox`
- `Switch`
- `Alert`
- `Modal`
- `Empty`
- `Tooltip`
- `Space`
- `Tabs`
- `Dropdown`
- `Pagination`

### Component Model

現有元件是 presentational components：

- 由 props 決定 className 或內容
- 不呼叫 API
- 不持有跨元件狀態
- 不依賴 router
- 樣式透過 component CSS + token CSS 組合

### Styling / Theme Flow

資料流是：

1. Consumer import `my-design-system/styles.css`
2. Consumer render React components
3. Optional: 用 `ThemeProvider productLine="commerce"` 包住區塊
4. `ThemeProvider` 輸出 `data-product-line`
5. `tokens.css` 根據 attribute override CSS variables
6. component CSS 使用 CSS variables 呈現對應主題

### Storybook Flow

Storybook 只載入：

- `src/docs/**/*.stories.*`
- `src/components/**/*.stories.*`
- `src/tokens/**/*.stories.*`

Storybook 排序在 `.storybook/preview.jsx` 的 `storySort.order` 中維護。新增分類或元件時，要同步確認排序。

目前 Storybook 展示主線：

1. `Components/Showcase`: 面試展示入口，展示小型後台頁面組合。
2. `Components/Overview`: 元件分類與作品定位。
3. `Components/Usage`: A 產品如何用 `npm pack` 或本機路徑導入。
4. 各分類元件 docs：Controls、variants、states。

### Routing

目前沒有 `react-router` 或任何 app router。Storybook 的 `/?path=...` 只用於文件連結，不是應用程式路由。

### State Management

目前沒有 Redux、Pinia、Zustand、React Context 狀態管理或 API cache。唯一狀態是 `src/App.jsx` 的 Vite demo counter，以及 `src/stories/Page.jsx` 初始化範例中的 local state；兩者都不是核心 library 架構。

### API / Data Fetching

目前沒有 API client、service layer、mock server 或資料抓取邏輯。

## 新功能迭代協作規則

在實作任何新功能前，先做以下檢查：

1. 判斷新功能是 component、token、theme、docs/story 還是 build/export 變更。
2. 確認影響範圍：
   - `src/index.js` 是否要新增 export
   - `src/components/<Name>/` 是否要新增或修改
   - `src/tokens/tokens.css` 是否要新增 token 或 product line override
   - `.storybook/preview.jsx` 是否要調整 story sort
   - `src/docs/Overview.stories.jsx` 或 `Usage.stories.jsx` 是否要補文件入口
   - `src/docs/Showcase.stories.jsx` 是否要補進展示場景
3. 若需求涉及路由、API、遠端資料或全域狀態，先向使用者確認目標架構，因為目前專案沒有這些層。
4. 採用增量修改，不用整份檔案覆蓋既有內容。

## 修改方案回報格式

提出或完成變更時，使用這種格式：

- 新增檔案
  - `src/components/<Name>/<Name>.jsx`: 元件實作
  - `src/components/<Name>/<Name>.css`: 元件樣式
  - `src/components/<Name>/<Name>.stories.jsx`: Storybook 文件與案例
- 修改檔案
  - `src/index.js`: 新增 CSS import 與 named export
  - `src/docs/Overview.stories.jsx`: 新增 component overview entry
  - `src/docs/Showcase.stories.jsx`: 如需展示整體產品場景，補入元件組合
  - `.storybook/preview.jsx`: 如有新分類，更新 story sort
- 驗證
  - `npm run lint`
  - `npm run build`
  - `npm run build-storybook`

引用既有檔案時，保留前後關鍵代碼作為對齊標記，不提供不必要的整份檔案。

## 程式碼風格

- 使用 ES modules。
- React component 使用 named export，例如 `export const Button = (...) => {}`。
- JSX 檔案不加分號，維持目前多數核心檔案風格。
- CSS class 使用 block/modifier pattern，例如 `btn`, `btn--primary`, `card__header`。
- 樣式優先使用 `src/tokens/tokens.css` 的 CSS variables。
- 新元件資料夾命名使用 PascalCase，例如 `src/components/Button/`。
- Story title 依現有分類維持：
  - `Components/Showcase`
  - `Components/Overview`
  - `Components/Usage`
  - `General/<Component>`
  - `Data Display/<Component>`
  - `Data Entry/<Component>`
  - `Feedback/<Component>`
  - `Navigation/<Component>`
  - `Layout/<Component>`
  - `Foundation/<Topic>`
- 若新增元件要對外使用，務必更新 `src/index.js`。

## 測試與驗證注意事項

- `src/stories` 目前被 ESLint 忽略，修改核心功能時不要依賴它驗證。
- Storybook docs 目前只啟用 `@storybook/addon-docs`，`package.json` 雖有 a11y/vitest/playwright 相關套件，但 `.storybook/main.js` 未載入 a11y addon。
- 對外套件驗證建議使用 `npm pack --dry-run` 確認 tarball 內容，再用 `npm pack` 產生 `.tgz` 給 A 產品本機安裝。
- UMD/CDN 測試需先載入 React 與 ReactDOM，因為 Vite library build 將它們 external。
- Git 可能因 Windows 目錄 owner 不同出現 dubious ownership。需要讀取狀態時可使用：
  - `git -c safe.directory=E:/技術學習/面試作品/storybook status --short`

## 需要先向使用者確認的情況

- 要導入 router 或把 Vite demo app 轉成實際網站。
- 要加入 API client、mock data、server 或資料抓取。
- 要引入全域狀態管理。
- 要刪除 `src/stories` 初始化範例。
- 要調整 package name、exports、build formats 或發佈策略。
