import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import './Dropdown.css'

export interface DropdownItem {
  /** Unique item identifier passed to onSelect. */
  key: string | number
  /** Visible item label. */
  label: ReactNode
  /** Disables this item. */
  disabled?: boolean
}

export interface DropdownProps {
  /** Menu items. */
  items?: DropdownItem[]
  /**
   * Content of the built-in trigger button — text or an icon.
   *
   * Do not pass a `<Button>` here: Dropdown already renders its own `<button>`,
   * so it would nest interactive controls (invalid HTML, breaks keyboard nav).
   */
  trigger?: ReactNode
  /** Menu alignment relative to the trigger. */
  placement?: 'bottom-start' | 'bottom-end'
  /** Disables the trigger. */
  disabled?: boolean
  className?: string
  /** Called when the menu opens or closes. */
  onOpenChange?: (open: boolean) => void
  /** Called when an enabled item is clicked. */
  onSelect?: (item: DropdownItem) => void
}

/**
 * ref 指向外層 root div。
 * 內部另有 rootRef 供 outside-click 偵測使用，兩者用 useImperativeHandle 合併。
 */
export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(({
  items = [],
  trigger,
  placement = 'bottom-start',
  disabled = false,
  className = '',
  onOpenChange,
  onSelect,
}, ref) => {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  useImperativeHandle(ref, () => rootRef.current as HTMLDivElement, [])

  const setOpenState = (nextOpen: boolean) => {
    if (disabled) return
    setOpen(nextOpen)
    onOpenChange?.(nextOpen)
  }

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
        onOpenChange?.(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [onOpenChange])

  const selectItem = (item: DropdownItem) => {
    if (item.disabled) return
    onSelect?.(item)
    setOpenState(false)
  }

  return (
    <div
      className={['mds-dropdown', `mds-dropdown--${placement}`, className].filter(Boolean).join(' ')}
      ref={rootRef}
    >
      <button
        className="mds-dropdown__trigger"
        type="button"
        disabled={disabled}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpenState(!open)}
      >
        {trigger}
      </button>
      {open && (
        <div className="mds-dropdown__menu" role="menu">
          {items.map((item) => (
            <button
              className="mds-dropdown__item"
              type="button"
              role="menuitem"
              disabled={item.disabled}
              onClick={() => selectItem(item)}
              key={item.key}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
})

Dropdown.displayName = 'Dropdown'
