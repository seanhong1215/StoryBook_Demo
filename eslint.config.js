// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

// 用 **/ 前綴才會擋到子專案的建置產物（例如 demo/product-a-demo/dist）。
// 只寫 'dist' 只擋得到根目錄那層，demo build 過一次就會多出上百個 lint 錯誤。
export default defineConfig([globalIgnores(['**/dist', '**/storybook-static']), {
  files: ['**/*.{js,jsx,ts,tsx}'],
  extends: [
    js.configs.recommended,
    tseslint.configs.recommended,
    reactHooks.configs.flat.recommended,
    reactRefresh.configs.vite,
  ],
  languageOptions: {
    globals: globals.browser,
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
}, ...storybook.configs["flat/recommended"]])
