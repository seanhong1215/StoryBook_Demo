import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from './Textarea'

const meta = {
  title: 'Data Entry/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'Textarea captures longer text values with size, validation status, row count, and character count.',
          '',
          '**Accessibility:** a `placeholder` is not a label — it disappears once the user types.',
          'Associate a real `<label>` (via `id`/`htmlFor`) or pass `aria-label`.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    placeholder: 'Describe the release changes',
    'aria-label': 'Release notes',
  },
}

export const WithCount: Story = {
  args: {
    defaultValue: 'Updated package installation workflow.',
    maxLength: 120,
    showCount: true,
    'aria-label': 'Release notes',
  },
}

/** 實務上的正確寫法：用真正的 <label> 搭配 id/htmlFor。 */
export const WithVisibleLabel: Story = {
  name: '搭配可見 label',
  render: () => (
    <div className="story-stack">
      <label htmlFor="release-notes">Release notes</label>
      <Textarea id="release-notes" placeholder="Describe the release changes" />
    </div>
  ),
}

export const Status: Story = {
  render: () => (
    <div className="story-stack">
      <Textarea status="error" placeholder="Release notes are required" aria-label="Release notes, invalid" />
      <Textarea status="warning" placeholder="Review before publishing" aria-label="Release notes, warning" />
      <Textarea disabled placeholder="Disabled textarea" aria-label="Release notes, disabled" />
    </div>
  ),
}
