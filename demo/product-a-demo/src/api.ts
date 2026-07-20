/*
 * 假的後端。刻意帶延遲與可注入的失敗，用來把 design system 放在真實壓力下：
 * 載入中、空資料、載入失敗、送出中鎖定、伺服器回傳欄位錯誤。
 *
 * 這些狀態才是產品實際會遇到的，Storybook 的 story 通常只演 happy path。
 */

export interface Order {
  id: string
  customer: string
  plan: 'starter' | 'business' | 'enterprise'
  amount: number
  status: 'paid' | 'pending' | 'failed'
}

/** 讓 reviewer 不用等、也不用改程式就能看到每種狀態 */
export type Scenario = 'normal' | 'slow' | 'empty' | 'error'

const ALL_ORDERS: Order[] = [
  { id: 'ORD-1001', customer: 'Acme Studio', plan: 'business', amount: 2480, status: 'paid' },
  { id: 'ORD-1002', customer: 'Northwind Labs', plan: 'starter', amount: 890, status: 'pending' },
  { id: 'ORD-1003', customer: 'Bright Ops', plan: 'enterprise', amount: 7300, status: 'paid' },
  { id: 'ORD-1004', customer: 'Orbit Retail', plan: 'business', amount: 3150, status: 'failed' },
  { id: 'ORD-1005', customer: 'Lumen Health', plan: 'starter', amount: 640, status: 'paid' },
]

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function fetchOrders(scenario: Scenario, signal?: AbortSignal): Promise<Order[]> {
  await wait(scenario === 'slow' ? 2200 : 600)
  if (signal?.aborted) throw new DOMException('aborted', 'AbortError')
  if (scenario === 'error') throw new Error('無法連線到訂單服務（HTTP 503）')
  if (scenario === 'empty') return []
  return ALL_ORDERS
}

export interface WorkspacePayload {
  name: string
  plan: string
  notes?: string
}

/** 伺服器端驗證失敗：帶回「哪個欄位錯了」，前端要能對應回表單 */
export class FieldError extends Error {
  // 不用 constructor 參數屬性 —— demo 的 tsconfig 開了 erasableSyntaxOnly
  readonly field: keyof WorkspacePayload

  constructor(field: keyof WorkspacePayload, message: string) {
    super(message)
    this.name = 'FieldError'
    this.field = field
  }
}

export async function createWorkspace(payload: WorkspacePayload): Promise<{ id: string }> {
  await wait(1400)

  // 模擬「名稱已被使用」這種只有伺服器知道的錯誤
  if (payload.name.trim().toLowerCase() === 'acme') {
    throw new FieldError('name', '這個名稱已被使用，請換一個')
  }
  // 模擬整體失敗
  if (payload.name.trim().toLowerCase() === 'fail') {
    throw new Error('建立失敗：後端暫時無法處理（HTTP 500）')
  }

  return { id: `WS-${Math.random().toString(36).slice(2, 8).toUpperCase()}` }
}
