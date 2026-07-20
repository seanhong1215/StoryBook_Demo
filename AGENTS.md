# AGENTS.md

## 專案概況

這個專案是 React + Vite + Storybook 的 design system / component library，不是完整路由型網站應用。目前定位是面試作品用的 Ant Design-inspired 輕量 React UI library，目標是讓小型內部產品可以透過本機 `npm pack`、file dependency 或 UMD build 導入使用。

- Package name: `@seanhong1215/my-design-system`（私有，散布方式見 README「Consuming This Library Privately」）
- Library entry: `src/index.ts`
- Build output: `dist/my-design-system.js`, `dist/my-design-system.umd.cjs`, `dist/my-design-system.css`
- Main preview/documentation surface: Storybook
- Local demo app: `src/App.tsx`，現在是 Product A adoption demo，用來驗證產品端如何透過 public API 組出實際後台畫面

## 核心技術

- React 19
- Vite 8
- Storybook 10 with `@storybook/react-vite`
- ESLint flat config
- Vitest browser mode via Storybook addon and Playwright
- CSS custom properties as design tokens

## 目錄與責任

- `.storybook/`
  - `main.ts`: Storybook story discovery 與 addon 設定
  - `preview.tsx`: 全域 Storybook 參數、tokens/docs CSS 載入、排序與測試設定
- `src/index.ts`
  - library public API
  - 匯入全域 token 與元件 CSS
  - 匯出所有對外元件
- `src/App.tsx`
  - Product A local adoption demo
  - 只能使用 `src/index.ts` 的 public exports，避免繞過套件入口
- `src/theme/`
  - `ThemeProvider.tsx`: 透過 `data-product-line` 切換 product line theme。預設包一層 div；
    傳 `global` 則改寫在 `document.documentElement`，讓 portal 出去的 Modal 也吃得到 token
- `src/tokens/`
  - `tokens.css`: 顏色、間距、圓角、字級、字重、陰影與 product line token overrides
  - `Tokens.stories.tsx`: token 文件展示
- `src/components/`
  - 每個元件維持同資料夾結構：`Component.tsx`, `Component.css`, `Component.stories.tsx`
- `src/docs/`
  - `Showcase.stories.tsx`: 面試展示入口，用既有元件組出小型後台管理頁
  - `Overview.stories.tsx`: Storybook component overview
  - `Usage.stories.tsx`: 本機 npm pack/file dependency、匯入與 product line theme 使用說明
  - `storybook-docs.css`: docs/stories 共用版面樣式
- `demo/product-a-demo/`
  - 真實消費端範例，**獨立的專案**（自己的 package.json 與 node_modules）
  - 裝的是 `npm pack` 出來的 `.tgz`，不是 `file:` 連到原始碼 ——
    這樣才驗得到 `files` / `exports` / `sideEffects` 是否正確
  - 改動 library 後要 `npm run demo:sync` 才會生效；`.tgz` 有進 .gitignore，
    剛 clone 的 repo 必須先跑一次
  - 它的 `README.md` 同時是「如何導入到自己產品」的使用指南
  - **不要把它加進 library 的 build / stories glob / tsconfig include**；
    它是消費端，不是 library 的一部分

## Public API

目前公開 API 由 `src/index.ts` 控制。新增可被外部套件使用的元件時，必須在這裡匯入對應 CSS 並 export 元件。

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

## 現有功能與邏輯架構

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

Storybook 排序在 `.storybook/preview.tsx` 的 `storySort.order` 中維護。新增分類或元件時，要同步確認排序。

### Routing

目前沒有 `react-router` 或任何 app router。Storybook 的 `/?path=...` 只用於文件連結，不是應用程式路由。

### State Management

目前沒有 Redux、Pinia、Zustand 或 API cache。核心 library 不持有全域狀態。`src/App.tsx` 只有 demo 畫面需要的 local state。

### API / Data Fetching

目前沒有 API client、service layer、mock server 或資料抓取邏輯。

## 新功能迭代協作規則

在實作任何新功能前，先做以下檢查：

1. 判斷新功能是 component、token、theme、docs/story、demo 還是 build/export 變更。
2. 確認影響範圍：
   - `src/index.ts` 是否要新增 export
   - `src/components/<Name>/` 是否要新增或修改
   - `src/tokens/tokens.css` 是否要新增 token 或 product line override
   - `.storybook/preview.tsx` 是否要調整 story sort
   - `src/docs/Overview.stories.tsx` 或 `Usage.stories.tsx` 是否要補文件入口
   - `src/docs/Showcase.stories.tsx` 是否要補進展示場景
   - `src/App.tsx` 是否要補進 Product A demo
3. 若需求涉及路由、API、遠端資料或全域狀態，先向使用者確認目標架構，因為目前專案沒有這些層。
4. 採用增量修改，不用整份檔案覆蓋既有內容，除非檔案已損毀或內容是初始化範本。

## 元件實作硬性規範

新增或修改元件時，以下兩點沒有例外：

1. **所有 class 必須加 `mds-` 前綴**，並維持 BEM 結構
   （`.mds-block__element--modifier`）。樣式輸出成單一全域 CSS，前綴是唯一
   避免與宿主 app 或 Bootstrap 對撞的機制。
2. **元件必須用 `forwardRef` 包起來並設定 `displayName`**。ref 要指向消費端
   真正需要的元素，不是最外層 wrapper：
   - 表單類（Input / Textarea / Select / Switch）指向內層原生控制項，
     否則 react-hook-form 的 `register()` 會失效
   - 元件若已有內部 ref（Checkbox 的 indeterminate、Dropdown 的
     outside-click），用 `useImperativeHandle` 合併，不要另開一個
   - 泛型元件（如 Table）forwardRef 後要 cast 回帶泛型的函式型別，
     否則 `<T>` 會被抹成 unknown

顏色一律取自 `src/tokens/tokens.css` 的 CSS variables，不要寫死色碼。

### 選 token 時最容易選錯的三個地方

1. **背景要用 `--color-surface`，不是 `--color-white`。** 但疊在品牌色填底上的
   前景（primary 按鈕文字、checkbox 勾勾、switch 把手）要用 `--color-on-brand`，
   它在明暗兩種主題下都是白色。選錯的話暗色模式會變成深字配藍底。
2. **刻意反轉的表面（Tooltip）要用 `--color-inverse-surface` / `--color-inverse-text`。**
   不要寫 `background: var(--color-text)`，暗色下 `--color-text` 會變淺，
   結果是淺底配白字。
3. **品牌色當「文字」要用 `--color-primary-text`，不是 `--color-primary`。**
   後者是給填底與邊框用的，暗色頁面底上當文字只有 3.97:1。
   `--color-primary-text` 在暗色會自動往白色混。
4. **新增依賴其他 token 的 `color-mix()` token 時，選擇器不能只寫 `:root`。**
   CSS 自訂屬性在宣告的元素上就完成 var() 代換，算出的值會以固定顏色往下繼承，
   巢狀的 `[data-theme]` 不會重算。要跟著現有的
   `:root, [data-theme], [data-product-line]` 區塊一起宣告。

## 修改方案回報格式

- 新增檔案
  - `src/components/<Name>/<Name>.tsx`: 元件實作
  - `src/components/<Name>/<Name>.css`: 元件樣式
  - `src/components/<Name>/<Name>.stories.tsx`: Storybook 文件與案例
- 修改檔案
  - `src/index.ts`: 新增 CSS import、named export 與 prop types export
  - `src/docs/Overview.stories.tsx`: 新增 component overview entry
  - `src/docs/Showcase.stories.tsx`: 如需展示整體產品場景，補入元件組合
  - `src/App.tsx`: 如需展示產品端導入流程，補入 local adoption demo
  - `.storybook/preview.tsx`: 如有新分類，更新 story sort
- 驗證
  - `npm run lint`
  - `npm run build`
  - `npm run build-storybook`
  - `npm pack --dry-run`

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
- 若新增元件要對外使用，務必更新 `src/index.ts`。

## 測試與驗證注意事項

- 對外套件驗證建議使用 `npm pack --dry-run` 確認 tarball 內容，再用 `npm pack` 產生 `.tgz` 給 A 產品本機安裝。
- `dist/` 未進 git，`prepublishOnly` 會在 publish 前自動 build。不要改掉這行，否則會出貨空的 dist。
- 改動元件 API 或樣式後，光是 build 過不算驗證：建一個臨時的 vite react-ts 專案裝 `.tgz`，
  實測型別解析、樣式套用、以及 react-hook-form `register()` 綁到 `Input` 是否正常。
- UMD/CDN 測試需先載入 React 與 ReactDOM，因為 Vite library build 將它們 external。
- Git 可能因 Windows 目錄 owner 不同出現 dubious ownership。需要讀取狀態時可使用：
  - `git -c safe.directory=D:/shang/技術開發/dev/技術學習/面試作品/storybook status --short`

## 需要先向使用者確認的情況

- 要導入 router 或把 demo app 轉成實際網站。
- 要加入 API client、mock data、server 或資料抓取。
- 要引入全域狀態管理。
- 要調整 package name、exports、build formats 或發佈策略。
- 要更動 `mds-` class 前綴或既有元件的 class 命名（對消費端是破壞性變更）。
