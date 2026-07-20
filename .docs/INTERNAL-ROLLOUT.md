# 內部試用指南

> 對象：公司內部要在小型產品導入這套元件庫的同事。
> 目前階段：**內部試用**，尚未對外發布。

套件名稱：`@seanhong1215/my-design-system`
Repo：`github.com/seanhong1215/StoryBook_Demo`（**private**）

---

# Part 1 — 給使用的同事

## 前置條件

你需要 **StoryBook_Demo 這個 repo 的存取權**。沒有的話請先找維護者開通 ——
GitHub Packages 的私有套件會沿用 repo 權限，沒權限就裝不起來。

## 步驟 1：建立 Personal Access Token

網址：**https://github.com/settings/tokens**
（或：右上頭像 → Settings → 左側最底 Developer settings →
Personal access tokens → **Tokens (classic)**）

點 **Generate new token → Generate new token (classic)**，然後：

- **Note**：取個好認的名字，例如 `design-system-read`
- **Expiration**：建議 90 天
- **Select scopes**：勾 **`read:packages`** 和 **`repo`**

> **`repo` 這個 scope 不能省。** 本 repo 是 private，GitHub Packages 會去檢查
> 你對來源 repo 的存取權。少了 `repo` 會拿到 **`404 Not Found`** ——
> 注意它不是回權限錯誤，很容易被誤判成套件名打錯而查錯方向。

> 請用 **classic token**。fine-grained token 對 GitHub Packages 的 npm registry
> 支援仍不完整，容易出現難以診斷的失敗。

然後在終端機執行（把 `<你的PAT>` 換掉）：

```bash
npm config set //npm.pkg.github.com/:_authToken <你的PAT>
```

> **不要用 `npm login`。** npm 11 預設走瀏覽器 OAuth 流程，GitHub Packages
> 不支援，會卡在 `Username:` 提示動不了。

## 步驟 2：在你的專案指定 registry

在專案根目錄建立 `.npmrc`：

```
@seanhong1215:registry=https://npm.pkg.github.com
```

> 這個檔案**可以**進版控（裡面沒有 token）。token 在你個人的 `~/.npmrc`，
> 不要提交。

## 步驟 3：安裝

```bash
npm install @seanhong1215/my-design-system
```

peer dependency 是 React >= 18（React 19 也支援）。

## 步驟 4：接上去

```tsx
// 整個 app 只需要匯入一次樣式
import '@seanhong1215/my-design-system/styles.css'
import { ThemeProvider, Button, Card } from '@seanhong1215/my-design-system'

export default function App() {
  return (
    <ThemeProvider global productLine="commerce">
      <Card title="Hello">
        <Button>Click me</Button>
      </Card>
    </ThemeProvider>
  )
}
```

**`global` 這個 prop 不要漏掉。** 沒加的話它只包一層 `<div>`，而 `Modal` 是用
`createPortal` 掛在 `document.body`（在那層 div 外面），會吃不到主題；
頁面 `<body>` 的背景也不會跟著切換。

## 怎麼知道有哪些元件、怎麼用

因為 repo 是 private，**沒有公開的文件網站**（GitHub Pages 在免費/Pro 方案下
一律公開，不適合內部專用）。三種方式擇一：

| 方式 | 做法 | 適合 |
|---|---|---|
| **本機跑**（最推薦） | clone repo → `npm ci` → `npm run storybook` → http://localhost:6006 | 開發者，隨時查閱 |
| **下載打包好的** | repo → Actions → 最新一次成功的 run → 下載 `storybook-<sha>` artifact → 解壓後 `npx serve` | 不想 clone 的人 |
| **看實際範例** | `demo/product-a-demo` 是一個完整的消費端範例，它的 `README` 就是導入指南 | 想看真實用法 |

Storybook 右上角的 toolbar 可以切換 **Theme**（明/暗）與 **Product line**
（四條品牌線），所有元件都會即時跟著變。

## 回報問題

請開 GitHub Issue，並盡量附上：

1. 你用的版本（`npm ls @seanhong1215/my-design-system`）
2. 最小重現（哪個元件、什麼 props）
3. 預期 vs 實際

**特別歡迎這類回報**：某個元件在你的實際頁面裡不好用、API 不直覺、
少了某個你需要的 prop。內部試用的目的就是找出這些 ——
元件單獨看正常、組進真實產品才出問題的狀況很常見。

---

# Part 2 — 給維護者

## 發布一個版本

一次性設定。到 **https://github.com/settings/tokens** 建 classic token，
勾 **`write:packages`** 和 **`repo`**（勾 write 會自動含 read；
`repo` 是 private repo 必需，缺了會拿到 404）：

```bash
npm config set //npm.pkg.github.com/:_authToken <你的PAT>
```

驗證有沒有設對：

```bash
npm whoami --registry=https://npm.pkg.github.com
```

會印出你的 GitHub 帳號就表示認證正常。

發布：

```bash
npm version patch     # 或 minor / major
npm publish
git push --follow-tags
```

`prepublishOnly` 會自動先跑 build，所以不會出貨過期或空的 `dist/`
（`dist/` 沒有進版控，這道保險是必要的）。

## 內部試用期間的版本策略

- 停在 `0.x`。0.x 期間允許破壞性變更，但**要在 CHANGELOG 寫清楚**。
- 修 bug → `patch`；加元件或 prop → `minor`；
  改 class 名稱、移除 prop、改變預設行為 → 也用 `minor`（0.x 慣例），
  但要在發布通知裡明確標出。
- 對外發布前才升 `1.0.0`，那之後就要遵守 semver。

## 收到回報後的流程

1. 先在 `demo/product-a-demo` 重現 —— 那是最接近真實使用端的環境
2. 修完跑 `npm test`（92 個 story，a11y 強制通過）
3. `npm run demo:sync` 後再驗一次消費端
4. 發 patch 版，通知回報的人

## CI

`.github/workflows/ci.yml` 每次 push 到 `master` / `feature` 或開 PR 時跑：

- lint / typecheck / build
- `npm test` — 92 個 story 的 a11y 檢查（`a11y.test` 設為 `error`）
- build-storybook，並上傳成 artifact 供內部下載
- **consumer job**：把 library 打包後裝進 `demo/product-a-demo` 並 build，
  驗證 `files` / `exports` / `sideEffects` 設定正確 ——
  這類問題在 repo 內部怎麼測都測不出來

> private repo 的 Actions 分鐘數是計量的（免費方案每月 2,000 分鐘）。
> workflow 已設 `concurrency` 讓同分支的新 push 取消舊 run。

## 已知限制（試用時值得先講清楚）

- 元件數 20 個，缺 DatePicker / Upload / Menu / Layout 等
- `color-mix()` 需要 Chrome 111+ / Safari 16.2+ / Firefox 113+
- `ProductLine` 型別是固定四個字串聯集，自訂品牌線的 CSS 可以直接加，
  但 TS 型別需要放寬
- 淺色主題下 `--color-border` 對 `--color-surface` 只有 1.24:1，
  未達 WCAG 1.4.11 對「識別控制項所需邊界」的 3:1 要求（待決策，
  修它會動到整體視覺）
