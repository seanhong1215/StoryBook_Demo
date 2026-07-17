const groups = [
  {
    name: '作品入口',
    components: [
      {
        name: '電商營運首頁',
        href: '/?path=/story/components-showcase--commerce-operations',
        description: '可直接套用的小型電商營運平台首頁版型。',
      },
      {
        name: '金融服務首頁',
        href: '/?path=/story/components-showcase--financial-services',
        description: '適合金融、風控、合規服務的企業級首頁版型。',
      },
      {
        name: 'SaaS 服務首頁',
        href: '/?path=/story/components-showcase--saas-service',
        description: '適合 B2B SaaS 與工作流產品的轉換型首頁版型。',
      },
      {
        name: '使用方式',
        href: '/?path=/story/components-usage--usage',
        description: '本機 npm pack、file dependency 與主題導入流程。',
      },
    ],
  },
  {
    name: '通用元件',
    components: [
      {
        name: 'Button',
        href: '/?path=/docs/general-button--docs',
        description: '用清楚的視覺層級觸發主要或次要操作。',
      },
    ],
  },
  {
    name: '資料展示',
    components: [
      {
        name: 'Badge',
        href: '/?path=/docs/data-display-badge--docs',
        description: '展示狀態、分類或數量等精簡資訊。',
      },
      {
        name: 'Tag',
        href: '/?path=/docs/data-display-tag--docs',
        description: '標記屬性、分類或簡短 metadata。',
      },
      {
        name: 'Card',
        href: '/?path=/docs/data-display-card--docs',
        description: '組合內容、操作與輔助資訊。',
      },
      {
        name: 'Tabs',
        href: '/?path=/docs/data-display-tabs--docs',
        description: '將相關內容整理成可切換區塊。',
      },
      {
        name: 'Table',
        href: '/?path=/docs/data-display-table--docs',
        description: '展示結構化資料，支援排序、列選取與分頁。',
      },
    ],
  },
  {
    name: '資料輸入',
    components: [
      {
        name: 'Input',
        href: '/?path=/docs/data-entry-input--docs',
        description: '輸入短文字，支援狀態、尺寸與前後綴。',
      },
      {
        name: 'Textarea',
        href: '/?path=/docs/data-entry-textarea--docs',
        description: '輸入長文字，支援字數統計與驗證狀態。',
      },
      {
        name: 'Select',
        href: '/?path=/docs/data-entry-select--docs',
        description: '從選項列表中選擇單一值，支援尺寸與驗證狀態。',
      },
      {
        name: 'Checkbox',
        href: '/?path=/docs/data-entry-checkbox--docs',
        description: '處理二元或半選狀態的產品設定。',
      },
      {
        name: 'Switch',
        href: '/?path=/docs/data-entry-switch--docs',
        description: '切換即時開關狀態，支援 loading 與 disabled。',
      },
      {
        name: 'Form',
        href: '/?path=/docs/data-entry-form--docs',
        description: '管理欄位值、驗證規則、錯誤訊息與送出回呼。',
      },
    ],
  },
  {
    name: '回饋元件',
    components: [
      {
        name: 'Alert',
        href: '/?path=/docs/feedback-alert--docs',
        description: '展示成功、資訊、警告與錯誤回饋。',
      },
      {
        name: 'Modal',
        href: '/?path=/docs/feedback-modal--docs',
        description: '呈現需要使用者處理的阻斷式流程。',
      },
      {
        name: 'Empty',
        href: '/?path=/docs/feedback-empty--docs',
        description: '呈現空資料狀態並提供下一步操作。',
      },
      {
        name: 'Tooltip',
        href: '/?path=/docs/feedback-tooltip--docs',
        description: '在 hover 或 keyboard focus 時提供短提示。',
      },
    ],
  },
  {
    name: '導航元件',
    components: [
      {
        name: 'Dropdown',
        href: '/?path=/docs/navigation-dropdown--docs',
        description: '從觸發器展開情境操作，支援外部點擊關閉。',
      },
      {
        name: 'Pagination',
        href: '/?path=/docs/navigation-pagination--docs',
        description: '用目前頁碼與總筆數控制資料分頁。',
      },
    ],
  },
  {
    name: '版面元件',
    components: [
      {
        name: 'Space',
        href: '/?path=/docs/layout-space--docs',
        description: '不用額外 CSS 就能控制元素間距與排列。',
      },
    ],
  },
  {
    name: '設計基礎',
    components: [
      {
        name: 'Tokens',
        href: '/?path=/story/foundation-tokens--colors',
        description: '共用色彩、間距、圓角、字級與陰影 token。',
      },
    ],
  },
]

const interviewPath = [
  {
    step: '1',
    title: '先展示首頁版型',
    href: '/?path=/story/components-showcase--commerce-operations',
    description: '先選一個企業級首頁，說明產品定位與頁面結構，再切到元件文件。',
  },
  {
    step: '2',
    title: '再說明導入方式',
    href: '/?path=/story/components-usage--usage',
    description: '展示另一個 React 專案如何用本機套件安裝並匯入樣式與元件。',
  },
  {
    step: '3',
    title: '最後看元件細節',
    href: '/?path=/docs/data-entry-form--docs',
    description: '用個別 stories 補充 props、variants、states 與實作取捨。',
  },
]

const proofPoints = [
  'Public package entry 匯出可重用的 React 元件。',
  'Storybook 同時展示元件狀態與產品首頁組合。',
  'CSS tokens 支援不同 product line 的主題覆蓋。',
  '本機 npm pack 流程可在發布前驗證外部專案安裝。',
]

export default {
  title: 'Components/Overview',
  parameters: {
    layout: 'padded',
    docs: {
      page: null,
    },
  },
}

export const Overview = {
  render: () => (
    <main className="docs-page">
      <p className="docs-kicker">Guide</p>
      <h1 className="docs-title">元件庫</h1>
      <p className="docs-lede">
        Storybook 元件清單
      </p>

      <section className="docs-section">
        <div className="docs-section-header">
          <h2 className="docs-section-title">建議順序</h2>
          <span className="docs-count">3 步驟</span>
        </div>
        <div className="interview-path">
          {interviewPath.map((item) => (
            <a className="interview-step" href={item.href} key={item.title}>
              <span className="interview-step__number">{item.step}</span>
              <div>
                <h3 className="interview-step__title">{item.title}</h3>
                <p className="interview-step__description">{item.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="docs-section">
        <div className="docs-section-header">
          <h2 className="docs-section-title">特色</h2>
          <span className="docs-count">{proofPoints.length} 項</span>
        </div>
        <div className="proof-grid">
          {proofPoints.map((point) => (
            <div className="proof-card" key={point}>{point}</div>
          ))}
        </div>
      </section>

      {groups.map((group) => (
        <section className="docs-section" key={group.name}>
          <div className="docs-section-header">
            <h2 className="docs-section-title">{group.name}</h2>
            <span className="docs-count">{group.components.length} 項</span>
          </div>
          <div className="component-grid">
            {group.components.map((component) => (
              <a className="component-link" href={component.href} key={component.name}>
                <h3 className="component-link__name">{component.name}</h3>
                <p className="component-link__description">{component.description}</p>
              </a>
            ))}
          </div>
        </section>
      ))}
    </main>
  ),
}
