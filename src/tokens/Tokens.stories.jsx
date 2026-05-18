import './tokens.css'

export default {
  title: 'Foundation/Tokens',
  parameters: {
    docs: {
      description: {
        component: 'Tokens define the shared visual decisions used by every component.',
      },
    },
  },
}

const TokenBox = ({ name, value }) => (
  <div className="token-row">
    <div className="token-swatch" style={{ background: value }} />
    <div>
      <div className="token-name">{name}</div>
      <div className="token-value">{value}</div>
    </div>
    <code>{value}</code>
  </div>
)

export const Colors = {
  render: () => (
    <div className="docs-page">
      <h2 className="docs-section-title">Color Tokens</h2>
      <div className="token-list">
        <TokenBox name="--color-primary" value="#0066FF" />
        <TokenBox name="--color-primary-hover" value="#0052CC" />
        <TokenBox name="--color-secondary" value="#6B7280" />
        <TokenBox name="--color-success" value="#10B981" />
        <TokenBox name="--color-danger" value="#EF4444" />
        <TokenBox name="--color-warning" value="#F59E0B" />
        <TokenBox name="--color-bg" value="#F9FAFB" />
        <TokenBox name="--color-border" value="#E5E7EB" />
        <TokenBox name="--color-text" value="#111827" />
        <TokenBox name="--color-text-muted" value="#6B7280" />
      </div>
    </div>
  ),
}

export const Spacing = {
  render: () => (
    <div className="docs-page">
      <h2 className="docs-section-title">Spacing Tokens</h2>
      <div className="token-list">
        {[
          { name: '--spacing-xs', value: '4px' },
          { name: '--spacing-sm', value: '8px' },
          { name: '--spacing-md', value: '16px' },
          { name: '--spacing-lg', value: '24px' },
          { name: '--spacing-xl', value: '32px' },
        ].map(({ name, value }) => (
          <div className="token-row" key={name}>
            <div className="token-swatch" style={{ background: '#0066FF', width: value }} />
            <div className="token-name">{name}</div>
            <code>{value}</code>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const Typography = {
  render: () => (
    <div className="docs-page">
      <h2 className="docs-section-title">Typography Tokens</h2>
      <div className="token-list">
        {[
          { name: '--font-size-xs', value: '12px' },
          { name: '--font-size-sm', value: '14px' },
          { name: '--font-size-base', value: '16px' },
          { name: '--font-size-lg', value: '20px' },
          { name: '--font-size-xl', value: '24px' },
        ].map(({ name, value }) => (
          <div className="token-row" key={name}>
            <span style={{ fontSize: value, fontWeight: 600 }}>Aa</span>
            <div className="token-name">{name}</div>
            <code>{value}</code>
          </div>
        ))}
      </div>
    </div>
  ),
}
