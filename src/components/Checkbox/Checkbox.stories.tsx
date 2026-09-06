import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import { Checkbox } from './Checkbox'

const meta = {
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
    children: { control: 'text' },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    children: 'Receive product updates',
  },
}

export const Checked: Story = {
  args: {
    defaultChecked: true,
    children: 'Enable workspace access',
  },
}

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    children: 'Select all permissions',
  },
}

export const Group: Story = {
  render: () => (
    <div className="story-stack">
      <Checkbox defaultChecked>Read access</Checkbox>
      <Checkbox defaultChecked>Write access</Checkbox>
      <Checkbox>Billing access</Checkbox>
      <Checkbox disabled>Owner access</Checkbox>
    </div>
  ),
}

export const Interaction: Story = {
  args: {
    children: 'Receive product updates',
    onChange: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const box = canvas.getByRole('checkbox', { name: 'Receive product updates' })

    await expect(box).not.toBeChecked()
    await userEvent.click(box)
    await expect(box).toBeChecked()
    await expect(args.onChange).toHaveBeenCalledTimes(1)
  },
}

/** indeterminate 沒有對應的 HTML 屬性，只能透過 DOM property 設定。 */
export const IndeterminateIsDomOnly: Story = {
  args: {
    indeterminate: true,
    children: 'Select all permissions',
  },
  play: async ({ canvasElement }) => {
    const box = within(canvasElement).getByRole('checkbox') as HTMLInputElement

    await expect(box.indeterminate).toBe(true)
    // 半選不等於已選：value 仍然是未勾選
    await expect(box).not.toBeChecked()
  },
}

export const DisabledDoesNotToggle: Story = {
  args: {
    disabled: true,
    children: 'Owner access',
    onChange: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const box = within(canvasElement).getByRole('checkbox')

    await userEvent.click(box)
    await expect(box).not.toBeChecked()
    await expect(args.onChange).not.toHaveBeenCalled()
  },
}
