# My Design System

React + Vite + Storybook component library.

定位：給小型 React 專案直接套用的輕量 UI 元件庫，API 盡量接近 Ant Design 常見用法，但保留本專案自己的 CSS token 與樣式實作。

目前提供：

- `ThemeProvider`
- `Button`
- `Badge`
- `Card`
- `Table`
- `Form`
- `FormItem`
- `Input`
- `Textarea`
- `Select`
- `Checkbox`
- `Switch`
- `Alert`
- `Modal`
- `Empty`
- `Tooltip`
- `Space`
- `Tabs`
- `Tag`
- `Dropdown`
- `Pagination`
- design tokens CSS
- Storybook 文件與互動範例

## 在 A 產品本機測試

不發布到 npm 也可以測試。建議先用 `npm pack`，因為它最接近真正發布後的安裝結果，能驗證 `package.json` 的 `files`, `exports`, `main`, `module`, `style` 是否正確。

### 方式一：npm pack

在元件庫專案執行：

```bash
npm run build
npm pack
```

會產生類似：

```text
my-design-system-0.0.0.tgz
```

切到 A 產品專案後安裝：

```bash
npm install ../storybook/my-design-system-0.0.0.tgz
```

A 產品即可使用：

```jsx
import 'my-design-system/styles.css'
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Form,
  FormItem,
  Empty,
  Input,
  Modal,
  Pagination,
  Select,
  Space,
  Switch,
  Tag,
  Table,
  Textarea,
  Tooltip,
  Tabs,
  ThemeProvider,
} from 'my-design-system'

export function App() {
  return (
    <ThemeProvider productLine="commerce">
      <Space direction="vertical" align="stretch">
        <Alert type="success" message="Design system connected" />
        <Card title="Create project">
          <Form>
            <FormItem name="project" label="Project" rules={[{ required: true }]}>
              <Input placeholder="Project name" />
            </FormItem>
            <FormItem name="plan" label="Plan">
              <Select
                placeholder="Choose a plan"
                options={[
                  { label: 'Commerce Pro', value: 'commerce-pro' },
                  { label: 'Finance Basic', value: 'finance-basic' },
                ]}
              />
            </FormItem>
            <Checkbox defaultChecked>Invite team</Checkbox>
            <Textarea placeholder="Release notes" showCount maxLength={120} />
            <Button htmlType="submit" type="primary">Create</Button>
          </Form>
        </Card>
        <Tabs
          items={[
            {
              key: 'empty',
              label: 'Empty state',
              children: <Empty title="No releases found" actionText="Create release" />,
            },
            {
              key: 'pages',
              label: 'Pagination',
              children: <Pagination current={1} total={24} pageSize={8} />,
            },
          ]}
        />
      </Space>
    </ThemeProvider>
  )
}
```

元件庫修改後，重新執行：

```bash
npm run build
npm pack
```

再回 A 產品安裝新的 `.tgz`。

### 方式二：本機路徑安裝

在元件庫專案執行：

```bash
npm run build
```

切到 A 產品專案後安裝元件庫資料夾：

```bash
npm install ../storybook
```

A 產品的 `package.json` 會出現類似：

```json
{
  "dependencies": {
    "my-design-system": "file:../storybook"
  }
}
```

這種方式更新較快，但比較不像正式發布結果。若要確認 package 對外設定，仍建議用 `npm pack` 測一次。

## 本機 CDN / UMD 測試

如果 A 產品不是用 bundler，或想模擬 CDN script tag 載入，可以使用 build 後的 UMD 檔。

先在元件庫專案建置：

```bash
npm run build
```

建置後會產生：

- `dist/my-design-system.css`
- `dist/my-design-system.js`
- `dist/my-design-system.umd.cjs`

建立一個本機 HTML 測試頁，例如 `local-cdn-test.html`，依實際路徑載入 React、ReactDOM、CSS 和 UMD：

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="./dist/my-design-system.css" />
  </head>
  <body>
    <div id="root"></div>

    <script src="https://unpkg.com/react@19/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@19/umd/react-dom.production.min.js"></script>
    <script src="./dist/my-design-system.umd.cjs"></script>
    <script>
      const {
        Alert,
        Button,
        Card,
        Checkbox,
        Input,
        Select,
        Space,
        Switch,
        ThemeProvider,
      } = MyDesignSystem

      ReactDOM.createRoot(document.getElementById('root')).render(
        React.createElement(
          ThemeProvider,
          { productLine: 'core' },
          React.createElement(
            Space,
            { direction: 'vertical', align: 'stretch' },
            React.createElement(Alert, {
              type: 'info',
              message: 'Loaded from local UMD build',
            }),
            React.createElement(
              Card,
              {
                title: 'Local CDN test',
                footer: React.createElement(Button, { type: 'primary' }, 'Submit'),
              },
              React.createElement(Input, { placeholder: 'Type something' }),
              React.createElement(Select, {
                placeholder: 'Choose a plan',
                options: [
                  { label: 'Commerce Pro', value: 'commerce-pro' },
                  { label: 'Finance Basic', value: 'finance-basic' },
                ],
              }),
              React.createElement(Checkbox, { defaultChecked: true }, 'Invite team'),
              React.createElement(Switch, {
                defaultChecked: true,
                checkedChildren: 'On',
                unCheckedChildren: 'Off',
              })
            )
          )
        )
      )
    </script>
  </body>
</html>
```

正式 CDN 的概念相同，只是把 `./dist/...` 換成 CDN URL。注意：UMD 模式下 React 和 ReactDOM 是外部依賴，所以 HTML 需要先載入 React 與 ReactDOM。

## 元件用法

### ThemeProvider

```jsx
import { ThemeProvider } from 'my-design-system'

<ThemeProvider productLine="finance">
  <AppContent />
</ThemeProvider>
```

目前支援：

- `core`
- `commerce`
- `finance`
- `internal`

### Button

支援本專案原本的 `variant`，也支援接近 Ant Design 的 `type`、`htmlType`、`block`。

```jsx
import { Button } from 'my-design-system'

<Button type="primary">Primary</Button>
<Button type="default">Default</Button>
<Button type="link">Link</Button>
<Button variant="danger">Delete</Button>
<Button loading>Saving</Button>
<Button block>Continue</Button>
<Button htmlType="submit">Submit</Button>
```

### Input

```jsx
import { Input } from 'my-design-system'

<Input placeholder="Project name" />
<Input size="lg" prefix="$" placeholder="Amount" />
<Input status="error" placeholder="Required field" />
```

### Textarea

```jsx
import { Textarea } from 'my-design-system'

<Textarea placeholder="Release notes" />
<Textarea showCount maxLength={120} defaultValue="Updated install workflow." />
```

### Form

```jsx
import { Button, Form, FormItem, Input, Select } from 'my-design-system'

<Form onFinish={console.log}>
  <FormItem name="workspace" label="Workspace" rules={[{ required: true }]}>
    <Input placeholder="Workspace name" />
  </FormItem>
  <FormItem name="plan" label="Plan">
    <Select
      placeholder="Choose a plan"
      options={[{ label: 'Commerce Pro', value: 'commerce-pro' }]}
    />
  </FormItem>
  <Button htmlType="submit" type="primary">Submit</Button>
</Form>
```

### Select

```jsx
import { Select } from 'my-design-system'

<Select
  placeholder="Choose a plan"
  options={[
    { label: 'Commerce Pro', value: 'commerce-pro' },
    { label: 'Finance Basic', value: 'finance-basic' },
  ]}
/>
<Select status="warning" placeholder="Confirm plan" options={[]} />
```

### Checkbox

```jsx
import { Checkbox } from 'my-design-system'

<Checkbox defaultChecked>Read access</Checkbox>
<Checkbox indeterminate>Select all permissions</Checkbox>
<Checkbox disabled>Owner access</Checkbox>
```

### Switch

```jsx
import { Switch } from 'my-design-system'

<Switch defaultChecked />
<Switch checkedChildren="On" unCheckedChildren="Off" />
<Switch loading defaultChecked />
```

### Alert

```jsx
import { Alert } from 'my-design-system'

<Alert type="success" message="Saved successfully" />
<Alert
  type="warning"
  message="Subscription expires soon"
  description="Update billing details to keep this workspace active."
/>
```

### Tooltip

```jsx
import { Button, Tooltip } from 'my-design-system'

<Tooltip title="Build and pack before installing in Product A.">
  <Button variant="secondary">Hover me</Button>
</Tooltip>
```

### Modal

```jsx
import { Modal } from 'my-design-system'

<Modal
  open={open}
  title="Create release"
  onOk={handleOk}
  onCancel={handleCancel}
>
  Confirm this release package before installing it in Product A.
</Modal>
```

### Empty

```jsx
import { Empty } from 'my-design-system'

<Empty
  title="No releases found"
  description="Build and pack the library before installing it in another product."
  actionText="Create release"
/>
```

### Space

```jsx
import { Button, Space } from 'my-design-system'

<Space>
  <Button type="primary">Save</Button>
  <Button variant="secondary">Cancel</Button>
</Space>
```

### Tag

```jsx
import { Tag } from 'my-design-system'

<Tag color="primary">Commerce Pro</Tag>
<Tag color="success" closable>Ready</Tag>
```

### Tabs

```jsx
import { Tabs } from 'my-design-system'

<Tabs
  items={[
    { key: 'overview', label: 'Overview', children: 'Overview content' },
    { key: 'usage', label: 'Usage', children: 'Usage content' },
  ]}
/>
```

### Pagination

```jsx
import { Pagination } from 'my-design-system'

<Pagination current={1} total={86} pageSize={10} onChange={setPage} />
```

### Dropdown

```jsx
import { Button, Dropdown } from 'my-design-system'

<Dropdown
  trigger={<Button variant="secondary">Actions</Button>}
  items={[
    { key: 'preview', label: 'Preview package' },
    { key: 'pack', label: 'Run npm pack' },
  ]}
/>
```

### Card

```jsx
import { Badge, Button, Card } from 'my-design-system'

<Card
  title="System status"
  extra={<Badge variant="success">Active</Badge>}
  hoverable
  footer={<Button size="sm">Manage</Button>}
>
  All services are available.
</Card>
```

### Table

```jsx
import { Badge, Table, Tag } from 'my-design-system'

<Table
  columns={[
    { title: 'Order', dataIndex: 'id', sorter: true },
    { title: 'Customer', dataIndex: 'customer', sorter: true },
    { title: 'Plan', dataIndex: 'plan', render: (plan) => <Tag color="primary">{plan}</Tag> },
    { title: 'Status', dataIndex: 'status', render: (status) => <Badge>{status}</Badge> },
  ]}
  dataSource={[
    { key: '1', id: 'ORD-1024', customer: 'Acme Studio', plan: 'Commerce Pro', status: 'Active' },
  ]}
  pagination={{ pageSize: 10 }}
/>
```

## 本地開發

啟動 Vite demo：

```bash
npm run dev
```

啟動 Storybook：

```bash
npm run storybook
```

建置 library：

```bash
npm run build
```

建置 Storybook：

```bash
npm run build-storybook
```

檢查程式碼：

```bash
npm run lint
```

## 新增元件流程

新增元件時維持目前結構：

```text
src/components/NewComponent/NewComponent.jsx
src/components/NewComponent/NewComponent.css
src/components/NewComponent/NewComponent.stories.jsx
```

若元件要對外使用，必須更新 `src/index.js`：

```js
import './components/NewComponent/NewComponent.css'

export { NewComponent } from './components/NewComponent/NewComponent'
```
