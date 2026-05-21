import { Button } from './Button'

export default {
  title: 'General/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Button communicates the main action a user can take. Use variants to express priority and intent.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger', 'success'],
      description: 'Visual style and intent.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button height and horizontal padding.',
    },
    disabled: {
      control: 'boolean',
      description: 'Prevents user interaction.',
    },
    loading: {
      control: 'boolean',
      description: 'Shows progress and prevents interaction.',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Expands the button to fill the parent width.',
    },
    children: {
      control: 'text',
      description: 'Button label.',
    },
  },
}

export const Primary = {
  args: { variant: 'primary', children: 'Primary action' },
}

export const Secondary = {
  args: { variant: 'secondary', children: 'Secondary action' },
}

export const Ghost = {
  args: { variant: 'ghost', children: 'Dismiss' },
}

export const Danger = {
  args: { variant: 'danger', children: 'Delete' },
}

export const Success = {
  args: { variant: 'success', children: 'Success' },
}

export const Small = {
  args: { variant: 'primary', size: 'sm', children: 'Small' },
}

export const Large = {
  args: { variant: 'primary', size: 'lg', children: 'Large' },
}

export const Disabled = {
  args: { variant: 'primary', children: 'Disabled', disabled: true },
}

export const Loading = {
  args: { variant: 'primary', children: 'Saving', loading: true },
}

export const WithIcons = {
  render: () => (
    <div className="story-surface">
      <Button leftIcon={<span aria-hidden="true">+</span>}>Create</Button>
      <Button variant="secondary" rightIcon={<span aria-hidden="true">&rarr;</span>}>Continue</Button>
    </div>
  ),
}

export const FullWidth = {
  render: () => (
    <div style={{ width: '320px' }}>
      <Button fullWidth>Confirm selection</Button>
    </div>
  ),
}

export const AllVariants = {
  render: () => (
    <div className="story-surface">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="success">Success</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
}
