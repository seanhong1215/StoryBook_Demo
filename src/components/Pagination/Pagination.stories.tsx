import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
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

export const Interaction: Story = {
  args: {
    current: 1,
    total: 30,
    pageSize: 10,
    onChange: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)

    // 第一頁時「上一頁」停用，不會送出 page 0
    await expect(canvas.getByRole('button', { name: 'Previous' })).toBeDisabled()

    await userEvent.click(canvas.getByRole('button', { name: 'Next' }))
    await expect(args.onChange).toHaveBeenCalledWith(2)

    await userEvent.click(canvas.getByRole('button', { name: 'Page 3' }))
    await expect(args.onChange).toHaveBeenCalledWith(3)

    // 點目前這一頁不該重複觸發
    await userEvent.click(canvas.getByRole('button', { name: 'Page 1' }))
    await expect(args.onChange).toHaveBeenCalledTimes(2)
  },
}

export const LastPageDisablesNext: Story = {
  args: {
    current: 3,
    total: 30,
    pageSize: 10,
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByRole('button', { name: 'Next' })).toBeDisabled()
    await expect(canvas.getByRole('button', { name: 'Page 3' })).toHaveAttribute('aria-current', 'page')
  },
}
