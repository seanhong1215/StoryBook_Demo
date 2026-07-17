import { useEffect, useRef, useState } from 'react'
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
  /** Trigger content rendered inside the built-in button. */
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

export const Dropdown = ({
  items = [],
  trigger,
  placement = 'bottom-start',
  disabled = false,
  className = '',
  onOpenChange,
  onSelect,
}: DropdownProps) => {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

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
      className={['dropdown', `dropdown--${placement}`, className].filter(Boolean).join(' ')}
      ref={rootRef}
    >
      <button
        className="dropdown__trigger"
        type="button"
        disabled={disabled}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpenState(!open)}
      >
        {trigger}
      </button>
      {open && (
        <div className="dropdown__menu" role="menu">
          {items.map((item) => (
            <button
              className="dropdown__item"
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
}
