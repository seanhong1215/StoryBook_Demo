import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { usePopup } from '../../hooks/usePopup'
import type { PopupPlacement } from '../../hooks/usePopup'
import './Tooltip.css'

/*
 * 用來判斷 children 自己有沒有可 focus 的元素。
 * 有的話就讓它當 tab stop；沒有的話才把 wrapper 設成 tabIndex={0}。
 * 兩個都給會變成同一個提示要按兩次 Tab 才跳得過去。
 */
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

export interface TooltipProps {
  /** Content shown inside the tooltip bubble. */
  title?: ReactNode
  /** Preferred bubble position; flips automatically when it would overflow the viewport. */
  placement?: PopupPlacement
  /** Trigger element. */
  children?: ReactNode
  className?: string
  /** Controlled visibility. Leave undefined for hover/focus behaviour. */
  open?: boolean
  /** Initial visibility for uncontrolled usage. */
  defaultOpen?: boolean
  /** Delay before showing on pointer enter, in milliseconds. */
  mouseEnterDelay?: number
  /** Delay before hiding on pointer leave, in milliseconds. */
  mouseLeaveDelay?: number
  /** Called when the tooltip opens or closes. */
  onOpenChange?: (open: boolean) => void
}

/** ref 指向外層 wrapper（也是定位的基準元素）。 */
export const Tooltip = forwardRef<HTMLSpanElement, TooltipProps>(({
  title,
  placement = 'top',
  children,
  className = '',
  open: controlledOpen,
  defaultOpen = false,
  mouseEnterDelay = 100,
  mouseLeaveDelay = 100,
  onOpenChange,
}, ref) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const hasTitle = title !== undefined && title !== null && title !== ''
  const open = (isControlled ? controlledOpen : internalOpen) && hasTitle

  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  /** wrapper 內真正接收焦點的元素；沒有的話就是 wrapper 自己。 */
  const triggerElementRef = useRef<HTMLElement | null>(null)
  const [wrapperFocusable, setWrapperFocusable] = useState(false)

  const setOpenState = (next: boolean) => {
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
  } = usePopup<HTMLSpanElement, HTMLDivElement>({
    open,
    placement,
    onClose: () => setOpenState(false),
  })

  useImperativeHandle(ref, () => anchorRef.current as HTMLSpanElement, [anchorRef])

  useEffect(() => () => clearTimeout(timerRef.current), [])

  useEffect(() => {
    const wrapper = anchorRef.current
    if (!wrapper) return
    const focusable = wrapper.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)
    triggerElementRef.current = focusable ?? wrapper
    setWrapperFocusable(!focusable)
  }, [anchorRef, children])

  /*
   * aria-describedby 要掛在「真正被 focus 的那個元素」上，掛在 wrapper 上
   * 螢幕閱讀器讀不到（焦點在裡面的 <button> 時不會套用外層的描述）。
   * children 可能是純文字，用 cloneElement 加不上去，因此這裡直接操作 DOM。
   * 只在開啟時設定 —— 指向不存在的 id 會被 axe 判為 aria-valid-attr-value 違規。
   */
  useEffect(() => {
    const element = triggerElementRef.current
    if (!element || !open) return undefined

    element.setAttribute('aria-describedby', popupId)
    return () => element.removeAttribute('aria-describedby')
  }, [open, popupId])

  const scheduleOpen = (next: boolean, delay: number) => {
    clearTimeout(timerRef.current)
    if (delay <= 0) {
      setOpenState(next)
      return
    }
    timerRef.current = setTimeout(() => setOpenState(next), delay)
  }

  // 鍵盤使用者不該等延遲：focus 立即顯示、blur 立即隱藏
  const showNow = () => {
    clearTimeout(timerRef.current)
    setOpenState(true)
  }

  const hideNow = () => {
    clearTimeout(timerRef.current)
    setOpenState(false)
  }

  return (
    <>
      <span
        ref={anchorRef}
        className={['mds-tooltip', className].filter(Boolean).join(' ')}
        tabIndex={wrapperFocusable && hasTitle ? 0 : undefined}
        onPointerEnter={() => scheduleOpen(true, mouseEnterDelay)}
        onPointerLeave={() => scheduleOpen(false, mouseLeaveDelay)}
        onFocus={showNow}
        onBlur={hideNow}
      >
        {children}
      </span>
      {renderPopup(
        <div
          ref={popupRef}
          id={popupId}
          className="mds-popup mds-tooltip__content"
          data-placement={actualPlacement}
          style={popupStyle}
          role="tooltip"
        >
          {title}
        </div>,
      )}
    </>
  )
})

Tooltip.displayName = 'Tooltip'
