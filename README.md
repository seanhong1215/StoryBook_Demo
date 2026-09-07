# My Design System

![React Design System — 模板元件庫](src/assets/portfolio-cover.png)

一套參考 Ant Design 設計理念、用於面試作品審閱的 React 元件庫。

這是用 React、Vite 與 Storybook 建的輕量設計系統，目標放在「小型內部產品真的用得上」的元件品質：清楚的公開匯出、可重用的 CSS token、Storybook 文件，以及一個真實接入的消費端範例。

## 技術堆疊

- React 19
- Vite 8 library mode
- Storybook 10（`@storybook/react-vite`）
- ESLint flat config
- 以 CSS 自訂屬性實作 design token

## 元件

公開匯出集中在 `src/index.ts`。所有元件都是 TypeScript、支援 `forwardRef`，
並且各自匯出 prop 型別。

- `ConfigProvider`
- `ThemeProvider`
- `Icon`
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

## 在本機跑起來

執行消費端示範畫面：

```bash
npm run dev
```

`src/App.tsx` 從 `src/index.ts` 匯入元件 —— 跟套件使用者拿到的是同一個公開進入點。
這是最快讓人看到「這個 library 真的能組成一個產品畫面」的方式。

執行 Storybook 文件站：

```bash
npm run storybook
```

打包 library：

```bash
npm run build
```

產出靜態 Storybook：

```bash
npm run build-storybook
```

Lint：

```bash
npm run lint
```

## 私有安裝方式

套件名是 `@seanhong1215/my-design-system`，**沒有**發布到公開 npm registry。
要裝進內部 MVP 專案有兩條支援的路徑。

### 方式 A —— GitHub Packages（私有 registry）

有一個以上的專案要用時建議走這條。private repo 也免費。

一次性設定：到 <https://github.com/settings/tokens> 建一個 **classic** PAT，
勾選 `write:packages` **與 `repo`** —— private repo 缺 `repo` 會拿到 **404**
而不是權限錯誤，很容易誤判成套件不存在。

把它寫進**個人的** `~/.npmrc`（Windows 是 `C:\Users\<你>\.npmrc`），
不要在指令列上傳遞 —— 指令列會留在 shell 歷史裡，npm 也會把失敗的呼叫寫進
debug log：

```
//npm.pkg.github.com/:_authToken=YOUR_PAT
```

用 `npm whoami --registry=https://npm.pkg.github.com` 驗證。

> 這裡**不要**用 `npm login`。npm 11 預設走瀏覽器的 OAuth 流程，
> GitHub Packages 不支援，會卡在 `Username:` 那一步不動。

接著發布：

```bash
npm publish
```

`prepublishOnly` 會自動跑一次建置，因此不可能把過期或缺漏的 `dist/` 發出去
—— 這點很重要，因為 `dist/` 是被 gitignore 的。

在使用端專案加一支 `.npmrc`（PAT 只需要 `read:packages`）：

```text
@seanhong1215:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

```bash
npm install @seanhong1215/my-design-system
```

### 方式 B —— 本地 tarball（零設定）

只想在單一專案裡試用時夠用。

```bash
npm run build
npm pack
```

會產生 `seanhong1215-my-design-system-0.2.0.tgz`。從你的專案指向這個 repo 的
實際位置安裝：

```bash
npm install /path/to/storybook/seanhong1215-my-design-system-0.2.0.tgz
```

### 可運作的範例

`demo/product-a-demo` 是放在這個 repo 裡的真實消費端專案。它從 GitHub Packages
安裝 `@seanhong1215/my-design-system` —— 跟其他使用者完全一樣的方式 ——
所以它的 `package.json` 本身就是真實接入設定的範例，而不只是本地捷徑。

```bash
cd demo/product-a-demo
npm install   # 需要 GitHub Packages 認證，見 .npmrc / .docs/INTERNAL-ROLLOUT.md
npm run dev   # http://localhost:5173
```

如果你正在改 library，想讓 demo 立刻反映尚未發布的本地變更（而不是等下一版），
在 repo 根目錄執行：

```bash
npm run demo:sync   # 打包目前的原始碼並用 --no-save 裝進 demo，
                    # package.json 仍指向 registry 版本
```

打包本身的正確性（`files` / `exports` / `sideEffects` / 型別解析）
由 `npm run verify:pack` 獨立驗證：它針對當前原始碼自建一個臨時消費端 ——
這也是 CI 跑的那一關，不依賴 demo，也不需要 registry 認證。

demo 的 `README` 同時是接入指南（主題、token 對應、表單、加入自己的產品線）。

### 用法

```tsx
import {
  Alert,
  Button,
  Card,
  ConfigProvider,
  Form,
  FormItem,
  Input,
  Select,
  Space,
  Table,
  zhTW,
} from '@seanhong1215/my-design-system'

export function App() {
  return (
    // global 讓主題屬性寫到 <html>，portal 出去的 Modal 才吃得到品牌 token
    <ConfigProvider global productLine="commerce" locale={zhTW}>
      <Space direction="vertical" align="stretch">
        <Alert type="success" message="Design system connected" />
        <Card title="建立工作區">
          <Form onFinish={console.log}>
            <FormItem name="workspace" label="工作區名稱" rules={[{ required: true }]}>
              <Input placeholder="Acme workspace" />
            </FormItem>
            <FormItem name="plan" label="方案">
              <Select
                placeholder="選擇方案"
                options={[
                  { label: 'Commerce Pro', value: 'commerce-pro' },
                  { label: 'Finance Basic', value: 'finance-basic' },
                ]}
              />
            </FormItem>
            <Button type="primary" htmlType="submit">建立</Button>
          </Form>
        </Card>
        <Table
          columns={[
            { title: '訂單', dataIndex: 'id', sorter: true },
            { title: '客戶', dataIndex: 'customer', sorter: true },
          ]}
          dataSource={[
            { key: '1', id: 'ORD-1024', customer: 'Acme Studio' },
          ]}
        />
      </Space>
    </ConfigProvider>
  )
}
```

`ThemeProvider` 現在是 `ConfigProvider` 的薄包裝，保留給既有使用端；
新專案直接用 `ConfigProvider`。

### 樣式與命名衝突

所有 class 都加上 `mds-` 前綴（`.mds-btn`、`.mds-card`、
`.mds-form-item__label`），這是它們不會撞到宿主 app 自己的樣式或 Bootstrap 的
原因。宿主 app 定義 `.card` 或 `.input` 不會影響到 library 的元件。

**用 bundler 的話不需要 import 任何樣式表。** ES 產物保留一個元件一支模組，
每支各自 import 自己的 CSS，因此你只會拿到用到的那些樣式。只 import 一個
`Button` 是 1.4 kB JS + 2.1 kB CSS；全部 import 是 45 kB + 30 kB。
`npm run measure:bundle` 會建兩個臨時消費端並印出這份對照 ——
之後任何改動讓 tree-shaking 失效，它就會讓 CI 失敗。

`@seanhong1215/my-design-system/styles.css` 仍然保留給沒有 bundler 的使用端
（UMD / CDN 路徑），那是整包樣式合成的單一檔案。

### 主題

token 分成三層，彼此不重疊：

| 層 | 由誰控制 | 例子 |
|---|---|---|
| 尺度 | 固定，不隨主題變 | `--spacing-md`、`--font-size-sm`、`--radius-md` |
| 品牌 | `[data-product-line]` | `--color-primary`、`--color-success`、`--color-on-brand` |
| 表面 | `[data-theme]` | `--color-surface`、`--color-text`、`--shadow-md` |

產品線：`core`、`commerce`、`finance`、`internal`。
主題：`light`（預設）、`dark`。

```tsx
<ConfigProvider global productLine="finance" theme="dark">
```

`Alert`、`Tag`、`Badge` 用的彩色淺底（`--tone-*`）是在執行期用 `color-mix()`
由品牌色與當前表面色即時混出來的，所以會**同時**跟著產品線與主題走，
不需要為每個組合手工維護一份色票。4 條產品線 × 2 個主題共 8 組，
文字對比度都已驗證通過 WCAG AA（4.5:1）。

> `color-mix()` 需要 Chrome 111+、Safari 16.2+ 或 Firefox 113+。

有幾個 token 是專門為了避開常見的暗色模式錯誤而存在的：

- `--color-on-brand` —— 壓在品牌色填充上的文字與圖示（primary 按鈕的文字、
  checkbox 的勾）。兩套主題下都維持白色，**不要**改用 `--color-surface`。
- `--color-inverse-surface` / `--color-inverse-text` —— 給刻意反轉的表面用，
  例如 `Tooltip`，它必須在兩套主題間反向翻轉。
- `--color-primary-text` / `--tone-info-text` —— 品牌色**當文字用**的版本
  （選中的分頁、link 按鈕）。`--color-primary` 本身是給填充與邊框用的，
  當文字時對比度不保證足夠。

在 Storybook 裡，工具列有 **Theme** 與 **Product line** 兩個切換器，
對每一個 story 都生效。

## CDN / UMD 本機測試

先建置：

```bash
npm run build
```

使用這幾支產出檔案：

- `dist/my-design-system.css`
- `dist/my-design-system.js`
- `dist/my-design-system.umd.cjs`

UMD 用法要先載入 React 與 ReactDOM 再載入 library bundle ——
Vite 的 library 建置把它們設為 external。

## Storybook 結構

Storybook 用這些內容說明整個套件：

- `Components/Showcase`：五個版型，第一個是可以真的操作的營運主控台。
- `Components/Overview`：元件清單與設計系統定位。
- `Components/Getting Started`：安裝、`ConfigProvider`、自訂產品線。
- `Components/Accessibility`：library 保證什麼、使用端要自己做什麼。
- `Components/Architecture`：共用行為層與幾個關鍵取捨。
- 元件 story 分在 `General`、`Data Display`、`Data Entry`、`Feedback`、
  `Navigation`、`Layout` 底下。
- token 的 story 在 `Foundation` 底下。

## 視覺回歸

`npm test` 會對每個 story 跑 axe，抓得到無障礙違規，但對「顏色跑掉了沒」
完全無話可說。這在這個 repo 特別要緊：表面層的 token 只由 `[data-theme]` 覆寫，
一個壞掉的值可能只在暗色下失效，而所有測試照樣全綠。

`.github/workflows/chromatic.yml` 補的就是這個缺口。每個 story 在明暗兩套主題
各快照一次（設定在 `.storybook/preview.tsx` 的 `parameters.chromatic.modes`），
差異報在 Chromatic 的 build 上而不是讓 CI 失敗，合併到 `master` 時把當前樣貌
接受為新的基準。

**一次性設定**（在這之前 workflow 會自己安靜略過）：

1. 到 <https://www.chromatic.com/> 建一個專案並連上這個 repo。
2. 把 project token 存進 **Settings → Secrets and variables → Actions →
   New repository secret**，名稱是 `CHROMATIC_PROJECT_TOKEN`。

要在自己電腦上跑：

```bash
CHROMATIC_PROJECT_TOKEN=<token> npm run chromatic
```

產品線（`core` / `commerce` / `finance` / `internal`）刻意沒有放進快照模式 ——
放進去會讓快照數變成四倍，超出免費額度。改動品牌色時再手動確認。

## 發布

版本號遵循 SemVer。1.0 之前 API 仍在調整，因此破壞性變更會落在 minor
（`0.x.0`），且一定列在 [CHANGELOG.md](CHANGELOG.md) 的 **Changed** 底下。

1. 把 `CHANGELOG.md` 裡 `## [Unreleased]` 的內容移到新版本的標題下。
2. 升版並打 tag：

   ```bash
   npm version minor        # 或 patch
   git push --follow-tags
   ```

   `npm version` 會跑 `preversion`，也就是 `npm run verify` —— lint、typecheck、
   完整的 Storybook 測試與 library 建置。沒過的版本拿不到 tag。

3. 推 `v*` tag 會觸發 `.github/workflows/publish.yml`。它會重跑一次驗證、
   在 tag 與 `package.json` 版本不一致時失敗、確認打包出來的 tarball 能裝進
   全新的消費端，然後發布到 GitHub Packages。

從自己電腦發布（`npm publish`）也仍然可行：`prepublishOnly` 跑的是同一套
`npm run verify`，所以沒過 lint、typecheck 或測試的建置兩條路都發不出去。

## 開發規範

新增一個元件時：

```text
src/components/NewComponent/NewComponent.tsx
src/components/NewComponent/NewComponent.css
src/components/NewComponent/NewComponent.stories.tsx
```

CSS 由**元件檔自己** import，不要加進 `src/index.ts`：

```ts
// NewComponent.tsx
import './NewComponent.css'
```

> 這點很關鍵。`src/index.ts` 一旦 import 了各元件的 CSS，
> 只用一個 `Button` 的使用端也會被迫載入整包樣式，tree-shaking 就失效了。
> `src/index.ts` 只 import `tokens.css`。

然後在 `src/index.ts` 補上匯出：

```ts
export { NewComponent } from './components/NewComponent/NewComponent'
export type { NewComponentProps } from './components/NewComponent/NewComponent'
```

規範：

- **每個 class 都加 `mds-` 前綴**，並維持 BEM 結構
  （`.mds-block__element--modifier`）。
- **用 `forwardRef` 包起來**並設定 `displayName`。ref 要指向使用端真正需要的
  那個元素 —— 表單控制項是內層原生的 `<input>` / `<select>`，不是外層 wrapper。
  元件本身已有內部 ref 的話，用 `useImperativeHandle` 合併。
- 使用 `src/tokens/tokens.css` 既有的 token，不要寫死顏色。
- 匯出 prop 型別，並在 Storybook 記錄各種 variant 與狀態。
