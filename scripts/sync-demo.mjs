/*
 * 把目前的 library 打包並安裝進 demo/product-a-demo。
 *
 * demo 刻意裝「打包後的 .tgz」而不是用 file: 直接連到原始碼目錄 ——
 * 這樣才會真的驗到 package.json 的 files / exports / sideEffects 設定，
 * 也就是消費端實際拿到的東西。代價是每次改動 library 都要重跑這支腳本。
 *
 * .tgz 有進 .gitignore，所以剛 clone 下來的 repo 必須先跑這支，
 * 否則 demo 的 npm install 會找不到依賴。
 */
import { execFileSync } from 'node:child_process'
import { readFileSync, readdirSync, unlinkSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const demo = join(root, 'demo', 'product-a-demo')
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'

const run = (cmd, args, cwd) => {
  console.log(`\n> ${cmd} ${args.join(' ')}  (${cwd === root ? '.' : 'demo/product-a-demo'})`)
  execFileSync(cmd, args, { cwd, stdio: 'inherit', shell: process.platform === 'win32' })
}

// 舊的 tgz 先清掉，避免版本升級後留下多個檔案而選錯
for (const f of readdirSync(root)) {
  if (f.endsWith('.tgz')) unlinkSync(join(root, f))
}

run(npm, ['run', 'build'], root)
run(npm, ['pack'], root)

const tarball = readdirSync(root).find((f) => f.endsWith('.tgz'))
if (!tarball) throw new Error('npm pack 沒有產出 .tgz')

const { version } = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
console.log(`\n打包完成：${tarball}（v${version}）`)

run(npm, ['install', join('..', '..', tarball)], demo)

console.log('\n完成。啟動 demo：npm --prefix demo/product-a-demo run dev')
