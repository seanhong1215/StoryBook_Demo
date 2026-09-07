# 企業級設計系統升級 — 進度與待辦

> 完整計畫（含每階段細節）：`C:\Users\Administrator\.claude\plans\storybook-tidy-book.md`
> 最後更新：2026-09-07

---

## 現在的狀態（Phase 0–6 完成，0.2.0 已 tag，內部試用階段）

- `npm test` — **127 個 story 全過**（a11y 已設為 `error` 模式，含 26 個 play function）
- lint / typecheck / build / build-storybook 全綠
- `@seanhong1215/my-design-system@0.1.0` 在 GitHub Packages 上，
  已用全新專案從 registry 實測安裝成功
- **`v0.2.0` tag 已推送（2026-09-07）** —— `npm version minor` 的 preversion
  跑完整套 verify 才讓版本號動。但 **`publish.yml` 這條路徑是第一次真的執行**：
  在此之前這個 repo 一個 tag 都沒有，`0.1.0` 是手動 `npm publish` 上去的。
  **結果要到 Actions 頁確認**，registry 上有沒有 0.2.0 目前未經驗證
- commit 全數已推送到 `origin/feature`

**library 已跨過「可被 MVP 專案共用」的門檻**（Phase 1f 即達成，2–4 是加值），
且已經是同事實際能安裝使用的狀態。詳細安裝與試用步驟見 `.docs/INTERNAL-ROLLOUT.md`。

### 怎麼啟動

背景執行的 dev server 在 agent session 內留不住，請自己開終端機各跑一個
（都在 repo 根目錄執行）：

```bash
npm run storybook    # http://localhost:6006  右上 toolbar 可切 Theme / Product line
npm run demo:dev     # http://localhost:5173  消費端範例
```

**`demo/product-a-demo` 現在裝的是 registry 上的正式版本**（`^0.1.0`），
跟同事實際會用的接入方式完全一樣 —— 這是刻意的，demo 存在的意義就是
示範真實接入流程，見 `demo/product-a-demo/README.md`。

第一次跑之前，`demo/product-a-demo` 資料夾需要先 `npm install` 一次
（需要 GitHub Packages 認證，見 `.docs/INTERNAL-ROLLOUT.md`）。

如果你在改 library 原始碼，想立刻在 demo 看到效果（而不是等發布新版），
用：

```bash
npm run demo:sync    # build → pack → 用 --no-save 覆蓋 demo 的 node_modules
```

`--no-save` 是關鍵：只換掉 demo 實際跑的程式碼，**不會**把 demo 的
`package.json` 改回本地路徑 —— 那個檔案要繼續指向 registry 版本，
同事看到的才是正確的接入方式。

打包本身的正確性（`files` / `exports` / `sideEffects` / 型別解析）
改由 `npm run verify:pack` 驗證，它自建一個臨時消費端測試，跟 demo
完全解耦（demo 裝的是已發布版本，verify:pack 測的是當前原始碼）。

### 建議驗收清單

| 看什麼 | 在哪 | 預期 |
|---|---|---|
| 明暗 + 四條產品線 | Storybook toolbar | 全部元件都跟著變，無殘留白底 |
| token 明暗對照 | `Foundation/Tokens` → Colors / Semantic tones | 並排顯示實際計算值 |
| Select placeholder | `Data Entry/Select` → Placeholder / 預設值 | 未選取時停在 placeholder，required 會擋 |
| 表單 label 關聯 | `Data Entry/Form` | 點 label 會 focus 到控制項 |
| 真實產品情境 | 消費端範例 | 表單驗證、Modal 主題、產品線切換 |
| a11y 迴歸 | `npm test` | 92 passed |

### 已知的體驗瑕疵（不影響功能，未處理）

- Table 放在窄容器（如 350px 的卡片內）時會水平捲動，但**沒有捲動提示**，
  使用者可能不知道右邊還有欄位。`overflow-x: auto` 運作正常，非 bug。

---

## 等待使用者決定

原本掛在這裡的三項（`--color-border` 對比、`ProductLine` 型別、下一個 Phase）
都已經處理完，詳見下方各段。目前剩一件需要使用者動手，不是技術決策：

| # | 事項 | 說明 |
|---|---|---|
| 1 | 設定 `CHROMATIC_PROJECT_TOKEN` | 到 chromatic.com 建專案，把 token 存成 repo secret。在那之前 chromatic workflow 會自己安靜略過，因此這條路徑還沒實跑驗證過 |

~~發布到 GitHub Packages~~ — `0.1.0` 已在 registry 上；`0.2.0` 的 tag 已推，等 workflow 結果。

---

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
| 4 | ✅ 完成 | a11y 真正啟用 |
| 5 | ✅ 完成 | Interaction tests：26 個 play function，涵蓋 12 個有行為的元件 |
| 6 | ✅ 完成 | MDX 說明頁：Getting Started / Accessibility / Architecture |
| 7 | 🟡 部分 | CI + publish + chromatic workflow 都已建立；Pages 待對外發布階段 |
| — | ✅ 完成 | Showcase 互動化：新增可操作的營運主控台，其餘四頁補上說明牌 |

## 目前優先序：內部試用

使用者的目標是**先讓內部人員試用、沒問題才對外發布**，因此優先序與原本的
Phase 順序不同：

| 順序 | 事項 | 狀態 |
|---|---|---|
| 1 | 推送 commit 到 `origin/feature` | ✅ 已推送 |
| 2 | `ci.yml`（不含 Pages） | ✅ 已建立，含獨立的 pack 驗證 job |
| 3 | 內部試用指南 | ✅ `.docs/INTERNAL-ROLLOUT.md` |
| 4 | 發布 0.1.0 到 GitHub Packages | ✅ 已發布，已實測全新安裝成功 |
| 5 | demo 改用 registry 依賴，示範真實接入方式 | ✅ 見下方「demo 定位調整」 |
| 6 | 收內部回饋 → 修 → 0.1.x | ✅ 這批修完，收斂成 0.2.0 |
| 7 | 確認 `publish.yml` 首次執行的結果 | ⬜ **待確認**，見上方「現在的狀態」 |
| 8 | demo 升到 `^0.2.0` | ⬜ 卡在 7。`^0.1.0` 在 0.x 下等於 `<0.2.0`，demo 不會自己升上去 |

Phase 5（測試）與 6（MDX）在內部試用階段**不是必要的**，可往後放。

### demo 定位調整（2026-07-21）

`demo/product-a-demo` 原本裝的是本地打包的 `.tgz`，這在「demo 是維護者的
回歸驗證場」這個角色下沒問題，但跟「demo 示範同事怎麼接入」這個角色衝突 ——
同事照著 demo 的 `package.json` 學，會學到一個只存在於維護者電腦上的路徑。

調整後兩個角色分開：

- **demo** 現在裝 registry 版本（`^0.1.0` + `.npmrc`），`package.json` 就是
  同事接入時該長的樣子。維護者想在 demo 看到未發布的改動，用
  `npm run demo:sync`（`--no-save`，不弄髒 `package.json`）。
- **打包正確性驗證**（`files`/`exports`/`sideEffects`/型別）獨立成
  `npm run verify:pack`，自建臨時消費端測試當前原始碼，CI 的 pack job
  改呼叫它，不再依賴 demo 也不需要 registry 認證。

已驗證：全新安裝、`demo:sync` 不動 `package.json`、`demo:dev` 實際渲染
無誤（11 個卡片、0 個 page error）、`verify:pack` 全綠。

## 待辦細節

### Showcase 互動化（2026-09-07 完成）

原本五個 showcase 全是靜態版型 —— 好看，但看不出元件真的有行為，
面試官點進去只會看到一張圖。

新增 `00 可操作的營運主控台`，把有行為的元件串成一條真實流程：
Table（數值排序、分頁、跨頁列選取）→ 每列的操作選單 → Modal → Form 驗證
→ 成功提示，包在 `ConfigProvider productLine="commerce" locale={zhTW}` 底下。
頁首用 Alert 寫清楚用鍵盤怎麼走一遍（`Tab` → `↓` 開選單 → `Esc` 關閉並還原焦點）。

做的過程中發現兩個實際缺陷，各自獨立修掉：

- **`Dropdown` 只有圖示的觸發鈕沒有可存取的名字** → 新增 `label` prop。
  表格裡每列一個操作選單時還要各自命名（`` `${record.order} 的操作` ``），
  否則讀屏會唸出一整排一模一樣的按鈕
- **`Modal` 沒有遵守 `getPopupContainer`** —— `Tooltip` / `Dropdown` 都照
  `ConfigProvider` 指定的節點掛載，只有 `Modal` 寫死 `document.body`。
  非 global 模式下主題屬性只寫在 wrapper 上，對話框因此拿到 `<html>` 上的
  產品線色而不是所屬區塊的。**這是截圖才看得出來的 bug**：所有測試都是綠的，
  對比也沒問題，只是顏色不對

其餘四頁補上「說明牌」（`.showcase-note`）：產品線、這一頁在示範什麼、
用了哪些元件。刻意放在 `<main>` 外面且用等寬字，一眼就知道是註解不是版型。

> **為什麼不寫在 `parameters.docs.description`**：Showcase 沒有 `autodocs`
> tag，也設了 `docs: { page: null }`，根本不會產生 docs 頁 —— 寫在那裡的說明
> 不會渲染在任何地方。說明只能寫進畫面本身。

### 封面改用真元件重做（2026-09-07 完成）

原本的 `01 Cover 首頁` 是一張 PNG。問題不是「不好看」，是**圖裡畫的東西跟真的
元件對不起來** —— 畫的 Button 是藍色圓角、Badge 是膠囊、Tokens 是六個彩色圓點，
點進 02 之後主色變青色、Badge 是方角。對一個賣點是一致性的元件庫來說，
封面自己先不一致，比沒有封面糟。

新封面全部用真元件（Button 四種 variant、Input allowClear、Select、Card、
Badge、Tag、Icon），色票用 `getComputedStyle` 讀實際計算值。

兩個實作決定：

- **不包 `ThemeProvider`** —— 其他四頁各自釘死一條產品線（那是它們的重點：
  同一批元件換品牌），封面反過來跟著工具列走。「切一下全部跟著變」變成看的人
  自己按出來的，不是文案聲稱的
- **色票用 MutationObserver 盯 `<html>` 的屬性**，不是靠 React 重繪。
  ThemeProvider 的 global 模式只改 documentElement 的屬性，元件不一定會重繪，
  沒有 observer 的話十六進位數字會停在舊值

原本的 PNG 移到 README 當專案封面 —— 在那裡它是行銷素材，很合理。

**axe 抓到的**：說明牌的產品線標籤原本用 `--color-primary`，core 的 `#0066FF`
對那塊底只有 4.04:1，11px 粗體要 4.5:1。前四頁都釘死較深的品牌色所以沒踩到，
封面跟著工具列走才暴露出來。`--color-primary-text` 在淺色下 mix 是 100%
（等於沒混）也不夠，最後用 `--tone-info-text`。
**教訓：`--color-primary` 是填色用的，拿來當文字要用 `--tone-*-text`。**

### MDX 說明頁（2026-09-06 完成）

三頁，各自回答一個問題：

- **Getting Started** —— 怎麼裝、怎麼接。含 GitHub Packages 的認證設定
  （classic PAT 要勾 `repo`，缺了會拿到 404 而不是權限錯誤）、ConfigProvider
  的四個 prop、自訂產品線只覆寫品牌層
- **Accessibility** —— **library 保證什麼 vs 使用端要自己做什麼**。前者自動化
  測得到（axe error 模式 + 26 個 play function + Chromatic），後者測不到：
  `Switch` / `Select` 的無障礙名稱、多個 `Pagination` 各自命名、圖示按鈕的
  `aria-label`。也誠實列出限制（沒有虛擬捲動、`Select` 做不到多選、沒有 RTL）
- **Architecture** —— 共用行為層、token 三層、Form 的值為什麼不放 context、
  打包為什麼要 preserveModules，以及「刻意沒做」的四件事與理由

**踩到的坑**：MDX v3 預設不吃 GFM 表格，說明頁裡的表格會被原封不動印成一串
pipe 符號 —— 而 `build-storybook` 完全不會報錯，只有實際打開頁面才看得到。
裝了 `remark-gfm` 並掛進 `@storybook/addon-docs` 的 `mdxCompileOptions`。

順帶移除過期的 `Components/Usage` 頁：內容還在講「未發布、用 npm pack 安裝」，
套件名也是舊的未 scoped 名稱，照著做會失敗。

### 打包顆粒度：讓 tree-shaking 真的有效（2026-09-06 完成）

**先量再改**：改之前寫了個臨時消費端實測，「只 import 一個 Button」的產物是
**41 kB**，裡面完整包含 Table / Modal / Form 的程式碼。原因是 lib 模式把所有
東西壓成單一檔案，而每個元件都是 `const X = forwardRef(...)` 這種頂層呼叫 ——
Rollup 無法證明它沒有副作用，只好整段保留。

- ES 產物改用 `preserveModules`，一個模組一支檔案；UMD 維持單檔打包，
  因此 `npm run build` 拆成兩趟（`vite build && vite build --mode umd`）
- `src/index.ts` 拿掉逐元件的 CSS import，只留 tokens —— CSS 在 `sideEffects`
  裡標成有副作用，從 entry 無條件 import 就註定搖不掉
- Vite lib 模式會抽出 CSS 但**同時把 JS 裡的 import 拿掉**，產物中沒有任何模組
  引用那些 CSS。加了一個 20 行的 plugin 在 `generateBundle` 把關聯補回去，
  「用到哪個元件才載入哪支樣式」才真的成立

實測結果（react 已 external）：

| | JS | CSS |
|---|---|---|
| 只 import Button（改前） | 41.13 kB | 30.85 kB（且要手動 import 全部） |
| 只 import Button（改後） | **1.38 kB** | **2.12 kB**（自動帶入） |
| import 全部 | 44.74 kB | 30.16 kB |

`npm run measure:bundle` 把這個量測固定下來，只 import 一個元件卻超過全部的
50% 就讓 CI 失敗 —— 這種退步不會有任何測試抓得到，只能用量的。

**已知的外觀瑕疵**：產物裡是 `Button2.js` 而不是 `Button.js`。同一層的
`Button.tsx` 與 `Button.css` 都被登記成名為 "Button" 的 chunk，後者讓前者被改名。
純粹是命名重複、不影響解析（消費端走 exports 與相對 import），不值得為此把
22 支 CSS 改名。

### 高對比模式與邊界對比（2026-09-06 完成）

**高對比（強制色彩）模式**：兩個系統性問題，完整說明寫在 `tokens.css` 結尾。

- `box-shadow` 在強制色彩下**完全不會被繪製**。整個 library 的焦點框都是
  `--shadow-focus`（box-shadow）做的，等於高對比模式下沒有任何焦點指示 ——
  每個焦點樣式都補了一份 `outline` 版本
- 靠底色表達的狀態（checkbox 勾選、switch 開啟、選中的分頁、目前頁碼、
  選單 hover）在強制色彩下背景會被系統色蓋掉，全部改用系統色關鍵字
- Modal 的半透明遮罩會被塗成不透明（底下內容整個看不見），面板也只靠陰影與
  底色跟頁面區隔 —— 兩者都補了處理

**邊界對比**（原本掛在「等待使用者決定」）：新增 `--color-border-strong`
（淺色 `#898F99` = 3.25:1、暗色 `#5B6980` = 3.10:1），只套用在 Input / Select /
Textarea / Checkbox / secondary Button / 頁碼按鈕。**刻意不把 `--color-border`
整個加深** —— WCAG 1.4.11 要求的是「識別控制項所需的邊界」，表格分隔線與 Card
外框這類裝飾線條不在範圍內，一起加深會讓整個介面變重。

順帶補齊 Button / Pagination 頁碼 / Table 排序鈕的 `:focus-visible`
（原本靠瀏覽器預設 outline，與其他元件不一致），以及放寬 `ProductLine` 型別。

### 互動測試補齊（2026-09-06 完成）

原本只有 render + axe 的元件補上行為測試，26 個 play function 涵蓋 12 個元件：

- Checkbox：切換、`indeterminate` 是 DOM property 而非屬性、disabled 不切換
- Switch：點擊與 Space 切換、disabled 不切換
- Alert：closable 觸發 onClose，且**不會自己消失**（要不要移除由使用端決定）
- Pagination：第一頁停用「上一頁」、點頁碼送出正確頁數、點目前這頁不重複觸發
- Select：placeholder 未選取時 value 為空字串（`required` 才擋得下來）、
  選取送出 onChange、disabled 選項選不動

順帶把 Switch 補上 `role="switch"` —— 原本是原生 checkbox，讀屏會唸成
「核取方塊，已勾選」而不是「切換開關，開啟」。

剩下沒有 play function 的是純展示元件（Badge / Tag / Card / Space / Empty /
Textarea / Button），render + axe 對它們是恰當的覆蓋層級。

### Form 重寫（2026-09-06 完成）

三個問題一次處理：只在 submit 驗證、沒有 form instance、每次按鍵全表單重繪。

- **值移出 React state**：改用外部 store + 逐欄位訂閱（`useSyncExternalStore`），
  context 只帶 store（identity 永不變）與設定。打字時只有那一個欄位重繪 ——
  `IsolatedRerenders` story 用 render 計數把這件事變成可測的斷言
- **`Form.useForm()`**：`getFieldsValue` / `setFieldsValue` / `resetFields` /
  `validateFields` / `submit`。`submit()` 走原生 `requestSubmit()`，
  跟使用者按按鈕是同一條路徑，不會出現「按鈕可以但程式呼叫不行」的差異
- **`validateTrigger`**：`onSubmit`（預設）/ `onBlur` / `onChange`。另外不需設定就
  生效的一條：已經出錯的欄位改動時立刻重驗，使用者修好就馬上看到錯誤消失

**寫出來的 bug 與抓到的既有缺陷各一**：

1. 我把送出寫成 `onFinish?.(await store.validateFields())` —— `a?.(b)` 在 `a` 是
   nullish 時**整個運算式短路，參數不會被求值**，因此沒傳 `onFinish` 的表單
   完全跳過驗證。測試一致失敗、加了 console.log 就一致通過（log 改變了時序），
   查了幾輪才定位到是語言語義而不是時序
2. 錯誤訊息用 `--color-danger` 當文字，對白底只有 3.76:1 未達 AA。這是既有缺陷，
   之前沒有任何 story 會真的顯示驗證錯誤，axe 一直掃不到。改用 `--tone-danger-text`

### Tabs 補齊 WAI-ARIA（2026-09-06 完成）

原本只有 `role="tab"` 與 `aria-selected`，其餘都缺：

- 方向鍵 / `Home` / `End` 切換，跳過停用中的分頁；採自動啟動
  （APG 建議面板內容不昂貴時用這種模式，不必按完方向鍵再按 Enter）
- roving tabindex：整組分頁只佔一個 tab stop，而不是每個分頁都要按一次 Tab
- 補上 `id` / `aria-controls` / `aria-labelledby`，讓 tab 與 tabpanel 互相關聯；
  `aria-controls` 只在選中時給（只有選中的面板會被渲染，指向不存在的 id 會被 axe 判違規）
- 面板補 `tabIndex={0}`，內容可捲動時鍵盤使用者才到得了
- 修掉 `activeKey || internalActiveKey`：key 為空字串的分頁永遠選不起來，改用 `??`
- 新增 `label` 設定分頁列的無障礙名稱，並補上 tab 與 panel 的 `:focus-visible`

### ConfigProvider 與 i18n（2026-09-05 完成）

`'OK'` / `'Cancel'` / `'No data'` / `'Previous'` / `'Next'` / `'Select all rows'`
這些字串原本寫死在元件裡，內部產品線要中文化只能每個使用端逐一傳 prop。

- 新增 `ConfigProvider`（語系 + 主題 + 產品線 + `getPopupContainer`），
  內建 `en` 與 `zhTW` 兩個語系包
- **`ThemeProvider` 保留為薄包裝**，內部委派給 `ConfigProvider`，既有使用端與
  demo 完全不用改。名稱與職責分開：主題歸主題，全域設定歸 ConfigProvider
- 巢狀時只覆寫有傳的項目（內層只換產品線，語系從外層繼承）；沒包 provider
  時 fallback 到 `en`，大部分 story 因此不用改
- 帶數值的文案用函式不用字串樣板 ——「共 6 筆」與「6 items」語序不同，
  沒辦法用同一個 `{n} xxx` 模板表達
- `getPopupContainer` 接進 Tooltip / Dropdown（usePopup 當初預留的 `container`
  選項現在有出口了）

**測試順手抓到一個真的缺陷**：`NestedProviders` story 放了兩個 Pagination，
axe 判 `landmark-unique` —— 兩個 `<nav>` 同名，以 landmark 導覽時分不出來。
這是同一頁上下各放一個分頁時會踩到的實際情況，因此補了 `Pagination` 的
`label` prop。另外頁碼按鈕補上 `aria-label`（原本讀屏只唸得到孤零零的「3」）。

### 發布流程與視覺回歸（2026-09-05 完成）

**發布流程**：`prepublishOnly` 原本只跑 `build` —— lint、typecheck、測試綠不綠
都不影響，一個測試壞掉的版本照樣發得到 registry 上給同事裝。

- 新增 `verify` script（lint + typecheck + test + build），`prepublishOnly` 與
  `preversion` 都指向它：不論從筆電 `npm publish` 還是 `npm version` 開版，
  都過同一道關
- `.github/workflows/publish.yml`：推 `v*` tag 才發布，會擋下 tag 與
  `package.json` 版本不一致，跑完 `verify` 與 `verify:pack` 才 publish。
  綁 tag 而不是分支，避免 push 到 master 就意外發版
- `CHANGELOG.md`（Keep a Changelog）。兩處會改變既有行為的變更明確標在
  Changed：Table `sorter: true` 的排序結果、Tooltip 的 DOM 結構

**視覺回歸**：`.github/workflows/chromatic.yml`。axe 驗得到無障礙違規，
驗不到顏色跑掉 —— 而這個 repo 最容易無聲壞掉的正是 token（表面層只由
`[data-theme]` 覆寫，改一行可能只在暗色下失效，測試照樣全綠）。

- 每個 story 快照淺色與暗色兩次（`parameters.chromatic.modes`）
- 產品線不進 modes：快照數會變 4 倍、超出免費額度，改品牌色時手動確認
- 有差異不讓 CI 變紅（`exitZeroOnChanges`），合併回 master 收為新基準
- 沒設定 token 時整個 workflow 安靜略過，CI 不會一路紅著

**還需要你做一次**：到 chromatic.com 建專案，把 token 存成 repo secret
`CHROMATIC_PROJECT_TOKEN`。在那之前 chromatic workflow 會自己跳過，
因此這條路徑我沒辦法在本地實跑驗證。

### Input allowClear 修正（2026-09-05 完成）

原本清除鈕呼叫的是 `onChange({ target: { value: '' } })` —— 一個造出來的假事件。
兩個後果：`target` 不是真的 DOM 節點，`name` / `validity` / `form` 全拿不到，
react-hook-form 的 `register()` 會壞；而且非受控時輸入框裡的字根本不會消失
（React 沒收到真的變更，DOM 也沒被改）。

- 改成用 `HTMLInputElement.prototype` 上的 value setter 寫進真的 DOM，再
  `dispatchEvent(new Event('input', { bubbles: true }))`。**必須繞過節點上的
  setter** —— React 覆寫過它，直接 `input.value = ''` 會連 React 的 value tracker
  一起更新，React 判定「值沒變」就不會觸發 `onChange`
- 清除鈕的顯示條件原本是 `allowClear && value`，非受控時 `value` 永遠 undefined，
  按鈕永遠不出現。改成自己記一份「目前有沒有值」
- 清完把焦點還給輸入框；`clearLabel` 可自訂（為之後的 i18n 留路）
- 兩個 play function：非受控（清空 + 按鈕收起 + 焦點）與受控（斷言
  `event.target.name` 真的拿得到）

### Table 排序 / 分頁修正（2026-09-05 完成）

三件事，前兩件是實錯：

- **`sorter: true` 的數字排序**：原本一律 `String().localeCompare()`，數字欄位會排成
  1, 10, 2。改成依型別分流（number / boolean / Date / 字串），字串再開 `numeric`
  選項，`ORD-2` 才會排在 `ORD-10` 前面；空值視為最小
- **資料變少時頁碼沒夾回範圍**：停在第 3 頁時上層把資料篩到 2 筆，`slice` 取到空陣列，
  畫面變成一張空表格。改成 render 時就把頁碼夾進 `[1, totalPages]`，不用多一次 effect 重繪
- **開放受控與 `manual` 模式**：新增 `sort` / `defaultSort` / `pagination.current` /
  `pagination.total` / `onChange(pagination, sort)`，以及 `manual` —— 開啟後 Table
  不排序也不切片，只回報使用者要求的狀態，由外部去後端取那一頁。這是「能不能用在
  真實專案」的分水嶺，之前只能吃本地假資料

順帶：`loading` 時補上 `aria-busy` 與 `role="status"`（原本讀屏使用者不知道正在載入），
換排序時頁碼回到第 1 頁（留在第 3 頁看到的是完全不同的資料）。

### Modal focus trap / useFocusTrap（2026-09-05 完成）

Modal 原本只有 `aria-modal="true"` —— 那只是給輔助技術的宣告，**不會真的擋住
Tab**，焦點會直接跑到對話框後面的頁面，鍵盤使用者會在看不見焦點的情況下操作背景。

- 新增 `src/hooks/useFocusTrap.ts`：開啟時把焦點移入容器、Tab / Shift+Tab 在
  容器內循環、關閉時還原到開啟前的元素
- 容器帶 `tabIndex={-1}` 時優先聚焦容器本身，螢幕閱讀器才會先朗讀對話框名稱，
  而不是劈頭念第一個按鈕
- 順手修掉 Modal 寫死的 `id="modal-title"`（同頁兩個 Modal 會產生重複 id），改用 `useId()`
- 抽出 `src/hooks/focusable.ts`（可 focus 元素的判斷，Tooltip 與 trap 共用）與
  `useIsomorphicLayoutEffect.ts`，usePopup 與 Tooltip 一併改用

可 focus 清單用 `getClientRects().length > 0` 過濾看不見的元素：它們仍符合選擇器，
但 `focus()` 對它們無效，留著會讓 Tab 循環卡在一個看不見的元素上。

### Icon 元件（2026-09-05 完成）

Modal / Alert / Input 的關閉鈕原本是字元 `"x"`、Table 排序指示器是文字
`"up"` / `"down"` / `"sort"`、Alert 的語意圖示只是一個 8px 色點 —— 這是唯一
不用讀程式碼就會被看出來的粗糙處。

- 13 個內建線條圖示，統一 24×24 grid / 2px stroke / 圓角端點；用
  `currentColor` + `1em`，跟著周圍文字的顏色與字級走，因此沒有顏色 prop
- 刻意不做完整圖示庫：只收元件自己用得到的，加上 search / check / chevron
  四向這類通用款
- 預設 `aria-hidden`（旁邊通常已有文字，或按鈕自帶 `aria-label`）；
  傳 `aria-label` 時自動切成 `role="img"`
- 順帶補上純圖示按鈕的 `:focus-visible` 焦點框 —— 沒有文字當視覺錨點時更需要
- `spin` 在 `prefers-reduced-motion` 下放慢而非停止（停住的轉圈看起來像壞掉）
- story 用 `Record<IconName, string>` 列清單，少一個就編譯不過，不會脫節

### 浮層共用層 `usePopup`（2026-09-05 完成）

Tooltip 與 Dropdown 原本各自用 `position: absolute` + CSS 方向 class 硬寫位置，
沒有邊界偵測，而且會被父層 `overflow: hidden` 裁掉。抽成
`src/hooks/usePopup.ts`（約 230 行、零外部相依）統一處理：

- **定位**：flip（偏好方向放不下且對向放得下才翻面）+ shift（沿交叉軸夾回視窗內），
  `position: fixed` + scroll(capture)/resize/ResizeObserver 重算
- **portal**：掛到 `document.body`，容器可由 `container` 選項覆寫（之後接 ConfigProvider）
- **關閉時機**：點擊外部（pointerdown）、Escape；監聽器只在開啟時掛上
- 新增 `--z-modal` / `--z-dropdown` / `--z-tooltip` token，數值與 Ant Design 對齊；
  Modal 的寫死 `z-index: 1000` 一併改用 token

元件層順帶修掉的缺陷：

- **Dropdown** 補完鍵盤操作（ArrowDown/Up 開啟與移動、Home/End、Escape/Tab 關閉並
  還原焦點、跳過 disabled 項、roving tabindex），新增受控 `open` / `defaultOpen`
- **Tooltip** 改成開啟時才掛 `aria-describedby`（指向不存在的 id 會被 axe 判違規），
  並移除「wrapper 恆為 tabIndex=0」造成的雙 tab stop —— 改成偵測 children 有無可
  focus 元素再決定。移除 `white-space: nowrap`（它讓 `max-width` 失效，長字會衝出泡泡）

**踩到的坑**：浮層首次 render 還量不到尺寸，原本用 `visibility: hidden` 佔位，
但 `visibility: hidden` 的子元素**無法被 `focus()`** —— Dropdown 開啟時要立刻把焦點
送進選單，那個時間點座標還沒回填，焦點會靜靜地失敗（測試抓到，畫面上看不出來）。
改用 `opacity: 0` + `pointer-events: none`。

驗證：99 tests passed、lint/typecheck/build/build-storybook 全綠；
另用瀏覽器實測選單確實 portal 到 body 且未被 `overflow: hidden` 容器裁切、
Tooltip 在視窗上緣自動由 top 翻到 bottom 並夾回視窗內。


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

**發布前需使用者操作**（完整步驟見 `.docs/INTERNAL-ROLLOUT.md`）：
建 classic PAT，勾 `write:packages` + **`repo`**
（`repo` 是 private repo 必需，缺了會拿到 **404** 而非權限錯誤，極易誤判），
再寫入個人 `~/.npmrc`：`//npm.pkg.github.com/:_authToken=<PAT>`。

- **不要在指令列貼 token** —— 會進入 shell 歷史，失敗時還會被寫進
  `%LOCALAPPDATA%\npm-cache\_logs\` 的除錯日誌
- **不要用 `npm login`** —— npm 11 預設走瀏覽器 OAuth，GitHub Packages 不支援，
  會卡在 `Username:` 提示
- 驗證：`npm whoami --registry=https://npm.pkg.github.com`

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

### Phase 4 — a11y 啟用（已完成）

`addon-a11y` 已註冊，`preview.tsx` 的 `a11y.test` 從 `'todo'` 轉為 `'error'`。
`npm test`（= `vitest --project=storybook run`）目前 **92 個 story 全過**。

修掉的元件真 bug：

| 元件 | 問題 | 修法 |
|---|---|---|
| Table | `aria-sort` 放在 `<button>` 上 | ARIA 規定它屬於 columnheader，移到 `<th>`；排序指示符加 `aria-hidden` |
| Form / FormItem | 渲染了 `<label>` 卻沒關聯控制項 | 用 `useId` 產生 id，補 `htmlFor`；並加 `aria-invalid` 與指向錯誤訊息的 `aria-describedby`（錯誤訊息加 `role="alert"`） |
| Card | 標題寫死 `<h3>`，跟在 h1 後就跳級 | 新增 `titleAs` prop，預設仍是 `h3` |
| Tabs | disabled 用 `--color-border` 當文字色（1.18:1，看不見） | 改用 `--color-text-muted` + `--opacity-disabled` |
| Button | disabled 寫死 `opacity: 0.4` | 改用 `--opacity-disabled` token（該 token 原本定義了卻沒人用） |

修掉的 story 錯誤示範（story 本身就是文件，寫錯等於教錯）：
Dropdown 的 `trigger` 塞了 `<Button>` 造成按鈕包按鈕；Select / Textarea / Switch
缺少可及名稱；Showcase 的表單控制項缺 `aria-label`。

品牌色對比（Phase 3 掃描留下的）依決議採「另立只給填底用的加深變體」：
新增 `--color-success-solid` / `--color-danger-solid`（及對應 hover），
用腳本算出讓四條產品線都過 AA 的最小加深比例（success 70%、danger 85%）。
**刻意不動 `--color-success` / `--color-danger` 本身** —— 它們還被 `tone-*`
用 color-mix 混出 Tag / Badge / Alert 的淺底。
按鈕 hover 也從 `opacity: 0.85` 改為更深的實色，避免透明度稀釋剛拉起來的對比。

> **踩到的坑**：自己寫的 axe 掃描腳本只跑 `wcag2a/2aa/21a/21aa` 標籤，
> 會漏掉 best-practice 規則。addon-a11y 跑的是完整規則集，多抓到 3 個
> `heading-order`。要驗 a11y 請用 `npm test`，不要只信自訂腳本。

仍未處理（需要動到整體視覺設計，留待與使用者確認）：
`--color-border` 對 `--color-surface` 在淺色下只有 1.24:1，
WCAG 1.4.11 對「識別控制項所需的邊界」要求 3:1。修它要把所有邊框大幅加深。

### Phase 5 — Interaction tests

> 前置條件已在 Phase 4 完成：`test` 與 `test-storybook` script 都已加好，
> vitest + playwright + addon-vitest 可正常運作（`npm test` 目前 92 passed）。
> 現在跑的只有 a11y 檢查，**還沒有任何 play function**。

- 統一從 `storybook/test` import `expect/fn/userEvent/within/waitFor`；callback args 用 `fn()` spy
- P0：Modal（portal 用 `within(document.body)`！）、Dropdown、Form、Tabs、Pagination、Select
- P1：Checkbox/Switch、Input/Textarea、Tooltip（hover+focus）、Button（disabled/loading 不觸發）
- 坑：React 19 + browser mode 斷言用 `waitFor`/`findBy*` 避免 flaky
- 建議優先補的回歸案例（都是實際踩過的雷）：
  - Select 未選取時 value 為空、required 會擋（Phase 4 修的缺陷）
  - FormItem 的 label 點擊會 focus 到控制項（Phase 4 修的缺陷）
  - Modal 開啟時主題屬性在 `documentElement` 上（ThemeProvider global）

### Phase 6 — MDX 使用指南
- main.ts glob 加 `'../src/docs/**/*.mdx'`、`'../src/components/**/*.mdx'`
- 共通頁：Introduction / GettingStarted / Theming / Contributing
- Do/Don't 六個：Button、Modal、Form、Select vs Dropdown、Table、Alert
- 文件專用 `DoDont` 元件（`src/docs/components/DoDont.tsx`，不進 library export）
- 更新 `storySort` 把 docs 頁排最前

### Phase 7 — CI/CD

> **repo 是 private，這改變了原本的規劃。**
> GitHub Pages 在免費/Pro 方案下一律公開，不能用來做「只給內部看」的文件站。
> 已改為把 `storybook-static` 上傳成 Actions artifact —— 下載權限直接沿用
> GitHub 的 repo 存取控制。`deploy-pages.yml` 要等**對外發布**階段再做。

- [x] `ci.yml` 已建立：lint / typecheck / build / `npm test` / build-storybook
      → 上傳 Storybook artifact；另有 **pack job** 呼叫 `npm run verify:pack`，
      自建臨時消費端驗證 `files`/`exports`/`sideEffects`/型別解析
      （這類問題在 repo 內部測不出來）。原本這一步是裝進
      `demo/product-a-demo` 並 build，後來 demo 改裝 registry 版本
      （示範同事真實接入方式）後與此驗證解耦，見上方「demo 定位調整」
- [x] 設 `concurrency` 取消同分支的舊 run —— private repo 的 Actions 分鐘數計量
- [ ] `deploy-pages.yml`：**對外發布階段才做**；屆時 repo Settings > Pages
      source 改 "GitHub Actions"，並刪掉 `scripts/deploy-storybook.ps1` 與 `deploy` script
- 舊規劃保留備查：
- `chromatic.yml`：`chromaui/action@latest` + `fetch-depth: 0` + `onlyChanged: true`；**需先到 chromatic.com 建專案，token 存 repo secret `CHROMATIC_PROJECT_TOKEN`**（要使用者操作）
- Chromatic 額度：只對 Showcase + 6 個重點元件 default story 加 dark `modes`，其餘 light-only
- `deploy-pages.yml`：`upload-pages-artifact` + `deploy-pages`；repo Settings > Pages source 改 "GitHub Actions"；之後刪 `scripts/deploy-storybook.ps1` 與 `deploy` script
- **Chromatic baseline 務必等 Phase 2/4 視覺定型後才建立**

## 由消費端範例 `demo/product-a-demo` 實測發現的缺陷

- ~~**`Select` 的 placeholder 無效**~~ — 已修正。
  原因：placeholder option 帶 `disabled`，瀏覽器會跳過它自動選第一個真實選項。
  後果不只是 placeholder 不顯示 —— 非受控用法下 value 永遠非空，
  **`required` 驗證（原生與 react-hook-form）永遠不會觸發**。
  修法：非受控且有 placeholder 時給 select `defaultValue=""`，
  placeholder option 加 `hidden`；受控與非受控分開展開，避免同時傳
  `value` 與 `defaultValue` 觸發 React 警告。
  已加 `Select / Placeholder 預設值` story 釘住此行為。

  > 這類「元件單看正常、組成真實表單才會爆」的缺陷，靠 Storybook 看不出來。
  > 保留 `demo/product-a-demo` 當作真實消費端的迴歸驗證場。

## 收尾雜項
- [x] 更新 `AGENTS.md` 與 `README.md`（原本仍寫 src/index.js、.jsx、src/stories 等舊狀態）— Phase 1f 已處理
- [ ] `vite.config.ts` 的 `storybookNonAsciiPathFix` workaround：上游修復（storybookjs/storybook#33700）後可移除

## 驗證方法備忘（之後要重複做的話）

- **a11y 一律用 `npm test`**，不要只信自己寫的 axe 腳本。
  自訂腳本若只跑 `wcag2a/2aa/21a/21aa` 標籤會漏掉 best-practice 規則
  （Phase 4 就因此漏掉 3 個 `heading-order`）。addon-a11y 跑的是完整規則集。
- **顏色對比**目前沒有被 `npm test` 涵蓋（axe 只在單一主題下檢查實際渲染）。
  Phase 2/3 是用 Playwright 自寫腳本掃「4 產品線 × 2 主題」的 token 組合，
  以及「所有 story × 2 主題」的實際渲染節點。改動 token 後值得重跑一次。
- **元件單看正常不代表可用**：Select 的 required 缺陷是組成真實表單才爆的。
  保留 `demo/product-a-demo` 當真實消費端的迴歸驗證場。
- 消費端驗收涵蓋：型別解析、CSS 實際套用、CSS 隔離（注入衝突 class）、
  react-hook-form 綁定、required 驗證、Modal portal 主題、四產品線切換、
  暗色、消費端頁面 axe、console error。

## 已知環境注意事項
- 本機路徑含中文會踩 addon-vitest 的 "No test suite found" bug，`vite.config.ts` 已有 workaround（CI 不受影響）
- 首次在新環境跑測試需 `npx playwright install chromium`
- git identity 已設在 repo local（bennyhong / seanhong1215@gmail.com）
- **agent session 內的背景 dev server 留不住**（會被環境回收），
  要看畫面請自己開終端機跑；用 `--strictPort` 避免撞埠時默默換號
- 消費端範例位置：`demo/product-a-demo`（在本 repo 內，有進 git；它裝的是打包後的 .tgz，見 `npm run demo:sync`）
