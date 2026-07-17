import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '../Badge/Badge'
import { Card } from '../Card/Card'
import { Tabs } from './Tabs'
import type { TabItem } from './Tabs'

const items: TabItem[] = [
  {
    key: 'overview',
    label: 'Overview',
    children: <Card title="Overview" description="Track product health and package adoption." />,
  },
  {
    key: 'usage',
    label: 'Usage',
    children: <Card title="Usage" description="Inspect local npm pack and Product A install workflow." />,
  },
  {
    key: 'issues',
    label: 'Issues',
    children: <Badge variant="warning">3 pending reviews</Badge>,
  },
]

const meta = {
  title: 'Data Display/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Tabs organize related content into switchable sections with line or card presentation.',
      },
    },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Line: Story = {
  args: {
    items,
    defaultActiveKey: 'overview',
  },
}

export const CardTabs: Story = {
  args: {
    items,
    type: 'card',
    defaultActiveKey: 'usage',
  },
}

export const DisabledTab: Story = {
  args: {
    items: [
      ...items,
      { key: 'billing', label: 'Billing', disabled: true, children: 'Billing is disabled.' },
    ],
  },
}
