import { Tag } from './Tag'

export default {
  title: 'Data Display/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Tag labels attributes, categories, or compact metadata with optional close affordance.',
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger'],
    },
    closable: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
  },
}

export const Basic = {
  args: {
    children: 'Commerce',
  },
}

export const Colors = {
  render: () => (
    <div className="story-surface">
      <Tag>Default</Tag>
      <Tag color="primary">Primary</Tag>
      <Tag color="success">Success</Tag>
      <Tag color="warning">Warning</Tag>
      <Tag color="danger">Danger</Tag>
    </div>
  ),
}

export const Closable = {
  args: {
    closable: true,
    children: 'Removable',
  },
}
