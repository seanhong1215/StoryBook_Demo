/*
 * 量測「消費端只用一個元件時，實際會打包進去多少」。
 *
 * 這支腳本存在的理由：tree-shaking 有沒有效不能用看的，只能用量的。
 * 改成 preserveModules 之前，只 import 一個 Button 的產物是 41 kB，
 * 裡面含著 Table / Modal / Form 的程式碼 —— 因為每個元件都是
 * `const X = forwardRef(...)` 這種頂層呼叫，打包成單一檔案後
 * Rollup 無法證明它沒有副作用，只好整段保留。
 *
 * 自包含：自己 build + pack + 建兩個臨時消費端（一個只 import Button，
 * 一個 import 全部）+ 各自 build，最後印出對照表。
 */
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readdirSync, readFileSync, rmSync, statSync, unlinkSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { tmpdir } from 'node:os'
import { gzipSync } from 'node:zlib'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'

const run = (cmd, args, cwd, label) => {
  console.log(`\n> ${label ?? `${cmd} ${args.join(' ')}`}`)
  execFileSync(cmd, args, { cwd, stdio: 'inherit', shell: process.platform === 'win32' })
}

// 1) build + pack 當前原始碼
for (const file of readdirSync(root)) {
  if (file.endsWith('.tgz')) unlinkSync(join(root, file))
}
run(npm, ['run', 'build'], root, 'build library')
run(npm, ['pack'], root, 'pack')
const tarball = readdirSync(root).find((file) => file.endsWith('.tgz'))
if (!tarball) throw new Error('npm pack 沒有產出 .tgz')

// 2) 建臨時消費端：react 等 peer 依賴設為 external，量到的才是 library 自己的體積
const consumer = mkdtempSync(join(tmpdir(), 'mds-measure-'))
console.log(`\n臨時消費端：${consumer}`)

writeFileSync(join(consumer, 'package.json'), JSON.stringify({
  name: 'bundle-measure', private: true, type: 'module',
}, null, 2))

mkdirSync(join(consumer, 'src'))
writeFileSync(join(consumer, 'src', 'one.js'), `
import { Button } from '@seanhong1215/my-design-system'
document.body.append(String(typeof Button))
`)
writeFileSync(join(consumer, 'src', 'all.js'), `
import * as mds from '@seanhong1215/my-design-system'
document.body.append(String(Object.keys(mds).length))
`)

for (const name of ['one', 'all']) {
  writeFileSync(join(consumer, `vite.${name}.config.js`), `
import { defineConfig } from 'vite'
export default defineConfig({
  build: {
    outDir: 'dist-${name}',
    lib: { entry: 'src/${name}.js', formats: ['es'], fileName: 'out' },
    minify: false,
    rollupOptions: { external: ['react', 'react-dom', 'react/jsx-runtime'] },
  },
})
`)
}

run(npm, ['install', join(root, tarball), 'vite@^8'], consumer, 'install packed tarball + vite')

const measure = (name) => {
  run('node', [join(consumer, 'node_modules', 'vite', 'bin', 'vite.js'), 'build', '-c', `vite.${name}.config.js`],
    consumer, `build consumer: ${name}`)

  const outDir = join(consumer, `dist-${name}`)
  const sizes = { js: 0, css: 0, jsGzip: 0, cssGzip: 0 }

  for (const file of readdirSync(outDir)) {
    const content = readFileSync(join(outDir, file))
    const kind = file.endsWith('.css') ? 'css' : file.endsWith('.js') ? 'js' : null
    if (!kind) continue
    sizes[kind] += statSync(join(outDir, file)).size
    sizes[`${kind}Gzip`] += gzipSync(content).length
  }

  return sizes
}

const one = measure('one')
const all = measure('all')
const kb = (bytes) => `${(bytes / 1024).toFixed(2)} kB`

console.log('\n\n消費端實際打包體積（react 已 external）\n')
console.log('                       JS              CSS')
console.log(`只 import Button   ${kb(one.js).padEnd(10)} (gzip ${kb(one.jsGzip)})  ${kb(one.css).padEnd(10)} (gzip ${kb(one.cssGzip)})`)
console.log(`import 全部        ${kb(all.js).padEnd(10)} (gzip ${kb(all.jsGzip)})  ${kb(all.css).padEnd(10)} (gzip ${kb(all.cssGzip)})`)

rmSync(consumer, { recursive: true, force: true })

// 只用一個元件卻拉進超過一半的 library，代表 tree-shaking 又壞了
const ratio = one.js / all.js
if (ratio > 0.5) {
  throw new Error(`tree-shaking 失效：只 import Button 就佔了全部的 ${(ratio * 100).toFixed(0)}%`)
}

console.log(`\n只 import Button 的 JS 是全部的 ${(ratio * 100).toFixed(1)}% —— tree-shaking 有效。`)
