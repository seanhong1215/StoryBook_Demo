import { Alert } from '../components/Alert/Alert'
import { Badge } from '../components/Badge/Badge'
import { Button } from '../components/Button/Button'
import { Card } from '../components/Card/Card'
import { Checkbox } from '../components/Checkbox/Checkbox'
import { Dropdown } from '../components/Dropdown/Dropdown'
import { Form, FormItem } from '../components/Form/Form'
import { Input } from '../components/Input/Input'
import { Select } from '../components/Select/Select'
import { Space } from '../components/Space/Space'
import { Switch } from '../components/Switch/Switch'
import { Table } from '../components/Table/Table'
import { Tag } from '../components/Tag/Tag'
import { Textarea } from '../components/Textarea/Textarea'
import { Tooltip } from '../components/Tooltip/Tooltip'
import { Tabs } from '../components/Tabs/Tabs'
import { ThemeProvider } from '../theme/ThemeProvider'

const metrics = [
  { label: 'Revenue', value: '$128.4K', status: 'success', note: '12.8% up' },
  { label: 'Orders', value: '3,284', status: 'primary', note: '248 pending' },
  { label: 'Risk queue', value: '18', status: 'warning', note: 'Needs review' },
]

const orders = [
  { key: 'ORD-1024', id: 'ORD-1024', customer: 'Acme Studio', plan: 'Commerce Pro', status: 'Active' },
  { key: 'ORD-1025', id: 'ORD-1025', customer: 'Northwind', plan: 'Finance Basic', status: 'Pending' },
  { key: 'ORD-1026', id: 'ORD-1026', customer: 'Orbit Ops', plan: 'Internal Tools', status: 'Draft' },
]

const planOptions = [
  { label: 'Commerce Pro', value: 'commerce-pro' },
  { label: 'Finance Basic', value: 'finance-basic' },
  { label: 'Internal Tools', value: 'internal-tools' },
]

const statusVariant = {
  Active: 'success',
  Pending: 'warning',
  Draft: 'secondary',
}

const orderColumns = [
  { title: 'Order', dataIndex: 'id', sorter: (a, b) => a.id.localeCompare(b.id) },
  { title: 'Customer', dataIndex: 'customer', sorter: (a, b) => a.customer.localeCompare(b.customer) },
  {
    title: 'Plan',
    dataIndex: 'plan',
    render: (plan) => <Tag color="primary">{plan}</Tag>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (status) => <Badge variant={statusVariant[status]} dot>{status}</Badge>,
  },
]

export default {
  title: 'Components/Showcase',
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: null,
    },
  },
}

export const AdminDashboard = {
  render: () => (
    <ThemeProvider productLine="commerce">
      <main className="showcase-page">
        <header className="showcase-header">
          <div>
            <p className="docs-kicker">Interview Portfolio</p>
            <h1 className="docs-title">Small Product Admin UI</h1>
            <p className="docs-lede">
              A compact Ant Design-inspired component library that can be installed into
              another React product with local npm pack or file dependencies.
            </p>
          </div>
          <Space wrap>
            <Dropdown
              trigger={<Button variant="secondary">Package actions</Button>}
              items={[
                { key: 'preview', label: 'Preview package' },
                { key: 'pack', label: 'Run npm pack' },
                { key: 'install', label: 'Install in Product A' },
              ]}
            />
            <Button type="primary">Create release</Button>
          </Space>
        </header>

        <section className="showcase-grid showcase-grid--metrics">
          {metrics.map((metric) => (
            <Card
              title={metric.label}
              extra={<Badge variant={metric.status}>{metric.note}</Badge>}
              variant="elevated"
              key={metric.label}
            >
              <div className="showcase-metric">{metric.value}</div>
            </Card>
          ))}
        </section>

        <section className="showcase-grid">
          <Card
            title="Create workspace"
            description="Validated form composition with field rules and submit handling."
          >
            <Form initialValues={{ invite: true }}>
              <FormItem
                name="workspace"
                label="Workspace name"
                rules={[{ required: true, message: 'Workspace name is required.' }]}
              >
                <Input placeholder="Workspace name" />
              </FormItem>
              <FormItem name="url" label="Workspace URL">
                <Input prefix="https://" suffix=".app" placeholder="workspace-url" />
              </FormItem>
              <FormItem name="notes" label="Release notes">
                <Textarea rows={3} placeholder="Release notes" showCount maxLength={120} />
              </FormItem>
              <FormItem
                name="plan"
                label="Plan"
                rules={[{ required: true, message: 'Choose a plan.' }]}
              >
                <Select options={planOptions} placeholder="Choose a plan" />
              </FormItem>
              <FormItem name="invite" valuePropName="checked">
                <Checkbox>Invite team</Checkbox>
              </FormItem>
              <Space>
                <Button variant="secondary">Cancel</Button>
                <Button htmlType="submit" type="primary">Create</Button>
                <Switch defaultChecked checkedChildren="On" unCheckedChildren="Off" />
              </Space>
              <Alert
                type="info"
                message="Local package ready"
                description="Install the packed tarball in Product A to validate external import behavior."
              />
            </Form>
          </Card>

          <Card
            title="Recent orders"
            extra={
              <Tooltip title="Open the full orders list">
                <Button type="link">View all</Button>
              </Tooltip>
            }
          >
            <Tabs
              items={[
                {
                  key: 'orders',
                  label: 'Orders',
                  children: (
                    <Table
                      columns={orderColumns}
                      dataSource={orders}
                      pagination={{ pageSize: 2 }}
                      rowSelection={{ selectedRowKeys: ['ORD-1024'] }}
                    />
                  ),
                },
                {
                  key: 'reviews',
                  label: 'Reviews',
                  children: <Alert type="success" message="No pending reviews" />,
                },
              ]}
            />
          </Card>
        </section>
      </main>
    </ThemeProvider>
  ),
}
