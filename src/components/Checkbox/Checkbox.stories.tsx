import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from './Checkbox'

const meta = {
  title: 'Data Entry/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Checkbox captures binary choices and supports checked, disabled, and indeterminate states.',
      },
    },
  },
  argTypes: {
    children: { control: 'text' },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    children: 'Receive product updates',
  },
}

export const Checked: Story = {
  args: {
    defaultChecked: true,
    children: 'Enable workspace access',
  },
}

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    children: 'Select all permissions',
  },
}

export const Group: Story = {
  render: () => (
    <div className="story-stack">
      <Checkbox defaultChecked>Read access</Checkbox>
      <Checkbox defaultChecked>Write access</Checkbox>
      <Checkbox>Billing access</Checkbox>
      <Checkbox disabled>Owner access</Checkbox>
    </div>
  ),
}
