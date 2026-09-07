import { useRef, useState } from 'react'
import { Alert } from '../components/Alert/Alert'
import { Badge } from '../components/Badge/Badge'
import type { BadgeProps } from '../components/Badge/Badge'
import { Button } from '../components/Button/Button'
import { Card } from '../components/Card/Card'
import { Dropdown } from '../components/Dropdown/Dropdown'
import { Form } from '../components/Form/Form'
import type { FormValues } from '../components/Form/Form'
import { Icon } from '../components/Icon/Icon'
import { Input } from '../components/Input/Input'
import { Modal } from '../components/Modal/Modal'
import { Select } from '../components/Select/Select'
import type { SelectOption } from '../components/Select/Select'
import { Space } from '../components/Space/Space'
import { Table } from '../components/Table/Table'
import type { TableColumn, TableRowKey } from '../components/Table/Table'
import { Tag } from '../components/Tag/Tag'
import { Textarea } from '../components/Textarea/Textarea'
import { Tooltip } from '../components/Tooltip/Tooltip'
import { ConfigProvider } from '../config/ConfigProvider'
import { zhTW } from '../locale/zh-TW'
import { ThemeProvider } from '../theme/ThemeProvider'
import portfolioCover from '../assets/portfolio-cover.png'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Components/Showcase',
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: null,
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const Footer = ({ product, links }: { product: string; links: string[] }) => (
  <footer className="template-footer">
    <strong>{product}</strong>
    <nav aria-label={`${product} footer`}>
      {links.map((link) => (
        <a href="#top" key={link}>{link}</a>
      ))}
    </nav>
  </footer>
)

const PortfolioCoverTemplate = () => (
  <ThemeProvider productLine="commerce">
    <main className="portfolio-cover-showcase portfolio-cover-showcase--image">
      <img
        className="portfolio-cover-showcase__image"
        src={portfolioCover}
        alt="React Design System 模板元件庫作品集封面"
      />
    </main>
  </ThemeProvider>
)

const CommerceOperationsTemplate = () => (
  <ThemeProvider productLine="commerce">
    <main className="template-page template-page--commerce" id="top">
      <header className="template-header">
        <strong className="template-brand">RetailOps Cloud</strong>
        <nav aria-label="RetailOps Cloud">
          <a href="#features">營運中樞</a>
          <a href="#workflow">工作流程</a>
          <a href="#contact">導入諮詢</a>
        </nav>
        <Button size="sm" type="primary">安排導入</Button>
      </header>

      <section className="commerce-hero">
        <div className="commerce-hero__copy">
          <Badge variant="primary">小型電商營運後台</Badge>
          <h1>把訂單、庫存與客服異常集中到同一個營運首頁。</h1>
          <p>
            RetailOps Cloud 是給小型電商團隊使用的營運入口。首頁第一屏就能看到
            今日風險、待處理訂單與門市狀態，讓營運主管不用切換多套後台。
          </p>
          <Space wrap>
            <Button type="primary" size="lg">查看今日營運</Button>
            <Button variant="secondary" size="lg">瀏覽版型結構</Button>
          </Space>
        </div>
        <div className="commerce-command">
          {/* 緊接在 h1 之後，標題要是 h2；卡片預設的 h3 會跳級 */}
          <Card title="今日營運概況" titleAs="h2" extra={<Badge variant="warning">18 筆逾期</Badge>}>
            <div className="commerce-command__grid">
              <Card title="待處理訂單" size="small"><strong>248</strong></Card>
              <Card title="高價值訂單" size="small"><strong>$42.8K</strong></Card>
              <Card title="庫存警示" size="small"><strong>7</strong></Card>
              <Card title="門市回覆率" size="small"><strong>86%</strong></Card>
            </div>
          </Card>
        </div>
      </section>

      <section className="template-section commerce-flow" id="workflow">
        <div>
          <Tag color="primary">主要使用者流程</Tag>
          <h2>首頁就是營運主管的每日工作台。</h2>
          <p>這個版型不是展示元件，而是讓小型電商產品可以直接套用的首頁結構。</p>
        </div>
        <div className="commerce-flow__steps">
          {['查看異常訂單', '分派處理人員', '追蹤出貨與庫存', '產出營運回報'].map((step, index) => (
            <Card title={`0${index + 1}`} key={step}>
              <p>{step}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="template-section" id="features">
        <div className="template-section__header">
          <h2>可直接套用的電商首頁區塊</h2>
          <p>包含 hero、營運指標、流程卡片、功能卡片與 CTA，對應真實電商內部產品首頁。</p>
        </div>
        <div className="template-card-grid">
          {[
            ['訂單異常中心', '把逾期、缺貨、退款與高價值訂單放到同一個處理入口。'],
            ['門市營運視角', '用卡片式資訊呈現門市回覆率、庫存壓力與出貨狀態。'],
            ['營運交接區', '讓早晚班同仁可以清楚知道下一步要處理什麼。'],
          ].map(([title, text]) => (
            <Card title={title} hoverable key={title}>
              <p>{text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="template-cta" id="contact">
        <div>
          <Tag color="success">首頁版型可交付</Tag>
          <h2>適合改成小型電商 SaaS、內部營運後台或門市管理工具。</h2>
        </div>
        <Card title="取得版型">
          <Space direction="vertical" align="stretch">
            <Input placeholder="公司信箱" aria-label="公司信箱" />
            <Select
              placeholder="營運規模"
              aria-label="營運規模"
              options={[
                { label: '1-5 間門市', value: 'small' },
                { label: '6-20 間門市', value: 'medium' },
                { label: '20 間以上', value: 'large' },
              ]}
            />
            <Button type="primary" block>送出需求</Button>
          </Space>
        </Card>
      </section>

      <Footer product="RetailOps Cloud" links={['隱私權', '服務條款', '聯絡我們']} />
    </main>
  </ThemeProvider>
)

const FinanceServicesTemplate = () => (
  <ThemeProvider productLine="finance">
    <main className="template-page template-page--finance" id="top">
      <header className="finance-header">
        <strong className="template-brand">TrustLedger</strong>
        <nav aria-label="TrustLedger">
          <a href="#risk">風控平台</a>
          <a href="#security">安全合規</a>
          <a href="#contact">預約顧問</a>
        </nav>
        <Button size="sm" type="primary">預約顧問</Button>
      </header>

      <section className="finance-hero">
        <div className="finance-hero__intro">
          <Badge variant="primary">金融服務首頁</Badge>
          <h1>給金融團隊的高信任感風控與案件審查入口。</h1>
          <p>
            TrustLedger 以嚴謹、清楚、可稽核的首頁設計，幫助金融服務產品在第一眼
            建立信任，並引導企業客戶進入風險審查、案件管理與合規諮詢。
          </p>
        </div>
        {/* hero 內、緊接在 h1 之後的第一個標題，要是 h2 */}
        <Card className="finance-review-card" title="風險審查摘要" titleAs="h2" extra={<Tag color="primary">安全工作區</Tag>}>
          {[
            ['高風險案件', '11', '需主管覆核'],
            ['KYC 更新', '26', '處理中'],
            ['付款例外', '9', '今日審查'],
          ].map(([label, value, note]) => (
            <div className="finance-review-row" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <Badge variant="warning">{note}</Badge>
            </div>
          ))}
        </Card>
      </section>

      <section className="finance-proof" id="security">
        {[
          ['24/7', '案件監控'],
          ['$2.8B', '審查交易規模'],
          ['SOC 2', '合規敘事'],
          ['99.9%', '服務可用性'],
        ].map(([value, label]) => (
          // 前面已有 h2（風險審查摘要），這裡維持預設 h3
          <Card title={label} key={label}>
            <strong className="template-stat">{value}</strong>
          </Card>
        ))}
      </section>

      <section className="template-section finance-content" id="risk">
        <div className="template-section__header">
          <Tag color="primary">企業級首頁結構</Tag>
          <h2>金融服務首頁需要先建立信任，再談功能。</h2>
          <p>這個版型用較克制的資訊密度，呈現安全、稽核、案件流程與客戶信任。</p>
        </div>
        <div className="finance-content__grid">
          <Card title="合規審查入口">
            <p>把交易風險、KYC 更新與案件覆核整理成清楚的首頁敘事。</p>
          </Card>
          <Card title="客戶信任訊息">
            <p>透過安全標籤、數據證明與服務承諾，建立金融產品需要的可信度。</p>
          </Card>
          <Card title="顧問式轉換">
            <p>CTA 不強迫立即試用，而是引導企業客戶預約顧問或安全審查。</p>
          </Card>
        </div>
      </section>

      <section className="finance-contact" id="contact">
        <div>
          <h2>為金融產品建立可信任的第一屏。</h2>
          <p>適合金融 SaaS、支付平台、合規工具、KYC/AML 審查產品使用。</p>
        </div>
        <Space wrap>
          <Button type="primary" size="lg">預約安全顧問</Button>
          <Button variant="secondary" size="lg">下載產品簡介</Button>
        </Space>
      </section>

      <Footer product="TrustLedger" links={['安全聲明', '合規文件', '聯絡窗口']} />
    </main>
  </ThemeProvider>
)

const SaasServicesTemplate = () => (
  <ThemeProvider productLine="internal">
    <main className="template-page template-page--saas" id="top">
      <header className="template-header">
        <strong className="template-brand">TeamPilot</strong>
        <nav aria-label="TeamPilot">
          <a href="#platform">平台</a>
          <a href="#features">功能</a>
          <a href="#pricing">方案</a>
        </nav>
        <Button size="sm" type="primary">開始試用</Button>
      </header>

      <section className="saas-hero">
        <div className="saas-hero__center">
          <Badge variant="primary">B2B SaaS 首頁</Badge>
          <h1>讓客戶成功團隊更快掌握每個工作區的健康狀態。</h1>
          <p>
            TeamPilot 是給 B2B SaaS 產品使用的首頁版型。它強調清楚價值主張、
            產品畫面感、信任指標與低摩擦轉換，適合直接改成正式產品官網。
          </p>
          <Space wrap>
            <Button type="primary" size="lg">開始免費試用</Button>
            <Button variant="secondary" size="lg">觀看平台介紹</Button>
          </Space>
        </div>
      </section>

      <section className="saas-dashboard" id="platform">
        {/* 緊接在 h1 之後，標題要是 h2 */}
        <Card title="工作區健康度" titleAs="h2" extra={<Badge variant="success">即時摘要</Badge>}>
          <div className="saas-dashboard__bars" aria-hidden="true">
            <span style={{ height: '72%' }} />
            <span style={{ height: '48%' }} />
            <span style={{ height: '86%' }} />
            <span style={{ height: '64%' }} />
            <span style={{ height: '92%' }} />
          </div>
          <div className="saas-dashboard__summary">
            <Tag color="success">128 個活躍工作區</Tag>
            <Tag color="warning">12 個需追蹤帳戶</Tag>
            <Tag color="primary">41% onboarding 提升</Tag>
          </div>
        </Card>
      </section>

      <section className="template-section" id="features">
        <div className="template-section__header template-section__header--center">
          <Tag color="primary">SaaS template sections</Tag>
          <h2>首頁結構為轉換率服務，而不是為了展示元件。</h2>
          <p>Hero、產品截圖感、指標、功能卡與價格區塊可以直接改成真實 SaaS 官網。</p>
        </div>
        <div className="saas-feature-grid">
          {[
            ['啟用率追蹤', '展示 onboarding、活躍度與客戶健康分數。'],
            ['團隊管理', '呈現 workspace、owner、seat usage 等 SaaS 常見資訊。'],
            ['銷售轉換', '提供清楚 CTA、方案入口與產品可信度訊息。'],
          ].map(([title, text]) => (
            <Card title={title} hoverable key={title}>
              <p>{text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="saas-pricing" id="pricing">
        {[
          ['Starter', '$29', '適合剛起步的小團隊'],
          ['Growth', '$99', '適合需要客戶成功流程的團隊'],
          ['Enterprise', '客製', '適合需要權限與安全審查的企業'],
        ].map(([plan, price, text]) => (
          <Card
            title={plan}
            extra={plan === 'Growth' ? <Badge variant="primary">推薦</Badge> : undefined}
            key={plan}
          >
            <strong className="template-stat">{price}</strong>
            <p>{text}</p>
            <Button variant={plan === 'Growth' ? 'primary' : 'secondary'} block>
              選擇方案
            </Button>
          </Card>
        ))}
      </section>

      <section className="template-cta">
        <div>
          <Tag color="success">可直接套版</Tag>
          <h2>適合 B2B SaaS、內部平台、AI 工具與工作流產品首頁。</h2>
        </div>
        <Card title="申請產品試用">
          <Space direction="vertical" align="stretch">
            <Input placeholder="工作信箱" aria-label="工作信箱" />
            <Select
              placeholder="公司規模"
              aria-label="公司規模"
              options={[
                { label: '1-20 人', value: 'small' },
                { label: '21-100 人', value: 'medium' },
                { label: '100 人以上', value: 'large' },
              ]}
            />
            <Button type="primary" block>送出申請</Button>
          </Space>
        </Card>
      </section>

      <Footer product="TeamPilot" links={['產品', '價格', '客戶案例', '聯絡我們']} />
    </main>
  </ThemeProvider>
)

/* -------------------------------------------------------------------------
 * 可操作的營運主控台
 *
 * 另外三張是靜態版型，展示的是排版能力；這一張的重點是行為 ——
 * 表格排序分頁、選單的鍵盤操作、對話框的焦點鎖定、表單驗證，都可以真的動手試。
 * 這些正是排版類截圖看不出來、但實際導入後每天都會碰到的部分。
 * ------------------------------------------------------------------------- */

interface ConsoleOrder {
  key: string
  order: string
  customer: string
  plan: string
  amount: number
  status: 'processing' | 'shipped' | 'hold'
}

const consoleOrders: ConsoleOrder[] = [
  { key: '1', order: 'ORD-2041', customer: 'Acme Studio', plan: 'Commerce Pro', amount: 12800, status: 'processing' },
  { key: '2', order: 'ORD-2042', customer: 'Northwind', plan: 'Finance Basic', amount: 860, status: 'shipped' },
  { key: '3', order: 'ORD-2043', customer: 'Orbit Ops', plan: 'Internal Tools', amount: 4200, status: 'hold' },
  { key: '4', order: 'ORD-2044', customer: 'Bluebird', plan: 'Commerce Pro', amount: 1460, status: 'processing' },
  { key: '5', order: 'ORD-2045', customer: 'Summit', plan: 'Finance Basic', amount: 970, status: 'shipped' },
  { key: '6', order: 'ORD-2046', customer: 'Atlas', plan: 'Internal Tools', amount: 610, status: 'processing' },
  { key: '7', order: 'ORD-2047', customer: 'Lighthouse', plan: 'Commerce Pro', amount: 23400, status: 'hold' },
  { key: '8', order: 'ORD-2048', customer: 'Kite', plan: 'Finance Basic', amount: 320, status: 'shipped' },
  { key: '9', order: 'ORD-2049', customer: 'Meridian', plan: 'Commerce Pro', amount: 8150, status: 'processing' },
]

const consoleStatus: Record<ConsoleOrder['status'], { label: string; variant: BadgeProps['variant'] }> = {
  processing: { label: '處理中', variant: 'primary' },
  shipped: { label: '已出貨', variant: 'success' },
  hold: { label: '待確認', variant: 'warning' },
}

const consolePlans: SelectOption[] = [
  { label: 'Commerce Pro', value: 'Commerce Pro' },
  { label: 'Finance Basic', value: 'Finance Basic' },
  { label: 'Internal Tools', value: 'Internal Tools' },
]

const OperationsConsoleTemplate = () => {
  const pageRef = useRef<HTMLElement>(null)
  const [orders, setOrders] = useState(consoleOrders)
  const [selectedRowKeys, setSelectedRowKeys] = useState<TableRowKey[]>([])
  const [editing, setEditing] = useState<ConsoleOrder | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const form = Form.useForm()

  const setStatus = (key: string, status: ConsoleOrder['status']) => {
    setOrders((current) => current.map((order) => (
      order.key === key ? { ...order, status } : order
    )))
  }

  const handleAction = (action: string, record: ConsoleOrder) => {
    if (action === 'edit') {
      setEditing(record)
      return
    }
    if (action === 'ship') {
      setStatus(record.key, 'shipped')
      setNotice(`${record.order} 已標記為出貨。`)
      return
    }
    setStatus(record.key, 'hold')
    setNotice(`${record.order} 已暫停處理。`)
  }

  const handleSave = (values: FormValues) => {
    if (!editing) return
    setOrders((current) => current.map((order) => (
      order.key === editing.key
        ? { ...order, customer: String(values.customer), plan: String(values.plan) }
        : order
    )))
    setNotice(`${editing.order} 已更新。`)
    setEditing(null)
  }

  const shipSelected = () => {
    setOrders((current) => current.map((order) => (
      selectedRowKeys.includes(order.key) ? { ...order, status: 'shipped' } : order
    )))
    setNotice(`已將 ${selectedRowKeys.length} 筆訂單標記為出貨。`)
    setSelectedRowKeys([])
  }

  const columns: TableColumn<ConsoleOrder>[] = [
    { title: '訂單編號', dataIndex: 'order', sorter: true },
    { title: '客戶', dataIndex: 'customer', sorter: true },
    {
      title: '方案',
      dataIndex: 'plan',
      render: (value) => <Tag color="primary">{value}</Tag>,
    },
    {
      title: '金額',
      dataIndex: 'amount',
      sorter: true,
      render: (value) => `$${Number(value).toLocaleString('en-US')}`,
    },
    {
      title: '狀態',
      dataIndex: 'status',
      render: (_, record) => (
        <Badge variant={consoleStatus[record.status].variant}>
          {consoleStatus[record.status].label}
        </Badge>
      ),
    },
    {
      title: '操作',
      key: 'actions',
      render: (_, record) => (
        <Dropdown
          // 只有圖示的觸發鈕一定要給名字，而且每一列各自命名
          label={`${record.order} 的操作`}
          trigger={<Icon name="chevron-down" size={16} />}
          placement="bottom-end"
          items={[
            { key: 'edit', label: '編輯訂單' },
            { key: 'ship', label: '標記為已出貨', disabled: record.status === 'shipped' },
            { key: 'hold', label: '暫停處理' },
          ]}
          onSelect={(item) => handleAction(String(item.key), record)}
        />
      ),
    },
  ]

  return (
    /*
     * locale 讓元件自己渲染的文案（分頁的「上一頁」、對話框的「確定 / 取消」、
     * 空狀態的「沒有資料」）跟著中文走，不需要逐一傳 prop。
     *
     * getPopupContainer 把浮層掛進這一頁自己的節點下。這裡是非 global 模式，
     * productLine 只寫在 wrapper 上，浮層預設掛到 document.body 就會拿到
     * Storybook 工具列設定的產品線色，而不是這一頁的 commerce。
     */
    <ConfigProvider
      productLine="commerce"
      locale={zhTW}
      getPopupContainer={() => pageRef.current}
    >
      <main className="template-page" id="top" ref={pageRef}>
        <header className="template-header">
          <strong className="template-brand">RetailOps Console</strong>
          <nav aria-label="RetailOps Console">
            <a href="#top">訂單</a>
            <a href="#top">庫存</a>
            <a href="#top">客服</a>
          </nav>
          <Space>
            <Button variant="secondary" size="sm" leftIcon={<Icon name="search" />}>
              搜尋訂單
            </Button>
            <Button type="primary" size="sm">建立訂單</Button>
          </Space>
        </header>

        <section className="console-body">
          <Alert
            type="info"
            message="這一頁可以真的操作 —— 建議把滑鼠放開，只用鍵盤走一次"
            description={
              <ul className="console-hints">
                <li>用 <kbd>Tab</kbd> 走到任一列的操作選單，按 <kbd>↓</kbd> 開啟，<kbd>↑</kbd><kbd>↓</kbd> 移動，<kbd>Esc</kbd> 關閉 —— 焦點會回到原本那顆按鈕</li>
                <li>選單裡挑「編輯訂單」開啟對話框，一直按 <kbd>Tab</kbd>：焦點會鎖在對話框裡出不去</li>
                <li>把客戶名稱清空後按「儲存」看驗證；補回任何一個字，錯誤訊息會立刻消失</li>
                <li>點欄位標題排序 —— 金額是依數值排，不是把 1,460 當字串排在 860 前面</li>
              </ul>
            }
          />

          {notice && (
            <Alert type="success" message={notice} closable onClose={() => setNotice(null)} />
          )}

          <Card
            title="今日訂單"
            titleAs="h2"
            extra={
              <Space>
                {selectedRowKeys.length > 0 && (
                  <Button
                    size="sm"
                    variant="secondary"
                    leftIcon={<Icon name="check" />}
                    onClick={shipSelected}
                  >
                    {`將 ${selectedRowKeys.length} 筆標記出貨`}
                  </Button>
                )}
                <Tooltip title="這裡的排序與分頁都在前端完成。接後端時改用 manual 模式，Table 只回報使用者要求的頁碼與排序，資料由外部取。">
                  <span className="console-info">
                    <Icon name="info-circle" size={16} aria-label="關於這張表格" />
                  </span>
                </Tooltip>
              </Space>
            }
          >
            <Table
              columns={columns}
              dataSource={orders}
              pagination={{ pageSize: 4 }}
              rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
            />
          </Card>
        </section>

        <Modal
          open={editing !== null}
          title={editing ? `編輯 ${editing.order}` : ''}
          okText="儲存"
          /*
           * 送出鈕在 Modal 的 footer，不在 <form> 裡面，沒辦法用 htmlType="submit"。
           * form.submit() 走原生 requestSubmit()，跟使用者自己按送出鈕是同一條路徑。
           */
          onOk={() => form.submit()}
          onCancel={() => setEditing(null)}
        >
          <Form
            form={form}
            initialValues={editing ? { customer: editing.customer, plan: editing.plan, note: '' } : {}}
            onFinish={handleSave}
          >
            <Form.Item
              name="customer"
              label="客戶名稱"
              rules={[{ required: true, message: '客戶名稱不能空白。' }]}
            >
              <Input allowClear />
            </Form.Item>
            <Form.Item name="plan" label="方案">
              <Select options={consolePlans} />
            </Form.Item>
            <Form.Item name="note" label="異動備註" extra="會寫進這張訂單的異動紀錄。">
              <Textarea rows={2} placeholder="例如：客戶來電要求改方案" />
            </Form.Item>
          </Form>
        </Modal>

        <Footer product="RetailOps Console" links={['訂單', '庫存', '客服', '設定']} />
      </main>
    </ConfigProvider>
  )
}

export const OperationsConsole: Story = {
  name: '00 可操作的營運主控台',
  parameters: {
    docs: {
      description: {
        story: '把有行為的元件串成一條真實流程：表格排序分頁 → 列操作選單 → 對話框 → 表單驗證。',
      },
    },
  },
  render: () => <OperationsConsoleTemplate />,
}

export const PortfolioCover: Story = {
  name: '01 Cover 首頁',
  render: () => <PortfolioCoverTemplate />,
}

export const CommerceOperations: Story = {
  name: '02 電商營運首頁',
  render: () => <CommerceOperationsTemplate />,
}

export const FinancialServices: Story = {
  name: '03 金融服務首頁',
  render: () => <FinanceServicesTemplate />,
}

export const SaasService: Story = {
  name: '04 SaaS 服務首頁',
  render: () => <SaasServicesTemplate />,
}
