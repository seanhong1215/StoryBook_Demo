/*
 * 驗證「當前原始碼打包後，一個全新消費端真的裝得起來、型別解析得到」。
 *
 * 這是 pre-publish 的把關：抓的是 package.json 的 files / exports /
 * sideEffects / types 設定錯誤 —— 那類問題在 repo 內部怎麼測都測不出來，
 * 因為 repo 內是直接 import 原始碼，不會經過打包後的 entry。
 *
 * 刻意不依賴 demo/product-a-demo：demo 現在裝的是 registry 上的正式版本
 * （示範同事的接入方式），而這裡要測的是「當前這份、可能尚未發布的代碼」。
 * 兩者目的不同，必須分開。
 *
 * 自包含：自己 build + pack + 建臨時消費端 + tsc。本地與 CI 都能跑。
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, unlinkSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx'

const run = (cmd, args, cwd, label) => {
  console.log(`\n> ${label ?? `${cmd} ${args.join(' ')}`}`)
  execFileSync(cmd, args, { cwd, stdio: 'inherit', shell: process.platform === 'win32' })
}

// 1) build + pack 當前原始碼
for (const f of readdirSync(root)) {
  if (f.endsWith('.tgz')) unlinkSync(join(root, f))
}
run(npm, ['run', 'build'], root, 'build library')
run(npm, ['pack'], root, 'pack')
const tarball = readdirSync(root).find((f) => f.endsWith('.tgz'))
if (!tarball) throw new Error('npm pack 沒有產出 .tgz')

// 2) 建臨時消費端
const consumer = mkdtempSync(join(tmpdir(), 'mds-verify-'))
console.log(`\n臨時消費端：${consumer}`)

writeFileSync(join(consumer, 'package.json'), JSON.stringify({
  name: 'pack-verify', private: true, type: 'module',
}, null, 2))

writeFileSync(join(consumer, 'tsconfig.json'), JSON.stringify({
  compilerOptions: {
    target: 'ES2022', module: 'ESNext', moduleResolution: 'bundler',
    jsx: 'react-jsx', strict: true, noEmit: true, skipLibCheck: true,
    lib: ['ES2022', 'DOM', 'DOM.Iterable'],
  },
  include: ['consume.tsx'],
}, null, 2))

/*
 * tsc 只驗證 JS 導出與型別。
 * 刻意不在這裡 `import '.css'` —— 純 side-effect 的 CSS import（TS2882）需要
 * 消費端提供 `declare module '*.css'` 的 ambient 宣告（vite 專案由 vite/client
 * 提供）。那是消費端 tsconfig 的責任、也是 TS 的語言限制，不是 library 能保證的，
 * AntD 等 library 也一樣。CSS 子路徑的存在性在下面用 exports map 單獨驗證。
 */
writeFileSync(join(consumer, 'consume.tsx'), `
import {
  ThemeProvider, Button, Card, Table, Select, Input, Modal,
} from '@seanhong1215/my-design-system'
import type {
  ButtonProps, TableColumn, ProductLine, SelectProps,
} from '@seanhong1215/my-design-system'

interface Row { id: string; qty: number }
const columns: TableColumn<Row>[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  // render 的 value 型別必須由 dataIndex 收斂（這裡驗證泛型有正確導出）
  { title: 'Qty', dataIndex: 'qty', key: 'qty', render: (v) => String(v ?? 0) },
]
const variant: ButtonProps['variant'] = 'primary'
const line: ProductLine = 'commerce'
const selSize: SelectProps['size'] = 'md'

export function App() {
  return (
    <ThemeProvider global productLine={line} theme="dark">
      <Card title="Pack verify">
        <Input aria-label="name" />
        <Select aria-label="plan" size={selSize} options={[{ label: 'A', value: 'a' }]} />
        <Button variant={variant}>ok</Button>
        <Table columns={columns} dataSource={[]} rowKey="id" />
        <Modal open={false} title="m" />
      </Card>
    </ThemeProvider>
  )
}
`)

// 3) 裝打包的 tgz + peer/type 依賴，然後 typecheck
run(npm, ['install',
  join(root, tarball),
  'react@^19', 'react-dom@^19',
  'typescript@~6', '@types/react@^19', '@types/react-dom@^19',
], consumer, 'install packed tarball into fresh consumer')

run(npx, ['tsc', '--noEmit'], consumer, 'typecheck consumer against packed .d.ts')

// 4) 驗證 styles.css 子路徑：exports map 指向的檔案真的在裝好的套件裡
const pkgDir = join(consumer, 'node_modules', '@seanhong1215', 'my-design-system')
const pkg = JSON.parse(readFileSync(join(pkgDir, 'package.json'), 'utf8'))
const cssEntry = pkg.exports?.['./styles.css']
if (!cssEntry) throw new Error('package.json 的 exports 缺少 "./styles.css" 子路徑')
if (!existsSync(join(pkgDir, cssEntry))) {
  throw new Error(`exports["./styles.css"] 指向 ${cssEntry}，但檔案不存在`)
}
console.log(`\n> styles.css 子路徑 OK：${cssEntry}`)

// 清理
rmSync(consumer, { recursive: true, force: true })
console.log('\n打包驗證通過：全新消費端可安裝、型別解析正確、styles.css 子路徑可解析。')
