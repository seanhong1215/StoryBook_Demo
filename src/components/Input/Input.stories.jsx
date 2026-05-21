import { Input } from './Input'

export default {
  title: 'Data Entry/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Input captures short text values with size, status, prefix, suffix, and clear affordances.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    status: {
      control: 'select',
      options: [undefined, 'error', 'warning'],
    },
    disabled: {
      control: 'boolean',
    },
    allowClear: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
}

export const Basic = {
  args: {
    placeholder: 'Search products',
  },
}

export const Sizes = {
  render: () => (
    <div className="story-stack">
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input" />
      <Input size="lg" placeholder="Large input" />
    </div>
  ),
}

export const WithAffixes = {
  render: () => (
    <div className="story-stack">
      <Input prefix="https://" suffix=".com" placeholder="domain" />
      <Input prefix="$" placeholder="Amount" />
    </div>
  ),
}

export const Status = {
  render: () => (
    <div className="story-stack">
      <Input status="error" placeholder="Required field" />
      <Input status="warning" placeholder="Check this value" />
      <Input disabled placeholder="Disabled input" />
    </div>
  ),
}
