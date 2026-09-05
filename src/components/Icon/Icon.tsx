import { forwardRef } from 'react'
import type { ReactNode, SVGProps } from 'react'
import './Icon.css'

export type IconName =
  | 'close'
  | 'check'
  | 'check-circle'
  | 'info-circle'
  | 'alert-triangle'
  | 'x-circle'
  | 'chevron-up'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up-down'
  | 'search'
  | 'loading'

/*
 * 刻意只收「元件內部真的用得到」的圖示，不做完整圖示庫。
 *
 * 全部統一：24×24 viewBox、線條式（stroke: currentColor）、stroke-width 2、
 * 圓角端點。共用同一組幾何參數才會看起來像同一套，而不是拼湊來的。
 * 顏色與大小都跟著 font-size / currentColor 走，因此不需要任何顏色 prop。
 */
const ICONS: Record<IconName, ReactNode> = {
  'close': <path d="M18 6 6 18M6 6l12 12" />,
  'check': <path d="M20 6 9 17l-5-5" />,
  'check-circle': (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.5 2.5 2.5 4.5-5" />
    </>
  ),
  'info-circle': (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 7.75h.01" />
    </>
  ),
  'alert-triangle': (
    <>
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </>
  ),
  'x-circle': (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </>
  ),
  'chevron-up': <path d="m6 15 6-6 6 6" />,
  'chevron-down': <path d="m6 9 6 6 6-6" />,
  'chevron-left': <path d="m15 18-6-6 6-6" />,
  'chevron-right': <path d="m9 18 6-6-6-6" />,
  'chevron-up-down': (
    <>
      <path d="m8 9 4-4 4 4" />
      <path d="m16 15-4 4-4-4" />
    </>
  ),
  'search': (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.65-3.65" />
    </>
  ),
  'loading': <path d="M21 12a9 9 0 1 1-6.22-8.56" />,
}

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  /** Which built-in icon to render. */
  name: IconName
  /** Width and height. Defaults to `1em`, so the icon scales with the surrounding text. */
  size?: number | string
  /** Spins the icon continuously — for loading states. */
  spin?: boolean
}

/**
 * 內建線條圖示。
 *
 * 預設是裝飾性的（`aria-hidden`）—— 圖示旁邊通常已經有文字，或者按鈕自己有
 * `aria-label`，重複朗讀反而吵。傳 `aria-label` 時會自動改成 `role="img"`
 * 並取消 aria-hidden，讓它變成有意義的圖片。
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(({
  name,
  size = '1em',
  spin = false,
  className = '',
  ...props
}, ref) => {
  const labelled = props['aria-label'] !== undefined || props['aria-labelledby'] !== undefined

  return (
    <svg
      ref={ref}
      className={['mds-icon', spin ? 'mds-icon--spin' : '', className].filter(Boolean).join(' ')}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={labelled ? 'img' : undefined}
      aria-hidden={labelled ? undefined : true}
      // IE 以外的瀏覽器仍會讓 <svg> 進入 tab 順序（部分版本），明確排除
      focusable="false"
      {...props}
    >
      {ICONS[name]}
    </svg>
  )
})

Icon.displayName = 'Icon'
