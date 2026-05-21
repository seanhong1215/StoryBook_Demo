import { Button } from '../Button/Button'
import { Dropdown } from './Dropdown'

const items = [
  { key: 'preview', label: 'Preview package' },
  { key: 'pack', label: 'Run npm pack' },
  { key: 'publish', label: 'Publish release' },
  { key: 'archive', label: 'Archive', disabled: true },
]

export default {
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
  argTypes: {
    placement: {
      control: 'select',
      options: ['bottom-start', 'bottom-end'],
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export const Basic = {
  args: {
    items,
    trigger: <Button variant="secondary">Actions</Button>,
  },
}

export const EndAligned = {
  args: {
    items,
    placement: 'bottom-end',
    trigger: <Button>Release menu</Button>,
  },
}
