import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from './Textarea'

const meta = {
  title: 'Data Entry/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Textarea captures longer text values with size, validation status, row count, and character count.',
      },
    },
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    placeholder: 'Describe the release changes',
  },
}

export const WithCount: Story = {
  args: {
    defaultValue: 'Updated package installation workflow.',
    maxLength: 120,
    showCount: true,
  },
}

export const Status: Story = {
  render: () => (
    <div className="story-stack">
      <Textarea status="error" placeholder="Release notes are required" />
      <Textarea status="warning" placeholder="Review before publishing" />
      <Textarea disabled placeholder="Disabled textarea" />
    </div>
  ),
}
