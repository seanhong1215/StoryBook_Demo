import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, waitFor, within } from 'storybook/test'
import { Alert } from '../Alert/Alert'
import { Button } from '../Button/Button'
import { Card } from '../Card/Card'
import { Checkbox } from '../Checkbox/Checkbox'
import { Input } from '../Input/Input'
import type { InputProps } from '../Input/Input'
import { Select } from '../Select/Select'
import type { SelectOption } from '../Select/Select'
import { Space } from '../Space/Space'
import { Switch } from '../Switch/Switch'
import { Textarea } from '../Textarea/Textarea'
import { Form } from './Form'

const planOptions: SelectOption[] = [
  { label: 'Commerce Pro', value: 'commerce-pro' },
  { label: 'Finance Basic', value: 'finance-basic' },
  { label: 'Internal Tools', value: 'internal-tools' },
]

const meta = {
  title: 'Data Entry/Form',
  component: Form,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'Form manages field values, validation, and the submit flow, wiring controlled',
          'props onto a single child control per `Form.Item`.',
          '',
          '**Validation timing:** fields validate on submit by default. A field that already',
          'has an error re-validates as you type, so the message clears the moment it is',
          'fixed. Set `validateTrigger="onBlur"` or `"onChange"` — on the form or on one',
          'item — for earlier feedback.',
          '',
          '**`Form.useForm()`** returns an instance for reading and writing from outside:',
          '`getFieldsValue`, `setFieldsValue`, `resetFields`, `validateFields`, `submit`.',
          '',
          'Values live in an external store rather than in context, so typing in one field',
          'only re-renders that field.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof Form>

export default meta
type Story = StoryObj<typeof meta>

const BasicForm = () => {
  const form = Form.useForm()

  return (
    <Card title="Create workspace">
      <Form
        form={form}
        initialValues={{ inviteTeam: true, enabled: true }}
        onFinish={(values) => console.log('submit', values)}
      >
        <Form.Item
          name="name"
          label="Workspace name"
          rules={[{ required: true, message: 'Workspace name is required.' }]}
        >
          <Input placeholder="Acme workspace" />
        </Form.Item>
        <Form.Item
          name="plan"
          label="Plan"
          rules={[{ required: true, message: 'Choose a plan.' }]}
        >
          <Select options={planOptions} placeholder="Choose a plan" />
        </Form.Item>
        <Form.Item name="notes" label="Release notes">
          <Textarea rows={3} placeholder="Describe the workspace setup" />
        </Form.Item>
        <Form.Item name="inviteTeam" valuePropName="checked">
          <Checkbox>Invite team members</Checkbox>
        </Form.Item>
        <Form.Item name="enabled" valuePropName="checked">
          <Switch checkedChildren="On" unCheckedChildren="Off" />
        </Form.Item>
        <Space>
          {/*
            原生的 htmlType="reset" 只會重設 DOM，控制項的值來自 store，
            畫面不會有任何變化 —— 要用實例的 resetFields()
          */}
          <Button variant="secondary" onClick={() => form.resetFields()}>Reset</Button>
          <Button type="primary" htmlType="submit">Create</Button>
        </Space>
      </Form>
    </Card>
  )
}

export const Basic: Story = {
  render: () => <BasicForm />,
}

export const Validation: Story = {
  render: () => (
    <Form onFinishFailed={({ errors }) => console.log('errors', errors)}>
      <Alert type="info" message="Submit the empty form to see validation states." />
      <Form.Item
        name="email"
        label="Owner email"
        rules={[
          { required: true, message: 'Owner email is required.' },
          { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email.' },
        ]}
      >
        <Input placeholder="owner@example.com" />
      </Form.Item>
      <Button type="primary" htmlType="submit">Submit</Button>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByRole('button', { name: 'Submit' }))
    await waitFor(() => expect(canvas.getByText('Owner email is required.')).toBeInTheDocument())

    // 已經出錯的欄位，打字時立刻重驗 —— 不用再送出一次才知道格式也不對
    const input = canvas.getByLabelText('Owner email')
    await userEvent.type(input, 'not-an-email')
    await waitFor(() => expect(canvas.getByText('Enter a valid email.')).toBeInTheDocument())

    // 修好之後錯誤立刻消失
    await userEvent.clear(input)
    await userEvent.type(input, 'owner@example.com')
    await waitFor(() => expect(canvas.queryByText('Enter a valid email.')).not.toBeInTheDocument())
  },
}

/** `validateTrigger="onBlur"`：離開欄位就驗，不必等到送出。 */
export const ValidateOnBlur: Story = {
  render: () => (
    <Form validateTrigger="onBlur">
      <Form.Item
        name="email"
        label="Owner email"
        rules={[{ required: true, message: 'Owner email is required.' }]}
      >
        <Input placeholder="owner@example.com" />
      </Form.Item>
      <Form.Item name="notes" label="Notes">
        <Input placeholder="Anything else" />
      </Form.Item>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // 只是進去又離開，沒有送出，錯誤就已經出現
    canvas.getByLabelText('Owner email').focus()
    await userEvent.tab()
    await waitFor(() => expect(canvas.getByText('Owner email is required.')).toBeInTheDocument())
  },
}

const InstanceForm = ({ onFinish }: { onFinish: (values: Record<string, unknown>) => void }) => {
  const form = Form.useForm()

  return (
    <div className="story-stack">
      <Space>
        <Button
          variant="secondary"
          onClick={() => form.setFieldsValue({ name: 'Acme workspace', plan: 'commerce-pro' })}
        >
          Fill example
        </Button>
        <Button variant="secondary" onClick={() => form.resetFields()}>Reset</Button>
        <Button variant="secondary" onClick={() => form.submit()}>Submit from outside</Button>
      </Space>
      <Form form={form} initialValues={{ name: '' }} onFinish={onFinish}>
        <Form.Item name="name" label="Workspace name" rules={[{ required: true, message: 'Required.' }]}>
          <Input placeholder="Acme workspace" />
        </Form.Item>
        <Form.Item name="plan" label="Plan">
          <Select options={planOptions} />
        </Form.Item>
      </Form>
    </div>
  )
}

/** `Form.useForm()` 讓表單外的按鈕也能讀寫、重設與送出。 */
export const WithFormInstance: Story = {
  args: { onFinish: fn() },
  render: ({ onFinish }) => <InstanceForm onFinish={onFinish!} />,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByLabelText('Workspace name')

    await userEvent.click(canvas.getByRole('button', { name: 'Fill example' }))
    await waitFor(() => expect(input).toHaveValue('Acme workspace'))

    // submit() 走原生 requestSubmit()，跟使用者按送出鈕是同一條路徑
    await userEvent.click(canvas.getByRole('button', { name: 'Submit from outside' }))
    await waitFor(() => expect(args.onFinish).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Acme workspace', plan: 'commerce-pro' }),
    ))

    await userEvent.click(canvas.getByRole('button', { name: 'Reset' }))
    await waitFor(() => expect(input).toHaveValue(''))
  },
}

/*
 * 純粹為了讓「只有動到的欄位會重繪」看得見。
 * 正式元件不該在 render 期間改動模組變數。
 */
const renderCounts = new Map<string, number>()

const CountedInput = ({ trackKey, ...props }: { trackKey: string } & InputProps) => {
  const count = (renderCounts.get(trackKey) ?? 0) + 1
  renderCounts.set(trackKey, count)

  return (
    <span className="story-stack">
      <Input {...props} />
      <small style={{ color: 'var(--color-text-muted)' }}>{`${trackKey} renders: ${count}`}</small>
    </span>
  )
}

/**
 * 值放在外部 store、每個欄位各自訂閱，因此在一個欄位打字不會讓其他欄位重繪。
 * 值若放在 context，下面兩個計數會一起往上跳。
 */
export const IsolatedRerenders: Story = {
  render: () => (
    <Form>
      <Form.Item name="first" label="First field">
        <CountedInput trackKey="first" />
      </Form.Item>
      <Form.Item name="second" label="Second field">
        <CountedInput trackKey="second" />
      </Form.Item>
    </Form>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const secondCountBefore = canvas.getByText(/^second renders:/).textContent

    await userEvent.type(canvas.getByLabelText('First field'), 'hello')
    await waitFor(() => expect(canvas.getByLabelText('First field')).toHaveValue('hello'))

    // 第二個欄位完全沒有重繪，計數停在原地
    await expect(canvas.getByText(/^second renders:/)).toHaveTextContent(secondCountBefore!)
  },
}
