import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select } from './Select'
import type { SelectOption } from './Select'

const options: SelectOption[] = [
  { label: 'Commerce Pro', value: 'commerce-pro' },
  { label: 'Finance Basic', value: 'finance-basic' },
  { label: 'Internal Tools', value: 'internal-tools' },
  { label: 'Legacy Plan', value: 'legacy', disabled: true },
]

const meta = {
  title: 'Data Entry/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'Select lets users choose one option from a compact list with size, status, and disabled states.',
          '',
          '**Accessibility:** a `<select>` needs an accessible name. The `placeholder` prop only',
          'renders a prompt option — it is not a label. Associate a real `<label>` (via',
          '`id`/`htmlFor`) or pass `aria-label`.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    options,
    placeholder: 'Choose a plan',
    'aria-label': 'Plan',
  },
}

/**
 * 未選取時應停在 placeholder，而不是自動跳到第一個選項。
 * 這關係到 required 驗證能否運作 —— 若 value 一開始就非空，驗證永遠不會觸發。
 */
export const PlaceholderAndDefaults: Story = {
  name: 'Placeholder / 預設值',
  render: () => (
    <div className="story-stack">
      <div>
        <label htmlFor="sel-empty">未選取（value 為空，required 會擋下）</label>
        <Select id="sel-empty" options={options} placeholder="Choose a plan" />
      </div>
      <div>
        <label htmlFor="sel-default">指定 defaultValue（非受控）</label>
        <Select
          id="sel-default"
          options={options}
          defaultValue="finance-basic"
          placeholder="Choose a plan"
        />
      </div>
      <div>
        <label htmlFor="sel-noplaceholder">不要 placeholder：傳 null，第一個選項會被選中</label>
        <Select id="sel-noplaceholder" options={options} placeholder={null} />
      </div>
      <form style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
        <div>
          <label htmlFor="sel-required">原生 required：直接送出會被瀏覽器擋下</label>
          <Select id="sel-required" options={options} placeholder="Required" required name="plan" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="story-stack">
      <Select size="sm" options={options} placeholder="Small select" aria-label="Small select" />
      <Select size="md" options={options} placeholder="Medium select" aria-label="Medium select" />
      <Select size="lg" options={options} placeholder="Large select" aria-label="Large select" />
    </div>
  ),
}

export const Status: Story = {
  render: () => (
    <div className="story-stack">
      <Select status="error" options={options} placeholder="Plan is required" aria-label="Plan, invalid" />
      <Select status="warning" options={options} placeholder="Confirm plan" aria-label="Plan, warning" />
      <Select disabled options={options} placeholder="Disabled select" aria-label="Plan, disabled" />
    </div>
  ),
}
