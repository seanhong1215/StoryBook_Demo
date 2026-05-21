import { useState } from 'react'
import './Tabs.css'

export const Tabs = ({
  items = [],
  activeKey,
  defaultActiveKey,
  size = 'md',
  type = 'line',
  onChange,
  className = '',
}) => {
  const firstKey = items[0]?.key
  const [internalActiveKey, setInternalActiveKey] = useState(defaultActiveKey || firstKey)
  const currentKey = activeKey || internalActiveKey
  const currentItem = items.find((item) => item.key === currentKey)

  const selectTab = (key, disabled) => {
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
    <div className={classes}>
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
}
