import { Checkbox } from './Checkbox'

export default {
  title: 'Data Entry/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Checkbox captures binary choices and supports checked, disabled, and indeterminate states.',
      },
    },
  },
  argTypes: {
    checked: {
      control: 'boolean',
    },
    defaultChecked: {
      control: 'boolean',
    },
    indeterminate: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
  },
}

export const Basic = {
  args: {
    children: 'Receive product updates',
  },
}

export const Checked = {
  args: {
    defaultChecked: true,
    children: 'Enable workspace access',
  },
}

export const Indeterminate = {
  args: {
    indeterminate: true,
    children: 'Select all permissions',
  },
}

export const Group = {
  render: () => (
    <div className="story-stack">
      <Checkbox defaultChecked>Read access</Checkbox>
      <Checkbox defaultChecked>Write access</Checkbox>
      <Checkbox>Billing access</Checkbox>
      <Checkbox disabled>Owner access</Checkbox>
    </div>
  ),
}
