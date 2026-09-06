import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
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

export const Interaction: Story = {
  args: {
    'aria-label': 'Enable workspace',
    onChange: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const toggle = canvas.getByRole('switch', { name: 'Enable workspace' })

    await expect(toggle).not.toBeChecked()
    await userEvent.click(toggle)
    await expect(toggle).toBeChecked()

    // 點擊後焦點在開關上，Space 應該也能切換
    await userEvent.keyboard(' ')
    await expect(toggle).not.toBeChecked()
    await expect(args.onChange).toHaveBeenCalledTimes(2)
  },
}

export const DisabledDoesNotToggle: Story = {
  args: {
    disabled: true,
    'aria-label': 'Disabled switch',
    onChange: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const toggle = within(canvasElement).getByRole('switch')

    await userEvent.click(toggle)
    await expect(toggle).not.toBeChecked()
    await expect(args.onChange).not.toHaveBeenCalled()
  },
}
