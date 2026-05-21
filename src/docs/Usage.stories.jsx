import { Badge } from '../components/Badge/Badge'
import { Button } from '../components/Button/Button'
import { Card } from '../components/Card/Card'
import { ThemeProvider } from '../theme/ThemeProvider'

const productLines = [
  { id: 'core', name: 'Core' },
  { id: 'commerce', name: 'Commerce' },
  { id: 'finance', name: 'Finance' },
  { id: 'internal', name: 'Internal Tools' },
]

export default {
  title: 'Components/Usage',
  parameters: {
    layout: 'padded',
    docs: {
      page: null,
    },
  },
}

export const Usage = {
  render: () => (
    <main className="docs-page">
      <p className="docs-kicker">Adoption</p>
      <h1 className="docs-title">Install Locally In Product A</h1>
      <p className="docs-lede">
        This library is designed to be tested as an external package without publishing to npm.
        Build it, pack it, install the tarball in Product A, then import components from one entry.
      </p>

      <section className="docs-section">
        <div className="docs-section-header">
          <h2 className="docs-section-title">Recommended Local Package Flow</h2>
        </div>
        <pre className="docs-code">{`# In this component library
npm run build
npm pack

# In Product A
npm install ../storybook/my-design-system-0.0.0.tgz`}</pre>
      </section>

      <section className="docs-section">
        <div className="docs-section-header">
          <h2 className="docs-section-title">Import In Product A</h2>
        </div>
        <pre className="docs-code">{`import 'my-design-system/styles.css'
import { Button, Card, Input, Space, ThemeProvider } from 'my-design-system'

export function App() {
  return (
    <ThemeProvider productLine="commerce">
      <Card title="Create project" footer={<Button type="primary">Create</Button>}>
        <Space direction="vertical" align="stretch">
          <Input placeholder="Project name" />
          <Input prefix="https://" suffix=".app" placeholder="workspace-url" />
        </Space>
      </Card>
    </ThemeProvider>
  )
}`}</pre>
      </section>

      <section className="docs-section">
        <div className="docs-section-header">
          <h2 className="docs-section-title">Product Line Themes</h2>
          <span className="docs-count">{productLines.length} themes</span>
        </div>
        <div className="theme-grid">
          {productLines.map((productLine) => (
            <ThemeProvider productLine={productLine.id} key={productLine.id}>
              <Card
                title={productLine.name}
                description="Same component API, different CSS token values."
                footer={
                  <>
                    <Badge variant="success">Ready</Badge>
                    <Button size="sm">Action</Button>
                  </>
                }
              />
            </ThemeProvider>
          ))}
        </div>
      </section>
    </main>
  ),
}
