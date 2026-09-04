import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, screen, userEvent, waitFor, within } from 'storybook/test'
import { Button } from '../Button/Button'
import { Space } from '../Space/Space'
import { Tooltip } from './Tooltip'

const meta = {
  title: 'Feedback/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'Tooltip provides short contextual help on hover or keyboard focus.',
          '',
          'The bubble is rendered through a portal and positioned by the shared `usePopup`',
          'hook, so it flips when it would overflow the viewport and is never clipped by a',
          "parent's `overflow: hidden`.",
          '',
          '**Accessibility:** while open, the tooltip is linked to the trigger with',
          '`aria-describedby`, and `Escape` dismisses it. If `children` is not focusable',
          '(plain text, for example), the wrapper becomes the tab stop so keyboard users can',
          'still reach the tooltip — a focusable child keeps its own single tab stop.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    title: 'Build and pack before installing in Product A.',
    children: <Button variant="secondary">Hover me</Button>,
  },
}

export const Placements: Story = {
  render: () => (
    <Space>
      <Tooltip title="Top placement" placement="top">
        <Button variant="secondary">Top</Button>
      </Tooltip>
      <Tooltip title="Bottom placement" placement="bottom">
        <Button variant="secondary">Bottom</Button>
      </Tooltip>
      <Tooltip title="Left placement" placement="left">
        <Button variant="secondary">Left</Button>
      </Tooltip>
      <Tooltip title="Right placement" placement="right">
        <Button variant="secondary">Right</Button>
      </Tooltip>
    </Space>
  ),
}

/** 長內容會換行，不會像舊版 white-space: nowrap 那樣衝出泡泡。 */
export const LongContent: Story = {
  args: {
    title: 'This library is published to GitHub Packages, so installing it needs an authenticated .npmrc.',
    children: <Button variant="secondary">Install notes</Button>,
  },
}

/** children 不可 focus 時，wrapper 會接手成為 tab stop。 */
export const PlainTextTrigger: Story = {
  args: {
    title: 'Semantic version of the published package.',
    children: <span style={{ borderBottom: '1px dotted currentColor' }}>0.1.0</span>,
  },
}

/**
 * 觸發元素貼著視窗上緣時，placement="top" 會自動翻到下方。
 * 舊版純 CSS 定位沒有邊界偵測，這裡會直接被切掉。
 */
export const FlipsNearViewportEdge: Story = {
  args: {
    title: 'Not enough room above, so this flipped below.',
    placement: 'top',
    open: true,
    children: <Button variant="secondary">Near the top edge</Button>,
  },
  play: async () => {
    const tooltip = await screen.findByRole('tooltip')
    await waitFor(() => expect(tooltip).toHaveAttribute('data-placement', 'bottom'))
  },
}

export const KeyboardAndEscape: Story = {
  args: {
    title: 'Shown on focus, dismissed with Escape.',
    children: <Button variant="secondary">Focus me</Button>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: 'Focus me' })

    // 鍵盤 focus 立即顯示（不套用 mouseEnterDelay）
    trigger.focus()
    const tooltip = await screen.findByRole('tooltip')

    // aria-describedby 掛在真正被 focus 的 <button> 上，而不是外層 wrapper
    await waitFor(() => expect(trigger).toHaveAttribute('aria-describedby', tooltip.id))

    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument())
    await expect(trigger).not.toHaveAttribute('aria-describedby')
  },
}
