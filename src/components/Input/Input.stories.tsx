import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './Input'

const meta = {
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
    prefix: { control: 'text' },
    suffix: { control: 'text' },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    placeholder: 'Search products',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="story-stack">
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input" />
      <Input size="lg" placeholder="Large input" />
    </div>
  ),
}

export const WithAffixes: Story = {
  render: () => (
    <div className="story-stack">
      <Input prefix="https://" suffix=".com" placeholder="domain" />
      <Input prefix="$" placeholder="Amount" />
    </div>
  ),
}

export const Status: Story = {
  render: () => (
    <div className="story-stack">
      <Input status="error" placeholder="Required field" />
      <Input status="warning" placeholder="Check this value" />
      <Input disabled placeholder="Disabled input" />
    </div>
  ),
}
