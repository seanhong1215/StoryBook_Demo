import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag } from './Tag'

const meta = {
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
    children: { control: 'text' },
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    children: 'Commerce',
  },
}

export const Colors: Story = {
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

export const Closable: Story = {
  args: {
    closable: true,
    children: 'Removable',
  },
}
