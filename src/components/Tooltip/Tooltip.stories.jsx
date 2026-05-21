import { Button } from '../Button/Button'
import { Space } from '../Space/Space'
import { Tooltip } from './Tooltip'

export default {
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
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    title: {
      control: 'text',
    },
  },
}

export const Basic = {
  args: {
    title: 'Build and pack before installing in Product A.',
    children: <Button variant="secondary">Hover me</Button>,
  },
}

export const Placements = {
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
