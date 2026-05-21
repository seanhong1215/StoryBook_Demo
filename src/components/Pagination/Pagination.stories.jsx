import { useState } from 'react'
import { Pagination } from './Pagination'

export default {
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
  argTypes: {
    current: {
      control: 'number',
    },
    total: {
      control: 'number',
    },
    pageSize: {
      control: 'number',
    },
    disabled: {
      control: 'boolean',
    },
    showTotal: {
      control: 'boolean',
    },
  },
}

export const Basic = {
  render: () => {
    const [page, setPage] = useState(2)

    return (
      <Pagination
        current={page}
        total={86}
        pageSize={10}
        onChange={setPage}
      />
    )
  },
}

export const Compact = {
  args: {
    current: 1,
    total: 24,
    pageSize: 8,
    showTotal: false,
  },
}

export const Disabled = {
  args: {
    current: 3,
    total: 86,
    disabled: true,
  },
}
