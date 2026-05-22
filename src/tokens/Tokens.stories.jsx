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

const TokenRow = ({ name, value, preview }) => (
  <div className="token-row token-row--preview">
    <div className="token-preview">{preview}</div>
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

export const Radius = {
  render: () => (
    <div className="docs-page">
      <h2 className="docs-section-title">Radius Tokens</h2>
      <div className="token-list">
        {[
          { name: '--radius-sm', value: '4px' },
          { name: '--radius-md', value: '8px' },
          { name: '--radius-lg', value: '12px' },
          { name: '--radius-full', value: '9999px' },
        ].map(({ name, value }) => (
          <TokenRow
            name={name}
            value={value}
            key={name}
            preview={<span className="token-shape" style={{ borderRadius: value }} />}
          />
        ))}
      </div>
    </div>
  ),
}

export const Shadow = {
  render: () => (
    <div className="docs-page">
      <h2 className="docs-section-title">Shadow Tokens</h2>
      <div className="token-list">
        {[
          { name: '--shadow-sm', value: '0 1px 3px rgba(0,0,0,0.1)' },
          { name: '--shadow-md', value: '0 4px 12px rgba(0,0,0,0.1)' },
          { name: '--shadow-lg', value: '0 12px 30px rgba(15,23,42,0.14)' },
        ].map(({ name, value }) => (
          <TokenRow
            name={name}
            value={value}
            key={name}
            preview={<span className="token-shape token-shape--surface" style={{ boxShadow: value }} />}
          />
        ))}
      </div>
    </div>
  ),
}

export const Size = {
  render: () => (
    <div className="docs-page">
      <h2 className="docs-section-title">Size Tokens</h2>
      <div className="token-list">
        {[
          { name: '--size-xs', value: '24px' },
          { name: '--size-sm', value: '32px' },
          { name: '--size-md', value: '40px' },
          { name: '--size-lg', value: '48px' },
          { name: '--size-xl', value: '64px' },
        ].map(({ name, value }) => (
          <TokenRow
            name={name}
            value={value}
            key={name}
            preview={<span className="token-size-box" style={{ width: value, height: value }} />}
          />
        ))}
      </div>
    </div>
  ),
}

export const Border = {
  render: () => (
    <div className="docs-page">
      <h2 className="docs-section-title">Border Tokens</h2>
      <div className="token-list">
        {[
          { name: '--border-width-sm', value: '1px', style: 'solid' },
          { name: '--border-width-md', value: '2px', style: 'solid' },
          { name: '--border-width-lg', value: '4px', style: 'solid' },
          { name: '--border-style-dashed', value: 'dashed', width: '2px', style: 'dashed' },
        ].map(({ name, value, width = value, style }) => (
          <TokenRow
            name={name}
            value={value}
            key={name}
            preview={(
              <span
                className="token-shape token-shape--surface"
                style={{ borderWidth: width, borderStyle: style }}
              />
            )}
          />
        ))}
      </div>
    </div>
  ),
}

export const Opacity = {
  render: () => (
    <div className="docs-page">
      <h2 className="docs-section-title">Opacity Tokens</h2>
      <div className="token-list">
        {[
          { name: '--opacity-disabled', value: '0.45' },
          { name: '--opacity-muted', value: '0.64' },
          { name: '--opacity-overlay', value: '0.72' },
        ].map(({ name, value }) => (
          <TokenRow
            name={name}
            value={value}
            key={name}
            preview={<span className="token-shape" style={{ opacity: value }} />}
          />
        ))}
      </div>
    </div>
  ),
}

export const Transition = {
  render: () => (
    <div className="docs-page">
      <h2 className="docs-section-title">Transition Tokens</h2>
      <div className="token-list">
        {[
          { name: '--transition-fast', value: '120ms ease' },
          { name: '--transition-base', value: '160ms ease' },
          { name: '--transition-slow', value: '240ms ease' },
        ].map(({ name, value }) => (
          <TokenRow
            name={name}
            value={value}
            key={name}
            preview={<span className="token-transition-dot" style={{ transition: `transform ${value}` }} />}
          />
        ))}
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
