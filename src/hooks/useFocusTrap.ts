import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { getFocusable } from './focusable'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

export interface UseFocusTrapOptions {
  /** 啟用時把焦點移入容器並鎖住 Tab；停用時解除。 */
  active: boolean
  /** 停用時把焦點還給啟用前的元素。 */
  returnFocus?: boolean
}

/**
 * 把鍵盤焦點鎖在容器內，並在關閉時還原焦點。
 *
 * `aria-modal="true"` 只是告訴輔助技術「這是強制回應的對話框」，
 * 它**不會**真的擋住 Tab —— 沒有這個 trap，Tab 會直接跑到對話框後面的頁面，
 * 鍵盤使用者會在看不到焦點的情況下操作背景內容。
 *
 * 回傳的 ref 要掛在容器上。容器帶 `tabIndex={-1}` 時會優先聚焦容器本身，
 * 螢幕閱讀器才會先朗讀對話框的名稱與內容，而不是劈頭念出第一個按鈕。
 */
export const useFocusTrap = <T extends HTMLElement = HTMLElement>({
  active,
  returnFocus = true,
}: UseFocusTrapOptions): RefObject<T | null> => {
  const containerRef = useRef<T>(null)

  useIsomorphicLayoutEffect(() => {
    if (!active) return undefined

    const container = containerRef.current
    const previouslyFocused = document.activeElement as HTMLElement | null
    const target = container?.hasAttribute('tabindex')
      ? container
      : (container && getFocusable(container)[0])

    target?.focus()

    return () => {
      if (returnFocus) previouslyFocused?.focus?.()
    }
  }, [active, returnFocus])

  useEffect(() => {
    if (!active) return undefined

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return

      const container = containerRef.current
      if (!container) return

      const focusables = getFocusable(container)

      // 容器內沒有任何可 focus 的東西時，也不能讓 Tab 跑到背景頁面
      if (focusables.length === 0) {
        event.preventDefault()
        container.focus()
        return
      }

      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const activeElement = document.activeElement

      if (!container.contains(activeElement)) {
        // 焦點跑到容器外（例如從瀏覽器網址列切回來）時拉回來
        event.preventDefault()
        ;(event.shiftKey ? last : first).focus()
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault()
        first.focus()
      } else if (event.shiftKey && (activeElement === first || activeElement === container)) {
        event.preventDefault()
        last.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [active])

  return containerRef
}
