import type { Meta, StoryObj } from '@storybook/react-vite'
import { Switch } from './Switch'

const meta = {
  title: 'Data Entry/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'Switch toggles an immediate on/off setting with size, loading, and disabled states.',
          '',
          '**Accessibility:** a Switch with no `checkedChildren`/`unCheckedChildren` has no',
          'accessible name. Always pass `aria-label`, or associate a visible `<label>`.',
        ].join('\n'),
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
    'aria-label': 'Enable workspace',
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
      <Switch size="sm" defaultChecked aria-label="Small switch" />
      <Switch size="md" defaultChecked aria-label="Medium switch" />
      <Switch size="lg" defaultChecked aria-label="Large switch" />
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="story-surface">
      <Switch defaultChecked aria-label="Checked switch" />
      <Switch disabled aria-label="Disabled switch" />
      <Switch loading defaultChecked aria-label="Loading switch" />
    </div>
  ),
}
