import { useMemo, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'
import { Badge } from '../Badge/Badge'
import type { BadgeProps } from '../Badge/Badge'
import { Button } from '../Button/Button'
import { Tag } from '../Tag/Tag'
import { Table } from './Table'
import type { TableColumn, TableRowKey, TableSort } from './Table'

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
  { title: 'Order', dataIndex: 'order', sorter: true },
  { title: 'Customer', dataIndex: 'customer' },
  { title: 'Plan', dataIndex: 'plan', render: (value) => <Tag color="primary">{value}</Tag> },
  // sorter: true 走內建比較 —— 數字欄位會依數值排序，不是把 1280 當字串比
  { title: 'Amount', dataIndex: 'amount', sorter: true, render: (value) => `$${value}` },
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
        component: [
          'Table displays structured data with sorting, row selection, pagination, loading,',
          'and empty states.',
          '',
          'Sorting and paging run locally by default. Pass `manual` together with',
          'controlled `sort` / `pagination` and an `onChange` handler to let a server do',
          'the work — Table then renders `dataSource` as-is and only reports what the user',
          'asked for.',
        ].join('\n'),
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

/** `sorter: true` 用內建比較：數字依數值排序，而不是把 1280 當字串排在 420 前面。 */
export const NumericSorting: Story = {
  args: {
    columns,
    dataSource,
    pagination: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByRole('button', { name: /Amount/ }))

    await waitFor(() => {
      const amounts = canvas.getAllByRole('row')
        .slice(1)
        .map((row) => (row as HTMLTableRowElement).cells[3].textContent)
      expect(amounts).toEqual(['$420', '$610', '$860', '$970', '$1280', '$1460'])
    })
  },
}

const ShrinkingTable = () => {
  const [filtered, setFiltered] = useState(false)

  return (
    <div className="story-stack">
      <Button variant="secondary" onClick={() => setFiltered(true)}>
        Filter down to 2 rows
      </Button>
      <Table
        columns={columns}
        dataSource={filtered ? dataSource.slice(0, 2) : dataSource}
        pagination={{ pageSize: 2 }}
      />
    </div>
  )
}

/**
 * 停在最後一頁時上層把資料篩掉大半，頁碼會被夾回有效範圍。
 * 沒有這個夾制的話 slice 會取到空陣列，畫面變成一張空表格。
 */
export const PageClampsWhenDataShrinks: Story = {
  render: () => <ShrinkingTable />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByRole('button', { name: 'Page 3' }))
    await waitFor(() => expect(canvas.getByText('ORD-1029')).toBeInTheDocument())

    await userEvent.click(canvas.getByRole('button', { name: 'Filter down to 2 rows' }))

    await waitFor(() => {
      expect(canvas.getByText('ORD-1024')).toBeInTheDocument()
      expect(canvas.queryByText('No data')).not.toBeInTheDocument()
    })
  },
}

const PAGE_SIZE = 2

/** 假後端：實際專案這裡會是一支 fetch。 */
const fetchOrders = (page: number, sort: TableSort | null) => {
  const rows = sort
    ? [...dataSource].sort((a, b) => {
      const direction = sort.order === 'ascend' ? 1 : -1
      return (sort.columnKey === 'amount'
        ? a.amount - b.amount
        : a.order.localeCompare(b.order)) * direction
    })
    : dataSource

  return {
    rows: rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    total: dataSource.length,
  }
}

const ServerSideTable = () => {
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<TableSort | null>(null)
  const { rows, total } = useMemo(() => fetchOrders(page, sort), [page, sort])

  return (
    <Table
      manual
      columns={columns}
      dataSource={rows}
      sort={sort}
      pagination={{ current: page, pageSize: PAGE_SIZE, total }}
      onChange={(pagination, nextSort) => {
        setPage(pagination.current)
        setSort(nextSort)
      }}
    />
  )
}

/**
 * `manual` 模式：Table 不排序也不切片，只回報使用者要求的狀態，
 * 由外部去後端取那一頁的資料。排序改變時頁碼會回到第 1 頁。
 */
export const ServerSide: Story = {
  render: () => <ServerSideTable />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // 第 1 頁只拿到 2 筆，總數仍是 6，所以分頁器顯示 3 頁
    await expect(canvas.getAllByRole('row')).toHaveLength(3)
    await expect(canvas.getByText('ORD-1024')).toBeInTheDocument()

    await userEvent.click(canvas.getByRole('button', { name: 'Next' }))
    await waitFor(() => expect(canvas.getByText('ORD-1026')).toBeInTheDocument())

    // 排序後回到第 1 頁，資料由「後端」重新給
    await userEvent.click(canvas.getByRole('button', { name: /Amount/ }))
    await waitFor(() => {
      expect(canvas.getByText('$420')).toBeInTheDocument()
      expect(canvas.getByRole('button', { name: 'Page 1' })).toHaveAttribute('aria-current', 'page')
    })
  },
}
