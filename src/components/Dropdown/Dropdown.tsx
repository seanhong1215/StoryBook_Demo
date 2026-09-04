import { forwardRef, useEffect, useId, useImperativeHandle, useRef, useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { usePopup } from '../../hooks/usePopup'
import type { PopupPlacement } from '../../hooks/usePopup'
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
  /** Preferred menu position; flips automatically when it would overflow the viewport. */
  placement?: PopupPlacement
  /** Disables the trigger. */
  disabled?: boolean
  className?: string
  /** Controlled open state. Leave undefined to let Dropdown manage it. */
  open?: boolean
  /** Initial open state for uncontrolled usage. */
  defaultOpen?: boolean
  /** Called when the menu opens or closes. */
  onOpenChange?: (open: boolean) => void
  /** Called when an enabled item is clicked or activated with the keyboard. */
  onSelect?: (item: DropdownItem) => void
}

/**
 * ref 指向外層 root div。
 * 內部另有 anchorRef（觸發按鈕，定位基準）與 popupRef（選單），由 usePopup 提供。
 */
export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(({
  items = [],
  trigger,
  placement = 'bottom-start',
  disabled = false,
  className = '',
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  onSelect,
}, ref) => {
  const rootRef = useRef<HTMLDivElement>(null)
  useImperativeHandle(ref, () => rootRef.current as HTMLDivElement, [])

  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen

  const triggerId = useId()
  const [activeIndex, setActiveIndex] = useState(-1)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  /** 下次開啟時焦點要落在第一項還是最後一項（ArrowUp 開啟時是最後一項）。 */
  const pendingFocusRef = useRef<'first' | 'last'>('first')
  const focusAppliedRef = useRef(false)

  const setOpenState = (next: boolean) => {
    if (disabled) return
    if (!isControlled) setInternalOpen(next)
    onOpenChange?.(next)
  }

  const {
    anchorRef,
    popupRef,
    popupId,
    placement: actualPlacement,
    popupStyle,
    renderPopup,
  } = usePopup<HTMLButtonElement, HTMLDivElement>({
    open,
    placement,
    offset: 6,
    // Escape 自己處理：關閉之後要把焦點交還給觸發按鈕，hook 不管焦點
    closeOnEscape: false,
    onClose: () => setOpenState(false),
  })

  const close = (restoreFocus: boolean) => {
    setOpenState(false)
    if (restoreFocus) anchorRef.current?.focus()
  }

  const openWith = (position: 'first' | 'last') => {
    pendingFocusRef.current = position
    setOpenState(true)
  }

  /** 選單開啟後把焦點移進去；沒有可用項目時退而 focus 選單本身，Escape 才收得到。 */
  useEffect(() => {
    if (!open) {
      focusAppliedRef.current = false
      return
    }
    if (focusAppliedRef.current) return
    focusAppliedRef.current = true

    const position = pendingFocusRef.current
    pendingFocusRef.current = 'first'

    const enabled = items
      .map((item, index) => (item.disabled ? -1 : index))
      .filter((index) => index >= 0)

    if (enabled.length === 0) {
      popupRef.current?.focus()
      return
    }

    const next = position === 'last' ? enabled[enabled.length - 1] : enabled[0]
    setActiveIndex(next)
    itemRefs.current[next]?.focus()
  }, [open, items, popupRef])

  const focusItem = (index: number) => {
    setActiveIndex(index)
    itemRefs.current[index]?.focus()
  }

  const enabledIndexes = () => items
    .map((item, index) => (item.disabled ? -1 : index))
    .filter((index) => index >= 0)

  /** 在可用項目之間循環移動（step = 1 往下、-1 往上）。 */
  const moveFocus = (step: number) => {
    const enabled = enabledIndexes()
    if (enabled.length === 0) return

    const current = enabled.indexOf(activeIndex)
    const next = current === -1
      ? (step > 0 ? 0 : enabled.length - 1)
      : (current + step + enabled.length) % enabled.length

    focusItem(enabled[next])
  }

  const focusEdge = (edge: 'first' | 'last') => {
    const enabled = enabledIndexes()
    if (enabled.length === 0) return
    focusItem(edge === 'first' ? enabled[0] : enabled[enabled.length - 1])
  }

  const selectItem = (item: DropdownItem) => {
    if (item.disabled) return
    onSelect?.(item)
    close(true)
  }

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    // Enter / Space 走原生 click，這裡只補方向鍵開啟
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      openWith('first')
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      openWith('last')
    }
  }

  const handleMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        moveFocus(1)
        break
      case 'ArrowUp':
        event.preventDefault()
        moveFocus(-1)
        break
      case 'Home':
        event.preventDefault()
        focusEdge('first')
        break
      case 'End':
        event.preventDefault()
        focusEdge('last')
        break
      case 'Escape':
        event.preventDefault()
        close(true)
        break
      case 'Tab':
        /*
         * 選單是 portal 到 body 的，DOM 順序在頁面最後面 —— 讓 Tab 照預設走
         * 會跳到完全無關的地方。改成關閉並把焦點交還觸發按鈕，
         * 使用者再按一次 Tab 就會從原本的位置繼續。
         */
        event.preventDefault()
        close(true)
        break
      default:
        break
    }
  }

  return (
    <div
      className={['mds-dropdown', className].filter(Boolean).join(' ')}
      ref={rootRef}
    >
      <button
        ref={anchorRef}
        id={triggerId}
        className="mds-dropdown__trigger"
        type="button"
        disabled={disabled}
        aria-haspopup="menu"
        aria-expanded={open}
        // 指向不存在的 id 會被 axe 判為違規，因此只在開啟時給
        aria-controls={open ? popupId : undefined}
        onClick={() => (open ? close(false) : openWith('first'))}
        onKeyDown={handleTriggerKeyDown}
      >
        {trigger}
      </button>
      {renderPopup(
        <div
          ref={popupRef}
          id={popupId}
          className="mds-popup mds-dropdown__menu"
          data-placement={actualPlacement}
          style={popupStyle}
          role="menu"
          aria-labelledby={triggerId}
          tabIndex={-1}
          onKeyDown={handleMenuKeyDown}
        >
          {items.map((item, index) => (
            <button
              ref={(node) => {
                itemRefs.current[index] = node
              }}
              className="mds-dropdown__item"
              type="button"
              role="menuitem"
              disabled={item.disabled}
              // roving tabindex：選單裡只有一個 tab stop，其餘靠方向鍵移動
              tabIndex={index === activeIndex ? 0 : -1}
              onClick={() => selectItem(item)}
              key={item.key}
            >
              {item.label}
            </button>
          ))}
        </div>,
      )}
    </div>
  )
})

Dropdown.displayName = 'Dropdown'
