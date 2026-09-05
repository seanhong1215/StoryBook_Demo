import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'
import { ConfigProvider } from '../config/ConfigProvider'
import type { Locale } from '../locale/types'
import { en } from '../locale/en'
import { zhTW } from '../locale/zh-TW'
import { Empty } from '../components/Empty/Empty'
import { Input } from '../components/Input/Input'
import { Pagination } from '../components/Pagination/Pagination'
import { Select } from '../components/Select/Select'

const meta = {
  title: 'Foundation/Localization',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '`ConfigProvider` supplies the copy that components render themselves — default',
          'button labels, empty states, and the accessible names of controls that have no',
          'visible text (the clear button, the row checkboxes, the page buttons).',
          '',
          'Anything you pass as a prop always wins; the locale is only the default. Without',
          'a provider components fall back to `en`, so nothing has to be wrapped just to',
          'render.',
          '',
          'Values that need a number are functions rather than templates, because the word',
          'order differs per language: `共 6 筆` and `6 items` cannot come from one',
          '`{n} …` string.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const Sample = ({ locale }: { locale: Locale }) => (
  <ConfigProvider locale={locale}>
    <div className="story-stack">
      <strong>{locale.locale}</strong>
      <Select aria-label={`plan (${locale.locale})`} options={[{ label: 'Commerce Pro', value: 'a' }]} />
      <Input allowClear defaultValue="ORD-1024" aria-label={`order (${locale.locale})`} />
      <Pagination current={2} total={48} pageSize={10} />
      <Empty />
    </div>
  </ConfigProvider>
)

export const Comparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--spacing-xl)', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
      <Sample locale={en} />
      <Sample locale={zhTW} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // 元件自己渲染的文案跟著 locale 走
    await expect(canvas.getByText('請選擇')).toBeInTheDocument()
    await expect(canvas.getByText('上一頁')).toBeInTheDocument()
    await expect(canvas.getByText('共 48 筆')).toBeInTheDocument()
    await expect(canvas.getByText('沒有資料')).toBeInTheDocument()

    // 沒有可見文字的控制項，無障礙名稱也跟著換
    await expect(canvas.getByRole('button', { name: '清除輸入' })).toBeInTheDocument()
    await expect(canvas.getByRole('button', { name: '第 3 頁' })).toBeInTheDocument()

    // 英文那一側不受影響
    await expect(canvas.getByText('48 items')).toBeInTheDocument()
    await expect(canvas.getByRole('button', { name: 'Clear input' })).toBeInTheDocument()
  },
}

/** 巢狀時只覆寫有傳的項目：內層只換產品線，語系從外層繼承。 */
export const NestedProviders: Story = {
  render: () => (
    <ConfigProvider locale={zhTW}>
      <div className="story-stack">
        {/* 同一頁有兩個分頁時要各自命名，否則以 landmark 導覽時分不出來 */}
        <Pagination current={1} total={30} pageSize={10} label="核心產品線分頁" />
        <ConfigProvider productLine="finance">
          <Pagination current={1} total={30} pageSize={10} label="金融產品線分頁" />
        </ConfigProvider>
      </div>
    </ConfigProvider>
  ),
}
