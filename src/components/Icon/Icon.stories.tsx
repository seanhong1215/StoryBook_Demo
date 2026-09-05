import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button/Button'
import { Icon } from './Icon'
import type { IconName } from './Icon'

/*
 * 用 Record<IconName, string> 而不是陣列：少列一個圖示就編譯不過，
 * 這份清單不會偷偷跟 IconName 脫節。
 */
const ICON_USAGE: Record<IconName, string> = {
  'close': 'Modal / Alert / Input 的關閉與清除',
  'check': '選取、完成',
  'check-circle': 'Alert type="success"',
  'info-circle': 'Alert type="info"',
  'alert-triangle': 'Alert type="warning"',
  'x-circle': 'Alert type="error"',
  'chevron-up': 'Table 升冪排序中',
  'chevron-down': 'Table 降冪排序中、展開收合',
  'chevron-left': '上一頁',
  'chevron-right': '下一頁',
  'chevron-up-down': 'Table 可排序但未排序',
  'search': '搜尋輸入框',
  'loading': '載入中（搭配 spin）',
}

const meta = {
  title: 'General/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'Icon renders one of the built-in line icons as an inline SVG.',
          '',
          'The set is deliberately small — it covers what the components themselves need',
          'rather than trying to be a general icon library. Every icon shares the same',
          '24×24 grid, 2px stroke and round caps, and is drawn with `currentColor` at',
          '`1em`, so it inherits the colour and size of the surrounding text.',
          '',
          '**Accessibility:** icons are decorative by default (`aria-hidden`), because they',
          'usually sit next to text or inside a button that already has an `aria-label`.',
          'Passing `aria-label` switches the icon to `role="img"` with that name.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    name: { control: 'select', options: Object.keys(ICON_USAGE) },
    size: { control: 'text' },
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    name: 'search',
    size: 24,
  },
}

export const Gallery: Story = {
  args: { name: 'close' },
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: 'var(--spacing-sm)',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
      }}
    >
      {(Object.keys(ICON_USAGE) as IconName[]).map((name) => (
        <div
          key={name}
          style={{
            alignItems: 'center',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            gap: 'var(--spacing-sm)',
            padding: 'var(--spacing-sm)',
          }}
        >
          <Icon name={name} size={20} />
          <span style={{ display: 'grid' }}>
            <code style={{ fontSize: 'var(--font-size-xs)' }}>{name}</code>
            <small style={{ color: 'var(--color-text-muted)' }}>{ICON_USAGE[name]}</small>
          </span>
        </div>
      ))}
    </div>
  ),
}

/** size 預設是 1em，因此不指定時圖示會跟著父層字級走。 */
export const Sizes: Story = {
  args: { name: 'search' },
  render: () => (
    <div style={{ alignItems: 'center', display: 'flex', gap: 'var(--spacing-md)' }}>
      <Icon name="search" size={14} />
      <Icon name="search" size={20} />
      <Icon name="search" size={28} />
      <span style={{ fontSize: 28 }}>
        跟著字級 <Icon name="search" />
      </span>
    </div>
  ),
}

export const Spinning: Story = {
  args: { name: 'loading', spin: true, size: 20 },
}

export const InButtons: Story = {
  args: { name: 'search' },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
      <Button leftIcon={<Icon name="search" />}>Search</Button>
      <Button variant="secondary" rightIcon={<Icon name="chevron-down" />}>More</Button>
      <Button variant="ghost" aria-label="Close panel">
        <Icon name="close" />
      </Button>
    </div>
  ),
}

/** 圖示本身要傳達意義時（旁邊沒有文字），給 aria-label 讓它變成 role="img"。 */
export const WithAccessibleName: Story = {
  args: { name: 'check-circle' },
  render: () => (
    <div style={{ alignItems: 'center', display: 'flex', gap: 'var(--spacing-sm)' }}>
      <Icon name="check-circle" size={20} aria-label="Published" />
      <span>0.1.0</span>
    </div>
  ),
}
