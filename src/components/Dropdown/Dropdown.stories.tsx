import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button/Button'
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
        component: 'Dropdown reveals contextual actions from a trigger with click outside dismissal.',
      },
    },
  },
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    items,
    trigger: <Button variant="secondary">Actions</Button>,
  },
}

export const EndAligned: Story = {
  args: {
    items,
    placement: 'bottom-end',
    trigger: <Button>Release menu</Button>,
  },
}
