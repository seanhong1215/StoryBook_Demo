/*
 * 讓 demo/product-a-demo 跑「目前這份（尚未發布的）library 原始碼」。
 *
 * demo 的 package.json 依賴的是 registry 上的正式版本（`^0.1.0`），
 * 因為 demo 的角色是「示範同事實際會用的接入方式」。
 * 但維護者在本地改了 library 之後，會想立刻在 demo 看到效果 ——
 * registry 上只有已發布的版本，看不到當前改動。
 *
 * 這支腳本打包當前原始碼，用 `npm install <tgz> --no-save` 覆蓋掉
 * node_modules 裡那份 registry 版本：
 *   - node_modules 變成當前代碼（維護者看得到改動）
 *   - package.json 維持 registry 依賴不被改脏（同事看到的仍是正確接入方式）
 *
 * 前提：demo 必須先裝過一次（有 node_modules）。若沒有，會先提示。
 * 這也是 pre-publish 驗證的一環：tgz 裝得起來，代表 files / exports /
 * sideEffects 設定正確。
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

// demo 尚未裝過 registry 依賴時，--no-save 沒有基底可覆蓋。先講清楚該怎麼做。
if (!existsSync(join(demo, 'node_modules', '@seanhong1215'))) {
  console.error(
    '\ndemo 還沒安裝過依賴。請先在 demo/product-a-demo 設好 npm 認證並 `npm install`\n' +
    '（見 demo/product-a-demo/README.md），再回來跑 demo:sync。\n',
  )
  process.exit(1)
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

// --no-save：覆蓋 node_modules 但不動 package.json / package-lock.json
run(npm, ['install', join('..', '..', tarball), '--no-save'], demo)

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

console.log('\n完成 —— demo 現在跑的是當前原始碼（package.json 仍指向 registry 版本）。')
console.log('啟動 demo：npm run demo:dev')
