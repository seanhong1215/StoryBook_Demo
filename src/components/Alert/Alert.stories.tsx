import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import { Button } from '../Button/Button'
import { Alert } from './Alert'

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Alert displays contextual feedback for success, info, warning, and error states.',
      },
    },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = {
  args: {
    type: 'info',
    message: 'New update available',
    description: 'Review the release notes before applying the update.',
  },
}

export const Types: Story = {
  render: () => (
    <div className="story-stack">
      <Alert type="success" message="Saved successfully" />
      <Alert type="info" message="Information message" />
      <Alert type="warning" message="Quota almost reached" />
      <Alert type="error" message="Payment failed" />
    </div>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Alert
      type="warning"
      message="Subscription expires soon"
      description="Update billing details to keep this workspace active."
      action={<Button size="sm" variant="secondary">Manage</Button>}
    />
  ),
}

export const Closable: Story = {
  args: {
    type: 'warning',
    message: 'Quota almost reached',
    closable: true,
    onClose: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)

    // Alert 不會自己消失 —— 要不要移除由使用端決定
    await userEvent.click(canvas.getByRole('button', { name: 'Close alert' }))
    await expect(args.onClose).toHaveBeenCalledTimes(1)
    await expect(canvas.getByText('Quota almost reached')).toBeInTheDocument()
  },
}
