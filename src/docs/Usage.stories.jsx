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
      <h1 className="docs-title">Use Components In Products</h1>
      <p className="docs-lede">
        Components are exported from one package entry. Product teams import the shared
        CSS once, then use the same React components across product lines.
      </p>

      <section className="docs-section">
        <div className="docs-section-header">
          <h2 className="docs-section-title">Install and Import</h2>
        </div>
        <pre className="docs-code">{`import '@your-scope/my-design-system/styles.css'
import { Button, Card, ThemeProvider } from '@your-scope/my-design-system'

export function App() {
  return (
    <ThemeProvider productLine="commerce">
      <Button>Checkout</Button>
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
                description="Same component API, different product token values."
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
