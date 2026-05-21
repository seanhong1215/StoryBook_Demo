import { Alert } from '../components/Alert/Alert'
import { Badge } from '../components/Badge/Badge'
import { Button } from '../components/Button/Button'
import { Card } from '../components/Card/Card'
import { Checkbox } from '../components/Checkbox/Checkbox'
import { Dropdown } from '../components/Dropdown/Dropdown'
import { Input } from '../components/Input/Input'
import { Pagination } from '../components/Pagination/Pagination'
import { Select } from '../components/Select/Select'
import { Space } from '../components/Space/Space'
import { Switch } from '../components/Switch/Switch'
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
  { id: 'ORD-1024', customer: 'Acme Studio', plan: 'Commerce Pro', status: 'Active' },
  { id: 'ORD-1025', customer: 'Northwind', plan: 'Finance Basic', status: 'Pending' },
  { id: 'ORD-1026', customer: 'Orbit Ops', plan: 'Internal Tools', status: 'Draft' },
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
            description="Form-like composition with Input, Alert, Space, and Button."
            footer={
              <Space>
                <Button variant="secondary">Cancel</Button>
                <Button type="primary">Create</Button>
              </Space>
            }
          >
            <Space direction="vertical" align="stretch">
              <Input placeholder="Workspace name" />
              <Input prefix="https://" suffix=".app" placeholder="workspace-url" />
              <Textarea rows={3} placeholder="Release notes" showCount maxLength={120} />
              <Select options={planOptions} placeholder="Choose a plan" />
              <Space>
                <Checkbox defaultChecked>Invite team</Checkbox>
                <Switch defaultChecked checkedChildren="On" unCheckedChildren="Off" />
              </Space>
              <Alert
                type="info"
                message="Local package ready"
                description="Install the packed tarball in Product A to validate external import behavior."
              />
            </Space>
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
                    <Space direction="vertical" align="stretch">
                      <div className="showcase-table" role="table" aria-label="Recent orders">
                        <div className="showcase-table__row showcase-table__row--head" role="row">
                          <span role="columnheader">Order</span>
                          <span role="columnheader">Customer</span>
                          <span role="columnheader">Plan</span>
                          <span role="columnheader">Status</span>
                        </div>
                        {orders.map((order) => (
                          <div className="showcase-table__row" role="row" key={order.id}>
                            <span role="cell">{order.id}</span>
                            <span role="cell">{order.customer}</span>
                            <span role="cell"><Tag color="primary">{order.plan}</Tag></span>
                            <span role="cell">
                              <Badge variant={statusVariant[order.status]} dot>{order.status}</Badge>
                            </span>
                          </div>
                        ))}
                      </div>
                      <Pagination current={1} total={orders.length * 8} pageSize={8} />
                    </Space>
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
