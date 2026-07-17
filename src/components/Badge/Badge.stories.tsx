import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './Badge'

const meta = {
  title: 'Data Display/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Badge labels a compact status or category without interrupting the surrounding layout.',
      },
    },
  },
  argTypes: {
    children: { control: 'text' },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = { args: { children: 'New' } }
export const Success: Story = { args: { variant: 'success', children: 'Active' } }
export const Danger: Story = { args: { variant: 'danger', children: 'Error' } }
export const Warning: Story = { args: { variant: 'warning', children: 'Pending' } }
export const Secondary: Story = { args: { variant: 'secondary', children: 'Draft' } }
export const WithDot: Story = { args: { variant: 'success', dot: true, children: 'Online' } }

export const Sizes: Story = {
  render: () => (
    <div className="story-surface">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="story-surface">
      <Badge variant="primary" dot>New</Badge>
      <Badge variant="success" dot>Active</Badge>
      <Badge variant="danger" dot>Error</Badge>
      <Badge variant="warning" dot>Pending</Badge>
      <Badge variant="secondary" dot>Draft</Badge>
    </div>
  ),
}
