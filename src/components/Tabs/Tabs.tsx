import { forwardRef, useId, useRef, useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
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
  /**
   * Accessible name of the tab list.
   *
   * Worth setting when a page has more than one set of tabs — otherwise they are
   * announced identically when navigating by role.
   */
  label?: string
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
  label,
  onChange,
  className = '',
}, ref) => {
  const baseId = useId()
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const firstKey = items[0]?.key
  // ?? 而不是 || —— key 允許是空字串，用 || 的話那個分頁永遠選不起來
  const [internalActiveKey, setInternalActiveKey] = useState(defaultActiveKey ?? firstKey)
  const currentKey = activeKey ?? internalActiveKey
  const currentItem = items.find((item) => item.key === currentKey)

  const tabId = (key: string) => `${baseId}-tab-${key}`
  const panelId = (key: string) => `${baseId}-panel-${key}`

  const selectTab = (key: string, disabled?: boolean) => {
    if (disabled) return
    if (activeKey === undefined) {
      setInternalActiveKey(key)
    }
    onChange?.(key)
  }

  /*
   * 自動啟動（automatic activation）：方向鍵移動焦點的同時就切換分頁。
   * WAI-ARIA APG 建議面板內容不昂貴時採用這種模式 —— 使用者不必按了方向鍵
   * 再多按一次 Enter。停用中的分頁會被跳過。
   */
  const moveTo = (key: string) => {
    selectTab(key)
    tabRefs.current[key]?.focus()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys = items.filter((item) => !item.disabled).map((item) => item.key)
    if (keys.length === 0) return

    const current = currentKey === undefined ? -1 : keys.indexOf(currentKey)
    const step = (delta: number) => (
      current === -1
        ? (delta > 0 ? keys[0] : keys[keys.length - 1])
        : keys[(current + delta + keys.length) % keys.length]
    )

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault()
        moveTo(step(1))
        break
      case 'ArrowLeft':
        event.preventDefault()
        moveTo(step(-1))
        break
      case 'Home':
        event.preventDefault()
        moveTo(keys[0])
        break
      case 'End':
        event.preventDefault()
        moveTo(keys[keys.length - 1])
        break
      default:
        break
    }
  }

  const classes = [
    'mds-tabs',
    `mds-tabs--${size}`,
    `mds-tabs--${type}`,
    className,
  ].filter(Boolean).join(' ')

  return (
    <div ref={ref} className={classes}>
      <div
        className="mds-tabs__list"
        role="tablist"
        aria-label={label}
        onKeyDown={handleKeyDown}
      >
        {items.map((item) => {
          const selected = item.key === currentKey

          return (
            <button
              ref={(node) => {
                tabRefs.current[item.key] = node
              }}
              id={tabId(item.key)}
              className="mds-tabs__tab"
              type="button"
              role="tab"
              aria-selected={selected}
              // 只有選中的面板會被渲染；指向不存在的 id 會被 axe 判為違規
              aria-controls={selected ? panelId(item.key) : undefined}
              // roving tabindex：整組分頁只有一個 tab stop，其餘靠方向鍵移動
              tabIndex={selected ? 0 : -1}
              disabled={item.disabled}
              onClick={() => selectTab(item.key, item.disabled)}
              key={item.key}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      {currentItem && (
        <div
          className="mds-tabs__panel"
          role="tabpanel"
          id={panelId(currentItem.key)}
          aria-labelledby={tabId(currentItem.key)}
          // 面板內容可能會捲動；沒有 tabIndex 的話鍵盤使用者到不了這裡
          tabIndex={0}
        >
          {currentItem.children}
        </div>
      )}
    </div>
  )
})

Tabs.displayName = 'Tabs'
