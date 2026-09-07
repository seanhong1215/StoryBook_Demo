import{i as e}from"./preload-helper-Cs4UwXAW.js";import{i as t}from"./iframe-GXcRKLmM.js";import{I as n,a as r,o as i}from"./blocks-DvXEZxT_.js";import{t as a}from"./mdx-react-shim-DEiclNJ3.js";function o(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,...n(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r,{title:`Guide/Getting Started`}),`
`,(0,c.jsx)(t.h1,{id:`getting-started`,children:`Getting Started`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:`@seanhong1215/my-design-system`}),` 發布在 GitHub Packages 的私有 registry 上，
不在公開 npm。安裝前需要一次性的認證設定。`]}),`
`,(0,c.jsx)(t.h2,{id:`安裝`,children:`安裝`}),`
`,(0,c.jsxs)(t.p,{children:[`在你的 `,(0,c.jsx)(t.code,{children:`~/.npmrc`}),`（Windows 是 `,(0,c.jsx)(t.code,{children:`C:\\Users\\<你>\\.npmrc`}),`）加上 token：`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{children:`//npm.pkg.github.com/:_authToken=YOUR_PAT
`})}),`
`,(0,c.jsxs)(t.p,{children:[`Token 要用 `,(0,c.jsx)(t.strong,{children:`classic PAT`}),`，勾 `,(0,c.jsx)(t.code,{children:`read:packages`}),` 與 `,(0,c.jsx)(t.code,{children:`repo`}),`。
private repo 缺 `,(0,c.jsx)(t.code,{children:`repo`}),` 會拿到 `,(0,c.jsx)(t.strong,{children:`404`}),` 而不是權限錯誤，很容易誤判成套件不存在。`]}),`
`,(0,c.jsxs)(t.p,{children:[`專案裡加一支 `,(0,c.jsx)(t.code,{children:`.npmrc`}),`（不含 token，可以進版控）：`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{children:`@seanhong1215:registry=https://npm.pkg.github.com
`})}),`
`,(0,c.jsx)(t.p,{children:`然後就能安裝：`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-bash`,children:`npm install @seanhong1215/my-design-system
`})}),`
`,(0,c.jsxs)(t.p,{children:[`完整步驟與常見錯誤見 repo 的 `,(0,c.jsx)(t.code,{children:`.docs/INTERNAL-ROLLOUT.md`}),`。`]}),`
`,(0,c.jsx)(t.h2,{id:`匯入元件`,children:`匯入元件`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`使用 Vite、Webpack 等 bundler 時，不需要另外 import CSS。`}),` 每個元件會帶著自己的樣式，
你只會拿到用到的那幾支 —— 只用一個 `,(0,c.jsx)(t.code,{children:`Button`}),` 大約是 1.4 kB JS + 2.1 kB CSS。`]}),`
`,(0,c.jsxs)(t.p,{children:[`沒有 bundler（直接 `,(0,c.jsx)(t.code,{children:`<script>`}),` 載 UMD）時才需要整包樣式：`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-html`,children:`<link rel="stylesheet" href=".../my-design-system/dist/my-design-system.css" />
`})}),`
`,(0,c.jsx)(t.h2,{id:`第一個元件`,children:`第一個元件`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import {
  Alert,
  Button,
  Card,
  ConfigProvider,
  Form,
  Input,
  Space,
  zhTW,
} from '@seanhong1215/my-design-system'

export function App() {
  const form = Form.useForm()

  return (
    // global 讓主題屬性寫到 <html>：Modal / Tooltip / Dropdown 是 portal 出去的，
    // 只包一層 div 的話它們拿不到 token
    <ConfigProvider global productLine="commerce" locale={zhTW}>
      <Space direction="vertical" align="stretch">
        <Alert type="success" message="Design system connected" />
        <Card title="建立工作區">
          <Form form={form} onFinish={console.log}>
            <Form.Item name="workspace" label="名稱" rules={[{ required: true }]}>
              <Input allowClear placeholder="Acme workspace" />
            </Form.Item>
            <Space>
              <Button variant="secondary" onClick={() => form.resetFields()}>重設</Button>
              <Button type="primary" htmlType="submit">建立</Button>
            </Space>
          </Form>
        </Card>
      </Space>
    </ConfigProvider>
  )
}
`})}),`
`,(0,c.jsx)(t.h2,{id:`configprovider`,children:`ConfigProvider`}),`
`,(0,c.jsx)(t.p,{children:`一個 provider 管四件事，巢狀時只覆寫有傳的項目：`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Prop`}),(0,c.jsx)(t.th,{children:`作用`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`productLine`})}),(0,c.jsxs)(t.td,{children:[`品牌 token（`,(0,c.jsx)(t.code,{children:`core`}),` / `,(0,c.jsx)(t.code,{children:`commerce`}),` / `,(0,c.jsx)(t.code,{children:`finance`}),` / `,(0,c.jsx)(t.code,{children:`internal`}),`，也可自訂）`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`theme`})}),(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`light`}),` / `,(0,c.jsx)(t.code,{children:`dark`})]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`locale`})}),(0,c.jsxs)(t.td,{children:[`元件自己渲染的文案與無障礙標籤（內建 `,(0,c.jsx)(t.code,{children:`en`}),`、`,(0,c.jsx)(t.code,{children:`zhTW`}),`）`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`getPopupContainer`})}),(0,c.jsxs)(t.td,{children:[`浮層要掛在哪個節點下，預設 `,(0,c.jsx)(t.code,{children:`document.body`})]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`global`})}),(0,c.jsxs)(t.td,{children:[`把主題屬性寫到 `,(0,c.jsx)(t.code,{children:`<html>`}),` 而不是只寫在這層 wrapper`]})]})]})]}),`
`,(0,c.jsx)(t.p,{children:`沒包 provider 時元件一樣能用，文案會 fallback 到英文。`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:`ThemeProvider`}),` 是 `,(0,c.jsx)(t.code,{children:`ConfigProvider`}),` 的薄包裝，保留給既有使用端，新專案直接用
`,(0,c.jsx)(t.code,{children:`ConfigProvider`}),`。`]}),`
`,(0,c.jsx)(t.h2,{id:`常用模式`,children:`常用模式`}),`
`,(0,c.jsx)(t.h3,{id:`直接匯入`,children:`直接匯入`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import { Button, Card, Space } from '@seanhong1215/my-design-system'

export function Actions() {
  return (
    <Card title="操作">
      <Space>
        <Button variant="secondary">取消</Button>
        <Button type="primary">儲存</Button>
      </Space>
    </Card>
  )
}
`})}),`
`,(0,c.jsx)(t.h3,{id:`搭配-react-hook-form`,children:`搭配 react-hook-form`}),`
`,(0,c.jsxs)(t.p,{children:[`表單控制項的 ref 會指向內層原生元素，可以直接交給 `,(0,c.jsx)(t.code,{children:`register()`}),`：`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`const { register } = useForm()

<Input {...register('email')} type="email" />
`})}),`
`,(0,c.jsx)(t.h3,{id:`typescript-型別`,children:`TypeScript 型別`}),`
`,(0,c.jsx)(t.p,{children:`所有公開 props 與資料型別都能從 package entry 匯入：`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import type { ButtonProps, TableColumn } from '@seanhong1215/my-design-system'
`})}),`
`,(0,c.jsx)(t.h2,{id:`自訂產品線`,children:`自訂產品線`}),`
`,(0,c.jsx)(t.p,{children:`CSS 加一組覆寫就會生效，型別也接受任意字串：`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-css`,children:`[data-product-line='acme'] {
  --color-primary: #7C3AED;
  --color-primary-hover: #6D28D9;
  --radius-md: 12px;
}
`})}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`<ConfigProvider global productLine="acme">…</ConfigProvider>
`})}),`
`,(0,c.jsxs)(t.p,{children:[`只覆寫`,(0,c.jsx)(t.strong,{children:`品牌層`}),`的 token（primary / success / danger / warning 與圓角）。
表面層（背景、文字、邊框）由 `,(0,c.jsx)(t.code,{children:`theme`}),` 決定，不要在產品線裡改，
否則暗色模式會被蓋掉 —— 詳見 `,(0,c.jsx)(t.code,{children:`Foundation/Tokens`}),`。`]})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=t(),a(),i()}))();export{s as default};