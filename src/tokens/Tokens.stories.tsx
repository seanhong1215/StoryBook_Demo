import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
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

const TokenBox = ({ name, value }: { name: string; value: string }) => (
  <div className="token-row">
    <div className="token-swatch" style={{ background: value }} />
    <div>
      <div className="token-name">{name}</div>
      <div className="token-value">{value}</div>
    </div>
    <code>{value}</code>
  </div>
)

/**
 * 主題相依的 token 不能再寫死色碼 —— 同一個名稱在 light / dark 下是不同的值，
 * 而 tone-* 還會再跟著 product line 變。這裡直接讀 computed value。
 */
const LiveToken = ({ name, swatch = 'color' }: { name: string; swatch?: 'color' | 'shadow' }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState('')

  useEffect(() => {
    if (!ref.current) return
    setValue(getComputedStyle(ref.current).getPropertyValue(name).trim())
  }, [name])

  return (
    <div className="token-row" ref={ref}>
      <div
        className="token-swatch"
        style={swatch === 'shadow'
          ? { background: 'var(--color-surface)', boxShadow: `var(${name})` }
          : { background: `var(${name})` }}
      />
      <div>
        <div className="token-name">{name}</div>
        <div className="token-value">{value || '—'}</div>
      </div>
    </div>
  )
}

/** 把一組 token 放進指定主題的容器裡並排比較。 */
const ThemePanel = ({ theme, names, swatch }: {
  theme: 'light' | 'dark'
  names: string[]
  swatch?: 'color' | 'shadow'
}) => (
  <div
    data-theme={theme}
    style={{
      background: 'var(--color-bg)',
      color: 'var(--color-text)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-md)',
      flex: '1 1 320px',
      minWidth: 0,
      padding: 'var(--spacing-md)',
    }}
  >
    <h3 style={{ marginTop: 0, fontSize: 'var(--font-size-sm)', textTransform: 'uppercase' }}>
      {theme}
    </h3>
    <div className="token-list">
      {names.map((name) => <LiveToken name={name} swatch={swatch} key={name} />)}
    </div>
  </div>
)

const ThemeCompare = ({ title, names, swatch, note }: {
  title: string
  names: string[]
  swatch?: 'color' | 'shadow'
  note?: ReactNode
}) => (
  <div className="docs-page">
    <h2 className="docs-section-title">{title}</h2>
    {note && <p className="docs-lede">{note}</p>}
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-md)' }}>
      <ThemePanel theme="light" names={names} swatch={swatch} />
      <ThemePanel theme="dark" names={names} swatch={swatch} />
    </div>
  </div>
)

const TokenRow = ({ name, value, preview }: { name: string; value: string; preview: ReactNode }) => (
  <div className="token-row token-row--preview">
    <div className="token-preview">{preview}</div>
    <div>
      <div className="token-name">{name}</div>
      <div className="token-value">{value}</div>
    </div>
    <code>{value}</code>
  </div>
)

export const BrandColors = {
  name: 'Colors / Brand layer',
  render: () => (
    <div className="docs-page">
      <h2 className="docs-section-title">Brand Layer</h2>
      <p className="docs-lede">
        只由 <code>[data-product-line]</code> 覆寫，不隨主題改變。
      </p>
      <div className="token-list">
        <TokenBox name="--color-primary" value="#0066FF" />
        <TokenBox name="--color-primary-hover" value="#0052CC" />
        <TokenBox name="--color-secondary" value="#6B7280" />
        <TokenBox name="--color-success" value="#10B981" />
        <TokenBox name="--color-danger" value="#EF4444" />
        <TokenBox name="--color-warning" value="#F59E0B" />
        <TokenBox name="--color-on-brand" value="#FFFFFF" />
      </div>
    </div>
  ),
}

export const SurfaceColors = {
  name: 'Colors / Surface layer',
  render: () => (
    <ThemeCompare
      title="Surface Layer"
      note={<>只由 <code>[data-theme]</code> 覆寫，不隨產品線改變。</>}
      names={[
        '--color-bg',
        '--color-bg-subtle',
        '--color-surface',
        '--color-surface-hover',
        '--color-border',
        '--color-text',
        '--color-text-muted',
        '--color-inverse-surface',
        '--color-inverse-text',
      ]}
    />
  ),
}

export const SemanticTones = {
  name: 'Colors / Semantic tones',
  render: () => (
    <ThemeCompare
      title="Semantic Tones"
      note={(
        <>
          Alert / Tag / Badge 的彩色淺底。用 <code>color-mix()</code> 由品牌色與表面色即時混出，
          因此同時跟隨產品線與主題，不需要維護 4×2 組色票。
        </>
      )}
      names={[
        '--tone-info-bg', '--tone-info-border', '--tone-info-text',
        '--tone-success-bg', '--tone-success-border', '--tone-success-text',
        '--tone-warning-bg', '--tone-warning-border', '--tone-warning-text',
        '--tone-danger-bg', '--tone-danger-border', '--tone-danger-text',
      ]}
    />
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
    <ThemeCompare
      title="Shadow Tokens"
      note="暗底上柔和陰影幾乎不可見，暗色主題改用更深更大的陰影撐出層次。"
      swatch="shadow"
      names={['--shadow-sm', '--shadow-md', '--shadow-lg', '--shadow-focus']}
    />
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
