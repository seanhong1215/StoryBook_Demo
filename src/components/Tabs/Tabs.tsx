import { forwardRef, useState } from 'react'
import type { ReactNode } from 'react'
import './Tabs.css'

export interface TabItem {
  /** Unique tab identifier. */
  key: string
  /** Tab button label. */
  label: ReactNode
  /** Panel content shown when the tab is active. */
  children?: ReactNode
  /** Disables this tab. */
  disabled?: boolean
}

export interface TabsProps {
  /** Tab definitions. */
  items?: TabItem[]
  /** Controlled active tab key. */
  activeKey?: string
  /** Initial active tab key for uncontrolled usage. */
  defaultActiveKey?: string
  /** Tab density. */
  size?: 'sm' | 'md' | 'lg'
  /** Visual presentation of the tab list. */
  type?: 'line' | 'card'
  /** Called with the tab key when the active tab changes. */
  onChange?: (key: string) => void
  className?: string
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(({
  items = [],
  activeKey,
  defaultActiveKey,
  size = 'md',
  type = 'line',
  onChange,
  className = '',
}, ref) => {
  const firstKey = items[0]?.key
  const [internalActiveKey, setInternalActiveKey] = useState(defaultActiveKey || firstKey)
  const currentKey = activeKey || internalActiveKey
  const currentItem = items.find((item) => item.key === currentKey)

  const selectTab = (key: string, disabled?: boolean) => {
    if (disabled) return
    if (activeKey === undefined) {
      setInternalActiveKey(key)
    }
    onChange?.(key)
  }

  const classes = [
    'tabs',
    `tabs--${size}`,
    `tabs--${type}`,
    className,
  ].filter(Boolean).join(' ')

  return (
    <div ref={ref} className={classes}>
      <div className="tabs__list" role="tablist">
        {items.map((item) => (
          <button
            className="tabs__tab"
            type="button"
            role="tab"
            aria-selected={item.key === currentKey}
            disabled={item.disabled}
            onClick={() => selectTab(item.key, item.disabled)}
            key={item.key}
          >
            {item.label}
          </button>
        ))}
      </div>
      {currentItem && (
        <div className="tabs__panel" role="tabpanel">
          {currentItem.children}
        </div>
      )}
    </div>
  )
})

Tabs.displayName = 'Tabs'
