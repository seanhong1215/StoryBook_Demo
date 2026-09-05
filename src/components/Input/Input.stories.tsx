import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'
import { Input } from './Input'

const meta = {
  title: 'Data Entry/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'Input captures short text values with size, status, prefix, suffix, and clear',
          'affordances.',
          '',
          '`allowClear` clears by writing to the real DOM node and dispatching a real input',
          'event, so `onChange` receives a normal event — `event.target.name`,',
          '`event.target.form` and validity all work, and libraries that read the event',
          '(react-hook-form, for example) behave the same as for typing. It works',
          'controlled and uncontrolled.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    prefix: { control: 'text' },
    suffix: { control: 'text' },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    placeholder: 'Search products',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="story-stack">
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input" />
      <Input size="lg" placeholder="Large input" />
    </div>
  ),
}

export const WithAffixes: Story = {
  render: () => (
    <div className="story-stack">
      <Input prefix="https://" suffix=".com" placeholder="domain" />
      <Input prefix="$" placeholder="Amount" />
    </div>
  ),
}

export const Status: Story = {
  render: () => (
    <div className="story-stack">
      <Input status="error" placeholder="Required field" />
      <Input status="warning" placeholder="Check this value" />
      <Input disabled placeholder="Disabled input" />
    </div>
  ),
}

/**
 * 非受控用法：清除鈕會依「欄位裡目前有沒有字」出現，
 * 按下去輸入框真的會清空（不是只有 onChange 收到通知）。
 */
export const AllowClearUncontrolled: Story = {
  args: {
    allowClear: true,
    defaultValue: 'ORD-1024',
    'aria-label': 'Order number',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox', { name: 'Order number' })

    await userEvent.click(canvas.getByRole('button', { name: 'Clear input' }))

    await waitFor(() => expect(input).toHaveValue(''))
    // 清空後按鈕自己收起來，焦點回到輸入框可以直接接著打字
    await expect(canvas.queryByRole('button', { name: 'Clear input' })).not.toBeInTheDocument()
    await expect(input).toHaveFocus()

    await userEvent.type(input, 'ORD-2048')
    await waitFor(() => expect(canvas.getByRole('button', { name: 'Clear input' })).toBeInTheDocument())
  },
}

const ControlledClearInput = () => {
  const [value, setValue] = useState('ORD-1024')
  const [lastEvent, setLastEvent] = useState('—')

  return (
    <div className="story-stack">
      <Input
        allowClear
        name="keyword"
        aria-label="Keyword"
        value={value}
        onChange={(event) => {
          setValue(event.target.value)
          // 假事件拿不到 name —— 這行在修好之前會印出 undefined
          setLastEvent(`name=${event.target.name} value="${event.target.value}"`)
        }}
      />
      <small style={{ color: 'var(--color-text-muted)' }}>
        最後一次 onChange 收到的 event.target：{lastEvent}
      </small>
    </div>
  )
}

/** 受控用法：清除送出的是真事件，`event.target` 就是那個 `<input>`。 */
export const AllowClearControlled: Story = {
  render: () => <ControlledClearInput />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox', { name: 'Keyword' })

    await userEvent.click(canvas.getByRole('button', { name: 'Clear input' }))

    await waitFor(() => expect(input).toHaveValue(''))
    // target 是真的 DOM 節點，所以 name 拿得到（假事件時是 undefined）
    await expect(canvas.getByText(/name=keyword value=""/)).toBeInTheDocument()
  },
}
