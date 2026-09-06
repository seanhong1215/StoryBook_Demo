import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'
import { Badge } from '../Badge/Badge'
import { Card } from '../Card/Card'
import { Tabs } from './Tabs'
import type { TabItem } from './Tabs'

const items: TabItem[] = [
  {
    key: 'overview',
    label: 'Overview',
    children: <Card title="Overview" description="Track product health and package adoption." />,
  },
  {
    key: 'usage',
    label: 'Usage',
    children: <Card title="Usage" description="Inspect local npm pack and Product A install workflow." />,
  },
  {
    key: 'issues',
    label: 'Issues',
    children: <Badge variant="warning">3 pending reviews</Badge>,
  },
]

const meta = {
  title: 'Data Display/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'Tabs organize related content into switchable sections with line or card',
          'presentation.',
          '',
          '**Keyboard:** the tab list is a single tab stop (roving tabindex). Arrow keys',
          'move between tabs and switch immediately (automatic activation), `Home` / `End`',
          'jump to the first / last tab, and disabled tabs are skipped. The panel itself is',
          'focusable so its content can be scrolled from the keyboard.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Line: Story = {
  args: {
    items,
    defaultActiveKey: 'overview',
  },
}

export const CardTabs: Story = {
  args: {
    items,
    type: 'card',
    defaultActiveKey: 'usage',
  },
}

export const DisabledTab: Story = {
  args: {
    items: [
      ...items,
      { key: 'billing', label: 'Billing', disabled: true, children: 'Billing is disabled.' },
    ],
  },
}

const withDisabled: TabItem[] = [
  ...items,
  { key: 'billing', label: 'Billing', disabled: true, children: 'Billing is disabled.' },
]

export const KeyboardNavigation: Story = {
  args: {
    items: withDisabled,
    label: 'Product sections',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const tab = (name: string) => canvas.getByRole('tab', { name })

    // 沒指定 defaultActiveKey 時預設選第一個
    await expect(tab('Overview')).toHaveAttribute('aria-selected', 'true')
    // roving tabindex：整組分頁只有一個 tab stop
    await expect(tab('Usage')).toHaveAttribute('tabindex', '-1')

    tab('Overview').focus()
    await userEvent.keyboard('{ArrowRight}')
    await waitFor(() => expect(tab('Usage')).toHaveFocus())
    await expect(tab('Usage')).toHaveAttribute('aria-selected', 'true')

    // 方向鍵會跳過停用中的 Billing，直接繞回第一個
    await userEvent.keyboard('{ArrowRight}')
    await waitFor(() => expect(tab('Issues')).toHaveFocus())
    await userEvent.keyboard('{ArrowRight}')
    await waitFor(() => expect(tab('Overview')).toHaveFocus())

    // End 落在最後一個「可用」的分頁，不是 Billing
    await userEvent.keyboard('{End}')
    await waitFor(() => expect(tab('Issues')).toHaveFocus())

    // tab 與 tabpanel 互相關聯
    const panel = canvas.getByRole('tabpanel')
    await expect(panel).toHaveAttribute('aria-labelledby', tab('Issues').id)
    await expect(tab('Issues')).toHaveAttribute('aria-controls', panel.id)
  },
}
