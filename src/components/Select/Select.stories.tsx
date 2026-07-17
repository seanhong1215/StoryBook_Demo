import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select } from './Select'
import type { SelectOption } from './Select'

const options: SelectOption[] = [
  { label: 'Commerce Pro', value: 'commerce-pro' },
  { label: 'Finance Basic', value: 'finance-basic' },
  { label: 'Internal Tools', value: 'internal-tools' },
  { label: 'Legacy Plan', value: 'legacy', disabled: true },
]

const meta = {
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
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    options,
    placeholder: 'Choose a plan',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="story-stack">
      <Select size="sm" options={options} placeholder="Small select" />
      <Select size="md" options={options} placeholder="Medium select" />
      <Select size="lg" options={options} placeholder="Large select" />
    </div>
  ),
}

export const Status: Story = {
  render: () => (
    <div className="story-stack">
      <Select status="error" options={options} placeholder="Plan is required" />
      <Select status="warning" options={options} placeholder="Confirm plan" />
      <Select disabled options={options} placeholder="Disabled select" />
    </div>
  ),
}
