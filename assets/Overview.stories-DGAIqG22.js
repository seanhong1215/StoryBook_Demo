import{i as e}from"./preload-helper-Cs4UwXAW.js";import{i as t}from"./iframe-GXcRKLmM.js";var n,r,i,a,o,s,c;e((()=>{n=t(),r=[{name:`通用元件`,components:[{name:`Button`,href:`./?path=/docs/general-button--docs`,description:`用清楚的視覺層級觸發主要或次要操作。`},{name:`Icon`,href:`./?path=/docs/general-icon--docs`,description:`提供元件庫內建圖示，也接受自訂 SVG 內容。`}]},{name:`資料展示`,components:[{name:`Badge`,href:`./?path=/docs/data-display-badge--docs`,description:`展示狀態、分類或數量等精簡資訊。`},{name:`Tag`,href:`./?path=/docs/data-display-tag--docs`,description:`標記屬性、分類或簡短 metadata。`},{name:`Card`,href:`./?path=/docs/data-display-card--docs`,description:`組合內容、操作與輔助資訊。`},{name:`Tabs`,href:`./?path=/docs/data-display-tabs--docs`,description:`將相關內容整理成可切換區塊。`},{name:`Table`,href:`./?path=/docs/data-display-table--docs`,description:`展示結構化資料，支援排序、列選取與分頁。`}]},{name:`資料輸入`,components:[{name:`Input`,href:`./?path=/docs/data-entry-input--docs`,description:`輸入短文字，支援狀態、尺寸與前後綴。`},{name:`Textarea`,href:`./?path=/docs/data-entry-textarea--docs`,description:`輸入長文字，支援字數統計與驗證狀態。`},{name:`Select`,href:`./?path=/docs/data-entry-select--docs`,description:`從選項列表中選擇單一值，支援尺寸與驗證狀態。`},{name:`Checkbox`,href:`./?path=/docs/data-entry-checkbox--docs`,description:`處理二元或半選狀態的產品設定。`},{name:`Switch`,href:`./?path=/docs/data-entry-switch--docs`,description:`切換即時開關狀態，支援 loading 與 disabled。`},{name:`Form`,href:`./?path=/docs/data-entry-form--docs`,description:`管理欄位值、驗證規則、錯誤訊息與送出回呼。`}]},{name:`回饋元件`,components:[{name:`Alert`,href:`./?path=/docs/feedback-alert--docs`,description:`展示成功、資訊、警告與錯誤回饋。`},{name:`Modal`,href:`./?path=/docs/feedback-modal--docs`,description:`呈現需要使用者處理的阻斷式流程。`},{name:`Empty`,href:`./?path=/docs/feedback-empty--docs`,description:`呈現空資料狀態並提供下一步操作。`},{name:`Tooltip`,href:`./?path=/docs/feedback-tooltip--docs`,description:`在 hover 或 keyboard focus 時提供短提示。`}]},{name:`導航元件`,components:[{name:`Dropdown`,href:`./?path=/docs/navigation-dropdown--docs`,description:`從觸發器展開情境操作，支援外部點擊關閉。`},{name:`Pagination`,href:`./?path=/docs/navigation-pagination--docs`,description:`用目前頁碼與總筆數控制資料分頁。`}]},{name:`版面元件`,components:[{name:`Space`,href:`./?path=/docs/layout-space--docs`,description:`不用額外 CSS 就能控制元素間距與排列。`}]},{name:`設計基礎`,components:[{name:`Tokens`,href:`./?path=/story/foundation-tokens--brand-colors`,description:`共用色彩、間距、圓角、字級與陰影 token。`},{name:`Localization`,href:`./?path=/story/foundation-localization--comparison`,description:`比較英文與繁體中文語系，並示範 provider 巢狀覆寫。`}]}],i=[{step:`1`,title:`安裝與第一個元件`,href:`./?path=/docs/guide-getting-started--docs`,description:`設定私有 registry、安裝套件，並在 React 專案中完成第一次匯入。`},{step:`2`,title:`設定主題與產品線`,href:`./?path=/story/foundation-tokens--brand-colors`,description:`了解 design token、明暗主題與不同 product line 的覆寫方式。`},{step:`3`,title:`查閱元件 API`,href:`./?path=/docs/general-button--docs`,description:`從元件文件查看範例、狀態、props、互動測試與無障礙檢查。`}],a=[`21 個可重用 React 元件，完整 TypeScript 型別。`,`四條產品線與明暗主題共用同一套 CSS tokens。`,`元件樣式可 tree-shake，沒有額外執行期依賴。`,`127 個 Storybook 測試涵蓋互動流程與 axe 檢查。`],o={title:`Guide/Overview`,parameters:{layout:`padded`,docs:{page:null}}},s={render:()=>(0,n.jsxs)(`main`,{className:`docs-page`,children:[(0,n.jsx)(`p`,{className:`docs-kicker`,children:`My Design System`}),(0,n.jsx)(`h1`,{className:`docs-title`,children:`React 元件與設計指南`}),(0,n.jsx)(`p`,{className:`docs-lede`,children:`給內部產品使用的輕量 UI library。從快速開始進行安裝與主題設定， 或依分類查閱每個元件的使用範例、API、互動行為與無障礙規範。`}),(0,n.jsxs)(`section`,{className:`docs-section`,children:[(0,n.jsxs)(`div`,{className:`docs-section-header`,children:[(0,n.jsx)(`h2`,{className:`docs-section-title`,children:`開始使用`}),(0,n.jsx)(`span`,{className:`docs-count`,children:`3 步驟`})]}),(0,n.jsx)(`div`,{className:`interview-path`,children:i.map(e=>(0,n.jsxs)(`a`,{className:`interview-step`,href:e.href,children:[(0,n.jsx)(`span`,{className:`interview-step__number`,children:e.step}),(0,n.jsxs)(`div`,{children:[(0,n.jsx)(`h3`,{className:`interview-step__title`,children:e.title}),(0,n.jsx)(`p`,{className:`interview-step__description`,children:e.description})]})]},e.title))})]}),(0,n.jsxs)(`section`,{className:`docs-section`,children:[(0,n.jsx)(`div`,{className:`docs-section-header`,children:(0,n.jsx)(`h2`,{className:`docs-section-title`,children:`快速範例`})}),(0,n.jsx)(`pre`,{className:`docs-code`,children:(0,n.jsx)(`code`,{children:`import { Button, ConfigProvider } from '@seanhong1215/my-design-system'

export function App() {
  return (
    <ConfigProvider global theme="light" productLine="core">
      <Button type="primary">開始使用</Button>
    </ConfigProvider>
  )
}`})})]}),(0,n.jsxs)(`section`,{className:`docs-section`,children:[(0,n.jsxs)(`div`,{className:`docs-section-header`,children:[(0,n.jsx)(`h2`,{className:`docs-section-title`,children:`設計系統概況`}),(0,n.jsxs)(`span`,{className:`docs-count`,children:[a.length,` 項`]})]}),(0,n.jsx)(`div`,{className:`proof-grid`,children:a.map(e=>(0,n.jsx)(`div`,{className:`proof-card`,children:e},e))})]}),r.map(e=>(0,n.jsxs)(`section`,{className:`docs-section`,children:[(0,n.jsxs)(`div`,{className:`docs-section-header`,children:[(0,n.jsx)(`h2`,{className:`docs-section-title`,children:e.name}),(0,n.jsxs)(`span`,{className:`docs-count`,children:[e.components.length,` 項`]})]}),(0,n.jsx)(`div`,{className:`component-grid`,children:e.components.map(e=>(0,n.jsxs)(`a`,{className:`component-link`,href:e.href,children:[(0,n.jsx)(`h3`,{className:`component-link__name`,children:e.name}),(0,n.jsx)(`p`,{className:`component-link__description`,children:e.description})]},e.name))})]},e.name))]})},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <main className="docs-page">\r
      <p className="docs-kicker">My Design System</p>\r
      <h1 className="docs-title">React 元件與設計指南</h1>\r
      <p className="docs-lede">\r
        給內部產品使用的輕量 UI library。從快速開始進行安裝與主題設定，\r
        或依分類查閱每個元件的使用範例、API、互動行為與無障礙規範。\r
      </p>\r
\r
      <section className="docs-section">\r
        <div className="docs-section-header">\r
          <h2 className="docs-section-title">開始使用</h2>\r
          <span className="docs-count">3 步驟</span>\r
        </div>\r
        <div className="interview-path">\r
          {guideLinks.map(item => <a className="interview-step" href={item.href} key={item.title}>\r
              <span className="interview-step__number">{item.step}</span>\r
              <div>\r
                <h3 className="interview-step__title">{item.title}</h3>\r
                <p className="interview-step__description">{item.description}</p>\r
              </div>\r
            </a>)}\r
        </div>\r
      </section>\r
\r
      <section className="docs-section">\r
        <div className="docs-section-header">\r
          <h2 className="docs-section-title">快速範例</h2>\r
        </div>\r
        <pre className="docs-code"><code>{\`import { Button, ConfigProvider } from '@seanhong1215/my-design-system'

export function App() {
  return (
    <ConfigProvider global theme="light" productLine="core">
      <Button type="primary">開始使用</Button>
    </ConfigProvider>
  )
}\`}</code></pre>\r
      </section>\r
\r
      <section className="docs-section">\r
        <div className="docs-section-header">\r
          <h2 className="docs-section-title">設計系統概況</h2>\r
          <span className="docs-count">{proofPoints.length} 項</span>\r
        </div>\r
        <div className="proof-grid">\r
          {proofPoints.map(point => <div className="proof-card" key={point}>{point}</div>)}\r
        </div>\r
      </section>\r
\r
      {groups.map(group => <section className="docs-section" key={group.name}>\r
          <div className="docs-section-header">\r
            <h2 className="docs-section-title">{group.name}</h2>\r
            <span className="docs-count">{group.components.length} 項</span>\r
          </div>\r
          <div className="component-grid">\r
            {group.components.map(component => <a className="component-link" href={component.href} key={component.name}>\r
                <h3 className="component-link__name">{component.name}</h3>\r
                <p className="component-link__description">{component.description}</p>\r
              </a>)}\r
          </div>\r
        </section>)}\r
    </main>
}`,...s.parameters?.docs?.source}}},c=[`Overview`]}))();export{s as Overview,c as __namedExportsOrder,o as default};