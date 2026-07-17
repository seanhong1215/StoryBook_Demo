import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '../Badge/Badge'
import type { BadgeProps } from '../Badge/Badge'
import { Tag } from '../Tag/Tag'
import { Table } from './Table'
import type { TableColumn, TableRowKey } from './Table'

interface Order {
  key: string
  order: string
  customer: string
  plan: string
  amount: number
  status: 'Active' | 'Pending' | 'Draft'
}

const dataSource: Order[] = [
  { key: '1', order: 'ORD-1024', customer: 'Acme Studio', plan: 'Commerce Pro', amount: 1280, status: 'Active' },
  { key: '2', order: 'ORD-1025', customer: 'Northwind', plan: 'Finance Basic', amount: 860, status: 'Pending' },
  { key: '3', order: 'ORD-1026', customer: 'Orbit Ops', plan: 'Internal Tools', amount: 420, status: 'Draft' },
  { key: '4', order: 'ORD-1027', customer: 'Bluebird', plan: 'Commerce Pro', amount: 1460, status: 'Active' },
  { key: '5', order: 'ORD-1028', customer: 'Summit', plan: 'Finance Basic', amount: 970, status: 'Pending' },
  { key: '6', order: 'ORD-1029', customer: 'Atlas', plan: 'Internal Tools', amount: 610, status: 'Active' },
]

const statusVariant: Record<Order['status'], BadgeProps['variant']> = {
  Active: 'success',
  Pending: 'warning',
  Draft: 'secondary',
}

const columns: TableColumn<Order>[] = [
  { title: 'Order', dataIndex: 'order', sorter: (a, b) => a.order.localeCompare(b.order) },
  { title: 'Customer', dataIndex: 'customer' },
  { title: 'Plan', dataIndex: 'plan', render: (value) => <Tag color="primary">{value}</Tag> },
  { title: 'Amount', dataIndex: 'amount', sorter: (a, b) => a.amount - b.amount, render: (value) => `$${value}` },
  { title: 'Status', dataIndex: 'status', render: (_, record) => <Badge variant={statusVariant[record.status]}>{record.status}</Badge> },
]

const OrderTable = Table<Order>

const meta = {
  title: 'Data Display/Table',
  component: OrderTable,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Table displays structured data with sorting, row selection, pagination, loading, and empty states.',
      },
    },
  },
  argTypes: {
    emptyText: { control: 'text' },
  },
} satisfies Meta<typeof Table<Order>>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    columns,
    dataSource,
  },
}

const SelectableTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<TableRowKey[]>(['1'])

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowSelection={{
        selectedRowKeys,
        onChange: setSelectedRowKeys,
      }}
    />
  )
}

export const RowSelection: Story = {
  render: () => <SelectableTable />,
}

export const EmptyState: Story = {
  args: {
    columns,
    dataSource: [],
    emptyText: 'No orders found',
  },
}
