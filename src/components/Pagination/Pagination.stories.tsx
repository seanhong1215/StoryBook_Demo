import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Pagination } from './Pagination'

const meta = {
  title: 'Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Pagination lets users move through a dataset with current page, total count, and page size controls.',
      },
    },
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

const ControlledPagination = () => {
  const [page, setPage] = useState(2)

  return (
    <Pagination
      current={page}
      total={86}
      pageSize={10}
      onChange={setPage}
    />
  )
}

export const Basic: Story = {
  render: () => <ControlledPagination />,
}

export const Compact: Story = {
  args: {
    current: 1,
    total: 24,
    pageSize: 8,
    showTotal: false,
  },
}

export const Disabled: Story = {
  args: {
    current: 3,
    total: 86,
    disabled: true,
  },
}
