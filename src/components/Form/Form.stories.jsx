import { Alert } from '../Alert/Alert'
import { Button } from '../Button/Button'
import { Card } from '../Card/Card'
import { Checkbox } from '../Checkbox/Checkbox'
import { Input } from '../Input/Input'
import { Select } from '../Select/Select'
import { Space } from '../Space/Space'
import { Switch } from '../Switch/Switch'
import { Textarea } from '../Textarea/Textarea'
import { Form } from './Form'

const planOptions = [
  { label: 'Commerce Pro', value: 'commerce-pro' },
  { label: 'Finance Basic', value: 'finance-basic' },
  { label: 'Internal Tools', value: 'internal-tools' },
]

export default {
  title: 'Data Entry/Form',
  component: Form,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Form manages field values, validation rules, submit flow, and controlled child components through context.',
      },
    },
  },
  argTypes: {
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
  },
}

export const Basic = {
  render: () => (
    <Card title="Create workspace">
      <Form
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
          <Button variant="secondary" htmlType="reset">Reset</Button>
          <Button type="primary" htmlType="submit">Create</Button>
        </Space>
      </Form>
    </Card>
  ),
}

export const Validation = {
  render: () => (
    <Form
      onFinishFailed={({ errors }) => console.log('errors', errors)}
    >
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
}
