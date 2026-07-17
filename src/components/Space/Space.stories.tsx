import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button/Button'
import { Badge } from '../Badge/Badge'
import { Space } from './Space'

const meta = {
  title: 'Layout/Space',
  component: Space,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Space controls spacing between inline or stacked children without writing custom layout CSS.',
      },
    },
  },
} satisfies Meta<typeof Space>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: () => (
    <Space>
      <Button>Save</Button>
      <Button variant="secondary">Cancel</Button>
      <Badge variant="success">Ready</Badge>
    </Space>
  ),
}

export const Vertical: Story = {
  render: () => (
    <Space direction="vertical" align="stretch">
      <Button>Publish</Button>
      <Button variant="secondary">Preview</Button>
      <Button variant="ghost">Discard</Button>
    </Space>
  ),
}
