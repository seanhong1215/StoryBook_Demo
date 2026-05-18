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
