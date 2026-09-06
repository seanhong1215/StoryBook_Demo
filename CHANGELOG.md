# Changelog

本檔遵循 [Keep a Changelog](https://keepachangelog.com/zh-TW/1.1.0/)，
版本號遵循 [Semantic Versioning](https://semver.org/lang/zh-TW/)。

> **1.0.0 之前**：API 仍在依內部試用回饋調整。破壞性變更會落在 minor
> （`0.x.0`），修正落在 patch（`0.x.y`），每一項都會列在下面的 **Changed**。

## [Unreleased]

下一版預計為 `0.2.0`：有新功能，也有兩處會改變既有行為。

### Added

- **`ConfigProvider`**：全域設定（語系、主題、產品線、浮層容器）。內建 `en`
  與 `zhTW` 兩個語系包，元件自己渲染的文案與無障礙標籤都跟著走；使用端傳的
  prop 一律優先，locale 只是預設值。沒包 provider 時 fallback 到 `en`。
- **`Switch` 的 `role="switch"`**：原本是原生 checkbox，讀屏會唸成
  「核取方塊，已勾選」；現在會唸成「切換開關，開啟」。
- **`Form.useForm()`**：回傳表單實例，可從表單外讀值、寫值、重設、觸發驗證與
  送出（`getFieldsValue` / `setFieldsValue` / `resetFields` / `validateFields` /
  `submit`）。`submit()` 走原生 `requestSubmit()`，與使用者按送出鈕是同一條路徑。
- **`Form` 的 `validateTrigger`**：`onSubmit`（預設）/ `onBlur` / `onChange`，
  可在表單層設定或由個別 `Form.Item` 覆寫。已經出錯的欄位改動時一律立刻重驗。
- **`Tabs` 鍵盤操作**：方向鍵切換分頁（自動啟動）、`Home` / `End` 跳到頭尾、
  跳過停用中的分頁，並採 roving tabindex。新增 `label` 設定分頁列的無障礙名稱。
- **`Pagination` 的 `label`**：同一頁有多個分頁時各自命名，否則以 landmark
  導覽時分不出來。
- **`Icon`**：13 個內建線條圖示，統一 24×24 grid 與 2px stroke，用
  `currentColor` + `1em`，跟著周圍文字的顏色與字級走。
- **`Modal` focus trap**：開啟時焦點移入面板、`Tab` / `Shift+Tab` 在面板內
  循環、關閉時還原到開啟前的元素。
- **`Table` 受控與 `manual` 模式**：新增 `sort`、`defaultSort`、
  `pagination.current`、`pagination.total`、`onChange(pagination, sort)`，
  以及 `manual` —— 開啟後不排序也不切片，可直接接後端分頁與後端排序。
- **`Dropdown` 鍵盤操作**：方向鍵、`Home` / `End`、`Escape` / `Tab` 關閉並
  還原焦點，並新增受控的 `open` / `defaultOpen`。
- **`Tooltip` 新 props**：`open`、`defaultOpen`、`mouseEnterDelay`、
  `mouseLeaveDelay`、`onOpenChange`。
- **`Input` 的 `clearLabel`**：清除鈕的無障礙文案不再寫死。
- **z-index token**：`--z-modal` / `--z-dropdown` / `--z-tooltip`。

### Fixed

- **`Table` 的 `sorter: true` 數字排序**：原本一律以字串比較，數字欄位會排成
  1, 10, 2。
- **`Table` 頁碼越界**：停在最後一頁時資料被篩少，會顯示一張空表格。
- **`Input` 的 `allowClear`**：原本送出的是造出來的假事件，`event.target` 不是
  真的 DOM 節點（react-hook-form 會壞），且非受控時輸入框根本不會清空。
- **`Tooltip`**：長內容會衝出泡泡（`white-space: nowrap` 讓 `max-width` 失效）、
  可 focus 的 children 會產生兩個 tab stop、`aria-describedby` 沒有掛在真正被
  focus 的元素上。
- **`Tooltip` / `Dropdown` 被裁切**：浮層改走 portal，不再被父層的
  `overflow: hidden` 切掉，並會在空間不足時自動翻面。
- **表單錯誤訊息的對比度**：原本直接用 `--color-danger`（#EF4444 對白底只有
  3.76:1，未達 AA）。改用 `--tone-danger-text`。之前沒有任何 story 會真的顯示
  驗證錯誤，所以 axe 一直掃不到。
- **`Tabs` 的 ARIA 關聯**：`role="tab"` 與 `role="tabpanel"` 之間原本沒有
  `id` / `aria-controls` / `aria-labelledby`，輔助技術無從得知哪個面板屬於哪個
  分頁；面板也缺 `tabIndex`，鍵盤使用者無法捲動其內容。
- **`Tabs` 的空字串 key**：`activeKey || internalActiveKey` 會讓 key 為空字串的
  分頁永遠選不起來，改用 `??`。
- **`Modal` 重複 id**：標題原本寫死 `id="modal-title"`，同頁兩個 Modal 會衝突。
- **`Table` 載入狀態**：補上 `aria-busy` 與 `role="status"`。

### Changed

- ⚠️ **`Table` 的 `sorter: true` 排序結果會改變**：數字欄位改為數值比較，
  字串比較改為開啟 `numeric` 選項（`ORD-2` 會排在 `ORD-10` 前面）。
  依賴舊有字串排序結果的使用端請改傳自訂的 `sorter` 函式。
- ⚠️ **`Tooltip` 的 DOM 結構變動**：移除內層的 `.mds-tooltip__trigger`，
  泡泡改由 portal 掛在 `document.body`。有直接指定這兩個 class 的樣式需調整。
- `Table` 換排序時頁碼會回到第 1 頁。
- `ThemeProvider` 現在是 `ConfigProvider` 的薄包裝，行為完全相同，既有使用端
  不需要改。新專案建議直接用 `ConfigProvider`。
- ⚠️ **`Tabs` 的 Tab 鍵行為改變**：分頁列改為 roving tabindex，整組分頁只佔一個
  tab stop（原本每個分頁都是），符合 WAI-ARIA 的 tabs pattern。面板本身現在也
  可以被 Tab 到。
- **`Form` 的值改放在外部 store**，`Form.Item` 逐欄位訂閱，因此在一個欄位打字
  只會重繪那一個欄位（原本值放在 context，每次按鍵所有欄位一起重繪）。
  對外行為不變。
- `Pagination` 的頁碼按鈕補上 `aria-label`（例如 `Page 3`）—— 讀屏原本只會唸出
  孤零零的「3」。以可及名稱查詢這些按鈕的測試需要跟著改。

## [0.1.0] - 2026-07-21

首次發布到 GitHub Packages，供內部專案試用。

### Added

- 20 個元件、`ThemeProvider`，全 TypeScript 並支援 `forwardRef`。
- 三層 token 架構（尺度 / 品牌 / 表面），4 條產品線 × 明暗兩色主題。
- Storybook 文件站，a11y 檢查在 CI 以 `error` 模式強制。
- 打包設定：`exports` map、`sideEffects`、型別產出、`styles.css` 子路徑。
