import { useEffect, useRef, useState } from 'react'
import './Dropdown.css'

export const Dropdown = ({
  items = [],
  trigger,
  placement = 'bottom-start',
  disabled = false,
  className = '',
  onOpenChange,
  onSelect,
}) => {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  const setOpenState = (nextOpen) => {
    if (disabled) return
    setOpen(nextOpen)
    onOpenChange?.(nextOpen)
  }

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false)
        onOpenChange?.(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [onOpenChange])

  const selectItem = (item) => {
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
