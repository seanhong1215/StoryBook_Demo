import type { Decorator, Preview } from '@storybook/react-vite'
import { ThemeProvider } from '../src/theme/ThemeProvider'
import type { ProductLine } from '../src/theme/ThemeProvider'
import '../src/tokens/tokens.css'
import '../src/docs/storybook-docs.css'

/**
 * 用 ThemeProvider 的 global 模式，而不是自己包一層 div。
 *
 * Modal / Tooltip / Dropdown 之後若改走 portal，內容會掛在 document.body，
 * 也就是 decorator 包的那層 div 外面 —— 只包 div 的話 portal 內容拿不到 token。
 * global 模式會把 data-theme / data-product-line 寫到 documentElement，
 * 整個 preview iframe（含 portal 與 body 背景）都吃得到。
 */
const withTheme: Decorator = (Story, context) => (
  <ThemeProvider
    global
    theme={context.globals.theme as 'light' | 'dark'}
    productLine={context.globals.productLine as ProductLine}
  >
    <Story />
  </ThemeProvider>
)

const preview: Preview = {
  decorators: [withTheme],

  globalTypes: {
    theme: {
      description: 'Color scheme',
      toolbar: {
        title: 'Theme',
        icon: 'contrast',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
    productLine: {
      description: 'Brand token set',
      toolbar: {
        title: 'Product line',
        icon: 'paintbrush',
        items: [
          { value: 'core', title: 'Core' },
          { value: 'commerce', title: 'Commerce' },
          { value: 'finance', title: 'Finance' },
          { value: 'internal', title: 'Internal' },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    theme: 'light',
    productLine: 'core',
  },

  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // Phase 4 已把 92 個 story × light/dark 的 axe 違規清到 0，
      // 因此從 'todo' 轉為 'error'：之後任何退步都會讓測試失敗。
      // 個別暫時無法修的 story 可用 story-level parameters 覆寫回 'todo' 並註明原因。
      test: 'error',
    },
    options: {
      storySort: {
        order: [
          'Components',
          ['Showcase', 'Overview', 'Usage'],
          'General',
          ['Button'],
          'Data Display',
          ['Badge', 'Tag', 'Card', 'Tabs', 'Table'],
          'Data Entry',
          ['Input', 'Textarea', 'Select', 'Checkbox', 'Switch', 'Form'],
          'Feedback',
          ['Alert', 'Modal', 'Empty', 'Tooltip'],
          'Navigation',
          ['Dropdown', 'Pagination'],
          'Layout',
          ['Space'],
          'Foundation',
          ['Tokens'],
        ],
      },
    },
  },
}

export default preview
