import { useMemo, useState } from 'react'
import {
  Alert,
  Badge,
  Button,
  Card,
  Checkbox,
  Dropdown,
  Form,
  FormItem,
  Input,
  Modal,
  Select,
  Space,
  Switch,
  Table,
  Tabs,
  Tag,
  Textarea,
  ThemeProvider,
  Tooltip,
} from './index'
import type { BadgeProps, FormValues, TableColumn, TableRowKey, TagProps } from './index'
import './App.css'

type OrderStatus = 'paid' | 'pending' | 'review' | 'failed'

interface Order {
  id: string
  customer: string
  plan: string
  status: OrderStatus
  seats: number
  amount: number
}

const orders: Order[] = [
  {
    id: 'ORD-1001',
    customer: 'Acme Studio',
    plan: 'Business',
    status: 'paid',
    seats: 18,
    amount: 2480,
  },
  {
    id: 'ORD-1002',
    customer: 'Northwind Labs',
    plan: 'Starter',
    status: 'pending',
    seats: 6,
    amount: 780,
  },
  {
    id: 'ORD-1003',
    customer: 'Bright Ops',
    plan: 'Enterprise',
    status: 'review',
    seats: 42,
    amount: 8900,
  },
  {
    id: 'ORD-1004',
    customer: 'Orbit Retail',
    plan: 'Business',
    status: 'paid',
    seats: 24,
    amount: 3360,
  },
  {
    id: 'ORD-1005',
    customer: 'Summit CRM',
    plan: 'Starter',
    status: 'failed',
    seats: 4,
    amount: 520,
  },
]

const statusMap: Record<OrderStatus, { label: string; color: TagProps['color']; badge: BadgeProps['variant'] }> = {
  paid: { label: 'Paid', color: 'success', badge: 'success' },
  pending: { label: 'Pending', color: 'warning', badge: 'warning' },
  review: { label: 'Review', color: 'primary', badge: 'primary' },
  failed: { label: 'Failed', color: 'danger', badge: 'danger' },
}

const packageActions = [
  { key: 'pack', label: 'Run npm pack' },
  { key: 'storybook', label: 'Open Storybook' },
  { key: 'umd', label: 'Check UMD bundle' },
]

function App() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<TableRowKey[]>(['ORD-1001'])
  const [modalOpen, setModalOpen] = useState(false)
  const [lastAction, setLastAction] = useState('Ready for local package validation')

  const columns = useMemo<TableColumn<Order>[]>(() => [
    {
      title: 'Order',
      dataIndex: 'id',
      sorter: true,
      render: (value, record) => (
        <div>
          <strong>{value}</strong>
          <div className="muted-text">{record.customer}</div>
        </div>
      ),
    },
    {
      title: 'Plan',
      dataIndex: 'plan',
      sorter: true,
      render: (value) => <Tag color={value === 'Enterprise' ? 'primary' : 'default'}>{value}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_, record) => {
        const status = statusMap[record.status]
        return (
          <Space size="sm">
            <Badge variant={status.badge} dot>
              {status.label}
            </Badge>
          </Space>
        )
      },
    },
    {
      title: 'Seats',
      dataIndex: 'seats',
      sorter: (a, b) => a.seats - b.seats,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      sorter: (a, b) => a.amount - b.amount,
      render: (_, record) => `$${record.amount.toLocaleString()}`,
    },
  ], [])

  const handleSubmit = (values: FormValues) => {
    setLastAction(`Workspace "${values.workspaceName}" is ready to review`)
    setModalOpen(true)
  }

  return (
    <ThemeProvider productLine="commerce">
      <main className="product-shell">
        <header className="product-header">
          <div>
            <Space size="sm" wrap>
              <Badge variant="primary">Local adoption demo</Badge>
              <Tag color="primary">my-design-system</Tag>
            </Space>
            <h1>Product A Admin</h1>
            <p>
              A compact dashboard proving that the component library can be
              imported by another product surface.
            </p>
          </div>
          <Space className="product-actions" wrap>
            <Dropdown
              trigger="Package actions"
              items={packageActions}
              onSelect={(item) => setLastAction(`${item.label} selected`)}
            />
            <Tooltip title="Open the release checklist modal">
              <Button type="primary" onClick={() => setModalOpen(true)}>
                Create release
              </Button>
            </Tooltip>
          </Space>
        </header>

        <Alert
          type="info"
          message={lastAction}
          description="This Vite app imports components from src/index.ts, matching the public package entry used by npm pack consumers."
        />

        <section className="metric-grid" aria-label="Product metrics">
          <Card title="Active tenants" extra={<Tag color="success">+12%</Tag>}>
            <strong className="metric-value">128</strong>
            <span className="muted-text">Across three product lines</span>
          </Card>
          <Card title="Selected orders" extra={<Badge variant="primary">{selectedRowKeys.length}</Badge>}>
            <strong className="metric-value">${selectedRowKeys.length * 2480}</strong>
            <span className="muted-text">Selection state from Table</span>
          </Card>
          <Card title="Package health" extra={<Tag color="primary">Ready</Tag>}>
            <strong className="metric-value">ESM + UMD</strong>
            <span className="muted-text">Validated by build output</span>
          </Card>
        </section>

        <section className="workspace-grid">
          <Card
            title="Create workspace"
            description="A product form assembled from the public design system components."
            footer={(
              <Space wrap>
                <Button variant="secondary">Save draft</Button>
                <Button type="primary" htmlType="submit" form="workspace-form">
                  Submit review
                </Button>
              </Space>
            )}
          >
            <Form
              id="workspace-form"
              initialValues={{
                workspaceName: 'Product A Commerce',
                productLine: 'commerce',
                notes: 'Prepare component validation for a small internal product.',
                enabled: true,
                agreement: true,
              }}
              onFinish={handleSubmit}
            >
              <FormItem
                name="workspaceName"
                label="Workspace name"
                rules={[{ required: true, message: 'Workspace name is required.' }]}
              >
                <Input placeholder="Enter workspace name" />
              </FormItem>
              <FormItem name="productLine" label="Product line">
                <Select
                  options={[
                    { value: 'commerce', label: 'Commerce' },
                    { value: 'finance', label: 'Finance' },
                    { value: 'operations', label: 'Operations' },
                  ]}
                />
              </FormItem>
              <FormItem name="notes" label="Release notes">
                <Textarea rows={4} placeholder="Describe the adoption scope" />
              </FormItem>
              <div className="inline-fields">
                <FormItem name="enabled" label="Enable workspace" valuePropName="checked">
                  <Switch checkedChildren="On" unCheckedChildren="Off" />
                </FormItem>
                <FormItem name="agreement" valuePropName="checked">
                  <Checkbox>Use package entry imports</Checkbox>
                </FormItem>
              </div>
            </Form>
          </Card>

          <Card title="Operations">
            <Tabs
              defaultActiveKey="orders"
              items={[
                {
                  key: 'orders',
                  label: 'Orders',
                  children: (
                    <Table
                      columns={columns}
                      dataSource={orders}
                      rowKey="id"
                      pagination={{ pageSize: 4 }}
                      rowSelection={{
                        selectedRowKeys,
                        onChange: setSelectedRowKeys,
                      }}
                    />
                  ),
                },
                {
                  key: 'review',
                  label: 'Review',
                  children: (
                    <div className="review-panel">
                      <Alert
                        type="success"
                        message="Implementation checklist"
                        description="Storybook documents variants, the package entry exports components, and this demo exercises product-level composition."
                      />
                      <Space wrap>
                        <Tag color="success">npm pack</Tag>
                        <Tag color="primary">Storybook docs</Tag>
                        <Tag color="warning">UMD ready</Tag>
                      </Space>
                    </div>
                  ),
                },
              ]}
            />
          </Card>
        </section>
      </main>

      <Modal
        title="Release checklist"
        open={modalOpen}
        okText="Mark ready"
        cancelText="Close"
        onOk={() => {
          setLastAction('Release checklist marked as ready')
          setModalOpen(false)
        }}
        onCancel={() => setModalOpen(false)}
      >
        <Space direction="vertical" align="stretch">
          <Alert
            type="success"
            message="Product A can consume the local package"
            description="Run npm pack, install the generated tgz in Product A, then import components and styles from my-design-system."
          />
          <code className="install-code">
            npm install ../storybook/my-design-system-*.tgz
          </code>
        </Space>
      </Modal>
    </ThemeProvider>
  )
}

export default App
