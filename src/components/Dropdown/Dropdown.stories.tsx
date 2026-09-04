import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, screen, userEvent, waitFor, within } from 'storybook/test'
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
          'Dropdown reveals contextual actions from a trigger button.',
          '',
          'The menu is rendered through a portal and positioned by the shared `usePopup`',
          'hook, so it flips when it would overflow the viewport and is never clipped by a',
          "parent's `overflow: hidden`.",
          '',
          '**Keyboard:** `ArrowDown` / `ArrowUp` open the menu and move between items,',
          '`Home` / `End` jump to the first / last item, `Escape` and `Tab` close it and',
          'return focus to the trigger. Disabled items are skipped.',
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

/** 選單 portal 到 body，因此不會被父層的 overflow: hidden 裁掉。 */
export const InsideClippingContainer: Story = {
  args: {
    items,
    trigger: 'Actions',
  },
  render: (args) => (
    <div
      style={{
        border: '1px dashed var(--color-border)',
        borderRadius: 'var(--radius-md)',
        height: 72,
        overflow: 'hidden',
        padding: 'var(--spacing-md)',
        width: 260,
      }}
    >
      <Dropdown {...args} />
    </div>
  ),
}

export const KeyboardNavigation: Story = {
  args: {
    items,
    trigger: 'Actions',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: 'Actions' })

    // ArrowDown 開啟選單並把焦點放到第一項
    trigger.focus()
    await userEvent.keyboard('{ArrowDown}')

    const menu = await screen.findByRole('menu')
    const menuItems = within(menu).getAllByRole('menuitem')
    await waitFor(() => expect(menuItems[0]).toHaveFocus())

    // 往下移動；disabled 的 Archive 會被跳過，直接繞回第一項
    await userEvent.keyboard('{ArrowDown}')
    await waitFor(() => expect(menuItems[1]).toHaveFocus())

    await userEvent.keyboard('{End}')
    await waitFor(() => expect(menuItems[2]).toHaveFocus())

    await userEvent.keyboard('{ArrowDown}')
    await waitFor(() => expect(menuItems[0]).toHaveFocus())

    // Escape 關閉選單，焦點回到觸發按鈕
    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument())
    await expect(trigger).toHaveFocus()
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  },
}

export const SelectingAnItem: Story = {
  args: {
    items,
    trigger: 'Actions',
    onSelect: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: 'Actions' })

    await userEvent.click(trigger)
    const menu = await screen.findByRole('menu')
    await userEvent.click(within(menu).getByRole('menuitem', { name: 'Run npm pack' }))

    await expect(args.onSelect).toHaveBeenCalledWith(expect.objectContaining({ key: 'pack' }))
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument())
    await expect(trigger).toHaveFocus()
  },
}
