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

Public exports are managed in `src/index.ts`. All components are TypeScript,
support `forwardRef`, and export their prop types.

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

`src/App.tsx` imports components from `src/index.ts`, the same public entry used by package consumers. This is the fastest way to show an interviewer that the library can be composed into a real product screen.

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

## Consuming This Library Privately

The package is `@seanhong1215/my-design-system`. It is **not** published to the
public npm registry. There are two supported ways to install it into an internal
MVP project.

### Option A — GitHub Packages (private registry)

Best when more than one project consumes the library. Free for private repos.

One-time setup: create a **classic** PAT at
<https://github.com/settings/tokens> with `write:packages` **and `repo`** —
`repo` is required for private repositories; without it you get a `404`, not a
permission error.

Add it to your **personal** `~/.npmrc` (`C:\Users\<you>\.npmrc` on Windows)
rather than passing it on the command line — the command line ends up in shell
history, and npm writes failed invocations to its debug log:

```
//npm.pkg.github.com/:_authToken=YOUR_PAT
```

Verify with `npm whoami --registry=https://npm.pkg.github.com`.

> Do **not** use `npm login` here. npm 11 defaults to a browser-based OAuth flow
> that GitHub Packages does not support, so it hangs at the `Username:` prompt.

Then publish:

```bash
npm publish
```

`prepublishOnly` runs the build automatically, so a stale or missing `dist/`
can never be shipped — this matters because `dist/` is gitignored.

In the consuming project, add `.npmrc` (the PAT only needs `read:packages`):

```text
@seanhong1215:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

```bash
npm install @seanhong1215/my-design-system
```

### Option B — local tarball (zero setup)

Good for trying the library in a single project.

```bash
npm run build
npm pack
```

This produces `seanhong1215-my-design-system-0.1.0.tgz`. Install it from your
project, pointing at wherever this repo lives:

```bash
npm install /path/to/storybook/seanhong1215-my-design-system-0.1.0.tgz
```

### Working example

`demo/product-a-demo` is a real consumer project inside this repo. It installs
the packed tarball — not a `file:` link to the source — so it exercises the same
`files` / `exports` / `sideEffects` resolution a published consumer would.

```bash
npm run demo:sync   # build → pack → install into the demo
npm run demo:dev    # http://localhost:5173
```

Its `README` doubles as the adoption guide (theming, token mapping, forms,
adding your own product line).

### Usage

```tsx
import '@seanhong1215/my-design-system/styles.css'
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
} from '@seanhong1215/my-design-system'

export function App() {
  return (
    // `global` 讓主題屬性寫到 <html>，portal 出去的 Modal 才吃得到品牌 token
    <ThemeProvider global productLine="commerce">
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

### Styling and collisions

All class names are prefixed with `mds-` (`.mds-btn`, `.mds-card`,
`.mds-form-item__label`). The stylesheet is a single global
`dist/my-design-system.css`, so the prefix is what keeps it from colliding with
the host app's own styles or with Bootstrap. A host app defining `.card` or
`.input` will not affect library components.

### Theming

Tokens are split into three layers that never overlap:

| Layer | Controlled by | Examples |
|---|---|---|
| Scale | nothing (fixed) | `--spacing-md`, `--font-size-sm`, `--radius-md` |
| Brand | `[data-product-line]` | `--color-primary`, `--color-success`, `--color-on-brand` |
| Surface | `[data-theme]` | `--color-surface`, `--color-text`, `--shadow-md` |

Product lines: `core`, `commerce`, `finance`, `internal`.
Themes: `light` (default), `dark`.

```tsx
<ThemeProvider global productLine="finance" theme="dark">
```

The colored soft backgrounds used by `Alert`, `Tag`, and `Badge` (`--tone-*`)
are mixed at runtime from the brand color and the current surface with
`color-mix()`, so they follow **both** the product line and the theme without a
hand-maintained palette per combination. All 4 product lines × 2 themes are
verified to meet WCAG AA (4.5:1) for text.

> `color-mix()` requires Chrome 111+, Safari 16.2+, or Firefox 113+.

Two tokens exist specifically to avoid common dark-mode bugs:

- `--color-on-brand` — text/icons sitting on a brand-colored fill (primary
  button label, checkbox tick). Stays white in both themes. Do **not** replace
  it with `--color-surface`.
- `--color-inverse-surface` / `--color-inverse-text` — for deliberately
  inverted surfaces like `Tooltip`, which must flip direction between themes.
- `--color-primary-text` — the brand color used as **text** (active tab, link
  button). `--color-primary` itself is for fills and borders; as text on a dark
  page it only reaches 3.97:1.

In Storybook, the toolbar has **Theme** and **Product line** switchers that
apply to every story.

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
src/components/NewComponent/NewComponent.tsx
src/components/NewComponent/NewComponent.css
src/components/NewComponent/NewComponent.stories.tsx
```

Also update `src/index.ts` — both the CSS side-effect import and the exports:

```ts
import './components/NewComponent/NewComponent.css'

export { NewComponent } from './components/NewComponent/NewComponent'
export type { NewComponentProps } from './components/NewComponent/NewComponent'
```

Rules:

- **Prefix every class with `mds-`** and keep BEM structure
  (`.mds-block__element--modifier`).
- **Wrap the component in `forwardRef`** and set `displayName`. Point the ref at
  the element a consumer actually needs — for form controls that is the inner
  native `<input>`/`<select>`, not the wrapper. Merge with
  `useImperativeHandle` if the component already keeps an internal ref.
- Use existing CSS tokens from `src/tokens/tokens.css`; do not hardcode colors.
- Export prop types alongside the component, and document variants/states in
  Storybook.
