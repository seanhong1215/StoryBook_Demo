import { useState } from 'react'
import { Badge } from '../Badge/Badge'
import { Tag } from '../Tag/Tag'
import { Table } from './Table'

const dataSource = [
  { key: '1', order: 'ORD-1024', customer: 'Acme Studio', plan: 'Commerce Pro', amount: 1280, status: 'Active' },
  { key: '2', order: 'ORD-1025', customer: 'Northwind', plan: 'Finance Basic', amount: 860, status: 'Pending' },
  { key: '3', order: 'ORD-1026', customer: 'Orbit Ops', plan: 'Internal Tools', amount: 420, status: 'Draft' },
  { key: '4', order: 'ORD-1027', customer: 'Bluebird', plan: 'Commerce Pro', amount: 1460, status: 'Active' },
  { key: '5', order: 'ORD-1028', customer: 'Summit', plan: 'Finance Basic', amount: 970, status: 'Pending' },
  { key: '6', order: 'ORD-1029', customer: 'Atlas', plan: 'Internal Tools', amount: 610, status: 'Active' },
]

const statusVariant = {
  Active: 'success',
  Pending: 'warning',
  Draft: 'secondary',
}

const columns = [
  { title: 'Order', dataIndex: 'order', sorter: (a, b) => a.order.localeCompare(b.order) },
  { title: 'Customer', dataIndex: 'customer' },
  { title: 'Plan', dataIndex: 'plan', render: (value) => <Tag color="primary">{value}</Tag> },
  { title: 'Amount', dataIndex: 'amount', sorter: (a, b) => a.amount - b.amount, render: (value) => `$${value}` },
  { title: 'Status', dataIndex: 'status', render: (value) => <Badge variant={statusVariant[value]}>{value}</Badge> },
]

export default {
  title: 'Data Display/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Table displays structured data with sorting, row selection, pagination, loading, and empty states.',
      },
    },
  },
  argTypes: {
    loading: {
      control: 'boolean',
    },
    emptyText: {
      control: 'text',
    },
  },
}

export const Basic = {
  args: {
    columns,
    dataSource,
  },
}

export const RowSelection = {
  render: () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState(['1'])

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
  },
}

export const EmptyState = {
  args: {
    columns,
    dataSource: [],
    emptyText: 'No orders found',
  },
}
