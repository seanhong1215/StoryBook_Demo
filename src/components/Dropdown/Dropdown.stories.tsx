import type { Meta, StoryObj } from '@storybook/react-vite'
import { Dropdown } from './Dropdown'
import type { DropdownItem } from './Dropdown'

const items: DropdownItem[] = [
  { key: 'preview', label: 'Preview package' },
  { key: 'pack', label: 'Run npm pack' },
  { key: 'publish', label: 'Publish release' },
  { key: 'archive', label: 'Archive', disabled: true },
]

const meta = {
  title: 'Navigation/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'Dropdown reveals contextual actions from a trigger with click outside dismissal.',
          '',
          '`trigger` is the **content** of the built-in trigger button — pass text or an icon.',
          'Do not pass a `<Button>`: it would render a button inside a button, which is invalid',
          'HTML and breaks keyboard navigation.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    items,
    trigger: 'Actions',
  },
}

export const EndAligned: Story = {
  args: {
    items,
    placement: 'bottom-end',
    trigger: 'Release menu',
  },
}
