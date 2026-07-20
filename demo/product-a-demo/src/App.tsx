import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  ThemeProvider,
  Alert,
  Badge,
  Button,
  Card,
  Empty,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  Textarea,
} from '@seanhong1215/my-design-system'
import type { ProductLine, TableColumn } from '@seanhong1215/my-design-system'
import '@seanhong1215/my-design-system/styles.css'
import './product.css'

import { createWorkspace, fetchOrders, FieldError } from './api'
import type { Order, Scenario } from './api'

/* ------------------------------------------------------------------ */
/* 訂單清單：載入中 / 空資料 / 失敗 / 有資料 四種狀態                    */
/* ------------------------------------------------------------------ */

type Async<T> =
  | { state: 'loading' }
  | { state: 'error'; error: string }
  | { state: 'ready'; data: T }

/*
 * 這幾張表刻意用 Record<string, ...> 而不是精確的 key 聯集。
 *
 * 原因是 library 的 TableColumn<T> 目前把 render 的 value 型別定成
 * 「T 所有欄位型別的聯集」（此處是 string | number），而不是該欄位自己的型別。
 * 也就是 column 的 dataIndex 與 render 的參數型別沒有連動。
 * 已記入 design system 的 TODO，屬於可改進的型別設計。
 */
const planTone: Record<string, 'default' | 'primary' | 'success'> = {
  starter: 'default', business: 'primary', enterprise: 'success',
}
const statusTone: Record<string, 'success' | 'warning' | 'danger'> = {
  paid: 'success', pending: 'warning', failed: 'danger',
}
const statusText: Record<string, string> = {
  paid: '已付款', pending: '處理中', failed: '失敗',
}

const columns: TableColumn<Order>[] = [
  { title: '訂單', dataIndex: 'id', key: 'id', sorter: true },
  { title: '客戶', dataIndex: 'customer', key: 'customer', sorter: true },
  {
    title: '方案',
    dataIndex: 'plan',
    key: 'plan',
    render: (value) => (value ? <Tag color={planTone[value]}>{value}</Tag> : null),
  },
  {
    title: '狀態',
    dataIndex: 'status',
    key: 'status',
    render: (value) => (value ? <Badge variant={statusTone[value]} dot>{statusText[value]}</Badge> : null),
  },
  {
    title: '金額',
    dataIndex: 'amount',
    key: 'amount',
    render: (value) => `$${value?.toLocaleString()}`,
  },
]

function OrdersPanel({ scenario, onRetry }: { scenario: Scenario; onRetry: () => void }) {
  const [result, setResult] = useState<Async<Order[]>>({ state: 'loading' })

  useEffect(() => {
    // 不需要在這裡 setState 成 loading —— 外層用 key 讓情境改變時整個元件重新掛載，
    // useState 的初始值就是 loading。同步 setState 會觸發 cascading render
    // （react-hooks/set-state-in-effect 會擋）。
    const ac = new AbortController()
    fetchOrders(scenario, ac.signal)
      .then((data) => setResult({ state: 'ready', data }))
      .catch((e: unknown) => {
        if (e instanceof DOMException && e.name === 'AbortError') return
        setResult({ state: 'error', error: e instanceof Error ? e.message : '未知錯誤' })
      })
    // 切換情境時中止上一個請求，避免慢的那個晚回來覆蓋掉新結果
    return () => ac.abort()
  }, [scenario])

  if (result.state === 'loading') {
    // library 目前沒有 Skeleton 元件，這裡用 token 自己刻佔位列
    return (
      <div className="orders-skeleton" role="status" aria-label="訂單載入中">
        {Array.from({ length: 4 }, (_, i) => <span className="skeleton-row" key={i} />)}
      </div>
    )
  }

  if (result.state === 'error') {
    return (
      <Alert
        type="error"
        message="載入訂單失敗"
        description={result.error}
        action={<Button size="sm" variant="secondary" onClick={onRetry}>重試</Button>}
      />
    )
  }

  if (result.data.length === 0) {
    return (
      <Empty
        title="還沒有任何訂單"
        description="第一筆訂單成立後會出現在這裡。"
        actionText="重新載入"
        onAction={onRetry}
      />
    )
  }

  return (
    // container query 的容器；由「這一塊的寬度」決定表格塞不塞得下
    <div className="orders">
      {/* 夠寬：完整表格 */}
      <div className="orders-table">
        <Table columns={columns} dataSource={result.data} rowKey="id" pagination={false} />
      </div>

      {/*
        窄螢幕：轉成卡片列表。
        Table 只有 overflow-x: auto，窄螢幕會變成橫向捲動且沒有捲動提示，
        使用者不會知道右邊還有欄位 —— 所以窄螢幕改用另一種呈現。
      */}
      <ul className="orders-cards">
        {result.data.map((o) => (
          <li className="order-card" key={o.id}>
            <div className="order-card__top">
              <strong>{o.id}</strong>
              <Badge variant={statusTone[o.status]} dot>{statusText[o.status]}</Badge>
            </div>
            <div className="order-card__customer">{o.customer}</div>
            <div className="order-card__bottom">
              <Tag color={planTone[o.plan]}>{o.plan}</Tag>
              <span className="order-card__amount">${o.amount.toLocaleString()}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 建立工作區：非同步送出 + 送出中鎖定 + 伺服器欄位錯誤                   */
/* ------------------------------------------------------------------ */

interface WorkspaceForm {
  name: string
  plan: string
  notes: string
}

function CreateWorkspaceForm({ onCreated }: { onCreated: (id: string) => void }) {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const {
    register, handleSubmit, setError, setFocus, reset,
    formState: { errors, isSubmitting },
  } = useForm<WorkspaceForm>()

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null)
    try {
      const { id } = await createWorkspace(values)
      reset()
      onCreated(id)
    } catch (e) {
      // 伺服器回傳的欄位錯誤要對應回表單，不能只丟一個全域訊息
      if (e instanceof FieldError) {
        const field = e.field as keyof WorkspaceForm
        setError(field, { message: e.message })
        /*
         * 這裡不能用 setError 的 shouldFocus。
         * catch 執行時 isSubmitting 還是 true，欄位仍是 disabled，
         * 對 disabled 的元素呼叫 focus() 不會有任何作用（焦點會留在 body）。
         * 排到下一個 macrotask，等表單解除鎖定後再 focus。
         */
        setTimeout(() => setFocus(field), 0)
        return
      }
      setSubmitError(e instanceof Error ? e.message : '未知錯誤')
    }
  })

  return (
    <form onSubmit={onSubmit} noValidate>
      {submitError && (
        <div className="field">
          <Alert type="error" message="建立失敗" description={submitError} />
        </div>
      )}

      <div className="field">
        <label className="field__label" htmlFor="ws-name">工作區名稱</label>
        <Input
          id="ws-name"
          placeholder="例如：Acme 電商"
          disabled={isSubmitting}
          status={errors.name ? 'error' : undefined}
          aria-describedby={errors.name ? 'ws-name-error' : 'ws-name-hint'}
          {...register('name', { required: '此欄必填' })}
        />
        {errors.name
          ? <p className="field__error" id="ws-name-error" role="alert">{errors.name.message}</p>
          : (
            <p className="field__hint" id="ws-name-hint">
              輸入 <code>acme</code> 觸發欄位錯誤、<code>fail</code> 觸發伺服器錯誤
            </p>
          )}
      </div>

      <div className="field">
        <label className="field__label" htmlFor="ws-plan">方案</label>
        <Select
          id="ws-plan"
          placeholder="請選擇"
          disabled={isSubmitting}
          status={errors.plan ? 'error' : undefined}
          options={[
            { label: 'Starter', value: 'starter' },
            { label: 'Business', value: 'business' },
            { label: 'Enterprise', value: 'enterprise' },
          ]}
          {...register('plan', { required: '此欄必填' })}
        />
        {errors.plan && <p className="field__error" role="alert">{errors.plan.message}</p>}
      </div>

      <div className="field">
        <label className="field__label" htmlFor="ws-notes">備註</label>
        <Textarea id="ws-notes" rows={3} disabled={isSubmitting} {...register('notes')} />
      </div>

      <Space>
        {/* loading 同時顯示進度並阻擋重複送出 */}
        <Button htmlType="submit" loading={isSubmitting}>
          {isSubmitting ? '建立中…' : '建立'}
        </Button>
        <Button variant="ghost" htmlType="reset" disabled={isSubmitting}>清除</Button>
      </Space>
    </form>
  )
}

/* ------------------------------------------------------------------ */

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [productLine, setProductLine] = useState<ProductLine>('commerce')
  const [scenario, setScenario] = useState<Scenario>('normal')
  const [reloadKey, setReloadKey] = useState(0)
  const [createdId, setCreatedId] = useState<string | null>(null)

  const retry = useCallback(() => {
    setScenario('normal')
    setReloadKey((k) => k + 1)
  }, [])

  return (
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
              這一頁完全由 <code>@seanhong1215/my-design-system</code> 的公開 API 組成，
              並刻意涵蓋載入、空資料、錯誤與送出中等真實狀態。
            </p>
          </div>

          <Space wrap>
            <Select
              aria-label="產品線"
              value={productLine}
              onChange={(e) => setProductLine(e.target.value as ProductLine)}
              placeholder={null}
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
          message="這個 demo 可以直接切換各種真實狀態"
          description="訂單卡片右上的「資料情境」可強制進入載入中 / 空資料 / 載入失敗；表單輸入 acme 或 fail 可觸發伺服器錯誤。"
        />

        <div className="page__grid">
          <Card title="建立工作區" titleAs="h2" description="非同步送出、送出中鎖定、伺服器欄位錯誤">
            <CreateWorkspaceForm onCreated={setCreatedId} />
          </Card>

          <div className="panel">
            <h2 className="panel__title">你自己的區塊</h2>
            <p className="panel__body">
              這個 <code>.panel</code> 不是 library 元件，但因為用了
              <code>var(--color-surface)</code> 等 token，一樣會跟著主題切換。
            </p>
          </div>
        </div>

        {/* 資料表獨佔整行 —— 5 欄的表格塞在半寬卡片裡本來就不合理 */}
        <Card
          title="訂單"
          titleAs="h2"
          description="涵蓋載入中 / 空資料 / 載入失敗"
          extra={(
            <Select
              aria-label="資料情境"
              value={scenario}
              onChange={(e) => setScenario(e.target.value as Scenario)}
              placeholder={null}
              size="sm"
              options={[
                { label: '正常', value: 'normal' },
                { label: '慢速載入', value: 'slow' },
                { label: '空資料', value: 'empty' },
                { label: '載入失敗', value: 'error' },
              ]}
            />
          )}
        >
          <OrdersPanel key={`${scenario}-${reloadKey}`} scenario={scenario} onRetry={retry} />
        </Card>

        <Modal
          open={createdId !== null}
          title="工作區已建立"
          okText="知道了"
          onOk={() => setCreatedId(null)}
          onCancel={() => setCreatedId(null)}
          footer={<Button onClick={() => setCreatedId(null)}>關閉</Button>}
        >
          <p>編號 <strong>{createdId}</strong> 已建立。</p>
          <p>Modal 透過 portal 掛在 document.body，但一樣吃得到目前的主題。</p>
        </Modal>
      </main>
    </ThemeProvider>
  )
}
