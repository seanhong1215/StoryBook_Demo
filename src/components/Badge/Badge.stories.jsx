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

export const AllVariants = {
  render: () => (
    <div className="story-surface">
      <Badge variant="primary">New</Badge>
      <Badge variant="success">Active</Badge>
      <Badge variant="danger">Error</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="secondary">Draft</Badge>
    </div>
  ),
}
