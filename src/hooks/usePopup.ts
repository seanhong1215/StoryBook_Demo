import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { CSSProperties, ReactNode, RefObject } from 'react'
import './usePopup.css'

export type PopupSide = 'top' | 'bottom' | 'left' | 'right'
export type PopupPlacement = PopupSide | `${PopupSide}-start` | `${PopupSide}-end`

interface Size {
  width: number
  height: number
}

interface PopupPosition {
  x: number
  y: number
  placement: PopupPlacement
}

const OPPOSITE: Record<PopupSide, PopupSide> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
}

const parsePlacement = (placement: PopupPlacement) => {
  const [side, align = 'center'] = placement.split('-') as [PopupSide, 'start' | 'end' | 'center']
  return { side, align }
}

/** 這個方向放得下浮層嗎？（含與視窗邊緣的最小間距） */
const fitsOnSide = (side: PopupSide, anchor: DOMRect, size: Size, offset: number, padding: number) => {
  switch (side) {
    case 'top':
      return anchor.top - size.height - offset >= padding
    case 'bottom':
      return anchor.bottom + size.height + offset <= window.innerHeight - padding
    case 'left':
      return anchor.left - size.width - offset >= padding
    case 'right':
      return anchor.right + size.width + offset <= window.innerWidth - padding
  }
}

const clamp = (value: number, min: number, max: number) => (
  // max < min 代表浮層比視窗還寬 / 高，這時貼齊起始邊比置中好讀
  max < min ? min : Math.min(Math.max(value, min), max)
)

/**
 * 算出浮層在視窗座標系（position: fixed）中的位置。
 *
 * 兩個修正，順序不能反：
 * 1. flip —— 偏好方向放不下、而對向放得下時才翻面。兩邊都放不下就維持偏好方向，
 *    避免在小視窗裡左右反覆跳動。
 * 2. shift —— 沿著交叉軸把浮層夾回視窗內，讓靠邊的觸發元素不會把浮層擠出畫面。
 */
const computePosition = (
  anchor: DOMRect,
  size: Size,
  placement: PopupPlacement,
  offset: number,
  padding: number,
): PopupPosition => {
  const { side: preferred, align } = parsePlacement(placement)
  const opposite = OPPOSITE[preferred]
  const side = fitsOnSide(preferred, anchor, size, offset, padding)
    || !fitsOnSide(opposite, anchor, size, offset, padding)
    ? preferred
    : opposite

  const isVertical = side === 'top' || side === 'bottom'

  const main = isVertical
    ? (side === 'top' ? anchor.top - size.height - offset : anchor.bottom + offset)
    : (side === 'left' ? anchor.left - size.width - offset : anchor.right + offset)

  const anchorStart = isVertical ? anchor.left : anchor.top
  const anchorSize = isVertical ? anchor.width : anchor.height
  const popupSize = isVertical ? size.width : size.height
  const viewportSize = isVertical ? window.innerWidth : window.innerHeight

  const rawCross = align === 'start'
    ? anchorStart
    : align === 'end'
      ? anchorStart + anchorSize - popupSize
      : anchorStart + anchorSize / 2 - popupSize / 2

  const cross = clamp(rawCross, padding, viewportSize - popupSize - padding)

  return {
    x: Math.round(isVertical ? cross : main),
    y: Math.round(isVertical ? main : cross),
    placement: align === 'center' ? side : `${side}-${align}`,
  }
}

// SSR 下沒有 layout 階段；直接用 useLayoutEffect 會在 server render 時噴警告
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

export interface UsePopupOptions {
  /** 浮層是否顯示。狀態由呼叫端持有，hook 只負責定位與關閉時機。 */
  open: boolean
  /** 偏好方向；放不下時會自動翻到對向。 */
  placement?: PopupPlacement
  /** 觸發元素與浮層之間的間距（px）。 */
  offset?: number
  /** 浮層與視窗邊緣的最小間距（px）。 */
  viewportPadding?: number
  /** 需要關閉時呼叫（點擊外部、Escape）。 */
  onClose?: () => void
  /** 點擊浮層與觸發元素以外的地方時關閉。 */
  closeOnOutsidePointerDown?: boolean
  /** 按 Escape 時關閉。 */
  closeOnEscape?: boolean
  /** portal 掛載容器，預設 `document.body`。 */
  container?: HTMLElement | null
}

export interface UsePopupResult<A extends HTMLElement, P extends HTMLElement> {
  /** 掛在觸發元素上，作為定位基準。 */
  anchorRef: RefObject<A | null>
  /** 掛在浮層根節點上。 */
  popupRef: RefObject<P | null>
  /** 浮層的穩定 id，供 aria-describedby / aria-controls 使用。 */
  popupId: string
  /** 套用 flip 之後的實際方向，會寫進 data-placement 供 CSS 取用。 */
  placement: PopupPlacement
  /** 浮層根節點的 style（position: fixed + 座標）。 */
  popupStyle: CSSProperties
  /** 把浮層內容 portal 到容器；關閉時回傳 null。 */
  renderPopup: (node: ReactNode) => ReactNode
}

/**
 * 浮層共用底座：定位（flip + shift）、portal、點擊外部關閉、Escape 關閉。
 *
 * Tooltip 與 Dropdown 共用這一層，避免每個浮層元件各自用 `position: absolute`
 * 硬寫方向 —— 那種寫法沒有邊界偵測，而且會被父層的 `overflow: hidden` 裁掉。
 *
 * 目前刻意不對外匯出：API 還會隨著之後的 Popover / Select 調整。
 */
export const usePopup = <A extends HTMLElement = HTMLElement, P extends HTMLElement = HTMLElement>({
  open,
  placement = 'bottom',
  offset = 8,
  viewportPadding = 8,
  onClose,
  closeOnOutsidePointerDown = true,
  closeOnEscape = true,
  container,
}: UsePopupOptions): UsePopupResult<A, P> => {
  const anchorRef = useRef<A>(null)
  const popupRef = useRef<P>(null)
  const popupId = useId()
  const [position, setPosition] = useState<PopupPosition | null>(null)

  const update = useCallback(() => {
    const anchor = anchorRef.current
    const popup = popupRef.current
    if (!anchor || !popup) return

    const next = computePosition(
      anchor.getBoundingClientRect(),
      { width: popup.offsetWidth, height: popup.offsetHeight },
      placement,
      offset,
      viewportPadding,
    )

    // ResizeObserver 會因為自己的 setState 再次觸發；值沒變就保留同一個物件切斷迴圈
    setPosition((current) => (
      current && current.x === next.x && current.y === next.y && current.placement === next.placement
        ? current
        : next
    ))
  }, [placement, offset, viewportPadding])

  useIsomorphicLayoutEffect(() => {
    if (!open) {
      setPosition(null)
      return undefined
    }

    update()

    // capture 階段才收得到內層捲動容器的事件（scroll 不會冒泡）
    window.addEventListener('scroll', update, true)
    window.addEventListener('resize', update)

    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(update)
    if (anchorRef.current) observer?.observe(anchorRef.current)
    if (popupRef.current) observer?.observe(popupRef.current)

    return () => {
      window.removeEventListener('scroll', update, true)
      window.removeEventListener('resize', update)
      observer?.disconnect()
    }
  }, [open, update])

  useEffect(() => {
    if (!open || !closeOnOutsidePointerDown) return undefined

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (anchorRef.current?.contains(target) || popupRef.current?.contains(target)) return
      onClose?.()
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [open, closeOnOutsidePointerDown, onClose])

  useEffect(() => {
    if (!open || !closeOnEscape) return undefined

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose?.()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, closeOnEscape, onClose])

  const popupStyle: CSSProperties = position
    ? { position: 'fixed', top: position.y, left: position.x }
    /*
     * 首次 render 還量不到尺寸。useLayoutEffect 會在瀏覽器繪製前補上座標，
     * 因此這個狀態不會真的被畫出來，只是避免 SSR / 極端情況閃到左上角。
     *
     * 這裡刻意用 opacity 而不是 visibility：visibility: hidden 的子元素無法
     * 被 focus()，而 Dropdown 開啟時要立刻把焦點送進選單，那個時間點座標
     * 還沒回填，用 visibility 會讓焦點靜靜地失敗。
     */
    : { position: 'fixed', top: 0, left: 0, opacity: 0, pointerEvents: 'none' }

  const renderPopup = (node: ReactNode) => {
    if (!open || typeof document === 'undefined') return null
    return createPortal(node, container ?? document.body)
  }

  return {
    anchorRef,
    popupRef,
    popupId,
    placement: position?.placement ?? placement,
    popupStyle,
    renderPopup,
  }
}
