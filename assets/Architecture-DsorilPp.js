import{i as e}from"./preload-helper-Cs4UwXAW.js";import{i as t}from"./iframe-GXcRKLmM.js";import{I as n,a as r,o as i}from"./blocks-DvXEZxT_.js";import{t as a}from"./mdx-react-shim-DEiclNJ3.js";function o(e){let t={code:`code`,h1:`h1`,h2:`h2`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,...n(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r,{title:`Guide/Architecture`}),`
`,(0,c.jsx)(t.h1,{id:`架構與取捨`,children:`架構與取捨`}),`
`,(0,c.jsx)(t.p,{children:`21 個元件、約 45 kB JS、零執行期依賴。這頁記的是幾個「為什麼是這樣」，
而不是元件清單 —— 那些看 sidebar 就有了。`}),`
`,(0,c.jsx)(t.h2,{id:`共用行為層`,children:`共用行為層`}),`
`,(0,c.jsxs)(t.p,{children:[`元件不各自實作互動行為，共通的部分抽在 `,(0,c.jsx)(t.code,{children:`src/hooks/`}),`：`]}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Hook`}),(0,c.jsx)(t.th,{children:`負責`}),(0,c.jsx)(t.th,{children:`誰在用`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`usePopup`})}),(0,c.jsx)(t.td,{children:`定位（flip + shift）、portal、點擊外部與 Escape 關閉`}),(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`Tooltip`}),`、`,(0,c.jsx)(t.code,{children:`Dropdown`})]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`useFocusTrap`})}),(0,c.jsxs)(t.td,{children:[`焦點移入、`,(0,c.jsx)(t.code,{children:`Tab`}),` 循環、關閉時還原`]}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`Modal`})})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`focusable`})}),(0,c.jsx)(t.td,{children:`「目前真的可以 focus 的元素」的判斷`}),(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`Tooltip`}),`、`,(0,c.jsx)(t.code,{children:`useFocusTrap`})]})]})]})]}),`
`,(0,c.jsxs)(t.p,{children:[`抽這一層的理由不是「重用」，是`,(0,c.jsx)(t.strong,{children:`正確性`}),`。浮層定位如果各寫各的，就會變成
每個元件都用 `,(0,c.jsx)(t.code,{children:`position: absolute`}),` 寫死方向：沒有邊界偵測，靠近視窗邊緣會被
切掉，放進 `,(0,c.jsx)(t.code,{children:`overflow: hidden`}),` 的容器裡會整個看不見。這些不是會被測試抓到的
bug，是使用者遇到才會回報的那種。`]}),`
`,(0,c.jsxs)(t.p,{children:[`集中之後，後面每個浮層元件都便宜很多 —— Popover、Popconfirm、Menu 的子選單、
自繪的 Select 都可以直接坐在 `,(0,c.jsx)(t.code,{children:`usePopup`}),` 上。`]}),`
`,(0,c.jsx)(t.h2,{id:`token-分三層`,children:`token 分三層`}),`
`,(0,c.jsxs)(t.p,{children:[`尺度層（間距、圓角、字級）、品牌層（`,(0,c.jsx)(t.code,{children:`[data-product-line]`}),`）、
表面層（`,(0,c.jsx)(t.code,{children:`[data-theme]`}),`），彼此不重疊。這個分層是為了避免
4 條產品線 × 2 個主題 = 8 組色票要手工維護。`]}),`
`,(0,c.jsxs)(t.p,{children:[`彩色淺底（Alert / Tag / Badge）用 `,(0,c.jsx)(t.code,{children:`color-mix()`}),` 由品牌色與表面色即時混出，
所以同時跟隨產品線與主題，不需要額外色票。`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`踩過最深的坑`}),`：CSS 自訂屬性在`,(0,c.jsx)(t.strong,{children:`宣告的那個元素上`}),`就完成 `,(0,c.jsx)(t.code,{children:`var()`}),` 代換，
算出的顏色以固定值往下繼承。`,(0,c.jsx)(t.code,{children:`--tone-*`}),` 一開始只宣告在 `,(0,c.jsx)(t.code,{children:`:root`}),`，
結果巢狀的 `,(0,c.jsx)(t.code,{children:`[data-theme="dark"]`}),` 完全不會重算，暗色下的彩色淺底維持淺色。
選擇器必須寫成 `,(0,c.jsx)(t.code,{children:`:root, [data-theme], [data-product-line]`}),`。`]}),`
`,(0,c.jsx)(t.h2,{id:`form-的值不放在-context`,children:`Form 的值不放在 context`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:`Form`}),` 的欄位值放在一個外部 store，`,(0,c.jsx)(t.code,{children:`Form.Item`}),` 用 `,(0,c.jsx)(t.code,{children:`useSyncExternalStore`}),`
`,(0,c.jsx)(t.strong,{children:`逐欄位訂閱`}),`，context 只帶 store 本身（identity 永遠不變）。`]}),`
`,(0,c.jsxs)(t.p,{children:[`值一旦進 context，每一次按鍵都會讓所有 `,(0,c.jsx)(t.code,{children:`Form.Item`}),` 重繪 —— 30 個欄位的表單
打字就會卡。`,(0,c.jsx)(t.code,{children:`Data Entry/Form`}),` 底下的 `,(0,c.jsx)(t.code,{children:`IsolatedRerenders`}),` story 用 render 計數
把這件事變成可測的斷言，而不是口頭聲稱。`]}),`
`,(0,c.jsx)(t.h2,{id:`打包保留模組結構`,children:`打包：保留模組結構`}),`
`,(0,c.jsxs)(t.p,{children:[`ES 產物用 `,(0,c.jsx)(t.code,{children:`preserveModules`}),`，一個模組一支檔案，每支各自 import 自己的 CSS。`]}),`
`,(0,c.jsxs)(t.p,{children:[`改成這樣之前實測過：全部壓成單一檔案時，「只 import 一個 Button」的產物是
`,(0,c.jsx)(t.strong,{children:`41 kB`}),`，裡面完整包含 Table / Modal / Form 的程式碼。原因是每個元件都是
`,(0,c.jsx)(t.code,{children:`const X = forwardRef(...)`}),` 這種頂層呼叫，Rollup 無法證明它沒有副作用，
只好整段保留。改用 preserveModules 之後同樣的情境是 `,(0,c.jsx)(t.strong,{children:`1.4 kB`}),`。`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:`npm run measure:bundle`}),` 把這個量測固定下來並在 CI 上跑 —— tree-shaking 失效
不會有任何測試抓得到，只能用量的。`]}),`
`,(0,c.jsx)(t.h2,{id:`刻意沒做的`,children:`刻意沒做的`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`沒做`}),(0,c.jsx)(t.th,{children:`理由`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`CSS-in-JS`}),(0,c.jsxs)(t.td,{children:[`靜態 CSS 載入更快、無執行期成本。代價是不能在執行期產生新主題 —— 換主題只能靠預先定義好的 `,(0,c.jsx)(t.code,{children:`[data-product-line]`})]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`自繪的 Select`}),(0,c.jsxs)(t.td,{children:[`原生 `,(0,c.jsx)(t.code,{children:`<select>`}),` 的行動裝置與讀屏支援最好。代價是做不到多選與可搜尋`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`完整圖示庫`}),(0,c.jsxs)(t.td,{children:[`只收元件自己用得到的 13 個。需要更多的話 `,(0,c.jsx)(t.code,{children:`Icon`}),` 的 `,(0,c.jsx)(t.code,{children:`children`}),` 收 `,(0,c.jsx)(t.code,{children:`ReactNode`})]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`虛擬捲動`}),(0,c.jsxs)(t.td,{children:[`內部後台的資料量還沒到需要它的程度，加了會讓 `,(0,c.jsx)(t.code,{children:`Table`}),` 複雜度跳一級`]})]})]})]}),`
`,(0,c.jsx)(t.h2,{id:`目錄`,children:`目錄`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{children:`src/
  components/    元件，一個資料夾一個（tsx + css + stories）
  config/        ConfigProvider 與它的 context
  hooks/         共用行為層
  locale/        內建語系包
  tokens/        三層 token
  docs/          Storybook 的說明頁
`})})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=t(),a(),i()}))();export{s as default};