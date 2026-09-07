import{i as e}from"./preload-helper-Cs4UwXAW.js";import{i as t}from"./iframe-GXcRKLmM.js";import{I as n,a as r,o as i}from"./blocks-DvXEZxT_.js";import{t as a}from"./mdx-react-shim-DEiclNJ3.js";function o(e){let t={code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r,{title:`Guide/Accessibility`}),`
`,(0,c.jsx)(t.h1,{id:`無障礙契約`,children:`無障礙契約`}),`
`,(0,c.jsxs)(t.p,{children:[`這頁講清楚兩件事：`,(0,c.jsx)(t.strong,{children:`library 保證什麼`}),`，以及`,(0,c.jsx)(t.strong,{children:`使用端還是得自己做什麼`}),`。
自動化測試抓得到前者，抓不到後者。`]}),`
`,(0,c.jsx)(t.h2,{id:`ci-上真的在跑的`,children:`CI 上真的在跑的`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`每個 story 都會跑 axe，`,(0,c.jsx)(t.code,{children:`.storybook/preview.tsx`}),` 把它設成 `,(0,c.jsx)(t.code,{children:`error`}),` 模式 ——
任何無障礙違規都會讓 `,(0,c.jsx)(t.code,{children:`npm test`}),` 失敗，不是警告而已`]}),`
`,(0,c.jsxs)(t.li,{children:[`26 個 play function 覆蓋鍵盤流程：方向鍵導覽、焦點鎖定、焦點還原、
`,(0,c.jsx)(t.code,{children:`aria-controls`}),` 與面板的關聯`]}),`
`,(0,c.jsx)(t.li,{children:`明暗兩套主題各快照一次（Chromatic），顏色跑掉會被比對出來`}),`
`]}),`
`,(0,c.jsx)(t.p,{children:`axe 只驗得到「結構上的違規」。「Tab 之後焦點跑到哪」「高對比模式下看不看得見」
這類問題它一律測不出來，所以下面幾項是靠 play function 與人工確認的。`}),`
`,(0,c.jsx)(t.h2,{id:`library-保證的`,children:`library 保證的`}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`鍵盤操作`})}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`元件`}),(0,c.jsx)(t.th,{children:`行為`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`Dropdown`})}),(0,c.jsxs)(t.td,{children:[`方向鍵開啟與移動、`,(0,c.jsx)(t.code,{children:`Home`}),` / `,(0,c.jsx)(t.code,{children:`End`}),`、`,(0,c.jsx)(t.code,{children:`Escape`}),` / `,(0,c.jsx)(t.code,{children:`Tab`}),` 關閉並還原焦點、跳過停用項；roving tabindex`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`Tabs`})}),(0,c.jsxs)(t.td,{children:[`方向鍵切換（自動啟動）、`,(0,c.jsx)(t.code,{children:`Home`}),` / `,(0,c.jsx)(t.code,{children:`End`}),`、跳過停用分頁；整組只佔一個 tab stop`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`Modal`})}),(0,c.jsxs)(t.td,{children:[`開啟時焦點移入面板、`,(0,c.jsx)(t.code,{children:`Tab`}),` / `,(0,c.jsx)(t.code,{children:`Shift+Tab`}),` 在面板內循環、關閉時還原到開啟前的元素`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`Tooltip`})}),(0,c.jsxs)(t.td,{children:[`focus 立即顯示（不套用 hover 延遲）、`,(0,c.jsx)(t.code,{children:`Escape`}),` 關閉`]})]})]})]}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`關聯性`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`Form.Item`}),` 的 `,(0,c.jsx)(t.code,{children:`label`}),` 一定關聯到控制項（子元素自帶 `,(0,c.jsx)(t.code,{children:`id`}),` 就沿用，否則產生一個）`]}),`
`,(0,c.jsxs)(t.li,{children:[`錯誤訊息用 `,(0,c.jsx)(t.code,{children:`role="alert"`}),`，並透過 `,(0,c.jsx)(t.code,{children:`aria-describedby`}),` 關聯到控制項`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`Tabs`}),` 的 tab 與 tabpanel 用 `,(0,c.jsx)(t.code,{children:`aria-controls`}),` / `,(0,c.jsx)(t.code,{children:`aria-labelledby`}),` 互指`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`Tooltip`}),` 開啟時才把 `,(0,c.jsx)(t.code,{children:`aria-describedby`}),` 掛到`,(0,c.jsx)(t.strong,{children:`真正被 focus 的那個元素`}),`上`]}),`
`]}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`高對比（強制色彩）模式`})}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:`box-shadow`}),` 在強制色彩下不會被繪製，而這個 library 的焦點框全部是 box-shadow
做的 —— 所有焦點樣式都補了 `,(0,c.jsx)(t.code,{children:`outline`}),` 版本。靠底色表達的狀態（勾選、開關、
選中分頁、目前頁碼）也都改用系統色關鍵字。`]}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`對比度`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`文字對背景在四條產品線 × 明暗共 8 組下都通過 AA`}),`
`,(0,c.jsxs)(t.li,{children:[`控制項邊界用 `,(0,c.jsx)(t.code,{children:`--color-border-strong`}),`（淺色 3.25:1 / 暗色 3.10:1），
滿足 WCAG 1.4.11 的 3:1`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`使用端要自己做的`,children:`使用端要自己做的`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`沒有可見文字的控制項必須自己給名字。`}),` library 無從得知這個開關是控制什麼的：`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`{/* 錯：讀屏只會唸「切換開關，開啟」 */}
<Switch defaultChecked />

{/* 對 */}
<Switch defaultChecked aria-label="啟用工作區" />
`})}),`
`,(0,c.jsx)(t.p,{children:`同樣需要注意的還有：`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`Select`}),` —— `,(0,c.jsx)(t.code,{children:`placeholder`}),` 只是提示選項，不是標籤。要給 `,(0,c.jsx)(t.code,{children:`aria-label`}),`
或用 `,(0,c.jsx)(t.code,{children:`<label htmlFor>`}),` 關聯（放在 `,(0,c.jsx)(t.code,{children:`Form.Item`}),` 裡就會自動處理）`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`Pagination`}),` —— 同一頁有多個分頁器時各給一個 `,(0,c.jsx)(t.code,{children:`label`}),`，
否則兩個 `,(0,c.jsx)(t.code,{children:`<nav>`}),` 同名，用 landmark 導覽時分不出來`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`Tabs`}),` —— 同一頁有多組分頁時給 `,(0,c.jsx)(t.code,{children:`label`})]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`Dropdown`}),` —— `,(0,c.jsx)(t.code,{children:`trigger`}),` 只放圖示時要給 `,(0,c.jsx)(t.code,{children:`label`}),`。表格裡每列一個操作選單的話，
名字要帶上那一列的識別（`,(0,c.jsx)(t.code,{children:"`${record.order} 的操作`"}),`），
否則讀屏會唸出一整排一模一樣的按鈕`]}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsxs)(t.strong,{children:[(0,c.jsx)(t.code,{children:`Dropdown`}),` 的 `,(0,c.jsx)(t.code,{children:`trigger`}),` 傳內容而不是 `,(0,c.jsx)(t.code,{children:`<Button>`}),`。`]}),` Dropdown 自己會渲染一個
`,(0,c.jsx)(t.code,{children:`<button>`}),`，再塞一個進去會變成按鈕包按鈕：無效的 HTML，而且鍵盤操作會壞掉。`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsxs)(t.strong,{children:[`圖示按鈕要給 `,(0,c.jsx)(t.code,{children:`aria-label`}),`。`]}),` `,(0,c.jsx)(t.code,{children:`Icon`}),` 預設是裝飾性的（`,(0,c.jsx)(t.code,{children:`aria-hidden`}),`），
因為它通常旁邊就有文字。只有圖示的按鈕，名字要下在按鈕上：`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`<Button variant="ghost" aria-label="關閉面板">
  <Icon name="close" />
</Button>
`})}),`
`,(0,c.jsxs)(t.p,{children:[`圖示本身要傳達意義（旁邊沒有文字）時，給 `,(0,c.jsx)(t.code,{children:`Icon`}),` 一個 `,(0,c.jsx)(t.code,{children:`aria-label`}),`，
它會自動變成 `,(0,c.jsx)(t.code,{children:`role="img"`}),`。`]}),`
`,(0,c.jsx)(t.h2,{id:`已知的限制`,children:`已知的限制`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`Table`}),` 沒有虛擬捲動，資料量大時 DOM 節點數會很可觀`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`Select`}),` 是原生 `,(0,c.jsx)(t.code,{children:`<select>`}),` 的包裝。好處是行動裝置與讀屏支援最好，
代價是做不到多選與可搜尋 —— 那需要整個改成自繪`]}),`
`,(0,c.jsx)(t.li,{children:`沒有 RTL 支援`}),`
`]})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=t(),a(),i()}))();export{s as default};