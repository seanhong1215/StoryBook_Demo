import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, screen, userEvent, waitFor, within } from 'storybook/test'
import { Button } from '../Button/Button'
import { Space } from '../Space/Space'
import { Modal } from './Modal'

const meta = {
  title: 'Feedback/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'Modal presents blocking workflows with portal rendering, Escape close, mask',
          'close, and footer actions.',
          '',
          '**Focus management:** opening moves focus to the dialog panel, `Tab` and',
          '`Shift+Tab` cycle inside it, and closing returns focus to whatever was focused',
          'before. `aria-modal="true"` only announces the dialog to assistive technology —',
          'it does not stop `Tab` from reaching the page behind, so the trap is what',
          'actually keeps keyboard users inside the dialog.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    width: { control: 'number' },
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

const BasicModal = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        open={open}
        title="Create release"
        onCancel={() => setOpen(false)}
        onOk={() => setOpen(false)}
      >
        Confirm this release package before installing it in Product A.
      </Modal>
    </>
  )
}

export const Basic: Story = {
  render: () => <BasicModal />,
}

const CustomFooterModal = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Review changes</Button>
      <Modal
        open={open}
        title="Review component changes"
        footer={
          <Space>
            <Button variant="ghost" onClick={() => setOpen(false)}>Later</Button>
            <Button variant="secondary" onClick={() => setOpen(false)}>Save draft</Button>
            <Button type="primary" onClick={() => setOpen(false)}>Publish</Button>
          </Space>
        }
        onCancel={() => setOpen(false)}
      >
        Use a custom footer when the workflow needs more than confirm and cancel.
      </Modal>
    </>
  )
}

export const CustomFooter: Story = {
  render: () => <CustomFooterModal />,
}

export const FocusTrap: Story = {
  render: () => <BasicModal />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Open modal' }))

    // 開啟後焦點落在面板本身，而不是第一個按鈕
    const dialog = await screen.findByRole('dialog')
    await waitFor(() => expect(dialog).toHaveFocus())

    const close = within(dialog).getByRole('button', { name: 'Close modal' })
    const ok = within(dialog).getByRole('button', { name: 'OK' })

    // 從面板 Shift+Tab 往回會繞到最後一個可 focus 的元素
    await userEvent.tab({ shift: true })
    await waitFor(() => expect(ok).toHaveFocus())

    // 再往後 Tab 會繞回第一個，不會跑到對話框後面的頁面
    await userEvent.tab()
    await waitFor(() => expect(close).toHaveFocus())
  },
}

export const EscapeRestoresFocus: Story = {
  render: () => <BasicModal />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: 'Open modal' })

    await userEvent.click(trigger)
    await screen.findByRole('dialog')

    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    await expect(trigger).toHaveFocus()
  },
}
