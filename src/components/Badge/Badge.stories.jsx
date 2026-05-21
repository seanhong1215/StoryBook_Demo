import { Badge } from './Badge'

export default {
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
    variant: {
      control: 'select',
      options: ['primary', 'success', 'danger', 'warning', 'secondary'],
      description: 'Semantic color treatment.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Badge density and text size.',
    },
    dot: {
      control: 'boolean',
      description: 'Shows a compact status indicator before the label.',
    },
    children: {
      control: 'text',
      description: 'Badge label.',
    },
  },
}

export const Primary = { args: { children: 'New' } }
export const Success = { args: { variant: 'success', children: 'Active' } }
export const Danger = { args: { variant: 'danger', children: 'Error' } }
export const Warning = { args: { variant: 'warning', children: 'Pending' } }
export const Secondary = { args: { variant: 'secondary', children: 'Draft' } }
export const WithDot = { args: { variant: 'success', dot: true, children: 'Online' } }

export const Sizes = {
  render: () => (
    <div className="story-surface">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
}

export const AllVariants = {
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
