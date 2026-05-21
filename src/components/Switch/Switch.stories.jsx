import { Switch } from './Switch'

export default {
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
    checked: {
      control: 'boolean',
    },
    defaultChecked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export const Basic = {
  args: {
    defaultChecked: true,
  },
}

export const WithLabels = {
  render: () => (
    <div className="story-surface">
      <Switch defaultChecked checkedChildren="On" unCheckedChildren="Off" />
      <Switch checkedChildren="Yes" unCheckedChildren="No" />
    </div>
  ),
}

export const Sizes = {
  render: () => (
    <div className="story-surface">
      <Switch size="sm" defaultChecked />
      <Switch size="md" defaultChecked />
      <Switch size="lg" defaultChecked />
    </div>
  ),
}

export const States = {
  render: () => (
    <div className="story-surface">
      <Switch defaultChecked />
      <Switch disabled />
      <Switch loading defaultChecked />
    </div>
  ),
}
