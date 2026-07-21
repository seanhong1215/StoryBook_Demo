# Product A Demo

一個真實的消費端範例，示範同事實際會用的方式把
`@seanhong1215/my-design-system` 接進自己的產品 ——
**從 GitHub Packages 安裝**，不是連到這個 repo 的原始碼。

雖然放在 design system repo 內（`demo/product-a-demo`），但它是**獨立的專案**，
有自己的 `package.json`、`.npmrc` 與 `node_modules`。

## 跑起來

### 第一次：設定認證

跟任何同事一樣，你需要一個有 `read:packages` + `repo` 權限的 GitHub PAT。
完整步驟見 repo 根目錄的 `.docs/INTERNAL-ROLLOUT.md`，濃縮版：

1. <https://github.com/settings/tokens> 建立 classic token
2. 寫進你**個人**的 `~/.npmrc`（不是這個資料夾裡的）：
   ```
   //npm.pkg.github.com/:_authToken=<你的PAT>
   ```
3. 驗證：`npm whoami --registry=https://npm.pkg.github.com`

這個資料夾裡的 `.npmrc` 只指定 registry（`@seanhong1215:registry=...`），
不含 token，可以安心進版控。

### 啟動

```bash
cd demo/product-a-demo
npm install
npm run dev      # http://localhost:5173
```

## 它是怎麼接上的

`package.json` 裡是一般的版本號：

```json
"@seanhong1215/my-design-system": "^0.1.0"
```

跟同事會寫的完全一樣 —— 這就是本 demo 存在的意義：不只是「元件能不能組起來」，
而是「照著這份 README 的步驟，真的能在自己的專案裝起來用」。

## 維護者：想看當前（尚未發布的）改動

上面的流程裝的是 **registry 上的正式版本**。如果你在改 library 原始碼，
想立刻在這個 demo 看到效果，回到 repo 根目錄執行：

```bash
npm run demo:sync
```

這會打包當前原始碼，用 `npm install <tgz> --no-save` 覆蓋 `node_modules`
（但不改動這裡的 `package.json` —— 它必須繼續指向 registry 版本，
這樣才對同事誠實）。改完 library 要重跑才會生效。

第一次跑 `demo:sync` 前，這個資料夾必須先 `npm install` 過一次
（見上面「啟動」），`--no-save` 需要一個基底可以覆蓋。

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

`src/App.tsx` 的表單同時示範非同步送出、送出中鎖定，以及伺服器回傳的
欄位層級錯誤要怎麼對應回表單。

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
