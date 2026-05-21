import { Button } from '../Button/Button'
import { Alert } from './Alert'

export default {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Alert displays contextual feedback for success, info, warning, and error states.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'info', 'warning', 'error'],
    },
    showIcon: {
      control: 'boolean',
    },
    closable: {
      control: 'boolean',
    },
  },
}

export const Info = {
  args: {
    type: 'info',
    message: 'New update available',
    description: 'Review the release notes before applying the update.',
  },
}

export const Types = {
  render: () => (
    <div className="story-stack">
      <Alert type="success" message="Saved successfully" />
      <Alert type="info" message="Information message" />
      <Alert type="warning" message="Quota almost reached" />
      <Alert type="error" message="Payment failed" />
    </div>
  ),
}

export const WithAction = {
  render: () => (
    <Alert
      type="warning"
      message="Subscription expires soon"
      description="Update billing details to keep this workspace active."
      action={<Button size="sm" variant="secondary">Manage</Button>}
    />
  ),
}
