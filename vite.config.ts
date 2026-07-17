/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = path.dirname(fileURLToPath(import.meta.url));

// Workaround for https://github.com/storybookjs/storybook/issues/33700:
// addon-vitest 生成的 guard 用 percent-encoded 的 import.meta.url 去 includes() 原始檔案路徑，
// 專案路徑含非 ASCII 字元（中文）時永遠比對失敗，導致 "No test suite found"。
// 這裡在比對前先 decode URL。上游修復後可移除。
const storybookNonAsciiPathFix: Plugin = {
  name: 'storybook-vitest-non-ascii-path-fix',
  enforce: 'post',
  transform(code, id) {
    if (!id.includes('.stories.')) return
    const patched = code.replace(
      'convertToFilePath(import.meta.url).includes(',
      'decodeURIComponent(convertToFilePath(import.meta.url)).includes(',
    )
    if (patched === code) return
    return { code: patched, map: null }
  },
};

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    react(),
    {
      ...dts({
        tsconfigPath: path.join(dirname, 'tsconfig.app.json'),
        include: ['src'],
        exclude: ['src/**/*.stories.tsx', 'src/App.tsx', 'src/main.tsx'],
      }),
      // 只在 library build 產出型別；Storybook build 也會套用此設定檔，不加這行會把 d.ts 灑進 storybook-static
      apply: (config) => Boolean(config.build?.lib),
    },
  ],
  build: {
    lib: {
      entry: path.resolve(dirname, 'src/index.ts'),
      name: 'MyDesignSystem',
      fileName: 'my-design-system',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      }),
      storybookNonAsciiPathFix],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }]
  }
});
