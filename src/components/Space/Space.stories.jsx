import { Button } from '../Button/Button'
import { Badge } from '../Badge/Badge'
import { Space } from './Space'

export default {
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
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
    },
    wrap: {
      control: 'boolean',
    },
  },
}

export const Horizontal = {
  render: () => (
    <Space>
      <Button>Save</Button>
      <Button variant="secondary">Cancel</Button>
      <Badge variant="success">Ready</Badge>
    </Space>
  ),
}

export const Vertical = {
  render: () => (
    <Space direction="vertical" align="stretch">
      <Button>Publish</Button>
      <Button variant="secondary">Preview</Button>
      <Button variant="ghost">Discard</Button>
    </Space>
  ),
}
