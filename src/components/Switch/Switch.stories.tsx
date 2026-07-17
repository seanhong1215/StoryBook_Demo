import type { Meta, StoryObj } from '@storybook/react-vite'
import { Switch } from './Switch'

const meta = {
  title: 'Data Entry/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Switch toggles an immediate on/off setting with size, loading, and disabled states.',
      },
    },
  },
  argTypes: {
    checkedChildren: { control: 'text' },
    unCheckedChildren: { control: 'text' },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    defaultChecked: true,
  },
}

export const WithLabels: Story = {
  render: () => (
    <div className="story-surface">
      <Switch defaultChecked checkedChildren="On" unCheckedChildren="Off" />
      <Switch checkedChildren="Yes" unCheckedChildren="No" />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="story-surface">
      <Switch size="sm" defaultChecked />
      <Switch size="md" defaultChecked />
      <Switch size="lg" defaultChecked />
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="story-surface">
      <Switch defaultChecked />
      <Switch disabled />
      <Switch loading defaultChecked />
    </div>
  ),
}
