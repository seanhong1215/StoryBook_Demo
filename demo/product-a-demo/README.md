# Product A Demo

一個真實的消費端範例，示範如何把 `@seanhong1215/my-design-system` 接進自己的產品。

雖然放在 design system repo 內（`demo/product-a-demo`），但它是**獨立的專案** ——
有自己的 `package.json` 與 `node_modules`，而且裝的是**打包後的 `.tgz`**，
不是用 `file:` 直接連到原始碼目錄。這樣才會真的驗到 `files` / `exports` /
`sideEffects` 的設定，也就是消費端實際拿到的東西。

## 跑起來

在 **repo 根目錄**執行：

```bash
npm run demo:sync    # build → pack → 安裝進這個 demo（第一次必跑）
npm run demo:dev     # http://localhost:5173
```

`.tgz` 有進 `.gitignore`，所以剛 clone 下來時 `demo:sync` 是必要的，
否則這裡的依賴會找不到。改動 library 之後也要重跑才會生效。

## 它是怎麼接上的

`package.json` 裡是：

```json
"@seanhong1215/my-design-system": "file:../../seanhong1215-my-design-system-0.1.0.tgz"
```

> 正式環境改用 GitHub Packages 時，這行會變成一般的版本號（例如 `^0.1.0`），
> 並在專案根目錄放一個 `.npmrc` 指向 `https://npm.pkg.github.com`。

## 三個重點（都在 `src/App.tsx`）

**1. 樣式只匯入一次**

```tsx
import '@seanhong1215/my-design-system/styles.css'
```

**2. `ThemeProvider` 要加 `global`**

```tsx
<ThemeProvider global productLine={productLine} theme={theme}>
```

少了 `global`，它只包一層 `<div>`。而 `Modal` 是用 `createPortal` 掛到
`document.body`（在那層 div 外面），會吃不到品牌色與暗色表面。
頁面 `<body>` 的背景也需要 `global` 才會跟著切換。

**3. 你自己的樣式沿用同一套 token**

見 `src/product.css`。顏色不要寫死，一律用 `var(--color-*)`，
你的版面才會跟著主題走。常見對應：

| 用途 | token |
|---|---|
| 頁面底色 | `--color-bg` |
| 卡片 / 浮起的表面 | `--color-surface` |
| 凹陷區塊、表頭、停用態 | `--color-bg-subtle` |
| 主要文字 / 次要文字 | `--color-text` / `--color-text-muted` |
| 品牌色當**填底**或邊框 | `--color-primary` |
| 品牌色當**文字** | `--color-primary-text` |

## 表單

元件都支援 `forwardRef`，且 ref 指向內層的原生控制項，
所以 react-hook-form 的 `register()` 直接展開即可：

```tsx
<Input {...register('name', { required: '此欄必填' })} />
```

## 加一條自己的品牌線

不用改 library，在自己的 CSS 加一段就好：

```css
[data-product-line="yourbrand"] {
  --color-primary: #E11D48;
  --color-primary-hover: #BE123C;
  --color-success: #15803D;
  --color-danger: #B91C1C;
  --color-warning: #B45309;
  --radius-md: 8px;
  --radius-lg: 12px;
}
```

Alert / Tag / Badge 的彩色淺底會用 `color-mix()` 自動由品牌色與當前表面算出來，
不需要另外配色。

> 目前 `ProductLine` 的 TS 型別是固定的四個字串聯集，
> 要用自訂品牌線需要調整 library 的型別定義。

## 已知問題

`Select` 的 placeholder 目前無效：placeholder option 帶 `disabled`，
瀏覽器會跳過它自動選第一個真實選項，所以畫面顯示的是第一個選項而非 placeholder，
且 `required` 驗證永遠不會觸發。見 design system repo 的 `.docs/TODO.md`。
