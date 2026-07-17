import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button/Button'
import { Space } from '../Space/Space'
import { Tooltip } from './Tooltip'

const meta = {
  title: 'Feedback/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Tooltip provides short contextual help on hover or keyboard focus.',
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    title: 'Build and pack before installing in Product A.',
    children: <Button variant="secondary">Hover me</Button>,
  },
}

export const Placements: Story = {
  render: () => (
    <Space>
      <Tooltip title="Top placement" placement="top">
        <Button variant="secondary">Top</Button>
      </Tooltip>
      <Tooltip title="Bottom placement" placement="bottom">
        <Button variant="secondary">Bottom</Button>
      </Tooltip>
      <Tooltip title="Left placement" placement="left">
        <Button variant="secondary">Left</Button>
      </Tooltip>
      <Tooltip title="Right placement" placement="right">
        <Button variant="secondary">Right</Button>
      </Tooltip>
    </Space>
  ),
}
