import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

const meta = {
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
    children: { control: 'text' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { variant: 'primary', children: 'Primary action' },
}

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary action' },
}

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Dismiss' },
}

export const Danger: Story = {
  args: { variant: 'danger', children: 'Delete' },
}

export const Success: Story = {
  args: { variant: 'success', children: 'Success' },
}

export const Small: Story = {
  args: { variant: 'primary', size: 'sm', children: 'Small' },
}

export const Large: Story = {
  args: { variant: 'primary', size: 'lg', children: 'Large' },
}

export const Disabled: Story = {
  args: { variant: 'primary', children: 'Disabled', disabled: true },
}

export const Loading: Story = {
  args: { variant: 'primary', children: 'Saving', loading: true },
}

export const WithIcons: Story = {
  render: () => (
    <div className="story-surface">
      <Button leftIcon={<span aria-hidden="true">+</span>}>Create</Button>
      <Button variant="secondary" rightIcon={<span aria-hidden="true">&rarr;</span>}>Continue</Button>
    </div>
  ),
}

export const FullWidth: Story = {
  render: () => (
    <div style={{ width: '320px' }}>
      <Button fullWidth>Confirm selection</Button>
    </div>
  ),
}

export const AllVariants: Story = {
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
