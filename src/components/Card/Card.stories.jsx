import { Card } from './Card'
import { Button } from '../Button/Button'
import { Badge } from '../Badge/Badge'

export default {
  title: 'Data Display/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Card groups related content and optional actions in a contained surface.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated', 'ghost'],
      description: 'Surface treatment.',
    },
    padding: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Internal spacing density.',
    },
    interactive: {
      control: 'boolean',
      description: 'Adds pointer affordance and hover feedback.',
    },
    footerAlign: {
      control: 'select',
      options: ['start', 'center', 'between', 'end'],
      description: 'Footer action alignment.',
    },
  },
}

export const Basic = {
  args: {
    title: 'Project summary',
    description: 'Use a card when a small group of related information needs to be scanned as one unit.',
  },
}

export const WithFooter = {
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

export const Elevated = {
  args: {
    variant: 'elevated',
    title: 'Usage growth',
    description: 'Use elevated cards when the item needs more prominence than nearby content.',
  },
}

export const Interactive = {
  args: {
    as: 'a',
    href: '#',
    interactive: true,
    variant: 'outlined',
    title: 'Selectable plan',
    description: 'Interactive cards can act as a larger selection target while preserving card structure.',
  },
}

export const Dense = {
  args: {
    padding: 'sm',
    title: 'Compact summary',
    description: 'Dense cards help product screens display more information without custom CSS.',
  },
}

export const WithBadge = {
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

export const FooterAlignment = {
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
