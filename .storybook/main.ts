import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import remarkGfm from 'remark-gfm'
import type { StorybookConfig } from '@storybook/react-vite'

const configDir = dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: [
    '../src/docs/**/*.mdx',
    '../src/docs/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/tokens/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        /*
         * MDX v3 預設不吃 GFM 表格 —— 說明頁裡的表格會被原封不動印成一串
         * pipe 符號。remark-gfm 補回表格、刪除線與自動連結。
         */
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],
  framework: '@storybook/react-vite',
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      // 根目錄 tsconfig.json 是 references-only（files: []），必須指定實際的 app config
      tsconfigPath: join(configDir, '..', 'tsconfig.app.json'),
      shouldExtractLiteralValuesFromEnum: true,
      // 不加 propFilter 的話，extends ButtonHTMLAttributes 會把數百個原生屬性灌進 props 表
      propFilter: (prop) => (prop.parent ? !prop.parent.fileName.includes('node_modules') : true),
    },
  },
}
export default config
