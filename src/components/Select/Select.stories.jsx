import { Select } from './Select'

const options = [
  { label: 'Commerce Pro', value: 'commerce-pro' },
  { label: 'Finance Basic', value: 'finance-basic' },
  { label: 'Internal Tools', value: 'internal-tools' },
  { label: 'Legacy Plan', value: 'legacy', disabled: true },
]

export default {
  title: 'Data Entry/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Select lets users choose one option from a compact list with size, status, and disabled states.',
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
    placeholder: {
      control: 'text',
    },
  },
}

export const Basic = {
  args: {
    options,
    placeholder: 'Choose a plan',
  },
}

export const Sizes = {
  render: () => (
    <div className="story-stack">
      <Select size="sm" options={options} placeholder="Small select" />
      <Select size="md" options={options} placeholder="Medium select" />
      <Select size="lg" options={options} placeholder="Large select" />
    </div>
  ),
}

export const Status = {
  render: () => (
    <div className="story-stack">
      <Select status="error" options={options} placeholder="Plan is required" />
      <Select status="warning" options={options} placeholder="Confirm plan" />
      <Select disabled options={options} placeholder="Disabled select" />
    </div>
  ),
}
