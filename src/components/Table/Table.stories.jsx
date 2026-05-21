import { useState } from 'react'
import { Badge } from '../Badge/Badge'
import { Tag } from '../Tag/Tag'
import { Table } from './Table'

const dataSource = [
  { key: '1', order: 'ORD-1024', customer: 'Acme Studio', plan: 'Commerce Pro', status: 'Active' },
  { key: '2', order: 'ORD-1025', customer: 'Northwind', plan: 'Finance Basic', status: 'Pending' },
  { key: '3', order: 'ORD-1026', customer: 'Orbit Ops', plan: 'Internal Tools', status: 'Draft' },
  { key: '4', order: 'ORD-1027', customer: 'Blue Lake', plan: 'Commerce Pro', status: 'Active' },
  { key: '5', order: 'ORD-1028', customer: 'Redwood', plan: 'Finance Basic', status: 'Pending' },
]

const statusVariant = {
  Active: 'success',
  Pending: 'warning',
  Draft: 'secondary',
}

const columns = [
  { title: 'Order', dataIndex: 'order', sorter: true },
  { title: 'Customer', dataIndex: 'customer', sorter: true },
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
  title: 'Data Display/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Table displays structured data with sorting, row selection, pagination, and empty states.',
      },
    },
  },
  argTypes: {
    loading: {
      control: 'boolean',
    },
  },
}

export const Basic = {
  args: {
    columns,
    dataSource,
  },
}

export const Selectable = {
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

export const WithPagination = {
  args: {
    columns,
    dataSource,
    pagination: { pageSize: 2 },
  },
}

export const EmptyState = {
  args: {
    columns,
    dataSource: [],
    emptyText: 'No orders found',
  },
}
