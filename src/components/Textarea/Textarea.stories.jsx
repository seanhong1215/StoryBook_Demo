import { Textarea } from './Textarea'

export default {
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
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    status: {
      control: 'select',
      options: [undefined, 'error', 'warning'],
    },
    rows: {
      control: 'number',
    },
    showCount: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export const Basic = {
  args: {
    placeholder: 'Describe the release changes',
  },
}

export const WithCount = {
  args: {
    defaultValue: 'Updated package installation workflow.',
    maxLength: 120,
    showCount: true,
  },
}

export const Status = {
  render: () => (
    <div className="story-stack">
      <Textarea status="error" placeholder="Release notes are required" />
      <Textarea status="warning" placeholder="Review before publishing" />
      <Textarea disabled placeholder="Disabled textarea" />
    </div>
  ),
}
