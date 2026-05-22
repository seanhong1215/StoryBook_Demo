# My Design System

Ant Design-inspired React component library for interview portfolio review.

This project is a lightweight design system built with React, Vite, and Storybook. It focuses on practical component quality for small internal products: clear public exports, reusable CSS tokens, Storybook documentation, and a local Product A adoption demo.

## Stack

- React 19
- Vite 8 library mode
- Storybook 10 with `@storybook/react-vite`
- ESLint flat config
- CSS custom properties for design tokens

## Components

Public exports are managed in `src/index.js`.

- `ThemeProvider`
- `Button`
- `Badge`
- `Tag`
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
- `Dropdown`
- `Pagination`

## Local Demo

Run the Product A adoption demo:

```bash
npm run dev
```

`src/App.jsx` imports components from `src/index.js`, the same public entry used by package consumers. This is the fastest way to show an interviewer that the library can be composed into a real product screen.

Run Storybook documentation:

```bash
npm run storybook
```

Build the library:

```bash
npm run build
```

Build static Storybook:

```bash
npm run build-storybook
```

Lint:

```bash
npm run lint
```

## Use In Product A Without Publishing

Build and pack this library:

```bash
npm run build
npm pack
```

This produces a local tarball such as:

```text
my-design-system-0.0.0.tgz
```

Install it in Product A:

```bash
npm install ../storybook/my-design-system-0.0.0.tgz
```

Then import styles and components:

```jsx
import 'my-design-system/styles.css'
import {
  Alert,
  Button,
  Card,
  Form,
  FormItem,
  Input,
  Select,
  Space,
  Table,
  ThemeProvider,
} from 'my-design-system'

export function App() {
  return (
    <ThemeProvider productLine="commerce">
      <Space direction="vertical" align="stretch">
        <Alert type="success" message="Design system connected" />
        <Card title="Create workspace">
          <Form onFinish={console.log}>
            <FormItem name="workspace" label="Workspace" rules={[{ required: true }]}>
              <Input placeholder="Workspace name" />
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
            <Button type="primary" htmlType="submit">Create</Button>
          </Form>
        </Card>
        <Table
          columns={[
            { title: 'Order', dataIndex: 'id', sorter: true },
            { title: 'Customer', dataIndex: 'customer', sorter: true },
          ]}
          dataSource={[
            { key: '1', id: 'ORD-1024', customer: 'Acme Studio' },
          ]}
        />
      </Space>
    </ThemeProvider>
  )
}
```

## CDN / UMD Local Test

Build the library first:

```bash
npm run build
```

Use these output files:

- `dist/my-design-system.css`
- `dist/my-design-system.js`
- `dist/my-design-system.umd.cjs`

For UMD usage, load React and ReactDOM before the library bundle because they are externalized by the Vite library build.

## Storybook Structure

Storybook documents the package through:

- `Components/Showcase`: interview-ready product scenario.
- `Components/Overview`: component inventory and design-system positioning.
- `Components/Usage`: local package, file dependency, and UMD usage.
- Component stories under `General`, `Data Display`, `Data Entry`, `Feedback`, `Navigation`, and `Layout`.
- Token stories under `Foundation`.

## Development Rules

When adding a component:

```text
src/components/NewComponent/NewComponent.jsx
src/components/NewComponent/NewComponent.css
src/components/NewComponent/NewComponent.stories.jsx
```

Also update `src/index.js`:

```js
import './components/NewComponent/NewComponent.css'

export { NewComponent } from './components/NewComponent/NewComponent'
```

Use existing CSS tokens from `src/tokens/tokens.css`, keep JSX exports named, and document variants/states in Storybook.
