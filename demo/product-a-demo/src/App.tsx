import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  ThemeProvider,
  Alert,
  Badge,
  Button,
  Card,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  Textarea,
} from '@seanhong1215/my-design-system'
import type { ProductLine, TableColumn } from '@seanhong1215/my-design-system'

// 1) 樣式只需要在整個 app 匯入一次
import '@seanhong1215/my-design-system/styles.css'
// 2) 你自己的頁面樣式（示範如何沿用同一套 token）
import './product.css'

interface Order {
  id: string
  customer: string
  plan: string
  amount: number
}

const orders: Order[] = [
  { id: 'ORD-1001', customer: 'Acme Studio', plan: 'Business', amount: 2480 },
  { id: 'ORD-1002', customer: 'Northwind Labs', plan: 'Starter', amount: 890 },
  { id: 'ORD-1003', customer: 'Bright Ops', plan: 'Enterprise', amount: 7300 },
]

// TableColumn<Order> 會把 dataIndex 限制在 Order 的欄位上，
// 打錯欄位名 tsc 就會報錯。
const columns: TableColumn<Order>[] = [
  { title: '訂單', dataIndex: 'id', key: 'id', sorter: true },
  { title: '客戶', dataIndex: 'customer', key: 'customer', sorter: true },
  {
    title: '方案',
    dataIndex: 'plan',
    key: 'plan',
    render: (value) => <Tag color="primary">{value}</Tag>,
  },
  {
    title: '金額',
    dataIndex: 'amount',
    key: 'amount',
    // value 這裡會被推導成 number | undefined
    render: (value) => `$${value?.toLocaleString()}`,
  },
]

interface WorkspaceForm {
  name: string
  plan: string
  notes: string
}

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [productLine, setProductLine] = useState<ProductLine>('commerce')
  const [modalOpen, setModalOpen] = useState(false)
  const [submitted, setSubmitted] = useState<WorkspaceForm | null>(null)

  // react-hook-form 直接把 register() 展開到元件上即可 ——
  // 元件用 forwardRef 把 ref 指向內層的原生 input / select / textarea。
  const { register, handleSubmit, formState: { errors } } = useForm<WorkspaceForm>()

  const onSubmit = handleSubmit((values) => {
    setSubmitted(values)
    setModalOpen(true)
  })

  return (
    /*
     * global 讓主題屬性寫到 <html>。
     * 少了它，Modal 因為走 portal 掛在 document.body（在這層 div 外面），
     * 會吃不到品牌色與暗色表面。
     */
    <ThemeProvider global productLine={productLine} theme={theme}>
      <main className="page">
        <header className="page__header">
          <div>
            <Space size="sm" wrap>
              <Badge variant="primary">Product A</Badge>
              <Tag color="success">已接上 design system</Tag>
            </Space>
            <h1 className="page__title">工作區管理</h1>
            <p className="page__lede">
              這一頁完全由 <code>@seanhong1215/my-design-system</code> 的公開 API 組成。
            </p>
          </div>

          <Space wrap>
            {/* select 需要可及名稱；placeholder 不算 label */}
            <Select
              aria-label="產品線"
              value={productLine}
              onChange={(e) => setProductLine(e.target.value as ProductLine)}
              placeholder=""
              options={[
                { label: 'Core', value: 'core' },
                { label: 'Commerce', value: 'commerce' },
                { label: 'Finance', value: 'finance' },
                { label: 'Internal', value: 'internal' },
              ]}
            />
            <Button
              variant="secondary"
              onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
            >
              {theme === 'light' ? '切換暗色' : '切換亮色'}
            </Button>
          </Space>
        </header>

        <Alert
          type="info"
          message="切換右上的產品線與明暗看看"
          description="所有元件、以及這一頁自己的樣式，都會跟著 token 一起變。"
        />

        <div className="page__grid">
          {/* 這兩張卡緊接在 h1 之後，標題要是 h2；Card 預設的 h3 會跳級 */}
          <Card title="建立工作區" titleAs="h2" description="表單由 react-hook-form 管理">
            <form onSubmit={onSubmit}>
              <div className="field">
                <label className="field__label" htmlFor="ws-name">工作區名稱</label>
                <Input
                  id="ws-name"
                  placeholder="例如：Acme 電商"
                  status={errors.name ? 'error' : undefined}
                  {...register('name', { required: '此欄必填' })}
                />
                {errors.name && <p className="field__error">{errors.name.message}</p>}
              </div>

              <div className="field">
                <label className="field__label" htmlFor="ws-plan">方案</label>
                <Select
                  id="ws-plan"
                  placeholder="請選擇"
                  status={errors.plan ? 'error' : undefined}
                  options={[
                    { label: 'Starter', value: 'starter' },
                    { label: 'Business', value: 'business' },
                    { label: 'Enterprise', value: 'enterprise' },
                  ]}
                  {...register('plan', { required: '此欄必填' })}
                />
                {errors.plan && <p className="field__error">{errors.plan.message}</p>}
              </div>

              <div className="field">
                <label className="field__label" htmlFor="ws-notes">備註</label>
                <Textarea id="ws-notes" rows={3} {...register('notes')} />
              </div>

              <Space>
                <Button htmlType="submit">建立</Button>
                <Button variant="ghost" htmlType="reset">清除</Button>
              </Space>
            </form>
          </Card>

          <Card title="訂單" titleAs="h2" description="Table 的欄位型別由 Order 推導">
            <Table
              columns={columns}
              dataSource={orders}
              rowKey="id"
              pagination={false}
            />
          </Card>
        </div>

        {/* 這張卡片用你自己的 class，樣式取自同一套 token */}
        <div className="panel">
          <h2 className="panel__title">你自己的區塊</h2>
            <p className="panel__body">
              這個 <code>.panel</code> 不是 library 元件，但因為用了
              <code>var(--color-surface)</code> 等 token，一樣會跟著主題切換。
            </p>
        </div>

        <Modal
          open={modalOpen}
          title="工作區已建立"
          okText="知道了"
          onOk={() => setModalOpen(false)}
          onCancel={() => setModalOpen(false)}
          footer={<Button onClick={() => setModalOpen(false)}>關閉</Button>}
        >
          <p>Modal 是 portal 到 document.body 的，但一樣吃得到目前的主題。</p>
          {submitted && (
            <pre className="panel__code">{JSON.stringify(submitted, null, 2)}</pre>
          )}
        </Modal>
      </main>
    </ThemeProvider>
  )
}
