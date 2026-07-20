import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card } from './Card'
import { Button } from '../Button/Button'
import { Badge } from '../Badge/Badge'

const meta = {
  title: 'Data Display/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'Card groups related content and optional actions in a contained surface.',
          '',
          '**Card does not set its own width.** It fills whatever container you put it in —',
          'width is a layout decision, so constrain it with your own grid/flex container.',
          'These stories are wrapped in a 520px container for demonstration.',
        ].join('\n'),
      },
    },
  },
  // Card 本身不限制寬度，所以 story 要自己給容器 —— 這也正是使用端該做的事
  decorators: [(Story) => <div className="story-stack"><Story /></div>],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    title: 'Project summary',
    description: 'Use a card when a small group of related information needs to be scanned as one unit.',
  },
}

export const WithFooter: Story = {
  render: () => (
    <Card
      title="Pending changes"
      description="Review the proposed settings before applying them to the workspace."
      footer={
        <>
          <Button variant="secondary" size="sm">Cancel</Button>
          <Button variant="primary" size="sm">Apply</Button>
        </>
      }
    />
  ),
}

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    title: 'Usage growth',
    description: 'Use elevated cards when the item needs more prominence than nearby content.',
  },
}

export const Interactive: Story = {
  args: {
    as: 'a',
    href: '#',
    interactive: true,
    variant: 'outlined',
    title: 'Selectable plan',
    description: 'Interactive cards can act as a larger selection target while preserving card structure.',
  },
}

export const Dense: Story = {
  args: {
    padding: 'sm',
    title: 'Compact summary',
    description: 'Dense cards help product screens display more information without custom CSS.',
  },
}

export const WithBadge: Story = {
  render: () => (
    <Card title="System status">
      <div className="story-stack">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px' }}>
          <span>API gateway</span>
          <Badge variant="success">Active</Badge>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px' }}>
          <span>Billing sync</span>
          <Badge variant="warning">Pending</Badge>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px' }}>
          <span>Archive job</span>
          <Badge variant="secondary">Draft</Badge>
        </div>
      </div>
    </Card>
  ),
}

export const FooterAlignment: Story = {
  render: () => (
    <Card
      title="Team access"
      description="Use footer alignment to match product workflow density."
      footerAlign="between"
      footer={
        <>
          <Badge variant="success">Enabled</Badge>
          <Button variant="secondary" size="sm">Manage</Button>
        </>
      }
    />
  ),
}
