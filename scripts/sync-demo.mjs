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
import { existsSync, readFileSync, readdirSync, rmSync, unlinkSync } from 'node:fs'
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

/*
 * 必須清掉 Vite 的依賴預打包快取。
 *
 * 版本號沒變時，npm install 同名套件不會讓 node_modules/.vite 失效，
 * Vite 會繼續提供舊的預打包結果 —— 症狀是「library 明明改了，demo 卻沒變」，
 * 而且 dist 與 node_modules 裡的檔案看起來都是新的，非常難查。
 */
const viteCache = join(demo, 'node_modules', '.vite')
if (existsSync(viteCache)) {
  rmSync(viteCache, { recursive: true, force: true })
  console.log('\n已清除 demo 的 Vite 依賴快取')
}

console.log('\n完成。啟動 demo：npm run demo:dev')
