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

/**
 * Vite 的 library 模式會把 CSS 抽成獨立檔案，同時把 JS 裡的 `import './X.css'`
 * 拿掉 —— 產物中沒有任何模組引用那些 CSS，消費端只能整包 import 一支大的。
 *
 * 這個 plugin 在 preserveModules 的產物裡把關聯補回去：每個 chunk 的檔首補上
 * 它自己那支 CSS 的 import。這樣「用到哪個元件才載入哪支樣式」才真的成立，
 * 而不是只有 JS 搖得掉、CSS 照樣全部載入。
 */
const linkPerModuleCss: Plugin = {
  name: 'link-per-module-css',
  enforce: 'post',
  generateBundle(_options, bundle) {
    for (const file of Object.values(bundle)) {
      if (file.type !== 'chunk') continue

      const importedCss = (file as { viteMetadata?: { importedCss?: Set<string> } })
        .viteMetadata?.importedCss
      if (!importedCss || importedCss.size === 0) continue

      const imports = [...importedCss]
        .map((cssFile) => {
          const relative = path.posix.relative(path.posix.dirname(file.fileName), cssFile)
          return `import "${relative.startsWith('.') ? relative : `./${relative}`}";`
        })
        .join('\n')

      file.code = `${imports}\n${file.code}`
    }
  },
}

/**
 * 分兩次 build（`npm run build` = `vite build && vite build --mode umd`）。
 *
 * ES 產物用 preserveModules 保留模組結構，UMD 產物則是單檔打包 —— 兩者不能
 * 共存於一次 build，因為 preserveModules 對 UMD 沒有意義。
 *
 * 為什麼一定要 preserveModules：全部壓成單一檔案時，消費端的打包器無法搖掉
 * 沒用到的元件。每個元件都是 `const X = forwardRef(...)` 這種頂層函式呼叫，
 * Rollup 無法證明它沒有副作用，只好整段保留。實測「只 import 一個 Button」
 * 的產物仍然包含 Table / Modal / Form 的程式碼。保留模組結構之後，
 * 打包器改以「模組」為單位取捨，沒被 import 的檔案整個不會進來。
 */
export default defineConfig(({ mode }) => {
  const isUmd = mode === 'umd'

  return {
    plugins: [
      react(),
      ...(isUmd ? [] : [linkPerModuleCss]),
      {
        ...dts({
          tsconfigPath: path.join(dirname, 'tsconfig.app.json'),
          include: ['src'],
          exclude: ['src/**/*.stories.tsx', 'src/App.tsx', 'src/main.tsx'],
        }),
        // 只在 ES 的 library build 產出型別：Storybook build 也會套用此設定檔，
        // 不加這行會把 d.ts 灑進 storybook-static；UMD 那趟則會重複產生一次
        apply: (config) => Boolean(config.build?.lib) && !isUmd,
      },
    ],
    build: {
      // public/ 只服務本機 demo 與 Storybook；不要把 favicon.svg / icons.svg 打進發布的 dist/
      copyPublicDir: false,
      // UMD 是第二趟，不能清掉第一趟的 ES 產物
      emptyOutDir: !isUmd,
      /*
       * ES 產物讓每個元件帶著自己的 CSS，消費端只會拿到用到的那幾支樣式；
       * UMD 是給 <script> 直接用的，維持單一 CSS 檔（也是 exports 的
       * "./styles.css" 指向的那一支）。
       */
      cssCodeSplit: !isUmd,
      lib: {
        entry: path.resolve(dirname, 'src/index.ts'),
        name: 'MyDesignSystem',
        fileName: 'my-design-system',
        formats: isUmd ? ['umd'] : ['es'],
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime'],
        output: isUmd
          ? {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
              'react/jsx-runtime': 'jsxRuntime',
            },
          }
          : {
            preserveModules: true,
            preserveModulesRoot: 'src',
            /*
             * 同一層裡 Button.tsx 與 Button.css 都會被登記成名為 "Button" 的
             * chunk，後者讓前者被改名成 Button2.js。純粹是命名重複，不是錯誤 ——
             * 消費端走 exports 與模組內部的相對 import，不會看到這個檔名。
             */
            entryFileNames: '[name].js',
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
  }
});
