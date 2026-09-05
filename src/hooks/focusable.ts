/*
 * 可 focus 元素的判斷，兩個地方共用：
 * - Tooltip：決定 wrapper 自己要不要當 tab stop（children 已可 focus 就不要）
 * - useFocusTrap：決定 Tab 循環的頭尾
 */
export const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

/**
 * 容器內目前真的可以被 focus 的元素，依 DOM 順序。
 *
 * 用 `getClientRects()` 過濾掉 `display: none` 或被摺疊起來的元素 ——
 * 它們仍符合上面的選擇器，但 `focus()` 對它們無效，留在清單裡會讓
 * Tab 循環卡在一個看不見的元素上。
 */
export const getFocusable = (container: HTMLElement): HTMLElement[] => (
  Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
    .filter((element) => element.getClientRects().length > 0)
)
